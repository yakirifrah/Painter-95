    "use strict";
    var plateColor = paint.plateColor;
    var lenPlateColor = plateColor.length;
    var lenPlateColorFirstRow = plateColor.length / 2;
    var higthPostion;
    var widthPosition;
    var currentColor = 'black';
    var lenFeatures = paint.features.length;
    var sizeBrush = {
                        widthBrush:3,
                        heightBrush:3
                    };

    var sideBarMenu = `<ul class="navbar-nav">
                        <div id="container-nav-bar" class="container">
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
        $("#container-nav-bar").append(row);

    }



    $(".btn-color").click(function (e) {
        if (e.button === 0) {
            currentColor = e.target.id;
            $('#canvas').css('cursor', 'crosshair');
        }
    })

    var eraser = () => {
        $(".draw").mousemove(function (e) {
            e.target.remove();
        })
    }

    $("#eraser").click(function(e) {
        if (e.button === 0) {
            var urlCursor = '../src/cursor/eraser.cur';
            $("#canvas").css('cursor', `url(${urlCursor}),auto`);
            eraser();
        }
    })


var listnerMouseToBrush = (sizeBrush) => {
    $("#canvas").mousedown(function (eventObjectCanvas) {
        if (eventObjectCanvas.button === 0) {
            $('#canvas').css('cursor', 'crosshair');
            $(this).mousemove(function (eventObjectCanvas) {
                if (currentColor !== undefined) {
                    var left = eventObjectCanvas.pageX - $('#canvas').offset().left + 'px';
                    var top = eventObjectCanvas.pageY - $('#canvas').offset().top + 'px';
                    var spanDraw = $('<span id="draw-span" class="draw"></span>');
                    $(spanDraw).addClass(`${currentColor}`);
                    $(spanDraw).css("height",`${sizeBrush.heightBrush}px`);
                    $(spanDraw).css("width",`${sizeBrush.widthBrush}px`);
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

    // $("#canvas").mousedown(function (eventObjectCanvas) {
    //     if (eventObjectCanvas.button === 0) {
    //         $('#canvas').css('cursor', 'crosshair');
    //         $(this).mousemove(function (eventObjectCanvas) {
    //             if (currentColor !== undefined) {
    //                 var left = eventObjectCanvas.pageX - $('#canvas').offset().left + 'px';
    //                 var top = eventObjectCanvas.pageY - $('#canvas').offset().top + 'px';
    //                 var spanDraw = $('<span id="draw-span" class="draw"></span>');
    //                 $(spanDraw).addClass(`${currentColor}`);
    //                 $(spanDraw).css("left", `${left}`);
    //                 $(spanDraw).css("top", `${top}`);
    //                 $('#canvas').append(spanDraw);
    //             }
    //         });
    //     }
    //     if (eventObjectCanvas.button === 2) {
    //         var urlCursor = '../src/cursor/eraser.cur';
    //         $("#canvas").css('cursor', `url(${urlCursor}),auto`);
    //         $(this).mousemove(function (eventObjectCanvas) {
    //             $(".draw").mousemove(function (e) {
    //             e.currentTarget.remove();
    //             })
    //         });
    //     }
    // }).mouseup(function () {
    //     $(this).unbind('mousemove');
    // });


    //1. when onClick brush
    //2. show bar size by change bax-size display
    var showBarSize = () => {
        console.log('psdd')
        $('.btn-group-size').css('display','block');
    }

    $('#brush').click(()=> { 
        console.log('click');
        showBarSize();
    });


    //1. listner div size
    //2. update the style span size 
    //3. 
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
            
