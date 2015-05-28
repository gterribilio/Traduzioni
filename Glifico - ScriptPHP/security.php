<?php
//NON FUNZIONA - NON TOCCARE
function initiate($nomeDB)
{
	$logged_in = false;
	if(isset($_SESSION['user_name']))
	{
		$logged_in = true;
	}
	// Check that cookie is set
	if(isset($_POST['auth_key']))
	{
		$auth_key = $_POST['auth_key'];

		if($logged_in === false)
		{
			// Select user from database where auth key matches (auth keys are unique)
			$auth_key_query = execQuery("SELECT USERNAME, PASSWORD FROM UTENTE WHERE SESSION_ID = '" . $auth_key . "' LIMIT 1", $nomeDB);
			if($auth_key_query === false)
			{
				// If auth key does not belong to a user delete the cookie
				setcookie("auth_key", "", time() - 3600);
			}
			else
			{
				while($u = mysql_fetch_array($auth_key_query))
				{
					// Go ahead and log in
					return login($u['USERNAME'], $u['PASSWORD'], true, $nomeDB);
				}
			}
		}
		else
		{
			setcookie("auth_key", "", time() - 3600);
		}
	}
	return true;
}
//NON FUNZIONA - NON TOCCARE
function login($username, $password, $remember = false, $nomeDB) 
{
    $sql = execQuery("SELECT * FROM UTENTE WHERE PASSWORD = '" . $password . "' AND USERNAME = '" . $username . "' LIMIT 1", $nomeDB);
	//var_dump($sql);
    // If there are no matches then the username and password do not match
    if($sql === false) 
    {
        return false;
    }
    else
    {
        while($u = mysql_fetch_array($sql))
        { 
                // Check if user wants account to be saved in cookie
                if($remember === true)
                {
                    // Generate new auth key for each log in (so old auth key can not be used multiple times in case 
                    // of cookie hijacking)
                    $cookie_auth= rand_string(10) . $username;
                    $auth_key = md5($cookie_auth);
                    $auth_query = execQuery("UPDATE UTENTE SET SESSION_ID = '" . $auth_key . "' WHERE USERNAME = '" . $username . "'", $nomeDB);
 
                    setcookie("auth_key", $auth_key, time() + 60 * 60 * 24 * 7, "/", $_SERVER['HTTP_HOST'], false, true);
                }
                // Assign variables to session
                session_regenerate_id(true);
                $session_id = $u[ID_UTENTE];
                $session_username = $username;
 
                $_SESSION['user_id'] = $session_id;
                $_SESSION['user_name'] = $session_username;
                $_SESSION['user_lastactive'] = time();
				return true;
        }
    }
}
//NON FUNZIONA - NON TOCCARE
function logout()
{
	// Need to delete auth key from database so cookie can no longer be used
	$username = $_SESSION['user_name'];
	setcookie("auth_key", "", time() - 3600);
	$auth_query = mysql_query("UPDATE UTENTE SET SESSION_ID = 0 WHERE USERNAME = '" . $username . "'");
	// If auth key is deleted from database proceed to unset all session variables
	if ($auth_query)
	{
		unset($_SESSION['user_id']);
		unset($_SESSION['user_name']);;
		unset($_SESSION['user_lastactive']);
		session_unset();
		session_destroy(); 
		return true;
	}
	else
	{
		return false;
	}
}

function rand_string($length = 10) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, strlen($characters) - 1)];
    }
    return $randomString;
}
 
?>