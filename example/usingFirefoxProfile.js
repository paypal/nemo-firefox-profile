/**
 * Created by nikulkarni on 8/16/15.
 */
  var Nemo = require('nemo');
var path = require("path");

var config = {
  nemoData: {
    targetBrowser: "firefox",
    targetServer: "localhost",
    localServer: true,
    seleniumJar: "/usr/local/bin/selenium-server-standalone.jar",
    targetBaseUrl: "https://www.paypal.com",
    "firefox_extensions": [
      "example/resources/modify_headers-0.7.1.1-fx.xpi"
    ],
    "firefox_preferences": {
      "javascript.enabled": false,
      "modifyheaders.config.active": true,
      "modifyheaders.config.alwaysOn": true,
      "modifyheaders.start": true,
      "modifyheaders.headers.count": 1,
      "modifyheaders.headers.action0": "Add",
      "modifyheaders.headers.name0": "Custom-Header",
      "modifyheaders.headers.value0": "Cookie",
      "modifyheaders.headers.enabled0": true
    }
  },
  plugins: {
    "nemo-firefox-profile": {
      module : path.resolve('index.js'),
      "register" : true,
      priority : 99
    }
  }
};

(new Nemo(config)).setup().then(function(nemo) {

  nemo.driver.get(nemo.props.targetBaseUrl);
  nemo.driver.sleep(5000).
    then(function() {
      console.info("Nemo was successful!!");
      nemo.driver.quit();
    });
},function(err){
  console.log(err);
});