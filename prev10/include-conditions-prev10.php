<?php


add_action('admin_enqueue_scripts', 'cg_options_tabcontent_v10' );


if(@$_POST['changeSize']==true OR @$_GET['reset_users_votes'] == true OR @$_GET['reset_votes'] == true OR @$_GET['reset_votes2'] == true){

    require_once('prev10-admin/options/change-options-and-sizes.php');

}


//------------------------------------------------------------
// ----------------------------------------------------------- Change options of gallery ----------------------------------------------------------
//------------------------------------------------------------

if (@$_GET['edit_options'] == true OR @$_POST['edit_options']==true OR @$_POST['changeSize']==true OR @$_GET['reset_users_votes'] == true ) {
//wp_enqueue_script( 'jquery.minicolors', plugins_url( '/js/color-picker/jquery.minicolors.js', __FILE__ ), array('jquery'), false, true );
//wp_enqueue_script( 'jquery.minicolors.min', plugins_url( '/js/color-picker/jquery.minicolors.min.js', __FILE__ ), array('jquery'), false, true );
//wp_enqueue_script( 'jquery_frontend_color_picker', plugins_url( '/js/color-picker/jquery_frontend_color_picker.js', __FILE__ ), array('jquery'), false, true );


    wp_enqueue_script( 'cg_color_picker_js', plugins_url( '/prev10-admin/options/color-picker.js', __FILE__ ), array('jquery'), '10.9.7.9.1' );
    wp_enqueue_script( 'cg_options_tabcontent_js', plugins_url( '/prev10-admin/options/cg_options_tabcontent.js', __FILE__ ), array('jquery'), '10.9.7.9.1' );
    wp_enqueue_script( 'cg_js_admin_options_edit_options', plugins_url( '/prev10-js/admin/options/edit_options.js', __FILE__ ), array('jquery'), '10.9.7.9.1' );
    wp_enqueue_script( 'jquery-ui-sortable' );
    wp_enqueue_script( 'jquery-ui-datepicker' );
    wp_register_style( 'contest-style-css', plugins_url('/prev10-admin/options/datepicker.css', __FILE__), false, '10.9.7.9.1' );
    wp_enqueue_style( 'contest-style-css', plugins_url('/prev10-admin/options/datepicker.css', __FILE__), false, '10.9.7.9.1' );
    wp_register_style( 'color-picker-css', plugins_url('/prev10-admin/options/color-picker.css', __FILE__), false, '10.9.7.9.1' );
    wp_enqueue_style( 'color-picker-css', plugins_url('/prev10-admin/options/color-picker.css', __FILE__), false, '10.9.7.9.1' );


    require_once('prev10-admin/options/edit-options.php');

}

//------------------------------------------------------------
// ----------------------------------------------------------- Rotate Image ----------------------------------------------------------
//------------------------------------------------------------


if (!empty($_GET['cg_image_rotate'])){
    wp_enqueue_script( 'cg_js_admin_gallery_rotate_image', plugins_url( '/prev10-js/admin/gallery/rotate_image.js', __FILE__ ), array('jquery'), '10.9.7.9.1' );
    wp_enqueue_style( 'cg_css_general_rotate_image', plugins_url('prev10-css/general/rotate_image.css', __FILE__), false, '10.9.7.9.1' );
    require_once('prev10-admin/gallery/rotate-image.php');
}

//------------------------------------------------------------
// ----------------------------------------------------------- Create an Upload Form ----------------------------------------------------------
//------------------------------------------------------------


if (@$_GET['define_upload'] == true) {
    wp_enqueue_script( 'cg_admin_edit_upload_create_upload', plugins_url( '/prev10-js/admin/edit-upload/create_upload.js', __FILE__ ), array('jquery'), '10.9.7.9.1' );
    wp_enqueue_script( 'admin_edit_upload_tinymce', plugins_url( '/prev10-js/admin/edit-upload/tinymce.js', __FILE__ ), array('jquery'), '10.9.7.9.1' );
    wp_enqueue_script( 'jquery-ui-sortable' );
    require_once('prev10-admin/upload/create-upload.php');

}

//------------------------------------------------------------
// ----------------------------------------------------------- Create an User reg Form ----------------------------------------------------------
//------------------------------------------------------------


if (@$_GET['create_user_form'] == true) {

    wp_enqueue_script( 'create_user_form', plugins_url( '/prev10-admin/users/js/create_user_form.js', __FILE__ ), array('jquery'), '10.9.7.9.1' );
    wp_enqueue_script( 'jquery-ui-sortab le' );
    require_once('prev10-admin/users/admin/registry/create-user-form.php');
}


