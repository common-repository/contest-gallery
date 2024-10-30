<noscript>
    <div style="border: 1px solid purple; padding: 10px">
        <span style="color:red">Enable JavaScript to use the form</span>
    </div>
</noscript>
<?php
if (!defined('ABSPATH')) {
    exit;
}

extract(shortcode_atts(array(
    'id' => ''
), $atts));
$GalleryID = trim($atts['id']);

$galeryID = $GalleryID;

$is_frontend = true;

include(__DIR__ . "/../../../../check-language.php");

global $wpdb;
$tablename_options = $wpdb->prefix . "contest_gal1ery_options";
$tablename_pro_options = $wpdb->prefix . "contest_gal1ery_pro_options";
$tablename_options_visual = $wpdb->prefix . "contest_gal1ery_options_visual";

$RegistryUserRole = $wpdb->get_var("SELECT RegistryUserRole FROM $tablename_options WHERE id='$GalleryID'");

$optionsVisual = $wpdb->get_row( "SELECT * FROM $tablename_options_visual WHERE GalleryID='$GalleryID'");
$FeControlsStyleRegistry = ($optionsVisual->FeControlsStyleRegistry=='white' || empty($optionsVisual->FeControlsStyleRegistry)) ?  'cg_fe_controls_style_white' : 'cg_fe_controls_style_black';
$BorderRadiusRegistry = ($optionsVisual->BorderRadiusRegistry=='1' || empty($optionsVisual->FeControlsStyleRegistry)) ? 'cg_border_radius_controls_and_containers' : '';

$pro_options = $wpdb->get_row("SELECT * FROM $tablename_pro_options WHERE GalleryID='$GalleryID'");
$HideRegFormAfterLogin = $pro_options->HideRegFormAfterLogin;

