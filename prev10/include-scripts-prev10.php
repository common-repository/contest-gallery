<?php

// PLUGIN VERSION CHECK HERE --- END
wp_enqueue_script( 'cg_check_back_button_click', plugins_url( '/prev10-js/cg_check_back_button_click.js', __FILE__ ), array('jquery'), '10.9.7.9.1');

wp_enqueue_script( 'cg_rate', plugins_url( '/prev10-js/cg_rate.js', __FILE__ ), array('jquery'), '10.9.7.9.1' );

wp_localize_script( 'cg_rate', 'post_cg_rate_wordpress_ajax_script_function_name', array(
    'cg_rate_ajax_url' => admin_url( 'admin-ajax.php' )
));

wp_enqueue_script( 'cg_comment', plugins_url( '/prev10-js/cg_comment.js', __FILE__ ), array('jquery'), '10.9.7.9.1' );

wp_localize_script( 'cg_comment', 'post_cg_comment_wordpress_ajax_script_function_name', array(
    'cg_comment_ajax_url' => admin_url( 'admin-ajax.php' )
));

wp_enqueue_script( 'cg_set_comment_slider', plugins_url( '/prev10-js/cg_set_comment_slider.js', __FILE__ ), array('jquery'), '10.9.7.9.1' );

wp_localize_script( 'cg_set_comment_slider', 'post_cg_set_comment_slider_wordpress_ajax_script_function_name', array(
    'cg_set_comment_slider_ajax_url' => admin_url( 'admin-ajax.php' )
));


wp_enqueue_script( 'cg_show_comments_slider', plugins_url( '/prev10-js/cg_show_comments_slider.js', __FILE__ ), array('jquery'), '10.9.7.9.1' );

wp_localize_script( 'cg_show_comments_slider', 'post_cg_show_comments_slider_wordpress_ajax_script_function_name', array(
    'cg_show_comments_slider_ajax_url' => admin_url( 'admin-ajax.php' )
));


wp_enqueue_style( 'cg_frontend_single_image_style', plugins_url('/prev10-css/cg_frontend_single_image_style.css', __FILE__), false, '10.9.7.9.1' );
wp_enqueue_style( 'cg_contest_style',  plugins_url('/prev10-css/style.css', __FILE__), false, '10.9.7.9.1' );


wp_enqueue_style( 'cg_frontend_single_image_style', plugins_url('/prev10-css/cg_frontend_single_image_style.css', __FILE__), false, '10.9.7.9.1' );


wp_enqueue_style( 'cg_contest_style',  plugins_url('/prev10-css/style.css', __FILE__), false, '10.9.7.9.1' );
wp_enqueue_style( 'cg_css_general_rotate_image', plugins_url('/prev10-css/general/rotate_image.css', __FILE__), false, '10.9.7.9.1' );


wp_enqueue_script( 'cg_show_gallery_jquery', plugins_url( '/prev10-js/show_gallery_jquery.js', __FILE__ ), array('jquery'), '10.9.7.9.1');
wp_enqueue_script( 'cg_show_gallery_jquery_new', plugins_url( '/prev10-js/gallery/show_gallery_jquery_new.js', __FILE__ ), array('jquery'), '10.9.7.9.1');


wp_enqueue_style( 'cg_contest_style_slider',  plugins_url('/prev10-css/style_slider.css', __FILE__), false, '10.9.7.9.1' );
wp_enqueue_script( 'cg_show_gallery_jquery_image_slider', plugins_url( '/prev10-js/show_gallery_jquery_image_slider_new_slider.js', __FILE__ ), array('jquery'), '10.9.7.9.1' );
wp_enqueue_script( 'show_gallery_jquery_image_slider_control', plugins_url( '/prev10-js/show_gallery_jquery_image_slider_control.js', __FILE__ ), array('jquery'), '10.9.7.9.1' );


wp_enqueue_script( 'cg_show_gallery_jquery_gallery_init', plugins_url( '/prev10-js/gallery/init.js', __FILE__ ), array('jquery'), '10.9.7.9.1');
wp_enqueue_script( 'cg_show_gallery_jquery_gallery_vars', plugins_url( '/prev10-js/gallery/vars.js', __FILE__ ), array('jquery'), '10.9.7.9.1');
wp_enqueue_script( 'cg_show_gallery_jquery_gallery_categories_init', plugins_url( '/prev10-js/gallery/categories/init.js', __FILE__ ), array('jquery'), '10.9.7.9.1');
wp_enqueue_script( 'cg_show_gallery_jquery_gallery_categories_storage', plugins_url( '/prev10-js/gallery/categories/storage.js', __FILE__ ), array('jquery'), '10.9.7.9.1');
wp_enqueue_script( 'cg_show_gallery_jquery_gallery_categories_change', plugins_url( '/prev10-js/gallery/categories/change.js', __FILE__ ), array('jquery'), '10.9.7.9.1');

