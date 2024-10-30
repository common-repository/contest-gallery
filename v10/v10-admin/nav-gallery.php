<?php
	
	global $wpdb;
	$tablename = $wpdb->prefix."contest_gal1ery";
	//$proUploads = $wpdb->get_var( "SELECT COUNT(*) FROM $tablename WHERE id > '0' ");

	if(!get_option("p_cgal1ery_reminder_time")){
		add_option( "p_cgal1ery_reminder_time", time() );
	}

cg_shortcode_interval_configuration_container($GalleryID,$cgProFalse);

cg_add_fields_pressed_after_content_modification($GalleryID);

echo "<div id='cgDocumentation' class='cg_do_not_remove_when_ajax_load'>";
echo "<a href='https://www.contest-gallery.com/documentation/' target='_blank'><span>";
echo "Contest Gallery documentation";
echo "</span></a>";
echo "</div>";
echo "<input type='hidden' id='cgGetVersionForUrlJs' value='".cg_get_version()."' />";

###NORMAL###
if(!empty($cgProVersion)){// check with no empty!
    include('normal/download-proper-pro-version-info-general-headers-area.php');
}
###NORMAL-END###

echo "<div id='cg_shortcode_table' class='cg_shortcode_table cg_do_not_remove_when_ajax_load'>";

	if(empty($GalleryName)){$GalleryName="";}
		$versionColor = "#444";

if(empty($cgProVersionLink)){
    $cgProVersionLink = '';
}

$galeryNR = $GalleryID;

    include("nav-shortcode.php");

echo "</div>";


if(intval($galleryDbVersion)>=21){
    if(get_post_status( $optionsSQL->WpPageParent ) == 'trash'){
        echo "<a href='".get_bloginfo('wpurl') . "/wp-admin/edit.php?post_status=trash&post_type=contest-gallery' target='_blank' class='cg_entry_page_url' style='margin-bottom: 15px;'>";
        echo "cg_gallery page <b>moved to trash</b> - can be restored";
        echo "</a>";
    }else{
        $permalink = get_permalink($optionsSQL->WpPageParent);
        if($permalink===false){
            echo "<a href='#' target='_blank' class='cg_entry_page_url cg_disabled_background_color_e0e0e0' style='margin-bottom: 15px;'>";
            echo "cg_gallery page <b>&nbsp;deleted&nbsp;</b> - can be corrected in \"Edit options\" >>> \"Status, repair...\"";
            echo "</a>";
        }else{
/*            echo "<a href='".$permalink."' target='_blank' class='cg_entry_page_url' style='margin-bottom: 15px;'>";
            echo "cg_gallery";
            echo "</a>";*/
        }
    }
}

if(intval($galleryDbVersion)>=21){
    if(get_post_status( $optionsSQL->WpPageParentUser ) == 'trash'){
        echo "<a href='".get_bloginfo('wpurl') . "/wp-admin/edit.php?post_status=trash&post_type=contest-gallery' target='_blank' class='cg_entry_page_url' style='margin-bottom: 15px;'>";
        echo "cg_gallery_user page <b>moved to trash</b> - can be restored";
        echo "</a>";
    }else{
        $permalink = get_permalink($optionsSQL->WpPageParentUser);
        if($permalink===false){
            echo "<a href='#' target='_blank' class='cg_entry_page_url cg_disabled_background_color_e0e0e0' style='margin-bottom: 15px;'>";
            echo "cg_gallery_user page <b>&nbsp;deleted&nbsp;</b> - can be corrected in \"Edit options\" >>> \"Status, repair...\"";
            echo "</a>";
        }else{
/*            echo "<a href='".$permalink."' target='_blank' class='cg_entry_page_url' style='margin-bottom: 15px;'>";
            echo "cg_gallery_user";
            echo "</a>";*/
        }
    }
}

