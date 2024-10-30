cgJsClass.gallery.rating.setDetailsPositionInSlider = function (gid,realId,$cg_gallery_rating_div_child) {

    return;// should not be visible in slider anymore

    var $cg_gallery_rating_div_five_star_details = $cg_gallery_rating_div_child.find('.cg_gallery_rating_div_five_star_details');

    var sliderView = false;

    if(cgJsData[gid].vars.currentLook=='slider'){
        sliderView = true;
    }

    // remove in general at the beginning
    $cg_gallery_rating_div_five_star_details.removeAttr('style');
    $cg_gallery_rating_div_five_star_details.find('progress').removeAttr('style');

    if(sliderView && $cg_gallery_rating_div_child.closest('.mainCGslider').length){

        var $cgShow = $cg_gallery_rating_div_child.closest('#cg_show'+realId);
        var positionTop = $cgShow.find('#cgGalleryInfo'+realId).position().top*-1-5;
        var marginLeft = $cgShow.find('#cg_gallery_rating_div'+realId).position().left*-1;
        $cg_gallery_rating_div_five_star_details.css({'top':positionTop+'px','margin-left':marginLeft+'px'});
        var cg_gallery_rating_div_five_star_details_WIDTH = $cg_gallery_rating_div_five_star_details.removeClass('cg_hide').outerWidth();
        var cg_gallery_rating_div_five_star_details_HEIGHT = $cg_gallery_rating_div_five_star_details.height();
        $cg_gallery_rating_div_five_star_details.addClass('cg_hide');

        var widthDifference = $cgShow.outerWidth()-cg_gallery_rating_div_five_star_details_WIDTH;
        var progressWidth = $cg_gallery_rating_div_five_star_details.find('progress').first().width();
        var progressNewWidth = progressWidth+widthDifference;
        $cg_gallery_rating_div_five_star_details.find('progress').width(progressNewWidth);
        $cg_gallery_rating_div_five_star_details.height(cg_gallery_rating_div_five_star_details_HEIGHT+4);

    }

};
cgJsClass.gallery.rating.clickRateFiveStar = function () {

    // start mobile here
    jQuery( document ).on('click','.cg_gallery_rating_div_five_star_details.cg_opened_for_mobile_voting',function(e) {

        if(!cgJsClass.gallery.vars.isMobile){return;}
        if(jQuery(this).hasClass('cg_voting_in_process')){return;}
        if(jQuery(e.target).hasClass('cg_rate_star_five_star') || jQuery(e.target).hasClass('cg_rate_minus_five_star')){
            return;
        }else{
            return; // not required anymore, will be closed by closed button
            jQuery(this).removeClass('cg_opened_for_mobile_voting');
            jQuery(this).find('.cg_gallery_rating_div').remove();
            jQuery(this).addClass('cg_hide');
            cgJsClass.gallery.vars.dom.body.removeClass('cg_gallery_rating_div_five_star_details_is_opened');
            cgJsClass.gallery.vars.dom.html.removeClass('cg_no_scroll');
            cgJsClass.gallery.vars.dom.body.removeClass('cg_no_scroll cg_visibility_hidden');
        }
    });

    jQuery( document ).on( 'click', '#cg_gallery_rating_div_five_star_details_is_opened', function(e) {

        if(!cgJsClass.gallery.vars.isMobile){return;}

        if(jQuery(e.target).hasClass('cg_gallery_rating_div_five_star_details_close_button')){return;}
        if(!jQuery(this).hasClass('cg_opened_for_mobile_voting')){
            var $cg_gallery_rating_div_child = jQuery(this).closest('.cg_gallery_rating_div_child');
            cgJsClass.gallery.rating.set_five_star_details_opened_for_mobile_voting($cg_gallery_rating_div_child);
        }else{
            return;
        }
    });

    jQuery( document ).on('click','.cg_gallery_rating_div_five_star_details_close_button',function() {

        cgJsClass.gallery.rating.cg_gallery_rating_div_five_star_details_close_button(jQuery(this));

    });

    jQuery( document ).on('click touchstart','body.cg_gallery_rating_div_five_star_details_is_opened',function(e) {

        if(!cgJsClass.gallery.vars.isMobile){return;}

        var $cg_gallery_rating_div_five_star_details = jQuery(e.target).closest('.cg_gallery_rating_div_five_star_details');

        if((jQuery(e.target).hasClass('cg_gallery_rating_div_five_star_details') || $cg_gallery_rating_div_five_star_details.length) && cgJsClass.gallery.vars.isMobile){return;}

        if(jQuery(e.target).hasClass('cg_rate_star_five_star') || jQuery(e.target).hasClass('cg_rate_minus_five_star') || jQuery(e.target).closest('.cg_rate_star_five_star').length || jQuery(e.target).closest('.cg_rate_minus_five_star').length){
            return;
        }

        e.preventDefault();

        if($cg_gallery_rating_div_five_star_details.length || jQuery(e.target).hasClass('cg_gallery_rating_div_five_star_details') || jQuery(e.target).closest('.cg_gallery_rating_div_star').length || jQuery(e.target).hasClass('cg_rate_minus')){
            $cg_gallery_rating_div_five_star_details.addClass('cg_hide');
            jQuery(this).removeClass('cg_gallery_rating_div_five_star_details_is_opened');

            cgJsClass.gallery.vars.dom.html.removeClass('cg_no_scroll');
            cgJsClass.gallery.vars.dom.body.removeClass('cg_no_scroll cg_visibility_hidden');

            return;
        }else{
            var $cg_gallery_rating_div_five_star_details_is_opened = jQuery('#cg_gallery_rating_div_five_star_details_is_opened');
            if($cg_gallery_rating_div_five_star_details_is_opened.length>=1){
                $cg_gallery_rating_div_five_star_details_is_opened.addClass('cg_hide');
                $cg_gallery_rating_div_five_star_details_is_opened.removeAttr('id');
                jQuery(this).removeClass('cg_gallery_rating_div_five_star_details_is_opened');

                cgJsClass.gallery.vars.dom.html.removeClass('cg_no_scroll');
                cgJsClass.gallery.vars.dom.body.removeClass('cg_no_scroll cg_visibility_hidden');

            }
        }
    });

    jQuery( document ).on( 'click', '.mainCGslider .cg_gallery_rating_div_five_star_details', function(e) {

        if(!cgJsClass.gallery.vars.isMobile){return;}

        e.preventDefault();
        var $element = jQuery(this);
        //   setTimeout(function () {
        var gid = $element.attr('data-cg-gid');
        var realId = $element.attr('data-cg-real-id');

        var $toClick = jQuery('#mainCGslider'+gid+' .cgGalleryInfo'+realId);
        //  $toClick.addClass('cg-pass-through');
        cgJsClass.gallery.vars.passThrough = true;
        $toClick.click();
        //         },10);

    });

    // end mobile here

    jQuery( document ).on( 'mousemove', '.cg_gallery_rating_div_child.cg_gallery_rating_div_child_five_star', function(e) {

        e.preventDefault();

        var gid = jQuery(this).attr('data-cg-gid');
        var realId = jQuery(this).attr('data-cg-real-id');
        var $eTarget = jQuery(e.target);
        var sliderView = false;

        if($eTarget.hasClass('cg_rate_minus')){
            return;
        }

        if($eTarget.hasClass('cg_voted_confirm')){
            return;
        }

        if(cgJsData[gid].vars.currentLook=='slider'){
            sliderView = true;
        }

        var $mainCGslider = jQuery(this).closest('.mainCGslider');

        if(sliderView && $mainCGslider.length){// remove only in slider! Do not remove in single view!
            return;
        }

        if(cgJsData[gid].options.pro.IsModernFiveStar==1 && !(cgJsData[gid].vars.isUserGallery || cgJsData[gid].vars.isOnlyGalleryNoVoting || cgJsData[gid].vars.isOnlyGalleryWinner)){
            if(cgJsData[gid].options.general.HideUntilVote == 1 && (cgJsData[gid].cgJsCountRuser[realId] == 0 || typeof cgJsData[gid].cgJsCountRuser[realId] == 'undefined')){
                return;
            }
        }

        if(cgJsData[gid].options.pro.IsModernFiveStar==1 && !cgJsClass.gallery.vars.isMobile){

            //   if($mainCGslider.length){

            cgJsClass.gallery.rating.setDetailsPositionInSlider(gid,realId,jQuery(this));

            //      }

            if($eTarget.hasClass('cg_gallery_rating_div_child') || $eTarget.closest('.cg_gallery_rating_div_child').length>=1){

                var $cg_gallery_rating_div_five_star_details = jQuery(this).find('.cg_gallery_rating_div_five_star_details');
                $cg_gallery_rating_div_five_star_details.removeAttr('style');//remove margin-left

                if((cgJsData[gid].options.visual.RatingPositionGallery==3 || cgJsData[gid].vars.currentLook=='row') && !sliderView){// most like right space is very low in this cases

                    //might happen because of fast clicking!
                    //error would appear then in console
                    if(!$cg_gallery_rating_div_five_star_details.offset()){
                        return;
                    }

                    // calculation if margn left required
                    var windowWidth = jQuery(window).width();
                    var eventuallyMinusMarginLeftToSet = $cg_gallery_rating_div_five_star_details.offset().left+$cg_gallery_rating_div_five_star_details.width()-windowWidth+25;//+16=average scrollbar width, but some space left also requied
                    if(eventuallyMinusMarginLeftToSet>0){
                        $cg_gallery_rating_div_five_star_details.css('margin-left','-'+eventuallyMinusMarginLeftToSet+'px');
                    }
                }

                if(sliderView && (cgJsClass.gallery.vars.fullwindow || cgJsClass.gallery.vars.fullscreen)){
                    $cg_gallery_rating_div_five_star_details.addClass('cg_hidden').removeClass('cg_hide');// this way real outerHeight can be get
                    //var topToSet = $cg_gallery_rating_div_five_star_details.outerHeight()+4;
                    //$cg_gallery_rating_div_five_star_details.css('top','-'+topToSet+'px');
                }else{
                    $cg_gallery_rating_div_five_star_details.removeAttr('style');
                }

                //var widthRatingDiv = jQuery(this).outerWidth(true);
                var widthStar = jQuery(this).find('.cg_rate_star_five_star').outerWidth(true);
                var widthDivCount = jQuery(this).find('.cg_gallery_rating_div_count').outerWidth(true);
                var widthRatingDiv = widthStar+widthDivCount;// have to be calculated this way, then it is also good for single view, because rating_div is full streched there
                /*                    console.log('widthRatingDiv');
                                    console.log(widthRatingDiv);
                                    console.log('widthStar');
                                    console.log(widthStar);*/

                $cg_gallery_rating_div_five_star_details.addClass('cg_hidden');
                $cg_gallery_rating_div_five_star_details.removeClass('cg_hide cg_fade_out');

                var widthDetails = $cg_gallery_rating_div_five_star_details.outerWidth(true);

                /*                    console.log('widthDetails');
                                    console.log(widthDetails);*/

                var left = ((widthDetails-widthRatingDiv)/2+widthStar)*-1;// +widthStar because details is cg_gallery_rating_div_count
                $cg_gallery_rating_div_five_star_details.css('left',left+'px');

                $cg_gallery_rating_div_five_star_details.removeClass('cg_hidden');

                jQuery(this).addClass('cg_opacity_1');

            }else{
                jQuery(this).find('.cg_gallery_rating_div_five_star_details').addClass('cg_hide');
                jQuery(this).removeClass('cg_opacity_1');
            }

        }

    });

    jQuery( document ).on( 'mouseleave', '.cg_gallery_rating_div_child.cg_gallery_rating_div_child_five_star', function(e) {

        e.preventDefault();

        //        return;

        var gid = jQuery(this).attr('data-cg-gid');
        if(cgJsData[gid].options.pro.IsModernFiveStar==1 && !cgJsClass.gallery.vars.isMobile){
            jQuery(this).find('.cg_gallery_rating_div_five_star_details').addClass('cg_hide');
            jQuery(this).removeClass('cg_opacity_1');
        }

    });

    jQuery( document ).on( 'blur', '#cg_messages_container_pro_select_label', function(e) {
        cgJsClass.gallery.vars.onBlurCg_messages_container_pro_select_label = true;
    });

    jQuery( document ).on( 'click', '#cg_messages_container_pro_select_label', function(e) {
        jQuery(this).find('.cg_messages_container_pro_select_placeholder').attr('disabled','disabled');
    });

    jQuery( document ).on( 'click', '.cg_gallery_rating_div_child_five_star', function(e) {

        var $eTarget = jQuery(e.target);
        if($eTarget.hasClass('cg_rate_minus_five_star')){
            e.preventDefault();
            return false;
        }

        var gid = jQuery(this).attr('data-cg-gid');

        if(String(gid).indexOf('-u')>=0 || cgJsData[gid].vars.isUserGallery){
            if(jQuery(this).closest('.cgCenterDiv').length){
                e.preventDefault();
                cgJsClass.gallery.function.message.show(cgJsClass.gallery.language[gid].YouCanNotVoteInOwnGallery);
                return;
            }
        }

        if((cgJsData[gid].vars.isUserGallery || cgJsData[gid].vars.isOnlyGalleryNoVoting || cgJsData[gid].vars.isOnlyGalleryWinner) && !cgJsClass.gallery.vars.isMobile){
            e.preventDefault();
            return;
        }

        var $cgCenterDiv = jQuery(this).closest('.cgCenterDiv');

        // for mobile make voting only in $cgCenterDiv
        // otherwise not right behaviour, too complex because of stars at gallery view and stars at image when slide out is activated
        if(cgJsClass.gallery.vars.isMobile && !$cgCenterDiv.length && (cgJsData[gid].options.general.FullSizeImageOutGallery!=1 && cgJsData[gid].options.general.OnlyGalleryView!=1)){
            //return;
        }

        // take care of order, this here has to be done before details check
        if(cgJsData[gid].vars.currentLook=='slider'){
            // then clicked from slider preview
            if(jQuery(this).closest('.mainCGslider').length>=1){
                e.preventDefault();
                return;
            }
        }

        var $cg_gallery_rating_div_child = jQuery(this).closest('.cg_gallery_rating_div_child');
        // check also if it is not done already in cg_gallery_rating_div_five_star_details
        //    if(cgJsData[gid].options.pro.IsModernFiveStar==1 && cgJsClass.gallery.vars.isMobile && !$cg_gallery_rating_div_child.closest('.cg_gallery_rating_div_five_star_details').length){// open for mobile first
        // old logic does not allow for OnlyGalleryView and FullSizeImageOutGallery
        //if(!$cg_gallery_rating_div_child.find('.cg_gallery_rating_div_five_star_details').hasClass('cg_opened_for_mobile_voting') && cgJsData[gid].options.general.FullSizeImageOutGallery!=1 && cgJsData[gid].options.general.OnlyGalleryView!=1){
        /*            if(!$cg_gallery_rating_div_child.find('.cg_gallery_rating_div_five_star_details').hasClass('cg_opened_for_mobile_voting')){
                        cgJsClass.gallery.rating.set_five_star_details_opened_for_mobile_voting($cg_gallery_rating_div_child);
                        return;
                    }*/
        //   }

        var minusVoteNow = 0;

        if(jQuery(this).hasClass('cg_rate_out_gallery_disallowed') && cgJsData[gid].options.general.RatingOutGallery!='1' && cgJsData[gid].vars.currentLook!='blog'){
            e.preventDefault();
            return;
        }

        if(!cgJsData[gid].options.general.AllowRatingDynamic){
            e.preventDefault();
            return;
        }

        if(!$cgCenterDiv.length && cgJsData[gid].options.general.RatingOutGallery!='1'){
            if(!jQuery(this).closest('.cg_show_href_target_blank').length && cgJsData[gid].options.general.FullSizeImageOutGallery==1){
                e.preventDefault();
            }
            return;
        }

        if((String(gid).indexOf('-u')>=0 || cgJsData[gid].vars.isUserGallery) && !cgJsClass.gallery.vars.isMobile){
            if(jQuery(this).closest('.cgCenterDiv').length){
                cgJsClass.gallery.function.message.show(cgJsClass.gallery.language[gid].YouCanNotVoteInOwnGallery);
                e.preventDefault();
                return;
            }else{
                e.preventDefault();
                return;
            }
        }

        if(cgJsData[gid].vars.cg_check_login==1 && cgJsData[gid].vars.cg_user_login_check==0){
            cgJsClass.gallery.function.message.show(cgJsClass.gallery.language[gid].OnlyRegisteredUsersCanVote);
            e.preventDefault();
            return false;
        }

        e.preventDefault();

        if(cgJsData[gid].options.pro.MinusVote==1 && jQuery(this).hasClass('cg_rate_minus')){
            minusVoteNow = 1;
        }

        var cg_picture_id = jQuery(this).attr('data-cg-real-id');

        var cg_rate_value = 1;

        if(!jQuery(this).hasClass('cg_rate_minus')){
            cg_rate_value = jQuery(this).attr('data-cg_rate_star');
        }

        cgJsClass.gallery.vars.$cgCenterDivSelectVote = $cgCenterDiv;
        cgJsClass.gallery.vars.$cg_gallery_rating_div_child_SelectVote = $cg_gallery_rating_div_child;
        cgJsClass.gallery.rating.showSelectVote($cg_gallery_rating_div_child,gid,cg_picture_id);

    });

/*    jQuery( document ).on( 'change', '.cg_messages_container_pro_select', function(e) {
        jQuery(this).removeClass('cg_messages_container_pro_select_error');
        if(jQuery(this).val()==''){
            var $cgMessagesContainerPro = jQuery(this).closest('.cg_messages_container_pro');
            $cgMessagesContainerPro.find('.cg_gallery_rating_div_count_plus').text('').addClass('cg_hide');
            $cgMessagesContainerPro.find('.cg_five_star_details_row_number_rating_plus').text('').addClass('cg_hide');
        }else{
            jQuery(this).find('.cg_messages_container_pro_select_placeholder').remove();
            var $cgMessagesContainerPro = jQuery(this).closest('.cg_messages_container_pro');
            $cgMessagesContainerPro.find('.cg_gallery_rating_div_count_plus').text('+'+jQuery(this).val()).removeClass('cg_hide');
            $cgMessagesContainerPro.find('.cg_five_star_details_row_number_rating_plus').text('').addClass('cg_hide');
            $cgMessagesContainerPro.find('.cg_five_star_details_row_number_rating_plus[data-cg-r-count="'+jQuery(this).val()+'"]').text('+'+jQuery(this).val()).removeClass('cg_hide');
        }
    });*/

    jQuery(document).on("mouseenter", ".cg_messages_container_pro .cg_gallery_rating_div_total_count_to_vote .cg_gallery_rating_div_star_one_star", function() {
        if(cgJsClass.gallery.vars.isMobile){
            return;
        }
        var gid = jQuery(this).attr('data-cg-gid');
        jQuery(this).addClass('cg_gallery_rating_div_one_star_on').removeClass('cg_gallery_rating_div_one_star_off');
        var $prev = undefined;
        var vote = jQuery(this).attr('data-cg-vote');
        for(var rCount=cgJsData[gid].options.general.AllowRatingDynamic;rCount>=1;rCount--){
            if(!$prev){
                $prev = jQuery(this).prev();
            }else{
                $prev = $prev.prev();
            }
            $prev.addClass('cg_gallery_rating_div_one_star_on').removeClass('cg_gallery_rating_div_one_star_off');
        }
        var $cgMessagesContainerPro = jQuery(this).closest('.cg_messages_container_pro');
        $cgMessagesContainerPro.find('.cg_gallery_rating_div_count_plus').text('+'+vote).removeClass('cg_hide').attr('data-cg-vote',vote);
        //$cgMessagesContainerPro.find('.cg_five_star_details_row_number_rating_plus').text('').addClass('cg_hide');
        //$cgMessagesContainerPro.find('.cg_five_star_details_row_number_rating_plus[data-cg-r-count="'+vote+'"]').text('+'+vote).removeClass('cg_hide');
    });

    jQuery(document).on("mouseleave", ".cg_messages_container_pro .cg_gallery_rating_div_total_count_to_vote .cg_gallery_rating_div_star_one_star", function() {
        if(cgJsClass.gallery.vars.isMobile){
            return;
        }
            jQuery(this).closest('.cg_gallery_rating_div_total_count').find('.cg_gallery_rating_div_star_one_star').addClass('cg_gallery_rating_div_one_star_off').removeClass('cg_gallery_rating_div_one_star_on');
        var $cgMessagesContainerPro = jQuery(this).closest('.cg_messages_container_pro');
        $cgMessagesContainerPro.find('.cg_gallery_rating_div_count_plus').addClass('cg_hide');
        //$cgMessagesContainerPro.find('.cg_five_star_details_row_number_rating_plus').addClass('cg_hide');
    });

    jQuery( document ).on( 'click', '.cg_messages_container_pro .cg_gallery_rating_div_total_count_to_vote .cg_gallery_rating_div_star_one_star,' +
        '.cg_messages_container_pro .cg_messages_container_pro_select_button,.cg_rate_minus.cg_rate_minus_five_star', function(e) {

        var gid = jQuery(this).attr('data-cg-gid');

        var minusVoteNow = 0;

        if(cgJsData[gid].options.pro.MinusVote==1 && jQuery(this).hasClass('cg_rate_minus')){
            minusVoteNow = 1;
        }

        var cg_picture_id = jQuery(this).attr('data-cg-real-id');

        if(minusVoteNow){
            var $cgCenterDiv = jQuery(this).closest('.cgCenterDiv');
            var $cg_gallery_rating_div_child = jQuery(this).closest('.cg_gallery_rating_div_child');

            // for mobile make voting only in $cgCenterDiv
            // otherwise not right behaviour, too complex because of stars at gallery view and stars at image when slide out is activated
            if(cgJsClass.gallery.vars.isMobile && !$cgCenterDiv.length && (cgJsData[gid].options.general.FullSizeImageOutGallery!=1 && cgJsData[gid].options.general.OnlyGalleryView!=1)){
                return;
            }

        }else{// then must be click from vote button!
            var $cgCenterDiv = cgJsClass.gallery.vars.$cgCenterDivSelectVote;
            var $cg_gallery_rating_div_child = cgJsClass.gallery.vars.$cg_gallery_rating_div_child_SelectVote;
        }

        var cg_rate_value = 1;

        if(!minusVoteNow){
            //var $cg_gallery_rating_div_five_star_details_select =  jQuery(this).closest('.cg_gallery_rating_div_five_star_details_select');
            cg_rate_value =  jQuery(this).attr('data-cg-vote');
            //cg_rate_value =  $cg_gallery_rating_div_five_star_details_select.find('.cg_messages_container_pro_select').val();
/*            if(!cg_rate_value){
                $cg_gallery_rating_div_five_star_details_select.find('.cg_messages_container_pro_select').addClass('cg_messages_container_pro_select_error');
                return;
            }*/
        }
        var $cgMessagesContainerPro = jQuery(this).closest('.cg_messages_container_pro');

        if(cgJsClass.gallery.vars.isMobile && !minusVoteNow && !jQuery(this).hasClass('cg_messages_container_pro_select_button')){
            // reset before
            jQuery(this).closest('.cg_gallery_rating_div_total_count').find('.cg_gallery_rating_div_star_one_star').addClass('cg_gallery_rating_div_one_star_off').removeClass('cg_gallery_rating_div_one_star_on');
            jQuery(this).addClass('cg_gallery_rating_div_one_star_on').removeClass('cg_gallery_rating_div_one_star_off');
            var $prev = undefined;
            for(var rCount=cgJsData[gid].options.general.AllowRatingDynamic;rCount>=1;rCount--){
                if(!$prev){
                    $prev = jQuery(this).prev();
                }else{
                    $prev = $prev.prev();
                }
                $prev.addClass('cg_gallery_rating_div_one_star_on').removeClass('cg_gallery_rating_div_one_star_off');
            }
            $cgMessagesContainerPro.find('.cg_gallery_rating_div_count_plus').text('+'+cg_rate_value).removeClass('cg_hide').attr('data-cg-vote',cg_rate_value);
            $cgMessagesContainerPro.find('.cg_messages_container_pro_select_button_container .cg_messages_container_pro_select_button').attr('data-cg-vote',cg_rate_value);
            if($cgMessagesContainerPro.find('.cg_messages_container_pro_select_button_container').hasClass('cg_hide')){
                $cgMessagesContainerPro.find('.cg_messages_container_pro_select_button_container').removeClass('cg_hide');
                return;
            }else{
                return;
            }
        }

        cgJsClass.gallery.function.message.close(true);

        cgJsClass.gallery.vars.dom.html.addClass('cg_pointer_events_none');

        setTimeout(function (){
            cgJsClass.gallery.vars.dom.html.removeClass('cg_pointer_events_none');
        },1500);

        if(cgJsData[gid].vars.currentLook=='blog'){

            //  cgJsData[gid].cgCenterDivBlogObject[cg_picture_id].find('.cg_gallery_rating_div_child').empty().addClass('cg-lds-dual-ring-star-loading');

            var isFromSingleView = true;

            var $cg_gallery_rating_div_child = cgJsData[gid].cgCenterDivBlogObject[cg_picture_id].find('.cg_gallery_rating_div_child');

            if($cg_gallery_rating_div_child.find('.cg_gallery_rating_div_five_star_details').hasClass('cg_opened_for_mobile_voting')){
                //var $cg_gallery_rating_div_count_new = jQuery( "<div class='cg_gallery_rating_div_count'></div>");
                //$cg_gallery_rating_div_count_new.append($cg_gallery_rating_div_child.find('.cg_gallery_rating_div_five_star_details').clone().empty().addClass('cg-lds-dual-ring-star-loading cg_voting_in_process'));
                //$cg_gallery_rating_div_child.empty().addClass('cg-lds-dual-ring-star-loading').append($cg_gallery_rating_div_count_new);
                cgJsClass.gallery.rating.reset_cg_gallery_rating_div_five_star_details_for_loading($cg_gallery_rating_div_child.find('.cg_gallery_rating_div_five_star_details'));
            }else{
                $cg_gallery_rating_div_child.height($cg_gallery_rating_div_child.height());
                $cg_gallery_rating_div_child.empty().addClass('cg-lds-dual-ring-star-loading');
            }

        }else{

            var imageObject = cgJsData[gid].imageObject[cg_picture_id];

            var $cg_gallery_rating_div_childImageObject = imageObject.find('.cg_gallery_rating_div_child');

            /// TO CONTINUE HERE!!!!
            if(cgJsData[gid].options.general.FullSizeImageOutGallery!=1 && cgJsData[gid].options.general.OnlyGalleryView!=1) {
                $cg_gallery_rating_div_childImageObject.height($cg_gallery_rating_div_child.height());
                $cg_gallery_rating_div_childImageObject.empty().addClass('cg-lds-dual-ring-star-loading');
            }else if(cgJsData[gid].options.general.FullSizeImageOutGallery==1 || cgJsData[gid].options.general.OnlyGalleryView==1) {

                // if(cgJsData[gid].vars.currentLook=='blog' || cgJsData[gid].vars.currentLook=='slider'){
                $cg_gallery_rating_div_childImageObject.height($cg_gallery_rating_div_child.height());
                $cg_gallery_rating_div_childImageObject.empty().addClass('cg-lds-dual-ring-star-loading');
                //         }

            }

            var isFromSingleView = false;

            if($cgCenterDiv.length>=1){
                isFromSingleView = true;
            }

            if($cgCenterDiv.length && $cgCenterDiv.is(':visible')){
                if(cgJsData[gid].vars.openedRealId==cg_picture_id){

                    var $cg_gallery_rating_div_child = $cgCenterDiv.find('.cg_gallery_rating_div_child');

                    if($cg_gallery_rating_div_child.find('.cg_gallery_rating_div_five_star_details').hasClass('cg_opened_for_mobile_voting')){
                        // var $cg_gallery_rating_div_count_new = jQuery( "<div class='cg_gallery_rating_div_count'></div>");
                        // $cg_gallery_rating_div_count_new.append($cg_gallery_rating_div_child.find('.cg_gallery_rating_div_five_star_details').clone().empty().addClass('cg-lds-dual-ring-star-loading cg_voting_in_process'));
                        // $cg_gallery_rating_div_child.empty().addClass('cg-lds-dual-ring-star-loading').append($cg_gallery_rating_div_count_new);
                        cgJsClass.gallery.rating.reset_cg_gallery_rating_div_five_star_details_for_loading($cg_gallery_rating_div_child.find('.cg_gallery_rating_div_five_star_details'));
                    }else{
                        $cg_gallery_rating_div_child.height($cg_gallery_rating_div_child.height());
                        $cg_gallery_rating_div_child.empty().addClass('cg-lds-dual-ring-star-loading');
                    }

                }
            }else{

                /// TO CONTINUE HERE!!!!!
                if(cgJsData[gid].options.general.FullSizeImageOutGallery==1 || cgJsData[gid].options.general.OnlyGalleryView==1) {
                    var $cg_gallery_rating_div_five_star_details = jQuery(this).closest('.cg_gallery_rating_div_five_star_details');
                    if($cg_gallery_rating_div_five_star_details.hasClass('cg_opened_for_mobile_voting')){
                        cgJsClass.gallery.rating.reset_cg_gallery_rating_div_five_star_details_for_loading(jQuery(this).closest('.cg_gallery_rating_div_five_star_details'));
                    }else{
                        $cg_gallery_rating_div_childImageObject.empty().addClass('cg-lds-dual-ring-star-loading');
                    }
                }

            }

        }

        jQuery.ajax({
            url : post_cg_rate_v10_fiveStar_wordpress_ajax_script_function_name.cg_rate_v10_fiveStar_ajax_url,
            type : 'post',
            data : {
                action : 'post_cg_rate_v10_fiveStar',
                gid : cgJsData[gid].vars.gidReal,
                galeryIDuser : gid,
                pid : cg_picture_id,
                value : cg_rate_value,
                minusVoteNow : minusVoteNow,
                galleryHash : cgJsData[gid].vars.galleryHash,
                isFromSingleView : isFromSingleView
            }
        }).done(function(response) {

            if($cg_gallery_rating_div_childImageObject){
                $cg_gallery_rating_div_childImageObject.height('auto');
            }

            var parser = new DOMParser();
            var parsedHtml = parser.parseFromString(response, 'text/html');

            jQuery(parsedHtml).find('script[data-cg-processing="true"]').each(function () {

                var script = jQuery(this).html();
                eval(script);

            });


        }).fail(function(xhr, status, error) {

            cgJsClass.gallery.rating.setRatingFiveStar(cg_picture_id,0,0,false,gid,false,false);

        }).always(function() {

        });

    });

};

