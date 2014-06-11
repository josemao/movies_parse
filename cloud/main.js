
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

Parse.Cloud.define("averageStars", function(request, response) {
  var query = new Parse.Query("Review");
  query.equalTo("movie", request.params.movie);
  query.find({
    success: function(results) {
      var sum = 0;
      for (var i = 0; i < results.length; ++i) {
        sum += results[i].get("stars");
      }
      response.success(sum / results.length);
    },
    error: function() {
      response.error("movie lookup failed");
    }
  });
});


Parse.Cloud.beforeSave("Review", function(request, response) {
  if (request.object.get("stars") < 1) {
    response.error("you cannot give less than one star");
  } else if (request.object.get("stars") > 5) {
    response.error("you cannot give more than five stars");
  } else {
    response.success();
  }
});

/*Parse.Cloud.beforeSave(Parse.User, function(request, response) {
  if (!request.object.get("email")) {
    response.error("email is required for signup");
  } else {
    response.success();
  }
});*/

Parse.Cloud.job("userMigration", function(request, status) {
  // Set up to modify user data
  Parse.Cloud.useMasterKey();
  var counter = 0;
  // Query for all users
  var query = new Parse.Query(Parse.User);
  query.each(function(user) {
      // Update to plan value passed in
      user.set("plan", request.params.plan);
      if (counter % 100 === 0) {
        // Set the  job's progress status
        status.message(counter + " users processed.");
      }
      counter += 1;
      return user.save();
  }).then(function() {
    // Set the job's success status
    status.success("Migration completed successfully.");
  }, function(error) {
    // Set the job's error status
    status.error("Uh oh, something went wrong.");
  });
});
Parse.Cloud.job("cheluMigration", function(request, status) {
  // Set up to modify user data
  Parse.Cloud.useMasterKey();
  var counter = 0;
  // Query for all users
  var query = new Parse.Query(Parse.User);
  query.each(function(user) {
      // Update to plan value passed in
      user.set("plan", request.params.plan);
      if (counter % 100 === 0) {
        // Set the  job's progress status
        status.message(counter + " users processed.");
      }
      counter += 1;
      return user.save();
  }).then(function() {
    // Set the job's success status
    status.success("Migration completed successfully.");
  }, function(error) {
    // Set the job's error status
    status.error("Uh oh, something went wrong.");
  });
});

var express = require('express');
var app = express();
 
// Global app configuration section
app.use(express.bodyParser());  // Populate req.body
 
app.post('/notify_message',
         express.basicAuth('YOUR_USERNAME', 'YOUR_PASSWORD'),
         function(req, res) {
  // Use Parse JavaScript SDK to create a new message and save it.
  var Message = Parse.Object.extend("Message");
  var message = new Message();
  message.save({ text: req.body.text }).then(function(message) {
    res.send('Success');
  }, function(error) {
    res.status(500);
    res.send('Error');
  });
});
 
app.listen();
