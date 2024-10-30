<?php
        if($cgVersion<7){
            echo "<div style='width:937px;text-align:center;font-size:20px;'>";
        echo "<p style='font-size:16px;'>    
        <strong>Please create a new gallery</strong><br> Galleries created before update to version 7 have old logic and will not supported anymore.<br> You can also copy an old gallery.</p></div>";
        }

echo "<form action='?page=contest-gallery/index.php&option_id=$GalleryID&step=$step&start=$start&edit_gallery=true' method='POST'>";

if(!empty($categories)){

		echo "<table style='border: 1px solid #DFDFDF;width:937px;$CatWidgetColor;' id='CatWidgetTable'>";
		echo "<tr>";
		
		
	
		echo "<td style='padding-left:20px;padding-right:10px;padding-top: 8px; padding-bottom: 8px;'>";
		
        echo "<div style='float:left;display:inline;width:50%;height:30px;'><strong>Show categories in gallery frontend</strong></div>";
        echo "<div style='float:right;display:inline;width:50%;height:30px;text-align:right;'><strong style='margin-right:10px;'>Show category widget in frontend</strong>
                <input type='checkbox' name='CatWidget' id='CatWidget' value='on' $CatWidgetChecked /></div>";
        echo "<input type='hidden' name='Category[Continue]'/>";

        echo "<div>";

                $countCategories = count($categories);
                $count = 1;

                foreach($categories as $category){

                    $checked = '';
                    if($category->Active==1){
                        $checked = "checked='checked'";
                    }

                    echo "<div style='display:inline;margin-right:10px'>".$category->Name.": <input type='checkbox' name='Category[]' $checked value='".$category->id."' style='height:16px;width:16px;'/></div>";

                    if($count==$countCategories){

                        $checked = '';

                        if($ShowOther==1){
                            $checked = "checked='checked'";
                        }

                        echo "<div style='display:inline;margin-right:10px'>Other: <input type='checkbox' name='Category[ShowOther]' value='".$category->id."' $checked style='height:16px;width:16px;'/></div> ";
                    }

                    $count++;

                }


    echo "<div style='display:inline;margin-right:10px'><a href=\"#cg_go_to_save_button\">Go save</a></div> ";

    echo "</div>";


echo "<td>";


echo "</tr>";

echo "</table>";
echo "<br>";
}

		echo "<table style='border: 1px solid #DFDFDF;width:937px;background-color:#ffffff;'>";
		echo "<tr style='background-color:#ffffff;'>";



		echo "<td style='padding-left:20px;padding-right:50px;padding-top:8px;padding-bottom:8px;'>";


		echo"&nbsp;&nbsp;Show pics per Site:";

		echo"&nbsp;<a href=\"?page=contest-gallery/index.php&option_id=$GalleryID&step=10&start=$i&edit_gallery=true\">10</a>&nbsp;";
		echo"&nbsp;<a href=\"?page=contest-gallery/index.php&option_id=$GalleryID&step=20&start=$i&edit_gallery=true\">20</a>&nbsp;";
		echo"&nbsp;<a href=\"?page=contest-gallery/index.php&option_id=$GalleryID&step=30&start=$i&edit_gallery=true\">30</a>&nbsp;";
		//echo"&nbsp;<a href=\"?page=contest-gallery/index.php&option_id=$GalleryID&step=100&start=$i&edit_gallery=true\">100</a>&nbsp;";
	//	echo"&nbsp;<a href=\"?page=contest-gallery/index.php&option_id=$GalleryID&step=200&start=$i&edit_gallery=true\">200</a>&nbsp;";
	/*
		echo "<form style='font-size: 16px;display:inline;' method='POST' action='?page=contest-gallery/index.php&option_id=$GalleryID&edit_gallery=true'>";

		echo '<input type="text" placeholder="Username/Email" style="width:182px;margin-left:153px;" name="cg-user-name" />';
		$iconUrl = plugins_url('icon.png', __FILE__ )."";
		echo '<input type="submit" value="" style="border:none;cursor:pointer;display: inline-block; width: 20px; height: 24px;';
		echo 'position: relative; left: -27px;  top: 4px; background: url('.$iconUrl.');background-size: 22px 22px;"/>';
		echo "</form>";*/

/*	    echo "<hr>";

	    foreach($selectCategoriesArray as $value){

	        echo "$value: <input type='checkbox' name='Category[]' style='height:16px;width:16px;'/>";

        }*/

		echo "</td>";
		 /*  */
		echo "<td>";



	// Determine if User should be informed or not>>>END


		echo "</td>";

	echo "<td>";
	echo "<input type='hidden' name='GalleryID' value='$GalleryID' method='post'>";
	echo "</td>";
	echo "<td style='padding-right:51px;text-align:right;padding-top:5px;'>";
	echo '&nbsp;&nbsp;Select/Deselect All: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input type="checkbox" value="Select/Deselect ALL " id="chooseAll" style="margin-bottom:5px;">';
	echo "<input type='hidden' id='click-count' value='0'>";
	//echo '&nbsp;&nbsp;Alle benachrichtigen: <input type="checkbox" value="alle auswählen " onClick="informAll()" id="informAll" disabled ><br/>';
	//echo '&nbsp;&nbsp;Nochmal benachrichtigen: <input type="checkbox" value="alle auswählen " onClick="informAll()" class="informAll" disabled ><br/>';
	echo "</td>";



	echo "</tr>";

echo "</table>";
echo "<br>";

	echo "<div class='cg_pics_per_site' style='width:909px;'>";
    for ($i = 0; $rows > $i; $i = $i + $step) {
	
	  $anf = $i + 1;
	  $end = $i + $step;

	  if ($end > $rows) {
		$end = $rows;
	  }
		
		if ($anf == $nr1 AND ($start+$step) > $rows AND $start==0) {
	    continue;
		echo "<big>[<strong><a href=\"?page=contest-gallery/index.php&option_id=$GalleryID&step=$step&start=$i&edit_gallery=true\">$anf-$end</a></strong> ]</big>";
	  } 
	  
	  	 elseif ($anf == $nr1 AND ($start+$step) > $rows AND $anf==$end) {
	    
		echo "<big>[<strong><a href=\"?page=contest-gallery/index.php&option_id=$GalleryID&step=$step&start=$i&edit_gallery=true\">$end</a></strong> ]</big>";
	  } 
			
	  
	    elseif ($anf == $nr1 AND ($start+$step) > $rows) {
	    
		echo "<big>[<strong><a href=\?page=contest-gallery/index.php&option_id=$GalleryID&step=$step&start=$i&edit_gallery=true\">$anf-$end</a></strong> ]</big>";
	  } 
	  
		elseif ($anf == $nr1) {
			echo "<big>[<strong><a href=\"?page=contest-gallery/index.php&option_id=$GalleryID&step=$step&start=$i&edit_gallery=true\">$anf-$end</a></strong>]</big>";
	  } 
	  
	  	elseif ($anf == $end) {
		echo "[  <a href=\"?page=contest-gallery/index.php&option_id=$GalleryID&step=$step&start=$i&edit_gallery=true\">$end</a>  ] ";
	  }
	  
	  else {
		echo "[  <a href=\"?page=contest-gallery/index.php&option_id=$GalleryID&step=$step&start=$i&edit_gallery=true\">$anf-$end</a>  ] ";
	  }
	 }
	echo "</div>";

?>