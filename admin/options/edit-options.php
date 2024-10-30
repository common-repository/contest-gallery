<!--<link rel="stylesheet" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" />
<script src="http://code.jquery.com/jquery-1.9.1.js"></script>
<script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>-->
<?php

// Path to jquery Lightbox Script 

//$pathJquery = plugins_url().'/contest-gallery/js/jquery.js';
//$pathPlugin1 = plugins_url().'/contest-gallery/js/lightbox-2.6.min.js';
//$pathPlugin2 = plugins_url().'/contest-gallery/css/lightbox.css';
//$pathPlugin3 = plugins_url().'/contest-gallery/css/star_off_48.png';
//$pathPlugin4 = plugins_url().'/contest-gallery/css/star_48.png';
//$pathCss = plugins_url().'/contest-gallery/css/style.css';
//$pathJqueryUI = plugins_url().'/contest-gallery/js/jquery-ui.js';
//$pathJqueryUIcss = plugins_url().'/contest-gallery/js/jquery-ui.css';
//$pathTabCSS = plugins_url().'/contest-gallery/admin/options/tabcontent.css';
//$pathTabJS = plugins_url().'/contest-gallery/admin/options/tabcontent.js';
//$cssPng = content_url().'/plugins/contest-gallery/css/lupe.png';// URL for zoom pic  
//$cssPng = content_url().'/plugins/contest-
//gallery/css/lupe.png';// URL for zoom pic



/*error_reporting(E_ALL);
ini_set('display_errors', 'On');
ini_set('error_reporting', E_ALL);*/
//$testLala = $_POST['lala'];
//add_action('wp_enqueue_scripts','my_scripts');


/*

echo <<<HEREDOC

<link href="$pathPlugin2" rel="stylesheet" />
<link href="$pathCss" rel="stylesheet" />
<link href="$pathPlugin6" rel="stylesheet" />


HEREDOC;
*/
//echo $pathCss;
/*

echo <<<HEREDOC

	<script src='$pathJquery'></script>
	<script src='$pathJqueryUI'></script>
	<script src='$pathJqueryUIcss'></script>
	<link href='$pathTabCSS' rel="stylesheet" type="text/css" />
	<script src='$pathTabJS'></script>

HEREDOC;*/



global $wpdb;

$galeryNR = @$_GET['option_id'];
$GalleryID = @$_GET['option_id'];



$tablenameOptions = $wpdb->prefix . "contest_gal1ery_options";
$tablename_options_input = $wpdb->prefix . "contest_gal1ery_options_input";
$tablename_options_visual = $wpdb->prefix . "contest_gal1ery_options_visual";
$tablename_form_input = $wpdb->prefix . "contest_gal1ery_f_input";
$tablename_email_admin = $wpdb->prefix . "contest_gal1ery_mail_admin";
$tablenameemail = $wpdb->prefix . "contest_gal1ery_mail";
$tablename_pro_options = $wpdb->prefix . "contest_gal1ery_pro_options";
//$tablename_mail_gallery = $wpdb->prefix . "contest_gal1ery_mail_gallery";
$tablename_mail_confirmation = $wpdb->prefix . "contest_gal1ery_mail_confirmation";


//$optionID = @@$_POST['option_id'];


$selectSQL1 = $wpdb->get_results( "SELECT * FROM $tablenameOptions WHERE id = '$galeryNR'" );
$selectSQL2 = $wpdb->get_results( "SELECT * FROM $tablename_options_input WHERE GalleryID = '$galeryNR'" );
$selectSQL3 = $wpdb->get_results( "SELECT * FROM $tablename_options_visual WHERE GalleryID = '$galeryNR'" );

if(file_exists(plugin_dir_path( __FILE__ )."../users/admin/registry/create-user-form.php")){

    $selectSQL4 = $wpdb->get_results( "SELECT * FROM $tablename_pro_options WHERE GalleryID = '$galeryNR'" );

    foreach($selectSQL4 as $value4){

        $ForwardAfterRegUrl = html_entity_decode(stripslashes($value4->ForwardAfterRegUrl));
        $ForwardAfterRegText = html_entity_decode(stripslashes($value4->ForwardAfterRegText));
        $ForwardAfterLoginUrlCheck = ($value4->ForwardAfterLoginUrlCheck==1) ? 'checked' : '';
        $ForwardAfterLoginUrlStyle = ($value4->ForwardAfterLoginUrlCheck==1) ? 'style="width:510px;height:100px;"' : 'disabled style="background-color:#e0e0e0;width:510px;height:100px;"';
        $ForwardAfterLoginUrl = html_entity_decode(stripslashes($value4->ForwardAfterLoginUrl));
        $ForwardAfterLoginTextCheck = ($value4->ForwardAfterLoginTextCheck==1) ? 'checked' : '';
        $ForwardAfterLoginTextStyle = ($value4->ForwardAfterLoginTextCheck==1) ? 'style="width:510px;height:100px;"' : 'disabled style="background-color:#e0e0e0;width:510px;height:100px;"';
        $ForwardAfterLoginText = html_entity_decode(stripslashes($value4->ForwardAfterLoginText));
        $TextEmailConfirmation = html_entity_decode(stripslashes($value4->TextEmailConfirmation));
        $TextAfterEmailConfirmation = html_entity_decode(stripslashes($value4->TextAfterEmailConfirmation));
        $RegMailAddressor = $value4->RegMailAddressor;
        $RegMailReply = $value4->RegMailReply;
        $RegMailSubject = $value4->RegMailSubject;
        $RegUserUploadOnly = ($value4->RegUserUploadOnly==1) ? 'checked' : '';
        $RegUserUploadOnlyStyle = ($value4->RegUserUploadOnly==1) ? 'style="width:510px;height:100px;"' : 'disabled style="background-color:#e0e0e0;width:510px;height:100px;"';
        $RegUserUploadOnlyText = html_entity_decode(stripslashes($value4->RegUserUploadOnlyText));
        $Manipulate = ($value4->Manipulate==1) ? 'checked' : '';


    }

}



$checkDataFormOutput = $wpdb->get_results("SELECT * FROM $tablename_form_input WHERE GalleryID = $galeryNR and (Field_Type = 'comment-f' or Field_Type = 'text-f' or Field_Type = 'email-f')");


$selectSQLemailAdmin = $wpdb->get_row( "SELECT * FROM $tablename_email_admin WHERE GalleryID = '$galeryNR'" );
$ContentAdminMail = $selectSQLemailAdmin->Content;

$selectGalleryLookOrder = $wpdb->get_results( "SELECT ThumbLookOrder, HeightLookOrder, RowLookOrder  FROM $tablenameOptions WHERE id = '$galeryNR'" );

// Reihenfolge der Gallerien wird ermittelt

$order = array();

foreach($selectGalleryLookOrder[0] as $key => $value){
    $order[$value]=$key;
}

ksort($order);

// Reihenfolge der Gallerien wird ermittelt --- ENDE


foreach($selectSQL1 as $value){

    $selectedCheckComments = ($value->AllowComments==1) ? 'checked' : '';
    $selectedCheckRating = ($value->AllowRating==1) ? 'checked' : '';
    $selectedCheckRating2 = ($value->AllowRating==2) ? 'checked' : '';
    $selectedCheckFbLike = ($value->FbLike==1) ? 'checked' : '';
    $selectedCheckFbLikeGallery = ($value->FbLikeGallery==1) ? 'checked' : '';
    $selectedCheckFbLikeGalleryVote = ($value->FbLikeGalleryVote==1) ? 'checked' : '';
    $selectedRatingOutGallery = ($value->RatingOutGallery==1) ? 'checked' : '';
    $selectedCommentsOutGallery = ($value->CommentsOutGallery==1) ? 'checked' : '';
    $selectedCheckIp = ($value->IpBlock==1) ? 'checked' : '';
    $selectedCheckFb = ($value->FbLike==1) ? 'checked' : '';
    $checkLogin = ($value->CheckLogin==1) ? 'checked' : '';
    $checkLoginBgColor = ($value->CheckLogin==1) ? '#62ff71' : '#fca7a7';
    @$HideUntilVote = ($value->HideUntilVote==1) ? 'checked' : '';
    @$ShowOnlyUsersVotes = ($value->ShowOnlyUsersVotes==1) ? 'checked' : '';
    @$HideInfo = ($value->HideInfo==1) ? 'checked' : '';

    //echo "<br>HideInfo: $HideInfo<br>";

    @$ActivateUpload = ($value->ActivateUpload==1) ? 'checked' : '';
    @$ContestEnd = ($value->ContestEnd==1) ? 'checked' : '';
    @$ContestEndInstant = ($value->ContestEnd==2) ? 'checked' : '';
    @$ContestEndTimeField = ($value->ContestEnd==1) ? '' : 'disabled';
    @$ContestEndTime = $value->ContestEndTime-86400;
    echo "<input type='hidden' id='getContestEndTime' value='".@$ContestEndTime."'>";
    $FullSize = ($value->FullSize==1) ? 'checked' : '';
    $OnlyGalleryView = ($value->OnlyGalleryView==1) ? 'checked' : '';
    $SinglePicView = ($value->SinglePicView==1) ? 'checked' : '';
    $ScaleOnly = ($value->ScaleOnly==1) ? 'checked' : '';
    $ScaleAndCut = ($value->ScaleAndCut==1) ? 'checked' : '';
    @$selectedCheckPicUpload = ($value->PicUpload==1) ? 'checked' : '';
    @$selectedCheckSendEmail = ($value->SendEmail==1) ? 'checked' : '';
    @$selectedSendName = ($value->SendName==1) ? 'checked' : '';
    @$selectedCheckSendComment = ($value->SendComment==1) ? 'checked' : '';

    $AllowGalleryScript = ($value->AllowGalleryScript==1) ? 'checked' : '';

    $InfiniteScroll = $value->InfiniteScroll;

    //echo "<br>InfiniteScroll: $InfiniteScroll<br>";


    //$InfiniteScroll = ($value->InfiniteScroll==1) ? 'checked' : '';


    $FullSizeImageOutGallery = ($value->FullSizeImageOutGallery==1) ? 'checked' : '';
    $FullSizeImageOutGalleryNewTab = ($value->FullSizeImageOutGalleryNewTab==1) ? 'checked' : '';
    $ShowAlwaysInfoSlider = ($value->ShowAlwaysInfoSlider==1) ? 'checked' : '';
    $HeightLook = ($value->HeightLook==1) ? 'checked' : '';
    $RowLook = ($value->RowLook==1) ? 'checked' : '';
    $ThumbsInRow = ($value->ThumbsInRow==1) ? 'checked' : '';
    $LastRow = ($value->LastRow==1) ? 'checked' : '';
    $AllowSort = ($value->AllowSort==1) ? 'checked' : '';
    $RandomSort = ($value->RandomSort==1) ? 'checked' : '';
    $PicsInRow = $value->PicsInRow;
    $PicsPerSite = $value->PicsPerSite;
    $VotesPerUser = $value->VotesPerUser;
    if($VotesPerUser==0){$VotesPerUser='';}
    $GalleryName1 = $value->GalleryName;
    $ShowAlways = $value->ShowAlways;
    @$selectedShowAlways = ($value->ShowAlways==1) ? 'checked' : '';


    //echo "<br>GalleryName: $GalleryName<br>";

    // Forward images to URL options

    @$Use_as_URL = $wpdb->get_var( "SELECT Use_as_URL FROM $tablename_form_input WHERE GalleryID = '$galeryNR' AND Use_as_URL = '1' ");
    //echo "<br>Use_as_URL: $Use_as_URL<br>";
    @$ForwardToURL = ($value->ForwardToURL==1) ? 'checked' : '';
    @$ForwardType = ($value->ForwardType==2) ? 'checked' : '';
    //echo $ForwardType;
    //Prüfen ob Forward URL aus dem Slider oder aus der Gallerie weiterleiten soll
    @$ForwardFrom = $value->ForwardFrom;
    @$ForwardFromSlider = ($ForwardFrom==1) ? 'checked' : '';
    @$ForwardFromGallery = ($ForwardFrom==2) ? 'checked' : '';
    @$ForwardFromSinglePic = ($ForwardFrom==3) ? 'checked' : '';





    // Forward images to URL options --- ENDE


    $ThumbLook = ($value->ThumbLook==1) ? 'checked' : '';
    $AdjustThumbLook = ($value->AdjustThumbLook==1) ? 'checked' : '';

    $WidthThumb = $value->WidthThumb;
    $HeightThumb = $value->HeightThumb;
    $DistancePics = $value->DistancePics;
    $DistancePicsV = $value->DistancePicsV;

    $WidthGallery = $value->WidthGallery;
    $HeightGallery = $value->HeightGallery;
    $HeightLookHeight = $value->HeightLookHeight;
    $Inform = $value->Inform;
    $InformAdmin = ($value->InformAdmin==1) ? 'checked' : '';
    $MaxResJPGwidth = $value ->MaxResJPGwidth;
    $MaxResJPGheight = $value ->MaxResJPGheight;
    //Leeren Wert kann man by MySQL nicht einfügen. Es entsteht immer eine NULL
    if($MaxResJPGwidth==0){$MaxResJPGwidth='';}
    if($MaxResJPGheight==0){$MaxResJPGheight='';}
    $MaxResPNGwidth = $value ->MaxResPNGwidth;
    $MaxResPNGheight = $value ->MaxResPNGheight;
    if($MaxResPNGwidth==0){$MaxResPNGwidth='';}
    if($MaxResPNGheight==0){$MaxResPNGheight='';}
    $MaxResGIFwidth = $value ->MaxResGIFwidth;
    $MaxResGIFheight = $value ->MaxResGIFheight;
    if($MaxResGIFwidth==0){$MaxResGIFwidth='';}
    if($MaxResGIFheight==0){$MaxResGIFheight='';}
    $MaxResJPGon = ($value->MaxResJPGon==1) ? 'checked' : '';
    $MaxResPNGon = ($value->MaxResPNGon==1) ? 'checked' : '';
    $MaxResGIFon = ($value->MaxResGIFon==1) ? 'checked' : '';
    $MaxResJPGwidthOnDisabled = ($value->MaxResJPGon==1) ? '' : 'disabled style="background: #e0e0e0;width:190px;"';
    $MaxResJPGheightOnDisabled = ($value->MaxResJPGon==1) ? '' : 'disabled style="background: #e0e0e0;width:190px;"';
    $MaxResPNGwidthOnDisabled = ($value->MaxResPNGon==1) ? '' : 'disabled style="background: #e0e0e0;width:190px;"';
    $MaxResPNGheightOnDisabled = ($value->MaxResPNGon==1) ? '' : 'disabled style="background: #e0e0e0;width:190px;"';
    $MaxResGIFwidthOnDisabled = ($value->MaxResGIFon==1) ? '' : 'disabled style="background: #e0e0e0;width:190px;"';
    $MaxResGIFheightOnDisabled = ($value->MaxResGIFon==1) ? '' : 'disabled style="background: #e0e0e0;width:190px;"';
    $FbLikeGoToGalleryLink = (empty($value->FbLikeGoToGalleryLink)) ? '' : $value->FbLikeGoToGalleryLink;
    $FbLikeGoToGalleryLink = html_entity_decode(stripslashes($FbLikeGoToGalleryLink));

    $ActivatePostMaxMB = ($value->ActivatePostMaxMB==1) ? 'checked' : '';
    $PostMaxMB = $value ->PostMaxMB;
    if($PostMaxMB==0){$PostMaxMB='';}
    $PostMaxMBdisabled = ($value->ActivatePostMaxMB==1) ? '' : 'disabled style="background: #e0e0e0;width:190px;"';


    $ActivateBulkUpload = ($value->ActivateBulkUpload==1) ? 'checked' : '';
    $BulkUploadQuantity = $value ->BulkUploadQuantity;
    if($BulkUploadQuantity==0){$BulkUploadQuantity='';}
    $BulkUploadQuantityDisabled = ($value->ActivateBulkUpload==1) ? '' : 'disabled style="background: #e0e0e0;width:190px;"';

    $BulkUploadMinQuantity = $value->BulkUploadMinQuantity;
    if($BulkUploadMinQuantity==0){$BulkUploadMinQuantity='';}
    $BulkUploadMinQuantityDisabled = ($value->ActivateBulkUpload==1) ? '' : 'disabled style="background: #e0e0e0;width:190px;"';

    $GalleryName = $value->GalleryName;

}



