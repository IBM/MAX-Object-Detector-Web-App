/*
 * Copyright 2018 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

var request = require('request');
var yargs = require('yargs');
var express = require('express');
var util = require('util');

const requestPromise = util.promisify(request);

var args = yargs
  .default('port', 8090)
  .default('model', 'http://localhost:5000')
  .argv;

var endpointsMap = {}
var app = express();

app.use(express.static('static'));
console.log(args);

// Get all the model IDs for the endpoints configured
app.get('/models', function(req, res) {

  let endpoints = args.model;

  if (!Array.isArray(args.model)) {
    endpoints = [endpoints];
  }

  var promises = endpoints.map((endpoint) => {
    return requestPromise(`${endpoint}/model/metadata`)
      .then((response) => {
        endpointsMap[JSON.parse(response.body)['id']] = endpoint;
        return JSON.parse(response.body)['id'];
      });
  });

  Promise.all(promises).then((data) => {
    res.send(data);
  });
});

// Set model endpoint
app.all('/model/:route/:modelID', function(req, res) {
  req.pipe(request(endpointsMap[req.params.modelID] + '/model/' + req.params.route))
    .on('error', function(err) {
      console.error(err);
      res.status(500).send('Error connecting to the model microservice');
    })
    .pipe(res);
});

app.listen(args.port);

console.log('Web App Started on Port ' + args.port);
console.log('Using Model Endpoint: ' + args.model);
console.log('Press Ctrl-C to stop...');
