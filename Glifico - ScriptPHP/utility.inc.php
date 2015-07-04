<?php
require_once("./mysql.inc.php");

$GLOBALS["statiPrenotazione"] = array (
	"DECLINED" => "DECLINED", 
	"ENGAGMENT" => "ENGAGMENT", 
	"COMPETITION" => "COMPETITION", 
	"ACTIVE" => "ACTIVE",
	"REVIEW" => "REVIEW", 
	"IN APPROVAL" => "IN APPROVAL", 
	"CLOSED" => "CLOSED");

$id_safe = mysql_escape_mimic($_GET["ID"]);
if(isset($id_safe)) {
	sendMail($id_safe);
	echo "Email inviata!!";
}

function sendCustomMail($from, $to, $subject, $text){

	$header = "From: ".$from."\n";
	$header .= "X-Mailer: Explico\n";

// costruiamo le intestazioni specifiche per il formato HTML
	$header .= "MIME-Version: 1.0\n";
	$header .= "Content-Type: text/html; charset=\"iso-8859-1\"\n";
	$header .= "Content-Transfer-Encoding: 7bit\n\n";

//costruiamo il testo in formato HTML
	$messaggio = "<html><body><p>".$text."</p></body></html>";

// inviamo il messaggio di posta elettronica
// controllando eventuali errori
	@mail($to, $subject, $messaggio, $header); 
}

function mysql_escape_mimic($inp) { 
    if(is_array($inp)) 
        return array_map(__METHOD__, $inp); 

    if(!empty($inp) && is_string($inp)) { 
        return str_replace(array('\\', "\0", "\n", "\r", "'", '"', "\x1a"), array('\\\\', '\\0', '\\n', '\\r', "\\'", '\\"', '\\Z'), $inp); 
    } 

    return $inp; 
} 

?>