//print_r($selectSQL2);

foreach($selectSQL2 as $value2){

    // Wenn 0 dann confirmation text, wenn 1 dann URL Weiterleitung
    $Forward = ($value2->Forward==1) ? 'checked' : '';
    $ForwardUploadConf = ($value2->Forward==0) ? 'checked' : '';
    $ForwardUploadURL = ($value2->Forward==1) ? 'checked' : '';
    //echo "$Forward";
    $forward_url_disabled = ($value2->Forward==1) ? 'style="width:500px;"' : 'disabled style="background: #e0e0e0;width:500px;"';
    $Forward_URL = $value2->Forward_URL;
    $Forward_URL = html_entity_decode(stripslashes($Forward_URL));
    $Confirmation_Text = $value2->Confirmation_Text;
    $Confirmation_Text = html_entity_decode(stripslashes($Confirmation_Text));
    $Confirmation_Text_Disabled = ($value2->Forward==0) ? 'style="width:500px;height:150px;"' : 'disabled style="background: #e0e0e0;width:500px;height:150px;"';




}

//	print_r($selectSQL3);

foreach($selectSQL3 as $value3){

    $Field1IdGalleryView = $value3->Field1IdGalleryView;
    $ThumbViewBorderWidth = $value3->ThumbViewBorderWidth;
    $ThumbViewBorderRadius = $value3->ThumbViewBorderRadius;
    $ThumbViewBorderColor = $value3->ThumbViewBorderColor;
    $ThumbViewBorderColorPlaceholder = (empty($ThumbViewBorderColor)) ? "placeholder='000000'" : '';
    $ThumbViewBorderOpacity = $value3->ThumbViewBorderOpacity;
    $HeightViewBorderWidth = $value3->HeightViewBorderWidth;
    $HeightViewBorderRadius = $value3->HeightViewBorderRadius;
    $HeightViewBorderColor = $value3->HeightViewBorderColor;
    $HeightViewBorderColorPlaceholder = (empty($HeightViewBorderColor)) ? "placeholder='000000'" : '';
    $HeightViewBorderOpacity = $value3->HeightViewBorderOpacity;
    $HeightViewSpaceWidth = $value3->HeightViewSpaceWidth;
    $HeightViewSpaceHeight = $value3->HeightViewSpaceHeight;
    $RowViewBorderWidth = $value3->RowViewBorderWidth;
    $RowViewBorderRadius = $value3->RowViewBorderRadius;
    $RowViewBorderColor = $value3->RowViewBorderColor;
    $RowViewBorderColorPlaceholder = (empty($RowViewBorderColor)) ? "placeholder='000000'" : '';
    $RowViewBorderOpacity = $value3->RowViewBorderOpacity;
    $RowViewSpaceWidth = $value3->RowViewSpaceWidth;
    $RowViewSpaceHeight = $value3->RowViewSpaceHeight;
    $TitlePositionGallery = $value3->TitlePositionGallery;
    $RatingPositionGallery = $value3->RatingPositionGallery;
    $CommentPositionGallery = $value3->CommentPositionGallery;
    $ActivateGalleryBackgroundColor = ($value3->ActivateGalleryBackgroundColor==1) ? 'checked' : '' ;
    $GalleryBackgroundColor = $value3->GalleryBackgroundColor;
    $GalleryBackgroundColorPlaceholder = (empty($GalleryBackgroundColor)) ? "placeholder='000000'" : '';
    $GalleryBackgroundOpacity = $value3->GalleryBackgroundOpacity;
    $OriginalSourceLinkInSlider = ($value3->OriginalSourceLinkInSlider==1) ? 'checked' : '';
    $PreviewInSlider = ($value3->PreviewInSlider==1) ? 'checked' : '';

}

//echo "source:".$OriginalSourceLinkInSlider;


$selectedRatingPositionGalleryLeft = ($RatingPositionGallery==1) ? "checked" : "";
$selectedRatingPositionGalleryCenter = ($RatingPositionGallery==2) ? "checked" : "";
$selectedRatingPositionGalleryRight = ($RatingPositionGallery==3) ? "checked" : "";

$selectedCommentPositionGalleryLeft = ($CommentPositionGallery==1) ? "checked" : "";
$selectedCommentPositionGalleryCenter = ($CommentPositionGallery==2) ? "checked" : "";
$selectedCommentPositionGalleryRight = ($CommentPositionGallery==3) ? "checked" : "";


$selectedTitlePositionGalleryLeft = ($TitlePositionGallery==1) ? "checked" : "";
$selectedTitlePositionGalleryCenter = ($TitlePositionGallery==2) ? "checked" : "";
$selectedTitlePositionGalleryRight = ($TitlePositionGallery==3) ? "checked" : "";

if(@$Field1IdGalleryView and @$Field1IdGalleryView!=0){$enabledTitlePositionGalleryLeft = 'enabled';}
else{$enabledTitlePositionGalleryLeft = 'disabled';}



$GalleryBackgroundColorFields = ($value3->ActivateGalleryBackgroundColor==0) ? 'disabled' : '' ;
//$ThumbLookFieldsChecked = ($value->RowLook==0) ? 'checked' : '' ;
$GalleryBackgroundColorStyle = ($value3->ActivateGalleryBackgroundColor==0) ? 'background-color:#e0e0e0;' : '' ;



//echo "<br>ThumbViewBorderOpacity: $ThumbViewBorderOpacity<br>";
//echo "<br>HeightViewBorderOpacity: $HeightViewBorderOpacity<br>";
//	echo "<br>RowViewBorderOpacity: $RowViewBorderOpacity<br>";



// Disable enable RowLook and ThumbLook Fields

$RowLookFields = ($value->RowLook==0) ? 'disabled' : '' ;
$RowLookFieldsStyle = ($value->RowLook==0) ? 'background-color:#e0e0e0;' : '' ;
$HeightLookFields = ($value->HeightLook==0) ? 'disabled' : '' ;
$HeightLookFieldsStyle = ($value->HeightLook==0) ? 'background-color:#e0e0e0;' : '' ;
$ThumbLookFields = ($value->ThumbLook==0) ? 'disabled' : '' ;
//$ThumbLookFieldsChecked = ($value->RowLook==0) ? 'checked' : '' ;
$ThumbLookFieldsStyle = ($value->ThumbLook==0) ? 'background-color:#e0e0e0;' : '' ;

// Disable enable RowLook Fields  --------- END

// Inform set or not

$checkInform = ($Inform==1) ? 'checked' : '' ;

$id = $galeryNR;


//Update 4.00: Single Pic View Prüfung

if($AllowGalleryScript!= 'checked' AND $FullSizeImageOutGallery != 'checked' AND $SinglePicView != 'checked' AND $OnlyGalleryView != 'checked'){

    $SinglePicView = "checked";

}

//Update 4.00: Single Pic View Prüfung --- ENDE


//echo $SinglePicView;


// Get email text options

$selectSQLemail = $wpdb->get_row( "SELECT * FROM $tablenameemail WHERE GalleryID = '$galeryNR'" );



$selectSQLmailConfirmation = $wpdb->get_row("SELECT * FROM $tablename_mail_confirmation WHERE GalleryID = '$galeryNR'" );

$mConfirmSendConfirm = ($selectSQLmailConfirmation->SendConfirm==1) ? 'checked' : '' ;

//$selectSQLmailGallery = $wpdb->get_row("SELECT * FROM $tablename_mail_gallery WHERE GalleryID = '$galeryNR'" );

/*$mGallerySendToImageOff = ($selectSQLmailGallery->SendToImageOff==1) ? 'checked' : '' ;
$mGallerySendToNotConfirmedUsers = ($selectSQLmailGallery->SendToNotConfirmedUsers==1) ? 'checked' : '' ;*/


//$content = (@$_POST['editpost']) ? @$_POST['editpost'] : $selectSQLemail->Content;
$contentUserMail = $selectSQLemail->Content;
//$content = html_entity_decode(stripslashes($content));

//nl2br($contentBr);

// Get email text options --- ENDE


require_once(dirname(__FILE__) . "/../nav-menu.php");


echo "<br/>";

echo "<form action='?page=contest-gallery/index.php&edit_options=true&option_id=$galeryNR' method='post'>";

//echo '<input type="hidden" name="editOptions" value="true" >';
echo '<input type="hidden" name="option_id" value="'.$galeryNR.'" >';

//echo '<input type="hidden" id="checkLoginBgColor" value="'.$checkLoginBgColor.'" >';


$i=0;

@$MaxRes = unserialize($MaxRes);


echo <<<HEREDOC

		
    <div style="width: 937px;" id="cg_main_options">
        <ul class="tabs" data-persist="true">
            <li class='cg_view'><a href="#view1">Multiple pics options</a></li>
            <li class='cg_view'><a href="#view2">Single pic options</a></li>
            <li class='cg_view'><a href="#view3">Gallery options</a></li>
            <li class='cg_view'><a href="#view4">Upload options</a></li>
            <li class='cg_view'><a href="#view5">Registration options</a></li>
            <li class='cg_view'><a href="#view6">Login options</a></li>
HEREDOC;
if(file_exists(plugin_dir_path( __FILE__ )."../users/admin/registry/create-user-form.php")){
    $styleTabContents="style='border-top: none !important;border-radius:none !important;'";
    echo <<<HEREDOC
			<div style="padding-top:10px;background-color:white;border-top: 1px solid #B7B7B7;border-right: 1px solid #B7B7B7;border-radius:none !important;">
				<li class='cg_view'><a href="#view7">E-mail confirmation e-mail</a></li>
				<li class='cg_view'><a href="#view8">Image activation e-mail</a></li>
			</div>
HEREDOC;
}

echo <<<HEREDOC
        </ul>
        <div class="tabcontents" $styleTabContents>
            <div id="view1">
HEREDOC;


/*$tinymceStyle = '<style type="text/css">
				   .wp-editor-area{height:300px;}
				   </style>';*/

/*$timymceSettings = array(
    'plugins' => "preview",
    'menubar' => "view",
    'toolbar' => "preview",
    'plugin_preview_width'=> 650,
    'selector' => "textarea"
);*/

/*$settingsHTMLarea = array(
    "media_buttons"=>false,
    'editor_class' => 'html-active',
    'default_post_edit_rows'=> 10,
    "textarea_name"=>'upload[]',
    "teeny" => true,
    "dfw" => true,
    'editor_css' => $tinymceStyle
);*/

// TINY MCE Settings here
$settings = array(
    "media_buttons"=>false,
    "teeny" => true,
    'default_post_edit_rows'=> 10
);




//	echo '<input type="hidden" name="order[]" value="t" >';
echo "<table style='background-color:white;text-align:left;margin-left:170px;' width='545px;'>";
echo "<tr><td style='padding-left:20px;width:340px;'>";
//echo '<input type="text" hidden name="id" value="' . $id . '" method="post" >';
echo '<p><b><u>General options</u></b></p>';
echo "</td>";
echo "<td style='padding-left:20px;text-align:right;padding-right:20px;'>";
echo '<p></p>';
echo "</td>";
echo "</tr>";
echo "<tr>";
echo "<td style='padding-left:20px;width:340px;'>";
echo '<p>Number of pictures per screen (Pagination):</p>';
echo "</td>";
echo "<td style='padding-left:0px;'>";
echo '<input type="text" name="PicsPerSite" id="PicsPerSite" maxlength="3" value="'.$PicsPerSite.'"><br/>';
echo "</td>";
echo "</tr>";
echo "<tr>";
echo "<td style='padding-left:20px;width:340px;'>";
echo '<p>Activate gallery background color:</p>';
echo "</td>";
echo "<td style='padding-left:0px;'>";
echo '<input type="checkbox" name="ActivateGalleryBackgroundColor" id="ActivateGalleryBackgroundColor" ' . $ActivateGalleryBackgroundColor  . '><br/>';
echo "</td>";
echo "</tr>";
echo "<tr>";
echo "<td style='padding-left:20px;'>";
echo '<p>Gallery background color:</p>';
echo "</td>";
echo "<td>";
echo '<input type="text" id="GalleryBackgroundColor" name="GalleryBackgroundColor['.$GalleryBackgroundOpacity.']" class="demo" maxlength="7"  data-opacity="'.$GalleryBackgroundOpacity.'" value="'.$GalleryBackgroundColor.'" ' . $GalleryBackgroundColorFields  . ' style="' . $GalleryBackgroundColorStyle  . ' height:27px;">';

