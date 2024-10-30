<?php
//Alle SQL-Befehle und dazugehörigen Namen sind in dieser Klasse
class cgSqlClass{
	
	public $tablenameCreateUserEntries = "contest_gal1ery_create_user_entries";
	public $tablenameCreateUserForm = "contest_gal1ery_create_user_form";
	public $tablenameActivation = "contest_gal1ery_activation";
	public $tablenameWpUsers = "users";
	
	function __construct()
	{
			global $wpdb;
			$this->db = $wpdb;
			
	}
		  
		  
	protected function tablenameCreateUserEntries(){
		
		$tablename = $this->db->prefix.$this->tablenameCreateUserEntries;
		
		return $tablename;
		
	}
	
	protected function tablenameCreateUserForm(){		
		
	$tablename = $this->db->prefix.$this->tablenameCreateUserForm;
	
	return $tablename;
		
	}
	
	protected function tablenameActivation(){		
		
	$tablename = $this->db->prefix.$this->tablenameActivation;
	
	return $tablename;
		
	}
	
	protected function tablenameWpUsers(){	
		
	$tablename = $this->db->prefix.$this->tablenameWpUsers;
	
	return $tablename;
		
	}
	
	
	public function insertNewUser($Tablename,$user_login,$user_pass,$user_nicename,$user_email,$user_url,$user_registered,$user_activation_key,$user_status,$display_name,$spam,$deleted){
		
						$this->db->query( $this->db->prepare(
						"
							INSERT INTO $Tablename
							( id, user_login, user_pass, user_nicename, user_email, user_url,
							user_registered, user_activation_key, user_status, display_name, spam,deleted)
							VALUES (%s,%s,%s,%s,%s,%s,
							%s,%s,%d,%s,%d,%d)
						",
							'',$user_login,$user_pass,$user_nicename,$user_email,$user_url,
							$user_registered,$user_activation_key,$user_status,$display_name,$spam,$deleted
						) );			
	
	}
	
	
	
	public function insertIntoUserFormEntries($Tablename,$Gallery_ID,$wp_user_ID,$Form_Input_ID,$Field_Type,$Field_Order,$Field_Name,$Field_Content){
		
						$this->db->query( $this->db->prepare(
						"
							INSERT INTO $Tablename
							( id, GalleryID, wp_user_id, f_input_id, Field_Type, Field_Order,
							Field_Name, Field_Content,
							Option1,Option2,Option3,Option4,Option5,Option6,
							Option7,Option8,Option9,Option10)
							VALUES (%s,%d,%d,%d,%s,%d,
							%s,%s,
							%s,%s,%s,%s,%s,%s,
							%s,%s,%s,%s)
						",
							'',$Gallery_ID,$wp_user_ID,$Form_Input_ID,$Field_Type,$Field_Order,
							$Field_Name,$Field_Content,
							'','','','','','',
							'','','',''
						) );			
	
	}	
	
	
	
	public function updateUserActivationRegistered($Tablename,$user_id_wp,$activation_key){

		echo "$Tablename<br>";
		echo "$user_id_wp<br>";
		echo "$activation_key<br>";	
		
						$this->db->query( $this->db->prepare(
						"
							INSERT INTO $Tablename
							( id, user_id_wp, user_login, user_email, registered, activated,
							active,activation_key)
							VALUES (%s,%d,%s,%s,%s,%s,
							%d,%s)
						",
							'',$user_id_wp,$user_login,$user_email,$registered,$activated,
							$active,$activation_key
						) );	
						
	
	}
	
		public function updateUserActivationRestValues($Tablename,$user_id_wp,$activation_key){

		echo "$Tablename<br>";
		echo "$user_id_wp<br>";
		echo "$activation_key<br>";	
		
						$this->db->query( $this->db->prepare(
						"
							INSERT INTO $Tablename
							( id, user_id_wp, user_login, user_pass, user_email, registered, activated,
							active,activation_key)
							VALUES (%s,%d,%s,%s,%s,%s,%s,
							%d,%s)
						",
							'',$user_id_wp,$user_login,$user_pass,$user_email,$registered,$activated,
							$active,$activation_key
						) );						
	
		}
	
		public function insertIntoUserActivation($Tablename,$user_id_wp,$user_login,$user_pass,$user_email,$registered,$activated,$active,$activation_key){

		echo "$Tablename<br>";
		echo "$user_id_wp<br>";
		echo "$user_login<br>";
		echo "$user_email<br>";
		echo "$registered<br>";
		echo "$activated<br>";
		echo "$active<br>";
		echo "$activation_key<br>";	
		
						$this->db->query( $this->db->prepare(
						"
							INSERT INTO $Tablename
							( id, user_id_wp, user_login, user_pass, user_email, registered, activated,
							active,activation_key)
							VALUES (%s,%d,%s,%s,%s,%s,%s,
							%d,%s)
						",
							'',$user_id_wp,$user_login,$user_pass,$user_email,$registered,$activated,
							$active,$activation_key
						) );
						
	
	}
	
