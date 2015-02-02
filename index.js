/*───────────────────────────────────────────────────────────────────────────*\
 │  Copyright (C) 2014 eBay Software Foundation                                │
 │                                                                             │
 │                                                                             │
 │   Licensed under the Apache License, Version 2.0 (the "License"); you may   │
 │   not use this file except in compliance with the License. You may obtain   │
 │   a copy of the License at http://www.apache.org/licenses/LICENSE-2.0       │
 │                                                                             │
 │   Unless required by applicable law or agreed to in writing, software       │
 │   distributed under the License is distributed on an "AS IS" BASIS,         │
 │   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  │
 │   See the License for the specific language governing permissions and       │
 │   limitations under the License.                                            │
 \*───────────────────────────────────────────────────────────────────────────*/

/*jslint node: true */
"use strict";
var FirefoxProfile = require("firefox-profile");
module.exports = {
    "setup": function (config, result, callback) {
        var myProfile;
        if (!result.props.firefoxDirectory) {
            myProfile = new FirefoxProfile();
        }
        else {
            myProfile = new FirefoxProfile(result.props.firefoxDirectory);
        }
        var firefox_preferences = result.props.firefox_preferences;
        if (result.props.firefox_preferences) {
            Object.keys(firefox_preferences).forEach(function (key) {
                myProfile.setPreference(key, firefox_preferences[key]);
            });
        }
        myProfile.encoded(function (encodedProfile) {
            result.props.serverCaps.firefox_profile = JSON.stringify(encodedProfile);
            callback(null, config, result);
        });
    }
};
