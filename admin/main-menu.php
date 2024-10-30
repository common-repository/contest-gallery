<?php

$siteURL = get_site_url()."/wp-admin/admin.php";

?>
<script type="text/javascript">


//Prüfen ob der User über Back Button kommt
if(document.URL.indexOf("#main")==-1)
{
    document.location.hash = "#main";
}
else{
    document.location.hash = "";
    location.reload(true);
}



var siteURL = <?php echo json_encode($siteURL);?>;

function cgCheckCopy(optionId) {

    if (confirm("Are you sure you want to copy this gallery (id "+optionId+")?")) {
	    return true;
    } else {
        return false;
    }

}

function cgCheckDelete(arg,version) {
var del = arg;

if(version>=7){
    var deleteText = '';}
else{
    var deleteText = ' All uploaded pictures will be irrevocable deleted.';
}

    if (confirm("Are you sure you want to delete this gallery (id "+del+")?"+deleteText+"")) {
        //alert("Clicked Ok");
		//confirmForm();
		//fDeleteFieldAndData(del);
		//e.preventDefault();
		//window.location.href = '?page=contest-gallery/index.php&delete=true&option_id='+del+'';
		window.location.replace(siteURL+'?page=contest-gallery/index.php&delete=true&option_id='+del+'');
	    return true;
    } else {
        //alert("Clicked Cancel");
        return false;
    }
}

</script>
<?php

$permalinkURL = get_site_url()."/wp-admin/admin.php";

//echo "$permalinkURL 2323242";

	global $wpdb;

	$tablename_options = $wpdb->prefix . "contest_gal1ery_options";


	$selectSQL = $wpdb->get_results( "SELECT * FROM $tablename_options ORDER BY id ASC" );

    $arrayNew = array(
        '824f6b8e4d606614588aa97eb8860b7e',
        'add4012c56f21126ba5a58c9d3cffcd7',
        'bfc5247f508f427b8099d17281ecd0f6',
        'a29de784fb7699c11bf21e901be66f4e',
        'e5a8cb2f536861778aaa2f5064579e29',
        '36d317c7fef770852b4ccf420855b07b'
    );


	if(isset($_POST['cgKey'])){

        $newKey = trim($_POST["cgKey"]);
        $newKeyMd5 = md5($newKey);

        // Verarbeitung alter Key!!!
        if(strpos(floatval($newKey)/44,".") == false
            && strpos($newKey,"pro") == false
            && floatval($newKey)!=0
            && floatval($newKey)>=3281329700
        ){

                if(get_option( "p_cgal1ery_reg_code" )){
                    update_option( "p_cgal1ery_reg_code", $_POST['cgKey'] );
                }
                else{
                    delete_option( "p_cgal1ery_reg_code" );
                    add_option( "p_cgal1ery_reg_code", $_POST['cgKey'] );
                }


        }
        // Ganz wichtig! Prüfen ob pro im key mitgeschickt wird. Wenn nicht dann endet die Condition. Wenn ja geht der Verarbeitungstest weiter
        else if(in_array($newKeyMd5, $arrayNew)){

            if(get_option( "p_c1_k_g_r_9" )){
                update_option( "p_c1_k_g_r_9", $_POST['cgKey'] );
            }
            else{

                delete_option( "p_c1_k_g_r_9" );
                add_option("p_c1_k_g_r_9", $newKey );


            }

        }
        else{
            echo "<p><strong>Wrong Key</strong></p>";
        }




    }



echo '<div class="main-table">';
	echo "<table style='border: 1px solid #DFDFDF;background-color:#ffffff;' width='635px'>";
	echo "<tr>";
	echo "<td style='padding-left:20px;overflow:hidden;'><h2>Contest Gallery</h2></td>";

// Check start von hier:
$p_cgal1ery_reg_code = get_option("p_cgal1ery_reg_code");
$p_c1_k_g_r_8 = get_option("p_c1_k_g_r_9");

$p_c1_k_g_r_8 = md5($p_c1_k_g_r_8);

if((strpos(floatval($p_cgal1ery_reg_code)/44,".") == false
        && floatval($p_cgal1ery_reg_code)!=0
        && floatval($p_cgal1ery_reg_code)>=3281329700)
    or in_array($p_c1_k_g_r_8, $arrayNew)
){
		echo "<td style='padding-left:23px;overflow:hidden;'><h4 style='display:inline;'>You are using PRO version. For any issues on PRO version please contact <br/><a href='mailto:support-pro@contest-gallery.com'>support-pro@contest-gallery.com</a></h4></td>";
	}
	else{
		echo "<td style='padding-left:128px;overflow:hidden;'><h4 style='display:inline;'>PRO Version Key: </h4><form action='?page=contest-gallery/index.php' method='POST' style='display:inline;'>";
		echo "<input type='text' name='cgKey' value='' /><input type='submit' value='Enter' style='text-align:center;width:70px;font-size:14px !important;' /></form></td>";
	}
	echo "</tr>";
	echo "</table>";
	echo "<br/>";

    // Die nexte ID des Option Tables ermitteln
    $last = $wpdb->get_row("SHOW TABLE STATUS LIKE '$tablename_options'");
    $nextID = $last->Auto_increment;

