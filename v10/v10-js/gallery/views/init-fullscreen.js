cgJsClass.gallery.views.fullscreen = {
    init:function () {

            jQuery(document).on('click', '.cg-fullscreen-button', function () {

                var gid = jQuery(this).attr('data-cg-gid');
                jQuery(this).addClass('cg_hide');

                cgJsClass.gallery.views.fullscreen.openFullScreen(gid);

            });

        cgJsClass.gallery.views.fullscreen.initExitEventListener()

    },
    openFullScreen: function (gid) {

        cgJsClass.gallery.vars.fullscreen = gid;
        cgJsClass.gallery.vars.lastFullscreen = gid;

        cgJsData[gid].vars.mainCGdiv.find('.cg-fullscreen-button').addClass('cg_hide');
        cgJsData[gid].vars.cgCenterDiv.find('.cg-fullscreen-button').addClass('cg_hide');

        var element = document.getElementById("mainCGdivHelperParent"+gid); // ein bestimmtes Element
        // make this order, otherwise might be user gesture error when requestFullscreen as first
        if(element.webkitRequestFullscreen) {/* Chrome, Safari & Opera */
            //console.log('open fullscreen function 1');
            element.webkitRequestFullscreen();
            this.fullScreenCheck = true;
        } else if(element.mozRequestFullScreen) { /* Firefox */
            //console.log('open fullscreen function 2');
            element.mozRequestFullScreen();
            this.fullScreenCheck = true;
        } else if(element.msRequestFullscreen) { /* IE/Edge */
            // console.log('open fullscreen function 3');
            element.msRequestFullscreen();
            this.fullScreenCheck = true;
        } else if(element.requestFullscreen) {
            //console.log('open fullscreen function 4');
            element.requestFullscreen();
            this.fullScreenCheck = true;
        }
        else{
            alert("Your browser do not support full screen");
        }

    },
    initExitEventListener: function () {
        document.addEventListener("fullscreenchange", function () {
            if(cgJsClass.gallery.views.fullscreen.isFullscreen()) {

            } else {
                cgJsClass.gallery.views.fullscreen.close(cgJsClass.gallery.vars.fullscreen,true);
            }
        });

        document.addEventListener("mozfullscreenchange", function () {
            if(cgJsClass.gallery.views.fullscreen.isFullscreen()) {

            } else {
                cgJsClass.gallery.views.fullscreen.close(cgJsClass.gallery.vars.fullscreen,true);
            }
        });

        document.addEventListener("webkitfullscreenchange", function () {
            if(cgJsClass.gallery.views.fullscreen.isFullscreen()) {

            } else {
                cgJsClass.gallery.views.fullscreen.close(cgJsClass.gallery.vars.fullscreen,true);
            }
        });

        document.addEventListener("msfullscreenchange", function () {
            if(cgJsClass.gallery.views.fullscreen.isFullscreen()) {

            } else {
                cgJsClass.gallery.views.fullscreen.close(cgJsClass.gallery.vars.fullscreen,true);
            }
        });

    },
    isFullscreen: function (){
            var state = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
            if((state == true || (window.fullScreen) ||
                (window.innerWidth == screen.width && window.innerHeight == screen.height)) && !cgJsClass.gallery.vars.isMobile) {
            return true;
            }
        return false;
    },
    close: function (gid,isDoNotExitFullScreenAlreadyExited) {

        cgJsClass.gallery.vars.fullscreen = false;

        setTimeout(function () {
            cgJsClass.gallery.vars.lastFullscreen = false;// if caused by upload button clicked then can be recognized in this second
        });

        if(gid){
            cgJsData[gid].vars.cg_sort_div_blogLookFullWindow.find('.cg-fullscreen-button').removeClass('cg_hide');
            if(cgJsData[gid].options.general.FullSize==1){
                if(cgJsData[gid].options.pro.SliderFullWindow!=1 && cgJsData[gid].options.visual.BlogLookFullWindow!=1){
                        cgJsData[gid].vars.mainCGdiv.find('.cg-fullsize-div .cg-fullscreen-button').removeClass('cg_hide');
                }
            }
            if(cgJsData[gid].vars.currentLook=='blog'){
                cgJsData[gid].vars.mainCGdiv.find('.cg_header .cg_sort_div .cg-fullscreen-button').removeClass('cg_hide');
            }
        }
        //console.log('close fullscreen');
        //console.trace();
        if(isDoNotExitFullScreenAlreadyExited){
            return;
        }

        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { /* Firefox */
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE/Edge */
            document.msExitFullscreen();
        }


    },
    goBackToFullscreen: function () {
        if(cgJsClass.gallery.vars.fullscreen){
            cgJsClass.gallery.views.fullscreen.openFullScreen(cgJsClass.gallery.vars.fullscreen);
        }
    },
    fullScreenBodyCheck: function ($body) {

        if($body.hasClass('cg_browser_input_button_upload_modal_triggered')){
            cgJsClass.gallery.views.fullscreen.goBackToFullscreen();
            $body.removeClass('cg_browser_input_button_upload_modal_triggered');
        }

    }
};