cgJsClass.gallery.rating.showSelectVote = function($cg_gallery_rating_div_child,gid,cg_picture_id)
{
    cgJsClass.gallery.vars.dom.html.addClass('cg_no_scroll');
    cgJsClass.gallery.vars.dom.body.addClass('cg_no_scroll cg_show_select_vote_multiple_stars_opened');

    var realId = cg_picture_id;
    var isUserGalleryMessageForMobile = false;
    var isShowOnlyOverviewForMobile = false;

    //cgJsData[index].vars.isUserGallery = <?php echo json_encode($isUserGallery); ?>;
//cgJsData[index].vars.isOnlyGalleryNoVoting = <?php echo json_encode($isOnlyGalleryNoVoting); ?>;
//cgJsData[index].vars.isOnlyGalleryWinner = <?php echo json_encode($isOnlyGalleryWinner); ?>;

    if(cgJsData[gid].vars.isUserGallery && cgJsClass.gallery.vars.isMobile){
        isUserGalleryMessageForMobile = true;
    }

    if((cgJsData[gid].vars.isUserGallery || cgJsData[gid].vars.isOnlyGalleryNoVoting || cgJsData[gid].vars.isOnlyGalleryWinner) && cgJsClass.gallery.vars.isMobile){
        isShowOnlyOverviewForMobile = true;
    }

    var $cg_gallery_rating_div_five_star_details = $cg_gallery_rating_div_child.find('.cg_gallery_rating_div_five_star_details').clone();
    // width required to be set because of developer toos handling. Developer tools might simulate monitor width in some cases for CSS.
    $cg_gallery_rating_div_five_star_details.width(jQuery(window).width()-18);// -18 because of padding

    $cg_gallery_rating_div_five_star_details.find('.cg_gallery_rating_div_child.cg_gallery_rating_div_child_five_star').addClass('cg_hide');

    var $container = jQuery('<div><div class="cg_gallery_rating_div"></div></div>');
    $container.find('.cg_gallery_rating_div').append($cg_gallery_rating_div_five_star_details);

    if(!cgJsData[gid].vars.isOnlyGalleryNoVoting && !cgJsData[gid].vars.isOnlyGalleryWinner){
        if(isUserGalleryMessageForMobile){
            $container.find('.cg_gallery_rating_div').append('<div class="cg_messages_container_pro_select_title" >'+cgJsClass.gallery.language[gid].YouCanNotVoteInOwnGallery+'</div>');
        }else{
            $container.find('.cg_gallery_rating_div').append('<div class="cg_messages_container_pro_select_title">'+cgJsClass.gallery.language[gid].YourVote+'</div>');
        }
    }

    if(!cgJsData[gid].vars.isOnlyGalleryNoVoting && !cgJsData[gid].vars.isOnlyGalleryWinner && !cgJsData[gid].vars.isUserGallery){
        var totalCountContainerToVoteString = '<div class="cg_gallery_rating_div_total_count cg_gallery_rating_div_total_count_to_vote">';
        var voteCount = 1;
        for(var rCount=cgJsData[gid].options.general.AllowRatingDynamic;rCount>=1;rCount--){
            totalCountContainerToVoteString += '<div class="cg_gallery_rating_div_star_one_star cg_gallery_rating_div_one_star_off" ' +
                'data-cg-vote="'+voteCount+'" data-cg-gid="'+gid+'" data-cg-real-id="'+realId+'"></div>';
            voteCount++;
        }
        totalCountContainerToVoteString +='</div>';
        $container.find('.cg_gallery_rating_div').append(totalCountContainerToVoteString);
    }

    var selectString = '';

    if(!isShowOnlyOverviewForMobile){
        selectString += '<div class="cg_messages_container_pro_select_container">';
        selectString += '<label for="cg_messages_container_pro_select_label" class="cg_messages_container_pro_select_label">';

        var fileType = cgJsData[gid].vars.rawData[realId].ImgType;

        var isAlternativeFileType = cgJsClass.gallery.function.general.tools.isAlternativeFileType(gid,realId);

        if(isAlternativeFileType && isAlternativeFileType=='video'){
            var imgSrcOriginal = cgJsClass.gallery.function.general.tools.checkSsl(cgJsData[gid].vars.rawData[realId].full);
            selectString += '<div class="cg_messages_container_pro_select_alternative_file_type" >' +
                    '<video width="100%" height="100%" >' +
                        '<source src="'+imgSrcOriginal+'#t=0.001" type="video/mp4">' +
                        '<source src="'+imgSrcOriginal+'#t=0.001" type="video/'+fileType+'">' +
                    '</video>' +
                '</div>';
        }else if(isAlternativeFileType){
            selectString += '<div class="cg_messages_container_pro_select_alternative_file_type cg_messages_container_pro_select_'+fileType+'" ></div>';
            selectString += '<div class="cg_messages_container_pro_select_alternative_file_type_name" >'+cgJsData[gid].vars.rawData[realId]['NamePic']+'</div>';
        }else{
            selectString += '<div class="cg_messages_container_pro_select_image" style="background-image: url('+cgJsData[gid].vars.rawData[cg_picture_id]['large']+');"></div>';
        }



        //selectString += '<select class="cg_messages_container_pro_select" id="cg_messages_container_pro_select_label">';
        //selectString += '<option value="" class="cg_messages_container_pro_select_placeholder">&middot;&nbsp;&middot;&nbsp;&middot;</option>';

/*        for(var rCount=cgJsData[gid].options.general.AllowRatingDynamic;rCount>=1;rCount--){
            selectString += '<option value="' + rCount + '">'+rCount+'</option>';
        }*/

        //selectString += '</select>';
        selectString += '</label>';
        //selectString += '<div class="cg_messages_container_pro_select_star"></div>';
        selectString += '</div>';
/*        selectString += '<div class="cg_messages_container_pro_select_button_container">' +
            '<div class="cg_messages_container_pro_select_button" data-cg-gid="' + gid + '" data-cg-real-id="' + cg_picture_id + '">'+cgJsClass.gallery.language[gid].VoteNow+'</div>' +
            '</div>';*/
    }

    $container.append('<div class="cg_messages_container_pro_select_button_container cg_hide">' +
        '<div class="cg_messages_container_pro_select_button" data-cg-gid="' + gid + '" data-cg-real-id="' + cg_picture_id + '">'+cgJsClass.gallery.language[gid].VoteNow+'</div>' +
    '</div>');

    if(cgJsData[gid].vars.rawData[realId].ImgType=='con'){
        var inputFieldId = cgJsData[gid].options.visual['Field1IdGalleryView'];
        if(inputFieldId && cgJsData[gid].vars.info[realId] && cgJsData[gid].vars.info[realId][inputFieldId] && cgJsData[gid].vars.info[realId][inputFieldId]['field-content']){
            var $selectDiv = jQuery('<div class="cg_gallery_rating_div_five_star_details_con_entry">'+cgJsData[gid].vars.info[realId][inputFieldId]['field-content']+'</div>');
            $container.prepend($selectDiv);
        }
    }else{
        var $selectDiv = jQuery('<div class="cg_gallery_rating_div_five_star_details_select">'+selectString+'</div>');
        $container.prepend($selectDiv);
    }


    $container.append('<div class="cg_gallery_rating_div_show_select_sum_explanation">&nbsp;&nbsp; = '+cgJsClass.gallery.language[gid].Sum+'</div>');

    var $cg_gallery_rating_div_child_for_gettingCount = $cg_gallery_rating_div_child.clone();
    var $cg_gallery_rating_div_count_for_gettingCount = $cg_gallery_rating_div_child_for_gettingCount.find('.cg_gallery_rating_div_count');
    $cg_gallery_rating_div_count_for_gettingCount.find('.cg_gallery_rating_div_star_hover, .cg_gallery_rating_div_five_star_details').remove();
    var countToSet = parseInt($cg_gallery_rating_div_count_for_gettingCount.text().trim());

    var cg_gallery_rating_div_one_star_off_or_on = 'cg_gallery_rating_div_one_star_off';
    if(!isNaN(countToSet) && countToSet>0){
        cg_gallery_rating_div_one_star_off_or_on = 'cg_gallery_rating_div_one_star_on';
    }

    if(isNaN(countToSet)){
        countToSet = '';
    }

    var $totalCountContainer = jQuery('<div class="cg_gallery_rating_div_total_count">' +
        '<div class="cg_gallery_rating_div_star_one_star '+cg_gallery_rating_div_one_star_off_or_on+'"></div>'+
        '<div class="cg_gallery_rating_div_count">'+countToSet+'<div class="cg_gallery_rating_div_count_plus cg_hide"></div></div>'+
        '</div>');

    $totalCountContainer.insertBefore($container.find('.cg_gallery_rating_div_five_star_details'));

    $cg_gallery_rating_div_five_star_details.removeAttr('style');// execute here, not earlier
    $cg_gallery_rating_div_five_star_details.find('.cg_five_star_details_arrow_up, .cg_gallery_rating_div_five_star_details_close_button, .cg_gallery_rating_overview').remove();
    $cg_gallery_rating_div_five_star_details.removeClass('cg_hide');

    if(cgJsData[gid].vars.centerWhite == 1 && cgJsData[gid].vars.openedRealId){
        jQuery('#cgMessagesContainer').addClass('cg_fe_controls_style_white').removeClass('cg_fe_controls_style_black');
        jQuery('#cgMessagesContainerPro').addClass('cg_fe_controls_style_white').removeClass('cg_fe_controls_style_black');
    }else if(cgJsData[gid].vars.openedRealId){// then must be black
        jQuery('#cgMessagesContainer').addClass('cg_fe_controls_style_black').removeClass('cg_fe_controls_style_white');
        jQuery('#cgMessagesContainerPro').addClass('cg_fe_controls_style_black').removeClass('cg_fe_controls_style_white');
    }

    if(jQuery(window).width()<700){
        cgJsClass.gallery.function.message.showPro($container.html(),undefined,undefined,undefined,undefined,undefined,undefined,false,gid);
    }else{
    cgJsClass.gallery.function.message.showPro($container.html(),undefined,undefined,undefined,undefined,undefined,undefined,true,gid);
}

}

