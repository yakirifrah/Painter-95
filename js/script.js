"use strict";
var plateColor = paint.plateColor;
var lenPlateColor = plateColor.length;
var lenPlateColorFirstRow = plateColor.length / 2;
var higthPostion;
var widthPosition;
var currentColor = 'black';
var lenFeatures = paint.features.length;
var cursor = {
    cursor: 'crosshair',
}

var sizeCanvas = {
    width: 500,
    height: 500
}

var sizeBrush = {
    widthBrush: 3,
    heightBrush: 3
};

//skeleton 
var innerBody = `<div class="container">
                        <div class="title text-center">
                            <h1 class="style-title">Paint 95</h1>
                        </div>
                        <div class="row pt-4 justify-content-md-center">
                            <div class="col-md-1">
                                <ul class="navbar-nav">
                                    <div id="container-nav-bar">
                                    </div>
                                        <div class="section-selection-box">
                                            <div class = "selection-box">
                                                <div class="btn-group-size" role="group" style="width:100%">
                                                    <div class="box-size" id="size-s"><div class="size-s"></div></div>
                                                    <div class="box-size" id="size-m"><div class="size-m"></div></div>
                                                    <div class="box-size" id="size-l"><div class="size-l"></div></div>
                                                    <div class="box-size" id="size-xl"><div class="size-xl"></div></div>
                                                </div>
                                             </div>
                                    </div>
                                </ul>
                            </div>
                            <div class="col-md-11">  
                                <div id='canvas' class = 'canvas-style' oncontextmenu="return false;"></div>
                            </div>
                        </div>
                            <div class = "row pt-4">
                                <div class = 'col-md-1'>
                                    <div class="border-current-color">
                                        <div class="current-color"></div>
                                    </div>
                                </div>
                                    <div class = 'col-md-6'>
                                        <div id='first-row-plate' style="width:420px" class = 'row border'></div>
                                        <div id='second-row-plate' style="width:420px" class = 'row border'></div>
                                    </div>
                            </div>
                    </div>`

var modal = `<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">Resize</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        </div>
                        <div class="modal-body">
                        </div>
                        <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                    </div>  
            </div>`

$(document.body).append(innerBody);

//להפוך את זה ללואה אחת

for (var i = 0; i < lenPlateColorFirstRow; i++) {
    var colButton = $('<button class="col-md-1"></button>');
    colButton.attr('id', `${plateColor[i]}`);
    colButton.attr('class', `${plateColor[i]}`);
    colButton.addClass('btn-color');
    $('#first-row-plate').append(colButton);
}




for (var i = lenPlateColorFirstRow; i < lenPlateColor; i++) {
    var colButton = $('<button class="col-md-1"></button>');
    colButton.attr('id', `${plateColor[i]}`);
    colButton.attr('class', `${plateColor[i]}`);
    colButton.addClass('btn-color');
    $('#second-row-plate').append(colButton);
}

for (var i = 0; i < lenFeatures / 2; i++) {
    if (i === 0) {
        var row = $('<div class="row"><button id = "' + paint.features[i] + '" class="col-md-1 fas fa-eraser"></button><button id = "' + paint.features[i + 1] + '" class="col-md-1 fas fa-pencil-alt"></button></div>');
    }
    if (i === 1) {
        var row = $('<div class="row"><button id = "' + paint.features[i + 1] + '" class="col-md-1 fas fa-brush"></button><button id = "' + paint.features[i + 2] + '" class="col-md-1 fas ' + paint.features[i + 2] + '"></button></div>');

    }
    if (i === 2) {
        var row = $('<div class="row"><button id = "' + paint.features[i + 2] + '" class="col-md-1 fas ' + paint.features[i + 2] + '"" data-toggle="modal" data-target="#exampleModalCenter"></button></div>');

    }
    $("#container-nav-bar").append(row);

}



$(".btn-color").click(function (e) {
    if (e.button === 0) {
        currentColor = e.target.id;
        $('#canvas').css('cursor', 'crosshair');
        currentColorBox();
    }
})

var eraser = () => {
    $(".draw").mousemove(function (e) {
        e.target.remove();
    })
}

$("#eraser").click(function (e) {
    if (e.button === 0) {
        var urlCursor = '../src/cursor/eraser.cur';
        $("#canvas").css('cursor', `url(${urlCursor}),auto`);
        eraser();
    }
})


