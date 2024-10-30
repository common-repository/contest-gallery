<?php
if(!defined('ABSPATH')){exit;}

$galeryID = intval($_REQUEST['gid']);
$pictureID = intval($_REQUEST['pid']);
$rateValue = intval($_REQUEST['value']);

/*error_reporting(E_ALL);
ini_set('display_errors', 'On');
ini_set('error_reporting', E_ALL);*/
//$testLala = $_POST['lala'];

//------------------------------------------------------------
// ----------------------------------------------------------- Bilder bewerten ----------------------------------------------------------
//------------------------------------------------------------


$tablename = $wpdb->prefix ."contest_gal1ery";
$tablenameIP = $wpdb->prefix ."contest_gal1ery_ip";
$tablenameOptions = $wpdb->prefix ."contest_gal1ery_options";
$tablename_pro_options = $wpdb->prefix . "contest_gal1ery_pro_options";


$wp_upload_dir = wp_upload_dir();
$options = $wp_upload_dir['basedir'].'/contest-gallery/gallery-id-'.$galeryID.'/json/'.$galeryID.'-options.json';
$fp = fopen($options, 'r');
$options =json_decode(fread($fp,filesize($options)),true);
fclose($fp);


$jsonFile = $wp_upload_dir['basedir'].'/contest-gallery/gallery-id-'.$galeryID.'/json/image-data/image-data-'.$pictureID.'.json';
$fp = fopen($jsonFile, 'r');
$ratingFileData =json_decode(fread($fp,filesize($jsonFile)),true);
fclose($fp);


