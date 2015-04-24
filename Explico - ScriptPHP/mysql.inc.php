<?php
//Connessione Variabili per connessione MySQL
$db_host = "localhost";
$db_user = "explico";
$db_password = "";
$connessione = NULL;

function execQuery($sql, $dbName)
{
	$connessione = mysql_connect($db_host, $db_user, $db_password);
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