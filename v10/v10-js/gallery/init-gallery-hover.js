cgJsClass.gallery.hover = {
    init: function ($) {

        // mit mouseenter und mouseleave machen!!!!! nicht mouseover und mouseout, da diese auf eventbubbling reagieren!!!!

        $(document).on("mouseenter", ".cg_show", function() {
            // hover starts code here

            var gid = $(this).attr('data-cg-gid');
            var realId = $(this).attr('data-cg-id');

            if($(this).hasClass('cg_show_info_bottom')){
                return;
            }

            if(cgJsData[gid].options.general.ShowAlways!=1){

                cgJsClass.gallery.function.general.tools.setHeightForInfoBlockInGallery(gid,$(this).find('.cg_gallery_info_title'),$(this),$(this).height(),$(this).width(),undefined,realId);

                if(cgJsData[gid].options.general.AllowRatingDynamic){
                    $(this).find('.cg_gallery_info').addClass('cg_fade_in_0');
                    if(!cgJsData[gid].vars.modernHover){
                        $(this).find('.cg_gallery_info_title').addClass('cg_fade_in_0_5');
                    }
                }else{
                    $(this).find('.cg_gallery_info').addClass('cg_fade_in_0_5');
                    if(!cgJsData[gid].vars.modernHover){
                        $(this).find('.cg_gallery_info_title').addClass('cg_fade_in_0_5');
                    }
                }

                if(cgJsData[gid].vars.currentLook=='slider' && cgJsData[gid].vars.rawData[realId].ImgType=='con'){
                    $(this).find('.cg_gallery_info').removeClass('cg_hide_till_hover_con');
                }

            }

        });

        $(document).on("mouseleave", ".cg_show", function() {
            // hover ends code here

            var gid = $(this).attr('data-cg-gid');
            var realId = $(this).attr('data-cg-id');
            if(cgJsData[gid].options.general.ShowAlways!=1){
                if(cgJsData[gid].options.general.AllowRatingDynamic){
                    $(this).find('.cg_gallery_info').removeClass('cg_fade_in_0');
                    if(!cgJsData[gid].vars.modernHover){
                        $(this).find('.cg_gallery_info_title').removeClass('cg_fade_in_0_5');
                    }
                }else{
                    $(this).find('.cg_gallery_info').removeClass('cg_fade_in_0_5');
                    if(!cgJsData[gid].vars.modernHover){
                        $(this).find('.cg_gallery_info_title').removeClass('cg_fade_in_0_5');
                    }
                }

                if(cgJsData[gid].vars.currentLook=='slider' && cgJsData[gid].vars.rawData[realId].ImgType=='con'){
                    $(this).find('.cg_gallery_info').addClass('cg_hide_till_hover_con');
                }

            }

        });

/*
        // funktioniert besser als zwei getrennte events, erste fünktion ist für mouseover und zweite für mouseout!!!!
        $('.cg_show').hover(function() {

                var gid = $(this).attr('data-cg-gid');
                if(cgJsData[gid].options.general.ShowAlways!=1){
                    $(this).find('.cg_gallery_info').fadeIn();
                    $(this).find('.cg_gallery_info_title').fadeIn();
                }

            },
            function(){

                var gid = $(this).attr('data-cg-gid');
                if(cgJsData[gid].options.general.ShowAlways!=1){
                    $(this).find('.cg_gallery_info').fadeOut();
                    $(this).find('.cg_gallery_info_title').fadeOut();
                }

            }
        );*/

    },
    fadeOutDone: false
};