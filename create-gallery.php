<?php


global $wpdb;

$tablename = $wpdb->prefix . "contest_gal1ery";
$tablenameCategories = $wpdb->prefix . "contest_gal1ery_categories";
$tablenameOptions = $wpdb->prefix . "contest_gal1ery_options";
$tablename_options_input = $wpdb->prefix . "contest_gal1ery_options_input";
$tablename_options_visual = $wpdb->prefix . "contest_gal1ery_options_visual";
$tablenameMail = $wpdb->prefix . "contest_gal1ery_mail";
$tablename_email_admin = $wpdb->prefix . "contest_gal1ery_mail_admin";
$tablename_form_input = $wpdb->prefix . "contest_gal1ery_f_input";
$tablename_form_output = $wpdb->prefix . "contest_gal1ery_f_output";
$tablename_create_user_form = $wpdb->prefix . "contest_gal1ery_create_user_form";
$tablename_pro_options = $wpdb->prefix . "contest_gal1ery_pro_options";
//  $tablename_mail_gallery = $wpdb->prefix . "contest_gal1ery_mail_gallery";
$tablename_mail_confirmation = $wpdb->prefix . "contest_gal1ery_mail_confirmation";
$tablename_entries = $wpdb->prefix . "contest_gal1ery_entries";


$last = $wpdb->get_var("SELECT MAX(id) FROM $tablenameOptions"); // Get the new id of the gallery options which will be created
$nextIDgallery = $last+1; // Get the new id of the gallery options which will be created


$lastFormInput = $wpdb->get_var("SELECT MAX(id) FROM $tablename_form_input"); // Get the new id of the gallery options which will be created
$nextIDformInput = $lastFormInput+1; // Get the new id of the gallery options which will be created

// Erschaffen eines Galerieordners

$uploadFolder = wp_upload_dir();
$galleryUpload = $uploadFolder['basedir'].'/contest-gallery/gallery-id-'.$nextIDgallery.'';

if(!file_exists($galleryUpload)){
    mkdir($galleryUpload,0755,true);
}


/* $wpdb->insert( $tablenameOptions, array( 'id' => '', 'GalleryName' => '', 'PicsPerSite' => 20, 'WidthThumb' => 200, 'HeightThumb' => 150, 'WidthGallery' => 600,
 'HeightGallery' => 400, 'DistancePics' => 100, 'DistancePicsV' => 50, 'MaxResJPGon' => 0, 'MaxResPNGon' => 0, 'MaxResGIFon' => 0,
 'MaxResJPG' => 25000000, 'MaxResPNG' => 25000000, 'MaxResGIF' => 25000000, 'ScaleOnly' => 1, 'ScaleAndCut' => 0, 'FullSize' => 1,
 'AllowSort' => 1, 'AllowComments' => 1, 'AllowRating' => 1, 'IpBlock' => 1, 'FbLike' => 1, 'AllowGalleryScript' => 0, 'Inform' => 0,
 'ThumbLook'=> 1, 'HeightLook'=> 1, 'RowLook'=> 1,
 'ThumbLookOrder'=> 1, 'HeightLookOrder'=> 2, 'RowLookOrder'=> 3,
 'HeightLookHeight'=> 300, 'ThumbsInRow'=> 4, 'PicsInRow'=> 4, 'LastRow'=> 0 ));*/

