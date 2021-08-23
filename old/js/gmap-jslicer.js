/*
 Constructor for the tooltip
 @ param options an object containing: marker(required), content(required) and cssClass(a css class, optional)
 @ see google.maps.OverlayView()
 */

function Tooltip(options) {

    // Now initialize all properties.
    this.marker_ = options.marker;
    this.content_ = options.content;
    this.map_ = options.marker.get('map');
    this.cssClass_ = options.cssClass || null;

    // We define a property to hold the content's
    // div. We'll actually create this div
    // upon receipt of the add() method so we'll
    // leave it null for now.
    this.div_ = null;

    //Explicitly call setMap on this overlay
    this.setMap(this.map_);
    var me = this;
    // Show tooltip on mouseover event.
    google.maps.event.addListener(me.marker_, 'mouseover', function () {
        me.show();
    });
    // Hide tooltip on mouseout event.
    google.maps.event.addListener(me.marker_, 'mouseout', function () {
        me.hide();
    });
}
// Now we extend google.maps.OverlayView()
Tooltip.prototype = new google.maps.OverlayView();

// onAdd is one of the functions that we must implement, 
// it will be called when the map is ready for the overlay to be attached.
Tooltip.prototype.onAdd = function () {

    // Create the DIV and set some basic attributes.
    var div = document.createElement('DIV');
    div.style.position = "absolute";
    // Hide tooltip
    div.style.visibility = "hidden";
    if (this.cssClass_)
        div.className += " " + this.cssClass_;

    //Attach content to the DIV.
    div.innerHTML = this.content_;

    // Set the overlay's div_ property to this DIV
    this.div_ = div;

    // We add an overlay to a map via one of the map's panes.
    // We'll add this overlay to the floatPane pane.
    var panes = this.getPanes();
    panes.floatPane.appendChild(this.div_);

}
// We here implement draw
Tooltip.prototype.draw = function () {

    // Position the overlay. We use the position of the marker
    // to peg it to the correct position, just northeast of the marker.
    // We need to retrieve the projection from this overlay to do this.
    var overlayProjection = this.getProjection();

    // Retrieve the coordinates of the marker
    // in latlngs and convert them to pixels coordinates.
    // We'll use these coordinates to place the DIV.
    var ne = overlayProjection.fromLatLngToDivPixel(this.marker_.getPosition());

    // Position the DIV.
    var div = this.div_;
    div.style.left = ne.x + 'px';
    div.style.top = ne.y + 'px';

}
// We here implement onRemove
Tooltip.prototype.onRemove = function () {
    this.div_.parentNode.removeChild(this.div_);
}

// Note that the visibility property must be a string enclosed in quotes
Tooltip.prototype.hide = function () {
    if (this.div_) {
        this.div_.style.visibility = "hidden";
    }
}

Tooltip.prototype.show = function () {
    if (this.div_) {
        this.div_.style.visibility = "visible";
    }
}

/**
 * GMap-JSlicer v0.1
 * Author: Matt Urtnowski
 * GitHub: https://github.com/Murtnowski/GMap-JSlicer
 *
 * Not Production Ready
 * For use as code sample only
 **/
 var places = [];
places.push({ infowin_html: '<div id="content"><div id="siteNotice"></div><h1 id="firstHeading" class="firstHeading">Empty Single Room</h1><div id="bodyContent"><p>The single bedrooms are small, efficient, and inexpensive. Each individual room features a single bed and a bedside table, with a woven rug on the floor. The single bedrooms are clean and well-kept, but offer only the barest amenities. Each room has a single oil lamp on the table, though guests can request additional candles for their rooms should they so need</p></div></div>', tooltip_html: "Empty Single Room", position: {lat: 82.63133285369295, lng: -92.8125}, zoom: [4]});
places.push({ infowin_html: places[places.length-1].infowin_html, tooltip_html: places[places.length-1].tooltip_html, position: {lat: 82.69865866056999, lng: -70.13671875}, zoom: [4]});
places.push({ infowin_html: places[places.length-1].infowin_html, tooltip_html: places[places.length-1].tooltip_html, position: {lat: 82.58610635020881, lng: -49.74609375}, zoom: [4,5]});
places.push({ infowin_html: places[places.length-1].infowin_html, tooltip_html: places[places.length-1].tooltip_html, position: {lat: 82.6538431108386, lng: -26.015625}, zoom: [4,5]});
places.push({ infowin_html: places[places.length-1].infowin_html, tooltip_html: places[places.length-1].tooltip_html, position: {lat: 57.70414723434193, lng: -70.6640625}, zoom: [4,5]});
places.push({ infowin_html: places[places.length-1].infowin_html, tooltip_html: places[places.length-1].tooltip_html, position: {lat: 57.51582286553883, lng: -27.59765625}, zoom: [4,5]});
places.push({ infowin_html: places[places.length-1].infowin_html, tooltip_html: places[places.length-1].tooltip_html, position: {lat: 57.326521225217064, lng: -5.9765625}, zoom: [4,5]});

