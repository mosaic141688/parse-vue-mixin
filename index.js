const express = require('express');
const ParseServer = require('parse-server').ParseServer;
const app = express();

let httpServer = require('http').createServer(app)

const api = new ParseServer({
    databaseURI: 'mongodb://localhost:27017/toy', // Connection string for your MongoDB database
    cloud: './cloud/main.js', // Absolute path to your Cloud Code
    appId: 'myAppId',
    masterKey: 'myMasterKey', // Keep this key secret!
    fileKey: 'optionalFileKey',
    serverURL: 'http://localhost:3000/parse', // Don't forget to change to https if needed
    liveQuery:['thing']
});

ParseServer.createLiveQueryServer(httpServer)

// Serve the Parse API on the /parse URL prefix
app.use('/parse', api);

httpServer.listen(3000, function() {
    console.log('parse-server-example running on port 1337.');
});