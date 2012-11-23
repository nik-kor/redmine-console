var nopt = require("nopt")
  , Redmine = require('redmine')
  , _ = require('underscore')
  , redmineValues = require('./redmine-values')
  , messages = require('./messages')
  , util = require('util')
  , knownOpts = { "add_time" : Boolean
                , "help": Boolean
                , "project_id" : [Number, String]
                , "hours": String
                , "activity_id": Number
                }
  , shortHands = {}
  , options = nopt(knownOpts, shortHands, process.argv);


if(options.help) {
  console.log(messages.help());

  return;
}


var config = {
  host:   process.env.REDMINE_HOST ? process.env.REDMINE_HOST : redmineValues.host,
  apiKey: process.env.REDMINE_APIKEY ? process.env.REDMINE_APIKEY : redmineValues.api_key
};

var redmine = new Redmine(config);

if(options.add_time) {
  //check options

  if(!options.activity_id) {
    console.error(messages.missedOption('activity id'));
    return;
  }

  if(!options.project_id) {
    console.error(messages.missedOption('project id'));
    return;
  }

  if(!options.hours) {
    console.error(messages.missedOption('hours'));
    return;
  }

  //check if options.project_id exists
  redmine.getProjects({use_cache: true}, function(err, data) {
    if (err) {
      console.log("Error: " + err.message);
      return;
    }
    var projectIds = _.map(data.projects, function(project) { return project.id; });
    if(_.indexOf(projectIds, options.project_id) == -1) {
      console.log
        ( ["\nPlease, specify correct project id from list"
          , ""
          , util.inspect(data.projects)
          , ""
          , ""
          ].join("\n"));

      return;
    }

    //check activity id
    if(_.indexOf(_.values(redmineValues.activity_ids), options.activity_id) == -1) {
      console.log
        ( ["\nPlease, specify correct activity id from list"
          , ""
          , util.inspect(redmineValues.activity_ids)
          , ""
          , ""
          ].join("\n"));

      return;
    }
    var timeEntry = {
      time_entry: {
        project_id: options.project_id
      , hours: options.hours
      , activity_id: options.activity_id
      }
    };

    redmine.postTimeEntry(timeEntry, function(err, data) {
      if (err) {
        console.log("Error: " + err.message);
        return;
      }

      console.log('Done!');
      console.log(data);

    });

    return;

  });

  return;
}


console.log(messages.help());
