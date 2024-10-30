var cgJsClass = cgJsClass || {};
cgJsClass.slider = {};
cgJsClass.slider.open = {};
cgJsClass.slider.close = {};
cgJsClass.slider.slide = {};
cgJsClass.slider.slide.image = {};
cgJsClass.slider.slide.objects = {};
cgJsClass.slider.slide.objects.images = {};
cgJsClass.slider.resize = {};
cgJsClass.slider.vars = {};
cgJsClass.slider.click = {};
cgJsClass.slider.touch = {};
cgJsClass.slider.fullScreen = {};
cgJsClass.slider.carrousel = {};
cgJsClass.slider.slide.objects = {};
jQuery(document).ready(function($){ //   return false;

    if($('#cg_check_load_time').length<1){
        return;
    }



    cgJsClass.slider.click.init();



    if($('#cg_activate_gallery_slider').val()!=1){
        if(cgJsClass.slider.vars.cg_OnlyGalleryView==1){
            $(document).on('click', '[class*=cg_image]', function(e){
                return false;
            });
        }
        return false;
    }

    cgJsClass.slider.vars.windowHeight = $(window).height();
    cgJsClass.slider.vars.checkIOS();
    cgJsClass.slider.vars.checkMobile();
    cgJsClass.slider.vars.checkPicsOnSite();
    cgJsClass.slider.open.checkUrl();
    if(cgJsClass.slider.vars.isIOS==false){
        cgJsClass.slider.fullScreen.init();
    }

    if(cgJsClass.slider.vars.isIOS == true) {

        $('#cg_slider_full_screen_icon_div').remove();
        $('#cg_slider_exit_full_screen_icon_div').remove();

/*        window.onscroll = function (e) {

         //   e.preventDefault();

// called when the window is scrolled.
            // alert(123);
         //   jQuery("#cg_slider_main_div").css('top','0px');
       //     jQuery("#cg_slider_main_div").css('position','absolute');
         //   jQuery("#imgContainer").css('top','0px');
            //  jQuery("#imgContainer").css('position','absolute');

            var positionTop = jQuery(window).height()-window.innerHeight;
            // alert(jQuery(window).height());
            //   alert(window.innerHeight);

            var scrollTopBody = jQuery('body').scrollTop();

            if(scrollTopBody<positionTop){
                positionTop = scrollTopBody;
            }

            var marginTopButtons = positionTop+10;

            //alert(jQuery('body').scrollTop());

            jQuery("#imgContainer").height(window.innerHeight);
            jQuery("#imgContainer").css('top',positionTop+'px');
            jQuery("#close_slider_button").css('margin-top',marginTopButtons+'px');
            jQuery("#cg_slider_download_full_size_icon_div").css('margin-top',marginTopButtons+'px');

            cgJsClass.slider.resize.init();

        }*/

    }


    var windowWidth = $(window).width();
    var windowHeight = $(window).height();

    if(windowWidth/windowHeight>=1){
        cgJsClass.slider.vars.actualWindowRatio = 'horizontal';
    }
    else{
        cgJsClass.slider.vars.actualWindowRatio = 'vertical';
    }


    if(cgJsClass.slider.vars.isIOS==true){

        var viewport = $("meta[name='viewport']").first();

        if(viewport.length >= 1){

            cgJsClass.slider.vars.viewportContent = viewport.attr('content');

        }
        else{
            cgJsClass.slider.vars.noViewport = true;
        }

    }




    $(window).on('hashchange', function() {
      //  console.log(2);
     //   return false;
     //   var real_picture_id = $('#cg_actual_slider_img_id').val();
      //  var crypted_picture_id =(parseInt(real_picture_id)+8)*2+100000;

        if(cgJsClass.slider.vars.isMobile==true){

            //    console.log('CHANGED');

          //  cgJsClass.slider.vars.hashCountChangeGeneral = crypted_picture_id;
            //      console.log('document.location.hash: '+document.location.hash);
            //      console.log('cgJsClass.slider.vars.hash: '+cgJsClass.slider.vars.hash);
         //   console.log(3);


            if(cgJsClass.slider.vars.hash!=document.location.hash){
              //  console.log(2);
                // Pauschal fullscreen beenden
                if(cgJsClass.slider.vars.isIOS==false){
                    cgJsClass.slider.fullScreen.closeFullScreen();
                }
                cgJsClass.slider.close.init();
                //  console.log('CLOSED');
                cgJsClass.slider.vars.hash = document.location.hash;
            }

        }


    });

    // alert(cgJsClass.slider.vars.cg_OnlyGalleryView);
    $(document).on('click', '[class*=cg_image]', function(e){

       // console.log(2);


        if(cgJsClass.slider.vars.cg_activate_gallery_slider==1){

            var classCGimageNames = $(this).attr('class').split(' ');

            classCGimageNames.forEach(function (className) {

                if(className.indexOf('cg_image') !== -1){

                    cgJsClass.slider.vars.classCGimage = className;

                    return true;
                }

            });


            var scrollEventCarrousel = true;

            if($(this).parent('.cg-carrousel-img').length==1){
                scrollEventCarrousel = false;
            }

            if($('#imgContainer').is(':visible')){
                //   console.log('init cg_image: '+cgJsClass.slider.vars.classCGimage);
                cgJsClass.slider.slide.init(cgJsClass.slider.vars.classCGimage);
            }
            else{
                //  console.log('open cg_image: '+cgJsClass.slider.vars.classCGimage);
                cgJsClass.slider.open.init(cgJsClass.slider.vars.classCGimage,false,scrollEventCarrousel);
            }


            // Ganz wichtig return false hier! Ansonsten wird versucht single image view zu laden.
            if(cgJsClass.slider.vars.cg_hide_carrousel==false){

                if($(this).parent().hasClass('cg-carrousel-img')){

                    var sliderClick = true;
                }
                //cgJsClass.slider.carrousel.scrollTo($(this).attr('data-cg_image_id'),sliderClick);
            }



            return false;

        }



        // return false;
    });

    $( window ).resize(function(e) {
        if(cgJsClass.slider.slide.objects.images.length>1){

            // console.log('RESIZE HERE!!!');
            cgJsClass.slider.vars.resize = true;

            // For orientation
            var widthImage = cgJsClass.slider.slide.objects.images[cgJsClass.slider.slide.objects.currentNumber].width();
            var windowWidth = window.innerWidth;

            // Ist nur wichtig wenn mobile ist, damit die Tastatur nicht jedes Mal wegspring wenn man ein Feld gefocust hat
               if(cgJsClass.slider.vars.isMobile==true || cgJsClass.slider.vars.isIOS == true){
                   //  console.log('ACTION HERE');


                // Open und close full screen slider nicht notwendig!!!
                $('#cg_slider_full_screen_icon_div').remove();
                $('#cg_slider_exit_full_screen_icon_div').remove();

                   //var commentFrameOpened = cgJsClass.slider.vars.commentFrameOpened;
                   if($('#cg_comments_slider_div').is(':visible')){
                    var commentFrameOpened = true;
                }
                else{

                       var commentFrameOpened = false;

                   }

                   //   console.log('commment width here:' +windowWidth);


                // Ein Mal resize hier falls sich ratio geändert hat!
                if(commentFrameOpened==true && widthImage!=windowWidth && cgJsClass.slider.vars.isMobile==true){
                    cgJsClass.slider.resize.checkBackButtonClick();

                    cgJsClass.slider.resize.init();
                    return;
                }
                // Wenn es Mobile ist, Commentar Frame offen ist und Window Verhältnis sich nicht geändert hat, dann braucht man nicht auszuführen
                if(commentFrameOpened==true && widthImage==windowWidth && cgJsClass.slider.vars.isMobile==true){
                    cgJsClass.slider.resize.checkBackButtonClick();
                    return;
                }
            }


            cgJsClass.slider.resize.checkBackButtonClick();


            if (typeof cgJsClass.slider.slide.objects.images[cgJsClass.slider.slide.objects.currentNumber] == 'object'){


                // Wenn es Mobile ist, Commentar Frame offen ist und Window Verhältnis sich nicht geändert hat, dann braucht man nicht auszuführen
                if(widthImage==windowWidth && cgJsClass.slider.vars.isMobile==true){

                    cgJsClass.slider.vars.resize = false;
                    return ;
                }

            }


            cgJsClass.slider.resize.init();

            cgJsClass.slider.resize.openOrCloseCarrousel();

            //console.log('AFTER INIT');



            cgJsClass.slider.vars.resize==false;


        }


    });

    // Rating und comments in carrousel preview einfügen
    $('#mainCGallery .cg_gallery_info').each(function (index) {

        var object = $(this);
        var clonedObject = object.clone();
        clonedObject.find('input').remove();
        var childIndex = index+1;
        var carrouselId = 'carrousel-cg_image_id-'+object.attr('data-cg_image_id');
        clonedObject.removeClass().removeAttr('id').removeAttr('style').removeAttr('data-cg_image_id')
            .attr('id',carrouselId).appendTo("#cg-carrousel-slider-content .cg-carrousel-img:nth-child("+childIndex+")");
        clonedObject.addClass('cg-carrousel-img-status').find('div').removeClass().removeAttr('id');
        clonedObject.find('img').removeAttr('id');


    });


});