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

var mode = {
    paint: true,
    eraser: false
}

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
    for (var i = 0; i < lenFeatures / 2; i++) {
        if (i === 0) {
            var row = $('<div class="row"><button data-toggle="tooltip" data-placement="top" title="eraser" id = "' + paint.features[i] + '" class="col-md-1 fas fa-eraser"></button><button data-toggle="tooltip" data-placement="top" title="pencil" id = "' + paint.features[i + 1] + '" class="col-md-1 fas fa-pencil-alt"></button></div>');
        }
        //next version
        // if (i === 1) {
        //     var row = $('<div class="row"><button data-toggle="tooltip" data-placement="left" title="brush" id = "' + paint.features[i + 1] + '" class="col-md-1 fas fa-brush"></button><button data-toggle="tooltip" data-placement="right" title="Tooltip on top" id = "' + paint.features[i + 2] + '" class="col-md-1 fas ' + paint.features[i + 2] + '"></button></div>');

        // }
        if (i === 1) {
            var row = $('<div class="row"><button data-toggle="tooltip" data-placement="left" title="brush" id = "' + paint.features[i + 1] + '" class="col-md-1 fas fa-brush"></button></div>');

        }
        if (i === 2) {
            var row = $('<div class="row"><button title="resize" id = "' + paint.features[i + 2] + '" class="col-md-1 fas ' + paint.features[i + 2] + '"" data-toggle="modal" data-target="#exampleModalCenter"></button><button title="new page" id = "' + paint.features[i + 3] + '" class="col-md-1 fas ' + paint.features[i + 3] + '""></button></div>');

        }
        //next version
        // if (i === 3) {
        //     var row = $('<div class="row"><button id = "' + paint.features[i + 4] + '" class= "jscolor {valueElement:"valueInput", styleElement:"styleInput"}  col-md-4 fas ' + paint.features[i + 4] + '" title="pick color">pick</button></div>')
            
        // }
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


//think about default cursor when i'm over canvas
// create objects of brush,pencail as..
$(".btn-color").click(function (e) {
    $("#canvas").bind('mousedown');
    mode.paint = true;
    mode.eraser = false;
    if (e.button === 0) {
        currentColor = e.target.id;
        defualtCursor();
        currentColorBox();
    }
})




$("#canvas").mousedown(function (eventObjectCanvas) {
    stopePropagationMde();
    mode.eraser = false;
    if (mode.paint) {
        if (eventObjectCanvas.button === 0) {
            defualtCursor();
            $(this).mousemove(function (eventObjectCanvas) {
                if (currentColor !== undefined) {
                    var left = eventObjectCanvas.pageX - $('#canvas').offset().left + 'px';
                    var top = eventObjectCanvas.pageY - $('#canvas').offset().top + 'px';
                    var spanDraw = $('<span class="draw"></span>');
                    $(spanDraw).addClass(`${currentColor}`);
                    $(spanDraw).css("height", `${sizeBrush.heightBrush}px`);
                    $(spanDraw).css("width", `${sizeBrush.widthBrush}px`);
                    $(spanDraw).css("left", `${left}`);
                    $(spanDraw).css("top", `${top}`);
                    $('#canvas').append(spanDraw);
                }
            }).mouseup(function (e) {
                if (e.button === 0) {
                    $(this).unbind('mousemove');
                }
            });
        }
    }
    if (eventObjectCanvas.button === 2) {
        mode.paint = false;
        var urlCursor = '../src/cursor/eraser.cur';
        $("#canvas").css('cursor', `url(${urlCursor}),auto`);
        stopePropagationMde();
         $('.draw').mousedown(function (e) {
             $('#canvas').mousemove(function(eventDrawMove){
                 console.log(eventDrawMove);
                e.currentTarget.remove();
             })
        }).mouseup(function (e) {
            console.log(e);
            if (e.button === 0) {
                $(this).unbind('mousemove');
            }
        });

        mode.paint = true;

    }
})



// $('#canvas .draw').mousedown(function (eventDrawObj) {
//     console.log('clicckckckc');
//     if (eventDrawObj.button === 2) {
//         var urlCursor = '../src/cursor/eraser.cur';
//         $("#canvas").css('cursor', `url(${urlCursor}),auto`);
//         $(this).mousemove(function (eventDrawMove) {
//             eventDrawMove.currentTarget.remove();
//         })
//     }
// })

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
            $("#canvas .draw").mousemove(function (eventDrawObj) {
                eventDrawObj.currentTarget.remove();
            })
        }
    })
}







var showBarSize = () => {
    $('.btn-group-size').css('display', 'block');
}

$('#brush').click(() => {
    console.log('click');
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
        // listnerMouseToBrush(sizeBrush);
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




$('#pencil').mousedown(function (e) {
    $("#canvas").bind('mousedown');
    if (e.button === 0) {
        var urlCursor = '../src/cursor/pencil.cur';
        cursor.cursor = urlCursor;
        $("#canvas").css('cursor', `url(${urlCursor}),auto`);
    }

})



$('#resize').mousedown(function (e) {
    if (e.button === 0) {
        $(document.body).append(modal);

    }
});

var saveResize = () => {
    $('#canvas').css({ "width": `${sizeCanvas.width}px`, "height": `${sizeCanvas.height}px` });
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
//next version
// $('#hourse').mousedown(function (e) {
//     mode.paint  = false;
//     if (e.button === 0) {
//         var urlCursor = '../src/cursor/horse.cur';
//         cursor.cursor = urlCursor;
//         $("#canvas").css('cursor', `url(${urlCursor}),auto`);
//         $("#canvas").mousedown(function (e) {
//             console.log(e);
//                 var left = e.pageX - $('#canvas').offset().left + 'px';
//                 var top = e.pageY - $('#canvas').offset().top + 'px';
//                 $("#canvas").css({ "background-image": 'url("../src/img/hourse.png")', "background-size": "200px 200px, cover", "background-repeat": "no-repeat", "background-position": `${left} ${top}` });
            
//         }).mouseup(function () {
//             console.log("click 1");
//             mode.paint = true;
//             $("#canvas").css('cursor', ``);
//             $("#canvas").off('mousedown');

//         });

//     }
// })


