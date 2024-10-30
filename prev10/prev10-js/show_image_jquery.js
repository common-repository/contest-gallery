jQuery(document).ready(function($){

    if(!$(".mainCGallery").length<1){
        return false;
    }
    if($("#cg_categoriesCheck").val()==1){

    var sortCat = true;

    if(sortCat){

        function parse_query_string(query) {
            var vars = query.split("&");
            var query_string = {};
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split("=");
                var key = decodeURIComponent(pair[0]);
                var value = decodeURIComponent(pair[1]);
                // If first entry with this name
                if (typeof query_string[key] === "undefined") {
                    query_string[key] = decodeURIComponent(value);
                    // If second entry with this name
                } else if (typeof query_string[key] === "string") {
                    var arr = [query_string[key], decodeURIComponent(value)];
                    query_string[key] = arr;
                    // If third or later entry with this name
                } else {
                    query_string[key].push(decodeURIComponent(value));
                }
            }
            return query_string;
        }

        var cats = JSON.parse(localStorage.getItem('cgJsClassIdsChecker'));

        if($("#cg_arrow_right > a").length>=1){

            // var query = window.location.search.substring(1);
            // get right picture
            var hrefPrev = $('#cg_arrow_right > a').attr('href');
            var pos = hrefPrev.indexOf('picture_id');
            var posHash = hrefPrev.indexOf('#');
            var params = hrefPrev.substring(pos,posHash);

            var qs = parse_query_string(params);
            var pidPrevCoded = qs['picture_id'];
            var stepPrevActual = qs['3'];

        }

        if($("#cg_arrow_left > a").length>=1){

            // get left picture
            var hrefNext = $('#cg_arrow_left > a').attr('href');
            var pos = hrefNext.indexOf('picture_id');
            var posHash = hrefNext.indexOf('#');
            var params = hrefNext.substring(pos,posHash);

            var qs = parse_query_string(params);
            var pidNextCoded = qs['picture_id'];
            var stepNextActual = qs['3'];

        }

        var propertyPrev = false;
        var propertyNext = false;
        var propertySetted = false;
        var doNotContinue = false;
        var pid = $('#cg_picture_id').val();

     //   console.log(cats);

   //     console.log('setted');
     //   console.log(pid);
    //    console.log(cats);

        var length = Object.keys(cats).length;

     //   console.log(length);


        var i = 0;
        var posPrev = 0;
        var posNext = 0;

        for(var property in cats){

            i++;

            if(propertySetted==true && doNotContinue==false  && cats[property]==true){
        //        console.log('here');
       //         console.log(property);
                propertyNext = property;
                posNext = i;
                doNotContinue = true;
            }

            if(property==pid && doNotContinue==false){
     //           console.log('here1');
     //           console.log(property);
                propertySetted = true;
            }

            if(propertySetted==false && cats[property]==true){
                posPrev = i-1;
                propertyPrev = property;
            }

        }

        var cg_PicsPerSite = parseInt($('#cg_PicsPerSite').val());




     //   console.log('NEXT LEFT');
     //   console.log(hrefNext);
    //   console.log(propertyNext);
     //   console.log(pidNextCoded);

        if(propertyNext!=false) {
     //       console.log('length');

            var stepNext = Math.ceil((length-posNext)/cg_PicsPerSite);
            stepNext = stepNext * cg_PicsPerSite - cg_PicsPerSite;

            var propertyNextCoded = (parseInt(propertyNext) + 8) * 2 + 100000;
     //       console.log(propertyNextCoded);

            var hrefNext = hrefNext.replace(pidNextCoded,propertyNextCoded);
    //        console.log(hrefNext);

            var hrefNext = hrefNext.replace('3='+stepNextActual,'3='+stepNext);
   //         console.log(hrefNext);

            $('#cg_arrow_left > a').attr('href',hrefNext);

        }
        else{
            $('#cg_arrow_left').css('display','none');
        }

   //     console.log('PREV RIGHT');
   //     console.log(hrefPrev);
    //    console.log(propertyPrev);
     //   console.log(pidPrevCoded);

        if(propertyPrev!=false) {

            var stepPrev = Math.ceil((length-posPrev)/cg_PicsPerSite);
            stepPrev = stepPrev * cg_PicsPerSite - cg_PicsPerSite;
       //     console.log('posPrev');
         //   console.log(posPrev);

        //    console.log('length');
         //   console.log(length);

       //     console.log('stepPrev');

       //     console.log(stepPrev);

            var propertyPrevCoded = (parseInt(propertyPrev)+8)*2+100000;
        //    console.log(propertyPrevCoded);

            var hrefPrev = hrefPrev.replace(pidPrevCoded,propertyPrevCoded);
        //    console.log(hrefPrev);

            var hrefPrev = hrefPrev.replace('3='+stepPrevActual,'3='+stepPrev);
        //    console.log('prev');

        //    console.log(hrefPrev);

            $('#cg_arrow_right > a').attr('href',hrefPrev);

        }
        else{
            $('#cg_arrow_right').css('display','none');
        }

    }

    }




    if($( "#cg_arrow_left").find('a').length<1){
        $( "#cg_arrow_left").height(0);
	}
    if($( "#cg_arrow_right").find('a').length<1){
        $( "#cg_arrow_right").height(0);
    }



	/*
	$('head').append('<meta property="og:url" content="https://www.contest-gallery.com/test-cg-1/?picture_id=100586&1=2&2=1&3=0#cg-begin" />');
$('head').append("<meta property='og:type'          content='website' />");
$('head').append('<meta property="og:title"         content="12345" />');
	$('head').append('<meta property="og:description"   content="Your description" />'); 
	$('head').append('<meta property="og:image" content="https://www.contest-gallery.com/test-cg-1/wp-content/uploads/contest-gallery/gallery-id-8/1446277444_78contest-gallery_247172002-624width.jpg" />');*/

//	alert(123123);

	$('.cg_show_image_url').each(function () {

        var url = $(this).attr('href');
        if(url.length>1){

            var begin = url.substr(0, 7);

            if(begin.indexOf('http') === -1){
                var url = 'http://'+url;
            //    console.log('url');
          //      console.log(url);
                $(this).attr('href',url);
            }

        }

    });

	
	var cg_show_image_file = $("#cg_show_image_file").val();
	var cg_language_i_am_not_a_robot = $("#cg_language_i_am_not_a_robot").val();

    function cgCenterImage(){

    	//console.log('center');

        var minusMarginLeftImage = ($("#cg_img_gallery").width()-$("#cg_img_div").width())/2;
        $("#cg_img_gallery").css('margin-left','-'+minusMarginLeftImage+'px');

        //	console.log($("#cgWidthOriginalImg").val());
        if($("#cg_img_rotation").val()==90 || $("#cg_img_rotation").val()==270){


            var widthOriginalImg = $('#cgWidthOriginalImg').val();
            var heightOriginalImg = $('#cgHeightOriginalImg').val();

            if(widthOriginalImg/heightOriginalImg >1){
                $("#cg_img_gallery").css('margin-left','0');

            }

        }


    }



	if($("#cg_ScaleAndCut").val()==0){
        cgCenterImage();
	}


	
	var IPcheck = $("#ip_check").val();
	
	
	//$(this).css("cursor: default");
	
	if(IPcheck==1){
		
		var starsBoxes = $("#cg_rate_stars_image_hidden").html();
		
		//$("#cg_rate_stars_image").css("cursor: default");
		//$("#cg_rate_stars_image").css("cursor: default");
		
		$("#cg_rate_stars_image").hover().css("cursor","pointer");
		
		$(document).on('click', '#cg_rate_stars_image', function(e){
	
	
//alert("action");

$("#cg_rate_stars_image").empty();
$("#cg_rate_stars_image").append(starsBoxes);
 

});
	
	
	}
	
	
	
		var check = $("#cg_check").val();
		
		
		// Prüfen ob es sich um show image file handelt das die selbe id auch im slider file zwecks Übersetzung
		if (typeof cg_show_image_file == 'undefined') {
		
		return false;
		
		}
		
		else{
			
			$("#cg_i_am_not_a_robot_single_page_image").prepend("<input type='checkbox' value='"+check+"' name='"+check+"' id='"+check+"' >");
			
		}



	//  $( "#cg_arrow_left").hide();
	//  $( "#cg_arrow_right").hide();
	//  $( "#cg_arrow_random").hide();


	/*
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.0";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));*/

/*
		 $( "#cg_arrow_left" ).mouseout(function() {
	  $( "#cg_arrow_left").hide();
	  $( "#cg_arrow_right").hide();
	  $( "#cg_arrow_random").hide();
	  });

	  $( "#cg_arrow_random" ).mouseout(function() {
	  $( "#cg_arrow_left").hide();
	  $( "#cg_arrow_right").hide();
	  $( "#cg_arrow_random").hide();
	  });
	  
	  		 $( "#cg_arrow_right" ).mouseout(function() {
	  $( "#cg_arrow_left").hide();
	  $( "#cg_arrow_right").hide();
	  $( "#cg_arrow_random").hide();
	  });

	  $( "#cg_img_gallery" ).mouseover(function() {
	  $( "#cg_arrow_left").toggle();
	  $( "#cg_arrow_right").toggle();
	  $( "#cg_arrow_random").toggle();
	  });
	  
		  $("#cg_arrow_left").mouseover(function() {
		  $("#cg_arrow_left").toggle();
          $("#cg_arrow_right").toggle();		  
          $("#cg_arrow_random").toggle();		  
		  });	

		  $("#cg_arrow_random").mouseover(function() {
		  $("#cg_arrow_left").toggle();
          $("#cg_arrow_right").toggle();		  
          $("#cg_arrow_random").toggle();		  
		  });
		  
		  $("#cg_arrow_right").mouseover(function() {
		  $("#cg_arrow_left").toggle();
          $("#cg_arrow_right").toggle();		  
          $("#cg_arrow_random").toggle();		  
		  });
		  
		 $( "#cg_img_gallery" ).mouseout(function() {
	  $( "#cg_arrow_left").hide();
	  $( "#cg_arrow_right").hide();
	  $( "#cg_arrow_random").hide();
	  }); */
	  
	  
	// Resizing if image bigger then screen, mobile view for example	


	function cgResizeImage(){

				var widthImageParent = $("#main-cg-content-div").parent().width();
			var widthImageCommentBoxesConfigured = $("#cg_width_gallery").val();
			var heightImageCommentBoxesConfigured = $("#cg_height_image").val();
			var widthImageCommentBoxes = $("#cg-start").val();
      //  console.log(widthImageCommentBoxesConfigured);
      //  console.log(widthImageParent);
       // console.log(widthImageCommentBoxesConfigured);


        if(widthImageParent > widthImageCommentBoxesConfigured){
            widthImageParent = widthImageCommentBoxesConfigured;
            var newWidthImageCommentBoxes = widthImageParent;
            $("#cg_img_gallery").css('width','auto');
            if($("#cg_ScaleAndCut").val()==1){
                var newHeightImgDiv = $("#cg_img_gallery").height();
         //       console.log(newHeightImgDiv);
             //   $("#cg_img_div").css('height','auto');
                $("#cg_img_div").height(newHeightImgDiv);
            }
		}
		else{
            var newWidthImageCommentBoxes = widthImageParent;
            $("#cg_img_gallery").css('width',newWidthImageCommentBoxes);
            if($("#cg_ScaleAndCut").val()==1){
                var newHeightImgDiv = $("#cg_img_gallery").height();
                $("#cg_img_div").height(newHeightImgDiv);
            }
		}



	//	console.log($("#cgWidthOriginalImg").val());
		if($("#cg_img_rotation").val()==90 || $("#cg_img_rotation").val()==270){
            var widthOriginalImg = $('#cgWidthOriginalImg').val();
            var heightOriginalImg = $('#cgHeightOriginalImg').val();
        //    console.log(newWidthImageCommentBoxes);

            if(widthOriginalImg/heightOriginalImg <=1){
                var cgRotateRatio = widthOriginalImg/heightOriginalImg;
                var cgWidthOriginalImgContainer = widthOriginalImg;
                widthOriginalImg = heightOriginalImg;
                widthOriginalImg = widthOriginalImg*cgRotateRatio;
                heightOriginalImg = cgWidthOriginalImgContainer;

                var newImageWidth = newWidthImageCommentBoxes*heightOriginalImg/widthOriginalImg*cgRotateRatio;
			//	console.log(newImageWidth);
                $("#cg_img_div").css('max-width','none');
                $('#cg_img_div').css('max-height','none');
               // var cgRotateRatio = heightOriginalImg/widthOriginalImg;
                $('#cg_img_div').height($("#cg_img_gallery").width()*cgRotateRatio);

                $("#cg_img_gallery").width(newImageWidth);

			}
			else{

            //	console.log(3);
                var cgRotateRatio = widthOriginalImg/heightOriginalImg;

                $('#cg_img_gallery').css('max-width','none');
                $('#cg_img_div').height($("#cg_img_gallery").width()*cgRotateRatio);
                $('#cg_img_gallery').width($("#cg_img_gallery").width()*cgRotateRatio);

			}



		}


	//	if(widthImageParent < widthImageCommentBoxesConfigured || (widthImageParent < widthImageCommentBoxesConfigured && widthImageCommentBoxes <= widthImageCommentBoxesConfigured)){
		//	console.log(1);
			//var changeInPercent = widthImageParent/widthImageCommentBoxesConfigured;
			//alert(widthImageParent);
			//alert(changeInPercent);
			//var newHeightImgDiv = heightImageCommentBoxesConfigured*changeInPercent;


			//alert(newHeightImgDiv);
			

			//var newWidthImageCommentBoxes = widthImageParent-12-12;
		//	console.log(newWidthImageCommentBoxes);
			$("#cg-start").css('width',newWidthImageCommentBoxes);
			$("#cg_main_div").css('width',newWidthImageCommentBoxes);
			$("#cg_img_div").css('width',newWidthImageCommentBoxes);
			$("#main-cg-content-div").css('width',newWidthImageCommentBoxes);
			$("#cg-arrows-div").css('width',newWidthImageCommentBoxes);



			//var newHeightImgDiv = $("#cg_img_gallery").height();
			//alert(newHeightImgDiv);
	//		$("#cg_img_div").css('height',newHeightImgDiv+'px');
			$("#cg_img_gallery").css('left',0);
			$("#cg_img_gallery").css('right',0);
			$("#rating-div").css('width',newWidthImageCommentBoxes);
			//$("#cg_plz_vote_single_image_view").css('float','left');
			$("#cg_plz_vote_single_image_view").css('width','auto');
			$("#cg_plz_vote_single_image_view").css('display','block');
			//$("#cg-show-pic-full-size").css('float','left');
			$("#cg-show-pic-full-size").css('width','auto');
			$("#cg-show-pic-full-size").css('display','block');



			cgCenterImage();

			
			//alert(AllowComments);
			
			 var AllowComments = $("#cg_allow_comments").val();
			
				if(AllowComments==1){
					$("#cg-main-comments-div").css('width',newWidthImageCommentBoxes);
				//	$("#cg-comments-div").css('width',newWidthImageCommentBoxes);
				//	$("#show_comments").css('width',newWidthImageCommentBoxes);
					//$("#show_new_comments").css('width',newWidthImageCommentBoxes);
					
					var newWidthCGcommentBox = newWidthImageCommentBoxes-60;
					$("#cg_comment").css('width',newWidthCGcommentBox);
					$(".cg_comments_hr").css('width',newWidthCGcommentBox);
					
				}
		
	//	}
	
	}
	
			
			
			 var AllowComments = $("#cg_allow_comments").val();
//	alert(AllowComments);
	var widthImageParent = $("#cg-start").parent().width(); 
	var widthImageCommentBoxesConfigured = $("#cg_width_gallery").val();
	var widthImageCommentBoxes = $("#cg-start").val();
	
//	var heightLoadedImage = $("#cg_height_image").val();
	//$("#cg_height_image").val(heightLoadedImage);
	//alert(heightLoadedImage);

	//alert(widthImageCommentBoxes);
	
	
	if(widthImageParent < widthImageCommentBoxesConfigured){
	
	cgResizeImage();	
		
	}
	
	
	
	
	
	
	
	// Resizing if image bigger then screen, mobile view for example --- ENDE
	
	$( window ).resize(function() {
		
	cgResizeImage();	
		  
	});

    cgResizeImage();
		   
});