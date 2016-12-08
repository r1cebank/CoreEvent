var twilioAccountSid = 'ACe1d274cea8606b18dc5cc1a98add3d7e';
var twilioAuthToken = 'cfbe15712ca44eeed52b94860d502657';
var twilioPhoneNumber = '+17653746442';
var secretPasswordToken = 'xxqcFEePsvuhFmJMQGqZvOR6HHU9hRl5mWpx9xoctMyre0GCLG';

var twilio = require('twilio')(twilioAccountSid, twilioAuthToken);

var messsages = {
    'en-US': 'Your verification code is: {0}',
    'zh-CN': '乐汇：您的验证码是 {0}'
}

Parse.Cloud.define('sendCode', function(req, res) {
    var phoneNumber = req.params.phoneNumber;
    var method = req.params.method || 'sms';
    phoneNumber = phoneNumber.replace(/\D/g, '');


    if (!phoneNumber || (phoneNumber.length !== 10 && phoneNumber.length !== 11)) return res.error('phoneIncorrect');
    Parse.Cloud.useMasterKey();
    var query = new Parse.Query(Parse.User);
    query.equalTo('username', phoneNumber + '');
    query.first().then(function(result) {
        var min = 1000; var max = 9999;
        var num = Math.floor(Math.random() * (max - min + 1)) + min;

        if (result) {
            result.setPassword(secretPasswordToken + num);
            result.save().then(function() {
                return sendCode(phoneNumber, num, method);
            }).then(function() {
                res.success({});
            }, function(err) {
                res.error(err);
            });
        } else {
            var user = new Parse.User();
            user.setUsername(phoneNumber);
            user.setPassword(secretPasswordToken + num);
            user.set('level', 0);
            user.set('vip', false);
            user.setACL({});
            user.save().then(function(a) {
                return sendCode(phoneNumber, num, method);
            }).then(function() {
                res.success({});
            }, function(err) {
                res.error(err);
            });
        }
    }, function (err) {
        res.error(err);
    });
});

Parse.Cloud.define('login', function(req, res) {
    Parse.Cloud.useMasterKey();

    var phoneNumber = req.params.phoneNumber;
    phoneNumber = phoneNumber.replace(/\D/g, '');

    if (phoneNumber && req.params.codeEntry) {
        Parse.User.logIn(phoneNumber, secretPasswordToken + req.params.codeEntry).then(function (user) {
            res.success(user.getSessionToken());
        }, function (err) {
            res.error(err);
        });
    } else {
        res.error('phoneIncorrect');
    }
});

function sendCode(phoneNumber, code, method) {
    var locale = 'zh-CN';
    var prefix = '+1';
    if(phoneNumber.length === 10) {
        prefix = '+1';
        locale = 'en-US';
    } else if (phoneNumber.length === 11) {
        prefix = '+86';
    }

    var promise = new Parse.Promise();
    if (method === 'sms') {
        twilio.sendSms({
            to: prefix + phoneNumber.replace(/\D/g, ''),
            from: twilioPhoneNumber.replace(/\D/g, ''),
            body: messsages[locale].replace('{0}', code)
        }, function(err, responseData) {
            if (err) {
                console.log(err);
                promise.reject(err.message);
            } else {
                promise.resolve();
            }
        });
    } else {
        twilio.makeCall({
            to: prefix + phoneNumber.replace(/\D/g, ''),
            from: twilioPhoneNumber.replace(/\D/g, ''),
            url: 'http://twimlets.com/echo?Twiml=%3CResponse%3E%0A%20%20%20%20%3CSay%20voice%3D%22alice%22%20language%3D%22' +
            locale + '%22%3E' +
            encodeURIComponent(messsages[locale].replace('{0}', code.toString().split("").join(",,,"))) + '%3C%2FSay%3E%0A%3C%2FResponse%3E&'
        }, function(err, responseData) {
            if (err) {
                console.log(err);
                promise.reject(err.message);
            } else {
                promise.resolve();
            }
        });
    }
    return promise;
}