places.push({ infowin_html: '<div id="content"><div id="siteNotice"></div><h1 id="firstHeading" class="firstHeading">Traveler\'s Room</h1><div id="bodyContent"><p>The single bedrooms are small, efficient, and inexpensive. Each individual room features a single bed and a bedside table, with a woven rug on the floor. The single bedrooms are clean and well-kept, but offer only the barest amenities. Each room has a single oil lamp on the table, though guests can request additional candles for their rooms should they so need</p></div></div>', tooltip_html: "Traveler\'s Room", position: {lat: 82.58610635020881, lng: -5.80078125}, zoom: [4,5]});

places.push({ infowin_html: '<div id="content"><div id="siteNotice"></div><h1 id="firstHeading" class="firstHeading">Traveler\'s Room</h1><div id="bodyContent"><p>The single bedrooms are small, efficient, and inexpensive. Each individual room features a single bed and a bedside table, with a woven rug on the floor. The single bedrooms are clean and well-kept, but offer only the barest amenities. Each room has a single oil lamp on the table, though guests can request additional candles for their rooms should they so need</p></div></div>', tooltip_html: "Traveler\'s Room", position: {lat: 57.51582286553883, lng: -49.74609375}, zoom: [4,5]});

places.push({ infowin_html: '<div id="content"><div id="siteNotice"></div><h1 id="firstHeading" class="firstHeading">Magistrate\'s Room</h1><div id="bodyContent"><p>The group rooms are the largest and most lavish rooms in the Golden Curtain. Usually reserved for noblemen, extremely wealthy merchants, and other honored guests, the group rooms are designed to sleep up to six people comfortably. Each room has a large bed (that could sleep three, but is typically only used for two people) as well as four single beds. The entire floor is covered in animal-fur rugs, and beautiful velvet curtains line the walls, hiding the wooden planks behind and giving a greater sense of luxury. Each group room has a table that seats four, two chests of drawers, a full-length mirror, a brass bathing tub and privacy screen, and a small reading table. </p></div></div>', tooltip_html: "Magistrate\'s Room", position: {lat: 75.0956327285438, lng: -66.97265625}, zoom: [4,5]});

places.push({ infowin_html: '<div id="content"><div id="siteNotice"></div><h1 id="firstHeading" class="firstHeading">Empty Group Room</h1><div id="bodyContent"><p>The group rooms are the largest and most lavish rooms in the Golden Curtain. Usually reserved for noblemen, extremely wealthy merchants, and other honored guests, the group rooms are designed to sleep up to six people comfortably. Each room has a large bed (that could sleep three, but is typically only used for two people) as well as four single beds. The entire floor is covered in animal-fur rugs, and beautiful velvet curtains line the walls, hiding the wooden planks behind and giving a greater sense of luxury. Each group room has a table that seats four, two chests of drawers, a full-length mirror, a brass bathing tub and privacy screen, and a small reading table. </p></div></div>', tooltip_html: "Empty Group Room", position: {lat: 75.00494000767517, lng: -38.3203125}, zoom: [4,5]});

places.push({ infowin_html: '<div id="content"><div id="siteNotice"></div><h1 id="firstHeading" class="firstHeading">Faddin\'s Room</h1><div id="bodyContent"><p> A wealthy merchant by the name of Faddin (male human expert 3), his assistant (male elf commoner 1), and his three caravan guards (male human warrior 1).  The group rooms are the largest and most lavish rooms in the Golden Curtain. Usually reserved for noblemen, extremely wealthy merchants, and other honored guests, the group rooms are designed to sleep up to six people comfortably. Each room has a large bed (that could sleep three, but is typically only used for two people) as well as four single beds. The entire floor is covered in animal-fur rugs, and beautiful velvet curtains line the walls, hiding the wooden planks behind and giving a greater sense of luxury. Each group room has a table that seats four, two chests of drawers, a full-length mirror, a brass bathing tub and privacy screen, and a small reading table. </p></div></div>', tooltip_html: "Faddin\'s Room", position: {lat: 74.86788912917916, lng: -8.4375}, zoom: [4,5]});

