'use strict';
angular.module('myApp.services', [])

.factory('mainFactory', ['$http',
    function($http) {

        return {
            setShowFile: function(pageData) {
                console.log(pageData);
                return $http.post('/api/main/setshowfile', pageData);
            }
        };
    }
])

.factory('storyService', ['$http',
    function($http) {
        var timelines;
        var story;
        var stories;
        Date.prototype.isLeapYear = function() {
            var year = this.getFullYear();
            if((year & 3) != 0) return false;
            return ((year % 100) != 0 || (year % 400) == 0);
        };

        // Get Day of Year
        Date.prototype.getDOY = function() {
            var dayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
            var mn = this.getMonth();
            var dn = this.getDate();
            var dayOfYear = dayCount[mn] + dn;
            if(mn > 1 && this.isLeapYear()) dayOfYear++;
            return dayOfYear;
        };

        function onTOSelect(type){
            var tmpEvent;
            if(type=="event"){
                if(typeof timelines.events.getSelection()[0] == 'undefined') return;
                tmpEvent = timelines.events.getData().Nf[timelines.events.getSelection()[0].row].c;
            } 
            if(type=="era"){
                if(typeof timelines.eras.getSelection()[0] == 'undefined') return;
                tmpEvent = timelines.eras.getData().Nf[timelines.eras.getSelection()[0].row].c;
            if(tmpEvent[3].v.toLowerCase() != "era") return;
            } 
            timelines.TO = {};
            timelines.TO.title = tmpEvent[2].v;
            timelines.TO.type = type;
            timelines.TO.start_date = new Date(tmpEvent[0].v);
            timelines.TO.start = {};
            timelines.TO.end = {};
            timelines.TO.start.year = timelines.TO.start_date.getFullYear();
            if(tmpEvent[1].v){
                timelines.TO.end_date = new Date(tmpEvent[1].v);
                timelines.TO.end.year = timelines.TO.end_date.getFullYear();
            }
            timelines.calculateDate();
        }

        function onTOSelectEvent(){onTOSelect('event');}

        function onTOSelectEra(){onTOSelect('era');}

        function onEventChange() {
            var range1 = timelines.events.getVisibleChartRange();
            var range2 = timelines.eras.getVisibleChartRange();
            var gap = range2.end-range2.start;
            range1.middle = range1.start.getTime()+((range1.end-range1.start)/2);
            range2.start = new Date(range1.middle - (gap/2));
            range2.end = new Date(range1.middle + (gap/2));
            timelines.eras.setVisibleChartRange(range2.start, range2.end);
        }

        function onEraChange() {
            var range1 = timelines.eras.getVisibleChartRange();
            var range2 = timelines.events.getVisibleChartRange();
            var gap = range2.end-range2.start;
            range1.middle = range1.start.getTime()+((range1.end-range1.start)/2);
            range2.start = new Date(range1.middle - (gap/2));
            range2.end = new Date(range1.middle + (gap/2));
            timelines.events.setVisibleChartRange(range2.start, range2.end);
        }

        return {

        getStories: function(){
            var that = this;
            $http.post('/api/story/getStories', {}).then(function(response) {
                that.stories = response.data;
                }, function(err) {});
        },
        loadStory: function(story,index){
            console.log(story);
            this.story = story;
            this.story.index = index;
            console.log(this);
        },  
        saveStory: function(story){
            $http.post('/api/story/updateStory', story).then(function(response) {
                console.log(response);
            }, function(err) {});
        },     
        newStory: function(){
            $http.post('/api/story/addStory', {}).then(function(response) {
                this.stories.push({"id": response.data, "title": "New Story", "content":""});
            console.log(this.stories);
            }, function(err) {});
        },  
        deleteStory: function(id){
            if(!confirm("Are you sure?\nThis cannot be undone.")) return;
            $http.post('/api/story/deleteStory', {"id":id}).then(function(response) {
                this.stories.splice(this.story.index,1);
                this.story = [];
            }, function(err) {});
        },
        calculateDate: function(){
                console.log(timelines);
                if(timelines.dateFormat == 'month'){
                    timelines.TO.start.month = timelines.TO.start_date.getMonth();
                    timelines.TO.start.day = timelines.TO.start_date.getDate();
                    if(timelines.TO.end_date){
                    timelines.TO.end.month = timelines.TO.end_date.getMonth();
                    timelines.TO.end.day = timelines.TO.end_date.getDate();
                    }
                }
                else{
                    timelines.TO.start.month = 0;
                    timelines.TO.start.day = timelines.TO.start_date.getDOY();
                    if(timelines.TO.end_date){
                    timelines.TO.end.month = 0;
                    timelines.TO.end.day = timelines.TO.end_date.getDOY();
                    }
                }

            },
        createTimelines: function(id1,id2) {
            // Create and populate a data table.
            var data1 = new google.visualization.DataTable();

            data1.addColumn('datetime', 'start');
            data1.addColumn('datetime', 'end');
            data1.addColumn('string', 'content');

            data1.addRows([
                [new Date(2010,7,23), , 'Conversation'],
                [new Date(2010,7,23,23,0,0), , 'Mail from boss'],
                [new Date(2010,7,24,16,0,0), , 'Report'],
                [new Date(2010,7,26), new Date(2010,8,2), 'Traject A'],
                [new Date(2010,7,28), , 'Memo'],
                [new Date(2010,7,29), , 'Phone call'],
                [new Date(2010,7,31), new Date(2010,8,3), 'Traject B'],
                [new Date(2010,8,1,12,0,0), , 'Report']
            ]);

            // specify options
            var options1 = {width:  "100%",
                'minHeight':'200',
                'showCurrentTime':false,
                layout: "box",
                'zoomMax': 157790000000,
                'zoomMin': 1314900000
            };
            timelines = {};
            this.timelines = timelines;
           timelines.TO = {};
           timelines.dateFormat = 'month';
           timelines.TOArray = [];
           timelines.onTOSelect = this.onTOSelect;
           timelines.onEventChange = this.onEventChange;
           timelines.onEraChange = this.onEraChange;
           timelines.calculateDate = this.calculateDate;

            // Instantiate our timeline object.
           timelines.events = new links.Timeline(document.getElementById(id1), options1);
            google.visualization.events.addListener(timelines.events, 'select', onTOSelectEvent);

            google.visualization.events.addListener(timelines.events, 'rangechange', onEventChange);

            // Draw our timeline with the created data and options
            timelines.events.draw(data1);


            var data2 = new google.visualization.DataTable();
            data2.addColumn('datetime', 'start');
            data2.addColumn('datetime', 'end');
            data2.addColumn('string', 'content');
            data2.addColumn('string', 'group');

            data2.addRows([
                [new Date(2010,12,23), new Date(2010,12,23), '','Overview'],
                [new Date(2010,7,23,23,0,0),new Date(2010,7,23,23,0,0) , '','Overview'],
                [new Date(-2010,7,26), new Date(2015,8,2), 'Traject A','Era'],
                [new Date(2002,12,28),new Date(2010,12,28) , 'M','Era'],
                [new Date(2010,7,29),new Date(2010,7,29) , '','Overview'],
                [new Date(2010,7,31), new Date(2010,8,3), '','Overview'],
                [new Date(2010,8,1,12,0,0), new Date(2010,8,1,12,0,0), '','Overview']
            ]);

            // specify options
            var options2 = {
                width:  "100%",
                'showCurrentTime':false,
                'style':'range',
                'stackEvents': false,
                'showMajorLabels':false,
                'zoomMax': 15779000000000,
                'zoomMin': 315580000000
            };

            // Instantiate our timeline object.
           timelines.eras = new links.Timeline(document.getElementById('timeline2'), options2);

            google.visualization.events.addListener(timelines.eras, 'select',  onTOSelectEra);
            google.visualization.events.addListener(timelines.eras, 'rangechange', onEraChange);

            // Draw our timeline with the created data and options
            timelines.eras.draw(data2);
            onEventChange();
            onEraChange();
        }

        };
    }
])


