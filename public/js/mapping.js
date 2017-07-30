/* globals $ google*/

(() => {
    $.ajax({
        method: 'GET',
        url: '/map/loadAuthMapData',
        success: (data) => {
            if (data.shops.length || data.users.length) {
                console.log(data);
                initMap(data);
            } else {
                createNoContentMsg();
            }
        }
    });

    function initMap(data) {
        const myOptions = {
            zoom: 12,
            panControl: false,
            zoomControl: false,
            mapTypeControl: false,
            streetViewControl: false,
            center: {
                lat: 42.69763969,
                lng: 23.32187176
            },
            mapTypeId: google.maps.MapTypeId.ROADMAP,
        };

        var map = new google.maps.Map(document.getElementById('map'), myOptions);
        var geocoder = new google.maps.Geocoder();
        let bounds = new google.maps.LatLngBounds();

        for (let prop in data) {
            let arrayOfObjs = data[prop];

            if(arrayOfObjs.length > 0) {
                createMapWithMarkers(prop, arrayOfObjs);
            }
        }
        // map.fitBounds(bounds);


        function createMapWithMarkers(property, items) {
            for (var i = 0; i < items.length; i++) {
                var obj = {};
                if (property === 'shops') {
                    obj.property = property;
                    obj.address = items[i].address;
                    obj.title = items[i].name;
                    obj.url = '/shop/' + items[i]._id;
                    obj.urlText = 'Visit shop page.';
                    obj.icon = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
                    geocodding(obj, geocoder, map, bounds);
                } else {
                    obj.property = property;
                    obj.address = items[i].address;
                    obj.title = items[i].username;
                    obj.tripshops = items[i].tripshops;
                    obj.initialUrl = '/tripshops/';
                    obj.urlText = 'Start ordering from ';
                    obj.icon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
                    geocodding(obj, geocoder, map, bounds);
                }
            }
        }
    }


    function geocodding(obj, geocoder, map, bounds) {
        geocoder.geocode({
            'address': obj.address
        }, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                for (let j = 0; j < results.length; j++) {
                    const marker = new google.maps.Marker({
                        position: results[j].geometry.location,
                        map: map,
                        title: obj.title,
                        icon: obj.icon
                    });

                    let content;
                    if (obj.property === 'shops') {
                        content =
                            '<h4>' +
                                marker.title +
                            '</h4>' +
                            '<a href=' +
                                obj.url +'>' +
                                obj.urlText +
                            '</a>';
                    } else {
                        str = [];

                        let header =
                            '<h3>' +
                                marker.title +
                                ' goes to:' +
                            '</h3>';
                        str.push(header);

                        for (var i = 0; i < obj.tripshops.length; i++) {
                            let body =
                                '<h4>' +
                                    obj.tripshops[i].shop.name +
                                '</h4>';

                            str.push(body);

                            let url =
                                '<a href=' +
                                obj.initialUrl +
                                obj.tripshops[i]._id +
                                '>' +
                                obj.urlText +
                                obj.tripshops[i].shop.name +
                                '</a>';
                            str.push(url);
                        }

                        content = str.join('');
                    }

                    google.maps.event.addListener(
                        marker,
                        'click',
                        getInfoCallback(map, content));
                }

                function getInfoCallback(map, content) {
                    let infowindow = new google.maps.InfoWindow({
                        content: content
                    });

                    return function() {
                        infowindow.setContent(content);
                        infowindow.open(map, this);
                    };
                }

                bounds.extend(results[0].geometry.location);
                // map.fitBounds(bounds);
            } else {
                alert('Geocode of ' + obj.address + ' failed,' + status);
            }
        });
    }

    function createNoContentMsg() {
        $('#map').append(
            '<h3 class="text-center">Still no content to show! ' +
            'We are at the beginning! Return back soon!</h3>');
    }
})();