//------------------------------------------------------------
// ----------------------------------------------------------- Create an User reg Form ----------------------------------------------------------
//------------------------------------------------------------


if (@$_GET['users_management'] == true) {

    require_once('prev10-admin/users/admin/users/management.php');

}


//------------------------------------------------------------
// ----------------------------------------------------------- Define an output of a pic ----------------------------------------------------------
//------------------------------------------------------------

if (@$_GET['define_output'] == true) {
    wp_enqueue_script( 'define_output', plugins_url( '/prev10-js/define_output.js', __FILE__ ), array('jquery'), '10.9.7.9.1' );
    wp_enqueue_script( 'jquery-ui-sortable' );
    require_once('prev10-admin/upload/define-output.php');

}



//------------------------------------------------------------
// ----------------------------------------------------------- Change email text for informing users ----------------------------------------------------------
//------------------------------------------------------------

if (@$_POST['inform_user'] == true OR @$_GET['inform_user'] == true) {
    wp_enqueue_script( 'change_text_inform_user', plugins_url( '/prev10-js/change_text_inform_user.js', __FILE__ ), array('jquery'), '10.9.7.9.1' );
    require_once('prev10-admin/email/change-text-inform-user.php');

}


//------------------------------------------------------------
// ----------------------------------------------------------- Neue Galerie lÃ¶schen ----------------------------------------------------------
//------------------------------------------------------------

if(@$_GET['option_id']==true AND @$_GET['delete']==true){

    wp_enqueue_style( 'cg_main_menu_css', plugins_url('css/backend/cg_main_menu.css', __FILE__), false, '10.9.7.9.1' );

    require_once('prev10-admin/delete-gallery.php');
    require_once('prev10-admin/main-menu.php');

}

//------------------------------------------------------------
// ----------------------------------------------------------- AuswahlmenÃ¼ zum Anzeigen und Erstellen von Galerien ----------------------------------------------------------
//------------------------------------------------------------

if(@$_GET['option_id']==false and @$_POST['option_id']==false){
//require('css/style.php');
    wp_enqueue_style( 'cg_main_menu_css', plugins_url('css/backend/cg_main_menu.css', __FILE__), false, '10.9.7.9.1' );


    //add_action( 'plugins_loaded', 'contest_gal1ery_db_check' );



    require_once('prev10-admin/main-menu.php');

    require_once('prev10-admin/export/controller.php');
    add_action('cg_remove_not_required_coded_csvs','cg_remove_not_required_coded_csvs');
    do_action('cg_remove_not_required_coded_csvs');




}


//------------------------------------------------------------
// ----------------------------------------------------------- User per Email informieren oder nicht informieren Ã¤ndern/ SPEICHERN ----------------------------------------------------------
//------------------------------------------------------------

//if (@$_POST['submit'] == true AND @$_POST['informId'] == true) {

//require_once('prev10-admin/email/inform-user.php');

//}


//------------------------------------------------------------
// ----------------------------------------------------------- Upload several pics to a certain galery ----------------------------------------------------------
//------------------------------------------------------------

if(@$_GET['option_id']==true AND @$_POST['upload_pics']==true){

    require_once('prev10-admin/gallery/upload-pics.php');

}

//------------------------------------------------------------
// ----------------------------------------------------------- Reset informed for all pictures ----------------------------------------------------------
//------------------------------------------------------------

if(@$_POST['reset_all']==true){

    require_once('prev10-admin/gallery/reset_all.php');

}


//------------------------------------------------------------
// ----------------------------------------------------------- Edit certain galery ----------------------------------------------------------
//------------------------------------------------------------

