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
                        <div id='canvas' class = 'col-md-11 canvas-style' oncontextmenu="return false;"></div>
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
    var colButton = $('<button class="col-md-1"></button>');
    colButton.attr('id', `${plateColor[i]}`);
    colButton.attr('class', `${plateColor[i]}`);
    // $(colButton).append(button);
    $('#second-row-plate').append(colButton);
}

for (var i = 0; i < lenFeatures / 2; i++) {
    if (i === 0) {
        // console.log(typeof paint.features[i]);
        var row = $('<div class="row"><button id = "' + paint.features[i] + '" class="col-md-1 fas fa-eraser"></button><button id = "' + paint.features[i + 1] + '" class="col-md-1 fas fa-pencil-alt"></button></div>');
    }

    if (i === 1) {
        var row = $('<div class="row"><button id = "' + paint.features[i + 1] + '" class="col-md-1 fas fa-brush"></button><button id = "' + paint.features[i + 2] + '" class="col-md-1 fas ' + paint.features[i + 2] + '"></button></div>');

    }
    $("#container-nav-bar").append(row);

}



$("button").click(function (e) {
    if (e.button === 0) {

        currentColor = e.target.id;
        $('#canvas').css('cursor', 'crosshair');

    }
})

var eraser = (eventObjectCanvas) => {
    $(".draw").mousemove(function (e) {
        e.target.remove();
    })
}




$("#canvas").mousedown(function (eventObjectCanvas) {
    // console.log(e.button);

    if (eventObjectCanvas.button === 0) {
        $('#canvas').css('cursor', 'crosshair');
        $(this).mousemove(function (eventObjectCanvas) {
            if (currentColor !== undefined) {
                var left = eventObjectCanvas.pageX - $('#canvas').offset().left + 'px';
                var top = eventObjectCanvas.pageY - $('#canvas').offset().top + 'px';
                var spanDraw = $('<span id="draw-span" class="draw"></span>');
                $(spanDraw).addClass(`${currentColor}`);
                $(spanDraw).css("left", `${left}`);
                $(spanDraw).css("top", `${top}`);
                $('#canvas').append(spanDraw);
            }
        });


    }
}).mouseup(function () {
    $(this).unbind('mousemove');
});




$("#canvas").mousedown(function (eventObjectCanvas) {
    // console.log(e.button);
    if (eventObjectCanvas.button === 2) {
        var urlCursor = '../src/cursor/eraser.cur';
        $(this).mousemove(function (eventObjectCanvas) {
            $("#canvas").css('cursor', `url(${urlCursor}),auto`);

            eraser(eventObjectCanvas);
        });
    }
}).mouseup(function () {
    $(this).unbind('mousemove');
});



