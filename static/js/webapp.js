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

/* eslint-env jquery */
/* eslint-env browser */

'use strict';

// canvas colors
var color_box = '#00FF00'; // Lime
var color_text = '#000000'; // Black

// global var for current prediction results
var predictions = [];

// (re)paints canvas (if canvas exists) and triggers label visibility refresh
function paint_canvas() {
  // Check if the canvas exists to prevent errors
  if ($('#image-canvas').length) {
    // Initialize the canvas and context vars
    var ctx = $('#image-canvas')[0].getContext('2d');
    var can = ctx.canvas;

    // Set canvas size to current image size
    var img = $('#user-image');
    can.width = img.width();
    can.height = img.height();

    // Clear canvas (for use on repaint)
    ctx.clearRect(0, 0, can.width, can.height);

    // Set canvas text settings (for labels)
    ctx.font = '16px "IBM Plex Sans"';
    ctx.textBaseline = 'top';
    ctx.lineWidth = '3';

    // Draw the bounding boxes
    for (var i = 0; i < predictions.length; i++) {
      paint_box(i, ctx, can);
    }

    // Draw the labels (drawn after to prevent overlap)
    for (i = 0; i < predictions.length; i++) {
      paint_label(i, ctx, can);
    }
  }
}

// module function for painting bounding box on canvas
function paint_box(i, ctx, can) {
  ctx.strokeStyle = color_box;
  ctx.beginPath();
  var corners = predictions[i]['detection_box'];
  var ymin = corners[0] * can.height;
  var xmin = corners[1] * can.width;
  var bheight = (corners[2] - corners[0]) * can.height;
  var bwidth = (corners[3] - corners[1]) * can.width;
  ctx.rect(xmin, ymin, bwidth, bheight);
  ctx.stroke();
}

// module function for painting label text on canvas
function paint_label(i, ctx, can) {
  var box = predictions[i]['detection_box'];
  var y = box[0] * can.height;
  var x = box[1] * can.width;

  var label = predictions[i]['label'];

  var tWidth = ctx.measureText(label).width;
  var tHeight = parseInt(ctx.font, 10) * 1.4;

  // paint the label background box
  ctx.fillStyle = color_box;
  ctx.fillRect(x, y, tWidth + 3, tHeight);

  // paint the label
  ctx.fillStyle = color_text;
  ctx.fillText(label, x + 1, y);
}

// Run or bind functions on page load
$(function() {
  // Update canvas when window resizes
  $(window).resize(function(){
    paint_canvas();
  });

  // Image upload form submit functionality
  $('#file-upload').on('submit', function(event){
    // Stop form from submitting normally
    event.preventDefault();

    // Create form data
    var form = event.target;
    var file = form[0].files[0];
    var data = new FormData();
    data.append('image', file);
    data.append('threshold', 0.5);

    // Display image on UI
    var reader = new FileReader();
    reader.onload = function(event) {
      var file_url = event.target.result;
      var img_html = '<img id="user-image" src="' + file_url + '" />'
        + '<canvas id="image-canvas"></canvas>';
      $('#image-display').html(img_html); // replaces previous img and canvas
      predictions = []; // remove any previous metadata
    };
    reader.readAsDataURL(file);

    if ($('#file-input').val() !== '') {
      // Disable upload while making call to model
      $('#file-submit').text('Detecting...');
      $('#file-submit').prop('disabled', true);

      // Perform file upload
      $.ajax({
        url: '/model/predict',
        method: 'post',
        processData: false,
        contentType: false,
        data: data,
        dataType: 'json',
        success: function(data) {
          predictions = data['predictions'];
          paint_canvas();
          if (predictions.length === 0) {
            alert('No Objects Detected');
          }
        },
        error: function(jqXHR, status, error) {
          alert('Object Detection Failed: ' + error);
        },
        complete: function() {
          // Re-enable upload button
          $('#file-submit').text('Submit');
          $('#file-submit').prop('disabled', false);
          $('#file-input').val('');
        },
      });
    }
  });
});
