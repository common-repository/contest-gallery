cgJsClass.gallery.info.setWatermarkGalleryView = function (realId, gid) {

    var isAlternativeFileType = cgJsClass.gallery.function.general.tools.isAlternativeFileType(gid,realId);

    if(isAlternativeFileType || cgJsData[gid].vars.rawData[realId].ImgType=='con'){
        return;
    }

    var infoData = cgJsData[gid].vars.info[realId];

    // place watermark position
    // go through infoData first
    for(var uploadFieldId in infoData){

        if(!infoData.hasOwnProperty(uploadFieldId)){
            break;
        }

        if (cgJsData[gid].options.visual['WatermarkPosition']) {
            if(cgJsData[gid].forms.upload[uploadFieldId]){
                // might be only blog view opened before so check for imageObject is required, because might be not exists
                if(cgJsData[gid].imageObject[realId] && cgJsData[gid].forms.upload[uploadFieldId]['WatermarkPosition']){
                    // if exists before, can be generally removed before for sure
                    cgJsData[gid].imageObject[realId].find('.cg_watermark').remove();
                    if(infoData[uploadFieldId]['field-content']){
                        var content = infoData[uploadFieldId]['field-content'].replace(/\\/g,'');
                        var watermarkClass = 'cg_watermark-'+cgJsData[gid].options.visual['WatermarkPosition'];
                        cgJsData[gid].imageObject[realId].find('.cg_figure').append('<div class="cg_watermark '+watermarkClass+'">' + content + '</div>');
                    }
                }
            }
        }
    }
    // then go through upload form
    for(var uploadFieldId in cgJsData[gid].forms.upload){

        if(!cgJsData[gid].forms.upload.hasOwnProperty(uploadFieldId)){
            break;
        }

        if (cgJsData[gid].options.visual['WatermarkPosition']) {
            if(cgJsData[gid].forms.upload[uploadFieldId]){
                if(cgJsData[gid].forms.upload[uploadFieldId]['WatermarkPosition']){
                    // if exists before, can be generally removed before for sure
                    // might be only blog view opened before so check for imageObject is required, because might be not exists
                    if(cgJsData[gid].imageObject[realId] && cgJsData[gid].forms.upload[uploadFieldId]['Field_Type'] == 'selectc-f'){
                        cgJsData[gid].imageObject[realId].find('.cg_watermark').remove();
                        var Category = cgJsData[gid].vars.rawData[realId]['Category'];
                        if(Category>0){
                            var content = cgJsData[gid].vars.categories[Category].Name;
                        }else{
                            var content = cgJsClass.gallery.language[gid].Other;
                        }
                        content = content.replace(/\\/g,'');
                        content = jQuery('<textarea />').html(content).text();
                        var watermarkClass = 'cg_watermark-'+cgJsData[gid].options.visual['WatermarkPosition'];
                        cgJsData[gid].imageObject[realId].find('.cg_figure').append('<div class="cg_watermark '+watermarkClass+'">' + content + '</div>');
                    }
                }
            }
        }

    }
    // place watermark position --- END
}
cgJsClass.gallery.info.setInfoGalleryView = function (realId, gid, isJustChangeTextAfterEdit,$imageObject,heightFromImageObjectSetInViewLoad,widthFromImageObjectSetInViewLoad) {


    if (typeof cgJsData[gid].infoGalleryViewAppended[realId] == 'undefined' && typeof cgJsData[gid].imageObject[realId] != 'undefined') {
        var i = 0;
        var titleVariant = {};
        if(cgJsData[gid].options.visual['Field1IdGalleryView']){i++;titleVariant[i]='main';}
        if(cgJsData[gid].options.visual['SubTitle']){i++;titleVariant[i]='sub';}
        if(cgJsData[gid].options.visual['ThirdTitle']){i++;titleVariant[i]='third';}

        var infoData = cgJsData[gid].vars.info[realId];

        var hideTillHover = '';

        if (cgJsData[gid].options.general.ShowAlways != 1) {
            hideTillHover = 'cg_hide_till_hover';
        }

        var position = 'class="cg_gallery_info_content"';

        if (cgJsData[gid].options.visual['TitlePositionGallery'] == 2) {
            position = 'class="cg_gallery_info_content cg_center"';
        }

        if (cgJsData[gid].options.visual['TitlePositionGallery'] == 3) {
            position = 'class="cg_gallery_info_content cg_right"';
        }

        $imageObject.find('.cg_gallery_info_title').remove();// remove first if already exists, might be from edit user info in user gallery

        var $infoTitleDiv = jQuery('<div data-cg-id="' + realId + '" data-cg-gid="' + gid + '" class="cg_gallery_info_title cg_gallery_info_main_title ' + hideTillHover + '"></div>');

/*        var $infoContentMain = undefined;
        var $infoContentSub = undefined;
        var $infoContentThird = undefined;*/
        if(i==1){
            var $infoContent = jQuery('<div class="cg_gallery_info_content"></div>');
            if(titleVariant[1]=='main'){$infoContent.addClass('cg_gallery_info_content_main');}
            if(titleVariant[1]=='sub'){$infoContent.addClass('cg_gallery_info_content_sub');}
            if(titleVariant[1]=='third'){$infoContent.addClass('cg_gallery_info_content_third');}
            $infoTitleDiv.append($infoContent);
            $imageObject.find('.cg_gallery_info').prepend($infoTitleDiv);
        }
        if(i==2){
            $infoContent = jQuery('<div class="cg_gallery_info_content"></div>');
            if(titleVariant[1]=='main'){$infoContent.addClass('cg_gallery_info_content_main');}
            if(titleVariant[1]=='sub'){$infoContent.addClass('cg_gallery_info_content_sub');}
            if(titleVariant[1]=='third'){$infoContent.addClass('cg_gallery_info_content_third');}
            $infoTitleDiv.append($infoContent);
            var $infoContent = jQuery('<div class="cg_gallery_info_content"></div>');
            if(titleVariant[2]=='sub'){
                if(titleVariant[1]=='main'){
                    $infoTitleDiv.prepend($infoContent);
                    $infoContent.addClass('cg_gallery_info_content_sub');
                }else{
                    $infoTitleDiv.append($infoContent);
                }
            }
            if(titleVariant[2]=='third'){
                $infoTitleDiv.append($infoContent);
                $infoContent.addClass('cg_gallery_info_content_third');
            }
            $imageObject.find('.cg_gallery_info').prepend($infoTitleDiv);
        }
        if(i==3){
            $infoContent = jQuery('<div class="cg_gallery_info_content"></div>');
            if(titleVariant[1]=='main'){$infoContent.addClass('cg_gallery_info_content_main');}
            $infoTitleDiv.append($infoContent);
            var $infoContent = jQuery('<div class="cg_gallery_info_content"></div>');
            if(titleVariant[2]=='sub'){// if i =3 second have to be sub
                $infoTitleDiv.prepend($infoContent);
                $infoContent.addClass('cg_gallery_info_content_sub');
            }
            var $infoContent = jQuery('<div class="cg_gallery_info_content"></div>');
            if(titleVariant[3]=='third'){//if i =3 third have to be third
                $infoTitleDiv.append($infoContent);
                $infoContent.addClass('cg_gallery_info_content_third');
            }
            $imageObject.find('.cg_gallery_info').prepend($infoTitleDiv);
        }

         // set here
        cgJsClass.gallery.info.setCategoryGalleryDiv(gid,realId,cgJsData[gid].options.visual['Field1IdGalleryView'],hideTillHover,isJustChangeTextAfterEdit,position,$imageObject,heightFromImageObjectSetInViewLoad,widthFromImageObjectSetInViewLoad,'cg_gallery_info_content_main');
        cgJsClass.gallery.info.setCategoryGalleryDiv(gid,realId,cgJsData[gid].options.visual['SubTitle'],hideTillHover,isJustChangeTextAfterEdit,position,$imageObject,heightFromImageObjectSetInViewLoad,widthFromImageObjectSetInViewLoad,'cg_gallery_info_content_sub');
        cgJsClass.gallery.info.setCategoryGalleryDiv(gid,realId,cgJsData[gid].options.visual['ThirdTitle'],hideTillHover,isJustChangeTextAfterEdit,position,$imageObject,heightFromImageObjectSetInViewLoad,widthFromImageObjectSetInViewLoad,'cg_gallery_info_content_third');

        // set here
        cgJsClass.gallery.info.setInfoGalleryDiv(infoData,cgJsData[gid].options.visual['Field1IdGalleryView'],gid,realId,hideTillHover,isJustChangeTextAfterEdit,$imageObject,heightFromImageObjectSetInViewLoad,widthFromImageObjectSetInViewLoad,'cg_gallery_info_content_main');
        cgJsClass.gallery.info.setInfoGalleryDiv(infoData,cgJsData[gid].options.visual['SubTitle'],gid,realId,hideTillHover,isJustChangeTextAfterEdit,$imageObject,heightFromImageObjectSetInViewLoad,widthFromImageObjectSetInViewLoad,'cg_gallery_info_content_sub');
        cgJsClass.gallery.info.setInfoGalleryDiv(infoData,cgJsData[gid].options.visual['ThirdTitle'],gid,realId,hideTillHover,isJustChangeTextAfterEdit,$imageObject,heightFromImageObjectSetInViewLoad,widthFromImageObjectSetInViewLoad,'cg_gallery_info_content_third');
    }


};
cgJsClass.gallery.info.setCategoryGalleryDiv = function (gid,realId,inputId,hideTillHover,isJustChangeTextAfterEdit,position,$imageObject,heightFromImageObjectSetInViewLoad,widthFromImageObjectSetInViewLoad,infoContentClassName){
    if (inputId == cgJsData[gid].vars.categoriesUploadFormId) {

        var infoTitleDiv = cgJsData[gid].imageObject[realId].find('.cg_gallery_info_title');

        var categoryId = cgJsData[gid].vars.rawData[realId]['Category'];

        if (categoryId > 0 &&  cgJsData[gid].vars.categories[categoryId]) {
            var content = cgJsData[gid].vars.categories[categoryId].Name;
        } else {
            var content = cgJsClass.gallery.language[gid].Other;
        }

        content = content.replace(/\\/g,'');
        content = jQuery('<textarea />').html(content).text();

        if(isJustChangeTextAfterEdit){
            if(cgJsData[gid].imageObject[realId]){
                if(cgJsData[gid].imageObject[realId].find('.cg_gallery_info_content.'+infoContentClassName).length){
                    cgJsData[gid].imageObject[realId].find('.cg_gallery_info_content.'+infoContentClassName).empty().text(content);
                }else{
                    cgJsData[gid].imageObject[realId].find('.cg_gallery_info_content.'+infoContentClassName+' .cg_gallery_info_title').removeClass('cg_gallery_info_title_no_title').prepend('<div ' + position + '>'+content+'</div>');
                }
            }
            return;
        }else{
            if(!cgJsData[gid].imageObject[realId].find('.cg_gallery_info_content.'+infoContentClassName).length){
                infoTitleDiv.removeClass('cg_gallery_info_title_no_title').prepend('<div ' + position + '>' + content + '</div>');
            }else{
                infoTitleDiv.removeClass('cg_gallery_info_title_no_title').find('.cg_gallery_info_content.'+infoContentClassName).text(content);
            }
        }

        if(cgJsData[gid].vars.isUserGallery){
            infoTitleDiv.addClass('cg_is_user_gallery');
        }

        var cgShowObject = cgJsData[gid].imageObject[realId];

        if(cgJsData[gid].vars.modernHover){
            cgJsClass.gallery.function.general.tools.setHeightForInfoBlockInGallery(gid,infoTitleDiv,$imageObject,heightFromImageObjectSetInViewLoad,widthFromImageObjectSetInViewLoad,true,realId);
            //cgShowObject.find('.cg_gallery_info').prepend(infoTitleDiv);
        }else{
            cgShowObject.find('figure').append(infoTitleDiv);
        }

        cgJsData[gid].infoGalleryViewAppended[realId] = true;

        return;
    }

}
cgJsClass.gallery.info.setInfoGalleryDiv = function (infoData,inputFieldId,gid,realId,hideTillHover,isJustChangeTextAfterEdit,$imageObject,heightFromImageObjectSetInViewLoad,widthFromImageObjectSetInViewLoad,infoContentClassName){

/*    if(realId==352){
        debugger
    }*/

    if (infoData) {
        if (infoData[inputFieldId] && infoData[inputFieldId]['field-content']) {

            var infoTitleDiv = cgJsData[gid].imageObject[realId].find('.cg_gallery_info_title');

            infoTitleDiv.removeClass('cg_gallery_info_title_no_title');

            var content = infoData[inputFieldId]['field-content'].replace(/\\/g,'');
            //       content = content.replaceAll('&zwj;','');

            content = jQuery('<textarea />').html(content).text();

            var position = 'class="cg_gallery_info_content '+infoContentClassName+' "';

            if (cgJsData[gid].options.visual['TitlePositionGallery'] == 2) {
                position = 'class="cg_gallery_info_content cg_center"';
            }

            if (cgJsData[gid].options.visual['TitlePositionGallery'] == 3) {
                position = 'class="cg_gallery_info_content cg_right"';
            }

            if(isJustChangeTextAfterEdit){
                if(cgJsData[gid].imageObject[realId]){
                    if(infoData[inputFieldId]['field-type'] == 'url-f'){
                        cgJsData[gid].imageObject[realId].find('.cg_gallery_info_href').attr('href',content);
                    }else{
                        if(cgJsData[gid].imageObject[realId].find('.cg_gallery_info_content.'+infoContentClassName).length){
                            cgJsData[gid].imageObject[realId].find('.cg_gallery_info_content.'+infoContentClassName).empty().text(content);
                        }else{
                            cgJsData[gid].imageObject[realId].find('.cg_gallery_info_title').removeClass('cg_gallery_info_title_no_title').find('.cg_gallery_info_content.'+infoContentClassName).text(content);
                        }
                    }
                }
                return;
            }

            if (infoData[inputFieldId]['field-content'] != '') {
                if(infoData[inputFieldId]['field-type'] == 'url-f'){

                    if(infoData[inputFieldId]['field-content'].indexOf('http')==-1){
                        infoData[inputFieldId]['field-content'] = 'http://'+infoData[inputFieldId]['field-content'].trim();
                    }
                    infoTitleDiv.removeClass('cg_gallery_info_title_no_title').find('.cg_gallery_info_content.'+infoContentClassName).wrap('<div ' + position + '><a class="cg_gallery_info_href" href="' + infoData[inputFieldId]['field-content'] + '" target="_href">' + infoData[inputFieldId]['field-title'].trim() + '</a></div>');

                }else{
                    infoTitleDiv.removeClass('cg_gallery_info_title_no_title').find('.cg_gallery_info_content.'+infoContentClassName).text(content);
                }
            }else{// set empty div for right look espcially user gallery where images can be deleted
                if(!cgJsData[gid].vars.isUserGallery){
                    infoTitleDiv.removeClass('cg_gallery_info_title_no_title').find('.cg_gallery_info_content.'+infoContentClassName).text('');
                    infoTitleDiv.css({
                        'height':0,
                        'padding':0
                    });
                }
                if(cgJsData[gid].vars.isUserGallery){
                    infoTitleDiv.removeClass('cg_gallery_info_title_no_title').find('.cg_gallery_info_content.'+infoContentClassName).text('');
                }
                cgJsClass.gallery.info.setBackgroundNoneIfRequired(gid,realId);
            }

            if(cgJsData[gid].vars.isUserGallery){
                infoTitleDiv.addClass('cg_is_user_gallery');
            }

            var cgShowObject = cgJsData[gid].imageObject[realId];

            //cgJsClass.gallery.function.general.tools.setHeightForInfoBlockInGallery(gid,infoTitleDiv,$imageObject,heightFromImageObjectSetInViewLoad);

            if(cgJsData[gid].vars.modernHover){
                cgJsClass.gallery.function.general.tools.setHeightForInfoBlockInGallery(gid,infoTitleDiv,$imageObject,heightFromImageObjectSetInViewLoad,widthFromImageObjectSetInViewLoad,true,realId);
                //cgShowObject.find('.cg_gallery_info').prepend(infoTitleDiv);
            }else{
                cgShowObject.find('figure').append(infoTitleDiv);
            }
            cgJsData[gid].infoGalleryViewAppended[realId] = true;

            return;

        } else{
            cgJsClass.gallery.function.general.tools.checkIfSmallWidthImageObject(gid,$imageObject,null,heightFromImageObjectSetInViewLoad,widthFromImageObjectSetInViewLoad);
        }
    }else{
        cgJsClass.gallery.function.general.tools.checkIfSmallWidthImageObject(gid,$imageObject,null,heightFromImageObjectSetInViewLoad,widthFromImageObjectSetInViewLoad)
    }

}
cgJsClass.gallery.info.setBackgroundNoneIfRequired = function (gid,realId){
    // then no background for info can be set
    if ((cgJsData[gid].options.general.AllowComments == 0 && cgJsData[gid].options.general.AllowRating == 0 && cgJsData[gid].options.general.FbLikeGallery == 0) && cgJsData[gid].vars.modernHover) {
        if (cgJsData[gid].imageObject[realId]) {
           cgJsData[gid].imageObject[realId].find('.cg_gallery_info').addClass('cg_background_none');
        }
    }
}