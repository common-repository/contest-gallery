<?php
// Daten Validierungs-Befehle sind in dieser Klasse
class cgRegClass extends cgSqlClass{
	
	function __construct() {		
		
		parent::__construct();		
	
	}
	
	public function getTimestamp(){
		
		$getTimestamp = time();
		
		return $getTimestamp;
		
	}
	
	public function getIP(){
		
		$getIP = $_SERVER['REMOTE_ADDR'];
		
		return $getIP;
		
	}
	
	// Activation Key wird geprüft. Dann die Row aus der Aktivation Tabelle gewählt und diese Daten in die offizielle Wordpress WP_User_ID Tabelle inserted.
	public function checkActivationKey($activation_key){
		
			$selectRowViaActivationKey = $this->selectRowViaActivationKey($activation_key);
			
		if($selectRowViaActivationKey){
			
			$user_login = $selectRowViaActivationKey->user_login;
			$user_pass = $selectRowViaActivationKey->user_login;
			$user_nicename = $selectRowViaActivationKey->user_login;
			$user_email = $selectRowViaActivationKey->user_email;
			$user_registered = date('Y-m-d h:i:s');
			$activation_key = $selectRowViaActivationKey->activation_key;
			$user_status=0;
			$display_name=$selectRowViaActivationKey->user_login;
			$spam=0;
			$deleted=0;
				
			$this->insertNewUser($this->tablenameWpUsers(),$user_login,$user_pass,$user_nicename,$user_email,$user_url,$user_registered,$activation_key,$user_status,$display_name,$spam,$deleted);			
			
		}
		else{}

	}
	
	
	public function checkUserDataArrayEmailCheck($cg_Fields){
		
			foreach($cg_Fields as $key => $value){
				
					if($value["Field_Type"]=='main-mail'){
					$Field_Content = strtolower(sanitize_text_field($value["Field_Content"]));
					$selectIdActivationTableViaEmail = $this->selectIdActivationTableViaEmail($Field_Content);
					
						if($selectIdActivationTableViaEmail){
						$this->deleteActivationViaEmail($Field_Content);
						// Erstmal muss der User angelegt werden in der Activation Tabelle, damit die ID und der Eintrag später per E-Mail gefunden werden kann
						$this->insertIntoUserActivation($TablenameUserActivation,'','',$Field_Content,'','',0,'');
						//Id wird gewählt nachdem inserted wurde
						$selectIdActivationTableViaEmail = $this->selectIdActivationTableViaEmail($Field_Content);
						}
						else{
						// Erstmal muss der User angelegt werden in der Activation Tabelle, damit die ID und der Eintrag später per E-Mail gefunden werden kann
						$this->insertIntoUserActivation($TablenameUserActivation,'','',$Field_Content,'','',0,'');	
						//Id wird gewählt nachdem inserted wurde
						$selectIdActivationTableViaEmail = $this->selectIdActivationTableViaEmail($Field_Content);					
						}
			
					}

			}
			
	return $selectIdActivationTableViaEmail;

	}
	
	
	public function checkUserDataArray($Gallery_ID,$cg_Fields,$URL,$selectIdActivationTableViaEmail){			
		
			$WP_User_ID = '';
		
			$r=0;// Zur Prüfung beim Durchgehen von foreach
			
			$this->selectIdActivationTableViaEmail();

			foreach($cg_Fields as $key => $value){				
				

				
				// Wird nicht bei den Entries eingetragen
				if($Field_Type=='main-mail'){
					$r++;
					$ActivationKey = $this->generateKey($get_Field_Content);
					$sendMail = strtolower($Field_Content);	// E-Mail des Users

				}
				// Wird nicht bei den Entries eingetragen
				else if($Field_Type=='main-user-name'){
					$Main_User_Name = $Field_Content;// Hauptname des Users
					$r++;
					$sendName = $Field_Content;					
				}
				
				// Wird nicht bei den Entries eingetragen
				else if($Field_Type=='password'){
					$Main_User_Password = MD5($Field_Content);// Passwort wird verschlüsselt
				}			
				
				else{
					
					//$this->checkUserData($Gallery_ID,$Form_Input_ID,$Field_Type,$Field_Order,$Field_Name,$Field_Content,$getURL);				
					$TablenameCreateUserEntries = $this->tablenameCreateUserEntries();
					$this->insertIntoUserFormEntries($TablenameCreateUserEntries,$Gallery_ID,$selectIdActivationTableViaEmail,$WP_User_ID,$Form_Input_ID,$Field_Type,$Field_Order,$Field_Name,$Field_Content);	
					
				}



			}
			
				if($r==2){
					$this->sendMail($sendMail,$sendName,$getURL,$ActivationKey);					
				}
				
				
			// Weitere Daten in der Activation Tabelle werden dem User hinzugefügt
			$registeredTime = date('Y-m-d h:i:s');
			$this->updateUserActivationRestValues($this->tablenameActivation(),$WP_User_ID,$Main_User_Name,$Main_User_Password,$sendMail,$registeredTime,0,0,$ActivationKey);

	}
	
	/*
	public function checkUserData($Gallery_ID,$Form_Input_ID,$Field_Type,$Field_Order,$Field_Name,$Field_Content,$URL){

		 // Endgültige Eintragung der USER ID erfolgt erst nach. Bestätigung der E-Mail Adresse.

		$TablenameCreateUserEntries = $this->tablenameCreateUserEntries();
		$TablenameUserActivation = $this->tablenameActivation();
		
		echo "$Tablename<br>";
		echo "$Gallery_ID<br>";
		echo "$get_WP_User_ID<br>";
		echo "$get_Form_Input_ID<br>";
		echo "$get_Field_Type<br>";
		echo "$get_Field_Order<br>";
		echo "$get_Field_Name<br>";
		echo "$get_Field_Content<br>";
				
				
				//($Tablename,$user_id_wp,$user_login,$user_email,$registered,$activated,$active,$activation_key)

	}*/
	
	