cgJsClass.gallery.rating.set_five_star_details_opened_for_mobile_voting = function($cg_gallery_rating_div_child)
{
    var $cg_gallery_rating_div = $cg_gallery_rating_div_child.closest('.cg_gallery_rating_div').clone();
    $cg_gallery_rating_div.find('.cg_gallery_rating_div_star_hover').remove();
    $cg_gallery_rating_div.find('.cg_gallery_rating_div_five_star_details').remove();
    $cg_gallery_rating_div_child.find('.cg_gallery_rating_div').remove();
    $cg_gallery_rating_div_child.addClass('cg_opacity_1');
    var $cg_gallery_rating_div_five_star_details = $cg_gallery_rating_div_child.find('.cg_gallery_rating_div_five_star_details');
    // width required to be set because of developer toos handling. Developer tools might simulate monitor width in some cases for CSS.
    $cg_gallery_rating_div_five_star_details.width(jQuery(window).width()-18);// -18 because of padding
    $cg_gallery_rating_div_five_star_details.removeClass('cg_hide').prepend($cg_gallery_rating_div).addClass('cg_opened_for_mobile_voting');

    // cgJsClass.gallery.vars.dom.body.removeClass('cg_gallery_rating_div_five_star_details_is_opened');
    cgJsClass.gallery.vars.dom.body.addClass('cg_gallery_rating_div_five_star_details_is_opened');
    cgJsClass.gallery.vars.dom.html.addClass('cg_no_scroll');
    cgJsClass.gallery.vars.dom.body.addClass('cg_no_scroll cg_visibility_hidden');
    cgJsClass.gallery.vars.cg_gallery_rating_div_five_star_details_close_button = $cg_gallery_rating_div_child.find('.cg_gallery_rating_div_five_star_details_close_button');
}

