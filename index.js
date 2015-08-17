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
var FirefoxProfile = require("firefox-profile"),
  async = require("async"),
  debug = require("debug"),
  log = debug("nemo-firefox-profile:log"),
  error = debug("nemo-firefox-profile:error");

module.exports = {
  "setup": function (config, result, callback) {
    var myProfile;
    if (!result.props.firefoxDirectory) {
      myProfile = new FirefoxProfile();
    }
    else {
      log('Firefox profile Directory provided, ', result.props.firefoxDirectory);
      myProfile = new FirefoxProfile(result.props.firefoxDirectory);
    }
    var firefox_preferences = result.props.firefox_preferences;
    if (!result.props.serverCaps) {
      result.props.serverCaps = {};
    }
    async.series(
      [
        function (callback) {
          if (result.props.firefox_extensions) {
            myProfile.addExtensions(result.props.firefox_extensions, function () {
              log('Added extensions ', result.props.firefox_extensions);
              callback(null, null);
            });
          }
        },
        function (callback) {
          if (result.props.firefox_preferences) {
            log('Now adding preferences ', result.props.firefox_preferences);
            Object.keys(firefox_preferences).forEach(function (key) {
              myProfile.setPreference(key, firefox_preferences[key]);
            });
            callback(null, null);
          }
        }
      ],
      function (err, results) {
        if (err) {
          error('Error occurred when building firefox profile, ', err);
          callback(err, config, result);
        }
        myProfile.encoded(function (encodedProfile) {
          result.props.serverCaps.firefox_profile = JSON.stringify(encodedProfile);
          callback(null, config, result);
        });
      }
    );
  }
};
