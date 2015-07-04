<?php

header('Access-Control-Allow-Origin: *');  
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');

//Includo il file che contiene le funzioni per la connessione 
require_once("./mysql.inc.php");
require_once("./security.php");

//includo file per invio mail
require_once("./utility.inc.php");
require_once("./upload.php");

$json = array();
//leggo l'azione passata in "GET" da eseguire per settare bene la query
$azione = mysql_escape_mimic($_GET['action']);
$callback = $_GET['callback'];

switch ($azione) {

	//helper codeTable
	case "get_codetable":
		$codetable=mysql_escape_mimic($_GET['codetable']);
		$query = "SELECT ID_ITEM,DESCRIZIONE FROM CODETABLE WHERE ID_CODETABLE='".$codetable."'";
	break;

	case "getUserData":
		$user_id = mysql_escape_mimic($_GET['user_id']);
		$query = "SELECT U.ID, U.RUOLO, U.EMAIL, U.CITTA, U.PAESE, U.VAT FROM UTENTE U WHERE U.ID=".$user_id;
		$result = execQuery($query);
		while($row1 = @mysql_fetch_array($result, MYSQL_ASSOC)) {
			array_push($json, $row1);
		}
		if($json[0]["RUOLO"] == "AGENZIA") {
			$query = "SELECT U.ID, U.RUOLO, U.CITTA, U.PAESE, U.VAT, U.RATING, U.NUM_RATING, A.* FROM UTENTE U, AGENZIA A WHERE A.ID = ".$json[0]["ID"]." AND A.ID = U.ID";
			$result1 = execQuery($query);
			while($row1 = @mysql_fetch_array($result1, MYSQL_ASSOC))
			{
				array_push($jsonDettaglio, $row1);
			}
		}else {
			//GESTIONE TRADUTTORE
			$query = "SELECT U.ID, U.RUOLO, U.EMAIL, U.CITTA, U.PAESE, U.VAT,  U.RATING, U.NUM_RATING, T.* FROM TRADUTTORE T, UTENTE U WHERE T.ID = ".$json[0]["ID"]." AND T.ID = U.ID";
			$result1 = execQuery($query);
			while($row1 = @mysql_fetch_array($result1, MYSQL_ASSOC))
			{
				array_push($jsonDettaglio, $row1);
			}
		}
		//TODO : da decidere se lasciare sto cavolo di array di array come oggetto di ritorno!
		$json = array(0 => array_merge($json[0], $jsonDettaglio[0]));

	break;
	
	case "search":
		$sql="";
		$mothertongueSearchFrom=mysql_escape_mimic($_GET['mothertongueSearchFrom']);
		$mothertongueSearchTo=mysql_escape_mimic($_GET['mothertongueSearchTo']);
		$service=mysql_escape_mimic($_GET['service']);
		$user_id=mysql_escape_mimic($_GET['user_id']);
		$field=mysql_escape_mimic($_GET['field']);
		if(isset($field)) $sql.= " AND FIELD='".$field."'";
		$pricefrom=$_GET['pricefrom'];
		if(isset($pricefrom)) $sql.= " AND PRICE>=".$pricefrom;
		$priceto=$_GET['priceto'];
		if(isset($priceto)) $sql.= " AND PRICE<=".$priceto;

		$query = "SELECT UT.ID, T.NOME, T.COGNOME, T.DATA_NASCITA, UT.PAESE, T.MADRELINGUA, UT.RATING, UT.NUM_RATING, LP.FROM, LP.TO, LP.PRICE, LP.CURRENCY, INNER_CERT.NUM_CERTIFICATIONS, IF(INNER_COMMENTS.NUM_COMMENTI IS NULL, '0', INNER_COMMENTS.NUM_COMMENTI) AS NUM_COMMENTI, LANGUAGES.NUM_LANGUAGES, IF(INNER_JC.NUM_CORRECTIONS IS NULL,0,INNER_JC.NUM_CORRECTIONS) + IF(INNER_JT.NUM_TRANSLATIONS IS NULL,0,INNER_JT.NUM_TRANSLATIONS) AS TOT_CORR_TRAD

		FROM UTENTE AS UT LEFT JOIN COMMENT AS C ON UT.ID=C.ID_TRADUTTORE LEFT JOIN LANGUAGE_PAIR AS LP ON UT.ID=LP.USER_ID 

			LEFT JOIN (SELECT U.ID, GROUP_CONCAT(DISTINCT CERTIFICATION) AS NUM_CERTIFICATIONS FROM CERTIFICATION, UTENTE U WHERE U.ID = CERTIFICATION.USER_ID  GROUP BY U.ID) AS INNER_CERT ON INNER_CERT.ID = UT.ID 

			LEFT JOIN (SELECT U.ID, COUNT(*) AS NUM_COMMENTI FROM COMMENT, UTENTE U WHERE U.ID = COMMENT.ID_TRADUTTORE  GROUP BY U.ID) AS INNER_COMMENTS ON INNER_COMMENTS.ID = UT.ID

			LEFT JOIN (SELECT U.ID, CONCAT(GROUP_CONCAT(DISTINCT LP.FROM),', ', GROUP_CONCAT(DISTINCT LP.TO)) AS NUM_LANGUAGES FROM LANGUAGE_PAIR AS LP, UTENTE U WHERE U.ID = LP.USER_ID GROUP BY U.ID) AS LANGUAGES ON LANGUAGES.ID = UT.ID, TRADUTTORE T
        
			LEFT JOIN (SELECT U.ID, COUNT(*) AS NUM_CORRECTIONS FROM JOBS_CORRECTION JC, UTENTE U WHERE U.ID=JC.ID_TRADUTTORE AND ID_AGENZIA=".$user_id." AND STATO NOT IN('COMPETITION','ENGAGMENT') GROUP BY U.ID) AS INNER_JC ON INNER_JC.ID=T.ID
        
			LEFT JOIN (SELECT U.ID, COUNT(*) AS NUM_TRANSLATIONS FROM JOBS_TRANSLATION JT, UTENTE U WHERE U.ID=JT.ID_TRADUTTORE AND ID_AGENZIA=".$user_id." AND STATO NOT IN('COMPETITION','ENGAGMENT') GROUP BY U.ID) AS INNER_JT ON INNER_JT.ID=T.ID  
                  		
		WHERE T.ID=UT.ID AND LP.FROM='".$mothertongueSearchFrom."' AND LP.TO='".$mothertongueSearchTo."' AND LP.SERVICE='".$service."'".$sql." GROUP BY UT.ID, LP.FROM, LP.TO ORDER BY LP.PRICE DESC";
	break;
	
	case "getImagePath":
		$user_id=mysql_escape_mimic($_GET['user_id']);
		$query = "SELECT IMAGE FROM UTENTE WHERE ID=".$user_id;
		$result = execQuery($query);
		while($row1 = @mysql_fetch_array($result, MYSQL_ASSOC)) {
			array_push($json, $row1);
		}
	break;

	case "getBlogArticle":
		$query = "SELECT * FROM BLOG_ARTICLE ORDER BY DATA_CREAZIONE DESC LIMIT 6";
	break;

	case "getAllBlogArticle":
		$query = "SELECT * FROM BLOG_ARTICLE ORDER BY DATA_CREAZIONE DESC";
	break;

	//invio email con subject e text
	case "contact":
		$email=mysql_escape_mimic($_GET['email']);
		$subject=mysql_escape_mimic($_GET['subject']);
		$text=mysql_escape_mimic($_GET['text']);
		sendCustomMail($email,"luca.sapone86@gmail.com ",$subject, "Questo messaggio è stato inviato da ".$email."</p><p>".$text."</p>");

	break;
	
	//checkUsername
	case "checkUsername":
		$username=mysql_escape_mimic($_GET['username']);
		$query="SELECT * FROM UTENTE WHERE BINARY USERNAME='".$username."'";
	break;

	//aggiorna lo status della traduzione
	case "update_job_status":
		$id_job = mysql_escape_mimic($_GET['id_job']);
		$tipo_job = mysql_escape_mimic($_GET['tipo_job']);
		$status_job = mysql_escape_mimic($_GET['status']);
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
		$id_job = mysql_escape_mimic($_GET['id_job']);
		$tipo_job = mysql_escape_mimic($_GET['tipo_job']);
		$user_id = mysql_escape_mimic($_GET['user_id']);
		if($tipo_job=="translation") {
			$query="UPDATE JOBS_TRANSLATION set ID_TRADUTTORE='".$user_id."' WHERE ID=".$id_job;
		}
		else /*($tipo_job=="correction")*/ {
			$query="UPDATE JOBS_CORRECTION set ID_TRADUTTORE='".$user_id."' WHERE ID=".$id_job;
		}
	break;

	//quando il traduttore accetta il lavoro, bisogna settare ID_TRADUTTORE
	case "doDecline":
		$id_job = mysql_escape_mimic($_GET['id_job']);
		$tipo_job = mysql_escape_mimic($_GET['tipo_job']);
		$user_id = mysql_escape_mimic($_GET['user_id']);
		$jsonData = array();
		$jsonData2 = array();
		if($tipo_job=="translation") {

			//recupero la mail dell'agenzia a cui inviare la mail
			$query="SELECT EMAIL FROM UTENTE U, JOBS_TRANSLATION J WHERE J.ID=".$id_job." AND J.ID_AGENZIA=U.ID";
			$result = execQuery($query);
			while($row1 = @mysql_fetch_array($result, MYSQL_ASSOC))
			{
				array_push($jsonData, $row1);
			}
			//recupero lo username dell'utente che ha rifiutato il job
			$query="SELECT USERNAME FROM UTENTE U, JOBS_TRANSLATION J WHERE J.ID=".$id_job." AND J.ID_TRADUTTORE=U.ID";
			$result = execQuery($query);
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
			$result = execQuery($query);
			while($row1 = @mysql_fetch_array($result, MYSQL_ASSOC))
			{
				array_push($jsonData, $row1);
			}

			//recupero lo username dell'utente che ha rifiutato il job
			$query="SELECT USERNAME FROM UTENTE U, JOBS_CORRECTION J WHERE J.ID=".$id_job." AND J.ID_TRADUTTORE=U.ID";
			$result = execQuery($query);
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
		$id_job = mysql_escape_mimic($_GET['id_job']);
		$tipo_job = mysql_escape_mimic($_GET['tipo_job']);
		$id_agenzia = mysql_escape_mimic($_GET['id_agenzia']);
		$jsonData = array();

		//recupero la mail dell'agenzia a cui inviare la mail
		$query="SELECT EMAIL FROM UTENTE WHERE ID=".$id_agenzia;
		$result = execQuery($query);
		while($row1 = @mysql_fetch_array($result, MYSQL_ASSOC))
		{
			array_push($jsonData, $row1);
		}

		sendCustomMail("info@explico.com ",$jsonData[0]["EMAIL"], "Notifica invio lavoro da parte del traduttore", "La traduzione relativa al
		lavoro ".$id_job." relativa ad una ".$tipo_job." è stato terminato.<br/> Di seguito trovi il link per scaricare il tuo lavoro.<br><br/>http://www.google.it<br/><br/> Lo staff di Explico");
	break;

	case "save_job":
		$id_job=mysql_escape_mimic($_GET['id_job']);
		$text=mysql_escape_mimic($_GET['text']);
		$tipo_job=mysql_escape_mimic($_GET['tipo_job']);
		if($tipo_job=="translation") {
			$query="UPDATE JOBS_TRANSLATION SET TEXT_DONE='".$text."' WHERE ID=".$id_job;

		} 	else /*($tipo_job=="correction")*/ {
			$query="UPDATE JOBS_CORRECTION SET TEXT_DONE='".$text."'";
		}
	break;

	//aggiunge lingue al profilo dell'utente
	case "addPair":
		$from=mysql_escape_mimic($_GET['from']);
		$to=mysql_escape_mimic($_GET['to']);
		$field=mysql_escape_mimic($_GET['field']);
		$service=mysql_escape_mimic($_GET['service']);
		$price=mysql_escape_mimic($_GET['price']);
		$currency=mysql_escape_mimic($_GET['currency']);
		$user_id=mysql_escape_mimic($_GET['user_id']);
		$query="SELECT * FROM `LANGUAGE_PAIR` WHERE `FROM`='".$from."' AND `TO`='".$to."' AND SERVICE='".$service."' AND FIELD='".$field."' AND USER_ID=".$user_id;
		$result = execQuery($query);
		if(mysql_num_rows($result)==0) {
			$query = "INSERT INTO `LANGUAGE_PAIR`(`ID`, `USER_ID`, `FROM`, `TO`, `FIELD`, `SERVICE`, `PRICE`, `CURRENCY`) VALUES (NULL,".$user_id.",'".$from."','".$to."','".$field."','".$service."','".$price."','".$currency."')";
			execQuery($query);
			$query = "SELECT * FROM `LANGUAGE_PAIR` WHERE USER_ID=".$user_id;
		} else {
			$json = json_encode(array("errCode"=>"406","errMsg"=>"Pair already present!"));
		}
	break;

	//get language pair
	case "getPair":
		$user_id=mysql_escape_mimic($_GET['user_id']);
		$query = "SELECT * FROM `LANGUAGE_PAIR` WHERE USER_ID=".$user_id;
	break;

	//delete language pair
	case "deletePair":
		$pair_id=mysql_escape_mimic($_GET['pair_id']);
		$user_id=mysql_escape_mimic($_GET['user_id']);
		$query = "DELETE FROM `LANGUAGE_PAIR` WHERE ID=".$pair_id;
		execQuery($query);
		$query = "SELECT * FROM `LANGUAGE_PAIR` WHERE USER_ID=".$user_id;
	break;

	//aggiunge education al profilo dell'utente
	case "addEducation":
		$institute=mysql_escape_mimic($_GET['institute']);
		$field=mysql_escape_mimic($_GET['field']);
		$user_id=mysql_escape_mimic($_GET['user_id']);		
		$query="SELECT * FROM `EDUCATION` WHERE `INSTITUTE`='".$institute."' AND `FIELD`='".$field."' AND USER_ID=".$user_id;
		$result = execQuery($query);
		if(mysql_num_rows($result)==0) {
			$query = "INSERT INTO `EDUCATION`(`ID`, `USER_ID`, `INSTITUTE`, `FIELD`) VALUES (NULL,".$user_id.",'".$institute."','".$field."')";
			execQuery($query);
			$query = "SELECT * FROM `EDUCATION` WHERE USER_ID=".$user_id;
		} else {
			$json = json_encode(array("errCode"=>"406","errMsg"=>"Education already present!"));
		}
	break;

	//get Education
	case "getEducation":
		$user_id=mysql_escape_mimic($_GET['user_id']);
		$query = "SELECT * FROM `EDUCATION` WHERE USER_ID=".$user_id;
	break;

	//delete Education
	case "deleteEducation":
		$education_id=$_GET['education_id'];
		$user_id=mysql_escape_mimic($_GET['user_id']);
		$query = "DELETE FROM `EDUCATION` WHERE ID=".$education_id;
		execQuery($query);
		$query = "SELECT * FROM `EDUCATION` WHERE USER_ID=".$user_id;
	break;

	//aggiunge certification al profilo dell'utente
	case "addCertification":
		$institute=mysql_escape_mimic($_GET['institute']);
		$date=mysql_escape_mimic($_GET['date']);
		$certification=mysql_escape_mimic($_GET['certification']);
		$level=mysql_escape_mimic($_GET['level']);
		$user_id=mysql_escape_mimic($_GET['user_id']);
		
		$query="SELECT * FROM `CERTIFICATION` WHERE `INSTITUTE`='".$institute."' AND `CERTIFICATION`='".$certification."' AND `LEVEL`='".$level."' AND USER_ID=".$user_id;
		$result = execQuery($query);
		if(mysql_num_rows($result)==0) {
		$query = "INSERT INTO `CERTIFICATION`(`ID`, `USER_ID`, `INSTITUTE`, `DATE`, `CERTIFICATION`, `LEVEL`) VALUES (NULL,".$user_id.",'".$institute."','".$date."','".$certification."','".$level."')";
			execQuery($query);
			$query = "SELECT * FROM `CERTIFICATION` WHERE USER_ID=".$user_id;
		} else {
			$json = json_encode(array("errCode"=>"406","errMsg"=>"Certification already present!"));
		}
	break;

	//get certification
	case "getCertification":
		$user_id=mysql_escape_mimic($_GET['user_id']);
		$query = "SELECT * FROM `CERTIFICATION` WHERE USER_ID=".$user_id;
	break;

	//delete certification
	case "deleteCertification":
		$certification_id=mysql_escape_mimic($_GET['certification_id']);
		$user_id=mysql_escape_mimic($_GET['user_id']);
		$query = "DELETE FROM `CERTIFICATION` WHERE ID=".$certification_id;
		execQuery($query);
		$query = "SELECT * FROM `CERTIFICATION` WHERE USER_ID=".$user_id;
	break;

	//ottieni translation jobs in deadline
	case "getInDeadlineTranslationJobs":
		$user_id=mysql_escape_mimic($_GET['user_id']);
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
		$user_id=mysql_escape_mimic($_GET['user_id']);
		$query = "SELECT * FROM JOBS_TRANSLATION WHERE STATO IN ('".$GLOBALS["statiPrenotazione"]["CLOSED"]."') AND ID_TRADUTTORE=".$user_id." ORDER BY DATA_SCADENZA";
	break;

	//ottieni correction jobs in deadline
	case "getInDeadlineCorrectionJobs":
		$user_id=mysql_escape_mimic($_GET['user_id']);
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
		$user_id=mysql_escape_mimic($_GET['user_id']);
		$query = "SELECT * FROM JOBS_CORRECTION WHERE STATO IN ('".$GLOBALS["statiPrenotazione"]["CLOSED"]."') AND ID_TRADUTTORE=".$user_id." ORDER BY DATA_SCADENZA";
	break;
	
	//ottieni gli ultimi 3 commenti dell'agenzia
	case "getAgencyComments":
		$user_id=mysql_escape_mimic($_GET['user_id']);
		$query = "SELECT * FROM COMMENT WHERE ID_AGENZIA=".$user_id." ORDER BY DATA DESC LIMIT 3";
	break;
	
	//ottieni tutti i commenti dell'agenzia
	case "getAllAgencyComments":
		$user_id=mysql_escape_mimic($_GET['user_id']);
		$query = "SELECT * FROM COMMENT WHERE ID_AGENZIA=".$user_id." ORDER BY DATA";
	break;
	
	//ottieni gli ultimi 3 commenti del traduttore
	case "getAllTranslatorComments":
		$user_id=mysql_escape_mimic($_GET['user_id']);
		$query = "SELECT * FROM COMMENT WHERE ID_TRADUTTORE=".$user_id." ORDER BY DATA";
	break;

	//login utente
	case "login":
		$is_mod_utente=false;
		$user=mysql_escape_mimic($_GET['username']);
		$password=mysql_escape_mimic($_GET['password']);
		/*OPERATORE BINARY PERMETTE DI ESEGUIRE QUERY CASE SENSITIVE*/
		$query = "SELECT U.ID, U.USERNAME, U.PASSWORD, U.SALE, U.RUOLO, U.EMAIL, U.CITTA, U.PAESE, U.VAT FROM UTENTE U WHERE BINARY U.USERNAME='".$user."'";
	break;

	//aggiorna dati del profilo utente
	case "updateProfile":
		$is_mod_utente=true;
		//campi traduttore
		$nomeTraduttore=mysql_escape_mimic($_GET['nomeTraduttore']);
		$cognomeTraduttore=mysql_escape_mimic($_GET['cognomeTraduttore']);
		$birthdayTraduttore=mysql_escape_mimic($_GET['birthdayTraduttore']);
		$mothertongueTraduttore=mysql_escape_mimic($_GET['mothertongueTraduttore']);
		$vat=mysql_escape_mimic($_GET['vat']);
		
		//campi agenzia
		$nomeAgenzia=mysql_escape_mimic($_GET['nome']);
		$impiegatiAgenzia=mysql_escape_mimic($_GET['impiegati']);
		$indirizzoAgenzia=mysql_escape_mimic($_GET['indirizzo']);
		$codicePostale=mysql_escape_mimic($_GET['codicePostale']);
		$telefonoAgenzia=mysql_escape_mimic($_GET['telefono']);
		$webAgenzia=mysql_escape_mimic($_GET['web']);
		
		//campi comuni
		$citta=mysql_escape_mimic($_GET['citta']);
		$country=mysql_escape_mimic($_GET['country']);
		$ruolo=mysql_escape_mimic($_GET['ruolo']);
		$id=mysql_escape_mimic($_GET['id']);
		$email= mysql_escape_mimic($_GET['email']);

		$query1 = "UPDATE UTENTE SET CITTA='".$citta."', PAESE='".$country."', VAT='".$vat."', EMAIL='".$email."' WHERE ID=".$id;
		execQuery($query1);
		if($ruolo=="TRADUTTORE") {
			$query="UPDATE TRADUTTORE SET NOME='".$nomeTraduttore."', COGNOME='".$cognomeTraduttore."', DATA_NASCITA='".$birthdayTraduttore."'
			, MADRELINGUA='".$mothertongueTraduttore."' WHERE ID=".$id;
		}else{
			//caso AGENZIA
			$query="UPDATE AGENZIA SET NOME='".$nomeAgenzia."', NUM_IMPIEGATI='".$impiegatiAgenzia."', 
			INDIRIZZO='".$indirizzoAgenzia."', CODICE_POSTALE='".$codicePostale."' 
			, PHONE='".$telefonoAgenzia."', SITO_WEB='".$webAgenzia."' WHERE ID=".$id;
		}
		execQuery($query);
		$query = "SELECT U.ID, U.USERNAME, U.PASSWORD, U.SALE, U.RUOLO, U.EMAIL, U.CITTA, U.PAESE FROM UTENTE U WHERE U.ID=".$id;
		$azione="login"; //emulazione comportamento di login!!
	break;
	
	case "register":
		//modulo di registrazione
		$username=mysql_escape_mimic($_GET['username']);
		$email=mysql_escape_mimic($_GET['email']);
		$query = "SELECT U.ID FROM `UTENTE` U WHERE USERNAME='".$username."'";
	break;

	case "registerTemp":
		//modulo di registrazione
		$email=mysql_escape_mimic($_GET['email']);
		$query = "SELECT U.ID FROM `UTENTE_TEMP` U WHERE EMAIL='".$email."'";
	break;

	case "dettaglio_job":
		$id_job = mysql_escape_mimic($_GET['id_job']);
		$tipo_job = mysql_escape_mimic($_GET['tipo_job']);
		if($tipo_job=="translation") {
			$query="SELECT * FROM JOBS_TRANSLATION where ID=".$id_job;
		}
		else /*($tipo_job=="correction")*/ {
			$query="SELECT * FROM JOBS_CORRECTION where ID=".$id_job;
		}
	break;

	case "reportAbuse":
		$id_commento=mysql_escape_mimic($_GET['id']);
		sendCustomMail("reportAbuse@explico.com ", "luca.sapone86@gmail.com ", "Report abuse sul commento ".$id_commento, 
		"Ciao Luca, è stato inviato il report abuse per il commento <strong>".$id_commento."</strong>");
	break;
}//end switch azione

//il metodo execQuery si troverà su "mysql.inc.php"
if(!empty($query)) {
	$result = execQuery($query);
	while($row = @mysql_fetch_array($result, MYSQL_ASSOC))
	{
		array_push($json, $row);
	}
}

if($azione=="getUserProfilePicture") {
	$uid = mysql_escape_mimic($_GET['user_id']);
	$query = "SELECT * FROM UTENTE WHERE ID =".$uid;
	$result = execQuery($query);
	$row = @mysql_fetch_array($result, MYSQL_ASSOC);
	if($row['IMAGE'] != null) {
	//caso immagine presente
	$path = "./uploadedFiles/".$uid."/".$row['IMAGE'];
	}
	else {
	//caso immagine non presente
	$path = "./images/profile_picture.jpg";			
	}
	$b64image = base64_encode(file_get_contents($path,FILE_USE_INCLUDE_PATH));
	$json = array("id"=>$row['ID'],"base64"=>$b64image);
}

if($azione=="login" && count($json)>0) {
	//controllo la password
	if(($json[0]["PASSWORD"] == md5($json[0]["SALE"].$password)) or $is_mod_utente) {
		unset($json[0]["PASSWORD"]);
		unset($json[0]["SALE"]);
		$jsonDettaglio = array();
		if($json[0]["RUOLO"] == "AGENZIA") {
			$query = "SELECT U.*, A.* FROM UTENTE U, AGENZIA A WHERE A.ID = ".$json[0]["ID"]." AND A.ID = U.ID";
			$result1 = execQuery($query);
			while($row1 = @mysql_fetch_array($result1, MYSQL_ASSOC))
			{
				array_push($jsonDettaglio, $row1);
			}
		}else {
			//GESTIONE TRADUTTORE
			$query = "SELECT U.*, T.* FROM TRADUTTORE T, UTENTE U WHERE T.ID = ".$json[0]["ID"]." AND T.ID = U.ID";
			$result1 = execQuery($query);
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
		$json = array("errCode"=>"406", "errMsg"=>"Username already present.");
	}
	else {

		$username=mysql_escape_mimic($_GET['username']);
		$password=mysql_escape_mimic($_GET['password']);
		$origin_password=mysql_escape_mimic($_GET['password']);
		$sale=md5($password.$username.rand_string(10));
		$password=md5($sale.$password);
		$ruolo=mysql_escape_mimic($_GET['ruolo']);
		$email=mysql_escape_mimic($_GET['email']);
		$country=mysql_escape_mimic($_GET['country']);
		$city=mysql_escape_mimic($_GET['city']);
		$pictureUrl = mysql_escape_mimic($_GET['pictureUrl']);
		$social = mysql_escape_mimic($_GET['social']);
		
//campi traduttore
		$nome=mysql_escape_mimic($_GET['nome']);
		$cognome=mysql_escape_mimic($_GET['cognome']);
		$mothertongue=mysql_escape_mimic($_GET['mothertongue']);

//campi agenzia
		$employees=mysql_escape_mimic($_GET['employees']);
		$website=mysql_escape_mimic($_GET['website']);

		$query="INSERT INTO `UTENTE` (`ID`, `USERNAME`, `PASSWORD`, `SALE`, `RUOLO`, `EMAIL`, `CITTA`, `PAESE`, `IMAGE`, `PAYPAL`, `IBAN`) VALUES
		(NULL, '".$username."','".$password."', '".$sale."', '".$ruolo."', '".$email."', '".$city."', '".$country."', NULL, NULL, NULL)";
		$result = execQuery($query);

		$query = "SELECT ID FROM `UTENTE` WHERE USERNAME = '".$username."'";
		$result = execQuery($query);
		$row = @mysql_fetch_array($result, MYSQL_ASSOC);
		$uid = $row['ID'];
		
		//GESTIONE DELL'IMMAGINE DEL PROFILO LINKEDIN
		if($social == 'LINKEDIN') {
			//VEDI UPLOAD.PHP
			uploadImageFromLinkedin($uid,$pictureUrl);
		} else if ( $social == 'FACEBOOK') {
			//VEDI UPLOAD.PHP
			$pictureUrl = "http://graph.facebook.com/".$origin_password."/picture?type=large";
			uploadImageFromFacebook($uid,$pictureUrl);
		} 
		//nel caso di nuova registrazione è la funzione getUserProfilePicture che si occupa di valorizzare
		//immagine con immagine di default

		if($ruolo=="TRADUTTORE") {

			$query = "INSERT INTO `TRADUTTORE` (`ID`, `NOME`, `COGNOME`, `MADRELINGUA`, `HAS_NEW_MESSAGE`) VALUES
			(".$uid.", '".$nome."',  '".$cognome."',  '".$mothertongue."', 'N')";
			$result = execQuery($query);
		}
		else if($ruolo=="AGENZIA") {
//AGENZIA
			$query = "INSERT INTO `AGENZIA` (`ID`, `NOME`, `NUM_IMPIEGATI`, `SITO_WEB`) VALUES
			(".$uid.", '".$nome."',  '".$employees."',  '".$website."')";
			$result = execQuery($query);
		}
		else {
//TODO se ci saranno altri ruoli
		}
		$json = array("Risultato"=>"OK");
	}	
} 

else if($azione=="registerTemp") {
//SE LA SELECT DI PRIMA HA GIA' TORNATO RISULTATI, SIGNIFICA CHE ESISTE GIA' L'UTENTE
	if(count($json)>0) {
		$json = array("errCode"=>"406", "errMsg"=>"Email already present.");
	}
	else {

		$type=mysql_escape_mimic($_GET['type']);
		$query="INSERT INTO `UTENTE_TEMP` (`EMAIL`, `TYPE`) VALUES
		('".$email."','".$type."')";
		$result = execQuery($query);
		$json = array("Risultato"=>"OK");
	}
}

else if($azione=="checkUsername") {
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

	}else if($azione=="annulla_ripetizione"){
//$jsonstring = json_encode(array("Risultato"=>"OK"));
		$jsonstring = json_encode(array("errCode"=>"401","errMsg"=>"Impossibile annullare la ripetizione. E' stata gia' confermata dal docente."));

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