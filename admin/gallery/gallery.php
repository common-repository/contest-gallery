<?php

//Prüfung ob neue Gallerie gerade kreiert wurde, wenn nicht dann sicherheitshalber reload erzwingen, zwecks cache aktualisierung
if(!@$_GET['create'] AND !@$_POST['cg_create'] AND !@$_POST['contest_gal1ery_create_zip'] AND !@$_GET['delete_zip'] AND !@$_POST['contest_gal1ery_post_create_data_csv']
 AND !@$_GET['delete_data_csv']
 AND !@$_POST['edit_gallery_hidden_post']){?>
<script type='text/javascript'>
//Prüfen ob der User über Back Button kommt
if(document.URL.indexOf("#img")==-1)
{
	document.location.hash = "#img";
}
else{	
	document.location.hash = "";
	location.reload(true);	
}
</script>
<?php

//sleep(1);

}



/*
echo "<br>";
echo $uploadFolder['baseurl'];/*

		/*$cachefiles = dirname(__FILE__).'/../../../../uploads/contest-gallery/gallery-id-'.$GalleryID.'/cache/look-thumb-0-80.html';
		$cachefiles1 = dirname(__FILE__).'/../../../../uploads/contest-gallery/gallery-id-'.$GalleryID.'/cache/*';
		
		if(file_exists($cachefiles )){echo "EXISTS";}
		else{echo "not exists";}*/

include("get-data.php");
include(dirname(__FILE__) . "/../nav-gallery.php");
include("header-1.php");
include("header-2.php");

// Set variables:
$heightOriginalImg = 1;
$widthOriginalImg = 1;

// Bestimmen ob ABSTEIGEND oder AUFSTEIGEND


// -------------------------------Ausgabe der eingetragenen Felder. Hauptdiv id=sortable. Sortierbare Felder div id=sortableDiv				
		

		echo '<input type="hidden" name="option_id" value="'. $GalleryID .'">';
		//echo "<div id='sortable' style='width:935px;border: 1px solid #DFDFDF;background-color:#fff;padding-bottom:50px;padding-left:20px;padding-right:20px;padding-top:20px;'>";
echo "<input type='hidden' id='cg_rating_star_on' value='$starOn' >";
echo "<input type='hidden' id='cg_rating_star_off' value='$starOff' >";
		echo "<ul id='sortable' style='width:895px;padding:20px;background-color:#fff;margin-bottom:0px !important;margin-bottom:0px;border: 1px solid #DFDFDF;margin-top:0px;'>";
		
		// Bei der ersten Abarbeitung notwendig
	//	echo "<li style='width:891px;border: 1px solid #DFDFDF;padding-top:10px;padding-bottom:10px;display:table;' id='div' class='sortableDiv'>";
