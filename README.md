Redmine console
=========

Console interface to Redmine REST API.

Installation
------------

``npm install redmine-console``


Usage Examples
--------------

Specify redmine host and your api key through environment variables. E.g.:

```bash
 # api key could be found in <your redmine host here>/my/account
REDMINE_HOST=<your redmine host here> REDMINE_APIKEY=<your api key here> node node_modules/index.js --add_time --activity_id 9 --project_id 1 --hours 1

```

... Or write them in redmine_values.js file:


TODO
-----

* Add possibility to install redmine-console globally
