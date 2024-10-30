<?php

if(!function_exists('contest_gal1ery_create_table')){
    function contest_gal1ery_create_table($i){


        global $wpdb;


        $tablename = $wpdb->prefix . "$i"."contest_gal1ery";
        $tablename_ip = $wpdb->prefix . "$i"."contest_gal1ery_ip";
        $tablename_comments = $wpdb->prefix . "$i"."contest_gal1ery_comments";
        $tablename_options = $wpdb->prefix . "$i"."contest_gal1ery_options";
        $tablename_options_input = $wpdb->prefix . "$i"."contest_gal1ery_options_input";
        $tablename_options_visual = $wpdb->prefix . "$i"."contest_gal1ery_options_visual";
        $tablename_email = $wpdb->prefix . "$i"."contest_gal1ery_mail";
        $tablename_email_admin = $wpdb->prefix . "$i"."contest_gal1ery_mail_admin";
        $tablename_entries = $wpdb->prefix . "$i"."contest_gal1ery_entries";
        $tablename_create_user_entries = $wpdb->prefix . "$i"."contest_gal1ery_create_user_entries";
        $tablename_pro_options = $wpdb->prefix . "$i"."contest_gal1ery_pro_options";
        $tablename_create_user_form = $wpdb->prefix . "$i"."contest_gal1ery_create_user_form";
        $tablename_form_input = $wpdb->prefix . "$i"."contest_gal1ery_f_input";
        $tablename_form_output = $wpdb->prefix . "$i"."contest_gal1ery_f_output";
        //  $tablename_mail_gallery = $wpdb->prefix . "$i"."contest_gal1ery_mail_gallery";
        //  $tablename_mail_gallery_users_history = $wpdb->prefix . "$i"."contest_gal1ery_mail_gallery_users_history";
        $tablename_mails_collected = $wpdb->prefix . "$i"."contest_gal1ery_mails_collected";
        $tablename_mail_confirmation = $wpdb->prefix . "$i"."contest_gal1ery_mail_confirmation";
        $tablename_categories = $wpdb->prefix . "$i"."contest_gal1ery_categories";
//    $tablename_mails_users_relations = $wpdb->prefix . "$i"."contest_gal1ery_mails_users_realations";

        if($wpdb->get_var("SHOW TABLES LIKE '$tablename_categories'") != $tablename_categories){
            $sql = "CREATE TABLE $tablename_categories (
		id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
		GalleryID INT (20),
	    Name VARCHAR(1000),
	    Field_Order INT(3),
        Active TINYINT
		) DEFAULT CHARACTER SET utf8";
            require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
            dbDelta($sql);
        }


        if($wpdb->get_var("SHOW TABLES LIKE '$tablename'") != $tablename){
            $sql = "CREATE TABLE $tablename (
		id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
		rowid INT(99),
		Timestamp INT(20),
		NamePic VARCHAR(1000),
		ImgType VARCHAR(5),
		CountC INT(11) DEFAULT 0,
		CountR INT(11) DEFAULT 0,
		CountS INT(11) DEFAULT 0,
		Rating INT(17)  DEFAULT 0,
		GalleryID INT(99),
		Active INT(1) DEFAULT 0,
		Informed INT(1) DEFAULT 0,
		WpUpload INT(11),
		Width INT (11),
		Height INT (11),
		WpUserId INT (11),
		rSource INT(11),
		rThumb INT(11),
		addCountS INT(20) DEFAULT 0,
		addCountR1 INT(20) DEFAULT 0,
		addCountR2 INT(20) DEFAULT 0,
		addCountR3 INT(20 ) DEFAULT 0,
		addCountR4 INT(20) DEFAULT 0,
		addCountR5 INT(20 ) DEFAULT 0,
		Category INT(20) DEFAULT 0
		) DEFAULT CHARACTER SET utf8";
            require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
            dbDelta($sql);
        }

        else{

            $sql = "ALTER TABLE $tablename MODIFY COLUMN NamePic VARCHAR(1000) NOT NULL";
            require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
            dbDelta($sql);
        }

        if($wpdb->get_var("SHOW TABLES LIKE '$tablename_ip'") != $tablename_ip){
            $sql = "CREATE TABLE $tablename_ip (
		id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
		pid INT (99),
		IP VARCHAR (99),
		GalleryID INT (99),
		Rating INT (1),
		RatingS INT (1),
		WpUserId INT (11)
		) DEFAULT CHARACTER SET utf8";
            require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
            dbDelta($sql);
        }

        if($wpdb->get_var("SHOW TABLES LIKE '$tablename_comments'") != $tablename_comments){
            $sql = "CREATE TABLE $tablename_comments (
		id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
		pid INT (99),
		GalleryID INT (6),
		Name VARCHAR(35),
		Date VARCHAR(50),
		Comment TEXT,
		Timestamp VARCHAR(20)
		) DEFAULT CHARACTER SET utf8";
            require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
            dbDelta($sql);
        }

        //URL VARCHAR(2000) erst ab Version 3.06 vorhanden
        if($wpdb->get_var("SHOW TABLES LIKE '$tablename_email'") != $tablename_email){
            $sql = "CREATE TABLE $tablename_email (
		id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
		GalleryID INT (99),
		Admin VARCHAR(200),
		Header VARCHAR(200),
		Reply VARCHAR(200),
		CC VARCHAR(200),
		BCC VARCHAR(200),
		URL VARCHAR(2000),
		Content VARCHAR (65535)
		) DEFAULT CHARACTER SET utf8";
            require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
            dbDelta($sql);
        }

        $tableOptionsHasToBeCreated = false;
        if($wpdb->get_var("SHOW TABLES LIKE '$tablename_options'") != $tablename_options){
            $sql = "CREATE TABLE $tablename_options(
		id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
		GalleryName VARCHAR(200),
		PicsPerSite INT (3),
		WidthThumb INT (5),
		HeightThumb INT (5),
		WidthGallery INT (5),
		HeightGallery INT (5),
		DistancePics INT (5),
		DistancePicsV INT (5),
		MaxResJPGon INT(1),
		MaxResPNGon INT(1),
		MaxResGIFon INT(1),
		MaxResJPG INT(20),
		MaxResJPGwidth INT(20),
		MaxResJPGheight INT(20),
		MaxResPNG INT(20),
		MaxResPNGwidth INT(20),
		MaxResPNGheight INT(20),
		MaxResGIF INT(20),
		MaxResGIFwidth INT(20),
		MaxResGIFheight INT(20),
		OnlyGalleryView TINYINT,
		SinglePicView TINYINT,
		ScaleOnly TINYINT,
		ScaleAndCut TINYINT,
		FullSize TINYINT,
		AllowSort TINYINT,
		RandomSort TINYINT,
		AllowComments TINYINT,
		CommentsOutGallery TINYINT,
		AllowRating TINYINT,
		VotesPerUser INT(5),
		RatingOutGallery TINYINT,
		ShowAlways TINYINT,
		ShowAlwaysInfoSlider TINYINT,
		IpBlock TINYINT,
		CheckLogin TINYINT,
		FbLike TINYINT,
		FbLikeGallery TINYINT,
		FbLikeGalleryVote TINYINT,
		AllowGalleryScript TINYINT,
		InfiniteScroll TINYINT,
		FullSizeImageOutGallery TINYINT,
		FullSizeImageOutGalleryNewTab TINYINT,
		Inform TINYINT,
		InformAdmin TINYINT,
		TimestampPicDownload VARCHAR(20),
		ThumbLook TINYINT,
		AdjustThumbLook TINYINT,
		HeightLook TINYINT,
		RowLook TINYINT,
		ThumbLookOrder TINYINT,
		HeightLookOrder TINYINT,
		RowLookOrder TINYINT,
		HeightLookHeight INT(3),
		ThumbsInRow TINYINT,
		PicsInRow TINYINT,
		LastRow TINYINT,
		HideUntilVote TINYINT,
		HideInfo TINYINT,
		ActivateUpload TINYINT,
		ContestEnd TINYINT,
		ContestEndTime VARCHAR(100),
		ForwardToURL TINYINT,
		ForwardFrom TINYINT,
		ForwardType TINYINT,
		ActivatePostMaxMB TINYINT,
		PostMaxMB INT(20),
		ActivateBulkUpload TINYINT,
		BulkUploadQuantity INT(20),
		BulkUploadMinQuantity INT(20),
		ShowOnlyUsersVotes TINYINT,
		FbLikeGoToGalleryLink VARCHAR(1000),
		Version VARCHAR(20)
		) DEFAULT CHARACTER SET utf8";
            require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
            dbDelta($sql);
            $tableOptionsHasToBeCreated=true;
        }

        if($tableOptionsHasToBeCreated==false){

            // Anlegen der absolut notwendigen User Form Feldern (Username, E-Mail, Password und Confirm Password)

            $selectIDs = $wpdb->get_results( "SELECT id FROM $tablename_options" );

            $collectIDs = array();

            foreach ($selectIDs as $key => $value) {

                foreach ($value as $key => $value1) {
                    $collectIDs[]= $value1;
                }
            }
        }


        //URL VARCHAR(2000) erst ab Version 3.06 vorhanden
        if($wpdb->get_var("SHOW TABLES LIKE '$tablename_email_admin'") != $tablename_email_admin){
            $sql = "CREATE TABLE $tablename_email_admin (
		id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
		GalleryID INT (99),
		Admin VARCHAR(200),
		AdminMail VARCHAR(200),
		Header VARCHAR(200),
		Reply VARCHAR(200),
		CC VARCHAR(200),
		BCC VARCHAR(200),
		URL VARCHAR(2000),
		Content VARCHAR (65535)
		) DEFAULT CHARACTER SET utf8";
            require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
            dbDelta($sql);

            if($tableOptionsHasToBeCreated==false){

                // Determine email of blog admin and variables for email table
                $from = get_option('blogname');
                $reply = get_option('admin_email');
                $AdminMail = get_option('admin_email');
                $Header = 'A new picture was published';
                $ContentAdminMail = 'Dear Admin<br/><br/>A new picture was published<br/><br/><br/>$info$';

                foreach ($collectIDs as $key => $value) {


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
                        '',$value,$from,$AdminMail,
                        $Header,$reply,$reply,
                        $reply,'',$ContentAdminMail
                    ));

                }

            }
        }


        if($wpdb->get_var("SHOW TABLES LIKE '$tablename_options_visual'") != $tablename_options_visual){
            //IF(SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = "$tablename_options_visual" LIMIT 1){
            $sql = "CREATE TABLE $tablename_options_visual(
		id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
		GalleryID INT(99),
		CommentsAlignGallery VARCHAR(20),
		RatingAlignGallery VARCHAR(20),
		Field1IdGalleryView INT(20),
		Field1AlignGalleryView VARCHAR(20),
		Field2IdGalleryView INT(20),
		Field2AlignGalleryView VARCHAR(20),
		Field3IdGalleryView INT(20),
		Field3AlignGalleryView VARCHAR(20),
		ThumbViewBorderWidth INT(20),
		ThumbViewBorderRadius INT(20),		
		ThumbViewBorderColor VARCHAR(20),
		ThumbViewBorderOpacity VARCHAR(20),
		HeightViewBorderWidth INT(20),
		HeightViewBorderRadius INT(20),
		HeightViewBorderColor VARCHAR(20),
		HeightViewBorderOpacity VARCHAR(20),
		HeightViewSpaceWidth INT(20),
		HeightViewSpaceHeight INT(20),
		RowViewBorderWidth INT(20),
		RowViewBorderRadius INT(20),
		RowViewBorderColor VARCHAR(20),
		RowViewBorderOpacity VARCHAR(20),
		RowViewSpaceWidth INT(20),
		RowViewSpaceHeight INT(20),
		TitlePositionGallery TINYINT,
		RatingPositionGallery TINYINT,
		CommentPositionGallery TINYINT,
		ActivateGalleryBackgroundColor TINYINT,
		GalleryBackgroundColor VARCHAR(20),
		GalleryBackgroundOpacity VARCHAR(20),
		FormRoundBorder INT(11),
		FormBorderColor VARCHAR(256),
		FormButtonColor VARCHAR(256),
		FormButtonWidth INT(11),
		FormInputWidth INT(11),
        OriginalSourceLinkInSlider TINYINT,
        PreviewInSlider TINYINT
		) DEFAULT CHARACTER SET utf8";
            require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
            dbDelta($sql);

            if($tableOptionsHasToBeCreated==false){

                foreach ($collectIDs as $key => $value) {

                    $wpdb->query( $wpdb->prepare(
                        "
							INSERT INTO $tablename_options_visual
								( id, GalleryID, CommentsAlignGallery, RatingAlignGallery,
								Field1IdGalleryView,Field1AlignGalleryView,Field2IdGalleryView,Field2AlignGalleryView,Field3IdGalleryView,Field3AlignGalleryView,
								ThumbViewBorderWidth,ThumbViewBorderRadius,ThumbViewBorderColor,ThumbViewBorderOpacity,HeightViewBorderWidth,HeightViewBorderRadius,HeightViewBorderColor,HeightViewBorderOpacity,HeightViewSpaceWidth,HeightViewSpaceHeight,
								RowViewBorderWidth,RowViewBorderRadius,RowViewBorderColor,RowViewBorderOpacity,RowViewSpaceWidth,RowViewSpaceHeight,TitlePositionGallery,RatingPositionGallery,CommentPositionGallery,
								ActivateGalleryBackgroundColor,GalleryBackgroundColor,GalleryBackgroundOpacity)
								VALUES ( %s,%d,%s,%s,
								%s,%s,%s,%s,%s,%s,
								%d,%d,%s,%d,%d,%d,%s,%d,%d,%d,
								%d,%d,%s,%d,%d,%d,%d,%d,%d,%d,%s,%d)
							",
                        '',$value,'left','left',
                        '','left','','left','','left',
                        0,0,'#000000',1,0,0,'#000000',1,0,0,
                        0,0,'#000000',1,0,0,1,1,1,0,'#000000',1
                    ) );

                }

            }

        }

        //if($wpdb->get_var('SHOW TABLES LIKE ' . $tablename_options_visual) == $tablename_options_visual){}


        if($wpdb->get_var("SHOW TABLES LIKE '$tablename_options_input'") != $tablename_options_input){
            $sql = "CREATE TABLE $tablename_options_input(
		id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
		GalleryID INT(99),
		Forward TINYINT,
		Forward_URL VARCHAR(999),
		Confirmation_Text VARCHAR(65535)
		) DEFAULT CHARACTER SET utf8";
            require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
            dbDelta($sql);

        }


        if($wpdb->get_var("SHOW TABLES LIKE '$tablename_entries'") != $tablename_entries){
            $sql = "CREATE TABLE $tablename_entries (
		id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
		pid INT(99),
		f_input_id INT (99),
		GalleryID INT(99),
		Field_Type VARCHAR(10),
		Field_Order INT(3),
		Short_Text VARCHAR(999),
		Long_Text VARCHAR(65535),
		ConfMailId INT (99)
		) DEFAULT CHARACTER SET utf8";
            require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
            dbDelta($sql);
        }


        if(file_exists(plugin_dir_path( __FILE__ )."admin/users/prev10/prev10-admin/registry/create-user-form.php")){

            add_role(
                'contest_gallery_user',
                __( 'Contest Gallery User' ),
                array(
                    'read' => false
                )
            );

            if($wpdb->get_var("SHOW TABLES LIKE '$tablename_pro_options'") != $tablename_pro_options){
                $sql = "CREATE TABLE $tablename_pro_options (
			id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
			GalleryID INT(99),
			ForwardAfterRegUrl VARCHAR(999),
			ForwardAfterRegText VARCHAR(65535),
			ForwardAfterLoginUrlCheck TINYINT,
			ForwardAfterLoginUrl VARCHAR(999),
			ForwardAfterLoginTextCheck TINYINT,
			ForwardAfterLoginText VARCHAR(65535),
			TextEmailConfirmation VARCHAR(65535),
			TextAfterEmailConfirmation VARCHAR(65535),
			RegMailAddressor VARCHAR(200),
			RegMailReply VARCHAR(200),
			RegMailSubject VARCHAR(200),
			RegUserUploadOnly TINYINT,
			RegUserUploadOnlyText VARCHAR(65535),
			Manipulate TINYINT,
			ShowOther TINYINT DEFAULT 1,
			CatWidget TINYINT DEFAULT 1
			) DEFAULT CHARACTER SET utf8";
                require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
                dbDelta($sql);



                if($tableOptionsHasToBeCreated==false){


                    $ForwardAfterRegText = <<<HEREDOC
Thank you for your registration<br/>Check your email account to confirm your email and complete the registration. If you don't see any message then plz check also the spam folder.
HEREDOC;
                    $ForwardAfterLoginText = 'You are now logged in. Have fun with photo contest.';
                    $TextEmailConfirmation = 'Thank you for your registration by clicking on the link below: <br/><br/> $regurl$';
                    $TextAfterEmailConfirmation = 'Thank you for your registration. You are now able to login and to take part on the photo contest.';
                    $RegUserUploadOnlyText = 'You have to be registered to upload your images.';

                    // Determine email of blog admin and variables for email table
                    $RegMailAddressor = get_option('blogname');
                    $RegMailReply = get_option('admin_email');
                    $RegMailSubject = 'Please confirm your registration';

                    foreach ($collectIDs as $key => $value) {
                        $wpdb->query( $wpdb->prepare(
                            "
                                INSERT INTO $tablename_pro_options
                                ( id, GalleryID, ForwardAfterRegUrl, ForwardAfterRegText,
                                ForwardAfterLoginUrlCheck,ForwardAfterLoginUrl,
                                ForwardAfterLoginTextCheck,ForwardAfterLoginText,
                                TextEmailConfirmation,TextAfterEmailConfirmation,
                                RegMailAddressor,RegMailReply,RegMailSubject,RegUserUploadOnly,RegUserUploadOnlyText,Manipulate,ShowOther)
                                VALUES (%s,%d,%s,%s,
                                %d,%s,
                                %d,%s,
                                %s,%s,
                                %s,%s,%s,%d,%s,%d,%d)
                            ",
                            '',$value,'',$ForwardAfterRegText,
                            0,'',
                            0,$ForwardAfterLoginText,
                            $TextEmailConfirmation,$TextAfterEmailConfirmation,
                            $RegMailAddressor,$RegMailReply,$RegMailSubject,0,$RegUserUploadOnlyText,0,1
                        ) );
                    }
                }
            }




            if($wpdb->get_var("SHOW TABLES LIKE '$tablename_create_user_entries'") != $tablename_create_user_entries){
                $sql = "CREATE TABLE $tablename_create_user_entries (
			id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
			GalleryID INT(99),
			wp_user_id INT(99),
			f_input_id INT (99),
			Field_Type VARCHAR(100),
			Field_Content VARCHAR(65535),
			activation_key VARCHAR(200)
			) DEFAULT CHARACTER SET utf8";
                require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
                dbDelta($sql);
            }


            if($wpdb->get_var("SHOW TABLES LIKE '$tablename_create_user_form'") != $tablename_create_user_form){
                $sql = "CREATE TABLE $tablename_create_user_form (
			id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
			GalleryID INT(99),
			Field_Type VARCHAR(100),
			Field_Order INT(3),
			Field_Name VARCHAR(200),
			Field_Content VARCHAR(65535),
			Min_Char VARCHAR(200),
			Max_Char VARCHAR(200),
			Required TINYINT,
			Active TINYINT DEFAULT 1
			) DEFAULT CHARACTER SET utf8";
                require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
                dbDelta($sql);

                if($tableOptionsHasToBeCreated==false){


                    foreach ($collectIDs as $key => $value) {

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
                            '',$value,'main-user-name','1',
                            'Username','',3,100,
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
                            '',$value,'main-mail','2',
                            'E-mail','','','',
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
                            '',$value,'password','3',
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
                            '',$value,'password-confirm','4',
                            'Confirm Password','',6,100,
                            1,1
                        ) );


                    }

                    // Anlegen der absolut notwendigen User Form Feldern (Username, E-Mail, Password und Confirm Password) --- ENDE


                }
            }




        }




        if($wpdb->get_var("SHOW TABLES LIKE '$tablename_form_input'") != $tablename_form_input){
            $sql = "CREATE TABLE $tablename_form_input (
		id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
		GalleryID INT(99),
		Field_Type VARCHAR(10),
		Field_Order INT(3),
		Field_Content VARCHAR(65535),
		Show_Slider TINYINT,
		Use_as_URL TINYINT,
		Active TINYINT DEFAULT 1
		) DEFAULT CHARACTER SET utf8";
            require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
            dbDelta($sql);
        }


        if($wpdb->get_var("SHOW TABLES LIKE '$tablename_form_output'") != $tablename_form_output){
            $sql = "CREATE TABLE $tablename_form_output (
		id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
		f_input_id INT (99),
		GalleryID INT(99),
		Field_Type VARCHAR(10),
		Field_Order INT(3),
		Field_Content VARCHAR(65535)
		) DEFAULT CHARACTER SET utf8";
            require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
            dbDelta($sql);
        }


        if($wpdb->get_var("SHOW TABLES LIKE '$tablename_mail_confirmation'") != $tablename_mail_confirmation){
            $sql = "CREATE TABLE $tablename_mail_confirmation (
		id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
		GalleryID INT (99),
		Admin VARCHAR(200),
		Header VARCHAR(200),
		Reply VARCHAR(200),
		CC VARCHAR(200),
		BCC VARCHAR(200),
		Content VARCHAR (65535),
		SendConfirm TINYINT,
		ConfirmationText VARCHAR(65535),
		URL VARCHAR(2000)
		) DEFAULT CHARACTER SET utf8";
            require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
            dbDelta($sql);

            if($tableOptionsHasToBeCreated==false){

                // Determine email of blog admin and variables for email table
                $from = get_option('blogname');
                $reply = get_option('admin_email');
                $HeaderConfirmationMail = 'Please confirm your e-mail address';
                $ContentConfirmationMail = 'Dear Sir or Madam<br/>Please confirm your e-mail address to take part on photo contest<br/><br/><b>$url$</b>';
                $ConfirmationTextConfirmationMail = 'Thank you for confirming your e-mail address.';

                foreach ($collectIDs as $key => $value) {

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
                        '',$value,$from,
                        $HeaderConfirmationMail,$reply,$reply,
                        $reply,$ContentConfirmationMail,0,
                        $ConfirmationTextConfirmationMail,''
                    ));

                }
            }



        }

        /*
                if($wpdb->get_var("SHOW TABLES LIKE '$tablename_mail_gallery'") != $tablename_mail_gallery){
                    $sql = "CREATE TABLE $tablename_mail_gallery (
                id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                GalleryID INT (11),
                Admin VARCHAR(200),
                Header VARCHAR(200),
                Reply VARCHAR(200),
                CC VARCHAR(200),
                BCC VARCHAR(200),
                Content VARCHAR (65535),
                Blacklist VARCHAR (65535),
                SendToImageOff TINYINT,
                SendToNotConfirmedUsers TINYINT NULL DEFAULT 1
                ) DEFAULT CHARACTER SET utf8";
                    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
                    dbDelta($sql);

                    if($tableOptionsHasToBeCreated==false){

                        // Determine email of blog admin and variables for email table
                        $from = get_option('blogname');
                        $reply = get_option('admin_email');

                        foreach ($collectIDs as $key => $value) {

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
                                '',$value,$from,
                                '',$reply,$reply,
                                $reply,'',
                                '',0,
                                1
                            ));

                        }
                    }

                }



                if($wpdb->get_var("SHOW TABLES LIKE '$tablename_mail_gallery_users_history'") != $tablename_mail_gallery_users_history){
                    $sql = "CREATE TABLE $tablename_mail_gallery_users_history (
                id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                GalleryID INT (11),
                Timestamp INT (11),
                Date VARCHAR(100),
                Content VARCHAR(65535)
                ) DEFAULT CHARACTER SET utf8";
                    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
                    dbDelta($sql);
                }

                if($wpdb->get_var("SHOW TABLES LIKE '$tablename_mails_users_relations'") != $tablename_mails_users_relations){
                    $sql = "CREATE TABLE $tablename_mails_users_relations (
                id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                WpMailUserID INT (11),
                CgMailUserID INT (11),
                CgSendedMailID INT(11)
                ) DEFAULT CHARACTER SET utf8";
                    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
                    dbDelta($sql);
                }

        */

        if($wpdb->get_var("SHOW TABLES LIKE '$tablename_mails_collected'") != $tablename_mails_collected){
            $sql = "CREATE TABLE $tablename_mails_collected (
		id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
		GalleryID INT(99),
		Mail VARCHAR (200),
		Hash VARCHAR (100),
		Confirmed TINYINT,
		Timestamp INT(11),		
		Link VARCHAR(1000)
		) DEFAULT CHARACTER SET utf8";
            require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
            dbDelta($sql);
        }


        //ADD first first Galery

        $uploads = wp_upload_dir();
        $checkUploads = $uploads['basedir'].'/contest-gallery';

        if(!is_dir($checkUploads)){
            mkdir($checkUploads,0755);
        }



        // check database update requirements here



// Pauschal codes hinzufügen damit später alles glatt läuft:
        add_option("p_cgal1ery_reg_code",1);
        add_option("p_c1_k_g_r_9",1);

// Update Tables if already created --- END

        //  include('update/update-check.php');



    }
}


?>