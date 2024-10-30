cgJsClass.gallery.function.search.inputProcess = function($element){

            var gid = $element.attr('data-cg-gid');

            cgJsData[gid].vars.searchInputTstamp = new Date().getTime()/1000;
            var searchInputValue = $element.val();

            if(searchInputValue==cgJsData[gid].vars.searchInput){
                // then must be same value, must be empty and then can be returned, otherwise broken gallery might appear
                return;
            }

/*
    cgJsClass.gallery.vars.isHashJustChangedNewLogic = true;
    location.hash = '#';// should not be used because when fast input, is bad
*/

            // has to be done with timeout otherwise gallery might be broken if fast input remove with remove/back button
            setTimeout(function (){

                if(cgJsClass.gallery.function.general.tools.setWaitingForValues(gid,$element,'input',true)){
                    return;
                }


        cgJsData[gid].vars.openedRealId = 0;

        cgJsData[gid].vars.searchInputCollectedIds = null;

                cgJsClass.gallery.vars.inputWritten = true;
                cgJsClass.gallery.vars.hasToAppend = true;

         cgJsData[gid].vars.mainCGdiv.find('.cg_thumbs_and_categories_control').addClass('cg_pointer_events_none');

                if(cgJsData[gid].vars.currentLook=='blog'){
                    cgJsClass.gallery.blogLogic.reset(gid);
                    if(cgJsClass.gallery.vars.fullwindow){
                        cgJsData[gid].vars.mainCGdiv.addClass('cg_fullwindow_blog_view_search');
                        cgJsData[gid].vars.cgCenterDivLoaderContainer.addClass('cg_is_on_search');
                        cgJsData[gid].vars.cgCenterDivLoaderContainer.find('.cgCenterDiv.cgCenterDivLoader').removeClass('cg_hide');
                        cgJsData[gid].vars.cgCenterDivLoaderContainer.removeClass('cg_hide cg_hidden').addClass('cg_visibility_visible');
                        cgJsData[gid].vars.cgCenterDivLoaderContainerBackdrop.removeClass('cg_hidden').addClass('cg_visibility_visible');
                        setTimeout(function(){
                            if(cgJsData[gid].vars.searchInputTstamp < new Date().getTime()/1000){
                                cgJsData[gid].vars.mainCGdiv.removeClass('cg_fullwindow_blog_view_search');
                                cgJsData[gid].vars.cgCenterDivLoaderContainer.addClass('cg_hide cg_hidden').removeClass('cg_visibility_visible');
                                cgJsData[gid].vars.cgCenterDivLoaderContainerBackdrop.addClass('cg_hide cg_hidden').removeClass('cg_visibility_visible');
                                cgJsData[gid].vars.cgCenterDivLoaderContainer.removeClass('cg_is_on_search');
                                cgJsData[gid].vars.searchInputTstamp = 0;
                                cgJsData[gid].vars.mainCGdiv.find('.cg_thumbs_and_categories_control').removeClass('cg_pointer_events_none');
                            }
                        },2000);
                    }else{
                        cgJsData[gid].vars.mainCGdiv.addClass('cg_blog_view_search');
                        cgJsData[gid].vars.cgCenterDivLoaderContainer.addClass('cg_is_on_search');
                        cgJsData[gid].vars.cgCenterDivLoaderContainer.find('.cgCenterDiv.cgCenterDivLoader').removeClass('cg_hide');
                        cgJsData[gid].vars.cgCenterDivLoaderContainer.removeClass('cg_hide cg_hidden').addClass('cg_visibility_visible');
                        cgJsData[gid].vars.mainCGdiv.height((cgJsData[gid].vars.cgCenterDivLoaderContainer.height()+500));// 250 approximately simply max height of header
                        cgJsData[gid].vars.mainCGallery.css('min-height',(cgJsData[gid].vars.cgCenterDivLoaderContainer.height()+250)+'px');// 250 approximately simply max height of header
                        setTimeout(function(){
                            if(cgJsData[gid].vars.searchInputTstamp < new Date().getTime()/1000){
                                cgJsData[gid].vars.mainCGdiv.removeClass('cg_blog_view_search');
                                cgJsData[gid].vars.mainCGdiv.css('height','unset');
                                cgJsData[gid].vars.mainCGallery.css('min-height','');
                                cgJsData[gid].vars.cgCenterDivLoaderContainer.removeClass('cg_is_on_search');
                                cgJsData[gid].vars.cgCenterDivLoaderContainer.addClass('cg_hide cg_hidden').removeClass('cg_visibility_visible');
                                cgJsData[gid].vars.cgCenterDivLoaderContainerBackdrop.addClass('cg_hide cg_hidden').removeClass('cg_visibility_visible');
                                cgJsData[gid].vars.searchInputTstamp = 0;
                                cgJsData[gid].vars.mainCGdiv.find('.cg_thumbs_and_categories_control').removeClass('cg_pointer_events_none');
                            }
                        },2000);
                    }
                }

                cgJsData[gid].vars.mainCGallery.css('height',cgJsData[gid].vars.mainCGallery.height()+'px');

                //   cgJsClass.gallery.getJson.abortGetJson(gid);

                cgJsData[gid].vars.searchInput = searchInputValue;

                // falls ein Bild geöffnet ist, muss alles zurückgesetzt werden!!!!
                if(cgJsData[gid].vars.openedRealId>0){
                    cgJsClass.gallery.views.close(gid);
                }

                var ids = cgJsClass.gallery.function.search.collectData(gid);
        cgJsData[gid].vars.searchInputCollectedIds = ids;

                cgJsClass.gallery.categories.prepareAndAddCategoriesImagesCountAfterSearch(gid,cgJsData[gid].vars.searchInputCollectedIdsWithoutCategoryDependency,cgJsData[gid].vars.rawData);

        var fullImageDataFilteredAfterSearch =  cgJsClass.gallery.sorting.initSort(gid);

                var step = 1; // Weil fängt mit erstem Schritt an
        cgJsClass.gallery.dynamicOptions.checkStepsCutImageData(
            jQuery,step,true,false,gid,undefined,
            undefined,undefined,undefined,
            true,fullImageDataFilteredAfterSearch
        );
                //var $step = jQuery('#cgFurtherImagesContainerDiv'+gid).find('.cg_further_images[data-cg-step="1"]');
                //$step.click();

                cgJsClass.gallery.vars.inputWritten = false;

                cgJsData[gid].vars.mainCGallery.css('height','auto');

                if(cgJsData[gid].vars.currentLook!='blog'){
                    cgJsData[gid].vars.mainCGdiv.find('.cg_thumbs_and_categories_control').removeClass('cg_pointer_events_none');
                }

            },1);



}
cgJsClass.gallery.function.search.input = function(){

        jQuery(document).on('input','.cg_search_input',function () {
            cgJsClass.gallery.function.search.inputProcess(jQuery(this));
        });

        jQuery(document).on('focusin','.cg_search_input',function () {
            if (cgJsClass.gallery.vars.fullwindow) {
                cgJsClass.gallery.vars.isHashJustChangedNewLogic = true;
                location.hash = '#';
            }
        });

/*        jQuery(document).on('focusout','.cg_search_input',function () {
            var gid = jQuery(this).attr('data-cg-gid');
            if(cgJsData[gid].vars.searchInputCollectedIds && cgJsData[gid].vars.searchInputCollectedIds.length){
                localStorage.setItem('cgSearchInputCollectedIds'+gid,JSON.stringify(cgJsData[gid].vars.searchInputCollectedIds));
                localStorage.setItem('cgSearchInput'+gid,cgJsData[gid].vars.searchInput);
            }else{
                localStorage.removeItem('cgSearchInputCollectedIds'+gid);
                localStorage.removeItem('cgSearchInput'+gid);
            }
        });*/

};