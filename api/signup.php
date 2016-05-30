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
	  
	  $hash = password_hash($password, PASSWORD_DEFAULT);
      
      $sql = "INSERT INTO users (username, password, email, validated) VALUES ('$username', '$hash', '$email', '0');";
      $result = mysqli_query($db,$sql);
	  $userID = mysqli_insert_id($db);
	  
	  var_dump($result);
	  var_dump($sql);
		
      if($result) {
		 $token = new Token($userID, $username);
         $jwt = JWT::encode(
          $token->data,//Data to be encoded in the JWT
          SECRET_KEY, // The signing key
          'HS512'     // Algorithm used to sign the token, see https://tools.ietf.org/html/draft-ietf-jose-json-web-algorithms-40#section-3
         );
		 $unencodedArray = ['jwt' => $jwt];
         echo json_encode($unencodedArray);
      }else {
         $error = "Your Login Name or Password is invalid";
		 echo "signup failed";
      }
   }
?>