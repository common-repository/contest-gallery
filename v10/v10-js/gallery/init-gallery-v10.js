if(typeof cgJsClass == 'undefined'){// !IMPORTANT otherwise might be broken if upload form after and gallery not visible
    cgJsClass = {};
}

cgJsClass = cgJsClass || {};
cgJsClass.gallery = cgJsClass.gallery ||  {};
cgJsClass.gallery.vars = cgJsClass.gallery.vars ||  {};
cgJsClass.gallery.language = cgJsClass.gallery.language ||  {};
cgJsClass.backend = true;
cgJsClass.gallery.dynamicOptions = cgJsClass.gallery.dynamicOptions ||  {};
cgJsClass.gallery.heightLogic = cgJsClass.gallery.heightLogic ||  {};
cgJsClass.gallery.thumbLogic = cgJsClass.gallery.thumbLogic ||  {};
cgJsClass.gallery.rowLogic = cgJsClass.gallery.rowLogic ||  {};
cgJsClass.gallery.documentclick = cgJsClass.gallery.documentclick ||  {};
cgJsClass.gallery.comment = cgJsClass.gallery.comment ||  {};
cgJsClass.gallery.views = cgJsClass.gallery.views ||  {};
cgJsClass.gallery.info = cgJsClass.gallery.info ||  {};
cgJsClass.gallery.sorting = cgJsClass.gallery.sorting ||  {};
cgJsClass.gallery.fbLike = cgJsClass.gallery.fbLike ||  {};
cgJsClass.gallery.getJson = cgJsClass.gallery.getJson ||  {};
cgJsClass.gallery.resize = cgJsClass.gallery.resize ||  {};
cgJsClass.gallery.hover = cgJsClass.gallery.hover ||  {};
cgJsClass.gallery.touch = cgJsClass.gallery.touch ||  {};
cgJsClass.gallery.categories = cgJsClass.gallery.categories ||  {};
cgJsClass.gallery.hashchange = cgJsClass.gallery.hashchange ||  {};
cgJsClass.gallery.user = cgJsClass.gallery.user ||  {};
cgJsClass.gallery.function = cgJsClass.gallery.function ||  {};
cgJsClass.gallery.function.search = cgJsClass.gallery.function.search ||  {};
cgJsClass.gallery.function.general = cgJsClass.gallery.function.general ||  {};
cgJsClass.gallery.function.general.ajax = cgJsClass.gallery.function.general.ajax ||  {};
cgJsClass.gallery.function.message = cgJsClass.gallery.function.message ||  {};
cgJsClass.gallery.upload = cgJsClass.gallery.upload ||  {};
cgJsClass.gallery.upload.events = cgJsClass.gallery.upload.events ||  {};
cgJsClass.gallery.upload.validation = cgJsClass.gallery.upload.validation ||  {};
cgJsClass.gallery.upload.functions = cgJsClass.gallery.upload.functions ||  {};
cgJsClass.gallery.upload.functions.events = cgJsClass.gallery.upload.functions.events ||  {};
cgJsClass.gallery.views = cgJsClass.gallery.views ||  {};
cgJsClass.gallery.views.fullwindow = cgJsClass.gallery.views.fullwindow ||  {};
cgJsClass.gallery.views.singleViewFunctions = cgJsClass.gallery.views.singleViewFunctions ||  {};
/*var recursive = function(){
    jQuery(window).trigger('resize');
    console.log('resized');
    setTimeout(function () {
        recursive();
    },5000);
};
recursive();*/
//debugger
jQuery(document).ready(function($){ //   return false;
//debugger

    // has to be done here, because jQuery might be loaded in a footer
    for(var gid in cgJsClass.gallery.language){
        if(!cgJsClass.gallery.language.hasOwnProperty(gid)){
            break;
        }
        for(var property in cgJsClass.gallery.language[gid]){
            if(!cgJsClass.gallery.language[gid].hasOwnProperty(property)){
                break;
            }
            cgJsClass.gallery.language[gid][property] = jQuery('<textarea />').html(cgJsClass.gallery.language[gid][property]).text();
        }
    }

    // can be removed from dom after all data has been initialized and stored in objects
    $('script[data-cg-processing="true"]').remove();

    var $cgLoadedIds = $('.cg-loaded-gids');

    if(!$cgLoadedIds.length){// so only load in real frontend guaranteed!!!!
        return;
    }

/*    var $mainCGdivEntryPageHiddenInputParent = $('#mainCGdivEntryPageHiddenInput').parent();
    if(!$mainCGdivEntryPageHiddenInputParent.find('.mainCGdivContainer').length){
    // makes jump on page load when executed this way
        $mainCGdivEntryPageHiddenInputParent.addClass('cg_hide');// so empty p tag disappear where the shortcode is inserted
    }*/

    cgJsClass.gallery.vars.jQuery = $;
    cgJsClass.gallery.vars.$cgLoadedIds = $cgLoadedIds;

    $.fn.cgGoTo = function(){
        $('html, body').animate({
            scrollTop: $(this).offset().top - 100+'px'
        }, 'fast');
        return this; // for chaining...
    };

    cgJsClass.gallery.function.general.tools.checkIfIsChrome();
    cgJsClass.gallery.function.general.tools.checkIfIsSafari();
    cgJsClass.gallery.function.general.tools.checkIfIsFF();
    cgJsClass.gallery.function.general.tools.checkIfIsEdge();
    cgJsClass.gallery.function.general.tools.checkIfInternetExplorer();

    cgJsClass.gallery.function.general.mobile.check();

    if(cgJsClass.gallery.vars.isMobile){
        cgJsClass.gallery.vars.windowWidthLastResize=screen.width;
    }else{
        cgJsClass.gallery.vars.windowWidthLastResize=$(window).width();
    }

    cgJsClass.gallery.comment.init();
    cgJsClass.gallery.rating.init();
    cgJsClass.gallery.sorting.init();
    cgJsClass.gallery.fbLike.clickFbLikeDiv();
    cgJsClass.gallery.touch.init($);
   // cgJsClass.gallery.documentclick.init(); nicht notwendig aktuell!!!!
    cgJsClass.gallery.views.switchView.init();
    cgJsClass.gallery.function.message.init();
    cgJsClass.gallery.views.clickFurtherImagesStep.init();
    cgJsClass.gallery.function.search.init();
    cgJsClass.gallery.views.keypress.init();
    cgJsClass.gallery.views.fullscreen.init();
    cgJsClass.gallery.views.fullwindow.init();
    cgJsClass.gallery.hashchange.initCheckHashChangeEvent();
    cgJsClass.gallery.categories.initClick();

    var $mainCGallery = $('.mainCGallery');
    var length = $mainCGallery.length;

    // check if image was opened
    //cgJsClass.gallery.hashchange.checkHash(jQuery,null,null,true);

    cgJsClass.gallery.function.general.tools.testTopControlsStyle($);

    cgJsClass.gallery.vars.dom = {};
    cgJsClass.gallery.vars.dom.body = $('body');
    cgJsClass.gallery.vars.dom.html = $('html');

    // do it here because body dom element is already cached then
    cgJsClass.gallery.function.general.tools.initTooltip($);

    contGallRemoveNotRequiredCgMessagesContainerAppendUniqueOne($);
    contGallRemoveNotRequiredCgMessagesContainerAppendUniqueOnePro($);

    /*    var cgPageUrl = $('#cgPageUrl').val();

        var realGidsString = '';

        $cgRealIds.each(function (){
            if(!realGidsString){
                realGidsString += $(this).val();
            }else{
                realGidsString += ','+$(this).val();
            }
        });*/

/*// since 19.1.4 will be set via PHP if not exists
    var $cgCookiesToSet = $('.cg-cookies-to-set');
    $cgCookiesToSet.each(function (){
        var gid = $(this).attr('data-cg-gid');
        var cookieName = 'contest-gal1ery-'+gid+'-voting';
        cgJsClass.gallery.dynamicOptions.setCookie(gid,cookieName,$(this).attr('data-cg-cookie-voting-id'));
    });
*/

    cgJsClass.gallery.getJson.init($,$mainCGallery,0,length);

    cgJsClass.gallery.views.initSingleViewScroll();

    cgJsClass.gallery.views.singleViewClickEvents.init($);

    cgJsClass.gallery.resize.init(jQuery);
    cgJsClass.gallery.upload.functions.initCaptchaCheck(jQuery);
    cgJsClass.gallery.upload.events.init(jQuery);
    cgJsClass.gallery.upload.events.initFileUpload(jQuery);
    cgJsClass.gallery.upload.events.initFileUploadBulk(jQuery);
    cgJsClass.gallery.user.events(jQuery);

    window.onpopstate = function(event) {
        cgJsClass.gallery.vars.fullwindowCloseReplaceState = cgJsClass.gallery.vars.fullwindow;
        if(cgJsClass.gallery.vars.fullwindow && !cgJsData[cgJsClass.gallery.vars.fullwindow].vars.isCgWpPageEntryLandingPage && cgJsData[cgJsClass.gallery.vars.fullwindow].vars.hasWpPageParent){
            cgJsClass.gallery.views.fullwindow.closeFunction(cgJsClass.gallery.vars.fullwindow,true);
        }else{
            if(cgJsClass.gallery.vars.isCgWpPageEntryLandingPage){
                if($mainCGallery.length==1){// then can only be click back button, so can simply be forwarded
                    location.href = location.href;
                }
            }
        }
        //console.log('popstate change');
    };


/*    (function(history){
        var pushState = history.pushState;
        history.pushState = function(state) {
            console.log('pushstate top');
            if (typeof history.onpushstate == "function") {
                console.log('pushstate center');
                 history.onpushstate({state: state});
            }
            console.log('pushstate bottom');
            // ... whatever else you want to do
            // maybe call onhashchange e.handler
            return pushState.apply(history, arguments);
        };
    })(window.history);*/

    var mainCGBackToGalleryButtonHrefGid = sessionStorage.getItem('mainCGBackToGalleryButtonHrefGid');
    if(cgJsData[mainCGBackToGalleryButtonHrefGid] && cgJsData[mainCGBackToGalleryButtonHrefGid].vars){
        var $mainCGdivHelperParent = cgJsData[mainCGBackToGalleryButtonHrefGid].vars.mainCGdivHelperParent;
        if($mainCGdivHelperParent.length){
            $mainCGdivHelperParent.get(0).scrollIntoView();
            sessionStorage.removeItem('mainCGBackToGalleryButtonHrefGid');
        }
    }

    return;


    jQuery.ajax({
        url : post_cg_load_v10_wordpress_ajax_script_function_name.cg_load_v10_ajax_url,
        method : 'POST',
        type : 'POST',
        data : {
            action : 'post_cg_load_v10',
            realGidsString : realGidsString,
            cgPageUrl : cgPageUrl
        },
    }).done(function(response) {


    }).fail(function(xhr, status, error) {
        console.log(xhr);
        console.log(status);
        console.log(error);
        // then must be internal server error, must generally something go wrong
        cgJsClass.gallery.function.message.showPro('<p style="text-align:center;"><br>Something went wrong when loading gallery.<br>Ajax content could not be laoded code 2.<br><br></p>');
    }).always(function() {
    });


    });
