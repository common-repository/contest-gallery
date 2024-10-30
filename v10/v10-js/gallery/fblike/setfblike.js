cgJsClass.gallery.fbLike.setFbLike = function (realId,arrIndex,objectKey,gid,calledFromUpload) {

    if(cgJsData[gid].vars.isOnlyGalleryNoVoting && !cgJsData[gid].vars.RatingVisibleForGalleryNoVoting){
        return;
    }

    var sliderView = false;

    if(cgJsData[gid].vars.currentLook=='slider'){
        sliderView = true;
    }

    var isAlternativeFileType = cgJsClass.gallery.function.general.tools.isAlternativeFileType(gid,realId);

    if(cgJsData[gid].options.general.FbLike>=1 && cgJsData[gid].options.general.FbLikeGallery>=1 && cgJsData[gid].vars.currentLook!='blog' &&  !isAlternativeFileType){

        var $cgFacebookDiv = cgJsClass.gallery.fbLike.createFbLike(realId,gid);

        if((cgJsData[gid].vars.openedRealId == realId  && cgJsData[gid].options.general.FullSizeImageOutGallery!=1 && cgJsData[gid].options.general.OnlyGalleryView!=1 && !calledFromUpload) || (sliderView==true && !calledFromUpload)){
            $cgFacebookDiv.addClass('cg_hide');
        }

        cgJsData[gid].imageObject[realId].find('.cg_gallery_info').append($cgFacebookDiv);

    }

};
cgJsClass.gallery.fbLike.createFbLike= function (realId,gid) {

    var timestamp = cgJsData[gid].vars.rawData[realId]['Timestamp'];
    var namePic = cgJsData[gid].vars.rawData[realId]['NamePic'];
    var uploadFolderUrl = cgJsData[gid].vars.uploadFolderUrl;
    var nameFbLikePageUrl = timestamp+'_'+namePic+'413.html';
    var fbLikePageUrl = uploadFolderUrl+"/contest-gallery/gallery-id-"+cgJsData[gid].vars.gidReal +"/"+nameFbLikePageUrl+'?'+new Date().getTime();

    var $fbContent = jQuery("<div id='cgFacebookGalleryDiv"+realId+"' class='cg_gallery_facebook_div' data-cg-gid='"+gid+"' >"+
        "<iframe src='"+fbLikePageUrl+"'  scrolling='no'"+
        "class='cg_fb_like_iframe_slider_order' id='cg_fb_like_iframe_slider"+realId+"'  name='cg_fb_like_iframe_slider"+realId+"'></iframe>"+
        "</div>");

    if(cgJsData[gid].vars.isUserGallery){
        $fbContent.find('iframe').addClass('cg_pointer_events_none');
    }

    return $fbContent;

};