$unix = time();

		foreach($selectSQL as $value){

			$option_id = $value -> id;
			$GalleryName = $value -> GalleryName;
            $ContestEnd = $value->ContestEnd;
            $ContestEndTime = $value->ContestEndTime;
            $Version = $value->Version;

			if ($option_id % 2 != 0) {
			$backgroundColor = "#DFDFDF";
			} else {
			$backgroundColor = "#ECECEC";
			}

		echo "<table width='635px' style='border: 1px solid #DFDFDF;background-color:#ffffff;'>";

			echo "<tr style='background-color:#ffffff;'>";

			echo "<td style='padding-left:20px;width:50px;' ><p>ID: $option_id</p></td>";

			if($GalleryName){$GalleryName="<p style='text-align:center;'>$GalleryName</p>";}
			else {$GalleryName="";}

			echo "<td align='center' style='width:250px;'>$GalleryName";
			echo "<p>Shortcode: <span class='cg_main_menu_shortcode'>[cg_gallery id=\"".$option_id."\"]</span></p>";


            if(($unix > $ContestEndTime && $ContestEnd == 1) or $ContestEnd == 2){
                echo "<p><i>contest ended</i></p>";
            }


            echo "</td>";
			echo '<td align="center"><p><form action="?page=contest-gallery/index.php&option_id='.$option_id.'
			&edit_gallery=true" method="POST" ><input type="hidden" name="option_id" value="'.$option_id.'">';
			echo '<input type="hidden" name="edit_gallery_hidden_post"';
			echo '<input type="hidden" name="page" value="contest-gallery/index.php"><input name="" value="Edit" type="Submit" 
            style="text-align:center;width:70px;background:linear-gradient(0deg, #bbe0ef 5%, #90d4f0 70%);"></form></p></td>';
			echo '<td align="center"><p><form action="?page=contest-gallery/index.php&option_id='.$nextID.'
			&edit_gallery=true&copy=true" method="POST" ><input type="hidden" name="option_id" value="'.$nextID.'">';
            echo '<input type="hidden" name="cg_copy" value="true">';
            echo '<input type="hidden" name="id_to_copy" value="'.$option_id.'">';
			echo '<input type="hidden" name="edit_gallery_hidden_post"';
			echo '<input type="hidden" name="page" value="contest-gallery/index.php"><input name="" value="Copy" type="Submit" onClick="return cgCheckCopy('.$option_id.')"
            style="text-align:center;width:70px;background:linear-gradient(0deg, #f1f1f1 5%, #eae3e3 70%);"></form></p></td>';
			echo '<td align="center"><p><form action="?page=contest-gallery/index.php" method="GET" >
            <input type="hidden" name="option_id" value="'.$option_id.'">';
			echo '<input type="hidden" name="delete" value="true"><input type="button" value="Delete" onClick="return cgCheckDelete('.$option_id.','.$Version.')"
            style="text-align:center;width:70px;background:linear-gradient(0deg, #fef050 5%, #fce129 70%);"></form></p></td>';
			//echo '<td style="padding-left:100px;padding-right:20px;"><p><form action="?page=contest-gallery/index.php&option_id=' . $option_id . '&delete=true" method="GET" ><input value="L&ouml;schen" type="Submit"></form></p></td>';

			echo "</tr>";

		echo "</table>";

		@$option_id++;

			}



echo "<br/>";



echo "<table style='border: 1px solid #DFDFDF;background-color:#ffffff;' width='635px'>";
 	echo '<tr><td style="padding-left:20px;overflow:hidden;" colspan="4"><p><form action="?page=contest-gallery/index.php&option_id='.$nextID.'&edit_gallery=true&create=true" method="POST" >';
	echo '<input type="hidden" name="cg_create" value="true">';
	echo '<input type="hidden" name="option_id" value="'.$nextID.'">';
	echo '<input type="hidden" name="create" value="true"><input type="hidden" name="page" value="contest-gallery/index.php">
    <input name="" value="New gallery" type="Submit" style="background:linear-gradient(0deg, #f1f1f1 5%, #eae3e3 70%);"></form></p></td></tr>';
 	//echo '<tr><td style="padding-left:20px;overflow:hidden;" colspan="4"><p><a href="?page=contest-gallery/index.php&option_id=' . $option_id . '&create=true" class="classname">Neue Galerie</a></p></td></tr>';
 	//echo '<tr><td style="padding-left:20px;overflow:hidden;" colspan="4"><p><a href="?page=contest-gallery/index.php&option_id=' . $option_id . '&create=true" class="classname">Neue Galerie</a></p></td></tr>';

	echo "</table>";

	echo '</div>';

?>