cgJsClass.gallery.rateActions = {
    init: function () {

        var AllowRating = cgJsClass.gallery.options.general.AllowRating;
        var Manipulation = cgJsClass.gallery.options.pro.Manipulation;
        var ShowOnlyUsersVotes = cgJsClass.gallery.options.general.ShowOnlyUsersVotes;
        var CheckLogin = cgJsClass.gallery.options.general.CheckLogin; // allow only registred uses to vote



    },
    showNewCountSIpBlock: function (imageId,countS) {

        jQuery('#rating_cg-'+imageId+'').text(countS);
        // für slider noch einfüge

    },
    showNewCountSIdBlock: function (imageId,countS) {

        jQuery('#rating_cg-'+imageId+'').text(countS);
        // für slider noch einfüge

    },
    showOldCountSIpBlock: function (imageId) {

        var countS = cgJsClass.gallery.rating[imageId].CountS;

        if(cgJsClass.gallery.options.pro.Manipulate == 1){
            countS = countS + cgJsClass.gallery.rating[imageId].addCountS;
        }

        jQuery('#rating_cg-'+imageId+'').text(countS);
        // für slider noch einfüge

    },
    showOldCountSIpBlockOnlyUserVotes: function (imageId) {

        var countS = cgJsClass.gallery.rating[imageId].CountS;

        if(cgJsClass.gallery.options.pro.Manipulate == 1){
            countS = countS + cgJsClass.gallery.rating[imageId].addCountS;
        }

        jQuery('#rating_cg-'+imageId+'').text(countS);
        // für slider noch einfüge

    },
    showNewCountRIpBlock: function (imageId,rating,countR) {

        jQuery('#rating_cg-'+imageId+'').text(countS);
        // für slider noch einfüge

    },
    showOldCountRIpBlock: function (imageId) {

        var countS = cgJsClass.gallery.rating[imageId].CountS;

        if(cgJsClass.gallery.options.pro.Manipulate == 1){
            countS = countS + cgJsClass.gallery.rating[imageId].addCountS;
        }

        jQuery('#rating_cg-'+imageId+'').text(countS);
        // für slider noch einfüge

    },
    showOldCountRIpBlockOnlyUserVotes: function (imageId) {

        var countS = cgJsClass.gallery.rating[imageId].CountS;

        if(cgJsClass.gallery.options.pro.Manipulate == 1){
            countS = countS + cgJsClass.gallery.rating[imageId].addCountS;
        }

        jQuery('#rating_cg-'+imageId+'').text(countS);
        // für slider noch einfüge

    }
};
