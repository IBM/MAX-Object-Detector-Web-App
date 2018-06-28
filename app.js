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

var args = yargs
  .default('port', 8090)
  .default('model', 'http://localhost:5000/model/predict')
  .argv;

var app = express();

app.use(express.static('static'));

app.post('/model/predict', function(req, res) {
  req.pipe(request(args.model)).pipe(res);
});

app.listen(args.port);

console.log('Web App Started on Port ' + args.port);
console.log('Using Model Endpoint: ' + args.model);
console.log('Press Cntl-C to stop...');
