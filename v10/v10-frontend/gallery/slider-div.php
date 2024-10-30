<?php

if($options['general']['AllowGalleryScript']==1){

    echo '<div id="cg_slider_main_div">';
    if($options['visual']['PreviewInSlider']==1){

        $thumbnail_size_w = get_option("thumbnail_size_w");
        $medium_size_w = get_option("medium_size_w");
        $large_size_w = get_option("large_size_w");

        if($thumbnail_size_w>=400){
            $wpCgSize = 'thumbnail';
        }
        else if($medium_size_w>=400){
            $wpCgSize = 'medium';
        }
        else if($large_size_w>=400){
            $wpCgSize = 'large';
        }
        else{
            $wpCgSize = 'full';
        }


        echo <<<HEREDOC

    <div id='cg-carrousel-slider'>
        <div id='cg-carrousel-slider-content'>
HEREDOC;

        $r = 0;
        foreach($jsonImages as $objectKey => $object) {

            $r++;

            $id = $object['id'];
            $rowid = $object['rowid'];
            $Timestamp = $object['Timestamp'] . '_';
            $NamePic = $object['NamePic'];
            $ImgType = $object['ImgType'];
            $rating = $object['Rating'];
            $countR = $object['CountR'];
            $countC = $object['CountC'];
            $countS = $object['CountS'];
            $widthOriginalImg = $object['Width'];
            $heightOriginalImg = $object['Height'];
            $WpUpload = $object['WpUpload'];
            $rThumb = $object['rThumb'];
            $imageCategory = $object['Category'];

            $imgSrc=$object[$wpCgSize];

            $cgImageThumbRotation = "cg".$rThumb."degree";


            if(!empty($categories)){
                $categoryClass = 'cg_cat_other_cg_gal';
                foreach($categories as $category){
                    if($imageCategory==$category->id){

                        $categoryClass = 'cg_cat_'.$category->Name;

                        if(strpos($categoryClass, ' ') !== false){

                            $categoryClass = str_replace(" ", "_", $categoryClass);

                        }

                    }
                }
            }


// cg_hide Klasse ist die Div Box zum Hovern
            echo <<<HEREDOC
            <div class='cg_image$r cg-carrousel-img cg_visible $categoryClass' data-cg_image_id="$id" id="cg-carrousel-container-id-$id">
                <input type="hidden" class="widthOriginalImg" value="$widthOriginalImg">
                <input type="hidden"" class="heightOriginalImg" value="$heightOriginalImg">
                <input type="hidden" value="$rThumb" class="cg_carrousel_image_thumb_rotation">
                <img src="$imgSrc" class="cg_image$r $cgImageThumbRotation" data-cg_image_id="$id" id="cg-carrousel-image-$id">
            </div>
HEREDOC;



        }


        echo <<<HEREDOC
        </div>
     </div>

HEREDOC;

// NEW Slider development here --- ENDE



    echo '<div id="cg_slider_arrow_left"><img id="cg_slider_arrow_left_img" src="'.$cg_slider_arrow_left.'?800" style="display:none;"></div>';
    echo '<div id="cg_slider_arrow_right"><img id="cg_slider_arrow_right_img" src="'.$cg_slider_arrow_right.'?800" style="display:none;"></div>';
    echo '<div id="cg_slider_arrow_left_next_page"><img id="cg_slider_arrow_left_img_next_page" src="'.$cg_slider_arrow_left_next_page.'?800" style="display:none;"></div>';
    echo '<div id="cg_slider_arrow_right_next_page"><img id="cg_slider_arrow_right_img_next_page" src="'.$cg_slider_arrow_right_next_page.'?800" style="display:none;"></div>';
    echo '<div id="cg_slider_arrow_fade_in_user_input"><img class="cg_slider_arrow_fade_in_user_input_img" src="'.$cg_slider_arrow_fade_in_user_input.'?800" style="width:100% ;height:100% ; display:none;"></div>';
    echo '<div id="cg_slider_arrow_fade_out_user_input"><img class="cg_slider_arrow_fade_out_user_input_img" src="'.$cg_slider_arrow_fade_out_user_input.'?800" style="width:100% ;height:100% ;display:none;"></div>';
    echo '<div id="close_slider_button"><img id="close_slider_button_img" src="'.$cg_slider_button.'?800" style="width:100% ;height:100% ;display:none;"></div>';
    echo '<div id="cg_slider_full_size_view_icon_div"><img id="cg_slider_full_size_view_icon_img" src="'.$cg_slider_full_size_view_icon.'?800" style="width:100% ;height:100% ;"></div>';
    echo '<div id="cg_slider_exit_full_size_view_icon_div"><img class="cg_slider_exit_full_size_view_icon_img" src="'.$cg_slider_exit_full_size_view_icon.'?800" style="width:100% ;height:100% ;"></div>';
    echo '<div id="cg_slider_download_full_size_icon_div"><a href="" target="_blank" ><img id="cg_slider_download_full_size_icon_img" src="'.$cg_slider_download_full_size_icon.'?800"  style="width:100% ;height:100% ;"></a></div>';
    echo '<div id="cg_slider_full_screen_icon_div"><img class="cg_slider_enter_full_screen"  id="cg_slider_full_screen_icon_img" src="'.$cg_slider_full_screen_icon.'?800"  style="width:100% ;height:100% ;"></div>';
    echo '<div id="cg_slider_exit_full_screen_icon_div"><img id="cg_slider_exit_full_screen_icon_img"  src="'.$cg_slider_exit_full_screen_icon.'?800"  style="width:100% ;height:100% ;"></div>';




    echo '<div id="cg_overlay"></div>';
    echo '<div id="imgContainer" class="imgContainer"></div>';
    }

    echo '</div>';

}
