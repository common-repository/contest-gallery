cgJsClass.gallery.dynamicOptions = {
    checkIfStepClick: function (gid) {
        if(location.hash.indexOf('#!gallery'+gid+'/step/')!==-1){

            // Prüfen ob zu her step angegeben wurde der nicht existiert (also zu hoher step). Eigentlich nur bei init-getjson notwendig
            if(typeof gid != 'undefined'){

                var step = parseInt(location.hash.split('/')[1]);
                var PicsPerSite = parseInt(cgJsData[gid].options.general.PicsPerSite);
                var length = Object.keys(cgJsData[gid].fullImageData).length;
                var stepCheck = Math.ceil(length/PicsPerSite);
                if(step>stepCheck){
                    location.hash = '';
                    location.reload();
                    return;
                }

            }

            return location.hash.split('/')[1];

        }

        return 1;

    },
    checkUrl: function () {

        jQuery.each(cgJsClass.gallery.forms.upload,function (index,value) {

            if(value['Field_Type']=='url-f'){
                cgJsClass.gallery.options.formHasUrlField = 1;
            }

        });

    },
    cg_hide_hide_width: 0,
    check_cg_hide_hide_width: function (index) {

        if(cgJsData[index].vars.options.general.FbLikeGallery==1){cgJsData[index].vars.cg_hide_hide_width=180; cgJsData[index].vars.cgGalleryInfoWidth = 180; }
        else{cgJsData[index].vars.cg_hide_hide_width=130;cgJsData[index].vars.cgGalleryInfoWidth = 130;}

    },
    getInfoAndCategoriesFullImageData: function (gid){

        var countForArray = cgJsData[gid].vars.countAllImages-1;
        var uploadFolderUrl = cgJsData[gid].vars.uploadFolderUrl;

        for(var key in cgJsData[gid].fullImageData){

            if(!cgJsData[gid].fullImageData.hasOwnProperty(key)){
                break;
            }

            // ist schon verarbeitet, Verarbeitung nicht notwendig, continue
/*            if(key<=countForArray){
                continue;
            }*/

            var firstKey = Object.keys(cgJsData[gid].fullImageData[key])[0];
            var realId = cgJsData[gid].fullImageData[key][firstKey]['id'];

            cgJsClass.gallery.dynamicOptions.getJsonInfoData(uploadFolderUrl,gid,realId,key,firstKey);

        }

    },
    getJsonInfoData: function(uploadFolderUrl,gid,realId,key,firstKey){

        if(typeof cgJsData[gid].vars.info[realId] == 'undefined'){

            jQuery.getJSON( uploadFolderUrl+"/contest-gallery/gallery-id-"+cgJsData[gid].vars.gidReal+"/json/image-info/image-info-"+realId+".json",{_: new Date().getTime()}).done(function( data ) {

            }).done(function(data) {

                if(data==null){
                    data = [];
                }

                cgJsClass.gallery.info.collectInfo(gid,realId,data);
                cgJsClass.gallery.info.setInfo(realId,gid,false,firstKey,data,true,true);

            });

        }

    },
    getCurrentRatingAndCommentsData: function(gid){//  MUST BE NOT REQUIRED ANYMORE 21.03.2020

        //if(AllowRating==1){
        //if(cgJsData[gid].options.general.AllowRating==2 || cgJsData[gid].options.general.AllowRatingDynamic || cgJsData[gid].options.general.AllowComments>=1){
        if(cgJsData[gid].options.general.AllowRating==2 || cgJsData[gid].options.general.AllowRatingDynamic || cgJsData[gid].options.general.AllowComments>=1){
            cgJsClass.gallery.dynamicOptions.getRatingAndCommentsFullImageData(gid,true);
        }

        cgJsClass.gallery.sorting.showRandomButton(gid);

    },
    getRatingAndCommentsFullImageData: function (gid,isGetCurrentData){

        var uploadFolderUrl = cgJsData[gid].vars.uploadFolderUrl;

        // then get all data
        if(!isGetCurrentData){

            var countForArray = cgJsData[gid].vars.countAllImages-1;

            var length = Object.keys(cgJsData[gid].fullImageData).length;
            var i = 1;
            for(var key in cgJsData[gid].fullImageData){

                if(!cgJsData[gid].fullImageData.hasOwnProperty(key)){
                    break;
                }

                // ist schon verarbeitet, Verarbeitung nicht notwendig, continue
                /*            if(key<=countForArray){
                                continue;
                            }*/


                var firstKey = Object.keys(cgJsData[gid].fullImageData[key])[0];
                var realId = cgJsData[gid].fullImageData[key][firstKey]['id'];

                cgJsClass.gallery.dynamicOptions.getJsonImageData(uploadFolderUrl,gid,realId,key,firstKey);

                if(i==length){
                    cgJsData[gid].vars.lastRealIdInFullImageDataObject = realId;
                }
                i++;
            }

        }else{// then get only current step data isGetCurrentData

            for(var key in cgJsData[gid].image){

                if(!cgJsData[gid].image.hasOwnProperty(key)){
                    break;
                }

                var firstKey = Object.keys(cgJsData[gid].image[key])[0];
                var realId = cgJsData[gid].image[key][firstKey]['id'];

                cgJsClass.gallery.dynamicOptions.getJsonImageData(uploadFolderUrl,gid,realId,key,firstKey);

            }


        }


    },
    getJsonImageData: function(uploadFolderUrl,gid,realId,arrIndex,objectKey){

        jQuery.getJSON( uploadFolderUrl+"/contest-gallery/gallery-id-"+cgJsData[gid].vars.gidReal+"/json/image-data/image-data-"+realId+".json",{_: new Date().getTime()}).done(function( data ) {

        }).done(function(data) {

            // has to be set here, because was not set in php. Also image Object has to be reset on some places.
            data.id = realId;
            data.imageObject = cgJsData[gid].imageObject[realId];

            if(data['rThumb']=='90' || data['rThumb']=='270'){
                var Width = data['Width'];
                var Height = data['Height'];
                data['Width'] = Height;
                data['Height'] = Width;
            }

            var AllowComments = cgJsData[gid].options.general.AllowComments;

            data = cgJsClass.gallery.dynamicOptions.configureRatingAndCommentsNumbers(gid,realId,data);

            if(data.hasOwnProperty('Exif')){

                cgJsData[gid].vars.rawData[realId]['Exif'] = data.Exif;
            }else{
                cgJsData[gid].vars.rawData[realId]['Exif'] = 0;
            }

            if(AllowComments>=1){
                var countCtoReview = (data.CountCtoReview) ? parseInt(data.CountCtoReview): 0;
                data.CountC = (isNaN(data.CountC) || typeof data.CountC == 'undefined') ? 0 : parseInt(data.CountC);
                data.CountC = data.CountC - countCtoReview;
                cgJsData[gid].rateAndCommentNumbers[realId] = data;
            //    cgJsData[gid].fullImageData[arrIndex][objectKey]['CountC'] = data['CountC'];
            }

            cgJsClass.gallery.function.general.tools.modifyFullImageData(gid,realId,data);

            if(cgJsData[gid].vars.lastRealIdInFullImageDataObject==realId){
                cgJsClass.gallery.sorting.showRandomButton(gid);
            }

        });


    },
    getRatingAndComments: function (realId,arrIndex,objectKey,gid,calledFromUpload){

        if(cgJsData[gid].options.general.AllowRating>=1 || cgJsData[gid].options.general.AllowComments>=1 || cgJsData[gid].options.general.FbLike>=1){

            var uploadFolderUrl = cgJsData[gid].vars.uploadFolderUrl;
            cgJsData[gid].vars.getJson.push(jQuery.getJSON( uploadFolderUrl+"/contest-gallery/gallery-id-"+cgJsData[gid].vars.gidReal+"/json/image-data/image-data-"+realId+".json",{_: new Date().getTime()}).done(function(data) {

                // has to be set here, because was not set in php. Also image Object has to be reset on some places.
                data.id = realId;
                data.imageObject = cgJsData[gid].imageObject[realId];

                var AllowRating = cgJsData[gid].options.general.AllowRating;
                var AllowComments = cgJsData[gid].options.general.AllowComments;
                var FbLike = cgJsData[gid].options.general.FbLike;

                if(data.hasOwnProperty('Exif')){
                    cgJsData[gid].vars.rawData[realId]['Exif'] = data.Exif;
                }else{
                    cgJsData[gid].vars.rawData[realId]['Exif'] = 0;
                }

                data = cgJsClass.gallery.dynamicOptions.configureRatingAndCommentsNumbers(gid,realId,data);

                if(AllowComments>=1){
                    var countCtoReview = (data.CountCtoReview) ? parseInt(data.CountCtoReview): 0;
                    data.CountC = (isNaN(data.CountC) || typeof data.CountC == 'undefined') ? 0 : parseInt(data.CountC);
                    data.CountC = data.CountC - countCtoReview;
                    cgJsData[gid].rateAndCommentNumbers[realId] = data;
                }

                // full image data has to be modifiyed exactly here!!!!
                cgJsClass.gallery.function.general.tools.modifyFullImageData(gid,realId,data);

                //if(AllowRating==1){
                if(cgJsData[gid].options.general.AllowRatingDynamic){
                    cgJsClass.gallery.rating.setRatingFiveStar(realId,0,0,true,gid);
                }

                if(AllowRating==2){
                    cgJsClass.gallery.rating.setRatingOneStar(realId,0,true,gid);
                }

                if(AllowComments>=1){
                    cgJsClass.gallery.comment.setComment(realId,0,gid);
                }

                if(FbLike==1){
                    cgJsClass.gallery.fbLike.setFbLike(realId,arrIndex, objectKey,gid,calledFromUpload);
                }

                if(cgJsData[gid].vars.galleryLoaded == false){
                    var counterCheck = arrIndex+1;
                    if(cgJsData[gid].vars.countAllImages == counterCheck){
                        cgJsData[gid].vars.galleryLoaded = true;
                    }
                }


            }));
        }

    },
    configureRatingAndCommentsNumbers:function(gid,realId,data){

        if(realId==301){
            //debugger
        }
        cgJsClass.gallery.vars.ratingAndCommentsProperties.forEach(function (property){
            data[property] = (isNaN(data[property])) ? 0 : data[property];
        });

        var AllowRating = cgJsData[gid].options.general.AllowRating;
        var AllowComments = cgJsData[gid].options.general.AllowComments;
        var Manipulate = cgJsData[gid].options.pro.Manipulate;
        var ShowOnlyUsersVotes = cgJsData[gid].options.general.ShowOnlyUsersVotes;
        var CheckLogin = cgJsData[gid].options.general.CheckLogin; // allow only registred uses to vote

        if(!cgJsData[gid].rateAndCommentNumbers[realId]){
            cgJsData[gid].rateAndCommentNumbers[realId] = {};
        }

        //if(AllowRating==1){
        if(cgJsData[gid].options.general.AllowRatingDynamic){

            if(Manipulate==0){
                for(var rCount=1;rCount<=cgJsData[gid].options.general.AllowRatingDynamic;rCount++){
                    eval('data.addCountR' + rCount + '= 0;');
                }
/*                data.addCountR1 = 0;
                data.addCountR2 = 0;
                data.addCountR3 = 0;
                data.addCountR4 = 0;
                data.addCountR5 = 0;*/
            }

            // data countR und data Rating entsprechend anpassen um später leichter sortieren und bewerten zu können.
            // Keine extra conditions später notwendig.
            if(ShowOnlyUsersVotes==1 && !cgJsData[gid].vars.isOnlyGalleryNoVoting && !cgJsData[gid].vars.isOnlyGalleryWinner){

                if (typeof cgJsData[gid].cgJsCountRuser[realId] == 'undefined') {
                    cgJsData[gid].cgJsCountRuser[realId] = 0;
                    cgJsData[gid].cgJsRatingUser[realId] = 0;
                    data['CountR'] = cgJsData[gid].cgJsCountRuser[realId];
                    data['Rating'] = cgJsData[gid].cgJsRatingUser[realId];
                }
                else{
                    data['CountR']  = parseInt(cgJsData[gid].cgJsCountRuser[realId]);
                    data['Rating'] = parseInt(cgJsData[gid].cgJsRatingUser[realId]);
                }

            }
            else if(Manipulate==1 && ShowOnlyUsersVotes!=1){

                for(var rCount=1;rCount<=cgJsData[gid].options.general.AllowRatingDynamic;rCount++){
                    eval('data.addCountR' + rCount + ' = (isNaN(data.addCountR' + rCount + ')) ? 0 : parseInt(data.addCountR'+rCount+');');
                }

/*                data.addCountR1 = (isNaN(data.addCountR1)) ? 0 : parseInt(data.addCountR1);
                data.addCountR2 = (isNaN(data.addCountR2)) ? 0 : parseInt(data.addCountR2);
                data.addCountR3 = (isNaN(data.addCountR3)) ? 0 : parseInt(data.addCountR3);
                data.addCountR4 = (isNaN(data.addCountR4)) ? 0 : parseInt(data.addCountR4);
                data.addCountR5 = (isNaN(data.addCountR5)) ? 0 : parseInt(data.addCountR5);*/

            }

            if(ShowOnlyUsersVotes==1 && !cgJsData[gid].vars.isOnlyGalleryNoVoting && !cgJsData[gid].vars.isOnlyGalleryWinner){

                for(var rCount=1;rCount<=cgJsData[gid].options.general.AllowRatingDynamic;rCount++){
                    eval('data.addCountR' + rCount + ' = 0;');
                }

/*                data.addCountR1 = 0;
                data.addCountR2 = 0;
                data.addCountR3 = 0;
                data.addCountR4 = 0;
                data.addCountR5 = 0;*/

                for(var rCount=1;rCount<=cgJsData[gid].options.general.AllowRatingDynamic;rCount++){
                    eval('cgJsData[gid].cgJsCountR' + rCount + 'user[realId] = (cgJsData[gid].cgJsCountR' + rCount + 'user[realId]) ? cgJsData[gid].cgJsCountR' + rCount + 'user[realId] : 0;');
                }

                /*cgJsData[gid].cgJsCountR1user[realId] = (cgJsData[gid].cgJsCountR1user[realId]) ? cgJsData[gid].cgJsCountR1user[realId] : 0;
                cgJsData[gid].cgJsCountR2user[realId] = (cgJsData[gid].cgJsCountR2user[realId]) ? cgJsData[gid].cgJsCountR2user[realId] : 0;
                cgJsData[gid].cgJsCountR3user[realId] = (cgJsData[gid].cgJsCountR3user[realId]) ? cgJsData[gid].cgJsCountR3user[realId] : 0;
                cgJsData[gid].cgJsCountR4user[realId] = (cgJsData[gid].cgJsCountR4user[realId]) ? cgJsData[gid].cgJsCountR4user[realId] : 0;
                cgJsData[gid].cgJsCountR5user[realId] = (cgJsData[gid].cgJsCountR5user[realId]) ? cgJsData[gid].cgJsCountR5user[realId] : 0;*/

                for(var rCount=1;rCount<=cgJsData[gid].options.general.AllowRatingDynamic;rCount++){
                    eval('data.CountR' + rCount + ' = cgJsData[gid].cgJsCountR' + rCount + 'user[realId];');
                }

                /*data.CountR1 = cgJsData[gid].cgJsCountR1user[realId];
                data.CountR2 = cgJsData[gid].cgJsCountR2user[realId];
                data.CountR3 = cgJsData[gid].cgJsCountR3user[realId];
                data.CountR4 = cgJsData[gid].cgJsCountR4user[realId];
                data.CountR5 = cgJsData[gid].cgJsCountR5user[realId];*/

            }

            // ORDER IMPORTANT HERE!!!!!
            data.CountRtotal = cgJsClass.gallery.rating.getCountRtotal(gid,data);
            //data.CountRsum = cgJsClass.gallery.rating.getCountRsum(gid,data);
            data.RatingTotal  = cgJsClass.gallery.rating.getRatingTotal(gid,data,realId);

/*            if(realId==61){
                debugger
            }*/

            data.RatingAverage = cgJsClass.gallery.rating.getAverage(gid,data);
            data.RatingAverageForSecondarySorting = cgJsClass.gallery.rating.getAverageForSecondarySorting(gid,data);
            data.RatingTotalForSecondarySorting = cgJsClass.gallery.rating.getRatingTotalForSecondarySorting(gid,data);
            //data.CountRsumForSecondarySorting = cgJsClass.gallery.rating.getRatingTotalForSecondarySorting(gid,data);

            var dataForRating = {};

            dataForRating.CountRtotal = data.CountRtotal;
            dataForRating.RatingTotal = data.RatingTotal;
            dataForRating.RatingAverage = data.RatingAverage;
            dataForRating.RatingAverageForSecondarySorting = data.RatingAverageForSecondarySorting;
            dataForRating.RatingTotalForSecondarySorting = data.RatingTotalForSecondarySorting;
            dataForRating.CountR = data.CountR;
            dataForRating.Rating = data.Rating;

            for(var rCount=1;rCount<=cgJsData[gid].options.general.AllowRatingDynamic;rCount++){
                eval('dataForRating.CountR' + rCount + ' = (isNaN(data.CountR' + rCount + ')) ? 0 : data.CountR' + rCount + ';');
            }
/*            dataForRating.CountR1 = (isNaN(data.CountR1)) ? 0 : data.CountR1;
            dataForRating.CountR2 = (isNaN(data.CountR2)) ? 0 : data.CountR2;
            dataForRating.CountR3 = (isNaN(data.CountR3)) ? 0 : data.CountR3;
            dataForRating.CountR4 = (isNaN(data.CountR4)) ? 0 : data.CountR4;
            dataForRating.CountR5 = (isNaN(data.CountR5)) ? 0 : data.CountR5;*/

            for(var rCount=1;rCount<=cgJsData[gid].options.general.AllowRatingDynamic;rCount++){
                eval('dataForRating.addCountR' + rCount + ' = data.addCountR' + rCount + ';');
            }

            /*dataForRating.addCountR1 = data.addCountR1;
            dataForRating.addCountR2 = data.addCountR2;
            dataForRating.addCountR3 = data.addCountR3;
            dataForRating.addCountR4 = data.addCountR4;
            dataForRating.addCountR5 = data.addCountR5;*/

            // ab hier dann data weiter vergeben
            cgJsData[gid].rateAndCommentNumbers[realId] = dataForRating;

        }

        if(AllowRating==2){

            // data countS entsprechend anpassen um später leichter sortieren und bewerten zu können.
            // Keine extra conditions später notwendig.
            if(ShowOnlyUsersVotes==1 && !cgJsData[gid].vars.isOnlyGalleryNoVoting && !cgJsData[gid].vars.isOnlyGalleryWinner){

                if (typeof cgJsData[gid].cgJsCountSuser[realId] == 'undefined') {
                    cgJsData[gid].cgJsCountSuser[realId] = 0;
                    data['CountS'] = cgJsData[gid].cgJsCountSuser[realId];
                }
                else{
                    data['CountS']  = parseInt(cgJsData[gid].cgJsCountSuser[realId]);
                }

            }
            else if(Manipulate==1 && ShowOnlyUsersVotes!=1){

                var addCountS = parseInt(data.addCountS);
                data['CountS'] = parseInt(data['CountS']) + addCountS;

            }

            var dataForRating = {};

            dataForRating.CountS = data.CountS;
            dataForRating.addCountS = data.addCountS;

            // ab hier dann data weiter vergeben
            cgJsData[gid].rateAndCommentNumbers[realId] = dataForRating;

        }

        if(realId == 107){
         //   console.trace();
         //   debugger
        }

       // Do not forget to add comments data here!!!
        if(AllowComments>=1){
            var countCtoReview = (data.CountCtoReview) ? parseInt(data.CountCtoReview) : 0;
            cgJsData[gid].rateAndCommentNumbers[realId].CountC = parseInt(data.CountC) - countCtoReview;
/*            if(cgJsData[gid].jsonCommentsData && cgJsData[gid].jsonCommentsData[realId] && Object.keys(cgJsData[gid].jsonCommentsData[realId]).length){
                var countCtoReview = (data.CountCtoReview) ? parseInt(data.CountCtoReview) : 0;
                cgJsData[gid].rateAndCommentNumbers[realId].CountC = parseInt(Object.keys(cgJsData[gid].jsonCommentsData[realId]).length) - countCtoReview;
            }*/
        }

        return data;

    },
    setRatingAndComments: function(realId,arrIndex,objectKey,gid,calledFromUpload){

        var AllowRating = cgJsData[gid].options.general.AllowRating;
        var AllowComments = cgJsData[gid].options.general.AllowComments;
        var FbLike = cgJsData[gid].options.general.FbLike;

        //if(AllowRating==1){
        if(cgJsData[gid].options.general.AllowRatingDynamic){
            cgJsClass.gallery.rating.setRatingFiveStar(realId,0,0,true,gid);
        }

        if(AllowRating==2){
            cgJsClass.gallery.rating.setRatingOneStar(realId,0,true,gid);
        }

        if(AllowComments>=1 && cgJsData[gid].vars.currentLook!='blog'){
            cgJsClass.gallery.comment.setComment(realId,0,gid);
        }

        if(FbLike==1){
            cgJsClass.gallery.fbLike.setFbLike(realId,arrIndex, objectKey,gid,calledFromUpload);
        }

        if(cgJsData[gid].vars.isOnlyGalleryNoVoting && !cgJsData[gid].vars.RatingVisibleForGalleryNoVoting){
            // then cg_gallery_info can get cg_hide, because nothing to display there
            if(AllowComments != 1 && cgJsData[gid].options.general.FbLikeGallery!=1){
                cgJsData[gid].imageObject[realId].find('.cg_gallery_info').addClass('cg_hide');
            }
        }

    },
    setNewCountToMainImageArray: function (realId, countProperty, newCount,gid) {

        // add new value to general array. For sorting new values has to be used.
        for(var property  in cgJsData[gid].image){

            if(!cgJsData[gid].image.hasOwnProperty(property)){
                break;
            }

            var firstKey = Object.keys(cgJsData[gid].image[property])[0];

            if(cgJsData[gid].image[property][firstKey]['id']==realId){

                cgJsData[gid].image[property][firstKey][countProperty] = newCount;
                break;
            }

        }

    },
    getCurrentStep: function(gid,realId){

        if(!realId>=1){
            return 1;
        }

        // Array will be returned
        var fullImageDataToUse = cgJsClass.gallery.sorting.returnFullImageDataSorted(gid);

        var i;

        for(var index in fullImageDataToUse){

            if(!fullImageDataToUse.hasOwnProperty(index)){
                break;
            }

            // first key is rowid
            var firstKey = Object.keys(fullImageDataToUse[index])[0];
            if(fullImageDataToUse[index][firstKey]['id']==realId){i = index; break;}

        }

        // check steps
        var PicsPerSite = parseInt(cgJsData[gid].options.general.PicsPerSite);
        var step = Math.floor(i/PicsPerSite)+1;

        return step;

    },
    checkStepsCutImageData: function ($,step,initStepChange,lazy,gid,isOpenPage,calledFromUpload,viewChange,isCopyUploadToAnotherGallery,isFromSearch,fullImageDataFilteredToTake){

        if(cgJsData[gid].options.general.SliderLook==23){// not required in the moment 23.06.2019

            cgJsClass.gallery.views.singleViewFunctions.setFurtherSteps(gid,1);
            cgJsClass.gallery.views.initOrderGallery(gid,null,null,null,true,null);

        }else{

              var $mainCGdiv = $('#mainCGdiv'+gid);
            $mainCGdiv.find('.cg_further_images_container').addClass('cg_hide');

          //  if(typeof initStepChange === 'undefined' || initStepChange == false){
               // cgJsData[gid].vars.stepsNavigationTop = $('#mainCGdiv'+gid).find('#cgFurtherImagesContainerDiv'+gid);
        //    }

            if(typeof cgJsData[gid].vars.stepsNavigationTop == 'undefined'){
                cgJsData[gid].vars.stepsNavigationTop = $mainCGdiv.find('#cgFurtherImagesContainerDiv'+gid);
            }

            if(fullImageDataFilteredToTake){
                var lengthData = Object.keys(fullImageDataFilteredToTake).length;
            }else{
                var lengthData = Object.keys(cgJsData[gid].fullImageDataFiltered).length;
            }
            cgJsData[gid].vars.lengthData = lengthData;

            if(lengthData==0 && isFromSearch){
                cgJsData[gid].vars.cgNoImagesFound.removeClass('cg_hide');
                cgJsData[gid].vars.mainCGallery.find('.cgCenterDiv').addClass('cg_hide');
                cgJsData[gid].vars.mainCGdiv.find('.cg_further_images_container').addClass('cg_hide');
            }else{
                cgJsData[gid].vars.mainCGdiv.find('.mainCGdivFullWindowConfigurationAreaSub .cg_further_images_and_top_controls_container .cgNoEntriesFound').remove();
            }

            if(lengthData!=0 && isFromSearch){
                cgJsData[gid].vars.cgNoImagesFound.addClass('cg_hide');
            }

            var stepsNavigationTop = cgJsData[gid].vars.stepsNavigationTop;
            stepsNavigationTop.find('*').not('.cg_further_images_container_position_helper').remove();
            var $hiddenNav = jQuery('<div class="cg_further_images_hidden_nav cg_hide"></div>');
            stepsNavigationTop.prepend($hiddenNav);

            var  $divSelectOptions = $('<div class="cg_further_images_select_div cg_hide"><select class="cg_further_images_select" data-cg-tooltip="'+cgJsClass.gallery.language[gid].SelectPage+'" data-cg-gid="'+gid+'"></select></div>');

            var  $divSelectNavigation = $('<div class="cg_further_images_select_nav_div cg_hide">' +
                '<div class="cg_further_images_select_nav_prev" data-cg-gid="'+gid+'" data-cg-tooltip="'+cgJsClass.gallery.language[gid].PreviousPage+'"></div>' +
                '<div class="cg_further_images_select_nav_current"></div>' +
                '<div class="cg_further_images_select_nav_of_language">'+cgJsClass.gallery.language[gid].of+'</div>' +
                '<div class="cg_further_images_select_nav_total" >'+lengthData+'</div>' +
                '<div class="cg_further_images_select_nav_next" data-cg-gid="'+gid+'" data-cg-tooltip="'+cgJsClass.gallery.language[gid].NextPage+'" ></div>' +
                '</div>');

            var PicsPerSite = parseInt(cgJsData[gid].options.general.PicsPerSite);
            var checkStepPicsStart = PicsPerSite*step-PicsPerSite;

            var cuttedData = [];

            var i = 1;

            var start = 1;

            var startStep = step*PicsPerSite;

            var dataCutted = false;


            var lastShortStepInserted = false;

            if(fullImageDataFilteredToTake){
                var fullImageDataToUse = fullImageDataFilteredToTake;
            }else{
            var fullImageDataToUse = cgJsClass.gallery.sorting.returnFullImageDataSorted(gid);
            }

            cgJsData[gid].vars.fullImageDataToUse = fullImageDataToUse;

            for(var property in fullImageDataToUse){

                if(!fullImageDataToUse.hasOwnProperty(property)){
                    break;
                }

                // generate further steps container always
                if(i % PicsPerSite === 0 && lastShortStepInserted!=true){

                    var stepToInsert = Math.ceil(i/PicsPerSite);

                    if(start==1){
                        var startToInsert = 1;
                    }else{
                        var startToInsert = start+1;
                    }

                    // Extra Exception hier!!!! Damit 2-2 in dem Fall angzeigt wird, statt 1-2
                    if(i==2 && PicsPerSite==1){
                        startToInsert = 2;
                    }


                    var $option = $("<option class='cg_further_images_select_option '  data-cg-gid='"+gid+"' value='"+stepToInsert+"'>"+stepToInsert+"</option>");

                    $divSelectOptions.find('select').append($option);

                    stepsNavigationTop.find('.cg_further_images_hidden_nav').append(furtherImagesStep);

                    var furtherImagesStep = $("<div class='cg_further_images cg_hide' data-cg-gid='"+gid+"' data-cg-step='"+stepToInsert+"'></div>").text(startToInsert+"-"+i);
                    stepsNavigationTop.find('.cg_further_images_hidden_nav').append(furtherImagesStep);

                    start = i;

                    // nicht weitermachen einstellen weil letztes schon mal gesetzt wurde,
                    // sonst würde letztes zwei mal gesetzt werden

                    if(i==lengthData){
                        lastShortStepInserted = true;
                    }

                }

                // generate shorter image array now

                // continue if less then step
                if(i<=checkStepPicsStart){i++;continue;}

                if(dataCutted==false){

                    cuttedData[property] = fullImageDataToUse[property];
                }

                if(i==startStep && dataCutted==false){

                   // var count = start/PicsPerSite;

                    stepsNavigationTop.find('.cg_further_images').each(function (index) {

                        var check = index+1;

                        if(check==step){
                            $(this).addClass('cg_further_images_selected');
                            $divSelectOptions.find('option[value="'+$(this).attr('data-cg-step')+'"]').attr('selected','1');
                        }

                    });

                    dataCutted = true;

                }

                // is last
                // i+1 When total activated files amount is divisible by "Number of images per screen" (Gallery view option), then frontend pagination will be not shown.
                // i>start to be proved already in this if condition
                // if total files is seven and start is 6, then second condition be valid and is because of this required
                if(
                    i+1>=lengthData && lastShortStepInserted==false && i>start && lastShortStepInserted==false
                    ||
                    i>=lengthData && i>start && lastShortStepInserted==false
                ){
                    lastShortStepInserted = true;
                    if(i>start){

                        var lastStart = start+1;
                        var stepToInsert = start/PicsPerSite+1;

                        var $option = $("<option class='cg_further_images_select_option '  data-cg-gid='"+gid+"' value='"+stepToInsert+"'>"+stepToInsert+"</option>");

                        stepsNavigationTop.prepend($divSelectOptions);
                        stepsNavigationTop.append($divSelectNavigation);
                        $divSelectOptions.find('select').append($option);

                        var furtherImagesStep = $("<div class='cg_further_images cg_hide' data-cg-gid='"+gid+"' data-cg-step='"+stepToInsert+"'></div>").text(lastStart+"-"+i);
                        stepsNavigationTop.find('.cg_further_images_hidden_nav').append(furtherImagesStep);

                        var lengthSteps = stepsNavigationTop.find('.cg_further_images').length;

                        var count = 1;

                        stepsNavigationTop.find('.cg_further_images').each(function (index) {

                            var check = index+1;
                            if(check==1){
                                var startHowMany = check;
                                var tillHowMany = index+PicsPerSite;
                            } else if(check==lengthSteps){ // then must be last step!!!
                                var startHowMany = index*PicsPerSite+1;
                                var tillHowMany = lengthData;
                            }else{
                                var startHowMany = index*PicsPerSite+1;
                                var tillHowMany = startHowMany+PicsPerSite-1;
                            }

                            if(check==step){
                                $(this).addClass('cg_further_images_selected');
                                $divSelectOptions.find('option[value="'+$(this).attr('data-cg-step')+'"]').attr('selected','1');
                                $divSelectNavigation.find('.cg_further_images_select_nav_current').text(startHowMany+"-"+tillHowMany);

                                if(count==1){
                                    $divSelectNavigation.find('.cg_further_images_select_nav_prev').addClass('cg_further_images_select_nav_none');
                                } else if(count==lengthSteps){
                                    $divSelectNavigation.find('.cg_further_images_select_nav_next').addClass('cg_further_images_select_nav_none');
                                }

                            }

                            count++;

                        });


                       // break;

                    }

                }

                i++;


            }

            if(cgJsClass.gallery.vars.fullwindow && cgJsData[gid].vars.currentLook=='blog'){
                cgJsData[gid].vars.$mainCGdivFullWindowConfigurationAreaSub.find('.cg_further_images_and_top_controls_container').removeClass('cg_hide_override');
            }

            if(lengthData>PicsPerSite){
                $divSelectOptions.removeClass('cg_hide');
                $divSelectNavigation.removeClass('cg_hide');
                if(!cgJsClass.gallery.vars.fullwindow){
                    cgJsData[gid].vars.mainCGdiv.find('.cg_further_images_and_top_controls_container').removeClass('cg_hide');
                }
             }else{
                    if(lengthData!=0 && cgJsClass.gallery.vars.fullwindow && cgJsData[gid].vars.currentLook=='blog'){
                        $divSelectOptions.addClass('cg_hide');
                        $divSelectNavigation.find('.cg_further_images_select_nav_current').text('1');
                        $divSelectNavigation.find('.cg_further_images_select_nav_prev').addClass('cg_further_images_select_nav_none');
                        $divSelectNavigation.find('.cg_further_images_select_nav_next').addClass('cg_further_images_select_nav_none');
                        $divSelectNavigation.removeClass('cg_hide');
                        cgJsData[gid].vars.$mainCGdivFullWindowConfigurationAreaSub.find('.cg_further_images_and_top_controls_container').addClass('cg_hide_override');
                    }
            }

            if(lengthData==0 && cgJsClass.gallery.vars.fullwindow){
                cgJsData[gid].vars.$mainCGdivFullWindowConfigurationAreaSub.find('.cg_further_images_and_top_controls_container').addClass('cg_no_entries_found');
                cgJsData[gid].vars.$mainCGdivFullWindowConfigurationAreaSub.find('.cg_further_images_and_top_controls_container .cgNoEntriesFound').remove();
                cgJsData[gid].vars.$mainCGdivFullWindowConfigurationAreaSub.find('.cg_further_images_and_top_controls_container').prepend('<div class="cgNoEntriesFound">'+cgJsClass.gallery.language[gid].NoEntriesFound+'</div>');
            }

            if(lengthData!=0 && cgJsClass.gallery.vars.fullwindow){
                cgJsData[gid].vars.$mainCGdivFullWindowConfigurationAreaSub.find('.cg_further_images_and_top_controls_container').removeClass('cg_no_entries_found');
            }

            if(cgJsClass.gallery.vars.fullwindow && cgJsData[gid].vars.currentLook=='blog'){
                cgJsData[gid].vars.$mainCGdivFullWindowConfigurationAreaSub.find('.cg_further_images_container').replaceWith(
                    stepsNavigationTop.clone().removeClass('cg_hide')
                );
                if(lengthData==0){
                    cgJsData[gid].vars.cgNoImagesFound.removeClass('cg_hide');
                    cgJsData[gid].vars.mainCGallery.find('.cgCenterDiv').addClass('cg_hide');
                    cgJsData[gid].vars.mainCGdiv.find('.cg_further_images_container').addClass('cg_hide');
                }else{
                    cgJsData[gid].vars.$mainCGdivFullWindowConfigurationAreaSub.find('.cg_further_images_and_top_controls_container .cgNoEntriesFound').remove();
                }
            }

            var cuttedDataSorted = [];

            var i = 0;
            for(var index in cuttedData){

                if(!cuttedData.hasOwnProperty(index)){
                    break;
                }

                if(initStepChange===true){
                var firstKey = Object.keys(cuttedData[index])[0];
                    delete cuttedData[index][firstKey]['imageObject'];
                }
                cuttedDataSorted[i] = cuttedData[index];
                i++;

            }

            var sliderView = false;

            if(cgJsData[gid].vars.currentLook=='slider'){
                sliderView = true;
                if(fullImageDataFilteredToTake){
                    cgJsData[gid].image = fullImageDataFilteredToTake;
                }else{
                cgJsClass.gallery.views.switchView.sortViewSlider(gid);
                }
            }else{
                cgJsData[gid].image = cuttedDataSorted;
                cgJsData[gid].steps[step] = cuttedDataSorted;
            }

            if(lazy === false){
                $mainCGdiv.find('#mainCGallery'+gid).find('.cg_show').remove();
            }

            if(sliderView){
                $mainCGdiv.find('.cg_further_images_container').addClass('cg_hide');
            }else{
                var $cg_further_images_container = $mainCGdiv.find('.cg_further_images_container').first();
                    $cg_further_images_container.removeClass('cg_hide');
                cgJsData[gid].vars.$cg_further_images_container_top = $cg_further_images_container;
                cgJsClass.gallery.views.clickFurtherImagesStep.cloneStep(gid,$cg_further_images_container,false);
            }
            //console.trace();
            //debugger

            if(initStepChange===true){
          //      debugger
                cgJsClass.gallery.views.initOrderGallery(gid,isOpenPage,calledFromUpload,true,null,viewChange,false,sliderView,isCopyUploadToAnotherGallery,false,true);
            }

            if(lengthData == 0 && cgJsClass.gallery.vars.fullwindow && (cgJsData[gid].vars.currentLook=='blog' || cgJsData[gid].vars.currentLook=='slider')){
                cgJsData[gid].vars.mainCGdivFullWindowConfigurationButton.text(0);
            }

        }

    },
    setCookie: function (gid,cookieName,cookieId) {
        var d = new Date;
        var expTime = d.getTime() + 20 * 365 * 24 * 60 * 60 *1000; // *1000 wegen microsekunden
        d.setTime(expTime);
        document.cookie = cookieName + "=" + cookieId + ";path=/;expires=" + d.toGMTString();
    },
    getCookie: function (cookieName) {
        var v = document.cookie.match('(^|;) ?' + cookieName + '=([^;]*)(;|$)');
        var toReturn = v ? v[2] : null;
        if(toReturn!=null){
            cgJsClass.gallery.vars.cookiesNotAllowed = false;
        }

        if(typeof toReturn=='string'){
            if(toReturn=='undefined'){
                toReturn = undefined;
            }else if(toReturn.toLowerCase()=='null'){
                toReturn = null;
            }
        }

        return toReturn;
    }
};
