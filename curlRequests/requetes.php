<?php
include("php4store/Endpoint.php");
//on instancie l’objet
$myEndpoint = new Endpoint('http://dbpedia.org/');
//on fabrique la requête SPARQL
$prefix = 'PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX dc: <http://purl.org/dc/elements/1.1/>
PREFIX : <http://dbpedia.org/resource/>
PREFIX dbpedia2: <http://dbpedia.org/property/>
PREFIX dbpedia: <http://dbpedia.org/>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX dbo: <http://dbpedia.org/ontology/>
';



function descriptionAuteur(){
    global $myEndpoint,$prefix;
    $rq="SELECT * WHERE { <http://dbpedia.org/resource/Harry_Potter> dbpedia2:author ?y. 
        ?y rdfs:comment ?description.
        FILTER (lang(?description) = 'fr')
        }";
    $sparql = $prefix.$rq;
    //On utilise la fonction pour faire une requête en lecture
    $rows = $myEndpoint->query($sparql, 'rows'); 
    //On vérifie qu’il n'y a pas d'erreur sinon on stoppe le programme et on affiche les erreurs
    $err = $myEndpoint->getErrors();
    if ($err) { die (print_r($err,true));}				
    //On scanne le résultat 
    foreach($rows as $row){	
        echo $row['description'] . '<br><br><br><br>' ;
}
}

function captionAuteur(){
    global $myEndpoint,$prefix;
    $rq="SELECT * WHERE { <http://dbpedia.org/resource/Harry_Potter> dbpedia2:author ?y. 
        ?y <http://dbpedia.org/ontology/thumbnail> ?image.
        }";
    $sparql = $prefix.$rq;
    //On utilise la fonction pour faire une requête en lecture
    $rows = $myEndpoint->query($sparql, 'rows'); 
    //On vérifie qu’il n'y a pas d'erreur sinon on stoppe le programme et on affiche les erreurs
    $err = $myEndpoint->getErrors();
    if ($err) { die (print_r($err,true));}				
    //On scanne le résultat 
    foreach($rows as $row){	
        echo $row['image'] . '<br><br><br><br>' ;
}
}

function getBooks(){
    global $myEndpoint,$prefix;
    $rq="SELECT * WHERE { <http://dbpedia.org/resource/Harry_Potter> dbpedia2:books ?nom. 
   ?nom rdfs:label ?noms. 
   FILTER (lang(?noms) = 'fr').
        }";
    $sparql = $prefix.$rq;
    //On utilise la fonction pour faire une requête en lecture
    $rows = $myEndpoint->query($sparql, 'rows'); 
    //On vérifie qu’il n'y a pas d'erreur sinon on stoppe le programme et on affiche les erreurs
    $err = $myEndpoint->getErrors();
    if ($err) { die (print_r($err,true));}				
    //On scanne le résultat 
    return $rows;
}

function getDes(){
    global $myEndpoint,$prefix;
    $rq="SELECT * WHERE { <http://dbpedia.org/resource/Harry_Potter> dbpedia2:books ?nom. 
   ?nom dbo:abstract ?des. 
   FILTER (lang(?des) = 'en').
        }";
    $sparql = $prefix.$rq;
    //On utilise la fonction pour faire une requête en lecture
    $rows = $myEndpoint->query($sparql, 'rows'); 
    //On vérifie qu’il n'y a pas d'erreur sinon on stoppe le programme et on affiche les erreurs
    $err = $myEndpoint->getErrors();
    if ($err) { die (print_r($err,true));}				
    //On scanne le résultat 
    return $rows;
}
function getCountry(){
    global $myEndpoint,$prefix;
    $rq="SELECT * WHERE { <http://dbpedia.org/resource/Harry_Potter> dbpedia2:country ?country. 
        }";
    $sparql = $prefix.$rq;
    //On utilise la fonction pour faire une requête en lecture
    $rows = $myEndpoint->query($sparql, 'rows'); 
    //On vérifie qu’il n'y a pas d'erreur sinon on stoppe le programme et on affiche les erreurs
    $err = $myEndpoint->getErrors();
    if ($err) { die (print_r($err,true));}				
    //On scanne le résultat 
    foreach($rows as $row){
    return $row["country"];
}
}
function nomPerso(){
    global $myEndpoint,$prefix;
    $rq="SELECT distinct ?elem where { ?a prop-fr:oeuvre dbpedia-fr:Harry_Potter. ?a foaf:name ?elem.}
        }";
    $sparql = $prefix.$rq;
    //On utilise la fonction pour faire une requête en lecture
    $rows = $myEndpoint->query($sparql, 'rows'); 
    //On vérifie qu’il n'y a pas d'erreur sinon on stoppe le programme et on affiche les erreurs
    $err = $myEndpoint->getErrors();
    if ($err) { die (print_r($err,true));}				
    //On scanne le résultat 
    return $rows;
}