places.push({ infowin_html: '<div id="content"><div id="siteNotice"></div><h1 id="firstHeading" class="firstHeading">Empty Double Room</h1><div id="bodyContent"><p>The double bedrooms are not much larger than the single rooms and are occasionally rented out to individuals who just want a little more space. They include two single beds (pushed against opposite walls), a small table, and a chest of drawers. Each double bedroom has a woven rug on the floor and thick curtains that can be closed to block out light during the day. </p></div></div>', tooltip_html: "Empty Double Room", position: {lat: -34.59704151614417, lng: -72.421875}, zoom: [4,5]});

places.push({ infowin_html: places[places.length-1].infowin_html, tooltip_html: places[places.length-1].tooltip_html, position: {lat: -34.016241889667015, lng: -50.625}, zoom: [3,4,5]});


 places.push({ infowin_html: '<div id="content"><div id="siteNotice"></div><h1 id="firstHeading" class="firstHeading">Married Couple\'s Room</h1><div id="bodyContent"><p>The double bedrooms are not much larger than the single rooms and are occasionally rented out to individuals who just want a little more space. They include two single beds (pushed against opposite walls), a small table, and a chest of drawers. Each double bedroom has a woven rug on the floor and thick curtains that can be closed to block out light during the day. </p></div></div>', tooltip_html: "Married Couple\'s Room", position: {lat: -34.016241889667015, lng: -28.125}, zoom: [3,4,5]});



 places.push({ infowin_html: '<div id="content"><div id="siteNotice"></div><h1 id="firstHeading" class="firstHeading">Sarelda\'s Room</h1><div id="bodyContent"><p>The double bedrooms are not much larger than the single rooms and are occasionally rented out to individuals who just want a little more space. They include two single beds (pushed against opposite walls), a small table, and a chest of drawers. Each double bedroom has a woven rug on the floor and thick curtains that can be closed to block out light during the day. </p></div></div>', tooltip_html:"Sarelda\'s Room", position: {lat: -34.88593094075314, lng: -6.328125}, zoom: [3,4,5]});


 places.push({ infowin_html: '<div id="content"><div id="siteNotice"></div><h1 id="firstHeading" class="firstHeading">Phelain\'s Room</h1><div id="bodyContent"><p>The double bedrooms are not much larger than the single rooms and are occasionally rented out to individuals who just want a little more space. They include two single beds (pushed against opposite walls), a small table, and a chest of drawers. Each double bedroom has a woven rug on the floor and thick curtains that can be closed to block out light during the day. </p></div></div>', tooltip_html:"Phelain\'s Room", position: {lat: 36.597889133070225, lng: -5.9765625}, zoom: [3,4,5]});



 places.push({ infowin_html: '<div id="content"><div id="siteNotice"></div><h1 id="firstHeading" class="firstHeading">Theomar\'s Room</h1><div id="bodyContent"><p>The double bedrooms are not much larger than the single rooms and are occasionally rented out to individuals who just want a little more space. They include two single beds (pushed against opposite walls), a small table, and a chest of drawers. Each double bedroom has a woven rug on the floor and thick curtains that can be closed to block out light during the day. </p></div></div>' , tooltip_html:"Theomar\'s Room" , position: {lat: 9.795677582829745, lng: -5.9765625}, zoom: [3,4,5]});



 places.push({ infowin_html: '<div id="content"><div id="siteNotice"></div><h1 id="firstHeading" class="firstHeading">Cecilia and Boral\'s Room</h1><div id="bodyContent"><p>The four-guest rooms are intended to house up to four people simultaneously. Though sometimes individual guests will room in these rooms with strangers (especially in times when the roadhouse is busy), these rooms are more often reserved for nobles and merchants traveling with family or aides. Each fourguest room features a double bed and two single beds, a chest of drawers, an animal-fur rug, a brass bathing tub (with a privacy screen), and a small table with two chairs. </p></div></div>', tooltip_html:"Cecilia and Boral\'s Room", position: {lat: 21.616579336740607, lng: -71.015625}, zoom: [3,4,5]});



 places.push({ infowin_html: '<div id="content"><div id="siteNotice"></div><h1 id="firstHeading" class="firstHeading">Drango and Caesar\'s Room</h1><div id="bodyContent"><p>The four-guest rooms are intended to house up to four people simultaneously. Though sometimes individual guests will room in these rooms with strangers (especially in times when the roadhouse is busy), these rooms are more often reserved for nobles and merchants traveling with family or aides. Each fourguest room features a double bed and two single beds, a chest of drawers, an animal-fur rug, a brass bathing tub (with a privacy screen), and a small table with two chairs. </p></div></div>', tooltip_html:"Drango and Caesar\'s Room", position: {lat: 20.96143961409684, lng: -49.5703125}, zoom: [3,4,5]});



 places.push({ infowin_html: '<div id="content"><div id="siteNotice"></div><h1 id="firstHeading" class="firstHeading">The Common Room</h1><div id="bodyContent"><p>The common room of the Golden Curtain is a clean and well-lit area that provides a communal place for guests to dine and drink. Read or paraphrase the following description aloud to the players upon entering the common room for the first time: </p><p><i>Immediately upon entering the front doors of the Golden Curtain, a welcoming and friendly sight greets your eyes. The common room of the inn is clean and warm, with a roaring fire burning in the fireplace and the soft light of dozens of oil lamps illuminating the room. The great pelt of a dire bear serves as a carpet for a large section of the room, and numerous mounted animal heads decorate the walls. A large bar dominates the rear corner of the room, stocked with kegs of ale and a considerable array of liquors, and a set of ascending stairs leads from the left side of the room up to the second floor. A set of swinging double doors to the right obviously leads to the kitchen, while another door can be seen in the left wall at the foot of the stairs. </i> </p></div></div>' , tooltip_html:"The Common Room", position: {lat: -74.49641311694307, lng: -17.2265625}, zoom: [2,3]});


 places.push({ infowin_html: '<div id="content"><div id="siteNotice"></div><h1 id="firstHeading" class="firstHeading">Private Dining Room</h1><div id="bodyContent"><p>The Golden Curtain has a pair of private dining rooms used by large groups that wish to have a little peace and quiet while enjoying their meals. Typically, Cecilia charges customers 5 gp per guest for the use of a private dining room for the evening, which includes a grand meal and a selection of high-quality beverages, as well as the service of an individual serving girl for the evening. Read the following description aloud to the players upon entering one of the private dining rooms for the first time: </p><p><i>A large oak table dominates the center of this room, flanked on either side by a row of cushion-backed chairs and covered with a thin cotton tablecloth. Two candelabras sit on the dining table, their candles slowly burning and sending droplets of wax down the metal stand. Plates and cups have been arranged on the table in preparation for a feast, and a large and ornate tapestry covers one wall. </i> </p></div></div>', tooltip_html:"Private Dining Room", position: {lat: -81.20141954209073, lng: -91.40625}, zoom: [2,3]});

