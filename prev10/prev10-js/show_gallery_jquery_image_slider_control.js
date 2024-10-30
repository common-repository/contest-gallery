jQuery(document).ready(function($){
    // alert(cgJsClass.slider.vars.isMobile);

    if(contest_gal1ery_upload_version>=7){
        $(document).on('click', '#imgContainer .cg_user_input_fade_out_arrow_container', function(e){

          //  console.log(123);
            cgJsClass.slider.slide.objects.fadeOutCurrentUserInfo();

        });

        $(document).on('click', '#imgContainer .cg_user_input_fade_in_arrow_container', function(e){

        //    console.log(456);
            cgJsClass.slider.slide.objects.fadeInCurrentUserInfo();

        });

        /*$(document).on('click', '#cg_slider_main_div #cg_slider_arrow_left_img_next_page', function(e){
                //  alert(1);
                $(this).fadeTo(100, 0.2).fadeTo(100, 1.0);

            });

            $(document).on('click', '#cg_slider_main_div #cg_slider_arrow_right_img_next_page', function(e){
                // alert(2);

                $(this).fadeTo(100, 0.2).fadeTo(100, 1.0);

            });*/

    }
    else{


        $(document).on('click', '.cg_user_input', function(e){

            $(this).slideUp(1000, function() {
                // Animation complete.
                $(this).closest('.cg_slider_info_div').find('.cg_user_input_fade_in_arrow_container').css('display','block');

            });

        });

        $(document).on('click', '.cg_user_input_fade_in_arrow_container', function(e){

            $(this).css('display','none');
            $(this).closest('.cg_slider_info_div').find('.cg_user_input').slideDown(1000);
            //$(this).closest('.cg_slider_info_div').find('.cg_user_input_fade_in_arrow_container').css('display','block');
        });

    }





});