// has definetly to be not empty! Not isset only!
if (!empty($_GET["cgkey"])) {// joins here when email is trying to get confirmed
   include('users-registry-check-after-email-confirmation.php');
} else if (isset($_POST['cg_check']) && !empty($_GET['cg_register']) && isset($_POST['cg_Fields']) && empty($_GET['cg_wp_redirect_after_register_and_login'])) {// joins here when
    //mails are checked via ajax and customer try to register and login with next site reload
    include('users-registry-check-direct-registering-and-login.php');
} else if (!empty($_GET['cg_login_user_after_registration'])) {// user account was  created direct after registration and login was done

    if (!empty($_GET['cg_gallery_id_registry'])) {

        global $wpdb;

        $tablenameProOptions = $wpdb->prefix . "contest_gal1ery_pro_options";

        $GalleryID = sanitize_text_field($_GET['cg_gallery_id_registry']);

        echo "<div id='cg_activation' class='mainCGdivUploadForm mainCGdivUploadFormStatic $FeControlsStyleRegistry $BorderRadiusRegistry'>";

            if(!empty($pro_options)){
                $ForwardAfterRegText = nl2br(html_entity_decode(stripslashes($pro_options->ForwardAfterRegText)));
                echo $ForwardAfterRegText;
            }else{ // Fallback text if gallery was deleted

                echo "<p>Thank you for your registration.</p>";

            }

        echo "</div>";


        ?>

        <script>

            setTimeout(function (){
                jQuery("html, body").animate({ scrollTop: jQuery('#cg_activation').offset().top-60}, 0);
            },100);

            window.history.replaceState({}, document.title, location.protocol + '//' + location.host + location.pathname);


        </script>

        <?php


    } else {

        echo '';

    }

} else {


//include("class-reg.php");

    ob_start();
    $galeryID = $GalleryID;
    include(__DIR__ . "/../../../../check-language.php");


    global $wpdb;
    $tablenameCreateUserForm = $wpdb->prefix . "contest_gal1ery_create_user_form";

    $selectUserForm = $wpdb->get_results("SELECT * FROM $tablenameCreateUserForm WHERE GalleryID = '$GalleryID' && Active = '1' ORDER BY Field_Order ASC");

    if (empty($selectUserForm)) {
        echo "Please check your shortcode. The id does not exists.<br>";
        return false;
    }


//print_r($selectUserForm);

    $i = 1;

    $HideRegForm = false;


    if (($HideRegFormAfterLogin == '1' && is_user_logged_in())) {

        $HideRegForm = true;

    }

//echo "test";

    if (!$HideRegForm) {

        echo "<div id='cg_user_registry_div' class='mainCGdivUploadForm mainCGdivUploadFormStatic $BorderRadiusRegistry $FeControlsStyleRegistry'>";
        echo "<div>";
        echo "<input type='hidden' id='cg_check_mail_name_value' value='0'>";
        echo "<input type='hidden' id='cg_site_url' value='" . get_site_url() . "'/>";

        echo "<span id='cg_user_registry_anchor'/></span>";

        echo '<form action="?cg_register=true" method="post" id="cg_user_registry_form">';

        // User ID �berpr�fung ob es die selbe ist
        // $check = wp_create_nonce("check");
        // new check required wp_create_nonce might be different when calling ajax
        $check = md5(wp_salt('auth') . '---cgreg---' . $GalleryID);

        echo "<input type='hidden' name='cg_check' id='cg_check' value='$check'>";
        echo "<input type='hidden' name='cg_gallery_id_registry' id='cg_gallery_id_registry' value='$GalleryID'>";

        foreach ($selectUserForm as $key => $value) {

            $required = ($value->Required == 1) ? "*" : "";

            $cgCheckUsernameMail = '';

            if ($value->Field_Type == 'main-user-name' OR $value->Field_Type == 'main-mail') {
                $placeholder = html_entity_decode(stripslashes($value->Field_Content));
                if ($value->Field_Type == 'main-user-name') {
                    $cgContentField = "<input type='text' maxlength='" . $value->Max_Char . "' placeholder='$placeholder' class='cg_registry_form_field cg-" . $value->Field_Type . "' id='cg_registry_form_field" . $value->id . "' name='cg_Fields[$i][Field_Content]'>";
                    $cgCheckUsernameMail = "id='cg_user_name_check_alert'";
                }
                if ($value->Field_Type == 'main-mail') {
                    $cgContentField = "<input type='text' placeholder='$placeholder' class='cg_registry_form_field cg-" . $value->Field_Type . "' id='cg_registry_form_field" . $value->id . "' name='cg_Fields[$i][Field_Content]'>";
                    $cgCheckUsernameMail = "id='cg_mail_check_alert'";
                }
            }
            if ($value->Field_Type == 'password' OR $value->Field_Type == 'password-confirm') {
                $placeholder = html_entity_decode(stripslashes($value->Field_Content));
                $cgContentField = "<input type='password' maxlength='" . $value->Max_Char . "' placeholder='$placeholder' class='cg_registry_form_field cg-" . $value->Field_Type . "' id='cg_registry_form_field" . $value->id . "' name='cg_Fields[$i][Field_Content]'>";
            }
            if ($value->Field_Type == 'user-comment-field') {
                $placeholder = html_entity_decode(stripslashes($value->Field_Content));
                $cgContentField = "<textarea maxlength='" . $value->Max_Char . "' placeholder='$placeholder' class='cg_registry_form_field cg-" . $value->Field_Type . "' id='cg_registry_form_field" . $value->id . "' name='cg_Fields[$i][Field_Content]' rows='10' ></textarea>";
            }

            if ($value->Field_Type == 'user-text-field') {
                $placeholder = html_entity_decode(stripslashes($value->Field_Content));
                $cgContentField = "<input maxlength='" . $value->Max_Char . "' type='text' placeholder='$placeholder' class='cg_registry_form_field cg-" . $value->Field_Type . "' id='cg_registry_form_field" . $value->id . "' name='cg_Fields[$i][Field_Content]'>";
            }

            if ($value->Field_Type == 'user-html-field') {
                $content = html_entity_decode(stripslashes($value->Field_Content));
                $cgContentField = "<div class='cg-" . $value->Field_Type . "'>$content</div>";
            }


            if ($value->Field_Type == 'user-robot-field') {
                echo "<div class='cg_form_div cg_captcha_not_a_robot_field_class' id='cg_captcha_not_a_robot_registry_field'>";
            } else {
                echo "<div id='cg-registry-" . $value->Field_Order . "' class='cg_form_div'>";
            }


            if (@$value->Field_Type != 'user-html-field' && $value->Field_Type != 'user-robot-recaptcha-field') {

                if ($value->Field_Type == 'user-robot-field') {

                    echo "<label for='cg_" . $check . "_registry' >$value->Field_Name</label>";
                } else {
                    echo "<label for='cg_registry_form_field" . $value->id . "' >" . html_entity_decode(stripslashes($value->Field_Name)) . " $required</label>";
                }

                echo "<input type='hidden' name='cg_Fields[$i][Form_Input_ID]' value='" . $value->id . "'>";
                echo "<input type='hidden' name='cg_Fields[$i][Field_Type]' value='" . $value->Field_Type . "'>";
                echo "<input type='hidden' name='cg_Fields[$i][Field_Order]' value='" . $value->Field_Order . "'>";

            }


            // Pr�fen ob check-agreement-feld ist ansonsten Text oder, Comment Felder anzeigen
            if (@$value->Field_Type == 'user-check-agreement-field') {

                $cgCheckContent = contest_gal1ery_convert_for_html_output($value->Field_Content);
                echo "<div class='cg-check-agreement-container'>";
                echo "<div class='cg-check-agreement-checkbox'>";
                echo "<input type='checkbox' id='cg_registry_form_field" . $value->id . "' class='cg_check_f_checkbox' value='checked' name='cg_Fields[$i][Field_Content]'>";
                echo "<input type='hidden' class='cg_form_required' value='" . $value->Required . "'>";// Pr�fen ob Pflichteingabe
                echo "</div>";
                echo "<div class='cg-check-agreement-html'>";
                echo $cgCheckContent;
                echo "</div>";
                echo "</div>";

            } else {

                if ($value->Field_Type == 'user-select-field') {

                    $content = html_entity_decode(stripslashes($value->Field_Content));
                    $textAr = explode("\n", $content);

                    echo "<select name='cg_Fields[$i][Field_Content]' class='cg-" . $value->Field_Type . "' id='cg_registry_form_field" . $value->id . "' name='cg_Fields[$i][Field_Content]' >";

                    echo "<option value=''>$language_pleaseSelect</option>";

                    foreach ($textAr as $optionKey => $optionValue) {

                        echo "<option value='$optionValue'>$optionValue</option>";

                    }

                    echo "</select>";
                    echo "<input type='hidden' class='cg_form_required' value='" . $value->Required . "'>";// Pr�fen ob Pflichteingabe
                } else if ($value->Field_Type == 'user-robot-field') {

                    // NICHT ENTFERNEN!!!!
                    // Wichtig!!! Empty if clausel muss hier bleiben beim aktullen Aufbau sonst verschieben sich Felder.


                } else if ($value->Field_Type == 'user-robot-recaptcha-field') {

                    // NICHT ENTFERNEN!!!!
                    // Wichtig!!! Empty if clausel muss hier bleiben beim aktullen Aufbau sonst verschieben sich Felder.

                    echo "<div class='cg_recaptcha_reg_form' id='cgRecaptchaRegForm$GalleryID'>";

                    echo "</div>";
                    echo "<p class='cg_input_error cg_hide cg_recaptcha_not_valid_reg_form_error' id='cgRecaptchaNotValidRegFormError$GalleryID'></p>";

                    ?>

                    <script type="text/javascript">
                        var ReCaKey = "<?php echo $value->ReCaKey; ?>";
                        var cgRecaptchaNotValidRegFormError = "<?php echo 'cgRecaptchaNotValidRegFormError' . $GalleryID . ''; ?>";
                        var cgRecaptchaRegForm = "<?php echo 'cgRecaptchaRegForm' . $GalleryID . ''; ?>";

                        var cgCaRoReRegCallback = function () {
                            var element = document.getElementById(cgRecaptchaNotValidRegFormError);
                            //element.parentNode.removeChild(element);
                            element.classList.remove("cg_recaptcha_not_valid_reg_form_error");
                            element.classList.add("cg_hide");
                        };

                        var cgOnloadRegCallback = function () {
                            grecaptcha.render(cgRecaptchaRegForm, {
                                'sitekey': ReCaKey,
                                'callback': 'cgCaRoReRegCallback'
                            });
                        };
                    </script>
                    <script src="https://www.google.com/recaptcha/api.js?onload=cgOnloadRegCallback&render=explicit&hl=<?php echo $value->ReCaLang; ?>"
                            async defer>
                    </script>

                    <?php

                } else {

                    echo $cgContentField;
                    if ($value->Field_Type != 'user-html-field') {
                        echo "<input type='hidden' class='cg_Min_Char' value='" . $value->Min_Char . "'>"; // Pr�fen minimale Anzahl zeichen
                        echo "<input type='hidden' class='cg_Max_Char' value='" . $value->Max_Char . "'>"; // Pr�fen maximale Anzahl zeichen
                        echo "<input type='hidden' class='cg_form_required' value='" . $value->Required . "'>";// Pr�fen ob Pflichteingabe
                    }

                }


            }

            if ($value->Field_Type != 'user-robot-recaptcha-field') {
                echo "<p class='cg_input_error cg_hide' $cgCheckUsernameMail></p>";// Fehlermeldung erscheint hier

            }

            echo "</div>";


            $i++;

        }

        echo "<div id='cg_registry_submit_container' class='cg_form_upload_submit_div cg_form_div'>";
        echo '<input type="submit" name="cg_registry_submit" id="cg_users_registry_check" class="cg_form_upload_submit" value="' . $language_sendRegistry . '">';
        echo '<div class="cg_form_div_image_upload_preview_loader_container cg_hide"><div class="cg_form_div_image_upload_preview_loader cg-lds-dual-ring-gallery-hide cg-lds-dual-ring-gallery-hide-mainCGallery"></div></div>';
        echo "</div>";
        echo '</form>';
        echo "</div>";
        echo "</div>";

    }

    if ($pro_options->HideRegFormAfterLoginShowTextInstead == 1 && $HideRegFormAfterLogin == 1 && is_user_logged_in()) {
        $HideRegFormAfterLoginTextToShow = nl2br(html_entity_decode(stripslashes(@$pro_options->HideRegFormAfterLoginTextToShow)));
        echo "<div id='cg_user_registry_div_hide_after_login'>";
        echo $HideRegFormAfterLoginTextToShow;
        echo "</div>";
    }


// Wichtig! Ajax Abarbeitung hier!
    echo "<div class='cg_registry_message'>";

    echo "</div>";

    $formOutput = ob_get_clean();

    echo $formOutput;

}
echo "<div id='cg_user_registry_div_messages' style='height:0;visibility: hidden;'>";
//echo "$language_MaximumAllowedWidthForJPGsIs";
echo "<input type='hidden' id='cg_show_upload' value='1'>";

