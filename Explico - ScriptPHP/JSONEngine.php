<?php

//Includo il file che contiene le funzioni per la connessione MySQL
require_once("./mysql.inc.php");
require_once("./security.php");

//includo file per invio mail
require_once("./utility.inc.php");

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
	$query = "INSERT INTO `LANGUAGE_PAIR`(`ID`, `USER_ID`, `FROM`, `TO`, `FIELD`, `SERVICE`, `PRICE`, `CURRENCY`) VALUES (NULL,".$user_id.",'".$from."','".$to."','".$field."','".$service."','".$price."','".$currency."')";
	execQuery($query, $nomeDB);
	$query = "SELECT * FROM `LANGUAGE_PAIR` WHERE USER_ID=".$user_id;
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
	$query = "INSERT INTO `EDUCATION`(`ID`, `USER_ID`, `INSTITUTE`, `FIELD`) VALUES (NULL,".$user_id.",'".$institute."','".$field."')";
	execQuery($query, $nomeDB);
	$query = "SELECT * FROM `EDUCATION` WHERE USER_ID=".$user_id;
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
	$query = "INSERT INTO `CERTIFICATION`(`ID`, `USER_ID`, `INSTITUTE`, `DATE`, `CERTIFICATION`, `LEVEL`) VALUES (NULL,".$user_id.",'".$institute."','".$date."','".$certification."','".$level."')";
	execQuery($query, $nomeDB);
	$query = "SELECT * FROM `CERTIFICATION` WHERE USER_ID=".$user_id;
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


	/*****************************************************************/