var listnerMouseToBrush = (sizeBrush) => {
    $("#canvas").mousedown(function (eventObjectCanvas) {
        if (eventObjectCanvas.button === 0) {
            $("#canvas").css('cursor', `url(${cursor.cursor}),auto`);
            $(this).mousemove(function (eventObjectCanvas) {
                if (currentColor !== undefined) {

                    var left = eventObjectCanvas.pageX - $('#canvas').offset().left + 'px';
                    var top = eventObjectCanvas.pageY - $('#canvas').offset().top + 'px';
                    var spanDraw = $('<span id="draw-span" class="draw"></span>');
                    $(spanDraw).addClass(`${currentColor}`);
                    $(spanDraw).css("height", `${sizeBrush.heightBrush}px`);
                    $(spanDraw).css("width", `${sizeBrush.widthBrush}px`);
                    $(spanDraw).css("left", `${left}`);
                    $(spanDraw).css("top", `${top}`);
                    $('#canvas').append(spanDraw);
                }
            });
        }
        if (eventObjectCanvas.button === 2) {
            var urlCursor = '../src/cursor/eraser.cur';
            $("#canvas").css('cursor', `url(${urlCursor}),auto`);
            $(this).mousemove(function (eventObjectCanvas) {
                $(".draw").mousemove(function (e) {
                    e.currentTarget.remove();
                })
            });
        }
    }).mouseup(function () {
        $(this).unbind('mousemove');
    });
}
listnerMouseToBrush(sizeBrush);


var showBarSize = () => {
    $('.btn-group-size').css('display', 'block');
}

$('#brush').click(() => {
    console.log('click');
    var urlCursor = '../src/cursor/brush.cur';
    cursor.cursor = urlCursor;
    $("#canvas").css('cursor', `url(${urlCursor}),auto`);

    showBarSize();
});
var changeBrushSize = () => {
    $('#size-s').mousedown(function (e) {
        if (e.button === 0) {
            sizeBrush.heightBrush = e.currentTarget.children[0].clientHeight;
            sizeBrush.widthBrush = e.currentTarget.children[0].clientWidth;

            $('#size-s').addClass('click-box-size');
            $('#size-m').removeClass('click-box-size');
            $('#size-l').removeClass('click-box-size');
            $('#size-xl').removeClass('click-box-size');

        }
    })
    $('#size-m').mousedown(function (e) {
        if (e.button === 0) {
            sizeBrush.heightBrush = e.currentTarget.children[0].clientHeight;
            sizeBrush.widthBrush = e.currentTarget.children[0].clientWidth;
            $('#size-m').addClass('click-box-size');
            $('#size-s').removeClass('click-box-size');
            $('#size-l').removeClass('click-box-size');
            $('#size-xl').removeClass('click-box-size');
            $(".draw").addClass('size-m');
            listnerMouseToBrush(sizeBrush);

        }


    })
    $('#size-l').mousedown(function (e) {
        if (e.button === 0) {
            sizeBrush.heightBrush = e.currentTarget.children[0].clientHeight;
            sizeBrush.widthBrush = e.currentTarget.children[0].clientWidth;
            $('#size-l').addClass('click-box-size');
            $('#size-s').removeClass('click-box-size');
            $('#size-m').removeClass('click-box-size');
            $('#size-xl').removeClass('click-box-size');
        }


    })
    $('#size-xl').mousedown(function (e) {
        if (e.button === 0) {
            sizeBrush.heightBrush = e.currentTarget.children[0].clientHeight;
            sizeBrush.widthBrush = e.currentTarget.children[0].clientWidth;
            $('#size-xl').addClass('click-box-size');
            $('#size-s').removeClass('click-box-size');
            $('#size-m').removeClass('click-box-size');
            $('#size-l').removeClass('click-box-size');
        }


    })
}
changeBrushSize();

var currentColorBox = () => {
    $(".current-color").css('background-color', `${currentColor}`);

}
currentColorBox();


$('#pencil').mousedown(function (e) {
    if (e.button === 0) {
        var urlCursor = '../src/cursor/pencil.cur';
        cursor.cursor = urlCursor;
        $("#canvas").css('cursor', `url(${urlCursor}),auto`);



    }

})



$('#resize').mousedown(function (e) {
    if (e.button === 0) {
        console.log('click');
        $(document.body).append(modal);

    }
});

