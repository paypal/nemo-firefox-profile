var nemo_firefox_profile = require("../index");
var returnObj = {
    "driver": true,
    "wd": true,
    "props": {
        "firefox_preferences": {
            "browser.download.folderList": 2,
            "browser.download.dir": "/Users/nilesh",
            "browser.helperApps.neverAsk.saveToDisk": "text/csv"
        },
        "serverCaps":{

        }
    }

};

describe("nemo_firefox_profile", function () {
    it("should get set up", function (done) {
        nemo_firefox_profile.setup({}, returnObj, function (err, config, returnObj) {
            if (returnObj.props.serverCaps.firefox_profile) {
                console.log("Firefox profile setup was successful!");
                done()
            } else if (err) {
                done(err)
            } else {
                done(new Error("Not able to set up the firefox profile plugin"))
            }
        })
    });
});