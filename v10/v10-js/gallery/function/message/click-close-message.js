cgJsClass.gallery.function.message.clickClose = function (){

    jQuery(document).on('click','#cgMessagesContainer',function(e){
        cgJsClass.gallery.function.message.close();
    });

};
cgJsClass.gallery.function.message.close = function (){

        jQuery('#cgMessagesContainer').addClass('cg_hide');
        cgJsClass.gallery.vars.messageContainerShown=false;
        cgJsClass.gallery.function.message.removeCloseMessageFrameOnBodyClick();

};
cgJsClass.gallery.function.message.removeCloseMessageFrameOnBodyClick = function(){

    jQuery('body.cg_frame_opened').off('click');
    jQuery('body').removeClass('cg_frame_opened');

};