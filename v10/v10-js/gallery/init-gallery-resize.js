cgJsClass.gallery.resize = {
    init: function ($) {

        $( window ).resize(function(e){

            if(cgJsClass.gallery.views.fullscreen.isFullscreen()) {
                return;
            }

            cgJsClass.gallery.vars.isMobileStatusBefore = cgJsClass.gallery.vars.isMobile;
            var event = e;

            cgJsClass.gallery.function.general.mobile.check();

            var timeout = 500;

            if(cgJsClass.gallery.vars.isMobileStatusBefore!=cgJsClass.gallery.vars.isMobile){// then developer tools must be used!
                timeout = 500;
            }

            // then resizing will be done only after finished!
            clearTimeout(cgJsClass.gallery.resize.setTimeout);

            // do this always directly so no delay effect exists, in this case is delay effect is very visible
            if(cgJsClass.gallery.vars.isMobile){
                var $cg_zoom_container = cgJsClass.gallery.vars.dom.body.find('.cg_zoom_container');

                if($cg_zoom_container.length){
                    cgJsClass.gallery.views.singleViewFunctions.zoom($,cgJsClass.gallery.views.singleViewFunctions.$zoomImageDiv,$cg_zoom_container.attr('data-cg-gid'),$cg_zoom_container.attr('data-cg-real-id'),true,$cg_zoom_container);
                }
            }

            // then resizing will be done only after finished!
            cgJsClass.gallery.resize.setTimeout = setTimeout(function () {

                cgJsClass.gallery.vars.initResize = true;

                jQuery(window).off('hashchange');

                cgJsClass.gallery.upload.functions.resizeAllForms();

                cgJsClass.gallery.vars.keypressStartInSeconds = new Date().getTime()/1000;

                // prüfen ob sich die Breite überhaupt verändert hat!
                //  if(cgJsClass.gallery.vars.isMobile==true){

                if(cgJsClass.gallery.vars.isMobile){
                    var screenWidth = screen.width;
                }else{
                    var screenWidth = $(window).width();
                }

                var screenWidthMore = screenWidth+4;
                var screenWidthLess = screenWidth-4;

                if(cgJsClass.gallery.vars.windowWidthLastResize>screenWidthLess && cgJsClass.gallery.vars.windowWidthLastResize<screenWidthMore){
                    // cgJsClass.gallery.vars.windowWidthLastResize=screenWidth;
                    return;
                }
                cgJsClass.gallery.vars.windowWidthLastResize=screenWidth;

                cgJsClass.gallery.categories.setRemoveTitleAttributeForSmallWindow();

                // fullScreen condition. Im Moment irrelevant.
                if(cgJsClass.gallery.vars.fullscreenStartOpenImage==true){
                    return;
                }
                $('.mainCGallery').each(function(index){

                    var gid = $(this).attr('data-cg-gid');

                    if(cgJsClass.gallery.vars.isMobile){
                        cgJsData[gid].vars.mainCGdiv.addClass('cg_is_mobile');
                    }else{
                        cgJsData[gid].vars.mainCGdiv.removeClass('cg_is_mobile');
                    }

                    //cgJsClass.gallery.views.fullwindow.checkIfGalleryAlreadyFullWindow(gid);

                    if(cgJsClass.gallery.vars.messageContainerShown==true){
                        cgJsClass.gallery.function.message.resize();
                    }

                    if(cgJsClass.gallery.vars.cgMessagesContainerProIsVisible){
                        cgJsClass.gallery.function.message.resize(true);
                    }

                    //cgJsClass.gallery.views.closeCenterDiv(gid);

                    var dataLength = 0;

                    if(cgJsData[gid].vars.rawData){
                        dataLength = Object.keys(cgJsData[gid].vars.rawData).length;
                    }
                    if(dataLength){
                        if(cgJsData[gid].vars.currentLook=='height'){
                            cgJsClass.gallery.heightLogic.init($,gid,false,false,false,false,false,false,false,true);
                        }
                        if(cgJsData[gid].vars.currentLook=='thumb'){
                            cgJsClass.gallery.thumbLogic.init($,gid,false,false,false,false,false,false,false,true);
                        }
                        if(cgJsData[gid].vars.currentLook=='slider'){
                            cgJsClass.gallery.thumbLogic.init($,gid,false,false,false,false,false,false,false,true);
                        }
                        if(cgJsData[gid].vars.currentLook=='row'){
                            cgJsClass.gallery.rowLogic.init($,gid,false,false,false,false,false,false,false,true);
                        }
                        if(cgJsData[gid].vars.currentLook=='blog'){
                            if(!cgJsClass.gallery.vars.fullwindow){
                                cgJsClass.gallery.blogLogic.init(jQuery,gid,null,null,null,true,false,false,false,true);
                            }
                            if(cgJsClass.gallery.vars.fullwindow && (cgJsClass.gallery.vars.fullwindow==gid)){
                                var prepareResizeFullWindow = cgJsClass.gallery.blogLogic.prepareResizeFullWindow(gid);
                                cgJsClass.gallery.blogLogic.changeWidth(prepareResizeFullWindow.widthNowForBlogView,prepareResizeFullWindow.factor,cgJsData[gid].vars.mainCGdivHelperParent,gid,false,true);
                            }else{
                                cgJsClass.gallery.blogLogic.changeWidth(null,null,cgJsData[gid].vars.mainCGdivHelperParent,gid,false,true);
                            }
                        }

                        if(cgJsClass.gallery.vars.fullwindow == gid){
                            cgJsClass.gallery.views.addRemoveSticky(cgJsData[gid].vars.mainCGdivHelperParent,cgJsData[gid].vars.mainCGdivHelperParent.scrollTop(),true,gid);
                            cgJsClass.gallery.blogLogic.setWidthMainCGdivFullWindowConfigurationArea(gid);
                            cgJsClass.gallery.blogLogic.setTopMainCGdivFullWindowConfigurationArea(gid);
                            cgJsClass.gallery.views.clickFurtherImagesStep.setBottomContainerAsTextWidth(gid);
                        }

                    }

                    if(cgJsData[gid].vars.openedRealId>=1){

                        cgJsData[gid].vars.cgCenterDiv.css('display','none');
                        //     setTimeout(function () {
                        //  jQuery('#cg_show'+cgJsData[gid].vars.openedRealId+' .cg_append').click();
                        //    },300);
                    }

                    cgJsClass.gallery.categories.checkIfShowMoreForCatAreaRequired(gid);

                    cgJsClass.gallery.upload.functions.uploadFormSetWidth(gid);

                    //cgJsClass.gallery.function.general.tools.setHeaderWidth(gid);

                    //    cgJsClass.gallery.resize.resizeInfo(gid);

                });

                $('.mainCGdivUploadFormOnly').each(function(){
                    var gid = $(this).attr('data-cg-gid');
                    cgJsClass.gallery.upload.functions.uploadFormSetWidth(gid);
                });

                cgJsClass.gallery.hashchange.activateHashChangeEvent();

                cgJsClass.gallery.vars.initResize = false;

            },timeout);


        });

    },
    setTimeOut: function () {

    },
    resizeCenter: function (cgCenterDiv,gid,mainCGalleryWidth,gidForElements) {

        var AllowComments = cgJsData[gid].options.general.AllowComments;
        //if(mainCGalleryWidth<=10000 || AllowComments!=1){
        if(true){

            cgCenterDiv.find('#cgCenterImageDivButtons'+gidForElements).addClass('cgHundertPercentWidth');
            cgCenterDiv.find('#cgCenterImageDiv'+gidForElements).addClass('cgHundertPercentWidth');
            cgCenterDiv.find('#cgCenterInfoDiv'+gidForElements).addClass('cgHundertPercentWidth');
            cgCenterDiv.find('#cgCenterImageRatingDiv'+gidForElements).addClass('cgHundertPercentWidth');
            cgCenterDiv.find('#cgCenterImageFbLikeDiv'+gidForElements).addClass('cgHundertPercentWidth');
            cgCenterDiv.find('.cg-center-info-div').removeClass('cg_single_view_full_width');

            return true;

        }
        else{

            cgCenterDiv.find('#cgCenterImageDivButtons'+gidForElements).removeClass('cgHundertPercentWidth');
            cgCenterDiv.find('#cgCenterImageDiv'+gidForElements).removeClass('cgHundertPercentWidth');
            cgCenterDiv.find('#cgCenterInfoDiv'+gidForElements).removeClass('cgHundertPercentWidth');
            cgCenterDiv.find('#cgCenterImageRatingDiv'+gidForElements).removeClass('cgHundertPercentWidth');
            cgCenterDiv.find('#cgCenterImageFbLikeDiv'+gidForElements).addClass('cgHundertPercentWidth');
            cgCenterDiv.find('.cg-center-info-div').addClass('cg_single_view_full_width');

            return false;

        }

    },
    resizeInfoAndCommentAreas: function (cgCenterDiv,gid,mainCGalleryWidth,gidForElements) {

        var AllowComments = cgJsData[gid].options.general.AllowComments;

        //if(mainCGalleryWidth<=680 || AllowComments!=1){
        if(true){

            cgCenterDiv.find('#cgCenterImageInfoDivParent'+gidForElements).addClass('cgHundertPercentWidth');
            cgCenterDiv.find('#cgCenterImageCommentsDivParent'+gidForElements).addClass('cgHundertPercentWidth');

            return true;

        }
        else{

            cgCenterDiv.find('#cgCenterImageInfoDivParent'+gidForElements).removeClass('cgHundertPercentWidth');
            cgCenterDiv.find('#cgCenterImageCommentsDivParent'+gidForElements).removeClass('cgHundertPercentWidth');

            return false;

        }

    },
    offsetThumbCheckToCompare: 0,
    collectedWidth: 0,
    thumbSingleViewResize: function (cgCenterDiv,gid) {

        cgJsClass.gallery.resize.collectedWidth = 0;

        jQuery(cgJsData[gid].image).each(function (index) {

            var firstKey = Object.keys(cgJsData[gid].image[index])[0];
            var offset = cgJsData[gid].image[index][firstKey]['imageObject'].offset().top;
            var offsetThumbCheckToCompare=cgJsClass.gallery.resize.offsetThumbCheckToCompare;
            if(offset>offsetThumbCheckToCompare && offsetThumbCheckToCompare != 0){
                var collectedWidth = cgJsClass.gallery.resize.collectedWidth;
                cgCenterDiv.css('width',collectedWidth+'px');
            }
            else{
                cgJsClass.gallery.resize.collectedWidth = cgJsClass.gallery.resize.collectedWidth + cgJsData[gid].image[index][firstKey]['imageObject'].outerWidth(true);
                cgJsClass.gallery.resize.offsetThumbCheckToCompare = cgJsData[gid].image[index][firstKey]['imageObject'].offset().top;
            }

        });
        return;

        // old code
        /*
                if(cgJsData[index].vars.currentLook=='thumb'){

                    var offsetThumbCheck = 0;
                    var collectedWidth = 0;
                    var i = 0;

                    var cgCenterThumbView = function(collectedWidth,offsetThumbCheck,i){
                        var firstKey = Object.keys(cgJsData[gid].image[i])[0];

                        var offsetThumbCheckToCompare = cgJsData[gid].image[i][firstKey]['imageObject'].offset().top;

                        if(offsetThumbCheckToCompare > offsetThumbCheck && offsetThumbCheck!=0){
                            collectedWidth = collectedWidth+1;
                            cgCenterDiv.css('width',collectedWidth+'px');

                        }
                        else{

                         //   var margin = parseFloat(imageObjects[i][firstKey]['imageObject'].css('margin-left'));
                         //   var border = parseFloat(imageObjects[i][firstKey]['imageObject'].css('border-left')) + parseFloat(imageObjects[i][firstKey]['imageObject'].css('margin-right'));
                      //      var width = imageObjects[i][firstKey]['imageObject'].width();

                         //   var sumWidth = width+margin+border;
        /!*                    console.log('margin')
                            console.log(margin)
                            console.log('border')
                            console.log(border)
                            console.log('width')
                            console.log(width)
                            console.log('sumWidth')
                            console.log(sumWidth)*!/

                            setTimeout(function () {

                                collectedWidth = collectedWidth+cgJsData[gid].image[i][firstKey]['imageObject'].outerWidth(true);
                                cgCenterThumbView(collectedWidth,offsetThumbCheckToCompare,i);
                                i++;

                            },100);


                        }

                    };


                    cgCenterThumbView(collectedWidth,offsetThumbCheck,i);

                }*/


    },
    galleryIcons: function ($mainCGallery,isOpenPage,isJustRemoveClasses,gid,gWidth) {

        if(isJustRemoveClasses){
            $mainCGallery.removeClass('cg_micro cg_xxs cg_sm cg_xs');
            return;
        }

        if(cgJsData[gid].vars.modernHover){
            return;
        }

        // only for fivestar rating
        if(cgJsData[gid].vars.currentLook=='row' && gWidth<=400 && cgJsData[gid].options.general.PicsInRow>=2 && cgJsData[gid].options.general.AllowRatingDynamic){

            $mainCGallery.addClass('cg_micro').removeClass('cg_xxs').removeClass('cg_sm').removeClass('cg_xs');

            return;

        }else{
            $mainCGallery.removeClass('cg_micro');
        }

        if(isOpenPage==true){

            setTimeout(function () {
                if(gWidth<=350){
                    $mainCGallery.addClass('cg_xxs').removeClass('cg_sm').removeClass('cg_xs');
                }
                else if(gWidth<=700){
                    $mainCGallery.addClass('cg_xs').removeClass('cg_xxs').removeClass('cg_sm');
                }
                else if(gWidth<=800){
                    $mainCGallery.addClass('cg_sm').removeClass('cg_xxs').removeClass('cg_xs');
                }
                else{
                    $mainCGallery.removeClass('cg_sm').removeClass('cg_xs').removeClass('cg_xxs');
                }
            },500)

        }
        else{

            if(gWidth<=350){
                $mainCGallery.addClass('cg_xxs').removeClass('cg_sm').removeClass('cg_xs');
            }
            else if(gWidth<=700){
                $mainCGallery.addClass('cg_xs').removeClass('cg_xxs').removeClass('cg_sm');
            }
            else if(gWidth<=800){
                $mainCGallery.addClass('cg_sm').removeClass('cg_xxs').removeClass('cg_xs');
            }
            else{
                $mainCGallery.removeClass('cg_sm').removeClass('cg_xs').removeClass('cg_xxs');
            }
        }

    },
    galleryIconsSlider: function ($mainCGslider,isOpenPage,isJustRemoveClasses,gid,gWidth) {

        $mainCGslider.removeClass('cg_micro cg_xxs cg_sm cg_xs');

        if(isOpenPage==true){

            setTimeout(function () {
                if(gWidth<=400){
                    $mainCGslider.addClass('cg_xs').removeClass('cg_xxs').removeClass('cg_sm');

                }
                else if(gWidth<=600){
                    $mainCGslider.addClass('cg_sm').removeClass('cg_xxs').removeClass('cg_xs');
                }
                /*else if(gWidth<=800){
                    $mainCGslider.addClass('cg_sm').removeClass('cg_xxs').removeClass('cg_xs');
                }*/
                else{
                    $mainCGslider.removeClass('cg_sm').removeClass('cg_xs').removeClass('cg_xxs');
                }
            },500)

        }
        else{

            if(gWidth<=400){
                $mainCGslider.addClass('cg_xs').removeClass('cg_xxs').removeClass('cg_sm');

            }
            else if(gWidth<=600){
                $mainCGslider.addClass('cg_sm').removeClass('cg_xxs').removeClass('cg_xs');
            }
            /*else if(gWidth<=800){
                $mainCGslider.addClass('cg_sm').removeClass('cg_xxs').removeClass('cg_xs');
            }*/
            else{
                $mainCGslider.removeClass('cg_sm').removeClass('cg_xs').removeClass('cg_xxs');
            }
        }

    }
};
