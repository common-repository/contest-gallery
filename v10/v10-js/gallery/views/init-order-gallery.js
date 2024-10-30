cgJsClass.gallery.views.initOrderGallery = function (gid,openPage,calledFromUpload,openImage,stepChange,viewChange,randomButtonClicked, sliderView,isCopyUploadToAnotherGallery,isFromFullWindowSliderOrBlogView,isFromCheckStepsCutImageData) {
    // abort all actual requests for this gallery
    if(cgJsData[gid].vars.getJson.length>0 && openPage==false){
        cgJsClass.gallery.getJson.abortGetJson(gid);
    }

    // if current Look already defined then this can be init
    if(cgJsData[gid].vars.currentLook=='blog'){
        cgJsClass.gallery.blogLogic.init(jQuery,gid,openPage,calledFromUpload,openImage,stepChange,viewChange,randomButtonClicked,isCopyUploadToAnotherGallery,false,false,isFromCheckStepsCutImageData);
        cgJsClass.gallery.views.cloneFurtherImagesStep(gid);
      //  cgJsClass.gallery.dynamicOptions.getCurrentRatingAndCommentsData(gid); MUST BE NOT REQUIRED ANYMORE 21.03.2020
        return;
    }

    // if current Look already defined then this can be init
    if(cgJsData[gid].vars.currentLook=='row'){
        cgJsClass.gallery.rowLogic.init(jQuery,gid,openPage,calledFromUpload,openImage,stepChange,viewChange,randomButtonClicked,isCopyUploadToAnotherGallery,false,isFromFullWindowSliderOrBlogView);
        cgJsClass.gallery.views.cloneFurtherImagesStep(gid);
      //  cgJsClass.gallery.dynamicOptions.getCurrentRatingAndCommentsData(gid); MUST BE NOT REQUIRED ANYMORE 21.03.2020
        return;
    }
    if(cgJsData[gid].vars.currentLook=='height'){
        cgJsClass.gallery.heightLogic.init(jQuery,gid,openPage,calledFromUpload,openImage,stepChange,viewChange,randomButtonClicked,isCopyUploadToAnotherGallery,false,isFromFullWindowSliderOrBlogView);
        cgJsClass.gallery.views.cloneFurtherImagesStep(gid);
       // cgJsClass.gallery.dynamicOptions.getCurrentRatingAndCommentsData(gid); MUST BE NOT REQUIRED ANYMORE 21.03.2020
        return;
    }
    if(cgJsData[gid].vars.currentLook=='thumb'){
        cgJsClass.gallery.thumbLogic.init(jQuery,gid,openPage,calledFromUpload,openImage,stepChange,viewChange,randomButtonClicked,isCopyUploadToAnotherGallery,false,isFromFullWindowSliderOrBlogView);
        cgJsClass.gallery.views.cloneFurtherImagesStep(gid);
       // cgJsClass.gallery.dynamicOptions.getCurrentRatingAndCommentsData(gid); MUST BE NOT REQUIRED ANYMORE 21.03.2020
        return;
    }

    if(cgJsData[gid].vars.currentLook=='slider'){
        cgJsClass.gallery.thumbLogic.init(jQuery,gid,openPage,calledFromUpload,openImage,stepChange,viewChange,randomButtonClicked,isCopyUploadToAnotherGallery,false,isFromFullWindowSliderOrBlogView);
        return;
    }

};

cgJsClass.gallery.views.checkOrderGallery = function (gid) {
    // Check view will be done only first start
    // If already set, will be not set anymore then!

    if(!cgJsData[gid].vars.currentLook){
        for(var property in cgJsData[gid].vars.orderGalleries){

            if(!cgJsData[gid].vars.orderGalleries.hasOwnProperty(property)){
                break;
            }

            if(cgJsData[gid].vars.orderGalleries[property]=='SliderLookOrder' && cgJsData[gid].options.general.SliderLook=='1'){
                cgJsData[gid].vars.currentLook='slider';
                break;
            }

            if(cgJsData[gid].vars.orderGalleries[property]=='ThumbLookOrder' && cgJsData[gid].options.general.ThumbLook=='1'){
                cgJsData[gid].vars.currentLook='thumb';
                break;
            }

            if(cgJsData[gid].vars.orderGalleries[property]=='HeightLookOrder' && cgJsData[gid].options.general.HeightLook=='1'){
                cgJsData[gid].vars.currentLook='height';
                break;
            }

            if(cgJsData[gid].vars.orderGalleries[property]=='RowLookOrder' && cgJsData[gid].options.general.RowLook=='1'){
                cgJsData[gid].vars.currentLook='height';// since 07.02.2022 row view deprecated, height view will be selected in stead if row view activated
                break;
            }

            if(cgJsData[gid].vars.orderGalleries[property]=='BlogLookOrder' && cgJsData[gid].options.visual.BlogLook=='1'){
                cgJsData[gid].vars.currentLook='blog';
                break;
            }
        }
    }


};