//echo '<input type="text" name="cg_row_look_border_color" maxlength="7" id="cg_row_look_border_width" value="'.$RowViewBorderColor.'" ' . $RowLookFields  . ' ' . $RowLookFieldsStyle  . '><br/>';
echo "</td>";
echo "</tr>";
echo "<tr>";
echo "<td style='padding-left:20px;width:340px;'>";
echo '<p>Allow sort:<br/><strong>(Order by rating not available if <br>"Show only users votes" or <br>"Hide voting until user vote" is activated.)</strong></p>';
echo "</td>";
echo "<td style='padding-left:0px;'>";
echo '<input type="checkbox" name="AllowSort" id="AllowSort" ' . $AllowSort . '><br/>';
echo "</td>";
echo "</tr>";
echo "<td style='padding-left:20px;width:340px;'>";
echo '<p>Random sort (Each page load):<strong><br/>(Pagination will be deactivated.<br/>Lazy Load is possible.)</strong></p>';
echo "</td>";
echo "<td style='padding-left:0px;'>";
echo '<input type="checkbox" name="RandomSort" id="RandomSort" ' . $RandomSort . '><br/>';
echo "</td>";
echo "</tr>";
echo "</table>";
echo "<br>";
echo "<hr style='margin-left:170px;' width='545px;'>";
echo "<br>";


echo "<div id='cg_options_sortable' style='width:442px;text-align:center;'>";

//print_r($order);


foreach($order as $key => $value){

    $i++;

    if($value=="ThumbLookOrder"){

        // 1 = Height, 2 = Thumb, 3 = Row
        if($InfiniteScroll==2){$InfiniteScrollThumb="checked";}
        else{$InfiniteScrollThumb="";}

        echo "<div class='cg_options_sortableContainer'>";
        echo '<input type="hidden" name="order[]" value="t" >';
        echo "<table style='background-color:white;text-align:left;margin-left:170px;' width='545px;'>";
        echo "<tr><td style='padding-left:20px;width:340px;'>";
        //echo '<input type="text" hidden name="id" value="' . $id . '" method="post" >';
        echo '<p><b>Thumb view</b></p>';
        echo "</td>";
        echo "<td style='padding-left:20px;text-align:right;padding-right:20px;' class='cg_options_sortableDiv'>";
            if($key==1 or $key==2){ $cgHideClass = '';}
            else{$cgHideClass = ' cg_hide';}
            echo '<div class="cg_options_order"><u>'.$i.'. Order</u></div><div class="cg_options_order_change_order cg_move_view_to_bottom'.$cgHideClass.'"><i></i></div>';
            if($key==2 or $key==3){$cgHideClass = '';}
            else{$cgHideClass = ' cg_hide';}
            echo '<div class="cg_options_order_change_order cg_move_view_to_top'.$cgHideClass.'"><i></i></div>';
        echo "</td>";
        echo "</tr>";
        echo "<tr>";
        echo "<td style='padding-left:20px;width:340px;'>";
        echo '<p>Activate thumb view:</p>';
        echo "</td>";
        echo "<td style='padding-left:0px;'>";
        echo '<input type="checkbox" name="ThumbLook" id="ThumbLook" ' . $ThumbLook  . '><br/>';
        echo "</td>";
        echo "</tr>";
        echo "<tr>";
        echo "<td style='padding-left:20px;width:340px;'>";
        echo '<p>Width thumbs (px):</p>';
        echo "</td>";
        echo "<td style='padding-left:0px;'>";
        echo '<input type="text" name="WidthThumb" id="WidthThumb" maxlength="4" value="'.$WidthThumb.'" ' . $ThumbLookFields  . '  style="' . $ThumbLookFieldsStyle  . '"><br/>';
        echo "</td>";
        echo "</tr>";
        echo "<tr>";
        echo "<td style='padding-left:20px;'>";
        echo '<p>Height thumbs (px):</p>';
        echo "</td>";
        echo "<td style='padding-left:0px;'>";
        echo '<input type="text" name="HeightThumb" id="HeightThumb" maxlength="4" value="'.$HeightThumb.'" ' . $ThumbLookFields  . '  style="' . $ThumbLookFieldsStyle  . '"><br/>';
        echo "</td>";
        echo "</tr>";
        echo "<tr>";
        echo "<td style='padding-left:20px;'>";
        echo '<p>Distance between thumbs horizontal (px):</p>';
        echo "</td>";
        echo "<td style='padding-left:0px;'>";
        echo '<input type="text" name="DistancePics" id="DistancePics" maxlength="4" value="'.$DistancePics.'" ' . $ThumbLookFields  . ' style="' . $ThumbLookFieldsStyle  . '"><br/>';
        echo "</td>";
        echo "</tr>";
        echo "<tr>";
        echo "<td style='padding-left:20px;' >";
        echo '<p>Distance between thumbs vertical (px):</p>';
        echo "</td>";
        echo "<td style='padding-left:0px;'>";
        echo '<input type="text" name="DistancePicsV" id="DistancePicsV" maxlength="4"  value="'.$DistancePicsV.'" ' . $ThumbLookFields  . ' style="' . $ThumbLookFieldsStyle  . '"><br/>';
        echo "</td>";
        echo "</tr>";

        /*
        echo "<tr>";
        echo "<td style='padding-left:20px;width:340px;'>";
        echo '<p>Adjust view on parent tag:</p>';
        echo "</td>";
        echo "<td style='padding-left:0px;'>";
        echo '<input type="checkbox" name="AdjustThumbLook" id="AdjustThumbLook" ' . $ThumbLookFields  . ' style="' . $ThumbLookFieldsStyle  . '"><br/>';
        echo "</td>";
        echo "</tr>";*/

        echo "<tr>";
        echo "<td style='padding-left:20px;'>";
        echo '<p>Border width (px):</p>';
        echo "</td>";
        echo "<td>";
        echo '<input type="text" name="ThumbViewBorderWidth" maxlength="2" id="ThumbViewBorderWidth" value="'.$ThumbViewBorderWidth.'" ' . $ThumbLookFields  . ' style="' . $ThumbLookFieldsStyle  . '"><br/>';
        echo "</td>";
        echo "</tr>";

        echo "<tr>";
        echo "<td style='padding-left:20px;'>";
        echo '<p>border radius (%):<br>';
        echo '(50% =< images getting completly round<br>';
        echo 'Effect begins with 6% and higher <br/>';
        echo 'Rating, Comment and Info on an image<br>';
        echo 'in a gallery will be centered vertically.)';
        echo '</p>';
        echo "</td>";
        echo "<td>";
        echo '<input type="text" name="ThumbViewBorderRadius" id="ThumbViewBorderRadius" maxlength="2" id="cg_thumb_look_border_radius" value="'.$ThumbViewBorderRadius.'" ' . $ThumbLookFields  . ' style="' . $ThumbLookFieldsStyle  . '"><br/>';
        echo "</td>";
        echo "</tr>";


        echo "<tr>";
        echo "<td style='padding-left:20px;'>";
        echo '<p>Border color:</p>';
        echo "</td>";
        echo "<td>";
        echo '<input type="text" id="ThumbViewBorderColor" name="ThumbViewBorderColor['.$ThumbViewBorderOpacity.']" class="demo"
			maxlength="7"  data-opacity="'.$ThumbViewBorderOpacity.'" value="'.$ThumbViewBorderColor.'" ' . $ThumbLookFields  . '
			style="' . $ThumbLookFieldsStyle  . ' height:27px;" '.$ThumbViewBorderColorPlaceholder.'>';

        //echo '<input type="text" name="cg_row_look_border_color" maxlength="7" id="cg_row_look_border_width" value="'.$RowViewBorderColor.'" ' . $RowLookFields  . ' ' . $RowLookFieldsStyle  . '><br/>';
        echo "</td>";
        echo "</tr>";


        echo "<tr>";
        echo "<td style='padding-left:20px;'>";
        echo '<p>Infinite Scroll (Lazy Load):<br/><strong>(If activated other views<br/>and Pagination are deactivated)</strong></p>';
        echo "</td>";
        echo "<td>";
        echo '<input type="checkbox" id="InfiniteScrollThumb" name="InfiniteScrollThumb" ' . $InfiniteScrollThumb  . ' ' . $ThumbLookFields  . ' style="' . $ThumbLookFieldsStyle  . '"><br/>';

        //echo '<input type="text" name="cg_row_look_border_color" maxlength="7" id="cg_row_look_border_width" value="'.$RowViewBorderColor.'" ' . $RowLookFields  . ' ' . $RowLookFieldsStyle  . '><br/>';
        echo "</td>";
        echo "</tr>";


        echo "</table>";
        echo "<br>";
        echo "<hr style='margin-left:170px;' width='545px;'>";
        echo "<br>";
        echo "</div>";

    }

    if($value=="HeightLookOrder"){

        // 1 = Height, 2 = Thumb, 3 = Row
        if($InfiniteScroll==1){$InfiniteScrollHeight="checked";}
        else{$InfiniteScrollHeight="";}

        echo "<div class='cg_options_sortableContainer'>";
        echo '<input type="hidden" name="order[]" value="h" >';
        echo "<table style='background-color:white;text-align:left;margin-left:170px;' width='545px;'>";
        echo "<tr><td style='padding-left:20px;width:305px;'>";
        echo '<p><b>Height view:</b></p>';
        echo "</td>";
        echo "<td style='text-align:right;padding-right:20px;' class='cg_options_sortableDiv'>";
            if($key==1 or $key==2){ $cgHideClass = '';}
            else{$cgHideClass = ' cg_hide';}
            echo '<div class="cg_options_order"><u>'.$i.'. Order</u></div><div class="cg_options_order_change_order cg_move_view_to_bottom'.$cgHideClass.'"><i></i></div>';
            if($key==2 or $key==3){$cgHideClass = '';}
            else{$cgHideClass = ' cg_hide';}
            echo '<div class="cg_options_order_change_order cg_move_view_to_top'.$cgHideClass.'"><i></i></div>';
        echo "</td>";
        echo "</tr>";
        echo "<tr>";
        echo "<td style='padding-left:20px;width:305px;'>";
        echo '<p>Activate height view:</p>';
        echo "</td>";
        echo "<td>";
        echo '<input type="checkbox" id="HeightLook" name="HeightLook" ' . $HeightLook  . '><br/>';
        echo "</td>";
        echo "</tr>";
        echo "<tr>";
        echo "<td style='padding-left:20px;width:305px;'>";
        echo '<p>Height of pics in a row (px):</p>';
        echo "</td>";
        echo "<td>";
        echo '<input type="text" maxlength="3" name="HeightLookHeight" id="HeightLookHeight" value="'.$HeightLookHeight.'" maxlength="3" ' . $HeightLookFields  . ' style="' . $HeightLookFieldsStyle  . '"><br/>';
        echo "</td>";
        echo "</tr>";

        echo "<tr>";
        echo "<td style='padding-left:20px;width:300px;'>";
        echo '<p>Horizontal distance between images (px):</p>';
        echo "</td>";
        echo "<td>";
        echo '<input type="text" name="HeightViewSpaceWidth" id="HeightViewSpaceWidth" maxlength="2" value="'.$HeightViewSpaceWidth.'" ' . $HeightLookFields  . ' style="' . $HeightLookFieldsStyle  . '"><br/>';
        echo "</td>";
        echo "</tr>";

        echo "<tr>";
        echo "<td style='padding-left:20px;width:300px;'>";
        echo '<p>Vertical distance between images (px):</p>';
        echo "</td>";
        echo "<td>";
        echo '<input type="text" name="HeightViewSpaceHeight"  id="HeightViewSpaceHeight" maxlength="2" value="'.$HeightViewSpaceHeight.'" ' . $HeightLookFields  . ' style="' . $HeightLookFieldsStyle  . '"><br/>';
        echo "</td>";
        echo "</tr>";


        echo "<tr>";
        echo "<td style='padding-left:20px;width:300px;'>";
        echo '<p>Border width (px):</p>';
        echo "</td>";
        echo "<td>";
        echo '<input type="text" name="HeightViewBorderWidth" id="HeightViewBorderWidth" maxlength="2" value="'.$HeightViewBorderWidth.'" ' . $HeightLookFields  . ' style="' . $HeightLookFieldsStyle  . '"><br/>';
        echo "</td>";
        echo "</tr>";

        echo "<tr>";
        echo "<td style='padding-left:20px;width:300px;'>";
        echo '<p>border radius (%):<br>';
        echo '(50% =< images getting completly round<br>';
        echo 'Effect begins with 6% and higher <br/>';
        echo 'Rating, Comment and Info on an image<br>';
        echo 'in a gallery will be centered vertically.)';
        echo '</p>';
        echo "</td>";
        echo "<td>";
        echo '<input type="text" name="HeightViewBorderRadius" id="HeightViewBorderRadius" maxlength="2" value="'.$HeightViewBorderRadius.'" ' . $HeightLookFields  . ' style="' . $HeightLookFieldsStyle  . '"><br/>';
        echo "</td>";
        echo "</tr>";


        echo "<tr>";
        echo "<td style='padding-left:20px;width:300px;'>";
        echo '<p>Border color:</p>';
        echo "</td>";
        echo "<td>";
        echo '<input type="text" id="HeightViewBorderColor" name="HeightViewBorderColor['.$HeightViewBorderOpacity.']" class="demo" maxlength="7"
			data-opacity="'.$HeightViewBorderOpacity.'" value="'.$HeightViewBorderColor.'" ' . $HeightLookFields  . '
			style="' . $HeightLookFieldsStyle  . ' height:27px;" '.$HeightViewBorderColorPlaceholder.'>';
        //echo '<input type="text" id="RowViewBorderColor" name="RowViewBorderColor['.$RowViewBorderOpacity.']"  class="demo" maxlength="7"  data-opacity="'.$RowViewBorderOpacity.'" value="'.$RowViewBorderColor.'" ' . $RowLookFields  . ' style="' . $RowLookFieldsStyle  . 'height:27px;">';
        //echo '<input type="text" id="cg_thumb_look_border_color" name="ThumbViewBorderColor" class="demo" maxlength="7"  data-opacity="1" value="'.$ThumbViewBorderColor.'" ' . $ThumbLookFields  . ' style="' . $ThumbLookFieldsStyle  . ' height:27px;">';

        //echo '<input type="text" name="cg_row_look_border_color" maxlength="7" id="cg_row_look_border_width" value="'.$RowViewBorderColor.'" ' . $RowLookFields  . ' ' . $RowLookFieldsStyle  . '><br/>';
        echo "</td>";
        echo "</tr>";

        echo "<tr>";
        echo "<td style='padding-left:20px;'>";
        echo '<p>Infinite Scroll (Lazy Load):<br/><strong>(If activated other views<br/>and Pagination are deactivated)</strong></p>';
        echo "</td>";
        echo "<td>";
        echo '<input type="checkbox" id="InfiniteScrollHeight" name="InfiniteScrollHeight"  ' . $InfiniteScrollHeight  . ' ' . $HeightLookFields  . ' style="' . $HeightLookFieldsStyle  . '"><br/>';

        //echo '<input type="text" name="cg_row_look_border_color" maxlength="7" id="cg_row_look_border_width" value="'.$RowViewBorderColor.'" ' . $RowLookFields  . ' ' . $RowLookFieldsStyle  . '><br/>';
        echo "</td>";
        echo "</tr>";


        echo "</table>";
        echo "<br>";
        echo "<hr style='margin-left:170px;' width='545px;'>";
        echo "<br>";
        echo "</div>";

    }

    if($value=="RowLookOrder"){

        // 1 = Height, 2 = Thumb, 3 = Row
        if($InfiniteScroll==3){$InfiniteScrollRow="checked";}
        else{$InfiniteScrollRow="";}

        echo "<div class='cg_options_sortableContainer'>";
        echo '<input type="hidden" name="order[]" value="r" >';
        echo "<table style='background-color:white;text-align:left;margin-left:170px;' width='545px;'>";
        echo "<tr><td style='padding-left:20px;width:300px;'>";
        echo '<p><b>Row view:<br/>(Same amount of images in each row)</b></p>';
        echo "</td>";
        echo "<td style='text-align:right;padding-right:20px;' class='cg_options_sortableDiv'>";
        if($key==1 or $key==2){ $cgHideClass = '';}
        else{$cgHideClass = ' cg_hide';}
        echo '<div class="cg_options_order"><u>'.$i.'. Order</u></div><div class="cg_options_order_change_order cg_move_view_to_bottom'.$cgHideClass.'"><i></i></div>';
        if($key==2 or $key==3){$cgHideClass = '';}
        else{$cgHideClass = ' cg_hide';}
        echo '<div class="cg_options_order_change_order cg_move_view_to_top'.$cgHideClass.'"><i></i></div>';
        echo "</td>";
        echo "</tr>";
        echo "<tr>";
        echo "<td style='padding-left:20px;width:300px;'>";
        echo '<p>Activate row view:</p>';
        echo "</td>";
        echo "<td>";
        echo '<input type="checkbox" id="RowLook" name="RowLook" ' . $RowLook  . '><br/>';
        echo "</td>";
        echo "</tr>";
        echo "<tr>";
        echo "<td style='padding-left:20px;width:300px;'>";
        echo '<p>Number of pics in a row</p>';
        echo "</td>";
        echo "<td>";
        echo '<input type="text" name="PicsInRow" maxlength="2" id="PicsInRow" value="'.$PicsInRow.'" maxlength="2" ' . $RowLookFields  . ' style="' . $RowLookFieldsStyle  . '"><br/>';
        echo "</td>";
        echo "</tr>";


        echo "<tr>";
        echo "<td style='padding-left:20px;width:300px;'>";
        echo '<p>Horizontal distance between images (px):</p>';
        echo "</td>";
        echo "<td>";
        echo '<input type="text" name="RowViewSpaceWidth" maxlength="2" id="RowViewSpaceWidth" value="'.$RowViewSpaceWidth.'" ' . $RowLookFields  . ' style="' . $RowLookFieldsStyle  . '"><br/>';
        echo "</td>";
        echo "</tr>";

        echo "<tr>";
        echo "<td style='padding-left:20px;width:300px;'>";
        echo '<p>Vertical distance between images (px):</p>';
        echo "</td>";
        echo "<td>";
        echo '<input type="text" name="RowViewSpaceHeight" maxlength="2" id="RowViewSpaceHeight" value="'.$RowViewSpaceHeight.'" ' . $RowLookFields  . ' style="' . $RowLookFieldsStyle  . '"><br/>';
        echo "</td>";
        echo "</tr>";


        echo "<tr>";
        echo "<td style='padding-left:20px;width:300px;'>";
        echo '<p>Border width (px):</p>';
        echo "</td>";
        echo "<td>";
        echo '<input type="text" name="RowViewBorderWidth" maxlength="2" id="RowViewBorderWidth" value="'.$RowViewBorderWidth.'" ' . $RowLookFields  . ' style="' . $RowLookFieldsStyle  . '"><br/>';
        echo "</td>";
        echo "</tr>";

        echo "<tr>";
        echo "<td style='padding-left:20px;width:300px;'>";
        echo '<p>border radius (%):<br>';
        echo '(50% =< images getting completly round<br>';
        echo 'Effect begins with 6% and higher <br/>';
        echo 'Rating, Comment and Info on an image<br>';
        echo 'in a gallery will be centered vertically.)';
        echo '</p>';
        echo "</td>";
        echo "<td>";
        echo '<input type="text" name="RowViewBorderRadius" maxlength="2" id="RowViewBorderRadius" value="'.$RowViewBorderRadius.'" ' . $RowLookFields  . ' style="' . $RowLookFieldsStyle  . '"><br/>';
        echo "</td>";
        echo "</tr>";


        echo "<tr>";
        echo "<td style='padding-left:20px;width:300px;'>";
        echo '<p>Border color:</p>';
        echo "</td>";
        echo "<td>";
        echo '<input type="text" id="RowViewBorderColor" name="RowViewBorderColor['.$RowViewBorderOpacity.']"  class="demo" maxlength="7"
			data-opacity="'.$RowViewBorderOpacity.'" value="'.$RowViewBorderColor.'" ' . $RowLookFields  . ' 
			style="' . $RowLookFieldsStyle  . 'height:27px;" '.$HeightViewBorderColorPlaceholder.'>';
        //echo '<input type="text" name="cg_row_look_border_color" maxlength="7" id="cg_row_look_border_width" value="'.$RowViewBorderColor.'" ' . $RowLookFields  . ' ' . $RowLookFieldsStyle  . '><br/>';
        echo "</td>";
        echo "</tr>";







        echo "<tr>";
        echo "<td style='padding-left:20px;'>";
        echo '<p>Infinite Scroll (Lazy Load):<br/><strong>(If activated other views<br/>and Pagination are deactivated)</strong></p>';
        echo "</td>";
        echo "<td>";
        echo '<input type="checkbox" id="InfiniteScrollRow" name="InfiniteScrollRow" ' . $InfiniteScrollRow  . ' ' . $RowLookFields  . ' style="' . $RowLookFieldsStyle  . '"><br/>';

        //echo '<input type="text" name="cg_row_look_border_color" maxlength="7" id="cg_row_look_border_width" value="'.$RowViewBorderColor.'" ' . $RowLookFields  . ' ' . $RowLookFieldsStyle  . '><br/>';
        echo "</td>";
        echo "</tr>";


        /*echo "<tr>";
        echo "<td style='padding-left:20px;width:300px;'>";
        echo '<p>Scale pics to full size of last row:</p>';
        echo "</td>";
        echo "<td>";
        echo '<input type="checkbox" name="LastRow" id="LastRow" ' . $LastRow  . ' ' . $RowLookFields  . ' ' . $RowLookFieldsStyle  . '><br/>';
        echo "</td>";
        echo "</tr>";*/
        echo "</table>";
        echo "<br>";
        echo "<hr style='margin-left:170px;' width='545px;'>";
        echo "<br>";
        echo "</div>";

    }

}

