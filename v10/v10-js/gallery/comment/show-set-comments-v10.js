cgJsClass.gallery.comment.showSetCommentsSameGalleryId = function (realId,gid) {

    // check if further galleries exists which have to be update user or normal, both ways
    if(String(gid).indexOf('-u')>=0){// then must be user gallery, check for normal gallery then
        return; // it can't be voted in user gallery
    }
    if(String(gid).indexOf('-u')==-1){// then must be normal gallery, check for user gallery then
        var gidToCheck = gid+'-u';
        // then gallery must be existing
        if(cgJsData[gidToCheck]){
            cgJsClass.gallery.views.close(gidToCheck);
            cgJsClass.gallery.rating.showSetComments(realId,gidToCheck,true);
        }
    }

};
cgJsClass.gallery.comment.appendComment = function (realId,gid,name,comment,gidForElements) {

    if(!gidForElements){
        gidForElements = gid;
    }

    var $cgCenterDiv = cgJsData[gid].vars.mainCGdiv.find('#cgCenterDiv'+gidForElements);

    $cgCenterDiv.find('#cgCenterImageCommentsDivEnterTitle'+gidForElements).val('');
    $cgCenterDiv.find('#cgCenterImageCommentsDivEnterTextarea'+gidForElements).val('');

    $cgCenterDiv.find('#cgCenterImageCommentsDiv'+gidForElements).removeClass('cg_hide');
    $cgCenterDiv.find('#cgCenterImageCommentsDivTitle'+gidForElements).removeClass('cg_hide cg-center-image-info-div-title-no-comments');
    $cgCenterDiv.find('#cgCenterInfoDiv'+gidForElements).find('.cg-center-image-comments-div-parent-parent').removeClass('cg_hide');

    $cgCenterDiv.find('#cgCenterImageCommentsDivEnterTitleError'+gidForElements).addClass('cg_hide');
    $cgCenterDiv.find('#cgCenterImageCommentsDivEnterTextareaError'+gidForElements).addClass('cg_hide');
    $cgCenterDiv.find('.cg-center-image-comments-div-recently-added').removeClass('cg-center-image-comments-div-recently-added');

    // in der function später kommt *1000 vor weil auf php unix time eingestellt ist welches mit 1000 weniger zurückgibt
    var timestamp = parseInt(new Date().getTime())/1000;

    var date = cgJsClass.gallery.comment.getDateDependsOnLocaleLang(gid,timestamp);

    var commentDiv = jQuery('<div class="cg-center-image-comments-div cg-center-image-comments-div-recently-added"></div>');
    commentDiv.append('<p class="cg-center-image-comments-comment-content">'+comment+'</p>');

    var $nameDateContainer = jQuery('<div class="cg-center-image-comments-name-date-container">' +
        '</div>');

    var isSetNameDateContainer = false;

    if(cgJsData[gid].options.general.HideCommentNameField!=1 && !cgJsClass.gallery.vars.isLoggedIn){
        $nameDateContainer.prepend('<p class="cg-center-image-comments-name-content">'+name+'</p>');
        isSetNameDateContainer = true;
    }

    if(cgJsClass.gallery.vars.isLoggedIn){
        var $cgCenterImageCommentsUserDataClone = $cgCenterDiv.find('.cg-center-image-comments-div-enter .cg-center-image-comments-user-data').clone();
        commentDiv.prepend($cgCenterImageCommentsUserDataClone.append('<div class="cg-center-image-comments-date"><p>'+date+'</p></div>'));
    }else{
        $nameDateContainer.append('<p class="cg-center-image-comments-date-content">'+date+'</p>');
        isSetNameDateContainer = true;
    }

    if(isSetNameDateContainer){
        commentDiv.prepend($nameDateContainer);
    }

    if(cgJsData[gid].options.pro.ReviewComm!=1){
        $cgCenterDiv.find("#cgCenterImageCommentsDiv"+gidForElements).prepend(commentDiv);
    }

    $cgCenterDiv.find("#cgCenterImageCommentsDiv"+gidForElements).find('.cg-center-for-your-comment-message-container').remove();

    var thankYouDiv = jQuery('<div class="cg-center-image-comments-div cg-center-image-comments-div-recently-added cg-center-for-your-comment-message-container"></div>');
    if(cgJsData[gid].options.pro.ReviewComm==1){
        thankYouDiv.prepend('<p class="cg-center-for-your-comment-message">'+cgJsClass.gallery.language[gid].ThankYouForYourComment+'</p>');
        thankYouDiv.append('<p class="cg-center-for-your-comment-message" style="font-weight: normal;">'+cgJsClass.gallery.language[gid].YourCommentWillBeReviewed+'</p>');
    }else{
        thankYouDiv.prepend('<p class="cg-center-for-your-comment-message">'+cgJsClass.gallery.language[gid].ThankYouForYourComment+'</p>');
    }

    $cgCenterDiv.find("#cgCenterImageCommentsDiv"+gidForElements).prepend(thankYouDiv.addClass('cg_fade_in_2'));

};
cgJsClass.gallery.comment.appendCommentUserGalleryIfExists = function (realId,gid,name,comment) {

    var realGid = cgJsData[gid].vars.realGid;

    cgJsClass.gallery.vars.$cgLoadedIds.each(function (){
        if(jQuery(this).attr('data-cg-real-gid') != realGid){return;}
        if(jQuery(this).attr('data-cg-short') == 'uf' || jQuery(this).attr('data-cg-short') == 'uc'){return;}
        if(jQuery(this).attr('data-cg-gid') == gid){return;}

        if(cgJsData[jQuery(this).attr('data-cg-gid')]){
            if(cgJsData[jQuery(this).attr('data-cg-gid')].vars){
                if(cgJsData[jQuery(this).attr('data-cg-gid')].vars.rawData){
                    if(cgJsData[jQuery(this).attr('data-cg-gid')].vars.rawData[realId]){// check if image exists in this gallery
                        //   cgJsClass.gallery.views.close(jQuery(this).attr('data-cg-gid'));
                        //  cgJsClass.gallery.rating.showSetComments(realId,jQuery(this).attr('data-cg-gid'),true);
                        cgJsData[jQuery(this).attr('data-cg-gid')].jsonCommentsData = cgJsData[gid].jsonCommentsData;
                        cgJsClass.gallery.comment.setComments(jQuery(this).attr('data-cg-gid'));
                        // commentar count aktualisieren!
                        cgJsClass.gallery.comment.setComment(realId,1,jQuery(this).attr('data-cg-gid'));
                        cgJsClass.gallery.comment.appendComment(realId,jQuery(this).attr('data-cg-gid'),name,comment);
                        cgJsClass.gallery.comment.checkIfTopBottomArrowsRequired(jQuery(this).attr('data-cg-gid'));
                        cgJsClass.gallery.views.scrollInfoOrCommentTopFullHeight(jQuery(this).attr('data-cg-gid'));
                    }
                }
            }
        }
    });

    return;

    // check if further galleries exists which have to be update user or normal, both ways
    if(String(gid).indexOf('-u')>=0){// then must be user gallery, check for normal gallery then
        return; // it can't be voted in user gallery
    }
    if(String(gid).indexOf('-u')==-1){// then must be normal gallery, check for user gallery then
        var gidToCheck = gid+'-u';
        // then gallery must be existing
        if(cgJsData[gidToCheck]){
            if(cgJsData[gidToCheck].vars){
                if(cgJsData[gidToCheck].vars.rawData){
                    if(cgJsData[gidToCheck].vars.rawData[realId]){// check if image exists in this gallery
         //   cgJsClass.gallery.views.close(gidToCheck);
          //  cgJsClass.gallery.rating.showSetComments(realId,gidToCheck,true);

            // commentar count aktualisieren!
            cgJsClass.gallery.comment.setComment(realId,1,gidToCheck);
                cgJsClass.gallery.comment.appendComment(realId,gidToCheck,name,comment);
                cgJsClass.gallery.comment.checkIfTopBottomArrowsRequired(gidToCheck);
                cgJsClass.gallery.views.scrollInfoOrCommentTopFullHeight(gidToCheck);
            }
        }
    }
        }
    }

};