wp_enqueue_script( 'jquery-ui-dialog' );

// Slider development here
$AllowGalleryScript = 2;
if($AllowGalleryScript == 2){

    wp_enqueue_script( 'cg_show_gallery_jquery_image_slider_init', plugins_url( '/prev10-js/slider/init.js', __FILE__ ), array('jquery'), '10.9.7.9.1' );
    wp_enqueue_script( 'cg_show_gallery_jquery_image_slider_vars', plugins_url( '/prev10-js/slider/vars.js', __FILE__ ), array('jquery'), '10.9.7.9.1' );
    wp_enqueue_script( 'cg_show_gallery_jquery_image_slider_open', plugins_url( '/prev10-js/slider/open.js', __FILE__ ), array('jquery'), '10.9.7.9.1' );
    wp_enqueue_script( 'cg_show_gallery_jquery_image_slider_close', plugins_url( '/prev10-js/slider/close.js', __FILE__ ), array('jquery'), '10.9.7.9.1' );
    wp_enqueue_script( 'cg_show_gallery_jquery_image_slider_slide', plugins_url( '/prev10-js/slider/slide.js', __FILE__ ), array('jquery'), '10.9.7.9.1' );
    wp_enqueue_script( 'cg_show_gallery_jquery_image_slider_click', plugins_url( '/prev10-js/slider/click.js', __FILE__ ), array('jquery'), '10.9.7.9.1' );
    wp_enqueue_script( 'cg_show_gallery_jquery_image_slider_touch', plugins_url( '/prev10-js/slider/touch.js', __FILE__ ), array('jquery'), '10.9.7.9.1' );
    wp_enqueue_script( 'cg_show_gallery_jquery_image_slider_carrousel', plugins_url( '/prev10-js/slider/carrousel.js', __FILE__ ), array('jquery'), '10.9.7.9.1' );
    wp_enqueue_script( 'cg_show_gallery_jquery_image_slider_slide_new', plugins_url( '/prev10-js/slider/slide_new.js', __FILE__ ), array('jquery'), '10.9.7.9.1' );
    wp_enqueue_script( 'cg_show_gallery_jquery_image_slider_slide_values', plugins_url( '/prev10-js/slider/slide_values.js', __FILE__ ), array('jquery'), '10.9.7.9.1' );
    wp_enqueue_script( 'cg_show_gallery_jquery_image_slider_slide_objects', plugins_url( '/prev10-js/slider/slide_objects.js', __FILE__ ), array('jquery'), '10.9.7.9.1' );

    wp_enqueue_script( 'cg_show_gallery_jquery_image_slider_resize', plugins_url( '/prev10-js/slider/resize.js', __FILE__ ), array('jquery'), '10.9.7.9.1' );
    wp_enqueue_script( 'cg_show_gallery_jquery_image_slider_fullScreen', plugins_url( '/prev10-js/slider/fullScreen.js', __FILE__ ), array('jquery'), '10.9.7.9.1' );


}
else{
    wp_enqueue_script( 'cg_show_gallery_jquery_image_slider', plugins_url( '/prev10-js/show_gallery_jquery_image_slider.js', __FILE__ ), array('jquery'), '10.9.7.9.1' );
}

// Slider development here

wp_enqueue_script( 'cg_show_image_jquery', plugins_url( '/prev10-js/show_image_jquery.js', __FILE__ ), array('jquery'), '10.9.7.9.1' );

$checkIfGalleryExists = true;
include("prev10-frontend/get-data.php");

if($checkIfGalleryExists){
    include(__DIR__ ."/../check-language.php");


    @ob_start();
    include('prev10-frontend/frontend-gallery.php');
    $frontend_gallery = @ob_get_clean();

    apply_filters( 'cg_filter_frontend_gallery', $frontend_gallery );
}else{
    $frontend_gallery = @ob_get_clean();
}