echo "</div>";
echo "</div>";

echo <<<HEREDOC

           
            <div id="view2">
HEREDOC;

echo "<table style='background-color:white;margin-left:170px;' width='545px;'>";

echo "<tr><td style='padding-left:20px;width:300px;' colspan='2'>";
echo '<p><br/><b><u>Slider view options</u></b></p>';
echo "</td>";
echo "</tr>";

echo "<tr style='padding-left:20px;'>";
echo "<td style='padding-left:20px;width:300px;'>";
echo '<p>View pictures in a slider:<br/>(Rate and comment is possible)</p>';
echo "</td>";

echo "<td style='padding-left:20px;'>";
echo '<input type="checkbox" name="AllowGalleryScript" ' . $AllowGalleryScript . ' id="AllowGalleryScript"><br/>';
echo "</td>";
echo "</tr>";

echo "<tr style='padding-left:20px;'>";
echo "<td style='padding-left:20px;width:300px;'>";
echo '<p>Link to original image source:</p>';
echo "</td>";

echo "<td style='padding-left:20px;'>";
//echo "source:".$OriginalSourceLinkInSlider;
echo '<input type="checkbox" name="OriginalSourceLinkInSlider" ' . $OriginalSourceLinkInSlider . ' id="OriginalSourceLinkInSlider"><br/>';
echo "</td>";
echo "</tr>";

echo "<tr style='padding-left:20px;'>";
echo "<td style='padding-left:20px;width:300px;'>";
echo '<p>View preview in slider:</p>';
echo "</td>";

echo "<td style='padding-left:20px;'>";
//echo 'Preview'.$PreviewInSlider;
echo '<input type="checkbox" name="PreviewInSlider" ' . $PreviewInSlider . ' id="PreviewInSlider"><br/>';
echo "</td>";
echo "</tr>";

/*

echo "<tr>";
echo "<td style='padding-left:20px;width:300px;'>";
echo '<p>User information appears always in slider:<br/>(If deactivated then by holding left mouse)</p>';
echo "</td>";

echo "<td style='padding-left:20px;'>";
echo '<input type="checkbox" name="ShowAlwaysInfoSlider" ' . $ShowAlwaysInfoSlider . ' id="ShowAlwaysInfoSlider"><br/>';
echo "</td>";
echo "</tr>";*/


echo "<tr><td style='padding-left:20px;width:300px;' colspan='2'>";
echo '<p><br/><b><u>Full size view options</u></p>';
echo "</td>";
echo "</tr>";

echo "<tr style='padding-left:20px;'>";

echo "<td style='padding-left:20px;width:300px;'>";
echo '<p>Show directly in full size</p>';
echo "</td>";

echo "<td style='padding-left:20px;'>";
echo '<input type="checkbox" name="FullSizeImageOutGallery" ' . $FullSizeImageOutGallery . ' id="FullSizeImageOutGallery"><br/>';
echo "</td>";
echo "</tr>";

/*
		echo "<tr style='padding-left:20px;'>";

		echo "<td style='padding-left:20px;width:300px;'>";
		echo '<p>Forward directly to full size image in a new tab</p>';
		echo "</td>";

		echo "<td style='padding-left:20px;'>";
		echo '<input type="checkbox" name="FullSizeImageOutGalleryNewTab" ' . $FullSizeImageOutGalleryNewTab . ' id="FullSizeImageOutGalleryNewTab"><br/>';
		echo "</td>";
		echo "</tr>";
*/

echo "<tr><td style='padding-left:20px;width:300px;' colspan='2'>";
echo '<p><br/><b><u>Single pic view options</u><br/>(Forward to in image view with extra url.<br/>Can be switched from image to image.)</b></p>';
echo "</td>";
echo "</tr>";

echo "<tr style='padding-left:20px;'>";

echo "<td style='padding-left:20px;width:300px;'>";
echo '<p>Single pic view:</p>';
echo "</td>";

echo "<td style='padding-left:20px;'>";
echo '<input type="checkbox" name="SinglePicView" ' . $SinglePicView . ' id="SinglePicView"><br/>';
echo "</td>";



echo "</tr>";

if($ScaleOnly=='checked'){
    $displayNone = 'display:none;';
}
else{
    $displayNone = '';
}

if($ScaleAndCut=='checked'){
    $ScaleOnly = 'checked';
}


echo "<tr style='padding-left:20px;$displayNone'>";



echo "<td style='padding-left:20px;width:300px;'>";
echo '<p>Scale only:  </p>';
echo "</td>";

echo "<td style='padding-left:20px;'>";
echo '<input type="checkbox" name="ScaleWidthGalery" ' . $ScaleOnly . ' id="ScaleWidthGalery"><br/>';
echo "</td>";



echo "</tr>";

echo "<tr style='padding-left:20px;display:none;'>";

echo "<td style='padding-left:20px;width:300px;'>";
echo '<p>Scale and cut:</p>';
echo "</td>";
echo "<td style='padding-left:20px;'>";
echo '<input type="checkbox" name="ScaleSizesGalery" ' . $ScaleAndCut . ' id="ScaleSizesGalery"><br/>';
echo "</td>";

echo "</tr>";

