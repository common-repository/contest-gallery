jQuery(document).ready(function($){

    // show hash
    setTimeout(function () {// timeout because of 500 options load
        if(location.hash=='#cgTranslationOtherHashLink'){
            location.href = '#cgTranslationOtherHashLink';
            $('#cgTranslationOther').addClass('cg_mark_green');
        }
    },600);


    // Only numbers allowed
    $(document).on('input','#PicsPerSite,#HeightLookHeight,#HeightViewSpaceWidth,#HeightViewSpaceHeight,#WidthThumb,#HeightThumb,#DistancePics,#DistancePicsV' +
        '#PicsInRow,#RowViewSpaceWidth,#RowViewSpaceHeight',function () {

        // otherwise backspace does not work
        if(this.value==''){
            return;
        }

        if(/^\d+$/.test(this.value)==false){
            this.value=0;
        }

    });

    // Only numbers allowed --- END


    // $('#cgScrollSpyContainer').scrollspy({ target: '#navbar-example2' }); <<< without bootstrap.js integrated it breaks the functionallaty!


    setTimeout(function () {
        $("#cgOptionsLoader").addClass('cg_hide');
        $("#cg_main_options").addClass('cg_fade_in');
        $("#cg_main_options").removeClass('cg_hidden');
        $("#cg_save_all_options").removeClass('cg_hidden');
    },500);

    $("#SlideHorizontal").on('click',function () {
        if($(this).is( ":checked" )){
            $(this).prop( "checked", true);
            $("#SlideVertical").prop( "checked", false);
        }else{
            $(this).prop( "checked", false);
            $("#SlideVertical").prop( "checked", true);
        }
    });

    $("#SlideVertical").on('click',function () {
        if($(this).is( ":checked" )){
            $(this).prop( "checked", true);
            $("#SlideHorizontal").prop( "checked", false);
        }else{
            $(this).prop( "checked", false);
            $("#SlideHorizontal").prop( "checked", true);
        }
    });

    $(document).on('click', '.cg_move_view_to_top', function(e){

        var sortableView = $(this).closest('.cg_options_sortableContainer');
        sortableView.insertBefore(sortableView.prev('.cg_options_sortableContainer'));
        // sortableView.next().find('.cg_move_view_to_top').removeClass('cg_hide');
        //   $('.cg_options_sortableContainer:first-child .cg_move_view_to_bottom, .cg_options_sortableContainer:nth-child(2) .cg_move_view_to_bottom').removeClass('cg_hide');
        //  $('.cg_options_sortableContainer:nth-child(3) .cg_move_view_to_bottom').addClass('cg_hide');

        //  $('.cg_options_sortableContainer:first-child .cg_move_view_to_top').addClass('cg_hide');
        //  $('.cg_options_sortableContainer:nth-child(2) .cg_move_view_to_top').removeClass('cg_hide');
        // $('.cg_options_sortableContainer:nth-child(3) .cg_move_view_to_top').removeClass('cg_hide');

        v = 0;

        $( ".cg_options_order" ).each(function( i ) {
            v++;
            $(this).empty();
            $(this).append('<u>'+v+'. Order</u>');
            $(this).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
            $(this).attr('id','cg_options_order'+v+'');


        });

        var sortableViewIndex = sortableView.index()+1;
        //location.href = '#cg_options_order'+sortableViewIndex+'';
        var scrollTop = $('#cg_options_order'+sortableViewIndex+'').offset().top-55-$('#cg_main_options_tab').outerHeight();
        $(window).scrollTop(scrollTop);
        //  $(window).scrollTop(50);


    });

    $(document).on('click', '.cg_move_view_to_bottom', function(e){
        var sortableView = $(this).closest('.cg_options_sortableContainer');
        sortableView.insertAfter(sortableView.next('.cg_options_sortableContainer'));
        //    $('.cg_options_sortableContainer:first-child .cg_move_view_to_bottom, .cg_options_sortableContainer:nth-child(2) .cg_move_view_to_bottom').removeClass('cg_hide');
        //   $('.cg_options_sortableContainer:nth-child(3) .cg_move_view_to_bottom').addClass('cg_hide');

        //   $('.cg_options_sortableContainer:first-child .cg_move_view_to_top').addClass('cg_hide');
        //   $('.cg_options_sortableContainer:nth-child(2) .cg_move_view_to_top').removeClass('cg_hide');
        //  $('.cg_options_sortableContainer:nth-child(3) .cg_move_view_to_top').removeClass('cg_hide');

        v = 0;

        $( ".cg_options_order" ).each(function( i ) {
            v++;
            $(this).empty();
            $(this).append('<u>'+v+'. Order</u>');
            $(this).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
            $(this).attr('id','cg_options_order'+v+'');


        });

        var sortableViewIndex = sortableView.index()+1;
        //location.href = '#cg_options_order'+sortableViewIndex+'';
        var scrollTop = $('#cg_options_order'+sortableViewIndex+'').offset().top-55-$('#cg_main_options_tab').outerHeight();
        $(window).scrollTop(scrollTop);
        //  $(window).scrollTop(50);

    });

    // Visual form options here

    $(document).on('click', '#FormInputWidth', function(e){

        if($("#FormInputWidth").is( ":checked" )){
            $(".FormInputWidthExample").css("width","100%");
        }
        else{
            $(".FormInputWidthExample").css("width","auto");
        }

    });

    $(document).on('click', '#FormButtonWidth', function(e){

        if($("#FormButtonWidth").is( ":checked" )){
            $(".FormButtonWidthExample").css("width","100%");
        }
        else{
            $(".FormButtonWidthExample").css("width","auto");
        }

    });

    $(document).on('click', '#FormRoundBorder', function(e){

        if($("#FormRoundBorder").is( ":checked" )){
            $(".FormInputWidthExample").css("border-radius","5px");
            $(".FormButtonWidthExample").css("border-radius","5px");
        }
        else{
            $(".FormInputWidthExample").css("border-radius","0%");
            $(".FormButtonWidthExample").css("border-radius","0%");
        }

    });



    // Visual form options here --- END




    $(document).on('click', '#ThumbViewBorderColor', function(e){
        $(".color-picker").css("top",$("#ThumbViewBorderColor").offset().top+27);
    });
    $(document).on('click', '#HeightViewBorderColor', function(e){
        $(".color-picker").css("top",$("#HeightViewBorderColor").offset().top+27);
    });
    $(document).on('click', '#RowViewBorderColor', function(e){
        $(".color-picker").css("top",$("#RowViewBorderColor").offset().top+27);
    });
    $(document).on('click', '#GalleryBackgroundColor', function(e){
        $(".color-picker").css("top",$("#GalleryBackgroundColor").offset().top+27);
    });
    /*	$(document).on('click', '#FormButtonColor', function(e){
        $(".color-picker").css("top",$("#FormButtonColor").offset().top+27);
    });	*/



/*    var cgColorPickerSelector1 = new CP(document.querySelector('#ThumbViewBorderColor'));
    cgColorPickerSelector1.on("change", function(color) {
        this.target.value = '#' + color;
    });
    var cgColorPickerSelector2 = new CP(document.querySelector('#HeightViewBorderColor'));
    cgColorPickerSelector2.on("change", function(color) {
        this.target.value = '#' + color;
    });
    var cgColorPickerSelector3 = new CP(document.querySelector('#RowViewBorderColor'));
    cgColorPickerSelector3.on("change", function(color) {
        this.target.value = '#' + color;
    });*/
    //var cgColorPickerSelector4 = new CP(document.querySelector('#GalleryBackgroundColor'));
    //cgColorPickerSelector4.on("change", function(color) {
    //	this.target.value = '#' + color;
    //});

    /*var cgColorPickerSelector0 = new CP(document.querySelector('#FormButtonColor'));
    cgColorPickerSelector0.on("change", function(color) {
        this.target.value = '#' + color;
        $(".FormButtonWidthExample").css("background-color","#"+color+"");
    });	*/




    // Changes saved fade out


    $("#cg_changes_saved").fadeOut(4000);


    // Changes saved fade out --- ENDE

    /*    var cg_FullSizeGallery = function(click){

            if($("#FullSizeGallery").is( ":checked" ) && $("#AllowGalleryScript").is( ":checked" )){

                $("#FullSizeSlideOutStart").removeClass('cg_disabled');

            }else{

                $("#FullSizeSlideOutStart").addClass('cg_disabled');

            }

        };

        $("#FullSizeGallery").click(function(){

            cg_FullSizeGallery();

        });
        cg_FullSizeGallery();*/


    $( "#ThumbViewBorderColor" ).change(function() {
        var opacityThumbView = $('#ThumbViewBorderColor').attr("data-opacity");
        $('#ThumbViewBorderColor').attr("name","ThumbViewBorderColor["+opacityThumbView+"]");
    });

    $( "#HeightViewBorderColor" ).change(function() {
        var opacityHeightView = $('#HeightViewBorderColor').attr("data-opacity");
        $('#HeightViewBorderColor').attr("name","HeightViewBorderColor["+opacityHeightView+"]");
    });

    $( "#RowViewBorderColor" ).change(function() {
        var opacityRowView = $('#RowViewBorderColor').attr("data-opacity");
        $('#RowViewBorderColor').attr("name","RowViewBorderColor["+opacityRowView+"]");
    });
    $( "#GalleryBackgroundColor" ).change(function() {
        var opacityBackgroundColor = $('#GalleryBackgroundColor').attr("data-opacity");
        $('#GalleryBackgroundColor').attr("name","GalleryBackgroundColor["+opacityBackgroundColor+"]");
    });




    $( "#cg_questionJPG" ).hover(function() {
        $('#cg_answerJPG').toggle();
        $(this).css('cursor','pointer');
    });

    $( "#cg_questionPNG" ).hover(function() {
        $('#cg_answerPNG').toggle();
        $(this).css('cursor','pointer');
    });

    $( "#cg_questionGIF" ).hover(function() {
        $('#cg_answerGIF').toggle();
        $(this).css('cursor','pointer');
    });


    var v=0;

    var getContestEndTime = $("#getContestEndTime").val();

//alert(getContestEndTime);


    /*if(getContestEndTime>0){
        //alert(1);
    var getContestEndTime = new Date(getContestEndTime*1000);

    var month = parseInt(getContestEndTime.getMonth());
        month = month+1;

    var monthUS = month;

    var day = parseInt(getContestEndTime.getDate());


        if(month<10){
            var monthUS = "0"+monthUS;
        }

        if(day<10){
        var day = "0"+day;
        }


        getContestEndTime = monthUS+"/"+day+"/"+getContestEndTime.getFullYear();


        $("#cg_datepicker").val(getContestEndTime);



    }	*/

    $(function() {
        $( "#cg_datepicker_start" ).datepicker();
    });

    $( "#cg_datepicker_start" ).datepicker("option", "dateFormat", "yy-mm-dd");

    $( "#cg_datepicker_start" ).on( "change", function() {
        $( "#cg_datepicker_start" ).datepicker("option", "dateFormat", "yy-mm-dd");
    });

    $('#cg_datepicker_start').keydown(function() {
        return false;
    });


    $(function() {
        $( "#cg_datepicker" ).datepicker();
    });
    $( "#cg_datepicker" ).datepicker("option", "dateFormat", "yy-mm-dd");

    $( "#cg_datepicker" ).on( "change", function() {
        $( "#cg_datepicker" ).datepicker("option", "dateFormat", "yy-mm-dd");
    });

    $('#cg_datepicker').keydown(function() {
        return false;
    });


    $( ".cg_date_hours,.cg_date_mins,.cg_date_seconds" ).on( "input", function() {
        if(this.value.length>2){
            this.value = this.value.substr(0,2);
            if(this.value.indexOf(0)==0){
                this.value = this.value.substr(1,1);
            }
        }

        if($(this).hasClass('cg_date_hours')){
            if(this.value==25){
                this.value = 0;
            }
            if(this.value==-1){
                this.value = 24;
            }
        }

        if($(this).hasClass('cg_date_mins')){

            if(this.value==60){
                this.value = 0;
            }
            if(this.value==-1){
                this.value = 59;
            }
        }

        if(this.value<10){this.value = '0'+this.value;}

    });

    $( ".cg_date_hours_unlimited" ).on( "input", function(e) {

        if(this.value==1000){
            this.value = 0;
        }
        if(this.value==-1){
            this.value = 999;
        }

        //if(this.value<10){this.value = '0'+this.value;}

        //	if(this.value<10){this.value = '0'+this.value;}

        if(this.value.length>3){
            this.value = this.value.substr(0,3);
            /*            if(this.value.indexOf(0)==0){
                            this.value = this.value.substr(1,2);
                        }*/
        }

    });

    $( ".cg_date_days" ).on( "input", function() {

        if(this.value==30){
            this.value = 0;
        }
        if(this.value==-1){
            this.value = 30;
        }
        //	if(this.value<10){this.value = '0'+this.value;}

    });



// Check votes in a time

    var cg_VotesInTime = function () {

        if($("#VotesInTime").is( ":checked" )){
            $("#VotesInTimeQuantity").removeClass("cg_disabled");
            $("#cg_date_hours_vote_interval").removeClass("cg_disabled");
            $("#cg_date_mins_vote_interval").removeClass("cg_disabled");
            $("#VotesInTimeIntervalAlertMessage").removeClass("cg_disabled");
        }
        else{
            $("#VotesInTimeQuantity").addClass("cg_disabled");
            $("#cg_date_hours_vote_interval").addClass("cg_disabled");
            $("#cg_date_mins_vote_interval").addClass("cg_disabled");
            $("#VotesInTimeIntervalAlertMessage").addClass("cg_disabled");
        }

    };

    $("#VotesInTime").on('click',function () {
        cg_VotesInTime();
    });

    cg_VotesInTime();

// Check votes in a time --- END

// Check if start contest time is on or not

    var cg_ContestStart = function () {

        if($("#ContestStart").is( ":checked" )){

            $("#cg_datepicker_start").removeClass("cg_disabled");
            $("#cg_date_hours_contest_start").removeClass("cg_disabled");
            $("#cg_date_mins_contest_start").removeClass("cg_disabled");

        }
        else{

            $("#cg_datepicker_start").addClass("cg_disabled");
            $("#cg_date_hours_contest_start").addClass("cg_disabled");
            $("#cg_date_mins_contest_start").addClass("cg_disabled");

        }

    };

    $("#ContestStart").on('click',function () {
        cg_ContestStart();
    });

    cg_ContestStart();

// Check if start contest time is on or not --- END

// Check if end contest time is on or not

    var cg_ContestEnd = function () {

        if($("#ContestEnd").is( ":checked" )){

            $("#cg_datepicker").removeClass("cg_disabled");
            $("#cg_date_hours_contest_end").removeClass("cg_disabled");
            $("#cg_date_mins_contest_end").removeClass("cg_disabled");
            $("#ContestEndInstant").prop("checked",false);

        }
        else{

            $("#cg_datepicker").addClass("cg_disabled");
            $("#cg_date_hours_contest_end").addClass("cg_disabled");
            $("#cg_date_mins_contest_end").addClass("cg_disabled");

        }

    };

    $("#ContestEnd").on('click',function () {
        cg_ContestEnd();
    });

    cg_ContestEnd();

// Check if end contest time is on or not --- END

// Check if end contest instant is on or not

    var cg_ContestEndInstant = function () {

        if($("#ContestEndInstant").is( ":checked" )){

            $("#ContestEnd").prop("checked",false);
            $("#cg_datepicker").addClass("cg_disabled");
            $("#cg_date_hours_contest_end").addClass("cg_disabled");
            $("#cg_date_mins_contest_end").addClass("cg_disabled");
        }
        else{

        }

    };

    $("#ContestEndInstant").on('click',function () {
        cg_ContestEndInstant();
    });

    cg_ContestEndInstant();

// Check if end contest instant is on or not --- END

// Check if voting is activated or not

    var cg_AllowRating = function(){

        if($("#AllowRating").is( ":checked" ) || $("#AllowRating2").is( ":checked" )){

            $("#RatingOutGallery").removeClass("cg_disabled");
            $(".RatingPositionGallery").removeClass("cg_disabled");
            $("#HideUntilVote").removeClass("cg_disabled");
            $("#VotesPerUser").removeClass("cg_disabled");
            $("#VoteNotOwnImage").removeClass("cg_disabled");
            $("#ShowOnlyUsersVotes").removeClass("cg_disabled");
            $("#IpBlock").removeClass("cg_disabled");

        }
        else{

            $("#RatingOutGallery").addClass("cg_disabled");
            $(".RatingPositionGallery").addClass("cg_disabled");
            $("#HideUntilVote").addClass("cg_disabled");
            $("#VotesPerUser").addClass("cg_disabled");
            $("#VoteNotOwnImage").addClass("cg_disabled");
            $("#ShowOnlyUsersVotes").addClass("cg_disabled");
            $("#IpBlock").addClass("cg_disabled");

        }


    };

    $("#AllowRating").on('click',function () {

        if($(this).is( ":checked" )){

            $("#AllowRating").prop( "checked", true);
            $("#AllowRating2").prop( "checked", false);

        }

        cg_AllowRating();

    });
    $("#AllowRating2").on('click',function () {

        if($(this).is( ":checked" )){

            $("#AllowRating2").prop( "checked", true);
            $("#AllowRating").prop( "checked", false);

        }

        cg_AllowRating();

    });

    cg_AllowRating();

// Check if voting is activated or not --- END


// Check if facebook like button is activated or not

    var cg_FbLike = function () {

        if($("#FbLike").is( ":checked" )){

            $("#FbLikeGallery").removeClass("cg_disabled");
            $("#FbLikeGalleryVote").removeClass("cg_disabled");
            $("#FbLikeGoToGalleryLink").removeClass("cg_disabled");
            $("#FbLikeNoShare").removeClass("cg_disabled");

        }
        else{

            $("#FbLikeGallery").addClass("cg_disabled");
            $("#FbLikeGalleryVote").addClass("cg_disabled");
            $("#FbLikeGoToGalleryLink").addClass("cg_disabled");
            $("#FbLikeNoShare").addClass("cg_disabled");

        }

    };

    $("#FbLike").on('click',function () {
        cg_FbLike();
    });

    cg_FbLike();


// Check if facebook like button is activated or not --- END



// Check if commenting is activated or not



    var cg_AllowComments = function () {

        if($("#AllowComments").is( ":checked" )){

            $(".CommentPositionGallery").removeClass("cg_disabled");

        }
        else{

            $(".CommentPositionGallery").addClass("cg_disabled");

        }

    };

    $("#AllowComments").on('click',function () {
        cg_AllowComments();
    });

    cg_AllowComments();


// Check if commenting is activated or not --- END


// Check preselect

    function cgCheckPreselect(){

        if($("#RandomSort").is( ":checked" )){
            $("#PreselectSort").addClass("cg_disabled");
            $("#cgPreselectSortMessage").removeClass("cg_hide");
        }
        else{
            $("#PreselectSort").removeClass("cg_disabled");
            $("#cgPreselectSortMessage").addClass("cg_hide");
        }

    }

    $("#RandomSort").click(function(){
        cgCheckPreselect();
    });

    cgCheckPreselect();


// Check preselect --- END


// Check if slider is activated or not

    var cg_AllowGalleryScript = function(click){

        if($("#AllowGalleryScript").is( ":checked" ) || $("#SliderFullWindow").is( ":checked" ) ){
            // $("#FullSizeSlideOutStart").removeClass('cg_disabled');
            //   cg_FullSizeGallery();// Beeinflusst FullSizeSlideOutStart

            $("#OriginalSourceLinkInSlider").removeClass('cg_disabled');
            $("#ShowNickname").removeClass('cg_disabled');
            $("#SlideVertical").removeClass('cg_disabled');
            $("#ShowExif").removeClass('cg_disabled');
            $("#SlideHorizontal").removeClass('cg_disabled');
            $("#FullSizeSlideOutStart").removeClass('cg_disabled');
            $("#FullSizeImageOutGallery").prop('checked',false);
            $("#OnlyGalleryView").prop('checked',false);
            if(click && !$("#SliderFullWindow").is( ":checked" )){
                $("#SliderFullWindow").prop('checked',false);
            }
            if($("#AllowGalleryScript").is( ":checked" )){
                $("#SliderFullWindow").prop('checked',false);
            }
            if($("#SliderFullWindow").is( ":checked" ) ){
                $("#FullSizeSlideOutStart").addClass('cg_disabled');
            }

        }else if(!$("#AllowGalleryScript").is( ":checked" ) && click){

            if(click){
                $("#AllowGalleryScript").prop('checked',true);
            }
        }
        else{

            $("#FullSizeSlideOutStart").addClass('cg_disabled');
            $("#OriginalSourceLinkInSlider").addClass('cg_disabled');
            $("#ShowNickname").addClass('cg_disabled');
            $("#ShowExif").addClass('cg_disabled');
            $("#SlideVertical").addClass('cg_disabled');
            $("#SlideHorizontal").addClass('cg_disabled');

            if(click){
                $("#AllowGalleryScript").prop('checked',true);
            }

        }

    };

    $("#AllowGalleryScript").click(function(){

        cg_AllowGalleryScript(true);

    });
    cg_AllowGalleryScript();



// Check if slider is activated or not --- END



// Check if SliderFullWindow is activated or not

    var cg_SliderFullWindow = function(click){

        cg_AllowGalleryScript();

        if($("#SliderFullWindow").is( ":checked" )){

            $("#AllowGalleryScript").prop('checked',false);
            $("#FullSizeSlideOutStart").addClass('cg_disabled');
            /*        $("#OnlyGalleryView").prop('checked',false);
                    $("#FullSizeImageOutGallery").prop('checked',false);
                    //$("#FullSizeSlideOutStart").addClass('cg_disabled');
                 //   cg_FullSizeGallery(); // Beeinflusst FullSizeSlideOutStart

                    $("#OriginalSourceLinkInSlider").addClass('cg_disabled');
                    $("#ShowNickname").addClass('cg_disabled');
                    $("#SlideVertical").addClass('cg_disabled');
                    $("#ShowExif").addClass('cg_disabled');
                    $("#SlideHorizontal").addClass('cg_disabled');
                    $("#FullSizeSlideOutStart").addClass('cg_disabled');*/


        }else{

            if(click){
                $("#AllowGalleryScript").prop('checked',false);
                $("#SliderFullWindow").prop('checked',true);
                $("#FullSizeSlideOutStart").addClass('cg_disabled');

            }

        }

    };

    $("#SliderFullWindow").click(function(){
        cg_SliderFullWindow(true);

    });

    cg_SliderFullWindow();

// Check if SliderFullWindow is activated or not --- END



// Check if Full Size Image is activated or not

    var cg_FullSizeImageOutGallery = function(click){

        if($("#FullSizeImageOutGallery").is( ":checked" )){
            $("#AllowGalleryScript").prop('checked',false);
            $("#OnlyGalleryView").prop('checked',false);
            $("#SliderFullWindow").prop('checked',false);
            //$("#FullSizeSlideOutStart").addClass('cg_disabled');
            //  cg_FullSizeGallery(); // Beeinflusst FullSizeSlideOutStart

            $("#OriginalSourceLinkInSlider").addClass('cg_disabled');
            $("#ShowNickname").addClass('cg_disabled');
            $("#SlideVertical").addClass('cg_disabled');
            $("#ShowExif").addClass('cg_disabled');
            $("#SlideHorizontal").addClass('cg_disabled');
            $("#FullSizeSlideOutStart").addClass('cg_disabled');


        }else{

            if(click){
                $("#FullSizeImageOutGallery").prop('checked',true);
            }

        }

    };

    $("#FullSizeImageOutGallery").click(function(){

        cg_FullSizeImageOutGallery(true);

    });

    cg_FullSizeImageOutGallery();

// Check if Full Size Image is activated or not --- END

// Check if full screen can be enabled

    var cg_CheckFullSize = function(){

        if($("#FullSizeGallery").is( ":checked" )){
            $("#FullSize").removeClass("cg_disabled");
        }
        else{
            $("#FullSize").addClass("cg_disabled");
        }

    };

    $("#FullSizeGallery").on('click',function () {

        cg_CheckFullSize();

    });

    cg_CheckFullSize();



// Check if full screen can be enabled --- END

// Check if only gallery view is activated or not


    var cg_OnlyGalleryView = function(click){

        if($("#OnlyGalleryView").is( ":checked" )){

            $("#AllowGalleryScript").prop('checked',false);
            $("#FullSizeImageOutGallery").prop('checked',false);
            $("#SliderFullWindow").prop('checked',false);
            //$("#FullSizeSlideOutStart").addClass('cg_disabled');
            //    cg_FullSizeGallery(); // Beeinflusst FullSizeSlideOutStart

            $("#OriginalSourceLinkInSlider").addClass('cg_disabled');
            $("#ShowNickname").addClass('cg_disabled');
            $("#ShowExif").addClass('cg_disabled');
            $("#SlideVertical").addClass('cg_disabled');
            $("#SlideHorizontal").addClass('cg_disabled');
            $("#FullSizeSlideOutStart").addClass('cg_disabled');


        }else{

            if(click){
                $("#OnlyGalleryView").prop('checked',true);
            }

        }

    };

    $("#OnlyGalleryView").click(function(){

        cg_OnlyGalleryView(true);

    });

    cg_OnlyGalleryView();


// Check if only gallery view is activated or not --- END





    $(function() {
        /*		$( "#cg_options_sortable" ).sortable({cursor: "move", placeholder: "ui-state-highlight", stop: function( event, ui ) {

            if(document.readyState === "complete"){

                $( ".cg_options_sortableDiv" ).each(function( i ) {

                    v++;

                    $(this).find('.cg_options_order').contents().filter(function(){ return this.nodeType == 1; }).remove();

                    $(this).append('<p class="cg_options_order"><u>'+v+'. order</u></p>');



                       });

                       v = 0;

                       }

               }

                });*/
//$('#cg_options_sortable').css('cursor', 'move');
    });



// Allow only to press numbers as keys in input boxes

    //called when key is pressed in textbox
    $("#ScaleSizesGalery1, #ScaleSizesGalery2, #DistancePicsV, #DistancePicsV, #PicsInRow, #PicsPerSite,#ThumbViewBorderRadius,#RowViewBorderRadius,#HeightViewBorderRadius,#HeightViewSpaceHeight,#WidthThumb,"+
        "#PostMaxMB, #VotesPerUser, #RegUserMaxUpload, #VotesInTimeQuantity, #BulkUploadQuantity,#BulkUploadMinQuantity, #DistancePics, #MaxResJPGwidth, #MaxResJPGheight, #MaxResPNGwidth, #MaxResPNGheight, #MaxResGIFwidth, #MaxResGIFheight, #cg_row_look_border_width,#cg_height_look_border_width,#HeightViewBorderWidth").keypress(function (e) {
        //if the letter is not digit then display error and don't type anything
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            //display error message
           // $("#cg_options_errmsg").html("Only numbers are allowed").show().fadeOut("slow");
            return false;
        }
    });


// Allow only to press numbers as keys in input boxes --- END

// Allow only to choose color not to put color with keys
    /*$("#cg_row_look_border_color,#HeightViewBorderColor,#cg_thumb_look_border_color").keypress(function (evt) {

      var keycode = evt.charCode || evt.keyCode;
      if (keycode  == 13) { //Enter key's keycode
        return false;
      }
    });*/


// Allow only to choose color not to put color with keys --- END


// Slider Ansicht erlauben, normale Ansicht wird deaktiviert
    /*
    $("#AllowGalleryScript").click(function(){



        if($("#AllowGalleryScript").is( ":checked" )){

        $("#ScaleWidthGalery").prop("disabled",true);
        $("#ScaleSizesGalery").prop("disabled",true);
        $("#FullSize").prop("disabled",true);
        $( "#ScaleSizesGalery1" ).attr("disabled",true);
        $( "#ScaleSizesGalery2" ).attr("disabled",true);
        $( "#ScaleSizesGalery1" ).css({ 'background': '#e0e0e0' });
        $( "#ScaleSizesGalery2" ).css({ 'background': '#e0e0e0' });

        }

        else{

        $("#ScaleWidthGalery").prop("disabled",false);
        $("#ScaleSizesGalery").prop("disabled",false);
        $("#FullSize").prop("disabled",false);
        $( "#ScaleSizesGalery1" ).attr("disabled",true);
        $( "#ScaleSizesGalery2" ).attr("disabled",true);
        $( "#ScaleSizesGalery1" ).css({ 'background': '#ffffff' });
        $( "#ScaleSizesGalery2" ).css({ 'background': '#ffffff' });

        }

    });*/


// Slider Ansicht erlauben, normale Ansicht wird deaktiviert --- ENDE







    // Check input when site is load


    // Check gallery

    if($("#ScaleSizesGalery").is( ":checked" )){

//$( "#ScaleWidthGalery" ).attr("disabled",true);

        if($("#SinglePicView").is( ":checked" )){$("#ScaleWidthGalery").prop("disabled",false);}
        else{}

    }

    else{
        $( "#ScaleSizesGalery1" ).attr("disabled",true);
        $( "#ScaleSizesGalery2" ).attr("disabled",true);
        $( "#ScaleSizesGalery1" ).css({ 'background': '#e0e0e0' });
        $( "#ScaleSizesGalery2" ).css({ 'background': '#e0e0e0' });

    }

    if($("#ScaleWidthGalery").is( ":checked" )){
//$( "#ScaleSizesGalery" ).attr("disabled",true);
        $( "#ScaleSizesGalery2" ).attr("disabled",true);
        $( "#ScaleSizesGalery2" ).css({ 'background': '#e0e0e0' });

    }

    if($("#ScaleWidthGalery").is( ":checked" )){

        if($("#SinglePicView").is( ":checked" )){
            $( "#ScaleSizesGalery1" ).attr("disabled",false);
            $( "#ScaleSizesGalery1" ).css({ 'background': '#ffffff' });
        }

        else{}

    }


    // Check gallery END

// Check input when site is load END




// Click input checkboxes



    // Check gallery
    $("#ScaleSizesGalery").click(function(){



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

        }

    });

    $("#ScaleWidthGalery").click(function(){

        if($("#ScaleWidthGalery").is( ":checked" )){
            return;
            $("#ScaleSizesGalery").prop("checked",false);
            $("#ScaleSizesGalery1").prop("disabled",false);
            $("#ScaleSizesGalery2").prop("disabled",true);
            $( "#ScaleSizesGalery1" ).css({ 'background': '#ffffff' });
            $( "#ScaleSizesGalery2" ).css({ 'background': '#e0e0e0' });


        }

        else{
            $("#ScaleWidthGalery").prop("checked",true);


            return;

            $( "#ScaleSizesGalery" ).prop("checked",true);
            $("#ScaleSizesGalery").prop("disabled",false);
            $("#ScaleSizesGalery1").prop("disabled",false);
            $("#ScaleSizesGalery2").prop("disabled",false);
            $( "#ScaleSizesGalery2" ).css({ 'background': '#ffffff' });
            $( "#ScaleSizesGalery1" ).css({ 'background': '#ffffff' });

        }

    });

    // Check gallery END



