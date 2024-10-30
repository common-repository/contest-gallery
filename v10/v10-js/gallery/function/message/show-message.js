cgJsClass.gallery.function.message.show = function (message){

    jQuery('body').addClass('cg_frame_opened');

    if(message=="" || message==0 || message==null){
        message='';
    }

    cgJsClass.gallery.function.message.resize();
    jQuery('#cgMessagesContent').html(message);
    cgJsClass.gallery.vars.messageContainerShown=true;
    cgJsClass.gallery.function.message.addCloseMessageFrameOnBodyClick();

};
cgJsClass.gallery.function.message.addCloseMessageFrameOnBodyClick = function(){

    jQuery('body.cg_frame_opened').on('click',function (e) {

        cgJsClass.gallery.function.message.close();

        return false;

    });

};