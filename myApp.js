const express = require('express');
const helmet = require('helmet');
const app = express();
//require('dotenv').config();

const ninetyDaysInSeconds = 90*24*60*60;

// app.use(helmet.hidePoweredBy());
// app.use(helmet.frameguard({ action: 'deny' }));
// app.use(helmet.xssFilter());
// app.use(helmet.noSniff());
// app.use(helmet.ieNoOpen());
// app.use(helmet.hsts({maxAge: ninetyDaysInSeconds, force: true}));
// app.use(helmet.dnsPrefetchControl());
// app.use(helmet.noCache());
// app.use(helmet.contentSecurityPolicy( {directives: { defaultSrc: ["'self'"], scriptSrc: ["'self'", "trusted-cdn.com"]}} ));
app.use(helmet({
  frameguard: {         // configure
    action: 'deny'
  },
  contentSecurityPolicy: {    // enable and configure
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ['style.com'],
    }
  },
  dnsPrefetchControl: false     // disable
}))


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use( (req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  switch( req.method )
  {
    case "GET":
      console.dir( req.query );
      break;
    case "POST":
    case "PUT":
    case "DELETE":
      console.dir( req.body );
  }
  next();
});













































module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
