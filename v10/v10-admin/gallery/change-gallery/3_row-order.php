<?php

//$count = @$_POST['count'];


// Reihenfolge der Bilder wechseln
// rowid aufbau
// row[$id][$Active]


if(!empty($rowids)){

// Update Rows
    $querySETrowForRowIds = 'UPDATE ' . $tablename . ' SET rowid = CASE id ';
    $querySETaddRowForRowIds = ' ELSE rowid END WHERE id IN (';

    $order = 1;
    foreach($rowids as $key => $value){

        // UPDATE ROW
        $querySETrowForRowIds .= " WHEN $key THEN ".$value."";
        $querySETaddRowForRowIds .= "$key,";

    }

    $querySETaddRowForRowIds = substr($querySETaddRowForRowIds,0,-1);
    $querySETaddRowForRowIds .= ")";

    $querySETrowForRowIds .= $querySETaddRowForRowIds;
    $updateSQL = $wpdb->query($querySETrowForRowIds);

}