//ottieni translation jobs in deadline
	case "getInDeadlineTranslationJobs":
	$user_id=$_GET['user_id'];
	$query = "SELECT * FROM JOBS_TRANSLATION WHERE
	IF(STATO = '".$GLOBALS["statiPrenotazione"]["DECLINED"]."' AND ID_TRADUTTORE !=".$user_id." , true, false) OR
	IF(STATO = '".$GLOBALS["statiPrenotazione"]["ENGAGMENT"]."' AND ID_TRADUTTORE= ".$user_id."  , true, false) OR
	IF(STATO = '".$GLOBALS["statiPrenotazione"]["COMPETITION"]."' AND ID_TRADUTTORE IS NULL , true, false) OR
	IF(STATO = '".$GLOBALS["statiPrenotazione"]["ACTIVE"]."' AND ID_TRADUTTORE =".$user_id." , true, false) OR
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

	//login utente
	case "login":
	$is_mod_utente=false;
	$user=$_GET['username'];
	$password=$_GET['password'];
	$query = "SELECT U.ID, U.USERNAME, U.PASSWORD, U.SALE, U.RUOLO, U.EMAIL, U.CITTA, U.PAESE, U.VAT FROM UTENTE U WHERE U.USERNAME='".$user."'";
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
/*case "ricerca_prof":
//listview: Ricerca per nome professore con slot DISPONIBILI (prenotabili)
$ordine_scuola=$_GET['ord_scuola'];
$filtro_citta=$_GET['citta_filtro'];
$query = "SELECT P.ID_PROFESSORE, U.NOME, U.COGNOME, U.DATA_NASCITA, U.CODICE_FISCALE, P.PROFESSIONE, P.INDIRIZZO_SCUOLA, P.INDIRIZZO_UFFICIO, U.INDIRIZZO_CASA, COUNT(*) AS RIPETIZIONI_DISPONIBILI FROM PROFESSORE P INNER JOIN UTENTE U ON (P.ID_PROFESSORE=U.ID_UTENTE), RIPETIZIONE R WHERE R.ID_PROFESSORE = P.ID_PROFESSORE AND R.STATO IN ('".$GLOBALS["statiPrenotazione"]["DISPONIBILE"]."','".$GLOBALS["statiPrenotazione"]["ANNULLATA"]."') AND ID_ORDINE_SCUOLA IN (".$ordine_scuola.") AND (R.LUOGO = '".$filtro_citta."' OR R.LUOGO IS NULL) AND R.DATA >= STR_TO_DATE(SYSDATE(),'%Y-%m-%d') GROUP BY P.ID_PROFESSORE HAVING (RIPETIZIONI_DISPONIBILI) > 0 ORDER BY U.COGNOME ASC";
break;
case "dettaglio_prof":
//DETTAGLIO: Ricerca professore con slot prenotabili
$id_user=$_GET['id_prof'];
$query = "SELECT U.ID_UTENTE, U.USERNAME, U.RUOLO, U.NOME, U.COGNOME, U.DATA_NASCITA, U.CODICE_FISCALE, P.PROFESSIONE, P.INDIRIZZO_SCUOLA, P.INDIRIZZO_UFFICIO, U.INDIRIZZO_CASA FROM UTENTE U LEFT JOIN PROFESSORE P ON (U.ID_UTENTE=P.ID_PROFESSORE) WHERE U.ID_UTENTE = ".$id_user." AND U.RUOLO='PROFESSORE'";
break;
case "dettaglio_ripetizione":
//DETTAGLIO: Ricerca ripetizione
$id_ripe=$_GET['id_ripe'];
$query = "SELECT R.*, U.NOME AS 'NOME_PROF', U.COGNOME AS 'COGNOME_PROF', M.NOME AS 'N_MAT',
M.DESCRIZIONE AS 'D_MAT', P.PROFESSIONE, ROUND( (U.RATING / U.NUM_RATING) , 1) AS RATING,
U.PATH_IMAGE AS PATH_IMAGE_PROFESSORE
FROM RIPETIZIONE R, UTENTE U, MATERIA M, PROFESSORE P
WHERE ID_RIPETIZIONE = ".$id_ripe." and U.ID_UTENTE = R.ID_PROFESSORE
AND P.ID_PROFESSORE=U.ID_UTENTE AND R.ID_MATERIA = M.ID_MATERIA";
break;
case "dettaglio_commenti":
//DETTAGLIO: Commenti
$id_docente=$_GET['id_docente'];
$query = "SELECT R.RATE, R.COMMENTO, R.DATA FROM UTENTE U,
RIPETIZIONE R WHERE U.ID_UTENTE='".$id_docente."' AND U.ID_UTENTE=R.ID_PROFESSORE
AND R.DATA < str_to_date (SYSDATE(), '%Y-%m-%d') AND R.ID_STUDENTE IS NOT NULL ";
break;
case "annulla_ripetizione":
//DETTAGLIO: annulla ripetizione
$id_ripe=$_GET['id_ripe'];
$motivo_annulla=$_GET['motivo'];
$query = "SELECT * FROM RIPETIZIONE WHERE STATO='".$GLOBALS["statiPrenotazione"]["PRENOTATA"]."' AND ID_RIPETIZIONE=".$id_ripe;
break;
case "ricerca_materia":
//listview: Ricerca per nome materia con professori che hanno slot DISPONIBILI (prenotabili)
$ordine_scuola=$_GET['ord_scuola'];
$filtro_citta=$_GET['citta_filtro'];
$query = "SELECT R.ID_MATERIA, M.DESCRIZIONE, COUNT(*) AS RIP_PER_MATERIA FROM RIPETIZIONE R, MATERIA M, PROFESSORE P INNER JOIN UTENTE U ON (P.ID_PROFESSORE=U.ID_UTENTE) WHERE R.STATO IN ('".$GLOBALS["statiPrenotazione"]["DISPONIBILE"]."','".$GLOBALS["statiPrenotazione"]["ANNULLATA"]."') AND R.ID_MATERIA = M.ID_MATERIA AND R.ID_PROFESSORE = P.ID_PROFESSORE AND R.ID_ORDINE_SCUOLA IN (".$ordine_scuola.") AND (R.LUOGO = '".$filtro_citta."' OR R.LUOGO IS NULL) AND R.DATA >= STR_TO_DATE(SYSDATE(),'%Y-%m-%d') GROUP BY ID_MATERIA HAVING (RIP_PER_MATERIA) > 0 ORDER BY M.DESCRIZIONE";
break;
case "ricerca_ripetizioni_prenotate":
//listview: bottone barra footer "le mie ripetizioni": ricerca tutti le ripetizioni di quell'utente (lato UTENTE non PROF)
$id_utente=$_GET['id_utente'];
$query = "SELECT R.ID_RIPETIZIONE, R.STATO, R.DATA, U.COGNOME AS COGN_PROF, U.NOME AS NOME_PROF,
R.LUOGO, DATE_FORMAT(R.ORA_INIZIO, '%k:%i') AS ORA_INIZIO, DATE_FORMAT(R.ORA_FINE, '%k:%i') AS ORA_FINE,
M.DESCRIZIONE AS MATERIA, (SELECT COUNT(*) FROM `RIPETIZIONE` R1 WHERE R1.DATA=R.DATA
AND R1.ID_STUDENTE = '".$id_utente."') AS RIP_PER_GG, ROUND( (U.RATING / U.NUM_RATING) , 1) AS RATING,
M.DESCRIZIONE AS MATERIA, R.COSTO, U.PATH_IMAGE AS PATH_IMAGE_PROFESSORE
FROM `RIPETIZIONE` R, MATERIA M, UTENTE U
WHERE ID_STUDENTE = '".$id_utente."' AND R.ID_MATERIA = M.ID_MATERIA AND R.ID_PROFESSORE=U.ID_UTENTE
AND R.DATA >= str_to_date (SYSDATE(), '%Y-%m-%d') ORDER BY R.DATA DESC";
break;
case "ricerca_ripetizioni_archiviate":
$id_utente=$_GET['id_utente'];
$query = "SELECT R.ID_RIPETIZIONE, R.STATO, R.DATA, R.RATE, U.COGNOME AS COGN_PROF,
U.NOME AS NOME_PROF, R.LUOGO, DATE_FORMAT(R.ORA_INIZIO, '%k:%i') AS ORA_INIZIO,
DATE_FORMAT(R.ORA_FINE, '%k:%i') AS ORA_FINE, M.DESCRIZIONE AS MATERIA,
(SELECT COUNT(*) FROM `RIPETIZIONE` R1 WHERE R1.DATA=R.DATA AND R1.ID_STUDENTE = '".$id_utente."') AS RIP_PER_GG,
ROUND( (U.RATING / U.NUM_RATING) , 1) AS RATING, M.DESCRIZIONE AS MATERIA,
R.COMMENTO, U.PATH_IMAGE AS PATH_IMAGE_PROFESSORE
FROM `RIPETIZIONE` R, MATERIA M, UTENTE U
WHERE ID_STUDENTE = '".$id_utente."' AND R.ID_MATERIA = M.ID_MATERIA AND R.ID_PROFESSORE=U.ID_UTENTE
AND R.DATA < str_to_date (SYSDATE(), '%Y-%m-%d') ORDER BY R.DATA DESC";
break;
case "vota":
$id_ripe=$_GET['id_ripe'];
$voto=$_GET['voto'];
$query = "UPDATE RIPETIZIONE R SET R.RATE='".$voto."' WHERE R.ID_RIPETIZIONE='".$id_ripe."'";
$result = execQuery($query, $nomeDB);

$query="SELECT ID_PROFESSORE FROM RIPETIZIONE R WHERE R.ID_RIPETIZIONE='".$id_ripe."'";
$result = execQuery($query, $nomeDB);
$riga = mysql_fetch_array($result, MYSQL_ASSOC);
$id_professore = $riga["ID_PROFESSORE"];
$query="UPDATE UTENTE SET NUM_RATING = NUM_RATING+1, RATING=RATING+'".$voto."' WHERE ID_UTENTE='".$id_professore."'";
break;
case "commenta":
$id_ripe=$_GET['id_ripe'];
$commento=addslashes($_GET['commento']);
$query = "UPDATE RIPETIZIONE R SET R.COMMENTO='".$commento."' WHERE R.ID_RIPETIZIONE='".$id_ripe."'";
break;
case "ricerca_quando":
//listview: Ricerca per data crescente tutti i professori che hanno slot DISPONIBILI (prenotabili)
$ordine_scuola=$_GET['ord_scuola'];
$filtro_citta=$_GET['citta_filtro'];
$query = "SELECT R.ID_RIPETIZIONE, R.DATA, R.ID_PROFESSORE AS ID_PROF, U.COGNOME AS COGN_PROF, U.NOME AS NOME_PROF, R.LUOGO, DATE_FORMAT(R.ORA_INIZIO, '%k:%i') AS ORA_INIZIO, DATE_FORMAT(R.ORA_FINE, '%k:%i') AS ORA_FINE, M.DESCRIZIONE AS MATERIA, (SELECT COUNT(*) FROM `RIPETIZIONE` R1 WHERE R1.DATA=R.DATA AND (R1.STATO='".$GLOBALS["statiPrenotazione"]["DISPONIBILE"]."' OR R1.STATO='".$GLOBALS["statiPrenotazione"]["ANNULLATA"]."') AND R1.ID_ORDINE_SCUOLA = ".$ordine_scuola." AND (R.LUOGO = '".$filtro_citta."' OR R.LUOGO IS NULL)) AS RIP_PER_GG FROM `RIPETIZIONE` R, MATERIA M, UTENTE U WHERE (R.STATO='".$GLOBALS["statiPrenotazione"]["DISPONIBILE"]."' OR R.STATO='".$GLOBALS["statiPrenotazione"]["ANNULLATA"]."') AND R.ID_MATERIA = M.ID_MATERIA AND R.ID_PROFESSORE=U.ID_UTENTE AND ID_ORDINE_SCUOLA = ".$ordine_scuola." AND (R.LUOGO = '".$filtro_citta."' OR R.LUOGO IS NULL) AND R.DATA >= STR_TO_DATE(SYSDATE(),'%Y-%m-%d') ORDER BY R.DATA DESC";
break;
case "ricerca_custom":
$ordine_scuola=$_GET['ord_scuola'];
$filtro_citta=$_GET['citta_filtro'];
$datada=$_GET['datada'];
$dataa=$_GET['dataa'];
$orada=$_GET['orada'];
$oraa=$_GET['oraa'];
$materia=$_GET['materia'];*/

