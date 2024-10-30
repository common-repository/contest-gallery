cgJsClass.gallery.getJson.init = function ($,$mainCGallery,i,length){

        var $gallery = $($mainCGallery[i]);

        var gid = $gallery.attr('data-cg-gid');
        var realGid = $gallery.attr('data-cg-real-gid');

        cgJsClass.gallery.vars.loadedGalleryIDs.push(gid);

        if(typeof cgJsData=='undefined'){
            return;
        }

        if(typeof cgJsData[gid]=='undefined'){
            return;
        }

        cgJsClass.gallery.upload.vars.init(gid);

        cgJsData[gid].vars.mainCGallery = $gallery;

       // if(parseFloat(cgJsData[gid].vars.versionDatabaseGallery)>=12.10){
        // set modern hover always since 14.2.0 !!!
            cgJsData[gid].vars.modernHover = true;
            cgJsData[gid].vars.mainCGallery.addClass('cg_modern_hover');
/*        }else{
            cgJsData[gid].vars.modernHover = false;
        }*/

        cgJsData[gid].vars.imageDataLengthAfterPreProcess = 0;
        cgJsData[gid].vars.realGid  = realGid;

        if(cgJsData[gid].vars.isUserGallery){
            $gallery.addClass('cg_is_user_gallery');
        }
        cgJsData[gid].vars.mainCGdiv = $gallery.closest('#mainCGdiv'+gid);
        cgJsData[gid].vars.cgNoImagesFound = cgJsData[gid].vars.mainCGdiv.find('#cgNoImagesFound'+gid);

        if(cgJsClass.gallery.vars.isMobile){
            cgJsData[gid].vars.mainCGdiv.addClass('cg_is_mobile');
        }
        cgJsData[gid].vars.cgLdsDualRingCGcenterDivLazyLoader = cgJsData[gid].vars.mainCGdiv.find('#cgLdsDualRingCGcenterDivLazyLoader'+gid);
        cgJsData[gid].vars.cgLdsDualRingMainCGdivHide = cgJsData[gid].vars.mainCGdiv.find('#cgLdsDualRingMainCGdivHide'+gid);
        cgJsData[gid].vars.cgLdsDualRingCGcenterDivHide = cgJsData[gid].vars.mainCGallery.find('#cgLdsDualRingCGcenterDivHide'+gid);
        cgJsData[gid].vars.mainCGdivContainer = $gallery.closest('#mainCGdivContainer'+gid);
        cgJsData[gid].vars.mainCGdivUploadForm = cgJsData[gid].vars.mainCGdivContainer.find('#mainCGdivUploadForm'+gid);

        if(String(gid).indexOf('-u')>=0 && String(gid).indexOf('-uf')==-1 && !cgJsClass.gallery.vars.isLoggedIn){// so no load need to be done if user gallery shortcode and user is not logged in
            cgJsData[gid].vars.mainCGdivContainer.addClass('cg_hide');
            i = i+1;
            if(typeof $mainCGallery[i] != 'undefined'){
                cgJsClass.gallery.getJson.init($,$mainCGallery,i,length);
            }
            return;
        }

        cgJsData[gid].vars.mainCGdivHelperParent = $gallery.closest('#mainCGdivHelperParent'+gid);
        cgJsData[gid].vars.cgLdsDualRingDivGalleryHide = cgJsData[gid].vars.mainCGdivHelperParent.find('#cgLdsDualRingDivGalleryHide'+gid);
        cgJsData[gid].vars.cgCenterDivAppearenceHelper = jQuery('#cgCenterDivAppearenceHelper'+gid).removeClass('cg_hide');

        cgJsData[gid].vars.cgCenterDiv = $gallery.find('#cgCenterDiv'+gid);
        cgJsData[gid].vars.cgCenterDivLoaderContainer = $gallery.find('.cgCenterDivLoaderContainer');
        cgJsData[gid].vars.cgCenterDivLoaderContainerBackdrop = $gallery.find('.cgCenterDivLoaderContainerBackdrop');

        if(cgJsData[gid].vars.isEntryOnly){
            cgJsData[gid].vars.mainCGdiv.find('.cg_header').addClass('cg_hide_override');
            cgJsData[gid].vars.mainCGdiv.find('.cg_further_images_and_top_controls_container').addClass('cg_hide_override');
        }

        cgJsData[gid].singleViewOrder = {};
        cgJsData[gid].categories = {};
        cgJsData[gid].image = {};
        cgJsData[gid].imageObject = {};
        cgJsData[gid].fbLikeContent = {};
        cgJsData[gid].cgCenterDivBlogObject = {};
        cgJsData[gid].images = {};
        cgJsData[gid].forms = {};
        cgJsData[gid].steps = {};
        cgJsData[gid].forms.upload = {};
        cgJsData[gid].rateAndCommentNumbers = {};
        cgJsData[gid].infoGalleryViewAppended = {};
        cgJsData[gid].imageCheck = {};
        cgJsData[gid].vars.rawData = {};

        cgJsData[gid].vars.startLocation = location.protocol + '//' + location.host + location.pathname+location.search;

        if(cgJsData[gid].vars.centerWhite){
            cgJsData[gid].vars.mainCGallery.addClass('cg_center_white');
        }

        if(cgJsData[gid].vars.isOnlyGalleryNoVoting && !cgJsData[gid].vars.RatingVisibleForGalleryNoVoting){
            cgJsData[gid].vars.mainCGdivHelperParent.addClass('cg_no_voting');
        }

        cgJsClass.gallery.function.general.tools.setBackgroundColor(gid);

        cgJsClass.gallery.getJson.showGalleryLoader(gid);

        // check slide options
        if(cgJsData[gid].vars.translateX=='slideDown'){
            cgJsData[gid].vars.translateX=true;// Add additional files released in v18 and available for all galleries copied or created since v17, since then always translateX for all gallery versions!
        }else{
            cgJsData[gid].vars.translateX=true;
        }

        cgJsClass.gallery.function.general.tools.checkAndSetCustomIconsStyle($,cgJsData[gid].optionsFullData,gid);

        if(gid.indexOf('-uf')>-1 || gid.indexOf('-cf')>-1){
            // after options were saved, options array will be extended for other gallery ids
            cgJsData[gid].options = (cgJsData[gid].optionsFullData[realGid]) ? cgJsData[gid].optionsFullData[realGid] : cgJsData[gid].optionsFullData;
        }else{
            // after options were saved, options array will be extended for other gallery ids
            cgJsData[gid].options = (cgJsData[gid].optionsFullData[gid]) ? cgJsData[gid].optionsFullData[gid] : cgJsData[gid].optionsFullData;
            cgJsClass.gallery.comment.setComments(gid);
        }

        cgJsClass.gallery.views.checkOrderGallery(gid);

        cgJsData[gid].vars.mainCGdiv.find('.cg_header').addClass('cg_hide');
        cgJsData[gid].vars.mainCGdiv.removeClass('cg_hide').css('display','');
        if(gid.indexOf('-uf')>-1 || gid.indexOf('-cf')>-1){
            cgJsClass.gallery.function.general.tools.checkSkeletonLoaderToShow(gid);
        }

        cgJsClass.gallery.function.general.tools.correctNewAddedOptionsIfRequired(cgJsData[gid].options);

        // NULL options in 0 umwandeln
        // correct options

        for(var property in cgJsData[gid].options.visual){

            if(!cgJsData[gid].options.visual.hasOwnProperty(property)){
                break;
            }

            if(cgJsData[gid].options.visual[property]===null || cgJsData[gid].options.visual[property].length==0){
                cgJsData[gid].options.visual[property]=0;
            }

            if(!isNaN(cgJsData[gid].options.visual[property])){
                cgJsData[gid].options.visual[property] = parseFloat(cgJsData[gid].options.visual[property]);
            }

        }

        for(var property in cgJsData[gid].options.general){

            if(!cgJsData[gid].options.general.hasOwnProperty(property)){
                break;
            }

            if(cgJsData[gid].options.general[property]===null || cgJsData[gid].options.general[property].length==0){
                cgJsData[gid].options.general[property]=0;
            }

            if(!isNaN(cgJsData[gid].options.general[property])){
                cgJsData[gid].options.general[property] = parseFloat(cgJsData[gid].options.general[property]);
            }

        }

        for(var property in cgJsData[gid].options.input){

            if(!cgJsData[gid].options.input.hasOwnProperty(property)){
                break;
            }


            if(cgJsData[gid].options.input[property]===null || cgJsData[gid].options.input[property].length==0){
                cgJsData[gid].options.input[property]=0;
            }

            if(!isNaN(cgJsData[gid].options.input[property])){
                cgJsData[gid].options.input[property] = parseFloat(cgJsData[gid].options.input[property]);
            }

        }

        for(var property in cgJsData[gid].options.pro){

            if(!cgJsData[gid].options.pro.hasOwnProperty(property)){
                break;
            }

            if(cgJsData[gid].options.pro[property]===null || cgJsData[gid].options.pro[property].length==0){
                cgJsData[gid].options.pro[property]=0;
            }

            if(!isNaN(cgJsData[gid].options.pro[property])){
                cgJsData[gid].options.pro[property] = parseFloat(cgJsData[gid].options.pro[property]);
            }

        }

        // since 19.1.4 will be set via PHP if not exists
/*            if(cgJsData[gid].options.general.CheckCookie==1){

            var cookieName = 'contest-gal1ery-'+gid+'-voting';
            var cookieValue = cgJsClass.gallery.dynamicOptions.getCookie(cookieName);

            if(!cookieValue){
                cgJsClass.gallery.dynamicOptions.setCookie(gid,cookieName,cgJsData[gid].vars.cookieVotingId);
            }

            var cookieValue = cgJsClass.gallery.dynamicOptions.getCookie(cookieName);

        }*/

        // set options related classes
        if(cgJsData[gid].options.visual.BorderRadius){
            cgJsClass.gallery.vars.cgMessagesContainer.addClass('cg_border_radius_controls_and_containers');
            cgJsClass.gallery.vars.cgMessagesContainerPro.addClass('cg_border_radius_controls_and_containers');
            cgJsData[gid].vars.mainCGdiv.addClass('cg_border_radius_controls_and_containers');
        }
        // set options related classes
        if(cgJsData[gid].options.visual.FeControlsStyle=='white'){
            cgJsData[gid].vars.mainCGdiv.addClass('cg_fe_controls_style_white');
        }

        // set FbLike if FbLikeOnlyShare only is on
        if(cgJsData[gid].vars.isFbLikeOnlyShareOn || cgJsData[gid].options.pro.FbLikeOnlyShare){
            cgJsData[gid].options.general.FbLike = 1;
        }

        // correct not PRO version
        if(!cgJsClass.gallery.vars.isProVersion){
            cgJsData[gid].options.general.ActivateBulkUpload = 0;
            //cgJsData[gid].options.visual.SubTitle = 0;
            //cgJsData[gid].options.visual.ThirdTitle = 0;
        }

        // Execution update adaptation here: modify available emoji option if still not isset after update and options were not resaved
        if(cgJsData[gid].options.visual['EnableEmojis'] === undefined){
            cgJsData[gid].options.visual['EnableEmojis'] = 1;
        }

        // has to be done as correction
        // will be also done in gallery-upload-form.php
        if( cgJsData[gid].options.pro.AdditionalFiles==1){
            cgJsData[gid].options.general.ActivateBulkUpload=0;
        }

/*            if(!cgJsData[gid].options.pro.BulkUploadType){
            cgJsData[gid].options.pro.BulkUploadType = 2;
        }

        if(!cgJsData[gid].options.pro.UploadFormAppearance){
            cgJsData[gid].options.pro.UploadFormAppearance = 1;
        }*/

        // if not set then gallery version before 16.1.0 will be used, where options were not resaved
        // in newer PRO versions are all allowed when created
        if(typeof cgJsData[gid].options.pro.AllowUploadICO == 'undefined'){
            cgJsData[gid].options.pro.AllowUploadICO = 1;
            cgJsData[gid].options.pro.AllowUploadJPG = 1;
            cgJsData[gid].options.pro.AllowUploadPNG = 1;
            cgJsData[gid].options.pro.AllowUploadGIF = 1;
        }

        if(!cgJsClass.gallery.vars.isProVersion){
            cgJsData[gid].options.pro.AllowUploadPNG = 0;
            cgJsData[gid].options.pro.AllowUploadGIF = 0;
        }

        if(typeof cgJsData[gid].options.general.ActivatePostMaxMBfile == 'undefined'){
            cgJsData[gid].options.general.ActivatePostMaxMBfile = 1;
        }

        if(typeof cgJsData[gid].options.general.PostMaxMBfile == 'undefined'){
            cgJsData[gid].options.general.PostMaxMBfile = 2;
        }

        // for testing
        //cgJsData[gid].options.general.AllowRating = 15;
        cgJsData[gid].options.general.AllowRatingDynamic = 0;
        if(cgJsData[gid].options.general.AllowRating>=12 && cgJsData[gid].options.general.AllowRating <=20){
            cgJsData[gid].options.general.AllowRatingDynamic = cgJsData[gid].options.general.AllowRating-10;
        }else if(cgJsData[gid].options.general.AllowRating==1){// earlier five stars were AllowRating = 1
            cgJsData[gid].options.general.AllowRatingDynamic = 5;
        }

        // since v18 no slideout append anymore!! BlogLookFullWindow will be used instead!
        if(cgJsData[gid].options.general.FullSizeSlideOutStart==1 && cgJsData[gid].options.visual.SliderFullWindow!=1 && parseFloat(cgJsData[gid].vars.versionDatabaseGallery) < 15.05){
            cgJsData[gid].options.general.FullSizeSlideOutStart=0;
            cgJsData[gid].options.visual.BlogLookFullWindow=1;
        }else if(cgJsData[gid].options.visual.SliderFullWindow!=1 && cgJsData[gid].options.visual.BlogLookFullWindow!=1 && cgJsData[gid].options.general.FullSizeImageOutGallery!=1 && cgJsData[gid].options.general.OnlyGalleryView!=1 && parseFloat(cgJsData[gid].vars.versionDatabaseGallery) < 15.05){
            cgJsData[gid].options.general.FullSizeSlideOutStart=0;
            cgJsData[gid].options.visual.BlogLookFullWindow=1;
        }

        if(
            cgJsData[gid].vars.isOnlyGalleryNoVoting && cgJsData[gid].options.general.AllowComments==0 && !cgJsData[gid].vars.RatingVisibleForGalleryNoVoting &&
            !cgJsData[gid].options.visual['Field1IdGalleryView'] && !cgJsData[gid].options.visual['SubTitle'] && !cgJsData[gid].options.visual['ThirdTitle']
        ){
            cgJsData[gid].vars.mainCGdivHelperParent.addClass('cg_no_comments');
        }

        cgJsData[gid].singleViewOrder = cgJsData[gid].singleViewOrderFullData;

        cgJsData[gid].forms.upload = cgJsData[gid].formUploadFullData;
        cgJsData[gid].vars.isUserGalleryAndHasFieldsToEdit = false;
        cgJsData[gid].forms.uploadUserEditFieldsSortedByFieldOrder = {};

        if(cgJsData[gid].vars.isUserGallery){
            for(var fieldId in cgJsData[gid].forms.upload){
                if(!cgJsData[gid].forms.upload.hasOwnProperty(fieldId)){
                    break;
                }
                var Field_Type = cgJsData[gid].forms.upload[fieldId]['Field_Type'];
                var Field_Order = cgJsData[gid].forms.upload[fieldId]['Field_Order'];
                var Show_Slider = cgJsData[gid].forms.upload[fieldId]['Show_Slider'];
                var canBeEdited = false;
                if((Field_Type=='url-f' || Field_Type=='select-f' || Field_Type=='date-f' || Field_Type=='selectc-f' || Field_Type=='text-f' || Field_Type=='comment-f') && Show_Slider == 1){// then there are fields to edit for user gallery
                    canBeEdited = true;
                }else if (fieldId == cgJsData[gid].options.visual['Field1IdGalleryView']) {
                    canBeEdited = true;
                }
                if(canBeEdited){
                    cgJsData[gid].forms.uploadUserEditFieldsSortedByFieldOrder[Field_Order] = cgJsData[gid].forms.upload[fieldId];
                    cgJsData[gid].forms.uploadUserEditFieldsSortedByFieldOrder[Field_Order].fieldId = fieldId;
                    cgJsData[gid].vars.isUserGalleryAndHasFieldsToEdit = true;
                }
            }
        }

        cgJsClass.gallery.upload.functions.initForGallery(gid);

        if(cgJsData[gid].vars.isOnlyUploadForm || cgJsData[gid].vars.isOnlyContactForm){
            cgJsData[gid].vars.mainCGdivUploadForm.insertBefore(cgJsData[gid].vars.mainCGdivContainer);
            cgJsData[gid].vars.mainCGdivContainer.remove();
            cgJsData[gid].vars.mainCGdivUploadForm.addClass('mainCGdivUploadFormOnly');
            cgJsData[gid].vars.mainCGdivUploadForm.removeClass('cg_hide');
            cgJsClass.gallery.upload.functions.init(gid,realGid);
            cgJsClass.gallery.upload.functions.uploadFormSetWidth(gid);
            i++;
            if(length>i){
                cgJsClass.gallery.getJson.init($,$mainCGallery,i,length);
            }
            return;
        }

        //console.log('cgJsClass');
        //console.log(cgJsClass);
        //console.log('cgJsData');
        //console.log(cgJsData);

        // return true oder false für späteren check plus setzt categorien
        cgJsData[gid].vars.showCategories = cgJsClass.gallery.categories.init(gid,cgJsData[gid].categoriesFullData);

        cgJsData[gid].vars.categoriesLength = Object.keys(cgJsData[gid].vars.categories).length;

        cgJsData[gid].vars.preRawData = cgJsData[gid].imagesFullData;
        cgJsClass.gallery.getJson.imageDataPreProcess(gid,cgJsData[gid].vars.preRawData,true);

        // for upcomming versions autoreload irgendwann mal
        // cgJsClass.gallery.getJson.galleryTstampCheckInit(uploadFolderUrl,gid);

    i++;

    if(length>i){
        cgJsClass.gallery.getJson.init($,$mainCGallery,i,length);
    }



}