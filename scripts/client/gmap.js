function initMap(add) {
    var geocoder;
    var map;
    var x=0;
    var address;
      geocoder = new google.maps.Geocoder();
      var latlng = new google.maps.LatLng(-34.397, 150.644);
      var myOptions = {
        zoom: 5,
        center: latlng,
        mapTypeControl: true,
        mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
        },
        navigationControl: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      map = new google.maps.Map(document.getElementById("map"), myOptions);
          var address = [];
          for(var i=0;i<document.getElementById("lieux").getElementsByTagName("li").length;i++){
            address.push(document.getElementById("lieux").getElementsByTagName("li")[i].innerHTML);
          }
          console.log(address);
        $.each(address,function(i,v){
        geocoder.geocode({
          'address': v
        }, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
              map.setCenter(results[0].geometry.location);
    
              var infowindow = new google.maps.InfoWindow({
                size: new google.maps.Size(150, 50)
              });
              infowindow.setContent("<p style='color:black'>" +v+ "</p>");
              var marker = new google.maps.Marker({
                position: results[0].geometry.location,
                map: map,
                title: address
              });
              google.maps.event.addListener(marker, 'click', function() {
                infowindow.open(map, marker);
              });
    
            } else {
              alert("No results found");
            }
          } else {
            alert("Geocode was not successful for the following reason: " + status);
          }
        });
      });
      }
