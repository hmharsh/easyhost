module.exports = {
    secret: process.env.SECRET || 'zbskjdkkznsmkxlaamlk', // some random characters to generate unique jwt/urls etc
    usernameHash: process.env.USERNAMEHASH || '21232f297a57a5a743894a0e4a801fc3', // username and password to login into admin panel in irreversible md5 hash formt, can be generated using tools like https://www.md5hashgenerator.com/
    passwordHash: process.env.PASSWORDHASH || '5f4dcc3b5aa765d61d8327deb882cf99',
    loginTokenExpiry: process.env.LOGINTOKENEXPIRY || '12h', // login token will be invalid after this
    //mongoURL: 'mongodb://localhost:27017/easyhost', // connection string suffix with database name
    MongoURL: process.env.MONGOURL || 'mongodb+srv://admin:XZTBs7HpGagquE8u@easyhost.fyfkv.mongodb.net/easyhost', // connection string suffix with database name
    activeSessionTime: process.env.ACTIVESESSIONTIME || 300000, // Time difference in milli seconds, to prevent store visit info from same source untill this duration, this will help prevent storing similar information on page reloads
    storeExtractedFileTime: process.env.STOREEXTRACTEDFILETIME || 120000,// How long shared zip's extracted file should be stored on backend (they will extracted again on next visit or page reload) in milli seconds

    // Allow only `maxUploads` per `lastUploadsHours`, eg to allow 5 uploads per user per 24 hours maxUploads=5 and lastUploadsHours=24
    maxUploads: process.env.MAXUPLOADS || 1,
    lastUploadsHours: process.env.LASTUPLOADHOURS || 24,

    // Allow only `maxCreadentials` per `lastCreadentialsHours`
    maxCreadentials: process.env.MAXCREADENTIALS || 1,
    lastCreadentialsHours: process.env.LASTCREADENTIALSHOURS || 24
};