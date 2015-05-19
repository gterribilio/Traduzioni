<?php

header('Access-Control-Allow-Origin: *');  
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');

require_once("./utility.inc.php");
require_once("./mysql.inc.php");
require_once("./security.php");

$azione = $_GET['action'];

$GLOBALS['nomeDB'] = "my_explico";

switch ($azione) {

	//helper codeTable
	case "uploadImage":
		$filename = $_FILES['file']['name'];
		

		if (!file_exists("./".$_POST[user_id])) {
		mkdir("./uploadedFiles/".$_POST[user_id], 0770);
		}

		$destination = 'uploadedFiles/'.$_POST[user_id]."/".$filename;
		//scrivo il file nella cartella dell'utente
		move_uploaded_file( $_FILES['file']['tmp_name'] , $destination );

		//aggiorno il path dell'immagine
		$query = "UPDATE UTENTE SET IMAGE= '".$filename."' WHERE ID=".$_POST[user_id];
		execQuery($query, $GLOBALS['nomeDB']);
	break;
	
	}

function uploadImageFromLinkedin($id, $image_path){

	if (!file_exists("./".$id)) {
		mkdir("./uploadedFiles/".$id, 0770);
	}
	$destination = 'uploadedFiles/'.$id."/linkedinProfile.jpg";
	
	//scrivo il file nella cartella dell'utente
	//copy($image_path, $destination);
	
	//Get the file
	$content = file_get_contents_curl($image_path);
	//Store in the filesystem.
	$fp = fopen($destination, "w");
	fwrite($fp, $content);
	fclose($fp);
	
	//aggiorno il path dell'immagine
	$query = "UPDATE UTENTE SET IMAGE= 'linkedinProfile.jpg' WHERE ID=".$id;
	execQuery($query, $GLOBALS['nomeDB']);
}

function file_get_contents_curl($url) {
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_AUTOREFERER, TRUE);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, TRUE);       

    $data = curl_exec($ch);
    curl_close($ch);

    return $data;
}

?>

