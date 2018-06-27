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

// Javascript code for MAX Object Detector Web App

function render_boxes(boxes) {
    var img = $("#user_img");
    var width = img.width();
    var height = img.height();
    var can_html = "<canvas id='img_canvas' width='" 
        + width + "' height='" + height + "'></canvas>";
    $('#image_display').append(can_html);

    var ctx = $("#img_canvas")[0].getContext("2d");
    var can = ctx.canvas;
    can.width = width;
    can.height = height;

    for (var i = 0; i < boxes.length; i++) {
        ctx.beginPath();
        ctx.lineWidth="5";
        ctx.strokeStyle = "#000000";
        var corners = boxes[i]["detection_box"];
        var ymin = corners[0] * height;
        var xmin = corners[1] * width;
        var bheight = (corners[2] - corners[0]) * height;
        var bwidth = (corners[3] - corners[1]) * width;
        ctx.rect(xmin, ymin, bwidth, bheight);
        ctx.stroke();

        ctx.font = "18px 'IBM Plex Sans'";
        ctx.fillStyle = "#000000";
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth="1";
        ctx.fillText(boxes[i]["label"], xmin, ymin);
        ctx.strokeText(boxes[i]["label"], xmin, ymin);
    }
}

$(function() {
    // Image upload form submit functionality
    $('#img-upload').on('submit', function(event){
        // Stop form from submitting normally
        event.preventDefault();

        // Create form data
        var form = event.target;
        var file = form[0].files[0];
        var data = new FormData();
        data.append("image", file);

        var reader = new FileReader();
        reader.onload = function(event) {
            file_url = event.target.result;
            $('#image_display').html("<img id='user_img' src='" + file_url + "' />");
        }
        reader.readAsDataURL(file);

        if ($("#file-input").val() != "") {
            $("#file-submit").text("Working...");

            // Perform file upload
            $.ajax({
                url: "/model/predict",
                method: "post",
                processData: false,
                contentType: false,
                data: data,
                processData: false,
                dataType: "json",
                success: function(data) {
                    render_boxes(data["predictions"]);
                },
                error: function() {
                    alert("Must submit a valid file (png, jpeg, jpg, or gif)");
                },
                complete: function() {
                    $("#file-submit").text("Submit");
                    $("#file-input").val("");
                }
            });
        }
    });
});
