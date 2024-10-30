cgJsClass.gallery.views.fullwindow.init = function () {

    cgJsClass.gallery.views.fullwindow.openEvent();
    cgJsClass.gallery.views.fullwindow.closeEvent();

};
cgJsClass.gallery.views.fullwindow.checkAndHideFullWindowConfigurationButton = function (gid,$cgCenterDiv) {

    var categoriesCheck = false;

    if(cgJsData[gid].vars.showCategories){
        if(Object.keys(cgJsData[gid].vars.categories).length>=2){
            categoriesCheck = true;// then at least 2 categories will be displayed in header controls
        }
    }

    if(!categoriesCheck && cgJsData[gid].options.general.AllowSort!=1 && cgJsData[gid].options.pro.Search!=1 && cgJsData[gid].options.general.RandomSortButton!=1){
        if($cgCenterDiv){
            $cgCenterDiv.find('.cg-fullwindow-configuration-button').addClass('cg_hide');
        }else{
            cgJsData[gid].vars.mainCGdivHelperParent.find('.cg-fullwindow-configuration-button').addClass('cg_hide');
        }
    }else{
        if($cgCenterDiv){
            $cgCenterDiv.find('.cg-fullwindow-configuration-button').removeClass('cg_hide');
        }
    }

};
cgJsClass.gallery.views.fullwindow.checkIfGalleryAlreadyFullWindow = function (gid) {

        if(cgJsClass.gallery.vars.isMobile){
            var windowWidth = screen.width;
        }else{
            var windowWidth = jQuery(window).width();
        }

        // var widthMainCGallery = parseInt(jQuery('#mainCGdivContainer'+gid).parent().width());
        //   var cssWidth = jQuery('#mainCGdivContainer'+gid).parent().css('width');
        var mainCGdivContainerWidth = jQuery('#mainCGdivContainer'+gid).width();
        //   debugger
        var widthDifferenceCheck = windowWidth-mainCGdivContainerWidth;

        if(widthDifferenceCheck<100){
            cgJsData[gid].vars.galleryAlreadyFullWindow = true;
            jQuery('#cgCenterImageFullwindowHeader'+gid).hide();
            jQuery('#cgCenterImageFullwindow'+gid).hide();
        }else{
            cgJsData[gid].vars.galleryAlreadyFullWindow = false;
            if(!cgJsClass.gallery.vars.fullwindow){
                jQuery('#cgCenterImageFullwindowHeader'+gid).show();
            }
            jQuery('#cgCenterImageFullwindow'+gid).show();
        }

};