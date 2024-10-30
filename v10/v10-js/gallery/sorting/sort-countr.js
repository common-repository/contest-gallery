cgJsClass.gallery.sorting.countR = function (gid) {

    var newObj = {};

    var countImages = Object.keys(cgJsData[gid].fullImageDataFiltered).length;
    var Manipulate = cgJsData[gid].options.pro.Manipulate;

    jQuery.each(cgJsData[gid].fullImageDataFiltered, function( index,value ) {

        // index = array index
        // value = object
        // firstKey = object Key
        var firstKey = Object.keys(value)[0]; // objectKey = image ID
        var object = value[firstKey];

        var add = parseInt(object['CountRtotal']);
        var newFirstKey = parseInt(add+'00000');

        // nach rating setzen
        if(add>0){


            if(newObj.hasOwnProperty(newFirstKey)==false){

                newObj[newFirstKey] = object;

            }
            else{

                for (var i=0; i<=countImages; i++) {

                    newFirstKey = newFirstKey+1;

                    if(newObj.hasOwnProperty(newFirstKey)==false) {

                        newObj[newFirstKey] = object;
                        break;
                    }
                }
            }

        }
        else{ // wenn null dann nach id setzen

            var id = object['id']; // objectKey = image ID
            newObj[id] = object;

        }


    });

    // sort by rating average as secondary sorting additionally
    if(cgJsData[gid].options.general.AllowRatingDynamic){

        //console.log(newObj);

        var newObjByCountR = {};

        jQuery.each(newObj, function( index,value ) {

            var countRtotal = value.CountRtotal;

            if(!newObjByCountR[countRtotal]){
                newObjByCountR[countRtotal] = [];
            }

            newObjByCountR[countRtotal].push(value);

        });

        //console.log('newObjByCountR');
        //console.log(newObjByCountR);

        // convert to array for proper sorting
        var newArray = [];
        jQuery.each(newObjByCountR, function( index,value ) {
            newObjByCountR[index].sort(function(a, b) {
                return a.RatingAverageForSecondarySorting - b.RatingAverageForSecondarySorting;
            });
            newObjByCountR[index].forEach(function(valueForEach, indexForEach) {
                newArray.push(valueForEach);
            });
        });

        //console.log(newArray);

        newObj = newArray;
    }
    // sort by rating average as secondary sorting additionally --- END

    return newObj;

};

cgJsClass.gallery.sorting.countRaverage = function (gid) {

    var newObj = {};

    var countImages = Object.keys(cgJsData[gid].fullImageDataFiltered).length;
    var Manipulate = cgJsData[gid].options.pro.Manipulate;


    jQuery.each(cgJsData[gid].fullImageDataFiltered, function( index,value ) {

        // index = array index
        // value = object
        // firstKey = object Key
        var firstKey = Object.keys(value)[0]; // objectKey = image ID
        var object = value[firstKey];

        // !IMPORTANT: parseFloat here!!!!
     //   var add = parseFloat(object['RatingAverage'])*10;// Punkt darf hier nicht sein damit es schön aufgezählt wird. Also keine 2.5 sondern dann 25
   //     var newFirstKey = parseInt(add+'00000');
        var newFirstKey = object['RatingAverageForSecondarySorting'];

        // nach rating setzen
        if(newFirstKey>0){

            if(newObj.hasOwnProperty(newFirstKey)==false){

                newObj[newFirstKey] = object;

            }
            else{

                for (var i=0; i<=countImages; i++) {

                    newFirstKey = newFirstKey+1;

                    if(newObj.hasOwnProperty(newFirstKey)==false) {

                        newObj[newFirstKey] = object;
                        break;
                    }
                }
            }

        }
        else{ // wenn null dann nach id setzen

            var id = object['id']; // objectKey = image ID
            newObj[id] = object;

        }


    });

    //console.log(newObj);

    // convert to array for proper sorting
    var newArray = [];
    jQuery.each(newObj, function( index,value ) {
        value.sortedKeyBefore = index;
        newArray.push(value);
    });

  //  console.log(newArray);

    newArray.sort(function(a, b) {
        return a.RatingAverageForSecondarySorting - b.RatingAverageForSecondarySorting;
    });
  //  console.log(newArray);

    var newObjSortedLikeNewArray = {};
    newArray.forEach(function (value) {
        newObjSortedLikeNewArray[value.sortedKeyBefore] = value;
    });

 //   console.log(newObjSortedLikeNewArray);

    return newObjSortedLikeNewArray;

};

cgJsClass.gallery.sorting.countSum = function (gid) {

    var newObj = {};

    var countImages = Object.keys(cgJsData[gid].fullImageDataFiltered).length;
    var Manipulate = cgJsData[gid].options.pro.Manipulate;

    jQuery.each(cgJsData[gid].fullImageDataFiltered, function( index,value ) {

        // index = array index
        // value = object
        // firstKey = object Key
        var firstKey = Object.keys(value)[0]; // objectKey = image ID
        var object = value[firstKey];

        // !IMPORTANT: parseFloat here!!!!
     //   var add = parseFloat(object['RatingAverage'])*10;// Punkt darf hier nicht sein damit es schön aufgezählt wird. Also keine 2.5 sondern dann 25
   //     var newFirstKey = parseInt(add+'00000');
        var newFirstKey = object['RatingTotalForSecondarySorting'];

        // nach rating setzen
        if(newFirstKey>0){

            if(newObj.hasOwnProperty(newFirstKey)==false){

                newObj[newFirstKey] = object;

            }
            else{

                for (var i=0; i<=countImages; i++) {

                    newFirstKey = newFirstKey+1;

                    if(newObj.hasOwnProperty(newFirstKey)==false) {

                        newObj[newFirstKey] = object;
                        break;
                    }
                }
            }

        }
        else{ // wenn null dann nach id setzen

            var id = object['id']; // objectKey = image ID
            newObj[id] = object;

        }


    });

    //console.log(newObj);

    // convert to array for proper sorting
    var newArray = [];
    jQuery.each(newObj, function( index,value ) {
        value.sortedKeyBefore = index;
        newArray.push(value);
    });

  //  console.log(newArray);

    newArray.sort(function(a, b) {
        return a.RatingTotalForSecondarySorting - b.RatingTotalForSecondarySorting;
    });
  //  console.log(newArray);

    var newObjSortedLikeNewArray = {};
    newArray.forEach(function (value) {
        newObjSortedLikeNewArray[value.sortedKeyBefore] = value;
    });

 //   console.log(newObjSortedLikeNewArray);

    return newObjSortedLikeNewArray;

};