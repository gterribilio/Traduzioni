<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$callback = $_GET['callback'];

$jsonstring = "{\"name\": \"Explico\",
  \"environment\": \"development\",
  \"version\": \"1.0.1 20150407\",
  \"defaultKK\" : \"strasburgo\",
  \"logger\": {
    \"enable\": true,
    \"level\": \"error\",
    \"loggingPattern\": \">> %s::[%s] \",
    \"controllers\": {}
  },
  \"development\": {
    \"urls\": {

    },
    \"request\": {
      \"url\": \"http://www.glifico.com/JSONEngine.php\"
    }
  },
  \"production\": {
    \"urls\": {
    },
    \"request\": {
    }
  }
}";

if(strlen($callback)>0)
	echo $callback."(".$jsonstring.")";
else
	echo $jsonstring;

?>
