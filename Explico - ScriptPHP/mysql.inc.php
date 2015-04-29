<?php
//Connessione Variabili per connessione MySQL
$db_host = "localhost";
$db_user = "explico";
$db_password = "";
$connessione = NULL;

function execQuery($sql, $dbName)
{
	$connessione = mysql_connect($db_host, $db_user, $db_password);
	mysql_query("SET character_set_results = 'utf8', character_set_client = 'utf8', character_set_connection = 'utf8', character_set_database = 'utf8', character_set_server = 'utf8'", $connessione);
	if(!$connessione)
	{
		die('Could not connect: ' . mysql_error());
	}
	//echo 'Connected successfully<br>';
	
	$db_selected = mysql_select_db($dbName, $connessione);
	if (!$db_selected) {
		die ('Can\'t use '.$dbName.' : ' . mysql_error());
	}
	
	$result = mysql_query($sql, $connessione) or die(mysql_error()." -> ".$sql);
	
	mysql_close($connessione);
	
	return $result;
}

?>