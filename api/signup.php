<?php
	require_once('config.php');
	require_once('token.php');
	require_once('vendor/autoload.php');
	use \Firebase\JWT\JWT;

	if($_SERVER["REQUEST_METHOD"] == "POST") {
		// username and password sent from form 
		
		$username = mysqli_real_escape_string($db,$_POST['username']);
		$password = mysqli_real_escape_string($db,$_POST['password']);
		$email = mysqli_real_escape_string($db,$_POST['email']); 
		
		$hash = password_hash(base64_encode(hash('sha256', $password, true)), PASSWORD_DEFAULT);
		
		$sql = "INSERT INTO users (username, password, email, validated) VALUES ('$username', '$hash', '$email', '0');";
		$result = mysqli_query($db,$sql);
		$userID = mysqli_insert_id($db);
		
		if($result) {
			$token = new Token($userID, $username);
			$jwt = JWT::encode(
			$token->data,//Data to be encoded in the JWT
			SECRET_KEY, // The signing key
			'HS512'     // Algorithm used to sign the token, see https://tools.ietf.org/html/draft-ietf-jose-json-web-algorithms-40#section-3
			);
			$unencodedArray = ['jwt' => $jwt];
			echo json_encode($unencodedArray);
		} else {
			$error = "Your Login Name or Password is invalid";
			echo "signup failed";
		}
	} else if($_SERVER["REQUEST_METHOD"] == "GET") {
		// username and password sent from form 
		
		$type = mysqli_real_escape_string($db,$_GET['type']);
		if(isset($_GET['value'])) {
			$value = mysqli_real_escape_string($db,$_GET['value']);
		} else {
			$value = '';
		}
		
		$sql = "SELECT * FROM users WHERE $type = '$value';";
		$result = mysqli_query($db,$sql);
		
		$row = mysqli_fetch_array($result,MYSQLI_ASSOC);
		
		$count = mysqli_num_rows($result);
		
		// var_dump($type);
		// var_dump($value);
		// var_dump($sql);
		
		if($count >= 1) {
			echo "taken";
		}else {
			echo "ok";
		}
	}
?>