cgJsClass.gallery.views.keypress = {
    init:function () {

        jQuery(document).keydown(function(e) {

            if(jQuery('.cgCenterDiv').is(':visible')){

                // should be no movement if editing field
                if(jQuery(e.target).hasClass('cg-field-id-input-content') || jQuery(e.target).hasClass('cg-cat-id-input-content')){
                    return;
                }


                if(e.which == 37 || e.which == 39 || e.which == 27) {

                    var gid = cgJsClass.gallery.vars.openedGallery;

                    var sliderView = false;

                    if(gid){

                        var cgCenterDiv = cgJsData[gid].vars.mainCGallery.find('#cgCenterDiv'+gid);

                        if(cgCenterDiv.find('.cg-field-id-input-content').length || cgCenterDiv.find('.cg-cat-id-input-content').length){
                            return;
                        }

                        if(cgJsData[gid].vars.currentLook=='slider'){
                            sliderView = true;
                        }

                        // left
                        if(e.which == 37) {

                            if(jQuery(e.target).hasClass('cg-center-image-comments-div-enter-contenteditable')){// then must be in comment enter area
                                return;
                            }

                            if(cgJsData[gid].vars.currentLook=='blog'){
                                return;
                            }

                            jQuery(window).off('hashchange');

                            cgJsClass.gallery.vars.keypressStartInSeconds = new Date().getTime()/1000;

                            var order = parseInt(cgJsData[gid].vars.openedGalleryImageOrder)-1;

                            if(order<0){
                                cgJsClass.gallery.views.singleViewFunctions.clickPrevStep(gid);
                                return;
                            }

                            // braucht man zur Orientierung zwecks hash change
                            cgJsClass.gallery.vars.showImageClicked = true;
                            //cgJsClass.gallery.views.singleViewFunctions.setSliderMargin(order,gid,'left');
                            cgJsClass.gallery.views.functions.appendAndRemoveImagesInSlider(gid,order,cgJsData[gid].vars.maximumVisibleImagesInSlider,cgJsData[gid].vars.mainCGslider);

                            cgJsClass.gallery.views.singleView.openImage(jQuery,order,false,gid,'left');

                            cgJsClass.gallery.hashchange.activateHashChangeEvent();

                        }

                        // right
                        if(e.which == 39) {

                           if(jQuery(e.target).hasClass('cg-center-image-comments-div-enter-contenteditable')){// then must be in comment enter area
                               return;
                           }

                            if(cgJsData[gid].vars.currentLook=='blog'){
                                return;
                            }

                            jQuery(window).off('hashchange');

                            cgJsClass.gallery.vars.keypressStartInSeconds = new Date().getTime()/1000;

                            var length = cgJsData[gid].image.length;
                            var order = parseInt(cgJsData[gid].vars.openedGalleryImageOrder)+1;

                            if(order>=length){

                                cgJsClass.gallery.views.singleViewFunctions.clickNextStep(gid);
                                return;
                            }

                            // braucht man zur Orientierung zwecks hash change
                            cgJsClass.gallery.vars.showImageClicked = true;

                            //cgJsClass.gallery.views.singleViewFunctions.setSliderMargin(order,gid,'right');
                            cgJsClass.gallery.views.functions.appendAndRemoveImagesInSlider(gid,order,cgJsData[gid].vars.maximumVisibleImagesInSlider,cgJsData[gid].vars.mainCGslider);

                            cgJsClass.gallery.views.singleView.openImage(jQuery,order,false,gid,'right');

                            cgJsClass.gallery.hashchange.activateHashChangeEvent();

                        }

                        // escape
                        /*                            if(e.which == 27) {

                                                        if(sliderView!=1){
                                                            if(cgJsData[gid].vars.openedRealId>=1){
                                                                cgJsClass.gallery.views.close(gid,false,cgJsData[gid].vars.openedRealId);
                                                            }
                                                        }

                                                        if(sliderView==1 && cgJsClass.gallery.vars.fullwindow){
                                                            cgJsClass.gallery.views.fullwindow.closeFunction(gid,true);
                                                        }

                                                        if(cgJsClass.gallery.vars.messageContainerShown==true){
                                                            jQuery('#cgMessagesContainer').addClass('cg_hide');
                                                            cgJsClass.gallery.vars.messageContainerShown=false;
                                                        }

                                                        if(cgJsClass.gallery.vars.openedUploadFormGalleryId){
                                                            cgJsClass.gallery.upload.functions.close(cgJsClass.gallery.vars.openedUploadFormGalleryId);
                                                        }

                                                    }*/

                        // escape
                        if(e.which == 27) {
                            if(cgJsClass.gallery.vars.openedUploadFormGalleryId){
                                cgJsClass.gallery.upload.functions.close(cgJsClass.gallery.vars.openedUploadFormGalleryId);
                            }else{
                                if(cgJsClass.gallery.vars.fullscreen){
                                    cgJsClass.gallery.views.fullscreen.close(gid);
                                }else if(cgJsClass.gallery.vars.fullwindow){
                                    var gid = cgJsClass.gallery.vars.fullwindow;
                                    //cgJsData[gid].vars.openedRealId = 0; do not reset anymore since 08.10.2021
                                    cgJsClass.gallery.views.fullwindow.closeFunction(gid,true);
                                }

                            }

                        }

                    }

                }


            }else{

                // escape
                if(e.which == 27) {
                    if(cgJsClass.gallery.vars.openedUploadFormGalleryId){
                        cgJsClass.gallery.upload.functions.close(cgJsClass.gallery.vars.openedUploadFormGalleryId);
                    }else{
                        if(cgJsClass.gallery.vars.fullscreen){
                            cgJsClass.gallery.views.fullscreen.close(gid);
                        }else if(cgJsClass.gallery.vars.fullwindow){
                            var gid = cgJsClass.gallery.vars.fullwindow;
                            //cgJsData[gid].vars.openedRealId = 0; do not reset anymore since 08.10.2021
                            cgJsClass.gallery.views.fullwindow.closeFunction(gid,true);
                        }

                    }

                }


            }

        });


    }
};