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

  "setup": function (nemo, callback) {
    var firefoxProfileDirectory = nemo._config.get('driver:firefoxProfileDirectory'),
      firefoxPreferences = nemo._config.get('driver:firefoxPreferences') ;

    if (!firefoxProfileDirectory && !firefoxPreferences) {
      throw new Error('You must provide firefoxDirectory or firefox preferences, please check README');
    }
    var myProfile;
    if (firefoxProfileDirectory) {
      myProfile = new FirefoxProfile(firefoxProfileDirectory);
    }
    else {
      myProfile = new FirefoxProfile();
    }
    if (firefoxPreferences) {
      Object.keys(firefoxPreferences).forEach(function (key) {
        myProfile.setPreference(key, firefoxPreferences[key]);
      });
    }
    myProfile.encoded(function (encodedProfile) {
      nemo._config.set('driver:serverCaps:firefox_profile', JSON.stringify(encodedProfile));
      callback(null);
    });
  }
};
