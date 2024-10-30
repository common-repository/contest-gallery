<?php
if(!defined('ABSPATH')){exit;}

$galeryID = intval($_REQUEST['action1']);
$pictureID = intval($_REQUEST['action2']);
$rateValue = intval($_REQUEST['action3']);
$type = $_REQUEST['action4'];
$alreadyVotedText = $_REQUEST['action5'];
$cg_show_image_check = $_REQUEST['action6'];


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

$Manipulate = $wpdb->get_var( "SELECT Manipulate FROM $tablename_pro_options WHERE GalleryID = '$galeryID'" );



//echo "<br>getRating-test: $getRating<br>";
//echo "<br>rating-test: $rating<br>";
//echo "<br>countR-test: $countR<br>";

//echo "getRating: $getRating";


if ($rateValue>6 or $rateValue<1){
    echo "Please do not manipulate!<br/>";
}
else {


    if($type=="slider"){
        $ratingDivStarClass = "cg_slider_rating_div_star";
        $ratingDivCountClass = "cg_slider_rating_div_count";
    }
    else if($type=="gallery"){
        $ratingDivStarClass = "cg_gallery_rating_div_star cg_slider_rating_div_star";
        $ratingDivCountClass = "cg_gallery_rating_div_count cg_slider_rating_div_count";
    }
    else{
        $ratingDivStarClass = "cg_show_image_div_rating";
        $ratingDivCountClass = "cg_show_image_div_count";
    }


    if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
        $ip = $_SERVER['HTTP_CLIENT_IP'];


    } else if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
    }
    else{
        $ip = $_SERVER['REMOTE_ADDR'];
    }



    $getOptions = $wpdb->get_row( "SELECT AllowGalleryScript, CheckLogin, AllowRating, ShowOnlyUsersVotes, IpBlock, VotesPerUser, HideUntilVote, RatingOutGallery, ContestEnd, ContestEndTime FROM $tablenameOptions WHERE id = '$galeryID'" );
    $ShowOnlyUsersVotes = $getOptions->ShowOnlyUsersVotes;
    $CheckLogin = $getOptions->CheckLogin;
    $AllowRating = $getOptions->AllowRating;
    $IpBlock = $getOptions->IpBlock;// ATTENTION! IpBlock means show only vote per Picture Configuration
    $VotesPerUser = $getOptions->VotesPerUser;
    $HideUntilVote = $getOptions->HideUntilVote;
    $RatingOutGallery = $getOptions->RatingOutGallery;
    $ContestEnd = $getOptions->ContestEnd;
    $ContestEndTime = $getOptions->ContestEndTime;
    $AllowGalleryScript = $getOptions->AllowGalleryScript;
    $countVotesOfUserPerGallery = 0;

    // pauschal alle auf 0 setzen damit kein php process fehler kommt
    $countR = 0;
    $countS = 0;
    $rating = 0;





    $unix = time();



    if(($unix > $ContestEndTime && $ContestEnd == 1) or $ContestEnd == 2){

        // Rückgabewerte 111 when photo contest ist zu ende. Nicht löschen.
        echo 111;die;


        ?>
        <script>

            var elem = document.getElementById('cg_photo_contest_is_over_ajax_request');
            elem.value = 1;

          //  var cg_photo_contest_over = <?php echo json_encode($cg_photo_contest_over);?>;

            if(jQuery( "#cg_slider_main_div" ).is(':visible')){
                jQuery( "#cg_ThePhotoContestIsOver_dialog" ).dialog({
                    appendTo: "#cg_slider_main_div",
                    closeText: "X",
                    minHeight: 0,
                    title: null
                });
            }
            else{

                if(jQuery( "#cg_main_div" ).is(':visible')){//show-image.php
                    jQuery( "#cg_ThePhotoContestIsOver_dialog" ).dialog({
                        appendTo: "#cg_main_div",
                        closeText: "X",
                        minHeight: 0,
                        title: null
                    });
                }
                else{
                    jQuery( "#cg_ThePhotoContestIsOver_dialog" ).dialog({
                        appendTo: "#mainCGdiv",
                        closeText: "X",
                        minHeight: 0,
                        title: null
                    });
                }


            }

            jQuery('#cg_slider_main_div .ui-button, #mainCGdiv .ui-button, #cg_main_div .ui-button').removeAttr('title');



        </script>
        <?php

        return false;

    }


    if($RatingOutGallery==1){

        $ratingStarCursorStyle = "cursor:pointer;";

    }
    else{

        $ratingStarCursorStyle = "cursor:pointer;";

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
			WHERE pid = %d and GalleryID = %d and WpUserId = %s and Rating >= %s
		",
                $pictureID,$galeryID,get_current_user_id(),1
            ) );
        }

        if($AllowRating==2){

            $getRatingPicture = $wpdb->get_var( $wpdb->prepare(
                "
			SELECT COUNT(*) AS NumberOfRows
			FROM $tablenameIP 
			WHERE pid = %d and GalleryID = %d and WpUserId = %s and RatingS = %s
		",
                $pictureID,$galeryID,get_current_user_id(),1
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
                WHERE pid = %d and GalleryID = %d and IP = %s and Rating >= %s
            ",
                $pictureID,$galeryID,$ip,1
            ) );
        }
        if($AllowRating==2){
            $getRatingPicture = $wpdb->get_var( $wpdb->prepare(
                "
                SELECT COUNT(*) AS NumberOfRows
                FROM $tablenameIP 
                WHERE pid = %d and GalleryID = %d and IP = %s and RatingS = %s
            ",
                $pictureID,$galeryID,$ip,1
            ) );
        }
    }

