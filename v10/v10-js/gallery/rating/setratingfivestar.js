// Reihenfolge der Funktionen beachten!!!
cgJsClass.gallery.rating.setStars = function(average,gid){

    // pauschal alle auf off setzen am Anfang

    var stars = {};

    for(var rCount=1;rCount<=cgJsData[gid].options.general.AllowRatingDynamic;rCount++){
        eval("stars.star"+rCount+" = 'cg_gallery_rating_div_one_star_off';");
    }

    /*    stars.star1 = 'cg_gallery_rating_div_one_star_off';
        stars.star2 = 'cg_gallery_rating_div_one_star_off';
        stars.star3 = 'cg_gallery_rating_div_one_star_off';
        stars.star4 = 'cg_gallery_rating_div_one_star_off';
        stars.star5 = 'cg_gallery_rating_div_one_star_off';*/

    for(var rCount=1;rCount<=cgJsData[gid].options.general.AllowRatingDynamic;rCount++){
        var rCountPlusOne = rCount+1;
        var rCountMinusOne = rCount-1;
        if(rCount==1){
            eval("if(average>="+rCount+"){stars.star"+rCount+" = 'cg_gallery_rating_div_one_star_on'}");
            eval("if(average>="+rCount+".25 && average<"+rCount+".75){stars.star"+rCountPlusOne+" = 'cg_gallery_rating_div_one_star_half_off'}");
        }else{
            if(rCount+1!=cgJsData[gid].options.general.AllowRatingDynamic){
                eval("if(average>="+rCountMinusOne+".75){stars.star"+rCount+" = 'cg_gallery_rating_div_one_star_on'}");
                eval("if(average>="+rCount+".25 && average<"+rCount+".75){stars.star"+rCountPlusOne+" = 'cg_gallery_rating_div_one_star_half_off'}");
            }else{// then must be last one!
                eval("if(average>="+rCountMinusOne+".75){stars.star"+rCount+" = 'cg_gallery_rating_div_one_star_on'}");
            }
        }
    }

    /*    if(average>=1){stars.star1 = 'cg_gallery_rating_div_one_star_on'}
        if(average>=1.25 && average<1.75){stars.star2 = 'cg_gallery_rating_div_one_star_half_off'}

        if(average>=1.75){stars.star2 = 'cg_gallery_rating_div_one_star_on'}
        if(average>=2.25 && average<2.75){stars.star3 = 'cg_gallery_rating_div_one_star_half_off'}

        if(average>=2.75){stars.star3 = 'cg_gallery_rating_div_one_star_on'}
        if(average>=3.25 && average<3.75){stars.star4 = 'cg_gallery_rating_div_one_star_half_off'}

        if(average>=3.75){stars.star4 = 'cg_gallery_rating_div_one_star_on'}
        if(average>=4.25 && average<4.75){stars.star5 = 'cg_gallery_rating_div_one_star_half_off'}

        if(average>=4.75){stars.star5 = 'cg_gallery_rating_div_one_star_on'}*/

    return stars;

};
cgJsClass.gallery.rating.generateRatingDiv = function(realId,countR,imageObject,firstLoad,gid,stars,average,isFromSingleView,isSomeMessageWillBeShown){

    //console.trace();
    var userVoted = false;

    if(typeof cgJsData[gid].cgJsCountRuser[realId] != 'undefined'){
        if(cgJsData[gid].cgJsCountRuser[realId] > 0){
            userVoted = true;
        }
    }

    if(firstLoad == false){
        cgJsClass.gallery.dynamicOptions.setNewCountToMainImageArray(realId,'CountR',countR,gid);
    }


    var position = '';

    if(cgJsData[gid].options.general.RatingOutGallery!='1'){
        var cg_rate_out_gallery_disallowed = 'cg_rate_out_gallery_disallowed';
    }else{
        var cg_rate_out_gallery_disallowed = '';
    }

    if(cgJsData[gid].options.visual['RatingPositionGallery']==2){
        position = 'cg_center';
    }

    if(cgJsData[gid].options.visual['RatingPositionGallery']==3){
        position = 'cg_right';
    }

    var HideUntilVote = cgJsData[gid].options.general.HideUntilVote;

    /*    if(realId==215){
            debugger
        }*/

    var test = 0;
    if(cgJsData[gid].options.pro.MinusVote==1 && userVoted && !cgJsData[gid].vars.isUserGallery){

        /*        if(realId==215){
                    debugger
                    test = 1;
                }*/

        var cg_rate_minus = '<div data-cg-real-id="' + realId + '" class="cg_rate_minus cg_rate_minus_five_star" data-cg-gid="'+gid+'" data-cg-tooltip="'+cgJsClass.gallery.language[gid].UndoYourLastVote+'"></div>';
    }else{
        var cg_rate_minus = '';
    }

    if(realId == 981){
        //debugger
    }

    var ratingData = cgJsData[gid].rateAndCommentNumbers[realId];
    /*    '<div class="cg_five_star_details_average">'+ratingData['RatingAverage']+' / '+cgJsData[gid].options.general.AllowRatingDynamic+' &nbsp;(<div class="cg_five_star_details_sum_char">∑</div> '+ratingData['RatingTotal']+')</div>' +*/

    var cg_gallery_rating_div_count_hide_until_vote = '';

    if(HideUntilVote==1 && ratingData['RatingTotal']==0 && !cgJsData[gid].vars.isOnlyGalleryNoVoting && !cgJsData[gid].vars.isOnlyGalleryWinner ){
        cg_gallery_rating_div_count_hide_until_vote = 'cg_gallery_rating_div_count_hide_until_vote';
    }

    var cg_rate_star_five_star_hide_until_vote = '';

    if(HideUntilVote==1 && ratingData['RatingTotal']==0 && !cgJsData[gid].vars.isOnlyGalleryNoVoting && !cgJsData[gid].vars.isOnlyGalleryWinner ){
        cg_rate_star_five_star_hide_until_vote = 'cg_rate_star_five_star_hide_until_vote';
    }

    var $ratingDivChild = jQuery(
        '<div class="cg_gallery_rating_div_star_container">'+
        '<div class="cg_gallery_rating_div_star" data-cg-tooltip="'+cgJsClass.gallery.language[gid].VoteNow+'" data-cg-gid="' + gid + '" >' +
        '</div>' +
        // '<div id="rating_cg-' + realId + '" class="cg_gallery_rating_div_count"> x' + countR + '  ('+ratingData['RatingAverage']+' / '+cgJsData[gid].options.general.AllowRatingDynamic+') </div>' +
        '<div id="rating_cg-' + realId + '" class="cg_gallery_rating_div_count '+cg_gallery_rating_div_count_hide_until_vote+'"> '+
        ((ratingData['RatingTotal']==0 && HideUntilVote) ? '' : ratingData['RatingTotal'])+' </div><div class="cg_voted_confirm" data-cg-tooltip="'+((cgJsData[gid].vars.rawData[realId].MultipleFilesParsed) ? cgJsClass.gallery.language[gid].YouHaveAlreadyVotedThisPicture : cgJsClass.gallery.language[gid].YouHaveAlreadyVotedThisPicture)+'"></div>' +
        cg_rate_minus+
        '</div>'
    );

    /*    if(test){
            debugger
        }*/

    var divStringStars = '';
    for(var rCount=1;rCount<=cgJsData[gid].options.general.AllowRatingDynamic;rCount++){
        var starsObjectString = eval('stars.star'+rCount);
        eval("var string = 'data-cg_rate_star=\"' + rCount + '\" data-cg-gid=\"' + gid + '\"  class=\"cg_rate_star cg_rate_star_five_star cg_gallery_rating_div_star_one_star '+ starsObjectString +' '+cg_rate_out_gallery_disallowed+'\" data-cg-real-id=\"' + realId + '\"'");
        divStringStars = divStringStars + '<div '+string+' ></div>';
        //$ratingDivChild.append($div);
    }

    if(ratingData['RatingTotal']>0){
        var $div = jQuery('<div data-cg_rate_star="1" data-cg-gid="' + gid + '"  class="cg_rate_star cg_rate_star_five_star '+cg_rate_star_five_star_hide_until_vote+' cg_gallery_rating_div_star_one_star cg_gallery_rating_div_one_star_on '+cg_rate_out_gallery_disallowed+'" data-cg-real-id="' + realId + '"></div>');
    }else{
        var $div = jQuery('<div data-cg_rate_star="0" data-cg-gid="' + gid + '"  class="cg_rate_star cg_rate_star_five_star '+cg_rate_star_five_star_hide_until_vote+' cg_gallery_rating_div_star_one_star cg_gallery_rating_div_one_star_off '+cg_rate_out_gallery_disallowed+'" data-cg-real-id="' + realId + '"></div>');
    }

    /*    if(test){
            debugger
        }*/

    $div.insertAfter($ratingDivChild.find('.cg_gallery_rating_div_star'));

    if(cgJsData[gid].options.pro.IsModernFiveStar==1){

        for(var rCount=1;rCount<=cgJsData[gid].options.general.AllowRatingDynamic;rCount++){
            eval("var percentageR"+rCount+" = (ratingData['CountR"+rCount+"']==0 && ratingData['addCountR"+rCount+"']==0) ? 0 : Math.round((parseInt(ratingData['CountR"+rCount+"'])+parseInt(ratingData['addCountR"+rCount+"']))*100/parseInt(ratingData['CountRtotal']));");
        }

        var cg_hide = 'cg_hide';

        var $ratingDivChildShowOnHover = jQuery('<div class="cg_gallery_rating_div_star_hover">^</div>' +
            '<div class="cg_gallery_rating_div_five_star_details '+cg_hide+'" data-cg-gid="'+gid+'" data-cg-real-id="'+realId+'" id="cgDetails'+realId+'">' +
            '<div class="cg_gallery_rating_div_five_star_details_close_button"></div>' +
            '<span class="cg_five_star_details_to_insert_orientation"></span>' +
            /*            '<div class="cg_five_star_details_average"> '+countR+'  '+ratingData['RatingAverage']+' / '+cgJsData[gid].options.general.AllowRatingDynamic+' &nbsp;(<div class="cg_five_star_details_sum_char">∑</div> '+ratingData['RatingTotal']+')</div>' +*/
            '<div class="cg_five_star_details_arrow_up">' +
            '</div>' +
            '</div>'
        );

        var divString = '';
        for(var rCount=cgJsData[gid].options.general.AllowRatingDynamic;rCount>=1;rCount--){
            var percentageString = eval('percentageR'+rCount);
            divString = divString + '<div class="cg_five_star_details_row">' +
                '<div class="cg_five_star_details_row_number">'+rCount+'</div><div class="cg_five_star_details_row_star"></div>' +
                '<div class="cg_five_star_details_row_number_count">'+cgJsClass.gallery.rating.getCountRpart(gid,ratingData,rCount)+'</div>' +
                '<div class="cg_five_star_details_row_number_equal">=</div>' +
                '<div class="cg_five_star_details_row_number_rating">'+cgJsClass.gallery.rating.getRatingTotalPart(gid,ratingData,rCount)+'</div>' +
                '<div class="cg_five_star_details_row_number_rating_plus cg_hide" data-cg-r-count="'+rCount+'"></div>' +
                //'<div class="cg_five_star_details_row_progress"><progress value="'+percentageString+'" max="100"></progress></div>' +
                //'<div class="cg_five_star_details_row_percentage">'+percentageString+'%</div>' +
                '</div>';
        }

        jQuery(divString).insertBefore($ratingDivChildShowOnHover.find('.cg_five_star_details_to_insert_orientation').first());

    }


    if(!imageObject && !cgJsData[gid].vars.currentLook=='blog'){ // then must be not loaded on same gallery with same id like user gallery for example. It has to be found in dom then.
        imageObject = cgJsData[gid].vars.mainCGallery.find('#cg_show'+realId);
        if(imageObject.length==0){// then simply not existing in dome, nothing has to be done
            return;
        }
    }

    var $cg_pointer_events_none = '';

    // since 15.0.3 should be clickable and voting overview visible
/*    if(cgJsData[gid].vars.isOnlyGalleryNoVoting){
        $cg_pointer_events_none = 'cg_pointer_events_none';
    }*/

    var cg_already_voted = '';

    if(cgJsData[gid].cgJsCountRuser && cgJsData[gid].cgJsCountRuser[realId]){
        cg_already_voted = 'cg_already_voted';
    }

    var ratingDivString = '<div class="cg_gallery_rating_div cg_gallery_rating_div_five_stars '+$cg_pointer_events_none+'" id="cg_gallery_rating_div' + realId + '">' +
        '<div class="cg_gallery_rating_div_child '+cg_already_voted+' cg_gallery_rating_div_child_five_star '+position+'" id="cg_gallery_rating_div_child' + realId + '" data-cg-gid="'+gid+'" data-cg-real-id="'+realId+'">' +
        '</div>'+
        '</div>';


    if(imageObject){

        var ratingDivContainerGallery = imageObject.find('.cg_gallery_info_rating_comments');

        ratingDivContainerGallery.find('.cg_gallery_rating_div').remove();

        ratingDivContainerGallery.prepend(ratingDivString);

        ratingDivContainerGallery.find('.cg_gallery_rating_div_child').removeClass('cg-lds-dual-ring-star-loading').append($ratingDivChild.clone().html()).find('.cg_gallery_rating_div_count').prepend($ratingDivChildShowOnHover.clone());

        ratingDivContainerGallery.find('.cg_gallery_rating_div_five_star_details').prepend(jQuery('<div class="cg_gallery_rating_overview">'+divStringStars+'</div>'));

        if(cgJsData[gid].cgJsCountRuser && cgJsData[gid].cgJsCountRuser[realId]){
            imageObject.find('.cg_gallery_rating_div_child').addClass('cg_already_voted');
        }else{
            imageObject.find('.cg_gallery_rating_div_child').removeClass('cg_already_voted');
        }

    }

    if(cgJsData[gid].vars.currentLook=='blog' || cgJsData[gid].vars.currentLook=='slider' || cgJsData[gid].vars.openedRealId){
        if(cgJsData[gid].vars.currentLook=='blog'){
            var cgCenterDiv = cgJsData[gid].cgCenterDivBlogObject[realId];
        }else{
            var cgCenterDiv = cgJsData[gid].vars.cgCenterDiv;
        }
        var ratingDivContainer = cgCenterDiv.find('.cg-center-image-rating-div');
        ratingDivContainer.find('.cg_gallery_rating_div').remove();
        ratingDivContainer.append(ratingDivString);
        ratingDivContainer.find('.cg_gallery_rating_div_child').removeClass('cg-lds-dual-ring-star-loading').append($ratingDivChild.html()).find('.cg_gallery_rating_div_count').prepend($ratingDivChildShowOnHover);
        ratingDivContainer.find('.cg_gallery_rating_div_five_star_details').prepend(jQuery('<div class="cg_gallery_rating_overview">'+divStringStars+'</div>'));
    }

};
cgJsClass.gallery.rating.setRatingFiveStarSameGalleryId = function (realId, addVoteR,ratingAdd,firstLoad,gid,allVotesUsed,VotesInTimeExceeded,ratingFileData,isFromSingleView,isSetUserVoteToNull) {

    var realGid = cgJsData[gid].vars.realGid;

    cgJsClass.gallery.vars.$cgLoadedIds.each(function (){
        if(jQuery(this).attr('data-cg-real-gid') != realGid){return;}
        if(jQuery(this).attr('data-cg-short') == 'uf' || jQuery(this).attr('data-cg-short') == 'uc'){return;}
        if(jQuery(this).attr('data-cg-gid') == gid){return;}
        cgJsClass.gallery.views.close(jQuery(this).attr('data-cg-gid'));
        cgJsClass.gallery.rating.setRatingFiveStar(realId, addVoteR,ratingAdd,firstLoad,jQuery(this).attr('data-cg-gid'),allVotesUsed,VotesInTimeExceeded,ratingFileData,isFromSingleView,isSetUserVoteToNull,true);
    });

    return;

// check if further galleries exists which have to be update user or normal, both ways
    if(String(gid).indexOf('-u')>=0){// then must be user gallery, check for normal gallery then
        return; // it can't be voted in user gallery
    }
    if(String(gid).indexOf('-u')==-1){// then must be normal gallery, check for user and winner gallery then
        var gidToCheck = gid+'-u';
        // then gallery must be existing
        if(cgJsData[gidToCheck]){
            cgJsClass.gallery.views.close(gidToCheck);
            cgJsClass.gallery.rating.setRatingFiveStar(realId, addVoteR,ratingAdd,firstLoad,gidToCheck,allVotesUsed,VotesInTimeExceeded,ratingFileData,isFromSingleView,isSetUserVoteToNull,true);
        }

        var gidToCheck = gid+'-w';
        // then gallery must be existing
        if(cgJsData[gidToCheck]){
            cgJsClass.gallery.views.close(gidToCheck);
            cgJsClass.gallery.rating.setRatingFiveStar(realId, addVoteR,ratingAdd,firstLoad,gidToCheck,allVotesUsed,VotesInTimeExceeded,ratingFileData,isFromSingleView,isSetUserVoteToNull,true);
        }
    }

};
cgJsClass.gallery.rating.setRatingFiveStar = function (realId, addVoteR,ratingAdd,firstLoad,gid,allVotesUsed,VotesInTimeExceeded,ratingFileData,isFromSingleView,isSetUserVoteToNull,isSetFromSameGalleryId,isSomeMessageWillBeShown) {

    if(cgJsData[gid].vars.isOnlyGalleryNoVoting && !cgJsData[gid].vars.RatingVisibleForGalleryNoVoting){
        return;
    }

    // might happen when for example winner shortcode ist also on the page but without this realId (image)
    if(!cgJsData[gid].vars.rawData[realId]){
        return;
    }

    if(isFromSingleView=='false'){
        isFromSingleView = false;
    }

    if(isSetUserVoteToNull){
        cgJsData[gid].cgJsCountRuser[realId] = 0;
    }

    var onlyLoggedInUserImages = false;
    if(typeof cgJsData[gid].onlyLoggedInUserImages != 'undefined'){
        onlyLoggedInUserImages = true;
    }

    var imageObject = cgJsData[gid].imageObject[realId];
    var CheckLogin = cgJsData[gid].options.general.CheckLogin; // allow only registred uses to vote
    var ShowOnlyUsersVotes = cgJsData[gid].options.general.ShowOnlyUsersVotes;
    var HideUntilVote = cgJsData[gid].options.general.HideUntilVote;
    var Manipulate = cgJsData[gid].options.pro.Manipulate;
    var MinusVote = cgJsData[gid].options.pro.MinusVote;
    var data;

    //if(!ratingFileData){
    data = cgJsData[gid].rateAndCommentNumbers[realId];
    /*    }else{
            data = ratingFileData;
            cgJsData[gid].rateAndCommentNumbers[realId] = data;
        }*/

    if(realId == 216){
        //console.trace();
        //debugger
    }

    if(parseInt(ratingAdd)){
        ratingAdd = parseInt(ratingAdd);
        data.CountR = data.CountR+addVoteR;// might also be minus!
        data.CountRtotal = data.CountRtotal+addVoteR;// might also be minus!
        if(ratingAdd==1){data.CountR1 = data.CountR1+1;}
        if(ratingAdd==2){data.CountR2 = data.CountR2+1;}
        if(ratingAdd==3){data.CountR3 = data.CountR3+1;}
        if(ratingAdd==4){data.CountR4 = data.CountR4+1;}
        if(ratingAdd==5){data.CountR5 = data.CountR5+1;}
        if(ratingAdd==6){data.CountR6 = data.CountR6+1;}
        if(ratingAdd==7){data.CountR7 = data.CountR7+1}
        if(ratingAdd==8){data.CountR8= data.CountR8+1;}
        if(ratingAdd==9){data.CountR9 = data.CountR9+1;}
        if(ratingAdd==10){data.CountR10 = data.CountR10+1;}
        if(ratingAdd==-1){data.CountR1 = data.CountR1-1;}
        if(ratingAdd==-2){data.CountR2 = data.CountR2-1;}
        if(ratingAdd==-3){data.CountR3 = data.CountR3-1;}
        if(ratingAdd==-4){data.CountR4 = data.CountR4-1;}
        if(ratingAdd==-5){data.CountR5 = data.CountR5-1;}
        if(ratingAdd==-6){data.CountR6 = data.CountR6-1;}
        if(ratingAdd==-7){data.CountR7 = data.CountR7-1}
        if(ratingAdd==-8){data.CountR8= data.CountR8-1;}
        if(ratingAdd==-9){data.CountR9 = data.CountR9-1;}
        if(ratingAdd==-10){data.CountR10 = data.CountR10-1;}
        // will be modified there
        //data = cgJsClass.gallery.dynamicOptions.configureRatingAndCommentsNumbers(gid,realId,data);
        //cgJsData[gid].rateAndCommentNumbers[realId] = data;

        //data.CountRsum  = data.CountRtotal + ratingAdd;
        data.Rating  = data.Rating+ratingAdd;
        data.RatingTotal  = data.RatingTotal+ratingAdd;
        //data.RatingAverage = cgJsClass.gallery.rating.getAverage(gid,data);
        //data.RatingAverageForSecondarySorting = cgJsClass.gallery.rating.getAverageForSecondarySorting(gid,data);
        data.RatingTotalForSecondarySorting = cgJsClass.gallery.rating.getRatingTotalForSecondarySorting(gid,data);

        cgJsData[gid].rateAndCommentNumbers[realId] = data;

        if (typeof cgJsData[gid].cgJsCountRuser[realId] == 'undefined') {
            cgJsData[gid].cgJsCountRuser[realId] = 0;
            cgJsData[gid].cgJsRatingUser[realId] = 0;
        }

        cgJsData[gid].cgJsCountRuser[realId] = parseInt(cgJsData[gid].cgJsCountRuser[realId]) + addVoteR;
        cgJsData[gid].cgJsRatingUser[realId] = parseInt(cgJsData[gid].cgJsRatingUser[realId]) + ratingAdd;

        // simply set some average that it runs. average will be not used, but possible errors will be avoid this way
        var average = data.RatingAverage;

        // !!!IMPORTANT SORTING WILL WORK AFTER VOTING WITH THIS
        for(var key in cgJsData[gid].fullImageDataFiltered){

            if(!cgJsData[gid].fullImageDataFiltered.hasOwnProperty(key)){
                break;
            }

            var firstKey = Object.keys(cgJsData[gid].fullImageDataFiltered[key])[0];

            if(cgJsData[gid].fullImageDataFiltered[key][firstKey]['id']==realId){

                cgJsData[gid].fullImageDataFiltered[key][firstKey]['CountR'] = data.CountR;
                cgJsData[gid].fullImageDataFiltered[key][firstKey]['Rating'] = data.Rating;
                // !IMPORTANT, SET THIS HERE!!!!
                cgJsData[gid].fullImageDataFiltered[key][firstKey]['CountRtotal'] = data.CountRtotal;
                cgJsData[gid].fullImageDataFiltered[key][firstKey]['RatingAverage'] = data.RatingAverage;
                cgJsData[gid].fullImageDataFiltered[key][firstKey]['RatingTotal'] = data.RatingTotal;
                cgJsData[gid].fullImageDataFiltered[key][firstKey]['RatingAverageForSecondarySorting'] = data.RatingAverageForSecondarySorting;
                cgJsData[gid].fullImageDataFiltered[key][firstKey]['RatingTotalForSecondarySorting'] = data.RatingTotalForSecondarySorting;

                if(!ratingFileData){
                    for(var rCount=1;rCount<=cgJsData[gid].options.general.AllowRatingDynamic;rCount++){
                        eval("cgJsData[gid].fullImageDataFiltered[key][firstKey]['CountR" + rCount + "'] = data.CountR" + rCount + ";");
                    }
                    /*            cgJsData[gid].fullImageDataFiltered[key][firstKey]['CountR1'] = data.CountR1;
                    cgJsData[gid].fullImageDataFiltered[key][firstKey]['CountR2'] = data.CountR2;
                    cgJsData[gid].fullImageDataFiltered[key][firstKey]['CountR3'] = data.CountR3;
                    cgJsData[gid].fullImageDataFiltered[key][firstKey]['CountR4'] = data.CountR4;
                                cgJsData[gid].fullImageDataFiltered[key][firstKey]['CountR5'] = data.CountR5;*/
                }

                break;
            }

        }

        cgJsClass.gallery.rating.updateData(gid,cgJsData[gid].rateAndCommentNumbers,true);
        //var tstamp = parseInt(new Date().getTime())/1000;
        //cgJsClass.gallery.indexeddb.saveJsonSortValues(gid,cgJsData[gid].rateAndCommentNumbers,tstamp,true);

    }

    if(HideUntilVote == 1 && allVotesUsed==true && !onlyLoggedInUserImages){
        var stars = cgJsClass.gallery.rating.setStars(average,gid);
        if(average>0){
            var countRtoSet = data.CountR;
        }else{
            var countRtoSet = 0;
        }
        jQuery(cgJsClass.gallery.rating.generateRatingDiv(realId,countRtoSet,imageObject,false,gid,stars,average,isFromSingleView,isSomeMessageWillBeShown));


        if(VotesInTimeExceeded===true){
            cgJsClass.gallery.function.message.show(cgJsData[gid].options.pro.VotesInTimeIntervalAlertMessage);
        }

        return;
    }

    if (HideUntilVote == 1 && !onlyLoggedInUserImages){

        if (cgJsData[gid].cgJsCountRuser[realId] == 0 || typeof cgJsData[gid].cgJsCountRuser[realId] == 'undefined') {// passiert wenn ShowOnlyUserVotes an ist
            var stars = cgJsClass.gallery.rating.setStars(0,gid);
            jQuery(cgJsClass.gallery.rating.generateRatingDiv(realId,'',imageObject,firstLoad,gid,stars,average,isFromSingleView,isSomeMessageWillBeShown));
        }else{
            var stars = cgJsClass.gallery.rating.setStars(average,gid);
            jQuery(cgJsClass.gallery.rating.generateRatingDiv(realId,data.CountRtotal,imageObject,firstLoad,gid,stars,average,isFromSingleView,isSomeMessageWillBeShown));
        }

    }else{
        if (data.CountRtotal < 1){
            var stars = cgJsClass.gallery.rating.setStars(0,gid);
            jQuery(cgJsClass.gallery.rating.generateRatingDiv(realId,0,imageObject,firstLoad,gid,stars,average,isFromSingleView,isSomeMessageWillBeShown));
        }
        else{
            var stars = cgJsClass.gallery.rating.setStars(average,gid);
            cgJsClass.gallery.rating.generateRatingDiv(realId,data.CountRtotal,imageObject,firstLoad,gid,stars,average,isFromSingleView,isSomeMessageWillBeShown);
        }
    }

    if(VotesInTimeExceeded===true){
        cgJsClass.gallery.function.message.show(cgJsData[gid].options.pro.VotesInTimeIntervalAlertMessage);
    }

    // Order important! Has to be done at the bottom!
    if(!isSetFromSameGalleryId && addVoteR){// then it is already done
        cgJsClass.gallery.rating.setRatingFiveStarSameGalleryId(realId, addVoteR,ratingAdd,firstLoad,gid,allVotesUsed,VotesInTimeExceeded,cgJsData[gid].rateAndCommentNumbers[realId],isFromSingleView,isSetUserVoteToNull);
    }

    if(ratingFileData){
        cgJsClass.gallery.function.general.tools.tooltip.addClass('cg_do_not_show_tooltip');
        setTimeout(function (){
            cgJsClass.gallery.function.general.tools.tooltip.removeClass('cg_do_not_show_tooltip');
        },3000);
    }

};