cgJsClass.gallery.rating.reset_cg_gallery_rating_div_five_star_details_for_loading = function($cg_gallery_rating_div_five_star_details)
{
    //console.log($cg_gallery_rating_div_five_star_details.length);

    $cg_gallery_rating_div_five_star_details.find('.cg_gallery_rating_div').remove();
    $cg_gallery_rating_div_five_star_details.find('.cg_five_star_details_row').remove();
    $cg_gallery_rating_div_five_star_details.find('.cg_five_star_details_average').remove();
    $cg_gallery_rating_div_five_star_details.find('.cg_gallery_rating_div_five_star_details_close_button').remove();
    $cg_gallery_rating_div_five_star_details.addClass('cg-lds-dual-ring-star-loading');
    //  $cg_gallery_rating_div_five_star_details.closest('.cg_gallery_rating_div_child').addClass('cg_opacity_1');

}
cgJsClass.gallery.rating.cg_gallery_rating_div_five_star_details_close_button = function($closeButton)
{

    if(!$closeButton){return;}
    if(!cgJsClass.gallery.vars.isMobile){return;}

    $closeButton.closest('.cg_gallery_rating_div_five_star_details').addClass('cg_hide').removeClass('cg_opened_for_mobile_voting');
    $closeButton.find('.cg_gallery_rating_div').remove();
    $closeButton.closest('.cg_gallery_rating_div_child').removeClass('cg_opacity_1');
    cgJsClass.gallery.vars.dom.body.removeClass('cg_gallery_rating_div_five_star_details_is_opened');

    cgJsClass.gallery.vars.dom.html.removeClass('cg_no_scroll');
    cgJsClass.gallery.vars.dom.body.removeClass('cg_no_scroll cg_visibility_hidden');


}