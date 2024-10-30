jQuery(document).ready(function($){

    if($('#cg_check_load_time').length<1){
        return;
    }


    // Wichtige Definition Vorab!
    window.innerHeight == screen.height;


    cgJsClass.slider.slide.values.cg_star_on_slider = jQuery("#cg_star_on_slider").val();
    cgJsClass.slider.slide.values.cg_star_off_slider = jQuery("#cg_star_off_slider").val();

    function cgCreateObjects() {
        // Alle image ids hier sammeln
          $(".cg_show, .cg_show:hidden").each(function (index) {
     //   $(".cg_show").each(function (index) {

            var count = index+1;

            var id = $(this).find('.cg_gallery_info').attr('data-cg_image_id');
            cgJsClass.slider.slide.objects.allIds[count]=id;
            cgJsClass.slider.slide.objects.allCounts[id]=count;
            //cgJsClass.slider.slide.objects.values.[count]=id;
            cgJsClass.slider.slide.values.imgSrcThumb[count]=$(this).find('.imgSrcThumb').val();
            cgJsClass.slider.slide.values.imgSrcThumbWidth[count]=$(this).find('.imgSrcThumbWidth').val();
            cgJsClass.slider.slide.values.imgSrcMedium[count]=$(this).find('.imgSrcMedium').val();
            cgJsClass.slider.slide.values.imgSrcMediumWidth[count]=$(this).find('.imgSrcMediumWidth').val();
            cgJsClass.slider.slide.values.imgSrcLarge[count]=$(this).find('.imgSrcLarge').val();
            cgJsClass.slider.slide.values.imgSrcLargeWidth[count]=$(this).find('.imgSrcLargeWidth').val();
            cgJsClass.slider.slide.values.imgSrcOriginal[count]=$(this).find('.imgSrcOriginal').val();
            cgJsClass.slider.slide.values.cgImageThumbRotation[count]=$(this).find('.cgImageThumbRotation').val();
            cgJsClass.slider.slide.values.cgImageSourceRotation[count]=$(this).find('.cgImageSourceRotation').val();
            cgJsClass.slider.slide.values.cgRotationThumbNumber[count]=$(this).find('.cgRotationThumbNumber').val();
            cgJsClass.slider.slide.values.urlForFacebook[count]=$(this).find('.urlForFacebook').val();

            cgJsClass.slider.slide.values.width[count]=$(this).find('.widthOriginalImg').val();
            cgJsClass.slider.slide.values.height[count]=$(this).find('.heightOriginalImg').val();

            var realId = $(this).find('.realId').val();
            //  console.log(realId);

            cgJsClass.slider.slide.values.realId[count]=realId;
            cgJsClass.slider.slide.values.ratingImage[count]=$(this).find('.averageStarsRounded').val();
            cgJsClass.slider.slide.values.countRatingQuantity[count]=$(this).find("#countRatingQuantity"+realId+"").val();
            cgJsClass.slider.slide.values.countRatingSQuantity[count]=$(this).find("#countRatingSQuantity"+realId+"").val();
            cgJsClass.slider.slide.values.countCommentsQuantity[count]=$(this).find("#countCommentsQuantity"+realId+"").val();
            cgJsClass.slider.slide.values.cg_check_voted[count]=$(this).find("#cg_check_voted"+realId+"").val();
            cgJsClass.slider.slide.values.cg_fb_reload[count]=$(this).find("#cg_fb_reload"+realId+"").val();
            cgJsClass.slider.slide.values.lengthInput[count]=$(this).find("p").length;
            cgJsClass.slider.slide.values.userInput[count]=$(this).find(".cg_user_input");
            var cg_user_input = cgJsClass.slider.slide.values.userInput[count];
            cgJsClass.slider.slide.values.visible[count] = true;

            if(cg_user_input.find('.cg_user_input_url').length>=1){

                var url = cg_user_input.find('.cg_user_input_url').attr('href');
                if(url.length>1){

                    var begin = url.substr(0, 7);

                    if(begin.indexOf('http') === -1){
                        var url = 'http://'+url;
                        cg_user_input.find('.cg_user_input_url').attr('href',url);
                    }

                }

            }

            cg_user_input = cg_user_input.html();
            cgJsClass.slider.slide.values.userInput[count] = cg_user_input;

            cgJsClass.slider.slide.objects.countAll = count;
        });
    }


    cgCreateObjects();

    if($('.cgCatSelectArea').hasClass('cgCatSelectAreaHidden')){
        if($('.cgCatSelectArea').length>=1){
            cgJsClass.gallery.vars.checkCatSelector = false;
        }
    }else{
        if($('.cgCatSelectArea').length>=1){
            cgJsClass.gallery.vars.checkCatSelector = true;
        }
    }


    if(cgJsClass.gallery.vars.checkCatSelector==true){


        function cgCheckLocalStorage(){
        var cg1Test = 'cg1Test';
        try {
            localStorage.setItem(cg1Test, cg1Test);
            localStorage.removeItem(cg1Test);
            return true;
        } catch(e) {
            return false;
        }
    }

    if(cgCheckLocalStorage() === true){
        cgJsClass.gallery.vars.checkLocalStorage = true;
    }else{
        cgJsClass.gallery.vars.checkLocalStorage = false;
    }

  //  alert(23);
  //  alert($('#cgCatSelectArea').is(':hidden'));



//    alert(cgJsClass.gallery.vars.checkCatSelector);

    var checkSlider = cgJsClass.slider.vars.cg_activate_gallery_slider;


    cgJsClass.slider.slide.values.activatedIds = cg_check_all_acitvated_images_start_obj;
    cgJsClass.slider.slide.values.activatedImageCategoriesIds = cg_check_all_acitvated_images_cats_start_obj;

    }



     //   console.log(cgJsClass.slider.slide.values.activatedIds);


    /*    if($('#cg_activate_gallery_slider').val()!=1){



            $( ".cg_check_all_acitvated_images" ).each(function() {
               // alert($(this).val());
                cgJsClass.slider.slide.values.activatedIds[$(this).val()]=true;

            });

        //    console.log(cgJsClass.slider.slide.values.activatedIds);

            return false;
        }*/

    // WICHTIG!!!! Ganz wichtig, damit später über allen elmenten überragt.
    $('#cg_slider_main_div').appendTo('body');
    $('.cg-carrousel-img img').removeAttr('style');

    //console.log(cgJsClass.slider.slide.objects.allIds);
    //------------------------------------------------------------------------------//
    // Bereich vor dem Slider --- Anfang
    //------------------------------------------------------------------------------//


    $(document).on('click', '#close_slider_button', function(){

/*        var x = document.getElementsByName("viewport");
        if(typeof x[0] !== 'undefined'){
            x[0].setAttribute('content',cgJsClass.slider.vars.viewportContent);
        }*/
        cgJsClass.slider.close.init();

        // Pauschal fullscreen beenden
        if(cgJsClass.slider.vars.isIOS==false){
            cgJsClass.slider.fullScreen.closeFullScreen();
        }

    });

    $(document).on('click', '#cg_slider_full_screen_icon_img.cg_slider_full_screen', function(){

        if(cgJsClass.slider.vars.isIOS==false) {
            cgJsClass.slider.fullScreen.closeFullScreen();
        }

    });


    if(cgJsClass.slider.vars.isMobile==true && cgJsClass.slider.vars.isIOS==false){

        document.addEventListener("fullscreenchange", function () {
            var state = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;

            //console.log('Change Fullscreen 1')

            if((window.fullScreen) ||
                (window.innerWidth == screen.width && window.innerHeight == screen.height)) {

            } else {
                cgJsClass.slider.close.init();
            }

        });

        document.addEventListener("mozfullscreenchange", function () {
            var state = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
            //if(state==false){cgJsClass.slider.close.init();}
            //console.log('Change Fullscreen 2')

            if((window.fullScreen) ||
                (window.innerWidth == screen.width && window.innerHeight == screen.height)) {

            } else {
                cgJsClass.slider.close.init();
            }
        });

        document.addEventListener("webkitfullscreenchange", function () {
            var state = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
            //if(state==false){cgJsClass.slider.close.init();}
            //console.log('Change Fullscreen 3')

            if((window.fullScreen) ||
                (window.innerWidth == screen.width && window.innerHeight == screen.height)) {

            } else {
                cgJsClass.slider.close.init();
            }
        });

        document.addEventListener("msfullscreenchange", function () {
            var state = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
            //if(state==false){cgJsClass.slider.close.init();}
            //console.log('Change Fullscreen 4')

            if((window.fullScreen) ||
                (window.innerWidth == screen.width && window.innerHeight == screen.height)) {

            } else {
                cgJsClass.slider.close.init();
            }
        });

    }



// Schließen von Kommentar Fenster im Slider und in der Gallerie --- ENDE

    var cg_activate_gallery_slider = $("#cg_activate_gallery_slider").val();


    //------------------------------------------------------------------------------//
    // Bereich vor dem Slider --- ENDE
    //------------------------------------------------------------------------------//



    if(cg_activate_gallery_slider == 1){


        /*
        ABLAUF
        1.  Durch klicken wird in der Hauptfunktion position berechnet
        2. Display none Elemente werden wieder visible
        3. Beim Wegklicken verschwinden Display none Elemente
        4. Beim Wiederklicken fängt es wieder bei 1 an

        Aufteilung insgesamt:

        1. Hovern
        2. Resize
        3. Hauptfunktion
        4. Click Events



        */

        // Zu tun: ins leere kicken comments block wird geschlossen, auf pfeil klicken comments block wird geschlossen, sliden bis zu gewisser stelle comments block wird geschlossen


        // Schließen (X) Buttons beim imgContainer und commentContainer einbauen

        // Beim Rating wird nicht gespeichert. Alle Infos wie bei Show_Image müssen gewonnen werden.

        // Wenn Bilder noch nicht geladen sind, dann soll Loading Gif erscheinen


        // Hidden input Feld wo aktuelles CG immer angezeigt wird, immer in Abhängigkeit von left.
        // Bei der Funktion r zur Orientierung nutzen
        // Formel beim Dragging berechnung
        // Bei Klicking dann später addieren und subtrahieren vom aktuellem

// Möglichkeiten die Bilder alle immer in gleicher größe als Thumb anzuzeigen

//Vollbild machen slider. Sowohl Verticale Pfeilfläche einbauen über die ganze Höhe. Wie auch Royal slider Funktion.


// Anzeigen, dass geklickt werden kann wenn man über Pfeile hovert

// Bewertungsmöglichkeit einbauen. Am besten da wo bewertungen in der Gallerie Ansicht drin sind, das Element klonen (clone).

// Als nächstes Elemente in der Box zentrieren dann kommentare einbauen

// Komplett ohne Slider, mit direktem bewerten und kommentieren

// Je nach dem bei welchem Bild man sich befindet sollte entsprechende Picture ID angezeigt werden


// Wichtige Variablen die man dauernd nutzt werden schon hier bestimmt
        var cg_hide_until_vote = $("#cg_hide_until_vote").val();


        var cg_hide_info_png = $('#cg_hide_info_png').val();
        var cg_show_info_png = $('#cg_show_info_png').val();




        // Cursor Style bestimmen, je nach dem ob es erlaubt ist aus der Gallerie zu voten oder nicht





        var cg_vote_in_gallery = $("#cg_vote_in_gallery").val();
        var cg_comment_in_gallery = $("#cg_comment_in_gallery").val();

        var cg_shown_images = $(".cg_show").length;



        var userBrowserLang = navigator.language || navigator.userLanguage;

        if(userBrowserLang.indexOf("en")==0){var widthFbDiv = 155;}
        else if(userBrowserLang.indexOf("de")==0){var widthFbDiv = 190;}
        else if(userBrowserLang.indexOf("fr")==0){var widthFbDiv = 182;}
        else if(userBrowserLang.indexOf("es")==0){var widthFbDiv = 207;}
        else if(userBrowserLang.indexOf("pt")==0){var widthFbDiv = 179;}
        else if(userBrowserLang.indexOf("nl")==0){var widthFbDiv = 195;}
        else if(userBrowserLang.indexOf("ru")==0){var widthFbDiv = 217;}
        else if(userBrowserLang.indexOf("zh")==0){var widthFbDiv = 136;}
        else if(userBrowserLang.indexOf("ja")==0){var widthFbDiv = 177;}
        else{var widthFbDiv = 152;}


        $( '[id*=cg_slider_arrow]' ).hover(function() {
            $(this).css("cursor","pointer");
        });

        if(cg_hide_until_vote==1 && cg_vote_in_gallery==1){

            $( '.rating_cg' ).hover(function() {
                $(this).css("cursor","pointer");
            });


        }

        if(cg_comment_in_gallery==1 && cg_vote_in_gallery==1){

            $( '[id*=rating_cgc]' ).hover(function() {
                $(this).css("cursor","pointer");
            });

        }



        // device detection, damit elemente beim klicken auf imgContainer nicht verschwinden und rating und comment auf mobile funktionieren
        var isMobile = false; //initiate as false


        // device detection, damit elemente beim klicken auf imgContainer nicht verschwinden und rating und comment auf mobile funktionieren
        if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
            || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;


        // Pfeile verstecken bei der Mobile Version

        if(isMobile==true){
            $( "#cg_slider_arrow_left" ).hide();
            $( "#cg_slider_arrow_right" ).hide();
        }



        $(document).on('click', '#imgContainer', function(e){

            $('#close_slider_button').css('display', 'block');

        });



        $(document).on('touchstart', '#imgContainer', function(e) {
        e.stopPropagation();

            var start_x = e.originalEvent.touches[0].pageX;
            //console.log('start_x REAL: '+start_x);
            cgJsClass.slider.touch.cg_slider_touchstart = start_x;

         //   e.stopPropagation();


        });


        document.addEventListener('touchmove', function(e) {
            e.stopPropagation();

            //$(document).on('touchmove', '#imgContainer', function(e) {
        //    e.stopPropagation();

          // alert('touchmove');
        //   alert(e.changedTouches[0].pageX);


            var xPos = e.changedTouches[0].pageX;

                cgJsClass.slider.touch.cg_slider_touchend = xPos;

          //            e.stopImmediatePropagation();


            }, true);

//target the entire page, and listen for touch events
        /*
                $('html, body').on('touchstart touchmove', function(e){
                    //prevent native touch activity like scrolling
                    e.preventDefault();
                });
        */


        $(document).on('touchend', '#imgContainer', function(e) {
            e.stopPropagation();

            //    e.preventDefault();
      //      e.stopPropagation();

            //console.log('touchend');

            // Zur Prüfung ob losgelassen wurde
            cgJsClass.slider.touch.cg_slider_release_toch=0;
            var start_x = cgJsClass.slider.touch.cg_slider_touchstart;
            var end_x = cgJsClass.slider.touch.cg_slider_touchend;

            var classCGimage = cgJsClass.slider.slide.objects.currentNumber;
            //console.log('start_x: '+start_x);
            //console.log('end_x: '+end_x);
           // classCGimage = parseInt(classCGimage.substr(8));

/*            if(typeof end_x=='undefined'){
                return false;
            }*/

            if (end_x === 0) {
                var touchDistance = 0;
            }
            else {
                var touchDistance = end_x - start_x;
            }


            //console.log('touchDistance Final: '+touchDistance);

            if(touchDistance>-100 && touchDistance<100 ){
                return;
            }

            // Beim Zug nach rechts wird die Klassen zurück geslidet
            if (touchDistance >= 100) {

                var currentCount = cgJsClass.slider.slide.objects.currentNumber-1;
                var lastTrueCheck = 0;
                var lastTrueValue = cgJsClass.slider.slide.objects.currentNumber-1;

                cgJsClass.slider.slide.values.visible.forEach(function (value,index) {

                    if(currentCount==index && value==false){
                        lastTrueValue=lastTrueCheck;
                    }

                    if(value==true){
                        lastTrueCheck=index;
                    }


                });

            //    console.log('classCGimage left')
            //    console.log(classCGimage)


                var classCGimage = lastTrueValue;

              //  classCGimage = classCGimage - 1;


                var goSliderAnimation = true;

            }


            // Beim Zug nach links wird die Klassen nach vorne geslidet
            if (touchDistance <= -100) {

                var currentCount = cgJsClass.slider.slide.objects.currentNumber;
                var breakLoop = false;

                cgJsClass.slider.slide.values.visible.forEach(function (value,index) {

                    if(index>currentCount && value==true && breakLoop==false){
                        // index weil der erste immer empty ist!!!!!
                        cgJsClass.slider.slide.objects.currentNumber = index;
                        breakLoop = true;
                    }
                });

                // var classCGimage = cgJsClass.slider.slide.objects.currentNumber+1;
                var classCGimage = cgJsClass.slider.slide.objects.currentNumber;

            //    console.log('classCGimage right')
             //   console.log(classCGimage)
           //     classCGimage = classCGimage + 1;
                var goSliderAnimation = true;
            }


            // Prüfen ob Slider am Ende oder am Anfang ist
            if (classCGimage < 1) {
                classCGimage = 1;
            }
            if (classCGimage > cg_shown_images) {
                classCGimage = cg_shown_images;
            }


            classCGimage = "cg_image" + classCGimage;
            cgJsClass.slider.slide.objects.fadeOutCurrentUserInfo();
            cgJsClass.slider.slide.init(classCGimage);


          //  e.stopPropagation();



        });





        /*
            $("#imgContainer").bind('touchstart', function(e){



            }).bind('touchend', function(e){


            });*/






// Reaktion auf touch --- ENDE


// CG Slider Full Size


        /*        $( window ).resize(function() {

                    if(isMobile==true){
                        // var widthCGoverlay = $(document).width();
                        var widthCGoverlay = $('#cg_slider_main_div').width();
                    }
                    else{
                        //var widthCGoverlay = $(window).width();
                        var widthCGoverlay = $('#cg_slider_main_div').width();
                    }

                    //alert(widthCGoverlay);

                    if(widthCGoverlay<=800){
                        exitFullSizeSlider();
                       // return false;
                    }
                    else{
                      //  return false;
                        fullSizeSlider();
                    }

                });*/


        $(document).on('click', '#cg_slider_full_size_view_icon_div', function(e){


            cgJsClass.slider.vars.fullSizeResized = true;
            cgJsClass.slider.resize.fullSizeSlider();
            cgJsClass.slider.resize.hideCarrousel();
            cgJsClass.slider.resize.init();

            //cgSliderResize();

        });

        $(document).on('click', '#cg_slider_exit_full_size_view_icon_div', function(e){


            cgJsClass.slider.vars.fullSizeResized = false;
            cgJsClass.slider.resize.exitFullSizeSlider();
            cgJsClass.slider.resize.showCarrousel();
            // Ansonsten wird die rechte Box kurz zu sehen sein
            $('.cg_img_box').css('visibility','hidden');
            cgJsClass.slider.resize.init();

            //cgSliderResize();


/*            var classCGimageNumber = $('#cg_actual_slider_class_value').val();
            classCGimageNumber = parseInt(classCGimageNumber.substr(8));
            $('#cg_img_box_'+classCGimageNumber+'').css('visibility','visible');*/


        });





// CG Slider Full Size --- ENDE










//---------------------- Mousedown Mouseup Events für Image Container --- ENDE --------------------------------
//----------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------



        // Funktion zur Ausführung der Berechnung


        // Funktion zur Ausführung der Berechnung --- ENDE






        // Funktion zur Ausführung der Berechnung --- ENDE













        // Wenn Picture ID Parameter mitgeschickt wird und gallery Script aktiviert ist --- ENDE




// Show/Zeige ImgContainer für Slider   ---- ENDE



// Keypress animation



//var event = new KeyboardEvent('keydown');

        $(document).keydown(function(e) {


            if($('#imgContainer').is(':visible')) {

                if(e.which == 37) { // left

                     cgJsClass.slider.click.clickLeft(this,true);

                }
                else if(e.which == 39) { // right
                    cgJsClass.slider.click.clickRight(this,true);


                }

            }

        });



// Keypress animation --- ENDE













// Pfeilimages klicken rechts links

//var clicks = 0;



        $(function(){
            $("#cg_slider_arrow_left_img").on("click", function(e){

                    cgJsClass.slider.click.clickLeft(this);


            });

        });








        $(function(){
            $("#cg_slider_arrow_right_img").on("click", function(e){

                cgJsClass.slider.click.clickRight(this);

            });
        });









// Kommentar in Gallery

        if(cg_comment_in_gallery==1){


            $(document).on('click', '[id*=rating_cgc-]', function(e){


                //  alert(3);

                // Overlay sichtbar machen

                // $('#cg_overlay').css('display', 'block');
                // $('#cg_overlay').toggle();

                // $('#cg_overlay').css('opacity', '0.4');
//   $('#cg_slider_arrow_right').toggle();

                //var widthScreen = $('body').width();
                var widthScreen = $('#cg_slider_main_div').width();
                var marginLeftCommentDiv = (widthScreen-800)/2;

                $('#cg_comments_slider_div').css('left', marginLeftCommentDiv);


                $('#cg_comments_slider_div').toggle();
                var marginLeftCommentCloseDiv = (widthScreen-800)/2+727;

                // alert(4);
                // $('#close_slider_comments_button').css('left', marginLeftCommentCloseDiv);
                $('#cg_comments_slider_div').css('left', marginLeftCommentDiv);
                $('#close_slider_comments_button').toggle();
                var idImageForComment =  parseInt(this.id.substr(11));
                // Haupthidden Feld, dass aktuell geöffnete comment image id zeigt
                $('#cg_slider_comment_picture_id').val(idImageForComment);

                //$('#cg_actual_slider_class_value').val(idImageForComment);
                // Funktion zur Ausführung der Berechnung


                // Prüfen der Wordpress Session id
                var check = $("#cg_check").val();

                //alert(2);
                // I am not a robot checkbox soll auftauchen
                if ($("#"+check+"").length > 0){

                    //alert(3);


                    var onlyCheck = 1;



                }
                else{

                    var cg_language_i_am_not_a_robot = $('#cg_language_i_am_not_a_robot').val();
                    $("#cg_i_am_not_a_robot").append("<input type='checkbox' value='"+check+"' class='"+check+" id='cg_i_am_not_a_robot_checkbox' name='"+check+"' id='"+check+"' '><label for='cg_i_am_not_a_robot_checkbox'>"+cg_language_i_am_not_a_robot+"</label>");

                }


                $("#cg_open_slider_comment").click();

                //  $('#imgContainer').fadeIn('slow');
                // $('#imgContainer').toggle();




                return false;
            });

// Kommentar in Gallery --- ENDE

        }




// Rating Pop Up im Slider, bei hide until vote


        /*
        if(cg_hide_until_vote==1){

               $(document).on('click', '[id*=cg_plz_vote]', function(e){

        //var cg_real_id = $(this).find(".cg_real_id").val();
        var cg_real_id =  parseInt(this.id.substr(11));



        //alert(cg_real_id);

            //var starOnUrl = $("#cg_star_on_slider").val();
            var starOffUrl = $("#cg_star_off_slider").val();

                if(cg_allow_rating==1){

                    var ratingBlock = "<div style='display:inline-block;float:left;width:21px;height:21px;vertical-align: middle;'><img src='"+starOffUrl+"' class='cg_slider_star1' style='float:left;cursor:pointer;' alt='1' id='cg_rate_star"+cg_real_id+"'></div>"+
                      "<div style='display:inline-block;float:left;width:21px;height:21px;vertical-align: middle;'><img src='"+starOffUrl+"' class='cg_slider_star2' style='float:left;cursor:pointer;' alt='2' id='cg_rate_star"+cg_real_id+"'></div>"+
                      "<div style='display:inline-block;float:left;width:21px;height:21px;vertical-align: middle;'><img src='"+starOffUrl+"' class='cg_slider_star3' style='float:left;cursor:pointer;' alt='3' id='cg_rate_star"+cg_real_id+"'></div>"+
                      "<div style='display:inline-block;float:left;width:21px;height:21px;vertical-align: middle;'><img src='"+starOffUrl+"' class='cg_slider_star4' style='float:left;cursor:pointer;' alt='4' id='cg_rate_star"+cg_real_id+"'></div>"+
                      "<div style='display:inline-block;float:left;width:21px;height:21px;vertical-align: middle;'><img src='"+starOffUrl+"' class='cg_slider_star5' style='float:left;cursor:pointer;' alt='5' id='cg_rate_star"+cg_real_id+"'></div>";

                }

                   if(cg_allow_rating==2){

                    var ratingBlock = "<input type='hidden' class='cg_check_voted' value='0' id='cg_check_voted"+cg_real_id+"'>"+
                    "<div style='display:inline-block;float:left;width:17px;height:17px;vertical-align: middle;'><img src='"+starOffUrl+"' class='cg_slider_star1' style='float:left;cursor:pointer;' alt='6' id='cg_rate_star"+cg_real_id+"'></div>";

                }

                $("#ratingCGslider"+cg_real_id).empty();

         $("#ratingCGslider"+cg_real_id).append(ratingBlock);


        });



        }*/

        /*
        if(cg_hide_until_vote==1 && cg_vote_in_gallery==1){

               $(document).on('click', '[class*=cg_hide_until_vote_rate]', function(e){

        //var cg_real_id = $(this).find(".cg_real_id").val();
        var cg_real_id =  $(this).parent().attr("id");
            cg_real_id =  parseInt(cg_real_id.substr(21));

        var cg_ShowAlways =  $("#cg_ShowAlways").val();



        var	cg_real_row = $(this).attr("class");
            cg_real_row = parseInt(cg_real_row.substr(23));
            //alert(cg_vote_in_gallery);
            //alert(cg_real_row);
            //Show always vote, comments and info in gallery view:
            if(cg_ShowAlways!=1){
            $("#cg_hide"+cg_real_row).hide();
            }
        //alert(cg_real_row);



            //var starOnUrl = $("#cg_star_on_slider").val();
            var starOffUrl = $("#cg_star_off_slider").val();

            // Achtung! Vorher diese Prüfung notwendig falls hide until vote und vote out gallery aktiviert sind! Der Klickevent von Children Element wird von der $ Bibliothek als erstes bearbeitet.
          // Auch wenn dieser weiter unten im Script passiert.
            $("#cg_hide_until_vote_actual").val(1);




            var ratingBlock = "<input type='hidden' class='cg_check_voted' value='0' id='cg_check_voted"+cg_real_id+"'>"+
            "<div style='display:inline-block;float:left;width:17px;height:17px;vertical-align: middle;'><img src='"+starOffUrl+"' class='cg_slider_star1' style='float:left;cursor:pointer;' alt='1' id='cg_rate_star"+cg_real_id+"'></div>"+
              "<div style='display:inline-block;float:left;width:17px;height:17px;vertical-align: middle;'><img src='"+starOffUrl+"' class='cg_slider_star2' style='float:left;cursor:pointer;' alt='2' id='cg_rate_star"+cg_real_id+"'></div>"+
              "<div style='display:inline-block;float:left;width:17px;height:17px;vertical-align: middle;'><img src='"+starOffUrl+"' class='cg_slider_star3' style='float:left;cursor:pointer;' alt='3' id='cg_rate_star"+cg_real_id+"'></div>"+
              "<div style='display:inline-block;float:left;width:17px;height:17px;vertical-align: middle;'><img src='"+starOffUrl+"' class='cg_slider_star4' style='float:left;cursor:pointer;' alt='4' id='cg_rate_star"+cg_real_id+"'></div>"+
               "<div style='display:inline-block;float:left;width:17px;height:17px;vertical-align: middle;'><img src='"+starOffUrl+"' class='cg_slider_star5' style='float:left;cursor:pointer;' alt='5' id='cg_rate_star"+cg_real_id+"'></div>";

                $("#cg_gallery_rating_div"+cg_real_id).empty();

         $("#cg_gallery_rating_div"+cg_real_id).append(ratingBlock);


        });



        }*/


// Rating Pop Up im Slider, bei hide until vote --- ENDE



// Schließen Layer





        $(document).on('mouseup', '[class*=cg_hide_info_div]', function(e){

            //alert(1);

            var cg_realId = $(this).attr("id");
            var cg_class_hide_show_info = $(this).attr("class");
            var cg_realId = parseInt(cg_realId.substr(16));

            // Achtung. visible check reagiert nur auf display none, nicht auf visiblity css
            if(cg_class_hide_show_info=="cg_hide_info_div_yes") {
                //alert(2);
                $(this).css("background-image","url("+cg_hide_info_png+")");
                $(this).attr("class","cg_hide_info_div_no");
                $("#cgFacebookDiv"+cg_realId+"").css("display","none");
                $("#commentsCGslider"+cg_realId+"").css("display","none");
                $("#ratingCGslider"+cg_realId+"").css("display","none");
                $("#cg_url_slider_div"+cg_realId+"").css("display","none");
              //  $("#cg_user_input"+cg_realId+"").css("display","none");

            }
            else{
                //alert(3);
                $(this).css("background-image","url("+cg_show_info_png+")");
                $(this).attr("class","cg_hide_info_div_yes");
                //$(this).find(".cg_hide_info_img").css("display","inline");
                $("#cgFacebookDiv"+cg_realId+"").css("display","inline");
                $("#commentsCGslider"+cg_realId+"").css("display","inline");
                $("#ratingCGslider"+cg_realId+"").css("display","inline");
                $("#cg_url_slider_div"+cg_realId+"").css("display","inline");
                $("#cg_user_input"+cg_realId+"").css("display","block");

            }



        });








        /*	   $(document).on('click', '#cg_overlay', function(e){




        });*/



// Schließen Layer --- ENDE







    }// End Slider/Out of Gallery Script


});