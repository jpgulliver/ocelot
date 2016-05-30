<?php
   // define('DB_SERVER', 'ocelot.cfxx0yyzf2du.us-west-2.rds.amazonaws.com');
   define('DB_SERVER', 'localhost');
   // define('DB_USERNAME', 'admin');
   define('DB_USERNAME', 'root');
   // define('DB_PASSWORD', 'coatolivetap1!');
   define('DB_PASSWORD', '');
   define('DB_DATABASE', 'ocelotDB');
   define('DB_PORT', '3306');
   define('SECRET_KEY', 'Ia5Hs6kROEv20ZzTn24BiH235YcdqfP9');
   
   $db = new mysqli(DB_SERVER,DB_USERNAME,DB_PASSWORD,DB_DATABASE, DB_PORT);
   if (!$db) {
      die("Connection failed: " . mysqli_connect_error());
   }
?>