<?php
   require_once('config.php');
   require_once('token.php');
   require_once('vendor/autoload.php');
   use \Firebase\JWT\JWT;
   
   if($_SERVER["REQUEST_METHOD"] == "POST") {
      // username and password sent from form 
	  
      $myusername = mysqli_real_escape_string($db,$_POST['username']);
      $mypassword = mysqli_real_escape_string($db,$_POST['password']); 
	  
	  $hash = password_hash($mypassword, PASSWORD_DEFAULT);
      
      $sql = "SELECT usersID FROM users WHERE username = '$myusername' and password = '$mypassword'";
      $result = mysqli_query($db,$sql);
	  
      $row = mysqli_fetch_array($result,MYSQLI_ASSOC);
      
      $count = mysqli_num_rows($result);
      
      // If result matched $myusername and $mypassword, table row must be 1 row
		
      if($count == 1) {
		 $token = new Token($row["usersID"], $myusername);
         $jwt = JWT::encode(
          $token->data,//Data to be encoded in the JWT
          SECRET_KEY, // The signing key
          'HS512'     // Algorithm used to sign the token, see https://tools.ietf.org/html/draft-ietf-jose-json-web-algorithms-40#section-3
         );
		 $unencodedArray = ['jwt' => $jwt];
         echo json_encode($unencodedArray);
      }else {
         $error = "Your Login Name or Password is invalid";
		 echo "login failed";
      }
   }
?>