if($_GET['create']==true){

    // Achtung hier! ForwardFrom entspricht der Einstellung als ob Slider als Einstellung gewählt ist
    $wpdb->query($wpdb->prepare(
        "
				INSERT INTO $tablenameOptions
				( id, GalleryName, PicsPerSite, WidthThumb, HeightThumb, WidthGallery,
				HeightGallery, DistancePics, DistancePicsV, MaxResJPGon, MaxResPNGon, MaxResGIFon,
				MaxResJPG, MaxResJPGwidth, MaxResJPGheight, MaxResPNG, MaxResPNGwidth, MaxResPNGheight, MaxResGIF, MaxResGIFwidth, MaxResGIFheight,
				OnlyGalleryView, SinglePicView, ScaleOnly, ScaleAndCut, FullSize,
				AllowSort, RandomSort, AllowComments, CommentsOutGallery, AllowRating, VotesPerUser, RatingOutGallery, ShowAlways, ShowAlwaysInfoSlider, IpBlock, CheckLogin,
				FbLike, FbLikeGallery, FbLikeGalleryVote, AllowGalleryScript, InfiniteScroll, FullSizeImageOutGallery, FullSizeImageOutGalleryNewTab, Inform, InformAdmin,TimestampPicDownload,
				ThumbLook, AdjustThumbLook, HeightLook, RowLook,
				ThumbLookOrder, HeightLookOrder, RowLookOrder,
				HeightLookHeight, ThumbsInRow, PicsInRow, LastRow, HideUntilVote, HideInfo, ActivateUpload, ContestEnd, ContestEndTime,
				ForwardToURL, ForwardFrom, ForwardType, ActivatePostMaxMB, PostMaxMB, ActivateBulkUpload, BulkUploadQuantity, BulkUploadMinQuantity,ShowOnlyUsersVotes,FbLikeGoToGalleryLink,Version)
				VALUES ( %s,%s,%d,%d,%d,%d,
				%d,%d,%d,%d,%d,%d,
				%d,%d,%d,%d,%d,%d,%d,%d,%d,
				%d,%d,%d,%d,%d,%d,
				%d,%d,%d,%d,%d,%d,%d,%d,%d,
				%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,
				%d,%d,%d,%d,%d,
				%d,%d,%d,
				%d,%d,%d,%d,%d,%d,%d,%d,%d,
				%d,%d,%d,%d,%d,%d,%d,%d,%d,%s,%d )
			",
        '','',20,300,200,640,
        400,3,3,0,0,0,
        25000000,800,600,25000000,800,600,25000000,800,600,
        0,0,1,0,1,
        0,0,1,1,2,0,1,1,0,1,0,
        0,0,0,1,0,0,0,0,0,0,
        1,1,1,1,
        2,1,3,
        300,4,2,0,0,0,0,0,0,
        1,1,0,0,2,0,3,2,0,'',$dbVersion
    ));

    $createdGallery = "true";

    $wpdb->query( $wpdb->prepare(
        "
				INSERT INTO $tablename_options_visual
					( id, GalleryID, CommentsAlignGallery, RatingAlignGallery,
					Field1IdGalleryView,Field1AlignGalleryView,Field2IdGalleryView,Field2AlignGalleryView,Field3IdGalleryView,Field3AlignGalleryView,
					ThumbViewBorderWidth,ThumbViewBorderRadius,ThumbViewBorderColor,ThumbViewBorderOpacity,HeightViewBorderWidth,HeightViewBorderRadius,HeightViewBorderColor,HeightViewBorderOpacity,HeightViewSpaceWidth,HeightViewSpaceHeight,
					RowViewBorderWidth,RowViewBorderRadius,RowViewBorderColor,RowViewBorderOpacity,RowViewSpaceWidth,RowViewSpaceHeight,TitlePositionGallery,RatingPositionGallery,CommentPositionGallery,
					ActivateGalleryBackgroundColor,GalleryBackgroundColor,GalleryBackgroundOpacity,OriginalSourceLinkInSlider,PreviewInSlider)
					VALUES ( %s,%d,%s,%s,
					%s,%s,%s,%s,%s,%s,
					%d,%d,%s,%d,%d,%d,%s,%d,%d,%d,
					%d,%d,%s,%d,%d,%d,%d,%d,%d,%d,%s,%d,%d,%d)
				",
        '',$nextIDgallery,'left','left',
        '','left','','left','','left',
        0,0,'#000000',1,0,0,'#000000',1,0,0,
        0,0,'#000000',1,0,0,1,1,1,0,'#000000',1,1,1
    ) );


    $confirmationText = "<p>Your picture upload was successful.<br/>We will activate your picture soon.<br/>Your picture has to be approved.</p>";
    $confirmationText = htmlentities($confirmationText, ENT_QUOTES, 'UTF-8');

    // $wpdb->insert( $tablename_options_input, array( 'id' => '', 'Forward' => 0, 'Forward_URL' => '', 'Confirmation_Text' => "$confirmationText" ));

    $wpdb->query( $wpdb->prepare(
        "
				INSERT INTO $tablename_options_input
				( id, GalleryID, Forward, Forward_URL, Confirmation_Text)
				VALUES ( %s,%d,%d,
				%s,%s )
			",
        '',$nextIDgallery,0,
        '',$confirmationText
    ) );



    // Determine email of blog admin and variables for email table
    $from = get_option('blogname');
    $reply = get_option('admin_email');
    $AdminMail = get_option('admin_email');
    $Header = 'Your picture was published';
    $HeaderActivationMail = 'Your picture was published';
    $HeaderAdminMail = 'A picture was published';
    $Content = 'Dear Sir or Madam<br/>Your picture was published<br/><br/><b>$url$</b>';
    $ContentAdminMail = 'Dear Admin<br/><br/>A new picture was published<br/><br/><br/>$info$';



    /*$wpdb->insert( $tablenameMail, array( 'id' => '', 'GalleryID' => $nextIDgallery, 'Admin' => "$from",
        'Header' => "$Header", 'Reply' => "$reply", 'cc' => "$reply",
        'bcc' => "$reply", 'Url' => '', 'Content' => "$Content"));*/


    $wpdb->query($wpdb->prepare(
        "
				INSERT INTO $tablenameMail
				( id, GalleryID, Admin,
				Header,Reply,cc,
				bcc,Url,Content)
				VALUES ( %s,%d,%s,
				%s,%s,%s,
				%s,%s,%s)
			",
        '',$nextIDgallery,$from,
        $HeaderActivationMail,$reply,$reply,
        $reply,'',$Content
    ));


    $wpdb->query($wpdb->prepare(
        "
				INSERT INTO $tablename_email_admin
				( id, GalleryID, Admin, AdminMail,
				Header,Reply,cc,
				bcc,Url,Content)
				VALUES ( %s,%d,%s,%s,
				%s,%s,%s,
				%s,%s,%s)
			",
        '',$nextIDgallery,$from,$AdminMail,
        $HeaderAdminMail,$reply,$reply,
        $reply,'',$ContentAdminMail
    ));

    /*
            $wpdb->query($wpdb->prepare(
                "
                    INSERT INTO $tablename_mail_gallery
                    ( id, GalleryID, Admin,
                    Header,Reply,CC,
                    BCC,Content,
                    Blacklist,SendToImageOff,
                    SendToNotConfirmedUsers)
                    VALUES ( %s,%d,%s,
                    %s,%s,%s,
                    %s,%s,
                    %s,%d,
                    %d)
                ",
                '',$nextIDgallery,$from,
                '',$reply,$reply,
                $reply,'',
                '',0,
                1
            ));*/

    $HeaderConfirmationMail = 'Please confirm your e-mail address';
    $ContentConfirmationMail = 'Dear Sir or Madam<br/>Please confirm your e-mail address to take part on photo contest<br/><br/><b>$url$</b>';
    $ConfirmationTextConfirmationMail = 'Thank you for confirming your e-mail address.';

    $wpdb->query($wpdb->prepare(
        "
				INSERT INTO $tablename_mail_confirmation
				( id, GalleryID, Admin,
				Header,Reply,CC,
				BCC,Content,SendConfirm,
				ConfirmationText,URL)
				VALUES ( %s,%d,%s,
				%s,%s,%s,
				%s,%s,%d,
				%s,%s)
			",
        '',$nextIDgallery,$from,
        $HeaderConfirmationMail,$reply,$reply,
        $reply,$ContentConfirmationMail,0,
        $ConfirmationTextConfirmationMail,''
    ));




    // Erschaffen von Form_Input


    // Create input comment for lite version


    // Feldtyp
    // Feldreihenfolge
    // 1 = Feldtitel
    // 2 = Feldinhalt
    // 3 = Feldkrieterium1
    // 4 = Feldkrieterium2
    // 5 = Felderfordernis


    /*				// 1. Feldtitel
                    $kfFieldsArray['titel']= "Comment";
                    // 2. Feldinhalt
                    $kfFieldsArray['content'] = "Comment";
                    $commentFieldTitel = "Comment";
                    // 3. Feldkriterium 1
                    $kfFieldsArray['min-char']= "3";
                    // 4. Feldkriterium 2
                    $kfFieldsArray['max-char']= "1000";
                    // 5. Felderfordernis + Eingabe in die Datenbank
                    $kfFieldsArray['mandatory']="";

                    $kfFieldsArray = serialize($kfFieldsArray);

                    $commentF = 'comment-f';*/

    //$wpdb->insert( $tablename_form_input, array( 'id' => '', 'GalleryID' => $nextIDgallery,'Field_Type' => 'comment-f',
    //"Field_Order" => 1, "Field_Content" => $kfFieldsArray ) );

    /*$wpdb->query($wpdb->prepare(
    "
        INSERT INTO $tablename_form_input
        (id, GalleryID, Field_Type,
        Field_Order,Field_Content)
        VALUES ( %s,%d,%s,
        %s,%s)
    ",
    '',$nextIDgallery,$commentF,
    1,$kfFieldsArray
    ));*/



    // Create input comment for lite version ---- ENDE


    // Erschaffen von Form Input Image und Text-F und einstellen show in gallery und slider

    $fieldContent=array();
    $fieldContent['titel']="Picture upload";


    $fieldContent = serialize($fieldContent);

    $imageF = 'image-f';

    //$wpdb->insert( $tablename_form_input, array( 'id' => '', 'GalleryID' => $nextIDgallery, 'Field_Type' => 'image-f', "Field_Order" => 2, "Field_Content" => $fieldContent ) );

    $wpdb->query($wpdb->prepare(
        "
						INSERT INTO $tablename_form_input
						(id, GalleryID, Field_Type,
						Field_Order,Field_Content,Show_Slider,Use_as_URL,Active)
						VALUES ( %s,%d,%s,
						%d,%s,%d,%d,%d)
					",
        '',$nextIDgallery,$imageF,
        2,$fieldContent,0,0,1
    ));

    $imageIdFormInput = $wpdb->get_var( "SELECT id FROM $tablename_form_input WHERE GalleryID='$nextIDgallery' AND Field_Type='image-f' ");


    // Kreieren e-mail feld

    /*                    $efFieldsArray = array();
                        // 1. Feldtitel
                        $efFieldsArray['titel']="E-Mail";
                        // 2. Feldinhalt
                        $efFieldsArray['content']='';
                        // 3. Feldkriterium 1
                        $efFieldsArray['min-char']=3;
                        // 4. Feldkriterium 2
                        $efFieldsArray['max-char']=100;
                        // 5. Felderfordernis + Eingabe in die Datenbank
                        $efFieldsArray['mandatory']="off";

                        $efFieldsArray = serialize($efFieldsArray);

                        // Zuerst Form Input kreiren
                        $wpdb->query( $wpdb->prepare(
                            "
                                                        INSERT INTO $tablename_form_input
                                                        ( id, GalleryID, Field_Type, Field_Order, Field_Content,Show_Slider)
                                                        VALUES ( %s,%d,%s,%d,%s,%d )
                                                    ",
                            '',$nextIDgallery,'email-f',2,$efFieldsArray,0
                        ) );*/




    $nfFieldsArray = array();
    // 1. Feldtitel
    $nfFieldsArray['titel']="Title";
    // 2. Feldinhalt
    $nfFieldsArray['content']='';
    // 3. Feldkriterium 1
    $nfFieldsArray['min-char']=3;
    // 4. Feldkriterium 2
    $nfFieldsArray['max-char']=100;
    // 5. Felderfordernis + Eingabe in die Datenbank
    $nfFieldsArray['mandatory']="off";

    $nfFieldsArray = serialize($nfFieldsArray);

    // Zuerst Form Input kreiren
    $wpdb->query( $wpdb->prepare(
        "
							INSERT INTO $tablename_form_input
							( id, GalleryID, Field_Type, Field_Order, Field_Content,Show_Slider,Use_as_URL,Active)
							VALUES ( %s,%d,%s,%d,%s,%d,%d,%d )
						",
        '',$nextIDgallery,'text-f',1,$nfFieldsArray,1,0,1
    ) );


    $textIdFormInput = $wpdb->get_var( "SELECT id FROM $tablename_form_input WHERE GalleryID='$nextIDgallery' AND Field_Type='text-f' ");

    // Dann next ID hier einfügen
    $wpdb->update(
        "$tablename_options_visual",
        array('Field1IdGalleryView' => $textIdFormInput),
        array('GalleryID' => $nextIDgallery),
        array('%d'),
        array('%d')
    );





    // Erschaffen von Form_Input --- ENDE


    // Erschaffen von Form_Output single pic


    $wpdb->query($wpdb->prepare(
        "
						INSERT INTO $tablename_form_output
						(id, f_input_id, GalleryID,
						Field_Type,Field_Order,Field_Content)
						VALUES ( %s,%d,%d,
						%s,%d,%s)
					",
        '',$textIdFormInput,$nextIDgallery,
        'text-f',1,'Title'
    ));

    $wpdb->query($wpdb->prepare(
        "
						INSERT INTO $tablename_form_output
						(id, f_input_id, GalleryID,
						Field_Type,Field_Order,Field_Content)
						VALUES ( %s,%d,%d,
						%s,%d,%s)
					",
        '',$imageIdFormInput,$nextIDgallery,
        'image-f',2,'Picture upload'
    ));



    // Erschaffen von Form_Output single pic --- ENDE


    $FbLikeGoToGalleryLinkPlaceholder = '<a href = "'.site_url().'">Go to gallery</a>';


    $backToGalleryFileContent = "function loadButton(){
			document.getElementById('cgBackToGallery').innerHTML='$FbLikeGoToGalleryLinkPlaceholder'
		}";



    $backToGalleryFile = $uploadFolder["basedir"]."/contest-gallery/gallery-id-$nextIDgallery/backtogalleryurl.js";
    $fp = fopen($backToGalleryFile, 'w');
    fwrite($fp, $backToGalleryFileContent);
    fclose($fp);

    /*
    if(!file_exists($galleryCache)){
    mkdir($galleryCache,0777,true);
    }

    if(!file_exists($galleryCacheGallery)){
    mkdir($galleryCacheGallery,0777,true);
    }

    if(!file_exists($galleryCacheSite)){
    mkdir($galleryCacheSite,0777,true);
    }*/


        // Kreieren der notwendigen formular Felder

        $wpdb->query( $wpdb->prepare(
            "
						INSERT INTO $tablename_create_user_form
						( id, GalleryID, Field_Type, Field_Order,
						Field_Name,Field_Content,Min_Char,Max_Char,
						Required,Active)
						VALUES ( %s,%d,%s,%s,
						%s,%s,%d,%d,
						%d,%d)
					",
            '',$nextIDgallery,'main-user-name',1,
            'Username','',6,100,
            1,1
        ) );

        $wpdb->query( $wpdb->prepare(
            "
						INSERT INTO $tablename_create_user_form
						( id, GalleryID, Field_Type, Field_Order,
						Field_Name,Field_Content,Min_Char,Max_Char,
						Required,Active)
						VALUES ( %s,%d,%s,%s,
						%s,%s,%d,%d,
						%d,%d)
					",
            '',$nextIDgallery,'main-mail',2,
            'E-mail','',0,0,
            1,1
        ) );

        $wpdb->query( $wpdb->prepare(
            "
						INSERT INTO $tablename_create_user_form
						( id, GalleryID, Field_Type, Field_Order,
						Field_Name,Field_Content,Min_Char,Max_Char,
						Required,Active)
						VALUES ( %s,%d,%s,%s,
						%s,%s,%d,%d,
						%d,%d)
					",
            '',$nextIDgallery,'password',3,
            'Password','',6,100,
            1,1
        ) );

        $wpdb->query( $wpdb->prepare(
            "
						INSERT INTO $tablename_create_user_form
						( id, GalleryID, Field_Type, Field_Order,
						Field_Name,Field_Content,Min_Char,Max_Char,
						Required,Active)
						VALUES ( %s,%d,%s,%s,
						%s,%s,%d,%d,
						%d,%d)
					",
            '',$nextIDgallery,'password-confirm',4,
            'Password confirm','',6,100,
            1,1
        ) );





        // Kreieren der notwendigen formular Felder --- ENDE

        // Kreieren PRO options


        $ForwardAfterRegText = 'Thank you for your registration<br/>Check your email account to confirm your email and complete the registration. If you don\'t see any message then plz check also the spam folder.';
        $ForwardAfterLoginText = 'You are now logged in. Have fun with photo contest.';
        $TextEmailConfirmation = 'Thank you for your registration by clicking on the link below: <br/><br/> $regurl$';
        $TextAfterEmailConfirmation = 'Thank you for your registration. You are now able to login and to take part on the photo contest.';
        $RegUserUploadOnlyText = 'You have to be registered to upload your images.';

        // Determine email of blog admin and variables for email table
        $RegMailAddressor = get_option('blogname');
        $RegMailReply = get_option('admin_email');
        $RegMailSubject = 'Please confirm your registration';

        $wpdb->query( $wpdb->prepare(
            "
					INSERT INTO $tablename_pro_options
					( id, GalleryID, ForwardAfterRegUrl, ForwardAfterRegText,
					ForwardAfterLoginUrlCheck,ForwardAfterLoginUrl,
					ForwardAfterLoginTextCheck,ForwardAfterLoginText,
					TextEmailConfirmation,TextAfterEmailConfirmation,
					RegMailAddressor,RegMailReply,RegMailSubject,RegUserUploadOnly,RegUserUploadOnlyText,Manipulate,ShowOther,CatWidget)
					VALUES (%s,%s,%s,%s,
					%d,%s,
					%d,%s,
					%s,%s,
					%s,%s,%s,%d,%s,%d,%d,%d)
				",
            '',$nextIDgallery,'',$ForwardAfterRegText,
            0,'',
            1,$ForwardAfterLoginText,
            $TextEmailConfirmation,$TextAfterEmailConfirmation,
            $RegMailAddressor,$RegMailReply,$RegMailSubject,0,$RegUserUploadOnlyText,0,1,1
        ) );


        // Kreieren PRO options --- ENDE



    echo "<br>";
    echo "<div style='width:937px;background-color:#fff;margin-bottom:0px !important;margin-bottom:0px;border: 1px solid #DFDFDF;text-align:center;'>";
    echo "<h2>You created a new gallery</h2>";
    echo "</div>";
    echo "<br>";

}

