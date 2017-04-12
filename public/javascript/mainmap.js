var geocoder;
var map;
var marker;
var infowindow;



function initMap() {
	geocoder = new google.maps.Geocoder();
	var coblong = {lat: -6.884436, lng: 107.6158881};
	infowindow =  new google.maps.InfoWindow({
		size: new google.maps.Size(150, 50)
	});
	
	map = new google.maps.Map(document.getElementById('mainmap'), {
	  zoom: 13,
	  center: coblong
	});
	var myLatlng = new google.maps.LatLng(-6.884436,107.6158881);
	marker = new google.maps.Marker({
        map: map,
        draggable: true,
        position: myLatlng
      });
    geocodePosition(myLatlng);
    google.maps.event.addListener(marker, 'dragend', function() {
        geocodePosition(marker.getPosition());
      });
      google.maps.event.addListener(marker, 'click', function() {
        if (marker.formatted_address) {
          infowindow.setContent(marker.formatted_address + "<br>coordinates: " + marker.getPosition().toUrlValue(6));
        } else {
          infowindow.setContent(address + "<br>coordinates: " + marker.getPosition().toUrlValue(6));
        }
        infowindow.open(map, marker);
      });
	
}


function geocodePosition(pos) {
  geocoder.geocode({
    latLng: pos
  }, function(responses) {
    if (responses && responses.length > 0) {
      marker.formatted_address = responses[0].formatted_address;
    } else {
      marker.formatted_address = 'Cannot determine address at this location.';
    }
    infowindow.setContent(marker.formatted_address + "<br>coordinates: " + marker.getPosition().toUrlValue(6));
    infowindow.open(map, marker);
  });
}

function codeAddress() {
  var address = document.getElementById('address').value;
  geocoder.geocode({
    'address': address
  }, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      if (marker) {
        marker.setMap(null);
        if (infowindow) infowindow.close();
      }
      marker = new google.maps.Marker({
        map: map,
        draggable: true,
        position: results[0].geometry.location
      });
      google.maps.event.addListener(marker, 'dragend', function() {
        geocodePosition(marker.getPosition());
      });
      google.maps.event.addListener(marker, 'click', function() {
        if (marker.formatted_address) {
          infowindow.setContent(marker.formatted_address + "<br>coordinates: " + marker.getPosition().toUrlValue(6));
        } else {
          infowindow.setContent(address + "<br>coordinates: " + marker.getPosition().toUrlValue(6));
        }
        infowindow.open(map, marker);
      });
      google.maps.event.trigger(marker, 'click');
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}