// Wird gebraucht um die höchste RowID am Anfang zu ermitln
	    $r = 0;	
		
		$uploadFolder = wp_upload_dir();
	
		foreach($selectSQL as $value){
		
			/*$selectedCheck = "".$value->Active."";

				if ($selectedCheck == 1){
				$checkedActive = "checked";
				}
				else {
				$checkedActive = "";
				}*/

		$id = $value->id;
		$rowid = $value->rowid;
		$Timestamp = $value->Timestamp."_";
		$NamePic = $value->NamePic;
		$CountC = $value->CountC;
		$rating = $value->Rating;
		$countR = $value->CountR;
		$countS = $value->CountS;
		$WpUpload = $value->WpUpload;
		@$WpUserId = $value->WpUserId;
        $widthOriginalImg = $value->Width;
        $heightOriginalImg = $value->Height;
		$Active = $value->Active;
		$rThumb = $value->rThumb;
		$rSource = $value->rSource;
		$addCountS = $value->addCountS;
		$addCountR1 = $value->addCountR1;
		$addCountR2 = $value->addCountR2;
		$addCountR3 = $value->addCountR3;
		$addCountR4 = $value->addCountR4;
		$addCountR5 = $value->addCountR5;
		$imageCategory = $value->Category;


		$emailStatus = false;

/*		if ($Active == 1){
			$checkedActive = "checked";
		}
		else {
			$checkedActive = "";
		}*/
		
		//echo $WpUserId;
		
		$urlForFacebook=$urlSource.'/wp-content/uploads/contest-gallery/gallery-id-'.$GalleryID.'/'.$Timestamp.$NamePic.".html";
//echo $urlForFacebook;
		//echo "$id";
		
		if(!$rating){$rating=0;} 
		
		// Die höchste RowID wird gebraucht und später von JavaScript verarbeitet
				/*$r++;
		
				if ($r==1) {
				
				echo '<input type="hidden" id="highestRowId" value="'. $rowid .'">';
				
				}*/
		// Die höchste RowID wird gebraucht und später von JavaScript verarbeitet --- END
		
		
	//	echo "<br/>";
		
		if($Active == 1){
			$blockBGcolor = 'background-color: #b5f9a8;';
		}
		else{
			$blockBGcolor = 'background-color: #e4e4e4;';
		}
		echo "<li style='width:891px;border: 1px solid #DFDFDF;padding-bottom:10px;display:table;$blockBGcolor' id='div$id' class='sortableDiv'>";
            echo "<div class='cg_drag_area'></div>";

		
		// hidden inputs zur bestimmung der Reihenfolge
		echo "<input type='hidden' name='row[$id]'  class='rowId' value='$rowid'>"; // Zur Feststellung der Reihenfolge, wird vom Javascript verarbeitet
		echo "<input type='hidden' name='count[]' value=\"$id\">";
		echo "<input type='hidden' name='changeGalery' value='changeGalery'>";
		// hidden inputs zur bestimmung der Reihenfolge ENDE
		
		
		
		// ------ Bild wird mittig und passend zum Div angezeigt	
		
						
					// destination of the uploaded original image
					
					
					
					// Feststellen der Quelle des Original Images
				//	echo "WpUpload: $WpUpload";


					if($WpUpload==0){
						$sourceOriginalImg = $uploadFolder['basedir'].'/contest-gallery/gallery-id-'.$GalleryID.'/'.$value->Timestamp.'_'.$value->NamePic.'.'.$value->ImgType; // Pfad zum Bilderordner angeben
						$sourceOriginalImgShow = $uploadFolder['baseurl'].'/contest-gallery/gallery-id-'.$GalleryID.'/'.$value->Timestamp.'_'.$value->NamePic.'.'.$value->ImgType; // Pfad zum Bilderordner angeben
						list($widthOriginalImg, $heightOriginalImg) = getimagesize($sourceOriginalImg); // Breite und Höhe von original Image

					}
					else{

						$wp_image_info = $wpdb->get_row("SELECT * FROM $table_posts WHERE ID = '$WpUpload'");
						$image_url = $wp_image_info->guid;
						$post_title = $wp_image_info->post_title;
                        $post_description = $wp_image_info->post_content;
						$post_excerpt = $wp_image_info->post_excerpt;
						$post_type = $wp_image_info->post_mime_type;
						$wp_image_id = $wp_image_info->ID;

                        $sourceOriginalImgShow = $image_url;


						$check = explode($uploadFolder['baseurl'],$image_url);
                        $sourceOriginalImg = $image_url;

						
					}


                    if($rThumb=='90' or $rThumb=='270'){
                        $rotateRatio = $widthOriginalImg/$heightOriginalImg;
                        $widthOriginalImgContainer = $widthOriginalImg;
                        $widthOriginalImg = $heightOriginalImg;
                        $heightOriginalImg = $widthOriginalImgContainer;
                    }
					
					$WidthThumb = 125;
					$HeightThumb = 81;
				
					// Ermittlung der Höhe nach Skalierung. Falls unter der eingestellten Höhe, dann nächstgrößeres Bild nehmen.
					$heightScaledThumb = $WidthThumb*$heightOriginalImg/$widthOriginalImg;

					
					// Falls unter der eingestellten Höhe, dann größeres Bild nehmen (normales Bild oder panorama Bild, kein Vertikalbild)
					
					if ($heightScaledThumb <= $HeightThumb) {
					
					//$widthScaledThumb = $HeightThumb*$widthOriginalImg/$heightOriginalImg;
                        if($cgVersion>=7){
                            $imageThumb = wp_get_attachment_image_src($WpUpload, 'large');
                            $imageThumb = $imageThumb[0];
                        }
                        else{
                            $imageThumb = $content_url.'/contest-gallery/gallery-id-'.$GalleryID.'/'.$value->Timestamp.'_'.$value->NamePic.'-300width.'.$value->ImgType;
                        }



					// Bestimmung von Breite des Bildes
					$WidthThumbPic = $HeightThumb*$widthOriginalImg/$heightOriginalImg;
					$WidthThumbPic = $WidthThumbPic.'px';
					
					// Bestimmung wie viel links und rechts abgeschnitten werden soll
					$paddingLeftRight = ($WidthThumbPic-$WidthThumb)/2;
					$paddingLeftRight = $paddingLeftRight.'px';
					
					$padding = "left: -$paddingLeftRight;right: -$paddingLeftRight";
					
					}
					
					
					// Falls über der eingestellten Höhe, dann kleineres Bild nehmen (kein Vertikalbild)
					if ($heightScaledThumb > $HeightThumb) {

                    if($cgVersion>=7){
                        $imageThumb = wp_get_attachment_image_src($WpUpload, 'large');
                        $imageThumb = $imageThumb[0];
                    }
                    else{
                        $imageThumb = $content_url.'/contest-gallery/gallery-id-'.$GalleryID.'/'.$value->Timestamp.'_'.$value->NamePic.'-300width.'.$value->ImgType;
                    }


                    if($rThumb=='90' or $rThumb=='270'){

                        $WidthThumbPic = $WidthThumb*$rotateRatio;
                        $WidthThumbPic = $WidthThumbPic.'px';

                    }
                    else{
                        // Bestimmung von Breite des Bildes
                        $WidthThumbPic = $WidthThumb.'px';
                    }


                        // Bestimmung wie viel oben und unten abgeschnitten werden soll
                        $heightImageThumb = $WidthThumb*$heightOriginalImg/$widthOriginalImg;
                        $paddingTopBottom = ($heightImageThumb-$HeightThumb)/2;
                        $paddingTopBottom = $paddingTopBottom.'px';

                        $padding = "top: -$paddingTopBottom;bottom: -$paddingTopBottom";
					
					}

		// Bild wird mittig und passend zum Div angezeigt	--------  ENDE
		
		
		
		// ----------- Ermitteln der Sprache des Blogs, um das Upload Datum in richtiger schreibweise anzuzeigen
	
		$uploadTime = date('m/d/Y h:i a', $value->Timestamp);
			

		// Ermitteln der Sprache des Blogs, um das Upload Datum in richtiger schreibweise anzuzeigen  ------------  ENDE
		
		
		//$uploads = wp_upload_dir();
//$WPdestination = $uploads['baseurl'].'/contest-gallery/gallery-id-'.$GalleryID.'/'; // Pfad zum Bilderordner angeben
		
		
		echo "<div style='float:left;width:125px;margin-left:20px;'>";
            echo "<div style='float:left;width:125px;text-align:center;left:0px;'>";
            echo "<a href=\"?page=contest-gallery/index.php&option_id=$GalleryID&cg_image_rotate=true&cg_image_id=$id&cg_image_wp_id=$WpUpload\">Rotate Image</a>";
            echo "</div>";
		echo '<div style="width:125px;height:81px;overflow: hidden !important;position: relative;float:left;display:inline;margin-left:1px;">';
		echo '<a href="'.$sourceOriginalImgShow.'" target="_blank" title="Show full size" alt="Show full size"><img class="cg'.$rThumb.'degree" src="'.$imageThumb.'" style="'.$padding.';position: absolute !important;max-width:none !important;" width="'.$WidthThumbPic.'"></a>';
		//echo '<a href="'.$sourceOriginalImgShow.'" target="_blank" title="Show full size" alt="Show full size"><img src="'.$WPdestination.$value->Timestamp.'_'.$value->NamePic.'-300width.'.$value->ImgType.'" style="'.$padding.';position: absolute !important;max-width:none !important;" width="'.$WidthThumbPic.'"></a>';
		echo "</div>";
		echo '<div style="width:126px;text-align:center;font-size:11px;float:left;margin-right:20px;"><input type="text" disabled name="upload-date" value=" '.$uploadTime .'" style="width:125px;text-align:center;font-size:11px;float:left;margin-right:20px;" ></div>';
	
	

		// Berechnung und Anzeige des durchschnittlichen Ratings


			if($AllowRating==1){

                echo '<div class="cg_5_star_main_rating_container">';



                $countR1 = $wpdb->get_var( $wpdb->prepare(
                    "
								SELECT COUNT(*) AS NumberOfRows
								FROM $tablenameIP
								WHERE GalleryID = %d and Rating = %d and pid = %d
							",
                    $GalleryID,1,$id
                ) );

                $countR1origin = $countR1;

                if($Manipulate==1){
                    $countR1 = $countR1+$addCountR1;
                }

                $countR2 = $wpdb->get_var( $wpdb->prepare(
                    "
								SELECT COUNT(*) AS NumberOfRows
								FROM $tablenameIP
								WHERE GalleryID = %d and Rating = %d and pid = %d
							",
                    $GalleryID,2,$id
                ) );

                $countR2origin = $countR2;


                if($Manipulate==1){
                    $countR2 = $countR2+$addCountR2;
                }


                $countR3 = $wpdb->get_var( $wpdb->prepare(
                    "
								SELECT COUNT(*) AS NumberOfRows
								FROM $tablenameIP
								WHERE GalleryID = %d and Rating = %d and pid = %d
							",
                    $GalleryID,3,$id
                ) );

                $countR3origin = $countR3;


                if($Manipulate==1){
                    $countR3 = $countR3+$addCountR3;
                }


                $countR4 = $wpdb->get_var( $wpdb->prepare(
                    "
								SELECT COUNT(*) AS NumberOfRows
								FROM $tablenameIP
								WHERE GalleryID = %d and Rating = %d and pid = %d
							",
                    $GalleryID,4,$id
                ) );

                $countR4origin = $countR4;


                if($Manipulate==1){
                    $countR4 = $countR4+$addCountR4;
                }


                $countR5 = $wpdb->get_var( $wpdb->prepare(
                    "
								SELECT COUNT(*) AS NumberOfRows
								FROM $tablenameIP
								WHERE GalleryID = %d and Rating = %d and pid = %d
							",
                    $GalleryID,5,$id
                ) );

                $countR5origin = $countR5;

                if($Manipulate==1){
                    $countR5 = $countR5+$addCountR5;
                }



                if($Manipulate==1){
                    $countRtotalCheck = $countR+$addCountR1+$addCountR2+$addCountR3+$addCountR4+$addCountR5;
                }
                else{
                    $countRtotalCheck = $countR;
                }


                if($Manipulate==1){
                    $ratingCummulated = $rating+$addCountR1*1+$addCountR2*2+$addCountR3*3+$addCountR4*4+$addCountR5*5;
                }
                else{
                    $ratingCummulated = $rating;
                }

                if ($countRtotalCheck!=0){
					$averageStars = $ratingCummulated/$countRtotalCheck;
					$averageStarsRounded = round($averageStars,0);
					//echo "<br>averageStars: $averageStars<br>";					
				}
				
			else{$countRtotalCheck=0; $averageStarsRounded = 0;}
		
		
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

			
			echo "<div class='cg_rating_5_star_img_div' ><img src='$starTest1' class='cg_rating_star_1 cg_rating_5_star_img' alt='1'></div>";
			echo "<div class='cg_rating_5_star_img_div' ><img src='$starTest2' class='cg_rating_star_2 cg_rating_5_star_img' alt='2'></div>";
			echo "<div class='cg_rating_5_star_img_div' ><img src='$starTest3' class='cg_rating_star_3 cg_rating_5_star_img' alt='3'></div>";
			echo "<div class='cg_rating_5_star_img_div' ><img src='$starTest4' class='cg_rating_star_4 cg_rating_5_star_img' alt='4'></div>";
			echo "<div class='cg_rating_5_star_img_div' ><img src='$starTest5' class='cg_rating_star_5 cg_rating_5_star_img' alt='5'></div>";

			echo "<div class='cg_rating_value_countR_div'><b>(<span class='cg_rating_value_countR'>".@$countRtotalCheck."</span>)</b></div>";
			echo "<br/>";
			//echo "<div style='display:inline-block;position:relative;font-size:12px;v-align: top;line-height: 12px;height: 12px;color:#fff;text-align:center;margin-top:4px;' ><b>Cumulated: (<span class='cg_rating_value_countR_cumulated'>".$ratingCummulated."</span>)</b></div>";
		//	echo "<br/>";

                echo '<div class="cg_stars_overview">';


                echo "<div class='cg_manipulate_5_star'><img src='$starOn'  class='cg_manipulate_5_star_img' alt='1'></div>";
                echo "<div class='cg_manipulate_5_star'><img src='$starOff'  class='cg_manipulate_5_star_img' alt='2'></div>";
                echo "<div class='cg_manipulate_5_star'><img src='$starOff'  class='cg_manipulate_5_star_img' alt='3'></div>";
                echo "<div class='cg_manipulate_5_star'><img src='$starOff'  class='cg_manipulate_5_star_img' alt='4'></div>";
                echo "<div class='cg_manipulate_5_star'><img src='$starOff'  class='cg_manipulate_5_star_img' alt='5'></div>";
                echo "<div class='cg_stars_overview_countR' ><b>&nbsp;(<span class='cg_rating_value_countR1'>".@$countR1."</span>)</b></div>";




                echo "</div>";

                echo '<div class="cg_stars_overview">';

                echo "<div class='cg_manipulate_5_star'><img src='$starOn'  class='cg_manipulate_5_star_img' alt='1'></div>";
                echo "<div class='cg_manipulate_5_star'><img src='$starOn'  class='cg_manipulate_5_star_img' alt='2'></div>";
                echo "<div class='cg_manipulate_5_star'><img src='$starOff'  class='cg_manipulate_5_star_img' alt='3'></div>";
                echo "<div class='cg_manipulate_5_star'><img src='$starOff'  class='cg_manipulate_5_star_img' alt='4'></div>";
                echo "<div class='cg_manipulate_5_star'><img src='$starOff'  class='cg_manipulate_5_star_img' alt='5'></div>";

                echo "<div class='cg_stars_overview_countR' ><b>&nbsp;(<span class='cg_rating_value_countR2'>".@$countR2."</span>)</b></div>";



                echo "</div>";


                echo '<div class="cg_stars_overview">';

                echo "<div class='cg_manipulate_5_star'><img src='$starOn'  class='cg_manipulate_5_star_img' alt='1'></div>";
                echo "<div class='cg_manipulate_5_star'><img src='$starOn'  class='cg_manipulate_5_star_img' alt='2'></div>";
                echo "<div class='cg_manipulate_5_star'><img src='$starOn'  class='cg_manipulate_5_star_img' alt='3'></div>";
                echo "<div class='cg_manipulate_5_star'><img src='$starOff'  class='cg_manipulate_5_star_img' alt='4'></div>";
                echo "<div class='cg_manipulate_5_star'><img src='$starOff'  class='cg_manipulate_5_star_img' alt='5'></div>";

                echo "<div class='cg_stars_overview_countR' ><b>&nbsp;(<span class='cg_rating_value_countR3'>".@$countR3."</span>)</b></div>";



                echo "</div>";

                echo '<div class="cg_stars_overview">';

                echo "<div class='cg_manipulate_5_star'><img src='$starOn'  class='cg_manipulate_5_star_img' alt='1'></div>";
                echo "<div class='cg_manipulate_5_star'><img src='$starOn'  class='cg_manipulate_5_star_img' alt='2'></div>";
                echo "<div class='cg_manipulate_5_star'><img src='$starOn'  class='cg_manipulate_5_star_img' alt='3'></div>";
                echo "<div class='cg_manipulate_5_star'><img src='$starOn'  class='cg_manipulate_5_star_img' alt='4'></div>";
                echo "<div class='cg_manipulate_5_star'><img src='$starOff'  class='cg_manipulate_5_star_img' alt='5'></div>";

                echo "<div class='cg_stars_overview_countR' ><b>&nbsp;(<span class='cg_rating_value_countR4'>".@$countR4."</span>)</b></div>";



                echo "</div>";

                echo '<div class="cg_stars_overview">';

                echo "<div class='cg_manipulate_5_star'><img src='$starOn'  class='cg_manipulate_5_star_img' alt='1'></div>";
                echo "<div class='cg_manipulate_5_star'><img src='$starOn'  class='cg_manipulate_5_star_img' alt='2'></div>";
                echo "<div class='cg_manipulate_5_star'><img src='$starOn'  class='cg_manipulate_5_star_img' alt='3'></div>";
                echo "<div class='cg_manipulate_5_star'><img src='$starOn'  class='cg_manipulate_5_star_img' alt='4'></div>";
                echo "<div class='cg_manipulate_5_star'><img src='$starOn'  class='cg_manipulate_5_star_img' alt='5'></div>";

                echo "<div class='cg_stars_overview_countR' ><b>&nbsp;(<span class='cg_rating_value_countR5'>".@$countR5."</span>)</b></div>";



                echo "</div>";






                echo '</div>';




            }
			
			if($AllowRating==2){

                echo '<div style="display: inline-block;
    position: relative;
    width: 108px;
    font-size: 11px;
    float: left;
    margin: 0px auto;
    background-color: #23282D;
    padding: 3px 0;
    /* padding-left: 15px; */
    width: 126px;">';

			    echo "<div class='cg_rating_center' style='margin: 0 auto;'>";

                if($Manipulate==1){

                    $finalCountSvalue = $countS+$addCountS;

                }

                else{
                    $finalCountSvalue = $countS;
                }
				
				if ($countS>0){
					$countS = $countS;
				}
				else{$countS=0;}
		
			if($finalCountSvalue>=1){$starTest6 = $iconsURL.'/star_48_reduced.png';}
			else{$starTest6 = $iconsURL.'/star_off_48_reduced.png';}	
			
			echo "<div style='display:inline-block;float:left;width:13px;height:11px;vertical-align: middle;'><img src='$starTest6'  style='float:left;cursor:default;' alt='1'></div>";
			echo "<div style='display:inline;float:left;font-size:15px;v-align: center;line-height: 15px;height: 15px;color:#fff;padding-top:1px;'>";
            echo "<input type='hidden' class='cg_value_origin' value='$countS' >";
            echo "<input type='hidden' class='cg_value_add_one_star' value='$addCountS' name='addCountS[$id]'>";


            if($finalCountSvalue<0){
                $finalCountSvalue = 0;
            }


            echo "<b>&nbsp;&nbsp;(<span class='cg_rating_value'>".@$finalCountSvalue."</span>)</b></div>";
			echo "<br/>";

                echo "</div>";

                echo '</div>';

            }
	
	
	
	
	
	/*
	if($FbLike==1){
	echo "<div style='display:inline-block;font-size:12px;line-height: 28px;height: 28px;color:#fff;position:relative;width:100px;overflow:hidden;margin-left:5px;' >";
	echo "<div style='z-index:15;border:none;margin: 0;padding 5;height:30px;position:absolute;width:45px;left:4px;top:1px;background-color: #23282D;'>";
	echo "<b>Fb Like:</b>";
	echo "</div>";
	echo "<div style='border:none;margin: 0;padding 0;height:25px;position:absolute;width:200px;top:0px;z-index:0;left:-90px;top:5px;' id='cg_fb_like_div".$realId."'>";
	echo "<iframe src='".$urlForFacebook."'  style='border: none;width:180px;height:50px;overflow:hidden;' scrolling='no' id='cg_fb_like_iframe_gallery".$realId."'  name='cg_fb_like_iframe_gallery".$realId."'></iframe>";
	echo "</div>";
	echo "</div>";
	}*/

		// Berechnung und Anzeige des durchschnittlichen Ratings --- ENDE



            if($Manipulate==1 && $AllowRating==2){
                echo "<div style='float:left;width:125px;text-align:center;left:0px;'>";



                echo "<div class='cg_manipulate'>";
                echo "<div class='cg_manipulate_adjust'>";

                echo "Manipulation";

                //echo "<select class='cg_manipulate_plus_minus'><option value='+'>+</option><option value='-'>-</option></select>";
                if($addCountS==0){
                    $addCountS='';
                }

                echo "<input type='number' max='99999' min='-99999' class='cg_manipulate_plus_value' value='$addCountS'>";
                echo "</div></div>";

                echo '</div>';

            }

            if($Manipulate==1 && $AllowRating==1){

                echo "<div style='float:left;width:125px;text-align:center;left:0px;'>";


                echo "<input type='hidden' class='cg_value_origin_5_star_count' value='$countR' >";
                echo "<input type='hidden' class='cg_value_origin_5_star_rating' value='$rating' >";
                echo "<input type='hidden' class='cg_value_origin_5_star_countBeforeInput' value='$countR' >";
                echo "<input type='hidden' class='cg_value_origin_5_star_addCountR1 cg_value_origin_5_star_to_cumulate' value='$addCountR1' name='addCountR1[$id]' >";
                echo "<input type='hidden' class='cg_value_origin_5_only_value_1' value='$countR1origin' >";
                echo "<input type='hidden' class='cg_value_origin_5_star_addCountR2 cg_value_origin_5_star_to_cumulate' value='$addCountR2' name='addCountR2[$id]' >";
                echo "<input type='hidden' class='cg_value_origin_5_only_value_2' value='$countR2origin' >";
                echo "<input type='hidden' class='cg_value_origin_5_star_addCountR3 cg_value_origin_5_star_to_cumulate' value='$addCountR3' name='addCountR3[$id]' >";
                echo "<input type='hidden' class='cg_value_origin_5_only_value_3' value='$countR3origin' >";
                echo "<input type='hidden' class='cg_value_origin_5_star_addCountR4 cg_value_origin_5_star_to_cumulate' value='$addCountR4' name='addCountR4[$id]' >";
                echo "<input type='hidden' class='cg_value_origin_5_only_value_4' value='$countR4origin' >";
                echo "<input type='hidden' class='cg_value_origin_5_star_addCountR5 cg_value_origin_5_star_to_cumulate' value='$addCountR5' name='addCountR5[$id]' >";
                echo "<input type='hidden' class='cg_value_origin_5_only_value_5' value='$countR5origin' >";

                echo "<div class='cg_manipulate'>";
                echo "<div class='cg_manipulate_adjust'>";

                echo "Manipulation";

                //echo "<select class='cg_manipulate_plus_minus'><option value='+'>+</option><option value='-'>-</option></select>";
                if($addCountS==0){
                    $addCountS='';
                }


               // $starOn = $iconsURL.'/star_48_reduced.png';
               // $starOff = $iconsURL.'/star_off_48_reduced.png';

                echo '<div class="cg_manipulate_container_5_stars">';


                echo "<div class='cg_manipulate_5_star'><img src='$starOn'  class='cg_manipulate_5_star_img' alt='1'></div>";
                echo "<div class='cg_manipulate_5_star'><img src='$starOff'  class='cg_manipulate_5_star_img' alt='2'></div>";
                echo "<div class='cg_manipulate_5_star'><img src='$starOff'  class='cg_manipulate_5_star_img' alt='3'></div>";
                echo "<div class='cg_manipulate_5_star'><img src='$starOff'  class='cg_manipulate_5_star_img' alt='4'></div>";
                echo "<div class='cg_manipulate_5_star'><img src='$starOff'  class='cg_manipulate_5_star_img' alt='5'></div>";


                echo "<input type='number' class='cg_manipulate_5_star_input cg_manipulate_1_star_number' max='99999' min='-99999' class='cg_manipulate_plus_value' value='$addCountR1'  >";
                echo "</div>";

                echo '<div class="cg_manipulate_container_5_stars">';

                echo "<div class='cg_manipulate_5_star'><img src='$starOn'  class='cg_manipulate_5_star_img' alt='1'></div>";
                echo "<div class='cg_manipulate_5_star'><img src='$starOn'  class='cg_manipulate_5_star_img' alt='2'></div>";
                echo "<div class='cg_manipulate_5_star'><img src='$starOff'  class='cg_manipulate_5_star_img' alt='3'></div>";
                echo "<div class='cg_manipulate_5_star'><img src='$starOff'  class='cg_manipulate_5_star_img' alt='4'></div>";
                echo "<div class='cg_manipulate_5_star'><img src='$starOff'  class='cg_manipulate_5_star_img' alt='5'></div>";


                echo "<input type='number' class='cg_manipulate_5_star_input cg_manipulate_2_star_number' max='99999' min='-99999' class='cg_manipulate_plus_value' value='$addCountR2'  >";
                echo "</div>";


                echo '<div class="cg_manipulate_container_5_stars">';

                echo "<div class='cg_manipulate_5_star'><img src='$starOn'  class='cg_manipulate_5_star_img' alt='1'></div>";
                echo "<div class='cg_manipulate_5_star'><img src='$starOn'  class='cg_manipulate_5_star_img' alt='2'></div>";
                echo "<div class='cg_manipulate_5_star'><img src='$starOn'  class='cg_manipulate_5_star_img' alt='3'></div>";
                echo "<div class='cg_manipulate_5_star'><img src='$starOff'  class='cg_manipulate_5_star_img' alt='4'></div>";
                echo "<div class='cg_manipulate_5_star'><img src='$starOff'  class='cg_manipulate_5_star_img' alt='5'></div>";


                echo "<input type='number' class='cg_manipulate_5_star_input cg_manipulate_3_star_number' max='99999' min='-99999' class='cg_manipulate_plus_value' value='$addCountR3'  >";
                echo "</div>";

                echo '<div class="cg_manipulate_container_5_stars">';

                echo "<div class='cg_manipulate_5_star'><img src='$starOn'  class='cg_manipulate_5_star_img' alt='1'></div>";
                echo "<div class='cg_manipulate_5_star'><img src='$starOn'  class='cg_manipulate_5_star_img' alt='2'></div>";
                echo "<div class='cg_manipulate_5_star'><img src='$starOn'  class='cg_manipulate_5_star_img' alt='3'></div>";
                echo "<div class='cg_manipulate_5_star'><img src='$starOn'  class='cg_manipulate_5_star_img' alt='4'></div>";
                echo "<div class='cg_manipulate_5_star'><img src='$starOff'  class='cg_manipulate_5_star_img' alt='5'></div>";


                echo "<input type='number' class='cg_manipulate_5_star_input cg_manipulate_4_star_number' max='99999' min='-99999' class='cg_manipulate_plus_value' value='$addCountR4'  >";
                echo "</div>";

                echo '<div class="cg_manipulate_container_5_stars">';

                echo "<div class='cg_manipulate_5_star'><img src='$starOn'  class='cg_manipulate_5_star_img' alt='1'></div>";
                echo "<div class='cg_manipulate_5_star'><img src='$starOn'  class='cg_manipulate_5_star_img' alt='2'></div>";
                echo "<div class='cg_manipulate_5_star'><img src='$starOn'  class='cg_manipulate_5_star_img' alt='3'></div>";
                echo "<div class='cg_manipulate_5_star'><img src='$starOn'  class='cg_manipulate_5_star_img' alt='4'></div>";
                echo "<div class='cg_manipulate_5_star'><img src='$starOn'  class='cg_manipulate_5_star_img' alt='5'></div>";


                echo "<input type='number' class='cg_manipulate_5_star_input cg_manipulate_5_star_number' max='99999' min='-99999' class='cg_manipulate_plus_value' value='$addCountR5'  >";
                echo "</div>";



                echo "</div>";
                echo "</div>";

                echo '</div>';

            }
	

	
	// Link zum Wordpress User in WP Management
	
	if($WpUserId>0){
		
		$wpUser = $wpdb->get_row("SELECT * FROM $wpUsers WHERE ID = $WpUserId");

		if($wpUser){
			echo "<div style='float:left;width:125px;text-align:center;left:0px;'>";




			
			echo "Added by <br/><a href='?page=contest-gallery/index.php&users_management=true&option_id=$GalleryID&wp_uid=".$wpUser->ID."#cg-user-".$wpUser->ID."'>".$wpUser->user_login."</a>";
			echo '</div>';
		}
	}
	// Link zum Wordpress User in WP Management ---- ENDE
	
		echo "</div>";
		
		


		
		
								/*	echo "<div id='cg_answerJPG' style='position:absolute;margin-right:35px;width:460px;background-color:white;border:1px solid;padding:5px;display:none;'>";
							echo "This allows you to restrict the resolution of the pictures which will be uploaded in frontend. It depends on your web hosting provider how big resolution ca be be for uploaded pics.";
							echo " If your webhosting packet is not so powerfull then you should use this restriction.</div>";*/
		
		echo "<div style='float:left;margin-left:20px;width:470px !important;' id='cg_fields_div'>";
		
		//print_r($selectUpload);
		
		// FELDBENENNUNGEN

		// 1 = Feldtyp
		// 2 = Feldnummer
		// 3 = Feldtitel
		// 4 = Feldinhalt
		// 5 = Feldkrieterium1
		// 6 = Feldkrieterium2
		// 7 = Felderfordernis
		
		$r = 0; // Notwendig zur Überprüfung ab wann das dritte Feld versteckt wird. ACHTUNG: Bild-Uploadfeld immer dabei, dasswegen r>=4 zum Schluss.
		
		//print_r($selectContentFieldArray);
		//print_r($ShowSliderInputID); 
		
		if ($selectFormInput == true) {

		 //   var_dump($selectContentFieldArray);die;

					//$countFormFields = 0;
					foreach($selectContentFieldArray as $key => $formvalue){
					
							
							// 1. Feld Typ
							// 2. ID des Feldes in F_INPUT
							// 3. Feld Reihenfolge
							// 4. Feld Content
							
													
							if(@$formvalue=='text-f'){$fieldtype="nf"; $i=1; continue;}	
							if(@$fieldtype=="nf" AND $i==1){$formFieldId=$formvalue; $i=2; continue;}	
							if(@$fieldtype=="nf" AND $i==2){$fieldOrder=$formvalue; $i=3; continue;}	
							if (@$fieldtype=="nf" AND $i==3) {
							
							//$getEntries = $wpdb->get_var( "SELECT Short_Text FROM $tablenameentries WHERE pid='$id' AND f_input_id = '$formFieldId'");
							
							$getEntries = $wpdb->get_var( $wpdb->prepare(
							"
								SELECT Short_Text
								FROM $tablenameentries 
								WHERE pid = %d and f_input_id = %d
							", 
							$id,$formFieldId
							) );


							$formvalue = html_entity_decode(stripslashes($formvalue));
							$getEntries1 = html_entity_decode(stripslashes($getEntries));
							
							// Prüfen ob das Feld im Slider angezeigt werden soll
							if($AllowGalleryScript==1){
							if(array_search($formFieldId, @$ShowSliderInputID)){$checked='checked';}
							else{$checked='';}
							}
							
							echo "<div style='width:540px;' >";
							echo "$formvalue:<br/>";
							//echo "$formFieldId:<br/>";
							echo "<input type='hidden' name='content[]' value='$id'>";
							echo "<input type='hidden' name='content[]' value='$formFieldId'>";
							echo "<input type='hidden' name='content[]' value='$fieldOrder'>";
							echo "<input type='hidden' name='content[]' value='text-f'>";
							echo "<input type='text' value='$getEntries1' name='content[]'  style='width: 500px;' maxlength='1000' class='cg_image_title'>";
							echo "<img src='$titleIcon' title='Insert original WordPress title' alt='Insert original WordPress title' class='cg_title_icon' />";
                            echo "<input type='hidden' class='post_title' value='$post_title' >";
							
							//echo "$Use_as_URL_id";
							//echo "<br>$formFieldId";
							
							if(@$Use_as_URL_id==$formFieldId AND $ForwardToURL==1){
								
							//echo "&nbsp;&nbsp;&nbsp;<strong>URL</strong>";
								
							}
							else{
							/*if($AllowGalleryScript==1){
							echo "&nbsp;&nbsp;&nbsp;<input type='checkbox' class='cg_field_$formFieldId' name='cg_f_input_id[$formFieldId]' title='This field will appear in slider if you hook it.' $checked>";
							}*/
							}
							echo "</div>";

							$fieldtype='';
							
							$i=0;
							
							}


							// 1. Feld Typ
							// 2. ID des Feldes in F_INPUT
							// 3. Feld Reihenfolge
							// 4. Feld Content


							if(@$formvalue=='url-f'){$fieldtype="url"; $i=1; continue;}
							if(@$fieldtype=="url" AND $i==1){$formFieldId=$formvalue; $i=2; continue;}
							if(@$fieldtype=="url" AND $i==2){$fieldOrder=$formvalue; $i=3; continue;}
                            if (@$fieldtype=="url" AND $i==3) {

                                //$getEntries = $wpdb->get_var( "SELECT Short_Text FROM $tablenameentries WHERE pid='$id' AND f_input_id = '$formFieldId'");

                                $getEntries = $wpdb->get_var( $wpdb->prepare(
                                "
                                    SELECT Short_Text
                                    FROM $tablenameentries 
                                    WHERE pid = %d and f_input_id = %d
                                ",
                                $id,$formFieldId
                                ) );


                                $formvalue = html_entity_decode(stripslashes($formvalue));
                                $getEntries1 = html_entity_decode(stripslashes($getEntries));

                                // Prüfen ob das Feld im Slider angezeigt werden soll
                                if($AllowGalleryScript==1){
                                if(array_search($formFieldId, @$ShowSliderInputID)){$checked='checked';}
                                else{$checked='';}
                                }

                                echo "<div style='width:540px;' >";
                                echo "$formvalue:<br/>";
                                //echo "$formFieldId:<br/>";
                                echo "<input type='hidden' name='content[]' value='$id'>";
                                echo "<input type='hidden' name='content[]' value='$formFieldId'>";
                                echo "<input type='hidden' name='content[]' value='$fieldOrder'>";
                                echo "<input type='hidden' name='content[]' value='url-f'>";
                                echo "<input type='text' value='$getEntries1' name='content[]'  style='width: 500px;' placeholder='www.example.com' maxlength='1000' class='cg_image_title'>";
                             //   echo "<img src='$titleIcon' title='Insert original WordPress title' alt='Insert original WordPress title' class='cg_title_icon' />";
                            //    echo "<input type='hidden' class='post_title' value='$post_title' >";

                                //echo "$Use_as_URL_id";
                                //echo "<br>$formFieldId";

                                if(@$Use_as_URL_id==$formFieldId AND $ForwardToURL==1){

                                //echo "&nbsp;&nbsp;&nbsp;<strong>URL</strong>";

                                }
                                else{
                                /*if($AllowGalleryScript==1){
                                echo "&nbsp;&nbsp;&nbsp;<input type='checkbox' class='cg_field_$formFieldId' name='cg_f_input_id[$formFieldId]' title='This field will appear in slider if you hook it.' $checked>";
                                }*/
                                }
                                echo "</div>";

                                $fieldtype='';

                                $i=0;

                            }

							if(@$formvalue=='select-f'){$fieldtype="se"; $i=1; continue;}
							if(@$fieldtype=="se" AND $i==1){$formFieldId=$formvalue; $i=2; continue;}
							if(@$fieldtype=="se" AND $i==2){$fieldOrder=$formvalue; $i=3; continue;}
							if (@$fieldtype=="se" AND $i==3) {

							//$getEntries = $wpdb->get_var( "SELECT Short_Text FROM $tablenameentries WHERE pid='$id' AND f_input_id = '$formFieldId'");

							$getEntries = $wpdb->get_var( $wpdb->prepare(
							"
								SELECT Short_Text
								FROM $tablenameentries 
								WHERE pid = %d and f_input_id = %d
							",
							$id,$formFieldId
							) );


							$formvalue = html_entity_decode(stripslashes($formvalue));
							$getEntries1 = html_entity_decode(stripslashes($getEntries));

							// Prüfen ob das Feld im Slider angezeigt werden soll
							if($AllowGalleryScript==1){
							if(array_search($formFieldId, @$ShowSliderInputID)){$checked='checked';}
							else{$checked='';}
							}

							echo "<div style='width:540px;' >";
							echo "$formvalue:<br/>";
							//echo "$formFieldId:<br/>";
							echo "<input type='hidden' name='content[]' value='$id'>";
							echo "<input type='hidden' name='content[]' value='$formFieldId'>";
							echo "<input type='hidden' name='content[]' value='$fieldOrder'>";
							echo "<input type='hidden' name='content[]' value='select-f'>";
							echo "<input type='text' value='$getEntries1' name='content[]'  style='width: 500px;' maxlength='1000' class='cg_image_title'>";
							echo "<img src='$titleIcon' title='Insert original WordPress title' alt='Insert original WordPress title' class='cg_title_icon' />";
                            echo "<input type='hidden' class='post_title' value='$post_title' >";

							//echo "$Use_as_URL_id";
							//echo "<br>$formFieldId";

							if(@$Use_as_URL_id==$formFieldId AND $ForwardToURL==1){

							echo "&nbsp;&nbsp;&nbsp;<strong>URL</strong>";

							}
							else{
							/*if($AllowGalleryScript==1){
							echo "&nbsp;&nbsp;&nbsp;<input type='checkbox' class='cg_field_$formFieldId' name='cg_f_input_id[$formFieldId]' title='This field will appear in slider if you hook it.' $checked>";
							}*/
							}
							echo "</div>";

							$fieldtype='';

							$i=0;

							}

                        if(@$formvalue=='selectc-f'){$fieldtype="sec"; $i=1; continue;}
                        if(@$fieldtype=="sec" AND $i==1){$formFieldId=$formvalue; $i=2; continue;}
                        if(@$fieldtype=="sec" AND $i==2){$fieldOrder=$formvalue; $i=3; continue;}
                        if (@$fieldtype=="sec" AND $i==3) {

							    if(!empty($categories)){
                            //$getEntries = $wpdb->get_var( "SELECT Short_Text FROM $tablenameentries WHERE pid='$id' AND f_input_id = '$formFieldId'");

/*                            $getEntries = $wpdb->get_var( $wpdb->prepare(
                                "
								SELECT Short_Text
								FROM $tablenameentries
								WHERE pid = %d and f_input_id = %d
							",
                                $id,$formFieldId
                            ) );*/


                            $formvalue = html_entity_decode(stripslashes($formvalue));
                            $getEntries1 = html_entity_decode(stripslashes($getEntries));

                            // Prüfen ob das Feld im Slider angezeigt werden soll
/*                            if($AllowGalleryScript==1){
                                if(array_search($formFieldId, @$ShowSliderInputID)){$checked='checked';}
                                else{$checked='';}
                            }*/

                            echo "<div style='width:540px;' >";
                            echo "$formvalue:<br/>";
                            //echo "$formFieldId:<br/>";
                          //  echo "<input type='hidden' name='content[]' value='$id'>";
                          //  echo "<input type='hidden' name='content[]' value='$formFieldId'>";
                          //  echo "<input type='hidden' name='content[]' value='$fieldOrder'>";
                            echo "<select name='imageCategory[$id]'>";
                            echo "<option value='0'>Select category</option>";

                            $selectedCat = '';

                            foreach($categories as $category){

                                if($imageCategory==$category->id){
                                    $selectedCat = 'selected';
                                    echo "<option value='".$category->id."' $selectedCat>".$category->Name."</option>";
                                }
                                else{
                                    echo "<option value='".$category->id."' >".$category->Name."</option>";
                                }
                            }

                            echo "</select>";



                           // echo "<input type='hidden' name='content[]' value='selectc-f'>";
                          //  echo "<input type='text' value='$getEntries1' name='content[]'  style='width: 500px;' maxlength='1000' class='cg_image_title'>";
                           // echo "<img src='$titleIcon' title='Insert original WordPress title' alt='Insert original WordPress title' class='cg_title_icon' />";
                            ///echo "<input type='hidden' class='post_title' value='$post_title' >";

                            //echo "$Use_as_URL_id";
                            //echo "<br>$formFieldId";

                            if(@$Use_as_URL_id==$formFieldId AND $ForwardToURL==1){

                                echo "&nbsp;&nbsp;&nbsp;<strong>URL</strong>";

                            }
                            else{
                                /*if($AllowGalleryScript==1){
                                echo "&nbsp;&nbsp;&nbsp;<input type='checkbox' class='cg_field_$formFieldId' name='cg_f_input_id[$formFieldId]' title='This field will appear in slider if you hook it.' $checked>";
                                }*/
                            }
                            echo "</div>";

                            $fieldtype='';

                            $i=0;

                        }
                        }

							if($formvalue=='email-f'){@$fieldtype="ef";  $i=1; continue;}	
							if($fieldtype=="ef" AND $i==1){$formFieldId=$formvalue; $i=2; continue;}
							if($fieldtype=="ef" AND $i==2){$fieldOrder=$formvalue; $i=3; continue;}
							if ($fieldtype=='ef' AND $i==3) {
							
							//$getEntries = $wpdb->get_var( "SELECT Short_Text FROM $tablenameentries WHERE pid='$id' AND f_input_id = '$formFieldId'");

                            $emailStatus = true;
                            $emailStatusText = 'Not confirmed';

							if(@$WpUserId){
									//$getEntries = $wpUser->user_email;
									
									$getEntriesMail = $wpdb->get_var("SELECT user_email FROM $wpUsers WHERE ID = $WpUserId");
                                    $emailStatusText = 'Confirmed (registered user)';
									$mailReadonly = "readonly";
									$registeredUserMail = "(registered user email)";
							}
							else{
							
								$getEntries = $wpdb->get_row( $wpdb->prepare(
								"
									SELECT *
									FROM $tablenameentries 
									WHERE pid = %d and f_input_id = %d
								", 
								$id,$formFieldId
								) );
                                $getEntriesMail = $getEntries->Short_Text;
								$mailReadonly = "readonly";
								$registeredUserMail = "";
                                if($getEntries->ConfMailId>0){
                                    $emailStatusText = 'Confirmed (not registered user)';
                                }
								
							}






							
														// Prüfen ob das Feld im Slider angezeigt werden soll
													if($AllowGalleryScript==1){
								if(array_search($formFieldId, @$ShowSliderInputID)){$checked='checked';}
								else{$checked='';}
													}
													
							$formvalue = html_entity_decode(stripslashes($formvalue));
							
							echo "<div style='width:540px;'>";
							echo "$formvalue $registeredUserMail:<br/>";
							//echo "$formFieldId:<br/>";
							echo "<input type='hidden' name='content[]' value='$id'>";
							echo "<input type='hidden' name='content[]' value='$formFieldId'>";
							echo "<input type='hidden' name='content[]' value='$fieldOrder'>";
							echo "<input type='hidden' name='content[]' value='email-f'>";
							echo "<input type='text' value='$getEntriesMail' name='content[]'  style='width: 500px;' class='email'  maxlength='1000' $mailReadonly>";
							echo "<input type='hidden' value='$getEntriesMail' name='email[$id]'  style='width: 500px;' class='email-clone'  maxlength='1000' $mailReadonly>";
							/*if($AllowGalleryScript==1){
							echo "&nbsp;&nbsp;&nbsp;<input type='checkbox' class='cg_field_$formFieldId' name='cg_f_input_id[$formFieldId]' title='This field will appear in slider if you hook it.' $checked>";
							}*/
							echo "</div>";
							
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
								FROM $tablenameentries 
								WHERE pid = %d and f_input_id = %d
							", 
							$id,$formFieldId
							) );
							
							$formvalue = html_entity_decode(stripslashes($formvalue));
							$getEntries1 = html_entity_decode(stripslashes($getEntries));
							
							// Prüfen ob das Feld im Slider angezeigt werden soll
							if($AllowGalleryScript==1){
								if(array_search($formFieldId, @$ShowSliderInputID)){$checked='checked';}
								else{$checked='';}
							}
							
							echo "<div style='width:540px;'>";
							echo "$formvalue:<br/>";
							//echo "$formFieldId:<br/>";
							echo "<input type='hidden' name='content[]' value='$id'>";
							echo "<input type='hidden' name='content[]' value='$formFieldId'>";
							echo "<input type='hidden' name='content[]' value='$fieldOrder'>";
							echo "<input type='hidden' name='content[]' value='comment-f'>";
							echo "<textarea name='content[]' style='width: 500px;' rows='4'  maxlength='10000' class='cg_image_description cg_image_excerpt'>$getEntries1</textarea>";
							echo "<div class='cg_comment_icons_div'>";
                            echo "<img src='$descriptionIcon' title='Insert original WordPress description' alt='Insert original WordPress description' class='cg_description_icon' />";
                            echo "<img src='$excerptIcon' title='Insert original WordPress excerpt' alt='Insert original WordPress excerpt' class='cg_excerpt_icon' />";
                            echo "<input type='hidden' class='post_description' value='$post_description' >";
                            echo "<input type='hidden' class='post_excerpt' value='$post_excerpt' >";
                            echo "</div>";



							/*if($AllowGalleryScript==1){
							echo "<input type='checkbox' class='cg_field_$formFieldId' name='cg_f_input_id[$formFieldId]' title='This field will appear in slider if you hook it.' style='float:right;margin-right:11px;margin-top:6px;' $checked>";
							}*/
							//echo '<div id="cg_questionJPG" style="display:inline;"><p style="font-size:18px;display:inline;">&nbsp;<a><b>?</b></a></p></div>';
							echo "</div>";
							
							$fieldtype='';
							
							$i=0;
								
							}

													
						}
					
				
					
					
					
				
		
			if ($r>=4) {
			echo "</div>"; //Bild-Uploadfeld immer dabei, dasswegen r>=4 zum Schluss.
			}
		
			else{
		
			echo "&nbsp;";
		
			}
			
			
		
		}
		
		else{
		
		echo "&nbsp;";
		
		}
		
		echo "</div>";
		echo "<div style='float:left;width:160px;margin-left:85px;'>";		
		echo "<div class='informdiv' style='margin-bottom:18px;'>";
		
		
		// Überprüfe ob schon aktiviert ist oder nicht
		
		
		//echo "$Active";
		
		if ($Active == 1) {echo 'Select:';
		echo '<input type="checkbox" class="cg_image_checkbox" value="'. $id .'" name="active['.$id.']"  style="float:right;margin: 2px 20px 0 0;">';
		//echo '<input type="hidden" class="deactivate_'. $id .'" value="'. $id .'"  name="deactivate['.$id.']" disabled >';
		//echo "<input type='hidden' name='active[$id]' value=\"$id\" class='image-delete' >";
		} // Beim Anklicken erscheinen Felder zum Deaktivieren
		else{echo 'Select:';
		//'<input type="checkbox" class="1activate_'. $id .'" value="'. $id .'" style="float:right;margin: 2px 20px 0 0;">';
		echo '<input type="checkbox" class="cg_image_checkbox" value="'. $id .'" name="active['.$id.']" style="float:right;margin: 2px 20px 0 0;">';
		//echo '<input type="hidden" class="deactivate_'. $id .'" value="'. $id .'" name="deactivate['.$id.']" >';
		//echo "<input type='hidden' disabled name='active[$id]' value=\"$id\" class='image-delete' >";
		} // Beim Anklicken erscheinen Felder zum Aktivieren
		
		if($CountC>0){ echo "<br><br><a href=\"?page=contest-gallery/index.php&option_id=$GalleryID&show_comments=true&id=$id\">Comments</a>"; }
		else{ echo ""; }
		
		if($countSelectSQL>4){
		echo "<br><br><a href='#cg_go_to_save_button'>Go save</a>";
		}
		
		// Überprüfe ob schon aktiviert ist oder nicht --- ENDE
		
		// Check if user should be informed or is informed
		
		$Informed = $value->Informed;
		if($Informed==1){echo "<br><br><b>Informed about activated image</b>";}
		//echo "<br>Inform: $Inform<br>";
		//echo "<br>Activate: $Activate<br>";

        if($emailStatus==true){
            echo "<br><br>E-Mail Status: <strong>$emailStatusText</strong>";
        }

		
		if($Active == 1){
			echo "<br><br><br><br>Status: <strong>activated</strong>";
		}
		else{
			echo "<br><br><br><br>Status: <strong>deactivated</strong>";
		}

		
		
	//echo "<br>Informed: $Informed<br>";
		//if($Informed==1){  echo "klappt";}

		
		
		echo "</div>";
		
		if(@$countC>0){  
		echo "<div >";
		echo '<a href="?page=contest-gallery/index.php&pictureID=' . $id . '">Comments</a><br/>';
		echo "</div>";
		}
		echo "</div>";
		echo "</li>";


		}

				echo "</ul>";
				
								echo "<div style='padding:20px;background-color:white;width:895px;text-align:right;margin-top:0px;border-bottom: 1px solid #DFDFDF;border-left: 1px solid #DFDFDF;border-right: 1px solid #DFDFDF;'>";
		echo "<a name='cg_go_to_save_button'></a>";
		echo "<select name='chooseAction1' id='chooseAction1'>";
		
		echo "<option value='1' >Activate Image(s)/Save Data &nbsp;</option>";
		echo "<option value='2' >Deactivate Image(s)/Save Data &nbsp;</option>";
		echo "<option value='3' >Delete Image(s)/Data</option>";
		
		/*
		if($selectSQL){  
		echo "<option value='4'>Zip selected</option>";
		}*/
		
		if($checkInformed){  
		echo "<option value='4'>Reset informed/Save Data &nbsp;</option>";
		}
		
		echo "</select>";
		
		echo '&nbsp;&nbsp; <input type="submit" name="submit" value="Save" id="cg_gallery_backend_submit" style="text-align:center;width:80px;">';

						
		echo "</div>";
				
		

		
				
	
		echo '</form>';

        echo "<div class='cg_pics_per_site' style='width:909px;'>";
        for ($i = 0; $rows > $i; $i = $i + $step) {

            $anf = $i + 1;
            $end = $i + $step;

            if ($end > $rows) {
                $end = $rows;
            }

            if ($anf == $nr1 AND ($start+$step) > $rows AND $start==0) {
                continue;
                echo "<big>[<strong><a href=\"?page=contest-gallery/index.php&option_id=$GalleryID&step=$step&start=$i&edit_gallery=true\">$anf-$end</a></strong> ]</big>";
            }

            elseif ($anf == $nr1 AND ($start+$step) > $rows AND $anf==$end) {

                echo "<big>[<strong><a href=\"?page=contest-gallery/index.php&option_id=$GalleryID&step=$step&start=$i&edit_gallery=true\">$end</a></strong> ]</big>";
            }


            elseif ($anf == $nr1 AND ($start+$step) > $rows) {

                echo "<big>[<strong><a href=\?page=contest-gallery/index.php&option_id=$GalleryID&step=$step&start=$i&edit_gallery=true\">$anf-$end</a></strong> ]</big>";
            }

            elseif ($anf == $nr1) {
                echo "<big>[<strong><a href=\"?page=contest-gallery/index.php&option_id=$GalleryID&step=$step&start=$i&edit_gallery=true\">$anf-$end</a></strong>]</big>";
            }

            elseif ($anf == $end) {
                echo "[  <a href=\"?page=contest-gallery/index.php&option_id=$GalleryID&step=$step&start=$i&edit_gallery=true\">$end</a>  ] ";
            }

            else {
                echo "[  <a href=\"?page=contest-gallery/index.php&option_id=$GalleryID&step=$step&start=$i&edit_gallery=true\">$anf-$end</a>  ] ";
            }
        }
        echo "</div>";

        echo "<br>";
        echo "<br>";

?>