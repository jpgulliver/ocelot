<?php
   define('DB_SERVER', 'ocelot.cfxx0yyzf2du.us-west-2.rds.amazonaws.com:3306');
   define('DB_USERNAME', 'admin');
   define('DB_PASSWORD', 'coatolivetap1!');
   define('DB_DATABASE', 'ocelotDB');
   $db = mysqli_connect(DB_SERVER,DB_USERNAME,DB_PASSWORD,DB_DATABASE);
?>