//echo "language_ThisFileTypeIsNotAllowed: $language_ThisFileTypeIsNotAllowed";
echo "<input type='hidden' id='cg_file_not_allowed_1' value='$language_ThisFileTypeIsNotAllowed'>";
echo "<input type='hidden' id='cg_file_size_to_big' value='$language_TheFileYouChoosedIsToBigMaxAllowedSize'>";
//echo "<input type='hidden' id='cg_post_size' value='$post_max_sizeMB'>";

echo "<input type='hidden' id='cg_to_high_resolution' value='$language_TheResolutionOfThisPicIs'>";

echo "<input type='hidden' id='cg_max_allowed_resolution_jpg' value='$language_MaximumAllowedResolutionForJPGsIs'>";
echo "<input type='hidden' id='cg_max_allowed_width_jpg' value='$language_MaximumAllowedWidthForJPGsIs'>";
echo "<input type='hidden' id='cg_max_allowed_height_jpg' value='$language_MaximumAllowedHeightForJPGsIs'>";

echo "<input type='hidden' id='cg_max_allowed_resolution_png' value='$language_MaximumAllowedResolutionForPNGsIs'>";
echo "<input type='hidden' id='cg_max_allowed_width_png' value='$language_MaximumAllowedWidthForPNGsIs'>";
echo "<input type='hidden' id='cg_max_allowed_height_png' value='$language_MaximumAllowedHeightForPNGsIs'>";

