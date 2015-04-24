<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

echo {
  \"name\": \"Explico\",
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
      \"url\": \"http://explico.altervista.org/JSONEngine.php\"
    }
  },
  \"production\": {
    \"urls\": {
    },
    \"request\": {
    }
  }
}";

?>
