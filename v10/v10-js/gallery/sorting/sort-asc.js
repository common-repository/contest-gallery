cgJsClass.gallery.sorting.ascPosition = function (newData) {
    var newObject = {};
    var index = 1;
    for (var key in newData) {
        if(!newData.hasOwnProperty(key)){
            break;
        }
        if(key < cgJsClass.gallery.vars.sortingStartValue){
            newObject[index] = newData[key];
            index++;
        }else{
            newObject[key] = newData[key];
        }
    }

    // create array for reverse
    var arr = [];
    for (var key in newObject) {
        if(!newObject.hasOwnProperty(key)){
            break;
        }
        // add hasOwnPropertyCheck if needed
        var obj = {};
        obj[key] = newObject[key];
        arr.push(obj);
    }

    return arr;
};
cgJsClass.gallery.sorting.asc = function (newData) {
    // create array for reverse
    var arr = [];
    for (var key in newData) {
        if(!newData.hasOwnProperty(key)){
            break;
        }
        var obj = {};

        obj[key] = newData[key];
        arr.push(obj);

    }
    return arr;
};