/* eslint-disable */

const git = require('git-rev');
const os = require('os');
const jsonfile = require('jsonfile');

git.short((buildhash) => {
    const buildInfo = {
        buildhash,
        host: os.hostname(),
        date: new Date().toISOString()
    };
    jsonfile.writeFile(process.cwd() + '/src/buildinfo.json', buildInfo, { spaces: 4 }, function(err) {
    });
});
