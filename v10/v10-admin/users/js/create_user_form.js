jQuery(document).ready(function($){

    var cgDragIcon = $("#cgDragIcon").val();

    var cgRecaptchaIconUrl = $("#cgRecaptchaIconUrl").val();

    $(document).on('click','.cg_recaptcha_icon',function() {

        $(this).closest('.formField').find('.cg_reca_key').val($('#cgRecaptchaKey').val());

    });


    cgCheckHideField();

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

    $("#cg_changes_saved").fadeOut(3000);
	
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

  cgSortOrder = function () {


          var v = 0;
//var total = $('.formField').length;

      $( ".formField" ).each(function( i ) {

          v++;

          //$(this).find('.fieldnumber').val(v);
          $(this).find('.Field_Type').attr("name","Field_Type["+v+"]");
          $(this).find('.Field_Order').attr("name","Field_Order["+v+"]");
          $(this).find('.Field_Name').attr("name","Field_Name["+v+"]");
          $(this).find('.Field_Id').attr("name","Field_Id["+v+"]");
          $(this).find('.cg_actualID').attr("name","actualID["+v+"]");
          $(this).find('.Field_Content').attr("name","Field_Content["+v+"]");
          $(this).find('.Min_Char').attr("name","Min_Char["+v+"]");
          $(this).find('.Max_Char').attr("name","Max_Char["+v+"]");
          $(this).find('.necessary-check').attr("name","Necessary["+v+"]");
          $(this).find('.necessary-hidden').attr("name","Necessary["+v+"]");


          //$(this).find('.changeFieldOrderUsersEntries').val(v);

          // alert(v);

      });

      v = 0;

  };


// Allow only to press numbers as keys in input boxes --- END
	
  $(function() {
	  
	   
	  
    $( "#ausgabe1" ).sortable({         handle: ".cg_drag_area",
        cursor: "move", placeholder: "ui-state-highlight",
        start: function (event, ui) {

            var $element = $(ui.item);

            // condition for html fields. Deactivate by start first and reinitinalize by stop again later
            var $cgWpEditorContainer = $element.find('.cg-wp-editor-container');
            if($cgWpEditorContainer.length){
                tinymce.EditorManager.execCommand('mceRemoveEditor',true, $cgWpEditorContainer.attr('data-wp-editor-id'));
            }
            // condition for html fields. Deactivate by start first and reinitinalize by stop again later --- END


            $element.closest('#ausgabe1').find('.ui-state-highlight').addClass($element.get(0).classList.value).html($element.html());

        },
        stop:  function( event, ui ) {

            var $element = $(ui.item);

            // condition for html fields. Reinitialize after deactivating when start
            var $cgWpEditorContainer = $element.find('.cg-wp-editor-container');
            if($cgWpEditorContainer.length){
                tinymce.EditorManager.execCommand('mceAddEditor',true, $cgWpEditorContainer.attr('data-wp-editor-id'));
            }
            // condition for html fields. Reinitialize after deactivating when start--- END

            if(document.readyState === "complete"){

                cgSortOrder();
                cgCheckHideField();

            }

        }
	});


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
  

 
 $(document).on('click', '.cg_delete_form_field', function(e){
	
 	var del = $(this).attr("alt");
	var del1 = $(this).attr("titel");

	var confirmText = "Delete field? All Contest Gallery user information connected to this field will be deleted.";

	if($(this).parent().find('.cg_Field_Robot_Type').length || $(this).parent().find('.cg_Field_HTML_Type').length){
        var confirmText = "Delete field?";
	}


    if (confirm(confirmText)) {
       // alert("Clicked Ok");
		//confirmForm();
		fDeleteFieldAndData(del,del1);
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
         $("#cg"+arg).remove();
     }


});

/*
function fDeleteFieldOnly(arg){

// alert(arg);


}*/

// Delete field only --- ENDE

// Delete field and Data

function fDeleteFieldAndData(arg,arg1){

//alert("ARG: "+arg);
//alert("ARG1: "+arg1);



$("#"+arg+"").remove();
$( "#ausgabe1").append("<input type='hidden' name='deleteFieldnumber' value="+arg1+">");

	if(document.readyState === "complete"){
	// alert('READY!');
	//$('#submitForm').click();
	//alert("This option is not available in the Lite Version.");
	$('#submitForm').click();
	}



/*


if(document.readyState === "complete"){

var v = 0;
var total = $('.formField').length;

		  $( ".formField" ).each(function( i ) {
		  
		v++;

		$(this).find('.fieldnumber').val(v); 
		$(this).find('.changeUploadFieldOrder').val(v); 
		$(this).find('.changeFieldOrderUsersEntries').val(v); 


		alert("test"+v);
		

				  
		   });  
		   
		   v = 0;

	if(document.readyState === "complete"){
	alert('READY!');
	$('#submitForm').click();
	}
}*/

}

// Delete field and Data --- ENDE















// Überprüfen ob der Upload des Feldes im Frontend notwendig ist. Wenn Häckchen raus ist, erscheint ein zusätzliches Feld mit upload[] und Nummer der checkbox der Div zur späteren Feststellung.
/*
function checkNecessary(arg,arg1){


	if($("."+arg).val() == arg1){

	// ob Upload oder upload
	var checkName = $( "."+arg ).attr('name');
	alert(checkName);
	$( "."+arg ).remove();
	}

else{

	// ob Upload oder upload
	var checkName = $( "."+arg ).attr('name');
	alert(checkName);
	
	if(checkName.indexOf("upload") >= 0){
	$( "#"+arg ).append("<input type='hidden' name='upload[]' class='"+arg+"' value="+arg1+">");
	}

	else{
	$( "#"+arg ).append("<input type='hidden' name='upload[]' class='"+arg+"' value="+arg1+">");
	}

}

}*/

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



$(document).ready(function(){

    // !IMPORTANT: Do it here when document ready!
    $('.switch-tmce:visible').click();// !IMPORTANT: click only unvisible otherwise breaks functionality of further elements

// Check Box

// 1 = Feldtyp
// 2 = Feldreihenfolge
// 3 = Feldname
// 4 = Feldinhalt
// 5 = Felderfordernis

    $(document).on('change',"#dauswahl",function(){

        if($('select[name="dauswahl"] :selected').hasClass('cg-pro-false')){
            $(this).css('background-color','#95ff79');
            $(this).find('option').not('cg-pro-false').css('background-color','#fff');
            $(this).find('optgroup').css('background-color','#fff');
        }else{
            $(this).css('background-color','#fff');

        }

    });


  $("#cg_create_upload_add_field").click(function(){

      var i = $('.formField').length;
      i++;
  
  
	if($('#dauswahl').val() == "cb") {// Agreement field!!!

        if($('select[name="dauswahl"] :selected').hasClass('cg-pro-false')){
            alert('Only available in PRO version');
            return;
        }
	
	// alert(i);
	
	var cbCount = 60+$('.cg_Field_Check_Agreement_Type').length;
	var cbHiddenCount = 600+$('.cg_Field_Check_Agreement_Type').length;

        var $htmlEditorTemplateDivToAppendForAgreement = $("#cgTinymceCollectionForAgreement .htmlEditorTemplateDivForAgreement").first();
        var editor_id = $htmlEditorTemplateDivToAppendForAgreement.attr('data-wp-editor-id');
	
	//alert(nfCount);
	
	if($('.cg_Field_Check_Agreement_Type').length == 10){
     alert("This field can be produced maximum 10 times.");
	}
	else{

	    $("#ausgabe1").prepend($("<div id='cg"+ cbCount +"' class='formField'>"+
        "<div class='cg_drag_area'><img class='cg_drag_area_icon' src='"+cgDragIcon+"'></div>"+
        "<div class='formFieldInnerDiv'>"+
		"<input type='hidden' class='Field_Type' name='Field_Type["+i+"]' value='user-check-agreement-field'>"+
	"<input type='hidden' class='cg_Field_Check_Agreement_Type' >"+ // Zum Zählen von Text Feldern
	"<input type='hidden' class='Field_Order' name='Field_Order["+i+"]' >"+ // Nummer des neuen Feldes wird extra versendet
    "<strong>Check agreement</strong><br/>"+
	//"<input type='hidden' name='upload[]' class='fieldnumber' value='"+ i +"'>"+// Feldnummer wird vergeben zur Orientierung in der Datenbank
	//"<input type='hidden' class='fieldnumber' value='"+ i +"'>"+
	//"<input type='hidden' name='upload[]' value='"+ i +"' size='30' class='changeUploadFieldOrder' >"+// Feldreihenfolge
	"<input type='text' class='Field_Name' name='Field_Name["+i+"]' value='Check agreement' maxlength='200' size='30'>"+
	"<input class='cg_delete_form_field_new' type='button' value='-' style='width:20px;' alt='"+ cbCount +"' ><br>"+
            "<div class='cgCheckAgreementContainer'><div class='cgCheckAgreementCheckbox'><input type='checkbox' disabled ></div>"+
            //"<input type='text' name='upload[-"+cbCount+"][content]' placeholder='HTML tags allowed'  maxlength='1000' style='width:832px;'>"+
            "<div class='cgCheckAgreementHtml cg-wp-editor-container' data-wp-editor-id='"+editor_id+"'></div></div>"+
        "<br><br/><span class='cg-active'>Hide <input type='checkbox' name='hide[]'></span>" +
            "Required <input type='checkbox' class='necessary-check' name='Necessary["+i+"]' >"+
	"<input type='hidden' name='upload[]' class='necessary-hidden' value='off' ><br/></div></div><div>").addClass('cg_blink'));

        $htmlEditorTemplateDivToAppendForAgreement.appendTo("#cg"+ cbCount +" .cg-wp-editor-container");
        $htmlEditorTemplateDivToAppendForAgreement.css('display','block');
        $htmlEditorTemplateDivToAppendForAgreement.find('.switch-tmce').click();

        $("#cg"+ cbCount +"").find('.wp-editor-area').attr('name','Field_Content['+i+']');

    }
	
	//location.href = "#cg"+cbCount+"";
	location.href = "#dauswahl";

	
 }




// NORMALES FELD

// 1 = Feldtyp
// 2 = Feldreihenfolge 
// 3 = Feldtitel
// 4 = Feldinhalt
// 5 = Feldkrieterium1
// 6 = Feldkrieterium2
// 7 = Felderfordernis
  
	if($('#dauswahl').val() == "nf") {// text field!


	
	// alert(i);
	
	var nfCount = 10+$('.cg_Field_Text_Type').length;
	var nfHiddenCount = 100+$('.cg_Field_Text_Type').length;
	

	
	//alert(nfCount);
	
	if($('.cg_Field_Text_Type').length == 20){
     alert("This field can be produced maximum 20 times.");
	}
	else{$("#ausgabe1").prepend($("<div id='cg"+nfCount+"' class='formField'>" +
        "<div class='cg_drag_area'><img class='cg_drag_area_icon' src='"+cgDragIcon+"'></div>"+
        "<div class='formFieldInnerDiv'>"+
		"<input type='hidden' class='Field_Type' name='Field_Type["+i+"]' value='user-text-field'>"+
	"<input type='hidden' class='cg_Field_Text_Type' >"+ // Zum Zählen von Text Feldern
	"<input type='hidden' class='Field_Order' name='Field_Order["+i+"]' >"+ // Nummer des neuen Feldes wird extra versendet
    "<strong>Input</strong><br>"+
	//"<input type='hidden' name='upload[]' class='fieldnumber' value='"+ i +"'>"+// Feldnummer wird vergeben zur Orientierung in der Datenbank 
	//"<input type='hidden' class='fieldnumber' value='"+ i +"'>"+
	//"<input type='hidden' name='upload[]' value='"+ i +"' size='30' class='changeUploadFieldOrder'>"+// Feldreihenfolge
	"<input type='text' class='Field_Name' name='Field_Name["+i+"]' value='Title' maxlength='100' size='30'>"+
	"<input class='cg_delete_form_field_new' type='button' value='-' style='width:20px;' alt='"+ nfCount +"'><br/>"+
	"<input type='text' class='Field_Content' name='Field_Content["+i+"]'  placeholder='Placeholder' maxlength='1000' value='' style='width:855px;'><br/>"+
	"Min. number of characters:&nbsp; <input type='text' class='Min_Char' name='Min_Char["+i+"]' value='3' size='7' maxlength='3'><br/>"+
	"Max. number of characters: <input type='text' class='Max_Char' name='Max_Char["+i+"]' value='100' size='7' maxlength='3' ><br/><br/>"+
	"Required <input type='checkbox' class='necessary-check' name='Necessary["+i+"]' >"+
        "<span class='cg-active'>Hide <input type='checkbox' name='hide[]'></span>" +
	"<input type='hidden' name='Necessary["+i+"]' class='necessary-hidden' value='off' ><br/></div></div>").addClass('cg_blink'));}
	
	//alert(nfCount);
	/*
	$('html, body').animate({
	scrollTop: $("#'"+nfCount+"'").offset().top
    }, 400);
	$("html, body").animate({ scrollTop: $("#12").scrollTop() }, 1000);*/
	
	//location.href = "#cg"+nfCount+"";
        location.href = "#dauswahl";


    }

  
	if($('#dauswahl').val() == "kf") {



        var kfCount = 20+$('.cg_Field_Comment_Type').length;
        var kfHiddenCount = 200+$('.cg_Field_Comment_Type').length;
	

	
		// alert(i);
	
	
	if($('.cg_Field_Comment_Type').size() == 10){
     alert("This field can be produced maximum 10 times.");
	}
	
	 
	else{$("#ausgabe1").prepend($("<div id='cg"+kfCount+"' class='formField'>" +
        "<div class='cg_drag_area'><img class='cg_drag_area_icon' src='"+cgDragIcon+"'></div>"+
        "<div class='formFieldInnerDiv'>"+
		"<input type='hidden' class='Field_Type' name='Field_Type["+i+"]' value='user-comment-field'>"+
		"<input type='hidden' class='cg_Field_Comment_Type' >"+ // Zum Zählen von Text Feldern
	"<input type='hidden' class='Field_Order' name='Field_Order["+i+"]' >"+ // Nummer des neuen Feldes wird extra versendet
    "<strong>Textarea</strong><br>"+
	//"<input type='hidden' name='upload[]' class='fieldnumber' value='"+ i +"'>"+// Feldnummer wird vergeben zur Orientierung in der Datenbank 
	//"<input type='hidden' class='fieldnumber' value='"+ i +"'>"+
	//"<input type='hidden' name='upload[]' value='"+ i +"' size='30' class='changeUploadFieldOrder'>"+// Feldreihenfolge
	"<input type='text' class='Field_Name' name='Field_Name["+i+"]' value='Description' maxlength='100' size='30'>"+
	
	"<input class='cg_delete_form_field_new' type='button' value='-' style='width:20px;' alt='"+ kfCount +"'><br/>"+
	"<textarea class='Field_Content' name='Field_Content["+i+"]' placeholder='Placeholder' maxlength='10000' style='width:856px;' rows='10'></textarea><br/>"+
	"Min. number of characters:&nbsp; <input type='text' class='Min_Char' name='Min_Char["+i+"]' value='3' size='7' maxlength='3'><br/>"+
	"Max. number of characters: <input type='text' class='Max_Char' name='Max_Char["+i+"]' value='1000' size='7' maxlength='4' ><br/><br/>"+
	"Required <input type='checkbox' class='necessary-check' name='Necessary["+i+"]' >"+
        "<span class='cg-active'>Hide <input type='checkbox' name='hide[]'></span>" +
        "<input type='hidden' name='Necessary["+i+"]' class='necessary-hidden' value='off' ><br/></div></div>").addClass('cg_blink'));}
	
	//location.href = "#cg"+kfCount+"";
        location.href = "#dauswahl";


    }

  	if($('#dauswahl').val() == "ht") {

        if($('select[name="dauswahl"] :selected').hasClass('cg-pro-false')){
            alert('Only available in PRO version');
            return;
        }
		
			// 1 = Feldtyp
			// 2 = Feldtitel
			// 3 = Feldinhalt

	
	// alert(countChildren);
	
	var htCount = 50+$('.cg_Field_HTML_Type').length;
	var htHiddenCount = 500+$('.cg_Field_HTML_Type').length;

        var $htmlEditorTemplateDivToAppend = $("#cgTinymceCollection .htmlEditorTemplateDiv").first();

        var editor_id = $htmlEditorTemplateDivToAppend.attr('data-wp-editor-id');
	
	//alert(nfCount);
	
	if($('.cg_Field_HTML_Type').length >= 10){
     alert("This field can be produced maximum 10 times.");
	}
	else{
		
		$("#ausgabe1").prepend($("<div id='cg"+ htCount +"' class='formField cg_ht_field'>"+
            "<div class='cg_drag_area'><img class='cg_drag_area_icon' src='"+cgDragIcon+"'></div>"+
            "<div class='formFieldInnerDiv'>"+
        "<strong>HTML</strong><br/>"+
		"<input type='hidden' class='Field_Type' name='Field_Type["+i+"]' value='user-html-field'>"+
		"<input type='hidden' class='cg_Field_HTML_Type' >"+ // Zum Zählen von Text Feldern
		"<input type='hidden' class='Field_Order' name='Field_Order["+i+"]' >"+ // Nummer des neuen Feldes wird extra versendet
		//"<input type='hidden' value='"+ i +"' name='addField[]' class='fieldValue'>"+ // Nummer des neuen Feldes wird extra versendet
	//	"<input type='hidden' value='ht' name='addField[]'>"+
		//"<input type='hidden' name='upload[]' class='fieldnumber' value='"+ countChildren +"'>"+// Feldnummer wird vergeben zur Orientierung in der Datenbank
		//"<input type='hidden' class='fieldnumber' value='"+ countChildren +"'>"+
		//"<input type='hidden' name='upload[]' value='"+ countChildren +"' size='30' class='changeUploadFieldOrder'>"+// Feldreihenfolge
		"<input type='text' class='Field_Name' name='Field_Name["+i+"]' value='Title' maxlength='100' size='30'>"+
		"<input class='cg_delete_form_field_new deleteHTMLfield' type='button' value='-' style='width:20px;' alt='"+htCount +"'> &nbsp; (HTML Field - Title is invisible)<br/>"+
            "<hr>"+
            "<div class='cg-wp-editor-container' data-wp-editor-id='"+editor_id+"'></div>"+
            "</div></div>").addClass('cg_blink'));

        $htmlEditorTemplateDivToAppend.appendTo("#cg"+ htCount +" .cg-wp-editor-container");
        $htmlEditorTemplateDivToAppend.css('display','block');
        $htmlEditorTemplateDivToAppend.find('.switch-tmce').click();

      //  $("#cg"+ htCount +"").append("<br>");
        $("#cg"+ htCount +"").append("<span class='cg-active'>Hide <input type='checkbox' name='hide[]'></span>");
        $("#cg"+ htCount +" .cg-active").first().addClass('cg_add_css_upload_form_html_field');
        $("#cg"+ htCount +"").find('.wp-editor-area').attr('name','Field_Name['+i+']');

        // location.href = "#cg"+htCount+"";
        location.href = "#dauswahl";



    }
	
	//alert(nfCount);
	/*
	$('html, body').animate({
	scrollTop: $("#'"+nfCount+"'").offset().top
    }, 400);
	$("html, body").animate({ scrollTop: $("#12").scrollTop() }, 1000);*/	
	
	location.href = "#"+htCount+"";
	
 }


  	if($('#dauswahl').val() == "se") {

			// 1 = Feldtyp
			// 2 = Feldtitel
			// 3 = Feldinhalt



	// alert(countChildren);

	var seCount = 70+$('.cg_Field_Select_Type').length;
	var seHiddenCount = 70+$('.cg_Field_Select_Type').length;

	//alert(nfCount);

        if($('.cg_Field_Select_Type').length == 10){
            alert("This field can be produced maximum 10 times.");
        }

        else{$("#ausgabe1").prepend($("<div id='cg"+ seCount +"' class='formField cg_se_field'>" +
            "<div class='cg_drag_area'><img class='cg_drag_area_icon' src='"+cgDragIcon+"'></div>"+
            "<div class='formFieldInnerDiv'>"+
			"<input type='hidden' name='upload[]' value='se'>"+
            "<input type='hidden' class='Field_Type' name='Field_Type["+i+"]' value='user-select-field'>"+
			"<input type='hidden' class='cg_Field_Select_Type' >"+ // Zum Zählen von Text Feldern
            "<strong>Select</strong><br>"+
            "<input type='hidden' class='Field_Order' name='Field_Order["+i+"]' >"+ // Nummer des neuen Feldes wird extra versendet
            "<input type='text' class='Field_Name' name='Field_Name["+i+"]' size='30' maxlength='100' placeholder='Title of your select box'>"+


            "<input class='cg_delete_form_field_new' type='button' value='-' style='width:20px;' alt='"+ seCount +"'><br/>"+
            "<textarea class='Field_Content' name='Field_Content["+i+"]' maxlength='10000' rows='10' value='' style='width:857px;' placeholder='Each row one value - Example: &#10;value1&#10;value2&#10;value3&#10;value4&#10;value5&#10;value6' ></textarea><br/>"+
            "<br/>"+
            "Required <input type='checkbox' class='necessary-check' name='Necessary["+i+"]' >"+
            "<span class='cg-active'>Hide <input type='checkbox' name='hide[]'></span>" +
            "<input type='hidden' name='Necessary["+i+"]' class='necessary-hidden' value='off' ><br/></div></div>").addClass('cg_blink'));}

	//location.href = "#cg"+seCount+"";

        location.href = "#dauswahl";


    }

      if($('#dauswahl').val() == "caRo") {

          // 1 = Feldtyp
          // 2 = Feldtitel
          // 3 = Feldinhalt

          // alert(countChildren);

          var caRoCount = 80+$('.cg_Field_Robot_Type').length;
          var caRoHiddenCount = 800+$('.cg_Field_Robot_Type').length;

          //alert(nfCount);

          if($('.captchaRoField').length >= 1){
              alert("This field can be produced maximum 1 time.");
          }
          else{

              $("#ausgabe1").prepend($("<div id='cg"+ caRoCount +"' class='formField captchaRoField'>"+
                  "<div class='cg_drag_area'><img class='cg_drag_area_icon' src='"+cgDragIcon+"'></div>"+
                  "<div class='formFieldInnerDiv'>"+
                  "<input type='hidden' class='Field_Type' name='Field_Type["+i+"]' value='user-robot-field'>"+
                  "<input type='hidden' class='cg_Field_Robot_Type' >"+ // Zum Zählen von Text Feldern
                  "<input type='hidden' class='Field_Order' name='Field_Order["+i+"]' >"+ // Nummer des neuen Feldes wird extra versendet
                  "<strong>Simple Captcha - I am not a robot</strong><br/>"+
                  "<input type='checkbox' disabled> "+
                  "<input type='text' class='Field_Name' name='Field_Name["+i+"]' size='30' maxlength='100' value='I am not a robot'>"+
                  "<input class='cg_delete_form_field_new' type='button' value='-' style='width:20px;' alt='"+ caRoCount +"'><br/>"+
                  "<br/><span class='cg-active'>Hide <input type='checkbox' name='hide[]'></span>" +
                  "Required <input type='checkbox' class='necessary-check' disabled checked >"+
                  "<br/><br/></div></div>").addClass('cg_blink'));


            //  location.href = "#cg"+caRoCount+"";
              location.href = "#dauswahl";


          }

          //alert(nfCount);
          /*
          $('html, body').animate({
          scrollTop: $("#'"+nfCount+"'").offset().top
          }, 400);
          $("html, body").animate({ scrollTop: $("#12").scrollTop() }, 1000);*/



      }


      if($('#dauswahl').val() == "caRoRe") {

          // 1 = Feldtyp
          // 2 = Feldtitel
          // 3 = Feldinhalt

          // alert(countChildren);

          var caRoReCount = 90+$('.cg_Field_Robot_Type').length;
          var caRoReHiddenCount = 900+$('.cg_Field_Robot_Type').length;

          //alert(nfCount);

          if($('.captchaRoReField').length >= 1){
              alert("This field can be produced maximum 1 time.");
          }
          else{

              var reCaptchaSelect = $('#cgReCaLangToCopy').clone();

              var toAppend = $("<div id='cg"+ caRoReCount +"' class='formField captchaRoReField'>"+
                  "<div class='cg_drag_area'><img class='cg_drag_area_icon' src='"+cgDragIcon+"'></div>"+
                  "<div class='formFieldInnerDiv'>"+
                  "<input type='hidden' class='Field_Type' name='Field_Type["+i+"]' value='user-robot-recaptcha-field'>"+
                  "<input type='hidden' class='cg_Field_Robot_Type' >"+ // Zum Zählen von Text Feldern
                  "<input type='hidden' class='Field_Order' name='Field_Order["+i+"]' >"+ // Nummer des neuen Feldes wird extra versendet
                  "<strong>Google reCAPTCHA - I am not a robot (can be rendered only 1 time on a page)</strong><br/>"+
                  "<span id='cgReCaLangToInsert' ></span>"+
                  "<input class='cg_delete_form_field_new' type='button' value='-' style='width:20px;' alt='"+ caRoReCount +"'><br/>"+
                  "<strong>Website Key</strong><br/>"+
                  "<input type='text' name='ReCaKey' class='cg_reca_key' placeholder='Example Key: 6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI' size='30' maxlength='1000' />"+
                  "<img src='"+cgRecaptchaIconUrl+"' title='Insert Google reCAPTCHA test key' alt='Insert Google reCAPTCHA test key' class='cg_recaptcha_icon' />"+
                  "<br/><br/><span class='cg-active'>Hide <input type='checkbox' name='hide[]'></span>" +
                  "Required <input type='checkbox' class='necessary-check' disabled checked >"+
                  "<br/></div></div>").addClass('cg_blink');

              $("#ausgabe1").prepend(toAppend);
              $("#ausgabe1").find('#cgReCaLangToInsert').prepend(reCaptchaSelect.removeClass('cg_hide'));

            //  location.href = "#cg"+caRoCount+"";
              location.href = "#dauswahl";


          }

          //alert(nfCount);
          /*
          $('html, body').animate({
          scrollTop: $("#'"+nfCount+"'").offset().top
          }, 400);
          $("html, body").animate({ scrollTop: $("#12").scrollTop() }, 1000);*/



      }

	cgSortOrder();
	cgCheckHideField();

      setTimeout(function () {
          $('.cg_blink').removeClass('cg_blink');
      },2000);

 });
 
	
	
  /*$("#cg_create_upload_add_field").click(function(){
  
alert("This option is not available in the Lite Version.");
	
 });*/
 

 
});
 
 
  
});