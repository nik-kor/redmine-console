var messages = {};

messages.help = function() {
    return ["\nUsage: redmine-console <options>"
      , ""
      , "where <options> is one of:"
      , ""
      , "--add_time    add new time entry"
      , ""
      ].join("\n");
}

messages.missedOption = function(option) {
    return 'Please, specify ' + option;
}




module.exports = messages;
