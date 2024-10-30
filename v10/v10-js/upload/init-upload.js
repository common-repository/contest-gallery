if(typeof cgJsClass === 'undefined'){
    cgJsClass = {};
}

cgJsClass.gallery = cgJsClass.gallery || {};
cgJsClass.gallery.function = cgJsClass.gallery.function  || {};
cgJsClass.gallery.function.message = cgJsClass.gallery.function.message  || {};
cgJsClass.gallery.function.general = cgJsClass.gallery.function.general  || {};
cgJsClass.gallery.function.general.tools = cgJsClass.gallery.function.general.tools  || {};
cgJsClass.gallery.vars = cgJsClass.gallery.vars  || {};
cgJsClass.gallery.vars.messageContainerShown=false;
cgJsClass.gallery.user = cgJsClass.gallery.user  || {};
cgJsClass.gallery.dynamicOptions = cgJsClass.gallery.dynamicOptions  || {};
cgJsClass.gallery.upload = cgJsClass.gallery.upload ||  {};
cgJsClass.gallery.uploadStatic = cgJsClass.gallery.uploadStatic ||  {};

jQuery(document).ready(function($){ //   return false;

    var $cg_upload_form_container = $('#cg_upload_form_container');

    if(!$cg_upload_form_container.length){// so only load in real frontend guaranteed!!!!
        return;
    }

    cgJsClass.gallery.function.message.clickClose();

    cgJsClass.gallery.upload.functions.events($);

    cgJsClass.gallery.vars.dom = {};
    cgJsClass.gallery.vars.dom.body = $('body');
    cgJsClass.gallery.vars.dom.html = $('html');

    contGallRemoveNotRequiredCgMessagesContainerAppendUniqueOne($);

    if($('#cgRegUserUploadOnly').val()==2 && $('#cgRegUserMaxUpload').val()>=1){

        var gid = $('#cgUploadFormGalleryId').val();

        var cookieName = 'contest-gal1ery-'+gid+'-upload';
        var cookieValue = cgJsClass.gallery.dynamicOptions.getCookie(cookieName);

        if(!cookieValue){
            cgJsClass.gallery.dynamicOptions.setCookie(gid,cookieName,$('#cgUploadCookieId').val());
        }

        var cookieValue = cgJsClass.gallery.dynamicOptions.getCookie(cookieName);

        if(!cookieValue && $('#cgUploadRequiresCookieMessage').val()){
            cgJsClass.gallery.function.message.show($('#cgUploadRequiresCookieMessage').val(),undefined,undefined,undefined,undefined,undefined,true);
        }

    }

    cgJsClass.gallery.uploadStatic.events($);

});