echo "<tr>";
echo "<td style='padding-left:20px;width:240px;'>";
echo '<p>Max pic width in px:</p>';
echo "</td>";
echo "<td style='padding-left:20px;'>";
echo '<input type="text" name="WidthGallery" value="'.$WidthGallery.'" id="ScaleSizesGalery1" maxlength="4"><br/>';
echo "</td>";
echo "</tr>";
echo "<tr style='display:none;'>";
echo "<td style='padding-left:20px;padding-left:20px;width:240px;padding-right:20px' >";
echo '<p>Pic height:</p>';
echo "</td>";
echo "<td style='padding-left:20px;'>";
echo '<input type="text" name="HeightGallery" value="'.$HeightGallery.'" id="ScaleSizesGalery2" maxlength="4" ><br/>';
echo "</td>";
echo "</tr>";
echo "<tr>";
echo "<td style='padding-left:20px;width:240px;'>";
echo '<p>Enable full size link:</p>';
echo "</td>";
echo "<td style='padding-left:20px;' >";
echo '<input type="checkbox" name="FullSize" ' . $FullSize . ' id="FullSize"><br/>';
echo "</td>";
echo "</tr>";


echo "<tr>";

echo "<td style='padding-left:20px;width:240px;'>";
echo '<p>Arrange single pic information:</p>';
echo "</td>";

echo "<td style='padding-left:20px;' >";
if ($checkDataFormOutput){
    //echo "<form method='POST' action='?page=contest-gallery/index.php&option_id=$galeryNR&define_output=true'><input type='submit' value='Single pic info' style='float:right;text-align:center;width:180px;'/></form>";
    echo "<a href = '?page=contest-gallery/index.php&option_id=$galeryNR&define_output=true' >Define single pic info</a>";
}
else{echo 'Information fields in<br/>"Edit upload form"<br/>required';}
echo "</td>";
echo "</tr>";

echo "<tr><td style='padding-left:20px;width:300px;' colspan='2'>";
echo '<p><br/><b><u>Only gallery view</u><br/>';
echo '(Images can not be clicked.<br>Configuration of rating and commenting out of gallery is possible.)</b></p>';
echo "</td>";
echo "</tr>";

echo "<tr style='padding-left:20px;'>";

echo "<td style='padding-left:20px;width:300px;'>";
echo '<p>Only gallery view:</p>';
echo "</td>";

echo "<td style='padding-left:20px;'>";
echo '<input type="checkbox" name="OnlyGalleryView" ' . $OnlyGalleryView . ' id="OnlyGalleryView"><br/>';
echo "</td>";
echo "</tr>";

echo "</table>";
echo <<<HEREDOC
            </div>
            <div id="view3">
HEREDOC;
echo "<table style='background-color:white;margin-left:170px;' width='700px;'>";


echo "<tr>";
echo "<td style='padding-left:20px;width:300px;'>";
echo '<p><strong><u>Gallery name:</u></strong</p>';
echo "</td>";
echo "<td style='padding-left:20px;'>";
echo '<input type="text" id="GalleryName" name="GalleryName" maxlength="100" value="'.$GalleryName1.'">';
echo "</td>";
echo "</tr>";


echo "<tr><td style='padding-left:20px;width:300px;' colspan='2'>";
echo '<p><b><u>Photo contest end options</u></b></p>';
echo "</td>";
echo "</tr>";

echo "<tr>";
echo "<td style='padding-left:20px;width:300px;'>";
echo '<p>End photo contest immediately</p>';
echo "</td>";
echo "<td style='padding-left:20px;'>";
echo '<input type="checkbox" name="ContestEndInstant" id="ContestEndInstant"  ' . @$ContestEndInstant  . '><br/>';
echo "</td>";
echo "</tr>";

echo "<tr>";
echo "<td style='padding-left:20px;width:300px;'>";
echo '<p>Activate photo contest end time:<br/>(To rate images will be not possible anymore.<br/>Does not work for Facebook like button.)</p>';
echo "</td>";
echo "<td style='padding-left:20px;'>";
echo '<input type="checkbox" name="ContestEnd" id="ContestEnd"  ' . @$ContestEnd  . '><br/>';
echo "</td>";
echo "</tr>";

echo "<tr>";
echo "<td style='padding-left:20px;width:300px;'>";
echo '<p>Select last day of photo contest:<br/>(If empty then photo contest is deactivated)</p>';
echo "</td>";
echo "<td style='padding-left:18px;'>";
echo '<input type="text" id="cg_datepicker" id="ContestEndTime" name="ContestEndTime" '.$ContestEndTimeField.'>';
/*echo 'Y<input type="text" name="PicsPerSite" id="PicsPerSite" value="'.$PicsPerSite.'" " maxlength="4" style="width:60px;">&nbsp;';
echo 'M(1-12)<input type="text" name="PicsPerSite" id="PicsPerSite" value="'.$PicsPerSite.'" " maxlength="2" style="width:30px;">&nbsp;';
echo 'D(1-31)<input type="text" name="PicsPerSite" id="PicsPerSite" value="'.$PicsPerSite.'" " maxlength="2" style="width:30px;">&nbsp;<br/>';
echo 'H(0-24)<input type="text" name="PicsPerSite" id="PicsPerSite" value="'.$PicsPerSite.'" " maxlength="2" style="width:30px;">&nbsp;';
echo 'M(1-60)<input type="text" name="PicsPerSite" id="PicsPerSite" value="'.$PicsPerSite.'" " maxlength="2" style="width:30px;">&nbsp;';
//echo 'Minute<input type="text" name="PicsPerSite" id="PicsPerSite" value="'.$PicsPerSite.'" " maxlength="3" style="width:30px;">';*/
echo "</td>";
echo "</tr>";


echo "<tr><td style='padding-left:20px;width:300px;' colspan='2'>";
echo '<p><b><u>Gallery view options</u></b></p>';
echo "</td>";
echo "</tr>";

/*
echo "<tr>";
echo "<td style='padding-left:20px;width:300px;'>";
echo '<p>Random sort:</p>';
echo "</td>";
echo "<td style='padding-left:20px;'>";
echo '<input type="checkbox" name="RandomSort" id="RandomSort" ' . $RandomSort . '><br/>';
echo "</td>";
echo "</tr>";*/


echo "<tr>";
echo "<td style='padding-left:20px;width:300px;'>";
echo "<p>Show permanent vote, comments and info in gallery view:<br/>(You see it by hovering if not activated)</p>";
echo "</td>";
echo "<td style='padding-left:20px;'>";
echo '<input type="checkbox" name="ShowAlways" ' . $selectedShowAlways . '><br/>';
echo "</td>";
echo "</tr>";

echo "<tr style='padding-left:20px;'>";
echo "<td style='padding-left:20px;width:300px;'>";
echo '<p>Info position on gallery image:<br>(Enabled if you select "Show info in gallery"<br>in "Edit upload form" options first)</p>';
echo "</td>";
echo "<td style='padding-left:20px;'>";
echo '<input type="radio" name="TitlePositionGallery" class="TitlePositionGallery" id="TitlePositionGallery" ' . $selectedTitlePositionGalleryLeft . ' value="1"  ' . $enabledTitlePositionGalleryLeft . '>< left &nbsp;&nbsp;&nbsp;';
echo '<input type="radio" name="TitlePositionGallery" class="TitlePositionGallery" id="TitlePositionGallery" ' . $selectedTitlePositionGalleryCenter . ' value="2" ' . $enabledTitlePositionGalleryLeft . '> < center &nbsp;&nbsp;&nbsp;';
echo '<input type="radio" name="TitlePositionGallery" class="TitlePositionGallery" id="TitlePositionGallery" ' . $selectedTitlePositionGalleryRight . ' value="3" ' . $enabledTitlePositionGalleryLeft . '> < right ';
echo "</td>";
echo "</tr>";

/*echo "<tr style='padding-left:20px;'>";
echo "<td style='padding-left:20px;width:300px;'>";
echo '<p><b><u>Image forwarding options</u><br>(available if url field is configured in<br>"Edit upload form")</b></p>';
echo "</td>";
echo "<td style='padding-left:20px;'>";
echo '';
echo "</td>";
echo "</tr>";*/

/*echo "<tr style='padding-left:20px;'>";
echo "<td style='padding-left:20px;width:300px;'>";
echo '<p>Forward to url (available if url field is configured in "Edit upload form"):</p>';
echo "</td>";
echo "<td style='padding-left:20px;'>";
echo '<input type="checkbox" name="ForwardToURL" id="ForwardToURL" ' . @$ForwardToURL . '><br/>';
echo "</td>";
echo "</tr>";

echo "<tr style='padding-left:20px;'>";
echo "<td style='padding-left:20px;width:300px;'>";
echo '<p>Forward from slider:</p>';
echo "</td>";
echo "<td style='padding-left:20px;'>";
echo '<input type="checkbox" name="ForwardFromSlider" id="ForwardFromSlider" ' . @$ForwardFromSlider . '><br/>';
echo "</td>";
echo "</tr>";

echo "<td style='padding-left:20px;width:300px;'>";
echo '<p>Forward from single pic view:</p>';
echo "</td>";
echo "<td style='padding-left:20px;'>";
echo '<input type="checkbox" name="ForwardFromSinglePic" id="ForwardFromSinglePic" ' . @$ForwardFromSinglePic . '><br/>';
echo "</td>";
echo "</tr>";*/

/*echo "<input type='hidden' id='Use_as_URL' name='Use_as_URL' value='".@$Use_as_URL."'>";

echo "<tr style='padding-left:20px;'>";
echo "<td style='padding-left:20px;width:300px;'>";
echo '<p>Forward directly out of gallery:<br/><b>(This option is priorized to any<br>"Single pic options")</b><br></p>';
echo "</td>";
echo "<td style='padding-left:20px;'>";
echo '<input type="checkbox" name="ForwardFromGallery" id="ForwardFromGallery" ' . @$ForwardFromGallery . '><br/>';
echo "</td>";
echo "</tr>";

echo "<tr style='padding-left:20px;'>";


echo "<tr style='padding-left:20px;'>";
echo "<td style='padding-left:20px;width:300px;'>";
echo '<p>Forward in a new window:</p>';
echo "</td>";
echo "<td style='padding-left:20px;'>";
echo '<input type="checkbox" name="ForwardType" id="ForwardType" ' . @$ForwardType . '><br/>';
echo "</td>";
echo "</tr>";*/



echo "<tr style='padding-left:20px;'>";
echo "<td style='padding-left:20px;width:300px;'>";
echo '<p><b><u>Vote options</u></b></p>';
echo "</td>";
echo "<td style='padding-left:20px;'>";
echo '';
echo "</td>";
echo "</tr>";

echo "<tr>";
echo "<td style='padding-left:20px;width:300px;'>";
echo '<p>Allow change rating by administrator (you):<br>After activating and saving this option <br> just go "Back to gallery" and you will <br> be able to change rating of each image.</p>';
echo "</td>";
echo "<td style='padding-left:20px;'>";
echo '<input type="checkbox" name="Manipulate" id="Manipulate" ' . @$Manipulate  . '><br/>';
echo "</td>";
echo "</tr>";

echo "<tr>";
echo "<td style='padding-left:20px;width:300px;'>";
echo '<p>Allow only registered users to vote:<br/>(User have to be registered and logged in<br> to be able to vote – uncheatable)</p>';
echo "</td>";
echo "<td style='padding-left:20px;'>";
echo '<input type="checkbox" name="checkLogin" id="checkLogin" ' . @$checkLogin  . '><br/>';
echo "</td>";
echo "</tr>";

echo "<tr style='padding-left:20px;'>";
echo "<td style='padding-left:20px;width:300px;'>";
echo '<p>Allow vote via 1 star rating:</p>';
echo "</td>";
echo "<td style='padding-left:20px;'>";
echo '<input type="checkbox" name="AllowRating2" id="AllowRating2" ' . $selectedCheckRating2 . '> &nbsp;&nbsp;&nbsp; <a href="?page=contest-gallery/index.php&edit_options=true&option_id='.$galeryNR.'&reset_votes2=true" id="cg_reset_votes">Reset votes of all images</a> <br/>';
echo "</td>";
echo "</tr>";

echo "<tr style='padding-left:20px;'>";
echo "<td style='padding-left:20px;width:300px;'>";
echo '<p>Allow vote via 5 star rating:</p>';
echo "</td>";
echo "<td style='padding-left:20px;'>";
echo '<input type="checkbox" name="AllowRating" id="AllowRating" ' . $selectedCheckRating . '> &nbsp;&nbsp;&nbsp; <a href="?page=contest-gallery/index.php&edit_options=true&option_id='.$galeryNR.'&reset_votes=true" id="cg_reset_votes">Reset votes of all images</a> <br/>';
echo "</td>";
echo "</tr>";

echo "<tr style='padding-left:20px;'>";
echo "<td style='padding-left:20px;width:300px;'>";
echo '<p>Allow vote out of gallery:</p>';
echo "</td>";
echo "<td style='padding-left:20px;'>";
echo '<input type="checkbox" name="RatingOutGallery" id="RatingOutGallery" ' . $selectedRatingOutGallery . '><br/>';
echo "</td>";
echo "</tr>";

echo "<tr style='padding-left:20px;'>";
echo "<td style='padding-left:20px;width:300px;'>";
echo '<p>Rating star position on gallery image:</p>';
echo "</td>";
echo "<td style='padding-left:20px;'>";
echo '<input type="radio" name="RatingPositionGallery" class="RatingPositionGallery" id="RatingPositionGallery" ' . $selectedRatingPositionGalleryLeft . ' value="1"> < left &nbsp;&nbsp;&nbsp;';
echo '<input type="radio" name="RatingPositionGallery" class="RatingPositionGallery" id="RatingPositionGallery" ' . $selectedRatingPositionGalleryCenter . ' value="2"> < center &nbsp;&nbsp;&nbsp;';
echo '<input type="radio" name="RatingPositionGallery" class="RatingPositionGallery" id="RatingPositionGallery" ' . $selectedRatingPositionGalleryRight . ' value="3"> < right ';
echo "</td>";
echo "</tr>";


echo "<tr>";
echo "<td style='padding-left:20px;width:300px;'>";
echo '<p>Hide voting until user voted:</p>';
echo "</td>";
echo "<td style='padding-left:20px;'>";
echo '<input type="checkbox" name="HideUntilVote" id="HideUntilVote"' . @$HideUntilVote  . '><br/>';
echo "</td>";
echo "</tr>";

