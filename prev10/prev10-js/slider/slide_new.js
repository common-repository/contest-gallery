if(contest_gal1ery_upload_version>=7){
cgJsClass.slider.slide = {
    init:function (CGclickedClass) {

        //console.log('CGclickedClass');
      //  console.log(CGclickedClass);

        // Prüfen ob neue Bild vor der aktivierten Categorie sich befindet oder dahinter

/*        if(nextPage==true){
            console.log('nextPage');
            console.log(cgJsClass.slider.slide.values.visible);
            alert('class_of_element: '+class_of_element);

        }*/

        var classCGimageNumber = parseInt(CGclickedClass.substr(8));


        if(classCGimageNumber<2 && cgJsClass.slider.slide.values.visible[classCGimageNumber]==false){

            var breakLoop = false;
            var searchNextValue = false;

            cgJsClass.slider.slide.values.visible.forEach(function(value,index){

                if(searchNextValue==true && breakLoop == false && value==true){

                    classCGimageNumber = index;
                    breakLoop = true;
                }

                if(index==classCGimageNumber && value==false && breakLoop==false){
                    searchNextValue = true;
                }

            });

        }


        if(classCGimageNumber>=cgJsClass.slider.slide.objects.countAll && cgJsClass.slider.slide.values.visible[classCGimageNumber]==false){

            var lastTrue = 1;

            cgJsClass.slider.slide.values.visible.forEach(function(value,index){

                if(value==true){
                    lastTrue = index;
                }

            });

            classCGimageNumber = lastTrue;

        }

        cgJsClass.slider.slide.objects.currentNumber = classCGimageNumber;



        cgJsClass.slider.slide.objects.currentId = cgJsClass.slider.slide.objects.allIds[classCGimageNumber];
        this.get(classCGimageNumber);

    },
    get: function(classCGimageNumber){


        //cgJsClass.slider.vars
        var cg_show_hide_info_button = 0;

        // 2 Varianten!!!!
        // 1ste: direkter Klick auf ein Image mit einer Klasse
        // 2ter: Resize. Übergabe von bereits getaner Verschiebung.

        // Ganz wichtig img davor stellen! Input Felder haben zwecks Klick event auch diese Klasse.
        var allCGimages = jQuery('.cg_show').length;

        //var classCGimageNumber = parseInt(CGclickedClass.substr(CGclickedClass.length - 1));
        //var classCGimageNumber = parseInt(CGclickedClass.substr(8));

        var cgCountImages = jQuery('#cg_count').val();

        var heightCGoverlay = jQuery(window).height();
        var windowWidth = jQuery(window).width();

        cgJsClass.slider.vars.windowHeight = heightCGoverlay;
        // alert(3);
        //alert(cgJsClass.slider.vars.isMobile);
        if(cgJsClass.slider.vars.isMobile==true){


            if(windowWidth <= 800 || cgJsClass.slider.vars.picsOnSite<3 || heightCGoverlay/windowWidth>=1){
                var widthCGoverlay = windowWidth;
            }
            else if(cgJsClass.slider.vars.cg_hide_carrousel == true){
                var widthCGoverlay = jQuery(window).width();
            }
            else{
                var widthCGoverlay = jQuery(window).width()/100*80;
            }


        }
        else{

            if(windowWidth <= 800 || cgJsClass.slider.vars.picsOnSite<3){
                var widthCGoverlay = jQuery(window).width();
            }
            else if(cgJsClass.slider.vars.cg_hide_carrousel == true){
                var widthCGoverlay = jQuery(window).width();
            }
            else{
                var widthCGoverlay = jQuery(window).width()/100*80;
            }

        }

        //  alert("widthCGoverlay"+widthCGoverlay);


        // Arrows Breite anpassen
        if(widthCGoverlay<800){
            jQuery( "#cg_slider_arrow_left" ).css('width','4%');
            jQuery( "#cg_slider_arrow_right" ).css('width','4%');
        }

        if(widthCGoverlay<500){
            jQuery( "#cg_slider_arrow_left" ).css('width','5%');
            jQuery( "#cg_slider_arrow_right" ).css('width','5%');
        }


        if(widthCGoverlay>=800){
            jQuery( "#cg_slider_arrow_left" ).css('width','2%');
            jQuery( "#cg_slider_arrow_right" ).css('width','2%');
        }




        //Vorherige Breite zum Vergleich hernehmen
        var get_widthCGoverlay_old = jQuery("#widthCGoverlay_old").val();

        var widthBorder = 0;// 2px, jeweils innen und außen


        //Relation überprüfen von width height, wird später unten in der Schleife angwendet

        var heightDivBox = heightCGoverlay; // 2px, jeweils innen und außen
        var widthDivBox = widthCGoverlay-widthBorder; // 2px, jeweils innen und außen

        //  alert(widthDivBox);
        var cgIMGcontainerRelation = widthDivBox/heightDivBox;


        // Berechnung des Close Button position (close button befindet sich 30px rechts vom rechten arrow_image)
        var closeButtonPosition = widthCGoverlay-widthCGoverlay/100*3-20;

        // Berechnung des Close Button position (close button befindet sich 30px rechts vom rechten arrow_image)
        // var closeButtonCommentsPosition = widthCGoverlay-((widthCGoverlay-800)/2)-60;

        // Prüfen ob plz vote oder rating gezeigt werden sollen
        var cg_ip_check = jQuery('#cg_ip_check').val();

        // Plz vote language platzhalter
        var cg_plz_vote = jQuery('#cg_plz_vote').val();

        //Zum Anzeigen des GIFs before die Images geladen werden
        var loadingSource = jQuery('#cg_loadingGifSource').val();
        var margin_top_loadingSource = heightCGoverlay/2-12;//-9, damit es soch mittig wie möglich wird, wegen 19px breite und höhe des gifs
        var margin_left_loadingSource = widthCGoverlay/2-12;//-9, damit es soch mittig wie möglich wird, wegen 19px breite und höhe des gifs



        //var widthCGimgContainerAggregated = 0;


        var r = 0;
        var r1 = 1;
        var e = 0;


        //var marginLeftSlider = 0;
        var aggregateWholeWidth = 0;


        var rLeft = classCGimageNumber-2; // Weniger als 2 nicht möglich bei der Logik
        var rRight = classCGimageNumber+2; // Weniger als 2 nicht möglich bei der Logik

        //   console.log('ALL IDs:');
        //  console.log(cgJsClass.slider.slide.objects.allIds);

        //Prüfen ob rechter oder Linker Pfeil geklickt wurde
        //Merke sobald Pfeil oder Bild im Slider geklickt wurde. Geht diese Funktion immer von vorne los!
        //jQuery( ".cg_show" ).each(function( i ) {
        jQuery(cgJsClass.slider.slide.objects.allIds).each(function( i ) {
        //jQuery(cgJsClass.slider.slide.objects.allIds).each(function(index,value){

            r++;
            r1++;

            if(r>cgJsClass.slider.slide.objects.countAll){
                return;
            }



            cg_show_hide_info_button=0;

            if(rLeft<r && r<=rRight){


                e++;

                //var count_cg_img_box = jQuery(".cg_img_box").length;
                var count_cg_img_box = cgJsClass.slider.slide.objects.countAll;

                // Dies ist notwendige damit die richtige Gesamtwidth entsprechend der Anzahl der Inhaltsboxen geschaffen wird
                if(count_cg_img_box<=6){
                    var cg_count_cg_img_box_multiplicator = 1;
                }
                else{
                    var cg_count_cg_img_box_multiplicator = 0;
                }
           //     var widthCGimgContainerAggregated = (widthDivBox+widthBorder)*(count_cg_img_box+cg_count_cg_img_box_multiplicator);

          //      jQuery("#widthCGimgContainerAggregated").val(widthCGimgContainerAggregated);



                // Extra Rechnung für Slider draggable. Wie wenn erstes Bild geklickt wäre.
              //  var marginLeftSliderSaveValue = (widthCGoverlay-widthCGimgSliderBox-widthBorder)/2-marginSliderIMGleft;
              //  jQuery("#cg_first_left_slider").val(marginLeftSliderSaveValue);

                if(classCGimageNumber==r){

                    // r wird oben bestimmt
                    //*negative left muss bestimmt werden deswegen -1

                    if(r==1){

                   //     marginLeftSlider = 0;

                    }

                    else if(r==2){

                       // marginLeftSlider = -1*widthDivBox;

                    }

                    else{

                        //Ausführen wenn im Slider nach rechts geklickt wurde

/*                        var cg_check_id_first_img_slider_box = jQuery(".cg_img_box").attr('id');
                        var cg_check_id_first_img_slider_box = parseInt(cg_check_id_first_img_slider_box.substr(11));
                        marginLeftSlider = widthDivBox*(classCGimageNumber-cg_check_id_first_img_slider_box)*-1;*/
                    //    marginLeftSlider = widthDivBox*(classCGimageNumber-1)*-1;


                    }


                }


                //Hier muss geprüft werden ob outside von Galerie geratet wurde
               // var realId = value;
/*                var realId = jQuery(this).find('.realId').val();
                var ratingImage = jQuery(this).find(".averageStarsRounded").val();
                var countRatingQuantity = jQuery(this).find("#countRatingQuantity"+realId+"").val();
                var countRatingSQuantity = jQuery(this).find("#countRatingSQuantity"+realId+"").val();
                var countCommentsQuantity = jQuery(this).find("#countCommentsQuantity"+realId+"").val();
                var cg_check_voted = jQuery("#cg_check_voted"+realId+"").val();

                //Facebook button Seitenversion prüfen
                var cg_fb_reload = jQuery("#cg_fb_reload"+realId+"").val();*/

                var realId = cgJsClass.slider.slide.values.realId[r];
                var ratingImage = cgJsClass.slider.slide.values.ratingImage[r];
                var countRatingQuantity = cgJsClass.slider.slide.values.countRatingQuantity[r];
                var countRatingSQuantity = cgJsClass.slider.slide.values.countRatingSQuantity[r];
                var countCommentsQuantity = cgJsClass.slider.slide.values.countCommentsQuantity[r];
                var cg_check_voted = cgJsClass.slider.slide.values.cg_check_voted[r];

                //Facebook button Seitenversion prüfen
                var cg_fb_reload = cgJsClass.slider.slide.values.cg_fb_reload[r];



                /*                    if(get_widthCGoverlay_old==widthCGoverlay && cg_vote_in_gallery==1){

                                        // Wenn der Werte Vergleich nicht übereinstimmt dann muss der inhalt des slider rating divs neu geladen werden

                                        var cg_slider_rating_count_value = jQuery("#cg_slider_rating_count_value"+realId+"").val();
                                        var cg_slider_rating_avarage_value = jQuery("#cg_slider_rating_avarage_value"+realId+"").val();

                                    }*/


                //Prüfen ob die Breite des Fensters sich überhaupt verändert hat, ob Boxen neu auftauchen müssen
                //if(get_widthCGoverlay_old!=widthCGoverlay || jQuery("#cg_img_box_"+r+"").length==0){
                //if(get_widthCGoverlay_old!=widthCGoverlay || jQuery("#cg_img_box_"+r+"").length==0){
                //if(get_widthCGoverlay_old!=widthCGoverlay || typeof cgJsClass.slider.slide.objects.images[r]!='object'){
              //  if(cgJsClass.slider.vars.resize==true || typeof cgJsClass.slider.slide.objects.images[r]!='object'){

                    //  console.log('rendering here: '+r);


/*                    var width = jQuery(this).find(".widthOriginalImg").val();
                    var height = jQuery(this).find(".heightOriginalImg").val();*/

/*                   if(cgJsClass.slider.vars.isMobile==true){
                       var width = cgJsClass.slider.slide.values.width[r]-80;
                       var height = cgJsClass.slider.slide.values.height[r]-80;
                   }
                   else{*/
                       var width = cgJsClass.slider.slide.values.width[r];
                       var height = cgJsClass.slider.slide.values.height[r];
                //   }

                    var marginSliderIMGleft = '';

                    //var cgRotationThumbNumber = parseInt(jQuery(this).find('.cgRotationThumbNumber').val());
                    var cgRotationThumbNumber = parseInt(cgJsClass.slider.slide.values.cgRotationThumbNumber[r]);
                    // var cgRotationSourceNumber = parseInt(jQuery(this).find('.cgRotationSourceNumber').val());


/*                    if(cgRotationThumbNumber=='90' || cgRotationThumbNumber=='270'){
                        var cgRotateRatio = width/height;
                        var cgWidthOriginalImgContainer = width;
                        width = height;
                        height = cgWidthOriginalImgContainer;
                    }*/

                    var cgIMGsourceRelation = width/height;


                    // hochformatigere Bilder
                    if(cgIMGsourceRelation<cgIMGcontainerRelation){
                            //       console.log('HOCHFORMAT HIER: '+r);

                        //var newHeightSrc = heightDivBox;
                        var newHeightSrcPercentage = heightDivBox/height;

                        // Hier lässt sich das format in Relation zum Gesamtformat verkleinern
                        var newWidthSrc	= (width*newHeightSrcPercentage)/100*80;

                        if(cgJsClass.slider.vars.isMobile==true){
                            var widthCGimgSliderBox = newWidthSrc-40;
                        }
                        else{
                            var widthCGimgSliderBox = newWidthSrc;
                        }

                        if(cgRotationThumbNumber=='90' || cgRotationThumbNumber=='270'){

                            var cgRotateRatio = width/height;


                            var marginSliderIMGleft = (widthDivBox-newWidthSrc)/2;

                            marginSliderIMGleft = (marginSliderIMGleft*cgRotateRatio)/100*90;

                            var widthForSlider = windowWidth/100*80;


/*                            var widthImgTest = widthCGimgSliderBox+marginSliderIMGleft+150;
                            console.log(widthImgTest);
                            if(widthImgTest>widthForSlider){

                                console.log('here we go');

                                marginSliderIMGleft = 0;
                                widthCGimgSliderBox = widthForSlider*cgRotateRatio;

                            }*/

                            //  console.log('marginSliderIMGleft: '+marginSliderIMGleft);

                        }




                    }
                    else if(cgIMGsourceRelation>=cgIMGcontainerRelation){// breitformatigere Bilder
                        // Hier lässt sich das format in Relation zum Gesamtformat verkleinern
                     //   var newWidthSrc	= (width*newHeightSrcPercentage)/100*80;

                        if(cgJsClass.slider.vars.isMobile==true){
                            var widthCGimgSliderBox = widthDivBox/100*80-40;

                        }
                        else{
                            var widthCGimgSliderBox = widthDivBox/100*80;
                        }

                        var marginSliderIMGleft = '';

                        var heightIMGdivBox = widthDivBox*height/width;

                        var paddingTop = (heightDivBox-heightIMGdivBox)/2;

                        /*                            if(heightIMGdivBox>heightCGoverlay/100*85){
                                                        widthCGimgSliderBox = widthCGimgSliderBox-77;
                                                    }*/

                        // Ermittlung der Höhe nach Skalierung. Falls unter der eingestellten Höhe, dann nächstgrößeres Bild nehmen.
                        // In PHP: $heightScaledThumb = $WidthThumb*$heightOriginalImg/$widthOriginalImg;
                        //    var heightScaledThumb = widthDivBox*height/width;

                        //if(heightScaledThumb > widthDivBox) {
                        if(cgRotationThumbNumber=='90' || cgRotationThumbNumber=='270'){

                            var cgRotateRatio = width/height;

                            // für Bilder die in Breitformat geddreht wurden
                            // Achtung! Diesen Befehl als erstes machen!
                            if(marginSliderIMGleft==''){
                                marginSliderIMGleft = (widthDivBox-widthCGimgSliderBox)/2*cgRotateRatio;
                            }
                         //   var widthCGimgSliderBox = widthCGimgSliderBox*cgRotateRatio-40;

                        }

                    }



            //    console.log('marginSliderIMGleft2: '+marginSliderIMGleft);


                //   console.log('widthCGimgSliderBox: '+widthCGimgSliderBox)

                    //   }


                    // Options relevante Werte
                    //eventuell alles nach diesem Height anpassen?


                    /*                        var imgSrcOriginal = jQuery(this).find('.imgSrcOriginal').val();

                                            var src1920width = jQuery(this).find('.src1920width').val();
                                            var src1600width = jQuery(this).find('.src1600width').val();
                                            var src1024width = jQuery(this).find('.src1024width').val();
                                            var src624width = jQuery(this).find('.src624width').val();
                                            var src300width = jQuery(this).find('.src300width').val();*/


/*                    var imgSrcThumb = jQuery(this).find('.imgSrcThumb').val();
                    var imgSrcThumbWidth = jQuery(this).find('.imgSrcThumbWidth').val();
                    var imgSrcMedium = jQuery(this).find('.imgSrcMedium').val();
                    var imgSrcMediumWidth = jQuery(this).find('.imgSrcMediumWidth').val();
                    var imgSrcLarge = jQuery(this).find('.imgSrcLarge').val();
                    var imgSrcLargeWidth = jQuery(this).find('.imgSrcLargeWidth').val();
                    var imgSrcOriginal = jQuery(this).find('.imgSrcOriginal').val();


                    var cgImageThumbRotation = jQuery(this).find('.cgImageThumbRotation').val();
                    var cgImageSourceRotation = jQuery(this).find('.cgImageSourceRotation').val();*/


                    var imgSrcThumb = cgJsClass.slider.slide.values.imgSrcThumb[r];
                    var imgSrcThumbWidth = cgJsClass.slider.slide.values.imgSrcThumbWidth[r];
                    var imgSrcMedium = cgJsClass.slider.slide.values.imgSrcMedium[r];
                    var imgSrcMediumWidth = cgJsClass.slider.slide.values.imgSrcMediumWidth[r];
                    var imgSrcLarge = cgJsClass.slider.slide.values.imgSrcLarge[r];
                    var imgSrcLargeWidth = cgJsClass.slider.slide.values.imgSrcLargeWidth[r];
                    var imgSrcOriginal = cgJsClass.slider.slide.values.imgSrcOriginal[r];
                    var cgImageThumbRotation = cgJsClass.slider.slide.values.cgImageThumbRotation[r];
                    var cgImageSourceRotation = cgJsClass.slider.slide.values.cgImageSourceRotation[r];



                    /*                        console.log(imgSrcThumb);
                                            console.log(imgSrcMedium);
                                            console.log(imgSrcLarge);
                                            console.log(imgSrcOriginal);*/

/*                    var widthImageCheck = 0;

                    if(typeof cgJsClass.slider.slide.objects.images[r]=='object'){
                        var widthImageCheck = cgJsClass.slider.slide.objects.images[r].width();
                    }
                    var windowWidthCheck = window.innerWidth;*/

                    //  console.log('widthImageCheck: '+widthImageCheck);
                    //   console.log('widthImageCheck: '+windowWidthCheck);
                   //    console.log(typeof cgJsClass.slider.slide.objects.images[r]);

                    if(typeof cgJsClass.slider.slide.objects.images[r]=='object'){
                   //     console.log('resize image: '+widthCGimgSliderBox);
                        cgJsClass.slider.slide.objects.showImages(r,widthDivBox,widthCGimgSliderBox,imgSrc,cgImageRotation,cg_slider_image_div_info_check);
                        return true;
                    }


                    //var urlForFacebook = jQuery(this).find(".urlForFacebook").val();
                    var urlForFacebook = cgJsClass.slider.slide.values.urlForFacebook[r];


                    //Prüf ob wenn Hide Until Vote an ist schon gewotet wurde oder nicht

                    // Options relevante Werte	--- ENDE

                    // id's einfügen
                    var cg_img_box_id = "cg_img_box_"+r;

                //    if (jQuery("#"+cg_img_box_id+"").length > 0){
                     //   jQuery("#"+cg_img_box_id+"").remove();
                //    }

                    // Abstand bestimmen von rating und comments div und url div

                    // var marginLeftCGratingSlider = marginSliderIMGleft+37;
                    // +150 als breite von Rationg div und + 30 Abstand
                    // var marginLeftCGcommentsSlider = marginSliderIMGleft+37;
                    // var marginLeftcgFacebookDiv = marginSliderIMGleft+37;

                    if (typeof paddingTop == 'undefined') {

                        var paddingTop = 0;

                    }


                    // Hide Info Abstand nach Links
                //   var marginLeftHideInfoDivSlider = marginSliderIMGleft;
               //     var marginBottomHideInfoDivSlider = 0;


                    // Abstand bestimmen von rating div --- ENDE



                    //URL div bestimmen ob angezeigt werden soll oder nicht


                    // Prüfen ob überhaupt eine URL eingetragen wurde
                  //  var cg_img_url_entry_slider = jQuery("#cg_img_url"+realId+"").val();


/*                    if(cgJsClass.slider.vars.cg_Use_as_URL==1 && cgJsClass.slider.vars.cg_ForwardToURL==1 && cgJsClass.slider.vars.cg_ForwardFrom==1 && cg_img_url_entry_slider){


                        //Prüfen ob vom user ein http bei entries der url mit eingetragen wurde, wenn nicht dann hinzufügen
                        if (typeof cg_img_url_entry_slider === 'undefined') { }
                        else if(cg_img_url_entry_slider.indexOf("http") > -1) { cg_img_url_entry_slider = cg_img_url_entry_slider; }
                        else{ cg_img_url_entry_slider = "http://"+cg_img_url_entry_slider}


                        var cg_a_href_img = "href='"+cg_img_url_entry_slider+"'";


                        // Prüfung auf welche Art weitergeleitet werden soll
                        if(cgJsClass.slider.vars.cg_ForwardType==2){var targetStyle = "target = '_blank'";}
                        else{var targetStyle = "";}



                      //  var marginLeftUrlDiv = marginSliderIMGleft+37+150+30+90;

                        var urlDiv = "<div class='cg_url_slider_div' id='cg_url_slider_div"+realId+"'>"+
                            "<a href='"+cg_img_url_entry_slider+"' "+targetStyle+" ><img src='"+cg_pngUrlIconImg+"'></a></div>";

                        cg_show_hide_info_button = 1;

                    }

                    else{

                        var urlDiv = "";

                    }*/


                    //URL div bestimmen ob angezeigt werden soll oder nicht --- ENDE



                    // Rating bestimmen

                    // cg_allow_rating wird am Anfang der Datei bestimmt

                    if(cgJsClass.slider.vars.cg_allow_rating==1){

/*                        var starOnUrl = jQuery("#cg_star_on_slider").val();
                        var starOffUrl = jQuery("#cg_star_off_slider").val();*/
                        var starOnUrl = cgJsClass.slider.slide.values.cg_star_on_slider;
                        var starOffUrl = cgJsClass.slider.slide.values.cg_star_off_slider;


                        //if(cg_ip_check!=1 || (cg_ip_check==1 && cg_check_voted==1)){
                        if(cg_check_voted==1 || cg_check_voted==2){
                            if(ratingImage>=1){var star1url = starOnUrl;}
                            else{var star1url = starOffUrl;}
                            if(ratingImage>=2){var star2url = starOnUrl;}
                            else{var star2url = starOffUrl;}
                            if(ratingImage>=3){var star3url = starOnUrl;}
                            else{var star3url = starOffUrl;}
                            if(ratingImage>=4){var star4url = starOnUrl;}
                            else{var star4url = starOffUrl;}
                            if(ratingImage>=5){var star5url = starOnUrl;}
                            else{var star5url = starOffUrl;}

                            var ratingBlock = "<div class='cg_slider_rating_div_star' class='cg_slider_rating_div_star'><img src='"+star1url+"' class='cg_slider_star' alt='1' id='cg_rate_star"+realId+"'></div>"+
                                "<div class='cg_slider_rating_div_star'><img src='"+star2url+"' class='cg_slider_star' alt='2' id='cg_rate_star"+realId+"'></div>"+
                                "<div class='cg_slider_rating_div_star'><img src='"+star3url+"' class='cg_slider_star' alt='3' id='cg_rate_star"+realId+"'></div>"+
                                "<div class='cg_slider_rating_div_star'><img src='"+star4url+"' class='cg_slider_star' alt='4' id='cg_rate_star"+realId+"'></div>"+
                                "<div class='cg_slider_rating_div_star cg_gallery_rating_image_five_star_last_child'><img src='"+star5url+"' class='cg_slider_star' alt='5' id='cg_rate_star"+realId+"'></div>"+
                                "<div id='rating_cg-"+realId+"' class='rating_cg_slider"+realId+" cg_slider_rating_div_count'>"+countRatingQuantity+"</div>";
                            //alert(ratingBlock);

                        }

                        else if(cg_ip_check==1 && cg_check_voted==0){
                            var ratingBlock = "<div id='cg_plz_vote"+realId+"' class='cg_slider_rating_div_star'>"+
                                "<div class='cg_slider_rating_div_star'><img src='"+starOffUrl+"' class='cg_slider_star' alt='1' id='cg_rate_star"+realId+"'></div>"+
                                "<div class='cg_slider_rating_div_star'><img src='"+starOffUrl+"' class='cg_slider_star' alt='2' id='cg_rate_star"+realId+"'></div>"+
                                "<div class='cg_slider_rating_div_star'><img src='"+starOffUrl+"' class='cg_slider_star' alt='3' id='cg_rate_star"+realId+"'></div>"+
                                "<div class='cg_slider_rating_div_star'><img src='"+starOffUrl+"' class='cg_slider_star' alt='4' id='cg_rate_star"+realId+"'></div>"+
                                "<div class='cg_slider_rating_div_star cg_gallery_rating_image_five_star_last_child'><img src='"+starOffUrl+"' class='cg_slider_star' alt='5' id='cg_rate_star"+realId+"'></div>"+
                                //"<u>"+cg_plz_vote+"...</u>
                                "</div>";

                        }


                        // Rating bestimmen --- ENDE7



                        // Rating div kreieren

                        var ratingDIV = "<div id='ratingCGslider"+realId+"' class='cg_slider_rating_div' >"+
                            "<input type='hidden' id='cg_slider_rating_count_value"+realId+"' value='"+countRatingQuantity+"'>"+
                            "<input type='hidden' id='cg_slider_rating_avarage_value"+realId+"' value='"+ratingImage+"'>"+
                            ratingBlock+
                            "<input type='hidden' class='cg_real_id' value='"+realId+"'>"+
                            "</div>";
                        // Rating div kreieren --- ENDE

                        cg_show_hide_info_button = 1;

                    }

                    else if(cgJsClass.slider.vars.cg_allow_rating==2){

/*                        var starOnUrl = jQuery("#cg_star_on_slider").val();
                        var starOffUrl = jQuery("#cg_star_off_slider").val();*/
                        var starOnUrl = cgJsClass.slider.slide.values.cg_star_on_slider;
                        var starOffUrl = cgJsClass.slider.slide.values.cg_star_off_slider;

                        //if(cg_ip_check!=1 || (cg_ip_check==1 && cg_check_voted==1)){
                        if(cg_check_voted==1 || cg_check_voted==2){
                            if(countRatingSQuantity>0){var star6url = starOnUrl;}
                            else{var star6url = starOffUrl;}
                            if(countRatingSQuantity>0){var countRatingSQuantity = countRatingSQuantity;}
                            else{var countRatingSQuantity = 0;}

                            var ratingBlock = "<div class='cg_slider_rating_div_star'><img src='"+star6url+"' class='cg_slider_star' alt='6' id='cg_rate_star"+realId+"'></div>"+
                                "<div id='rating_cg-"+realId+"' class='rating_cg_slider"+realId+" cg_slider_rating_div_count'>"+countRatingSQuantity+"</div>";

                        }

                        else if(cg_ip_check==1 && cg_check_voted==0){

                            var ratingBlock = "<div id='cg_plz_vote"+realId+"' class='cg_slider_rating_div_star'>"+
                                "<img src='"+starOffUrl+"' class='cg_slider_star' alt='6' id='cg_rate_star"+realId+"'>"+
                                "</div>";
                        }



                        // Rating bestimmen --- ENDE

                        // Rating div kreieren

                        var ratingDIV = "<div id='ratingCGslider"+realId+"' class='cg_slider_rating_div' >"+
                            "<input type='hidden' id='cg_slider_rating_count_value"+realId+"' value='"+countRatingSQuantity+"'>"+
                            "<input type='hidden' id='cg_slider_rating_avarage_value"+realId+"' value='"+countRatingSQuantity+"'>"+
                            ratingBlock+
                            "<input type='hidden' class='cg_real_id' value='"+realId+"'>"+
                            "</div>";
                        // Rating div kreieren --- ENDE

                        cg_show_hide_info_button = 1;

                    }

                    else{
                        ratingDIV = "";
                    }


                    // cg_allow_comments wird am Anfang der Datei bestimmt
                    if(cgJsClass.slider.vars.cg_allow_comments==1){
                        var commentsDIV = "<div id='commentsCGslider"+realId+"' class='cg_slider_comments_div' >"+
                            "<div class='cg_slider_comments_div_icon'><img src='"+cgJsClass.slider.vars.cg_pngCommentsIconImg+"' id='cg_pngCommentsIcon"+realId+"' alt='"+realId+"'>"+
                            "<input type='hidden' class='countCommentsQuantity' value='"+countCommentsQuantity+"'></div>"+
                            "<div class='comments_cg_slider"+realId+" cg_slider_comments_div_count'>"+countCommentsQuantity+"</div>"+
                            "<input type='hidden' id='cg_slider_comment_real_id' value='"+realId+"' >"+
                            "</div>";

                        cg_show_hide_info_button = 1;

                    }

                    else{

                        commentsDIV = "";

                    }




                    // User input div kreieren

                    //if (jQuery(this).find("p").length == 0){
                    //if (jQuery(this).find("p").length == 0){
                    if (cgJsClass.slider.slide.values.lengthInput[r] == 0){
                        var userInputDiv = '';
                        //var cg_ShowInfoSliderDisplay = "display:none";
                        // var cg_ShowInfoSliderDisplay = "";


                        if(cgJsClass.slider.vars.isMobile==true){
                            var cg_slider_image_div_info_check = "cg_slider_image_div_info_true";
                        }
                        else{
                            var cg_slider_image_div_info_check = "cg_slider_image_div_info_false";
                        }


                    }

                    else{

                        // Hier erfolgt die Prüfung ob überhaupt irgendwelche Info in dem Fled ist. In der PHP Datei erfolgt die Prüfung der einzelnen eingegebenen values.
                        //var cg_user_input = jQuery(this).find(".cg_user_input").html();
                        var cg_user_input = cgJsClass.slider.slide.values.userInput[r];


                        var cg_slider_image_div_info_check = "cg_slider_image_div_info_true";


                        //User info zeigen, welches versteckt ist in php --- ENDE

                        var cg_user_input_fade_in_arrow_container = "<div class='cg_user_input_fade_in_arrow_container'><div class='cg_user_input_fade_in_arrow_div'>"+
                            "<img src='"+cgJsClass.slider.vars.cg_slider_arrow_fade_out_user_input_src+"' />" +
                            "<img src='"+cgJsClass.slider.vars.cg_slider_arrow_fade_in_user_input_src+"' style='display:none;'/>"+
                            "</div></div>";


                        var userInputDiv = "<div class='cg_user_input_container'>" +
                            cg_user_input_fade_in_arrow_container+
                            "<div  id='cg_user_input"+realId+"' class='cg_user_input'>"+
                            cg_user_input+
                            /*                                "<div class='cg_user_input_fade_out_arrow_div' id='cg_user_input_fade_out_arrow_div_"+realId+"'>"+
                                                            "<img src='"+cgJsClass.slider.vars.cg_slider_arrow_fade_out_user_input_src+"' id='cg_user_input_bottom_border_"+realId+"'"+
                                                            " style='height:0;width:0;margin-bottom:-1px;' />"+
                                                            "<img src='"+cgJsClass.slider.vars.cg_slider_arrow_fade_out_user_input_src+"' />"+
                                                            "</div></div>"+*/
                            "<div class='cg_user_input_visibility_check' ></div>"+
                            "</div>"+
                            "</div>";

                        cg_show_hide_info_button = 1;



                    }
                    // User input div kreieren --- ENDE

                    // Fb Like Div kreireren

                    if(cgJsClass.slider.vars.cg_FbLike==1){

                        // var marginLeftcgFacebookDiv = marginLeftCGcommentsSlider+100;
                        // var marginBottomcgFacebookDiv = marginBottomCGcommentsSlider+300;


                        if(cg_fb_reload!="413"){
                            widthFbDiv = 155;
                        }

                        var cgFacebookDivSlider = "<div id='cgFacebookDiv"+realId+"' class='cg_slider_facebook_div' >"+
                            "<iframe src='"+urlForFacebook+"'  scrolling='no'"+
                            "class='cg_fb_like_iframe_slider_order"+r+"' id='cg_fb_like_iframe_slider"+realId+"'  name='cg_fb_like_iframe_slider"+realId+"'></iframe>"+
                            "</div>";
                        cg_show_hide_info_button = 1;

                    }

                    else{

                        cgFacebookDivSlider = "";

                    }



                    // Fb Like Div kreireren --- ENDE


                    /*
                                            if(cg_show_hide_info_button==1){
                                                // Hide Info Div

                                                var cg_hide_info_div = "<div class='"+cgJsClass.slider.vars.cg_hide_info_class+"' id='cg_hide_info_div"+realId+"'"+
                                                    "style='background-image:url("+cgJsClass.slider.vars.cg_hide_info_img+");background-position:center;background-repeat:no-repeat;width:21px;height:21px;'></div>";


                                                // Hide Info Div --- ENDE
                                            }
                                            else{
                                                var cg_hide_info_div = '';

                                            }
                    */


                    if(marginSliderIMGleft!='' && marginSliderIMGleft>=0){

                        var imgStyle = "style='margin-left:"+marginSliderIMGleft+"px'";

                    }
                    else{
                        var imgStyle = '';
                    }

                  //  console.log('style');


                    //  console.log('r: '+r);
                    //    console.log(cgJsClass.slider.vars.resize);
/*                    if (typeof cgJsClass.slider.slide.objects.images[r1] == 'object'
                        && typeof cgJsClass.slider.slide.objects.images[r] == 'undefined'
                        && cgJsClass.slider.vars.resize==false){*/
                    if (typeof cgJsClass.slider.slide.objects.images[r1] == 'object'
                        && typeof cgJsClass.slider.slide.objects.images[r] == 'undefined'){
                  //  if (jQuery("#cg_img_box_"+r1+"").length>0){

                        if(widthCGimgSliderBox<=150){//alert("300");

                            if(imgSrcThumbWidth>=150){
                                var imgSrc = imgSrcThumb;
                                var cgImageRotation = cgImageThumbRotation;
                            }
                            else if(imgSrcMediumWidth>=150){
                                var imgSrc = imgSrcMedium;
                                var cgImageRotation = cgImageThumbRotation;
                            }
                            else if(imgSrcLargeWidth>=150){
                                var imgSrc = imgSrcLarge;
                                var cgImageRotation = cgImageThumbRotation;
                            }
                            else{
                                var imgSrc = imgSrcOriginal;
                                var cgImageRotation = cgImageSourceRotation;
                            }



                            var imageObject = "<div style='width:"+widthDivBox+"px;' class='cg_img_box' id='"+cg_img_box_id+"'>"+
                                //"<img  class='cg_loading_gif_img' id='cg_loading_gif_img_"+realId+"'  src='"+loadingSource+"' width='24px' height='24px' style='z-index:1000006;position:absolute;margin-left:"+margin_left_loadingSource+"px;margin-top:"+margin_top_loadingSource+"px;display:inline;width:19px !important;height:19px !important;'>"+
                                // jQuery("#show_comments_slider").append("<img class='cg_loading_gif_img' id='cg_loading_gif_img' src='"+loadingSource+"' width='19px' height='19px' style='display:hidden;'>");
                                // jQuery("#rating_cg").empty();
                                //jQuery("#cg_loading_gif_img").load(function(){jQuery(this).toggle();});
                                "<div class='cg_slider_image_div'>"+
                                "<div class='cg_slider_info_div' >"+
                                ""+ratingDIV+""+
                                ""+commentsDIV+""+
                                ""+cgFacebookDivSlider+""+
                                //""+urlDiv+""+
                                "</div>"+
                                "<img src='"+imgSrc+"' "+imgStyle+" width='"+widthCGimgSliderBox+"px' class='cg_slider_image "+cgImageRotation+" "+cg_slider_image_div_info_check+"' id='cg_slider_image_"+realId+"'  />"+
                                ""+userInputDiv+""+
                                "</div>"+
                                "</div>";

                            var imageObject = jQuery(imageObject).prependTo( jQuery( "#imgContainer" ) );


                        }
                        else if(widthCGimgSliderBox<=300){//alert("624");

                            if(imgSrcThumbWidth>=300){
                                var imgSrc = imgSrcThumb;
                                var cgImageRotation = cgImageThumbRotation;
                            }
                            else if(imgSrcMediumWidth>=300){
                                var imgSrc = imgSrcMedium;
                                var cgImageRotation = cgImageThumbRotation;
                            }
                            else if(imgSrcLargeWidth>=300){
                                var imgSrc = imgSrcLarge;
                                var cgImageRotation = cgImageThumbRotation;
                            }
                            else{
                                var imgSrc = imgSrcOriginal;
                                var cgImageRotation = cgImageSourceRotation;
                            }

                            var imageObject = "<div style='width:"+widthDivBox+"px;' class='cg_img_box' id='"+cg_img_box_id+"'>"+
                                //"<img  class='cg_loading_gif_img' id='cg_loading_gif_img_"+realId+"'  src='"+loadingSource+"' width='24px' height='24px' style='z-index:1000006;position:absolute;margin-left:"+margin_left_loadingSource+"px;margin-top:"+margin_top_loadingSource+"px;display:inline;width:19px !important;height:19px !important;'>"+
                                // jQuery("#show_comments_slider").append("<img class='cg_loading_gif_img' id='cg_loading_gif_img' src='"+loadingSource+"' width='19px' height='19px' style='display:hidden;'>");
                                // jQuery("#rating_cg").empty();
                                //jQuery("#cg_loading_gif_img").load(function(){jQuery(this).toggle();});
                                "<div class='cg_slider_image_div' >"+
                                "<div class='cg_slider_info_div' >"+
                                ""+ratingDIV+""+
                                ""+commentsDIV+""+
                                ""+cgFacebookDivSlider+""+
                                //""+urlDiv+""+
                                "</div>"+
                                "<img src='"+imgSrc+"' "+imgStyle+" class='cg_slider_image "+cgImageRotation+" "+cg_slider_image_div_info_check+"' id='cg_slider_image_"+realId+"'  />"+
                                ""+userInputDiv+""+
                                "</div>"+
                                "</div>";

                            var imageObject = jQuery(imageObject).prependTo( jQuery( "#imgContainer" ) );


                        }
                        else if(widthCGimgSliderBox<=1000){//alert("1024"); Puffer bis 1100 ist gegeben

                            if(imgSrcThumbWidth>=1000){
                                var imgSrc = imgSrcThumb;
                                var cgImageRotation = cgImageThumbRotation;
                            }
                            else if(imgSrcMediumWidth>=1000){
                                var imgSrc = imgSrcMedium;
                                var cgImageRotation = cgImageThumbRotation;
                            }
                            else if(imgSrcLargeWidth>=1000){
                                var imgSrc = imgSrcLarge;
                                var cgImageRotation = cgImageThumbRotation;
                            }
                            else{
                                var imgSrc = imgSrcOriginal;
                                var cgImageRotation = cgImageSourceRotation;
                            }


                            var imageObject = "<div style='width:"+widthDivBox+"px;' class='cg_img_box' id='"+cg_img_box_id+"'>"+
                                //"<img  class='cg_loading_gif_img' id='cg_loading_gif_img_"+realId+"'  src='"+loadingSource+"' width='24px' height='24px' style='z-index:1000006;position:absolute;margin-left:"+margin_left_loadingSource+"px;margin-top:"+margin_top_loadingSource+"px;display:inline;width:19px !important;height:19px !important;'>"+
                                // jQuery("#show_comments_slider").append("<img class='cg_loading_gif_img' id='cg_loading_gif_img' src='"+loadingSource+"' width='19px' height='19px' style='display:hidden;'>");
                                // jQuery("#rating_cg").empty();
                                //jQuery("#cg_loading_gif_img").load(function(){jQuery(this).toggle();});
                                "<div class='cg_slider_image_div' >"+
                                "<div class='cg_slider_info_div' >"+
                                ""+ratingDIV+""+
                                ""+commentsDIV+""+
                                ""+cgFacebookDivSlider+""+
                                //""+urlDiv+""+
                                "</div>"+
                                "<img src='"+imgSrc+"' "+imgStyle+" width='"+widthCGimgSliderBox+"px' class='cg_slider_image "+cgImageRotation+" "+cg_slider_image_div_info_check+"' id='cg_slider_image_"+realId+"'  />"+
                                ""+userInputDiv+""+
                                "</div>"+
                                "</div>";

                            var imageObject = jQuery(imageObject).prependTo( jQuery( "#imgContainer" ) );


                        }
                        else if(widthCGimgSliderBox<=1400){

                            if(imgSrcThumbWidth>=1000){
                                var imgSrc = imgSrcThumb;
                                var cgImageRotation = cgImageThumbRotation;
                            }
                            else if(imgSrcMediumWidth>=1000){
                                var imgSrc = imgSrcMedium;
                                var cgImageRotation = cgImageThumbRotation;
                            }
                            else if(imgSrcLargeWidth>=1000){
                                var imgSrc = imgSrcLarge;
                                var cgImageRotation = cgImageThumbRotation;
                            }
                            else{
                                var imgSrc = imgSrcOriginal;
                                var cgImageRotation = cgImageSourceRotation;
                            }

                            var imageObject = "<div style='width:"+widthDivBox+"px;' class='cg_img_box' id='"+cg_img_box_id+"'>"+
                                //"<img  class='cg_loading_gif_img' id='cg_loading_gif_img_"+realId+"'  src='"+loadingSource+"' width='24px' height='24px' style='z-index:1000006;position:absolute;margin-left:"+margin_left_loadingSource+"px;margin-top:"+margin_top_loadingSource+"px;display:inline;width:19px !important;height:19px !important;'>"+
                                // jQuery("#show_comments_slider").append("<img class='cg_loading_gif_img' id='cg_loading_gif_img' src='"+loadingSource+"' width='19px' height='19px' style='display:hidden;'>");
                                // jQuery("#rating_cg").empty();
                                //jQuery("#cg_loading_gif_img").load(function(){jQuery(this).toggle();});
                                "<div class='cg_slider_image_div' >"+
                                "<div class='cg_slider_info_div' >"+
                                ""+ratingDIV+""+
                                ""+commentsDIV+""+
                                ""+cgFacebookDivSlider+""+
                                //""+urlDiv+""+
                                "</div>"+
                                "<img src='"+imgSrc+"' "+imgStyle+" width='"+widthCGimgSliderBox+"px' class='cg_slider_image "+cgImageRotation+" "+cg_slider_image_div_info_check+"' id='cg_slider_image_"+realId+"'  />"+
                                ""+userInputDiv+""+
                                "</div>"+
                                "</div>";

                            var imageObject = jQuery(imageObject).prependTo( jQuery( "#imgContainer" ) );


                        }

                        else{//alert("origin");//Puffer bis 2120 ist gegeben von 1920 aus
                            var imgSrc = imgSrcOriginal;
                            var imageObject = "<div style='width:"+widthDivBox+"px;' class='cg_img_box' id='"+cg_img_box_id+"'>"+
                                //"<img  class='cg_loading_gif_img' id='cg_loading_gif_img_"+realId+"'  src='"+loadingSource+"' width='24px' height='24px' style='z-index:1000006;position:absolute;margin-left:"+margin_left_loadingSource+"px;margin-top:"+margin_top_loadingSource+"px;display:inline;width:19px !important;height:19px !important;'>"+
                                // jQuery("#show_comments_slider").append("<img class='cg_loading_gif_img' id='cg_loading_gif_img' src='"+loadingSource+"' width='19px' height='19px' style='display:hidden;'>");
                                // jQuery("#rating_cg").empty();
                                //jQuery("#cg_loading_gif_img").load(function(){jQuery(this).toggle();});
                                "<div class='cg_slider_image_div' >"+
                                "<div class='cg_slider_info_div' >"+
                                ""+ratingDIV+""+
                                ""+commentsDIV+""+
                                ""+cgFacebookDivSlider+""+
                                //""+urlDiv+""+
                                "</div>"+
                                "<img src='"+imgSrc+"' "+imgStyle+" width='"+widthCGimgSliderBox+"px' class='cg_slider_image "+cgImageSourceRotation+" "+cg_slider_image_div_info_check+"' id='cg_slider_image_"+realId+"'  />"+
                                ""+userInputDiv+""+
                                "</div>"+
                                "</div>";

                            var imageObject = jQuery(imageObject).prependTo( jQuery( "#imgContainer" ) );


                        }
                        //   console.log('actionPrepend: '+r);

                        if(typeof cgJsClass.slider.slide.objects.images[r]=='undefined'){
                            cgJsClass.slider.slide.objects.images[r]=imageObject;
                        }


                    }

                    else if(typeof cgJsClass.slider.slide.objects.images[r] == 'undefined'){



                        if(widthCGimgSliderBox<=150){//alert("300");

                            if(imgSrcThumbWidth>=150){
                                var imgSrc = imgSrcThumb;
                                var cgImageRotation = cgImageThumbRotation;
                            }
                            else if(imgSrcMediumWidth>=150){
                                var imgSrc = imgSrcMedium;
                                var cgImageRotation = cgImageThumbRotation;
                            }
                            else if(imgSrcLargeWidth>=150){
                                var imgSrc = imgSrcLarge;
                                var cgImageRotation = cgImageThumbRotation;
                            }
                            else{
                                var imgSrc = imgSrcOriginal;
                                var cgImageRotation = cgImageSourceRotation;
                            }

                            var imageObject = "<div style='width:"+widthDivBox+"px;' class='cg_img_box' id='"+cg_img_box_id+"'>"+
                                //"<img  class='cg_loading_gif_img' id='cg_loading_gif_img_"+realId+"'  src='"+loadingSource+"' width='24px' height='24px' style='z-index:1000006;position:absolute;margin-left:"+margin_left_loadingSource+"px;margin-top:"+margin_top_loadingSource+"px;display:inline;width:19px !important;height:19px !important;'>"+
                                // jQuery("#show_comments_slider").append("<img class='cg_loading_gif_img' id='cg_loading_gif_img' src='"+loadingSource+"' width='19px' height='19px' style='display:hidden;'>");
                                // jQuery("#rating_cg").empty();
                                //jQuery("#cg_loading_gif_img").load(function(){jQuery(this).toggle();});
                                "<div class='cg_slider_image_div' >"+
                                "<div class='cg_slider_info_div' >"+
                                ""+ratingDIV+""+
                                ""+commentsDIV+""+
                                ""+cgFacebookDivSlider+""+
                                //""+urlDiv+""+
                                "</div>"+
                                "<img src='"+imgSrc+"' "+imgStyle+" width='"+widthCGimgSliderBox+"px' class='cg_slider_image "+cgImageRotation+" "+cg_slider_image_div_info_check+"' id='cg_slider_image_"+realId+"'  />"+
                                ""+userInputDiv+""+
                                "</div>"+
                                "</div>";

                            var imageObject = jQuery(imageObject).appendTo( jQuery( "#imgContainer" ) );

                        }
                        else if(widthCGimgSliderBox<=300){//alert("624");

                            if(imgSrcThumbWidth>=300){
                                var imgSrc = imgSrcThumb;
                                var cgImageRotation = cgImageThumbRotation;
                            }
                            else if(imgSrcMediumWidth>=300){
                                var imgSrc = imgSrcMedium;
                                var cgImageRotation = cgImageThumbRotation;
                            }
                            else if(imgSrcLargeWidth>=300){
                                var imgSrc = imgSrcLarge;
                                var cgImageRotation = cgImageThumbRotation;
                            }
                            else{
                                var imgSrc = imgSrcOriginal;
                                var cgImageRotation = cgImageSourceRotation;
                            }


                            var imageObject = "<div style='width:"+widthDivBox+"px;' class='cg_img_box' id='"+cg_img_box_id+"'>"+
                                //"<img  class='cg_loading_gif_img' id='cg_loading_gif_img_"+realId+"'  src='"+loadingSource+"' width='24px' height='24px' style='z-index:1000006;position:absolute;margin-left:"+margin_left_loadingSource+"px;margin-top:"+margin_top_loadingSource+"px;display:inline;width:19px !important;height:19px !important;'>"+
                                // jQuery("#show_comments_slider").append("<img class='cg_loading_gif_img' id='cg_loading_gif_img' src='"+loadingSource+"' width='19px' height='19px' style='display:hidden;'>");
                                // jQuery("#rating_cg").empty();
                                //jQuery("#cg_loading_gif_img").load(function(){jQuery(this).toggle();});
                                "<div class='cg_slider_image_div' >"+
                                "<div class='cg_slider_info_div' >"+
                                ""+ratingDIV+""+
                                ""+commentsDIV+""+
                                ""+cgFacebookDivSlider+""+
                                //""+urlDiv+""+
                                "</div>"+
                                "<img src='"+imgSrc+"' "+imgStyle+" width='"+widthCGimgSliderBox+"px' class='cg_slider_image "+cgImageRotation+" "+cg_slider_image_div_info_check+"' id='cg_slider_image_"+realId+"'  />"+
                                ""+userInputDiv+""+
                                "</div>"+
                                "</div>";

                            var imageObject = jQuery(imageObject).appendTo( jQuery( "#imgContainer" ) );

                        }
                        else if(widthCGimgSliderBox<=1000){//alert("1024"); Puffer bis 1100 ist gegeben

                            if(imgSrcThumbWidth>=1000){
                                var imgSrc = imgSrcThumb;
                                var cgImageRotation = cgImageThumbRotation;
                            }
                            else if(imgSrcMediumWidth>=1000){
                                var imgSrc = imgSrcMedium;
                                var cgImageRotation = cgImageThumbRotation;
                            }
                            else if(imgSrcLargeWidth>=1000){
                                var imgSrc = imgSrcLarge;
                                var cgImageRotation = cgImageThumbRotation;
                            }
                            else{
                                var imgSrc = imgSrcOriginal;
                                var cgImageRotation = cgImageSourceRotation;
                            }

                            var imageObject = "<div style='width:"+widthDivBox+"px;' class='cg_img_box' id='"+cg_img_box_id+"'>"+
                                //"<img  class='cg_loading_gif_img' id='cg_loading_gif_img_"+realId+"'  src='"+loadingSource+"' width='24px' height='24px' style='z-index:1000006;position:absolute;margin-left:"+margin_left_loadingSource+"px;margin-top:"+margin_top_loadingSource+"px;display:inline;width:19px !important;height:19px !important;'>"+
                                // jQuery("#show_comments_slider").append("<img class='cg_loading_gif_img' id='cg_loading_gif_img' src='"+loadingSource+"' width='19px' height='19px' style='display:hidden;'>");
                                // jQuery("#rating_cg").empty();
                                //jQuery("#cg_loading_gif_img").load(function(){jQuery(this).toggle();});
                                "<div class='cg_slider_image_div' >"+
                                "<div class='cg_slider_info_div' >"+
                                ""+ratingDIV+""+
                                ""+commentsDIV+""+
                                ""+cgFacebookDivSlider+""+
                                //""+urlDiv+""+
                                "</div>"+
                                "<img src='"+imgSrc+"' "+imgStyle+" width='"+widthCGimgSliderBox+"px' class='cg_slider_image "+cgImageRotation+" "+cg_slider_image_div_info_check+"' id='cg_slider_image_"+realId+"'  />"+
                                ""+userInputDiv+""+
                                "</div>"+
                                "</div>";


                            var imageObject = jQuery(imageObject).appendTo( jQuery( "#imgContainer" ) );


                        }
                        else if(widthCGimgSliderBox<=1400){//alert("origin");

                            if(imgSrcThumbWidth>=1000){
                                var imgSrc = imgSrcThumb;
                                var cgImageRotation = cgImageThumbRotation;
                            }
                            else if(imgSrcMediumWidth>=1000){
                                var imgSrc = imgSrcMedium;
                                var cgImageRotation = cgImageThumbRotation;
                            }
                            else if(imgSrcLargeWidth>=1000){
                                var imgSrc = imgSrcLarge;
                                var cgImageRotation = cgImageThumbRotation;
                            }
                            else{
                                var imgSrc = imgSrcOriginal;
                                var cgImageRotation = cgImageSourceRotation;
                            }

                            var imageObject = "<div style='width:"+widthDivBox+"px;' class='cg_img_box' id='"+cg_img_box_id+"'>"+
                                //"<img  class='cg_loading_gif_img' id='cg_loading_gif_img_"+realId+"'  src='"+loadingSource+"' width='24px' height='24px' style='z-index:1000006;position:absolute;margin-left:"+margin_left_loadingSource+"px;margin-top:"+margin_top_loadingSource+"px;display:inline;width:19px !important;height:19px !important;'>"+
                                // jQuery("#show_comments_slider").append("<img class='cg_loading_gif_img' id='cg_loading_gif_img' src='"+loadingSource+"' width='19px' height='19px' style='display:hidden;'>");
                                // jQuery("#rating_cg").empty();
                                //jQuery("#cg_loading_gif_img").load(function(){jQuery(this).toggle();});
                                "<div class='cg_slider_image_div' >"+
                                "<div class='cg_slider_info_div' >"+
                                ""+ratingDIV+""+
                                ""+commentsDIV+""+
                                ""+cgFacebookDivSlider+""+
                                //""+urlDiv+""+
                                "</div>"+
                                "<img src='"+imgSrc+"' "+imgStyle+" width='"+widthCGimgSliderBox+"px' class='cg_slider_image "+cgImageRotation+" "+cg_slider_image_div_info_check+"' id='cg_slider_image_"+realId+"'  />"+
                                ""+userInputDiv+""+
                                "</div>"+
                                "</div>";

                            var imageObject = jQuery(imageObject).appendTo( jQuery( "#imgContainer" ) );

                        }

                        else{//alert("origin");//Puffer bis 2120 ist gegeben von 1920 aus
                            var imgSrc = imgSrcOriginal;
                            var imageObject = "<div style='width:"+widthDivBox+"px;' class='cg_img_box' id='"+cg_img_box_id+"'>"+
                                //"<img  class='cg_loading_gif_img' id='cg_loading_gif_img_"+realId+"'  src='"+loadingSource+"' width='24px' height='24px' style='z-index:1000006;position:absolute;margin-left:"+margin_left_loadingSource+"px;margin-top:"+margin_top_loadingSource+"px;display:inline;width:19px !important;height:19px !important;'>"+
                                // jQuery("#show_comments_slider").append("<img class='cg_loading_gif_img' id='cg_loading_gif_img' src='"+loadingSource+"' width='19px' height='19px' style='display:hidden;'>");
                                // jQuery("#rating_cg").empty();
                                //jQuery("#cg_loading_gif_img").load(function(){jQuery(this).toggle();});
                                "<div class='cg_slider_image_div'>"+
                                "<div class='cg_slider_info_div' >"+
                                ""+ratingDIV+""+
                                ""+commentsDIV+""+
                                ""+cgFacebookDivSlider+""+
                                //""+urlDiv+""+
                                "</div>"+
                                "<img src='"+imgSrc+"' "+imgStyle+" width='"+widthCGimgSliderBox+"px' class='cg_slider_image "+cgImageSourceRotation+" "+cg_slider_image_div_info_check+"' id='cg_slider_image_"+realId+"'  />"+
                                ""+userInputDiv+""+
                                "</div>"+
                                "</div>";

                            var imageObject = jQuery(imageObject).appendTo( jQuery( "#imgContainer" ) );

                        }
                        //   console.log('actionAppend: '+r);
                   //     var heightImageId = cgJsClass.slider.slide.objects.images[classCGimageNumber].find('.cg_slider_image').attr('id');


                        if(typeof cgJsClass.slider.slide.objects.images[r]=='undefined'){
                            cgJsClass.slider.slide.objects.images[r]=imageObject;
                        }



                    }

                    //  console.log(jQuery('#cg_actual_slider_img_id').val());
/*
                    if(typeof cgJsClass.slider.slide.objects.images[classCGimageNumber] == 'undefined'){
                        console.log('classCGimageNumber: '+classCGimageNumber)
                        cgJsClass.slider.slide.objects.images[classCGimageNumber]=imageObject;
                        console.log(cgJsClass.slider.slide.objects.images[classCGimageNumber]);

                    }*/



               // }


                }







        });






        // Pauschal alle display none before später weiter unten auf display geschaltet wird
        jQuery(cgJsClass.slider.slide.objects.images).each(function(){
            jQuery(this).css('display','none');
        });

        //   console.log(cgJsClass.slider.slide.objects.images);
        var cg_actual_slider_img_id = cgJsClass.slider.slide.objects.currentId;
        var imgSrcOriginal = jQuery('#cg_show'+cg_actual_slider_img_id+' .imgSrcOriginal').val();
        jQuery('#cg_slider_download_full_size_icon_div a').attr('href',imgSrcOriginal);

        // Check if function was done after resizing

        var cg_slider_resize = jQuery('#cg_slider_resize').val();

     //   var widthCGimgContainerAggregated = jQuery("#widthCGimgContainerAggregated").val();
        //alert(widthCGimgContainerAggregated);


        if(cg_slider_resize==1){

            jQuery('#cg_slider_resize').val(0);

          //  jQuery('div#imgContainer').css('width', widthCGimgContainerAggregated);
        //    jQuery('div#imgContainer').css('left', marginLeftSlider);

            /*                jQuery( "#imgContainer" ).animate({
                                width: widthCGimgContainerAggregated,
                                marginLeft: marginLeftSlider
                            }, 200 );*/

        }
        else{

            /*                jQuery( "#imgContainer" ).animate({
                                width: widthCGimgContainerAggregated,
                                marginLeft: marginLeftSlider
                            }, 200 );*/

           // jQuery( "div#imgContainer" ).css("width",widthCGimgContainerAggregated);
          //  jQuery( "div#imgContainer" ).css("left",marginLeftSlider);

        }



        if(cgJsClass.slider.vars.cg_FbLike==1){

            cg_fb_reload = jQuery("#cg_fb_reload"+cgJsClass.slider.slide.objects.currentId+"");


            //	  alert(cg_fb_reload);
            if(cg_fb_reload=="413"){


                if(jQuery("#cg_slider_frame_reloaded").val()=="0"){
                    jQuery(window).load(function(){
                        // Einmal reload des aktuellen Frames
                        var fbFrameDiv = document.getElementById("cg_fb_like_iframe_slider"+cgJsClass.slider.slide.objects.currentId+"").contentWindow;
                        //var win = jQuery("#cg_fb_like_iframe_gallery17").contentWindow;
                        fbFrameDiv.postMessage("reload","*");
                        jQuery("#cg_slider_frame_reloaded").val(1);
                    });
                }

                if(cgJsClass.slider.vars.cg_FbLikeGallery==1){

                    if(jQuery("#cg_gallery_frame_reloaded").val()=="0"){
                        //alert("go");
                        // Einmal reload des vergangenen Frames in der Galerie-Ansicht
                        if (jQuery("#cg_slider_class_value_before").val() >= 1){
                            jQuery(window).load(function(){
                                //alert("cg_fb_like_iframe_gallery_order"+jQuery("#cg_slider_class_value_before").val()+"");
                                var fbFrameDiv = document.getElementsByClassName("cg_fb_like_iframe_gallery_order"+cgJsClass.slider.slide.objects.currentId+"")[0].contentWindow;
                                fbFrameDiv.postMessage("reload","*");
                                jQuery("#cg_gallery_frame_reloaded").val(1);
                            });
                        }
                    }

                }

            }

            else{

                if(jQuery("#cg_slider_frame_reloaded").val()=="0"){
                    jQuery(window).load(function(){
                        // Einmal reload des aktuellen Frames
                        document.getElementById("cg_fb_like_iframe_slider"+cgJsClass.slider.slide.objects.currentId+"").contentWindow.location.reload;
                        jQuery("#cg_slider_frame_reloaded").val(1);
                    });
                }

                if(cgJsClass.slider.vars.cg_FbLikeGallery==1){

                    if(jQuery("#cg_gallery_frame_reloaded").val()=="0"){
                        //alert("go");
                        // Einmal reload des vergangenen Frames in der Galerie-Ansicht
                        if (jQuery("#cg_slider_class_value_before").val() >= 1){
                            jQuery(window).load(function(){
                                //alert("cg_fb_like_iframe_gallery_order"+jQuery("#cg_slider_class_value_before").val()+"");
                                //document.getElementsByClassName("cg_fb_like_iframe_gallery_order"+jQuery("#cg_slider_class_value_before").val()+"")[0].contentWindow.location.reload;
                                //frames["cg_fb_like_iframe_gallery1076"].contentWindow.location.reload;
                                var cg_gallery_iframe_id = jQuery(".cg_fb_like_iframe_gallery_order"+cgJsClass.slider.slide.objects.currentId+"").attr("id");
                                document.getElementById(cg_gallery_iframe_id).contentWindow.location.reload(true);
                                jQuery("#cg_gallery_frame_reloaded").val(1);
                            });
                        }
                    }
                }

            }

        }


        if(classCGimageNumber<2){
            //  console.log('classCGimageNumber: '+classCGimageNumber);
            jQuery("#cg_slider_arrow_left").hide();
            cgJsClass.slider.slide.objects.setPagePrevUrl();
           // jQuery("#cg_slider_arrow_right_next_page").css('display','none');


        }
        else{


            var currentCount = cgJsClass.slider.slide.objects.currentNumber;
            var firstImage = false;
            var checkTrue = false;
            cgJsClass.slider.slide.values.visible.forEach(function (value,index) {

                if(currentCount == index && checkTrue == false){
                    cgJsClass.slider.slide.objects.currentNumber = index;
                    firstImage = true;
                }

                if(value==true){
                    checkTrue = true;
                }

            });

            if(firstImage==true){

                jQuery("#cg_slider_arrow_left").hide();
                cgJsClass.slider.slide.objects.setPagePrevUrl();
           //     jQuery("#cg_slider_arrow_right_next_page").css('display','none');

            }else{
                if(cgJsClass.slider.vars.isIOS==true || cgJsClass.slider.vars.isMobile!=true){
                    jQuery("#cg_slider_arrow_left").show();
                }
                if(jQuery("#cg_further_images_container").length>=1){
                    if(classCGimageNumber<allCGimages){

                    //    jQuery("#cg_slider_arrow_left_next_page").css('display','none');
                    //    jQuery("#cg_slider_arrow_right_next_page").css('display','none');

                    }
                }
                jQuery("#cg_slider_arrow_left_next_page").css('display','none');

            }

        }

        if(classCGimageNumber>=allCGimages ){

            jQuery("#cg_slider_arrow_right").hide();
            cgJsClass.slider.slide.objects.setPageNextUrl();
            if(allCGimages!=1){
           //     jQuery("#cg_slider_arrow_left_next_page").css('display','none');
            }


        }

        else{

            var currentCount = cgJsClass.slider.slide.objects.currentNumber;
            var lastImage = false;
            var lastTrueValueIndex = 0;


            cgJsClass.slider.slide.values.visible.forEach(function (value,index) {

                if(value==true){
                    lastTrueValueIndex = index;
                }

            });


            if(currentCount==lastTrueValueIndex){
                lastImage = true;
            }

            if(lastImage==true){

                jQuery("#cg_slider_arrow_right").hide();
                cgJsClass.slider.slide.objects.setPageNextUrl();
                if(allCGimages!=1){
                   // jQuery("#cg_slider_arrow_left_next_page").css('display','none');
                }

            }else{

                if(jQuery("#cg_further_images_container").length>=1){
                    if(classCGimageNumber>=2){
                      //  jQuery("#cg_slider_arrow_left_next_page").css('display','none');
                     //   jQuery("#cg_slider_arrow_right_next_page").css('display','none');
                    }
                }

                if(cgJsClass.slider.vars.isIOS==true || cgJsClass.slider.vars.isMobile!=true){
                    jQuery("#cg_slider_arrow_right").show();
                }
                jQuery("#cg_slider_arrow_right_next_page").css('display','none');
            }

        }

        var real_picture_id = cgJsClass.slider.slide.objects.currentId;
        var crypted_picture_id =(parseInt(real_picture_id)+8)*2+100000;
        cgJsClass.slider.slide.objects.changeUrl(crypted_picture_id);




        jQuery("#widthCGoverlay_old").val(widthCGoverlay);
//return false;
        //   console.log('show visibility here: '+classCGimageNumber);
       cgJsClass.slider.slide.objects.images[classCGimageNumber].css("display","inline");
       // cgJsClass.slider.slide.objects.images[classCGimageNumber].slideToggle("slide").css("display","inline");
        cgJsClass.slider.slide.objects.images[classCGimageNumber].css("overflow","hidden");
        cgJsClass.slider.slide.objects.images[classCGimageNumber].find('.cg_slider_image_div img').css("visibility","visible");
        //alert(333);
        // Prüfen ob User input existiert, zur genauen Prüfung muss vorher ermittelt werden ob das Bild geladen wurde,
        // dann wird die postion vom letzten p element genau ermittelt
        //var actualImage = jQuery('#cg_img_box_'+classCGimageNumber+' img.cg_slider_image');

        if(cgJsClass.slider.slide.objects.images[classCGimageNumber].find('img.cg_slider_image').is(':visible')) {
            if(typeof cgJsClass.slider.slide.objects.currentUserInfoObject == 'object'){
                cgJsClass.slider.slide.objects.fadeOutCurrentUserInfo();
            }
            //   console.log('visible u info classCGimageNumber: '+classCGimageNumber)
            cgJsClass.slider.slide.objects.cutUserInfo(classCGimageNumber);
        }

        else{
            cgJsClass.slider.slide.objects.images[classCGimageNumber].find('img.cg_slider_image').load(function() {
                if(typeof cgJsClass.slider.slide.objects.currentUserInfoObject == 'object'){
                    cgJsClass.slider.slide.objects.fadeOutCurrentUserInfo();
                }
                //   console.log(' classCGimageNumber: '+classCGimageNumber)
                //   console.log('load u info classCGimageNumber: '+classCGimageNumber)

                cgJsClass.slider.slide.objects.cutUserInfo(classCGimageNumber);
            });

        }

        // Prüfen ob User input existiert === ENDE


        if(cgJsClass.slider.vars.cg_hide_carrousel==false){

            setTimeout(function () {
                //   console.log('real_picture_id scroll to: '+real_picture_id)
                cgJsClass.slider.carrousel.scrollTo(real_picture_id);
            },100)


        }

        if(cgJsClass.slider.vars.isMobile==true){
            //    console.log('hash done');
            window.location.hash=cgJsClass.slider.slide.objects.currentNumber;
            cgJsClass.slider.vars.hash = '#'+cgJsClass.slider.slide.objects.currentNumber;
        }

      //  console.log('allImages: ');
      //  console.log(cgJsClass.slider.slide.objects.images);

       // console.log('ende 123: '+cgJsClass.slider.slide.objects.currentNumber);
      //  console.log(cgJsClass.slider.slide.objects.images[cgJsClass.slider.slide.objects.currentNumber]);

        cgJsClass.slider.slide.objects.images[cgJsClass.slider.slide.objects.currentNumber].css('visibility','visible');



    }


}

}