<?php
require_once('get-data-create-user-form.php');


// Path to jquery Lightbox Script

// $pathJquery = plugins_url().'/contest-gallery/js/jquery.js';
//$pathPlugin1 = plugins_url().'/contest-gallery/js/lightbox-2.6.min.js';
//$pathPlugin2 = plugins_url().'/contest-gallery/css/lightbox.css';
//$pathPlugin3 = plugins_url().'/contest-gallery/css/star_off_48.png';
//$pathPlugin4 = plugins_url().'/contest-gallery/css/star_48.png';
//$pathCss = plugins_url().'/contest-gallery/css/style.css';
// $pathJqueryUI = plugins_url().'/contest-gallery/js/jquery-ui.js';
// $pathJqueryUIcss = plugins_url().'/contest-gallery/js/jquery-ui.css';
//$cssPng = content_url().'/plugins/contest-gallery/css/lupe.png';// URL for zoom pic


//add_action('wp_enqueue_scripts','my_scripts');

 
/*

echo <<<HEREDOC

<link href="$pathPlugin2" rel="stylesheet" />
<link href="$pathCss" rel="stylesheet" />
<link href="$pathPlugin6" rel="stylesheet" />


HEREDOC;

//echo $pathCss;


echo <<<HEREDOC

	<script src='$pathJquery'></script>
	<script src='$pathJqueryUI'></script>
	<script src='$pathJqueryUIcss'></script>

HEREDOC;*/

echo "kdasjfdkasjflkds<br>";
echo "kdasjfdkasjflkds<br>";
echo "kdasjfdkasjflkds<br>";
echo "kdasjfdkasjflkds<br>";
echo "kdasjfdkasjflkds<br>";
echo "kdasjfdkasjflkds<br>";
echo "kdasjfdkasjflkds<br>";
echo "kdasjfdkasjflkds<br>";
echo "kdasjfdkasjflkds<br>";
echo "kdasjfdkasjflkds<br>";
echo "kdasjfdkasjflkds<br>";
echo "kdasjfdkasjflkds<br>";
echo "kdasjfdkasjflkds<br>";
echo "kdasjfdkasjflkds<br>";
echo "kdasjfdkasjflkds<br>";
echo "kdasjfdkasjflkds<br>";
echo "kdasjfdkasjflkds<br>";
echo "kdasjfdkasjflkds<br>";
echo "kdasjfdkasjflkds<br>";
echo "kdasjfdkasjflkds<br>";
echo "kdasjfdkasjflkds<br>";
echo "kdasjfdkasjflkds<br>";
echo "kdasjfdkasjflkds<br>";
echo "kdasjfdkasjflkds<br>";
echo "kdasjfdkasjflkds<br>";
echo "kdasjfdkasjflkds<br>";
echo "kdasjfdkasjflkds<br>";
echo "kdasjfdkasjflkds<br>";
echo "kdasjfdkasjflkds<br>";
echo "kdasjfdkasjflkds<br>";
echo "kdasjfdkasjflkds<br>";
echo "kdasjfdkasjflkds<br>";
echo "kdasjfdkasjflkds<br>";
echo "kdasjfdkasjflkds<br>";
echo "kdasjfdkasjflkds<br>";
echo "kdasjfdkasjflkds<br>";

//require_once(dirname(__FILE__) . "/../nav-menu.php");

	//echo "TEST1";
		if(file_exists(plugin_dir_path( __FILE__ )."create-user-form.php")){
			
		//	echo "TEST";
			//print_r($selectFormInput);
		
		if(!$selectFormInput){
		
		// Kreieren der notwendigen formular Felder
		
				$wpdb->query( $wpdb->prepare(
						"
							INSERT INTO $tablename_create_user_form
							( id, GalleryID, Field_Type, Field_Order,
							Show_Slider,Use_as_URL,Field_Name,Field_Content,Min_Char,Max_Char,
							Necessary,Option1,Option2,Option3,Option4,Option5,Option6,
							Option7,Option8,Option9,Option10)
							VALUES (%s,%d,%s,%s,
							%d,%d,%s,%s,%d,%d,
							%d,%s,%s,%s,%s,%s,%s,
							%s,%s,%s,%s)
						", 
							'',$GalleryID,'main-user-name','1',
							0,0,'Username','',3,100,
							1,'','','','','','',
							'','','',''
						) );
						
						$wpdb->query( $wpdb->prepare(
						"
							INSERT INTO $tablename_create_user_form
							( id, GalleryID, Field_Type, Field_Order,
							Show_Slider,Use_as_URL,Field_Name,Field_Content,Min_Char,Max_Char,
							Necessary,Option1,Option2,Option3,Option4,Option5,Option6,
							Option7,Option8,Option9,Option10)
							VALUES (%s,%d,%s,%s,
							%d,%d,%s,%s,%d,%d,
							%d,%s,%s,%s,%s,%s,%s,
							%s,%s,%s,%s)
						", 
							'',$GalleryID,'main-mail','2',
							0,0,'E-mail','','','',
							1,'','','','','','',
							'','','',''
						) );
						
						$wpdb->query( $wpdb->prepare(
						"
							INSERT INTO $tablename_create_user_form
							( id, GalleryID, Field_Type, Field_Order,
							Show_Slider,Use_as_URL,Field_Name,Field_Content,Min_Char,Max_Char,
							Necessary,Option1,Option2,Option3,Option4,Option5,Option6,
							Option7,Option8,Option9,Option10)
							VALUES (%s,%d,%s,%s,
							%d,%d,%s,%s,%d,%d,
							%d,%s,%s,%s,%s,%s,%s,
							%s,%s,%s,%s)
						", 
							'',$GalleryID,'password','3',
							0,0,'Password','',6,100,
							1,'','','','','','',
							'','','',''
						) );
						
						$wpdb->query( $wpdb->prepare(
						"
							INSERT INTO $tablename_create_user_form
							( id, GalleryID, Field_Type, Field_Order,
							Show_Slider,Use_as_URL,Field_Name,Field_Content,Min_Char,Max_Char,
							Necessary,Option1,Option2,Option3,Option4,Option5,Option6,
							Option7,Option8,Option9,Option10)
							VALUES (%s,%d,%s,%s,
							%d,%d,%s,%s,%d,%d,
							%d,%s,%s,%s,%s,%s,%s,
							%s,%s,%s,%s)
						", 
							'',$GalleryID,'password-confirm','4',
							0,0,'Confirm Password','',6,100,
							1,'','','','','','',
							'','','',''
						) );
						
						$selectFormInput = $wpdb->get_results("SELECT * FROM $tablename_create_user_form WHERE GalleryID = $GalleryID ORDER BY Field_Order ASC");
		
				}
				
		// Kreieren der notwendigen formular Felder --- ENDE



		}
	

	//<div style="display:block;padding:20px;padding-bottom:10px;background-color:white;width:897px;text-align:right;margin-top:10px;border: 1px solid #DFDFDF;height:40px;">

