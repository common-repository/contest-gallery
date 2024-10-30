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
    $VotesPerUser = intval($options['general']['VotesPerUser']);
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

    // Prüfen ob ein bestimmtes Bild von dem User bewertet wurde
    if ($CheckLogin == 1)
    {

        if($AllowRating==2){

            $getRatingPicture = $wpdb->get_var( $wpdb->prepare(
                "
			SELECT COUNT(*) AS NumberOfRows
			FROM $tablenameIP 
			WHERE pid = %d and GalleryID = %d and WpUserId = %s and RatingS = %s
		",
                $pictureID,$galeryID,$wpUserId,1
            ) );
        }


    }
    else
    {

        if($AllowRating==2){
            $getRatingPicture = $wpdb->get_var( $wpdb->prepare(
                "
                SELECT COUNT(*) AS NumberOfRows
                FROM $tablenameIP 
                WHERE pid = %d and GalleryID = %d and IP = %s and RatingS = %s
            ",
                $pictureID,$galeryID,$userIP,1
            ) );
        }
    }


    // Prüfen wieviele Bewertungen der user insgesamt abgegeben hat
    if($VotesPerUser!=0 AND $VotesPerUser!=''){

        if ($CheckLogin == 1)
        {
            $countVotesOfUserPerGallery = $wpdb->get_var( $wpdb->prepare(
                "
						SELECT COUNT(*) AS NumberOfRows
						FROM $tablenameIP 
						WHERE GalleryID = %d and WpUserId = %s and RatingS > %d
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
						WHERE GalleryID = %d and IP = %s and RatingS = %d
					",
                $galeryID,$userIP,1
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

                cgJsClass.gallery.rating.setRatingOneStar(pictureID,0,false,galeryID);

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

                cgJsClass.gallery.rating.setRatingOneStar(pictureID,0,false,galeryID,true);
                cgJsClass.gallery.function.message.show(cgJsClass.gallery.language.AllVotesUsed);
            }

        </script>
        <?php

    }

    else{

            // vote done!!! Save and forward

            // insert in tableIP
            $wpdb->query( $wpdb->prepare(
                "
					INSERT INTO $tablenameIP
					( id, IP, GalleryID, pid, Rating, RatingS,WpUserId)
					VALUES ( %s,%s,%d,%d,%d,%d,%d )
				",
                '',$userIP,$galeryID,$pictureID,0,1,$wpUserId
            ) );

            $countS = intval($ratingFileData['CountS'])+1;

            // update main table
            $wpdb->update(
                "$tablename",
                array('CountS' => $countS),
                array('id' => $pictureID),
                array('%d'),
                array('%d')
            );

            $fp = fopen($jsonFile, 'w');
            $ratingFileData['CountS'] = intval($countS);
            fwrite($fp,json_encode($ratingFileData));
            fclose($fp);

                ?>
            <script>

                var ContestEndTimeFromPhp = <?php echo json_encode($ContestEndTime);?>;
                if(cgJsClass.gallery.function.general.time.photoContestEndTimeCheck(gid,ContestEndTimeFromPhp)==true){
                    var pictureID = <?php echo json_encode($pictureID);?>;
                    var galeryID = <?php echo json_encode($galeryID);?>;

                    cgJsClass.gallery.rating.setRatingOneStar(pictureID,1,false,galeryID);
                }


            </script>
            <?php


    }

}


?>