cgJsClass.slider.fullScreen = {
    init:function (){

     //   cgJsClass.slider.fullScreen.cg_slider_full_screen_icon_img_src = jQuery('#cg_slider_full_screen_icon_img').attr('src');
    //    cgJsClass.slider.fullScreen.cg_slider_exit_full_screen_icon_img_src = jQuery('#cg_slider_exit_full_screen_icon_img').attr('src');

        jQuery(document).on('click','#cg_slider_full_screen_icon_img.cg_slider_enter_full_screen',function () {
       //     console.log(cgJsClass.slider.fullScreen.cg_slider_exit_full_screen_icon_img_src);

            cgJsClass.slider.fullScreen.openFullScreen();
        });

    },
  //  cg_slider_full_screen_icon_img_src:'',
 //   cg_slider_exit_full_screen_icon_img_src:'',
    openFullScreen:function(){
               // console.log(0);
                var element = document.getElementById("cg_slider_main_div"); // ein bestimmtes Element
                if(element.requestFullscreen) {
                    //console.log('open fullscreen function 1');
                    element.requestFullscreen();
                    this.fullScreenCheck = true;
                } else if(element.mozRequestFullScreen) {
                    //console.log('open fullscreen function 2');
                    element.mozRequestFullScreen();
                    this.fullScreenCheck = true;
                } else if(element.msRequestFullscreen) {
                    // console.log('open fullscreen function 3');
                    element.msRequestFullscreen();
                    this.fullScreenCheck = true;
                } else if(element.webkitRequestFullscreen) {
                    //console.log('open fullscreen function 4');
                    element.webkitRequestFullscreen();
                    this.fullScreenCheck = true;
                }
                else{
                    // console.log('open fullscreen function 5');
                    alert("Your browser do not support full screen");
                }

       // jQuery('#cg_slider_full_screen_icon_img').attr('src',cgJsClass.slider.fullScreen.cg_slider_exit_full_screen_icon_img_src);
        jQuery('#cg_slider_full_screen_icon_img').addClass('cg_slider_full_screen');



    },
    fullScreenCheck: false,
    closeFullScreen:function (){
      //  console.log('close fullscreen function');
        jQuery('#cg_slider_full_screen_icon_img').removeClass('cg_slider_full_screen');
        if(document.exitFullscreen) {
            document.exitFullscreen();
        }
         else if(document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if(document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
        else if(document.msExitFullscreen) {
            document.msExitFullscreen();
        }

     //   jQuery('#cg_slider_full_screen_icon_img').attr('src',cgJsClass.slider.fullScreen.cg_slider_full_screen_icon_img_src);
        this.fullScreenCheck = false;





    }
}