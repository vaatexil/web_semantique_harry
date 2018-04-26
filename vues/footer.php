
<script type="text/javascript" src="/libsjs/jquery.min.js"></script>
<script type="text/javascript" src="/libsjs/bootstrap.min.js"></script>
<script type="text/javascript" src="/scripts/jsonUse.js"></script>
<script async defer
src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB-fQXLsusCmGgBknatKfcmxXzrB9WOfRE&callback=initMap">
</script>
<script src="/scripts/client/gmap.js"></script>
		
<script>
function fc(xd){
    document.getElementById("content").innerHTML=document.getElementsByClassName("hid")[xd].innerHTML;
}
        var el=document.getElementsByClassName("click");
        for(var x=0;x<el.length;x++){
          el[x].addEventListener("click",fc.bind(this,x),false);
        }
</script>

</body>
</html>
