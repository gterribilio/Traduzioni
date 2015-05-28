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

if(isset($_GET["ID"])){
	sendMail($_GET["ID"]);
	echo "Email inviata!!";
}

function sendMail($email, $subject, $text){

	$header = "From: ".$email."\n";
	$header .= "X-Mailer: Explico\n";

// costruiamo le intestazioni specifiche per il formato HTML
	$header .= "MIME-Version: 1.0\n";
	$header .= "Content-Type: text/html; charset=\"iso-8859-1\"\n";
	$header .= "Content-Transfer-Encoding: 7bit\n\n";

//costruiamo il testo in formato HTML
	$messaggio = "<html><body><p>Questo messaggio è stato inviato da ".$email."</p><p>".$text."</p></body></html>";

// inviamo il messaggio di posta elettronica
// controllando eventuali errori
	@mail("luca.sapone86@gmail.com", $subject, $messaggio, $header); 
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

?>