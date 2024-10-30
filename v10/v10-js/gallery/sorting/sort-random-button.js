cgJsClass.gallery.sorting.initSortRandomButton = function (gid){

    jQuery(document).on( "click", ".cg_random_button", function() {

        cgJsClass.gallery.vars.hasToAppend = true;

        var gid = jQuery(this).attr('data-cg-gid');
        cgJsData[gid].options.pro.PreselectSort='random';

        var $element = jQuery(this);

        if(cgJsClass.gallery.function.general.tools.setWaitingForValues(gid,$element,'change')){
            return;
        }

        $element.addClass('cg_hide');
        var $cg_random_button_loader = $element.parent().find('.cg_random_button_loader');
        $cg_random_button_loader.removeClass('cg_hide');

        var sliderView = false;

        if(cgJsData[gid].vars.currentLook=='slider'){
            sliderView = true;
        }

        if(cgJsData[gid].vars.currentLook=='blog'){
            cgJsClass.gallery.blogLogic.reset(gid);
        }

        cgJsData[gid].vars.sorting = 'random';

        // falls ein Bild geöffnet ist, muss alles zurückgesetzt werden!!!!
        if(cgJsData[gid].vars.openedRealId>0 && (!sliderView)){
            cgJsClass.gallery.views.close(gid);
        }

        if(cgJsData[gid].options.general.AllowSort==1){
            if(cgJsData[gid].vars.mainCGdiv.find('#cg_select_order'+gid).find('.cg_random_sort').length){// only if random option exists
                cgJsData[gid].vars.mainCGdiv.find('#cg_select_order'+gid).val("random");
            }
        }

        cgJsData[gid].image = cgJsClass.gallery.sorting.random(gid);

     //   var fullData = cgJsData[gid].fullImageData;
      //  var length = Object.keys(fullData).length;

        var PicsPerSite = parseInt(cgJsData[gid].options.general.PicsPerSite);
        var isInitiatedThroughViewChange = false;

        // Cut data here or something like this if data length higher then PicsPerSite
        if(cgJsData[gid].image.length>PicsPerSite && sliderView == false){
            isInitiatedThroughViewChange = true;
            // click always step 1
            var $step = cgJsData[gid].vars.mainCGdiv.find('#cgFurtherImagesContainerDiv'+gid).find('.cg_further_images[data-cg-step="1"]').addClass('cg_sorting_changed').removeClass('cg_further_images_selected');
            $step.addClass('cg_view_change').addClass('cg_random_button_clicked').click();// !important cg_view_change class, otherwise no reaction (processing) because might click current selected step
          //  var step = cgJsClass.gallery.dynamicOptions.checkIfStepClick();
           // cgJsClass.gallery.dynamicOptions.checkStepsCutImageData(jQuery,step,true,false,gid);
            cgJsClass.gallery.vars.hasToAppend = false;

        }else{
            // jQuery('#mainCGallery'+gid).find('.cg_show').remove();// Absolut wichtig für Thumb view! Sonst Width problem!
        }

/*
        if(cgJsData[gid].options.general.SliderLook==1){

            var $cgCenterDiv = jQuery('#cgCenterDiv'+gid);

            $cgCenterDiv.css(
                {
                    'width' : $cgCenterDiv.width(),
                    'min-height' : $cgCenterDiv.height()
                }
            );

        }
*/

        if(cgJsData[gid].vars.currentLook=='row'){
            cgJsClass.gallery.rowLogic.init(jQuery,gid);
        }
        if(cgJsData[gid].vars.currentLook=='height'){
            cgJsClass.gallery.heightLogic.init(jQuery,gid);
        }

        if(cgJsData[gid].vars.currentLook=='slider'){
            cgJsData[gid].vars.openedRealId = 0;
            jQuery('#mainCGdiv'+gid).find('#mainCGslider'+gid).find('.cg_show').remove();
            cgJsClass.gallery.thumbLogic.init(jQuery,gid,null,null,true,null,null,true);
        }

        if(cgJsData[gid].vars.currentLook=='thumb'){
            cgJsClass.gallery.thumbLogic.init(jQuery,gid);
        }

        if(cgJsData[gid].vars.currentLook=='blog' && !isInitiatedThroughViewChange){// not required because already over cg_view_change initiated
            cgJsClass.gallery.blogLogic.init(jQuery,gid,null,null,null,true);
        }

        setTimeout(function (){

            $element.removeClass('cg_hide');
            $cg_random_button_loader.addClass('cg_hide');

        },1000);


        cgJsClass.gallery.vars.hasToAppend = false;

    });

};
cgJsClass.gallery.sorting.showRandomButton = function (gid){
  //  console.log('showRandomButton');
 //   console.trace();
    // otherwise random button might unnecessary appear!
    if(Object.keys(cgJsData[gid].vars.rawData).length==0){
        var cgGalleryViewSortControl = jQuery('#mainCGdivHelperParent'+gid);// take from mainCGdivHelperParent because full window might be clicked instantly
        cgGalleryViewSortControl.find('.cg-lds-dual-ring').addClass('cg_hide');
        cgGalleryViewSortControl.find('.cg_random_button').addClass('cg_hide');
    }
    else if(Object.keys(cgJsData[gid].vars.rawData).length>0){
        setTimeout(function () {
            var cgGalleryViewSortControl = jQuery('#mainCGdivHelperParent'+gid);// take from mainCGdivHelperParent because full window might be clicked instantly
            cgGalleryViewSortControl.find('.cg-lds-dual-ring').addClass('cg_hide');
            cgGalleryViewSortControl.find('.cg_random_button').removeClass('cg_hide');
        },6000);
    }
};
cgJsClass.gallery.sorting.showRandomButtonInstantly = function (gid){// ALL three big requests has to be done before, image-data, sorting-data, info-data!
   // console.log('showRandomButtonInstantly');
    //console.trace();
    // otherwise random button might unnecessary appear!
    if(Object.keys(cgJsData[gid].vars.rawData).length==0){
        var cgGalleryViewSortControl = jQuery('#mainCGdivHelperParent'+gid);// take from mainCGdivHelperParent because full window might be clicked instantly
        cgGalleryViewSortControl.find('.cg-lds-dual-ring').addClass('cg_hide');
        cgGalleryViewSortControl.find('.cg_random_button').addClass('cg_hide');
    }
    else if(Object.keys(cgJsData[gid].vars.rawData).length>0){
        var cgGalleryViewSortControl = jQuery('#mainCGdivHelperParent'+gid);// take from mainCGdivHelperParent because full window might be clicked instantly
        cgGalleryViewSortControl.find('.cg-lds-dual-ring').addClass('cg_hide');
        cgGalleryViewSortControl.find('.cg_random_button').removeClass('cg_hide');
    }

};
cgJsClass.gallery.sorting.showRandomButtonDelayed = function (gid,delayTime){// ALL three big requests has to be done before, image-data, sorting-data, info-data!
 //   console.log('showRandomButtonDelayed');
  //  console.trace();
    setTimeout(function () {
        var cgGalleryViewSortControl = jQuery('#mainCGdivHelperParent'+gid);// take from mainCGdivHelperParent because full window might be clicked instantly
        cgGalleryViewSortControl.find('.cg-lds-dual-ring').addClass('cg_hide');
        cgGalleryViewSortControl.find('.cg_random_button').removeClass('cg_hide');
    },delayTime);

};