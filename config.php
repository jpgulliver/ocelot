<?php
   define('DB_SERVER', 'ocelot.cfxx0yyzf2du.us-west-2.rds.amazonaws.com');
   define('DB_USERNAME', 'admin');
   define('DB_PASSWORD', 'coatolivetap1!');
   define('DB_DATABASE', 'ocelotDB');
   define('DB_PORT', '3306');
   $db = mysqli_connect(DB_SERVER,DB_USERNAME,DB_PASSWORD,DB_DATABASE, DB_PORT);
   if (!$db) {
      die("Connection failed: " . mysqli_connect_error());
   }
?>