echo "<tr>";
echo "<td style='padding-left:20px;width:300px;'>";
echo '<p>Votes per user:<br><strong>(empty = no limit)</strong></p>';
echo "</td>";
echo "<td style='padding-left:20px;'>";
echo '<input type="text" name="VotesPerUser" id="VotesPerUser" maxlength="3" value="'.$VotesPerUser.'"> &nbsp;&nbsp;&nbsp; <a href="?page=contest-gallery/index.php&edit_options=true&option_id='.$galeryNR.'&reset_users_votes=true">Reset users votes</a><br/>';
echo "</td>";
echo "</tr>";

echo "<tr>";
echo "<td style='padding-left:20px;width:300px;'>";
echo '<p>Show only users votes:<br/>(User see only his votes not the whole rating)</p>';
echo "</td>";
echo "<td style='padding-left:20px;'>";
echo '<input type="checkbox" name="ShowOnlyUsersVotes" id="ShowOnlyUsersVotes"' . @$ShowOnlyUsersVotes  . '> &nbsp;&nbsp;&nbsp; <a href="?page=contest-gallery/index.php&edit_options=true&option_id='.$galeryNR.'&reset_users_votes=true">Reset users votes</a> <br/>';
echo "</td>";
echo "</tr>";

echo "<tr>";
echo "<td style='padding-left:20px;width:300px;'>";
echo '<p>One vote per picture:</p>';
echo "</td>";
echo "<td style='padding-left:20px;'>";
echo '<input type="checkbox" name="IpBlock"  id="IpBlock" ' . $selectedCheckIp . '> &nbsp;&nbsp;&nbsp; <a href="?page=contest-gallery/index.php&edit_options=true&option_id='.$galeryNR.'&reset_users_votes=true">Reset users votes</a> <br/>';
echo "</td>";
echo "</tr>";



//Facebook Like button options

echo "<tr style='padding-left:20px;'>";
echo "<td style='padding-left:20px;width:300px;'>";
echo '<p><br><b><u>Facebook like button options</u></b></p>';
echo "</td>";
echo "<td style='padding-left:20px;'>";
echo '';
echo "</td>";
echo "</tr>";

echo "<tr style='padding-left:20px;'>";
echo "<td style='padding-left:20px;width:300px;'>";
echo '<p>Vote via Facebook like buttton:</p>';
echo "</td>";
echo "<td style='padding-left:20px;'>";
echo '<input type="checkbox" name="FbLike" id="FbLike" ' . @$selectedCheckFbLike . '><br/>';
echo "</td>";
echo "</tr>";

echo "<tr style='padding-left:20px;'>";
echo "<td style='padding-left:20px;width:300px;'>";
echo '<p>Show Facebook like buttton out of gallery:<br>(Slower browser loading of gallery.<br> Needs more computing power.<br/>Pagination is better then Infinite Scroll<br/>in that case.)</p>';
echo "</td>";
echo "<td style='padding-left:20px;'>";
echo '<input type="checkbox" name="FbLikeGallery" id="FbLikeGallery" ' . @$selectedCheckFbLikeGallery . '><br/>';
echo "</td>";
echo "</tr>";


echo "<tr style='padding-left:20px;'>";
echo "<td style='padding-left:20px;width:300px;'>";
echo '<p>Vote via Facebook like buttton out of gallery:</p>';
echo "</td>";
echo "<td style='padding-left:20px;'>";
echo '<input type="checkbox" name="FbLikeGalleryVote" id="FbLikeGalleryVote" ' . @$selectedCheckFbLikeGalleryVote . '><br/>';
echo "</td>";
echo "</tr>";

echo "<tr>";
echo "<td style='padding-left:20px;' colspan='2'>";
echo 'Go back to gallery URL<br/>';
$FbLikeGoToGalleryLinkPlaceholder = '<a href = "'.site_url().'">Go to gallery</a>';
echo "<input type='text' style='width:580px;font-size:13px;' name='FbLikeGoToGalleryLink' id='FbLikeGoToGalleryLink' maxlength='1000' placeholder='$FbLikeGoToGalleryLinkPlaceholder' value='$FbLikeGoToGalleryLink'>";
echo "<br>(Link of Facebook images page)";
echo "<br>";
echo "<br>";
echo "</td>";
echo "</tr>";

//Facebook Like button options --- ENDE





echo "<tr>";
echo "<td style='padding-left:20px;width:300px;'>";
echo '<p><b><u>Comment Options</u></b></p>';
echo "</td>";
echo "<td style='padding-left:20px;'>";
echo '';
echo "</td>";
echo "</tr>";

echo "<tr>";
echo "<td style='padding-left:20px;width:300px;'>";
echo '<p>Allow comments:</p>';
echo "</td>";
echo "<td style='padding-left:20px;'>";
echo '<input type="checkbox" name="AllowComments"  id="AllowComments"' . $selectedCheckComments . '><br/>';
echo "</td>";
echo "</tr>";


echo "<tr>";
echo "<td style='padding-left:20px;width:300px;'>";
echo '<p>Allow comment out of gallery:</p>';
echo "</td>";
echo "<td style='padding-left:20px;'>";
echo '<input type="checkbox" name="CommentsOutGallery"  id="CommentsOutGallery" ' . $selectedCommentsOutGallery . '><br/>';
echo "</td>";
echo "</tr>";

echo "<tr style='padding-left:20px;'>";
echo "<td style='padding-left:20px;width:300px;'>";
echo '<p>Comments position on gallery image:</p>';
echo "</td>";
echo "<td style='padding-left:20px;'>";
echo '<input type="radio" name="CommentPositionGallery" class="CommentPositionGallery" id="CommentPositionGalleryLeft" ' . $selectedCommentPositionGalleryLeft . '  value="1"> < left &nbsp;&nbsp;&nbsp;';
echo '<input type="radio" name="CommentPositionGallery" class="CommentPositionGallery" id="CommentPositionGalleryCenter" ' . $selectedCommentPositionGalleryCenter . '  value="2"> < center &nbsp;&nbsp;&nbsp;';
echo '<input type="radio" name="CommentPositionGallery" class="CommentPositionGallery" id="CommentPositionGalleryRight" ' . $selectedCommentPositionGalleryRight . '  value="3"> < right ';
echo "</td>";
echo "</tr>";






/*
echo "<tr>";
echo "<td style='padding-left:20px;width:300px;'>";
echo '<p>Allow Fb-Like:</p>';
echo "</td>";
echo "<td style='padding-left:20px;'>";
echo '<input type="checkbox" name="FbLike" ' . $selectedCheckFb  . '><br/>';
echo "</td>";
echo "</tr>"; */








echo "</table>";

echo <<<HEREDOC
 </div>
			   <div id="view4">
HEREDOC;
echo "<table style='background-color:white;' width='700px;'>";
echo "<tr><td style='padding-left:20px;width:300px;'>";
//echo '<input type="text" hidden name="id" value="' . $id . '" method="post" >';
echo '<p><b><u>Upload Options</u></b></p>';
echo "</td>";
echo "</tr>";
echo "<tr>";
echo "<td style='padding-left:20px;width:300px;'>";
echo '<p>Allow only registered users to upload:<br/>';
echo '(User have to be registered and logged in to be able to upload)</p>';
echo "</td>";
echo "<td style='padding-left:20px;'>";
echo '<input type="checkbox" name="RegUserUploadOnly" id="RegUserUploadOnly" ' . @$RegUserUploadOnly  . '><br/>';
echo "</td>";
echo "</tr>";

echo "<tr>";
echo "<td style='padding-left:20px;width:300px;'>";
echo '<p>Show text instead of upload form:</p>';
echo "</td>";
echo "<td style='padding-left:20px;570px;'>";
echo '<textarea id="RegUserUploadOnlyText" type="text" name="RegUserUploadOnlyText" maxlength="65000"  '.$RegUserUploadOnlyStyle.' >'.$RegUserUploadOnlyText.'</textarea><br/>';
echo "</td>";
echo "</tr>";

echo "<tr>";
echo "<td style='padding-left:20px;width:300px;'>";
echo '<p>Automatically activate users images after frontend upload:</p>';
echo "</td>";
echo "<td style='padding-left:20px;'>";
echo '<input type="checkbox" name="ActivateUpload" ' . @$ActivateUpload  . '><br/>';
echo "</td>";
echo "</tr>";


// Restrict Upload for images

// Maximal möglich eingestellter Upload wird ermittelt
$max_post = (int)(ini_get('upload_max_filesize'));

echo "<tr>";
echo "<td style='padding-left:20px;width:300px;'>";
echo '<p>Restrict frontend upload size:</p>';
echo "</td>";
echo "<td style='padding-left:20px;'>";
echo '<input type="checkbox" id="ActivatePostMaxMB" name="ActivatePostMaxMB" ' . @$ActivatePostMaxMB  . '><br/>';
echo "</td>";
echo "</tr>";
echo "<tr>";
echo "<td style='padding-left:20px;width:300px;'>";
echo '<p>Maximum upload size in MB:<br/>(If empty then no restrictions)<br/>';
echo "Your PHP configuration: <strong>$max_post MB</strong><br/>(Will be always prefered)</p>";
echo "</td>";
echo "<td style='padding-left:20px;'>";
echo '<input id="PostMaxMB" type="text" name="PostMaxMB" value="'.$PostMaxMB.'" maxlength="20" '.$PostMaxMBdisabled.' style="width:190px;" ><br/>';
echo "</td>";
echo "</tr>";

// Restrict Upload for images --- ENDE



// Activate Bulk Upload for images

echo "<tr>";
echo "<td style='padding-left:20px;width:300px;'>";
echo '<p>Activate bulk upload in frontend:</p>';
echo "</td>";
echo "<td style='padding-left:20px;'>";
echo '<input type="checkbox" id="ActivateBulkUpload" name="ActivateBulkUpload" ' . @$ActivateBulkUpload  . '><br/>';
echo "</td>";
echo "</tr>";
echo "<tr>";
echo "<td style='padding-left:20px;width:300px;'>";
echo '<p>Maximum number of images for bulk upload<br/>(If empty then no restrictions)</p>';
echo "</td>";
echo "<td style='padding-left:20px;'>";
echo '<input id="BulkUploadQuantity" type="text" name="BulkUploadQuantity" value="'.$BulkUploadQuantity.'" maxlength="20" '.$BulkUploadQuantityDisabled.'  style="width:190px;" ><br/>';
echo "</td>";
echo "</tr>";
echo "<tr>";
echo "<td style='padding-left:20px;width:300px;'>";
echo '<p>Minimum number of images for bulk upload (If empty then no restrictions)</p>';
echo "</td>";
echo "<td style='padding-left:20px;'>";
echo '<input id="BulkUploadMinQuantity" type="text" name="BulkUploadMinQuantity" value="'.$BulkUploadMinQuantity.'" maxlength="20" '.$BulkUploadMinQuantityDisabled.'  style="width:190px;" ><br/>';
echo "</td>";
echo "</tr>";

// Activate Bulk Upload for images --- ENDE