if(intval($galleryDbVersion)>=21){
    if(get_post_status( $optionsSQL->WpPageParentNoVoting ) == 'trash'){
        echo "<a href='".get_bloginfo('wpurl') . "/wp-admin/edit.php?post_status=trash&post_type=contest-gallery' target='_blank' class='cg_entry_page_url' style='margin-bottom: 15px;'>";
        echo "cg_gallery_no_voting page <b>moved to trash</b> - can be restored";
        echo "</a>";
    }else{
        $permalink = get_permalink($optionsSQL->WpPageParentNoVoting);
        if($permalink===false){
            echo "<a href='#' target='_blank' class='cg_entry_page_url cg_disabled_background_color_e0e0e0' style='margin-bottom: 15px;'>";
            echo "cg_gallery_no_voting page <b>&nbsp;deleted&nbsp;</b> - can be corrected in \"Edit options\" >>> \"Status, repair...\"";
            echo "</a>";
        }else{
/*            echo "<a href='".$permalink."' target='_blank' class='cg_entry_page_url' style='margin-bottom: 15px;'>";
            echo "cg_gallery_no_voting";
            echo "</a>";*/
        }
    }
}

if(intval($galleryDbVersion)>=21){
    if(get_post_status( $optionsSQL->WpPageParentWinner ) == 'trash'){
        echo "<a href='".get_bloginfo('wpurl') . "/wp-admin/edit.php?post_status=trash&post_type=contest-gallery' target='_blank' class='cg_entry_page_url' style='margin-bottom: 15px;'>";
        echo "cg_gallery_winner page <b>moved to trash</b> - can be restored";
        echo "</a>";
    }else{
        $permalink = get_permalink($optionsSQL->WpPageParentWinner);
        if($permalink===false){
            echo "<a href='#' target='_blank' class='cg_entry_page_url cg_disabled_background_color_e0e0e0' style='margin-bottom: 15px;'>";
            echo "cg_gallery_winner page <b>&nbsp;deleted&nbsp;</b> - can be corrected in \"Edit options\" >>> \"Status, repair...\"";
            echo "</a>";
        }else{
/*            echo "<a href='".$permalink."' target='_blank' class='cg_entry_page_url' style='margin-bottom: 15px;'>";
            echo "cg_gallery_winner";
            echo "</a>";*/
        }
    }
}

// cg_gallery_ecommerce since 22 only available
if(intval($galleryDbVersion)>=22){
    if(get_post_status( $optionsSQL->WpPageParentEcommerce ) == 'trash'){
        echo "<a href='".get_bloginfo('wpurl') . "/wp-admin/edit.php?post_status=trash&post_type=contest-gallery' target='_blank' class='cg_entry_page_url' style='margin-bottom: 15px;'>";
        echo "cg_gallery_ecommerce page <b>moved to trash</b> - can be restored";
        echo "</a>";
    }else{
        $permalink = get_permalink($optionsSQL->WpPageParentEcommerce);
        if($permalink===false){
            echo "<a href='#' target='_blank' class='cg_entry_page_url cg_disabled_background_color_e0e0e0' style='margin-bottom: 15px;'>";
            echo "cg_gallery_ecommerce page <b>&nbsp;deleted&nbsp;</b> - can be corrected in \"Edit options\" >>> \"Status, repair...\"";
            echo "</a>";
        }else{
/*            echo "<a href='".$permalink."' target='_blank' class='cg_entry_page_url' style='margin-bottom: 15px;'>";
            echo "cg_gallery_ecommerce";
            echo "</a>";*/
        }
    }
}

	echo "</div>";

	//fef050 fcd729
