cgJsClass.gallery.views.clickFurtherImagesStep = {
    init: function () {

        jQuery(document).on('click','.cg_further_images',function () {

            var $element = jQuery(this);

            var gid = $element.attr('data-cg-gid');

            var stepNumber = parseInt($element.attr('data-cg-step'));

            cgJsData[gid].vars.currentStep = stepNumber;

            var isViewChange = false;

            if($element.hasClass('cg_view_change')){
                $element.removeClass('cg_view_change');
                isViewChange = true;
            }

            if(cgJsData[gid].options.general.SliderLook==1){

                var PicsPerSite = parseInt(cgJsData[gid].options.general.PicsPerSite);

                var order = stepNumber*PicsPerSite-PicsPerSite;

           //     var openedRealId = jQuery('#mainCGslider'+gid).find('.cg_show[data-cg-order='+order+']').attr('data-cg-id');
                var imageData = cgJsData[gid].image[order];
                var firstKey = Object.keys(imageData)[0];
                var realId = imageData[firstKey]['id'];

                cgJsData[gid].vars.openedRealId = realId;

                cgJsClass.gallery.views.singleViewFunctions.setFurtherSteps(gid,order);

                if(isViewChange){
                    cgJsClass.gallery.views.initOrderGallery(gid,null,null,true,null,true);
                }else{
                    cgJsClass.gallery.views.initOrderGallery(gid,null,null,true,true,null);
                }

            }else{

                cgJsClass.gallery.vars.hasToAppend = true;


                // falls ein Bild geöffnet ist, muss alles zurückgesetzt werden!!!!
                if(cgJsData[gid].vars.openedRealId>0){
                    cgJsClass.gallery.views.close(gid);
                }

                // hier am Anfang machen sonst funktioniert es nicht!
                // spring zum oberen further images falls das untere geklickt wurde
                /*            if(jQuery(this).closest('.cg_further_images_container').prev().hasClass('mainCGallery')){ // geht ehe nicht!!!!
                                jQuery('#cgFurtherImagesContainerDiv'+gid).cgGoTo();
                            }*/

                // height setzten damit es nicht springt weil empty und append von bildern gemacht wird
                jQuery('#mainCGallery'+gid).height(jQuery('#mainCGallery'+gid).height());

                history.pushState("", document.title, location.href.replace(location.hash,"")+'#!gallery/'+gid+'/step/'+stepNumber);
                cgJsClass.gallery.dynamicOptions.checkStepsCutImageData(jQuery,stepNumber,true,false,gid,null,null,isViewChange);

                // height wieder rausnehmen
                jQuery('#mainCGallery'+gid).height('auto');

                if(jQuery(this).hasClass('cg_cloned')){
                    location.href = '#cgFurtherImagesContainerDivPositionHelper'+gid;
                }

                // untere steps pauschal entfernen, aber erst hier
                jQuery('#mainCGallery'+gid).next('.cg_further_images_container').remove();

                setTimeout(function () {
                    cgJsClass.gallery.views.cloneFurtherImagesStep(gid);
                },500);

            }



            // weil bilder neu appenden muss scroll gemacht werden


/*            jQuery('html, body').animate({
                scrollTop: jQuery('#mainCGallery'+gid).offset().top - 100+'px'
            }, 'fast');*/

          //  location.hash = 'mainCGallery'+gid;
           // jQuery('#mainCGallery'+gid).cgGoTo();

        });

    }
};