echo '<div style="width:881px;padding-left:27px;padding-right:27px;background-color:white;border: 1px solid #DFDFDF;padding-top:20px;padding-bottom:20px;margin-bottom:15px;">';
/*if ($checkDataFormOutput){
echo "<form method='POST' action='?page=contest-gallery/index.php&option_id=$GalleryID&define_output=true'><input type='submit' value='Single pic info' style='float:right;text-align:center;width:180px;'/></form>";
}*/
//echo "<form name='defineUpload' enctype='multipart/form-data' action='?page=contest-gallery/index.php&optionID=$GalleryID&defineUpload=true' id='form' method='post'>";

		//<option value="ef">E-Mail</option>
		//<option value="cb">Check agreement</option>

$heredoc = <<<HEREDOC
	<select name="dauswahl" id="dauswahl">
		<option  value="nf">Text</option>
		<option value="kf">Comment</option>
	</select>
	<input id="cg_create_upload_add_field" type="button" name="plus" value="+" style='width:20px;'>
	</div>
HEREDOC;

echo $heredoc;

echo "<form name='create_user_form' enctype='multipart/form-data' action='?page=contest-gallery/index.php&option_id=$GalleryID&create_user_form=true' id='form' method='post'>";
echo "<input type='hidden' name='option_id' value='$GalleryID'>";
?>
<div style="width:935px;background-color:#fff;border: 1px solid #DFDFDF;padding-bottom:15px;">
<div id="ausgabe1" style="display:table;width:875px;padding:10px;background-color:#fff;padding-left:29px;padding-right:20px;">
<br/>

<?php	
	

// ---------------- AUSGABE des gespeicherten Formulares

/*

	$deleteFieldnumber = @$_POST['deleteFieldnumber'];
	$changeFieldRow = @$_POST['changeFieldRow'];
	$addField = @$_POST['addField'];

	
	//echo 'deleteFieldnumber:<br/>';
	//print_r($deleteFieldnumber);echo '<br/>';
	//echo 'changeFieldRow:<br/>';
	//print_r($changeFieldRow);echo '<br/>';
	//echo 'addField:<br/>';
	//print_r($addField);
	//echo '<br/>';


// Jeder sechste wird ausgewertet, um festzustellen, um welche Feldart sich handelt
$i3 = 7;
$key = 0;

// Field type
$ft ='';*/

// IDs of the div boxes   
@$nfCount = 10;
@$kfCount = 20;
@$efCount = 30;
@$bhCount = 40;
@$htCount = 50;
@$cbCount = 60;

// Further IDs of the div boxes   
@$nfHiddenCount = 100;
@$kfHiddenCount = 200;
@$efHiddenCount = 300;
@$bhHiddenCount = 400;
@$htCount = 500;
@$cbCount = 600;

// FELDBENENNUNGEN

// 1 = Feldtyp
// 2 = Feldnummer
// 3 = Feldtitel
// 4 = Feldinhalt
// 5 = Feldkrieterium1
// 6 = Feldkrieterium2
// 7 = Felderfordernis 


//print_r($selectFormInput);

// Zum z�hlen von Feld Reihenfolge
$i = 1;

