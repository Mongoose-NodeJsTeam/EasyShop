(()=> {
    const shops = [
        {
            name: 'Billa',
            latitude: 42.68915477,
            longitude: 23.32172692
        },
        {
            name: 'Fantastiko',
            latitude: 42.68924151,
            longitude: 23.32354009
        },
        {
            name: 'Penny',
            latitude: 42.685974,
            longitude: 23.321786
        },
        {
            name: 'Kaufland',
            latitude: 42.645917,
            longitude: 23.379174
        }
    ];

    let bounds = new google.maps.LatLngBounds();

    let center = [42.69763969, 23.32187176];

    var infowindow = new google.maps.InfoWindow(),
        marker,
        i;

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: center
    });

    for (var i = 0; i < shops.length; i++) {
        let position = new google.maps.LatLng(shops[i].latitude, shops[i].longitude);
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: shops[i].name
        });

        let content = '<h4>' + marker.title + '</h4>' + '<a href="#">Visit shop page</a>';

        google.maps.event.addListener(marker, 'click', getInfoCallback(map, content));

        function getInfoCallback(map, content) {
            var infowindow = new google.maps.InfoWindow({content: content});
            return function() {
                infowindow.setContent(content);
                infowindow.open(map, this);
            };
        }

        // Automatically center the map fitting all markers on the screen
        map.fitBounds(bounds);
    }









})();