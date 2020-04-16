# server_api
This web app implements a REST API of type servers. Here the user can make GET,POST and DELETE requests to the server documents stored in MongoDB.

Working
-------
1) GET request from '/' returns all the servers stored in the database. GET request from '/:id' returns the server object with matching id field and returns a 404 error if there's no matching document.
2) GET request from '/search/:str' returns all the servers whose name contains the string str. If there's no matching servers it returns a 404 error.
3) POST request from '/' with a JSON file as request body is first checked if the id passed in the request body is matching with the id of servers already existing in the database. If so it returns "id already exists" else it stores the JSON file in the database and it returns "Saved Succesfully".
4) DELETE request from '/:id' searches for the database for matching id field. If found it deletes the document and sends "Deleted successfully" else it returns a 404 error.

Dependencies
------------
express, mongoose and body-parser