/*AGGIUNGO ALLA QUERY SOLO SE SONO NON NULLI*/

/*
$sql_cond="";
if($_GET['datada']!="null") {
$sql_cond.=" AND r.DATA >= str_to_date ('".$datada."', '%Y-%m-%d')";
}
if($_GET['dataa']!="null") {
$sql_cond.=" AND r.DATA <= str_to_date ('".$dataa."', '%Y-%m-%d')";
}
if($_GET['orada']!="null") {
$sql_cond.=" AND r.ORA_INIZIO >= CONVERT('".$orada."',TIME)";
}
if($_GET['oraa']!="null") {
$sql_cond.=" AND r.ORA_INIZIO <= CONVERT ('".$oraa."',TIME)";
}
if($_GET['materia']!="null") {
$sql_cond.=" AND r.ID_MATERIA = '".$materia."'";
}

$query = "SELECT r.id_ripetizione AS ID_RIPETIZIONE, r.DATA, r.id_professore AS id_prof,
u.cognome AS COGN_PROF, u.nome AS NOME_PROF, r.LUOGO,
DATE_FORMAT (r.ora_inizio, '%k:%i') AS ORA_INIZIO,
DATE_FORMAT (r.ora_fine, '%k:%i') AS ORA_FINE,
m.descrizione AS MATERIA, ROUND( (u.RATING / u.NUM_RATING) , 1) AS RATING,
r.COSTO, u.PATH_IMAGE AS PATH_IMAGE_PROFESSORE
FROM RIPETIZIONE r, MATERIA m, UTENTE u
WHERE (   r.stato = '".$GLOBALS["statiPrenotazione"]["DISPONIBILE"]."'
OR r.stato = '".$GLOBALS["statiPrenotazione"]["ANNULLATA"]."')
AND r.id_materia = m.id_materia
AND r.id_professore = u.id_utente
AND id_ordine_scuola = ".$ordine_scuola."
AND (r.luogo = '".$filtro_citta."' OR r.luogo IS NULL)
AND r.DATA >= str_to_date (SYSDATE(), '%Y-%m-%d')
".$sql_cond."
ORDER BY r.DATA DESC";

break;*/
}//end switch azione

