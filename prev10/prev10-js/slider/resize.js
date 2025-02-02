cgJsClass.slider.resize = {
    init: function(){
     //   alert(1);
        var checkCGcontainerVisiblity = jQuery( "#imgContainer" ).is(':visible');

        var checkCGcommentContainerVisbility = jQuery( "#cg_comments_slider_div" ).is(':visible');

        var widthWindow = jQuery(window).width();
        var windowHeight = jQuery(window).height();

        if(cgJsClass.slider.vars.isMobile==true){

            var widthScreen = widthWindow;
        }
        else{
            var widthScreen = jQuery('#cg_slider_main_div').width();
        }

        if(widthScreen<800){
            jQuery( "#cg_slider_arrow_left" ).css('width','4%');
            jQuery( "#cg_slider_arrow_right" ).css('width','4%');
            if(typeof  cgJsClass.slider.slide.objects.pagePrevUrl=== "object"){
                jQuery( "#cg_slider_arrow_left_next_page" ).css('width','6%');
            }
            if(typeof  cgJsClass.slider.slide.objects.pageNextUrl=== "object"){
                jQuery( "#cg_slider_arrow_right_next_page" ).css('width','6%');
            }
        }

        if(widthScreen<500){
            jQuery( "#cg_slider_arrow_left" ).css('width','4%');
            jQuery( "#cg_slider_arrow_right" ).css('width','4%');
            if(typeof  cgJsClass.slider.slide.objects.pagePrevUrl=== "object"){
                jQuery( "#cg_slider_arrow_left_next_page" ).css('width','6%');
            }
            if(typeof  cgJsClass.slider.slide.objects.pageNextUrl=== "object"){
                jQuery( "#cg_slider_arrow_right_next_page" ).css('width','6%');
            }
        }


        if(widthScreen>=800){
            jQuery( "#cg_slider_arrow_left" ).css('width','2%');
            jQuery( "#cg_slider_arrow_right" ).css('width','2%');
            if(typeof  cgJsClass.slider.slide.objects.pagePrevUrl=== "object"){
                jQuery( "#cg_slider_arrow_left_next_page" ).css('width','4%');
            }
            if(typeof  cgJsClass.slider.slide.objects.pageNextUrl=== "object"){
                jQuery( "#cg_slider_arrow_right_next_page" ).css('width','4%');
            }
        }

       // alert(2);
        if(checkCGcommentContainerVisbility){
        //    alert(3);
            cgJsClass.slider.open.openCommentFrame();

        }

        var classCGimageNumber = cgJsClass.slider.slide.objects.currentNumber;
        classCGimageNumber = "cg_image"+classCGimageNumber;


        if(checkCGcontainerVisiblity){

            var cg_slider_position = jQuery( "#imgContainer" ).position();

            // Aller Slider Boxen werden entfernt. Der Aufbau kann von vorne beginnen
            //jQuery( ".cg_img_box" ).remove();



            jQuery('#cg_slider_resize').val(1);


            if(widthWindow<=800 || cgJsClass.slider.vars.picsOnSite<3 || windowHeight/widthWindow>=1 || cgJsClass.slider.vars.isMobile==true
                || cgJsClass.slider.vars.cg_PreviewInSlider==0){

                if(jQuery('#cg-carrousel-slider').is(':visible')){
                    cgJsClass.slider.resize.fullSizeSlider();
                    cgJsClass.slider.resize.hideCarrousel(cgJsClass.slider.resize.fullSizeSliderLowWidth);
                }


            }
            else{

                //    console.log(jQuery('#cg-carrousel-slider').is(':hidden'));
                if(jQuery('#cg-carrousel-slider').is(':hidden')){

                    if(cgJsClass.slider.vars.fullSizeResized == false){
                        cgJsClass.slider.resize.exitFullSizeSlider();
                        cgJsClass.slider.resize.showCarrousel();
                      //  cgJsClass.slider.carrousel.scrollTo(jQuery('#cg_actual_slider_img_id').val());
                    }

                }

                if(cgJsClass.slider.vars.cg_allow_rating==1){

                }


            }

            if(cgJsClass.slider.vars.isMobile==true && cgJsClass.slider.vars.isIOS==true){

                var positionTop = jQuery(window).height()-window.innerHeight;
                // alert(jQuery(window).height());
                //   alert(window.innerHeight);

             //   var marginTopButtons = positionTop+10;

                jQuery("#imgContainer").height(window.innerHeight);
              //  jQuery("#imgContainer").css('top',positionTop+'px');
            //    jQuery("#close_slider_button").css('margin-top',marginTopButtons+'px');
            //    jQuery("#cg_slider_download_full_size_icon_div").css('margin-top',marginTopButtons+'px');

/*                jQuery('body').css('pointer-events','none');
                jQuery('body').css('height','0');
                jQuery('body').css('overflow','hidden');
                jQuery('body').css('margin','0');
                jQuery('html').css('pointer-events','none');
                jQuery('html').css('height','0');
                jQuery('html').css('overflow','hidden');
                jQuery('html').css('margin','0');*/
                jQuery('#cg_slider_main_div').css('pointer-events','auto');


            }


            // Ansonsten wird die rechte Box kurz zu sehen sein
            //  console.log('RESIZE class: '+classCGimageNumber);
/*console.log('classCGimageNumber init: '+cgJsClass.slider.slide.objects.currentNumber);
            console.log(cgJsClass.slider.slide.objects.images[cgJsClass.slider.slide.objects.currentNumber]);

            cgJsClass.slider.slide.objects.images[cgJsClass.slider.slide.objects.currentNumber].css('visibility','visible');*/

            cgJsClass.slider.slide.init(classCGimageNumber);




            if(cgJsClass.slider.vars.cg_allow_rating>=1 && widthWindow<=500 && cgJsClass.slider.vars.cg_FbLike == 1){
                cgJsClass.slider.resize.showFbNextLine();
            }
            if(cgJsClass.slider.vars.cg_allow_rating>=1 && widthWindow>500 && cgJsClass.slider.vars.cg_FbLike == 1){
                jQuery('#imgContainer .cg_slider_facebook_div').removeAttr('style');
                jQuery('#imgContainer .cg_user_input_container').removeAttr('style');
            }



        }



        if(cgJsClass.slider.vars.isMobile==true){


            var newCommentsElementsWidth = widthScreen;

            jQuery('#cg_comments_slider_div').css('width', newCommentsElementsWidth);
            jQuery('#cg_comments_slider_div').css('left', 0);


        }


        // Prüfe ob der User text fade in button zu verschwinden oder zu erscheinen hat
        //cgJsClass.slider.resize.checkFadeInfo();

    },
    checkBackButtonClick:function () {

        if((window.fullScreen) ||
            (window.innerWidth == screen.width && window.innerHeight == screen.height)){
        }
        else {
            if(cgJsClass.slider.vars.isMobile==true){
                var windowHeight = jQuery('#cg_overlay').height();
                if(windowHeight!=window.outerHeight){
                    cgJsClass.slider.close.init();
                    cgJsClass.slider.fullScreen.fullScreenCheck = false;
                    return;
                }
            }
        }


    },
    checkFadeInfo:function(){

        var real_picture_id = jQuery('#cg_actual_slider_img_id').val();

        // Prüfe ob der User text fade in button zu verschwinden oder zu erscheinen hat
        if(jQuery('#cg_user_input_bottom_border_'+real_picture_id+'').length >= 1){
            var offsetTopImage = document.getElementById('cg_slider_image_'+real_picture_id+'').offsetTop;
            var offsetTopHiddenImage = document.getElementById('cg_user_input_fade_out_arrow_div_'+real_picture_id+'').offsetTop;

/*            if(offsetTopHiddenImage+60>=offsetTopImage){
                jQuery('#cg_user_input_fade_out_arrow_div_'+real_picture_id+'').css('display','block');
            }
            else{
                jQuery('#cg_user_input_fade_out_arrow_div_'+real_picture_id+'').css('display','none');
            }*/

        }
    },
    fullSizeSlider: function(){

        // CSS here

        jQuery("#cg_overlay").css('opacity','1');// Wichtig! Diesen Befehl hier lassen. Ansonsten Hintergrund nicht schwarz beim Einziehen

        // Wegen des reinsliden effektes müssen die kurz verschwinden
        jQuery("#close_slider_button").css('display','none');
        jQuery("#cg_slider_download_full_size_icon_div").css('display','none');
        jQuery("#cg_slider_full_screen_icon_div").css('display','none');
        jQuery("#cg_slider_full_size_view_icon_div").css('display','none');

        //jQuery(".cg_slider_info_div").css('display','none');

        jQuery("#cg_slider_main_div").css('width','100%');
        jQuery("#cg_slider_arrow_right").css('right','0%');
        jQuery("#cg_slider_arrow_right_next_page").css('right','0%');
        jQuery("#cg_slider_full_size_view_icon_div").css('right','0%');
        jQuery("#cg_slider_download_full_size_icon_div").css('right','0%');
        jQuery("#cg_slider_full_screen_icon_div").css('right','0%');
        jQuery("#close_slider_button").css('right','0%');
        jQuery("#close_slider_button").css('margin-right','5px');

        cgJsClass.slider.vars.cg_hide_carrousel = true;


    },
    fullSizeSliderLowWidth:function () {
        jQuery("#cg_slider_download_full_size_icon_div").css('margin-right','50px');
        jQuery("#cg_slider_full_screen_icon_div").css('margin-right','95px');
        jQuery("#cg_slider_full_size_view_icon_div").css('display','none');
        jQuery("#cg_slider_exit_full_size_view_icon_div").css('display','none');
    },
    hideCarrousel:function(callback){

        jQuery("#cg-carrousel-slider").hide( 500, function(){

            jQuery("#close_slider_button").css('display','block');
            jQuery("#cg_slider_exit_full_size_view_icon_div").css('display','block');
            jQuery("#cg_slider_download_full_size_icon_div").css('display','block');
            jQuery("#cg_slider_full_screen_icon_div").css('display','block');

            if (typeof(callback) == 'function') {
                callback();
            }


        });

    },
    exitFullSizeSlider: function(){

        // CSS here

        //jQuery(".cg_slider_info_div").css('display','none');

        // Für den visuellen effekt muss es gleich gemacht werden
        jQuery("#close_slider_button").css('display','none');
        jQuery("#cg_slider_exit_full_size_view_icon_div").css('display','none');
        jQuery("#cg_slider_download_full_size_icon_div").css('display','none');
        jQuery("#cg_slider_full_screen_icon_div").css('display','none');

        jQuery("#cg_slider_main_div").css('width','80%');
        jQuery("#cg_slider_download_full_size_icon_div").css('right','20%');
        jQuery("#cg_slider_full_screen_icon_div").css('right','20%');
        jQuery("#cg_slider_arrow_right").css('right','20%');
        jQuery("#cg_slider_arrow_right_next_page").css('right','20%');

        jQuery("#cg_slider_full_size_view_icon_div").css('right','20%');
        jQuery("#close_slider_button").css('right','20%');
        jQuery("#close_slider_button").css('margin-right','47px');
        jQuery("#cg_slider_download_full_size_icon_div").css('margin-right','135px');
        jQuery("#cg_slider_full_screen_icon_div").css('margin-right','90px');

        //jQuery(".cg_slider_info_div").css('display','block');

        cgJsClass.slider.vars.cg_hide_carrousel = false;

    },
    showCarrousel:function(){

        jQuery("#cg-carrousel-slider").show( 500, function(){

            jQuery("#close_slider_button").css('display','block');
            jQuery("#cg_slider_full_size_view_icon_div").css('display','block');
            jQuery("#cg_slider_download_full_size_icon_div").css('display','block');
            jQuery("#cg_slider_full_screen_icon_div").css('display','block');


        });

    },
    openOrCloseCarrousel: function(){

        var widthWindow = jQuery(window).width();
        var windowHeight = jQuery(window).height();

        if(widthWindow<=800 || cgJsClass.slider.vars.picsOnSite<3 || cgJsClass.slider.vars.isMobile==true || windowHeight/widthWindow>=1
            || cgJsClass.slider.vars.cg_PreviewInSlider==0){
        //    alert(1);
            this.fullSizeSlider();
            jQuery("#cg-carrousel-slider").css('display','none');
            this.fullSizeSliderLowWidth();


        }
        else{
        //    alert(2);
            if(jQuery('#cg-carrousel-slider').is(':hidden')){

                if(cgJsClass.slider.vars.fullSizeResized == false){
                    this.exitFullSizeSlider();
                    jQuery("#cg-carrousel-slider").css('display','block');
                }

            }

            cgJsClass.slider.carrousel.init();



        }

        jQuery("#close_slider_button").css('display','block');
        jQuery("#cg_slider_download_full_size_icon_div").css('display','block');
        jQuery("#cg_slider_full_screen_icon_div").css('display','block');


    },
    showFbNextLine: function(){

        jQuery('#imgContainer .cg_slider_facebook_div').css('width','100%');
        jQuery('#imgContainer .cg_slider_facebook_div').css('margin-bottom','10px');
        jQuery('#imgContainer .cg_slider_facebook_div').css('margin-left','20px');
        jQuery('#imgContainer .cg_slider_facebook_div').css('margin-top','15px');
        jQuery('#imgContainer .cg_user_input_container').css('margin-top','70px');


    },
    hideCarrouselScrollbar: function(){

        var imgHeightSum = 0;
        jQuery('#cg-carrousel-slider-content .cg-carrousel-img img').each(function(){

            imgHeightSum = imgHeightSum + jQuery(this).height();

        });

        if(imgHeightSum <= cgJsClass.slider.vars.windowHeight){
            jQuery('#cg-carrousel-slider #cg-carrousel-slider-content').addClass('hide_scrollbar');
        }
        else{
            jQuery('#cg-carrousel-slider #cg-carrousel-slider-content').removeClass('hide_scrollbar');
        }

        return false;

    }
}