if (@$_GET['edit_gallery'] == true) {
    wp_enqueue_style( 'cg_css_general_rotate_image', plugins_url('prev10-css/general/rotate_image.css', __FILE__), false, '10.9.7.9.1' );

    //------------------------------------------------------------
    // ----------------------------------------------------------- Hochgeladene Bilder anzeigen oder nicht anzeigen Ã¤ndern und Comments Ã¤ndern oder Informieren oder Informierte reseten SPEICHERN ----------------------------------------------------------
    //------------------------------------------------------------

    if (@$_POST['submit'] == true AND @$_POST['changeGalery'] == true AND (@$_POST['chooseAction1'] == 1 OR @$_POST['chooseAction1'] == 2 OR @$_POST['chooseAction1'] == 4)) {
        wp_enqueue_script( 'gallery_admin_objects', plugins_url( '/prev10-js/gallery_admin_objects.js', __FILE__ ), array('jquery'), '10.9.7.9.1' );
        wp_enqueue_script( 'gallery_admin', plugins_url( '/prev10-js/gallery_admin.js', __FILE__ ), array('jquery'), '10.9.7.9.1' );


        wp_enqueue_script( 'cg_check_wp_admin_upload', plugins_url( '/prev10-js/cg_check_wp_admin_upload.js', __FILE__ ), array('jquery'), '10.9.7.9.1' );
        wp_enqueue_script( 'jquery-ui-sortable' );
        //echo "change";
        require_once('prev10-admin/gallery/change-gallery.php');
        require_once('prev10-admin/gallery/gallery.php');

    }

    //------------------------------------------------------------
    // ----------------------------------------------------------- Delete pics of certain galery ----------------------------------------------------------
    //------------------------------------------------------------

    elseif (@$_POST['submit'] == true AND @$_POST['chooseAction1'] == 3) {

        wp_enqueue_script( 'gallery_admin_objects', plugins_url( '/prev10-js/gallery_admin_objects.js', __FILE__ ), array('jquery'), '10.9.7.9.1' );
        wp_enqueue_script( 'gallery_admin', plugins_url( '/prev10-js/gallery_admin.js', __FILE__ ), array('jquery'), '10.9.7.9.1' );

        wp_enqueue_script( 'cg_check_wp_admin_upload', plugins_url( '/prev10-js/cg_check_wp_admin_upload.js', __FILE__ ), array('jquery'), '10.9.7.9.1' );

        wp_enqueue_script( 'jquery-ui-sortable' );
        //echo "DELETE PICS!<br>";
        require_once('prev10-admin/gallery/delete-pics.php');
        require_once('prev10-admin/gallery/gallery.php');

    }

    //------------------------------------------------------------
    // ----------------------------------------------------------- Neue Galerie kreieren ----------------------------------------------------------
    //------------------------------------------------------------

    //wpmadd =(Damit keine neue Galerie kreiert wird wenn eine gerade kreiert wurde und bilder sofort hochgeladen wurden)
    elseif(@$_GET['option_id']==true AND (@$_GET['create']==true OR @$_GET['copy']==true) AND (@$_POST['cg_create']==true OR @$_POST['cg_copy']==true)  AND @$_GET['edit_gallery'] == true AND @$_GET['wpmadd'] != true ){

        wp_enqueue_script( 'gallery_admin_objects', plugins_url( '/prev10-js/gallery_admin_objects.js', __FILE__ ), array('jquery'), '10.9.7.9.1' );

        wp_enqueue_script( 'gallery_admin', plugins_url( '/prev10-js/gallery_admin.js', __FILE__ ), array('jquery'), '10.9.7.9.1' );


        wp_enqueue_script( 'cg_check_wp_admin_upload', plugins_url( '/prev10-js/cg_check_wp_admin_upload.js', __FILE__ ), array('jquery'), '10.9.7.9.1' );
        wp_enqueue_script( 'jquery-ui-sortable' );
        var_dump('rev10-admin/create-gallery.php');
        require_once('prev10-admin/create-gallery.php');
        require_once('prev10-admin/gallery/gallery.php');

    }

    //------------------------------------------------------------
    // ----------------------------------------------------------- Edit certain galery ----------------------------------------------------------
    //------------------------------------------------------------


    else{
        wp_enqueue_script( 'gallery_admin_objects', plugins_url( '/prev10-js/gallery_admin_objects.js', __FILE__ ), array('jquery'), '10.9.7.9.1' );

        wp_enqueue_script( 'gallery_admin', plugins_url( '/prev10-js/gallery_admin.js', __FILE__ ), array('jquery'), '10.9.7.9.1' );
        wp_enqueue_script( 'cg_check_wp_admin_upload', plugins_url( '/prev10-js/cg_check_wp_admin_upload.js', __FILE__ ), array('jquery'), '10.9.7.9.1' );
        wp_enqueue_script( 'jquery-ui-sortable' );
        require_once('prev10-admin/gallery/gallery.php');
    }



}


//------------------------------------------------------------
// ----------------------------------------------------------- Kommentare eines einzelnen Bildes anzeigen ----------------------------------------------------------
//------------------------------------------------------------

if(@$_GET['show_comments']==true){

    require_once('prev10-admin/gallery/show-comments.php');

}




?>