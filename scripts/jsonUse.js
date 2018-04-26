function loadJson(fname){
	var mydata;
	$.ajax({
		url: fname,
		async: false,
		dataType: 'json',
		success: function (json) {
			mydata = json;
		}
	});
	return mydata;
}
function filtre(){
	var btn=document.getElementsByClassName('btn-block')[0];
	btn.addEventListener("click",filtreAct);
}
function filtreAct(num){
	var contrat = document.getElementsByClassName('type-emploi')[0].value;
	var param = "ok"
	if(num!=3){ // Dans le cas où on traite des annonces
		$.post("/api/POST/annonces",
		{
			params: param
		},
		function(data,status){
			choice(data,num);
		});
	}
	else{
		$.post("/api/POST/profils",
		{
			params: param
		},
		function(data,status){
			choice(data,num);
		});
	}
	function choice(data,num){
		if(data!==null){
			if(num==1){
				createAnnonces(JSON.parse(data),1); // annonces pour le client
			}
			if(num==2){
				createAnnonces(JSON.parse(data),2); // annonces pour le portail
			}
			if(num==3){
				createAnnonces(JSON.parse(data),3); // page profil
			}
		}
		else{
			alert("Pas de données à retourner...");
		}
	}
}
deconnexion();
function deconnexion(){
	var button=document.getElementById("buttonDisc");
	if(button!=null){
		button.addEventListener("click",function(){
			$.post("api/POST/disconnect",
			{
			},
			function(data,status){
				my_function(data)
			});
			if(window.location.href.includes("portail")){
				window.location.replace("/portail");
			}
			else{
				window.location.replace("/");
			}
		});
	}
}
function createAnnonces(data,num){ // Crée nos petites annonces après la réponse serveur pour les filtres :p
	console.log(data);
	$(".main-container-offers").fadeOut("slow");
	var annonces=data;
	var div=document.getElementsByClassName('offers-container')[0];
	div.innerHTML="";
	var str="";
	var button;
	if(num==1){ // page du client
		for(x=0;x<annonces.length;x++){
			str+="<div class='offer-container col-xs-12'><div class='offer-text col-xs-8'><h3 class='offer-text-title'>";
			str+=annonces[x].titre;
			str+="</h3><p class='offer-text-content'>";
			str+=annonces[x].content;
			str+="</div><div class='offer-info col-xs-3'><p class='offer-info-content'><span class='blue'>Salaire:</span> ";
			str+=annonces[x].salaire;
			str+="<br><span class='blue'>Contrat:</span> ";
			str+= annonces[x].contrat;
			str+=" <br><span class='blue'>Type d'emplois:</span> ";
			str+= annonces[x].type_emploi;
			str+="</p></div><div class='offer-link col-xs-1'><i id='"+annonces[x].id+"' class='goAnnonces hvr-forward fa fa-arrow-circle-right' aria-hidden='true'></i></div></div>";
		}
	}
	else if(num==2){ // demandes de la page portail
		for(x=0;x<annonces.length;x++){
			str+="<div class='offer-container col-xs-12'><div class='offer-text col-xs-8'><h3 class='offer-text-title'>";
			str+=annonces[x].titre;
			str+="</h3><p class='offer-text-content'>";
			str+=annonces[x].content;
			str+="</div><div class='offer-info col-xs-3'><p class='offer-info-content'><span class='blue'>Salaire:</span> ";
			str+=annonces[x].salaire;
			str+="<br><span class='blue'>Contrat:</span> ";
			str+= annonces[x].contrat;
			str+=" <br><span class='blue'>Type d'emplois:</span> ";
			str+= annonces[x].type_emploi;
			str+="</p></div><div class='offer-link col-xs-1'><i id='"+annonces[x].id+"' class='goAnnonces hvr-forward fa fa-arrow-circle-right' aria-hidden='true'></i></div></div>";
		}
	}
	else{ // page profil
		for(x=0;x<annonces.length;x++){
			str+="<div class='offer-container col-xs-12'><div class='offer-text col-xs-8'><h3 class='offer-text-title'>";
			str+=annonces[x].nom + " "+annonces[x].prenom + " #<span class='blue'>"+annonces[x].id_user+"</span>";
			str+="</h3><p class='offer-text-content'>";
			str+=annonces[x].descriptif;
			str+="</div><div class='offer-info col-xs-3'><p class='offer-info-content'><span class='blue'>Mail:</span> ";
			str+=annonces[x].mail;
			str+="<br><span class='blue'>Adresse :</span> ";
			str+= annonces[x].contrat;
			str+=" <br><span class='blue'>Niveau d'étude :</span> ";
			str+= annonces[x].niveau_etude;
			str+="</p></div><div class='offer-link col-xs-1'><i id='"+annonces[x].id_user+"' class='goAnnonces hvr-forward fa fa-arrow-circle-right' aria-hidden='true'></i></div></div>";
		}
	}
	setTimeout(function(){
		$(".main-container-offers").fadeIn("slow");
		div.innerHTML=str;
		var info,button;
		for(var x=0;x<annonces.length;x++){ // on va récupérer les id qui sont dans les div de chaque annonces pour la redirection
			button=document.getElementsByClassName("goAnnonces")[x];
			if(num==1){
				button.addEventListener("click",function(){
					window.location.replace("annonces/annonce?id="+this.getAttribute( 'id' ));
				});
			}
			else if(num==2){
				button.addEventListener("click",function(){
					window.location.replace("/portail/demandes/annonce?id="+this.getAttribute( 'id' ));
				});
			}
			else{
				button.addEventListener("click",function(){
					window.location.replace("/portail/candidats/candidat?id="+this.getAttribute( 'id' ));
				});
			}
		}
	},1000);
}
function connexion(){
	var btnCnx=document.getElementById("btnCnx");
	if(btnCnx!=null){
		btnCnx.addEventListener("click",function(){
			var pwd=$("#pwdCnx").val();
			var user=$("#userCnx").val();
			$.post("api/POST/verifMdp",
			{
				user:user,
				pwd:pwd
			},
			function(data,status){
				my_function(data)
			});
			function my_function(data){
				if(data=='0'){
					window.location.replace("/");
				}
				else{
					alert(data);
				}
			}
		});
	}
}
function deco(){
	var button=document.getElementById("buttonDisc");
	if(button!=null){
		button.addEventListener("click",function(){
			$.post("api/POST/disconnect",
			{
			},
			function(data,status){
				my_function(data)
			});
			function my_function(data){
				if(data=='0'){
					window.location.replace("/");
				}
			}
		});
	}
}
function connexionRH(){
	var btnCnx=document.getElementById("btnCnx");
	if(btnCnx!=null){
		btnCnx.addEventListener("click",function(){
			var pwd=$("#pwdCnx").val();
			var user=$("#userCnx").val();
			$.post("api/POST/verifMdpRH",
			{
				user:user,
				pwd:pwd
			},
			function(data,status){
				my_function(data)
			});
			function my_function(data){
				if(data=='0'){
					window.location.replace("/portail");
				}
				else{
					alert(data);
				}
			}
		});
	}
	var button=document.getElementById("buttonDisc");
}
function creerCompte(){
	var btnIns=document.getElementById("btnIns");
	var pwd,usr,pwdverif,email;
	btnIns.addEventListener("click",function(){
		var pwd=$("#pwdIns").val();
		var pwdverif=$("#pwdInsConf").val();
		var usr=$("#userIns").val();
		var email=$("#mailIns").val();

		if(usr.length==0||pwdverif.length==0||pwd.length==0||email.length==0){
			$("#helpIns").text("Champs manquants !");
		}
		else if(pwd!=pwdverif){
			$("#helpIns").text("Mots de passes différents !");
		}
		else if(verifMail(email)==false){
			$("#helpIns").text("Adresse Mail non conforme!");
		}
		else if(pwd.length<=5){
			$("#helpIns").text("Votre mot de passe est trop petit!");
		}
		else if(usr.length<=5){
			$("#helpIns").text("Votre identifiant est trop petit!");
		}
		else{
			$( ".disapear" ).fadeOut( "slow", function() {
				$(".successForm").fadeIn("quick");
				var lieuApi="/api/POST/inscription"; // Ici le lien vers les infos à envoyer vers l'api
				$.post(lieuApi,
					{
						"pwd": pwd,
						"user": usr,
						"mail":email
					},
					function(data, status){
						alert(data);
					});
					setTimeout(animationSuccess,2000);
					$("#helpIns").text("");
				});
			}
		});
	}
