cgJsClass.gallery.info.checkInfoSingleImageView = function (realId,gid,order,isBlogView,gidForElements) {

  //  setTimeout(function () {
        if(typeof cgJsData[gid].vars.info[realId]=='undefined'){
            cgJsClass.gallery.info.getInfo(realId,gid,true,order,false,false,gidForElements);
        }
        else{
            cgJsClass.gallery.views.setInfoSingleImageView(realId,gid,order,gidForElements);
        }
  //  },500);

};
cgJsClass.gallery.views.setWatermarkSingleImageView = function (realId,gid,data,$cgCenterDiv) {

    var isAlternativeFileType = cgJsClass.gallery.function.general.tools.isAlternativeFileType(gid,realId);

    if(isAlternativeFileType){
        return;
    }

    // place watermark position
    // go through infoData first
    for(var uploadFieldId in data){

        if(!data.hasOwnProperty(uploadFieldId)){
            break;
        }

        if (cgJsData[gid].options.visual['WatermarkPosition']) {
            if(cgJsData[gid].forms.upload[uploadFieldId]){
                if(cgJsData[gid].forms.upload[uploadFieldId]['WatermarkPosition']){
                    // if exists before, can be generally removed before for sure
                    $cgCenterDiv.find('.cg_watermark').remove();
                    if(data[uploadFieldId]['field-content']){
                        var content = data[uploadFieldId]['field-content'].replace(/\\/g,'');
                        var watermarkClass = 'cg_watermark-'+cgJsData[gid].options.visual['WatermarkPosition'];
                        $cgCenterDiv.find('.cg-center-image').append('<div class="cg_watermark '+watermarkClass+'">' + content + '</div>');
                    }
                }
            }
        }

    }
    // place watermark position --- END

    // then go through upload form
    for(var uploadFieldId in cgJsData[gid].forms.upload){

        if(!cgJsData[gid].forms.upload.hasOwnProperty(uploadFieldId)){
            break;
        }

        if (cgJsData[gid].options.visual['WatermarkPosition']) {
            if(cgJsData[gid].forms.upload[uploadFieldId]){
                if(cgJsData[gid].forms.upload[uploadFieldId]['WatermarkPosition']){
                    // if exists before, can be generally removed before for sure
                    if(cgJsData[gid].forms.upload[uploadFieldId]['Field_Type'] == 'selectc-f'){
                        $cgCenterDiv.find('.cg_watermark').remove();
                        var Category = cgJsData[gid].vars.rawData[realId]['Category'];
                        if(Category>0 && cgJsData[gid].vars.categories[Category]){
                            var content = cgJsData[gid].vars.categories[Category].Name;
                        }else{
                            var content = cgJsClass.gallery.language[gid].Other;
                        }
                        content = content.replace(/\\/g,'');
                        content = jQuery('<textarea />').html(content).text();

                        var watermarkClass = 'cg_watermark-'+cgJsData[gid].options.visual['WatermarkPosition'];
                        $cgCenterDiv.find('.cg-center-image').append('<div class="cg_watermark '+watermarkClass+'">' + content + '</div>');
                    }
                }
            }
        }

    }

};
cgJsClass.gallery.views.setInfoSingleImageView = function (realId,gid,infoCatched,gidForElements) {

    var $cgCenterDiv = cgJsData[gid].vars.mainCGdiv.find('#cgCenterDiv'+gidForElements);

    $cgCenterDiv.find('#cgCenterImageInfoDiv'+gidForElements).addClass('cg_hide');
    $cgCenterDiv.find('#cgCenterImageInfoDiv'+gidForElements).empty();
    $cgCenterDiv.find('#cgCenterImageInfoDivTitle'+gidForElements).addClass('cg_hide');

    var append = false;
    var thereIsImageInfo = false;

    if(typeof cgJsData[gid].vars.info[realId]=='undefined' && infoCatched!==true){
        cgJsClass.gallery.info.getInfo(realId,gid,true);
        return;
    }

    var data = cgJsData[gid].vars.info[realId];

    // then edit info icon can disappear for this image if user gallery and no info to edit
    if(!cgJsData[gid].vars.isUserGalleryAndHasFieldsToEdit){
        $cgCenterDiv.find('#cgCenterImageInfoEditIcon'+gid).addClass('cg_hide');
    }else{
        $cgCenterDiv.find('#cgCenterImageInfoEditIcon'+gid).removeClass('cg_hide');
    }

    for(var index in cgJsData[gid].singleViewOrder){

        if(!cgJsData[gid].singleViewOrder.hasOwnProperty(index)){
            break;
        }

        cgJsData[gid].singleViewOrder[index].append = null;

    }

    cgJsClass.gallery.views.setWatermarkSingleImageView(realId,gid,data,$cgCenterDiv);

    // data[realId] ist wie ein array aufgebaut
    for(var i in data){

        if(!data.hasOwnProperty(i)){
            break;
        }

        var fieldId = i;

        if(data[i]['field-content']){

            if(cgJsData[gid].forms.upload.hasOwnProperty(i)){
                if(cgJsData[gid].forms.upload[i].Show_Slider==1){

                    thereIsImageInfo = true;
                    cgJsClass.gallery.vars.thereIsImageInfo = true;

                    if(append == false){
                        //  jQuery('#cgCenterImageInfoDiv'+gid).removeClass('cg_hide');
                        //    jQuery('#cgCenterImageInfoDivTitle'+gid).removeClass('cg_hide');
                        append = true;
                    }

                    var title = data[i]['field-title'].replace(/\\/g,'');
                    var content = data[i]['field-content'].replace(/\\/g,'');
                    content = jQuery('<textarea />').html(content).text();

                    if(data[i]['field-type']=='url-f'){
                        if(content.indexOf('http')==-1){
                            content = 'http://'+content;
                        }
                        var $infoContent = jQuery('<div class="cg-center-image-info-div"><p><a href="'+content+'" target="_blank">'+title+'</a></p></div>');
                    }else{
                        var $infoContent = jQuery('<div class="cg-center-image-info-div"><p>'+title+':</p><p class="cg-center-image-info-div-content">'+content+'</p></div>');
                    }

                    for(var index in cgJsData[gid].singleViewOrder){

                        if(!cgJsData[gid].singleViewOrder.hasOwnProperty(index)){
                            break;
                        }

                        if(cgJsData[gid].singleViewOrder[index].id==fieldId){
                            cgJsData[gid].singleViewOrder[index].append = $infoContent.attr('data-cg-single-view-order',index);
                        }

                    }

                }

            }

        }

    }

    var Category = cgJsData[gid].vars.rawData[realId]['Category'];
    var categoryContentToAppear = '';

    if(((Category>0 && cgJsData[gid].vars.showCategories==true) || (cgJsData[gid].vars.showCategories==true && Category==0)) && (cgJsData[gid].vars.categoriesUploadFormField_Show_Slider == 1)){
        var title = cgJsData[gid].vars.categoriesUploadFormTitle.replace(/\\/g,'');
        if(Category>0 && cgJsData[gid].vars.categories[Category]){// set category might be deleted then better to check cgJsData[gid].vars.categories[Category]
            var content = cgJsData[gid].vars.categories[Category].Name;
        }else{
            var content = cgJsClass.gallery.language[gid].Other;
        }
        var content = content.replace(/\\/g,'');
        content = jQuery('<textarea />').html(content).text();

        categoryContentToAppear = content;
        var $infoContent = jQuery('<div class="cg-center-image-info-div"><p>'+title+':</p><p class="cg-center-image-info-div-content">'+content+'</p></div>');
        // jQuery('#cgCenterImageInfoDiv'+gid).append(jQuery(infoContent));

        for(var index in cgJsData[gid].singleViewOrder){

            if(!cgJsData[gid].singleViewOrder.hasOwnProperty(index)){
                break;
            }
            if(cgJsData[gid].singleViewOrder[index].id==cgJsData[gid].vars.categoriesUploadFormId){
                cgJsData[gid].singleViewOrder[index].append = $infoContent.attr('data-cg-single-view-order',index);
                append = true;
            }

        }
    }

    if(append==true){

        for(var index in cgJsData[gid].singleViewOrder){
            if(!cgJsData[gid].singleViewOrder.hasOwnProperty(index)){
                break;
            }
            if(cgJsData[gid].singleViewOrder[index].append!=null){
                $cgCenterDiv.find('#cgCenterImageInfoDiv'+gidForElements).append(jQuery(cgJsData[gid].singleViewOrder[index].append));
            }
        }

        if(cgJsData[gid].vars.translateX){
            $cgCenterDiv.find('#cgCenterImageInfoDivTitle'+gidForElements).removeClass('cg_hide');
        }else{
            $cgCenterDiv.find('#cgCenterImageInfoDivTitle'+gidForElements).removeClass('cg_hide');
        }

        // old logic 2019 03 09
        /*        jQuery('#cgCenterImageInfoDiv'+gid).hide().removeClass('cg_hide').slideDown().add(
                    setTimeout(function () {
                        jQuery('#cgCenterDiv'+gid).height('auto');
                    },400)
                );*/
        $cgCenterDiv.find('#cgCenterImageInfoDiv'+gidForElements).removeClass('cg_hide');
    }

    if(cgJsData[gid].vars.isUserGallery && cgJsData[gid].vars.isUserGalleryAndHasFieldsToEdit){
        $cgCenterDiv.find('#cgCenterImageInfoDiv'+gidForElements).empty();
        for(var fieldOrder in cgJsData[gid].forms.uploadUserEditFieldsSortedByFieldOrder){
            if(!cgJsData[gid].forms.uploadUserEditFieldsSortedByFieldOrder.hasOwnProperty(fieldOrder)){
                break;
            }

            var fieldId = cgJsData[gid].forms.uploadUserEditFieldsSortedByFieldOrder[fieldOrder]['fieldId'];
            var Field_Type = cgJsData[gid].forms.uploadUserEditFieldsSortedByFieldOrder[fieldOrder]['Field_Type'];
            var titleForUserSingleImageView = cgJsData[gid].forms.uploadUserEditFieldsSortedByFieldOrder[fieldOrder].Field_Content.titel;
            titleForUserSingleImageView = titleForUserSingleImageView.replace(/\\/g,'');

            var $infoContent = jQuery('<div class="cg-center-image-info-div"><p>'+titleForUserSingleImageView+':</p></div>');

            if(Field_Type=='selectc-f'){
                if(categoryContentToAppear){
                    categoryContentToAppear = categoryContentToAppear.replace(/\\/g,'');
                    $infoContent.append('<p class="cg-center-image-info-div-content">'+categoryContentToAppear+'</p>');
                }else{
                    $infoContent.append('<p class="cg-center-image-info-div-content">...</p>');
                }
            }else{
                if(cgJsData[gid].vars.info[realId]){
                    if(cgJsData[gid].vars.info[realId][fieldId]){
                        if(cgJsData[gid].vars.info[realId][fieldId]['field-content']){
                            var contentToAppear = cgJsData[gid].vars.info[realId][fieldId]['field-content'];
                            contentToAppear = contentToAppear.replace(/\\/g,'');
                            $infoContent.append('<p class="cg-center-image-info-div-content">'+contentToAppear+'</p>');
                        }else{
                            $infoContent.append('<p class="cg-center-image-info-div-content">...</p>');
                        }
                    }else{
                        $infoContent.append('<p class="cg-center-image-info-div-content">...</p>');
                    }
                }else{
                    $infoContent.append('<p class="cg-center-image-info-div-content">...</p>');
                }
            }



            $cgCenterDiv.find('#cgCenterImageInfoDiv'+gidForElements).append($infoContent);
            $cgCenterDiv.find('#cgCenterImageInfoDiv'+gidForElements).removeClass('cg_hide');
        }
    }

    if(thereIsImageInfo==true){
        cgJsClass.gallery.views.checkIfTopBottomArrowsRequired(gid,gidForElements);
    }else{
        if(cgJsData[gid].vars.isUserGallery){
            cgJsClass.gallery.views.checkIfTopBottomArrowsRequired(gid,gidForElements);// height and appearence of show more have to be calculated also
        }
    }

    //  jQuery('#cgCenterDiv'+gid).height('auto');

    if($cgCenterDiv.find('#cgCenterImageInfoDiv'+gidForElements).find('.cg-center-image-info-div').length){
        $cgCenterDiv.find('#cgCenterImageInfoDivParent'+gidForElements).removeClass('cgCenterImageNoInfo');
        $cgCenterDiv.find('#cgCenterImageCommentsDivParent'+gidForElements).removeClass('cgCenterImageNoInfo');
    }else{
        $cgCenterDiv.find('#cgCenterImageInfoDivParent'+gidForElements).addClass('cgCenterImageNoInfo');
        $cgCenterDiv.find('#cgCenterImageCommentsDivParent'+gidForElements).addClass('cgCenterImageNoInfo');
    }

};
cgJsClass.gallery.views.checkIfTopBottomArrowsRequired = function (gid,gidForElements,isMakeInstant) {

    var timeout = 300;

    if(isMakeInstant){
        timeout = 0;
    }

    var $cgCenterDiv = cgJsData[gid].vars.mainCGdiv.find('#cgCenterDiv'+gidForElements);

    // falls diese funktion angwendet dann werden komments definitiv angzeigt und der separator kann auch angezeigt werden
    $cgCenterDiv.find('.cg-center-image-info-info-separator').removeClass('cg_hide');

    setTimeout(function () {

        var collectedHeight = 0;

        var paddingTop = parseInt($cgCenterDiv.find('#cgCenterImageInfoDiv'+gidForElements).css('paddingTop'));
        var paddingBottom = parseInt($cgCenterDiv.find('#cgCenterImageInfoDiv'+gidForElements).css('paddingBottom'));

      //  console.log('start');

        $cgCenterDiv.find('.cg-center-image-info-div').each(function () {
            // outerHeight(true) means include everything padding border margin
            collectedHeight = collectedHeight + jQuery(this).outerHeight(true);
    //        console.log(collectedHeight);
        });

      //  var heightCheck = $cgCenterDiv.find('.cg-center-image-info-div-parent').height();

        collectedHeight = collectedHeight + paddingTop+paddingBottom;
       // console.log(collectedHeight);

      /*  var noSlideOut = false;

        if(cgJsData[gid].options.general.FullSizeImageOutGallery==1 || cgJsData[gid].options.general.OnlyGalleryView==1){
            noSlideOut = true;
        }*/

        // 300 because max-height 300 currently
        if(collectedHeight>300){ // 300 because of max-height:300px of .mainCGdiv .mainCGallery .cgCenterDiv .cg-center-image-info-div-container
            $cgCenterDiv.find('.cg-center-image-comments-div-show-more-info').removeClass('cg_hide');
            $cgCenterDiv.find('.cg-center-image-info-div-container').addClass('cg-center-image-comments-div-show-more-available');
            if(!$cgCenterDiv.find('.cg-center-image-info-div-parent').hasClass('cg_edit')){
                $cgCenterDiv.find('.cg-center-image-info-save-icon-text-container').addClass('cg_hide');
            }
        }else{
            if(isMakeInstant){// otherwise would already done in init-single-view
                $cgCenterDiv.find('.cg-center-image-comments-div-show-more-info').addClass('cg_hide');
                $cgCenterDiv.find('.cg-center-image-info-div-container').removeClass('cg-center-image-comments-div-show-more-available');
            }
        }

    },timeout)

};