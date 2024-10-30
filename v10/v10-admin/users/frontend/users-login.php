<noscript>
<div style="border: 1px solid purple; padding: 10px">
<span style="color:red">Enable JavaScript to use the form</span>
</div>
</noscript>
<?php
if(!defined('ABSPATH')){exit;}
	extract( shortcode_atts( array(
			'id' => ''
		), $atts ) );
	$GalleryID = trim($atts['id']);

/*
session_start();
//echo @$_SESSION["cg_login_count"];
if(@$_SESSION["cg_login_count"]==false){
	//Achtung! Mit 1 anfangen ansonsten wird als false gez�hlt wenn es mit 0 anf�ngt.
	$_SESSION["cg_login_count"]=1;
}
//unset($_SESSION["cg_login_count"]);
if(!@$_SESSION["cg_start_time"]){
	$_SESSION["cg_start_time"]=time();
}

// Nach 10 Minuten wird die Session von der Zeit und von den Counts neu gesetzt
if($_SESSION["cg_start_time"]){
	if(time()-600 > $_SESSION["cg_start_time"]){
		$_SESSION["cg_start_time"]=time();
		$_SESSION["cg_login_count"]=0;
	}
}

if(@$_SESSION["cg_login_count"]>15){
	echo "To many invalid atempts. Please try few minutes later again";return false;
}*/



if(empty($_SESSION["cg_start_time"])){
	$_SESSION["cg_start_time"]=time();
}

// Nach 10 Minuten wird die Session von der Zeit und von den Counts neu gesetzt
if(!empty($_SESSION["cg_start_time"])){
	if(time()-600 > $_SESSION["cg_start_time"]){
		$_SESSION["cg_start_time"]=time();
		$_SESSION["cg_login_count"]=0;
	}
}

//$check = wp_create_nonce("check");
// new check required wp_create_nonce might be different when calling ajax
$check = md5(wp_salt( 'auth').'---cglogin---'.$GalleryID);

$galeryID = $GalleryID;
$is_frontend = true;

include(__DIR__ ."/../../../../check-language.php");

global $wpdb;
$tablenameCreateUserForm = $wpdb->prefix . "contest_gal1ery_create_user_form";
$tablename_pro_options = $wpdb->prefix . "contest_gal1ery_pro_options";
$tablename_options_visual = $wpdb->prefix . "contest_gal1ery_options_visual";

$optionsVisual = $wpdb->get_row( "SELECT * FROM $tablename_options_visual WHERE GalleryID='$GalleryID'");
$FeControlsStyleLogin = ($optionsVisual->FeControlsStyleLogin=='white' || empty($optionsVisual->FeControlsStyleLogin)) ?  'cg_fe_controls_style_white' : 'cg_fe_controls_style_black';
$BorderRadiusLogin = ($optionsVisual->BorderRadiusLogin=='1' || empty($optionsVisual->FeControlsStyleLogin)) ? 'cg_border_radius_controls_and_containers' : '';

