<?php
    //echo "<div id='mainCGallery' style='display:block;position:fix;float:left;'>";
    echo "<div id='mainCGallery' class='mainCGallery' >";
    //echo "<div id='mainCGallery' style='float:left;margin-top: -$DistancePicsV;'>";

    // weitergabe zur leichteren Formularabfrage, wird am ende der schleife 1 dazu addiert
    $i = 0;

    // Orientierung zur Vergabe von Klassen bei cg_image und cg_hide
    $r = 0;

    /*if($RandomSort==1){
        $cgRandomOrderAllIdsResult = "";
    }*/

$categoryClass = '';
$cg_hide  = '';
$cg_visible = '';


//print($picsSQL);
    foreach($picsSQL as $value){

        $r++;

        $id = $value->id;
        $rowid = $value->rowid;
        $Timestamp = $value->Timestamp.'_';
        $NamePic = $value->NamePic;
        $ImgType = $value->ImgType;
        $rating = $value->Rating;
        $countR = $value->CountR;
        $countC = $value->CountC;
        $countS = $value->CountS;
        $widthOriginalImg = $value->Width;
        $heightOriginalImg = $value->Height;
        $WpUpload = $value->WpUpload;
        $rThumb = $value->rThumb;
        $rSource = $value->rSource;
        $addCountS = $value->addCountS;
        $addCountR1 = $value->addCountR1;
        $addCountR2 = $value->addCountR2;
        $addCountR3 = $value->addCountR3;
        $addCountR4 = $value->addCountR4;
        $addCountR5 = $value->addCountR5;
        $imageCategory = $value->Category;




        $realId = $id;

        /*if($RandomSort==1){
            $cgRandomOrderAllIdsResult .= "$realId,";
        }*/

        $id = ($id+8)*2+100000;

        // 4 Varianten hier m�glich wenn andere Einstellungen getroffen wurden als standard

        // Pr�fen f�r Rating mit einem Stern und nicht eingeloggtem User
        if($ShowOnlyUsersVotes==1 && $CheckLogin!=1 && $AllowRating==2 || $HideUntilVote==1 && $CheckLogin!=1 && $AllowRating==2){

            //Achtung! Reihenfolge wichtig! $countShideUntilVote muss in diesem Fall den Gesamtwert zugewiesen bekommen
            if($HideUntilVote==1 && $ShowOnlyUsersVotes!=1){
                $countShideUntilVote = $countS;
            }

            $countS = $wpdb->get_var( $wpdb->prepare(
                "
								SELECT COUNT(*) AS NumberOfRows
								FROM $tablenameIP 
								WHERE GalleryID = %d and IP = %s and RatingS = %d and pid = %d
							",
                $galeryID,$userIP,1,$realId
            ) );

            if($HideUntilVote==1 && $ShowOnlyUsersVotes==1){
                $countShideUntilVote = $countS;
            }


        }

        // Pr�fen f�r Rating mit einem Stern und eingeloggtem User
        if($ShowOnlyUsersVotes==1 && $CheckLogin==1 && $AllowRating==2 || $HideUntilVote==1 && $CheckLogin==1 && $AllowRating==2){

            if(is_user_logged_in()){

                //Achtung! Reihenfolge wichtig! $countShideUntilVote muss in diesem Fall den Gesamtwert zugewiesen bekommen
                if($HideUntilVote==1 && $ShowOnlyUsersVotes!=1){
                    $countShideUntilVote = $countS;
                }

                $countS = $wpdb->get_var( $wpdb->prepare(
                    "
								SELECT COUNT(*) AS NumberOfRows
								FROM $tablenameIP
								WHERE GalleryID = %d and WpUserId = %s and RatingS = %d and pid = %d
							",
                    $galeryID,get_current_user_id(),1,$realId
                ) );

                if($HideUntilVote==1 && $ShowOnlyUsersVotes==1){
                    $countShideUntilVote = $countS;
                }
            }

            // Extra Condition f�r HideUntilVote
            if($HideUntilVote==1 && !is_user_logged_in()){
                $countS = 0;
            }

        }

        // Pr�fen f�r Rating mit f�nf Sternen und nicht eingeloggtem User. countR und rating ist hier notwendig zu wissen
        if($ShowOnlyUsersVotes==1 && $CheckLogin!=1 && $AllowRating==1 || $HideUntilVote==1 && $CheckLogin!=1 && $AllowRating==1){

            //Achtung! Reihenfolge wichtig! $countRhideUntilVote und $ratingHideUntilVote muss in diesem Fall den Gesamtwert zugewiesen bekommen
            if($HideUntilVote==1 && $ShowOnlyUsersVotes!=1){
                $countRhideUntilVote = $countR;
                $ratingHideUntilVote = $rating;
            }

            $countR = $wpdb->get_var( $wpdb->prepare(
                "
							SELECT COUNT(*) AS NumberOfRows
							FROM $tablenameIP 
							WHERE GalleryID = %d and IP = %s and Rating >= %d and pid = %d
						",
                $galeryID,$userIP,1,$realId
            ) );


            $rating = $wpdb->get_var( $wpdb->prepare(
                "
							SELECT SUM(Rating)
							FROM $tablenameIP 
							WHERE GalleryID = %d and IP = %s and Rating >= %d and pid = %d
						",
                $galeryID,$userIP,1,$realId
            ) );

            if($HideUntilVote==1 && $ShowOnlyUsersVotes==1){
                $countRhideUntilVote = $countR;
                $ratingHideUntilVote = $rating;
            }

        }

        // Pr�fen f�r Rating mit f�nf Sternen und nicht eingeloggtem User. countR und rating ist hier notwendig zu wissen --- ENDE

        // Pr�fen f�r Rating mit f�nf Sternen und eingeloggtem User. countR und rating ist hier notwendig zu wissen

        if($ShowOnlyUsersVotes==1 && $CheckLogin==1 && $AllowRating==1 || $HideUntilVote==1 && $CheckLogin==1 && $AllowRating==1){

            if(is_user_logged_in()){

                //Achtung! Reihenfolge wichtig! $countRhideUntilVote und $ratingHideUntilVote muss in diesem Fall den Gesamtwert zugewiesen bekommen
                if($HideUntilVote==1 && $ShowOnlyUsersVotes!=1){
                    $countRhideUntilVote = $countR;
                    $ratingHideUntilVote = $rating;
                }

                $countR = $wpdb->get_var( $wpdb->prepare(
                    "
								SELECT COUNT(*) AS NumberOfRows
								FROM $tablenameIP
								WHERE GalleryID = %d and WpUserId = %s and Rating >= %d and pid = %d
							",
                    $galeryID,get_current_user_id(),1,$realId
                ) );

                $rating = $wpdb->get_var( $wpdb->prepare(
                    "
								SELECT SUM(Rating)
								FROM $tablenameIP
								WHERE GalleryID = %d and WpUserId = %s and Rating >= %d and pid = %d
							",
                    $galeryID,get_current_user_id(),1,$realId
                ) );

                if($HideUntilVote==1 && $ShowOnlyUsersVotes==1){
                    $countRhideUntilVote = $countR;
                    $ratingHideUntilVote = $rating;
                }

            }

            // Extra Condition f�r HideUntilVote
            if($HideUntilVote==1 && !is_user_logged_in()){
                $countR = 0;
                $rating = 0;
            }

        }

        // Pr�fen f�r Rating mit f�nf Sternen und eingeloggtem User. countR und rating ist hier notwendig zu wissen --- ENDE



        // Ermitteln Anzahl der Bewertungen

        // Ermitteln wie die Stars angezeigt werden sollen beim hovern

        if($AllowRating==1){
            if($HideUntilVote==1){

                if ($countRhideUntilVote!=0){

                    if($ShowOnlyUsersVotes!=1 && $Manipulate==1){
                        $countR = $countR+$addCountR1+$addCountR2+$addCountR3+$addCountR4+$addCountR5;
                        $ratingCummulated = $rating+$addCountR1*1+$addCountR2*2+$addCountR3*3+$addCountR4*4+$addCountR5*5;
                        $averageStars = $ratingCummulated/$countR;
                        $averageStarsRounded = round($averageStars,0);
                    }
                    else{
                        $averageStars = $ratingHideUntilVote/$countRhideUntilVote;
                        $averageStarsRounded = round($averageStars,0);
                    }

                }
                else{$countRhideUntilVote=0; $averageStarsRounded = 0;}

                if($averageStarsRounded>=1){$starTest1 = $starOn;}
                else{$starTest1 = $starOff;}
                if($averageStarsRounded>=2){$starTest2 = $starOn;}
                else{$starTest2 = $starOff;}
                if($averageStarsRounded>=3){$starTest3 = $starOn;}
                else{$starTest3 = $starOff;}
                if($averageStarsRounded>=4){$starTest4 = $starOn;}
                else{$starTest4 = $starOff;}
                if($averageStarsRounded>=5){$starTest5 = $starOn;}
                else{$starTest5 = $starOff;}

            }
            else{

                if($ShowOnlyUsersVotes!=1 && $Manipulate==1){
                    $countR = $countR+$addCountR1+$addCountR2+$addCountR3+$addCountR4+$addCountR5;
                }

                if ($countR!=0){

                    if($ShowOnlyUsersVotes!=1 && $Manipulate==1){
                        $ratingCummulated = $rating+$addCountR1*1+$addCountR2*2+$addCountR3*3+$addCountR4*4+$addCountR5*5;
                        $averageStars = $ratingCummulated/$countR;
                        $averageStarsRounded = round($averageStars,0);
                    }
                    else{
                        $averageStars = $rating/$countR;
                        $averageStarsRounded = round($averageStars,0);
                    }


                    //echo "<br>averageStars: $averageStars<br>";
                }
                else{$countR=0; $averageStarsRounded = 0;}

                if($averageStarsRounded>=1){$starTest1 = $starOn;}
                else{$starTest1 = $starOff;}
                if($averageStarsRounded>=2){$starTest2 = $starOn;}
                else{$starTest2 = $starOff;}
                if($averageStarsRounded>=3){$starTest3 = $starOn;}
                else{$starTest3 = $starOff;}
                if($averageStarsRounded>=4){$starTest4 = $starOn;}
                else{$starTest4 = $starOff;}
                if($averageStarsRounded>=5){$starTest5 = $starOn;}
                else{$starTest5 = $starOff;}

            }
        }


        if($AllowRating==2){
            if($HideUntilVote==1){
                if($countShideUntilVote>0){$starCountS= $iconsURL.'/star_48_reduced.png';}
                else{$starCountS = $iconsURL.'/star_off_48_reduced.png';$countS=0;}
            }
            else{

                if($ShowOnlyUsersVotes!=1 && $Manipulate==1){
                    $countS = $addCountS+$countS;
                }

                if($countS>0){$starCountS= $iconsURL.'/star_48_reduced.png';}
                else{$starCountS = $iconsURL.'/star_off_48_reduced.png';$countS=0;}
            }
        }


        if(!empty($categories)){

            if($imageCategory>0){
                foreach($categories as $category){
                    if($imageCategory==$category->id){

                        $categoryClass = 'cg_cat_'.$category->Name;

                        if(strpos($categoryClass, ' ') !== false){

                            $categoryClass = str_replace(" ", "_", $categoryClass);

                        }

                        if($category->Active==1){
                            $cg_hide = "";
                            $cg_visible = "cg_visible";
                        }
                        else{
                            $cg_hide = "cg_hide";
                            $cg_visible = "";
                        }
                    }
                }
            }
            else{
                $categoryClass = 'cg_cat_other_cg_gal';
                if($ShowOther==1){
                    $cg_hide = "";
                    $cg_visible = "cg_visible";
                }
                else{
                    $cg_hide = "cg_hide";
                    $cg_visible = "";
                }
            }


        }

        if($InfiniteScroll==1){
            $cg_hide_load = '';
        }
        else{
            $cg_hide_load = '';
        }


        //ACHTUNG! Float left darf hier auf keinen Fall gemacht werden. Ansonsten fehlerhaftes verhalten der Divs in Thumb view!!!
        echo "<div style='cursor: pointer;display:none;' data-cat='$categoryClass' data-cg-id='$realId' data-cat-id='$imageCategory' class='cg_show $categoryClass $cg_hide $cg_visible $cg_hide_load' id='cg_show$realId'>";
        //ACHTUNG! Float left darf hier auf keinen Fall gemacht werden. Ansonsten fehlerhaftes verhalten der Divs in Thumb view!!!
//Facebook Iframe wird hier angezeigt





//Facebook Iframe wird hier angezeigt --- ENDE


        $cg_check_1600_width = "$cg_upload_dir/$Timestamp$NamePic-1600width.$ImgType";
        $cg_check_1920_width = "$cg_upload_dir/$Timestamp$NamePic-1920width.$ImgType";


        if(!file_exists($cg_check_1600_width)){$cg_check_1600_width=0;}
        else{$cg_check_1600_width="$uploads/$Timestamp$NamePic-1600width.$ImgType";}
        if(!file_exists($cg_check_1920_width)){$cg_check_1920_width=0;}
        else{$cg_check_1920_width="$uploads/$Timestamp$NamePic-1920width.$ImgType";}

        if(file_exists("$cg_upload_dir/".$Timestamp."".$NamePic."413.html")){
            echo '<input type="hidden" id="cg_fb_reload'.$realId.'" value="413">';
            $urlForFacebook = "$uploads/".$Timestamp.$NamePic."413.html";
        }
        else{
            echo '<input type="hidden" id="cg_fb_reload'.$realId.'" value="1">';
            $urlForFacebook = "$uploads/".$Timestamp.$NamePic.".html";;
        }
        //	$dirHTML = $uploadFolder['basedir'].'/contest-gallery/gallery-id-'.$GalleryID.'/'.$Timestamp."_".$NamePic."413.html";

        // Feld zum speichern von Status ob das aktuelle Bild ein neues oder altes ist



        if($WpUpload!=0){

            $sourceOriginalImgUrl = $wpdb->get_var("SELECT guid FROM $table_posts WHERE ID = '$WpUpload'");

        }
        //R�ckw�rtskompatiblit�t zu hochgeladenen Bildern aus versionen vor 5.00
        else{
            $sourceOriginalImgBase = "$cg_upload_dir/".$Timestamp.$NamePic.'.'.$ImgType; // Pfad zum Bilderordner angeben
            list($widthOriginalImg, $heightOriginalImg) = getimagesize($sourceOriginalImgBase); // Breite und H�he von original Image
            $sourceOriginalImgUrl = $uploads."/".$Timestamp.$NamePic.".".$ImgType;
        }


        $imgSrcThumb = wp_get_attachment_image_src($WpUpload, 'thumbnail');
        $imgSrcThumb = $imgSrcThumb[0];
        $imgSrcMedium = wp_get_attachment_image_src($WpUpload, 'medium');
        $imgSrcMedium = $imgSrcMedium[0];
        $imgSrcLarge = wp_get_attachment_image_src($WpUpload, 'large');
        $imgSrcLarge = $imgSrcLarge[0];
        $imgSrcOriginal = wp_get_attachment_image_src($WpUpload, 'full');
        $imgSrcOriginal = $imgSrcOriginal[0];

        $cgImageThumbRotation = "cg".$rThumb."degree";
        $cgImageSourceRotation = "cg".$rSource."degree";

        // cg_hide Klasse ist die Div Box zum Hovern
        echo <<<HEREDOC

        <input type="hidden" class="realId" value="$realId">
        <input type="hidden" id="cg_img_order$realId" value="$r">
        
        <input type="hidden" class="DistancePics" value="$DistancePics">
        <input type="hidden" class="DistancePicsV" value="$DistancePicsV">
        <input type="hidden" id="widthOriginalImg$realId" class="widthOriginalImg" value="$widthOriginalImg">
        <input type="hidden" id="heightOriginalImg$realId" class="heightOriginalImg" value="$heightOriginalImg">
        <input type="hidden" class="imgSrcThumb" value="$imgSrcThumb">
        <input type="hidden" class="imgSrcThumbWidth" value="$thumbnail_size_w">
        <input type="hidden" class="imgSrcMedium" value="$imgSrcMedium">
        <input type="hidden" class="imgSrcMediumWidth" value="$medium_size_w">
        <input type="hidden" class="imgSrcLarge" value="$imgSrcLarge">
        <input type="hidden" class="imgSrcLargeWidth" value="$large_size_w">
        <input type="hidden" class="imgSrcOriginal" value="$imgSrcOriginal">
        <input type="hidden" class="cgRotationThumbNumber" value="$rThumb">
        <input type="hidden" class="cgRotationSourceNumber" value="$rSource">
        <input type="hidden" class="cgImageThumbRotation" value="$cgImageThumbRotation">
        <input type="hidden" class="cgImageSourceRotation" value="$cgImageSourceRotation">
        <input type="hidden" id="urlForFacebook$realId" class="urlForFacebook" value="$urlForFacebook">
	

HEREDOC;

        if($AllowRating==1){
            echo '<input type="hidden" class="averageStarsRounded" id="averageStarsRounded'.$realId.'" value="'.@$averageStarsRounded.'">';
        }

        if($HideUntilVote==1){

            if($ShowOnlyUsersVotes!=1 && $Manipulate==1){
                $countShideUntilVote = $addCountS+$countShideUntilVote;
                $countRhideUntilVote = $addCountR1+$addCountR2+$addCountR3+$addCountR4+$addCountR5+$countRhideUntilVote;
            }


            echo "<input type='hidden' id='countRatingQuantity$realId' value='".@$countRhideUntilVote."'>";
            echo "<input type='hidden' id='countRatingSQuantity$realId' value='".@$countShideUntilVote."'>";

        }
        else{
            echo "<input type='hidden' id='countRatingQuantity$realId' value='".@$countR."'>";
            echo "<input type='hidden' id='countRatingSQuantity$realId' value='".@$countS."'>";
        }


        echo "<input type='hidden' id='countCommentsQuantity$realId' value='".@$countC."'>";


// Das wird von PHP erzeugt und bleibt
        if($ForwardToURL==1 AND $cg_Use_as_URL==1 AND ($ForwardFrom==2 or $ForwardFrom==1)){
            // URL ermitteln zu der wetiergeleitet werden soll
            @$cg_img_url = $wpdb->get_var("SELECT Short_Text FROM $tablenameEntries, $tablename_f_input WHERE $tablenameEntries.f_input_id = $tablename_f_input.id
						AND $tablename_f_input.Use_as_URL = '1' AND  $tablenameEntries.pid='$realId'");


            echo "<input type='hidden' class='cg_img_url' id='cg_img_url$realId' value='$cg_img_url'>";
        }

        echo "<div class='cg_append' id='cg_append$realId'>";



        if($FullSizeImageOutGallery==1){

            //$hregCGimage = 	"<a href='".$uploads."/".$Timestamp.$NamePic.".".$ImgType."' >";
            $hregCGimageValue = $sourceOriginalImgUrl;
            //if($FullSizeImageOutGalleryNewTab==1){$hregCGimageTargetBlank = "target='_blank'";}
            //else{$hregCGimageTargetBlank = "";}
        }
        else{


            //$hregCGimage = "<a href='$siteURL&picture_id=$id&1=".$getLook."&2=".$getOrder."&3=".$getStart."#cg-begin' $hregCGimageTargetBlank>";
            $hregCGimageValue = "$siteURL&picture_id=$id&1=".$getLook."&2=".$getOrder."&3=".$getStart."#cg-begin";

        }

        echo "</div>";



        echo "<input type='hidden'  class='hrefCGpic' value='".$hregCGimageValue."' >";

// Slider Inhalt versteckt anzeigen

        if($AllowGalleryScript==1){

            if ($selectFormInput == true) {

                echo "<div class='cg_user_input' style='display:none !important;margin:0px;padding:0px;'>";
                //$countFormFields = 0;
                foreach($selectContentFieldArray as $key => $formvalue){


                    // 1. Feld Typ
                    // 2. ID des Feldes in F_INPUT
                    // 3. Feld Reihenfolge
                    // 4. Feld Content

                    // hier sollte von get-data aus vorher �berpr�ft werden ob dieses feld �berhaupt angezeigt werden soll($ShowSliderInputID ?)

                    if(@$formvalue=='text-f'){$fieldtype="nf"; $i=1; continue;}
                    if(@$fieldtype=="nf" AND $i==1){$formFieldId=$formvalue; $i=2; continue;}
                    if(@$fieldtype=="nf" AND $i==2){$fieldOrder=$formvalue; $i=3; continue;}
                    if (@$fieldtype=="nf" AND $i==3) {

                        //$getEntries = $wpdb->get_var( "SELECT Short_Text FROM $tablenameentries WHERE pid='$id' AND f_input_id = '$formFieldId'");


                        // Pr�fen ob das Feld im Slider angezeigt werden soll
                        //if(array_search($formFieldId, @$ShowSliderInputID)){$checked='checked';}
                        //else{$checked='';}



                        $getEntries = $wpdb->get_var( $wpdb->prepare(
                            "
								SELECT Short_Text
								FROM $tablenameEntries 
								WHERE pid = %d and f_input_id = %d
							",
                            $realId,$formFieldId
                        ) );

                        if(!empty($getEntries)){
                            echo "<h4>".html_entity_decode(stripslashes($formvalue))."</h4>";
                            echo "<p>".html_entity_decode(stripslashes($getEntries))."</p>";
                        }

                        /*
                    if($ForwardToURL==1 AND $cg_Use_as_URL==1){

                    // Pr�fen ob das Feld genutzt werden soll als URL
                    @$cg_Use_as_URL_id = $wpdb->get_var("SELECT id FROM $tablename_f_input WHERE id='$formFieldId' and Use_as_URL='1'");


                            if(@$cg_Use_as_URL_id==$formFieldId){
                            echo "<input type='hidden' id='cg_img_url$realId' class='cg_img_url' value='$getEntries'>";
                            }

                    }	*/


                        $fieldtype='';

                        $i=0;

                    }
                    // 1. Feld Typ
                    // 2. ID des Feldes in F_INPUT
                    // 3. Feld Reihenfolge
                    // 4. Feld Content

                    // hier sollte von get-data aus vorher �berpr�ft werden ob dieses feld �berhaupt angezeigt werden soll($ShowSliderInputID ?)

                    if(@$formvalue=='url-f'){$fieldtype="url"; $i=1; continue;}
                    if(@$fieldtype=="url" AND $i==1){$formFieldId=$formvalue; $i=2; continue;}
                    if(@$fieldtype=="url" AND $i==2){$fieldOrder=$formvalue; $i=3; continue;}
                    if (@$fieldtype=="url" AND $i==3) {

                        //$getEntries = $wpdb->get_var( "SELECT Short_Text FROM $tablenameentries WHERE pid='$id' AND f_input_id = '$formFieldId'");


                        // Pr�fen ob das Feld im Slider angezeigt werden soll
                        //if(array_search($formFieldId, @$ShowSliderInputID)){$checked='checked';}
                        //else{$checked='';}

                        $getEntries = $wpdb->get_var( $wpdb->prepare(
                            "
								SELECT Short_Text
								FROM $tablenameEntries 
								WHERE pid = %d and f_input_id = %d
							",
                            $realId,$formFieldId
                        ) );

                        if(!empty($getEntries)){
                            echo "<a href='".html_entity_decode(stripslashes($getEntries))."' target='_blank' class='cg_user_input_url'><h4>".html_entity_decode(stripslashes($formvalue))."</h4></a>";
                        }

                        /*
                    if($ForwardToURL==1 AND $cg_Use_as_URL==1){

                    // Pr�fen ob das Feld genutzt werden soll als URL
                    @$cg_Use_as_URL_id = $wpdb->get_var("SELECT id FROM $tablename_f_input WHERE id='$formFieldId' and Use_as_URL='1'");


                            if(@$cg_Use_as_URL_id==$formFieldId){
                            echo "<input type='hidden' id='cg_img_url$realId' class='cg_img_url' value='$getEntries'>";
                            }

                    }	*/


                        $fieldtype='';

                        $i=0;

                    }

                    // 1. Feld Typ
                    // 2. ID des Feldes in F_INPUT
                    // 3. Feld Reihenfolge
                    // 4. Feld Content

                    // hier sollte von get-data aus vorher �berpr�ft werden ob dieses feld �berhaupt angezeigt werden soll($ShowSliderInputID ?)

                    if(@$formvalue=='select-f'){$fieldtype="se"; $i=1; continue;}
                    if(@$fieldtype=="se" AND $i==1){$formFieldId=$formvalue; $i=2; continue;}
                    if(@$fieldtype=="se" AND $i==2){$fieldOrder=$formvalue; $i=3; continue;}
                    if (@$fieldtype=="se" AND $i==3) {

                        //$getEntries = $wpdb->get_var( "SELECT Short_Text FROM $tablenameentries WHERE pid='$id' AND f_input_id = '$formFieldId'");


                        // Pr�fen ob das Feld im Slider angezeigt werden soll
                        //if(array_search($formFieldId, @$ShowSliderInputID)){$checked='checked';}
                        //else{$checked='';}



                        $getEntries = $wpdb->get_var( $wpdb->prepare(
                            "
								SELECT Short_Text
								FROM $tablenameEntries 
								WHERE pid = %d and f_input_id = %d
							",
                            $realId,$formFieldId
                        ) );

                        if(!empty($getEntries)){
                            echo "<h4>".html_entity_decode(stripslashes($formvalue))."</h4>";
                            echo "<p>".html_entity_decode(stripslashes($getEntries))."</p>";
                        }

                        /*
                    if($ForwardToURL==1 AND $cg_Use_as_URL==1){

                    // Pr�fen ob das Feld genutzt werden soll als URL
                    @$cg_Use_as_URL_id = $wpdb->get_var("SELECT id FROM $tablename_f_input WHERE id='$formFieldId' and Use_as_URL='1'");


                            if(@$cg_Use_as_URL_id==$formFieldId){
                            echo "<input type='hidden' id='cg_img_url$realId' class='cg_img_url' value='$getEntries'>";
                            }

                    }	*/


                        $fieldtype='';

                        $i=0;

                    }


                    if(@$formvalue=='selectc-f'){$fieldtype="sec"; $i=1; continue;}
                    if(@$fieldtype=="sec" AND $i==1){$formFieldId=$formvalue; $i=2; continue;}
                    if(@$fieldtype=="sec" AND $i==2){$fieldOrder=$formvalue; $i=3; continue;}
                    if (@$fieldtype=="sec" AND $i==3) {



                        if($imageCategory>0){

                            foreach($categories as $category){

                                if($category->id==$imageCategory){
                                    echo "<h4>".html_entity_decode(stripslashes($formvalue))."</h4>";
                                    echo "<p>".html_entity_decode(stripslashes($category->Name))."</p>";
                                }
                            }

                        }

                        $fieldtype='';

                        $i=0;

                    }

                    if(@$formvalue=='email-f'){@$fieldtype="ef";  $i=1; continue;}
                    if(@$fieldtype=="ef" AND $i==1){@$formFieldId=@$formvalue; $i=2; continue;}
                    if(@$fieldtype=="ef" AND $i==2){@$fieldOrder=@$formvalue; $i=3; continue;}
                    if (@$fieldtype=='ef' AND $i==3) {

                        //$getEntries = $wpdb->get_var( "SELECT Short_Text FROM $tablenameentries WHERE pid='$id' AND f_input_id = '$formFieldId'");

                        $getEntries = $wpdb->get_var( $wpdb->prepare(
                            "
								SELECT Short_Text
								FROM $tablenameEntries 
								WHERE pid = %d and f_input_id = %d
							",
                            $realId,$formFieldId
                        ) );

                        if(!empty($getEntries)){
                            echo "<h4>".html_entity_decode(stripslashes($formvalue))."</h4>";
                            echo "<p>".html_entity_decode(stripslashes($getEntries))."</p>";
                        }

                        $fieldtype='';

                        $i=0;

                    }

                    if($formvalue=='comment-f'){$fieldtype="kf"; $i=1; continue;}
                    if($fieldtype=="kf" AND $i==1){$formFieldId=$formvalue; $i=2; continue;}
                    if($fieldtype=="kf" AND $i==2){$fieldOrder=$formvalue; $i=3; continue;}
                    if ($fieldtype=='kf' AND $i==3) {

                        //$getEntries = $wpdb->get_var( "SELECT Long_Text FROM $tablenameentries WHERE pid='$id' AND f_input_id = '$formFieldId'");

                        $getEntries = $wpdb->get_var( $wpdb->prepare(
                            "
								SELECT Long_Text
								FROM $tablenameEntries 
								WHERE pid = %d and f_input_id = %d
							",
                            $realId,$formFieldId
                        ) );





                        if(!empty($getEntries)){
                            echo "<h4>".html_entity_decode(stripslashes($formvalue))."</h4>";
                            echo "<p>".html_entity_decode(stripslashes($getEntries))."</p>";
                        }

                        $fieldtype='';

                        $i=0;

                    }


                }



                echo "</div>";

            }

        }


        //


        if(@$Field1IdGalleryView and @$Field1IdGalleryView!=0){

            @$cgFormFieldRow = $wpdb->get_row( "SELECT * FROM $tablenameEntries WHERE f_input_id='$Field1IdGalleryView' and pid='$realId' ");
            if(@$inputFieldContentID=='text-f' or @$inputFieldContentID=='email-f' or @$inputFieldContentID=='select-f' or @$inputFieldContentID=='url-f'){
                @$cgFormFieldContent = html_entity_decode(stripslashes($cgFormFieldRow->Short_Text));

            }
            if(@$inputFieldContentID=='comment-f'){
                @$cgFormFieldContent = html_entity_decode(stripslashes($cgFormFieldRow->Long_Text));

            }

            if(@$inputFieldContentID=='selectc-f'){

                $cgFormFieldContent = '';

                if($imageCategory>0){

                    foreach($categories as $category){

                        if($category->id==$imageCategory){
                            $cgFormFieldContent = html_entity_decode(stripslashes($category->Name));

                        }
                    }

                }

            }

            // Falls kein Content vorhanden ist, dann soll auch der Div nicht angezeigt werden.
            if(@$cgFormFieldContent && $ThumbViewBorderRadius<=5){

                // Wenn Forward out of gallery aktiviert ist dann wird das Feld ohne cg_image class angezeigt
                if($ForwardToURL==1 AND $cg_Use_as_URL==1 AND $ForwardFrom==2){

                    if($ForwardType==2){$cg_gallery_contest_target = "target='_blank'";}
                    else{$cg_gallery_contest_target='';}

                    //hier mit PHP �berpr�fen ob Zeichen enthalten sind
                    if (strstr($cg_img_url, 'http')) {
                        $cg_img_url = $cg_img_url ;
                    }

                    else{

                        $cg_img_url = "http://".$cg_img_url;

                    }

                    echo "<a href='$cg_img_url' $cg_gallery_contest_target title='Go to $cg_img_url' >";
                    echo "<div style='cursor:pointer !important;' data-cg_image_id='$realId' id='cg_Field1IdGalleryView$r' class='cg_gallery_info_title'>";
                    echo "<div>";
                    echo @$cgFormFieldContent."1";
                    //echo $uploads."/".$Timestamp.$NamePic.$ImgType;
                    echo "</div>";
                    echo "</div>";
                    echo "</a>";


                }

                else{

                    echo "<div data-cg_image_id='$realId' class='cg_image$r cg_gallery_info_title' id='cg_Field1IdGalleryView$r' >";
                    echo "<div>";
                    echo @$cgFormFieldContent;
                    //echo $uploads."/".$Timestamp.$NamePic.$ImgType;
                    echo "</div>";
                    echo "</div>";


                }


            }


        }




        if($AllowRating==1 or $AllowRating==2 or $AllowComments==1 or ($HeightViewBorderRadius>5) && $cgFormFieldContent or ($FbLike==1 and $FbLikeGallery==1)){

            // Wenn Forward out of gallery aktiviert ist dann wird das Feld ohne cg_image class angezeigt
            if($ForwardToURL==1 AND $cg_Use_as_URL==1 AND ($ForwardFrom==2 OR $ForwardFrom==3)){

                $cg_hide_class = "";
                $cg_hide_cursor = "cursor:default;";
                //$cg_star_image_cursor = "cursor:default;";

            }

            else{

                $cg_hide_class = "class='cg_image$r cg_gallery_info'";
                $cg_hide_cursor = "";

            }

            echo "<div style='$cg_hide_cursor' data-cg_image_id='$realId' $cg_hide_class id='cg_hide$r' >";
//		echo "<a onClick='document.getElementById(\"cg-img-$id\").click()' >";//<img src='$urlTransparentPic' style='cursor: pointer;position:absolute;z-index:20;width:$WidthThumbPx;height:$HeightThumbPx;'>";
//		echo "</a>";


            if(($HeightViewBorderRadius>5) && $cgFormFieldContent){

                echo "<div class='cg_info_depend_on_radius' >";

                echo $cgFormFieldContent;

                echo "</div>";


            }


            if($AllowComments==1){

                echo "<div class='cg_gallery_comments_div'>";
                echo "<div class='cg_gallery_comments_div_child'>";

                //echo "<input type='hidden' class='countCommentsQuantity' value='".@$countC."'>";

                //echo "<div style='display:table  !important;color: #fff;font-size:18px;margin-left:auto; margin-right:5px;clear: both;height: 18px;line-height: 18px;' id='rating_cgc-$realId'> <b>Comments ($countC)</b></div>";
                if($CommentsOutGallery==1){


                    //echo "<div style='display:table !important;color: #fff;font-size:18px;margin-right:auto; margin-left:5px;clear: both;height: 18px;line-height: 18px;$underlineComments' id='rating_cgc-$realId'> <b>$language_Comments ($countC)</b></div>";
                    echo "<div class='cg_gallery_comments_div_icon'><img id='cg_pngCommentsIcon$realId' src='$pngCommentsIcon'  style='cursor:pointer;'/>";
                    echo "<input type='hidden' class='countCommentsQuantity' value='".@$countC."'></div>";
                    echo "<div class='comments_cg_slider$realId cg_gallery_comments_div_count'>".@$countC."</div>";
                }

                else{


                    //echo "<div style='display:table !important;color: #fff;font-size:18px;margin-right:auto; margin-left:5px;clear: both;height: 18px;line-height: 18px;$underlineComments' id='rating_cgc-$realId'> <b>$language_Comments ($countC)</b></div>";
                    echo "<div class='cg_gallery_comments_div_icon' ><img src='$pngCommentsIcon'  style='cursor:default;'/>";
                    echo "<input type='hidden' class='countCommentsQuantity' value='".@$countC."'></div>";
                    echo "<div class='comments_cg_slider$realId cg_gallery_comments_div_count'>".@$countC."</div>";


                }

                echo "</div>";
                echo "</div>";
                //echo "<div class='cg_empty_div'></div>";
                //echo "<br/>";

            }



//echo '<br style="line-height:20px;display:block;margin: 10px 0;" />';
            //echo "<div style='padding-top:2px;display:table;margin-right:auto; margin-left:5px;' >src='$starTest1'   <b>$language_Comments ($countC)</b></div>";

            // Bestimmen ob aus der Gallerie heraus gevotet werden darf

            if($RatingOutGallery==1){

                $idRatingStar = "cg_rate_star$realId";
                $ratingStarCursorStyle = "cursor:pointer;";

            }
            else{

                $idRatingStar = "";
                $ratingStarCursorStyle = "cursor:default;";

            }


            if($AllowRating==1 and $HideUntilVote!=1){
                echo "<input type='hidden' class='cg_check_voted' value='2' id='cg_check_voted$realId'>";
                //echo "<div style='padding-top:2px;display:table;margin-left:auto; margin-right:5px;'>";
                echo "<div class='cg_gallery_rating_div' id='cg_gallery_rating_div$realId'>";
                echo "<div class='cg_gallery_rating_div_child' id='cg_gallery_rating_div_child$realId'>";


                echo "<div class='cg_gallery_rating_div_star'><img src='$starTest1'  style='$ratingStarCursorStyle' alt='1' id='$idRatingStar'></div>";
                echo "<div class='cg_gallery_rating_div_star'><img src='$starTest2'  style='$ratingStarCursorStyle' alt='2' id='$idRatingStar'></div>";
                echo "<div class='cg_gallery_rating_div_star'><img src='$starTest3'  style='$ratingStarCursorStyle' alt='3' id='$idRatingStar'></div>";
                echo "<div class='cg_gallery_rating_div_star'><img src='$starTest4'  style='$ratingStarCursorStyle' alt='4' id='$idRatingStar'></div>";
                echo "<div class='cg_gallery_rating_div_star cg_gallery_rating_image_five_star_last_child'><img src='$starTest5'  style='$ratingStarCursorStyle' alt='5' id='$idRatingStar'></div>";

                echo "<div class='cg_gallery_rating_div_count' id='rating_cg-".@$realId."'>".@$countR."</div>";
                echo "</div>";
                echo "</div>";

            }

            if($AllowRating==2 and $HideUntilVote!=1){
                echo "<input type='hidden' class='cg_check_voted' value='2' id='cg_check_voted$realId'>";
                //echo "<div style='padding-top:2px;display:table;margin-left:auto; margin-right:5px;'>";
                echo "<div class='cg_gallery_rating_div' id='cg_gallery_rating_div$realId'>";
                echo "<div class='cg_gallery_rating_div_child' id='cg_gallery_rating_div_child$realId'>";



                echo "<div class='cg_gallery_rating_div_star'>
                            <img src='$starCountS'  style='$ratingStarCursorStyle' alt='6' id='$idRatingStar'></div>";

                echo "<div id='rating_cg-".@$realId."' class='cg_gallery_rating_div_count'>".@$countS."</div>";
                echo "</div>";
                echo "</div>";

            }

            ///HideUntilVote Variante
            if($AllowRating==1 and $HideUntilVote==1){

                //echo "<div style='padding-top:2px;display:table;margin-left:auto; margin-right:5px;'>";
                echo "<div class='cg_gallery_rating_div' id='cg_gallery_rating_div$realId'>";
                echo "<div class='cg_gallery_rating_div_child' id='cg_gallery_rating_div_child$realId'>";
                //echo "test";
                if($countR>=1){

                    echo "<input type='hidden' class='cg_check_voted' value='1' id='cg_check_voted$realId'>";

                    echo "<div class='cg_gallery_rating_div_star'><img src='$starTest1'  style='float:left;$ratingStarCursorStyle' alt='1' id='$idRatingStar'></div>";
                    echo "<div class='cg_gallery_rating_div_star'><img src='$starTest2'  style='float:left;$ratingStarCursorStyle' alt='2' id='$idRatingStar'></div>";
                    echo "<div class='cg_gallery_rating_div_star'><img src='$starTest3'  style='float:left;$ratingStarCursorStyle' alt='3' id='$idRatingStar'></div>";
                    echo "<div class='cg_gallery_rating_div_star'><img src='$starTest4'  style='float:left;$ratingStarCursorStyle' alt='4' id='$idRatingStar'></div>";
                    echo "<div class='cg_gallery_rating_div_star cg_gallery_rating_image_five_star_last_child'><img src='$starTest5'  style='float:left;$ratingStarCursorStyle' alt='5' id='$idRatingStar'></div>";

                    echo "<div class='cg_gallery_rating_div_count' id='rating_cg-".@$realId."'>".@$countRhideUntilVote."</div>";

                }

                else{

                    echo "<input type='hidden' class='cg_check_voted' value='0' id='cg_check_voted$realId'>";

                    echo "<div id='rating_cg-".@$realId."' class='cg_hide_until_vote_rate".@$realId." cg_hide_until_vote_rate' >";
                    //echo "$votedFirstContent"
                    echo "<div class='cg_gallery_rating_div_star'><img src='$iconsURL/star_off_48.png'  style='float:left;$ratingStarCursorStyle' alt='1' id='$idRatingStar'></div>";
                    echo "<div class='cg_gallery_rating_div_star'><img src='$iconsURL/star_off_48.png'  style='float:left;$ratingStarCursorStyle' alt='2' id='$idRatingStar'></div>";
                    echo "<div class='cg_gallery_rating_div_star'><img src='$iconsURL/star_off_48.png'  style='float:left;$ratingStarCursorStyle' alt='3' id='$idRatingStar'></div>";
                    echo "<div class='cg_gallery_rating_div_star'><img src='$iconsURL/star_off_48.png'  style='float:left;$ratingStarCursorStyle' alt='4' id='$idRatingStar'></div>";
                    echo "<div class='cg_gallery_rating_div_star cg_gallery_rating_image_five_star_last_child'><img src='$iconsURL/star_off_48.png'  style='float:left;$ratingStarCursorStyle' alt='5' id='$idRatingStar'></div>";
                    echo "</div>";
                }


                echo "</div>";
                echo "</div>";

            }

            if($AllowRating==2 and $HideUntilVote==1){

                //echo "<div style='padding-top:2px;display:table;margin-left:auto; margin-right:5px;'>";
                echo "<div class='cg_gallery_rating_div' id='cg_gallery_rating_div$realId'>";
                echo "<div class='cg_gallery_rating_div_child' id='cg_gallery_rating_div_child$realId'>";
                //echo "test";
                if($countS>=1){

                    echo "<input type='hidden' class='cg_check_voted' value='1' id='cg_check_voted$realId'>";

                    echo "<div class='cg_gallery_rating_div_star'><img src='$starCountS'  style='float:left;$ratingStarCursorStyle' alt='6' id='$idRatingStar'></div>";

                    echo "<div id='rating_cg-".@$realId."' class='cg_gallery_rating_div_count'>
                             ".@$countShideUntilVote."</div>";

                }

                else{

                    echo "<input type='hidden' class='cg_check_voted' value='0' id='cg_check_voted$realId'>";

                    echo "<div id='rating_cg-".@$realId."' class='cg_hide_until_vote_rate".@$realId." cg_hide_until_vote_rate cg_gallery_rating_div_star' >";
                    echo "<div class='cg_gallery_rating_div_star' ><img src='$iconsURL/star_off_48.png'  style='float:left;$ratingStarCursorStyle' alt='6' id='$idRatingStar'></div>";
                    //echo "$votedFirstContent";
                    echo "</div>";
                }


                echo "</div>";
                echo "</div>";

            }


            if($FbLike==1 and $FbLikeGallery==1){

                //echo "$urlForFacebook<br>";

                echo "<div class='cg_gallery_fb_like_div' id='cg_fb_like_div".$realId."'>";
                echo "<iframe src='".$urlForFacebook."'  style='border: none;width:180px;height:40px;overflow:hidden;' scrolling='no' 
 									class='cg_fb_like_iframe_gallery_order".$r."' id='cg_fb_like_iframe_gallery".$realId."'  name='cg_fb_like_iframe_gallery".$realId."'></iframe>";



                echo "</div>";

            }
            //include("stars-thumb-look.php");

            echo "</div>";
        }



        echo "</div>";


        $i++;
    }


?>