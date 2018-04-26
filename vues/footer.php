
<script type="text/javascript" src="/libsjs/jquery.min.js"></script>
<script type="text/javascript" src="/libsjs/bootstrap.min.js"></script>

<?php $actual_link = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]"; 
if(strpos($actual_link,"Harry")!=false){
  echo '<script async defer
  src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB-fQXLsusCmGgBknatKfcmxXzrB9WOfRE&callback=initMap">
  </script>
  <script src="/scripts/client/gmap.js"></script>';
}
else{
  echo '<script src="/scripts/client/autocomplete.js"></script>';

}
?>




</body>
</html>
