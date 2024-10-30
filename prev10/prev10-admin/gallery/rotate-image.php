<?php

    $GalleryID = @$_GET['option_id'];
    $cgImageId = @$_GET['cg_image_id'];
    $wpImageId = @$_GET['cg_image_wp_id'];

	// Tabellennamen ermitteln, GalleryID wurde als Shortcode bereits �bermittelt.
	global $wpdb;

	$tablenameOptions = $wpdb->prefix."contest_gal1ery_options";
	$tablename = $wpdb->prefix."contest_gal1ery";
    $table_posts = $wpdb->prefix."posts";

    $cgVersion = $wpdb->get_var("SELECT Version FROM $tablenameOptions WHERE id = '$GalleryID'");
    $wpImage = $wpdb->get_row("SELECT * FROM $table_posts WHERE ID = '$wpImageId'");
    $cgImage = $wpdb->get_row("SELECT * FROM $tablename WHERE id = '$cgImageId'");

    $wpImageUrl = $wpImage->guid;

    $content_url = wp_upload_dir();
    $content_url = $content_url['baseurl']; // Pfad zum Bilderordner angeben

    if($cgVersion>=7){
        $thumbUrl = wp_get_attachment_image_src($wpImageId, 'medium');
        $thumbUrl = $thumbUrl[0];
    }
    else{
        $thumbUrl = $content_url.'/contest-gallery/gallery-id-'.$GalleryID.'/'.$cgImage->Timestamp.'_'.$cgImage->NamePic.'-300width.'.$cgImage->ImgType;
    }

echo "<div id='cg_rotate_image'>";


echo "<form action='?page=contest-gallery/index.php&option_id=$GalleryID&edit_gallery=true' method='POST'>";
echo "<input type='hidden' name='cg_image_rotate_save_values' value='true' >";
echo "<input type='hidden' name='cg_image_rotate_id' value='$cgImageId' >";

echo "<h2>Gallery view original image source:</h2>";
echo "<div id='cgRotateSource'><img src='".plugins_url()."/contest-gallery/admin/gallery/rotate_icon.svg'>";
echo "</div>";
echo "<a id='cgResetSource' href='#cgResetSource'>Reset to standard</a>";

/*$mainSourceContainerHeight = '';

if($cgImage->Width >= $cgImage->Height){
 //   $mainSourceContainerHeight = $cgImage->Width;
}
else{
   // $mainSourceContainerHeight = $cgImage->Height;
}*/

echo "<div id='cgImgSourceContainerMain' >";
echo "<div id='cgImgSourceContainer'>";
echo "<input type='hidden' id='rSource' name='rSource' value='0' >";
echo "<img id='cgImgSource' class='cg".$cgImage->rSource."degree' src='$wpImageUrl' />";
echo "</div>";
echo "</div>";


echo "<h2>Gallery view for images converted to lower resolution:</h2>";
echo "<div id='cgRotateThumb'><img src='".plugins_url()."/contest-gallery/admin/gallery/rotate_icon.svg'>";
echo "</div>";
echo "<a id='cgResetThumb' href='#cgResetThumb'>Reset to standard</a>";
echo "<div id='cgImgThumbContainerMain' >";
echo "<div id='cgImgThumbContainer'>";
echo "<input type='hidden' id='rThumb' name='rThumb' value='0' >";
echo "<img id='cgImgThumb' src='$thumbUrl' class='cg".$cgImage->rThumb."degree' />";
echo "</div>";
echo "</div>";


echo "<div id='cg_rotate_save_changes'>";

echo '<input type="submit" name="submit" value="Save changes and go back to gallery" id="cg_gallery_backend_submit" ">';


echo "</div>";

echo "</form>";

echo "<div id='cg_rotate_do_not_save_changes'>";

/*echo "<div id='cg_rotate_save_changes'>";

echo "<form method='POST' action='?page=contest-gallery/index.php&option_id=$GalleryID&edit_gallery=true' ><input type='submit' value='Back to gallery without saving changes'  /></form>";

echo "</div>";*/

/*	echo "<div id='cgImgSourceContainer'>";
	    echo "<img id='cgImgSource' src='$wpImageUrl' />";
	echo "</div>";*/

?>