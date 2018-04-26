<?php
require "showerrors.php";
	$title="Bienvenue Développeur !";
	$css="client/home";
	$script="client/accueil";
	$numpage=1;//accueil
	require "curlRequests/requetes.php";
	require "vues/header.php";
	require "vues/client/harry.php";
	require "vues/footer.php";
//on cherche la classe
?>