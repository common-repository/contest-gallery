cgJsClass.gallery.sorting.findNewRowId = function(newData,newKey){

    newKey = parseInt(newKey);

    if(newData[newKey]){
        cgJsClass.gallery.sorting.findNewRowId(newData,newKey+1);
    }else{
        return newKey;
    }

};
cgJsClass.gallery.sorting.sortByRowId = function (gid,init,isDoNotAddToImageDataFiltered) {

    var data = cgJsData[gid].vars.rawData;

    if(!isDoNotAddToImageDataFiltered){
        cgJsData[gid].fullImageDataFiltered = [];
    }

    var newData = {};
    var i = 0;

    var startValue = cgJsClass.gallery.vars.sortingStartValue;
    var lastUnsortedValue;

    for (var key in data){

        if(!data.hasOwnProperty(key)){
            break;
        }

        // check rThumb
        if(init===true){

            if(data[key]['rThumb']=='90' || data[key]['rThumb']=='270'){
                var Width = data[key]['Width'];
                var Height = data[key]['Height'];
                data[key]['Width'] = Height;
                data[key]['Height'] = Width;
            }
        }

        if(data[key]['rowid']!='0'){// check startValue at the top in case row id is set, first rowid then by id desc (it is still part of old logi as sorting was done via rowid, can be removed some in future)
            var newKey = startValue + parseInt(data[key]['rowid']);

            // simply go sure, if saving go wrong, for example same rowids multiple times, then with this image will still appear
            if(newData[newKey]){
                newKey = cgJsClass.gallery.sorting.findNewRowId(newData,newKey);
            }

        }else{
            // HAS TO BE ALSO DONE IN sortByRowIdFiltered
            if(!lastUnsortedValue){
                lastUnsortedValue = startValue-1;
                var newKey = lastUnsortedValue;// earlier it was image id, so it was for sure like id descend
            }else{
                lastUnsortedValue = lastUnsortedValue-1;// earlier it was image id, so it is for sure like id descend
                var newKey = lastUnsortedValue;
            }
            //var newKey = key;// this is image id then!!!!

        }

        // old code
/*        if(newData[newKey]){
            newKey = newKey+'1';
            newData[newKey] = data[key];
        }else{
            newData[newKey] = data[key];
        }*/

        newData[newKey] = data[key];
        // add real id to new object value, to go sure
        newData[newKey]['id']  = parseInt(key);

      //  var newObject = {};
        //newObject[newData[newKey]['id']] = data[key];// für weitere verarbeitung in der art etabliert
        if(!isDoNotAddToImageDataFiltered){
            cgJsData[gid].fullImageDataFiltered[i] = {};
            cgJsData[gid].fullImageDataFiltered[i][newData[newKey]['id']] = data[key];
        }

        i++;

    }

    return newData;


};
cgJsClass.gallery.sorting.sortByRowIdFiltered = function (gid) {

    var newObj = {};
    var startValue = 100000;
    var lastUnsortedValue;

    jQuery.each(cgJsData[gid].fullImageDataFiltered, function( index,value ) {

        // index = array index
        // value = object
        // firstKey = object Key
        var firstKey = Object.keys(value)[0]; // objectKey = image ID
        var object = value[firstKey];
        // since 02.2022 sort by id!!!
        var id = object.id; // objectKey = image ID

        newObj[id] = object;

    });

    return newObj;


};