cgJsClass.slider.carrousel = {
    init: function(){

     //   console.log('carrousel');

        jQuery('#cg-carrousel-slider-content .cg-carrousel-img').each(function(){

            var rotateDegree = jQuery(this).find('.cg_carrousel_image_thumb_rotation').val();

            if(rotateDegree==90 || rotateDegree==270){


                var width = jQuery(this).find(".widthOriginalImg").val();
                var height = jQuery(this).find(".heightOriginalImg").val();

                if(width/height >=1){
/*                    var cgRotateRatio = width/height;
                    var cgWidthOriginalImgContainer = width;
                    width = height;
                    width = width*cgRotateRatio;
                    height = cgWidthOriginalImgContainer;

                    var newImageWidth = jQuery(this).width()*height/width*cgRotateRatio;

                    jQuery(this).find('[class*="cg_image"]').css('max-width','none');
                    jQuery(this).find('[class*="cg_image"]').width(newImageWidth);*/

                 //   var cgRotateRatio = width/height;

                    var carrouselWidth = jQuery(window).width()/100*20;

                 //   var widthNew = carrouselWidth*cgRotateRatio;

                    jQuery(this).find('> img').height(carrouselWidth);



                }
                else{

                    var carrouselWidth = jQuery(window).width()/100*20;

                    var cgRotateRatio = width/height;


                    var heightNew = (carrouselWidth*height/width)/100*70;


                    jQuery(this).css('max-height','none');
                    jQuery(this).height(heightNew*cgRotateRatio);


                }




            }




        });





    },
    scrollTo: function(real_picture_id,sliderClick){



        var collectionHeight = 0;

        jQuery('#cg-carrousel-slider-content .cg-carrousel-img').removeClass('cg-add-carrousel-border');


        //  console.log('ALL LOADED');
            jQuery('#cg-carrousel-slider-content .cg-carrousel-img').each(function(){

                var idToCompare = 'cg-carrousel-container-id-'+real_picture_id;



                //     console.log('collectionHeight: '+collectionHeight);
                //      console.log('id to compare: '+idToCompare);
                //      console.log('this id: '+jQuery(this).attr('id'));

/*                var img = new Image();
                img.src = jQuery('#cg-carrousel-slider-content .cg-carrousel-img').find('src');
                img.onload = function () {
                    alert("image is loaded");
                }
                */


                if(idToCompare==jQuery(this).attr('id')){

                    jQuery(window).height();

                    cgJsClass.slider.carrousel.offsetTop = collectionHeight - ((jQuery(window).height()-jQuery(this).height())/2);

                    //   console.log('Offset top');
                    //    console.log(cgJsClass.slider.carrousel.offsetTop);

                    if(cgJsClass.slider.vars.cg_hide_carrousel==false && typeof sliderClick=='undefined'){
                        jQuery('#cg-carrousel-slider-content').animate({ scrollTop: (cgJsClass.slider.carrousel.offsetTop)}, 'fast');
                    }

                    jQuery(this).addClass('cg-add-carrousel-border');

                    return false;

                }
                // console.log('find image: '+jQuery(this).find('img').height());

                collectionHeight = collectionHeight+jQuery(this).find('img').height();
            });









    },
    offsetTop: 0
}