places.push({ infowin_html: places[places.length-1].infowin_html, tooltip_html: places[places.length-1].tooltip_html, position: {lat: -77.9890486243739, lng: -89.296875}, zoom: [2,3]});


 places.push({ infowin_html: '<div id="content"><div id="siteNotice"></div><h1 id="firstHeading" class="firstHeading">Performance Hall</h1><div id="bodyContent"><p>The greater part of the Golden Curtain’s reputation comes from its performance hall. Originally designed as a large dining hall and ballroom, the room was converted into a small theater once word of the amazing performances given at the roadhouse spread. Though the Vagabond Players are the intended performers for the evening, the performance hall has been empty for several days, as no performers have been staying at the inn. On any given night, however, traveling performers (including bards, actors, singers, and other entertainers) are always welcome to give shows in the performance hall, with the blessing of Cecilia and her husband. Thanks to the roadhouse’s reputation, wealthy visitors are usually eager to see a performance, granting any bards (or other entertainers) a +4 circumstance bonus to any Perform checks made to earn money from a performance given in the Golden Curtain. Read the following description aloud to the players upon entering the performance hall for the first time.</p><p><i>This large open room features a raised wooden stage set against the back wall and facing several rows of chairs. The stage features beautiful crimson velvet curtains that separate the front of the stage from the back. The audience seats sit on progressively taller wooden slats, creating a tiered seating arrangement similar to that seen in grander theaters. A few paintings, obviously scenes from famous plays, decorate the side walls, while a large harp and stool sit off to one side, intended for use in accompanying a performance. Oil lamps along the walls provide faint illumination for the audience, while much larger lanterns (their light amplified by glass lenses) cast bright light across most of the stage</i> </p><p>Upon the party’s arrival, Theomar and his troupe begin setting up for their performance, decorating the stage and even going so far as to hang tapestries from the wall, all supposedly in the name of preparing for the show. They do not allow any other staff or patrons (including the party) to intrude on their preparations, demanding they be given the privacy they need to properly set the stage for what is sure to be an epic performance. </p></div></div>' , tooltip_html:"Performance Hall", position: {lat: -67.60922060496382, lng: -89.6484375}, zoom: [2,3]});


  places.push({ infowin_html: '<div id="content"><div id="siteNotice"></div><h1 id="firstHeading" class="firstHeading">Kitchen</h1><div id="bodyContent"><p>The head cook, Kakir, keeps his kitchen in immaculate shape. A large iron stove rests next to a fireplace, sending its smoke out a tube and up through the chimney. Pots and pans dangle from hooks on the walls, and something is constantly cooking. In order to keep the kitchen so tidy, however, Kakir only allows Cecilia, Boral, and the three serving girls to enter the kitchen. Any attempts by the PCs to enter are met by threats and a disgruntled dwarf cook waving a wooden spoon menacingly at them. Though eccentric, Kakir is also an excellent chef, and every night he creates meals that would be considered a delicacy in many cities. Even simple foods, such as stews or roasts, are spiced to perfection and served fresh to all visitors. Kakir may be a bit odd, but he has nothing to hide, and a search of the kitchen reveals only foodstuffs, spices, and cooking utensils. </p></div></div>', tooltip_html:"Kitchen", position: {lat: -80.35699541661765, lng: 39.0234375}, zoom: [2,3]});


  places.push({ infowin_html: '<div id="content"><div id="siteNotice"></div><h1 id="firstHeading" class="firstHeading">Storage</h1><div id="bodyContent"><p>The storage room, attached to the kitchen, houses the bulk of the roadhouse’s supplies. Kegs of ale are stacked up against the walls, while salted meats and preserved foods line the shelves and hang from the ceiling. In addition to food, the storage room also holds supplies for the guests, including linens and bed sheets, pitchers, water tubs, and other amenities. The room is kept dark and cool to help preserve foods, and no one is allowed into the storage room without permission. </p></div></div>', tooltip_html:"Storage", position: {lat: -74.49641311694307, lng: 38.3203125}, zoom: [2,3,4]});


 places.push({ infowin_html: '<div id="content"><div id="siteNotice"></div><h1 id="firstHeading" class="firstHeading">Stable Stalls</h1><div id="bodyContent"><p>Since the Golden Curtain is a roadhouse, many visitors need a place to stable their horses and hitch their carriages. Individual horses are kept in the single stable stalls, each one with a hay-lined floor and a five-foot-high wooden divider separating it from the next stall. </p></div></div>', tooltip_html:"Stable Stalls", position: {lat: -74.86788912917916, lng: 104.0625}, zoom: [2,3,4]});


 places.push({ infowin_html: '<div id="content"><div id="siteNotice"></div><h1 id="firstHeading" class="firstHeading">Large Stall</h1><div id="bodyContent"><p>The large stalls in the stable are used to house teams of horses that are accustomed to staying together. Each large stall can house up to four horses, though often these stalls are used for cleaning and grooming an individual horse, giving the stableboys room to move around. The floors are lined with hay, and two large metal bars on either side of the swinging gate block entry into the large stalls. </p></div></div>' , tooltip_html:"Large Stall", position: {lat: -76.18499546094715, lng: 76.640625}, zoom: [2,3,4]});



 places.push({ infowin_html: '<div id="content"><div id="siteNotice"></div><h1 id="firstHeading" class="firstHeading">Stable Storage</h1><div id="bodyContent"><p>The stable storage rooms are where all of the Golden Curtain’s stable equipment is kept. Inside one will find tack, saddles, blankets, feed and feedbags, and small amounts of fresh fruit (used to reward horses for good behavior). </p></div></div>', tooltip_html:"Stable Storage", position: {lat: -61.77312286453145, lng: 81.5625}, zoom: [2,3,4,5]});
              var lastOpenInfoWin = null;
     
