cgJsClass.gallery.rating = {
    init: function (gid) {
            cgJsClass.gallery.rating.clickRateOneStar(gid);
            cgJsClass.gallery.rating.clickRateFiveStar(gid);
    },
    updateData: function (gid,data,isFromSaveAfterRatingOrCommenting) {

        //console.trace();
        //debugger

        // correct to go sure no empty rateAndCommentNumbers for current images otherwise might get error!
        for(var realId in cgJsData[gid].vars.rawData){
            if(!cgJsData[gid].vars.rawData.hasOwnProperty(realId)){
                break;
            }
            if(!cgJsData[gid].rateAndCommentNumbers[realId]){
                cgJsData[gid].rateAndCommentNumbers[realId] = {};
                // has to be done after upload
                cgJsClass.gallery.vars.ratingAndCommentsProperties.forEach(function (property){
                    cgJsData[gid].rateAndCommentNumbers[realId][property] = 0;
                });
            }
        }

        // see cg_check_and_repair_image_file_data php function get all required values
        // CountSreal is for correcting of CountS if addCountS was added
        var valuesToSaveForSortArray = cgJsClass.gallery.vars.ratingAndCommentsProperties;

        var dataNew = {};

        // filter here for all values that are just required for sorting
        // and don't destroy the current data object it might be processed in further functions

        for(var realId in data){
            if(!data.hasOwnProperty(realId)){
                break;
            }
            for(var property in data[realId]){
                if(!data[realId].hasOwnProperty(property)){
                    break;
                }
                if(!dataNew[realId]){
                    dataNew[realId] = {};
                }
                if(valuesToSaveForSortArray.indexOf(property)>-1){
                    // parse existing values here to go sure
                    data[realId][property] = parseInt(data[realId][property]);
                    dataNew[realId][property] = data[realId][property];
                }
            }
        }

        var dataToSave = dataNew;

        if(isFromSaveAfterRatingOrCommenting){

            // recreate object for saving here
            var dataToSave = {};

            // save right values for indexDB:
            // so addCount not considered
            for(var realId in dataNew){

                if(!dataNew.hasOwnProperty(realId)){
                    break;
                }

                if(!dataToSave[realId]){
                    dataToSave[realId] = {};
                }

                for(var property in dataNew[realId]){

                    if(!dataNew[realId].hasOwnProperty(property)){
                        break;
                    }

                    dataToSave[realId][property] = dataNew[realId][property];
                }

                if(dataToSave[realId].CountSreal){
                    dataToSave[realId].CountS = dataToSave[realId].CountSreal;
                    delete dataToSave[realId].CountSreal;
                }

            }

            // overwrite the current one with the new one cleaned, that does not contain not required image-data
            // this image-data will be only added when setratingone, setratingfive or setcomment is done, file data comes frome there
            cgJsData[gid].rateAndCommentNumbers = dataToSave;

        }


    }
}
