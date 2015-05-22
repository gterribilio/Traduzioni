<?php

//Includo il file che contiene le funzioni per la connessione 
require_once("./mysql.inc.php");
require_once("./security.php");

//includo file per invio mail
require_once("./utility.inc.php");
require_once("./upload.php");

$json = array();
//leggo l'azione passata in "GET" da eseguire per settare bene la query
$azione = $_GET['action'];
$callback = $_GET['callback'];

$nomeDB = "my_explico";

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

switch ($azione) {

	//helper codeTable
	case "get_codetable":
		$codetable=$_GET['codetable'];
		$query = "SELECT ID_ITEM,DESCRIZIONE FROM CODETABLE WHERE ID_CODETABLE='".$codetable."'";
	break;
	
	case "search":
		$mothertongueSearchFrom=$_GET['mothertongueSearchFrom'];
		$mothertongueSearchTo=$_GET['mothertongueSearchTo'];
		$service=$_GET['service'];
		$typeNumber=$_GET['typeNumber'];
		$pagesNumber=$_GET['pagesNumber'];
		$typeNumberVal=$_GET['typeNumberVal'];
		$pagesNumberVal=$_GET['pagesNumberVal'];
		$field=$_GET['field'];
		$ktr=$_GET['ktr'];
		$deadline=$_GET['deadline'];
		$pricefrom=$_GET['pricefrom'];
		$priceto=$_GET['priceto'];
		
		$sql = and
	break;

	case "getImagePath":
		$user_id=$_GET['user_id'];
		$query = "SELECT IMAGE FROM UTENTE WHERE ID=".$user_id;
		$result = execQuery($query, $nomeDB);
		while($row1 = @mysql_fetch_array($result, MYSQL_ASSOC)) {
			array_push($json, $row1);
		}
	break;

	//invio email con subject e text
	case "contact":
		$email=$_GET['email'];
		$subject=addslashes($_GET['subject']);
		$text=$_GET['text'];
		sendMail($email,$subject,$text);
	break;
	
	//checkUsername
	case "checkUsername":
		$username=$_GET['username'];
		$query="SELECT * FROM UTENTE WHERE BINARY USERNAME='".$username."'";
	break;

	//aggiorna lo status della traduzione
	case "update_job_status":
		$id_job = $_GET['id_job'];
		$tipo_job = $_GET['tipo_job'];
		$status_job = $_GET['status'];
		if($tipo_job=="translation") {
			$query="UPDATE JOBS_TRANSLATION set STATO='".$status_job."' WHERE ID=".$id_job;
		}
		else /*($tipo_job=="correction")*/ {
			$query="UPDATE JOBS_CORRECTION set STATO='".$status_job."' WHERE ID=".$id_job;
		}
	break;

	// Quando il traduttore accetta il lavoro, bisogna settare ID_TRADUTTORE
	// In teoria bisogna solo settarlo nel caso competition, nel caso engagment viene già
	// assegnato dall'agenzia!
	case "doAccept":
		$id_job = $_GET['id_job'];
		$tipo_job = $_GET['tipo_job'];
		$user_id = $_GET['user_id'];
		if($tipo_job=="translation") {
			$query="UPDATE JOBS_TRANSLATION set ID_TRADUTTORE='".$user_id."' WHERE ID=".$id_job;
		}
		else /*($tipo_job=="correction")*/ {
			$query="UPDATE JOBS_CORRECTION set ID_TRADUTTORE='".$user_id."' WHERE ID=".$id_job;
		}
	break;

	//quando il traduttore accetta il lavoro, bisogna settare ID_TRADUTTORE
	case "doDecline":
		$id_job = $_GET['id_job'];
		$tipo_job = $_GET['tipo_job'];
		$user_id = $_GET['user_id'];
		$jsonData = array();
		$jsonData2 = array();
		if($tipo_job=="translation") {

			//recupero la mail dell'agenzia a cui inviare la mail
			$query="SELECT EMAIL FROM UTENTE U, JOBS_TRANSLATION J WHERE J.ID=".$id_job." AND J.ID_AGENZIA=U.ID";
			$result = execQuery($query, $nomeDB);
			while($row1 = @mysql_fetch_array($result, MYSQL_ASSOC))
			{
				array_push($jsonData, $row1);
			}
			//recupero lo username dell'utente che ha rifiutato il job
			$query="SELECT USERNAME FROM UTENTE U, JOBS_TRANSLATION J WHERE J.ID=".$id_job." AND J.ID_TRADUTTORE=U.ID";
			$result = execQuery($query, $nomeDB);
			while($row1 = @mysql_fetch_array($result, MYSQL_ASSOC))
			{
				array_push($jsonData2, $row1);
			}
			sendCustomMail("luca.sapone86@gmail.com ",$jsonData[0]["EMAIL"], "Rifiuto di un lavoro da parte di un utente", "La traduzione è stata rifiutata da <strong>".$jsonData2[0]["USERNAME"]."</strong>");
			$query="UPDATE JOBS_TRANSLATION set ID_TRADUTTORE='".$user_id."' WHERE ID=".$id_job;

		}
		else /*($tipo_job=="correction")*/ {

			//recupero la mail dell'agenzia a cui inviare la mail
			$query="SELECT EMAIL FROM UTENTE U, JOBS_CORRECTION J WHERE J.ID=".$id_job." AND J.ID_AGENZIA=U.ID";
			$result = execQuery($query, $nomeDB);
			while($row1 = @mysql_fetch_array($result, MYSQL_ASSOC))
			{
				array_push($jsonData, $row1);
			}

			//recupero lo username dell'utente che ha rifiutato il job
			$query="SELECT USERNAME FROM UTENTE U, JOBS_CORRECTION J WHERE J.ID=".$id_job." AND J.ID_TRADUTTORE=U.ID";
			$result = execQuery($query, $nomeDB);
			while($row1 = @mysql_fetch_array($result, MYSQL_ASSOC))
			{
				array_push($jsonData2, $row1);
			}
			sendCustomMail("luca.sapone86@gmail.com ", $jsonData[0]["EMAIL"], "Rifiuto di un lavoro da parte di un utente", "La traduzione è stata rifiutata da <strong>".$jsonData2[0]["USERNAME"]."</strong>");
			$query="UPDATE JOBS_CORRECTION set ID_TRADUTTORE='".$user_id."' WHERE ID=".$id_job;
		}
	break;

	//quando il traduttore accetta il lavoro, bisogna settare ID_TRADUTTORE
	case "doSend":
		$id_job = $_GET['id_job'];
		$tipo_job = $_GET['tipo_job'];
		$id_agenzia = $_GET['id_agenzia'];
		$jsonData = array();

		//recupero la mail dell'agenzia a cui inviare la mail
		$query="SELECT EMAIL FROM UTENTE WHERE ID=".$id_agenzia;
		$result = execQuery($query, $nomeDB);
		while($row1 = @mysql_fetch_array($result, MYSQL_ASSOC))
		{
			array_push($jsonData, $row1);
		}

		sendCustomMail("info@explico.com ",$jsonData[0]["EMAIL"], "Notifica invio lavoro da parte del traduttore", "La traduzione relativa al
		lavoro ".$id_job." relativa ad una ".$tipo_job." è stato terminato.<br/> Di seguito trovi il link per scaricare il tuo lavoro.<br><br/>http://www.google.it<br/><br/> Lo staff di Explico");
	break;

	case "save_job":
		$id_job=$_GET['id_job'];
		$text=$_GET['text'];
		$tipo_job=$_GET['tipo_job'];
		if($tipo_job=="translation") {
			$query="UPDATE JOBS_TRANSLATION SET TEXT_DONE='".$text."' WHERE ID=".$id_job;

		} 	else /*($tipo_job=="correction")*/ {
			$query="UPDATE JOBS_CORRECTION SET TEXT_DONE='".$text."'";
		}
	break;

	//aggiunge lingue al profilo dell'utente
	case "addPair":
		$from=$_GET['from'];
		$to=$_GET['to'];
		$field=$_GET['field'];
		$service=$_GET['service'];
		$price=$_GET['price'];
		$currency=$_GET['currency'];
		$user_id=$_GET['user_id'];
		$query="SELECT * FROM `LANGUAGE_PAIR` WHERE `FROM`='".$from."' AND `TO`='".$to."' AND SERVICE='".$service."' AND FIELD='".$field."' AND USER_ID=".$user_id;
		$result = execQuery($query, $nomeDB);
		if(mysql_num_rows($result)==0) {
			$query = "INSERT INTO `LANGUAGE_PAIR`(`ID`, `USER_ID`, `FROM`, `TO`, `FIELD`, `SERVICE`, `PRICE`, `CURRENCY`) VALUES (NULL,".$user_id.",'".$from."','".$to."','".$field."','".$service."','".$price."','".$currency."')";
			execQuery($query, $nomeDB);
			$query = "SELECT * FROM `LANGUAGE_PAIR` WHERE USER_ID=".$user_id;
		} else {
			$json = json_encode(array("errCode"=>"406","errMsg"=>"Pair already present!"));
		}
	break;

	//get language pair
	case "getPair":
		$user_id=$_GET['user_id'];
		$query = "SELECT * FROM `LANGUAGE_PAIR` WHERE USER_ID=".$user_id;
	break;

	//delete language pair
	case "deletePair":
		$pair_id=$_GET['pair_id'];
		$user_id=$_GET['user_id'];
		$query = "DELETE FROM `LANGUAGE_PAIR` WHERE ID=".$pair_id;
		execQuery($query, $nomeDB);
		$query = "SELECT * FROM `LANGUAGE_PAIR` WHERE USER_ID=".$user_id;
	break;

	//aggiunge education al profilo dell'utente
	case "addEducation":
		$institute=$_GET['institute'];
		$field=$_GET['field'];
		$user_id=$_GET['user_id'];		
		$query="SELECT * FROM `EDUCATION` WHERE `INSTITUTE`='".$institute."' AND `FIELD`='".$field."' AND USER_ID=".$user_id;
		$result = execQuery($query, $nomeDB);
		if(mysql_num_rows($result)==0) {
			$query = "INSERT INTO `EDUCATION`(`ID`, `USER_ID`, `INSTITUTE`, `FIELD`) VALUES (NULL,".$user_id.",'".$institute."','".$field."')";
			execQuery($query, $nomeDB);
			$query = "SELECT * FROM `EDUCATION` WHERE USER_ID=".$user_id;
		} else {
			$json = json_encode(array("errCode"=>"406","errMsg"=>"Education already present!"));
		}
	break;

	//get Education
	case "getEducation":
		$user_id=$_GET['user_id'];
		$query = "SELECT * FROM `EDUCATION` WHERE USER_ID=".$user_id;
	break;

	//delete Education
	case "deleteEducation":
		$education_id=$_GET['education_id'];
		$user_id=$_GET['user_id'];
		$query = "DELETE FROM `EDUCATION` WHERE ID=".$education_id;
		execQuery($query, $nomeDB);
		$query = "SELECT * FROM `EDUCATION` WHERE USER_ID=".$user_id;
	break;

	//aggiunge certification al profilo dell'utente
	case "addCertification":
		$institute=$_GET['institute'];
		$date=$_GET['date'];
		$certification=$_GET['certification'];
		$level=$_GET['level'];
		$user_id=$_GET['user_id'];
		
		$query="SELECT * FROM `CERTIFICATION` WHERE `INSTITUTE`='".$institute."' AND `CERTIFICATION`='".$certification."' AND `LEVEL`='".$level."' AND USER_ID=".$user_id;
		$result = execQuery($query, $nomeDB);
		if(mysql_num_rows($result)==0) {
		$query = "INSERT INTO `CERTIFICATION`(`ID`, `USER_ID`, `INSTITUTE`, `DATE`, `CERTIFICATION`, `LEVEL`) VALUES (NULL,".$user_id.",'".$institute."','".$date."','".$certification."','".$level."')";
			execQuery($query, $nomeDB);
			$query = "SELECT * FROM `CERTIFICATION` WHERE USER_ID=".$user_id;
		} else {
			$json = json_encode(array("errCode"=>"406","errMsg"=>"Certification already present!"));
		}
	break;

	//get certification
	case "getCertification":
		$user_id=$_GET['user_id'];
		$query = "SELECT * FROM `CERTIFICATION` WHERE USER_ID=".$user_id;
	break;

	//delete certification
	case "deleteCertification":
		$certification_id=$_GET['certification_id'];
		$user_id=$_GET['user_id'];
		$query = "DELETE FROM `CERTIFICATION` WHERE ID=".$certification_id;
		execQuery($query, $nomeDB);
		$query = "SELECT * FROM `CERTIFICATION` WHERE USER_ID=".$user_id;
	break;

	//ottieni translation jobs in deadline
	case "getInDeadlineTranslationJobs":
		$user_id=$_GET['user_id'];
		$query = "SELECT * FROM JOBS_TRANSLATION WHERE
		IF(STATO = '".$GLOBALS["statiPrenotazione"]["DECLINED"]."' AND ID_TRADUTTORE !=".$user_id." , true, false) OR
		IF(STATO = '".$GLOBALS["statiPrenotazione"]["ENGAGMENT"]."' AND ID_TRADUTTORE= ".$user_id."  , true, false) OR
		IF(STATO = '".$GLOBALS["statiPrenotazione"]["COMPETITION"]."' AND ID_TRADUTTORE IS NULL , true, false) OR
		IF(STATO = '".$GLOBALS["statiPrenotazione"]["ACTIVE"]."' AND ID_TRADUTTORE =".$user_id." , true, false) OR
		IF(STATO = '".$GLOBALS["statiPrenotazione"]["REVIEW"]."' AND ID_TRADUTTORE =".$user_id." , true, false) OR
		IF(STATO = '".$GLOBALS["statiPrenotazione"]["IN APPROVAL"]."' AND ID_TRADUTTORE =".$user_id." , true, false)
		ORDER BY DATA_SCADENZA";
	break;

	//ottieni translation jobs done
	case "getDoneTranslationJobs":
		$user_id=$_GET['user_id'];
		$query = "SELECT * FROM JOBS_TRANSLATION WHERE STATO IN ('".$GLOBALS["statiPrenotazione"]["CLOSED"]."') AND ID_TRADUTTORE=".$user_id." ORDER BY DATA_SCADENZA";
	break;

	//ottieni correction jobs in deadline
	case "getInDeadlineCorrectionJobs":
		$user_id=$_GET['user_id'];
		$query = "SELECT * FROM JOBS_CORRECTION WHERE
		IF(STATO = '".$GLOBALS["statiPrenotazione"]["DECLINED"]."' AND ID_TRADUTTORE !=".$user_id." , true, false) OR
		IF(STATO = '".$GLOBALS["statiPrenotazione"]["ENGAGMENT"]."' AND ID_TRADUTTORE= ".$user_id."  , true, false) OR
		IF(STATO = '".$GLOBALS["statiPrenotazione"]["COMPETITION"]."' AND ID_TRADUTTORE IS NULL , true, false) OR
		IF(STATO = '".$GLOBALS["statiPrenotazione"]["ACTIVE"]."' AND ID_TRADUTTORE =".$user_id." , true, false) OR
		IF(STATO = '".$GLOBALS["statiPrenotazione"]["REVIEW"]."' AND ID_TRADUTTORE =".$user_id." , true, false) OR
		IF(STATO = '".$GLOBALS["statiPrenotazione"]["IN APPROVAL"]."' AND ID_TRADUTTORE =".$user_id." , true, false)
		ORDER BY DATA_SCADENZA";
	break;

	//ottieni correction jobs done
	case "getDoneCorrectionJobs":
		$user_id=$_GET['user_id'];
		$query = "SELECT * FROM JOBS_CORRECTION WHERE STATO IN ('".$GLOBALS["statiPrenotazione"]["CLOSED"]."') AND ID_TRADUTTORE=".$user_id." ORDER BY DATA_SCADENZA";
	break;
	
	//ottieni gli ultimi 3 commenti dell'agenzia
	case "getAgencyComments":
		$user_id=$_GET['user_id'];
		$query = "SELECT * FROM COMMENT WHERE ID_AGENZIA=".$user_id." ORDER BY DATA DESC LIMIT 3";
	break;
	
	//ottieni gli ultimi 3 commenti dell'agenzia
	case "getAllAgencyComments":
		$user_id=$_GET['user_id'];
		$query = "SELECT * FROM COMMENT WHERE ID_AGENZIA=".$user_id." ORDER BY DATA";
	break;

	//login utente
	case "login":
		$is_mod_utente=false;
		$user=$_GET['username'];
		$password=$_GET['password'];
		/*OPERATORE BINARY PERMETTE DI ESEGUIRE QUERY CASE SENSITIVE*/
		$query = "SELECT U.ID, U.USERNAME, U.PASSWORD, U.SALE, U.RUOLO, U.EMAIL, U.CITTA, U.PAESE, U.VAT FROM UTENTE U WHERE BINARY U.USERNAME='".$user."'";
	break;

	//aggiorna dati del profilo utente
	case "updateProfile":
		$is_mod_utente=true;
		//campi traduttore
		$nomeTraduttore=$_GET['nomeTraduttore'];
		$cognomeTraduttore=$_GET['cognomeTraduttore'];
		$birthdayTraduttore=$_GET['birthdayTraduttore'];
		$mothertongueTraduttore=$_GET['mothertongueTraduttore'];
		$vat=$_GET['vat'];
		
		//campi agenzia
		$nomeAgenzia=$_GET['nome'];
		$impiegatiAgenzia=$_GET['impiegati'];
		$indirizzoAgenzia=$_GET['indirizzo'];
		$codicePostale=$_GET['codicePostale'];
		$telefonoAgenzia=$_GET['telefono'];
		$webAgenzia=$_GET['web'];
		
		//campi comuni
		$citta=$_GET['citta'];
		$country=$_GET['country'];
		$ruolo=$_GET['ruolo'];
		$id=$_GET['id'];
		$email= $_GET['email'];

		$query1 = "UPDATE UTENTE SET CITTA='".$citta."', PAESE='".$country."', VAT='".$vat."', EMAIL='".$email."' WHERE ID=".$id;
		execQuery($query1, $nomeDB);
		if($ruolo=="TRADUTTORE") {
			$query="UPDATE TRADUTTORE SET NOME='".$nomeTraduttore."', COGNOME='".$cognomeTraduttore."', DATA_NASCITA='".$birthdayTraduttore."'
			, MADRELINGUA='".$mothertongueTraduttore."' WHERE ID=".$id;
		}else{
			//caso AGENZIA
			$query="UPDATE AGENZIA SET NOME='".$nomeAgenzia."', NUM_IMPIEGATI='".$impiegatiAgenzia."', 
			INDIRIZZO='".$indirizzoAgenzia."', CODICE_POSTALE='".$codicePostale."' 
			, PHONE='".$telefonoAgenzia."', SITO_WEB='".$webAgenzia."' WHERE ID=".$id;
		}
		execQuery($query, $nomeDB);
		$query = "SELECT U.ID, U.USERNAME, U.PASSWORD, U.SALE, U.RUOLO, U.EMAIL, U.CITTA, U.PAESE FROM UTENTE U WHERE U.ID=".$id;
		$azione="login"; //emulazione comportamento di login!!
	break;
	
	case "register":
		//modulo di registrazione
		$username=$_GET['username'];
		$email=$_GET['email'];
		$query = "SELECT U.ID FROM `UTENTE` U WHERE USERNAME = '".$username."' OR EMAIL='".$email."'";
	break;

	case "dettaglio_job":
		$id_job = $_GET['id_job'];
		$tipo_job = $_GET['tipo_job'];
		if($tipo_job=="translation") {
			$query="SELECT * FROM JOBS_TRANSLATION where ID=".$id_job;
		}
		else /*($tipo_job=="correction")*/ {
			$query="SELECT * FROM JOBS_CORRECTION where ID=".$id_job;
		}
	break;

	case "reportAbuse":
		$id_commento=$_GET['id'];
		sendCustomMail("reportAbuse@explico.com ", "luca.sapone86@gmail.com ", "Report abuse sul commento ".$id_commento, 
		"Ciao Luca, è stato inviato il report abuse per il commento <strong>".$id_commento."</strong>");
	break;
}//end switch azione

//il metodo execQuery si troverà su "mysql.inc.php"
if(!empty($query)) {
	$result = execQuery($query, $nomeDB);
	while($row = @mysql_fetch_array($result, MYSQL_ASSOC))
	{
		array_push($json, $row);
	}
}

if($azione=="login" && count($json)>0) {
	//controllo la password
	if(($json[0]["PASSWORD"] == md5($json[0]["SALE"].$password)) or $is_mod_utente) {
		unset($json[0]["PASSWORD"]);
		unset($json[0]["SALE"]);
		$jsonDettaglio = array();
		if($json[0]["RUOLO"] == "AGENZIA") {
			$query = "SELECT U.*, A.* FROM UTENTE U, AGENZIA A WHERE A.ID = ".$json[0]["ID"]." AND A.ID = U.ID";
			$result1 = execQuery($query, $nomeDB);
			while($row1 = @mysql_fetch_array($result1, MYSQL_ASSOC))
			{
				array_push($jsonDettaglio, $row1);
			}
		}else {
			//GESTIONE TRADUTTORE
			$query = "SELECT U.*, T.* FROM TRADUTTORE T, UTENTE U WHERE T.ID = ".$json[0]["ID"]." AND T.ID = U.ID";
			$result1 = execQuery($query, $nomeDB);
			while($row1 = @mysql_fetch_array($result1, MYSQL_ASSOC))
			{
				array_push($jsonDettaglio, $row1);
			}
		}
		//TODO : da decidere se lasciare sto cavolo di array di array come oggetto di ritorno!
		$json = array(0 => array_merge($json[0], $jsonDettaglio[0]));
	}else{
		$json = array();
	}
}
//CASO IN CUI L'AZIONE E' LA REGISTRAZIONE
else if($azione=="register") {
//SE LA SELECT DI PRIMA HA GIA' TORNATO RISULTATI, SIGNIFICA CHE ESISTE GIA' L'UTENTE
	if(count($json)>0) {
		$json = array("errCode"=>"406", "errMsg"=>"Username ".$username." already present.");
	}
	else {

		$username=$_GET['username'];
		$password=$_GET['password'];
		$sale=md5($password.$username.rand_string(10));
		$password=md5($sale.$password);
		$ruolo=$_GET['ruolo'];
		$email=$_GET['email'];
		$country=$_GET['country'];
		$city=$_GET['city'];
		$pictureUrl = $_GET['pictureUrl'];
		$social = $_GET['social'];
		
//campi traduttore
		$nome=$_GET['nome'];
		$cognome=$_GET['cognome'];
		$mothertongue=$_GET['mothertongue'];

//campi agenzia
		$employees=$_GET['employees'];
		$website=$_GET['website'];

		$query="INSERT INTO `UTENTE` (`ID`, `USERNAME`, `PASSWORD`, `SALE`, `RUOLO`, `EMAIL`, `CITTA`, `PAESE`, `IMAGE`, `PAYPAL`, `IBAN`) VALUES
		(NULL, '".$username."','".$password."', '".$sale."', '".$ruolo."', '".$email."', '".$city."', '".$country."', NULL, NULL, NULL)";
		$result = execQuery($query, $nomeDB);

		$query = "SELECT ID FROM `UTENTE` WHERE USERNAME = '".$username."'";
		$result = execQuery($query, $nomeDB);
		$row = @mysql_fetch_array($result, MYSQL_ASSOC);
		$uid = $row['ID'];
		
		//GESTIONE DELL'IMMAGINE DEL PROFILO LINKEDIN
		if(!empty($pictureUrl) && $social == 'LINKEDIN') {
			//VEDI UPLOAD.PHP
			uploadImageFromLinkedin($uid,$pictureUrl);
		} else if (!empty($pictureUrl) && $social == 'FACEBOOK') {
			//VEDI UPLOAD.PHP
			uploadImageFromFacebook($uid,$pictureUrl,$password);
		}

		if($ruolo=="TRADUTTORE") {

			$query = "INSERT INTO `TRADUTTORE` (`ID`, `NOME`, `COGNOME`, `MADRELINGUA`, `HAS_NEW_MESSAGE`) VALUES
			(".$uid.", '".$nome."',  '".$cognome."',  '".$mothertongue."', 'N')";
			$result = execQuery($query, $nomeDB);
		}
		else if($ruolo=="AGENZIA") {
//AGENZIA
			$query = "INSERT INTO `AGENZIA` (`ID`, `NOME`, `NUM_IMPIEGATI`, `SITO_WEB`) VALUES
			(".$uid.", '".$nome."',  '".$employees."',  '".$website."')";
			$result = execQuery($query, $nomeDB);
		}
		else {
//TODO se ci saranno altri ruoli
		}
		$json = array("Risultato"=>"OK");
	}
} else if($azione=="checkUsername") {
	if(count($json)>0) {
		$json = array("errCode"=>"408", "errMsg"=>"Username ".$username." already present");
	}
	else {
		$json = array("Risultato"=>"OK");
	}
}

// ----> NON TOCCARE MAI QUESTA PARTE, A MENO DI GESTIONE ERRORI!!!

if(count($json)>0) {
	$jsonstring = json_encode($json);
} else {
// GESTIONE ERRORI:
	if($azione=="login"){
		$jsonstring = json_encode(array("errCode"=>"405","errMsg"=>"Wrong Username/Password."));
	}else if(strpos($azione, 'ricerca') !== false){
		$jsonstring = json_encode($json);
	}else if($azione=="prenotazione"){
//$jsonstring = json_encode(array("Risultato"=>"OK"));
		$jsonstring = json_encode(array("errCode"=>"400","errMsg"=>"Slot già prenotato."));
//sendMail($id_ripe);
	}else if($azione=="annulla_ripetizione"){
//$jsonstring = json_encode(array("Risultato"=>"OK"));
		$jsonstring = json_encode(array("errCode"=>"401","errMsg"=>"Impossibile annullare la ripetizione. E' stata gia' confermata dal docente."));
//sendMail($id_ripe);
	}else if($azione=="contact" || $azione=="reportAbuse"){
//va sempre a buon fine l'invio della mail
		$jsonstring = array("Risultato"=>"OK");
	} else {
		$jsonstring = json_encode(array("errCode"=>"300","errMsg"=>"No data found."));
	}
}

if(strlen($callback)>0)
	echo $callback."(".$jsonstring.")";
else
	echo $jsonstring;

/*stampare la query echo "query: ".$query;*/
?>