cgJsClass.gallery.rating.getRatingTotal = function (gid,data,realId) {

    var countRtotalMulti = 0;
    for(var rCount=1;rCount<=cgJsData[gid].options.general.AllowRatingDynamic;rCount++){
        eval("countRtotalMulti = countRtotalMulti + parseInt(data['CountR" + rCount + "'])*" + rCount + ";");
    }
    var addCountRtotalMulti = 0;
    if(cgJsData[gid].options.pro.Manipulate==1){
        for(var rCount=1;rCount<=cgJsData[gid].options.general.AllowRatingDynamic;rCount++){
            eval("addCountRtotalMulti = addCountRtotalMulti + parseInt(data['addCountR" + rCount + "'])*" + rCount + ";");
        }
    }

    var ratingTotal = countRtotalMulti + addCountRtotalMulti;

    /*var countR1total = parseInt(data['addCountR1'])*1;
    var countR2total = parseInt(data['addCountR2'])*2;
    var countR3total = parseInt(data['addCountR3'])*3;
    var countR4total = parseInt(data['addCountR4'])*4;
    var countR5total = parseInt(data['addCountR5'])*5;
    var ratingTotal = data['Rating'] + countR1total+countR2total+countR3total+countR4total+countR5total;*/

    return ratingTotal;

};

