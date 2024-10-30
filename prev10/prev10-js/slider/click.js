cgJsClass.slider.click = {
    init:function (){

        this.comment();
        this.closeSliderCommentButton();
        this.closeEscapeButton();
        this.mouseup();

    },
    comment:function(){
        jQuery(document).on('click', '[id*=cg_pngCommentsIcon]', function(e){

            // alert(7);
            var cg_picture_id = jQuery(this).attr("id");

            cg_picture_id = parseInt(cg_picture_id.substr(18));

            // Haupthidden Feld, dass aktuell geöffnete comment image id zeigt
            //  jQuery('#cg_slider_comment_picture_id').val(cg_picture_id);
            jQuery('#cg_slider_comment_picture_id').val(cg_picture_id);

            //	jQuery("#cg_user_input"+cg_picture_id+"").css("display","none");
            //  alert(cg_picture_id);
            cgJsClass.slider.open.openCommentFrame(cg_picture_id);

            return false;

        });
    },
    closeSliderCommentButton:function () {
        jQuery(document).on('click', '#close_slider_comments_button', function(e){


            cgJsClass.slider.close.closeCommentFrame();


        });
    },
    closeEscapeButton:function () {
        jQuery(document).keydown(function(e) {



            if(e.which == 27) {

                cgJsClass.slider.close.closeDialogs();

                //ACHTUNG!!! Geht bei vielen Browsern schief. Reagiert praktisch auf jede Tastenkombi und schließt!
                //  cgJsClass.slider.fullScreen.closeFullScreen();

                if(jQuery('#close_slider_comments_button').is(':visible')) {

                    cgJsClass.slider.close.closeCommentFrame();

                }

                else{


                    if(jQuery('#close_slider_button').is(':visible')) {

                        cgJsClass.slider.close.init();

                    }


                }


            }

        });
    },
    mouseup:function () {

            // Wenn außerhalb des Slider Divs geklickt wird, dann schließen. Diese Funktion vorallem nützlich wenn "Comment out of gallery aktiviert ist" (release)
            jQuery(document).mouseup(function (e)
            {

                cgJsClass.slider.close.closeDialogs();

               // console.log(3);
             //   cgJsClass.slider.close.closeCommentFrame();

                var container = jQuery("#cg_comments_slider_div");

                if (!container.is(e.target) // if the target of the click isn't the container...
                    && container.has(e.target).length === 0) // ... nor a descendant of the container
                {
                    container.hide();
                }
                return false;

            });
    },
    clickLeft:function (object,keyPress) {

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


        var classCGimage = lastTrueValue;

        if(classCGimage<1){
            classCGimage=1;
            jQuery("#cg_slider_arrow_left_img").css("display","none");
            return;
        }
        else{
            if(cgJsClass.slider.slide.objects.countAll>1){
                jQuery("#cg_slider_arrow_right_img").css("display","block");

            }
            jQuery("#cg_slider_arrow_left_img").css("display","block");
        }

        if(cgJsClass.slider.vars.cg_FbLike==1){
            // Facebook Felder zum Reloaden freigeben
            jQuery("#cg_slider_frame_reloaded").val(0);
            jQuery("#cg_gallery_frame_reloaded").val(0);
        }


        // Comments Slider soll ausgeblendet werden falls an
        jQuery('#cg_comments_slider_div').css("display","none");
        jQuery('#close_slider_comments_button_img').css("display","none");

        if( jQuery("#imgContainer").is(':animated') ) {return false;}
        else{
            if(typeof keyPress=='undefined'){
                jQuery(object).fadeTo(100, 0.5).fadeTo(100, 1.0);
            }
        }

        /*                jQuery(cgJsClass.slider.slide.objects.images).each(function () {
                            jQuery(this).css('visibility','hidden').find('div').css('visibility','hidden');
                        });*/


        //  var real_picture_id = cgJsClass.slider.slide.objects.allIds[classCGimage];
        cgJsClass.slider.slide.objects.currentId = cgJsClass.slider.slide.objects.allIds[classCGimage];


        classCGimage = "cg_image"+classCGimage;


        //console.log('left click classCGimage: '+classCGimage);
        cgJsClass.slider.slide.init(classCGimage);

    },
    clickRight:function (object,keyPress) {

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
        var allCGimages = cgJsClass.slider.slide.objects.countAll;



        // Damit sofort wieder reagiert wenn man nach rechts klickt
        //	alert(classCGimage);
        // Damit sofort wieder reagiert wenn man nach links klickt
        if(classCGimage>allCGimages){
            classCGimage=allCGimages;
            jQuery("#cg_slider_arrow_right_img").css("display","none");
            return;
        }
        else{
            if(allCGimages>1){
                jQuery("#cg_slider_arrow_left_img").css("display","block");

            }
            jQuery("#cg_slider_arrow_right_img").css("display","block");
        }



        if(cgJsClass.slider.vars.cg_FbLike==1){
            // Facebook Felder zum Reloaden freigeben
            jQuery("#cg_slider_frame_reloaded").val(0);
            jQuery("#cg_gallery_frame_reloaded").val(0);
        }


        if( jQuery("#imgContainer").is(':animated') ) {return false;}
        else{
            if(typeof keyPress=='undefined'){
                jQuery(object).fadeTo(100, 0.5).fadeTo(100, 1.0);
            }
        }

        cgJsClass.slider.slide.objects.currentId = cgJsClass.slider.slide.objects.allIds[classCGimage];


        classCGimage = "cg_image"+classCGimage;

        cgJsClass.slider.slide.init(classCGimage);

    }
}