if(!empty($_POST['cg_login_check'])){
	
	$ForwardAfterLoginText = html_entity_decode(stripslashes(nl2br($wpdb->get_var("SELECT ForwardAfterLoginText FROM $tablename_pro_options WHERE GalleryID = '$GalleryID'"))));

							echo "<div id='cg_login' class='mainCGdivUploadForm mainCGdivUploadFormStatic $FeControlsStyleLogin $BorderRadiusLogin'>";
							echo "<p>$ForwardAfterLoginText</p>";
							echo "</div>";
							
			
			?>

<script>

    setTimeout(function (){
        jQuery("html, body").animate({ scrollTop: jQuery('#cg_login').offset().top-60}, 0);
    },100);

    window.history.replaceState({}, document.title, location.protocol + '//' + location.host + location.pathname);

</script>

<?php								
			

}
else{
	
	if(!is_user_logged_in()){
		
		ob_start();

	/*	$resultsFieldNames = $wpdb->get_results("SELECT Field_Name,Field_Type FROM $tablenameCreateUserForm WHERE GalleryID = '$GalleryID' && (Field_Type='main-mail' || Field_Type='password')");

        $mailName = '';
        $passwordName = '';

		foreach ($resultsFieldNames as $resultFieldNames) {
		    if($resultFieldNames->Field_Type=='main-mail'){
                $mailName = $resultFieldNames->Field_Name;
            }
		    if($resultFieldNames->Field_Type=='password'){
                $passwordName = $resultFieldNames->Field_Name;
            }
        }*/

		$ForwardAfterLoginUrlValues = $wpdb->get_row("SELECT ForwardAfterLoginUrlCheck, ForwardAfterLoginUrl FROM $tablename_pro_options WHERE GalleryID = '$GalleryID'");
		$ForwardAfterLoginUrlCheck = $ForwardAfterLoginUrlValues->ForwardAfterLoginUrlCheck;
		$ForwardAfterLoginUrl = html_entity_decode(stripslashes(nl2br($ForwardAfterLoginUrlValues->ForwardAfterLoginUrl)));

		echo "<input type='hidden' id='cg_gallery_id' value='$GalleryID'/>";

		$i=1;


		echo "<div id='cg_user_login_div' class='mainCGdivUploadForm mainCGdivUploadFormStatic $FeControlsStyleLogin $BorderRadiusLogin'>";
			echo "<div>";
				echo "<input type='hidden' id='cg_check_mail_name_value_for_login' value='0'>";
				echo "<input type='hidden' id='cg_site_url' value='".get_site_url()."'/>";
				echo "<input type='hidden' id='cg_gallery_id_login' value='$GalleryID'/>";
				echo "<input type='hidden' id='cg_ForwardAfterLoginUrlCheck' value='$ForwardAfterLoginUrlCheck'/>";
				echo "<input type='hidden' id='cg_ForwardAfterLoginUrl' value='$ForwardAfterLoginUrl'/>";

				echo "<span id='cg_user_registry_anchor'></span>";

				echo '<form action="" method="post" id="cg_user_login_form">';

				echo "<input type='hidden' name='cg_login_check' id='cg_login_check' value='".$check."'>";

								echo "<div id='cg-login-1' class='cg_form_div'>";
								echo "<label for='cg_login_name_mail'>$language_Email</label>";
								echo "<input type='text'  id='cg_login_name_mail' name='cg_login_name_mail'>";
								echo "<p id='cg_append_login_name_mail_fail' class='cg_input_error cg_hide' ></p>";// Fehlermeldung erscheint hier
								echo "</div>";
								echo "<div id='cg-login-2' class='cg_form_div'>";
								echo "<label for='cg_login_password'>$language_Password</label>";
								echo "<input type='password'  id='cg_login_password' name='cg_login_password'>";
								echo "<p id='cg_append_login_password_fail' class='cg_input_error cg_hide' ></p>";// Fehlermeldung erscheint hier
								echo "</div>";


				echo "<div class='cg_form_upload_submit_div cg_form_div' >";
				    echo '<input type="submit" name="submit" id="cg_user_login_check" value="'.$language_sendLogin.'">';
                    echo "<p id='cg_append_validation_system_fail' class='cg_input_error cg_hide' ></p>";// Fehlermeldung erscheint hier
                    echo "<p id='cg_append_email_and_password_do_not_match' class='cg_input_error cg_hide' ></p>";// Fehlermeldung erscheint hier
        echo '<div class="cg_form_div_image_upload_preview_loader_container cg_hide"><div class="cg_form_div_image_upload_preview_loader cg-lds-dual-ring-gallery-hide cg-lds-dual-ring-gallery-hide-mainCGallery"></div></div>';
                echo "</div>";
				echo '</form>';
			echo "</div>";
		echo "</div>";

		// Wichtig! Ajax Abarbeitung hier!
		echo "<div id='cg_login_message'>";

		echo "</div>";
		
		$formOutput = ob_get_clean();

        echo $formOutput;

	}
	else{

	    echo "<div class='cg_logged_in_message mainCGdivUploadForm mainCGdivUploadFormStatic $FeControlsStyleLogin $BorderRadiusLogin'>";
		echo "$language_YouAreAlreadyLoggedIn";
		echo "</div>";
	}

}

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
echo "<input type='hidden' id='cg_check_email_upload_for_login' value='$language_EmailAdressHasToBeValid'>";
echo "<input type='hidden' id='cg_min_characters_text' value='$language_MinAmountOfCharacters'>";
echo "<input type='hidden' id='cg_max_characters_text' value='$language_MaxAmountOfCharacters'>";
echo "<input type='hidden' id='cg_no_picture_is_choosed' value='$language_ChooseYourImage'>";


echo "<input type='hidden' id='cg_language_BulkUploadQuantityIs' value='$language_BulkUploadQuantityIs'>";
echo "<input type='hidden' id='cg_language_BulkUploadLowQuantityIs' value='$language_BulkUploadLowQuantityIs'>";

echo "<input type='hidden' id='cg_language_BulkUploadLowQuantityIs' value='$language_BulkUploadLowQuantityIs'>";

echo "<input type='hidden' id='cg_language_ThisMailAlreadyExists' value='$language_ThisMailAlreadyExists'>";
echo "<input type='hidden' id='cg_language_ThisNicknameAlreadyExists' value='$language_ThisNicknameAlreadyExists'>";

echo "<input type='hidden' id='cg_language_PasswordRequired' value='$language_PasswordRequired'>";
echo "<input type='hidden' id='cg_language_EmailRequired' value='$language_EmailRequired'>";

echo "<input type='hidden' id='cg_language_EmailAndPasswordDoNotMatch' value='$language_EmailAndPasswordDoNotMatch'>";

?>