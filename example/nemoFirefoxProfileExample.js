var Nemo = require('nemo');

var nemo =  Nemo(process.cwd()+'/example',function(err){
  if(!err) {
    nemo.driver.sleep(60000);
    console.log('Nemo initialized successfully');
    nemo.driver.quit();
  } else {
    console.log(err);
  }
});