cgJsClass.gallery.rating.getRatingTotalPart = function (gid,data,rCount) {

    var countRtotalMulti = 0;
    eval("countRtotalMulti = countRtotalMulti + parseInt(data['CountR" + rCount + "'])*" + rCount + ";");
    var addCountRtotalMulti = 0;
    if(cgJsData[gid].options.pro.Manipulate==1){
        eval("addCountRtotalMulti = addCountRtotalMulti + parseInt(data['addCountR" + rCount + "'])*" + rCount + ";");
    }

    var ratingTotal = countRtotalMulti + addCountRtotalMulti;

    /*var countR1total = parseInt(data['addCountR1'])*1;
    var countR2total = parseInt(data['addCountR2'])*2;
    var countR3total = parseInt(data['addCountR3'])*3;
    var countR4total = parseInt(data['addCountR4'])*4;
    var countR5total = parseInt(data['addCountR5'])*5;
    var ratingTotal = data['Rating'] + countR1total+countR2total+countR3total+countR4total+countR5total;*/

    return ratingTotal;

};

cgJsClass.gallery.rating.getCountRpart = function (gid,data,rCount) {

    var countRtotalMulti = 0;
    eval("countRtotalMulti = countRtotalMulti + parseInt(data['CountR" + rCount + "']);");

    var addCountRtotalMulti = 0;
    if(cgJsData[gid].options.pro.Manipulate==1){
        eval("addCountRtotalMulti = addCountRtotalMulti + parseInt(data['addCountR" + rCount + "']);");
    }

    var countRpart = countRtotalMulti + addCountRtotalMulti;

    return countRpart;

};