function createInfoWindow(marker, key) {
              //create an infowindow for this marker
              var infowindow = new google.maps.InfoWindow({
                  content: places[key].infowin_html,
                  maxWidth: 350
              });
              //open infowindo on click event on marker.
              google.maps.event.addListener(marker, 'click', function () {
                if(infowindow.position == marker.position && infowindow.anchor) infowindow.close();
                else {
                  if (lastOpenInfoWin) lastOpenInfoWin.close();
                  lastOpenInfoWin = infowindow;
                  infowindow.open(marker.get('map'), marker);
                  }
              });
          }
          // Here is where we create a tooltip for each marker,
          // with content set to plcaes[placeindex].tooltip_html
function createTooltip(marker, key) {
              //create a tooltip
              var tooltipOptions = {
                  marker: marker,
                  content: places[key].tooltip_html,
                  cssClass: 'tooltip' // name of a css class to apply to tooltip
              };
              var tooltip = new Tooltip(tooltipOptions);
          }

function JSlicer(target, src) {
    this.img;
    this.target = target;
    this.src = src;
    this.centreLat = 0.0;
    this.centreLon = 0.0;
    this.initialZoom = 3;
    this.imageWraps = false;
    this.gmicMapType;
}

function GMICMapType(img) {
    this.sourceImg = img;
    this.Cache = Array();
    this.opacity = 1.0;
}
    