function creerCompteRH(){
	var btnIns=document.getElementById("btnIns2");
	var pwd,usr,pwdverif,email;
	btnIns.addEventListener("click",function(){
		var pwd=$("#pwdIns2").val();
		var pwdverif=$("#pwdInsConf2").val();
		var usr=$("#userIns2").val();
		var email=$("#mailIns2").val();
		if(usr.length==0||pwdverif.length==0||pwd.length==0||email.length==0){
			$("#helpIns2").text("Champs manquants !");
		}
		else if(pwd!=pwdverif){
			$("#helpIns2").text("Mots de passes différents !");
		}
		else if(verifMail(email)==false){
			$("#helpIns2").text("Adresse Mail non conforme!");
		}
		else if(pwd.length<=5){
			$("#helpIns2").text("Votre mot de passe est trop petit!");
		}
		else if(usr.length<=5){
			$("#helpIns2").text("Votre identifiant est trop petit!");
		}
		else{
			$( ".disapear2" ).fadeOut( "slow", function() {
				$(".successForm2").fadeIn("quick");
				var lieuApi="/api/POST/inscriptionRH"; // Ici le lien vers les infos à envoyer vers l'api
				$.post(lieuApi,
					{
						"pwd": pwd,
						"user": usr,
						"mail": email
					},
					function(data, status){
						alert(data);
					});
					setTimeout(animationSuccess2,2000);
					$("#helpIns2").text("");
				});
			}
		});
	}