echo "<input type='hidden' id='cg_max_allowed_resolution_gif' value='$language_MaximumAllowedResolutionForGIFsIs'>";
echo "<input type='hidden' id='cg_max_allowed_width_gif' value='$language_MaximumAllowedWidthForGIFsIs'>";
echo "<input type='hidden' id='cg_max_allowed_height_gif' value='$language_MaximumAllowedHeightForGIFsIs'>";


echo "<input type='hidden' id='cg_check_agreement' value='$language_YouHaveToCheckThisAgreement '>";
echo "<input type='hidden' id='cg_check_email_upload' value='$language_EmailAdressHasToBeValid'>";
echo "<input type='hidden' id='cg_min_characters_text' value='$language_MinAmountOfCharacters'>";
echo "<input type='hidden' id='cg_max_characters_text' value='$language_MaxAmountOfCharacters'>";
echo "<input type='hidden' id='cg_no_picture_is_choosed' value='$language_ChooseYourImage'>";


echo "<input type='hidden' id='cg_language_BulkUploadQuantityIs' value='$language_BulkUploadQuantityIs'>";
echo "<input type='hidden' id='cg_language_BulkUploadLowQuantityIs' value='$language_BulkUploadLowQuantityIs'>";

echo "<input type='hidden' id='cg_language_BulkUploadLowQuantityIs' value='$language_BulkUploadLowQuantityIs'>";

echo "<input type='hidden' id='cg_language_ThisMailAlreadyExists' value='$language_ThisMailAlreadyExists'>";
echo "<input type='hidden' id='cg_language_ThisNicknameAlreadyExists' value='$language_ThisNicknameAlreadyExists'>";

echo "<input type='hidden' id='cg_language_PleaseFillOut' value='$language_PleaseFillOut'>";
echo "<input type='hidden' id='cg_language_youHaveNotSelected' value='$language_youHaveNotSelected'>";

echo "<input type='hidden' id='cg_language_PasswordsDoNotMatch' value='$language_PasswordsDoNotMatch'>";

echo "<input type='hidden' id='cg_language_pleaseConfirm' value='$language_pleaseConfirm'>";
echo "<input type='hidden' id='cg_users_registry_check_submit_language' value='$language_sendRegistry'>";
echo "</div>";

?>