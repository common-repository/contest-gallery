cgJsAdminClass = {};
cgJsAdminClass.general = {};
cgJsAdminClass.general.time = {
    init: function(){

        //  this.checkGalleriesEndTime();
    },
    checkGalleriesEndTime: function(){
        return;
        jQuery('.cg-contest-end-time').each(function () {

            var ActualTimeSeconds = Math.round((new Date).getTime()/1000);
            var cg_ContestEndTime = cgJsAdminClass.general.time.correctTimezoneOffset(parseInt(jQuery(this).val()));

            if(cg_ContestEndTime<=ActualTimeSeconds){
                jQuery(this).closest('.cg-contest-ended').show();
            }
        });

    },
    correctTimezoneOffset: function (ContestEndTimeFromPhp) {

        var cg_ContestEndTime = ContestEndTimeFromPhp;

        if(cg_ContestEndTime!='' && cg_ContestEndTime>0){
            var date = new Date();
            var timezoneOffsetBrowser = date.getTimezoneOffset();// offset in MINUTES
            var timezoneServer = jQuery('#cgPhpDateOffset').val();// offset in MINUTES
            var correctTimezone = 0;// offset in MINUTES
            var correctSeconds = 0;

            if (timezoneOffsetBrowser == timezoneServer) {
                correctTimezone = 0;
            }

            if (timezoneOffsetBrowser < timezoneServer) {
                correctTimezone = (timezoneServer - timezoneOffsetBrowser)*-1;
            }

            if (timezoneOffsetBrowser > timezoneServer) {
                correctTimezone = timezoneOffsetBrowser-timezoneServer;
            }

            if(correctTimezone!=0){
                correctSeconds = correctTimezone*60; // 1 min = 60 sekunden
            }

            cg_ContestEndTime = cg_ContestEndTime + correctSeconds;
            return cg_ContestEndTime;
        }else{
            cg_ContestEndTime = 0;
            return cg_ContestEndTime;
        }
    },
    getTime: function (cg_ContestEndTime, ActualTimeSeconds) {

        // Create a new JavaScript Date object based on the timestamp
// multiplied by 1000 so that the argument is in milliseconds, not seconds.
        var date = new Date(ActualTimeSeconds*1000);
// Hours part from the timestamp
        var hours = date.getHours();
// Minutes part from the timestamp
        var minutes = "0" + date.getMinutes();
// Seconds part from the timestamp
        var seconds = "0" + date.getSeconds();

// Will display time in 10:30:23 format
        ActualTimeSeconds = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

        // Create a new JavaScript Date object based on the timestamp
// multiplied by 1000 so that the argument is in milliseconds, not seconds.
        var date = new Date(cg_ContestEndTime*1000);
// Hours part from the timestamp
        var hours = date.getHours();
// Minutes part from the timestamp
        var minutes = "0" + date.getMinutes();
// Seconds part from the timestamp
        var seconds = "0" + date.getSeconds();

// Will display time in 10:30:23 format
        cg_ContestEndTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

        alert(ActualTimeSeconds);
        alert(cg_ContestEndTime);

    }
};
cgJsAdminClass.general.time.init();

jQuery(document).ready(function ($) {

    $(document).on('click','body.cg_upload_modal_opened',function (e) {

        if($(e.target).closest('#cgCopyMessageContainer').length==1){
            return;
        }else{
            $('body').removeClass('cg_upload_modal_opened');
            $('#cgCopyMessageContainer').addClass('cg_hide');
        }
    });

    $(document).on('click','#cgCopyMessageClose',function (e) {
        $('body').removeClass('cg_upload_modal_opened');
        $('#cgCopyMessageContainer').addClass('cg_hide');
    });

    $(document).on('click','.cg_copy_submit',function (e) {
        if($(this).hasClass('cg_submitted')){return;}
        e.preventDefault();
        var $cgCopyMessageContainer = $('#cgCopyMessageContainer');
        var $table_gallery_info = $(this).closest('.table_gallery_info');
        var left = $('.table_gallery_info').width()/2-$cgCopyMessageContainer.width()/2+$('.table_gallery_info').offset().left;

        $cgCopyMessageContainer.css('left',left+'px');
        $cgCopyMessageContainer.removeClass('cg_hide');
        // otherwise instant initiating and off click
        $('body').addClass('cg_upload_modal_opened');
        $('#cgCopyMessageSubmit').attr('data-cg-copy-id',$(this).attr('data-cg-copy-id'));
        $('#cgCopyMessageContentHeader').text('Copy gallery ID '+$(this).attr('data-cg-copy-id')+' ?');

        // only everything is possible to copy for old versions!
        if(parseInt($(this).attr('data-cg-version-to-copy'))<10){
            $cgCopyMessageContainer.find('.cg_copy_type_options_container,.cg_copy_type_options_and_images_container').addClass('cg_hide');
            $cgCopyMessageContainer.find('#cg_copy_type_all').prop('checked',true);
        }else{
            $cgCopyMessageContainer.find('.cg_copy_type_options_container,.cg_copy_type_options_and_images_container').removeClass('cg_hide');
        }

        $cgCopyMessageContainer.find('.cg-copy-prev-7-text').remove();

        if($table_gallery_info.find('.cg-copy-prev-7-text').length){

            $table_gallery_info.find('.cg-copy-prev-7-text').clone().removeClass('cg_hide').insertBefore($cgCopyMessageContainer.find('#cgCopyMessageSubmitContainer'));

        }else{
            $cgCopyMessageContainer.find('.cg-copy-prev-7-text').remove();
        }

        if($(this).attr('data-cg-copy-fb-on')==1){
            $('#cg_copy_type_all_fb_hint').removeClass('cg_hide');
        }else{
            $('#cg_copy_type_all_fb_hint').addClass('cg_hide');
        }
    });

    $(document).on('click','#cgCopyMessageSubmit',function (e) {
        e.preventDefault(e);
        var $form = $('#cgCopySubmit'+$(this).attr('data-cg-copy-id')).closest('form');
        var $cg_copy_type = $('.cg_copy_type:checked').clone().addClass('cg_hide');
        $form.prepend($cg_copy_type);
        $form.submit();
        $('#cgCopyMessageContainer').addClass('cg_hide');
        $('#mainTable').addClass('cg_hide');
        $('#cgCopyInProgressOnSubmit').removeClass('cg_hide');
    });

});