if(isset($_GET['copy'])){

    $idToCopy = $_POST['id_to_copy'];

    $galleryToCopy = $wpdb->get_row("SELECT * FROM $tablenameOptions WHERE id = '$idToCopy' ");
    $cgVersion = $galleryToCopy->Version;

    $valueCollect = array();

    foreach($galleryToCopy as $key => $value){

        if($key=='id'){$value = $nextIDgallery;}
        $valueCollect[$key] = $value;

    }


    $wpdb->insert(
        $tablenameOptions,
        $valueCollect,
        array(
            '%s','%s','%d','%d','%d','%d',
            '%d','%d','%d','%d','%d','%d',
            '%d','%d','%d','%d','%d','%d','%d','%d','%d',
            '%d','%d','%d','%d','%d','%d',
            '%d','%d','%d','%d','%d','%d','%d','%d','%d',
            '%d','%d','%d','%d','%d','%d','%d','%d','%d','%d',
            '%d','%d','%d','%d','%d',
            '%d','%d','%d',
            '%d','%d','%d','%d','%d','%d','%d','%d','%d',
            '%d','%d','%d','%d','%d','%d','%d','%d','%d','%s','%d'
        )

    );

    // Gleich auf die Version ab der mit der neuen Art des Hinzufügens von Images updaten
    $wpdb->update(
        "$tablenameOptions",
        array('Version' => 7),
        array('id' => $nextIDgallery),
        array('%d'),
        array('%d')
    );

// Create f_input

    $galleryToCopy = $wpdb->get_results("SELECT * FROM $tablename_form_input WHERE GalleryID = '$idToCopy' ");

    $valueCollect = array();

    $collectInputIdsArray = array();

    foreach($galleryToCopy as $key => $value){

        foreach($value as $key1 => $value1){

            if($key1=='id'){$lastInputIdOld = $value1;$value1 = '';}
            if($key1=='GalleryID'){$value1 = $nextIDgallery;}
            $valueCollect[$key1] = $value1;

        }
        //var_dump($valueCollect);
        $wpdb->insert(
            $tablename_form_input,
            $valueCollect,
            array(
                '%s','%d','%s',
                '%d','%s','%d','%d','%d'
            )
        );

        $lastInputInfo = $wpdb->get_var("SELECT MAX(id) FROM $tablename_form_input");
        $lastInputId = $lastInputInfo;
        $collectInputIdsArray[$lastInputIdOld] = $lastInputId;

        $valueCollect = array();

    }

// Create Options Visual

    $galleryToCopy = $wpdb->get_row("SELECT * FROM $tablename_options_visual WHERE id = '$idToCopy' ");

    $valueCollect = array();

    foreach($galleryToCopy as $key => $value){

        if($key=='id'){$value = '';}
        if($key=='GalleryID'){$value = $nextIDgallery;}
        if($key=='Field1IdGalleryView'){$value = $collectInputIdsArray[$value];}
        $valueCollect[$key] = $value;

    }


    $wpdb->insert(
        $tablename_options_visual,
        $valueCollect,
        array(
            '%s','%d','%s','%s',
            '%s','%s','%s','%s','%s','%s',
            '%d','%d','%s','%d','%d','%d','%s','%d','%d','%d',
            '%d','%d','%s','%d','%d','%d','%d','%d','%d','%d','%s','%d','%d','%d'
        )
    );

// Create Options Input

    $galleryToCopy = $wpdb->get_row("SELECT * FROM $tablename_options_input WHERE id = '$idToCopy' ");

    $valueCollect = array();

    foreach($galleryToCopy as $key => $value){

        if($key=='id'){$value = '';}
        if($key=='GalleryID'){$value = $nextIDgallery;}
        $valueCollect[$key] = $value;

    }


    $wpdb->insert(
        $tablename_options_input,
        $valueCollect,
        array(
            '%s','%d','%d',
            '%s','%s'
        )
    );

// Create email user

    $galleryToCopy = $wpdb->get_row("SELECT * FROM $tablenameMail WHERE GalleryID = '$idToCopy' ");

    $valueCollect = array();

    foreach($galleryToCopy as $key => $value){

        if($key=='id'){$value = '';}
        if($key=='GalleryID'){$value = $nextIDgallery;}
        $valueCollect[$key] = $value;

    }


    $wpdb->insert(
        $tablenameMail,
        $valueCollect,
        array(
            '%s','%d','%s',
            '%s','%s','%s',
            '%s','%s','%s'
        )
    );


// Create email admin

    $galleryToCopy = $wpdb->get_row("SELECT * FROM $tablename_email_admin WHERE GalleryID = '$idToCopy' ");

    $valueCollect = array();

    foreach($galleryToCopy as $key => $value){

        if($key=='id'){$value = '';}
        if($key=='GalleryID'){$value = $nextIDgallery;}
        $valueCollect[$key] = $value;

    }


    $wpdb->insert(
        $tablename_email_admin,
        $valueCollect,
        array(
            '%s','%d','%s','%s',
            '%s','%s','%s',
            '%s','%s','%s'
        )
    );

// Create email gallery


    /*        $galleryToCopy = $wpdb->get_row("SELECT * FROM $tablename_mail_gallery WHERE GalleryID = '$idToCopy' ");

            $valueCollect = array();

            foreach($galleryToCopy as $key => $value){

                if($key=='id'){$value = '';}
                if($key=='GalleryID'){$value = $nextIDgallery;}
                $valueCollect[$key] = $value;

            }


            $wpdb->insert(
                $tablename_mail_gallery,
                $valueCollect,
                array(
                    '%s','%d','%s',
                    '%s','%s','%s',
                    '%s','%s','%s',
                    '%d','%d'
                )
            );*/


// Create confirmation email

    $galleryToCopy = $wpdb->get_row("SELECT * FROM $tablename_mail_confirmation WHERE GalleryID = '$idToCopy' ");

    $valueCollect = array();

    foreach($galleryToCopy as $key => $value){

        if($key=='id'){$value = '';}
        if($key=='GalleryID'){$value = $nextIDgallery;}
        $valueCollect[$key] = $value;

    }


    $wpdb->insert(
        $tablename_mail_confirmation,
        $valueCollect,
        array(
            '%s','%d','%s',
            '%s','%s','%s',
            '%s','%s','%s',
            '%s'
        )
    );


// Create categories

    if($cgVersion>=7){

        $galleryToCopy = $wpdb->get_results("SELECT * FROM $tablenameCategories WHERE GalleryID = '$idToCopy' ");

        if(!empty($galleryToCopy)){

            $valueCollect = array();

            $collectCatIdsArray = array();

            foreach($galleryToCopy as $key => $value){

                foreach($value as $key1 => $value1){

                    if($key1=='id'){
                        $collectCatIdsArray[$value1]=0;// pauschal erstmal null setzen
                        $catIdOld = $value1;
                        $value1 = '';
                    }
                    if($key1=='GalleryID'){$value1 = $nextIDgallery;}
                    $valueCollect[$key1] = $value1;

                }
                //var_dump($valueCollect);
                $wpdb->insert(
                    $tablenameCategories,
                    $valueCollect,
                    array(
                        '%s','%d','%s',
                        '%d','%s','%d','%d'
                    )
                );

                $lastCategoryInfo = $wpdb->get_var("SELECT MAX(id) FROM $tablenameCategories");
                $lastCategoryId = $lastCategoryInfo;
                $collectCatIdsArray[$catIdOld] = $lastCategoryId;

                $valueCollect = array();

            }

        }

    }

// Create tablename

    if($cgVersion>=7){

        $galleryToCopy = $wpdb->get_results("SELECT * FROM $tablename WHERE GalleryID = '$idToCopy' ");

        $valueCollect = array();
        $collectImageIdsArray = array();

        foreach($galleryToCopy as $key => $value){

            foreach($value as $key1 => $value1){

                if($key1=='id'){$lastImageIdOld=$value1;$value1 = '';}
                if($key1=='GalleryID'){$value1 = $nextIDgallery;}
                if($key1=='CountC'){$value1 = 0;}
                if($key1=='CountR'){$value1 = 0;}
                if($key1=='CountS'){$value1 = 0;}
                if($key1=='Rating'){$value1 = 0;}
                if($key1=='Informed'){$value1 = 0;}
                if($key1=='addCountS'){$value1 = 0;}
                if($key1=='addCountR1'){$value1 = 0;}
                if($key1=='addCountR2'){$value1 = 0;}
                if($key1=='addCountR3'){$value1 = 0;}
                if($key1=='addCountR4'){$value1 = 0;}
                if($key1=='addCountR5'){$value1 = 0;}
                if($key1=='Category'){$value1 = $collectCatIdsArray[$value1];}
                $valueCollect[$key1] = $value1;

            }

            //var_dump($valueCollect);
            $wpdb->insert(
                $tablename,
                $valueCollect,
                array(
                    '%s','%d','%d',
                    '%s','%s',
                    '%d','%d','%d','%d',
                    '%d','%d','%d',
                    '%d','%d','%d','%d','%d','%d',
                    '%d','%d','%d','%d','%d','%d','%d'
                )
            );

            $lastImageInfo = $wpdb->get_var("SELECT MAX(id) FROM $tablename");
            $lastImageId = $lastImageInfo;
            $collectImageIdsArray[$lastImageIdOld] = $lastImageId;


            $valueCollect = array();

        }


    }




// Create user_entries

    if($cgVersion>=7){

        $galleryToCopy = $wpdb->get_results("SELECT * FROM $tablename_entries WHERE GalleryID = '$idToCopy' ");

        $valueCollect = array();

        // $collectShortTextArray = array();
        //$collectLongTextArray = array();

        foreach($galleryToCopy as $key => $value){

            foreach($value as $key1 => $value1){

                if($key1=='id'){$value1 = '';}
                if($key1=='GalleryID'){$value1 = $nextIDgallery;}
                if($key1=='pid'){$value1 = $collectImageIdsArray[$value1];}
                if($key1=='f_input_id'){$value1 = $collectInputIdsArray[$value1];}
                $valueCollect[$key1] = $value1;

            }
            //var_dump($valueCollect);
            $wpdb->insert(
                $tablename_entries,
                $valueCollect,
                array(
                    '%s','%d','%d','%d',
                    '%s','%d','%s','%s','%d'
                )
            );


            $valueCollect = array();

        }

    }


// Create f_output

    $galleryToCopy = $wpdb->get_results("SELECT * FROM $tablename_form_output WHERE GalleryID = '$idToCopy' ");

    $valueCollect = array();

    foreach($galleryToCopy as $key => $value){

        foreach($value as $key1 => $value1){

            if($key1=='id'){$value1 = '';}
            if($key1=='GalleryID'){$value1 = $nextIDgallery;}
            $valueCollect[$key1] = $value1;

        }
        //var_dump($valueCollect);
        $wpdb->insert(
            $tablename_form_output,
            $valueCollect,
            array(
                '%s','%d','%d',
                '%s','%d','%s'
            )
        );

        $valueCollect = array();

    }


// Create create user form

    $galleryToCopy = $wpdb->get_results("SELECT * FROM $tablename_create_user_form WHERE GalleryID = '$idToCopy' ");

    $valueCollect = array();

    foreach($galleryToCopy as $key => $value){

        foreach($value as $key1 => $value1){

            if($key1=='id'){$value1 = '';}
            if($key1=='GalleryID'){$value1 = $nextIDgallery;}
            $valueCollect[$key1] = $value1;

        }
        //var_dump($valueCollect);
        $wpdb->insert(
            $tablename_create_user_form,
            $valueCollect,
            array(
                '%s','%d','%s','%s',
                '%s','%s','%d','%d',
                '%d','%d'
            )
        );

        $valueCollect = array();

    }

// Create Pro Options

    $galleryToCopy = $wpdb->get_row("SELECT * FROM $tablename_pro_options WHERE id = '$idToCopy' ");

    $valueCollect = array();

    foreach($galleryToCopy as $key => $value){

        if($key=='id'){$value = '';}
        if($key=='GalleryID'){$value = $nextIDgallery;}
        $valueCollect[$key] = $value;

    }


    $wpdb->insert(
        $tablename_pro_options,
        $valueCollect,
        array(
            '%s','%d','%s','%s',
            '%d','%s',
            '%d','%s',
            '%s','%s',
            '%s','%s','%s','%d','%s','%d','%d','%d'
        )
    );




//var_dump($valueCollect);
    // die;


    if(!$cgVersion>=7){

        echo "<br>";
        echo "<div style='width:937px;background-color:#fff;margin-bottom:0px !important;margin-bottom:0px;padding: 0 10px; border: 1px solid #DFDFDF;text-align:center;'>";
        echo "<h2>You created a new gallery based on a gallery which was created before version 7 update. Only settings were copied.<br/>
            If you copy this new created gallery again images will be also copied then.</h2>";
        echo "</div>";
        echo "<br>";

    }
    else{
        echo "<br>";
        echo "<div style='width:937px;background-color:#fff;margin-bottom:0px !important;margin-bottom:0px;border: 1px solid #DFDFDF;text-align:center;'>";
        echo "<h2>You created a new gallery based on a copy</h2>";
        echo "</div>";
        echo "<br>";

    }



}
?>