// Check upload size


    var cg_ActivatePostMaxMB = function(){
        if($("#ActivatePostMaxMB").is( ":checked" )){
            $("#PostMaxMB").removeClass("cg_disabled");
        }
        else{
            $("#PostMaxMB").addClass("cg_disabled");
        }
    }


    $("#ActivatePostMaxMB").click(function(){

        cg_ActivatePostMaxMB();

    });
    cg_ActivatePostMaxMB();


    var cg_ActivateBulkUpload = function(){

        if($("#ActivateBulkUpload").is( ":checked" )){

            $("#BulkUploadQuantity").removeClass("cg_disabled");
            $("#BulkUploadMinQuantity").removeClass("cg_disabled");

        }
        else{

            $("#BulkUploadQuantity").addClass("cg_disabled");
            $("#BulkUploadMinQuantity").addClass("cg_disabled");

        }
    };

    $("#ActivateBulkUpload").click(function(){

        cg_ActivateBulkUpload();

    });

    cg_ActivateBulkUpload();

// Check upload size --- END



// Check resolution

//JPG

    var cg_allowRESjpg = function(){

        if($("#allowRESjpg").is( ":checked" )){

            $("#MaxResJPGwidth").removeClass("cg_disabled");
            $("#MaxResJPGheight").removeClass("cg_disabled");

        }
        else{

            $("#MaxResJPGwidth").addClass("cg_disabled");
            $("#MaxResJPGheight").addClass("cg_disabled");

        }

    };

    $("#allowRESjpg").click(function(){

        cg_allowRESjpg();

    });

    cg_allowRESjpg();

