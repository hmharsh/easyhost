module.exports = {
    secret: 'zbskjdkkznsmkxlaamlk', // some random characters to generate unique jwt/urls etc
    usernameHash: '21232f297a57a5a743894a0e4a801fc3', // username and password to login into admin panel in irreversible md5 hash formt, can be generated using tools like https://www.md5hashgenerator.com/
    passwordHash: '5f4dcc3b5aa765d61d8327deb882cf99',
    loginTokenExpiry: '12h', // login token will be invalid after this
    mongoURL: 'mongodb://localhost:27017/easyhost', // connection string suffix with database name
    //MongoURL: 'mongodb+srv://admin:XZTBs7HpGagquE8u@easyhost.fyfkv.mongodb.net/easyhost?retryWrites=true&w=majority', // connection string suffix with database name
    activeSessionTime: 300000, // Time difference in milli seconds, to prevent store visit info from same source untill this duration, this will help prevent storing similar information on page reloads
    storeExtractedFileTime: 120000,// How long shared zip's extracted file should be stored on backend (they will extracted again on next visit or page reload) in milli seconds
};