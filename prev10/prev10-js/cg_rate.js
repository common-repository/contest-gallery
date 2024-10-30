jQuery(document).ready(function($){

var cg_hide_until_vote = $("#cg_hide_until_vote").val();
var cg_vote_in_gallery = $("#cg_vote_in_gallery").val();
var cg_allow_rating = $("#cg_allow_rating").val();
var cg_user_login_check = $("#cg_user_login_check").val();
var cg_check_login = $("#cg_check_login").val();
var cg_VotesPerUser = $("#cg_VotesPerUser").val();
var cg_activate_gallery_slider = $('#cg_activate_gallery_slider').val();

var cg_show_image_check = 0;
if($("#cg_show_image_check").length >=1){
    cg_show_image_check = 1;
}


jQuery( document ).on( 'click', 'img[id*=cg_rate]', function(e) {
  //  console.log($("#cg_photo_contest_is_over_ajax_request").val());

    if(cg_check_login==1 && cg_user_login_check==0){
			alert($("#cg_OnlyRegisteredUsersCanVote").val());
			return false;
		}
		else{

	// Für vote out of gallery sollen elemente wenn bewertet wird angezeigt werden sobald bewertung abgegen wurde
	
		
	var cg_ShowAlways = $("#cg_ShowAlways").val();
	
	if($('#cg_overlay').is(':visible')) {
    var sliderVersion = 1;
	}
	else{
	// Ganz wichtig! Ansonsten kann man mobile nicht bewerten!	
	var sliderVersion = 0;	
	
	}
	
	
		var rateOutOfGallery = $('#cg_vote_in_gallery').val();
		var slider = $('#cg_vote_in_slider').val();

	 var cg_given_rating = $(this).attr('alt');

	
	 var cg_galery_id = $('#cg_galeryID').val();
	 var cg_picture_id = $('#cg_picture_id').val();
	 var cg_rate_value = cg_given_rating;
	 var cg_actual_value_id = $('#cg_actual_value_id').val();
	 var cg_rating_picture_id = "#rating_cgd-"+cg_picture_id+"";
	 
	 var cg_ContestEndTime = $('#cg_ContestEndTime').val();
	 var cg_ContestEnd = $('#cg_ContestEnd').val();
	var cg_AlreadyRatedText = $('#cg_AlreadyRated').val();
	//var cg_photo_contest_over = $('#cg_photo_contest_over').val();

	 //Variante für Slider (cg_rate_value ist auch so vorhanden)
	// alert(1); 
	 //if (typeof cg_galery_id == 'undefined') {var cg_galery_id = $("#cg_galeryID").val();}
	 //f (typeof cg_IpBlock == 'undefined') {var cg_IpBlock = 37;} 
	 
	  
	 //Variante für Slider --- ENDE
	 
	// alert("cg_galery_id"+cg_galery_id);
	// alert("cg_picture_id"+cg_picture_id);
	// alert("cg_rate_value"+cg_rate_value);
//	 alert("cg_AlreadyRatedText"+cg_AlreadyRatedText);
	// alert("cg_IpBlock"+cg_IpBlock);
	 	 
	// var cg_rating_picture_id = "#rating_cg-"+cg_picture_id+"";
	
	//alert(cg_ContestEndTime);
	var ActualTimeSeconds = Math.round((new Date).getTime()/1000);
	//alert(milliseconds);

		//alert(cg_ContestEndTime);
	 
	 if((cg_ContestEndTime>ActualTimeSeconds && cg_ContestEnd == 1) || (cg_ContestEnd != 1 && cg_ContestEnd != 2)){


	 	if($("#cg_photo_contest_is_over_ajax_request").val()==1){

            if(jQuery( "#cg_slider_main_div" ).is(':visible')){
                jQuery( "#cg_ThePhotoContestIsOver_dialog" ).dialog({
                    appendTo: "#cg_slider_main_div",
                    closeText: "X",
                    minHeight: 0,
                    title: null
                });
            }
            else{
                if(jQuery( "#cg_main_div" ).is(':visible')){//show-image.php
                    jQuery( "#cg_ThePhotoContestIsOver_dialog" ).dialog({
                        appendTo: "#cg_main_div",
                        closeText: "X",
                        minHeight: 0,
                        title: null
                    });
                }
                else{
                    jQuery( "#cg_ThePhotoContestIsOver_dialog" ).dialog({
                        appendTo: "#mainCGdiv",
                        closeText: "X",
                        minHeight: 0,
                        title: null
                    });
                }
            }

            jQuery('#cg_slider_main_div .ui-button, #mainCGdiv .ui-button, #cg_main_div .ui-button').removeAttr('title');



        }
	 
	 var loadingSource = $('#cg_loadingGifSource').val();
	 
	// alert(loadingSource);
	 
	 // Slider Version
	 if (slider==1) {
		
		var cg_picture_id =  parseInt(this.id.substr(12));
var ratingElement = $("#ratingCGslider"+cg_picture_id).html();
var ratingElementToAppend = $("#ratingCGslider"+cg_picture_id);
$("#ratingCGslider"+cg_picture_id).empty();
		//alert(2);
	 $("#ratingCGslider"+cg_picture_id+"").append("<img class='cg_loading_gif_img' src='"+loadingSource+"' width='19px' height='19px' style='display:hidden;'>");
	 $("#cg_loading_gif_img").load(function(){$(this).toggle();});
	 var typeVoting = "slider";
	 // Zur späteren Wiedererkennung bei HideUntilVote ob würd dieses Bild schon gewertet wurde oder nicht
	 $("#cg_check_voted"+cg_picture_id).val(1);
		 }
		 
	 // Out of Gallery Version
	 else if (rateOutOfGallery==1) {
         var ratingElement = $(this).parent().parent().html();
         var ratingElementToAppend = $(this).parent().parent();
		$(this).parent().parent().empty();
		var cg_picture_id =  parseInt(this.id.substr(12));
		//alert(2);
	 $("#cg_gallery_rating_div_child"+cg_picture_id+"").append("<img class='cg_loading_gif_img' src='"+loadingSource+"' width='19px' height='19px' style='display:hidden;'>");
	 $("#cg_loading_gif_img").load(function(){$(this).toggle();});
	 var typeVoting = "gallery";
	 // Zur späteren Wiedererkennung bei HideUntilVote ob würd dieses Bild schon gewertet wurde oder nicht
	 $("#cg_check_voted"+cg_picture_id).val(1);
		 } 
		 
	 // Normale Version
	 else{
         var ratingElement = $("#cg_div_rate_stars_image").html();
         var ratingElementToAppend = $("#cg_div_rate_stars_image");
$("#cg_div_rate_stars_image").empty();
	 $("#cg_div_rate_stars_image").append("<img class='cg_loading_gif_img' src='"+loadingSource+"' width='19px' height='19px' style='display:hidden;'>");
	 $("#rating_cg").empty();
	 $("#cg_loading_gif_img").load(function(){$(this).toggle();});
	 var typeVoting = "normal";
	// alert(typeVoting);
	 }
	 
	 
	// alert(typeVoting);
	//alert("cg_galery_id "+cg_galery_id);
//alert("cg_picture_id "+cg_picture_id);
	//alert("cg_rate_value "+cg_rate_value);
	//alert("typeVoting "+typeVoting);
	//alert("cg_AlreadyRatedText "+cg_AlreadyRatedText);
	//alert("cg_IpBlock "+cg_IpBlock);
//	alert("works");
	//alert(typeVoting);
	//var post_id = jQuery(this).data('id');
	//var post_id = 657567;
	

	
	//alert(post_cg_rate_wordpress_ajax_script_function_name);
	//alert(cg_rate_ajax_url);
        // console.log('rate');
	
	jQuery.ajax({
		url : post_cg_rate_wordpress_ajax_script_function_name.cg_rate_ajax_url,
		type : 'post',
		data : {
			action : 'post_cg_rate',
			action1 : cg_galery_id,
			action2 : cg_picture_id,
			action3 : cg_rate_value,
			action4 : typeVoting,
			action5 : cg_AlreadyRatedText,
			action6 : cg_show_image_check
		},
		success : function( response ) {

			//111 ist photo contest end
            if($.trim(response)=='111'){
                if(jQuery( "#cg_slider_main_div" ).is(':visible')){
                    jQuery( "#cg_ThePhotoContestIsOver_dialog" ).dialog({
                        appendTo: "#cg_slider_main_div",
                        closeText: "X",
                        minHeight: 0,
                        title: null
                    });
                }
                else{
                    if(jQuery( "#cg_main_div" ).is(':visible')){//show-image.php
                        jQuery( "#cg_ThePhotoContestIsOver_dialog" ).dialog({
                            appendTo: "#cg_main_div",
                            closeText: "X",
                            minHeight: 0,
                            title: null
                        });
                    }
                    else{
                        jQuery( "#cg_ThePhotoContestIsOver_dialog" ).dialog({
                            appendTo: "#mainCGdiv",
                            closeText: "X",
                            minHeight: 0,
                            title: null
                        });
                    }
                }
                jQuery('#cg_slider_main_div .ui-button, #mainCGdiv .ui-button, #cg_main_div .ui-button').removeAttr('title');

                $("#cg_photo_contest_is_over_ajax_request").val(1);
                ratingElementToAppend.html(ratingElement);

            }
			else{

                $("#cg_photo_contest_is_over_ajax_request").val(0);


                // Prüfen ob Rating geklickt wurde und AJAX call lädt
                $("#cg_rating_ajax_call").val(1);


                if(typeVoting=="slider" || typeVoting=="gallery"){
                    jQuery("#ratingCGslider"+cg_picture_id+"").html( response );
                    jQuery("#cg_gallery_rating_div_child"+cg_picture_id+"").html( response );
                }
                else{
                    jQuery("#cg_div_rate_stars_image").html( response );
                }

                if(cg_activate_gallery_slider==1){

                    var object = jQuery('#mainCGallery #cg_gallery_rating_div'+cg_picture_id+'').parent();
                    var clonedObject = object.clone();
                    clonedObject.find('input').remove();
                    var carrouselId = 'carrousel-cg_image_id-'+object.attr('data-cg_image_id');
                    jQuery("#carrousel-cg_image_id-"+cg_picture_id+"").remove();
                    clonedObject.removeClass().removeAttr('id').removeAttr('style').removeAttr('data-cg_image_id')
                        .attr('id',carrouselId).appendTo("#cg-carrousel-slider-content #cg-carrousel-container-id-"+cg_picture_id+"");
                    clonedObject.addClass('cg-carrousel-img-status').find('div').removeClass().removeAttr('id');

                    // Muss hier nochmal extra gemacht werde, da das CSS nicht greift. Zum letzten div durchtraversieren.
                    clonedObject.children().children().children().last().prev().css('padding-left','3px');
                    clonedObject.find('img').removeAttr('id');

                }

			}
			





		}
	});

	return false;
	 }
	else{
		
	//	var cg_photo_contest_over = $("#cg_photo_contest_over").val();
	//	alert(cg_photo_contest_over);

         if(jQuery( "#cg_slider_main_div" ).is(':visible')){
             jQuery( "#cg_ThePhotoContestIsOver_dialog" ).dialog({
                 appendTo: "#cg_slider_main_div",
                 closeText: "X",
                 minHeight: 0,
                 title: null
             });
         }
         else{
             if(jQuery( "#cg_main_div" ).is(':visible')){//show-image.php
                 jQuery( "#cg_ThePhotoContestIsOver_dialog" ).dialog({
                     appendTo: "#cg_main_div",
                     closeText: "X",
                     minHeight: 0,
                     title: null
                 });
             }
             else{
                 jQuery( "#cg_ThePhotoContestIsOver_dialog" ).dialog({
                     appendTo: "#mainCGdiv",
                     closeText: "X",
                     minHeight: 0,
                     title: null
                 });
             }
         }

         jQuery('#cg_slider_main_div .ui-button, #mainCGdiv .ui-button, #cg_main_div .ui-button').removeAttr('title');



         return false;
		
	}
}	
})

})