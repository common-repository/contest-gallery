<?php

function cg_update_fb_like_gallery($i){

// OPTIONAL FUNC

global $wpdb;


$tablename_options = $wpdb->prefix . "$i"."contest_gal1ery_options";
$tablename = $wpdb->prefix . "$i"."contest_gal1ery";


// Alle Gallery IDs auswählen um entsprechende Ordner auswählen zu können

$getAllOptionIDs = $wpdb->get_results( "SELECT id FROM $tablename_options");

foreach($getAllOptionIDs as $optionID){

    $GalleryID = $optionID->id;

    // Alle Bilder die Aktiv sind sollen für den Facebook button eine eigene HTML erhalten
    $picsSQL = $wpdb->get_results( "SELECT Timestamp, NamePic FROM $tablename WHERE GalleryID = '$GalleryID' ORDER BY rowid DESC");

    // Größe der Bilder bei ThumbAnsicht (gewöhnliche Ansicht mit Bewertung)
    $uploadFolder = wp_upload_dir();
    $urlSource = site_url();
    $blog_title = get_bloginfo();


    foreach($picsSQL as $value12){


        //$id = $value12->id;
        //$rowid = $value12->rowid;
        $Timestamp = $value12->Timestamp;
        $NamePic = $value12->NamePic;
        $ImgType = $value12->ImgType;
        $WpUpload = $value12->WpUpload;
        //$rating = $value12->Rating;
        //$countR = $value12->CountR;
        //$countC = $value12->CountC;

        $fbImgSrc = wp_get_attachment_image_src($WpUpload, 'large');
        $fbImgSrc = $fbImgSrc[0];

        $dirHTML = $uploadFolder['basedir'].'/contest-gallery/gallery-id-'.$GalleryID.'/'.$Timestamp."_".$NamePic."413.html";

        if(!file_exists($dirHTML)){

            $scrImgMeta624 = $fbImgSrc;
            $scrImgMeta1024 = $fbImgSrc;

            $urlForFacebook= $uploadFolder['baseurl'].'/contest-gallery/gallery-id-'.$GalleryID."/".$Timestamp."_".$NamePic.".html";


            //$urlForFacebook= $urlSource.'/wp-content/uploads/contest-gallery/gallery-id-'.$GalleryID."/".$Timestamp."_".$NamePic.".html";

            $fields = <<<HEREDOC
                                        <!DOCTYPE html>
											<html lang="en">
											<head>
											<title>$blog_title</title>
											<meta property="og:url"           content="$urlForFacebook" />
											<meta property="og:type"          content="website" />
											<meta property="og:title"         content="$blog_title" />
											<meta property="og:image"         content="$scrImgMeta624" />
											<meta charset="utf-8">
											<meta name="viewport" content="width=device-width, initial-scale=1.0">
											 </head>
											<body  onload="checkIfIframe(),loadButton();">
											 
											 <div id="fb-root"></div>
											<script>
											
											window.onmessage = function(event) {
											  if (event.data === "reload") {
												location.reload();
											  }
											};
											
											function checkIfIframe(){
												if (window.frameElement) {
												
												}
												else{
													document.getElementById("cgimg").innerHTML = "<img src='$scrImgMeta1024' width='800px' />";
												}
											}
									
											
											var userBrowserLang = navigator.language || navigator.userLanguage;

											if(userBrowserLang.indexOf("en")==0){var userLang = "en_US";}
											else if(userBrowserLang.indexOf("de")==0){var userLang = "de_DE";}
											else if(userBrowserLang.indexOf("fr")==0){var userLang = "fr_FR";}
											else if(userBrowserLang.indexOf("es")==0){var userLang = "es_ES";}
											else if(userBrowserLang.indexOf("pt")==0){var userLang = "pt_PT";}
											else if(userBrowserLang.indexOf("nl")==0){var userLang = "nl_NL";}
											else if(userBrowserLang.indexOf("ru")==0){var userLang = "ru_RU";}
											else if(userBrowserLang.indexOf("zh")==0){var userLang = "zh_CN";}
											else if(userBrowserLang.indexOf("ja")==0){var userLang = "ja_JP";}
											else{var userLang = "en_US";}
											
											(function(d, s, id) { var js, fjs = d.getElementsByTagName(s)[0];
											  if (d.getElementById(id)) return;
											  js = d.createElement(s); js.id = id;
											  js.src = "//connect.facebook.net/"+userLang+"/sdk.js#xfbml=1&version=v2.8";
											  fjs.parentNode.insertBefore(js, fjs);
											}(document, "script", "facebook-jssdk"));
											</script>
											
											<script src="backtogalleryurl.js"></script>
											<div class="fb-like" data-href="$urlForFacebook" data-layout="button_count" data-action="like" data-share="true" style="float:left;display:inline;width:76px;vertical-align: middle;position:absolute;top:0px;height: 30px;width:400px;overflow:hidden;"></div>
											<div style="margin-top:40px;" id="cgimg"></div>
											<div id="cgBackToGallery"></div>
											  
											  
											</body>
											</html>

HEREDOC;
            $fp = fopen($dirHTML, 'w');
            fwrite($fp, $fields);
            fclose($fp);

        }

    }

}

}

?>