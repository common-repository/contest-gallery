cgJsClass.gallery.function.general.tools = {
    htmlEntities: function(str) {
        return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    },
    setHeightForInfoBlockInGallery: function(gid,$infoTitleDiv,$imageObject,heightFromImageObjectSetInViewLoad,widthFromImageObjectSetInViewLoad,isPrependInfoTitleDiv,realId){

        if(cgJsData[gid].options.general.FbLike==1 && cgJsData[gid].options.general.FbLikeGallery==1 && $imageObject){
            $imageObject.find('.cg_gallery_info').removeClass('cg_justify_content_flex_start');// do this here generally at the beginning
        }

        if($infoTitleDiv && $imageObject){
            $infoTitleDiv.removeClass('cg_overflow_y_scroll').removeAttr('style');// do this here generally at the beginning, remove attr style with height also here
        }

/*
        if($imageObject.attr('data-cg-id')==228){
            debugger
        }
*/

        if($imageObject && widthFromImageObjectSetInViewLoad && !$infoTitleDiv){
            cgJsClass.gallery.function.general.tools.checkIfSmallWidthImageObject(gid,$imageObject,null,heightFromImageObjectSetInViewLoad,widthFromImageObjectSetInViewLoad);
        }else{


            if(heightFromImageObjectSetInViewLoad && $infoTitleDiv && cgJsData[gid].vars.modernHover && $imageObject){
                if(cgJsData[gid].vars.currentLook=='slider' && $infoTitleDiv.length){

                    if(cgJsData[gid].vars.rawData[realId].ImgType=='con'){
                        if(!$imageObject.find('.cg_gallery_info_title').length){
                            $imageObject.find('.cg_gallery_info').prepend($infoTitleDiv);
                        }
                    }else{
                        $infoTitleDiv.addClass('cg_hide');
                        $imageObject.find('.cg_gallery_info').removeClass('cg_justify_content_flex_start');
                    }
                }else{

                    if($infoTitleDiv.length && true){

                        // cg_small_width_xs cg_small_width_xss or has to be removed or added here before real calculation
                        cgJsClass.gallery.function.general.tools.checkIfSmallWidthImageObject(gid,$imageObject,null,heightFromImageObjectSetInViewLoad,widthFromImageObjectSetInViewLoad);

                        var $cg_gallery_info = $imageObject.find('.cg_gallery_info');

                        $cg_gallery_info.addClass('cg_visibility_hidden');

                       if (cgJsData[gid].options.general.ShowAlways != 1) {
                            $cg_gallery_info.removeClass('cg_hide_till_hover');
                        }

                        $infoTitleDiv.removeAttr('style').removeClass('cg_hide cg_hide_till_hover');// cg_hide might be added as switched to slider view, cg_hide_till_hover is added when info should be only displayed on hover

                        if(isPrependInfoTitleDiv){
                            $cg_gallery_info.prepend($infoTitleDiv);
                        }

                        var heightCheck = 0;
                        var heightCheckWithoutInfoTitleDiv = 0;

                        if(cgJsData[gid].vars.isUserGallery){
                            heightCheck = 35; // then can be started with 55 because of delete option at the top
                            heightCheckWithoutInfoTitleDiv = 35; // then can be started with 55 because of delete option at the top
                        }

                        if(cgJsData[gid].options.general.AllowRating==2 || cgJsData[gid].options.general.AllowComments>=1){
                            var $cg_gallery_info_rating_comments = $imageObject.find('.cg_gallery_info_rating_comments');
                            if($cg_gallery_info_rating_comments.length){
                                heightCheck = heightCheck+$cg_gallery_info_rating_comments.outerHeight() + parseInt($cg_gallery_info_rating_comments.css('marginBottom'));
                                heightCheckWithoutInfoTitleDiv = heightCheck;
                            }
                        }

                        if(cgJsData[gid].options.general.AllowRatingDynamic){
                            var $cg_gallery_rating_div = $imageObject.find('.cg_gallery_rating_div');
                            if($cg_gallery_rating_div.length){
                                heightCheck = heightCheck + $cg_gallery_rating_div.outerHeight() + parseInt($cg_gallery_rating_div.css('marginBottom'));
                                heightCheckWithoutInfoTitleDiv = heightCheck;
                            }
                        }

                        if(cgJsData[gid].options.general.FbLike==1 && cgJsData[gid].options.general.FbLikeGallery==1){
                            var $cg_gallery_facebook_div = $imageObject.find('.cg_gallery_facebook_div');
                            if($cg_gallery_facebook_div.length){
                                heightCheck = heightCheck+$cg_gallery_facebook_div.outerHeight() + 5;// is distance bottom
                                heightCheckWithoutInfoTitleDiv = heightCheck;
                            }
                        }

                        // outerHeight might be not calculated correctly in this case, this why max-height is set further bottom
                        heightCheck = heightCheck+ $infoTitleDiv.outerHeight() + parseInt($infoTitleDiv.css('marginBottom'));

                        var heightFromImageObjectSetInViewLoad = $imageObject.height();

                        if(heightCheck  > heightFromImageObjectSetInViewLoad){

                            if(cgJsData[gid].options.general.AllowRatingDynamic && (cgJsData[gid].options.general.FbLike==1 && cgJsData[gid].options.general.FbLikeGallery==1)){
                                $infoTitleDiv.height(heightFromImageObjectSetInViewLoad - heightCheckWithoutInfoTitleDiv-15); // - 15 for right appearence
                            }else if(cgJsData[gid].options.general.AllowRatingDynamic){
                                $infoTitleDiv.height(heightFromImageObjectSetInViewLoad - heightCheckWithoutInfoTitleDiv-10 ); // - 10 for right appearence
                            }else{
                                //if((cgJsData[gid].options.general.FbLike==1 && cgJsData[gid].options.general.FbLikeGallery==1) && (heightFromImageObjectSetInViewLoad-heightCheckWithoutInfoTitleDiv) < 30){
                                if((cgJsData[gid].options.general.FbLike==1 && cgJsData[gid].options.general.FbLikeGallery==1)){
                                    //  (heightFromImageObjectSetInViewLoad-heightCheckWithoutInfoTitleDiv) < 30 then text might be pretty far at bottom and overlap facebook button
                                    $infoTitleDiv.height(heightFromImageObjectSetInViewLoad - heightCheckWithoutInfoTitleDiv-15); // - 15 for right appearence
                                }else{
                                    $infoTitleDiv.height(heightFromImageObjectSetInViewLoad - heightCheckWithoutInfoTitleDiv-10); // for right appearence
                                }
                            }

                            // set max height always additionally to go sure
                            $infoTitleDiv.css('max-height',heightFromImageObjectSetInViewLoad-heightCheckWithoutInfoTitleDiv-15+'px');

                            $infoTitleDiv.addClass('cg_overflow_y_scroll');

                            if(cgJsData[gid].options.general.FbLike==1 && cgJsData[gid].options.general.FbLikeGallery==1){// simply flex start from top in this case
                                $cg_gallery_info.addClass('cg_justify_content_flex_start');
                            }

                        }else{// set max height to go sure, because outerHeight might be not calculated correctly
                            $infoTitleDiv.css('max-height',heightFromImageObjectSetInViewLoad-heightCheckWithoutInfoTitleDiv-15+'px');
                        }

                        if($imageObject){
                            if($imageObject.attr('data-cg-id') == '12593'){
                                // debugger
                            }
                        }

                        if (cgJsData[gid].options.general.ShowAlways != 1) {
                            $cg_gallery_info.addClass('cg_hide_till_hover');
                        }

                        $cg_gallery_info.removeClass('cg_visibility_hidden');

                    }
                }
            }
        }

    },
    checkIfSmallWidthImageObject: function (gid,$imageObject,$cg_gallery_rating_div,heightFromImageObjectSetInViewLoad,widthFromImageObjectSetInViewLoad,isFromHover){
        // not executable, since 15.0.0 removed
        return;
/*
        if($imageObject){
            if($imageObject.attr('data-cg-id') == '61'){
                debugger
            }
            if($imageObject.attr('data-cg-id') == '61' && !cgJsData[gid].vars.isUserGallery){
                debugger
            }
        }
*/

        if($imageObject ){

            if(cgJsData[gid].vars.modernHover){
                if(cgJsData[gid].vars.currentLook=='row'){
                    if(cgJsData[gid].options.general.AllowRatingDynamic){
                        if(cgJsData[gid].vars.mainCGdiv.width()<=400 && cgJsData[gid].options.general.PicsInRow == 2){
                            $imageObject.addClass('cg_small_width_xs').removeClass('cg_small_width_xss');
                        }else if(cgJsData[gid].vars.mainCGdiv.width()<=500 && cgJsData[gid].options.general.PicsInRow > 2){
                            $imageObject.addClass('cg_small_width_xss').removeClass('cg_small_width_xs');
                        }else{
                            $imageObject.removeClass('cg_small_width_xs cg_small_width_xss');
                        }
                    }
                }
            }
        }

    },
    correctNewAddedOptionsIfRequired: function(options){

        if(options.visual['ImageViewFullWindow']===undefined || options.visual['ImageViewFullWindow']===''){
            options.visual['ImageViewFullWindow'] = 1;// this was normal behaviour in old versions
        }

        if(options.visual['ImageViewFullScreen']===undefined || options.visual['ImageViewFullScreen']===''){
            options.visual['ImageViewFullScreen'] = 1;// this was normal behaviour in old versions
        }

        if(options.visual['SliderThumbNav']===undefined || options.visual['SliderThumbNav']===''){
            options.visual['SliderThumbNav'] = 1;// this was normal behaviour in old versions
        }

    },
    resetGallery: function(gid){

        // reset search and reset categories here!!!
        cgJsData[gid].vars.mainCGdiv.find('#cgSearchInput'+gid).val('');
        cgJsData[gid].vars.searchInput = '';

        if(cgJsData[gid].vars.showCategories){
            for(var categoryId in cgJsData[gid].vars.categories){
                if(!cgJsData[gid].vars.categories.hasOwnProperty(categoryId)){
                    break;
                }
                cgJsData[gid].vars.categories[categoryId]['Checked'] = true;
            }
            if(cgJsData[gid].options.pro.CatWidget==1){
                if(cgJsData[gid].options.pro.ShowCatsUnchecked==1){
                    cgJsData[gid].vars.mainCGdiv.find('#cgCatSelectArea'+gid+' .cg_select_cat_label').removeClass('cg_cat_checkbox_checked').addClass('cg_cat_checkbox_unchecked');
                }else{
                    cgJsData[gid].vars.mainCGdiv.find('#cgCatSelectArea'+gid+' .cg_select_cat_label').removeClass('cg_cat_checkbox_unchecked').addClass('cg_cat_checkbox_checked');
                }
            }
        }

        if(cgJsData[gid].vars.currentLook=='blog'){
            if(cgJsData[gid].vars.$cg_further_images_container_top){
                cgJsData[gid].vars.$cg_further_images_container_top.addClass('cg_hide');
            }
            if(cgJsData[gid].vars.$cg_further_images_container_bottom){
                cgJsData[gid].vars.$cg_further_images_container_bottom.addClass('cg_hide');
            }
            //cgJsData[gid].vars.cgLdsDualRingMainCGdivHide.addClass('cg_margin_top_0').removeClass('cg_hide');
            //cgJsData[gid].vars.cgLdsDualRingMainCGdivHide.addClass('cg_hide');
            cgJsClass.gallery.function.general.tools.hideSkeletonLoader(gid);

            cgJsClass.gallery.views.scrollUp(gid);
            cgJsClass.gallery.blogLogic.reset(gid);
        }

    },
    setWaitingForValues: function(gid,$element,action,isWaitForInfoData){

        if((!cgJsClass.gallery.vars.isSortingDataAvailable && !cgJsClass.gallery.views.clickFurtherImagesStep.waitingInterval)
            ||
            (isWaitForInfoData && !cgJsClass.gallery.vars.isInfoDataAvailable && !cgJsClass.gallery.views.clickFurtherImagesStep.waitingInterval)
        ){

            var $mainCGdiv = jQuery('#mainCGdiv'+gid);
            var $mainCGslider = jQuery('#mainCGslider'+gid);
            $mainCGdiv.find('#mainCGallery'+gid).find('.cg_show').remove();
         //   $mainCGdiv.find('#cgLdsDualRingMainCGdivHide'+gid).removeClass('cg_hide');
          //  $mainCGslider.find('#cgLdsDualRingMainCGdivHide'+gid).removeClass('cg_hide');
            cgJsClass.gallery.function.general.tools.checkSkeletonLoaderToShow(gid);

            cgJsClass.gallery.views.clickFurtherImagesStep.waitingInterval = setInterval(function() {

                if(action=='click'){
                    $element.click();
                }
                if(action=='change'){
                    $element.trigger('change');
                }
            },500);

            return true;
        }

        if((cgJsClass.gallery.vars.isSortingDataAvailable && cgJsClass.gallery.views.clickFurtherImagesStep.waitingInterval)
            || (isWaitForInfoData && cgJsClass.gallery.vars.isInfoDataAvailable && cgJsClass.gallery.views.clickFurtherImagesStep.waitingInterval)){
            clearInterval(cgJsClass.gallery.views.clickFurtherImagesStep.waitingInterval);
            cgJsClass.gallery.views.clickFurtherImagesStep.waitingInterval = null;
            var $mainCGdiv = jQuery('#mainCGdiv'+gid);
            var $mainCGslider = jQuery('#mainCGslider'+gid);
       //     $mainCGdiv.find('#cgLdsDualRingMainCGdivHide'+gid).removeClass('cg_hide');
       //     $mainCGslider.find('#cgLdsDualRingMainCGdivHide'+gid).removeClass('cg_hide');
            cgJsClass.gallery.function.general.tools.checkSkeletonLoaderToShow(gid);
            return false;
        }else if((!cgJsClass.gallery.vars.isSortingDataAvailable) || (isWaitForInfoData && !cgJsClass.gallery.vars.isInfoDataAvailable)){
            return true;
        }

        return false;

    },
    modifyFullImageData: function(gid,realId,data){
/*        console.trace();
        debugger*/
        // do not forget it because of modifiying data!
        // id is not available in data!
        data['id'] = realId;

        for(var index in cgJsData[gid].fullImageData){

            if(!cgJsData[gid].fullImageData.hasOwnProperty(index)){
                break;
            }

            var firstKey = Object.keys(cgJsData[gid].fullImageData[index])[0];
            var realIdToCompare = cgJsData[gid].fullImageData[index][firstKey]['id'];

            if(realId == realIdToCompare){
                cgJsData[gid].fullImageData[index][firstKey] = data;
                break;
            }

        }

        for(var index in cgJsData[gid].fullImageDataFiltered){

            if(!cgJsData[gid].fullImageDataFiltered.hasOwnProperty(index)){
                break;
            }

            var firstKey = Object.keys(cgJsData[gid].fullImageDataFiltered[index])[0];
            var realIdToCompare = cgJsData[gid].fullImageDataFiltered[index][firstKey]['id'];

            if(realId == realIdToCompare){
                cgJsData[gid].fullImageDataFiltered[index][firstKey] = data;
                break;
            }

        }

    },
    isFullSizeSlideOutStartNormally: function (gid) {

        if(cgJsData[gid].options.general.FullSizeSlideOutStart==1
            &&
         (cgJsData[gid].vars.currentLook=='thumb' || cgJsData[gid].vars.currentLook=='height' || cgJsData[gid].vars.currentLook=='row')
        ) {
            return true;
        } else{
            return false;
        }

    },
    checkSsl: function (imgUrl) {
        if(typeof imgUrl == 'undefined'){
            imgUrl = '';
        }
        if(cgJsClass.gallery.vars.isSsl){
            if(imgUrl.indexOf('http://')===0){
                imgUrl = imgUrl.replace("http://", "https://");
                return imgUrl;
            }else{
                return imgUrl;
            }
        }else{
            if(imgUrl.indexOf('https://')===0){
                imgUrl = imgUrl.replace("https://", "http://");
                return imgUrl;
            }else{
                return imgUrl;
            }
        }
    },
    checkIfIsEdge: function () {

        // checks if edge

        var ua = window.navigator.userAgent;

/*        var msie = ua.indexOf('MSIE ');

        if (msie > 0) {
            // IE 10 or older => return version number
            cgJsClass.gallery.vars.isEdge = true;
        }

        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number
            var rv = ua.indexOf('rv:');
            cgJsClass.gallery.vars.isEdge = true;
        }*/

        if (ua.indexOf('Edge/') > 0 || ua.indexOf('Edg/')) {
            cgJsClass.gallery.vars.isEdge = true;
        }

    },
    checkIfInternetExplorer: function () {

        cgJsClass.gallery.vars.isInternetExplorer = false;

        // checks if edge or ie !

        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");

        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))  // If Internet Explorer, return version number
        {
            cgJsClass.gallery.vars.isInternetExplorer = true;
        }

    },
    checkIfIsChrome: function () {

        // please note,
        // that IE11 now returns undefined again for window.chrome
        // and new Opera 30 outputs true for window.chrome
        // but needs to check if window.opr is not undefined
        // and new IE Edge outputs to true now for window.chrome
        // and if not iOS Chrome check
        // so use the below updated condition
        var isChromium = window.chrome;
        var winNav = window.navigator;
        var vendorName = winNav.vendor;
        var isOpera = typeof window.opr !== "undefined";
        var isIEedge = winNav.userAgent.indexOf("Edge") > -1;
        var isIOSChrome = winNav.userAgent.match("CriOS");

        if (isIOSChrome) {
            // is Google Chrome on IOS
        } else if(
            isChromium !== null &&
            typeof isChromium !== "undefined" &&
            vendorName === "Google Inc." &&
            isOpera === false &&
            isIEedge === false
        ) {
            cgJsClass.gallery.vars.isChrome = true;// is Google Chrome
        } else {
            cgJsClass.gallery.vars.isChrome = false;// not Google Chrome
        }

    },
    checkIfIsSafari: function () {

        var ua = navigator.userAgent.toLowerCase();
        if (ua.indexOf('safari') != -1) {
            if (ua.indexOf('chrome') > -1) {
                cgJsClass.gallery.vars.isSafari = false;// Chrome
            } else {
                cgJsClass.gallery.vars.isSafari = true; // Safari
            }
        }

    },
    checkIfIsFF: function () {

        cgJsClass.gallery.vars.isFF = false;

        if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
            cgJsClass.gallery.vars.isFF = true;
        }

    },
    checkError: function ($cgCenterDiv,gid,realId) {

        cgJsData[gid].vars.jsonGetImageCheck.push(jQuery.getJSON( cgJsData[gid].vars.uploadFolderUrl+"/contest-gallery/gallery-id-"+cgJsData[gid].vars.gidReal+"/json/image-data/image-data-"+realId+".json", {_: new Date().getTime()}).done(function( data ) {

        }).done(function(data){

             // has to be set here, because was not set in php. Also image Object has to be reset on some places.
            data.id = realId;
            data.imageObject = cgJsData[gid].imageObject[realId];


        }).fail(function (error) {

            if(error.status=='404'){
                cgJsClass.gallery.function.general.tools.removeImageWhenError(gid,realId);
            }

        }));


    },
    checkErrorAbort: function (gid) {

        for(var key in cgJsData[gid].vars.jsonGetImageCheck){

            if(!cgJsData[gid].vars.jsonGetImageCheck.hasOwnProperty(key)){
                break;
            }

            cgJsData[gid].vars.jsonGetImageCheck[key].abort();
        }
        cgJsData[gid].vars.jsonGetImageCheck = [];


    },
    removeImageWhenError: function (gid,realId) {

        cgJsClass.gallery.getJson.removeImageFromImageData(gid,realId);
        cgJsClass.gallery.function.message.show(cgJsClass.gallery.language[gid].ImageDeleted);

    },
    checkSetUserGalleryOptions: function (gid) {

        // since 15.0.0 HideUntilVote and ShowOnlyUsersVotes works also for user gallery
        if(cgJsData[gid].vars.isUserGallery){
            //cgJsData[gid].options.general.HideUntilVote = 0;
            //cgJsData[gid].options.general.ShowOnlyUsersVotes = 0;
        }

    },
    checkIfSettingsRequiredInFullWindow: function (gid) {

        if((cgJsData[gid].options.pro.CatWidget==1  ||
            cgJsData[gid].options.pro.Search==1 ||
            cgJsData[gid].options.general.RandomSortButton==1 ||
            cgJsData[gid].options.general.AllowSort==1)==false &&
            cgJsData[gid].options.general.PicsPerSite < Object.keys(cgJsData[gid].vars.rawData).length
        ){
            cgJsData[gid].vars.mainCGdiv.find('#cgCenterImageFullWindowConfiguration'+gid).remove();
            cgJsData[gid].vars.mainCGdiv.find('#cgCenterDivCenterImageFullWindowConfiguration'+gid).remove();
        }


    },
    bgColorOptimization: function (bgColor){

        if(bgColor.indexOf(',')){
            var parts = bgColor.split(',');
            if(parts.length>3){
                var opacityValue = parts[parts.length-1].split(')')[0].trim();
                if(opacityValue.indexOf('0')!=-1){// must have opacity lower 1. So is transparent.
                    var newBgColor = '';
                    parts.forEach(function (value,index) {

                        if(index==parts.length-1){
                            newBgColor+='1)';
                        }else{
                            newBgColor+=value+',';
                        }
                    });
                    bgColor= newBgColor;
                }
            }
        }

        return bgColor;

    },
    setBackgroundColor: function(gid){

        if(!cgJsClass.gallery.vars.backgroundColor){
            var $mainCGdivContainer = jQuery('#mainCGdivContainer'+gid);
            cgJsClass.gallery.function.general.tools.getBackgroundColor($mainCGdivContainer);
        }

        if(cgJsClass.gallery.vars.backgroundColor){
            if(cgJsClass.gallery.vars.backgroundColor.indexOf(',')){
                cgJsClass.gallery.vars.backgroundColor = this.bgColorOptimization(cgJsClass.gallery.vars.backgroundColor);
            }
         //   jQuery('#mainCGdivHelperParent'+gid).css('background-color',cgJsClass.gallery.vars.backgroundColor);
        //    jQuery('#mainCGdivFullWindowConfigurationArea'+gid).css('background-color',cgJsClass.gallery.vars.backgroundColor);// reinserted again in >= 12.1.1
        }

        if(cgJsClass.gallery.vars.backgroundColorUploadForm){
            if(cgJsClass.gallery.vars.backgroundColorUploadForm.indexOf(',')){
                cgJsClass.gallery.vars.backgroundColorUploadForm = this.bgColorOptimization(cgJsClass.gallery.vars.backgroundColorUploadForm);
            }
          //  jQuery('#mainCGdivUploadForm'+gid).css('background-color',cgJsClass.gallery.vars.backgroundColorUploadForm);
        }

    },
    getBackgroundColor: function($mainCGdivContainer,$parent){

        if(!$parent){
            $parent = $mainCGdivContainer.parent();
        }else{
            $parent = $parent.parent();
        }

        var backgroundColor = $parent.css('backgroundColor');
        //var backgroundColorUploadForm = $parent.css('backgroundColor');
        var tagName = $parent.prop('tagName').toLowerCase();

        if((backgroundColor=='rgba(0, 0, 0, 0)' || backgroundColor=='transparent') && tagName!='html'){//if not set transparent is in IE
            this.getBackgroundColor(undefined,$parent);
        }else{
            if($parent.is('html')){
                backgroundColor = 'white';// set white as general color if no color found
            }
            cgJsClass.gallery.vars.backgroundColor = backgroundColor;
            cgJsClass.gallery.vars.backgroundColorUploadForm = backgroundColor;
        }

    },
    testTopControlsStyle: function($){

        $(document).on('click','.cg_gallery_thumbs_control .cg_switch_colors',function (e) {
            var $element = $(this);
            var gid = $element.attr('data-cg-gid');

            var $mainCGdivHelperParent = $('#mainCGdivHelperParent'+gid);

            var isWhiteNow = 0;
            var isBlackNow = 0;

            if($mainCGdivHelperParent.hasClass('cg_fe_controls_style_white')){
                $element.attr('data-cg-tooltip', cgJsClass.gallery.language[gid].BrightStyle);
                isBlackNow = 1;
                cgJsData[gid].vars.mainCGdiv.removeClass('cg_fe_controls_style_white');
                $('.mainCGdivUploadFormAjax#mainCGdivUploadForm'+gid).find('.cg_fe_controls_style_white').addClass('cg_fe_controls_style_black').removeClass('cg_fe_controls_style_white');
                $mainCGdivHelperParent.addClass('cg_fe_controls_style_black').removeClass('cg_fe_controls_style_white');
                $mainCGdivHelperParent.find('.cg_fe_controls_style_white').addClass('cg_fe_controls_style_black').removeClass('cg_fe_controls_style_white');
                $('#cgMessagesContainer').addClass('cg_fe_controls_style_black').removeClass('cg_fe_controls_style_white');
                $('#cgMessagesContainerPro').addClass('cg_fe_controls_style_black').removeClass('cg_fe_controls_style_white');
                cgJsClass.gallery.function.general.tools.tooltip.addClass('cg_fe_controls_style_black').removeClass('cg_fe_controls_style_white');
            }else{
                isWhiteNow = 1;
                $element.attr('data-cg-tooltip', cgJsClass.gallery.language[gid].DarkStyle);
                cgJsData[gid].vars.mainCGdiv.addClass('cg_fe_controls_style_white');
                $('.mainCGdivUploadFormAjax#mainCGdivUploadForm'+gid).find('.cg_fe_controls_style_black').addClass('cg_fe_controls_style_white').removeClass('cg_fe_controls_style_black');
                $mainCGdivHelperParent.addClass('cg_fe_controls_style_white').removeClass('cg_fe_controls_style_black');
                $mainCGdivHelperParent.find('.cg_fe_controls_style_black').addClass('cg_fe_controls_style_white').removeClass('cg_fe_controls_style_black');
                $('#cgMessagesContainer').addClass('cg_fe_controls_style_white').removeClass('cg_fe_controls_style_black');
                $('#cgMessagesContainerPro').addClass('cg_fe_controls_style_white').removeClass('cg_fe_controls_style_black');
                cgJsClass.gallery.function.general.tools.tooltip.addClass('cg_fe_controls_style_white').removeClass('cg_fe_controls_style_black');
            }

            // correction: since 19.1.0 always 0
            cgJsData[gid].options.visual['SwitchStyleGalleryButtonOnlyTopControls'] = 0;

            if(cgJsData[gid].options.visual['SwitchStyleGalleryButtonOnlyTopControls']!=1){
                if(isWhiteNow){
                    cgJsData[gid].vars.centerWhite = 1;
                    cgJsData[gid].vars.mainCGallery.addClass('cg_center_white');
                    cgJsData[gid].vars.mainCGallery.find('.cgCenterDiv').addClass('cg_center_white').removeClass('cg_center_black');
                    cgJsData[gid].vars.mainCGallery.find('.cg_switch_colors').attr('data-cg-tooltip', cgJsClass.gallery.language[gid].DarkStyle);

                }
                if(isBlackNow){
                    cgJsData[gid].vars.centerWhite = 0;
                    cgJsData[gid].vars.mainCGallery.removeClass('cg_center_white');
                    cgJsData[gid].vars.mainCGallery.find('.cgCenterDiv').removeClass('cg_center_white').addClass('cg_center_black');
                    cgJsData[gid].vars.mainCGallery.find('.cg_switch_colors').attr('data-cg-tooltip', cgJsClass.gallery.language[gid].BrightStyle);
                }

            }

            // not really required to execute! Hang if user move mouse fast!!!
            //    setTimeout(function (){
                //cgJsClass.gallery.function.general.tools.tooltipMouseenterFunction($element,e);
        //    },100);// because of clickevent on data cg tooltip will remove mouseenter process instantly, this why timeout

        });

        $(document).on('click','.mainCGdivHelperParent .cg_header .cg_sort_div  .cg_switch_colors',function (e) {
            var $element = $(this);
            var gid = $element.attr('data-cg-gid');

            var isWhiteNow = 0;
            var isBlackNow = 0;

            if(cgJsData[gid].vars.centerWhite == 1){
                isBlackNow = 1;
                cgJsData[gid].vars.centerWhite = 0;
                cgJsData[gid].vars.mainCGallery.removeClass('cg_center_white');
                cgJsData[gid].vars.mainCGallery.find('.cgCenterDiv').removeClass('cg_center_white').addClass('cg_center_black');
                cgJsData[gid].vars.mainCGallery.find('.cg_switch_colors').attr('data-cg-tooltip', cgJsClass.gallery.language[gid].BrightStyle);
            }else{
                isWhiteNow = 1;
                cgJsData[gid].vars.centerWhite = 1;
                cgJsData[gid].vars.mainCGallery.addClass('cg_center_white');
                cgJsData[gid].vars.mainCGallery.find('.cgCenterDiv').addClass('cg_center_white').removeClass('cg_center_black');
                cgJsData[gid].vars.mainCGallery.find('.cg_switch_colors').attr('data-cg-tooltip', cgJsClass.gallery.language[gid].DarkStyle);
            }

            if(cgJsData[gid].options.visual['SwitchStyleImageViewButtonOnlyImageView']!=1){
                var $mainCGdivHelperParent = $('#mainCGdivHelperParent'+gid);
                if(isBlackNow){
                    cgJsData[gid].vars.mainCGdiv.removeClass('cg_fe_controls_style_white');
                    $('.mainCGdivUploadFormAjax#mainCGdivUploadForm'+gid).find('.cg_fe_controls_style_white').addClass('cg_fe_controls_style_black').removeClass('cg_fe_controls_style_white');
                    $mainCGdivHelperParent.addClass('cg_fe_controls_style_black').removeClass('cg_fe_controls_style_white');
                    $mainCGdivHelperParent.find('.cg_fe_controls_style_white').addClass('cg_fe_controls_style_black').removeClass('cg_fe_controls_style_white');
                    $('#cgMessagesContainer').addClass('cg_fe_controls_style_black').removeClass('cg_fe_controls_style_white');
                    $('#cgMessagesContainerPro').addClass('cg_fe_controls_style_black').removeClass('cg_fe_controls_style_white');
                    cgJsClass.gallery.function.general.tools.tooltip.addClass('cg_fe_controls_style_black').removeClass('cg_fe_controls_style_white');
                    cgJsData[gid].vars.mainCGdiv.find('.cg_gallery_thumbs_control .cg_switch_colors').attr('data-cg-tooltip',cgJsClass.gallery.language[gid].BrightStyle);
                }
                if(isWhiteNow){
                    cgJsData[gid].vars.mainCGdiv.addClass('cg_fe_controls_style_white');
                    $('.mainCGdivUploadFormAjax#mainCGdivUploadForm'+gid).find('.cg_fe_controls_style_black').addClass('cg_fe_controls_style_white').removeClass('cg_fe_controls_style_black');
                    $mainCGdivHelperParent.addClass('cg_fe_controls_style_white').removeClass('cg_fe_controls_style_black');
                    $mainCGdivHelperParent.find('.cg_fe_controls_style_black').addClass('cg_fe_controls_style_white').removeClass('cg_fe_controls_style_black');
                    $('#cgMessagesContainer').addClass('cg_fe_controls_style_white').removeClass('cg_fe_controls_style_black');
                    $('#cgMessagesContainerPro').addClass('cg_fe_controls_style_white').removeClass('cg_fe_controls_style_black');
                    cgJsClass.gallery.function.general.tools.tooltip.addClass('cg_fe_controls_style_white').removeClass('cg_fe_controls_style_black');
                    cgJsData[gid].vars.mainCGdiv.find('.cg_gallery_thumbs_control .cg_switch_colors').attr('data-cg-tooltip',cgJsClass.gallery.language[gid].DarkStyle);
                }
            }

            // not really required to execute! Hang if user move mouse fast!!!
        //    setTimeout(function (){
//                cgJsClass.gallery.function.general.tools.tooltipMouseenterFunction($element,e);
        //    },100);// because of clickevent on data cg tooltip will remove mouseenter process instantly, this why timeout

        });

        //cgJsClass.gallery.function.general.ajax.changesRecognized($);


    },
    getScrollbarWidthDependsOnBrowser: function () {

        if(cgJsClass.gallery.vars.isMobile){
            return 0;
        }

        if(cgJsClass.gallery.vars.isChrome){
            return 13;
        }else if(cgJsClass.gallery.vars.isSafari){
            return 16;
        }else if(cgJsClass.gallery.vars.isFF){
            return 17;
        }else if(cgJsClass.gallery.vars.isEdge){
            return 16;
        }else{
            return 16;
        }

    },
    getValueForPreselectSort: function (valueForPreselectSort) {

        if(valueForPreselectSort=='custom'){
            return 'custom';
        }

        if(valueForPreselectSort=='date-desc'){
            return 'date_descend';
        }
        if(valueForPreselectSort=='date-asc'){
            return 'date_ascend';
        }

        if(valueForPreselectSort=='comments-desc'){
            return 'comments_descend';
        }
        if(valueForPreselectSort=='comments-asc'){
            return 'comments_ascend';
        }

        if(valueForPreselectSort=='rating-desc'){
            return 'rating_descend';
        }
        if(valueForPreselectSort=='rating-asc'){
            return 'rating_ascend';
        }

        if(valueForPreselectSort=='rating-desc-sum'){
            return 'rating_sum_descend';
        }
        if(valueForPreselectSort=='rating-asc-sum'){
            return 'rating_sum_ascend';
        }

        return 'custom';

    },
    checkHasNoBottomSpace: function (gid,data) {

        var hasNoFieldContent = true;

        for(var property in data){

            if(!data.hasOwnProperty(property)){
                break;
            }

            if(data[property]['field-content']){
                hasNoFieldContent = false;
                break;
            }

        }
        if (hasNoFieldContent && cgJsData[gid].options.general.FbLike!=1 && cgJsData[gid].options.general.AllowComments!=1) {
            return true;
        }else{
            return false;
        }

    },
    getOrderByGidAndRealId: function (gid,realId) {

        var order = 0;

        for(var index in cgJsData[gid].image){

            if(!cgJsData[gid].image.hasOwnProperty(index)){
                break;
            }

            var firstKey = Object.keys(cgJsData[gid].image[index])[0];

            var id = cgJsData[gid].image[index][firstKey]['id'];

            if(id==realId){
                order = index;
                break;
            }

        }

        return order;

    },
    calculateSize: function (imagePath,fallbackSize,data,type,realId,gid) {

        try{

            var splitImagePath = imagePath.split('x');
            var splitWidthPart = splitImagePath[splitImagePath.length-2].split('-');
            var width = splitWidthPart[splitWidthPart.length-1];

            if(isNaN(width)){
                width = fallbackSize;
            }else{
                width = parseInt(width);
            }

        }catch(e){// happens only for small uploaded images
            //debugger;
            //console.log(data);
            //console.log(imagePath);
            width = fallbackSize;

            try{// to go sure, it is in try and catch
                jQuery("<img/>",{
                    load : function(){
                        //console.log(this.width+' '+this.height);
                        if(cgJsData[gid].vars.rawData[realId]){
                            cgJsData[gid].vars.rawData[realId][type] = this.width;
                        }
                    },
                    src  : imagePath
                });
            }catch(e){
                //debugger;
                console.log(e);
            }

        }

        return width;

    },
    checkAndSetCustomIconsStyle: function ($,data,gid){
        if(data.icons){
            var $style = $("<style>").prop("type", "text/css");
            var hasStyleToAppend = false;

            var cgCenterDivIconBackgroundColor = '';

            if(!cgJsData[gid].vars.centerWhite){// 02.02.2022 - seems not to be required
                //cgCenterDivIconBackgroundColor = 'background-color: #222;';
            }

            if(data.icons.iconVoteUndoneGalleryViewBase64){
                hasStyleToAppend = true;
                $style.append("#mainCGallery" + gid + " .cg_show .cg_gallery_rating_div_one_star_off{background: url(\"" + data.icons.iconVoteUndoneGalleryViewBase64 + "\") no-repeat center;background-size:contain;}");
            }
            if(data.icons.iconVoteDoneGalleryViewBase64){
                hasStyleToAppend = true;
                $style.append("#mainCGallery" + gid + " .cg_show .cg_gallery_rating_div_one_star_on{background: url(\"" + data.icons.iconVoteDoneGalleryViewBase64 + "\") no-repeat center;background-size:contain;}");
            }
            if(data.icons.iconVoteHalfStarGalleryViewBase64){
                hasStyleToAppend = true;
                $style.append("#mainCGallery" + gid + " .cg_show .cg_gallery_rating_div_one_star_half_off{background: url(\"" + data.icons.iconVoteHalfStarGalleryViewBase64 + "\") no-repeat center;background-size:contain;}");
            }
            if(data.icons.iconVoteUndoneImageViewBase64){
                hasStyleToAppend = true;
                $style.append("#mainCGallery" + gid + " .cgCenterDiv .cg_gallery_rating_div_one_star_off{background: url(\"" + data.icons.iconVoteUndoneImageViewBase64 + "\") no-repeat center;background-size:24px 24px;"+cgCenterDivIconBackgroundColor+"}");
                $style.append("#cgMessagesContainerPro[data-cg-gid='" + gid + "'] .cg_gallery_rating_div .cg_gallery_rating_div_total_count .cg_gallery_rating_div_one_star_off{background: url(\"" + data.icons.iconVoteUndoneImageViewBase64 + "\") no-repeat center;background-size:24px 24px;}");
            }
            if(data.icons.iconVoteDoneImageViewBase64){
                hasStyleToAppend = true;
                $style.append("#mainCGallery" + gid + " .cgCenterDiv .cg_gallery_rating_div_one_star_on{background: url(\"" + data.icons.iconVoteDoneImageViewBase64 + "\") no-repeat center;background-size:contain;"+cgCenterDivIconBackgroundColor+"}");
                $style.append("#cgMessagesContainerPro[data-cg-gid='" + gid + "'] .cg_messages_container_pro_select_container .cg_messages_container_pro_select_star{background: url(\"" + data.icons.iconVoteDoneImageViewBase64 + "\") no-repeat center;background-size: 24px 24px;}");
                $style.append("#cgMessagesContainerPro[data-cg-gid='" + gid + "'] .cg_gallery_rating_div .cg_gallery_rating_div_total_count .cg_gallery_rating_div_one_star_on{background: url(\"" + data.icons.iconVoteDoneImageViewBase64 + "\") no-repeat center;background-size:24px 24px;}");
            }
            if(data.icons.iconVoteHalfStarImageViewBase64){
                hasStyleToAppend = true;
                $style.append("#mainCGallery" + gid + " .cgCenterDiv .cg_gallery_rating_div_one_star_half_off{background: url(\"" + data.icons.iconVoteHalfStarImageViewBase64 + "\") no-repeat center;background-size:contain;"+cgCenterDivIconBackgroundColor+"}");
            }
            if(data.icons.iconVoteFiveStarsPercentageOverviewDoneImageViewBase64){
                hasStyleToAppend = true;
                $style.append("#mainCGallery" + gid + " .cg_gallery_rating_div .cg_gallery_rating_div_five_star_details .cg_five_star_details_row .cg_five_star_details_row_star,#cgMessagesContainerPro[data-cg-gid='" + gid + "'] .cg_gallery_rating_div .cg_gallery_rating_div_five_star_details .cg_five_star_details_row .cg_five_star_details_row_star{background: url(\"" + data.icons.iconVoteFiveStarsPercentageOverviewDoneImageViewBase64 + "\") no-repeat center;background-size:contain;}");
            }
            if(data.icons.iconVoteRemoveImageViewBase64){
                hasStyleToAppend = true;
                $style.append("#mainCGallery" + gid + " .cgCenterDiv .cg_gallery_rating_div .cg_rate_minus{background: url(\"" + data.icons.iconVoteRemoveImageViewBase64 + "\") no-repeat center;background-size:contain;"+cgCenterDivIconBackgroundColor+"}");
            }
            if(data.icons.iconVoteRemoveGalleryOnlyViewBase64){
                hasStyleToAppend = true;
                $style.append("#mainCGallery" + gid + ".cg_only_gallery_view .cg_gallery_rating_div  .cg_rate_minus{background: url(\"" + data.icons.iconVoteRemoveGalleryOnlyViewBase64 + "\") no-repeat center;background-size:contain;}");
            }
            if(data.icons.iconCommentUndoneGalleryViewBase64){
                hasStyleToAppend = true;
                $style.append("#mainCGallery" + gid + " .cg_show .cg_gallery_comments_div .cg_gallery_comments_div_icon_off{background: url(\"" + data.icons.iconCommentUndoneGalleryViewBase64 + "\") no-repeat center;background-size:contain;}");
            }
            if(data.icons.iconCommentDoneGalleryViewBase64){
                hasStyleToAppend = true;
                $style.append("#mainCGallery" + gid + " .cg_show .cg_gallery_comments_div .cg_gallery_comments_div_icon_on{background: url(\"" + data.icons.iconCommentDoneGalleryViewBase64 + "\") no-repeat center;background-size:contain;}");
            }
            if(data.icons.iconCommentUndoneImageViewBase64){
                hasStyleToAppend = true;
                $style.append("#mainCGallery" + gid + " .cgCenterDiv .cg_gallery_comments_div .cg_gallery_comments_div_icon_off{background: url(\"" + data.icons.iconCommentUndoneImageViewBase64 + "\") no-repeat center;background-size:contain;"+cgCenterDivIconBackgroundColor+"}");
            }
            if(data.icons.iconCommentDoneImageViewBase64){
                hasStyleToAppend = true;
                $style.append("#mainCGallery" + gid + " .cgCenterDiv .cg_gallery_comments_div .cg_gallery_comments_div_icon_on{background: url(\"" + data.icons.iconCommentDoneImageViewBase64 + "\") no-repeat center;background-size:contain;"+cgCenterDivIconBackgroundColor+"}");
            }
            if(data.icons.iconCommentAddImageViewBase64){
                hasStyleToAppend = true;
                $style.append("#mainCGallery" + gid + " .cgCenterDiv .cg-center-image-comments-div-add-comment{background: url(\"" + data.icons.iconCommentAddImageViewBase64 + "\") no-repeat center;background-size:contain;"+cgCenterDivIconBackgroundColor+"}");
            }
            if(data.icons.iconInfoImageViewBase64){
                hasStyleToAppend = true;
                $style.append("#mainCGallery" + gid + " .cgCenterDiv .cg-center-info-div .cg-center-image-info-div-title .cg-center-image-info-icon{background-image: url(\"" + data.icons.iconInfoImageViewBase64 + "\");background-repeat: no-repeat;background-position: center;background-size:contain;"+cgCenterDivIconBackgroundColor+"}");
            }
            if(hasStyleToAppend){
                $style.appendTo("head");
            }
        }
    },
    backdropShow: function ($mainCGdivUploadForm,isFullWindowOrFullScreenAndForUploadFormBackdrop){

        var $cgModalBackdrop = jQuery('<div id="cgModalBackdrop" class="cgModalBackdrop"></div>');

        cgJsClass.gallery.function.general.tools.backdropHide();

        if (cgJsClass.gallery.vars.fullscreen) {
            cgJsData[cgJsClass.gallery.vars.fullscreen].vars.mainCGdiv.prepend($cgModalBackdrop);
        } else if (cgJsClass.gallery.vars.fullwindow) {
            cgJsData[cgJsClass.gallery.vars.fullwindow].vars.mainCGdiv.prepend($cgModalBackdrop);
        } else {
            cgJsClass.gallery.vars.dom.body.prepend($cgModalBackdrop);
        }

        setTimeout(function (){
            $cgModalBackdrop.addClass('cg_modal_backdrop_fade_in');
        },1);

    },
    backdropHide: function (){

        jQuery('.cgModalBackdrop').remove();

    },
    checkIfNoRating: function (gid){

        if(cgJsData[gid].options.general.RatingOutGallery != '1' || cgJsData[gid].options.general.AllowRating == 0 || (cgJsData[gid].vars.isOnlyGalleryNoVoting && !cgJsData[gid].vars.RatingVisibleForGalleryNoVoting)){
            return true;
        }else{
            return false;
        }

    },
    replaceStateOnCloseOrMinimize: function (locationHash){

        if(!locationHash){locationHash='';}

        history.replaceState("", document.title, location.pathname + location.search + locationHash);
        //cgJsClass.gallery.vars.isHashAlreadyCreatedOneTimeForThisPage = false;

    },
    getHeightTillElement: function ($object,classNameToBreak,idNameToBreak,classNamesToAvoidArray){

        var height = 0;

        $object.find('div:visible').each(function (){
            var $element = jQuery(this);

           // console.log($element.attr('id'));
          //  console.log($element.attr('class'));
      //      console.log($element.outerHeight());

            var isAvoidClass = false;

            if(classNamesToAvoidArray){
                classNamesToAvoidArray.forEach(function (className){
                    if($element.hasClass(className)){
                    //    debugger
                        isAvoidClass = true;
                    }
                });
            }

            if(isAvoidClass){
             //   debugger
                return; // then continue and not count height of this element, might be a parent wrapper
            }

          if($element.hasClass(classNameToBreak)){
                height = height - $element.outerHeight();
                return false;
            }

            height = height + $element.outerHeight();

        });

        return height;

    },
    tooltip: null,
    initTooltip: function($) {

        var div = $('<div id="cgTooltip" class="cg_hide"></div>');
        cgJsClass.gallery.vars.dom.body.append(div);

        cgJsClass.gallery.function.general.tools.tooltip = div;

        $(document).on('mouseenter', '.mainCGdivHelperParent [data-cg-tooltip],.mainCGdivUploadForm [data-cg-tooltip]' ,function (e) {
            if(cgJsClass.gallery.vars.isMobile){
                return;
            }
            cgJsClass.gallery.function.general.tools.tooltipMouseenterFunction($(this),e);
        });

        $(document).on('mouseleave', '.mainCGdivHelperParent [data-cg-tooltip],.mainCGdivUploadForm [data-cg-tooltip]' ,function (e) {
            if(cgJsClass.gallery.vars.isMobile){
                return;
            }
            cgJsClass.gallery.function.general.tools.tooltip.addClass('cg_hide');
        });

        $(document).on('click', '.mainCGdivHelperParent [data-cg-tooltip],.mainCGdivUploadForm [data-cg-tooltip]' ,function (e) {
            if(cgJsClass.gallery.vars.isMobile){
                return;
            }
            cgJsClass.gallery.function.general.tools.tooltip.addClass('cg_hide');
        });

    },
    tooltipAddedToFullscreen: false,
    tooltipMouseenterFunction: function($element,e){

        if(cgJsClass.gallery.function.general.tools.tooltip.hasClass('cg_do_not_show_tooltip') || cgJsClass.gallery.vars.isMobile){
            return;
        }

        var $eTarget = jQuery(e.target);

/*        if(!$eTarget.attr('data-cg-tooltip') && !$eTarget.closest('[data-cg-tooltip]').length){
            return;
        }*/

        var $cg_show  = $eTarget.closest('.cg_show');
        var $mainCGslider = $eTarget.closest('.mainCGslider');
        if($cg_show.length && $mainCGslider.length){
            return;
        }

        //console.log('mouseenter');
        var $cgCenterDiv = $element.closest('.cgCenterDiv');
        if($cgCenterDiv.length){
            var gid = $cgCenterDiv.attr('data-cg-gid');
        }else{
            var $mainCGdivHelperParent = $element.closest('.mainCGdivHelperParent');
            if($mainCGdivHelperParent.length){
                var gid = $mainCGdivHelperParent.attr('data-cg-gid');
            }else{
                var $mainCGdivUploadForm = $element.closest('.mainCGdivUploadForm');
                var gid = $mainCGdivUploadForm.attr('data-cg-gid');
            }
        }

        if(cgJsClass.gallery.vars.fullscreen && e){

            if($eTarget.hasClass('mainCGdivFullWindowConfigurationArea') || $eTarget.closest('.mainCGdivFullWindowConfigurationArea').length){
                // almoust impossible to calculate right in this case
                return;
            }

            if(!$mainCGdivHelperParent){
                var $mainCGdivHelperParent = $element.closest('.mainCGdivHelperParent');
            }
            if($cgCenterDiv.length){
                $cgCenterDiv.append(cgJsClass.gallery.function.general.tools.tooltip);
            }else{
                $mainCGdivHelperParent.append(cgJsClass.gallery.function.general.tools.tooltip);
            }
            this.tooltipAddedToFullscreen = true;
        }else{
            if(this.tooltipAddedToFullscreen){
                cgJsClass.gallery.vars.dom.body.append(cgJsClass.gallery.function.general.tools.tooltip);
                this.tooltipAddedToFullscreen = false;
            }
        }

        if($eTarget.hasClass('cg_gallery_rating_div_five_stars')  || $eTarget.closest('.cg_gallery_rating_div_five_stars').length){
            if(!$eTarget.hasClass('cg_rate_minus') && !$eTarget.hasClass('cg_voted_confirm')){
               return;
            }
        }

        if($element.hasClass('cg_gallery_rating_div_star') && cgJsData[gid].vars.isUserGallery){// no vote now showing for user gallery
            return;
        }

        if($element.hasClass('cg_gallery_rating_div_star') && !$cgCenterDiv.length){
            if(cgJsData[$element.attr('data-cg-gid')].options.general.RatingOutGallery!='1'){
                return;
            }
         }

        if(cgJsData[gid].vars.isOnlyGalleryWinner){
            if($eTarget.hasClass('cg_gallery_rating_div') || $eTarget.closest('.cg_gallery_rating_div').length){
                return;
            }
        }

        if($eTarget.hasClass('cg_rate_minus_five_star')){
            var $cg_gallery_rating_div = $eTarget.closest('.cg_gallery_rating_div');
            $cg_gallery_rating_div.find('.cg_gallery_rating_div_five_star_details').addClass('cg_hide');
            $cg_gallery_rating_div.find('.cg_gallery_rating_div').removeClass('cg_opacity_1');
        }

        if($element.hasClass('cg_gallery_rating_div_star')){
            if(cgJsData[gid].vars.allVotesUsed==1){
                $element.attr('data-cg-tooltip',cgJsClass.gallery.language[gid].AllVotesUsed);
            }else{
                $element.attr('data-cg-tooltip',cgJsClass.gallery.language[gid].VoteNow);
            }
        }

        if(cgJsData[gid].options.visual.BorderRadius){
            cgJsClass.gallery.function.general.tools.tooltip.addClass('cg_border_radius_controls_and_containers');
        }else{
            cgJsClass.gallery.function.general.tools.tooltip.removeClass('cg_border_radius_controls_and_containers');
        }

        if($cgCenterDiv.length){
            if(cgJsData[gid].vars.mainCGallery.hasClass('cg_center_white')){
                cgJsClass.gallery.function.general.tools.tooltip.addClass('cg_fe_controls_style_white');
            }else{
                cgJsClass.gallery.function.general.tools.tooltip.removeClass('cg_fe_controls_style_white');
            }
        }else if($mainCGdivHelperParent.length){
            if($mainCGdivHelperParent.hasClass('cg_fe_controls_style_white')){
                cgJsClass.gallery.function.general.tools.tooltip.addClass('cg_fe_controls_style_white');
            }else{
                cgJsClass.gallery.function.general.tools.tooltip.removeClass('cg_fe_controls_style_white');
            }
         }else if($mainCGdivUploadForm.length){
            if($mainCGdivUploadForm.hasClass('cg_fe_controls_style_white')){
                cgJsClass.gallery.function.general.tools.tooltip.addClass('cg_fe_controls_style_white');
            }else{
                cgJsClass.gallery.function.general.tools.tooltip.removeClass('cg_fe_controls_style_white');
            }
         }else{
                cgJsClass.gallery.function.general.tools.tooltip.removeClass('cg_fe_controls_style_white');
          }

        var isShowFiveStarOnTop = false;

/*        if(cgJsData[gid].options.general.AllowRatingDynamic){
            if($element.hasClass('cg_gallery_rating_div_star')){
                isShowFiveStarOnTop = true;
            }
        }*/

        if(cgJsData[gid].vars.currentLook=='blog' && cgJsClass.gallery.vars.fullwindow && e){
            var $eTarget = jQuery(e.target);
            if($element.hasClass('cg_further_images_container_bottom') || $eTarget.closest('.cg_further_images_container_bottom').length){
                isShowFiveStarOnTop = true;
            }
        }

        if(cgJsClass.gallery.vars.fullscreen){
            var x = $element.offset().left;
            var y = $element.offset().top;

       //     console.log('y before');
         //   console.log(y);
            if($cgCenterDiv.length){
                y = y-$cgCenterDiv.offset().top;
            }else{
                    y = y-$mainCGdivHelperParent.offset().top;
            }
            //var x = e.clientX;
            //var y = e.clientY+10;
        }else{
            var x = $element.offset().left;
            var y = $element.offset().top;
        }

        var top;

        var elementHeight = $element.outerHeight();

        if(isShowFiveStarOnTop){
            top = y-elementHeight-5;
            if(!$cgCenterDiv.length){
                if($element.closest('.cg_small_width_xs').length || $element.closest('.cg_small_width_xss').length){
                    top = top-10;
                }
            }
        }else{
            top = y+elementHeight+13;
        }

        var elementWidth = $element.outerWidth();
        cgJsClass.gallery.function.general.tools.tooltip.text($element.attr('data-cg-tooltip')).addClass('cg_visibility_hidden').removeClass('cg_hide');
        var widthTootip = cgJsClass.gallery.function.general.tools.tooltip.outerWidth();

        if(elementWidth>widthTootip){
            var left = x+((elementWidth-widthTootip)/2);
        }else{
            var left = x-((widthTootip-elementWidth)/2);
        }

        if(left<10){
            left = 5;
        }else{

            var windowWidth = jQuery(window).width();

            if(elementWidth>widthTootip){
                // sor far no cases for it
            }else{
                if(left+elementWidth>windowWidth){
                    left = windowWidth - 10 + elementWidth;
                }
            }

        }

        cgJsClass.gallery.function.general.tools.tooltip.css( { top: top, left: left } );
        if(!cgJsClass.gallery.vars.fullscreen){
            var newTop = cgJsClass.gallery.function.general.tools.tooltip.offset().top;
            if(newTop>top && !cgJsClass.gallery.vars.fullscreen){
                top = top - (newTop - top)+3;// +3 to go sure
                cgJsClass.gallery.function.general.tools.tooltip.css( 'top', top+'px' );
            }
        }
        cgJsClass.gallery.function.general.tools.tooltip.removeClass('cg_visibility_hidden');

    },
    encodeHTML(s){
        return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
    },
    appendImageOnLoadGallery($cgShow,$cgAppend,imgSrc,realId,gid,isFromClickNextPrevFile){

/*        if(realId == 906){
            debugger
        }*/

        var isAlternativeFileType = cgJsClass.gallery.function.general.tools.isAlternativeFileType(gid,realId);

        if(isAlternativeFileType){
            return;
        }

        var img = new Image();
        img.src = imgSrc;

        if(cgJsClass.gallery.vars.alreadyLoadedImages.indexOf(imgSrc) > -1){
            $cgShow.removeClass('cg_skeleton_loader');
            $cgAppend.css('background','url("'+imgSrc+'") no-repeat center center');
        }else if(img.complete || img.width+img.height > 0){
            $cgShow.removeClass('cg_skeleton_loader');
            $cgAppend.css('background','url("'+imgSrc+'") no-repeat center center');
        }else{
            $cgShow.css('background','');
            $cgShow.addClass('cg_skeleton_loader');
            img.onload = function(){
                var timeout = cgJsClass.gallery.function.general.tools.appendImageOnLoadGallerySetTimeoutGetTimeout();
                // set timeout has to be done in extra function
                cgJsClass.gallery.function.general.tools.appendImageOnLoadGallerySetTimeout($cgShow,$cgAppend,imgSrc,realId,timeout,gid);
            };
            img.onerror = function(e){
                //console.log('on error');
                //console.log(e);
                //var timeout = cgJsClass.gallery.function.general.tools.appendImageOnLoadGallerySetTimeoutGetTimeout();
                $cgShow.removeClass('cg_skeleton_loader');
           //     cgJsClass.gallery.function.general.tools.appendImageOnLoadGallerySetTimeout($cgShow,$cgAppend,imgSrc,realId,timeout,gid);// since 18.0.0
                //$cgAppend.css('background','url("'+imgSrc+'") no-repeat center center');
            };
        }
    },
    appendImageOnLoadGallerySetTimeoutGetTimeout(){
        var start = Date.now();
        var end = Date.now();
        var timeout;
        if((end-start)/1000>=1750){
            timeout = 0;
        }else{
            timeout = 1750-(end-start)/1000;
        }
      return timeout;
    },
    appendImageOnLoadGallerySetTimeout($cgShow,$cgAppend,imgSrc,realId,timeout,gid){
        setTimeout(function (){
            $cgShow.removeClass('cg_skeleton_loader');
            //cg_append has to be found extra here
            $cgAppend.css('background','url("'+imgSrc+'") no-repeat center center');
            cgJsClass.gallery.vars.alreadyLoadedImages.push(imgSrc);
        },timeout);
    },
    appendImageOnLoadSingleView($cgCenterImage,backGroundUrl,realId,gid,isFromClickNextPrevFile){
/*        if(realId==104){

        }*/

        var isAlternativeFileType = cgJsClass.gallery.function.general.tools.isAlternativeFileType(gid,realId);

        if(isAlternativeFileType){
            return;
        }

        var img = new Image();
        img.src = backGroundUrl;
        if(isFromClickNextPrevFile && cgJsClass.gallery.vars.alreadyLoadedImages.indexOf(backGroundUrl) > -1){
            $cgCenterImage.removeClass('cg_skeleton_loader');
            $cgCenterImage.css('background','url("'+backGroundUrl+'") no-repeat center center');
        }else if(img.complete || img.width+img.height > 0){
            $cgCenterImage.removeClass('cg_skeleton_loader');
            $cgCenterImage.css('background','url("'+backGroundUrl+'") no-repeat center center');
        }else{
            $cgCenterImage.css('background','');
          //  if(!isFromClickNextPrevFile){
                $cgCenterImage.addClass('cg_skeleton_loader');
      //      }
            var start = Date.now();
            img.onload = function(){
                var end = Date.now();
                var timeout;
                if((end-start)/1000>=1750){
                    timeout = 0;
                }else{
                    timeout = 1750-(end-start)/1000;
                }
                // set timeout has to be done in extra function
                cgJsClass.gallery.function.general.tools.appendImageOnLoadSingleViewSetTimeout($cgCenterImage,backGroundUrl,realId,timeout,gid,isFromClickNextPrevFile);
            };
/*            img.onload = function(){
                $cgCenterImage.removeClass('cg_skeleton_loader');
                $cgCenterImage.css('background','url("'+backGroundUrl+'") no-repeat center center');
            };*/
            img.onerror = function(){
                $cgCenterImage.removeClass('cg_skeleton_loader');
                $cgCenterImage.css('background','url("'+backGroundUrl+'") no-repeat center center');
            };
        }
    },
    appendImageOnLoadSingleViewSetTimeout($cgCenterImage,backGroundUrl,realId,timeout,gid,isFromClickNextPrevFile){
        setTimeout(function (){
            if($cgCenterImage.hasClass('cg-center-image-alternative-file-type')  || $cgCenterImage.find('video').length){
                //debugger
                $cgCenterImage.css('background','');
                $cgCenterImage.removeClass('cg_skeleton_loader');return;
            }
            if($cgCenterImage.attr('data-cg-real-id')==realId){
                if($cgCenterImage.attr('data-cg-image-src-onload')){
                    if($cgCenterImage.attr('data-cg-image-src-onload') == backGroundUrl){
                        $cgCenterImage.removeClass('cg_skeleton_loader');
                        if(cgJsClass.gallery.vars.alreadyLoadedImages.indexOf(backGroundUrl)==-1){
                            cgJsClass.gallery.vars.alreadyLoadedImages.push(backGroundUrl);
                        }
                        $cgCenterImage.css('background','url("'+backGroundUrl+'") no-repeat center center');
                    }
                }else{
                    $cgCenterImage.removeClass('cg_skeleton_loader');
                    if(cgJsClass.gallery.vars.alreadyLoadedImages.indexOf(backGroundUrl)==-1){
                        cgJsClass.gallery.vars.alreadyLoadedImages.push(backGroundUrl);
                    }
                    $cgCenterImage.css('background','url("'+backGroundUrl+'") no-repeat center center');
                }
            }
       },timeout);
    },
    appendImageOnLoadSingleViewRotated($cgCenterImageRotated,backGroundUrl,realId,gid,isFromClickNextPrevFile){
        /*        if(realId==104){

                }*/
        var isAlternativeFileType = cgJsClass.gallery.function.general.tools.isAlternativeFileType(gid,realId);

        if(isAlternativeFileType){
            return;
        }

        var img = new Image();
        img.src = backGroundUrl;
        if(isFromClickNextPrevFile && cgJsClass.gallery.vars.alreadyLoadedImages.indexOf(backGroundUrl) > -1){
            $cgCenterImageRotated.removeClass('cg_skeleton_loader');
            $cgCenterImageRotated.css('background','url("'+backGroundUrl+'") no-repeat center center');
        }else if(img.complete  || img.width+img.height > 0){
            $cgCenterImageRotated.removeClass('cg_skeleton_loader');
            $cgCenterImageRotated.css('background','url("'+backGroundUrl+'") no-repeat center center');
        }else{
            $cgCenterImageRotated.css('background','');
            $cgCenterImageRotated.addClass('cg_skeleton_loader');
            var start = Date.now();
            img.onload = function(){
                var end = Date.now();
                var timeout;
                if((end-start)/1000>=1750){
                    timeout = 0;
                }else{
                    timeout = 1750-(end-start)/1000;
                }
                // set timeout has to be done in extra function
                cgJsClass.gallery.function.general.tools.appendImageOnLoadSingleViewRotatedSetTimeout($cgCenterImageRotated,backGroundUrl,realId,timeout,gid);
            };
            img.onerror = function(){
                $cgCenterImageRotated.removeClass('cg_skeleton_loader');
                $cgCenterImageRotated.css('background','url("'+backGroundUrl+'") no-repeat center center');
            };
        }
    },
    appendImageOnLoadSingleViewRotatedSetTimeout($cgCenterImageRotated,backGroundUrl,realId,timeout,gid){
        setTimeout(function (){
            var $cgCenterImage = $cgCenterImageRotated.closest('.cg-center-image');
            if($cgCenterImage.hasClass('cg-center-image-alternative-file-type') || $cgCenterImage.find('video').length){
                //debugger
                $cgCenterImageRotated.addClass('cg_hide');
                $cgCenterImageRotated.css('background','');
                $cgCenterImageRotated.removeClass('cg_skeleton_loader');
                return;}
            if($cgCenterImage.attr('data-cg-real-id')==realId){
                if($cgCenterImage.attr('data-cg-image-src-onload')){
                    if($cgCenterImage.attr('data-cg-image-src-onload') == backGroundUrl){
                        $cgCenterImageRotated.removeClass('cg_skeleton_loader');
                        if(cgJsClass.gallery.vars.alreadyLoadedImages.indexOf(backGroundUrl)==-1){
                            cgJsClass.gallery.vars.alreadyLoadedImages.push(backGroundUrl);
                        }
                        $cgCenterImageRotated.css('background','url("'+backGroundUrl+'") no-repeat center center');
                    }
                }else{
                    $cgCenterImageRotated.removeClass('cg_skeleton_loader');
                    if(cgJsClass.gallery.vars.alreadyLoadedImages.indexOf(backGroundUrl)==-1){
                        cgJsClass.gallery.vars.alreadyLoadedImages.push(backGroundUrl);
                    }
                    $cgCenterImageRotated.css('background','url("'+backGroundUrl+'") no-repeat center center');
                }
            }
        },timeout);
    },
    isImageType(gid,realId,selectedFile){

        var isImageType = false;

        if(selectedFile){
            var imgType = selectedFile.ImgType;
        }else{
            var imgType = cgJsData[gid].vars.rawData[realId].ImgType;
        }

        if(imgType == 'jpg' || imgType == 'jpeg' || imgType == 'png'  || imgType == 'gif'){
            isImageType = true;
        }

        return isImageType;

    },
    isAlternativeFileType(gid,realId,selectedFile){

        var isAlternativeFileType = false;

        if(selectedFile){
            var imgType = selectedFile.ImgType;
        }else{
            var imgType = cgJsData[gid].vars.rawData[realId].ImgType;
        }

        if(imgType == 'pdf' || imgType == 'zip' || imgType == 'txt'  || imgType == 'doc'  || imgType == 'docx'  || imgType == 'xls'  || imgType == 'xlsx'  || imgType == 'csv'
            || imgType == 'ppt' || imgType == 'pptx'){
            isAlternativeFileType = 'file';
        }else if(imgType == 'mp3' || imgType == 'm4a' || imgType == 'ogg' || imgType == 'wav'){
            isAlternativeFileType = 'audio';
        }else if(imgType == 'mp4' || imgType == 'mov' || imgType == 'avi' || imgType == 'webm' || imgType == 'wmv'){
            isAlternativeFileType = 'video';
        }

        return isAlternativeFileType;

    },
    setHeaderWidth(gid){
        cgJsData[gid].vars.mainCGdiv.find('.cg_header').width(
            (cgJsData[gid].vars.mainCGdiv.outerWidth(true)-parseInt(cgJsData[gid].vars.mainCGdiv.css('padding-left'))-parseInt(cgJsData[gid].vars.mainCGdiv.css('padding-right')))
        );// has to be done, because after close unfit width
    },
    checkSkeletonLoaderToShow(gid,isOnPageLoadOrCallFromUpload){
        if(gid.indexOf('-uf')>-1 || gid.indexOf('-cf')>-1){
            if(cgJsData[gid].vars.mainCGdivUploadForm.hasClass('mainCGdivShowUncollapsed')){
                cgJsData[gid].vars.mainCGdivHelperParent.find('.cg_skeleton_loader_on_page_load_div_uncollapsed').removeClass('cg_hide');
                if(isOnPageLoadOrCallFromUpload){
                    cgJsData[gid].vars.mainCGdiv.css('height',cgJsData[gid].vars.mainCGdivHelperParent.find('.cg_skeleton_loader_on_page_load_div_uncollapsed').height()+'px');
                }
            }else{
                cgJsData[gid].vars.mainCGdivHelperParent.find('.cg_skeleton_loader_on_page_load_div_form_collapsed').removeClass('cg_hide');
                if(isOnPageLoadOrCallFromUpload){
                    cgJsData[gid].vars.mainCGdiv.css('height',cgJsData[gid].vars.mainCGdivHelperParent.find('.cg_skeleton_loader_on_page_load_div_form_collapsed').height()+'px');
                }
            }
        }else{
            if(cgJsData[gid].vars.currentLook == 'height'){
                cgJsData[gid].vars.mainCGdivHelperParent.find('.cg_skeleton_loader_on_page_load_div_height_view').removeClass('cg_hide');
                if(isOnPageLoadOrCallFromUpload){
                    cgJsData[gid].vars.mainCGdiv.css('height',cgJsData[gid].vars.mainCGdivHelperParent.find('.cg_skeleton_loader_on_page_load_div_height_view').height()+'px');
                }
            }
            if(cgJsData[gid].vars.currentLook == 'thumb'){
                cgJsData[gid].vars.mainCGdivHelperParent.find('.cg_skeleton_loader_on_page_load_div_thumb_view').removeClass('cg_hide');
                if(isOnPageLoadOrCallFromUpload){
                    cgJsData[gid].vars.mainCGdiv.css('height',cgJsData[gid].vars.mainCGdivHelperParent.find('.cg_skeleton_loader_on_page_load_div_thumb_view').height()+'px');
                }
            }
            if(cgJsData[gid].vars.currentLook == 'blog' || cgJsData[gid].vars.currentLook == 'slider'){
                cgJsData[gid].vars.mainCGdivHelperParent.find('.cg_skeleton_loader_on_page_load_div_blog_and_slider_view').removeClass('cg_hide');
                if(isOnPageLoadOrCallFromUpload){
                    cgJsData[gid].vars.mainCGdiv.css('height',cgJsData[gid].vars.mainCGdivHelperParent.find('.cg_skeleton_loader_on_page_load_div_blog_and_slider_view').height()+'px');
                }
            }
        }
    },
    hideSkeletonLoader(gid,isOnPageLoadOrCallFromUpload){
        if(isOnPageLoadOrCallFromUpload){
            cgJsData[gid].vars.mainCGdiv.css('height','');
        }
        cgJsData[gid].vars.mainCGdivHelperParent.find('.cg_skeleton_loader_on_page_load_div').addClass('cg_hide');
    }
};