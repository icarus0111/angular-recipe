const express = require('express');
const path = require('path');
const app = express();

// Serve static files....
app.use(express.static(path.resolve(__dirname, `../dist/simple-recipes`)));

// Send all requests to index.html
app.get('/*', function(req, res) {
  res.sendFile(path.resolve(__dirname, `../dist/simple-recipes/index.html`));
});

// default Heroku PORT
app.set('port', process.env.PORT || 4200)

app.listen({ port: app.get('port') }, () =>
  console.log(`🚀 Server ready at http://localhost:${app.get('port')}`)
)