function desSerie(){
    global $myEndpoint,$prefix;
    $rq="SELECT ?desc where {<http://fr.dbpedia.org/resource/Harry_Potter>
        <http://dbpedia.org/ontology/abstract> ?desc FILTER (LANG(?desc)='fr')}
        ";
    $sparql = $prefix.$rq;
    //On utilise la fonction pour faire une requête en lecture
    $rows = $myEndpoint->query($sparql, 'rows'); 
    //On vérifie qu’il n'y a pas d'erreur sinon on stoppe le programme et on affiche les erreurs
    $err = $myEndpoint->getErrors();
    if ($err) { die (print_r($err,true));}				
    //On scanne le résultat 
    foreach($rows as $row){
        return $row["desc"];
    
}
}

function harryImg(){
    global $myEndpoint,$prefix;
    $rq="SELECT ?img where {<http://fr.dbpedia.org/resource/Harry_Potter>
        <http://dbpedia.org/ontology/thumbnail> ?img}
        ";
    $sparql = $prefix.$rq;
    //On utilise la fonction pour faire une requête en lecture
    $rows = $myEndpoint->query($sparql, 'rows'); 
    //On vérifie qu’il n'y a pas d'erreur sinon on stoppe le programme et on affiche les erreurs
    $err = $myEndpoint->getErrors();
    if ($err) { die (print_r($err,true));}				
    //On scanne le résultat 
    foreach($rows as $row){
        return $row["img"];
}
}

function editeurLivresDes(){
    global $myEndpoint,$prefix;
    $rq="SELECT ?descpubli where {<http://fr.dbpedia.org/resource/Harry_Potter>
        <http://dbpedia.org/ontology/firstPublisher> ?publi.
        ?publi <http://dbpedia.org/ontology/abstract> ?descpubli.
        FILTER (lang(?descpubli) = 'fr')}
        ";
    $sparql = $prefix.$rq;
    //On utilise la fonction pour faire une requête en lecture
    $rows = $myEndpoint->query($sparql, 'rows'); 
    //On vérifie qu’il n'y a pas d'erreur sinon on stoppe le programme et on affiche les erreurs
    $err = $myEndpoint->getErrors();
    if ($err) { die (print_r($err,true));}				
    //On scanne le résultat 
    return $rows;
}

function langLivres(){
    global $myEndpoint,$prefix;
    $rq="SELECT ?langue where {<http://fr.dbpedia.org/resource/Harry_Potter>
        <http://dbpedia.org/ontology/language> ?llangue.
        ?llangue rdfs:label ?langue.
        FILTER (lang(?langue) = 'fr').}
        ";
    $sparql = $prefix.$rq;
    //On utilise la fonction pour faire une requête en lecture
    $rows = $myEndpoint->query($sparql, 'rows'); 
    //On vérifie qu’il n'y a pas d'erreur sinon on stoppe le programme et on affiche les erreurs
    $err = $myEndpoint->getErrors();
    if ($err) { die (print_r($err,true));}				
    //On scanne le résultat 
    return $rows;
}
?>