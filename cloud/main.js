
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
//CLOUD FUNCTIONS: 
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

Parse.Cloud.define("Logger", function(request, response) {
  console.log(request.params);
  response.success();
});

/*Parse.Cloud.define("saving", function(request, response) {
  var GameScore = Parse.Object.extend("GameScore");
  var gameScore = new GameScore();

  gameScore.save({
    score: 10,
    playerName: "Sean",
    cheatMode: false
  }, {
    success: function(gameScore) {
      // The object was saved successfully.
      response.success('New object created with objectId: ' + gameScore.id);
    },
    error: function(gameScore, error) {
      // The save failed.
      // error is a Parse.Error with an error code and description.
      response.error('Failed to create new object, with error code: ' + error.description);
    }
  });
}); */


// HANDLERS:  
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

//OBJETCS: 


// PRUEBAS: 
// De cargar módulos: 
var name = require('cloud/name.js');
name.isACoolName('Fred'); // returns false
name.isACoolName('Skippy'); // returns true;
name.coolNames; // undefined.

// BACKGROUNDS:  
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


