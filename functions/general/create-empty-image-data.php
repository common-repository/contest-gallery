<?php

if(!function_exists('contest_gal1ery_create_json_files_when_activating')){
    function contest_gal1ery_create_json_files_when_activating($GalleryID,$rowObject,$thumbSizesWp,$uploadFolder,$imageArray=null,$wpUserIdsAndDisplayNames=null){

        if($imageArray!=null){
            $imageArray[$rowObject->id] = array();
        }else{

            $jsonFile = $uploadFolder['basedir'].'/contest-gallery/gallery-id-'.$GalleryID.'/json/'.$GalleryID.'-images.json';

            if(file_exists($jsonFile)){
                $fp = fopen($jsonFile, 'r');
                $imageArray = json_decode(fread($fp, filesize($jsonFile)),true);
                $imageArray[$rowObject->id] = array();
                fclose($fp);
            }else{
                $imageArray = array();
                $imageArray[$rowObject->id] = array();
            }

        }

        // posts fields
        $imgSrcThumb=wp_get_attachment_image_src($rowObject->WpUpload, 'thumbnail');
        $imgSrcThumb=$imgSrcThumb[0];
        $imgSrcMedium=wp_get_attachment_image_src($rowObject->WpUpload, 'medium');
        $imgSrcMedium=$imgSrcMedium[0];
        $imgSrcLarge=wp_get_attachment_image_src($rowObject->WpUpload, 'large');
        $imgSrcLarge=$imgSrcLarge[0];
        $imgSrcFull=wp_get_attachment_image_src($rowObject->WpUpload, 'full');
        $imgSrcFull=$imgSrcFull[0];

        if(!empty($rowObject->Width)){
            $imageWidth = $rowObject->Width;
            $imageHeight = $rowObject->Height;
        }else{
            $imageWidth = $imgSrcFull[1];
            $imageHeight = $imgSrcFull[2];
        }

        $imageArray[$rowObject->id]['thumbnail_size_w'] = $thumbSizesWp['thumbnail_size_w'];
        $imageArray[$rowObject->id]['medium_size_w'] = $thumbSizesWp['medium_size_w'];
        $imageArray[$rowObject->id]['large_size_w'] = $thumbSizesWp['large_size_w'];

        $imageArray[$rowObject->id]['thumbnail'] = $imgSrcThumb;
        $imageArray[$rowObject->id]['medium'] = $imgSrcMedium;
        $imageArray[$rowObject->id]['large'] = $imgSrcLarge;
        $imageArray[$rowObject->id]['full'] = $imgSrcFull;

        $imageArray[$rowObject->id]['post_date'] = $rowObject->post_date;
        $imageArray[$rowObject->id]['post_content'] = $rowObject->post_content;
        $imageArray[$rowObject->id]['post_title'] = $rowObject->post_title;
        $imageArray[$rowObject->id]['post_name'] = $rowObject->post_name;
        $imageArray[$rowObject->id]['post_caption'] = $rowObject->post_excerpt;
        $imageArray[$rowObject->id]['post_alt'] = get_post_meta($rowObject->WpUpload,'_wp_attachment_image_alt',true);
        $imageArray[$rowObject->id]['guid'] = $imgSrcFull;

        // hier pauschal setzen
        $imageArray[$rowObject->id]['display_name'] = '';

        $imageRatingArray = array();

        $imageRatingArray['thumbnail_size_w'] = $thumbSizesWp['thumbnail_size_w'];
        $imageRatingArray['medium_size_w'] = $thumbSizesWp['medium_size_w'];
        $imageRatingArray['large_size_w'] = $thumbSizesWp['large_size_w'];

        $imageRatingArray['thumbnail'] = $imgSrcThumb;
        $imageRatingArray['medium'] = $imgSrcMedium;
        $imageRatingArray['large'] = $imgSrcLarge;
        $imageRatingArray['full'] = $imgSrcFull;

        $imageRatingArray['post_date'] = $rowObject->post_date;
        $imageRatingArray['post_content'] = $rowObject->post_content;
        $imageRatingArray['post_title'] = $rowObject->post_title;
        $imageRatingArray['post_name'] = $rowObject->post_name;
        $imageRatingArray['post_caption'] = $rowObject->post_excerpt;
        $imageRatingArray['post_alt'] = get_post_meta($rowObject->WpUpload,'_wp_attachment_image_alt',true);
        $imageRatingArray['guid'] = $imgSrcFull;

        // tablename fields
        $imageArray[$rowObject->id]['rowid'] = intval($rowObject->rowid);
        $imageArray[$rowObject->id]['Timestamp'] = intval($rowObject->Timestamp);
        $imageArray[$rowObject->id]['NamePic'] = $rowObject->NamePic;
        $imageArray[$rowObject->id]['ImgType'] = $rowObject->ImgType;
        $imageArray[$rowObject->id]['Rating'] = intval($rowObject->Rating);
        $imageArray[$rowObject->id]['GalleryID'] = intval($rowObject->GalleryID);
        $imageArray[$rowObject->id]['Active'] = intval($rowObject->Active);
        $imageArray[$rowObject->id]['Informed'] = intval($rowObject->Informed);
        $imageArray[$rowObject->id]['WpUpload'] = intval($rowObject->WpUpload);
        $imageArray[$rowObject->id]['Width'] = intval($imageWidth);
        $imageArray[$rowObject->id]['Height'] = intval($imageHeight);
        $imageArray[$rowObject->id]['rSource'] = intval($rowObject->rSource);
        $imageArray[$rowObject->id]['rThumb'] = intval($rowObject->rThumb);
        $imageArray[$rowObject->id]['Category'] = intval($rowObject->Category);
        if(!empty($wpUserIdsAndDisplayNames)){
            $imageArray[$rowObject->id]['display_name'] = $wpUserIdsAndDisplayNames[$rowObject->id];
        }


        $imageRatingArray['rowid'] = intval($rowObject->rowid);
        $imageRatingArray['Timestamp'] = intval($rowObject->Timestamp);
        $imageRatingArray['NamePic'] = $rowObject->NamePic;
        $imageRatingArray['ImgType'] = $rowObject->ImgType;
        $imageRatingArray['Rating'] = intval($rowObject->Rating);
        $imageRatingArray['GalleryID'] = intval($rowObject->GalleryID);
        $imageRatingArray['Active'] = intval($rowObject->Active);
        $imageRatingArray['Informed'] = intval($rowObject->Informed);
        $imageRatingArray['WpUpload'] = intval($rowObject->WpUpload);
        $imageRatingArray['Width'] = intval($imageWidth);
        $imageRatingArray['Height'] = intval($imageHeight);
        $imageRatingArray['rSource'] = intval($rowObject->rSource);
        $imageRatingArray['rThumb'] = intval($rowObject->rThumb);
        $imageRatingArray['Category'] = intval($rowObject->Category);
        $imageRatingArray['display_name'] = $wpUserIdsAndDisplayNames[$rowObject->id];


        // rating comment save here

        $imageRatingArray['CountC'] =intval($rowObject->CountC);
        $imageRatingArray['CountR'] = intval($rowObject->CountR);
        $imageRatingArray['CountS'] = intval($rowObject->CountS);
        $imageRatingArray['Rating'] = intval($rowObject->Rating);
        $imageRatingArray['addCountS'] = intval($rowObject->addCountS);
        $imageRatingArray['addCountR1'] = intval($rowObject->addCountR1);
        $imageRatingArray['addCountR2'] = intval($rowObject->addCountR2);
        $imageRatingArray['addCountR3'] = intval($rowObject->addCountR3);
        $imageRatingArray['addCountR4'] = intval($rowObject->addCountR4);
        $imageRatingArray['addCountR5'] = intval($rowObject->addCountR5);

        $hasExif = true;
        $exifDataArray = array();

        if($rowObject->Exif == '' or $rowObject->Exif == NULL){
            $hasExif = false;
        }
        else if($rowObject->Exif != '' && $rowObject->Exif != '0'){
            $exifDataArray = @unserialize($rowObject->Exif);
        }

        // set exif data
        if($hasExif==false && empty($exifDataArray)){

            $imageRatingArray['Exif'] = cg_create_exif_data($rowObject->WpUpload);

            if(empty($imageRatingArray['Exif'])){
                $imageDataExifSerialized = 0;
                $imageRatingArray['Exif'] = 0;
            }else{
                $imageDataExifSerialized = serialize($imageRatingArray['Exif']);
            }

            global $wpdb;

            // Set table names
            $tablename = $wpdb->prefix . "contest_gal1ery";
            $wpdb->update(
                "$tablename",
                array('Exif' => $imageDataExifSerialized),
                array('id' => $rowObject->id),
                array('%s'),
                array('%d')
            );

        }else{
            $imageRatingArray['Exif'] = $exifDataArray;
        }

        // set rating data
        $jsonFile = $uploadFolder['basedir'].'/contest-gallery/gallery-id-'.$GalleryID.'/json/image-data/image-data-'.$rowObject->id.'.json';
        $fp = fopen($jsonFile, 'w');
        fwrite($fp, json_encode($imageRatingArray));
        fclose($fp);


        // das bedeutet as bild wurde vorher aktiviert und wieder deaktiviert
        if(!is_file($uploadFolder['basedir']."/contest-gallery/gallery-id-".$GalleryID."/json/image-comments/image-comments-".$rowObject->id.".json")){

            global $wpdb;
            $tablename_comments = $wpdb->prefix . "contest_gal1ery_comments";

            $imageCommentsArray = array();
            $imageComments = $wpdb->get_results("SELECT * FROM $tablename_comments WHERE pid = $rowObject->id ORDER BY id ASC");

            if(count($imageComments)){

                $imageCommentsArray = array();

                $count = 1;

                foreach($imageComments as $comment){

                    $imageCommentsArray[$count] = array();
                    $imageCommentsArray[$count]['date'] = date("Y/m/d, G:i",$comment->Timestamp);
                    $imageCommentsArray[$count]['timestamp'] = $comment->Timestamp;
                    $imageCommentsArray[$count]['name'] = $comment->Name;
                    $imageCommentsArray[$count]['comment'] = $comment->Comment;

                    $count++;

                }


            }

            $jsonFile = $uploadFolder['basedir']."/contest-gallery/gallery-id-".$GalleryID."/json/image-comments/image-comments-".$rowObject->id.".json";
            $fp = fopen($jsonFile, 'w');
            fwrite($fp, json_encode($imageCommentsArray));
            fclose($fp);

        }

        // das bedeutet as bild wurde vorher aktiviert und wieder deaktiviert
        if(!is_file($uploadFolder['basedir']."/contest-gallery/gallery-id-".$GalleryID."/json/image-comments/image-comments-".$rowObject->id.".json")){

            global $wpdb;
            $tablename_comments = $wpdb->prefix . "contest_gal1ery_comments";

            $imageCommentsArray = array();
            $imageComments = $wpdb->get_results("SELECT * FROM $tablename_comments WHERE pid = $rowObject->id ORDER BY id ASC");

            if(count($imageComments)){

                $imageCommentsArray = array();

                $count = 1;

                foreach($imageComments as $comment){

                    $imageCommentsArray[$count] = array();
                    $imageCommentsArray[$count]['date'] = date("Y/m/d, G:i",$comment->Timestamp);
                    $imageCommentsArray[$count]['timestamp'] = $comment->Timestamp;
                    $imageCommentsArray[$count]['name'] = $comment->Name;
                    $imageCommentsArray[$count]['comment'] = $comment->Comment;

                    $count++;

                }


            }

            $jsonFile = $uploadFolder['basedir']."/contest-gallery/gallery-id-".$GalleryID."/json/image-comments/image-comments-".$rowObject->id.".json";
            $fp = fopen($jsonFile, 'w');
            fwrite($fp, json_encode($imageCommentsArray));
            fclose($fp);

        }
        // leeres Info file wird kreiert falls noch nicht existiert
        if(!is_file($uploadFolder['basedir']."/contest-gallery/gallery-id-".$GalleryID."/json/image-info/image-info-".$rowObject->id.".json")){

            $jsonFile = $uploadFolder['basedir']."/contest-gallery/gallery-id-".$GalleryID."/json/image-info/image-info-".$rowObject->id.".json";
            $fp = fopen($jsonFile, 'w');
            fwrite($fp, json_encode(array()));
            fclose($fp);

        }

        return $imageArray;


    }
}