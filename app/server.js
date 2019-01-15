const express = require("express");
const path = require('path');
const bodyParser = require("body-parser");


const app = express();
const PORT = 8002;

// Sets up the Express app to handle data parsing
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


require("./routing/apiRoutes")(app);
require("./routing/htmlRoutes")(app);

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});