//PNG

    var cg_allowRESpng = function(){

        if($("#allowRESpng").is( ":checked" )){

            $("#MaxResPNGwidth").removeClass("cg_disabled");
            $("#MaxResPNGheight").removeClass("cg_disabled");

        }
        else{

            $("#MaxResPNGwidth").addClass("cg_disabled");
            $("#MaxResPNGheight").addClass("cg_disabled");

        }

    };

    $("#allowRESpng").click(function(){

        cg_allowRESpng();

    });

    cg_allowRESpng();


//GIF

    var cg_allowRESgif = function(){

        if($("#allowRESgif").is( ":checked" )){

            $("#MaxResGIFwidth").removeClass("cg_disabled");
            $("#MaxResGIFheight").removeClass("cg_disabled");

        }
        else{

            $("#MaxResGIFwidth").addClass("cg_disabled");
            $("#MaxResGIFheight").addClass("cg_disabled");

        }

    };

    $("#allowRESgif").click(function(){

        cg_allowRESgif();

    });

    cg_allowRESgif();

// Check resolution END


// Click input checkboxes END


// Check Background color


    $("#ActivateGalleryBackgroundColor").click(function() {

        if($(this).is(":checked")){

            $("#GalleryBackgroundColor").attr("disabled",false);
            $("#GalleryBackgroundColor").css({ 'background': '#ffffff' });

        }

        else{

            $("#GalleryBackgroundColor").attr("disabled",true);
            $("#GalleryBackgroundColor").css({ 'background': '#e0e0e0' });

        }

    });

