cgJsClass.gallery.thumbLogic = {
    init: function (jQuery,gid,openPage,calledFromUpload,openImage,stepChange,viewChange,randomButtonClicked,isCopyUploadToAnotherGallery,isFromResize,isFromFullWindowSliderOrBlogView) {

        if(typeof openPage == 'undefined'){
            openPage = false;
        }
        //console.trace();

        // gallery index
        var gid = gid;

        var sliderView = false;

        if(cgJsData[gid].vars.currentLook=='slider'){
            sliderView = true;
        }else{
            cgJsData[gid].vars.currentLook='thumb';
            cgJsData[gid].vars.cgLdsDualRingCGcenterDivHide.addClass('cg_hide');// might be visible from blog view when scrolling top and closing fast
        }

        cgJsData[gid].vars.mainCGallery.removeClass('cg_height_view');

        //!IMPORTANT current view look for resize

        var $ = jQuery;

        var DistancePicsX = parseInt(cgJsData[gid].options.general.DistancePics);
        if(isNaN(DistancePicsX)){
            DistancePicsX = 0;
        }else{
            DistancePicsX = parseInt(DistancePicsX);
        }
        var DistancePicsV = parseInt(cgJsData[gid].options.general.DistancePicsV);
        if(isNaN(DistancePicsV)){
            DistancePicsV = 0;
        }else{
            DistancePicsV = parseInt(DistancePicsV);
        }

        var $mainCGallery = cgJsData[gid].vars.mainCGallery;
        var $mainCGslider = cgJsData[gid].vars.mainCGallery.find('#mainCGslider'+gid);
        var $mainCGdiv = cgJsData[gid].vars.mainCGdiv;

        $mainCGallery.removeClass('cg_blog cg_slider cg_height_view');

        cgJsData[gid].vars.mainCGdiv.css('width','100%');

        if(sliderView){
            $mainCGallery.addClass('cg_slider');
            $mainCGallery.removeClass('cg_thumb_view');
        }else{
            $mainCGallery.addClass('cg_thumb_view');
        }

        // Ermitteln von Breite des parent Divs nach resize

        if(cgJsClass.gallery.vars.fullwindow==gid){
            // -40 wegen padding 20 rechts links und 15 wege scroll bar die beim parent hinzugefügt wird
            // var widthMainCGallery = $('body').width()-55;
            var widthMainCGallery = $(window).width()-cgJsClass.gallery.function.general.tools.getScrollbarWidthDependsOnBrowser();
        }else{
            var widthMainCGallery = cgJsData[gid].vars.mainCGdivContainer.width();
        }

        if(widthMainCGallery<247){
            widthMainCGallery = 247;
        }

        // Breite des divs in dem sich die Galerie befindet
        var widthmain = widthMainCGallery;

        var widthmainForCalculation = widthmain - parseInt($mainCGdiv.css('padding-left')) - parseInt($mainCGdiv.css('padding-right'));
        cgJsData[gid].vars.widthmainForCalculation = widthmainForCalculation;

        //$mainCGdiv.css('width',widthmain+'px');
        //cgJsData[gid].vars.cgCenterDiv.css('width',widthmainForCalculation+'px');

        cgJsData[gid].vars.widthmain = widthmain;

        cgJsClass.gallery.views.functions.destroyRangeSlider(gid);

        cgJsData[gid].vars.mainCGslider = $mainCGslider;

        if(cgJsData[gid].image.length<1){
            //$mainCGdiv.find('#cgLdsDualRingMainCGdivHide'+gid).addClass('cg_hide');
            cgJsClass.gallery.function.general.tools.hideSkeletonLoader(gid);

            $mainCGslider.addClass('cg_hide');
            if(sliderView){
                $mainCGallery.find('.cgCenterDiv').addClass('cg_hide');
            }
            //$mainCGslider.find('#cgLdsDualRingMainCGdivHide'+gid).addClass('cg_hide');
            cgJsClass.gallery.function.general.tools.hideSkeletonLoader(gid);
            if(sliderView == true){
                if(cgJsData[gid].vars.cgSliderRangeContainer){
                    cgJsData[gid].vars.cgSliderRangeContainer.addClass('cg_hide');// might required to be not visible if there are not images becaause of search or clicked categories
                }
            }
            return;
        }else{
            if(sliderView){
                //$mainCGdiv.find('#cgLdsDualRingMainCGdivHide'+gid).removeClass('cg_hide');
                //$mainCGslider.find('#cgLdsDualRingMainCGdivHide'+gid).removeClass('cg_hide');
                //cgJsClass.gallery.function.general.tools.checkSkeletonLoaderToShow(gid);
            }
        }

        if(cgJsData[gid].options.visual['SliderThumbNav']!=1){
            $mainCGslider.addClass('cg_hide_slider');
        }

        if(sliderView == true){

            cgJsData[gid].vars.$cgVerticalSpaceCreatorThumbView = null;

            if(cgJsData[gid].image.length==0){
                $mainCGslider.addClass('cg_hide');
            }else{
                $mainCGslider.removeClass('cg_hide');
            }

            var approximateWidth = 150;

            if(widthmainForCalculation<800){
                approximateWidth = 130;
            }

            var maximumVisibleImagesInSlider = Math.round(widthmainForCalculation/approximateWidth);
            if (maximumVisibleImagesInSlider % 2 == 0) {// then even!!! Has to be maken odd
                maximumVisibleImagesInSlider = maximumVisibleImagesInSlider+1;
            }
            cgJsData[gid].vars.maximumVisibleImagesInSlider = maximumVisibleImagesInSlider;
            var newWidth = widthmainForCalculation/maximumVisibleImagesInSlider;
            var newWidthMultiplikator = newWidth/approximateWidth;
            var newHeight = 100*newWidthMultiplikator;
            var widthSlider = newWidth;
            cgJsData[gid].vars.widthSliderPreview = widthSlider;
            var heightSlider = newHeight;
            var heightSliderContainer = heightSlider+10;// +2 because of padding for little space between scrollbar and border selected

            if(cgJsClass.gallery.vars.isEdge){
                heightSliderContainer = heightSliderContainer + 7;
            }
            if(cgJsClass.gallery.vars.isFF){
                heightSliderContainer = heightSliderContainer + 7;
            }

            //  var imagesCount = Object.keys(cgJsData[gid].vars.rawData).length;
            // var widthmainCgSlider = newWidth*imagesCount+newWidth*maximumVisibleImagesInSlider;// newWidth*maximumVisibleImagesInSlider ist sicherheitsabstand rechts

            // if(stepChange!=true){
            /*            $mainCGallery.css('width',widthmainForCalculation+'px');

                        $mainCGslider.css({
                            'width': (widthmainForCalculation-2)+'px',
                            //'height': heightSliderContainer+'px'
                        });*/

            var countImages = Object.keys(cgJsData[gid].image).length;

            if(countImages*cgJsData[gid].vars.widthSliderPreview < cgJsData[gid].vars.widthmainForCalculation){
                var paddingLeftSlider = ((cgJsData[gid].vars.widthmainForCalculation-(countImages*cgJsData[gid].vars.widthSliderPreview))/2)
                //$mainCGslider.css('padding-left',paddingLeftSlider+'px');
                $mainCGslider.css('padding-left','0');// is easier, no possible strange behaviour then
            }else{
                $mainCGslider.css('padding-left','0');
            }

            //   }

            if($mainCGallery.find('.cg_show').length>=1){// then must come from slider look
                // $('#mainCGallery'+gid).addClass('cg_hidden');
                $mainCGallery.find('.cg_show').appendTo($mainCGslider);
            }

        }else{
            //       cgJsData[gid].vars.cgCenterDivAppearenceHelper.removeClass('cg_hide');
            //$mainCGallery.css('width',widthmainForCalculation+DistancePicsX+'px');
            cgJsClass.gallery.views.functions.checkAndAppendFromSliderToGallery($mainCGallery,$mainCGslider);
        }

        //cgJsData[gid].vars.cgCenterDiv.css('width',widthmainForCalculation+'px');
        cgJsData[gid].vars.thumbViewWidthFromLastImageInRow = widthmainForCalculation;// vorab festlegung hier, eigentliche anpassung erfolgt unten, hier ist allerdings nützlich bei open full size das erste mal

        if(openPage==true || viewChange==true){
            $('#mainCGallery'+gid).removeClass('cg_fade_in_new').addClass('cg_hidden');
        }

        if(calledFromUpload){
            $('#mainCGallery'+gid).removeClass('cg_fade_in_new').addClass('cg_hidden');
        }

        $mainCGallery.removeClass('cg_fade_in_new');

        // manchmal wird width nicht gesetzt, deswegen sicherheithalber nochmal setzen
        if(openPage===true && sliderView==false){
            /*            if($mainCGdiv.css('width')!=true){
                            $mainCGallery.css('visibility','hidden');
                            setTimeout(function () {
                                //$mainCGdiv.css('width',cgJsData[gid].vars.widthmain+'px');
                                setTimeout(function () {
                                    //    $mainCGallery.css('visibility','visible').addClass('cg_fade_in_new');
                                },100);
                            },100);
                        }*/
        }else{
            $mainCGallery.addClass('cg_hidden');
            $mainCGallery.removeClass('cg_fade_in');
            $mainCGallery.css('visibility','visible');
        }

        if(sliderView == true && viewChange===true){
            //$mainCGdiv.find('#cgLdsDualRingMainCGdivHide'+gid).removeClass('cg_hide');
            ////cgJsClass.gallery.function.general.tools.checkSkeletonLoaderToShow(gid);
        }

        var opacity = parseFloat(cgJsData[gid].options.visual.ThumbViewBorderOpacity);

        var borderColor = cgJsData[gid].options.visual.ThumbViewBorderColor;

        var hex2rgb = function(hexStr){
            // note: hexStr should be #rrggbb
            var hex = parseInt(hexStr.substring(1), 16);
            var r = (hex & 0xff0000) >> 16;
            var g = (hex & 0x00ff00) >> 8;
            var b = hex & 0x0000ff;
            return [r, g, b];
            //return r;
        };

        if(borderColor==''){
            borderColor = '#000000';
        }

        var rcolor = hex2rgb(borderColor);

        var rgba = "("+rcolor[0]+","+rcolor[1]+","+rcolor[2]+", "+opacity+")";

        // Summe der einzelnen Breiten
        var aggregateWidth = 0;

        // wird am Ende verabeitet
        var i = 0;

        // wird am Anfang verabeitet
        var r = 0;

        //var WidthThumb = parseInt($('#cg_WidthThumb').val());
        //var HeightThumb = parseInt($('#cg_HeightThumb').val());
        var WidthThumb = parseInt(cgJsData[gid].options.general.WidthThumb);
        var HeightThumb = parseInt(cgJsData[gid].options.general.HeightThumb);
        var WidthThumbReal = parseInt(cgJsData[gid].options.general.WidthThumb);
        var HeightThumbReal = parseInt(cgJsData[gid].options.general.HeightThumb);

        //var border = parseInt(cgJsData[gid].options.visual.ThumbViewBorderWidth);
        var border = 0;


        if(sliderView==true){
            DistancePicsX = 0;
            DistancePicsV = 0;
            border=0;
        }


        // extra korrektur sonst fehler bei ansicht
        if(border>0){
            if(DistancePicsX==0){
                DistancePicsX = 0;
            }
            if(DistancePicsV==0){
                DistancePicsV = 0;
            }
        }

        WidthThumbReal = WidthThumbReal-DistancePicsX;

        if(parseInt(cgJsData[gid].options.visual.ThumbViewBorderRadius)>5){var cg_CircleImages=1;}
        else{var cg_CircleImages=0;}

        //ACHTUNG!! Das hier wichtig. Int Value geht nach einem Lauf verloren.
        widthmainForCalculation = parseInt(widthmainForCalculation);

        var xMultiFull  = (widthmainForCalculation+DistancePicsX)/(WidthThumb+2*border+DistancePicsX);

        // Genauer Multiplikator zur Exakten Berechnung von WidthThumb beim Adjustment, welches jetzt standardmäßig immer aktiviert ist bei dieser Ansicht.
        if(xMultiFull<=1){
            var xMulti1 = xMultiFull;

            //Wichtig! Zum Ausgleich in der Breite je nach Anzahl der Bilder.
            var xMultiFull1 = 0;

        }

        else{

            xMultiFull1 = xMultiFull.toString();

            var xMulti = xMultiFull1.split(".");

            var picsInRow = parseInt(xMulti[0]);


            var xMulti1 = (widthmainForCalculation+DistancePicsX)/(((WidthThumb+2*border+DistancePicsX)*picsInRow));

        }

        //Wichtig! Zum Ausgleich in der Breite je nach Anzahl der Bilder.
        var xMultiFull1Adjustment = Math.ceil(xMultiFull1);

        WidthThumb=WidthThumb*xMulti1;
        WidthThumb=Math.floor(WidthThumb)-xMultiFull1Adjustment;

        HeightThumb=HeightThumb*xMulti1;
        //DistancePicsX=DistancePicsX*xMulti1;
        //DistancePicsV=DistancePicsV*xMulti1;

        border=border*xMulti1;

        var firstRow = 0;

        var classCounter = 0;

        var firstRealId = null;

        $mainCGdiv.find('#cgVerticalSpaceCreator'+gid).remove();

        // needs only for row logic!!!!
        cgJsClass.gallery.resize.galleryIcons($mainCGallery,openPage,true,gid,widthmain);

        if(sliderView == true){
            cgJsClass.gallery.resize.galleryIconsSlider($mainCGslider,openPage,false,gid,widthmain);
        }

        var realIdBefore;
        var offsetNow;
        var offsetTopBefore;
        var offsetLeftBefore;
        var offsetNowNew = false;
        var collectRealIdsLastRow = [];
        var collectRealIdsForMarginTop0 = [];
        var collectRealIdsForMarginRight0 = [];

        if(sliderView){
            $mainCGallery.removeClass('cg_thumb_view');
        }else{
            $mainCGallery.addClass('cg_thumb_view');
        }

        var lengthCgJsDataGidImage = Object.keys(cgJsData[gid].image).length;

        $.each(cgJsData[gid].image, function( index,value ) {

            var arrIndex = index;

            var firstKey = Object.keys(value)[0];

            //  var objectKey = Object.keys(firstKey)[0];
            var objectKey = firstKey;
            // var objectKey = value[firstKey]['rowid'];


            var categoryId = cgJsData[gid].image[index][firstKey]['Category'];


            if(typeof cgJsData[gid].vars.categories[categoryId] != 'undefined'){


                if(cgJsData[gid].vars.showCategories == true && cgJsData[gid].vars.categories[categoryId]['Checked']==false){


                    return;

                }

            }

            classCounter++;

            r++;

            //var imgSrcThumbWidth = parseInt(cgJsData[gid].image[index][objectKey].thumbnail_size_w);
            var realId = cgJsData[gid].image[index][firstKey]['id'];

            if(cgJsData[gid].imageObject[realId]){
                cgJsData[gid].imageObject[realId].removeClass('cg_margin_top_0');
                // unset all values also here to go sure that not required are not set
                cgJsData[gid].imageObject[realId].css({
                    'border':'none',
                    'width': 'unset',
                    'vertical-align':'unset',
                    'margin-top':'unset',
                    'margin-left':'unset',
                    'margin-bottom':'unset',
                    'margin-right':'unset',
                    'flex-basis': 'unset',
                    'max-width': 'unset',
                    'height': 'unset'
                });
            }

            // thumb wird nicht verwendet, da thumb quadratisches abgeschnittenes bild ist und somot nicht passen könnte
            //        console.log(realId);
//            console.log(cgJsData[gid].vars.rawData[realId].large);
            //var imgSrcMedium = cgJsClass.gallery.function.general.tools.checkSsl(cgJsData[gid].vars.rawData[realId].medium);
            // thumbnail_size_w, medium_size_w and large_size_w calculation will be done in init-gallery-getjson imageDataPreProcess with calculateSizeImageDataPreProcess function
            var imgSrcMediumWidth = parseInt(cgJsClass.gallery.vars.medium_size_w);
            var imgSrcLarge = cgJsClass.gallery.function.general.tools.checkSsl(cgJsData[gid].vars.rawData[realId].large);
            var imgType = cgJsData[gid].vars.rawData[realId].ImgType;
            // thumbnail_size_w, medium_size_w and large_size_w calculation will be done in init-gallery-getjson imageDataPreProcess with calculateSizeImageDataPreProcess function
            var imgSrcLargeWidth = parseInt(cgJsClass.gallery.vars.large_size_w);
            var imgSrcOriginal = cgJsClass.gallery.function.general.tools.checkSsl(cgJsData[gid].vars.rawData[realId].full);
            // schon mal pauschal ausmachen
            var imgSrc = imgSrcLarge;

            var cg_Use_as_URL = cgJsData[gid].vars.formHasUrlField;
            var cg_ForwardToURL = cgJsData[gid].options.general.ForwardToURL;
            var cg_ForwardFrom = cgJsData[gid].options.general.ForwardFrom;
            var cg_FullSizeImageOutGalleryNewTab = cgJsData[gid].options.general.FullSizeImageOutGalleryNewTab;
            var cg_FullSizeImageOutGallery = cgJsData[gid].options.general.FullSizeImageOutGallery;
            /*            if(realId==1265){
                            debugger
                        }*/
            var isAlternativeFileType = cgJsClass.gallery.function.general.tools.isAlternativeFileType(gid,realId);
            var isImageType = cgJsClass.gallery.function.general.tools.isImageType(gid,realId);

            //Achtung entspricht nicht der Anzahl der tatsächlich geladenen Bilder. Fängt mit 0 an. Wird auch für das gesammelte Height und Width Array verwendet.

            // Wenn resize gemacht wurde gerade und logic läuft, dann sollen ALLE nochmal abgearbeitet werden

            var realId = cgJsData[gid].image[index][firstKey]['id'];

            if(!firstRealId){
                firstRealId=realId;
            }

            var imgDataWidth = parseInt(cgJsData[gid].vars.rawData[realId].Width);

            if(typeof cgJsData[gid].imageObject[realId] === "undefined" || cgJsData[gid].imageObject[realId].isAdditionalFileChanged) {

                var imageTarget = '';
                var imageHref = '';
                if(cgJsData[gid].options.general.FullSizeImageOutGallery==1){
                    imageTarget = 'target="_blank"';
                    imageHref = imgSrcOriginal;
                }

                if(cgJsData[gid].options.visual.ForwardToWpPageEntry==1){
                    imageHref = imgSrcOriginal;
                    imageHref = cgJsData[gid].vars.rawData[realId]['entryGuid'];
                    if(cgJsData[gid].options.visual.ForwardToWpPageEntryInNewTab==1){
                        imageTarget = 'target="_blank"';
                    }
                }

                if(cgJsData[gid].imageObject[realId] && cgJsData[gid].imageObject[realId].isAdditionalFileChanged){
                    cgJsData[gid].imageObject[realId].remove();
                }

                var cgShowObject = $("<div data-cg-cat-id='"+categoryId+"' data-cg-gid='"+gid+"' data-cg-id='"+realId+"' data-cg-cat-gid='"+gid+"' data-cg-order='"+index+"' class='cg_show cg-cat-"+categoryId+"' id='cg_show"+realId+"'>");

                if(cgJsData[gid].vars.rawData[realId].ImgType=='con'){
                    cgShowObject.addClass('cg_show_con_entry');
                }

                if(cgJsData[gid].vars.rawData[realId].MultipleFilesParsed){
                    var furtherFilesCount = Object.keys(cgJsData[gid].vars.rawData[realId].MultipleFilesParsed).length-1;
                    cgShowObject.prepend('<div class="cg_multiple_files_prev"></div><div class="cg_multiple_files">+'+furtherFilesCount+'</div>');
                }

            }
            else{
                // Pauschal blink class cg_blink_image_disappear entfernen
                // var cgShowObject = cgJsData[gid].image[index][firstKey]['imageObject'].removeClass('cg_hide').removeClass('cg_blink_image_disappear').removeClass('cg_fade_in');
                var cgShowObject = cgJsData[gid].imageObject[realId].removeClass('cg_hide').removeClass('cg_blink_image_disappear').removeClass('cg_fade_in');
                cgJsData[gid].image[index][firstKey]['imageObject'] = cgJsData[gid].imageObject[realId];
            }

            if(cgJsClass.gallery.vars.switchViewsClicked==true){

                cgShowObject.removeAttr('style width height');

                if(isAlternativeFileType!='video'){
                    cgShowObject.find('.cg_append').removeAttr('style width height');
                }

            }

            var widthOriginalImg = parseInt(cgJsData[gid].image[index][objectKey].Width);
            var heightOriginalImg = parseInt(cgJsData[gid].image[index][objectKey].Height);

            var cgRotationThumbNumber = parseInt(cgJsData[gid].image[index][objectKey].rThumb);

            var cgImageThumbRotation = "cg"+cgJsData[gid].image[index][objectKey].rThumb+"degree";

            if(cgRotationThumbNumber=='90' || cgRotationThumbNumber=='270'){
                var cgRotateRatio = widthOriginalImg/heightOriginalImg;
                var cgWidthOriginalImgContainer = widthOriginalImg;
                widthOriginalImg = heightOriginalImg;
                heightOriginalImg = cgWidthOriginalImgContainer;
            }

            var cg_a_href_title = '';

            // Ermittlung der Höhe nach Skalierung. Falls unter der eingestellten Höhe, dann nächstgrößeres Bild nehmen.
            var heightScaledThumb = WidthThumb*heightOriginalImg/widthOriginalImg;

            // Falls unter der eingestellten Höhe, dann größeres Bild nehmen (normales Bild oder panorama Bild, kein Vertikalbild)
            if (heightScaledThumb <= HeightThumb) {

                // Bestimmung von Breite des Bildes
                var WidthThumbPic = HeightThumb*widthOriginalImg/heightOriginalImg;

                // Bestimmung von Breite des Bildes
                var WidthThumbPic = WidthThumbPic+2;
                //$WidthThumbPic = $WidthThumbPic.'px';

                // Bestimmung wie viel links und rechts abgeschnitten werden soll
                var paddingLeftRight = (WidthThumbPic-WidthThumb)/2;

                if(cgRotationThumbNumber=='90' || cgRotationThumbNumber=='270'){
                    WidthThumbPic= WidthThumbPic*cgRotateRatio;
                    var paddingLeftRight = (WidthThumbPic-WidthThumb*cgRotateRatio)/2;
                }

                paddingLeftRight = paddingLeftRight+'px';

                var padding = "left: -"+paddingLeftRight+";right: -"+paddingLeftRight+"";

                var HeightThumbImageValue = HeightThumb+"px";

            }

            // Falls über der eingestellten Höhe, dann kleineres Bild nehmen (kein Vertikalbild)
            if (heightScaledThumb > HeightThumb) {

                if(cgRotationThumbNumber=='90' || cgRotationThumbNumber=='270'){

                    var WidthThumbPic = (WidthThumb+2)*cgRotateRatio;

                }
                else{
                    // Bestimmung von Breite des Bildes
                    var WidthThumbPic = (WidthThumb+2);
                }

                // Bestimmung wie viel oben und unten abgeschnitten werden soll
                var heightImageThumb = WidthThumb*heightOriginalImg/widthOriginalImg;
                var paddingTopBottom = (heightImageThumb-HeightThumb)/2;
                paddingTopBottom = paddingTopBottom+'px';

                var padding = "top: -"+paddingTopBottom+";bottom: -"+paddingTopBottom+"";

                var HeightThumbImageValue = "auto";

            }


            var putDistancePicsX = DistancePicsX;

            var widthToAggregateToCheck = WidthThumb + border*2;

            // DistancePicsX folgt dann weiter unten!
            aggregateWidth = aggregateWidth + WidthThumb + border*2;

            var check3849 = r-1;


            // ACHTUNG DAS HIER IST NUR FÜR DistancePicX!
            if(check3849 % picsInRow == 0){

                putDistancePicsX=0;

                if(r-1!=0){firstRow++;}

            }

            if(r==1 && xMultiFull<=1){

                putDistancePicsX=0;

            }

            if(r==2 && xMultiFull<=1){

                firstRow++;

            }

            // have to be done here again to go sure
            cgShowObject.removeClass('cg_margin_top_0');
            // unset all values to go sure that not required are not set
            cgShowObject.css({
                'border':'none',
                'width': 'unset',
                'vertical-align':'unset',
                'margin-top':'unset',
                'margin-left':'unset',
                'margin-bottom':'unset',
                'margin-right':'unset',
                'flex-basis': 'unset',
                'max-width': 'unset',
                'height': 'unset'
            });

            // pauschal border none und margin unset
            // sonst falsche anzeige falls eine view davor margin und border hatte und diese nicht
            cgShowObject.css({
                'border':'none',
                //'width': WidthThumb,
                'margin-top':DistancePicsV,
                'margin-right':DistancePicsX,
                'flex-basis': WidthThumbReal+'px',
                //   'max-width': WidthThumbReal+2000+'px',// to go sure that always filled when resizing
                'height': HeightThumbReal+'px'
            });

            // cgShowObject.find( "[id*=cg_hide]").css('width',WidthThumb);
            // cgShowObject.find( "[id*=cg_Field1IdGalleryView]").css('width',WidthThumb);

            //cgShowObject.css('margin-top',DistancePicsV);

            if(cg_CircleImages==1){cgShowObject.css({"border-radius": ""+cgJsData[gid].options.visual.ThumbViewBorderRadius+"%"}); var circleImagesOverflow = "overflow:hidden";}

            cgShowObject.css('display','inline-block');
            cgShowObject.css('vertical-align','top');

            widthToAggregateToCheck = widthToAggregateToCheck + DistancePicsX;
            aggregateWidth = aggregateWidth + DistancePicsX;

            // var aggregateWidthCheck = aggregateWidth+100;

            // Höhe von input Field ausgleichen wenn es zu lang ist --- ENDE

            var heightInfoDiv = cgShowObject.find("div[id*=cg_hide]").height();
            cgShowObject.find("div[id*=cg_hide]").children("div").css('position','relative !important');
            var heightInfoDivInfo = cgShowObject.find("div[id*=cg_hide]").children(".cg_info_depend_on_radius").height();

            if(cg_CircleImages==1){// Achtung! Div height hier nehmen!!!
                cgShowObject.find("[id*=cg_hide]").css('margin-bottom',HeightThumb/2-heightInfoDiv/2);
            }

            // Positionen Info Comments und Rating auf den Galerie Images

            // INFO
            if(cgJsData[gid].options.visual.TitlePositionGallery==2){
                cgShowObject.find("div[id*=cg_hide]").find(".cg_info_depend_on_radius").css('text-align','center');
                cgShowObject.find("[id*=cg_Field1IdGallery]").css('text-align','center');
            }
            else if(cgJsData[gid].options.visual.TitlePositionGallery==3){
                cgShowObject.find("div[id*=cg_hide]").find(".cg_info_depend_on_radius").css('text-align','right');
                cgShowObject.find("[id*=cg_Field1IdGallery]").css('text-align','right');

            }
            else{
                cgShowObject.find("div[id*=cg_hide]").find(".cg_info_depend_on_radius").css('text-align','left');
                cgShowObject.find("[id*=cg_Field1IdGallery]").css('text-align','left');
            }

            // COMMENTS
            if(cgJsData[gid].options.visual.CommentPositionGallery==2){
                cgShowObject.find("div[id*=cg_hide]").find(".cg_info_comment_gallery_div").css("text-align","center");
            }
            else if(cgJsData[gid].options.visual.CommentPositionGallery==3){
                cgShowObject.find("div[id*=cg_hide]").find(".cg_info_comment_gallery_div").css("text-align","right");
            }
            else{

            }

            // RATING
            if(cgJsData[gid].options.visual.RatingPositionGallery==2){
                cgShowObject.find("div[id*=cg_hide]").find(".cg_gallery_rating_div").css("text-align","center");
            }
            else if(cgJsData[gid].options.visual.RatingPositionGallery==3){
                cgShowObject.find("div[id*=cg_hide]").find(".cg_gallery_rating_div").css("text-align","right");
            }
            else{

            }

            // Positionen Info Comments und Rating auf den Galerie Images --- ENDE

            if(cg_Use_as_URL==1 && cg_ForwardToURL==1 && cg_ForwardFrom==2){

                //Prüfen ob vom user ein http bei entries der url mit eingetragen wurde, wenn nicht dann hinzufügen

                var cg_img_url_entry = $("#cg_img_url"+realId+"").val();

                if (typeof cg_img_url_entry === 'undefined') { }
                else if(cg_img_url_entry.indexOf("http") > -1) { cg_img_url_entry = cg_img_url_entry; }
                else{ cg_img_url_entry = "http://"+cg_img_url_entry;}


            }
            else{

                //   var cg_id_class_img = "data-cg_image_id='"+realId+"' id='cg_image_id"+realId+"' class='cg_append_image cg_image"+r+" "+cgImageThumbRotation+"'";

                //Prüfen ob FullSizeImageOutGalleryNewTab aktiviert ist

                if(cg_FullSizeImageOutGallery==1){
                    if(cg_FullSizeImageOutGalleryNewTab==1){var cg_href_img_blank = "target='_blank'";}
                    else{var cg_href_img_blank = "";}
                }

            }


            var hideTillHover = '';

            if(cgJsData[gid].options.general.ShowAlways!=1) {
                hideTillHover = 'cg_hide_till_hover';
            }

            if(imgType=='con'){
                hideTillHover = 'cg_hide_till_hover cg_hide_till_hover_con';
            }

            if(imgType=='con'){
                hideTillHover = 'cg_hide_till_hover cg_hide_till_hover_con';
            }

            var cg_no_target_blank = '';

            if(imgType=='con' && cgJsData[gid].options.general.FullSizeImageOutGallery==1){
                cg_no_target_blank = 'cg_no_target_blank';
            }

            if(imgType=='con' && cgJsData[gid].options.general.OnlyGalleryView==1){
                cg_no_target_blank = 'cg_no_target_blank';
            }

            var $infoRatingCommentDiv = $('<div data-cg_image_id="'+realId+'" class="cg_image'+classCounter+' cg_gallery_info '+hideTillHover+'" id="cgGalleryInfo'+realId+'">' +
                '</div>');

            if(cgJsData[gid].options.general.AllowComments>=1 || cgJsData[gid].options.general.AllowRating>=1){
                $infoRatingCommentDiv.append('<div  class="cg_gallery_info_rating_comments"></div>');
            }

            var inputSubTitleId = cgJsData[gid].options.visual['SubTitle'];
            var inputThirdTitleId = cgJsData[gid].options.visual['ThirdTitle'];

            if(inputSubTitleId && inputThirdTitleId){
                cgShowObject.addClass('has_sub_and_third_title');
            }else if (inputSubTitleId || inputThirdTitleId){
                cgShowObject.addClass('has_sub_or_third_title');
            }

            if(sliderView){
                cgShowObject.removeClass('cg_show_info_bottom');
                if(!cgJsData[gid].options.general.AllowComments){
                    $infoRatingCommentDiv.removeClass('cg_no_comments');
                }
            }else{
                if((!sliderView && cgJsData[gid].vars.isUserGallery && cgJsData[gid].options.general.ShowAlways==3) ||
                    (!sliderView && cgJsData[gid].options.general.ShowAlways==3 && (cgJsData[gid].options.general.AllowComments || cgJsData[gid].options.general.AllowRating || cgJsData[gid].options.visual['Field1IdGalleryView'] != 0 || cgJsData[gid].options.visual['SubTitle'] != 0 || cgJsData[gid].options.visual['ThirdTitle'] != 0))) {
                    cgShowObject.addClass('cg_show_info_bottom');
                    if(!cgJsData[gid].options.general.AllowComments){
                        $infoRatingCommentDiv.addClass('cg_no_comments');
                    }
                    if(WidthThumb<160){// thumb view theoretically never so small configured
                        cgShowObject.addClass('cg_show_info_bottom_small');
                    }else{
                        cgShowObject.removeClass('cg_show_info_bottom_small');
                    }
                    if(imgType=='con'){
                        cgShowObject.addClass('cg_show_info_bottom_con');
                    }
                }
            }

            if(sliderView==true){

                cgShowObject.css({
                    'width': widthSlider+'px',
                    'height': heightSlider+'px',
                    'float' : 'none'
                });

                cgShowObject.removeClass('cg_show_info_bottom cg_show_info_bottom_small');

                WidthThumb = widthSlider;
                HeightThumb = heightSlider;

                if(cgJsData[gid].options.general.FbLikeGallery>=1){
                    cgShowObject.find('#cgFacebookGalleryDiv'+realId).addClass('cg_hide');
                }

            }else{
                if(cgJsData[gid].options.general.FbLikeGallery>=1 && !cg_append_file_type){
                    cgShowObject.find('#cgFacebookGalleryDiv'+realId).removeClass('cg_hide');
                }
            }

            // Extra Korrektur für rotated images wenn in single view vorher korrigiert wurden
            if(cgRotationThumbNumber=='270' || cgRotationThumbNumber=='90'){
                /*                    cgShowObject.find('#cgGalleryInfo'+realId).css({ // old logic
                                        'top': 'unset',
                                        'display': 'block'
                                    });*/
            }

            //  if(typeof cgJsData[gid].image[index][objectKey]['imageObject'] === "undefined"){
            // if(typeof cgJsData[gid].vars.rawData[realId]['imageObject'] === "undefined"){
            if(typeof cgJsData[gid].imageObject[realId] === "undefined" || cgJsData[gid].imageObject[realId].isAdditionalFileChanged){

                var postTitle = '',
                    postAlt = '';

                /*                    if(cgJsData[gid].image[index][objectKey].hasOwnProperty('post_title')){
                                        if(cgJsData[gid].image[index][objectKey]['post_title']!=''){
                                            postTitle = 'title="'+cgJsData[gid].image[index][objectKey]['post_title']+'"';
                                        }
                                    }

                                    if(cgJsData[gid].image[index][objectKey].hasOwnProperty('post_alt')){
                                        if(cgJsData[gid].image[index][objectKey]['post_alt']!=''){
                                            postAlt = 'alt="'+cgJsData[gid].image[index][objectKey]['post_alt']+'"';
                                        }
                                    }*/

                var cg_append_file_type = '';

                var isAlternativeFileType = cgJsClass.gallery.function.general.tools.isAlternativeFileType(gid,realId);

                if(isAlternativeFileType){
                    cg_append_file_type = 'cg_append_alternative_file_type cg_append_'+imgType;
                }

                if(isAlternativeFileType && isAlternativeFileType=='video'){
                    // cg_append class is important to set for sliderView
                    var imageObject = $('<video width="100%" height="100%" class="cg_append cg_append_alternative_file_type_video" id="cg_append'+realId+'" >' +
                        '<source src="'+imgSrcOriginal+'#t=0.001" type="video/mp4">' +
                        '<source src="'+imgSrcOriginal+'#t=0.001" type="video/'+imgType+'">' +
                        '</video>');
                }else{
                    var imageObject = $('<figure class="cg_figure"><div id="cg_append'+realId+'" class="cg_append '+cg_append_file_type+' '+cgImageThumbRotation+'"></div><figcaption class="cg_figcaption"></figcaption></figure>');
                }

                //   var imageObject = $('<div id="cg_append'+realId+'" class="cg_append '+cgImageThumbRotation+'" style="width:'+WidthThumb+'px;height:'+HeightThumb+'px;" ></div>');

                imageObject.find('.cg_append').css({"border": "rgba"+rgba+" solid "+border+"px"});

                var cgShowPositionHelper = $('<span id="cgShowPositionHelper'+realId+'" class="cg_show_position_helper" data-cg-gid="'+gid+'"></span>');

                // Prüfung und bestimmung der URL Weiterleitung, falls aktiviert ist --- ENDE

                // thumb wird nicht verwendet, da thumb quadratisches abgeschnittenes bild ist und somot nicht passen könnte
                if(WidthThumbPic<=imgSrcMediumWidth && imgSrcMediumWidth >= 500){// take not smaller then 500, otherwise might not look good on mobiles
                    imgSrc = imgSrcLarge;
                }
                else if(WidthThumbPic<=imgSrcLargeWidth && imgSrcLargeWidth >= 500){// take not smaller then 500, otherwise might not look good on mobiles
                    imgSrc = imgSrcLarge;
                }
                else{
                    imgSrc = imgSrcOriginal;
                }


                if(cgJsData[gid].image[index][objectKey].rThumb=='270' || cgJsData[gid].image[index][objectKey].rThumb=='90'){
                    var $cgAppend = imageObject.find('.cg_append');
                    $cgAppend.css({
                        // 'width': HeightThumb+'px',
                        //  'height': WidthThumb+3+'px',
                        'width': 66.66+'%',
                        'height': 150+'%'
                    });
                    imgSrc = imgSrcLarge;
                }else{
                    var $cgAppend = imageObject.find('.cg_append');
                    $cgAppend.addClass('cg_append_hundert_percent');
                }

                // always image large to go sure when rotated!!! Otherwsise could be looking washed because low resolution.
                if(cgJsData[gid].image[index][objectKey].rThumb=='270' || cgJsData[gid].image[index][objectKey].rThumb=='90'){
                    if(isImageType){
                        cgJsClass.gallery.function.general.tools.appendImageOnLoadGallery(cgShowObject,$cgAppend,imgSrcLarge,realId,gid);
                    }
                }else{
                    if(isImageType){
                        cgJsClass.gallery.function.general.tools.appendImageOnLoadGallery(cgShowObject,$cgAppend,imgSrc,realId,gid);
                    }
                }

                if(cgJsData[gid].options.general.FullSizeImageOutGallery==1 && sliderView == false){
                    imageTarget = 'target="_blank"';
                    imageHref = imgSrcOriginal;

                    var contentWrapped =  $("<a class='"+cg_no_target_blank+"  cg_show_href_target_blank' href='"+imageHref+"' "+imageTarget+"></a>");
                    contentWrapped.append(imageObject);
                    contentWrapped.append($infoRatingCommentDiv);
                    cgShowObject.append(contentWrapped);

                }else if(cgJsData[gid].options.visual.ForwardToWpPageEntry==1){

                    var imageTarget = '';
                    if(cgJsData[gid].options.visual.ForwardToWpPageEntryInNewTab==1){
                        imageTarget = 'target="_blank"';
                    }

                    imageHref = cgJsData[gid].vars.rawData[realId]['entryGuid'];

                    var contentWrapped =  $("<a href='"+imageHref+"'  "+imageTarget+" ></a>");
                    contentWrapped.append(imageObject);
                    contentWrapped.append($infoRatingCommentDiv);
                    cgShowObject.append(contentWrapped);

                }else{
                    cgShowObject.append(imageObject).append($infoRatingCommentDiv);
                    cgShowObject.append(cgShowPositionHelper);
                }


                /*                        var imageObject = cgShowObject.append("<div class='cg_append' id='cg_append"+realId+"' " +
                                        "style='width:"+WidthThumb+"px;height:"+HeightThumb+"px;'>"+
                                        "<a "+cg_a_href_img+" "+cg_href_img_blank+" "+cg_a_href_title+" >"+
                                        "<img src='"+imgSrc+"' data-order='"+r+"' style='position:absolute;"+padding+";max-width:none;"+circleImagesOverflow+";' " +
                                        "width='"+WidthThumbPic+"px' height='"+HeightThumbImageValue+"' "+cg_id_class_img+" >"+
                                        "</a>" +
                                        "</div>"+$infoRatingCommentDiv+"");*/


                if(sliderView==true){
                    cgShowObject.removeClass('cg_show_info_bottom cg_show_info_bottom_small');
                    if(i < maximumVisibleImagesInSlider){
                        $mainCGslider.append(cgShowObject);
                    }
                }else{
                    if(calledFromUpload===true){
                        $mainCGallery.append(cgShowObject);
                    }else{
                        $mainCGallery.append(cgShowObject);
                    }
                }

                cgShowObject.addClass('cg_fade_in');
                cgJsData[gid].imageObject[realId] = cgShowObject;
                cgJsData[gid].imageObject[realId].isAdditionalFileChanged = false;
                cgJsData[gid].image[index][firstKey]['imageObject'] = cgJsData[gid].imageObject[realId];

                if(typeof cgJsData[gid].rateAndCommentNumbers[realId] == 'undefined'){
                    cgJsClass.gallery.dynamicOptions.getRatingAndComments(realId,arrIndex,objectKey,gid,calledFromUpload);
                }else{
                    cgJsClass.gallery.dynamicOptions.setRatingAndComments(realId,arrIndex,objectKey,gid,calledFromUpload);
                }

                if(typeof cgJsData[gid].vars.info[realId] == 'undefined'){
                    if(cgJsData[gid].image[index][objectKey].rThumb=='270' || cgJsData[gid].image[index][objectKey].rThumb=='90'){
                        cgJsClass.gallery.info.getInfo(realId,gid,false,arrIndex,false,false,false, cgJsData[gid].imageObject[realId],WidthThumbReal,HeightThumbReal);
                    }else{
                        cgJsClass.gallery.info.getInfo(realId,gid,false,arrIndex,false,false,false, cgJsData[gid].imageObject[realId],HeightThumbReal,WidthThumbReal);
                    }
                }else{
                    if(cgJsData[gid].image[index][objectKey].rThumb=='270' || cgJsData[gid].image[index][objectKey].rThumb=='90'){
                        cgJsClass.gallery.info.setInfo(realId,gid,false,arrIndex,cgJsData[gid].vars.info[realId], false, false, false, cgJsData[gid].imageObject[realId], WidthThumbReal, HeightThumbReal);
                    }else{
                        cgJsClass.gallery.info.setInfo(realId,gid,false,arrIndex,cgJsData[gid].vars.info[realId], false, false, false, cgJsData[gid].imageObject[realId], HeightThumbReal,WidthThumbReal);
                    }
                }

                if(isImageType){
                    if(imgSrc==imgSrcOriginal || imgDataWidth<WidthThumbPic){
                        if(typeof cgJsData[gid].vars.rawData['imgSrcOriginalWidth'] == 'undefined'){
                            var img = new Image();
                            img.src = imgSrc;
                            img.onload = function() {
                                cgJsData[gid].vars.rawData[realId]['imgSrcOriginalWidth'] = this.width;
                                cgJsData[gid].vars.rawData[realId]['imgSrcOriginalHeight'] = this.height;
                                var differenceCheck = WidthThumbPic-this.width;// WidthThumbPic kann man nehmen weil diese sich nicht ändert
                                if(differenceCheck>20){// then stretch will be visible better show real size then
                                    // man muss cgJsData[gid].image[index][firstKey]['imageObject'] statt imageObject weil sich imageObject sich zur Laufzeit ändert
                                    cgJsData[gid].imageObject[realId].find('.cg_append').addClass('cg_background_size_unset');
                                }
                            };
                        }
                    }
                }

            }
            else{

                if((!sliderView && cgJsData[gid].vars.isUserGallery && cgJsData[gid].options.general.ShowAlways==3) ||
                    (!sliderView && cgJsData[gid].options.general.ShowAlways==3 && (cgJsData[gid].options.general.AllowComments || cgJsData[gid].options.general.AllowRating || cgJsData[gid].options.visual['Field1IdGalleryView']  || cgJsData[gid].options.visual['SubTitle'] != 0 || cgJsData[gid].options.visual['ThirdTitle'] != 0))) {
                    cgShowObject.addClass('cg_show_info_bottom');
                    if(!cgJsData[gid].options.general.AllowComments){
                        cgShowObject.addClass('cg_no_comments');
                    }
                    if(WidthThumb<160){
                        cgShowObject.addClass('cg_show_info_bottom_small');
                    }else{
                        cgShowObject.removeClass('cg_show_info_bottom_small');
                    }
                    if(imgType=='con'){
                        cgShowObject.addClass('cg_show_info_bottom_con');
                    }
                }

                // have to be checked again here, might be switched from slider view to a gallery view
                if(cgJsData[gid].options.general.FullSizeImageOutGallery==1){
                    if(!cgJsData[gid].image[index][firstKey]['imageObject'].find('>a').length){
                        imageTarget = 'target="_blank"';
                        imageHref = imgSrcOriginal;
                        cgJsData[gid].image[index][firstKey]['imageObject'].find('figure').wrap( "<a class='"+cg_no_target_blank+"  cg_show_href_target_blank'  href='"+imageHref+"' "+imageTarget+"></a>" );
                    }

                }


                // thumb wird nicht verwendet, da thumb quadratisches abgeschnittenes bild ist und somot nicht passen könnte
                if(WidthThumbPic<=imgSrcMediumWidth){
                    imgSrc = imgSrcLarge;
                }
                else if(WidthThumbPic<=imgSrcLargeWidth){
                    imgSrc = imgSrcLarge;
                }
                else{
                    imgSrc = imgSrcOriginal;
                }

                /*                        var imageObjectUnvisible = false;
                                        if(typeof cgJsData[gid].imageObject[realId] != "undefined"){
                                            if(cgJsData[gid].imageObject[realId].is(':visible') == false){
                                                imageObjectUnvisible = true;
                                            }
                                        }*/

                if(cgJsClass.gallery.vars.hasToAppend==true || calledFromUpload===true){

                    if(sliderView==true){
                        cgShowObject.removeClass('cg_show_info_bottom cg_show_info_bottom_small');
                        cgShowObject.appendTo($mainCGslider);

                    }else{

                        cgShowObject.appendTo($mainCGallery);

                    }

                    cgShowObject.removeClass('hide');
                }


                if(cgJsData[gid].image[index][objectKey].rThumb=='270' || cgJsData[gid].image[index][objectKey].rThumb=='90'){
                    var $cgAppend = cgShowObject.find('.cg_append');
                    $cgAppend.css({
                        "border": "rgba"+rgba+" solid "+border+"px",
                        //        "background":'url("'+imgSrcLarge+'") no-repeat center center',// always image large to go sure when rotated!!! Otherwsise could be looking washed because low resolution.
                        'width': 66.66+'%',
                        // 'width': HeightThumb+'px',
                        //  'height': WidthThumb+3+'px',
                        'height': 150+'%'
                    });

                    if(isImageType){
                        cgJsClass.gallery.function.general.tools.appendImageOnLoadGallery(cgShowObject,$cgAppend,imgSrcLarge,realId,gid);
                    }

                }else{
                    var $cgAppend = cgShowObject.find('.cg_append');
                    $cgAppend.css({
                        "border": "rgba"+rgba+" solid "+border+"px",
                        //       "background":'url("'+imgSrc+'") no-repeat center center',
                        'width': 100+'%',
                        'height': 100+'%'
                        //'width': WidthThumb+'px',
                        //   'height': HeightThumb+'px'
                    });
                    if(isImageType){
                        cgJsClass.gallery.function.general.tools.appendImageOnLoadGallery(cgShowObject,$cgAppend,imgSrc,realId,gid);
                    }
                }


                if(cgJsData[gid].vars.info[realId] && cgJsData[gid].vars.modernHover){
                    if(cgJsData[gid].image[index][objectKey].rThumb=='270' || cgJsData[gid].image[index][objectKey].rThumb=='90'){
                        cgJsClass.gallery.function.general.tools.setHeightForInfoBlockInGallery(gid,cgJsData[gid].imageObject[realId].find('.cg_gallery_info_title'),cgJsData[gid].imageObject[realId],WidthThumbReal,HeightThumbReal,undefined,realId);
                    }else{
                        cgJsClass.gallery.function.general.tools.setHeightForInfoBlockInGallery(gid,cgJsData[gid].imageObject[realId].find('.cg_gallery_info_title'),cgJsData[gid].imageObject[realId],HeightThumbReal,WidthThumbReal,undefined,realId);
                    }
                }else if(!cgJsData[gid].vars.info[realId] && cgJsData[gid].vars.modernHover){
                    if(cgJsData[gid].image[index][objectKey].rThumb=='270' || cgJsData[gid].image[index][objectKey].rThumb=='90'){
                        cgJsClass.gallery.function.general.tools.checkIfSmallWidthImageObject(gid,cgJsData[gid].imageObject[realId],null,WidthThumbReal,HeightThumbReal);
                    }else{
                        cgJsClass.gallery.function.general.tools.checkIfSmallWidthImageObject(gid,cgJsData[gid].imageObject[realId],null,HeightThumbReal,WidthThumbReal);
                    }
                }

                cgShowObject.css({
                    //  'width': ''+WidthThumb+'px',
                    //  'height': ''+HeightThumb+'px',
                    'border': 'none'
                });

                cgShowObject.attr({
                    'data-cg-order': index
                });

            }


            // collectRealIdsLastRow
            if(cgShowObject.offset().top > offsetTopBefore){
                // reset here first because might be last row
                collectRealIdsLastRow = [];
                collectRealIdsLastRow.push(realId);
            }else{
                // set always collectRealIdsLastRow
                collectRealIdsLastRow.push(realId);
            }

            offsetTopBefore = cgShowObject.offset().top;
            //  offsetLeftBefore = cgShowObject.offset().left;

            // realIdBefore = realId;

            i++;

        });

        //  cgJsClass.gallery.function.general.tools.hideSkeletonLoader(gid,true);

        if(cgJsData[gid].vars.$cg_further_images_container_bottom){
            cgJsData[gid].vars.$cgVerticalSpaceCreatorThumbView = $('<div id="cgVerticalSpaceCreator'+gid+'" style="clear:both;display:block;height:'+DistancePicsV+'px;"></div>').insertBefore(cgJsData[gid].vars.$cg_further_images_container_bottom);
        }else{
            cgJsData[gid].vars.$cgVerticalSpaceCreatorThumbView = $('<div id="cgVerticalSpaceCreator'+gid+'" style="clear:both;display:block;height:'+DistancePicsV+'px;"></div>').insertAfter($mainCGallery);
        }

        // this.setDistanceTopRightTo0();

        console.log('collectRealIdsLastRow');
        console.log(collectRealIdsLastRow);

        var collectLastRow = function (){

            /*cgJsData[gid].imageObject[firstRealId].addClass('cg_margin_top_0');
               collectRealIdsForMarginTop0.forEach(function (realId){
                   cgJsData[gid].imageObject[realId].addClass('cg_margin_top_0');
               });*/

            // because of display flex in combination with flex basis all will be strechted to same size, so simply widthFirstImage can be taken then
            var widthFirstImage = cgJsData[gid].imageObject[firstRealId].width();

            // so no stretch last row images
            collectRealIdsLastRow.forEach(function (realId){
                if(collectRealIdsLastRow.length==cgJsData[gid].image.length){
                    cgJsData[gid].imageObject[realId].css('max-width',WidthThumb+'px');
                }else{
                    cgJsData[gid].imageObject[realId].css('max-width',widthFirstImage+'px');
                }
            });
            if(picsInRow > cgJsData[gid].image.length){
                if(xMulti1){
                    var factor = xMulti1;
                }else{
                    var factor = 1;
                }
            }else{
                var factor = widthFirstImage/WidthThumbReal;
            }

            var aggregateWidth = 0;

            $.each(cgJsData[gid].image, function( index,value ) {

                var firstKey = Object.keys(value)[0];
                var realId = cgJsData[gid].image[index][firstKey]['id'];
                var width = cgJsData[gid].imageObject[firstRealId].width();
                aggregateWidth = aggregateWidth+width;
                if(picsInRow > cgJsData[gid].image.length){
                    cgJsData[gid].imageObject[realId].height(HeightThumbReal*factor);
                    cgJsData[gid].imageObject[realId].css({
                        //          'width':WidthThumbReal*factor+'px',
                        //            'max-width':WidthThumbReal*factor+'px'
                    });// to go sure that always same width!!!!!
                }else{
                    cgJsData[gid].imageObject[realId].height(HeightThumbReal*factor);
                    cgJsData[gid].imageObject[realId].css({
                        //          'width':widthFirstImage,
                        //       'max-width':widthFirstImage
                    });// to go sure that always same width!!!!!
                }

                if(cgJsData[gid].image[(index+1)]){
                    var nextFirstKey = Object.keys(cgJsData[gid].image[(index+1)])[0];
                    var nextRealId = cgJsData[gid].image[(index+1)][nextFirstKey]['id'];
                    var nextWidth = cgJsData[gid].imageObject[nextRealId].width();
                    if(aggregateWidth+nextWidth>widthmainForCalculation){
                        cgJsData[gid].imageObject[realId].css({
                            'margin-right':'0'
                        });
                        aggregateWidth = 0;
                    }
                }

                /*                if(index+1 == cgJsData[gid].image.length){

                                }*/


            });

        }

        if(isFromResize){
            setTimeout(function (){

                collectLastRow();

            },10);
        }else{
            setTimeout(function (){

                collectLastRow();

            },10);
        }

        // has to be done after gallery load!
        cgJsData[gid].vars.mainCGallery.find('.cg_position_hr_1, .cg_position_hr_2, .cg_position_hr_3').remove();
        cgJsData[gid].vars.mainCGallery.find('.cg-slider-range-container').remove();

        if(sliderView==true){
            var $cgSliderRangeContainer = $( "<div id='cgSliderRangeContainer"+gid+"' class='cg-slider-range-container'><div id='cgSliderRange"+gid+"' class='cg-slider-range'></div></div>");
            var $cgSliderRange = $cgSliderRangeContainer.find('.cg-slider-range');

            if(cgJsData[gid].options.visual['SliderThumbNav']!=1){
                $cgSliderRangeContainer.addClass('cg_hide_slider');
            }

            var countImages = Object.keys(cgJsData[gid].image).length;

            cgJsData[gid].vars.cgSliderRange = $cgSliderRange;
            if(countImages>=maximumVisibleImagesInSlider){
                var widthSliderHandlePercentage = maximumVisibleImagesInSlider*100/countImages;
            }else{
                widthSliderHandlePercentage = 100;
            }

            if(countImages<=maximumVisibleImagesInSlider){
                $cgSliderRangeContainer.addClass('cg_hidden');
            }else{
                $cgSliderRangeContainer.removeClass('cg_hidden');
            }

            if(widthSliderHandlePercentage!=100){
                var widthSliderHandle = Math.floor(widthmainForCalculation/100*widthSliderHandlePercentage);
            }else{
                widthSliderHandle=0;
            }

            if(widthSliderHandle<13 && widthSliderHandlePercentage!=100){
                widthSliderHandle = 13;
            }

            /*            $cgSliderRangeContainer.css({
                            'width': (widthmainForCalculation-2)+'px',
                        });*/

            $cgSliderRangeContainer.insertAfter($mainCGslider);

            cgJsData[gid].vars.cgSliderRangeContainer = $cgSliderRangeContainer;

            $cgSliderRange.slider({
                value: 0,
                step: 1,
                max: Object.keys(cgJsData[gid].image).length-1,
                stop: function( event, ui ) {
                    /*                  $(ui.handle).removeClass('ui-state-focus');
                                        $(ui.handle).removeClass('ui-corner-all');
                                        $(ui.handle).removeClass('ui-state-hover');
                                        $(ui.handle).removeClass('ui-state-default');*/
                },
                start: function( event, ui ) {
                    /*                    $(ui.handle).removeClass('ui-state-focus');
                                        $(ui.handle).removeClass('ui-corner-all');
                                        $(ui.handle).removeClass('ui-state-hover');
                                        $(ui.handle).removeClass('ui-state-default');*/
                },
                slide: function( event, ui ) {
                    cgJsClass.gallery.views.functions.appendAndRemoveImagesInSlider(gid,ui.value,maximumVisibleImagesInSlider,$mainCGslider,true);
                }
            });

            // to stabilize for eventually resize
            cgJsData[gid].vars.mainCGdiv.width(cgJsData[gid].vars.mainCGdiv.width());

            //   var marginLeftHandle = widthSliderHandle/2;
            var cgSliderRangeWidth = widthmainForCalculation-widthSliderHandle;

            //  $cgSliderRange.css('width',cgSliderRangeWidth+'px');
            $cgSliderRange.find('.ui-slider-handle').css({
                //   'width':widthSliderHandle+'px',
                //         'margin-left':'-'+marginLeftHandle+'px'
            });

            // then no need that slider will be moved!
            if(Object.keys(cgJsData[gid].image).length<=cgJsData[gid].vars.maximumVisibleImagesInSlider){
                //$cgSliderRange.find('.ui-slider-handle').addClass('cg_no_border');
                $cgSliderRangeContainer.addClass('cg_hide');
            }
            /*
                        if(Object.keys(cgJsData[gid].image).length<=cgJsData[gid].vars.maximumVisibleImagesInSlider && cgJsData[gid].vars.centerWhite){
                            $cgSliderRangeContainer.addClass('cg_hide');
                        }*/

            if(cgJsData[gid].vars.openedRealId){// openPage or FullWindow for example, load the images that it can be clicked later
                var order = cgJsClass.gallery.function.general.tools.getOrderByGidAndRealId(gid,cgJsData[gid].vars.openedRealId);
                cgJsClass.gallery.views.functions.appendAndRemoveImagesInSlider(gid,order,maximumVisibleImagesInSlider,$mainCGslider);
            }

        }

        cgJsClass.gallery.vars.switchViewsClicked=false;

        if(sliderView==true){

            $mainCGslider.removeClass('cg_hide');

            if(!cgJsData[gid].vars.centerWhite){
                $mainCGdiv.find('#cgSliderRangeContainer'+gid).removeClass('cg_hide');
            }

            $mainCGdiv.find('.cg_gallery_thumbs_control .cg_view_switcher').addClass('cg_disabled');

        }


        if((openPage==true || viewChange==true) && cgJsClass.gallery.vars.fullwindow==false){

            //   if(appendNew){
            setTimeout(function () {
                $mainCGallery.css('visibility','visible').addClass('cg_fade_in_new cg_animation').removeClass('cg_hidden');
            },100);
            // }

        }else{

        }
        if(sliderView==false){
            setTimeout(function () {
                $mainCGallery.css('visibility','visible').addClass('cg_fade_in cg_animation').removeClass('cg_hidden');
            },1);
        }

        if(sliderView==false){
            // before returns kommen muss es ausgeführt werden!
            //$mainCGdiv.find('.cg-lds-dual-ring-div-gallery-hide-mainCGallery').addClass('cg_hide');
            //cgJsClass.gallery.function.general.tools.checkSkeletonLoaderToShow(gid);
            $mainCGallery.removeClass('cg_hide').addClass('cg_fade_in');
        }

        cgJsData[gid].vars.cgCenterDivAppearenceHelper.addClass('cg_hide');// has to be removed in all cases

        if(cgJsData[gid].options.general.FullSizeImageOutGallery==1 && !sliderView){
            return;
        }

        if(cgJsData[gid].options.general.OnlyGalleryView==1 && !sliderView){
            return;
        }

        if(sliderView==true && openPage!=true){

            if(cgJsData[gid].vars.openedRealId >= 1 && randomButtonClicked!=true){
                setTimeout(function () {

                    //$mainCGdiv.find('.cg-lds-dual-ring-div-gallery-hide-mainCGallery').addClass('cg_hide');
                    //cgJsClass.gallery.function.general.tools.checkSkeletonLoaderToShow(gid);
                    $mainCGallery.css('visibility','visible').removeClass('cg_hidden');
                    $mainCGallery.removeClass('cg_hide').addClass('cg_fade_in');
                    if(!isCopyUploadToAnotherGallery && !isFromFullWindowSliderOrBlogView){
                        $mainCGslider.find('#cg_append'+cgJsData[gid].vars.openedRealId).addClass('cg_open_gallery_slider_look').click();
                    }

                    if(cgJsClass.gallery.vars.fullwindow){
                        cgJsData[gid].vars.mainCGdivFullWindowConfigurationArea.removeClass('cg_hidden');
                    }

                },200);
            }else{

                //$mainCGdiv.find('.cg-lds-dual-ring-div-gallery-hide-mainCGallery').addClass('cg_hide');
                //cgJsClass.gallery.function.general.tools.checkSkeletonLoaderToShow(gid);
                $mainCGallery.removeClass('cg_hide').addClass('cg_fade_in');

                if(!isCopyUploadToAnotherGallery && !isFromFullWindowSliderOrBlogView){
                    $mainCGslider.find('.cg_show:first-child .cg_append').addClass('cg_open_gallery_slider_look').click();
                }


            }

            return;

        }
        else if(sliderView==true && openPage==true){

            if(openPage==true){
                //     setTimeout(function () {

                if(!cgJsData[gid].vars.closeEventInitWithDataCGrealIdCloseButton){
                    //$mainCGdiv.find('.cg-lds-dual-ring-div-gallery-hide-mainCGallery').addClass('cg_hide');
                    //cgJsClass.gallery.function.general.tools.checkSkeletonLoaderToShow(gid);
                }

                if(sliderView && calledFromUpload){
                    // do not remove cg_hide
                    $mainCGallery.addClass('cg_hide cg_called_from_upload');
                }else{
                    $mainCGallery.removeClass('cg_hide').addClass('cg_fade_in');
                }

                var $imageToClick;

                if(cgJsData[gid].vars.openedRealId < 1){
                    $imageToClick = $mainCGslider.find('.cg_show:first-child .cg_append').addClass('cg_open_gallery_slider_look');
                }
                if(cgJsData[gid].vars.openedRealId >= 1){
                    $imageToClick = $mainCGslider.find('#cg_append'+cgJsData[gid].vars.openedRealId).addClass('cg_open_gallery');
                }

                $mainCGallery.addClass('cg_hide cg_called_from_upload');
                if(!cgJsData[gid].vars.isRemoveImageSliderViewCheck){
                    if(!isCopyUploadToAnotherGallery && !isFromFullWindowSliderOrBlogView){
                        if($imageToClick){
                            setTimeout(function (){
                                $imageToClick.click();
                            },10);
                        }else{// happens when really fast clicking through views and slider and then closing from full window
                            $imageToClick = $mainCGslider.find('.cg_show:first-child .cg_append').addClass('cg_open_gallery_slider_look');
                            $imageToClick.click();
                        }
                    }
                }else{

                    if(!isCopyUploadToAnotherGallery && !isFromFullWindowSliderOrBlogView){
                        if($imageToClick){
                            // have to be done two times image image was deleted
                            $imageToClick.click();
                            $imageToClick.click();
                        }else{// happens when really fast clicking through views and slider and then closing from full window
                            $imageToClick = $mainCGslider.find('.cg_show:first-child .cg_append').addClass('cg_open_gallery_slider_look');
                            $imageToClick.click();
                            $imageToClick.click();
                        }
                    }

                    cgJsData[gid].vars.isRemoveImageSliderViewCheck = false;

                    if(Object.keys(cgJsData[gid].vars.rawData).length>=1){
                        jQuery($mainCGslider).removeClass('cg_hide');
                    }

                }


                //     },500);
            }else{

                //$mainCGdiv.find('.cg-lds-dual-ring-div-gallery-hide-mainCGallery').addClass('cg_hide');
                //cgJsClass.gallery.function.general.tools.checkSkeletonLoaderToShow(gid);

                $mainCGallery.removeClass('cg_hide').addClass('cg_fade_in');

                if(!isCopyUploadToAnotherGallery && !isFromFullWindowSliderOrBlogView){
                    $mainCGslider.find('.cg_show:first-child .cg_append').click();
                }


            }
            return;

        }

        //    cgJsClass.gallery.resize.resizeInfo(gid,openPage);

        if((openPage==true || viewChange==true) && sliderView==false){
            //   if(appendNew){
            setTimeout(function () {

                $mainCGallery.css('visibility','visible').removeClass('cg_hidden');

                if(!isCopyUploadToAnotherGallery){

                    if(cgJsData[gid].vars.openedRealId >= 1 && !isFromFullWindowSliderOrBlogView){
                        setTimeout(function () {

                            if(cgJsData[gid].options.general.FullSizeImageOutGallery==1 || cgJsData[gid].options.general.OnlyGalleryView==1){
                                $mainCGallery.find('#cg_append'+cgJsData[gid].vars.openedRealId).get(0).scrollIntoView();
                            }else{
                                if(openPage==true){
                                    if(cgJsData[gid].options.visual.ForwardToWpPageEntry==1 && calledFromUpload){return;}
                                    $mainCGallery.find('#cg_append'+cgJsData[gid].vars.openedRealId).addClass('cg_open_gallery').click();
                                }else{
                                    if(cgJsData[gid].options.visual.ForwardToWpPageEntry==1 && calledFromUpload){return;}
                                    $mainCGallery.find('#cg_append'+cgJsData[gid].vars.openedRealId).click();
                                }
                            }
                        },600);// because of fade in
                    }

                }

            },100);

            // }
        }else{

            $mainCGallery.removeClass('cg_fade_in');// remove class for smooth behaviour when single image view it might be set again
            setTimeout(function () {

                $mainCGallery.css('visibility','visible').removeClass('cg_hidden');

                if(cgJsData[gid].vars.openedRealId >= 1 && cgJsData[gid].options.pro.SliderFullWindow!=1){
                    $mainCGallery.addClass('cg_fade_in');

                    setTimeout(function () {

                        if(!isCopyUploadToAnotherGallery && !isFromFullWindowSliderOrBlogView && !calledFromUpload){

                            if(cgJsData[gid].options.general.FullSizeImageOutGallery==1 || cgJsData[gid].options.general.OnlyGalleryView==1){
                                $mainCGallery.find('#cg_append'+cgJsData[gid].vars.openedRealId).get(0).scrollIntoView();
                            }else{
                                if(cgJsData[gid].options.visual.ForwardToWpPageEntry==1 && calledFromUpload){return;}
                                $mainCGallery.find('#cg_append'+cgJsData[gid].vars.openedRealId).click();
                            }

                        }

                        cgJsData[gid].vars.mainCGdiv.find('.cg_header').removeClass('cg_pointer_events_none');
                        cgJsData[gid].vars.mainCGdiv.find('.cg_further_images_container').removeClass('cg_pointer_events_none');
                    },600);// because of fade in
                }

            },100);

        }


    },
    setDistanceTopRightTo0: function (){

    }
};