.factory('mapService', ['mapDatasource',
    function(mapDatasource) {
var map;
var lastOpenInfoWin;
var zoomLevel;
var places;
var toggle = true;

var img;
var mapId;
var target;
var src;
var centreLat;
var centreLon;
var initialZoom;
var imageWraps;
var gmicMapType;
var fieldScope;
var markerFields;
var currentIndex;



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
    var overlayProjection = me.getProjection();

    // Retrieve the coordinates of the marker
    // in latlngs and convert them to pixels coordinates.
    // We'll use these coordinates to place the DIV.
    var ne = overlayProjection.fromLatLngToDivPixel(me.marker_.getPosition());

    // Position the DIV.
    var div = me.div_;
    div.style.left = ne.x + 'px';
    div.style.top = ne.y + 'px';
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



     
function createInfoWindow(marker, key, markerFields) {
              //create an infowindow for this marker
              var infowindow = new google.maps.InfoWindow({
                  content: places[key].html,
                  maxWidth: 550
              });

                            //create a tooltip
              var tooltipOptions = {
                  marker: marker,
                  content: places[key].name,
                  cssClass: 'map-tooltip' // name of a css class to apply to tooltip
              };
              var tooltip = new Tooltip(tooltipOptions);


              //open infowindo on click event on marker.
              google.maps.event.addListener(marker, 'dragend', function () {

              markerFields.ttip = places[key].name;
              markerFields.lat = marker.getPosition().lat();
              markerFields.lng = marker.getPosition().lng();
              markerFields.html = places[key].html;
              markerFields.zoom = places[key].zoom;
              markerFields.id = places[key].id;
              if(Math.floor(marker.getPosition().lat()) != Math.floor(places[key].latitude) || Math.floor(marker.getPosition().lng()) != Math.floor(places[key].longitude)) markerFields.warn = true;
                else markerFields.warn = false;

            angular.forEach(markerFields.checkModel, function (value, key) {
                markerFields.checkModel[key]=false;
              if (markerFields.zoom.indexOf(key+2)>=0) markerFields.checkModel[key]=true;
            });
              });

              google.maps.event.addListener(marker, 'click', function () {

              markerFields.ttip = places[key].name;
              markerFields.lat = marker.getPosition().lat();
              markerFields.lng = marker.getPosition().lng();
              markerFields.html = places[key].html;
              markerFields.zoom = places[key].zoom;
console.log(markerFields.zoom);
              markerFields.id = places[key].id;
              if(Math.floor(marker.getPosition().lat()) != Math.floor(places[key].latitude) || Math.floor(marker.getPosition().lng()) != Math.floor(places[key].longitude)) markerFields.warn = true;
                else markerFields.warn = false;
console.log(markerFields.checkModel);
            angular.forEach(markerFields.checkModel, function (value, key) {
                markerFields.checkModel[key]=false;
console.log(key);

              if (markerFields.zoom.indexOf(key+2)>=0) markerFields.checkModel[key]=true;
            });

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
          }


function GMICMapType(img) {
    this.sourceImg = img;
    this.Cache = Array();
    this.opacity = 1.0;
}



    GMICMapType.prototype.tileSize = new google.maps.Size(256, 256);
    GMICMapType.prototype.maxZoom = 19;
    GMICMapType.prototype.getTile = function(coord, zoom, ownerDocument) {
        var c = Math.pow(2, zoom);
        var tilex=coord.x,tiley=coord.y;
        if (false) {
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
        ctx.drawImage(this.sourceImg, this.sourceImg.width / c * tilex, this.sourceImg.height / c * tiley, this.sourceImg.width / c, this.sourceImg.height / c, 0, 0, this.tileSize.width, this.tileSize.height);
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


return{

            init: function init(target, src, id) {

        this.mapId = id;
        this.target = target;
        this.src = src;
        this.toggle = true;

        if(!this.centreLat) this.centreLat = 0.0;
        if(!this.centreLon) this.centreLon = 0.0;
        if(!this.initialZoom) this.initialZoom = 3;
        this.imageWraps = false;
        this.markerFields.map_id = id;

        var that = this;
        
        var downloadAsset = function(src, callback) {
            if(!that.img) {
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
                        img.removeEventListener('onload', img.onload, false);
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
                    callback(img);
                }
            }
        };
        
        var load =  function() {
console.log(that);
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
            var gmicMapType = new GMICMapType(that.img);
            map.mapTypes.set("GameMap",gmicMapType);



        if(!that.imageWraps) that.setBounds();
                
        google.maps.event.addListener(map, 'click', function(event) {
            if(lastOpenInfoWin)               
             {
                 lastOpenInfoWin.close();
                 that.markerFields.id = '';
               }

            that.markerFields.lng = event.latLng.lng();
            that.markerFields.lat = event.latLng.lat();
        });

        google.maps.event.addListener(map, 'zoom_changed', function() {
            zoomLevel = map.getZoom();
                for (var i = 0; i < places.length; i++) {
                     if(places[i].zoom.indexOf(zoomLevel)>=0 && toggle) places[i].marker.setVisible(true);
                     else places[i].marker.setVisible(false);
                 } 
        });
        mapDatasource.getMarkers({"map_id":that.mapId}).then(function(response) {

        places = response.data;
        for (var key = 0; key < places.length; key++) {
              var myPlace = places[key];
              if (myPlace.latitude) {
                  places[key].marker = new google.maps.Marker({
                      map: map,
                      icon: "/demo/note.png",
                      draggable:true,
                      position: new google.maps.LatLng(myPlace.latitude, myPlace.longitude)
                  });
                  createInfoWindow(places[key].marker, key, that.markerFields);
                  createTooltip(places[key].marker, key);
                zoomLevel = map.getZoom();
                     if(places[key].zoom.indexOf(zoomLevel)<0) places[key].marker.setVisible(false);
               }
          }

                    }, function(err) {});

        };

        downloadAsset(this.src, function() {
            load();
        });
    },
    setBounds: function setBounds() {

        //2, 0-10
        //3, 60.0, 40.0
        //4, 75.0, 110.0
        //5, 80.0, 165.0
        // ratio approx 1/2

        var allowedBounds = new google.maps.LatLngBounds(
             new google.maps.LatLng(-165.0, -165.0), 
             new google.maps.LatLng(165.0, 165.0)
        );
        
        var lastValidCenter = map.getCenter();
        
        google.maps.event.addListener(map, 'center_changed', function() {
            if (allowedBounds.contains(map.getCenter())) {
                lastValidCenter = map.getCenter();
                return; 
            }
            
            map.panTo(lastValidCenter);
        });
    },
    redraw: function redraw() {
        var zoom = map.getZoom();
        map.setZoom(0);
        setTimeout(function(){map.setZoom(zoom);}, 0);
    },
    setFields: function setFields(fields){
        this.markerFields = fields;
        },
    toggleMarkers: function toggleMarkers(){
            if(toggle){
                toggle = !toggle;
                    for (var i = 0; i < places.length; i++) {
                        places[i].marker.setVisible(false);
                    }
            }
            else{
                toggle = !toggle;
                zoomLevel = map.getZoom();
                    for (var i = 0; i < places.length; i++) {
                        if(places[i].zoom.indexOf(zoomLevel)>=0) places[i].marker.setVisible(true);
                    }
            }
            },
         toggleTooltips:   function toggleTooltips(){
                var tooltips = document.getElementsByClassName('map-tooltip');
                if(document.getElementsByClassName('hidden-tooltips').length>0){
                    for (var i = 0; i <     tooltips.length; i++) {
                        tooltips[i].classList.remove("hidden-tooltips");
                    }
                }
                else{
                    for (var i = 0; i <     tooltips.length; i++) 
                    {
                        tooltips[i].classList.add("hidden-tooltips");
                    } 
                }
            },
        reloadMap: function reloadMap(newMarker){
        this.centreLat = map.getCenter().lat();
        this.centreLon = map.getCenter().lng();
        this.initialZoom = map.getZoom();
            this.init(this.target, this.src, this.mapId);    
        }
};
}


])


.factory('mapDatasource', ['$timeout', '$http',
    function($timeout, $http) {
        var nf = '';
        var maps = [];
        return {
            getMaps: function(pageData) {
                return $http.post('/api/map/getMaps', pageData);
            },
            getMarkers: function(pageData) {
                console.log(pageData);
                return $http.post('/api/map/getMarkers', pageData);
            },
            addMap: function(pageData) {
                return $http.post('/api/map/addMap', pageData);
            },
            addMarker: function(pageData) {
                return $http.post('/api/map/addMarker', pageData);
            },
            updateMap: function(pageData) {
                return $http.post('/api/map/updateMap', pageData);
            },
            updateMarker: function(pageData) {
console.log(pageData);
                return $http.post('/api/map/updateMarker', pageData);
            },
            deleteMap: function(pageData) {
                return $http.post('/api/map/deleteMap', pageData);
            },
            deleteMarker: function(pageData) {
                return $http.post('/api/map/deleteMarker', pageData);
            }
        };
    }
])

.factory('monsterDatasource', ['$timeout', '$http',
    function($timeout, $http) {
        var nf = '';
        var cf = '';
        var filteredMonsters=[];
        var monstersArray=[];
        return {
            setFilter: function(nfilter, cfilter) {
                nf = nfilter;
                cf = cfilter;
            },
            getScrollMonsters: function() {
                return $http.post('/api/monster/getscroll');
            },
            getUiScrollMonsters: function(pageData) {
                pageData = {
                    "descriptor": pageData
                };
                return $http.post('/api/monster/getui', pageData);
            },
            get: function(descriptor, success) {
                var that = this;
                return $timeout(function() {
                    var count, i, index, j, ref, ref1, result, min, max;
                    index = descriptor.index;
                    count = descriptor.count;
                    descriptor.cFilter = cf;
                    descriptor.nFilter = nf;
                    that.getUiScrollMonsters(descriptor).then(function(response) {
                        return success(response.data);
                    }, function(err) {});
                }, 100);
            }
        };
    }
])

.factory('soundsDatasource', ['$timeout', '$http',
    function($timeout, $http) {
        var nf = '';
        var tf = '';
        return {
            setFilter: function(nfilter, tfilter) {
                nf = nfilter;
                tf = tfilter;
            },
            getUiScrollSounds: function(pageData) {
                pageData = {
                    "descriptor": pageData
                };
                return $http.post('/api/sound/sounds/getui', pageData);
            },
            get: function(descriptor, success) {
                var that = this;
                console.log(this);
                return $timeout(function() {
                    var count, i, index, j, ref, ref1, result, min, max;
                    index = descriptor.index;
                    count = descriptor.count;
                    descriptor.nFilter = nf;
                    descriptor.tFilter = tf;
                    that.getUiScrollSounds(descriptor).then(function(response) {
                        return success(response.data);
                    }, function(err) {});
                }, 100);
            }
        };
    }
])

.factory('spellFactory', ['$http',
    function($http) {

        return {
            getSpells: function(pageData) {
                return $http.post('/api/spell/getspells', pageData);
            },
            getSpellBasics: function(pageData) {
                return $http.post('/api/spell/getspellbasics', pageData);
            },
            updateSpell: function(pageData) {
                return $http.post('/api/spell/update', pageData);
            },
            addSpell: function(pageData) {
                return $http.post('/api/spell/add', pageData);
            },
            deleteSpell: function(pageData) {
                return $http.post('/api/spell/delete', pageData);
            }
        };
    }
])

.factory('soundsEditFactory', ['$http',
    function($http) {
        var scenes = {};
        return {
            getSounds: function() {
                return $http.post('/api/sound/sounds/get');
            },
            getScenes: function(pageData) {
                return $http.post('/api/sound/scene/get', pageData);
            },
            updateScene: function(pageData) {
                return $http.post('/api/sound/scene/update', pageData);
            },
            addScene: function(pageData) {
                return $http.post('/api/sound/scene/add', pageData);
            },
            deleteScene: function(pageData) {
                return $http.post('/api/sound/scene/delete', pageData);
            },
            getEffects: function(pageData) {
                return $http.post('/api/sound/effect/get', pageData);
            },
            updateEffect: function(pageData) {
                return $http.post('/api/sound/effect/update', pageData);
            },
            addEffect: function(pageData) {
                return $http.post('/api/sound/effect/add', pageData);
            },
            deleteEffect: function(pageData) {
                return $http.post('/api/sound/effect/delete', pageData);
            },
            getCollections: function(pageData) {
                return $http.post('/api/sound/collection/get', pageData);
            },
            getCollection: function(pageData) {
                return $http.post('/api/sound/collection/getdetails', pageData);
            },
            updateCollection: function(pageData) {
                return $http.post('/api/sound/collection/update', pageData);
            },
            addCollection: function(pageData) {
                return $http.post('/api/sound/collection/add', pageData);
            },
            deleteCollection: function(pageData) {
                return $http.post('/api/sound/collection/delete', pageData);
            }
        };
    }
])

.factory('monsterFactory', ['$http', '$compile',
    function($http, $compile) {

        return {
            getMonsters: function(pageData) {
                console.log(pageData);
                return $http.post('/api/monster/get', pageData);
            },
            addMonster: function(pageData) {
                var id = pageData._id;
                return $http.post('/api/monster/add', pageData);
            },
            updateMonster: function(pageData) {
                return $http.post('/api/monster/update', pageData);
            },
            deleteMonster: function(id) {
               var pageData = {"field":"id","value":id};
                return $http.post('/api/monster/delete', pageData);
            },
            getMonsterContent: function(pageData) {
                return $http.post('/api/monster/' + name);
            },
            getSpells: function(pageData) {
                return $http.post('/api/monster/getspells', pageData);
            },
            diceBag: function(actor, mod, dice, adv) {
                console.log(typeof mod === 'object');
                console.log(Array.isArray(mod));
                if (typeof mod === 'object') {
                    var d = new Date();
                    console.log(mod);
                    var bonus = mod.bonus;
                    d = " " + d.getTime();
                    d = d.substring(d.length - 6) + "" + Math.floor((Math.random() * 1000) + 1);
                    var pattern = new RegExp("\{collapse\}", "g");
                    if (mod.damage != null) var damage = mod.damage.replace(pattern, '<a collapse> &gt;&gt;<\/a><span hidden>');
                    if (mod.special != null) var special = mod.special.replace(pattern, '<a collapse> &gt;&gt;<\/a><span hidden>');
                    pattern = new RegExp("\{\/collapse\}", "g");
                    if (mod.damage != null) damage = damage.replace(pattern, '</span>');
                    if (mod.special != null) special = special.replace(pattern, '</span>');
                    var attArray = ["STR","DEX","CON","INT","WIS","CHA"];
                    for (var i = 0; i < attArray.length; i++) {
                    pattern = new RegExp("\{"+attArray[i]+"\}", "g");
                    console.log(bonus);
                    if (mod.damage != null) damage = damage.replace(pattern, actor[attArray[i].toLowerCase()]);
                    if (bonus != null) bonus = bonus.replace(pattern, actor[attArray[i].toLowerCase()]);
                    console.log(bonus);
                    }

                    if (bonus == "") {
                        var tmp = mod.name + ": " + this.rollDice(damage) + "<br><span class='combatSpecial' contenteditable='false'>" + special + "<br>";
                    } else {
                        var fullResult;
                        if (bonus != null) {
                            if (bonus.substr(0, 1) != "+" && bonus.substr(0, 1) != "-") {
                                bonus = "+" + bonus;
                            }
                        }
                        switch (adv) {
                            case 'a':
                                fullResult = eval(Math.max(this.getRandomInt(1, 20), this.getRandomInt(1, 20)) + bonus);
                                break;
                            case 'd':
                                fullResult = eval(Math.min(this.getRandomInt(1, 20), this.getRandomInt(1, 20)) + bonus);
                                break;
                            default:
                                fullResult = eval(this.getRandomInt(1, 20) + bonus);
                        }
                        if (damage) {
                            fullResult = "Hit <strong>AC" + fullResult + "</strong> for " + this.rollDice(damage) + " ";
                        }
                        if (special) {
                            fullResult = fullResult + "<br><div class='combatSpecial' contenteditable='false'>" + special + '</div> ';
                        }
                        var tmp =  mod.name + ": " + fullResult + "<br>";
                    }
                } else {var tmp =  mod + ": " + this.rollDice(dice) + "<br>"; console.log(dice);}
                //tmp = $compile(tmp)(scope);
                //el.prepend(tmp);
                return tmp;
            },
            getRandomInt: function(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            },
            rollDice: function(roll) {
                if (roll == "-" || roll == "") {
                    return "";
                }
                var result = 0;
                var reg = /[0-9]+d[0-9]+/g;
                var vMatch;
                var tRoll;
                roll = String(roll);
                vMatch = roll.match(reg);
                if (vMatch == null) {
                    vMatch = [];
                }
                for (var r = 0; r < vMatch.length; r++) {
                    tRoll = vMatch[r].split("d");
                    result=0;
                    for (var i = 0; i < tRoll[0]; i++) {
                        result = result + this.getRandomInt(1, tRoll[1]);
                    }
                    roll = roll.replace(vMatch[r], result);
                }
                reg = /[0-9\+-]{3,11}/g;
                vMatch = roll.match(reg);
                console.log(vMatch);
                if (vMatch == null) return roll;
                for (var r = 0; r < vMatch.length; r++) {
                    console.log(roll);
                    //vMatch[r] = vMatch[r].replace("--","-");
                    console.log(vMatch[r]);
                    console.log(eval(vMatch[r]));
                    roll = roll.replace(vMatch[r], eval(vMatch[r]));
                }

                reg = /[0-9]+r[0-9]+/g;
                vMatch = roll.match(reg);
                if (vMatch == null) {
                    vMatch = [];
                }
                for (var r = 0; r < vMatch.length; r++) {
                    tRoll = vMatch[r].split("r");
                    result=[];
                    while(result.length<tRoll[0]){
                        while(1){
                            var tmpResult = this.getRandomInt(1, tRoll[1]);
                            if(result.indexOf(tmpResult) == -1) {
                                result.push(tmpResult);
                                break;
                            }
                        }
                    }
                    console.log(result);
                    // for (var i = 0; i < tRoll[0]; i++) {
                    //     result = result + this.getRandomInt(1, tRoll[1]);
                    // }
                    roll = roll.replace(vMatch[r], result.join("|"));
                }




                return roll;
            }
        };
    }
])

.factory('soundsFactory', ['$http', '$rootScope', '$interval',
    function($http, $rootScope, $interval) {
        var scenes = {};
        // var aScene = [];
        var unregister = [];

        var getRandomInt = function(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        var mixToMono = function(buffer) {
            if (buffer.numberOfChannels == 2) {
                var pL = buffer.getChannelData(0);
                var pR = buffer.getChannelData(1);
                var length = buffer.length;

                for (var i = 0; i < length; ++i) {
                    var mono = 0.5 * (pL[i] + pR[i]);
                    pL[i] = mono;
                    pR[i] = mono;
                }
            }
        }
        return {
            playSound: function(data) {

            },
            getScenes: function(pageData) {
                return $http.post('/api/sound/scene/get', pageData);
            },
            getSounds: function(data) {
                return $http.get('/api/sounds/sounds/get');
            },
            playEffect: function(data) {

            },
            toggleScene: function(data) {
                if (typeof scenes[data.name] === 'undefined') {
                    if (scenes.length >= 5) {
                        alert("You can only play 5 scenes at once.");
                        return;
                    }
                    scenes[data.name] = angular.copy(data);
                    var aScene = scenes[data.name];

                    aScene.context = new AudioContext();
                    aScene.gainNode = [];
                    console.log(aScene);
                    console.log(scenes);
                    aScene.context.destination.channelCountMode = "explicit";
                    aScene.context.destination.channelInterpretation = "discrete";
                    aScene.context.destination.channelCount = aScene.context.destination.maxChannelCount;

                    for (var j = 0; j < aScene.effects.length; j++) {
                        if (aScene.effects[j].preDelay>0) {
                            aScene.effects[j].nextPlay = getRandomInt(aScene.effects[j].delayL, aScene.effects[j].delayH) + aScene.context.currentTime + aScene.effects[j].preDelay + aScene.context.currentTime;
                        } else aScene.effects[j].nextPlay = 0;
                        if (j == 0) aScene.nextPlay = aScene.effects[j].nextPlay;
                        else if (aScene.nextPlay > aScene.effects[j].nextPlay) aScene.nextPlay = aScene.effects[j].nextPlay;
                    }
                    if (typeof aScene.nextPlay == "undefined") {
                        aScene.nextPlay = 0;
                    }




                    scenes[data.name].interval = $interval(function(){$rootScope.chkScene(data.name);},200);

                    // unregister[data.name] = $rootScope.$watch(scenes[data.name].context.currentTime
                    // , function() {
                    //     if (aScene.nextPlay > aScene.context.currentTime) return;
                    //     aScene.effects.forEach(function(Effect) {
                    //         if (typeof Effect.nextPlay == "undefined") {
                    //             Effect.nextPlay = 0;
                    //         }
                    //         if (typeof aScene === "undefined") {
                    //             return;
                    //         }
                    //         if (aScene.closeTime <= aScene.context.currentTime) {
                    //             aScene.context.close();
                    //             delete aScene.closeTime;
                    //             delete aScene.effects;
                    //             delete scenes[data.name];
                    //             unregister[data.name]();
                    //         } else if (Effect.nextPlay <= aScene.context.currentTime) {
                    //             $rootScope.chkScene(data.name);
                    //         }
                    //     });
                    // });
                } else {
                    aScene = scenes[data.name];
                    aScene.gainNode.forEach(function(gNode) {
                        gNode.gain.linearRampToValueAtTime(gNode.gainSet, aScene.context.currentTime);
                        gNode.gain.linearRampToValueAtTime(0, aScene.context.currentTime + (aScene.fadeOut));
                    });
                    aScene.closeTime = aScene.context.currentTime + (aScene.fadeOut);
                }
            },
            chkScene: function(name) {
                var aScene = scenes[name];

                if (aScene.closeTime <= aScene.context.currentTime) {
                aScene.context.close();
                $interval.cancel(aScene.interval);
                delete aScene.closeTime;
                delete aScene.effects;
                delete scenes[name];
                return;
                }
                if (aScene.closeTime <= aScene.context.currentTime+aScene.fadeOut) return;
                for (var j = 0; j < aScene.effects.length; j++) {
                    if (typeof aScene.effects[j].nextPlay == "undefined") {
                        aScene.effects[j].nextPlay = 0;
                    }
                    if (aScene.effects[j].nextPlay < aScene.context.currentTime + 0.5 && (aScene.effects[j].active || aScene.effects[j].active == null)) {
                        aScene.effects[j].nextPlay = aScene.context.currentTime + 20000;
                        var source = aScene.context.createBufferSource();
                        var perChance = 0;
                        for (var k = 0; k < aScene.effects[j].sounds.length; k++) {
                            perChance += aScene.effects[j].sounds[k].chance;
                        }
                        var perRoll = getRandomInt(1, perChance);
                        perChance = 0;
                        var k=0;
                        for (var l = 0; l < aScene.effects[j].sounds.length; l++) {
                            perChance += aScene.effects[j].sounds[l].chance;
                            if (perChance >= perRoll) {
                                var url = "/sounds/" + aScene.effects[j].sounds[l].file;
                                k=l;
                                break;
                            }
                        }
                        if(typeof url == "undefined"){
                            console.log("undefined");
                            aScene.effects[j].nextPlay = 0;
                            return;
                        }
                        var feedback={};
                        feedback.j=j;
                        feedback.k=k;
                        feedback.url=url;
                        feedback.aScene=aScene;
                        var cents = aScene.effects[j].sounds[k].pitchSet;
                        cents = cents + getRandomInt(-aScene.effects[j].sounds[k].pitchVar, aScene.effects[j].sounds[k].pitchVar * 2);
                        cents = cents * 3;
                        var rate = Math.pow(2.0, cents / 1200.0);
                        source.playbackRate.value = rate;
                        var request = new XMLHttpRequest();
                        request.open("GET", url + "?" + aScene.name + "," + j + "," + k, true);
                        request.responseType = "arraybuffer";
                        request.onload = function() {
                            aScene.context.decodeAudioData(request.response, function(buffer) {
                                    mixToMono(buffer);
                                    source.buffer = buffer;
                                    //aScene.source = source;
                                    aScene.merger = aScene.context.createChannelMerger(8);
                                    aScene.gainNode.push(aScene.merger.context.createGain());
                                    var gainIndex = aScene.gainNode.length - 1;
                                    aScene.gainNode[gainIndex].gainSet = (aScene.effects[j].sounds[k].vol / 100) * (aScene.effects[j].vol / 100) * (aScene.vol / 100);
                                    aScene.merger.connect(aScene.gainNode[gainIndex]);
                                    aScene.gainNode[gainIndex].connect(aScene.context.destination);
                                    var startSceneFade = aScene.effects[j].sounds[k].fadeIn;
                                    if (aScene.context.currentTime < 2) {
                                        startSceneFade = aScene.fadeIn;
                                    }
                                    aScene.gainNode[gainIndex].gain.linearRampToValueAtTime(0, aScene.context.currentTime);
                                    aScene.gainNode[gainIndex].gain.linearRampToValueAtTime(aScene.gainNode[gainIndex].gainSet, (aScene.context.currentTime + (startSceneFade)));

                                    var silence = aScene.context.createBufferSource();
                                    var channelMax = (aScene.context.destination.maxChannelCount - 2);
                                    var channelplayed;
                                    if (aScene.context.destination.maxChannelCount < 3) {
                                        (channelMax = 1)
                                    }
                                    if (aScene.effects[j].sounds[k].randLoc) {
                                        for (var i = 0; i < 7; i++) {
                                            silence.connect(aScene.merger, 0, i);
                                        }
                                        channelplayed = getRandomInt(0, channelMax);
                                        source.connect(aScene.merger, 0, channelplayed);
                                        aScene.gainNode[gainIndex].gainSet = getRandomInt(aScene.gainNode[gainIndex].gainSet * 0.2, aScene.gainNode[gainIndex].gainSet);
                                        feedback.channel=channelplayed;
                                    } else {
                                        for (var i = 0; i < 8; i++) {
                                            source.connect(aScene.merger, 0, i);
                                        }
                                        channelplayed = "all";
                                    }

                                    if (aScene.effects[j].loop) aScene.effects[j].nextPlay = getRandomInt(aScene.effects[j].delayL, aScene.effects[j].delayH) + buffer.duration + aScene.context.currentTime - (aScene.effects[j].sounds[k].fadeIn);
                                    else {
                                        aScene.effects[j].nextPlay = 99999999;
                                        if(!aScene.effects[j].sounds[k].loop) aScene.closeTime = aScene.context.currentTime + (buffer.duration);
                                        }

                                    console.log("Playing sound " + aScene.effects[j].sounds[k].name + " from " + aScene.effects[j].name + " in scene " + aScene.name);
                                    if(aScene.effects[j].sounds[k].loop) {
                                        source.loop=true;
                                        aScene.effects[j].nextPlay = 9999999;
                                    }
                                    source.start(0);
                                        // At the end of the track, fade it out.
                                    if(aScene.effects[j].sounds[k].fadeOut>0){
                                    aScene.gainNode[gainIndex].gain.linearRampToValueAtTime(aScene.gainNode[gainIndex].gainSet, (aScene.context.currentTime + buffer.duration - aScene.effects[j].sounds[k].fadeOut));
                                    aScene.gainNode[gainIndex].gain.linearRampToValueAtTime(0, (aScene.context.currentTime + buffer.duration));
                                    }


                                },
                                function(e) {
                                    "Error with decoding audio data" + e
                                });
                        };
                        console.log(feedback);
                        request.send();
                        return;
                    }
                }

            },
            scenes

        };
    }
])

.factory('citizenFactory', ['$http',
    function($http) {
        var activeCitizens = [];
        return {
            getCitizen: function(pageData) {
                return $http.post('/api/citizens/getcitizen', pageData);
            },
            getWorld: function(pageData) {
                return $http.get('/api/citizens/getWorld');
            },
            getCitizens: function(pageData) {
                return $http.post('/api/citizens/getcitizens', pageData);
            },
            getRaces: function(pageData) {
                return $http.post('/api/citizens/getraces', pageData);
            },
            getAspects: function(pageData) {
                return $http.post('/api/citizens/getaspects', pageData);
            },
            updateCitizen: function(pageData) {
                return $http.post('/api/citizens/citizen/update', pageData);
            },
            addCitizen: function(pageData) {
                return $http.post('/api/citizens/citizen/add', pageData);
            },
            deleteCitizen: function(pageData) {
                return $http.post('/api/citizens/citizen/delete', pageData);
            },
            seedRegion: function(pageData) {
                return $http.post('/api/citizens/seedregion', pageData);
            },
            getRegions: function(pageData) {
                return $http.post('/api/citizens/region/get', pageData);
            },
            ageRegion: function(pageData) {
                return $http.post('/api/citizens/ageregion', pageData);
            },
            updateRegion: function(pageData) {
                return $http.post('/api/citizens/region/update', pageData);
            },
            clearRegion: function(pageData) {
                return $http.post('/api/citizens/region/clear', pageData);
            },
            addRegion: function(pageData) {
                return $http.post('/api/citizens/region/add', pageData);
            },
            deleteRegion: function(pageData) {
                return $http.post('/api/citizens/region/delete', pageData);
            },
            getDescriptives: function(pageData) {
                return $http.post('/api/citizens/descriptives/get', pageData);
            },
            updateDescriptives: function(pageData) {
                return $http.post('/api/citizens/descriptives/update', pageData);
            },
            updateNpcRecord: function(table,pageData) {
                return $http.post('/api/citizens/'+table+'/update', pageData);
            },
            deleteNpcRecord: function(table,pageData) {
                return $http.post('/api/citizens/'+table+'/delete', pageData);
            },
            addDescriptives: function(pageData) {
                return $http.post('/api/citizens/descriptives/add', pageData);
            },
            deleteDescriptives: function(pageData) {
                return $http.post('/api/citizens/descriptives/delete', pageData);
            },
            getActiveCitizens: function(pageData) {
                return $http.post('/api/citizens/getActiveCitizens', pageData);
            }
        };
    }
])


.factory('siteFactory', ['$http',
    function($http) {

        return {
            getSettings: function() {
                console.log("test");
                return $http.get('/api/settings/get');
            },

            saveSettings: function(pageData) {
                return $http.post('/api/settings/set', pageData);
            },
            login: function(pageData) {
                return $http.post('/login', pageData);
            },
            resetPassword: function(pageData){
                return $http.post('/api/user/reset-password', pageData);
            },
            startMembership: function(pageData){
                return $http.post('/api/user/membership', pageData);
            }

        }
    }
])