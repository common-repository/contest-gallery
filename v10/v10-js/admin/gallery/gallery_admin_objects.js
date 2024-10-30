var cgJsAdminClass = cgJsAdminClass || {};
cgJsAdminClass.vars = {};
cgJsAdminClass.vars = {
    addValue: 0,
    setStarOnStarOffSrc: function(){

        this.setStarOnSrc = jQuery('#cg_rating_star_on').val();
        this.setStarOffSrc = jQuery('#cg_rating_star_off').val();

    },
    setStarOnSrc: '',
    setStarOffSrc: '',
    setRating0:function (container) {

        container.find('.cg_rating_star_1').attr('src',this.setStarOffSrc);
        container.find('.cg_rating_star_2').attr('src',this.setStarOffSrc);
        container.find('.cg_rating_star_3').attr('src',this.setStarOffSrc);
        container.find('.cg_rating_star_4').attr('src',this.setStarOffSrc);
        container.find('.cg_rating_star_5').attr('src',this.setStarOffSrc);

    },
    setRating1:function (container) {

        container.find('.cg_rating_star_1').attr('src',this.setStarOnSrc);
        container.find('.cg_rating_star_2').attr('src',this.setStarOffSrc);
        container.find('.cg_rating_star_3').attr('src',this.setStarOffSrc);
        container.find('.cg_rating_star_4').attr('src',this.setStarOffSrc);
        container.find('.cg_rating_star_5').attr('src',this.setStarOffSrc);

    },
    setRating2:function (container) {

        container.find('.cg_rating_star_1').attr('src',this.setStarOnSrc);
        container.find('.cg_rating_star_2').attr('src',this.setStarOnSrc);
        container.find('.cg_rating_star_3').attr('src',this.setStarOffSrc);
        container.find('.cg_rating_star_4').attr('src',this.setStarOffSrc);
        container.find('.cg_rating_star_5').attr('src',this.setStarOffSrc);
        
    },
    setRating3:function (container) {

        container.find('.cg_rating_star_1').attr('src',this.setStarOnSrc);
        container.find('.cg_rating_star_2').attr('src',this.setStarOnSrc);
        container.find('.cg_rating_star_3').attr('src',this.setStarOnSrc);
        container.find('.cg_rating_star_4').attr('src',this.setStarOffSrc);
        container.find('.cg_rating_star_5').attr('src',this.setStarOffSrc);
        
    },
    setRating4:function (container) {

        container.find('.cg_rating_star_1').attr('src',this.setStarOnSrc);
        container.find('.cg_rating_star_2').attr('src',this.setStarOnSrc);
        container.find('.cg_rating_star_3').attr('src',this.setStarOnSrc);
        container.find('.cg_rating_star_4').attr('src',this.setStarOnSrc);
        container.find('.cg_rating_star_5').attr('src',this.setStarOffSrc);
        
    },
    setRating5:function (container) {

        container.find('.cg_rating_star_1').attr('src',this.setStarOnSrc);
        container.find('.cg_rating_star_2').attr('src',this.setStarOnSrc);
        container.find('.cg_rating_star_3').attr('src',this.setStarOnSrc);
        container.find('.cg_rating_star_4').attr('src',this.setStarOnSrc);
        container.find('.cg_rating_star_5').attr('src',this.setStarOnSrc);
        
    },
    ratingRnew: 0,
    cgChangedValueSelectorInTargetedSortableDiv: '.cg_short_text, .cg_long_text',
    cgChangedAndSearchedValueSelector: '#cgSortable .cg_short_text, #cgSortable .cg_long_text',
    inputsChanged: false,
    selectChanged: false
};