if ($selectFormInput) {

	foreach ($selectFormInput as $key => $value) {
	

		if($value->Field_Type == 'image-f'){
		
		// Feldtyp
		// 1 = Feldtitel
		
		//ermitteln der Feldnummer
		$fieldOrder = $value->Field_Order;
		$fieldOrderKey = "$fieldOrder";
		$id = $value->id; // Unique ID des Form Feldes
		$idKey = "$id";
		
		// Anfang des Formularteils
		echo "<div id='$bhCount' class='formField'  style='width:855px;margin-bottom:20px;border: 1px solid #DFDFDF;padding-top:7px;padding-bottom:10px;display:table;padding:10px;'><br/><input type='hidden' name='upload[]' value='bh'>";
		// Prim�re ID in der Datenbank
		//echo "<input type='hidden' name='upload[]' value='$fieldOrder' class='changeUploadFieldOrder'>";
		//SWAP Values
		//echo "<input type='hidden' name='changeFieldRow[$fieldOrder]' value='$fieldOrder' class='changeFieldOrderUsersEntries'>";
		
		// Formularfelder unserializen
		$fieldContent = unserialize($value->Field_Content);
		
		// Aktuelle Feld ID mitschicken
		echo "<input type='hidden' name='actualID[]' value='$id' >";
		
			foreach($fieldContent as $key => $value){
			
					// 1 = Feldtitel
					if($key=='titel'){ 
					echo "<input type='hidden'/>";  
					echo "<input type='text' name='upload[]' value='$value' size='30'><br/>"; // Titel und Delete M�glichkeit die oben bestimmt wurde
					
					echo "<input type='file' id='bh' disabled /><input type='submit' value='Upload' disabled /><br/>";
					echo "Necessary <input type='checkbox' checked disabled /><br/><br/>"; // Bildupload ist so oder so immer notwendig
					
					

					echo "</div>";					
					
					}
					
			}
		
		}
		
		
		if(@$value->Field_Type == 'check-f'){
		
		// Feldtyp
		// Feldreihenfolge 
		// 1 = Feldinhalt
		// 2 = Felderfordernis
		
		//ermitteln der Feldnummer
		@$fieldOrder = $value->Field_Order;
		$fieldOrderKey = "$fieldOrder";
		$id = $value->id; // Unique ID des Form Feldes
		$idKey = "$id";
		
		// Anfang des Formularteils
		echo "<div id='$cbCount'  class='formField' style='width:855px;margin-bottom:20px;border: 1px solid #DFDFDF;padding-top:7px;padding-bottom:10px;display:table;padding:10px;'><br/><input type='hidden' name='upload[]' value='cb'>";
		// Prim�re ID in der Datenbank
		//echo "<input type='hidden' name='upload[]' value='$fieldOrder' class='changeUploadFieldOrder'>";
		//SWAP Values
		//echo "<input type='hidden' name='changeFieldRow[$fieldOrder]' value='$fieldOrder' class='changeFieldOrderUsersEntries'>";
		
		echo "<input type='hidden' value='$fieldOrder' class='fieldnumber'>";
		
		// Feld l�schen M�glichkeit
		$deleteField = "<input class='cg_delete_form_field' type='button' value='-' alt='$cbCount' titel='$id'><input type='hidden' name='originalRow[$key]' value='$fieldOrder'>";
		

		
		// Formularfelder unserializen
		$fieldContent = unserialize($value->Field_Content);
		
		// Aktuelle Feld ID mitschicken
		echo "<input type='hidden' name='actualID[]' value='$id' >";
		
			foreach($fieldContent as $key => $value){
				
					// 2. Feldtitel
					if($key=='titel'){ 
					echo "<input type='hidden'/>";
					echo "<input type='text' name='upload[]' value='$value' maxlength='100' size='30'>$deleteField<br/>"; // Titel und Delete M�glichkeit die oben bestimmt wurde
					}				
			
					// 2. Feldinhalt
					if($key=='content'){ 
					
					$content = html_entity_decode(stripslashes($value));
					
					echo "<input type='checkbox' disabled><input type='text' name='upload[]' class='cb'  maxlength='1000' style='width:832px;' value='$content'><br/>"; 
							
					}

					// 3. Felderfordernis
					if($key=='mandatory'){
					
					//$checked = ($value=='on') ? "checked" : "";
					
					echo "Necessary <input type='checkbox' class='necessary-check' name='upload[]' checked disabled /><br/><br/>";
					if ($value!='on') {echo "<input type='hidden' class='necessary-hidden'  name='upload[]' value='off' />";}
					echo "</div>"; 
					
					$cbCount++;
					@$cbHiddenCount++;
					
					
					}
			
			}
		
		}
		
							/*
					$checked = ($value->Necessary==1) ? "checked" : "";

					echo "Necessary <input type='checkbox' class='necessary-check' name='upload[]' $checked ><br/><br/>";
					echo "Necessary <input type='checkbox' class='necessary-check' name='upload[]' checked disabled ><br/><br/>";
					if ($value->Necessary==1) {echo "<input type='hidden' class='necessary-hidden'  name='upload[]' value='off' >";}
					
					*/
					
		if(@$value->Field_Type == 'main-mail'){
		
		// Feldtyp
		// Feldreihenfolge 
		// 1 = Feldtitel
		// 2 = Feldinhalt
		// 3 = Feldkrieterium1
		// 4 = Feldkrieterium2
		// 5 = Felderfordernis
		
		//ermitteln der Feldnummer
		$fieldOrder = $value->Field_Order;
		$Min_Char = $value->Min_Char;
		$Max_Char = $value->Max_Char;
		$Field_Name = $value->Field_Name;
		$Field_Content = $value->Field_Content;
		$Field_Order = $value->Field_Order;
		$Field_Type = $value->Field_Type;
		$fieldOrderKey = "$fieldOrder";
		$id = $value->id; // Unique ID des Form Feldes
		$idKey = "$id";
		
	
		// Anfang des Formularteils
		echo "<div id='cg_main-mail'  class='formField' style='width:840px;margin-bottom:20px;border: 1px solid #DFDFDF;padding-top:7px;padding-bottom:10px;display:table;padding:10px;'><br/><input type='hidden' class='Field_Type' name='Field_Type[$i]' value='$Field_Type'>";
		
		echo "<input type='hidden' class='Field_Order' value='$Field_Order'>";
				
		// Aktuelle Feld ID mitschicken. $i Aufz�hlung ist hier nicht notwendig. Wird f�r update entries verwendet.
		echo "<input type='hidden' class='cg_actualID' name='actualID[]' value='$id' >";		
					
					echo "<input type='text' class='Field_Name'  name='Field_Name[$i]' value='$Field_Name'  size='30' maxlength='100'> (Login user mail: Wordpress-Profile-Field)<br/>"; // Titel und Delete M�glichkeit die oben bestimmt wurde
					
					echo "<input type='text' class='Field_Content' name='Field_Content[$i]' value='$Field_Content' id='main-mail' maxlength='1000' style='width:855px;'><br/>";
										
					
					echo "Necessary <input type='checkbox' class='necessary-check' name='Necessary[$i]' checked disabled ><br/><br/>";					
					
					echo "</div>"; 

		}			
					
		
		if(@$value->Field_Type == 'password'){
		
		// Feldtyp
		// Feldreihenfolge 
		// 1 = Feldtitel
		// 2 = Feldinhalt
		// 3 = Feldkrieterium1
		// 4 = Feldkrieterium2
		// 5 = Felderfordernis
		
		//ermitteln der Feldnummer
		$fieldOrder = $value->Field_Order;
		$Min_Char = $value->Min_Char;
		$Max_Char = $value->Max_Char;
		$Field_Name = $value->Field_Name;
		$Field_Content = $value->Field_Content;
		$Field_Order = $value->Field_Order;
		$Field_Type = $value->Field_Type;
		$fieldOrderKey = "$fieldOrder";
		$id = $value->id; // Unique ID des Form Feldes
		$idKey = "$id";
		
		// Anfang des Formularteils
		echo "<div id='cg_password'  class='formField' style='width:840px;margin-bottom:20px;border: 1px solid #DFDFDF;padding-top:7px;padding-bottom:10px;display:table;padding:10px;'><br/><input type='hidden' class='Field_Type' name='Field_Type[$i]' value='$Field_Type'>";
		
		echo "<input type='hidden' class='cg_actualID' class='Field_Order' value='$Field_Order'>";
				
		// Aktuelle Feld ID mitschicken
		echo "<input type='hidden' name='actualID[]' value='$id' >";		
					
					echo "<input type='text' class='Field_Name'  name='Field_Name[$i]' value='$Field_Name'  size='30' maxlength='100'> (Login user password: Wordpress-Profile-Field)<br/>"; // Titel und Delete M�glichkeit die oben bestimmt wurde
					
					echo "<input type='text' class='Field_Content' name='Field_Content[$i]' value='$Field_Content' id='password' maxlength='1000' style='width:855px;'><br/>";
										
					echo "Min. number of characters:&nbsp; <input type='text' class='Min_Char' name='Min_Char[$i]' value='$Min_Char' size='7' maxlength='4' ><br/>";
										
					echo "Max. number of characters: <input type='text' class='Max_Char' name='Max_Char[$i]' value='$Max_Char' size='7' maxlength='4' ><br/>";
					
					echo "Necessary <input type='checkbox' class='necessary-check' name='Necessary[$i]' checked disabled ><br/><br/>";					
					
					echo "</div>";
	
		}
		
		if(@$value->Field_Type == 'password-confirm'){
		
		// Feldtyp
		// Feldreihenfolge 
		// 1 = Feldtitel
		// 2 = Feldinhalt
		// 3 = Feldkrieterium1
		// 4 = Feldkrieterium2
		// 5 = Felderfordernis
		
		//ermitteln der Feldnummer
		$fieldOrder = $value->Field_Order;
		$Min_Char = $value->Min_Char;
		$Max_Char = $value->Max_Char;
		$Field_Name = $value->Field_Name;
		$Field_Content = $value->Field_Content;
		$Field_Order = $value->Field_Order;
		$Field_Type = $value->Field_Type;
		$fieldOrderKey = "$fieldOrder";
		$id = $value->id; // Unique ID des Form Feldes
		$idKey = "$id";
		
		// Anfang des Formularteils
		echo "<div id='cg_password-confirm'  class='formField' style='width:840px;margin-bottom:20px;border: 1px solid #DFDFDF;padding-top:7px;padding-bottom:10px;display:table;padding:10px;'><br/><input type='hidden' class='Field_Type' name='Field_Type[$i]' value='$Field_Type'>";
		
		echo "<input type='hidden' class='cg_actualID' class='Field_Order' value='$Field_Order' >";
				
		// Aktuelle Feld ID mitschicken
		echo "<input type='hidden' name='actualID[]' value='$id' >";		
					
					echo "<input type='text' name='Field_Name[$i]' class='Field_Name'  value='$Field_Name'  size='30' maxlength='100'> (Confirm login user password: Wordpress-Profile-Field)<br/>"; // Titel und Delete M�glichkeit die oben bestimmt wurde
					
					echo "<input type='text' class='Field_Content' name='Field_Content[$i]' value='$Field_Content' id='password-confirm' maxlength='1000' style='width:855px;'><br/>";
										
					echo "Min. number of characters:&nbsp; <input type='text' class='Min_Char' name='Min_Char[$i]' value='$Min_Char' size='7' maxlength='4' ><br/>";
										
					echo "Max. number of characters: <input type='text' class='Max_Char' name='Max_Char[$i]' value='$Max_Char' size='7' maxlength='4' ><br/>";
					
					echo "Necessary <input type='checkbox' class='necessary-check' name='Necessary[$i]' checked disabled ><br/><br/>";
					
					echo "</div>"; 


		}
		
		
		
		if(@$value->Field_Type == 'main-user-name'){
		
		// Feldtyp
		// Feldreihenfolge 
		// 1 = Feldtitel
		// 2 = Feldinhalt
		// 3 = Feldkrieterium1
		// 4 = Feldkrieterium2
		// 5 = Felderfordernis 
		
		//ermitteln der Feldnummer
		$fieldOrder = $value->Field_Order;
		$Min_Char = $value->Min_Char;
		$Max_Char = $value->Max_Char;
		$Field_Name = $value->Field_Name;		
		$Field_Content = $value->Field_Content;
		$Field_Order = $value->Field_Order;
		$Field_Type = $value->Field_Type;
		$fieldOrderKey = "$fieldOrder";
		$id = $value->id; // Unique ID des Form Feldes
		$idKey = "$id";
		
		// Anfang des Formularteils
		echo "<div id='cg_main-user-name'  class='formField' style='width:840px;margin-bottom:20px;border: 1px solid #DFDFDF;padding-top:7px;padding-bottom:10px;display:table;padding:10px;'><br/><input type='hidden' class='Field_Type' name='Field_Type[$i]' value='$Field_Type'>";
		
		echo "<input type='hidden' class='Field_Order' value='$Field_Order' >";

		// Aktuelle Feld ID mitschicken
		echo "<input type='hidden' class='cg_actualID' name='actualID[]' value='$id' >";		
					
					echo "<input type='text' class='Field_Name' name='Field_Name[$i]' value='$Field_Name'  size='30' maxlength='100'> (Login user name: Wordpress-Profile-Field)<br/>"; // Titel und Delete M�glichkeit die oben bestimmt wurde 
					
					echo "<input type='text' class='Field_Content' name='Field_Content[$i]' value='$Field_Content' id='main-user-name' maxlength='1000' style='width:855px;'><br/>";
										
					echo "Min. number of characters:&nbsp; <input type='text' class='Min_Char' name='Min_Char[$i]' value='$Min_Char' size='7' maxlength='4' ><br/>";
										
					echo "Max. number of characters: <input type='text' class='Max_Char' name='Max_Char[$i]' value='$Max_Char' size='7' maxlength='4' ><br/>";
					
					echo "Necessary <input type='checkbox' class='necessary-check' name='Necessary[$i]' checked disabled ><br/><br/>";					

					
					echo "</div>"; 
	
	
		}
		
		
		if(@$value->Field_Type == 'user-text-field'){
		
		// Feldtyp
		// Feldreihenfolge 
		// 1 = Feldtitel
		// 2 = Feldinhalt
		// 3 = Feldkrieterium1
		// 4 = Feldkrieterium2
		// 5 = Felderfordernis 
		
		//ermitteln der Feldnummer
		$fieldOrder = $value->Field_Order;
		$Min_Char = $value->Min_Char;
		$Max_Char = $value->Max_Char;
		$Field_Name = $value->Field_Name;		
		$Field_Content = $value->Field_Content;
		$Field_Order = $value->Field_Order;
		$Field_Type = $value->Field_Type;
		$cg_Necessary = $value->Necessary;
		$fieldOrderKey = "$fieldOrder";
		$id = $value->id; // Unique ID des Form Feldes
		$idKey = "$id";
		
		// Anfang des Formularteils
		echo "<div id='$nfCount'  class='formField' style='width:840px;margin-bottom:20px;border: 1px solid #DFDFDF;padding-top:7px;padding-bottom:10px;display:table;padding:10px;'><br/><input type='hidden' class='Field_Type' name='Field_Type[$i]' value='$Field_Type'>";
		
		echo "<input type='hidden' class='cg_Field_Text_Type' >"; // Zum Z�hlen von Text Feldern
		echo "<input type='hidden' class='Field_Order' value='$Field_Order' >";
				
		// Aktuelle Feld ID mitschicken
		echo "<input type='hidden' class='cg_actualID' name='actualID[]' value='$id' >";		
					
					echo "<input type='text' class='Field_Name' name='Field_Name[$i]' value='$Field_Name'  size='30' maxlength='100'><br/>"; // Titel und Delete M�glichkeit die oben bestimmt wurde
					
					echo "<input type='text' class='Field_Content' name='Field_Content[$i]' value='$Field_Content' id='main-user-name' maxlength='1000' style='width:855px;'><br/>";
										
					echo "Min. number of characters:&nbsp; <input type='text' class='Min_Char' name='Min_Char[$i]' value='$Min_Char' size='7' maxlength='4' ><br/>";
										
					echo "Max. number of characters: <input type='text' class='Max_Char' name='Max_Char[$i]' value='$Max_Char' size='7' maxlength='4' ><br/>";
					
					if($cg_Necessary==1){$cg_Necessary_checked="checked";}
					else{$cg_Necessary_checked="";}
					
					echo "Necessary <input type='checkbox' class='necessary-check' name='Necessary[$i]' $cg_Necessary_checked ><br/><br/>";					

					
					echo "</div>"; 

					$nfCount++;
					$nfHiddenCount++;			
	
		}
		
		
		
		if(@$value->Field_Type == 'user-comment-field'){
		
		// Feldtyp
		// Feldreihenfolge 
		// 1 = Feldtitel
		// 2 = Feldinhalt
		// 3 = Feldkrieterium1
		// 4 = Feldkrieterium2
		// 5 = Felderfordernis 
		
		//ermitteln der Feldnummer
		$fieldOrder = $value->Field_Order;
		$Min_Char = $value->Min_Char;
		$Max_Char = $value->Max_Char;
		$Field_Name = $value->Field_Name;		
		$Field_Content = $value->Field_Content;
		$Field_Order = $value->Field_Order;
		$Field_Type = $value->Field_Type;
		$cg_Necessary = $value->Necessary;
		$fieldOrderKey = "$fieldOrder";
		$id = $value->id; // Unique ID des Form Feldes
		$idKey = "$id";
		
		// Anfang des Formularteils
		echo "<div id='$kfCount'  class='formField' style='width:840px;margin-bottom:20px;border: 1px solid #DFDFDF;padding-top:7px;padding-bottom:10px;display:table;padding:10px;'><br/><input type='hidden' class='Field_Type' name='Field_Type[$i]' value='$Field_Type'>";
		
		echo "<input type='hidden' class='cg_Field_Comment_Type' >"; // Zum Z�hlen von Text Feldern
		echo "<input type='hidden' class='Field_Order' value='$Field_Order' >";
				
		// Aktuelle Feld ID mitschicken
		echo "<input type='hidden' class='cg_actualID' name='actualID[]' value='$id' >";		
					
					echo "<input type='text' class='Field_Name' name='Field_Name[$i]' value='$Field_Name'  size='30' maxlength='100'><br/>"; // Titel und Delete M�glichkeit die oben bestimmt wurde
					
					echo "<textarea class='Field_Content' name='Field_Content[$i]' maxlength='10000' style='width:856px;' rows='10'>$Field_Content</textarea><br/>";
										
					echo "Min. number of characters:&nbsp; <input type='text' class='Min_Char' name='Min_Char[$i]' value='$Min_Char' size='7' maxlength='4' ><br/>";
										
					echo "Max. number of characters: <input type='text' class='Max_Char' name='Max_Char[$i]' value='$Max_Char' size='7' maxlength='4' ><br/>";
					
					if($cg_Necessary==1){$cg_Necessary_checked="checked";}
					else{$cg_Necessary_checked="";}
					
					echo "Necessary <input type='checkbox' class='necessary-check' name='Necessary[$i]' $cg_Necessary_checked ><br/><br/>";					

					
					echo "</div>"; 

					$kfCount++;
					$kfHiddenCount++;			
	
		}
		
		



		if(@$value->Field_Type == 'text-f'){
		
		// Feldtyp
		// Feldreihenfolge 
		// 1 = Feldtitel
		// 2 = Feldinhalt
		// 3 = Feldkrieterium1
		// 4 = Feldkrieterium2
		// 5 = Felderfordernis
		
		//ermitteln der Feldnummer
		$fieldOrder = $value->Field_Order;
		$fieldOrderKey = "$fieldOrder";
		$id = $value->id; // Unique ID des Form Feldes
		$idKey = "$id";
		
		// Anfang des Formularteils
		echo "<div id='$nfCount'  class='formField' style='width:840px;margin-bottom:20px;border: 1px solid #DFDFDF;padding-top:7px;padding-bottom:10px;display:table;padding:10px;'><br/><input type='hidden' name='upload[]' value='nf'>";
		// Prim�re ID in der Datenbank
		//echo "<input type='hidden' name='upload[]' value='$fieldOrder' class='changeUploadFieldOrder'>";
		//SWAP Values
		//echo "<input type='hidden' name='changeFieldRow[$fieldOrder]' value='$fieldOrder' class='changeFieldOrderUsersEntries'>";
		
		echo "<input type='hidden' value='$fieldOrder' class='fieldnumber'>";
		
		// Feld l�schen M�glichkeit
		@$deleteField = "<input class='cg_delete_form_field' type='button' value='-' alt='$nfCount' titel='$id'><input type='hidden' name='originalRow[$key]' value='$fieldOrder'>";
		
		if($id==@$Field1IdGalleryView){$checked='checked';}
		else{$checked='';}
		
		//echo "<br>id: $id<br>";
		//echo "<br>Use_as_URL_id: $Use_as_URL_id<br>";
		if(@$Use_as_URL==1 and $id==@$Use_as_URL_id){$checkedURL='checked';}
		else{$checkedURL='';}
		
		@$Show_Slider = $wpdb->get_var("SELECT Show_Slider FROM $tablename_form_input WHERE id = '$id'");
		
		if(@$Show_Slider==1){$checkedShow_Slider='checked';}
		else{$checkedShow_Slider='';}
		
		echo "<div style='width:160px;float:right;text-align:right;'>";
		
		echo "Show info in gallery:  &nbsp;";
		//echo "<input type='text' value='Show info in gallery:' style='float:right;border: none;width:145px;'>";
		echo "<input type='checkbox' class='cg_info_show_gallery' style='margin-top:0px;' name='Field1IdGalleryView[$id]' $checked>";
		echo "</div>";
		
		echo "<div style='width:160px;float:right;text-align:right;margin-right:12px;'>";
		
		echo "Show info in slider: &nbsp;";
		//echo "<input type='text' value='Show info in gallery:' style='float:right;border: none;width:145px;'>";
		echo "<input type='checkbox' class='cg_info_show_slider' style='margin-top:0px;' name='cg_f_input_id_show_slider[$id]' $checkedShow_Slider>";
		echo "</div>";
		
		// Das Feld soll als URL agieren 
/*		echo "<div style='width:210px;float:right;text-align:right;margin-right:10px;'>Use this field as images url: &nbsp;";
		echo "<input type='checkbox' class='Use_as_URL' style='margin-top:0px;' name='Use_as_URL[$id]' $checkedURL>";
		echo "</div>";*/
		// Das Feld soll als URL agieren --- ENDE	
		
		
		// Formularfelder unserializen
		$fieldContent = unserialize($value->Field_Content);
		
		// Aktuelle Feld ID mitschicken
		echo "<input type='hidden' name='actualID[]' value='$id' >";

			foreach($fieldContent as $key => $value){
			
					if($key=='titel'){ 
					echo "<input type='hidden'/>";
					//ID wird dazu mitgegeben als compareID f�r sp�ter
					echo "<input type='text' name='upload[][$id]' value='$value'  size='30' maxlength='100'>$deleteField<br/>"; // Titel und Delete M�glichkeit die oben bestimmt wurde
					}					
					
					if($key=='content'){ 
					echo "<input type='text' name='upload[]' value='$value' id='nf' maxlength='1000' style='width:855px;'><br/>";
					}
					
					if($key=='min-char'){ 
					echo "Min. number of characters:&nbsp; <input type='text' class='Min_Char' name='upload[]' value='$value' size='7' maxlength='3' ><br/>";
					}
					
					if($key=='max-char'){ 
					echo "Max. number of characters: <input type='text' class='Max_Char' name='upload[]' value='$value' size='7' maxlength='3' ><br/>";
					}
					
					if($key=='mandatory'){
					
					$checked = ($value=='on') ? "checked" : "";

					echo "Necessary <input type='checkbox' class='necessary-check' name='upload[]' $checked ><br/><br/>";
					if ($value!='on') {echo "<input type='hidden' class='necessary-hidden'  name='upload[]' value='off' >";}
					echo "</div>"; 

					$nfCount++;
					$nfHiddenCount++;
					
					
					}
			
			}
	
		}
		
		
		if(@$value->Field_Type == 'email-f'){
		
		// Feldtyp
		// 1 = Feldtitel
		// 2 = Feldinhalt
		// 3 = Felderfordernis
		
		//ermitteln der Feldnummer
		$fieldOrder = $value->Field_Order;
		$fieldOrderKey = "$fieldOrder";
		$id = $value->id; // Unique ID des Form Feldes
		$idKey = "$id";
		
		// Anfang des Formularteils
		echo "<div id='$efCount'  class='formField' style='width:840px;margin-bottom:20px;border: 1px solid #DFDFDF;padding-top:7px;padding-bottom:10px;display:table;padding:10px;'><br/><input type='hidden' name='upload[]' value='ef'>";
		// Prim�re ID in der Datenbank
		//echo "<input type='hidden' name='upload[]' value='$fieldOrder' class='changeUploadFieldOrder'>";
		//SWAP Values
		//echo "<input type='hidden' name='changeFieldRow[$fieldOrder]' value='$fieldOrder' class='changeFieldOrderUsersEntries'>";
		
		echo "<input type='hidden' value='$fieldOrder' class='fieldnumber'>";
		
		// Feld l�schen M�glichkeit
		$deleteField = "<input class='cg_delete_form_field' type='button' value='-' alt='$efCount' titel='$id'><input type='hidden' name='originalRow[$key]' value='$fieldOrder'>";
		
		if($id==@$Field1IdGalleryView){$checked='checked';}
		else{$checked='';}
		
		@$Show_Slider = $wpdb->get_var("SELECT Show_Slider FROM $tablename_form_input WHERE id = '$id'");
		
		if(@$Show_Slider==1){$checkedShow_Slider='checked';}
		else{$checkedShow_Slider='';}
		
		echo "<div style='width:160px;float:right;text-align:right;'>";
		
		echo "Show info in gallery: &nbsp;";
		//echo "<input type='text' value='Show info in gallery:' style='float:right;border: none;width:145px;'>";
		echo "<input type='checkbox' class='cg_info_show_gallery' style='margin-top:0px;' name='Field1IdGalleryView[$id]' $checked>";
		echo "</div>";
		
		echo "<div style='width:160px;float:right;text-align:right;margin-right:12px;'>";
		
		echo "Show info in slider: &nbsp;";
		//echo "<input type='text' value='Show info in gallery:' style='float:right;border: none;width:145px;'>";
		echo "<input type='checkbox' class='cg_info_show_slider' style='margin-top:0px;' name='cg_f_input_id_show_slider[$id]' $checkedShow_Slider>";
		echo "</div>";
		
		
		// Formularfelder unserializen
		$fieldContent = unserialize($value->Field_Content);
		
		// Aktuelle Feld ID mit schicken
		echo "<input type='hidden' name='actualID[]' value='$id' >";
		
			foreach($fieldContent as $key => $value){
			
					// 1 = Feldtitel
					if($key=='titel'){ 
					echo "<input  type='hidden'/>";
					//ID wird dazu mitgegeben als compareID f�r sp�ter
					echo "<input type='text' name='upload[][$id]' value='$value' size='30' maxlength='100'>$deleteField<br/>"; // Titel und Delete M�glichkeit die oben bestimmt wurde
					}
					
					// 2 = Feldinhalt
					if($key=='content'){ 
					echo "<input type='text' name='upload[]' value='$value' id='ef' style='width:855px;' maxlength='100'><br/>"; 
					}

					// 3. Felderfordernis
					if($key=='mandatory'){
					
					$checked = ($value=='on') ? "checked" : "";
					
					echo "Necessary <input type='checkbox' class='necessary-check' name='upload[]' $checked ><br/><br/>";
					if ($value!='on') {echo "<input type='hidden' class='necessary-hidden'  name='upload[]' value='off' >";}
					echo "</div>"; 
					
					$efCount++;
					$efHiddenCount++;
					
					
					}
			
			}
	
		}
		
		
		if(@$value->Field_Type == 'comment-f'){
		
		// Feldtyp
		// Feldreihenfolge 
		// 1 = Feldtitel
		// 2 = Feldinhalt
		// 3 = Feldkrieterium1
		// 4 = Feldkrieterium2 
		// 5 = Felderfordernis
		
		//ermitteln der Feldnummer
		$fieldOrder = $value->Field_Order;
		$fieldOrderKey = "$fieldOrder";
		$id = $value->id; // Unique ID des Form Feldes
		$idKey = "$id";
		
		// Anfang des Formularteils
		echo "<div id='$kfCount'  class='formField' style='width:718px;margin-bottom:20px;border: 1px solid #DFDFDF;padding-top:7px;padding-bottom:10px;display:table;padding:10px;'><br/><input type='hidden' name='upload[]' value='kf'>";
		// Prim�re ID in der Datenbank
		//echo "<input type='hidden' name='upload[]' value='$fieldOrder' class='changeUploadFieldOrder'>";
		//SWAP Values
		//echo "<input type='hidden' name='changeFieldRow[$fieldOrder]' value='$fieldOrder' class='changeFieldOrderUsersEntries'>";// Neuer Wert in der Datebank
		
		echo "<input type='hidden' value='$fieldOrder' class='fieldnumber'>";
		
		// Feld l�schen M�glichkeit
		$deleteField = "<input class='cg_delete_form_field' type='button' value='-' alt='$kfCount' titel='$id'><input type='hidden' name='originalRow[$key]' value='$fieldOrder'>";
		
		
		
		if($id==@$Field1IdGalleryView){$checked='checked';}
		else{$checked='';}
		
		
		@$Show_Slider = $wpdb->get_var("SELECT Show_Slider FROM $tablename_form_input WHERE id = '$id'");
		
		if(@$Show_Slider==1){$checkedShow_Slider='checked';}
		else{$checkedShow_Slider='';}
		
		//echo "$id";
		
		echo "<div style='width:160px;float:right;text-align:right;'>";
		
		echo "Show info in gallery: &nbsp;";
		//echo "<input type='text' value='Show info in gallery:' style='float:right;border: none;width:145px;'>";
		echo "<input type='checkbox' class='cg_info_show_gallery' style='margin-top:0px;' name='Field1IdGalleryView[$id]' $checked>";
		echo "</div>";
		
				echo "<div style='width:160px;float:right;text-align:right;margin-right:12px;'>";
		
		echo "Show info in slider: &nbsp;";
		//echo "<input type='text' value='Show info in gallery:' style='float:right;border: none;width:145px;'>";
		echo "<input type='checkbox' class='cg_info_show_slider' style='margin-top:0px;' name='cg_f_input_id_show_slider[$id]' $checkedShow_Slider>";
		echo "</div>";
		
		// Formularfelder unserializen
		$fieldContent = unserialize($value->Field_Content);
		
		//echo "<br>";
		//print_r($fieldContent);
		//echo "<br>";
		
		// Aktuelle Feld ID mit schicken
		echo "<input type='hidden' name='actualID[]' value='$id' >";		
		
			foreach($fieldContent as $key => $value){
			
					if($key=='titel'){ 
					echo "<input type='hidden'/>";
					//ID wird dazu mitgegeben als compareID f�r sp�ter
					echo "<input type='text' name='upload[][$id]' value='$value' size='30' maxlength='1000'/>$deleteField<br/>";// Titel und Delete M�glichkeit die oben bestimmt wurde
					}					
					
					if($key=='content'){ 
					echo "<textarea name='upload[]' id='kf' maxlength='10000' style='width:856px;' rows='10'>$value</textarea><br/>";
					}
					
					if($key=='min-char'){ 
					echo "Min. number of characters:&nbsp; <input type='text' class='Min_Char' name='upload[]' value='$value' size='7' maxlength='3' ><br/>";
					}
					
					if($key=='max-char'){ 
					echo "Max. number of characters: <input type='text' class='Max_Char' name='upload[]' value='$value' size='7' maxlength='4' ><br/>";
					}
					
					if($key=='mandatory'){
					
					$checked = ($value=='on') ? "checked" : "";

					echo "Necessary <input type='checkbox' class='necessary-check' name='upload[]' $checked ><br/><br/>";
					if ($value!='on') {echo "<input type='hidden' class='necessary-hidden'  name='upload[]' value='off' >";}
					echo "</div>"; 

					$kfCount++;
					$kfHiddenCount++;
					@$i++;
					
					}
			
			}
		
		}
		
		// Zum z�hlen von Feld Reihenfolge
		$i++;
		
	}
}


?>
</div>

</div>

<div style="display:block;padding:20px;padding-bottom:10px;background-color:white;width:895px;text-align:right;margin-top:15px;border: 1px solid #DFDFDF;height:40px;">
<input id="submitForm" type="submit" name="submit" value="Save" style="text-align:center;width:180px;float:right;margin-right:10px;margin-bottom:10px;">
</div>
<br/>



<?php


// ---------------- AUSGABE des gespeicherten Formulares  --------------------------- ENDE

echo "<br/>";
?>
</form>