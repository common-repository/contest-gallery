cgJsClass.gallery.comment.setComment = function (realId,addCountC,gid,isJustSuccess,gidForElements,isJustReturnCommentsDiv,ratingCommentsDataFromJustCommented) {

        if(isJustSuccess){return;}

        if(!gidForElements){
            gidForElements = gid;
        }

        // might happen when for example winner shortcode ist also on the page but without this realId (image)
        // in the moment not used because appendCommentUserGalleryIfExists and showSetCommentsSameGalleryId not used
        if(!cgJsData[gid]){return;}
        if(!cgJsData[gid].vars){return;}
        if(!cgJsData[gid].vars.rawData){return;}
        if(!cgJsData[gid].vars.rawData[realId]){return;}

       //console.log(cgJsData[gid].rateAndCommentNumbers[realId]);
        //console.trace();

    if(cgJsData[gid].options.general.AllowComments>=1){

            var CountC = parseInt(cgJsData[gid].rateAndCommentNumbers[realId].CountC);

            if(CountC>=1 || addCountC>=1){
                var starLook = 'cg_gallery_comments_div_icon_on';
            }else{
                var starLook = 'cg_gallery_comments_div_icon_off';
            }

            if(addCountC == 0) {

                var imageObject = cgJsData[gid].imageObject[realId];

                var position = '';

                if(cgJsData[gid].options.visual['CommentPositionGallery']==2){
                    position = 'cg_center';
                }

                if(cgJsData[gid].options.visual['CommentPositionGallery']==3){
                    position = 'cg_right';
                }

                var commentDiv = '<div class="cg_gallery_comments_div"><div class="cg_gallery_comments_div_child '+position+'" ><div class="cg_gallery_comments_div_icon '+starLook+' cg_gallery_comments_div_icon'+realId+'"></div>' +
/*                    '<img class="cg_png_comments_icon" data-cg_id="'+realId+'" src="'+cgJsClass.gallery.vars.pluginsUrl+'/contest-gallery/v10/v10-css/comments_icon.png" style="cursor:pointer;">' +*/
                    '<div class="cg_gallery_comments_div_count'+realId+' cg_gallery_comments_div_count">'+CountC+'</div></div>';

                if(isJustReturnCommentsDiv && !ratingCommentsDataFromJustCommented){
                    return commentDiv;
                }

                if(imageObject){// if not then must be blog view!
                    if(imageObject.find('.cg_gallery_comments_div').length){
                        imageObject.find('.cg_gallery_comments_div').remove();
                    }
                    if(cgJsData[gid].vars.modernHover){
                        imageObject.find('.cg_gallery_info .cg_gallery_info_rating_comments').append(commentDiv);
                    }else{
                        imageObject.find('.cg_gallery_info').append(commentDiv);
                    }
                }

                var rowIdOfRealId = cgJsData[gid].vars.rawData[realId]['rowid'];

                for(var key in cgJsData[gid].fullImageData){

                    if(!cgJsData[gid].fullImageData.hasOwnProperty(key)){
                        break;
                    }

                    if(cgJsData[gid].fullImageData[key]==rowIdOfRealId){
                        cgJsData[gid].fullImageData[key][rowIdOfRealId]['CountC'] = CountC;
                    }
                }

            }

            if(addCountC > 0 || addCountC < 0){

                var CountC = parseInt(cgJsData[gid].rateAndCommentNumbers[realId].CountC);
                CountC = CountC+parseInt(addCountC);
                cgJsData[gid].rateAndCommentNumbers[realId].CountC = CountC;

                cgJsClass.gallery.dynamicOptions.setNewCountToMainImageArray(realId,'CountC',CountC,gid);

                if(CountC==0){
                    var starLook = 'cg_gallery_comments_div_icon_off';
                }

                cgJsData[gid].vars.mainCGdiv.find('.cg_gallery_comments_div_icon'+realId).removeClass('cg_gallery_comments_div_icon_on').removeClass('cg_gallery_comments_div_icon_off').addClass(starLook);
                cgJsData[gid].vars.mainCGdiv.find('.cg_gallery_comments_div_count'+realId).text(CountC);

                for(var key in cgJsData[gid].fullImageData){

                    if(!cgJsData[gid].fullImageData.hasOwnProperty(key)){
                        break;
                    }

                    var firstKey = Object.keys(cgJsData[gid].fullImageData[key])[0];

                    if(cgJsData[gid].fullImageData[key][firstKey]['id']==realId){
                        cgJsData[gid].fullImageData[key][firstKey]['CountC'] = CountC;
                        break;
                    }

                }

            }

            if(ratingCommentsDataFromJustCommented){
                //var tstamp = parseInt(new Date().getTime())/1000;
                //cgJsData[gid].rateAndCommentNumbers[realId] = ratingCommentsDataFromJustCommented;
                cgJsData[gid].rateAndCommentNumbers[realId] = cgJsData[gid].rateAndCommentNumbers[realId];// do not take ratingCommentsDataFromJustCommented!, just for understanding
                cgJsClass.gallery.rating.updateData(gid,cgJsData[gid].rateAndCommentNumbers,true);
                //cgJsClass.gallery.indexeddb.saveJsonSortValues(gid,cgJsData[gid].rateAndCommentNumbers,tstamp,true);
            }

        }

};

cgJsClass.gallery.comment.setComments = function (gid){

    if(cgJsData[gid].options.general.AllowComments>=1){
        // correct countC
        for(var realId in cgJsData[gid].imagesFullData){
            if(!cgJsData[gid].imagesFullData.hasOwnProperty(realId)){
                break;
            }
            if(cgJsData[gid].jsonCommentsData && cgJsData[gid].jsonCommentsData[realId] && Object.keys(cgJsData[gid].jsonCommentsData[realId]).length){
                var CountCtoReview = 0;
                for(var realIdCommentsData in cgJsData[gid].jsonCommentsData){
                    if(!cgJsData[gid].jsonCommentsData.hasOwnProperty(realIdCommentsData)){
                        break;
                    }
                    for(var firstKey in cgJsData[gid].jsonCommentsData[realIdCommentsData]){
                        if(!cgJsData[gid].jsonCommentsData[realIdCommentsData].hasOwnProperty(firstKey)){
                            break;
                        }
                        if(cgJsData[gid].jsonCommentsData[realIdCommentsData][firstKey]['Active']==2){// if 0 or 1 then is active
                            //    debugger
                            CountCtoReview++;
                        }
                    }

                }
                if(realId == 107){
                    //   debugger
                }
                cgJsData[gid].imagesFullData[realId].CountC = Object.keys(cgJsData[gid].jsonCommentsData[realId]).length;
                cgJsData[gid].imagesFullData[realId].CountCtoReview = CountCtoReview;
                cgJsData[gid].imagesSortValuesFullData[realId].CountC = cgJsData[gid].imagesFullData[realId].CountC;
                cgJsData[gid].imagesSortValuesFullData[realId].CountCtoReview = cgJsData[gid].imagesFullData[realId].CountCtoReview;
            }else{
                cgJsData[gid].imagesFullData[realId].CountC = 0;
            }
        }
    }
}


