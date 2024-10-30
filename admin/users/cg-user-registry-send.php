<?php
		
		
		// 1 = Mail
		// 2 = Name
		// 3 = Check		
	
		if($_REQUEST['action3']==wp_create_nonce("check")){
		
		
			include("class-sql.php");
			$cgSqlClass = new cgSqlClass();
			
			$selectWpUserIdViaMail = strtolower($cgSqlClass->selectWpUserIdViaMail(sanitize_text_field($_REQUEST["action1"])));
			$selectWpUserIdViaName = strtolower($cgSqlClass->selectWpUserIdViaName(sanitize_text_field($_REQUEST["action2"])));
			
			if($selectWpUserIdViaMail==true or $selectWpUserIdViaName==true){			

		
				
?>
<script>
var tagID = 'cg_check_mail_name';
var elem = document.getElementById(tagID);
elem.value = 1;// Bedeutet, dass Form nicht weitergeladen werden soll
</script>
<?php	
				
			if($selectWpUserIdViaMail){echo "Diese E-Mail ist bereits vergeben<br/>";}
			if($selectWpUserIdViaName){echo "Dieser Name ist bereits vergeben<br/>";}	
			
			}

			else{				
	
				
?>
<script>
var tagID = 'cg_check_mail_name';
var elem = document.getElementById(tagID);
elem.value = 0;// Bedeutet, dass Form weitergeladen werden kann
</script>
<?php			
						
				
				
				
			}

		}
		
		else{		
		
			echo "Bitte nicht manipulieren :)";
			die();		
		
		}  

  
?>