jQuery(document).ready(function($){
    $(document).on('click', '#CatWidget', function(e){

        if($(this).is( ":checked" )){
            $("#CatWidgetTable").css("background-color","#ffffff");
        }
        else{
            $("#CatWidgetTable").css("background-color","transparent");
        }

    });

    $('.sortableDiv').each(function() {

        var width = $(this).find('.cg_rating_center').find('div:first-child').width()+$(this).find('.cg_rating_center').find('div:nth-child(2)').width()+3;
        $(this).find('.cg_rating_center').width(width);

    });

    cgJsAdminClass.vars.setStarOnStarOffSrc();

    $(document).on('input','.cg_manipulate_plus_value',function (e) {

        var sortableDiv = $(this).closest('.sortableDiv');

        var cg_rating_value_text = sortableDiv.find('.cg_rating_value').text();
        cg_rating_value_width = cg_rating_value_text.length*8;

        var originValue = parseInt(sortableDiv.find('.cg_value_origin').val());

        if (this.value.length > 8) {
            this.value = this.value.slice(0,8);
            var addValue = parseInt(this.value);
        }
        else{
           var addValue=parseInt(this.value);
        }

        if(isNaN(addValue)){
            addValue=0;
        }

        var newValue = originValue+addValue;

        if(newValue<1){
            sortableDiv.find('.cg_rating_center img').attr('src',cgJsAdminClass.vars.setStarOffSrc);
            newValue = 0;

        }
        else{
            sortableDiv.find('.cg_rating_center img[src$="_reduced.png"]').attr('src',cgJsAdminClass.vars.setStarOnSrc);

        }

        sortableDiv.find('.cg_rating_value').text(newValue);
        sortableDiv.find('.cg_value_add_one_star').val(addValue);

        var width = sortableDiv.find('.cg_rating_center').find('div:first-child').width()+sortableDiv.find('.cg_rating_center').find('div:nth-child(2)').width()+3;
        sortableDiv.find('.cg_rating_center').width(width);

    });

    $(document).on('input','.cg_manipulate_5_star_input',function (e) {

        if (this.value.length > 5) {
            this.value = this.value.slice(0,5);
            var addValue = this.value;
        }
        else{
            var addValue = this.value;
        }


        var container = $(this).closest('.sortableDiv');
        var countRbefore = container.find('.cg_value_origin_5_star_count').val();

        var ratingRnew = container.find('.cg_value_origin_5_star_rating').val();

        addValue = addValue.trim();
        countRbefore = countRbefore.trim();
        ratingRnew = ratingRnew.trim();

        addValue = parseInt(addValue);


        countRbefore = parseInt(countRbefore);
        ratingRnew = parseInt(ratingRnew);

        if($(this).hasClass('cg_manipulate_1_star_number')){

            var originCountR = container.find('.cg_value_origin_5_only_value_1').val();
            originCountR = originCountR.trim();
            originCountR = parseInt(originCountR);

            var valueCountR = originCountR+addValue;

            if(valueCountR<0){

                return false;

            }

            container.find('.cg_value_origin_5_star_addCountR1').val(addValue);

            container.find('.cg_rating_value_countR1').text(valueCountR);



        }


        if($(this).hasClass('cg_manipulate_2_star_number')){

            var originCountR = container.find('.cg_value_origin_5_only_value_2').val();
            originCountR = originCountR.trim();
            originCountR = parseInt(originCountR);

            var valueCountR = originCountR+addValue;

            if(valueCountR<0){

                return false;

            }

            container.find('.cg_value_origin_5_star_addCountR2').val(addValue);

            container.find('.cg_rating_value_countR2').text(valueCountR);

        }


        if($(this).hasClass('cg_manipulate_3_star_number')){

            var originCountR = container.find('.cg_value_origin_5_only_value_3').val();
            originCountR = originCountR.trim();
            originCountR = parseInt(originCountR);

            var valueCountR = originCountR+addValue;

            if(valueCountR<0){

                return false;

            }

            container.find('.cg_value_origin_5_star_addCountR3').val(addValue);

            container.find('.cg_rating_value_countR3').text(valueCountR);

        }


        if($(this).hasClass('cg_manipulate_4_star_number')){

            var originCountR = container.find('.cg_value_origin_5_only_value_4').val();
            originCountR = originCountR.trim();
            originCountR = parseInt(originCountR);

            var valueCountR = originCountR+addValue;

            if(valueCountR<0){

                return false;

            }

            container.find('.cg_value_origin_5_star_addCountR4').val(addValue);

            container.find('.cg_rating_value_countR4').text(valueCountR);

        }


        if($(this).hasClass('cg_manipulate_5_star_number')){

            var originCountR = container.find('.cg_value_origin_5_only_value_5').val();
            originCountR = originCountR.trim();
            originCountR = parseInt(originCountR);

            var valueCountR = originCountR+addValue;

            if(valueCountR<0){

                return false;

            }

            container.find('.cg_value_origin_5_star_addCountR5').val(addValue);

            container.find('.cg_rating_value_countR5').text(valueCountR);

        }


        var addValue = 0;

      //  console.log('ratingRnew: '+ratingRnew);


        container.find('.cg_value_origin_5_star_to_cumulate').each(function (index) {

            var r = index+1;

            if($(this).val()==''){

                var valueToAdd = 0;

            }
            else{

                var valueToAdd = parseInt($(this).val());

            }


            if($(this).hasClass('cg_value_origin_5_star_addCountR1')){
             //   console.log('ratingRnew1: '+valueToAdd);

                ratingRnew = ratingRnew+valueToAdd*1;
             //   console.log('ratingRnew1ratingRnew: '+ratingRnew);


            }
            if($(this).hasClass('cg_value_origin_5_star_addCountR2')){

                ratingRnew = ratingRnew+valueToAdd*2;

            }
            if($(this).hasClass('cg_value_origin_5_star_addCountR3')){

                ratingRnew = ratingRnew+valueToAdd*3;

            }
            if($(this).hasClass('cg_value_origin_5_star_addCountR4')){

                ratingRnew = ratingRnew+valueToAdd*4;

            }
            if($(this).hasClass('cg_value_origin_5_star_addCountR5')){
                ratingRnew = ratingRnew+valueToAdd*5;
            }


            if(valueToAdd>=1 || valueToAdd<=1){
                addValue= addValue + valueToAdd;
            }

            if(r==5){



                cgJsAdminClass.vars.addValue = addValue;
                cgJsAdminClass.vars.ratingRnew = ratingRnew;

                return;
            }

        });





        var countRnew = countRbefore+parseInt(cgJsAdminClass.vars.addValue);



        if(countRnew<=0){
            countRnew = 0;
            cgJsAdminClass.vars.setRating0(container);


        }
        else{

            var rating = cgJsAdminClass.vars.ratingRnew/countRnew;


            if(rating<1.5){
                cgJsAdminClass.vars.setRating1(container);
            }
            else if(rating<2.5){
                cgJsAdminClass.vars.setRating2(container);
            }
            else if(rating<3.5){
                cgJsAdminClass.vars.setRating3(container);
            }
            else if(rating<4.5){
                cgJsAdminClass.vars.setRating4(container);
            }
            else if(rating<=5){
                cgJsAdminClass.vars.setRating5(container);
            }

        }

        container.find('.cg_rating_value_countR').text(countRnew);


    });

    $('.cg_title_icon').click( function() {

        var post_title = $(this).parent().find('.post_title').val();
        if(post_title === '') {
            $(this).parent().find('.cg_image_title').val();
            $(this).parent().find('.cg_image_title').attr('placeholder','No WordPress title available');
        }
        else {
            $(this).parent().find('.cg_image_title').val(post_title);
        }

    });

    $('.cg_description_icon').click( function() {

        var post_description = $(this).parent().find('.post_description').val();
        var post_description = post_description.replace(/(<([^>]+)>)/ig,"");


        if(post_description === '') {
            $(this).parent().parent().find('.cg_image_description').val();
            $(this).parent().parent().find('.cg_image_description').attr('placeholder','No WordPress description available');
        }
        else {
            $(this).parent().parent().find('.cg_image_description').val(post_description);
        }

    });

    $('.cg_excerpt_icon').click( function() {

        var post_excerpt = $(this).parent().find('.post_excerpt').val();
        if(post_excerpt === '') {
            $(this).parent().parent().find('.cg_image_excerpt').val();
            $(this).parent().parent().find('.cg_image_excerpt').attr('placeholder','No WordPress excerpt available');
        }
        else {
            $(this).parent().parent().find('.cg_image_excerpt').val(post_excerpt);
        }

    });


// Add icon


    $("#cg_changes_saved").fadeOut(3000);

    $( "#cg_server_power_info" ).hover(function() {
        //alert(3);
        $('#cg_answerPNG').toggle();
        $(this).css('cursor','pointer');
    });

    $( "#cg_adding_images_info" ).hover(function() {
        //alert(3);
        $('#cg_adding_images_answer').toggle();
        $(this).css('cursor','pointer');
    });

//Check if the current URL contains '#'




// Nicht löschen, wurde ursprünglich dazu markiert alle Felder auswählen zu lassen die im Slider gezeigt werden sollen, Logik könnte noch nützlich sein! --- ENDE	



    //alert(allFieldClasses);

    function countChar(val) {
        var len = val.value.length;
        if (len >= 1000) {
            val.value = val.value.substring(0, 1000);
        } else {
            $('#charNum').text(1000 - len);
        }
    };


    // Verstecken weiterer Boxen

    $('.mehr').hide();
    $('.clickBack').hide();


    $('.clickMore').click( function() {
        // Zeigen oder Verstecken:

        $(this).next().slideDown('slow');
        $(this).next(".mehr").next(".clickBack").toggle();
        $(this).hide();


    })

    $('.clickBack').click( function() {
        $(this).prev().slideUp('slow');
        $(this).prev(".mehr").prev(".clickMore").toggle();
        $(this).hide();


    })

// Verstecken weiterer Boxen ---- ENDE

// Change Daten ändern oder löschen

    $("#chooseAction1").change(function(){

        var chooseAction = $( "#chooseAction1 option:selected" ).val();


        if(chooseAction==3){

            $('.cg_image_checkbox:checked').each(function(){
                $(this).closest('.sortableDiv').addClass('highlightedRemoveable');
                $(this).closest('.sortableDiv').removeClass('highlightedActivate');
                $(this).closest('.sortableDiv').removeClass('highlightedDeactivate');
            });

        }
        else if(chooseAction==2){

            $('.cg_image_checkbox:checked').each(function(){
                $(this).closest('.sortableDiv').addClass('highlightedDeactivate');
                $(this).closest('.sortableDiv').removeClass('highlightedActivate');
                $(this).closest('.sortableDiv').removeClass('highlightedRemoveable');
            });

        }
        else if(chooseAction==1){

            $('.cg_image_checkbox:checked').each(function(){
                $(this).closest('.sortableDiv').addClass('highlightedActivate');
                $(this).closest('.sortableDiv').removeClass('highlightedDeactivate');
                $(this).closest('.sortableDiv').removeClass('highlightedRemoveable');
            });

        }
        else{

            $('.cg_image_checkbox:checked').each(function(){
                $(this).closest('.sortableDiv').removeClass('highlightedRemoveable');
                $(this).closest('.sortableDiv').removeClass('highlightedDeactivate');
                $(this).closest('.sortableDiv').removeClass('highlightedActivate');
            });

        }


    });


//Change Daten ändern oder löschen -- END


    /*
    $("input[class*=deactivate]").change(function(){

    //$( this ).parent( "div input .imageThumb" ).removeAttr("disabled");
    //$( this ).closest( "input" ).removeAttr("disabled");
    //$( this ).parent().find( "input .imageThumb" ).removeAttr("disabled");

    if($(this).is(":checked")){
    var platzhalter = 'keine Aktion';
    $( this ).parent().find(".deactivate").remove();
    $( this ).parent().find( ".image-delete" ).prop("disabled",false);
    }

    else{

    var id = $(this).val();
    $( this ).parent().append("<input type='hidden' name='deactivate[]' value='"+id+"' class='deactivate'>" );
    $( this ).parent().find( ".image-delete" ).prop("disabled",true);
    }


    });*/

    $(".cg_image_checkbox").change(function(){

        var chooseAction = $( "#chooseAction1 option:selected" ).val();

        if($(this).is(":checked")){
            if(chooseAction==3){
                $(this).closest('.sortableDiv').addClass('highlightedRemoveable');
                $(this).closest('.sortableDiv').removeClass('highlightedActivate');
                $(this).closest('.sortableDiv').removeClass('highlightedDeactivate');
            }
            else if(chooseAction==2){
                $(this).closest('.sortableDiv').addClass('highlightedDeactivate');
                $(this).closest('.sortableDiv').removeClass('highlightedActivate');
                $(this).closest('.sortableDiv').removeClass('highlightedRemoveable');
            }
            else if(chooseAction==1){
                $(this).closest('.sortableDiv').addClass('highlightedActivate');
                $(this).closest('.sortableDiv').removeClass('highlightedDeactivate');
                $(this).closest('.sortableDiv').removeClass('highlightedRemoveable');
            }
        }
        else{
            $(this).closest('.sortableDiv').removeClass('highlightedRemoveable');
            $(this).closest('.sortableDiv').removeClass('highlightedDeactivate');
            $(this).closest('.sortableDiv').removeClass('highlightedActivate');


        }

    });


// Duplicate email to a hidden field for form


    $(".email").change(function(){

        var email = $( this ).val();

        $( this ).parent().find( ".email-clone" ).val(email);

    });

// Duplicate email to a hidden field for form -- END 


    $("div input #activate").click(function() {
        $("input #inform").prop("disabled", this.checked);
    });

    /*function informAll(){

    //alert(arg);
    alert(arg1);

    if($("#informAll").is( ":checked" )){
    $( "input[class*=inform]").removeAttr("checked",true);
    $( "input[class*=inform]").click();
    }

    else{
    $( "input[class*=inform]").click();

    }

    }*/

// Alle Bilder auswählen 

    var n = 0;

    $("#chooseAll").click(function(){

        n++;
        $("#click-count").val(n);

        var chooseAction = $( "#chooseAction1 option:selected" ).val();


        if($("#chooseAll").is( ":checked" )){

            $(".cg_image_checkbox").prop("checked",true);

            if(chooseAction==3){

                $('.sortableDiv').each(function(){
                    $(this).addClass('highlightedRemoveable');
                    $(this).removeClass('highlightedActivate');
                    $(this).removeClass('highlightedDeactivate');
                });

            }
            else if(chooseAction==2){

                $('.sortableDiv').each(function(){
                    $(this).addClass('highlightedDeactivate');
                    $(this).removeClass('highlightedActivate');
                    $(this).removeClass('highlightedRemoveable');
                });

            }
            else if(chooseAction==1){

                $('.sortableDiv').each(function(){
                    $(this).addClass('highlightedActivate');
                    $(this).removeClass('highlightedDeactivate');
                    $(this).removeClass('highlightedRemoveable');
                });

            }

        }
        else{

            //$(".cg_image_checkbox").prop("checked",false);

            $('.cg_image_checkbox').each(function(){
                $(this).closest('.sortableDiv').removeClass('highlightedRemoveable');
                $(this).closest('.sortableDiv').removeClass('highlightedDeactivate');
                $(this).closest('.sortableDiv').removeClass('highlightedActivate');
                $(this).prop("checked",false);
            });

        }

    });

// Alle Bilder auswählen --- END


//Sortieren der Galerie




    var v = 0;

    var $i = 0;

    var rowid = [];

    if($i==0){

        $( ".sortableDiv" ).each(function( i ) {

            var rowidValue =  $(this).find('.rowId').val();


            rowid.push(rowidValue);

        });

        $i++;

    }


    $(function() {
        $( "#sortable" ).sortable({cursor: "move",handle:'.cg_drag_area',placeholder: "ui-state-highlight", stop: function( event, ui ) {

                if(document.readyState === "complete"){



                    $( ".sortableDiv" ).each(function( i ) {



                        $(this).find('.rowId').val(rowid[v]);


                        v++;


                    });

                    v = 0;

                }

            }

        });
    });

//Sortieren der Galerie --- ENDE



});