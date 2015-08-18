# nemo-firefox-profile


Firefox profile for [Nemo automation framework][2]. `nemo-firefox-profile` is a nemo-plugin written using [firefox-profile-js][1].


## Nemo Installation

Install nemo and nemo-firefox-profile

```bash
 npm install nemo --save-dev
 npm install nemo-firefox-profile --save-dev
```

## nemo-firefox-profile Registration

Add `nemo-firefox-profile` to your `nemo` config under `plugins` section in `config/config.json` file like below. Make sure `priority<100` to allow plugin to register
before nemo initializes  `selenium-webdriver`

```javascript
"plugins" : {
        "firefox_profile": {
                   "module": "nemo-firefox-profile",
                   "priority": 99,
                   "arguments": [
                          {
                             "firefoxPreferences": {
                               "browser.download.folderList": 2,
                               "browser.download.dir": "/Users/nemoUser",
                               "browser.helperApps.neverAsk.saveToDisk": "text/csv"
                             }
                          }
                   ]
        }
  }
```

## Plugin Arguments

You can pass firefox preferences to nemo via plugin arguments like below,

```javascript
"plugins": {
    "firefox-profile": {
      "module": "nemo-firefox-profile",
      "arguments": [
        {
           "firefoxPreferences": {
                "browser.download.folderList": 2,
                "browser.download.dir": "/Users/nemoUser",
                "browser.helperApps.neverAsk.saveToDisk": "text/csv"
           },
           "firefoxProfileDirectory": "/path/to/profile's folder",
           "firefoxExtensions": [
                "example/resources/modify_headers-0.7.1.1-fx.xpi",
                "example/resources/firebug-2.0.0.xpi"
           ]
        }
      ],
      "priority": 99
    }
 }
```
You _must_ pass either `firefoxPreferences` with custom preferences or `firefoxProfileDirectory` to load existing Firefox profile OR both. You can also include add-ons to firefox instance by providing them under `firefoxExtensions` as an array argument

Once the plugin is configured correctly, nemo-firefox-profile would update "serverCaps" as below

```javascript
  "serverCaps": {
    "firefox_profile": {zipped, base64 encoded string of the profile directory for use with remote WebDriver JSON wire protocol}
  }
```

## Example
A sample nemo test `example/nemoFirefoxProfileExample.js` is written to demonstrate how to use `nemo-firefox-profile`. Custom firefox preferences are provided under `example/config/config.json`. We also add a custom header using [modify-headers](https://addons.mozilla.org/en-Us/firefox/addon/modify-headers/) extension

Once you clone the plugin, at the root level execute following,

```bash
npm install
DEBUG=nemo* node example/nemoFirefoxProfileExample.js
```

You will see a bunch of nemo logs and a firefox launched with a _blank_ window. In the address bar you can type `about:config` and check whether your custom firefox preferences were applied or not. Accept firefox risk page and in the address bar type `browser.download.dir`. You will see the value to be `/Users/nemoUser` and status to be `user set`. You can also see that [modify-headers](https://addons.mozilla.org/en-Us/firefox/addon/modify-headers/) is added to the browser with header `Custom-Header` being set to value `Cookie`. modify-headers extension could be found at the top right corner of the browser as red icon. That's it, you were able to configure `nemo-firefox-profile` correctly and able to successfully set custom firefox preferences. Browser will close automatically after 60s (timeout set so that users could test firefox preferences).

## Acknowledgement
Thank you [@saadtazi](https://github.com/saadtazi) for your work on [firefox-profile-js][1]

[1]:https://github.com/saadtazi/firefox-profile-js "firefox-profile-js"
[2]:https://github.com/paypal/nemo "Nemo automation framework"