echo "<tr>";
echo "<td style='padding-left:20px;width:300px;'>";
echo '<p>Restrict resolution<br> for uploaded JPG pics</p>';
echo "</td>";
echo "<td style='padding-left:20px;'>";
echo "<input id='allowRESjpg' type='checkbox' name='MaxResJPGon' $MaxResJPGon >";
echo '<div id="cg_questionJPG" style="display:inline;"><p style="font-size:18px;display:inline;">&nbsp;<a><b>?</b></a></p></div>';
echo "<div id='cg_answerJPG' style='position:absolute;margin-left:35px;width:460px;background-color:white;border:1px solid;padding:5px;display:none;'>";
echo "This allows you to restrict the resolution of the pictures which will be uploaded in frontend. It depends on your web hosting provider how big resolution ca be be for uploaded pics.";
echo " If your webhosting packet is not so powerfull then you should use this restriction.</div>";
echo "</td>";
echo "</tr>";
echo "<tr>";
echo "<td style='padding-left:20px;width:300px;'>";
echo '<p>Resolution width for JPGs in pixel:<br/>(If empty then no restrictions)</p>';
echo "</td>";
echo "<td style='padding-left:20px;'>";
echo '<input id="MaxResJPGwidth" type="text" name="MaxResJPGwidth" value="'.$MaxResJPGwidth.'" maxlength="20" '.$MaxResJPGwidthOnDisabled.'  style="width:190px;" ><br/>';
echo "</td>";
echo "</tr>";
echo "<tr>";
echo "<td style='padding-left:20px;width:300px;'>";
echo '<p>Resolution height for JPGs in pixel:<br/>(If empty then no restrictions)</p>';
echo "</td>";
echo "<td style='padding-left:20px;'>";
echo '<input id="MaxResJPGheight" type="text" name="MaxResJPGheight" value="'.$MaxResJPGheight.'" maxlength="20" '.$MaxResJPGheightOnDisabled.'  style="width:190px;" ><br/>';
echo "</td>";
echo "</tr>";
echo "<tr>";
echo "<td style='padding-left:20px;width:300px;'>";
echo '<p>Restrict resolution<br> for uploaded PNG pics</p>';
echo "</td>";
echo "<td style='padding-left:20px;'>";
echo "<input id='allowRESpng' type='checkbox' name='MaxResPNGon' $MaxResPNGon >";
echo '<div id="cg_questionPNG" style="display:inline;"><p style="font-size:18px;display:inline;">&nbsp;<a><b>?</b></a></p></div>';
echo "<div id='cg_answerPNG' style='position:absolute;margin-left:35px;width:460px;background-color:white;border:1px solid;padding:5px;display:none;'>";
echo "This allows you to restrict the resolution of the pictures which will be uploaded in frontend. It depends on your web hosting provider how big resolution ca be be for uploaded pics.";
echo " If your webhosting packet is not so powerfull then you should use this restriction.</div>";
echo "</td>";
echo "</tr>";
echo "<tr>";
echo "<td style='padding-left:20px;width:300px;'>";
echo '<p>Resolution width for PNGs in pixel:<br/>(If empty then no restrictions)</p>';
echo "</td>";
echo "<td style='padding-left:20px;'>";
echo '<input id="MaxResPNGwidth" type="text" name="MaxResPNGwidth" value="'.$MaxResPNGwidth.'" maxlength="20" '.$MaxResPNGwidthOnDisabled.'  style="width:190px;" ><br/>';
echo "</td>";
echo "</tr>";
echo "<tr>";
echo "<td style='padding-left:20px;width:300px;'>";
echo '<p>Resolution height for PNGs in pixel:<br/>(If empty then no restrictions)</p>';
echo "</td>";
echo "<td style='padding-left:20px;'>";
echo '<input id="MaxResPNGheight" type="text" name="MaxResPNGheight" value="'.$MaxResPNGheight.'" maxlength="20"  '.$MaxResPNGheightOnDisabled.'  style="width:190px;" ><br/>';
echo "</td>";
echo "</tr>";
echo "<tr>";
echo "<td style='padding-left:20px;width:300px;'>";
echo '<p>Restrict resolution<br> for uploaded GIF pics</p>';
echo "</td>";
echo "<td style='padding-left:20px;'>";
echo "<input id='allowRESgif' type='checkbox' name='MaxResGIFon' $MaxResGIFon >";
echo '<div id="cg_questionGIF" style="display:inline;"><p style="font-size:18px;display:inline;">&nbsp;<a><b>?</b></a></p></div>';
echo "<div id='cg_answerGIF' style='position:absolute;margin-left:35px;width:460px;background-color:white;border:1px solid;padding:5px;display:none;'>";
echo "This allows you to restrict the resolution of the pictures which will be uploaded in frontend. It depends on your web hosting provider how big resolution ca be be for uploaded pics.";
echo " If your webhosting packet is not so powerfull then you should use this restriction.</div>";
echo "</td>";
echo "</tr>";
echo "<tr>";
echo "<td style='padding-left:20px;width:300px;'>";
echo '<p>Resolution width for GIFs in pixel:<br/>(If empty then no restrictions)</p>';
echo "</td>";
echo "<td style='padding-left:20px;'>";
echo '<input id="MaxResGIFwidth" type="text" name="MaxResGIFwidth" value="'.$MaxResGIFwidth.'" maxlength="20" '.$MaxResGIFwidthOnDisabled.'  style="width:190px;"><br/>';
echo "</td>";
echo "</tr>";
echo "<tr>";
echo "<td style='padding-left:20px;width:300px;'>";
echo '<p>Resolution height for GIFs in pixel:<br/>(If empty then no restrictions)</p>';
echo "</td>";
echo "<td style='padding-left:20px;'>";
echo '<input id="MaxResGIFheight" type="text" name="MaxResGIFheight" value="'.$MaxResGIFheight.'" maxlength="20" '.$MaxResGIFheightOnDisabled.'  style="width:190px;"><br/>';
echo "</td>";
echo "</tr>";
echo "<tr><td style='padding-left:20px;width:300px;padding-right:65px;' colspan='2'>";
echo '<br><hr><br>';
echo "</td>";
echo "</tr>";
echo "<tr>";
echo "<td style='padding-left:20px;width:300px;'>";
echo '<p>Forward to another page after upload:</p>';
echo "</td>";
echo "<td style='padding-left:20px;'>";
echo "<input id='forward' type='checkbox' name='forward' $ForwardUploadURL >";
echo "</td>";
echo "</tr>";
echo "<tr>";
echo "<td style='padding-left:20px;width:300px;'>";
echo '<p>Forward to URL:<br/>(HTML tags can be inserted)</p>';
echo "</td>";
echo "<td style='padding-left:20px;width:570px;'>";
echo '<textarea id="forward_url" type="text" name="forward_url" maxlength="999" '.$forward_url_disabled.'>'.$Forward_URL.'</textarea><br/>';
echo "</td>";
echo "</tr>";

echo "<tr><td style='padding-left:20px;width:300px;padding-right:65px;' colspan='2'>";
echo '<br>';
echo "</td>";
echo "</tr>";

echo "<tr>";
echo "<td style='padding-left:20px;width:300px;'>";
echo '<p>Confirmation text on same page after upload:</p>';
echo "</td>";
echo "<td style='padding-left:20px;'>";
echo "<input id='cg_confirm_text' type='checkbox' name='cg_confirm_text' $ForwardUploadConf >";
echo "</td>";
echo "</tr>";


echo "<tr>";

echo "<td style='padding-left:20px;width:300px;'>";
echo '<p>Confirmaiton Text after Upload:<br/>(HTML tags can be inserted)</p>';
echo "</td>";
echo "<td style='padding-left:20px;570px;'>";
echo '<textarea id="confirmation_text" type="text" name="confirmation_text" maxlength="65000" '.$Confirmation_Text_Disabled.' >'.$Confirmation_Text.'</textarea><br/>';
echo "</td>";
echo "</tr>";
echo "<tr><td style='padding-left:20px;width:300px;padding-right:65px;' colspan='2'>";
echo '<br><hr><br>';
echo "</td>";
echo "<tr>";
echo "<td style='padding-left:20px;width:300px;'>";
echo '<p>Inform admin after upload in frontend:<br/>(Use <strong>$info$</strong> in the information editor<br/>below if you like to attach user info)</p>';
echo "</td>";
echo "<td style='padding-left:20px;'>";
echo "<input id='InformAdmin' type='checkbox' name='InformAdmin' $InformAdmin >";
echo "</td>";
echo "</tr>";
echo "<tr><td style='padding-left:20px;width:733px;padding-right:65px;' colspan='2'>";
// Wenn aktiviert werden die User beim Activaten benachrichtigt
/*echo "<div>";
echo "<br/>";
echo '<input type="text" hidden name="id" value="' . @$id . '" method="post" >';
echo 'Inform users when activate pictures:';
echo '&nbsp;&nbsp;<input type="checkbox" name="inform"  value="1" '.$checkedInform.'><br/>';
echo "</div>";*/
// Absender Feld
echo "<div>";
echo "<br/>";
echo 'Addressor:<br/>';
echo '<input type="text" name="from" value="'.$selectSQLemailAdmin->Admin.'" size="100" maxlength="110" ><br/>';
echo "</div>";

// Admin Mail
echo "<div>";
echo "<br/>";
echo 'Admin mail:<br/>';
echo '<input type="text" name="AdminMail" value="'.$selectSQLemailAdmin->AdminMail.'" size="100" maxlength="110"><br/>';
echo "</div>";

// Reply Feld
echo "<div>";
echo "<br/>";
echo 'Reply mail:<br/>';
echo '<input type="text" name="reply" value="'.$selectSQLemailAdmin->Reply.'" size="100" maxlength="110"><br/>';
echo "</div>";

// CC Feld
echo "<div>";
echo "<br/>";
echo 'Cc mail:<br/>';
echo '<small>Sending to multiple recipients example (mail1@example.com; mail2@example.com; mail3@example.com)</small><br>';
echo '<input type="text" name="cc" value="'.$selectSQLemailAdmin->CC.'" size="100" maxlength="110"><br/>';
echo "</div>";


// BCC Feld
echo "<div>";
echo "<br/>";
echo 'Bcc mail:<br/>';
echo '<small>Sending to multiple recipients example (mail1@example.com; mail2@example.com; mail3@example.com)</small><br>';
echo '<input type="text" name="bcc" value="'.$selectSQLemailAdmin->BCC.'" size="100" maxlength="110"><br/>';
echo "</div>";

// Header Feld
echo "<div>";
echo "<br/>";
echo "<div id='answerUrl' style='position:absolute;margin-left:55px;width:200px;background-color:white;border:1px solid;padding:5px;display:none;'>Fill in this field the url of the ";
echo "site where you inserted the short code of this gallery.</div>";
echo 'Subject:<br/>';
echo '<input type="text" name="header" value="'.$selectSQLemailAdmin->Header.'" size="100" maxlength="110"><br/>';
echo "</div>";


// URL Feld
/*
echo "<div style='position:fix;'>";
echo "<br/>";
echo "<div id='answerLink' style='position:absolute;margin-left:315px;width:440px;background-color:white;border:1px solid;padding:5px;display:none;'>";
echo "You have to fill the url in the field abovve where you inserted the shortcode of this gallery. Then you have to put this variable in the editor. If user has an e-mail he will and inform user option is activated";
echo "then user will receive the url of their image which have been activated. Test it.</div>";
echo '<div id="questionUrl" style="display:inline;">Url: <a><b>?</b></a></div><br/>';
echo '<input type="text" name="url" value="'.$selectSQLemailAdmin->URL.'" size="112" maxlength="110" '.@$AllowGalleryScript.' ><br/>';
//echo $inputUrlLink;
echo 'Put this variable in the editor: <b>$url$</b> &nbsp; <div  id="questionLink" style="display:inline;width:15px;height:18px;" ><a><b>?</b></a></div>';
echo "</div>";
echo "<div>";
echo "<br>";
echo "</div>";		*/

echo "<br/>";


// TinyMCE Editor
echo "<div style=''>";


$editor_id = 'editpost';



wp_editor( $ContentAdminMail, $editor_id,  $settings);
echo "</div>";

// Speichern Feld
echo "<div>";
echo "<br/>";
echo '</div>';
echo "</td>";
echo "</table>";
echo "</div>";


echo <<<HEREDOC
	<div id="view5">
HEREDOC;

echo "<table style='background-color:white;' width='884px;'>";

echo "<tr>";
echo "<td style='padding-left:20px;width:300px;'>";
echo '<p><strong><u>Registration options</u></strong></p>';
echo "</td>";
echo "<td style='padding-left:20px;570px;'>";
echo "</td>";
echo "</tr>";

echo "</table>";



echo "<table style='background-color:white;' width='884px;'>";



echo "<tr>";
echo "<td style='padding-left:20px;width:300px;'>";
echo '<p>Confirmation text after registration:</p>';
echo "</td>";
echo "<td style='padding-left:20px;570px;'>";
echo '<textarea id="ForwardAfterRegText" type="text" name="ForwardAfterRegText" maxlength="65000" style="width:510px;height:100px;" >'.$ForwardAfterRegText.'</textarea><br/>';
echo "</td>";
echo "</tr>";

echo "<tr>";
echo "<td style='padding-left:20px;width:300px;'>";
echo '<p>Text after e-mail confirmation:</p>';
echo "</td>";
echo "<td style='padding-left:20px;570px;'>";
echo '<textarea id="TextAfterEmailConfirmation" type="text" name="TextAfterEmailConfirmation" maxlength="65000" style="width:510px;height:100px;" >'.$TextAfterEmailConfirmation.'</textarea><br/>';
echo "</td>";
echo "</tr>";

echo "</table>";

echo  "<br/>";
echo  "<hr/>";
echo "<div style='padding-left:20px;'>";
echo "<p></p>";
echo "</div>";

echo "<div style='padding-left:20px;'>";
echo "<br/>";
echo '<strong><u>Confirmation mail options</u></strong><br/>';
echo "</div>";

// Absender Feld
echo "<div style='padding-left:20px;'>";
echo "<br/>";
echo 'Addressor:<br/>';
echo '<input type="text" name="RegMailAddressor" value="'.$RegMailAddressor.'" size="120" maxlength="110" ><br/>';
echo "</div>";

// Reply Feld
echo "<div style='padding-left:20px;'>";
echo "<br/>";
echo 'Reply mail:<br/>';
echo '<input type="text" name="RegMailReply" value="'.$RegMailReply.'" size="120" maxlength="200"><br/>';
echo "</div>";

// Subject Feld
echo "<div style='padding-left:20px;'>";
echo "<br/>";
echo "<div id='answerUrl' style='position:absolute;margin-left:55px;width:200px;background-color:white;border:1px solid;padding:5px;display:none;'>Fill in this field the url of the ";
echo "site where you inserted the short code of this gallery.</div>";
echo 'Subject:<br/>';
echo '<input type="text" name="RegMailSubject" value="'.$RegMailSubject.'" size="120" maxlength="200"><br/>';
echo "</div>";

echo "<br/>";


// TinyMCE Editor
echo "<div style='padding-left:20px;padding-right:20px;'>";


$editor_id = 'TextEmailConfirmation';


wp_editor( $TextEmailConfirmation, $editor_id, $settings);
echo "</div>";

// Speichern Feld
echo "<div>";
echo "<br/>";
echo '</div>';

echo "</div>";
echo <<<HEREDOC
	<div id="view6">
HEREDOC;

echo "<table style='background-color:white;' width='884px;'>";

echo "<tr>";
echo "<td style='padding-left:20px;width:300px;'>";
echo '<p>Forward to another page after login:</p>';
echo "</td>";
echo "<td style='padding-left:20px;'>";
echo "<input id='ForwardAfterLoginUrlCheck' type='checkbox' name='ForwardAfterLoginUrlCheck' $ForwardAfterLoginUrlCheck >";
echo "</td>";
echo "</tr>";
echo "<tr>";
echo "<td style='padding-left:20px;width:300px;'>";
echo '<p>Forward to URL:<br/>(HTML tags can be inserted)</p>';
echo "</td>";
echo "<td style='padding-left:20px;width:570px;'>";
echo '<textarea id="ForwardAfterLoginUrl" type="text" name="ForwardAfterLoginUrl" maxlength="999" '.$ForwardAfterLoginUrlStyle.'>'.$ForwardAfterLoginUrl.'</textarea><br/>';
echo "</td>";
echo "</tr>";

echo "<tr><td style='padding-left:20px;width:300px;padding-right:65px;' colspan='2'>";
echo '<br>';
echo "</td>";
echo "</tr>";

echo "<tr>";
echo "<td style='padding-left:20px;width:300px;'>";
echo '<p>Confirmation text on same site after upload:</p>';
echo "</td>";
echo "<td style='padding-left:20px;'>";
echo "<input id='ForwardAfterLoginTextCheck' type='checkbox' name='ForwardAfterLoginTextCheck' $ForwardAfterLoginTextCheck >";
echo "</td>";
echo "</tr>";
echo "<tr>";
echo "<td style='padding-left:20px;width:300px;'>";
echo '<p>Confirmaiton Text after Upload:<br/>(HTML tags can be inserted)</p>';
echo "</td>";
echo "<td style='padding-left:20px;570px;'>";
echo '<textarea id="ForwardAfterLoginText" type="text" name="ForwardAfterLoginText" maxlength="65000"  '.$ForwardAfterLoginTextStyle.' >'.$ForwardAfterLoginText.'</textarea><br/>';
echo "</td>";
echo "</tr>";



