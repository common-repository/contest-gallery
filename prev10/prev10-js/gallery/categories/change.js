cgJsClass.gallery.categories.change = function(object){
    var catClass = jQuery(object).attr('data-cat');

    /*    jQuery.fn.cgGoTo = function() {
            jQuery('html, body').animate({
                scrollTop: jQuery(this).offset().top - 40+'px'
            }, 'fast');
            return this; // for chaining...
        }*/

    if(jQuery(object).prop('checked')){

        //jQuery('#mainCGallery .'+catClass).css('display','block');

        // jQuery('.cg_show').each(function () {

        //   if(jQuery(this).hasClass('cg_hide')){

        jQuery('.'+catClass).removeClass('cg_hide');
        jQuery('.'+catClass).addClass('cg_visible');
        cgJsClass.gallery.categories.checkIfAllImagesHidden(object);

        cgJsClass.slider.slide.objects.resizingGallery(false,true);


        // ACHTUNG!!! Die beiden Funktionen dann ausführen wenn cg_hide und cg_visible gesetzt wurden
        // Da sich diese an diese Klassen orientieren
        cgJsClass.gallery.categories.setImageObjectsForSlider();
        //  cgJsClass.gallery.categories.setLocalStorage();



        jQuery('.'+catClass).addClass('cg_blink_image_appear');

        setTimeout(function () {
            jQuery('.'+catClass).removeClass('cg_blink_image_appear');



        },1000)



    }
    else{
        //   jQuery('#mainCGallery .'+catClass).css('display','none');
        jQuery('.'+catClass).addClass('cg_blink_image_disappear');

        setTimeout(function () {
            jQuery('.'+catClass).addClass('cg_hide');
            jQuery('.'+catClass).removeClass('cg_visible');
            jQuery('.'+catClass).removeClass('cg_blink_image_disappear');
            cgJsClass.gallery.categories.checkIfAllImagesHidden(object);


            cgJsClass.slider.slide.objects.resizingGallery(false,true);
            // ACHTUNG!!! Die beiden Funktionen dann ausführen wenn cg_hide und cg_visible gesetzt wurden
            // Da sich diese an diese Klassen orientieren
            cgJsClass.gallery.categories.setImageObjectsForSlider();
            // cgJsClass.gallery.categories.setLocalStorage();


        },1000)

    }

}
cgJsClass.gallery.categories.changeObjectForSingleImageView = function(object){

    var checkSlider = cgJsClass.slider.vars.cg_activate_gallery_slider;

    if(checkSlider==0){

        if(cgJsClass.gallery.vars.checkLocalStorage==true){

            var catIds = cgJsClass.slider.slide.values.activatedImageCategoriesIds;
            var ids = cgJsClass.slider.slide.values.activatedIds;

            for(var property in catIds){

                var catId = jQuery(object).val();
               // console.log(catId);

                if(jQuery(object).prop('checked') == false && parseInt(catId)==parseInt(catIds[property])){
                    ids[property] = false;
                }
                if(jQuery(object).prop('checked') == true && parseInt(catId)==parseInt(catIds[property])){
                    ids[property] = true;
                }
                localStorage.setItem('cgJsClassIdsChecker',JSON.stringify(ids));

            }
        }

      // console.log(ids);

    }
}