// Check Background color --- ENDE

    var cg_HeightLook = function(click){

        if($("#HeightLook").is(':checked')){

            $("#HeightLookHeight").removeClass("cg_disabled");
            $("#HeightViewSpaceWidth").removeClass("cg_disabled");
            $("#HeightViewSpaceHeight").removeClass("cg_disabled");
            $("#HeightViewBorderWidth").removeClass("cg_disabled");
            $("#HeightViewBorderColor").removeClass("cg_disabled");

        }else if(!$("#HeightLook").is( ":checked" ) && click && (!$("#RowLook").is(':checked') && !$("#ThumbLook").is(':checked') && !$("#SliderLook").is(':checked'))){

            $("#HeightLook").prop('checked',true);

        }else{

            $("#HeightLookHeight").addClass("cg_disabled");
            $("#HeightViewSpaceWidth").addClass("cg_disabled");
            $("#HeightViewSpaceHeight").addClass("cg_disabled");
            $("#HeightViewBorderWidth").addClass("cg_disabled");
            $("#HeightViewBorderColor").addClass("cg_disabled");

        }

    };


    $("#HeightLook").click(function() {

        cg_HeightLook(true);


    });

    cg_HeightLook();


    var cg_ThumbLook = function(click){

        if($("#ThumbLook").is(':checked')){

            $("#WidthThumb").removeClass("cg_disabled");
            $("#HeightThumb").removeClass("cg_disabled");
            $("#DistancePics").removeClass("cg_disabled");
            $("#DistancePicsV").removeClass("cg_disabled");
            $("#ThumbViewBorderWidth").removeClass("cg_disabled");
            $("#ThumbViewBorderColor").removeClass("cg_disabled");

        }else if(!$("#ThumbLook").is( ":checked" ) && click && (!$("#RowLook").is(':checked') && !$("#HeightLook").is(':checked') && !$("#SliderLook").is(':checked'))){

            $("#ThumbLook").prop('checked',true);

        }
        else{

            $("#WidthThumb").addClass("cg_disabled");
            $("#HeightThumb").addClass("cg_disabled");
            $("#DistancePics").addClass("cg_disabled");
            $("#DistancePicsV").addClass("cg_disabled");
            $("#ThumbViewBorderWidth").addClass("cg_disabled");
            $("#ThumbViewBorderColor").addClass("cg_disabled");

        }

    };


    $("#ThumbLook").click(function() {

        cg_ThumbLook(true);

    });

    cg_ThumbLook();


    var cg_RowLook = function(click){

        if($("#RowLook").is(':checked')){

            $("#PicsInRow").removeClass("cg_disabled");
            $("#RowViewSpaceWidth").removeClass("cg_disabled");
            $("#RowViewSpaceHeight").removeClass("cg_disabled");
            $("#RowViewBorderWidth").removeClass("cg_disabled");
            $("#RowViewBorderColor").removeClass("cg_disabled");

        }else if(!$("#RowLook").is( ":checked" ) && click && (!$("#ThumbLook").is(':checked') && !$("#HeightLook").is(':checked') && !$("#SliderLook").is(':checked'))){

            $("#RowLook").prop('checked',true);

        }
        else{

            $("#PicsInRow").addClass("cg_disabled");
            $("#RowViewSpaceWidth").addClass("cg_disabled");
            $("#RowViewSpaceHeight").addClass("cg_disabled");
            $("#RowViewBorderWidth").addClass("cg_disabled");
            $("#RowViewBorderColor").addClass("cg_disabled");

        }

    };


    $("#RowLook").click(function() {

        cg_RowLook(true);


    });

    cg_RowLook();



    var cg_SliderLook = function(click){

        if(!$("#SliderLook").is( ":checked" ) && click && (!$("#RowLook").is(':checked') && !$("#HeightLook").is(':checked') && !$("#SliderLook").is(':checked'))){

            $("#SliderLook").prop('checked',true);

        }

    };


    $("#SliderLook").click(function() {

        cg_SliderLook(true);

    });


