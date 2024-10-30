cgJsClass.gallery.views.singleView = {
    init: function ($) {

        $(document).on('click','.cg-center-image-close',function () {

            var gid = $(this).closest('.cgCenterDiv').attr('data-cg-gid');
            var realId = $(this).attr('data-cg-actual-realId');

            cgJsClass.gallery.views.close(gid,false,realId);


        });

        $(document).on('click','.cg-center-arrow-left',function () {

            jQuery(window).off('hashchange');
            cgJsClass.gallery.vars.keypressStartInSeconds = new Date().getTime()/1000;

            // braucht man zur Orientierung zwecks hash change
            cgJsClass.gallery.vars.showImageClicked = true;

            var gid = $(this).closest('.cgCenterDiv').attr('data-cg-gid');

            var order = parseInt(cgJsData[gid].vars.openedGalleryImageOrder)-1;
            cgJsClass.gallery.views.singleView.openImage($,order,false,gid,'left');

            cgJsClass.gallery.hashchange.activateHashChangeEvent();

        });

        $(document).on('click','.cg-center-arrow-right',function () {

            jQuery(window).off('hashchange');
            cgJsClass.gallery.vars.keypressStartInSeconds = new Date().getTime()/1000;

            // braucht man zur Orientierung zwecks hash change
            cgJsClass.gallery.vars.showImageClicked = true;

            var gid = $(this).closest('.cgCenterDiv').attr('data-cg-gid');

            var order = parseInt(cgJsData[gid].vars.openedGalleryImageOrder)+1;
            cgJsClass.gallery.views.singleView.openImage($,order,false,gid,'right');

            cgJsClass.gallery.hashchange.activateHashChangeEvent();

        });

        $(document).on('click', '.cg_append, .cg_gallery_info, .cg_gallery_info_title, div[id^="cg_show"] .cg_gallery_info', function(e){

            // braucht man zur Orientierung zwecks hash change
            cgJsClass.gallery.vars.showImageClicked = true;

            var gid = $(this).closest('.mainCGallery').attr('data-cg-gid');

            if(cgJsData[gid].options.general.FullSizeImageOutGallery==1){
                return;
            }

            if(cgJsData[gid].options.general.OnlyGalleryView==1){
                return;
            }

            e.preventDefault();

            var $element = $(this);
            var order = $element.closest('.cg_show').attr('data-cg-order');
            var firstKey = Object.keys(cgJsData[gid].image[order])[0];
            var realId = cgJsData[gid].image[order][firstKey]['id'];
            var isGalleryOpened = false;

            if(cgJsData[gid].options.general.FullSizeSlideOutStart==1
                && cgJsClass.gallery.vars.fullwindow==null
                && cgJsData[gid].vars.galleryAlreadyFullWindow==false){// cgJsData[gid].vars.galleryAlreadyFullWindow ganz wichtig!
                cgJsClass.gallery.views.fullwindow.openFunction(gid);
                jQuery('#cg_show'+realId+' .cg_gallery_info').click();
            }

            if($element.hasClass('cg_open_gallery')){
                $element.removeClass('cg_open_gallery');
                isGalleryOpened = true;
            }

            if(typeof $element.find('.cg_rate_star')[ 0 ] == 'undefined' && $element.hasClass('cg_gallery_info')){

/*                var starOffset = $(this).find('.cg_rate_star')[ 0 ];
                starOffset = starOffset.offset();
                var xStarOffsetLeft = starOffset.left;
                var yStarOffsetLeft = starOffset.top;
                debugger*/
                if (cgJsData[gid].options.general.RatingOutGallery != '1'){
                    cgJsClass.gallery.views.singleView.openImage($,order,false,gid,undefined,isGalleryOpened);
                }else{
                    return;
                }
            }else{
                cgJsClass.gallery.views.singleView.openImage($,order,false,gid,undefined,isGalleryOpened);
            }

            // alter code

            /*      var ratingStar = jQuery(".cg_rate_star");


                 // falls rating geklickt wurde dann nicht öffnen
                if (!ratingStar.is(e.target) // if the target of the click isn't the container...
                     && ratingStar.has(e.target).length === 0) // ... nor a descendant of the container
                 {
                     console.log(1)
                     cgJsClass.gallery.views.singleView.openImage($,order,false,gid);

                 }
                 else {
                     // dann ist cg_rate_star
                     console.log(2)

                     if (cgJsData[gid].options.general.RatingOutGallery != '1'){
                         console.log(3)

                         cgJsClass.gallery.views.singleView.openImage($,order,false,gid);

                     }
                     return;
                 }*/

        });


    },
    openImage:function ($,order,openComment,gid,direction,isGalleryOpened) {

        // prüfen ob eine andere gallerie geöffnet ist falls mehrere shortcodes vorhanden
        if(cgJsClass.gallery.vars.openedGallery!=null){
            if(cgJsClass.gallery.vars.openedGallery!=gid){
                cgJsClass.gallery.views.close(cgJsClass.gallery.vars.openedGallery,true);
            }
        }

        cgJsClass.gallery.vars.openedGallery = gid;

        // braucht man zur Orientierung zwecks hash change
        cgJsClass.gallery.vars.showImageClicked = true;

        var windowHeight = jQuery(window).height();
        var windowWidth = jQuery(window).width();

        var scalingMultiplicatorCenterDiv = 9;
        var scalingMultiplicatorForDivImageParent = 6;
        var scalingMultiplicatorForDivImage = 5.8;

        if(cgJsClass.gallery.vars.isMobile==true){
            scalingMultiplicatorCenterDiv = 9;
            scalingMultiplicatorForDivImageParent = 8;
            scalingMultiplicatorForDivImage = 7.8;
        }

        if(windowHeight>windowWidth){// dann verticale Ansicht!
            scalingMultiplicatorCenterDiv = 7;
            scalingMultiplicatorForDivImageParent = 4;
            scalingMultiplicatorForDivImage = 3.8;

            if(cgJsClass.gallery.vars.isMobile==true){
                scalingMultiplicatorCenterDiv = 7;
                scalingMultiplicatorForDivImageParent = 6;
                scalingMultiplicatorForDivImage = 5.8;
            }

        }

        if(cgJsClass.gallery.vars.fullwindow){
            var setHeightToMakeDivStable = windowHeight/10*scalingMultiplicatorCenterDiv;
            var cgCenterImageParentHeight = windowHeight/10*scalingMultiplicatorForDivImageParent;
        }else{
            var setHeightToMakeDivStable = windowHeight/10*scalingMultiplicatorCenterDiv;
            var cgCenterImageParentHeight = windowHeight/10*scalingMultiplicatorForDivImageParent;
        }

        // height setzten damit es nicht springt, später wieder entfernen ganz unten
        //jQuery('#cgCenterDiv'+gid).height(setHeightToMakeDivStable);
        var cgCenterDiv = cgJsData[gid].vars.cgCenterDiv;

        if(cgJsData[gid].vars.translateX){

            cgCenterDiv.find('#cgCenterImageDiv'+gid).show();

            var minus = '';

            if(typeof direction == 'undefined'){
                direction = 'right';
            }
            if(direction=='left'){
                minus = '-';
            }
            cgCenterDiv.find('#cgCenterImage'+gid).addClass('cg_hide cg_translateX').removeClass('cg_transition');
        }else{

            cgCenterDiv.find('#cgCenterImageDiv'+gid).show();
            cgCenterDiv.find('#cgCenterImage'+gid).hide();
        }
        //cgCenterDiv.css('min-height',setHeightToMakeDivStable+'px');
        cgCenterDiv.css('min-height',setHeightToMakeDivStable+'px');
        cgCenterDiv.find('#cgCenterImageParent'+gid).css({
            'min-height':cgCenterImageParentHeight+'px',
            'max-height':cgCenterImageParentHeight+'px',
            'height':cgCenterImageParentHeight+'px'
        });

        var order = parseInt(order);

        if(cgJsClass.gallery.vars.openedGallery != gid && cgJsClass.gallery.vars.openedGallery!=null){
                cgJsClass.gallery.views.close(cgJsClass.gallery.vars.openedGallery,true);
        }

        cgJsClass.gallery.vars.openedGallery = gid;
        cgJsClass.gallery.vars.thereIsImageInfo = false;

        // pauschal schließen falls mehrere gallerien auf einer seite sind
/*        $('.cgCenterDiv').css({
            'display':'none',
            'width':''
        });*/

        // erstmal auf display none setzen um die höhe der images für offest genau berechnen zu können
        cgJsData[gid].vars.cgCenterDivAppearenceHelper.removeClass('cg_hide');
        cgCenterDiv.find('.cg-center-image-div').hide();

        cgCenterDiv.css({
            'display':'none',
            'margin-top': 'unset',
            'margin-bottom': 'unset'
        });// wichtig! display none!!! ansonsten kann insert an falscher stelle stattfinden!


        var firstKey = Object.keys(cgJsData[gid].image[order])[0];
        var realId = cgJsData[gid].image[order][firstKey]['id'];

        // var imageObject = cgJsData[gid].image[order][firstKey]['imageObject'];
        var imageObject = cgJsData[gid].imageObject[realId];

        var ShowNickname = cgJsData[gid].options.pro.ShowNickname;

        if(ShowNickname==1){
            cgCenterDiv.find('#cgCenterShowNicknameParent'+gid).show();
        }

        // fblike extra append back wenn fblikeoutgallery on
        var FbLike = cgJsData[gid].options.general.FbLike;
        var FbLikeGallery = cgJsData[gid].options.general.FbLikeGallery;
        if(FbLike >=1 && FbLikeGallery>=1 && cgJsData[gid].vars.openedRealId>=1){

            // clone append rating div
            var fbContent = cgCenterDiv.find('#cgCenterImageFbLikeDiv'+gid).html();
            cgJsData[gid].imageObject[cgJsData[gid].vars.openedRealId].find('.cg_gallery_facebook_div').html(fbContent).removeClass('cg_hide');

          //  jQuery('#cgFacebookGalleryDiv'+realId).html(fbContent);
         //   jQuery('#cgFacebookGalleryDiv'+realId).removeClass('cg_hide');

        }


        cgJsClass.gallery.vars.openedGalleryImageOrder = order;
        cgJsData[gid].vars.openedGalleryImageOrder = order;

        var cgRotationThumbNumber = cgJsData[gid].image[order][firstKey].rThumb;
        var $cgCenterImage = cgCenterDiv.find('.cg-center-image');

        cgCenterDiv.attr('data-cg-cat-id',cgJsData[gid].image[order][firstKey]['Category']);
     //   cgCenterDiv.find('.cg-center-image-comments-div-enter').hide();// zwecks langsamer Darstellung in IE und FireFox
        cgCenterDiv.find('.cg-top-bottom-arrow').addClass('cg_hide');
        cgCenterDiv.find('#cgCenterImageCommentsDiv'+gid).addClass('cg_hide');
        cgCenterDiv.find('#cgCenterImageCommentsDivParentParent'+gid).addClass('cg_hide');
        cgCenterDiv.find('.cg-center-image-info-div-parent-padding').removeClass('cg-center-image-info-div-parent-padding');
        cgCenterDiv.find('.cg-center-image-info-info-separator').addClass('cg_hide');
       // cgCenterDiv.find('.cg-center-image-info-comments-separator').addClass('cg_hide');
        cgCenterDiv.find('.cg-center-image-comments-div-parent-parent').addClass('cg_hide');
        cgCenterDiv.find('.cg-center-image').hide();
        cgCenterDiv.find('.cg-center-image').removeClass('cg_contain');
        cgCenterDiv.find('#cgCenterImageFbLikeDiv'+gid).hide().removeClass('cg_hide');
        cgCenterDiv.find('#cgCenterImageRatingDiv'+gid).hide();
        $cgCenterImage.removeClass('cg180degree cg270degree cg90degree cg0degree');
        $cgCenterImage.find('.cg-center-image-rotated').hide();

        if(cgRotationThumbNumber=='180'){
            $cgCenterImage.find('.cg-center-image-rotated').addClass('cg180degree').removeClass('cg90degree cg270degree cg0degree').show();
        }
        else if(cgRotationThumbNumber=='270'){
            $cgCenterImage.find('.cg-center-image-rotated').addClass('cg270degree').removeClass('cg90degree cg180degree cg0degree').show();
        }
        else if(cgRotationThumbNumber=='90'){
            $cgCenterImage.find('.cg-center-image-rotated').addClass('cg90degree').removeClass('cg270degree cg180degree cg0degree').show();
        }
        else{
        }

        if(cgJsData[gid].options.general.FullSize != '1'){
            cgCenterDiv.find('.cg-center-image-download').hide();
        }


        cgJsData[gid].vars.openedGalleryImageOrder = order;
        var galleryId = gid;
        var AllowRating = cgJsData[gid].options.general.AllowRating;
        var AllowComments = cgJsData[gid].options.general.AllowComments;


        $('#cgCenterImageInfoDiv'+gid).empty();
        $('#cgCenterImageCommentsDiv'+gid).empty();

        if(order==0){
            $('#cgCenterArrowLeft'+gid).addClass('cg-center-pointer-event-none');
        }
        else{
            $('#cgCenterArrowLeft'+gid).removeClass('cg-center-pointer-event-none');
        }

        var orderCheck = order+1;

        if(cgJsData[gid].image.length==orderCheck){
            $('#cgCenterArrowRight'+gid).addClass('cg-center-pointer-event-none');
        }
        else{
            $('#cgCenterArrowRight'+gid).removeClass('cg-center-pointer-event-none');
        }

        var mainCGalleryWidth = cgCenterDiv.closest('#mainCGallery'+gid).width();

        var hundertPercentWidth = cgJsClass.gallery.resize.resizeCenter(cgCenterDiv,gid,mainCGalleryWidth);

        if(hundertPercentWidth){
            cgCenterDiv.find('#cgCenterInfoDiv'+gid).addClass('cg_hide');
        }else{
            cgCenterDiv.find('#cgCenterInfoDiv'+gid).removeClass('cg_hide');
        }

        cgJsClass.gallery.resize.resizeInfoAndCommentAreas(cgCenterDiv,gid,mainCGalleryWidth);

        // Code falls man auf das selbe Bild nochmal klickt soll centerDiv zugehen
        /*        if(cgJsClass.gallery.vars.openedGalleryImageOrder==order){
                    cgCenterDiv.css('display','none');
                    cgJsClass.gallery.vars.openedGalleryImageOrder = null;
                    $('#cgCenterOrientation').cgGoTo();
                    return;
                }else{
                    cgJsClass.gallery.vars.openedGalleryImageOrder = order;
                }*/



        cgCenterDiv.attr('data-cg-order',order);


        var mainObject = cgJsData[gid].image[order][firstKey];

        var realId = cgJsData[gid].image[order][firstKey]['id'];

        // WICHTIG!!! Wird weiter vorne wieder gemacht zwecks Einrastung!!!!
        cgJsClass.gallery.views.singleView.goToLocation(gid,realId,isGalleryOpened,order,firstKey);

        cgCenterDiv.find('.cg-center-image-close').attr('data-cg-actual-realId',realId);
        cgCenterDiv.find('.cg-center-arrow-left').attr('data-cg-actual-realId',realId);
        cgCenterDiv.find('.cg-center-arrow-right').attr('data-cg-actual-realId',realId);

        cgJsClass.gallery.vars.openedRealId = realId;
        cgJsData[gid].vars.openedRealId = realId;

        var FullSizeGallery = cgJsData[gid].options.general.FullSizeGallery;

        if(cgJsData[gid].vars.galleryAlreadyFullWindow==true || FullSizeGallery!=1){
            cgCenterDiv.find('#cgCenterImageFullwindow'+gid).hide();
        }

        if(AllowRating>=1){
            // clone append rating div
            cgCenterDiv.find('#cgCenterImageRatingDiv'+gid).empty();
            imageObject.find('.cg_gallery_rating_div').clone().appendTo(cgCenterDiv.find('#cgCenterImageRatingDiv'+gid)).find('.cg_gallery_rating_div_child').removeClass('cg_center').removeClass('cg_right');

            cgCenterDiv.find('.cg_gallery_rating_div').removeClass('cg_sm').removeClass('cg_xs').removeClass('cg_xxs');
            cgCenterDiv.find('.cg_gallery_rating_div .cg_rate_star').removeClass('cg_rate_out_gallery_disallowed').removeClass('cg_sm').removeClass('cg_xs').removeClass('cg_xxs');
            cgCenterDiv.find('.cg_gallery_rating_div .cg_gallery_rating_div_count').removeClass('cg_sm').removeClass('cg_xs').removeClass('cg_xxs');

        }
        if(AllowComments>=1){
            // clone append rating div
            cgCenterDiv.find('#cgCenterImageCommentsDivTitle'+gid+'').empty();
            imageObject.find('.cg_gallery_comments_div').clone().appendTo(cgCenterDiv.find('#cgCenterImageCommentsDivTitle'+gid+'')).find('.cg_gallery_comments_div').removeClass('cg_center').removeClass('cg_right');
            cgCenterDiv.find('#cgCenterImageCommentsDivTitle'+gid+'').append('<hr>');
            cgCenterDiv.find('.cg_gallery_comments_div').removeClass('cg_sm').removeClass('cg_xs').removeClass('cg_xxs');
            cgCenterDiv.find('.cg_gallery_comments_div .cg_gallery_comments_div_icon').removeClass('cg_sm').removeClass('cg_xs').removeClass('cg_xxs');
            cgCenterDiv.find('.cg_gallery_comments_div .cg_gallery_comments_div_count').removeClass('cg_sm').removeClass('cg_xs').removeClass('cg_xxs');
            cgCenterDiv.find('.cg_gallery_comments_div_icon').addClass('cg_inside_center_div');

        }else{
            cgCenterDiv.find('#cgCenterInfoDiv'+gid+'').remove();
        }

        if(FbLike>=1){
            if(FbLikeGallery>=1){
                // clone append rating div
                cgCenterDiv.find('#cgCenterImageFbLikeDiv'+gid).empty();
                var fbContent = imageObject.find('.cg_gallery_facebook_div').html();
                $('#cgCenterImageFbLikeDiv'+gid).html(fbContent).show();
                $('#cgFacebookGalleryDiv'+realId).addClass('cg_hide');
            }else{

                var timestamp = cgJsData[gid].vars.rawData[realId]['Timestamp'];
                var namePic = cgJsData[gid].vars.rawData[realId]['NamePic'];
                var uploadFolderUrl = cgJsData[gid].vars.uploadFolderUrl;
                var nameFbLikePageUrl = timestamp+'_'+namePic+'413.html';
                var fbLikePageUrl = uploadFolderUrl+"/contest-gallery/gallery-id-"+galleryId+"/"+nameFbLikePageUrl;

                var fbContent = "<div id='cgFacebookGalleryDiv"+realId+"' class='cg_gallery_facebook_div' >"+
                    "<iframe src='"+fbLikePageUrl+"'  scrolling='no'"+
                    "class='cg_fb_like_iframe_slider_order' id='cg_fb_like_iframe_slider"+realId+"'  name='cg_fb_like_iframe_slider"+realId+"'></iframe>"+
                    "</div>";

                cgCenterDiv.find('#cgCenterImageFbLikeDiv'+gid).html(fbContent);

            }
        }

        if(ShowNickname==1 && cgJsData[gid].vars.rawData[realId]['display_name']!=''){
            cgCenterDiv.find('#cgCenterShowNicknameParent'+gid).css({
                'height':'auto',
                'visibility':'visible'
            });
            cgCenterDiv.find('#cgCenterShowNicknameText'+gid).text(cgJsData[gid].vars.rawData[realId]['display_name']);
        }else{
            if(ShowNickname==1){
                cgCenterDiv.find('#cgCenterShowNicknameParent'+gid).css({
                    'height':'0',
                    'visibility':'hidden'
                });
            }
        }

        var widthImage = cgJsData[gid].image[order][firstKey]['Width'];
        var heightImage = cgJsData[gid].image[order][firstKey]['Height'];
        var imageObjectOuterWidth = imageObject.outerWidth();

        var offsetTopClickedImage = imageObject.offset().top;
        var imageOffsetPrev = false;

        var firstImage = false;
        if((order-1)<0){
            firstImage=true;
        }else{

            var imageObjectPref = cgJsData[gid].image[order-1][Object.keys(cgJsData[gid].image[order-1])[0]]['imageObject'];
            imageOffsetPrev = (typeof imageObjectPref != 'undefined') ? imageObjectPref.offset().top : false;
            //  var imageObjectNext = cgJsData[gid].image[i+1][Object.keys(cgJsData[gid].image[i+1])[0]]['imageObject'];
            //  var imageOffsetNext = (typeof imageObjectNext != 'undefined') ? imageObjectNext.offset().top : false;
        }

        var addDistancePics = true;
        if(imageOffsetPrev){
            if(imageOffsetPrev!=offsetTopClickedImage){
                addDistancePics = false;
            }
        }
        if(firstImage){addDistancePics=false};


        if(cgJsData[gid].vars.currentLook=='row'){

            cgCenterDiv.css('margin-bottom', cgJsData[gid].options.visual.RowViewSpaceHeight+'px');

            if(addDistancePics){
                var positionLeftOrientation = imageObject.position().left+parseInt(cgJsData[gid].options.visual.RowViewBorderWidth)+parseInt(cgJsData[gid].options.visual.RowViewSpaceWidth);
            }else{
                var positionLeftOrientation = imageObject.position().left+parseInt(cgJsData[gid].options.visual.RowViewBorderWidth);
            }

            var widthOrientation = imageObjectOuterWidth-parseInt(cgJsData[gid].options.visual.RowViewBorderWidth)*2;

        }

        if(cgJsData[gid].vars.currentLook=='height'){

            cgCenterDiv.css('margin-bottom', cgJsData[gid].options.visual.HeightViewSpaceHeight+'px');

            if(addDistancePics){
                var positionLeftOrientation = imageObject.position().left+parseInt(cgJsData[gid].options.visual.HeightViewBorderWidth)+parseInt(cgJsData[gid].options.visual.HeightViewSpaceWidth);
            }else{
                var positionLeftOrientation = imageObject.position().left+parseInt(cgJsData[gid].options.visual.HeightViewBorderWidth);
            }

            var widthOrientation = imageObjectOuterWidth-parseInt(cgJsData[gid].options.visual.HeightViewBorderWidth)*2;
        }

        if(cgJsData[gid].vars.currentLook=='thumb'){

            cgCenterDiv.css('margin-top', cgJsData[gid].options.general.DistancePicsV+'px');

            // DistancePics is in general!

            var distancePics = parseInt(cgJsData[gid].options.general.DistancePics);

            if(imageObject.position().left<=30){
                distancePics = 0;
            }

            if(addDistancePics){
                // *2 borderwidth wegen der art des borders weil auf cg_append
                var positionLeftOrientation = imageObject.position().left+parseInt(cgJsData[gid].options.visual.ThumbViewBorderWidth)+distancePics;
            }else{
                var positionLeftOrientation = imageObject.position().left+parseInt(cgJsData[gid].options.visual.ThumbViewBorderWidth);
            }

            var widthOrientation = imageObjectOuterWidth-parseInt(cgJsData[gid].options.visual.ThumbViewBorderWidth)*2;
        }

        $('#cgCenterOrientation'+gid).width(widthOrientation);
        $('#cgCenterOrientation'+gid).css('margin-left',positionLeftOrientation+'px');


        //alert($('#mainCGdiv'+gid).width());
        // 900 ist der orientierungswert der auch in init-gallery-resize vorkommt
        if(mainCGalleryWidth>1000){
            // 70% width, 20 padding left and right
            // das hier kann man noch verbessern, die Logik ist noch nicht perfekt
            if(mainCGalleryWidth<1300){
                var widthCgCenterImageDiv = mainCGalleryWidth/100*100-40;
            }else{
                // größer als 1300 geht nicht cg-center-div-helper max-width 1300 hat!
                var widthCgCenterImageDiv = 1300/100*100-40;
            }
        }else{
            // 2 mal 20 padding rechts und links
            var widthCgCenterImageDiv = mainCGalleryWidth-40-40;
        }

        var newHeightImage = widthCgCenterImageDiv*heightImage/widthImage;
       // var newWidthImage = newHeightImage*widthImage/heightImage;
        var twoThirdsWindowHeight = $(window).height()/10*scalingMultiplicatorForDivImage;

        if(newHeightImage>twoThirdsWindowHeight){
            newHeightImage = twoThirdsWindowHeight;
            widthCgCenterImageDiv = widthImage*newHeightImage/heightImage;

            cgCenterDiv.find('.cg-center-image').addClass('cg_contain');
        }

        // margin cgCenterImage to cgCenterImageParent ausrechnen
        var cgCenterImageMargin = (cgCenterImageParentHeight-newHeightImage)/2;
        cgCenterDiv.find('#cgCenterImage'+gid).css('margin-top',cgCenterImageMargin+'px');

        if(widthCgCenterImageDiv<parseInt(imageObject['thumbnail_size_w'])){var backGroundUrl = cgJsClass.gallery.function.general.tools.checkSsl(mainObject['thumbnail']);}
        else if(widthCgCenterImageDiv<parseInt(imageObject['medium_size_w'])){var backGroundUrl = cgJsClass.gallery.function.general.tools.checkSsl(mainObject['medium']);}
        else if(widthCgCenterImageDiv<parseInt(imageObject['large_size_w'])){var backGroundUrl = cgJsClass.gallery.function.general.tools.checkSsl(mainObject['large']);}
        else{
            var backGroundUrl = cgJsClass.gallery.function.general.tools.checkSsl(mainObject['full']);
        }

        if(cgJsData[gid].options.visual.OriginalSourceLinkInSlider == '1'){
            var originalSource = cgJsClass.gallery.function.general.tools.checkSsl(mainObject['full']);

            if(cgCenterDiv.find('.cg-center-image-download').parent().is('a')){
                cgCenterDiv.find('.cg-center-image-download').unwrap();
            }
            cgCenterDiv.find('.cg-center-image-download').wrap( "<a href='"+originalSource+"' class='cg-center-image-download-link' target='_blank'></a>" );
            cgCenterDiv.find('.cg-center-image-download').show();
        }

        if(cgJsData[gid].options.pro.GalleryUpload == '1'){
            cgCenterDiv.find('.cg-gallery-upload').show();
        }


        if(cgJsData[gid].options.general.FullSize == '1') {
            cgCenterDiv.find('.cg-center-image-fullscreen').show();
        }

       // cgCenterDiv.find('#cgCenterImage'+gid).hide();

        // !IMPORTANT Do not remove
        if(cgJsData[gid].vars.translateX){
            cgCenterDiv.find('#cgCenterImageDiv'+gid).show();
        }else{
            cgCenterDiv.find('#cgCenterImage'+gid).hide();
        }

        if(typeof cgJsData[gid].vars.rawData[realId]['imgSrcOriginalWidth']!='undefined'){
            if(cgRotationThumbNumber=='270' || cgRotationThumbNumber=='90' || cgRotationThumbNumber=='180'){
                $cgCenterImage.css({
                    'background' : 'unset',
                    'max-width' : cgJsData[gid].vars.rawData[realId]['imgSrcOriginalWidth']+'px',
                    'max-height' : cgJsData[gid].vars.rawData[realId]['imgSrcOriginalHeight']+'px'
                }).find('.cg-center-image-rotated').css({
                    'background': 'url("'+backGroundUrl+'") no-repeat center center',
                    'max-width' : cgJsData[gid].vars.rawData[realId]['imgSrcOriginalWidth']+'px',
                    'max-height': cgJsData[gid].vars.rawData[realId]['imgSrcOriginalHeight']+'px'
                });
            }else{
                $cgCenterImage.css({
                    'background':'url("'+backGroundUrl+'") no-repeat center center',
                    'max-width' : cgJsData[gid].vars.rawData[realId]['imgSrcOriginalWidth']+'px',
                    'max-height' : cgJsData[gid].vars.rawData[realId]['imgSrcOriginalHeight']+'px'
                });
            }
        }else{
            if(cgRotationThumbNumber=='270' || cgRotationThumbNumber=='90' || cgRotationThumbNumber=='180'){
                $cgCenterImage.css({
                    'background' : 'unset',
                    'max-width' : 'unset',
                    'max-height' : 'unset'
                }).find('.cg-center-image-rotated').css({
                    'background': 'url("'+backGroundUrl+'") no-repeat center center',
                    'max-width' : 'unset',
                    'max-height' : 'unset'
                });
            }else{
                $cgCenterImage.css({
                    'background':'url("'+backGroundUrl+'") no-repeat center center',
                    'max-width' : 'unset',
                    'max-height' : 'unset'
                });
            }
        }


        // For small images extra condition
        if(cgJsData[gid].vars.rawData[realId]['Height']<newHeightImage){

            if(cgRotationThumbNumber=='270' || cgRotationThumbNumber=='90'){
                $cgCenterImage.height(cgJsData[gid].vars.rawData[realId]['Height']).width(cgJsData[gid].vars.rawData[realId]['Width']).find('.cg-center-image-rotated').height(cgJsData[gid].vars.rawData[realId]['Width']).width(cgJsData[gid].vars.rawData[realId]['Height']);
            }else if(cgRotationThumbNumber=='180') {
                $cgCenterImage.height(cgJsData[gid].vars.rawData[realId]['Height']).width(cgJsData[gid].vars.rawData[realId]['Width']).find('.cg-center-image-rotated').height('100%').width('100%');
            }
            else {
                $cgCenterImage.height(cgJsData[gid].vars.rawData[realId]['Height']).width(cgJsData[gid].vars.rawData[realId]['Width']);
            }

            cgCenterDiv.css({
                'min-height':'unset',
                'height':'auto'
            });

            if(cgJsData[gid].vars.translateX){
                var widthCgCenterImageDivTransform = cgJsData[gid].vars.rawData[realId]['Width']+65;
                cgCenterDiv.find('#cgCenterImage'+gid).css({
                    'webkit-transform':'translateX('+minus+''+widthCgCenterImageDivTransform+'px)',
                    '-moz-transform':'translateX('+minus+''+widthCgCenterImageDivTransform+'px)',
                    '-ms-transform':'translateX('+minus+''+widthCgCenterImageDivTransform+'px)',
                    '-o-transform':'translateX('+minus+''+widthCgCenterImageDivTransform+'px)',
                    'transform':'translateX('+minus+''+widthCgCenterImageDivTransform+'px)'
                });
            }

        }else{

            if(cgRotationThumbNumber=='270' || cgRotationThumbNumber=='90'){
                $cgCenterImage.height(newHeightImage).width(widthCgCenterImageDiv).find('.cg-center-image-rotated').height(widthCgCenterImageDiv).width(newHeightImage);
            }else if(cgRotationThumbNumber=='180') {
                $cgCenterImage.height(newHeightImage).width(widthCgCenterImageDiv).find('.cg-center-image-rotated').height('100%').width('100%');
            }
            else{
                $cgCenterImage.height(newHeightImage).width(widthCgCenterImageDiv);
            }

       //     cgCenterDiv.height(newHeightForCenter);

            if(cgJsData[gid].vars.translateX){
                var widthCgCenterImageDivTransform = widthCgCenterImageDiv+65;
                cgCenterDiv.find('#cgCenterImage'+gid).css({
                    'webkit-transform':'translateX('+minus+''+widthCgCenterImageDivTransform+'px)',
                    '-moz-transform':'translateX('+minus+''+widthCgCenterImageDivTransform+'px)',
                    '-ms-transform':'translateX('+minus+''+widthCgCenterImageDivTransform+'px)',
                    '-o-transform':'translateX('+minus+''+widthCgCenterImageDivTransform+'px)',
                    'transform':'translateX('+minus+''+widthCgCenterImageDivTransform+'px)'
                });
            }
        }




        var last = parseInt(order)+1;

      //  var collectedWidth = 0;
       // debugger
        // Dann letztes Bild angeklickt
        if(typeof cgJsData[gid].image[last] === 'undefined'){

            cgCenterDiv.insertAfter(imageObject);
          //  cgCenterDiv.insertAfter(cgJsData[gid].vars.cgCenterDivAppearenceHelper.addClass('cg_hide'));
            cgCenterDiv.css('display','table');
            cgJsData[gid].vars.cgCenterDivAppearenceHelper.addClass('cg_hide');
            cgJsClass.gallery.views.singleView.goToLocation(gid,realId,isGalleryOpened,order,firstKey);
            cgJsClass.gallery.views.singleView.createImageUrl(gid,realId);
            // old logic 2019 03 09
/*            cgCenterDiv.find('.cg-center-image').slideDown(500,function () {
                if(FbLike>=1){
                    if(FbLikeGallery>=1){
                    }else{
                        cgCenterDiv.find('#cgCenterImageFbLikeDiv'+gid).show();
                    }
                }
                if(AllowRating>=1){
                    cgCenterDiv.find('#cgCenterImageRatingDiv'+gid).show();
                }

                if(hundertPercentWidth){
                  //  cgCenterDiv.find('.cg-center-image-comments-div-enter').slideDown(1500);// zwecks langsamer Darstellung in IE und FireFox
                }

            });*/

            cgCenterDiv.find('.cg-center-image').show();
            if(FbLike>=1){
                if(FbLikeGallery>=1){
                }else{
                    cgCenterDiv.find('#cgCenterImageFbLikeDiv'+gid).show();
                }
            }
            if(AllowRating>=1){
                cgCenterDiv.find('#cgCenterImageRatingDiv'+gid).show();
            }

            if(!hundertPercentWidth){
              //  cgCenterDiv.find('.cg-center-image-comments-div-enter').show();// zwecks langsamer Darstellung in IE und FireFox
            }

           // var set = true;

          //  if(typeof openComment === 'undefined' || openComment == false){
         //   setTimeout(function () {
               // $('#cgCenterOrientation'+gid).cgGoTo();
          //  cgJsClass.gallery.views.singleView.goToLocation(gid,realId);
           // cgJsClass.gallery.views.singleView.createImageUrl(gid,realId);
         //   },100);
           // }

        }
        else{

            var set = false;

            for(var i = parseInt(order)+1; i<=1000; i++){

                if(typeof cgJsData[gid].image[i] !== 'undefined'){
                  //  debugger
                    var firstKeyToCompare = Object.keys(cgJsData[gid].image[i])[0];
                    var imageObjectToCompare = cgJsData[gid].image[i][firstKeyToCompare]['imageObject'];
                    var offsetTopToCompare = imageObjectToCompare.offset().top;

                    if(offsetTopToCompare > offsetTopClickedImage){

                        set = true;

                        cgCenterDiv.insertBefore(imageObjectToCompare);
                        cgCenterDiv.css('display','table');
                        cgJsData[gid].vars.cgCenterDivAppearenceHelper.addClass('cg_hide');
                        cgJsClass.gallery.views.singleView.goToLocation(gid,realId,isGalleryOpened,order,firstKey);
                        cgJsClass.gallery.views.singleView.createImageUrl(gid,realId);

                        // old logic 2019 03 09
                        /*            cgCenterDiv.find('.cg-center-image').slideDown(500,function () {
                                        if(FbLike>=1){
                                            if(FbLikeGallery>=1){
                                            }else{
                                                cgCenterDiv.find('#cgCenterImageFbLikeDiv'+gid).show();
                                            }
                                        }
                                        if(AllowRating>=1){
                                            cgCenterDiv.find('#cgCenterImageRatingDiv'+gid).show();
                                        }

                                        if(hundertPercentWidth){
                                          //  cgCenterDiv.find('.cg-center-image-comments-div-enter').slideDown(1500);// zwecks langsamer Darstellung in IE und FireFox
                                        }

                                    });*/

                        cgCenterDiv.find('.cg-center-image').show();
                        if(FbLike>=1){
                            if(FbLikeGallery>=1){
                            }else{
                                cgCenterDiv.find('#cgCenterImageFbLikeDiv'+gid).show();
                            }
                        }
                        if(AllowRating>=1){
                            cgCenterDiv.find('#cgCenterImageRatingDiv'+gid).show();
                        }

                        if(!hundertPercentWidth){
                      //      cgCenterDiv.find('.cg-center-image-comments-div-enter').show();// zwecks langsamer Darstellung in IE und FireFox
                        }

                      //  if(typeof openComment === 'undefined' || openComment == false){
                    //    setTimeout(function () {
                          //  $('#cgCenterOrientation'+gid).cgGoTo();
                     //   cgJsClass.gallery.views.singleView.goToLocation(gid,realId);
                     //   cgJsClass.gallery.views.singleView.createImageUrl(gid,realId);
                      //  },100);
                      //  }


                        break;

                    }

                }

            }

            // dann wurde ein bild in der letzten reihe geklickt
            if(set==false){

                var key = Object.keys(cgJsData[gid].image[cgJsData[gid].image.length-1])[0];
                var lastImageObject = cgJsData[gid].image[cgJsData[gid].image.length-1][key]['imageObject'];

                cgCenterDiv.insertAfter(lastImageObject);
                cgCenterDiv.css('display','table');
                cgJsData[gid].vars.cgCenterDivAppearenceHelper.addClass('cg_hide');
                // old logic 2019 03 09
                /*            cgCenterDiv.find('.cg-center-image').slideDown(500,function () {
                                if(FbLike>=1){
                                    if(FbLikeGallery>=1){
                                    }else{
                                        cgCenterDiv.find('#cgCenterImageFbLikeDiv'+gid).show();
                                    }
                                }
                                if(AllowRating>=1){
                                    cgCenterDiv.find('#cgCenterImageRatingDiv'+gid).show();
                                }

                                if(hundertPercentWidth){
                                  //  cgCenterDiv.find('.cg-center-image-comments-div-enter').slideDown(1500);// zwecks langsamer Darstellung in IE und FireFox
                                }

                            });*/

                cgCenterDiv.find('.cg-center-image').show();
                if(FbLike>=1){
                    if(FbLikeGallery>=1){
                    }else{
                        cgCenterDiv.find('#cgCenterImageFbLikeDiv'+gid).show();
                    }
                }
                if(AllowRating>=1){
                    cgCenterDiv.find('#cgCenterImageRatingDiv'+gid).show();
                }
                if(!hundertPercentWidth){
                  //  cgCenterDiv.find('.cg-center-image-comments-div-enter').show();// zwecks langsamer Darstellung in IE und FireFox
                }

            //    if(typeof openComment === 'undefined' || openComment == false){
                setTimeout(function () {
                //    $('#cgCenterOrientation'+gid).cgGoTo();
                    cgJsClass.gallery.views.singleView.goToLocation(gid,realId,isGalleryOpened,order,firstKey);
                    cgJsClass.gallery.views.singleView.createImageUrl(gid,realId);

                },100);
            //    }

            }


        }

        //if(set == true){
        if(cgJsData[gid].vars.currentLook=='thumb'){

            if(cgJsData[gid].vars.thumbViewWidthFromLastImageInRow){
                cgCenterDiv.css('width',cgJsData[gid].vars.thumbViewWidthFromLastImageInRow+'px');
            }

            // bei Thumb view angleichen
        //    cgJsClass.gallery.resize.thumbSingleViewResize(cgCenterDiv,gid);// alter Code!!!!
            //cgCenterDiv.css('width',$('#mainCGallery'+gid).width()+'px');
       }else{
            cgCenterDiv.css('width','100%');
        }

       cgJsClass.gallery.info.checkInfoSingleImageView(realId,gid,order);

        if(cgCenterDiv.find('#cgCenterImageInfoDiv'+gid).find('.cg-center-image-info-div').length){
            cgCenterDiv.find('#cgCenterImageInfoDivParent'+gid).removeClass('cgCenterImageNoInfo');
            cgCenterDiv.find('#cgCenterImageCommentsDivParent'+gid).removeClass('cgCenterImageNoInfo');
        }else{
            cgCenterDiv.find('#cgCenterImageInfoDivParent'+gid).addClass('cgCenterImageNoInfo');
            cgCenterDiv.find('#cgCenterImageCommentsDivParent'+gid).addClass('cgCenterImageNoInfo');
        }


        cgJsClass.gallery.comment.setCommentsSingleImageView(realId,gid);


        // old logic 2019 03 09
/*        if(!hundertPercentWidth){
            cgCenterDiv.find('.cg-center-info-div').show();// DAS IST AUCH COMMENT DIV!!!!
        }else{
            setTimeout(function () {
                cgCenterDiv.find('.cg-center-info-div').slideDown(500);
/!*                cgCenterDiv.find('.cg-center-info-div').slideDown(500,function () {
                    cgCenterDiv.css({
                        'min-height':'unset',
                        'display': 'block'
                    });
                    cgCenterDiv.css('display','table');
                });*!/
            },1000);
        }*/

     //   cgCenterDiv.show();
      //  cgCenterDiv.css('display','table')
       // cgCenterDiv.find('.cg-center-info-div').show();// comments div!

        // damit die höhe auch wirklich auto wird und sich der div zusammenzieht
        // muss dieser kurz auf display none und dann auf table gesetzt werden
   //     cgCenterDiv.css('display','none');
        cgCenterDiv.css({
            'display': 'table'
        });


        if(cgJsData[gid].vars.translateX){
            cgCenterDiv.find('#cgCenterInfoDiv'+gid).removeClass('cg_hide');
            //   cgCenterDiv.find('#cgCenterImageDiv'+gid).show();
            cgCenterDiv.find('#cgCenterImage'+gid).removeClass('cg_hide')
            setTimeout(function () {
                cgCenterDiv.find('#cgCenterImage'+gid).addClass('cg_transition');
            },100);
        }else{

/*            cgCenterDiv.find('#cgCenterImageDiv'+gid).slideDown(700,function () {
                if(hundertPercentWidth){
                    cgCenterDiv.find('#cgCenterInfoDiv'+gid).slideDown(300);
                }
            });*/
            cgCenterDiv.find('#cgCenterInfoDiv'+gid).removeClass('cg_hide');
            cgCenterDiv.find('#cgCenterImageDiv'+gid).show();

           // setTimeout(function () {

               // cgCenterDiv.find('#cgCenterImage'+gid).hide().removeClass('cg_hide').slideDown(700);
                cgCenterDiv.find('#cgCenterImage'+gid).hide().slideDown(500);
          //  },700);

        }



        //  jQuery('html, body').scrollTop(800);

        if(cgJsClass.gallery.vars.fullscreen==true){

            setTimeout(function () {
                //location.href = '#cg_show29';
            //    $('#cgCenterOrientation'+gid).cgGoTo();

                cgJsClass.gallery.views.singleView.goToLocation(gid,realId,isGalleryOpened,order,firstKey);
                cgJsClass.gallery.vars.fullscreenStartOpenImage = false;
                cgJsClass.gallery.views.singleView.createImageUrl(gid,realId);

            },500)

        }


        //$('html, body').animate({scrollTop:800}, 500);
        // höhe mit timeout wieder entfernen wenn info geladen wurde
        setTimeout(function () {

            // ansonsten wird height aus cgJsClass.gallery.views.setInfoSingleImageView gemacht
            if(cgJsClass.gallery.vars.thereIsImageInfo==false){

                //jQuery('#cgCenterDiv'+gid).height(setHeightToMakeDivStable);
                //var heightToSet = jQuery('#cgCenterImage'+gid).height()+80;
              //  var heightToAnimate = jQuery('#cgCenterOrientation'+gid).height()+jQuery('#cgCenterDivHelper'+gid).height();
                //jQuery('#cgCenterDiv'+gid).css('min-height','unset');
             //   jQuery('#cgCenterDiv'+gid).animate({height: ''+heightToAnimate+'px'},'fast');
            }

            if(openComment){
                jQuery('html, body').animate({
                    scrollTop: jQuery('#cgCenterImageCommentsDivEnter'+gid).offset().top - 80+'px'
                }, 'fast');
            }
            
            if(jQuery('#mainCGdiv'+gid).is(':visible')){
                jQuery('#mainCGdiv'+gid).find('.cg-lds-dual-ring-div').addClass('cg_hide');

            }

            cgCenterDiv.find('.cg_gallery_rating_div').removeClass('cg_sm').removeClass('cg_xs').removeClass('cg_xxs');
            cgCenterDiv.find('.cg_gallery_rating_div .cg_gallery_rating_div_star').removeClass('cg_sm').removeClass('cg_xs').removeClass('cg_xxs');
            cgCenterDiv.find('.cg_gallery_rating_div .cg_gallery_rating_div_count').removeClass('cg_sm').removeClass('cg_xs').removeClass('cg_xxs');

            cgCenterDiv.find('.cg_gallery_comments_div').removeClass('cg_sm').removeClass('cg_xs').removeClass('cg_xxs');
            cgCenterDiv.find('.cg_gallery_comments_div .cg_gallery_comments_div_icon').removeClass('cg_sm').removeClass('cg_xs').removeClass('cg_xxs');
            cgCenterDiv.find('.cg_gallery_comments_div .cg_gallery_comments_div_count').removeClass('cg_sm').removeClass('cg_xs').removeClass('cg_xxs');

            cgJsClass.gallery.views.cloneFurtherImagesStep(gid);

        },1000);

        // reset this parameter!!!!
        cgJsClass.gallery.vars.backButtonClicked = false;

    },
    openAgain: function (gid,order) {

        var firstKey = Object.keys(cgJsData[gid].image[order])[0];
        var realId = cgJsData[gid].image[order][firstKey]['id'];
        jQuery('#cg_show'+realId).find('.cg_append').click();

        cgJsClass.gallery.vars.fullscreenStartOpenImage = true;


    },
    goToLocation: function (gid,realId,isGalleryOpened,order,firstKey){

        if(cgJsClass.gallery.vars.isMobile==true && cgJsClass.gallery.vars.isLoggedIn==false){
         //   window.location.href = '#cgCenterOrientation'+gid;

            if(isGalleryOpened===true){
                jQuery('#mainCGdiv'+gid).find('.cg-lds-dual-ring-div').removeClass('cg_hide').addClass('cg_fade_in_loader');
                jQuery('html').addClass('cg_no_scroll');
                setTimeout(function () {
                    jQuery('html, body').animate({
                        scrollTop: jQuery('#cgShowPositionHelper'+realId).offset().top - 40+'px'
                    }, 'fast', function () {
                        jQuery('html').removeClass('cg_no_scroll');
                      //  jQuery('#mainCGdiv'+gid).find('.cg-lds-dual-ring-div').addClass('cg_hide').removeClass('cg_fade_in_loader');
                    });
                },1500);
            }else{
                document.getElementById('cgCenterOrientation'+gid).scrollIntoView();
            }

            //   window.location.replace(location.href+'#cgCenterOrientation'+gid);
        }else{
/*            setTimeout(function(){
                location.href = '#cgShowPositionHelper'+realId;
            },0)*/
         //   location.href = '#cgShowPositionHelper'+realId;

            if(isGalleryOpened===true){
                jQuery('#mainCGdiv'+gid).find('.cg-lds-dual-ring-div').removeClass('cg_hide').addClass('cg_fade_in_loader');
                jQuery('html').addClass('cg_no_scroll');
                setTimeout(function () {
                    jQuery('html, body').animate({
                        scrollTop: jQuery('#cgShowPositionHelper'+realId).offset().top - 40+'px'
                    }, 'fast', function () {
                        jQuery('html').removeClass('cg_no_scroll');
                       // jQuery('#mainCGdiv'+gid).find('.cg-lds-dual-ring-div').addClass('cg_hide').removeClass('cg_fade_in_loader');
                    });
                },1500);

            }else{
                document.getElementById('cgShowPositionHelper'+realId).scrollIntoView();
            }

            //   window.location.replace(location.href+'#cgShowPositionHelper'+realId);
        }



    },
    createImageUrl: function (gid,realId) {

        // create image Url
        var imageTitle = cgJsData[gid].vars.rawData[realId]['post_title'];
        var imageHref = '!gallery/'+gid+'/image/'+realId+'/'+imageTitle;
        var newUrlForHistory = location.protocol + '//' + location.host + location.pathname+location.search+'#'+imageHref;
        //window.location.replace(newUrlForHistory);
        window.location.href = newUrlForHistory;

    }
};