echo "</table>";

echo "</div>";


echo <<<HEREDOC
	<div id="view7">
HEREDOC;

echo "<div style='padding-left:20px;padding-right:20px;'>";
echo "<br/>";
//echo '<input type="text" hidden name="id" value="' . @$id . '" method="post" >';
echo '<h2>Create e-mail field in "Edit upload form" to send this confirmation e-mail after an upload.
After an e-mail address is confirmed this e-mail will be not send anymore.<br>
       </h2>';
echo "<br/>";
echo "<p><strong>Use this shortcode on the confirmation page</strong>: <br>[cg_mail_confirm id='$GalleryID']</p>";
echo "<br/>";
echo "</div>";
echo "<div style='padding-left:20px;padding-right:20px;'>";
echo "<br/>";
//echo '<input type="text" hidden name="id" value="' . @$id . '" method="post" >';
echo '<strong>Activate this confirmation e-mail:</strong>';
echo '&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" name="mConfirmSendConfirm"  value="1" '.$mConfirmSendConfirm.'><br/>';
echo "<br/>";
echo "</div>";
// Reply Feld
echo "<div style='padding-left:20px;'>";
echo "<table>";
echo "<tr>";
echo "<td style='width:190px;'>";
echo '<p>Text after e-mail confirmation:</p>';
echo "</td>";
echo "<td style='padding-left:35px;570px;'>";
echo '<textarea id="mConfirmConfirmationText" type="text" name="mConfirmConfirmationText" maxlength="65000" style="width:607px;height:100px;" >'.$selectSQLmailConfirmation->ConfirmationText.'</textarea><br/>';
echo "</td>";
echo "</tr>";
echo "</table>";
echo "</div>";
echo  "<br/>";
echo  "<hr/>";
// Absender Feld
echo "<div style='padding-left:20px;'>";
echo "<br/>";
echo 'Addressor:<br/>';
echo '<input type="text" name="mConfirmAdmin" value="'.$selectSQLmailConfirmation->Admin.'" size="120" maxlength="200" ><br/>';
echo "</div>";

// Reply Feld
echo "<div style='padding-left:20px;'>";
echo "<br/>";
echo 'Reply mail:<br/>';
echo '<input type="text" name="mConfirmReply" value="'.$selectSQLmailConfirmation->Reply.'" size="120" maxlength="200"><br/>';
echo "</div>";


// CC Feld
echo "<div style='padding-left:20px;'>";
echo "<br/>";
echo 'Cc mail:<br/>';
echo '<small>Sending to multiple recipients example (mail1@example.com; mail2@example.com; mail3@example.com)</small><br>';
echo '<input type="text" name="mConfirmCC" value="'.$selectSQLmailConfirmation->CC.'" size="120" maxlength="200"><br/>';
echo "</div>";


// BCC Feld
echo "<div style='padding-left:20px;'>";
echo "<br/>";
echo 'Bcc mail:<br/>';
echo '<small>Sending to multiple recipients example (mail1@example.com; mail2@example.com; mail3@example.com)</small><br>';
echo '<input type="text" name="mConfirmBCC" value="'.$selectSQLmailConfirmation->BCC.'" size="120" maxlength="200"><br/>';
echo "</div>";

// Header Feld
echo "<div style='padding-left:20px;'>";
echo "<br/>";
echo "<div id='answerUrl' style='position:absolute;margin-left:55px;width:200px;background-color:white;border:1px solid;padding:5px;display:none;'>Fill in this field the url of the ";
echo "site where you inserted the short code of this gallery.</div>";
echo 'Subject:<br/>';
echo '<input type="text" name="mConfirmHeader" value="'.$selectSQLmailConfirmation->Header.'" size="120" maxlength="200"><br/>';
echo "</div>";


// URL Feld
echo "<div style='padding-left:20px;'>";
echo "<br/>";
echo "<div id='answerLink' style='position:absolute;margin-left:315px;width:440px;background-color:white;border:1px solid;padding:5px;display:none;'>";
echo "You have to fill the url in the field abovve where you inserted the shortcode of this gallery. Then you have to put this variable in the editor. If user has an e-mail he will and inform user option is activated";
echo "then user will receive the url of their image which have been activated. Test it.</div>";
echo '<div id="questionUrl" style="display:inline;">URL to confirmation page: URL of same page where the shortcode [cg_mail_confirm id="'.$GalleryID.'"] is inserted</div><br/>';
echo '<input type="text" name="mConfirmURL" placeholder="'.get_site_url().'" value="'.$selectSQLmailConfirmation->URL.'" size="120" maxlength="200" ><br/>';
//echo $inputUrlLink;
echo 'Put this variable in the editor: <b>$url$</b><br>(Link to confirmation page will appear in the e-mail)';
echo "</div>";
echo "<div>";
echo "<br>";
echo "</div>";

echo "<br/>";





// TinyMCE Editor
echo "<div style='padding-left:20px;padding-right:20px;'>";

$editor_id = 'mConfirmContent';

wp_editor( $selectSQLmailConfirmation->Content, $editor_id,  $settings);

echo "</div>";

// Speichern Feld
echo "<div>";
echo "<br/>";
echo '</div>';

echo "</div>";
echo <<<HEREDOC
	<div id="view8">
HEREDOC;
echo "<div style='padding-left:20px;padding-right:20px;'>";
echo "<br/>";
//echo '<input type="text" hidden name="id" value="' . @$id . '" method="post" >';
echo '<h2>Create e-mail field in "Edit upload form" to inform users when activating their image.</h2>';
echo "<br/>";
echo "<br/>";
echo "</div>";
echo "<div style='padding-left:20px;padding-right:20px;'>";
echo "<br/>";
//echo '<input type="text" hidden name="id" value="' . @$id . '" method="post" >';
echo 'Send this activation e-mail when activating user images:';
echo '&nbsp;&nbsp;<input type="checkbox" name="InformUsers"  value="1" '.$checkInform.'><br/>';
echo "</div>";
echo  "<br/>";
echo  "<hr/>";
// Absender Feld
echo "<div style='padding-left:20px;'>";
echo "<br/>";
echo 'Addressor:<br/>';
echo '<input type="text" name="from_user_mail" value="'.$selectSQLemail->Admin.'" size="120" maxlength="200" ><br/>';
echo "</div>";

// Reply Feld
echo "<div style='padding-left:20px;'>";
echo "<br/>";
echo 'Reply mail:<br/>';
echo '<input type="text" name="reply_user_mail" value="'.$selectSQLemail->Reply.'" size="120" maxlength="200"><br/>';
echo "</div>";

// CC Feld
echo "<div style='padding-left:20px;'>";
echo "<br/>";
echo 'Cc mail:<br/>';
echo '<small>Sending to multiple recipients example (mail1@example.com; mail2@example.com; mail3@example.com)</small><br>';
echo '<input type="text" name="cc_user_mail" value="'.$selectSQLemail->CC.'" size="120" maxlength="200"><br/>';
echo "</div>";


// BCC Feld
echo "<div style='padding-left:20px;'>";
echo "<br/>";
echo 'Bcc mail:<br/>';
echo '<small>Sending to multiple recipients example (mail1@example.com; mail2@example.com; mail3@example.com)</small><br>';
echo '<input type="text" name="bcc_user_mail" value="'.$selectSQLemail->BCC.'" size="120" maxlength="200"><br/>';
echo "</div>";

// Header Feld
echo "<div style='padding-left:20px;'>";
echo "<br/>";
echo "<div id='answerUrl' style='position:absolute;margin-left:55px;width:200px;background-color:white;border:1px solid;padding:5px;display:none;'>Fill in this field the url of the ";
echo "site where you inserted the short code of this gallery.</div>";
echo 'Subject:<br/>';
echo '<input type="text" name="header_user_mail" value="'.$selectSQLemail->Header.'" size="120" maxlength="200"><br/>';
echo "</div>";


// URL Feld
echo "<div style='padding-left:20px;position:fix;'>";
echo "<br/>";
echo "<div id='answerLink' style='position:absolute;margin-left:315px;width:440px;background-color:white;border:1px solid;padding:5px;display:none;'>";
echo "You have to fill the url in the field abovve where you inserted the shortcode of this gallery. Then you have to put this variable in the editor. If user has an e-mail he will and inform user option is activated";
echo "then user will receive the url of their image which have been activated. Test it.</div>";
echo '<div id="questionUrl" style="display:inline;">URL: (URL of same page where shortcode [cg_gallery id="'.$GalleryID.'"] of this gallery is inserted)</div><br/>';
echo '<input type="text" name="url_user_mail" placeholder="'.get_site_url().'" value="'.$selectSQLemail->URL.'" size="120" maxlength="200" ><br/>';
//echo $inputUrlLink;
echo 'Put this variable in the editor: <b>$url$</b><br>(Link to users image in confirmation mail will appear when the image is activated)';
echo "</div>";
echo "<div>";
echo "<br>";
echo "</div>";

echo "<br/>";


// TinyMCE Editor
echo "<div style='padding-left:20px;padding-right:20px;'>";

$editor_id = 'cgEmailImageActivating';

wp_editor( $contentUserMail, $editor_id,  $settings);
echo "</div>";



// Speichern Feld
echo "<div>";
echo "<br/>";
echo '</div>';

echo "</div>";

/*
//echo <<<HEREDOC
//	<div id="view9" style="position:relative;">
//HEREDOC;
/*
// Wenn aktiviert werden die User beim Activaten benachrichtigt
echo "<div style='padding-left:20px;padding-right:20px;'>";
echo "<br/>";
//echo '<input type="text" hidden name="id" value="' . @$id . '" method="post" >';
echo '<h2>Send an e-mail to all users of this gallery with activated image</h2>If an e-mail has several images only one e-mail will be send. No spam :)';
echo "</div>";
// Wenn aktiviert werden die User beim Activaten benachrichtigt
echo "<div style='padding-left:20px;padding-right:20px;'>";
echo  "<br/>";echo  "<br/>";
echo 'Send also e-mail to users who\'s images is not activated: &nbsp;&nbsp;<input type="checkbox" name="mGallerySendToImageOff"  value="1" '.$mGallerySendToImageOff.'>';
echo "</div>";
// Wenn aktiviert werden die User beim Activaten benachrichtigt
echo "<div style='padding-left:20px;padding-right:20px;'>";
echo  "<br/>";
echo 'Send also e-mail to users who\'s email is not confirmed: &nbsp;&nbsp;<input type="checkbox" name="mGallerySendToNotConfirmedUsers"  value="1" '.$mGallerySendToNotConfirmedUsers.'>';
echo "</div>";
echo  "<br/>";
echo  "<hr/>";
// Absender Feld
echo "<div style='padding-left:20px;display:inline;float:left;width:450px;'>";
echo "<br/>";
echo 'Addressor:<br/>';
echo '<input type="text" name="mGalleryAdmin" value="'.$selectSQLmailGallery->Admin.'" size="60" maxlength="200" ><br/>';
echo "</div>";

// Reply Feld
echo "<div style='padding-left:20px;display:inline;float:left;width:450px;'>";
echo "<br/>";
echo 'Reply mail:<br/>';
echo '<input type="text" name="mGalleryReply" value="'.$selectSQLmailGallery->Reply.'" size="60" maxlength="200"><br/>';
echo "</div>";

// CC Feld
echo "<div style='padding-left:20px;display:inline;float:left;width:450px;'>";
echo "<br/>";
echo 'Cc mail:<br/>';
echo '<input type="text" name="mGalleryCC" value="'.$selectSQLmailGallery->CC.'" size="60" maxlength="200"><br/>';
echo "</div>";


// BCC Feld
echo "<div style='padding-left:20px;display:inline;float:left;width:450px;'>";
echo "<br/>";
echo 'Bcc mail:<br/>';
echo '<input type="text" name="mGalleryBCC" value="'.$selectSQLmailGallery->BCC.'" size="60" maxlength="200"><br/>';
echo "</div>";

// Blacklist
echo "<div style='padding-left:20px;display:inline;float:right;height:280px;width:400px;position:absolute;left:480px;top: 197px;'>";
echo "<br/>";
echo 'Blacklist:<br/>';
echo '<textarea name="mGalleryBlacklist" style="height:236px;width:354px;">'.$selectSQLmailGallery->Blacklist.'</textarea>';
echo "</div>";

// Header Feld
echo "<div style='padding-left:20px;clear:both;'>";
echo "<br/>";
echo "<div id='answerUrl' style='position:absolute;margin-left:55px;width:200px;background-color:white;border:1px solid;padding:5px;display:none;'>Fill in this field the url of the ";
echo "site where you inserted the short code of this gallery.</div>";
echo 'Subject:<br/>';
echo '<input type="text" name="mGalleryHeader" value="'.$selectSQLmailGallery->Header.'" size="120" maxlength="200"><br/>';
echo "</div>";

echo "<br/>";


// TinyMCE Editor
echo "<div style='padding-left:20px;padding-right:20px;'>";

$editor_id = 'mGalleryContent';

wp_editor( $selectSQLmailGallery->Content, $editor_id,  $settings);
echo "</div>";

// TinyMCE Editor
echo "<div style='padding-left:735px;padding-right:20px;'>";

echo '<p><input type="button" value="Send e-mail" style="text-align:center;width:120px;" /></p>';

echo "</div>";
// TinyMCE Editor
echo "<div style='margin-left:20px;margin-right:18px;padding-left:20px;padding-right:20px;border:1px solid #ddd;'>";

echo '<p style="text-align:center;">No e-mails were send so far</p>';

echo "</div>";

// Speichern Feld
echo "<div>";
echo "<br/>";
echo '</div>';

echo "</div>";*/



echo <<<HEREDOC
 </div>
   


            </div>
HEREDOC;

echo '<p style="padding-left:857px;"><input name="changeSize" type="submit" value="Save" style="text-align:center;width:80px;" /></p>';

echo "</form>";

?>