function animationSuccess(){
	$('#modalIns').modal('toggle');
	$( ".disapear" ).fadeIn( "slow", function() {
		$(".successForm").fadeOut("quick");
	});
}
function animationSuccess2(){
	$('#modalIns2').modal('toggle');
	$( ".disapear2" ).fadeIn( "slow", function() {
		$(".successForm2").fadeOut("quick");
	});
}
function verifMail(email)
{
	return ((/^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/).test(email));
}
function textCode(json){ // Génere de façon aléatoire les phrases écrites dans l'accueil
	var textCode=document.getElementById("textCode");
	var codes=loadJson("/jsons/"+json+".json");
	var indice=Math.floor(Math.random() * (codes.codes.length ));
	var testRandom = indice;
	textCode.innerHTML=codes.codes[indice]; // randiom text
	setInterval(function(){
		testRandom=Math.floor(Math.random() * (codes.codes.length ));
		while(testRandom==indice){
			testRandom=Math.floor(Math.random() * (codes.codes.length ));
		}
		indice=testRandom;
		textCode.innerHTML=codes.codes[indice]; // randiom text
	},9000,codes);
}
function profilInfo(){// récupérer les infos du formulaire de profil
	var btnIns=document.getElementById("btnModify");
	var btnCv=document.getElementById("btncv");
	btnIns.addEventListener("click",function(){
		var nom=$("#inf1").val();
		var prenom=$("#inf2").val();
		var mail=$("#inf3").val();
		var age=$("#inf4").val();
		var adresse=$("#inf5").val();
		var etude=$("#inf6").val();
		var exp=$("#inf7").val();
		var intitule=$("#inf8").val();
		var des=$("#inf9").val();
		var comp=$("#inf10").val();
		var lieuApi="/api/POST/infoProfil"; // Ici le lien vers les infos à envoyer vers l'api
		$.post(lieuApi,
			{
				"nom": nom,
				"prenom": prenom,
				"mail":mail,
				"age":age,
				"adresse":adresse,
				"etude":etude,
				"exp":exp,
				"intitule":intitule,
				"des":des,
				"comp":comp
			},
			function(data, status){
				window.location.replace("/profil");
			});
		});
	}
function postuler(){
	var button=document.getElementById("postuler");
	button.addEventListener("click",function(){
		var id=document.getElementById("id_annonce").innerHTML;
		var lieuApi="/api/POST/postuler";
		$.post(lieuApi,
			{
				"id": id
			},
			function(data, status){
				if(data=="failed"){
					alert("Vous n'etes pas autorisés à postuler à cette offre");
				}
				else if(data=="no"){
					alert("Vous êtes déjà inscrits à cette offre !");
				}
				else{
					alert("Vous avez postulé avec succès !");
				}
			});
		});
	}
function acceptPostulant(){
	var idAnnonce=document.getElementsByClassName("offer-title")[0].id;
	var accept=document.getElementsByClassName("accept"); // on récupère les utilisateurs inscrits à une annonce
	for(x=0;x<accept.length;x++){
		accept[x].addEventListener("click",function(){
			var lieuApi="/api/POST/acceptPostulant";
			$.post(lieuApi,
				{
					"idc": this.id,
					"ida": idAnnonce
				},
				function(data, status){
					checkStateDemandes();
				});
	});
}
}
function refusePostulant(){
	var idAnnonce=document.getElementsByClassName("offer-title")[0].id;
	var refuse=document.getElementsByClassName("refuse"); // on récupère les utilisateurs inscrits à une annonce
	for(x=0;x<refuse.length;x++){
		refuse[x].addEventListener("click",function(){
			var lieuApi="/api/POST/refusePostulant";
			$.post(lieuApi,
				{
					"idc": this.id,
					"ida": idAnnonce
				},
				function(data, status){
					checkStateDemandes();
				});
	});
}
}
function checkStateDemandes(){
	var idAnnonce=document.getElementsByClassName("offer-title")[0].id;
	var lieuApi="/api/POST/checkStateDemandes";
	$.post(lieuApi,
		{
			"ida": idAnnonce
		},
		function(data, status){
			var containers=document.getElementsByClassName("offer-container");
			data=JSON.parse(data);
			console.log(data);
			for (x=0;x<containers.length;x++){
				if(data[x]["etatDemande"]==0){// en attente
					containers[x].style="border-left: 25px solid #3bb4bc";
				}
				if(data[x]["etatDemande"]==1){ // accepté
					containers[x].style="border-left: 25px solid #2ecc71";
				}
				if(data[x]["etatDemande"]==2){
					containers[x].style="border-left: 25px solid #c0392b";
				}
			}
		});

}
function redirectCandidat(){
	var containers=document.getElementsByClassName("offer-text");
	for (x=0;x<containers.length;x++){
		containers[x].addEventListener("click",function(){
			window.location="/portail/candidats/candidat?id="+this.id;
	});
}
}
