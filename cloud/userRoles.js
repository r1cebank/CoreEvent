Parse.Cloud.afterSave("_User", function(request, response) {
    Parse.Cloud.useMasterKey(); // grant us administrative access, required to write to the secured UserRole PFRole
    var user = request.object;

    query = new Parse.Query(Parse.Role);
    query.equalTo("name", "normalUser");
    query.first ( {
        success: function(object) {
            object.relation("users").add(user);
            object.save();
            //response.success("The user has been authorized.");
        },
        error: function(error) {
            //response.error("User authorization failed!");
        }
    });
});
