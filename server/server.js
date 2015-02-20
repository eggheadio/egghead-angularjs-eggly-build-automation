var config = require('./server-config'),
  express = require('express'),
  app = express(),
  server = require('http').createServer(app),
  mockFileRoot = config.data_location,
  fs = require('fs');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


// CONFIG SERVER
//allows us to write cookies
app.use(cookieParser());

//allows server to run as proxy
app.enable('trust proxy');
app.use(bodyParser.json());
app.use(express.static(config.static_site_root));

var responseCache = {};

function getMock(path, cacheResponse) {
  var mockResponse = responseCache[path];

  cacheResponse = cacheResponse || false;

  if (!mockResponse) {
    mockResponse = fs.readFileSync(path);
    mockResponse = JSON.parse(mockResponse);
    if(cacheResponse) {
      responseCache[path] = mockResponse;
    }
  }

  return mockResponse;
}

/**
 * Sends `default.json` that matches the path of the request
 * from the data dir. Assumes a rigid directory structure that
 * matches the route exactly.
 *
 * @param req
 * @param res
 */
function sendDefault(req, res) {
  var endpoint,
    splitPath = req.params[0].split('?')[0].split("/"),
    mockPath = mockFileRoot + req.params[0] + '/' + 'default.json',
    mockResponse;

  if (splitPath.length > 2)
    endpoint = splitPath[splitPath.length - 2];
  
  try {
    
    res.json(getMock(mockPath))
  } catch (err) {
    console.log("something bad happened", err);
    res.status(500).send(JSON.parse(err));
  }
}

app.get(config.rest_base_url + '/*', sendDefault);
app.post(config.rest_base_url + '/*', sendDefault);

// FIRE IT UP

server.listen(config.port, function () {
  console.log("Express server listening on port %d", config.port);
});
