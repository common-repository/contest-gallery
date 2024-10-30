<?php


add_shortcode( 'cg_users_reg', 'contest_gal1ery_users_registry' );


function contest_gal1ery_users_registry($atts){

    // PLUGIN VERSION CHECK HERE

    contest_gal1ery_db_check();

    if(is_admin()){
        return '';
    }

    // PLUGIN VERSION CHECK HERE --- END

    global $wp_version;
    $sanitize_textarea_field = ($wp_version<4.7) ? 'sanitize_text_field' : 'sanitize_textarea_field';
    wp_enqueue_style( 'cg_contest_style',  plugins_url('/../v10/v10-css/style.css', __FILE__), false, '10.9.7.9.1' );
    wp_enqueue_style( 'cg_form_style', plugins_url('/../v10/v10-css/cg_form_style.css', __FILE__), false , '10.9.7.9.1' );
    wp_enqueue_script( 'cg_registry', plugins_url( '/../v10/v10-admin/users/js/users_registry.js', __FILE__ ), array('jquery'), '10.9.7.9.1' );

    wp_localize_script( 'cg_registry', 'post_cg_registry_wordpress_ajax_script_function_name', array(
        'cg_registry_ajax_url' => admin_url( 'admin-ajax.php' )
    ));

    ob_start();
    include(__DIR__.'/../v10/v10-admin/users/frontend/users-registry.php');
    $contest_gal1ery_users_registry = ob_get_clean();

    //apply_filters( 'cg_filter_users_registry', $contest_gal1ery_users_registry );

    return $contest_gal1ery_users_registry;

}

add_action('wp_ajax_nopriv_post_cg_registry','post_cg_registry');
add_action('wp_ajax_post_cg_registry','post_cg_registry');

function post_cg_registry(){

    global $wpdb;

    if ( defined( 'DOING_AJAX' ) && DOING_AJAX ) {

        require_once(__DIR__.'/../v10/v10-admin/users/frontend/users-registry-check-name-mail-ajax.php');
        die();

    }
    else {

        exit();
    }

}


function cg_options_tabcontent() {
    /* Register our stylesheet. */

    if(!empty($_GET['page'])){
        $check = $_GET['page'];
    }
    else{
        $check = '';
    }

    if ($check!='contest-gallery/index.php') {
        return;
    }

    wp_enqueue_style( 'cg_options_tabcontent', plugins_url('/prev10-admin/options/cg_options_tabcontent.css', __FILE__), false , '10.9.7.9.1' );
    wp_enqueue_style( 'cg_options_style', plugins_url('/prev10-css/cg_options_style.css', __FILE__), false , '10.9.7.9.1' );

}



add_action( 'wp_ajax_nopriv_post_cg_rate', 'post_cg_rate' );
add_action( 'wp_ajax_post_cg_rate', 'post_cg_rate' );

function post_cg_rate() {

    global $wpdb;

    if ( defined( 'DOING_AJAX' ) && DOING_AJAX ) {

        require_once('prev10-frontend/rate-picture.php');

        die();
    }
    else {

        exit();
    }
}


add_action( 'wp_ajax_nopriv_post_cg_comment', 'post_cg_comment' );
add_action( 'wp_ajax_post_cg_comment', 'post_cg_comment' );

function post_cg_comment() {


    global $wpdb;


    if ( defined( 'DOING_AJAX' ) && DOING_AJAX ) {

        require_once('prev10-frontend/set-comment.php');
        die();
    }
    else {

        exit();
    }
}


add_action( 'wp_ajax_nopriv_post_cg_set_comment_slider', 'post_cg_set_comment_slider' );
add_action( 'wp_ajax_post_cg_set_comment_slider', 'post_cg_set_comment_slider' );

function post_cg_set_comment_slider() {


    global $wpdb;


    if ( defined( 'DOING_AJAX' ) && DOING_AJAX ) {

        require_once('prev10-frontend/set-comment-slider.php');
        die();
    }
    else {

        exit();
    }
}



add_action( 'wp_ajax_nopriv_post_cg_show_comments_slider', 'post_cg_show_comments_slider' );
add_action( 'wp_ajax_post_cg_show_comments_slider', 'post_cg_show_comments_slider' );

function post_cg_show_comments_slider() {


    global $wpdb;


    if ( defined( 'DOING_AJAX' ) && DOING_AJAX ) {

        require_once('prev10-frontend/show-comments-slider.php');
        die();
    }
    else {

        exit();
    }
}






// AJAX Script für Check Admin Image Upload im Backend
// Achtung! Für Backend AJAX Calls ist der FrontEnd Aufbau nicht erforderlich, nur die Action muss registriert werden

add_action( 'wp_ajax_nopriv_cg_check_wp_admin_upload', 'cg_check_wp_admin_upload' );
add_action( 'wp_ajax_cg_check_wp_admin_upload', 'cg_check_wp_admin_upload' );

function cg_check_wp_admin_upload() {

    global $wpdb;

    if ( defined( 'DOING_AJAX' ) && DOING_AJAX ) {

        require_once('prev10-admin/gallery/wp-uploader.php');
        die();
    }
    else {
        exit();
    }
}

// AJAX Script für Check Admin Image Upload im Backend ---- ENDE


add_action( 'wp_ajax_nopriv_post_cg_login', 'post_cg_login' );
add_action( 'wp_ajax_post_cg_login', 'post_cg_login' );

if(!function_exists('post_cg_login')){

    function post_cg_login(){

        global $wpdb;

        if ( defined( 'DOING_AJAX' ) && DOING_AJAX ) {

            require_once(__DIR__.'/../v10/v10-admin/users/frontend/users-login-check-ajax.php');

            die();
        }
        else {

            exit();
        }
    }

}


//------------------------------------------------------------
// ----------------------------------------------------------- Pro Version Abschnitt ----------------------------------------------------------





add_shortcode( 'cg_users_login', 'contest_gal1ery_users_login' );

if(!function_exists('contest_gal1ery_users_login')){

    function contest_gal1ery_users_login($atts){

        // PLUGIN VERSION CHECK HERE

        contest_gal1ery_db_check();

        if(is_admin()){
            return '';
        }

        // PLUGIN VERSION CHECK HERE --- END

        wp_enqueue_style( 'cg_contest_style',  plugins_url('/../v10/v10-css/style.css', __FILE__), false, '10.9.7.9.1' );
        wp_enqueue_style( 'cg_form_style', plugins_url('/../v10/v10-css/cg_form_style.css', __FILE__), false, '10.9.7.9.1' );
        wp_enqueue_style( 'cg_general_form_style', plugins_url('/../v10/v10-css/cg_general_form_style.css', __FILE__), false, '10.9.7.9.1' );
        wp_enqueue_script( 'cg_js_general_frontend', plugins_url( '/../v10/v10-js/general_frontend.js', __FILE__ ), array('jquery'), '10.9.7.9.1' );
        wp_enqueue_script( 'cg_login', plugins_url( '/../v10/v10-admin/users/js/users_login.js', __FILE__ ), array('jquery'), '10.9.7.9.1' );

        wp_localize_script( 'cg_login', 'post_cg_login_wordpress_ajax_script_function_name', array(
            'cg_login_ajax_url' => admin_url( 'admin-ajax.php' )
        ));

        ob_start();
        include(__DIR__.'/../v10/v10-admin/users/frontend/users-login.php');
        $contest_gal1ery_users_login = ob_get_clean();

        //apply_filters( 'cg_filter_users_login', $contest_gal1ery_users_login );

        return $contest_gal1ery_users_login;

    }

}

?>