//echo "<br>getrating: $getRating<br>";



    if($VotesPerUser!=0 AND $VotesPerUser!=''){

        if ($CheckLogin == 1)
        {
            $countVotesOfUserPerGallery = $wpdb->get_var( $wpdb->prepare(
                "
						SELECT COUNT(*) AS NumberOfRows
						FROM $tablenameIP 
						WHERE GalleryID = %d and WpUserId = %s
					",
                $galeryID,get_current_user_id()
            ) );
        }
        else
        {
            $countVotesOfUserPerGallery = $wpdb->get_var( $wpdb->prepare(
                "
						SELECT COUNT(*) AS NumberOfRows
						FROM $tablenameIP 
						WHERE GalleryID = %d and IP = %s
					",
                $galeryID,$ip
            ) );
        }

    }

    if($ShowOnlyUsersVotes!=1){

        $getTotalRating = $wpdb->get_row( "SELECT CountR, Rating, CountS FROM $tablename WHERE id = '$pictureID' and GalleryID = '$galeryID'" );

        $rating = $getTotalRating->Rating;
        $countR = $getTotalRating->CountR;
        $countS = $getTotalRating->CountS;

    }




    // 4 Varianten hier möglich wenn andere Einstellungen getroffen wurden als standard

    // Prüfen für Rating mit einem Stern und nicht eingeloggtem User
    if($ShowOnlyUsersVotes==1 && $CheckLogin!=1 && $AllowRating==2){

        $countS = $wpdb->get_var( $wpdb->prepare(
            "
							SELECT COUNT(*) AS NumberOfRows
							FROM $tablenameIP 
							WHERE GalleryID = %d and IP = %s and RatingS = %d and pid = %d
						",
            $galeryID,$ip,1,$pictureID
        ) );

    }

    // Prüfen für Rating mit einem Stern und eingeloggtem User
    if($ShowOnlyUsersVotes==1 && $CheckLogin==1 && $AllowRating==2){

        if(is_user_logged_in()){

            $countS = $wpdb->get_var( $wpdb->prepare(
                "
								SELECT COUNT(*) AS NumberOfRows
								FROM $tablenameIP
								WHERE GalleryID = %d and WpUserId = %s and RatingS = %d and pid = %d
							",
                $galeryID,get_current_user_id(),1,$pictureID
            ) );

            $countVotesOfUserPerGallery = $wpdb->get_var( $wpdb->prepare(
                "
								SELECT COUNT(*) AS NumberOfRows
								FROM $tablenameIP
								WHERE GalleryID = %d and WpUserId = %s and RatingS = %d
							",
                $galeryID,get_current_user_id(),1
            ) );
        }
    }

    // Prüfen für Rating mit fünf Sternen und nicht eingeloggtem User. countR und rating ist hier notwendig zu wissen
    if($ShowOnlyUsersVotes==1 && $CheckLogin!=1 && $AllowRating==1){

        $countR = $wpdb->get_var( $wpdb->prepare(
            "
							SELECT COUNT(*) AS NumberOfRows
							FROM $tablenameIP 
							WHERE GalleryID = %d and IP = %s and Rating >= %d and pid = %d
						",
            $galeryID,$ip,1,$pictureID
        ) );

        $rating = $wpdb->get_var( $wpdb->prepare(
            "
							SELECT SUM(Rating)
							FROM $tablenameIP 
							WHERE GalleryID = %d and IP = %s and Rating >= %d and pid = %d
						",
            $galeryID,$ip,1,$pictureID
        ) );

    }


    // Prüfen für Rating mit fünf Sternen und nicht eingeloggtem User. countR und rating ist hier notwendig zu wissen --- ENDE

    // Prüfen für Rating mit fünf Sternen und eingeloggtem User. countR und rating ist hier notwendig zu wissen

    if($ShowOnlyUsersVotes==1 && $CheckLogin==1 && $AllowRating==1){

        if(is_user_logged_in()){

            $countR = $wpdb->get_var( $wpdb->prepare(
                "
								SELECT COUNT(*) AS NumberOfRows
								FROM $tablenameIP
								WHERE GalleryID = %d and WpUserId = %s and Rating >= %d and pid = %d
							",
                $galeryID,get_current_user_id(),1,$pictureID
            ) );

            $rating = $wpdb->get_var( $wpdb->prepare(
                "
								SELECT SUM(Rating)
								FROM $tablenameIP
								WHERE GalleryID = %d and WpUserId = %s and Rating >= %d and pid = %d
							",
                $galeryID,get_current_user_id(),1,$pictureID
            ) );

        }

        $countVotesOfUserPerGallery = $wpdb->get_var( $wpdb->prepare(
            "
								SELECT COUNT(*) AS NumberOfRows
								FROM $tablenameIP
								WHERE GalleryID = %d and WpUserId = %s and Rating >= %d
							",
            $galeryID,get_current_user_id(),1
        ) );

    }


    // Prüfen für Rating mit fünf Sternen und eingeloggtem User. countR und rating ist hier notwendig zu wissen --- ENDE





    $starON = plugins_url( '/../css/star_48.png', __FILE__ );
    $starOFF = plugins_url( '/../css/star_off_48.png', __FILE__ );


