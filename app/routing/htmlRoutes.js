const path = require('path');
const fs = require('fs');

module.exports = function(app) {

  app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/survey.html"));
  });

  app.get("/matched", (req, res) => {

    fs.readFile(path.join(__dirname, "../data/friends.json"), "utf8", (err, data) => {
      if (err) throw err;
      const info = JSON.parse(data);
      let lastScores = info[Object.keys(info).length - 1].scores;
      let connectedName = "";
      let topScore = 500;
      if(Object.keys(info).length >= 2) 
      {
        
        for(let people in info) {
          if(people != Object.keys(info).length - 1) {
            let currentAvg = 0;
            for(let i = 0; i < 10; i++) {
              currentAvg = currentAvg + Math.abs(lastScores[i] - info[people].scores[i]);
            }
            if(topScore > currentAvg) {
              topScore = currentAvg;
              connectedName = info[people].name;
            }
          }
        }

        fs.readFile(path.join(__dirname, "../public/friendMatch.html"), "utf8" , (err, data) => {
          if (err) throw err;
          data = data.replace("__name__", connectedName);
          res.send(data);
        
        });
      } else {
        fs.readFile(path.join(__dirname, "../public/friendMatch.html"), "utf8" , (err, data) => {
          if (err) throw err;
          data = data.replace("__name__", "sorry not enough people to match anyone!");
          res.send(data);
        
        });
      }

    });


})

  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });



};