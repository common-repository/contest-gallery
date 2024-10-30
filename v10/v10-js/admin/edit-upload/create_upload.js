// !!! Nicht löschen Basis klasse für cgJsClass.editUpload.tinymce
var cgJsClass = cgJsClass || {};
cgJsClass.editUpload = {};


jQuery(document).ready(function($){

    cgCheckHideField();

	//$('.wp-editor-wrap').removeClass('tmce-active');
//	$('.wp-editor-wrap').addClass('html-active');
//	$('.switch-html').click();

    // Ganz wichtig, damit später über allen elmenten überragt.
 //   htmlFieldTemplate_ifr = $('#htmlEditorTemplateDiv').clone();
//    $('#htmlEditorTemplateDiv').remove();
   // console.log(htmlFieldTemplate_ifr);
   // $('#htmlEditorTemplateDiv').remove();

/*    $('#htmlFieldTemplate_ifr').contents().find('html').empty();
    console.log(htmlFieldTemplate_ifr);
    $('#htmlEditorTemplateDiv').appendTo('#ausgabe1');
    $(htmlFieldTemplate_ifr).appendTo('#htmlFieldTemplate_ifr');*/

	$("#cg_changes_saved").fadeOut(4000);
	
	// Allow only to press numbers as keys in input boxes

  //called when key is pressed in textbox
  $(".Max_Char, .Min_Char").keypress(function (e) {
     //if the letter is not digit then display error and don't type anything
     if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
        //display error message
        //$("#cg_options_errmsg").html("Only numbers are allowed").show().fadeOut("slow");
               return false;
    }
   });


// Allow only to press numbers as keys in input boxes --- END

	   
	  
    $( "#ausgabe1" ).sortable({ placeholder: "ui-state-highlight",
        handle: ".cg_drag_area",
        cursor: "move",
        start:  function( event, ui ) {

            var $element = $(ui.item);

            $element.closest('#ausgabe1').find('.ui-state-highlight').addClass($element.get(0).classList.value).html($element.html());

        },
		stop:  function( event, ui ) {


			if(ui.item.hasClass('htmlField')){
				//console.log('stop html');
				//cgJsClass.editUpload.tinymce.copyPasteTinymceIframeContent();
			}


if(document.readyState === "complete"){

var v = 0;
//var total = $('.formField').length;



		  $( ".formField" ).each(function( i ) {
		  
		v++;

		//$(this).find('.fieldnumber').val(v); 
		$(this).find('.changeUploadFieldOrder').val(v); 
		//$(this).find('.changeFieldOrderUsersEntries').val(v); 

		// alert(v);
		

				  
		   });  
		   
		   v = 0;

    cgCheckHideField();
		   
		   }
  
   }


	});



  
  // Use as url for images
  
  
  var isChecked = 0;
  
    $( ".Use_as_URL" ).each(function() {
	  
		if($(this).is( ":checked" )){isChecked = 1;}

  });
  
  
   $(document).on('click', '.Use_as_URL', function(e){
  //	$(".cg_info_show_gallery").click(function(){
		
		
		if($(this).is( ":checked" ) && isChecked==1){isChecked = 0;}
		
		
	if(isChecked==1){
	  
	 
	 $(this).prop("checked",false); 
	   isChecked = 0;
  }
		
		
else{
  $( ".Use_as_URL" ).each(function() {
	  
		$(".Use_as_URL").prop("checked",false);

  });

  $(this).prop("checked",true);
  

	  isChecked = 1;
	  

		
}

	
});	 
  
  
  
  // Use as url for images --- ENDE
  
  
  
  // Show info in gallery
  
  
  var isChecked = 0;
  
    $( ".cg_info_show_gallery" ).each(function() {
	  
		if($(this).is( ":checked" )){isChecked = 1;}

  });
  
  
   $(document).on('click', '.cg_info_show_gallery', function(e){
  //	$(".cg_info_show_gallery").click(function(){
		
		
		if($(this).is( ":checked" ) && isChecked==1){isChecked = 0;}
		
		
	if(isChecked==1){
	  
	 
	 $(this).prop("checked",false); 
	   isChecked = 0;
  }
		
		
else{
  $( ".cg_info_show_gallery" ).each(function() {
	  
		$(".cg_info_show_gallery").prop("checked",false);

  });

  $(this).prop("checked",true);
  

	  isChecked = 1;
	  

		
}

/*
	if($("#ScaleSizesGalery").is( ":checked" )){
	
	$("#ScaleWidthGalery").prop("checked",false);
	$( "#ScaleSizesGalery1" ).attr("disabled",false);
	$( "#ScaleSizesGalery2" ).attr("disabled",false);
	$( "#ScaleSizesGalery1" ).css({ 'background': '#ffffff' });
	$( "#ScaleSizesGalery2" ).css({ 'background': '#ffffff' });
	
	}
	
	else{

	$("#ScaleWidthGalery").prop("disabled",false);
	$( "#ScaleSizesGalery1" ).attr("disabled",true);
	$( "#ScaleSizesGalery2" ).attr("disabled",true);
	$( "#ScaleSizesGalery1" ).css({ 'background': '#e0e0e0' });
	$( "#ScaleSizesGalery2" ).css({ 'background': '#e0e0e0' });
	
		if($("#ScaleWidthGalery").is( ":checked" )){}
		else{
		$( "#ScaleWidthGalery" ).prop("checked",true);
		$( "#ScaleSizesGalery1" ).attr("disabled",false);
		$( "#ScaleSizesGalery1" ).css({ 'background': '#ffffff' });
		}
	
	}*/
	
});	 


  // Show info in gallery -- ENDE
	
	
function cgCheckHideField() {

	if($('.cg-active input[type="checkbox"]').length>=1){
        $('.cg-active input[type="checkbox"]').each(function (index) {

            var order = index+1;
            $(this).attr('name','hide['+order+']');

        });

	}



}
    $(".cg-active input[type=\"checkbox\"]").each(function(){
        if($(this).prop('checked')==true){
            $(this).closest('.formField').addClass('cg_disable');
        }
        else{
            $(this).closest('.formField').removeClass('cg_disable');
        }
    });


$(document).on('click',".cg-active input[type=\"checkbox\"] ",function(){
	if($(this).prop('checked')==true){
        $(this).closest('.formField').addClass('cg_disable');
	}
	else{
        $(this).closest('.formField').removeClass('cg_disable');
    }
});

	
  
  
$(document).on('click', '.cg_delete_form_field', function(e){
	
//var del = arg;
//var del1 = arg1;
 
 	var del = $(this).attr("alt");
	var del1 = $(this).attr("titel");

	var categoryField = false;

	if($(this).closest('.formField').hasClass('selectCategoriesField')){
        categoryField = true;
	}

    if($(this).closest('.htmlField').length>=1 || $(this).closest('.captchaRoField').length>=1 || $(this).closest('.checkAgreementField').length>=1){
		var infoDeleteText = "";
    }
    else{
    	var infoDeleteText = "All Contest Gallery user information connected to this field will be deleted.";
	}



    if (confirm("Delete field? "+infoDeleteText+"")) {
       // alert("Clicked Ok");
		//confirmForm();
		fDeleteFieldAndData(del,del1,categoryField);
	    return true;
    } else {
		var test = $("#"+del).find('.fieldValue').val();
		
        return false;
    }


});
 
 
 /*function checkMe(arg,arg1) {


}*/

// Delete field only

//arg="sdfgsdfgsd";

 $(document).on('click', '.cg_delete_form_field_new', function(e){

 var arg = $(this).attr("alt");

 if($(this).hasClass('deleteHTMLfield')){
	 $(this).closest('.formField').css('display','none').appendTo('#cgTinymceCollection');
 }
 else{
     $("#"+arg).remove();
 }



});


// Delete field only --- ENDE

// Delete field and Data

function fDeleteFieldAndData(arg,arg1,categoryField){

//alert("ARG: "+arg);
//alert("ARG1: "+arg1);

$("#"+arg).remove();
if(categoryField){
    $( "#ausgabe1").append("<input type='hidden' name='deleteFieldnumber[deleteCategoryFields]' value="+arg1+">");
}
else{
    $( "#ausgabe1").append("<input type='hidden' name='deleteFieldnumber' value="+arg1+">");
}

	if(document.readyState === "complete"){

        cgCheckHideField();

	// alert('READY!');
	//$('#submitForm').click();
	//alert("This option is not available in the Lite Version.");
	$('#submitForm').click();
	}




}

// Delete field and Data --- ENDE

// Überprüfen ob der Upload des Feldes im Frontend notwendig ist. Wenn Häckchen raus ist, erscheint ein zusätzliches Feld mit upload[] und Nummer der checkbox der Div zur späteren Feststellung.--- END


// Ob das Feld notwendig ist oder nicht soll als on oder als off mit gesendet werden

	 // function checkNecessary(){
	 //$('.necessary-check').live('click', function() {
	 //$('.necessary-check').on('click', function() {
$(document).on('click', '.necessary-check', function(e){

	
	//$(".necessary-check").click(function(){

	if($(this).is( ":checked" )){
	
		$(this).parent().find('.necessary-hidden').remove();
		
		//alert(1);
	}
	
	else{
			//$(this).prop("checked",false);
			$(this).removeAttr('checked');
		$(this).parent().append("<input type='hidden' class='necessary-hidden'  name='upload[]' value='off' />");

	//alert(2);
	}


});




//}	

// Ob das Feld notwendig ist oder nicht soll als on oder als off mit gesendet werden --- ENDE
	




	// Bestimmung der Anzahl der existierenden Div Felder in #ausgabe1 zur Bestiummung der Feldnummer in der Datenbank


    var countChildren = $('#ausgabe1').find('.formField').length;
	
	// Bestimmung der Anzahl der existierenden Div Felder in #ausgabe1 zur Bestiummung der Feldnummer in der Datenbank  ---- ENDE

// Check Box

// 1 = Feldtyp
// 2 = Feldreihenfolge
// 3 = Feldname
// 4 = Feldinhalt
// 5 = Felderfordernis


  $(document).on('click',"#cg_create_upload_add_field",function(){
  
  // User Fields here  
  
	if($('#dauswahl').val() == "cb") {
	
	countChildren++;
	
	// alert(countChildren);
	
	var cbCount = 60+$('.checkAgreementField').length;
	var cbHiddenCount = 600+$('.checkAgreementField').length;
	
	//alert(nfCount);
	
	if($('.checkAgreementField').length == 3){
     alert("This field can be produced maximum 3 times");
	}
	else{$("#ausgabe1").prepend("<div id='"+ cbCount +"' class='formField checkAgreementField'>"+
    "<div class='cg_drag_area'></div>"+
	"<div class='formFieldInnerDiv'>"+
	"<input type='hidden' name='upload[]' value='cb'>"+
	"<input type='hidden' value='"+ countChildren +"' name='addField[]' class='fieldValue'>"+ // Nummer des neuen Feldes wird extra versendet
	"<input type='hidden' value='nf' name='addField[]'>"+
	//"<input type='hidden' name='upload[]' class='fieldnumber' value='"+ countChildren +"'>"+// Feldnummer wird vergeben zur Orientierung in der Datenbank
	//"<input type='hidden' class='fieldnumber' value='"+ countChildren +"'>"+
	//"<input type='hidden' name='upload[]' value='"+ countChildren +"' size='30' class='changeUploadFieldOrder' >"+// Feldreihenfolge
	"<strong>Check agreement </strong><br/>"+
	"<input type='text' name='upload[]' value='Check agreement' maxlength='100' size='30'>"+
	"<input type='hidden' name='actualID[]' value='placeholder' >"+// Platzhalter statt aktueller Feld ID
	"<input class='cg_delete_form_field_new' type='button' value='-' style='width:20px;' alt='"+ cbCount +"' ><br>"+
	"<input type='checkbox' disabled >"+
	"<input type='text' name='upload[]' placeholder='HTML tags allowed'  maxlength='1000' style='width:832px;'>"+
	"<br><br>Required <input type='checkbox' class='necessary-check' name='upload[]' disabled checked >"+
	"<input type='hidden' name='upload[]' class='necessary-hidden' value='off' >" +
		"<span class='cg-active'>Hide <input type='checkbox' name='hide[]'></span>" +
		"<br/></div></div>");

       // location.href = "#"+cbCount+"";
        location.href = "#dauswahl";
	}




    }


	if($('#dauswahl').val() == "nf") {

	countChildren++;

	// alert(countChildren);

	var nfCount = 10+$('.inputField').length;
	var nfHiddenCount = 100+$('.inputField').length;

	//alert(nfCount);

	if($('.inputField').length == 20){
     alert("This field can be produced maximum 20 times");
	}
	else{$("#ausgabe1").prepend("<div id='"+ nfCount +"' class='formField inputField' >"+
	"<div class='cg_drag_area'></div>"+
	"<div class='formFieldInnerDiv'>"+
	"<input type='hidden' name='upload[]' value='nf'>"+
	"<input type='hidden' value='"+ countChildren +"' name='addField[]' class='fieldValue'>"+ // Nummer des neuen Feldes wird extra versendet
	"<input type='hidden' value='nf' name='addField[]'>"+
	//"<input type='hidden' name='upload[]' class='fieldnumber' value='"+ countChildren +"'>"+// Feldnummer wird vergeben zur Orientierung in der Datenbank
	//"<input type='hidden' class='fieldnumber' value='"+ countChildren +"'>"+
	//"<input type='hidden' name='upload[]' value='"+ countChildren +"' size='30' class='changeUploadFieldOrder'>"+// Feldreihenfolge
     "<strong>Input</strong><br/>"+
	"<input type='text' name='upload[]["+nfCount+"]' value='Name' maxlength='100' size='30'>"+

		// Show input in gallery Bereich
	"<div style='width:160px;float:right;text-align:right;'>Show info in gallery: &nbsp;"+
	"<input type='checkbox' class='cg_info_show_gallery' style='margin-top:0px;' name='Field1IdGalleryView["+nfCount+"]'>"+
	"</div>"+
	// Show input in gallery Bereich --- ENDE

		// Show input in Slider Bereich
	"<div style='width:160px;float:right;text-align:right;margin-right:12px;'>Show info in slider: &nbsp;"+
	"<input type='checkbox' class='cg_info_show_slider' style='margin-top:0px;' name='cg_f_input_id_show_slider["+nfCount+"]' $checked>"+
	"</div>"+
	// Show input in Slider Bereich --- ENDE

		// Das Feld soll als URL agieren
/*	"<div style='width:210px;float:right;text-align:right;margin-right:10px;'>Use this field as images url: &nbsp;"+
	"<input type='checkbox' class='Use_as_URL' style='margin-top:0px;' name='Use_as_URL["+nfCount+"]'>"+
	"</div>"+*/
	// Das Feld soll als URL agieren --- ENDE



	"<input type='hidden' name='actualID[]' value='placeholder' >"+// Platzhalter statt aktueller Feld ID
	"<input class='cg_delete_form_field_new' type='button' value='-' style='width:20px;' alt='"+ nfCount +"'><br/>"+
	"<input type='text' name='upload[]' placeholder='Placeholder'  maxlength='1000' value='' style='width:855px;'><br/>"+
	"Min. number of characters:&nbsp; <input type='text' class='Min_Char' name='upload[]' value='3' size='7' maxlength='4' value=' '><br/>"+
	"Max. number of characters: <input type='text' class='Max_Char' name='upload[]' value='100' size='7' maxlength='4' value=' '><br/>"+
	"<br>Required <input type='checkbox' class='necessary-check' name='upload[]' >"+
	"<input type='hidden' name='upload[]' class='necessary-hidden' value='off' >" +
		"<span class='cg-active'>Hide <input type='checkbox' name='hide[]'></span>" +
		"<br/></div></div></div>");

        //location.href = "#"+nfCount+"";
        location.href = "#dauswahl";


	}

	//alert(nfCount);
	/*
	$('html, body').animate({
	scrollTop: $("#'"+nfCount+"'").offset().top
    }, 400);
	$("html, body").animate({ scrollTop: $("#12").scrollTop() }, 1000);*/



    }


	if($('#dauswahl').val() == "url") {

	countChildren++;

	// alert(countChildren);

	var urlCount = 100+$('.inputField').length;
	var urlHiddenCount = 1000+$('.inputField').length;

	//alert(nfCount);

	if($('.inputField').length == 20){
     alert("This field can be produced maximum 10 times");
	}
	else{$("#ausgabe1").prepend("<div id='"+ urlCount +"' class='formField inputField'>"+
	"<div class='cg_drag_area'></div>"+
	"<div class='formFieldInnerDiv'>"+
	"<input type='hidden' name='upload[]' value='url'>"+
	"<input type='hidden' value='"+ countChildren +"' name='addField[]' class='fieldValue'>"+ // Nummer des neuen Feldes wird extra versendet
	"<input type='hidden' value='url' name='addField[]'>"+
	//"<input type='hidden' name='upload[]' class='fieldnumber' value='"+ countChildren +"'>"+// Feldnummer wird vergeben zur Orientierung in der Datenbank
	//"<input type='hidden' class='fieldnumber' value='"+ countChildren +"'>"+
	//"<input type='hidden' name='upload[]' value='"+ countChildren +"' size='30' class='changeUploadFieldOrder'>"+// Feldreihenfolge
     "<strong>URL</strong><br/>"+
	"<input type='text' name='upload[]["+urlCount+"]' value='Homepage' maxlength='100' size='30'>"+

		// Show input in gallery Bereich
	"<div style='width:160px;float:right;text-align:right;'>Show info in gallery: &nbsp;"+
	"<input type='checkbox' class='cg_info_show_gallery' style='margin-top:0px;' name='Field1IdGalleryView["+urlCount+"]'>"+
	"</div>"+
	// Show input in gallery Bereich --- ENDE

		// Show input in Slider Bereich
	"<div style='width:160px;float:right;text-align:right;margin-right:12px;'>Show info in slider: &nbsp;"+
	"<input type='checkbox' class='cg_info_show_slider' style='margin-top:0px;' name='cg_f_input_id_show_slider["+urlCount+"]' $checked>"+
	"</div>"+
	// Show input in Slider Bereich --- ENDE

		// Das Feld soll als URL agieren
/*	"<div style='width:210px;float:right;text-align:right;margin-right:10px;'>Use this field as images url: &nbsp;"+
	"<input type='checkbox' class='Use_as_URL' style='margin-top:0px;' name='Use_as_URL["+urlCount+"]'>"+
	"</div>"+*/
	// Das Feld soll als URL agieren --- ENDE



	"<input type='hidden' name='actualID[]' value='placeholder' >"+// Platzhalter statt aktueller Feld ID
	"<input class='cg_delete_form_field_new' type='button' value='-' style='width:20px;' alt='"+ urlCount +"'><br/>"+
	"<input type='text' name='upload[]' placeholder='www.example.com'  maxlength='1000' value='' style='width:855px;'><br/>"+
	"<br>Required <input type='checkbox' class='necessary-check' name='upload[]' >"+
	"<input type='hidden' name='upload[]' class='necessary-hidden' value='off' >" +
		"<span class='cg-active'>Hide <input type='checkbox' name='hide[]'></span>"+
		"<br/></div></div>");

   //     location.href = "#"+urlCount+"";
        location.href = "#dauswahl";


    }

	//alert(nfCount);
	/*
	$('html, body').animate({
	scrollTop: $("#'"+nfCount+"'").offset().top
    }, 400);
	$("html, body").animate({ scrollTop: $("#12").scrollTop() }, 1000);*/



    }



	var kfCount = 20+$('.textareaField').length;
	var kfHiddenCount = 200+$('.textareaField').length;

	if($('#dauswahl').val() == "kf") {

		countChildren++;

		// alert(countChildren);


	if($('.textareaField').length == 10){
     alert("This field can be produced maximum 10 times");
	}



	else{$("#ausgabe1").prepend("<div id='"+ kfCount +"' class='formField textareaField'>" +
	"<div class='cg_drag_area'></div>"+
	"<div class='formFieldInnerDiv'>"+
	"<input type='hidden' name='upload[]' value='kf'>"+
	"<input type='hidden' value='"+ countChildren +"' name='addField[]' class='fieldValue'>"+ // Nummer des neuen Feldes wird extra versendet
	"<input type='hidden' value='kf' name='addField[]'>"+
	//"<input type='hidden' name='upload[]' class='fieldnumber' value='"+ countChildren +"'>"+// Feldnummer wird vergeben zur Orientierung in der Datenbank
	//"<input type='hidden' class='fieldnumber' value='"+ countChildren +"'>"+
	//"<input type='hidden' name='upload[]' value='"+ countChildren +"' size='30' class='changeUploadFieldOrder'>"+// Feldreihenfolge
     "<strong>Textarea</strong><br/>"+
	"<input type='text' name='upload[]["+kfCount+"]' size='30' maxlength='100' value='Comment'>"+


	// Show input in gallery Bereich
	"<div style='width:160px;float:right;text-align:right;'>Show info in gallery: &nbsp;"+
	"<input type='checkbox' class='cg_info_show_gallery' style='margin-top:0px;' name='Field1IdGalleryView["+kfCount+"]' $checked>"+
	"</div>"+
	// Show input in gallery Bereich --- ENDE

		// Show input in Slider Bereich
	"<div style='width:160px;float:right;text-align:right;margin-right:12px;'>Show info in slider: &nbsp;"+
	"<input type='checkbox' class='cg_info_show_slider' style='margin-top:0px;' name='cg_f_input_id_show_slider["+kfCount+"]' $checked>"+
	"</div>"+
	// Show input in Slider Bereich --- ENDE

	"<input type='hidden' name='actualID[]' value='placeholder' >"+// Platzhalter statt aktueller Feld ID
	"<input class='cg_delete_form_field_new' type='button' value='-' style='width:20px;' alt='"+ kfCount +"'><br/>"+
	"<textarea name='upload[]' maxlength='10000' rows='10' value='' style='width:857px;' placeholder='Placeholder' ></textarea><br/>"+
	"Min. number of characters:&nbsp; <input type='text' class='Min_Char' name='upload[]' value='3' size='7' maxlength='4' value=' '><br/>"+
	"Max. number of characters: <input type='text' class='Max_Char' name='upload[]' value='1000' size='7' maxlength='4' value=' '><br/>"+
	"<br>Required <input type='checkbox' class='necessary-check' name='upload[]' >"+
	"<input type='hidden' name='upload[]' class='necessary-hidden' value='off' >" +
        "<span class='cg-active'>Hide <input type='checkbox' name='hide[]'></span>"+
		"<br/></div></div>");

		//location.href = "#"+kfCount+"";
        location.href = "#dauswahl";


    }



    }



	var seCount = 70+$('.selectField').length;
	var seHiddenCount = 700+$('.selectField').length;

	if($('#dauswahl').val() == "se") {

		countChildren++;

	if($('.selectField').length == 10){
     alert("This field can be produced maximum 10 times");
	}

	else{$("#ausgabe1").prepend("<div id='"+ seCount +"' class='formField selectField'>" +
        "<div class='cg_drag_area'></div>"+
        "<div class='formFieldInnerDiv'>"+
		"<input type='hidden' name='upload[]' value='se'>"+
	"<input type='hidden' value='"+ countChildren +"' name='addField[]' class='fieldValue'>"+ // Nummer des neuen Feldes wird extra versendet
	"<input type='hidden' value='se' name='addField[]'>"+
	//"<input type='hidden' name='upload[]' class='fieldnumber' value='"+ countChildren +"'>"+// Feldnummer wird vergeben zur Orientierung in der Datenbank
	//"<input type='hidden' class='fieldnumber' value='"+ countChildren +"'>"+
	//"<input type='hidden' name='upload[]' value='"+ countChildren +"' size='30' class='changeUploadFieldOrder'>"+// Feldreihenfolge
    "<strong>Select</strong><br/>"+
	"<input type='text' name='upload[]["+seCount+"]' size='30' maxlength='100' value='Select' placeholder='Title of your select box'>"+


	// Show input in gallery Bereich
	"<div style='width:160px;float:right;text-align:right;'>Show info in gallery: &nbsp;"+
	"<input type='checkbox' class='cg_info_show_gallery' style='margin-top:0px;' name='Field1IdGalleryView["+seCount+"]' $checked>"+
	"</div>"+
	// Show input in gallery Bereich --- ENDE

		// Show input in Slider Bereich
	"<div style='width:160px;float:right;text-align:right;margin-right:12px;'>Show info in slider: &nbsp;"+
	"<input type='checkbox' class='cg_info_show_slider' style='margin-top:0px;' name='cg_f_input_id_show_slider["+seCount+"]' $checked>"+
	"</div>"+
	// Show input in Slider Bereich --- ENDE

	"<input type='hidden' name='actualID[]' value='placeholder' >"+// Platzhalter statt aktueller Feld ID
	"<input class='cg_delete_form_field_new' type='button' value='-' style='width:20px;' alt='"+ seCount +"'><br/>"+
	"<textarea name='upload[]' maxlength='10000' rows='10' value='' style='width:857px;' placeholder='Each row one value - Example: &#10;value1&#10;value2&#10;value3&#10;value4&#10;value5&#10;value6' ></textarea><br/>"+
	"<br>Required <input type='checkbox' class='necessary-check' name='upload[]' >"+
	"<input type='hidden' name='upload[]' class='necessary-hidden' value='off' >" +
        "<span class='cg-active'>Hide <input type='checkbox' name='hide[]'></span>"+
		"<br/></div></div>");

      //  location.href = "#"+seCount+"";
        location.href = "#dauswahl";

    }



    }

      var secCount = 90+$('.selectField').length;
      var secHiddenCount = 900+$('.selectField').length;

      if($('#dauswahl').val() == "sec") {

          countChildren++;

          if($('.selectCategoriesField').length == 1){
              alert("This field can be produced maximum 1 time");
          }

          else{$("#ausgabe1").prepend("<div id='"+ secCount +"' class='formField selectCategoriesField'>"+
              "<div class='cg_drag_area'></div>"+
              "<div class='formFieldInnerDiv'>"+
			  "<input type='hidden' name='upload[]' value='sec'>"+
              "<input type='hidden' value='"+ countChildren +"' name='addField[]' class='fieldValue'>"+ // Nummer des neuen Feldes wird extra versendet
              "<input type='hidden' value='sec' name='addField[]'>"+
              //"<input type='hidden' name='upload[]' class='fieldnumber' value='"+ countChildren +"'>"+// Feldnummer wird vergeben zur Orientierung in der Datenbank
              //"<input type='hidden' class='fieldnumber' value='"+ countChildren +"'>"+
              //"<input type='hidden' name='upload[]' value='"+ countChildren +"' size='30' class='changeUploadFieldOrder'>"+// Feldreihenfolge
              "<strong>Select Categories</strong><br/>"+
              "<input class='cg_add_category' type='button' value='Add Category' style='width: auto;'><input type='text' name='upload[]["+secCount+"]' size='30' maxlength='100' value='Category' placeholder='Title of your select category box'>"+

              // Show input in gallery Bereich
              "<div style='width:160px;float:right;text-align:right;'>Show info in gallery: &nbsp;"+
              "<input type='checkbox' class='cg_info_show_gallery' style='margin-top:0px;' name='Field1IdGalleryView["+secCount+"]' $checked>"+
              "</div>"+
              // Show input in gallery Bereich --- ENDE

              // Show input in Slider Bereich
              "<div style='width:160px;float:right;text-align:right;margin-right:12px;'>Show info in slider: &nbsp;"+
              "<input type='checkbox' class='cg_info_show_slider' style='margin-top:0px;' name='cg_f_input_id_show_slider["+secCount+"]' $checked>"+
              "</div>"+
              // Show input in Slider Bereich --- ENDE

              "<input type='hidden' name='actualID[]' value='placeholder' >"+// Platzhalter statt aktueller Feld ID
              "<input class='cg_delete_form_field_new' type='button' value='-' style='width:20px;' alt='"+ secCount +"'><br/>"+
              //"<textarea name='upload[]' maxlength='10000' rows='10' value='' style='width:857px;' placeholder='Each row one value - Example: &#10;value1&#10;value2&#10;value3&#10;value4&#10;value5&#10;value6' ></textarea><br/>"+
              "<br/><div class='cg_categories_arena'></div>"+
              "<br>Required <input type='checkbox' class='necessary-check' name='upload[]' >"+
              "<input type='hidden' name='upload[]' class='necessary-hidden' value='off' >" +
			  "<input type='hidden' name='createNewCategories' value='true'>" +
              "<span class='cg-active'>Hide <input type='checkbox' name='hide[]'></span>"+
			  "<br/></div></div>");

             // location.href = "#"+secCount+"";
              location.href = "#dauswahl";

          }



      }


	if($('#dauswahl').val() == "ef") {

        countChildren++;

        // alert(countChildren);

        var efCount = 30 + $('.emailField').length;
        var efHiddenCount = 300 + $('.emailField').length;

        //alert(nfCount);

        if ($('.emailField').length == 1) {
            alert("This field can be produced only 1 time");
        }
        else {
            $("#ausgabe1").prepend("<div id='" + efCount + "' class='formField emailField'>" +
                "<div class='cg_drag_area'></div>"+
                "<div class='formFieldInnerDiv'>"+
				"<input type='hidden' name='upload[]' value='ef'>" +
                "<div style='margin-bottom:5px;'><b>Note:</b> Do not appear if user is registered and logged in</div>" +
                "<input type='hidden' value='" + countChildren + "' name='addField[]' class='fieldValue'>" + // Nummer des neuen Feldes wird extra versendet
                "<input type='hidden' value='ef' name='addField[]'>" +
                //"<input type='hidden' name='upload[]' class='fieldnumber' value='"+ countChildren +"'>"+// Feldnummer wird vergeben zur Orientierung in der Datenbank
                //"<input type='hidden' class='fieldnumber' value='"+ countChildren +"' class='changeUploadFieldOrder'>"+
                //"<input type='hidden' name='upload[]' value='"+ countChildren +"' size='30'>"+// Feldreihenfolge
                "<input type='hidden' name='actualID[]' value='placeholder' >" +// Platzhalter statt aktueller Feld ID
                "<strong>E-Mail</strong><br/>" +
                "<input type='text' name='upload[][" + efCount + "]' value='E-Mail' maxlength='100' size='30'>" +

                // Show input in gallery Bereich
                "<div style='width:160px;float:right;text-align:right;'>Show info in gallery: &nbsp;" +
                "<input type='checkbox' class='cg_info_show_gallery' style='margin-top:0px;' name='Field1IdGalleryView[" + efCount + "]' $checked>" +
                "</div>" +
                // Show input in gallery Bereich --- ENDE

                // Show input in Slider Bereich
                "<div style='width:160px;float:right;text-align:right;margin-right:12px;'>Show info in slider: &nbsp;" +
                "<input type='checkbox' class='cg_info_show_slider' style='margin-top:0px;' name='cg_f_input_id_show_slider[" + efCount + "]' $checked>" +
                "</div>" +
                // Show input in Slider Bereich --- ENDE

                "<input class='cg_delete_form_field_new' type='button' value='-' style='width:20px;' alt='" + efCount + "'><br/>" +
                "<input type='text' name='upload[]' value='' maxlength='100' placeholder='Placeholder'  style='width:855px;'><br/>" +
                "<br>Required <input type='checkbox' class='necessary-check' name='upload[]' >" +
                "<input type='hidden' name='upload[]' class='necessary-hidden' >" +
                "<span class='cg-active'>Hide <input type='checkbox' name='hide[]'></span>"+
				"<br/></div></div>");

           // location.href = "#" + efCount + "";
            location.href = "#dauswahl";

        }



    }


  	if($('#dauswahl').val() == "ht") {

			// 1 = Feldtyp
			// 2 = Feldtitel
			// 3 = Feldinhalt

	countChildren++;

	// alert(countChildren);

	var htCount = 50+$('.htmlField').length;
	var htHiddenCount = 500+$('.htmlField').length;

	//alert(nfCount);

	if($('.htmlField').length >= 10){
     alert("This field can be produced maximum 10 times");
	}
	else{

		$("#ausgabe1").prepend("<div id='"+ htCount +"' class='formField cg_ht_field htmlField'>"+
            "<div class='cg_drag_area'></div>"+
            "<div class='formFieldInnerDiv'>"+
		"<input type='hidden' name='upload[]' value='ht'>"+
        "<strong>HTML</strong><br/>"+
		"<input type='text' name='upload[]' value='Title' maxlength='100' size='30'>"+
		"<input type='hidden' name='actualID[]' value='placeholder' >"+// Platzhalter statt aktueller Feld ID
		"<input class='cg_delete_form_field_new deleteHTMLfield' type='button' value='-' style='width:20px;' alt='"+htCount +"'> &nbsp; (HTML Field - Title is invisible)<br/><hr>"+
		"</div></div>");

        $(".htmlEditorTemplateDiv").first().appendTo("#"+ htCount +"");
        $(".htmlEditorTemplateDiv").last().css('display','block');
	//	$("#"+ htCount +"").append("<br>");
        $("#"+ htCount +"").append("<span class='cg-active'>Hide <input type='checkbox' name='hide[]'></span>");
        $("#"+ htCount +" .cg-active").first().addClass('cg_add_css_upload_form_html_field');
     //   location.href = "#"+htCount+"";

        location.href = "#dauswahl";


    }


	//alert(nfCount);
	/*
	$('html, body').animate({
	scrollTop: $("#'"+nfCount+"'").offset().top
    }, 400);
	$("html, body").animate({ scrollTop: $("#12").scrollTop() }, 1000);*/


  }

  	if($('#dauswahl').val() == "caRo") {

			// 1 = Feldtyp
			// 2 = Feldtitel
			// 3 = Feldinhalt

	countChildren++;

	// alert(countChildren);

	var caRoCount = 80+$('.captchaRoField').length;
	var caRoHiddenCount = 800+$('.captchaRoField').length;

	//alert(nfCount);

	if($('.captchaRoField').length >= 1){
     alert("This field can be produced maximum 1 time");
	}
	else{

		$("#ausgabe1").prepend("<div id='"+ caRoCount +"' class='formField captchaRoField'>"+
            "<div class='cg_drag_area'></div>"+
            "<div class='formFieldInnerDiv'>"+
		"<input type='hidden' name='upload[]' value='caRo'>"+
		"<input type='hidden' value='"+ countChildren +"' name='addField[]' class='fieldValue'>"+ // Nummer des neuen Feldes wird extra versendet
		"<input type='hidden' value='caRo' name='addField[]'>"+
		//"<input type='hidden' name='upload[]' class='fieldnumber' value='"+ countChildren +"'>"+// Feldnummer wird vergeben zur Orientierung in der Datenbank
		//"<input type='hidden' class='fieldnumber' value='"+ countChildren +"'>"+
		//"<input type='hidden' name='upload[]' value='"+ countChildren +"' size='30' class='changeUploadFieldOrder'>"+// Feldreihenfolge
        "<strong>Simple Captcha - I am not a robot</strong><br/>"+
		"<input type='checkbox' disabled> "+
		"<input type='text' name='upload[]' value='I am not a robot' maxlength='100' size='30'>"+
		"<input type='hidden' name='actualID[]' value='placeholder' >"+// Platzhalter statt aktueller Feld ID
		"<input class='cg_delete_form_field_new' type='button' value='-' style='width:20px;' alt='"+caRoCount +"'>"+
		"<br/><br>Required <input type='checkbox' class='necessary-check' disabled checked >"+
            "<span class='cg-active'>Hide <input type='checkbox' name='hide[]'></span>"+
		"<br/></div></div>");

       // location.href = "#"+caRoCount+"";

        location.href = "#dauswahl";


    }

	//alert(nfCount);
	/*
	$('html, body').animate({
	scrollTop: $("#'"+nfCount+"'").offset().top
    }, 400);
	$("html, body").animate({ scrollTop: $("#12").scrollTop() }, 1000);*/



 }

      cgCheckHideField();


 });
 
 
	
  /*$("#cg_create_upload_add_field").click(function(){
  
alert("This option is not available in the Lite Version.");
	
 });*/
 

 $(document).on('click','#ausgabe1 .cg_add_category',function () {

    var length = $('.cg_category_field_div').length;
    if(length<1){        length = 1; 	var placeholder = 'Category'+length;    }
    else if(length==1){        length = 2; 	var placeholder = 'Category'+length;    }
    else{length = length+1; var placeholder = 'Category'+length;}

     var cg_categories_arena = $(this).closest('.selectCategoriesField').find('.cg_categories_arena');
 		cg_categories_arena.append('<div class="cg_category_field_div">' +
        '<div class="cg_category_change_order cg_move_view_to_top"><i></i></div>'+
        '<div class="cg_category_change_order cg_move_view_to_bottom"><i></i></div>'+
		'<input class="cg_category_field" placeholder="'+placeholder+'" name="cg_category[]" type="text" />' +
		'<input class="cg_delete_category_field" type="button" value="-" style="width:20px;">' +
		'</div>');

     cg_categories_arena.find('.cg_category_field_div').find('.cg_category_change_order').removeClass('cg_hide');

     cg_categories_arena.find('.cg_category_field_div').first().find('.cg_move_view_to_top').addClass('cg_hide');


 	if(cg_categories_arena.find('.cg_category_field_div').length>=2){
        cg_categories_arena.find('.cg_category_field_div').last().find('.cg_move_view_to_bottom').addClass('cg_hide');
	}

 })


 $(document).on('click','#ausgabe1 .cg_delete_category_field',function (e) {

	e.preventDefault();


     var attr = $(this).attr('data-delete');

	// For some browsers, `attr` is undefined; for others, `attr` is false. Check for both.
     if (typeof attr !== typeof undefined && attr !== false) {
         if (confirm("Delete category field? All Contest Gallery user information connected to this field will be deleted.")) {

             var categoryIDtoRemove = $(this).attr('data-delete');

             $(this).closest('.cg_category_field_div').remove();

             if(document.readyState === "complete"){
                 $('#ausgabe1').append("<input type='input' name='deleteCategory' value='"+categoryIDtoRemove+"'>");
                 $('#submitForm').click();
             }


             return true;

         } else {

             return false;

         }
     }
     else{

         $(this).closest('.cg_category_field_div').remove();

     }



 });

 $(document).on('click','#ausgabe1 .cg_move_view_to_top',function (e) {

     var cg_categories_arena = $(this).closest('.selectCategoriesField').find('.cg_categories_arena');


     if(cg_categories_arena.find('.cg_category_field_div').length==1){
         return false;
     }

     var fieldToDetach = $(this).closest('.cg_category_field_div');
     var insertBeforeField = fieldToDetach.prev();
     fieldToDetach.detach().insertBefore(insertBeforeField);




     cg_categories_arena.find('.cg_category_field_div').find('.cg_category_change_order').removeClass('cg_hide');
     cg_categories_arena.find('.cg_category_field_div').first().find('.cg_move_view_to_top').addClass('cg_hide');
     if(cg_categories_arena.find('.cg_category_field_div').length>=2){
         cg_categories_arena.find('.cg_category_field_div').last().find('.cg_move_view_to_bottom').addClass('cg_hide');
     }

 });


 $(document).on('click','#ausgabe1 .cg_move_view_to_bottom',function (e) {

     var cg_categories_arena = $(this).closest('.selectCategoriesField').find('.cg_categories_arena');

     if(cg_categories_arena.find('.cg_category_field_div').length==1){
     	return false;
	 }


     var fieldToDetach = $(this).closest('.cg_category_field_div');
     var insertAfterField = fieldToDetach.next();
     fieldToDetach.detach().insertAfter(insertAfterField);




     cg_categories_arena.find('.cg_category_field_div').find('.cg_category_change_order').removeClass('cg_hide');
     cg_categories_arena.find('.cg_category_field_div').first().find('.cg_move_view_to_top').addClass('cg_hide');
     if(cg_categories_arena.find('.cg_category_field_div').length>=2){
         cg_categories_arena.find('.cg_category_field_div').last().find('.cg_move_view_to_bottom').addClass('cg_hide');
     }

 });




    if($('#ausgabe1 .cg_categories_arena').length>=1){
        var cg_categories_arena = $('#ausgabe1 .cg_categories_arena');
        cg_categories_arena.find('.cg_category_field_div').find('.cg_category_change_order').removeClass('cg_hide');
        cg_categories_arena.find('.cg_category_field_div').first().find('.cg_move_view_to_top').addClass('cg_hide');
        if(cg_categories_arena.find('.cg_category_field_div').length>=2){
            cg_categories_arena.find('.cg_category_field_div').last().find('.cg_move_view_to_bottom').addClass('cg_hide');
        }
    }
 
  
});