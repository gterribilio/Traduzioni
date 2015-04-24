<?php

header('Access-Control-Allow-Origin: *');  
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');

require_once("./utility.inc.php");
require_once("./mysql.inc.php");
require_once("./security.php");

$filename = $_FILES['file']['name'];
$nomeDB = "my_explico";

if (!file_exists("./".$_POST[user_id])) {
    mkdir("./uploadedFiles/".$_POST[user_id], 0770);
}

$destination = 'uploadedFiles/'.$_POST[user_id]."/".$filename;
//scrivo il file nella cartella dell'utente
move_uploaded_file( $_FILES['file']['tmp_name'] , $destination );

//aggiorno il path dell'immagine
$query = "UPDATE UTENTE SET IMAGE= '".$filename."' WHERE ID=".$_POST[user_id];
execQuery($query, $nomeDB);

?>

