"use strict";
var plateColor = paint.plateColor;
var lenPlateColor = plateColor.length;
var lenPlateColorFirstRow = plateColor.length / 2;
var higthPostion;
var widthPosition;
var currentColor = 'black';
var lenFeatures = paint.features.length;
var canvasBorder = 17;
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

var mode = {
    paint: true,
    eraser: false
}

//skeleton 
var innerBody = `<div class="container">
                            <div class="title text-center">
                                <h1 class="style-title">Paint 95</h1>
                            </div>
                            <div class="row pt-4 justify-content-md-center flex-nowrap">
                                <div class="col-md-1 mr-3">
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
                                <div class = "row pt-4 flex-nowrap">
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
                            <span class="input-group mb-3">
                                <span class="input-group-prepend">
                                    <span class="input-group-text">width:</span>
                                </span>
                                <input id="width-canvas" onchange = "widthInput(this.value)" type="text" class="form-control">
                                <span class="input-group-append">
                                    <span class="input-group-text">px</span>
                                </span>
                            </span>
                            <span class="input-group mb-3">
                                <span class="input-group-prepend">
                                    <span class="input-group-text">height:</span>
                                </span>
                                <input id="height-canvas" onchange = "heightInput(this.value)" type="text" class="form-control">
                                <span class="input-group-append">
                                    <span class="input-group-text">px</span>
                                </span>
                            </span>
                        </div>
                        <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button id="save-resize-canvas" onclick="saveResize()" type="button" class="btn btn-primary" data-dismiss="modal">Save</button>
                        </div>
                    </div>
                </div>  
        </div>`

$(document.body).append(innerBody);


var initPlateRow = () => {
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
}


var initFeaturesPaint = () => {
    for (var i = 0; i < lenFeatures; i++) {
        if (i === 0) {
            var row = $('<div class="row flex-nowrap"><button data-toggle="tooltip" data-placement="top" title="eraser" id = "' + paint.features[i] + '" class="col-md-12 fas fa-eraser"></button></div>');
        }
        if (i === 1) {
            var row = $('<div class="row flex-nowrap"><button data-toggle="tooltip" data-placement="left" title="brush" id = "' + paint.features[i] + '" class="col-md-12 fas fa-brush"></button></div>');

        }
        if (i === 2) {
            var row = $('<div class="row flex-nowrap"><button title="resize" id = "' + paint.features[i] + '" class="col-md-12 fas ' + paint.features[i] + '"" data-toggle="modal" data-target="#exampleModalCenter"></button></div>');
        }
        if (i == 3) {
            var row = $('<div class="row flex-nowrap"><button title="new page" id = "' + paint.features[i] + '" class="col-md-12 fas ' + paint.features[i] + '""></button></div>');
        }
        $("#container-nav-bar").append(row);
    }
}
var currentColorBox = () => {
    $(".current-color").css('background-color', `${currentColor}`);
}
var initHtml = () => {
    initPlateRow();
    initFeaturesPaint();
    currentColorBox();
}

initHtml();
var defualtCursor = () => {
    $('#canvas').css('cursor', 'crosshair');
}



$(".btn-color").click(function (e) {
    mode.paint = true;
    mode.eraser = false;
    if (e.button === 0) {
        currentColor = e.target.id;
        defualtCursor();
        currentColorBox();
    }
})

function mouseupBody() {
    $('body').mouseup(function () {
        $('#canvas').unbind('mousemove');
    })

}

$("#canvas").mousedown(function (eventObjectCanvas) {
    mode.eraser = false;
    if (mode.paint) {
        if (eventObjectCanvas.button === 0) {
            defualtCursor();
            $(this).mousemove(function (eventObjectCanvas) {
                if (currentColor !== undefined) {
                    var wantedWidth = sizeCanvas.width;
                    var wantedHeight = sizeCanvas.height;
                    var left = eventObjectCanvas.pageX - $(this).offset().left;
                    var top = eventObjectCanvas.pageY - $(this).offset().top;
                    if (left < wantedWidth - canvasBorder && top < wantedHeight - canvasBorder) {
                        var spanDraw = $('<span class="draw"></span>');
                        $(spanDraw).addClass(`${currentColor}`);
                        $(spanDraw).css("height", `${sizeBrush.heightBrush}px`);
                        $(spanDraw).css("width", `${sizeBrush.widthBrush}px`);
                        $(spanDraw).css("left", `${left}px`);
                        $(spanDraw).css("top", `${top}px`);
                        $('#canvas').append(spanDraw);
                    }
                }
            }).mouseup(function (e) {
                if (e.button === 0) {
                    mouseupBody();
                    $(this).unbind('mousemove');
                }
            });


        }
    }

})


var stopePropagationMde = () => {
    $('*').bind('blur change click dblclick error focus focusin focusout hover keydown keypress keyup load mousedown mouseenter mouseleave mousemove mouseout mouseover mouseup resize scroll select submit', function (event) {
        event.stopPropagation();
    });
}

$("#eraser").click(function (e) {
    mode.eraser = true;
    mode.paint = false;
    if (e.button === 0) {
        var urlCursor = '../src/cursor/eraser.cur';
        $("#canvas").css('cursor', `url(${urlCursor}),auto`);
        eraser();
    }
})

var eraser = () => {
    $(".draw").mousedown(function (e) {
        if (e.button === 0) {
            $("#canvas").mousemove(function (eventDrawObj) {
                console.log(eventDrawObj);
                if (eventDrawObj.target.childNodes.length === 0) {
                    $(eventDrawObj.target).attr('class', 'draw white');
                }
            }).mouseup(function (e) {
                if (e.button === 0) {
                    mouseupBody();
                    $('#canvans').unbind('mousemove');
                }
            });
        }
    })
}

var showBarSize = () => {
    $('.btn-group-size').css('display', 'block');
}

$('#brush').click(() => {
    $("#canvas").on('mousedown');
    var urlCursor = '../src/cursor/brush.cur';
    cursor.cursor = urlCursor;
    $("#canvas").css('cursor', `url(${urlCursor}),auto`);
    showBarSize();
});
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

$('#resize').click(function (e) {
    $(".draw").remove();

    let newModal = modal;
    $(document.body).append(newModal);
});

var saveResize = () => {
    $('#canvas').css({
        "width": `${sizeCanvas.width}px`,
        "height": `${sizeCanvas.height}px`
    });
    $(".navbar-nav").css("height", `${sizeCanvas.height}`);
}
var heightInput = (val) => {
    sizeCanvas.height = val;
}

var widthInput = (val) => {
    sizeCanvas.width = val;
}

$('#clearScreen').mousedown(function (e) {
    if (e.button === 0) {
        $("#canvas").css('background-image', 'none');
        defualtCursor();
        $(".draw").remove();
    }
});