	public function selectUserPassword($Email){		
		
	$selectUserForm = $this->db->get_results("SELECT Field_Content FROM ".$this->tablenameCreateUserEntries()." WHERE E='$ID'");
	
	return $selectUserForm;
		
	}
	
	
	public function selectUserForm($ID){		
		
	$selectUserForm = $this->db->get_results("SELECT * FROM ".$this->tablenameCreateUserForm()." WHERE GalleryID='$ID'");
	
	return $selectUserForm;
		
	}
	
	public function selectUserEntriesOfForm($FormID){	
		
	$selectUserEntriesOfForm = $this->db->get_results("SELECT * FROM ".$this->tablenameUserData()." where FormID=".$FormID." ORDER BY id ASC");
	
	return $selectUserEntriesOfForm;
		
	}
	
	public function selectForm($formID){
		
	$selectForm = $this->db->get_row("SELECT * FROM ".$this->tablenameFormData()." WHERE id = ".$formID."");
	
	return $selectForm;
		
	}
	
	public function selectIdViaEmail($Email){	
		
	$checkEmail = $this->db->get_var("SELECT id FROM ".$this->tablenameCreateUserEntries()." WHERE Field_Type = 'main-mail' and Field_Content = '".$Email."'");
	
	return $checkEmail;
		
	}
	
	
	
	public function selectRowViaActivationKey($activation_key){	
		
	$checkActivation = $this->db->get_var("SELECT * FROM ".$this->tablenameActivation()." WHERE activation_key = '".$activation_key."'");
	
	return $checkActivation;
		
	}
	
	
	public function selectIdActivationTableViaEmail($Email){
		
	$getActivationID = $this->db->get_var("SELECT id FROM ".$this->tablenameActivation()." WHERE user_email = '".$Email."'");
	
	return $checkActivation;
		
	}
	
	public function selectWpUserIdViaMail($Email){
		
	$checkWpIdViaMail = strtolower($this->db->get_var("SELECT ID FROM ".$this->tablenameWpUsers()." WHERE user_email = '".$Email."'"));
	
	return $checkWpIdViaMail;
		
	}
	
	public function selectWpUserIdViaName($Name){
		
	$checkWpIdViaName = strtolower($this->db->get_var("SELECT ID FROM ".$this->tablenameWpUsers()." WHERE user_login = '".$Name."'"));
	
	return $checkWpIdViaName;
		
	}
	
	public function deleteActivationViaEmail($Email){
		
			$deleteQuery = 'DELETE FROM ' . $tablename . ' WHERE';			
			$deleteQuery .= ' user_email = %s';

			
			$this->db->query( $this->db->prepare(
				"
					$deleteQuery
				", 
					$Email
			 ));		
		
	}
	
	
	public function saveFormData($Betreff,$Bearbeiter){
		
		$this->Betreff = $Betreff;
		$this->Bearbeiter = $Bearbeiter;
		
		foreach($this->Betreff as $key => $value){

					$this->db->update( 
					"".$this->tablenameFormData()."",
					array('Betreff' => $value,'Bearbeiter' => $this->Bearbeiter[$key]), 
					array('id' => $key), 
					array('%s','%s'),
					array('%d')
					);
			
			}
	
	}
	
	
	public function createFormData(){
		
			$this->db->query($this->db->prepare(
				"
					INSERT INTO ".$this->tablenameFormData()."
					(id, Betreff, Bearbeiter)
					VALUES ( %s,%s,%s)
				",
				'','',''
				));
	
	}
	
	public function saveUserData($FormID,$Anrede,$Name,$Email,$Tel,$ActivationKey){		

			$this->db->query($this->db->prepare(
				"
					INSERT INTO ".$this->tablenameUserData()."
					(id, FormID, Name, Anrede, Email, Rufnummer, IP, TimeActivated, TimeRegistered, ActivationKey)
					VALUES (%s,%d,%s,%s,%s,%d,%s,%d,%d,%s)
				",
				'',$FormID,$Name,$Anrede,$Email,$Tel,$this->getIP(),$this->getTimestamp(),'',$ActivationKey
				));			
			
	}
	
	public function proveUserKeySQL($Key){

		$userData = $this->db->get_row("SELECT Name, Anrede, Email, Rufnummer FROM ".$this->tablenameUserData()." WHERE ActivationKey = '".$Key."'");
			
		return $userData;		
	
	}
	
	
	public function saveUserKey($ID,$Key){

					$this->db->update(
					"".$this->tablenameUserData()."",
					array('ActivationKey' => $Key), 
					array('id' => $ID), 
					array('%s'),
					array('%d')
					);
			
	}
	
	public function testFunction(){
	
echo "TEST WORKS YEAHHHH!!!!!!!!!!!!!";	
	
}

	
}



	
?>