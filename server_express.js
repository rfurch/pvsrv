#!/usr/local/bin/node


var express = require('express');
var bodyParser = require('body-parser')

var app = express();

  app.use(bodyParser());

  app.post('/', function(request, response){
    console.log(request.body);      // your JSON
      response.send(request.body);    // echo the result back
      });

      app.listen(3000);


