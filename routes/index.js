const express = require('express');
const router = express.Router();

/**
 * A Router doesn't .listen() for requests on its own.
 * It's useful for separating your application into multiple modules --
 * creating a Router in each that the app can require() and .use() as middleware.
 * – Jonathan Lonowski
 * https://stackoverflow.com/questions/28305120/differences-between-express-router-and-app-get
 *
 */

router.get('/', (req, res) => {
  res.send({ response: 'I am alive!' }).status(200);
});

module.exports = router;