cgJsClass.gallery.comment.prepareSubmitButton = function(gid,gidForElements){
    var $cgCenterImageCommentsDivEnterSubmit = cgJsData[gid].vars.mainCGdiv.find('#cgCenterImageCommentsDivEnterSubmit'+gidForElements)
    var widthButton = cgJsData[gid].vars.mainCGdiv.find('#cgCenterImageCommentsDivEnterSubmit'+gidForElements).width();
    $cgCenterImageCommentsDivEnterSubmit.width(widthButton);
    $cgCenterImageCommentsDivEnterSubmit.css({
        'pointer-events': 'none',
        'cursor': 'none'
    });
    return $cgCenterImageCommentsDivEnterSubmit;
};

cgJsClass.gallery.comment.checkRecursive = function (i,gid,$cgCenterImageCommentsDivEnterSubmit){

    setTimeout(function () {
        i--;
        cgJsClass.gallery.vars.commentSubmitButtonDisabledCounter = i;
        if(i==0){
            $cgCenterImageCommentsDivEnterSubmit.prop('disabled',false);
            $cgCenterImageCommentsDivEnterSubmit.text(cgJsClass.gallery.language[gid].Send);
            $cgCenterImageCommentsDivEnterSubmit.removeAttr('style');
            return;
        }
        $cgCenterImageCommentsDivEnterSubmit.text(i);
        cgJsClass.gallery.comment.checkRecursive(i,gid,$cgCenterImageCommentsDivEnterSubmit);
    },1000);

};
cgJsClass.gallery.comment.showSetComments = function (realId,gid,isSetFromSameGalleryId,gidForElements) {

    if(!gidForElements){
        gidForElements = gid;
    }
    var $cgCenterDiv = cgJsData[gid].vars.mainCGdiv.find('#cgCenterDiv'+gidForElements);

   // var comment = $cgCenterImageCommentsDivEnterTextareaClone.html().replace(/<div>/g,"\n").replace(/<\/div>/g,"").replace(/<br>/g,"\n");
    var name = '';

    if(cgJsData[gid].options.general.HideCommentNameField!=1 && !cgJsClass.gallery.vars.isLoggedIn){
        name = cgJsData[gid].vars.mainCGdiv.find('#cgCenterImageCommentsDivEnterTitle'+gidForElements).val();
    }

    var comment = cgJsData[gid].vars.mainCGdiv.find('#cgCenterImageCommentsDivEnterTextarea'+gidForElements).val();

    if(name.length<2 && cgJsData[gid].options.general.HideCommentNameField!=1 && !cgJsClass.gallery.vars.isLoggedIn){
        var errorMessage = cgJsClass.gallery.language[gid].TheNameFieldMustContainTwoCharactersOrMore;
        cgJsData[gid].vars.mainCGdiv.find('#cgCenterImageCommentsDivEnterTitleError'+gidForElements).text(errorMessage).removeClass('cg_hide');
    }

    if(comment.length<3){
        var errorMessage = cgJsClass.gallery.language[gid].TheCommentFieldMustContainThreeCharactersOrMore;
        cgJsData[gid].vars.mainCGdiv.find('#cgCenterImageCommentsDivEnterTextareaError'+gidForElements).text(errorMessage).removeClass('cg_hide');
    }

    if((name.length<2 && cgJsData[gid].options.general.HideCommentNameField!=1 && !cgJsClass.gallery.vars.isLoggedIn) || comment.length<3){ return; }

    // for proper view in browser, because will be modified for save as next
    // makes deep copy of string
    var nameToAppend = (' ' + name).slice(1);
    var commentToAppend = (' ' + comment).slice(1);

    cgJsClass.gallery.comment.appendComment(realId,gid,nameToAppend, commentToAppend, gidForElements);

    // Anders funktioniert es ansonsten im FullWindow nicht
    if(cgJsClass.gallery.vars.fullwindow){

 //       location.href = '#cgCenterImageCommentsDiv'+gidForElements;
        cgJsClass.gallery.views.singleView.createImageUrl(gid,realId);

        var calculatedHeight = $cgCenterDiv.position().top;
        if($cgCenterDiv.find('.cgCenterDivChild').length){
            calculatedHeight = calculatedHeight + $cgCenterDiv.find('.cgCenterDivChild').outerHeight(true);
        }
        if($cgCenterDiv.find('.cg-center-image-div').length){
            calculatedHeight = calculatedHeight + $cgCenterDiv.find('.cg-center-image-div').outerHeight(true);
        }
        if($cgCenterDiv.find('.cg-center-image-rating-div').length){
            calculatedHeight = calculatedHeight + $cgCenterDiv.find('.cg-center-image-rating-div').outerHeight(true);
        }
        if($cgCenterDiv.find('.cg-center-image-fblike-div').length){
            calculatedHeight = calculatedHeight + $cgCenterDiv.find('.cg-center-image-fblike-div').outerHeight(true);
        }
        if($cgCenterDiv.find('.cg-center-image-info-div-parent-parent').length){
            calculatedHeight = calculatedHeight + $cgCenterDiv.find('.cg-center-image-info-div-parent-parent').outerHeight(true);
        }

        jQuery('#mainCGdivHelperParent'+gid).animate({
        //    scrollTop: $cgCenterDiv.find('#cgCenterImageCommentsDiv'+gidForElements).offset().top - 150+'px'
            scrollTop: calculatedHeight - 100+'px'
        }, 'fast');

    }else{
        cgJsClass.gallery.vars.dom.html.animate({
            scrollTop: $cgCenterDiv.find('#cgCenterImageCommentsDiv'+gidForElements).offset().top - 80+'px'
        }, 'fast');
    }

    // commentar count aktualisieren!
    if(cgJsData[gid].options.pro.ReviewComm!=1){
        cgJsClass.gallery.comment.setComment(realId,1,gid);
    }

    var $cgCenterImageCommentsDivEnterSubmit = cgJsClass.gallery.comment.prepareSubmitButton(gid,gidForElements);
    cgJsClass.gallery.comment.checkRecursive(11,gid,$cgCenterImageCommentsDivEnterSubmit);

    cgJsClass.gallery.comment.checkIfTopBottomArrowsRequired(gid,gidForElements,true);
    cgJsClass.gallery.views.scrollInfoOrCommentTopFullHeight(gid,gidForElements);

    // 09.03.2020 vorläufig noch nicht aktiviert!!!!
    jQuery.ajax({
        url : cg_show_set_comments_v10_wordpress_ajax_script_function_name.cg_show_set_comments_v10_ajax_url,
        type : 'post',
        data : {
            action : 'cg_show_set_comments_v10',
            pid : realId,
            gid : cgJsData[gid].vars.gidReal,
            name : name,
            comment : comment,
            galeryIDuser : gid,
            galleryHash : cgJsData[gid].vars.galleryHash,
            cgPageUrl : cgJsClass.gallery.vars.cgPageUrl
        },
        }).done(function(response) {

            var parser = new DOMParser();
            var parsedHtml = parser.parseFromString(response, 'text/html');
            var script = jQuery(parsedHtml).find('script[data-cg-processing="true"]').first();

            if(!script.length){

                cgJsClass.gallery.function.message.show('Your comment could not be saved. Please contact administrator.');
                // commentar count aktualisieren!
                cgJsClass.gallery.comment.setComment(realId,-1,gid);
                cgJsData[gid].vars.mainCGdiv.find('#cgCenterImageCommentsDiv'+gidForElements).find('.cg-center-image-comments-div').first().remove().next().remove();

            } else{

                // set comment here again but with addCountC as 0, maybe file data had to be repaired
                jQuery(parsedHtml).find('script[data-cg-processing="true"]').each(function () {
                    var script = jQuery(this).html();
                    eval(script);
                });


                // has to be done after ajas processing
                cgJsClass.gallery.comment.appendCommentUserGalleryIfExists(realId,gid,nameToAppend,commentToAppend,gidForElements);

            }


        }).fail(function(xhr, status, error) {

        cgJsClass.gallery.function.message.show('Your comment could not be saved. Please contact administrator.');

        // commentar count aktualisieren!
        cgJsClass.gallery.comment.setComment(realId,-1,gid);
        cgJsData[gid].vars.mainCGdiv.find('#cgCenterImageCommentsDiv'+gidForElements).find('.cg-center-image-comments-div').first().remove().next().remove();

    }).always(function() {

    });


};

