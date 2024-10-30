cgJsClass.gallery.comment.setCommentsSingleImageView = function (realId,gid,cgCenterDiv,imageObject,gidForElements) {

/*    if(realId==351){
        console.trace();
        debugger;
    }*/

    var uploadFolderUrl = cgJsData[gid].vars.uploadFolderUrl;
    var galleryId = gid;

    var $cgCenterImageCommentsDiv = cgCenterDiv.find('#cgCenterImageCommentsDiv'+gidForElements);
    var $cgCenterImageCommentsDivTitle = cgCenterDiv.find('#cgCenterImageCommentsDivTitle'+gidForElements);

    $cgCenterImageCommentsDiv.addClass('cg_hide');
    var append = false;

    if(cgJsData[gid].vars.openedRealId){

        // alle getInfo requests abbrechen, damit info nicht mehrfach gesetzt wird
        if(cgJsData[gid].vars.jsonGetComment>0){
            for(var key in cgJsData[gid].vars.jsonGetComment){

                if(!cgJsData[gid].vars.jsonGetComment.hasOwnProperty(key)){
                    break;
                }

                cgJsData[gid].vars.jsonGetComment[key].abort();
            }
        }
        cgJsData[gid].vars.jsonGetComment = [];

    }

/*    cgJsData[gid].vars.jsonGetComment.push(jQuery.getJSON( uploadFolderUrl+"/contest-gallery/gallery-id-"+cgJsData[gid].vars.gidReal+"/json/image-comments/image-comments-"+realId+".json", {_: new Date().getTime()}).done(function( data ) {

    }).done(function(data){*/

   //     if (typeof data === 'object') {

        var data = cgJsData[gid].jsonCommentsData[realId];

        if(cgJsData[gid].jsonCommentsData[realId]){

            if(append == false){
                $cgCenterImageCommentsDiv.removeClass('cg_hide');
                $cgCenterImageCommentsDivTitle.removeClass('cg_hide');
                cgCenterDiv.find('#cgCenterInfoDiv'+gidForElements).find('.cg-center-image-comments-div-parent-parent').removeClass('cg_hide');
                append = true;
            }

            for(var value in data){

                if(!data.hasOwnProperty(value)){
                    break;
                }

                if(data[value]['Active']==2){
                    continue;
                }

                var WpUserId = data[value]['WpUserId'];

                var comment = data[value]['comment'];
                var name = data[value]['name'];
                name = name.replace(/&amp;amp;#x/g,"&#x");
                name = name.replace(/&amp;#x/g,"&#x");

                cgJsClass.gallery.vars.emojis.forEach(function (value){
                    var regExp = new RegExp(value,"gi");
                    name = name.replace(regExp,value+" ");
                });

                var timestamp = parseInt(data[value]['timestamp']);

                var date = cgJsClass.gallery.comment.getDateDependsOnLocaleLang(gid,timestamp);

                var commentDiv = jQuery('<div class="cg-center-image-comments-div"></div>');
                comment = comment.replace(/&amp;amp;#x/g,"&#x");
                comment = comment.replace(/&amp;#x/g,"&#x");

                cgJsClass.gallery.vars.emojis.forEach(function (value){
                    var regExp = new RegExp(value,"gi");
                    comment = comment.replace(regExp,value+" ");
                });

                comment = jQuery('<textarea />').html(comment).text();
                name = jQuery('<textarea />').html(name).text();

                comment = cgJsClass.gallery.function.general.tools.encodeHTML(comment);
                name = cgJsClass.gallery.function.general.tools.encodeHTML(name);
                date = cgJsClass.gallery.function.general.tools.encodeHTML(date);

                comment = comment.replaceAll(/&lt;br\/&gt;/g, " ");
                comment = comment.replaceAll(/&lt;br \/&gt;/g, " ");
                comment = comment.replaceAll(/&lt;br\/>/g, " ");
                comment = comment.replaceAll(/&lt;br \/>/g, " ");
                comment = comment.replaceAll(/&lt;br>/g, " ");
                comment = comment.replaceAll(/&lt;br >/g, " ");

                commentDiv.append('<p class="cg-center-image-comments-comment-content">'+comment+'</p>');

                var profileImage = '';
                var nickname = '';

                if(cgJsData[gid].vars.profileImages[WpUserId]){
                    profileImage = cgJsData[gid].vars.profileImages[WpUserId];
                }
                if(cgJsData[gid].vars.nicknames[WpUserId]){
                    nickname = cgJsData[gid].vars.nicknames[WpUserId];
                }

                if(WpUserId && (profileImage || nickname)){
                    var $cgCenterImageCommentsUserData = jQuery('<div class="cg-center-image-comments-user-data">' +
                            '<div class="cg-center-image-comments-profile-image cg_hide cg-center-show-profile-image-full" data-cg-wp-user-id="'+WpUserId+'"></div>' +
                            '<div class="cg-center-image-comments-nickname-avatar cg_hide"></div>' +
                            '<div class="cg-center-image-comments-nickname-text cg_hide"></div>' +
                        '</div>');
                    if(profileImage){
                        $cgCenterImageCommentsUserData.find('.cg-center-image-comments-nickname-avatar').addClass('cg_hide');
                        $cgCenterImageCommentsUserData.find('.cg-center-image-comments-profile-image').css('background-image','url('+profileImage+')').removeClass('cg_hide');
                        $cgCenterImageCommentsUserData.find('.cg-center-image-comments-nickname-text').addClass('cg-center-show-profile-image-full');
                    }
                    if(nickname){
                        if(!profileImage){
                            $cgCenterImageCommentsUserData.find('.cg-center-image-comments-nickname-avatar').removeClass('cg_hide');
                        }
                        $cgCenterImageCommentsUserData.find('.cg-center-image-comments-nickname-text').text(nickname).removeClass('cg_hide');
                    }
                    $cgCenterImageCommentsUserData.append('<div class="cg-center-image-comments-date"><p>'+date+'</p></div>')
                    commentDiv.prepend($cgCenterImageCommentsUserData);
                }else{

                    var cgHideClassString = '';
                    if(!name){
                        cgHideClassString = 'cg_hide';
                    }

                    var $nameDateContainer = jQuery('<div class="cg-center-image-comments-name-date-container">' +
                        '<p class="cg-center-image-comments-name-content '+cgHideClassString+'">'+name+'</p>' +
                        '<p class="cg-center-image-comments-date-content">'+date+'</p>' +
                    '</div>');
                    commentDiv.prepend($nameDateContainer);
                }

                $cgCenterImageCommentsDiv.prepend(commentDiv);

            }

            cgCenterDiv.find('#cgCenterImageCommentsDivParentParent'+gidForElements).removeClass('cg_hide');
            cgJsClass.gallery.comment.checkIfTopBottomArrowsRequired(gid,gidForElements);

        }else{

            //  cgCenterDiv.find('#cgCenterImageCommentsDivParentParent'+gid).removeClass('cg_hide');
            $cgCenterImageCommentsDiv.removeClass('cg_hide');
            $cgCenterImageCommentsDivTitle.removeClass('cg_hide');
            cgCenterDiv.find('#cgCenterInfoDiv'+gid).find('.cg-center-image-comments-div-parent-parent').removeClass('cg_hide');
            append = true;
          //  cgJsClass.gallery.comment.checkIfTopBottomArrowsRequired(gid,gidForElements);// height and appearence of show more have to be calculated also

        }

      //  }

        cgCenterDiv.find('.cg-center-image-comments-div-parent > .cg-center-image-comments-div-add-comment').removeClass('cg_hidden');

/*    }).fail(function (error) {

        cgCenterDiv.find('.cg-center-image-comments-div-parent > .cg-center-image-comments-div-add-comment').removeClass('cg_hidden');
    }));*/


};
cgJsClass.gallery.comment.checkIfTopBottomArrowsRequired = function (gid,gidForElements,isFromSetComments) {

    if(!gidForElements){
        gidForElements = gid;
    }

    var $cgCenterDiv = cgJsData[gid].vars.mainCGdiv.find('#cgCenterDiv'+gidForElements);

    // falls diese funktion angwendet dann werden komments definitiv angzeigt und der separator kann auch angezeigt werden
    //$cgCenterDiv.find('.cg-center-image-info-comments-separator').removeClass('cg_hide');

    setTimeout(function () {

        var collectedHeight = 0;
        // collect possible margin and padding here!
        //var marginTop = parseInt($cgCenterDiv.find('#cgCenterImageCommentsDiv'+gidForElements).css('marginTop'));
        //var marginBottom = parseInt($cgCenterDiv.find('#cgCenterImageCommentsDiv'+gidForElements).css('marginBottom'));
        var paddingTop = parseInt($cgCenterDiv.find('#cgCenterImageCommentsDiv'+gidForElements).css('paddingTop'));
        var paddingBottom = parseInt($cgCenterDiv.find('#cgCenterImageCommentsDiv'+gidForElements).css('paddingBottom'));

        $cgCenterDiv.find('.cg-center-image-comments-div').each(function () {
           // console.log(jQuery(this).outerHeight(true)); //include everything padding border margin
            collectedHeight = collectedHeight+jQuery(this).outerHeight(true)+10;//+10 because of margin of last p tag in cg-center-image-comments-div which seems not to be included
        });

        collectedHeight = collectedHeight+paddingTop+paddingBottom;
    if(collectedHeight>=300){
            //$cgCenterDiv.find('.cg-center-image-comments-div-parent-parent .cg-top-bottom-arrow').removeClass('cg_hide');
            //$cgCenterDiv.find('.cg-center-image-comments-div-parent').addClass('cg-center-image-info-div-parent-padding');
            $cgCenterDiv.find('.cg-center-image-comments-div-show-more-comments').removeClass('cg_hide');
            $cgCenterDiv.find('.cg-center-image-comments-div-parent').addClass('cg-center-image-comments-div-show-more-available');
            if(isFromSetComments){
                $cgCenterDiv.find('.cg-center-image-comments-div-parent').addClass('cg-center-image-comments-div-parent-enter-textarea-expanded');
            }
    }

    },300)

};
cgJsClass.gallery.comment.getDateDependsOnLocaleLang = function (gid,timestamp) {

    if(cgJsData[gid].options.visual.CommentsDateFormat){

        var commentDate = new Date(timestamp*1000);

        var month = parseInt(commentDate.getMonth());
        month = month+1;

        var year = commentDate.getFullYear();

        var hours = commentDate.getHours();
        var minutes = commentDate.getMinutes();

        if(minutes<10){
            minutes = "0"+commentDate.getMinutes();
        }

        if(hours<10){
            hours = "0"+commentDate.getHours();
        }

        var monthUS = month;

        if(monthUS<10){
            monthUS = "0"+monthUS;
        }

        var day = commentDate.getDate();

        if(day<10){
            day = "0"+day;
        }

        try{
            var dateTimeByFormat = cgJsData[gid].options.visual['CommentsDateFormat'];
            dateTimeByFormat = dateTimeByFormat.replace('YYYY',year);
            dateTimeByFormat = dateTimeByFormat.replace('MM',monthUS);
            dateTimeByFormat = dateTimeByFormat.replace('DD',day);
        }catch (e) {
            return cgJsClass.gallery.comment.setUsDateStyle(timestamp);
        }

        return dateTimeByFormat+" "+hours+":"+minutes;

    }else{
        return cgJsClass.gallery.comment.setUsDateStyle(timestamp);
    }

    //var localeLang = cgJsClass.gallery.vars.localeLang;

   // if(localeLang=='de_DE'){
       // return cgJsClass.gallery.comment.setGermanDateStyle(timestamp);
  //  }

};
cgJsClass.gallery.comment.setUsDateStyle = function (timestamp) {

    var commentDate = new Date(timestamp*1000);

    var month = parseInt(commentDate.getMonth());
    month = month+1;

    var monthUS = month;

    if(monthUS<10){
        monthUS = "0"+monthUS;
    }

    var hours = commentDate.getHours();
    var minutes = commentDate.getMinutes();

    if(commentDate.getMinutes()<10){

        minutes = "0"+commentDate.getMinutes();

    }

    if(commentDate.getHours()<10){

        hours = "0"+commentDate.getHours();

    }

    var day = commentDate.getDate();

    if(day<10){

        day = "0"+day;

    }

    return commentDate.getFullYear()+"/"+monthUS+"/"+day+" "+hours+":"+minutes;

};

cgJsClass.gallery.comment.setGermanDateStyle = function (timestamp) {

    var commentDate = new Date(timestamp*1000);

    var month = parseInt(commentDate.getMonth());
    month = month+1;

    var monthUS = month;

    var hours = commentDate.getHours();
    var minutes = commentDate.getMinutes();

    if(commentDate.getMinutes()<10){

        var minutes = "0"+commentDate.getMinutes();

    }

    if(commentDate.getHours()<10){

        var hours = "0"+commentDate.getHours();

    }


    return commentDate.getDate()+"."+monthUS+"."+commentDate.getFullYear()+" "+hours+":"+minutes;


};
