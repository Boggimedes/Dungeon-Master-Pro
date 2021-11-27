<!DOCTYPE html>
<html lang="en">
<base href="/">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Azgaar's Fantasy Map Generator</title>
    <meta name="application-name" content="Azgaar's Fantasy Map Generator">
    <meta name="author" content="Azgaar (Max Ganiev)">
    <meta name="description" content="Azgaar's Fantasy Map Generator and Editor">
    <meta property="og:url" content="https://azgaar.github.io/Fantasy-Map-Generator">
    <meta property="og:title" content="Azgaar's Fantasy Map Generator">
    <meta property="og:description" content="Web application generating interactive and customizable maps">
    <meta property="og:image" content="images/preview.png">
    <link rel="icon" type="image/png" href="images/favicon-32x32.png" sizes="32x32" />
    <link rel="icon" type="image/png" href="images/favicon-16x16.png" sizes="16x16" />
    <link rel="stylesheet" href="assets/vendor/pace/themes/black/pace-theme-flash.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
        integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous">
    <link rel="stylesheet" href="styles.css">
    <style type="text/css">
        .ui-dialog .ui-dialog-titlebar {
            color: white;
            background-color: darkgrey;
        }

        #markerBody {
            display: flex;
            flex-direction: column;
        }

        .ui-dialog-titlebar-collapse {
            display: none;
        }

        .map-templates {
            position: absolute;
            z-index: 1000;
            bottom: 0;
            display: flex;
            flex-direction: column;
        }

        .subtle input[type=number],
        .subtle input[type=text],
        .subtle select {
            color: white;
            background: transparent;
            border: 0px;
        }

        .subtle option {
            color: white;
            background: black;
        }

        #statesRegenerateButtons,
        #statesBottom {
            display: none !important;
        }

        .map-templates img {
            border-radius: 1rem;
            margin-bottom: 0.25rem;
            margin-top: 0.25rem;
            cursor: pointer;
        }

        .land-shapes img {
            border-radius: 1rem;
            margin-bottom: 0.25rem;
            margin-top: 0.25rem;
            cursor: pointer;
        }

        .map-templates div {
            display: flex;
        }

        .map-templates .btn-group>.btn {
            display: flex;
            flex: 0 1 auto;
            text-align: center;
        }

        .card {
            font-size: 1rem
        }

        ;

        #initial {
            fill: none;
            stroke: black;
            pointer-events: none;
        }

        #init-rose {
            animation: 20s infinite spin;
            opacity: .7;
            transform-origin: center;
        }

        @keyframes spin {
            0% {
                transform: rotate(0deg);
            }

            100% {
                transform: rotate(359deg);
            }
        }

        #loading {
            opacity: 1;
            font-size: 11px;
            color: #fff5da;
            text-align: center;
            text-shadow: 0px 1px 4px #4c3a35;
            width: 80%;
            max-width: 600px;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
        }

        #loading-text {
            font-size: 1.8em;
            margin: 0.2em 0 0 1em;
        }

        #titleName {
            text-align: left;
            font-size: 3em;
            margin-left: 5%;
        }

        #title {
            font-size: 7em;
            margin: -12px 0 -6px 0;
        }

        #version {
            text-align: right;
            font-size: 2em;
            margin-right: 3%;
        }

        #loading-text>span {
            font-size: 1.3em;
            padding-left: 1px;
            line-height: 0px;
        }

        #loading-text>span,
        #mapOverlay>span {
            animation: 3s infinite both blink;
        }

        #loading-text span:nth-child(2),
        #mapOverlay>span:nth-child(2) {
            animation-delay: 1s;
        }

        #loading-text span:nth-child(3),
        #mapOverlay>span:nth-child(3) {
            animation-delay: 2s;
        }

        @keyframes blink {
            0% {
                opacity: 0;
            }

            20% {
                opacity: 1;
            }

            100% {
                opacity: .1;
            }
        }

        .btn-container {
            position: fixed;
            bottom: 0px;
            left: 0px;
            z-index: 1000;
        }

    </style>
    <script>
        var shapes = ["heater", "spanish", "french", "horsehead", "horsehead2", "polish", "hessen", "swiss", "boeotian",
            "roman", "kite", "oldFrench", "renaissance", "baroque", "targe", "targe2", "pavise", "wedged", "flag",
            "pennon", "guidon", "banner", "dovetail", "gonfalon", "pennant", "round", "oval", "vesicaPiscis",
            "square", "diamond", "no", "fantasy1", "fantasy2", "fantasy3", "fantasy4", "fantasy5", "noldor",
            "gondor", "easterling", "erebor", "ironHills", "urukHai", "moriaOrc"
        ];
        // return the last element of array
        function last(array) {
            return array[array.length - 1];
        }

        // return random value from the array
        function ra(array) {
            return array[cryptoRand(0, array.length - 1)];
        }

        function cryptoRand(x, y) {
            return x + (crypto.getRandomValues(new Uint32Array(1))[0] % (y - x + 1));
        }
        var regionId = {{ $region->id }};
        var regionRaces = window.regionRaces = [
            @foreach ($region->racial_balance as $race)
                {!! json_encode($race) !!},
            @endforeach
        ];
        var regionReligions = window.regionReligions = [
            @foreach ($region->religions as $religion)
                @if ($loop->first) @continue @endif
                {!! json_encode($religion) !!},
            @endforeach
        ];
        var regionCultures = window.regionCultures = [
            // {name: "Wildlands", i: 0, base: 1, origin: null, shield: "round"},
            @if (empty($region->cultures))
                @foreach ($region->racial_balance as $race)
                    {!! json_encode($race) !!},
                @endforeach
            @else
                @foreach ($region->cultures as $culture)
                    @if ($loop->first) @continue @endif
                    @php unset($culture->stateCenters, $culture['stateCenters']); @endphp
                    {!! json_encode($culture) !!},
                @endforeach
            @endif
        ];
        regionCultures = regionCultures.map((c) => {
            c.shield = "custom";
            c.base = 1;
            return c
        });
        var regionStates = window.regionStates = [
            @foreach ($region->states as $state)
                @if ($loop->first) @continue @endif
                {!! json_encode($state) !!},
            @endforeach

        ];
        regionStates = regionStates.map((s) => {
            if (s.shield == 'random') {
                s.shield = ra(shapes);
                return s;
            }
            console.log(s);
            if (s.coa?.shield == 'random') {
                s.coa.shield = ra(shapes);
                return s;
            }
            return s;
        });
        var testing = [];
        Object.assign(testing, regionCultures);
        var regionRaceNames = {
            @foreach ($region->racial_balance as $race)
                {{ $race->id }}: '{{ $race->name }}',
            @endforeach
        };

        function changeTemplate(value) {
            document.getElementById('map').style.display = 'none';
            if (value == 'random') {
                const templates = {
                    volcano: 3,
                    highIsland: 22,
                    lowIsland: 9,
                    continents: 19,
                    archipelago: 23,
                    mediterranean: 5,
                    peninsula: 3,
                    pangea: 5,
                    isthmus: 2,
                    atoll: 1,
                    shattered: 7,
                    taklamakan: 1
                };
                value = rw(templates);
            }
            document.getElementById('templateInput').value = value;
            setTimeout(regeneratePrompt, 1500);
            // setTimeout(()=> editStates(), 3000);
        }
    </script>
    <link rel="stylesheet" href="/mgc/index.css">
    <link rel="stylesheet" href="/fmg/icons.css">
    <link rel="stylesheet" href="/fmg/libs/jquery-ui.css">
</head>

<body style="background-color:black;overflow:hidden">
    <div class="container-fluid">
        <div class="row">
            <div id="mapSetup" class="col-5 pl-4 order-first text-light pb-5" style="height:100vh;overflow:auto;">
                <div class="btn-container w-100 row">
                    <div class="d-flex col-2 pl-3">
                        <button class="pl-3 btn btn-secondary mx-1" id="loadButton"
                            data-tip="Load fully-functional map in .map format" onclick="mapToLoad.click()">Load Map
                            File</button>

                    </div>
                    <div class="d-flex justify-content-end col-3 pr-0">
                        <button class="pl-3 btn btn-secondary mx-1" id="saveButton" onclick="dowloadMap()"
                            data-tip="Save fully-functional map in .map format">Save Map File</button>
                        <button class="btn btn-primary ml-1" onclick="saveToServer()">Save Region</button>
                    </div>
                </div>
                <h2 class="w-100">Region Setup</h2>
                <div id="accordion">
                    <div class="card bg-transparent">
                        <div class="card-header" style="cursor: pointer;" id="headingOne">
                            <h4 class="mb-0 bg-transparent" onclick="changePreset('GMP')" data-toggle="collapse"
                                data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Settings
                            </h4>
                        </div>

                        <div id="collapseOne" class="collapse" aria-labelledby="headingOne"
                            data-parent="#accordion">
                            <div class="card-body">
                                <button id="configureWorld" class="btn btn-primary"
                                    data-tip="Click to open world configurator to setup map position on Globe and World climate"
                                    onclick="editWorld()">Configure Climate</button>
                                <h4 class="pt-3">Units</h4>
                                <div id="unitsBody" class="row" style="font-size:1.2rem;">
                                    <div class="col-6">
                                        <div data-tip="Select a distance unit or provide a custom name">
                                            <div><span class="icon-map-signs"></span> Distance: </div>

                                            <select id="distanceUnitInput" data-stored="distanceUnit">
                                                <option value="mi" selected>Mile (mi)</option>
                                                <option value="km">Kilometer (km)</option>
                                                <option value="lg">League (lg)</option>
                                                <option value="vr">Versta (vr)</option>
                                                <option value="custom_name">Custom name</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <button id="markersAddFromOverview" onclick="toggleAddMarker()"
                                            data-tip="Add a new marker. Hold Shift to add multiple"
                                            class="icon-plus"></button>

                                        <div><span class="icon-temperature-high"></span> Temperature: </div>
                                        <select id="temperatureScale" data-stored="temperatureScale">
                                            <option value="°C" selected>Celsius (°C)</option>
                                            <option value="°F">Fahrenheit (°F)</option>
                                            <option value="K">Kelvin (K)</option>
                                            <option value="°R">Rankine (°R)</option>
                                            <option value="°De">Delisle (°De)</option>
                                            <option value="°N">Newton (°N)</option>
                                            <option value="°Ré">Réaumur (°Ré)</option>
                                            <option value="°Rø">Rømer (°Rø)</option>
                                        </select>
                                    </div>
                                    <div class="col-6">
                                        <div data-tip="Select an altitude unit or provide a custom name">
                                            <div><span class="icon-signal"></span> Height:</div>
                                            <select id="heightUnit" data-stored="heightUnit">
                                                <option value="ft" selected>Feet (ft)</option>
                                                <option value="m">Meters (m)</option>
                                                <option value="f">Fathoms (f)</option>
                                                <option value="custom_name">Custom name</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div data-tip="Set how many people are in one population point">
                                            <div><span class="icon-male"></span> Population:</div>
                                            <input class="d-none" id="populationRateOutput"
                                                data-stored="populationRate" type="range" min=10 max=9990 step=10
                                                value=1000 />
                                            1 <span class="icon-male"></span> = <input id="populationRateInput"
                                                data-stored="populationRate" type="number" min=10 max=9990 step=10
                                                value=1000 />
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <h4 class="pt-3">Year</h4>
                                        <p>This value is the "Age" of this region. This defines the scope of
                                            expansion
                                            for all states &
                                            cultures. A society with low cultural expasion values would
                                            have a lot of "Neutral" territory in the region at 1000. Conversely a
                                            region with an year of 4000 (and/or higher expansionism values) would
                                            have
                                            little to no neutral territory.</p>
                                        <input id="yearInput" data-stored="year" type="number" step="100" min="0"
                                            max="10000" value="1000" onchange="updateEpoch()">
                                    </div>
                                    <h4 class="pt-3">City Generation</h4>
                                    <div class="col-12">
                                        <div class="btn-group w-100" role="group" aria-label="Basic example">
                                            <button type="button" class="btn btn-primary burg-density" data-value="100"
                                                onclick="setBurgs(100)">100 Cities</button>
                                            <button type="button" class="btn btn-secondary burg-density"
                                                data-value="200" onclick="setBurgs(200)">200 Cities</button>
                                            <button type="button" class="btn btn-secondary burg-density"
                                                data-value="300" onclick="setBurgs(300)">300 Cities</button>
                                            <button type="button" class="btn btn-secondary burg-density"
                                                data-value="1000" onclick="setBurgs(1000)">All The Cities</button>
                                        </div>
                                    </div>
                                </div>
                                <i data-locked="1" id="lock_distanceScale" class="icon-lock-closed d-none"></i>
                                <div class="d-none" data-tip="Select how many distance units are in one pixel">
                                    <div>1 map pixel =</div>
                                    <input id="distanceScaleOutput" type="range" min=.01 max=20 step=.1 value=3>
                                    <input id="distanceScaleInput" data-stored="distanceScale" type="number" min=.01
                                        max=100 step=.01 value=3 data-value=3>
                                </div>

                                <div class="d-none"
                                    data-tip='Area unit name, type "square" to add ² to the distance unit'>
                                    <div>Area unit:</div>
                                    <input id="areaUnit" data-stored="areaUnit" type="text" value="square">
                                </div>

                                <div class="d-none"
                                    data-tip="Set height exponent, i.e. a value for altitude change sharpness. Altitude affects temperature and hence biomes">
                                    <div>Exponent:</div>
                                    <input id="heightExponentOutput" type="range" min=1.5 max=2.2 value=2 step=.01>
                                    <input id="heightExponentInput" data-stored="heightExponent" type="number" min=1.5
                                        max=2.2 value=2 step=.01>
                                </div>
                                <div class="d-none" class="unitsHeader">
                                    <span class="icon-minus"></span>
                                    <div>Scale bar:</div>
                                </div>

                                <div class="d-none" data-tip="Set scale bar size">
                                    <div>Bar size:</div>
                                    <input id="barSizeOutput" data-stored="barSize" type="range" min=.5 max=5 value=2
                                        step=.1>
                                    <input id="barSizeInput" data-stored="barSize" type="number" min=.5 max=5 value=2
                                        step=.1>
                                </div>

                                <div class="d-none" data-tip="Type scale bar label, leave blank to hide label">
                                    <div>Bar label:</div>
                                    <input id="barLabel" data-stored="barLabel" type="text" placeholder="hidden"
                                        value="">
                                </div>

                                <div class="d-none" data-tip="Set background for Scale bar">
                                    <div>Bar background:</div>
                                    <input id="barBackOpacity" data-stored="barBackOpacity" type="range" min=0 max=1
                                        value=.2 step=.01>
                                    <input id="barBackColor" data-stored="barBackColor" type="color" value="#ffffff">
                                </div>

                                <div class="d-none"
                                    data-tip="Set position of the Scale bar bottom right corner in percents">
                                    <div>Bar position:</div>
                                    x:<input id="barPosX" data-stored="barPosX" type="number" min=0 max=100 step=.1
                                        value=99>
                                    y:<input id="barPosY" data-stored="barPosY" type="number" min=0 max=100 step=.1
                                        value=99>
                                </div>

                                <div class="d-none"
                                    data-tip="Set urbanization rate: burgs population relative to all population">
                                    <div>Urbanization rate:</div>
                                    <input id="urbanizationOutput" data-stored="urbanization" type="range" min=.01 max=5
                                        step=.01 value=1>
                                    <input id="urbanizationInput" data-stored="urbanization" type="number" min=.01 max=5
                                        step=.01 value=1>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="card bg-transparent">
                        <div class="card-header" style="cursor: pointer;" id="headingTwo">
                            <h4 class="mb-0" data-toggle="collapse" onclick="changePreset('cultural')"
                                data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                Cultures
                            </h4>
                        </div>
                        <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo"
                            data-parent="#accordion">
                            <div class="card-body">
                                <div style="overflow:auto">
                                    <table class="table table-sm table-striped table-dark" style="white-space: nowrap;">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Dominant Race</th>
                                                <th>Expansionism</th>
                                                <th>Namebase</th>
                                            </tr>
                                        </thead>
                                        <tbody id="cultures">
                                        </tbody>
                                    </table>
                                </div>
                                <br><button class="btn btn-primary" onclick="newCulture()">Add Culture</button>
                            </div>
                        </div>
                    </div>
                    <div class="card bg-transparent">
                        <div class="card-header" style="cursor: pointer;" id="headingTwo">
                            <h4 class="mb-0" data-toggle="collapse" onclick="changePreset('political')"
                                data-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                States
                            </h4>
                        </div>
                        <div id="collapseFive" class="collapse" aria-labelledby="headingTwo"
                            data-parent="#accordion">
                            <div class="card-body">
                                <div style="overflow:auto">
                                    <table class="table table-sm table-striped table-dark" style="white-space: nowrap;">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Dominant Culture</th>
                                                <th>Expansionism</th>
                                                <th>Form</th>
                                            </tr>
                                        </thead>
                                        <tbody id="states">
                                        </tbody>
                                    </table>
                                </div>
                                <br><button class="btn btn-primary" onclick="newState()">Add State</button>
                                <button type="button" class="btn btn-secondary ml-2"
                                    onclick="editEmblem('state', 'stateCOA1', pack.states[1])">Edit Coat of
                                    Arms</button>
                            </div>
                        </div>
                    </div>
                    <div class="card bg-transparent">
                        <div class="card-header" style="cursor: pointer;" id="headingThree">
                            <h4 class="mb-0" data-toggle="collapse" onclick="changePreset('religions')"
                                data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                Religion Centers
                            </h4>
                        </div>
                        <div id="collapseThree" class="collapse" aria-labelledby="headingThree"
                            data-parent="#accordion">
                            <div class="card-body">
                                <p>Religion centers represent the birth/spread of the religions in your world. These
                                    are
                                    entirely optional. Leaving these blank represents a society where religions are
                                    wide
                                    spread and have no "homelands".
                                <div style="overflow:auto;">
                                    <table class="table table-sm table-striped table-dark" style="white-space: nowrap;">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Origin Culture</th>
                                                <th>Type</th>
                                                <th>Form</th>
                                                <th>Deity</th>
                                                <th>Expansionism</th>
                                                <th>Believers</th>
                                            </tr>
                                        </thead>
                                        <tbody id="religions">
                                        </tbody>
                                    </table>
                                </div>
                                <br><button class="btn btn-primary" onclick="newReligion()">Add Religion</button>
                            </div>
                        </div>
                    </div>
                    <div class="card bg-transparent">
                        <div class="card-header" style="cursor: pointer;" id="headingFour">
                            <h4 class="mb-0" data-toggle="collapse" onclick="changePreset('GMP')"
                                data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                Markers
                            </h4>
                        </div>
                        <div id="collapseFour" class="collapse" aria-labelledby="headingFour"
                            data-parent="#accordion">
                            <div class="card-body">
                                <p>Encounters or points of interest. You'll be able to add/edit details in Story.
                                </p>
                                <div style="overflow:auto;">
                                    <table class="table table-sm table-striped table-dark" id="newMarkerTable"
                                        style="white-space: nowrap;font-size: 2.15vw;">
                                    </table>
                                    <div class="input-group mb-3">
                                        <input type="text" class="form-control"
                                            placeholder="enter unicode for new symbol" id="addIconInput">
                                        <div class="input-group-append" onclick="addIcon()">
                                            <button class="input-group-text" id="basic-addon2">add</button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row pt-3 land-shapes">
                    <h4 class="w-100">Click Land Shape to Generate</h4>
                    <img class="col-4" title="Generate Island" onclick="changeTemplate('highIsland')"
                        src="assets/img/landshapes/island.png">
                    <img class="col-4" title="Generate Archipelago" onclick="changeTemplate('archipelago')"
                        src="assets/img/landshapes/archipelago.png">
                    <img class="col-4" title="Generate Atoll" onclick="changeTemplate('atoll')"
                        src="assets/img/landshapes/atoll.png">
                    <img class="col-4 pt-3" title="Generate Isthmus" onclick="changeTemplate('isthmus')"
                        src="assets/img/landshapes/isthmus.png">
                    <img class="col-4 pt-3" title="Generate Random" onclick="changeTemplate('random')"
                        src="assets/img/landshapes/random.png">
                    <img class="col-4 pt-3" title="Generate Mediterranean" onclick="changeTemplate('mediterranean')"
                        src="assets/img/landshapes/mediterranean.png">
                    <img class="col-4 pt-3" title="Generate Continents" onclick="changeTemplate('continents')"
                        src="assets/img/landshapes/two_continents.png">
                    <img class="col-4 pt-3" title="Generate Pangea" onclick="changeTemplate('pangea')"
                        src="assets/img/landshapes/pangea.png">
                    <img class="col-4 pt-3" title="Generate Inland" onclick="changeTemplate('taklamakan')"
                        src="assets/img/landshapes/inland.png">
                </div>

            </div>
            <div class="col-7" id="map-wrapper">
                <div class="map-templates w-100">
                    <div class="btn-group justify-content-center">
                        <button class="btn btn-primary"
                            onclick="changePreset('GMP');svg.attr('data-filter', null).attr('filter', null);">Default</button>
                        <button class="btn btn-primary" onclick="changePreset('political')">Political</button>
                        <button class="btn btn-primary" onclick="changePreset('religions')">Religions</button>
                        <button class="btn btn-primary" onclick="changePreset('cultural')">Cultural</button>
                    </div>

                </div>
                <svg id="map" height="100%" width="100%" version="1.1">
                    <defs>
                        <g id="filters">
                            <filter id="blurFilter" name="Blur 0.2" x="-1" y="-1" width="100" height="100">
                                <feGaussianBlur in="SourceGraphic" stdDeviation="0.2" />
                            </filter>
                            <filter id="blur1" name="Blur 1" x="-1" y="-1" width="100" height="100">
                                <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
                            </filter>
                            <filter id="blur3" name="Blur 3" x="-1" y="-1" width="100" height="100">
                                <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
                            </filter>
                            <filter id="blur5" name="Blur 5" x="-1" y="-1" width="100" height="100">
                                <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
                            </filter>
                            <filter id="blur7" name="Blur 7" x="-1" y="-1" width="100" height="100">
                                <feGaussianBlur in="SourceGraphic" stdDeviation="7" />
                            </filter>
                            <filter id="blur10" name="Blur 10" x="-1" y="-1" width="100" height="100">
                                <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
                            </filter>
                            <filter id="splotch" name="Splotch">
                                <feTurbulence type="fractalNoise" baseFrequency=".01" numOctaves="4" />
                                <feColorMatrix values="0 0 0 0 0, 0 0 0 0 0, 0 0 0 0 0, 0 0 0 -0.9 1.2"
                                    result="texture" />
                                <feComposite in="SourceGraphic" in2="texture" operator="in" />
                            </filter>
                            <filter id="bluredSplotch" name="Blurred Splotch">
                                <feTurbulence type="fractalNoise" baseFrequency=".01" numOctaves="4" />
                                <feColorMatrix values="0 0 0 0 0, 0 0 0 0 0, 0 0 0 0 0, 0 0 0 -0.9 1.2"
                                    result="texture" />
                                <feComposite in="SourceGraphic" in2="texture" operator="in" />
                                <feGaussianBlur stdDeviation="4" />
                            </filter>
                            <filter id="dropShadow" name="Shadow 2">
                                <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
                                <feOffset dx="1" dy="2" />
                                <feMerge>
                                    <feMergeNode />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                            <filter id="dropShadow01" name="Shadow 0.1">
                                <feGaussianBlur in="SourceAlpha" stdDeviation=".1" />
                                <feOffset dx=".2" dy=".3" />
                                <feMerge>
                                    <feMergeNode />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                            <filter id="dropShadow05" name="Shadow 0.5">
                                <feGaussianBlur in="SourceAlpha" stdDeviation=".5" />
                                <feOffset dx=".5" dy=".7" />
                                <feMerge>
                                    <feMergeNode />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                            <filter id="outline" name="Outline">
                                <feGaussianBlur in="SourceAlpha" stdDeviation="1" />
                                <feMerge>
                                    <feMergeNode />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                            <filter id="pencil" name="Pencil">
                                <feTurbulence baseFrequency="0.03" numOctaves="6" type="fractalNoise" />
                                <feDisplacementMap scale="3" in="SourceGraphic" xChannelSelector="R"
                                    yChannelSelector="G" />
                            </filter>
                            <filter id="turbulence" name="Turbulence">
                                <feTurbulence baseFrequency="0.1" numOctaves="3" type="fractalNoise" />
                                <feDisplacementMap scale="10" in="SourceGraphic" xChannelSelector="R"
                                    yChannelSelector="G" />
                            </filter>

                            <filter id="paper" name="Paper" x="-20%" y="-20%" width="140%" height="140%"
                                filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse"
                                color-interpolation-filters="sRGB">
                                <feGaussianBlur stdDeviation="1 1" x="0%" y="0%" width="100%" height="100%"
                                    in="SourceGraphic" edgeMode="none" result="blur" />
                                <feTurbulence type="fractalNoise" baseFrequency="0.05 0.05" numOctaves="4" seed="1"
                                    stitchTiles="stitch" result="turbulence" />
                                <feDiffuseLighting surfaceScale="2" diffuseConstant="1" lighting-color="#707070"
                                    in="turbulence" result="diffuseLighting">
                                    <feDistantLight azimuth="45" elevation="20" />
                                </feDiffuseLighting>
                                <feComposite in="diffuseLighting" in2="blur" operator="lighter" result="composite" />
                                <feComposite in="composite" in2="SourceGraphic" operator="in" x="0%" y="0%" width="100%"
                                    height="100%" result="composite1" />
                            </filter>

                            <filter id="crumpled" name="Crumpled" x="-20%" y="-20%" width="140%" height="140%"
                                filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse"
                                color-interpolation-filters="sRGB">
                                <feGaussianBlur stdDeviation="2 2" x="0%" y="0%" width="100%" height="100%"
                                    in="SourceGraphic" edgeMode="none" result="blur" />
                                <feTurbulence type="turbulence" baseFrequency="0.05 0.05" numOctaves="4" seed="1"
                                    stitchTiles="stitch" result="turbulence" />
                                <feDiffuseLighting surfaceScale="2" diffuseConstant="1" lighting-color="#828282"
                                    in="turbulence" result="diffuseLighting">
                                    <feDistantLight azimuth="320" elevation="10" />
                                </feDiffuseLighting>
                                <feComposite in="diffuseLighting" in2="blur" operator="lighter" result="composite" />
                                <feComposite in="composite" in2="SourceGraphic" operator="in" x="0%" y="0%" width="100%"
                                    height="100%" result="composite1" />
                            </filter>

                            <filter id="filter-grayscale" name="Grayscale">
                                <feColorMatrix
                                    values="0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0" />
                            </filter>
                            <filter id="filter-sepia" name="Sepia">
                                <feColorMatrix
                                    values="0.393 0.769 0.189 0 0 0.349 0.686 0.168 0 0 0.272 0.534 0.131 0 0 0 0 0 1 0" />
                            </filter>
                            <filter id="filter-dingy" name="Dingy">
                                <feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0.3 0.3 0 0 0 0 0 1 0"></feColorMatrix>
                            </filter>
                            <filter id="filter-tint" name="Tint">
                                <feColorMatrix values="1.1 0 0 0 0  0 1.1 0 0 0  0 0 0.9 0 0  0 0 0 1 0">
                                </feColorMatrix>
                            </filter>
                        </g>

                        <g id="hatching">
                            <pattern id="hatch0" patternUnits="userSpaceOnUse" width="4" height="4">
                                <line x1="0" y1="0" x2="0" y2="4" style="stroke:black; stroke-width:2" />
                            </pattern>
                            <pattern id="hatch1" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse"
                                width="4" height="4">
                                <line x1="0" y1="0" x2="0" y2="4" style="stroke:black; stroke-width:2" />
                            </pattern>
                            <pattern id="hatch2" patternUnits="userSpaceOnUse" width="4" height="4">
                                <line x1="0" y1="0" x2="4" y2="0" style="stroke:black; stroke-width:2" />
                            </pattern>
                            <pattern id="hatch3" patternTransform="rotate(-45 0 0)" patternUnits="userSpaceOnUse"
                                width="4" height="4">
                                <line x1="0" y1="0" x2="0" y2="4" style="stroke:black; stroke-width:2" />
                            </pattern>
                            <pattern id="hatch4" patternUnits="userSpaceOnUse" width="4" height="4">
                                <line x1="0" y1="0" x2="0" y2="4" style="stroke:black; stroke-width:1.5" />
                                <line x1="0" y1="0" x2="4" y2="0" style="stroke:black; stroke-width:1.5" />
                            </pattern>
                            <pattern id="hatch5" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse"
                                width="4" height="4">
                                <line x1="0" y1="0" x2="0" y2="4" style="stroke:black; stroke-width:1.5" />
                                <line x1="0" y1="0" x2="4" y2="0" style="stroke:black; stroke-width:1.5" />
                            </pattern>
                            <pattern id="hatch6" patternUnits="userSpaceOnUse" width="5" height="5">
                                <circle cx="2.5" cy="2.5" r="1" style="fill: black" />
                            </pattern>
                            <pattern id="hatch7" patternUnits="userSpaceOnUse" width="4" height="4">
                                <line x1="0" y1="0" x2="0" y2="3" transform="rotate(-45 0 0)"
                                    style="stroke:black; stroke-width:1.5" />
                            </pattern>
                            <pattern id="hatch8" patternUnits="userSpaceOnUse" width="4" height="4">
                                <line x1="0" y1="0" x2="0" y2="3" style="stroke:black; stroke-width:2.5" />
                            </pattern>
                            <pattern id="hatch9" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse"
                                width="4" height="4">
                                <line x1="0" y1="0" x2="0" y2="3" style="stroke:black; stroke-width:2.5" />
                            </pattern>
                            <pattern id="hatch10" patternUnits="userSpaceOnUse" width="4" height="4">
                                <line x1="0" y1="0" x2="3" y2="0" style="stroke:black; stroke-width:2.5" />
                            </pattern>
                            <pattern id="hatch11" patternTransform="rotate(-45 0 0)" patternUnits="userSpaceOnUse"
                                width="4" height="4">
                                <line x1="0" y1="0" x2="0" y2="3" style="stroke:black; stroke-width:2.5" />
                            </pattern>
                            <pattern id="hatch12" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse"
                                width="4" height="4">
                                <line x1="0" y1="1" x2="0" y2="3" style="stroke:black; stroke-width:1.5" />
                                <line x1="1" y1="0" x2="3" y2="0" style="stroke:black; stroke-width:1.5" />
                            </pattern>
                            <pattern id="hatch13" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse"
                                width="4" height="4">
                                <line x1="0" y1="0" x2="0" y2="3" style="stroke:black; stroke-width:1.5" />
                                <line x1="0" y1="0" x2="3" y2="0" style="stroke:black; stroke-width:1.5" />
                            </pattern>
                        </g>

                        <g id="deftemp">
                            <mask id="land"></mask>
                            <mask id="water">
                                <rect x="0" y="0" width="100%" height="100%" fill="white" />
                            </mask>
                            <mask id="fog"
                                style="stroke-width: 10; stroke: black; stroke-linejoin: round; stroke-opacity: .1;">
                                <rect x="0" y="0" width="100%" height="100%" fill="white" stroke="none" />
                            </mask>
                            <g id="textPaths"></g>
                            <g id="statePaths"></g>
                            <g id="defs-emblems"></g>
                        </g>

                        <g id="defs-markers">
                            <symbol id="marker0" viewBox="0 0 30 30">
                                <path d="M6,19 l9,10 L24,19" fill="#000000" stroke="none" />
                                <circle cx="15" cy="15" r="10" stroke-width="1" stroke="#000000" fill="#ffffff" />
                                <text x="50%" y="50%" fill="#000000" stroke-width="0" stroke="#3200ff" font-size="22px"
                                    dominant-baseline="central">?</text>
                            </symbol>
                        </g>

                        <pattern id="oceanic" width="100" height="100" patternUnits="userSpaceOnUse">
                            <image id="oceanicPattern" href="/fmg/images/pattern1.png"></image>
                        </pattern>
                    </defs>
                    <g id="viewbox" shape-rendering="geometricPrecision" style="cursor: default;">
                        <g id="ocean">
                            <g id="oceanLayers" layers="-6,-3,-1">
                                <rect id="oceanBase" x="0" y="0" width="2000" height="2000" fill="#466eab"></rect>
                            </g>
                            <g id="oceanPattern">
                                <rect fill="url(#oceanic)" x="0" y="0" width="2000" height="2000" opacity="0.2"></rect>
                            </g>
                        </g>
                        <g id="lakes">
                            <g id="freshwater" opacity="0.5" fill="#a6c1fd" stroke="#5f799d" stroke-width="0.7"></g>
                            <g id="salt" opacity="0.5" fill="#409b8a" stroke="#388985" stroke-width="0.7"></g>
                            <g id="sinkhole" opacity="1" fill="#5bc9fd" stroke="#53a3b0" stroke-width="0.7"></g>
                            <g id="frozen" opacity="0.95" fill="#cdd4e7" stroke="#cfe0eb" stroke-width="0"></g>
                            <g id="lava" opacity="0.7" fill="#90270d" stroke="#f93e0c" stroke-width="2"
                                filter="url(#crumpled)"></g>
                            <g id="dry" opacity="1" fill="#c9bfa7" stroke="#8e816f" stroke-width="0.7"></g>
                        </g>
                        <g id="landmass" opacity="1" fill="beige">
                            <rect x="0" y="0" width="2000" height="2000"></rect>
                        </g>
                        <g id="texture" mask="url(#land)"></g>
                        <g id="terrs" mask="url(#land)" stroke="none" scheme="bright" terracing="0" skip="5" relax="0"
                            curve="0"></g>
                        <g id="biomes" mask="url(#land)"></g>
                        <g id="cells"></g>
                        <g id="gridOverlay"></g>
                        <g id="coordinates"></g>
                        <g id="compass"></g>
                        <g id="rivers" fill="#5d97bb"></g>
                        <g id="terrain" set="colored" size="1.3" density="0.2"></g>
                        <g id="relig" opacity="0.7" stroke="#777777" stroke-width="0"></g>
                        <g id="cults" opacity="0.6" stroke="#777777" stroke-width="0.5"></g>
                        <g id="regions">
                            <g id="statesBody" opacity="0.4"></g>
                            <g id="statesHalo" data-width="10" stroke-width="10" opacity="0.4" filter="blur(5px)"
                                style="display: block;"></g>
                        </g>
                        <g id="provs" opacity="0.7" fill="#000000" font-family="Georgia" data-size="10" font-size="10">
                        </g>
                        <g id="zones" opacity="0.6" stroke="#333333" stroke-width="0" stroke-linecap="butt"
                            style="display: none;"></g>
                        <g id="borders">
                            <g id="stateBorders" opacity="0.8" stroke="#56566d" stroke-width="1" stroke-dasharray="2"
                                stroke-linecap="butt"></g>
                            <g id="provinceBorders" opacity="0.8" stroke="#56566d" stroke-width="0.5"
                                stroke-dasharray="0 2" stroke-linecap="round"></g>
                        </g>
                        <g id="routes">
                            <g id="roads" opacity="0.9" stroke="#d06324" stroke-width="0.7" stroke-dasharray="2"
                                stroke-linecap="butt"></g>
                            <g id="trails" opacity="0.9" stroke="#d06324" stroke-width="0.25" stroke-dasharray=".8 1.6"
                                stroke-linecap="butt"></g>
                            <g id="searoutes" opacity="0.8" stroke="#ffffff" stroke-width="0.45" stroke-dasharray="1 2"
                                stroke-linecap="round"></g>
                        </g>
                        <g id="temperature" fill="#000000" stroke-width="1.8" fill-opacity="0.3" font-size="8px"></g>
                        <g id="coastline">
                            <g id="sea_island" opacity="0.5" stroke="#1f3846" stroke-width="0.7" auto-filter="1"
                                filter="url(#dropShadow)"></g>
                            <g id="lake_island" opacity="1" stroke="#7c8eaf" stroke-width="0.35"></g>
                        </g>
                        <g id="ice" opacity="0.9" fill="#e8f0f6" stroke="#e8f0f6" stroke-width="1"
                            filter="url(#dropShadow05)" style=""></g>
                        <g id="prec" style="display: none;"></g>
                        <g id="prec" stroke="#000000" stroke-width="0.1" fill="#003dff" style="display: none;">
                            <g id="wind"><text x="20" y="469.34499999999997">⇉</text><text x="952" y="915">⇈</text></g>
                        </g>
                        <g id="emblems" style="display: none;">
                            <g id="burgEmblems"></g>
                            <g id="provinceEmblems"></g>
                            <g id="stateEmblems"></g>
                        </g>
                        <g id="labels">
                            <g id="states" fill="#3e3e4b" opacity="1" stroke="#3a3a3a" stroke-width="0"
                                font-family="Almendra SC" font-size="24" data-size="24"
                                style="text-shadow: white 0px 0px 4px;"></g>
                            <g id="religions" fill="#3e3e4b" opacity="1" stroke="#3a3a3a" stroke-width="0"
                                font-family="Almendra SC" font-size="24" data-size="24"
                                style="text-shadow: white 0px 0px 4px;"></g>
                            <g id="cultures" fill="#3e3e4b" opacity="1" stroke="#3a3a3a" stroke-width="0"
                                font-family="Almendra SC" font-size="24" data-size="24"
                                style="text-shadow: white 0px 0px 4px;"></g>
                            <g id="addedLabels" fill="#3e3e4b" opacity="1" stroke="#3a3a3a" stroke-width="0"
                                font-family="Almendra SC" font-size="18" data-size="18"
                                style="text-shadow: white 0px 0px 4px;"></g>
                            <g id="burgLabels">
                                <g id="cities" fill="#3e3e4b" opacity="1" font-family="Almendra SC" font-size="8"
                                    data-size="8" style="text-shadow: white 0px 0px 4px;"></g>
                                <g id="towns" fill="#3e3e4b" opacity="1" font-family="Almendra SC" font-size="4"
                                    data-size="4" style="text-shadow: white 0px 0px 4px;" class="hidden"></g>
                            </g>
                        </g>
                        <g id="icons">
                            <g id="burgIcons">
                                <g id="cities" opacity="1" size="1" stroke-width="0.24" fill="#ffffff" stroke="#3e3e4b"
                                    fill-opacity="0.7" stroke-dasharray="" stroke-linecap="butt"></g>
                                <g id="towns" opacity="1" size="0.5" stroke-width="0.12" fill="#ffffff" stroke="#3e3e4b"
                                    fill-opacity="0.7" stroke-dasharray="" stroke-linecap="butt"></g>
                            </g>
                            <g id="anchors">
                                <g id="cities" opacity="1" fill="#ffffff" stroke="#3e3e4b" stroke-width="1.2" size="2">
                                </g>
                                <g id="towns" opacity="1" fill="#ffffff" stroke="#3e3e4b" stroke-width="1.2" size="1">
                                </g>
                            </g>
                        </g>
                        <g id="armies" style="display: none;"></g>
                        <g id="markers" rescale="1" filter="url(#dropShadow01)"></g>
                        <g id="fogging-cont" mask="url(#fog)">
                            <g id="fogging" opacity="0.98" fill="#30426f" style="display: none;">
                                <rect x="0" y="0" width="100%" height="100%"></rect>
                                <rect x="0" y="0" width="100%" height="100%" fill="#e8f0f6" filter="url(#splotch)">
                                </rect>
                            </g>
                        </g>
                        <g id="ruler" style="display: none;"></g>
                        <g id="debug"></g>
                    </g>

                    <g id="scaleBar"></g>
                    <g id="initial" opacity=1>
                        <rect x="-1%" y="-1%" width="102%" height="102%" fill="#466eab" />
                        <rect x="-1%" y="-1%" width="102%" height="102%" fill="url(#oceanic)" opacity=".2" />
                        <use href="#rose" id="init-rose" x="50%" y="50%" />
                    </g>
                </svg>
            </div>
        </div>
    </div>
    <div id="loading">
        <div id="titleName">
            <t data-t="titleName">Based on:</t>
        </div>
        <div id="title" style="font-size:2.5rem">
            <t data-t="title">Azgaar's Amazing<br> Fantasy Map Generator</t>
        </div>
        <div id="version">
            <t data-t="version">v. </t>1.66
        </div>
        <p id="loading-text">
            <t data-t="loading">LOADING</t><span>.</span><span>.</span><span>.</span>
        </p>
    </div>
    <div id="optionsContainer" style="opacity:0position: absolute;left: 20vw;display:none">

        <div id="collapsible">
            <button id="optionsTrigger" data-t="tipOptionsTrigger" data-tip="Click to show the Menu. Shortcut: Tab"
                class="options glow" onclick="showOptions(event)" style="padding:.6em .45em">►</button>
            <button id="regenerate" data-t="tipRegenerate" data-tip="Click to generate a new map. Shortcut: F2"
                onclick="regeneratePrompt()" class="options" style="display: none">
                <t data-t="newMap">New Map!</t>
            </button>
        </div>

        <div id="options" style="display:none">
            <div class="drag-trigger" data-t="optionsDragTrigger" data-tip="Drag to move the Menu"></div>

            <div class="tab">
                <button id="optionsHide" data-t="optionsHide" data-tip="Click to hide the Menu. Shortcut: Tab or Esc"
                    class="options" onclick="hideOptions(event)">◄</button>
                <button id="layersTab" data-t="layersTab" data-tip="Click to change map layers" class="options active">
                    <t data-t="layers">Layers</t>
                </button>
                <button id="styleTab" data-t="styleTab" data-tip="Click to open style editor" class="options">
                    <t data-t="style">Style</t>
                </button>
                <button id="optionsTab" data-t="optionsTab" data-tip="Click to change generation and UI options"
                    class="options">
                    <t data-t="options">Options</t>
                </button>
                <button id="toolsTab" data-t="toolsTab" data-tip="Click to open tools menu" class="options">
                    <t data-t="tools">Tools</t>
                </button>
                <button id="aboutTab" data-t="aboutTab" data-tip="Click to see Generator info" class="options">
                    <t data-t="about">About</t>
                </button>
            </div>

            <div id="layersContent" class="tabcontent" style="display: block">
                <p data-tip="Select a map layers preset" style="display: inline-block;">Layers preset:</p>
                <select data-tip="Select a map layers preset" id="layersPreset" onchange="changePreset(this.value)"
                    style="width:45%">
                    <option value="political" selected>Political map</option>
                    <option value="cultural">Cultural map</option>
                    <option value="religions">Religions map</option>
                    <option value="provinces">Provinces map</option>
                    <option value="biomes">Biomes map</option>
                    <option value="heightmap">Heightmap</option>
                    <option value="physical">Physical map</option>
                    <option value="poi">Places of interest</option>
                    <option value="military">Military map</option>
                    <option value="emblems">Emblems</option>
                    <option value="landmass">Pure landmass</option>
                    <option hidden value="custom">Custom (not saved)</option>
                </select>
                <button id="savePresetButton" data-tip="Click to save displayed layers as a new preset"
                    class="icon-plus sideButton" style="display:none" onclick="savePreset()"></button>
                <button id="removePresetButton" data-tip="Click to remove current custom preset"
                    class="icon-minus sideButton" style="display:none" onclick="removePreset()"></button>

                <p data-tip="Click to toggle a layer, drag to raise or lower a layer. Ctrl + click to edit layer style">
                    Displayed layers and layers order:</p>
                <ul data-tip="Click to toggle a layer, drag to raise or lower a layer. Ctrl + click to edit layer style"
                    id="mapLayers">
                    <li id="toggleTexture"
                        data-tip="Texture overlay: click to toggle, drag to raise or lower the layer. Ctrl + click to edit layer style. Shortcut: X"
                        class="buttonoff" onclick="toggleTexture(event)">Te<u>x</u>ture</li>
                    <li id="toggleHeight"
                        data-tip="Heightmap: click to toggle, drag to raise or lower the layer. Ctrl + click to edit layer style. Shortcut: H"
                        class="buttonoff" onclick="toggleHeight(event)"><u>H</u>eightmap</li>
                    <li id="toggleBiomes"
                        data-tip="Biomes: click to toggle, drag to raise or lower the layer. Ctrl + click to edit layer style. Shortcut: B"
                        class="buttonoff" onclick="toggleBiomes(event)"><u>B</u>iomes</li>
                    <li id="toggleCells"
                        data-tip="Cells structure: click to toggle, drag to raise or lower the layer. Ctrl + click to edit layer style. Shortcut: E"
                        class="buttonoff" onclick="toggleCells(event)">C<u>e</u>lls</li>
                    <li id="toggleGrid"
                        data-tip="Grid: click to toggle, drag to raise or lower. Ctrl + click to edit layer style and select type. Shortcut: G"
                        class="buttonoff" onclick="toggleGrid(event)"><u>G</u>rid</li>
                    <li id="toggleCoordinates"
                        data-tip="Coordinate grid: click to toggle, drag to raise or lower the layer. Ctrl + click to edit layer style. Shortcut: O"
                        class="buttonoff" onclick="toggleCoordinates(event)">C<u>o</u>ordinates</li>
                    <li id="toggleCompass"
                        data-tip="Wind (Compass) Rose: click to toggle, drag to raise or lower the layer. Ctrl + click to edit layer style. Shortcut: W"
                        class="buttonoff" onclick="toggleCompass(event)"><u>W</u>ind Rose</li>
                    <li id="toggleRivers"
                        data-tip="Rivers: click to toggle, drag to raise or lower the layer. Ctrl + click to edit layer style. Shortcut: V"
                        onclick="toggleRivers(event)">Ri<u>v</u>ers</li>
                    <li id="toggleRelief"
                        data-tip="Relief and biome icons: click to toggle, drag to raise or lower the layer. Ctrl + click to edit layer style. Shortcut: F"
                        class="buttonoff" onclick="toggleRelief(event)">Relie<u>f</u></li>
                    <li id="toggleReligions"
                        data-tip="Religions: click to toggle, drag to raise or lower the layer. Ctrl + click to edit layer style. Shortcut: R"
                        class="buttonoff" onclick="toggleReligions(event)"><u>R</u>eligions</li>
                    <li id="toggleCultures"
                        data-tip="Cultures: click to toggle, drag to raise or lower the layer. Ctrl + click to edit layer style. Shortcut: C"
                        class="buttonoff" onclick="toggleCultures(event)"><u>C</u>ultures</li>
                    <li id="toggleStates"
                        data-tip="States: click to toggle, drag to raise or lower the layer. Ctrl + click to edit layer style. Shortcut: S"
                        onclick="toggleStates(event)"><u>S</u>tates</li>
                    <li id="toggleProvinces"
                        data-tip="Provinces: click to toggle, drag to raise or lower the layer. Ctrl + click to edit layer style. Shortcut: P"
                        class="buttonoff" onclick="toggleProvinces(event)"><u>P</u>rovinces</li>
                    <li id="toggleZones"
                        data-tip="Zones: click to toggle, drag to raise or lower the layer. Ctrl + click to edit layer style. Shortcut: Z"
                        class="buttonoff" onclick="toggleZones(event)"><u>Z</u>ones</li>
                    <li id="toggleBorders"
                        data-tip="State borders: click to toggle, drag to raise or lower the layer. Ctrl + click to edit layer style. Shortcut: D"
                        onclick="toggleBorders(event)">Bor<u>d</u>ers</li>
                    <li id="toggleRoutes"
                        data-tip="Trade routes: click to toggle, drag to raise or lower the layer. Ctrl + click to edit layer style. Shortcut: U"
                        onclick="toggleRoutes(event)">Ro<u>u</u>tes</li>
                    <li id="toggleTemp"
                        data-tip="Temperature map: click to toggle, drag to raise or lower the layer. Ctrl + click to edit layer style. Shortcut: T"
                        class="buttonoff" onclick="toggleTemp(event)"><u>T</u>emperature</li>
                    <li id="togglePopulation"
                        data-tip="Population map: click to toggle, drag to raise or lower the layer. Ctrl + click to edit layer style. Shortcut: N"
                        class="buttonoff" onclick="togglePopulation(event)">Populatio<u>n</u></li>
                    <li id="toggleIce"
                        data-tip="Icebergs and glaciers: click to toggle, drag to raise or lower the layer. Ctrl + click to edit layer style. Shortcut: J"
                        class="buttonoff" onclick="toggleIce(event)">Ice</li>
                    <li id="togglePrec"
                        data-tip="Precipitation map: click to toggle, drag to raise or lower the layer. Ctrl + click to edit layer style. Shortcut: A"
                        class="buttonoff" onclick="togglePrec(event)">Precipit<u>a</u>tion</li>
                    <li id="toggleEmblems"
                        data-tip="Emblems: click to toggle, drag to raise or lower the layer. Ctrl + click to edit layer style. Shortcut: Y"
                        class="buttonoff" onclick="toggleEmblems(event)">Emblems</li>
                    <li id="toggleLabels"
                        data-tip="Labels: click to toggle, drag to raise or lower the layer. Ctrl + click to edit layer style. Shortcut: L"
                        onclick="toggleLabels(event)"><u>L</u>abels</li>
                    <li id="toggleIcons"
                        data-tip="Burg icons: click to toggle, drag to raise or lower the layer. Ctrl + click to edit layer style. Shortcut: I"
                        onclick="toggleIcons(event)"><u>I</u>cons</li>
                    <li id="toggleMilitary"
                        data-tip="Military forces: click to toggle, drag to raise or lower the layer. Ctrl + click to edit layer style. Shortcut: M"
                        class="buttonoff" onclick="toggleMilitary(event)"><u>M</u>ilitary</li>
                    <li id="toggleMarkers"
                        data-tip="Markers: click to toggle, drag to raise or lower the layer. Ctrl + click to edit layer style. Shortcut: K"
                        class="buttonoff" onclick="toggleMarkers(event)">Mar<u>k</u>ers</li>
                    <li id="toggleRulers"
                        data-tip="Rulers: click to toggle, drag to move, click on label to delete. Ctrl + click to edit layer style. Shortcut: = (equal)"
                        class="buttonoff" onclick="toggleRulers(event)">Rulers</li>
                    <li id="toggleScaleBar"
                        data-tip="Scale Bar: click to toggle. Ctrl + click to edit style. Shortcut: / (slash)"
                        onclick="toggleScaleBar(event)" class="solid">Scale Bar</li>
                </ul>

                <div id="viewMode" data-tip="Set view node">
                    <p>View mode:</p>
                    <button data-tip="Standard view mode that allows to edit the map" id="viewStandard"
                        class="pressed">Standard</button>
                    <button
                        data-tip="Map presentation in 3D scene. Works best for heightmap. Cannot be used for editing"
                        id="viewMesh">3D scene</button>
                    <button data-tip="Project map on globe. Cannot be used for editing" id="viewGlobe">Globe</button>
                </div>
            </div>

            <div id="styleContent" class="tabcontent">
                <p data-tip="Select a style preset. State labels may required regeneration if font is changed"
                    style="display: inline-block">Style preset:</p>
                <select data-tip="Select a style preset" id="stylePreset" onchange="changeStylePreset(this.value)"
                    style="width:45%">
                    <option value="styleDefault" data-system=1 selected>Default</option>
                    <option value="styleAncient" data-system=1>Ancient</option>
                    <option value="styleGloom" data-system=1>Gloom</option>
                    <option value="styleClean" data-system=1>Clean</option>
                    <option value="styleLight" data-system=1>Light</option>
                    <option value="styleWatercolor" data-system=1>Watercolor</option>
                    <option value="styleMonochrome" data-system=1>Monochrome</option>
                </select>
                <button id="addStyleButton" data-tip="Click to save current style as a new preset"
                    class="icon-plus sideButton" style="display: inline-block" onclick="addStylePreset()"></button>
                <button id="removeStyleButton" data-tip="Click to remove current custom style preset"
                    class="icon-minus sideButton" style="display: none" onclick="removeStylePreset()"></button>

                <p data-tip="Select an element to edit its style" style="display: inline-block;">Select element:</p>
                <select data-tip="Select an element to edit its style (list is ordered alphabetically)"
                    id="styleElementSelect" style="width:42%">
                    <option value="anchors">Anchor Icons</option>
                    <option value="biomes">Biomes</option>
                    <option value="borders">Borders</option>
                    <option value="burgIcons">Burg Icons</option>
                    <option value="cells">Cells</option>
                    <option value="coastline">Coastline</option>
                    <option value="coordinates">Coordinates</option>
                    <option value="cults">Cultures</option>
                    <option value="emblems">Emblems</option>
                    <option value="fogging">Fogging</option>
                    <option value="gridOverlay">Grid</option>
                    <option value="terrs">Heightmap</option>
                    <option value="ice">Ice</option>
                    <option value="labels">Labels</option>
                    <option value="lakes">Lakes</option>
                    <option value="landmass">Landmass</option>
                    <option value="legend">Legend</option>
                    <option value="markers">Markers</option>
                    <option value="armies">Military</option>
                    <option value="ocean">Ocean</option>
                    <option value="population">Population</option>
                    <option value="prec">Precipitation</option>
                    <option value="provs">Provinces</option>
                    <option value="terrain">Relief Icons</option>
                    <option value="relig">Religions</option>
                    <option value="rivers">Rivers</option>
                    <option value="routes">Routes</option>
                    <option value="ruler">Rulers</option>
                    <option value="regions" selected>States</option>
                    <option value="temperature">Temperature</option>
                    <option value="texture">Texture</option>
                    <option value="compass">Wind Rose</option>
                    <option value="zones">Zones</option>
                </select>

                <table id="styleElements">
                    <caption id="styleIsOff"
                        data-tip="The selected layer is not visible. Toogle it on to see style changes effect">Ensure
                        the element visibility is toggled on!</caption>

                    <tbody id="styleGroup">
                        <tr data-tip="Select element group">
                            <td><b>Group</b></td>
                            <td>
                                <select id="styleGroupSelect"></select>
                            </td>
                        </tr>
                    </tbody>

                    <tbody id="styleOpacity" style="display: block">
                        <tr data-tip="Set opacity. 0: transparent, 1: solid">
                            <td>Opacity</td>
                            <td>
                                <input id="styleOpacityInput" type="range" min=0 max=1 step=0.01 value=.4>
                                <output id="styleOpacityOutput">0.4</output>
                            </td>
                        </tr>
                    </tbody>

                    <tbody id="styleLegend">
                        <tr data-tip="Set maximum number of items in one column">
                            <td>Column items</td>
                            <td>
                                <input id="styleLegendColItems" type="range" min=1 max=30 step=1 value=8>
                                <output id="styleLegendColItemsOutput">8</output>
                            </td>
                        </tr>

                        <tr data-tip="Set background color">
                            <td>Background</td>
                            <td>
                                <input id="styleLegendBack" type="color" value="#ffffff" />
                                <output id="styleLegendBackOutput">#ffffff</output>
                            </td>
                        </tr>

                        <tr data-tip="Set background opacity">
                            <td>Opacity</td>
                            <td>
                                <input id="styleLegendOpacity" type="range" min=0 max=1 step=0.01 value=1>
                                <output id="styleLegendOpacityOutput">1</output>
                            </td>
                        </tr>
                    </tbody>

                    <tbody id="stylePopulation">
                        <tr data-tip="Set bar color for rural population">
                            <td>Rural color</td>
                            <td>
                                <input id="stylePopulationRuralStrokeInput" type="color" value="#0000ff" />
                                <output id="stylePopulationRuralStrokeOutput">#0000ff</output>
                            </td>
                        </tr>

                        <tr data-tip="Set bar color for urban population">
                            <td>Urban color</td>
                            <td>
                                <input id="stylePopulationUrbanStrokeInput" type="color" value="#ff0000" />
                                <output id="stylePopulationUrbanStrokeOutput">#ff0000</output>
                            </td>
                        </tr>
                    </tbody>

                    <tbody id="styleTexture">
                        <tr data-tip="Select texture image. Big textures can highly affect performance">
                            <td>Image</td>
                            <td>
                                <select id="styleTextureInput">
                                    <option value="none">None</option>
                                    <option value="default" selected>Default</option>
                                    <option value="https://i.imgur.com/EWvXSou.jpg">Folded paper</option>
                                    <option value="https://i2.wp.com/azgaar.files.wordpress.com/2019/07/marble-big.jpg">
                                        Marble big</option>
                                    <option
                                        value="https://i2.wp.com/azgaar.files.wordpress.com/2019/07/marble-blue-small.jpg">
                                        Marble Blue</option>
                                    <option
                                        value="https://i2.wp.com/azgaar.files.wordpress.com/2019/07/marble-blue-big.jpg">
                                        Marble Blue big</option>
                                    <option
                                        value="https://i2.wp.com/azgaar.files.wordpress.com/2019/07/stone-small.jpg">
                                        Stone small</option>
                                    <option value="https://i2.wp.com/azgaar.files.wordpress.com/2019/07/stone-big.jpg">
                                        Stone big</option>
                                    <option
                                        value="https://i2.wp.com/azgaar.files.wordpress.com/2019/07/timbercut-small.jpg">
                                        Timber Cut small</option>
                                    <option
                                        value="https://i2.wp.com/azgaar.files.wordpress.com/2019/07/timbercut-big.jpg">
                                        Timber Cut big</option>
                                    <option
                                        value="https://i2.wp.com/azgaar.files.wordpress.com/2019/07/antique-small.jpg">
                                        Antique small</option>
                                    <option
                                        value="https://i2.wp.com/azgaar.files.wordpress.com/2019/07/antique-big.jpg">
                                        Antique big</option>
                                    <option
                                        value="https://i2.wp.com/azgaar.files.wordpress.com/2019/07/pergamena-small.jpg">
                                        Pergamena small</option>
                                    <option value="https://i2.wp.com/azgaar.files.wordpress.com/2019/07/mars-small.jpg">
                                        Mars small</option>
                                    <option value="https://i2.wp.com/azgaar.files.wordpress.com/2019/07/mars-big.jpg">
                                        Mars big</option>
                                    <option
                                        value="https://i2.wp.com/azgaar.files.wordpress.com/2019/07/mercury-small.jpg">
                                        Mercury small</option>
                                    <option
                                        value="https://i2.wp.com/azgaar.files.wordpress.com/2019/07/mercury-big.jpg">
                                        Mercury big</option>
                                    <option
                                        value="https://i2.wp.com/azgaar.files.wordpress.com/2019/07/mauritania-small.jpg">
                                        Mauritania small</option>
                                    <option value="https://i2.wp.com/azgaar.files.wordpress.com/2019/07/iran-small.jpg">
                                        Iran small</option>
                                    <option
                                        value="https://i2.wp.com/azgaar.files.wordpress.com/2019/07/spain-small.jpg">
                                        Spain small</option>
                                </select>
                                <button data-tip="Click and provide a URL to image to be set as a texture"
                                    class="icon-plus sideButton" onclick="textureProvideURL()"></button>
                            </td>
                        </tr>

                        <tr data-tip="Shift the texture by axes">
                            <td>Shift by axes</td>
                            <td>
                                <input id="styleTextureShiftX" type="number" value=0
                                    data-tip="Shift texture by x axis in pixels">
                                <input id="styleTextureShiftY" type="number" value=0
                                    data-tip="Shift texture by y axis in pixels">
                            </td>
                        </tr>

                    </tbody>

                    <tbody id="styleOcean">
                        <tr data-tip="Select ocean pattern">
                            <td>Pattern</td>
                            <td>
                                <select id="styleOceanPattern">
                                    <option value="">No pattern</option>
                                    <option value="./images/pattern1.png">Pattern 1</option>
                                    <option value="./images/pattern2.png">Pattern 2</option>
                                    <option value="./images/pattern3.png">Pattern 3</option>
                                    <option value="./images/pattern4.png">Pattern 4</option>
                                    <option value="./images/pattern5.png">Pattern 5</option>
                                    <option value="./images/pattern6.png">Pattern 6</option>
                                    <option value="./images/kiwiroo.png">Kiwiroo</option>
                                </select>
                            </td>
                        </tr>

                        <tr data-tip="Set ocean pattern opacity">
                            <td>Pattern opacity</td>
                            <td>
                                <input id="styleOceanPatternOpacity" type="range" min=0 max=1 step=.01 value=.2 />
                                <output id="styleOceanPatternOpacityOutput">0.2</output>
                            </td>
                        </tr>

                        <tr data-tip="Define the coast outline contours scheme">
                            <td>Ocean layers</td>
                            <td>
                                <select id="outlineLayers">
                                    <option value="none">No outline</option>
                                    <option value="random">Random</option>
                                    <option value="-6,-3,-1" selected>Standard 3</option>
                                    <option value="-6,-4,-2">Indented 3</option>
                                    <option value="-9,-6,-3,-1">Standard 4</option>
                                    <option value="-6,-5,-4,-3,-2,-1">Smooth 6</option>
                                    <option value="-9,-8,-7,-6,-5,-4,-3,-2,-1">Smooth 9</option>
                                </select>
                            </td>
                        </tr>

                        <tr data-tip="Set ocean color">
                            <td>Color</td>
                            <td>
                                <input id="styleOceanFill" type="color" value="#466eab" />
                                <output id="styleOceanFillOutput">#466eab</output>
                            </td>
                        </tr>
                    </tbody>

                    <tbody id="styleGrid">
                        <tr data-tip="Select grid overlay type">
                            <td>Type</td>
                            <td>
                                <select id="styleGridType">
                                    <option value="pointyHex">Hex grid (pointy)</option>
                                    <option value="flatHex">Hex grid (flat)</option>
                                    <option value="square">Square grid</option>
                                </select>
                            </td>
                        </tr>

                        <tr data-tip="Set grid cells scale multiplier">
                            <td>Scale</td>
                            <td>
                                <input id="styleGridScale" type="number" min=.1 max=10 step=.01>
                                <output id="styleGridSizeFriendly"
                                    data-tip="Distance between grid cell centers (in map scale)"></output>
                            </td>
                        </tr>

                        <tr data-tip="Shift the element by axes">
                            <td>Shift by axes</td>
                            <td>
                                <input id="styleGridShiftX" type="number" data-tip="Shift by x axis in pixels">
                                <input id="styleGridShiftY" type="number" data-tip="Shift by y axis in pixels">
                            </td>
                        </tr>
                    </tbody>

                    <tbody id="styleShift">
                        <tr data-tip="Shift the element by axes">
                            <td>Shift by axes</td>
                            <td>
                                <input id="styleShiftX" type="number" data-tip="Shift by x axis in pixels">
                                <input id="styleShiftY" type="number" data-tip="Shift by y axis in pixels">
                            </td>
                        </tr>
                    </tbody>

                    <tbody id="styleCompass">
                        <tr data-tip="Set wind (compass) rose size">
                            <td>Size</td>
                            <td>
                                <input id="styleCompassSizeInput" type="range" min=.02 max=1 step=.01 value=.25>
                                <output id="styleCompassSizeOutput">.25</output>
                            </td>
                        </tr>

                        <tr data-tip="Shift wind (compass) rose by axes">
                            <td>Shift by axes</td>
                            <td>
                                <input id="styleCompassShiftX" type="number" value=80
                                    data-tip="Shift by x axis in pixels">
                                <input id="styleCompassShiftY" type="number" value=80
                                    data-tip="Shift by y axis in pixels">
                            </td>
                        </tr>
                    </tbody>

                    <tbody id="styleRelief">
                        <tr data-tip="Select set of relief icons. All relief icons will be regenerated">
                            <td>Style</td>
                            <td>
                                <select id="styleReliefSet">
                                    <option value="simple" selected>Simple</option>
                                    <option value="gray">Gray</option>
                                    <option value="colored">Colored</option>
                                </select>
                            </td>
                        </tr>

                        <tr data-tip="Define the size of relief icons. All relief icons will be regenerated">
                            <td>Size</td>
                            <td>
                                <input id="styleReliefSizeInput" data-stored="reliefSize" type="range" min=.2 max=4
                                    step=.01>
                                <output id="styleReliefSizeOutput"></output>
                            </td>
                        </tr>

                        <tr
                            data-tip="Define the density of relief icons. All relief icons will be regenerated. Highly affects performance!">
                            <td>Density</td>
                            <td>
                                <input id="styleReliefDensityInput" data-stored="reliefDensity" type="range" min=.3
                                    max=.8 step=.01 value=.4>
                                <output id="styleReliefDensityOutput">.4</output>
                            </td>
                        </tr>
                    </tbody>

                    <tbody id="styleFill">
                        <tr data-tip="Set fill color">
                            <td>Fill</td>
                            <td>
                                <input id="styleFillInput" type="color" value="#5E4FA2" />
                                <output id="styleFillOutput">#5E4FA2</output>
                            </td>
                        </tr>
                    </tbody>

                    <tbody id="styleStroke">
                        <tr data-tip="Set stroke color">
                            <td>Stroke</td>
                            <td>
                                <input id="styleStrokeInput" type="color" value="#5E4FA2" />
                                <output id="styleStrokeOutput">#5E4FA2</output>
                            </td>
                        </tr>
                    </tbody>

                    <tbody id="styleStrokeWidth">
                        <tr data-tip="Set stroke width">
                            <td>Stroke width</td>
                            <td>
                                <input id="styleStrokeWidthInput" type="range" min=0 max=5 step=.01 value=1>
                                <output id="styleStrokeWidthOutput">1</output>
                            </td>
                        </tr>
                    </tbody>

                    <tbody id="styleStrokeDash">
                        <tr data-tip="Set stroke dash array (e.g. 5 2) and linecap">
                            <td>Stroke dash</td>
                            <td>
                                <input id="styleStrokeDasharrayInput" type="text" value="1 2" style="width:26%">
                                <select id="styleStrokeLinecapInput" style="width:32%">
                                    <option value="inherit" selected>Inherit</option>
                                    <option value="butt">Butt</option>
                                    <option value="round">Round</option>
                                    <option value="square">Square</option>
                                </select>
                            </td>
                        </tr>
                    </tbody>

                    <tbody id="styleShadow">
                        <tr data-tip="Set text shadow">
                            <td>Text shadow</td>
                            <td>
                                <input id="styleShadowInput" type="text" value="0 0 4px white" />
                            </td>
                        </tr>
                    </tbody>

                    <tbody id="styleFont">
                        <tr data-tip="Select font">
                            <td>Font</td>
                            <td>
                                <select id="styleSelectFont"></select>
                                <button id="styleFontAdd" data-tip="Add a font" class="icon-plus sideButton"></button>
                            </td>
                        </tr>
                    </tbody>

                    <tbody id="styleSize">
                        <tr data-tip="Set font size">
                            <td>Font size</td>
                            <td>
                                <button id="styleFontPlus" data-tip="Increase font" class="whiteButton">+</button>
                                <button id="styleFontMinus" data-tip="Descrease font" class="whiteButton">-</button>
                                <input id="styleFontSize" type="number" min=.5 max=100 step=.1 value=14>
                            </td>
                        </tr>
                    </tbody>

                    <tbody id="styleRadius">
                        <tr data-tip="Set icon size">
                            <td>Radius</td>
                            <td>
                                <button id="styleRadiusPlus" data-tip="Multiply radius by 1.1"
                                    class="whiteButton">+</button>
                                <button id="styleRadiusMinus" data-tip="Multiply radius by 1.1"
                                    class="whiteButton">-</button>
                                <input id="styleRadiusInput" type="number" min=.2 max=10 step=.02 value=1>
                            </td>
                        </tr>
                    </tbody>

                    <tbody id="styleIconSize">
                        <tr data-tip="Set icon size">
                            <td>Size</td>
                            <td>
                                <button id="styleIconSizePlus" data-tip="Multiply size by 1.1"
                                    class="whiteButton">+</button>
                                <button id="styleIconSizeMinus" data-tip="Multiply size by 1.1"
                                    class="whiteButton">-</button>
                                <input id="styleIconSizeInput" type="number" min=.2 max=10 step=.02 value=1>
                            </td>
                        </tr>
                    </tbody>

                    <tbody id="styleCoastline">
                        <tr data-tip="Allow system to apply filter automatically based on zoom level">
                            <td colspan=2>
                                <input id="styleCoastlineAuto" class="checkbox" type="checkbox">
                                <label for="styleCoastlineAuto" class="checkbox-label">Automatically change filter on
                                    zoom</label>
                            </td>
                        </tr>
                    </tbody>

                    <tbody id="styleTemperature">
                        <tr data-tip="Define transparency of temperature leyer. Set to 0 to make it fully transparent">
                            <td>Fill opacity</td>
                            <td>
                                <input id="styleTemperatureFillOpacityInput" type="range" min=0 max=1 step=.01
                                    value=.3 />
                                <output id="styleTemperatureFillOpacityOutput">0.3</output>
                            </td>
                        </tr>

                        <tr data-tip="Set labels size">
                            <td>Labels size</td>
                            <td>
                                <input id="styleTemperatureFontSizeInput" type="range" min=0 max=30 value=8 />
                                <output id="styleTemperatureFontSizeOutput">8</output>
                            </td>
                        </tr>

                        <tr data-tip="Set labels color">
                            <td>Labels color</td>
                            <td>
                                <input id="styleTemperatureFillInput" type="color" />
                                <output id="styleTemperatureFillOutput">#000</output>
                            </td>
                        </tr>
                    </tbody>

                    <tbody id="styleStates" style="display: block">
                        <tr data-tip="Set states fill opacity. 0: invisible, 1: solid">
                            <td>Body opacity</td>
                            <td>
                                <input id="styleStatesBodyOpacity" type="range" min=0 max=1 step=0.01>
                                <output id="styleStatesBodyOpacityOutput"></output>
                            </td>
                        </tr>

                        <tr data-tip="Select filter for states fill. Please note filters may cause performance issues!">
                            <td>Body filter</td>
                            <td><select id="styleStatesBodyFilter" /></td>
                        </tr>

                        <tr data-tip="Set states halo effect width">
                            <td>Halo width</td>
                            <td>
                                <input id="styleStatesHaloWidth" type="range" min=0 max=30 step=.1 value=10>
                                <output id="styleStatesHaloWidthOutput">10</output>
                            </td>
                        </tr>

                        <tr data-tip="Set states halo effect opacity. 0: invisible, 1: solid">
                            <td>Halo opacity</td>
                            <td>
                                <input id="styleStatesHaloOpacity" type="range" min=0 max=1 step=0.01 value=1>
                                <output id="styleStatesHaloOpacityOutput">1</output>
                            </td>
                        </tr>

                        <tr data-tip="Select halo effect power (blur). Set to 0 to make it solid line">
                            <td>Halo blur</td>
                            <td>
                                <input id="styleStatesHaloBlur" type="range" min=0 max=10 step=0.01 value=4>
                                <output id="styleStatesHaloBlurOutput">4</output>
                            </td>
                        </tr>
                    </tbody>

                    <tbody id="styleHeightmap">
                        <tr data-tip="Select color scheme for the element">
                            <td>Color scheme</td>
                            <td>
                                <select id="styleHeightmapScheme">
                                    <option value="bright" selected>Bright</option>
                                    <option value="light">Light</option>
                                    <option value="green">Green</option>
                                    <option value="monochrome">Monochrome</option>
                                </select>
                            </td>
                        </tr>

                        <tr data-tip="Terracing rate. Set to 0 (toggle off) to improve performance">
                            <td>Terracing</td>
                            <td>
                                <input id="styleHeightmapTerracingInput" type="range" min=0 max=20 step=1>
                                <output id="styleHeightmapTerracingOutput">0</output>
                            </td>
                        </tr>
                        <tr data-tip="Layers reduction rate. Increase to improve performance">
                            <td>Reduce layers</td>
                            <td>
                                <input id="styleHeightmapSkipInput" type="range" min=0 max=10 step=1 value=5>
                                <output id="styleHeightmapSkipOutput">5</output>
                            </td>
                        </tr>

                        <tr data-tip="Line simplification rate. Increase to slightly improve performance">
                            <td>Simplify line</td>
                            <td>
                                <input id="styleHeightmapSimplificationInput" type="range" min=0 max=10 step=1 value=0>
                                <output id="styleHeightmapSimplificationOutput">0</output>
                            </td>
                        </tr>

                        <tr data-tip="Select line interpolation type">
                            <td>Line style</td>
                            <td>
                                <select id="styleHeightmapCurve">
                                    <option value=0 selected>Curved</option>
                                    <option value=1>Linear</option>
                                    <option value=2>Rectangular</option>
                                </select>
                            </td>
                        </tr>
                    </tbody>

                    <tbody id="styleArmies">
                        <tr data-tip="Set fill transparency. Set to 0 to make it fully transparent">
                            <td>Fill opacity</td>
                            <td>
                                <input id="styleArmiesFillOpacity" type="range" min=0 max=1 step=.01 value=1>
                                <output id="styleArmiesFillOpacityOutput">1</output>
                            </td>
                        </tr>
                        <tr
                            data-tip="Set regiment box size. All regiments will be redrawn on change (position will defaulted)">
                            <td>Box Size</td>
                            <td>
                                <input id="styleArmiesSize" type="range" min=1 max=10 step=.1 value=3>
                                <output id="styleArmiesSizeOutput">3</output>
                            </td>
                        </tr>
                    </tbody>

                    <tbody id="styleEmblems">
                        <tr data-tip="Set state emblems size multiplier">
                            <td>State Size</td>
                            <td>
                                <input id="emblemsStateSizeInput" data-stored="emblemsStateSize" type="number" min=0
                                    max=5 step=.02 value=1 />
                            </td>
                        </tr>

                        <tr data-tip="Set province emblems size multiplier">
                            <td>Province Size</td>
                            <td>
                                <input id="emblemsProvinceSizeInput" data-stored="emblemsProvinceSize" type="number"
                                    min=0 max=5 step=.02 value=1 />
                            </td>
                        </tr>

                        <tr data-tip="Set burg emblems size multiplier">
                            <td>Burg Size</td>
                            <td>
                                <input id="emblemsBurgSizeInput" data-stored="emblemsBurgSize" type="number" min=0 max=5
                                    step=.02 value=1 />
                            </td>
                        </tr>

                        <tr
                            data-tip="Allow system to hide emblem groups if their size in too small or too big on that scale">
                            <td colspan="2">
                                <input id="hideEmblems" class="checkbox" type="checkbox"
                                    onchange="invokeActiveZooming()" checked>
                                <label for="hideEmblems" class="checkbox-label">Toggle visibility automatically</label>
                            </td>
                        </tr>
                    </tbody>

                    <tbody id="styleFilter" style="display: block">
                        <tr data-tip="Select filter for element. Please note filters may cause performance issues!">
                            <td>Filter</td>
                            <td><select id="styleFilterInput" /></td>
                        </tr>
                    </tbody>

                    <tbody id="styleClipping">
                        <tr data-tip="Set clipping. Only non-clipped part will be visible">
                            <td>Clipping</td>
                            <td>
                                <select id="styleClippingInput">
                                    <option value="" selected>No clipping</option>
                                    <option value="url(#land)">Clip water</option>
                                    <option value="url(#water)">Clip land</option>
                                </select>
                            </td>
                        </tr>
                    </tbody>

                    <tbody id="styleMarkers">
                        <tr
                            data-tip="Try to keep the same size on any map scale, turn off to get size change depending on scale">
                            <td colspan=2>
                                <input id="styleRescaleMarkers" class="checkbox" type="checkbox">
                                <label for="styleRescaleMarkers" class="checkbox-label">Keep initial size on zoom
                                    change</label>
                            </td>
                        </tr>
                    </tbody>

                    <tbody id="styleVisibility">
                        <tr data-tip="Allow system to hide labels if their size in too small or too big on that scale">
                            <td colspan=2>
                                <input id="hideLabels" class="checkbox" type="checkbox"
                                    onchange="invokeActiveZooming()" checked>
                                <label for="hideLabels" class="checkbox-label">Toggle visibility automatically</label>
                            </td>
                        </tr>

                        <tr data-tip="Allow system to rescale labels on zoom">
                            <td colspan=2>
                                <input id="rescaleLabels" class="checkbox" type="checkbox"
                                    onchange="invokeActiveZooming()" checked>
                                <label for="rescaleLabels" class="checkbox-label">Rescale on zoom</label>
                            </td>
                        </tr>
                    </tbody>
                </table>


            </div>

            <div id="optionsContent" class="tabcontent">
                <p data-tip="Map generation settings. Generate a new map to apply the settings">Map settings (new map to
                    apply):</p>
                <table>

                    <tr
                        data-tip="Canvas width and height in pixels. Defines map size on generation, then map size cannot be changed and canvas size changes only visible area. Keep canvas size equal to screen size or less to improve performance. The best aspect ratio for maps is 2:1">
                        <td></td>
                        <td>Canvas size</td>
                        <td>
                            <input id="mapWidthInput" class="paired" type="number" min=240 value=960>
                            <span>x</span>
                            <input id="mapHeightInput" class="paired" type="number" min=135 value=540>
                            <span>px</span>
                        </td>
                        <td>
                            <i data-tip="Toggle between screen size and initial canvas size" id="toggleFullscreen"
                                class="icon-resize-full-alt"></i>
                        </td>
                    </tr>

                    <tr
                        data-tip="Map seed number. Seed produces the same map only if canvas size and options are the same">
                        <td>
                            <i data-tip="Click to generate a map for this seed" id="optionsSeedGenerate"></i>
                        </td>
                        <td>Map seed</td>
                        <td>
                            <input id="optionsSeed" class="long" type="number" min=1 max=999999999 step=1>
                        </td>
                        <td>
                            <i data-tip="Show seed history to apply a previous seed" id="optionsMapHistory"
                                class="icon-history"></i>
                            <i data-tip="Copy map seed as URL. It will produce the same map only if options are default or the same"
                                id="optionsCopySeed" class="icon-docs"></i>
                        </td>
                    </tr>

                    <tr
                        data-tip="Set number of points to be used for graph generation. Highly affects performance. 10K is the only recommended value">
                        <td></td>
                        <td>Points number</td>
                        <td>
                            <input id="pointsInput" type="range" min=1 max=13 value=13 data-cells=20000>
                        </td>
                        <td>
                            <output id="pointsOutput_formatted" style="color: #053305">10K</output>
                        </td>
                    </tr>

                    <tr data-tip="Define map name (will be used to name downloaded files)">
                        <td>
                            <i data-locked=0 id="lock_mapName" class="icon-lock-open"></i>
                        </td>
                        <td>Map name</td>
                        <td>
                            <input id="mapName" data-stored="mapName" class="long" autocorrect="off"
                                spellcheck="false" type="text">
                        </td>
                        <td>
                            <i data-tip="Regenerate map name" onclick="Names.getMapName(true)"
                                class="icon-arrows-cw"></i>
                        </td>
                    </tr>

                    <tr data-tip="Define current year and era name">
                        <td>
                            <i data-locked=0 id="lock_era" class="icon-lock-open"></i>
                        </td>
                        <td>Year and era</td>
                        <td>
                            <input class="paired" style="width: 24%; float: left; font-size: smaller">
                            <input id="eraInput" data-stored="era" autocorrect="off" spellcheck="false" type="text"
                                style="width: 75%; float: right" class="long">
                        </td>
                        <td>
                            <i id="optionsEraRegenerate" data-tip="Regenerate era" class="icon-arrows-cw"></i>
                        </td>
                    </tr>

                    <tr data-tip="Select template to be used for a Heightmap generation">
                        <td>
                            <i data-locked=0 id="lock_template" class="icon-lock-open"></i>
                        </td>
                        <td>Map template</td>
                        <td>
                            <select id="templateInput" data-stored="template">
                                <option value="volcano">Volcano</option>
                                <option value="highIsland">High Island</option>
                                <option value="lowIsland">Low Island</option>
                                <option value="continents">Two Continents</option>
                                <option value="archipelago">Archipelago</option>
                                <option value="atoll">Atoll</option>
                                <option value="mediterranean">Mediterranean</option>
                                <option value="peninsula">Peninsula</option>
                                <option value="pangea">Pangea</option>
                                <option value="isthmus">Isthmus</option>
                                <option value="shattered">Shattered</option>
                                <option value="taklamakan">Taklamakan</option>
                            </select>
                        </td>
                        <td></td>
                    </tr>

                    <tr data-tip="Define how many Cultures should be generated">
                        <td>
                            <i data-locked=0 id="lock_cultures" class="icon-lock-open"></i>
                        </td>
                        <td>Cultures number</td>
                        <td>
                            <input id="culturesInput" data-stored="cultures" type="range" min=1 max=32
                                {{ $region->states_count }}>
                        </td>
                        <td>
                            <input id="culturesOutput" data-stored="cultures" type="number" min=1 max=32
                                {{ $region->states_count }}>
                        </td>
                    </tr>

                    <tr data-tip="Select a set of cultures to be used for names and cultures generation">
                        <td>
                            <i data-locked=0 id="lock_culturesSet" class="icon-lock-open"></i>
                        </td>
                        <td>Cultures set</td>
                        <td>
                            <select id="culturesSet" data-stored="culturesSet">
                                <option value="world" data-max="32" selected>All-world</option>
                                <option value="european" data-max="15">European</option>
                                <option value="oriental" data-max="13">Oriental</option>
                                <option value="english" data-max="10">English</option>
                                <option value="antique" data-max="10">Antique</option>
                                <option value="highFantasy" data-max="17">High Fantasy</option>
                                <option value="darkFantasy" data-max="18">Dark Fantasy</option>
                                <option value="random" data-max="100">Random</option>
                            </select>
                        </td>
                        <td></td>
                    </tr>

                    <tr data-tip="Define how many states and capitals should be generated">
                        <td>
                            <i data-locked=0 id="lock_regions" class="icon-lock-open"></i>
                        </td>
                        <td>States number</td>
                        <td>
                            <input id="regionsInput" data-stored="regions" type="range" min=0 max=99 value=0>
                        </td>
                        <td>
                            <input id="regionsOutput" data-stored="regions" type="number" min=0 max=99 value=0>
                        </td>
                    </tr>

                    <tr data-tip="Define burgs percentage to form a separate province">
                        <td>
                            <i data-locked=0 id="lock_provinces" class="icon-lock-open"></i>
                        </td>
                        <td>Provinces ratio</td>
                        <td>
                            <input id="provincesInput" data-stored="provinces" type="range" min=0 max=100 value=30>
                        </td>
                        <td>
                            <input id="provincesOutput" data-stored="provinces" type="number" min=0 max=100 value=30>
                        </td>
                    </tr>

                    <tr data-tip="Define how much states and cultures can vary in size. Defines expansionism value">
                        <td>
                            <i data-locked=0 id="lock_power" class="icon-lock-open"></i>
                        </td>
                        <td>Size variety</td>
                        <td>
                            <input id="powerInput" data-stored="power" type="range" min=0 max=10 step=.2 value=5>
                        </td>
                        <td>
                            <input id="powerOutput" data-stored="power" type="number" min=0 max=10 step=.1 value=5>
                        </td>
                    </tr>

                    <tr data-tip="Set state and cultures growth rate. Defines how many lands will stay neutral">
                        <td>
                            <i data-locked=0 id="lock_neutral" class="icon-lock-open"></i>
                        </td>
                        <td>Growth rate</td>
                        <td>
                            <input id="neutralInput" data-stored="neutral" type="number">
                        </td>
                        <td>
                            <input id="neutralOutput" data-stored="neutral" type="number" min=.1 max=2 step=.1 value=1>
                        </td>
                    </tr>

                    <tr data-tip="Define a number of towns to be placed (if enough suitable land exists)">
                        <td>
                            <i data-locked=0 id="lock_manors" class="icon-lock-open"></i>
                        </td>
                        <td>Towns number</td>
                        <td>
                            <input id="manorsInput" data-stored="manors" type="range" min=0 max=1000 step=1 value=100>
                        </td>
                        <td>
                            <output id="manorsOutput" data-stored="manors" value="auto"></output>
                        </td>
                    </tr>

                    <tr
                        data-tip="Define how many organized religions and cults should be generated. Cultures will have their own folk religions in any case">
                        <td>
                            <i data-locked=0 id="lock_religions" class="icon-lock-open"></i>
                        </td>
                        <td>Religions number</td>
                        <td>
                            <input id="religionsInput" data-stored="religions" type="range" min=0 max=50 step=1>
                        </td>
                        <td>
                            <output id="religionsOutput" data-stored="religions" value="auto"></output>
                        </td>
                    </tr>
                </table>

                <p data-tip="Tool settings that don't affect maps. Changes are getting applied immediately">Generator
                    settings:</p>
                <table>
                    <tr data-tip="Set what Generator should do on opening">
                        <td></td>
                        <td>Onload behavior</td>
                        <td>
                            <select id="onloadMap" data-stored="onloadMap">
                                <option value="random" selected>Generate random map</option>
                                <option value="saved">Open last saved map</option>
                            </select>
                        </td>
                        <td></td>
                    </tr>

                    <tr
                        data-tip="Set user interface size. Please note browser zoom also affects interface size (Ctrl + or Ctrl - to change)">
                        <td></td>
                        <td>Interface size</td>
                        <td>
                            <input id="uiSizeInput" data-stored="uiSize" type="range" min=.6 max=3 step=.1 value=1.2>
                        </td>
                        <td>
                            <input id="uiSizeOutput" data-stored="uiSize" type="number" min=.6 max=3 step=.1 value=1.2>
                        </td>
                    </tr>

                    <tr data-tip="Set tooltip size">
                        <td></td>
                        <td>Tooltip size</td>
                        <td>
                            <input id="tooltipSizeInput" data-stored="tooltipSize" type="range" min=4 max=32 value=14>
                        </td>
                        <td>
                            <input id="tooltipSizeOutput" data-stored="tooltipSize" type="number" min=0 max=256
                                value=14>
                        </td>
                    </tr>

                    <tr data-tip="Set dialog and tool windows transparency">
                        <td></td>
                        <td>Transparency</td>
                        <td>
                            <input id="transparencyInput" data-stored="transparency" type="range" min=0 max=100
                                value=15>
                        </td>
                        <td>
                            <input id="transparencyOutput" data-stored="transparency" type="number" min=0 max=100
                                value=15>
                        </td>
                    </tr>

                    <tr data-tip="Select speech synthesis voice to pronounce generated names">
                        <td></td>
                        <td>Speaker voice</td>
                        <td>
                            <select id="speakerVoice" data-stored="speakerVoice"></select>
                        </td>
                        <td>
                            <span id="speakerTest" data-tip="Click to test the voice" style="cursor: pointer">🔊</span>
                        </td>
                    </tr>

                    <tr data-tip="Select emblem shape. Can be changed indivudually in Emblem editor">
                        <td>
                            <i data-locked=0 id="lock_emblemShape" class="icon-lock"></i>
                        </td>
                        <td>Emblem shape</td>
                        <td>
                            <select id="emblemShape" data-stored="emblemShape">
                                <optgroup label="Diversiform">
                                    <option value="culture" selected>Culture-specific</option>
                                    <option value="random">Culture-random</option>
                                    <option value="state">State-specific</option>
                                </optgroup>
                                <option value="random">Random</option>
                                <optgroup label="Basic">
                                    <option value="heater">Heater</option>
                                    <option value="spanish">Spanish</option>
                                    <option value="french">French</option>
                                </optgroup>
                                <optgroup label="Regional">
                                    <option value="horsehead">Horsehead</option>
                                    <option value="horsehead2">Horsehead Edgy</option>
                                    <option value="polish">Polish</option>
                                    <option value="hessen">Hessen</option>
                                    <option value="swiss">Swiss</option>
                                </optgroup>
                                <optgroup label="Historical">
                                    <option value="boeotian">Boeotian</option>
                                    <option value="roman">Roman</option>
                                    <option value="kite">Kite</option>
                                    <option value="oldFrench">Old French</option>
                                    <option value="renaissance">Renaissance</option>
                                    <option value="baroque">Baroque</option>
                                </optgroup>
                                <optgroup label="Specific">
                                    <option value="targe">Targe</option>
                                    <option value="targe2">Targe2</option>
                                    <option value="pavise">Pavise</option>
                                    <option value="wedged">Wedged</option>
                                </optgroup>
                                <optgroup label="Banner">
                                    <option value="flag">Flag</option>
                                    <option value="pennon">Pennon</option>
                                    <option value="guidon">Guidon</option>
                                    <option value="banner">Banner</option>
                                    <option value="dovetail">Dovetail</option>
                                    <option value="gonfalon">Gonfalon</option>
                                    <option value="pennant">Pennant</option>
                                </optgroup>
                                <optgroup label="Simple">
                                    <option value="round">Round</option>
                                    <option value="oval">Oval</option>
                                    <option value="vesicaPiscis">Vesica Piscis</option>
                                    <option value="square">Square</option>
                                    <option value="diamond">Diamond</option>
                                </optgroup>
                                <optgroup label="Fantasy">
                                    <option value="fantasy1">Fantasy1</option>
                                    <option value="fantasy2">Fantasy2</option>
                                    <option value="fantasy3">Fantasy3</option>
                                    <option value="fantasy4">Fantasy4</option>
                                    <option value="fantasy5">Fantasy5</option>
                                </optgroup>
                                <optgroup label="Middle Earth">
                                    <option value="noldor">Noldor</option>
                                    <option value="gondor">Gondor</option>
                                    <option value="easterling">Easterling</option>
                                    <option value="erebor">Erebor</option>
                                    <option value="ironHills">Iron Hills</option>
                                    <option value="urukHai">UrukHai</option>
                                    <option value="moriaOrc">Moria Orc</option>
                                </optgroup>
                            </select>
                        </td>
                        <td>
                            <svg class="emblemShapePreview" viewBox="0 0 200 210">
                                <path id="emblemShapeImage" />
                            </svg>
                        </td>
                    </tr>

                    <tr data-tip="Set minimum and maximum possible zoom level">
                        <td></td>
                        <td>Zoom extent</td>
                        <td>
                            <span data-tip="Mimimal possible zoom level (should be > 0)">min</span>
                            <input data-tip="Mimimal possible zoom level (should be > 0)" id="zoomExtentMin"
                                class="paired" type="number" min=.7 step=.1 max=20 value=0.7>
                            <span data-tip="Maximal possible zoom level (should be > 1)">max</span>
                            <input data-tip="Maximal possible zoom level (should be > 1)" id="zoomExtentMax"
                                class="paired" type="number" min=1 max=50 value=20>
                        </td>
                        <td>
                            <i data-tip="Restore default zoom extent (1, 20)" id="zoomExtentDefault"
                                class="icon-ccw"></i>
                            <i data-tip="Allow to drag map beyond canvas borders" id="translateExtent" data-on=0
                                class="icon-hand-paper-o"></i>
                        </td>
                    </tr>

                    <tr data-tip="Select shape rendering model">
                        <td></td>
                        <td>Shape rendering</td>
                        <td>
                            <select id="shapeRendering" data-stored="shapeRendering">
                                <option value="geometricPrecision" selected>Best quality</option>
                                <option value="optimizeSpeed">Best performace</option>
                            </select>
                        </td>
                        <td></td>
                    </tr>

                    <!-- <tr data-tip="Select language (not all languages are fully supported). Reload the page to apply">
            <td></td>
            <td>Language</td>
            <td>
              <select id="selectLanguage" data-stored="lang">
                <option value="en" selected>English (100%)</option>
                <option value="ru">Русский (1%)</option>
              </select>
            </td>
            <td></td>
          </tr> -->
                </table>

                <div>

                    <button id="optionsReset" data-tip="Click to restore default options (page will be reloaded)"
                        onclick="restoreDefaultOptions()">Reset to defaults</button>
                </div>
            </div>

            <div id="markerEditor" class="dialog" style="display: none">
                <div id="markerBody" style="padding-bottom: .3em;display:flex;flex:column;">
                    <div
                        data-tip="Marker type. Style changes will apply to all markers of the same type. Leave blank if the marker is unique">
                        <div class="label">Type:</div>
                        <input id="markerType" style="width: 10.3em" />
                    </div>

                    <div data-tip="Marker icon. Paste any Unicode symbol or select from the predefined list">
                        <div class="label">Icon:</div>
                        <input id="markerIcon" style="width:5em" />
                        <button id="markerIconSelect" style="width: 5em">select</button>
                    </div>

                    <div data-tip="Marker marker element and icon sizes in pixels">
                        <div class="label">Size:</div>
                        <input data-tip="Marker element size in pixels" id="markerSize" type="number" min="2" max="500"
                            style="width: 5em" />
                        <input data-tip="Marker icon sizes in pixels" id="markerIconSize" type="number" min="2" max="20"
                            step="0.5" style="width: 5em" />
                    </div>

                    <div
                        data-tip="Marker icon shift (by X and by Y axis), percent. Set to 50 to position icon in center">
                        <div class="label">Icon shift:</div>
                        <input id="markerIconShiftX" type="number" min="0" max="100" step="1" style="width:5em" />
                        <input id="markerIconShiftY" type="number" min="0" max="100" step="1" style="width:5em" />
                    </div>

                    <div data-tip="Marker pin shape">
                        <div class="label">Pin shape:</div>
                        <select id="markerPin" style="width: 10.3em">
                            <option value="bubble">Bubble</option>
                            <option value="pin">Pin</option>
                            <option value="square">Square</option>
                            <option value="squarish">Squarish</option>
                            <option value="diamond">Diamond</option>
                            <option value="hex">Hex</option>
                            <option value="hexy">Hexy</option>
                            <option value="shieldy">Shieldy</option>
                            <option value="shield">Shield</option>
                            <option value="pentagon">Pentagon</option>
                            <option value="heptagon">Heptagon</option>
                            <option value="circle">Circle</option>
                            <option value="no">No</option>
                        </select>
                    </div>

                    <div data-tip="Pin fill and stroke colors">
                        <div class="label">Pin colors:</div>
                        <input id="markerFill" type="color" style="width:5em; height:1.6em" />
                        <input id="markerStroke" type="color" style="width:5em; height:1.6em" />
                    </div>
                </div>

                <div id="markerBottom">
                    <button id="markerNotes" data-tip="Edit place legend (notes)" class="icon-edit"></button>
                    <button id="markerLock" class="icon-lock-open" onmouseover="showElementLockTip(event)"></button>
                    <button id="markerAdd" data-tip="Add additional marker of that type"
                        class="icon-plus"></button>
                    <button id="markerRemove" data-tip="Remove the marker. Shortcut: Delete"
                        class="icon-trash fastDelete"></button>
                </div>
            </div>

            <div id="toolsContent" class="tabcontent">
                <p>Click to configure:</p>
                <div>
                    <button id="editHeightmapButton"
                        data-tip="Click to open Heightmap customization menu. Shortcut: Shift + H">Heightmap</button>
                    <button id="editBiomesButton"
                        data-tip="Click to open Biomes Editor. Shortcut: Shift + B">Biomes</button>
                    <button id="editStatesButton"
                        data-tip="Click to open States Editor. Shortcut: Shift + S">States</button>
                    <button id="editProvincesButton"
                        data-tip="Click to open Provinces Editor. Shortcut: Shift + P">Provinces</button>
                    <button id="editDiplomacyButton"
                        data-tip="Click to open Diplomatical relationships Editor. Shortcut: Shift + D">Diplomacy</button>
                    <button id="editCulturesButton"
                        data-tip="Click to open Cultures Editor. Shortcut: Shift + C">Cultures</button>
                    <button id="editNamesBaseButton"
                        data-tip="Click to open Namesbase Editor. Shortcut: Shift + N">Namesbase</button>
                    <button id="editZonesButton"
                        data-tip="Click to open Zones Editor. Shortcut: Shift + Z">Zones</button>
                    <button id="editReligions"
                        data-tip="Click to open Religions Editor. Shortcut: Shift + R">Religions</button>
                    <button id="editEmblemButton"
                        data-tip="Click to open Emblem Editor. Shortcut: Shift + Y">Emblems</button>
                    <button id="editUnitsButton"
                        data-tip="Click to open Units Editor. Shortcut: Shift + Q">Units</button>
                    <button id="editNotesButton"
                        data-tip="Click to open Notes Editor. Shortcut: Shift + O">Notes</button>
                </div>

                <p>Click to overview:</p>
                <div>
                    <button id="overviewBurgsButton"
                        data-tip="Click to open Burgs Overview. Shortcut: Shift + T">Burgs</button>
                    <button id="overviewRiversButton"
                        data-tip="Click to open Rivers Overview. Shortcut: Shift + V">Rivers</button>
                    <button id="overviewMilitaryButton"
                        data-tip="Click to open Military Forces Overview. Shortcut: Shift + M">Military</button>
                    <button id="overviewCellsButton"
                        data-tip="Click to open Cell details view. Shortcut: Shift + E">Cells</button>
                </div>

                <p>Click to regenerate:</p>
                <div id="regenerateFeature">
                    <button id="regenerateStateLabels"
                        data-tip="Click to update state labels placement based on current borders">Labels</button>
                    <button id="regenerateReliefIcons"
                        data-tip="Click to regenerate all relief icons based on current cell biome and elevation">Relief</button>
                    <button id="regenerateRoutes" data-tip="Click to regenerate all routes">Routes</button>
                    <button id="regenerateRivers"
                        data-tip="Click to regenerate all rivers (restore default state)">Rivers</button>
                    <button id="regeneratePopulation"
                        data-tip="Click to recalculate rural and urban population">Population</button>
                    <button id="regenerateStates"
                        data-tip="Click to select new capitals and regenerate states. Emblems and military forces will be regenerated as well, burgs will remain as they are">States</button>
                    <button id="regenerateProvinces"
                        data-tip="Click to regenerate provinces. States will remain as they are">Provinces</button>
                    <button id="regenerateBurgs"
                        data-tip="Click to regenerate all unlocked burgs and routes. States will remain as they are">Burgs</button>
                    <button id="regenerateEmblems" data-tip="Click to regenerate all emblems">Emblems</button>
                    <button id="regenerateReligions" data-tip="Click to regenerate religions">Religions</button>
                    <button id="regenerateCultures" data-tip="Click to regenerate cultures">Cultures</button>
                    <button id="regenerateMilitary"
                        data-tip="Click to recalculate military forces based on current military options">Military</button>
                    <button id="regenerateIce" data-tip="Click to icebergs and glaciers">Ice</button>
                    <button id="regenerateMarkers"
                        data-tip="Click to regenerate markers. Hold Ctrl and click to set markers number multiplier">Markers</button>
                    <button id="regenerateZones"
                        data-tip="Click to regenerate zones. Hold Ctrl and click to set zones number multiplier">Zones</button>
                </div>

                <p>Click to add:</p>
                <div id="addFeature">
                    <button id="addBurgTool"
                        data-tip="Click on map to place a burg. Hold <kbd>Shift</kbd> to add multiple. Shortcut: Shift + 1">Burg</button>
                    <button id="addLabel"
                        data-tip="Click on map to place label. Hold Shift to add multiple. Shortcut: Shift + 2">Label</button>
                    <button id="addRiver"
                        data-tip="Click on map to place a river. Hold Shift to add multiple. Shortcut: Shift + 3">River</button>
                    <button id="addRoute" data-tip="Click on map to place a route. Shortcut: Shift + 4">Route</button>
                    <button id="addMarker"
                        data-tip="Click on map to place a marker. Hold Shift to add multiple. Shortcut: Shift + 5">Marker</button>
                </div>
            </div>

            <div id="customizationMenu" class="tabcontent">
                <p>Heightmap customization tools:</p>
                <div id="customizeTools">
                    <button data-tip="Display brushes panel" id="paintBrushes">Paint Brushes</button>
                    <button data-tip="Open template editor" id="applyTemplate" style="display: none">Template
                        Editor</button>
                    <button data-tip="Open Image Converter" id="convertImage" style="display: none">Image
                        Converter</button>
                    <button data-tip="Render heightmap data as a small monochrome image"
                        id="heightmapPreview">Preview</button>
                    <button data-tip="Preview heightmap in 3D scene" id="heightmap3DView">3D scene</button>
                </div>

                <p>Options:</p>
                <div id="customizeOptions">
                    <div data-tip="Heightmap edit mode">Edit mode: <span id="heightmapEditMode"></span></div>
                    <div data-tip="Render cells below the sea level (with height less than 20)">
                        <input id="renderOcean" class="checkbox" type="checkbox">
                        <label for="renderOcean" class="checkbox-label">Render ocean cells</label>
                    </div>
                    <div id="allowErosionBox"
                        data-tip="Regenerate rivers and allow water flow to change heights and form new lakes. Better to keep checked">
                        <input id="allowErosion" class="checkbox" type="checkbox" checked>
                        <label for="allowErosion" class="checkbox-label">Allow water erosion</label>
                    </div>
                    <div
                        data-tip="Maximum number of iterations taken to resolve depressions. Increase if you have rivers ending nowhere">
                        Depressions filling max iterations:
                        <input id="resolveDepressionsStepsInput" data-stored="resolveDepressionsSteps" type="range"
                            min=0 max=500 value=250>
                        <input id="resolveDepressionsStepsOutput" data-stored="resolveDepressionsSteps" type="number"
                            min=0 max=1000 value=250>
                    </div>

                    <div
                        data-tip="Depression depth to form a new lake. Increase to reduce number of lakes added by system">
                        Depression depth threshold:
                        <input id="lakeElevationLimitInput" data-stored="lakeElevationLimit" type="range" min=0 max=80
                            value=20>
                        <input id="lakeElevationLimitOutput" data-stored="lakeElevationLimit" type="number" min=0 max=80
                            value=20>
                    </div>
                </div>

                <p>Statistics:</p>
                <div>
                    <span>Land cells: </span><span id="landmassCounter">0</span>
                    <span style="margin-left:.9em">Mean height: </span><span id="landmassAverage">0</span>
                </div>

                <p>Cell info:</p>
                <div>
                    <span>Coord: </span><span id="heightmapInfoX"></span>/<span id="heightmapInfoY"></span><br>
                    <span>Cell: </span><span id="heightmapInfoCell"></span><br>
                    <span>Height: </span><span id="heightmapInfoHeight"></span>
                </div>
            </div>

            <div id="aboutContent" class="tabcontent">
                <p><a href="https://github.com/Azgaar/Fantasy-Map-Generator" target="_blank">Fantasy Map Generator</a>
                    is a free <a href="https://github.com/Azgaar/Fantasy-Map-Generator/blob/master/LICENSE"
                        target="_blank">open source</a> tool which procedurally generates fantasy maps. You may use
                    auto-generated maps as they are, edit them or even create a new map from scratch. Check out the <a
                        href="https://github.com/Azgaar/Fantasy-Map-Generator/wiki/Quick-Start-Tutorial"
                        target="_blank">quick start tutorial</a>, <a
                        href="https://github.com/Azgaar/Fantasy-Map-Generator/wiki/Q&A" target="_blank">Q&A</a> and <a
                        href="https://github.com/Azgaar/Fantasy-Map-Generator/wiki/Hotkeys" target="_blank">hotkeys</a>
                    for guidance.</p>
                <p>Join our <a href='https://discordapp.com/invite/X7E84HU' target='_blank'>Discord server</a> and <a
                        href="https://www.reddit.com/r/FantasyMapGenerator/" target="_blank">Reddit community</a> to ask
                    questions, get help and share maps.</p>
                <p>The project is under active development. Creator and main maintainer: Azgaar. To track the
                    development progress see the <a href="https://trello.com/b/7x832DG4/fantasy-map-generator"
                        target="_blank">devboard</a>. For older versions see the <a
                        href="https://github.com/Azgaar/Fantasy-Map-Generator/wiki/Changelog"
                        target="_blank">changelog</a>. Please report bugs <a
                        href="https://github.com/Azgaar/Fantasy-Map-Generator/issues" target="_blank">here</a>. You can
                    also contact me directly via <a href="mailto:azgaar.fmg@yandex.by" target="_blank">email</a>.</p>
                <div
                    style="background-color: #e85b46; padding: .4em; width: max-content; margin: .6em auto 0 auto; border: 1px solid #943838">
                    <a href="https://www.patreon.com/azgaar" target="_blank"
                        style="color: white; text-decoration: none; font-family: sans-serif">
                        <div>
                            <div style="width: .8em; display: inline-block; padding: 0 .2em; fill: white">
                                <svg viewBox="0 0 569 546">
                                    <circle cx="362.589996" cy="204.589996" data-fill="1" id="Oval" r="204.589996" />
                                    <rect data-fill="2" height="545.799988" id="Rectangle" width="100" x="0" y="0" />
                                </svg>
                            </div>SUPPORT ON PATREON
                        </div>
                    </a>
                </div>
                <p>Special thanks to <a data-tip="Click to see list of supporters" onclick="showSupporters()">all
                        supporters</a> on Patreon!</p>

                <ul class="share-buttons">
                    <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fazgaar.github.io%2FFantasy-Map-Generator%2F&quote="
                            data-tip="Share on Facebook" target="_blank"><img alt="Share on Facebook"
                                src="images/Facebook.png" /></a></li>
                    <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fazgaar.github.io%2FFantasy-Map-Generator&text=%23FantasyMapGenerator%0A%0Ahttps%3A//azgaar.github.io/Fantasy-Map-Generator"
                            target="_blank" data-tip="Tweet"><img alt="Tweet" src="images/Twitter.png" /></a></li>
                    <li><a href="http://www.tumblr.com/share?v=3&u=https%3A%2F%2Fazgaar.github.io%2FFantasy-Map-Generator"
                            target="_blank" data-tip="Post to Tumblr"><img alt="Post to Tumblr"
                                src="images/Tumblr.png" /></a></li>
                    <li><a href="http://pinterest.com/pin/create/button/?url=https%3A%2F%2Fazgaar.github.io%2FFantasy-Map-Generator"
                            target="_blank" data-tip="Pin it"><img alt="Pin it" src="images/Pinterest.png" /></a></li>
                    <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fazgaar.github.io%2FFantasy-Map-Generator"
                            target="_blank" data-tip="Submit to Reddit"><img alt="Submit to Reddit"
                                src="images/Reddit.png" /></a></li>
                </ul>
            </div>

        </div>

    </div>

    <div id="exitCustomization">
        <div data-tip="Drag to move the pane">
            <button data-tip="Finalize the heightmap and exit the edit mode" id="finalizeHeightmap">Exit
                Customization</button>
        </div>
    </div>

    <div id="dialogs" style="background-color: #ffffff">

        <div id="worldConfigurator" class="dialog stable" style="display: none">

            <div id="worldControls">
                <div>
                    <i data-locked=0 id="lock_temperatureEquator" class="icon-lock-open"></i>
                    <label data-tip="Set temperature at equator">
                        <i>Equator:</i>
                        <input id="temperatureEquatorInput" data-stored="temperatureEquator" type="number" min="-50"
                            max="50">°C =
                        <span id="temperatureEquatorF"></span>°F
                        <input id="temperatureEquatorOutput" data-stored="temperatureEquator" type="range" min="-50"
                            max="50" />
                    </label>
                </div>
                <div>
                    <i data-locked=0 id="lock_temperaturePole" class="icon-lock-open"></i>
                    <label data-tip="Set temperature near poles">
                        <i>Poles:</i>
                        <input id="temperaturePoleInput" data-stored="temperaturePole" type="number" min="-50"
                            max="50">°C =
                        <span id="temperaturePoleF"></span>°F
                        <input id="temperaturePoleOutput" data-stored="temperaturePole" type="range" min="-50"
                            max="50" />
                    </label>
                </div>
                <div>
                    <i data-locked=0 id="lock_mapSize" class="icon-lock-open"></i>
                    <label data-tip="Set map size relative to the world size">
                        <i>Map size:</i>
                        <input id="mapSizeInput" data-stored="mapSize" type="number" min="1" max="100">%
                        <input id="mapSizeOutput" data-stored="mapSize" type="range" min="1" max="100">
                    </label>
                </div>
                <div>
                    <i data-locked=0 id="lock_latitude" class="icon-lock-open"></i>
                    <label data-tip="Set a North-South map shift">
                        <i>Latitudes:</i>
                        <input id="latitudeInput" data-stored="latitude" type="number" min="0" max="100" step=1>
                        <br><i>N</i><input id="latitudeOutput" data-stored="latitude" type="range" min="0" max="100"
                            step=1 style="width: 10.3em"><i>S</i>
                    </label>
                </div>

                <div>
                    <label
                        data-tip="Set precipitation - water amount clouds can bring. Defines rivers and biomes generation">
                        <i data-locked=0 id="lock_prec" class="icon-lock-open"></i>
                        <i>Precipitation:</i>
                        <input id="precInput" data-stored="prec" type="number">%
                        <input id="precOutput" data-stored="prec" type="range" min="0" max="500" value="50">
                    </label>
                </div>
                <div data-tip="Canvas size. Can be changed in general options on new map generation">
                    <i>Canvas size:</i><br>
                    <span id="mapSize"></span> px = <span id="mapSizeFriendly"></span>
                </div>
                <div>
                    <i data-tip="Length of Meridian. Almost half of the equator length">Meridian length:</i><br>
                    <span id="meridianLength" data-tip="Length of Meridian in pixels"></span> px =
                    <span id="meridianLengthFriendly"
                        data-tip="Length of Meridian is friendly units (depends on user configuration)"></span>
                    <span id="meridianLengthEarth"
                        data-tip="Fantasy world Meridian length relative to real-world Earth (20k km)"></span>
                </div>
                <div data-tip="Map coordinates on globe"><i>Coords:</i> <span id="mapCoordinates"></span></div>
            </div>

            <svg id="globe" width="22em" height="22em" viewBox="-20 -25 240 240">
                <defs>
                    <linearGradient id="temperatureGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop class="tempGradient90" offset="0%" stop-color="blue" />
                        <stop class="tempGradient60" offset="16.6%" stop-color="green" />
                        <stop class="tempGradient30" offset="33.3%" stop-color="yellow" />
                        <stop class="tempGradient0" offset="50%" stop-color="red" />
                        <stop class="tempGradient30" offset="66.6%" stop-color="yellow" />
                        <stop class="tempGradient60" offset="83.3%" stop-color="green" />
                        <stop class="tempGradient90" offset="100%" stop-color="blue" />
                    </linearGradient>
                </defs>
                <g id="globeNoteLines">
                    <line x1="5" x2="220" y1="0" y2="0" />
                    <line x1="5" x2="220" y1="13" y2="13" />
                    <line x1="5" x2="220" y1="49.5" y2="49.5" />
                    <line x1="-5" x2="220" y1="100" y2="100" />
                    <line x1="5" x2="220" y1="150.5" y2="150.5" />
                    <line x1="5" x2="220" y1="187" y2="187" />
                    <line x1="5" x2="220" y1="200" y2="200" />
                </g>
                <g id="globeWindArrows" data-tip="Click to change wind direction" stroke-linejoin="round">
                    <circle cx=210 cy=6 r=12 />
                    <path data-tier=0 d="M210,11 v-10 l-3,3 m6,0 l-3,-3" transform="rotate(225 210 6)" />
                    <circle cx=210 cy=30 r=12 />
                    <path data-tier=1 d="M210,35 v-10 l-3,3 m6,0 l-3,-3" transform="rotate(45 210 30)" />
                    <circle cx=210 cy=75 r=12 />
                    <path data-tier=2 d="M210,80 v-10 l-3,3 m6,0 l-3,-3" transform="rotate(225 210 75)" />
                    <circle cx=210 cy=130 r=12 />
                    <path data-tier=3 d="M210,135 v-10 l-3,3 m6,0 l-3,-3" transform="rotate(315 210 130)" />
                    <circle cx=210 cy=173 r=12 />
                    <path data-tier=4 d="M210,178 v-10 l-3,3 m6,0 l-3,-3" transform="rotate(135 210 173)" />
                    <circle cx=210 cy=194 r=12 />
                    <path data-tier=5 d="M210,199 v-10 l-3,3 m6,0 l-3,-3" transform="rotate(315 210 194)" />
                </g>
                <g id="globaAxisLabels">
                    <text x="82%" y="-4%">wind</text>
                    <text x="-8%" y="-4%">latitude</text>
                </g>
                <g id="globeLatLabels">
                    <text x="-15" y="5">90°</text>
                    <text x="-15" y="18">60°</text>
                    <text x="-15" y="53">30°</text>
                    <text x="-15" y="103">0°</text>
                    <text x="-15" y="153">30°</text>
                    <text x="-15" y="190">60°</text>
                    <text x="-15" y="204">90°</text>
                </g>
                <circle id="globeOutline" cx="100" cy="100" r="100" />
                <line id="globeEquator" x1="1" x2="199" y1="100" y2="100" />
                <path id="globeGraticule" />
                <path id="globeArea" />
            </svg>
        </div>

        <div id="labelEditor" class="dialog" style="display: none">
            <button id="labelGroupShow" data-tip="Show the group selection" class="icon-tags"></button>
            <div id="labelGroupSection" style="display: none">
                <button id="labelGroupHide" data-tip="Hide the group selection" class="icon-tags"></button>
                <select id="labelGroupSelect" data-tip="Select a group for this label" style="width:10em"></select>
                <input id="labelGroupInput" placeholder="new group name" data-tip="Provide a name for the new group"
                    style="display:none; width:10em">
                <span id="labelGroupNew" data-tip="Create new group for this label" class="icon-plus pointer"></span>
                <span id="labelGroupRemove" data-tip="Remove the Group with all labels"
                    class="icon-trash-empty pointer"></span>
            </div>

            <button id="labelTextShow" data-tip="Show the edit label text section" class="icon-pencil"></button>
            <div id="labelTextSection" style="display: none">
                <button id="labelTextHide" data-tip="Hide the edit label text section" class="icon-pencil"></button>
                <input id="labelText" data-tip='Type to change the label. Enter "|" to move to a new line'
                    style="width: 12em">
                <span data-tip="Speak the name. You can change voice and language in options"
                    class="speaker">🔊</span>
                <span id="labelTextRandom" data-tip="Generate random name" class="icon-shuffle pointer"></span>
            </div>

            <button id="labelEditStyle" data-tip="Edit label group style in Style Editor"
                class="icon-brush"></button>

            <button id="labelSizeShow" data-tip="Show the font size section" class="icon-text-height"></button>
            <div id="labelSizeSection" style="display: none">
                <button id="labelSizeHide" data-tip="Hide the font size section" class="icon-text-height"></button>
                <input id="labelStartOffset" data-tip="Set starting offset for the particular label" type="range" min=20
                    max=80 style="width:8em">
                <i class="icon-text-height"></i>
                <input id="labelRelativeSize" data-tip="Set relative size for the particular label" type="number" min=30
                    max=300 step=1 style="width:3.2em">
            </div>

            <button id="labelAlign" data-tip="Turn text path into a straight line"
                class="icon-resize-horizontal"></button>
            <button id="labelLegend" data-tip="Edit free text notes (legend) for this label"
                class="icon-edit"></button>
            <button id="labelRemoveSingle" data-tip="Remove the label. Shortcut: Delete"
                class="icon-trash fastDelete"></button>
        </div>

        <div id="riverEditor" class="dialog" style="display: none">
            <div id="riverBody" style="padding-bottom: .3em">

                <div>
                    <div class="label" style="width: 4.8em">Name:</div>
                    <span id="riverNameCulture" data-tip="Generate culture-specific name for the river"
                        class="icon-book pointer"></span>
                    <span id="riverNameRandom" data-tip="Generate random name for the river"
                        class="icon-globe pointer"></span>
                    <input id="riverName" data-tip="Type to rename the river" autocorrect="off" spellcheck="false">
                    <span data-tip="Speak the name. You can change voice and language in options"
                        class="speaker">🔊</span>
                </div>

                <div data-tip="Type to change river type (e.g. fork, creek, river, brook, stream)">
                    <div class="label">Type:</div>
                    <input id="riverType" autocorrect="off" spellcheck="false">
                </div>

                <div data-tip="Select parent river">
                    <div class="label">Mainstem:</div>
                    <select id="riverMainstem"></select>
                </div>

                <div data-tip="River drainage basin (watershed)">
                    <div class="label">Basin:</div>
                    <input id="riverBasin" disabled />
                </div>

                <div data-tip="River discharge (flux power)">
                    <div class="label">Discharge:</div>
                    <input id="riverDischarge" disabled />
                </div>

                <div data-tip="River length in selected units">
                    <div class="label">Length:</div>
                    <input id="riverLength" disabled />
                </div>

                <div data-tip="River mouth width in selected units">
                    <div class="label">Mouth width:</div>
                    <input id="riverWidth" disabled />
                </div>

                <div data-tip="River source additional width. Default value is 0">
                    <div class="label">Source width:</div>
                    <input id="riverSourceWidth" type="number" min=0 max=3 step=.01 />
                </div>

                <div data-tip="River width multiplier. Default value is 1">
                    <div class="label">Width modifier:</div>
                    <input id="riverWidthFactor" type="number" min=.1 max=4 step=.1 />
                </div>
            </div>

            <div id="riverBottom">
                <button id="riverCreateSelectingCells" data-tip="Create new river selecting river cells"
                    class="icon-map-pin"></button>
                <button id="riverEditStyle" data-tip="Edit style for all rivers in Style Editor"
                    class="icon-brush"></button>
                <button id="riverElevationProfile" data-tip="Show the elevation profile for the river"
                    class="icon-chart-area"></button>
                <button id="riverLegend" data-tip="Edit free text notes (legend) for the river"
                    class="icon-edit"></button>
                <button id="riverRemove" data-tip="Remove river. Shortcut: Delete"
                    class="icon-trash fastDelete"></button>
            </div>
        </div>

        <div id="riverCreator" class="dialog" style="display: none">
            <div id="riverCreatorBody" class="table"></div>
            <div id="riverCreatorBottom">
                <button id="riverCreatorComplete" data-tip="Complete river creation" class="icon-check"></button>
                <button id="riverCreatorCancel" data-tip="Cancel the creation" class="icon-cancel"></button>
            </div>
        </div>

        <div id="lakeEditor" class="dialog" style="display: none">
            <div id="lakeBody" style="padding-bottom: .3em">
                <div>
                    <div class="label" style="width: 4.8em">Name:</div>
                    <span id="lakeNameCulture" data-tip="Generate culture-specific name for the lake"
                        class="icon-book pointer"></span>
                    <span id="lakeNameRandom" data-tip="Generate random name for the lake"
                        class="icon-globe pointer"></span>
                    <input id="lakeName" data-tip="Type to rename the lake" autocorrect="off" spellcheck="false">
                    <span data-tip="Speak the name. You can change voice and language in options"
                        class="speaker">🔊</span>
                </div>

                <div data-tip="Type to change lake type (group)">
                    <div class="label" style="width: 4.8em">Type:</div>
                    <span id="lakeGroupRemove" data-tip="Remove the group" class="icon-trash-empty pointer"></span>
                    <span id="lakeGroupAdd" data-tip="Create new type (group) for the lake"
                        class="icon-plus pointer"></span>
                    <select id="lakeGroup" data-tip="Select lake type (group)"></select>
                    <input id="lakeGroupName" placeholder="type name" data-tip="Provide a name for the new group"
                        style="display:none" />
                    <span id="lakeEditStyle" data-tip="Edit lake group style in Style Editor"
                        class="icon-brush pointer"></span>
                </div>

                <div data-tip="Lake area in selected units">
                    <div class="label">Area:</div>
                    <input id="lakeArea" disabled />
                </div>

                <div data-tip="Lake shore length in selected units">
                    <div class="label">Shore length:</div>
                    <input id="lakeShoreLength" disabled />
                </div>

                <div data-tip="Lake elevation in selected units">
                    <div class="label">Elevation:</div>
                    <input id="lakeElevation" disabled />
                </div>

                <div data-tip="Lake average depth in selected units">
                    <div class="label">Avarage depth:</div>
                    <input id="lakeAvarageDepth" disabled />
                </div>

                <div data-tip="Lake maximum depth in selected units">
                    <div class="label">Max depth:</div>
                    <input id="lakeMaxDepth" disabled />
                </div>

                <div
                    data-tip="Lake water supply. If supply > evaporation and there is an outlet, the lake water is fresh. If supply is very low, the lake becomes dry">
                    <div class="label">Supply:</div>
                    <input id="lakeFlux" disabled />
                </div>

                <div
                    data-tip="Evaporation from lake surface. If evaporation > supply, the lake water is saline. If difference is high, the lake becomes dry">
                    <div class="label">Evaporation:</div>
                    <input id="lakeEvaporation" disabled />
                </div>

                <div data-tip="Number of lake inlet rivers">
                    <div class="label">Inlets:</div>
                    <input id="lakeInlets" disabled />
                </div>

                <div data-tip="Lake outlet river">
                    <div class="label">Outlet:</div>
                    <input id="lakeOutlet" disabled />
                </div>
            </div>

            <div id="lakeBottom">
                <button id="lakeLegend" data-tip="Edit free text notes (legend) for the lake"
                    class="icon-edit"></button>
            </div>
        </div>

        <div id="elevationProfile" class="dialog" style="display: none" width="100%">
            <div id="elevationGraph" data-tip="Elevation profile"></div>
            <div style="text-align: center">
                <div id="epControls">
                    <span data-tip="Set height scale">Height scale: <input id="epScaleRange" type="range" min=1 max=100
                            value=50></span>
                    <span data-tip="Set curve profile">Curve:
                        <select id="epCurve">
                            <option>Linear</option>
                            <option selected>Basis spline</option>
                            <option>Bundle</option>
                            <option>Cubic Catmull-Rom</option>
                            <option>Monotone X</option>
                            <option>Natural</option>
                        </select>
                    </span>
                    <span><button id="epSave" data-tip="Download the chart data as a CSV file"
                            class="icon-download"></button></span>
                </div>
            </div>
        </div>

        <div id="routeEditor" class="dialog" style="display: none">
            <button id="routeGroupsShow" data-tip="Show the group selection" class="icon-tags"></button>
            <div id="routeGroupsSelection" style="display: none">
                <button id="routeGroupsHide" data-tip="Hide the group section" class="icon-tags"></button>
                <select id="routeGroup" data-tip="Select a group for this route" style="width:12em"></select>
                <input id="routeGroupName" placeholder="new group name" data-tip="Provide a name for the new group"
                    style="display:none; width:12em" />
                <span id="routeGroupAdd" data-tip="Create new group for this route" class="icon-plus pointer"></span>
                <span id="routeGroupRemove" data-tip="Remove all routes of this group"
                    class="icon-trash-empty pointer"></span>
            </div>

            <button id="routeEditStyle" data-tip="Edit route group style in Style Editor"
                class="icon-brush"></button>
            <button id="routeLength" data-tip="Route length in selected units">0</button>
            <button id="routeElevationProfile" data-tip="Show the elevation profile for the route"
                class="icon-chart-area"></button>
            <button id="routeSplit" data-tip="Click on a control point to split the route"
                class="icon-unlink"></button>
            <button id="routeLegend" data-tip="Edit free text notes (legend) for the route"
                class="icon-edit"></button>
            <button id="routeNew" data-tip="Create new route clicking on map" class="icon-map-pin"></button>
            <button id="routeRemove" data-tip="Remove route. Shortcut: Delete" class="icon-trash fastDelete"></button>
        </div>

        <div id="iceEditor" class="dialog" style="display: none">
            <button id="iceEditStyle" data-tip="Edit style in Style Editor" class="icon-brush"></button>
            <button id="iceRandomize" data-tip="Randomize Iceberg shape" class="icon-shuffle"></button>
            <input id="iceSize" data-tip="Change Iceberg size" type="range" min=".05" max="1" step=".01">
            <button id="iceNew" data-tip="Add an Iceberg (click on map)" class="icon-plus"></button>
            <button id="iceRemove" data-tip="Remove the element. Shortcut: Delete"
                class="icon-trash fastDelete"></button>
        </div>

        <div id="coastlineEditor" class="dialog" style="display: none">
            <button id="coastlineGroupsShow" data-tip="Show the group selection" class="icon-tags"></button>
            <div id="coastlineGroupsSelection" style="display: none">
                <button id="coastlineGroupsHide" data-tip="Hide the group section" class="icon-tags"></button>
                <select id="coastlineGroup" data-tip="Select a group for this coastline" style="width:9em"></select>
                <input id="coastlineGroupName" placeholder="new group name" data-tip="Provide a name for the new group"
                    style="display:none; width:9em" />
                <span id="coastlineGroupAdd" data-tip="Create new group for this coastline"
                    class="icon-plus pointer"></span>
                <span id="coastlineGroupRemove" data-tip="Remove the group" class="icon-trash-empty pointer"></span>
            </div>

            <button id="coastlineEditStyle" data-tip="Edit coastline group style in Style Editor"
                class="icon-brush"></button>
            <button id="coastlineArea" data-tip="Landmass area in selected units">0</button>
        </div>

        <div id="reliefEditor" class="dialog" style="display: none">

            <div id="reliefTools" data-tip="Select mode of operation">
                <div class="reliefEditorLabel">Mode:</div>
                <button id="reliefIndividual" data-tip="Edit individual selected icon"
                    class="icon-info pressed"></button>
                <button id="reliefBulkAdd" data-tip="Place icons in a bulk" class="icon-brush"></button>
                <button id="reliefBulkRemove" data-tip="Remove icons in a bulk" class="icon-eraser"></button>

                <div style="margin-left: 4.6em">Set:</div>
                <select id="reliefEditorSet">
                    <option value="simple">Simple</option>
                    <option value="colored">Colored</option>
                    <option value="gray">Gray</option>
                </select>
            </div>

            <div id="reliefSizeDiv" data-tip="Set icon size for individual icon or for bulk placement">
                <div class="reliefEditorLabel">Size:</div>
                <input id="reliefSize" oninput="reliefSizeNumber.value = this.value" type="range" min=2 max=50 value=5>
                <input id="reliefSizeNumber" oninput="reliefSize.value = this.value" type="number" min=2 value=5>
            </div>

            <div id="reliefRadiusDiv" data-tip="Set brush radius for icons placement on deletion" style="display:none">
                <div class="reliefEditorLabel">Radius:</div>
                <input id="reliefRadius" oninput="reliefRadiusNumber.value = this.value" type="range" min=1 max=100
                    value=15>
                <input id="reliefRadiusNumber" oninput="reliefRadius.value = this.value" type="number" min=1 value=15>
            </div>

            <div id="reliefSpacingDiv" data-tip="Set spacing between relief icons" style="display:none">
                <div class="reliefEditorLabel">Spacing:</div>
                <input id="reliefSpacing" oninput="reliefSpacingNumber.value = this.value" type="range" min=2 max=20
                    value=5>
                <input id="reliefSpacingNumber" oninput="reliefSpacing.value = this.value" type="number" min=2 value=5>
            </div>

            <div id="reliefIconsDiv" data-tip="Select icon">
                <div data-type="simple" style="display:none">
                    <svg data-type="#relief-mount-1" data-tip="Select Mountain icon">
                        <use href="#relief-mount-1" width="40" height="40"></use>
                    </svg>
                    <svg data-type="#relief-hill-1" data-tip="Select Hill icon">
                        <use href="#relief-hill-1" width="40" height="40"></use>
                    </svg>
                    <svg data-type="#relief-deciduous-1" data-tip="Select Deciduous Tree icon">
                        <use href="#relief-deciduous-1" x="-25%" y="-25%" width="60" height="60"></use>
                    </svg>
                    <svg data-type="#relief-conifer-1" data-tip="Select Conifer Tree icon">
                        <use href="#relief-conifer-1" x="-25%" y="-25%" width="60" height="60"></use>
                    </svg>
                    <svg data-type="#relief-palm-1" data-tip="Select Palm icon">
                        <use href="#relief-palm-1" x="-25%" y="-25%" width="60" height="60"></use>
                    </svg>
                    <svg data-type="#relief-acacia-1" data-tip="Select Acacia icon">
                        <use href="#relief-acacia-1" x="-25%" y="-25%" width="60" height="60"></use>
                    </svg>
                    <svg data-type="#relief-swamp-1" data-tip="Select Swamp icon">
                        <use href="#relief-swamp-1" x="-50%" y="-50%" width="80" height="80"></use>
                    </svg>
                    <svg data-type="#relief-grass-1" data-tip="Select Grass icon">
                        <use href="#relief-grass-1" x="-100%" y="-100%" width="120" height="120"></use>
                    </svg>
                    <svg data-type="#relief-dune-1" data-tip="Select Dune icon">
                        <use href="#relief-dune-1" x="-25%" y="-25%" width="60" height="60"></use>
                    </svg>
                </div>

                <div data-type="colored" style="display:none">
                    <svg data-type="#relief-mount-2" data-tip="Select Mountain icon">
                        <use href="#relief-mount-2" width="40" height="40"></use>
                    </svg>
                    <svg data-type="#relief-mount-3" data-tip="Select Mountain icon">
                        <use href="#relief-mount-3" width="40" height="40"></use>
                    </svg>
                    <svg data-type="#relief-mount-4" data-tip="Select Mountain icon">
                        <use href="#relief-mount-4" width="40" height="40"></use>
                    </svg>
                    <svg data-type="#relief-mount-5" data-tip="Select Mountain icon">
                        <use href="#relief-mount-5" width="40" height="40"></use>
                    </svg>
                    <svg data-type="#relief-mount-6" data-tip="Select Mountain icon">
                        <use href="#relief-mount-6" width="40" height="40"></use>
                    </svg>
                    <svg data-type="#relief-mount-7" data-tip="Select Mountain icon">
                        <use href="#relief-mount-7" width="40" height="40"></use>
                    </svg>
                    <svg data-type="#relief-mountSnow-1" data-tip="Select Snow Mountain icon">
                        <use href="#relief-mountSnow-1" width="40" height="40"></use>
                    </svg>
                    <svg data-type="#relief-mountSnow-2" data-tip="Select Snow Mountain icon">
                        <use href="#relief-mountSnow-2" width="40" height="40"></use>
                    </svg>
                    <svg data-type="#relief-mountSnow-3" data-tip="Select Snow Mountain icon">
                        <use href="#relief-mountSnow-3" width="40" height="40"></use>
                    </svg>
                    <svg data-type="#relief-mountSnow-4" data-tip="Select Snow Mountain icon">
                        <use href="#relief-mountSnow-4" width="40" height="40"></use>
                    </svg>
                    <svg data-type="#relief-mountSnow-5" data-tip="Select Snow Mountain icon">
                        <use href="#relief-mountSnow-5" width="40" height="40"></use>
                    </svg>
                    <svg data-type="#relief-mountSnow-6" data-tip="Select Snow Mountain icon">
                        <use href="#relief-mountSnow-6" width="40" height="40"></use>
                    </svg>
                    <svg data-type="#relief-vulcan-1" data-tip="Select Volcano icon">
                        <use href="#relief-vulcan-1" width="40" height="40"></use>
                    </svg>
                    <svg data-type="#relief-vulcan-2" data-tip="Select Volcano icon">
                        <use href="#relief-vulcan-2" width="40" height="40"></use>
                    </svg>
                    <svg data-type="#relief-vulcan-3" data-tip="Select Volcano icon">
                        <use href="#relief-vulcan-3" width="40" height="40"></use>
                    </svg>
                    <svg data-type="#relief-hill-2" data-tip="Select Hill icon">
                        <use href="#relief-hill-2" width="40" height="40"></use>
                    </svg>
                    <svg data-type="#relief-hill-3" data-tip="Select Hill icon">
                        <use href="#relief-hill-3" width="40" height="40"></use>
                    </svg>
                    <svg data-type="#relief-hill-4" data-tip="Select Hill icon">
                        <use href="#relief-hill-4" width="40" height="40"></use>
                    </svg>
                    <svg data-type="#relief-hill-5" data-tip="Select Hill icon">
                        <use href="#relief-hill-5" width="40" height="40"></use>
                    </svg>
                    <svg data-type="#relief-dune-2" data-tip="Select Dune icon">
                        <use href="#relief-dune-2" width="40" height="40"></use>
                    </svg>
                    <svg data-type="#relief-deciduous-2" data-tip="Select Deciduous Tree icon">
                        <use href="#relief-deciduous-2" x="-25%" y="-25%" width="60" height="60"></use>
                    </svg>
                    <svg data-type="#relief-deciduous-3" data-tip="Select Deciduous Tree icon">
                        <use href="#relief-deciduous-3" x="-25%" y="-25%" width="60" height="60"></use>
                    </svg>
                    <svg data-type="#relief-conifer-2" data-tip="Select Conifer Tree icon">
                        <use href="#relief-conifer-2" x="-25%" y="-25%" width="60" height="60"></use>
                    </svg>
                    <svg data-type="#relief-coniferSnow-1" data-tip="Select Snow Conifer Tree icon">
                        <use href="#relief-coniferSnow-1" x="-25%" y="-25%" width="60" height="60"></use>
                    </svg>
                    <svg data-type="#relief-acacia-2" data-tip="Select Acacia icon">
                        <use href="#relief-acacia-2" x="-25%" y="-25%" width="60" height="60"></use>
                    </svg>
                    <svg data-type="#relief-palm-2" data-tip="Select Palm icon">
                        <use href="#relief-palm-2" x="-25%" y="-25%" width="60" height="60"></use>
                    </svg>
                    <svg data-type="#relief-grass-2" data-tip="Select Grass icon">
                        <use href="#relief-grass-2" x="-25%" y="-25%" width="60" height="60"></use>
                    </svg>
                    <svg data-type="#relief-swamp-2" data-tip="Select Swamp icon">
                        <use href="#relief-swamp-2" x="-25%" y="-25%" width="60" height="60"></use>
                    </svg>
                    <svg data-type="#relief-swamp-3" data-tip="Select Swamp icon">
                        <use href="#relief-swamp-3" x="-25%" y="-25%" width="60" height="60"></use>
                    </svg>
                    <svg data-type="#relief-cactus-1" data-tip="Select Cactus icon">
                        <use href="#relief-cactus-1" x="-25%" y="-25%" width="60" height="60"></use>
                    </svg>
                    <svg data-type="#relief-cactus-2" data-tip="Select Cactus icon">
                        <use href="#relief-cactus-2" x="-25%" y="-25%" width="60" height="60"></use>
                    </svg>
                    <svg data-type="#relief-cactus-3" data-tip="Select Cactus icon">
                        <use href="#relief-cactus-3" x="-25%" y="-25%" width="60" height="60"></use>
                    </svg>
                    <svg data-type="#relief-deadTree-1" data-tip="Select Dead Tree icon">
                        <use href="#relief-deadTree-1" x="-25%" y="-25%" width="60" height="60"></use>
                    </svg>
                    <svg data-type="#relief-deadTree-2" data-tip="Select Dead Tree icon">
                        <use href="#relief-deadTree-2" x="-25%" y="-25%" width="60" height="60"></use>
                    </svg>
                </div>

                <div data-type="gray" style="display:none">
                    <svg data-type="#relief-mount-2-bw" data-tip="Select Mountain icon">
                        <use href="#relief-mount-2-bw" width="40" height="40"></use>
                    </svg>
                    <svg data-type="#relief-mount-3-bw" data-tip="Select Mountain icon">
                        <use href="#relief-mount-3-bw" width="40" height="40"></use>
                    </svg>
                    <svg data-type="#relief-mount-4-bw" data-tip="Select Mountain icon">
                        <use href="#relief-mount-4-bw" width="40" height="40"></use>
                    </svg>
                    <svg data-type="#relief-mount-5-bw" data-tip="Select Mountain icon">
                        <use href="#relief-mount-5-bw" width="40" height="40"></use>
                    </svg>
                    <svg data-type="#relief-mount-6-bw" data-tip="Select Mountain icon">
                        <use href="#relief-mount-6-bw" width="40" height="40"></use>
                    </svg>
                    <svg data-type="#relief-mount-7-bw" data-tip="Select Mountain icon">
                        <use href="#relief-mount-7-bw" width="40" height="40"></use>
                    </svg>
                    <svg data-type="#relief-mountSnow-1-bw" data-tip="Select Snow Mountain icon">
                        <use href="#relief-mountSnow-1-bw" width="40" height="40"></use>
                    </svg>
                    <svg data-type="#relief-mountSnow-2-bw" data-tip="Select Snow Mountain icon">
                        <use href="#relief-mountSnow-2-bw" width="40" height="40"></use>
                    </svg>
                    <svg data-type="#relief-mountSnow-3-bw" data-tip="Select Snow Mountain icon">
                        <use href="#relief-mountSnow-3-bw" width="40" height="40"></use>
                    </svg>
                    <svg data-type="#relief-mountSnow-4-bw" data-tip="Select Snow Mountain icon">
                        <use href="#relief-mountSnow-4-bw" width="40" height="40"></use>
                    </svg>
                    <svg data-type="#relief-mountSnow-5-bw" data-tip="Select Snow Mountain icon">
                        <use href="#relief-mountSnow-5-bw" width="40" height="40"></use>
                    </svg>
                    <svg data-type="#relief-mountSnow-6-bw" data-tip="Select Snow Mountain icon">
                        <use href="#relief-mountSnow-6-bw" width="40" height="40"></use>
                    </svg>
                    <svg data-type="#relief-vulcan-1-bw" data-tip="Select Volcano icon">
                        <use href="#relief-vulcan-1-bw" width="40" height="40"></use>
                    </svg>
                    <svg data-type="#relief-vulcan-2-bw" data-tip="Select Volcano icon">
                        <use href="#relief-vulcan-2-bw" width="40" height="40"></use>
                    </svg>
                    <svg data-type="#relief-vulcan-3-bw" data-tip="Select Volcano icon">
                        <use href="#relief-vulcan-3-bw" width="40" height="40"></use>
                    </svg>
                    <svg data-type="#relief-hill-2-bw" data-tip="Select Hill icon">
                        <use href="#relief-hill-2-bw" width="40" height="40"></use>
                    </svg>
                    <svg data-type="#relief-hill-3-bw" data-tip="Select Hill icon">
                        <use href="#relief-hill-3-bw" width="40" height="40"></use>
                    </svg>
                    <svg data-type="#relief-hill-4-bw" data-tip="Select Hill icon">
                        <use href="#relief-hill-4-bw" width="40" height="40"></use>
                    </svg>
                    <svg data-type="#relief-hill-5-bw" data-tip="Select Hill icon">
                        <use href="#relief-hill-5-bw" width="40" height="40"></use>
                    </svg>
                    <svg data-type="#relief-dune-2-bw" data-tip="Select Dune icon">
                        <use href="#relief-dune-2-bw" width="40" height="40"></use>
                    </svg>
                    <svg data-type="#relief-deciduous-2-bw" data-tip="Select Deciduous Tree icon">
                        <use href="#relief-deciduous-2-bw" x="-25%" y="-25%" width="60" height="60"></use>
                    </svg>
                    <svg data-type="#relief-deciduous-3-bw" data-tip="Select Deciduous Tree icon">
                        <use href="#relief-deciduous-3-bw" x="-25%" y="-25%" width="60" height="60"></use>
                    </svg>
                    <svg data-type="#relief-conifer-2-bw" data-tip="Select Conifer Tree icon">
                        <use href="#relief-conifer-2-bw" x="-25%" y="-25%" width="60" height="60"></use>
                    </svg>
                    <svg data-type="#relief-coniferSnow-1-bw" data-tip="Select Snow Conifer Tree icon">
                        <use href="#relief-coniferSnow-1-bw" x="-25%" y="-25%" width="60" height="60"></use>
                    </svg>
                    <svg data-type="#relief-acacia-2-bw" data-tip="Select Acacia icon">
                        <use href="#relief-acacia-2-bw" x="-25%" y="-25%" width="60" height="60"></use>
                    </svg>
                    <svg data-type="#relief-palm-2-bw" data-tip="Select Palm icon">
                        <use href="#relief-palm-2-bw" x="-25%" y="-25%" width="60" height="60"></use>
                    </svg>
                    <svg data-type="#relief-grass-2-bw" data-tip="Select Grass icon">
                        <use href="#relief-grass-2-bw" x="-25%" y="-25%" width="60" height="60"></use>
                    </svg>
                    <svg data-type="#relief-swamp-2-bw" data-tip="Select Swamp icon">
                        <use href="#relief-swamp-2-bw" x="-25%" y="-25%" width="60" height="60"></use>
                    </svg>
                    <svg data-type="#relief-swamp-3-bw" data-tip="Select Swamp icon">
                        <use href="#relief-swamp-3-bw" x="-25%" y="-25%" width="60" height="60"></use>
                    </svg>
                    <svg data-type="#relief-cactus-1-bw" data-tip="Select Cactus icon">
                        <use href="#relief-cactus-1-bw" x="-25%" y="-25%" width="60" height="60"></use>
                    </svg>
                    <svg data-type="#relief-cactus-2-bw" data-tip="Select Cactus icon">
                        <use href="#relief-cactus-2-bw" x="-25%" y="-25%" width="60" height="60"></use>
                    </svg>
                    <svg data-type="#relief-cactus-3-bw" data-tip="Select Cactus icon">
                        <use href="#relief-cactus-3-bw" x="-25%" y="-25%" width="60" height="60"></use>
                    </svg>
                    <svg data-type="#relief-deadTree-1-bw" data-tip="Select Dead Tree icon">
                        <use href="#relief-deadTree-1-bw" x="-25%" y="-25%" width="60" height="60"></use>
                    </svg>
                    <svg data-type="#relief-deadTree-2-bw" data-tip="Select Dead Tree icon">
                        <use href="#relief-deadTree-2-bw" x="-25%" y="-25%" width="60" height="60"></use>
                    </svg>
                </div>

                <svg id="reliefIconsSeletionAny" data-tip="Select any type of icons"><text x="50%"
                        y="50%">Any</text></svg>
            </div>

            <div id="reliefBottom">
                <button id="reliefEditStyle" data-tip="Edit Relief Icons style in Style Editor"
                    class="icon-adjust"></button>
                <button id="reliefCopy" data-tip="Copy selected relief icon" class="icon-clone"></button>
                <button id="reliefMoveFront" data-tip="Move selected relief icon to front"
                    class="icon-level-up"></button>
                <button id="reliefMoveBack" data-tip="Move selected relief icon back" class="icon-level-down"></button>
                <button id="reliefRemove" data-tip="Remove selected relief icon or icon type. Shortcut: Delete"
                    class="icon-trash fastDelete"></button>
            </div>
        </div>

        <div id="burgEditor" class="dialog" style="display: none">

            <div id="burgBody" style="padding-bottom: .3em">
                <svg viewBox="0 0 200 200" width="14em" height="14em">
                    <use id="burgEmblem"></use>
                </svg>
                <div style="float: right">
                    <div id="burgProvinceAndState" style="font-style: italic; max-width: 16em"></div>

                    <div>
                        <div class="label">Name:</div>
                        <input id="burgName" data-tip="Type to rename the burg" autocorrect="off" spellcheck="false"
                            style="width: 8em">
                        <span data-tip="Speak the name. You can change voice and language in options"
                            class="speaker">🔊</span>
                        <span id="burgNameReRandom" data-tip="Generate random name for the burg"
                            class="icon-globe pointer"></span>
                    </div>

                    <div data-tip="Select burg type. Type slightly affects emblem generation">
                        <div class="label">Type:</div>
                        <select id="burgType" style="width: 8em">
                            <option value="Generic">Generic</option>
                            <option value="River">River</option>
                            <option value="Lake">Lake</option>
                            <option value="Naval">Naval</option>
                            <option value="Nomadic">Nomadic</option>
                            <option value="Hunting">Hunting</option>
                            <option value="Highland">Highland</option>
                        </select>
                    </div>

                    <div data-tip="Select dominant culture">
                        <div class="label">Culture:</div>
                        <select id="burgCulture" style="width: 8em"></select>
                        <span id="burgNameReCulture" data-tip="Generate culture-specific name for the burg"
                            class="icon-book pointer"></span>
                    </div>

                    <div data-tip="Set burg population">
                        <div class="label">Population:</div>
                        <input id="burgPopulation" type="number" min=0 step=1 style="width: 8em">
                    </div>

                    <div>
                        <div class="label">Features:</div>
                        <span id="burgCapital" data-tip="Shows whether the burg is a state capital. Click to toggle"
                            data-feature="capital" class="burgFeature icon-star"></span>
                        <span id="burgPort" data-tip="Shows whether the burg is a port. Click to toggle"
                            data-feature="port" class="burgFeature icon-anchor"></span>
                        <span id="burgCitadel" data-tip="Shows whether the burg has a citadel (castle). Click to toggle"
                            data-feature="citadel" class="burgFeature icon-chess-rook" style="font-size: 1.1em"></span>
                        <span id="burgWalls" data-tip="Shows whether the burg is walled. Click to toggle"
                            data-feature="walls" class="burgFeature icon-fort-awesome"></span>
                        <span id="burgPlaza"
                            data-tip="Shows whether the burg is a trade center (has big marketplace). Click to toggle"
                            data-feature="plaza" class="burgFeature icon-store" style="font-size: 1em"></span>
                        <span id="burgTemple" data-tip="Shows whether the burg is a religious center. Click to toggle"
                            data-feature="temple" class="burgFeature icon-chess-bishop"
                            style="font-size: 1.1em; margin-left: 3px"></span>
                        <span id="burgShanty" data-tip="Shows whether the burg has a shanty town. Click to toggle"
                            data-feature="shanty" class="burgFeature icon-campground" style="font-size: 1em"></span>
                    </div>

                    <div data-tip="Burg mean annual temperature and real-world city for comparison">
                        <div class="label">Temperature:</div>
                        <span id="burgTemperature"></span>, like in
                        <span id="burgTemperatureLikeIn"></span>
                    </div>

                    <div data-tip="Burg height above mean sea level">
                        <div class="label">Elevation:</div>
                        <span id="burgElevation"></span> above sea level
                    </div>
                </div>
            </div>

            <div id="burgBottom">
                <button id="burgGroupShow" data-tip="Show group change section" class="icon-tags"></button>
                <div id="burgGroupSection" style="display: none">
                    <button id="burgGroupHide" data-tip="Hide group change section" class="icon-tags"></button>
                    <select id="burgSelectGroup" data-tip="Select a group for this burg" style="width: 10em;"></select>
                    <input id="burgInputGroup" placeholder="new group name" data-tip="Create new Group for the Burg"
                        style="display: none; width: 10em" />
                    <i id="burgAddGroup" data-tip="Create new group for the burg" class="icon-plus pointer"></i>
                    <i id="burgRemoveGroup" data-tip="Remove selected burg group" class="icon-trash pointer"></i>
                </div>

                <button id="burgStyleShow" data-tip="Show style edit section" class="icon-brush"></button>
                <div id="burgStyleSection" style="display: none">
                    <button id="burgStyleHide" data-tip="Hide style edit section" class="icon-brush"></button>
                    <button id="burgEditLabelStyle" data-tip="Edit label style for burg group in Style Editor"
                        class="icon-font"></button>
                    <button id="burgEditIconStyle" data-tip="Edit icon style for burg group in Style Editor"
                        class="icon-dot-circled"></button>
                    <button id="burgEditAnchorStyle"
                        data-tip="Edit port icon (anchor) style for burg group in Style Editor"
                        class="icon-anchor"></button>
                </div>

                <button id="burgSeeInMFCG"
                    data-tip="Open burg in the Medieval Fantasy City Generator by Watabou. Ctrl + click to change the seed"
                    class="icon-map-o"></button>
                <button id="burgEditEmblem" data-tip="Edit emblem" class="icon-shield-alt"></button>
                <button id="burgRelocate" data-tip="Relocate burg" class="icon-target"></button>
                <button id="burglLegend" data-tip="Edit free text notes (legend) for this burg"
                    class="icon-edit"></button>
                <button id="burgLock" class="icon-lock-open"></button>
                <button id="burgRemove" data-tip="Remove non-capital burg. Shortcut: Delete"
                    class="icon-trash fastDelete"></button>
            </div>
        </div>

        <div id="regimentEditor" class="dialog" style="display: none">

            <div id="regimentBody">
                <div>
                    <button id="regimentType" data-tip="Regiment type (land or naval). Click to change"></button>
                    <input id="regimentName" data-tip="Type to rename the regiment" autocorrect="off" spellcheck="false"
                        style="width: 13em">
                    <span data-tip="Speak the name. You can change voice and language in options"
                        class="speaker">🔊</span>
                    <i id="regimentNameRestore" data-tip="Click to restore regiment's default name"
                        class="icon-ccw pointer"></i>
                </div>

                <div data-tip="Regiment emblem. Paste any Unicode symbol or select from the predefined list">
                    <div class="label italic">Emblem:</div>
                    <input id="regimentEmblem" style="width:5em">
                    <button id="regimentEmblemSelect" style="padding: 0; width: 4.5em">select</button>
                </div>

                <div id="regimentComposition" class="table"></div>
            </div>

            <div id="regimentBottom">
                <button id="regimentAttack" data-tip="Attack foreign regiment" class="icon-target"></button>
                <button id="regimentAdd" data-tip="Create new regiment or fleet" class="icon-user-plus"></button>
                <button id="regimentSplit" data-tip="Split regiment into 2 separate ones"
                    class="icon-half"></button>
                <button id="regimentAttach"
                    data-tip="Attach regiment to another one (include this regiment to another one)"
                    class="icon-attach"></button>
                <button id="regimentRegenerateLegend" data-tip="Regenerate legend for this regiment"
                    class="icon-retweet"></button>
                <button id="regimentLegend" data-tip="Edit free text notes (legend) for this regiment"
                    class="icon-edit"></button>
                <button id="regimentRemove" data-tip="Remove regiment. Shortcut: Delete"
                    class="icon-trash fastDelete"></button>
            </div>
        </div>

        <div id="battleScreen" class="dialog stable" style="display: none">
            <div id="battleBody" class="overflow">
                <template id="battlePhases_field">
                    <button data-tip="Skirmish phase. Ranged units excel" data-phase="skirmish"
                        class="icon-button-skirmish"></button>
                    <button data-tip="Melee phase. Melee units excel" data-phase="melee"
                        class="icon-button-melee"></button>
                    <button data-tip="Pursue phase. Mounted units excel" data-phase="pursue"
                        class="icon-button-pursue"></button>
                    <button data-tip="Retreat phase. Units strength reduced" data-phase="retreat"
                        class="icon-button-retreat"></button>
                </template>

                <template id="battlePhases_naval">
                    <button data-tip="Shelling phase. Naval artillery bombardment of enemy fleet" data-phase="shelling"
                        class="icon-button-shelling"></button>
                    <button data-tip="Boarding phase. Melee units go aboard" data-phase="boarding"
                        class="icon-button-boarding"></button>
                    <button data-tip="Сhase phase. Naval units pursue and rarely shell enemy fleet" data-phase="chase"
                        class="icon-button-chase"></button>
                    <button data-tip="Withdrawal phase. Naval units try to escape enemy fleet" data-phase="withdrawal"
                        class="icon-button-withdrawal"></button>
                </template>

                <template id="battlePhases_siege_attackers">
                    <button data-tip="Blockade phase. Prepare or hold the blockade" data-phase="blockade"
                        class="icon-button-blockade"></button>
                    <button data-tip="Bombardment phase. Attack enemy with machinery units" data-phase="bombardment"
                        class="icon-button-bombardment"></button>
                    <button data-tip="Storming phase. Storm enemy town. Melee units excel" data-phase="storming"
                        class="icon-button-storming"></button>
                    <button data-tip="Looting phase. Plunder the town. Units strength increased" data-phase="looting"
                        class="icon-button-looting"></button>
                    <button data-tip="Retreat phase. Units strength reduced" data-phase="retreat"
                        class="icon-button-retreat"></button>
                </template>

                <template id="battlePhases_siege_defenders">
                    <button data-tip="Sheltering phase. Hide behind the walls and wait" data-phase="sheltering"
                        class="icon-button-sheltering"></button>
                    <button data-tip="Sortie phase. Make a sortie from besieged town. Melee units excel"
                        data-phase="sortie" class="icon-button-sortie"></button>
                    <button data-tip="Bombardment phase. Attack enemy with machinery units" data-phase="bombardment"
                        class="icon-button-bombardment"></button>
                    <button data-tip="Defense phase. Ranged and melee units excel" data-phase="defense"
                        class="icon-button-defense"></button>
                    <button data-tip="Surrendering phase. Give up the defense. Units strength reduced"
                        data-phase="surrendering" class="icon-button-surrendering"></button>
                    <button data-tip="Pursue phase. Mounted units excel" data-phase="pursue"
                        class="icon-button-pursue"></button>
                </template>

                <template id="battlePhases_ambush_attackers">
                    <button data-tip="Shock phase. Units strength reduced" data-phase="shock"
                        class="icon-button-shock"></button>
                    <button data-tip="Melee phase. Melee units excel" data-phase="melee"
                        class="icon-button-melee"></button>
                    <button data-tip="Pursue phase. Mounted units excel" data-phase="pursue"
                        class="icon-button-pursue"></button>
                    <button data-tip="Retreat phase. Units strength reduced" data-phase="retreat"
                        class="icon-button-retreat"></button>
                </template>

                <template id="battlePhases_ambush_defenders">
                    <button data-tip="Surprice attack phase. Units strength increased, ranged units excel"
                        data-phase="surprise" class="icon-button-surprise"></button>
                    <button data-tip="Melee phase. Melee units excel" data-phase="melee"
                        class="icon-button-melee"></button>
                    <button data-tip="Pursue phase. Mounted units excel" data-phase="pursue"
                        class="icon-button-pursue"></button>
                    <button data-tip="Retreat phase. Units strength reduced" data-phase="retreat"
                        class="icon-button-retreat"></button>
                </template>

                <template id="battlePhases_landing_attackers">
                    <button data-tip="Landing phase. Amphibious attack. Units are vulnerable against prepared defense"
                        data-phase="landing" class="icon-button-landing"></button>
                    <button data-tip="Melee phase. Melee units excel" data-phase="melee"
                        class="icon-button-melee"></button>
                    <button data-tip="Pursue phase. Mounted units excel" data-phase="pursue"
                        class="icon-button-pursue"></button>
                    <button data-tip="Flee phase. Units strength reduced" data-phase="flee"
                        class="icon-button-flee"></button>
                </template>

                <template id="battlePhases_landing_defenders">
                    <button data-tip="Shock phase. Units are not prepared for a defense" data-phase="shock"
                        class="icon-button-shock"></button>
                    <button data-tip="Defense phase. Prepared defense. Units strength increased" data-phase="defense"
                        class="icon-button-defense"></button>
                    <button data-tip="Melee phase. Melee units excel" data-phase="melee"
                        class="icon-button-melee"></button>
                    <button data-tip="Waiting phase. Cannot pursue fleeing naval" data-phase="waiting"
                        class="icon-button-waiting"></button>
                    <button data-tip="Pursue phase. Try to intercept fleeing attackers. Mounted units excel"
                        data-phase="pursue" class="icon-button-pursue"></button>
                    <button data-tip="Retreat phase. Units strength reduced" data-phase="retreat"
                        class="icon-button-retreat"></button>
                </template>

                <template id="battlePhases_air">
                    <button data-tip="Maneuvering phase. Units strength reduced" data-phase="maneuvering"
                        class="icon-button-maneuvering"></button>
                    <button data-tip="Dogfight phase. Units strength increased" data-phase="dogfight"
                        class="icon-button-dogfight"></button>
                    <button data-tip="Pursue phase. Units strength increased" data-phase="pursue"
                        class="icon-button-pursue"></button>
                    <button data-tip="Retreat phase. Units strength reduced" data-phase="retreat"
                        class="icon-button-retreat"></button>
                </template>

                <div style="font-size:1.2em; font-weight: bold; width: unset">
                    <span>Attackers</span>
                    <div style="float: right; font-size: .7em">
                        <meter id="battleMorale_attackers" data-tip="Attackers morale: " min=0 max=100 low=33 high=66
                            optimum=80></meter>
                        <div id="battlePower_attackers"
                            data-tip="Attackers strength during this phase. Strength defines dealt damage"
                            style="display: inline-block; text-align: center" class="icon-button-power"></div>
                        <div style="display: inline-block;">
                            <button id="battlePhase_attackers" style="width: 3.2em"></button>
                            <div class="battlePhases" style="display: none"></div>
                        </div>
                        <button id="battleDie_attackers" data-tip="Random factor for attackers. Click to re-roll"
                            style="padding: .1em .2em; width: 3.2em" class="icon-button-die"></button>
                    </div>
                </div>
                <table id="battleAttackers"></table>
                <div style="font-size:1.2em; font-weight: bold; width: unset">
                    <span></span>Defenders</span>
                    <div style="float: right; font-size: .7em">
                        <meter id="battleMorale_defenders" data-tip="Defenders morale: " min=0 max=100 low=33 high=66
                            optimum=80></meter>
                        <div id="battlePower_defenders"
                            data-tip="Defenders strength during this phase. Strength defines dealt damage"
                            style="display: inline-block; text-align: center" class="icon-button-power"></div>
                        <div style="display: inline-block;">
                            <button id="battlePhase_defenders" style="width: 3.2em"></button>
                            <div class="battlePhases" style="display: none"></div>
                        </div>
                        <button id="battleDie_defenders" data-tip="Random factor for defenders. Click to re-roll"
                            style="padding: .1em .2em; width: 3.2em" class="icon-button-die"></button>
                    </div>
                </div>
                <table id="battleDefenders"></table>
            </div>

            <div id="battleBottom">
                <button id="battleType" data-tip="Battle type. Click to change"></button>
                <div class="battleTypes" style="display: none">
                    <button data-tip="Field Battle: a standard type of combat" data-type="field"
                        class="icon-button-field"></button>
                    <button data-tip="Naval Battle: naval units combat" data-type="naval"
                        class="icon-button-naval"></button>
                    <button data-tip="Siege: burg blockade and storming" data-type="siege"
                        class="icon-button-siege"></button>
                    <button data-tip="Ambush: surprise attack" data-type="ambush" class="icon-button-ambush"></button>
                    <button data-tip="Landing: amphibious attack" data-type="landing"
                        class="icon-button-landing"></button>
                    <button data-tip="Air Battle: maneuring fight of avia units" data-type="air"
                        class="icon-button-air"></button>
                </div>

                <button id="battleNameShow" data-tip="Set battle name" class="icon-font"></button>
                <div id="battleNameSection" style="display: none">
                    <button id="battleNameHide" data-tip="Hide the battle name section"
                        class="icon-font"></button>
                    <input id="battleNamePlace" data-tip="Type place name"" style=" width: 30%">
                    <input id="battleNameFull" data-tip="Type full battle name"" style=" width: 46%">
                    <button id="battleNameCulture" data-tip="Generate culture-specific name for place and battle"
                        class="icon-book"></button>
                    <button id="battleNameRandom" data-tip="Generate random name for place and battle"
                        class="icon-globe"></button>
                </div>

                <button id="battleAddRegiment" data-tip="Add regiment to the battle" class="icon-user-plus"></button>
                <button id="battleRoll" data-tip="Roll dice to update random factor" class="icon-die"></button>
                <button id="battleRun" data-tip="Iterate battle" class="icon-play"></button>
                <button id="battleApply" data-tip="End battle: apply current results and close the screen"
                    class="icon-check"></button>
                <button id="battleCancel" data-tip="Cancel battle: roll back results and close the screen"
                    class="icon-cancel"></button>
                <button id="battleWiki" data-tip="Open Battle Simulation Tutorial" class="icon-info"></button>
            </div>
        </div>

        <div id="regimentSelectorScreen" class="dialog" style="display: none">
            <div id="regimentSelectorHeader" class="header">
                <div style="left: 1.2em;" data-tip="Click to sort by state name" class="sortable alphabetically"
                    data-sortby="state">State&nbsp;</div>
                <div style="left: 9.2em;" data-tip="Click to sort by regiment name" class="sortable alphabetically"
                    data-sortby="regiment">Regiment&nbsp;</div>
                <div style="left: 22.4em;" data-tip="Click to sort by total military forces" class="sortable"
                    data-sortby="total">Total&nbsp;</div>
                <div style="left: 28em;" data-tip="Click to sort by distance to the battlefield"
                    class="sortable icon-sort-number-up" data-sortby="distance">Distance&nbsp;</div>
            </div>
            <div id="regimentSelectorBody"></div>
        </div>

        <div id="brushesPanel" class="dialog stable" style="display: none">
            <div id="brushesButtons" style="display: inline-block">
                <button id="brushRaise" data-tip="Raise brush: increase height of cells in radius by Power value">
                    <svg viewBox="15 15 70 70" height="1em" width="1.6em">
                        <path d="m20,39 h60 M50,85 v-35 l-12,8 m12,-8 l12,8" fill="none" stroke="#000"
                            stroke-width="5" />
                    </svg>
                </button>

                <button id="brushElevate"
                    data-tip="Elevate brush: drag to gradually increase height of cells in radius by Power value">
                    <svg viewBox="15 15 70 70" height="1em" width="1.6em">
                        <path d="m20,50 q30,-35 60,0 M50,85 v-35 l-12,8 m12,-8 l12,8" fill="none" stroke="#000"
                            stroke-width="5" />
                    </svg>
                </button>

                <button id="brushLower"
                    data-tip="Lower brush: drag to decrease height of cells in radius by Power value">
                    <svg viewBox="15 15 70 70" height="1em" width="1.6em">
                        <path d="M50,30 v35 l-12,-8 m12,8 l12,-8 M20,78 h60" fill="none" stroke="#000"
                            stroke-width="5" />
                    </svg>
                </button>

                <button id="brushDepress"
                    data-tip="Depress brush: drag to gradually decrease height of cells in radius by Power value">
                    <svg viewBox="15 15 70 70" height="1em" width="1.6em">
                        <path d="M50,30 v35 l-12,-8 m12,8 l12,-8 M20,63 q30,35 60,0" fill="none" stroke="#000"
                            stroke-width="5" />
                    </svg>
                </button>

                <button id="brushAlign"
                    data-tip="Align brush: drag to set height of cells in radius to height of the cell at mousepoint">
                    <svg viewBox="15 15 70 70" height="1em" width="1.6em">
                        <path d="m20,50 h56 m0,20 h-56" fill="none" stroke="#000" stroke-width="5" />
                    </svg>
                </button>

                <button id="brushSmooth"
                    data-tip="Smooth brush: drag to level height of cells in radius to height of adjacent cells">
                    <svg viewBox="15 15 70 70" height="1em" width="1.6em">
                        <path d="m15,60 q15,-15 30,0 q15,15 35,0" fill="none" stroke="#000" stroke-width="5" />
                    </svg>
                </button>

                <button id="brushDisrupt"
                    data-tip="Disrupt brush: drag to randomize height of cells in radius based on Power value">
                    <svg viewBox="15 15 70 70" height="1em" width="1.6em">
                        <path d="m15,63 l15,-13 15,20 15,-20 15,19 15,-14" fill="none" stroke="#000" stroke-width="5" />
                    </svg>
                </button>
            </div>

            <div id="brushesSliders" style="display: none">
                <div data-tip="Change brush size. Shortcut: + (increase), – (decrease)" style="padding-bottom: 1px">
                    <div style="width:3.2em; display: inline-block"><i>Radius:</i></div>
                    <input id="brushRadius"
                        oninput="tip('Brush radius: '+this.value); brushRadiusNumber.value = this.value" type="range"
                        min=1 max=99 value=25>
                    <input id="brushRadiusNumber"
                        oninput="tip('Brush radius: '+this.value); brushRadius.value = this.value" type="number" min=1
                        max=99 value=25 style="border: 1px solid #d4d4d4">
                </div>

                <div data-tip="Set the brush power">
                    <div style="width:3.2em; display: inline-block"><i>Power:</i></div>
                    <input id="brushPower"
                        oninput="tip('Brush power: '+this.value); brushPowerNumber.value = this.value" type="range"
                        min=1 max=10 value=5>
                    <input id="brushPowerNumber"
                        oninput="tip('Brush power: '+this.value); brushPower.value = this.value" type="number" min=1
                        max=10 value=5 style="border: 1px solid #d4d4d4">
                </div>
            </div>

            <div data-tip="Allow brush to change only land cells and hence restrict the coastline modification"
                style="margin-bottom: .6em">
                <input id="changeOnlyLand" class="checkbox" type="checkbox">
                <label for="changeOnlyLand" class="checkbox-label"><i>change only land cells</i></label>
            </div>

            <div id="modifyButtons">
                <button id="undo" data-tip="Undo the latest action (Ctrl + Z)" class="icon-ccw"
                    disabled></button>
                <button id="redo" data-tip="Redo the action (Ctrl + Y)" class="icon-cw" disabled></button>
                <button id="rescaleShow" data-tip="Show rescaler slider" class="icon-exchange"></button>
                <button id="rescaleCondShow" data-tip="Rescaler: change height if condition is fulfilled"
                    class="icon-if"></button>
                <button id="smoothHeights" data-tip="Smooth all heights a bit" class="icon-smooth"></button>
                <button id="disruptHeights" data-tip="Disrupt (randomize) heights a bit"
                    class="icon-disrupt"></button>
                <button id="brushClear" data-tip="Set height for all cells to 0 (erase the map)"
                    class="icon-eraser"></button>
            </div>

            <div id="rescaleSection" style="display: none">
                <button id="rescaleHide" data-tip="Hide rescaler slider" class="icon-exchange"></button>
                <input id="rescaler" data-tip="Change height for all cells" type="range" min=-10 max=10 step=1 value=0>
            </div>

            <div id="rescaleCondSection"
                data-tip="If height is greater or equal to X and less or equal to Y, then perform an operation Z with operand V"
                style="display: none">
                <button id="rescaleCondHide" data-tip="Hide rescaler" class="icon-if"></button>
                <label>h ≥</label>
                <input id="rescaleLower" value=20 type="number" min=0 max=100>
                <label>≤</label>
                <input id="rescaleHigher" value=100 type="number" min=1 max=100>
                <label>⇒</label>
                <select id="conditionSign">
                    <option value="multiply" selected>×</option>
                    <option value="divide">÷</option>
                    <option value="add">+</option>
                    <option value="subtract">-</option>
                    <option value="exponent">^</option>
                </select>
                <input id="rescaleModifier" type="number" value=0.9 min=0 max=1.5 step=0.01>
                <button id="rescaleExecute" data-tip="Click to perform an operation"
                    class="icon-play-circled2"></button>
            </div>

        </div>

        <div id="templateEditor" class="dialog stable" style="display: none">
            <div id="templateTop">
                <i>Select template: </i><select id="templateSelect" style="width:16em" data-prev="templateCustom"
                    data-tip="Select base template">
                    <option value="custom" selected>Custom</option>
                    <option value="volcano">Volcano</option>
                    <option value="highIsland">High Island</option>
                    <option value="lowIsland">Low Island</option>
                    <option value="continents">Two Continents</option>
                    <option value="archipelago">Archipelago</option>
                    <option value="atoll">Atoll</option>
                    <option value="mediterranean">Mediterranean</option>
                    <option value="peninsula">Peninsula</option>
                    <option value="pangea">Pangea</option>
                    <option value="isthmus">Isthmus</option>
                    <option value="shattered">Shattered</option>
                    <option value="taklamakan">Taklamakan</option>
                </select>
            </div>
            <div id="templateTools">
                <button id="templateHill" data-tip="Hill: small blob" class="noicon">H</button>
                <button id="templatePit" data-tip="Pit: round depression" class="noicon">P</button>
                <button id="templateRange" data-tip="Range: elongated elevation" class="noicon">R</button>
                <button id="templateTrough" data-tip="Trough: elongated depression" class="noicon">T</button>
                <button id="templateStrait" data-tip="Strait: centered vertical or horizontal depression"
                    class="noicon">S</button>
                <button id="templateAdd" data-tip="Add or subtract value from all heights in range"
                    class="noicon">+</button>
                <button id="templateMultiply" data-tip="Multiply all heights in range by factor"
                    class="noicon">*</button>
                <button id="templateSmooth"
                    data-tip="Smooth the map replacing cell heights by an average values of its neighbors"
                    class="noicon">~</button>
            </div>
            <div id="templateBody" data-changed=0 class="table" style="padding:2px 0">
                <div data-type="Hill">
                    <div class="icon-check" data-tip="Click to skip the step"></div>
                    <div style="width:4em">Hill</div>
                    <i class="icon-trash-empty pointer" data-tip="Remove the step"></i>
                    <i class="icon-resize-vertical" data-tip="Drag to reorder"></i>
                    <span>y:<input class="templateY" data-tip="Y axis position in percentage (minY-maxY or Y)"
                            value="47-53"></span>
                    <span>x:<input class="templateX" data-tip="X axis position in percentage (minX-maxX or X)"
                            value="65-75"></span>
                    <span>h:<input class="templateHeight"
                            data-tip="Blob maximum height, use hyphen to get a random number in range"
                            value="90-100"></span>
                    <span>n:<input class="templateCount"
                            data-tip="Blobs to add, use hyphen to get a random number in range" value="1"></span>
                </div>
            </div>
            <div id="templateBottom">
                <button id="templateRun" data-tip="Apply current template" class="icon-play-circled2"></button>
                <button id="templateUndo" data-tip="Undo the latest action" class="icon-ccw" disabled></button>
                <button id="templateRedo" data-tip="Redo the action" class="icon-cw" disabled></button>
                <button id="templateSave" data-tip="Download the template as a text file"
                    class="icon-download"></button>
                <button id="templateLoad" data-tip="Open previously downloaded template"
                    class="icon-upload"></button>
                <button id="templateCA" data-tip="Find or share custom template on Cartography Assets portal"
                    class="icon-drafting-compass"
                    onclick="openURL('https://cartographyassets.com/asset-category/specific-assets/azgaars-generator/templates')"></button>
                <button id="templateTutorial" data-tip="Open Template Editor Tutorial" class="icon-info"
                    onclick="wiki('Heightmap-template-editor')"></button>
            </div>
        </div>

        <div id="imageConverter" class="dialog stable" style="display: none">

            <div id="convertImageButtons">
                <button id="convertImageLoad" data-tip="Load image to convert" class="icon-upload"></button>
                <button id="convertAutoLum"
                    data-tip="Auto-assign colors based on liminosity (good for monochrome images)"
                    class="icon-adjust"></button>
                <button id="convertAutoHue" data-tip="Auto-assign colors based on hue (good for colored images)"
                    class="icon-paint-roller"></button>
                <button id="convertAutoFMG"
                    data-tip="Auto-assign colors using generator scheme (for exported colored heightmaps)"
                    class="icon-layer-group"></button>
                <button id="convertColorsButton" data-tip="Set maximum number of colors"
                    class="icon-signal"></button>
                <input id="convertColors" value="100" style="display: none" />
                <button id="convertComplete"
                    data-tip="Complete the conversion. All unassigned colors will be considered as ocean"
                    class="icon-check"></button>
                <button id="convertCancel" data-tip="Cancel the conversion. Previous heightmap will be restored"
                    class="icon-cancel"></button>
            </div>

            <div data-tip="Set opacity of the loaded image" style="padding-top: .4em"><i>Overlay opacity:</i><br>
                <input id="convertOverlay" type="range" min=0 max=1 step=.01 value=0 style="width: 12.6em">
                <input id="convertOverlayNumber" type="number" min=0 max=1 step=.01 value=0 style="width: 4.2em">
            </div>

            <div data-tip="Select a color below and assign a height value for it" id="colorsSelect"
                style="display: none">
                <i>Set height: </i>
                <span id="colorsSelectValue"></span>
                <span>(<span id="colorsSelectFriendly">0</span>)</span><br>
                <div id="imageConverterPalette"></div>
            </div>

            <div data-tip="Select a color to re-assign the height value" id="colorsAssigned" style="display: none">
                <i>Assigned colors (<span id="colorsAssignedNumber"></span>):</i><br>
            </div>

            <div data-tip="Select a color to assign a height value" id="colorsUnassigned" style="display: none">
                <i>Unassigned colors (<span id="colorsUnassignedNumber"></span>):</i><br>
            </div>

        </div>

        <div id="biomesEditor" class="dialog stable" style="display: none">
            <div id="biomesHeader" class="header">
                <div style="left:1.8em" data-tip="Click to sort by biome name" class="sortable alphabetically"
                    data-sortby="name">Biome&nbsp;</div>
                <div style="left:12em" data-tip="Click to sort by biome habitability" class="sortable hide"
                    data-sortby="habitability">Habitability&nbsp;</div>
                <div style="left:19em" data-tip="Click to sort by biome cells number"
                    class="sortable hide icon-sort-number-down" data-sortby="cells">Cells&nbsp;</div>
                <div style="left:25em" data-tip="Click to sort by biome area" class="sortable hide"
                    data-sortby="area">Area&nbsp;</div>
                <div style="left:30em" data-tip="Click to sort by biome population" class="sortable hide"
                    data-sortby="population">Population&nbsp;</div>
            </div>

            <div id="biomesBody" class="table" data-type="absolute"></div>

            <div id="biomesFooter" class="totalLine">
                <div data-tip="Number of land biomes" style="margin-left: 12px">Biomes:&nbsp;<span
                        id="biomesFooterBiomes">0</span></div>
                <div data-tip="Total land cells number" style="margin-left: 12px">Cells:&nbsp;<span
                        id="biomesFooterCells">0</span></div>
                <div data-tip="Total land area" style="margin-left: 12px">Land Area:&nbsp;<span
                        id="biomesFooterArea">0</span></div>
                <div data-tip="Total population" style="margin-left: 12px">Population:&nbsp;<span
                        id="biomesFooterPopulation">0</span></div>
            </div>

            <div id="biomesBottom">
                <button id="biomesEditorRefresh" data-tip="Refresh the Editor" class="icon-cw"></button>
                <button id="biomesEditStyle" data-tip="Edit biomes style in Style Editor"
                    class="icon-adjust"></button>
                <button id="biomesLegend" data-tip="Toggle Legend box" class="icon-list-bullet"></button>
                <button id="biomesPercentage" data-tip="Toggle percentage / absolute values views"
                    class="icon-percent"></button>
                <button id="biomesManually"
                    data-tip="Manually re-assign biomes to not follow the default moisture/temperature pattern"
                    class="icon-brush"></button>
                <div id="biomesManuallyButtons" style="display: none">
                    <label data-tip="Change brush size. Shortcut: + (increase), – (decrease)"
                        class="italic">Brush radius:
                        <input id="biomesManuallyBrush"
                            oninput="tip('Brush radius: '+this.value); biomesManuallyBrushNumber.value = this.value"
                            type="range" min="5" max="99" value="15" style="width:4em">
                        <input id="biomesManuallyBrushNumber"
                            oninput="tip('Brush radius: '+this.value); biomesManuallyBrush.value = this.value"
                            type="number" min="5" max="99" value="15">
                    </label><br>
                    <button id="biomesManuallyApply" data-tip="Apply current assignment"
                        class="icon-check"></button>
                    <button id="biomesManuallyCancel" data-tip="Cancel assignment" class="icon-cancel"></button>
                </div>
                <button id="biomesAdd" data-tip="Add a custom biome" class="icon-plus"></button>
                <button id="biomesRestore"
                    data-tip="Restore the defaults and re-define biomes based on current moisture and temperature"
                    class="icon-history"></button>
                <button id="biomesRegenerateReliefIcons"
                    data-tip="Regenerate relief icons based on current biomes and elevation"
                    class="icon-tree"></button>
                <button id="biomesExport" data-tip="Save biomes-related data as a text file (.csv)"
                    class="icon-download"></button>
            </div>

        </div>

        <div id="statesEditor" class="dialog stable" style="display: none">
            <div id="statesHeader" class="header">
                <div style="left:1.8em" data-tip="Click to sort by state name" class="sortable alphabetically"
                    data-sortby="name">State&nbsp;</div>
                <div style="left:9.7em" data-tip="Click to sort by state form name" class="sortable alphabetically"
                    data-sortby="form">Form&nbsp;</div>
                <div style="left:16.3em" data-tip="Click to sort by capital name" class="sortable alphabetically hide"
                    data-sortby="capital">Capital&nbsp;</div>
                <div style="left:23em" data-tip="Click to sort by state dominant culture"
                    class="sortable alphabetically hide" data-sortby="culture">Culture&nbsp;</div>
                <div style="left:27.8em" data-tip="Click to sort by state burgs count" class="sortable hide"
                    data-sortby="burgs">Burgs&nbsp;</div>
                <div style="left:32.5em" data-tip="Click to sort by state area"
                    class="sortable hide icon-sort-number-down" data-sortby="area">Area&nbsp;</div>
                <div style="left:37em" data-tip="Click to sort by state population" class="sortable hide"
                    data-sortby="population">Population&nbsp;</div>
                <div style="left:43.5em" data-tip="Click to sort by state type"
                    class="sortable alphabetically hidden show hide" data-sortby="type">Type&nbsp;</div>
                <div style="left:47em" data-tip="Click to sort by state expansion value"
                    class="sortable hidden show hide" data-sortby="expansionism">Expansion&nbsp;</div>
                <div style="left:53.5em" data-tip="Click to sort by state cells count"
                    class="sortable hidden show hide" data-sortby="cells">Cells&nbsp;</div>
            </div>

            <div id="statesBodySection" class="table" data-type="absolute"></div>

            <div id="statesFooter" class="totalLine">
                <div data-tip="States number" style="margin-left: 5px">States:&nbsp;<span
                        id="statesFooterStates">0</span></div>
                <div data-tip="Total land cells number" style="margin-left: 12px">Cells:&nbsp;<span
                        id="statesFooterCells">0</span></div>
                <div data-tip="Total burgs number" style="margin-left: 12px">Burgs:&nbsp;<span
                        id="statesFooterBurgs">0</span></div>
                <div data-tip="Total land area" style="margin-left: 12px">Land Area:&nbsp;<span
                        id="statesFooterArea">0</span></div>
                <div data-tip="Total population" style="margin-left: 12px">Population:&nbsp;<span
                        id="statesFooterPopulation">0</span></div>
            </div>
            <div>
                Shrink States <button type="button" id="stateShrink" onclick="shrinkStates()">◄</button> <button
                    type="button" id="stateGrow" onclick="growStates()">►</button> Grow States
            </div>
            <div id="statesBottom">
                <button id="statesEditorRefresh" data-tip="Refresh the Editor" class="icon-cw"></button>
                <button id="statesEditStyle" data-tip="Edit states style in Style Editor"
                    class="icon-adjust"></button>
                <button id="statesLegend" data-tip="Toggle Legend box" class="icon-list-bullet"></button>
                <button id="statesPercentage" data-tip="Toggle percentage / absolute values views"
                    class="icon-percent"></button>
                <button id="statesChart" data-tip="Show states bubble chart" class="icon-chart-area"></button>

                <button id="statesRegenerate" data-tip="Show the regeneration menu and more data"
                    class="icon-cog-alt"></button>
                <div id="statesRegenerateButtons" style="display: none">
                    <button id="statesRegenerateBack" data-tip="Hide the regeneration menu"
                        class="icon-cog-alt"></button>
                    <button id="statesRandomize"
                        data-tip="Randomize states Expansion value and re-calculate states and provinces"
                        class="icon-shuffle"></button>
                    <span data-tip="Additional growth rate. Defines how many lands will stay neutral">
                        <label class="italic">Growth rate:</label>
                        <input id="statesNeutral"
                            oninput="tip('Growth rate: '+this.value); statesNeutralNumber.value = this.value"
                            type="range" min=.1 max=3 step=.05 value=1 style="width:90px">
                        <input id="statesNeutralNumber"
                            oninput="tip('Growth rate: '+this.value); statesNeutral.value = this.value" type="number"
                            min=.1 max=3 step=.05 value=1 style="width:42px">
                    </span>
                    <button id="statesRecalculate"
                        data-tip="Recalculate states based on current values of growth-related attributes"
                        class="icon-retweet"></button>
                    <span
                        data-tip="Allow states neutral distance, expansion and type changes to take an immediate effect">
                        <input id="statesAutoChange" class="checkbox" type="checkbox">
                        <label for="statesAutoChange" class="checkbox-label"><i>auto-apply changes</i></label>
                    </span>
                    <span data-tip="Allow system to change state labels when states data is change">
                        <input id="adjustLabels" class="checkbox" type="checkbox">
                        <label for="adjustLabels" class="checkbox-label"><i>auto-change labels</i></label>
                    </span>
                </div>

                <button id="statesManually" data-tip="Manually re-assign states" class="icon-brush"></button>
                <div id="statesManuallyButtons" style="display: none">
                    <label data-tip="Change brush size. Shortcut: + (increase), – (decrease)"
                        class="italic">Brush size:
                        <input id="statesManuallyBrush"
                            oninput="tip('Brush size: '+this.value); statesManuallyBrushNumber.value = this.value"
                            type="range" min=5 max=99 value=15 style="width:5em">
                        <input id="statesManuallyBrushNumber"
                            oninput="tip('Brush size: '+this.value); statesManuallyBrush.value = this.value"
                            type="number" min=5 max=99 value=15>
                    </label><br>
                    <button id="statesManuallyApply" data-tip="Apply assignment" class="icon-check"></button>
                    <button id="statesManuallyCancel" data-tip="Cancel assignment" class="icon-cancel"></button>
                </div>

                <button id="statesAdd" data-tip="Add a new state. Hold Shift to add multiple"
                    class="icon-plus"></button>
                <button id="statesExport" data-tip="Save state-related data as a text file (.csv)"
                    class="icon-download"></button>
            </div>
        </div>

        <div id="stateNameEditor" class="dialog" data-state="0" style="display: none">
            <div style="padding: .1em">
                <div data-tip="State short name" class="label">Short name:</div>
                <input id="stateNameEditorShort" data-tip="Type to change the short name" autocorrect="off"
                    spellcheck="false" style="width: 11em">
                <span data-tip="Speak the name. You can change voice and language in options"
                    class="speaker">🔊</span>
                <span id="stateNameEditorShortCulture" data-tip="Generate culture-specific name"
                    class="icon-book pointer"></span>
                <span id="stateNameEditorShortRandom" data-tip="Generate random name"
                    class="icon-globe pointer"></span>
            </div>

            <div style="padding: .1em" data-tip="Select form name">
                <div data-tip="State form name" class="label">Form name:</div>
                <select id="stateNameEditorSelectForm" style="width: 11em">
                    <option value="">blank</option>
                    <optgroup label="Monarchy">
                        <option value="Beylik">Beylik</option>
                        <option value="Despotate">Despotate</option>
                        <option value="Dominion">Dominion</option>
                        <option value="Duchy">Duchy</option>
                        <option value="Emirate">Emirate</option>
                        <option value="Empire">Empire</option>
                        <option value="Horde">Horde</option>
                        <option value="Grand Duchy">Grand Duchy</option>
                        <option value="Heptarchy">Heptarchy</option>
                        <option value="Khaganate">Khaganate</option>
                        <option value="Khanate">Khanate</option>
                        <option value="Kingdom">Kingdom</option>
                        <option value="Marches">Marches</option>
                        <option value="Principality">Principality</option>
                        <option value="Satrapy">Satrapy</option>
                        <option value="Shogunate">Shogunate</option>
                        <option value="Sultanate">Sultanate</option>
                        <option value="Tsardom">Tsardom</option>
                        <option value="Ulus">Ulus</option>
                    </optgroup>
                    <optgroup label="Republic">
                        <option value="City-state">City-state</option>
                        <option value="Diarchy">Diarchy</option>
                        <option value="Federation">Federation</option>
                        <option value="Free City">Free City</option>
                        <option value="Most Serene Republic">Most Serene Republic</option>
                        <option value="Oligarchy">Oligarchy</option>
                        <option value="Protectorate">Protectorate</option>
                        <option value="Republic">Republic</option>
                        <option value="Tetrarchy">Tetrarchy</option>
                        <option value="Trade Company">Trade Company</option>
                        <option value="Triumvirate">Triumvirate</option>
                    </optgroup>
                    <optgroup label="Union">
                        <option value="Confederacy">Confederacy</option>
                        <option value="Confederation">Confederation</option>
                        <option value="Conglomerate">Conglomerate</option>
                        <option value="Commonwealth">Commonwealth</option>
                        <option value="League">League</option>
                        <option value="Union">Union</option>
                        <option value="United Hordes">United Hordes</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="United Provinces">United Provinces</option>
                        <option value="United Republic">United Republic</option>
                        <option value="United States">United States</option>
                        <option value="Tribes">United Tribes</option>
                    </optgroup>
                    <optgroup label="Theocracy">
                        <option value="Bishopric">Bishopric</option>
                        <option value="Brotherhood">Brotherhood</option>
                        <option value="Caliphate">Caliphate</option>
                        <option value="Diocese">Diocese</option>
                        <option value="Divine Duchy">Divine Duchy</option>
                        <option value="Divine Grand Duchy">Divine Grand Duchy</option>
                        <option value="Divine Principality">Divine Principality</option>
                        <option value="Divine Kingdom">Divine Kingdom</option>
                        <option value="Divine Empire">Divine Empire</option>
                        <option value="Eparchy">Eparchy</option>
                        <option value="Holy State">Holy State</option>
                        <option value="Imamah">Imamah</option>
                        <option value="Theocracy">Theocracy</option>
                    </optgroup>
                    <optgroup label="Anarchy">
                        <option value="Commune">Commune</option>
                        <option value="Community">Community</option>
                        <option value="Council">Council</option>
                        <option value="Free Territory">Free Territory</option>
                        <option value="Tribes">Tribes</option>
                    </optgroup>
                </select>
                <input id="stateNameEditorCustomForm" placeholder="type form name" data-tip="Enter custom form name"
                    style="display: none; width: 11em;">
                <span id="stateNameEditorAddForm" data-tip="Click to add custom state form name to the list"
                    class="icon-plus pointer"></span>
            </div>

            <div style="padding: .1em">
                <div data-tip="State full name" class="label">Full name:</div>
                <input id="stateNameEditorFull" data-tip="Type to change the full name" autocorrect="off"
                    spellcheck="false" style="width: 11em">
                <span data-tip="Speak the name. You can change voice and language in options"
                    class="speaker">🔊</span>
                <span id="stateNameEditorFullRegenerate" data-tip="Click to re-generate full name" data-tick="0"
                    class="icon-arrows-cw pointer"></span>
            </div>

            <div data-tip="Uncheck to not update state label on name change" style="padding: .2em">
                <input id="stateNameEditorUpdateLabel" class="checkbox" type="checkbox" checked>
                <label for="stateNameEditorUpdateLabel" class="checkbox-label"><i>Update label</i></label>
            </div>
        </div>

        <div id="provincesEditor" class="dialog stable" style="display: none">
            <div id="provincesHeader" class="header">
                <div style="left:1.8em" data-tip="Click to sort by province name" class="sortable alphabetically"
                    data-sortby="name">Province&nbsp;</div>
                <div style="left:9.7em" data-tip="Click to sort by province form name"
                    class="sortable alphabetically hide" data-sortby="form">Form&nbsp;</div>
                <div style="left:15.9em" data-tip="Click to sort by province capital"
                    class="sortable alphabetically hide" data-sortby="capital">Capital&nbsp;</div>
                <div style="left:23.2em" data-tip="Click to sort by province owner" class="sortable alphabetically"
                    data-sortby="state">State&nbsp;</div>
                <div style="left:30em" data-tip="Click to sort by province area" class="sortable hide"
                    data-sortby="area">Area&nbsp;</div>
                <div style="left:35.3em" data-tip="Click to sort by province population" class="sortable hide"
                    data-sortby="population">Population&nbsp;</div>
            </div>

            <div id="provincesBodySection" class="table" data-type="absolute"></div>

            <div id="provincesFooter" class="totalLine">
                <div data-tip="Provinces displayed" style="margin-left: 4px">Provinces:&nbsp;<span
                        id="provincesFooterNumber">0</span></div>
                <div data-tip="Average area" style="margin-left: 14px">Mean area:&nbsp;<span
                        id="provincesFooterArea">0</span></div>
                <div data-tip="Average population" style="margin-left: 14px">Mean population:&nbsp;<span
                        id="provincesFooterPopulation">0</span></div>
            </div>

            <div id="provincesBottom">
                <button id="provincesEditorRefresh" data-tip="Refresh the Editor" class="icon-cw"></button>
                <button id="provincesEditStyle" data-tip="Edit provinces style in Style Editor"
                    class="icon-adjust"></button>
                <button id="provincesRecolor" data-tip="Recolor listed provinces based on state color"
                    class="icon-paint-roller"></button>
                <button id="provincesPercentage" data-tip="Toggle percentage / absolute values views"
                    class="icon-percent"></button>
                <button id="provincesChart" data-tip="Show provinces chart" class="icon-chart-area"></button>
                <button id="provincesToggleLabels"
                    data-tip="Toggle province labels. Change size in Menu ⭢ Style ⭢ Provinces"
                    class="icon-font"></button>
                <button id="provincesExport" data-tip="Save provinces-related data as a text file (.csv)"
                    class="icon-download"></button>

                <button id="provincesManually" data-tip="Manually re-assign provinces" class="icon-brush"></button>
                <div id="provincesManuallyButtons" style="display: none">
                    <label data-tip="Change brush size. Shortcut: + (increase), – (decrease)"
                        class="italic">Brush size:
                        <input id="provincesManuallyBrush"
                            oninput="tip('Brush size: '+this.value); provincesManuallyBrushNumber.value = this.value"
                            type="range" min=5 max=99 value=8 style="width:5em">
                        <input id="provincesManuallyBrushNumber"
                            oninput="tip('Brush size: '+this.value); provincesManuallyBrush.value = this.value"
                            type="number" min=5 max=99 value=8>
                    </label><br>
                    <button id="provincesManuallyApply" data-tip="Apply assignment" class="icon-check"></button>
                    <button id="provincesManuallyCancel" data-tip="Cancel assignment" class="icon-cancel"></button>
                </div>

                <button id="provincesAdd" data-tip="Add a new province. Hold Shift to add multiple"
                    class="icon-plus"></button>
                <button id="provincesRemoveAll" data-tip="Remove all provinces. States will remain as they are"
                    class="icon-trash"></button>

                <span>State: </span>
                <select id="provincesFilterState"></select>
            </div>
        </div>

        <div id="diplomacyEditor" class="dialog stable" style="display: none">
            <div id="diplomacyHeader" class="header">
                <div style="left:.2em" data-tip="Click to sort by state name" class="sortable alphabetically"
                    data-sortby="name">State&nbsp;</div>
                <div style="left:13.4em" data-tip="Click to sort by diplomatical relations"
                    class="sortable alphabetically" data-sortby="relations">Relations&nbsp;</div>
            </div>

            <div id="diplomacyBodySection" class="table"></div>

            <div id="diplomacySelect">
                <div
                    data-tip="Ally means states formed a defensive pact and will protect each other in case of third party aggression">
                    Ally</div>
                <div data-tip="State is friendly to anouther state when they share some common interests">Friendly</div>
                <div data-tip="Neutral means states relations are neither positive nor negative">Neutral</div>
                <div data-tip="Suspicion means state has a cautious distrust of another state">Suspicion</div>
                <div data-tip="Enemies are states at war with each other">Enemy</div>
                <div data-tip="Relations are unknown if states do not have enough information about each other">Unknown
                </div>
                <div data-tip="Rivalry is a state of competing for dominance in the region">Rival</div>
                <div data-tip="Vassal is a state having obligation to its suzerain">Vassal</div>
                <div data-tip="Suzerain is a state having some control over its vassals">Suzerain</div>
            </div>

            <div id="diplomacyBottom" style="margin-top: .1em">
                <button id="diplomacyEditorRefresh" data-tip="Refresh the Editor" class="icon-cw"></button>
                <button id="diplomacyEditStyle" data-tip="Edit states (including diplomacy view) style in Style Editor"
                    class="icon-adjust"></button>
                <button id="diplomacyRegenerate" data-tip="Regenerate diplomatical relations"
                    class="icon-retweet"></button>
                <button id="diplomacyHistory" data-tip="Show relations history" class="icon-hourglass-1"></button>
                <button id="diplomacyMatrix" data-tip="Show relations matrix" class="icon-list-bullet"></button>
                <button id="diplomacyExport" data-tip="Save state relations matrix as a text file (.csv)"
                    class="icon-download"></button>
            </div>
        </div>

        <div id="provinceNameEditor" class="dialog" data-province="0" style="display: none">
            <div style="padding: .1em">
                <div data-tip="Province short name" class="label">Short name:</div>
                <input id="provinceNameEditorShort" data-tip="Type to change the short name" autocorrect="off"
                    spellcheck="false" style="width: 11em">
                <span data-tip="Speak the name. You can change voice and language in options"
                    class="speaker">🔊</span>
                <span id="provinceNameEditorShortCulture" data-tip="Generate culture-specific name"
                    class="icon-book pointer"></span>
                <span id="provinceNameEditorShortRandom" data-tip="Generate random name"
                    class="icon-globe pointer"></span>
            </div>

            <div style="padding: .1em" data-tip="Select form name">
                <div data-tip="Province form name" class="label">Form name:</div>
                <select id="provinceNameEditorSelectForm" style="display: inline-block; width: 11em; height: 1.645em">
                    <option value="">blank</option>
                    <option value="Area">Area</option>
                    <option value="Autonomy">Autonomy</option>
                    <option value="Barony">Barony</option>
                    <option value="Canton">Canton</option>
                    <option value="Clan">Clan</option>
                    <option value="Colony">Colony</option>
                    <option value="Council">Council</option>
                    <option value="County">County</option>
                    <option value="Deanery">Deanery</option>
                    <option value="Department">Department</option>
                    <option value="Dependency">Dependency</option>
                    <option value="District">District</option>
                    <option value="Earldom">Earldom</option>
                    <option value="Governorate">Governorate</option>
                    <option value="Island">Island</option>
                    <option value="Islands">Islands</option>
                    <option value="Land">Land</option>
                    <option value="Landgrave">Landgrave</option>
                    <option value="Mandate">Mandate</option>
                    <option value="Margrave">Margrave</option>
                    <option value="Occupation zone">Occupation zone</option>
                    <option value="Parish">Parish</option>
                    <option value="Prefecture">Prefecture</option>
                    <option value="Province">Province</option>
                    <option value="Region">Region</option>
                    <option value="Republic">Republic</option>
                    <option value="Reservation">Reservation</option>
                    <option value="Shire">Shire</option>
                    <option value="State">State</option>
                    <option value="Territory">Territory</option>
                    <option value="Tribe">Tribe</option>
                </select>
                <input id="provinceNameEditorCustomForm" placeholder="type form name"
                    data-tip="Create custom province form name" style="display: none; width: 11em;">
                <span id="provinceNameEditorAddForm" data-tip="Click to add custom province form name to the list"
                    class="icon-plus pointer"></span>
            </div>

            <div style="padding: .1em">
                <div data-tip="Province full name" class="label">Full name:</div>
                <input id="provinceNameEditorFull" data-tip="Type to change the full name" autocorrect="off"
                    spellcheck="false" style="width: 11em">
                <span data-tip="Speak the name. You can change voice and language in options"
                    class="speaker">🔊</span>
                <span id="provinceNameEditorFullRegenerate" data-tip="Click to re-generate full name"
                    class="icon-arrows-cw pointer"></span>
            </div>
        </div>

        <div id="culturesEditor" class="dialog stable" style="display: none">
            <div id="culturesHeader" class="header">
                <div style="left:1.8em" data-tip="Click to sort by culture name" class="sortable alphabetically"
                    data-sortby="name">Culture&nbsp;</div>
                <div style="left:8.7em" data-tip="Click to sort by culture cells count" class="sortable hide"
                    data-sortby="cells">Cells&nbsp;</div>
                <div style="left:13.2em" data-tip="Click to sort by expansionism" class="sortable hide"
                    data-sortby="expansionism">Expan.&nbsp;</div>
                <div style="left:18.6em" data-tip="Click to sort by type" class="sortable alphabetically"
                    data-sortby="type">Type&nbsp;</div>
                <div style="left:24.9em" data-tip="Click to sort by culture area" class="sortable hide"
                    data-sortby="area">Area&nbsp;</div>
                <div style="left:28.8em" data-tip="Click to sort by culture population"
                    class="sortable hide icon-sort-number-down" data-sortby="population">Population&nbsp;</div>
                <div style="left:35.8em" data-tip="Click to sort by culture namesbase" class="sortable"
                    data-sortby="base">Namesbase&nbsp;</div>
                <div style="left:42.9em" data-tip="Click to sort by culture emblems shape"
                    class="sortable alphabetically hide" data-sortby="emblems">Emblems&nbsp;</div>
            </div>
            <div id="culturesBody" class="table" data-type="absolute"></div>

            <div id="culturesFooter" class="totalLine">
                <div data-tip="Cultures number" style="margin-left: 12px">Cultures:&nbsp;<span
                        id="culturesFooterCultures">0</span></div>
                <div data-tip="Total land cells number" style="margin-left: 12px">Cells:&nbsp;<span
                        id="culturesFooterCells">0</span></div>
                <div data-tip="Total land area" style="margin-left: 12px">Land Area:&nbsp;<span
                        id="culturesFooterArea">0</span></div>
                <div data-tip="Total population" style="margin-left: 12px">Population:&nbsp;<span
                        id="culturesFooterPopulation">0</span></div>
            </div>

            <div id="culturesBottom">
                <button id="culturesEditorRefresh" data-tip="Refresh the Editor" class="icon-cw"></button>
                <button id="culturesEditStyle" data-tip="Edit cultures style in Style Editor"
                    class="icon-adjust"></button>
                <button id="culturesLegend" data-tip="Toggle Legend box" class="icon-list-bullet"></button>
                <button id="culturesPercentage" data-tip="Toggle percentage / absolute values display mode"
                    class="icon-percent"></button>
                <button id="culturesHeirarchy" data-tip="Show cultures hierarchy tree" class="icon-sitemap"></button>
                <button id="culturesManually" data-tip="Manually re-assign cultures" class="icon-brush"></button>
                <div id="culturesManuallyButtons" style="display: none">
                    <label data-tip="Change brush size. Shortcut: + (increase), – (decrease)"
                        class="italic">Brush size:
                        <input id="culturesManuallyBrush"
                            oninput="tip('Brush size: '+this.value); culturesManuallyBrushNumber.value = this.value"
                            type="range" min=5 max=99 value=15 style="width:7em">
                        <input id="culturesManuallyBrushNumber"
                            oninput="tip('Brush size: '+this.value); culturesManuallyBrush.value = this.value"
                            type="number" min=5 max=99 value=15>
                    </label><br>
                    <button id="culturesManuallyApply" data-tip="Apply assignment" class="icon-check"></button>
                    <button id="culturesManuallyCancel" data-tip="Cancel assignment" class="icon-cancel"></button>
                </div>
                <button id="culturesEditNamesBase" data-tip="Edit a database used for names generation"
                    class="icon-font"></button>
                <button id="culturesAdd" data-tip="Add a new culture. Hold Shift to add multiple"
                    class="icon-plus"></button>
                <button id="culturesExport" data-tip="Download cultures-related data" class="icon-download"></button>
                <button id="culturesRecalculate"
                    data-tip="Recalculate cultures based on current values of growth-related attributes"
                    class="icon-retweet"></button>
                <span data-tip="Allow culture centers, expansion and type changes to take an immediate effect">
                    <input id="culturesAutoChange" class="checkbox" type="checkbox">
                    <label for="culturesAutoChange" class="checkbox-label"><i>auto-apply changes</i></label>
                </span>
            </div>
        </div>

        <div id="namesbaseEditor" class="dialog stable textual" style="display: none">
            <div id="namesbaseBasesTop">
                <span>Select base: </span>
                <select id="namesbaseSelect" data-tip="Select base to edit" style="width: 12em" value="0"></select>
            </div>

            <div id="namesbaseBody">
                <span>Names data:</span><br>
                <textarea id="namesbaseTextarea" data-base="0" rows=12
                    data-tip="Names data: a comma separated list of source names used for names generation"
                    placeholder="Provide a names data: a comma separated list of source names" autocorrect="off"
                    spellcheck="false"></textarea>
                <br>
                <div>
                    <span>Name: </span>
                    <input id="namesbaseName" data-tip="Type to change a base name" placeholder="Base name"
                        autocorrect="off" spellcheck="false" style="width:12em" />
                    <span>Length: </span>
                    <input id="namesbaseMin" data-tip="Recommended minimum name length" type="number" min=2 max=100>
                    <input id="namesbaseMax" data-tip="Recommended maximum name length" type="number" min=2 value=10>
                    <span>Double: </span>
                    <input id="namesbaseDouble"
                        data-tip="Populate with letters that can used twice in a row (geminates)" autocorrect="off"
                        spellcheck="false" style="width:10em">
                </div>
                <fieldset>
                    <legend>Generated examples: </legend>
                    <div id="namesbaseExamples" data-tip="Examples. Click to re-generate"></div>
                </fieldset>
            </div>

            <div id="namesbaseBottom">
                <button id="namesbaseUpdateExamples" data-tip="Re-generate examples based on provided data"
                    class="icon-arrows-cw"></button>
                <button id="namesbaseAnalize" data-tip="Analyze namesbase to get a validity and quality overview"
                    class="icon-flask"></button>
                <button id="namesbaseAdd" data-tip="Add new namesbase" class="icon-plus"></button>
                <button id="namesbaseDefault" data-tip="Restore default namesbase" class="icon-cancel"></button>
                <button id="namesbaseDownload" data-tip="Download namesbase to PC" class="icon-download"></button>
                <button id="namesbaseUpload" data-tip="Upload a namesbase from PC" class="icon-upload"></button>
                <button id="namesbaseCA" data-tip="Find or share custom namesbase on Cartography Assets portal"
                    class="icon-drafting-compass"
                    onclick="openURL('https://cartographyassets.com/asset-category/specific-assets/azgaars-generator/namebases/')"></button>
                <button id="namesbaseSpeak" data-tip="Speak the examples. You can change voice and language in options"
                    class="icon-voice"></button>
            </div>
        </div>

        <div id="zonesEditor" class="dialog stable" style="display: none">
            <div id="customHeader" class="header">
                <div style="left:1.8em" data-tip="Zone description">Description&nbsp;</div>
                <div style="left:13em" data-tip="Zone cells count" class="hide">Cells&nbsp;</div>
                <div style="left:19em" data-tip="Zone area" class="hide">Area&nbsp;</div>
                <div style="left:24em" data-tip="Zone population" class="hide">Population&nbsp;</div>
            </div>

            <div id="zonesBodySection" class="table" data-type="absolute"></div>

            <div id="zonesFooter" class="totalLine">
                <div data-tip="Number of zones" style="margin-left: 5px">Zones:&nbsp;<span
                        id="zonesFooterNumber">0</span></div>
                <div data-tip="Total cells number" style="margin-left: 12px">Cells:&nbsp;<span
                        id="zonesFooterCells">0</span></div>
                <div data-tip="Total map area" style="margin-left: 12px">Area:&nbsp;<span id="zonesFooterArea">0</span>
                </div>
                <div data-tip="Total map population" style="margin-left: 12px">Population:&nbsp;<span
                        id="zonesFooterPopulation">0</span></div>
            </div>

            <div id="zonesBottom">
                <button id="zonesEditorRefresh" data-tip="Refresh the Editor" class="icon-cw"></button>
                <button id="zonesEditStyle" data-tip="Edit zones style in Style Editor"
                    class="icon-adjust"></button>
                <button id="zonesLegend" data-tip="Toggle Legend box" class="icon-list-bullet"></button>
                <button id="zonesPercentage" data-tip="Toggle percentage / absolute values views"
                    class="icon-percent"></button>

                <button id="zonesManually" data-tip="Re-assign zones" class="icon-brush"></button>
                <div id="zonesManuallyButtons" style="display: none">
                    <label data-tip="Change brush size. Shortcut: + (increase), – (decrease)"
                        class="italic">Brush:
                        <input id="zonesBrush"
                            oninput="tip('Brush size: '+this.value); zonesBrushNumber.value = this.value" type="range"
                            min=5 max=25 value=7 style="width:7em">
                        <input id="zonesBrushNumber"
                            oninput="tip('Brush size: '+this.value); zonesBrush.value = this.value" type="number" min=5
                            max=25 value=7>
                    </label><br>
                    <button id="zonesManuallyApply" data-tip="Apply assignment" class="icon-check"></button>
                    <button id="zonesManuallyCancel" data-tip="Cancel assignment" class="icon-cancel"></button>
                    <button id="zonesRemove"
                        data-tip="Click to toggle the removal mode on brush dragging. Shortcut: ctrl"
                        class="icon-eraser"></button>
                </div>

                <button id="zonesAdd" data-tip="Add a new zone layer" class="icon-plus"></button>
                <button id="zonesExport" data-tip="Download zones-related data" class="icon-download"></button>
            </div>
        </div>

        <div id="notesEditor" class="dialog stable textual" style="display: none">
            <div>
                <span>Select object: </span>
                <select id="notesSelect" data-tip="Select object" style="width: 12em"></select>
                <span>Object name: </span>
                <input id="notesName" data-tip="Type to change object name" autocorrect="off" spellcheck="false"
                    style="width: 16em">
                <span data-tip="Speak the name. You can change voice and language in options"
                    class="speaker">🔊</span>
            </div>
            <div id="notesText" data-tip="Type and style object description" style="padding: .4em 0"></div>
            <div>
                <button id="notesSpeak" data-tip="Speak the note. You can change voice and language in options"
                    class="icon-voice"></button>
                <button id="notesFocus" data-tip="Focus on selected object" class="icon-target"></button>
                <button id="notesPin" data-tip="Toggle notes box dispay: hide or do not hide the box on mouse move"
                    class="icon-pin"></button>
                <button id="notesDownload" data-tip="Download notes to PC" class="icon-download"></button>
                <button id="notesUpload" data-tip="Upload notes from PC" class="icon-upload"></button>
                <button id="notesClearStyle" data-tip="Remove all styling, get plain text only"
                    class="icon-eraser"></button>
                <button id="notesRemove" data-tip="Remove this note" class="icon-trash fastDelete"></button>
            </div>
        </div>

        <div id="religionsEditor" class="dialog stable" style="display: none">
            <div id="religionsHeader" class="header">
                <div style="left:1.8em" data-tip="Click to sort by religion name" class="sortable alphabetically"
                    data-sortby="name">Religion&nbsp;</div>
                <div style="left:12.6em" data-tip="Click to sort by religion type"
                    class="sortable alphabetically icon-sort-name-down" data-sortby="type">Type&nbsp;</div>
                <div style="left:18em" data-tip="Click to sort by religion form" class="sortable alphabetically hide"
                    data-sortby="form">Form&nbsp;</div>
                <div style="left:25.1em" data-tip="Click to sort by supreme deity" class="sortable alphabetically hide"
                    data-sortby="deity">Supreme Deity&nbsp;</div>
                <div style="left:42.1em" data-tip="Click to sort by religion area" class="sortable hide"
                    data-sortby="area">Area&nbsp;</div>
                <div style="left:47em" data-tip="Click to sort by number of believers (religion area population)"
                    class="sortable hide" data-sortby="population">Believers&nbsp;</div>
            </div>
            <div id="religionsBody" class="table" data-type="absolute"></div>

            <div id="religionsFooter" class="totalLine">
                <div data-tip="Total number of organized religions" style="margin-left: 12px">Organized:&nbsp;<span
                        id="religionsOrganized">0</span></div>
                <div data-tip="Total number of heresies" style="margin-left: 12px">Heresies:&nbsp;<span
                        id="religionsHeresies">0</span></div>
                <div data-tip="Total number of cults" style="margin-left: 12px">Cults:&nbsp;<span
                        id="religionsCults">0</span></div>
                <div data-tip="Total number of folk religions" style="margin-left: 12px">Folk:&nbsp;<span
                        id="religionsFolk">0</span></div>
                <div data-tip="Total land area" style="margin-left: 12px">Land Area:&nbsp;<span
                        id="religionsFooterArea">0</span></div>
                <div data-tip="Total number of believers (population)" style="margin-left: 12px">Believers:&nbsp;<span
                        id="religionsFooterPopulation">0</span></div>
            </div>

            <div id="religionsBottom">
                <button id="religionsEditorRefresh" data-tip="Refresh the Editor" class="icon-cw"></button>
                <button id="religionsEditStyle" data-tip="Edit religions style in Style Editor"
                    class="icon-adjust"></button>
                <button id="religionsLegend" data-tip="Toggle Legend box" class="icon-list-bullet"></button>
                <button id="religionsPercentage" data-tip="Toggle percentage / absolute values display mode"
                    class="icon-percent"></button>
                <button id="religionsHeirarchy" data-tip="Show religions hierarchy tree"
                    class="icon-sitemap"></button>
                <button id="religionsExtinct" data-tip="Show/hide extinct religions (religions without cells)"
                    class="icon-eye-off"></button>

                <button id="religionsManually" data-tip="Manually re-assign religions" class="icon-brush"></button>
                <div id="religionsManuallyButtons" style="display: none">
                    <label data-tip="Change brush size. Shortcut: + (increase), – (decrease)"
                        class="italic">Brush size:
                        <input id="religionsManuallyBrush"
                            oninput="tip('Brush size: '+this.value); religionsManuallyBrushNumber.value = this.value"
                            type="range" min=5 max=99 value=15 style="width:7em">
                        <input id="religionsManuallyBrushNumber"
                            oninput="tip('Brush size: '+this.value); religionsManuallyBrush.value = this.value"
                            type="number" min=5 max=99 value=15>
                    </label><br>
                    <button id="religionsManuallyApply" data-tip="Apply assignment" class="icon-check"></button>
                    <button id="religionsManuallyCancel" data-tip="Cancel assignment" class="icon-cancel"></button>
                </div>
                <button id="religionsAdd" data-tip="Add a new religion. Hold Shift to add multiple"
                    class="icon-plus"></button>
                <button id="religionsExport" data-tip="Download religions-related data"
                    class="icon-download"></button>
            </div>
        </div>

        <div id="emblemEditor" class="dialog stable" style="display: none">
            <svg viewBox="0 0 200 200">
                <use id="emblemImage"></use>
            </svg>
            <div id="emblemBody">
                <div>
                    <b id="emblemArmiger"></b>
                </div>
                <hr />
                <div data-tip="Select state">
                    <div class="label">State:</div>
                    <select id="emblemStates"></select>
                </div>
                <div data-tip="Select province in state" class="d-none">
                    <div class="label">Province:</div>
                    <select id="emblemProvinces"></select>
                </div>
                <div data-tip="Select burg in province or state" class="d-none">
                    <div class="label">Burg:</div>
                    <select id="emblemBurgs"></select>
                </div>
                <hr />
                <div data-tip="Select shape of the emblem">
                    <div class="label">Shape:</div>
                    <input id="randomShield" class="checkbox" type="checkbox" onclick="toggleEmblemSS($event)">
                    <label>Random</label>
                    <select id="emblemShapeSelector">
                        <optgroup label="Basic">
                            <option value="heater">Heater</option>
                            <option value="spanish">Spanish</option>
                            <option value="french">French</option>
                        </optgroup>
                        <optgroup label="Regional">
                            <option value="horsehead">Horsehead</option>
                            <option value="horsehead2">Horsehead Edgy</option>
                            <option value="polish">Polish</option>
                            <option value="hessen">Hessen</option>
                            <option value="swiss">Swiss</option>
                        </optgroup>
                        <optgroup label="Historical">
                            <option value="boeotian">Boeotian</option>
                            <option value="roman">Roman</option>
                            <option value="kite">Kite</option>
                            <option value="oldFrench">Old French</option>
                            <option value="renaissance">Renaissance</option>
                            <option value="baroque">Baroque</option>
                        </optgroup>
                        <optgroup label="Specific">
                            <option value="targe">Targe</option>
                            <option value="targe2">Targe2</option>
                            <option value="pavise">Pavise</option>
                            <option value="wedged">Wedged</option>
                        </optgroup>
                        <optgroup label="Banner">
                            <option value="flag">Flag</option>
                            <option value="pennon">Pennon</option>
                            <option value="guidon">Guidon</option>
                            <option value="banner">Banner</option>
                            <option value="dovetail">Dovetail</option>
                            <option value="gonfalon">Gonfalon</option>
                            <option value="pennant">Pennant</option>
                        </optgroup>
                        <optgroup label="Simple">
                            <option value="round">Round</option>
                            <option value="oval">Oval</option>
                            <option value="vesicaPiscis">Vesica Piscis</option>
                            <option value="square">Square</option>
                            <option value="diamond">Diamond</option>
                        </optgroup>
                        <optgroup label="Fantasy">
                            <option value="fantasy1">Fantasy1</option>
                            <option value="fantasy2">Fantasy2</option>
                            <option value="fantasy3">Fantasy3</option>
                            <option value="fantasy4">Fantasy4</option>
                            <option value="fantasy5">Fantasy5</option>
                        </optgroup>
                        <optgroup label="Middle Earth">
                            <option value="noldor">Noldor</option>
                            <option value="gondor">Gondor</option>
                            <option value="easterling">Easterling</option>
                            <option value="erebor">Erebor</option>
                            <option value="ironHills">Iron Hills</option>
                            <option value="urukHai">UrukHai</option>
                            <option value="moriaOrc">Moria Orc</option>
                        </optgroup>
                    </select>
                </div>

                <div class="d-none"
                    data-tip="Set size of particular Emblem. To hide set to 0. To change the entire category go to Menu ⭢ Style ⭢ Emblems">
                    <div class="label" style="width: 2.8em">Size:</div>
                    <input id="emblemSizeSlider" type="range" min=0 max=5 step=.1 style="width: 8em" />
                    <input id="emblemSizeNumber" type="number" min=0 max=5 step=.1 />
                </div>
            </div>
            <button id="emblemsRegenerate" data-tip="Regenerate emblem" class="icon-shuffle"></button>
            <div id="emblemsBottom" class="d-none">
                <button id="emblemsArmoria"
                    data-tip="Edit the emblem in Armoria - dedicated heraldry editor. Download emblem and upload it back map the generator"
                    class="icon-brush"></button>
                <button id="emblemsDownload" data-tip="Set size, select file format and download emblem image"
                    class="icon-download"></button>
                <button id="emblemsUpload"
                    data-tip="Upload png, jpg or svg image from Armoria or other sources as emblem"
                    class="icon-upload"></button>
                <button id="emblemsGallery"
                    data-tip="Download emblems gallery as html document (open in browser; downloading takes some time)"
                    class="icon-layer-group"></button>
                <button id="emblemsFocus" data-tip="Show emblem associated area or place"
                    class="icon-target"></button>
            </div>
            <div id="emblemUploadControl" class="hidden">
                <button id="emblemsUploadImage"
                    data-tip="Upload SVG or PNG image from any source. Make sure background is transparent">Any
                    image</button>
                <button id="emblemsUploadSVG" data-tip="Upload prepared SVG image, e.g. SVG from Armoria">Prepared
                    SVG</button>
                <a href="https://www.iloveimg.com/compress-image" target="_blank"
                    data-tip="Use external tool to compress/resize raster images before upload">Comperess raster</a>
                <span> | </span>
                <a href="https://jakearchibald.github.io/svgomg" target="_blank"
                    data-tip="Use external tool to optimize vector images before upload">Optimize vector</a>
            </div>
            <div id="emblemDownloadControl" class="hidden">
                <input id="emblemsDownloadSize" data-tip="Set image size in pixels" type="number" value="500" step="100"
                    min="100" max="10000" />
                <button id="emblemsDownloadSVG"
                    data-tip="Download as SVG: scalable vector image. Best quality, can be opened in browser or Inkscape">SVG</button>
                <button id="emblemsDownloadPNG"
                    data-tip="Download as PNG: lossless raster image with transparent background">PNG</button>
                <button id="emblemsDownloadJPG"
                    data-tip="Download as JPG: lossy compressed raster image with solid white background">JPG</button>
            </div>
        </div>

        <div id="unitsEditor" class="dialog stable" style="display: none">

            <div id="unitsBottom">
                <button id="addLinearRuler" data-tip="Click to place a linear measurer (ruler)"
                    class="icon-ruler"></button>
                <button id="addOpisometer" data-tip="Drag to measure a curve length (opisometer)"
                    class="icon-drafting-compass"></button>
                <button id="addRouteOpisometer"
                    data-tip="Drag to measure a curve length that sticks to routes (route opisometer)">
                    <svg width="0.88em" height="0.88em">
                        <use xlink:href="#icon-route" />
                    </svg>
                </button>
                <button id="addPlanimeter" data-tip="Drag to measure a polygon area (planimeter)"
                    class="icon-draw-polygon"></button>
                <button id="removeRulers"
                    data-tip="Remove all rulers from the map. Click on ruler label to remove a ruler separately"
                    class="icon-trash"></button>
                <button id="unitsRestore" data-tip="Restore default units settings" class="icon-ccw"></button>
            </div>
        </div>

        <div id="burgsOverview" class="dialog stable" style="display: none">
            <div id="burgsHeader" class="header">
                <div style="left:1.8em" data-tip="Click to sort by burg name"
                    class="sortable alphabetically icon-sort-name-up" data-sortby="name">Burg&nbsp;</div>
                <div style="left:7.6em" data-tip="Click to sort by province name" class="sortable alphabetically"
                    data-sortby="province">Province&nbsp;</div>
                <div style="left:14em" data-tip="Click to sort by state name" class="sortable alphabetically"
                    data-sortby="state">State&nbsp;</div>
                <div style="left:20.1em" data-tip="Click to sort by culture name" class="sortable alphabetically"
                    data-sortby="culture">Culture&nbsp;</div>
                <div style="left:24.7em" data-tip="Click to sort by burg population" class="sortable"
                    data-sortby="population">Population&nbsp;</div>
                <div style="left:31.2em" data-tip="Click to sort by burg type" class="sortable alphabetically"
                    data-sortby="type">Type&nbsp;</div>
            </div>

            <div id="burgsBody" class="table"></div>

            <div id="burgsFilters" data-tip="Apply a filter">
                <span>State: </span>
                <select id="burgsFilterState" style="width:28%"></select>
                <span>Culture:</span>
                <select id="burgsFilterCulture" style="width:28%"></select>
            </div>

            <div id="burgsFooter" class="totalLine">
                <div data-tip="Burgs displayed" style="margin-left: 4px">Burgs:&nbsp;<span
                        id="burgsFooterBurgs">0</span></div>
                <div data-tip="Average population" style="margin-left: 14px">Average population:&nbsp;<span
                        id="burgsFooterPopulation">0</span></div>
            </div>

            <div id="burgsBottom">
                <button id="burgsOverviewRefresh" data-tip="Refresh the Editor" class="icon-cw"></button>
                <button id="burgsChart" data-tip="Show burgs bubble chart" class="icon-chart-area"></button>
                <button id="regenerateBurgNames" data-tip="Regenerate burg names based on assigned culture"
                    class="icon-retweet"></button>
                <button id="addNewBurg" data-tip="Add a new burg. Hold Shift to add multiple"
                    class="icon-plus"></button>
                <button id="burgsExport" data-tip="Save burgs-related data as a text file (.csv)"
                    class="icon-download"></button>
                <button id="burgNamesImport" data-tip="Rename burgs in bulk" class="icon-upload"></button>
                <button id="burgsRemoveAll"
                    data-tip="Remove all unlocked burgs except for capitals. To remove a capital remove its state first"
                    class="icon-trash"></button>
            </div>
        </div>

        <div id="riversOverview" class="dialog stable" style="display: none">
            <div id="riversHeader" class="header">
                <div style="left:1.3em" data-tip="Click to sort by river name" class="sortable alphabetically"
                    data-sortby="name">River&nbsp;</div>
                <div style="left:8.6em" data-tip="Click to sort by river type name" class="sortable alphabetically"
                    data-sortby="type">Type&nbsp;</div>
                <div style="left:13em" data-tip="Click to sort by discharge (flux in m3/s)"
                    class="sortable icon-sort-number-down" data-sortby="discharge">Discharge&nbsp;</div>
                <div style="left:19.3em" data-tip="Click to sort by river length" class="sortable"
                    data-sortby="length">Length&nbsp;</div>
                <div style="left:24.4em" data-tip="Click to sort by river mouth width" class="sortable"
                    data-sortby="width">Width&nbsp;</div>
                <div style="left:30em" data-tip="Click to sort by river basin" class="sortable alphabetically"
                    data-sortby="basin">Basin&nbsp;</div>
            </div>

            <div id="riversBody" class="table"></div>

            <div id="riversFooter" class="totalLine">
                <div data-tip="Rivers number" style="margin-left: 4px">Rivers:&nbsp;<span
                        id="riversFooterNumber">0</span></div>
                <div data-tip="Average discharge" style="margin-left: 12px">Average discharge:&nbsp;<span
                        id="riversFooterDischarge">0</span></div>
                <div data-tip="Average length" style="margin-left: 12px">Length:&nbsp;<span
                        id="riversFooterLength">0</span></div>
                <div data-tip="Average mouth width" style="margin-left: 12px">Width:&nbsp;<span
                        id="riversFooterWidth">0</span></div>
            </div>

            <div id="riversBottom">
                <button id="riversOverviewRefresh" data-tip="Refresh the Editor" class="icon-cw"></button>
                <button id="addNewRiver"
                    data-tip="Automatically add river starting from clicked cell. Hold Shift to add multiple"
                    class="icon-plus"></button>
                <button id="riverCreateNew" data-tip="Create new river selecting river cells"
                    class="icon-map-pin"></button>
                <button id="riversBasinHighlight" data-tip="Toggle basin highlight mode"
                    class="icon-sitemap"></button>
                <button id="riversExport" data-tip="Save rivers-related data as a text file (.csv)"
                    class="icon-download"></button>
                <button id="riversRemoveAll" data-tip="Remove all rivers" class="icon-trash"></button>
            </div>
        </div>

        <div id="militaryOverview" class="dialog stable" style="display: none">
            <div class="overflow">
                <div id="militaryHeader" class="header">
                    <div data-tip="State name. Click to sort" style="margin-left: 1.8em; width: 5.6em"
                        class="sortable alphabetically" data-sortby="state">State&nbsp;</div>
                    <div data-tip="Total military personnel (considering crew). Click to sort" id="militaryTotal"
                        class="sortable icon-sort-number-down" data-sortby="total">Total&nbsp;</div>
                    <div data-tip="State population. Click to sort" style="width: 6.5em; margin-left: -1em"
                        class="sortable" data-sortby="population">Population&nbsp;</div>
                    <div data-tip="Military personnel rate (% of state population). Depends on war alert. Click to sort"
                        style="width: 3.7em" class="sortable" data-sortby="rate">Rate&nbsp;</div>
                    <div data-tip="War Alert. Modifier to military forces number, depends of political situation. Click to sort"
                        class="sortable" data-sortby="alert">War Alert&nbsp;</div>
                </div>

                <div id="militaryBody" data-type="absolute"></div>
            </div>

            <div id="militaryFooter" class="totalLine">
                <div data-tip="States number" style="margin-left: 4px">States:&nbsp;<span
                        id="militaryFooterStates">0</span></div>
                <div data-tip="Total military forces" style="margin-left: 14px">Total forces:&nbsp;<span
                        id="militaryFooterForcesTotal">0</span></div>
                <div data-tip="Average military forces per state" style="margin-left: 14px">Average forces:&nbsp;<span
                        id="militaryFooterForces">0</span></div>
                <div data-tip="Average forces rate per state" style="margin-left: 14px">Average rate:&nbsp;<span
                        id="militaryFooterRate">0%</span></div>
                <div data-tip="Average War Alert" style="margin-left: 14px">Average alert:&nbsp;<span
                        id="militaryFooterAlert">0</span></div>
            </div>

            <div id="militaryBottom">
                <button id="militaryOverviewRefresh" data-tip="Refresh the overview screen"
                    class="icon-cw"></button>
                <button id="militaryOptionsButton" data-tip="Edit Military units" class="icon-cog"></button>
                <button id="militaryRegimentsList" data-tip="Show regiments list" class="icon-list-bullet"></button>
                <button id="militaryPercentage" data-tip="Toggle percentage / absolute values views"
                    class="icon-percent"></button>
                <button id="militaryOverviewRecalculate" data-tip="Recalculate military forces based on current options"
                    class="icon-retweet"></button>
                <button id="militaryExport" data-tip="Save military-related data as a text file (.csv)"
                    class="icon-download"></button>
                <button id="militaryWiki" data-tip="Open Military Forces Tutorial" class="icon-info"></button>
            </div>
        </div>

        <div id="regimentsOverview" class="dialog stable" style="display: none">
            <div class="overflow">
                <div id="regimentsHeader" class="header">
                    <div data-tip="State name. Click to sort" style="left:1.8em; width: 9em"
                        class="sortable alphabetically" data-sortby="state">State&nbsp;</div>
                    <div data-tip="Regiment emblem and name. Click to sort by name" style="width: 12em"
                        class="sortable alphabetically" data-sortby="name">Name&nbsp;</div>
                    <div data-tip="Total military personnel (not considering crew). Click to sort"
                        style="margin-left: .8em" id="regimentsTotal" class="sortable icon-sort-number-down"
                        data-sortby="total">Total&nbsp;</div>
                </div>

                <div id="regimentsBody" data-type="absolute"></div>
            </div>

            <div id="regimentsBottom">
                <button id="regimentsOverviewRefresh" data-tip="Refresh the overview screen"
                    class="icon-cw"></button>
                <button id="regimentsPercentage" data-tip="Toggle percentage / absolute values views"
                    class="icon-percent"></button>
                <button id="regimentsAddNew" data-tip="Add new Regiment" class="icon-user-plus"></button>
                <div data-tip="Select state" style="display:inline-block"><span>State: </span><select
                        id="regimentsFilter"></select></div>
                <button id="regimentsExport" data-tip="Save military-related data as a text file (.csv)"
                    class="icon-download"></button>
            </div>
        </div>

        <div id="militaryOptions" class="dialog stable" style="display: none">
            <div class="table">
                <table id="militaryOptionsTable">
                    <thead>
                        <tr>
                            <th data-tip="Unit icon">Icon</th>
                            <th data-tip="Unit name. If name is changed for existing unit, old unit will be replaced">
                                Unit name</th>
                            <th data-tip="Conscription percentage for rural population">Rural</th>
                            <th data-tip="Conscription percentage for urban population">Urban</th>
                            <th data-tip="Average number of people in crew (used for total personnel calculation)">Crew
                            </th>
                            <th data-tip="Unit military power (used for battle simulation)">Power</th>
                            <th data-tip="Unit type to apply special rules on forces recalculation">Type</th>
                            <th
                                data-tip="Check if unit is separate and can be stacked only with units of the same type">
                                Sep.</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>

        <div id="styleSaver" class="dialog stable textual" style="display: none">
            <div id="styleSaverHeader" style="padding:2px 0">
                <span>Preset name:</span>
                <input id="styleSaverName" data-tip="Enter style preset name" placeholder="Preset name"
                    style="width:12em" required>
                <span id="styleSaverTip" data-tip="Shows whether there is already a preset with this name"
                    class="italic"></span>
            </div>

            <div id="styleSaverBody" style="padding:2px 0">
                <span>Style JSON:</span>
                <textarea id="styleSaverJSON" rows="18"
                    data-tip="Style JSON is getting formed based the current settings, but can be entered manually"
                    placeholder="Paste any valid style data in JSON format" autocorrect="off"
                    spellcheck="false"></textarea>
            </div>

            <div id="styleSaverBottom">
                <button id="styleSaverSave" data-tip="Save current JSON as a new style preset"
                    class="icon-check"></button>
                <button id="styleSaverDownload"
                    data-tip="Download the style as a .json file (can be opened in any text editor)"
                    class="icon-download"></button>
                <button id="styleSaverLoad" data-tip="Open previously downloaded style file"
                    class="icon-upload"></button>
                <button id="styleSaverCA" data-tip="Find or share custom style preset on Cartography Assets portal"
                    class="icon-drafting-compass"
                    onclick="openURL('https://cartographyassets.com/asset-category/specific-assets/azgaars-generator/styles/')"></button>
            </div>
        </div>

        <div id="addFontDialog" style="display: none" class="dialog">
            <span>There are 3 ways to add a custom font:</span>
            <p><strong>Google font</strong>. Open <a href="https://fonts.google.com/" target="_blank">Google Fonts</a>,
                find a font you like and enter its name to the field below.</p>
            <p><strong>Local font</strong>. If you have a font <a
                    href="https://faqs.skillcrush.com/article/275-downloading-installing-a-font-on-your-computer"
                    target="_blank">installed on your computer</a>, just provide the font name. Make sure the browser is
                reloaded after the installation. The font won't work on machines not having it installed. Good source of
                fonts are <a href="https://fontesk.com" target="_blank">Fontdesk</a> and <a
                    href="https://www.dafont.com" target="_blank">DaFont</a>.</p>
            <p><strong>Font URL</strong>. Provide font name and link to the font file hosted online. The best free font
                hostings are <a href="https://fonts.google.com/" target="_blank">Google Fonts</a> and <a target="_blank"
                    href="https://www.cdnfonts.com">CDN Fonts</a>. To get font file open the link to css provided by
                these services and manually copy the link to <code>woff2</code>.</p>
            <div style="margin-top: .3em" data-tip="Select font adding method">
                <select id="addFontMethod">
                    <option value="googleFont" selected>Google font</option>
                    <option value="localFont">Local font</option>
                    <option value="fontURL" selected>Font URL</option>
                </select>
                <input id="addFontNameInput" placeholder="font family" style="width:15em">
                <input id="addFontURLInput" placeholder="font file URL" style="width:22.6em; margin-top:.1em">
            </div>
        </div>

        <div id="cellInfo" style="display: none" class="dialog stable">
            <p><b>Cell:</b> <span id="infoCell"></span> <b>X:</b> <span id="infoX"></span> <b>Y:</b> <span
                    id="infoY"></span></p>
            <p><b>Latitude:</b> <span id="infoLat"></span></p>
            <p><b>Longitude:</b> <span id="infoLon"></span></p>
            <p><b>Area:</b> <span id="infoArea">0</span></p>
            <p><b>Type:</b> <span id="infoFeature">n/a</span></p>
            <p><b>Precipitation:</b> <span id="infoPrec">0</span></p>
            <p><b>River:</b> <span id="infoRiver">no</span></p>
            <p><b>Population:</b> <span id="infoPopulation">0</span></p>
            <p><b>Elevation:</b> <span id="infoEvelation">0</span></p>
            <p><b>Depth:</b> <span id="infoDepth">0</span></p>
            <p><b>Temperature:</b> <span id="infoTemp">0</span></p>
            <p><b>Biome:</b> <span id="infoBiome">n/a</span></p>
            <p><b>State:</b> <span id="infoState">n/a</span></p>
            <p><b>Province:</b> <span id="infoProvince">n/a</span></p>
            <p><b>Culture:</b> <span id="infoCulture">n/a</span></p>
            <p><b>Religion:</b> <span id="infoReligion">n/a</span></p>
            <p><b>Burg:</b> <span id="infoBurg">n/a</span></p>
        </div>

        <div id="iconSelector" style="display: none" class="dialog">
            <table id="iconTable" class="table pointer" style="font-size: 2em; text-align: center"></table>
            <div style="font-style: italic; font-size: 1.2em; margin: .4em 0 0 .4em">
                <span>Select from the list or paste a Unicode character here: </span>
                <input id="iconInput" style="width: 2em">
                <span>. See <a href="https://emojipedia.org" target="_blank">Emojipedia</a> for reference</span>
            </div>
        </div>

        <div id="options3d" class="dialog stable" style="display: none">

            <div id="options3dMesh" style="display: none">
                <div data-tip="Set map rotation speed. Set to 0 is you want to toggle off the rotation">
                    <div>Rotation:</div>
                    <input id="options3dMeshRotationRange" type="range" min=0 max=10 step=.1>
                    <input id="options3dMeshRotationNumber" type="number" min=0 max=10 step=.1 style="width:3em">
                </div>

                <div data-tip="Set height scale">
                    <div>Height scale:</div>
                    <input id="options3dScaleRange" type="range" min=0 max=100>
                    <input id="options3dScaleNumber" type="number" min=0 max=1000 style="width:3em">
                </div>

                <div data-tip="Set scene lightness">
                    <div>Lightness:</div>
                    <input id="options3dLightnessRange" type="range" min=0 max=100>
                    <input id="options3dLightnessNumber" type="number" min=0 max=500 style="width:3em">
                </div>

                <div data-tip="Set sun position (x, y, z) to define shadows">
                    <div>Sun position:</div>
                    <input id="options3dSunX" type="number" min=-2500 max=2500 step=100 style="width:4.7em">
                    <input id="options3dSunY" type="number" min=0 max=5000 step=100 style="width:4.7em">
                    <input id="options3dSunZ" type="number" min=-1500 max=1500 step=100 style="width:4.7em">
                </div>

                <div data-tip="Toggle 3d labels" style="margin: .6em 0 .3em -.2em">
                    <input id="options3dMeshLabels3d" class="checkbox" type="checkbox">
                    <label for="options3dMeshLabels3d" class="checkbox-label"><i>Show 3D labels</i></label>
                </div>

                <div data-tip="Toggle sky mode" style="margin: .6em 0 .3em -.2em">
                    <input id="options3dMeshSkyMode" class="checkbox" type="checkbox">
                    <label for="options3dMeshSkyMode" class="checkbox-label"><i>Show sky and extend water</i></label>
                </div>

                <div data-tip="Set sky and water color" id="options3dColorSection" style="display: none">
                    <span>Sky:</span><input id="options3dMeshSky" type="color"
                        style="width: 4.4em; height: 1em; border: 0; padding: 0; margin: 0 .2em">
                    <span>Water:</span><input id="options3dMeshWater" type="color"
                        style="width: 4.4em; height: 1em; border: 0; padding: 0; margin: 0 .2em">
                </div>
            </div>

            <div id="options3dGlobe" style="display: none">
                <div data-tip="Set globe rotation speed. Set to 0 is you want to toggle off the rotation">
                    <div>Rotation:</div>
                    <input id="options3dGlobeRotationRange" type="range" min=0 max=10 step=.1>
                    <input id="options3dGlobeRotationNumber" type="number" min=0 max=10 step=.1 style="width:3em">
                </div>

                <div data-tip="Set globe texture resolution">
                    <div>Texture resolution:</div>
                    <select id="options3dGlobeResolution" style="width: 5em">
                        <option value="0.5">0.5x</option>
                        <option value="1">1x</option>
                        <option value="2">2x</option>
                        <option value="4">4x</option>
                    </select>
                </div>

                <div data-tip="Equirectangular projection is used: distortion is maximum on poles. Use map with aspect ratio 2:1 for best result"
                    style="font-style: italic; margin: .2em 0">Equirectangular projection is used</div>
            </div>

            <div id="options3dBottom" style="margin-top: .2em">
                <button id="options3dUpdate" data-tip="Update the scene" class="icon-cw"></button>
                <button data-tip="Configure region map size and climate settings" onclick="editWorld()"
                    class="icon-globe"></button>
                <button id="options3dSave" data-tip="Save screenshot of the 3d scene"
                    class="icon-button-screenshot"></button>
                <button id="options3dOBJSave" data-tip="Save OBJ file of the 3d scene" class="icon-download"></button>
            </div>
        </div>

        <div id="preview3d" class="dialog stable" style="display: none; padding: 0px"></div>

        <div id="exportMapData" style="display: none" class="dialog">
            <div style="margin-bottom: .3em; font-weight: bold">Download image</div>
            <div>
                <button onclick="saveSVG()"
                    data-tip="Download the map as vector image (open directly in browser or Inkscape)">.svg</button>
                <button onclick="savePNG()"
                    data-tip="Download visible part of the map as .png (lossless compressed)">.png</button>
                <button onclick="saveJPEG()"
                    data-tip="Download visible part of the map as .jpeg (lossy compressed) image">.jpeg</button>
                <button onclick="openSaveTiles()"
                    data-tip="Split map into smaller png tiles and download as zip archive">tiles</button>
                <span data-tip="Check to not allow system to automatically hide labels">
                    <input id="showLabels" class="checkbox" type="checkbox"
                        onchange="hideLabels.checked = !this.checked; invokeActiveZooming()" checked="">
                    <label for="showLabels" class="checkbox-label">Show all labels</label>
                </span>
            </div>

            <div data-tip="Define scale of a saved png/jpeg image (e.g. 5x). Saving big images is slow and may cause a browser crash!"
                style="margin-bottom: .3em">
                PNG / JPEG scale:
                <input id="pngResolutionInput" data-stored="pngResolution" type="range" min=1 max=8 value=1
                    style="width: 10em">
                <input id="pngResolutionOutput" data-stored="pngResolution" type="number" min=1 max=8 value=1>
            </div>

            <div style="margin: 1em 0 .3em; font-weight: bold">Export to GeoJSON</div>
            <div>
                <button onclick="saveGeoJSON_Cells()" data-tip="Download cells data in GeoJSON format">cells</button>
                <button onclick="saveGeoJSON_Routes()" data-tip="Download routes data in GeoJSON format">routes</button>
                <button onclick="saveGeoJSON_Rivers()" data-tip="Download rivers data in GeoJSON format">rivers</button>
                <button onclick="saveGeoJSON_Markers()"
                    data-tip="Download markers data in GeoJSON format">markers</button>
            </div>
            <p>GeoJSON format is used in GIS tools such as QGIS. Check out <a
                    href="https://github.com/Azgaar/Fantasy-Map-Generator/wiki/GIS-data-export"
                    target="_blank">wiki-page</a> for guidance.</p>
            <p>Generator uses pop-up window to download files. Please ensure your browser does not block popups.</p>
            <p>It's also possible to export map to <i>Foundry VTT</i>, see <a
                    href="https://github.com/Ethck/azgaar-foundry" target="_blank">the module.</a></p>
        </div>

        <div id="saveMapData" style="display: none" class="dialog">
            <div style="margin-top: .3em">
                <strong>Save map to</strong>
                <button onclick="dowloadMap()"
                    data-tip="Download .map file to your local disk. Shortcut: Ctrl + S">machine</button>
                <button onclick="saveToDropbox()"
                    data-tip="Save .map file to your Dropbox. Shortcut: Ctrl + C">dropbox</button>
                <button onclick="quickSave()"
                    data-tip="Save the project to browser storage. It can be unreliable. Shortcut: F6">browser</button>
            </div>
            <p>Maps are saved in <i>.map</i> format, that can be loaded back via the <i>Load</i> in menu. There is no
                way to restore the progress if file is lost. Please keep old <i>.map</i> files on your machine or cloud
                storage as backups.</p>
        </div>

        <div id="loadMapData" style="display: none" class="dialog">
            <div>
                <strong>Load map from</strong>
                <button onclick="mapToLoad.click()" data-tip="Load .map file from local disk">local disk</button>
                <button onclick="loadURL()" data-tip="Load .map file from URL (server should allow CORS)">URL</button>
                <button onclick="quickLoad()"
                    data-tip="Load map from browser storage (if saved before)">storage</button>
            </div>
            <div id="loadFromDropbox">
                <p style="margin-bottom: .3em">From your Dropbox account</p>
                <select id="loadFromDropboxSelect" style="width: 22em"></select>

                <div id="loadFromDropboxButtons" style="margin-bottom: .3em">
                    <button onclick="loadFromDropbox()" data-tip="Load .map file from your Dropbox">Open</button>
                    <button onclick="createSharableDropboxLink()"
                        data-tip="Select file and create a link to share with your friends">Create link</button>
                </div>

                <div style="margin-top: .3em">
                    <div id="sharableLinkContainer" style="display: none">
                        <a id="sharableLink" target="_blank"></a>
                        <i data-tip="Copy link to the clipboard" onclick="copyLinkToClickboard()"
                            class="icon-clone pointer"></i>
                    </div>
                </div>
            </div>
        </div>

        <div id="saveTilesScreen" style="display: none" class="dialog">
            <p>Map will be split into tiles and downloaded as a single zip file. Avoid saving to big images</p>
            <div data-tip="Number of columns" style="margin-bottom: .3em">
                <div class="label">Columns:</div>
                <input id="tileColsInput" data-stored="tileCols" type="range" min=2 max=20 value=8 style="width: 11em">
                <input id="tileColsOutput" data-stored="tileCols" type="number" min=2 value=8>
            </div>
            <div data-tip="Number of rows" style="margin-bottom: .3em">
                <div class="label">Rows:</div>
                <input id="tileRowsInput" data-stored="tileRows" type="range" min=2 max=20 value=8 style="width: 11em">
                <input id="tileRowsOutput" data-stored="tileRows" type="number" min=2 value=8>
            </div>
            <div data-tip="Image scale relative to image size (e.g. 5x)" style="margin-bottom: .3em">
                <div class="label">Scale:</div>
                <input id="tileScaleInput" data-stored="tileScale" type="range" min=1 max=4 value=1 style="width: 11em">
                <input id="tileScaleOutput" data-stored="tileScale" type="number" min=1 value=1>
            </div>
            <div data-tip="Calculated size of image if combined" style="margin-bottom: .3em">
                <div class="label">Total size:</div>
                <div id="tileSize" style="display: inline-block">1000 x 1000 px</div>
            </div>
            <div id="tileStatus" style="background-color: #33333310; font-style: italic"></div>
        </div>

        <div id="alert" style="display: none" class="dialog">
            <p id="alertMessage">Warning!</p>
        </div>

        <div id="prompt" style="display: none" class="dialog">
            <form id="promptForm">
                <div id="promptText"></div>
                <input id="promptInput" type="number" step=.01 placeholder="type value" autocomplete="off" required>
                <button type="submit">Confirm</button>
                <button type="button" id="promptCancel" formnovalidate>Cancel</button>
            </form>
        </div>

    </div>

    <div id="notes">
        <div id="notesHeader"></div>
        <div id="notesBody"></div>
    </div>

    <div id="tooltip" style="opacity:0" data-main=""></div>

    <div id="mapOverlay" style="display: none">Drop a .map file to open</div>

    <div id="fileInputs" style="display: none">
        <input type="file" accept=".map" id="mapToLoad">
        <input type="file" accept=".txt,.csv" id="burgsListToLoad">
        <input type="file" accept=".txt" id="legendsToLoad">
        <input type="file" accept="image" id="imageToLoad">
        <input type="file" accept="image" id="emblemImageToLoad">
        <input type="file" accept=".svg" id="emblemSVGToLoad">
        <input type="file" accept=".txt" id="templateToLoad">
        <input type="file" accept=".txt" id="namesbaseToLoad">
        <input type="file" accept=".json" id="styleToLoad">
    </div>

    <!-- svg elements not required for map display -->
    <svg id="defElements" width="0" height="0" style="position: absolute">
        <defs>
            <marker id="end-arrow" viewBox="0 -5 10 10" refX="6" markerWidth="7" markerHeight="7" orient="auto">
                <path d="M0,-5L10,0L0,5" fill="#000" />
            </marker>
            <marker id="end-arrow-small" viewBox="0 -5 10 10" refX="6" markerWidth="2" markerHeight="2" orient="auto">
                <path d="M0,-5L10,0L0,5" fill="#555" />
            </marker>
            <symbol id="icon-dragon" x="0px" y="0px" width="260px" height="174px" viewBox="0 0 260 174">
                <path d="M252.59,84.22c-22.12,3.78-38.96,23.03-38.96,46.23c0,2.63,0.23,5.21,0.65,7.73c-1.7-0.12-3.42-0.19-5.15-0.19
 c-25.16,0-42.24,13.63-49.13,34.01h-60c-6.64-20.38-23.97-34.01-49.13-34.01c-1.73,0-3.45,0.07-5.15,0.19
 c0.42-2.52,0.65-5.1,0.65-7.73c0-23.2-16.84-42.45-38.96-46.23c11.11-9.31,18.18-23.28,18.18-38.91c0-18.03-9.41-33.87-23.59-42.85
 C5.24,2.15,8.53,2,11.85,2C42.9,2,70.8,15.46,90.03,36.88C83.73,46.99,80,59.56,80,73.18c0,20.74,8.188,39.615,21.83,49.92
 c4.51,3.407,9.144,2.374,11.898-0.304c2.828-2.75,2.825-7.778-0.338-11.076c-9.915-10.34-14.48-15.96-14.16-30.52
 c0.11-5.28,2.14-10.29,5.05-14.55c-1.57-0.17-3.21-0.77-4.71-2.18c-4.75-4.48-3.92-11.86-3.87-12.23c4.32,5.28,11.4,7.23,17.7,5.17
 c0.15-0.11,0.3-0.21,0.45-0.32c-9.93-7.24-7.53-18.66-7.44-19.07c3.48,8.62,11.88,14.03,20.89,13.97
 c9.81-1.18,17.33,2.83,17.33,2.83s2.12-4.22,2.12-10.55c0,0,5.25,5.09,9.08,13.76c2.64,5.97,3.05,11.89,6.44,15.88l4.89,4.69
 c1.27,1.21,1.29,3.24,0.03,4.47l-6.09,6.02l0.61-5.18L149.5,77.8c1.35,3.36,5.1,11.59,5.1,11.59l3.78,1.63l-4.74,1.77
 c-1.74,0.64-3.69,0.14-4.9-1.26c-2.83-3.3-11.76-13.79-12.23-14.36c-3.13-3.83-10.09-4.53-13.21,1.61c-2.2,4.34,0.67,8.25,1.87,9.63
 c5.84,6.72,26.51,15.42,37.9,30.18c10.44-11.07,17.03-27.31,17.03-45.41c0-13.66-3.75-26.25-10.07-36.37
 C189.26,15.44,217.13,2,248.15,2c3.32,0,6.61,0.15,9.85,0.46c-14.18,8.98-23.59,24.82-23.59,42.85
 C234.41,60.94,241.48,74.91,252.59,84.22z" />
            </symbol>
            <symbol width="512px" height="512px" viewBox="0 0 512 512" id="icon-undead">
                <path fill="#000"
                    d="M244 439.765l-22.63 3 8.5-148.15a68.48 68.48 0 0 0 22.33 6.7l-7.94 138.45zm28.5 7l4.37 1.32 18.3.65v-153.58a70.07 70.07 0 0 1-22.68 6.29v145.35zm-255.26 45.6h473.52l-56.07-32.23-37.84-9.11-46.68-19.3-36.71 34.72-39.41-1.4-27.86-8.41-41.34 5.41-25-15.92-10.78-18.22L85 447.515l-55.34 20.32zm148.05-334.53c-3.757-4.877-10.72-5.866-15.686-2.227-4.966 3.638-6.122 10.575-2.604 15.627l12 16.45 16.21-16.32zm35.71 48.72l-15.6-21.29-16.17 16.3 15.19 20.8 15.37-14.81a8.55 8.55 0 0 1 1.21-1zm25.67 35L211 220.285l-16.44 15.88 16.67 22.76c2.46-6.81 7.9-12.78 15.42-17.32zm-24.9-146.42c-2.193-5.775-8.606-8.733-14.422-6.651-5.817 2.081-8.897 8.436-6.928 14.291l14.23 39.78 20.64-9.62zm16.83 114.35l10.91 30.48a67.76 67.76 0 0 1 21.67-6.74l-11.43-31.86zm2.4-60.42l-20.64 9.62 12.46 34.83 21.18-8.15zm30 32.69l22.62-1.87-1.72-38.52-22.64 1.26zm.75 17l1.51 34.25a83.52 83.52 0 0 1 22.72.42l-1.61-36.54zm17.36-120.58c-.433-6.13-5.672-10.8-11.812-10.53-6.14.272-10.947 5.385-10.838 11.53l2.05 46.5 22.64-1.31zm82.54 20.19c1.945-5.83-1.109-12.149-6.886-14.247-5.777-2.098-12.174.788-14.424 6.507L318 124.575l21.15 8.2zm-18.29 50.4l-21.15-8.2-15.62 43 21.41 7.45zm-55 85.06a63.82 63.82 0 0 1 21.28 7.84l12.59-34.67-21.42-7.45zm106.42-21c5.037-3.722 6.102-10.823 2.38-15.86-3.722-5.037-10.823-6.102-15.86-2.38l-27.18 20.08 14.41 17.55zm-68.65 50.72l28.7-21.21-14.41-17.55-26.69 19.72c6.79 5.16 11.27 11.71 12.38 19.01zm-53 21.46c20.78 0 36.31-9.38 36.31-17.76s-15.53-17.76-36.31-17.76-36.31 9.38-36.31 17.76 15.47 17.72 36.26 17.72z" />
            </symbol>

            <symbol id="icon-hag" x="0px" y="0px" viewBox="0 0 511.999 511.999">
                <path style="fill:#F7B239;" d="M145.552,152.522h-42.3L40.819,90.089c-2.919-2.919-4.378-6.747-4.378-10.575
 c0-3.828,1.459-7.656,4.378-10.575c5.838-5.838,15.312-5.838,21.15,0L145.552,152.522z" />
                <g>
                    <path style="fill:#808080;" d="M428.911,417.769l24.487,85.258h-32.299l-34.739-44.74
  C402.437,446.922,416.781,433.249,428.911,417.769z" />
                    <path style="fill:#808080;" d="M153.567,458.287l-34.739,44.74H86.529l24.487-85.258
  C123.146,433.249,137.489,446.922,153.567,458.287z" />
                </g>
                <path style="fill:#9AD14B;" d="M297.477,205.158v61.009c0,11.891-9.642,21.533-21.533,21.533c-5.945,0-11.329-2.404-15.228-6.304
 s-6.304-9.283-6.304-15.228v-37.084c0-11.891-9.642-21.533-21.533-21.533c-5.945,0-11.329,2.404-15.228,6.304
 c-3.9,3.9-6.304,9.283-6.304,15.228v5.981c0,11.891-9.642,21.533-21.533,21.533c-5.945,0-11.329-2.404-15.228-6.304
 c-3.9-3.9-6.304-9.283-6.304-15.228v-29.907v-52.636h129.196V205.158z" />
                <path style="fill:#B3B3B3;" d="M168.281,152.522v52.636H90.668c-0.754,0-1.507-0.036-2.249-0.096
 c-6.376-0.538-12.106-3.35-16.365-7.608c-4.761-4.761-7.704-11.341-7.704-18.614c0-14.535,11.783-26.318,26.318-26.318h12.585h42.3
 C145.552,152.522,168.281,152.522,168.281,152.522z" />
                <path style="fill:#999999;"
                    d="M106.04,197.454c-4.761-4.761-7.704-11.341-7.704-18.614c0-14.535,11.783-26.318,26.318-26.318
 h-21.401H90.668c-14.535,0-26.318,11.783-26.318,26.318c0,7.273,2.943,13.853,7.704,18.614c4.259,4.259,9.989,7.07,16.365,7.608
 c0.742,0.06,1.495,0.096,2.249,0.096h33.986c-0.754,0-1.507-0.036-2.249-0.096C116.028,204.524,110.298,201.712,106.04,197.454z" />
                <path style="fill:#B3B3B3;" d="M467.861,160.226c4.761,4.761,7.704,11.341,7.704,18.614c0,13.769-10.575,25.074-24.057,26.222
 c-0.742,0.06-1.495,0.096-2.261,0.096h-151.77v-52.636h151.77C456.508,152.522,463.088,155.465,467.861,160.226z" />
                <path style="fill:#CCCCCC;" d="M471.809,293.358c0,46.941-16.018,90.138-42.898,124.411c-12.13,15.48-26.473,29.153-42.551,40.517
 c-32.897,23.255-73.056,36.917-116.396,36.917s-83.499-13.661-116.396-36.917c-16.078-11.364-30.421-25.038-42.551-40.517
 c-26.88-34.273-42.898-77.47-42.898-124.411c0-23.112,3.876-45.326,11.042-65.998c2.644-7.656,5.742-15.097,9.259-22.298
 c0.742,0.06,1.495,0.096,2.249,0.096h77.613v29.907c0,5.945,2.404,11.329,6.304,15.228c3.9,3.9,9.283,6.304,15.228,6.304
 c11.891,0,21.533-9.642,21.533-21.533v-5.981c0-5.945,2.404-11.329,6.304-15.228s9.283-6.304,15.228-6.304
 c11.891,0,21.533,9.642,21.533,21.533v37.084c0,5.945,2.404,11.329,6.304,15.228c3.9,3.9,9.283,6.304,15.228,6.304
 c11.891,0,21.533-9.642,21.533-21.533v-61.009h151.77c0.766,0,1.519-0.036,2.261-0.096c3.517,7.201,6.603,14.642,9.247,22.286
 C467.921,248.032,471.809,270.246,471.809,293.358z" />
                <g>
                    <path style="fill:#B3B3B3;"
                        d="M451.508,205.062c-0.742,0.06-1.495,0.096-2.261,0.096h-151.77v24.846h151.77
  c0.766,0,1.519-0.036,2.261-0.096c3.29-0.275,6.412-1.172,9.247-2.56C458.111,219.704,455.025,212.263,451.508,205.062z" />
                    <path style="fill:#B3B3B3;" d="M172.025,417.769c-26.88-34.273-42.898-77.47-42.898-124.411c0-22.132,3.571-43.429,10.159-63.354
  h28.995v-24.846h-18.899H90.668c-0.754,0-1.507-0.036-2.249-0.096l0,0l0,0c-0.011,0.022-0.02,0.043-0.03,0.065
  c-0.83,1.702-1.635,3.419-2.418,5.148c-0.325,0.718-0.63,1.445-0.947,2.168c-0.459,1.047-0.922,2.092-1.365,3.149
  c-0.333,0.794-0.647,1.596-0.969,2.395c-0.409,1.014-0.821,2.028-1.213,3.05c-0.292,0.761-0.571,1.529-0.854,2.294
  c-0.409,1.107-0.816,2.213-1.207,3.328c-0.083,0.236-0.173,0.467-0.255,0.702c0.005,0.002,0.01,0.004,0.013,0.006
  c-7.158,20.679-11.055,42.879-11.055,65.992c0,46.941,16.018,90.138,42.898,124.411c12.13,15.48,26.473,29.153,42.551,40.517
  c32.897,23.255,73.056,36.917,116.396,36.917c10.37,0,20.555-0.791,30.505-2.299c-31.635-4.796-60.866-16.927-85.892-34.617
  C198.499,446.922,184.156,433.249,172.025,417.769z" />
                </g>
                <path style="fill:#333333;" d="M464.011,210.881c12.103-5.6,20.523-17.852,20.523-32.039c0-9.433-3.669-18.296-10.34-24.966
 c-6.674-6.657-15.535-10.324-24.949-10.324H149.265L68.311,62.597c-4.519-4.519-10.528-7.009-16.92-7.009
 c-6.39,0-12.399,2.489-16.919,7.008c-4.519,4.519-7.008,10.528-7.008,16.919c0,6.392,2.489,12.4,7.008,16.919l48.071,48.071
 c-15.555,3.68-27.168,17.672-27.168,34.336c0,9.433,3.669,18.296,10.332,24.958c2.999,2.999,6.445,5.384,10.187,7.109
 c-11.113,26.028-16.752,53.711-16.752,82.451c0,47.28,15.646,90.973,42.031,126.177l-23.268,81.014
 c-0.778,2.708-0.238,5.625,1.457,7.875s4.348,3.574,7.167,3.574h32.299c2.771,0,5.387-1.281,7.087-3.469l29.645-38.177
 c32.973,21.386,72.26,33.823,114.403,33.823c42.144,0,81.433-12.439,114.406-33.826l29.645,38.18c1.7,2.189,4.315,3.469,7.087,3.469
 h32.299c2.817,0,5.471-1.323,7.167-3.574c1.695-2.25,2.233-5.167,1.457-7.875l-23.27-81.019
 c26.382-35.204,42.027-78.896,42.027-126.173C480.776,264.611,475.132,236.92,464.011,210.881z M461.515,166.572
 c3.273,3.273,5.076,7.63,5.076,12.269c0,9.564-7.782,17.346-17.346,17.346H306.447v-34.692h142.798
 C453.874,161.495,458.236,163.3,461.515,166.572z M232.876,198.579c-16.821,0-30.505,13.684-30.505,30.505v5.981
 c0,6.926-5.634,12.561-12.561,12.561s-12.561-5.634-12.561-12.561v-73.57h111.252v104.673c0,6.926-5.634,12.561-12.561,12.561
 c-6.926,0-12.562-5.634-12.562-12.561v-37.084C263.38,212.263,249.696,198.579,232.876,198.579z M45.408,79.516
 c0-1.598,0.622-3.101,1.753-4.231c2.333-2.332,6.128-2.333,8.462,0l68.266,68.267h-16.924L47.161,83.747
 C46.03,82.616,45.408,81.114,45.408,79.516z M90.665,161.495h68.642v34.692H90.665c-4.639,0-8.997-1.803-12.27-5.076
 s-5.076-7.631-5.076-12.27C73.319,169.277,81.1,161.495,90.665,161.495z M114.433,494.056H98.437l16.618-57.86
 c7.946,8.609,16.595,16.557,25.861,23.752L114.433,494.056z M77.085,293.359c0-27.705,5.712-54.329,16.981-79.228h65.239v20.935
 c0,16.821,13.684,30.505,30.505,30.505s30.505-13.684,30.505-30.505v-5.981c0-6.926,5.634-12.561,12.561-12.561
 s12.561,5.634,12.561,12.561v37.084c0,16.821,13.685,30.505,30.505,30.505s30.505-13.684,30.505-30.505v-52.037H445.85
 c11.27,24.901,16.982,51.525,16.982,79.228c0,106.351-86.523,192.873-192.873,192.873S77.085,399.71,77.085,293.359z
 M441.485,494.056h-15.995l-26.485-34.11c9.266-7.194,17.915-15.142,25.861-23.753L441.485,494.056z" />
                <g>
                    <path style="fill:#9AD14B;" d="M257.395,117.832c0,4.955,4.016,8.972,8.972,8.972s8.972-4.017,8.972-8.972
  c0-7.361,1.306-10.661,2.96-14.841c1.977-4.997,4.218-10.661,4.218-21.443s-2.241-16.446-4.217-21.444
  c-1.654-4.18-2.961-7.481-2.961-14.844c0-7.362,1.306-10.663,2.96-14.843c1.977-4.998,4.218-10.662,4.218-21.444
  c0-4.955-4.016-8.972-8.972-8.972s-8.972,4.017-8.972,8.972c0,7.362-1.306,10.663-2.961,14.844
  c-1.976,4.998-4.217,10.662-4.217,21.444s2.241,16.447,4.218,21.444c1.653,4.18,2.96,7.481,2.96,14.843
  c0,7.361-1.306,10.661-2.96,14.841C259.636,101.387,257.395,107.051,257.395,117.832z" />
                    <path style="fill:#9AD14B;" d="M193.994,117.832c0,4.955,4.017,8.972,8.972,8.972c4.955,0,8.972-4.017,8.972-8.972
  c0-7.361,1.306-10.661,2.96-14.841c1.977-4.997,4.218-10.661,4.218-21.443s-2.241-16.446-4.218-21.444
  c-1.653-4.18-2.96-7.481-2.96-14.844c0-4.955-4.017-8.972-8.972-8.972c-4.955,0-8.972,4.017-8.972,8.972
  c0,10.782,2.241,16.447,4.218,21.444c1.653,4.18,2.96,7.481,2.96,14.843c0,7.361-1.306,10.661-2.96,14.841
  C196.235,101.387,193.994,107.051,193.994,117.832z" />
                    <path style="fill:#9AD14B;" d="M320.797,117.832c0,4.955,4.016,8.972,8.972,8.972s8.972-4.017,8.972-8.972
  c0-7.361,1.306-10.661,2.96-14.841c1.977-4.997,4.218-10.661,4.218-21.443s-2.241-16.446-4.217-21.444
  c-1.654-4.18-2.961-7.481-2.961-14.844c0-4.955-4.016-8.972-8.972-8.972s-8.972,4.017-8.972,8.972
  c0,10.782,2.241,16.447,4.217,21.444c1.654,4.18,2.961,7.481,2.961,14.843c0,7.361-1.306,10.661-2.96,14.841
  C323.038,101.387,320.797,107.051,320.797,117.832z" />
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
            </symbol>
            <symbol id="icon-devil" x="0px" y="0px" viewBox="0 0 512.001 512.001">
                <path style="fill:#F95428;"
                    d="M306.297,301.13c8.183,19.09,30.295,27.934,49.384,19.751c19.09-8.17,27.934-30.282,19.764-49.371
 L306.297,301.13z M287.713,367.166c-9.324,0.571-20.153,1.932-31.708,1.932h-0.013c-11.542,0-22.371-1.362-31.708-1.932
 c-19.038-1.193-31.838,0.895-31.838,24.446c0,29.491,20.101,54.299,47.348,61.458c5.174,1.362,10.595,2.088,16.198,2.088
 c5.602,0,11.036-0.726,16.224-2.088c27.247-7.172,47.322-31.968,47.322-61.458C319.538,368.061,306.738,365.973,287.713,367.166z
 M205.7,301.13l-69.149-29.62c-8.183,19.09,0.674,41.201,19.764,49.371C175.405,329.064,197.517,320.22,205.7,301.13z
 M428.772,284.323v43.925c0,2.788-0.065,5.564-0.195,8.326c-2.646,55.804-31.773,104.67-75.075,134.329
 c-0.376,0.272-0.765,0.519-1.141,0.778c-27.519,18.519-60.667,29.335-96.357,29.335s-68.837-10.816-96.37-29.335
 c-0.363-0.259-0.752-0.506-1.128-0.778c-43.315-29.659-72.443-78.525-75.088-134.329c-0.13-2.762-0.195-5.538-0.195-8.326v-43.925
 v-52.212v-48.334c0-8.118,0.558-16.107,1.647-23.927c9.298,7.146,19.738,13.708,31.462,19.401
 c28.751,13.954,62.197-7.172,62.197-39.126v-0.506c0-20.218-14.019-37.531-33.679-42.278c-11.412-2.762-22.124-6.225-32.123-10.167
 c31.06-45.961,83.634-76.178,143.277-76.178c47.711,0,90.91,19.336,122.164,50.603c7.82,7.82,14.888,16.379,21.1,25.574v0.013
 c-9.999,3.942-20.711,7.392-32.123,10.154c-19.66,4.747-33.679,22.06-33.679,42.278v0.506c0,31.955,33.446,53.08,62.197,39.126
 c11.737-5.693,22.176-12.255,31.462-19.401c1.089,7.82,1.647,15.809,1.647,23.927v48.334L428.772,284.323L428.772,284.323z" />
                <path style="fill:#E54728;" d="M212.791,471.68c-0.363-0.259-0.752-0.519-1.128-0.791c-43.302-29.646-72.443-78.525-75.088-134.316
 c-0.13-2.762-0.195-5.538-0.195-8.326V284.31v-52.199v-21.256v-27.078c0-48.088,19.647-91.597,51.356-122.916
 c25.236-24.931,58.116-42.147,94.809-47.82c-8.659-1.344-17.517-2.044-26.539-2.044c-47.335,0-90.223,19.038-121.425,49.864
 c-31.708,31.319-51.356,74.829-51.356,122.916v27.078v21.256v52.199v43.938c0,2.788,0.065,5.564,0.195,8.326
 c2.646,55.791,31.786,104.669,75.088,134.316c0.376,0.272,0.765,0.532,1.128,0.791c27.532,18.519,60.68,29.335,96.37,29.335
 c9.039,0,17.914-0.7,26.578-2.037C257.041,495.035,233.349,485.508,212.791,471.68z" />
                <g>
                    <path style="fill:#FCD69A;" d="M178.531,139.619v0.506c0,7.963-2.075,15.251-5.641,21.489
  c-10.738,18.817-34.963,28.116-56.556,17.637c-11.724-5.693-22.163-12.255-31.462-19.401C12.208,103.981,9.731,12.125,9.731,12.125
  s0,0.013,0.026,0.039c1.089,1.465,36.39,48.814,102.971,75.01c9.999,3.942,20.711,7.405,32.123,10.167
  C164.511,102.088,178.531,119.401,178.531,139.619z" />
                    <path style="fill:#FCD69A;" d="M502.279,12.125c0,0-2.49,91.857-75.153,147.725c-9.286,7.146-19.725,13.708-31.462,19.401
  c-28.751,13.954-62.197-7.172-62.197-39.126v-0.506c0-20.218,14.019-37.531,33.679-42.278c11.412-2.762,22.124-6.212,32.123-10.154
  v-0.013C466.926,60.562,502.279,12.125,502.279,12.125z" />
                </g>
                <g>
                    <path style="fill:#D3A562;" d="M172.889,161.614c-10.738,18.817-34.963,28.116-56.556,17.637
  c-11.724-5.693-22.163-12.255-31.462-19.401C12.208,103.981,9.731,12.125,9.731,12.125s0,0.013,0.026,0.039
  C10.743,14.563,57.313,125.626,172.889,161.614z" />
                    <path style="fill:#D3A562;" d="M339.121,161.614c10.738,18.817,34.963,28.116,56.556,17.637
  c11.724-5.693,22.163-12.255,31.462-19.401c72.663-55.869,75.14-147.725,75.14-147.725s0,0.013-0.026,0.039
  C501.267,14.563,454.697,125.626,339.121,161.614z" />
                </g>
                <g>
                    <path style="fill:#F2F2F2;" d="M375.446,271.51c8.17,19.09-0.674,41.201-19.764,49.371c-19.09,8.183-41.201-0.661-49.384-19.751
  L375.446,271.51z" />
                    <path style="fill:#F2F2F2;" d="M136.551,271.51l69.149,29.62c-8.183,19.09-30.295,27.934-49.384,19.751
  C137.226,312.711,128.368,290.599,136.551,271.51z" />
                </g>
                <path style="fill:#666666;" d="M287.713,367.166c19.025-1.193,31.825,0.895,31.825,24.446c0,29.491-20.075,54.286-47.322,61.458
 c-5.187,1.362-10.621,2.088-16.224,2.088c-5.602,0-11.023-0.726-16.198-2.088c-27.247-7.159-47.348-31.968-47.348-61.458
 c0-23.551,12.8-25.639,31.838-24.446c9.337,0.571,20.166,1.932,31.708,1.932h0.013C267.56,369.098,278.389,367.736,287.713,367.166z
 " />
                <g>
                    <path style="fill:#E54728;" d="M83.224,328.247c0,2.788,0.065,5.564,0.195,8.326c-22.63-6.601-39.165-27.506-39.165-52.263
  c0-24.679,16.444-45.546,38.971-52.199v52.212V328.247z" />
                    <path style="fill:#E54728;" d="M428.772,232.111c22.526,6.653,38.971,27.519,38.971,52.199c0,24.757-16.535,45.662-39.165,52.263
  c0.13-2.762,0.195-5.538,0.195-8.326v-43.925L428.772,232.111L428.772,232.111z" />
                </g>
                <g>
                    <path style="fill:#F2F2F2;" d="M224.284,408.652c-5.372,0-9.726-4.355-9.726-9.726v-31.76c0-5.372,4.355-9.765,9.726-9.765
  c5.372,0,9.726,4.316,9.726,9.688v31.838C234.01,404.298,229.655,408.652,224.284,408.652z" />
                    <path style="fill:#F2F2F2;" d="M256.005,408.652c-5.372,0-9.726-4.355-9.726-9.726v-29.828c0-5.372,4.355-9.726,9.726-9.726
  s9.726,4.355,9.726,9.726v29.828C265.731,404.298,261.376,408.652,256.005,408.652z" />
                    <path style="fill:#F2F2F2;" d="M287.713,408.652c-5.372,0-9.726-4.355-9.726-9.726v-31.76c0-5.372,4.355-9.765,9.726-9.765
  c5.372,0,9.726,4.316,9.726,9.688v31.838C297.44,404.298,293.085,408.652,287.713,408.652z" />
                    <path style="fill:#F2F2F2;" d="M239.794,462.796c-5.372,0-9.726-4.355-9.726-9.726v-26.91c0-5.372,4.355-9.726,9.726-9.726
  c5.372,0,9.726,4.355,9.726,9.726v26.91C249.521,458.441,245.166,462.796,239.794,462.796z" />
                    <path style="fill:#F2F2F2;" d="M272.216,462.796c-5.372,0-9.726-4.355-9.726-9.726v-26.91c0-5.372,4.355-9.726,9.726-9.726
  s9.726,4.355,9.726,9.726v26.91C281.942,458.441,277.587,462.796,272.216,462.796z" />
                </g>
                <g>
                    <path style="fill:#333333;" d="M147.974,237.971l5.602-2.4c3.949-1.694,8.465-0.824,11.503,2.215l33.139,33.139
  c5.829,5.829,13.486,8.743,21.143,8.743c7.657,0,15.315-2.914,21.143-8.743c3.798-3.798,3.798-9.957,0-13.754
  c-3.799-3.798-9.957-3.798-13.755,0c-4.075,4.073-10.702,4.073-14.776,0l-33.139-33.139c-8.694-8.695-21.616-11.183-32.921-6.34
  l-5.601,2.4c-4.938,2.115-7.225,7.834-5.108,12.771C137.319,237.802,143.038,240.088,147.974,237.971z" />
                    <path style="fill:#333333;"
                        d="M292.633,279.668c7.657,0,15.315-2.914,21.143-8.743l33.139-33.139
  c3.037-3.039,7.553-3.909,11.503-2.215l5.601,2.4c4.937,2.116,10.655-0.17,12.771-5.108c2.116-4.937-0.171-10.655-5.108-12.771
  l-5.601-2.4c-11.303-4.844-24.227-2.355-32.922,6.34L300.02,257.17c-4.075,4.073-10.702,4.073-14.776,0
  c-3.799-3.798-9.957-3.798-13.755,0c-3.798,3.798-3.798,9.957,0,13.754C277.319,276.754,284.977,279.668,292.633,279.668z" />
                    <path style="fill:#333333;" d="M496.836,80.342C511,43.699,511.963,13.643,511.997,12.383c0.115-4.251-2.55-8.079-6.574-9.458
  c-4.024-1.38-8.48,0.022-10.997,3.451c-0.375,0.511-32.215,43.105-91.72,68.835c-5.373-7.247-11.287-14.119-17.659-20.49
  C350.591,20.248,304.763,1.265,256.004,1.265c-58.046,0-112.291,27.506-146.701,73.947C49.794,49.482,17.952,6.888,17.584,6.386
  C15.073,2.946,10.62,1.54,6.586,2.913c-4.031,1.375-6.698,5.212-6.583,9.468c0.034,1.262,0.997,31.317,15.162,67.959
  c13.114,33.928,33.327,62.258,59.404,83.651c-0.705,6.535-1.074,13.162-1.074,19.778V225.3
  c-23.266,9.973-38.968,33.268-38.968,59.01c0,26.009,15.993,49.47,39.631,59.285c4.581,54.333,33.283,104.082,78.762,135.265
  c0.246,0.176,0.497,0.346,0.744,0.514l0.309,0.211c0.077,0.054,0.153,0.108,0.231,0.161
  c30.143,20.275,65.344,30.991,101.798,30.991c36.46,0,71.658-10.717,101.888-31.061l0.318-0.214c0.294-0.196,0.587-0.394,0.878-0.6
  c45.472-31.186,74.169-80.933,78.748-135.264c23.638-9.815,39.632-33.276,39.632-59.285c0-25.741-15.702-49.038-38.969-59.01
  v-41.528c0-6.614-0.368-13.24-1.073-19.772C463.506,142.606,483.72,114.274,496.836,80.342z M488.109,41.984
  c-8.205,36.433-31.413,96.796-96.698,128.511c-10.414,5.059-22.51,4.398-32.362-1.768c-9.929-6.215-15.857-16.907-15.857-28.6
  v-0.504c0-15.601,10.789-29.103,26.237-32.833C425.77,93.186,465.531,63.365,488.109,41.984z M33.553,73.955
  c-4.539-11.634-7.626-22.621-9.72-32.026c22.569,21.384,62.348,51.245,118.737,64.862c15.448,3.73,26.237,17.231,26.237,32.833
  v0.504c0,11.694-5.928,22.384-15.857,28.6c-9.851,6.165-21.949,6.825-32.362,1.768C80.17,150.86,50.887,118.379,33.553,73.955z
  M53.98,284.311c0-14.952,7.602-28.716,19.515-36.91v73.825C61.578,313.034,53.98,299.278,53.98,284.311z M458.014,284.311
  c0,14.968-7.598,28.724-19.516,36.915V247.4C450.412,255.593,458.014,269.358,458.014,284.311z M419.045,183.772v144.47
  c0,53.834-26.557,104.162-71.039,134.631c-0.07,0.048-0.139,0.096-0.207,0.145c-0.128,0.092-0.261,0.179-0.39,0.266l-0.477,0.323
  c-26.909,18.107-58.35,27.678-90.927,27.678c-32.534,0-63.944-9.547-90.845-27.614c-0.2-0.141-0.405-0.28-0.611-0.419
  c-0.112-0.077-0.227-0.152-0.338-0.232c-0.069-0.051-0.137-0.099-0.209-0.147c-44.49-30.463-71.051-80.793-71.051-134.63v-144.47
  c0-2.131,0.052-4.26,0.134-6.388c6.089,3.865,12.424,7.412,19.005,10.61c7.356,3.574,15.239,5.346,23.101,5.346
  c9.75,0,19.463-2.727,28.082-8.122c15.647-9.794,24.988-26.649,24.988-45.088v-0.504c0-24.618-16.911-45.896-41.123-51.742
  c-6.53-1.577-12.825-3.399-18.885-5.42c30.854-38.869,77.723-61.743,127.752-61.743c43.561,0,84.505,16.959,115.287,47.754
  c4.412,4.412,8.575,9.095,12.463,13.989c-6.06,2.021-12.357,3.844-18.886,5.421c-24.214,5.846-41.125,27.125-41.125,51.742v0.504
  c0,18.439,9.341,35.294,24.988,45.088c8.62,5.396,18.332,8.122,28.083,8.122c7.859,0,15.745-1.771,23.101-5.346
  c6.579-3.197,12.911-6.741,18.998-10.604C418.993,179.516,419.045,181.644,419.045,183.772z" />
                    <path style="fill:#333333;" d="M359.509,329.827c23.992-10.278,35.15-38.158,24.872-62.149c-2.115-4.938-7.833-7.225-12.77-5.111
  l-69.141,29.618c-2.372,1.015-4.242,2.932-5.2,5.326c-0.407,1.017-0.624,2.084-0.674,3.159h-0.012
  c-0.083,1.775-1.277,43.813,64.971,73.414c1.289,0.576,2.637,0.848,3.962,0.848c3.719,0,7.27-2.145,8.886-5.761
  c2.19-4.905-0.008-10.656-4.913-12.848c-16.87-7.537-28.413-15.684-36.319-23.338c2.555,0.425,5.147,0.668,7.763,0.668
  C347.143,333.651,353.451,332.422,359.509,329.827z M368.721,284.967c0.534,11.294-5.884,22.272-16.872,26.98
  c-6.847,2.932-14.425,3.023-21.339,0.257c-3.783-1.513-7.118-3.784-9.844-6.65L368.721,284.967z" />
                    <path style="fill:#333333;" d="M319.893,364.839c-10.187-9.367-25.064-8.113-42.285-6.662c-6.943,0.585-14.125,1.189-21.611,1.189
  c-7.485,0-14.667-0.604-21.611-1.189c-17.224-1.451-32.099-2.704-42.285,6.662c-6.309,5.8-9.375,14.555-9.375,26.767
  c0,40.402,32.87,73.273,73.273,73.273s73.273-32.87,73.273-73.273C329.27,379.394,326.203,370.638,319.893,364.839z
  M281.941,438.741v-12.586c0-5.372-4.355-9.726-9.726-9.726s-9.726,4.355-9.726,9.726v18.865c-2.129,0.257-4.293,0.406-6.491,0.406
  c-2.194,0-4.352-0.148-6.478-0.403v-18.867c0-5.372-4.355-9.726-9.726-9.726c-5.372,0-9.726,4.355-9.726,9.726v12.594
  c-16.61-9.173-27.889-26.863-27.889-47.143c0-4.382,0.536-10.1,3.088-12.446c1.764-1.621,5.08-2.305,9.295-2.481v22.242
  c0,5.372,4.355,9.726,9.726,9.726c5.372,0,9.726-4.355,9.726-9.726v-21.254c3.856,0.324,7.97,0.654,12.264,0.879v20.375
  c0,5.372,4.355,9.726,9.726,9.726c5.372,0,9.726-4.355,9.726-9.726v-20.376c4.29-0.224,8.4-0.555,12.251-0.878v21.254
  c0,5.372,4.355,9.726,9.726,9.726s9.726-4.355,9.726-9.726v-22.244c4.216,0.176,7.532,0.862,9.295,2.483
  c2.552,2.346,3.088,8.064,3.088,12.446C309.817,411.88,298.543,429.566,281.941,438.741z" />
                    <path style="fill:#333333;"
                        d="M243.353,294.524c0-5.372-4.355-9.726-9.726-9.726c-5.372,0-9.726,4.355-9.726,9.726v31.328
  c0,15.263,12.416,27.679,27.679,27.679h8.837c15.263,0,27.679-12.416,27.679-27.679v-31.328c0-5.372-4.355-9.726-9.726-9.726
  c-5.372,0-9.726,4.355-9.726,9.726v31.328c0,4.536-3.69,8.226-8.226,8.226h-8.837c-4.536,0-8.226-3.69-8.226-8.226V294.524z" />
                    <path style="fill:#333333;" d="M215.409,300.669c-0.001-0.03-0.012-0.058-0.014-0.088c-0.058-1.044-0.276-2.08-0.672-3.07
  c-0.958-2.395-2.828-4.311-5.2-5.326l-69.141-29.618c-4.937-2.114-10.655,0.172-12.77,5.111
  c-4.979,11.622-5.133,24.487-0.436,36.226c4.699,11.738,13.686,20.944,25.308,25.923c6.059,2.595,12.364,3.824,18.574,3.824
  c2.565,0,5.11-0.231,7.618-0.641c-7.902,7.67-19.41,15.822-36.173,23.311c-4.905,2.192-7.104,7.943-4.913,12.848
  c1.616,3.616,5.165,5.761,8.886,5.761c1.325,0,2.674-0.272,3.962-0.848C216.688,344.481,215.494,302.444,215.409,300.669z
  M160.145,311.946c-10.99-4.708-17.406-15.684-16.872-26.98l48.056,20.586c-2.726,2.866-6.063,5.136-9.844,6.65
  C174.57,314.97,166.991,314.879,160.145,311.946z" />
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
            </symbol>
            <symbol id="icon-banshee" viewBox="0 0 511.999 511.999">
                <path style="fill:#E6E6E6;" d="M385.711,204.678c18.259,6.857,31.279,24.503,31.279,45.12c0,26.573-21.612,48.185-48.173,48.185
 v5.932c0,24.618-19.958,44.577-44.577,44.577l-11.957,102.81c-2.463,31.314-30.77,55.342-62.789,51.642
 c-26.989-3.111-47.711-25.474-49.85-52.556l-11.887-101.897c-12.303,0-23.451-4.995-31.51-13.055
 c-8.071-8.071-13.055-19.207-13.055-31.522v-5.932c-26.573,0-48.185-21.612-48.185-48.185c0-20.618,13.02-38.263,31.279-45.12
 v-0.012v-66.293c0-71.635,58.071-129.706,129.706-129.706c71.647,0,129.718,58.071,129.718,129.706V204.678z M388.082,249.798
 c0-10.638-8.626-19.276-19.265-19.276c-31.88,0-57.817-25.937-57.817-57.817c0-10.638-8.638-19.265-19.276-19.265
 c-10.65,0-19.276,8.626-19.276,19.265c0,53.134,43.236,96.369,96.369,96.369C379.455,269.074,388.082,260.448,388.082,249.798z
 M294.418,346.121c0.139-1.341,0.208-2.683,0.208-4.001c0-21.034-17.091-38.552-38.622-38.552
 c-22.896,0-40.761,19.785-38.414,42.553l10.349,100.752c1.469,14.385,13.599,25.324,28.064,25.324
 c14.466,0,26.584-10.939,28.064-25.324L294.418,346.121z M260.237,281.204c13.772,0,22.375-14.905,15.495-26.827l-19.727-34.17
 l-19.727,34.17c-6.88,11.922,1.723,26.827,15.483,26.827H260.237z M239.55,172.705c0-10.638-8.626-19.265-19.276-19.265
 c-10.638,0-19.265,8.626-19.265,19.265c0,31.88-25.937,57.817-57.817,57.817c-10.65,0-19.276,8.638-19.276,19.276
 c0,10.65,8.626,19.276,19.276,19.276C196.326,269.074,239.55,225.839,239.55,172.705z" />
                <path style="fill:#B3B3B3;" d="M271.037,502.944c-17.275,0-21.78-25.474-23.127-52.556l-34.874-101.897
 c-7.746,0-14.764-4.995-19.838-13.055c-5.081-8.071-8.219-19.207-8.219-31.522l0,0c0-3.038-1.978-5.8-4.919-6.565
 c-14.398-3.743-25.416-23.639-25.416-47.552c0-20.618,8.197-16.698,19.692-23.555l0,0v-87.87c0-71.635,36.56-129.705,81.659-129.706
 h-0.001c-71.635,0-129.706,58.071-129.706,129.706v66.293v0.012c-18.259,6.857-31.279,24.503-31.279,45.12
 c0,26.573,21.612,48.185,48.185,48.185v5.932c0,12.315,4.984,23.451,13.055,31.522c8.06,8.06,19.207,13.055,31.51,13.055
 l11.887,101.897c2.139,27.081,22.861,49.445,49.85,52.556c2.055,0.237,35.712,0.357,37.731,0.371
 C286.001,503.294,298.264,502.944,271.037,502.944z" />
                <g>
                    <path style="fill:#666666;" d="M294.626,342.12c0,1.318-0.069,2.66-0.208,4.001l-10.349,100.752
  c-1.48,14.385-13.599,25.324-28.064,25.324c-14.466,0-26.596-10.939-28.064-25.324l-10.349-100.752
  c-2.347-22.768,15.518-42.553,38.414-42.553C277.536,303.568,294.626,321.086,294.626,342.12z" />
                    <path style="fill:#666666;" d="M275.732,254.377c6.88,11.922-1.723,26.827-15.495,26.827h-8.476
  c-13.76,0-22.364-14.905-15.483-26.827l19.727-34.17L275.732,254.377z" />
                    <path style="fill:#666666;" d="M368.817,230.522c10.638,0,19.265,8.638,19.265,19.276c0,10.65-8.626,19.276-19.265,19.276
  c-53.134,0-96.369-43.235-96.369-96.369c0-10.638,8.626-19.265,19.276-19.265c10.638,0,19.276,8.626,19.276,19.265
  C311,204.585,336.937,230.522,368.817,230.522z" />
                    <path style="fill:#666666;" d="M220.274,153.44c10.65,0,19.276,8.626,19.276,19.265c0,53.134-43.224,96.369-96.358,96.369
  c-10.65,0-19.276-8.626-19.276-19.276c0-10.638,8.626-19.276,19.276-19.276c31.88,0,57.817-25.937,57.817-57.817
  C201.009,162.067,209.635,153.44,220.274,153.44z" />
                </g>
                <g>
                    <path style="fill:#333333;" d="M368.811,221.855c-27.099,0-49.144-22.046-49.144-49.144c0-15.409-12.536-27.945-27.945-27.945
  c-15.409,0-27.945,12.536-27.945,27.945c0,57.916,47.118,105.034,105.034,105.034c15.409,0,27.945-12.536,27.945-27.945
  S384.221,221.855,368.811,221.855z M368.811,260.399c-48.351,0-87.689-39.337-87.689-87.689c0-5.844,4.755-10.6,10.6-10.6
  s10.6,4.755,10.6,10.6c0,36.663,29.827,66.489,66.489,66.489c5.845,0,10.6,4.755,10.6,10.6
  C379.411,255.644,374.657,260.399,368.811,260.399z" />
                    <path style="fill:#333333;" d="M220.278,133.202c11.121,0,21.797,4.75,29.292,13.033c1.644,1.817,3.98,2.854,6.43,2.854
  c2.45,0,4.786-1.036,6.43-2.854c7.494-8.283,18.171-13.033,29.292-13.033c4.79,0,8.673-3.883,8.673-8.673s-3.883-8.673-8.673-8.673
  c-13.048,0-25.666,4.536-35.723,12.66c-10.056-8.123-22.675-12.66-35.723-12.66c-4.79,0-8.673,3.883-8.673,8.673
  S215.489,133.202,220.278,133.202z" />
                    <path style="fill:#333333;" d="M394.386,199.047v-60.668C394.386,62.077,332.304,0,255.995,0
  c-76.302,0-138.379,62.077-138.379,138.379v60.667c-18.536,9.378-31.281,28.599-31.281,50.753c0,28.416,20.953,52.029,48.22,56.199
  c0.996,25.777,20.406,46.914,45.416,50.594l11.037,94.643c2.556,31.42,26.711,56.779,57.495,60.327
  c2.531,0.291,5.057,0.436,7.565,0.436c14.988,0,29.394-5.161,41.211-14.887c13.611-11.203,22.219-27.583,23.636-44.964
  l11.112-95.555c25.009-3.682,44.418-24.817,45.414-50.593c27.269-4.17,48.222-27.783,48.222-56.2
  C425.665,227.646,412.921,208.425,394.386,199.047z M368.811,289.308c-4.79,0-8.673,3.883-8.673,8.673v5.938
  c0,19.794-16.103,35.897-35.897,35.897c-4.402,0-8.106,3.298-8.615,7.671L303.67,450.299c-0.013,0.106-0.023,0.213-0.031,0.32
  c-1.007,12.774-7.343,24.839-17.381,33.101c-10.125,8.335-22.824,12.103-35.767,10.612c-22.621-2.608-40.371-21.376-42.204-44.628
  c-0.009-0.108-0.02-0.216-0.031-0.323l-11.884-101.898c-0.51-4.372-4.214-7.668-8.615-7.668c-19.794,0-35.897-16.103-35.897-35.897
  v-5.939c0-4.79-3.883-8.673-8.673-8.673c-21.784,0-39.507-17.723-39.507-39.509c0-21.784,17.723-39.509,39.507-39.509
  c4.79,0,8.673-3.883,8.673-8.673s-3.883-8.673-8.673-8.673c-2.795,0-5.54,0.212-8.227,0.602v-55.169
  c0-66.738,54.296-121.034,121.034-121.034c66.745,0,121.045,54.296,121.045,121.034v55.17c-2.689-0.392-5.434-0.602-8.23-0.602
  c-4.79,0-8.673,3.883-8.673,8.673s3.883,8.673,8.673,8.673c21.785,0,39.509,17.723,39.509,39.509
  C408.32,271.585,390.597,289.308,368.811,289.308z" />
                    <path style="fill:#333333;" d="M248.224,172.711c0-15.409-12.536-27.945-27.945-27.945s-27.945,12.536-27.945,27.945
  c0,27.099-22.046,49.144-49.144,49.144c-15.409,0-27.944,12.536-27.944,27.945s12.536,27.945,27.944,27.945
  C201.105,277.744,248.224,230.627,248.224,172.711z M143.189,260.399c-5.844,0-10.599-4.755-10.599-10.6
  c0-5.844,4.755-10.6,10.599-10.6c36.663,0,66.489-29.827,66.489-66.489c0-5.844,4.755-10.6,10.6-10.6c5.845,0,10.6,4.755,10.6,10.6
  C230.879,221.063,191.541,260.399,143.189,260.399z" />
                    <path style="fill:#333333;" d="M256,294.893c-13.358,0-26.154,5.687-35.104,15.605c-8.95,9.917-13.301,23.225-11.937,36.515
  l10.347,100.745c1.939,18.881,17.714,33.119,36.693,33.119s34.755-14.238,36.694-33.119l10.347-100.745
  c1.364-13.289-2.986-26.598-11.936-36.515C282.154,300.581,269.359,294.893,256,294.893z M285.786,345.24l-10.347,100.745
  c-1.027,10.002-9.385,17.545-19.439,17.545c-10.054,0-18.411-7.543-19.439-17.545L226.214,345.24
  c-0.876-8.538,1.807-16.75,7.558-23.121c5.75-6.371,13.645-9.881,22.228-9.881c8.584,0,16.478,3.509,22.228,9.881
  C283.979,328.49,286.664,336.701,285.786,345.24z" />
                    <path style="fill:#333333;" d="M256,211.538c-3.099,0-5.961,1.654-7.51,4.336l-19.726,34.166c-4.8,8.314-4.8,18.24,0,26.554
  c4.8,8.313,13.396,13.277,22.996,13.277h8.479c9.6,0,18.196-4.963,22.996-13.277c4.8-8.314,4.8-18.24,0-26.554l-19.726-34.166
  C261.961,213.191,259.099,211.538,256,211.538z M268.216,258.712c2.399,4.156,0.799,7.825,0,9.209
  c-0.799,1.384-3.176,4.605-7.975,4.605h-8.479c-4.799,0-7.176-3.22-7.975-4.605c-0.799-1.384-2.399-5.053,0-9.209l12.216-21.158
  L268.216,258.712z" />
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
            </symbol>


            <symbol id="icon-waterfall" x="0px" y="0px" viewBox="0 0 512 512">
                <path style="fill:#FFCD69;" d="M445.217,489.739H66.783c-24.588,0-44.522-19.934-44.522-44.522V66.783
 c0-24.588,19.933-44.522,44.522-44.522h378.435c24.588,0,44.522,19.933,44.522,44.522v378.435
 C489.739,469.806,469.806,489.739,445.217,489.739z" />
                <path style="fill:#FFFF81;" d="M217.043,0c52.251,0,94.609,42.358,94.609,94.609s-42.358,94.609-94.609,94.609
 s-94.609-42.358-94.609-94.609S164.793,0,217.043,0z" />
                <path style="fill:#FFF145;" d="M217.043,44.522c27.662,0,50.087,22.424,50.087,50.087s-22.424,50.087-50.087,50.087
 s-50.087-22.424-50.087-50.087S189.381,44.522,217.043,44.522z" />
                <path style="fill:#7F932A;" d="M512,38.957v406.261H356.174V100.174c0-24.588,19.934-44.522,44.522-44.522h16.696
 c9.22,0,16.696-7.475,16.696-16.696l0,0C434.087,17.441,451.528,0,473.043,0l0,0C494.559,0,512,17.441,512,38.957z M111.304,55.652
 H94.609c-9.22,0-16.696-7.475-16.696-16.696l0,0C77.913,17.441,60.472,0,38.957,0l0,0C17.441,0,0,17.441,0,38.957v406.261h155.826
 V100.174C155.826,75.586,135.893,55.652,111.304,55.652z" />
                <path style="fill:#9FBA41;" d="M512,217.043v128H367.304V161.391c0-21.515,17.441-38.957,38.957-38.957l0,0
 c21.515,0,38.957,17.441,38.957,38.957v28.399c7.071-7.219,16.923-11.704,27.826-11.704l0,0
 C494.559,178.087,512,195.528,512,217.043z M131.772,171.944c-4.971-15.793-19.729-27.248-37.163-27.248l0,0
 c-5.994,0-11.669,1.357-16.741,3.774c-0.936-20.683-17.997-37.166-38.911-37.166l0,0C17.441,111.304,0,128.746,0,150.261v306.087
 h155.826v-244.87C155.826,194.272,146.059,179.356,131.772,171.944z" />
                <path style="fill:#606D11;" d="M512,317.217v139.13H356.174v-77.913c0-17.207,9.767-32.122,24.054-39.534
 c4.971-15.793,19.729-27.248,37.163-27.248l0,0c5.994,0,11.669,1.357,16.741,3.774c0.936-20.683,17.997-37.166,38.911-37.166l0,0
 C494.559,278.261,512,295.702,512,317.217z M105.739,211.478L105.739,211.478c-21.515,0-38.957,17.441-38.957,38.957v50.66
 c-7.071-7.219-16.923-11.704-27.826-11.704l0,0C17.441,289.391,0,306.833,0,328.348v116.87h77.913h66.783V250.435
 C144.696,228.92,127.254,211.478,105.739,211.478z" />
                <path style="fill:#91C1A4;"
                    d="M512,450.783L512,450.783c0,33.81-27.408,61.217-61.217,61.217H61.217
 C27.408,512,0,484.592,0,450.783l0,0c0-33.81,27.408-61.217,61.217-61.217h389.565C484.592,389.565,512,416.973,512,450.783z" />
                <path style="fill:#A9D5BB;" d="M389.565,144.696v289.391h-66.783H256h-66.783h-66.783V144.696c0-18.442,14.949-33.391,33.391-33.391
 s33.391,14.949,33.391,33.391c0-18.442,14.949-33.391,33.391-33.391S256,126.254,256,144.696c0-18.442,14.949-33.391,33.391-33.391
 s33.391,14.949,33.391,33.391c0-18.442,14.949-33.391,33.391-33.391S389.565,126.254,389.565,144.696z" />
                <path style="fill:#C7FAFF;" d="M256,144.696v289.391h-66.783V144.696c0-18.442,14.949-33.391,33.391-33.391S256,126.254,256,144.696
 z M356.174,111.304c-18.442,0-33.391,14.949-33.391,33.391v289.391h66.783V144.696C389.565,126.254,374.616,111.304,356.174,111.304
 z" />
                <path style="fill:#EAFFFF;" d="M80.696,434.087c0-4.61,3.738-8.348,8.348-8.348h333.913c4.61,0,8.348,3.738,8.348,8.348
 s-3.738,8.348-8.348,8.348H89.043C84.433,442.435,80.696,438.697,80.696,434.087z M345.043,459.13H166.957
 c-4.61,0-8.348,3.738-8.348,8.348s3.738,8.348,8.348,8.348h178.087c4.61,0,8.348-3.738,8.348-8.348S349.654,459.13,345.043,459.13z
 M122.435,459.13H66.783c-4.61,0-8.348,3.738-8.348,8.348s3.738,8.348,8.348,8.348h55.652c4.61,0,8.348-3.738,8.348-8.348
 S127.045,459.13,122.435,459.13z M445.217,459.13h-55.652c-4.61,0-8.348,3.738-8.348,8.348s3.738,8.348,8.348,8.348h55.652
 c4.61,0,8.348-3.738,8.348-8.348S449.828,459.13,445.217,459.13z" />
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
            </symbol>


            <symbol width="512px" height="512px" viewBox="0 0 512 512" id="icon-giant">
                <path fill="#000"
                    d="M357.796 17.533a64.331 64.331 0 0 0-2.058.003c-2.574.046-5.301.247-8.203.621-4.663 3.477-4.538 13.246-8.952 18.954-9.888-2.176-17.187 5.81-16.779 13.777l13.6 8.93c-13.526 22.345-33.82 39.466-39.022 63-16.566-2.885-38.03-4.903-54.232-3.256-.317.713-.632 1.426-.967 2.137-7.961 16.865-19.716 30.123-33.039 38.064-13.323 7.941-28.946 10.586-42.514 4.098-12.117-5.795-19.646-17.476-22.757-30.885-28.118-3.618-60.113 34.404-89.708 60.709-19.094 27.134 4.077 80.52-2.126 98.36-3.741 10.756 4.885 33.1 20.544 36.263 15.336 3.098 26.122-9.397 33.727-21.799 2.006-3.27-25.782-19.36-27.326-28.098-1.844-10.43-.717-41.722 2.525-60.271 18.983-1.913 35.11-17.272 44.768-25.108 8.071 36.793 14.738 80.07 29.758 117.065-8.645 51.14-18.984 98.52-16.819 150.85l-44.894 7.75c-4.62 7.753-6.843 16.91-.02 25.365 0 0 74.398.412 77.207.412 1.673-.32 2.503-20.515 1.455-30.611 2.354-31.588 22.146-69.96 38.055-102.399 27.546-37.452 63.778-46.092 93.254-86.709 29.25 22.461 46.953 45.293 59.545 77.008 28.265-35.233 33.557-36.365 63.638-55.832-1.861-8.516-2.47-17.504-14.537-22.193-20.54 7.464-11.65 1.68-39.459 18.836-14.72-21.902-29.08-50.748-57.85-62.114-3.86-.917-45.101 11.195-76.636 38.158 4.707-23.282 9.712-56.212 11.414-87.923 20.94-4.93 45.912-20.178 65.79-28.711 36.293-29.313 30.23-54.157 42.88-83.47l7.45-1.99c8.9-14.321 14.563-28.469 16.894-42.79-6.779-3.49-14.48-6.059-24.606-6.201zM209.613 50.449c-5.176-.044-10.926 1.668-16.985 5.279-9.693 5.778-19.438 16.398-26.007 30.314-6.57 13.916-8.595 28.229-6.922 39.442 1.672 11.213 6.592 18.74 13.615 22.1 7.023 3.358 15.93 2.441 25.623-3.337 9.693-5.778 19.439-16.398 26.008-30.314 6.569-13.916 8.594-28.229 6.922-39.442-1.673-11.213-6.595-18.739-13.618-22.097-2.633-1.26-5.531-1.92-8.636-1.945zm240.683 286.748c-3.779.138-7.868 1.97-11.93 5.83-4.022 3.899-7.021 9.026-9.044 15.04-2.023 6.015-3.23 12.023-1.899 17.495 3.899 16.016-2.949 1.262-3.861-5.362-.577-4.372-.545-9.899-1.203-17.808l-17.938 1.492c.386 4.632.489 8.563.73 12.451l-16.394 1.125c5.088 21.17 3.951 49.462 33.041 47.12-7.946 22.393-21.154 45.923-36.644 71.36l15.373 9.362c8.272-13.583 16.136-26.867 22.998-40.012 4.99 14.721 13.158 27.42 19.707 39.594l15.851-8.527c-8.94-16.62-18.234-31.036-21.162-47.25 5.111-16.052 10.005-32.737 11.55-49.875 7.515-3.86 12.499-12.384 14.83-19.149 2.022-6.014 2.736-11.925 1.898-17.494-2.602-9.75-8.688-15.657-15.903-15.392z" />
            </symbol>
            <symbol id="icon-beast" x="0px" y="0px" viewBox="0 0 479.236 479.236" width="512" height="512">
                <g>
                    <path style="fill:#836F5A;"
                        d="M198.806,478.434c-3.463,0.737-77.256,8.957-95.171-49.265S155.019,270.177,276.002,260.1   c120.983-10.077,171.368,66.06,176.966,127.641c5.598,61.581-32.47,77.256-97.453,64.057   C262.249,432.855,251.43,467.237,198.806,478.434z" />
                    <path style="fill:#564A3D;"
                        d="M452.968,386.84c-2.609-28.694-14.947-60.544-39.614-85.364   c7.294,15.529,11.443,31.699,12.832,46.975c5.598,61.581-32.47,77.256-97.453,64.057c-93.266-18.944-104.085,15.438-156.709,26.635   c-2.479,0.527-40.995,4.885-69.257-14.036c0.264,1.065,0.548,2.121,0.868,3.16c17.914,58.222,91.708,50.002,95.171,49.265   c52.624-11.197,63.443-45.578,156.709-26.635C420.498,464.096,458.566,448.421,452.968,386.84z" />

                    <ellipse transform="matrix(0.9777 -0.2101 0.2101 0.9777 -50.7469 21.3489)" style="fill:#836F5A;"
                        cx="75.084" cy="249.464" rx="38.628" ry="49.825" />
                    <path style="fill:#564A3D;"
                        d="M112.844,241.262c-0.951-4.424-2.337-8.606-4.07-12.496c0.096,21.637-11.292,40.019-28.72,43.765   s-35.363-8.333-44.166-28.098c0.019,4.259,0.474,8.641,1.425,13.065c5.783,26.903,27.379,45.078,48.236,40.595   S118.627,268.165,112.844,241.262z" />

                    <ellipse transform="matrix(0.9777 -0.2101 0.2101 0.9777 -33.7986 42.6936)" style="fill:#836F5A;"
                        cx="183.995" cy="180.386" rx="43.018" ry="55.487" />
                    <path style="fill:#564A3D;"
                        d="M226.053,171.68c-3.655-17.006-12.987-30.872-24.619-38.778   c6.024,7.543,10.634,17.059,12.952,27.846c6.44,29.96-7.169,58.295-30.397,63.288c-10.044,2.159-20.238-0.408-29.099-6.43   c10.707,13.407,25.901,20.557,40.766,17.362C218.883,229.975,232.493,201.64,226.053,171.68z" />

                    <ellipse transform="matrix(0.9916 -0.1297 0.1297 0.9916 -18.7384 41.8566)" style="fill:#836F5A;"
                        cx="311.958" cy="164.781" rx="43.018" ry="55.487" />
                    <path style="fill:#564A3D;"
                        d="M354.613,159.867c-2.198-16.806-10.014-31.077-20.541-39.964c2.692,5.959,4.617,12.567,5.541,19.631   c3.975,30.386-11.9,57.517-35.457,60.598c-10.528,1.377-20.804-2.293-29.311-9.474c8.888,19.674,26.229,32.173,44.311,29.808   C342.713,217.384,358.588,190.253,354.613,159.867z" />

                    <ellipse transform="matrix(0.998 0.0631 -0.0631 0.998 13.7266 -27.1125)" style="fill:#836F5A;"
                        cx="436.362" cy="203.891" rx="39.856" ry="51.408" />
                    <path style="fill:#564A3D;"
                        d="M463.063,164.736c3.391,8.175,5.06,17.71,4.423,27.789c-1.79,28.335-21.05,50.18-43.018,48.792   c-9.066-0.573-17.171-5.02-23.445-12.03c6.142,14.808,17.958,25.136,32.112,26.03c21.968,1.388,41.228-20.457,43.018-48.792   C477.204,189.884,471.99,174.712,463.063,164.736z" />
                    <path style="fill:#836F5A;"
                        d="M16.781,180.578L2.967,103.352c-0.174-0.97,1.013-1.58,1.701-0.874l54.717,56.221   c0.469,0.482,0.338,1.28-0.26,1.587l-40.903,21.006C17.624,181.599,16.899,181.24,16.781,180.578z" />
                    <path style="fill:#836F5A;"
                        d="M133.62,101.727l-3.42-78.377c-0.043-0.985,1.215-1.431,1.802-0.64l46.754,62.998   c0.401,0.54,0.165,1.313-0.469,1.538l-43.333,15.379C134.32,102.85,133.649,102.398,133.62,101.727z" />
                    <path style="fill:#836F5A;"
                        d="M415.774,114.93l24.502-74.527c0.308-0.937,1.642-0.91,1.912,0.039l21.47,75.457   c0.184,0.647-0.31,1.287-0.982,1.273l-45.972-0.93C416.031,116.228,415.564,115.569,415.774,114.93z" />
                    <path style="fill:#836F5A;"
                        d="M276.454,77.171l17.835-76.398c0.224-0.96,1.555-1.051,1.908-0.13l28.04,73.27   c0.24,0.628-0.195,1.309-0.866,1.355l-45.875,3.128C276.825,78.441,276.301,77.825,276.454,77.171z" />
                </g>
            </symbol>
            <symbol id="icon-hydra" width="512px" height="512px" viewBox="0 0 512 512">
                <path fill="#000"
                    d="M345.594 20.28c-11.443.087-23.37 1.194-36.094 3.845 33.485 7.004 54.532 21.844 65.844 39.22-15.476-2.647-30.64-4.472-45.47-5.532L311 40.374l-19.28 16.438c-7.537.167-14.98.55-22.314 1.156L239.97 41.78l-14.907 22.814c-8.1 1.775-16.05 3.846-23.844 6.22l-29.47-14.97-11.313 30.75c-8.783 4.197-17.31 8.868-25.593 13.937l-32.688-5.31-.47 29.03c-6.313 5.248-12.44 10.808-18.374 16.656H48l3.563 36.656c-4.38 5.908-8.603 12.045-12.688 18.375L18.47 192.25v39.5c-.012.02-.022.042-.032.063V493.28h18.5c23.523-92.965 94.565-130.4 168.968-85.25 42.127 25.566 93.783 62.296 149.063 41.158-.9 7.955-3.276 15.623-6.908 22.562l95.344 19.188c2.99-7.75 5.584-15.712 7.625-23.563-3.557 2.29-10.352 4.79-19.78 3.313-41.302-6.47-33.15-54.034-.53-58.407 10.915-1.456 21.15 3.22 27.56 11.25l18.283-38.874c-68.1 6.078-129.61-30.834-197.47-16.687 35.468 7.415 56.983 23.64 67.75 42.342-7.332.564-14.425.598-21.28.157l-10.813-10.25-13.625 6.436c-5.98-1.52-11.737-3.448-17.313-5.75l-7.718-15.47-10.906 5.97c-7.152-4.38-13.924-9.414-20.344-15.062l-1.813-26.75-19.436 5.03c-7.508-7.63-15.15-13.68-22.875-18.343l-1.282-19.75-23.875 9.408c-11.712-2.7-23.455-2.622-35.063-.25 44.223-90.392 134.06-92.4 180.813-64.563-5.227 5.68-11.388 10.355-18.125 13.78l66.562 70.908c6.928-4.58 13.63-9.564 19.844-14.782-4.228-.204-14.15-5.01-17.47-8.06-34.53-31.74 7.1-63.854 32.876-48.626 9.484 5.603 15.366 14.898 15.938 25.156l34.75-23.875c-59.015-34.522-85.098-97.445-148.594-125.25 23.092 24.968 31.707 49.115 30.97 69.75-8.93-6.752-18.606-12.1-28.845-16.188l-13.845-21.25-18.188 12.75c-5.18-.755-10.455-1.246-15.78-1.5l-19.094-18.093-15.25 19.687c-7.918 1.068-15.884 2.592-23.844 4.564l-15.75-13-9.75 20.812c-6.988 2.552-13.936 5.42-20.782 8.594l-23.594-8.28-8.625 25.874c-12.263 7.768-23.966 16.49-34.876 26.062C124.307 122.443 296.518 88.99 384.938 108.562c-1.12 6.798-3.333 13.35-6.47 19.344l95.344 19.188c2.99-7.75 5.585-15.71 7.625-23.563-3.558 2.29-7.502 5.33-11.968 4.72-46.308-6.31-43.81-54.725-8.345-59.813 10.903-1.57 21.15 3.193 27.563 11.22 1-10.184 1.808-35.654 2.187-45.907-55.332 4.938-95.695-13.84-145.28-13.47z" />
            </symbol>
            <symbol id="icon-warg" x="0px" y="0px" viewBox="0 0 476.399 476.399">
                <g>
                    <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="46.6623" y1="218.2638" x2="46.6623"
                        y2="239.0038">
                        <stop offset="0" style="stop-color:#FFFFFF" />
                        <stop offset="0.1483" style="stop-color:#F3F3F3" />
                        <stop offset="0.4168" style="stop-color:#D3D3D3" />
                        <stop offset="0.7721" style="stop-color:#A0A0A0" />
                        <stop offset="1" style="stop-color:#7B7B7B" />
                    </linearGradient>
                    <path style="fill:url(#SVGID_1_);" d="M49.664,236.014c-0.37,0.22-0.74,0.42-1.1,0.66c-1.28,0.82-2.54,1.6-3.78,2.33
  c-1.22-4.73-2.18-12.5,1.23-20.74C47.124,225.564,48.664,232.134,49.664,236.014z" />
                    <linearGradient id="SVGID_2_" gradientUnits="userSpaceOnUse" x1="30.3603" y1="219.2538" x2="30.3603"
                        y2="246.4338">
                        <stop offset="0" style="stop-color:#FFFFFF" />
                        <stop offset="0.1483" style="stop-color:#F3F3F3" />
                        <stop offset="0.4168" style="stop-color:#D3D3D3" />
                        <stop offset="0.7721" style="stop-color:#A0A0A0" />
                        <stop offset="1" style="stop-color:#7B7B7B" />
                    </linearGradient>
                    <path style="fill:url(#SVGID_2_);" d="M24.324,219.254c3.43,9.93,8.8,18.94,12.17,24.08c-3.25,1.45-6.28,2.5-9.03,3.1
  C25.454,238.354,23.804,227.634,24.324,219.254z" />
                    <linearGradient id="SVGID_3_" gradientUnits="userSpaceOnUse" x1="24.4287" y1="140.2138" x2="24.4287"
                        y2="122.0938">
                        <stop offset="0" style="stop-color:#FFFFFF" />
                        <stop offset="0.2343" style="stop-color:#FCFCFC" />
                        <stop offset="0.4049" style="stop-color:#F3F3F3" />
                        <stop offset="0.5551" style="stop-color:#E3E3E3" />
                        <stop offset="0.6937" style="stop-color:#CCCCCC" />
                        <stop offset="0.8243" style="stop-color:#B0B0B0" />
                        <stop offset="0.9473" style="stop-color:#8C8C8C" />
                        <stop offset="1" style="stop-color:#7B7B7B" />
                    </linearGradient>
                    <path style="fill:url(#SVGID_3_);" d="M23.674,122.094l4.15,4.26c-0.34,2.02-0.85,5.38-1.32,9.71l-0.64-0.86
  c-0.37,0.27-1.8,1.45-4.83,5.01C21.604,134.344,22.664,127.684,23.674,122.094z" />
                    <linearGradient id="SVGID_4_" gradientUnits="userSpaceOnUse" x1="39.8637" y1="156.1238" x2="39.8637"
                        y2="132.9538">
                        <stop offset="0" style="stop-color:#FFFFFF" />
                        <stop offset="0.2343" style="stop-color:#FCFCFC" />
                        <stop offset="0.4049" style="stop-color:#F3F3F3" />
                        <stop offset="0.5551" style="stop-color:#E3E3E3" />
                        <stop offset="0.6937" style="stop-color:#CCCCCC" />
                        <stop offset="0.8243" style="stop-color:#B0B0B0" />
                        <stop offset="0.9473" style="stop-color:#8C8C8C" />
                        <stop offset="1" style="stop-color:#7B7B7B" />
                    </linearGradient>
                    <path style="fill:url(#SVGID_4_);" d="M46.294,140.144c-2.14,2.71-7.71,9.75-12.86,15.98c-0.01-9.35,0.8-17.64,1.51-23.17
  C38.484,135.774,42.284,138.184,46.294,140.144z" />
                    <linearGradient id="SVGID_5_" gradientUnits="userSpaceOnUse" x1="57.9937" y1="160.5438" x2="57.9937"
                        y2="143.3338">
                        <stop offset="0" style="stop-color:#FFFFFF" />
                        <stop offset="0.2343" style="stop-color:#FCFCFC" />
                        <stop offset="0.4049" style="stop-color:#F3F3F3" />
                        <stop offset="0.5551" style="stop-color:#E3E3E3" />
                        <stop offset="0.6937" style="stop-color:#CCCCCC" />
                        <stop offset="0.8243" style="stop-color:#B0B0B0" />
                        <stop offset="0.9473" style="stop-color:#8C8C8C" />
                        <stop offset="1" style="stop-color:#7B7B7B" />
                    </linearGradient>
                    <path style="fill:url(#SVGID_5_);" d="M63.454,145.574c-4.1,4.42-7.81,9.8-10.92,14.97l1.66-17.21
  C57.204,144.324,60.304,145.064,63.454,145.574z" />
                    <linearGradient id="SVGID_6_" gradientUnits="userSpaceOnUse" x1="75.5137" y1="153.6788" x2="63.5537"
                        y2="153.6788">
                        <stop offset="0" style="stop-color:#000000" />
                        <stop offset="1" style="stop-color:#FF0000" />
                    </linearGradient>
                    <path style="fill:url(#SVGID_6_);" d="M75.514,146.324l-5.27,13.46c-0.16,0.4-0.24,0.83-0.26,1.25c-2.5-1.18-4.67-2.12-6.43-2.84
  c3.33-4.75,7.06-9.09,10.93-11.85C74.834,146.334,75.174,146.334,75.514,146.324z" />
                    <linearGradient id="SVGID_7_" gradientUnits="userSpaceOnUse" x1="88.2887" y1="153.8038" x2="88.2887"
                        y2="145.3745">
                        <stop offset="0" style="stop-color:#FFFFFF" />
                        <stop offset="0.2343" style="stop-color:#FCFCFC" />
                        <stop offset="0.4049" style="stop-color:#F3F3F3" />
                        <stop offset="0.5551" style="stop-color:#E3E3E3" />
                        <stop offset="0.6937" style="stop-color:#CCCCCC" />
                        <stop offset="0.8243" style="stop-color:#B0B0B0" />
                        <stop offset="0.9473" style="stop-color:#8C8C8C" />
                        <stop offset="1" style="stop-color:#7B7B7B" />
                    </linearGradient>
                    <path style="fill:url(#SVGID_7_);" d="M95.394,147.714l-14.21,6.09l3.19-8.16l2.54-0.22
  C89.954,145.154,92.954,146.004,95.394,147.714z" />
                    <linearGradient id="SVGID_8_" gradientUnits="userSpaceOnUse" x1="106.7737" y1="165.9438"
                        x2="106.7737" y2="156.4338">
                        <stop offset="0" style="stop-color:#FFFFFF" />
                        <stop offset="0.2343" style="stop-color:#FCFCFC" />
                        <stop offset="0.4049" style="stop-color:#F3F3F3" />
                        <stop offset="0.5551" style="stop-color:#E3E3E3" />
                        <stop offset="0.6937" style="stop-color:#CCCCCC" />
                        <stop offset="0.8243" style="stop-color:#B0B0B0" />
                        <stop offset="0.9473" style="stop-color:#8C8C8C" />
                        <stop offset="1" style="stop-color:#7B7B7B" />
                    </linearGradient>
                    <path style="fill:url(#SVGID_8_);"
                        d="M111.464,160.764l-9.38,5.18l1.53-9.51C105.904,158.434,108.594,159.904,111.464,160.764z" />
                    <linearGradient id="SVGID_9_" gradientUnits="userSpaceOnUse" x1="127.0237" y1="190.5613"
                        x2="137.4437" y2="190.5613">
                        <stop offset="0" style="stop-color:#FFFFFF" />
                        <stop offset="0.2343" style="stop-color:#FCFCFC" />
                        <stop offset="0.4049" style="stop-color:#F3F3F3" />
                        <stop offset="0.5551" style="stop-color:#E3E3E3" />
                        <stop offset="0.6937" style="stop-color:#CCCCCC" />
                        <stop offset="0.8243" style="stop-color:#B0B0B0" />
                        <stop offset="0.9473" style="stop-color:#8C8C8C" />
                        <stop offset="1" style="stop-color:#7B7B7B" />
                    </linearGradient>
                    <path style="fill:url(#SVGID_9_);" d="M134.894,186.454c0.56,2.31,1.41,4.54,2.55,6.61c-2.62,1.01-6.36,1.98-10.42,1.46
  C130.324,191.924,132.904,189.124,134.894,186.454z" />
                    <linearGradient id="SVGID_10_" gradientUnits="userSpaceOnUse" x1="168.026" y1="222.7508"
                        x2="114.1337" y2="222.7508">
                        <stop offset="0" style="stop-color:#000000" />
                        <stop offset="1" style="stop-color:#FF0000" />
                    </linearGradient>
                    <path style="fill:url(#SVGID_10_);" d="M167.044,206.274c2.03,10.15,0.92,18.01-3.39,24.01c-5.95,8.29-18.57,13.43-37.51,15.28
  c-4.22,0.42-8.22,0.46-12.01,0.25c5.53-3.68,9.69-9.14,11.85-15.77c3.13-9.61,1.39-20.17-4.66-28.25
  c-0.13-0.19-0.28-0.36-0.42-0.54c2.88,1.03,5.72,1.44,8.37,1.44c5.57-0.01,10.37-1.76,13.28-3.13c0.33,0.3,0.66,0.58,1.01,0.86
  c5.34,4.31,12.02,6.24,18.82,5.42C163.964,205.654,165.564,205.794,167.044,206.274z" />
                    <linearGradient id="SVGID_11_" gradientUnits="userSpaceOnUse" x1="95.9587" y1="229.4238"
                        x2="95.9587" y2="269.7337">
                        <stop offset="0" style="stop-color:#000000" />
                        <stop offset="1" style="stop-color:#FF0000" />
                    </linearGradient>
                    <path style="fill:url(#SVGID_11_);" d="M57.814,261.984c-7.33-5.27-16.29-7.62-25.23-6.61c-4.48,0.5-9.54,0.6-13.93-0.47
  c1.08,0.1,2.24,0.17,3.51,0.17c8.37,0,18.71-3.93,30.74-11.68c7.41-4.78,16.67-5.01,24.16-0.6c3.72,2.19,8.29,4.46,13.66,6.39
  c1.16,0.41,6.04,1.91,7.25,2.22c8.26,2.11,17.97,3.2,28.95,2.13c21.63-2.12,35.78-8.2,43.23-18.59c1.24-1.72,2.27-3.57,3.11-5.52
  c-1.68,9.03-5.86,17.52-12.24,24.43c-9.83,10.65-23.78,16.42-38.26,15.84c-8.3-0.33-16.58-2.55-23.93-6.4l-9.1-4.78
  c-7.24-3.79-15.87-2.35-22.03,3.02C64.934,263.934,60.794,264.134,57.814,261.984z" />
                    <linearGradient id="SVGID_12_" gradientUnits="userSpaceOnUse" x1="95.5237" y1="165.4338"
                        x2="76.7037" y2="165.4338">
                        <stop offset="0" style="stop-color:#000000" />
                        <stop offset="1" style="stop-color:#FF0000" />
                    </linearGradient>
                    <path style="fill:url(#SVGID_12_);" d="M95.524,156.364l-2.65,16.42c-0.09,0.58-0.05,1.17,0.1,1.72
  c-5.77-4.11-11.35-7.45-16.27-10.08L95.524,156.364z" />
                    <linearGradient id="SVGID_13_" gradientUnits="userSpaceOnUse" x1="133.3437" y1="177.4338"
                        x2="96.9237" y2="177.4338">
                        <stop offset="0" style="stop-color:#000000" />
                        <stop offset="1" style="stop-color:#FF0000" />
                    </linearGradient>
                    <path style="fill:url(#SVGID_13_);" d="M132.994,168.504l0.35,3.86c-0.73,2.45-4.5,13.03-17.04,19.59
  c-0.74,0.39-1.32,0.99-1.69,1.7c-5.67-6.29-11.73-11.68-17.69-16.24c0.63-0.02,1.26-0.18,1.83-0.49l28.43-15.71
  c0.8,0.27,1.58,0.65,2.28,1.15C131.484,163.794,132.774,166.034,132.994,168.504z" />
                    <linearGradient id="SVGID_14_" gradientUnits="userSpaceOnUse" x1="173.2937" y1="143.7088"
                        x2="179.3537" y2="143.7088">
                        <stop offset="0" style="stop-color:#FFFFFF" />
                        <stop offset="0.2343" style="stop-color:#FCFCFC" />
                        <stop offset="0.4049" style="stop-color:#F3F3F3" />
                        <stop offset="0.5551" style="stop-color:#E3E3E3" />
                        <stop offset="0.6937" style="stop-color:#CCCCCC" />
                        <stop offset="0.8243" style="stop-color:#B0B0B0" />
                        <stop offset="0.9473" style="stop-color:#8C8C8C" />
                        <stop offset="1" style="stop-color:#7B7B7B" />
                    </linearGradient>
                    <path style="fill:url(#SVGID_14_);" d="M179.354,141.294c-0.96,1.68-1.93,3.65-2.72,5.72c-0.32-0.49-0.64-1-0.94-1.54
  c-1.01-1.75-1.8-3.5-2.4-5.07C175.304,140.784,177.324,141.074,179.354,141.294z" />
                    <linearGradient id="SVGID_15_" gradientUnits="userSpaceOnUse" x1="183.1237" y1="148.6836"
                        x2="203.8533" y2="148.6836">
                        <stop offset="0" style="stop-color:#FFFFFF" />
                        <stop offset="0.2343" style="stop-color:#FCFCFC" />
                        <stop offset="0.4049" style="stop-color:#F3F3F3" />
                        <stop offset="0.5551" style="stop-color:#E3E3E3" />
                        <stop offset="0.6937" style="stop-color:#CCCCCC" />
                        <stop offset="0.8243" style="stop-color:#B0B0B0" />
                        <stop offset="0.9473" style="stop-color:#8C8C8C" />
                        <stop offset="1" style="stop-color:#7B7B7B" />
                    </linearGradient>
                    <path style="fill:url(#SVGID_15_);" d="M203.764,139.994c0.31,4.83-0.05,11.59-3.25,15.03c-1.77,1.91-4.39,2.65-8.02,2.24
  c-3.48-0.39-6.6-1.54-9.37-3.43c0.27-3.65,3.18-8.95,5.39-12.12C193.624,141.644,198.724,141.074,203.764,139.994z" />
                    <linearGradient id="SVGID_16_" gradientUnits="userSpaceOnUse" x1="150.1037" y1="110.6144"
                        x2="167.7737" y2="110.6144">
                        <stop offset="0" style="stop-color:#999999" />
                        <stop offset="1" style="stop-color:#656565" />
                    </linearGradient>
                    <path style="fill:url(#SVGID_16_);" d="M167.774,109.074l-15.21,4.18c-0.69-1.2-1.5-2.33-2.46-3.34
  C155.734,107.654,161.954,107.364,167.774,109.074z" />
                    <linearGradient id="SVGID_17_" gradientUnits="userSpaceOnUse" x1="33.8563" y1="70.2179" x2="33.8563"
                        y2="102.6238">
                        <stop offset="0.0126" style="stop-color:#919191" />
                        <stop offset="1" style="stop-color:#000000" />
                    </linearGradient>
                    <path style="fill:url(#SVGID_17_);" d="M40.034,73.224l4.63,8.09c-2.45,14.6-14.26,19.65-20.53,21.31l-0.9-7.89
  c-0.93-8.17,1.68-16.38,7.17-22.52c1.29-1.45,3.14-2.17,5.08-1.96C37.414,70.454,39.074,71.544,40.034,73.224z" />
                    <linearGradient id="SVGID_18_" gradientUnits="userSpaceOnUse" x1="388.4137" y1="134.1915"
                        x2="264.8837" y2="134.1915">
                        <stop offset="0.3425" style="stop-color:#222222" />
                        <stop offset="1" style="stop-color:#656565" />
                    </linearGradient>
                    <path style="fill:url(#SVGID_18_);" d="M376.394,138.534c3.26,4.11,6.61,8.32,12.02,11.58c-9.92,6.02-23.88,6.56-27.31,6.6
  c-8.35-3.61-14.62-6.13-17.16-7.13c-7.96-10.96-20.68-17.47-34.29-17.47h-14.03c-9.13-7.79-19.57-13.71-30.74-17.57
  c18-2.76,46.84-5.23,73.16,1.12C363.004,121.694,370.124,130.644,376.394,138.534z" />
                    <linearGradient id="SVGID_19_" gradientUnits="userSpaceOnUse" x1="115.8498" y1="47.1628"
                        x2="314.4037" y2="391.0682">
                        <stop offset="0" style="stop-color:#666666" />
                        <stop offset="0.3425" style="stop-color:#222222" />
                        <stop offset="1" style="stop-color:#656565" />
                    </linearGradient>
                    <path style="fill:url(#SVGID_19_);" d="M460.594,279.654l-45.28-0.61c-1.72-0.01-3.29,1.08-3.84,2.73
  c-0.56,1.65,0.02,3.47,1.43,4.5l33.29,24.36l-83.5,2.67c-1.01,0.03-2.01,0.38-2.74,1.08c-1.44,1.38-1.63,3.49-0.64,5.06
  l21.21,33.45l-79.26-39.92c-1.43-0.72-3.15-0.52-4.37,0.51c-1.23,1.03-1.72,2.69-1.25,4.22l11.13,36.71l-29.79-26.4
  c-1.19-1.06-2.9-1.31-4.34-0.64s-2.35,2.13-2.32,3.72l0.54,24.72l-8.78-9.2c-0.89-0.93-2.16-1.47-3.44-1.31
  c-2.11,0.25-3.58,2.02-3.55,4.02l0.6,48.02l-25.33-35.91c-0.7-0.98-1.8-1.6-3-1.68c-1.19-0.09-2.37,0.38-3.19,1.26l-23.62,25.33
  l1.58-25.26c0.09-1.58-0.66-3.14-2.05-3.89c-1.98-1.07-4.35-0.34-5.41,1.52c-0.07,0.11-5.79,9.93-15.23,13.49
  c2.74-12.6,0.04-24.79-8.04-36.32c-25.85-36.88-99.18-55.32-113.43-55.32c-15.23,0-38.98-2.88-46.76-19.87
  c5.65,2.73,13.18,3.65,22.27,2.63c6.96-0.79,13.94,1.05,19.66,5.16c6.05,4.35,14.46,3.89,20-1.09c3.59-3.23,8.88-3.89,13.15-1.65
  l8.82,4.63c8.4,4.41,17.85,6.94,27.33,7.32c16.82,0.65,33.03-6.04,44.46-18.41c11.23-12.16,16.63-28.49,14.89-44.92
  c-0.5-4.68-2.58-9.13-6.14-12.21c-4.02-3.49-9.22-5-14.46-4.22c-1.88,0.28-3.81,0.31-5.64-0.2c-7.72-2.16-12.64-8.2-13.29-15.37
  l-1.27-14.27c-0.33-3.61-1.71-7.09-4.13-9.79c-4.19-4.65-10.45-6.48-16.31-5.02c-4.74,1.18-9.83-0.47-12.97-4.2l-3.59-4.27
  c-4.36-5.19-11.01-7.95-17.76-7.36l-8.37,0.72c-16.01,1.38-31.65-4.43-42.87-15.93l-6.04-6.19c-1.52-1.57-2.7-3.45-3.46-5.49
  c9.75-2.37,23.45-9.89,26.84-26.73c1.99-0.07,3.99,0.83,5.3,2.72c0.48,0.69,0.72,1.51,0.87,2.34c1.31,7.13,6.72,12.77,13.8,14.38
  l40.84,9.3c7.25,1.65,14.93,1.68,22.2,0.09c2.71-0.59,5.45-0.01,7.7,1.64c2.11,1.55,3.43,3.96,3.82,6.56l3.06,20.48
  c0.33,2.18,2.36,3.69,4.55,3.36c2.18-0.33,3.69-2.37,3.36-4.55l-0.67-4.47c0.27,0.17,0.55,0.32,0.86,0.42l4.86,1.62
  c0.42,0.14,0.83,0.26,1.25,0.39c2.38,9.75,10.37,25.2,27.48,27.1c0.93,0.11,1.82,0.15,2.66,0.15c6.18,0,9.96-2.58,12.12-4.91
  c0.36-0.4,0.7-0.82,1.03-1.26c9.63,5.25,26.22,7.3,28.36,7.54c0.15,0.02,0.3,0.03,0.46,0.03c2,0,3.73-1.51,3.97-3.54
  c0.25-2.2-1.33-4.18-3.52-4.44c-7.41-0.85-19.98-3.37-25.92-6.85c0.63-2.43,1-5.15,1.06-8.17c0.05-2.2-0.07-4.22-0.22-5.82
  c4.96-1.12,10.12,0.83,13.09,5.05c4.88,6.93,12.79,10.98,21.15,10.98c1.01,0,2.02-0.06,3.04-0.18c2.19-0.26,3.76-2.25,3.5-4.44
  c-0.25-2.19-2.24-3.77-4.44-3.51c-6.52,0.77-12.93-2.09-16.71-7.46c-5.18-7.35-14.41-10.49-23-7.82
  c-14.05,4.37-28.87,4.22-42.83-0.43l-4.86-1.62c-1.58-0.52-3.25-0.01-4.28,1.18l-1.32-8.8l51.71-14.2c2.2-0.61,3.67,0.6,4.2,1.15
  c0.52,0.55,1.68,2.06,0.99,4.23c-0.38,1.21-0.17,2.54,0.59,3.57c0.75,1.03,1.95,1.64,3.22,1.64h18.03
  c21.3,0,41.82,7.75,57.79,21.83c0.74,0.65,1.68,1,2.65,1h15.52c11.38,0,22,5.61,28.41,15.01c0.45,0.66,1.1,1.18,1.85,1.47
  c0.72,0.28,68.23,26.75,96.5,50.81c-28.01,13.19-52,17.85-71.39,13.87c-1.46-0.3-2.97,0.23-3.91,1.39
  c-12,14.77-34.19,12.17-47.32,8.93l14.53-2.46c1.81-0.31,3.18-1.81,3.32-3.64c0.14-1.83-0.98-3.52-2.72-4.1
  c-0.09-0.03-3.97-1.34-9.42-3.83c15.36,2.02,29.42,1.75,30.33,1.73c1.84-0.05,3.41-1.33,3.82-3.13c0.4-1.79-0.47-3.63-2.12-4.45
  l-42.6-21.28l18.56-1.96c4.59,0.64,9.36,0.48,14.14-0.59l9.67-2.17c20.68-4.65,41.94,4.41,52.92,22.52
  c0.75,1.24,2.07,1.92,3.42,1.92c0.71,0,1.43-0.18,2.07-0.58c1.89-1.14,2.5-3.6,1.35-5.49c-12.76-21.05-37.48-31.57-61.51-26.18
  l-9.68,2.17c-14.39,3.24-28.83-3.83-35.11-17.16c-4.42-9.39-12.57-16.78-22.36-20.25l-20.45-7.27c-2.08-0.74-4.37,0.35-5.11,2.43
  c-0.74,2.08,0.35,4.37,2.43,5.11l20.45,7.27c7.79,2.76,14.28,8.64,17.8,16.12c3.12,6.61,7.84,11.99,13.52,15.84l-16.57,1.74
  c-1.76,0.19-3.2,1.52-3.51,3.27c-0.32,1.75,0.55,3.5,2.14,4.29l38.55,19.26c-10.95-0.78-24.66-2.59-34.44-6.73
  c-1.82-0.77-3.94-0.09-4.97,1.6c-1.03,1.7-0.67,3.89,0.85,5.16c6.59,5.49,14.11,9.76,20.33,12.79l-26.82,4.55
  c-2.17,0.37-3.64,2.44-3.27,4.61c0.33,1.96,2.02,3.34,3.94,3.34c0.22,0,0.45-0.02,0.67-0.06l8.84-1.5
  c1.42,0.53,2.76,0.97,3.45,1.26c0.46,0.18,11.36,4.61,24.92,5.99c2.62,0.26,5.16,0.39,7.61,0.39c13.99,0,25.25-4.28,32.97-12.58
  c14.49,2.48,31.07,0.73,49.51-5.15l18.79,11.66l-14.78,2.68c-1.21,0.22-2.31,0.92-2.91,1.99c-0.99,1.79-0.49,3.93,1.03,5.12
  L460.594,279.654z M280.084,301.784c1.1-1.92,0.43-4.37-1.49-5.46c-1.91-1.1-4.36-0.43-5.45,1.48c-0.1,0.17-8.18,14.19-19.08,24.7
  c-0.59-12.02-6.35-23.2-6.66-23.8c-0.69-1.32-2.05-2.14-3.54-2.15h-0.01c-1.48,0-2.84,0.82-3.53,2.13
  c-0.48,0.89-9.55,18.25-11.29,38.27c-9.56-20.07-13.16-50.94-13.2-51.31c-0.25-2.2-2.23-3.77-4.43-3.53
  c-2.19,0.25-3.77,2.23-3.52,4.43c0.22,1.98,5.67,48.7,22.35,66.95c0.78,0.85,1.86,1.31,2.96,1.31c0.56,0,1.13-0.12,1.67-0.37
  c1.58-0.73,2.51-2.4,2.29-4.13c-1.83-14.7,2.9-30.26,6.53-39.52c1.86,5.73,3.45,13.43,1.65,19.91c-0.45,1.63,0.16,3.36,1.54,4.34
  c1.38,0.97,3.22,0.98,4.61,0.01C267.264,324.004,279.564,302.684,280.084,301.784z" />
                    <path d="M278.594,296.324c1.92,1.09,2.59,3.54,1.49,5.46c-0.52,0.9-12.82,22.22-28.6,33.26c-1.39,0.97-3.23,0.96-4.61-0.01
  c-1.38-0.98-1.99-2.71-1.54-4.34c1.8-6.48,0.21-14.18-1.65-19.91c-3.63,9.26-8.36,24.82-6.53,39.52c0.22,1.73-0.71,3.4-2.29,4.13
  c-0.54,0.25-1.11,0.37-1.67,0.37c-1.1,0-2.18-0.46-2.96-1.31c-16.68-18.25-22.13-64.97-22.35-66.95c-0.25-2.2,1.33-4.18,3.52-4.43
  c2.2-0.24,4.18,1.33,4.43,3.53c0.04,0.37,3.64,31.24,13.2,51.31c1.74-20.02,10.81-37.38,11.29-38.27c0.69-1.31,2.05-2.13,3.53-2.13
  h0.01c1.49,0.01,2.85,0.83,3.54,2.15c0.31,0.6,6.07,11.78,6.66,23.8c10.9-10.51,18.98-24.53,19.08-24.7
  C274.234,295.894,276.684,295.224,278.594,296.324z" />
                    <path d="M474.864,280.654l-45.54-35.62l16.23-2.94c1.28-0.24,2.43-1.01,3-2.18c0.94-1.92,0.24-4.12-1.47-5.18l-22.15-13.74
  c6.53-2.5,13.25-5.46,20.2-8.92c0.7-0.35,1.32-0.86,1.73-1.53c0.99-1.66,0.68-3.67-0.59-4.93c-15.17-15.17-46.42-31.3-70.65-42.43
  c7.74-1.56,16.77-4.71,23.12-11.01c0.67-0.67,1.14-1.56,1.22-2.5c0.18-1.89-0.95-3.56-2.63-4.17c-7.23-2.58-10.52-6.71-14.68-11.94
  c-6.72-8.47-15.09-19.01-42.73-25.68c-41.58-10.03-87.5,0.55-94.11,2.18c-4-0.51-8.05-0.78-12.12-0.78h-13.74
  c-0.32-2.59-1.46-5.04-3.33-6.99c-3.12-3.23-7.74-4.51-12.08-3.32l-24.79,6.81l-2.86-1.55c-11.02-5.99-24.25-5.61-34.9,0.85
  c-2.71-0.74-5.58-0.84-8.36-0.23c-6.13,1.33-12.6,1.31-18.72-0.09l-40.83-9.29c-3.97-0.91-7.01-4.09-7.73-8.09
  c-0.74-4.17-3.29-7.74-6.99-9.79c-2.65-1.47-5.64-2.04-8.56-1.66l-3.6-6.3c-2.35-4.1-6.51-6.98-11.23-7.37
  c-4.39-0.36-8.58,1.31-11.54,4.62c-7,7.84-10.33,18.32-9.15,28.76l1.39,12.18c0.15,1.38,0.44,2.73,0.84,4.05
  c-1.14,5.41-6.01,29.51-4.68,40.48c0.13,1.1,0.63,2.15,1.49,2.85c0.77,0.63,1.65,0.9,2.51,0.9c1.25,0,2.46-0.59,3.22-1.63
  c2.27-3.08,4.1-5.45,5.58-7.28c-0.28,5.9-0.32,12.56,0.15,19.51c0.08,1.25,0.69,2.45,1.72,3.16c1.72,1.17,3.94,0.84,5.25-0.62
  c3.33-3.69,8.16-9.57,12.32-14.74l-2.49,25.97c-0.18,1.85,0.84,3.69,2.59,4.32c0.46,0.16,0.92,0.24,1.37,0.24
  c1.58,0,3.06-0.95,3.69-2.46c0.07-0.16,3.59-8.54,8.92-17.51c8.99,3.57,36.79,16.16,55.77,41.52c4.49,6,5.78,13.84,3.45,20.99
  c-2.27,6.97-7.54,12.19-14.45,14.31c-0.04,0.02-0.08,0.03-0.12,0.04c-3.42,1.03-7.09,0.9-10.45-0.31
  c-4.81-1.72-8.9-3.76-12.23-5.72c-7.37-4.34-16.01-5.33-24.01-3.07c-1.48-5.95-3.83-16.72-4.32-26.6
  c-0.08-1.63-1.15-3.05-2.68-3.58c-1.54-0.53-3.25-0.08-4.33,1.14c-6.59,7.53-9.23,15.38-9.93,22.31c-3.22-6.6-6.11-14.3-6.69-21.51
  c-0.12-1.56-1.14-2.9-2.6-3.44c-1.46-0.54-3.11-0.18-4.21,0.93c-9.81,9.8-5.47,34.25-2.99,44.87c-2.83-0.28-3.48-0.93-3.51-0.96
  c-0.27-0.29-0.13-1.97-0.06-2.88c0.22-2.84,0.65-8.12-4.79-10.84c-3.85-1.92-6.47-0.66-7.69,0.26c-4.23,3.2-3.52,11.2-2.66,15.92
  c0.23,25.5,21.08,40.12,57.32,40.12c11.9,0,82.71,17.43,106.88,51.91c8.01,11.43,9.7,23.08,5.15,35.61
  c-0.45,1.26-0.25,2.66,0.55,3.74c0.79,1.07,2.09,1.69,3.41,1.62c8.19-0.41,14.75-4.51,19.42-8.77l-1.51,24.17
  c-0.08,1.33,0.42,2.67,1.46,3.5c1.7,1.36,4.06,1.12,5.45-0.38l27.88-29.89l29.92,42.41c0.76,1.08,1.99,1.7,3.27,1.7
  c0.41,0,0.83-0.07,1.23-0.2c1.67-0.54,2.79-2.1,2.77-3.85l-0.64-50.75l8.89,9.3c0.89,0.94,2.17,1.48,3.45,1.32
  c2.12-0.27,3.58-2.06,3.53-4.07l-0.56-25.86l33.53,29.71c1.54,1.37,3.93,1.36,5.48-0.16c1.08-1.07,1.4-2.69,0.96-4.14l-12.49-41.17
  l83.84,42.24c1.87,0.94,4.19,0.3,5.28-1.59c0.76-1.32,0.63-2.97-0.18-4.25l-25.12-39.64l88.23-2.82c1.71-0.05,3.19-1.18,3.69-2.81
  c0.51-1.64-0.08-3.41-1.46-4.41l-32.55-23.82l44.61,0.59h0.04c1.12,0,2.21-0.43,2.95-1.26
  C476.984,284.684,476.634,282.034,474.864,280.654z M338.044,115.664c24.96,6.03,32.08,14.98,38.35,22.87
  c3.26,4.11,6.61,8.32,12.02,11.58c-9.92,6.02-23.88,6.56-27.31,6.6c-8.35-3.61-14.62-6.13-17.16-7.13
  c-7.96-10.96-20.68-17.47-34.29-17.47h-14.03c-9.13-7.79-19.57-13.71-30.74-17.57C282.884,111.784,311.724,109.314,338.044,115.664
  z M167.774,109.074l-15.21,4.18c-0.69-1.2-1.5-2.33-2.46-3.34C155.734,107.654,161.954,107.364,167.774,109.074z M30.404,72.214
  c1.29-1.45,3.14-2.17,5.08-1.96c1.93,0.2,3.59,1.29,4.55,2.97l4.63,8.09c-2.45,14.6-14.26,19.65-20.53,21.31l-0.9-7.89
  C22.304,86.564,24.914,78.354,30.404,72.214z M21.034,140.214c0.57-5.87,1.63-12.53,2.64-18.12l4.15,4.26
  c-0.292,1.735-0.709,4.464-1.119,7.941l-1.481,1.409l0.017,0.022C24.507,136.382,23.177,137.696,21.034,140.214z M33.434,156.124
  c-0.01-9.35,0.8-17.64,1.51-23.17c3.54,2.82,7.34,5.23,11.35,7.19C44.154,142.854,38.584,149.894,33.434,156.124z M52.534,160.544
  l1.66-17.21c3.01,0.99,6.11,1.73,9.26,2.24C59.354,149.994,55.644,155.374,52.534,160.544z M70.244,159.784
  c-0.16,0.4-0.24,0.83-0.26,1.25c-2.5-1.18-4.67-2.12-6.43-2.84c3.33-4.75,7.06-9.09,10.93-11.85c0.35-0.01,0.69-0.01,1.03-0.02
  L70.244,159.784z M92.974,174.504c-5.77-4.11-11.35-7.45-16.27-10.08l18.82-8.06l-2.65,16.42
  C92.784,173.364,92.824,173.954,92.974,174.504z M81.184,153.804l3.19-8.16l2.54-0.22c3.04-0.27,6.04,0.58,8.48,2.29
  L81.184,153.804z M116.304,191.954c-0.74,0.39-1.32,0.99-1.69,1.7c-5.67-6.29-11.73-11.68-17.69-16.24
  c0.63-0.02,1.26-0.18,1.83-0.49l28.43-15.71c0.8,0.27,1.58,0.65,2.28,1.15c2.02,1.43,3.31,3.67,3.53,6.14l0.35,3.86
  C132.614,174.814,128.844,185.394,116.304,191.954z M102.084,165.944l1.53-9.51c2.29,2,4.98,3.47,7.85,4.33L102.084,165.944z
  M134.894,186.454c0.56,2.31,1.41,4.54,2.55,6.61c-2.62,1.01-6.36,1.98-10.42,1.46
  C130.324,191.924,132.904,189.124,134.894,186.454z M125.984,230.044c3.13-9.61,1.39-20.17-4.66-28.25
  c-0.13-0.19-0.28-0.36-0.42-0.54c2.88,1.03,5.72,1.44,8.37,1.44c5.57-0.01,10.37-1.76,13.28-3.13c0.33,0.3,0.66,0.58,1.01,0.86
  c5.34,4.31,12.02,6.24,18.82,5.42c1.58-0.19,3.18-0.05,4.66,0.43c2.03,10.15,0.92,18.01-3.39,24.01
  c-5.95,8.29-18.57,13.43-37.51,15.28c-4.22,0.42-8.22,0.46-12.01,0.25C119.664,242.134,123.824,236.674,125.984,230.044z
  M46.014,218.264c1.11,7.3,2.65,13.87,3.65,17.75c-0.37,0.22-0.74,0.42-1.1,0.66c-1.28,0.82-2.54,1.6-3.78,2.33
  C43.564,234.274,42.604,226.504,46.014,218.264z M24.324,219.254c3.43,9.93,8.8,18.94,12.17,24.08c-3.25,1.45-6.28,2.5-9.03,3.1
  C25.454,238.354,23.804,227.634,24.324,219.254z M22.164,255.074c8.37,0,18.71-3.93,30.74-11.68c7.41-4.78,16.67-5.01,24.16-0.6
  c3.72,2.19,8.29,4.46,13.66,6.39c1.16,0.41,6.04,1.91,7.25,2.22c8.26,2.11,17.97,3.2,28.95,2.13c21.63-2.12,35.78-8.2,43.23-18.59
  c1.24-1.72,2.27-3.57,3.11-5.52c-1.68,9.03-5.86,17.52-12.24,24.43c-9.83,10.65-23.78,16.42-38.26,15.84
  c-8.3-0.33-16.58-2.55-23.93-6.4l-9.1-4.78c-7.24-3.79-15.87-2.35-22.03,3.02c-2.77,2.4-6.91,2.6-9.89,0.45
  c-7.33-5.27-16.29-7.62-25.23-6.61c-4.48,0.5-9.54,0.6-13.93-0.47C19.734,255.004,20.894,255.074,22.164,255.074z M415.314,279.044
  c-1.72-0.01-3.29,1.08-3.84,2.73c-0.56,1.65,0.02,3.47,1.43,4.5l33.29,24.36l-83.5,2.67c-1.01,0.03-2.01,0.38-2.74,1.08
  c-1.44,1.38-1.63,3.49-0.64,5.06l21.21,33.45l-79.26-39.92c-1.43-0.72-3.15-0.52-4.37,0.51c-1.23,1.03-1.72,2.69-1.25,4.22
  l11.13,36.71l-29.79-26.4c-1.19-1.06-2.9-1.31-4.34-0.64s-2.35,2.13-2.32,3.72l0.54,24.72l-8.78-9.2
  c-0.89-0.93-2.16-1.47-3.44-1.31c-2.11,0.25-3.58,2.02-3.55,4.02l0.6,48.02l-25.33-35.91c-0.7-0.98-1.8-1.6-3-1.68
  c-1.19-0.09-2.37,0.38-3.19,1.26l-23.62,25.33l1.58-25.26c0.09-1.58-0.66-3.14-2.05-3.89c-1.98-1.07-4.35-0.34-5.41,1.52
  c-0.07,0.11-5.79,9.93-15.23,13.49c2.74-12.6,0.04-24.79-8.04-36.32c-25.85-36.88-99.18-55.32-113.43-55.32
  c-15.23,0-38.98-2.88-46.76-19.87c5.65,2.73,13.18,3.65,22.27,2.63c6.96-0.79,13.94,1.05,19.66,5.16c6.05,4.35,14.46,3.89,20-1.09
  c3.59-3.23,8.88-3.89,13.15-1.65l8.82,4.63c8.4,4.41,17.85,6.94,27.33,7.32c16.82,0.65,33.03-6.04,44.46-18.41
  c11.23-12.16,16.63-28.49,14.89-44.92c-0.5-4.68-2.58-9.13-6.14-12.21c-4.02-3.49-9.22-5-14.46-4.22c-1.88,0.28-3.81,0.31-5.64-0.2
  c-7.72-2.16-12.64-8.2-13.29-15.37l-1.27-14.27c-0.33-3.61-1.71-7.09-4.13-9.79c-4.19-4.65-10.45-6.48-16.31-5.02
  c-4.74,1.18-9.83-0.47-12.97-4.2l-3.59-4.27c-4.36-5.19-11.01-7.95-17.76-7.36l-8.37,0.72c-16.01,1.38-31.65-4.43-42.87-15.93
  l-6.04-6.19c-1.52-1.57-2.7-3.45-3.46-5.49c9.75-2.37,23.45-9.89,26.84-26.73c1.99-0.07,3.99,0.83,5.3,2.72
  c0.48,0.69,0.72,1.51,0.87,2.34c1.31,7.13,6.72,12.77,13.8,14.38l40.84,9.3c7.25,1.65,14.93,1.68,22.2,0.09
  c2.71-0.59,5.45-0.01,7.7,1.64c2.11,1.55,3.43,3.96,3.82,6.56l3.06,20.48c0.33,2.18,2.36,3.69,4.55,3.36
  c2.18-0.33,3.69-2.37,3.36-4.55l-0.67-4.47c0.27,0.17,0.55,0.32,0.86,0.42l4.86,1.62c0.42,0.14,0.83,0.26,1.25,0.39
  c2.38,9.75,10.37,25.2,27.48,27.1c0.93,0.11,1.82,0.15,2.66,0.15c6.18,0,9.96-2.58,12.12-4.91c0.36-0.4,0.7-0.82,1.03-1.26
  c9.63,5.25,26.22,7.3,28.36,7.54c0.15,0.02,0.3,0.03,0.46,0.03c2,0,3.73-1.51,3.97-3.54c0.25-2.2-1.33-4.18-3.52-4.44
  c-7.41-0.85-19.98-3.37-25.92-6.85c0.63-2.43,1-5.15,1.06-8.17c0.05-2.2-0.07-4.22-0.22-5.82c4.96-1.12,10.12,0.83,13.09,5.05
  c4.88,6.93,12.79,10.98,21.15,10.98c1.01,0,2.02-0.06,3.04-0.18c2.19-0.26,3.76-2.25,3.5-4.44c-0.25-2.19-2.24-3.77-4.44-3.51
  c-6.52,0.77-12.93-2.09-16.71-7.46c-5.18-7.35-14.41-10.49-23-7.82c-14.05,4.37-28.87,4.22-42.83-0.43l-4.86-1.62
  c-1.58-0.52-3.25-0.01-4.28,1.18l-1.32-8.8l51.71-14.2c2.2-0.61,3.67,0.6,4.2,1.15c0.52,0.55,1.68,2.06,0.99,4.23
  c-0.38,1.21-0.17,2.54,0.59,3.57c0.75,1.03,1.95,1.64,3.22,1.64h18.03c21.3,0,41.82,7.75,57.79,21.83c0.74,0.65,1.68,1,2.65,1
  h15.52c11.38,0,22,5.61,28.41,15.01c0.45,0.66,1.1,1.18,1.85,1.47c0.72,0.28,68.23,26.75,96.5,50.81
  c-28.01,13.19-52,17.85-71.39,13.87c-1.46-0.3-2.97,0.23-3.91,1.39c-12,14.77-34.19,12.17-47.32,8.93l14.53-2.46
  c1.81-0.31,3.18-1.81,3.32-3.64c0.14-1.83-0.98-3.52-2.72-4.1c-0.09-0.03-3.97-1.34-9.42-3.83c15.36,2.02,29.42,1.75,30.33,1.73
  c1.84-0.05,3.41-1.33,3.82-3.13c0.4-1.79-0.47-3.63-2.12-4.45l-42.6-21.28l18.56-1.96c4.59,0.64,9.36,0.48,14.14-0.59l9.67-2.17
  c20.68-4.65,41.94,4.41,52.92,22.52c0.75,1.24,2.07,1.92,3.42,1.92c0.71,0,1.43-0.18,2.07-0.58c1.89-1.14,2.5-3.6,1.35-5.49
  c-12.76-21.05-37.48-31.57-61.51-26.18l-9.68,2.17c-14.39,3.24-28.83-3.83-35.11-17.16c-4.42-9.39-12.57-16.78-22.36-20.25
  l-20.45-7.27c-2.08-0.74-4.37,0.35-5.11,2.43c-0.74,2.08,0.35,4.37,2.43,5.11l20.45,7.27c7.79,2.76,14.28,8.64,17.8,16.12
  c3.12,6.61,7.84,11.99,13.52,15.84l-16.57,1.74c-1.76,0.19-3.2,1.52-3.51,3.27c-0.32,1.75,0.55,3.5,2.14,4.29l38.55,19.26
  c-10.95-0.78-24.66-2.59-34.44-6.73c-1.82-0.77-3.94-0.09-4.97,1.6c-1.03,1.7-0.67,3.89,0.85,5.16
  c6.59,5.49,14.11,9.76,20.33,12.79l-26.82,4.55c-2.17,0.37-3.64,2.44-3.27,4.61c0.33,1.96,2.02,3.34,3.94,3.34
  c0.22,0,0.45-0.02,0.67-0.06l8.84-1.5c1.42,0.53,2.76,0.97,3.45,1.26c0.46,0.18,11.36,4.61,24.92,5.99
  c2.62,0.26,5.16,0.39,7.61,0.39c13.99,0,25.25-4.28,32.97-12.58c14.49,2.48,31.07,0.73,49.51-5.15l18.79,11.66l-14.78,2.68
  c-1.21,0.22-2.31,0.92-2.91,1.99c-0.99,1.79-0.49,3.93,1.03,5.12l43.22,33.81L415.314,279.044z M173.294,140.404
  c2.01,0.38,4.03,0.67,6.06,0.89c-0.96,1.68-1.93,3.65-2.72,5.72c-0.32-0.49-0.64-1-0.94-1.54
  C174.684,143.724,173.894,141.974,173.294,140.404z M183.124,153.834c0.27-3.65,3.18-8.95,5.39-12.12
  c5.11-0.07,10.21-0.64,15.25-1.72c0.31,4.83-0.05,11.59-3.25,15.03c-1.77,1.91-4.39,2.65-8.02,2.24
  C189.014,156.874,185.894,155.724,183.124,153.834z" />
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
            </symbol>
            <symbol width="32px" height="32px" id="icon-dungeon" viewBox="0 0 32 32">
                <path
                    d="M 16 5 C 14.962 5 13.959859 5.1547344 13.005859 5.4277344 L 14.447266 9.1796875 C 14.947266 9.0656875 15.466 9 16 9 C 16.534 9 17.052734 9.0656875 17.552734 9.1796875 L 18.994141 5.4277344 C 18.040141 5.1557344 17.038 5 16 5 z M 11.140625 6.1523438 C 9.640625 6.8983437 8.3334531 7.9741094 7.3144531 9.2871094 L 10.699219 11.441406 C 10.794906 11.330431 10.897782 11.225936 11 11.121094 L 11 11.130859 C 11.03 11.080859 11.080859 11.03 11.130859 11 L 11.113281 11 C 11.550813 10.571578 12.042212 10.198893 12.580078 9.8964844 L 11.140625 6.1523438 z M 20.859375 6.1523438 L 19.419922 9.8984375 C 19.955179 10.199772 20.440888 10.574268 20.876953 11 L 20.869141 11 C 20.919141 11.03 20.97 11.080859 21 11.130859 L 21 11.115234 C 21.166599 11.285851 21.325854 11.463392 21.474609 11.650391 L 24.939453 9.6289062 C 23.888453 8.1609063 22.488375 6.9623437 20.859375 6.1523438 z M 6.234375 10.970703 C 5.451375 12.481703 5 14.189 5 16 L 9 16 C 9 14.976 9.2270469 14.005906 9.6230469 13.128906 L 6.234375 10.970703 z M 16 11 C 15.66 11 15.32 11.029609 15 11.099609 L 15 25 L 17 25 L 17 11.099609 C 16.68 11.029609 16.34 11 16 11 z M 25.949219 11.353516 L 22.484375 13.375 C 22.813375 14.187 23 15.072 23 16 L 27 16 C 27 14.34 26.615219 12.768516 25.949219 11.353516 z M 13 12 C 11.79 12.91 11 14.37 11 16 L 11 25 L 13 25 L 13 12 z M 19 12 L 19 25 L 21 25 L 21 16 C 21 14.37 20.21 12.91 19 12 z M 5 18 L 5 22 L 9 22 L 9 18 L 5 18 z M 23 18 L 23 22 L 27 22 L 27 18 L 23 18 z M 5 24 L 5 27 L 9 27 L 9 24 L 5 24 z M 23 24 L 23 27 L 27 27 L 27 24 L 23 24 z" />
            </symbol>
            <symbol id="icon-lighthouse" viewBox="0 0 397.902 397.902">
                <g>
                    <rect x="0.399" y="379.903" style="fill:#B3B3B3;" width="397.105" height="17.999" />
                    <polygon style="fill:#E6E6E6;"
                        points="246.194,379.9 44.904,379.9 47.074,355.6 53.774,280.84 59.534,216.4 66.224,141.63 
 68.794,112.89 69.634,103.56 221.464,103.56 222.294,112.89 225.794,151.97 231.174,212.09 237.414,281.85 242.794,341.96 	" />
                    <polygon style="fill:#F93030;" points="145.547,0 145.547,0 80.138,26.28 210.956,26.28 	" />
                    <rect x="92.547" y="26.28" style="fill:#E6E6E6;" width="106" height="51" />
                    <polygon style="fill:#F93030;"
                        points="242.794,341.96 144.894,379.9 44.904,379.9 47.074,355.6 237.414,281.85 	" />
                    <polygon style="fill:#F93030;"
                        points="231.174,212.09 53.774,280.84 59.534,216.4 225.794,151.97 	" />
                    <polygon style="fill:#F93030;" points="164.464,103.56 66.224,141.63 69.634,103.56 	" />
                    <rect x="198.044" y="273.41" style="fill:#C69C6D;" width="146.99" height="106.49" />
                    <g>
                        <rect x="97.214" y="33.946" style="fill:#2D4151;" width="12.667" height="34.667" />
                        <rect x="119.881" y="33.946" style="fill:#2D4151;" width="51.333" height="34.667" />
                        <rect x="181.214" y="33.946" style="fill:#2D4151;" width="12.667" height="34.667" />
                    </g>
                    <polygon style="opacity:0.34;fill:#2D4151;enable-background:new    ;" points="222.294,112.89 68.794,112.89 69.634,103.56 
 221.464,103.56 	" />
                    <path style="fill:#2D4151;" d="M122.954,321.61v58.29h-55.33v-58.29c0-7.59,3.05-14.46,8-19.46c5.01-5.06,11.97-8.2,19.66-8.2
 C110.564,293.95,122.954,306.33,122.954,321.61z" />
                    <path style="fill:#B3B3B3;" d="M99.944,294.35c-5.82,0.98-11.02,3.79-14.99,7.8c-4.95,5-8,11.87-8,19.46v58.29h-9.33v-58.29
 c0-7.59,3.05-14.46,8-19.46c5.01-5.06,11.97-8.2,19.66-8.2C96.874,293.95,98.434,294.08,99.944,294.35z" />
                    <rect x="276.786" y="293.946" style="fill:#A67C52;" width="55.333" height="85.957" />
                    <rect x="281.786" y="298.946" style="fill:#936134;" width="45.333" height="80.957" />
                    <rect x="285.954" y="337.28" style="fill:#C69C6D;" width="15" height="6" />
                    <rect x="216.954" y="293.946" style="fill:#A67C52;" width="38.332" height="56.833" />
                    <rect x="221.954" y="298.946" style="fill:#2D4151;" width="28.332" height="46.833" />
                    <rect x="233.62" y="296.446" style="fill:#A67C52;" width="5" height="51.833" />
                    <rect x="219.204" y="319.863" style="fill:#A67C52;" width="34.5" height="5" />
                    <rect x="198.044" y="273.41" style="fill:#B78B5E;" width="146.99" height="4.25" />
                    <rect x="292.953" y="308.28" style="fill:#2D4151;" width="23" height="9" />
                    <rect x="92.547" y="26.28" style="opacity:0.34;fill:#2D4151;enable-background:new    ;" width="106"
                        height="6" />
                    <path style="opacity:0.2;fill:#FCFAFA;enable-background:new    ;" d="M122.856,66.558h45.409V40.582
 C168.264,40.582,160.972,63.376,122.856,66.558z" />
                    <rect x="55.888" y="75.869" style="fill:#B3B3B3;" width="179.319" height="29.101" />
                    <g>
                        <path style="fill:#FFFFFF;"
                            d="M67.647,97.935V82.83h1.888v13.416h7.925v1.689C77.46,97.935,67.647,97.935,67.647,97.935z" />
                        <path style="fill:#FFFFFF;" d="M82.901,97.935V82.83h1.888v15.105H82.901z" />
                        <path style="fill:#FFFFFF;" d="M90.678,90.383c0-2.369,0.58-4.273,1.739-5.714c1.176-1.424,2.733-2.137,4.671-2.137
 c1.441,0,2.716,0.447,3.826,1.342c1.109,0.911,1.789,2.07,2.037,3.478l-1.888,0.199c-0.166-0.96-0.63-1.755-1.392-2.385
 c-0.745-0.629-1.606-0.944-2.583-0.944c-1.375,0-2.468,0.563-3.28,1.689c-0.828,1.11-1.242,2.601-1.242,4.472
 c0,1.822,0.414,3.288,1.242,4.397c0.812,1.093,1.905,1.64,3.28,1.64c1.258,0,2.269-0.43,3.031-1.292
 c0.762-0.845,1.143-1.979,1.143-3.403h-4.174v-1.864h6.062v7.702h-1.342l-0.273-1.615c-0.481,0.696-1.127,1.234-1.938,1.615
 c-0.779,0.364-1.615,0.546-2.509,0.546c-1.938,0-3.495-0.704-4.671-2.112C91.257,94.59,90.678,92.718,90.678,90.383z" />
                        <path style="fill:#FFFFFF;"
                            d="M109.212,97.935V82.83h1.888v6.236h7.553V82.83h1.888v15.105h-1.888v-7.18H111.1v7.18H109.212z" />
                        <path style="fill:#FFFFFF;"
                            d="M125.982,84.519V82.83h11.329v1.689h-4.745v13.416h-1.888V84.519H125.982z" />
                        <path style="fill:#FFFFFF;"
                            d="M142.728,97.935V82.83h1.888v6.236h7.553V82.83h1.888v15.105h-1.888v-7.18h-7.553v7.18H142.728z" />
                        <path style="fill:#FFFFFF;" d="M159.92,90.383c0-2.369,0.621-4.273,1.863-5.714c1.243-1.424,2.89-2.137,4.944-2.137
 s3.693,0.712,4.919,2.137c1.242,1.441,1.863,3.346,1.863,5.714c0,2.335-0.621,4.207-1.863,5.615
 c-1.226,1.408-2.866,2.112-4.919,2.112c-2.054,0-3.702-0.704-4.944-2.112C160.541,94.59,159.92,92.718,159.92,90.383z
 M161.808,90.383c0,1.822,0.447,3.288,1.342,4.397c0.895,1.093,2.087,1.64,3.578,1.64c1.474,0,2.658-0.546,3.553-1.64
 c0.895-1.109,1.342-2.575,1.342-4.397c0-1.872-0.447-3.362-1.342-4.472c-0.895-1.126-2.079-1.689-3.553-1.689
 c-1.491,0-2.683,0.563-3.578,1.689C162.255,87.02,161.808,88.511,161.808,90.383z" />
                        <path style="fill:#FFFFFF;" d="M179.175,93.413V82.83h1.888v10.583c0,0.895,0.389,1.632,1.167,2.211
 c0.729,0.53,1.599,0.795,2.609,0.795s1.88-0.265,2.609-0.795c0.778-0.58,1.167-1.317,1.167-2.211V82.83h1.888v10.583
 c0,1.375-0.58,2.51-1.739,3.404c-1.093,0.861-2.401,1.292-3.925,1.292s-2.833-0.431-3.925-1.292
 C179.754,95.923,179.175,94.788,179.175,93.413z" />
                        <path style="fill:#FFFFFF;" d="M195.994,92.842h1.888c0,1.143,0.348,2.054,1.043,2.733c0.679,0.696,1.59,1.043,2.733,1.043
 s2.054-0.256,2.732-0.77c0.696-0.513,1.044-1.201,1.044-2.062c0-0.778-0.406-1.399-1.217-1.863
 c-0.596-0.332-1.45-0.597-2.559-0.795c-1.474-0.265-2.692-0.753-3.652-1.466c-1.093-0.828-1.64-1.847-1.64-3.056
 c0-1.226,0.48-2.211,1.441-2.957c0.96-0.746,2.244-1.118,3.851-1.118c1.606,0,2.89,0.439,3.851,1.317s1.441,2.046,1.441,3.503
 h-1.889c-0.166-0.944-0.555-1.706-1.167-2.286c-0.629-0.563-1.375-0.845-2.236-0.845c-1.027,0-1.855,0.215-2.484,0.646
 c-0.613,0.431-0.919,1.011-0.919,1.739c0,0.762,0.356,1.4,1.068,1.913c0.596,0.447,1.375,0.754,2.335,0.919
 c1.64,0.282,2.923,0.712,3.851,1.292c1.209,0.729,1.813,1.689,1.813,2.882c0,1.424-0.514,2.559-1.54,3.403
 c-1.044,0.862-2.418,1.292-4.124,1.292s-3.081-0.497-4.124-1.491C196.507,95.823,195.994,94.499,195.994,92.842z" />
                        <path style="fill:#FFFFFF;" d="M213.062,97.935V82.83h10.386v1.789h-8.497v4.621h7.553v1.789h-7.553v5.118h8.497v1.789h-10.386
 V97.935z" />
                    </g>
                    <polygon style="fill:#A67C52;" points="366.784,274.91 176.304,274.91 271.544,236.64 	" />
                    <polygon style="fill:#936134;" points="366.784,274.91 271.544,274.91 271.544,236.64 	" />
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
            </symbol>
            <symbol id="icon-ruins" viewBox="0 0 256 256">
                <style type="text/css">
                    <![CDATA[
                    .st0 {
                        fill: #D1D1D1;
                    }

                    .st1 {
                        fill: #454545;
                    }

                    ]]>
                </style>
                <path class="st0"
                    d="M171.762,234.229c-2.674,0-5.235-1.07-7.114-2.973s-2.918-4.478-2.885-7.15
 c0.244-19.819-2.767-31.968-5.667-34.868c-4.387-4.388-11.915-7.824-17.139-7.824c-1.811,0-3.118,0.39-3.886,1.157
 c-2.309,2.309-5.313,15.472-3.547,40.967c0.191,2.766-0.773,5.487-2.665,7.514c-1.891,2.027-4.539,3.178-7.311,3.178H40.886
 c-3.207,0-6.313-0.229-8.746-0.645c-10.157-1.734-11.254-8.314-11.254-11.063V104.476c0-3.274-2.029-9.257-4.02-11.856l-2.223-2.901
 C9.925,83.559,6.5,73.457,6.5,65.698V42.105c0-11.028,8.208-20,18.296-20c7.855,0,12.943,6.554,15.712,13.245
 c1.979-7.587,9.437-13.245,18.308-13.245c8.02,0,13.296,6.804,16.169,13.629c1.869-7.788,9.399-13.629,18.378-13.629
 c13.035,0,18.823,17.774,18.823,24.529c0,0.194,0.037,0.417,0.089,0.626c0.526,0.519,1.001,1.098,1.415,1.732
 c2.068,3.172,2.8,7.318-0.35,17.221c6.431,2.854,12.902,8.97,15.601,14.818c3.161,6.854,4.056,11.595,2.753,15.362
 c-0.122,1.165-0.257,3.255-0.351,5.299c0.76,0.031,1.481,0.066,2.119,0.103c6.6,0.382,9.598,5.786,11.024,9.881
 c0.559-2.191,1.633-4.348,3.695-6.409c2.635-2.631,5.784-3.91,9.63-3.91c0.598,0,1.287,0.034,2.112,0.083
 c0.828,0.05,1.685,0.101,2.812,0.101c11.97,0,17.817,15.208,18.677,22.962c0.012,0.009,0.022,0.018,0.034,0.027
 c3.426,0.451,6.494,2.136,8.608,4.776c2.414,3.013,3.307,6.938,2.45,10.768c-0.188,0.89-0.65,4.799-0.982,9.675l9.345-3.397
 c2.142-0.779,4.372-1.174,6.629-1.174c5.024,0,9.77,1.998,13.019,5.481c3.09,3.312,4.614,7.68,4.292,12.301
 c-0.303,4.353-2.751,12.689-4.203,17.329c0.625,2.739,1.917,6.568,3.15,9.285c0.119-0.053,0.235-0.104,0.346-0.153
 c3.438-1.521,6.993-3.095,10.856-3.095c5.995,0,10.837,3.924,12.05,9.764l0.211,1.021c1.104,5.317,1.9,9.111,2.003,9.572
 l-0.085,0.02c0.35,1.627,0.354,3.209,0.357,4.457c0.004,1.395,0.007,3.315,0.007,5.428c0,9.728-8.972,17.641-20,17.641H171.762z" />
                <path class="st1" d="M188.531,111.542c-0.058,0-0.104,0.141-0.104,0.312c0,0.172,0.047,0.414,0.104,0.156
 S188.589,111.542,188.531,111.542z" />
                <path class="st1" d="M239.479,208.938c-0.012-0.006-0.936-4.417-2.054-9.802l-0.209-1.012c-1.118-5.385-11.66,3.083-16.466,2.751
 s-9.785-15.828-10.417-21.292c0,0,4.188-12.854,4.499-17.316c0.382-5.487-5.378-8.396-10.546-6.517l-14.205,5.166
 c-5.168,1.879-9.147-1.076-8.843-6.567l0.164-2.938c0.305-5.491,0.91-11.575,1.345-13.519s-1.02-3.511-3.231-3.482
 c-2.211,0.028-7.99-3.994-7.99-8.064c0-4.071-3.955-14.803-8.789-14.803c-4.833,0-5.926-0.757-7.486,0.801
 c-1.287,1.286-1.371,2.532-1.371,6.514s-2.545,14.704-5.654,14.981s-11.245-3.701-11.245-7.609s-1.843-14.319-4.095-14.45
 c-2.251-0.13-5.796-0.237-7.876-0.237c-2.081,0-3.783-2.56-3.783-5.689s0.408-11.911,0.906-12.561s-0.523-4.282-2.271-8.071
 c-1.748-3.789-6.707-8.313-11.02-10.055s-6.585-7.109-5.048-11.928c1.537-4.818,2.132-8.833,1.323-8.919
 c-0.809-0.087-2.93-3.69-2.93-7.685s-3.971-14.529-8.823-14.529s-8.823,3.331-8.823,7.402c0,4.071-2.545,15.03-5.655,15.307
 c-3.11,0.277-11.246-3.834-11.246-7.905s-3.97-14.804-8.823-14.804s-8.823,3.269-8.823,7.265s-2.544,14.755-5.655,15.032
 c-3.11,0.277-11.246-3.772-11.246-7.767s-3.733-14.529-8.296-14.529c-4.563,0-8.296,4.5-8.296,10v23.593
 c0,5.5,2.737,13.572,6.082,17.938l2.223,2.901c3.345,4.366,6.082,12.438,6.082,17.938c0,0,0,19.728,0,34.591
 c0,27.25,0,71.747,0,71.747c0,5.5,0,10.769,0,11.708s4.5,1.708,10,1.708h42.577c5.5,0,14.5,0,20,0h4.704c5.5,0,10.438,0,10.974,0
 c0.209,0,1.091,0,2.408,0c-0.918-13.25-1.711-40.567,6.452-48.729c8.721-8.721,26.446-2.054,35.167,6.667
 c7.919,7.919,8.739,30.349,8.595,42.063h25.492c5.5,0,11.405,0,13.123,0s7.623,0,13.123,0h6c5.5,0,10-3.438,10-7.641
 S239.49,208.943,239.479,208.938z M89.602,184.022c0,5.5-4.5,10-10,10h-3.96c-5.5,0-10-4.5-10-10v-12.771
 c0-5.5,1.839-14.107,4.087-19.127c0,0,1.277-2.852,7.894-2.852c6.616,0,7.893,2.852,7.893,2.852
 c2.248,5.02,4.086,13.627,4.086,19.127V184.022z M89.602,118.167c0,5.5-4.5,10-10,10h-3.96c-5.5,0-10-4.5-10-10v-12.771
 c0-5.5,1.839-14.107,4.086-19.127c0,0,1.277-2.853,7.894-2.853c6.616,0,7.894,2.853,7.894,2.853
 c2.248,5.02,4.086,13.627,4.086,19.127V118.167z M200.88,207.738l-0.382,0.958c-2.033,5.11-4.925,6.624-6.426,3.362
 c-1.501-3.261-5.975-7.728-9.941-9.926c-3.966-2.198-4.031-7.182-0.146-11.073l1.661-1.664c3.886-3.892,9.732-3.451,12.991,0.979
 l0.013,0.018C201.909,194.821,202.913,202.628,200.88,207.738z" />
            </symbol>

            <symbol id="icon-store" viewBox="0 0 616 512">
                <path
                    d="M602 118.6L537.1 15C531.3 5.7 521 0 510 0H106C95 0 84.7 5.7 78.9 15L14 118.6c-33.5 53.5-3.8 127.9 58.8 136.4 4.5.6 9.1.9 13.7.9 29.6 0 55.8-13 73.8-33.1 18 20.1 44.3 33.1 73.8 33.1 29.6 0 55.8-13 73.8-33.1 18 20.1 44.3 33.1 73.8 33.1 29.6 0 55.8-13 73.8-33.1 18.1 20.1 44.3 33.1 73.8 33.1 4.7 0 9.2-.3 13.7-.9 62.8-8.4 92.6-82.8 59-136.4zM529.5 288c-10 0-19.9-1.5-29.5-3.8V384H116v-99.8c-9.6 2.2-19.5 3.8-29.5 3.8-6 0-12.1-.4-18-1.2-5.6-.8-11.1-2.1-16.4-3.6V480c0 17.7 14.3 32 32 32h448c17.7 0 32-14.3 32-32V283.2c-5.4 1.6-10.8 2.9-16.4 3.6-6.1.8-12.1 1.2-18.2 1.2z" />
            </symbol>

            <symbol id="icon-anchor" viewBox="0 0 30 28">
                <title>Port</title>
                <path
                    d="M15 4c0-0.547-0.453-1-1-1s-1 0.453-1 1 0.453 1 1 1 1-0.453 1-1zM28 18.5v5.5c0 0.203-0.125 0.391-0.313 0.469-0.063 0.016-0.125 0.031-0.187 0.031-0.125 0-0.25-0.047-0.359-0.141l-1.453-1.453c-2.453 2.953-6.859 4.844-11.688 4.844s-9.234-1.891-11.688-4.844l-1.453 1.453c-0.094 0.094-0.234 0.141-0.359 0.141-0.063 0-0.125-0.016-0.187-0.031-0.187-0.078-0.313-0.266-0.313-0.469v-5.5c0-0.281 0.219-0.5 0.5-0.5h5.5c0.203 0 0.391 0.125 0.469 0.313s0.031 0.391-0.109 0.547l-1.563 1.563c1.406 1.891 4.109 3.266 7.203 3.687v-10.109h-3c-0.547 0-1-0.453-1-1v-2c0-0.547 0.453-1 1-1h3v-2.547c-1.188-0.688-2-1.969-2-3.453 0-2.203 1.797-4 4-4s4 1.797 4 4c0 1.484-0.812 2.766-2 3.453v2.547h3c0.547 0 1 0.453 1 1v2c0 0.547-0.453 1-1 1h-3v10.109c3.094-0.422 5.797-1.797 7.203-3.687l-1.563-1.563c-0.141-0.156-0.187-0.359-0.109-0.547s0.266-0.313 0.469-0.313h5.5c0.281 0 0.5 0.219 0.5 0.5z" />
            </symbol>

            <symbol id="icon-route" viewBox="0 0 512 512">
                <path
                    d="M416 320h-96c-17.6 0-32-14.4-32-32s14.4-32 32-32h96s96-107 96-160-43-96-96-96-96 43-96 96c0 25.5 22.2 63.4 45.3 96H320c-52.9 0-96 43.1-96 96s43.1 96 96 96h96c17.6 0 32 14.4 32 32s-14.4 32-32 32H185.5c-16 24.8-33.8 47.7-47.3 64H416c52.9 0 96-43.1 96-96s-43.1-96-96-96zm0-256c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zM96 256c-53 0-96 43-96 96s96 160 96 160 96-107 96-160-43-96-96-96zm0 128c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z" />
            </symbol>

            <g id="defs-relief">
                <symbol id="relief-mount-1" viewBox="0 0 100 100">
                    <path d="m3,69 16,-12 31,-32 15,20 30,24" fill="#fff" stroke="#5c5c70" stroke-width="1" />
                    <path d="m3,69 16,-12 31,-32 -14,44" fill="#999999" />
                    <path d="m3,71 h92 m-83,3 h83" stroke="#5c5c70" stroke-dasharray="7, 11" stroke-width="1" />
                </symbol>
                <symbol id="relief-hill-1" viewBox="0 0 100 100">
                    <path d="m20,55 q30,-28 60,0" fill="#999999" stroke="#5c5c70" />
                    <path d="m38,55 q13,-24 40,0" fill="#fff" />
                    <path d="m20,58 h70 m-62,3 h50" stroke="#5c5c70" stroke-dasharray="7, 11" stroke-width="1" />
                </symbol>
                <symbol id="relief-deciduous-1" viewBox="0 0 100 100">
                    <path d="m49.5,52 v7 h1 v-7 h-0.5 q13,-7 0,-16 q-13,9 0,16" fill="#fff" stroke="#5c5c70" />
                    <path d="M 50,51.5 C 44,49 40,43 50,36.5" fill="#999999" />
                </symbol>
                <symbol id="relief-conifer-1" viewBox="0 0 100 100">
                    <path d="m49.5,55 v4 h1 v-4 l4.5,0 -4,-8 l3.5,0 -4.5,-9 -4,9 3,0 -3.5,8 7,0" fill="#fff"
                        stroke="#5c5c70" />
                    <path d="m 46,54.5 3.5,-8 H 46.6 L 50,39 v 15.5 z" fill="#999999" />
                </symbol>
                <symbol id="relief-acacia-1" viewBox="0 0 100 100">
                    <path
                        d="m34.5 44.5 c 1.8, -3 8.1, -5.7 12.6, -5.4 6, -2.2 9.3, -0.9 11.9, 1.3 1.7, 0.2 3.2,-0.3 5.2, 2.2 2.7, 1.2 3.7, 2.4 2.7, 3.7 -1.6, 0.3 -2.2, 0 -4.7, -1.6 -5.2, 0.1 -7, 0.7 -8.7, -0.9 -2.8, 1 -3.6, 0 -9.7, 0.2 -4.6, 0 -8, 1.6 -9.3, 0.4 z"
                        fill="#fff" />
                    <path
                        d="m52 38 c-2.3 -0.1 -4.3 1.1 -4.9 1.1 -2.2 -0.2 -5 0.2 -6.4 1 -1.3 0.7 -2.8 1.6 -3.7 2.1 -1 0.6 -3.4 1.8 -2.2 2.7 1.1 0.9 3.1 -0.2 4.2 0.3 1.4 0.8 2.9 1 4.5 0.9 1.1 -0.1 2.2 -0.4 2.4 1 0.3 1.9 1.1 3.5 2.1 5.1 0.8 2.4 1 2.8 1 6.8 l2 0 c 0 -1.1 -0.1 -4 1.2 -5.7 1.1 -1.4 1.4 -3.4 3 -4.4 0.9 -1.4 2 -2.6 3.8 -2.7 1.7 -0.3 3.8 0.8 5.1 0.3 0.9 -0.1 3.2 1 3.5 -1 0.1 -2 -2.2 -2.1 -3.2 -3.3 -1.1 -1.5 -3.3 -1.9 -4.9 -1.8 -1 -0.5 -2 -2.5 -7.3 -2.5 z m -0.5 0.4 c2.7338 -0.2 5.6 0.2 7.5 2.4 1.7 0 3.7 0 4.8 1.5 1 1.2 3.4 1.8 3.4 3 0 2.1 -3.2 0.5 -3.6 0.1 -1.3 -1.4 -2.9 -0.6 -4.5 -0.7 -1.6 -0.1 -3.2 0.4 -4.6 -0.6 -1.1 -0.7 -2.5 0.1 -3.8 -0.1 -1.8 -0.2 -4 -0.4 -5.9 -0.1 -1.4 0 -2.8 0.1 -4.2 0 -1.7 0.5 -5.5 1.1 -5.4 0.4 0.2 -1.1 4.5 -3.2 5.9 -3.9 1.9 -0.9 3.7 -1.1 6.2 -0.8 0.7 -0.2 1.7 -1.1 4.3 -1.3 z m2 6 c1.6 0.3 2 2.2 1.2 3.3 -1 1.3 -1 -1.3 -1.3 -2 -0.2 -0.5 -0.8 -1.3 0.1 -1.3 z m -12.9 0.2 c1 -0.1 3.5 -0.3 3.1 0.9 -1.4 0 -3.4 0.1 -4.4 -0.6 0.4 -0.2 0.9 -0.2 1.3 -0.3 z m5.6 -0.1 c0.8 0.1 3.1 -0.3 3 0.5 -1.3 0.6 -1.6 2.2 -2.1 3.1 -0.4 -1.2 -0.7 -2.7 -2.1 -3.2 -0.9 -0.6 1 -0.5 1.3 -0.4 z m5.3 0.3 c1.1 0.1 1.6 2.4 0.1 1.3 -1.6 -1.2 -0.6 -1.3 -0.1 -1.3 z m7.5 0.4 c1.2 0 3.3 -0.2 2.9 0.2 -1.4 1.2 -3 -0.3 -4.8 0.8 -0.9 0.5 -2 0.8 -1.1 -0.4 0.5 -0.6 1.3 -0.5 3 -0.6 z m -8.9 0.1 c0.7 1.2 2.1 1.5 2.9 2.1 0.9 1.6 -0.5 3.1 -1.3 4.5 -0.9 1.5 -1.9 2.2 -2.4 0.3 -0.1 -0.5 -1.8 -2.2 -1.2 -3.7 0.3 -1.3 0.6 -2.6 2 -3.2 z m12.5 0.1 c0.6 0.2 1.3 1.1 0.2 0.9 -1.4 -0.1 -1.4 -0.3 -0.2 -0.9 z"
                        fill="#5c5c70" />
                    <path
                        d="m47 42.33 c2 0.1 4.1 0.5 6.1 -0.3 1.4 -0.3 2.6 0.8 3.6 1.6 0.7 0.4 2.5 0.7 2.7 1.2 -2.2 -0.1 -3.6 0.4 -4.8 -0.4 -1 -0.7 -2.2 -0.3 -3 -0.2 -0.9 0.1 -3 -0.4 -5.5 -0.2 -2.6 0.2 -5.1 -0.1 -7.2 0.5 -3.6 0.6 -3.7 0 -3.7 0 2.2 -2 9.1 -1.7 11.9 -2.2 z"
                        fill="#999999" />
                </symbol>
                <symbol id="relief-palm-1" viewBox="0 0 100 100">
                    <path
                        d="m 48.1,55.5 2.1,0 c 0,0 1.3,-5.5 1.2,-8.6 0,-3.2 -1.1,-5.5 -1.1,-5.5 l -0.5,-0.4 -0.2,0.1 c 0,0 0.9,2.7 0.5,6.2 -0.5,3.8 -2.1,8.2 -2.1,8.2 z"
                        fill="#5c5c70" />
                    <path
                        d="m 54.9,48.8 c 0,0 1.9,-2.5 0.3,-5.4 -1.4,-2.6 -4.3,-3.2 -4.3,-3.2 0,0 1.6,-0.6 3.3,-0.3 1.7,0.3 4.1,2.5 4.1,2.5 0,0 -0.6,-3.6 -3.6,-4.4 -2.2,-0.6 -4.2,1.3 -4.2,1.3 0,0 0.3,-1.5 -0.2,-2.9 -0.6,-1.4 -2.6,-1.9 -2.6,-1.9 0,0 0.8,1.1 1.2,2.2 0.3,0.9 0.3,2 0.3,2 0,0 -1.3,-1.8 -3.7,-1.5 -2.5,0.2 -3.7,2.5 -3.7,2.5 0,0 2.3,-0.6 3.4,-0.6 1.1,0.1 2.6,0.8 2.6,0.8 l -0.4,0.2 c 0,0 -1.2,-0.4 -2.7,0.4 -1.9,1.1 -2.9,3.7 -2.9,3.7 0,0 1.4,-1.4 2.3,-1.9 0.5,-0.3 1.8,-0.7 1.8,-0.7 0,0 -0.7,1.3 -0.9,3.1 -0.1,2.5 1.1,4.6 1.1,4.6 0,0 0.1,-3.4 1.2,-5.6 1,-1.9 2.3,-2.6 2.3,-2.6 l 0.4,-0.2 c 0,0 1.5,0.7 2.8,2.8 1,1.7 2.3,5 2.3,5 z"
                        fill="#fff" stroke="#5c5c70" stroke-width=".6" />
                    <path
                        d="m 47.75,34.61 c 0,0 0.97,1.22 1.22,2.31 0.2,0.89 0.35,2.81 0.35,2.81 0,0 -1.59,-1.5 -3.2,-1.61 -1.82,-0.13 -3.97,1.31 -3.97,1.31 0,0 2.11,-0.49 3.34,-0.47 1.51,0.03 3.33,1.21 3.33,1.21 0,0 -1.7,0.83 -2.57,2.8 -0.88,1.97 -0.34,6.01 -0.34,6.01 0,0 0.04,-2.95 0.94,-4.96 0.8,-1.78 2.11,-2.67 2.44,-2.85 0.66,-0.34 0.49,-1.09 0.49,-1.09 0,0 -0.1,-2.18 -0.52,-3.37 -0.42,-1.21 -1.51,-2.11 -1.51,-2.11 z"
                        fill="#999" />
                    <path
                        d="m 42,43.7 c 0,0 1.2,-1.1 1.8,-1.5 0.7,-0.4 2,-0.8 2,-0.8 L 46.5,40.5 c 0,0 -0.8,0 -2.3,0.8 -1.3,0.8 -2.2,2.3 -2.2,2.3 z"
                        fill="#999" />
                </symbol>
                <symbol id="relief-grass-1" viewBox="0 0 100 100">
                    <path
                        d="m 49.5,53.1 c 0,-3.4 -2.4,-4.8 -3,-5.4 1,1.8 2.4,3.7 1.8,5.4 z M 51,53.2 C 51.4,49.6 49.6,47.9 48,46.8 c 1.1,1.8 2.8,4.6 1.8,6.5 z M 51.4,51.4 c 0.6,-1.9 1.8,-3.4 3,-4.3 -0.8,0.3 -2.9,1.5 -3.4,2.8 0.2,0.4 0.3,0.8 0.4,1.5 z M 52.9,53.2 c -0.7,-1.9 0.5,-3.3 1.5,-4.4 -1.7,1 -3,2.2 -2.7,4.4 z"
                        fill="#5c5c70" stroke="none" />
                </symbol>
                <symbol id="relief-swamp-1" viewBox="0 0 100 100">
                    <path d="m 50,46 v 6 m 0,0 3,-4 m -3,4 -3,-4 m -6,4.5 h 3 m 4,0 h 4 m 4,0 3,0" fill="none"
                        stroke="#5c5c70" stroke-linecap="round" />
                </symbol>
                <symbol id="relief-dune-1" viewBox="0 0 100 100">
                    <path d="m 28.7,52.8 c 5,-3.9 10,-8.2 15.8,-8.3 4.5,0 10.8,3.8 15.2,6.5 3.5,2.2 6.8,2 6.8,2"
                        fill="none" stroke="#5c5c70" stroke-width="1.8" />
                    <path d="m 44.2,47.6 c -3.2,3.2 3.5,5.7 5.9,7.8" fill="none" stroke="#5c5c70" />
                </symbol>

                <symbol id="relief-mount-2-bw" viewBox="-5 -5 50 50">
                    <polygon fill="#fff" stroke="#5c5c70" stroke-width=".2"
                        points="23.2198,13.2844 25.0296,15.5958 25.7023,16.6348 26.9007,17.3503 27.6924,18.8671 28.6339,19.544 29.6416,21.2874 30.1793,22.9204 30.7341,23.1774 31.5491,24.0589 31.9489,25.0324 32.4734,26.4994 33.8428,27.4678 34.673,28.5353 34.8847,28.7856 34.8285,28.9234 29.5625,31.5852 22.3428,32.6 17.9672,32.2587 6.7332,31.3779 4.2787,30.6699 0.3152,28.4746 6.2326,22.923 6.8631,18.7876 8.5478,17.0127 9.4447,14.5301 10.1033,13.4603 10.0987,12.7193 10.3459,12.4623 10.8502,12.3291 11.2616,9.4996 12.2382,9.5462 12.8014,9.7331 13.2941,9.6207 13.6109,9.8041 14.1481,9.9827 15.2052,7.9497 15.8578,7.6333 16.1761,6.4592 16.6967,5.5584 17.9672,2.6 19.2707,4.5745 23.008,12.5807 " />
                    <polygon fill="#a6a6a6"
                        points="23.2198,13.2844 25.0296,15.5958 25.7023,16.6348 26.9007,17.3503 27.6924,18.8671 28.6339,19.544 29.6416,21.2874 30.1793,22.9204 30.7341,23.1774 31.5491,24.0589 31.9489,25.0324 32.4734,26.4994 33.8428,27.4678 34.673,28.5353 34.8847,28.7856 34.8285,28.9234 29.5625,31.5852 22.3428,32.6 17.9672,32.2587 21.0737,27.7521 21.7612,26.7547 21.895,24.2875 20.5482,19.4183 18.3111,15.2733 19.9099,12.3973 17.9672,2.6 19.2707,4.5745 23.008,12.5807 " />
                </symbol>

                <symbol id="relief-mount-3-bw" viewBox="-5 -3 45 45">
                    <polygon fill="#fff" stroke="#5c5c70" stroke-width=".2"
                        points="25.3915,13.976 26.9002,15.9029 27.4611,16.769 28.4601,17.3655 29.12,18.63 29.9049,19.1943 30.745,20.6477 31.1932,22.0089 31.6557,22.2232 32.3351,22.9581 32.6684,23.7696 33.1056,24.9927 34.2473,25.7998 34.9393,26.6898 35.1158,26.8985 35.0689,27.0133 30.679,29.2324 24.6604,30.0782 21.0127,29.7937 14.3249,29.2694 12.5343,29.5211 10.0779,29.3295 3.7712,28.8351 2.3933,28.4376 0.1682,27.2051 3.4902,24.0885 3.8441,21.7669 4.7899,20.7706 5.6813,18.303 7.6713,17.3287 10.0779,12.6794 10.8097,13.7878 12.616,17.6576 13.1603,17.0841 13.8282,12.5327 14.8701,12.8548 15.3517,12.6401 16.0651,11.1879 16.9674,11.3732 17.4851,11.2365 17.793,11.2992 21.0127,5.069 22.0994,6.7151 25.2149,13.3894" />
                    <path fill="#a6a6a6"
                        d="M13.0266 18.6774l1.0161 1.2977 0.3775 0.5832 0.6729 0.4017 0.4443 0.8515 0.5286 0.38 0.5657 0.9788 1.365 -0.2171 0.852 0.9077 0.8012 0.7006 1.0769 -0.4987 0.587 0.888 1.3143 1.1862 1.6837 -1.1473 -3.2991 4.8038 -6.6879 -0.5243 -1.7906 0.2516 -2.4564 -0.1915 1.7439 -2.53 0.386 -0.56 0.0751 -1.3851 -0.756 -2.7335 -1.2559 -2.3269 0.8975 -1.6146 -1.0906 -5.5001 0.7318 1.1084 2.098 4.4946 0.1189 0.395zm12.3648 -4.7014l1.5087 1.9269 0.5609 0.8661 0.999 0.5965 0.6599 1.2645 0.7849 0.5643 0.8401 1.4534 0.4482 1.3613 0.4625 0.2143 0.6794 0.7349 0.3333 0.8115 0.4371 1.2231 1.1417 0.8072 0.6921 0.89 0.1764 0.2087 -0.0468 0.1148 -4.3899 2.2191 -6.0187 0.8458 -3.6476 -0.2845 2.5896 -3.7569 0.5732 -0.8316 0.1114 -2.0567 -1.1227 -4.0591 -1.8649 -3.4554 1.3328 -2.3976 -1.6195 -8.1675 1.0867 1.6461 3.1155 6.6743 0.1765 0.5866z" />
                </symbol>

                <symbol id="relief-mount-4-bw" viewBox="-5 -15 50 50">
                    <polygon fill="#fff" stroke="#5c5c70" stroke-width=".2"
                        points="35.1337,17.58 34.122,18.8623 31.5268,19.3968 28.6951,19.562 25.2025,19.4911 22.0686,19.053 19.2643,20.1212 14.8201,19.849 10.9897,18.983 7.7168,18.0396 4.4391,18.4829 1.598,17.8161 0.2005,16.9864 5.3775,14.1114 6.9445,13.6145 9.7551,10.1143 10.7985,9.9008 11.1418,9.0682 12.5645,7.9945 13.6885,4.6225 17.0605,0.1265 19.3086,1.2504 19.5301,1.868 20.0211,2.0967 20.0211,2.0967 22.6805,4.6225 22.7195,6.0067 23.6307,6.3628 25.5645,8.9605 27.9106,10.6515 27.912,11.4444 28.1901,12.0933 29.0346,11.8883 29.8293,12.2096" />
                    <path fill="#a6a6a6"
                        d="m 17.6643,2.2612 -0.3434,1.3675 0.2294,0.1158 0.1559,0.1471 0.0199,0.7745 0.1926,0.9377 -0.9604,1.4775 -0.6513,0.6353 1.7115,-0.7977 0.1556,-0.7421 0.4118,1.3885 1.1335,1.9731 0.7278,1.7545 -0.2079,1.6338 0.7769,0.6722 0.3099,1.1103 0.7775,0.5155 -0.6186,2.4264 0.5834,1.4019 3.1339,0.4381 3.4927,0.0709 2.8316,-0.1651 2.5952,-0.5346 1.0117,-1.2823 -5.3044,-5.3703 C 29.5416,12.0883 28.989155,11.867689 28.989155,11.867689 L 28.1899,12.0933 27.9117,11.4444 27.9103,10.6515 25.5643,8.9604 23.6304,6.3628 22.699656,6.0693513 22.6802,4.6224 20.0208,2.0966 19.52972,1.9051879 19.3082,1.2504 17.0601,0.1264 17.6639,2.2611 Z" />
                </symbol>

                <symbol id="relief-mount-5-bw" viewBox="-5 -12 45 45">
                    <polygon fill="#fff" stroke="#999999" stroke-width=".2"
                        points=".1806,16.7402 3.5087,13.7123 4.239,13.7226 5.6739,11.608 7.2317,11.0365 8.5763,9.1019 11.2204,5.1632 11.5727,4.0521 14.4278,0.1139 14.7002,0.1847 15.5903,0.6964 17.3404,2.3788 19.0704,4.6029 19.8528,4.6768 21.1765,3.7877 21.6878,3.1801 22.2862,3.3991 23.2631,4.3576 23.6605,5.4693 24.1225,6.6796 27.0001,10.5869 28.8156,9.4183 30.9325,11.9224 31.9742,13.5284 32.7597,14.0214 35.7881,17.4522 35.0629,18.009 30.1283,18.9281 26.9306,18.8548 20.8774,19.2757 15.3532,18.9995 11.8111,18.7356 9.9342,18.4948 6.0759,18.7277 3.5217,18.2204 " />
                    <path fill="#a6a6a6"
                        d="m 35.7881,17.4522 -3.0284,-3.4308 -0.7855,-0.493 -1.0417,-1.606 -2.1169,-2.5041 -0.1069,1.6658 -0.5815,0.9516 0.6344,0.4229 -0.1543,1.2251 0.5772,0.7838 0.6872,0.8986 -1.2159,0.8459 0.5287,0.5287 1.0044,0.6344 0.4757,0.7929 0.1189,0.6381 1.8119,-0.3376 2.4673,-0.4596 0.7252,-0.5568 z M 19.90794,4.7681953 19.028058,4.6865232 17.314205,2.4013976 15.478,0.7228 14.4279,0.1139 l -0.806,3.5794 -0.1188,1.5355 0.8458,0.7402 0.5287,-0.6344 -0.5287,2.5375 -1.2158,2.1675 2.2732,-1.9032 0.8458,0.6872 -0.2114,1.4803 -0.0528,1.0573 -0.6344,1.2688 0.2114,0.7929 -1.163,2.009 -0.6344,1.2688 -0.1615,2.1686 2.9143,0.1885 0.2605,-1.5112 -0.2115,-1.6918 2.0478,-2.1712 0.1726,-2.0052 0.7929,1.1101 0.8987,-1.3216 -0.2643,-1.3745 -0.6344,-0.37 0,-0.6344 L 18.617,8.6884 18.5253,6.9734 18.952763,5.4143697 Z M 22.2862,3.3991 21.6878,3.1801 21.651,4.264 l -0.9781,1.3217 0.6344,0.6079 -0.2379,1.4538 0.5287,1.1366 -0.1851,1.1631 0.7402,1.5331 0.7929,1.6124 -0.4757,1.2159 0.2643,0.8458 1.3216,1.2424 0.9516,0.1322 1.6457,2.3451 0.601,-0.0118 -0.5021,-1.3289 -0.0529,-0.7666 -1.0044,-0.9252 0.0528,-1.0044 0.5815,-0.0264 -1.1631,-2.4847 0.7402,0.3436 0.5551,-0.3964 0.1322,-1.0574 L 27,10.5868 24.1224,6.6796 23.263,4.3575 22.2861,3.399 Z" />
                </symbol>

                <symbol id="relief-mount-6-bw" viewBox="-3 -10 40 40">
                    <polygon fill="#fff" stroke="#5c5c70" stroke-width=".1"
                        points=".147,15.0385 1.6442,13.0243 3.3151,11.642 4.1434,10.0376 4.9806,9.9224 6.8955,7.0031 8.6059,5.1501 9.0229,3.7256 10.0368,2.3148 12.4348,4.6748 14.6687,3.6743 18.1604,1.3295 20.0044,0.1303 23.5192,4.0044 24.3981,3.1572 25.3939,4.067 27.6095,6.6459 28.7754,8.0029 30.309,8.9148 31.4894,10.6345 32.5909,12.0136 33.1688,13.2271 33.746,13.7886 34.1887,14.9298 35.1672,15.7874 33.2794,16.9613 30.2507,17.8494 27.9082,18.0142 25.5124,18.5408 24.1945,18.5184 22.0666,17.9886 20.7224,17.5522 19.3848,17.2692 18.0714,17.4921 16.8448,17.9273 14.923,18.4833 11.9731,18.4984 8.0901,18.2949 4.9114,17.2688 1.9652,16.102 " />
                    <path fill="#a6a6a6"
                        d="M 12.423779,4.7797 10.0368,2.3148 l 0.0783,5.0656 1.3012,1.3786 0.7863,1.6846 -0.3263,3.3158 2.6701,3.0025 0.4888,1.689 2.977826,-0.979118 1.371774,-0.202582 -2.8,-2.7401 1.3192,-1.0636 -2.4117,-2.9452 -0.9667,-2.0026 -1.6114,-0.9253 1.046346,-1.4408776 z" />
                    <path fill="#a6a6a6"
                        d="M 23.585688,4.0917598 20.0044,0.1303 l -0.048,3.1913 -0.5259,0.2023 -0.536,2.5174 0.2051,1.1566 0.7041,1.9039 0.7728,0.5503 -0.4438,2.1921 0.3455,0.8895 2.2986,1.8632 -0.6779,-1.6541 -0.0237,-0.6287 0.634,-1.5809 -0.2487,-1.5727 0.1626,-0.8586 -0.3977,-1.3888 1.3613,-1.8674 z" />
                    <path fill="#a6a6a6"
                        d="M 35.1672,15.7874 34.1887,14.9298 33.746,13.7886 33.1688,13.2271 32.5909,12.0136 30.309,8.9148 28.7754,8.0029 25.3939,4.067 24.3981,3.1572 24.8,5.3815 23.8709,6.152 l 1.6017,2.4409 0.4413,1.8051 -0.1898,2.2076 -1.0919,1.6288 0.2971,1.2311 1.2697,0.8769 1.9009,0.4744 0.083,1.1781 2.0678,-0.1455 3.0287,-0.8881 z" />
                </symbol>

                <symbol id="relief-mount-7-bw" viewBox="-8 -10 40 40">
                    <polygon fill="#a6a6a6" stroke="#5c5c70" stroke-width=".1"
                        points="22.529,16.6581 21.9433,15.0851 21.8084,13.5984 21.4921,11.5468 20.7584,9.2608 18.1129,5.2497 17.7604,4.1287 14.9038,0.1126 14.6313,0.1761 13.7407,0.6645 11.9897,2.3012 10.8187,3.7756 10.2754,4.1491 9.5595,3.9239 8.7609,3.5562 7.64,2.9875 7.0412,3.1907 6.0639,4.1237 5.6662,5.2254 5.204,6.4241 2.3249,10.2569 1.7062,11.6374 2.3144,13.0024 2.1506,13.6978 1.1772,13.673 1.0735,15.1182 0.4367,16.8402 0.1318,17.5293 2.3944,18.5311 8.4508,19.113 13.9779,18.9836 17.5219,18.8136 19.3998,18.6226 " />
                    <path fill="#fff"
                        d="M9.7866 4.7504l0.7194 -0.1357 1.627 -2.2285 1.7201 -1.6924 1.0506 -0.5812 0.8064 3.6027 0.1188 1.5394 -0.8462 0.7182 -0.529 -0.6488 0.529 2.553 1.2165 2.2009 -2.2744 -1.9646 -0.8462 0.6652 0.2115 1.4867 0.0529 1.0592 0.6347 1.2863 -0.2115 0.7877 1.1636 2.041 0.6347 1.2862 0.1616 2.1741 -2.9158 0.1112 -0.2607 -1.5189 0.2116 -1.6871 -2.0489 -2.2267 -0.1727 -2.0108 -0.7934 1.0896 -0.8992 -1.3462 0.2645 -1.3681 0.6347 -0.3534 0 -0.6347 0.9661 -0.3741 0.0918 -1.7136 -0.1058 -1.431 -0.9118 -0.6854zm-2.7454 -1.5597l0.5987 -0.2032 0.0368 1.0853 0.9786 1.3484 -0.6347 0.5914 0.238 1.4609 -0.529 1.1231 0.1852 1.1687 -0.7406 1.5142 -0.7934 1.5922 1.5431 0.6224 1.2433 0.621 0.0153 0.9133 -0.2397 0.777 1.8113 0.1046 1.0597 0.4823 0.9965 2.6186 -4.3596 0.1022 -6.0565 -0.5819 -2.2625 -1.0018 0.3049 -0.6891 0.6368 -1.722 0.1037 -1.4452 0.8463 0.5647 0.2909 -1.2353 -0.6082 -1.365 0.6187 -1.3805 2.8791 -3.8328 0.8598 -2.3004 0.9774 -0.933z" />
                </symbol>

                <symbol id="relief-mountSnow-1-bw" viewBox="-5 -5 50 50">
                    <polygon fill="#fff" stroke="#999999" stroke-width=".2"
                        points="23.2198,13.2844 25.0296,15.5958 25.7023,16.6348 26.9007,17.3503 27.6924,18.8671 28.6339,19.544 29.6416,21.2874 30.1793,22.9204 30.7341,23.1774 31.5491,24.0589 31.9489,25.0324 32.4734,26.4994 33.8428,27.4678 34.673,28.5353 34.8847,28.7856 34.8285,28.9234 29.5625,31.5852 22.3428,32.6 17.9672,32.2587 6.7332,31.3779 4.2787,30.6699 0.3152,28.4746 6.2326,22.923 6.8631,18.7876 8.5478,17.0127 9.4447,14.5301 10.1033,13.4603 10.0987,12.7193 10.3459,12.4623 10.8502,12.3291 11.2616,9.4996 12.2382,9.5462 12.8014,9.7331 13.2941,9.6207 13.6109,9.8041 14.1481,9.9827 15.2052,7.9497 15.8578,7.6333 16.1761,6.4592 16.6967,5.5584 17.9672,2.6 19.2707,4.5745 23.008,12.5807 " />
                    <polygon fill="#a6a6a6"
                        points="23.2198,13.2844 25.0296,15.5958 25.7023,16.6348 26.9007,17.3503 27.6924,18.8671 28.6339,19.544 29.6416,21.2874 30.1793,22.9204 30.7341,23.1774 31.5491,24.0589 31.9489,25.0324 32.4734,26.4994 33.8428,27.4678 34.673,28.5353 34.8847,28.7856 34.8285,28.9234 29.5625,31.5852 22.3428,32.6 17.9672,32.2587 21.0737,27.7521 21.7612,26.7547 21.895,24.2875 20.5482,19.4183 18.3111,15.2733 19.9099,12.3973 17.9672,2.6 19.2707,4.5745 23.008,12.5807 " />
                    <polygon fill="#fff" stroke="#999999" stroke-width=".15"
                        points="13.6805,10.8818 11.2616,9.4996 11.0559,10.9144 11.8389,12.3618 13.3272,12.0311 14.0879,13.8832 16.1715,12.0311 16.6014,13.7839 17.9244,11.1712 18.1228,12.3618 19.4457,11.2042 19.5775,10.7214 17.9672,2.6 16.6967,5.5584 16.1761,6.4592 15.8578,7.6333 15.2052,7.9497">
                    </polygon>
                    <polygon fill="#e6e6e6" stroke="#BDBFC1" stroke-width=".15"
                        points="17.9672,2.6 18.0463,6.2528 18.383,4.6971 18.8561,7.083 18.5661,9.6743 19.0983,8.3046 19.5775,10.7214 20.0823,11.6761 20.8761,12.106 21.1407,10.9815 21.5375,11.8084 21.8021,11.0808 22.4764,11.4421 19.2707,4.5745 ">
                    </polygon>
                </symbol>

                <symbol id="relief-mountSnow-2-bw" viewBox="-5 -8 45 45">
                    <polygon fill="#fff" stroke="#999999" stroke-width=".2"
                        points="25.3915,9.1042 26.9002,11.0311 27.4611,11.8972 28.4601,12.4937 29.12,13.7582 29.9049,14.3225 30.745,15.7759 31.1932,17.1372 31.6557,17.3514 32.3351,18.0863 32.6684,18.8978 33.1056,20.1209 34.2473,20.9281 34.9393,21.818 35.1158,22.0267 35.0689,22.1415 30.679,24.3606 24.6604,25.2064 16.2214,24.5482 14.3198,24.3984 12.5343,24.6493 6.8513,24.206 3.7712,23.9633 2.3933,23.5658 0.1682,22.3334 3.4902,19.2167 3.8441,16.8951 4.7899,15.8988 5.6813,13.4312 7.6713,12.4569 8.6899,10.5168 10.0779,7.8076 10.8097,8.916 12.616,12.7858 13.1603,12.2124 13.8282,7.6609 14.983,8.5189 16.0651,6.3161 17.4391,7.1013 18.9517,4.2204 21.0127,0.1972 22.0994,1.8433 25.2149,8.5176 " />
                    <path fill="#999999"
                        d="M13.0266 13.8057l1.0161 1.2977 0.3775 0.5832 0.6729 0.4017 0.4443 0.8515 0.5286 0.38 0.5657 0.9788 1.365 -0.2171 0.852 0.9077 0.8012 0.7006 1.0769 -0.4987 0.587 0.888 1.3143 1.1862 1.6837 -1.1473 -3.2991 4.8038 -6.6879 -0.5243 -1.7906 0.2516 -2.4564 -0.1915 1.7439 -2.53 0.386 -0.56 0.0751 -1.3851 -0.756 -2.7335 -1.2559 -2.3269 0.8975 -1.6146 -1.0906 -5.5001 0.7318 1.1084 2.098 4.4946 0.1189 0.395zm12.3648 -4.7014l1.5087 1.9269 0.5609 0.8661 0.999 0.5965 0.6599 1.2645 0.7849 0.5643 0.8401 1.4534 0.4482 1.3613 0.4625 0.2143 0.6794 0.7349 0.3333 0.8115 0.4371 1.2231 1.1417 0.8072 0.6921 0.89 0.1764 0.2087 -0.0468 0.1148 -4.3899 2.2191 -6.0187 0.8458 -3.6476 -0.2845 2.5896 -3.7569 0.5732 -0.8316 0.1114 -2.0567 -1.1227 -4.0591 -1.8649 -3.4554 1.3328 -2.3976 -1.6195 -8.1675 1.0867 1.6461 3.1155 6.6743 0.1765 0.5866z" />
                    <path fill="#e6e6e6" stroke="#999999" stroke-width=".1"
                        d="M10.0779 7.8076l1.0906 5.5 0.4152 -0.4101 1.205 0.2576 -1.9788 -4.2391 -0.7319 -1.1084zm12.5157 0.4025l-1.5808 -8.0129 1.0867 1.6461 2.7072 5.7999 -0.3838 0.5883 -0.4636 -0.296 -0.311 0.8985 -0.5241 -0.3498 -0.264 1.1861 -0.2771 -0.6052 -0.4468 0.1919 0.2592 -0.4664 0.1982 -0.5806zm-5.5775 -1.7214l-0.951 -0.1724 1.374 0.785 0.362 -0.6894 -0.3159 -0.047 -0.4691 0.1238zm-2.1029 1.4753l-1.0849 -0.303 1.1548 0.858 0.3482 -0.7086 -0.4181 0.1537z" />
                    <path fill="#FEFEFE" stroke="#BDBFC1" stroke-width=".2"
                        d="M13.4943 9.9367l-0.0192 0.1307 0.773 1.6295 0.9687 -1.1448 0.5504 0.5063 1.0347 -1.2109 0.5504 1.8934 1.0128 -1.387 0.8365 -0.2862 0.4623 0.7926 0.7045 -1.5412 0.9308 1.4432 1.3328 -2.3976 -1.6195 -8.1675 -3.5736 6.904 -1.374 -0.785 -1.0821 2.2027 -1.1548 -0.858 -0.3339 2.2758zm-3.4165 -2.1291l-2.4065 4.6492 0.742 0.5232 1.1558 -0.2973 1.5993 0.6249 -1.0906 -5.5z" />
                </symbol>

                <symbol id="relief-mountSnow-3-bw" viewBox="-5 -15 50 50">
                    <polygon fill="#fff" stroke="#999999" stroke-width=".2"
                        points="35.1337,17.58 34.122,18.8623 31.5268,19.3968 28.6951,19.562 25.2025,19.4911 22.0686,19.053 19.2643,20.1212 14.8201,19.849 10.9897,18.983 7.7168,18.0396 4.4391,18.4829 1.598,17.8161 0.2005,16.9864 5.3775,14.1114 6.9445,13.6145 9.7551,10.1143 10.7985,9.9008 11.1418,9.0682 12.5645,7.9945 13.6885,4.6225 17.0605,0.1265 19.3086,1.2504 19.5301,1.868 20.0211,2.0967 20.0211,2.0967 22.6805,4.6225 22.7195,6.0067 23.6307,6.3628 25.5645,8.9605 27.9106,10.6515 27.912,11.4444 28.1901,12.0933 29.0346,11.8883 29.8293,12.2096 " />
                    <path fill="#a6a6a6"
                        d="M17.6643 2.2612l-0.3434 1.3675 0.2294 0.1158 -0.1215 0.4558 0.0287 0.4166 0.2487 -0.7253 0.0199 0.7745 0.1926 0.9377 -0.9604 1.4775 -0.6513 0.6353 1.7115 -0.7977 0.1556 -0.7421 0.4118 1.3885 1.1335 1.9731 0.7278 1.7545 -0.2079 1.6338 0.7769 0.6722 0.3099 1.1103 0.7775 0.5155 -0.6186 2.4264 0.5834 1.4019 3.1339 0.4381 3.4927 0.0709 2.8316 -0.1651 2.5952 -0.5346 1.0117 -1.2823 -5.3044 -5.3703c-0.2875,-0.1214 -0.5799,-0.2431 -0.8727,-0.3502l-0.3389 0.6201 -0.3658 -0.0155 -0.0618 -0.3708 -0.2782 -0.6489 -0.0014 -0.7929 -2.346 -1.6911 -1.9339 -2.5976 -0.5212 0.0497 -0.3686 0.3529 -0.0604 -2.143 -2.6594 -2.5258 -0.1784 0.6424 -0.5342 -1.4886 -2.2481 -1.124 0.6038 2.1347z" />
                    <polygon fill="#e6e6e6" stroke="#999999" stroke-width=".1"
                        points="19.3086,1.2504 17.0605,0.1265 17.3208,3.6287 17.4576,4.6169 18.2355,6.3837 18.4568,7.1297 19.5555,7.6994 19.9956,6.8192 20.3478,7.1273 21.0519,7.0392 21.7122,7.6554 21.8442,6.0709 22.7409,6.7655 22.6805,4.6225 20.0211,2.0967 19.8426,2.7391 " />
                    <polygon fill="#FEFEFE" stroke="#BDBFC1" stroke-width=".2"
                        points="12.5645,7.9945 12.3831,8.1314 13.3341,8.871 14.0824,8.3429 15.3587,9.2232 16.3071,7.7165 18.0186,6.9189 18.2355,6.3837 17.9188,5.6039 17.7262,4.6661 17.708,3.9637 17.4576,4.6169 17.4288,4.2003 17.5502,3.7445 17.3208,3.6287 17.6643,2.2612 17.0605,0.1265 13.6885,4.6225 " />
                </symbol>

                <symbol id="relief-mountSnow-4-bw" viewBox="-5 -12 45 45">
                    <polygon fill="#fff" stroke="#999999" stroke-width=".2"
                        points=".1806,16.758 3.5087,13.7301 3.9652,14.1439 5.6739,11.6258 7.2317,11.0543 8.5763,9.1197 11.2204,5.181 11.5727,4.0699 14.4278,0.1317 15.4779,0.7406 17.2215,2.5024 18.8233,4.7482 19.5423,4.903 21.1765,3.8055 21.6878,3.1979 22.2862,3.4169 23.2631,4.3754 23.6605,5.4871 24.1225,6.6974 27.0001,10.6046 28.8156,9.4361 30.9325,11.9401 31.9742,13.5462 32.7597,14.0392 35.7881,17.47 35.0629,18.0268 30.1283,18.9459 26.9306,18.8725 20.8774,19.2934 15.3532,19.0173 11.8111,18.7534 9.9342,18.5126 6.0759,18.7455 3.5217,18.2382 " />
                    <path fill="#a6a6a6"
                        d="M35.7881 17.47l-3.0284 -3.4308 -0.7855 -0.493 -1.0417 -1.606 -2.1169 -2.5041 -0.1069 1.6658 -0.5815 0.9516 0.6344 0.4229 -0.1543 1.2251 0.5772 0.7838 0.6872 0.8986 -1.2159 0.8459 0.5287 0.5287 1.0044 0.6344 0.4757 0.7929 0.1189 0.6381 1.8119 -0.3376 2.4673 -0.4596 0.7252 -0.5568zm-16.2458 -12.567l-0.719 -0.1548 -1.6261 -2.2705 -1.7192 -1.7371 -1.0501 -0.6089 -0.806 3.5794 -0.1188 1.5355 0.8458 0.7402 0.5287 -0.6344 -0.5287 2.5375 -1.2158 2.1675 2.2732 -1.9032 0.8458 0.6872 -0.2114 1.4803 -0.0528 1.0573 -0.6344 1.2688 0.2114 0.7929 -1.163 2.009 -0.6344 1.2688 -0.1615 2.1686 2.9143 0.1885 0.2605 -1.5112 -0.2115 -1.6918 2.0478 -2.1712 0.1726 -2.0052 0.7929 1.1101 0.8987 -1.3216 -0.2643 -1.3745 -0.6344 -0.37 0 -0.6344 -0.9656 -0.3996 -0.0917 -1.715 0.1057 -1.4274 0.9113 -0.6609zm2.7439 -1.4861l-0.5984 -0.219 -0.0368 1.0839 -0.9781 1.3217 0.6344 0.6079 -0.2379 1.4538 0.5287 1.1366 -0.1851 1.1631 0.7402 1.5331 0.7929 1.6124 -0.4757 1.2159 0.2643 0.8458 1.3216 1.2424 0.9516 0.1322 1.6457 2.3451 0.601 -0.0118 -0.5021 -1.3289 -0.0529 -0.7666 -1.0044 -0.9252 0.0528 -1.0044 0.5815 -0.0264 -1.1631 -2.4847 0.7402 0.3436 0.5551 -0.3964 0.1322 -1.0574 0.4061 -0.629 -2.8776 -3.9072 -0.8594 -2.3221 -0.9769 -0.9585z" />
                    <polygon fill="#FEFEFE" stroke="#BDBFC1" stroke-width=".2"
                        points="13.6218,3.7111 14.4278,0.1317 11.5727,4.0699 11.2204,5.181 10.2231,6.6667 11.5706,6.2509 11.13,8.3655 12.0332,7.6827 11.8349,10.1277 13.2509,9.9588 14.3488,7.89 14.8775,5.3524 14.3338,5.9737 13.503,5.2466" />
                    <polygon fill="#e6e6e6" stroke="#999999" stroke-width=".1"
                        points="14.3488,7.89 13.2509,9.9588 15.4062,8.1543 16.252,8.8415 16.9456,9.555 17.7385,8.718 18.617,8.7063 18.5357,6.8509 18.631,5.5638 19.5423,4.903 18.8233,4.7482 17.1189,2.3987 16.3376,1.6091 15.4779,0.7406 14.4278,0.1317 13.6218,3.7111 13.503,5.2466 14.3488,5.9868 14.8775,5.3524 " />
                    <polygon fill="#FEFEFE" stroke="#BDBFC1" stroke-width=".2"
                        points="18.5357,6.8509 18.617,8.7063 19.5826,9.1059 19.5826,9.7403 20.5423,9.1255 21.4131,9.9649 21.5982,8.8018 21.0695,7.6652 21.3074,6.2114 20.673,5.6035 21.6511,4.2818 21.6878,3.1979 21.1765,3.8055 19.5423,4.903 18.631,5.5638 " />
                    <polygon fill="#e6e6e6" stroke="#999999" stroke-width=".1"
                        points="22.2862,3.4169 21.6878,3.1979 21.6511,4.2818 20.673,5.6035 21.3074,6.2114 21.0695,7.6652 21.5982,8.8018 21.4131,9.9649 22.4095,10.3424 23.0704,9.1529 23.6651,9.4173 24.2158,8.2718 24.8766,8.448 25.0536,7.9618 24.1225,6.6974 23.2631,4.3754 " />
                </symbol>

                <symbol id="relief-mountSnow-5-bw" viewBox="-3 -10 40 40">
                    <polygon fill="#fff" stroke="#999999" stroke-width=".2"
                        points=".147,15.0422 1.6442,13.028 3.3151,11.6457 4.1434,10.0413 4.7098,10.3389 6.8955,7.0068 8.6059,5.1538 9.0229,3.7293 10.0368,2.3185 12.2006,4.7834 14.6687,3.678 18.1604,1.3332 20.0044,0.134 23.2333,4.2834 24.3981,3.1609 25.3939,4.0708 27.6095,6.6496 28.7754,8.0066 30.309,8.9186 31.4894,10.6382 32.5909,12.0173 33.1688,13.2308 33.746,13.7923 34.1887,14.9335 35.1672,15.7911 33.2794,16.965 30.2507,17.8531 27.9082,18.0179 25.5124,18.5445 24.1945,18.5221 22.0666,17.9923 20.7224,17.5559 19.3848,17.2729 18.0714,17.4958 16.8448,17.931 14.923,18.487 11.9731,18.5021 8.0901,18.2986 4.9114,17.2725 1.9652,16.1057 " />
                    <polygon fill="#a6a6a6"
                        points="12.2006,4.7834 10.0368,2.3185 10.1151,7.3841 11.4163,8.7627 12.2026,10.4473 11.8763,13.7632 14.5464,16.7656 15.0352,18.4546 19.3848,17.2729 16.5848,14.5328 17.904,13.4692 15.4923,10.524 14.5256,8.5214 12.9142,7.5961 13.9488,6.2257 " />
                    <polygon fill="#a6a6a6"
                        points="23.2333,4.2834 20.0044,0.134 19.9564,3.3253 19.4305,3.5276 18.8945,6.045 19.0996,7.2016 19.8037,9.1055 20.5765,9.6558 20.1327,11.8479 20.4782,12.7374 22.7768,14.6006 22.0989,12.9465 22.0752,12.3178 22.7092,10.7369 22.4605,9.1642 22.6231,8.3056 22.2254,6.9168 23.5867,5.0494 " />
                    <polygon fill="#a6a6a6"
                        points="35.1672,15.7911 34.1887,14.9335 33.746,13.7923 33.1688,13.2308 32.5909,12.0173 30.309,8.9186 28.7754,8.0066 25.3939,4.0708 24.3981,3.1609 24.8,5.3852 23.8709,6.1557 25.4726,8.5966 25.9139,10.4017 25.7241,12.6093 24.6322,14.2381 24.9293,15.4692 26.199,16.3461 28.0999,16.8205 28.1829,17.9986 30.2507,17.8531 33.2794,16.965 " />
                    <path fill="#FEFEFE" stroke="#BDBFC1" stroke-width=".2"
                        d="M23.5867 5.0494l-0.3534 -0.766 1.1648 -1.1224 0.4019 2.2243 -0.9291 0.7703 -0.625 0.3316 0.3847 -0.5987 -0.6602 0.0063 0.6163 -0.8453zm-13.4716 2.3346l-0.0783 -5.0655 -1.0139 1.4107 -0.417 1.4245 -1.7104 1.8531 -0.1947 0.8318 0.728 -0.2978 0.1765 0.728 0.7942 -1.2465 0.0883 0.4854 0.4413 -0.5405 0.5736 1.5994 0.6126 -1.1826zm4.5536 -3.706l-2.4681 1.1052 1.7481 1.4424 -0.5173 0.6852 0.2957 0.3987 0.75 -0.706 0.364 0.3641 0.5516 -1.2024 0.1875 0.5295 0.2096 -0.2317 0.386 0.4192 0.6398 0.3199 0.2427 -0.9597 0.5736 1.4009 0.5074 -0.7943 0.3089 0.5074 0.5227 -0.4801 -0.0765 -0.4315 0.536 -2.5174 0.5259 -0.2023 0.0479 -3.1913 -5.3356 3.544z" />
                    <path fill="#e6e6e6" stroke="#999999" stroke-width=".1"
                        d="M24.3981 3.1609l0.4019 2.2243 -0.9291 0.7703 0.6886 0.5329 0.6056 0.4387 0.0221 -1.0588 0.4412 0.5735 0.0833 -0.7817 0.5106 0.4833 0.4121 -0.8287 -1.0977 -1.2778 -1.1387 -1.076zm-14.3613 -0.8424l0.0783 5.0655 0.3029 0.8298 0.4744 -0.8494 0.7721 0.6288 0.4523 -1.3898 1.3147 0.3075 0.5173 -0.6852 -1.7481 -1.4424 -2.1638 -2.4647zm8.8577 3.7265l0.0765 0.4315 0.591 -0.3692 0.375 0.7943 0.728 -1.3679 0.1765 0.4413 0.3971 -0.7942 0.3971 0.9045 0.5515 -0.6619 0.1765 0.6619 0.5295 -0.6178 0.077 0.4271 0.6163 -0.8453 -0.3534 -0.766 -3.229 -4.1494 -0.0479 3.1913 -0.5259 0.2023 -0.536 2.5174z" />
                </symbol>

                <symbol id="relief-mountSnow-6-bw" viewBox="-8 -10 40 40">
                    <polygon fill="#a6a6a6"
                        points="22.529,16.6762 21.9433,15.1032 21.8165,13.7052 21.6735,12.1298 20.7584,9.2788 18.1129,5.2678 17.7604,4.1468 14.9038,0.1306 13.8531,0.7119 12.1086,2.4283 10.506,4.6328 9.7866,4.7685 8.1515,3.6271 7.64,3.0056 7.0412,3.2088 6.0639,4.1418 5.6662,5.2435 5.204,6.4422 2.3249,10.275 1.7062,11.6555 2.3144,13.0205 2.0235,14.2558 1.1772,13.6911 1.0735,15.1363 0.4367,16.8583 0.138,17.55 2.3944,18.5492 8.4508,19.1311 13.9779,19.0017 17.5219,18.8317 19.3998,18.6407 " />
                    <path fill="#fff" stroke="#999999" stroke-width=".1"
                        d="M9.7866 4.7685l0.7194 -0.1357 1.627 -2.2285 1.7201 -1.6924 1.0506 -0.5812 0.8064 3.6027 0.1188 1.5394 -0.8462 0.7182 -0.529 -0.6488 0.529 2.553 1.2165 2.2009 -2.2744 -1.9646 -0.8462 0.6652 0.2115 1.4867 0.0529 1.0592 0.6347 1.2863 -0.2115 0.7877 1.1636 2.041 0.6347 1.2862 0.1616 2.1741 -2.9158 0.1112 -0.2607 -1.5189 0.2116 -1.6871 -2.0489 -2.2267 -0.1727 -2.0108 -0.7934 1.0896 -0.8992 -1.3462 0.2645 -1.3681 0.6347 -0.3534 0 -0.6347 0.9661 -0.3741 0.0918 -1.7136 -0.1058 -1.431 -0.9118 -0.6854zm-2.7454 -1.5597l0.5987 -0.2032 0.0368 1.0853 0.9786 1.3484 -0.6347 0.5914 0.238 1.4609 -0.529 1.1231 0.1852 1.1687 -0.7406 1.5142 -0.7934 1.5922 1.5431 0.6224 1.2433 0.621 0.0153 0.9133 -0.2397 0.777 1.8113 0.1046 1.0597 0.4823 0.9965 2.6186 -4.3596 0.1022 -6.0565 -0.5819 -2.2625 -1.0018 0.3049 -0.6891 0.6368 -1.722 0.1037 -1.4452 0.8463 0.5647 0.2909 -1.2353 -0.6082 -1.365 0.6187 -1.3805 2.8791 -3.8328 0.8598 -2.3004 0.9774 -0.933z" />
                    <polygon fill="#FEFEFE" stroke="#BDBFC1" stroke-width=".2"
                        points="6.0639,4.1418 5.204,6.4422 5.4977,7.1815 6.6217,6.7187 6.6217,8.1952 7.3049,7.7104 7.6135,8.2393 8.2586,7.4916 8.0206,6.0308 8.6553,5.4393 7.6767,4.0909 7.64,3.0056 7.0412,3.2088" />
                    <polygon fill="#FEFEFE" stroke="#BDBFC1" stroke-width=".2"
                        points="10.506,4.6328 9.7866,4.7685 10.6984,5.4539 10.7907,6.7013 10.7583,7.7417 11.3161,7.2916 11.6687,8.3715 12.4841,6.7847 12.8809,7.7104 13.7183,6.5423 14.2693,7.3137 14.9829,7.8952 14.4539,5.3422 14.9829,5.991 15.8291,5.2728 15.7102,3.7334 14.9038,0.1306 13.8531,0.7119 12.1086,2.4283 " />
                    <polygon fill="#e6e6e6" stroke="#999999" stroke-width=".1"
                        points="7.6767,4.0909 7.64,3.0056 8.0828,3.5436 10.6984,5.4539 10.7907,6.7013 10.7583,7.7417 10.236,6.9831 10.0156,7.3799 9.8613,6.7187 9.3985,8.1512 9.2443,7.2476 8.5831,7.9528 8.2586,7.4916 8.0206,6.0308 8.6553,5.4393" />
                    <polygon fill="#e6e6e6" stroke="#999999" stroke-width=".1"
                        points="15.7144,3.789 15.7102,3.7334 14.9038,0.1306 17.7604,4.1468 18.1129,5.2678 18.4803,5.8251 18.0375,6.4433 17.5306,5.5507 17.2662,6.333 16.4727,6.9392 16.5168,6.1236 15.9768,6.7518 14.9829,5.991 15.8291,5.2728" />
                </symbol>

                <symbol id="relief-vulcan-1-bw" viewBox="-5 -10 110 110">
                    <ellipse fill="#999999" opacity=".5" cx="50" cy="64" rx="30" ry="4"></ellipse>
                    <path fill="#fff" stroke="#5c5c70" stroke-width=".1"
                        d="m 40.318,43.0945 1.2624,1.4851 2.2879,1.7295 3.6464,2.047 0.7864,2.661 1.4661,1.7722 2.5083,1.3532 2.7505,0.3824 4.548,2.8992 4.3962,2.9284 4.26,2.533 0.0746,0.7449 L 55.9019,63.906275 34.0507,63.6698 18.4326,63.9645 C 12.828851,63.668708 7.2014518,63.758742 1.6058,63.3217 l 6.2682,-4.7224 1.9305,-0.55 3.4543,-2.435 1.6264,-1.9274 1.8235,-2.4455 3.3521,-1.8555 3.2709,-1.0652 1.9097,-2.384 3.0893,-2.7945 c 3.9306,0.6688 7.9292,0.6208 11.9872,-0.0477 z" />
                    <path fill="#ccced1"
                        d="m 49.5039,15.24 c 4.126703,7.052655 8.039095,13.804219 12.155745,20.862742 1.488026,-0.891499 3.410852,-3.023567 6.036874,-2.472897 2.428268,0.509201 4.651275,-2.255062 4.159839,-4.78358 -0.217013,-2.829685 3.079909,-3.305126 3.604522,-5.767821 1.199165,-1.401687 4.285792,-0.670495 4.300237,-3.289515 1.317092,-3.046435 4.612248,0.247252 6.586644,0.779407 2.59062,0.607246 4.174976,-3.029778 6.829551,-2.126519 1.641144,0.31721 3.28076,-1.413401 4.889632,-0.472092 0.899819,-0.602875 2.556726,-1.262629 3.057376,-1.606987 -0.0938,-2.129258 -1.275026,-3.744355 -2.898687,-4.950311 0.231204,-1.150324 0.401964,-1.114283 -0.873573,-1.2106 C 95.554729,8.7767013 93.878043,7.2634405 91.390175,7.641688 89.344758,6.9717881 88.477997,4.4543316 86.10117,4.3466882 81.981911,3.3946205 77.938067,1.9937993 73.709246,1.6052857 71.108742,0.94989087 68.393797,-0.77510509 65.682632,0.42725723 63.303424,0.88219116 60.548455,-0.08283459 58.507815,1.5652706 c -2.11057,0.5972 -2.698897,2.7373648 -4.21029,4.0606937 -1.394921,1.4065359 0.4728,2.8050874 0.99098,3.5161668 C 53.757109,9.7455849 54.166,12.790671 51.884625,12.985492 51.002361,13.616529 50.47659,14.713814 49.5039,15.24 Z" />
                    <path fill="#babcbf"
                        d="m 49.5044,15.2403 c 1.872188,-0.138196 2.425637,-2.845949 4.57073,-2.201258 1.144577,-1.239645 1.265218,-3.6735644 2.316299,-4.609529 -2.750165,-1.309054 0.09506,-3.2190069 0.839232,-4.8872084 2.490924,-0.9535868 5.115499,-2.55017169 8.057631,-1.7612421 2.695454,-0.85754135 5.305909,0.7870874 7.773131,0.8026466 2.409706,0.8458431 4.451711,2.5306898 6.680161,3.7956721 2.296373,1.6938053 6.468639,1.0207559 6.988137,4.7481988 1.338125,1.622767 3.237548,3.048988 2.244679,5.537294 0.679868,3.02407 -3.661575,3.975327 -5.196628,1.728355 -2.133084,-2.611082 -5.551095,1.155994 -6.569356,2.71362 -2.323326,1.338206 -3.135934,3.85674 -5.292457,5.674255 -1.358773,2.083033 0.458567,5.947891 -3.336796,6.161344 -2.570722,-0.224246 -5.261874,-0.123487 -6.325269,2.757753 -1.891404,1.772211 -4.914889,1.91023 -7.451697,1.999909 -3.066782,0.108414 -6.090481,0.05214 -8.834187,1.704591 -2.2624,1.362577 -4.755417,2.854218 -5.662414,3.901477 -4.174179,1.077038 -7.897276,0.780504 -12.093528,0.04834 0,0 3.350593,-3.582697 3.163478,-5.042706 0.406132,-3.386301 3.499175,-5.702031 4.108846,-8.738619 0.971591,-2.557705 0.952214,-5.995887 2.953555,-7.863737 2.36467,-0.738408 4.092762,-2.156665 6.402735,-2.934491 0.879172,-2.130542 2.48838,-2.667714 4.663718,-3.534667 z" />
                    <path fill="#acafb1"
                        d="m 48.8842,16.8699 c -1.785997,0.666059 -3.779594,1.246295 -4.301192,3.452184 -0.540223,2.017352 -3.325715,0.423824 -4.4494,2.229627 -2.494158,-0.673487 -2.019728,1.842576 -2.548911,3.383955 -1.030703,1.62935 -1.137361,3.670141 -1.837647,5.502122 -1.455888,1.8507 -2.889787,3.789023 -3.24835,6.150212 -0.642322,1.376996 -2.934697,4.232379 -0.743197,5.002756 3.276226,0.386491 6.865778,0.297294 9.668135,-1.671956 1.992411,-0.789487 3.045587,-2.751047 4.759962,-3.9329 1.189858,-0.552573 2.437218,-0.990001 3.777113,-0.811 1.907845,-0.01586 3.785152,-0.37634 5.672187,0.08659 1.978298,0.05321 -0.985275,-1.72622 0.908237,-2.032705 1.474101,-0.686901 1.911031,0.604732 2.789914,1.139442 0.72917,-0.07521 2.250626,0.907421 2.007947,-0.440847 0.758787,-1.773464 1.770613,-4.072587 4.142983,-2.926051 2.333406,0.19823 4.47649,-1.394758 4.631923,-3.803654 0.362029,-1.471587 0.276981,-3.115583 2.276446,-2.98201 1.962019,-0.748148 2.294241,-3.385233 1.73135,-5.017763 -1.101666,-1.371396 0.2507,-2.912999 1.327975,-3.832219 C 76.753843,15.865967 76.05046,14.539717 75.8076,13.5526 75.093304,12.114215 75.790908,10.071743 73.619081,9.8482516 73.01701,8.9737297 73.441083,9.1741347 73.177475,8.0910547 73.369945,6.7516759 71.308021,6.5289859 70.544363,5.961525 69.388061,5.7732631 68.393705,5.6084929 67.935746,4.3663653 66.967743,3.8236661 65.71194,4.1429299 64.948956,3.4639047 63.291625,3.3657328 61.428814,3.5574961 60.282876,4.8581076 58.121173,5.7094079 58.85032,7.8874864 58.599915,9.5497793 57.986956,10.324235 56.222784,10.545705 57.2655,11.7578 c -1.231347,1.555102 -2.786541,2.706743 -4.5422,3.6878 -1.39291,0.193194 -2.512881,1.045804 -3.8391,1.4243 z" />
                    <path fill="#babcbf"
                        d="M62.0795 7.1509c-3.6626,10.7376 -8.7984,12.2353 -17.6693,17.6735 -3.1861,1.9533 -5.9317,3.3553 -6.0646,7.1857 -0.1229,3.5442 -4.6114,6.1599 -6.1924,10.645 1.2102,-4.6426 5.7709,-7.1396 5.8438,-10.622 0.0846,-4.0368 2.831,-5.5158 6.1732,-7.6137 8.6206,-5.4111 13.739,-6.9169 17.2433,-17.4406 0.0476,-0.1838 0.2352,-0.2944 0.419,-0.2468 0.1838,0.0476 0.2944,0.2352 0.2468,0.419z"
                        fill="#A9ABAE" />
                    <path fill="#babcbf"
                        d="M55.2664 26.6297c-0.3962,6.424 -6.9302,8.2863 -11.8461,10.3709 -3.1118,1.3196 -3.876,2.2974 -4.5665,5.5404 0.5003,-3.3107 1.3827,-4.3655 4.4858,-5.7312 4.7065,-2.0713 11.2241,-3.9743 11.5587,-10.1758 -0.0012,-0.1016 0.0803,-0.1849 0.1819,-0.1861 0.1016,-0.0012 0.1849,0.0802 0.1861,0.1819z"
                        fill="#A9ABAE" />
                    <path fill="#babcbf"
                        d="M77.8011 15.273c-9.036,5.077 -3.2037,7.3106 -11.9378,11.6614 -0.669,0.3332 -9.2121,4.0942 -8.7423,5.3387 -1.2201,-1.0082 8.3483,-5.6097 8.5733,-5.7275 8.4526,-4.4217 2.552,-6.5294 11.8181,-11.8967 0.1724,-0.0797 0.3767,-0.0046 0.4564,0.1678 0.0797,0.1724 0.0046,0.3767 -0.1678,0.4564z"
                        fill="#A9ABAE" />
                    <path fill="#babcbf"
                        d="M57.112 21.9726c-7.7181,2.2071 -6.6191,0.6747 -9.488,6.388 -1.8363,3.6568 -4.9682,3.61 -5.427,4.8676 -0.13,-1.0711 3.4686,-1.6665 5.0386,-5.0251 2.7917,-5.9721 1.9202,-4.5158 9.6561,-6.8819 0.1799,-0.0608 0.3751,0.0356 0.4359,0.2155 0.0608,0.1799 -0.0356,0.3751 -0.2155,0.4359z"
                        fill="#A9ABAE" />
                    <path fill="#babcbf"
                        d="M76.6844 8.0828c-1.4038,6.3969 -6.7659,5.3479 -9.1709,10.9842 -1.8722,4.3877 -5.6435,3.475 -7.1686,5.4454 0.5824,-1.7866 5.0761,-1.3574 6.763,-5.58 2.3337,-5.8416 7.6745,-4.9594 8.8951,-10.9432 0.0259,-0.1882 0.1994,-0.3198 0.3875,-0.2939 0.1882,0.0259 0.3198,0.1994 0.2939,0.3875z"
                        fill="#A9ABAE" />
                    <path fill="#babcbf" fill="#A9ABAE"
                        d="M68.804 3.1899c-1.0348,4.1371 -2.6419,2.8465 -3.0558,7.4307 -0.4114,4.556 0.4939,2.3646 -3.4931,6.4894 3.6446,-4.6394 2.7458,-1.9022 3.016,-6.5223 0.2786,-4.7653 1.9687,-3.5801 2.8522,-7.4959 0.0271,-0.188 0.2014,-0.3183 0.3894,-0.2912 0.188,0.0271 0.3183,0.2014 0.2912,0.3894z" />
                    <path fill="#d2d3d5"
                        d="m 45.7612,48.0915 c 0.0019,0.0017 0.0039,0.0034 0.0058,0.0051 z M 26.501,46.9652 c -0.0014,0.003 -0.0028,0.006 -0.0042,0.0091 z m -0.6925,6.4672 c -5e-4,0.0013 -0.0011,0.0025 -0.0015,0.0038 z m 3.1367,-7.2612 c 0.0012,0.0021 0.0023,0.0041 0.0034,0.006 z m 0.1546,-0.2241 c 0.0014,0.0016 0.0027,0.0032 0.004,0.0049 z m 11.8023,1.9363 c 1.373,1.0631 2.7431,2.1294 4.1107,3.1992 0.1277,0.1125 0.2003,0.2226 0.2528,0.3846 0.046,0.1653 0.0461,0.2971 0.0013,0.4626 0.0051,0.0308 -0.8731,3.3974 -0.9854,3.7918 0.0262,-0.0903 0.0364,-0.1684 0.0326,-0.2626 0,-1e-4 5e-4,0.0062 6e-4,0.0082 0.0971,1.2511 0.1578,2.4982 0.2127,3.7516 0.0056,0.1633 -0.0172,0.2888 -0.0799,0.4398 -0.068,0.1493 -0.1432,0.2507 -0.2667,0.3586 -1.1022,0.9093 -3.87315,3.1833 -5.05715,3.9851 -0.2016,0.1338 -1.34695,-0.0779 -1.34695,-0.0779 0,0 2.5301,-2.6917 3.2995,-3.4461 l 1.7344,-1.5281 -0.2456,-3.4034 c -0.0056,-0.1318 0.0122,-0.1998 0.0393,-0.3246 0.3683,-1.1652 0.7371,-2.3296 1.0991,-3.4969 0.0248,-0.0804 0.05,-0.1608 0.0745,-0.2413 -0.0416,0.1511 -0.0415,0.2728 0,0.424 0.0476,0.1477 0.1132,0.2503 0.2295,0.3531 0.0616,0.0741 -3.9595,-3.4677 -5.737,-5.1321 -1.049,-0.9821 -1.037925,-1.066622 -2.005425,-2.122022 0.874485,-1.222855 3.008176,1.61658 4.637125,2.876422 z M 25.9867,63.7102 24.4736,63.7063 c -0.7068,0.2897 -1.5241,0.5416 -1.3493,0.0369 0.0057,-0.0134 0.0117,-0.0268 0.018,-0.0403 l -5.0331,-0.0128 c -0.6658,0.3023 -1.4936,0.6221 -1.6134,0.382 -0.2698,0.0853 -0.5138,0.1089 -0.6058,-0.0392 -0.1007,0.0375 -0.2069,0.0561 -0.3294,0.0598 -3.3817,0.0568 -6.862,0.0909 -10.2354,-0.1242 -0.1254,-0.0092 -4.5764,-0.1163 -3.4882,-0.72 1.346,-0.6498 4.3583,-0.6611 5.8204,-0.7454 1.4794,-0.083 2.9452,-0.131 4.413,-0.1595 l 0.2745,-0.1779 1.8114,-0.4876 0.3962,-1.2597 1.3585,-0.5282 1.5849,-0.1219 0.9057,-0.6908 0.9907,0.1556 -0.0511,-0.1321 c -0.588,-1.52 -1.1666,-3.0439 -1.7546,-4.5636 -0.0788,-0.218 -0.0822,-0.3985 -0.0107,-0.619 0.0827,-0.2163 0.1994,-0.3552 0.3976,-0.475 1.9454,-1.0791 3.8873,-2.13 5.8532,-3.1704 0.2608,-0.1379 0.5286,-0.2704 0.7873,-0.4106 -0.1006,0.0615 -0.1643,0.1317 -0.2148,0.2383 0.8009,-1.5586 1.6239,-3.0427 2.4849,-4.5646 0.0075,-0.0127 0.4447,-0.7805 0.4932,-0.4277 -0.7053,1.7943 -1.423,3.5853 -2.1436,5.3734 -0.0377,0.0814 -0.0856,0.1346 -0.162,0.1814 -0.0038,0.0147 -3.4802,2.1749 -3.8212,2.3846 -0.8611,0.5295 -1.7259,1.0782 -2.5946,1.5922 0.1105,-0.0665 0.1754,-0.143 0.2219,-0.2634 0.0403,-0.1218 0.0392,-0.2242 -0.0042,-0.3451 0,0 1.7011,3.931 2.1937,5.1211 0.375,-0.2535 0.7509,-0.5077 1.1253,-0.7679 0.3836,-0.2665 0.7711,-0.529 1.1535,-0.7966 -0.1153,0.0867 -0.1888,0.179 -0.2457,0.3117 0.4471,-1.02 0.8899,-1.9723 1.3912,-2.9651 0.393,-0.7762 0.8307,-1.4288 1.315,-2.1416 0.0713,-0.0955 0.2279,-0.2771 0.3424,-0.1193 -0.3629,1.3549 -0.7445,2.7053 -1.1641,4.0438 -0.1514,0.4744 -0.304,0.9485 -0.4574,1.4223 0.4593,-0.2688 0.9217,-0.5383 1.3881,-0.8119 -0.1054,0.0651 -0.1795,0.1359 -0.2492,0.2382 0,0 1.0334,-1.5106 1.5453,-2.269 1.1687,-1.7312 2.359,-3.4283 3.5433,-5.1455 -0.0676,0.1077 -0.0967,0.2019 -0.1032,0.3288 -0.0011,0.1266 0.022,0.2209 0.0826,0.3321 0,0 -0.5188,-1.0154 -0.7725,-1.5191 -0.6463,-1.2824 -1.179,-2.5556 -1.7237,-3.8788 -0.0236,-0.0622 -0.2233,-0.5734 0.0354,-0.4899 l 0.0042,0.0061 c 0.0069,-1e-4 0.0144,2e-4 0.0225,9e-4 1.514,1.5564 3.015,3.1339 4.4842,4.7324 0.0963,0.1054 0.1984,0.2118 0.2914,0.3193 0.0803,0.1 0.1197,0.1924 0.1361,0.3197 0.0112,0.1282 -0.0078,0.2273 -0.0649,0.3425 0.0018,0.0089 -2.6532,5.6465 -2.9315,6.1963 0.0406,-0.0776 0.0633,-0.145 0.0785,-0.2313 0.0012,-0.0014 -0.1007,0.7978 -0.1313,1.0286 -0.1335,1.0053 -0.2936,2.0037 -0.4615,3.0037 -0.0279,0.1561 -0.0741,0.2699 -0.1621,0.4021 -0.0921,0.1286 -0.1829,0.2124 -0.3188,0.2933 -1.1877,0.6688 -2.3952,1.3313 -3.6449,1.8796 l 0.4111,0.492 z m -6.5129,-4.4641 0.1529,0.024 c 0.0522,-0.1289 0.1264,-0.2248 0.2441,-0.317 z m 3.4591,1.9275 0.1669,0.1797 1.0189,1.0972 0.1111,0.0418 c 0.5896,-0.4654 1.268,-0.8748 1.7208,-1.1858 0.7705,-0.5264 1.5677,-1.0478 2.3718,-1.5214 -0.1115,0.0662 -0.1849,0.1347 -0.2606,0.24 -0.0717,0.1074 -0.1107,0.2013 -0.1333,0.3285 -0.0468,0.0935 0.5059,-2.9473 0.6892,-4.0133 0.0173,-0.1008 0.0506,-0.2065 0.1008,-0.296 0.3756,-0.6714 0.7441,-1.3498 1.1113,-2.026 l 0.173,-0.3177 c -0.9648,1.6073 -1.9345,3.2117 -2.9136,4.8097 -0.0856,0.1257 -0.1702,0.2069 -0.2996,0.2869 -0.001,0.0025 -0.6916,0.4433 -0.766,0.4906 -0.994,0.6267 -2.0331,1.2685 -3.0904,1.8858 z m 21.6795,-14.158 c 0.8938,0.7045 1.7841,1.4134 2.6728,2.1244 0.0582,0.0528 0.0889,0.106 0.1073,0.1822 0.0015,0.0013 0.6917,2.6436 0.7444,2.8755 -0.0168,-0.0793 -0.0496,-0.1352 -0.1099,-0.1893 -5e-4,-0.0027 0.9606,0.7144 1.1481,0.8553 0.5241,0.394 1.0672,0.7868 1.5812,1.1913 -0.0521,-0.0424 -0.0995,-0.0679 -0.1631,-0.0891 0,0 3.5221,0.9115 4.3455,1.147 0.083,0.0255 0.1481,0.0567 0.2209,0.1039 0.0125,-0.0016 2.8665,1.7712 3.1975,1.9797 2.3623,1.4973 4.7629,3.0939 6.9724,4.8058 0.0017,0.0012 -0.1708,-0.0988 -0.2361,-0.0931 0,1e-4 0.3695,0.1055 0.506,0.1468 0.2054,0.0626 3.3876,0.8241 2.4806,1.2387 -0.9807,0.3718 -2.236,0.1163 -3.2507,-10e-5 -0.1089,-0.0211 -0.19,-0.054 -0.2837,-0.1131 -0.0037,9e-4 -0.9925,-0.5699 -1.0766,-0.6187 -3.1963,-1.8526 -6.1286,-3.9744 -9.1885,-6.0299 0.0634,0.0414 0.1231,0.0694 0.1952,0.0921 0,0 -0.2064,-0.0652 -0.3093,-0.0975 -1.3251,-0.4163 -2.6464,-0.8446 -3.9708,-1.2616 -0.1181,-0.0383 -0.2038,-0.0839 -0.3006,-0.1618 -0.8675,-0.737 -1.7257,-1.4772 -2.5786,-2.2309 -0.1496,-0.1302 -0.2295,-0.2639 -0.2718,-0.4578 -0.0675,-0.4205 -0.134,-0.841 -0.2,-1.2618 -0.0865,-0.5585 -0.1638,-1.1145 -0.2329,-1.6753 0.0245,0.1017 0.0673,0.1759 0.1449,0.2465 -0.6851,-0.7266 -1.33,-1.4546 -1.9886,-2.2027 -0.0335,-0.0396 -0.4475,-0.5208 -0.1554,-0.5067 z m -12.7976,3.4025 3e-4,0.0022 0.2813,0.3698 c -0.0897,-0.1126 -0.1331,-0.2168 -0.151,-0.3596 -0.0119,-0.1437 0.0091,-0.2542 0.0736,-0.3832 l -0.2041,0.3708 z m 2.5515,8.528 c -0.079,-0.6791 -0.1623,-1.358 -0.246,-2.0365 -0.0045,-0.0447 -0.0021,-0.0788 0.0092,-0.1223 0.0027,-0.0353 0.0543,-0.1046 0.0553,-0.1106 1.3536,-1.8017 2.691,-3.61 4.0031,-5.4423 -0.0257,0.0334 -0.0406,0.0629 -0.0529,0.1032 -0.0163,0.0319 -0.0071,0.0785 -0.0102,0.1119 -0.0031,0.0338 0.0234,0.0795 0.0318,0.1082 0.0193,0.037 0.0412,0.0646 0.0726,0.0921 -1.2585,-0.9711 -2.7186,-2.1244 -4.0785,-2.9358 -0.7384,-0.4627 -4.2016,-3.3514 -3.8525,-4.1363 1.5454,-0.4456 4.0924,2.1976 5.0112,3.1002 1.1274,1.1404 2.2598,2.2689 3.4112,3.3851 0.0487,0.0432 0.0796,0.0824 0.1099,0.1401 0.0273,0.0554 0.0412,0.1029 0.0477,0.1643 0.0051,0.062 5e-4,0.1096 -0.0159,0.1695 -0.0023,0.0241 -0.0621,0.146 -0.0804,0.1558 -1.5051,1.6933 -2.9505,3.3949 -4.3869,5.1465 -0.0067,0.0084 -0.0064,0.0108 -0.0109,0.019 -0.002,0.0035 -0.0023,0.022 -0.0025,0.0222 -0.0032,0.003 0.1569,1.8069 0.1717,1.9699 0.138,1.6198 0.2761,3.2396 0.4141,4.8594 -0.2003,-1.588 -0.4005,-3.1758 -0.6009,-4.7638 z" />
                    <path fill="#a6a6a6"
                        d="m 35.51055,43.935956 9.08155,7.730644 -1.1462,3.8206 0.191,3.8206 -5.34205,4.7118 L 68.4924,64.03675 68.2303,62.8856 55.0261,54.525 53.6509,54.3338 52.2757,54.1426 49.7674,52.7894 48.3013,51.0172 47.5149,48.3562 44.084,46.4303 41.7744,44.7264 40.229712,43.382062 c -1.841275,0.483307 -3.63078,0.512538 -4.719162,0.553894 z M 20.2129,59.3621 l -1.8114,-0.2845 2.1834,1.2358 0.7979,0.7999 -0.959,0.4474 0.8375,1.1781 -4.53735,1.23235 9.26255,-0.07345 -0.6792,-1.0003 -1.1888,-0.447 -2.1509,-2.3162 z" />
                    <polygon fill="#D2D3D5"
                        points="50.236,58.692 48.7077,58.3578 50.5499,59.8101 51.2231,60.7502 50.414,61.2759 51.1206,62.6605 48.3734,63.7782 55.1073,63.8021 54.5342,62.8469 53.5313,62.3216 51.7165,59.5994 " />
                    <path fill="#808080"
                        d="m 28.9597,55.8827 -3e-4,-7e-4 0.102,-0.1141 c 0.7095,-0.7938 1.1291,-1.709 1.3673,-2.7399 0.4441,-1.9223 0.1983,-3.9097 0.552,-5.8266 l 0.0227,-0.1229 0.118,-0.0409 c 0.3547,-0.1229 0.8258,-0.6708 1.057,-0.9512 0.2835,-0.3437 0.6214,-0.625 1.0089,-0.8443 0.385,-0.2179 0.7072,0.2027 1.0282,0.3405 l 0.0789,0.0338 0.0338,0.0789 c 0.2416,0.5642 0.5103,1.1239 0.8237,1.6519 l 0.0907,0.1527 -2e-4,2e-4 0.0992,0.1532 c 0.4049,0.6249 0.8833,1.1924 1.5255,1.5823 0.3805,0.231 0.8447,0.3808 1.1939,0.6362 0.4213,0.3082 0.6037,0.7456 0.7127,1.2425 0.0232,0.1057 0.035,0.2133 0.0356,0.3215 0.004,0.7151 -0.4926,1.404 -0.9158,1.9426 -0.5364,0.6826 -1.1209,1.3191 -1.5873,2.0556 -0.0623,0.0984 -0.1223,0.1983 -0.1793,0.2997 0.3591,-0.5128 0.7694,-1.0011 1.0815,-1.3894 0.597,-0.7429 1.8668,-2.2306 1.6684,-3.2538 -0.0955,-0.4929 -0.2441,-0.9666 -0.6697,-1.269 -0.2045,-0.1453 -0.4512,-0.2524 -0.675,-0.366 C 37.2067,49.2904 36.9157,49.1116 36.6358,48.8751 35.65,48.042 34.983,46.6537 34.5165,45.4796 l -0.0312,-0.0787 0.0309,-0.0788 c 0.0575,-0.1467 0.0976,-0.3061 0.1304,-0.46 0.0188,-0.0878 0.0639,-0.1654 0.139,-0.2167 0.3391,-0.2316 1.0744,0.3829 1.3421,0.573 0.134,0.0951 0.7467,0.5358 0.8998,0.5153 0.006,-0.0011 0.0161,-0.0031 0.0254,-0.0057 -0.0063,-0.0703 -0.072,-0.2341 -0.0899,-0.2819 -0.1306,-0.3487 -0.186,-0.7283 0.2597,-0.8701 0.3919,-0.1247 1.0616,0.3491 1.3735,0.5575 l 0.0687,0.0459 0.0201,0.0801 c 0.0319,0.1267 0.0986,0.2402 0.1934,0.3302 l 0.0065,0.0061 0.006,0.0067 c 0.5613,0.6297 1.0214,1.3223 1.2439,2.1432 0.1504,0.5548 0.1551,1.0705 0.236,1.6278 0.1344,0.9256 0.5686,1.4808 1.2867,2.0653 l 0.076,0.0619 0.0032,0.1073 c 0.1951,1.3962 0.1355,2.692 -0.2097,4.057 -0.095,0.3755 -0.2103,0.7424 -0.3171,1.1133 0.1335,-0.3379 0.2582,-0.6792 0.3683,-1.0246 l 0.1751,-0.5491 -0.0068,-0.0292 0.0129,-0.0505 c 0.2457,-0.9604 0.3239,-1.8905 0.2794,-2.8817 L 42.0145,51.7 l 0.3886,0.3803 c 1.589,1.5547 2.8197,4.0309 3.8675,5.9879 l 0.046,0.0861 -0.0347,0.0913 c -0.0129,0.034 -0.0104,0.071 0.0051,0.1038 0.0333,0.0703 0.0577,0.1411 0.0801,0.2106 l 0.3472,-0.2532 -0.2451,0.6651 c -0.1448,0.3929 -0.8958,0.0591 -1.0196,1.3741 l -0.0085,0.0901 -0.0705,0.0569 c -0.1298,0.1045 -0.2606,0.2068 -0.3934,0.3062 0.1937,-0.1059 0.5175,-0.2853 0.5628,-0.3455 0.2534,-0.6225 0.4974,-0.9456 1.0363,-1.3216 l 0.1952,-0.1363 0.1152,0.2083 c 0.9415,1.7019 2.6189,4.7629 4.8509,4.8411 1.8489,0.0649 3.6982,-0.0051 5.5457,-0.1055 C 56.8057,63.9009 56.3281,63.8622 55.8505,63.8234 54.8227,63.7399 53.795,63.6564 52.7673,63.5715 52.4261,63.5433 52.0847,63.515 51.7435,63.4856 51.6551,63.478 51.3663,63.4649 51.2873,63.4361 49.9888,62.9617 49.0599,61.5255 48.4142,60.3744 47.5151,58.7717 46.7908,57.0538 45.9492,55.4166 45.0624,53.6915 43.9633,51.8274 42.4515,50.578 42.0411,50.2389 41.7521,49.8623 41.6229,49.3401 41.5271,48.9527 41.527,48.5361 41.491,48.1394 41.4433,47.6141 41.3387,47.1463 41.1368,46.6567 l -0.113,-0.2739 0.2955,-0.0218 c 0.27,-0.0199 1.4086,-0.1515 1.5077,-0.4652 -0.0764,-0.1356 -0.4904,-0.4531 -0.5998,-0.5359 -0.1825,-0.1381 -0.3691,-0.2704 -0.5527,-0.4069 -0.0634,-0.0473 -0.1291,-0.096 -0.1885,-0.1483 -0.0361,-0.0318 -0.0679,-0.0702 -0.0903,-0.1116 l -1.1606,-1.3652 c -3.9357,0.719 -8.11975,0.697825 -12.05695,-0.0029 l -0.77055,0.9418 -0.0242,0.0126 c -0.0419,0.0219 -0.0684,0.0645 -0.0695,0.1119 l -2e-4,0.0108 -0.0014,0.0107 c -0.3313,2.6921 -2.186,5.0844 -4.7021,6.0879 -0.517364,0.208407 -1.522972,0.817048 -1.750063,1.061794 C 21.041775,51.440231 22.2431,50.7746 22.6514,50.6203 c 0.947,-0.358 1.8103,-0.9067 2.5437,-1.6038 l 0.2229,-0.2118 -0.0015,-0.0058 0.0812,-0.0861 c 0.6171,-0.6547 1.1191,-1.4134 1.4816,-2.2368 l 0.0643,-0.146 0.1559,0.0194 c 0.278,-0.0154 0.9104,-1.3164 1.5016,-1.2446 0.4679,0.0568 1.6962,0.4935 1.8043,1.0044 0.0513,0.242 0.1297,0.564 0.2617,0.7755 l 0.0442,0.071 -0.0154,0.0822 c -0.555,2.949 0.3724,6.1837 -1.7661,8.7078 -0.4004,0.4725 -0.8121,0.9317 -1.2416,1.376 0.3453,-0.3457 0.6814,-0.6997 1.0106,-1.062 l 0.1611,-0.1773 z" />
                </symbol>

                <symbol id="relief-vulcan-2-bw" viewBox="-5 -10 110 110">
                    <ellipse fill="#999999" opacity=".5" cx="50" cy="64" rx="30" ry="4"></ellipse>
                    <path fill="#fff" stroke="#5c5c70" stroke-width=".2"
                        d="m 40.318,43.0945 1.2624,1.4851 2.2879,1.7295 3.6464,2.047 0.7864,2.661 1.4661,1.7722 2.5083,1.3532 2.7505,0.3824 4.548,2.8992 4.3962,2.9284 4.26,2.533 0.0746,0.7449 L 55.9019,63.906275 34.0507,63.6698 18.4326,63.9645 C 12.828851,63.668708 7.2014518,63.758742 1.6058,63.3217 l 6.2682,-4.7224 1.9305,-0.55 3.4543,-2.435 1.6264,-1.9274 1.8235,-2.4455 3.3521,-1.8555 3.2709,-1.0652 1.9097,-2.384 3.0893,-2.7945 c 3.9306,0.6688 7.9292,0.6208 11.9872,-0.0477 z" />
                    <path fill="#d2d3d5"
                        d="m 45.7612,48.0915 c 0.0019,0.0017 0.0039,0.0034 0.0058,0.0051 z M 26.501,46.9652 c -0.0014,0.003 -0.0028,0.006 -0.0042,0.0091 z m -0.6925,6.4672 c -5e-4,0.0013 -0.0011,0.0025 -0.0015,0.0038 z m 3.1367,-7.2612 c 0.0012,0.0021 0.0023,0.0041 0.0034,0.006 z m 0.1546,-0.2241 c 0.0014,0.0016 0.0027,0.0032 0.004,0.0049 z m 11.8023,1.9363 c 1.373,1.0631 2.7431,2.1294 4.1107,3.1992 0.1277,0.1125 0.2003,0.2226 0.2528,0.3846 0.046,0.1653 0.0461,0.2971 0.0013,0.4626 0.0051,0.0308 -0.8731,3.3974 -0.9854,3.7918 0.0262,-0.0903 0.0364,-0.1684 0.0326,-0.2626 0,-1e-4 5e-4,0.0062 6e-4,0.0082 0.0971,1.2511 0.1578,2.4982 0.2127,3.7516 0.0056,0.1633 -0.0172,0.2888 -0.0799,0.4398 -0.068,0.1493 -0.1432,0.2507 -0.2667,0.3586 -1.1022,0.9093 -3.87315,3.1833 -5.05715,3.9851 -0.2016,0.1338 -1.34695,-0.0779 -1.34695,-0.0779 0,0 2.5301,-2.6917 3.2995,-3.4461 l 1.7344,-1.5281 -0.2456,-3.4034 c -0.0056,-0.1318 0.0122,-0.1998 0.0393,-0.3246 0.3683,-1.1652 0.7371,-2.3296 1.0991,-3.4969 0.0248,-0.0804 0.05,-0.1608 0.0745,-0.2413 -0.0416,0.1511 -0.0415,0.2728 0,0.424 0.0476,0.1477 0.1132,0.2503 0.2295,0.3531 0.0616,0.0741 -3.9595,-3.4677 -5.737,-5.1321 -1.049,-0.9821 -1.037925,-1.066622 -2.005425,-2.122022 0.874485,-1.222855 3.008176,1.61658 4.637125,2.876422 z M 25.9867,63.7102 24.4736,63.7063 c -0.7068,0.2897 -1.5241,0.5416 -1.3493,0.0369 0.0057,-0.0134 0.0117,-0.0268 0.018,-0.0403 l -5.0331,-0.0128 c -0.6658,0.3023 -1.4936,0.6221 -1.6134,0.382 -0.2698,0.0853 -0.5138,0.1089 -0.6058,-0.0392 -0.1007,0.0375 -0.2069,0.0561 -0.3294,0.0598 -3.3817,0.0568 -6.862,0.0909 -10.2354,-0.1242 -0.1254,-0.0092 -4.5764,-0.1163 -3.4882,-0.72 1.346,-0.6498 4.3583,-0.6611 5.8204,-0.7454 1.4794,-0.083 2.9452,-0.131 4.413,-0.1595 l 0.2745,-0.1779 1.8114,-0.4876 0.3962,-1.2597 1.3585,-0.5282 1.5849,-0.1219 0.9057,-0.6908 0.9907,0.1556 -0.0511,-0.1321 c -0.588,-1.52 -1.1666,-3.0439 -1.7546,-4.5636 -0.0788,-0.218 -0.0822,-0.3985 -0.0107,-0.619 0.0827,-0.2163 0.1994,-0.3552 0.3976,-0.475 1.9454,-1.0791 3.8873,-2.13 5.8532,-3.1704 0.2608,-0.1379 0.5286,-0.2704 0.7873,-0.4106 -0.1006,0.0615 -0.1643,0.1317 -0.2148,0.2383 0.8009,-1.5586 1.6239,-3.0427 2.4849,-4.5646 0.0075,-0.0127 0.4447,-0.7805 0.4932,-0.4277 -0.7053,1.7943 -1.423,3.5853 -2.1436,5.3734 -0.0377,0.0814 -0.0856,0.1346 -0.162,0.1814 -0.0038,0.0147 -3.4802,2.1749 -3.8212,2.3846 -0.8611,0.5295 -1.7259,1.0782 -2.5946,1.5922 0.1105,-0.0665 0.1754,-0.143 0.2219,-0.2634 0.0403,-0.1218 0.0392,-0.2242 -0.0042,-0.3451 0,0 1.7011,3.931 2.1937,5.1211 0.375,-0.2535 0.7509,-0.5077 1.1253,-0.7679 0.3836,-0.2665 0.7711,-0.529 1.1535,-0.7966 -0.1153,0.0867 -0.1888,0.179 -0.2457,0.3117 0.4471,-1.02 0.8899,-1.9723 1.3912,-2.9651 0.393,-0.7762 0.8307,-1.4288 1.315,-2.1416 0.0713,-0.0955 0.2279,-0.2771 0.3424,-0.1193 -0.3629,1.3549 -0.7445,2.7053 -1.1641,4.0438 -0.1514,0.4744 -0.304,0.9485 -0.4574,1.4223 0.4593,-0.2688 0.9217,-0.5383 1.3881,-0.8119 -0.1054,0.0651 -0.1795,0.1359 -0.2492,0.2382 0,0 1.0334,-1.5106 1.5453,-2.269 1.1687,-1.7312 2.359,-3.4283 3.5433,-5.1455 -0.0676,0.1077 -0.0967,0.2019 -0.1032,0.3288 -0.0011,0.1266 0.022,0.2209 0.0826,0.3321 0,0 -0.5188,-1.0154 -0.7725,-1.5191 -0.6463,-1.2824 -1.179,-2.5556 -1.7237,-3.8788 -0.0236,-0.0622 -0.2233,-0.5734 0.0354,-0.4899 l 0.0042,0.0061 c 0.0069,-1e-4 0.0144,2e-4 0.0225,9e-4 1.514,1.5564 3.015,3.1339 4.4842,4.7324 0.0963,0.1054 0.1984,0.2118 0.2914,0.3193 0.0803,0.1 0.1197,0.1924 0.1361,0.3197 0.0112,0.1282 -0.0078,0.2273 -0.0649,0.3425 0.0018,0.0089 -2.6532,5.6465 -2.9315,6.1963 0.0406,-0.0776 0.0633,-0.145 0.0785,-0.2313 0.0012,-0.0014 -0.1007,0.7978 -0.1313,1.0286 -0.1335,1.0053 -0.2936,2.0037 -0.4615,3.0037 -0.0279,0.1561 -0.0741,0.2699 -0.1621,0.4021 -0.0921,0.1286 -0.1829,0.2124 -0.3188,0.2933 -1.1877,0.6688 -2.3952,1.3313 -3.6449,1.8796 l 0.4111,0.492 z m -6.5129,-4.4641 0.1529,0.024 c 0.0522,-0.1289 0.1264,-0.2248 0.2441,-0.317 z m 3.4591,1.9275 0.1669,0.1797 1.0189,1.0972 0.1111,0.0418 c 0.5896,-0.4654 1.268,-0.8748 1.7208,-1.1858 0.7705,-0.5264 1.5677,-1.0478 2.3718,-1.5214 -0.1115,0.0662 -0.1849,0.1347 -0.2606,0.24 -0.0717,0.1074 -0.1107,0.2013 -0.1333,0.3285 -0.0468,0.0935 0.5059,-2.9473 0.6892,-4.0133 0.0173,-0.1008 0.0506,-0.2065 0.1008,-0.296 0.3756,-0.6714 0.7441,-1.3498 1.1113,-2.026 l 0.173,-0.3177 c -0.9648,1.6073 -1.9345,3.2117 -2.9136,4.8097 -0.0856,0.1257 -0.1702,0.2069 -0.2996,0.2869 -0.001,0.0025 -0.6916,0.4433 -0.766,0.4906 -0.994,0.6267 -2.0331,1.2685 -3.0904,1.8858 z m 21.6795,-14.158 c 0.8938,0.7045 1.7841,1.4134 2.6728,2.1244 0.0582,0.0528 0.0889,0.106 0.1073,0.1822 0.0015,0.0013 0.6917,2.6436 0.7444,2.8755 -0.0168,-0.0793 -0.0496,-0.1352 -0.1099,-0.1893 -5e-4,-0.0027 0.9606,0.7144 1.1481,0.8553 0.5241,0.394 1.0672,0.7868 1.5812,1.1913 -0.0521,-0.0424 -0.0995,-0.0679 -0.1631,-0.0891 0,0 3.5221,0.9115 4.3455,1.147 0.083,0.0255 0.1481,0.0567 0.2209,0.1039 0.0125,-0.0016 2.8665,1.7712 3.1975,1.9797 2.3623,1.4973 4.7629,3.0939 6.9724,4.8058 0.0017,0.0012 -0.1708,-0.0988 -0.2361,-0.0931 0,1e-4 0.3695,0.1055 0.506,0.1468 0.2054,0.0626 3.3876,0.8241 2.4806,1.2387 -0.9807,0.3718 -2.236,0.1163 -3.2507,-10e-5 -0.1089,-0.0211 -0.19,-0.054 -0.2837,-0.1131 -0.0037,9e-4 -0.9925,-0.5699 -1.0766,-0.6187 -3.1963,-1.8526 -6.1286,-3.9744 -9.1885,-6.0299 0.0634,0.0414 0.1231,0.0694 0.1952,0.0921 0,0 -0.2064,-0.0652 -0.3093,-0.0975 -1.3251,-0.4163 -2.6464,-0.8446 -3.9708,-1.2616 -0.1181,-0.0383 -0.2038,-0.0839 -0.3006,-0.1618 -0.8675,-0.737 -1.7257,-1.4772 -2.5786,-2.2309 -0.1496,-0.1302 -0.2295,-0.2639 -0.2718,-0.4578 -0.0675,-0.4205 -0.134,-0.841 -0.2,-1.2618 -0.0865,-0.5585 -0.1638,-1.1145 -0.2329,-1.6753 0.0245,0.1017 0.0673,0.1759 0.1449,0.2465 -0.6851,-0.7266 -1.33,-1.4546 -1.9886,-2.2027 -0.0335,-0.0396 -0.4475,-0.5208 -0.1554,-0.5067 z m -12.7976,3.4025 3e-4,0.0022 0.2813,0.3698 c -0.0897,-0.1126 -0.1331,-0.2168 -0.151,-0.3596 -0.0119,-0.1437 0.0091,-0.2542 0.0736,-0.3832 l -0.2041,0.3708 z m 2.5515,8.528 c -0.079,-0.6791 -0.1623,-1.358 -0.246,-2.0365 -0.0045,-0.0447 -0.0021,-0.0788 0.0092,-0.1223 0.0027,-0.0353 0.0543,-0.1046 0.0553,-0.1106 1.3536,-1.8017 2.691,-3.61 4.0031,-5.4423 -0.0257,0.0334 -0.0406,0.0629 -0.0529,0.1032 -0.0163,0.0319 -0.0071,0.0785 -0.0102,0.1119 -0.0031,0.0338 0.0234,0.0795 0.0318,0.1082 0.0193,0.037 0.0412,0.0646 0.0726,0.0921 -1.2585,-0.9711 -2.7186,-2.1244 -4.0785,-2.9358 -0.7384,-0.4627 -4.2016,-3.3514 -3.8525,-4.1363 1.5454,-0.4456 4.0924,2.1976 5.0112,3.1002 1.1274,1.1404 2.2598,2.2689 3.4112,3.3851 0.0487,0.0432 0.0796,0.0824 0.1099,0.1401 0.0273,0.0554 0.0412,0.1029 0.0477,0.1643 0.0051,0.062 5e-4,0.1096 -0.0159,0.1695 -0.0023,0.0241 -0.0621,0.146 -0.0804,0.1558 -1.5051,1.6933 -2.9505,3.3949 -4.3869,5.1465 -0.0067,0.0084 -0.0064,0.0108 -0.0109,0.019 -0.002,0.0035 -0.0023,0.022 -0.0025,0.0222 -0.0032,0.003 0.1569,1.8069 0.1717,1.9699 0.138,1.6198 0.2761,3.2396 0.4141,4.8594 -0.2003,-1.588 -0.4005,-3.1758 -0.6009,-4.7638 z" />
                    <path fill="#a6a6a6"
                        d="m 35.51055,43.935956 9.08155,7.730644 -1.1462,3.8206 0.191,3.8206 -5.34205,4.7118 L 68.4924,64.03675 68.2303,62.8856 55.0261,54.525 53.6509,54.3338 52.2757,54.1426 49.7674,52.7894 48.3013,51.0172 47.5149,48.3562 44.084,46.4303 41.7744,44.7264 40.229712,43.382062 c -1.841275,0.483307 -3.63078,0.512538 -4.719162,0.553894 z M 20.2129,59.3621 l -1.8114,-0.2845 2.1834,1.2358 0.7979,0.7999 -0.959,0.4474 0.8375,1.1781 -4.53735,1.23235 9.26255,-0.07345 -0.6792,-1.0003 -1.1888,-0.447 -2.1509,-2.3162 z" />
                    <polygon fill="#D2D3D5"
                        points="50.236,58.692 48.7077,58.3578 50.5499,59.8101 51.2231,60.7502 50.414,61.2759 51.1206,62.6605 48.3734,63.7782 55.1073,63.8021 54.5342,62.8469 53.5313,62.3216 51.7165,59.5994 " />
                    <path fill="#808080"
                        d="m 28.9597,55.8827 -3e-4,-7e-4 0.102,-0.1141 c 0.7095,-0.7938 1.1291,-1.709 1.3673,-2.7399 0.4441,-1.9223 0.1983,-3.9097 0.552,-5.8266 l 0.0227,-0.1229 0.118,-0.0409 c 0.3547,-0.1229 0.8258,-0.6708 1.057,-0.9512 0.2835,-0.3437 0.6214,-0.625 1.0089,-0.8443 0.385,-0.2179 0.7072,0.2027 1.0282,0.3405 l 0.0789,0.0338 0.0338,0.0789 c 0.2416,0.5642 0.5103,1.1239 0.8237,1.6519 l 0.0907,0.1527 -2e-4,2e-4 0.0992,0.1532 c 0.4049,0.6249 0.8833,1.1924 1.5255,1.5823 0.3805,0.231 0.8447,0.3808 1.1939,0.6362 0.4213,0.3082 0.6037,0.7456 0.7127,1.2425 0.0232,0.1057 0.035,0.2133 0.0356,0.3215 0.004,0.7151 -0.4926,1.404 -0.9158,1.9426 -0.5364,0.6826 -1.1209,1.3191 -1.5873,2.0556 -0.0623,0.0984 -0.1223,0.1983 -0.1793,0.2997 0.3591,-0.5128 0.7694,-1.0011 1.0815,-1.3894 0.597,-0.7429 1.8668,-2.2306 1.6684,-3.2538 -0.0955,-0.4929 -0.2441,-0.9666 -0.6697,-1.269 -0.2045,-0.1453 -0.4512,-0.2524 -0.675,-0.366 C 37.2067,49.2904 36.9157,49.1116 36.6358,48.8751 35.65,48.042 34.983,46.6537 34.5165,45.4796 l -0.0312,-0.0787 0.0309,-0.0788 c 0.0575,-0.1467 0.0976,-0.3061 0.1304,-0.46 0.0188,-0.0878 0.0639,-0.1654 0.139,-0.2167 0.3391,-0.2316 1.0744,0.3829 1.3421,0.573 0.134,0.0951 0.7467,0.5358 0.8998,0.5153 0.006,-0.0011 0.0161,-0.0031 0.0254,-0.0057 -0.0063,-0.0703 -0.072,-0.2341 -0.0899,-0.2819 -0.1306,-0.3487 -0.186,-0.7283 0.2597,-0.8701 0.3919,-0.1247 1.0616,0.3491 1.3735,0.5575 l 0.0687,0.0459 0.0201,0.0801 c 0.0319,0.1267 0.0986,0.2402 0.1934,0.3302 l 0.0065,0.0061 0.006,0.0067 c 0.5613,0.6297 1.0214,1.3223 1.2439,2.1432 0.1504,0.5548 0.1551,1.0705 0.236,1.6278 0.1344,0.9256 0.5686,1.4808 1.2867,2.0653 l 0.076,0.0619 0.0032,0.1073 c 0.1951,1.3962 0.1355,2.692 -0.2097,4.057 -0.095,0.3755 -0.2103,0.7424 -0.3171,1.1133 0.1335,-0.3379 0.2582,-0.6792 0.3683,-1.0246 l 0.1751,-0.5491 -0.0068,-0.0292 0.0129,-0.0505 c 0.2457,-0.9604 0.3239,-1.8905 0.2794,-2.8817 L 42.0145,51.7 l 0.3886,0.3803 c 1.589,1.5547 2.8197,4.0309 3.8675,5.9879 l 0.046,0.0861 -0.0347,0.0913 c -0.0129,0.034 -0.0104,0.071 0.0051,0.1038 0.0333,0.0703 0.0577,0.1411 0.0801,0.2106 l 0.3472,-0.2532 -0.2451,0.6651 c -0.1448,0.3929 -0.8958,0.0591 -1.0196,1.3741 l -0.0085,0.0901 -0.0705,0.0569 c -0.1298,0.1045 -0.2606,0.2068 -0.3934,0.3062 0.1937,-0.1059 0.5175,-0.2853 0.5628,-0.3455 0.2534,-0.6225 0.4974,-0.9456 1.0363,-1.3216 l 0.1952,-0.1363 0.1152,0.2083 c 0.9415,1.7019 2.6189,4.7629 4.8509,4.8411 1.8489,0.0649 3.6982,-0.0051 5.5457,-0.1055 C 56.8057,63.9009 56.3281,63.8622 55.8505,63.8234 54.8227,63.7399 53.795,63.6564 52.7673,63.5715 52.4261,63.5433 52.0847,63.515 51.7435,63.4856 51.6551,63.478 51.3663,63.4649 51.2873,63.4361 49.9888,62.9617 49.0599,61.5255 48.4142,60.3744 47.5151,58.7717 46.7908,57.0538 45.9492,55.4166 45.0624,53.6915 43.9633,51.8274 42.4515,50.578 42.0411,50.2389 41.7521,49.8623 41.6229,49.3401 41.5271,48.9527 41.527,48.5361 41.491,48.1394 41.4433,47.6141 41.3387,47.1463 41.1368,46.6567 l -0.113,-0.2739 0.2955,-0.0218 c 0.27,-0.0199 1.4086,-0.1515 1.5077,-0.4652 -0.0764,-0.1356 -0.4904,-0.4531 -0.5998,-0.5359 -0.1825,-0.1381 -0.3691,-0.2704 -0.5527,-0.4069 -0.0634,-0.0473 -0.1291,-0.096 -0.1885,-0.1483 -0.0361,-0.0318 -0.0679,-0.0702 -0.0903,-0.1116 l -1.1606,-1.3652 c -3.9357,0.719 -8.11975,0.697825 -12.05695,-0.0029 l -0.77055,0.9418 -0.0242,0.0126 c -0.0419,0.0219 -0.0684,0.0645 -0.0695,0.1119 l -2e-4,0.0108 -0.0014,0.0107 c -0.3313,2.6921 -2.186,5.0844 -4.7021,6.0879 -0.517364,0.208407 -1.522972,0.817048 -1.750063,1.061794 C 21.041775,51.440231 22.2431,50.7746 22.6514,50.6203 c 0.947,-0.358 1.8103,-0.9067 2.5437,-1.6038 l 0.2229,-0.2118 -0.0015,-0.0058 0.0812,-0.0861 c 0.6171,-0.6547 1.1191,-1.4134 1.4816,-2.2368 l 0.0643,-0.146 0.1559,0.0194 c 0.278,-0.0154 0.9104,-1.3164 1.5016,-1.2446 0.4679,0.0568 1.6962,0.4935 1.8043,1.0044 0.0513,0.242 0.1297,0.564 0.2617,0.7755 l 0.0442,0.071 -0.0154,0.0822 c -0.555,2.949 0.3724,6.1837 -1.7661,8.7078 -0.4004,0.4725 -0.8121,0.9317 -1.2416,1.376 0.3453,-0.3457 0.6814,-0.6997 1.0106,-1.062 l 0.1611,-0.1773 z" />
                </symbol>

                <symbol id="relief-vulcan-3-bw" viewBox="-5 -10 110 110">
                    <ellipse fill="#999999" opacity=".5" cx="50" cy="64" rx="30" ry="4"></ellipse>
                    <path fill="#fff" stroke="#5c5c70" stroke-width=".2"
                        d="m 40.318,43.0945 1.2624,1.4851 2.2879,1.7295 3.6464,2.047 0.7864,2.661 1.4661,1.7722 2.5083,1.3532 2.7505,0.3824 4.548,2.8992 4.3962,2.9284 4.26,2.533 0.0746,0.7449 L 55.9019,63.906275 34.0507,63.6698 18.4326,63.9645 C 12.828851,63.668708 7.2014518,63.758742 1.6058,63.3217 l 6.2682,-4.7224 1.9305,-0.55 3.4543,-2.435 1.6264,-1.9274 1.8235,-2.4455 3.3521,-1.8555 3.2709,-1.0652 1.9097,-2.384 3.0893,-2.7945 c 3.9306,0.6688 7.9292,0.6208 11.9872,-0.0477 z" />
                    <path fill="#d2d3d5"
                        d="m 45.7612,48.0915 c 0.0019,0.0017 0.0039,0.0034 0.0058,0.0051 z M 26.501,46.9652 c -0.0014,0.003 -0.0028,0.006 -0.0042,0.0091 z m -0.6925,6.4672 c -5e-4,0.0013 -0.0011,0.0025 -0.0015,0.0038 z m 3.1367,-7.2612 c 0.0012,0.0021 0.0023,0.0041 0.0034,0.006 z m 0.1546,-0.2241 c 0.0014,0.0016 0.0027,0.0032 0.004,0.0049 z m 11.8023,1.9363 c 1.373,1.0631 2.7431,2.1294 4.1107,3.1992 0.1277,0.1125 0.2003,0.2226 0.2528,0.3846 0.046,0.1653 0.0461,0.2971 0.0013,0.4626 0.0051,0.0308 -0.8731,3.3974 -0.9854,3.7918 0.0262,-0.0903 0.0364,-0.1684 0.0326,-0.2626 0,-1e-4 5e-4,0.0062 6e-4,0.0082 0.0971,1.2511 0.1578,2.4982 0.2127,3.7516 0.0056,0.1633 -0.0172,0.2888 -0.0799,0.4398 -0.068,0.1493 -0.1432,0.2507 -0.2667,0.3586 -1.1022,0.9093 -3.87315,3.1833 -5.05715,3.9851 -0.2016,0.1338 -1.34695,-0.0779 -1.34695,-0.0779 0,0 2.5301,-2.6917 3.2995,-3.4461 l 1.7344,-1.5281 -0.2456,-3.4034 c -0.0056,-0.1318 0.0122,-0.1998 0.0393,-0.3246 0.3683,-1.1652 0.7371,-2.3296 1.0991,-3.4969 0.0248,-0.0804 0.05,-0.1608 0.0745,-0.2413 -0.0416,0.1511 -0.0415,0.2728 0,0.424 0.0476,0.1477 0.1132,0.2503 0.2295,0.3531 0.0616,0.0741 -3.9595,-3.4677 -5.737,-5.1321 -1.049,-0.9821 -1.037925,-1.066622 -2.005425,-2.122022 0.874485,-1.222855 3.008176,1.61658 4.637125,2.876422 z M 25.9867,63.7102 24.4736,63.7063 c -0.7068,0.2897 -1.5241,0.5416 -1.3493,0.0369 0.0057,-0.0134 0.0117,-0.0268 0.018,-0.0403 l -5.0331,-0.0128 c -0.6658,0.3023 -1.4936,0.6221 -1.6134,0.382 -0.2698,0.0853 -0.5138,0.1089 -0.6058,-0.0392 -0.1007,0.0375 -0.2069,0.0561 -0.3294,0.0598 -3.3817,0.0568 -6.862,0.0909 -10.2354,-0.1242 -0.1254,-0.0092 -4.5764,-0.1163 -3.4882,-0.72 1.346,-0.6498 4.3583,-0.6611 5.8204,-0.7454 1.4794,-0.083 2.9452,-0.131 4.413,-0.1595 l 0.2745,-0.1779 1.8114,-0.4876 0.3962,-1.2597 1.3585,-0.5282 1.5849,-0.1219 0.9057,-0.6908 0.9907,0.1556 -0.0511,-0.1321 c -0.588,-1.52 -1.1666,-3.0439 -1.7546,-4.5636 -0.0788,-0.218 -0.0822,-0.3985 -0.0107,-0.619 0.0827,-0.2163 0.1994,-0.3552 0.3976,-0.475 1.9454,-1.0791 3.8873,-2.13 5.8532,-3.1704 0.2608,-0.1379 0.5286,-0.2704 0.7873,-0.4106 -0.1006,0.0615 -0.1643,0.1317 -0.2148,0.2383 0.8009,-1.5586 1.6239,-3.0427 2.4849,-4.5646 0.0075,-0.0127 0.4447,-0.7805 0.4932,-0.4277 -0.7053,1.7943 -1.423,3.5853 -2.1436,5.3734 -0.0377,0.0814 -0.0856,0.1346 -0.162,0.1814 -0.0038,0.0147 -3.4802,2.1749 -3.8212,2.3846 -0.8611,0.5295 -1.7259,1.0782 -2.5946,1.5922 0.1105,-0.0665 0.1754,-0.143 0.2219,-0.2634 0.0403,-0.1218 0.0392,-0.2242 -0.0042,-0.3451 0,0 1.7011,3.931 2.1937,5.1211 0.375,-0.2535 0.7509,-0.5077 1.1253,-0.7679 0.3836,-0.2665 0.7711,-0.529 1.1535,-0.7966 -0.1153,0.0867 -0.1888,0.179 -0.2457,0.3117 0.4471,-1.02 0.8899,-1.9723 1.3912,-2.9651 0.393,-0.7762 0.8307,-1.4288 1.315,-2.1416 0.0713,-0.0955 0.2279,-0.2771 0.3424,-0.1193 -0.3629,1.3549 -0.7445,2.7053 -1.1641,4.0438 -0.1514,0.4744 -0.304,0.9485 -0.4574,1.4223 0.4593,-0.2688 0.9217,-0.5383 1.3881,-0.8119 -0.1054,0.0651 -0.1795,0.1359 -0.2492,0.2382 0,0 1.0334,-1.5106 1.5453,-2.269 1.1687,-1.7312 2.359,-3.4283 3.5433,-5.1455 -0.0676,0.1077 -0.0967,0.2019 -0.1032,0.3288 -0.0011,0.1266 0.022,0.2209 0.0826,0.3321 0,0 -0.5188,-1.0154 -0.7725,-1.5191 -0.6463,-1.2824 -1.179,-2.5556 -1.7237,-3.8788 -0.0236,-0.0622 -0.2233,-0.5734 0.0354,-0.4899 l 0.0042,0.0061 c 0.0069,-1e-4 0.0144,2e-4 0.0225,9e-4 1.514,1.5564 3.015,3.1339 4.4842,4.7324 0.0963,0.1054 0.1984,0.2118 0.2914,0.3193 0.0803,0.1 0.1197,0.1924 0.1361,0.3197 0.0112,0.1282 -0.0078,0.2273 -0.0649,0.3425 0.0018,0.0089 -2.6532,5.6465 -2.9315,6.1963 0.0406,-0.0776 0.0633,-0.145 0.0785,-0.2313 0.0012,-0.0014 -0.1007,0.7978 -0.1313,1.0286 -0.1335,1.0053 -0.2936,2.0037 -0.4615,3.0037 -0.0279,0.1561 -0.0741,0.2699 -0.1621,0.4021 -0.0921,0.1286 -0.1829,0.2124 -0.3188,0.2933 -1.1877,0.6688 -2.3952,1.3313 -3.6449,1.8796 l 0.4111,0.492 z m -6.5129,-4.4641 0.1529,0.024 c 0.0522,-0.1289 0.1264,-0.2248 0.2441,-0.317 z m 3.4591,1.9275 0.1669,0.1797 1.0189,1.0972 0.1111,0.0418 c 0.5896,-0.4654 1.268,-0.8748 1.7208,-1.1858 0.7705,-0.5264 1.5677,-1.0478 2.3718,-1.5214 -0.1115,0.0662 -0.1849,0.1347 -0.2606,0.24 -0.0717,0.1074 -0.1107,0.2013 -0.1333,0.3285 -0.0468,0.0935 0.5059,-2.9473 0.6892,-4.0133 0.0173,-0.1008 0.0506,-0.2065 0.1008,-0.296 0.3756,-0.6714 0.7441,-1.3498 1.1113,-2.026 l 0.173,-0.3177 c -0.9648,1.6073 -1.9345,3.2117 -2.9136,4.8097 -0.0856,0.1257 -0.1702,0.2069 -0.2996,0.2869 -0.001,0.0025 -0.6916,0.4433 -0.766,0.4906 -0.994,0.6267 -2.0331,1.2685 -3.0904,1.8858 z m 21.6795,-14.158 c 0.8938,0.7045 1.7841,1.4134 2.6728,2.1244 0.0582,0.0528 0.0889,0.106 0.1073,0.1822 0.0015,0.0013 0.6917,2.6436 0.7444,2.8755 -0.0168,-0.0793 -0.0496,-0.1352 -0.1099,-0.1893 -5e-4,-0.0027 0.9606,0.7144 1.1481,0.8553 0.5241,0.394 1.0672,0.7868 1.5812,1.1913 -0.0521,-0.0424 -0.0995,-0.0679 -0.1631,-0.0891 0,0 3.5221,0.9115 4.3455,1.147 0.083,0.0255 0.1481,0.0567 0.2209,0.1039 0.0125,-0.0016 2.8665,1.7712 3.1975,1.9797 2.3623,1.4973 4.7629,3.0939 6.9724,4.8058 0.0017,0.0012 -0.1708,-0.0988 -0.2361,-0.0931 0,1e-4 0.3695,0.1055 0.506,0.1468 0.2054,0.0626 3.3876,0.8241 2.4806,1.2387 -0.9807,0.3718 -2.236,0.1163 -3.2507,-10e-5 -0.1089,-0.0211 -0.19,-0.054 -0.2837,-0.1131 -0.0037,9e-4 -0.9925,-0.5699 -1.0766,-0.6187 -3.1963,-1.8526 -6.1286,-3.9744 -9.1885,-6.0299 0.0634,0.0414 0.1231,0.0694 0.1952,0.0921 0,0 -0.2064,-0.0652 -0.3093,-0.0975 -1.3251,-0.4163 -2.6464,-0.8446 -3.9708,-1.2616 -0.1181,-0.0383 -0.2038,-0.0839 -0.3006,-0.1618 -0.8675,-0.737 -1.7257,-1.4772 -2.5786,-2.2309 -0.1496,-0.1302 -0.2295,-0.2639 -0.2718,-0.4578 -0.0675,-0.4205 -0.134,-0.841 -0.2,-1.2618 -0.0865,-0.5585 -0.1638,-1.1145 -0.2329,-1.6753 0.0245,0.1017 0.0673,0.1759 0.1449,0.2465 -0.6851,-0.7266 -1.33,-1.4546 -1.9886,-2.2027 -0.0335,-0.0396 -0.4475,-0.5208 -0.1554,-0.5067 z m -12.7976,3.4025 3e-4,0.0022 0.2813,0.3698 c -0.0897,-0.1126 -0.1331,-0.2168 -0.151,-0.3596 -0.0119,-0.1437 0.0091,-0.2542 0.0736,-0.3832 l -0.2041,0.3708 z m 2.5515,8.528 c -0.079,-0.6791 -0.1623,-1.358 -0.246,-2.0365 -0.0045,-0.0447 -0.0021,-0.0788 0.0092,-0.1223 0.0027,-0.0353 0.0543,-0.1046 0.0553,-0.1106 1.3536,-1.8017 2.691,-3.61 4.0031,-5.4423 -0.0257,0.0334 -0.0406,0.0629 -0.0529,0.1032 -0.0163,0.0319 -0.0071,0.0785 -0.0102,0.1119 -0.0031,0.0338 0.0234,0.0795 0.0318,0.1082 0.0193,0.037 0.0412,0.0646 0.0726,0.0921 -1.2585,-0.9711 -2.7186,-2.1244 -4.0785,-2.9358 -0.7384,-0.4627 -4.2016,-3.3514 -3.8525,-4.1363 1.5454,-0.4456 4.0924,2.1976 5.0112,3.1002 1.1274,1.1404 2.2598,2.2689 3.4112,3.3851 0.0487,0.0432 0.0796,0.0824 0.1099,0.1401 0.0273,0.0554 0.0412,0.1029 0.0477,0.1643 0.0051,0.062 5e-4,0.1096 -0.0159,0.1695 -0.0023,0.0241 -0.0621,0.146 -0.0804,0.1558 -1.5051,1.6933 -2.9505,3.3949 -4.3869,5.1465 -0.0067,0.0084 -0.0064,0.0108 -0.0109,0.019 -0.002,0.0035 -0.0023,0.022 -0.0025,0.0222 -0.0032,0.003 0.1569,1.8069 0.1717,1.9699 0.138,1.6198 0.2761,3.2396 0.4141,4.8594 -0.2003,-1.588 -0.4005,-3.1758 -0.6009,-4.7638 z" />
                    <path fill="#a6a6a6"
                        d="m 35.51055,43.935956 9.08155,7.730644 -1.1462,3.8206 0.191,3.8206 -5.34205,4.7118 L 68.4924,64.03675 68.2303,62.8856 55.0261,54.525 53.6509,54.3338 52.2757,54.1426 49.7674,52.7894 48.3013,51.0172 47.5149,48.3562 44.084,46.4303 41.7744,44.7264 40.229712,43.382062 c -1.841275,0.483307 -3.63078,0.512538 -4.719162,0.553894 z M 20.2129,59.3621 l -1.8114,-0.2845 2.1834,1.2358 0.7979,0.7999 -0.959,0.4474 0.8375,1.1781 -4.53735,1.23235 9.26255,-0.07345 -0.6792,-1.0003 -1.1888,-0.447 -2.1509,-2.3162 z" />
                    <polygon fill="#D2D3D5"
                        points="50.236,58.692 48.7077,58.3578 50.5499,59.8101 51.2231,60.7502 50.414,61.2759 51.1206,62.6605 48.3734,63.7782 55.1073,63.8021 54.5342,62.8469 53.5313,62.3216 51.7165,59.5994 " />
                </symbol>

                <symbol id="relief-hill-2-bw" viewBox="-1 -3 8 8">
                    <ellipse opacity=".5" fill="#999999" ry="0.3351" rx="3.0743999" cy="1.8791" cx="3.0804" />
                    <path fill="#ffffff" stroke="#999999" stroke-width=".02"
                        d="M 2.7066,2.0352 C 2.7573,2.0405 2.788,2.0628 2.8782,2.069 3.3845,2.1035 4.4496,2.1292 4.7849,2.1263 5.1303,1.9669 5.2365,2.0027 4.91,1.685 4.768,1.5467 4.5243,1.4165 4.4651,1.24 L 4.0699,0.6097 C 3.5404,0.0812 3.4194,-0.1558 2.7112,0.1216 2.5027,0.2032 2.0357,0.1483 1.8793,0.385 L 1.7729,0.4597 1.6557,0.4832 C 1.253,0.7265 0.4907,1.2966 0.2344,1.6189 L -10e-5,1.9137 c 0.1493,0.0717 0.0843,-0.008 0.4743,0.0567 0.457,0.0758 1.0204,0.045 1.4852,0.0258 0.1785,-0.0098 0.537,0.0316 0.7472,0.0391 z" />
                    <path fill="#a6a6a6"
                        d="M 2.7255,1.4371 C 2.8227,1.5043 2.7491,1.4088 2.7712,1.5241 2.8686,1.4105 2.7861,1.4291 2.9136,1.3797 3.0935,1.6682 2.9201,1.6363 2.962,1.768 L 3.0069,1.9091 2.878,2.0689 3.1722,2.0972 C 3.1736,2.0987 4.7764,2.1218 4.7905,2.1217 5.136,1.9623 5.2421,1.9982 4.9156,1.6804 4.7736,1.5421 4.5299,1.4119 4.4707,1.2354 L 4.1029437,0.65588125 C 3.9960355,0.47122161 3.4417827,-0.04766763 3.4248515,0.06566779 c 0,0 0.1315782,0.14855025 0.1129341,0.17248171 -0.065811,0.0844749 -0.063435,0.30870883 -0.140794,0.34697916 C 3.1795801,0.69268484 3.1067492,0.88723142 3.0105664,0.97217062 2.9083739,1.0624171 2.8679064,1.1197473 2.8441054,1.1727881 Z M 3.9746,1.2289 C 3.7716,1.1814 3.7285,1.1717 3.5693,1.1065 3.6063,1.1851 3.6565,1.2662 3.6964,1.3066 3.7033,1.3136 4.1045,1.5611 3.725,1.7516 3.6411,1.7937 3.775,1.7952 3.6661,1.7674 3.6449,1.6925 3.6336,1.6769 3.6684,1.6077 3.7131,1.5189 3.6048,1.508 3.7729,1.562 L 3.7343,1.4797 C 3.6627,1.5157 3.6325,1.4836 3.5121,1.4814 3.1457,1.4747 3.3999,1.5306 3.1149,1.3064 3.1884,1.161 3.2309,1.1603 3.3219,1.063 3.4077,0.9615 3.4101,1.0571 3.6824,0.9843 4.0352,0.892 3.8839,1.087 4.0165,0.9275 l 0.063,0.121 C 3.9514,1.0291 3.9345,1.0221 3.8696,1.0582 3.878,1.1447 3.8717,1.1592 3.8746,1.1611 L 3.9745,1.229 Z" />
                </symbol>

                <symbol id="relief-hill-3-bw" viewBox="-1 -17 55 55">
                    <ellipse fill="#999999" opacity=".5" cx="34.078" cy="14.5565" rx="17.5383" ry="2.4977" />
                    <path fill="#fff" stroke="#999999" stroke-width=".15"
                        d="M9.5101 10.696c-1.1371,-0.616 -2.0817,0.8736 -2.3778,1.983 2.316,1.1116 1.9087,-0.5195 7.8443,1.2694 1.893,0.5705 5.3152,2.5047 7.2126,2.0188 0.7716,0.8915 -0.8074,0.2993 1.3361,0.9441 0.9262,0.2787 1.3524,0.1052 2.2303,-0.0233 4.793,-0.0412 7.0949,-0.2386 11.5203,-0.7434l9.7932 -2.476c0.058,-0.0401 0.1681,-0.1253 0.2451,-0.1968 -1.0428,-2.3377 -2.2374,-2.3426 -3.6846,-3.9623l-2.5719 -2.6229c-2.3783,-2.3827 -2.1842,-1.4462 -4.5382,-2.9906 -2.2547,-1.4793 -3.7909,-3.6402 -7.2099,-3.8961l-1.3963 0c-0.1659,0.0108 -0.3346,0.026 -0.5081,0.045 -2.9309,0.3275 -4.9194,0.7402 -7.3265,2.2081 -1.2629,0.7705 -1.0411,1.1393 -2.1929,1.1886 -2.1831,0.0949 -6.7923,-4.2893 -9.5649,0.1226 -1.5845,-0.5314 -1.9841,0.1518 -4.761,1.5807 -1.4169,0.7288 -3.1099,1.4918 -3.5599,3.176 1.6951,0.3942 2.4781,1.1593 4.7551,1.1713 1.6962,1.1225 3.5935,-0.5488 4.7551,1.2038z" />
                    <path fill="#a6a6a6"
                        d="M8.321 3.5643c1.3481,-0.5748 2.6842,-1.4527 3.9644,-1.2288 1.6561,1.0005 0.7922,0.3254 1.2266,2.7948 2.0888,0.0081 0.0933,-0.2196 2.2281,-0.3487 -0.892,0.7179 -0.9283,0.7283 -1.8719,1.7596l-2.3903 -0.7678c0.6073,1.6523 0.9847,1.9825 -0.7277,3.888 -0.0607,0.0678 -0.1708,0.1822 -0.2212,0.237 -0.0515,0.0553 -0.1648,0.147 -0.2267,0.2375 1.8529,-1.3361 2.7769,-1.6376 3.824,-2.7341 1.3556,-1.4202 1.7125,-1.5481 3.8148,-2.8886 3.2367,-2.0628 4.5246,-3.4715 9.8192,-3.7427 3.2389,0.0944 3.0377,0.7809 5.5457,2.0215 -0.5997,1.3828 0.4956,-0.1779 -1.6973,1.0981 3.3951,0.3883 1.9624,1.9847 3.766,1.906l0.9397 -0.116c0.4799,0.0428 1.4934,0.468 2.1311,0.6366 0.019,2.3203 0.4289,3.9227 0.597,6.4615 -1.7699,-0.6176 -1.3887,-0.9506 -2.8333,-1.8301 -0.9273,-0.5645 -2.0411,-0.8085 -3.15,-1.1978 0.8551,0.9175 0.9457,0.5368 1.9299,1.1523 0.969,0.6062 1.1333,1.0872 1.8242,1.7835l-1.3307 0.6377c-0.0607,0.0304 -0.1892,0.09 -0.2755,0.148 1.1523,0.7619 1.7352,0.783 2.7959,1.61 -0.815,0.5932 -0.2343,0.2527 -0.7272,1.0628l9.7932 -2.476c0.058,-0.0401 0.1681,-0.1253 0.2451,-0.1968 -1.0428,-2.3377 -2.2374,-2.3426 -3.6846,-3.9623l-2.5719 -2.6229c-2.3783,-2.3827 -2.1842,-1.4462 -4.5382,-2.9906 -2.2547,-1.4793 -3.7909,-3.6402 -7.2099,-3.8961l-1.3963 0c-0.1659,0.0108 -0.3346,0.026 -0.5081,0.045 -2.9309,0.3275 -4.9194,0.7402 -7.3265,2.2081 -1.2629,0.7705 -1.0411,1.1393 -2.1929,1.1886 -2.1831,0.0949 -6.7923,-4.2893 -9.5649,0.1226z" />
                </symbol>

                <symbol id="relief-hill-4-bw" viewBox="-0.3 -2 5 5">
                    <ellipse fill="#999999" opacity=".5" cx="2.6747" cy="1.0184" rx="1.9077" ry=".342" />
                    <path fill="#a6a6a6"
                        d="M2.2044 1.3541c-0.1954,-0.0321 -0.4239,0.0192 -0.6394,0.0064 -0.199,-0.0118 -0.3908,-0.0241 -0.5739,-0.0608 -0.0888,-0.01 -0.1874,-0.0432 -0.2716,-0.0656 -0.0826,-0.0219 -0.1876,-0.0277 -0.2635,-0.0505 -0.0536,-0.0161 -0.0695,-0.0305 -0.119,-0.0399 -0.0517,-0.0098 -0.0881,-0.0106 -0.1393,-0.0285 -0.0673,-0.0236 -0.1656,-0.0681 -0.1977,-0.1154 0.0201,-0.0316 0.0837,-0.0955 0.1144,-0.1309 0.1504,-0.1731 0.3051,-0.3572 0.5179,-0.4616 0.0654,-0.0321 0.1139,-0.0438 0.1651,-0.0802 0.0565,-0.0401 0.0848,-0.067 0.1373,-0.1072 0.0217,-0.0166 0.05,-0.0352 0.0699,-0.053 0.0345,-0.0309 0.0185,-0.032 0.0682,-0.0525 0.0626,-0.0548 0.1482,-0.0752 0.2398,-0.1026 0.1339,-0.0134 0.1379,-0.0191 0.2832,0.0039 0.0944,0.0149 0.1869,0.0288 0.2822,0.0441 0.2056,0.0328 0.3306,0.0881 0.4927,0.1654l0.1875 0.075c0.0209,-0.0159 0.023,0.0033 0,-0.0213 0.0257,0.006 0.0563,0.0125 0.0816,0.0194 0.0833,0.0185 0.1814,0.0344 0.2806,0.0163 0.1007,-0.0184 0.123,-0.0498 0.2495,-0.0498 0.3406,-0.0001 0.5977,0.1486 0.8473,0.3509 0.0315,0.0256 0.0537,0.0398 0.0763,0.0734 0.0448,0.0667 0.1432,0.2195 0.1361,0.2972 -0.2027,0.1549 -0.5328,0.094 -0.7013,0.1811 -0.0616,0.0318 -0.154,0.0618 -0.198,0.1013 -0.0952,0.0855 -0.0629,0.057 -0.2107,0.0749 -0.2659,0.0323 -0.0629,0.0115 -0.262,0.009 -0.0936,-0.0011 -0.1844,0.0171 -0.2669,0.0346 -0.035,0.0074 -0.2023,-0.0064 -0.2742,-0.0064 -0.0102,-0.0046 -0.0204,-0.0076 -0.0311,-0.0125 -0.0313,-0.0145 -0.018,-0.0082 -0.0332,-0.0185l-0.0477 0.0043z" />
                    <path fill="#fff" stroke="#999999" stroke-width=".02"
                        d="M2.5582 0.2788c0.0257,0.006 0.0563,0.0125 0.0816,0.0194l-0.0467 0.0148c0.0989,0.0238 0.1701,0.0383 0.2783,0.0346 0.0927,-0.0032 0.1605,-0.0355 0.2563,-0.0416 0.0059,0.0681 0.0125,0.0546 0.0803,0.0661l0.3034 0.0735c0.2633,0.0879 0.1601,0.091 0.2872,0.1905 -0.0072,-0.0011 -0.2077,-0.1381 -0.2253,-0.0385 -0.007,0.0395 -0.0011,0.0619 0.043,0.0938 0.0291,0.0211 0.0671,0.0438 0.088,0.0405 -0.0384,0.0004 -0.0569,0.0018 -0.0921,-0.004 -0.024,-0.0039 0.0064,-0.0164 -0.0725,-0.0038 -0.0034,0.0005 -0.0099,0.0081 -0.0124,0.0042 -0.0042,-0.0066 -0.0582,0.0303 0.0019,0.1273 -0.0375,-0.0202 -0.0361,-0.0156 -0.0868,-0.0167 -0.0071,0.0087 -0.0283,0.0056 -0.0238,0.0831 -0.0556,0.0012 -0.0535,0.009 -0.0913,0.0299 0.0024,0.077 0.0051,0.0621 0.0496,0.0999 0.0394,0.0335 0.0647,0.125 0.1648,0.0333l0.0588 -0.0499c0,0 0.0278,0.0448 0.0854,0.0231 0.0806,-0.0303 0.0129,-0.1125 0.0099,-0.1178 0.0355,0.0244 0.0617,0.086 0.0845,0.1037 0.0046,0.0035 -0.0166,0.0192 0.0438,0.016 0.0518,-0.0028 0.0194,0.008 0.0396,-0.0218 0.0158,-0.0234 0.0088,-0.0578 0.0079,-0.0856 0.0039,0.0148 0.0561,0.1419 0.1436,0.1089 0.0935,-0.0353 -0.0041,-0.1155 -0.0211,-0.1773 0.0367,0.0117 0.0589,0.0515 0.0853,0.0766 0.0256,0.0244 0.1168,0.0761 0.1231,-0.0023l0.027 0.0273c-0.2027,0.1549 -0.5328,0.094 -0.7013,0.1811 -0.0616,0.0318 -0.154,0.0618 -0.198,0.1013 -0.0952,0.0855 -0.0629,0.057 -0.2107,0.0749 -0.2659,0.0323 -0.0629,0.0115 -0.262,0.009 -0.0936,-0.0011 -0.1844,0.0171 -0.2669,0.0346 -0.035,0.0074 -0.2023,-0.0064 -0.2742,-0.0064 -0.0102,-0.0046 -0.0204,-0.0076 -0.0311,-0.0125 -0.0313,-0.0145 -0.018,-0.0082 -0.0332,-0.0185 0.0891,0.0002 0.081,0.01 0.1771,-0.0035 0.0554,-0.0078 0.0792,0.0219 0.1781,0.0153 -0.0012,-0.1141 -0.0431,-0.1159 -0.0838,-0.1919 0.0736,0.0596 0.1594,0.1743 0.2952,0.1568 0.0087,-0.0222 0.019,-0.061 0.0253,-0.0724 0.0339,0.0425 0.0832,0.0686 0.1632,0.0681 0.0244,-0.0261 0.0098,0.0013 0.0138,-0.048 0.0333,0.0216 0.031,0.0326 0.0777,0.0235 0.076,-0.0149 0.0343,-0.0074 0.0465,-0.0393 -0.0461,-0.0577 -0.023,-0.0086 -0.0857,-0.0409l0.0014 -0.2034c-0.0355,0.0147 -0.0311,0.0231 -0.0523,0.0541 -0.0025,-0.0025 -0.0053,-0.0064 -0.0067,-0.0081l-0.169 -0.2127c-0.0859,-0.0724 -0.0239,-0.1127 -0.123,-0.0992l0.0251 0.0999c-0.1164,-0.0645 0.0039,-0.0841 -0.2276,-0.1398 -0.0076,-0.0589 0.0139,-0.0981 -0.0272,-0.134 -0.0531,-0.0464 -0.014,0.0293 -0.1724,-0.0642 0.0111,-0.0489 0.1259,-0.0586 0.032,-0.1513 -0.0164,-0.0162 -0.0359,-0.0275 -0.0442,-0.03l0.0589 0.004c0.0321,-0.0062 0.0135,0.0017 0.0356,-0.0132 0.0008,-0.0636 0.0089,-0.0413 -0.0194,-0.0945l0.1875 0.075c0.0209,-0.0159 0.023,0.0033 0,-0.0213zm-0.3538 1.0753c-0.1954,-0.0321 -0.4239,0.0192 -0.6394,0.0064 -0.199,-0.0118 -0.3908,-0.0241 -0.5739,-0.0608 -0.0888,-0.01 -0.1874,-0.0432 -0.2716,-0.0656 -0.0826,-0.0219 -0.1876,-0.0277 -0.2635,-0.0505 -0.0536,-0.0161 -0.0695,-0.0305 -0.119,-0.0399 -0.0517,-0.0098 -0.0881,-0.0106 -0.1393,-0.0285 -0.0673,-0.0236 -0.1656,-0.0681 -0.1977,-0.1154 0.0201,-0.0316 0.0837,-0.0955 0.1144,-0.1309 0.1504,-0.1731 0.3051,-0.3572 0.5179,-0.4616 0.0654,-0.0321 0.1139,-0.0438 0.1651,-0.0802 0.0565,-0.0401 0.0848,-0.067 0.1373,-0.1072 0.0217,-0.0166 0.05,-0.0352 0.0699,-0.053 0.0345,-0.0309 0.0185,-0.032 0.0682,-0.0525 0.0626,-0.0548 0.1482,-0.0752 0.2398,-0.1026 0.0123,0.038 0,0.0906 0.0726,0.0885 0.0489,-0.0014 0.0688,-0.0207 0.1504,-0.0092 0.1236,0.0175 0.1629,0.0134 0.2608,0.0655 -0.1347,0.3666 0.1384,0.2279 0.2222,0.2672 -0.0111,0.128 -0.062,-0.0039 -0.1137,0.1523 -0.0107,0.0323 0.0054,0.0077 -0.0132,0.034 -0.0641,-0.0115 -0.1919,-0.0698 -0.2164,-0.001 -0.0343,0.0963 0.0971,0.1029 0.151,0.1324 -0.027,0.0223 -0.0775,0.0132 -0.1011,0.0376 -0.0221,0.023 -0.0184,0.0643 -0.0172,0.1052l0.0784 0.0476c-0.0095,0.0791 -0.0071,0.0636 0.0043,0.144 -0.1394,-0.0074 -0.0164,-0.047 -0.164,-0.0413 -0.0305,0.1067 0.0115,-0.0011 0.0135,0.2172 -0.034,0.0162 -0.0766,0.0336 -0.0801,0.0769 0.0768,0.0049 0.0838,-0.0031 0.1494,-0.0132 0.0783,-0.012 0.066,0.0121 0.1545,0.0122 0.1465,0 0.2584,-0.0519 0.3406,0.0265z" />
                </symbol>

                <symbol id="relief-hill-5-bw" viewBox="-5 -17 39 39">
                    <ellipse fill="#999999" opacity=".5" cx="18.5104" cy="8.2102" rx="11.6925" ry="2.0964" />
                    <path fill="#fff" stroke="#999999" stroke-width=".15"
                        d="M2.6664 8.569l6.6798 1.0468c1.4368,0.1034 1.6554,-0.5235 4.6148,-0.5235l3.4373 0.5804c2.3733,0.4005 4.8164,-0.0146 7.2145,-0.5751 0.893,-0.209 1.8708,-0.4082 2.0891,-1.2267 -0.6616,-0.4433 -3.0827,-0.9749 -3.4846,-1.2219l-3.9205 -4.6365c-1.6138,-1.5379 -2.386,-2.5369 -5.0705,-1.7203 -1.2608,0.3838 -2.6905,1.3614 -3.9599,1.9773 -0.9728,0.4719 -0.5971,-0.1545 -1.818,0.0743 -1.0217,0.1913 -1.2501,0.6291 -1.4676,1.1634 -2.2544,0.5262 -1.6372,0.4547 -3.4443,1.9663 -0.9647,0.8068 -3.2527,1.1607 -3.5364,2.2228l0.6095 0.2632 2.0569 0.6095z" />
                    <path fill="#a6a6a6"
                        d="M6.9807 3.5071c0.8323,-0.3105 1.0225,-0.6742 1.5214,-0.5228 -0.1684,0.4101 -0.1168,0.2931 -0.4328,0.582 -1.3408,1.2267 -0.4657,0.4693 -0.8362,1.7841 -0.4626,1.6418 -2.0311,1.1235 -2.0325,1.1235l0.0086 1.2088c-1.2701,-0.2257 -0.6401,-0.6776 -2.5429,0.8863 1.5832,0.7156 4.745,0.7674 6.6798,1.0468l2.1397 -0.914c-0.3337,-0.6582 -0.1337,-0.027 -0.3091,-0.8347 -0.4497,-2.0724 -0.3922,-0.2204 -0.0607,-2.8923 0.0067,-0.0798 0.0244,-0.1027 0.0533,-0.1459 0.2861,0.1328 0.5641,-0.224 0.5274,1.2952 -0.0105,0.4366 -0.1068,0.385 0.0406,0.8233 0.1839,0.5467 0.0712,0.2508 0.348,0.4693 -0.1223,-0.8276 0.1904,-1.5961 -0.0399,-2.3841 -0.1354,-0.4636 -0.3659,-0.461 -0.284,-2.0483l1.209 -0.5235c-0.9178,-0.4863 -1.294,-0.0822 -2.2687,0.0891l2.9155 -1.7906c1.1801,-0.417 2.3153,-0.8054 3.3989,-0.106l0.3676 0.7225c-0.5436,0.2446 -1.1201,0.39 -2.0258,0.3786 -0.562,0.7683 -0.8409,0.6506 -1.1381,0.8811 0.0779,1.2646 -0.0929,0.5594 0.5414,1.1361 1.0146,0.9226 0.1753,1.4158 0.0537,1.6489l-0.0229 0.9993c-1.8749,0.1574 -0.8842,0.3953 -1.0724,1.7156 -0.8787,0.3071 -0.4001,0.4079 -1.3277,0.1376l0.0762 0.2778 1.4927 0.5417c0.2479,0.2778 2.7858,0.5028 3.4373,0.5804 2.3898,0.2859 4.8164,-0.0146 7.2145,-0.5751 0.893,-0.209 1.8708,-0.4082 2.0891,-1.2267 -0.6616,-0.4433 -3.0827,-0.9749 -3.4846,-1.2219l-3.9205 -4.6365c-1.6138,-1.5379 -2.386,-2.5369 -5.0705,-1.7203 -1.3728,0.4175 -2.5522,1.2943 -3.9599,1.9773 -0.9728,0.4717 -0.5971,-0.1545 -1.818,0.0743 -1.0217,0.1913 -1.2501,0.6291 -1.4676,1.1634z" />
                </symbol>

                <symbol id="relief-dune-2-bw" viewBox="-5 -17 40 40">
                    <ellipse fill="#999999" opacity=".5" cx="17.1027" cy="5.3226" rx="17.1027" ry=".5194" />
                    <polygon fill="#fff" stroke="#999999" stroke-width=".1"
                        points="15.2112,0 22.8169,2.667 30.4225,5.334 15.2112,5.334 -0,5.334 7.6057,2.667" />
                    <path fill="#a6a6a6"
                        d="M15.2112 0c-0.1987,1.1209 -3.4329,1.1587 -1.0819,2.2964 1.1972,0.5794 -1.7799,1.4239 -1.9267,1.5482 -0.5158,0.4369 -3.2959,1.0761 -3.4438,1.4894l6.4524 0 15.2113 0 -7.6057 -2.667 -7.6057 -2.667z" />
                </symbol>

                <symbol id="relief-deciduous-2-bw" viewBox="-27 -25 70 70">
                    <ellipse fill="#999999" opacity=".5" cx="9.3273" cy="18.4825" rx="5.534" ry="1.0889" />
                    <polygon fill="#808080"
                        points="8.6754,13.1329 9.4092,11.4084 10.6975,12.1523 8.8545,14.6027 9.3274,18.4825 6.2627,18.4825 6.8826,13.3966 5.2563,11.2344 6.4063,10.5705 7.0983,12.1967 8.2623,12.1967 8.5971,10.4211 9.2152,10.5814 8.5924,12.4519" />
                    <path fill="#fff" stroke="#999999" stroke-width=".2"
                        d="M 7.15625,0.001953 C 5.947743,0.051633 4.777378,0.866372 4.541016,2.291016 1.697616,1.720116 1.251953,5.136719 1.251953,5.136719 0.715975,5.415425 -0.025896,6.473322 0,7.443359 0.02091,8.22648 0.328216,8.934547 0.853516,9.435547 c -0.08115,0.334708 -0.002,1.216797 -0.002,1.216797 0.575571,2.696047 4.099448,3.07453 5.234376,0.447265 1.003399,0.3758 2.118546,0.375554 3.123046,0.002 0.0961,1.432601 1.233993,2.55516 2.746094,2.566407 1.485443,0.01105 2.604681,-1.013788 2.738281,-2.486328 1.9961,-0.5986 2.626179,-3.12715 1.142579,-4.59375 0.411446,-1.23286 0.403633,-1.864377 -0.51171,-2.949274 C 14.962812,3.227083 14.592119,2.82906 13.603479,2.761711 13.005579,1.152311 11.087816,0.485048 9.626916,1.347648 9.059872,0.387598 8.096163,-0.036697 7.156213,0.001945 Z" />
                    <path fill="#b3b3b3"
                        d="m 15.287006,3.6862427 c 0.780869,0.8257791 0.968452,1.9254248 0.493751,2.9018573 1.4836,1.4666 0.908743,3.9945 -1.087357,4.5931 -0.1336,1.3952 -1.3087,2.4863 -2.7389,2.4863 -1.4569,0 -2.6492,-1.1324 -2.7453,-2.565 C 8.2047,11.4761 7.0895,11.4745 6.0861,11.0987 5.0853,13.6233 1.48555,13.303294 0.92815,10.649694 6.1764485,10.111351 12.017072,7.3675453 15.287006,3.6862427 Z" />
                </symbol>

                <symbol id="relief-deciduous-3-bw" viewBox="-27 -25 70 70">
                    <ellipse opacity=".5" fill="#999999" ry="1.0889" rx="5.5339999" cy="18.4825" cx="9.3273001" />
                    <polygon fill="#808080"
                        points="10.6975,12.1523 8.8545,14.6027 9.3274,18.4825 6.2627,18.4825 6.8826,13.3966 5.2563,11.2344 6.4063,10.5705 7.0983,12.1967 8.2623,12.1967 8.5971,10.4211 9.2152,10.5814 8.5924,12.4519 8.6754,13.1329 9.4092,11.4084 " />
                    <path fill="#fff" stroke="#999999" stroke-width=".2"
                        d="M 7.15625,0.001953 C 5.947743,0.051633 4.777378,0.866372 4.541016,2.291016 1.697616,1.720116 1.251953,5.136719 1.251953,5.136719 0.715975,5.415425 -0.025896,6.473322 0,7.443359 0.02091,8.22648 0.328216,8.934547 0.853516,9.435547 c -0.08115,0.334708 -0.002,1.216797 -0.002,1.216797 0.575571,2.696047 4.099448,3.07453 5.234376,0.447265 1.003399,0.3758 2.118546,0.375554 3.123046,0.002 0.0961,1.432601 1.233993,2.55516 2.746094,2.566407 1.485443,0.01105 2.604681,-1.013788 2.738281,-2.486328 1.9961,-0.5986 2.626179,-3.12715 1.142579,-4.59375 0.411446,-1.23286 0.403633,-1.864377 -0.51171,-2.949274 C 14.962812,3.227083 14.592119,2.82906 13.603479,2.761711 13.005579,1.152311 11.087816,0.485048 9.626916,1.347648 9.059872,0.387598 8.096163,-0.036697 7.156213,0.001945 Z" />
                    <path fill="#b3b3b3"
                        d="m 15.287006,3.6862427 c 0.780869,0.8257791 0.968452,1.9254248 0.493751,2.9018573 1.4836,1.4666 0.908743,3.9945 -1.087357,4.5931 -0.1336,1.3952 -1.3087,2.4863 -2.7389,2.4863 -1.4569,0 -2.6492,-1.1324 -2.7453,-2.565 C 8.2047,11.4761 7.0895,11.4745 6.0861,11.0987 5.0853,13.6233 1.48555,13.303294 0.92815,10.649694 6.1764485,10.111351 12.017072,7.3675453 15.287006,3.6862427 Z" />
                    <g fill="#808080">
                        <circle r=".5" cy="8.3897734" cx="2.4284508" />
                        <circle r=".5" cy="7.3032885" cx="7.146461" />
                        <circle r=".5" cy="7.5826468" cx="13.668243" />
                        <circle r=".5" cy="10.326545" cx="11.61261" />
                        <circle r=".5" cy="6.656527" cx="10.684683" />
                        <circle r=".5" cy="3.3609581" cx="7.6241026" />
                        <circle r=".5" cy="5.1369228" cx="3.9471674" />
                        <circle r=".5" cy="4.1185794" cx="11.777494" />
                        <circle r=".5" cy="10.220185" cx="4.8988838" />
                    </g>
                </symbol>

                <symbol id="relief-conifer-2-bw" viewBox="-29 -22 72 72">
                    <ellipse fill="#999999" ry="1.0889" rx="5.534" cy="22.0469" cx="9.257" opacity=".5" />
                    <rect fill="#808080" height="3.8506" width="2.5553999" y="18.378901" x="6.1294999" />
                    <path fill="#fff" stroke="#999999" stroke-width=".2"
                        d="M 7.4340812,0.00390625 2.7791,8.1383 l 1.8745,0 -2.8102,4.7786 1.4306,0 -3.274,5.7789 3.7081,0 -0.0157,0.1578 -0.163,1.6315 1.3679,-0.9533 1.1999,-0.836 1.3546874,-0.01105 z" />
                    <path fill="#b3b3b3"
                        d="m 10.4603,8.1383 2.7736,4.7786 -1.5107,0 3.2298,5.7789 -3.5851,0 c 0.0635,0.63718 0.127242,1.274336 0.1909,1.9115 L 10.1909,19.654 8.8229,18.7009 C 8.399397,18.690076 7.8667262,18.6958 7.4072,18.6958 L 7.43,0 12.1753,8.1383 Z" />
                </symbol>

                <symbol id="relief-coniferSnow-1-bw" viewBox="-40 -33 100 100">
                    <ellipse opacity=".5" fill="#999999" ry="1.2864" rx="6.5377998" cy="26.225401" cx="11.2836" />
                    <rect fill="#808080" height="4.5489998" width="3.0188999" y="21.892099" x="7.5889001" />
                    <path fill="#ffffff" stroke="#999999" stroke-width=".3"
                        d="m 9.162109,0 -5.882812,9.996094 2.210937,0 -3.318359,5.646484 1.695313,0 L 0,22.46875 l 4.503906,0 -0.232422,2.330078 1.976563,-1.378906 1.367187,-0.951172 1.279297,0 0.570313,0 1.234375,0 1.572265,1.095703 1.976563,1.378906 -0.246094,-2.474609 4.355469,0 -3.814453,-6.826172 1.791015,0 -3.277343,-5.646484 2.027343,0 L 9.162109,0 Z" />
                    <path fill="#cccccc"
                        d="M 6.5951823,6.0195125 7.5469804,6.4667104 9.1405,5.8391 9.1169,9.7773 8.552,9.4859 8.3637,8.2407 7.4421,9.6992 6.8464,8.8302 6.0831,10.3216 5.6688004,9.8927321 3.4283446,9.8979233 5.2938502,6.7648265 Z M 4.603612,22.380706 0.16061807,22.359941 1.5538414,19.928206 3.3194,19.3188 4.21,21.258 5.7238,19.9809 6.3802,21.6688 9.115,19.1959 9.1085823,22.380706 7.581747,22.365132 4.3703321,24.632083 Z M 2.3197404,15.54208 3.8518545,13.002948 5.0889,13.3977 6.6027,12.1206 7.2591,13.8086 9.1447,11.8712 9.1169,16.5061 8.2922,15.2732 7.1877,16.7735 6.5249,15.0589 6.0831,15.9966 5.3456,15.9519 3.348006,16.76238 3.9658919,15.556763 Z" />
                    <path fill="#b3b3b3"
                        d="M 18.192172,22.380612 16.667913,19.642582 15.0363,20.5793 14.237,19.838 l -0.8708,1.3664 -1.4648,-0.7323 -1.2246,-1.4677 -0.4951,1.9892 -1.0754414,-1.782525 -0.013251,3.16953 1.6157154,5e-6 3.421234,2.381538 -0.228295,-2.376108 z M 12.95855,6.6024 12.1509,5.9991 11.1016,6.4009 9.1403,5.839 9.1167,9.7772 l 0.8802,-1.233 1.1046,1.5004 0.6627,-1.7147 0.4418,0.9377 0.7733,-0.6162 1.959503,1.2633353 z M 16.172777,15.54218 14.629945,12.897283 13.2003,13.3978 12.1509,12.728 11.1016,13.1299 9.1005515,11.885882 9.0989858,16.5061 9.997,15.2732 l 1.1046,1.5003 0.6627,-1.7146 0.4418,0.9377 0.7733,-0.6163 2.063911,1.342831 -0.612634,-1.166368 z" />
                </symbol>

                <symbol id="relief-acacia-2-bw" viewBox="-25 -25 70 70">
                    <ellipse fill="#999999" opacity=".5" cx="11.8845" cy="14.9969" rx="9.8385" ry=".9674" />
                    <polygon fill="#808080"
                        points="10.5615,11.0945 10.5829,11.0945 12.2991,7.8722 10.169,4.0939 10.3125,4.0095 12.478,7.5361 13.4213,5.7652 13.4149,5.6589 13.4148,5.6586 13.4149,5.6586 13.3389,4.3771 13.6356,4.3312 13.934,5.5138 17.4746,4.5262 17.5871,4.7584 13.7287,6.092 11.3715,11.2549 11.3489,15.121 9.7272,15.121 10.2179,12.7528 7.0146,6.7865 2.9196,5.5604 2.9861,5.3123 6.8814,6.2337 6.9778,4.8164 7.2348,4.8164 7.3396,6.359 7.7405,6.9989 9.0507,3.8628 9.3276,3.9662 8.1262,7.6071 8.1199,7.6047 10.4554,11.3337 10.548,11.1601 " />
                    <path fill="#b3b3b3"
                        d="M17.24 4.6771c0.136,0.1019 0.2845,0.1998 0.443,0.2908 0.9287,0.5331 1.8546,0.6285 2.0681,0.2131 0.3808,-0.7405 -1.3199,-1.8023 -1.9781,-2.0335 -0.6052,-1.333 -3.794,-1.9852 -5.2015,-1.7397 -1.2498,-1.425 -6.9085,-0.6433 -6.9145,1.0269 -1.0033,-0.0836 -2.9136,0.277 -3.2587,1.3145 -0.5348,0.2836 -2.068,1.3687 -1.6854,2.1132 0.4575,0.8898 2.5826,-0.2585 3.1902,-0.7762 0.5807,0.0788 1.2092,0.0303 1.7764,-0.1188 0.9067,0.5316 2.4273,0.3711 2.9534,-0.6075 1.2601,0.574 3.2016,0.6057 4.5418,0.2512 1.1523,0.2578 2.8891,0.2519 4.0653,0.0661z" />
                </symbol>

                <symbol id="relief-palm-2-bw" viewBox="-27 -25 70 70">
                    <ellipse fill="#999999" opacity=".5" cx="10.1381" cy="16.686" rx="6.176" ry="1.0271" />
                    <path fill="#b3b3b3"
                        d="M11.289 0.09c-1.2071,0.9898 -2.5231,2.5278 -3.1763,3.6163 -0.0463,-0.0865 -0.0877,-0.1708 -0.126,-0.2537l-6.5578 -1.8672c2.4316,-1.0619 4.8486,-1.347 6.2847,1.0194 -0.3892,-2.3401 2.8747,-2.8412 3.5754,-2.5147zm-11.289 7.6813l7.6896 -3.943c-3.1531,-1.6911 -7.1655,0.9025 -7.6896,3.943zm4.8314 3.1553c1.6467,-1.9 2.7841,-3.9718 2.7217,-6.4483 -3.3941,1.1324 -3.7342,4.899 -2.7217,6.4483zm6.5246 -0.3669c-1.8863,-2.4506 0.0568,-3.042 -3.0585,-5.9451 3.3784,-0.3062 5.1525,1.8059 3.0585,5.9451zm4.0962 -4.9207c-2.5616,-0.0001 -4.7634,-0.6542 -6.7787,-1.6477 4.523,-1.795 6.6868,0.7704 6.7787,1.6477zm1.1549 -4.3378l-7.9602 2.6334c0.8957,-3.4641 5.2694,-3.6955 7.9602,-2.6334z" />
                    <path fill="#808080"
                        d="M8.8323 5.3c0.3946,0 0.7145,-0.3199 0.7145,-0.7145 0,-0.3946 -0.3199,-0.7145 -0.7145,-0.7145 -0.0253,0 -0.0503,0.0013 -0.0749,0.0039 0.0473,-0.0954 0.0738,-0.203 0.0738,-0.3167 0,-0.3946 -0.3199,-0.7145 -0.7145,-0.7145 -0.3946,0 -0.7145,0.3199 -0.7145,0.7145 0,0.0844 0.0148,0.1653 0.0416,0.2405 -0.0427,-0.008 -0.087,-0.0122 -0.1321,-0.0122 -0.3946,0 -0.7145,0.3199 -0.7145,0.7145 0,0.3946 0.3199,0.7145 0.7145,0.7145 0.2723,0 0.509,-0.1524 0.6296,-0.3764 0.7194,3.9586 0.8226,7.8738 0.1215,11.7329l1.2482 0.0022c0.2847,-3.6277 0.2392,-7.3464 -0.6033,-11.2851 0.0404,0.0072 0.0821,0.0109 0.1246,0.0109z" />
                </symbol>

                <symbol id="relief-grass-2-bw" viewBox="-50 -50 130 130">
                    <path fill="#b3b3b3"
                        d="M8.006 9.9689c0.01,0.1224 0.2562,0.6142 0.3168,0.7806 0.1951,0.5354 0.1473,0.2936 0.0182,0.823 -0.0735,0.3015 -0.1633,0.593 -0.2331,0.8796 -0.0469,0.1924 -0.1471,0.7957 -0.2314,0.9 -0.2344,-0.4506 -0.4442,-0.9086 -0.6939,-1.3471 -0.1591,-0.2793 -0.6042,-1.0566 -0.8075,-1.2337 -0.027,0.3721 0.3191,1.9295 0.4091,2.2876 0.2439,0.9703 0.4829,1.7317 0.7253,2.648 0.0492,0.1862 0.0075,0.4256 -0.003,0.6304 -0.0445,0.8712 -0.0559,1.7966 0.0131,2.6635 0.0307,0.3842 0.1223,0.8417 0.1284,1.2016l0.1024 0.5881c0.0029,0.0075 0.0086,0.0171 0.0112,0.0231 0.0026,0.0061 0.0069,0.0161 0.0121,0.0229 -0.0201,0.1409 0.3189,1.5864 0.3765,1.7054 0.0612,0.1268 0.0114,0.0405 0.0791,0.0918l-0.0379 -1.2668 0.0028 -1.5257c0.0722,-0.204 -0.0201,-1.142 0.0982,-1.4492l0.4611 1.6129c0.1818,0.5322 0.3534,1.028 0.5451,1.5638 0.0597,-0.071 0.0533,-0.0927 0.071,-0.2157 0.1947,-1.3511 0.0668,-2.8802 -0.189,-4.1914 -0.0678,-0.3476 -0.1555,-0.6369 -0.241,-0.9833 -0.0601,-0.2431 -0.2712,-0.7233 -0.2313,-0.9674 0.0582,-0.357 0.1448,-0.6613 0.2123,-1.0091 0.0546,-0.2811 0.1565,-0.7292 0.2424,-0.9837 0.1078,0.1108 0.4968,1.7381 0.5634,2.0399 0.3158,1.4317 0.4477,3.1118 0.644,4.58 0.0302,0.226 0.2616,2.1642 0.3146,2.3266 0.0248,-0.0338 0.0036,0.0249 0.0403,-0.076 0.0751,-0.2062 0.2653,-1.3853 0.2934,-1.5866 0.3244,-2.3247 0.1769,-5.002 -0.5336,-7.1701 -0.2609,-0.7959 -0.3821,-1.096 -0.7028,-1.7968 -0.0741,-0.162 -0.1159,-0.1782 -0.0489,-0.3857l0.4829 -1.5332c0.0488,-0.156 0.2436,-0.6378 0.256,-0.7337l0.1925 2.3718c0.0494,0.7686 0.1347,1.5966 0.2136,2.3623 0.0805,0.7816 0.1609,1.5731 0.2173,2.339 0.058,0.7884 0.183,1.5648 0.2406,2.343 0.0575,0.776 0.1742,1.5495 0.2513,2.3048l0.7845 6.9541c0.0617,-0.1477 0.9814,-6.953 0.9883,-7.0128 0.0893,-0.7707 0.2394,-1.5785 0.3252,-2.3506 0.112,0.5882 0.1575,1.1641 0.3065,1.7461 0.0398,0.1551 0.3674,1.4344 0.5327,1.5545l0.0617 -2.3153c0.0245,-0.3683 0.0303,-0.7359 0.0476,-1.1077 0.0447,-0.964 0.1773,-2.2719 0.3848,-3.1701 0.0875,-0.379 0.3809,-1.6006 0.5287,-1.8412 0.132,0.2798 0.2531,1.6127 0.2982,2.009 0.1201,1.0555 0.1258,3.4769 0.0559,4.556l-0.1185 2.2153c0.251,0.0329 0.9582,0.1558 1.1849,0.1215 0.0303,-0.0714 0.1058,-0.6785 0.1264,-0.8113 0.2594,-1.6732 0.4863,-3.3522 0.7616,-5.0316 0.0214,-0.1304 0.0473,-0.2766 0.0686,-0.4156 0.0157,-0.1018 0.0233,-0.2382 0.067,-0.3309 0.025,-0.0531 0.0105,-0.0337 0.04,-0.0694 0.1873,0.626 0.0716,1.8797 0.0618,2.5119l-0.1128 5.2565c-0.018,0.8181 -0.091,1.8066 -0.0418,2.6146 0.1147,-0.1814 1.3959,-4.3477 1.5767,-4.9006l0.7049 -2.0785c0.1608,-0.4479 0.3427,-0.9066 0.5472,-1.3256 0.1626,-0.333 0.5024,-0.8236 0.7601,-1.0852 0.3655,-0.3712 0.6129,-0.5671 1.2842,-0.5902 -0.8746,-0.4681 -1.8535,0.3689 -2.2598,0.7793 -0.2665,0.2692 -0.5145,0.5958 -0.7389,0.9385 -0.2337,0.357 -0.4033,0.6698 -0.6011,1.058 -0.1232,-0.266 0.0664,-1.8232 -0.6104,-3.5206 -0.4097,-1.0277 -0.4293,-0.7108 -0.2398,-1.5439 0.0682,-0.2999 0.1235,-0.5615 0.2058,-0.8484 0.0697,-0.2431 0.2306,-0.5792 0.2694,-0.7712 -0.4432,0.4059 -0.7179,1.2818 -0.9318,1.664 -0.0594,-0.0312 -0.2359,-0.3425 -0.2841,-0.4048 -0.0471,0.1146 0.1605,0.5585 0.1358,0.7746 -0.0102,0.0883 -0.2029,0.5981 -0.2507,0.7454l-0.4816 1.5262c-0.0598,-0.1425 -0.0699,-0.5906 -0.0856,-0.7876 -0.0761,-0.9568 -0.3857,-2.0152 -0.7118,-2.8963 -0.2156,-0.5824 -0.3107,-0.4252 -0.0598,-0.9737l0.4293 -0.9123 0.1352 -0.258c0.0352,-0.0635 0.0899,-0.1571 0.1339,-0.233 0.0651,-0.1123 0.2579,-0.3769 0.284,-0.4735 0.2499,-0.3174 0.4001,-0.6152 0.7209,-0.964 0.0946,-0.1028 0.2308,-0.2068 0.2869,-0.3007 -0.8031,0.1081 -1.9073,1.3062 -2.4276,1.9965 -0.0998,0.1323 -0.1788,0.2727 -0.268,0.3818 -0.0957,-0.0695 -0.3155,-0.5096 -0.4017,-0.6465 -0.1802,-0.2861 -0.0988,-0.3491 -0.0004,-0.8342 0.2597,-1.2819 0.6949,-2.7994 1.3548,-3.8989 0.1186,-0.1975 0.3456,-0.4924 0.4143,-0.6494 -0.4149,0.204 -1.1763,1.513 -1.4167,1.9752 -0.423,0.8133 -0.4558,1.0521 -0.7359,1.7951 -0.0367,0.0973 -0.1645,0.5451 -0.237,0.6227 -0.1537,-0.0895 -0.3924,-0.5679 -0.5678,-0.6617 0.0322,0.1402 0.1504,0.3661 0.2209,0.5158 0.3343,0.7092 0.2771,0.3999 -0.0743,1.7054 -0.2868,1.0653 -0.884,3.8898 -1.0382,4.9878 -0.0539,0.3833 -0.4366,2.3809 -0.427,2.5467 -0.0805,-0.394 -0.1065,-0.7929 -0.1571,-1.2144l-0.4637 -3.7082c-0.2118,-1.6323 -0.4588,-3.2351 -0.6682,-4.8653 -0.2162,-1.683 -0.2809,-0.8009 0.1957,-2.2675 0.0942,-0.2897 0.2658,-0.7185 0.3818,-1.009 0.1374,-0.3442 0.2404,-0.6702 0.3713,-1.0216 0.2551,-0.6852 0.52,-1.3285 0.761,-2.0231 0.1398,-0.4033 0.7296,-1.8322 0.763,-2.0313 -0.3354,0.1699 -1.918,3.0615 -2.2394,3.7079 -0.1032,0.2076 -0.2149,0.4192 -0.3313,0.6609 -0.0848,0.1764 -0.235,0.5506 -0.3346,0.6597 -0.0894,-0.1864 -0.3719,-2.7916 -0.3047,-3.4028 0.0097,-0.0873 0.0319,-0.1378 -0.0068,-0.208 -0.4978,1.4841 -0.1261,4.3856 -0.2115,4.7997l-0.7467 1.8056c-0.171,0.4381 -0.559,1.5984 -0.6942,1.89 -0.0155,-0.01 -1.3331,-1.7727 -2.0467,-1.9895 0.0785,0.1951 0.6092,0.8361 0.7782,1.2903l0.333 0.6734c0.0542,0.0927 0.0073,0.0353 0.0738,0.0817zm13.0512 11.8827c0.0536,-1.3603 -0.0071,-3.1476 0.8463,-4.2995 0.5114,-0.6901 0.6324,-0.5515 0.9169,-0.8091 -1.1337,-0.0648 -1.7274,1.0616 -2.0289,1.8806 -0.1635,0.4445 -0.2622,1.2108 -0.2241,1.7503 0.0323,0.4579 0.1972,1.2068 0.4898,1.4778zm-21.0572 -4.891c0.0398,0.1282 0.3436,0.3131 0.5603,0.529 0.5272,0.5249 1.061,1.1995 1.3065,1.9899 0.1823,0.587 0.3424,1.0807 0.4692,1.7194 0.0536,0.2706 0.3253,1.7034 0.3987,1.8101 0.1145,-0.2387 0.1545,-1.4669 0.1547,-1.841 0.0009,-1.3861 -0.4413,-3.0513 -1.5172,-3.8375 -0.144,-0.1052 -0.3813,-0.2519 -0.5644,-0.3128 -0.1371,-0.0457 -0.6992,-0.1375 -0.8078,-0.0572zm4.3825 -1.6528l-0.4513 -0.4783c-0.4141,-0.4094 -1.0223,-1.0085 -1.6092,-1.1756 0.5264,0.3551 1.5091,1.9709 1.8078,2.5966 0.1382,0.2897 0.0976,0.4283 0.0658,0.7851 -0.0512,0.5729 -0.0546,1.1227 -0.0848,1.7046l-0.7856 -1.203c-0.287,-0.4012 -0.563,-0.7655 -0.9027,-1.114 -0.3226,-0.331 -0.639,-0.6473 -1.0634,-0.9542 -0.2604,-0.1883 -0.9718,-0.6549 -1.3452,-0.6858 0.242,0.2369 0.4647,0.2793 1.0477,0.9271 0.327,0.3633 0.6136,0.7011 0.882,1.1349 1.0718,1.7321 1.4957,2.9592 2.1959,4.8201l1.3132 3.6646c0.0302,0.0453 0.014,0.0239 0.0449,0.053l-0.1851 -5.1476c0.1155,0.2152 0.2186,0.664 0.295,0.9284 0.0485,0.1672 0.2307,0.7957 0.309,0.9096l1.007 -0.2398c0.0172,-0.0049 0.0446,-0.0142 0.0623,-0.0223l0.0785 -0.0465 -1.0348 -6.081c-0.0483,-0.3585 -0.0857,-0.7015 -0.1213,-1.0675 -0.064,-0.6593 0.0266,-0.6608 0.0703,-1.0886 -0.6079,0.3463 -0.5436,2.7286 -0.5832,3.4022 -0.12,-0.1348 -0.2714,-0.5002 -0.2813,-0.7044 -0.0827,-1.707 0.1145,-3.1263 0.2169,-4.8307 0.018,-0.2998 0.0499,-0.6403 0.0772,-0.9377 0.0262,-0.2836 0.0851,-0.6533 0.0701,-0.9262l-0.3242 1.3574c-0.1432,0.7087 -0.7194,4.3376 -0.7718,4.4197zm10.1304 -2.9075c0.1037,-0.0678 0.1724,-0.3043 0.226,-0.4236 0.2754,-0.6141 0.3861,-0.5432 0.2613,-0.8881 -0.0539,-0.1494 -0.1004,-0.3571 -0.1914,-0.462 -0.0739,0.1333 -0.2958,1.5435 -0.2959,1.7736z" />
                </symbol>

                <symbol id="relief-swamp-2-bw" viewBox="-15 -15 40 40">
                    <path fill="#999999"
                        d="M6.7214 3.6274l0.2974 -1.246c0.0125,0.0018 0.0257,0.0026 0.0392,0.0026l0.0722 0 0.0017 0 -0.2183 0.9141c-0.0646,0.1067 -0.1305,0.2187 -0.1923,0.3293zm0.6589 -2.7597l0.0731 -0.3064 0.1137 0 -0.0725 0.3037 -0.0017 0 -0.0722 0c-0.0135,0 -0.027,0.0009 -0.0403,0.0026z" />
                    <path fill="#5c5c70"
                        d="M7.4207 0.8651l0.0722 0c0.126,0 0.2104,0.0787 0.1873,0.175l-0.2791 1.169c-0.0229,0.0962 -0.1448,0.175 -0.2709,0.175l-0.0722 0c-0.126,0 -0.2104,-0.0787 -0.1874,-0.175l0.2791 -1.169c0.023,-0.0962 0.1449,-0.175 0.271,-0.175z" />
                    <rect fill="#999999" transform="matrix(-0.939683 -0 0.0671203 0.763489 5.89737 4.35244E-05)"
                        width=".1137" height="7.4462" />
                    <rect fill="#5c5c70" transform="matrix(-0.939683 -0 0.0671203 0.763489 6.10204 0.303724)"
                        width=".5305" height="1.9895" rx=".2292" ry=".2292" />
                    <path fill="#b3b3b3"
                        d="M5.6178 4.8049c-0.1679,-0.208 -0.383,-0.5796 -0.5433,-0.8263 -0.1936,-0.298 -0.4232,-0.5766 -0.5848,-0.8489l-0.9815 0.3056c-0.5605,-0.3496 -1.0382,-0.8091 -1.7154,-1.1437 0.1982,0.2144 0.5147,0.3846 0.7658,0.5837 0.2565,0.2034 0.4549,0.3975 0.7175,0.6332l-1.7204 0.7493c-0.2861,0.1365 -0.5417,0.2743 -0.7905,0.4197l-0.6765 0.422c-0.1001,0.095 0.0047,-0.0492 -0.0888,0.1093l1.6642 -0.8211c0.5858,-0.2699 1.1939,-0.4706 1.7655,-0.7272 0.3702,0.2065 2.2853,2.1742 2.4896,2.645 0.2815,0.0964 0.5399,0.0802 0.7835,-0.0071 0.1711,-1.0885 0.5199,-2.1608 1.1254,-3.1061 0.1892,-0.2953 0.4614,-0.6218 0.6108,-0.9103l-0.1471 0.1016c-0.4466,0.3599 -1.3762,1.709 -1.4848,2.1317 0.027,-0.3821 0.4922,-1.2446 0.6983,-1.6164 0.3692,-0.6659 0.7759,-1.1199 0.9917,-1.4896 -0.4499,0.2861 -1.2108,1.2966 -1.4397,1.6572 -0.1784,0.2813 -0.4033,0.6582 -0.5347,0.9472 -0.1451,0.3189 -0.2561,0.796 -0.3948,1.077 -0.4754,-1.2016 -0.9581,-3.1053 -2.1105,-4.1177 -0.0085,-0.0074 -0.1118,-0.0899 -0.1174,-0.0941l-0.185 -0.1184c0.2319,0.3027 0.4313,0.5344 0.6578,0.8699 0.4173,0.6178 1.1832,2.5842 1.2451,3.1745zm-1.9272 -1.2197c0.0276,0.0352 1.0203,0.8641 1.4665,1.3489l0.2084 0.187c0.0085,0.0062 0.0253,0.0173 0.0382,0.0257l-1.1212 -1.7614 -0.5918 0.1998z" />
                    <path fill="#999999"
                        d="M6.3074 6.8936c1.5063,0 2.7274,-0.1667 2.7274,-0.3725 0,-0.0972 -0.2722,-0.1856 -0.7181,-0.2518 0.2711,0.0449 0.43,0.0993 0.43,0.158 0,0.1539 -1.0921,0.2787 -2.4393,0.2787 -1.3473,0 -2.4395,-0.1248 -2.4395,-0.2787 0,-0.0587 0.1589,-0.1131 0.4301,-0.158 -0.4459,0.0663 -0.7182,0.1548 -0.7182,0.2518 0,0.2058 1.2212,0.3725 2.7275,0.3725z" />
                    <path fill="#999999"
                        d="M6.3074 6.6001c0.8298,0 1.5026,-0.0919 1.5026,-0.2052 0,-0.0535 -0.15,-0.1023 -0.3956,-0.1388 0.1494,0.0247 0.2369,0.0547 0.2369,0.0871 0,0.0847 -0.6016,0.1534 -1.3439,0.1534 -0.7422,0 -1.3439,-0.0687 -1.3439,-0.1534 0,-0.0324 0.0874,-0.0623 0.2368,-0.0871 -0.2455,0.0365 -0.3955,0.0852 -0.3955,0.1388 0,0.1133 0.6727,0.2052 1.5026,0.2052z" />
                </symbol>

                <symbol id="relief-swamp-3-bw" viewBox="-4 -3.5 9 9">
                    <rect fill="#999999" transform="matrix(-0.939683 -0 -0.0316337 0.763489 0.643293 9.91602E-06)"
                        width=".0259" height="1.6965" />
                    <rect fill="#5c5c70" transform="matrix(-0.939683 -0 -0.0316337 0.763489 0.680973 0.0691964)"
                        width=".1209" height=".4533" rx=".0522" ry=".0522" />
                    <path fill="#b3b3b3"
                        d="M0.6587 1.102c0.1102,-0.2132 0.1717,-0.3927 0.3066,-0.6211 -0.0607,0.1599 -0.2665,0.6844 -0.2488,0.6649 0.2213,-0.2987 0.2022,-0.374 0.5309,-0.6322 -0.2144,0.2835 -0.3551,0.5968 -0.5235,0.886 -0.055,0.0555 -0.1634,0.0382 -0.2015,0.0031 -0.1446,-0.3525 -0.2572,-0.3752 -0.4702,-0.6162 0.1033,0.0385 0.3336,0.2256 0.3813,0.3151 -0.0476,-0.1539 -0.3112,-0.345 -0.4261,-0.4622 0.2831,0.0935 0.4085,0.3418 0.5708,0.5327 0.0455,-0.269 0.0508,-0.6339 0.2634,-0.8413 -0.1045,0.2155 -0.2096,0.543 -0.1829,0.7713z" />
                    <path fill="#999999"
                        d="M0.6214 1.5706c0.3432,0 0.6214,-0.038 0.6214,-0.0849 0,-0.0221 -0.062,-0.0423 -0.1636,-0.0574 0.0618,0.0102 0.098,0.0226 0.098,0.036 0,0.0351 -0.2488,0.0635 -0.5557,0.0635 -0.307,0 -0.5558,-0.0284 -0.5558,-0.0635 0,-0.0134 0.0362,-0.0258 0.098,-0.036 -0.1016,0.0151 -0.1636,0.0353 -0.1636,0.0574 0,0.0469 0.2782,0.0849 0.6214,0.0849z" />
                    <path fill="#999999"
                        d="M0.6214 1.5037c0.189,0 0.3423,-0.0209 0.3423,-0.0468 0,-0.0122 -0.0342,-0.0233 -0.0901,-0.0316 0.034,0.0056 0.054,0.0125 0.054,0.0198 0,0.0193 -0.1371,0.035 -0.3062,0.035 -0.1691,0 -0.3062,-0.0157 -0.3062,-0.035 0,-0.0074 0.0199,-0.0142 0.054,-0.0198 -0.0559,0.0083 -0.0901,0.0194 -0.0901,0.0316 0,0.0258 0.1533,0.0468 0.3423,0.0468z" />
                </symbol>

                <symbol id="relief-cactus-1-bw" viewBox="-50 -38 120 120">
                    <ellipse fill="#999999" opacity=".5" cx="11.6624" cy="30.5346" rx="11.2558" ry="1.3184" />
                    <polygon fill="#5c5c70"
                        points="10.5474,0 10.2885,0.8968 8.9818,0.1755 9.8281,1.8655 11.2667,1.8655 12.113,0.1755 10.8062,0.8968" />
                    <path fill="#b3b3b3"
                        d="M18.8889 30.0026c0.3115,-0.3161 0.5627,-0.7559 0.7223,-1.2724 0.0619,0.0171 0.1258,0.0263 0.1913,0.0263 0.5329,0 0.9647,-0.5965 0.9647,-1.3324 0,-0.7359 -0.4318,-1.3326 -0.9647,-1.3326 -0.0655,0 -0.1293,0.0093 -0.1912,0.0263 -0.1171,-0.3791 -0.2837,-0.717 -0.4871,-0.9948 0.5401,-0.2953 1.1411,-0.8939 1.6308,-1.6806 0.854,-1.3719 1.0461,-2.7956 0.4288,-3.1801 -0.4598,-0.2862 -1.2385,0.0849 -1.9589,0.8593 0.0024,-0.0412 0.0037,-0.083 0.0037,-0.1254 0,-0.6869 -0.3358,-1.2436 -0.7499,-1.2436 -0.4141,0 -0.7498,0.5567 -0.7498,1.2436 0,0.6477 0.2987,1.1799 0.68,1.2382 -0.4346,0.7516 -0.6691,1.5041 -0.6797,2.0791l-0.0003 0c-0.5002,0 -0.9592,0.2657 -1.3173,0.7081 -0.0107,-0.0344 -0.0221,-0.069 -0.0344,-0.1036 -0.2936,-0.8281 -0.9175,-1.3628 -1.3935,-1.194 -0.476,0.1687 -0.6239,0.977 -0.3301,1.8053 0.2271,0.6405 0.6516,1.1054 1.0528,1.205 -0.0334,0.2219 -0.0513,0.4527 -0.0513,0.6898 0,1.0732 0.3624,2.0194 0.9136,2.5785 -0.5911,0.1126 -0.9827,0.3089 -0.9827,0.532l2.1429 0 2.1428 0c0,-0.2233 -0.3915,-0.4193 -0.9828,-0.532zm-10.9784 0.532l5.2738 0 0 -17.364 5.9327 0c1.0878,0 1.9778,-0.8898 1.9778,-1.9776l0 -3.9552c0,-1.0877 -0.89,-1.9777 -1.9778,-1.9777l0 0c-1.0877,0 -1.9776,0.89 -1.9776,1.9777l0 1.9776 -3.9551 0 0 -5.0493c0,-1.4503 -1.1867,-2.6367 -2.6369,-2.6367l0 0c-1.4504,0 -2.6369,1.1864 -2.6369,2.6367l0 14.0111 -3.9552 0 0 -1.9776c0,-1.0878 -0.89,-1.9778 -1.9776,-1.9778l0 0c-1.0878,0 -1.9777,0.89 -1.9777,1.9778l0 3.9552 0 0c0,1.0875 0.8899,1.9777 1.9777,1.9777l5.9328 0 0 8.4021zm13.1843 -19.3416l0 0z" />
                    <path fill="#999999"
                        d="M18.8889 30.0026c0.3115,-0.3161 0.5627,-0.7559 0.7223,-1.2724 0.0619,0.0171 0.1258,0.0263 0.1913,0.0263 0.5329,0 0.9647,-0.5965 0.9647,-1.3324 0,-0.7359 -0.4318,-1.3326 -0.9647,-1.3326 -0.0655,0 -0.1293,0.0093 -0.1912,0.0263 -0.1171,-0.3791 -0.2837,-0.717 -0.4871,-0.9948 0.5401,-0.2953 1.1411,-0.8939 1.6308,-1.6806 0.854,-1.3719 1.0461,-2.7956 0.4288,-3.1801 -0.1593,-0.0992 -0.3572,-0.1194 -0.5773,-0.0713 0.0585,0.016 0.1135,0.0395 0.1646,0.0713 0.6172,0.3845 0.4252,1.8082 -0.4289,3.1801 -0.4896,0.7867 -1.0906,1.3853 -1.6308,1.6806 0.2035,0.2778 0.3701,0.6157 0.4872,0.9948 0.0619,-0.017 0.1257,-0.0263 0.1912,-0.0263 0.5328,0 0.9647,0.5967 0.9647,1.3326 0,0.7359 -0.4319,1.3324 -0.9647,1.3324 -0.0655,0 -0.1294,-0.0092 -0.1914,-0.0263 -0.1595,0.5165 -0.4107,0.9563 -0.7222,1.2724 0.5913,0.1127 0.9828,0.3087 0.9828,0.532l0.4127 0c0,-0.2233 -0.3915,-0.4193 -0.9828,-0.532zm-16.5174 -7.9252c0.896,-0.1875 1.5746,-0.9864 1.5746,-1.9361l0 -3.9552c0,-0.9608 -0.6946,-1.7673 -1.6065,-1.9423l0 0.0115 0 1.9308 0 0.5782 0 2.8041 0.0319 0 0 2.509zm9.2062 8.4572l1.6064 0 0 -17.364 0.0002 0c0,-1.3183 0,-2.6369 0,-3.9552l-0.0002 0 0 -5.0493c0,-1.0851 -0.6643,-2.0226 -1.6064,-2.4258l0 2.4258c0,8.7895 0,17.5791 0,26.3685zm7.9425 -17.4055c0.8961,-0.1875 1.5746,-0.9864 1.5746,-1.9361l0 -3.9552c0,-0.9609 -0.6946,-1.7673 -1.6065,-1.9423l0 0.0114 0 1.9309 0 0.5782 0 2.804 0.0319 0 0 2.5091zm-0.308 7.6085c-0.0718,-0.5627 -0.373,-0.985 -0.7335,-0.985 -0.0716,0 -0.1408,0.0166 -0.2064,0.0477 0.3138,0.1486 0.5436,0.6278 0.5436,1.1959 0,0.0424 -0.0013,0.0842 -0.0038,0.1254 0.1322,-0.1422 0.2662,-0.2706 0.4001,-0.384zm-2.916 3.9775c-0.3167,-0.7104 -0.8766,-1.1457 -1.3125,-0.9911l-0.0145 0.0057c0.3836,0.1275 0.779,0.5782 0.9953,1.1883 0.0122,0.0346 0.0237,0.0692 0.0344,0.1036 0.0927,-0.1144 0.192,-0.2172 0.2973,-0.3065z" />
                </symbol>

                <symbol id="relief-cactus-2-bw" viewBox="-49 -41 120 120">
                    <polygon fill="#5c5c70"
                        points="3.9483,14.2784 3.6984,15.1439 2.4374,14.4478 3.2541,16.0787 4.6425,16.0787 5.4592,14.4478 4.1982,15.1439" />
                    <ellipse fill="#BDBFC1" cx="10.5348" cy="27.9924" rx="10.5348" ry="1.2724" />
                    <path fill="#b3b3b3"
                        d="M9.1307 27.9925l5.0895 0 0 -12.5588 5.7257 0c1.0497,0 1.9085,-0.8588 1.9085,-1.9085l0 -3.8172c0,-1.0497 -0.8589,-1.9085 -1.9085,-1.9085l0 0c-1.0497,0 -1.9086,0.8589 -1.9086,1.9085l0 1.9086 -3.8171 0 0 -9.0718c0,-1.3996 -1.1452,-2.5448 -2.5448,-2.5448l0 0c-1.3996,0 -2.5447,1.1452 -2.5447,2.5448 0,8.4826 0,16.9651 0,25.4477zm12.7238 -14.4674l0 0z" />
                    <path fill="#b3b3b3"
                        d="M6.8427 23.5745c0.5187,0.1819 1.2323,-0.5066 1.5937,-1.5377 0.3614,-1.031 0.2339,-2.0143 -0.2848,-2.1961 -0.5187,-0.1819 -1.2322,0.5066 -1.5937,1.5376 -0.0555,0.1582 -0.0994,0.3153 -0.1322,0.4685 -0.204,-0.4516 -0.4675,-0.7946 -0.7661,-0.98 0.3423,-0.5575 0.5494,-1.2841 0.5494,-2.0787 0,-1.7568 -1.0122,-3.1809 -2.2607,-3.1809 -1.2487,0 -2.2608,1.4241 -2.2608,3.1809 0,1.6948 0.942,3.0799 2.1296,3.1755 -0.243,0.5892 -0.3889,1.3428 -0.3889,2.1642 0,1.3665 0.4035,2.5453 0.9868,3.0916 -0.7731,0.0885 -1.3212,0.3101 -1.3212,0.5695l4.1359 0c0,-0.2624 -0.5609,-0.4862 -1.3481,-0.5725 0.5814,-0.5476 0.9836,-1.7246 0.9836,-3.0886 0,-0.1884 -0.0078,-0.3732 -0.0226,-0.5533l0.0001 0z" />
                    <path fill="#999999"
                        d="M5.4882 20.7795c0.2721,-0.5451 0.4349,-1.2376 0.4349,-1.9914 0,-1.7568 -0.8841,-3.1809 -1.9747,-3.1809 -0.666,0 -1.2058,1.4241 -1.2058,3.1809 0,1.6442 0.4729,2.997 1.0795,3.1636l0.0165 -0.0389c-0.2703,-0.2796 -0.4747,-1.5721 -0.4747,-3.1247 0,-1.7568 0.2617,-3.1809 0.5846,-3.1809 0.949,0 1.7183,1.4241 1.7183,3.1809 0,0.73 -0.1329,1.4025 -0.3563,1.9394 0.0602,0.0113 0.1195,0.0288 0.1778,0.0521zm-0.3414 6.7643c0.829,-0.0001 1.501,-1.5294 1.501,-3.416 0,-0.2568 -0.0125,-0.5069 -0.0361,-0.7475 0.0607,0.0945 0.1379,0.1615 0.2312,0.1942 0.134,0.0471 0.5357,-0.7507 0.8972,-1.7818 0.3615,-1.031 0.5458,-1.9049 0.4117,-1.952 -0.3943,-0.1382 -1.007,0.5856 -1.3684,1.6166 -0.1717,0.49 -0.2558,0.9611 -0.2545,1.3355 0.0303,0.1617 0.055,0.3297 0.0741,0.5031 0.0525,0.1431 0.1326,0.241 0.24,0.2787 0.2765,0.097 0.7938,-0.6602 1.1553,-1.6913 0.3615,-1.0311 0.4303,-1.9455 0.1536,-2.0425 -0.4531,-0.1588 -1.1134,0.5483 -1.4748,1.5793 -0.1272,0.3627 -0.2004,0.7172 -0.2221,1.0313 -0.2575,-1.0382 -0.7467,-1.7393 -1.308,-1.7393 -0.5062,0 -0.9165,1.5293 -0.9165,3.4159 0,1.8866 0.4103,3.416 0.9165,3.416zm0 -6.8319c-0.2454,0 -0.4444,1.5293 -0.4444,3.4159 0,1.8866 0.1989,3.416 0.4444,3.416 0.7213,-0.0001 1.3062,-1.5294 1.3062,-3.416 0,-1.8865 -0.5848,-3.4159 -1.3062,-3.4159zm0 0c-0.8291,0 -1.5012,1.5293 -1.5011,3.4159 0,1.8866 0.672,3.416 1.5011,3.416 0.2454,-0.0001 0.4442,-1.5294 0.4442,-3.416 0,-1.8865 -0.1988,-3.4159 -0.4442,-3.4159 -0.7215,0 -1.3062,1.5293 -1.3062,3.4159 0,1.8866 0.5848,3.416 1.3062,3.416 0.5061,-0.0001 0.9164,-1.5294 0.9164,-3.416 0,-1.8865 -0.4103,-3.4159 -0.9164,-3.4159zm1.696 2.8626c0.453,0.1588 1.1133,-0.5482 1.4748,-1.5794 0.3615,-1.031 0.2871,-1.9956 -0.1659,-2.1545 -0.2767,-0.097 -0.794,0.6602 -1.1555,1.6912 -0.3615,1.0312 -0.4302,1.9456 -0.1535,2.0426zm1.3089 -3.7338c-0.1341,-0.047 -0.5359,0.7507 -0.8974,1.7817 -0.3614,1.0311 -0.5458,1.9051 -0.4115,1.9521 0.3942,0.1382 1.0069,-0.5856 1.3683,-1.6167 0.3615,-1.031 0.3349,-1.9789 -0.0593,-2.1171zm-4.2034 -4.2335c-1.0907,0 -1.9748,1.4241 -1.9748,3.1809 0,1.6862 0.8144,3.0656 1.8442,3.1738l0.0008 -0.0019c-0.8884,-0.1229 -1.5886,-1.496 -1.5886,-3.172 0,-1.7568 0.7693,-3.1809 1.7184,-3.1809 0.3228,0 0.5845,1.4241 0.5845,3.1809 0,0.9114 -0.0705,1.7331 -0.1833,2.313 0.1684,-0.1756 0.3532,-0.2971 0.5486,-0.3534 0.1603,-0.5401 0.2558,-1.2204 0.2558,-1.9596 0,-1.7568 -0.5398,-3.1809 -1.2057,-3.1809z" />
                    <path fill="#999999"
                        d="M12.5713 27.9925l1.649 0c0,-11.8861 0,-14.658 0,-25.4477 0,-1.0847 -0.688,-2.0165 -1.649,-2.381l0 27.6858 0 0.1428zm8.1168 -12.7099c0.6837,-0.291 1.1664,-0.9707 1.1664,-1.7575l0 -3.8172c0,-0.7868 -0.4827,-1.4665 -1.1664,-1.7575l0 7.3322zm1.1664 -1.7575l0 0z" />
                </symbol>

                <symbol id="relief-cactus-3-bw" viewBox="-50 -41 120 120">
                    <ellipse fill="#999999" opacity=".5" cx="11.8434" cy="27.4564" rx="10.1211" ry="1.1855" />
                    <path fill="#b3b3b3"
                        d="M22.2067 13.2778l-0.7113 0 -1.1706 0 0 4.5937c0,0.978 -0.8002,1.7782 -1.7783,1.7782l-5.3348 0 0 7.8067 -4.742 0 0 -7.5551 -3.6988 0c-0.978,0 -1.7783,-0.8002 -1.7783,-1.7783l0 0 0 -2.7652 -1.57 0 -0.7113 0c-0.0061,0 -0.0122,0 -0.0183,-0.0002 -0.0061,-0.0001 -0.0121,-0.0004 -0.0182,-0.0007 -0.006,-0.0003 -0.012,-0.0007 -0.018,-0.0011 -0.006,-0.0005 -0.012,-0.001 -0.018,-0.0017 -0.0059,-0.0006 -0.0118,-0.0012 -0.0178,-0.002 -0.0059,-0.0008 -0.0118,-0.0016 -0.0176,-0.0025 -0.0059,-0.0009 -0.0118,-0.0019 -0.0176,-0.0029l0 0c-0.0058,-0.0011 -0.0116,-0.0022 -0.0174,-0.0034 -0.0058,-0.0011 -0.0115,-0.0024 -0.0172,-0.0038l0 0c-0.0057,-0.0013 -0.0114,-0.0027 -0.0171,-0.0042l0 0c-0.0057,-0.0014 -0.0113,-0.0029 -0.0169,-0.0046l-0.0001 0c-0.0056,-0.0015 -0.0111,-0.0033 -0.0167,-0.005l0 0c-0.0056,-0.0017 -0.0111,-0.0035 -0.0166,-0.0054l-0.0164 -0.0058 0 0 -0.0162 -0.0062 -0.0161 -0.0066c-0.0053,-0.0022 -0.0106,-0.0046 -0.0158,-0.0069l0 0c-0.0053,-0.0024 -0.0105,-0.0049 -0.0157,-0.0074l-0.0154 -0.0077 -0.0152 -0.008c-0.0051,-0.0028 -0.0101,-0.0056 -0.015,-0.0085l-0.0148 -0.0087 0 0c-0.0049,-0.003 -0.0097,-0.006 -0.0146,-0.0091 -0.0048,-0.0031 -0.0095,-0.0063 -0.0143,-0.0095 -0.0047,-0.0032 -0.0094,-0.0064 -0.014,-0.0097l-0.0001 0c-0.0046,-0.0034 -0.0092,-0.0067 -0.0138,-0.0101l-0.0135 -0.0105 -0.0001 0c-0.0044,-0.0035 -0.0089,-0.0071 -0.0133,-0.0107l-0.013 -0.0111 0 0c-0.0043,-0.0037 -0.0086,-0.0075 -0.0128,-0.0113l-0.0125 -0.0117 0 0 -0.0122 -0.0119 -0.0001 0 -0.0119 -0.0122c-0.0039,-0.0041 -0.0078,-0.0083 -0.0116,-0.0125l-0.0001 0 -0.0113 -0.0128 -0.011 -0.0131 -0.0108 -0.0133c-0.0035,-0.0045 -0.007,-0.009 -0.0104,-0.0136l-0.0101 -0.0138c-0.0033,-0.0047 -0.0066,-0.0093 -0.0098,-0.0141 -0.0032,-0.0047 -0.0064,-0.0095 -0.0094,-0.0143l-0.0091 -0.0145c-0.003,-0.0049 -0.0059,-0.0099 -0.0088,-0.0148l-0.0084 -0.015c-0.0028,-0.0051 -0.0054,-0.0101 -0.0081,-0.0153l-0.0077 -0.0154c-0.0025,-0.0052 -0.0049,-0.0104 -0.0073,-0.0156 -0.0024,-0.0053 -0.0047,-0.0106 -0.007,-0.0159 -0.0023,-0.0053 -0.0044,-0.0106 -0.0065,-0.016 -0.0022,-0.0054 -0.0043,-0.0108 -0.0063,-0.0162l-0.0058 -0.0165c-0.0018,-0.0055 -0.0036,-0.011 -0.0054,-0.0165 -0.0017,-0.0056 -0.0034,-0.0112 -0.005,-0.0168l-0.0046 -0.0169c-0.0015,-0.0057 -0.0029,-0.0114 -0.0042,-0.0171 -0.0013,-0.0057 -0.0026,-0.0115 -0.0038,-0.0173 -0.0012,-0.0058 -0.0023,-0.0115 -0.0033,-0.0174 -0.0011,-0.0058 -0.0021,-0.0116 -0.003,-0.0175 -0.0009,-0.0059 -0.0017,-0.0118 -0.0025,-0.0177 -0.0007,-0.0059 -0.0014,-0.0118 -0.002,-0.0178 -0.0006,-0.006 -0.0012,-0.012 -0.0016,-0.0179 -0.0005,-0.006 -0.0009,-0.012 -0.0012,-0.0181 -0.0003,-0.006 -0.0005,-0.0121 -0.0007,-0.0182 -0.0001,-0.006 -0.0002,-0.0121 -0.0002,-0.0183l0 -0.7113 0 -1.9228c0,-0.3912 0.3201,-0.7113 0.7113,-0.7113l0 0c0.3912,0 0.7113,0.3201 0.7113,0.7113l0 1.9228 1.57 0 0 -4.0946c0,-0.978 0.8003,-1.7783 1.7783,-1.7783l0 0c0.978,0 1.7783,0.8003 1.7783,1.7783l0 6.5042 1.9205 0 0 -12.5985c0,-1.3041 1.0669,-2.3711 2.371,-2.3711l0 0c1.3041,0 2.371,1.067 2.371,2.3711l0 2.5355 1.9971 0 0 -1.9229c0,-0.3912 0.3202,-0.7113 0.7114,-0.7113l0 0c0.3912,0 0.7113,0.3201 0.7113,0.7113l0 1.9229 0 0.7113c0,0.0061 -0.0001,0.0122 -0.0003,0.0182 -0.0001,0.0061 -0.0003,0.0122 -0.0006,0.0182 -0.0004,0.0061 -0.0007,0.0121 -0.0012,0.0181 -0.0005,0.006 -0.001,0.0119 -0.0016,0.0179 -0.0006,0.006 -0.0013,0.0119 -0.0021,0.0178 -0.0007,0.0059 -0.0016,0.0118 -0.0025,0.0177 -0.0009,0.0059 -0.0018,0.0117 -0.0029,0.0176 -0.001,0.0058 -0.0021,0.0116 -0.0033,0.0173 -0.0012,0.0058 -0.0025,0.0116 -0.0038,0.0173 -0.0014,0.0057 -0.0028,0.0114 -0.0042,0.0171l-0.0046 0.0169c-0.0016,0.0056 -0.0033,0.0112 -0.0051,0.0168 -0.0017,0.0055 -0.0035,0.0111 -0.0054,0.0166l-0.0058 0.0164c-0.002,0.0054 -0.0041,0.0108 -0.0062,0.0162 -0.0021,0.0054 -0.0043,0.0107 -0.0065,0.016 -0.0023,0.0053 -0.0046,0.0107 -0.007,0.0159 -0.0024,0.0052 -0.0049,0.0104 -0.0073,0.0156l-0.0077 0.0155c-0.0027,0.0051 -0.0054,0.0102 -0.0081,0.0152l-0.0084 0.015c-0.0029,0.0049 -0.0058,0.0099 -0.0088,0.0148l-0.0091 0.0145c-0.0031,0.0048 -0.0062,0.0096 -0.0094,0.0143 -0.0032,0.0048 -0.0065,0.0095 -0.0098,0.0141l-0.0101 0.0138c-0.0034,0.0046 -0.0069,0.0091 -0.0104,0.0136l-0.0108 0.0133 -0.011 0.0131 -0.0114 0.0128 0 0c-0.0038,0.0042 -0.0077,0.0084 -0.0116,0.0125 -0.004,0.0041 -0.008,0.0082 -0.012,0.0122l-0.0122 0.012 0 0 -0.0125 0.0116c-0.0042,0.0039 -0.0085,0.0076 -0.0128,0.0114l0 0 -0.0131 0.011c-0.0044,0.0036 -0.0088,0.0072 -0.0133,0.0107l0 0 -0.0135 0.0105c-0.0046,0.0034 -0.0092,0.0068 -0.0139,0.0101l0 0c-0.0046,0.0033 -0.0093,0.0065 -0.014,0.0097 -0.0048,0.0032 -0.0096,0.0064 -0.0144,0.0095 -0.0048,0.0031 -0.0096,0.0061 -0.0145,0.0091l0 0 -0.0148 0.0088c-0.005,0.0028 -0.01,0.0056 -0.015,0.0084l-0.0152 0.008 -0.0155 0.0077c-0.0052,0.0026 -0.0103,0.005 -0.0156,0.0074l0 0 -0.0159 0.0069 -0.016 0.0066 -0.0162 0.0062 0 0 -0.0164 0.0058c-0.0055,0.0019 -0.011,0.0037 -0.0166,0.0054l0 0c-0.0056,0.0018 -0.0112,0.0035 -0.0168,0.0051l0 0c-0.0056,0.0016 -0.0112,0.0031 -0.0169,0.0046l0 0c-0.0057,0.0014 -0.0114,0.0028 -0.0171,0.0042l0 0c-0.0057,0.0013 -0.0115,0.0026 -0.0173,0.0038 -0.0057,0.0011 -0.0115,0.0023 -0.0173,0.0033l-0.0001 0c-0.0058,0.001 -0.0116,0.002 -0.0175,0.0029 -0.0059,0.0009 -0.0118,0.0018 -0.0177,0.0025 -0.0059,0.0008 -0.0118,0.0015 -0.0178,0.0021 -0.0059,0.0006 -0.0119,0.0011 -0.0179,0.0016 -0.006,0.0004 -0.012,0.0008 -0.0181,0.0011 -0.006,0.0003 -0.0121,0.0006 -0.0181,0.0007 -0.0061,0.0002 -0.0122,0.0003 -0.0183,0.0003l-0.7114 0 -1.9971 0 0 8.3888 3.5566 0 0 -1.6774 -1.9035 0c-0.3912,0 -0.7113,-0.32 -0.7113,-0.7113l0 -0.0226 0 -0.6887 0 -1.9454c0,-0.3912 0.3201,-0.7113 0.7113,-0.7113l0 0c0.3912,0 0.7114,0.3201 0.7114,0.7113l0 1.9454 1.1921 0 0 -1.8317c0,-0.978 0.8002,-1.7783 1.7782,-1.7783l0 0c0.9781,0 1.7783,0.8002 1.7783,1.7783l0 0.6936 1.1706 0 0 -1.9228c0,-0.3912 0.3201,-0.7113 0.7113,-0.7113l0 0c0.3912,0 0.7113,0.3201 0.7113,0.7113l0 1.9228 0 0.7113c0,0.0061 -0.0001,0.0123 -0.0002,0.0183 -0.0002,0.0061 -0.0004,0.0122 -0.0007,0.0182 -0.0003,0.0061 -0.0007,0.0121 -0.0012,0.0181 -0.0005,0.006 -0.001,0.012 -0.0016,0.0179 -0.0006,0.006 -0.0013,0.0119 -0.002,0.0178 -0.0008,0.0059 -0.0016,0.0118 -0.0025,0.0177 -0.0009,0.0059 -0.0019,0.0117 -0.003,0.0175 -0.001,0.0059 -0.0021,0.0116 -0.0033,0.0174 -0.0012,0.0058 -0.0025,0.0115 -0.0038,0.0173 -0.0013,0.0057 -0.0027,0.0114 -0.0042,0.0171 -0.0015,0.0056 -0.003,0.0113 -0.0046,0.0169l-0.005 0.0168c-0.0018,0.0055 -0.0036,0.011 -0.0054,0.0165 -0.0019,0.0056 -0.0039,0.011 -0.0058,0.0165 -0.002,0.0054 -0.0041,0.0108 -0.0063,0.0162l-0.0065 0.016 -0.007 0.0159c-0.0024,0.0052 -0.0048,0.0104 -0.0073,0.0156l-0.0077 0.0154 -0.0081 0.0153c-0.0027,0.005 -0.0055,0.01 -0.0084,0.015 -0.0029,0.0049 -0.0058,0.0099 -0.0088,0.0148 -0.0029,0.0049 -0.006,0.0097 -0.0091,0.0145 -0.003,0.0048 -0.0062,0.0096 -0.0094,0.0143 -0.0032,0.0048 -0.0065,0.0095 -0.0098,0.0141l-0.0101 0.0138c-0.0034,0.0046 -0.0069,0.0091 -0.0104,0.0136l-0.0108 0.0133c-0.0036,0.0044 -0.0073,0.0088 -0.011,0.0131 -0.0037,0.0043 -0.0075,0.0085 -0.0113,0.0128l-0.0001 0 -0.0116 0.0125 -0.0119 0.0122 -0.0001 0 -0.0122 0.0119 0 0 -0.0125 0.0117 -0.0128 0.0113 0 0c-0.0043,0.0038 -0.0086,0.0075 -0.013,0.0111l-0.0133 0.0107 -0.0001 0c-0.0044,0.0036 -0.0089,0.0071 -0.0135,0.0105 -0.0046,0.0034 -0.0092,0.0067 -0.0138,0.0101l-0.0001 0c-0.0046,0.0033 -0.0093,0.0065 -0.014,0.0097 -0.0048,0.0032 -0.0095,0.0064 -0.0143,0.0095 -0.0049,0.0031 -0.0097,0.0061 -0.0146,0.0091l0 0c-0.0049,0.003 -0.0098,0.0059 -0.0148,0.0087l-0.015 0.0085c-0.005,0.0027 -0.0101,0.0054 -0.0152,0.008l-0.0154 0.0077c-0.0052,0.0025 -0.0104,0.005 -0.0157,0.0074l0 0c-0.0053,0.0024 -0.0105,0.0047 -0.0158,0.0069 -0.0053,0.0023 -0.0107,0.0045 -0.0161,0.0066 -0.0053,0.0021 -0.0107,0.0042 -0.0162,0.0062l0 0 -0.0164 0.0058c-0.0055,0.0019 -0.011,0.0037 -0.0166,0.0054l0 0c-0.0056,0.0018 -0.0111,0.0034 -0.0167,0.0051l-0.0001 0 -0.0169 0.0046 0 0c-0.0057,0.0014 -0.0114,0.0028 -0.0171,0.0041l0 0c-0.0057,0.0014 -0.0114,0.0027 -0.0172,0.0038 -0.0058,0.0012 -0.0116,0.0023 -0.0174,0.0034l0 0c-0.0059,0.0011 -0.0117,0.002 -0.0176,0.0029 -0.0058,0.0009 -0.0117,0.0018 -0.0176,0.0025 -0.0059,0.0008 -0.0119,0.0014 -0.0178,0.0021 -0.006,0.0006 -0.012,0.0011 -0.018,0.0016 -0.006,0.0004 -0.012,0.0008 -0.018,0.0011 -0.0061,0.0003 -0.0122,0.0005 -0.0182,0.0007 -0.0061,0.0002 -0.0122,0.0003 -0.0183,0.0003zm-1.8819 4.5937l0 0z" />
                    <polygon fill="#5c5c70"
                        points="10.8407,0 10.6079,0.8065 9.4329,0.1579 10.1939,1.6775 11.4875,1.6775 12.2485,0.1579 11.0735,0.8065" />
                    <path fill="#999999"
                        d="M20.3248 13.2778l0 1.8688 0 2.7249c0,0.8014 -0.5374,1.4832 -1.2696,1.7034l0 -3.8992 0 -0.5291 0 -5.6886c0.7322,0.2202 1.2696,0.902 1.2696,1.7035l0 0.6936 0 1.4227zm-7.1131 6.3719l0 2.7286 0 5.0781 -1.5649 0 0 -25.9392c0.9104,0.3318 1.5649,1.2077 1.5649,2.2291l0 2.5355 0 1.4226 0 0.3866 0 6.9671 0 1.0351 0 3.5565zm2.7126 -16.0021c0.3893,0.0022 0.7072,0.3215 0.7072,0.7113l0 1.9229 0 0.7113c0,0.0061 -0.0001,0.0122 -0.0003,0.0182 -0.0001,0.0061 -0.0003,0.0122 -0.0006,0.0182 -0.0004,0.0061 -0.0007,0.0121 -0.0012,0.0181 -0.0005,0.006 -0.001,0.0119 -0.0016,0.0179 -0.0006,0.006 -0.0013,0.0119 -0.0021,0.0178 -0.0007,0.0059 -0.0016,0.0118 -0.0025,0.0177 -0.0009,0.0059 -0.0018,0.0117 -0.0029,0.0176 -0.001,0.0058 -0.0021,0.0116 -0.0033,0.0173 -0.0012,0.0058 -0.0025,0.0116 -0.0038,0.0173 -0.0014,0.0057 -0.0028,0.0114 -0.0042,0.0171l-0.0046 0.0169c-0.0016,0.0056 -0.0033,0.0112 -0.0051,0.0168 -0.0017,0.0055 -0.0035,0.0111 -0.0054,0.0166l-0.0058 0.0164c-0.002,0.0054 -0.0041,0.0108 -0.0062,0.0162 -0.0021,0.0054 -0.0043,0.0107 -0.0065,0.016 -0.0023,0.0053 -0.0046,0.0107 -0.007,0.0159 -0.0024,0.0052 -0.0049,0.0104 -0.0073,0.0156l-0.0077 0.0155c-0.0027,0.0051 -0.0054,0.0102 -0.0081,0.0152l-0.0084 0.015c-0.0029,0.0049 -0.0058,0.0099 -0.0088,0.0148l-0.0091 0.0145c-0.0031,0.0048 -0.0062,0.0096 -0.0094,0.0143 -0.0032,0.0048 -0.0065,0.0095 -0.0098,0.0141l-0.0101 0.0138c-0.0034,0.0046 -0.0069,0.0091 -0.0104,0.0136l-0.0108 0.0133 -0.011 0.0131 -0.0114 0.0128 0 0c-0.0038,0.0042 -0.0077,0.0084 -0.0116,0.0125 -0.004,0.0041 -0.008,0.0082 -0.012,0.0122l-0.0122 0.012 0 0 -0.0125 0.0116c-0.0042,0.0039 -0.0085,0.0076 -0.0128,0.0114l0 0 -0.0131 0.011c-0.0044,0.0036 -0.0088,0.0072 -0.0133,0.0107l0 0 -0.0135 0.0105c-0.0046,0.0034 -0.0092,0.0068 -0.0139,0.0101l0 0c-0.0046,0.0033 -0.0093,0.0065 -0.014,0.0097 -0.0048,0.0032 -0.0096,0.0064 -0.0144,0.0095 -0.0048,0.0031 -0.0096,0.0061 -0.0145,0.0091l0 0 -0.0148 0.0088c-0.005,0.0028 -0.01,0.0056 -0.015,0.0084l-0.0152 0.008 -0.0155 0.0077c-0.0052,0.0026 -0.0103,0.005 -0.0156,0.0074l0 0 -0.0159 0.0069 -0.016 0.0066 -0.0162 0.0062 0 0 -0.0164 0.0058c-0.0055,0.0019 -0.011,0.0037 -0.0166,0.0054l0 0c-0.0056,0.0018 -0.0112,0.0035 -0.0168,0.0051l0 0c-0.0056,0.0016 -0.0112,0.0031 -0.0169,0.0046l0 0c-0.0057,0.0014 -0.0114,0.0028 -0.0171,0.0042l0 0c-0.0057,0.0013 -0.0115,0.0026 -0.0173,0.0038 -0.0057,0.0011 -0.0115,0.0023 -0.0173,0.0033l-0.0001 0c-0.0058,0.001 -0.0116,0.002 -0.0175,0.0029 -0.0059,0.0009 -0.0118,0.0018 -0.0177,0.0025 -0.0059,0.0008 -0.0118,0.0015 -0.0178,0.0021 -0.0059,0.0006 -0.0119,0.0011 -0.0179,0.0016 -0.006,0.0004 -0.012,0.0008 -0.0181,0.0011 -0.006,0.0003 -0.0121,0.0006 -0.0181,0.0007l-0.0142 0.0003 0 -4.0568zm-0.3481 10.7682l-0.7114 0 0 -4.0793 0 0c0.3912,0 0.7114,0.3201 0.7114,0.7113l0 1.9454 0 1.4226zm6.8745 -5.1515c0.272,0.1001 0.4673,0.3624 0.4673,0.668l0 1.9228 0 0.7113c0,0.0061 -0.0001,0.0123 -0.0002,0.0183 -0.0002,0.0061 -0.0004,0.0122 -0.0007,0.0182 -0.0003,0.0061 -0.0007,0.0121 -0.0012,0.0181 -0.0005,0.006 -0.001,0.012 -0.0016,0.0179 -0.0006,0.006 -0.0013,0.0119 -0.002,0.0178 -0.0008,0.0059 -0.0016,0.0118 -0.0025,0.0177 -0.0009,0.0059 -0.0019,0.0117 -0.003,0.0175 -0.001,0.0059 -0.0021,0.0116 -0.0033,0.0174 -0.0012,0.0058 -0.0025,0.0115 -0.0038,0.0173 -0.0013,0.0057 -0.0027,0.0114 -0.0042,0.0171 -0.0015,0.0056 -0.003,0.0113 -0.0046,0.0169l-0.005 0.0168c-0.0018,0.0055 -0.0036,0.011 -0.0054,0.0165 -0.0019,0.0056 -0.0039,0.011 -0.0058,0.0165 -0.002,0.0054 -0.0041,0.0108 -0.0063,0.0162l-0.0065 0.016 -0.007 0.0159c-0.0024,0.0052 -0.0048,0.0104 -0.0073,0.0156l-0.0077 0.0154 -0.0081 0.0153c-0.0027,0.005 -0.0055,0.01 -0.0084,0.015 -0.0029,0.0049 -0.0058,0.0099 -0.0088,0.0148 -0.0029,0.0049 -0.006,0.0097 -0.0091,0.0145 -0.003,0.0048 -0.0062,0.0096 -0.0094,0.0143 -0.0032,0.0048 -0.0065,0.0095 -0.0098,0.0141l-0.0101 0.0138c-0.0034,0.0046 -0.0069,0.0091 -0.0104,0.0136l-0.0108 0.0133c-0.0036,0.0044 -0.0073,0.0088 -0.011,0.0131 -0.0037,0.0043 -0.0075,0.0085 -0.0113,0.0128l-0.0001 0 -0.0116 0.0125 -0.0119 0.0122 -0.0001 0 -0.0122 0.0119 0 0 -0.0125 0.0117 -0.0128 0.0113 0 0c-0.0043,0.0038 -0.0086,0.0075 -0.013,0.0111l-0.0133 0.0107 -0.0001 0c-0.0044,0.0036 -0.0089,0.0071 -0.0135,0.0105 -0.0046,0.0034 -0.0092,0.0067 -0.0138,0.0101l-0.0001 0c-0.0046,0.0033 -0.0093,0.0065 -0.014,0.0097 -0.0048,0.0032 -0.0095,0.0064 -0.0143,0.0095 -0.0049,0.0031 -0.0097,0.0061 -0.0146,0.0091l0 0c-0.0049,0.003 -0.0098,0.0059 -0.0148,0.0087l-0.015 0.0085c-0.005,0.0027 -0.0101,0.0054 -0.0152,0.008l-0.0154 0.0077c-0.0052,0.0025 -0.0104,0.005 -0.0157,0.0074l0 0c-0.0053,0.0024 -0.0105,0.0047 -0.0158,0.0069 -0.0053,0.0023 -0.0107,0.0045 -0.0161,0.0066l-0.0161 0.0062 0 -3.9701zm-15.9015 10.637l-0.9878 0 0 -11.6523c0.5842,0.2923 0.9878,0.8971 0.9878,1.5916l0 3.7623 0 2.7419 0 3.5565zm-5.1266 -4.5435l-0.3812 0 0 -3.9749c0.2262,0.1194 0.3812,0.3573 0.3812,0.6295l0 1.2818 0 0.641 0 1.4226zm18.9022 2.5137l0 0z" />
                </symbol>

                <symbol id="relief-deadTree-1-bw" viewBox="-10 -9 30 30">
                    <ellipse fill="#999999" opacity=".5" cx="6.0917" cy="7.5182" rx="2.8932" ry=".3408" />
                    <path fill="#b3b3b3"
                        d="M3.5153 1.3458c0.2543,-0.0013 0.7916,0.129 0.6583,0.3396 -0.0857,0.1354 -0.6435,1.074 -0.6404,1.114 0.0042,0.0531 0.341,0.6425 0.3357,1.0671 -0.005,0.4 -0.4393,0.5902 -0.7445,0.6156l-0.1526 -0.7164 -0.8522 -0.3727c0.1354,-0.828 0.3493,-0.4466 -0.2112,-1.4572 -0.1448,-0.261 0.2666,-0.5992 0.4246,-0.6946l-0.2495 0.0682 0.2497 -0.3491c-0.0387,0.0257 -0.0763,0.0603 -0.12,0.0839l0.0471 -0.2236 -0.4834 0.8931c-0.0975,0.1868 -0.1224,0.1338 0.005,0.2843 0.4911,0.5805 0.3652,0.7545 0.1577,1.3533l-0.57 -0.258c-0.0654,-0.3528 -0.0606,-0.8702 -0.2831,-1.0414 -0.1952,-0.1502 -0.2072,-0.1461 -0.1229,-0.535 0.0474,-0.2188 0.2619,-0.2628 0.4506,-0.4999 -0.2195,0.1614 -0.4687,0.2928 -0.4917,0.4311 -0.126,0.7587 -0.2153,0.3823 -0.9225,0.3141l0.5598 0.2152 -0.2753 0.1191c0.4778,-0.0459 1.0244,-0.3067 0.9364,1.1042l1.422 0.566c0.2198,0.0889 0.16,0.0419 0.2147,0.2873 0.0473,0.2124 0.2648,1.1447 0.2621,1.2321 0.0348,0.1295 1.1372,1.5251 1.0567,1.6851l-0.6487 0.534c0.2003,0.0023 0.3874,0.0799 0.5356,0.2115 0.321,-0.1964 0.6523,-0.1739 0.933,0.0841 0.0279,-0.0963 -0.0348,-0.2065 0.1893,-0.1382 -0.0511,-0.1825 0.0636,-0.3019 0.3652,-0.2167l-0.5587 -0.6647c-0.335,-0.4654 0.0657,-0.5361 0.3232,-0.8874 0.3199,-0.4366 0.4947,-1.3297 0.9872,-1.2478 0.166,0.0276 0.544,0.3328 0.6681,0.3902 -0.0526,-0.0727 -0.3251,-0.2763 -0.3757,-0.3471 1.1234,-0.3172 0.6664,-0.9833 1.0576,-1.1403 0.3553,-0.1426 0.4178,-0.1125 0.7358,0.0071 -0.0447,-0.0408 -0.1272,-0.083 -0.1599,-0.1386 0.0608,-0.1125 0.1637,-0.2309 0.2168,-0.3457 -0.4288,0.3352 0.1565,0.1887 -0.9798,0.3409 -0.076,0.1367 -0.2062,0.5445 -0.2709,0.7293 -0.0474,0.1354 -0.4617,0.3359 -0.5939,0.4082l-0.5365 -0.0954 0.4903 -0.4019c-0.7228,0.343 -0.6671,0.5239 -1.2151,1.3647 -0.1089,0.1629 -0.0654,0.1629 -0.2597,0.2666 -0.1824,0.0973 -0.5098,0.2844 -0.6886,0.3561 -0.0734,-0.0726 -0.3395,-0.5036 -0.3932,-0.5868 -0.1102,-0.1707 -0.1243,-0.1282 -0.0443,-0.3189 0.4751,-1.1814 0.3432,-0.7881 0.0867,-1.6479 -0.1573,-0.5272 0.5708,0.047 0.89,0.1609 -0.1139,-0.1055 -0.9469,-0.6786 -0.9647,-0.7257 -0.0096,-0.0255 0.0803,-0.5765 0.4293,-0.6942 0.2215,-0.0746 0.7565,-0.1045 0.9396,0.0794 0.0928,0.0932 0.1646,0.2261 0.2324,0.3401l-0.1008 -0.3823c0.5352,-0.1142 0.5229,-0.3132 1.2351,-0.1707 0.3041,0.0609 0.9743,0.2752 1.2277,0.2822l-0.1733 -0.1642 0.2597 -0.0104 -0.2894 -0.0697 0.3033 -0.1079c-0.3524,-0.0086 -0.4157,0.1266 -0.8613,0.037 -0.1587,-0.0319 -0.7112,-0.1209 -0.823,-0.1706l0.8073 -0.3358c0.0347,-0.1549 -0.0285,-0.6678 0.0729,-0.7688 0.104,-0.1035 0.4286,0.0056 0.7823,-0.0293 -0.6035,-0.1089 -0.758,-0.0385 -0.201,-0.6082 0.0264,-0.027 0.106,-0.1209 0.1223,-0.1483l-0.7942 0.7068c-0.1806,0.835 0.0273,0.6738 -0.5709,0.9316 -0.3515,0.1515 -0.684,0.3171 -1.0625,0.4386 -0.2353,0.0756 -1.005,-0.0716 -1.2564,-0.1546 0.1802,-0.3685 0.3858,-0.7438 0.5712,-1.1089 0.0411,-0.0808 0.394,-0.3205 0.7318,-0.2844l0.1679 0.0147c-0.041,-0.0393 -0.097,-0.0652 -0.1266,-0.1087l0.1758 -0.0375 -0.1404 -0.0163c0.0637,-0.0888 0.1594,-0.1402 0.2279,-0.2235l-0.9849 0.4772c-0.1089,0.0534 -0.4306,0.5672 -0.5266,0.6922 -0.1802,0.2202 -0.5124,-0.2033 -0.7609,-0.3405l0.2762 0.3034c-0.1828,-0.0025 -0.4046,-0.0156 -0.5464,0.0752l0.2056 -0.0195z" />
                    <path fill="#999999"
                        d="M4.3375 7.6026l0.2401 -0.5118c0.0457,-0.0936 -0.0794,-0.2034 -0.1891,-0.3729 -0.0782,-0.121 -0.1611,-0.2395 -0.2481,-0.3677l-0.7328 -1.0888c-0.0268,-0.06 -0.1063,-0.4167 -0.1183,-0.4971 0.0936,-0.0606 0.1753,-0.082 0.3393,-0.197 0.1022,-0.0717 0.2115,-0.1589 0.2639,-0.2777 0.1007,-0.2281 0.0424,-0.7261 -0.0353,-0.9525 -0.0455,-0.1327 -0.093,-0.2647 -0.1366,-0.4022 -0.0524,-0.1652 -0.0621,-0.0948 0.0823,-0.3767 0.0557,-0.1089 0.35,-0.6707 0.3658,-0.7401 -0.0687,0.0461 -0.4823,0.7693 -0.5446,0.8713 -0.0548,0.0896 -0.0792,0.0842 -0.0263,0.1979 0.1713,0.3682 0.4361,0.9622 0.1819,1.2915 -0.1916,0.2482 -0.4358,0.3122 -0.7357,0.388l-0.1851 -0.6512c-0.0024,0.1012 0.2128,1.0065 0.2534,1.1899 0.0276,0.1246 0.026,0.1801 0.0921,0.2672 0.0555,0.0732 0.1032,0.1447 0.1557,0.2167 0.1043,0.1427 0.2011,0.2764 0.3071,0.4238 0.0998,0.1386 0.1978,0.2817 0.2931,0.4252 0.4653,0.6996 0.2999,0.6121 -0.3393,1.0732 0.1665,0.0216 0.3185,0.095 0.4423,0.2048 0.081,-0.0363 0.1852,-0.101 0.2742,-0.1139z" />
                </symbol>

                <symbol id="relief-deadTree-2-bw" viewBox="-10 -9 30 30">
                    <ellipse fill="#999999" opacity=".5" cx="5.5691" cy="9.506" rx="4.825" ry=".5684" />
                    <path fill="#b3b3b3"
                        d="M1.679 3.5305l-0.5914 -0.2423c0.2049,0.3227 0.8568,0.3529 0.9257,1.1466 0.0188,0.2166 0.0334,0.2874 0.0274,0.2877l-0.0627 0.003c-0.1741,-0.114 -0.0803,-0.0814 -0.125,-0.5035l-0.149 0.4333c-0.884,-0.1024 -1.1345,-0.9856 -1.522,-1.157 0.0945,0.4164 0.1069,0.1444 0.3065,0.5819 0.1329,0.2913 0.1234,0.3803 0.3235,0.5433 -0.3018,-0.0152 -0.2722,-0.2108 -0.7765,-0.1333l0.8518 0.3089c0.3411,0.0711 0.4473,0.3096 0.8873,0.4034 0.7297,0.1555 0.8304,0.9419 0.8039,1.9517 -1.2559,0.0858 -1.1471,-1.4021 -1.1869,-1.4946l-0.0817 -0.1897 -0.0372 0.8722c-0.1953,-0.0862 -0.4195,-0.0759 -0.6206,-0.204 -0.3275,-0.2086 -0.1479,-0.3863 -0.4882,-0.4596 0.0371,0.5904 0.7744,0.7122 1.0801,1.012 0.2091,0.2051 0.2487,0.4467 0.4605,0.6561 0.1976,0.1955 0.3922,0.1808 0.5932,0.3942 -0.2392,0.1554 -0.2456,0.0512 -0.4157,0.2941 0.2789,0.2135 0.6512,-0.3638 0.6968,0.3659l-0.0753 0.1314 0.0057 0.3037c-0.0765,0.082 -0.1103,0.0108 -0.2853,-0.0638l0.1248 0.4129c-0.2614,0.0823 -0.2086,0.0986 -0.4283,0.26 -0.0687,-0.1591 -0.0574,-0.341 -0.0575,-0.3416 -0.1973,0.1955 -0.041,0.0251 -0.1724,0.3157l-0.2807 0.0375 -0.2353 0.172c0.0166,0.0305 0.0231,0.0503 0.0259,0.0641 0.5892,-0.1981 1.3769,-0.2863 2.2319,-0.2183 0.517,0.0411 1.0007,0.1347 1.4241,0.266 -0.2093,-0.1379 -0.4154,-0.3068 -0.6089,-0.2809 0.3384,-0.0334 0.557,0.1266 0.7762,-0.0291 -0.0116,-0.0171 -0.0336,-0.0585 -0.0414,-0.04 -0.2183,-0.1297 -0.1296,-0.0991 -0.3828,-0.1369 -0.8341,-0.0913 -1.0623,-1.1991 -0.6846,-2.1715 0.1148,-0.2957 0.15,-0.1675 0.1954,-0.3631 0.7256,-0.0816 1.4521,0.6923 1.8913,-0.18 -0.32,-0.0118 -0.3601,0.198 -0.7796,0.1439 -0.2875,-0.037 -0.5949,-0.1322 -0.7655,-0.3165 1.2886,-0.6494 1.0806,-0.8912 1.489,-1.4573 0.2383,-0.3304 0.3236,-0.1176 0.4895,-0.5992 -0.3842,0.0962 -0.668,0.5411 -0.923,0.8001 0.0294,-0.8219 0.5645,-1.0809 0.2601,-1.7852 -0.1194,0.3583 0.0793,0.3008 -0.2716,0.9492 -0.1488,0.2751 -0.2304,0.6341 -0.3535,0.8937 -0.1749,0.369 -1.0145,0.7821 -1.3429,0.6432 -0.2625,-1.5704 1.2608,-1.4244 1.7171,-2.9858 0.1082,-0.3703 -0.0046,-0.34 0.2521,-0.4762 -0.2374,-0.2138 -0.1318,0.1284 -0.1516,-0.3055 0.4125,-0.5937 0.4463,-0.2996 0.6287,-0.9535l0.1667 -0.4867c-0.3642,0.1212 -0.1886,0.2262 -0.3853,0.5867 -0.0991,0.1815 -0.2777,0.3195 -0.4897,0.3478 -0.1484,-0.1486 -0.3404,-0.415 -0.4219,-0.6144 -0.1726,-0.4224 -0.0332,-0.515 0.0165,-0.9229 -0.2513,0.1258 -0.2673,0.4884 -0.2032,0.8657 0.0777,0.4568 0.259,0.4728 0.3536,0.7365 0.2036,0.5674 -0.1231,1.5803 -0.4923,1.669 -0.2599,-0.6178 -0.1389,-0.5099 -0.0559,-1.1514 -0.3962,0.467 -0.0305,1.0251 -0.1346,1.3145 -0.1475,0.182 -0.526,0.4221 -0.7103,0.5992 -0.1897,0.1821 -0.1458,0.1848 -0.2987,0.3948 -0.1358,0.1867 -0.1887,0.203 -0.3348,0.4176 -0.1315,-0.6385 -0.4597,-1.0413 -0.7405,-1.3874 0.2,-0.2285 0.2784,-0.3478 0.6312,-0.4772 0.3178,-0.1166 0.5361,-0.1513 0.5389,-0.5903 -0.212,0.0746 -0.2207,0.3469 -0.6704,0.4752 0.0799,-0.2322 0.0813,-0.1298 0.1373,-0.4444 -0.2906,0.3241 -0.0801,0.3381 -0.3802,0.514 -0.1557,0.0913 -0.33,0.1116 -0.4702,0.2076 -0.1232,-0.402 -0.1303,-0.3989 -0.0658,-0.8723l0.1533 -0.2038c0.1132,-0.1545 0.1626,-0.2402 0.3489,-0.3217 0.3073,-0.1346 0.5114,-0.0923 0.5563,-0.4919 -0.2809,0.1498 -0.387,0.2416 -0.7518,0.3749 -0.3568,0.1303 -0.4097,0.3449 -0.7091,0.4842 -0.114,-0.3646 -0.271,-0.3342 -0.3815,-0.786 -0.1449,-0.5926 -0.0026,-0.7687 0.0853,-1.1817 -0.3132,0.2088 -0.3149,0.4188 -0.3345,0.9648 -0.4693,0.0005 -0.4863,-0.8063 -0.5087,-1.0178l-0.1143 0.5467c-0.2289,-0.099 -0.3561,-0.1846 -0.5848,-0.0251 0.1017,0.0842 0.7571,0.2068 1.1046,1.029 0.3769,0.8922 0.686,0.9642 0.5744,1.8877z" />
                    <path fill="#999999"
                        d="M4.8565 9.7405c-0.2093,-0.1378 -0.4153,-0.3069 -0.6089,-0.2811 0.3383,-0.0334 0.5569,0.1266 0.7761,-0.0291 -0.0116,-0.0171 -0.0336,-0.0585 -0.0414,-0.04 -0.2183,-0.1297 -0.1296,-0.0991 -0.3827,-0.1369 -0.8341,-0.0913 -1.0624,-1.1991 -0.6847,-2.1715 0.1148,-0.2957 0.1501,-0.1675 0.1954,-0.3631 -0.0467,-0.123 0.0439,-0.1513 -0.2166,-0.132 -0.4837,0.0358 -0.4335,0.3011 -0.4749,0.451 -0.043,0.1554 -0.3572,0.7239 -0.3816,1.4623 -0.011,0.3289 0.0331,0.246 -0.0081,0.6595 -0.0107,0.1082 -0.031,0.2048 -0.0477,0.2933 0.0721,0.0012 0.1448,0.0035 0.218,0.007 -0.0003,-0.4729 -0.0122,-1.0018 0.0855,-1.2875 0.1016,-0.2975 -0.0153,-0.1074 0.1875,-0.3203 0,0.6477 -0.0814,1.158 -0.139,1.6153l0.0989 0.0072c0.5171,0.0411 1.0008,0.1346 1.4242,0.2661z" />
                </symbol>

                <symbol id="relief-mount-2" viewBox="-5 -5 50 50">
                    <polygon fill="#96989A" stroke="#96989A" stroke-width=".2"
                        points="23.2198,13.2844 25.0296,15.5958 25.7023,16.6348 26.9007,17.3503 27.6924,18.8671 28.6339,19.544 29.6416,21.2874 30.1793,22.9204 30.7341,23.1774 31.5491,24.0589 31.9489,25.0324 32.4734,26.4994 33.8428,27.4678 34.673,28.5353 34.8847,28.7856 34.8285,28.9234 29.5625,31.5852 22.3428,32.6 17.9672,32.2587 6.7332,31.3779 4.2787,30.6699 0.3152,28.4746 6.2326,22.923 6.8631,18.7876 8.5478,17.0127 9.4447,14.5301 10.1033,13.4603 10.0987,12.7193 10.3459,12.4623 10.8502,12.3291 11.2616,9.4996 12.2382,9.5462 12.8014,9.7331 13.2941,9.6207 13.6109,9.8041 14.1481,9.9827 15.2052,7.9497 15.8578,7.6333 16.1761,6.4592 16.6967,5.5584 17.9672,2.6 19.2707,4.5745 23.008,12.5807 " />
                    <polygon fill="#BDBFC1"
                        points="23.2198,13.2844 25.0296,15.5958 25.7023,16.6348 26.9007,17.3503 27.6924,18.8671 28.6339,19.544 29.6416,21.2874 30.1793,22.9204 30.7341,23.1774 31.5491,24.0589 31.9489,25.0324 32.4734,26.4994 33.8428,27.4678 34.673,28.5353 34.8847,28.7856 34.8285,28.9234 29.5625,31.5852 22.3428,32.6 12.2198,31.8104 6.7332,31.3779 4.2787,30.6699 0.3152,28.4746 6.2326,22.923 6.8631,18.7876 8.5478,17.0127 9.4447,14.5301 9.6678,14.1183 10.1033,13.4603 10.0987,12.7193 10.3459,12.4623 10.8502,12.3291 10.9552,11.4205 11.2616,9.4996 13.6805,10.8818 15.2052,7.9497 15.8578,7.6333 16.1761,6.4592 16.6967,5.5584 17.9672,2.6 19.2707,4.5745 23.008,12.5807 " />
                    <polygon fill="#a8a8a8"
                        points="13.4787,27.0815 15.3508,21.8824 18.3111,15.2733 25.171,25.3682 21.3156,32.1469" />
                    <polygon fill="#999999"
                        points="23.2198,13.2844 25.0296,15.5958 25.7023,16.6348 26.9007,17.3503 27.6924,18.8671 28.6339,19.544 29.6416,21.2874 30.1793,22.9204 30.7341,23.1774 31.5491,24.0589 31.9489,25.0324 32.4734,26.4994 33.8428,27.4678 34.673,28.5353 34.8847,28.7856 34.8285,28.9234 29.5625,31.5852 22.3428,32.6 17.9672,32.2587 21.0737,27.7521 21.7612,26.7547 21.895,24.2875 20.5482,19.4183 18.3111,15.2733 19.9099,12.3973 17.9672,2.6 19.2707,4.5745 23.008,12.5807 " />
                    <polygon fill="#a8a8a8"
                        points="18.2474,32.2806 6.7332,31.3779 13.2414,24.6909 15.3508,21.8824 18.5651,27.4046 20.2242,29.0369" />
                </symbol>

                <symbol id="relief-mount-3" viewBox="-5 -3 45 45">
                    <polygon fill="#96989A" stroke="#96989A" stroke-width=".2"
                        points="25.3915,13.976 26.9002,15.9029 27.4611,16.769 28.4601,17.3655 29.12,18.63 29.9049,19.1943 30.745,20.6477 31.1932,22.0089 31.6557,22.2232 32.3351,22.9581 32.6684,23.7696 33.1056,24.9927 34.2473,25.7998 34.9393,26.6898 35.1158,26.8985 35.0689,27.0133 30.679,29.2324 24.6604,30.0782 21.0127,29.7937 14.3249,29.2694 12.5343,29.5211 10.0779,29.3295 3.7712,28.8351 2.3933,28.4376 0.1682,27.2051 3.4902,24.0885 3.8441,21.7669 4.7899,20.7706 5.6813,18.303 7.6713,17.3287 10.0779,12.6794 10.8097,13.7878 12.616,17.6576 13.1603,17.0841 13.8282,12.5327 14.8701,12.8548 15.3517,12.6401 16.0651,11.1879 16.9674,11.3732 17.4851,11.2365 17.793,11.2992 21.0127,5.069 22.0994,6.7151 25.2149,13.3894 " />
                    <polygon fill="#BDBFC1"
                        points="25.3915,13.976 26.9002,15.9029 27.4611,16.769 28.4601,17.3655 29.12,18.63 29.9049,19.1943 30.745,20.6477 31.1932,22.0089 31.6557,22.2232 32.3351,22.9581 32.6684,23.7696 33.1056,24.9927 34.2473,25.7998 34.9393,26.6898 35.1158,26.8985 35.0689,27.0133 30.679,29.2324 24.6604,30.0782 16.2214,29.42 14.3198,29.2701 12.5343,29.5211 6.8513,29.0778 3.7712,28.8351 2.3933,28.4376 0.1682,27.2051 3.4902,24.0885 3.8441,21.7669 4.7899,20.7706 5.6813,18.303 7.6713,17.3287 8.6899,15.3886 10.0779,12.6794 10.8097,13.7878 12.616,17.6576 13.1603,17.0841 13.8282,12.5327 14.983,13.3907 16.0651,11.1879 17.4391,11.9731 18.9517,9.0921 21.0127,5.069 22.0994,6.7151 25.2149,13.3894 " />
                    <path fill="#999999"
                        d="M13.0266 18.6774l1.0161 1.2977 0.3775 0.5832 0.6729 0.4017 0.4443 0.8515 0.5286 0.38 0.5657 0.9788 1.365 -0.2171 0.852 0.9077 0.8012 0.7006 1.0769 -0.4987 0.587 0.888 1.3143 1.1862 1.6837 -1.1473 -3.2991 4.8038 -6.6879 -0.5243 -1.7906 0.2516 -2.4564 -0.1915 1.7439 -2.53 0.386 -0.56 0.0751 -1.3851 -0.756 -2.7335 -1.2559 -2.3269 0.8975 -1.6146 -1.0906 -5.5001 0.7318 1.1084 2.098 4.4946 0.1189 0.395zm12.3648 -4.7014l1.5087 1.9269 0.5609 0.8661 0.999 0.5965 0.6599 1.2645 0.7849 0.5643 0.8401 1.4534 0.4482 1.3613 0.4625 0.2143 0.6794 0.7349 0.3333 0.8115 0.4371 1.2231 1.1417 0.8072 0.6921 0.89 0.1764 0.2087 -0.0468 0.1148 -4.3899 2.2191 -6.0187 0.8458 -3.6476 -0.2845 2.5896 -3.7569 0.5732 -0.8316 0.1114 -2.0567 -1.1227 -4.0591 -1.8649 -3.4554 1.3328 -2.3976 -1.6195 -8.1675 1.0867 1.6461 3.1155 6.6743 0.1765 0.5866z" />
                </symbol>

                <symbol id="relief-mount-4" viewBox="-5 -15 50 50">
                    <polygon fill="#96989A" stroke="#96989A" stroke-width=".2"
                        points="35.1337,17.58 34.122,18.8623 31.5268,19.3968 28.6951,19.562 25.2025,19.4911 22.0686,19.053 19.2643,20.1212 14.8201,19.849 10.9897,18.983 7.7168,18.0396 4.4391,18.4829 1.598,17.8161 0.2005,16.9864 5.3775,14.1114 6.9445,13.6145 9.7551,10.1143 10.7985,9.9008 11.1418,9.0682 12.5645,7.9945 13.6885,4.6225 17.0605,0.1265 19.3086,1.2504 19.5301,1.868 20.0211,2.0967 20.0211,2.0967 22.6805,4.6225 22.7195,6.0067 23.6307,6.3628 25.5645,8.9605 27.9106,10.6515 27.912,11.4444 28.1901,12.0933 29.0346,11.8883 29.8293,12.2096" />
                    <polygon fill="#BDBFC1"
                        points="35.1337,17.58 34.122,18.8623 31.5268,19.3968 28.6951,19.562 25.2025,19.4911 22.0686,19.053 19.2643,20.1212 14.8201,19.849 10.9897,18.983 7.7168,18.0396 4.4391,18.4829 1.598,17.8161 0.2005,16.9864 5.3775,14.1114 6.9445,13.6145 9.7551,10.1143 10.6513,10.2579 11.1418,9.0682 12.5645,7.9945 13.6885,4.6225 17.0605,0.1265 19.3086,1.2504 19.8426,2.7391 20.0211,2.0967 22.6805,4.6225 22.7409,6.7655 25.5645,8.9605 27.9106,10.6515 27.6061,13.0536 29.9394,12.3212" />
                    <path fill="#999999"
                        d="M17.6643 2.2612l-0.3434 1.3675 0.2294 0.1158 -0.1215 0.4558 0.0287 0.4166 0.2487 -0.7253 0.0199 0.7745 0.1926 0.9377 -0.9604 1.4775 -0.6513 0.6353 1.7115 -0.7977 0.1556 -0.7421 0.4118 1.3885 1.1335 1.9731 0.7278 1.7545 -0.2079 1.6338 0.7769 0.6722 0.3099 1.1103 0.7775 0.5155 -0.6186 2.4264 0.5834 1.4019 3.1339 0.4381 3.4927 0.0709 2.8316 -0.1651 2.5952 -0.5346 1.0117 -1.2823 -5.3044 -5.3703c-0.2875,-0.1214 -0.5799,-0.2431 -0.8727,-0.3502l-0.3389 0.6201 -0.3658 -0.0155 -0.0618 -0.3708 -0.2782 -0.6489 -0.0014 -0.7929 -2.346 -1.6911 -1.9339 -2.5976 -0.5212 0.0497 -0.3686 0.3529 -0.0604 -2.143 -2.6594 -2.5258 -0.1784 0.6424 -0.5342 -1.4886 -2.2481 -1.124 0.6038 2.1347z" />
                </symbol>

                <symbol id="relief-mount-5" viewBox="-5 -12 45 45">
                    <polygon fill="#96989A" stroke="#96989A" stroke-width=".2"
                        points=".1806,16.7402 3.5087,13.7123 4.239,13.7226 5.6739,11.608 7.2317,11.0365 8.5763,9.1019 11.2204,5.1632 11.5727,4.0521 14.4278,0.1139 14.7002,0.1847 15.5903,0.6964 17.3404,2.3788 19.0704,4.6029 19.8528,4.6768 21.1765,3.7877 21.6878,3.1801 22.2862,3.3991 23.2631,4.3576 23.6605,5.4693 24.1225,6.6796 27.0001,10.5869 28.8156,9.4183 30.9325,11.9224 31.9742,13.5284 32.7597,14.0214 35.7881,17.4522 35.0629,18.009 30.1283,18.9281 26.9306,18.8548 20.8774,19.2757 15.3532,18.9995 11.8111,18.7356 9.9342,18.4948 6.0759,18.7277 3.5217,18.2204 " />
                    <polygon fill="#BDBFC1"
                        points=".1806,16.7402 3.5087,13.7123 3.9652,14.1261 5.6739,11.608 7.2317,11.0365 8.5763,9.1019 11.2204,5.1632 11.5727,4.0521 14.4278,0.1139 15.4779,0.7228 17.2215,2.4846 18.8233,4.7304 19.5423,4.8852 21.1765,3.7877 21.6878,3.1801 22.2862,3.3991 23.2631,4.3576 23.6605,5.4693 24.1225,6.6796 27.0001,10.5869 28.8156,9.4183 30.9325,11.9224 31.9742,13.5284 32.7597,14.0214 35.7881,17.4522 35.0629,18.009 30.1283,18.9281 26.9306,18.8548 20.8774,19.2757 15.3532,18.9995 11.8111,18.7356 9.9342,18.4948 6.0759,18.7277 3.5217,18.2204 " />
                    <path fill="#999999"
                        d="M35.7881 17.4522l-3.0284 -3.4308 -0.7855 -0.493 -1.0417 -1.606 -2.1169 -2.5041 -0.1069 1.6658 -0.5815 0.9516 0.6344 0.4229 -0.1543 1.2251 0.5772 0.7838 0.6872 0.8986 -1.2159 0.8459 0.5287 0.5287 1.0044 0.6344 0.4757 0.7929 0.1189 0.6381 1.8119 -0.3376 2.4673 -0.4596 0.7252 -0.5568zm-16.2458 -12.567l-0.719 -0.1548 -1.6261 -2.2705 -1.7192 -1.7371 -1.0501 -0.6089 -0.806 3.5794 -0.1188 1.5355 0.8458 0.7402 0.5287 -0.6344 -0.5287 2.5375 -1.2158 2.1675 2.2732 -1.9032 0.8458 0.6872 -0.2114 1.4803 -0.0528 1.0573 -0.6344 1.2688 0.2114 0.7929 -1.163 2.009 -0.6344 1.2688 -0.1615 2.1686 2.9143 0.1885 0.2605 -1.5112 -0.2115 -1.6918 2.0478 -2.1712 0.1726 -2.0052 0.7929 1.1101 0.8987 -1.3216 -0.2643 -1.3745 -0.6344 -0.37 0 -0.6344 -0.9656 -0.3996 -0.0917 -1.715 0.1057 -1.4274 0.9113 -0.6609zm2.7439 -1.4861l-0.5984 -0.219 -0.0368 1.0839 -0.9781 1.3217 0.6344 0.6079 -0.2379 1.4538 0.5287 1.1366 -0.1851 1.1631 0.7402 1.5331 0.7929 1.6124 -0.4757 1.2159 0.2643 0.8458 1.3216 1.2424 0.9516 0.1322 1.6457 2.3451 0.601 -0.0118 -0.5021 -1.3289 -0.0529 -0.7666 -1.0044 -0.9252 0.0528 -1.0044 0.5815 -0.0264 -1.1631 -2.4847 0.7402 0.3436 0.5551 -0.3964 0.1322 -1.0574 0.4061 -0.629 -2.8776 -3.9072 -0.8594 -2.3221 -0.9769 -0.9585z" />
                </symbol>

                <symbol id="relief-mount-6" viewBox="-3 -10 40 40">
                    <polygon fill="#96989A" stroke="#96989A" stroke-width=".2"
                        points=".147,15.0385 1.6442,13.0243 3.3151,11.642 4.1434,10.0376 4.9806,9.9224 6.8955,7.0031 8.6059,5.1501 9.0229,3.7256 10.0368,2.3148 12.4348,4.6748 14.6687,3.6743 18.1604,1.3295 20.0044,0.1303 23.5192,4.0044 24.3981,3.1572 25.3939,4.067 27.6095,6.6459 28.7754,8.0029 30.309,8.9148 31.4894,10.6345 32.5909,12.0136 33.1688,13.2271 33.746,13.7886 34.1887,14.9298 35.1672,15.7874 33.2794,16.9613 30.2507,17.8494 27.9082,18.0142 25.5124,18.5408 24.1945,18.5184 22.0666,17.9886 20.7224,17.5522 19.3848,17.2692 18.0714,17.4921 16.8448,17.9273 14.923,18.4833 11.9731,18.4984 8.0901,18.2949 4.9114,17.2688 1.9652,16.102 " />
                    <polygon fill="#BDBFC1"
                        points=".147,15.0385 1.6442,13.0243 3.3151,11.642 4.1434,10.0376 4.7098,10.3352 6.8955,7.0031 8.6059,5.1501 9.0229,3.7256 10.0368,2.3148 12.2006,4.7797 14.6687,3.6743 18.1604,1.3295 20.0044,0.1303 23.2333,4.2797 24.3981,3.1572 25.3939,4.067 27.6095,6.6459 28.7754,8.0029 30.309,8.9148 31.4894,10.6345 32.5909,12.0136 33.1688,13.2271 33.746,13.7886 34.1887,14.9298 35.1672,15.7874 33.2794,16.9613 30.2507,17.8494 27.9082,18.0142 25.5124,18.5408 24.1945,18.5184 22.0666,17.9886 20.7224,17.5522 19.3848,17.2692 18.0714,17.4921 16.8448,17.9273 14.923,18.4833 11.9731,18.4984 8.0901,18.2949 4.9114,17.2688 1.9652,16.102 " />
                    <polygon fill="#999999"
                        points="12.2006,4.7797 10.0368,2.3148 10.1151,7.3804 11.4163,8.759 12.2026,10.4436 11.8763,13.7594 14.5464,16.7619 15.0352,18.4509 19.3848,17.2692 16.5848,14.5291 17.904,13.4655 15.4923,10.5203 14.5256,8.5177 12.9142,7.5924 13.9488,6.222 " />
                    <polygon fill="#999999"
                        points="23.2333,4.2797 20.0044,0.1303 19.9564,3.3216 19.4305,3.5239 18.8945,6.0413 19.0996,7.1979 19.8037,9.1018 20.5765,9.6521 20.1327,11.8442 20.4782,12.7337 22.7768,14.5969 22.0989,12.9428 22.0752,12.3141 22.7092,10.7332 22.4605,9.1605 22.6231,8.3019 22.2254,6.9131 23.5867,5.0457 " />
                    <polygon fill="#999999"
                        points="35.1672,15.7874 34.1887,14.9298 33.746,13.7886 33.1688,13.2271 32.5909,12.0136 30.309,8.9148 28.7754,8.0029 25.3939,4.067 24.3981,3.1572 24.8,5.3815 23.8709,6.152 25.4726,8.5929 25.9139,10.398 25.7241,12.6056 24.6322,14.2344 24.9293,15.4655 26.199,16.3424 28.0999,16.8168 28.1829,17.9949 30.2507,17.8494 33.2794,16.9613 " />
                </symbol>

                <symbol id="relief-mount-7" viewBox="-8 -10 40 40">
                    <polygon fill="#96989A" stroke="#96989A" stroke-width=".2"
                        points="22.529,16.6581 21.9433,15.0851 21.8084,13.5984 21.4921,11.5468 20.7584,9.2608 18.1129,5.2497 17.7604,4.1287 14.9038,0.1126 14.6313,0.1761 13.7407,0.6645 11.9897,2.3012 10.8187,3.7756 10.2754,4.1491 9.5595,3.9239 8.7609,3.5562 7.64,2.9875 7.0412,3.1907 6.0639,4.1237 5.6662,5.2254 5.204,6.4241 2.3249,10.2569 1.7062,11.6374 2.3144,13.0024 2.1506,13.6978 1.1772,13.673 1.0735,15.1182 0.4367,16.8402 0.1318,17.5293 2.3944,18.5311 8.4508,19.113 13.9779,18.9836 17.5219,18.8136 19.3998,18.6226 " />
                    <polygon fill="#999999"
                        points="22.529,16.6581 21.9433,15.0851 21.8165,13.6871 21.6735,12.1117 20.7584,9.2608 18.1129,5.2497 17.7604,4.1287 14.9038,0.1126 13.8531,0.6938 12.1086,2.4102 10.506,4.6147 9.7866,4.7504 8.1515,3.609 7.64,2.9875 7.0412,3.1907 6.0639,4.1237 5.6662,5.2254 5.204,6.4241 2.3249,10.2569 1.7062,11.6374 2.3144,13.0024 2.0235,14.2377 1.1772,13.673 1.0735,15.1182 0.4367,16.8402 0.138,17.5319 2.3944,18.5311 8.4508,19.113 13.9779,18.9836 17.5219,18.8136 19.3998,18.6226 " />
                    <path fill="#BDBFC1"
                        d="M9.7866 4.7504l0.7194 -0.1357 1.627 -2.2285 1.7201 -1.6924 1.0506 -0.5812 0.8064 3.6027 0.1188 1.5394 -0.8462 0.7182 -0.529 -0.6488 0.529 2.553 1.2165 2.2009 -2.2744 -1.9646 -0.8462 0.6652 0.2115 1.4867 0.0529 1.0592 0.6347 1.2863 -0.2115 0.7877 1.1636 2.041 0.6347 1.2862 0.1616 2.1741 -2.9158 0.1112 -0.2607 -1.5189 0.2116 -1.6871 -2.0489 -2.2267 -0.1727 -2.0108 -0.7934 1.0896 -0.8992 -1.3462 0.2645 -1.3681 0.6347 -0.3534 0 -0.6347 0.9661 -0.3741 0.0918 -1.7136 -0.1058 -1.431 -0.9118 -0.6854zm-2.7454 -1.5597l0.5987 -0.2032 0.0368 1.0853 0.9786 1.3484 -0.6347 0.5914 0.238 1.4609 -0.529 1.1231 0.1852 1.1687 -0.7406 1.5142 -0.7934 1.5922 1.5431 0.6224 1.2433 0.621 0.0153 0.9133 -0.2397 0.777 1.8113 0.1046 1.0597 0.4823 0.9965 2.6186 -4.3596 0.1022 -6.0565 -0.5819 -2.2625 -1.0018 0.3049 -0.6891 0.6368 -1.722 0.1037 -1.4452 0.8463 0.5647 0.2909 -1.2353 -0.6082 -1.365 0.6187 -1.3805 2.8791 -3.8328 0.8598 -2.3004 0.9774 -0.933z" />
                </symbol>

                <symbol id="relief-mountSnow-1" viewBox="-5 -5 50 50">
                    <polygon fill="#96989A" stroke="#96989A" stroke-width=".2"
                        points="23.2198,13.2844 25.0296,15.5958 25.7023,16.6348 26.9007,17.3503 27.6924,18.8671 28.6339,19.544 29.6416,21.2874 30.1793,22.9204 30.7341,23.1774 31.5491,24.0589 31.9489,25.0324 32.4734,26.4994 33.8428,27.4678 34.673,28.5353 34.8847,28.7856 34.8285,28.9234 29.5625,31.5852 22.3428,32.6 17.9672,32.2587 6.7332,31.3779 4.2787,30.6699 0.3152,28.4746 6.2326,22.923 6.8631,18.7876 8.5478,17.0127 9.4447,14.5301 10.1033,13.4603 10.0987,12.7193 10.3459,12.4623 10.8502,12.3291 11.2616,9.4996 12.2382,9.5462 12.8014,9.7331 13.2941,9.6207 13.6109,9.8041 14.1481,9.9827 15.2052,7.9497 15.8578,7.6333 16.1761,6.4592 16.6967,5.5584 17.9672,2.6 19.2707,4.5745 23.008,12.5807 " />
                    <polygon fill="#BDBFC1"
                        points="23.2198,13.2844 25.0296,15.5958 25.7023,16.6348 26.9007,17.3503 27.6924,18.8671 28.6339,19.544 29.6416,21.2874 30.1793,22.9204 30.7341,23.1774 31.5491,24.0589 31.9489,25.0324 32.4734,26.4994 33.8428,27.4678 34.673,28.5353 34.8847,28.7856 34.8285,28.9234 29.5625,31.5852 22.3428,32.6 12.2198,31.8104 6.7332,31.3779 4.2787,30.6699 0.3152,28.4746 6.2326,22.923 6.8631,18.7876 8.5478,17.0127 9.4447,14.5301 9.6678,14.1183 10.1033,13.4603 10.0987,12.7193 10.3459,12.4623 10.8502,12.3291 10.9552,11.4205 11.2616,9.4996 13.6805,10.8818 15.2052,7.9497 15.8578,7.6333 16.1761,6.4592 16.6967,5.5584 17.9672,2.6 19.2707,4.5745 23.008,12.5807 " />
                    <polygon fill="#bdbec0"
                        points="13.4787,27.0815 15.3508,21.8824 18.3111,15.2733 25.171,25.3682 21.3156,32.1469" />
                    <polygon fill="#999999"
                        points="23.2198,13.2844 25.0296,15.5958 25.7023,16.6348 26.9007,17.3503 27.6924,18.8671 28.6339,19.544 29.6416,21.2874 30.1793,22.9204 30.7341,23.1774 31.5491,24.0589 31.9489,25.0324 32.4734,26.4994 33.8428,27.4678 34.673,28.5353 34.8847,28.7856 34.8285,28.9234 29.5625,31.5852 22.3428,32.6 17.9672,32.2587 21.0737,27.7521 21.7612,26.7547 21.895,24.2875 20.5482,19.4183 18.3111,15.2733 19.9099,12.3973 17.9672,2.6 19.2707,4.5745 23.008,12.5807 " />
                    <polygon fill="#bdbec0"
                        points="18.2474,32.2806 6.7332,31.3779 13.2414,24.6909 15.3508,21.8824 18.5651,27.4046 20.2242,29.0369" />
                    <polygon fill="#e6e6e6"
                        points="12.8246,9.719 12.2711,9.5441 11.3343,9.513 13.6886,10.794 14.1481,9.9526 13.6202,9.7854 13.3088,9.6138" />
                    <polygon fill="#FEFEFE"
                        points="13.6805,10.8818 11.2616,9.4996 11.0559,10.9144 11.8389,12.3618 13.3272,12.0311 14.0879,13.8832 16.1715,12.0311 16.6014,13.7839 17.9244,11.1712 18.1228,12.3618 19.4457,11.2042 19.5775,10.7214 17.9672,2.6 16.6967,5.5584 16.1761,6.4592 15.8578,7.6333 15.2052,7.9497 " />
                    <polygon fill="#e6e6e6" stroke="#BDBFC1" stroke-width=".0762"
                        points="17.9672,2.6 18.0463,6.2528 18.383,4.6971 18.8561,7.083 18.5661,9.6743 19.0983,8.3046 19.5775,10.7214 20.0823,11.6761 20.8761,12.106 21.1407,10.9815 21.5375,11.8084 21.8021,11.0808 22.4764,11.4421 19.2707,4.5745 " />
                </symbol>

                <symbol id="relief-mountSnow-2" viewBox="-5 -8 45 45">
                    <polygon fill="#96989A" stroke="#96989A" stroke-width=".2"
                        points="25.3915,9.1042 26.9002,11.0311 27.4611,11.8972 28.4601,12.4937 29.12,13.7582 29.9049,14.3225 30.745,15.7759 31.1932,17.1372 31.6557,17.3514 32.3351,18.0863 32.6684,18.8978 33.1056,20.1209 34.2473,20.9281 34.9393,21.818 35.1158,22.0267 35.0689,22.1415 30.679,24.3606 24.6604,25.2064 21.0127,24.922 14.3249,24.3977 12.5343,24.6493 10.0779,24.4578 3.7712,23.9633 2.3933,23.5658 0.1682,22.3334 3.4902,19.2167 3.8441,16.8951 4.7899,15.8988 5.6813,13.4312 7.6713,12.4569 10.0779,7.8076 10.8097,8.916 12.616,12.7858 13.1603,12.2124 13.8282,7.6609 14.8701,7.983 15.3517,7.7683 16.0651,6.3161 16.9674,6.5014 17.4851,6.3647 17.793,6.4274 21.0127,0.1972 22.0994,1.8433 25.2149,8.5176 " />
                    <polygon fill="#BDBFC1"
                        points="25.3915,9.1042 26.9002,11.0311 27.4611,11.8972 28.4601,12.4937 29.12,13.7582 29.9049,14.3225 30.745,15.7759 31.1932,17.1372 31.6557,17.3514 32.3351,18.0863 32.6684,18.8978 33.1056,20.1209 34.2473,20.9281 34.9393,21.818 35.1158,22.0267 35.0689,22.1415 30.679,24.3606 24.6604,25.2064 16.2214,24.5482 14.3198,24.3984 12.5343,24.6493 6.8513,24.206 3.7712,23.9633 2.3933,23.5658 0.1682,22.3334 3.4902,19.2167 3.8441,16.8951 4.7899,15.8988 5.6813,13.4312 7.6713,12.4569 8.6899,10.5168 10.0779,7.8076 10.8097,8.916 12.616,12.7858 13.1603,12.2124 13.8282,7.6609 14.983,8.5189 16.0651,6.3161 17.4391,7.1013 18.9517,4.2204 21.0127,0.1972 22.0994,1.8433 25.2149,8.5176 " />
                    <path fill="#999999"
                        d="M13.0266 13.8057l1.0161 1.2977 0.3775 0.5832 0.6729 0.4017 0.4443 0.8515 0.5286 0.38 0.5657 0.9788 1.365 -0.2171 0.852 0.9077 0.8012 0.7006 1.0769 -0.4987 0.587 0.888 1.3143 1.1862 1.6837 -1.1473 -3.2991 4.8038 -6.6879 -0.5243 -1.7906 0.2516 -2.4564 -0.1915 1.7439 -2.53 0.386 -0.56 0.0751 -1.3851 -0.756 -2.7335 -1.2559 -2.3269 0.8975 -1.6146 -1.0906 -5.5001 0.7318 1.1084 2.098 4.4946 0.1189 0.395zm12.3648 -4.7014l1.5087 1.9269 0.5609 0.8661 0.999 0.5965 0.6599 1.2645 0.7849 0.5643 0.8401 1.4534 0.4482 1.3613 0.4625 0.2143 0.6794 0.7349 0.3333 0.8115 0.4371 1.2231 1.1417 0.8072 0.6921 0.89 0.1764 0.2087 -0.0468 0.1148 -4.3899 2.2191 -6.0187 0.8458 -3.6476 -0.2845 2.5896 -3.7569 0.5732 -0.8316 0.1114 -2.0567 -1.1227 -4.0591 -1.8649 -3.4554 1.3328 -2.3976 -1.6195 -8.1675 1.0867 1.6461 3.1155 6.6743 0.1765 0.5866z" />
                    <path fill="#e6e6e6"
                        d="M10.0779 7.8076l1.0906 5.5 0.4152 -0.4101 1.205 0.2576 -1.9788 -4.2391 -0.7319 -1.1084zm12.5157 0.4025l-1.5808 -8.0129 1.0867 1.6461 2.7072 5.7999 -0.3838 0.5883 -0.4636 -0.296 -0.311 0.8985 -0.5241 -0.3498 -0.264 1.1861 -0.2771 -0.6052 -0.4468 0.1919 0.2592 -0.4664 0.1982 -0.5806zm-5.5775 -1.7214l-0.951 -0.1724 1.374 0.785 0.362 -0.6894 -0.3159 -0.047 -0.4691 0.1238zm-2.1029 1.4753l-1.0849 -0.303 1.1548 0.858 0.3482 -0.7086 -0.4181 0.1537z" />
                    <path fill="#FEFEFE"
                        d="M13.4943 9.9367l-0.0192 0.1307 0.773 1.6295 0.9687 -1.1448 0.5504 0.5063 1.0347 -1.2109 0.5504 1.8934 1.0128 -1.387 0.8365 -0.2862 0.4623 0.7926 0.7045 -1.5412 0.9308 1.4432 1.3328 -2.3976 -1.6195 -8.1675 -3.5736 6.904 -1.374 -0.785 -1.0821 2.2027 -1.1548 -0.858 -0.3339 2.2758zm-3.4165 -2.1291l-2.4065 4.6492 0.742 0.5232 1.1558 -0.2973 1.5993 0.6249 -1.0906 -5.5z" />
                </symbol>

                <symbol id="relief-mountSnow-3" viewBox="-5 -15 50 50">
                    <polygon fill="#96989A" stroke="#96989A" stroke-width=".2"
                        points="35.1337,17.58 34.122,18.8623 31.5268,19.3968 28.6951,19.562 25.2025,19.4911 22.0686,19.053 19.2643,20.1212 14.8201,19.849 10.9897,18.983 7.7168,18.0396 4.4391,18.4829 1.598,17.8161 0.2005,16.9864 5.3775,14.1114 6.9445,13.6145 9.7551,10.1143 10.7985,9.9008 11.1418,9.0682 12.5645,7.9945 13.6885,4.6225 17.0605,0.1265 19.3086,1.2504 19.5301,1.868 20.0211,2.0967 20.0211,2.0967 22.6805,4.6225 22.7195,6.0067 23.6307,6.3628 25.5645,8.9605 27.9106,10.6515 27.912,11.4444 28.1901,12.0933 29.0346,11.8883 29.8293,12.2096 " />
                    <polygon fill="#BDBFC1"
                        points="35.1337,17.58 34.122,18.8623 31.5268,19.3968 28.6951,19.562 25.2025,19.4911 22.0686,19.053 19.2643,20.1212 14.8201,19.849 10.9897,18.983 7.7168,18.0396 4.4391,18.4829 1.598,17.8161 0.2005,16.9864 5.3775,14.1114 6.9445,13.6145 9.7551,10.1143 10.6513,10.2579 11.1418,9.0682 12.5645,7.9945 13.6885,4.6225 17.0605,0.1265 19.3086,1.2504 19.8426,2.7391 20.0211,2.0967 22.6805,4.6225 22.7409,6.7655 25.5645,8.9605 27.9106,10.6515 27.6061,13.0536 29.9394,12.3212 " />
                    <path fill="#999999"
                        d="M17.6643 2.2612l-0.3434 1.3675 0.2294 0.1158 -0.1215 0.4558 0.0287 0.4166 0.2487 -0.7253 0.0199 0.7745 0.1926 0.9377 -0.9604 1.4775 -0.6513 0.6353 1.7115 -0.7977 0.1556 -0.7421 0.4118 1.3885 1.1335 1.9731 0.7278 1.7545 -0.2079 1.6338 0.7769 0.6722 0.3099 1.1103 0.7775 0.5155 -0.6186 2.4264 0.5834 1.4019 3.1339 0.4381 3.4927 0.0709 2.8316 -0.1651 2.5952 -0.5346 1.0117 -1.2823 -5.3044 -5.3703c-0.2875,-0.1214 -0.5799,-0.2431 -0.8727,-0.3502l-0.3389 0.6201 -0.3658 -0.0155 -0.0618 -0.3708 -0.2782 -0.6489 -0.0014 -0.7929 -2.346 -1.6911 -1.9339 -2.5976 -0.5212 0.0497 -0.3686 0.3529 -0.0604 -2.143 -2.6594 -2.5258 -0.1784 0.6424 -0.5342 -1.4886 -2.2481 -1.124 0.6038 2.1347z" />
                    <polygon fill="#e6e6e6"
                        points="19.3086,1.2504 17.0605,0.1265 17.3208,3.6287 17.4576,4.6169 18.2355,6.3837 18.4568,7.1297 19.5555,7.6994 19.9956,6.8192 20.3478,7.1273 21.0519,7.0392 21.7122,7.6554 21.8442,6.0709 22.7409,6.7655 22.6805,4.6225 20.0211,2.0967 19.8426,2.7391 " />
                    <polygon fill="#FEFEFE"
                        points="12.5645,7.9945 12.3831,8.1314 13.3341,8.871 14.0824,8.3429 15.3587,9.2232 16.3071,7.7165 18.0186,6.9189 18.2355,6.3837 17.9188,5.6039 17.7262,4.6661 17.708,3.9637 17.4576,4.6169 17.4288,4.2003 17.5502,3.7445 17.3208,3.6287 17.6643,2.2612 17.0605,0.1265 13.6885,4.6225 " />
                </symbol>

                <symbol id="relief-mountSnow-4" viewBox="-5 -12 45 45">
                    <polygon fill="#96989A" stroke="#96989A" stroke-width=".2"
                        points=".1806,16.758 3.5087,13.7301 4.239,13.7404 5.6739,11.6258 7.2317,11.0543 8.5763,9.1197 11.2204,5.181 11.5727,4.0699 14.4278,0.1317 15.4779,0.7406 17.1972,2.4777 18.8233,4.7482 19.5423,4.903 21.1765,3.8055 21.6878,3.1979 22.2862,3.4169 23.2631,4.3754 23.6605,5.4871 24.1225,6.6974 27.0001,10.6046 28.8156,9.4361 30.9325,11.9401 31.9742,13.5462 32.7597,14.0392 35.7881,17.47 35.0629,18.0268 30.1283,18.9459 26.9306,18.8725 20.8774,19.2934 15.3532,19.0173 11.8111,18.7534 9.9342,18.5126 6.0759,18.7455 3.5217,18.2382 " />
                    <polygon fill="#BDBFC1"
                        points=".1806,16.758 3.5087,13.7301 3.9652,14.1439 5.6739,11.6258 7.2317,11.0543 8.5763,9.1197 11.2204,5.181 11.5727,4.0699 14.4278,0.1317 15.4779,0.7406 17.2215,2.5024 18.8233,4.7482 19.5423,4.903 21.1765,3.8055 21.6878,3.1979 22.2862,3.4169 23.2631,4.3754 23.6605,5.4871 24.1225,6.6974 27.0001,10.6046 28.8156,9.4361 30.9325,11.9401 31.9742,13.5462 32.7597,14.0392 35.7881,17.47 35.0629,18.0268 30.1283,18.9459 26.9306,18.8725 20.8774,19.2934 15.3532,19.0173 11.8111,18.7534 9.9342,18.5126 6.0759,18.7455 3.5217,18.2382 " />
                    <path fill="#999999"
                        d="M35.7881 17.47l-3.0284 -3.4308 -0.7855 -0.493 -1.0417 -1.606 -2.1169 -2.5041 -0.1069 1.6658 -0.5815 0.9516 0.6344 0.4229 -0.1543 1.2251 0.5772 0.7838 0.6872 0.8986 -1.2159 0.8459 0.5287 0.5287 1.0044 0.6344 0.4757 0.7929 0.1189 0.6381 1.8119 -0.3376 2.4673 -0.4596 0.7252 -0.5568zm-16.2458 -12.567l-0.719 -0.1548 -1.6261 -2.2705 -1.7192 -1.7371 -1.0501 -0.6089 -0.806 3.5794 -0.1188 1.5355 0.8458 0.7402 0.5287 -0.6344 -0.5287 2.5375 -1.2158 2.1675 2.2732 -1.9032 0.8458 0.6872 -0.2114 1.4803 -0.0528 1.0573 -0.6344 1.2688 0.2114 0.7929 -1.163 2.009 -0.6344 1.2688 -0.1615 2.1686 2.9143 0.1885 0.2605 -1.5112 -0.2115 -1.6918 2.0478 -2.1712 0.1726 -2.0052 0.7929 1.1101 0.8987 -1.3216 -0.2643 -1.3745 -0.6344 -0.37 0 -0.6344 -0.9656 -0.3996 -0.0917 -1.715 0.1057 -1.4274 0.9113 -0.6609zm2.7439 -1.4861l-0.5984 -0.219 -0.0368 1.0839 -0.9781 1.3217 0.6344 0.6079 -0.2379 1.4538 0.5287 1.1366 -0.1851 1.1631 0.7402 1.5331 0.7929 1.6124 -0.4757 1.2159 0.2643 0.8458 1.3216 1.2424 0.9516 0.1322 1.6457 2.3451 0.601 -0.0118 -0.5021 -1.3289 -0.0529 -0.7666 -1.0044 -0.9252 0.0528 -1.0044 0.5815 -0.0264 -1.1631 -2.4847 0.7402 0.3436 0.5551 -0.3964 0.1322 -1.0574 0.4061 -0.629 -2.8776 -3.9072 -0.8594 -2.3221 -0.9769 -0.9585z" />
                    <polygon fill="#FEFEFE"
                        points="13.6218,3.7111 14.4278,0.1317 11.5727,4.0699 11.2204,5.181 10.2231,6.6667 11.5706,6.2509 11.13,8.3655 12.0332,7.6827 11.8349,10.1277 13.2509,9.9588 14.3488,7.89 14.8775,5.3524 14.3338,5.9737 13.503,5.2466" />
                    <polygon fill="#e6e6e6"
                        points="14.3488,7.89 13.2509,9.9588 15.4062,8.1543 16.252,8.8415 16.9456,9.555 17.7385,8.718 18.617,8.7063 18.5357,6.8509 18.631,5.5638 19.5423,4.903 18.8233,4.7482 17.1189,2.3987 16.3376,1.6091 15.4779,0.7406 14.4278,0.1317 13.6218,3.7111 13.503,5.2466 14.3488,5.9868 14.8775,5.3524 " />
                    <polygon fill="#FEFEFE"
                        points="18.5357,6.8509 18.617,8.7063 19.5826,9.1059 19.5826,9.7403 20.5423,9.1255 21.4131,9.9649 21.5982,8.8018 21.0695,7.6652 21.3074,6.2114 20.673,5.6035 21.6511,4.2818 21.6878,3.1979 21.1765,3.8055 19.5423,4.903 18.631,5.5638 " />
                    <polygon fill="#e6e6e6"
                        points="22.2862,3.4169 21.6878,3.1979 21.6511,4.2818 20.673,5.6035 21.3074,6.2114 21.0695,7.6652 21.5982,8.8018 21.4131,9.9649 22.4095,10.3424 23.0704,9.1529 23.6651,9.4173 24.2158,8.2718 24.8766,8.448 25.0536,7.9618 24.1225,6.6974 23.2631,4.3754 " />
                </symbol>

                <symbol id="relief-mountSnow-5" viewBox="-3 -10 40 40">
                    <polygon fill="#96989A" stroke="#96989A" stroke-width=".2"
                        points=".147,15.0422 1.6442,13.028 3.3151,11.6457 4.1434,10.0413 4.9806,9.9261 6.8955,7.0068 8.6059,5.1538 9.0229,3.7293 10.0368,2.3185 12.2006,4.7833 14.6687,3.678 18.1604,1.3332 20.0044,0.134 23.2333,4.2834 24.3981,3.1609 25.3939,4.0708 27.6095,6.6496 28.7754,8.0066 30.309,8.9186 31.4894,10.6382 32.5909,12.0173 33.1688,13.2308 33.746,13.7923 34.1887,14.9335 35.1672,15.7911 33.2794,16.965 30.2507,17.8531 27.9082,18.0179 25.5124,18.5445 24.1945,18.5221 22.0666,17.9923 20.7224,17.5559 19.3848,17.2729 18.0714,17.4958 16.8448,17.931 14.923,18.487 11.9731,18.5021 8.0901,18.2986 4.9114,17.2725 1.9652,16.1057 " />
                    <polygon fill="#BDBFC1"
                        points=".147,15.0422 1.6442,13.028 3.3151,11.6457 4.1434,10.0413 4.7098,10.3389 6.8955,7.0068 8.6059,5.1538 9.0229,3.7293 10.0368,2.3185 12.2006,4.7834 14.6687,3.678 18.1604,1.3332 20.0044,0.134 23.2333,4.2834 24.3981,3.1609 25.3939,4.0708 27.6095,6.6496 28.7754,8.0066 30.309,8.9186 31.4894,10.6382 32.5909,12.0173 33.1688,13.2308 33.746,13.7923 34.1887,14.9335 35.1672,15.7911 33.2794,16.965 30.2507,17.8531 27.9082,18.0179 25.5124,18.5445 24.1945,18.5221 22.0666,17.9923 20.7224,17.5559 19.3848,17.2729 18.0714,17.4958 16.8448,17.931 14.923,18.487 11.9731,18.5021 8.0901,18.2986 4.9114,17.2725 1.9652,16.1057 " />
                    <polygon fill="#999999"
                        points="12.2006,4.7834 10.0368,2.3185 10.1151,7.3841 11.4163,8.7627 12.2026,10.4473 11.8763,13.7632 14.5464,16.7656 15.0352,18.4546 19.3848,17.2729 16.5848,14.5328 17.904,13.4692 15.4923,10.524 14.5256,8.5214 12.9142,7.5961 13.9488,6.2257 " />
                    <polygon fill="#999999"
                        points="23.2333,4.2834 20.0044,0.134 19.9564,3.3253 19.4305,3.5276 18.8945,6.045 19.0996,7.2016 19.8037,9.1055 20.5765,9.6558 20.1327,11.8479 20.4782,12.7374 22.7768,14.6006 22.0989,12.9465 22.0752,12.3178 22.7092,10.7369 22.4605,9.1642 22.6231,8.3056 22.2254,6.9168 23.5867,5.0494 " />
                    <polygon fill="#999999"
                        points="35.1672,15.7911 34.1887,14.9335 33.746,13.7923 33.1688,13.2308 32.5909,12.0173 30.309,8.9186 28.7754,8.0066 25.3939,4.0708 24.3981,3.1609 24.8,5.3852 23.8709,6.1557 25.4726,8.5966 25.9139,10.4017 25.7241,12.6093 24.6322,14.2381 24.9293,15.4692 26.199,16.3461 28.0999,16.8205 28.1829,17.9986 30.2507,17.8531 33.2794,16.965 " />
                    <path fill="#FEFEFE"
                        d="M23.5867 5.0494l-0.3534 -0.766 1.1648 -1.1224 0.4019 2.2243 -0.9291 0.7703 -0.625 0.3316 0.3847 -0.5987 -0.6602 0.0063 0.6163 -0.8453zm-13.4716 2.3346l-0.0783 -5.0655 -1.0139 1.4107 -0.417 1.4245 -1.7104 1.8531 -0.1947 0.8318 0.728 -0.2978 0.1765 0.728 0.7942 -1.2465 0.0883 0.4854 0.4413 -0.5405 0.5736 1.5994 0.6126 -1.1826zm4.5536 -3.706l-2.4681 1.1052 1.7481 1.4424 -0.5173 0.6852 0.2957 0.3987 0.75 -0.706 0.364 0.3641 0.5516 -1.2024 0.1875 0.5295 0.2096 -0.2317 0.386 0.4192 0.6398 0.3199 0.2427 -0.9597 0.5736 1.4009 0.5074 -0.7943 0.3089 0.5074 0.5227 -0.4801 -0.0765 -0.4315 0.536 -2.5174 0.5259 -0.2023 0.0479 -3.1913 -5.3356 3.544z" />
                    <path fill="#e6e6e6"
                        d="M24.3981 3.1609l0.4019 2.2243 -0.9291 0.7703 0.6886 0.5329 0.6056 0.4387 0.0221 -1.0588 0.4412 0.5735 0.0833 -0.7817 0.5106 0.4833 0.4121 -0.8287 -1.0977 -1.2778 -1.1387 -1.076zm-14.3613 -0.8424l0.0783 5.0655 0.3029 0.8298 0.4744 -0.8494 0.7721 0.6288 0.4523 -1.3898 1.3147 0.3075 0.5173 -0.6852 -1.7481 -1.4424 -2.1638 -2.4647zm8.8577 3.7265l0.0765 0.4315 0.591 -0.3692 0.375 0.7943 0.728 -1.3679 0.1765 0.4413 0.3971 -0.7942 0.3971 0.9045 0.5515 -0.6619 0.1765 0.6619 0.5295 -0.6178 0.077 0.4271 0.6163 -0.8453 -0.3534 -0.766 -3.229 -4.1494 -0.0479 3.1913 -0.5259 0.2023 -0.536 2.5174z" />
                </symbol>

                <symbol id="relief-mountSnow-6" viewBox="-8 -10 40 40">
                    <polygon fill="#96989A" stroke="#96989A" stroke-width=".2"
                        points="22.529,16.6762 21.9433,15.1032 21.8084,13.6165 21.4921,11.5648 20.7584,9.2788 18.1129,5.2678 17.7604,4.1468 14.9038,0.1306 13.8531,0.7119 12.1086,2.4283 10.506,4.6328 9.7866,4.7685 8.102,3.5668 7.64,3.0056 7.0412,3.2088 6.0639,4.1418 5.6662,5.2435 5.204,6.4422 2.3249,10.275 1.7062,11.6555 2.3144,13.0205 2.1506,13.7159 1.1772,13.6911 1.0735,15.1363 0.4367,16.8583 0.1318,17.5474 2.3944,18.5492 8.4508,19.1311 13.9779,19.0017 17.5219,18.8317 19.3998,18.6407 " />
                    <polygon fill="#999999"
                        points="22.529,16.6762 21.9433,15.1032 21.8165,13.7052 21.6735,12.1298 20.7584,9.2788 18.1129,5.2678 17.7604,4.1468 14.9038,0.1306 13.8531,0.7119 12.1086,2.4283 10.506,4.6328 9.7866,4.7685 8.1515,3.6271 7.64,3.0056 7.0412,3.2088 6.0639,4.1418 5.6662,5.2435 5.204,6.4422 2.3249,10.275 1.7062,11.6555 2.3144,13.0205 2.0235,14.2558 1.1772,13.6911 1.0735,15.1363 0.4367,16.8583 0.138,17.55 2.3944,18.5492 8.4508,19.1311 13.9779,19.0017 17.5219,18.8317 19.3998,18.6407 " />
                    <path fill="#BDBFC1"
                        d="M9.7866 4.7685l0.7194 -0.1357 1.627 -2.2285 1.7201 -1.6924 1.0506 -0.5812 0.8064 3.6027 0.1188 1.5394 -0.8462 0.7182 -0.529 -0.6488 0.529 2.553 1.2165 2.2009 -2.2744 -1.9646 -0.8462 0.6652 0.2115 1.4867 0.0529 1.0592 0.6347 1.2863 -0.2115 0.7877 1.1636 2.041 0.6347 1.2862 0.1616 2.1741 -2.9158 0.1112 -0.2607 -1.5189 0.2116 -1.6871 -2.0489 -2.2267 -0.1727 -2.0108 -0.7934 1.0896 -0.8992 -1.3462 0.2645 -1.3681 0.6347 -0.3534 0 -0.6347 0.9661 -0.3741 0.0918 -1.7136 -0.1058 -1.431 -0.9118 -0.6854zm-2.7454 -1.5597l0.5987 -0.2032 0.0368 1.0853 0.9786 1.3484 -0.6347 0.5914 0.238 1.4609 -0.529 1.1231 0.1852 1.1687 -0.7406 1.5142 -0.7934 1.5922 1.5431 0.6224 1.2433 0.621 0.0153 0.9133 -0.2397 0.777 1.8113 0.1046 1.0597 0.4823 0.9965 2.6186 -4.3596 0.1022 -6.0565 -0.5819 -2.2625 -1.0018 0.3049 -0.6891 0.6368 -1.722 0.1037 -1.4452 0.8463 0.5647 0.2909 -1.2353 -0.6082 -1.365 0.6187 -1.3805 2.8791 -3.8328 0.8598 -2.3004 0.9774 -0.933z" />
                    <polygon fill="#FEFEFE"
                        points="6.0639,4.1418 5.204,6.4422 5.4977,7.1815 6.6217,6.7187 6.6217,8.1952 7.3049,7.7104 7.6135,8.2393 8.2586,7.4916 8.0206,6.0308 8.6553,5.4393 7.6767,4.0909 7.64,3.0056 7.0412,3.2088" />
                    <polygon fill="#FEFEFE"
                        points="10.506,4.6328 9.7866,4.7685 10.6984,5.4539 10.7907,6.7013 10.7583,7.7417 11.3161,7.2916 11.6687,8.3715 12.4841,6.7847 12.8809,7.7104 13.7183,6.5423 14.2693,7.3137 14.9829,7.8952 14.4539,5.3422 14.9829,5.991 15.8291,5.2728 15.7102,3.7334 14.9038,0.1306 13.8531,0.7119 12.1086,2.4283 " />
                    <polygon fill="#e6e6e6"
                        points="7.6767,4.0909 7.64,3.0056 8.0828,3.5436 10.6984,5.4539 10.7907,6.7013 10.7583,7.7417 10.236,6.9831 10.0156,7.3799 9.8613,6.7187 9.3985,8.1512 9.2443,7.2476 8.5831,7.9528 8.2586,7.4916 8.0206,6.0308 8.6553,5.4393" />
                    <polygon fill="#e6e6e6"
                        points="15.7144,3.789 15.7102,3.7334 14.9038,0.1306 17.7604,4.1468 18.1129,5.2678 18.4803,5.8251 18.0375,6.4433 17.5306,5.5507 17.2662,6.333 16.4727,6.9392 16.5168,6.1236 15.9768,6.7518 14.9829,5.991 15.8291,5.2728" />
                </symbol>

                <symbol id="relief-vulcan-1" viewBox="-5 -10 110 110">
                    <ellipse fill="#999999" opacity=".5" cx="50" cy="64" rx="30" ry="4"></ellipse>
                    <path fill="#e6e7e8"
                        d="m 40.318,43.0945 1.2624,1.4851 2.2879,1.7295 3.6464,2.047 0.7864,2.661 1.4661,1.7722 2.5083,1.3532 2.7505,0.3824 4.548,2.8992 4.3962,2.9284 4.26,2.533 0.0746,0.7449 L 55.9019,63.906275 34.0507,63.6698 18.4326,63.9645 C 12.828851,63.668708 7.2014518,63.758742 1.6058,63.3217 l 6.2682,-4.7224 1.9305,-0.55 3.4543,-2.435 1.6264,-1.9274 1.8235,-2.4455 3.3521,-1.8555 3.2709,-1.0652 1.9097,-2.384 3.0893,-2.7945 c 3.9306,0.6688 7.9292,0.6208 11.9872,-0.0477 z" />
                    <path fill="#ccced1"
                        d="m 49.5039,15.24 c 4.126703,7.052655 8.039095,13.804219 12.155745,20.862742 1.488026,-0.891499 3.410852,-3.023567 6.036874,-2.472897 2.428268,0.509201 4.651275,-2.255062 4.159839,-4.78358 -0.217013,-2.829685 3.079909,-3.305126 3.604522,-5.767821 1.199165,-1.401687 4.285792,-0.670495 4.300237,-3.289515 1.317092,-3.046435 4.612248,0.247252 6.586644,0.779407 2.59062,0.607246 4.174976,-3.029778 6.829551,-2.126519 1.641144,0.31721 3.28076,-1.413401 4.889632,-0.472092 0.899819,-0.602875 2.556726,-1.262629 3.057376,-1.606987 -0.0938,-2.129258 -1.275026,-3.744355 -2.898687,-4.950311 0.231204,-1.150324 0.401964,-1.114283 -0.873573,-1.2106 C 95.554729,8.7767013 93.878043,7.2634405 91.390175,7.641688 89.344758,6.9717881 88.477997,4.4543316 86.10117,4.3466882 81.981911,3.3946205 77.938067,1.9937993 73.709246,1.6052857 71.108742,0.94989087 68.393797,-0.77510509 65.682632,0.42725723 63.303424,0.88219116 60.548455,-0.08283459 58.507815,1.5652706 c -2.11057,0.5972 -2.698897,2.7373648 -4.21029,4.0606937 -1.394921,1.4065359 0.4728,2.8050874 0.99098,3.5161668 C 53.757109,9.7455849 54.166,12.790671 51.884625,12.985492 51.002361,13.616529 50.47659,14.713814 49.5039,15.24 Z" />
                    <path fill="#babcbf"
                        d="m 49.5044,15.2403 c 1.872188,-0.138196 2.425637,-2.845949 4.57073,-2.201258 1.144577,-1.239645 1.265218,-3.6735644 2.316299,-4.609529 -2.750165,-1.309054 0.09506,-3.2190069 0.839232,-4.8872084 2.490924,-0.9535868 5.115499,-2.55017169 8.057631,-1.7612421 2.695454,-0.85754135 5.305909,0.7870874 7.773131,0.8026466 2.409706,0.8458431 4.451711,2.5306898 6.680161,3.7956721 2.296373,1.6938053 6.468639,1.0207559 6.988137,4.7481988 1.338125,1.622767 3.237548,3.048988 2.244679,5.537294 0.679868,3.02407 -3.661575,3.975327 -5.196628,1.728355 -2.133084,-2.611082 -5.551095,1.155994 -6.569356,2.71362 -2.323326,1.338206 -3.135934,3.85674 -5.292457,5.674255 -1.358773,2.083033 0.458567,5.947891 -3.336796,6.161344 -2.570722,-0.224246 -5.261874,-0.123487 -6.325269,2.757753 -1.891404,1.772211 -4.914889,1.91023 -7.451697,1.999909 -3.066782,0.108414 -6.090481,0.05214 -8.834187,1.704591 -2.2624,1.362577 -4.755417,2.854218 -5.662414,3.901477 -4.174179,1.077038 -7.897276,0.780504 -12.093528,0.04834 0,0 3.350593,-3.582697 3.163478,-5.042706 0.406132,-3.386301 3.499175,-5.702031 4.108846,-8.738619 0.971591,-2.557705 0.952214,-5.995887 2.953555,-7.863737 2.36467,-0.738408 4.092762,-2.156665 6.402735,-2.934491 0.879172,-2.130542 2.48838,-2.667714 4.663718,-3.534667 z" />
                    <path fill="#acafb1"
                        d="m 48.8842,16.8699 c -1.785997,0.666059 -3.779594,1.246295 -4.301192,3.452184 -0.540223,2.017352 -3.325715,0.423824 -4.4494,2.229627 -2.494158,-0.673487 -2.019728,1.842576 -2.548911,3.383955 -1.030703,1.62935 -1.137361,3.670141 -1.837647,5.502122 -1.455888,1.8507 -2.889787,3.789023 -3.24835,6.150212 -0.642322,1.376996 -2.934697,4.232379 -0.743197,5.002756 3.276226,0.386491 6.865778,0.297294 9.668135,-1.671956 1.992411,-0.789487 3.045587,-2.751047 4.759962,-3.9329 1.189858,-0.552573 2.437218,-0.990001 3.777113,-0.811 1.907845,-0.01586 3.785152,-0.37634 5.672187,0.08659 1.978298,0.05321 -0.985275,-1.72622 0.908237,-2.032705 1.474101,-0.686901 1.911031,0.604732 2.789914,1.139442 0.72917,-0.07521 2.250626,0.907421 2.007947,-0.440847 0.758787,-1.773464 1.770613,-4.072587 4.142983,-2.926051 2.333406,0.19823 4.47649,-1.394758 4.631923,-3.803654 0.362029,-1.471587 0.276981,-3.115583 2.276446,-2.98201 1.962019,-0.748148 2.294241,-3.385233 1.73135,-5.017763 -1.101666,-1.371396 0.2507,-2.912999 1.327975,-3.832219 C 76.753843,15.865967 76.05046,14.539717 75.8076,13.5526 75.093304,12.114215 75.790908,10.071743 73.619081,9.8482516 73.01701,8.9737297 73.441083,9.1741347 73.177475,8.0910547 73.369945,6.7516759 71.308021,6.5289859 70.544363,5.961525 69.388061,5.7732631 68.393705,5.6084929 67.935746,4.3663653 66.967743,3.8236661 65.71194,4.1429299 64.948956,3.4639047 63.291625,3.3657328 61.428814,3.5574961 60.282876,4.8581076 58.121173,5.7094079 58.85032,7.8874864 58.599915,9.5497793 57.986956,10.324235 56.222784,10.545705 57.2655,11.7578 c -1.231347,1.555102 -2.786541,2.706743 -4.5422,3.6878 -1.39291,0.193194 -2.512881,1.045804 -3.8391,1.4243 z" />
                    <path fill="#babcbf"
                        d="M62.0795 7.1509c-3.6626,10.7376 -8.7984,12.2353 -17.6693,17.6735 -3.1861,1.9533 -5.9317,3.3553 -6.0646,7.1857 -0.1229,3.5442 -4.6114,6.1599 -6.1924,10.645 1.2102,-4.6426 5.7709,-7.1396 5.8438,-10.622 0.0846,-4.0368 2.831,-5.5158 6.1732,-7.6137 8.6206,-5.4111 13.739,-6.9169 17.2433,-17.4406 0.0476,-0.1838 0.2352,-0.2944 0.419,-0.2468 0.1838,0.0476 0.2944,0.2352 0.2468,0.419z"
                        fill="#A9ABAE" />
                    <path fill="#babcbf"
                        d="M55.2664 26.6297c-0.3962,6.424 -6.9302,8.2863 -11.8461,10.3709 -3.1118,1.3196 -3.876,2.2974 -4.5665,5.5404 0.5003,-3.3107 1.3827,-4.3655 4.4858,-5.7312 4.7065,-2.0713 11.2241,-3.9743 11.5587,-10.1758 -0.0012,-0.1016 0.0803,-0.1849 0.1819,-0.1861 0.1016,-0.0012 0.1849,0.0802 0.1861,0.1819z"
                        fill="#A9ABAE" />
                    <path fill="#babcbf"
                        d="M77.8011 15.273c-9.036,5.077 -3.2037,7.3106 -11.9378,11.6614 -0.669,0.3332 -9.2121,4.0942 -8.7423,5.3387 -1.2201,-1.0082 8.3483,-5.6097 8.5733,-5.7275 8.4526,-4.4217 2.552,-6.5294 11.8181,-11.8967 0.1724,-0.0797 0.3767,-0.0046 0.4564,0.1678 0.0797,0.1724 0.0046,0.3767 -0.1678,0.4564z"
                        fill="#A9ABAE" />
                    <path fill="#babcbf"
                        d="M57.112 21.9726c-7.7181,2.2071 -6.6191,0.6747 -9.488,6.388 -1.8363,3.6568 -4.9682,3.61 -5.427,4.8676 -0.13,-1.0711 3.4686,-1.6665 5.0386,-5.0251 2.7917,-5.9721 1.9202,-4.5158 9.6561,-6.8819 0.1799,-0.0608 0.3751,0.0356 0.4359,0.2155 0.0608,0.1799 -0.0356,0.3751 -0.2155,0.4359z"
                        fill="#A9ABAE" />
                    <path fill="#babcbf"
                        d="M76.6844 8.0828c-1.4038,6.3969 -6.7659,5.3479 -9.1709,10.9842 -1.8722,4.3877 -5.6435,3.475 -7.1686,5.4454 0.5824,-1.7866 5.0761,-1.3574 6.763,-5.58 2.3337,-5.8416 7.6745,-4.9594 8.8951,-10.9432 0.0259,-0.1882 0.1994,-0.3198 0.3875,-0.2939 0.1882,0.0259 0.3198,0.1994 0.2939,0.3875z"
                        fill="#A9ABAE" />
                    <path fill="#babcbf" fill="#A9ABAE"
                        d="M68.804 3.1899c-1.0348,4.1371 -2.6419,2.8465 -3.0558,7.4307 -0.4114,4.556 0.4939,2.3646 -3.4931,6.4894 3.6446,-4.6394 2.7458,-1.9022 3.016,-6.5223 0.2786,-4.7653 1.9687,-3.5801 2.8522,-7.4959 0.0271,-0.188 0.2014,-0.3183 0.3894,-0.2912 0.188,0.0271 0.3183,0.2014 0.2912,0.3894z" />
                    <path fill="#d2d3d5"
                        d="m 45.7612,48.0915 c 0.0019,0.0017 0.0039,0.0034 0.0058,0.0051 z M 26.501,46.9652 c -0.0014,0.003 -0.0028,0.006 -0.0042,0.0091 z m -0.6925,6.4672 c -5e-4,0.0013 -0.0011,0.0025 -0.0015,0.0038 z m 3.1367,-7.2612 c 0.0012,0.0021 0.0023,0.0041 0.0034,0.006 z m 0.1546,-0.2241 c 0.0014,0.0016 0.0027,0.0032 0.004,0.0049 z m 11.8023,1.9363 c 1.373,1.0631 2.7431,2.1294 4.1107,3.1992 0.1277,0.1125 0.2003,0.2226 0.2528,0.3846 0.046,0.1653 0.0461,0.2971 0.0013,0.4626 0.0051,0.0308 -0.8731,3.3974 -0.9854,3.7918 0.0262,-0.0903 0.0364,-0.1684 0.0326,-0.2626 0,-1e-4 5e-4,0.0062 6e-4,0.0082 0.0971,1.2511 0.1578,2.4982 0.2127,3.7516 0.0056,0.1633 -0.0172,0.2888 -0.0799,0.4398 -0.068,0.1493 -0.1432,0.2507 -0.2667,0.3586 -1.1022,0.9093 -3.87315,3.1833 -5.05715,3.9851 -0.2016,0.1338 -1.34695,-0.0779 -1.34695,-0.0779 0,0 2.5301,-2.6917 3.2995,-3.4461 l 1.7344,-1.5281 -0.2456,-3.4034 c -0.0056,-0.1318 0.0122,-0.1998 0.0393,-0.3246 0.3683,-1.1652 0.7371,-2.3296 1.0991,-3.4969 0.0248,-0.0804 0.05,-0.1608 0.0745,-0.2413 -0.0416,0.1511 -0.0415,0.2728 0,0.424 0.0476,0.1477 0.1132,0.2503 0.2295,0.3531 0.0616,0.0741 -3.9595,-3.4677 -5.737,-5.1321 -1.049,-0.9821 -1.037925,-1.066622 -2.005425,-2.122022 0.874485,-1.222855 3.008176,1.61658 4.637125,2.876422 z M 25.9867,63.7102 24.4736,63.7063 c -0.7068,0.2897 -1.5241,0.5416 -1.3493,0.0369 0.0057,-0.0134 0.0117,-0.0268 0.018,-0.0403 l -5.0331,-0.0128 c -0.6658,0.3023 -1.4936,0.6221 -1.6134,0.382 -0.2698,0.0853 -0.5138,0.1089 -0.6058,-0.0392 -0.1007,0.0375 -0.2069,0.0561 -0.3294,0.0598 -3.3817,0.0568 -6.862,0.0909 -10.2354,-0.1242 -0.1254,-0.0092 -4.5764,-0.1163 -3.4882,-0.72 1.346,-0.6498 4.3583,-0.6611 5.8204,-0.7454 1.4794,-0.083 2.9452,-0.131 4.413,-0.1595 l 0.2745,-0.1779 1.8114,-0.4876 0.3962,-1.2597 1.3585,-0.5282 1.5849,-0.1219 0.9057,-0.6908 0.9907,0.1556 -0.0511,-0.1321 c -0.588,-1.52 -1.1666,-3.0439 -1.7546,-4.5636 -0.0788,-0.218 -0.0822,-0.3985 -0.0107,-0.619 0.0827,-0.2163 0.1994,-0.3552 0.3976,-0.475 1.9454,-1.0791 3.8873,-2.13 5.8532,-3.1704 0.2608,-0.1379 0.5286,-0.2704 0.7873,-0.4106 -0.1006,0.0615 -0.1643,0.1317 -0.2148,0.2383 0.8009,-1.5586 1.6239,-3.0427 2.4849,-4.5646 0.0075,-0.0127 0.4447,-0.7805 0.4932,-0.4277 -0.7053,1.7943 -1.423,3.5853 -2.1436,5.3734 -0.0377,0.0814 -0.0856,0.1346 -0.162,0.1814 -0.0038,0.0147 -3.4802,2.1749 -3.8212,2.3846 -0.8611,0.5295 -1.7259,1.0782 -2.5946,1.5922 0.1105,-0.0665 0.1754,-0.143 0.2219,-0.2634 0.0403,-0.1218 0.0392,-0.2242 -0.0042,-0.3451 0,0 1.7011,3.931 2.1937,5.1211 0.375,-0.2535 0.7509,-0.5077 1.1253,-0.7679 0.3836,-0.2665 0.7711,-0.529 1.1535,-0.7966 -0.1153,0.0867 -0.1888,0.179 -0.2457,0.3117 0.4471,-1.02 0.8899,-1.9723 1.3912,-2.9651 0.393,-0.7762 0.8307,-1.4288 1.315,-2.1416 0.0713,-0.0955 0.2279,-0.2771 0.3424,-0.1193 -0.3629,1.3549 -0.7445,2.7053 -1.1641,4.0438 -0.1514,0.4744 -0.304,0.9485 -0.4574,1.4223 0.4593,-0.2688 0.9217,-0.5383 1.3881,-0.8119 -0.1054,0.0651 -0.1795,0.1359 -0.2492,0.2382 0,0 1.0334,-1.5106 1.5453,-2.269 1.1687,-1.7312 2.359,-3.4283 3.5433,-5.1455 -0.0676,0.1077 -0.0967,0.2019 -0.1032,0.3288 -0.0011,0.1266 0.022,0.2209 0.0826,0.3321 0,0 -0.5188,-1.0154 -0.7725,-1.5191 -0.6463,-1.2824 -1.179,-2.5556 -1.7237,-3.8788 -0.0236,-0.0622 -0.2233,-0.5734 0.0354,-0.4899 l 0.0042,0.0061 c 0.0069,-1e-4 0.0144,2e-4 0.0225,9e-4 1.514,1.5564 3.015,3.1339 4.4842,4.7324 0.0963,0.1054 0.1984,0.2118 0.2914,0.3193 0.0803,0.1 0.1197,0.1924 0.1361,0.3197 0.0112,0.1282 -0.0078,0.2273 -0.0649,0.3425 0.0018,0.0089 -2.6532,5.6465 -2.9315,6.1963 0.0406,-0.0776 0.0633,-0.145 0.0785,-0.2313 0.0012,-0.0014 -0.1007,0.7978 -0.1313,1.0286 -0.1335,1.0053 -0.2936,2.0037 -0.4615,3.0037 -0.0279,0.1561 -0.0741,0.2699 -0.1621,0.4021 -0.0921,0.1286 -0.1829,0.2124 -0.3188,0.2933 -1.1877,0.6688 -2.3952,1.3313 -3.6449,1.8796 l 0.4111,0.492 z m -6.5129,-4.4641 0.1529,0.024 c 0.0522,-0.1289 0.1264,-0.2248 0.2441,-0.317 z m 3.4591,1.9275 0.1669,0.1797 1.0189,1.0972 0.1111,0.0418 c 0.5896,-0.4654 1.268,-0.8748 1.7208,-1.1858 0.7705,-0.5264 1.5677,-1.0478 2.3718,-1.5214 -0.1115,0.0662 -0.1849,0.1347 -0.2606,0.24 -0.0717,0.1074 -0.1107,0.2013 -0.1333,0.3285 -0.0468,0.0935 0.5059,-2.9473 0.6892,-4.0133 0.0173,-0.1008 0.0506,-0.2065 0.1008,-0.296 0.3756,-0.6714 0.7441,-1.3498 1.1113,-2.026 l 0.173,-0.3177 c -0.9648,1.6073 -1.9345,3.2117 -2.9136,4.8097 -0.0856,0.1257 -0.1702,0.2069 -0.2996,0.2869 -0.001,0.0025 -0.6916,0.4433 -0.766,0.4906 -0.994,0.6267 -2.0331,1.2685 -3.0904,1.8858 z m 21.6795,-14.158 c 0.8938,0.7045 1.7841,1.4134 2.6728,2.1244 0.0582,0.0528 0.0889,0.106 0.1073,0.1822 0.0015,0.0013 0.6917,2.6436 0.7444,2.8755 -0.0168,-0.0793 -0.0496,-0.1352 -0.1099,-0.1893 -5e-4,-0.0027 0.9606,0.7144 1.1481,0.8553 0.5241,0.394 1.0672,0.7868 1.5812,1.1913 -0.0521,-0.0424 -0.0995,-0.0679 -0.1631,-0.0891 0,0 3.5221,0.9115 4.3455,1.147 0.083,0.0255 0.1481,0.0567 0.2209,0.1039 0.0125,-0.0016 2.8665,1.7712 3.1975,1.9797 2.3623,1.4973 4.7629,3.0939 6.9724,4.8058 0.0017,0.0012 -0.1708,-0.0988 -0.2361,-0.0931 0,1e-4 0.3695,0.1055 0.506,0.1468 0.2054,0.0626 3.3876,0.8241 2.4806,1.2387 -0.9807,0.3718 -2.236,0.1163 -3.2507,-10e-5 -0.1089,-0.0211 -0.19,-0.054 -0.2837,-0.1131 -0.0037,9e-4 -0.9925,-0.5699 -1.0766,-0.6187 -3.1963,-1.8526 -6.1286,-3.9744 -9.1885,-6.0299 0.0634,0.0414 0.1231,0.0694 0.1952,0.0921 0,0 -0.2064,-0.0652 -0.3093,-0.0975 -1.3251,-0.4163 -2.6464,-0.8446 -3.9708,-1.2616 -0.1181,-0.0383 -0.2038,-0.0839 -0.3006,-0.1618 -0.8675,-0.737 -1.7257,-1.4772 -2.5786,-2.2309 -0.1496,-0.1302 -0.2295,-0.2639 -0.2718,-0.4578 -0.0675,-0.4205 -0.134,-0.841 -0.2,-1.2618 -0.0865,-0.5585 -0.1638,-1.1145 -0.2329,-1.6753 0.0245,0.1017 0.0673,0.1759 0.1449,0.2465 -0.6851,-0.7266 -1.33,-1.4546 -1.9886,-2.2027 -0.0335,-0.0396 -0.4475,-0.5208 -0.1554,-0.5067 z m -12.7976,3.4025 3e-4,0.0022 0.2813,0.3698 c -0.0897,-0.1126 -0.1331,-0.2168 -0.151,-0.3596 -0.0119,-0.1437 0.0091,-0.2542 0.0736,-0.3832 l -0.2041,0.3708 z m 2.5515,8.528 c -0.079,-0.6791 -0.1623,-1.358 -0.246,-2.0365 -0.0045,-0.0447 -0.0021,-0.0788 0.0092,-0.1223 0.0027,-0.0353 0.0543,-0.1046 0.0553,-0.1106 1.3536,-1.8017 2.691,-3.61 4.0031,-5.4423 -0.0257,0.0334 -0.0406,0.0629 -0.0529,0.1032 -0.0163,0.0319 -0.0071,0.0785 -0.0102,0.1119 -0.0031,0.0338 0.0234,0.0795 0.0318,0.1082 0.0193,0.037 0.0412,0.0646 0.0726,0.0921 -1.2585,-0.9711 -2.7186,-2.1244 -4.0785,-2.9358 -0.7384,-0.4627 -4.2016,-3.3514 -3.8525,-4.1363 1.5454,-0.4456 4.0924,2.1976 5.0112,3.1002 1.1274,1.1404 2.2598,2.2689 3.4112,3.3851 0.0487,0.0432 0.0796,0.0824 0.1099,0.1401 0.0273,0.0554 0.0412,0.1029 0.0477,0.1643 0.0051,0.062 5e-4,0.1096 -0.0159,0.1695 -0.0023,0.0241 -0.0621,0.146 -0.0804,0.1558 -1.5051,1.6933 -2.9505,3.3949 -4.3869,5.1465 -0.0067,0.0084 -0.0064,0.0108 -0.0109,0.019 -0.002,0.0035 -0.0023,0.022 -0.0025,0.0222 -0.0032,0.003 0.1569,1.8069 0.1717,1.9699 0.138,1.6198 0.2761,3.2396 0.4141,4.8594 -0.2003,-1.588 -0.4005,-3.1758 -0.6009,-4.7638 z" />
                    <path fill="#999999"
                        d="m 35.51055,43.935956 9.08155,7.730644 -1.1462,3.8206 0.191,3.8206 -5.34205,4.7118 L 68.4924,64.03675 68.2303,62.8856 55.0261,54.525 53.6509,54.3338 52.2757,54.1426 49.7674,52.7894 48.3013,51.0172 47.5149,48.3562 44.084,46.4303 41.7744,44.7264 40.229712,43.382062 c -1.841275,0.483307 -3.63078,0.512538 -4.719162,0.553894 z M 20.2129,59.3621 l -1.8114,-0.2845 2.1834,1.2358 0.7979,0.7999 -0.959,0.4474 0.8375,1.1781 -4.53735,1.23235 9.26255,-0.07345 -0.6792,-1.0003 -1.1888,-0.447 -2.1509,-2.3162 z" />
                    <polygon fill="#D2D3D5"
                        points="50.236,58.692 48.7077,58.3578 50.5499,59.8101 51.2231,60.7502 50.414,61.2759 51.1206,62.6605 48.3734,63.7782 55.1073,63.8021 54.5342,62.8469 53.5313,62.3216 51.7165,59.5994 " />
                    <path fill="#d82509"
                        d="m 28.9597,55.8827 -3e-4,-7e-4 0.102,-0.1141 c 0.7095,-0.7938 1.1291,-1.709 1.3673,-2.7399 0.4441,-1.9223 0.1983,-3.9097 0.552,-5.8266 l 0.0227,-0.1229 0.118,-0.0409 c 0.3547,-0.1229 0.8258,-0.6708 1.057,-0.9512 0.2835,-0.3437 0.6214,-0.625 1.0089,-0.8443 0.385,-0.2179 0.7072,0.2027 1.0282,0.3405 l 0.0789,0.0338 0.0338,0.0789 c 0.2416,0.5642 0.5103,1.1239 0.8237,1.6519 l 0.0907,0.1527 -2e-4,2e-4 0.0992,0.1532 c 0.4049,0.6249 0.8833,1.1924 1.5255,1.5823 0.3805,0.231 0.8447,0.3808 1.1939,0.6362 0.4213,0.3082 0.6037,0.7456 0.7127,1.2425 0.0232,0.1057 0.035,0.2133 0.0356,0.3215 0.004,0.7151 -0.4926,1.404 -0.9158,1.9426 -0.5364,0.6826 -1.1209,1.3191 -1.5873,2.0556 -0.0623,0.0984 -0.1223,0.1983 -0.1793,0.2997 0.3591,-0.5128 0.7694,-1.0011 1.0815,-1.3894 0.597,-0.7429 1.8668,-2.2306 1.6684,-3.2538 -0.0955,-0.4929 -0.2441,-0.9666 -0.6697,-1.269 -0.2045,-0.1453 -0.4512,-0.2524 -0.675,-0.366 C 37.2067,49.2904 36.9157,49.1116 36.6358,48.8751 35.65,48.042 34.983,46.6537 34.5165,45.4796 l -0.0312,-0.0787 0.0309,-0.0788 c 0.0575,-0.1467 0.0976,-0.3061 0.1304,-0.46 0.0188,-0.0878 0.0639,-0.1654 0.139,-0.2167 0.3391,-0.2316 1.0744,0.3829 1.3421,0.573 0.134,0.0951 0.7467,0.5358 0.8998,0.5153 0.006,-0.0011 0.0161,-0.0031 0.0254,-0.0057 -0.0063,-0.0703 -0.072,-0.2341 -0.0899,-0.2819 -0.1306,-0.3487 -0.186,-0.7283 0.2597,-0.8701 0.3919,-0.1247 1.0616,0.3491 1.3735,0.5575 l 0.0687,0.0459 0.0201,0.0801 c 0.0319,0.1267 0.0986,0.2402 0.1934,0.3302 l 0.0065,0.0061 0.006,0.0067 c 0.5613,0.6297 1.0214,1.3223 1.2439,2.1432 0.1504,0.5548 0.1551,1.0705 0.236,1.6278 0.1344,0.9256 0.5686,1.4808 1.2867,2.0653 l 0.076,0.0619 0.0032,0.1073 c 0.1951,1.3962 0.1355,2.692 -0.2097,4.057 -0.095,0.3755 -0.2103,0.7424 -0.3171,1.1133 0.1335,-0.3379 0.2582,-0.6792 0.3683,-1.0246 l 0.1751,-0.5491 -0.0068,-0.0292 0.0129,-0.0505 c 0.2457,-0.9604 0.3239,-1.8905 0.2794,-2.8817 L 42.0145,51.7 l 0.3886,0.3803 c 1.589,1.5547 2.8197,4.0309 3.8675,5.9879 l 0.046,0.0861 -0.0347,0.0913 c -0.0129,0.034 -0.0104,0.071 0.0051,0.1038 0.0333,0.0703 0.0577,0.1411 0.0801,0.2106 l 0.3472,-0.2532 -0.2451,0.6651 c -0.1448,0.3929 -0.8958,0.0591 -1.0196,1.3741 l -0.0085,0.0901 -0.0705,0.0569 c -0.1298,0.1045 -0.2606,0.2068 -0.3934,0.3062 0.1937,-0.1059 0.5175,-0.2853 0.5628,-0.3455 0.2534,-0.6225 0.4974,-0.9456 1.0363,-1.3216 l 0.1952,-0.1363 0.1152,0.2083 c 0.9415,1.7019 2.6189,4.7629 4.8509,4.8411 1.8489,0.0649 3.6982,-0.0051 5.5457,-0.1055 C 56.8057,63.9009 56.3281,63.8622 55.8505,63.8234 54.8227,63.7399 53.795,63.6564 52.7673,63.5715 52.4261,63.5433 52.0847,63.515 51.7435,63.4856 51.6551,63.478 51.3663,63.4649 51.2873,63.4361 49.9888,62.9617 49.0599,61.5255 48.4142,60.3744 47.5151,58.7717 46.7908,57.0538 45.9492,55.4166 45.0624,53.6915 43.9633,51.8274 42.4515,50.578 42.0411,50.2389 41.7521,49.8623 41.6229,49.3401 41.5271,48.9527 41.527,48.5361 41.491,48.1394 41.4433,47.6141 41.3387,47.1463 41.1368,46.6567 l -0.113,-0.2739 0.2955,-0.0218 c 0.27,-0.0199 1.4086,-0.1515 1.5077,-0.4652 -0.0764,-0.1356 -0.4904,-0.4531 -0.5998,-0.5359 -0.1825,-0.1381 -0.3691,-0.2704 -0.5527,-0.4069 -0.0634,-0.0473 -0.1291,-0.096 -0.1885,-0.1483 -0.0361,-0.0318 -0.0679,-0.0702 -0.0903,-0.1116 l -1.1606,-1.3652 c -3.9357,0.719 -8.11975,0.697825 -12.05695,-0.0029 l -0.77055,0.9418 -0.0242,0.0126 c -0.0419,0.0219 -0.0684,0.0645 -0.0695,0.1119 l -2e-4,0.0108 -0.0014,0.0107 c -0.3313,2.6921 -2.186,5.0844 -4.7021,6.0879 -0.517364,0.208407 -1.522972,0.817048 -1.750063,1.061794 C 21.041775,51.440231 22.2431,50.7746 22.6514,50.6203 c 0.947,-0.358 1.8103,-0.9067 2.5437,-1.6038 l 0.2229,-0.2118 -0.0015,-0.0058 0.0812,-0.0861 c 0.6171,-0.6547 1.1191,-1.4134 1.4816,-2.2368 l 0.0643,-0.146 0.1559,0.0194 c 0.278,-0.0154 0.9104,-1.3164 1.5016,-1.2446 0.4679,0.0568 1.6962,0.4935 1.8043,1.0044 0.0513,0.242 0.1297,0.564 0.2617,0.7755 l 0.0442,0.071 -0.0154,0.0822 c -0.555,2.949 0.3724,6.1837 -1.7661,8.7078 -0.4004,0.4725 -0.8121,0.9317 -1.2416,1.376 0.3453,-0.3457 0.6814,-0.6997 1.0106,-1.062 l 0.1611,-0.1773 z" />
                </symbol>

                <symbol id="relief-vulcan-2" viewBox="-5 -10 110 110">
                    <ellipse fill="#999999" opacity=".5" cx="50" cy="64" rx="30" ry="4"></ellipse>
                    <path fill="#e6e7e8"
                        d="m 40.318,43.0945 1.2624,1.4851 2.2879,1.7295 3.6464,2.047 0.7864,2.661 1.4661,1.7722 2.5083,1.3532 2.7505,0.3824 4.548,2.8992 4.3962,2.9284 4.26,2.533 0.0746,0.7449 L 55.9019,63.906275 34.0507,63.6698 18.4326,63.9645 C 12.828851,63.668708 7.2014518,63.758742 1.6058,63.3217 l 6.2682,-4.7224 1.9305,-0.55 3.4543,-2.435 1.6264,-1.9274 1.8235,-2.4455 3.3521,-1.8555 3.2709,-1.0652 1.9097,-2.384 3.0893,-2.7945 c 3.9306,0.6688 7.9292,0.6208 11.9872,-0.0477 z" />
                    <path fill="#d2d3d5"
                        d="m 45.7612,48.0915 c 0.0019,0.0017 0.0039,0.0034 0.0058,0.0051 z M 26.501,46.9652 c -0.0014,0.003 -0.0028,0.006 -0.0042,0.0091 z m -0.6925,6.4672 c -5e-4,0.0013 -0.0011,0.0025 -0.0015,0.0038 z m 3.1367,-7.2612 c 0.0012,0.0021 0.0023,0.0041 0.0034,0.006 z m 0.1546,-0.2241 c 0.0014,0.0016 0.0027,0.0032 0.004,0.0049 z m 11.8023,1.9363 c 1.373,1.0631 2.7431,2.1294 4.1107,3.1992 0.1277,0.1125 0.2003,0.2226 0.2528,0.3846 0.046,0.1653 0.0461,0.2971 0.0013,0.4626 0.0051,0.0308 -0.8731,3.3974 -0.9854,3.7918 0.0262,-0.0903 0.0364,-0.1684 0.0326,-0.2626 0,-1e-4 5e-4,0.0062 6e-4,0.0082 0.0971,1.2511 0.1578,2.4982 0.2127,3.7516 0.0056,0.1633 -0.0172,0.2888 -0.0799,0.4398 -0.068,0.1493 -0.1432,0.2507 -0.2667,0.3586 -1.1022,0.9093 -3.87315,3.1833 -5.05715,3.9851 -0.2016,0.1338 -1.34695,-0.0779 -1.34695,-0.0779 0,0 2.5301,-2.6917 3.2995,-3.4461 l 1.7344,-1.5281 -0.2456,-3.4034 c -0.0056,-0.1318 0.0122,-0.1998 0.0393,-0.3246 0.3683,-1.1652 0.7371,-2.3296 1.0991,-3.4969 0.0248,-0.0804 0.05,-0.1608 0.0745,-0.2413 -0.0416,0.1511 -0.0415,0.2728 0,0.424 0.0476,0.1477 0.1132,0.2503 0.2295,0.3531 0.0616,0.0741 -3.9595,-3.4677 -5.737,-5.1321 -1.049,-0.9821 -1.037925,-1.066622 -2.005425,-2.122022 0.874485,-1.222855 3.008176,1.61658 4.637125,2.876422 z M 25.9867,63.7102 24.4736,63.7063 c -0.7068,0.2897 -1.5241,0.5416 -1.3493,0.0369 0.0057,-0.0134 0.0117,-0.0268 0.018,-0.0403 l -5.0331,-0.0128 c -0.6658,0.3023 -1.4936,0.6221 -1.6134,0.382 -0.2698,0.0853 -0.5138,0.1089 -0.6058,-0.0392 -0.1007,0.0375 -0.2069,0.0561 -0.3294,0.0598 -3.3817,0.0568 -6.862,0.0909 -10.2354,-0.1242 -0.1254,-0.0092 -4.5764,-0.1163 -3.4882,-0.72 1.346,-0.6498 4.3583,-0.6611 5.8204,-0.7454 1.4794,-0.083 2.9452,-0.131 4.413,-0.1595 l 0.2745,-0.1779 1.8114,-0.4876 0.3962,-1.2597 1.3585,-0.5282 1.5849,-0.1219 0.9057,-0.6908 0.9907,0.1556 -0.0511,-0.1321 c -0.588,-1.52 -1.1666,-3.0439 -1.7546,-4.5636 -0.0788,-0.218 -0.0822,-0.3985 -0.0107,-0.619 0.0827,-0.2163 0.1994,-0.3552 0.3976,-0.475 1.9454,-1.0791 3.8873,-2.13 5.8532,-3.1704 0.2608,-0.1379 0.5286,-0.2704 0.7873,-0.4106 -0.1006,0.0615 -0.1643,0.1317 -0.2148,0.2383 0.8009,-1.5586 1.6239,-3.0427 2.4849,-4.5646 0.0075,-0.0127 0.4447,-0.7805 0.4932,-0.4277 -0.7053,1.7943 -1.423,3.5853 -2.1436,5.3734 -0.0377,0.0814 -0.0856,0.1346 -0.162,0.1814 -0.0038,0.0147 -3.4802,2.1749 -3.8212,2.3846 -0.8611,0.5295 -1.7259,1.0782 -2.5946,1.5922 0.1105,-0.0665 0.1754,-0.143 0.2219,-0.2634 0.0403,-0.1218 0.0392,-0.2242 -0.0042,-0.3451 0,0 1.7011,3.931 2.1937,5.1211 0.375,-0.2535 0.7509,-0.5077 1.1253,-0.7679 0.3836,-0.2665 0.7711,-0.529 1.1535,-0.7966 -0.1153,0.0867 -0.1888,0.179 -0.2457,0.3117 0.4471,-1.02 0.8899,-1.9723 1.3912,-2.9651 0.393,-0.7762 0.8307,-1.4288 1.315,-2.1416 0.0713,-0.0955 0.2279,-0.2771 0.3424,-0.1193 -0.3629,1.3549 -0.7445,2.7053 -1.1641,4.0438 -0.1514,0.4744 -0.304,0.9485 -0.4574,1.4223 0.4593,-0.2688 0.9217,-0.5383 1.3881,-0.8119 -0.1054,0.0651 -0.1795,0.1359 -0.2492,0.2382 0,0 1.0334,-1.5106 1.5453,-2.269 1.1687,-1.7312 2.359,-3.4283 3.5433,-5.1455 -0.0676,0.1077 -0.0967,0.2019 -0.1032,0.3288 -0.0011,0.1266 0.022,0.2209 0.0826,0.3321 0,0 -0.5188,-1.0154 -0.7725,-1.5191 -0.6463,-1.2824 -1.179,-2.5556 -1.7237,-3.8788 -0.0236,-0.0622 -0.2233,-0.5734 0.0354,-0.4899 l 0.0042,0.0061 c 0.0069,-1e-4 0.0144,2e-4 0.0225,9e-4 1.514,1.5564 3.015,3.1339 4.4842,4.7324 0.0963,0.1054 0.1984,0.2118 0.2914,0.3193 0.0803,0.1 0.1197,0.1924 0.1361,0.3197 0.0112,0.1282 -0.0078,0.2273 -0.0649,0.3425 0.0018,0.0089 -2.6532,5.6465 -2.9315,6.1963 0.0406,-0.0776 0.0633,-0.145 0.0785,-0.2313 0.0012,-0.0014 -0.1007,0.7978 -0.1313,1.0286 -0.1335,1.0053 -0.2936,2.0037 -0.4615,3.0037 -0.0279,0.1561 -0.0741,0.2699 -0.1621,0.4021 -0.0921,0.1286 -0.1829,0.2124 -0.3188,0.2933 -1.1877,0.6688 -2.3952,1.3313 -3.6449,1.8796 l 0.4111,0.492 z m -6.5129,-4.4641 0.1529,0.024 c 0.0522,-0.1289 0.1264,-0.2248 0.2441,-0.317 z m 3.4591,1.9275 0.1669,0.1797 1.0189,1.0972 0.1111,0.0418 c 0.5896,-0.4654 1.268,-0.8748 1.7208,-1.1858 0.7705,-0.5264 1.5677,-1.0478 2.3718,-1.5214 -0.1115,0.0662 -0.1849,0.1347 -0.2606,0.24 -0.0717,0.1074 -0.1107,0.2013 -0.1333,0.3285 -0.0468,0.0935 0.5059,-2.9473 0.6892,-4.0133 0.0173,-0.1008 0.0506,-0.2065 0.1008,-0.296 0.3756,-0.6714 0.7441,-1.3498 1.1113,-2.026 l 0.173,-0.3177 c -0.9648,1.6073 -1.9345,3.2117 -2.9136,4.8097 -0.0856,0.1257 -0.1702,0.2069 -0.2996,0.2869 -0.001,0.0025 -0.6916,0.4433 -0.766,0.4906 -0.994,0.6267 -2.0331,1.2685 -3.0904,1.8858 z m 21.6795,-14.158 c 0.8938,0.7045 1.7841,1.4134 2.6728,2.1244 0.0582,0.0528 0.0889,0.106 0.1073,0.1822 0.0015,0.0013 0.6917,2.6436 0.7444,2.8755 -0.0168,-0.0793 -0.0496,-0.1352 -0.1099,-0.1893 -5e-4,-0.0027 0.9606,0.7144 1.1481,0.8553 0.5241,0.394 1.0672,0.7868 1.5812,1.1913 -0.0521,-0.0424 -0.0995,-0.0679 -0.1631,-0.0891 0,0 3.5221,0.9115 4.3455,1.147 0.083,0.0255 0.1481,0.0567 0.2209,0.1039 0.0125,-0.0016 2.8665,1.7712 3.1975,1.9797 2.3623,1.4973 4.7629,3.0939 6.9724,4.8058 0.0017,0.0012 -0.1708,-0.0988 -0.2361,-0.0931 0,1e-4 0.3695,0.1055 0.506,0.1468 0.2054,0.0626 3.3876,0.8241 2.4806,1.2387 -0.9807,0.3718 -2.236,0.1163 -3.2507,-10e-5 -0.1089,-0.0211 -0.19,-0.054 -0.2837,-0.1131 -0.0037,9e-4 -0.9925,-0.5699 -1.0766,-0.6187 -3.1963,-1.8526 -6.1286,-3.9744 -9.1885,-6.0299 0.0634,0.0414 0.1231,0.0694 0.1952,0.0921 0,0 -0.2064,-0.0652 -0.3093,-0.0975 -1.3251,-0.4163 -2.6464,-0.8446 -3.9708,-1.2616 -0.1181,-0.0383 -0.2038,-0.0839 -0.3006,-0.1618 -0.8675,-0.737 -1.7257,-1.4772 -2.5786,-2.2309 -0.1496,-0.1302 -0.2295,-0.2639 -0.2718,-0.4578 -0.0675,-0.4205 -0.134,-0.841 -0.2,-1.2618 -0.0865,-0.5585 -0.1638,-1.1145 -0.2329,-1.6753 0.0245,0.1017 0.0673,0.1759 0.1449,0.2465 -0.6851,-0.7266 -1.33,-1.4546 -1.9886,-2.2027 -0.0335,-0.0396 -0.4475,-0.5208 -0.1554,-0.5067 z m -12.7976,3.4025 3e-4,0.0022 0.2813,0.3698 c -0.0897,-0.1126 -0.1331,-0.2168 -0.151,-0.3596 -0.0119,-0.1437 0.0091,-0.2542 0.0736,-0.3832 l -0.2041,0.3708 z m 2.5515,8.528 c -0.079,-0.6791 -0.1623,-1.358 -0.246,-2.0365 -0.0045,-0.0447 -0.0021,-0.0788 0.0092,-0.1223 0.0027,-0.0353 0.0543,-0.1046 0.0553,-0.1106 1.3536,-1.8017 2.691,-3.61 4.0031,-5.4423 -0.0257,0.0334 -0.0406,0.0629 -0.0529,0.1032 -0.0163,0.0319 -0.0071,0.0785 -0.0102,0.1119 -0.0031,0.0338 0.0234,0.0795 0.0318,0.1082 0.0193,0.037 0.0412,0.0646 0.0726,0.0921 -1.2585,-0.9711 -2.7186,-2.1244 -4.0785,-2.9358 -0.7384,-0.4627 -4.2016,-3.3514 -3.8525,-4.1363 1.5454,-0.4456 4.0924,2.1976 5.0112,3.1002 1.1274,1.1404 2.2598,2.2689 3.4112,3.3851 0.0487,0.0432 0.0796,0.0824 0.1099,0.1401 0.0273,0.0554 0.0412,0.1029 0.0477,0.1643 0.0051,0.062 5e-4,0.1096 -0.0159,0.1695 -0.0023,0.0241 -0.0621,0.146 -0.0804,0.1558 -1.5051,1.6933 -2.9505,3.3949 -4.3869,5.1465 -0.0067,0.0084 -0.0064,0.0108 -0.0109,0.019 -0.002,0.0035 -0.0023,0.022 -0.0025,0.0222 -0.0032,0.003 0.1569,1.8069 0.1717,1.9699 0.138,1.6198 0.2761,3.2396 0.4141,4.8594 -0.2003,-1.588 -0.4005,-3.1758 -0.6009,-4.7638 z" />
                    <path fill="#999999"
                        d="m 35.51055,43.935956 9.08155,7.730644 -1.1462,3.8206 0.191,3.8206 -5.34205,4.7118 L 68.4924,64.03675 68.2303,62.8856 55.0261,54.525 53.6509,54.3338 52.2757,54.1426 49.7674,52.7894 48.3013,51.0172 47.5149,48.3562 44.084,46.4303 41.7744,44.7264 40.229712,43.382062 c -1.841275,0.483307 -3.63078,0.512538 -4.719162,0.553894 z M 20.2129,59.3621 l -1.8114,-0.2845 2.1834,1.2358 0.7979,0.7999 -0.959,0.4474 0.8375,1.1781 -4.53735,1.23235 9.26255,-0.07345 -0.6792,-1.0003 -1.1888,-0.447 -2.1509,-2.3162 z" />
                    <polygon fill="#D2D3D5"
                        points="50.236,58.692 48.7077,58.3578 50.5499,59.8101 51.2231,60.7502 50.414,61.2759 51.1206,62.6605 48.3734,63.7782 55.1073,63.8021 54.5342,62.8469 53.5313,62.3216 51.7165,59.5994 " />
                    <path fill="#d82509"
                        d="m 28.9597,55.8827 -3e-4,-7e-4 0.102,-0.1141 c 0.7095,-0.7938 1.1291,-1.709 1.3673,-2.7399 0.4441,-1.9223 0.1983,-3.9097 0.552,-5.8266 l 0.0227,-0.1229 0.118,-0.0409 c 0.3547,-0.1229 0.8258,-0.6708 1.057,-0.9512 0.2835,-0.3437 0.6214,-0.625 1.0089,-0.8443 0.385,-0.2179 0.7072,0.2027 1.0282,0.3405 l 0.0789,0.0338 0.0338,0.0789 c 0.2416,0.5642 0.5103,1.1239 0.8237,1.6519 l 0.0907,0.1527 -2e-4,2e-4 0.0992,0.1532 c 0.4049,0.6249 0.8833,1.1924 1.5255,1.5823 0.3805,0.231 0.8447,0.3808 1.1939,0.6362 0.4213,0.3082 0.6037,0.7456 0.7127,1.2425 0.0232,0.1057 0.035,0.2133 0.0356,0.3215 0.004,0.7151 -0.4926,1.404 -0.9158,1.9426 -0.5364,0.6826 -1.1209,1.3191 -1.5873,2.0556 -0.0623,0.0984 -0.1223,0.1983 -0.1793,0.2997 0.3591,-0.5128 0.7694,-1.0011 1.0815,-1.3894 0.597,-0.7429 1.8668,-2.2306 1.6684,-3.2538 -0.0955,-0.4929 -0.2441,-0.9666 -0.6697,-1.269 -0.2045,-0.1453 -0.4512,-0.2524 -0.675,-0.366 C 37.2067,49.2904 36.9157,49.1116 36.6358,48.8751 35.65,48.042 34.983,46.6537 34.5165,45.4796 l -0.0312,-0.0787 0.0309,-0.0788 c 0.0575,-0.1467 0.0976,-0.3061 0.1304,-0.46 0.0188,-0.0878 0.0639,-0.1654 0.139,-0.2167 0.3391,-0.2316 1.0744,0.3829 1.3421,0.573 0.134,0.0951 0.7467,0.5358 0.8998,0.5153 0.006,-0.0011 0.0161,-0.0031 0.0254,-0.0057 -0.0063,-0.0703 -0.072,-0.2341 -0.0899,-0.2819 -0.1306,-0.3487 -0.186,-0.7283 0.2597,-0.8701 0.3919,-0.1247 1.0616,0.3491 1.3735,0.5575 l 0.0687,0.0459 0.0201,0.0801 c 0.0319,0.1267 0.0986,0.2402 0.1934,0.3302 l 0.0065,0.0061 0.006,0.0067 c 0.5613,0.6297 1.0214,1.3223 1.2439,2.1432 0.1504,0.5548 0.1551,1.0705 0.236,1.6278 0.1344,0.9256 0.5686,1.4808 1.2867,2.0653 l 0.076,0.0619 0.0032,0.1073 c 0.1951,1.3962 0.1355,2.692 -0.2097,4.057 -0.095,0.3755 -0.2103,0.7424 -0.3171,1.1133 0.1335,-0.3379 0.2582,-0.6792 0.3683,-1.0246 l 0.1751,-0.5491 -0.0068,-0.0292 0.0129,-0.0505 c 0.2457,-0.9604 0.3239,-1.8905 0.2794,-2.8817 L 42.0145,51.7 l 0.3886,0.3803 c 1.589,1.5547 2.8197,4.0309 3.8675,5.9879 l 0.046,0.0861 -0.0347,0.0913 c -0.0129,0.034 -0.0104,0.071 0.0051,0.1038 0.0333,0.0703 0.0577,0.1411 0.0801,0.2106 l 0.3472,-0.2532 -0.2451,0.6651 c -0.1448,0.3929 -0.8958,0.0591 -1.0196,1.3741 l -0.0085,0.0901 -0.0705,0.0569 c -0.1298,0.1045 -0.2606,0.2068 -0.3934,0.3062 0.1937,-0.1059 0.5175,-0.2853 0.5628,-0.3455 0.2534,-0.6225 0.4974,-0.9456 1.0363,-1.3216 l 0.1952,-0.1363 0.1152,0.2083 c 0.9415,1.7019 2.6189,4.7629 4.8509,4.8411 1.8489,0.0649 3.6982,-0.0051 5.5457,-0.1055 C 56.8057,63.9009 56.3281,63.8622 55.8505,63.8234 54.8227,63.7399 53.795,63.6564 52.7673,63.5715 52.4261,63.5433 52.0847,63.515 51.7435,63.4856 51.6551,63.478 51.3663,63.4649 51.2873,63.4361 49.9888,62.9617 49.0599,61.5255 48.4142,60.3744 47.5151,58.7717 46.7908,57.0538 45.9492,55.4166 45.0624,53.6915 43.9633,51.8274 42.4515,50.578 42.0411,50.2389 41.7521,49.8623 41.6229,49.3401 41.5271,48.9527 41.527,48.5361 41.491,48.1394 41.4433,47.6141 41.3387,47.1463 41.1368,46.6567 l -0.113,-0.2739 0.2955,-0.0218 c 0.27,-0.0199 1.4086,-0.1515 1.5077,-0.4652 -0.0764,-0.1356 -0.4904,-0.4531 -0.5998,-0.5359 -0.1825,-0.1381 -0.3691,-0.2704 -0.5527,-0.4069 -0.0634,-0.0473 -0.1291,-0.096 -0.1885,-0.1483 -0.0361,-0.0318 -0.0679,-0.0702 -0.0903,-0.1116 l -1.1606,-1.3652 c -3.9357,0.719 -8.11975,0.697825 -12.05695,-0.0029 l -0.77055,0.9418 -0.0242,0.0126 c -0.0419,0.0219 -0.0684,0.0645 -0.0695,0.1119 l -2e-4,0.0108 -0.0014,0.0107 c -0.3313,2.6921 -2.186,5.0844 -4.7021,6.0879 -0.517364,0.208407 -1.522972,0.817048 -1.750063,1.061794 C 21.041775,51.440231 22.2431,50.7746 22.6514,50.6203 c 0.947,-0.358 1.8103,-0.9067 2.5437,-1.6038 l 0.2229,-0.2118 -0.0015,-0.0058 0.0812,-0.0861 c 0.6171,-0.6547 1.1191,-1.4134 1.4816,-2.2368 l 0.0643,-0.146 0.1559,0.0194 c 0.278,-0.0154 0.9104,-1.3164 1.5016,-1.2446 0.4679,0.0568 1.6962,0.4935 1.8043,1.0044 0.0513,0.242 0.1297,0.564 0.2617,0.7755 l 0.0442,0.071 -0.0154,0.0822 c -0.555,2.949 0.3724,6.1837 -1.7661,8.7078 -0.4004,0.4725 -0.8121,0.9317 -1.2416,1.376 0.3453,-0.3457 0.6814,-0.6997 1.0106,-1.062 l 0.1611,-0.1773 z" />
                </symbol>

                <symbol id="relief-vulcan-3" viewBox="-5 -10 110 110">
                    <ellipse fill="#999999" opacity=".5" cx="50" cy="64" rx="30" ry="4"></ellipse>
                    <path fill="#e6e7e8"
                        d="m 40.318,43.0945 1.2624,1.4851 2.2879,1.7295 3.6464,2.047 0.7864,2.661 1.4661,1.7722 2.5083,1.3532 2.7505,0.3824 4.548,2.8992 4.3962,2.9284 4.26,2.533 0.0746,0.7449 L 55.9019,63.906275 34.0507,63.6698 18.4326,63.9645 C 12.828851,63.668708 7.2014518,63.758742 1.6058,63.3217 l 6.2682,-4.7224 1.9305,-0.55 3.4543,-2.435 1.6264,-1.9274 1.8235,-2.4455 3.3521,-1.8555 3.2709,-1.0652 1.9097,-2.384 3.0893,-2.7945 c 3.9306,0.6688 7.9292,0.6208 11.9872,-0.0477 z" />
                    <path fill="#d2d3d5"
                        d="m 45.7612,48.0915 c 0.0019,0.0017 0.0039,0.0034 0.0058,0.0051 z M 26.501,46.9652 c -0.0014,0.003 -0.0028,0.006 -0.0042,0.0091 z m -0.6925,6.4672 c -5e-4,0.0013 -0.0011,0.0025 -0.0015,0.0038 z m 3.1367,-7.2612 c 0.0012,0.0021 0.0023,0.0041 0.0034,0.006 z m 0.1546,-0.2241 c 0.0014,0.0016 0.0027,0.0032 0.004,0.0049 z m 11.8023,1.9363 c 1.373,1.0631 2.7431,2.1294 4.1107,3.1992 0.1277,0.1125 0.2003,0.2226 0.2528,0.3846 0.046,0.1653 0.0461,0.2971 0.0013,0.4626 0.0051,0.0308 -0.8731,3.3974 -0.9854,3.7918 0.0262,-0.0903 0.0364,-0.1684 0.0326,-0.2626 0,-1e-4 5e-4,0.0062 6e-4,0.0082 0.0971,1.2511 0.1578,2.4982 0.2127,3.7516 0.0056,0.1633 -0.0172,0.2888 -0.0799,0.4398 -0.068,0.1493 -0.1432,0.2507 -0.2667,0.3586 -1.1022,0.9093 -3.87315,3.1833 -5.05715,3.9851 -0.2016,0.1338 -1.34695,-0.0779 -1.34695,-0.0779 0,0 2.5301,-2.6917 3.2995,-3.4461 l 1.7344,-1.5281 -0.2456,-3.4034 c -0.0056,-0.1318 0.0122,-0.1998 0.0393,-0.3246 0.3683,-1.1652 0.7371,-2.3296 1.0991,-3.4969 0.0248,-0.0804 0.05,-0.1608 0.0745,-0.2413 -0.0416,0.1511 -0.0415,0.2728 0,0.424 0.0476,0.1477 0.1132,0.2503 0.2295,0.3531 0.0616,0.0741 -3.9595,-3.4677 -5.737,-5.1321 -1.049,-0.9821 -1.037925,-1.066622 -2.005425,-2.122022 0.874485,-1.222855 3.008176,1.61658 4.637125,2.876422 z M 25.9867,63.7102 24.4736,63.7063 c -0.7068,0.2897 -1.5241,0.5416 -1.3493,0.0369 0.0057,-0.0134 0.0117,-0.0268 0.018,-0.0403 l -5.0331,-0.0128 c -0.6658,0.3023 -1.4936,0.6221 -1.6134,0.382 -0.2698,0.0853 -0.5138,0.1089 -0.6058,-0.0392 -0.1007,0.0375 -0.2069,0.0561 -0.3294,0.0598 -3.3817,0.0568 -6.862,0.0909 -10.2354,-0.1242 -0.1254,-0.0092 -4.5764,-0.1163 -3.4882,-0.72 1.346,-0.6498 4.3583,-0.6611 5.8204,-0.7454 1.4794,-0.083 2.9452,-0.131 4.413,-0.1595 l 0.2745,-0.1779 1.8114,-0.4876 0.3962,-1.2597 1.3585,-0.5282 1.5849,-0.1219 0.9057,-0.6908 0.9907,0.1556 -0.0511,-0.1321 c -0.588,-1.52 -1.1666,-3.0439 -1.7546,-4.5636 -0.0788,-0.218 -0.0822,-0.3985 -0.0107,-0.619 0.0827,-0.2163 0.1994,-0.3552 0.3976,-0.475 1.9454,-1.0791 3.8873,-2.13 5.8532,-3.1704 0.2608,-0.1379 0.5286,-0.2704 0.7873,-0.4106 -0.1006,0.0615 -0.1643,0.1317 -0.2148,0.2383 0.8009,-1.5586 1.6239,-3.0427 2.4849,-4.5646 0.0075,-0.0127 0.4447,-0.7805 0.4932,-0.4277 -0.7053,1.7943 -1.423,3.5853 -2.1436,5.3734 -0.0377,0.0814 -0.0856,0.1346 -0.162,0.1814 -0.0038,0.0147 -3.4802,2.1749 -3.8212,2.3846 -0.8611,0.5295 -1.7259,1.0782 -2.5946,1.5922 0.1105,-0.0665 0.1754,-0.143 0.2219,-0.2634 0.0403,-0.1218 0.0392,-0.2242 -0.0042,-0.3451 0,0 1.7011,3.931 2.1937,5.1211 0.375,-0.2535 0.7509,-0.5077 1.1253,-0.7679 0.3836,-0.2665 0.7711,-0.529 1.1535,-0.7966 -0.1153,0.0867 -0.1888,0.179 -0.2457,0.3117 0.4471,-1.02 0.8899,-1.9723 1.3912,-2.9651 0.393,-0.7762 0.8307,-1.4288 1.315,-2.1416 0.0713,-0.0955 0.2279,-0.2771 0.3424,-0.1193 -0.3629,1.3549 -0.7445,2.7053 -1.1641,4.0438 -0.1514,0.4744 -0.304,0.9485 -0.4574,1.4223 0.4593,-0.2688 0.9217,-0.5383 1.3881,-0.8119 -0.1054,0.0651 -0.1795,0.1359 -0.2492,0.2382 0,0 1.0334,-1.5106 1.5453,-2.269 1.1687,-1.7312 2.359,-3.4283 3.5433,-5.1455 -0.0676,0.1077 -0.0967,0.2019 -0.1032,0.3288 -0.0011,0.1266 0.022,0.2209 0.0826,0.3321 0,0 -0.5188,-1.0154 -0.7725,-1.5191 -0.6463,-1.2824 -1.179,-2.5556 -1.7237,-3.8788 -0.0236,-0.0622 -0.2233,-0.5734 0.0354,-0.4899 l 0.0042,0.0061 c 0.0069,-1e-4 0.0144,2e-4 0.0225,9e-4 1.514,1.5564 3.015,3.1339 4.4842,4.7324 0.0963,0.1054 0.1984,0.2118 0.2914,0.3193 0.0803,0.1 0.1197,0.1924 0.1361,0.3197 0.0112,0.1282 -0.0078,0.2273 -0.0649,0.3425 0.0018,0.0089 -2.6532,5.6465 -2.9315,6.1963 0.0406,-0.0776 0.0633,-0.145 0.0785,-0.2313 0.0012,-0.0014 -0.1007,0.7978 -0.1313,1.0286 -0.1335,1.0053 -0.2936,2.0037 -0.4615,3.0037 -0.0279,0.1561 -0.0741,0.2699 -0.1621,0.4021 -0.0921,0.1286 -0.1829,0.2124 -0.3188,0.2933 -1.1877,0.6688 -2.3952,1.3313 -3.6449,1.8796 l 0.4111,0.492 z m -6.5129,-4.4641 0.1529,0.024 c 0.0522,-0.1289 0.1264,-0.2248 0.2441,-0.317 z m 3.4591,1.9275 0.1669,0.1797 1.0189,1.0972 0.1111,0.0418 c 0.5896,-0.4654 1.268,-0.8748 1.7208,-1.1858 0.7705,-0.5264 1.5677,-1.0478 2.3718,-1.5214 -0.1115,0.0662 -0.1849,0.1347 -0.2606,0.24 -0.0717,0.1074 -0.1107,0.2013 -0.1333,0.3285 -0.0468,0.0935 0.5059,-2.9473 0.6892,-4.0133 0.0173,-0.1008 0.0506,-0.2065 0.1008,-0.296 0.3756,-0.6714 0.7441,-1.3498 1.1113,-2.026 l 0.173,-0.3177 c -0.9648,1.6073 -1.9345,3.2117 -2.9136,4.8097 -0.0856,0.1257 -0.1702,0.2069 -0.2996,0.2869 -0.001,0.0025 -0.6916,0.4433 -0.766,0.4906 -0.994,0.6267 -2.0331,1.2685 -3.0904,1.8858 z m 21.6795,-14.158 c 0.8938,0.7045 1.7841,1.4134 2.6728,2.1244 0.0582,0.0528 0.0889,0.106 0.1073,0.1822 0.0015,0.0013 0.6917,2.6436 0.7444,2.8755 -0.0168,-0.0793 -0.0496,-0.1352 -0.1099,-0.1893 -5e-4,-0.0027 0.9606,0.7144 1.1481,0.8553 0.5241,0.394 1.0672,0.7868 1.5812,1.1913 -0.0521,-0.0424 -0.0995,-0.0679 -0.1631,-0.0891 0,0 3.5221,0.9115 4.3455,1.147 0.083,0.0255 0.1481,0.0567 0.2209,0.1039 0.0125,-0.0016 2.8665,1.7712 3.1975,1.9797 2.3623,1.4973 4.7629,3.0939 6.9724,4.8058 0.0017,0.0012 -0.1708,-0.0988 -0.2361,-0.0931 0,1e-4 0.3695,0.1055 0.506,0.1468 0.2054,0.0626 3.3876,0.8241 2.4806,1.2387 -0.9807,0.3718 -2.236,0.1163 -3.2507,-10e-5 -0.1089,-0.0211 -0.19,-0.054 -0.2837,-0.1131 -0.0037,9e-4 -0.9925,-0.5699 -1.0766,-0.6187 -3.1963,-1.8526 -6.1286,-3.9744 -9.1885,-6.0299 0.0634,0.0414 0.1231,0.0694 0.1952,0.0921 0,0 -0.2064,-0.0652 -0.3093,-0.0975 -1.3251,-0.4163 -2.6464,-0.8446 -3.9708,-1.2616 -0.1181,-0.0383 -0.2038,-0.0839 -0.3006,-0.1618 -0.8675,-0.737 -1.7257,-1.4772 -2.5786,-2.2309 -0.1496,-0.1302 -0.2295,-0.2639 -0.2718,-0.4578 -0.0675,-0.4205 -0.134,-0.841 -0.2,-1.2618 -0.0865,-0.5585 -0.1638,-1.1145 -0.2329,-1.6753 0.0245,0.1017 0.0673,0.1759 0.1449,0.2465 -0.6851,-0.7266 -1.33,-1.4546 -1.9886,-2.2027 -0.0335,-0.0396 -0.4475,-0.5208 -0.1554,-0.5067 z m -12.7976,3.4025 3e-4,0.0022 0.2813,0.3698 c -0.0897,-0.1126 -0.1331,-0.2168 -0.151,-0.3596 -0.0119,-0.1437 0.0091,-0.2542 0.0736,-0.3832 l -0.2041,0.3708 z m 2.5515,8.528 c -0.079,-0.6791 -0.1623,-1.358 -0.246,-2.0365 -0.0045,-0.0447 -0.0021,-0.0788 0.0092,-0.1223 0.0027,-0.0353 0.0543,-0.1046 0.0553,-0.1106 1.3536,-1.8017 2.691,-3.61 4.0031,-5.4423 -0.0257,0.0334 -0.0406,0.0629 -0.0529,0.1032 -0.0163,0.0319 -0.0071,0.0785 -0.0102,0.1119 -0.0031,0.0338 0.0234,0.0795 0.0318,0.1082 0.0193,0.037 0.0412,0.0646 0.0726,0.0921 -1.2585,-0.9711 -2.7186,-2.1244 -4.0785,-2.9358 -0.7384,-0.4627 -4.2016,-3.3514 -3.8525,-4.1363 1.5454,-0.4456 4.0924,2.1976 5.0112,3.1002 1.1274,1.1404 2.2598,2.2689 3.4112,3.3851 0.0487,0.0432 0.0796,0.0824 0.1099,0.1401 0.0273,0.0554 0.0412,0.1029 0.0477,0.1643 0.0051,0.062 5e-4,0.1096 -0.0159,0.1695 -0.0023,0.0241 -0.0621,0.146 -0.0804,0.1558 -1.5051,1.6933 -2.9505,3.3949 -4.3869,5.1465 -0.0067,0.0084 -0.0064,0.0108 -0.0109,0.019 -0.002,0.0035 -0.0023,0.022 -0.0025,0.0222 -0.0032,0.003 0.1569,1.8069 0.1717,1.9699 0.138,1.6198 0.2761,3.2396 0.4141,4.8594 -0.2003,-1.588 -0.4005,-3.1758 -0.6009,-4.7638 z" />
                    <path fill="#999999"
                        d="m 35.51055,43.935956 9.08155,7.730644 -1.1462,3.8206 0.191,3.8206 -5.34205,4.7118 L 68.4924,64.03675 68.2303,62.8856 55.0261,54.525 53.6509,54.3338 52.2757,54.1426 49.7674,52.7894 48.3013,51.0172 47.5149,48.3562 44.084,46.4303 41.7744,44.7264 40.229712,43.382062 c -1.841275,0.483307 -3.63078,0.512538 -4.719162,0.553894 z M 20.2129,59.3621 l -1.8114,-0.2845 2.1834,1.2358 0.7979,0.7999 -0.959,0.4474 0.8375,1.1781 -4.53735,1.23235 9.26255,-0.07345 -0.6792,-1.0003 -1.1888,-0.447 -2.1509,-2.3162 z" />
                    <polygon fill="#D2D3D5"
                        points="50.236,58.692 48.7077,58.3578 50.5499,59.8101 51.2231,60.7502 50.414,61.2759 51.1206,62.6605 48.3734,63.7782 55.1073,63.8021 54.5342,62.8469 53.5313,62.3216 51.7165,59.5994 " />
                </symbol>

                <symbol id="relief-hill-2" viewBox="-1 -3 8 8">
                    <ellipse fill="#999999" opacity=".5" cx="3.0804" cy="1.8791" rx="3.0744" ry=".3351" />
                    <path fill="#7C802D"
                        d="M2.7066 2.0352c0.0507,0.0053 0.0814,0.0276 0.1716,0.0338 0.5063,0.0345 1.5714,0.0602 1.9067,0.0573 0.3454,-0.1594 0.4516,-0.1236 0.1251,-0.4413 -0.142,-0.1383 -0.3857,-0.2685 -0.4449,-0.445l-0.3952 -0.6303c-0.5295,-0.5285 -0.6505,-0.7655 -1.3587,-0.4881 -0.2085,0.0816 -0.6755,0.0267 -0.8319,0.2634l-0.1064 0.0747 -0.1172 0.0235c-0.4027,0.2433 -1.165,0.8134 -1.4213,1.1357l-0.2345 0.2948c0.1493,0.0717 0.0843,-0.008 0.4743,0.0567 0.457,0.0758 1.0204,0.045 1.4852,0.0258 0.1785,-0.0098 0.537,0.0316 0.7472,0.0391z" />
                    <path fill="#5E6124"
                        d="M2.6023 1.0536l-0.1404 0.0308c-0.1027,-0.1205 -0.2075,-0.2115 -0.2284,-0.3454 0.2548,-0.0401 0.1212,0.0112 0.2376,0.0467 0.1308,0.0398 0.0619,-0.0292 0.1811,0.0262l-0.0304 0.1357c0.1886,-0.1811 0.0078,-0.3317 -0.0091,-0.4026 -0.0391,-0.1638 0.0917,-0.1773 -0.2157,-0.278l0.1861 -0.0674c0.2433,-0.035 0.4954,-0.2367 0.7563,-0.1135 0.0247,0.102 0.0491,0.0185 -0.0945,0.1211l0.0182 0.2066c-0.0141,0.1059 0.0214,0.1189 0.0442,0.3253 -0.0849,0.0574 -0.1571,0.0022 -0.3924,0.2133 -0.1145,0.1028 -0.0609,0.0901 -0.117,0.1998 -0.192,-0.0115 -0.1789,-0.0559 -0.1957,-0.0985zm-0.717 -0.6732l-0.1064 0.0747c0.1659,-0.0352 0.0405,0.0015 0.2126,-0.0977 -0.0471,0.132 0.0295,0.1113 -0.1292,0.147 0.1093,0.0256 0.0542,0.088 0.143,0.1483 0.1134,0.0768 0.07,-0.0567 0.1355,0.1927l-0.231 0.0709c0.1175,0.1045 0.2102,0.1537 0.2187,0.3233l0.2335 0.0166c0.0212,0.3138 -0.0008,0.1036 0.0938,0.288 -0.554,0.1197 -0.1053,0.1818 -0.5379,0.335 -0.5313,0.1882 -0.116,-0.0362 -0.443,0.0326 -0.1434,0.0301 0.042,0.0205 -0.1569,0.0776l-0.0709 -0.1517c-0.0704,0.0825 -0.0367,0.0712 -0.147,0.1121 0.0237,-0.1353 0.0127,-0.0754 0.074,-0.1815 -0.1955,0.0511 -0.2431,0.1394 -0.2816,0.1683 -0.0758,-0.1022 -0.0395,-0.1305 -0.0228,-0.2436 -0.0666,0.0899 -0.3259,0.3423 -0.4274,0.1727 -0.0695,-0.1162 -0.0185,-0.0281 0.0143,-0.1466 -0.1384,0.0024 -0.1035,0.0215 -0.188,0.0967 -0.2089,0.1858 -0.1663,0.0597 -0.1691,0.0577 0.0822,-0.0433 0.0401,-0.051 0.0728,-0.1743l-0.1664 0.2098c0.1493,0.0716 0.0843,-0.0081 0.4743,0.0567 0.457,0.0758 1.0205,0.045 1.4852,0.0258l0.2521 0.0105c0.1099,-0.1237 0.2927,-0.0773 0.3491,-0.2155 0.0325,-0.0796 -0.0427,-0.0474 0.0393,-0.1802 0.0476,-0.0772 0.0738,-0.0848 0.1196,-0.1692 0.0972,0.0672 0.0236,-0.0283 0.0457,0.087 0.0974,-0.1136 0.0149,-0.095 0.1424,-0.1444 0.1799,0.2885 0.0065,0.2566 0.0484,0.3883l0.0449 0.1411 -0.1289 0.1598 0.2942 0.0283c0.0014,0.0015 1.6042,0.0246 1.6183,0.0245 0.3455,-0.1594 0.4516,-0.1235 0.1251,-0.4413 -0.142,-0.1383 -0.3857,-0.2685 -0.4449,-0.445l-0.3951 -0.6303c-0.5295,-0.5285 -0.6505,-0.7655 -1.3587,-0.4881 -0.2085,0.0816 -0.6755,0.0267 -0.8319,0.2634zm2.0893 0.8485c-0.203,-0.0475 -0.2461,-0.0572 -0.4053,-0.1224 0.037,0.0786 0.0872,0.1597 0.1271,0.2001 0.0069,0.007 0.4081,0.2545 0.0286,0.445 -0.0839,0.0421 0.05,0.0436 -0.0589,0.0158 -0.0212,-0.0749 -0.0325,-0.0905 0.0023,-0.1597 0.0447,-0.0888 -0.0636,-0.0997 0.1045,-0.0457l-0.0386 -0.0823c-0.0716,0.036 -0.1018,0.0039 -0.2222,0.0017 -0.3664,-0.0067 -0.1122,0.0492 -0.3972,-0.175 0.0735,-0.1454 0.116,-0.1461 0.207,-0.2434 0.0858,-0.1015 0.0882,-0.0059 0.3605,-0.0787 0.3528,-0.0923 0.2015,0.1027 0.3341,-0.0568l0.063 0.121c-0.1281,-0.0194 -0.145,-0.0264 -0.2099,0.0097 0.0084,0.0865 0.0021,0.101 0.005,0.1029l0.0999 0.0679z" />
                </symbol>

                <symbol id="relief-hill-3" viewBox="-1 -17 55 55">
                    <ellipse fill="#999999" opacity=".5" cx="34.078" cy="14.5565" rx="17.5383" ry="2.4977" />
                    <path fill="#7C802D"
                        d="M9.5101 10.696c-1.1371,-0.616 -2.0817,0.8736 -2.3778,1.983 2.316,1.1116 1.9087,-0.5195 7.8443,1.2694 1.893,0.5705 5.3152,2.5047 7.2126,2.0188 0.7716,0.8915 -0.8074,0.2993 1.3361,0.9441 0.9262,0.2787 1.3524,0.1052 2.2303,-0.0233 4.793,-0.0412 7.0949,-0.2386 11.5203,-0.7434l9.7932 -2.476c0.058,-0.0401 0.1681,-0.1253 0.2451,-0.1968 -1.0428,-2.3377 -2.2374,-2.3426 -3.6846,-3.9623l-2.5719 -2.6229c-2.3783,-2.3827 -2.1842,-1.4462 -4.5382,-2.9906 -2.2547,-1.4793 -3.7909,-3.6402 -7.2099,-3.8961l-1.3963 0c-0.1659,0.0108 -0.3346,0.026 -0.5081,0.045 -2.9309,0.3275 -4.9194,0.7402 -7.3265,2.2081 -1.2629,0.7705 -1.0411,1.1393 -2.1929,1.1886 -2.1831,0.0949 -6.7923,-4.2893 -9.5649,0.1226 -1.5845,-0.5314 -1.9841,0.1518 -4.761,1.5807 -1.4169,0.7288 -3.1099,1.4918 -3.5599,3.176 1.6951,0.3942 2.4781,1.1593 4.7551,1.1713 1.6962,1.1225 3.5935,-0.5488 4.7551,1.2038z" />
                    <path fill="#5E6124"
                        d="M8.321 3.5643c1.3481,-0.5748 2.6842,-1.4527 3.9644,-1.2288 1.6561,1.0005 0.7922,0.3254 1.2266,2.7948 2.0888,0.0081 0.0933,-0.2196 2.2281,-0.3487 -0.892,0.7179 -0.9283,0.7283 -1.8719,1.7596l-2.3903 -0.7678c0.6073,1.6523 0.9847,1.9825 -0.7277,3.888 -0.0607,0.0678 -0.1708,0.1822 -0.2212,0.237 -0.0515,0.0553 -0.1648,0.147 -0.2267,0.2375 1.8529,-1.3361 2.7769,-1.6376 3.824,-2.7341 1.3556,-1.4202 1.7125,-1.5481 3.8148,-2.8886 3.2367,-2.0628 4.5246,-3.4715 9.8192,-3.7427 3.2389,0.0944 3.0377,0.7809 5.5457,2.0215 -0.5997,1.3828 0.4956,-0.1779 -1.6973,1.0981 3.3951,0.3883 1.9624,1.9847 3.766,1.906l0.9397 -0.116c0.4799,0.0428 1.4934,0.468 2.1311,0.6366 0.019,2.3203 0.4289,3.9227 0.597,6.4615 -1.7699,-0.6176 -1.3887,-0.9506 -2.8333,-1.8301 -0.9273,-0.5645 -2.0411,-0.8085 -3.15,-1.1978 0.8551,0.9175 0.9457,0.5368 1.9299,1.1523 0.969,0.6062 1.1333,1.0872 1.8242,1.7835l-1.3307 0.6377c-0.0607,0.0304 -0.1892,0.09 -0.2755,0.148 1.1523,0.7619 1.7352,0.783 2.7959,1.61 -0.815,0.5932 -0.2343,0.2527 -0.7272,1.0628l9.7932 -2.476c0.058,-0.0401 0.1681,-0.1253 0.2451,-0.1968 -1.0428,-2.3377 -2.2374,-2.3426 -3.6846,-3.9623l-2.5719 -2.6229c-2.3783,-2.3827 -2.1842,-1.4462 -4.5382,-2.9906 -2.2547,-1.4793 -3.7909,-3.6402 -7.2099,-3.8961l-1.3963 0c-0.1659,0.0108 -0.3346,0.026 -0.5081,0.045 -2.9309,0.3275 -4.9194,0.7402 -7.3265,2.2081 -1.2629,0.7705 -1.0411,1.1393 -2.1929,1.1886 -2.1831,0.0949 -6.7923,-4.2893 -9.5649,0.1226z" />
                </symbol>

                <symbol id="relief-hill-4" viewBox="-0.3 -2 5 5">
                    <ellipse fill="#999999" opacity=".5" cx="2.6747" cy="1.0184" rx="1.9077" ry=".342" />
                    <path fill="#5E6124"
                        d="M2.2044 1.3541c-0.1954,-0.0321 -0.4239,0.0192 -0.6394,0.0064 -0.199,-0.0118 -0.3908,-0.0241 -0.5739,-0.0608 -0.0888,-0.01 -0.1874,-0.0432 -0.2716,-0.0656 -0.0826,-0.0219 -0.1876,-0.0277 -0.2635,-0.0505 -0.0536,-0.0161 -0.0695,-0.0305 -0.119,-0.0399 -0.0517,-0.0098 -0.0881,-0.0106 -0.1393,-0.0285 -0.0673,-0.0236 -0.1656,-0.0681 -0.1977,-0.1154 0.0201,-0.0316 0.0837,-0.0955 0.1144,-0.1309 0.1504,-0.1731 0.3051,-0.3572 0.5179,-0.4616 0.0654,-0.0321 0.1139,-0.0438 0.1651,-0.0802 0.0565,-0.0401 0.0848,-0.067 0.1373,-0.1072 0.0217,-0.0166 0.05,-0.0352 0.0699,-0.053 0.0345,-0.0309 0.0185,-0.032 0.0682,-0.0525 0.0626,-0.0548 0.1482,-0.0752 0.2398,-0.1026 0.1339,-0.0134 0.1379,-0.0191 0.2832,0.0039 0.0944,0.0149 0.1869,0.0288 0.2822,0.0441 0.2056,0.0328 0.3306,0.0881 0.4927,0.1654l0.1875 0.075c0.0209,-0.0159 0.023,0.0033 0,-0.0213 0.0257,0.006 0.0563,0.0125 0.0816,0.0194 0.0833,0.0185 0.1814,0.0344 0.2806,0.0163 0.1007,-0.0184 0.123,-0.0498 0.2495,-0.0498 0.3406,-0.0001 0.5977,0.1486 0.8473,0.3509 0.0315,0.0256 0.0537,0.0398 0.0763,0.0734 0.0448,0.0667 0.1432,0.2195 0.1361,0.2972 -0.2027,0.1549 -0.5328,0.094 -0.7013,0.1811 -0.0616,0.0318 -0.154,0.0618 -0.198,0.1013 -0.0952,0.0855 -0.0629,0.057 -0.2107,0.0749 -0.2659,0.0323 -0.0629,0.0115 -0.262,0.009 -0.0936,-0.0011 -0.1844,0.0171 -0.2669,0.0346 -0.035,0.0074 -0.2023,-0.0064 -0.2742,-0.0064 -0.0102,-0.0046 -0.0204,-0.0076 -0.0311,-0.0125 -0.0313,-0.0145 -0.018,-0.0082 -0.0332,-0.0185l-0.0477 0.0043z" />
                    <path fill="#7C802D"
                        d="M2.5582 0.2788c0.0257,0.006 0.0563,0.0125 0.0816,0.0194l-0.0467 0.0148c0.0989,0.0238 0.1701,0.0383 0.2783,0.0346 0.0927,-0.0032 0.1605,-0.0355 0.2563,-0.0416 0.0059,0.0681 0.0125,0.0546 0.0803,0.0661l0.3034 0.0735c0.2633,0.0879 0.1601,0.091 0.2872,0.1905 -0.0072,-0.0011 -0.2077,-0.1381 -0.2253,-0.0385 -0.007,0.0395 -0.0011,0.0619 0.043,0.0938 0.0291,0.0211 0.0671,0.0438 0.088,0.0405 -0.0384,0.0004 -0.0569,0.0018 -0.0921,-0.004 -0.024,-0.0039 0.0064,-0.0164 -0.0725,-0.0038 -0.0034,0.0005 -0.0099,0.0081 -0.0124,0.0042 -0.0042,-0.0066 -0.0582,0.0303 0.0019,0.1273 -0.0375,-0.0202 -0.0361,-0.0156 -0.0868,-0.0167 -0.0071,0.0087 -0.0283,0.0056 -0.0238,0.0831 -0.0556,0.0012 -0.0535,0.009 -0.0913,0.0299 0.0024,0.077 0.0051,0.0621 0.0496,0.0999 0.0394,0.0335 0.0647,0.125 0.1648,0.0333l0.0588 -0.0499c0,0 0.0278,0.0448 0.0854,0.0231 0.0806,-0.0303 0.0129,-0.1125 0.0099,-0.1178 0.0355,0.0244 0.0617,0.086 0.0845,0.1037 0.0046,0.0035 -0.0166,0.0192 0.0438,0.016 0.0518,-0.0028 0.0194,0.008 0.0396,-0.0218 0.0158,-0.0234 0.0088,-0.0578 0.0079,-0.0856 0.0039,0.0148 0.0561,0.1419 0.1436,0.1089 0.0935,-0.0353 -0.0041,-0.1155 -0.0211,-0.1773 0.0367,0.0117 0.0589,0.0515 0.0853,0.0766 0.0256,0.0244 0.1168,0.0761 0.1231,-0.0023l0.027 0.0273c-0.2027,0.1549 -0.5328,0.094 -0.7013,0.1811 -0.0616,0.0318 -0.154,0.0618 -0.198,0.1013 -0.0952,0.0855 -0.0629,0.057 -0.2107,0.0749 -0.2659,0.0323 -0.0629,0.0115 -0.262,0.009 -0.0936,-0.0011 -0.1844,0.0171 -0.2669,0.0346 -0.035,0.0074 -0.2023,-0.0064 -0.2742,-0.0064 -0.0102,-0.0046 -0.0204,-0.0076 -0.0311,-0.0125 -0.0313,-0.0145 -0.018,-0.0082 -0.0332,-0.0185 0.0891,0.0002 0.081,0.01 0.1771,-0.0035 0.0554,-0.0078 0.0792,0.0219 0.1781,0.0153 -0.0012,-0.1141 -0.0431,-0.1159 -0.0838,-0.1919 0.0736,0.0596 0.1594,0.1743 0.2952,0.1568 0.0087,-0.0222 0.019,-0.061 0.0253,-0.0724 0.0339,0.0425 0.0832,0.0686 0.1632,0.0681 0.0244,-0.0261 0.0098,0.0013 0.0138,-0.048 0.0333,0.0216 0.031,0.0326 0.0777,0.0235 0.076,-0.0149 0.0343,-0.0074 0.0465,-0.0393 -0.0461,-0.0577 -0.023,-0.0086 -0.0857,-0.0409l0.0014 -0.2034c-0.0355,0.0147 -0.0311,0.0231 -0.0523,0.0541 -0.0025,-0.0025 -0.0053,-0.0064 -0.0067,-0.0081l-0.169 -0.2127c-0.0859,-0.0724 -0.0239,-0.1127 -0.123,-0.0992l0.0251 0.0999c-0.1164,-0.0645 0.0039,-0.0841 -0.2276,-0.1398 -0.0076,-0.0589 0.0139,-0.0981 -0.0272,-0.134 -0.0531,-0.0464 -0.014,0.0293 -0.1724,-0.0642 0.0111,-0.0489 0.1259,-0.0586 0.032,-0.1513 -0.0164,-0.0162 -0.0359,-0.0275 -0.0442,-0.03l0.0589 0.004c0.0321,-0.0062 0.0135,0.0017 0.0356,-0.0132 0.0008,-0.0636 0.0089,-0.0413 -0.0194,-0.0945l0.1875 0.075c0.0209,-0.0159 0.023,0.0033 0,-0.0213zm-0.3538 1.0753c-0.1954,-0.0321 -0.4239,0.0192 -0.6394,0.0064 -0.199,-0.0118 -0.3908,-0.0241 -0.5739,-0.0608 -0.0888,-0.01 -0.1874,-0.0432 -0.2716,-0.0656 -0.0826,-0.0219 -0.1876,-0.0277 -0.2635,-0.0505 -0.0536,-0.0161 -0.0695,-0.0305 -0.119,-0.0399 -0.0517,-0.0098 -0.0881,-0.0106 -0.1393,-0.0285 -0.0673,-0.0236 -0.1656,-0.0681 -0.1977,-0.1154 0.0201,-0.0316 0.0837,-0.0955 0.1144,-0.1309 0.1504,-0.1731 0.3051,-0.3572 0.5179,-0.4616 0.0654,-0.0321 0.1139,-0.0438 0.1651,-0.0802 0.0565,-0.0401 0.0848,-0.067 0.1373,-0.1072 0.0217,-0.0166 0.05,-0.0352 0.0699,-0.053 0.0345,-0.0309 0.0185,-0.032 0.0682,-0.0525 0.0626,-0.0548 0.1482,-0.0752 0.2398,-0.1026 0.0123,0.038 0,0.0906 0.0726,0.0885 0.0489,-0.0014 0.0688,-0.0207 0.1504,-0.0092 0.1236,0.0175 0.1629,0.0134 0.2608,0.0655 -0.1347,0.3666 0.1384,0.2279 0.2222,0.2672 -0.0111,0.128 -0.062,-0.0039 -0.1137,0.1523 -0.0107,0.0323 0.0054,0.0077 -0.0132,0.034 -0.0641,-0.0115 -0.1919,-0.0698 -0.2164,-0.001 -0.0343,0.0963 0.0971,0.1029 0.151,0.1324 -0.027,0.0223 -0.0775,0.0132 -0.1011,0.0376 -0.0221,0.023 -0.0184,0.0643 -0.0172,0.1052l0.0784 0.0476c-0.0095,0.0791 -0.0071,0.0636 0.0043,0.144 -0.1394,-0.0074 -0.0164,-0.047 -0.164,-0.0413 -0.0305,0.1067 0.0115,-0.0011 0.0135,0.2172 -0.034,0.0162 -0.0766,0.0336 -0.0801,0.0769 0.0768,0.0049 0.0838,-0.0031 0.1494,-0.0132 0.0783,-0.012 0.066,0.0121 0.1545,0.0122 0.1465,0 0.2584,-0.0519 0.3406,0.0265z" />
                </symbol>

                <symbol id="relief-hill-5" viewBox="-5 -17 39 39">
                    <ellipse fill="#999999" opacity=".5" cx="18.5104" cy="8.2102" rx="11.6925" ry="2.0964" />
                    <path fill="#7C802D"
                        d="M2.6664 8.569l6.6798 1.0468c1.4368,0.1034 1.6554,-0.5235 4.6148,-0.5235l3.4373 0.5804c2.3733,0.4005 4.8164,-0.0146 7.2145,-0.5751 0.893,-0.209 1.8708,-0.4082 2.0891,-1.2267 -0.6616,-0.4433 -3.0827,-0.9749 -3.4846,-1.2219l-3.9205 -4.6365c-1.6138,-1.5379 -2.386,-2.5369 -5.0705,-1.7203 -1.2608,0.3838 -2.6905,1.3614 -3.9599,1.9773 -0.9728,0.4719 -0.5971,-0.1545 -1.818,0.0743 -1.0217,0.1913 -1.2501,0.6291 -1.4676,1.1634 -2.2544,0.5262 -1.6372,0.4547 -3.4443,1.9663 -0.9647,0.8068 -3.2527,1.1607 -3.5364,2.2228l0.6095 0.2632 2.0569 0.6095z" />
                    <path fill="#5E6124"
                        d="M6.9807 3.5071c0.8323,-0.3105 1.0225,-0.6742 1.5214,-0.5228 -0.1684,0.4101 -0.1168,0.2931 -0.4328,0.582 -1.3408,1.2267 -0.4657,0.4693 -0.8362,1.7841 -0.4626,1.6418 -2.0311,1.1235 -2.0325,1.1235l0.0086 1.2088c-1.2701,-0.2257 -0.6401,-0.6776 -2.5429,0.8863 1.5832,0.7156 4.745,0.7674 6.6798,1.0468l2.1397 -0.914c-0.3337,-0.6582 -0.1337,-0.027 -0.3091,-0.8347 -0.4497,-2.0724 -0.3922,-0.2204 -0.0607,-2.8923 0.0067,-0.0798 0.0244,-0.1027 0.0533,-0.1459 0.2861,0.1328 0.5641,-0.224 0.5274,1.2952 -0.0105,0.4366 -0.1068,0.385 0.0406,0.8233 0.1839,0.5467 0.0712,0.2508 0.348,0.4693 -0.1223,-0.8276 0.1904,-1.5961 -0.0399,-2.3841 -0.1354,-0.4636 -0.3659,-0.461 -0.284,-2.0483l1.209 -0.5235c-0.9178,-0.4863 -1.294,-0.0822 -2.2687,0.0891l2.9155 -1.7906c1.1801,-0.417 2.3153,-0.8054 3.3989,-0.106l0.3676 0.7225c-0.5436,0.2446 -1.1201,0.39 -2.0258,0.3786 -0.562,0.7683 -0.8409,0.6506 -1.1381,0.8811 0.0779,1.2646 -0.0929,0.5594 0.5414,1.1361 1.0146,0.9226 0.1753,1.4158 0.0537,1.6489l-0.0229 0.9993c-1.8749,0.1574 -0.8842,0.3953 -1.0724,1.7156 -0.8787,0.3071 -0.4001,0.4079 -1.3277,0.1376l0.0762 0.2778 1.4927 0.5417c0.2479,0.2778 2.7858,0.5028 3.4373,0.5804 2.3898,0.2859 4.8164,-0.0146 7.2145,-0.5751 0.893,-0.209 1.8708,-0.4082 2.0891,-1.2267 -0.6616,-0.4433 -3.0827,-0.9749 -3.4846,-1.2219l-3.9205 -4.6365c-1.6138,-1.5379 -2.386,-2.5369 -5.0705,-1.7203 -1.3728,0.4175 -2.5522,1.2943 -3.9599,1.9773 -0.9728,0.4717 -0.5971,-0.1545 -1.818,0.0743 -1.0217,0.1913 -1.2501,0.6291 -1.4676,1.1634z" />
                </symbol>

                <symbol id="relief-dune-2" viewBox="-5 -17 40 40">
                    <ellipse fill="#999999" opacity=".5" cx="17.1027" cy="5.3226" rx="17.1027" ry=".5194" />
                    <polygon fill="#D8B976"
                        points="15.2112,0 22.8169,2.667 30.4225,5.334 15.2112,5.334 -0,5.334 7.6057,2.667" />
                    <path fill="#6D5924"
                        d="M15.2112 0c-0.1987,1.1209 -3.4329,1.1587 -1.0819,2.2964 1.1972,0.5794 -1.7799,1.4239 -1.9267,1.5482 -0.5158,0.4369 -3.2959,1.0761 -3.4438,1.4894l6.4524 0 15.2113 0 -7.6057 -2.667 -7.6057 -2.667z" />
                </symbol>

                <symbol id="relief-deciduous-2" viewBox="-27 -25 70 70">
                    <ellipse fill="#999999" opacity=".5" cx="9.3273" cy="18.4825" rx="5.534" ry="1.0889" />
                    <polygon fill="#7C5125"
                        points="8.6754,13.1329 9.4092,11.4084 10.6975,12.1523 8.8545,14.6027 9.3274,18.4825 6.2627,18.4825 6.8826,13.3966 5.2563,11.2344 6.4063,10.5705 7.0983,12.1967 8.2623,12.1967 8.5971,10.4211 9.2152,10.5814 8.5924,12.4519" />
                    <path fill="#676A27"
                        d="M 7.15625,0.001953 C 5.947743,0.051633 4.777378,0.866372 4.541016,2.291016 1.697616,1.720116 1.251953,5.136719 1.251953,5.136719 0.715975,5.415425 -0.025896,6.473322 0,7.443359 0.02091,8.22648 0.328216,8.934547 0.853516,9.435547 c -0.08115,0.334708 -0.002,1.216797 -0.002,1.216797 0.575571,2.696047 4.099448,3.07453 5.234376,0.447265 1.003399,0.3758 2.118546,0.375554 3.123046,0.002 0.0961,1.432601 1.233993,2.55516 2.746094,2.566407 1.485443,0.01105 2.604681,-1.013788 2.738281,-2.486328 1.9961,-0.5986 2.626179,-3.12715 1.142579,-4.59375 0.411446,-1.23286 0.403633,-1.864377 -0.51171,-2.949274 C 14.962812,3.227083 14.592119,2.82906 13.603479,2.761711 13.005579,1.152311 11.087816,0.485048 9.626916,1.347648 9.059872,0.387598 8.096163,-0.036697 7.156213,0.001945 Z" />
                    <path fill="#5E6124"
                        d="m 15.287006,3.6862427 c 0.780869,0.8257791 0.968452,1.9254248 0.493751,2.9018573 1.4836,1.4666 0.908743,3.9945 -1.087357,4.5931 -0.1336,1.3952 -1.3087,2.4863 -2.7389,2.4863 -1.4569,0 -2.6492,-1.1324 -2.7453,-2.565 C 8.2047,11.4761 7.0895,11.4745 6.0861,11.0987 5.0853,13.6233 1.48555,13.303294 0.92815,10.649694 6.1764485,10.111351 12.017072,7.3675453 15.287006,3.6862427 Z" />
                </symbol>

                <symbol id="relief-deciduous-3" viewBox="-27 -25 70 70">
                    <ellipse opacity=".5" fill="#999999" ry="1.0889" rx="5.5339999" cy="18.4825" cx="9.3273001" />
                    <polygon fill="#7c5125"
                        points="10.6975,12.1523 8.8545,14.6027 9.3274,18.4825 6.2627,18.4825 6.8826,13.3966 5.2563,11.2344 6.4063,10.5705 7.0983,12.1967 8.2623,12.1967 8.5971,10.4211 9.2152,10.5814 8.5924,12.4519 8.6754,13.1329 9.4092,11.4084 " />
                    <path fill="#676a27"
                        d="M 7.15625,0.001953 C 5.947743,0.051633 4.777378,0.866372 4.541016,2.291016 1.697616,1.720116 1.251953,5.136719 1.251953,5.136719 0.715975,5.415425 -0.025896,6.473322 0,7.443359 0.02091,8.22648 0.328216,8.934547 0.853516,9.435547 c -0.08115,0.334708 -0.002,1.216797 -0.002,1.216797 0.575571,2.696047 4.099448,3.07453 5.234376,0.447265 1.003399,0.3758 2.118546,0.375554 3.123046,0.002 0.0961,1.432601 1.233993,2.55516 2.746094,2.566407 1.485443,0.01105 2.604681,-1.013788 2.738281,-2.486328 1.9961,-0.5986 2.626179,-3.12715 1.142579,-4.59375 0.411446,-1.23286 0.403633,-1.864377 -0.51171,-2.949274 C 14.962812,3.227083 14.592119,2.82906 13.603479,2.761711 13.005579,1.152311 11.087816,0.485048 9.626916,1.347648 9.059872,0.387598 8.096163,-0.036697 7.156213,0.001945 Z" />
                    <path fill="#5e6124"
                        d="m 15.287006,3.6862427 c 0.780869,0.8257791 0.968452,1.9254248 0.493751,2.9018573 1.4836,1.4666 0.908743,3.9945 -1.087357,4.5931 -0.1336,1.3952 -1.3087,2.4863 -2.7389,2.4863 -1.4569,0 -2.6492,-1.1324 -2.7453,-2.565 C 8.2047,11.4761 7.0895,11.4745 6.0861,11.0987 5.0853,13.6233 1.48555,13.303294 0.92815,10.649694 6.1764485,10.111351 12.017072,7.3675453 15.287006,3.6862427 Z" />
                    <g fill="#d82e32">
                        <circle r=".5" cy="8.3897734" cx="2.4284508" />
                        <circle r=".5" cy="7.3032885" cx="7.146461" />
                        <circle r=".5" cy="7.5826468" cx="13.668243" />
                        <circle r=".5" cy="10.326545" cx="11.61261" />
                        <circle r=".5" cy="6.656527" cx="10.684683" />
                        <circle r=".5" cy="3.3609581" cx="7.6241026" />
                        <circle r=".5" cy="5.1369228" cx="3.9471674" />
                        <circle r=".5" cy="4.1185794" cx="11.777494" />
                        <circle r=".5" cy="10.220185" cx="4.8988838" />
                    </g>
                </symbol>

                <symbol id="relief-conifer-2" viewBox="-29 -22 72 72">
                    <ellipse fill="#999999" ry="1.0889" rx="5.534" cy="22.0469" cx="9.257" opacity=".5" />
                    <rect fill="#7c5125" height="3.8506" width="2.5553999" y="18.378901" x="6.1294999" />
                    <path fill="#798136"
                        d="M 7.4340812,0.00390625 2.7791,8.1383 l 1.8745,0 -2.8102,4.7786 1.4306,0 -3.274,5.7789 3.7081,0 -0.0157,0.1578 -0.163,1.6315 1.3679,-0.9533 1.1999,-0.836 1.3546874,-0.01105 z" />
                    <path fill="#5e6124"
                        d="m 10.4603,8.1383 2.7736,4.7786 -1.5107,0 3.2298,5.7789 -3.5851,0 c 0.0635,0.63718 0.127242,1.274336 0.1909,1.9115 L 10.1909,19.654 8.8229,18.7009 C 8.399397,18.690076 7.8667262,18.6958 7.4072,18.6958 L 7.43,0 12.1753,8.1383 Z" />
                </symbol>

                <symbol id="relief-coniferSnow-1" viewBox="-40 -33 100 100">
                    <polygon fill="#5E6124"
                        points="13.0568,9.9964 16.3335,15.6419 14.5424,15.6419 18.358,22.469 14.0011,22.469 14.2482,24.9424 12.2712,23.5647 10.6985,22.469 8.8946,22.469 8.9674,9.9964 8.9613,9.9964 9.1622,0 15.0838,9.9964" />
                    <ellipse fill="#999999" opacity=".5" cx="11.2836" cy="26.2254" rx="6.5378" ry="1.2864" />
                    <rect fill="#7C5125" x="7.5889" y="21.8921" width="3.0189" height="4.549" />
                    <polygon fill="#798136"
                        points="9.4642,22.469 7.6143,22.469 6.249,23.4203 4.2719,24.7981 4.5045,22.469 -0,22.469 3.8679,15.6419 2.1713,15.6419 5.4911,9.9964 3.2788,9.9964 9.1622,0" />
                    <path fill="#FEFEFE"
                        d="M9.1645 0.1661l-5.5338 9.6278 2.2145 0 -3.32 5.6454 1.6901 0 -3.8679 6.8272 4.3807 0 -0.0186 0.1863 -0.1925 1.9275 1.616 -1.1263 1.4176 -0.9875 1.7114 0c0.0137,-7.5342 -0.0142,-14.9526 -0.0976,-22.1004z" />
                    <path fill="#ECF7FD"
                        d="M12.7052 9.7939l3.2767 5.6454 -1.7848 0 3.8157 6.8272 -4.2354 0 0.033 0.3307 0.1925 1.9275 -1.616 -1.1263 -1.6161 -1.1259 0.0107 -0.006 -1.6832 0c0.0431,-7.3795 0.0651,-14.7237 0.0662,-22.1004l5.5668 9.6278 -2.0261 0z" />
                    <path fill="#798136" stroke="#798136" stroke-width=".2031"
                        d="M5.382 6.7803l1.2028 -0.4597 0.6743 0.7591 1.1928 -0.7537 0.6886 -0.4869 -0.0236 3.9382 -0.5649 -0.2914 -0.1883 -1.2452 -0.9216 1.4585 -0.5957 -0.869 -0.7633 1.4914 -0.2378 -0.5275 -2.2145 0 1.7513 -3.0137zm-0.6538 15.4862l-4.3807 0 1.2894 -2.276 1.6825 -0.6717 0.8906 1.9392 1.5138 -1.2771 0.6564 1.6879 2.7348 -2.4729 -0.0168 3.0706 -1.5476 0 -3.2789 2.5317 0.1949 -0.9859 0.2616 -1.5457zm-0.5128 -6.8272l-1.6901 0 1.4587 -2.4804 1.1049 0.4388 1.5138 -1.2771 0.6564 1.688 1.8856 -1.9374 -0.0278 4.6349 -0.8247 -1.2329 -1.1045 1.5003 -0.6628 -1.7146 -0.4418 0.9377 -0.7375 -0.0447 -1.8214 0.7077 0.6913 -1.2203z" />
                    <path fill="#5E6124" stroke="#5E6124" stroke-width=".2031"
                        d="M14.0011 22.469l4.3568 0 -1.7839 -2.7767 -1.5377 0.887 -0.7993 -0.7413 -0.8708 1.3664 -1.4648 -0.7323 -1.2246 -1.4677 -0.4951 1.9892 -1.0681 -1.5476 -0.0154 2.8204 1.6832 0 3.2215 2.2582 -0.0018 -2.0557zm-1.1308 -15.8666l-0.7194 -0.6033 -1.0493 0.4018 -1.9613 -0.5619 -0.0236 3.9382 0.8802 -1.233 1.1046 1.5004 0.6627 -1.7147 0.4418 0.9377 0.7733 -0.6162 1.9024 1.2841 -2.0115 -3.3332zm1.3696 8.837l1.742 0 -1.4841 -2.5568 -1.2975 0.5152 -1.0494 -0.6698 -1.0493 0.4019 -1.957 -1.2587 0.0278 4.6349 0.8246 -1.2329 1.1046 1.5003 0.6627 -1.7146 0.4418 0.9377 0.7733 -0.6163 1.9024 1.2841 -0.642 -1.2251z" />
                </symbol>

                <symbol id="relief-acacia-2" viewBox="-25 -25 70 70">
                    <ellipse fill="#999999" opacity=".5" cx="11.8845" cy="14.9969" rx="9.8385" ry=".9674" />
                    <polygon fill="#7C5125"
                        points="10.5615,11.0945 10.5829,11.0945 12.2991,7.8722 10.169,4.0939 10.3125,4.0095 12.478,7.5361 13.4213,5.7652 13.4149,5.6589 13.4148,5.6586 13.4149,5.6586 13.3389,4.3771 13.6356,4.3312 13.934,5.5138 17.4746,4.5262 17.5871,4.7584 13.7287,6.092 11.3715,11.2549 11.3489,15.121 9.7272,15.121 10.2179,12.7528 7.0146,6.7865 2.9196,5.5604 2.9861,5.3123 6.8814,6.2337 6.9778,4.8164 7.2348,4.8164 7.3396,6.359 7.7405,6.9989 9.0507,3.8628 9.3276,3.9662 8.1262,7.6071 8.1199,7.6047 10.4554,11.3337 10.548,11.1601 " />
                    <path fill="#798136" stroke="#798136" stroke-width=".2"
                        d="M19.1214 5.4391c0.5257,0.1242 0.9419,0.0529 1.079,-0.2328 0.2248,-0.4681 -0.3854,-1.3347 -1.363,-1.9355 -0.2439,-0.1499 -0.4875,-0.2689 -0.7194,-0.3561 -0.3005,-0.7087 -1.5134,-1.4638 -3.0393,-1.8272 -0.9235,-0.22 -1.7867,-0.2549 -2.4361,-0.1335 -0.4996,-0.6097 -1.8962,-0.9589 -3.5411,-0.8166 -2.0623,0.1784 -3.7343,1.0619 -3.7373,1.9739 -0.2951,-0.0263 -0.6121,-0.0223 -0.9401,0.017 -1.2604,0.1508 -2.2744,0.7703 -2.4902,1.4642 -0.0553,0.0313 -0.1106,0.0641 -0.166,0.0981 -1.1534,0.7089 -1.8734,1.7313 -1.6082,2.2836 0.1971,0.4105 0.8831,0.4457 1.6957,0.1458 -0.5575,0.11 -0.9948,0.03 -1.1427,-0.2575 -0.2519,-0.4902 0.432,-1.3974 1.5277,-2.0263 0.0525,-0.0302 0.1053,-0.0591 0.1577,-0.0869 0.2049,-0.6158 1.1682,-1.1656 2.3657,-1.2994 0.3116,-0.0349 0.6127,-0.0385 0.893,-0.0151 0.0029,-0.8093 1.5913,-1.5931 3.5505,-1.7515 1.5626,-0.1263 2.8895,0.1836 3.364,0.7246 0.6169,-0.1076 1.4369,-0.0766 2.3142,0.1185 1.4496,0.3224 2.6018,0.9923 2.8873,1.6212 0.2203,0.0774 0.4517,0.1832 0.6833,0.3162 0.9287,0.5331 1.5084,1.302 1.2948,1.7174 -0.0934,0.1817 -0.3232,0.2658 -0.6298,0.258z" />
                    <path fill="#5E6124" stroke="#5E6124" stroke-width=".2"
                        d="M17.24 4.6771c0.136,0.1019 0.2845,0.1998 0.443,0.2908 0.9287,0.5331 1.8546,0.6285 2.0681,0.2131 0.3808,-0.7405 -1.3199,-1.8023 -1.9781,-2.0335 -0.6052,-1.333 -3.794,-1.9852 -5.2015,-1.7397 -1.2498,-1.425 -6.9085,-0.6433 -6.9145,1.0269 -1.0033,-0.0836 -2.9136,0.277 -3.2587,1.3145 -0.5348,0.2836 -2.068,1.3687 -1.6854,2.1132 0.4575,0.8898 2.5826,-0.2585 3.1902,-0.7762 0.5807,0.0788 1.2092,0.0303 1.7764,-0.1188 0.9067,0.5316 2.4273,0.3711 2.9534,-0.6075 1.2601,0.574 3.2016,0.6057 4.5418,0.2512 1.1523,0.2578 2.8891,0.2519 4.0653,0.0661z" />
                </symbol>

                <symbol id="relief-palm-2" viewBox="-27 -25 70 70">
                    <ellipse fill="#999999" opacity=".5" cx="10.1381" cy="16.686" rx="6.176" ry="1.0271" />
                    <path fill="#798136"
                        d="M11.289 0.09c-1.2071,0.9898 -2.5231,2.5278 -3.1763,3.6163 -0.0463,-0.0865 -0.0877,-0.1708 -0.126,-0.2537l-6.5578 -1.8672c2.4316,-1.0619 4.8486,-1.347 6.2847,1.0194 -0.3892,-2.3401 2.8747,-2.8412 3.5754,-2.5147zm-11.289 7.6813l7.6896 -3.943c-3.1531,-1.6911 -7.1655,0.9025 -7.6896,3.943zm4.8314 3.1553c1.6467,-1.9 2.7841,-3.9718 2.7217,-6.4483 -3.3941,1.1324 -3.7342,4.899 -2.7217,6.4483zm6.5246 -0.3669c-1.8863,-2.4506 0.0568,-3.042 -3.0585,-5.9451 3.3784,-0.3062 5.1525,1.8059 3.0585,5.9451zm4.0962 -4.9207c-2.5616,-0.0001 -4.7634,-0.6542 -6.7787,-1.6477 4.523,-1.795 6.6868,0.7704 6.7787,1.6477zm1.1549 -4.3378l-7.9602 2.6334c0.8957,-3.4641 5.2694,-3.6955 7.9602,-2.6334z" />
                    <path fill="#7C5125"
                        d="M8.8323 5.3c0.3946,0 0.7145,-0.3199 0.7145,-0.7145 0,-0.3946 -0.3199,-0.7145 -0.7145,-0.7145 -0.0253,0 -0.0503,0.0013 -0.0749,0.0039 0.0473,-0.0954 0.0738,-0.203 0.0738,-0.3167 0,-0.3946 -0.3199,-0.7145 -0.7145,-0.7145 -0.3946,0 -0.7145,0.3199 -0.7145,0.7145 0,0.0844 0.0148,0.1653 0.0416,0.2405 -0.0427,-0.008 -0.087,-0.0122 -0.1321,-0.0122 -0.3946,0 -0.7145,0.3199 -0.7145,0.7145 0,0.3946 0.3199,0.7145 0.7145,0.7145 0.2723,0 0.509,-0.1524 0.6296,-0.3764 0.7194,3.9586 0.8226,7.8738 0.1215,11.7329l1.2482 0.0022c0.2847,-3.6277 0.2392,-7.3464 -0.6033,-11.2851 0.0404,0.0072 0.0821,0.0109 0.1246,0.0109z" />
                </symbol>

                <symbol id="relief-grass-2" viewBox="-50 -50 130 130">
                    <path fill="#669A2C"
                        d="M8.006 9.9689c0.01,0.1224 0.2562,0.6142 0.3168,0.7806 0.1951,0.5354 0.1473,0.2936 0.0182,0.823 -0.0735,0.3015 -0.1633,0.593 -0.2331,0.8796 -0.0469,0.1924 -0.1471,0.7957 -0.2314,0.9 -0.2344,-0.4506 -0.4442,-0.9086 -0.6939,-1.3471 -0.1591,-0.2793 -0.6042,-1.0566 -0.8075,-1.2337 -0.027,0.3721 0.3191,1.9295 0.4091,2.2876 0.2439,0.9703 0.4829,1.7317 0.7253,2.648 0.0492,0.1862 0.0075,0.4256 -0.003,0.6304 -0.0445,0.8712 -0.0559,1.7966 0.0131,2.6635 0.0307,0.3842 0.1223,0.8417 0.1284,1.2016l0.1024 0.5881c0.0029,0.0075 0.0086,0.0171 0.0112,0.0231 0.0026,0.0061 0.0069,0.0161 0.0121,0.0229 -0.0201,0.1409 0.3189,1.5864 0.3765,1.7054 0.0612,0.1268 0.0114,0.0405 0.0791,0.0918l-0.0379 -1.2668 0.0028 -1.5257c0.0722,-0.204 -0.0201,-1.142 0.0982,-1.4492l0.4611 1.6129c0.1818,0.5322 0.3534,1.028 0.5451,1.5638 0.0597,-0.071 0.0533,-0.0927 0.071,-0.2157 0.1947,-1.3511 0.0668,-2.8802 -0.189,-4.1914 -0.0678,-0.3476 -0.1555,-0.6369 -0.241,-0.9833 -0.0601,-0.2431 -0.2712,-0.7233 -0.2313,-0.9674 0.0582,-0.357 0.1448,-0.6613 0.2123,-1.0091 0.0546,-0.2811 0.1565,-0.7292 0.2424,-0.9837 0.1078,0.1108 0.4968,1.7381 0.5634,2.0399 0.3158,1.4317 0.4477,3.1118 0.644,4.58 0.0302,0.226 0.2616,2.1642 0.3146,2.3266 0.0248,-0.0338 0.0036,0.0249 0.0403,-0.076 0.0751,-0.2062 0.2653,-1.3853 0.2934,-1.5866 0.3244,-2.3247 0.1769,-5.002 -0.5336,-7.1701 -0.2609,-0.7959 -0.3821,-1.096 -0.7028,-1.7968 -0.0741,-0.162 -0.1159,-0.1782 -0.0489,-0.3857l0.4829 -1.5332c0.0488,-0.156 0.2436,-0.6378 0.256,-0.7337l0.1925 2.3718c0.0494,0.7686 0.1347,1.5966 0.2136,2.3623 0.0805,0.7816 0.1609,1.5731 0.2173,2.339 0.058,0.7884 0.183,1.5648 0.2406,2.343 0.0575,0.776 0.1742,1.5495 0.2513,2.3048l0.7845 6.9541c0.0617,-0.1477 0.9814,-6.953 0.9883,-7.0128 0.0893,-0.7707 0.2394,-1.5785 0.3252,-2.3506 0.112,0.5882 0.1575,1.1641 0.3065,1.7461 0.0398,0.1551 0.3674,1.4344 0.5327,1.5545l0.0617 -2.3153c0.0245,-0.3683 0.0303,-0.7359 0.0476,-1.1077 0.0447,-0.964 0.1773,-2.2719 0.3848,-3.1701 0.0875,-0.379 0.3809,-1.6006 0.5287,-1.8412 0.132,0.2798 0.2531,1.6127 0.2982,2.009 0.1201,1.0555 0.1258,3.4769 0.0559,4.556l-0.1185 2.2153c0.251,0.0329 0.9582,0.1558 1.1849,0.1215 0.0303,-0.0714 0.1058,-0.6785 0.1264,-0.8113 0.2594,-1.6732 0.4863,-3.3522 0.7616,-5.0316 0.0214,-0.1304 0.0473,-0.2766 0.0686,-0.4156 0.0157,-0.1018 0.0233,-0.2382 0.067,-0.3309 0.025,-0.0531 0.0105,-0.0337 0.04,-0.0694 0.1873,0.626 0.0716,1.8797 0.0618,2.5119l-0.1128 5.2565c-0.018,0.8181 -0.091,1.8066 -0.0418,2.6146 0.1147,-0.1814 1.3959,-4.3477 1.5767,-4.9006l0.7049 -2.0785c0.1608,-0.4479 0.3427,-0.9066 0.5472,-1.3256 0.1626,-0.333 0.5024,-0.8236 0.7601,-1.0852 0.3655,-0.3712 0.6129,-0.5671 1.2842,-0.5902 -0.8746,-0.4681 -1.8535,0.3689 -2.2598,0.7793 -0.2665,0.2692 -0.5145,0.5958 -0.7389,0.9385 -0.2337,0.357 -0.4033,0.6698 -0.6011,1.058 -0.1232,-0.266 0.0664,-1.8232 -0.6104,-3.5206 -0.4097,-1.0277 -0.4293,-0.7108 -0.2398,-1.5439 0.0682,-0.2999 0.1235,-0.5615 0.2058,-0.8484 0.0697,-0.2431 0.2306,-0.5792 0.2694,-0.7712 -0.4432,0.4059 -0.7179,1.2818 -0.9318,1.664 -0.0594,-0.0312 -0.2359,-0.3425 -0.2841,-0.4048 -0.0471,0.1146 0.1605,0.5585 0.1358,0.7746 -0.0102,0.0883 -0.2029,0.5981 -0.2507,0.7454l-0.4816 1.5262c-0.0598,-0.1425 -0.0699,-0.5906 -0.0856,-0.7876 -0.0761,-0.9568 -0.3857,-2.0152 -0.7118,-2.8963 -0.2156,-0.5824 -0.3107,-0.4252 -0.0598,-0.9737l0.4293 -0.9123 0.1352 -0.258c0.0352,-0.0635 0.0899,-0.1571 0.1339,-0.233 0.0651,-0.1123 0.2579,-0.3769 0.284,-0.4735 0.2499,-0.3174 0.4001,-0.6152 0.7209,-0.964 0.0946,-0.1028 0.2308,-0.2068 0.2869,-0.3007 -0.8031,0.1081 -1.9073,1.3062 -2.4276,1.9965 -0.0998,0.1323 -0.1788,0.2727 -0.268,0.3818 -0.0957,-0.0695 -0.3155,-0.5096 -0.4017,-0.6465 -0.1802,-0.2861 -0.0988,-0.3491 -0.0004,-0.8342 0.2597,-1.2819 0.6949,-2.7994 1.3548,-3.8989 0.1186,-0.1975 0.3456,-0.4924 0.4143,-0.6494 -0.4149,0.204 -1.1763,1.513 -1.4167,1.9752 -0.423,0.8133 -0.4558,1.0521 -0.7359,1.7951 -0.0367,0.0973 -0.1645,0.5451 -0.237,0.6227 -0.1537,-0.0895 -0.3924,-0.5679 -0.5678,-0.6617 0.0322,0.1402 0.1504,0.3661 0.2209,0.5158 0.3343,0.7092 0.2771,0.3999 -0.0743,1.7054 -0.2868,1.0653 -0.884,3.8898 -1.0382,4.9878 -0.0539,0.3833 -0.4366,2.3809 -0.427,2.5467 -0.0805,-0.394 -0.1065,-0.7929 -0.1571,-1.2144l-0.4637 -3.7082c-0.2118,-1.6323 -0.4588,-3.2351 -0.6682,-4.8653 -0.2162,-1.683 -0.2809,-0.8009 0.1957,-2.2675 0.0942,-0.2897 0.2658,-0.7185 0.3818,-1.009 0.1374,-0.3442 0.2404,-0.6702 0.3713,-1.0216 0.2551,-0.6852 0.52,-1.3285 0.761,-2.0231 0.1398,-0.4033 0.7296,-1.8322 0.763,-2.0313 -0.3354,0.1699 -1.918,3.0615 -2.2394,3.7079 -0.1032,0.2076 -0.2149,0.4192 -0.3313,0.6609 -0.0848,0.1764 -0.235,0.5506 -0.3346,0.6597 -0.0894,-0.1864 -0.3719,-2.7916 -0.3047,-3.4028 0.0097,-0.0873 0.0319,-0.1378 -0.0068,-0.208 -0.4978,1.4841 -0.1261,4.3856 -0.2115,4.7997l-0.7467 1.8056c-0.171,0.4381 -0.559,1.5984 -0.6942,1.89 -0.0155,-0.01 -1.3331,-1.7727 -2.0467,-1.9895 0.0785,0.1951 0.6092,0.8361 0.7782,1.2903l0.333 0.6734c0.0542,0.0927 0.0073,0.0353 0.0738,0.0817zm13.0512 11.8827c0.0536,-1.3603 -0.0071,-3.1476 0.8463,-4.2995 0.5114,-0.6901 0.6324,-0.5515 0.9169,-0.8091 -1.1337,-0.0648 -1.7274,1.0616 -2.0289,1.8806 -0.1635,0.4445 -0.2622,1.2108 -0.2241,1.7503 0.0323,0.4579 0.1972,1.2068 0.4898,1.4778zm-21.0572 -4.891c0.0398,0.1282 0.3436,0.3131 0.5603,0.529 0.5272,0.5249 1.061,1.1995 1.3065,1.9899 0.1823,0.587 0.3424,1.0807 0.4692,1.7194 0.0536,0.2706 0.3253,1.7034 0.3987,1.8101 0.1145,-0.2387 0.1545,-1.4669 0.1547,-1.841 0.0009,-1.3861 -0.4413,-3.0513 -1.5172,-3.8375 -0.144,-0.1052 -0.3813,-0.2519 -0.5644,-0.3128 -0.1371,-0.0457 -0.6992,-0.1375 -0.8078,-0.0572zm4.3825 -1.6528l-0.4513 -0.4783c-0.4141,-0.4094 -1.0223,-1.0085 -1.6092,-1.1756 0.5264,0.3551 1.5091,1.9709 1.8078,2.5966 0.1382,0.2897 0.0976,0.4283 0.0658,0.7851 -0.0512,0.5729 -0.0546,1.1227 -0.0848,1.7046l-0.7856 -1.203c-0.287,-0.4012 -0.563,-0.7655 -0.9027,-1.114 -0.3226,-0.331 -0.639,-0.6473 -1.0634,-0.9542 -0.2604,-0.1883 -0.9718,-0.6549 -1.3452,-0.6858 0.242,0.2369 0.4647,0.2793 1.0477,0.9271 0.327,0.3633 0.6136,0.7011 0.882,1.1349 1.0718,1.7321 1.4957,2.9592 2.1959,4.8201l1.3132 3.6646c0.0302,0.0453 0.014,0.0239 0.0449,0.053l-0.1851 -5.1476c0.1155,0.2152 0.2186,0.664 0.295,0.9284 0.0485,0.1672 0.2307,0.7957 0.309,0.9096l1.007 -0.2398c0.0172,-0.0049 0.0446,-0.0142 0.0623,-0.0223l0.0785 -0.0465 -1.0348 -6.081c-0.0483,-0.3585 -0.0857,-0.7015 -0.1213,-1.0675 -0.064,-0.6593 0.0266,-0.6608 0.0703,-1.0886 -0.6079,0.3463 -0.5436,2.7286 -0.5832,3.4022 -0.12,-0.1348 -0.2714,-0.5002 -0.2813,-0.7044 -0.0827,-1.707 0.1145,-3.1263 0.2169,-4.8307 0.018,-0.2998 0.0499,-0.6403 0.0772,-0.9377 0.0262,-0.2836 0.0851,-0.6533 0.0701,-0.9262l-0.3242 1.3574c-0.1432,0.7087 -0.7194,4.3376 -0.7718,4.4197zm10.1304 -2.9075c0.1037,-0.0678 0.1724,-0.3043 0.226,-0.4236 0.2754,-0.6141 0.3861,-0.5432 0.2613,-0.8881 -0.0539,-0.1494 -0.1004,-0.3571 -0.1914,-0.462 -0.0739,0.1333 -0.2958,1.5435 -0.2959,1.7736z" />
                </symbol>

                <symbol id="relief-swamp-2" viewBox="-15 -15 40 40">
                    <path fill="#585142"
                        d="M6.7214 3.6274l0.2974 -1.246c0.0125,0.0018 0.0257,0.0026 0.0392,0.0026l0.0722 0 0.0017 0 -0.2183 0.9141c-0.0646,0.1067 -0.1305,0.2187 -0.1923,0.3293zm0.6589 -2.7597l0.0731 -0.3064 0.1137 0 -0.0725 0.3037 -0.0017 0 -0.0722 0c-0.0135,0 -0.027,0.0009 -0.0403,0.0026z" />
                    <path fill="#83340B"
                        d="M7.4207 0.8651l0.0722 0c0.126,0 0.2104,0.0787 0.1873,0.175l-0.2791 1.169c-0.0229,0.0962 -0.1448,0.175 -0.2709,0.175l-0.0722 0c-0.126,0 -0.2104,-0.0787 -0.1874,-0.175l0.2791 -1.169c0.023,-0.0962 0.1449,-0.175 0.271,-0.175z" />
                    <rect fill="#585142" transform="matrix(-0.939683 -0 0.0671203 0.763489 5.89737 4.35244E-05)"
                        width=".1137" height="7.4462" />
                    <rect fill="#83340B" transform="matrix(-0.939683 -0 0.0671203 0.763489 6.10204 0.303724)"
                        width=".5305" height="1.9895" rx=".2292" ry=".2292" />
                    <path fill="#5E6124"
                        d="M5.6178 4.8049c-0.1679,-0.208 -0.383,-0.5796 -0.5433,-0.8263 -0.1936,-0.298 -0.4232,-0.5766 -0.5848,-0.8489l-0.9815 0.3056c-0.5605,-0.3496 -1.0382,-0.8091 -1.7154,-1.1437 0.1982,0.2144 0.5147,0.3846 0.7658,0.5837 0.2565,0.2034 0.4549,0.3975 0.7175,0.6332l-1.7204 0.7493c-0.2861,0.1365 -0.5417,0.2743 -0.7905,0.4197l-0.6765 0.422c-0.1001,0.095 0.0047,-0.0492 -0.0888,0.1093l1.6642 -0.8211c0.5858,-0.2699 1.1939,-0.4706 1.7655,-0.7272 0.3702,0.2065 2.2853,2.1742 2.4896,2.645 0.2815,0.0964 0.5399,0.0802 0.7835,-0.0071 0.1711,-1.0885 0.5199,-2.1608 1.1254,-3.1061 0.1892,-0.2953 0.4614,-0.6218 0.6108,-0.9103l-0.1471 0.1016c-0.4466,0.3599 -1.3762,1.709 -1.4848,2.1317 0.027,-0.3821 0.4922,-1.2446 0.6983,-1.6164 0.3692,-0.6659 0.7759,-1.1199 0.9917,-1.4896 -0.4499,0.2861 -1.2108,1.2966 -1.4397,1.6572 -0.1784,0.2813 -0.4033,0.6582 -0.5347,0.9472 -0.1451,0.3189 -0.2561,0.796 -0.3948,1.077 -0.4754,-1.2016 -0.9581,-3.1053 -2.1105,-4.1177 -0.0085,-0.0074 -0.1118,-0.0899 -0.1174,-0.0941l-0.185 -0.1184c0.2319,0.3027 0.4313,0.5344 0.6578,0.8699 0.4173,0.6178 1.1832,2.5842 1.2451,3.1745zm-1.9272 -1.2197c0.0276,0.0352 1.0203,0.8641 1.4665,1.3489l0.2084 0.187c0.0085,0.0062 0.0253,0.0173 0.0382,0.0257l-1.1212 -1.7614 -0.5918 0.1998z" />
                    <path fill="#585142"
                        d="M6.3074 6.8936c1.5063,0 2.7274,-0.1667 2.7274,-0.3725 0,-0.0972 -0.2722,-0.1856 -0.7181,-0.2518 0.2711,0.0449 0.43,0.0993 0.43,0.158 0,0.1539 -1.0921,0.2787 -2.4393,0.2787 -1.3473,0 -2.4395,-0.1248 -2.4395,-0.2787 0,-0.0587 0.1589,-0.1131 0.4301,-0.158 -0.4459,0.0663 -0.7182,0.1548 -0.7182,0.2518 0,0.2058 1.2212,0.3725 2.7275,0.3725z" />
                    <path fill="#585142"
                        d="M6.3074 6.6001c0.8298,0 1.5026,-0.0919 1.5026,-0.2052 0,-0.0535 -0.15,-0.1023 -0.3956,-0.1388 0.1494,0.0247 0.2369,0.0547 0.2369,0.0871 0,0.0847 -0.6016,0.1534 -1.3439,0.1534 -0.7422,0 -1.3439,-0.0687 -1.3439,-0.1534 0,-0.0324 0.0874,-0.0623 0.2368,-0.0871 -0.2455,0.0365 -0.3955,0.0852 -0.3955,0.1388 0,0.1133 0.6727,0.2052 1.5026,0.2052z" />
                </symbol>

                <symbol id="relief-swamp-3" viewBox="-4 -3.5 9 9">
                    <rect fill="#585142" transform="matrix(-0.939683 -0 -0.0316337 0.763489 0.643293 9.91602E-06)"
                        width=".0259" height="1.6965" />
                    <rect fill="#83340B" transform="matrix(-0.939683 -0 -0.0316337 0.763489 0.680973 0.0691964)"
                        width=".1209" height=".4533" rx=".0522" ry=".0522" />
                    <path fill="#5E6124"
                        d="M0.6587 1.102c0.1102,-0.2132 0.1717,-0.3927 0.3066,-0.6211 -0.0607,0.1599 -0.2665,0.6844 -0.2488,0.6649 0.2213,-0.2987 0.2022,-0.374 0.5309,-0.6322 -0.2144,0.2835 -0.3551,0.5968 -0.5235,0.886 -0.055,0.0555 -0.1634,0.0382 -0.2015,0.0031 -0.1446,-0.3525 -0.2572,-0.3752 -0.4702,-0.6162 0.1033,0.0385 0.3336,0.2256 0.3813,0.3151 -0.0476,-0.1539 -0.3112,-0.345 -0.4261,-0.4622 0.2831,0.0935 0.4085,0.3418 0.5708,0.5327 0.0455,-0.269 0.0508,-0.6339 0.2634,-0.8413 -0.1045,0.2155 -0.2096,0.543 -0.1829,0.7713z" />
                    <path fill="#585142"
                        d="M0.6214 1.5706c0.3432,0 0.6214,-0.038 0.6214,-0.0849 0,-0.0221 -0.062,-0.0423 -0.1636,-0.0574 0.0618,0.0102 0.098,0.0226 0.098,0.036 0,0.0351 -0.2488,0.0635 -0.5557,0.0635 -0.307,0 -0.5558,-0.0284 -0.5558,-0.0635 0,-0.0134 0.0362,-0.0258 0.098,-0.036 -0.1016,0.0151 -0.1636,0.0353 -0.1636,0.0574 0,0.0469 0.2782,0.0849 0.6214,0.0849z" />
                    <path fill="#585142"
                        d="M0.6214 1.5037c0.189,0 0.3423,-0.0209 0.3423,-0.0468 0,-0.0122 -0.0342,-0.0233 -0.0901,-0.0316 0.034,0.0056 0.054,0.0125 0.054,0.0198 0,0.0193 -0.1371,0.035 -0.3062,0.035 -0.1691,0 -0.3062,-0.0157 -0.3062,-0.035 0,-0.0074 0.0199,-0.0142 0.054,-0.0198 -0.0559,0.0083 -0.0901,0.0194 -0.0901,0.0316 0,0.0258 0.1533,0.0468 0.3423,0.0468z" />
                </symbol>

                <symbol id="relief-cactus-1" viewBox="-50 -38 120 120">
                    <ellipse fill="#999999" opacity=".5" cx="11.6624" cy="30.5346" rx="11.2558" ry="1.3184" />
                    <polygon fill="#E85051"
                        points="10.5474,0 10.2885,0.8968 8.9818,0.1755 9.8281,1.8655 11.2667,1.8655 12.113,0.1755 10.8062,0.8968" />
                    <path fill="#63C072"
                        d="M18.8889 30.0026c0.3115,-0.3161 0.5627,-0.7559 0.7223,-1.2724 0.0619,0.0171 0.1258,0.0263 0.1913,0.0263 0.5329,0 0.9647,-0.5965 0.9647,-1.3324 0,-0.7359 -0.4318,-1.3326 -0.9647,-1.3326 -0.0655,0 -0.1293,0.0093 -0.1912,0.0263 -0.1171,-0.3791 -0.2837,-0.717 -0.4871,-0.9948 0.5401,-0.2953 1.1411,-0.8939 1.6308,-1.6806 0.854,-1.3719 1.0461,-2.7956 0.4288,-3.1801 -0.4598,-0.2862 -1.2385,0.0849 -1.9589,0.8593 0.0024,-0.0412 0.0037,-0.083 0.0037,-0.1254 0,-0.6869 -0.3358,-1.2436 -0.7499,-1.2436 -0.4141,0 -0.7498,0.5567 -0.7498,1.2436 0,0.6477 0.2987,1.1799 0.68,1.2382 -0.4346,0.7516 -0.6691,1.5041 -0.6797,2.0791l-0.0003 0c-0.5002,0 -0.9592,0.2657 -1.3173,0.7081 -0.0107,-0.0344 -0.0221,-0.069 -0.0344,-0.1036 -0.2936,-0.8281 -0.9175,-1.3628 -1.3935,-1.194 -0.476,0.1687 -0.6239,0.977 -0.3301,1.8053 0.2271,0.6405 0.6516,1.1054 1.0528,1.205 -0.0334,0.2219 -0.0513,0.4527 -0.0513,0.6898 0,1.0732 0.3624,2.0194 0.9136,2.5785 -0.5911,0.1126 -0.9827,0.3089 -0.9827,0.532l2.1429 0 2.1428 0c0,-0.2233 -0.3915,-0.4193 -0.9828,-0.532zm-10.9784 0.532l5.2738 0 0 -17.364 5.9327 0c1.0878,0 1.9778,-0.8898 1.9778,-1.9776l0 -3.9552c0,-1.0877 -0.89,-1.9777 -1.9778,-1.9777l0 0c-1.0877,0 -1.9776,0.89 -1.9776,1.9777l0 1.9776 -3.9551 0 0 -5.0493c0,-1.4503 -1.1867,-2.6367 -2.6369,-2.6367l0 0c-1.4504,0 -2.6369,1.1864 -2.6369,2.6367l0 14.0111 -3.9552 0 0 -1.9776c0,-1.0878 -0.89,-1.9778 -1.9776,-1.9778l0 0c-1.0878,0 -1.9777,0.89 -1.9777,1.9778l0 3.9552 0 0c0,1.0875 0.8899,1.9777 1.9777,1.9777l5.9328 0 0 8.4021zm13.1843 -19.3416l0 0z" />
                    <path fill="#5BAB68"
                        d="M18.8889 30.0026c0.3115,-0.3161 0.5627,-0.7559 0.7223,-1.2724 0.0619,0.0171 0.1258,0.0263 0.1913,0.0263 0.5329,0 0.9647,-0.5965 0.9647,-1.3324 0,-0.7359 -0.4318,-1.3326 -0.9647,-1.3326 -0.0655,0 -0.1293,0.0093 -0.1912,0.0263 -0.1171,-0.3791 -0.2837,-0.717 -0.4871,-0.9948 0.5401,-0.2953 1.1411,-0.8939 1.6308,-1.6806 0.854,-1.3719 1.0461,-2.7956 0.4288,-3.1801 -0.1593,-0.0992 -0.3572,-0.1194 -0.5773,-0.0713 0.0585,0.016 0.1135,0.0395 0.1646,0.0713 0.6172,0.3845 0.4252,1.8082 -0.4289,3.1801 -0.4896,0.7867 -1.0906,1.3853 -1.6308,1.6806 0.2035,0.2778 0.3701,0.6157 0.4872,0.9948 0.0619,-0.017 0.1257,-0.0263 0.1912,-0.0263 0.5328,0 0.9647,0.5967 0.9647,1.3326 0,0.7359 -0.4319,1.3324 -0.9647,1.3324 -0.0655,0 -0.1294,-0.0092 -0.1914,-0.0263 -0.1595,0.5165 -0.4107,0.9563 -0.7222,1.2724 0.5913,0.1127 0.9828,0.3087 0.9828,0.532l0.4127 0c0,-0.2233 -0.3915,-0.4193 -0.9828,-0.532zm-16.5174 -7.9252c0.896,-0.1875 1.5746,-0.9864 1.5746,-1.9361l0 -3.9552c0,-0.9608 -0.6946,-1.7673 -1.6065,-1.9423l0 0.0115 0 1.9308 0 0.5782 0 2.8041 0.0319 0 0 2.509zm9.2062 8.4572l1.6064 0 0 -17.364 0.0002 0c0,-1.3183 0,-2.6369 0,-3.9552l-0.0002 0 0 -5.0493c0,-1.0851 -0.6643,-2.0226 -1.6064,-2.4258l0 2.4258c0,8.7895 0,17.5791 0,26.3685zm7.9425 -17.4055c0.8961,-0.1875 1.5746,-0.9864 1.5746,-1.9361l0 -3.9552c0,-0.9609 -0.6946,-1.7673 -1.6065,-1.9423l0 0.0114 0 1.9309 0 0.5782 0 2.804 0.0319 0 0 2.5091zm-0.308 7.6085c-0.0718,-0.5627 -0.373,-0.985 -0.7335,-0.985 -0.0716,0 -0.1408,0.0166 -0.2064,0.0477 0.3138,0.1486 0.5436,0.6278 0.5436,1.1959 0,0.0424 -0.0013,0.0842 -0.0038,0.1254 0.1322,-0.1422 0.2662,-0.2706 0.4001,-0.384zm-2.916 3.9775c-0.3167,-0.7104 -0.8766,-1.1457 -1.3125,-0.9911l-0.0145 0.0057c0.3836,0.1275 0.779,0.5782 0.9953,1.1883 0.0122,0.0346 0.0237,0.0692 0.0344,0.1036 0.0927,-0.1144 0.192,-0.2172 0.2973,-0.3065z" />
                </symbol>

                <symbol id="relief-cactus-2" viewBox="-49 -41 120 120">
                    <polygon fill="#E68139"
                        points="3.9483,14.2784 3.6984,15.1439 2.4374,14.4478 3.2541,16.0787 4.6425,16.0787 5.4592,14.4478 4.1982,15.1439" />
                    <ellipse fill="#BDBFC1" cx="10.5348" cy="27.9924" rx="10.5348" ry="1.2724" />
                    <path fill="#63C072"
                        d="M9.1307 27.9925l5.0895 0 0 -12.5588 5.7257 0c1.0497,0 1.9085,-0.8588 1.9085,-1.9085l0 -3.8172c0,-1.0497 -0.8589,-1.9085 -1.9085,-1.9085l0 0c-1.0497,0 -1.9086,0.8589 -1.9086,1.9085l0 1.9086 -3.8171 0 0 -9.0718c0,-1.3996 -1.1452,-2.5448 -2.5448,-2.5448l0 0c-1.3996,0 -2.5447,1.1452 -2.5447,2.5448 0,8.4826 0,16.9651 0,25.4477zm12.7238 -14.4674l0 0z" />
                    <path fill="#63C072"
                        d="M6.8427 23.5745c0.5187,0.1819 1.2323,-0.5066 1.5937,-1.5377 0.3614,-1.031 0.2339,-2.0143 -0.2848,-2.1961 -0.5187,-0.1819 -1.2322,0.5066 -1.5937,1.5376 -0.0555,0.1582 -0.0994,0.3153 -0.1322,0.4685 -0.204,-0.4516 -0.4675,-0.7946 -0.7661,-0.98 0.3423,-0.5575 0.5494,-1.2841 0.5494,-2.0787 0,-1.7568 -1.0122,-3.1809 -2.2607,-3.1809 -1.2487,0 -2.2608,1.4241 -2.2608,3.1809 0,1.6948 0.942,3.0799 2.1296,3.1755 -0.243,0.5892 -0.3889,1.3428 -0.3889,2.1642 0,1.3665 0.4035,2.5453 0.9868,3.0916 -0.7731,0.0885 -1.3212,0.3101 -1.3212,0.5695l4.1359 0c0,-0.2624 -0.5609,-0.4862 -1.3481,-0.5725 0.5814,-0.5476 0.9836,-1.7246 0.9836,-3.0886 0,-0.1884 -0.0078,-0.3732 -0.0226,-0.5533l0.0001 0z" />
                    <path fill="#5BAB68"
                        d="M5.4882 20.7795c0.2721,-0.5451 0.4349,-1.2376 0.4349,-1.9914 0,-1.7568 -0.8841,-3.1809 -1.9747,-3.1809 -0.666,0 -1.2058,1.4241 -1.2058,3.1809 0,1.6442 0.4729,2.997 1.0795,3.1636l0.0165 -0.0389c-0.2703,-0.2796 -0.4747,-1.5721 -0.4747,-3.1247 0,-1.7568 0.2617,-3.1809 0.5846,-3.1809 0.949,0 1.7183,1.4241 1.7183,3.1809 0,0.73 -0.1329,1.4025 -0.3563,1.9394 0.0602,0.0113 0.1195,0.0288 0.1778,0.0521zm-0.3414 6.7643c0.829,-0.0001 1.501,-1.5294 1.501,-3.416 0,-0.2568 -0.0125,-0.5069 -0.0361,-0.7475 0.0607,0.0945 0.1379,0.1615 0.2312,0.1942 0.134,0.0471 0.5357,-0.7507 0.8972,-1.7818 0.3615,-1.031 0.5458,-1.9049 0.4117,-1.952 -0.3943,-0.1382 -1.007,0.5856 -1.3684,1.6166 -0.1717,0.49 -0.2558,0.9611 -0.2545,1.3355 0.0303,0.1617 0.055,0.3297 0.0741,0.5031 0.0525,0.1431 0.1326,0.241 0.24,0.2787 0.2765,0.097 0.7938,-0.6602 1.1553,-1.6913 0.3615,-1.0311 0.4303,-1.9455 0.1536,-2.0425 -0.4531,-0.1588 -1.1134,0.5483 -1.4748,1.5793 -0.1272,0.3627 -0.2004,0.7172 -0.2221,1.0313 -0.2575,-1.0382 -0.7467,-1.7393 -1.308,-1.7393 -0.5062,0 -0.9165,1.5293 -0.9165,3.4159 0,1.8866 0.4103,3.416 0.9165,3.416zm0 -6.8319c-0.2454,0 -0.4444,1.5293 -0.4444,3.4159 0,1.8866 0.1989,3.416 0.4444,3.416 0.7213,-0.0001 1.3062,-1.5294 1.3062,-3.416 0,-1.8865 -0.5848,-3.4159 -1.3062,-3.4159zm0 0c-0.8291,0 -1.5012,1.5293 -1.5011,3.4159 0,1.8866 0.672,3.416 1.5011,3.416 0.2454,-0.0001 0.4442,-1.5294 0.4442,-3.416 0,-1.8865 -0.1988,-3.4159 -0.4442,-3.4159 -0.7215,0 -1.3062,1.5293 -1.3062,3.4159 0,1.8866 0.5848,3.416 1.3062,3.416 0.5061,-0.0001 0.9164,-1.5294 0.9164,-3.416 0,-1.8865 -0.4103,-3.4159 -0.9164,-3.4159zm1.696 2.8626c0.453,0.1588 1.1133,-0.5482 1.4748,-1.5794 0.3615,-1.031 0.2871,-1.9956 -0.1659,-2.1545 -0.2767,-0.097 -0.794,0.6602 -1.1555,1.6912 -0.3615,1.0312 -0.4302,1.9456 -0.1535,2.0426zm1.3089 -3.7338c-0.1341,-0.047 -0.5359,0.7507 -0.8974,1.7817 -0.3614,1.0311 -0.5458,1.9051 -0.4115,1.9521 0.3942,0.1382 1.0069,-0.5856 1.3683,-1.6167 0.3615,-1.031 0.3349,-1.9789 -0.0593,-2.1171zm-4.2034 -4.2335c-1.0907,0 -1.9748,1.4241 -1.9748,3.1809 0,1.6862 0.8144,3.0656 1.8442,3.1738l0.0008 -0.0019c-0.8884,-0.1229 -1.5886,-1.496 -1.5886,-3.172 0,-1.7568 0.7693,-3.1809 1.7184,-3.1809 0.3228,0 0.5845,1.4241 0.5845,3.1809 0,0.9114 -0.0705,1.7331 -0.1833,2.313 0.1684,-0.1756 0.3532,-0.2971 0.5486,-0.3534 0.1603,-0.5401 0.2558,-1.2204 0.2558,-1.9596 0,-1.7568 -0.5398,-3.1809 -1.2057,-3.1809z" />
                    <path fill="#5BAB68"
                        d="M12.5713 27.9925l1.649 0c0,-11.8861 0,-14.658 0,-25.4477 0,-1.0847 -0.688,-2.0165 -1.649,-2.381l0 27.6858 0 0.1428zm8.1168 -12.7099c0.6837,-0.291 1.1664,-0.9707 1.1664,-1.7575l0 -3.8172c0,-0.7868 -0.4827,-1.4665 -1.1664,-1.7575l0 7.3322zm1.1664 -1.7575l0 0z" />
                </symbol>

                <symbol id="relief-cactus-3" viewBox="-50 -41 120 120">
                    <ellipse fill="#999999" opacity=".5" cx="11.8434" cy="27.4564" rx="10.1211" ry="1.1855" />
                    <path fill="#63C072"
                        d="M22.2067 13.2778l-0.7113 0 -1.1706 0 0 4.5937c0,0.978 -0.8002,1.7782 -1.7783,1.7782l-5.3348 0 0 7.8067 -4.742 0 0 -7.5551 -3.6988 0c-0.978,0 -1.7783,-0.8002 -1.7783,-1.7783l0 0 0 -2.7652 -1.57 0 -0.7113 0c-0.0061,0 -0.0122,0 -0.0183,-0.0002 -0.0061,-0.0001 -0.0121,-0.0004 -0.0182,-0.0007 -0.006,-0.0003 -0.012,-0.0007 -0.018,-0.0011 -0.006,-0.0005 -0.012,-0.001 -0.018,-0.0017 -0.0059,-0.0006 -0.0118,-0.0012 -0.0178,-0.002 -0.0059,-0.0008 -0.0118,-0.0016 -0.0176,-0.0025 -0.0059,-0.0009 -0.0118,-0.0019 -0.0176,-0.0029l0 0c-0.0058,-0.0011 -0.0116,-0.0022 -0.0174,-0.0034 -0.0058,-0.0011 -0.0115,-0.0024 -0.0172,-0.0038l0 0c-0.0057,-0.0013 -0.0114,-0.0027 -0.0171,-0.0042l0 0c-0.0057,-0.0014 -0.0113,-0.0029 -0.0169,-0.0046l-0.0001 0c-0.0056,-0.0015 -0.0111,-0.0033 -0.0167,-0.005l0 0c-0.0056,-0.0017 -0.0111,-0.0035 -0.0166,-0.0054l-0.0164 -0.0058 0 0 -0.0162 -0.0062 -0.0161 -0.0066c-0.0053,-0.0022 -0.0106,-0.0046 -0.0158,-0.0069l0 0c-0.0053,-0.0024 -0.0105,-0.0049 -0.0157,-0.0074l-0.0154 -0.0077 -0.0152 -0.008c-0.0051,-0.0028 -0.0101,-0.0056 -0.015,-0.0085l-0.0148 -0.0087 0 0c-0.0049,-0.003 -0.0097,-0.006 -0.0146,-0.0091 -0.0048,-0.0031 -0.0095,-0.0063 -0.0143,-0.0095 -0.0047,-0.0032 -0.0094,-0.0064 -0.014,-0.0097l-0.0001 0c-0.0046,-0.0034 -0.0092,-0.0067 -0.0138,-0.0101l-0.0135 -0.0105 -0.0001 0c-0.0044,-0.0035 -0.0089,-0.0071 -0.0133,-0.0107l-0.013 -0.0111 0 0c-0.0043,-0.0037 -0.0086,-0.0075 -0.0128,-0.0113l-0.0125 -0.0117 0 0 -0.0122 -0.0119 -0.0001 0 -0.0119 -0.0122c-0.0039,-0.0041 -0.0078,-0.0083 -0.0116,-0.0125l-0.0001 0 -0.0113 -0.0128 -0.011 -0.0131 -0.0108 -0.0133c-0.0035,-0.0045 -0.007,-0.009 -0.0104,-0.0136l-0.0101 -0.0138c-0.0033,-0.0047 -0.0066,-0.0093 -0.0098,-0.0141 -0.0032,-0.0047 -0.0064,-0.0095 -0.0094,-0.0143l-0.0091 -0.0145c-0.003,-0.0049 -0.0059,-0.0099 -0.0088,-0.0148l-0.0084 -0.015c-0.0028,-0.0051 -0.0054,-0.0101 -0.0081,-0.0153l-0.0077 -0.0154c-0.0025,-0.0052 -0.0049,-0.0104 -0.0073,-0.0156 -0.0024,-0.0053 -0.0047,-0.0106 -0.007,-0.0159 -0.0023,-0.0053 -0.0044,-0.0106 -0.0065,-0.016 -0.0022,-0.0054 -0.0043,-0.0108 -0.0063,-0.0162l-0.0058 -0.0165c-0.0018,-0.0055 -0.0036,-0.011 -0.0054,-0.0165 -0.0017,-0.0056 -0.0034,-0.0112 -0.005,-0.0168l-0.0046 -0.0169c-0.0015,-0.0057 -0.0029,-0.0114 -0.0042,-0.0171 -0.0013,-0.0057 -0.0026,-0.0115 -0.0038,-0.0173 -0.0012,-0.0058 -0.0023,-0.0115 -0.0033,-0.0174 -0.0011,-0.0058 -0.0021,-0.0116 -0.003,-0.0175 -0.0009,-0.0059 -0.0017,-0.0118 -0.0025,-0.0177 -0.0007,-0.0059 -0.0014,-0.0118 -0.002,-0.0178 -0.0006,-0.006 -0.0012,-0.012 -0.0016,-0.0179 -0.0005,-0.006 -0.0009,-0.012 -0.0012,-0.0181 -0.0003,-0.006 -0.0005,-0.0121 -0.0007,-0.0182 -0.0001,-0.006 -0.0002,-0.0121 -0.0002,-0.0183l0 -0.7113 0 -1.9228c0,-0.3912 0.3201,-0.7113 0.7113,-0.7113l0 0c0.3912,0 0.7113,0.3201 0.7113,0.7113l0 1.9228 1.57 0 0 -4.0946c0,-0.978 0.8003,-1.7783 1.7783,-1.7783l0 0c0.978,0 1.7783,0.8003 1.7783,1.7783l0 6.5042 1.9205 0 0 -12.5985c0,-1.3041 1.0669,-2.3711 2.371,-2.3711l0 0c1.3041,0 2.371,1.067 2.371,2.3711l0 2.5355 1.9971 0 0 -1.9229c0,-0.3912 0.3202,-0.7113 0.7114,-0.7113l0 0c0.3912,0 0.7113,0.3201 0.7113,0.7113l0 1.9229 0 0.7113c0,0.0061 -0.0001,0.0122 -0.0003,0.0182 -0.0001,0.0061 -0.0003,0.0122 -0.0006,0.0182 -0.0004,0.0061 -0.0007,0.0121 -0.0012,0.0181 -0.0005,0.006 -0.001,0.0119 -0.0016,0.0179 -0.0006,0.006 -0.0013,0.0119 -0.0021,0.0178 -0.0007,0.0059 -0.0016,0.0118 -0.0025,0.0177 -0.0009,0.0059 -0.0018,0.0117 -0.0029,0.0176 -0.001,0.0058 -0.0021,0.0116 -0.0033,0.0173 -0.0012,0.0058 -0.0025,0.0116 -0.0038,0.0173 -0.0014,0.0057 -0.0028,0.0114 -0.0042,0.0171l-0.0046 0.0169c-0.0016,0.0056 -0.0033,0.0112 -0.0051,0.0168 -0.0017,0.0055 -0.0035,0.0111 -0.0054,0.0166l-0.0058 0.0164c-0.002,0.0054 -0.0041,0.0108 -0.0062,0.0162 -0.0021,0.0054 -0.0043,0.0107 -0.0065,0.016 -0.0023,0.0053 -0.0046,0.0107 -0.007,0.0159 -0.0024,0.0052 -0.0049,0.0104 -0.0073,0.0156l-0.0077 0.0155c-0.0027,0.0051 -0.0054,0.0102 -0.0081,0.0152l-0.0084 0.015c-0.0029,0.0049 -0.0058,0.0099 -0.0088,0.0148l-0.0091 0.0145c-0.0031,0.0048 -0.0062,0.0096 -0.0094,0.0143 -0.0032,0.0048 -0.0065,0.0095 -0.0098,0.0141l-0.0101 0.0138c-0.0034,0.0046 -0.0069,0.0091 -0.0104,0.0136l-0.0108 0.0133 -0.011 0.0131 -0.0114 0.0128 0 0c-0.0038,0.0042 -0.0077,0.0084 -0.0116,0.0125 -0.004,0.0041 -0.008,0.0082 -0.012,0.0122l-0.0122 0.012 0 0 -0.0125 0.0116c-0.0042,0.0039 -0.0085,0.0076 -0.0128,0.0114l0 0 -0.0131 0.011c-0.0044,0.0036 -0.0088,0.0072 -0.0133,0.0107l0 0 -0.0135 0.0105c-0.0046,0.0034 -0.0092,0.0068 -0.0139,0.0101l0 0c-0.0046,0.0033 -0.0093,0.0065 -0.014,0.0097 -0.0048,0.0032 -0.0096,0.0064 -0.0144,0.0095 -0.0048,0.0031 -0.0096,0.0061 -0.0145,0.0091l0 0 -0.0148 0.0088c-0.005,0.0028 -0.01,0.0056 -0.015,0.0084l-0.0152 0.008 -0.0155 0.0077c-0.0052,0.0026 -0.0103,0.005 -0.0156,0.0074l0 0 -0.0159 0.0069 -0.016 0.0066 -0.0162 0.0062 0 0 -0.0164 0.0058c-0.0055,0.0019 -0.011,0.0037 -0.0166,0.0054l0 0c-0.0056,0.0018 -0.0112,0.0035 -0.0168,0.0051l0 0c-0.0056,0.0016 -0.0112,0.0031 -0.0169,0.0046l0 0c-0.0057,0.0014 -0.0114,0.0028 -0.0171,0.0042l0 0c-0.0057,0.0013 -0.0115,0.0026 -0.0173,0.0038 -0.0057,0.0011 -0.0115,0.0023 -0.0173,0.0033l-0.0001 0c-0.0058,0.001 -0.0116,0.002 -0.0175,0.0029 -0.0059,0.0009 -0.0118,0.0018 -0.0177,0.0025 -0.0059,0.0008 -0.0118,0.0015 -0.0178,0.0021 -0.0059,0.0006 -0.0119,0.0011 -0.0179,0.0016 -0.006,0.0004 -0.012,0.0008 -0.0181,0.0011 -0.006,0.0003 -0.0121,0.0006 -0.0181,0.0007 -0.0061,0.0002 -0.0122,0.0003 -0.0183,0.0003l-0.7114 0 -1.9971 0 0 8.3888 3.5566 0 0 -1.6774 -1.9035 0c-0.3912,0 -0.7113,-0.32 -0.7113,-0.7113l0 -0.0226 0 -0.6887 0 -1.9454c0,-0.3912 0.3201,-0.7113 0.7113,-0.7113l0 0c0.3912,0 0.7114,0.3201 0.7114,0.7113l0 1.9454 1.1921 0 0 -1.8317c0,-0.978 0.8002,-1.7783 1.7782,-1.7783l0 0c0.9781,0 1.7783,0.8002 1.7783,1.7783l0 0.6936 1.1706 0 0 -1.9228c0,-0.3912 0.3201,-0.7113 0.7113,-0.7113l0 0c0.3912,0 0.7113,0.3201 0.7113,0.7113l0 1.9228 0 0.7113c0,0.0061 -0.0001,0.0123 -0.0002,0.0183 -0.0002,0.0061 -0.0004,0.0122 -0.0007,0.0182 -0.0003,0.0061 -0.0007,0.0121 -0.0012,0.0181 -0.0005,0.006 -0.001,0.012 -0.0016,0.0179 -0.0006,0.006 -0.0013,0.0119 -0.002,0.0178 -0.0008,0.0059 -0.0016,0.0118 -0.0025,0.0177 -0.0009,0.0059 -0.0019,0.0117 -0.003,0.0175 -0.001,0.0059 -0.0021,0.0116 -0.0033,0.0174 -0.0012,0.0058 -0.0025,0.0115 -0.0038,0.0173 -0.0013,0.0057 -0.0027,0.0114 -0.0042,0.0171 -0.0015,0.0056 -0.003,0.0113 -0.0046,0.0169l-0.005 0.0168c-0.0018,0.0055 -0.0036,0.011 -0.0054,0.0165 -0.0019,0.0056 -0.0039,0.011 -0.0058,0.0165 -0.002,0.0054 -0.0041,0.0108 -0.0063,0.0162l-0.0065 0.016 -0.007 0.0159c-0.0024,0.0052 -0.0048,0.0104 -0.0073,0.0156l-0.0077 0.0154 -0.0081 0.0153c-0.0027,0.005 -0.0055,0.01 -0.0084,0.015 -0.0029,0.0049 -0.0058,0.0099 -0.0088,0.0148 -0.0029,0.0049 -0.006,0.0097 -0.0091,0.0145 -0.003,0.0048 -0.0062,0.0096 -0.0094,0.0143 -0.0032,0.0048 -0.0065,0.0095 -0.0098,0.0141l-0.0101 0.0138c-0.0034,0.0046 -0.0069,0.0091 -0.0104,0.0136l-0.0108 0.0133c-0.0036,0.0044 -0.0073,0.0088 -0.011,0.0131 -0.0037,0.0043 -0.0075,0.0085 -0.0113,0.0128l-0.0001 0 -0.0116 0.0125 -0.0119 0.0122 -0.0001 0 -0.0122 0.0119 0 0 -0.0125 0.0117 -0.0128 0.0113 0 0c-0.0043,0.0038 -0.0086,0.0075 -0.013,0.0111l-0.0133 0.0107 -0.0001 0c-0.0044,0.0036 -0.0089,0.0071 -0.0135,0.0105 -0.0046,0.0034 -0.0092,0.0067 -0.0138,0.0101l-0.0001 0c-0.0046,0.0033 -0.0093,0.0065 -0.014,0.0097 -0.0048,0.0032 -0.0095,0.0064 -0.0143,0.0095 -0.0049,0.0031 -0.0097,0.0061 -0.0146,0.0091l0 0c-0.0049,0.003 -0.0098,0.0059 -0.0148,0.0087l-0.015 0.0085c-0.005,0.0027 -0.0101,0.0054 -0.0152,0.008l-0.0154 0.0077c-0.0052,0.0025 -0.0104,0.005 -0.0157,0.0074l0 0c-0.0053,0.0024 -0.0105,0.0047 -0.0158,0.0069 -0.0053,0.0023 -0.0107,0.0045 -0.0161,0.0066 -0.0053,0.0021 -0.0107,0.0042 -0.0162,0.0062l0 0 -0.0164 0.0058c-0.0055,0.0019 -0.011,0.0037 -0.0166,0.0054l0 0c-0.0056,0.0018 -0.0111,0.0034 -0.0167,0.0051l-0.0001 0 -0.0169 0.0046 0 0c-0.0057,0.0014 -0.0114,0.0028 -0.0171,0.0041l0 0c-0.0057,0.0014 -0.0114,0.0027 -0.0172,0.0038 -0.0058,0.0012 -0.0116,0.0023 -0.0174,0.0034l0 0c-0.0059,0.0011 -0.0117,0.002 -0.0176,0.0029 -0.0058,0.0009 -0.0117,0.0018 -0.0176,0.0025 -0.0059,0.0008 -0.0119,0.0014 -0.0178,0.0021 -0.006,0.0006 -0.012,0.0011 -0.018,0.0016 -0.006,0.0004 -0.012,0.0008 -0.018,0.0011 -0.0061,0.0003 -0.0122,0.0005 -0.0182,0.0007 -0.0061,0.0002 -0.0122,0.0003 -0.0183,0.0003zm-1.8819 4.5937l0 0z" />
                    <polygon fill="#E85051"
                        points="10.8407,0 10.6079,0.8065 9.4329,0.1579 10.1939,1.6775 11.4875,1.6775 12.2485,0.1579 11.0735,0.8065" />
                    <path fill="#5BAB68"
                        d="M20.3248 13.2778l0 1.8688 0 2.7249c0,0.8014 -0.5374,1.4832 -1.2696,1.7034l0 -3.8992 0 -0.5291 0 -5.6886c0.7322,0.2202 1.2696,0.902 1.2696,1.7035l0 0.6936 0 1.4227zm-7.1131 6.3719l0 2.7286 0 5.0781 -1.5649 0 0 -25.9392c0.9104,0.3318 1.5649,1.2077 1.5649,2.2291l0 2.5355 0 1.4226 0 0.3866 0 6.9671 0 1.0351 0 3.5565zm2.7126 -16.0021c0.3893,0.0022 0.7072,0.3215 0.7072,0.7113l0 1.9229 0 0.7113c0,0.0061 -0.0001,0.0122 -0.0003,0.0182 -0.0001,0.0061 -0.0003,0.0122 -0.0006,0.0182 -0.0004,0.0061 -0.0007,0.0121 -0.0012,0.0181 -0.0005,0.006 -0.001,0.0119 -0.0016,0.0179 -0.0006,0.006 -0.0013,0.0119 -0.0021,0.0178 -0.0007,0.0059 -0.0016,0.0118 -0.0025,0.0177 -0.0009,0.0059 -0.0018,0.0117 -0.0029,0.0176 -0.001,0.0058 -0.0021,0.0116 -0.0033,0.0173 -0.0012,0.0058 -0.0025,0.0116 -0.0038,0.0173 -0.0014,0.0057 -0.0028,0.0114 -0.0042,0.0171l-0.0046 0.0169c-0.0016,0.0056 -0.0033,0.0112 -0.0051,0.0168 -0.0017,0.0055 -0.0035,0.0111 -0.0054,0.0166l-0.0058 0.0164c-0.002,0.0054 -0.0041,0.0108 -0.0062,0.0162 -0.0021,0.0054 -0.0043,0.0107 -0.0065,0.016 -0.0023,0.0053 -0.0046,0.0107 -0.007,0.0159 -0.0024,0.0052 -0.0049,0.0104 -0.0073,0.0156l-0.0077 0.0155c-0.0027,0.0051 -0.0054,0.0102 -0.0081,0.0152l-0.0084 0.015c-0.0029,0.0049 -0.0058,0.0099 -0.0088,0.0148l-0.0091 0.0145c-0.0031,0.0048 -0.0062,0.0096 -0.0094,0.0143 -0.0032,0.0048 -0.0065,0.0095 -0.0098,0.0141l-0.0101 0.0138c-0.0034,0.0046 -0.0069,0.0091 -0.0104,0.0136l-0.0108 0.0133 -0.011 0.0131 -0.0114 0.0128 0 0c-0.0038,0.0042 -0.0077,0.0084 -0.0116,0.0125 -0.004,0.0041 -0.008,0.0082 -0.012,0.0122l-0.0122 0.012 0 0 -0.0125 0.0116c-0.0042,0.0039 -0.0085,0.0076 -0.0128,0.0114l0 0 -0.0131 0.011c-0.0044,0.0036 -0.0088,0.0072 -0.0133,0.0107l0 0 -0.0135 0.0105c-0.0046,0.0034 -0.0092,0.0068 -0.0139,0.0101l0 0c-0.0046,0.0033 -0.0093,0.0065 -0.014,0.0097 -0.0048,0.0032 -0.0096,0.0064 -0.0144,0.0095 -0.0048,0.0031 -0.0096,0.0061 -0.0145,0.0091l0 0 -0.0148 0.0088c-0.005,0.0028 -0.01,0.0056 -0.015,0.0084l-0.0152 0.008 -0.0155 0.0077c-0.0052,0.0026 -0.0103,0.005 -0.0156,0.0074l0 0 -0.0159 0.0069 -0.016 0.0066 -0.0162 0.0062 0 0 -0.0164 0.0058c-0.0055,0.0019 -0.011,0.0037 -0.0166,0.0054l0 0c-0.0056,0.0018 -0.0112,0.0035 -0.0168,0.0051l0 0c-0.0056,0.0016 -0.0112,0.0031 -0.0169,0.0046l0 0c-0.0057,0.0014 -0.0114,0.0028 -0.0171,0.0042l0 0c-0.0057,0.0013 -0.0115,0.0026 -0.0173,0.0038 -0.0057,0.0011 -0.0115,0.0023 -0.0173,0.0033l-0.0001 0c-0.0058,0.001 -0.0116,0.002 -0.0175,0.0029 -0.0059,0.0009 -0.0118,0.0018 -0.0177,0.0025 -0.0059,0.0008 -0.0118,0.0015 -0.0178,0.0021 -0.0059,0.0006 -0.0119,0.0011 -0.0179,0.0016 -0.006,0.0004 -0.012,0.0008 -0.0181,0.0011 -0.006,0.0003 -0.0121,0.0006 -0.0181,0.0007l-0.0142 0.0003 0 -4.0568zm-0.3481 10.7682l-0.7114 0 0 -4.0793 0 0c0.3912,0 0.7114,0.3201 0.7114,0.7113l0 1.9454 0 1.4226zm6.8745 -5.1515c0.272,0.1001 0.4673,0.3624 0.4673,0.668l0 1.9228 0 0.7113c0,0.0061 -0.0001,0.0123 -0.0002,0.0183 -0.0002,0.0061 -0.0004,0.0122 -0.0007,0.0182 -0.0003,0.0061 -0.0007,0.0121 -0.0012,0.0181 -0.0005,0.006 -0.001,0.012 -0.0016,0.0179 -0.0006,0.006 -0.0013,0.0119 -0.002,0.0178 -0.0008,0.0059 -0.0016,0.0118 -0.0025,0.0177 -0.0009,0.0059 -0.0019,0.0117 -0.003,0.0175 -0.001,0.0059 -0.0021,0.0116 -0.0033,0.0174 -0.0012,0.0058 -0.0025,0.0115 -0.0038,0.0173 -0.0013,0.0057 -0.0027,0.0114 -0.0042,0.0171 -0.0015,0.0056 -0.003,0.0113 -0.0046,0.0169l-0.005 0.0168c-0.0018,0.0055 -0.0036,0.011 -0.0054,0.0165 -0.0019,0.0056 -0.0039,0.011 -0.0058,0.0165 -0.002,0.0054 -0.0041,0.0108 -0.0063,0.0162l-0.0065 0.016 -0.007 0.0159c-0.0024,0.0052 -0.0048,0.0104 -0.0073,0.0156l-0.0077 0.0154 -0.0081 0.0153c-0.0027,0.005 -0.0055,0.01 -0.0084,0.015 -0.0029,0.0049 -0.0058,0.0099 -0.0088,0.0148 -0.0029,0.0049 -0.006,0.0097 -0.0091,0.0145 -0.003,0.0048 -0.0062,0.0096 -0.0094,0.0143 -0.0032,0.0048 -0.0065,0.0095 -0.0098,0.0141l-0.0101 0.0138c-0.0034,0.0046 -0.0069,0.0091 -0.0104,0.0136l-0.0108 0.0133c-0.0036,0.0044 -0.0073,0.0088 -0.011,0.0131 -0.0037,0.0043 -0.0075,0.0085 -0.0113,0.0128l-0.0001 0 -0.0116 0.0125 -0.0119 0.0122 -0.0001 0 -0.0122 0.0119 0 0 -0.0125 0.0117 -0.0128 0.0113 0 0c-0.0043,0.0038 -0.0086,0.0075 -0.013,0.0111l-0.0133 0.0107 -0.0001 0c-0.0044,0.0036 -0.0089,0.0071 -0.0135,0.0105 -0.0046,0.0034 -0.0092,0.0067 -0.0138,0.0101l-0.0001 0c-0.0046,0.0033 -0.0093,0.0065 -0.014,0.0097 -0.0048,0.0032 -0.0095,0.0064 -0.0143,0.0095 -0.0049,0.0031 -0.0097,0.0061 -0.0146,0.0091l0 0c-0.0049,0.003 -0.0098,0.0059 -0.0148,0.0087l-0.015 0.0085c-0.005,0.0027 -0.0101,0.0054 -0.0152,0.008l-0.0154 0.0077c-0.0052,0.0025 -0.0104,0.005 -0.0157,0.0074l0 0c-0.0053,0.0024 -0.0105,0.0047 -0.0158,0.0069 -0.0053,0.0023 -0.0107,0.0045 -0.0161,0.0066l-0.0161 0.0062 0 -3.9701zm-15.9015 10.637l-0.9878 0 0 -11.6523c0.5842,0.2923 0.9878,0.8971 0.9878,1.5916l0 3.7623 0 2.7419 0 3.5565zm-5.1266 -4.5435l-0.3812 0 0 -3.9749c0.2262,0.1194 0.3812,0.3573 0.3812,0.6295l0 1.2818 0 0.641 0 1.4226zm18.9022 2.5137l0 0z" />
                </symbol>

                <symbol id="relief-deadTree-1" viewBox="-10 -9 30 30">
                    <ellipse fill="#999999" opacity=".5" cx="6.0917" cy="7.5182" rx="2.8932" ry=".3408" />
                    <path fill="#585142"
                        d="M3.5153 1.3458c0.2543,-0.0013 0.7916,0.129 0.6583,0.3396 -0.0857,0.1354 -0.6435,1.074 -0.6404,1.114 0.0042,0.0531 0.341,0.6425 0.3357,1.0671 -0.005,0.4 -0.4393,0.5902 -0.7445,0.6156l-0.1526 -0.7164 -0.8522 -0.3727c0.1354,-0.828 0.3493,-0.4466 -0.2112,-1.4572 -0.1448,-0.261 0.2666,-0.5992 0.4246,-0.6946l-0.2495 0.0682 0.2497 -0.3491c-0.0387,0.0257 -0.0763,0.0603 -0.12,0.0839l0.0471 -0.2236 -0.4834 0.8931c-0.0975,0.1868 -0.1224,0.1338 0.005,0.2843 0.4911,0.5805 0.3652,0.7545 0.1577,1.3533l-0.57 -0.258c-0.0654,-0.3528 -0.0606,-0.8702 -0.2831,-1.0414 -0.1952,-0.1502 -0.2072,-0.1461 -0.1229,-0.535 0.0474,-0.2188 0.2619,-0.2628 0.4506,-0.4999 -0.2195,0.1614 -0.4687,0.2928 -0.4917,0.4311 -0.126,0.7587 -0.2153,0.3823 -0.9225,0.3141l0.5598 0.2152 -0.2753 0.1191c0.4778,-0.0459 1.0244,-0.3067 0.9364,1.1042l1.422 0.566c0.2198,0.0889 0.16,0.0419 0.2147,0.2873 0.0473,0.2124 0.2648,1.1447 0.2621,1.2321 0.0348,0.1295 1.1372,1.5251 1.0567,1.6851l-0.6487 0.534c0.2003,0.0023 0.3874,0.0799 0.5356,0.2115 0.321,-0.1964 0.6523,-0.1739 0.933,0.0841 0.0279,-0.0963 -0.0348,-0.2065 0.1893,-0.1382 -0.0511,-0.1825 0.0636,-0.3019 0.3652,-0.2167l-0.5587 -0.6647c-0.335,-0.4654 0.0657,-0.5361 0.3232,-0.8874 0.3199,-0.4366 0.4947,-1.3297 0.9872,-1.2478 0.166,0.0276 0.544,0.3328 0.6681,0.3902 -0.0526,-0.0727 -0.3251,-0.2763 -0.3757,-0.3471 1.1234,-0.3172 0.6664,-0.9833 1.0576,-1.1403 0.3553,-0.1426 0.4178,-0.1125 0.7358,0.0071 -0.0447,-0.0408 -0.1272,-0.083 -0.1599,-0.1386 0.0608,-0.1125 0.1637,-0.2309 0.2168,-0.3457 -0.4288,0.3352 0.1565,0.1887 -0.9798,0.3409 -0.076,0.1367 -0.2062,0.5445 -0.2709,0.7293 -0.0474,0.1354 -0.4617,0.3359 -0.5939,0.4082l-0.5365 -0.0954 0.4903 -0.4019c-0.7228,0.343 -0.6671,0.5239 -1.2151,1.3647 -0.1089,0.1629 -0.0654,0.1629 -0.2597,0.2666 -0.1824,0.0973 -0.5098,0.2844 -0.6886,0.3561 -0.0734,-0.0726 -0.3395,-0.5036 -0.3932,-0.5868 -0.1102,-0.1707 -0.1243,-0.1282 -0.0443,-0.3189 0.4751,-1.1814 0.3432,-0.7881 0.0867,-1.6479 -0.1573,-0.5272 0.5708,0.047 0.89,0.1609 -0.1139,-0.1055 -0.9469,-0.6786 -0.9647,-0.7257 -0.0096,-0.0255 0.0803,-0.5765 0.4293,-0.6942 0.2215,-0.0746 0.7565,-0.1045 0.9396,0.0794 0.0928,0.0932 0.1646,0.2261 0.2324,0.3401l-0.1008 -0.3823c0.5352,-0.1142 0.5229,-0.3132 1.2351,-0.1707 0.3041,0.0609 0.9743,0.2752 1.2277,0.2822l-0.1733 -0.1642 0.2597 -0.0104 -0.2894 -0.0697 0.3033 -0.1079c-0.3524,-0.0086 -0.4157,0.1266 -0.8613,0.037 -0.1587,-0.0319 -0.7112,-0.1209 -0.823,-0.1706l0.8073 -0.3358c0.0347,-0.1549 -0.0285,-0.6678 0.0729,-0.7688 0.104,-0.1035 0.4286,0.0056 0.7823,-0.0293 -0.6035,-0.1089 -0.758,-0.0385 -0.201,-0.6082 0.0264,-0.027 0.106,-0.1209 0.1223,-0.1483l-0.7942 0.7068c-0.1806,0.835 0.0273,0.6738 -0.5709,0.9316 -0.3515,0.1515 -0.684,0.3171 -1.0625,0.4386 -0.2353,0.0756 -1.005,-0.0716 -1.2564,-0.1546 0.1802,-0.3685 0.3858,-0.7438 0.5712,-1.1089 0.0411,-0.0808 0.394,-0.3205 0.7318,-0.2844l0.1679 0.0147c-0.041,-0.0393 -0.097,-0.0652 -0.1266,-0.1087l0.1758 -0.0375 -0.1404 -0.0163c0.0637,-0.0888 0.1594,-0.1402 0.2279,-0.2235l-0.9849 0.4772c-0.1089,0.0534 -0.4306,0.5672 -0.5266,0.6922 -0.1802,0.2202 -0.5124,-0.2033 -0.7609,-0.3405l0.2762 0.3034c-0.1828,-0.0025 -0.4046,-0.0156 -0.5464,0.0752l0.2056 -0.0195z" />
                    <path fill="#3D3A31"
                        d="M4.3375 7.6026l0.2401 -0.5118c0.0457,-0.0936 -0.0794,-0.2034 -0.1891,-0.3729 -0.0782,-0.121 -0.1611,-0.2395 -0.2481,-0.3677l-0.7328 -1.0888c-0.0268,-0.06 -0.1063,-0.4167 -0.1183,-0.4971 0.0936,-0.0606 0.1753,-0.082 0.3393,-0.197 0.1022,-0.0717 0.2115,-0.1589 0.2639,-0.2777 0.1007,-0.2281 0.0424,-0.7261 -0.0353,-0.9525 -0.0455,-0.1327 -0.093,-0.2647 -0.1366,-0.4022 -0.0524,-0.1652 -0.0621,-0.0948 0.0823,-0.3767 0.0557,-0.1089 0.35,-0.6707 0.3658,-0.7401 -0.0687,0.0461 -0.4823,0.7693 -0.5446,0.8713 -0.0548,0.0896 -0.0792,0.0842 -0.0263,0.1979 0.1713,0.3682 0.4361,0.9622 0.1819,1.2915 -0.1916,0.2482 -0.4358,0.3122 -0.7357,0.388l-0.1851 -0.6512c-0.0024,0.1012 0.2128,1.0065 0.2534,1.1899 0.0276,0.1246 0.026,0.1801 0.0921,0.2672 0.0555,0.0732 0.1032,0.1447 0.1557,0.2167 0.1043,0.1427 0.2011,0.2764 0.3071,0.4238 0.0998,0.1386 0.1978,0.2817 0.2931,0.4252 0.4653,0.6996 0.2999,0.6121 -0.3393,1.0732 0.1665,0.0216 0.3185,0.095 0.4423,0.2048 0.081,-0.0363 0.1852,-0.101 0.2742,-0.1139z" />
                </symbol>

                <symbol id="relief-deadTree-2" viewBox="-10 -9 30 30">
                    <ellipse fill="#999999" opacity=".5" cx="5.5691" cy="9.506" rx="4.825" ry=".5684" />
                    <path fill="#585142"
                        d="M1.679 3.5305l-0.5914 -0.2423c0.2049,0.3227 0.8568,0.3529 0.9257,1.1466 0.0188,0.2166 0.0334,0.2874 0.0274,0.2877l-0.0627 0.003c-0.1741,-0.114 -0.0803,-0.0814 -0.125,-0.5035l-0.149 0.4333c-0.884,-0.1024 -1.1345,-0.9856 -1.522,-1.157 0.0945,0.4164 0.1069,0.1444 0.3065,0.5819 0.1329,0.2913 0.1234,0.3803 0.3235,0.5433 -0.3018,-0.0152 -0.2722,-0.2108 -0.7765,-0.1333l0.8518 0.3089c0.3411,0.0711 0.4473,0.3096 0.8873,0.4034 0.7297,0.1555 0.8304,0.9419 0.8039,1.9517 -1.2559,0.0858 -1.1471,-1.4021 -1.1869,-1.4946l-0.0817 -0.1897 -0.0372 0.8722c-0.1953,-0.0862 -0.4195,-0.0759 -0.6206,-0.204 -0.3275,-0.2086 -0.1479,-0.3863 -0.4882,-0.4596 0.0371,0.5904 0.7744,0.7122 1.0801,1.012 0.2091,0.2051 0.2487,0.4467 0.4605,0.6561 0.1976,0.1955 0.3922,0.1808 0.5932,0.3942 -0.2392,0.1554 -0.2456,0.0512 -0.4157,0.2941 0.2789,0.2135 0.6512,-0.3638 0.6968,0.3659l-0.0753 0.1314 0.0057 0.3037c-0.0765,0.082 -0.1103,0.0108 -0.2853,-0.0638l0.1248 0.4129c-0.2614,0.0823 -0.2086,0.0986 -0.4283,0.26 -0.0687,-0.1591 -0.0574,-0.341 -0.0575,-0.3416 -0.1973,0.1955 -0.041,0.0251 -0.1724,0.3157l-0.2807 0.0375 -0.2353 0.172c0.0166,0.0305 0.0231,0.0503 0.0259,0.0641 0.5892,-0.1981 1.3769,-0.2863 2.2319,-0.2183 0.517,0.0411 1.0007,0.1347 1.4241,0.266 -0.2093,-0.1379 -0.4154,-0.3068 -0.6089,-0.2809 0.3384,-0.0334 0.557,0.1266 0.7762,-0.0291 -0.0116,-0.0171 -0.0336,-0.0585 -0.0414,-0.04 -0.2183,-0.1297 -0.1296,-0.0991 -0.3828,-0.1369 -0.8341,-0.0913 -1.0623,-1.1991 -0.6846,-2.1715 0.1148,-0.2957 0.15,-0.1675 0.1954,-0.3631 0.7256,-0.0816 1.4521,0.6923 1.8913,-0.18 -0.32,-0.0118 -0.3601,0.198 -0.7796,0.1439 -0.2875,-0.037 -0.5949,-0.1322 -0.7655,-0.3165 1.2886,-0.6494 1.0806,-0.8912 1.489,-1.4573 0.2383,-0.3304 0.3236,-0.1176 0.4895,-0.5992 -0.3842,0.0962 -0.668,0.5411 -0.923,0.8001 0.0294,-0.8219 0.5645,-1.0809 0.2601,-1.7852 -0.1194,0.3583 0.0793,0.3008 -0.2716,0.9492 -0.1488,0.2751 -0.2304,0.6341 -0.3535,0.8937 -0.1749,0.369 -1.0145,0.7821 -1.3429,0.6432 -0.2625,-1.5704 1.2608,-1.4244 1.7171,-2.9858 0.1082,-0.3703 -0.0046,-0.34 0.2521,-0.4762 -0.2374,-0.2138 -0.1318,0.1284 -0.1516,-0.3055 0.4125,-0.5937 0.4463,-0.2996 0.6287,-0.9535l0.1667 -0.4867c-0.3642,0.1212 -0.1886,0.2262 -0.3853,0.5867 -0.0991,0.1815 -0.2777,0.3195 -0.4897,0.3478 -0.1484,-0.1486 -0.3404,-0.415 -0.4219,-0.6144 -0.1726,-0.4224 -0.0332,-0.515 0.0165,-0.9229 -0.2513,0.1258 -0.2673,0.4884 -0.2032,0.8657 0.0777,0.4568 0.259,0.4728 0.3536,0.7365 0.2036,0.5674 -0.1231,1.5803 -0.4923,1.669 -0.2599,-0.6178 -0.1389,-0.5099 -0.0559,-1.1514 -0.3962,0.467 -0.0305,1.0251 -0.1346,1.3145 -0.1475,0.182 -0.526,0.4221 -0.7103,0.5992 -0.1897,0.1821 -0.1458,0.1848 -0.2987,0.3948 -0.1358,0.1867 -0.1887,0.203 -0.3348,0.4176 -0.1315,-0.6385 -0.4597,-1.0413 -0.7405,-1.3874 0.2,-0.2285 0.2784,-0.3478 0.6312,-0.4772 0.3178,-0.1166 0.5361,-0.1513 0.5389,-0.5903 -0.212,0.0746 -0.2207,0.3469 -0.6704,0.4752 0.0799,-0.2322 0.0813,-0.1298 0.1373,-0.4444 -0.2906,0.3241 -0.0801,0.3381 -0.3802,0.514 -0.1557,0.0913 -0.33,0.1116 -0.4702,0.2076 -0.1232,-0.402 -0.1303,-0.3989 -0.0658,-0.8723l0.1533 -0.2038c0.1132,-0.1545 0.1626,-0.2402 0.3489,-0.3217 0.3073,-0.1346 0.5114,-0.0923 0.5563,-0.4919 -0.2809,0.1498 -0.387,0.2416 -0.7518,0.3749 -0.3568,0.1303 -0.4097,0.3449 -0.7091,0.4842 -0.114,-0.3646 -0.271,-0.3342 -0.3815,-0.786 -0.1449,-0.5926 -0.0026,-0.7687 0.0853,-1.1817 -0.3132,0.2088 -0.3149,0.4188 -0.3345,0.9648 -0.4693,0.0005 -0.4863,-0.8063 -0.5087,-1.0178l-0.1143 0.5467c-0.2289,-0.099 -0.3561,-0.1846 -0.5848,-0.0251 0.1017,0.0842 0.7571,0.2068 1.1046,1.029 0.3769,0.8922 0.686,0.9642 0.5744,1.8877z" />
                    <path fill="#3D3A31"
                        d="M4.8565 9.7405c-0.2093,-0.1378 -0.4153,-0.3069 -0.6089,-0.2811 0.3383,-0.0334 0.5569,0.1266 0.7761,-0.0291 -0.0116,-0.0171 -0.0336,-0.0585 -0.0414,-0.04 -0.2183,-0.1297 -0.1296,-0.0991 -0.3827,-0.1369 -0.8341,-0.0913 -1.0624,-1.1991 -0.6847,-2.1715 0.1148,-0.2957 0.1501,-0.1675 0.1954,-0.3631 -0.0467,-0.123 0.0439,-0.1513 -0.2166,-0.132 -0.4837,0.0358 -0.4335,0.3011 -0.4749,0.451 -0.043,0.1554 -0.3572,0.7239 -0.3816,1.4623 -0.011,0.3289 0.0331,0.246 -0.0081,0.6595 -0.0107,0.1082 -0.031,0.2048 -0.0477,0.2933 0.0721,0.0012 0.1448,0.0035 0.218,0.007 -0.0003,-0.4729 -0.0122,-1.0018 0.0855,-1.2875 0.1016,-0.2975 -0.0153,-0.1074 0.1875,-0.3203 0,0.6477 -0.0814,1.158 -0.139,1.6153l0.0989 0.0072c0.5171,0.0411 1.0008,0.1346 1.4242,0.2661z" />
                </symbol>
            </g>

            <g id="rose" stroke-width="1">
                <g id="sL" stroke="#3f3f3f">
                    <line id="sL1" x1="0" y1="-20000" x2="0" y2="20000" />
                    <line id="sL2" x1="-20000" y1="0" x2="20000" y2="0" />
                </g>
                <use href="#sL" transform="rotate(45)" />
                <use href="#sL" transform="rotate(22.5)" />
                <use href="#sL" transform="rotate(-22.5)" />
                <use href="#sL" transform="rotate(11.25)" />
                <use href="#sL" transform="rotate(-11.25)" />
                <use href="#sL" transform="rotate(56.25)" />
                <use href="#sL" transform="rotate(-56.25)" />
                <g stroke-width="8" stroke-opacity="1" shape-rendering="geometricprecision">
                    <circle r="9" stroke="#000000" fill="#1b1b1b" />
                    <circle r="75" stroke="#008000" fill="#ffffff" fill-opacity=".1" />
                    <circle r="212" stroke="#1b1b1b" />
                    <circle r="211" stroke="#008000" fill="#ffffff" fill-opacity=".1" />
                </g>
                <g stroke="#1b1b1b" stroke-opacity="1" shape-rendering="geometricprecision">
                    <circle r="71" />
                    <circle r="79" />
                    <circle r="94" />
                    <circle r="152" />
                    <circle r="164" />
                    <circle r="207" />
                </g>
                <g id="s3" stroke-opacity="1" shape-rendering="geometricprecision">
                    <g id="s2">
                        <g id="s1" stroke="#1b1b1b">
                            <path
                                d="M 39.416,95.16 C 33.65,103.95 30.76,110.5 28.93,117.18 C 15.24,113.43 13.54,127.15 23.04,131 C 13.71,145.8 7.84,173.93 0,212 L 0,103 A 103,103 0 0,0 39.416,95.16 z"
                                fill="#47a3d1" />
                            <path
                                d="M 39.416,95.16 C 33.65,103.95 30.76,110.5 28.93,117.18 C 15.24,113.43 13.54,127.15 23.04,131 C 13.71,145.8 7.84,173.93 0,212 L 0,103 A 103,103 0 0,0 39.416,95.16 z"
                                fill="black" transform="scale(-1,1)" />
                            <path
                                d="M -31.995,160.849 A 164,164 0 0,0 31.995,160.849 C 18.9,170.1 8.4,176.3 0,207 C -8.4,176.3 -18.9,170.1 -31.995,160.849 z"
                                fill="#c2390f" transform="rotate(22.5)" />
                        </g>
                        <use href="#s1" transform="rotate(45)" />
                    </g>
                    <use href="#s2" transform="rotate(90)" />
                </g>
                <use href="#s3" transform="scale(-1)" />
            </g>

            <g id="coas"></g>

            <g id="gridPatterns">
                <pattern id="pattern_square" width="25" height="25" patternUnits="userSpaceOnUse" fill="none">
                    <path d="M 25 0 L 0 0 0 25" />
                </pattern>
                <pattern id="pattern_pointyHex" width="25" height="43.4" patternUnits="userSpaceOnUse" fill="none">
                    <path d="M 0,0 12.5,7.2 25,0 M 12.5,21.7 V 7.2 Z M 0,43.4 V 28.9 L 12.5,21.7 25,28.9 v 14.5" />
                </pattern>
                <pattern id="pattern_flatHex" width="43.4" height="25" patternUnits="userSpaceOnUse" fill="none">
                    <path d="M 43.4,0 36.2,12.5 43.4,25 M 21.7,12.5 H 36.2 Z M 0,0 H 14.5 L 21.7,12.5 14.5,25 H 0" />
                </pattern>
            </g>
        </defs>
    </svg>
    <div class="d-none">
        <div id="mapFilters" data-tip="Set a filter to be applied to the map in general">
            <p>Toggle global filters:</p>
            <button id="grayscale" class="radio">Grayscale</button>
            <button id="sepia" class="radio">Sepia</button>
            <button id="dingy" class="radio">Dingy</button>
            <button id="tint" class="radio">Tint</button>
        </div>

    </div>
    <script>
        function updateReligion(event) {
            var i = event.target.getAttribute('data-id');
            var field = event.target.getAttribute('data-field');
            regionReligions[i - 1][field] = event.target.value;
            pack.religions[i][field] = event.target.value;
            if (field == 'expansionism') {
                Religions.expandReligions();
                drawReligions();
            }
        }

        function religionsTable() {
            var table = document.getElementById("religions");
            table.innerHTML = '';
            let r;
            let rural;
            let urban;
            let population;
            for (var i = 0; i < regionReligions.length; i++) {
                var tr = document.createElement("tr");
                var td = document.createElement("td");
                var input = document.createElement("input");
                tr.className = "subtle";
                input.setAttribute('data-id', regionReligions[i].i);
                input.setAttribute('data-field', 'name');
                input.value = regionReligions[i]['name']
                input.onchange = updateReligion;
                input.type = "text";
                td.append(input);
                td.onmouseover = religionHighlightOn;
                td.onmouseout = religionHighlightOff;
                tr.append(td);

                var select = document.createElement("select");
                td = document.createElement("td");
                select.setAttribute('data-id', regionReligions[i].i);
                var option = document.createElement("option");
                option.innerHTML = "Random";
                select.append(option);
                for (var l = 0; l < regionCultures.length; l++) {
                    if (!regionCultures[l]['name']) continue;
                    option = document.createElement("option");
                    option.value = l + 1;
                    option.innerHTML = regionCultures[l]['name'][0].toUpperCase() + regionCultures[l]['name'].substring(1);
                    option.selected = l == regionReligions[i]['culture'] - 1;
                    select.append(option);
                }
                select.setAttribute('data-field', 'culture');
                select.onchange = updateReligion;
                td.append(select);
                tr.append(td);

                var type = ['Folk', 'Organized', 'Cult', 'Heresy'];
                var select = document.createElement("select");
                td = document.createElement("td");
                select.setAttribute('data-id', regionReligions[i].i);
                var option = document.createElement("option");
                option.innerHTML = "Random";
                select.append(option);
                for (var l = 0; l < type.length; l++) {
                    option = document.createElement("option");
                    option.value = type[l];
                    option.innerHTML = type[l][0].toUpperCase() + type[l].substring(1);
                    option.selected = type[l] == regionReligions[i]['type'];
                    select.append(option);
                }
                select.setAttribute('data-field', 'type');
                select.onchange = updateReligion;
                td.append(select);
                tr.append(td);

                var forms = ['Shamanism', 'Animism', 'Polytheism', 'Dualism', 'Monotheism', 'Non-theism',
                    'Ancestor worship', 'Cult', 'Order', 'Coterie', 'Arcanum', 'Heresy', 'Sect', 'Schism', 'Dissenters',
                    'Apostates'
                ];
                var select = document.createElement("select");
                td = document.createElement("td");
                select.setAttribute('data-id', regionReligions[i].i);
                var option = document.createElement("option");
                option.innerHTML = "Random";
                select.append(option);
                for (var l = 0; l < forms.length; l++) {
                    option = document.createElement("option");
                    option.value = forms[l];
                    option.innerHTML = forms[l][0].toUpperCase() + forms[l].substring(1);
                    option.selected = forms[l] == regionReligions[i]['form'];
                    select.append(option);
                }
                select.setAttribute('data-field', 'form');
                select.onchange = updateReligion;
                td.append(select);
                tr.append(td);

                input = document.createElement("input");
                td = document.createElement("td");
                input.setAttribute('data-id', regionReligions[i].i);
                input.value = regionReligions[i]['deity']
                input.setAttribute('data-field', 'deity');
                input.onchange = updateReligion;
                input.type = "text";
                td.append(input);
                tr.append(td);

                input = document.createElement("input");
                td = document.createElement("td");
                input.setAttribute('data-id', regionReligions[i].i);
                input.value = regionReligions[i]['expansionism']
                input.type = 'range';
                input.min = 0.5;
                input.max = 20;
                input.step = 0.5;
                input.setAttribute('data-field', 'expansionism');
                input.setAttribute('style', 'width:3rem');
                input.onchange = updateReligion;
                td.append(input);
                tr.append(td);

                input = document.createElement("span");
                td = document.createElement("td");
                input.setAttribute('data-id', regionReligions[i].i);
                if (typeof pack != 'undefined' && pack.religions && pack.religions.length > i + 1 && pack.religions[i + 1]
                    .rural) {
                    r = pack.religions[i + 1]
                    rural = r.rural * populationRate;
                    urban = r.urban * populationRate * urbanization;
                    population = rn(rural + urban);
                    input.innerHTML = population;
                }

                input.setAttribute('data-field', 'believers');
                input.setAttribute('style', 'width:4rem');
                input.onchange = updateReligion;
                td.append(input);
                tr.append(td);
                tr.onmouseover = religionHighlightOn;
                tr.onmouseout = religionHighlightOff;

                td = document.createElement("td");
                var button = document.createElement("button");
                button.setAttribute('data-id', regionReligions[i].i);
                button.setAttribute('data-array-id', i);
                button.setAttribute('style', "line-height: 1");
                button.onclick = religionRemove;
                button.innerHTML = "x";
                button.className = "btn btn-sm btn-danger";
                td.append(button);
                tr.append(td);

                table.append(tr);
            }

        }

        function religionRemove(event) {
            let religion = event.target.getAttribute('data-id');

            alertMessage.innerHTML = "Are you sure you want to remove the religion?";
            $("#alert").dialog({
                resizable: false,
                title: "Remove Religion",
                buttons: {
                    Remove: function() {
                        relig.select("#religion" + religion).remove();
                        relig.select("#religion-gap" + religion).remove();
                        debug.select("#religionsCenter" + religion).remove();

                        pack.cells.religion.forEach((r, i) => {
                            if (r === religion) pack.cells.religion[i] = 0;
                        });
                        pack.religions[religion].removed = true;
                        const origin = pack.religions[religion].origin;
                        pack.religions.forEach(r => {
                            if (r.origin === religion) r.origin = origin;
                        });

                        let i = event.target.getAttribute('data-array-id');
                        window.regionReligions.splice(i, 1);
                        religionsTable();

                        $(this).dialog("close");
                    },
                    Cancel: function() {
                        $(this).dialog("close");
                    }
                }
            });
        }

        function newReligion() {
            regionReligions.push({
                'name': '',
                'culture': '',
                'type': '',
                'form': '',
                'deity': '',
                'expansionism': 0,
                'believers': ''
            });
            religionsTable();
        }

        function updateCulture(event) {
            var i = event.target.getAttribute('data-id');
            var field = event.target.getAttribute('data-field');
            regionCultures[i - 1][field] = event.target.value;
            pack.cultures[i][field] = event.target.value;
            if (field == 'state') {
                regionCultures[i][field] = event.target.checked;
            }
            if (field == 'name') {
                religionsTable();
                statesTable();
            }
            if (field == 'expansionism') {
                Cultures.expand();
                drawCultures();
            }
        }

        function culturesTable() {
            var table = document.getElementById("cultures");
            table.innerHTML = '';
            for (var i = 0; i < regionCultures.length; i++) {
                var tr = document.createElement("tr");
                var td = document.createElement("td");
                var input = document.createElement("input");
                tr.className = "subtle";
                input.setAttribute('data-id', regionCultures[i].i);
                input.setAttribute('data-field', 'name');
                input.value = regionCultures[i]['name']
                input.onchange = updateCulture;
                input.type = "text";
                td.append(input);
                td.onmouseover = cultureHighlightOn;
                td.onmouseout = cultureHighlightOff;
                tr.append(td);

                var select = document.createElement("select");
                td = document.createElement("td");
                select.setAttribute('data-id', regionCultures[i].i);
                var option = document.createElement("option");
                option.innerHTML = "Select";
                select.append(option);
                for (var l = 0; l < regionRaces.length; l++) {
                    if (!regionRaces[l]['name']) continue;
                    option = document.createElement("option");
                    option.value = regionRaces[l].id;
                    option.innerHTML = regionRaces[l].name[0].toUpperCase() + regionRaces[l].name.substring(1);
                    option.selected = regionRaces[l].id == regionCultures[i]['dominant_race'];
                    select.append(option);
                }
                select.setAttribute('data-field', 'dominant_race');
                select.onchange = updateCulture;
                td.append(select);
                tr.append(td);

                input = document.createElement("input");
                td = document.createElement("td");
                input.setAttribute('data-id', regionCultures[i].i);
                input.value = regionCultures[i]['expansionism'];
                input.type = 'range';
                input.min = 0.1;
                input.max = 20;
                input.step = 0.1;
                input.setAttribute('data-field', 'expansionism');
                input.onchange = updateCulture;
                td.append(input);
                tr.append(td);

                var namebase = ["German", "English", "French", "Italian", "Castillian", "Ruthenian", "Nordic", "Greek",
                    "Roman", "Finnic", "Korean", "Chinese", "Japanese", "Portuguese", "Nahuatl", "Hungarian", "Turkish",
                    "Berber", "Arabic", "Inuit", "Basque", "Nigerian", "Celtic", "Mesopotamian", "Iranian", "Hawaiian",
                    "Karnataka", "Quechua", "Swahili", "Vietnamese", "Cantonese", "Mongolian", "Elven", "Dark Elven",
                    "Dwarven", "Goblin", "Orc", "Giant", "Draconic", "Arachnid", "Serpents"
                ];
                var select = document.createElement("select");
                td = document.createElement("td");
                select.setAttribute('data-id', regionCultures[i].i);
                var option = document.createElement("option");
                option.value = 32;
                option.innerHTML = "Generic";
                select.append(option);
                for (var l = 0; l < namebase.length; l++) {
                    if (l == 32) continue;
                    option = document.createElement("option");
                    option.value = l;
                    option.innerHTML = namebase[l][0].toUpperCase() + namebase[l].substring(1);
                    option.selected = namebase[l] == regionCultures[i]['base'];
                    select.append(option);
                }
                select.setAttribute('data-field', 'base');
                select.onchange = updateCulture;
                td.append(select);
                tr.append(td);
                tr.onmouseover = cultureHighlightOn;
                tr.onmouseout = cultureHighlightOff;


                td = document.createElement("td");
                var button = document.createElement("button");
                button.setAttribute('style', "line-height: 1");
                button.setAttribute('data-array-id', i);
                button.setAttribute('data-id', regionCultures[i].i);
                button.onclick = cultureRemove;
                button.innerHTML = "x";
                button.className = "btn btn-sm btn-danger";
                td.append(button);
                tr.append(td);

                table.append(tr);
            }

        }


        function cultureRemove(event) {
            let culture = event.target.getAttribute('data-id');

            alertMessage.innerHTML = "Are you sure you want to remove the culture?";
            $("#alert").dialog({
                resizable: false,
                title: "Remove Culture",
                buttons: {
                    Remove: function() {
                        cults.select("#culture" + culture).remove();
                        debug.select("#cultureCenter" + culture).remove();

                        pack.burgs.filter(b => b.culture == culture).forEach(b => (b.culture = 0));
                        pack.states.forEach((s, i) => {
                            if (s.culture === culture) s.culture = 0;
                        });
                        pack.cells.culture.forEach((c, i) => {
                            if (c === culture) pack.cells.culture[i] = 0;
                        });
                        pack.cultures[culture].removed = true;

                        const origin = pack.cultures[culture].origin;
                        pack.cultures.forEach(c => {
                            if (c.origin === culture) c.origin = origin;
                        });
                        let i = event.target.getAttribute('data-array-id');
                        window.regionCultures.splice(i, 1);
                        culturesTable();

                        $(this).dialog("close");
                    },
                    Cancel: function() {
                        $(this).dialog("close");
                    }
                }
            });
        }

        function stateRemove(event) {
            let i = event.target.getAttribute('data-array-id');
            let religion = event.target.getAttribute('data-id');

            alertMessage.innerHTML = "Are you sure you want to remove this state?";
            $("#alert").dialog({
                resizable: false,
                title: "Remove State",
                buttons: {
                    Remove: function() {
                        window.regionStates.splice(i, 1);
                        statesTable();
                        let state = event.target.getAttribute('data-state-id');
                        const statesBody = d3.select("#statesBody");
                        statesBody.select("#state" + state).remove();
                        statesBody.select("#state-gap" + state).remove();
                        statesHalo.select("#state-border" + state).remove();
                        labels.select("#stateLabel" + state).remove();
                        defs.select("#textPath_stateLabel" + state).remove();

                        unfog("focusState" + state);
                        pack.burgs.forEach(b => {
                            if (b.state === state) b.state = 0;
                        });
                        pack.cells.state.forEach((s, i) => {
                            if (s === state) pack.cells.state[i] = 0;
                        });

                        // remove emblem
                        const coaId = "stateCOA" + state;
                        if (document.getElementById(coaId)) document.getElementById(coaId).remove();
                        emblems.select(`#stateEmblems > use[data-i='${state}']`).remove();

                        // remove provinces
                        pack.states[state].provinces.forEach(p => {
                            pack.provinces[p] = {
                                i: p,
                                removed: true
                            };
                            pack.cells.province.forEach((pr, i) => {
                                if (pr === p) pack.cells.province[i] = 0;
                            });
                            const coaId = "provinceCOA" + p;
                            if (document.getElementById(coaId)) document.getElementById(coaId).remove();
                            emblems.select(`#provinceEmblems > use[data-i='${p}']`).remove();
                            const g = provs.select("#provincesBody");
                            g.select("#province" + p).remove();
                            g.select("#province-gap" + p).remove();
                        });

                        // remove military
                        pack.states[state].military.forEach(m => {
                            const id = `regiment${state}-${m.i}`;
                            const index = notes.findIndex(n => n.id === id);
                            if (index != -1) notes.splice(index, 1);
                        });
                        armies.select("g#army" + state).remove();

                        const capital = pack.states[state].capital;
                        pack.burgs[capital].capital = 0;
                        pack.burgs[capital].state = 0;
                        moveBurgToGroup(capital, "towns");

                        pack.states[state] = {
                            i: state,
                            removed: true
                        };

                        debug.selectAll(".highlight").remove();
                        if (!layerIsOn("toggleStates")) toggleStates();
                        else drawStates();
                        if (!layerIsOn("toggleBorders")) toggleBorders();
                        else drawBorders();
                        if (layerIsOn("toggleProvinces")) drawProvinces();


                        $(this).dialog("close");
                    },
                    Cancel: function() {
                        $(this).dialog("close");
                    }
                }
            });
        }

        function newCulture() {

            regionCultures.push({
                'i': regionCultures.length,
                'name': '',
                'race_id': '',
                'expansionism': 1,
                'base': 0,
                'shield': ra(shapes)
            });
            console.log(regionCultures);
            culturesTable();
        }

        function updateState(event) {
            var i = event.target.getAttribute('data-id');
            var field = event.target.getAttribute('data-field');
            if (event.target.type == 'range') {
                regionStates[i - 1][field] = event.target.value;
                pack.states[i][field] = event.target.value;
            } else {
                regionStates[i - 1][field] = event.target.value;
                pack.states[i][field] = event.target.value;
            }
            if (field == 'culture') {
                regionStates[i]['dominant_culture'] = event.target.innerHTML;
            }
            if (field == 'form') {
                BurgsAndStates.defineStateForms()
            }
            if (field == 'expansionism') {
                BurgsAndStates.expandStates();
                drawStates();
                BurgsAndStates.drawStateLabels()
            }
            if (field == 'name') {
                pack.states[i].fullName = BurgsAndStates.getFullName(pack.states[i]);
                religionsTable();
                BurgsAndStates.drawStateLabels()
            }
        }

        function statesTable() {
            var table = document.getElementById("states");
            table.innerHTML = '';
            console.log(regionStates);
            for (var i = 0; i < regionStates.length; i++) {
                console.log(i);
                var tr = document.createElement("tr");
                var td = document.createElement("td");
                var input = document.createElement("input");
                tr.className = "subtle";
                input.setAttribute('data-id', regionStates[i].i);
                input.setAttribute('data-field', 'name');
                input.setAttribute('placeholder', 'Generated');
                input.value = regionStates[i]['name']
                input.onchange = updateState;
                input.type = "text";
                td.onmouseover = stateHighlightOn;
                td.onmouseout = stateHighlightOff;
                td.append(input);
                tr.append(td);

                var select = document.createElement("select");
                td = document.createElement("td");
                select.setAttribute('data-id', regionStates[i].i);
                var option = document.createElement("option");
                option.innerHTML = "Random";
                select.append(option);
                for (var l = 0; l < regionCultures.length; l++) {
                    if (!regionCultures[l]['name']) continue;
                    option = document.createElement("option");
                    option.value = regionCultures[l].id;
                    option.innerHTML = regionCultures[l].name[0].toUpperCase() + regionCultures[l].name.substring(1);
                    option.selected = l == regionStates[i]['culture'] - 1;
                    select.append(option);
                }
                select.setAttribute('data-field', 'culture');
                select.onchange = updateState;
                td.append(select);
                tr.append(td);

                input = document.createElement("input");
                td = document.createElement("td");
                input.setAttribute('data-id', regionStates[i].i);
                input.value = regionStates[i]['expansionism'];
                input.type = 'range';
                input.min = 0;
                input.max = 20;
                input.step = 0.5;
                input.setAttribute('data-field', 'expansionism');
                input.onchange = updateState;
                td.append(input);
                tr.append(td);


                td = document.createElement("td");
                var stateForm = ["Monarchy", "Republic", "Union", "Anarchy", "Theocracy"];
                var select = document.createElement("select");
                select.setAttribute('data-id', regionStates[i].i);
                var option = document.createElement("option");
                let selected = false;
                option.innerHTML = "Random";
                select.append(option);
                for (var l = 0; l < stateForm.length; l++) {
                    option = document.createElement("option");
                    option.value = stateForm[l];
                    option.innerHTML = stateForm[l];
                    option.selected = stateForm[l] == regionStates[i]['form'];
                    if (option.selected) selected = true;
                    select.append(option);
                }
                if (!selected && typeof regionStates[i]['form'] !== undefined && !regionStates[i]['form']) {
                    option = document.createElement("option");
                    option.value = regionStates[i]['form'];
                    option.innerHTML = regionStates[i]['form'];
                    option.selected = true
                    select.append(option);
                }
                select.setAttribute('data-field', 'form');
                select.onchange = updateState;
                td.append(select);

                tr.append(td);

                td = document.createElement("td");
                var button = document.createElement("button");
                button.setAttribute('data-array-id', i);
                button.setAttribute('data-id', regionStates[i].i);
                button.setAttribute('style', "line-height: 1");
                button.onclick = stateRemove;
                button.innerHTML = "x";
                button.className = "btn btn-sm btn-danger";
                td.append(button);

                tr.onmouseover = stateHighlightOn;
                tr.onmouseout = stateHighlightOff;
                tr.append(td);

                table.append(tr);
            }
        }

        function religionHighlightOn(event) {
            const religion = +event.target.dataset.id;
            const info = document.getElementById("religionInfo");
            if (info) {
                d3.select("#hierarchy")
                    .select("g[data-id='" + religion + "'] > path")
                    .classed("selected", 1);
                const r = pack.religions[religion];
                const type = r.name.includes(r.type) ? "" : r.type === "Folk" || r.type === "Organized" ? ". " + r.type +
                    " religion" : ". " + r.type;
                const form = r.form === r.type || r.name.includes(r.form) ? "" : ". " + r.form;
                const rural = r.rural * populationRate;
                const urban = r.urban * populationRate * urbanization;
                const population = rural + urban > 0 ? ". " + si(rn(rural + urban)) + " believers" : ". Extinct";
                info.innerHTML = `${r.name}${type}${form}${population}`;
                tip(
                    "Drag to change parent, drag to itself to move to the top level. Hold CTRL and click to change abbreviation"
                );
            }
            const animate = d3.transition().duration(500).ease(d3.easeSinIn);

            const el = document.querySelector(`div[data-id='${religion}']`);
            if (el) el.classList.add("active");

            if (!layerIsOn("toggleReligions")) return;
            if (customization) return;
            relig
                .select("#religion" + religion)
                .raise()
                .transition(animate)
                .attr("stroke-width", 2.5)
                .attr("stroke", "#c13119");
            debug
                .select("#religionsCenter" + religion)
                .raise()
                .transition(animate)
                .attr("r", 8)
                .attr("stroke-width", 2)
                .attr("stroke", "#c13119");
        }

        function religionHighlightOff(event) {
            const religion = +event.target.dataset.id;
            const info = document.getElementById("religionInfo");
            if (info) {
                d3.select("#hierarchy")
                    .select("g[data-id='" + religion + "'] > path")
                    .classed("selected", 0);
                info.innerHTML = "&#8205;";
                tip("");
            }

            const el = document.querySelector(`div[data-id='${religion}']`);
            if (el) el.classList.remove("active");

            relig
                .select("#religion" + religion)
                .transition()
                .attr("stroke-width", null)
                .attr("stroke", null);
            debug
                .select("#religionsCenter" + religion)
                .transition()
                .attr("r", 4)
                .attr("stroke-width", 1.2)
                .attr("stroke", null);
        }


        function cultureHighlightOn(event) {
            const culture = +event.target.dataset.id;
            const info = document.getElementById("cultureInfo");
            if (info) {
                d3.select("#hierarchy")
                    .select("g[data-id='" + culture + "'] > path")
                    .classed("selected", 1);
                const c = pack.cultures[culture];
                const rural = c.rural * populationRate;
                const urban = c.urban * populationRate * urbanization;
                const population = rural + urban > 0 ? si(rn(rural + urban)) + " people" : "Extinct";
                info.innerHTML = `${c.name} culture. ${c.type}. ${population}`;
                tip(
                    "Drag to change parent, drag to itself to move to the top level. Hold CTRL and click to change abbreviation"
                );
            }

            if (!layerIsOn("toggleCultures")) return;
            if (customization) return;
            const animate = d3.transition().duration(500).ease(d3.easeSinIn);
            cults
                .select("#culture" + culture)
                .raise()
                .transition(animate)
                .attr("stroke-width", 2.5)
                .attr("stroke", "#d0240f");
            debug
                .select("#cultureCenter" + culture)
                .raise()
                .transition(animate)
                .attr("r", 8)
                .attr("stroke", "#d0240f");
        }

        function cultureHighlightOff(event) {
            const culture = +event.target.dataset.id;
            const info = document.getElementById("cultureInfo");
            if (info) {
                d3.select("#hierarchy")
                    .select("g[data-id='" + culture + "'] > path")
                    .classed("selected", 0);
                info.innerHTML = "&#8205;";
                tip("");
            }

            if (!layerIsOn("toggleCultures")) return;
            cults
                .select("#culture" + culture)
                .transition()
                .attr("stroke-width", null)
                .attr("stroke", null);
            debug
                .select("#cultureCenter" + culture)
                .transition()
                .attr("r", 6)
                .attr("stroke", null);
        }


        function stateHighlightOff() {
            debug.selectAll(".highlight").each(function() {
                d3.select(this).transition().duration(1000).attr("opacity", 0).remove();
            });
        }


        function stateHighlightOn(event) {
            if (!layerIsOn("toggleStates")) return;
            if (defs.select("#fog path").size()) return;

            const state = +event.target.dataset.id;
            if (customization || !state) return;
            const d = regions.select("#state" + state).attr("d");

            const path = debug.append("path").attr("class", "highlight").attr("d", d).attr("fill", "none").attr("stroke",
                "red").attr("stroke-width", 1).attr("opacity", 1).attr("filter", "url(#blur1)");

            const l = path.node().getTotalLength(),
                dur = (l + 5000) / 2;
            const i = d3.interpolateString("0," + l, l + "," + l);
            const animate = d3.transition().duration(500).ease(d3.easeSinIn);
            path
                .transition()
                .duration(1500)
                .attrTween("stroke-dasharray", function() {
                    return t => i(t);
                });
        }

        function newState() {
            regionStates.push({
                name: '',
                culture: '',
                exp: 0,
                dominant_culture: '',
                form: ''
            });
            statesTable();
        }

        function religionsCalc(count, cultsCount) {
            let religions = window.regionReligions;
            if (religions.length == 0) return [count, cultsCount];
            let organized = 0;
            let cults = 0;
            window.regionReligions = religions.map((r) => {
                if (!r.type) {
                    if (P(0.5)) r.type = "Organized";
                    else r.type = "Cult";
                }
                if (r.type == "Cult") cults += 1;
                if (r.type == "Organized") organized += 1;

                return r;
            });
            return [organized, cults];
        }

        function loadReligion(i, type) {
            let religion = window.regionReligions.filter((r) => r.type === type)[i];
            if (religion && !religion.expansionism) religion.expansionism = (rand(25, 50) / 10);

            return religion;
        }

        function shuffle(array) {
            let currentIndex = array.length,
                randomIndex;

            // While there remain elements to shuffle...
            while (currentIndex != 0) {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;

                // And swap it with the current element.
                [array[currentIndex], array[randomIndex]] = [
                    array[randomIndex], array[currentIndex]
                ];
            }

            return array;
        }

        function religiousCenter(i, type) {
            let religion = window.regionReligions.filter((r) => r.type === type)[i];
            if (religion && religion.culture) {
                return pack.cultures[religion.culture].center;
            }
            return false;
        }

        function setBurgs(value) {
            let manorsInput = document.getElementById('manorsInput');
            console.log(manorsInput.value);
            console.log($('.burg-density'));
            $('.burg-density').each((i) => {
                if ($('.burg-density')[i].getAttribute('data-value') == value) $('.burg-density')[i].className =
                    "btn btn-primary burg-density";
                else $('.burg-density')[i].className = "btn btn-secondary burg-density";
            });
            manorsInput.value = value;
            localStorage.setItem("manorsInput", value)
            console.log(manorsInput.value);
        }

        function drawIcons() {
            const table = document.getElementById("newMarkerTable");
            const input = document.getElementById("addIconInput");
            let customIcons = [];

            if (JSON.parse(localStorage.getItem("customIcons"))) customIcons = JSON.parse(localStorage.getItem(
                "customIcons"));
            table.innerHTML = '';
            const icons = [
                "📍",
                "🚩",
                "🏳️",
                "🏴",
                "🏴‍☠️",
                "⚔️",
                "🏹",
                "💀",
                "☠️",
                "☣️",
                "☢️",
                "🐉",
                "🦑",
                "💎",
                "🔎",
                "🐴",
                "💣",
                "🌊",
                "🎯",
                "⚓",
                "🔮",
                "📯",
                "⚒️",
                "🛡️",
                "👑",
                "⚜️",
                "🍻",
                "🍺",
                "🛌",
                "🌋",
                "🗝️",
                "🏛️",
                "🕳️",
                "🕸️",
                "🗡️",
                "🔪",
                "⛏️",
                "🐾",
                "🎪",
                "🏰",
                "🏯",
                "🎭",
                "🙏",
                "🎲",
                "💍",
                "⚗️",
                "📕",
                "📜",
                "🔔",
                "🔥",
                "⚡",
                "❄️",
                "🧱",
                "⏳",
                "🏇",
                "🎎",
                "👥",
                ...customIcons,
            ];
            console.log(icons);
            let row = "";
            for (let i = 0; i < icons.length; i++) {
                if (i % 10 === 0) row = table.insertRow((i / 10) | 0);
                const cell = row.insertCell(i % 10);
                cell.innerHTML = icons[i];
            }
            console.log(table);

            table.onclick = (e) => {
                if (e.target.tagName === "TD") {
                    if (window.selectedMarker) {
                        $('#newMarkerTable tr').each(function() {
                            $(this).find('td').each(function() {
                                console.log(this.className);
                                this.className = '';;
                            })
                        });
                    }
                    e.target.className = "selected-icon";
                    window.selectedMarker = e.target.innerHTML;
                    toggleAddMarkerCustom();
                }
            };

        }

        function toggleAddMarkerCustom() {
            viewbox.style("cursor", "crosshair").on("click", addMarkerOnClickCustom);
            tip("Click on map to add a marker. Hold Shift to add multiple " + window.selectedMarker, true);
            if (!layerIsOn("toggleMarkers")) toggleMarkers();
        }

        function isLake() {

            const el = d3.event.target;
            if (!el || !el.parentElement || !el.parentElement.parentElement) return false;
            const parent = el.parentElement;
            const grand = parent.parentElement;
            const great = grand.parentElement;
            return grand.id == "lakes" || great.id == "lakes";
        }

        function addMarkerOnClickCustom() {
            const {
                markers
            } = pack;
            console.log(markers);
            const point = d3.mouse(this);
            const cell = findCell(point[0], point[1]);
            const x = rn(point[0], 2);
            const y = rn(point[1], 2);
            const i = last(markers).i + 1;
            const marker = {
                icon: window.selectedMarker ? window.selectedMarker : "❓",
                i,
                x,
                y
            };

            if (["🏇", "🎎", "👥"].indexOf(window.selectedMarker) + 1) {
                marker.type = "party";
                addParty(i);
            }
            if (["🍻", "🍺"].indexOf(window.selectedMarker) + 1) {
                marker.type = "tavern";
                addInnHook(i, cell, "tavern");
            }
            if (window.selectedMarker == "🛌") {
                marker.type = "inn";
                addInnHook(i, cell, "inn");
            }
            if (["⚔️", "🏹", ].indexOf(window.selectedMarker) + 1) {
                marker.type = "brigand";
                addBrigandHook(i, cell);
            }
            if (window.selectedMarker == "⛏️") {
                marker.type = "mine";
                addMineHook(i, cell);
            }
            if (window.selectedMarker == "🌋") {
                marker.type = "volcano";
                addVolcanoHook(i, cell);
            }
            if (window.selectedMarker == "🕸️") {
                marker.type = "spider";
                addSpiderHook(i, cell);
            }
            if (window.selectedMarker == "🏴‍☠️") {
                marker.type = "pirate";
                addPirateHook(i, cell);
            }
            if (["🏴", "☠️", "💀", "🦑", "🐉"].indexOf(window.selectedMarker) + 1) {
                console.log(isWater(cell));
                console.log(isLake(cell));
                if (isLake(cell)) addLakeMonsterHook(i, cell);
                else if (isWater(cell)) addSeaMonsterHook(i, cell);
                else addLandMonsterHook(i, cell);
            }
            if (["☣️", "☢️"].indexOf(window.selectedMarker) + 1) {}
            if (["🏛️", "🕳️", "🏺", "🗝️"].indexOf(window.selectedMarker) + 1) {
                addDungeonHook(i, cell);
            }

            markers.push(marker);
            const markersElement = document.getElementById("markers");
            markersElement.insertAdjacentHTML("beforeend", drawMarker(marker, 1));

            if (d3.event.shiftKey === false) {
                restoreDefaultEvents();
                clearMainTip();
                $('#newMarkerTable tr').each(function() {
                    $(this).find('td').each(function() {
                        console.log(this.className);
                        this.className = '';;
                    })
                });
            }
        }

        function addParty(i) {
            notes.push({
                id: "marker" + id,
                name: "Enter Party Name",
                legend: ``,
            });
        }

        function addIcon() {
            let customIcons = JSON.parse(localStorage.getItem("customIcons"));
            if (typeof customIcons !== "array") customIcons = [];
            let newIcon = document.getElementById('addIconInput').value;
            console.log(customIcons);
            if (newIcon) {
                customIcons.push(newIcon);
                localStorage.setItem('customIcons', JSON.stringify(customIcons));
                drawIcons();
            }
            console.log(customIcons);
        }

        function addVolcanoeHook(id, cell) {
            const proper = Names.getCulture(cells.culture[cell]);
            const name = P(0.3) ?
                "Mount " + proper :
                Math.random() > 0.3 ?
                proper + " Volcano" :
                proper;
            notes.push({
                id: "marker" + id,
                name,
                legend: `Active volcano. Height: ${getFriendlyHeight(cells.p[cell])}`,
            });
        }

        function addMineHook(id) {
            const resources = {
                salt: 5,
                gold: 2,
                silver: 4,
                copper: 2,
                iron: 3,
                lead: 1,
                tin: 1,
            };

            const resource = rw(resources);
            const name = `${resource} mine`;
            const legend = ``;
            notes.push({
                id: "marker" + id,
                name,
                legend
            });
        }


        function addInnHook(id, cell, innType) {
            const type = "inns"
            const colors = [
                "Dark",
                "Light",
                "Bright",
                "Golden",
                "White",
                "Black",
                "Red",
                "Pink",
                "Purple",
                "Blue",
                "Green",
                "Yellow",
                "Amber",
                "Orange",
                "Brown",
                "Grey",
            ];
            const animals = [
                "Antelope",
                "Ape",
                "Badger",
                "Bear",
                "Beaver",
                "Bison",
                "Boar",
                "Buffalo",
                "Cat",
                "Crane",
                "Crocodile",
                "Crow",
                "Deer",
                "Dog",
                "Eagle",
                "Elk",
                "Fox",
                "Goat",
                "Goose",
                "Hare",
                "Hawk",
                "Heron",
                "Horse",
                "Hyena",
                "Ibis",
                "Jackal",
                "Jaguar",
                "Lark",
                "Leopard",
                "Lion",
                "Mantis",
                "Marten",
                "Moose",
                "Mule",
                "Narwhal",
                "Owl",
                "Panther",
                "Rat",
                "Raven",
                "Rook",
                "Scorpion",
                "Shark",
                "Sheep",
                "Snake",
                "Spider",
                "Swan",
                "Tiger",
                "Turtle",
                "Wolf",
                "Wolverine",
                "Camel",
                "Falcon",
                "Hound",
                "Ox",
            ];
            const adjectives = [
                "New",
                "Good",
                "High",
                "Old",
                "Great",
                "Big",
                "Major",
                "Happy",
                "Main",
                "Huge",
                "Far",
                "Beautiful",
                "Fair",
                "Prime",
                "Ancient",
                "Golden",
                "Proud",
                "Lucky",
                "Fat",
                "Honest",
                "Giant",
                "Distant",
                "Friendly",
                "Loud",
                "Hungry",
                "Magical",
                "Superior",
                "Peaceful",
                "Frozen",
                "Divine",
                "Favorable",
                "Brave",
                "Sunny",
                "Flying",
            ];
            const methods = [
                "Boiled",
                "Grilled",
                "Roasted",
                "Spit-roasted",
                "Stewed",
                "Stuffed",
                "Jugged",
                "Mashed",
                "Baked",
                "Braised",
                "Poached",
                "Marinated",
                "Pickled",
                "Smoked",
                "Dried",
                "Dry-aged",
                "Corned",
                "Fried",
                "Pan-fried",
                "Deep-fried",
                "Dressed",
                "Steamed",
                "Cured",
                "Syrupped",
                "Flame-Broiled",
            ];
            const courses = [
                "beef",
                "pork",
                "bacon",
                "chicken",
                "lamb",
                "chevon",
                "hare",
                "rabbit",
                "hart",
                "deer",
                "antlers",
                "bear",
                "buffalo",
                "badger",
                "beaver",
                "turkey",
                "pheasant",
                "duck",
                "goose",
                "teal",
                "quail",
                "pigeon",
                "seal",
                "carp",
                "bass",
                "pike",
                "catfish",
                "sturgeon",
                "escallop",
                "pie",
                "cake",
                "pottage",
                "pudding",
                "onions",
                "carrot",
                "potato",
                "beet",
                "garlic",
                "cabbage",
                "eggplant",
                "eggs",
                "broccoli",
                "zucchini",
                "pepper",
                "olives",
                "pumpkin",
                "spinach",
                "peas",
                "chickpea",
                "beans",
                "rice",
                "pasta",
                "bread",
                "apples",
                "peaches",
                "pears",
                "melon",
                "oranges",
                "mango",
                "tomatoes",
                "cheese",
                "corn",
                "rat tails",
                "pig ears",
            ];
            const types = [
                "hot",
                "cold",
                "fire",
                "ice",
                "smoky",
                "misty",
                "shiny",
                "sweet",
                "bitter",
                "salty",
                "sour",
                "sparkling",
                "smelly",
            ];
            const drinks = [
                "wine",
                "brandy",
                "jinn",
                "whisky",
                "rom",
                "beer",
                "cider",
                "mead",
                "liquor",
                "spirit",
                "vodka",
                "tequila",
                "absinthe",
                "nectar",
                "milk",
                "kvass",
                "kumis",
                "tea",
                "water",
                "juice",
                "sap",
            ];

            const typeName = innType ? innType : (P(0.3) ? "inn" : "tavern");
            const isAnimalThemed = P(0.7);
            const animal = ra(animals);
            const name = isAnimalThemed ?
                P(0.6) ?
                ra(colors) + " " + animal :
                ra(adjectives) + " " + animal :
                ra(adjectives) + " " + capitalize(type);
            const meal = isAnimalThemed && P(0.3) ? animal : ra(courses);
            const course = `${ra(methods)} ${meal}`.toLowerCase();
            const drink = `${P(0.5) ? ra(types) : ra(colors)} ${ra(
					drinks
				)}`.toLowerCase();
            const legend = `A big and famous roadside ${typeName}. Delicious ${course} with ${drink} is served here`;
            notes.push({
                id: "marker" + id,
                name: "The " + name,
                legend
            });
        }

        function addDungeonHook(id, cell) {

            const dungeonSeed = `${seed}${cell}`;
            const name = "Dungeon";
            const legend =
                `<div>Undiscovered dungeon. See <a href="https://watabou.github.io/one-page-dungeon/?seed=${dungeonSeed}" target="_blank">One page dungeon</a></div><iframe style="height: 33vh" src="https://watabou.github.io/one-page-dungeon/?seed=${dungeonSeed}" sandbox="allow-scripts allow-same-origin"></iframe>`;
            notes.push({
                id: "marker" + id,
                name,
                legend,
                dungeonSeed
            });
        }

        function addLakeMonsterHook(id) {
            const {
                features
            } = pack;

            const name = `Lake Monster`;
            const length = gauss(10, 5, 5, 100);
            const legend =
                `Rumors say a relic monster of ${length} ${heightUnit.value} long inhabits Lake Lake. Truth or lie, folks are afraid to fish in the lake`;
            notes.push({
                id: "marker" + id,
                name,
                legend
            });
        }

        function addSeaMonsterHook(id) {
            const name = `${Names.getCultureShort(0)} Monster`;
            const length = gauss(25, 10, 10, 100);
            const legend =
                `Old sailors tell stories of a gigantic sea monster inhabiting these dangerous waters. Rumors say it can be ${length} ${heightUnit.value} long`;
            notes.push({
                id: "marker" + id,
                name,
                legend
            });
        }

        function addLandMonsterHook(id, cell) {
            const {
                cells
            } = pack;

            const adjectives = [
                "great",
                "big",
                "huge",
                "prime",
                "golden",
                "proud",
                "lucky",
                "fat",
                "giant",
                "hungry",
                "magical",
                "superior",
                "terrifying",
                "horrifying",
                "feared",
            ];
            const subjects = [
                "Locals",
                "Elders",
                "Inscriptions",
                "Tipplers",
                "Legends",
                "Whispers",
                "Rumors",
                "Journeying folk",
                "Tales",
            ];
            const species = [
                "Ogre",
                "Troll",
                "Cyclops",
                "Giant",
                "Monster",
                "Beast",
                "Dragon",
                "Undead",
                "Ghoul",
                "Vampire",
                "Hag",
                "Banshee",
                "Bearded Devil",
                "Roc",
                "Hydra",
                "Warg",
            ];
            const modusOperandi = [
                "steals cattle at night",
                "prefers eating children",
                "doesn't mind of human flesh",
                "keeps the region at bay",
                "eats kids whole",
                "abducts young women",
                "terrorizes the region",
                "harasses travelers in the area",
                "snatches people from homes",
                "attacks anyone who dares to approach its lair",
                "attacks unsuspecting victims",
            ];

            const monster = ra(species);
            const toponym = Names.getCulture(cells.culture[cell]);
            const name = `${toponym} ${monster}`;
            const legend = `${ra(subjects)} speak of a ${ra(
						adjectives
					)} ${monster} who inhabits ${toponym} hills and ${ra(modusOperandi)}`;
            notes.push({
                id: "marker" + id,
                name,
                legend
            });
            console.log({
                id: "marker" + id,
                name,
                legend
            });
        }

        function addBrigandHook(id, cell) {

            const animals = [
                "Apes",
                "Badgers",
                "Bears",
                "Beavers",
                "Bisons",
                "Boars",
                "Cats",
                "Crows",
                "Dogs",
                "Foxes",
                "Hares",
                "Hawks",
                "Hyenas",
                "Jackals",
                "Jaguars",
                "Leopards",
                "Lions",
                "Owls",
                "Panthers",
                "Rats",
                "Ravens",
                "Rooks",
                "Scorpions",
                "Sharks",
                "Snakes",
                "Spiders",
                "Tigers",
                "Wolfs",
                "Wolverines",
                "Falcons",
            ];
            const types = {
                brigands: 4,
                bandits: 3,
                robbers: 1,
                highwaymen: 1
            };

            const culture = cells.culture[cell];
            const biome = cells.biome[cell];
            const height = cells.p[cell];
            const locality =
                height >= 70 ?
                "highlander" : [1, 2].includes(biome) ?
                "desert" : [3, 4].includes(biome) ?
                "mounted" : [5, 6, 7, 8, 9].includes(biome) ?
                "forest" :
                biome === 12 ?
                "swamp" :
                "angry";
            const name = `${Names.getCulture(culture)} ${ra(animals)}`;
            const legend = `A gang of ${locality} ${rw(types)}`;
            notes.push({
                id: "marker" + id,
                name,
                legend
            });
        }

        function addPirateHook(id) {
            const name = `Pirates`;
            const legend = `Pirate ships have been spotted in these waters`;
            notes.push({
                id: "marker" + id,
                name,
                legend
            });
        }

        function addStatueHook(id, cell) {
            const variants = [
                "Statue",
                "Obelisk",
                "Monument",
                "Column",
                "Monolith",
                "Pillar",
                "Megalith",
                "Stele",
                "Runestone",
                "Sculpture",
                "Effigy",
                "Idol",
            ];
            const scripts = {
                //                cypriot: "𐠁𐠂𐠃𐠄𐠅𐠈𐠊𐠋𐠌𐠍𐠎𐠏𐠐𐠑𐠒𐠓𐠔𐠕𐠖𐠗𐠘𐠙𐠚𐠛𐠜𐠝𐠞𐠟𐠠𐠡𐠢𐠣𐠤𐠥𐠦𐠧𐠨𐠩𐠪𐠫𐠬𐠭𐠮𐠯𐠰𐠱𐠲𐠳𐠴𐠵𐠷𐠸𐠼𐠿     ",
                geez: "ሀለሐመሠረሰቀበተኀነአከወዐዘየደገጠጰጸፀፈፐ   ",
                coptic: "ⲲⲴⲶⲸⲺⲼⲾⳀⳁⳂⳃⳄⳆⳈⳊⳌⳎⳐⳒⳔⳖⳘⳚⳜⳞⳠⳢⳤ⳥⳧⳩⳪ⳫⳬⳭⳲ⳹⳾   ",
                tibetan: "ༀ༁༂༃༄༅༆༇༈༉༊་༌༐༑༒༓༔༕༖༗༘༙༚༛༜༠༡༢༣༤༥༦༧༨༩༪༫༬༭༮༯༰༱༲༳༴༵༶༷༸༹༺༻༼༽༾༿",
                mongolian: "᠀᠐᠑᠒ᠠᠡᠦᠧᠨᠩᠪᠭᠮᠯᠰᠱᠲᠳᠵᠻᠼᠽᠾᠿᡀᡁᡆᡍᡎᡏᡐᡑᡒᡓᡔᡕᡖᡗᡙᡜᡝᡞᡟᡠᡡᡭᡮᡯᡰᡱᡲᡳᡴᢀᢁᢂᢋᢏᢐᢑᢒᢓᢛᢜᢞᢟᢠᢡᢢᢤᢥᢦ",
            };

            const culture = cells.culture[cell];

            const variant = ra(variants);
            const name = `${Names.getCulture(culture)} ${variant}`;
            const script = scripts[ra(Object.keys(scripts))];
            const inscription = Array(rand(40, 100))
                .fill(null)
                .map(() => ra(script))
                .join("");
            const legend = `An ancient ${variant.toLowerCase()}. It has an inscription, but no one can translate it:
			<div style="font-size: 1.8em; line-break: anywhere;">${inscription}</div>`;
            notes.push({
                id: "marker" + id,
                name,
                legend
            });
        }

        function addRuinHook(id) {
            const types = [
                "City",
                "Town",
                "Settlement",
                "Pyramid",
                "Fort",
                "Stronghold",
                "Temple",
                "Sacred site",
                "Mausoleum",
                "Outpost",
                "Fortification",
                "Fortress",
                "Castle",
            ];

            const ruinType = ra(types);
            const name = `Ruined ${ruinType}`;
            const legend = `Ruins of an ancient ${ruinType.toLowerCase()}. Untold riches may lie within.`;
            notes.push({
                id: "marker" + id,
                name,
                legend
            });
        }
        culturesTable();
        religionsTable();
        statesTable();
        drawIcons();

        function editEmblem(type, id, el) {
            if (!id && d3.event) defineEmblemData(d3.event);

            const emblemStates = document.getElementById("emblemStates");
            //const emblemProvinces = document.getElementById("emblemProvinces");
            //const emblemBurgs = document.getElementById("emblemBurgs");
            const emblemShapeSelector = document.getElementById("emblemShapeSelector");

            updateElementSelectors(type, id, el);

            $("#emblemEditor").dialog({
                title: "Edit Coat of Arms",
                resizable: true,
                width: "18.2em",
                height: "auto",
                position: {
                    my: "left top",
                    at: "left+10 top+10",
                    of: "svg",
                    collision: "fit"
                },
                close: closeEmblemEditor
            });

            // add listeners,then remove on closure
            emblemStates.oninput = selectState;
            //emblemProvinces.oninput = selectProvince;
            //emblemBurgs.oninput = selectBurg;
            emblemShapeSelector.oninput = changeShape;
            // document.getElementById("emblemSizeSlider").oninput = changeSize;
            // document.getElementById("emblemSizeNumber").oninput = changeSize;
            document.getElementById("emblemsRegenerate").onclick = regenerate;
            document.getElementById("emblemsArmoria").onclick = openInArmoria;
            document.getElementById("emblemsUpload").onclick = toggleUpload;
            document.getElementById("emblemsUploadImage").onclick = () => emblemImageToLoad.click();
            document.getElementById("emblemsUploadSVG").onclick = () => emblemSVGToLoad.click();
            document.getElementById("emblemImageToLoad").onchange = () => upload("image");
            document.getElementById("emblemSVGToLoad").onchange = () => upload("svg");
            document.getElementById("emblemsDownload").onclick = toggleDownload;
            document.getElementById("emblemsDownloadSVG").onclick = () => download("svg");
            document.getElementById("emblemsDownloadPNG").onclick = () => download("png");
            document.getElementById("emblemsDownloadJPG").onclick = () => download("jpeg");
            document.getElementById("emblemsGallery").onclick = downloadGallery;
            document.getElementById("emblemsFocus").onclick = showArea;

            function defineEmblemData(e) {
                const parent = e.target.parentNode;
                const [g, t] = parent.id === "burgEmblems" ? [pack.burgs, "burg"] :
                    parent.id === "provinceEmblems" ? [pack.provinces, "province"] : [pack.states, "state"];
                const i = +e.target.dataset.i;
                type = t;
                id = type + "COA" + i;
                el = g[i];
            }

            function updateElementSelectors(type, id, el) {
                let state = 0,
                    province = 0,
                    burg = 0;

                // set active type
                emblemStates.parentElement.className = type === "state" ? "active" : "";
                //emblemProvinces.parentElement.className = type === "province" ? "active" : "";
                //emblemBurgs.parentElement.className = type === "burg" ? "active" : "";

                // define selected values
                if (type === "state") state = el ? el.i : 1;
                else if (type === "province") {
                    province = el.i
                    state = pack.states[el.state].i;
                } else {
                    burg = el.i;
                    province = pack.cells.province[el.cell] ? pack.provinces[pack.cells.province[el.cell]].i : 0;
                    state = el.state;
                }

                //const validBurgs = pack.burgs.filter(burg => burg.i && !burg.removed && burg.coa);
                console.log(state, type, id, el);
                // update option list and select actual values
                emblemStates.options.length = 0;
                //const neutralBurgs = validBurgs.filter(burg => !burg.state);
                //if (neutralBurgs.length) emblemStates.options.add(new Option(pack.states[0].name, 0, false, !state));
                const stateList = pack.states.filter(state => state.i && !state.removed);
                stateList.forEach(s => emblemStates.options.add(new Option(s.name, s.i, false, s.i === state)));

                //emblemProvinces.options.length = 0;
                //emblemProvinces.options.add(new Option("", 0, false, !province));
                //const provinceList = pack.provinces.filter(province => !province.removed && province.state === state);
                //provinceList.forEach(p => emblemProvinces.options.add(new Option(p.name, p.i, false, p.i === province)));

                //emblemBurgs.options.length = 0;
                //emblemBurgs.options.add(new Option("", 0, false, !burg));
                //const burgList = validBurgs.filter(burg => province ? pack.cells.province[burg.cell] === province : burg
                //    .state === state);
                //burgList.forEach(b => emblemBurgs.options.add(new Option(b.capital ? "👑 " + b.name : b.name, b.i, false, b
                //    .i === burg)));
                //emblemBurgs.options[0].disabled = true;
                if (!id) return;
                console.log(state);
                console.log(pack.states);
                //
                COArenderer.trigger(id, el.coa).then((r) => {
                    console.log(r);
                    pack.states[state].coa_svg = r;
                });
                updateEmblemData(type, id, el);
            }

            function updateEmblemData(type, id, el) {
                if (!el.coa) return;
                document.getElementById("emblemImage").setAttribute("href", "#" + id);
                let name = el.fullName || el.name;
                if (type === "burg") name = "Burg of " + name;
                document.getElementById("emblemArmiger").innerText = name;

                if (el.coa === "custom") emblemShapeSelector.disabled = true;
                else {
                    emblemShapeSelector.disabled = false;
                    emblemShapeSelector.value = el.coa.shield;
                }

                const size = el.coaSize || 1;
                document.getElementById("emblemSizeSlider").value = size;
                document.getElementById("emblemSizeNumber").value = size;
            }

            function selectState() {
                const state = +this.value;
                if (state) {
                    type = "state";
                    el = pack.states[state];
                    id = "stateCOA" + state;
                } else {
                    // select neutral burg if state is changed to Neutrals
                    const neutralBurgs = pack.burgs.filter(burg => burg.i && !burg.removed && !burg.state);
                    if (!neutralBurgs.length) return;
                    type = "burg";
                    el = neutralBurgs[0];
                    id = "burgCOA" + neutralBurgs[0].i;
                }
                updateElementSelectors(type, id, el);
            }

            function selectProvince() {
                const province = +this.value;

                if (province) {
                    type = "province";
                    el = pack.provinces[province];
                    id = "provinceCOA" + province;
                } else {
                    // select state if province is changed to null value
                    const state = +emblemStates.value;
                    type = "state";
                    el = pack.states[state];
                    id = "stateCOA" + state;
                }

                updateElementSelectors(type, id, el);
            }

            function selectBurg() {
                const burg = +this.value;
                type = "burg";
                el = pack.burgs[burg];
                id = "burgCOA" + burg;
                updateElementSelectors(type, id, el);
            }

            function changeShape() {
                el.coa.shield = this.value;
                const coaEl = document.getElementById(id);
                if (coaEl) coaEl.remove();
                COArenderer.trigger(id, el.coa);
            }

            function showArea() {
                highlightEmblemElement(type, el);
            }

            function changeSize() {
                const size = el.coaSize = +this.value;
                document.getElementById("emblemSizeSlider").value = size;
                document.getElementById("emblemSizeNumber").value = size;

                const g = emblems.select("#" + type + "Emblems");
                g.select("[data-i='" + el.i + "']").remove();
                if (!size) return;

                // re-append use element
                const categotySize = +g.attr("font-size");
                const shift = categotySize * size / 2;
                const x = el.x || el.pole[0];
                const y = el.y || el.pole[1];
                g.append("use").attr("data-i", el.i)
                    .attr("x", rn(x - shift), 2).attr("y", rn(y - shift), 2)
                    .attr("width", size + "em").attr("height", size + "em")
                    .attr("href", "#" + id);
            }

            function regenerate() {

                let shield = el?.coa.shield || COA.getShield(el?.culture || parent?.culture || 0, el?.state);
                console.log(document.getElementById("randomShield").value);
                if (document.getElementById("randomShield").value) {
                    shield = ra(shapes);
                }
                el.coa = COA.generate(parent ? parent.coa : null, .3, .1, null);
                el.coa.shield = shield;
                emblemShapeSelector.disabled = false;
                emblemShapeSelector.value = el.coa.shield;

                const coaEl = document.getElementById(id);
                if (coaEl) coaEl.remove();
                COArenderer.trigger(id, el.coa);
                el.coa.shield = shield;
            }

            function openInArmoria() {
                const coa = el.coa && el.coa !== "custom" ? el.coa : {
                    t1: "sable"
                };
                const json = JSON.stringify(coa).replaceAll("#", "%23");
                const url = `https://azgaar.github.io/Armoria/?coa=${json}&from=FMG`;
                openURL(url);
            }

            function toggleUpload() {
                document.getElementById("emblemDownloadControl").classList.add("hidden");
                const buttons = document.getElementById("emblemUploadControl");
                buttons.classList.toggle("hidden");
            }

            function upload(type) {
                const input = type === "image" ? document.getElementById("emblemImageToLoad") : document.getElementById(
                    "emblemSVGToLoad");
                const file = input.files[0];
                input.value = "";

                if (file.size > 500000) {
                    tip(`File is too big, please optimize file size up to 500kB and re-upload. Recommended size is 200x200 px and up to 100kB`,
                        true, "error", 5000);
                    return;
                }

                const reader = new FileReader();

                reader.onload = function(readerEvent) {
                    const result = readerEvent.target.result;
                    const defs = document.getElementById("defs-emblems");
                    const coa = document.getElementById(id); // old emblem

                    if (type === "image") {
                        const svg =
                            `<svg id="${id}" xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><image x="0" y="0" width="200" height="200" href="${result}"/></svg>`;
                        defs.insertAdjacentHTML("beforeend", svg);
                    } else {
                        const el = document.createElement("html");
                        el.innerHTML = result;

                        // remove sodipodi and inkscape attributes
                        el.querySelectorAll("*").forEach(el => {
                            const attributes = el.getAttributeNames();
                            attributes.forEach(attr => {
                                if (attr.includes("inkscape") || attr.includes("sodipodi")) el
                                    .removeAttribute(attr);
                            });
                        });

                        const svg = el.querySelector("svg");
                        if (!svg) {
                            tip("The file should be prepated for load to FMG. Please use Armoria or other relevant tools",
                                false, "error");
                            return;
                        }

                        const newEmblem = defs.appendChild(svg);
                        newEmblem.id = id;
                        newEmblem.setAttribute("width", 200);
                        newEmblem.setAttribute("height", 200);
                    }

                    if (coa) coa.remove(); // remove old emblem
                    el.coa = "custom";
                    emblemShapeSelector.disabled = true;
                };

                if (type === "image") reader.readAsDataURL(file);
                else reader.readAsText(file);
            }

            function toggleDownload() {
                document.getElementById("emblemUploadControl").classList.add("hidden");
                const buttons = document.getElementById("emblemDownloadControl");
                buttons.classList.toggle("hidden");
            }

            async function download(format) {
                const coa = document.getElementById(id);
                const size = +emblemsDownloadSize.value;
                const url = await getURL(coa, size);
                const link = document.createElement("a");
                link.download = getFileName(`Emblem ${el.fullName || el.name}`) + "." + format;

                if (format === "svg") downloadSVG(url, link);
                else downloadRaster(format, url, link, size);
                document.getElementById("emblemDownloadControl").classList.add("hidden");
            }

            function downloadSVG(url, link) {
                link.href = url;
                link.click();
            }

            function downloadRaster(format, url, link, size) {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                canvas.width = size;
                canvas.height = size;

                const img = new Image();
                img.src = url;
                img.onload = function() {
                    if (format === "jpeg") {
                        ctx.fillStyle = "#fff";
                        ctx.fillRect(0, 0, canvas.width, canvas.height);
                    }
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    const dataURL = canvas.toDataURL("image/" + format, .92);
                    link.href = dataURL;
                    link.click();
                    window.setTimeout(() => window.URL.revokeObjectURL(dataURL), 6000);
                }
            }

            async function getURL(svg, size) {
                const serialized = getSVG(svg, size);
                const blob = new Blob([serialized], {
                    type: 'image/svg+xml;charset=utf-8'
                });
                const url = window.URL.createObjectURL(blob);
                window.setTimeout(() => window.URL.revokeObjectURL(url), 6000);
                return url;
            }

            function getSVG(svg, size) {
                const clone = svg.cloneNode(true);
                clone.setAttribute("width", size);
                clone.setAttribute("height", size);
                return (new XMLSerializer()).serializeToString(clone);
            }

            async function downloadGallery() {
                const name = getFileName("Emblems Gallery");
                const validStates = pack.states.filter(s => s.i && !s.removed && s.coa);
                const validProvinces = pack.provinces.filter(p => p.i && !p.removed && p.coa);
                const validBurgs = pack.burgs.filter(b => b.i && !b.removed && b.coa);
                await renderAllEmblems(validStates, validProvinces, validBurgs);
                runDownload();

                function runDownload() {
                    const back = `<a href="javascript:history.back()">Go Back</a>`;

                    const stateSection = `<div><h2>States</h2>` + validStates.map(state => {
                        const el = document.getElementById("stateCOA" + state.i);
                        return `<figure id="state_${state.i}"><a href="#provinces_${state.i}"><figcaption>${state.fullName}</figcaption>${getSVG(el, 200)}</a></figure>`;
                    }).join("") + `</div>`;

                    const provinceSections = validStates.map(state => {
                        const stateProvinces = validProvinces.filter(p => p.state === state.i);
                        const figures = stateProvinces.map(province => {
                            const el = document.getElementById("provinceCOA" + province.i);
                            return `<figure id="province_${province.i}"><a href="#burgs_${province.i}"><figcaption>${province.fullName}</figcaption>${getSVG(el, 200)}</a></figure>`;
                        }).join("");
                        return stateProvinces.length ?
                            `<div id="provinces_${state.i}">${back}<h2>${state.fullName} provinces</h2>${figures}</div>` :
                            "";
                    }).join("");

                    const burgSections = validStates.map(state => {
                        const stateBurgs = validBurgs.filter(b => b.state === state.i);
                        let stateBurgSections = validProvinces.filter(p => p.state === state.i).map(
                            province => {
                                const provinceBurgs = stateBurgs.filter(b => pack.cells.province[b.cell] ===
                                    province.i);
                                const provinceBurgFigures = provinceBurgs.map(burg => {
                                    const el = document.getElementById("burgCOA" + burg.i);
                                    return `<figure id="burg_${burg.i}"><figcaption>${burg.name}</figcaption>${getSVG(el, 200)}</figure>`;
                                }).join("");
                                return provinceBurgs.length ?
                                    `<div id="burgs_${province.i}">${back}<h2>${province.fullName} burgs</h2>${provinceBurgFigures}</div>` :
                                    "";
                            }).join("");

                        const stateBurgOutOfProvinces = stateBurgs.filter(b => !pack.cells.province[b.cell]);
                        const stateBurgOutOfProvincesFigures = stateBurgOutOfProvinces.map(burg => {
                            const el = document.getElementById("burgCOA" + burg.i);
                            return `<figure id="burg_${burg.i}"><figcaption>${burg.name}</figcaption>${getSVG(el, 200)}</figure>`;
                        }).join("");
                        if (stateBurgOutOfProvincesFigures) stateBurgSections +=
                            `<div><h2>${state.fullName} burgs under direct control</h2>${stateBurgOutOfProvincesFigures}</div>`;
                        return stateBurgSections;
                    }).join("");

                    const neutralBurgs = validBurgs.filter(b => !b.state);
                    const neutralsSection = neutralBurgs.length ? "<div><h2>Independent burgs</h2>" + neutralBurgs.map(
                        burg => {
                            const el = document.getElementById("burgCOA" + burg.i);
                            return `<figure id="burg_${burg.i}"><figcaption>${burg.name}</figcaption>${getSVG(el, 200)}</figure>`;
                        }).join("") + "</div>" : "";

                    const FMG =
                        `<a href="https://azgaar.github.io/Fantasy-Map-Generator" target="_blank">Azgaar's Fantasy Map Generator</a>`;
                    const license =
                        `<a target="_blank" href="https://github.com/Azgaar/Armoria#license">the license</a>`;
                    const html = `<!DOCTYPE html><html><head><title>${mapName.value} Emblems Gallery</title></head>
                        <style type="text/css">
                        body { margin: 0; padding: 1em; font-family: serif; }
                        h1, h2 { font-family: 'Forum'; }
                        div { width: 100%; max-width: 1018px; margin: 0 auto; border-bottom: 1px solid #ddd; }
                        figure { margin: 0 0 2em; display: inline-block; transition: .2s; }
                        figure:hover { background-color: #f6f6f6; }
                        figcaption { text-align: center; margin: .4em 0; width: 200px; font-family: 'Overlock SC' }
                        address { width: 100%; max-width: 1018px; margin: 0 auto; }
                        a { color: black; }
                        figure > a { text-decoration: none; }
                        div > a { float: right; font-family: monospace; margin-top: .8em; }
                        </style>
                        <link href="https://fonts.googleapis.com/css2?family=Forum&family=Overlock+SC" rel="stylesheet">
                        <body>
                        <div><h1>${mapName.value} Emblems Gallery</h1></div>
                        ${stateSection}
                        ${provinceSections}
                        ${burgSections}
                        ${neutralsSection}
                        <address>Generated by ${FMG}. The tool is free, but images may be copyrighted, see ${license}</address>
                        </body></html>`;
                    downloadFile(html, name + ".html", "text/plain");
                }
            }

            async function renderAllEmblems(states, provinces, burgs) {
                tip("Preparing for download...", true, "warn");

                const statePromises = states.map(state => COArenderer.trigger("stateCOA" + state.i, state.coa));
                const provincePromises = provinces.map(province => COArenderer.trigger("provinceCOA" + province.i,
                    province.coa));
                const burgPromises = burgs.map(burg => COArenderer.trigger("burgCOA" + burg.i, burg.coa));
                const promises = [...statePromises, ...provincePromises, ...burgPromises];

                return Promise.allSettled(promises).then(res => clearMainTip());
            }

            function dragEmblem() {
                const tr = parseTransform(this.getAttribute("transform"));
                const x = +tr[0] - d3.event.x,
                    y = +tr[1] - d3.event.y;

                d3.event.on("drag", function() {
                    const transform = `translate(${(x + d3.event.x)},${(y + d3.event.y)})`;
                    this.setAttribute("transform", transform);
                });
            }

            function closeEmblemEditor() {
                emblems.selectAll("use").call(d3.drag().on("drag", null)).attr("class", null);
            }

            function toggleEmblemSS(event) {
                if (event.target.value) {
                    document.getElementById("emblemShapeSelector").disabled = true;
                } else {
                    document.getElementById("emblemShapeSelector").disabled = false;
                }
            }
        }

        async function saveToServer() {
            console.time("saveToServer");
            const pngurl = await getMapURL("png");
            console.timeEnd("saveToServer1");

            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = 260;
            canvas.height = 260;
            let states = pack.states;
            let religions = pack.religions;

            let data = {
                map: getMapData(),
                url: null,
                states: JSON.stringify(states),
                religions: JSON.stringify(religions),
            };

            const img = new Image();

            img.src = pngurl;

            img.onload = function() {
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                data.url = canvas.toDataURL("image/png");

                window.setTimeout(function() {
                    canvas.remove();
                }, 5000);

                $.ajax({
                    type: "POST",
                    url: "/api/region/" + regionId + "/upload-map",
                    data: data,
                    success: () => {
                        console.timeEnd("saveToServer");
                        console.log("success");
                    },
                });
            };
            // link.click();

            // tip(`${link.download} is saved. Open "Downloads" screen (crtl + J) to check. You can set image scale in options`, true, "success", 5000);
        }
    </script>
    <!-- <script src="libs/translate.js"></script> -->
    <script src="/fmg/libs/jquery-3.1.1.min.js"></script>
    <script src="/fmg/libs/d3.min.js"></script>
    <script src="/fmg/libs/priority-queue.min.js"></script>
    <script src="/fmg/libs/delaunator.min.js"></script>
    <script src="/mgc/modules/utils.js"></script>
    <script src="/fmg/modules/voronoi.js"></script>
    <script src="/fmg/modules/heightmap-templates.js"></script>
    <script src="/fmg/modules/heightmap-generator.js"></script>
    <script src="/fmg/modules/ocean-layers.js"></script>
    <script src="/fmg/modules/river-generator.js"></script>
    <script src="/fmg/modules/lakes.js"></script>
    <script src="/fmg/modules/names-generator.js"></script>
    <script src="/mgc/modules/cultures-generator.js"></script>
    <script src="/mgc/modules/burgs-and-states.js"></script>
    <script src="/fmg/modules/routes-generator.js"></script>
    <script src="/mgc/modules/religions-generator.js"></script>
    <script src="/fmg/modules/military-generator.js"></script>
    <script src="/mgc/modules/markers-generator.js"></script>
    <script src="/fmg/modules/coa-generator.js"></script>
    <script src="/fmg/libs/polylabel.min.js"></script>
    <script src="/fmg/libs/lineclip.min.js"></script>
    <script src="/fmg/libs/jquery-ui.min.js"></script>
    <script src="/fmg/libs/alea.min.js"></script>
    <script src="/fmg/modules/fonts.js"></script>
    <script src="/mgc/modules/ui/layers.js"></script>
    <script src="/mgc/modules/ui/measurers.js"></script>
    <script src="/mgc/modules/save.js"></script>
    <script src="/mgc/modules/load.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.min.js"
        integrity="sha384-+YQ4JLhjyBLPDQt//I+STsc9iw4uQqACwlvpslubQzn4u2UU2UFM80nGisd026JF" crossorigin="anonymous">
    </script>

    <script defer src="https://unpkg.com/dropbox@10.8.0/dist/Dropbox-sdk.min.js"></script>
    <script defer src="/mgc/modules/ui/general.js"></script>
    <script defer src="/mgc/modules/ui/options.js"></script>
    <script defer src="/mgc/modules/ui/style.js"></script>
    <script defer src="/fmg/modules/cloud.js"></script>
    <script defer src="/mgc/main.js"></script>
    <script src="/mgc/modules/relief-icons.js"></script>
    <script defer src="/fmg/modules/ui/tools.js"></script>
    <script defer src="/mgc/modules/ui/world-configurator.js"></script>
    <script defer src="/fmg/modules/ui/heightmap-editor.js"></script>
    <script defer src="/fmg/modules/ui/states-editor.js"></script>
    <script defer src="/fmg/modules/ui/provinces-editor.js"></script>
    <script defer src="/fmg/modules/ui/biomes-editor.js"></script>
    <script defer src="/fmg/modules/ui/cultures-editor.js"></script>
    <script defer src="/fmg/modules/ui/namesbase-editor.js"></script>
    <script defer src="/fmg/modules/ui/elevation-profile.js"></script>
    <script defer src="/fmg/modules/ui/routes-editor.js"></script>
    <script defer src="/fmg/modules/ui/ice-editor.js"></script>
    <script defer src="/fmg/modules/ui/lakes-editor.js"></script>
    <script defer src="/fmg/modules/ui/coastline-editor.js"></script>
    <script defer src="/fmg/modules/ui/labels-editor.js"></script>
    <script defer src="/fmg/modules/ui/rivers-editor.js"></script>
    <script defer src="/fmg/modules/ui/rivers-creator.js"></script>
    <script defer src="/fmg/modules/ui/relief-editor.js"></script>
    <script defer src="/fmg/modules/ui/religions-editor.js"></script>
    <script defer src="/fmg/modules/ui/markers-editor.js"></script>
    <script defer src="/fmg/modules/ui/burg-editor.js"></script>
    <script defer src="/fmg/modules/ui/units-editor.js"></script>
    <script defer src="/fmg/modules/ui/notes-editor.js"></script>
    <script defer src="/fmg/modules/ui/diplomacy-editor.js"></script>
    <script defer src="/fmg/modules/ui/zones-editor.js"></script>
    <script defer src="/fmg/modules/ui/burgs-overview.js"></script>
    <script defer src="/fmg/modules/ui/rivers-overview.js"></script>
    <script defer src="/fmg/modules/ui/military-overview.js"></script>
    <script defer src="/fmg/modules/ui/regiments-overview.js"></script>
    <script defer src="/fmg/modules/ui/regiment-editor.js"></script>
    <script defer src="/fmg/modules/ui/battle-screen.js"></script>
    <script defer src="/fmg/modules/coa-renderer.js"></script>
    {{-- <script defer src="/fmg/modules/ui/emblems-editor.js"></script> --}}
    <script defer src="/mgc/modules/ui/editors.js"></script>
    <script defer src="/fmg/modules/ui/3d.js"></script>
    <script defer src="/fmg/modules/ui/hotkeys.js"></script>
    <script defer src="/fmg/libs/rgbquant.min.js"></script>
    <script defer src="/fmg/libs/jquery.ui.touch-punch.min.js"></script>
    <script defer src="/fmg/libs/pell.min.js"></script>
    <script defer src="/fmg/libs/jszip.min.js"></script>
</body>

</html>
