cgJsClass.gallery.heightLogic = {
    init: function (jQuery,gid,openPage,calledFromUpload,openImage,stepChange,viewChange,randomButtonClicked,isCopyUploadToAnotherGallery,isFromResize,isFromFullWindowSliderOrBlogView) {
        // gallery index
        var gid = gid;

        //!IMPORTANT current view look for resize
        cgJsData[gid].vars.currentLook='height';

        if(cgJsData[gid].image.length<1){
            return;
        }

        var $ = jQuery;

        var HeightLookHeight = parseInt(cgJsData[gid].options.general.HeightLookHeight);

        cgJsData[gid].vars.cgLdsDualRingCGcenterDivHide.addClass('cg_hide');// might be visible from blog view when scrolling top and closing fast

        // Neue Höhe
        var newHeight = 0;

        var $mainCGallery = cgJsData[gid].vars.mainCGallery;
        var $mainCGslider = cgJsData[gid].vars.mainCGallery.find('#mainCGslider'+gid);
        var $mainCGdiv = cgJsData[gid].vars.mainCGdiv;

        $mainCGallery.removeClass('cg_blog cg_slider');
        $mainCGallery.addClass('cg_height_view');
        $mainCGallery.removeClass('cg_thumb_view');

        var cg_horizontalSpace = parseInt(cgJsData[gid].options.visual.HeightViewSpaceWidth);
        var cg_verticalSpace = parseInt(cgJsData[gid].options.visual.HeightViewSpaceHeight);

        cgJsData[gid].vars.mainCGdiv.css('width','100%');

        if(cgJsClass.gallery.vars.fullwindow==gid){
            // -40 wegen padding 20 rechts links und 15 wege scroll bar die beim parent hinzugefügt wird
            // var widthMainCGallery = $(window).width()-55;
            var widthMainCGallery = $(window).width()-cgJsClass.gallery.function.general.tools.getScrollbarWidthDependsOnBrowser();
        }else{
            var widthMainCGallery = cgJsData[gid].vars.mainCGdivContainer.width();
        }

        if(widthMainCGallery<247){
            widthMainCGallery = 247;
        }

        cgJsData[gid].vars.$cgVerticalSpaceCreatorThumbView = null;

        // Breite des divs in dem sich die Galerie befindet
        var widthmain = widthMainCGallery;
        var widthmainForCalculation = widthmain - parseInt($mainCGallery.css('padding-left')) - parseInt($mainCGallery.css('padding-right'));
        cgJsData[gid].vars.widthmainForCalculation = widthmainForCalculation;

        cgJsClass.gallery.views.functions.destroyRangeSlider(gid);

        // die einzelnen neu ermittelten Breiten die durch die vorgegebene Höhe entstehen werden gesammelt
        var widthArray = [];

        // die einzelnen Höhen sollen gesammelt werden. Bei Runter- und Hochskaliertung, ist es eine notwendige Angabe im Div
        var heightArray = [];

        // Die Breite der Inhaltsboxen wird ermittelt
        var widthDivArray = [];

        // Sammeln der ursprünglichen Höhe
        var realHeightArray = [];

        // Sammeln der ursprünglichen Breite
        var realWidthArray = [];

        // Anzahl der Durchläufe muss gezählt werden um den letzten Durchlauf zu ermitteln
        var last = [];

        // Anzahl der hochgeladenen Bilder
        var n = Object.keys(cgJsData[gid].image).length;

        var opacity = parseInt(cgJsData[gid].options.visual.HeightViewBorderOpacity);

        var borderColor = cgJsData[gid].options.visual.HeightViewBorderColor;

        var border = 0;

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


        if(cgJsData[gid].options.visual.HeightViewBorderRadius>5){var cg_CircleImages=1;}
        else{var cg_CircleImages=0;}

        // Hier müssen die VAR neue gesetzt werden!!! Später immer ohne VAR!
        // Wenn horizontal space nicht an ist, dann wird Border immer nur rechts hinzugefügt. Beim ersten Mal sollte border einmal links hinzugefügt werden.
        // ACHTUNG!!! Bei height view, nur wenn kein Circle Image gesetzt ist und horizantol Border 0 ist,
        // wird am Anfang ein border gesetzt als width und dann später nur ein border rechts immer dazu addiert.
        // Ansonsten wird kein Border gesetzt. Sondern danach immer rechts und links border dazu addiert.
        if(cg_horizontalSpace==0 && cg_CircleImages==0){
            var aggregateWidth = border;
        }
        // Wenn horizontal space an ist, dann soll border immer rechts und links dazu adiert werden, wegen den Abständen.
        // Beim ersten Mal muss nichts hinzugefügt werden. Da beim ersten Bild rechts und links border hinzugefügt wird.
        else{
            var aggregateWidth = 0;
        }

        // Summer der Gesamtlänge, um die alle Bilder, die in die Gesamtbreite reinpassen, insgesamt reduziert werden können.
        // Mehr als 46% kann von einem Bild nicht abgezogen werden ( zuerst 10% Höhe, danach 20% Links, 20% Rechts >>>  46% prozent insgesamt als Reduzierung bei einem Bild möglich )
        var aggregateAcceptableReducedSize = 0;

        // Orientierungsvariable bei Durcharbeiten des großen Arrays
        var r = 0;

        // Orientierungsvariable wenn width und widthDiv berechnet wurden
        var widthDone = 0;

        // Gesamtzahl der verarbeiteten Bilder
        var countRowPics = 1;

        // 1. Die neue Höhe jedes einzelnen Bildes muss ermittelt werden. Diese wird in einem Array gesammelt.

        //$mainCGdiv.css('width',widthmain+'px');
        //$mainCGallery.css('width',widthmain+cg_horizontalSpace+'px');

        $mainCGallery.removeClass('cg_fade_in_new');

        //cgJsData[gid].vars.cgCenterDiv.css('width',widthmain+'px');

        cgJsData[gid].vars.widthmain = widthmain;

        $mainCGallery.removeClass('cg_thumb_view');

        cgJsClass.gallery.views.functions.checkAndAppendFromSliderToGallery($mainCGallery,$mainCGslider);

        if(openPage==true || viewChange==true){
            $mainCGallery.removeClass('cg_fade_in_new').addClass('cg_hidden');
        }

        // manchmal wird width nicht gesetzt, deswegen sicherheithalber nochmal setzen
        if(openPage === true){
/*            if($mainCGdiv.css('width')!=true){
                $mainCGallery.css('visibility','hidden');
                setTimeout(function () {
                    //$mainCGdiv.css('width',cgJsData[gid].vars.widthmain+'px');
                    setTimeout(function () {
              //          $mainCGallery.css('visibility','visible').addClass('cg_fade_in_new');
                    },100);
                },100);
            }*/
        }else{
            $mainCGallery.addClass('cg_hidden');
            $mainCGallery.removeClass('cg_fade_in');
            $mainCGallery.css('visibility','visible');
        }

        $mainCGallery.find('#cgVerticalSpaceCreator'+gid).remove();

        // needs only for row logic!!!!
        cgJsClass.gallery.resize.galleryIcons($mainCGallery,openPage,true,gid,widthmain);

        var realIdBefore;
        var offsetNow;
        var offsetTopBefore;
        var offsetLeftBefore;
        var offsetNowNew = false;
        var collectRealIdsLastRow = [];
        var collectRealIdsForMarginTop0 = [];
        var collectRealIdsForMarginRight0 = [];

        var lengthCgJsDataGidImage = Object.keys(cgJsData[gid].image).length;

        //   console.log(widthmain);
       // console.log(widthmainForCalculation);

        var overhang = 0;
        var overhangInPercent = 0;
        var wholePercent = 0;

        $.each(cgJsData[gid].image, function( index,value ) {

            var firstKey = Object.keys(value)[0];

            var objectKey = firstKey;

            var categoryId = cgJsData[gid].image[index][firstKey]['Category'];

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

            if(typeof cgJsData[gid].vars.categories[categoryId] != 'undefined'){
                if(cgJsData[gid].vars.showCategories == true && cgJsData[gid].vars.categories[categoryId]['Checked']==false){
                    return;
                }
            }

            // Die original Image Größen werden ermittelt über die hidden Felder. Die beim ersten Load von php ermittelt wurden.

           var cgRotationThumbNumber = parseInt(cgJsData[gid].image[index][objectKey].rThumb);
            var width = parseInt(cgJsData[gid].image[index][objectKey].Width);
            var height = parseInt(cgJsData[gid].image[index][objectKey].Height);

            if(cgRotationThumbNumber=='90' || cgRotationThumbNumber=='270'){
                width = parseInt(cgJsData[gid].image[index][objectKey].Height);
                height = parseInt(cgJsData[gid].image[index][objectKey].Width);
            }

            realHeightArray.push(height);
            realWidthArray.push(width);

            var isAlternativeFileType = cgJsClass.gallery.function.general.tools.isAlternativeFileType(gid,realId);
            var imgType = cgJsData[gid].vars.rawData[realId].ImgType;

            if(isAlternativeFileType || imgType == 'con'){
                var width = HeightLookHeight*1.5;// if 200 height, then 300 width and so on
                var height = HeightLookHeight;
                var newWidth = width*HeightLookHeight/height;
            }else{
                var newWidth = (width*HeightLookHeight/height);
            }

            // die einzelnen neu ermittelten Breiten die durch die vorgegebene Höhe entstehen werden gesammelt
            widthArray.push(newWidth);
            heightArray.push(HeightLookHeight);
            widthDivArray.push(newWidth);

            // Wenn horizontal space nicht an ist, dann wird Border immer nur rechts hinzugefügt
            widthDone = 0;
            aggregateWidth = aggregateWidth + newWidth +cg_horizontalSpace;//ACHTUNG!!! Horizontal Space wird zum schluss der Schleife immer hinzugefügt. Dadurch wird beim letzten Element horizontalSpace nicht unnötig hinzuaddiert!

/*            console.log(r);
            console.log(newWidth);*/
            //debugger

            if(realId==78){
                //debugger
            }

            // Wenn es der letzte Durchlauf ist und die gesammelte Breite unter 90% der Gesamtbreite ergibt dann wird nichts gemacht
            if (aggregateWidth < widthmainForCalculation/100*90 && cgJsData[gid].image.length == r) {

/*                console.log(r);
                console.log(newWidth);*/
                //debugger

                countRowPics=1;

                last[r] = 'on';

            }
            // Wenn die gesammelte Breite über 90% der Gesamtbreite ergibt, dann wird hochskaliert. Die Höhe bleibt die vorgegebene Höhe
            else if (aggregateWidth >= widthmainForCalculation/100*90 && aggregateWidth <= widthmainForCalculation) {

/*                console.log(r);
                console.log(newWidth);*/
                //debugger
                newWidth = newWidth + (widthmainForCalculation - aggregateWidth);
                widthArray[r] = newWidth;
                widthDivArray[r] = newWidth;

                aggregateWidth = 0;

                widthDone = 1;

                last[r] = 'on';

                countRowPics=1;


            }
            // Wenn die gesammelte Breite größer als die Gesamtbreit ist, dann wird runterskaliert oder abgeschnitten
            else if(aggregateWidth > widthmainForCalculation){

/*                console.log(r);
                console.log(newWidth);*/
                //debugger
                overhang = aggregateWidth - widthmainForCalculation;

                overhangInPercent = overhang*100/widthmainForCalculation;

                // Wenn der Überhang nur unter 10% ist dann werden die Bilder NUR runterskaliert auf 100% (man kann auch hochskalieren, glaubenssache :))
                if (overhangInPercent <= 10) {
/*                    console.log(r);
                    console.log(newWidth);*/
                    //debugger
                    wholePercent=100+overhangInPercent;
                    for (i = 1; i <= countRowPics; i++) {//-1 because of array
                        newWidth = widthArray[(r-countRowPics+i)]/wholePercent*100;
                        newHeight = heightArray[(r-countRowPics+i)]/wholePercent*100;
                        widthArray[(r-countRowPics+i)] = newWidth;
                        heightArray[(r-countRowPics+i)] = newHeight;
                        widthDivArray[(r-countRowPics+i)] = newWidth;
                    }

                } // Wenn der Überhang nur über 10% und unter 46% ist dann werden die Bilder abgeschnitten und runterskaliert
                if (overhangInPercent > 10 && overhangInPercent <=46) {
/*                    console.log(r);
                    console.log(newWidth);*/
                    //debugger
                    wholePercent=100+overhangInPercent;
                    for (i = 1; i <= countRowPics; i++) {//-1 because of array
                        newWidth = widthArray[(r-countRowPics+i)]/wholePercent*100;
                        newHeight = heightArray[(r-countRowPics+i)]/wholePercent*100;
                        widthArray[(r-countRowPics+i)] = newWidth;
                        heightArray[(r-countRowPics+i)] = newHeight;
                        widthDivArray[(r-countRowPics+i)] = newWidth;
                    }

                }// Wenn der Überhang über 46% ist dann werden die Bilder abgeschnitten und runterskaliert. Beim letzten in der Reihe wird alles was über 46% ist komplett abgeschnitten.
                // Update 17.12.2022, wird nicht mehr so gemacht, generell gleiche logik überall (mit wholePercent) so wie aussieht am besten vorerst
                if (overhangInPercent > 46) {
/*                    console.log(r);
                    console.log(newWidth);*/
                    //debugger
                    wholePercent=100+overhangInPercent;
                    for (i = 1; i <= countRowPics; i++) {//-1 because of array
                        newWidth = widthArray[(r-countRowPics+i)]/wholePercent*100;
                        newHeight = heightArray[(r-countRowPics+i)]/wholePercent*100;
                        widthArray[(r-countRowPics+i)] = newWidth;
                        heightArray[(r-countRowPics+i)] = newHeight;
                        widthDivArray[(r-countRowPics+i)] = newWidth;
                        //widthDivArray[(r-countRowPics+i)] = widthDivArray[(r-countRowPics+i)]/100*(100-46);
                    }


                }

                // Gesammelte Breite wieder zurück auf Null setzen
                if(cg_horizontalSpace==0){
                    aggregateWidth = border;
                }
                else{
                    aggregateWidth = 0;
                }

                widthDone = 1;
                countRowPics=1;
                last[r] = 'on';

            }else{
                countRowPics++;
            }

/*            console.log(r);
            console.log(newWidth);
            //debugger*/

            r++;

        });

/*        console.log('heightArray');
        console.log(heightArray);
//debugger
        console.log('widthArray');
        console.log(widthArray);

        console.log('widthDivArray');
        console.log(widthDivArray);*/


        // var h = 0;
        var i = 0;
        var r = 0;



        // Hier müssen die VAR neue gesetzt werden!!! Später immer ohne VAR!
        // Gesammelte Breite wieder zurück auf Null setzen
        // ACHTUNG!!! Bei height view, nur wenn kein Circle Image gesetzt ist und horizantol Border 0 ist,
        // wird am Anfang ein border gesetzt als width und dann später nur ein border rechts immer dazu addiert.
        // Ansonsten wird kein Border gesetzt. Sondern danach immer rechts und links border dazu addiert.
        if(cg_horizontalSpace==0 && cg_CircleImages==0){
            var aggregateWidth = border;
        }
        else{
            var aggregateWidth = 0;
        }


        // var checkAggregateWidth = border;

        var firstRow = 0;

        // Zur Ermittlung des Abstandes zum Rand des HTMLs für Pagination
        var cg_imgOffsetHTML = 0;

        // Sobald cg_pagination 1 erreicht hat, dann loading gif anzeigen und nicht mehr laden, bis weiter gescrollt wird
        var cg_pagination = 0;

        // Wie viele Rows wurden verarbeitet
        var rowsDone = 0;

        // Ermittlung der Durchgänge in einer Reihe
        var rInRow = 0;

        // console.log('second_show');

        var classCounter = 0;

        var firstRealId;

        //   console.log('widthArray');
     //   console.log(widthArray);
      //  $( ".cg_show" ).each(function( i ) {
        $.each(cgJsData[gid].image, function( index,value ) {

            var arrIndex = index;

            var firstKey = Object.keys(value)[0];

            //  var objectKey = Object.keys(firstKey)[0];
            var objectKey = firstKey;
            // var objectKey = value[firstKey]['rowid'];

            var categoryId = cgJsData[gid].image[index][firstKey]['Category'];

            if(typeof cgJsData[gid].vars.categories[categoryId] != 'undefined'){

                if(cgJsData[gid].vars.showCategories == true && cgJsData[gid].vars.categories[categoryId]['Checked']==false){

                    //cgJsData[gid].image[index][firstKey]['imageObject'].remove();

                    return;

                }

            }

            classCounter++;

            i=r;

            // console.log(i);

            rInRow++;

            var cgImageThumbRotation = "cg"+cgJsData[gid].image[index][objectKey].rThumb+"degree";

            var realId = cgJsData[gid].image[index][firstKey]['id'];

            if(!firstRealId){
                firstRealId=realId;
            }

            // thumb wird nicht verwendet, da thumb quadratisches abgeschnittenes bild ist und somot nicht passen könnte
            //var imgSrcMedium = cgJsClass.gallery.function.general.tools.checkSsl(cgJsData[gid].vars.rawData[realId].medium);
            // thumbnail_size_w, medium_size_w and large_size_w calculation will be done in init-gallery-getjson imageDataPreProcess with calculateSizeImageDataPreProcess function
            var imgSrcMediumWidth = parseInt(cgJsClass.gallery.vars.medium_size_w);
            var imgSrcLarge = cgJsClass.gallery.function.general.tools.checkSsl(cgJsData[gid].vars.rawData[realId].large);
            var imgType = cgJsData[gid].vars.rawData[realId].ImgType;
            // thumbnail_size_w, medium_size_w and large_size_w calculation will be done in init-gallery-getjson imageDataPreProcess with calculateSizeImageDataPreProcess function
            var imgSrcLargeWidth = parseInt(cgJsClass.gallery.vars.large_size_w);
            var imgSrcOriginal = cgJsClass.gallery.function.general.tools.checkSsl(cgJsData[gid].vars.rawData[realId].full);

            var imgSrc = imgSrcLarge;

            var cg_Use_as_URL = cgJsData[gid].vars.formHasUrlField;
            var cg_ForwardToURL = cgJsData[gid].options.general.ForwardToURL;
            var cg_ForwardType = cgJsData[gid].options.general.ForwardType;
            var cg_ForwardFrom = cgJsData[gid].options.general.ForwardFrom;
            var cg_FullSizeImageOutGalleryNewTab = cgJsData[gid].options.general.FullSizeImageOutGalleryNewTab;
            var cg_FullSizeImageOutGallery = cgJsData[gid].options.general.FullSizeImageOutGallery;

            if(realId==78){
                //debugger
            }

            var isAlternativeFileType = cgJsClass.gallery.function.general.tools.isAlternativeFileType(gid,realId);

                var realId = cgJsData[gid].image[index][firstKey]['id'];

                var imgDataWidth = parseInt(cgJsData[gid].vars.rawData[realId].Width);

                // if(typeof cgJsData[gid].image[index][firstKey]['imageObject'] === "undefined") {
                if(typeof cgJsData[gid].imageObject[realId]  === "undefined" || cgJsData[gid].imageObject[realId].isAdditionalFileChanged) {

             //       var imageTitle = cgJsData[gid].image[index][firstKey]['post_title'];

            //        var imageTarget = '';

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

                    var cgShowObject = $("<div data-cg-cat-id='"+categoryId+"' data-cg-id='"+realId+"' data-cg-gid='"+gid+"' data-cg-order='"+index+"' class='cg_show cg-cat-"+categoryId+"' id='cg_show"+realId+"'>");

                    if(cgJsData[gid].vars.rawData[realId].ImgType=='con'){
                        cgShowObject.addClass('cg_show_con_entry');
                    }

                    if(cgJsData[gid].vars.rawData[realId].MultipleFilesParsed){
                        var furtherFilesCount = Object.keys(cgJsData[gid].vars.rawData[realId].MultipleFilesParsed).length-1;
                        cgShowObject.prepend('<div class="cg_multiple_files_prev"></div><div class="cg_multiple_files">+'+furtherFilesCount+'</div>');
                    }

                }else{
                    // Pauschal blink class cg_blink_image_disappear entfernen
                 //   var cgShowObject = cgJsData[gid].image[index][firstKey]['imageObject'].removeClass('cg_hide').removeClass('cg_blink_image_disappear').removeClass('cg_fade_in');
                    var cgShowObject = cgJsData[gid].imageObject[realId] .removeClass('cg_hide').removeClass('cg_blink_image_disappear').removeClass('cg_fade_in');
                    cgJsData[gid].image[index][firstKey]['imageObject'] = cgJsData[gid].imageObject[realId];
                }

                if(cgJsClass.gallery.vars.switchViewsClicked==true){
                    cgShowObject.removeAttr('style width height');
                    if(isAlternativeFileType!='video'){
                    cgShowObject.find('.cg_append').removeAttr('style width height');
                    }
                    // cgShowObject.find('.cg_append_image').removeAttr('style width height');
                }

                var cg_a_href_title = '';

                // width für Bilder array
                var width = Math.floor(widthArray[i]);


                // width für div array
                var height = Math.floor(heightArray[i])-3;


                var cgRotationThumbNumber = parseInt(cgJsData[gid].image[index][objectKey].rThumb);

                var cgRotateRatio = 1;

                var widthOriginalImg = cgJsData[gid].image[index][objectKey].Width;
                var heightOriginalImg = cgJsData[gid].image[index][objectKey].Height;

                var widthDiv = Math.floor(widthDivArray[i]);


                if(realId==78){
                    //debugger
                }


                // Perfekte Anpassung letztes Bild der Zeile
                if (last[r] == 'on'){
                    // Wenn horizontal Space nicht an ist, wird Border nur einmal von einer Seite abgezogen (später im CSS kommt wird es rechts hinzuaddiert)
                    // ACHTUNG!!! Bei height view, nur wenn kein Circle Image gesetzt ist und horizantol Border 0 ist,
                    // wird am Anfang ein border gesetzt als width und dann später nur ein border rechts immer dazu addiert.
                    // Ansonsten wird kein Border gesetzt. Sondern danach immer rechts und links border dazu addiert.
/*                    if(cg_horizontalSpace==0 && cg_CircleImages==0){
                        widthDiv = widthmainForCalculation - aggregateWidth;
                    }
                    // Wenn horizontal Space an ist, dann wird Border von einer und anderen Seite abgezogen (später im CSS kommt wird es rechts und links hinzuaddiert)
                    else{
                        widthDiv = widthmainForCalculation - aggregateWidth;
                    }

                    if(width<widthDiv){ width = widthDiv;}*/

                    // So wie als ob oben vor dem ersten Durchlauf
                    // Gesammelte Breite wieder zurück auf Null setzen
                    // ACHTUNG!!! Bei height view, nur wenn kein Circle Image gesetzt ist und horizantol Border 0 ist,
                    // wird am Anfang ein border gesetzt als width und dann später nur ein border rechts immer dazu addiert.
                    // Ansonsten wird kein Border gesetzt. Sondern danach immer rechts und links border dazu addiert.
                    if(cg_horizontalSpace==0 && cg_CircleImages==0){
                        aggregateWidth = border;
                    }
                    else{
                        aggregateWidth = 0;
                    }

                }

                else{
                    // ACHTUNG!!! Bei height view, nur wenn kein Circle Image gesetzt ist und horizantol Border 0 ist,
                    // wird am Anfang ein border gesetzt als width und dann später nur ein border rechts immer dazu addiert.
                    // Ansonsten wird kein Border gesetzt. Sondern danach immer rechts und links border dazu addiert.
                    if(cg_horizontalSpace==0 && cg_CircleImages==0){
                        aggregateWidth = aggregateWidth + widthDiv + border;
                    }
                    // Wenn horizontal space an ist, dann soll border immer rechts und links dazu adiert werden, wegen den Abständen.
                    else{
                        aggregateWidth = aggregateWidth + widthDiv + border*2 + cg_horizontalSpace;
                    }

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
                var marginRight = cg_horizontalSpace;
                if (last[r] == 'on'){
                    if(cg_horizontalSpace>=1){
                        marginRight = "-"+cg_horizontalSpace;
                    }else if(cg_horizontalSpace==0){
                        marginRight = "-2";
                    }
                }

                cgShowObject.css({
                    'border':'none',
                    'margin':'unset',
                    'width': widthDiv,
                    'height': height,
                    'margin-right': marginRight+'px',
                    'float':'left',
                    'display':'inline'
                });

                if(cg_CircleImages==1){cgShowObject.css({"border-radius": ""+cgJsData[gid].options.visual.HeightViewBorderRadius+"%"});
               // var circleImagesOverflow = "overflow:hidden";
                }

                // Verteilung Border und Margin rechts und links

                if(r == 1){
                    cgShowObject.css({"border-left": "rgba"+rgba+"  solid "+border+"px"});
                    //borderLeft = "rgba"+rgba+"  solid "+border+"px";
                }

                var rCheck = r-1;

                // Jedes mal wenn eine Reihe abgearbeitet wurde, gleich beim ersten Bild border-left wieder setzten!!!
                // wenn letztes Bild vorher war, dann margin nicht setzten
                if (last[rCheck] == 'on' || r==1){
                    if(border>0){
                        cgShowObject.css({"border-left": "rgba"+rgba+"  solid "+border+"px"});
                        //borderLeft = "rgba"+rgba+"  solid "+border+"px";
                    }
                    // wichtig!!! pauschal auf 0 setzen!!!
                 //   cgShowObject.css({"margin-left": 0});
                }
                else{
                    if(cg_horizontalSpace>0){
                 //       cgShowObject.css({"margin-left": ""+cg_horizontalSpace+"px"});
                    }
                    if(border>0){
                        cgShowObject.css({"border-left": "rgba"+rgba+"  solid "+border+"px"});
                        //borderLeft = "rgba"+rgba+"  solid "+border+"px";
                    }
                }

                //Border rechts muss immer sein!
                cgShowObject.css({"border-right": "rgba"+rgba+"  solid "+border+"px"});
                //borderRight = "rgba"+rgba+"  solid "+border+"px";


                // Verteilung Border und Margin rechts und links --- ENDE!

                // Positionen Info Comments und Rating auf den Galerie Images

                // INFO
                if(cgJsData[gid].options.general.TitlePositionGallery==2){
                    cgShowObject.find("div[id*=cg_hide]").find(".cg_info_depend_on_radius").css('text-align','center');
                    //	cgShowObject.find("div[id*=cg_hide]").find(".cg_info_depend_on_radius").css("padding-right","27px");
                    //	cgShowObject.find("div[id*=cg_hide]").find(".cg_info_depend_on_radius").css("padding-left","23px");
                    //	cgShowObject.find("[id*=cg_Field1IdGallery]").find("div").css("padding-left","23px");
                    //	cgShowObject.find("[id*=cg_Field1IdGallery]").find("div").css("padding-right","23px");
                    cgShowObject.find("[id*=cg_Field1IdGallery]").css('text-align','center');

                }
                else if(cgJsData[gid].options.general.TitlePositionGallery==3){
                    cgShowObject.find("div[id*=cg_hide]").find(".cg_info_depend_on_radius").css('text-align','right');
                    //	cgShowObject.find("div[id*=cg_hide]").find(".cg_info_depend_on_radius").css("padding-right","27px");
                    //	cgShowObject.find("div[id*=cg_hide]").find(".cg_info_depend_on_radius").css("padding-left","23px");
                    //	cgShowObject.find("[id*=cg_Field1IdGallery]").find("div").css("padding-left","23px");
                    //	cgShowObject.find("[id*=cg_Field1IdGallery]").find("div").css("padding-right","23px");
                    cgShowObject.find("[id*=cg_Field1IdGallery]").css('text-align','right');

                }
                else{
                    cgShowObject.find("div[id*=cg_hide]").find(".cg_info_depend_on_radius").css('text-align','left');
                    //	cgShowObject.find("div[id*=cg_hide]").find(".cg_info_depend_on_radius").css("padding-right","17px");
                    //	cgShowObject.find("div[id*=cg_hide]").find(".cg_info_depend_on_radius").css("padding-left","13px");
                    //	cgShowObject.find("[id*=cg_Field1IdGallery]").find("div").css("padding-left","13px");
                    //	cgShowObject.find("[id*=cg_Field1IdGallery]").find("div").css("padding-right","13px");
                    cgShowObject.find("[id*=cg_Field1IdGallery]").css('text-align','left');
                }

                // COMMENTS
                if(cgJsData[gid].options.general.TitlePositionGallery==2){
                    cgShowObject.find("div[id*=cg_hide]").find(".cg_gallery_comments_div").css("text-align","center");
                }
                else if(cgJsData[gid].options.general.TitlePositionGallery==3){
                    cgShowObject.find("div[id*=cg_hide]").find(".cg_gallery_comments_div").css("text-align","right");
                }
                else{

                }

                // RATING
                if(cgJsData[gid].options.general.TitlePositionGallery==2){
                    cgShowObject.find("div[id*=cg_hide]").find(".cg_gallery_rating_div").css("text-align","center");
                }
                else if(cgJsData[gid].options.general.TitlePositionGallery==3){
                    cgShowObject.find("div[id*=cg_hide]").find(".cg_gallery_rating_div").css("text-align","right");
                }
                else{

                }


                // Positionen Info Comments und Rating auf den Galerie Images --- ENDE


                // Verteilung Border und Margin oben und unten

                //Extra Bearbeitung falls gerade resized wurde

                if(border!=0){
                    cgShowObject.css({"border-top": "rgba"+rgba+"  solid "+border+"px"});
                    //borderTop = "rgba"+rgba+"  solid "+border+"px";
                }

                // ACHTUNG!!!!! Wenn horizontaler Abstand gesetzt und verticaler nicht gesetzt ist, dann werdden die oberen und unteren Borders
                //trotzdem so gesetzt als ob verticaler Abstand eingestellt ist, damit es nicht fehlerhaft aussieht.


                if(rowsDone==0){

                    // Vertical Space nicht null ist, dann kann immer gesetzt werden!
                    if(cg_verticalSpace!=0 || (cg_verticalSpace==0 && cg_horizontalSpace!=0 ) || cg_CircleImages==1){
                        cgShowObject.css({"border-top": "rgba"+rgba+"  solid "+border+"px"});
                        //borderTop = "rgba"+rgba+"  solid "+border+"px";
                    }
                    else{
                        // Ansonsten nur beim ersten durchlauf!
                        if(rowsDone==0){
                            cgShowObject.css({"border-top": "rgba"+rgba+"  solid "+border+"px"});
                            //borderTop = "rgba"+rgba+"  solid "+border+"px";
                        }
                    }

                    cgShowObject.css({"border-bottom": "rgba"+rgba+"  solid "+border+"px"});
                    //borderBottom= "rgba"+rgba+"  solid "+border+"px";
                    if(cg_verticalSpace!=0 || (cg_verticalSpace==0 && cg_horizontalSpace!=0 )){
                        cgShowObject.css({"margin-top": ""+cg_verticalSpace+"px"});
                        //borderBottom= "rgba"+rgba+"  solid "+border+"px";
                    }
                }
                else{
                    if(cg_verticalSpace!=0 || (cg_verticalSpace==0 && cg_horizontalSpace!=0 ) || cg_CircleImages==1){
                        cgShowObject.css({"margin-top": ""+cg_verticalSpace+"px"});
                        cgShowObject.css({"border-top": "rgba"+rgba+"  solid "+border+"px"});
                        //borderTop = "rgba"+rgba+"  solid "+border+"px";
                        cgShowObject.css({"border-bottom": "rgba"+rgba+"  solid "+border+"px"});
                        //borderBottom= "rgba"+rgba+"  solid "+border+"px";
                    }
                    else{
                        cgShowObject.css({"border-bottom": "rgba"+rgba+"  solid "+border+"px"});
                        //borderBottom= "rgba"+rgba+"  solid "+border+"px";
                    }
                }


                // Verteilung Border und Margin oben und unten --- ENDE


                // Setzten in die Mitte falls Circle aktiviert ist
                if(cg_CircleImages==1){// Achtung! Div height hier nehmen!!!
                    cgShowObject.find("[id*=cg_hide]").css('margin-bottom',height/2-45.75/2);
                    //cgShowObject.find("[id*=cg_hide]").css('padding-left',10);
                }

                // Höhe von input Field ausgleichen wenn es zu lang ist --- ENDE

                // Prüfung und bestimmung der URL Weiterleitung, falls aktiviert ist

                if(cg_Use_as_URL==1 && cg_ForwardToURL==1 && cg_ForwardFrom==2){

                    //Prüfen ob vom user ein http bei entries der url mit eingetragen wurde, wenn nicht dann hinzufügen

                    var cg_img_url_entry = $("#cg_img_url"+realId+"").val();

                    if (typeof cg_img_url_entry === 'undefined') { }
                    else if(cg_img_url_entry.indexOf("http") > -1) { cg_img_url_entry = cg_img_url_entry; }
                    else{ cg_img_url_entry = "http://"+cg_img_url_entry;}


                    var cg_a_href_img = "href='"+cg_img_url_entry+"'";

                  //  var cg_a_href_title = "title='Go to "+cg_img_url_entry+"'";

                    if(cg_ForwardType==2){

                        var cg_href_img_blank = "target='_blank'";

                    }

                    else{

                        var cg_href_img_blank = "";

                    }

                   // var cg_id_class_img = "id='cg_image_id"+realId+"' class='"+cgImageThumbRotation+"'";

                    // alert(cg_a_href_img);

                }
                else{

                   // var cg_a_href_img = "href='"+hrefCGpic+"' class='cg_href_image'";
                   // var cg_id_class_img = "data-cg_image_id='"+realId+"' id='cg_image_id"+realId+"' class='cg_append_image cg_image"+classCounter+" "+cgImageThumbRotation+"'";
                   // var cg_href_img_blank = "";

                    //Prüfen ob FullSizeImageOutGalleryNewTab aktiviert ist
                    //alert(cg_FullSizeImageOutGalleryNewTab);
                    if(cg_FullSizeImageOutGallery==1){
                        if(cg_FullSizeImageOutGalleryNewTab==1){
                           // var cg_href_img_blank = "target='_blank'";
                        }
                        else{
                           // var cg_href_img_blank = "";
                        }
                    }
                }

                // Prüfung und bestimmung der URL Weiterleitung, falls aktiviert ist --- ENDE


                // Zum Schluss wird ermittelt wieviel Zeilen bereits abgearbeitet wurden
                if (last[r] == 'on'){

                    rowsDone++;

                }
                //  console.log(width);

            var hideTillHover = '';
            var imgType = cgJsData[gid].vars.rawData[realId].ImgType;

            if(cgJsData[gid].options.general.ShowAlways!=1) {
                hideTillHover = 'cg_hide_till_hover';
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

            var inputSubTitleId = cgJsData[gid].options.visual['SubTitle'];
            var inputThirdTitleId = cgJsData[gid].options.visual['ThirdTitle'];

            if(inputSubTitleId && inputThirdTitleId){
                cgShowObject.addClass('has_sub_and_third_title');
            }else if (inputSubTitleId || inputThirdTitleId){
                cgShowObject.addClass('has_sub_or_third_title');
            }

            if((cgJsData[gid].vars.isUserGallery && cgJsData[gid].options.general.ShowAlways==3) ||
                (cgJsData[gid].options.general.ShowAlways==3 && (cgJsData[gid].options.general.AllowComments || cgJsData[gid].options.general.AllowRating || cgJsData[gid].options.visual['Field1IdGalleryView'] || cgJsData[gid].options.visual['SubTitle'] != 0 || cgJsData[gid].options.visual['ThirdTitle'] != 0))) {
                cgShowObject.addClass('cg_show_info_bottom');
                if(!cgJsData[gid].options.general.AllowComments){
                    cgShowObject.addClass('cg_no_comments');
                }
                if(width<160){
                    cgShowObject.addClass('cg_show_info_bottom_small');
                }else{
                    cgShowObject.removeClass('cg_show_info_bottom_small');
                }
                if(imgType=='con'){
                    cgShowObject.addClass('cg_show_info_bottom_con');
                }
            }

            // rating and comment div here
            if((cgJsData[gid].options.general.AllowComments >=1 || cgJsData[gid].options.general.AllowRating>=1) && cgJsData[gid].vars.modernHover){
                $infoRatingCommentDiv.append('<div  class="cg_gallery_info_rating_comments"></div>');
            }

                // Extra Korrektur für rotated images wenn in single view vorher korrigiert wurden
                if(cgRotationThumbNumber=='270' || cgRotationThumbNumber=='90'){
/*                    cgShowObject.find('#cgGalleryInfo'+realId).css({ // old logic
                        'top': 'unset',
                        'display': 'block'
                    });*/
                }


            var isAlternativeFileType = cgJsClass.gallery.function.general.tools.isAlternativeFileType(gid,realId);
            var isImageType = cgJsClass.gallery.function.general.tools.isImageType(gid,realId);

            if(cgJsData[gid].options.general.FbLikeGallery>=1 && !isAlternativeFileType){
                    cgShowObject.find('#cgFacebookGalleryDiv'+realId).removeClass('cg_hide');
                }

               // rating and comment div here  ---- ENDE

               // if(typeof cgJsData[gid].image[index][firstKey]['imageObject'] === "undefined"){
                if(typeof cgJsData[gid].imageObject[realId]  === "undefined"  || cgJsData[gid].imageObject[realId].isAdditionalFileChanged){

/*                    var rotationClass = cgImageThumbRotation;

                    if(cgRotationThumbNumber=='180'){
                        rotationClass = 'cg180degree';
                    }*/

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
                        var imageObject = $('<video width="100%" height="100%"  class="cg_append cg_append_alternative_file_type_video" id="cg_append'+realId+'" >' +
                                '<source src="'+imgSrcOriginal+'#t=0.001" type="video/mp4">' +
                                '<source src="'+imgSrcOriginal+'#t=0.001" type="video/'+imgType+'">' +
                            '</video>');
                    }else{
                    var imageObject = $('<figure class="cg_figure"><div id="cg_append'+realId+'" class="cg_append '+cg_append_file_type+' '+cgImageThumbRotation+'" '+postTitle+' '+postAlt+'></div><figcaption class="cg_figcaption"></figcaption></figure>');
                    }

                    if((cgJsData[gid].image[index][objectKey].rThumb=='270' || cgJsData[gid].image[index][objectKey].rThumb=='90') && isAlternativeFileType!='video'){
                        imageObject.find('.cg_append').css({
                            'width': ''+height+'px',// !IMPORTANT here when rotating 100% should not be used which is set in CSS files
                            'height': ''+widthDiv+'px'// !IMPORTANT here when rotating 100% should not be used which is set in CSS files
                        });
                        //!IMPORTANT here when rotating 100% should not be used which is set in CSS files. important has also to be set via attr, does not work via css with jquery
                      //  imageObject.attr('style',imageObject.attr('style')+'width:'+height+'px !important;height:'+widthDiv+'px !important;');
                    }else{
                        imageObject.find('.cg_append').addClass('cg_append_hundert_percent');
                    }

                    var cgShowPositionHelper = $('<span id="cgShowPositionHelper'+realId+'" class="cg_show_position_helper" data-cg-gid="'+gid+'"></span>');

                    // thumb wird nicht verwendet, da thumb quadratisches abgeschnittenes bild ist und somot nicht passen könnte
                    if(width<=imgSrcMediumWidth && imgSrcMediumWidth >= 500){// take not smaller then 500, otherwise might not look good on mobiles
                        imgSrc = imgSrcLarge;
                    }
                    else if(width<=imgSrcLargeWidth && imgSrcLargeWidth >= 500){// take not smaller then 500, otherwise might not look good on mobiles
                        imgSrc = imgSrcLarge;
                    }
                    else{
                        imgSrc = imgSrcOriginal;
                    }

                    // always image large to go sure when rotated!!! Otherwsise could be looking washed because low resolution.
                    if(cgJsData[gid].image[index][objectKey].rThumb=='270' || cgJsData[gid].image[index][objectKey].rThumb=='90'){
                        //imageObject.find('.cg_append').css('background','url("'+imgSrcLarge+'") no-repeat center center');
                        var $cgAppend = imageObject.find('.cg_append');
                        if(isImageType){
                            cgJsClass.gallery.function.general.tools.appendImageOnLoadGallery(cgShowObject,$cgAppend,imgSrcLarge,realId,gid);
                        }
                    }else{
                        //imageObject.find('.cg_append').css('background','url("'+imgSrc+'") no-repeat center center');
                        var $cgAppend = imageObject.find('.cg_append');
                        if(isImageType){
                            cgJsClass.gallery.function.general.tools.appendImageOnLoadGallery(cgShowObject,$cgAppend,imgSrc,realId,gid);
                        }
                    }

                    if((cgJsData[gid].vars.isUserGallery && cgJsData[gid].options.general.ShowAlways==3) ||
                        (cgJsData[gid].options.general.ShowAlways==3 && (cgJsData[gid].options.general.AllowComments || cgJsData[gid].options.general.AllowRating || cgJsData[gid].options.visual['Field1IdGalleryView'] || cgJsData[gid].options.visual['SubTitle'] != 0 || cgJsData[gid].options.visual['ThirdTitle'] != 0))) {
                        cgShowObject.addClass('cg_show_info_bottom');
                        if(!cgJsData[gid].options.general.AllowComments){
                            cgShowObject.addClass('cg_no_comments');
                        }
                        if(width<160){
                            cgShowObject.addClass('cg_show_info_bottom_small');
                        }else{
                            cgShowObject.removeClass('cg_show_info_bottom_small');
                        }
                        if(imgType=='con'){
                            cgShowObject.addClass('cg_show_info_bottom_con');
                        }
                    }

                    if(cgJsData[gid].options.general.FullSizeImageOutGallery==1){
                        imageTarget = 'target="_blank"';
                        imageHref = imgSrcOriginal;

                        var contentWrapped =  $("<a href='"+imageHref+"' class='"+cg_no_target_blank+"  cg_show_href_target_blank' "+imageTarget+"></a>");
                        contentWrapped.append(imageObject);
                        contentWrapped.append($infoRatingCommentDiv);
                        cgShowObject.append(contentWrapped);

                    }else if(cgJsData[gid].options.visual.ForwardToWpPageEntry==1){

                        var imageTarget = '';
                        if(cgJsData[gid].options.visual.ForwardToWpPageEntryInNewTab==1){
                            imageTarget = 'target="_blank"';
                        }

                        imageHref = cgJsData[gid].vars.rawData[realId]['entryGuid'];

                        var contentWrapped =  $("<a href='"+imageHref+"' "+imageTarget+" ></a>");
                        contentWrapped.append(imageObject);
                        contentWrapped.append($infoRatingCommentDiv);
                        cgShowObject.append(contentWrapped);

                    }else{
                        cgShowObject.append(imageObject).append($infoRatingCommentDiv);
                        cgShowObject.append(cgShowPositionHelper);
                    }

                        if(calledFromUpload===true){
                            $mainCGallery.append(cgShowObject);
                        }else{
                            $mainCGallery.append(cgShowObject);
                        }

                        cgShowObject.addClass('cg_fade_in');

                        cgJsData[gid].imageObject[realId] = cgShowObject ;
                        cgJsData[gid].imageObject[realId].isAdditionalFileChanged = false;
                        cgJsData[gid].image[index][firstKey]['imageObject'] = cgJsData[gid].imageObject[realId];

                        if(typeof cgJsData[gid].rateAndCommentNumbers[realId] == 'undefined'){
                            cgJsClass.gallery.dynamicOptions.getRatingAndComments(realId,arrIndex,objectKey,gid,calledFromUpload);
                        }else{
                            cgJsClass.gallery.dynamicOptions.setRatingAndComments(realId,arrIndex,objectKey,gid,calledFromUpload);
                        }

                    if(typeof cgJsData[gid].vars.info[realId] == 'undefined'){
                            if(cgJsData[gid].image[index][objectKey].rThumb=='270' || cgJsData[gid].image[index][objectKey].rThumb=='90'){
                                cgJsClass.gallery.info.getInfo(realId,gid,false,arrIndex,false,false,false, cgJsData[gid].imageObject[realId], widthDiv, height);
                            }else{
                                cgJsClass.gallery.info.getInfo(realId,gid,false,arrIndex,false,false,false, cgJsData[gid].imageObject[realId], height, widthDiv);
                            }
                        }else{
                            if(cgJsData[gid].image[index][objectKey].rThumb=='270' || cgJsData[gid].image[index][objectKey].rThumb=='90'){
                                cgJsClass.gallery.info.setInfo(realId,gid,false,arrIndex,cgJsData[gid].vars.info[realId], false, false, false, cgJsData[gid].imageObject[realId], widthDiv, height);
                            }else{
                                cgJsClass.gallery.info.setInfo(realId,gid,false,arrIndex,cgJsData[gid].vars.info[realId], false, false, false, cgJsData[gid].imageObject[realId], height, widthDiv);
                            }
                        }

                        if(isImageType){
                            if(imgSrc==imgSrcOriginal || imgDataWidth < width){
                                if(typeof cgJsData[gid].vars.rawData['imgSrcOriginalWidth'] == 'undefined'){
                                    var img = new Image();
                                    img.src = imgSrc;
                                    img.onload = function() {
                                        if(cgShowObject.attr('data-cg-id') == '12641'){
                                            //  debugger
                                        }
                                        cgJsData[gid].vars.rawData[realId]['imgSrcOriginalWidth'] = this.width;
                                        cgJsData[gid].vars.rawData[realId]['imgSrcOriginalHeight'] = this.height;
                                        var differenceCheck = width-this.width;// WidthThumbPic kann man nehmen weil diese sich nicht ändert
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

                    if((cgJsData[gid].vars.isUserGallery && cgJsData[gid].options.general.ShowAlways==3) ||
                        (cgJsData[gid].options.general.ShowAlways==3 && (cgJsData[gid].options.general.AllowComments || cgJsData[gid].options.general.AllowRating || cgJsData[gid].options.visual['Field1IdGalleryView']))) {
                            cgShowObject.addClass('cg_show_info_bottom');
                            if(!cgJsData[gid].options.general.AllowComments){
                                cgShowObject.addClass('cg_no_comments');
                            }
                            if(width<160){
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
                            cgJsData[gid].image[index][firstKey]['imageObject'].find('figure').wrap( "<a href='"+imageHref+"' class='"+cg_no_target_blank+"  cg_show_href_target_blank' "+imageTarget+"></a>" );
                        }

                    }

                    // thumb wird nicht verwendet, da thumb quadratisches abgeschnittenes bild ist und somot nicht passen könnte
                    if(width<=imgSrcMediumWidth){
                        imgSrc = imgSrcLarge;
                    }
                    else if(width<=imgSrcLargeWidth){
                        imgSrc = imgSrcLarge;
                    }
                    else{
                        imgSrc = imgSrcOriginal;
                    }

                    if(cgJsClass.gallery.vars.hasToAppend==true || calledFromUpload===true){
                        cgShowObject.appendTo($mainCGallery);
                        cgShowObject.removeClass('hide');
                    }

                    if(width<160){
                        cgShowObject.addClass('cg_show_info_bottom_small');
                    }else{
                        cgShowObject.removeClass('cg_show_info_bottom_small');
                    }

                    if(cgJsData[gid].image[index][objectKey].rThumb=='270' || cgJsData[gid].image[index][objectKey].rThumb=='90'){
                        if(isAlternativeFileType!='video'){
                            var $cgAppend = cgShowObject.find('.cg_append');
                            $cgAppend.css({
                                //'background': 'url("'+imgSrcLarge+'") no-repeat center center',// always image large to go sure when rotated!!! Otherwsise could be looking washed because low resolution.
                                'width': ''+height+'px',// !IMPORTANT here when rotating 100% should not be used which is set in CSS files
                                'height': ''+widthDiv+'px',// !IMPORTANT here when rotating 100% should not be used which is set in CSS files
                                'border': 'none'
                            });
                        }
                        if(isImageType){
                            cgJsClass.gallery.function.general.tools.appendImageOnLoadGallery(cgShowObject,$cgAppend,imgSrcLarge,realId,gid);
                        }

                    }else{
                        if(isAlternativeFileType!='video'){
                            var $cgAppend = cgShowObject.find('.cg_append');
                            $cgAppend.css({
                               // 'background': 'url("'+imgSrc+'") no-repeat center center',
                                'width': ''+width+'px',
                                'height': ''+height+'px',
                                'border': 'none'
                            });
                        }
                        if(isImageType){
                            cgJsClass.gallery.function.general.tools.appendImageOnLoadGallery(cgShowObject,$cgAppend,imgSrc,realId,gid);
                        }
                    }

                    if(cgJsData[gid].vars.info[realId] && cgJsData[gid].vars.modernHover){
                        if(cgJsData[gid].image[index][objectKey].rThumb=='270' || cgJsData[gid].image[index][objectKey].rThumb=='90'){
                            cgJsClass.gallery.function.general.tools.setHeightForInfoBlockInGallery(gid,cgJsData[gid].imageObject[realId].find('.cg_gallery_info_title'),cgJsData[gid].imageObject[realId],widthDiv,height,undefined,realId);
                        }else{
                            cgJsClass.gallery.function.general.tools.setHeightForInfoBlockInGallery(gid,cgJsData[gid].imageObject[realId].find('.cg_gallery_info_title'),cgJsData[gid].imageObject[realId],height,widthDiv,undefined,realId);
                        }
                    }else if(!cgJsData[gid].vars.info[realId] && cgJsData[gid].vars.modernHover){
                        if(cgJsData[gid].image[index][objectKey].rThumb=='270' || cgJsData[gid].image[index][objectKey].rThumb=='90'){
                            cgJsClass.gallery.function.general.tools.checkIfSmallWidthImageObject(gid,cgJsData[gid].imageObject[realId],null,widthDiv,height);
                        }else{
                            cgJsClass.gallery.function.general.tools.checkIfSmallWidthImageObject(gid,cgJsData[gid].imageObject[realId],null,height,widthDiv);
                        }
                    }

                    cgShowObject.attr({
                        'data-cg-order': index
                    });

                }
            r++;

            i++;


        });

        // to stabilize for eventually resize
        cgJsData[gid].vars.mainCGdiv.width(cgJsData[gid].vars.mainCGdiv.width());

        $mainCGallery.append('<div id="cgVerticalSpaceCreator'+gid+'" style="clear:both;display:block;height:'+cg_verticalSpace+'px;"></div>');

        cgJsClass.gallery.vars.isInitFullWindowOpen = false;
        cgJsClass.gallery.vars.isInitFullWindowClose = false;

        // has to be done after gallery load!
        cgJsData[gid].vars.mainCGallery.find('.cg_position_hr_1, .cg_position_hr_2, .cg_position_hr_3').remove();
        cgJsData[gid].vars.mainCGallery.find('.cg-slider-range-container').remove();

        //$mainCGdiv.find('.cg-lds-dual-ring-div-gallery-hide-mainCGallery').addClass('cg_hide');
        cgJsClass.gallery.function.general.tools.hideSkeletonLoader(gid);

        $mainCGallery.removeClass('cg_hide').addClass('cg_fade_in');
        cgJsData[gid].vars.cgCenterDivAppearenceHelper.addClass('cg_hide');

        cgJsClass.gallery.vars.switchViewsClicked=false;

     //   cgJsClass.gallery.resize.resizeInfo(gid,openPage);

        if(openPage==true || viewChange==true){
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

        //cgJsData[gid].vars.galleryAlreadyLoadedOnPageLoad = true;

    }
};
