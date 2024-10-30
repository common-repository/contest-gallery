cgJsClass.gallery.sorting.init = function () {

    cgJsClass.gallery.sorting.initSortRandomButton();
    
    cgJsClass.gallery.sorting.change();

};
cgJsClass.gallery.sorting.initSort = function(gid,filtered,isFromCategoriesOrSearch,isFromSortingSelect){

    cgJsClass.gallery.sorting.reset(gid);

    if(cgJsData[gid].vars.sorting=='custom'){
            var newData = cgJsClass.gallery.sorting.sortByPositionIdFiltered(gid);
        cgJsData[gid].image = cgJsClass.gallery.sorting.ascPosition(newData);
        cgJsData[gid].vars.sortedCustomFullData = cgJsData[gid].image.slice(0);
        cgJsData[gid].fullImageDataFiltered = cgJsData[gid].image;
    }

    if(cgJsData[gid].vars.sorting=='date-desc'){
        var newData = cgJsClass.gallery.sorting.sortByIdFiltered(gid);
        cgJsData[gid].image = cgJsClass.gallery.sorting.desc(newData);
        cgJsData[gid].vars.sortedDateDescFullData = cgJsData[gid].image.slice(0);
        cgJsData[gid].fullImageDataFiltered = cgJsData[gid].image;
    }

    if(cgJsData[gid].vars.sorting=='date-asc'){
        var newData = cgJsClass.gallery.sorting.sortByIdFiltered(gid);
        cgJsData[gid].image = cgJsClass.gallery.sorting.asc(newData);
        cgJsData[gid].vars.sortedDateAscFullData = cgJsData[gid].image.slice(0);
        cgJsData[gid].fullImageDataFiltered = cgJsData[gid].image;
    }

    if(cgJsData[gid].vars.sorting=='rating-desc'){

        if(cgJsData[gid].options.general.AllowRating==2){
            var newData = cgJsClass.gallery.sorting.countS(gid);
        }

        if(cgJsData[gid].options.general.AllowRatingDynamic){
            var newData = cgJsClass.gallery.sorting.countR(gid);
        }

        cgJsData[gid].image = cgJsClass.gallery.sorting.desc(newData);
        cgJsData[gid].vars.sortedRatingDescFullData = cgJsData[gid].image.slice(0);
        cgJsData[gid].fullImageDataFiltered = cgJsData[gid].image;

    }

    if(cgJsData[gid].vars.sorting=='rating-asc'){

        if(cgJsData[gid].options.general.AllowRating==2){
            var newData = cgJsClass.gallery.sorting.countS(gid);
        }
        if(cgJsData[gid].options.general.AllowRatingDynamic){
            var newData = cgJsClass.gallery.sorting.countR(gid);
        }

        cgJsData[gid].image = cgJsClass.gallery.sorting.asc(newData);
        cgJsData[gid].vars.sortedRatingAscFullData = cgJsData[gid].image.slice(0);
        cgJsData[gid].fullImageDataFiltered = cgJsData[gid].image;

    }

    if(cgJsData[gid].vars.sorting=='rating-desc-average'){

        if(cgJsData[gid].options.general.AllowRatingDynamic){
            var newData = cgJsClass.gallery.sorting.countRaverage(gid);
        }

        cgJsData[gid].image = cgJsClass.gallery.sorting.desc(newData);
        cgJsData[gid].vars.sortedRatingDescAverageFullData = cgJsData[gid].image.slice(0);
        cgJsData[gid].fullImageDataFiltered = cgJsData[gid].image;

    }

    if(cgJsData[gid].vars.sorting=='rating-asc-average'){

        if(cgJsData[gid].options.general.AllowRatingDynamic){
            var newData = cgJsClass.gallery.sorting.countRaverage(gid);
        }

        cgJsData[gid].image = cgJsClass.gallery.sorting.asc(newData);
        cgJsData[gid].vars.sortedRatingAscAverageFullData = cgJsData[gid].image.slice(0);
        cgJsData[gid].fullImageDataFiltered = cgJsData[gid].image;

    }

    if(cgJsData[gid].vars.sorting=='rating-desc-sum'){
        if(cgJsData[gid].options.general.AllowRatingDynamic){
            var newData = cgJsClass.gallery.sorting.countSum(gid);
        }
        cgJsData[gid].image = cgJsClass.gallery.sorting.desc(newData);
        cgJsData[gid].vars.sortedRatingDescSumFullData = cgJsData[gid].image.slice(0);
        cgJsData[gid].fullImageDataFiltered = cgJsData[gid].image;

    }

    if(cgJsData[gid].vars.sorting=='rating-asc-sum'){

        if(cgJsData[gid].options.general.AllowRatingDynamic){
            var newData = cgJsClass.gallery.sorting.countSum(gid);
        }

        cgJsData[gid].image = cgJsClass.gallery.sorting.asc(newData);
        cgJsData[gid].vars.sortedRatingAscSumFullData = cgJsData[gid].image.slice(0);
        cgJsData[gid].fullImageDataFiltered = cgJsData[gid].image;

    }

    if(cgJsData[gid].vars.sorting=='comments-desc'){
        var newData = cgJsClass.gallery.sorting.countC(gid);
        cgJsData[gid].image = cgJsClass.gallery.sorting.desc(newData);
        cgJsData[gid].vars.sortedCommentsDescFullData = cgJsData[gid].image.slice(0);
        cgJsData[gid].fullImageDataFiltered = cgJsData[gid].image;

    }
    if(cgJsData[gid].vars.sorting=='comments-asc'){
        var newData = cgJsClass.gallery.sorting.countC(gid);
        cgJsData[gid].image = cgJsClass.gallery.sorting.asc(newData);
        cgJsData[gid].vars.sortedCommentsAscFullData = cgJsData[gid].image.slice(0);
        cgJsData[gid].fullImageDataFiltered = cgJsData[gid].image;
    }

    if(cgJsData[gid].vars.sorting=='random'){
        cgJsData[gid].image = cgJsClass.gallery.sorting.random(gid);
        cgJsData[gid].fullImageDataFiltered = cgJsData[gid].image;
    }

    return cgJsData[gid].fullImageDataFiltered;

};
cgJsClass.gallery.sorting.returnFullImageDataSorted = function(gid){

    // Array will be returned
    var fullImageDataToUse;

    if(cgJsData[gid].vars.sorting == 'random'){
        fullImageDataToUse = cgJsData[gid].vars.sortedRandomFullData;
    }
    if(cgJsData[gid].vars.sorting == 'custom'){
        fullImageDataToUse = cgJsData[gid].vars.sortedCustomFullData;
    }
    else if(cgJsData[gid].vars.sorting == 'date-desc'){
        fullImageDataToUse = cgJsData[gid].vars.sortedDateDescFullData;
    }
    else if(cgJsData[gid].vars.sorting == 'date-asc'){
        fullImageDataToUse = cgJsData[gid].vars.sortedDateAscFullData;
    }
    else if(cgJsData[gid].vars.sorting == 'rating-desc'){
        fullImageDataToUse = cgJsData[gid].vars.sortedRatingDescFullData;
    }
    else if(cgJsData[gid].vars.sorting == 'rating-asc'){
        fullImageDataToUse = cgJsData[gid].vars.sortedRatingAscFullData;
    }
    else if(cgJsData[gid].vars.sorting == 'rating-desc-average'){
        fullImageDataToUse = cgJsData[gid].vars.sortedRatingDescAverageFullData;
    }
    else if(cgJsData[gid].vars.sorting == 'rating-asc-average'){
        fullImageDataToUse = cgJsData[gid].vars.sortedRatingAscAverageFullData;
    }
    else if(cgJsData[gid].vars.sorting == 'rating-desc-sum'){
        fullImageDataToUse = cgJsData[gid].vars.sortedRatingDescSumFullData;
    }
    else if(cgJsData[gid].vars.sorting == 'rating-asc-sum'){
        fullImageDataToUse = cgJsData[gid].vars.sortedRatingAscSumFullData;
    }
    else if(cgJsData[gid].vars.sorting == 'comments-desc'){
        fullImageDataToUse = cgJsData[gid].vars.sortedCommentsDescFullData;
    }
    else if(cgJsData[gid].vars.sorting == 'comments-asc'){
        fullImageDataToUse = cgJsData[gid].vars.sortedCommentsAscFullData;
    }else{
        fullImageDataToUse = cgJsData[gid].fullImageDataFiltered;
    }

    return fullImageDataToUse;

};