	/*
	public function checkUserData($FormID,$Anrede,$Name,$Email,$Tel,$URL){	
		
			$getFormID = sanitize_text_field($FormID['action1']); 
			$getAnrede = (sanitize_text_field($Anrede)=='Frau') ? 1 : 2;//1==Frau,2==Mann
			$getName = sanitize_text_field($Name);
			$getEmail = strtolower(sanitize_text_field($Email));			
			$getTel = sanitize_text_field($Tel);
			$getURL = sanitize_text_field($URL);
			$ActivationKey = $this->generateKey($getEmail,$getTel);
			
			$checkEmailDb = $this->selectIdViaEmail($getEmail);			
			
			if(!$checkEmailDb){
			
			$this->saveUserData($getFormID,$getAnrede,$getName,$getEmail,$getTel,$ActivationKey);
			
			$selectForm = $this->selectForm($getFormID);
				
			$this->sendMail($getEmail,$getURL,$selectForm->Bearbeiter,$selectForm->Betreff,$getName,$getAnrede,$ActivationKey);
			
			//Kann verwendet werden sobald sendSMS mit cURL Funktion funktioniert
			//$this->sendSMS($URL,$AktivationKey,$Tel);
			
			echo "Vielen Dank für Ihre Registrierung. Bitte überprüfen Sie Ihr E-Mail-Postfach.";
			
			}
			
			else{
				
			echo "Diese E-Mail-Adresse ist schon vergeben.";	
				
			}		
		
	}*/
	
	
	public function proveUserKey($Key){		
		
			$userData = $this->proveUserKeySQL($Key);

			if($userData==true){
				
				
					$Anrede = ($userData->Anrede==1) ? "Sehr geehrte Frau" : "Sehr geehrter Herr";				
				
					$userDataMessage =	"$Anrede ".$userData->Name.",<br><br>";			
					$userDataMessage .=	"Vielen Dank für Ihre Registrierung.<br><br>";	
					$userDataMessage .=	"Ihre Anmeldedaten:<br>";
					$userDataMessage .=	"Email: ".$userData->Email."<br>";
					if($userData->Rufnummer==true){$userDataMessage .= "Rufnummer: ".$userData->Rufnummer."<br>";}
					
					
				}
				else{
					
					$userDataMessage = "Ihre Registrierung wurde nicht gefunden";					
					
				}
			
		echo $userDataMessage;		
	
	}
	
	
	protected function generateKey($Email){
		
		$wholeString = $Email;

		$n = strlen($wholeString);
		
		for ($i = 0; $i <= $n-1; $i++) {
	
			$progressiveKey = ($i+218)*2+170;
		
			$keyString.=$wholeString[$i].$progressiveKey;			
		
		}

		
		$keyString = MD5($keyString);
		
		return $keyString;
		
	}
	
	protected function sendMail($Email,$Name,$URL,$ActivationKey){
		
		
		$Subject = "Bestätigen Sie Ihre Daten für die Teilnahme am Fotowettbewerb";

		//$AnredeText = ($Anrede==1) ? "Sehr geehrte Frau" : "Sehr geehrter Herr";
		
		if(strpos($URL,'?')){$userURL=$URL."&";}
		else{$userURL=$URL."?";}
						
							if (filter_var($Email, FILTER_VALIDATE_EMAIL)) {
						
								$DataLink = $userURL."ActivationKey=".$ActivationKey;								
																					
								$Msg = "Hello $Name,<br/><br/>vielen Dank für Ihre Registrierung.<br/><br/>Um diese komplett abzuschließen klicken Sie bitte auf nachfolgenden Link:<br/>$DataLink";
								$Msg .= "<br/><br/><br/>Mit freundlichen Grüßen<br/><br/>".get_option('blogname')."";
								
								$headers = array();
								
								$headers[] = "From:  ".get_option('blogname')." <".get_option('admin_email').">".PHP_EOL;
								$headers[] = "CC:  webmaster@contest-gallery.com".PHP_EOL;
								$headers[] = "BCC:  webmaster@contest-gallery.com".PHP_EOL;
								$headers[] = "MIME-Version: 1.0".PHP_EOL;
								$headers[] = "Content-Type: text/html; charset=utf-8".PHP_EOL;
							
								@wp_mail($Email, $Subject, $Msg, $headers);				
						
							}
							
							else{
								
								echo "Ihre E-Mail Adresse ist ungültig!";
								
							}
			
	}
	
	
	protected function sendSMS($URL,$AktivationKey,$Tel){
		
		$DataLink = $URL."?".$AktivationKey;
		$Msg = "Ihre Daten stehen Ihnen zur Verfügung: $DataLink";
		
		$curl = curl_init();
		$url = "http://smsgw01.ipandmore.de/sms.php?phone=$Tel?text=$Msg";
		curl_setopt ($curl, CURLOPT_URL,$url);
		curl_setopt($curl, CURLOPT_USERPWD, "smsuser:oiLor9tue6xo5yi");
		curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER,1);


		curl_exec ($curl);
		curl_close ($curl);
			
	}


	
	
}

	
?>