// ATTENTION!!! IpBlock means show only vote per Picture Configuration
    if (!empty($getRatingPicture) and $IpBlock==1){

        echo "<input type='hidden' class='cg_check_voted' value='1' id='cg_check_voted$pictureID'>";

        if($rateValue<=5 and $rateValue>=1){

            if($ShowOnlyUsersVotes!=1 && $Manipulate==1){
                $addCountRrow = $wpdb->get_row( "SELECT addCountR1, addCountR2, addCountR3, addCountR4, addCountR5 FROM $tablename WHERE id = '$pictureID'" );
                $addCountR1 = $addCountRrow->addCountR1;
                $addCountR2 = $addCountRrow->addCountR2;
                $addCountR3 = $addCountRrow->addCountR3;
                $addCountR4 = $addCountRrow->addCountR4;
                $addCountR5 = $addCountRrow->addCountR5;
                $countR = $countR+$addCountR1+$addCountR2+$addCountR3+$addCountR4+$addCountR5;
                if($countR<0){
                    $countR = 0;
                }

                // Hier fängt es neue an! rating und ratingValue wurden nicht verwendet!
                $cumulatedRating = $rating+$addCountR1*1+$addCountR2*2+$addCountR3*3+$addCountR4*4+$addCountR5*5;
                $newCountR = $countR;
                $newRating = round($cumulatedRating/$newCountR,0);

            }
            else{

                // Hier fängt es neue an! rating und ratingValue wurden nicht verwendet!
                $cumulatedRating = $rating;

                $newCountR = $countR;

                $newRating = round($cumulatedRating/$newCountR,0);

            }




       //     echo "<input type='hidden' id='rate_picture' value='on' />";


            if($newRating>=1){$star1 = "cgin$pictureID-1"; $star1img = $starON;}
            else{$star1 = "cgio$pictureID-1"; $star1img = $starOFF;}
            if($newRating>=2){$star2 = "cgin$pictureID-2";$star2img = $starON;}
            else{$star2 = "cgio$pictureID-2"; $star2img = $starOFF;}
            if($newRating>=3){$star3 = "cgin$pictureID-3";$star3img = $starON;}
            else{$star3 = "cgio$pictureID-3"; $star3img = $starOFF;}
            if($newRating>=4){$star4 = "cgin$pictureID-4";$star4img = $starON;}
            else{$star4 = "cgio$pictureID-4"; $star4img = $starOFF;}
            if($newRating>=5){$star5 = "cgin$pictureID-5";$star5img = $starON;}
            else{$star5 = "cgio$pictureID-5"; $star5img = $starOFF;}



            echo "<div class='$ratingDivStarClass'><img src='$star1img' class='$star1' alt='1' style='$ratingStarCursorStyle' id='cg_rate_star$pictureID'></div>";
            echo "<div class='$ratingDivStarClass'><img src='$star2img' class='$star2' alt='2' style='$ratingStarCursorStyle' id='cg_rate_star$pictureID'></div>";
            echo "<div class='$ratingDivStarClass'><img src='$star3img' class='$star3' alt='3' style='$ratingStarCursorStyle' id='cg_rate_star$pictureID'></div>";
            echo "<div class='$ratingDivStarClass'><img src='$star4img' class='$star4' alt='4' style='$ratingStarCursorStyle' id='cg_rate_star$pictureID'></div>";
            echo "<div class='$ratingDivStarClass cg_gallery_rating_image_five_star_last_child'><img src='$star5img' class='$star5' alt='5' id='cg_rate_star$pictureID' style='$ratingStarCursorStyle'></div>";
            echo "<div class='$ratingDivCountClass'>$newCountR</div>";

            //echo "$alreadyVotedText";
            echo "<input type='hidden' id='cg_AlreadyRated' value='".$alreadyVotedText."'>";

        }

        if($rateValue==6){

            if($ShowOnlyUsersVotes!=1 && $Manipulate==1){
                $addCountS = $wpdb->get_var( "SELECT addCountS FROM $tablename WHERE id = '$pictureID'" );
                $countS = $countS+$addCountS;
                if($countS<0){
                    $countS = 0;
                }
            }

            if($countS>0){$star6 = "cgin$pictureID-6"; $star1img = $starON;}
            else{$star6 = "cgio$pictureID-6"; $star1img = $starOFF;}

            echo "<div class='$ratingDivStarClass'><img src='$star1img' class='$star6' alt='6' id='cg_rate_star$pictureID' style='$ratingStarCursorStyle'></div>";
            echo "<div class='$ratingDivCountClass'>$countS</div>";
            echo "<input type='hidden' id='cg_AlreadyRated' value='".$alreadyVotedText."'>";
        }



//echo "<br>alreadyVoted: $alreadyVotedText<br>";

        ?>
        <script>

            var cgVoted = document.getElementById("cg_AlreadyRated").value;

            //	console.log(ip);

            var countS = <?php echo json_encode($countS);?>;
            var countR = <?php echo json_encode($newCountR);?>;
            var rating = <?php echo json_encode($newRating);?>;
            var count = cgJsClass.slider.slide.objects.allCounts[<?php echo json_encode($pictureID);?>];

            cgJsClass.slider.slide.values.ratingImage[count] = rating;
            cgJsClass.slider.slide.values.countRatingQuantity[count] = countR;
            cgJsClass.slider.slide.values.countRatingSQuantity[count] = countS;

        //    console.log(cgJsClass.slider.slide.values.ratingImage[count]);
       //     console.log(cgJsClass.slider.slide.values.countRatingQuantity[count]);
        //    console.log(cgJsClass.slider.slide.values.countRatingSQuantity[count]);


           // console.log(getRatingPicture);


            //	div.innerHTML = div.innerHTML + commentDate;

/*            $( "#cg_dialog" ).dialog({
                // appendTo: "#cg_slider_main_div",
                // position: { my: "center", at: "center", of: window },
                closeText: "X"
            });*/

            if(jQuery( "#cg_slider_main_div" ).is(':visible')){
                jQuery( "#cg_AlreadyRated_dialog" ).dialog({
                    appendTo: "#cg_slider_main_div",
                    closeText: "X",
                    minHeight: 0,
                    title: null
                });
            }
            else{

                if(jQuery( "#cg_main_div" ).is(':visible')){//show-image.php
                    jQuery( "#cg_AlreadyRated_dialog" ).dialog({
                        appendTo: "#cg_main_div",
                        closeText: "X",
                        minHeight: 0,
                        title: null
                    });
                }
                else{
                    jQuery( "#cg_AlreadyRated_dialog" ).dialog({
                        appendTo: "#mainCGdiv",
                        closeText: "X",
                        minHeight: 0,
                        title: null
                    });
                }


            }

            jQuery('#cg_slider_main_div .ui-button, #mainCGdiv .ui-button, #cg_main_div .ui-button').removeAttr('title');

        //    alert(cgVoted);

            /*
 alert(countR);
 alert(ratingPictureID);



	$(""+ratingPictureID+"").text("("+countR+")");*/


        </script>
        <?php

    }


    else if (($countVotesOfUserPerGallery >= $VotesPerUser) && ($VotesPerUser!=0)){

        echo "<input type='hidden' class='cg_check_voted' id='cg_check_voted$pictureID' value='1'>";

        if($rateValue<=5 and $rateValue>=1){

            if($Manipulate==1){
                $addCountRrow = $wpdb->get_row( "SELECT addCountR1, addCountR2, addCountR3, addCountR4, addCountR5 FROM $tablename WHERE id = '$pictureID'" );
                $addCountR1 = $addCountRrow->addCountR1;
                $addCountR2 = $addCountRrow->addCountR2;
                $addCountR3 = $addCountRrow->addCountR3;
                $addCountR4 = $addCountRrow->addCountR4;
                $addCountR5 = $addCountRrow->addCountR5;
                $countR = $countR+$addCountR1+$addCountR2+$addCountR3+$addCountR4+$addCountR5;
                if($countR<0){
                    $countR = 0;
                }
            }

            $rating = round($rating/$countR,0);

            if($rating>=1){$star1 = "cgin$pictureID-1"; $star1img = $starON;}
            else{$star1 = "cgio$pictureID-1"; $star1img = $starOFF;}
            if($rating>=2){$star2 = "cgin$pictureID-2";$star2img = $starON;}
            else{$star2 = "cgio$pictureID-2"; $star2img = $starOFF;}
            if($rating>=3){$star3 = "cgin$pictureID-3";$star3img = $starON;}
            else{$star3 = "cgio$pictureID-3"; $star3img = $starOFF;}
            if($rating>=4){$star4 = "cgin$pictureID-4";$star4img = $starON;}
            else{$star4 = "cgio$pictureID-4"; $star4img = $starOFF;}
            if($rating>=5){$star5 = "cgin$pictureID-5";$star5img = $starON;}
            else{$star5 = "cgio$pictureID-5"; $star5img = $starOFF;}

            if($countR>0){ echo '';}
            else{$countR=0;}


            echo "<div class='$ratingDivStarClass'><img src='$star1img' class='$star1' alt='1' id='cg_rate_star$pictureID' style='$ratingStarCursorStyle'></div>";
            echo "<div class='$ratingDivStarClass'><img src='$star2img' class='$star2' alt='2' id='cg_rate_star$pictureID' style='$ratingStarCursorStyle'></div>";
            echo "<div class='$ratingDivStarClass'><img src='$star3img' class='$star3' alt='3' id='cg_rate_star$pictureID' style='$ratingStarCursorStyle'></div>";
            echo "<div class='$ratingDivStarClass'><img src='$star4img' class='$star4' alt='4' id='cg_rate_star$pictureID' style='$ratingStarCursorStyle'></div>";
            echo "<div class='$ratingDivStarClass cg_gallery_rating_image_five_star_last_child'><img src='$star5img' class='$star5' alt='5' id='cg_rate_star$pictureID' style='$ratingStarCursorStyle'></div>";
            echo "<div class='$ratingDivCountClass'>$countR</div>";

            //echo "$alreadyVotedText";
            echo "<input type='hidden' id='cg_AlreadyRated' value='".$alreadyVotedText."'>";

        }

        if($rateValue==6){

            if($Manipulate==1){
                $addCountS = $wpdb->get_var( "SELECT addCountS FROM $tablename WHERE id = '$pictureID'" );
                $countS = $countS+$addCountS;
                if($countS<0){
                    $countS = 0;
                }
            }

            if($countS>0){$star6 = "cg_slider_star1"; $star1img = $starON;}
            else{$star6 = "cg_slider_star"; $star1img = $starOFF;$countS=0;}

            echo "<div class='$ratingDivStarClass'><img src='$star1img' class='$star6' alt='6' id='cg_rate_star$pictureID' style='$ratingStarCursorStyle'></div>";
            echo "<div class='$ratingDivCountClass'>$countS</div>";
            echo "<input type='hidden' id='cg_AlreadyRated' value='".$alreadyVotedText."'>";
        }



//echo "<br>alreadyVoted: $alreadyVotedText<br>";

        ?>
        <script>

        //    alert(2);

            var cgVoted = document.getElementById("cg_AllVotesUsed").value ;

            //	div.innerHTML = div.innerHTML + commentDate;


            //	var ip = <?php echo json_encode($ip);?>;
            //	console.log(ip);


           var ratingPictureID = <?php echo json_encode("#rating_cgd-".$pictureID);?>;

            var countR = <?php echo json_encode($countR);?>;
             var pictureID = <?php echo json_encode($pictureID);?>;

            var countS = <?php echo json_encode($countS);?>;


        //    var tagID = 'cg_img_order'+pictureID;
           // var elem = document.getElementById(tagID);
            var count = cgJsClass.slider.slide.objects.allCounts[<?php echo json_encode($pictureID);?>];
           // console.log('elem.value :'+elem.value );
        //    cgJsClass.slider.slide.values.countRatingSQuantity[elem.value]=countS;
         //   cgJsClass.slider.slide.values.cg_check_voted[elem.value]=1;


        var newCountR = <?php echo json_encode($rating);?>;



            cgJsClass.slider.slide.values.countRatingSQuantity[count]=countS;


            cgJsClass.slider.slide.values.ratingImage[count] = newCountR;
            cgJsClass.slider.slide.values.countRatingQuantity[count] = countR;
            cgJsClass.slider.slide.values.countRatingSQuantity[count] = countS;

           // console.log(count);
          //  console.log(cgJsClass.slider.slide.values.ratingImage[count]);
         //   console.log(cgJsClass.slider.slide.values.countRatingQuantity[count]);
          //  console.log(cgJsClass.slider.slide.values.countRatingSQuantity[count]);



            cgJsClass.slider.slide.values.cg_check_voted[count]=1;


           // alert(1);
            if(jQuery( "#cg_slider_main_div" ).is(':visible')){
                jQuery( "#cg_AllVotesUsed_dialog" ).dialog({
                    appendTo: "#cg_slider_main_div",
                    closeText: "X",
                    minHeight: 0,
                    title: null
                });
            }
            else{

                if(jQuery( "#cg_main_div" ).is(':visible')){//show-image.php
                    jQuery( "#cg_AllVotesUsed_dialog" ).dialog({
                        appendTo: "#cg_main_div",
                        closeText: "X",
                        minHeight: 0,
                        title: null
                    });
                }
                else{
                    jQuery( "#cg_AllVotesUsed_dialog" ).dialog({
                        appendTo: "#mainCGdiv",
                        closeText: "X",
                        minHeight: 0,
                        title: null
                    });
                }
            }

            jQuery('#cg_slider_main_div .ui-button, #mainCGdiv .ui-button').removeAttr('title');


        </script>
        <?php

    }






    else{



        if($rateValue<=5 and $rateValue>=1){

            //$wpdb->insert( $tablenameIP, array( 'id' => '', 'IP' => $ip, 'GalleryID' => $galeryID, 'pid' => $pictureID, 'Rating' => $rateValue ));

            // Prüfen für Rating mit einem Stern und eingeloggtem User

            if(is_user_logged_in()){
                $WpUserId = get_current_user_id();
            }
            else{
                $WpUserId=0;
            }

            $wpdb->query( $wpdb->prepare(
                "
							INSERT INTO $tablenameIP
							( id, IP, GalleryID, pid, Rating, WpUserId)
							VALUES ( %s,%s,%d,%d,%d,%d )
						",
                '',$ip,$galeryID,$pictureID,$rateValue,$WpUserId
            ) );



            //Achtung!!! Unbedingt machen! Ansonsten überschriebt das countS das Gesamtrating!!!
            if($ShowOnlyUsersVotes==1){
                $getTotalRating = $wpdb->get_row( "SELECT CountR, Rating FROM $tablename WHERE id = '$pictureID' and GalleryID = '$galeryID'" );
                $ratingForUpdate = $getTotalRating->Rating;
                $countRforUpdate = $getTotalRating->CountR;

                $cumulatedRating = $ratingForUpdate+$rateValue;
                $newCountR = $countRforUpdate+1;

            }
            else{
                $ratingForUpdate = $rating;
                $countRforUpdate = $countR;

                $cumulatedRating = $ratingForUpdate+$rateValue;
                $newCountR = $countRforUpdate+1;
            }



            //$querySET = "UPDATE $tablename SET Rating='$cumulatedRating', CountR='$newCountR' WHERE id = '$pictureID' ";
            //$updateSQL = $wpdb->query($querySET);

            $wpdb->update(
                "$tablename",
                array('Rating' => $cumulatedRating,'CountR' => $newCountR),
                array('id' => $pictureID),
                array('%d','%d'),
                array('%d')
            );


            if($ShowOnlyUsersVotes!=1 && $Manipulate==1){
                $addCountRrow = $wpdb->get_row( "SELECT addCountR1, addCountR2, addCountR3, addCountR4, addCountR5 FROM $tablename WHERE id = '$pictureID'" );
                $addCountR1 = $addCountRrow->addCountR1;
                $addCountR2 = $addCountRrow->addCountR2;
                $addCountR3 = $addCountRrow->addCountR3;
                $addCountR4 = $addCountRrow->addCountR4;
                $addCountR5 = $addCountRrow->addCountR5;
                $countR = $countR+$addCountR1+$addCountR2+$addCountR3+$addCountR4+$addCountR5;
                if($countR<0){
                    $countR = 0;
                }

                // Hier fängt es neue an! rating und ratingValue wurden nicht verwendet!
                $cumulatedRating = $rating+$rateValue+$addCountR1*1+$addCountR2*2+$addCountR3*3+$addCountR4*4+$addCountR5*5;
                $newCountR = $countR+1;
                $newRating = round($cumulatedRating/$newCountR,0);

            }
            else{

                // Hier fängt es neue an! rating und ratingValue wurden nicht verwendet!
                $cumulatedRating = $rating+$rateValue;

                $newCountR = $countR+1;

                $newRating = round($cumulatedRating/$newCountR,0);

            }




            echo "<input type='hidden' id='rate_picture' value='on' />";


            if($newRating>=1){$star1 = "cgin$pictureID-1"; $star1img = $starON;}
            else{$star1 = "cgio$pictureID-1"; $star1img = $starOFF;}
            if($newRating>=2){$star2 = "cgin$pictureID-2";$star2img = $starON;}
            else{$star2 = "cgio$pictureID-2"; $star2img = $starOFF;}
            if($newRating>=3){$star3 = "cgin$pictureID-3";$star3img = $starON;}
            else{$star3 = "cgio$pictureID-3"; $star3img = $starOFF;}
            if($newRating>=4){$star4 = "cgin$pictureID-4";$star4img = $starON;}
            else{$star4 = "cgio$pictureID-4"; $star4img = $starOFF;}
            if($newRating>=5){$star5 = "cgin$pictureID-5";$star5img = $starON;}
            else{$star5 = "cgio$pictureID-5"; $star5img = $starOFF;}


            echo "<input type='hidden' class='cg_check_voted' value='1' id='cg_check_voted$pictureID'>";
            echo "<div class='$ratingDivStarClass'><img src='$star1img' class='$star1' alt='1' id='cg_rate_star$pictureID' style='$ratingStarCursorStyle'></div>";
            echo "<div class='$ratingDivStarClass'><img src='$star2img' class='$star2' alt='2' id='cg_rate_star$pictureID' style='$ratingStarCursorStyle'></div>";
            echo "<div class='$ratingDivStarClass'><img src='$star3img' class='$star3' alt='3' id='cg_rate_star$pictureID' style='$ratingStarCursorStyle'></div>";
            echo "<div class='$ratingDivStarClass'><img src='$star4img' class='$star4' alt='4' id='cg_rate_star$pictureID' style='$ratingStarCursorStyle'></div>";
            echo "<div class='$ratingDivStarClass cg_gallery_rating_image_five_star_last_child'><img src='$star5img' class='$star5' alt='5' id='cg_rate_star$pictureID' style='$ratingStarCursorStyle'></div>";
            echo "<div class='$ratingDivCountClass'>$newCountR</div>";
            echo "<input type='hidden' class='cg_real_id' value='$pictureID'>";


            ?>

            <script>
              //  alert(3);

                var cg_show_image_check = <?php echo json_encode($cg_show_image_check);?>;
                // Prüfen ob single pic view
                if(cg_show_image_check!=1){

                    var pictureID = <?php echo json_encode($pictureID);?>;
                    var newCountR = <?php echo json_encode($newCountR);?>;
                    var count = cgJsClass.slider.slide.objects.allCounts[pictureID];
                    var newRating = <?php echo json_encode($newRating);?>;


                    cgJsClass.slider.slide.values.ratingImage[count] = newRating;
                    cgJsClass.slider.slide.values.countRatingQuantity[count] = newCountR;
                    cgJsClass.slider.slide.values.cg_check_voted[count] = 1;

                    var tagID = 'countRatingQuantity'+pictureID;
                    var elem = document.getElementById(tagID);
                    elem.value = newCountR;

                    // check voted hidden Feld wird als value 1 eingefügt, damit erkannt wird dass der user schon gevotet hat und nach dem schließen des sliders das gevotete renewt wird.
                    var tagID = 'cg_check_voted'+pictureID;
                    var elem = document.getElementById(tagID);
                    elem.value = "1";

                    var tagID = 'averageStarsRounded'+pictureID;
                    var elem = document.getElementById(tagID);
                    elem.value = newRating;


                }













            </script>
            <?php

        }

        if($rateValue==6){

            //$wpdb->insert( $tablenameIP, array( 'id' => '', 'IP' => $ip, 'GalleryID' => $galeryID, 'pid' => $pictureID, 'Rating' => $rateValue ));

            if(is_user_logged_in()){
                $WpUserId = get_current_user_id();
            }
            else{
                $WpUserId=0;
            }

            $wpdb->query( $wpdb->prepare(
                "
					INSERT INTO $tablenameIP
					( id, IP, GalleryID, pid, Rating, RatingS,WpUserId)
					VALUES ( %s,%s,%d,%d,%d,%d,%d )
				",
                '',$ip,$galeryID,$pictureID,0,1,$WpUserId
            ) );

            //Achtung!!! Unbedingt machen! Ansonsten überschriebt das countS das Gesamtrating!!!
            if($ShowOnlyUsersVotes==1){
                $countSforUpdate = $wpdb->get_var( "SELECT CountS FROM $tablename WHERE id = '$pictureID' and GalleryID = '$galeryID'" );
                $countSforUpdate++;
            }
            else{
                $countSforUpdate = $countS;
                $countSforUpdate++;
            }

            $countS++;


            $wpdb->update(
                "$tablename",
                array('CountS' => $countSforUpdate),
                array('id' => $pictureID),
                array('%d','%d'),
                array('%d')
            );

            if($ShowOnlyUsersVotes!=1 && $Manipulate==1){
                $addCountS = $wpdb->get_var( "SELECT addCountS FROM $tablename WHERE id = '$pictureID'" );
                $countS = $countS+$addCountS;
                if($countS<0){
                    $countS = 0;
                }
            }

            echo "<input type='hidden' id='rate_picture' value='on' />";
            echo "<input type='hidden' class='cg_check_voted' value='1' id='cg_check_voted$pictureID'>";

            $star6 = "cgin$pictureID-6"; $starON;

            echo "<div class='$ratingDivStarClass'><img src='$starON' class='$star6' alt='6' id='cg_rate_star$pictureID' style='$ratingStarCursorStyle'></div>";
            echo "<div class='$ratingDivCountClass'>$countS</div>";
            echo "<input type='hidden' class='cg_real_id' value='$pictureID'>";

            if($AllowGalleryScript==1){



            ?>

            <script>

             //   alert(4);

                // hidden value in input field, in show-gallery.php für einzelnes Bild generiert, wird gesetzt
                var countS = <?php echo json_encode($countS);?>;
                //alert(countS);

               // console.log(countS);

                var pictureID = <?php echo json_encode($pictureID);?>;
                //alert(pictureID);


                var tagID = 'countRatingSQuantity'+pictureID;
                var elem = document.getElementById(tagID);
                elem.value = countS;

                // check voted hidden Feld wird als value 1 eingefügt, damit erkannt wird dass der user schon gevotet hat und nach dem schließen des sliders das gevotete renewt wird.
                var tagID = 'cg_check_voted'+pictureID;
                var elem = document.getElementById(tagID);
                elem.value = "1";


           //     var tagID = 'cg_img_order'+pictureID;
             //   var elem = document.getElementById(tagID);
          //      console.log('elem.value :'+elem.value );

                var count = cgJsClass.slider.slide.objects.allCounts[<?php echo json_encode($pictureID);?>];


                cgJsClass.slider.slide.values.countRatingSQuantity[count]=countS;
                cgJsClass.slider.slide.values.cg_check_voted[count]=1;


            </script>
            <?php

            }


        }






    }

}


?>