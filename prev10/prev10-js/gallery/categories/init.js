cgJsClass.gallery.categories = {
    init:function () {

        // prüfen ob überhaupt categories vorhanden sind, wenn nicht dann löschen
        if(this.checkCat()){

            var checkSlider = cgJsClass.slider.vars.cg_activate_gallery_slider;

            if(checkSlider==0 && cgJsClass.gallery.vars.checkCatSelector==true){
                if(cgJsClass.gallery.vars.checkLocalStorage==true){

                    if(this.checkLocalStorage()){

                      //  this.setSelectFromLocalStorage();
                        this.setSelectFromLocalStorage();
                        this.changeFromLocalStorage();
                        this.changeObjectsFromLocalStorage();
                     //   this.setCatsCarrousel();
                     //   this.setImageObjectsForSlider();


                    }
                    else{
                        this.setLocalStorageSelectCats();
                    }

                }

            }
            else{
                this.removeLocalStorage();
            }

        }
        else{

            if(jQuery('.mainCGallery').length >= 1){
                this.removeLocalStorage();
            }
        }


    },
    setCatsCarrousel: function(){

        jQuery("#cgCatSelectArea .cg_select_cat").each(function (index) {

            var category = jQuery(this).attr('data-cat');

            if(jQuery(this).is(':visible')){

                jQuery('.cg-carrousel-img.'+category).removeClass('cg_hide');
                jQuery('.cg-carrousel-img.'+category).addClass('cg_visible');
            }
            else{
                jQuery('.cg-carrousel-img.'+category).addClass('cg_hide');
                jQuery('.cg-carrousel-img.'+category).removeClass('cg_visible');
            }

            if(jQuery(this).prop('checked')){
                jQuery(this).closest('label').addClass('cg_cat_checkbox_checked');
                jQuery(this).closest('label').removeClass('cg_cat_checkbox_unchecked');
            }
            else{
                jQuery(this).closest('label').addClass('cg_cat_checkbox_unchecked');
                jQuery(this).closest('label').removeClass('cg_cat_checkbox_checked');
            }


        });

    },
    setImageObjectsForSlider:function () {

        jQuery(".cg_show, .cg_show:hidden").each(function (index) {

            var count = index+1;
            if(jQuery(this).hasClass('cg_visible')){

                cgJsClass.slider.slide.values.visible[count] = true;
            }
            if(jQuery(this).hasClass('cg_hide')){
                cgJsClass.slider.slide.values.visible[count] = false;
            }

        });
       // console.log('image object for slider');
    //    console.log(cgJsClass.slider.slide.values.visible);

    },
    checkCat: function () {

        if(jQuery(".cg_select_cat").length>=1){

            jQuery(document).on('change','.cg_select_cat_label',function () {

                jQuery(this).addClass('cg_disabled',true);

                cgJsClass.gallery.categories.change(this);
                cgJsClass.gallery.categories.changeObjectForSingleImageView(this);
                cgJsClass.gallery.categories.setCatsForSingleImageView(this);


                if(jQuery(this).hasClass('cg_cat_checkbox_checked')){
                    jQuery(this).removeClass('cg_cat_checkbox_checked').addClass('cg_cat_checkbox_unchecked');
                  //  jQuery(this).closest('label').addClass('cg_cat_checkbox_checked');
                //    jQuery(this).closest('label').removeClass('cg_cat_checkbox_unchecked');
                }


                if(jQuery(this).hasClass('cg_cat_checkbox_unchecked')){
                    jQuery(this).removeClass('cg_cat_checkbox_unchecked').addClass('cg_cat_checkbox_checked');
                  //  jQuery(this).closest('label').addClass('cg_cat_checkbox_checked');
                //    jQuery(this).closest('label').removeClass('cg_cat_checkbox_unchecked');
                }

                var checkbox = jQuery(this);

                setTimeout(function () {

                    checkbox.removeClass('cg_disabled',false);

                },1000);

            });

            return true;
        }
        else{
            return false;
        }

    },
    checkIfAllImagesHidden:function () {

        var hide = true;
        jQuery('.cg_show, .cg_show:hidden').each(function () {

            if(jQuery(this).hasClass('cg_visible')){
                hide = false;

            }

        })

        if(hide==true){
            jQuery('#mainCGdiv .cg_further_images_container').first().hide();
        }
        else{
            jQuery('#mainCGdiv .cg_further_images_container').first().show();
        }

    },
    cgJsClassGalleryCategories: false,
    createCatsForSingleImageView: function(object) {



    },
    setCatsForSingleImageView: function(object) {

        var checkSlider = cgJsClass.slider.vars.cg_activate_gallery_slider;

        if(checkSlider==0){

            if(cgJsClass.gallery.vars.checkLocalStorage==true){

                this.cgJsClassGalleryCategories[jQuery(object).val()] = jQuery(object).hasClass('cg_cat_checkbox_checked');
                localStorage.setItem('cgJsClassGalleryCategories',JSON.stringify(this.cgJsClassGalleryCategories));

            }
        }


    },
    checkLocalStorage: function() {

        if(cgJsClass.gallery.vars.checkLocalStorage==true){

            if (localStorage.getItem('cgJsClassGalleryCategories') != null){
            return true;
                 }else{
            return false;
            }
         }

    }

}