cgJsClass.gallery.rating.getAverage = function (gid,data) {

    var average = (data.RatingTotal)/data.CountRtotal;
    if(isNaN(average)){
        average = 0;
    }else{
        average = Math.round(average * 10)/10;
    }
    return average;

};
cgJsClass.gallery.rating.getAverageForSecondarySorting = function (gid,data) {

    var averageForSecondarySorting = data['RatingAverage'].toString().replace('.','')+'0'+data['CountRtotal'].toString()+'00000';// int number has to be max 16 chars!, see bottom
    //480cgJsClass.gallery.vars.maxWidthBlogView000000000+1
    //480cgJsClass.gallery.vars.maxWidthBlogView000000001 <<< works
    //480cgJsClass.gallery.vars.maxWidthBlogView0000000000+1
    //480cgJsClass.gallery.vars.maxWidthBlogView0000000000 <<< does not work
    averageForSecondarySorting = averageForSecondarySorting.substr(0, 13);
    averageForSecondarySorting = parseInt(averageForSecondarySorting);

    return averageForSecondarySorting;

};
cgJsClass.gallery.rating.getCountRtotal = function (gid,data) {

    var countRtotal = 0;
    for(var rCount=1;rCount<=cgJsData[gid].options.general.AllowRatingDynamic;rCount++){
        eval("countRtotal = countRtotal + parseInt(data['CountR" + rCount + "']);");
    }
    var addCountRtotal = 0;
    if(cgJsData[gid].options.pro.Manipulate==1){
        for(var rCount=1;rCount<=cgJsData[gid].options.general.AllowRatingDynamic;rCount++){
            eval("addCountRtotal = addCountRtotal + parseInt(data['addCountR" + rCount + "']);");
        }
    }

//var addCountRtotal = parseInt(data['addCountR1'])+parseInt(data['addCountR2'])+parseInt(data['addCountR3'])+parseInt(data['addCountR4'])+parseInt(data['addCountR5']);
    var countRtotal = countRtotal + addCountRtotal;

    return countRtotal;

};
/*
cgJsClass.gallery.rating.getCountRsum = function (gid,data) {

var addCountRstring = '';
for(var rCount=1;rCount<=cgJsData[gid].options.general.AllowRatingDynamic;rCount++){
    if(!addCountRstring){
        addCountRstring += "parseInt(data['addCountR"+rCount+"']) * "+rCount+"";
    }else{
        addCountRstring += " + parseInt(data['addCountR"+rCount+"']) * "+rCount+"";
    }
}

    var addCountRsum = eval(addCountRstring+';');

//var addCountRsum = parseInt(data['addCountR1'])*1+parseInt(data['addCountR2'])*2+parseInt(data['addCountR3'])*3+parseInt(data['addCountR4'])*4+parseInt(data['addCountR5'])*5;
var countRstring = '';
for(var rCount=1;rCount<=cgJsData[gid].options.general.AllowRatingDynamic;rCount++){
    if(!countRstring){
        countRstring += "parseInt(data['CountR"+rCount+"']) * "+rCount+"";
    }else{
        countRstring += " + parseInt(data['CountR"+rCount+"']) * "+rCount+"";
    }
}
var countRsum = eval(countRstring+';');
//var countRsum = parseInt(data['CountR1'])*1+parseInt(data['CountR2'])*2+parseInt(data['CountR3'])*3+parseInt(data['CountR4'])*4+parseInt(data['CountR5'])*5;
    return addCountRsum+countRsum;
};*/
cgJsClass.gallery.rating.getRatingTotalForSecondarySorting = function (gid,data) {

    var sumForSecondarySorting = data['RatingTotal'].toString()+'0'+data['CountRtotal'].toString()+'00000';// int number has to be max 16 chars!, see bottom
    //480cgJsClass.gallery.vars.maxWidthBlogView000000000+1
    //480cgJsClass.gallery.vars.maxWidthBlogView000000001 <<< works
    //480cgJsClass.gallery.vars.maxWidthBlogView0000000000+1
    //480cgJsClass.gallery.vars.maxWidthBlogView0000000000 <<< does not work
    sumForSecondarySorting = parseInt(sumForSecondarySorting);

    return sumForSecondarySorting;

};