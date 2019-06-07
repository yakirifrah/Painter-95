"use strict";
var plateColor = paint.plateColor;
var lenPlateColor = plateColor.length;
var lenPlateColorFirstRow = plateColor.length / 2;
var higthPostion;
var widthPosition;
var currentColor;
var lenFeatures = paint.features.length;

var sideBarMenu = `<ul class="navbar-nav">
                       <div id="container-nav-bar" class="container">
                       </div>
                    </ul>`

//skeleton 
var innerBody = `<div class="container">
                    <div class="row">
                        <div id='canvas' class = 'col-md-11 canvas-style'></div>
                    </div>
                        <div class = "row">
                        <div class = 'col-md-1'></div>
                        <div class = 'col-md-6'>
                            <div id='first-row-plate' class = 'row border'></div>
                            <div id='second-row-plate' class = 'row border'></div>
                        </div>
                    </div>
                </div>`


$(document.body).append(sideBarMenu);
$(document.body).append(innerBody);

//להפוך את זה ללואה אחת

for (var i = 0; i < lenPlateColorFirstRow; i++) {
    // console.log (plateColor[i] );
    var colButton = $('<button class="col-md-1"></button>');
    // var button = $('<button></button>');
    colButton.attr('id', `${plateColor[i]}`);
    colButton.attr('class', `${plateColor[i]}`);
    // $(colButton).append(button);
    $('#first-row-plate').append(colButton);
}




for (var i = lenPlateColorFirstRow; i < lenPlateColor; i++) {
    // console.log (plateColor[i] );
    var colButton = $('<button class="col-md-1"></button>');
    // var button = $('<button></button>');
    colButton.attr('id', `${plateColor[i]}`);
    colButton.attr('class', `${plateColor[i]}`);
    // $(colButton).append(button);
    $('#second-row-plate').append(colButton);
}

{/* <i class="fas fa-pencil-altfa-pencil-alt"></i> */}
// span id="id_' + i + '"
{/* <i class="fas  "></i> */}
for (var i = 0; i < lenFeatures/2; i++) {
    if (i === 0) 
    {
        // console.log(typeof paint.features[i]);
        var row = $('<div class="row"><button id = "' + paint.features[i]+ '" class="col-md-1 fas fa-eraser"></button><button id = "' + paint.features[i+1]+ '" class="col-md-1 fas fa-pencil-alt"></button></div>');
    } 

    if (i === 1)
    {
        var row = $('<div class="row"><button id = "' + paint.features[i+1]+ '" class="col-md-1 fas"></button><button id = "' + paint.features[i+2]+ '" class="col-md-1 fas '+paint.features[i+2]+'"></button></div>');

    }
    $("#container-nav-bar").append(row);
    
}



$("button").click(function (e) {
    currentColor = e.target.id;
    $('#canvas').css('cursor', 'crosshair');
})



// $()





// $("#canvas").on('mousedown' , function(e)  {
//     if (currentColor !== undefined) {
//         // console.log("hight: "+ e.pageY);
//         // console.log("width: "+e.pageX);
//         var left = e.pageX - $('#canvas').offset().left +'px';
//         var top = e.pageY - $('#canvas').offset().top +'px';
//         console.log(left);
//         console.log(top);
//         var spanDraw = $('<span class="draw"></span>');
//         // spanDraw.attr('class',`${currentColor}`);
//         $(spanDraw).addClass(`${currentColor}`);
//         $(spanDraw).css("left", `${left}`);
//         $(spanDraw).css("top" ,`${top}`);

//         $('#canvas').append(spanDraw);
//     }
// });


$("#canvas").mousedown(function () {
    $(this).mousemove(function (e) {
        if (currentColor !== undefined) {
            // console.log("hight: "+ e.pageY);
            // console.log("width: "+e.pageX);
            var left = e.pageX - $('#canvas').offset().left + 'px';
            var top = e.pageY - $('#canvas').offset().top + 'px';
            // console.log(left);
            // console.log(top);
            var spanDraw = $('<span class="draw"></span>');
            // spanDraw.attr('class',`${currentColor}`);
            $(spanDraw).addClass(`${currentColor}`);
            $(spanDraw).css("left", `${left}`);
            $(spanDraw).css("top", `${top}`);

            $('#canvas').append(spanDraw);
        }
    });
}).mouseup(function () {
    $(this).unbind('mousemove');
});