// Check if Height Look fields are checked or not

// Check if Height Look fields are checked or not --- ENDE


// Check if Row Fields are checked or not

// Check if Row Fields are checked or not  --- END

    var checkInGalleryUpload = function(){

        if($('#GalleryUpload').is(":checked")){

            $( "#GalleryUploadOnlyUser" ).removeClass("cg_disabled");
            $( "#wp-GalleryUploadTextBefore-wrap" ).removeClass("cg_disabled");
            $( "#wp-GalleryUploadTextAfter-wrap" ).removeClass("cg_disabled");
            $( "#wp-GalleryUploadConfirmationText-wrap" ).removeClass("cg_disabled");

        }
        else{

            $( "#GalleryUploadOnlyUser" ).addClass("cg_disabled");
            $( "#wp-GalleryUploadTextBefore-wrap" ).addClass("cg_disabled");
            $( "#wp-GalleryUploadTextAfter-wrap" ).addClass("cg_disabled");
            $( "#wp-GalleryUploadConfirmationText-wrap" ).addClass("cg_disabled");

        }

    };

    checkInGalleryUpload();

// Activate in gallery upload form

    $("#GalleryUpload").click(function() {

        checkInGalleryUpload();

    });



// Activate in gallery upload form --- END



// Check if forward upload fields are checked or not

    var cg_confirm_after_upload = function(){

        if($('#cg_confirm_text').is(":checked")){

            $( "#forward_url" ).addClass('cg_disabled');
            $( "#wp-confirmation_text-wrap" ).removeClass('cg_disabled');
            $( "#forward" ).prop('checked',false);
            $( "#ShowFormAfterUpload" ).removeClass('cg_disabled');

        }
        else{

            $( "#forward_url" ).removeClass('cg_disabled');
            $( "#wp-confirmation_text-wrap" ).addClass('cg_disabled');
            $( "#forward" ).prop('checked',true);
            $( "#ShowFormAfterUpload" ).addClass('cg_disabled');

        }

    };

    $("#cg_confirm_text").click(function(){

        cg_confirm_after_upload();

    });

    cg_confirm_after_upload();

    var cg_forward_after_upload = function(){

        if($('#forward').is(":checked")){

            $( "#forward_url" ).removeClass('cg_disabled');
            $( "#wp-confirmation_text-wrap" ).addClass('cg_disabled');
            $( "#cg_confirm_text" ).prop('checked',false);
            $( "#ShowFormAfterUpload" ).addClass('cg_disabled');

        }
        else{

            $( "#forward_url" ).addClass('cg_disabled');
            $( "#wp-confirmation_text-wrap" ).removeClass('cg_disabled');
            $( "#cg_confirm_text" ).prop('checked',true);
            $( "#ShowFormAfterUpload" ).removeClass('cg_disabled');


        }

    };

    $("#forward").click(function(){

        cg_forward_after_upload();

    });

    cg_forward_after_upload();


