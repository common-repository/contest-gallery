jQuery(document).ready(function ($) {

    // Scroll Function here
    $.fn.cgGoTo = function () {
        $('html, body').animate({
            scrollTop: $(this).offset().top - 40 + 'px'
        }, 'fast');
        return this; // for chaining...
    };

    // var countChildren = $('#cg_upload_form_container.cg_upload_form_container_shortcode_form').children().size()+1;

    $("#cg_upload_form_container.cg_upload_form_container_shortcode_form").each(function (index) {

        if (index == 0) {
            $(this).css('visibility', 'visible');
        } else {
            $(this).remove();// remove forms might be rendered from other shortcodes
        }

    });

    /*I am not a robot captcha here*/

    // Prüfen der Wordpress Session id
    var check = $("#cg_upload_form #cg_check_i_am_not_a_robot").val();

    $("#cg_captcha_not_a_robot_field").prepend("<input type='checkbox' class='cg_upload_form_field' id='cg_" + check + "' >");

    // cg_recaptcha_form can be displayed only 1 time! Otherwise validation on second form does not work!
    $('.cg_recaptcha_form').each(function (index) {

        if (index >= 1) {
            $(this).closest('.cg_form_div').remove();
        }

    });


});