//il metodo execQuery si troverà su "mysql.inc.php" e VIENE ESEGUITO SEMPRE ALMENO UNA VOLTA
if(!empty($query)) {
	$result = execQuery($query, $nomeDB);

	while($row = @mysql_fetch_array($result, MYSQL_ASSOC))
	{
		array_push($json, $row);
	}
}

//Query particolari, spezzate in più fasi
/*if($azione=="prenotazione" && count($json)>0){

//eseguo la prenotazione, se lo slot risulta ancora libero (count($json)>0)
$query = "UPDATE RIPETIZIONE SET STATO='".$GLOBALS["statiPrenotazione"]["PRENOTATA"]."', ID_STUDENTE=".$user_id." WHERE ID_RIPETIZIONE=".$id_ripe;
execQuery($query, $nomeDB);
//invio la mail al prof, per conferma slot ripetizione
sendMail($id_ripe);
//metto dentro il json la risposta corretta!
$json = array("Risultato"=>"OK");
}
if($azione=="annulla_ripetizione" && count($json)>0){

//e' possibile annullare una ripetizione solo se il professore non ha provveduto nel frattempo a confermarla
$query = "UPDATE RIPETIZIONE SET STATO='".$GLOBALS["statiPrenotazione"]["ANNULLATA"]."', NOTE='".$motivo_annulla."', ID_STUDENTE=NULL WHERE ID_RIPETIZIONE=".$id_ripe;
execQuery($query, $nomeDB);
//invio la mail al prof, per conferma slot ripetizione
//sendMail($id_ripe);
//metto dentro il json la risposta corretta!
$json = array("Risultato"=>"OK");

}
else if($azione=="dettaglio_prof"){
//3 FASI :
//1) ANAGRAFIA PROFESSORE
//metto dentro a prof l'elenco dei record estratti con query precedente
$prof = $json;
//-----------------------------------
$jsonMaterie = array();
$id_utente=$_GET['id_prof'];
$ordine_scuola=$_GET['ord_scuola'];
$filtro_citta=$_GET['citta_filtro'];

//2) MATERIE INSEGNATE DALL'UTENTE SPECIFICO PER ORDINE DI SCUOLA E PER CITTA'
$query1 = "SELECT M.ID_MATERIA, M.DESCRIZIONE, M.NOME, PF.COSTO_ORARIO FROM PROF_SCUOLA PS LEFT JOIN `PROF_MATERIA` PF ON (PS.ID_PROFESSORE=PF.ID_PROFESSORE), MATERIA M WHERE PS.ID_PROFESSORE = ".$id_utente." AND PS.ID_ORDINE_SCUOLA = ".$ordine_scuola." AND PF.ID_MATERIA= M.ID_MATERIA ORDER BY M.DESCRIZIONE";
$result = execQuery($query1, $nomeDB);

while($row = @mysql_fetch_array($result, MYSQL_ASSOC))
{
	$jsonSlots = array();
	$query2 = "SELECT ID_RIPETIZIONE, DATA, DATE_FORMAT( R.ORA_INIZIO,  '%k:%i' ) AS ORA_INIZIO, DATE_FORMAT( R.ORA_FINE,  '%k:%i' ) AS ORA_FINE, LUOGO FROM RIPETIZIONE R WHERE R.ID_PROFESSORE = ".$id_utente." AND R.ID_MATERIA = ".$row['ID_MATERIA']." AND R.STATO IN ('".$GLOBALS["statiPrenotazione"]["DISPONIBILE"]."','".$GLOBALS["statiPrenotazione"]["ANNULLATA"]."') AND (R.LUOGO = '".$filtro_citta."' OR R.LUOGO IS NULL) AND ID_ORDINE_SCUOLA = ".$ordine_scuola."";
	$result1 = execQuery($query2, $nomeDB);
	//3) RICERCA SLOT RIPETIZIONE DISPONIBILI PER OGNI MATERIA INSEGNATA
	while($row1 = @mysql_fetch_array($result1, MYSQL_ASSOC))
	{
	array_push($jsonSlots, $row1);
}

$row = array( $row['NOME'] => $row,
"slots" => $jsonSlots);
array_push($jsonMaterie, $row);
}
$json = array("professore" => $prof, "materie_insegnate" => $jsonMaterie);
}
else if($azione=="dettaglio_materia"){

$jsonProfessori = array();
//$id_materia=$_GET['id_materia'];
$ordine_scuola=$_GET['ord_scuola'];
$filtro_citta=$_GET['citta_filtro'];

//1) RECUPERO I PROFESSORI CHE INSEGNANO TALE MATERIA
$query1 = "SELECT U.ID_UTENTE, U.USERNAME, U.RUOLO, U.NOME, U.COGNOME, U.DATA_NASCITA, U.CODICE_FISCALE, P.PROFESSIONE, P.INDIRIZZO_SCUOLA, P.INDIRIZZO_UFFICIO, U.INDIRIZZO_CASA, U.CITTA , COUNT(*) AS CONT FROM PROF_MATERIA PM, UTENTE U LEFT JOIN PROFESSORE P ON (U.ID_UTENTE=P.ID_PROFESSORE) WHERE P.ID_PROFESSORE = PM.ID_PROFESSORE AND PM.ID_MATERIA=".$id_materia." AND U.RUOLO='PROFESSORE' GROUP BY U.ID_UTENTE HAVING CONT > 0 ORDER BY U.COGNOME, U.NOME";
$result = execQuery($query1, $nomeDB);

while($row = @mysql_fetch_array($result, MYSQL_ASSOC))
{
	$jsonSlots = array();
	$query2 = "SELECT ID_RIPETIZIONE, DATA, DATE_FORMAT( R.ORA_INIZIO,  '%k:%i' ) AS ORA_INIZIO, DATE_FORMAT( R.ORA_FINE,  '%k:%i' ) AS ORA_FINE, LUOGO, COUNT(*) AS RIP_PER_DOCENTE FROM RIPETIZIONE R WHERE R.ID_PROFESSORE = ".$row['ID_UTENTE']." AND R.ID_MATERIA = ".$id_materia." AND R.STATO IN ('".$GLOBALS["statiPrenotazione"]["DISPONIBILE"]."','".$GLOBALS["statiPrenotazione"]["ANNULLATA"]."') AND (R.LUOGO = '".$filtro_citta."' OR R.LUOGO IS NULL) AND R.ID_ORDINE_SCUOLA IN (".$ordine_scuola.") AND R.DATA >= STR_TO_DATE(SYSDATE(),'%Y-%m-%d') GROUP BY ID_RIPETIZIONE HAVING (RIP_PER_DOCENTE) > 0";
	$result1 = execQuery($query2, $nomeDB);
	//3) RICERCA SLOT RIPETIZIONE DISPONIBILI PER OGNI MATERIA INSEGNATA
	while($row1 = @mysql_fetch_array($result1, MYSQL_ASSOC))
	{
	array_push($jsonSlots, $row1);
}

$row = array($row['ID_UTENTE'] => $row, "slots" => $jsonSlots);
array_push($jsonProfessori, $row);
}
$json = array( "materie_insegnate" => $jsonProfessori);
}*/

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
		$json = array("errCode"=>"406", "errMsg"=>"Username ".$username." presente.");
	}
	else {

		$username=$_GET['username'];
		$password=$_GET['password'];
		$sale=md5($password.$username.rand_string(10));
		$password=md5($sale.$password);
		$ruolo=$_GET['ruolo'];
		$email=$_GET['email'];
		$country=$_GET['country'];

//campi traduttore
		$nome=$_GET['nome'];
		$cognome=$_GET['cognome'];
		$mothertongue=$_GET['mothertongue'];

//campi agenzia
		$employees=$_GET['employees'];
		$website=$_GET['website'];

		$query="INSERT INTO `UTENTE` (`ID`, `USERNAME`, `PASSWORD`, `SALE`, `RUOLO`, `EMAIL`, `CITTA`, `PAESE`, `PAYPAL`, `IBAN`) VALUES
		(NULL, '".$username."','".$password."', '".$sale."', '".$ruolo."', '".$email."', NULL, '".$country."' , NULL, NULL)";
		$result = execQuery($query, $nomeDB);

		$query = "SELECT ID FROM `UTENTE` WHERE USERNAME = '".$username."'";
		$result = execQuery($query, $nomeDB);
		$row = @mysql_fetch_array($result, MYSQL_ASSOC);
		$uid = $row['ID'];

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