// Check if forward upload fields are checked or not  --- END

    var cg_inform_admin_after_upload = function(){

        if($('#InformAdmin').is(":checked")){

            $( "#cgInformAdminFrom" ).removeClass('cg_disabled');
            $( "#cgInformAdminAdminMail" ).removeClass('cg_disabled');
            $( "#cgInformAdminReply" ).removeClass('cg_disabled');
            $( "#cgInformAdminCc" ).removeClass('cg_disabled');
            $( "#cgInformAdminBcc" ).removeClass('cg_disabled');
            $( "#cgInformAdminHeader" ).removeClass('cg_disabled');
            $( "#wp-InformAdminText-wrap" ).removeClass('cg_disabled');

        }
        else{

            $( "#cgInformAdminFrom" ).addClass('cg_disabled');
            $( "#cgInformAdminAdminMail" ).addClass('cg_disabled');
            $( "#cgInformAdminReply" ).addClass('cg_disabled');
            $( "#cgInformAdminCc" ).addClass('cg_disabled');
            $( "#cgInformAdminBcc" ).addClass('cg_disabled');
            $( "#cgInformAdminHeader" ).addClass('cg_disabled');
            $( "#wp-InformAdminText-wrap" ).addClass('cg_disabled');

        }

    };

    $("#InformAdmin").click(function(){

        cg_inform_admin_after_upload();

    });

    cg_inform_admin_after_upload();


// Check if forward login fields are checked or not

    var cg_after_login = function(){

        if($("#ForwardAfterLoginUrlCheck").is(":checked")){

            $( "#ForwardAfterLoginUrl" ).removeClass("cg_disabled");
            $( "#wp-ForwardAfterLoginText-wrap" ).addClass("cg_disabled");
            $( "#ForwardAfterLoginTextCheck" ).prop("checked",false);

        }

        else{

            $( "#ForwardAfterLoginUrl" ).addClass("cg_disabled");
            $( "#wp-ForwardAfterLoginText-wrap" ).removeClass("cg_disabled");
            $( "#ForwardAfterLoginTextCheck" ).prop("checked",true);

        }

    };


    $("#ForwardAfterLoginUrlCheck").click(function() {

        cg_after_login();

    });

    cg_after_login();


    var cg_after_confirm_text = function(){

        if($("#ForwardAfterLoginTextCheck").is(":checked")){

            $( "#wp-ForwardAfterLoginText-wrap" ).removeClass("cg_disabled");
            $( "#ForwardAfterLoginUrl" ).addClass("cg_disabled");
            $( "#ForwardAfterLoginUrlCheck" ).prop("checked",false);

        }

        else{

            $( "#wp-ForwardAfterLoginText-wrap" ).addClass("cg_disabled");
            $( "#ForwardAfterLoginUrl" ).removeClass("cg_disabled");
            $( "#ForwardAfterLoginUrlCheck" ).prop("checked",true);

        }

    };


    $("#ForwardAfterLoginTextCheck").click(function() {

        cg_after_confirm_text();

    });

    cg_after_confirm_text();


// Check if forward login fields are checked or not  --- END


// Check mail confirm email

    var cg_mail_confirm_email = function(){

        if($("#mConfirmSendConfirm").is(":checked")){

            $( "#mConfirmAdmin" ).removeClass("cg_disabled");
            $( "#mConfirmReply" ).removeClass("cg_disabled");
            $( "#mConfirmCC" ).removeClass("cg_disabled");
            $( "#mConfirmBCC" ).removeClass("cg_disabled");
            $( "#mConfirmHeader" ).removeClass("cg_disabled");
            $( "#mConfirmURL" ).removeClass("cg_disabled");
            $( "#wp-mConfirmContent-wrap" ).removeClass("cg_disabled");
            $( "#wp-mConfirmConfirmationText-wrap" ).removeClass("cg_disabled");


        }

        else{

            $( "#mConfirmAdmin" ).addClass("cg_disabled");
            $( "#mConfirmReply" ).addClass("cg_disabled");
            $( "#mConfirmCC" ).addClass("cg_disabled");
            $( "#mConfirmBCC" ).addClass("cg_disabled");
            $( "#mConfirmHeader" ).addClass("cg_disabled");
            $( "#mConfirmURL" ).addClass("cg_disabled");
            $( "#wp-mConfirmContent-wrap" ).addClass("cg_disabled");
            $( "#wp-mConfirmConfirmationText-wrap" ).addClass("cg_disabled");

        }

    };


    $("#mConfirmSendConfirm").click(function() {

        cg_mail_confirm_email();

    });

    cg_mail_confirm_email();



// Check mail confirm email --- ENDE


// Check image activation email

    var cg_image_activation_email = function(){

        if($("#InformUsers").is(":checked")){

            $( "#from_user_mail" ).removeClass("cg_disabled");
            $( "#reply_user_mail" ).removeClass("cg_disabled");
            $( "#cc_user_mail" ).removeClass("cg_disabled");
            $( "#bcc_user_mail" ).removeClass("cg_disabled");
            $( "#header_user_mail" ).removeClass("cg_disabled");
            $( "#url_user_mail" ).removeClass("cg_disabled");
            $( "#wp-cgEmailImageActivating-wrap" ).removeClass("cg_disabled");

        }

        else{

            $( "#from_user_mail" ).addClass("cg_disabled");
            $( "#reply_user_mail" ).addClass("cg_disabled");
            $( "#cc_user_mail" ).addClass("cg_disabled");
            $( "#bcc_user_mail" ).addClass("cg_disabled");
            $( "#header_user_mail" ).addClass("cg_disabled");
            $( "#url_user_mail" ).addClass("cg_disabled");
            $( "#wp-cgEmailImageActivating-wrap" ).addClass("cg_disabled");

        }

    };


    $("#InformUsers").click(function() {

        cg_image_activation_email();

    });

    cg_image_activation_email();


// Check image activation email --- ENDE


// Check show text instead of upload form or not

