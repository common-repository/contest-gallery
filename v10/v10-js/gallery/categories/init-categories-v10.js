cgJsClass.gallery.categories = {
    existingCategories: [0],
    init:function (gid,data) {// return true oder false für späteren check plus setzt categorien

        if(!cgJsData[gid].vars.existingCategories){
            cgJsData[gid].vars.existingCategories = [];
            cgJsData[gid].vars.existingCategories.push(0);
        }

        if(typeof data == 'object'){

            if(Object.keys(data).length>=1){

                // sort by field order
                var newData = [];

                for(var i in data){
                    if(!data.hasOwnProperty(i)){
                        break;
                    }
                    newData.push(data[i]);
                }

                newData.sort(function(a, b) {
                    return a.Field_Order - b.Field_Order;
                });

                // sort by field order --- END

                // get categories id

                for(var property in cgJsData[gid].forms.upload){

                    if(!cgJsData[gid].forms.upload.hasOwnProperty(property)){
                        break;
                    }

                    if(cgJsData[gid].forms.upload[property].Field_Type=='selectc-f'){
                        cgJsData[gid].vars.categoriesUploadFormId = property;
                        if(cgJsData[gid].forms.upload[property].Show_Slider==1){
                            cgJsData[gid].vars.categoriesUploadFormField_Show_Slider = cgJsData[gid].forms.upload[property].Show_Slider;
                        }
                        cgJsData[gid].vars.categoriesUploadFormTitle = cgJsData[gid].forms.upload[property].Field_Content.titel;
                    }
                }

                var active = 0;
                var $cgCatSelectArea = null;
                var $labelContainerOrigin = null;

                if(cgJsData[gid].options.pro.CatWidget==1){

                    $cgCatSelectArea = jQuery('#mainCGdiv'+gid).find('.cg-cat-select-area');
                    cgJsData[gid].vars.catArea = $cgCatSelectArea;
                    $labelContainerOrigin =$cgCatSelectArea.find('label');
                    // vorher leeren bevor er mit labes gefüllt wird
                    $cgCatSelectArea.empty();

                }

                for(var i in newData){

                    if(!newData.hasOwnProperty(i)){
                        break;
                    }

                    var catId = newData[i]['id'].toString();

                    cgJsData[gid].vars.existingCategories.push(parseInt(catId));//Important parseInt: because indexOf compare type always!

                    if(newData[i]['Active']==1){

                        active = 1;

                        if(cgJsData[gid].options.pro.CatWidget==1){
                            var $labelContainer = $labelContainerOrigin;
                            $labelContainer.attr('data-cg-cat-id',catId);
                            $labelContainer.attr('data-cg-gid',gid);
                         //   $labelContainer.find('input').attr('data-cg-cat-id',catId).val(data[i]['id']).prop('checked',true).attr('data-cg-gid',gid);
                            $labelContainer.find('span.cg_select_cat').html(newData[i]['Name']+' <span class="cg_select_cat_count">(0)</span>');
                            // wichtig!!! mit clone ansonsten verweißt die referenz immer auf $labelContainerOrigin !!!!!
                            $labelContainer.clone().appendTo($cgCatSelectArea);
                        }

                        cgJsData[gid].vars.categories[catId] = newData[i];
                        cgJsData[gid].vars.categories[catId]['Checked'] = true;

                        if(cgJsData[gid].vars.categories[catId]['isShowTagInGallery']){
                            cgJsData[gid].vars.isShowTagInGallery = true;
                        }

                    }

                }

                if(cgJsData[gid].options.pro.ShowOther==1){

                    if(cgJsData[gid].options.pro.CatWidget==1){
                        $labelContainerOrigin.attr('data-cg-cat-id',0);
                        $labelContainerOrigin.attr('data-cg-gid',gid);
                        //   $labelContainerOrigin.find('input').attr('data-cg-cat-id',0).val(0).prop('checked',true).attr('data-cg-gid',gid);
                        $labelContainerOrigin.find('span.cg_select_cat').html(cgJsClass.gallery.language[gid].Other+' <span class="cg_select_cat_count">(0)</span>');
                        $cgCatSelectArea.append($labelContainerOrigin);
                    }

                    // show other category object anlegen
                    cgJsData[gid].vars.categories[0] = {};
                    cgJsData[gid].vars.categories[0]['Checked'] = true;
                    cgJsData[gid].vars.categories[0]['Name'] = cgJsClass.gallery.language[gid].Other;
                }

                if($cgCatSelectArea){
                    $cgCatSelectArea.css('display','flex');
                }

                return true;

            }else{
                return false;
            }

        }else{
            return false;
        }


    },
    checkIfShowMoreForCatAreaRequired:function (gid,isFromFullWindowClose,isFromClickCategories) {
        if(cgJsData[gid].vars.catArea){

            var $cg_header = cgJsData[gid].vars.mainCGdiv.find('.cg_header');
            var cgHeaderVisibilityHidden = false;
            if($cg_header.hasClass('cg_visibility_hidden')){
                cgHeaderVisibilityHidden = true;
            }
            var cgHeaderHide = false;
            if($cg_header.hasClass('cg_hide')){
                cgHeaderHide = true;
            }

            $cg_header.removeClass('cg_visibility_hidden cg_hide');

            var lastPositionTop = undefined;
            var showMore = false;
            if(isFromFullWindowClose){// then container might be hidden, show first again
                // HANDLE FIRST LIKE ON PAGE LOAD!!!!
                cgJsData[gid].vars.catArea.removeClass('cg-cat-select-area-show-more-available cg-cat-select-area-show-less-available');
                cgJsData[gid].vars.catArea.closest('.cg-cat-select-area-container').removeClass('cg_hide cg_hidden cg-cat-select-area-show-more-available cg-cat-select-area-show-less-available');
                cgJsData[gid].vars.catArea.removeClass('cg_hide').addClass('cg_hidden');
                cgJsData[gid].vars.catArea.closest('.cg-cat-select-area-container').removeClass('cg-cat-select-area-show-more-available').find('.cg-cat-select-area-show-more').addClass('cg_hide');
                cgJsData[gid].vars.catArea.closest('.cg-cat-select-area-container').removeClass('cg-cat-select-area-show-more-available').find('.cg-cat-select-area-show-less').addClass('cg_hide');
            }

            if(isFromClickCategories){
                if(cgJsData[gid].vars.catArea.hasClass('cg-cat-select-area-show-less-available')){// then scaling required, otherwise failure behaviour, because already opened
                    return;
                }
            }

            cgJsData[gid].vars.catArea.find('.cg_select_cat_label').each(function (){
                var positionTop =  jQuery(this).position().top;
                if(lastPositionTop !== undefined && lastPositionTop!==positionTop){
                    showMore = true;
                    return false;// then break!
                }
                lastPositionTop = positionTop;
            });

            if(showMore){
                cgJsData[gid].vars.catArea.addClass('cg-cat-select-area-show-more-available');
                cgJsData[gid].vars.catArea.closest('.cg-cat-select-area-container').addClass('cg-cat-select-area-show-more-available').find('.cg-cat-select-area-show-more').removeClass('cg_hide');
                cgJsData[gid].vars.catArea.closest('.cg-cat-select-area-container').addClass('cg-cat-select-area-show-more-available').find('.cg-cat-select-area-show-less').addClass('cg_hide');
            }else{
                cgJsData[gid].vars.catArea.removeClass('cg-cat-select-area-show-more-available');
                cgJsData[gid].vars.catArea.closest('.cg-cat-select-area-container').removeClass('cg-cat-select-area-show-more-available').find('.cg-cat-select-area-show-more').addClass('cg_hide');
                cgJsData[gid].vars.catArea.closest('.cg-cat-select-area-container').removeClass('cg-cat-select-area-show-more-available').find('.cg-cat-select-area-show-less').addClass('cg_hide');
            }

            if(cgHeaderVisibilityHidden){
                $cg_header.addClass('cg_visibility_hidden');
            }
            if(cgHeaderHide){
                $cg_header.addClass('cg_hide');
            }

            cgJsData[gid].vars.catArea.removeClass('cg_hidden');

        }
    },
    initClick:function () {

        jQuery(document).on('click','.cg_select_cat_label',function(){

            var gid = jQuery(this).attr('data-cg-gid');

            var $element = jQuery(this);

            if(cgJsClass.gallery.function.general.tools.setWaitingForValues(gid,$element,'click')){
                return;
            }

/*            cgJsClass.gallery.vars.isHashJustChangedNewLogic = true;
            location.hash = '#';*/

            $element.closest('.cg-cat-select-area').find('.cg_select_cat_label:not([data-cg-cat-id='+$element.attr('data-cg-cat-id')+'])').addClass('cg_pointer_events_none cg_skeleton_loader');

            cgJsData[gid].vars.searchInputCollectedIds = null;

            if(cgJsData[gid].vars.currentLook=='blog'){
                cgJsClass.gallery.blogLogic.reset(gid);
            }

            cgJsClass.gallery.categories.processCategories(gid,$element);

            if(!cgJsClass.gallery.vars.fullwindow){
           //     setTimeout(function (){
                    cgJsClass.gallery.categories.checkIfShowMoreForCatAreaRequired(gid,false,true);// might be required because width might be changed in not full window of cat widget
              //  },200);
            }

            cgJsClass.gallery.vars.isHashJustChangedForHandling = true;
            window.history.replaceState({}, document.title, location.protocol + '//' + location.host + location.pathname);

            var $showMoreButton = jQuery(this).closest('.cg-cat-select-area-container').find('.cg-cat-select-area-show-more');

            if($showMoreButton.is(':visible')){
                $showMoreButton.click();
            }

            setTimeout(function (){
                $element.closest('.cg-cat-select-area').find('.cg_select_cat_label:not([data-cg-cat-id='+$element.attr('data-cg-cat-id')+'])').removeClass('cg_pointer_events_none cg_skeleton_loader');
            },1000);

        });

        jQuery(document).on('click','.cg-cat-select-area-show-more',function(){
            var $cgCatSelectAreaContainer = jQuery(this).closest('.cg-cat-select-area-container');
            $cgCatSelectAreaContainer.addClass('cg-cat-select-area-show-less-available').removeClass('cg-cat-select-area-show-more-available');
            $cgCatSelectAreaContainer.find('.cg-cat-select-area').addClass('cg-cat-select-area-show-less-available').removeClass('cg-cat-select-area-show-more-available');
            $cgCatSelectAreaContainer.find('.cg-cat-select-area-show-more').addClass('cg_hide');
            $cgCatSelectAreaContainer.find('.cg-cat-select-area-show-less').removeClass('cg_hide');
        });

        jQuery(document).on('click','.cg-cat-select-area-show-less',function(){
            var $cgCatSelectAreaContainer = jQuery(this).closest('.cg-cat-select-area-container');
            $cgCatSelectAreaContainer.removeClass('cg-cat-select-area-show-less-available').addClass('cg-cat-select-area-show-more-available');
            $cgCatSelectAreaContainer.find('.cg-cat-select-area').removeClass('cg-cat-select-area-show-less-available').addClass('cg-cat-select-area-show-more-available');
            $cgCatSelectAreaContainer.find('.cg-cat-select-area-show-more').removeClass('cg_hide');
            $cgCatSelectAreaContainer.find('.cg-cat-select-area-show-less').addClass('cg_hide');
        });

    },
    processCategories: function (gid,$element,isCalledFromUpload) {

        // weil der selbe effekt wie bei sorting, bilder müssen appenden
        cgJsClass.gallery.vars.hasToAppend = true;

        cgJsClass.gallery.vars.categoryClicked = true;

        cgJsClass.gallery.getJson.abortGetJson(gid);

        //var catIdClicked = jQuery(this).attr('data-cg-cat-id');
        var categories = [];

        if($element.hasClass('cg_cat_checkbox_checked')) {
            cgJsData[gid].vars.categories[$element.attr('data-cg-cat-id')]['Checked'] = false;// then will be unchecked
            $element.addClass('cg_cat_checkbox_unchecked');
            $element.removeClass('cg_cat_checkbox_checked');
        } else if (!$element.hasClass('cg_cat_checkbox_checked')){
            cgJsData[gid].vars.categories[$element.attr('data-cg-cat-id')]['Checked'] = true;// then will be checked
            var catId = $element.attr('data-cg-cat-id');
            categories.push(catId);
            $element.addClass('cg_cat_checkbox_checked');
            $element.removeClass('cg_cat_checkbox_unchecked');
        }

        // go through all checkboxes to check
        var $cgCatSelectArea = $element.closest('.cg-cat-select-area');
        var isAllCategoriesUnchecked = true;
        $cgCatSelectArea.find('.cg_select_cat_label').each(function () {
            if(jQuery(this).hasClass('cg_cat_checkbox_checked')) {
                isAllCategoriesUnchecked = false;
                cgJsData[gid].vars.categories[jQuery(this).attr('data-cg-cat-id')]['Checked'] = true;
            } else if (!jQuery(this).hasClass('cg_cat_checkbox_checked')){
                cgJsData[gid].vars.categories[jQuery(this).attr('data-cg-cat-id')]['Checked'] = false;
            }
        });

        if(cgJsData[gid].options.pro.ShowCatsUnchecked==1){
            if(isAllCategoriesUnchecked==true){// handle as like all were true
                $cgCatSelectArea.find('.cg_select_cat_label').each(function () {
                    cgJsData[gid].vars.categories[jQuery(this).attr('data-cg-cat-id')]['Checked'] = true;
                });
            }
        }

        if(!isCalledFromUpload){
            if (cgJsData[gid].vars.openedRealId > 0) {
                cgJsClass.gallery.views.close(gid);
            }
        }

        var ids = cgJsClass.gallery.function.search.collectData(gid);

        cgJsData[gid].vars.searchInputCollectedIds = ids;

        var fullImageDataFilteredAfterSearch =  cgJsClass.gallery.sorting.initSort(gid);

        var step = 1; // Weil fängt mit erstem Schritt an
        cgJsClass.gallery.dynamicOptions.checkStepsCutImageData(jQuery,step,true,false,gid,undefined,
            undefined,undefined,undefined,true,fullImageDataFilteredAfterSearch);

        cgJsClass.gallery.vars.categoryClicked = false;

        cgJsClass.gallery.vars.hasToAppend = false;

    },
    resetCategoriesCheckedStatusAfterUploadBeforeSorting: function (gid) {

        if(cgJsData[gid].options.pro.CatWidget==1){// important to check it here again (other gallery might be not reloaded after upload!), might be not required
            var $cgCatSelectArea = cgJsData[gid].vars.mainCGdiv.find('.cg-cat-select-area');
            $cgCatSelectArea.find('.cg_select_cat_label').each(function () {
                cgJsData[gid].vars.categories[jQuery(this).attr('data-cg-cat-id')]['Checked'] = true;
                if(cgJsData[gid].options.pro.ShowCatsUnchecked==1){
                    jQuery(this).removeClass('cg_cat_checkbox_checked');
                }else{
                    jQuery(this).addClass('cg_cat_checkbox_checked');
                }
            });
        }

    },
    addCategoriesImagesCount: function (gid) {

        if(cgJsData[gid].vars.showCategories && cgJsData[gid].options.pro.CatWidget==1){
            if(Object.keys(cgJsData[gid].vars.categoriesImagesCount).length>=1){
                for(var categoryId in cgJsData[gid].vars.categoriesImagesCount){
                    if(!cgJsData[gid].vars.categoriesImagesCount.hasOwnProperty(categoryId)){
                        break;
                    }
                    cgJsData[gid].vars.mainCGdiv.find('#cgCatSelectArea'+gid+' .cg_select_cat_label[data-cg-cat-id="'+categoryId+'"] .cg_select_cat_count').html('('+cgJsData[gid].vars.categoriesImagesCount[categoryId]+')');
                }
            }
        }

    },
    prepareAndAddCategoriesImagesCountAfterSearch: function (gid,searchInputCollectedIdsWithoutCategoryDependency,data) {

        if(cgJsData[gid].vars.showCategories && cgJsData[gid].options.pro.CatWidget==1){
            if(Object.keys(cgJsData[gid].vars.categoriesImagesCount).length>=1){
                // reset categories count first
                for(var categoryId in cgJsData[gid].vars.categoriesImagesCount){
                    if(!cgJsData[gid].vars.categoriesImagesCount.hasOwnProperty(categoryId)){
                        break;
                    }
                    cgJsData[gid].vars.categoriesImagesCount[categoryId] = 0;
                }
                for(var realId in data){
                    if(cgJsClass.gallery.categories.checkIfCanBeAddedToCategoriesCount(gid,realId)){// add only user images to count
                        if(!data.hasOwnProperty(realId)){
                            break;
                        }
                        if(searchInputCollectedIdsWithoutCategoryDependency.indexOf(realId)>=0){
                            var category = data[realId].Category;

                            if(typeof category == 'undefined'){
                                category = 0;
                                data[realId].Category = 0;
                            }else if(cgJsData[gid].vars.existingCategories.indexOf(parseInt(category))=='-1'){//if from some unexsting category then correct it here and set to 0, Important parseInt: because indexOf compare type always!
                                category = 0;
                                data[realId].Category = 0;
                            }

                            if(!cgJsData[gid].vars.categoriesImagesCount[category]){
                                cgJsData[gid].vars.categoriesImagesCount[category] = 1;
                            }else{
                                cgJsData[gid].vars.categoriesImagesCount[category] = cgJsData[gid].vars.categoriesImagesCount[category]+1;
                            }
                        }
                    }
                }
                // reset to 0 first
                cgJsData[gid].vars.mainCGdiv.find('#cgCatSelectArea'+gid+' .cg_select_cat_label .cg_select_cat_count').html('(0)');
                cgJsClass.gallery.categories.addCategoriesImagesCount(gid);
            }
        }

    },
    checkAndSetCategoriesAfterUploadIfNecessary: function (gid,data,newImageIdsArrayFromUpload) {

        var processingInitiated = false;

        var $categoryElement = null


        for(var i in newImageIdsArrayFromUpload){

            if(!newImageIdsArrayFromUpload.hasOwnProperty(i)){
                break;
            }

            if(data[newImageIdsArrayFromUpload[i]]){

                // has to be changed then otherwise image can not appear and gallery can not load
                if(cgJsData[gid].vars.showCategories && parseInt(data[newImageIdsArrayFromUpload[i]].Category) && cgJsData[gid].options.pro.CatWidget==1){

                    if(cgJsData[gid].options.pro.ShowCatsUnchecked==1){// nothing to do if not one is checked!

                        var oneCategoriesIsChecked = false;

                        cgJsData[gid].vars.mainCGdiv.find('.cg-cat-select-area .cg_select_cat_label').each(function () {
                            if(jQuery(this).hasClass('cg_cat_checkbox_checked')){
                                oneCategoriesIsChecked = true;
                                return false;
                            }
                        });

                        if(oneCategoriesIsChecked){
                            // check the boxes here first
                            $categoryElement = cgJsData[gid].vars.mainCGdiv.find('.cg-cat-select-area .cg_select_cat_label[data-cg-cat-id="'+data[newImageIdsArrayFromUpload[i]].Category+'"]');
                            processingInitiated = true;
                        }

                    }else{// then can be done anyway!!!!!!

                        $categoryElement = cgJsData[gid].vars.mainCGdiv.find('.cg-cat-select-area .cg_select_cat_label[data-cg-cat-id="'+data[newImageIdsArrayFromUpload[i]].Category+'"]');
                        processingInitiated = true;

                    }

                }

            }

        }

        if($categoryElement){
            // check the boxes here first
            cgJsClass.gallery.categories.processCategories(gid,$categoryElement,true);

        }

        return processingInitiated;

    },
    checkIfCanBeAddedToCategoriesCount: function (gid,realId){

        if(!cgJsData[gid].vars.isUserGallery || (cgJsData[gid].vars.isUserGallery && cgJsData[gid].wpUserImageIds.indexOf(realId) != -1)){
            return true;
        }else{
            return false;
        }

    }
};