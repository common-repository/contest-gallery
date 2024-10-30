cgJsClass.gallery.rating.clickRateOneStar = function (gid) {

    jQuery( document ).on( 'click', '.cg_rate_star,.cg_rate_minus', function(e) {


        var gid = jQuery(this).attr('data-cg-gid');

        /*
        if(cgJsData[gid].onlyLoggedInUserImages===true){
            cgJsClass.gallery.function.message.show(cgJsClass.gallery.language[gid].YouCanNotVoteInOwnGallery);
            return;
        }*/

        var minusVoteNow = 0;

        if(cgJsData[gid].vars.currentLook=='slider'){

            // then clicked from slider preview
            if(jQuery(this).closest('.mainCGslider').length>=1){
                e.preventDefault();
                return;
            }

        }

        if(jQuery(this).hasClass('cg_rate_out_gallery_disallowed') && cgJsData[gid].options.general.RatingOutGallery!='1' && cgJsData[gid].vars.currentLook!='blog'){
            if(!jQuery(this).closest('.cg_show_href_target_blank').length && cgJsData[gid].options.general.FullSizeImageOutGallery==1){
                e.preventDefault();
            }
            return;
        }

        if(cgJsData[gid].options.general.AllowRating!='2'){
            e.preventDefault();
            return;
        }

        if(String(gid).indexOf('-w')>=0){
            e.preventDefault();
            return;
        }
        e.preventDefault();

        if(String(gid).indexOf('-u')>=0 || cgJsData[gid].vars.isUserGallery){
            if(jQuery(this).closest('.cgCenterDiv').length){
                cgJsClass.gallery.function.message.show(cgJsClass.gallery.language[gid].YouCanNotVoteInOwnGallery);
                return;
            }else{
                return;
            }
        }

        if(jQuery(this).parent().parent().parent().hasClass('cg_gallery_info')){
            var order = jQuery(this).closest('.cg_show').attr('data-cg-order');
            if(cgJsData[gid].vars.openedGalleryImageOrder!=order && cgJsData[gid].options.general.RatingOutGallery!='1'){
                cgJsClass.gallery.views.singleView.openImage(jQuery,order,false,gid);
            }
        }

        if(cgJsData[gid].options.general.AllowRating!='2'){
            return;
        }

        if(cgJsData[gid].vars.cg_check_login==1 && cgJsData[gid].vars.cg_user_login_check==0){
            cgJsClass.gallery.function.message.show(cgJsClass.gallery.language[gid].OnlyRegisteredUsersCanVote);
            return false;
        }

        if(cgJsData[gid].options.pro.MinusVote==1 && jQuery(this).hasClass('cg_rate_minus')){
            minusVoteNow = 1;
        }

        var cg_picture_id = jQuery(this).attr('data-cg_rate_star_id');

        var cg_rate_value = 1;

        if(cgJsData[gid].vars.currentLook=='blog'){

            var cgCenterDiv = cgJsData[gid].cgCenterDivBlogObject[cg_picture_id];
            var $cg_gallery_rating_div_child = cgCenterDiv.find('.cg_gallery_rating_div_child');
            $cg_gallery_rating_div_child.height($cg_gallery_rating_div_child.height());
            $cg_gallery_rating_div_child.empty().addClass('cg-lds-dual-ring-star-loading');

        }else{

            var imageObject = cgJsData[gid].imageObject[cg_picture_id];
            var $cg_gallery_rating_div_childImageObject = imageObject.find('.cg_gallery_rating_div_child');
            $cg_gallery_rating_div_childImageObject.height($cg_gallery_rating_div_childImageObject.height());
            $cg_gallery_rating_div_childImageObject.width($cg_gallery_rating_div_childImageObject.width());
            $cg_gallery_rating_div_childImageObject.empty().addClass('cg-lds-dual-ring-star-loading');

            var cgCenterDiv = cgJsData[gid].vars.cgCenterDiv;
            if(cgCenterDiv.is(':visible')){
                if(cgJsData[gid].vars.openedRealId==cg_picture_id){
                    var $cg_gallery_rating_div_child = cgCenterDiv.find('.cg_gallery_rating_div_child');
                    $cg_gallery_rating_div_child.height($cg_gallery_rating_div_child.height());
                    $cg_gallery_rating_div_child.empty().addClass('cg-lds-dual-ring-star-loading');
                }
            }

        }

        jQuery.ajax({
            url : post_cg_rate_v10_oneStar_wordpress_ajax_script_function_name.cg_rate_v10_oneStar_ajax_url,
            type : 'post',
            data : {
                action : 'post_cg_rate_v10_oneStar',
                gid : cgJsData[gid].vars.gidReal,
                galeryIDuser : gid,
                pid : cg_picture_id,
                value : cg_rate_value,
                minusVoteNow : minusVoteNow,
                galleryHash : cgJsData[gid].vars.galleryHash
            }
        }).done(function(response) {

            if($cg_gallery_rating_div_childImageObject){
                $cg_gallery_rating_div_childImageObject.height('auto');
                $cg_gallery_rating_div_childImageObject.width('auto');
            }

            var parser = new DOMParser();
            var parsedHtml = parser.parseFromString(response, 'text/html');

            jQuery(parsedHtml).find('script[data-cg-processing="true"]').each(function () {

                var script = jQuery(this).html();
                eval(script);

            });

        }).fail(function(xhr, status, error) {

            cgJsClass.gallery.rating.setRatingOneStar(cg_picture_id,0,false,gid,false,false);

        }).always(function() {

        });


    });

};