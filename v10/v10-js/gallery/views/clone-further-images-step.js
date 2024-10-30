cgJsClass.gallery.views.cloneFurtherImagesStep = function (gid) {

    if(jQuery('#mainCGdiv'+gid).find('.cg_further_images_container').first().is(':visible')){

        var mainCGallery = jQuery('#mainCGallery'+gid);
        var heightCheck = jQuery(window).height()/3;
        if(mainCGallery.height()>heightCheck){
            if(jQuery('#mainCGdiv'+gid).find('.cg_further_images_container').length>1){
                jQuery('#mainCGdiv'+gid).find('.cg_further_images_container').each(function (index) {

                    if(index>=1){
                        jQuery(this).remove();
                    }

                });
            }
            jQuery('#mainCGdiv'+gid).find('.cg_further_images_container').first().clone().removeAttr('id').appendTo('#mainCGdiv'+gid).find('.cg_further_images').addClass('cg_cloned');

        }
        else{
            if(Object.keys(cgJsData[gid].fullImageDataFiltered).length<1){
                jQuery('#mainCGdiv'+gid).find('.cg_further_images_container:first-child').hide();
                jQuery('#mainCGdiv'+gid).find('.cg_further_images_container:last-child').remove();
            }else{
                jQuery('#mainCGdiv'+gid).find('.cg_further_images_container:last-child').remove();
                if(cgJsClass.gallery.vars.categoryClicked==false && cgJsClass.gallery.vars.inputWritten == false){
                    jQuery('#cgFurtherImagesContainerDiv'+gid).cgGoTo();
                }
            }

        }

    }

};