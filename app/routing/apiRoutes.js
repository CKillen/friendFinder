const fs = require('fs');
const path = require('path');
const multer = require('multer');
const upload = multer();


module.exports = function(app) {

  // app.get("/friends", function(req, res) {
  //   fs.readFile(path.join(__dirname, "../data/friends.json") , (err, data) => {
  //     if (err) throw err;
  //     res.setHeader('Content-Type', 'application/json');
  //     res.send(JSON.stringify(JSON.parse(data)));
  //   });
  // });

  app.post("/friends", upload.array(), function(req, res) {
    //create new friends object out of post data

    fs.readFile(path.join(__dirname, "../data/friends.json") , (err, data) => {
      if (err) throw err;
      data = JSON.parse(data);

      //add new friend
      data[Object.keys(data).length] = {
        "name": req.body.name,
        "scores":[
            req.body.q1,
            req.body.q2,
            req.body.q3,
            req.body.q4,
            req.body.q5,
            req.body.q6,
            req.body.q7,
            req.body.q8,
            req.body.q9,
            req.body.q10
          ]
      }
      fs.writeFile(path.join(__dirname, "../data/friends.json"), JSON.stringify(data) , (err) => {
        console.log("success")
        res.redirect("/matched");;
      });



    });
  })
};