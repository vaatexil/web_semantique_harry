	<section class="main-container-main-animation col-xs-12">
			<header class="main-container-main-animation-header text-center">
				<h1 id="smoky">Harry Potter</h1>
			</header>
			<main class="main-container-main-animation-canvas col-xs-12">
				<h3 id="textCode"></h3>
			</main>
		</section>
<aside class="main-container-banner col-xs-12">
	<main class="main-container-banner-content col-xs-12">
		<header class="main-container-banner-content-header col-xs-12">
			<h1> Auteur </h1>
		</header>
		<main>
			<p class="col-xs-8"><?= descriptionAuteur(); ?> </p>
			<img class="col-xs-4"  src="<?= captionAuteur(); ?>" alt="\">
		</main>

	</main>

</aside>


<div style="height:300px;color:white" class='offer-container col-xs-12'>
	<div class='offer-text col-xs-4'>
		<h1>
		Livres écrits : 	
		</h1>
		<ul style="color:white;margin-left:20px;">
			<?php 
			$rows = getBooks();
			$nb=0;
			foreach($rows as $row){
				echo "<li class='click' style='cursor:pointer'>".$row["noms"]."</li>";
			}
			?>
	</div>
	<div class='offer-text col-xs-8'>
	<h3 id="bookDes">Cliquez sur un livre pour faire apparaître son extrait ! </h3>
	<div id="content" style="font-size:10px;"></div>
	<?php 
			$rows = getDes();
			$nb=0;
			foreach($rows as $row){
				echo "<div class='hid' style='display:none'>".$row["des"]."</div>";
			}
			?>
	</div>
</div>

<aside style=" height:500px;text-align:center" class="main-container-banner col-xs-12">
	<main class="main-container-banner-content col-xs-12">
		<header class="main-container-banner-content-header col-xs-12">
			<h1> Lieux de tournages (<?= getCountry(); ?>) </h1>
		</header>
		<div class="col-xs-2"></div>
		<div id="map" class="col-xs-8" style=" height:400px">
		<div class="col-xs-2"></div>

</aside>
<ul style="display:none" id="lieux">
	<li>Abbaye de Lacock</li>
	<li>Cathédrale de Gloucester</li>
	<li>Ashridge Wood</li>
	<li>Collège de l’université d’Oxford</li>
	<li>Hardwick Hall</li>
	<li>Seven Sisters Country Park</li>
	<li>Malham Cove</li>
	<li>Gare de Goathland</li>
	<li>Cathédrale de Durham</li>
</ul>
</section>
