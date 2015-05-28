<?php

header('Access-Control-Allow-Origin: *');  
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');

require_once("./utility.inc.php");
require_once("./mysql.inc.php");
require_once("./security.php");

$azione = $_GET['action'];

$GLOBALS['nomeDB'] = "glificoc33741";

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
	$destination = 'uploadedFiles/'.$id."/imageProfile.jpg";
	
	//scrivo il file nella cartella dell'utente
	//copy($image_path, $destination);
	
	//Get the file
	$content = file_get_contents_curl($image_path);
	//Store in the filesystem.
	$fp = fopen($destination, "w");
	fwrite($fp, $content);
	fclose($fp);
	
	//aggiorno il path dell'immagine
	$query = "UPDATE UTENTE SET IMAGE= 'imageProfile.jpg' WHERE ID=".$id;
	execQuery($query, $GLOBALS['nomeDB']);
}

function uploadImageFromFacebook($id, $image_path, $facebook_user_id){

	if (!file_exists("./".$id)) {
		mkdir("./uploadedFiles/".$id, 0770);
	}
	$destination = 'uploadedFiles/'.$id."/imageProfile.jpg";
	
	//scrivo il file nella cartella dell'utente
	$url = 'http://graph.facebook.com/' . $facebook_user_id . '/picture?type=large';

    $file_handler = fopen($destination, 'w');
    $curl = curl_init(get_right_url($image_path));
    curl_setopt($curl, CURLOPT_FILE, $file_handler);
    curl_setopt($curl, CURLOPT_HEADER, false);
    curl_exec($curl);

    curl_close($curl);
    fclose($file_handler);
	
	//aggiorno il path dell'immagine
	$query = "UPDATE UTENTE SET IMAGE= 'imageProfile.jpg' WHERE ID=".$id;
	execQuery($query, $GLOBALS['nomeDB']);
}

//FUNZIONE USATA PER LINKEDIN
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

//FUNZIONI USATE PER FACEBOOK
function curl_redir_exec($ch) {
	static $curl_loops = 0;
	static $curl_max_loops = 20;
	if ($curl_loops++ >= $curl_max_loops)
	{
		$curl_loops = 0;
		return FALSE;
	}
	curl_setopt($ch, CURLOPT_HEADER, true);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	$data = curl_exec($ch);
	@list($header, $data) = @explode("\n\n", $data, 2);
	$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
	if ($http_code == 301 || $http_code == 302)
	{
		$matches = array();
		preg_match('/Location:(.*?)\n/', $header, $matches);
		$url = @parse_url(trim(array_pop($matches)));
		if (!$url)
		{
			//couldn't process the url to redirect to
			$curl_loops = 0;
			return $data;
		}
		$last_url = parse_url(curl_getinfo($ch, CURLINFO_EFFECTIVE_URL));
		if (!$url['scheme'])
			$url['scheme'] = $last_url['scheme'];
		if (!$url['host'])
			$url['host'] = $last_url['host'];
		if (!$url['path'])
			$url['path'] = $last_url['path'];
		$new_url = $url['scheme'] . '://' . $url['host'] . $url['path'] . (@$url['query']?'?'.$url['query']:'');
		return $new_url;
	} else {
		$curl_loops=0;
		return $data;
	}
}

function get_right_url($url) {
	$curl = curl_init($url);
	curl_setopt($curl, CURLOPT_HEADER, false);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
	return curl_redir_exec($curl);
}

?>