(function() {        
    JSlicer.prototype.init = function init() {
        var that = this;
        
        var downloadAsset = function(src, callback) {
            if(!this.img) {
                var img = document.createElement('img');
                
                img.onerror = function() {
                    console.log(src + ' failed to load');
                    if(callback) {
                        callback(false);
                    }
                };

                img.onload = function() {
                    var canvas = document.createElement('canvas'); 
                    var dimension = Math.max(img.width, img.height);
                    canvas.width = dimension;
                    canvas.height = dimension;
                    var ctx = canvas.getContext("2d");
                    ctx.drawImage(img, (dimension - img.width) / 2, (dimension - img.height) / 2);
                    
                    
                    img.onload = function() {
                        console.log(arguments.callee);
                        console.log(img.onload);
                        img.removeEventListener('onload', arguments.callee, false);
                        that.img = img;
                        if(callback) {
                            callback(img);
                        }
                    };
                    
                    img.src = canvas.toDataURL();
                };
                
                img.src = src;
            } else {
                if(callback) {
                    callback(this.img);
                }
            }
        };
        
        var load =  function() {
            that.resizeMapDiv();
            var latlng = new google.maps.LatLng(that.centreLat, that.centreLon);
            var myOptions = {
                zoom: that.initialZoom,
                minZoom: 2,
                maxZoom: 5,
                center: latlng,
                panControl: true,
                zoomControl: true,
                mapTypeControl: false,
                scaleControl: false,
                streetViewControl: false,
                overviewMapControl: false,
                mapTypeControlOptions: { 
                    mapTypeIds: ["GameMap"],
                    position: google.maps.ControlPosition.TOP_RIGHT,
                    style: google.maps.MapTypeControlStyle.DEFAULT
                },
            mapTypeId: "GameMap"
            }
            
            map = new google.maps.Map(that.target, myOptions);
            gmicMapType = new GMICMapType(that.img);
            map.mapTypes.set("GameMap",gmicMapType);

        if(!that.imageWraps) that.setBounds();
                
        google.maps.event.addListener(map, 'click', function(event) {
            lastOpenInfoWin.close();
        });

        google.maps.event.addListener(map, 'zoom_changed', function() {
            zoomLevel = map.getZoom();
                for (var i = 0; i < places.length; i++) {
                     if(places[i].zoom.indexOf(zoomLevel) && toggle) places[i].marker.setVisible(true);
                     else places[i].marker.setVisible(false);
                 } 
        });

        for (var key in places) {
              var myPlace = places[key];
              if (myPlace.position) {
                  places[key].marker = new google.maps.Marker({
                      map: map,
                      icon: "note.png",
                      position: new google.maps.LatLng(myPlace.position.lat, myPlace.position.lng)
                  });
                  createInfoWindow(places[key].marker, key);
                  createTooltip(places[key].marker, key);
                zoomLevel = map.getZoom();
                     if(!places[key].zoom.indexOf(zoomLevel)) places[key].marker.setVisible(false);
               }
          }

        };

        downloadAsset(this.src, function() {
            load();
        });
    };
    
    JSlicer.prototype.resizeMapDiv = function resizeMapDiv() {
        var d = this.target;

        var offsetTop = 0;
        for (var elem = d; elem != null; elem = elem.offsetParent) {
            offsetTop += elem.offsetTop;

        }
        
        var height = getWindowHeight() - offsetTop - 16;

        if (height>=0) {
            d.style.height=height+"px";
        }
    };
    
    JSlicer.prototype.setBounds = function setBounds() {
        var allowedBounds = new google.maps.LatLngBounds(
             new google.maps.LatLng(-85.0, -110.0), 
             new google.maps.LatLng(85.0, 110.0)
        );
        
        var lastValidCenter = map.getCenter();
        
        google.maps.event.addListener(map, 'center_changed', function() {
            if (allowedBounds.contains(map.getCenter())) {
                lastValidCenter = map.getCenter();
                return; 
            }
            
            map.panTo(lastValidCenter);
        });
    };
    
    JSlicer.prototype.redraw = function redraw() {
        var zoom = map.getZoom();
        map.setZoom(0);
        setTimeout(function(){map.setZoom(zoom);}, 0);
    };

    GMICMapType.prototype.tileSize = new google.maps.Size(256, 256);
    GMICMapType.prototype.maxZoom = 19;
    GMICMapType.prototype.getTile = function(coord, zoom, ownerDocument) {
        var c = Math.pow(2, zoom);
        var tilex=coord.x,tiley=coord.y;
        if (this.imageWraps) {
            if (tilex<0) tilex=c+tilex%c;
            if (tilex>=c) tilex=tilex%c;
            if (tiley<0) tiley=c+tiley%c;
            if (tiley>=c) tiley=tiley%c;
        }
        else {
            if ((tilex<0)||(tilex>=c)||(tiley<0)||(tiley>=c))
            {
                var blank = ownerDocument.createElement('DIV');
                blank.style.width = this.tileSize.width + 'px';
                blank.style.height = this.tileSize.height + 'px';
                return blank;
            }
        }

        var img = ownerDocument.createElement('img');

        img.id = "t_" + zoom + "_" + tilex + "_" + tiley;
        img.style.width = this.tileSize.width + 'px';
        img.style.height = this.tileSize.height + 'px';

        var canvas = ownerDocument.createElement('canvas'); 
        canvas.width = this.tileSize.width;
        canvas.height = this.tileSize.height
        var ctx = canvas.getContext("2d");
        ctx.drawImage(this.sourceImg, this.sourceImg.width / Math.pow(2, zoom) * tilex, this.sourceImg.height / Math.pow(2, zoom) * tiley, this.sourceImg.width / Math.pow(2, zoom), this.sourceImg.height / Math.pow(2, zoom), 0, 0, this.tileSize.width, this.tileSize.height);
        img.src = canvas.toDataURL();

        this.Cache.push(img);

        return img;
    };
    
    GMICMapType.prototype.realeaseTile = function(tile) {
        var idx = this.Cache.indexOf(tile);
        if(idx!=-1) this.Cache.splice(idx, 1);
        tile=null;
    };
    
    GMICMapType.prototype.name = "GMap-JSlicer";
    GMICMapType.prototype.alt = "GMap-JSlicer";
    GMICMapType.prototype.setOpacity = function(newOpacity) {
        this.opacity = newOpacity;
        for (var i = 0; i < this.Cache.length; i++) {
            this.Cache[i].style.opacity = newOpacity;
            this.Cache[i].style.filter = "alpha(opacity=" + newOpacity * 100 + ")"; //ie
        }
    };
    
    getWindowHeight = function() {
        if (window.self&&self.innerHeight) {
            return self.innerHeight;
        }
        if (document.documentElement&&document.documentElement.clientHeight) {
            return document.documentElement.clientHeight;
        }
        return 0;
    };
 })();