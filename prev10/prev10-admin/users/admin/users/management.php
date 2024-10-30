<?php

$GalleryID = $_GET['option_id'];

//include('get-data-management.php');

global $wpdb;

$tablename_contest_gal1ery_options = $wpdb->prefix . "contest_gal1ery_options";
$tablename_contest_gal1ery_create_user_form = $wpdb->prefix . "contest_gal1ery_create_user_form";
$tablename_contest_gal1ery_create_user_entries = $wpdb->prefix . "contest_gal1ery_create_user_entries";
$entriesShort = $tablename_contest_gal1ery_create_user_entries;
$wpUsers = $wpdb->base_prefix . "users";

$GalleryName = $wpdb->get_var("SELECT GalleryName FROM $tablename_contest_gal1ery_options WHERE id = '$GalleryID'");
$allGalleryNamesAndIds = $wpdb->get_results("SELECT GalleryName, id FROM $tablename_contest_gal1ery_options WHERE id >= '0'");


include(dirname(__FILE__) . "/../../../nav-menu.php");

// Tabellennamen bestimmen

//echo $entriesShort;
//var_dump($_POST['galleryIdToSelect']);
if(!empty($_GET['wp_uid'])){$selectWPusers = $wpdb->get_results("SELECT DISTINCT * FROM $wpUsers WHERE ID='".@$_GET['wp_uid']."' ORDER BY id ASC");}
else if(empty($_POST['cg-user-name']) AND !empty($_POST['galleryIdToSelect'])){
    // var_dump(0);
    /*    $selectWPusers = $wpdb->get_results("SELECT $wpUsers.* FROM $wpUsers LEFT JOIN $entriesShort
            ON $wpUsers.ID=$entriesShort.wp_user_id
            WHERE
              $entriesShort.GalleryID='".$_POST['galleryIdToSelect']."'
             ");*/
    $selectWPusers = $wpdb->get_results("SELECT DISTINCT  $wpUsers.* FROM $wpUsers, $entriesShort WHERE $wpUsers.ID=$entriesShort.wp_user_id AND $entriesShort.GalleryID='".$_POST['galleryIdToSelect']."'");

}
else if(!empty($_POST['cg-user-name']) AND empty($_POST['galleryIdToSelect'])){
    // var_dump(1);
    $selectWPusers = $wpdb->get_results("SELECT DISTINCT  $wpUsers.* FROM $wpUsers WHERE user_login LIKE '%".@$_POST['cg-user-name']."%' or user_email LIKE '%".@$_POST['cg-user-name']."%'");
}
else if(!empty($_POST['cg-user-name']) AND !empty($_POST['galleryIdToSelect'])){
    //  var_dump(2);
    $selectWPusers = $wpdb->get_results("SELECT DISTINCT  $wpUsers.* FROM $wpUsers, $entriesShort WHERE $wpUsers.id=$entriesShort.wp_user_id AND   
        ($wpUsers.user_login LIKE '%".@$_POST['cg-user-name']."%' or $wpUsers.user_email LIKE '%".@$_POST['cg-user-name']."%')
		 AND $entriesShort.GalleryID='".$_POST['galleryIdToSelect']."'
		 ");
}
else{


    $start = 0; // Startwert setzen (0 = 1. Zeile)
    $step =10;

    if (isset($_GET["start"])) {
        $muster = "/^[0-9]+$/"; // reg. Ausdruck für Zahlen
        if (preg_match($muster, @$_GET["start"]) == 0) {
            $start = 0; // Bei Manipulation Rückfall auf 0
        } else {
            $start = @$_GET["start"];
        }
    }

    if (isset($_GET["step"])) {
        $muster = "/^[0-9]+$/"; // reg. Ausdruck für Zahlen
        if (preg_match($muster, @$_GET["start"]) == 0) {
            $step = 10; // Bei Manipulation Rückfall auf 0
        } else {
            $step = @$_GET["step"];
        }
    }


    $selectWPusers = $wpdb->get_results("SELECT * FROM $wpUsers ORDER BY id ASC LIMIT $start, $step");

}
/*echo "<br><br>lalalala<br><br>";
echo '<pre>';
print_r($selectWPusers);
echo '</pre>';
echo "<br><br>babababa<br><br>";*/
$selectWPusersFormFields = $wpdb->get_results("SELECT $tablename_contest_gal1ery_create_user_form.* FROM $tablename_contest_gal1ery_create_user_form, $tablename_contest_gal1ery_options WHERE
$tablename_contest_gal1ery_create_user_form.Field_Type != 'main-user-name' and 
$tablename_contest_gal1ery_create_user_form.Field_Type != 'main-mail' and 
$tablename_contest_gal1ery_create_user_form.Field_Type != 'password' and 
$tablename_contest_gal1ery_create_user_form.Field_Type != 'password-confirm' AND 
$tablename_contest_gal1ery_create_user_form.GalleryID = $tablename_contest_gal1ery_options.id 
ORDER BY GalleryID ASC, Field_Order ASC");

if(isset($_POST['get-data-management'])){
    include("get-data-management.php");
}



if(isset($_GET['delete_data_csv'])){
    $admin_email = get_option('admin_email');
    $adminHashedPass = $wpdb->get_var("SELECT user_pass FROM $wpUsers WHERE user_email = '$admin_email'");
    $code = $wpdb->base_prefix; // database prefix
    $code = md5($code.$adminHashedPass);
    @$dir = plugin_dir_path( __FILE__ );
    @$dir = $dir.$code."_userregdata.csv";
    @unlink($dir);
    ?><script>alert('CSV data file deleted.');</script><?php
}

//if(strpos(floatval(get_option("p_cgal1ery_reg_code"))/44,".") == false && floatval(get_option("p_cgal1ery_reg_code"))!=0 && floatval(get_option("p_cgal1ery_reg_code"))>=3281329700){
$versionColor = "#444";
//}
//else{
//	$versionColor = "#c2c2c2";
//	}
echo "<div style='width:900px;background-color:#fff;border: thin solid black;padding-bottom:15px;height:27px;v-align:center;margin-bottom:8px;padding-bottom:8px;padding-top:8px;padding-left:35px;'>";
echo"&nbsp;&nbsp;Show users per Site:";

echo"&nbsp;<a href=\"?page=contest-gallery/index.php&users_management=true&option_id=$GalleryID&step=10&start=0\">10</a>&nbsp;";
echo"&nbsp;<a href=\"?page=contest-gallery/index.php&users_management=true&option_id=$GalleryID&step=20&start=0\">20</a>&nbsp;";
echo"&nbsp;<a href=\"?page=contest-gallery/index.php&users_management=true&option_id=$GalleryID&step=50&start=0\">30</a>&nbsp;";

$iconUrl = plugins_url('icon.png', __FILE__ )."";

echo "";
echo "<form style='font-size: 16px;display:inline;' method='POST' action='?page=contest-gallery/index.php&users_management=true&option_id=$GalleryID#cg-search-results-container'>";

echo '<input type="text" placeholder="Username/Email" style="width:182px;margin-left:130px;" name="cg-user-name" />';
echo '<input type="submit" value="" style="border:none;cursor:pointer;display: inline-block; width: 20px; height: 24px;';
echo 'position: relative; left: -27px;  top: 4px; background: url('.$iconUrl.');background-size: 22px 22px;"/>';
echo '<select name="galleryIdToSelect" style="margin-bottom: 6px;max-width:325px;">';
echo '<option value="">';
echo 'Select users registered about a certain gallery';
echo '</option>';

$selected = '';
foreach($allGalleryNamesAndIds as $keyValue){

    if($keyValue->id==$_POST['galleryIdToSelect']){
        $selected = 'selected';
    }

    echo '<option value="'.$keyValue->id.'" '.$selected.'>';
    if(empty($keyValue->GalleryName)){
        echo 'Gallery id: '.$keyValue->id;
    }
    else{
        echo  $keyValue->GalleryName;
    }
    echo '</option>';

    $selected = '';
}
echo '</select>';


echo "</div>";


$rows = $wpdb->get_var( $wpdb->prepare(
    "
		SELECT COUNT(*) AS NumberOfRows
		FROM $wpUsers 
	",
    $GalleryID
) );

//echo $rows;



if($rows>10 && @$_POST["cg-user-name"]==false && @$_GET["wp_uid"]==false){

    $startLoop = $step;
    $anf = 1;

    echo "<div style='padding-left:35px;'>";
    for ($i = $step; $rows+$step > $i; $i = $i + $step) {

        ////echo "<br>";
        //echo $startLoop;
        // $end = $i + $step;


        if(($i>=$startLoop or $i==0) && $startLoop<$rows){

            $start = $anf-1;

            if($_GET["start"]+1==$anf or @$_GET["start"]==false && $anf==1){
                echo "[ <a style='color:black;text-decoration:none;cursor:default;' href='#'>$anf-$startLoop</a> ]";
            }
            else{
                echo "[ <a href=\"?page=contest-gallery/index.php&users_management=true&option_id=$GalleryID&step=$step&start=$start\">$anf-$startLoop</a>  ]";
            }

            $anf = $anf + $startLoop;
            $startLoop = $startLoop + $step;


        }
        else{
            // echo "works";
            $startLoop = $startLoop - $step;
            $start = $startLoop-1;
            $anf = $startLoop+1;
            if($_GET["start"]+1==$anf or @$_GET["start"]==false && $anf==1){
                echo "[ <a style='color:black;text-decoration:none;cursor:default;' href='#'>$anf-$rows</a> ]";
            }
            else{
                echo "[<a href=\"?page=contest-gallery/index.php&users_management=true&option_id=$GalleryID&step=$step&start=$startLoop\">$anf-$rows</a>  ] ";
            }
        }

    }
    echo "</div>";
}

echo "<div style='width:935px;background-color:#fff;border: thin solid black;padding-bottom:15px;' id='cg-search-results-container'>";
echo "<div id='cg-search-results' style='text-align: center;display:inline;float:left;width:200px;padding-left:8px;margin-bottom:20px;'>
<br><br><br></div>";
echo "<div style='text-align: center;width: 525px;font-size: 16px;display:inline;float:left;padding-top:5px;margin-bottom:5px;margin-left:170px;'>";

?>

    <script>
        function cgCreateDataCSV(e){
            //     return false;
            //  e.preventDefault();
            // document.getElementById("cg_create_user_data_csv_to_appear").innerHTML = "<input type='hidden' name='create_user_data_csv' value='true' />";
            //  document.getElementById("cg_create_user_data_csv_to_appear").innerHTML = "LALALA' />";
            //    alert(1);
        }
    </script>
<?php

if(isset($_POST['cg_create_user_data_csv'])){







    include("create-user-data-csv.php");








}
else{
    echo "<div style='padding-top:15px;'>";
    echo "<div id='cg_create_user_data_csv_to_appear'>";
    echo "<input type='text' name='cg_create_user_data_csv' id='cg_create_user_data_csv' value='true' class='cg_hide' disabled/>";
    echo "</div>";
    echo "<input type='submit' id='cg_create_user_data_csv_submit' value='Create data CSV' style='text-align:center;width:180px;float:left;' /></form>";
    echo "</div>";
    ?>
    <script>

        document.getElementById("cg_create_user_data_csv_submit").addEventListener("click", function hardcoreMegaAction(event){
            //  event.preventDefault();
            //  document.getElementById("cg_create_user_data_csv").removeAttribute('class');
            document.getElementById("cg_create_user_data_csv").removeAttribute('disabled');
            //  return false;

            //  document.getElementById("cg_create_user_data_csv_to_appear").innerHTML = "<input type='hidden' name='create_user_data_csv' value='true' />";
            //
            //    alert(1);

            /*
                    event.preventDefault();
                    var container = document.getElementById("cg_create_user_data_csv_to_appear");
                    var input = document.createElement("input");
                    input.setAttribute("type", "text");
                    input.setAttribute("name", "cg_create_user_data_csv");
                    input.setAttribute("value", "true");
                    container.appendChild(input);
            */

            // Append a line break
            //  container.appendChild(document.createElement("br"));
            /*        document.getElementById("cg_create_user_data_csv_submit").removeEventListener('click',hardcoreMegaAction);
                    if (document.readyState == "complete") {
                        return false;
                        document.getElementById("cg_create_user_data_csv_submit").click();
                    }*/





        });

    </script>

    <?php


}


echo "</div>";

echo "<div style='clear:both;padding:20px;margin:20px;padding-top:20px;border:thin solid black;padding-right: 20px;'>";


if($selectWPusers){

    echo "<form method='POST' action='?page=contest-gallery/index.php&users_management=true&option_id=$GalleryID'>";
    echo "<input type='hidden' name='get-data-management' value='true' >";



    //echo "<br>";
    //var_dump($selectWPusersFormFields);
    //echo "<br>";
    $i = 1;
    $r = 1;
    $rCount = count($selectWPusers);
    foreach($selectWPusers as $key => $value){
        foreach($value as $key1 => $value1){

            //Sammel und anzeigen einzelner User Werte
            if($key1 == "ID"){
                /*	$selectWPusersEntries = $wpdb->get_results("SELECT * FROM $tablename_contest_gal1ery_create_user_entries WHERE (Field_Type != 'main-user-name'
        or Field_Type != 'main-mail' or Field_Type != 'password' or Field_Type != 'password-confirm) and wp_user_id = '$value1' ORDER BY GalleryID ASC");*/

                //var_dump($selectWPusersEntries);
                $userId = $value1;

            }
            if($key1=='user_login'){
                echo "<div style='margin-bottom:10px;' id='cg-user-$userId'>";
                echo "<div style='float:left;display:inline;width:50%;border-bottom: 1px dotted #DFDFDF;'  ><strong>Username</strong></div>";
                echo "<div style='float:right;display:inline;width:50%;text-align:right;border-bottom: 1px dotted #DFDFDF;'><a href='#cg_go_to_save_button'>Go save</a></div>";
                echo "<div>$value1 </div>";
                echo "</div>";
            }
            if($key1=='user_email'){
                echo "<div style='margin-bottom:10px;'>";
                echo "<div style='float:left;display:inline;width:50%;border-bottom: 1px dotted #DFDFDF;'><strong>User e-mail</strong></div>";
                echo "<div style='float:right;display:inline;width:50%;text-align:right;border-bottom: 1px dotted #DFDFDF;'><a href=".get_edit_user_link($userId).">Edit Wordpress Profile</a></div>";
                echo "<div>$value1</div>";
                echo "</div>";
            }


        }

        // Anzeigen von extra User Feldern und Einträgen
        foreach($selectWPusersFormFields as $keyField => $keyValue){

            foreach($keyValue as $keyField1 => $keyValue1){
                //var_dump($keyField1);die;
                if($keyField1=='id'){
                    $f_input_id = $keyValue1;
                    //var_dump($f_input_id);die;
                }

                if($keyField1=='GalleryID'){
                    $formGalleryID = $keyValue1;
                    //var_dump($f_input_id);die;
                }

                if($keyField1=='Field_Name'){
                    $formFieldName = html_entity_decode(stripslashes($keyValue1));
                    //var_dump($f_input_id);die;
                }

                if($keyField1=='Field_Content'){
                    $formFieldContent = html_entity_decode(stripslashes($keyValue1));
                    //var_dump($f_input_id);die;
                }


                if($keyField1=='Field_Type'){
                    $formFieldType = $keyValue1;
                }

                if($keyField1=='Field_Order'){
                    $formFieldOrder = $keyValue1;
                    //var_dump($f_input_id);die;
                }


            }

            //	echo "<div>$userId</div>";
            //	echo "<div>$f_input_id</div>";
            @$selectWPusersEntries = $wpdb->get_row("SELECT * FROM $tablename_contest_gal1ery_create_user_entries WHERE f_input_id = '$f_input_id' AND wp_user_id = '$userId'");
            $userFieldContentBefore = ($selectWPusersEntries) ? 'true' : '';

            $checkAgreementBorder = ($formFieldType=='user-check-agreement-field') ? "border-bottom: 1px dotted #DFDFDF;" : "";

            $GalleryName = '';
            $GalleryName = $wpdb->get_var("SELECT GalleryName FROM $tablename_contest_gal1ery_options WHERE id = '$formGalleryID'");

            if($GalleryName){@$GalleryNameOrId="$GalleryName";}
            else {@$GalleryNameOrId = "id $formGalleryID";}

            //var_dump($selectWPusersEntries);die;
            //echo $selectWPusersEntries -> Field_Content;
            echo "<div style='margin-bottom:10px;'>";
            if($formFieldType!="user-html-field" && $formFieldType!="user-robot-field"){

                echo "<div style='float:left;display:inline;width:50%;$checkAgreementBorder'>";
                echo "<strong>$formFieldName:</strong>";
                echo "</div>";
                echo "<div style='float:right;display:inline;width:50%;text-align:right;$checkAgreementBorder'>";
                echo "<a href='?page=contest-gallery/index.php&create_user_form=true&option_id=$formGalleryID' >Gallery - $GalleryNameOrId</a>";

                echo "</div>";

            }





            echo "<div>";
            $userFieldContent = ($formFieldType=='user-check-agreement-field') ? $formFieldContent : @$selectWPusersEntries -> Field_Content;
            $userFieldDisabled = ($formFieldType=='user-check-agreement-field') ? 'disabled' : '';

            if($formFieldType=="user-text-field"){
                $userFieldContent = html_entity_decode(stripslashes($userFieldContent));
                echo "<input type='text' name='Entry_Field_Content[$i]' value='$userFieldContent' style='width:100%;' />";
            }

            if($formFieldType=="user-select-field"){
                $userFieldContent = html_entity_decode(stripslashes($userFieldContent));
                echo "<input type='text' name='Entry_Field_Content[$i]' value='$userFieldContent' style='width:100%;' />";
            }

            if($formFieldType=="user-comment-field"){
                $userFieldContent = html_entity_decode(stripslashes($userFieldContent));
                echo "<textarea type='comment' name='Entry_Field_Content[$i]' style='width:100%;height:100px;'>$userFieldContent</textarea>";
            }
            if($formFieldType=="user-check-agreement-field"){
                $userFieldContent = html_entity_decode(stripslashes($userFieldContent));
                echo "<input type='checkbox' name='Entry_Field_Content[$i]' checked disabled /> $userFieldContent";
            }

            echo "<input type='hidden' name='Entry_GalleryID[$i]' value='$formGalleryID' >";
            echo "<input type='hidden' name='Entry_wp_user_id[$i]' value='$userId' >";
            echo "<input type='hidden' name='Entry_f_input_id[$i]' value='$f_input_id' >";
            echo "<input type='hidden' name='Entry_Field_Type[$i]' value='$formFieldType' >";
            echo "<input type='hidden' name='Entry_Field_Content_Before[$i]' value='$userFieldContentBefore' >";

            echo "</div>";
            echo "</div>";


            $formFieldType = false;

            $i++;
            //	echo "i: $i";

        }

        if($r<$rCount){
            echo "<div style='padding-top:10px;padding-bottom:10px;' class='cg_users_separator'><hr/></div>";
        }

        $r++;

    }
    echo "<div style='height:30px;' id='cg_go_to_save_button'>";
    echo "<input type='submit' value='Save data' style='float:right;text-align:center;width:80px;'>";
    echo "</div>";
    echo "</form>";
    echo "</div>";
}
else{
    echo "No users found <a href='?page=contest-gallery/index.php&users_management=true&option_id=$GalleryID' />(show all)</a>";
}
echo "<div>";
