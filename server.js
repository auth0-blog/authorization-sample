//import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const uuidv4 = require('uuid/v4');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

// define the Express app
const app = express();

// the database
const grades = [];

// enhance your app security with Helmet
app.use(helmet());

// use bodyParser to parse application/json content-type
app.use(bodyParser.json());

// enable all CORS requests
app.use(cors());

// log HTTP requests
app.use(morgan('combined'));

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: process.env.AUTH0_CLIENT_ID,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256']
});

app.use(checkJwt);

// retrieve all grades
app.get('/', (req, res) => {
  res.send(grades);
});

// insert a new grade
app.post('/', (req, res) => {
  const {userId, grade} = req.body;
  const newGrade = {
    id: uuidv4(),
    userId,
    grade,
  };
  grades.push(newGrade);
  res.status(200).send(newGrade);
});

// start the server
app.listen(3001, () => {
  console.log('listening on port 3001');
});