/*    var cgRegUserUploadOnly = function(){

        if($('#RegUserUploadOnly').is(":checked")){

           // $( "#wp-RegUserUploadOnlyText-wrap" ).removeClass("cg_disabled");
            $( "#RegUserMaxUpload" ).removeClass("cg_disabled");
            $( "#CheckIpUpload" ).removeClass("cg_disabled");
            $( "#CheckCookieUpload" ).removeClass("cg_disabled");
            $( "#CheckLoginUpload" ).removeClass("cg_disabled");
            $( "#UploadRequiresCookieMessage" ).removeClass("cg_disabled");

        }
        else{

            $( "#wp-RegUserUploadOnlyText-wrap" ).addClass("cg_disabled");
            $( "#RegUserMaxUpload" ).addClass("cg_disabled");
            $( "#CheckIpUpload" ).addClass("cg_disabled");
            $( "#CheckCookieUpload" ).addClass("cg_disabled");
            $( "#CheckLoginUpload" ).addClass("cg_disabled");
            $( "#UploadRequiresCookieMessage" ).addClass("cg_disabled");

        }

    };

    $("#RegUserUploadOnly").click(function() {

        cgRegUserUploadOnly();

    });

    cgRegUserUploadOnly();*/


    var cgRegUserTextShowCheck = function(){

        if($('#CheckLoginUpload').is(":checked") ){

            $( "#wp-RegUserUploadOnlyText-wrap" ).removeClass("cg_disabled");

        }
        else{

            $( "#wp-RegUserUploadOnlyText-wrap" ).addClass("cg_disabled");

        }

    };

    $("#CheckLoginUpload, #CheckIpUpload, #CheckCookieUpload").change(function() {

        cgRegUserTextShowCheck();

    });

    cgRegUserTextShowCheck();


    var cgUploadRequiresCookieMessageCheck = function(){

        if($('#CheckCookieUpload').is(":checked") ){

            $( "#UploadRequiresCookieMessage" ).removeClass("cg_disabled");

        }
        else{

            $( "#UploadRequiresCookieMessage" ).addClass("cg_disabled");

        }

    };

    $("#CheckLoginUpload, #CheckIpUpload, #CheckCookieUpload").change(function() {

        cgUploadRequiresCookieMessageCheck();

    });

    cgUploadRequiresCookieMessageCheck();



    var cgRegUserGalleryOnly = function(){

        if($('#RegUserGalleryOnly').is(":checked")){

            $( "#wp-RegUserGalleryOnlyText-wrap" ).removeClass("cg_disabled");

        }
        else{

            $( "#wp-RegUserGalleryOnlyText-wrap" ).addClass("cg_disabled");

        }

    };

    $("#RegUserGalleryOnly").click(function() {

        cgRegUserGalleryOnly();

    });

    cgRegUserGalleryOnly();


    var cg_pro_version_wp_editor_check = function(){


        $('.cg-pro-false-container').find('.wp-switch-editor:first-child').click();
        $('.cg-pro-false-container').find('.wp-core-ui.wp-editor-wrap').addClass('cg_disabled');

    };

    cg_pro_version_wp_editor_check();

    var cg_user_reocgnising_method = function(){

        if($('.CheckMethod:checked').val()=='cookie'){
            $('#CheckCookieAlertMessage').removeClass('cg_disabled');
        }else{
            $('#CheckCookieAlertMessage').addClass('cg_disabled');
        }

    };

    cg_user_reocgnising_method();

    $(document).on('click', '.CheckMethod', function(e){
        cg_user_reocgnising_method();
    });

    // reset votes confirm
    $(document).on('click', '#cg_reset_votes2', function(e){

        var confirmText = $('#cg_reset_votes2_explanation').html();
        confirmText = confirmText.split("<br>").join("\r\n");

        if (confirm(confirmText)) {
            return true;
        } else {
            e.preventDefault();
            return false;
        }

    });

    $(document).on('click', '#cg_reset_votes', function(e){

        var confirmText = $('#cg_reset_votes_explanation').html();
        confirmText = confirmText.split("<br>").join("\r\n");

        if (confirm(confirmText)) {
            return true;
        } else {
            e.preventDefault();
            return false;
        }

    });

    $(document).on('click', '#cg_reset_users_votes2', function(e){

        var confirmText = $('#cg_reset_users_votes2_explanation').html();
        confirmText = confirmText.split("<br>").join("\r\n");

        if (confirm(confirmText)) {
            return true;
        } else {
            e.preventDefault();
            return false;
        }

    });

    $(document).on('click', '#cg_reset_users_votes', function(e){

        var confirmText = $('#cg_reset_users_votes_explanation').html();
        confirmText = confirmText.split("<br>").join("\r\n");

        if (confirm(confirmText)) {
            return true;
        } else {
            e.preventDefault();
            return false;
        }

    });

    $(document).on('click', '#cg_reset_admin_votes', function(e){

        var confirmText = $('#cg_reset_admin_votes_explanation').html();
        confirmText = confirmText.split("<br>").join("\r\n");

        if (confirm(confirmText)) {
            return true;
        } else {
            e.preventDefault();
            return false;
        }

    });

    $(document).on('click', '#cg_reset_admin_votes2', function(e){

        var confirmText = $('#cg_reset_admin_votes2_explanation').html();
        confirmText = confirmText.split("<br>").join("\r\n");

        if (confirm(confirmText)) {
            return true;
        } else {
            e.preventDefault();
            return false;
        }

    });


    var cg_set_wpnonce = function(){

        $('.cg-rating-reset').each(function () {

            $(this).attr('href',$(this).attr('href')+'&_wpnonce='+$('#_wpnonce').val());

        });

    };

    cg_set_wpnonce();



    $('#HideRegFormAfterLogin').on('click', function(e){

        cg_HideRegFormAfterLogin();

    });
    var cg_HideRegFormAfterLogin = function(){

        if($('#HideRegFormAfterLogin').prop('checked')){
            $('#HideRegFormAfterLoginShowTextInstead').removeClass('cg_disabled');
         //   $('#wp-HideRegFormAfterLoginTextToShow-wrap').removeClass('cg_disabled');
        }else{
            $('#HideRegFormAfterLoginShowTextInstead').addClass('cg_disabled');
            $('#wp-HideRegFormAfterLoginTextToShow-wrap').addClass('cg_disabled');
        }

    };
    cg_HideRegFormAfterLogin();




    $('#HideRegFormAfterLoginShowTextInstead').on('click', function(e){

        cg_HideRegFormAfterLoginShowTextInstead();

    });
    var cg_HideRegFormAfterLoginShowTextInstead = function(){

        if($('#HideRegFormAfterLoginShowTextInstead').prop('checked') && $('#HideRegFormAfterLogin').prop('checked')){
            $('#wp-HideRegFormAfterLoginTextToShow-wrap').removeClass('cg_disabled');
        }else{
            $('#wp-HideRegFormAfterLoginTextToShow-wrap').addClass('cg_disabled');
        }

    };
    cg_HideRegFormAfterLoginShowTextInstead();



    // replace reset votes

    var reloadUrl = window.location.href;

    if (reloadUrl.indexOf("reset_votes") >= 0){
        reloadUrl = reloadUrl.replace(/reset_votes/gi,'reset_votes_done');
    }

    if (reloadUrl.indexOf("reset_users_votes") >= 0){
        reloadUrl = reloadUrl.replace(/reset_users_votes/gi,'reset_users_votes_done');
    }

    if (reloadUrl.indexOf("reset_votes2") >= 0){
        reloadUrl = reloadUrl.replace(/reset_votes2/gi,'reset_votes2_done');
    }

    if (reloadUrl.indexOf("reset_users_votes2") >= 0){
        reloadUrl = reloadUrl.replace(/reset_users_votes2/gi,'reset_users_votes2_done');
    }

    if (reloadUrl.indexOf("reset_admin_votes") >= 0){
        reloadUrl = reloadUrl.replace(/reset_admin_votes/gi,'reset_admin_votes_done');
    }

    if (reloadUrl.indexOf("reset_admin_votes2") >= 0){
        reloadUrl = reloadUrl.replace(/reset_admin_votes2/gi,'reset_admin_votes2_done');
    }

    history.replaceState(null,null,reloadUrl);

    // replace reset votes --- ENDE


    setTimeout(function () {
        // change iframe body css
        $('.cg-small-textarea-container iframe').contents().find('body').css({
            'margin':'10px',
            'width':'auto'
        });
    },1000);


    /*Tab actions*/

    var $cgGoTopOptions = $('#cgGoTopOptions');
    var $cg_main_options_tab = $('#cg_main_options_tab');
    var $cg_main_options_content = $('#cg_main_options_content');
    var $cg_view_select_objects = $cg_main_options_tab.find('.cg_view_select');
    var $wpadminbar = $('#wpadminbar');
    var windowHeight = $(window).height();
    var lastScrollTop = 0;
    var clickTime = 0;

    if($cg_main_options_tab.length>=1){

        $(document).on('click','#cgGoTopOptions',function () {
            $(window).scrollTop(0);
        });

        $(document).on('click','#cgSaveOptionsNavButton',function () {
            $('#cgSaveOptionsButton').click();
        });

        $(document).on('click','#cg_main_options_tab .cg_view_select',function () {
            clickTime = new Date().getTime();
            //  var viewHelper = $(this).find('a').attr('data-href');
            var viewId = $(this).find('a').attr('data-view');
            var $view = $(viewId);
            var viewOffsetTop = $view.offset().top;
            var heightWpadminbar = $('#wpadminbar').height();
            var height_cg_main_options_tab = $('#cg_main_options_tab').height();
            var $cg_main_options_tab = $('#cg_main_options_tab');

            if($cg_main_options_tab.hasClass('cg_sticky')){
                var totalOffset = viewOffsetTop-heightWpadminbar-height_cg_main_options_tab-10;
            }else{
                var totalOffset = viewOffsetTop-heightWpadminbar-height_cg_main_options_tab-10-$cg_main_options_tab.outerHeight();
            }

            var $cg_main_options_content = $('#cg_main_options_content');
            $cg_main_options_tab.find('.cg_view_select').removeClass('cg_selected');
            $cg_main_options_content.find('.cg_view_header').removeClass('cg_selected');
            $(this).addClass('cg_selected');
            $cg_main_options_tab.addClass('cg_sticky');
            $(window).scrollTop(totalOffset);

            //var $viewHelper = $('<div id="'+viewHelper+'" class="cg_view_helper"></div>');
            //var $viewHelper = $viewHelper.css('margin-bottom',totalHeight+'px');
            //   $viewHelper.insertBefore($cg_main_options_content.find(view));
            // $cg_main_options_tab.addClass('cg_sticky');
            // document.getElementById(viewHelper).scrollIntoView();
            // setTimeout(function () {
            // $viewHelper.remove(); will be removed on scroll
            //  },10);
        });


        $( window ).scroll(function() {

            var height_cg_main_options_tab = $cg_main_options_tab.height();
            var heightWpadminbar = $wpadminbar.height();
            var windowScrollTop = $(window).scrollTop();

            if(windowScrollTop>=windowHeight){//then Downscroll
                $cgGoTopOptions.removeClass('cg_hide');
            }else{
                $cgGoTopOptions.addClass('cg_hide');
            }

            if(windowScrollTop>=$cg_main_options_content.offset().top && windowScrollTop>=lastScrollTop){//then Downscroll
                $cg_main_options_tab.addClass('cg_sticky');
            }

            if(windowScrollTop<$cg_main_options_content.offset().top && windowScrollTop<lastScrollTop){//then Downscroll
                $cg_main_options_tab.removeClass('cg_sticky');
            }

            $cg_view_select_objects.each(function () {
                var $cg_view_select = $(this);
                var $view = $cg_main_options_content.find($cg_view_select.attr('data-view'));
                var cg_view_offsetTop = $view.offset().top;
                var elementPositionRelatedToWindow = cg_view_offsetTop-windowScrollTop+$view.outerHeight()+$view.next().outerHeight()-height_cg_main_options_tab-heightWpadminbar;
                if(elementPositionRelatedToWindow > 0 && windowScrollTop>=lastScrollTop){//then Downscroll
                    var scrollTime = new Date().getTime()-1000;// if scroll time was later then 1 second of click time
                    if(scrollTime>clickTime){
                        $cg_view_select_objects.removeClass('cg_selected');
                        $cg_view_select.addClass('cg_selected');
                    }
                    return false;
                }
                var heightCheck = windowHeight/4;
                if(elementPositionRelatedToWindow > heightCheck && windowScrollTop<lastScrollTop){//then Downscroll
                    var scrollTime = new Date().getTime()-1000;// if scroll time was later then 1 second of click time
                    if(scrollTime>clickTime){
                        $cg_view_select_objects.removeClass('cg_selected');
                        $cg_view_select.addClass('cg_selected');
                    }
                    return false;
                }
            });

            lastScrollTop = windowScrollTop;

        });

    }

    /*Tab actions - END*/

    // reset votes show info

    $(document).on('hover','#cg_reset_votes2',function (e) {
        e.preventDefault();
        $('#cg_reset_votes2_explanation').toggle();
    });
    $(document).on('hover','#cg_reset_users_votes2',function (e) {
        e.preventDefault();
        $('#cg_reset_users_votes2_explanation').toggle();
    });
    $(document).on('hover','#cg_reset_admin_votes2',function (e) {
        e.preventDefault();
        $('#cg_reset_admin_votes2_explanation').toggle();
    });

    $(document).on('hover','#cg_reset_votes',function (e) {
        e.preventDefault();
        $('#cg_reset_votes_explanation').toggle();
    });
    $(document).on('hover','#cg_reset_users_votes',function (e) {
        e.preventDefault();
        $('#cg_reset_users_votes_explanation').toggle();
    });
    $(document).on('hover','#cg_reset_admin_votes',function (e) {
        e.preventDefault();
        $('#cg_reset_admin_votes_explanation').toggle();
    });

    // reset votes show info --- END

    // go to and blink

    $(document).on('click','a[href="#cgActivateInGalleryUploadForm"]',function (e) {
        e.preventDefault();
        var offsetTop = $('#cgActivateInGalleryUploadForm').offset().top;
        $(window).scrollTop(offsetTop-300);
        $('#cgActivateInGalleryUploadForm').addClass('cg_blink');
    });

    // go to and blink --- END

    // allow sort options
    $(document).on('click','.cg-allow-sort-option',function (e) {
        e.preventDefault();
        var $element = $(this);
        if($element.hasClass('cg_unchecked')){
            $element.removeClass('cg_unchecked');
            $('.cg-allow-sort-input[value="'+$element.attr('data-cg-target')+'"]').prop('disabled',false);
        }else{
            $element.addClass('cg_unchecked');
            $('.cg-allow-sort-input[value="'+$element.attr('data-cg-target')+'"]').prop('disabled',true);
        }
    });

    // set inputs to disabled if unchecked
    $('.cg-allow-sort-option').each(function () {
        if($(this).hasClass('cg_unchecked')){
            $('.cg-allow-sort-input[value="'+$(this).attr('data-cg-target')+'"]').prop('disabled',true);
        }
    });

    // allow sort options --- END

    // allow sort

    $(document).on('click','#AllowSort',function () {
        cgAllowSortCheck();
    });

    function cgAllowSortCheck(){
        if($('#AllowSort').prop('checked')){
            $('#cgAllowSortOptionsContainer .cg-allow-sort-option').removeClass('cg_disabled');
            $('#cgAllowSortDependsOnMessage').addClass('cg_hide');
        }else{
            $('#cgAllowSortOptionsContainer .cg-allow-sort-option').addClass('cg_disabled');
            $('#cgAllowSortDependsOnMessage').addClass('cg_hide');
        }
    }

    cgAllowSortCheck();

    // allow sort --- END

});