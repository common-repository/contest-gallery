cgJsClass.slider.slide.objects = {
    currentId:'',
    currentNumber:'',
    countAll:'',
    allIds:[],
    allCounts:[],
    images:[],
    showImages: function (classCGimageNumber,widthDivBox,widthCGimgSliderBox,imgSrc,cgImageRotation,cg_slider_image_div_info_check) {

        /*        if(marginSliderIMGleft==''){
                    marginSliderIMGleft=0;
                }*/


        //console.log('SHOW IMAGES HERE');
        //console.log('classCGimageNumber: '+classCGimageNumber);
        //console.log('widthDivBox: '+widthDivBox);
        //console.log('widthCGimgSliderBox: '+widthCGimgSliderBox);
        //console.log('imgSrc: '+cgImageRotation);
        //console.log('cg_slider_image_div_info_check: '+cg_slider_image_div_info_check);


        var imageObject = cgJsClass.slider.slide.objects.images[classCGimageNumber];
        imageObject.css('width',widthDivBox+'px');
        imageObject.find('.cg_slider_image')
            .css({
                'width':widthCGimgSliderBox+'px'
            })
            .attr('src',imgSrc)
            .addClass(cgImageRotation)
            .addClass(cg_slider_image_div_info_check);
        //  imageObject.find('.cg_slider_image').css('margin-left:',marginSliderIMGleft+'px');

    },
    resizeCheck:function () {

    },
    pagePrevUrl:'',
    setPagePrevUrl:function(){
        if(!this.pagePrevUrl){
            if(jQuery(".cg_further_images_container").length>=1){

                var cg_further_images = jQuery(".cg_further_images_container .cg_further_images_selected").first();

                if(cg_further_images.prev().length>=1){

                    var cg_slider_arrow_left_next_page = jQuery("#cg_slider_arrow_left_next_page");
                    var nextLeftPageHref = cg_further_images.prev().find('a').attr('href');
                    //  var nextLeftPageHrefHash = cg_further_images.prev().find('a').attr('data-hash');
                    // var urlOld = nextLeftPageHref.split("#");
                    // var nextLeftPageUrlNew = urlOld[0]+'#img'+nextLeftPageHrefHash;
                    cg_slider_arrow_left_next_page.wrap( "<a href='"+nextLeftPageHref+"'></a>" );
                    this.pagePrevUrl = cg_slider_arrow_left_next_page;

                    jQuery("#cg_slider_arrow_left").hide();
                    cg_slider_arrow_left_next_page.css('display','block').find('img').css('display','block');

                }
                else{
                    this.pagePrevUrl = false;
                }

            }
        }
        else{
            if(this.pagePrevUrl==false){
                return false;
            }
            else{
                this.pagePrevUrl.css('display','block');
            }
        }
    },
    pageNextUrl:'',
    setPageNextUrl:function(){
        if(!this.pageNextUrl){
            if(jQuery(".cg_further_images_container").length>=1){

                var cg_further_images = jQuery(".cg_further_images_container .cg_further_images_selected").first();
                if(cg_further_images.next().length>=1){

                    var cg_slider_arrow_right_next_page = jQuery("#cg_slider_arrow_right_next_page");
                    var nextRightPageHref = cg_further_images.next().find('a').attr('href');
                    //  var nextRightPageHrefHash = cg_further_images.next().find('a').attr('data-hash');
                    //  var nextRightPageUrlNew = cgJsClass.slider.slide.objects.changeUrl(nextRightPageHrefHash);
                    cg_slider_arrow_right_next_page.wrap( "<a href='"+nextRightPageHref+"'></a>" );

                    jQuery("#cg_slider_arrow_right").hide();
                    this.pageNextUrl = cg_slider_arrow_right_next_page;
                    cg_slider_arrow_right_next_page.css('display','block').find('img').css('display','block');


                }
                else{
                    this.pageNextUrl = false;
                }

            }
        }
        else{
            if(this.pageNextUrl==false){
                return false;
            }
            else{
                this.pageNextUrl.css('display','block');
            }
        }
    },
    fadeOutCurrentUserInfo:function () {

        cgJsClass.slider.touch.cg_slider_touchstart = 0;
        cgJsClass.slider.touch.cg_slider_touchend = 0;

        var cg_user_input = cgJsClass.slider.slide.objects.currentUserInfoObject;
        cg_user_input.closest('.cg_user_input_container').find('.cg_user_input_fade_out_arrow_container').addClass('cg_user_input_fade_in_arrow_container');
        cg_user_input.closest('.cg_user_input_container').find('.cg_user_input_fade_out_arrow_container').removeClass('cg_user_input_fade_out_arrow_container');
        var heightForScroll = cgJsClass.slider.slide.objects.currentUserInfoHeightForScroll;
        cg_user_input.css('height',heightForScroll+'px');
        cg_user_input.closest('.cg_user_input_container').css('position','static');
        cg_user_input.closest('.cg_user_input_container').find('.cg_user_input_fade_in_arrow_div img:first-child').css('display','block');
        cg_user_input.closest('.cg_user_input_container').find('.cg_user_input_fade_in_arrow_div img:nth-child(2)').css('display','none');
        cg_user_input.closest('.cg_user_input_container').css('overflow-y','hidden');
        cg_user_input.css('overflow-y','scroll');

        cgJsClass.slider.touch.cg_slider_touchstart = 0;
        cgJsClass.slider.touch.cg_slider_touchend = 0;



    },
    fadeInCurrentUserInfo:function () {

        cgJsClass.slider.touch.cg_slider_touchstart = 0;
        cgJsClass.slider.touch.cg_slider_touchend = 0;


        var cg_user_input = cgJsClass.slider.slide.objects.currentUserInfoObject;
        var height = cgJsClass.slider.slide.objects.currentUserInfoHeightBefore;
        //   console.log('fade in currentUserInfoHeight'+height);
        cg_user_input.closest('.cg_user_input_container').find('.cg_user_input_fade_in_arrow_container').addClass('cg_user_input_fade_out_arrow_container');
        cg_user_input.closest('.cg_user_input_container').find('.cg_user_input_fade_in_arrow_container').removeClass('cg_user_input_fade_in_arrow_container');



        if(cgJsClass.slider.vars.isMobile==true){
            cg_user_input.closest('.cg_user_input_container').css('position','fixed');
            if(cgJsClass.slider.vars.isIOS==true){

                var positionTop = jQuery(window).height()-window.innerHeight+46;
                //  var scrollTopBody = jQuery('body').scrollTop();

                /*                if(scrollTopBody<positionTop){
                                    positionTop = scrollTopBody;
                                }*/

                cg_user_input.closest('.cg_user_input_container').css('top',positionTop+'px');

            }
            else{
                cg_user_input.closest('.cg_user_input_container').css('top','46px');
            }
            cg_user_input.closest('.cg_user_input_container').css('height',window.innerHeight+'px');
            cg_user_input.css('height',window.innerHeight+'px');

        }
        else{
            cg_user_input.css('height',height+'px');
            cg_user_input.closest('.cg_user_input_container').css('position','absolute');
            var heightCheck = height+46;
            if(heightCheck >= window.innerHeight){
                cg_user_input.css('overflow-y','hidden');
                cg_user_input.closest('.cg_user_input_container').css('top','46px');
                cg_user_input.closest('.cg_user_input_container').css('overflow-y','scroll');
            }
            else{
                cg_user_input.css('overflow-y','scroll');

            }
        }

        cg_user_input.closest('.cg_user_input_container')
            .find('.cg_user_input_fade_in_arrow_div img:first-child').css('display','none');
        cg_user_input.closest('.cg_user_input_container')
            .find('.cg_user_input_fade_in_arrow_div img:nth-child(2)').css('display','block');


        cgJsClass.slider.touch.cg_slider_touchstart = 0;
        cgJsClass.slider.touch.cg_slider_touchend = 0;

    },
    cutUserInfo:function (classCGimageNumber) {

        //console.log('user info class: '+classCGimageNumber);
        this.currentUserInfoObject = cgJsClass.slider.slide.objects.images[classCGimageNumber].find('.cg_user_input');
        var cg_user_input = this.currentUserInfoObject;
        if(cg_user_input.length>=1){
            cg_user_input.ready(function () {

                var heightAllEl = 50;
                cg_user_input.find('*').each(function () {
                    heightAllEl = heightAllEl + jQuery(this).height();
                });
                //console.log('image number :'+classCGimageNumber);

                var heightImage = cgJsClass.slider.slide.objects.images[classCGimageNumber].find('.cg_slider_image').height();
                var heightImageId = cgJsClass.slider.slide.objects.images[classCGimageNumber].find('.cg_slider_image').attr('id');
                //console.log('height image :'+heightImage);
                //console.log('height all :'+heightAllEl);
                //console.log('height all :'+heightAllEl);
                //console.log('window innerHeight :'+window.innerHeight);

                var heightLeft = window.innerHeight-heightImage-100;
                var heightCheck = heightImage+heightAllEl+40;

                // vorher height auf diese Weise entfernen!
                cg_user_input.css('height','');

                //console.log('heightAllEl :'+heightAllEl);
                cgJsClass.slider.slide.objects.currentUserInfoHeightBefore = heightAllEl+40;
                //console.log('heightLeft :'+heightLeft);

                cgJsClass.slider.slide.objects.currentUserInfoHeightForScroll = heightLeft;

                if(heightCheck >= window.innerHeight ){

                    cg_user_input.css('height',heightLeft+'px');
                    cg_user_input.closest('.cg_img_box').find('.cg_user_input_fade_in_arrow_container').css('display','block');

                }
                else{

                    cg_user_input.closest('.cg_img_box').find('.cg_user_input_fade_in_arrow_container').css('display','none');
                }
            });

        }
    },
    currentUserInfoHeightForScroll: '',
    currentUserInfoHeightBefore: '',
    currentUserInfoObject: '',
    changeUrl:function (crypted_picture_id) {
        // document.location.hash = "img"+crypted_picture_id;
        var locationHref = document.location.href;

        if(locationHref.indexOf('#')!== -1){
            var locationHrefSplit = locationHref.split("#")[0];
        }
        else{
            var locationHrefSplit = locationHref;
        }

        if(locationHrefSplit.indexOf('picture_id=')!== -1){

            var picture_id = locationHrefSplit.split("picture_id=")[1];
            if(picture_id.indexOf('#')!== -1){
                var after_picture_id = '#'+picture_id.split("#")[1];
            }
            else if(picture_id.indexOf('&')!== -1){
                var after_picture_id = '&'+picture_id.split("&")[1];
            }
            else{
                var after_picture_id = '';
            }

            var locationHrefNew = locationHrefSplit.split("picture_id=")[0]+'picture_id='+crypted_picture_id+after_picture_id;

        }
        else{
            if(locationHrefSplit.indexOf('?')!== -1){
                var locationHrefNew = locationHrefSplit+'&picture_id='+crypted_picture_id;
            }
            else{
                var locationHrefNew = locationHrefSplit+'?picture_id='+crypted_picture_id;
            }
        }



        history.pushState(null, '', locationHrefNew);
        cgJsClass.slider.vars.hash="#img"+crypted_picture_id;

        return locationHrefNew;
    },
    resizingGallery:function (closeButtonClicked,catChange) {


        if(jQuery('#imgContainer').is(':visible')){
            return false;
        }

        if(cgJsClass.slider.vars.isMobile==true && typeof closeButtonClicked === 'undefined' && catChange !== true){

            // Achtung! Für Mobile vergleich mit innerHeight und innwerWidth arbeiten !!!!!
            var windowWidth = window.innerWidth;
            // Achtung! Height Ermittlung hier absichtlich anders als beim Slider wegen eventuell geöffnetem comment fenster!!!
            var windowHeight = jQuery(window).height();

            if(windowWidth/windowHeight>=1){
                var windowRatioCheck = 'horizontal';
            }
            else{
                var windowRatioCheck = 'vertical';
            }
            //   alert('topActual '+windowRatioCheck);
            //      alert('topRatio '+cgJsClass.slider.vars.actualWindowRatio);
            // Wenn es Mobile ist, Commentar Frame offen ist und Window Verhältnis sich nicht geändert hat, dann braucht man nicht auszuführen
            // GANZ WICHTIG cgJsClass.slider.vars.sliderClosed ANSONSTEN wird nicht resized
            //    console.log('cgJsClass.slider.vars.sliderClosed: '+cgJsClass.slider.vars.sliderClosed);
            //     console.log('cgJsClass.slider.vars.actualWindowRatio: '+cgJsClass.slider.vars.actualWindowRatio);
            //     console.log('windowRatioCheck: '+windowRatioCheck);
            if(windowRatioCheck==cgJsClass.slider.vars.actualWindowRatio){
                return false;
            }
        }





        var look = jQuery("#cg_look").val();


        //alert(look);

        if (look=='thumb') {
            jQuery('.cg_append').empty();
            jQuery('#cg_gallery_resize').val(1);
            cgThumbLogic();
            jQuery('#cg_gallery_resize').val(0);
        }



//------------------------------------------------------------------
// ---------- Row Ansicht Horizontal (Gleiche Anzahl der Bilder in einer Reihe) -------------------------------
//------------------------------------------------------------------


        if (look=='row') {


            jQuery('.cg_append').empty();
            jQuery('#cg_gallery_resize').val(1);

            cgRowLogic();
            jQuery('#cg_gallery_resize').val(0);

        }

//------------------------------------------------------------------
// ---------- Row Ansicht Horizontal ENDE --------------------------
//------------------------------------------------------------------



//------------------------------------------------------------------
// ---------- Same Height Ansicht Horizontal (Gleiche Anzahl der Bilder in einer Reihe) -------------------------------
//------------------------------------------------------------------



        if (look=='height') {

            //jQuery('.cg_append').empty();
//var HeightLookHeight = jQuery("#cg-height").val();


//jQuery('#cg_gallery_resize').val(1);

            jQuery(".cg_show").attr('style','');
            //jQuery('.show-inner').attr('style','');
            jQuery('.cg_append').attr('style','');
            jQuery('.cg_append').empty();

            // Resize fängt an
            //var cg_gallery_resize = 1;
            jQuery('#cg_gallery_resize').val(1);
            //   alert('tt');

            cgHeightLogic();

            jQuery('#cg_gallery_resize').val(0);





        }

        jQuery('.cg_show').each(function () {

            if(jQuery(this).width()<cgJsClass.gallery.vars.cgGalleryInfoWidth){
                jQuery(this).find('.cg_gallery_info').hide();
            }
            else{
                jQuery(this).find('.cg_gallery_info').show();
            }

        });

//------------------------------------------------------------------
// ---------- SameHeight Ansicht Horizontal ENDE --------------------------
//------------------------------------------------------------------

        cgResizeFontSize();

        if(cgJsClass.slider.vars.isMobile==true && cgJsClass.slider.vars.isIOS==false){
            var windowWidth = window.innerWidth;
            // Achtung! Height Ermittlung hier absichtlich anders als beim Slider wegen eventuell geöffnetem comment fenster!!!
            var windowHeight = jQuery(window).height();
            if(windowWidth/windowHeight>=1){
                cgJsClass.slider.vars.actualWindowRatio = 'horizontal';
            }
            else{
                cgJsClass.slider.vars.actualWindowRatio = 'vertical';
            }

            //alert('bottom '+cgJsClass.slider.vars.actualWindowRatio);

        }





    }
}