/*echo "<table class='cg_do_not_remove_when_ajax_load' style='background-color:#ffffff;padding:15px 0;width:100%;box-shadow: 2px 4px 12px rgba(0,0,0,.08);border-radius:8px;' >";
	echo "<tr>";
echo "<td align='center'><div><a href='?page=".cg_get_version()."/index.php'  class='cg_load_backend_link'><input class='cg_backend_button cg_backend_button_back' type='button' value='<<< Back to menu' ></a></div></td>";
echo "<td align='center'><div><a href='?page=".cg_get_version()."/index.php&edit_options=true&option_id=$GalleryID' class='cg_load_backend_link cg_edit_options'><input type='button' class='cg_backend_button cg_backend_button_general ' value='Edit options' /></a></div></td>";
echo "<td align='center'><div><a href='?page=".cg_get_version()."/index.php&edit_options=true&option_id=$GalleryID' class='cg_load_backend_link cg_edit_translations'><input type='button' class='cg_backend_button cg_backend_button_general ' value='Edit translations' /></a></div></td>";
	echo "<td align='center'><div><a href='?page=".cg_get_version()."/index.php&define_upload=true&option_id=$GalleryID'  class='cg_load_backend_link'><input type='button' class='cg_backend_button cg_backend_button_general' value='Edit contact form'  /></a></div></td>";
	echo "<td align='center'><div>";

		//echo "<form method='POST' action='?page=".cg_get_version()."/index.php&create_user_form=true&option_id=$GalleryID'><input type='hidden' name='option_id' value='$GalleryID'><input type='submit' value='PRO users management' style='text-align:center;width:180px;background:linear-gradient(0deg, #ffbe4e 50%, #ffbe4e 50%);' /></form><br/>";
		echo "<a href='?page=".cg_get_version()."/index.php&create_user_form=true&option_id=$GalleryID'  class='cg_load_backend_link'><input class='cg_backend_button cg_backend_button_general'  type='button' value='Edit registration form'  /></a>";
		


	echo "</div></td>"; 
	echo "</tr>";
	
echo "</table>";*/

echo "<div id='cg_nav_menu_row_container'  class='cg_do_not_remove_when_ajax_load cg_nav_menu_row_container' >";
    echo "<div class='cg_nav_menu_row'>";
    echo "<div ><a href='?page=".cg_get_version()."/index.php'  class='cg_load_backend_link cg_load_backend_link_back_to_menu'><input class='cg_backend_button cg_backend_button_back ' type='button' value='Back to menu' ></a><br/></div>";
    echo "<div><a id='cgNavMenuContactForm' href='?page=".cg_get_version()."/index.php&option_id=$GalleryID&define_upload=true' class='cg_load_backend_link'><input type='submit' class='cg_backend_button cg_backend_button_general'  value='Edit contact form' /></form><br/></div>";
    echo "<div>";
    echo "<a id='cgNavMenuRegForm'  href='?page=".cg_get_version()."/index.php&create_user_form=true&option_id=$GalleryID' class='cg_load_backend_link'><input type='hidden' name='option_id' value='$GalleryID'><input class='cg_backend_button cg_backend_button_general'  type='submit' value='Edit registration form'  /></a>";
    echo "</div>";
    echo "<div>";
    echo "<a  id='cgNavMenuUsersManagement'  href='?page=".cg_get_version()."/index.php&users_management=true&option_id=$GalleryID' class='cg_load_backend_link'><input class='cg_backend_button cg_backend_button_general'  type='button' id='cgUsersManagement' value='Users management' /></a>";
    echo "</div>";
    echo "</div>";

    echo "<div class='cg_nav_menu_row'>";
    echo "<div><a id='cgEditOptionsButton' href='?page=".cg_get_version()."/index.php&edit_options=true&option_id=$GalleryID' class='cg_load_backend_link'><input type='submit' class='cg_backend_button cg_backend_button_general'  value='Edit options'  /></a><br/></div>";
    echo "<div><a id='cgNavMenuEditTranslations' href='?page=".cg_get_version()."/index.php&edit_options=true&option_id=$GalleryID&cg_edit_translations=true' class='cg_load_backend_link cg_edit_translations'><input type='submit' class='cg_backend_button cg_backend_button_general '  value='Edit translations'  /></a><br/></div>";
    echo "<div><a id='cgNavMenuEditEcommerce'  href='?page=".cg_get_version()."/index.php&edit_options=true&option_id=$GalleryID&cg_edit_ecommerce=true' class='cg_load_backend_link cg_edit_ecommerce'><input type='submit' class='cg_backend_button cg_backend_button_general '  value='Edit ecommerce'  /></a><br/></div>";
    echo "<div><a id='cgNavMenuEcommerceOrders'  href='?page=".cg_get_version()."/index.php&option_id=$GalleryID&cg_orders=true' class='cg_load_backend_link'><input type='submit' class='cg_backend_button cg_backend_button_general '  value='Ecommerce orders'  /></a><br/></div>";
    echo "</div>";
echo "</div>";

    if(!empty($isEditOptions)){
       // include('nav-users-management-with-status-and-repair.php');
    }else{
        //include('nav-users-management.php');
    }


?>