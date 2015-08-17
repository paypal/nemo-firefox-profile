# nemo-firefox-profile


Firefox profile for [Nemo automation framework][2]. `nemo-firefox-profile` is a nemo-plugin written using [firefox-profile-js][1].

## Nemo Installation

1. Please install nemo to your project as described here: https://github.com/paypal/nemo/blob/master/README.md
2. Add this plugin to your package.json dev dependencies ("nemo-firefox-profile": "~0.1.1")
3. npm install

## nemo-firefox-profile Registration

Add nemo-firefox-profile to your config/nemo-plugins.json file. Make sure `priority<100` to allow plugin to register
before nemo initializes the driver
```
 "firefox_profile": {
            "module": "nemo-firefox-profile",
            "priority": 99,
             "register":true
 }
```

## Plugin Setup
You can put your firefox preferences as `firefox_preferences` property under `nemoData` environment variable like below,

```
  "nemoData": {
                "autoBaseDir": "<%=loopmocha.basedir%>", "targetBrowser": nconf.get("TARGET_BROWSER") || "firefox",
                "firefox_preferences":{
                    "browser.download.folderList": 2,
                    "browser.download.dir": "/Users/nilesh",
                    "browser.helperApps.neverAsk.saveToDisk": "text/csv"
                },
                "serverCaps": {
                }
  }
```

You can use an existing firefox profile just by passing the path to the folder containing your profile.

```
  "nemoData": {
                "autoBaseDir": "<%=loopmocha.basedir%>", "targetBrowser": nconf.get("TARGET_BROWSER") || "firefox",
                "firefoxDirectory": "/path/to/profile's folder",
                "firefox_preferences":{
                    "browser.download.folderList": 2,
                    "browser.download.dir": "/Users/nilesh",
                    "browser.helperApps.neverAsk.saveToDisk": "text/csv"
                },
                "serverCaps": {
                }
  }
```

You can also add extensions to your firefox profile by specifying them as an array in `firefox_extensions` under `nemoData`

```javascript
"nemoData": {
    "firefox_extensions": [
          "example/resources/modify_headers-0.7.1.1-fx.xpi",
           "example/resources/firebug-2.0.0.xpi"
    ]
}
```

Once the plugin is configured correctly, nemo-firefox-profile would update "serverCaps" as below

```
  "serverCaps": {
    "firefox_profile": {zipped, base64 encoded string of the profile directory for use with remote WebDriver JSON wire protocol}
  }
```
## Example
You can find an example of `nemo-firefox-plugin` with `nemo@0.4.0` under example directory. In the example we disable javascript and add a custom header using [modify-headers](https://addons.mozilla.org/en-Us/firefox/addon/modify-headers/) plugin

[1]:https://github.com/saadtazi/firefox-profile-js "firefox-profile-js"
[2]:https://github.com/paypal/nemo "Nemo automation framework"
