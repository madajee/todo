var configValues = require('./config');

module.exports = {
    
    getDbConnectionString: function() {
        /*return 'mongodb+srv://' + configValues.uname + ':' + configValues.pwd + 
       '@' + configValues.dburl;*/
       //return configValues.DATABASE_URL_PAAS;
       return process.env.DATABASE_URL_PAAS;
   },
}