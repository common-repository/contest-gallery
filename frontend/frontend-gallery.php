<?php
if(!defined('ABSPATH')){exit;}
//------------------------------------------------------------
// ----------------------------------------------------------- Einzelnes Userbild Kommentare ----------------------------------------------------------
//------------------------------------------------------------



if(!empty($_GET['picture_id']) AND $AllowGalleryScript != 1){


	include('show-image.php');

}

//------------------------------------------------------------
// ----------------------------------------------------------- Userbilder Galerie anzeigen !----------------------------------------------------------
//------------------------------------------------------------


if((empty($_GET['picture_id']) AND empty($_GET['comment'])) or $AllowGalleryScript == 1){
	
	include('show-gallery-jquery.php');

}



?>
