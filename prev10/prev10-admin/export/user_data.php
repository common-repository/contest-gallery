<?php
if(!function_exists('cg_user_data_csv_export')){

    function cg_user_data_csv_export(){
        global $wpdb;

        $tablename = $wpdb->prefix . "contest_gal1ery";
        $tablename_f_input = $wpdb->prefix . "contest_gal1ery_f_input";
        $table_posts = $wpdb->prefix."posts";
        $wpUsers = $wpdb->base_prefix . "users";
        $tablenameentries = $wpdb->prefix . "contest_gal1ery_entries";
        $contest_gal1ery_categories = $wpdb->prefix . "contest_gal1ery_categories";

        $GalleryID = $_GET['option_id'];

        $content_url = wp_upload_dir();
        $content_url = $content_url['baseurl']; // Pfad zum Bilderordner angeben

        $getFormFieldNames = 0;
        $emailFieldCsvNumber = '';

        $categories = $wpdb->get_results( "SELECT * FROM $contest_gal1ery_categories WHERE GalleryID = '$GalleryID' ORDER BY Field_Order DESC");
        $selectSQLall = $wpdb->get_results( "SELECT * FROM $tablename WHERE GalleryID = '$GalleryID' ORDER BY rowid DESC");
        $selectFormInput = $wpdb->get_results( "SELECT id, Field_Type, Field_Order, Field_Content FROM $tablename_f_input WHERE GalleryID = '$GalleryID' AND (Field_Type = 'text-f' OR Field_Type = 'comment-f' OR Field_Type ='email-f' OR Field_Type ='select-f' OR Field_Type ='selectc-f' OR Field_Type ='url-f') ORDER BY Field_Order DESC" );


        if(count($categories)){

            $categoriesUidsNames = array();
            $categoriesUidsNames[0] = '';
            foreach ($categories as $category) {

                $categoriesUidsNames[$category->id] = $category->Name;

            }

        }



        $selectContentFieldArray = array();

        foreach ($selectFormInput as $value) {

            // 1. Feld Typ
            // 2. ID des Feldes in F_INPUT
            // 3. Feld Reihenfolge
            // 4. Feld Content

            $selectFieldType = 	$value->Field_Type;
            $id = $value->id;// prim�re unique id der form wird auch gespeichert und sp�ter in entries inserted zur erkennung des verwendeten formular feldes
            $fieldOrder = $value->Field_Order;// Die originale Field order in f_input Tabelle. Zwecks Vereinheitlichung.
            $selectContentFieldArray[] = $selectFieldType;
            $selectContentFieldArray[] = $id;
            $selectContentFieldArray[] = $fieldOrder;
            $selectContentField = unserialize($value->Field_Content);
            $selectContentFieldArray[] = $selectContentField["titel"];

        }


        $csvData = array();

        $i=0;
        $r=0;
        $n=0;

        $GalleryID1="GalleryID";
        $id1="id";//ACHTUNG! Darf nicht Anfangen mit ID(Großgeschrieben I oder D am Anfang) in einer csv Datei, ansonsten ungültige SYLK Datei!
        $rowid1="rowid";
        $UploadDate1="UploadDate";
        $NamePic1="NamePic";
        $DownloadURL1="DownloadURL";
        $WordPressUserId="WpUserId";
        $WordPressUserName="WpUserName";
        $WordPressUserEmail="WpUserEmail";
        $CountComments1="CountComments";
        $CountRatingOneStar ="CountRatingOneStar";
        $CountRatingFiveStars="CountRatingFiveStars";
        $CumulatedRatingFiveStars="CumulatedRatingFiveStars";
        $AvarageRating1="AverageRating";
        $Active1="Active";
        $Informed1="Informed";


        $csvData[$i][$r]=$GalleryID1;
        $r++;
        $csvData[$i][$r]=$id1;
        $r++;
        $csvData[$i][$r]=$rowid1;
        $r++;
        $csvData[$i][$r]=$UploadDate1;
        $r++;
        $csvData[$i][$r]=$NamePic1;
        $r++;
        $csvData[$i][$r]=$DownloadURL1;
        $r++;
        $csvData[$i][$r]=$WordPressUserId;
        $r++;
        $csvData[$i][$r]=$WordPressUserName;
        $r++;
        $csvData[$i][$r]=$WordPressUserEmail;
        $r++;
        $csvData[$i][$r]=$CountComments1;
        $r++;
        $csvData[$i][$r]=$CountRatingOneStar;
        $r++;
        $csvData[$i][$r]=$CountRatingFiveStars;
        $r++;
        $csvData[$i][$r]=$CumulatedRatingFiveStars;
        $r++;
        $csvData[$i][$r]=$AvarageRating1;
        $r++;
        $csvData[$i][$r]=$Active1;
        $r++;
        $csvData[$i][$r]=$Informed1;
        $r++;




        //Bestimmung der Spalten Namen



        if($n==0){

            foreach($selectContentFieldArray as $key => $formvalue){

                //	echo "<br>$i<br>";

                // 1. Feld Typ
                // 2. ID des Feldes in F_INPUT
                // 3. Feld Reihenfolge
                // 4. Feld Content



                if(@$formvalue=='text-f'){$fieldtype="nf"; $n=1; continue;}
                if(@$fieldtype=="nf" AND $n==1){$formFieldId=$formvalue; $n=2; continue;}
                if(@$fieldtype=="nf" AND $n==2){$fieldOrder=$formvalue; $n=3; continue;}
                if (@$fieldtype=="nf" AND $n==3) {

                    $csvData[$i][$r]="$formvalue";
                    $r++;
                    $n=0;

                }

                if(@$formvalue=='email-f'){$fieldtype="ef";  $n=1; continue;}
                if(@$fieldtype=="ef" AND $n==1){$formFieldId=$formvalue; $n=2; continue;}
                if(@$fieldtype=="ef" AND $n==2){$fieldOrder=$formvalue; $n=3; continue;}
                if (@$fieldtype=='ef' AND $n==3) {

                    $csvData[$i][$r]="$formvalue";
                    $emailFieldCsvNumber = $r;
                    $r++;
                    $n=0;
                }

                if(@$formvalue=='comment-f'){$fieldtype="kf"; $n=1; continue;}
                if(@$fieldtype=="kf" AND $n==1){$formFieldId=$formvalue; $n=2; continue;}
                if(@$fieldtype=="kf" AND $n==2){$fieldOrder=$formvalue; $n=3; continue;}
                if (@$fieldtype=='kf' AND $n==3) {

                    $csvData[$i][$r]="$formvalue";
                    $r++;
                    $n=0;
                }

                if(@$formvalue=='select-f'){$fieldtype="se"; $n=1; continue;}
                if(@$fieldtype=="se" AND $n==1){$formFieldId=$formvalue; $n=2; continue;}
                if(@$fieldtype=="se" AND $n==2){$fieldOrder=$formvalue; $n=3; continue;}
                if (@$fieldtype=='se' AND $n==3) {

                    $csvData[$i][$r]="$formvalue";
                    $r++;
                    $n=0;
                }


                if(@$formvalue=='selectc-f'){$fieldtype="sec"; $n=1; continue;}
                if(@$fieldtype=="sec" AND $n==1){$formFieldId=$formvalue; $n=2; continue;}
                if(@$fieldtype=="sec" AND $n==2){$fieldOrder=$formvalue; $n=3; continue;}
                if (@$fieldtype=='sec' AND $n==3) {
                    $categoryTitle ="$formvalue";
                 //   $r++;
                 //   $n=0;
                }


            }

        }

        // Category Select always as last!!!!!!

        if(count($categories)){

            $r++;
            $csvData[$i][$r] = $categoryTitle;

        }


        // Setting titles ended now starting setting values


            $getFormFieldNames++;
        // Bestimmung der Feld-Inhalte
        $r = 0;
        $i++;
        foreach($selectSQLall as $value){

            $csvData[$i][$r]=$value->GalleryID;
            $r++;
            $csvData[$i][$r]=$value->id;
            $pidCSV=$value->id;
            $r++;
            $csvData[$i][$r]=$value->rowid;
            $r++;
            $uploadTime = date('m.d.Y H:i', $value->Timestamp);
            $csvData[$i][$r]=$uploadTime;
            $r++;
            $csvData[$i][$r]=$value->NamePic;
            $r++;
            $WpUserId = $value->WpUserId;
            if($value->WpUpload!=NULL && $value->WpUpload>0){
                $csvData[$i][$r]=$wpdb->get_var("SELECT guid FROM $table_posts WHERE ID = '".$value->WpUpload."'");
            }
            else{
                $csvData[$i][$r]=''.$content_url.'/contest-gallery/gallery-id-'.$GalleryID.'/'.$value->Timestamp.'_'.$value->NamePic.'.'.$value->ImgType.'';
            }
            $r++;
            if($value->WpUserId!=NULL && $value->WpUserId>0){
                $wpUserData=$wpdb->get_row("SELECT * FROM $wpUsers WHERE ID = '".$value->WpUserId."'");
                $csvData[$i][$r]=$wpUserData->ID;
            }
            else{
                $csvData[$i][$r]='';
            }
            $r++;
            if($value->WpUserId!=NULL && $value->WpUserId>0){
                $csvData[$i][$r]=$wpUserData->user_nicename;
            }
            else{
                $csvData[$i][$r]='';
            }
            $r++;
            if($value->WpUserId!=NULL && $value->WpUserId>0){
                $csvData[$i][$r]=$wpUserData->user_email;
            }
            else{
                $csvData[$i][$r]='';
            }
            $r++;
            $csvData[$i][$r]=$value->CountC;
            $r++;
            $csvData[$i][$r]=$value->CountS;
            $r++;
            $csvData[$i][$r]=$value->CountR;
            $r++;
            $csvData[$i][$r]=$value->Rating;
            $r++;
            @$averageStars = $value->Rating/$value->CountR;
            @$averageStarsRounded = round($averageStars,0);
            $csvData[$i][$r]=@$averageStars;
            $r++;

            $csvData[$i][$r]=$value->Active;
            $r++;
            $csvData[$i][$r]=$value->Informed;
            $r++;
            //       var_dump($r);

            $selectSQLentries = $wpdb->get_results( "SELECT * FROM $tablenameentries WHERE pid = '$pidCSV' ORDER BY Field_Order ASC");

            if(!empty($selectSQLentries)){
                $mailInserted = false;
                foreach($selectSQLentries as $value_entries){

                    $fieldType = $value_entries->Field_Type;
                    //	echo $value_entries->Short_Text;


                    // $emailField = false;


                    if($fieldType=="email-f" && !empty($WpUserId)){

                        //  $emailField = true;
                        //  var_dump('mailInsertedBefore');

                        //    var_dump($mailInserted);

                        $mailInserted= true;

                        $csvData[$i][$r]=$wpdb->get_var("SELECT user_email FROM $wpUsers WHERE ID = $WpUserId");}
                    else if($fieldType=="comment-f"){$csvData[$i][$r]=$value_entries->Long_Text;}
                    else{
                        $csvData[$i][$r]=$value_entries->Short_Text;
                    }
                    $r++;


                }

                if(!empty($emailFieldCsvNumber) && !empty($WpUserId) && $mailInserted==false){
                    //     var_dump($i);
                    //   var_dump($emailFieldCsvNumber);
                    $csvData[$i][$emailFieldCsvNumber]=$wpdb->get_var("SELECT user_email FROM $wpUsers WHERE ID = $WpUserId");
                }
            }
            else{


                // ACHTUNG!!!! Leere Felder müssen gefüllt werden ansonsten erscheint der inhalt einfacher in der nächsten spalte und nicht in der richtigen
                //    var_dump($i);

                foreach ($selectFormInput as $container) {
                    $r++;
                    //    var_dump($r);
                    $csvData[$i][$r] = '';

                }

                if(!empty($emailFieldCsvNumber) && !empty($WpUserId)){
                    // Keine Ahnung warum :)
                    $fieldNumber = $emailFieldCsvNumber+1;
                    $csvData[$i][$fieldNumber]=$wpdb->get_var("SELECT user_email FROM $wpUsers WHERE ID = $WpUserId");

                }


            }


            if(count($categories)){

                $r++;
                $csvData[$i][$r] = $categoriesUidsNames[$value->Category];

            }



            $i++;
            $r=0;
        }

        //	print_r($csvData);

        /*	$list = array (
        array('aaa', 'bbb', 'ccc'),
        array('123', '456', '789')

    );*/


        $admin_email = get_option('admin_email');
        $adminHashedPass = $wpdb->get_var("SELECT user_pass FROM $wpUsers WHERE user_email = '$admin_email'");

        $code = $wpdb->base_prefix; // database prefix
        $code = md5($code.$adminHashedPass);

        $filename = $code."_userdata.csv";


        header("Content-type: text/csv");
        header("Content-Disposition: attachment; filename=$filename");

        ob_start();

        $fp = fopen("php://output", 'w');
        fputs($fp, $bom =( chr(0xEF) . chr(0xBB) . chr(0xBF) ));
        foreach ($csvData as $fields) {
            fputcsv($fp, $fields, ";");

        }
        fclose($fp);
        $masterReturn = ob_get_clean();
        echo $masterReturn;
        die();
    }
}

?>