if ($rateValue>5 or $rateValue<1){
    echo "Please do not manipulate!<br/>";
}
else {

    if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
        $userIP = $_SERVER['HTTP_CLIENT_IP'];
    } else if (!empty($_SERVER['REMOTE_ADDR'])) {
        $userIP = $_SERVER['REMOTE_ADDR'];
    }
    else{
        $userIP = $_SERVER['HTTP_X_FORWARDED_FOR'];
    }

    // $getOptions = $wpdb->get_row( "SELECT AllowGalleryScript, CheckLogin, AllowRating, ShowOnlyUsersVotes, IpBlock, VotesPerUser, HideUntilVote, RatingOutGallery, ContestEnd, ContestEndTime FROM $tablenameOptions WHERE id = '$galeryID'" );
    $ShowOnlyUsersVotes = $options['general']['ShowOnlyUsersVotes'];
    $CheckLogin = $options['general']['CheckLogin'];
    $AllowRating = $options['general']['AllowRating'];
    $IpBlock = $options['general']['IpBlock'];// ATTENTION! IpBlock means show only vote per Picture Configuration
    $VotesPerUser = $options['general']['VotesPerUser'];
    $HideUntilVote = $options['general']['HideUntilVote'];
    $RatingOutGallery = $options['general']['RatingOutGallery'];
    $ContestEnd = $options['general']['ContestEnd'];
    $ContestEndTime = $options['general']['ContestEndTime'];
    $countVotesOfUserPerGallery = 0;


    if(is_user_logged_in()){
        $wpUserId = get_current_user_id();
    }
    else{
        $wpUserId=0;
    }

    // Sowohl Rating mit 5 Sternen wie auch Rating mit 1 Stern sollen von einander getrennt behandelt werden.
    // Deswegen die Abfragen mit if AllowRating ....
    if ($CheckLogin == 1)
    {
        if($AllowRating==1){
            $getRatingPicture = $wpdb->get_var( $wpdb->prepare(
                "
			SELECT COUNT(*) AS NumberOfRows
			FROM $tablenameIP
			WHERE pid = %d and GalleryID = %d and WpUserId = %s and Rating > %s
		",
                $pictureID,$galeryID,$wpUserId,0
            ) );
        }
    }
    else
    {
        if($AllowRating==1){
            $getRatingPicture = $wpdb->get_var( $wpdb->prepare(
                "
                SELECT COUNT(*) AS NumberOfRows
                FROM $tablenameIP 
                WHERE pid = %d and GalleryID = %d and IP = %s and Rating > %s
            ",
                $pictureID,$galeryID,$userIP,0
            ) );
        }
    }

    if($VotesPerUser!=0 AND $VotesPerUser!=''){

        if ($CheckLogin == 1)
        {

            $countVotesOfUserPerGallery = $wpdb->get_var( $wpdb->prepare(
                "
						SELECT COUNT(*) AS NumberOfRows
						FROM $tablenameIP 
						WHERE GalleryID = %d and WpUserId = %s and Rating > %d
					",
                $galeryID,$wpUserId,0
            ) );
        }
        else
        {

            $countVotesOfUserPerGallery = $wpdb->get_var( $wpdb->prepare(
                "
						SELECT COUNT(*) AS NumberOfRows
						FROM $tablenameIP 
						WHERE GalleryID = %d and IP = %s and Rating > %d
					",
                $galeryID,$userIP,0
            ) );
        }

    }

    // THREE CASES HERE:
    // 1. One vote per picture
    // 2. All votes used
    // 3. No restrictions. Vote always.


    // ATTENTION!!! IpBlock means show only vote per Picture Configuration
    if (!empty($getRatingPicture) and $IpBlock==1){

        // One vote per picture case
        // Picture already rated!!!!

        ?>
        <script>

            var ContestEndTimeFromPhp = <?php echo json_encode($ContestEndTime);?>;
            if(cgJsClass.gallery.function.general.time.photoContestEndTimeCheck(gid,ContestEndTimeFromPhp)==true){
                var pictureID = <?php echo json_encode($pictureID);?>;
                var galeryID = <?php echo json_encode($galeryID);?>;

                cgJsClass.gallery.rating.setRatingFiveStar(pictureID,0,0,false,galeryID);
                cgJsClass.gallery.function.message.show(cgJsClass.gallery.language.YouHaveAlreadyVotedThisPicture);
            }



        </script>
        <?php

    }
    else if (($countVotesOfUserPerGallery >= $VotesPerUser) && ($VotesPerUser!=0)){

        // All votes used case

        ?>
        <script>

            var ContestEndTimeFromPhp = <?php echo json_encode($ContestEndTime);?>;
            if(cgJsClass.gallery.function.general.time.photoContestEndTimeCheck(gid,ContestEndTimeFromPhp)==true){
                var pictureID = <?php echo json_encode($pictureID);?>;
                var galeryID = <?php echo json_encode($galeryID);?>;

                cgJsClass.gallery.rating.setRatingFiveStar(pictureID,0,0,false,galeryID,true);
                cgJsClass.gallery.function.message.show(cgJsClass.gallery.language.AllVotesUsed);
            }

        </script>
        <?php

    }

    else{

        // vote done!!! Save and forward

        // speichern in der IP Tabelle
        $wpdb->query( $wpdb->prepare(
            "
					INSERT INTO $tablenameIP
					( id, IP, GalleryID, pid, Rating, RatingS,WpUserId)
					VALUES ( %s,%s,%d,%d,%d,%d,%d )
				",
            '',$userIP,$galeryID,$pictureID,$rateValue,0,$wpUserId
        ) );


        // speichern in der Haupttabelle und im File

        $countR = intval($ratingFileData['CountR'])+1;
        $rating = intval($ratingFileData['Rating'])+intval($rateValue);

        // update main table
        $wpdb->update(
            "$tablename",
            array('CountR' => $countR,'Rating' => $rating),
            array('id' => $pictureID),
            array('%d'),
            array('%d')
        );

        $fp = fopen($jsonFile, 'w');
        $ratingFileData['CountR'] = intval($countR);
        $ratingFileData['Rating'] = intval($rating);
        fwrite($fp,json_encode($ratingFileData));
        fclose($fp);

        ?>
        <script>

            var ContestEndTimeFromPhp = <?php echo json_encode($ContestEndTime);?>;
            if(cgJsClass.gallery.function.general.time.photoContestEndTimeCheck(gid,ContestEndTimeFromPhp)==true){
                var pictureID = <?php echo json_encode($pictureID);?>;
                var rateValue = <?php echo json_encode($rateValue);?>;
                var galeryID = <?php echo json_encode($galeryID);?>;

                cgJsClass.gallery.rating.setRatingFiveStar(pictureID,1,parseInt(rateValue),false,galeryID);
            }



        </script>
        <?php


    }

}


?>