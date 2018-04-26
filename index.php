<?php
require "showerrors.php";
session_start();
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