import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
  ViewEncapsulation,
  Output,
  Input,
  EventEmitter,
} from "@angular/core";
import { Voronoi } from './modules/voronoi';
import { Rulers, Measurer, Ruler, Opisometer, RouteOpisometer, Planimeter } from './modules/ui/measurers';

import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { faCogs } from "@fortawesome/free-solid-svg-icons";
import { faHourglassHalf } from "@fortawesome/free-solid-svg-icons";
declare var $: any;
declare var d3: any;
declare const PriorityQueue: any;
declare const polylabel: any;
declare const polygonclip: any;
declare const Delaunator: any;
declare const aleaPRNG: any;

declare namespace Intl {
  class ListFormat {
    public format: (items: [string?]) => string;
  }
}

@Component({
  selector: "app-story-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class StoryMapComponent implements OnInit, AfterViewInit {
  @Output() clickedEmitter: EventEmitter<any> = new EventEmitter();
  @Input() 
  set selectedBurg(burg) {
    this._selectedBurg = burg;
    this.pack.burgs[burg.id] = burg;
  };
  get selectedBurg(){return this._selectedBurg;}
  private _selectedBurg;
  public style: object = {};
  @ViewChild("map") map: any;
  @ViewChild("populationRateInput") populationRateInput: HTMLInputElement;
  @ViewChild("urbanizationInput") urbanizationInput: HTMLInputElement;
  @ViewChild("coas") coas: ElementRef;
  @ViewChild("defsEmblems") defsEmblems: ElementRef;
  @ViewChild("viewbox") viewboxElement: ElementRef;
  public mapBox = true;
  public npcBox = false;
  public timeBox = false;
  public mapImg;
  public startingMapHeight;
  public startingMapWidth;
  public faBookOpen = faBookOpen;
  faUserFriends = faUserFriends;
  faCogs = faCogs;
  faHourglassHalf = faHourglassHalf;
  public mapScale = 1;
  public mapArray = [0.3, 0.6, 1, 2, 3, 5, 7.5, 10, 15, 20];
  currentX = 0;
  currentY = 0;
  public svg;
  public defs;
  public scaleBar;
  public legend;
  public ocean;
  public oceanLayers;
  public oceanPattern;
  public lakes;
  public landmass;
  public texture;
  public terrs;
  public biomes;
  public cells;
  public gridOverlay;
  public coordinates;
  public compass;
  public rivers;
  public terrain;
  public relig;
  public cults;
  public regions;
  public statesBody;
  public statesHalo;
  public provs;
  public zones;
  public borders;
  public stateBorders;
  public provinceBorders;
  public routes;
  public roads;
  public trails;
  public searoutes;
  public temperature;
  public coastline;
  public ice;
  public prec;
  public population;
  public emblems;
  public labels;
  public icons;
  public burgIcons;
  public anchors;
  public armies;
  public markers;
  public fogging;
  public ruler;
  public debug;
  public burgLabels;
  public grid;
  public pack;
  public seed;
  public rulers;
  public customization;
  public biomesData;
  public nameBases;
  public color;
  public scale;
  public viewX;
  public viewY;
  public options;
  public mapCoordinates;
  public populationRate;
  public urbanization;
  public graphWidth;
  public svgWidth;
  public mapId;
  public mapHistory = [];
  public elSelected;
  public modules: any = {};
  public notes = [];
  public graphHeight;
  public svgHeight;
  public mapWidthInput;
  public mapHeightInput;
  public fonts;
  public presets;
  public preset = "GMP";
  public mapName;
  public zoom;
  public zoomThrottled;
  public powerInput;
  public lineGen = d3.line().curve(d3.curveBasis); // d3 line generator with default curve interpolation
  public moved;
  public viewbox;
  public activeLegend;


  distanceScaleInput;
  heightExponentInput;
  barSizeInput;
  mapSizeInput;
  latitudeInput;
  temperatureEquatorInput;
  temperaturePoleInput;
  precInput;
  yearInput;
  eraInput;
  regionsInput;
  manorsInput;
  neutralInput;
  provincesInput;
  distanceUnitInput;
  styleTextureInput;
  culturesInput;
  hideEmblems;
  rescaleLabels;
  hideLabels;
  shapeRendering;
  zoomExtentMin;
  zoomExtentMax;
  barLabel;
  barBackColor;
  barBackOpacity;
  barPosX;
  barPosY;
  temperatureEquatorOutput;
  styleTextureShiftX;
  styleTextureShiftY;
  heightUnit;
  pickerS;
  pickerL;
  pickerH;
  pickerHSL_H;
  pickerHSL_S;
  pickerHSL_L;
  pickerRGB_R;
  pickerRGB_G;
  pickerRGB_B;
  pickerHEX;
  styleLegendColItems;
  styleLegendBack;
  styleLegendOpacity;
  dataset;
  ldb;
  distanceScaleOutput: any;
  areaUnit: any;
  heightExponentOutput: any;
  temperatureScale: any;
  barSizeOutput: any;
  populationRateOutput: any;
  urbanizationOutput: any;
  mapSizeOutput: any;
  latitudeOutput: any;
  temperaturePoleOutput: any;
  precOutput: any;
  stylePreset: any;


    constructor() {
// indexedDB; ldb object
!( () => {
  function e(t, o) {
    return n
      ? void (n.transaction("s").objectStore("s").get(t).onsuccess = function (e) {
          var t = (e.target.result && e.target.result.v) || null;
          o(t);
        })
      : void setTimeout(function () {
          e(t, o);
        }, 100);
  }
  var t = window.indexedDB;
  if (!t) return void console.error("indexedDB not supported");
  var n,
    o = {k: "", v: ""},
    r = t.open("d2", 1);
  (r.onsuccess = function (e) {
    n = this.result;
  }),
    (r.onerror = function (e) {
      console.error("indexedDB request error"), console.log(e);
    }),
    (r.onupgradeneeded = function (e) {
      n = null;
      var t = (<any>e.target).result.createObjectStore("s", {keyPath: "k"});
      t.transaction.oncomplete = function (e) {
        n = e.target.db;
      };
    }),
    (this.ldb = {
      get: e,
      set: function (e, t) {
        (o.k = e), (o.v = t), n.transaction("s", "readwrite").objectStore("s").put(o);
      }
    });
})();
    // append svg layers (in default order)
this.svg = d3.select("#map");
this.defs = this.svg.select("#deftemp");
this.viewbox = this.svg.select("#viewbox");
this.scaleBar = this.svg.select("#scaleBar");
this.legend = this.svg.append("g").attr("id", "legend");
this.ocean = this.viewbox.append("g").attr("id", "ocean");
this.oceanLayers = this.ocean.append("g").attr("id", "oceanLayers");
this.oceanPattern = this.ocean.append("g").attr("id", "oceanPattern");
this.lakes = this.viewbox.append("g").attr("id", "lakes");
this.landmass = this.viewbox.append("g").attr("id", "landmass");
this.texture = this.viewbox.append("g").attr("id", "texture");
this.terrs = this.viewbox.append("g").attr("id", "terrs");
this.biomes = this.viewbox.append("g").attr("id", "biomes");
this.cells = this.viewbox.append("g").attr("id", "cells");
this.gridOverlay = this.viewbox.append("g").attr("id", "gridOverlay");
this.coordinates = this.viewbox.append("g").attr("id", "coordinates");
this.compass = this.viewbox.append("g").attr("id", "compass");
this.rivers = this.viewbox.append("g").attr("id", "rivers");
this.terrain = this.viewbox.append("g").attr("id", "terrain");
this.relig = this.viewbox.append("g").attr("id", "relig");
this.cults = this.viewbox.append("g").attr("id", "cults");
this.regions = this.viewbox.append("g").attr("id", "regions");
this.statesBody = this.regions.append("g").attr("id", "statesBody");
this.statesHalo = this.regions.append("g").attr("id", "statesHalo");
this.provs = this.viewbox.append("g").attr("id", "provs");
this.zones = this.viewbox.append("g").attr("id", "zones").style("display", "none");
this.borders = this.viewbox.append("g").attr("id", "borders");
this.stateBorders = this.borders.append("g").attr("id", "stateBorders").attr("fill", "none");
this.provinceBorders = this.borders.append("g").attr("id", "provinceBorders").attr("fill", "none");
this.routes = this.viewbox.append("g").attr("id", "routes");
this.roads = this.routes.append("g").attr("id", "roads");
this.roads.attr("fill", "none");
this.trails = this.routes.append("g").attr("id", "trails");
this.trails.attr("fill", "none");
this.searoutes = this.routes.append("g").attr("id", "searoutes");
this.searoutes.attr("fill", "none");
this.temperature = this.viewbox.append("g").attr("id", "temperature");
this.coastline = this.viewbox.append("g").attr("id", "coastline");
this.ice = this.viewbox.append("g").attr("id", "ice").style("display", "none");
this.prec = this.viewbox.append("g").attr("id", "prec").style("display", "none");
this.population = this.viewbox.append("g").attr("id", "population");
this.emblems = this.viewbox.append("g").attr("id", "emblems").style("display", "none");
this.labels = this.viewbox.append("g").attr("id", "labels");
this.icons = this.viewbox.append("g").attr("id", "icons");
this.burgIcons = this.icons.append("g").attr("id", "burgIcons");
this.anchors = this.icons.append("g").attr("id", "anchors");
this.armies = this.viewbox.append("g").attr("id", "armies").style("display", "none");
this.markers = this.viewbox.append("g").attr("id", "markers").style("display", "none");
this.fogging = this.viewbox.append("g").attr("id", "fogging-cont").attr("mask", "url(#fog)").append("g").attr("id", "fogging").style("display", "none");
this.ruler = this.viewbox.append("g").attr("id", "ruler").style("display", "none");
this.debug = this.viewbox.append("g").attr("id", "debug");
this.presets = {}; // global object
this.restoreCustomPresets(); // run on-load

// lake and coast groups
this.lakes.append("g").attr("id", "freshwater");
this.lakes.append("g").attr("id", "salt");
this.lakes.append("g").attr("id", "sinkhole");
this.lakes.append("g").attr("id", "frozen");
this.lakes.append("g").attr("id", "lava");
this.lakes.append("g").attr("id", "dry");
this.coastline.append("g").attr("id", "sea_island");
this.coastline.append("g").attr("id", "lake_island");
this.moved = this.debounce(this.mouseMove, 100);
this.labels.append("g").attr("id", "states");
this.labels.append("g").attr("id", "addedLabels");

this.burgLabels = this.labels.append("g").attr("id", "burgLabels");
this.burgIcons.append("g").attr("id", "cities");
this.burgLabels.append("g").attr("id", "cities");
this.anchors.append("g").attr("id", "cities");

this.burgIcons.append("g").attr("id", "towns");
this.burgLabels.append("g").attr("id", "towns");
this.anchors.append("g").attr("id", "towns");

// population groups
this.population.append("g").attr("id", "rural");
this.population.append("g").attr("id", "urban");

// emblem groups
this.emblems.append("g").attr("id", "burgEmblems");
this.emblems.append("g").attr("id", "provinceEmblems");
this.emblems.append("g").attr("id", "stateEmblems");

// fogging
this.fogging.append("rect").attr("x", 0).attr("y", 0).attr("width", "100%").attr("height", "100%");
this.fogging.append("rect").attr("x", 0).attr("y", 0).attr("width", "100%").attr("height", "100%").attr("fill", "#e8f0f6").attr("filter", "url(#splotch)");

// assign events separately as not a viewbox child
// this.scaleBar.on("mousemove", () => tip("Click to open Units Editor")).on("click", () => editUnits());
// this.legend.on("mousemove", () => tip("Drag to change the position. Click to hide the legend")).on("click", () => clearLegend());

// main data variables
this.grid = {}; // initial grapg based on jittered square grid and data
this.pack = {}; // packed graph and data
this.rulers = new Rulers();
this.customization = 0; // 0 - no; 1 = heightmap draw; 2 - states draw; 3 - add state/burg; 4 - cultures draw

this.biomesData = this.applyDefaultBiomesSystem();
this.nameBases = this.Names.getNameBases(); // cultures-related data

this.color = d3.scaleSequential(d3.interpolateSpectral); // default color scheme

// d3 zoom behavior
this.scale = 1;
this.viewX = 0;
this.viewY = 0;

this.zoomThrottled = this.throttle(this.doWorkOnZoom, 100);
this.zoom = d3.zoom().scaleExtent([0.5, 20]).on("zoom", this.zoomed);

// default options
this.options = {pinNotes: false}; // options object
this.mapCoordinates = {}; // map coordinates on globe
this.options.winds = [225, 45, 225, 315, 135, 315]; // default wind directions

}

// Re-mark features (ocean, lakes, islands)
reMarkFeatures() {
  console.time("reMarkFeatures");
  const grid = this.grid;
  const cells = this.pack.cells,
    features: any[] = (this.pack.features = [0]);
  cells.f = new Uint16Array(cells.i.length); // cell feature number
  cells.t = new Int8Array(cells.i.length); // cell type: 1 = land along coast; -1 = water along coast;
  cells.haven = cells.i.length < 65535 ? new Uint16Array(cells.i.length) : new Uint32Array(cells.i.length); // cell haven (opposite water cell);
  cells.harbor = new Uint8Array(cells.i.length); // cell harbor (number of adjacent water cells);

  const defineHaven = i => {
    const water = cells.c[i].filter(c => cells.h[c] < 20);
    const dist2 = water.map(c => (cells.p[i][0] - cells.p[c][0]) ** 2 + (cells.p[i][1] - cells.p[c][1]) ** 2);
    const closest = water[dist2.indexOf(Math.min.apply(Math, dist2))];

    cells.haven[i] = closest;
    cells.harbor[i] = water.length;
  };

  for (let i = 1, queue = [0]; queue[0] !== -1; i++) {
    const start = queue[0]; // first cell
    cells.f[start] = i; // assign feature number
    const land = cells.h[start] >= 20;
    let border = false; // true if feature touches map border
    let cellNumber = 1; // to count cells number in a feature

    while (queue.length) {
      const q = queue.pop();
      if (cells.b[q]) border = true;
      cells.c[q].forEach(function (e) {
        const eLand = cells.h[e] >= 20;
        if (land && !eLand) {
          cells.t[q] = 1;
          cells.t[e] = -1;
          if (!cells.haven[q]) defineHaven(q);
        } else if (land && eLand) {
          if (!cells.t[e] && cells.t[q] === 1) cells.t[e] = 2;
          else if (!cells.t[q] && cells.t[e] === 1) cells.t[q] = 2;
        }
        if (!cells.f[e] && land === eLand) {
          queue.push(e);
          cells.f[e] = i;
          cellNumber++;
        }
      });
    }

    const type = land ? "island" : border ? "ocean" : "lake";
    let group;
    if (type === "ocean") group = defineOceanGroup(cellNumber);
    else if (type === "island") group = defineIslandGroup(start, cellNumber);
    features.push({i, land, border, type, cells: cellNumber, firstCell: start, group});
    queue[0] = cells.f.findIndex(f => !f); // find unmarked cell
  }

  // markupPackLand
  this.markup(this.pack.cells, 3, 1, 0);

  function defineOceanGroup(number) {
    if (number > grid.cells.i.length / 25) return "ocean";
    if (number > grid.cells.i.length / 100) return "sea";
    return "gulf";
  }

  function defineIslandGroup(cell, number) {
    if (cell && features[cells.f[cell - 1]].type === "lake") return "lake_island";
    if (number > grid.cells.i.length / 10) return "continent";
    if (number > grid.cells.i.length / 1000) return "island";
    return "isle";
  }

  console.timeEnd("reMarkFeatures");
}

markup(cells, start, increment, limit) {
  for (let t = start, count = Infinity; count > 0 && t > limit; t += increment) {
    count = 0;
    const prevT = t - increment;
    for (let i = 0; i < cells.i.length; i++) {
      if (cells.t[i] !== prevT) continue;

      for (const c of cells.c[i]) {
        if (cells.t[c]) continue;
        cells.t[c] = t;
        count++;
      }
    }
  }
}

// recalculate Voronoi Graph to pack cells
reGraph() {
  console.time("reGraph");
  let {cells, points, features} = this.grid;
  const newCells = {p: [], g: [], h: []}; // to store new data
  const spacing2 = this.grid.spacing ** 2;
  let rn = this.rn;

  for (const i of cells.i) {
    const height = cells.h[i];
    const type = cells.t[i];
    if (height < 20 && type !== -1 && type !== -2) continue; // exclude all deep ocean points
    if (type === -2 && (i % 4 === 0 || features[cells.f[i]].type === "lake")) continue; // exclude non-coastal lake points
    const [x, y] = points[i];

    addNewPoint(i, x, y, height);

    // add additional points for cells along coast
    if (type === 1 || type === -1) {
      if (cells.b[i]) continue; // not for near-border cells
      cells.c[i].forEach(function (e) {
        if (i > e) return;
        if (cells.t[e] === type) {
          const dist2 = (y - points[e][1]) ** 2 + (x - points[e][0]) ** 2;
          if (dist2 < spacing2) return; // too close to each other
          const x1 = rn((x + points[e][0]) / 2, 1);
          const y1 = rn((y + points[e][1]) / 2, 1);
          addNewPoint(i, x1, y1, height);
        }
      });
    }
  }

  function addNewPoint(i, x, y, height) {
    newCells.p.push([x, y]);
    newCells.g.push(i);
    newCells.h.push(height);
  }

  this.calculateVoronoi(this.pack, newCells.p);
  cells = this.pack.cells;
  cells.p = newCells.p; // points coordinates [x, y]
  cells.g = this.grid.cells.i.length < 65535 ? Uint16Array.from(newCells.g) : Uint32Array.from(newCells.g); // reference to initial grid cell
  cells.q = d3.quadtree(cells.p.map((p, d) => [p[0], p[1], d])); // points quadtree for fast search
  cells.h = new Uint8Array(newCells.h); // heights
  cells.area = new Uint16Array(cells.i.length); // cell area
  cells.i.forEach(i => (cells.area[i] = Math.abs(d3.polygonArea(this.getPackPolygon(i)))));

  console.timeEnd("reGraph");
}

// calculate Delaunay and then Voronoi diagram
 calculateVoronoi(graph, points) {
  console.time("calculateDelaunay");
  const n = points.length;
  const allPoints = points.concat(this.grid.boundary);
  const delaunay = Delaunator.from(allPoints);
  console.timeEnd("calculateDelaunay");

  console.time("calculateVoronoi");
  const voronoi = new Voronoi(delaunay, allPoints, n);
  graph.cells = voronoi.cells;
  graph.cells.i = n < 65535 ? Uint16Array.from(d3.range(n)) : Uint32Array.from(d3.range(n)); // array of indexes
  graph.vertices = voronoi.vertices;
  console.timeEnd("calculateVoronoi");
}

  zoomed = () => {
    const {k, x, y} = d3.event.transform;
  console.log("zoomed");
    const isScaleChanged = Boolean(this.scale - k);
    const isPositionChanged = Boolean(this.viewX - x || this.viewY - y);
  
    this.scale = k;
    this.viewX = x;
    this.viewY = y;
  
    this.zoomThrottled(isScaleChanged, isPositionChanged);
  }

  ngOnInit(): void {
    this.mapImg = {};
    this.mapImg.id = 3;
    void (function addFindAll() {
      const Quad = function (node, x0, y0, x1, y1) {
        this.node = node;
        this.x0 = x0;
        this.y0 = y0;
        this.x1 = x1;
        this.y1 = y1;
      };
    
      const tree_filter = function (x, y, radius) {
        var t = {x, y, x0: this._x0, y0: this._y0, x3: this._x1, y3: this._y1, quads: [], node: this._root, q: null, x1: null, y1: null, x2: null, y2: null, i: null, result: null};
        if (t.node) {
          t.quads.push(new Quad(t.node, t.x0, t.y0, t.x3, t.y3));
        }
        radiusSearchInit(t, radius);
    
        var i = 0;
        while ((t.q = t.quads.pop())) {
          i++;
    
          // Stop searching if this quadrant can’t contain a closer node.
          if (!(t.node = t.q.node) || (t.x1 = t.q.x0) > t.x3 || (t.y1 = t.q.y0) > t.y3 || (t.x2 = t.q.x1) < t.x0 || (t.y2 = t.q.y1) < t.y0) continue;
    
          // Bisect the current quadrant.
          if (t.node.length) {
            t.node.explored = true;
            var xm = (t.x1 + t.x2) / 2,
              ym = (t.y1 + t.y2) / 2;
    
            t.quads.push(new Quad(t.node[3], xm, ym, t.x2, t.y2), new Quad(t.node[2], t.x1, ym, xm, t.y2), new Quad(t.node[1], xm, t.y1, t.x2, ym), new Quad(t.node[0], t.x1, t.y1, xm, ym));
    
            // Visit the closest quadrant first.
            if ((t.i = (<any>(y >= ym) << 1) | <any>(x >= xm))) {
              t.q = t.quads[t.quads.length - 1];
              t.quads[t.quads.length - 1] = t.quads[t.quads.length - 1 - t.i];
              t.quads[t.quads.length - 1 - t.i] = t.q;
            }
          }
    
          // Visit this point. (Visiting coincident points isn’t necessary!)
          else {
            var dx = x - +this._x.call(null, t.node.data),
              dy = y - +this._y.call(null, t.node.data),
              d2 = dx * dx + dy * dy;
            radiusSearchVisit(t, d2);
          }
        }
        return t.result;
      };
      d3.quadtree.prototype.findAll = tree_filter;
    
      var radiusSearchInit = function (t, radius) {
        t.result = [];
        (t.x0 = t.x - radius), (t.y0 = t.y - radius);
        (t.x3 = t.x + radius), (t.y3 = t.y + radius);
        t.radius = radius * radius;
      };
    
      var radiusSearchVisit = function (t, d2) {
        t.node.data.scanned = true;
        if (d2 < t.radius) {
          do {
            t.result.push(t.node.data);
            t.node.data.selected = true;
          } while ((t.node = t.node.next));
        }
      };
    })();
  }

  getBoundaryPoints = (width, height, spacing) => {
    console.log("getBoundaryPoints");
    const offset = this.rn(-1 * spacing);
    const bSpacing = spacing * 2;
    const w = width - offset * 2;
    const h = height - offset * 2;
    const numberX = Math.ceil(w / bSpacing) - 1;
    const numberY = Math.ceil(h / bSpacing) - 1;
    let points = [];
    for (let i = 0.5; i < numberX; i++) {
      let x = Math.ceil((w * i) / numberX + offset);
      points.push([x, offset], [x, h + offset]);
    }
    for (let i = 0.5; i < numberY; i++) {
      let y = Math.ceil((h * i) / numberY + offset);
      points.push([offset, y], [w + offset, y]);
    }
    return points;
  }
  
  // get points on a regular square grid and jitter them a bit
  getJitteredGrid = (width, height, spacing) => {
    const radius = spacing / 2; // square radius
    const jittering = radius * 0.9; // max deviation
    const jitter = () => Math.random() * 2 * jittering - jittering;
  
    let points = [];
    for (let y = radius; y < height; y += spacing) {
      for (let x = radius; x < width; x += spacing) {
        const xj = Math.min(this.rn(x + jitter(), 2), width);
        const yj = Math.min(this.rn(y + jitter(), 2), height);
        points.push([xj, yj]);
      }
    }
    return points;
  }
  
  // return cell index on a regular square grid
  findGridCell = (x, y) => {
    return Math.floor(Math.min(y / this.grid.spacing, this.grid.cellsY - 1)) * this.grid.cellsX + Math.floor(Math.min(x / this.grid.spacing, this.grid.cellsX - 1));
  }
  
  // return array of cell indexes in radius on a regular square grid
  findGridAll = (x, y, radius) => {
    const c = this.grid.cells.c;
    let r = Math.floor(radius / this.grid.spacing);
    let found = [this.findGridCell(x, y)];
    if (!r || radius === 1) return found;
    if (r > 0) found = found.concat(c[found[0]]);
    if (r > 1) {
      let frontier = c[found[0]];
      while (r > 1) {
        let cycle = frontier.slice();
        frontier = [];
        cycle.forEach(function (s) {
          c[s].forEach(function (e) {
            if (found.indexOf(e) !== -1) return;
            found.push(e);
            frontier.push(e);
          });
        });
        r--;
      }
    }
  
    return found;
  }
  
  // return closest pack points quadtree datum
  find = (x, y, radius = Infinity) => {
    return this.pack.cells.q.find(x, y, radius);
  }
  
  // return closest cell index
  findCell = (x, y, radius = Infinity) => {
    console.log(this.pack);
    const found = this.pack.cells.q.find(x, y, radius);
    return found ? found[2] : undefined;
  }
  
  // return array of cell indexes in radius
  findAll = (x, y, radius) => {
    const found = this.pack.cells.q.findAll(x, y, radius);
    return found.map(r => r[2]);
  }
  
  // get polygon points for packed cells knowing cell id
  getPackPolygon = (i) => {
    return this.pack.cells.v[i].map(v => this.pack.vertices.p[v]);
  }
  
  // get polygon points for initial cells knowing cell id
  getGridPolygon = (i) => {
    return this.grid.cells.v[i].map(v => this.grid.vertices.p[v]);
  }
  
  // mbostock's poissonDiscSampler
  poissonDiscSampler = function* (x0, y0, x1, y1, r, k = 3) {
    if (!(x1 >= x0) || !(y1 >= y0) || !(r > 0)) throw new Error();
  
    const width = x1 - x0;
    const height = y1 - y0;
    const r2 = r * r;
    const r2_3 = 3 * r2;
    const cellSize = r * Math.SQRT1_2;
    const gridWidth = Math.ceil(width / cellSize);
    const gridHeight = Math.ceil(height / cellSize);
    const grid = new Array(gridWidth * gridHeight);
    const queue = [];
  
    function far(x, y) {
      const i = (x / cellSize) | 0;
      const j = (y / cellSize) | 0;
      const i0 = Math.max(i - 2, 0);
      const j0 = Math.max(j - 2, 0);
      const i1 = Math.min(i + 3, gridWidth);
      const j1 = Math.min(j + 3, gridHeight);
      for (let j = j0; j < j1; ++j) {
        const o = j * gridWidth;
        for (let i = i0; i < i1; ++i) {
          const s = grid[o + i];
          if (s) {
            const dx = s[0] - x;
            const dy = s[1] - y;
            if (dx * dx + dy * dy < r2) return false;
          }
        }
      }
      return true;
    }
  
    function sample(x, y) {
      queue.push((grid[gridWidth * ((y / cellSize) | 0) + ((x / cellSize) | 0)] = [x, y]));
      return [x + x0, y + y0];
    }
  
    yield sample(width / 2, height / 2);
  
    pick: while (queue.length) {
      const i = (Math.random() * queue.length) | 0;
      const parent = queue[i];
  
      for (let j = 0; j < k; ++j) {
        const a = 2 * Math.PI * Math.random();
        const r = Math.sqrt(Math.random() * r2_3 + r2);
        const x = parent[0] + r * Math.cos(a);
        const y = parent[1] + r * Math.sin(a);
        if (0 <= x && x < width && 0 <= y && y < height && far(x, y)) {
          yield sample(x, y);
          continue pick;
        }
      }
  
      const r = queue.pop();
      if (i < queue.length) queue[i] = r;
    }
  }
  
  // filter land cells
  isLand = (i) => {
    return this.pack.cells.h[i] >= 20;
  }
  
  // filter water cells
  isWater = (i) => {
    return this.pack.cells.h[i] < 20;
  }
  
  // convert RGB color string to HEX without #
  toHEX = (rgb) => {
    if (rgb.charAt(0) === "#") {
      return rgb;
    }
    rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
    return rgb && rgb.length === 4 ? "#" + ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) + ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) + ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : "";
  }
  
  // return array of standard shuffled colors
  getColors = (number) => {
    const c12 = ["#dababf", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5", "#c6b9c1", "#bc80bd", "#ccebc5", "#ffed6f", "#8dd3c7", "#eb8de7"];
    const cRB = d3.scaleSequential(d3.interpolateRainbow);
    const colors = d3.shuffle(d3.range(number).map(i => (i < 12 ? c12[i] : d3.color(cRB((i - 12) / (number - 12))).hex())));
    return colors;
  }
  
  getRandomColor = () => {
    return d3.color(d3.scaleSequential(d3.interpolateRainbow)(Math.random())).hex();
  }
  
  // mix a color with a random color
  getMixedColor = (color, mix = 0.2, bright = 0.3) => {
    const c = color && color[0] === "#" ? color : this.getRandomColor(); // if provided color is not hex (e.g. harching), generate random one
    return d3.color(d3.interpolate(c, this.getRandomColor())(mix)).brighter(bright).hex();
  }
  
// Detect and draw the coasline
drawCoastline() {
  console.time("drawCoastline");
  this.reMarkFeatures();

  const cells = this.pack.cells,
    vertices = this.pack.vertices,
    n = cells.i.length,
    features = this.pack.features;
  const used = new Uint8Array(features.length); // store conneted features
  const largestLand = d3.scan(
    features.map(f => (f.land ? f.cells : 0)),
    (a, b) => b - a
  );
  const landMask = this.defs.select("#land");
  const waterMask = this.defs.select("#water");
  this.lineGen.curve(d3.curveBasisClosed);

  for (const i of cells.i) {
    const startFromEdge = !i && cells.h[i] >= 20;
    if (!startFromEdge && cells.t[i] !== -1 && cells.t[i] !== 1) continue; // non-edge cell
    const f = cells.f[i];
    if (used[f]) continue; // already connected
    if (features[f].type === "ocean") continue; // ocean cell

    const type = features[f].type === "lake" ? 1 : -1; // type value to search for
    const start = findStart(i, type);
    if (start === -1) continue; // cannot start here
    let vchain = connectVertices(start, type);
    if (features[f].type === "lake") relax(vchain, 1.2);
    used[f] = 1;
    let points = this.clipPoly(
      vchain.map(v => vertices.p[v]),
      1
    );
    const area = d3.polygonArea(points); // area with lakes/islands
    if (area > 0 && features[f].type === "lake") {
      points = points.reverse();
      vchain = vchain.reverse();
    }

    features[f].area = Math.abs(area);
    features[f].vertices = vchain;

    const path = Math.round(this.lineGen(points));
    if (features[f].type === "lake") {
      landMask
        .append("path")
        .attr("d", path)
        .attr("fill", "black")
        .attr("id", "land_" + f);
      // waterMask.append("path").attr("d", path).attr("fill", "white").attr("id", "water_"+id); // uncomment to show over lakes
      this.lakes
        .select("#freshwater")
        .append("path")
        .attr("d", path)
        .attr("id", "lake_" + f)
        .attr("data-f", f); // draw the lake
    } else {
      landMask
        .append("path")
        .attr("d", path)
        .attr("fill", "white")
        .attr("id", "land_" + f);
      waterMask
        .append("path")
        .attr("d", path)
        .attr("fill", "black")
        .attr("id", "water_" + f);
      const g = features[f].group === "lake_island" ? "lake_island" : "sea_island";
      this.coastline
        .select("#" + g)
        .append("path")
        .attr("d", path)
        .attr("id", "island_" + f)
        .attr("data-f", f); // draw the coastline
    }

    // draw ruler to cover the biggest land piece
    if (f === largestLand) {
      const from = points[d3.scan(points, (a, b) => a[0] - b[0])];
      const to = points[d3.scan(points, (a, b) => b[0] - a[0])];
      this.rulers.create(Ruler, [from, to]);
    }
  }

  // find cell vertex to start path detection
  function findStart(i, t) {
    if (t === -1 && cells.b[i]) return cells.v[i].find(v => vertices.c[v].some(c => c >= n)); // map border cell
    const filtered = cells.c[i].filter(c => cells.t[c] === t);
    const index = cells.c[i].indexOf(d3.min(filtered));
    return index === -1 ? index : cells.v[i][index];
  }

  // connect vertices to chain
  function connectVertices(start, t) {
    const chain = []; // vertices chain to form a path
    for (let i = 0, current = start; i === 0 || (current !== start && i < 50000); i++) {
      const prev = chain[chain.length - 1]; // previous vertex in chain
      chain.push(current); // add current vertex to sequence
      const c = vertices.c[current]; // cells adjacent to vertex
      const v = vertices.v[current]; // neighboring vertices
      const c0 = c[0] >= n || cells.t[c[0]] === t;
      const c1 = c[1] >= n || cells.t[c[1]] === t;
      const c2 = c[2] >= n || cells.t[c[2]] === t;
      if (v[0] !== prev && c0 !== c1) current = v[0];
      else if (v[1] !== prev && c1 !== c2) current = v[1];
      else if (v[2] !== prev && c0 !== c2) current = v[2];
      if (current === chain[chain.length - 1]) {
        console.error("Next vertex is not found");
        break;
      }
    }
    return chain;
  }

  // move vertices that are too close to already added ones
  function relax(vchain, r) {
    const p = vertices.p,
      tree = d3.quadtree();

    for (let i = 0; i < vchain.length; i++) {
      const v = vchain[i];
      let [x, y] = [p[v][0], p[v][1]];
      if (i && vchain[i + 1] && tree.find(x, y, r) !== undefined) {
        const v1 = vchain[i - 1],
          v2 = vchain[i + 1];
        const [x1, y1] = [p[v1][0], p[v1][1]];
        const [x2, y2] = [p[v2][0], p[v2][1]];
        [x, y] = [(x1 + x2) / 2, (y1 + y2) / 2];
        p[v] = [x, y];
      }
      tree.add([x, y]);
    }
  }

  console.timeEnd("drawCoastline");
}


  // conver temperature from °C to other scales
  convertTemperature = (c) => {
        return this.rn((c * 9) / 5 + 32) + "°F";
    // switch (temperatureScale) {
    //   case "°C":
    //     return c + "°C";
    //   case "°F":
    //     return this.rn((c * 9) / 5 + 32) + "°F";
    //   case "K":
    //     return this.rn(c + 273.15) + "K";
    //   case "°R":
    //     return this.rn(((c + 273.15) * 9) / 5) + "°R";
    //   case "°De":
    //     return this.rn(((100 - c) * 3) / 2) + "°De";
    //   case "°N":
    //     return this.rn((c * 33) / 100) + "°N";
    //   case "°Ré":
    //     return this.rn((c * 4) / 5) + "°Ré";
    //   case "°Rø":
    //     return this.rn((c * 21) / 40 + 7.5) + "°Rø";
    //   default:
    //     return c + "°C";
    // }
  }
  
  // random number in a range
  rand = (min = 1, max) => {
    if (min === undefined && max === undefined) return Math.random();
    if (max === undefined) {
      max = min;
      min = 0;
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  // probability shorthand
  P = (probability) => {
    if (probability >= 1) return true;
    if (probability <= 0) return false;
    return Math.random() < probability;
  }
  
  each = (n) => {
    return i => i % n === 0;
  }
  
  // random number (normal or gaussian distribution)
  gauss = (expected = 100, deviation = 30, min = 0, max = 300, round = 0) => {
    return this.rn(Math.max(Math.min(d3.randomNormal(expected, deviation)(), max), min), round);
  }
  
  // probability shorthand for floats
  Pint = (float) => {
    return ~~float + +this.P(float % 1);
  }
  
  // round value to d decimals
  rn = (v, d = 0) => {
    const m = Math.pow(10, d);
    return Math.round(v * m) / m;
  }
  

  // round string to d decimals
  round = (s, d = 1) => {
    let rn = this.rn;
    return s.replace(/[\d\.-][\d\.e-]*/g, function (n) {
      return rn(n, d);
    });
  }
  
  // corvent number to short string with SI postfix
  si = (n) => {
    if (n >= 1e9) return this.rn(n / 1e9, 1) + "B";
    if (n >= 1e8) return this.rn(n / 1e6) + "M";
    if (n >= 1e6) return this.rn(n / 1e6, 1) + "M";
    if (n >= 1e4) return this.rn(n / 1e3) + "K";
    if (n >= 1e3) return this.rn(n / 1e3, 1) + "K";
    return this.rn(n);
  }
  
  // getInteger number from user input data
  getInteger = (value) => {
    const metric = value.slice(-1);
    if (metric === "K") return parseInt((value.slice(0, -1) * 1e3).toString());
    if (metric === "M") return parseInt((value.slice(0, -1) * 1e6).toString());
    if (metric === "B") return parseInt((value.slice(0, -1) * 1e9).toString());
    return parseInt(value);
  }
  
  // remove parent element (usually if child is clicked)
  removeParent = (el) => {
    el.parentNode.parentNode.removeChild(el.parentNode);
  }
  
  // return string with 1st char capitalized
  capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  // transform string to array [translateX,translateY,rotateDeg,rotateX,rotateY,scale]
  parseTransform = (string) => {
    if (!string) {
      return [0, 0, 0, 0, 0, 1];
    }
    const a = string
      .replace(/[a-z()]/g, "")
      .replace(/[ ]/g, ",")
      .split(",");
    return [a[0] || 0, a[1] || 0, a[2] || 0, a[3] || 0, a[4] || 0, a[5] || 1];
  }
  
  // findAll d3.quandtree search from https://bl.ocks.org/lwthatcher/b41479725e0ff2277c7ac90df2de2b5e

  
  // get segment of any point on polyline
  getSegmentId = (points, point, step = 10) => {
    if (points.length === 2) return 1;
    const d2 = (p1, p2) => (p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2;
  
    let minSegment = 1;
    let minDist = Infinity;
  
    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];
  
      const length = Math.sqrt(d2(p1, p2));
      const segments = Math.ceil(length / step);
      const dx = (p2[0] - p1[0]) / segments;
      const dy = (p2[1] - p1[1]) / segments;
  
      for (let s = 0; s < segments; s++) {
        const x = p1[0] + s * dx;
        const y = p1[1] + s * dy;
        const dist2 = d2(point, [x, y]);
  
        if (dist2 >= minDist) continue;
        minDist = dist2;
        minSegment = i + 1;
      }
    }
  
    return minSegment;
  }
  
  // normalization function
  normalize = (val, min, max) => {
    return Math.min(Math.max((val - min) / (max - min), 0), 1);
  }
  
  // return a random integer from min to max biased towards one end based on exponent distribution (the bigger ex the higher bias towards min)
  // from https://gamedev.stackexchange.com/a/116875
  biased = (min, max, ex) => {
    return Math.round(min + (max - min) * Math.pow(Math.random(), ex));
  }
  
  // return array of values common for both array a and array b
  common = (a, b) => {
    const setB = new Set(b);
    return [...new Set(a)].filter(a => setB.has(a));
  }
  
  // clip polygon by graph bbox
  clipPoly = (points, secure = 0) => {
    return polygonclip(points, [0, 0, this.graphWidth, this.graphHeight], secure);
  }
  
  // check if char is vowel or can serve as vowel
  vowel = (c) => {
    return `aeiouyɑ'əøɛœæɶɒɨɪɔɐʊɤɯаоиеёэыуюяàèìòùỳẁȁȅȉȍȕáéíóúýẃőűâêîôûŷŵäëïöüÿẅãẽĩõũỹąęįǫųāēīōūȳăĕĭŏŭǎěǐǒǔȧėȯẏẇạẹịọụỵẉḛḭṵṳ`.includes(c);
  }
  
  // remove vowels from the end of the string
  trimVowels = (string) => {
    while (string.length > 3 && this.vowel(this.last(string))) {
      string = string.slice(0, -1);
    }
    return string;
  }
  
  // get adjective form from noun
  getAdjective = (string) => {
    // special cases for some suffixes
    if (string.length > 8 && string.slice(-6) === "orszag") return string.slice(0, -6);
    if (string.length > 6 && string.slice(-4) === "stan") return string.slice(0, -4);
    if (this.P(0.5) && string.slice(-4) === "land") return string + "ic";
    if (string.slice(-4) === " Guo") string = string.slice(0, -4);
  
    // don't change is name ends on suffix
    if (string.slice(-2) === "an") return string;
    if (string.slice(-3) === "ese") return string;
    if (string.slice(-1) === "i") return string;
  
    const end = string.slice(-1); // last letter of string
    if (end === "a") return (string += "n");
    if (end === "o") return (string = this.trimVowels(string) + "an");
    if (this.vowel(end) || end === "c") return (string += "an"); // ceiuy
    if (end === "m" || end === "n") return (string += "ese");
    if (end === "q") return (string += "i");
    return this.trimVowels(string) + "ian";
  }
  
  // get ordinal out of integer: 1 => 1st
  nth = (n) => n + (["st", "nd", "rd"][((((n + 90) % 100) - 10) % 10) - 1] || "th");
  
  // get two-letters code (abbreviation) from string
  abbreviate = (name, restricted = []) => {
    const parsed = name.replace("Old ", "O ").replace(/[()]/g, ""); // remove Old prefix and parentheses
    const words = parsed.split(" ");
    const letters = words.join("");
  
    let code = words.length === 2 ? words[0][0] + words[1][0] : letters.slice(0, 2);
    for (let i = 1; i < letters.length - 1 && restricted.includes(code); i++) {
      code = letters[0] + letters[i].toUpperCase();
    }
    return code;
  }
  
  // conjunct array: [A,B,C] => "A, B and C"
  list = (array) => {
    if (!Intl.ListFormat) return array.join(", ");
    const conjunction = new Intl.ListFormat();//window.lang || "en", {style: "long", type: "conjunction"});
    return conjunction.format(array);
  }
  
  // split string into 2 almost equal parts not breaking words
  splitInTwo = (str) => {
    const half = str.length / 2;
    const ar = str.split(" ");
    if (ar.length < 2) return ar; // only one word
    let first = "",
      last = "",
      middle = "",
      rest = "";
  
    ar.forEach((w, d) => {
      if (d + 1 !== ar.length) w += " ";
      rest += w;
      if (!first || rest.length < half) first += w;
      else if (!middle) middle = w;
      else last += w;
    });
  
    if (!last) return [first, middle];
    if (first.length < last.length) return [first + middle, last];
    return [first, middle + last];
  }
  
  // return the last element of array
  last = (array) => {
    return array[array.length - 1];
  }
  
  // return random value from the array
  ra = (array) => {
    return array[Math.floor(Math.random() * array.length)];
  }
  
  // return random value from weighted array {"key1":weight1, "key2":weight2}
  rw = (object) => {
    const array = [];
    for (const key in object) {
      for (let i = 0; i < object[key]; i++) {
        array.push(key);
      }
    }
    return array[Math.floor(Math.random() * array.length)];
  }
  
  // return value in range [0, 100] (height range)
  lim = (v) => {
    return Math.max(Math.min(v, 100), 0);
  }
  
  // get number from string in format "1-3" or "2" or "0.5"
  getNumberInRange = (r) => {
    if (typeof r !== "string") {
      console.error("The value should be a string", r);
      return 0;
    }
    if (!isNaN(+r)) return ~~r + +this.P(parseInt(r,10) - ~~r);
    const sign = r[0] === "-" ? -1 : 1;
    if (isNaN(+r[0])) r = r.slice(1);
    const range = r.includes("-") ? r.split("-") : null;
    if (!range) {
      console.error("Cannot parse the number. Check the format", r);
      return 0;
    }
    const count = this.rand(range[0] * sign, +range[1]);
    if (isNaN(count) || count < 0) {
      console.error("Cannot parse number. Check the format", r);
      return 0;
    }
    return count;
  }
  
  // return center point of common edge of 2 pack cells
  getMiddlePoint = (cell1, cell2) => {
    const {cells, vertices} = this.pack;
  
    const commonVertices = cells.v[cell1].filter(vertex => vertices.c[vertex].some(cell => cell === cell2));
    const [x1, y1] = vertices.p[commonVertices[0]];
    const [x2, y2] = vertices.p[commonVertices[1]];
  
    const x = (x1 + x2) / 2;
    const y = (y1 + y2) / 2;
  
    return [x, y];
  }
  
  // helper function non-used for the generation
  // function drawCellsValue(data) {
    // debug.selectAll("text").remove();
    // debug
    //   .selectAll("text")
    //   .data(data)
    //   .enter()
    //   .append("text")
    //   .attr("x", (d, i) => pack.cells.p[i][0])
    //   .attr("y", (d, i) => pack.cells.p[i][1])
    //   .text(d => d);
  // }
  
  // helper function non-used for the generation
  drawPolygons = (data) => {
    const max = d3.max(data),
      min = d3.min(data),
      scheme = this.getColorScheme();
    data = data.map(d => 1 - this.normalize(d, min, max));
  
    // debug.selectAll("polygon").remove();
    // debug
    //   .selectAll("polygon")
    //   .data(data)
    //   .enter()
    //   .append("polygon")
    //   .attr("points", (d, i) => getPackPolygon(i))
    //   .attr("fill", d => scheme(d))
    //   .attr("stroke", d => scheme(d));
  }
  
  // polyfill for composedPath
  getComposedPath = (node) => {
    let parent;
    if (node.parentNode) parent = node.parentNode;
    else if (node.host) parent = node.host;
    else if (node.defaultView) parent = node.defaultView;
    if (parent !== undefined) return [node].concat(this.getComposedPath(parent));
    return [node];
  }
  
  // polyfill for replaceAll
  // if (!String.prototype.replaceAll) {
  //   String.prototype.replaceAll = function (str, newStr) {
  //     if (Object.prototype.toString.call(str).toLowerCase() === "[object regexp]") return this.replace(str, newStr);
  //     return this.replace(new RegExp(str, "g"), newStr);
  //   };
  // }
  
  // get next unused id
  getNextId = (core, i = 1) => {
    while (document.getElementById(core + i)) i++;
    return core + i;
  }
  
  debounce = (func, ms) => {
    let isCooldown = false;
  
    return function () {
      if (isCooldown) return;
      func.apply(this, arguments);
      isCooldown = true;
      setTimeout(() => (isCooldown = false), ms);
    };
  }
  
  throttle = (func, ms) => {
    let isThrottled = false;
    let savedArgs;
    let savedThis;
  
    function wrapper() {
      if (isThrottled) {
        savedArgs = arguments;
        savedThis = this;
        return;
      }
  
      console.log(arguments);
      func.apply(this, arguments);
      isThrottled = true;
  
      setTimeout(function () {
        isThrottled = false;
        if (savedArgs) {
          wrapper.apply(savedThis, savedArgs);
          savedArgs = savedThis = null;
        }
      }, ms);
    }
  
    return wrapper;
  }
  
  // parse error to get the readable string in Chrome and Firefox
  parseError = (error) => {
    const isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
    const errorString = isFirefox ? error.toString() + " " + error.stack : error.stack;
    const regex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
    const errorNoURL = errorString.replace(regex, url => "<i>" + this.last(url.split("/")) + "</i>");
    const errorParsed = errorNoURL.replace(/at /gi, "<br>&nbsp;&nbsp;at ");
    return errorParsed;
  }
  

  
  // // check if string is a valid for JSON parse
  // JSON.isValid = str => {
  //   try {
  //     JSON.parse(str);
  //   } catch (e) {
  //     return false;
  //   }
  //   return true;
  // };
  
  getBase64 = function (url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      const reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.send();
  }
  
  getDefaultTexture = () => {
    return "data:image/jpeg;base64,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gkkkoosmbdWhIFoIESRaLaFus5yAJJaEzFSTWtFICyS1ItFIUJFCQRAUEAhZJbYgqxKsEkSqtFooFtEkkgTOcxakULbVa1RJC2ySSAASQatkkJJbbVurRQUzIpCSW0hRbSAW0okhEKQqSFoM5zJne+kKBSJISLaAAtqJIq226FottkmcYULdSZRbVotskkzbqrEBC21JAAhaQ1rcmZIpBJASLbaQoBAERKsKKRAUiABCkSS6skqgKkBIFBAW20W0FJJJIJMohaQttttEkkmtaARmZAFoIEBRaLRRJAABakC2yQW0W0ZzkCkCAItuM4LrWqRLbItSRIiVbq0gLRSILaVIt1bJMyBIpES3SS60LbJAAABSBCgCl1oSZEgSQiLqlIhRSCQQpC0UiAIUEklUAQIWkQFpJAIlVaQttW0KCSQmcwiFIW222kkkk1rYEkkltkgAtpJJbQC2pBBbqSW2SAAEka1SgW3OcgUEAKDGcyTp02iSKBQkFtFtki2iipBEtqIC2yS2kEkkEtqFt1bKqSAAUgAABS6sVnIEBJm3RAUgKAEkQtqSFAkloCZlpaUEAEkSFWggkUAiVVtttpVJJIkzMoWktpbaJIC2gBJBJFUBRJLRQBSIi2rRJKQtSEiraEKt1nORQBRZIkVImc73tUggLakgq22BABbSyZFFpZICAokyLaJJbS61qkJIALRURAABQsS2iSAAAJIEKLUgUCpBLbIIgi0oIAJJVAEJISrJBbYWipFtttoEkkzMwXVkUWi2ySkLbnOda0WTJJFtBBItoAICpFFtIiVQqSICii0WTIFWABAJGc53vdoBCki1JFtAAFotkgIW2yQSZkltmcyBvpsqZka1pbbRJAAS2lkgBCgatVJJBAgLQCFIUASSipCRVVbJCAtISS0hWc5tskt0CTMVbZMlotQIltt0W0JJM5kyttskq3VkAACSa1osmZILaAQoAIAESRVurQQFIgALRRJlCpJbohQCDOc71sKEkqxLbItCRbSAFtokyhbaQIiMzMkFt1rQAqqAAKQW6EkJIAoturSRJCIgLRRSIUAiFSAKKKBJktqQCBChnObaUJJItBALdELM5F1q2haiTIIiJbS23Oc0KoACSAAWgUAEKARGZnWt20JIUUiIUWiyQhSICpJbolUZmdWxbSFIhaQqSW0AAtoskSXVSxABJKRLdCSUiW6tBEQtIC261UQIJAAtokgAASLRJLRZM20oIJFoApJAAIUEQApECCRQBSABmSmtaW20SQSSSC22pEglItIltAAkgtAABC0BIFotoKSSCgUAUmcy2kLJKLRSBJJboUCkSRVtAKkUCgluhnObbbZMlJViW2QS3Wc5JbS0ki20JBEXVBQKQSQtotskBCkCFoAAJIoAURLaSQQFIAiIi2gKRAkkqxKpJCkKRbVW6AAGcYzJrWtWwkhLbItokgAUzAtFpAC0JIUWiSWraUEkUhRbJKLc5zbaKQIUEQTObrdBAgklttskqrQQpALdW3OcC2yAKRAACzOLauqRAAEKQIltFtLJLRRaEgkikALRQCSAQVVCSAoIAAAERAWkKRERLbJLC2EmdXQiauloIUDOcIutEkkgltt0hUzBEtoAtszlaKQpAJLaoskpbVoEkBC2ikKkEKKQqRTMlqSW6ApC0iJbc5zbbahQBRRbJEi2kApBJmRNWxSVVBAzM6ulFIVJmZ1aW6pQAAJIBbQSRbSIWiSAhbSJIFoIiFqSFtFIhSIlUCAkhEKtoQpES3VtAAEzmFqRazmELbQEi0C2iSWs4ytttICSUiauloBEXVkWggQJboCSUAUgCIC0iVVqRQkEtoAAAAFtLJCItsBQZmUi2ZzrW1FtskIgi2qFSRItqrZJaKALUgEkAW0ELSEkpCkQotskIEBQAREKRBFoKQSSrAKQShQIluraQokhCzOVsmSjWtZzm0UJFoAEkCqoJIEktW6toJJBbSigEKKKJIKKQIUEKSRbbapMzNUKKEiikKQAoCZWloFsmRIpEt0Lbq3Mmc51rUmUkLaUkk1dBRQkWgAAgKkWgSS0iAAFFSCAICgJIW1IJJAW2ggkgLRSIlUREKt0LaBJKZkItkmroDOcW23UkCSFtBLbJJJVUiAmcjWtBVtzmEt1bQKQooFCQKEktqApEJJaLrWpJM5tot1AgklookgooVczNVVWABESS6okmrq2ySSXVLnGFC2hC22gSRVAVIIWkKKAJIAAAAQFBAAiIhaKkEKklURmQLaKokytqiTMLbbRVWgpM5xbZAEkJItutakkkAtoklq2zMiW6IiIUC2kEktttW1UkALQQtklAFFBJFBJFIutmUKFuyCTKFASBaAt1JJJaKQFBBJEgt0qSW0ttkiSCRVUBaKQFopJFopCgBItSRELQAEltiIUEQkhNXUCBJCqtBJIhVUCBEKqySJVtqi2ilEmQkiSCFILdW2SSZKAAKALUkBakhVItttFFIhaQIC2yQUChIFqQAQttSAKt0JJJLQAkltABRbZIkCgUBJJAttAFCSJViW0ZznWtABAW21IFCQQttUghZIACFACRRQSZiqohSSEEgKqxC0VJKt1TRBnOZIQVVqkmrpdEAmcwkyUADVq3OcFAtFkgtVVuc5tSCItq0ACipFtApC0WSEqiCRaQoFAIWkSS6pSDOc61pAiAtIWhboSQki2ghQRES2gZznWt22SJMzOrV0TOc6ulpAAW2gSQUgFVQCSLQkEEi0USZqrSSLUikKRJIkijVqpILbJJJbrWtULEznFWJIoCFutW0FIJM5zlCiiSWtXeZkAWgELbbJCCRJm2lSW26skKCFotAtoUgSQiAtBCgWihJESLq0JCZutAIgABaLVjIkWighQSZltznNq226WyZmYS3QkkS226kgttFpCgEkltAkC0WSCkQAAIzJatoQBAgEkFWFqrmS0JIzFW6WyZQLaJJC1IzjGt71rVtAEkkkkAEktutaznMk1bAC0UAiFSM5yKkXWrq6iFAFtAotBK1EkyiJVWyQltqwtotoEkSELEFVSBCkKQtoAkgtABCgiEzm23WgJMzMCrdUC2SEqqKALaAQFkgFqQAkiW0AqSFrOc6ugqQCSCFIhbRSFSSQSqtkgtBIUBQRmS26tW20CSADOciSW22iIiSUW0WhItSDMkzm1bqGtUsktAttAAApbYSQEKEghbRaKBbZIkzJRaSqIhSFIUWigBJmZ1dQtBCpmXWpJaKRCpmW2SKt0LbnOJnN1qSaulFBC20CSSQWigAEKkWkQFSRJdaRCSUUBJEBaKCSBQQoFSSRbq1bJCFpEkDWqUCSWpEktqSAJbpIFskWpNWwAkhELaC2wIUW1IIW0AC2pBAJFtAJItopCgAiIhVUQIUhaKQtFoZzCW0BCkQpJBmZta1uQmYaulFtskkhKsQVYgklW6tupIEigVIoFAtskSKFWJnGbqlAJJBboJIgBaQSDOc61oKLJKKqwSC1JIIkl1q2irJmAFtAznNtFtAkgJrWpBCkhVklFVYJIUW0iSNWrSFtSKQkltSQtoSRKqpJbbagRELSAtBCkAktoUCiSJlbbQhUkCFpOfPnbenTpIkzq6VItTOVtVatmc2hMy2yZkRN62BEklttpSAoAC1IAJnIWpAIlUQpJCLQWkJJJkTOdb2EW0CSW0CJnOdXS20iFVUmSkLVUjMzJNautbkkkCRbq3MyUEqiBCigF1oiJMrSi2i2yQSS1M5kmtbUiIEEut1CyS25mdXUCTObrRaKkAUgKBbTMiRVtREKElthJm21VTMWgUJC2ozJM5302UkkzjFthbQkWokl1bdWi22SAACrAiTGcauhEAqgSRbSBKoiZzJMySxvp0gCBF1USZkCJbattkgW23OcgW2qoTOYWqsLQkDWtTOYiFFBKqpIW0Kq2SJBdVCqqpABESS2iJbc5g1atICkmZrWoBJEt1SAIUUACrdSRJEtsi0JIiIEl1u2iZyqrELQCJMyTN1qki6qJM3WrakkgzmW26qQt1q2yZKCAoAkmc5mc9OnTMgJViBCkQtIki2SZzirre6RLbJAkiplDVmcyN9N1SxCFEmZJ/8QAIBAAAgICAgIDAAAAAAAAAAAAARFwgACQQKAQYDBQsP/aAAgBUgABBQKOj0j1ogdYX2hjWkVicVmGHfQ9f1VSEdHQG9Az0CO/Y2tmoJ4phtWrHsx38iKT4H5X5wfXv2wxSZmM1O4JwRUcEViKxcEdrRxWqGOLBKr4L+ZwYcHAXJ//xAAgEAACAgEFAQEBAAAAAAAAAAABEXCAQAAgUGCQMKAQ/9oACAFHAAEFAnjOJDzD9KnS1cAfqIhPxPkIeGf4fzKJgsxWfqI9EPisT3iJDDDh4xWYrPGCBh74mrS3Gow3COjhO+L8Bnp+AT06rKs78mTC7io4phtVmXRR2Y+Q4rkIpP8ABFSrqPK404NpVbYTs+0nQ499vfxEOmZjlLS7WeGHPO4Qx3CZ0KrCnigUVePWT+P19fO89FVDHFgjd5zwXDR0MBZP/8QAHxAAAgEDBQEAAAAAAAAAAAAAARFwAGCAECAwQFCQ/9oACAFCAAEFAnHR3r0X9KnhavAPEtREJ4TIYgZ4dnxnZBwLMTHR/IQxWaG5xUYrPKIfXeEPGhjE94iQ0IXcGjomKzFZikcDoffE4tLFIauIT1j0nTgI+QcRn8BnTh44yOnJJxFcXv5MmF3oui4XPVMNrGZWKLmMGnPoRoY+EUnQRUpFMYDujMkSQfFMDmDDlIqUTKKTwG3xZLgg+Adjp3SaHmPV3e+Ee6LgMdnyz2lS3K0l0z4w955gmh13CZoW8LNEViSlZg8ZQKMXjbAo4Pv6puC3b53mhYiwMcVmhfx9l6DuPouGjQ6C5jQ4v//EABQQAQAAAAAAAAAAAAAAAAAAAOD/2gAIAVIABj8CHvv/xAAUEAEAAAAAAAAAAAAAAAAAAADg/9oACAFHAAY/Ah77/8QAFBABAAAAAAAAAAAAAAAAAAAA4P/aAAgBQgAGPwIe+//EACAQAAICAwADAQEBAAAAAAAAAAERABAgMEAxUGBBIXD/2gAIAVIAAT8hdLIZ+MAIo/7HDYwMGx06G5YChDmIfRvtORgwOC1HQ9QxHBRYDiJrzFtGIwcccfOfQLpOBPE4MjBga/Y/71roVLnfoX612DQxGa/uHg0DDGo95KnnkcHONJ+IeCpYPF5mzYnmeDv8wdY+NG0x5GDSIqORjj0eaMcB+HFriOgQ7zoGkDEWchmYLMeTpqOD+wzxB3mD0pg6zQh4ANBjjxGbpURrOfihDP2KgJ4E8z9yeQ4n8MuYmlSoNDtchghFftKlBFPEPiDFRfYOjB3nB2/7RgEeIhhg0vd+4LlGa+BPAadrSTgKWL0nUtwh9OD6kwdRg0DNx0osTBH5DZp0YPMUUXOPkjF6UYHA2YKMAo4nzAa/aJghEagPIBRPGOrx70mDX4x80IdDxWg4afIfXGDqO17lmtnnkFKAU9DjwXoV75YqjHzOCzHoeZs2aFkx/wAzfaYOH89m9ihg4iYYLcNuhFFmLFGhDTwNK1X7Rg+lJjxe0nNYOjBqOYwMMFkrAwfWLedn9wU8cAoQxw24IdH7kdC6zyvpcfoDs/cTqWnzEqWh4L1J5VyuO1F6AwbXRg86xiLNnBmPUvjXSi9KRBk4NP7gcwdKhjwUVve/TDuXcYOA0KWkUeE+IoMD0r614j0KxmdRwEUMBjxBoax6s/BjExRRYCzX9yP8MGswHSoRSjjj1GnH8+uExz9jjo4HQdZ0MBDTyWowUaXr3HuG8wQiDtMFr+wRRQ0cRvVLEiBwz8gEWYi1LQfTP0o2jlcNA0RP21Rg4xpwmAxwUYLHsjg44ovRjuOX7DYhioYLf+QIKNqCLE2MF690ovSjf+6HmYKBwNj+Yfu09A0veYPTPtW4+YNpgyObwJgjwOAhh8bVuMGgevXrDuMAyNOyYDiY8HRyOZ4xDoH1Di0/uTwAWolBFFFR0CHU4NCpTxQPEtD+SWkzxZOAxNExwWYdq2qKlfizBpce1fHvYYaOA0EUNR6iJ4pcDpfTGh4p0LdLM4rMYvufyR5CNSzFmPUYMXwGDW4/qTqduAw0MFRyNCOOCzg9qzUWa+kVqjiIbNDAWdQpaRvJ1OP6Y4rUI6fqXbowfNnedqigEMWAh2uPe9AyXxbjjp9xGYmCgIo47FmDSaUUA2PiOD+HFLhOLxMBwOXkxYHvdDU48BoHuzR0rYdZgxOB0cR5xJhsijBH0KnzD4Q84o+YMTThoYuniEUUcO1x+kXwgtciswT90KhDaggsmPAxx7CIOcwegHxJh3rLzYFmfsOJ3HmHxY3jnMWBjzO/3/IFFko6NGH0a+6NOPEmgfZr4p+kNi1gIISoYB7jAftCaeDjwNn+4CxCYIuA71Bwn6AZGCGhqWBggs4vMcP7Q3nQfnjPFjaIYKdHiqEIi5P3jEOl8D+KOkw0cAXSx8R2KJn5Qt8JgzUWw/z0q1v1azdmhbo3+QCGCGflExRRUorWg249hHIT9CRRo4LIwQ4CItpMcceKijj7f210n4Z2bOAih0EbBkY8VBqVungtY+ddrI2qdLA6hgYNHiOxm44DitA1mx8geA4DQrexalFkosTg/wCw4fuI1H5c6HiqGpYmDBwmN8QwNuHzpOl2fmlZMeo2BS3DB/O0c7+HfA55ipaxHHTh2jpUUWAM8xfLGjAOAK8zxHZgh/mIo049owb3uVjM4jW/kTFgoMXmLAWoYcTBrOswGOnHY3i1tHz7zPGbGpRRRcQjpx7j8Q46HYRxKKgeo7lBkYXw5gP9oaT2ni/UDcviCIOFRZLkOC4xpdqL5UYmh1vjdqPtdj0Yhg9AtY0HaqOJ8waHwuDBd5wHUch0GDgeA0Gxm4NJ8waFqNrAUPQOOhDB8WoqGkj+xZkOLSe59go6BvA9mYNI1KHe1CfRD6BUNJHuT6J2GQcZ9GbGCoH2g2rUeNYPBf2H+ZPYvXDF+1VnkHOs3wvAwW8xkOwbT6oxbx6ExcpxHaIcRyD5UwQ0udYjIF8pgzO4YjEwbD8Ges4mDEBcw0rJ5jSfkBRoQ9aniOxtGx2qcNGwY4YLFL4cwcKtRTxo/d5yIn7B0PUIbGLyOA9/+8TwcdDaczBoIoGhkNzobli81Qo9b5l6Jf2GD+wDFbnBqIi7zmDseB+KOsedRgO88D3vNZuhsMHtTb5XHmLOZg4B2HUdiit4GDQN49UOV7X1nQbeIGlWLUW4Qe2GkcZOgWRgYD6NRRWRb2mDM6B8ANwy/YfE/IPFqhRyHG6WhxxwGPaRoGDoHIQwYPSOoczjj6P2EwTxgoKM/I4KMEPmDeoooMTgoIdxyGRwcdOlDgovTvM6xmNqjj2GfkMEDEYOciLe6BoTZhggMNCzpc8jAax6IanBzGGDzQUTBk6BhghgwMHnmG5qeaGg4KDNYqCGwfbrc9YecRHBgqFHzmtS2CjsMFDFx5u1FFSi1A5nedJ9goYKMcGgQjEZGD0ACLSIrNDSoosVAIqHauIantVHHzCKMUWk27MfojR8wbHHSoHUoousizH1FgrMMFvUcRDvIniOjB59J+5nA7Dbj0LqVLtNnlUG5RWvRmDR+QahkbcdOPIcBwPtVkMT6Y8QcBoGD0L3irxAXyqGDrHUGJ9b61S5zBpP9gHxh7ANOOzQ5V1rMnSSoMxmKPqzrPjtOGnBD7lf2ngbOw2Ng4THHB0GDzyjFUbXCoorG09S0LIwah2Abjs/eQ6VFB8WfajHS0jzoB6TBQ1OPuewDe6Wk+hGxQav3MwU9ZzMBwO9x+pO4BHAZn0C6P3MiDmMMEJyMGofRPuMHT+2qNKgcVFFyvB+jG5cJ0g9Z6jSxIxftzrGxYDhc/uJg4BrO0bxDQjjigoz85j1fzFx6jtEO0H1IwG87zkY/TuLJYH2T7FmPSLUNx63oVOGDF7XBDvJgi9GdT4zl++jfoxkcxDv804/Qjt/Y8DHDiPagx6vKODJRYLD92GOOxuEOgemMAwMEMGp9z3Ld5cZ2gQ+dw0qeNS4/wBzGhZmDY+EwYLBUti2g8owNAZH3joDRjwFmLQD6gx08zmtn7TzHpXk+k4nMKf9xNGCjQ84vgMHCYIaEMGl/wB3Gx0fuswZODIYjYKWkV5i2EzzBZoWcHwfweV+YjEwf7oO8Udi5xkOEUczg6EOoingo9Y2DD0O3BHPMIsP7Fl+wlQF2YNX/8QAIBAAAgIDAAMBAQEAAAAAAAAAAREAECAwQDFBUCFgYf/aAAgBRwABPyE0WJgz8YARR/sEGxgYNjwG5RWIYIcx/DmDA0oBrOh7fKKEnBRRWMRtJgnmAbPMH5Qr3Bg46PnPwFwLSY4448HQ0i3POIhgo0Y57nvAHlNARbVqUOwbHZ6zb7FFioMzbnugaFihmv3DwaBh/wAjUdDa1PO5ZODnGk/xDwVLB4vM2bE/DPB3+YOI9Q+Qdj0DaY48TANIipYC3HDn5oxwH+HFgcR0CHWcDQyGZggGIs5DMwWaMeDpqg/YYoO8wfFMHWRQh1rEDQY48FBm6NEaFq8RwQz3FSjQg/Z7xEceI4nH8AfFXMTSpUA0OOloEOwIRFPdKKKCETxD4yKL7x+Kd5g6RkcHkAjwUENBpfxxmvujA8BxWkmOxSr1bnvQaehbhDqW8bgfkmDqJg0DNx0osT4gNGzPUdGDzFFCK80OIwfw6wWZDiXG8jsGBwNmCjAKOJ8wGvdE0RGoDyAUTxjq8dg6hDkUGvxl7gh0PFV7wGnDTgxcesUfnH5D3LNbPOR3AUov2nkRTjowRbBygfCfYsVRjocjgyVu3mbMBon9xJ/dD7TB/CPYoYNZzJhgFuG3PMEUWYohwUaEPmnYhpWq9wQ2vpj6Djxe05rB0YNowGBhgslTzZg1vWPiDkXcBj51GLX+4KeN7gFCExw24IdHvU8F1nlfU/gGCGlbwOR1Knn5iVLQ8FZxXwTyrlcdqLatK1hgYYMyaMHnWMRShs4vUuA/ddKKLeMTwEQZEwafeDzBzMEVHFDSitwbTAfjDuUXaYMnsCln5rzxnxFBgeNZL+uvQr8MzqNKeIIoYDZgoGhFqHyz8w7BrGJiiiswWa/cBR/DBrPiF+4nBQilHHHHoEMccf3Tw+dRgyXCY57jjo4Ge8yMgxdAUaENPJRaTBRpfPcB0DEwbzBCINr4Dgv2CKKGCHEahQtUoBFZEDhnqARX7wAi1KCloHw3S+GNhg4PeLhoGiJ7tUYOMTThMKOCjBY7hyHBxxRfDHOszl7hgoQxQQYLf6oDRE/aUAipWbGCwXy3SizHcN/vMR2Y7MFA2obH5Qpfu09A0CPT5yMGpfZVjWfMB2mDzkdLooI6dGiaEM9bVuMBsHEQ6F8ZfMO4wDI0TZMBhOJ4OjfqzmbXAIf6Q6yYDFp95OCwGCUEUUVGesxDqcGBwVKeKLiWhx/w51LSZ4sm1BiRRMdDRh2rJRRYqLHxZg0OOPav4g5uPWRDFDgNBFDUYOkifo4nS/jDoMW44jxBHQowGeYrOBjwWYxfQ8nkfiD44h1DURkMFk4LNLB4mChb4DBrcf8ATGzqduAw0DZioi1ZoRxwUYcHtWaiwVr+dGRihMEIo4iGzQo0I6MWkUtBgg3PU4/5I61uL9xOIt951O3Rgs/zBg3HB5mlFAIYor/betx73oGQswfw7jjjj41rIeI0UAigFOOChZgi0GlFANbj/mlDQpRajkcXiYC8Dl5MUVmzPFvoJyGbswaB9s0dDi2HWchs46OomGe6U8QmCPF8ap8pg+WOk4rkMGJniOGhPODjjxCKKOHaYfWtK/hBa2nNWYJ7yUUVCG1BBZMeBFPYRByOzB/UmH9paBbpV4gvzDHALIi/cjuMG8wYj+LG8cRxMAxB/czv3DsehUNb/tDpUUWSjghgh43Ys6lFyv8ApSaf7G7dE0DHR4HpUX9OMTwLQbENLAQQlQwO4YDvH8U7PG8SY48HHgbP7FYsQmeYt4h3qDhMGa6x8RdIyMENDQaVgQwQWcXSxGCyWZ80N5ydH+eM8WNQsQ07G6cdKhCItoMOXuhwiHS+B/YHEcnZhoxWC6WTsRwmDxHg+EiCzgsjmfyDmMHQ/lrNvEW6MVeoBDBCYPE8RxUVKAWrWJtx7CP3A0Nx/ewwZDifzCIAoYIcFYswQwUIRFtJjjjwUIigKj1HUYJ7z9x0uk6HH90mzZwEUOgjUo4KVqF5FrVv9p4LSqGD/klmDZF/tmwJ4jpYHQaGBgzU8Rx0MwY4DitA1OGx/IHQsjBDgNCt61FqUWaxNuP9hsR/tuhi7dGD+QORgzceCoULdC1iYMHCY3seQv3DRjnvSYMjToQwfy4pWTHYNLMwDheOIZkWYMjpUGRtfwr3unmKlj7yEcdOHIDMdKiiwBnmLcvprlNGAbTYX4jZswQ/lKEUKMUZ2HRg1e8Xm81YMduziLegH+AP7wmLAhwYvMWAtQ0cRoW1QwGO3YtZGLEWto4CP495HkNjImClFFFFtWBgjpx7jBvXIPiugN7tULeJ4igEMB6joGSgyMLnO19jzMf7Qh0HM5HgP4p0Dcv4MYkQcKisWsVvMHMNLtRfyToiDEz9gOg8b43aj7XY1noEMHyjBoI2qjifMHS4MF8BUYDoNjlHQYOB7BsZuDSfMGhbjYofAcdCGDh8/dGkj9izP7FkbOb53qXIbFGOhvA4R8IwUsxpUUMG5qE/ljzHSeA8CoaSPsnV7j53QYjQ4z8M2MFQP1BfnUtRH7xrB4eU8ZPYoNj7DFgMX9JRUrOswaBzqji+F4GChuHYNp+UYv3eMXHxGedBi5TgdYbHmIYrMGY1CGh95cawMENKDmWHiA5AvlMGh7Qa8WMTBsPEfhncZ4hoQ2uM4kQWZ6gGT0KlkLIsUosXHHvP8eYKNCHadyniOxoEOA0DB2qcNGwY4YLFLH3j7+6YILPAop4Oj3vOQUOh6DQhsYvI4Cj2KL4HvieDhMMBpazmdJFAuhkNzhgyVvEiLB5kUDR63zLcORTwg/YBitzg1ERcKis6jgbBw808ngYP4ZWTHqHnUYDoWZ4HoebgyWRjoRUtJg1HW/hvlceH7Ys5mDgGJnva7ORsZnN4kYHiNA+YNo4Hh4j0+8HsWlZHQdAGYpWLUW4QfWGkZGlrcMGLwIwMB6jpUUVkW9DxMBzNHIfPPCNwyX7PU9YFgZ6xHAbdLQ444DHtVvERQCnHAcTBDBtHUNT2OOPkMd+4TBEsFBDDTgoweIfMG9RRQYnBUdxyFizgDZ0ocFANTwHS8zANSzG1U3FZiwGJggYjAXpG4iLe6BoTZhgghoWdLnnAavUHasRpMesbDDB5hgowPEENCnDChghgwMHnmG5qeYYMfFnBQbFBDTgP11FtesPOIjgwVCj50DStgo5PIwQ/sFG3HHHi7UUUUUVG/eIPMcn9NUKMcGkiLUYOM7QEWkCEWaGhWLBRQCKKDqVrsdnUqORFGL8gFnI28APQdRo+dZwxx0qBj0qKzb5lZjyDkWZngQW9RswQQ6TkRPEBowefhueTmc1pMFOA5Kl1KKLtNngWKg3KIWp+0PgEwaPUGoYKjDTjhjjyHAcD3DWNiyGJ51DuOo6BwEOsUNq1kehfAagL5VDBksVwDqDE+t9aii1naNJ/YBzGDWeAbhsMHWDTjs0DyrnWCzJ0kqDMZijoPwzrPjtOGnBDQ+uv2ngYDR2GxsHCY1HBwvQPOlbBiqNrcLUUU8UM1keoCziosh41DrUG4di/eQwaFFBDgMRgPun6ox0tI86BuGswULGbj7nsA3uloMPwRsUGr3mYKes5mA2Id7j7DBsMGk4AI4DQHCdy6PeZEHMfMMELE6DgP4EwfAfcYOYwCGe7VGiKBxUUWxaXg9rt8YwGpcJ0g9ZjxXMsSLNPB9a4xidY2LAcLn7iYOs4LcfOoQmhHHFBDDBzHketx6jQ0KxDTxOQOhYmhF0jAYHWRrOox/HcAyWB0voPC7XSuFZHWNK1DWrPW8hFFThsW9wh3k8R4hDqfGcjBgMhqe5/DGRzEO/zTj+CO33HBZMcOI+qDHq8o4MlFoX7qdGOOlBuEOgbD1gLMMECC1m+nxi8HodLd5RQcJ2gT30DUuE6fdHJZmD8zeLj0qLIwYLBUtiwWkHF09wwNLI/cdAbeAjtRYOweY+eI+I6eZjyX7s8GnmNr5XbyfIMTQs4Fi/3EwQ2aB/bdPgMGl6D4ghNCGCxDi/2DM5Gx0e7egwZjIWY4NxFDMV5iv3pMNwQ0aFCGCjHwfg8JwDEecXD+6DvFHYs1wDIYLQMzQxODjgh1EUDDazMGAowU8xh6HbpzzFYfsWXuEqN2YNBr//EAB8QAAIDAQACAwEAAAAAAAAAAAERABAgMDFAIUFQYP/aAAgBQgABPyEx5i0NmCwIo/mAwmxgiDo8Dzk8PMUViGCHYh1591+6dGDBpQCLkeD5DACGhSorGR1JgnmAczPMHxDBX3BHbjo3Y2OQs/gL2SI444TBkHiLcHzkQwUaMc+594B4rsouRtclCIuY6P3jb9pRUoMjQhtz7oGhFQhMFHK+cfIMEBhEagPdqefUcHrjJwf4h4UUWHDHbyqOXA4UZ4NDqfmAdhl8Bpcx+EfaHUx6MWyKEVEbccJ14nmjHAeR9Ifli16R4CGDkcGgMmDZggGDAbJ0IdGA2aOXTVBDEjB7yhg4fXrDZEHtkUIeayBg4LjjwoNulFCOZGTFPEcEM+4qUag+YfOnHkd/FuP8AaXvKL1iaApUApcVh4FqCEZFhCIp90oooIY8Q+NFFlfpj9h0YIdvuNuGCvuO3BQCPCghoOLj6/c8ewNrgP1RgwdzTtcXHYpZcfA0+C7j66odgbH4xg9omDBswbcdKKDBgj6hpQ06MHmKKEV5gEHpj5yOY5KD9chxem9GhtUYMGChDZgoxUcnzBX3RMcIniAx9lkCiY+op2MjoIeB+PcHtrRQeh5n3BDweVX3gacNjLj5ij1On6b4h6B6Dm+y2unmzAOawYKUA+ac+MkW44YIouY9UDI/SVDkqMfzQ9NxwWbVu3kZMdE0LKP8Uej9eoOx9F9FDBzOyaAtw255gii2KMFGhsNK1X3BDY/OOR742OTjy9nRO1gmjB1GBDQhhgslTzgaWXzHQZf469JdAM+eRi5/OFPHN26AsmOG3BDYz99ln6jpemepg2/afoHX3yMENKnHg6PJU1vzEqXB4U+qOV+CfVXquO1F0UXEDmGDQpZJoweaXEZApYJw4+Shg7HL9Y+6culFFo8R6obGBDHv7wSp9UMA4GSIfEfzFDlx9jAfaXQe6oovdMGn0ClozzQo+ifEUFE0fTAt2vTfI/mHR6H07y7U8R2NGCjyMEUIUEUMBjyDDBzEP5RsemTpRcfGjyNDmMmiiswcRR+DBzML5o7UIpRxxx8BTjjtftH0fMa4nai5rJjn3HHRwZ99QZccFGhCZ9R6Ii5CGGlQ2PxnAeAyTB3MEIg6OPs6Mdr5pRTxBDT+bB5ChapQCKyIHCJ9QCK/vAEXExWsmx+E4/xQOJswcV0cNA0RaiowaUXQacJhR2YLHvD1DhxxRegsHuPUNfcWzr7hgniCGKCDC7/VCoifNKARUrNjC/PdKLYh9Icx3+9iOzHZgniO1DPugFDBR6nswfGzBHoQ150TB+M/dVjmfMB6nY5McdOigjp0aNCifjquIo2YDYORDwUX4q/KVGDqYBo0TZMBhOTtx0bFnkuqsQ4GB/OHmYDFx+9OCwGEoIooqM+tiHk4OCiinifUBo+gsu3Hp9D0WH+KeQHEzxZNKKeGSKJyGHqtKKKLKpX4pwwcXH1X7J7mDTj5kQxQ0KHAihyMHskOfI9AU6UA98e8+x4GKLmTseKdCjAZ5i4PCo5GX7zsWfxB1HUdRD6hGxay44IaNLDyYKFOE8DBTyYObj5r+LXoGz44qO3AYRQwqOjQjjgs06fVbUVqK1/OjRomDxCKORDBRNAzzDQsxcRSgp5MEHYnYtx/yR0+4Q2Bk5AniGP2xg8XHbo/EFmD+SOTB2N+I+KigEMUVGfMNPk44+I0+AGgIaMH8O4444/bFkOgs0TAIoBTjgoWYIuBpRQDo/SNiP8AhTQpQDkdHDjyYDg2b8mKKyKEMccJj9gmhFY08PiP2zR4qvHI8zB5tUbPD7r6oYMJhn3SniGD0jtU/VMH5Y9kjK9E35QULJniOGKDDjjjyEUUcPUwIfrHC4qL+DFqHodrAH4n3pRRRQQ2RBBZMcFkU+gQUu50YP6o/NLgLdKxDXmGOAWRF8wjJ7GDuZ9/jv8AJHYweioYsGAYMBhvzYH4v7h6PgvRHQewfxH+QcPKii0o4IYIepgy7Fnkouop6f7g/AHEmn8xu3RNAwH1VtdDyX8iOy2uBsQ0sCCEqGB7wwHuPyDxHsuzt9HkmOO3HHsfmKxYhMHzF3EPdQdxRg/CFH8JewYKWDAIaGnhWBCIBBZOXSyIbWls+aGzwOXHR/lTxM8WOohp2N0455gEMEIi6gw6Pmh3NCHi/Qf7A9IxRRWTBRhoxWPmlp2I4TBCcP0Qgs4XU/EFL1D2XN/lrTjdmhbtV9QCGCEz6niExRRUorUFLJNuPoR84NA4HJ+wMHY9J8H+IRFDBDsYEMFCERdSY6OebUIigJEehZhj07NfcWfqfcdL2TBtx/rPZNCGzgRQ5VkclQpRRRQvRQclbpzza4kUOI/jVsQ0RfzZhoCeI6UFngbVmCxhTxHHQ2DHAcrgKfBw2PyB+QeChyaOBwVvmRFBxUW1Qs24/mHD+bdDLt0YP5A08GDbjwqEMAoR0LWTBhwmN9zYv7htw+YdiGDRp4Htn8M+yKVkx2KUOwHFyDH3PqePSGHZFmCxZ4qDiug/ZBg0uTzZKCzsRx2JyYBkQiD2VFFFYM8wij0XpD8FeqaMAg7hPE8zxG8CH4pRUKIijM++Z0YOX3f3T29qwY54seaORb4A/ov0x1IigshwZeYsC1DDkwbUWnkUoYDHHHHYtU8GKjYtdl1FEe0fwjH6T0YfTNjRMBpRRRRdVgwR/NOPsYOrpfsOOGAQ9naoW8CH0iioe0cffJQeNGF0PM9R7j2fEfzQh4HZ0bEPQTPOHYo+i+R4D2Rp0PcfqDIQdDlRRZWV3Ig9YUduOlF754H2lzGnREAyZ8wHgdHi8P03ajj9Z6djmdniOAhg9t5XIwcCKfNUcKHzB7LgwsHuYOxgPtHQ9gwd31GGhtwcT8mDguRyaAoeie7joQwcTw8/sqKKhxCLZi0aEO37pwvUNijHQ7geiPXHMwUtjiooYOzUJ+LH1jxPoHL34wqHEjLg/BHpHl9x+u6CDA0B6Z5vkuxowYVOxyP4Qo2L88lyI+aHorDx8DD8acHNch2FH0FgUIaf6SipWeZg4D11Rn1ZjpcDt5CGDsPcEfAYMH4b0YvnuMuPR6+cHBi9E4PcKWTl8BEVmCnQsWtiGh6y5HAPtL01gwQxxQesrU8bBeHBxezBoWaNvYNeLGTB0PoCiP0TPENCHs+ByRBZn1AFp8FSiyLIsUoqOHHoUsCz1X8EYKNiIouQh7KeDHRg4CHA5uA2oY4TRsGOGCxSz90KP7xggs9FFaing2c/fc6Ch7DpYcPmGhZQZejgUfcUXNeyOzw4TCYDS9IwcAoGhocXHhwwWoqUOyIjZgwKUVA0TB6Qh2/UdLsPUU8IPmAZXZwciIuI4KKKjkR4ODRgOPNOxboCjB6Bs5HuPkNGlZj5Dzo4MB4KLR0YOL2449OCnhaMB+YYIqXAQmDkfyzb7vTjx80oLOzB6A0vmnzdnRsDZ28nA6cEMG3B1ND8A8h6Dx4gPE+cPouK0dCjbjwBxVi1RULNGA4MEGVBH+MIeAjj2NGlzcPmDLwRgwGPq46PE8VSioi3l24cgaNCwo6FDmPeeD6I6mAaXzPqfU8LVCjkwQdzTgNKxDhxxwGPisEQCnkQiAU44IdGj5ghgw7X4A5PoDHHkdzHf3CYIlgiCGGfUJghhgh8wd1FFBgUFqiOxghGBY2FDjn3RwoB+O/SA2NnbjcXAWfiD5EMEDIwGx6hEWBy82cEEwUaEBhhgs8FHPIhscTQ5uPoeQ4mODkOhhg8w+IKMCCGhTUPzChg8wwYMHm11Oh2anmh5o0sGfdkYG1FhxQQ2D+uour4mg85EcAwqFHzswWdLscGnowW4bccceXaiipRUb+8g7Pc4EPRfgnahgoxwcQi2LMEXpHB4gIregIrNAwbViUWQEUUFDseSte4T1W/MNDAPiAWdG3gDs8zo4ejR8wOThjjnmKht4UUUMdP1iLMcdPNjqdrZFC3HxNmhDxOiJ4jghg9g9PJ2cG1BwMEMagOlFF6Z2oovwDhRW8rgoOyitfhkwbM+oOQwqMNOOGOPQ2dijg/qqjgZPquzB1PpBwIaWFBgQ4bItYdH0BDk0vwCVAXo9TShg0sruYPXVhY0/TUe3HQoeiMqKLmehgHE/IgLj88DkwUNOz6As+ufE8srZyK+9mA04TZoGD0jFFPEcfpiLC2TxJUBt4GDDQo2MmhR9AdzzPieXtjzDDTghod3+ALOfung2ehsUeKgo9zGo4Opw9KvviuZg2bEeOohpRRTxQ2tH2gLOVAM+J4chyfo+YPl2OxlfPqHiooIcDiOQ7Lk/bP6x0uIPzwB7DmYKFjbj958jQHd0uBhodjB6A6Ln97MFPiKOzAbEMMGXwcfuGDoYOJwAjgcA2PYXEd/vZEHqGjDQp5wbFrQ/KfoD8h+8YPWMVfcVKKGiKByoovVeH1dml6IOBR4L0Th5EP2jHleoaUFCjZp2Y/bXRdDzHB4WB6LgeTAPQ+9/eDhdj55CExwGOOKCGET6/KfMmPkaFjBwIaeToHqaEXL67iGxgnmYuRi4mOD3xDpwDSwbW/mLmuZ9F0oB7K0LPY+l9wxchzVmL2noRRU4YKFuDo4IZ929DJMEXoH0hDR4PZ6/dmj5gv7g0OTj6uP0zlwniNHRgh8d/Nn675Cz2djj9xuCCiY4cij7i9cGO3gX5RwaUWRa+ehjjpQdhDayNrDhg6qH46AKEMMEDBRV5w/Z8ZeHwdLB0clB6JFLbnmwME9TtTxb2R6Jr7390dLZg+NvLj4qLRgwsKl0WFxBwY+Iw7BwRQGj+ieX3CaA0Y8COwIqFOwfQOj8GD0T4jp7Mel89Pump50NeNv1Xb06U8eiMmgdiowU/mxRghgox/EHmOnDH6Bg4vgfEEJoQwYJt0/ngdGxoega++gbGhZodBRHEV5igr72KMN0NGhQhsxx9/gfROA8ZHmjQjh+ciz3FHovWMGTBhdzQyac+o6EIi4kQ/EBjtR7GBRghj2MPg7dOeYrD5i19wlRuvPINf/9oADANSAEcAQgAAABBUOzgDzLV8HI2f/ATdrlghgBlsc7Jx9OqDzgAxD7Bfgs7On95wiMjCJZw/Dgv4r7vdziAyR7fm6fO0nsOT9tv0fcOe3/5iFTdtz1ziCqcPlvzvf/nPZUy/Vx9jPUchMocff/4MfHwlR+knaFlmtvFMctwP3OT8CSv5tdu/ggNsr/fjpdPcngp+p5xeP3iWA4WzFjhwGG1D1VyNReM/kmwaAcBfgcMEstNPSttkHeGECmIybNpLomNz8ckWH7bd+/oZxu+i7khMDrGLv2fcJDDOQb7pkx7yceVktwPDH+6xyRvgBgfwctmeb8wtnib+CGR1UTZ24htyTfjb6/XPZtD7joEj+jT/AITI+8mxnDxeff2t/wBwPpBtf9Fla+BG8f8Aa6enncPkcfmCUf08txyff6YuB7aKOEn8Txr9ibw78pbPsAL8f8Hn8A2+KeU4+9/nyH/j38Vxz9ye2uvkU+O6jeBJa7f8bAD7TwaZqbm3afzSSManRodl/ifyc/zT7/mt/wDA4A4HGjOJHUw+SRy5Lv4Eb6bP/wCm9I1in0G6mx9ABjEdmUd3OGBrOf3djfc278+0jljuGNEwdt5hzszU4yoY7zv2lBJV71J9OHqGWM3se01HNiP8EcdmI4/G/sNftmPBjjtsOUBOh4fIy6V9/bsUTUzgSIvknCf3I/8A93MR96LawgbvC+vjBNxicT+eGC9mpjOTNzxwWudoy8oEh8a/b8Y7OvYcz88fs4qSf1GaHfhu0ctvTfQmQwbYydTvgCHkKPl9zV88cThl9gKN7uO9ViPDgfD/AILO35rd3sh5/tYHZ75p/AOh3Hnzwnz/AObtrc8adqatknarJjX4I+XG2Y9zynM+JHB8cCHPwDvMKY8SFdKB0OdwcSKOi/3FIvQwGZPyGGBzyD9C2kf3zt95P9vvokv00lFsW3sZ9MU53plzqUoddY3Qf2/bz+wmydOs6L7xIfPDz9PshuT955SSRHwAwBX5wGdDv5NkTz7s/wDV9/d+DV6Rxq1Iowf5JMD5r9/e9HfFRCCRnfwuXb98eVvtFfB+F+F8CTzcd7dsbwrcmA/s6EQDwAAjENs8R753/wD5NeKVrlFIIxxORTZAA4y0YnqNOJu+skg6AhNMLmncP4uSfjUrdEny4HB32nAR9uuZT9YabDPjXB33AHA43xuJedP/AKqbID/i1W48a3+B9g5GeCPFpDugDq2/+OC3bSFZPV9Qn0yqGBwFA9lt3w//AKUlues/YDWCeMIfErgear65/bWZ/VV6D4QHTj1BPjBpsTv+d4rFcjmbzjvgTdcSAKB2NPvp8CT8ycQj2/5/4gTbTPbIud7FHTsT8ScMB/X7Pi3PXd8sr25j762vl3//AOWh223rLJvxmn/JADH5Ykxn2QElbdAmkP8AnGMB7/8AfgDjOZn7Ig8iQQaf9vp8EcwHbH5nMDZs6RODV7FWksP+fza/gJHFvaXVHD/2/wDb5jb63BVsyZ5Z1Unnk24+G3b/ACwAwEV9iy8JBA9h3+1eORxt222W2GeX9nqEbTzWaWkdx6m/0otNjJEun/eC/PxJzHArHp3f6DZHNcUFe2SP2IduAWdXCcA3jJpgNr+QwePxvvwTswwAywwPVc7d87a4X/8A8oy1PWX3Swizej6ONeG+QfHPzs856ZiTbtU937Dz47cgPxYAURQyMzDSXQEEAb8ABPhgTXE8TABvLgMLxVKz4cm0KaJv6/JhGf3iWP8AY3Y76Uccc8g2RcbjhQ3/APfZpyyBh+5pHxhBCJIFjI593zx0AR4p8yMGRgb/AKkcCsWT76/yYuPl29bPMwdKbf6/OnyBkM9ZfzTbzRQdLGYtcATDqDQAEPnwlbvDaSYHwTTnbrTPwCObI68Rw6f7f/gBmb/XMcpRQQWq07yQvn7DZX8Zp5NtuqFVzI6JZnY+6dn3D/gCCScAfxjs7MoQoZrkgX9bcB9wi3juPsMfDcffAnqz60mrp2GbJ05YRbqZOfB6kNscwXmot0lPFkwcuyN9+wD77kAQlv5Ef+mFR2FZD87gM5+BcA/dc4F2cVHD+bAZzrEtJpJzLKnSsj6yPLs/D9Nh1Nz5xehmpJZ9ciOsE3OSDY6SEEtwnAzv4aHsJ7aaAj37op4P+Wt+PJx8T+HEPPbtpqRiSktpOhw8P5Rkb+fI5czldPVBIlkvKvqtWAF4aCK3zlzAAHCPg5mBPWuMwzMbfejiQEjjX7ZRucB7Ygp/VnRE6YfioJI9SKltPb5nQLjin9r/ANmWiZpTkqxJEr3mP+jc3SQAJ0kmMyneHe2g2++kItDD4A59zxt85Dz1w429SnIkSSmqXd2yPp0/uQzZcIBE+R3tLVtcbtmTLYd3zh6x33J08Gw6/wD7Mo82YW419umZttG5wEWnZoEPTiX93+Fa54m9SLxHDPbZxO+e5tttErPXvq5KovKV4W8B/jAx3IwTjjAW/T/+WWep4JJMML+7eKvLJl1gFt3HSGOAt/wAHI6aq1319VSqn6f+rZadyU6Q9Bh7vV+e1K7YJQ5PBh52TWJCXJpt9DHne/pPCd/+e/8AJ4yzH4D6fzkccNvb0gLBJlJMpM6Y25ddSHF6/AZFwFISpZRW7dmKzzxsljTbbNKDbSDObG2SDORYz2bKSXXffdnQN+cnn6HBPiONvJMBWKJRVHyKQqaEnDx0n/svGKB5wd0RFmr437nwHtldCCQSwSCQmZjgjfmTTklvNjz99r4weA7fvgZdi6AectJv96otUv8Autt982NKbccHGbcbT4mbdVRtUs9zuZAkwO3qYgVlTsJkMwmkyeEag/8ADL30S93x5I5agf3z9guAAWo23reutL/SZrGQqoFL/P8AQAJgTb/nHGRH1UnfYnYSYS6TWJaRSSWCafGGKbbpD+a3qGrE7rj/ANksHfx12ABA4xg7evrLS5c6SVL2ytV9jT/EBfmf4YJP/irRz93xbz3kdkuE68G6hMk6vlROrmWLZEzMknJn7HQjA6H8oZCbxBdkFA695QRasJwItSUTvkebA4N8/ZLA47O2RIOeVoGzzzElgEq0nqMoKHdzX/z/AFztt0JBqXr0PofMr+C/LFKDv+XMxvdxTR0ZjVY11c6X9o4Sxt3YbIPviQc+Mbwla7bwQ7pMr5JvfIpAM5taRI/udOAIIKHBfvEFILnJBJdG3ONxto7jVk9/dTbpFcRZI13L0Lf4rKfyMv8AiAv/ABGm1umIDw3v33hI/U2m2v8Ae4PYlefP5redP/JqmnBq/wBKPe0kj7hdvfYyz5sUF2ZQJv5Zw+7nRjb11OPkef8A4A/rE347Eh5L28M0IWv12MitQ9EsiqYK61/uvxXrBInv4tHIAExIxtt22C1vMIpoXrsWHrEDdcmxOL3hJ/r9eP47dt21lpkGfH+/90kXF+kjuWyBLmyYd+v2w/6n7mlJcVYzrAsEzxK2tpeMNqRlktlJVWN5LkOZGlhIzwjgAphv9x0RYBakIze7+00FI/VmJc/0mi8XUz6vvuvCr1ckkLVz1BGMBkeNO19f2SitMMeROrYRXHk7ZlIyIGoyf/OVOgXpMJCKGU3dmd2VcY22/ME/uyOCm9n9av8Av9d49lIYifq49MuoWzFS8k72YldnSWL2hxpihMAeNrpn9f8AjwvW/wCVu2q326Sx96bTu7Eww3pI3nxsnsW623/t2221DpMmd7LG3ibKhkh33o7hWbyKP8Vkq4f1rcUkM/7e4euPa2QvUSCQu5OxnOjHuf8A0ttkNQSutqtP5EuKbrd7ktujdRGGlSr/AH/hGYaO1CJ92yVopRFtC2UkjJSKTu97Dm2t+J3bmxPqpAEnSYJPfsntfhCIlx/M+rrwf3V3369La6TYzMyJuSAXPeOQQ56pqfdCpnWNKK6JoBYSJSf4rWle15r5X4pa4nMkkw7D7IkI/r5oSQL6al81v+3/AHy1v2v2qiwfncCeJv8AUVHpDC6pt8op0c7UmkO7TeiSpUu/zE1LVfSBVsW85lsdAzbTWpy3rP8Ar0ayEzovaq1YS/qX/ffVfZbfBCrKbANU3CQ5EbD1aMvt4rs+ep2uykNVNLqoKKEC0aAx622L7+aQMoD8+aPLTw4ybCPLe/22SCLFl33rPXSTa1j7QFaZL+P43JN2pcrk7dV5Kh3YLU6N0JIa+pbkJEU3ILAkvoxg5S5Xk1GbTQyRGCuYzf8AS4sEEq0JV8vY0CWstFJBmWkn/ChkcmqVofH4astUy1AxWrckX/xpoSIRT1rqN6kYcjYKgCstRtXskmuCHgQ6X/4HEyVqRB/7pkG+X964BdW4BtfKdmH73xOg1t98wjSjuWxLv8cVh/Td/wAttVaffK2YAeDuvghgq+XJN1uNPh6PtV1BON6wH19figFhL7ZxCWhfYMz6xbM073RE2c3DxzPT88E9dFKVxJKNTFatyI4Cp5Aa7H7D2ci/0OvTSl/N/wBDTGq/b5GQ+vMBTbK/Qd5YLCmxn5zy321oW2g9+8L988RM5w5JhXXqiXY1f6BNOvNSQVEknLG+I7HSX+yaPda9RDYdu66oom96X3r/AG+1uP2kMKismunF1SXeVHaSr2yvXZ6VlPNcqvU8SQVuyiUM2mM+ZUKnG6WfsLkG197w3V803wo2/wCMWopinuPVMg9CeFt442qw5Hml+21VkNAcmnoIoIUlTogl6l+jUE53aewnK/iXrkV63pLEVFLbn/5OQqrnSTADsWQQz+R1v8FxqlZGyN25k95GhXNf+lTQbvVH1FZkzIUqaqfuoVHZ2m94O6CpKbUjbbeGpCkhNr/7eoblGL4xu7Rn8cr8ADqotUmcqTS8+myvHCxI/fZkajitH0m8lEdqyb7Jv0m3JLVvP5uCqaFYvFKslnJaajn/AO2YfrBWzRZ0ca4AP2JT/qWrdgRisNNkAxHMkwb2VJQpMqdRzAu+r4JQnXUuzNMbK68jt3vlp2DMr+2/FUw1Wa2zwJCGgaeNoax7UExd1bJSxdxl6FGpFwibm2WLahJqXFeYLsmEy+l45pwhRtIuH2+5ZhM6YJ2KaqGDVOpJJnraja9fxxrrxWBL2y4Jv5DSPLGWwlQkhgwsY7P5ePJYWTkltm55X0nlp35xR3RSVk0L2x99W3KuptRVHFQKHqNKYbeCiuTxXq/zKAIaTZys6aCQyzsskFYxiGEVAAjVHJLlRdb01CVZR9vBatSWy4XlI0K8hkgIxSVtpXYXG0rSue5fSLkB30eLGb7KIbfoh1aySQRH/lkq3HgjTc+abvdcfpRHYe1ETcFkds7MTpK5QR5WqnugFTJqD2hKFoZ3bFNKibTT0HwQw64WLAT/ACxD6j2kH5A68NdsRqNc/wDwUttRnY/Krca5l+sfklsClbfECjE7rb/eCqef2nVW3qvIonJdcOtZd9FC1NVPkN9bpTc1JW5li8d0Tde5lVv+R1w90rpH05RzL2jv/wD0z53B5OCyy1K+7Z/Qxmb8NqDCmEE1Kt3S6ZH+AaQzbjeyauSLLQLSsOxlva4kloAJaf8AB4bgylSRrGqWFSa6795kfaceOA1u0UKQOMjWdSljib+yXC4ltlMgldvx8BklEOyTSglxcR3GmmZw2tJY6STUvHPZIBpm9vRds1iGa3X50wzMUyJvN3mqIpEm5+1WrQrSGMSVcNsbhZn9/wAC8YFstJ+oMuJsbMDN/wCbCVNpu2Rw7nhtsw3feqW9X0rf9r9sE3DHBwy9aIZSS4gd8b/kOVaX77a5HvfJJxb/AOncWgG4SMHkj9EEFyuwSGOBKaehmNpS7q2YJ2rUSue2pROauxbeMWu/NBdu+mSS+cm4e92mVc8nyRzgxrVpMm22I6VEuSD1+087zGz3sRihgrYSlBkdBD6OHPwNudCcxtSQ7azRbE0165mw9/DRQV3bxeGKGttevDPxlVrc7ik+4kGikNk16RG2mEXYy3GiRLKvTS1MtS81xgNLMeIutquktx3vZ7+8hvtuiGVdVkW1+Jw322IKVNURDJZIrZM+KiExAmk280B3xzh2zEEk2OgL1275bBWxnAyntvIywxCUGbJVt73OjjuOKVilthmOROx+Q7GEmtBhzUhphjVw2RV244s2mmW2u82zHuBBJBtIpPTq19VW/I/95utbw741vJdj6avffME7xtqRKwR9qkPzteM4/qnhgusshnJvohRsV82bZEA86xnSQS73qMmKgkL+sYK4jfmj+Il2HejOGliceaL2/wD3o5JVNPebj3naYbXvgB/5pbyXxlpCQEFyySx3HbX4ptm8t91l529RPXniYTpSYIRL9o/t8FgxRaMSF5vNznh4WdIY1gE1zdaF2tdfvsNhJyV08nSE5BospUscL/hunupFXQJzhfhW+g9t4BAoXRgIHiS555CZwd+ukTF9OkE6s/d1tXkkXVGBUpUd/h9tszCMDF0NEqpA9kSo+Yudf8xpDN+p8f2fLhqU0kSTIVqfZJJUhscB+OPLnVGq/Y8MsqXX+3DjKrVErE9WpiGOyV8QXrqywqvDYNNSZpjZPqx8EJhXv6d8Bn+dtkdDAzDJB/BJiP59wOJwDvcktXsqOKWDfLuHN+cTAalf6DvH/wBFfaF/BU1I7qJDge7eQ9Bc9b9y+SWGmTHnf768u1aHEzEkOwjDq7kcEDB7nQ2O5aKpXagYefjTf7b+i5vuZDAAvuoz/wCNrN7QndU0I02K2QYGqLKfUkAsQxf4AMw30GxkmkggnHgZaD4YBI3SUq2VsK5C+Yzkc0jzMHXPl+ty5AH9xJSSJlWWRlPlgw48PKtmbq2nFkrV2IA03wzhJx5M2UlQIkbgjzIj7kzI9SuirfJXtsk3bYxDX+StuSWrm+p4/wBQPqlb7OvAfExIzpgZHmUN6YyiTvJmfqkNgY7QtgHP5EopMTMKvXYn/wCfbzJL3Yd3BreR+v1k97Z6Hy7PLKbVwvTyAq/HEbiqvqYCJOblrJnJyFwzdhjGn/bYkY35k7dy3ZoswHAngck8bMqJbE3QIwDpsOc4Inzxpz7MDclASYhtbgemEhbcSPwzvVc6MFM4LGk9lkfeOU+cpiZfujDmEyRtdEkggZgDDMbMIWWW5pSk43TsI5s5kLME3hOwjajOP8R8MD38Q2IqSzaZX4RkA1JTZ9AMQe4uD9gR5znYSom8WFskA4jQAX6QyamLMNlB9Ll5gGM6MzYd+VkpqEjrScL2IHdZ4bGGK9AHuwm52q5MuaWA6D7zekbEGJ6U87QbbcOy8TsENgF/t+07WqFb4qVDbjdNnaPCAkCRMaQkqYMnG+Zkadnbc63442+3H10qJLaGb77QHhxZcaLZm8DTKXQkdFnLIF+7f7MnL/ZFNKonNbPViDB8GPTG3co1XHHFHkX53t7GHYxo4lbaD+uoTJXDSYjl8CW94oab5X4+anQbYg/OXyd2/wCwn/2JOJDdtwTdu/Cse3HJkmGTL55uSPKv/H7CPOT+VU2v6Iyw/wBmXpJwjFSxvyrAcSBLZXidpJpDB2X/AG8dKKfMAn/prN6m62upW0+kubdkzbEosNo+RPdL+DLEKYTHxdk5L+QboOxCrRYMCmEDcR/Z+YjBIjImbMskiXykQLIeXAYYAdpmmlvR0eb7444csY7f9mROYSWOI8knfazFhBn9Bquz9KYGXu0jTeUDYGbTebQzY746E0lJXVJXbcsOVq/A7TrptnbVWpQvffPUsoYzPxYYWtLW75SGwXX/AGLAwJdNU/oDl3sN/nzMnu0DCithbO+70xdQO8t/tM23vSNrQtf3/MUKcrR4fzb447Xu5fOPjmw7c5Nw2f2BLLuGFtpWyTt94uH0jXyOOJI4LE02AmBlhwZl0F9QoV05+6WuSSRSDG3XaP6su1rpO31ieYyLYjnxYwJj/vHP0MRyQzUWkA6Dw2QiS+ZdNHxnLAPfG24BIMJzz/SHz+tWVvqSycRKKW1m/BofnzVT+xhIq8y6JwUI+EwG/H4JJeUQ2og0SZxHCL/GIDsTe7J/49w0Pb/k8POqySQNv6ZaMutttXWRVXkfG/8AiZYxWipxB/8A6/P1D/4bb/8A3v5/GBYGWLI46TSedNbbq0/+zE67JOjHU3I/W/kI5dWqx/xO2bx9gtQSxQfVsivBPzbO0oO4+4WqDOd/3GLy2GM9xw4L+3BbyhQXgUAmk95Qsn3smtxs3p3XF24kgvNq0YIbKLBjKGAkhTos6lVU/AGngi4vnIlD4HUOdTH35LJZwhJPx5Su+kySHNlSewlvzyAyBA8ZHlIBP5xBB40xKlIN3OIIDJ3StSaetRUf2x/4Pkaio7gYv8/3z8muI+Oe4O0JJAxRQsS7USCb0ltKVoRxDFxTGnoXh48gMU305+WhABJVeZW7ptVSFSR27tb24/Pm6l/nbxPU+5Le7EI/8AB2A048GUvLV0VkHLuCW7tMQb2QRyG932AChAEQBu3iILMJ13zD+u0rTUuUmSTrlmj/ADzrqP2TX/eANweaYeTt/Nod/MNIlpkti2Bsum1mQ3y9hwTZYtEMMs99AIjAhAcTCQIHcfv97U/sQSCtKcGr5zqAqtBAf8R/x6SJzMI63xHjHQVQIEhozEvvYDU96aRayNufObwNHNBrNgNt1JwKIA9dj82dziiNrzykmN2ktY5Az7nc8AGBxgeATxviY7yi2S2RjzatsTdoeUGHqeb3NLhtfWsc84BtgWMAQIyYS2ACCBJ2e6xic9uj55KhzTU7fgezbUeBz4ufxgR/CSR7iWyppj+XaLhrQkTVRiOKfoKsW6rPALWSSQScDtH4QC5iOyJyz/2dxcfqUL5ottJZZtP5vK6eO1wB/wD/AJIGBAhFw7yqu1/OuZ8qZcLKwdtvp52RX2mR2iuJVz2ZYfwAmwnAfmIpAJ5JB2+v1TRUNzDLT074HG+Be7y4A49JJJe8SDHw2aJIPxGcj3GyUSB5jv8A/NNPuifYLenieWTBHnxvuQSxuNzGml8df76gkkVr3UVdWyP/AFqVgEkAf+p/FtgPvTk/nKKd75hKJWPJS2y1fHc0Ak7ZkkUN53+9dOkEYjEg57Y+A/0skfank81mxZVcRvVurg/+sH4koZe/cPZ9zJHdsAfHEHtxF2L0bZTqU0q37P8Aee11UMqNSC+OfaIC+n/w5wLA/wDi0tusTjKgokpt/wChFfD8cOHDEEdicDl/vbOoZFn0pY7cJMpK2KoPiTgke2+kYt7tU0q//phsl1jkAa8H7gEP95HwahI09GHO3W1b3cpq/nikPGQb7u8+f3b4a4Y3mZJxkCR1KJRPBOJH9/Xc3fMZsXxfCsQF361syMAQAkMAcv8A2zP4qVpsOP8ApKZc6ollZof3vaByRw91zyj8EkyZ9Blmbu36K2FNcdllv5dvH+yi/wDFICttGOnxaQakhvlkYD/6f7e7X0qKZ9WpH+9p9M+0v/Dnfe7j+Zfku6o7bc3Gh+YhbJIwHJOvFC4grn6EkD2X7XltU/gPIJPZ7kHkEAZh1Tb9Mul7VS1hSW+tP9ROpEEbTv742Dn7b9p97E+YAMtlKTiNk7DTGRpECT2gkk7HNX7dtQkbsu0+m1LdsnHCgiT77zs/F1KJNr1DO1HA7W72vfl67AZc7TjZsY8p7/dnjB4/1LOHCNuFL8nhMnKE4cz47dUUeDvmWPH+/gfvajc8nE871A4ZRHvZX8e4Nir5c+f4g1GcVTaElbe2E7oia9+Ye8SryUYHd0y3OmPSbHqmHj7FNNsFNNQ6bMEAGknYj9+28vU1JA0CvlYmovXJtYxang/7/wCw8U0++CI3cr8m4kX5XK7m1cHAHbVjKcUW232Jt96nW3I8yXkV2+H5I+5/6Jpyh6ZkO+6zLN00ElO7HU74J/Q/m4vij/fTiah8p+kkwb+h2W0h+A7yhSsuMx/2XW/XWBxQaV3Hd6P5448x/wD8Y8Uj2XO6D17A29/7F8hrEZiP+d+5Cm55F/8AFxN87xvySbtzOJtxFG8quJQ75Bbk6Wl9RpAnPq8fV2u2Lj9A507cdEo6yS+4Oz4TttdZdX4mhi9ebb2TT/4nneyKruLu9w49757T12UJXS3JxwNInaKiq2rDgwq6mqXUJFxJHE4377zz5bNup4c/x7eC1Jf7c1Yvrnn7qej/AC7uxT13bQKN3AAHJLqtZjTFUngR0imbzivVmSlqq2yIC2vFbv8A8lYeP/8A9bOp2hp6PFo7xDa3VFO1JODb9evV8mecv7Xm8Nj7lVkAV5KjRSmXqQbLaydJHdUw06F79FGNIsx4p0NtINcn8HfjBLbv31ipbXZW2nJU+rSjm//EACAQAQEBAAMBAQEBAQEBAAAAAAEAERAhMUEgUWFxMIH/2gAIAVIAAT8Qc9Sa2Czuz7PcSuSWWfY6vZL3qTWQcL8YDsn6twMht7yXqWxxkBh8sy38j+X4s+z8E9nd3bIJieC3hfkN0e3vkwOrJUZaT5dHgHX40I7YAw12Sedk0syzlzbIt7th4SbOB/DBlrtu2WfhQ2y2se2TAWWcB3PG5bscHt94G+8PDthncMsh2Xj2PLWcM57Fn9sIJw8LtuN2O3sHcmcB3CJ7ss4P9lw4n9h3qzG3G6yLduuBeQmw1gybGrBkth7ve2dwE3Tn04OmO4zZ6t7s7n3jeG3YMdgyOu27X+QCzrneuPtnC5Hsn0veoYTDNncst2EG0Sx5OJpqzuyCXJ74yySN423hO75wkxHnA4fY/KxBxnOT1Hd5bfYnh5yScur7Paeom2O59t5XL2DJNIIO7PwZv5G245blu2EIkn2WV+Wp2w6RDL3+E7iJNLAL1LSTGciYO4dXaJ3bO7xD/kn1YMX3gSEutnSMv+Q8bK7A3ZF8siednuyeiR2EncGHG8nnPcs+RHZBjfOFxvl9svJvkdpO5GxnBE/jyV2HqO+di+WcZBbw9Je57Yt5erVg6nq2NvbM4QbOM4er5DHc8LwqQ6Xl6nuzI7kInlu2B3hhLN5OPs8PDJ3sDZJ/YyfI/wBsGTvIMvW85SPJ6u2EzeGq3jxOJYepMk7hxl4D1LBwS75K7XyzqfbWBXuBO4fS0u4Da/I/2fY29iXqNu7Lx5zuAWsDOCfxuM8dy92bZ3wmM+X2Z/AhO24WbJZyWd2ZfZ4eCe+F7vFtsxME+3yFndllmcPkXySCeNs/ISbBHvL7wyDYF7ZNi2R7wmn5PeHyPYt4Lbd5eMnYskIM4bLMvYJgjhmb3xkTAntsw4W/SN9S9w43THVi6iySzLrL11b1HsCOiXfJJKLG/j5bCs2323gd4CTbM4XqRWMAL7+ks5by2OHshz2ctLqOMOPk+XSc5I9k648tvk+8HkcJ3HlvJsG3jZE3U98PZZPUNst85C3nOrL5bxkkGyYx1w9XyCeiEb2yfbOHjeNhs6k4L7OS99Xbj5x9hl7ju7s4eFnl67t3yBnWIZOdQ+sJLbBPkSZZpaGw2H2EEdeyGwdxJLxOpWxY6LPvCdWhK+LO4fSM+wvGRwZdHHfC92WSRZBPGfneEvLOVJjLI84eN6t2zqzg74LVtnyY8k/GSbf5EezD1DbMdXs2y5LuXqTYnUpkecklnB+vY6u08Jwr8l0g72QyyHTbbe+Nt7iy+xPTwX3gEGHL1PbL8If2w5bOFjtgm3h6ls+Xku7LcclkyzYZOQ4XsuzbtiRaTeI7T2Q925wuShy+x/Kyn+3REevtism53ZLjNnGcpbHf5y8nvnPwsd28Nhl4hZsGfnO75wwR5CbfZOPscb3e2WvGbEluQx5O7Y7JeHI21vPyMsIveDnLzks/C2ct7B+Qdd2C7R0Qdyd3yzJ95zuOpN/D3dk9WWz3ZLjHtobR7Bb3lNIBbbZ3DJeWTq3ZSwN9OTy72wCHubJ9vsBIEYjzhAfIFjJu8NkP0T32cS0hIMWyeo46Z8iwWjEvfD5a2PwTb+S8nu8jd4cMusFnfJnGWMFnV5POTwkkE9cjdSbEdEu2cFnBPsmlk4XRBJIwfnYdvPwXlvChbvGcpO3djwyDPw+Xtl5MeRffwPc93yZuzCRYxJpYTuRnUMssm+2cPURY1sbPTdMIS7bl6R5kezZlmxJ3JjGSa3+ReT3yT5N8g67kQfyzSQsmdXV1h/J2XmXqekd3kSO/gMs4DLzkvOfnG8eXt5Lx9kNs74zjsYvbJhtt2PeEibbNJLJ85zgzIL0syy6jh4eoZ8n2TY6nzgLOck64SOd7t3hGD+wWd2WWW9SbZn4W7yLQcnvj7wcE/jtZU4HfAb3J3x1kx5Fsssez0Rux37YTgQxJeSm8mXZHfAXk27CI78g77knUKl8mBEjpJ9j44e5NIMl/bu5H5dWMCXW2TYLJ7IMsDaM3fB+E/ILESb2MWdyWXUnGmzE7fLovbMn2OGThZLJY5ZkG2TC84TSfLHY9jzhvZ6LbOt4L0sz87LHf5TnPwP52YPx5YLvGSWZfbe+PeWCbOR0c5bbx8g/tg2ZPcmWbY8B7jtnD3K2zqZ6jyAyIt/t/CHYN9kLo8Z9jTy9LP7Dk/ELv+RnsCsmW9W69Rpfdhr7YkKexmbdJB1DwvdnUn2DOGyCefSzk8j94PB2cuwXzhO+OovbO5M4zj5DMnAaQT1ZsGR7z9h4LLzkYZ9k4eBngtmMZLyzlvkxbkzHnA2z+liTboSY7/Cd8El9vtsw8ZfZb2ereO+EswldiD+wWzwmM7eLQtnu35F5YC/zbt4jtsE2ReJNh2DbEgIfyOiwcdzC2ZZDPWe94ZYsaGRwGM2a7xmkFhLeW2DJjxjPDdrMJJODS3lvnDJHAzHluW7ZbGX2+yR0RdMnCux2Twe8rZsW9R3BjBN62XWR7P4eNnuI9/DHBJPGRZpZ3Z3PH3lHYbGInjL7xstsTwHGXybUt2zjyO26JZBgslLourSzWyAJ7OLDjf7LeiADuMjtlhDbK/wBSmQ064PCEbkjtml9g+JPGT7AOuMpDaeSlae227O3y2ViPbrbZ7hi6bMtzhHLuyJsC3TgONs2yzDgknqPIZtdnuBh1Ps9R3Md2Xzjd4TYcny9sydyPJOAsjgbNmD1wcPLwP6yXu+W8vJDLsOMmz1Z+fn4fLOXzgYN/Hy2XqHZLOM2cLbKWl5w9Xa2dRwd2RM9mVXIQsmI8DPsT5B1fLsh7iekExuX9R/tuvUWFjydb7EGx0XiPJ7ILJe7Qh1/HjEdW7JwQd3kpOMt/G2wWBw8N8ierYereNyO46t0lvnAQdWO3yL2Tjed3qOr2+8wyZbBNl1s5wHBysSfnOvzot2OiTjJLOB38Godk4XgLM/DsbwYmXGO56m9sPsAeS8Jx5b+Fzu3HkCXUgwQZJDjLtmxPZYhfI8sg2+Zw9w64dSDLkwx7Z78k7sg6k6vIAR2ldnY8nUGRxkkPG26WcHRMrvO85znXCXnBnKdyaRHrjJMjot7vltsw2l7Zxvds8bxndvVt7fJ7eH28u8s2epe72CbIs5294zg4yePkwWsOxw5PcTMvkSQCzvhrclyHbch2Xu9/He85eEuzBblttpPTq/1PCwgPATgWwq2l/vIzNt22IJBBeXqEiWN2supiYertM2zuHHJ4HqR5dN1GXl7Z3LlrBBw3nGcEEuWy2/vQWsg7s5CTh95e+O7/ALe8JDjrj7DyBFllk8OwXnBuz1b3weWyWd8BsWcb1N84y8t4OXqJier2Ome34Jd4zJtlnue22odQTy9W98nTwk6QjKXyXqGTYL5B+2cPbJddwGdRdJVh8eDizqS2PLO5lbIN04FmXi7vUddsFtvkG+wyHeiFJZsdp8kyFjIdT5BjBNkLtvDMMcbFmnCfrbZiPbZ4L5ZkmxPvHse9z7Ft6QWdwT1ezxsW8lkzERZJJ3EnUT3ZwOTySRwTZ1FvcxPd5PZBLZxnd3kr+MI1ztt6sHuMt/DBJeF67bwapBkBPDIzbIy8mGWEvFtvfHReyOR5PkG3+I/2fYQ/Cnuz+x5dJa5HGyHvOB2l4xeOrX2UOHF7vJNYLOpvl8hh75dvYe8jnwjsn2T8vfO8Evct08LbZ1watkGT35ZFmt4R3zu2SdzESuxzt7ZyRw3l8nhNgk4zls4+c5kXvObJnDLxsTxkkmxiDnWxWOjg52eRtiSfY7OGYOok2PMnq7PVj9ss6u12supDh9529LMJtvWzuXCFSD9sRtSxjpxTuOjhiMPV9jYFnrjep2GZ3AXRe2cO8iLecv6izj5D1DtvcmzEF5N3MRzkuc71x4y4OuD2+8ZznKbHD+cbe8PBPDwlkST7Z+d5zhBwNWeN7nhJLe/w3yO54OMn28beOstt/LyJizZMt7lwh23vhFjTEH9nh67lreR3x9lyNs74e+pmWo293sxO5DkmIh8mKE5GSXZ8sd28I1I8d+cPC2bvI46ywvId535x95Szrgch4eEnn5F9/GRPkN9uxHVsdz7z6R7L3DHJyTx71GODgOPkSfgJs2zOMsnhBGrVs4YILL7ZZJwlncFm2EhMSWSWWTArZ1wlnBJx849znyeydjc7vlkN95ZmzwlvaQsx4+Xy+Wu9R/sz3BbLy+cBt7sknlu+2mS76kY7u9uyBaN1BxsYlnGcHqODhy+yRvCtixx9l494OpS749sm+R1feHhjL2y8ny9svL2SLb7JrBnA9Q32TgOTj5fIX8MvHlu8J1x7Zkt/iFbSxcyfOMsvJ7gbY4zueGGfb5ZE8/b5bHOcE+zZNsRwsjCUmZy5JSfIfxgt5Pc9Tt4yWdTuR0RluyWQSjd29ZBecK5HZ3P1NCDth7J/IP7PSxLDHSG9hxngtjts7m+WSyoQsh2zgL7ZLjHvGZaW293vOcPVv5zbLoust1yzhs64HTjeDzl1xsfjOCTg5ZvsvG27MLIt/qAPwllnBJZefj7M8EYl1lvOWWck8bzstu8K2aSdc7Zt1umXV1ep58ll6jtslvcDuw14SIO7rJdgs7nYvsvJ0z5AZreoOd2ksd3Ty+dw42lvVj7dxtse3rZlttpL1I/I37ZB9l42+yzqDCOOpbPsd87NlnDyFt7DluNs9Ntt1BJ1BBk+8exJfIjuTL3jYsn8s3vOxx9iSzqyPODh42zqJbYOps4Tk4yeB6t4WYiz8nPyHjTLCLLw2xuRbPkJs5Pk6vJW3kMwydRHAgm3rhY7hzgvpApB1IHl2JHt0fOBGz29SYxk+XwnqW2F5ba32Th8juyEsd87ewdSsMtkGtkdMseWcZnLbbfOG294Xl6h5J3b5dHGs6jftvcPBwxbe87DLwdTu89yx5ylkndl5bZPUHCz3eMO2w8vUdzxuEO8B3JbJewZx/tu2287yu5dsmI98SeLElydkbwMsJV8lmYZFncN7aC7SWWz2xfZ7vLNgvFu5wncdRJ1Bl/8s66nXtgxuWvbW5ybJpFkybJGwSwt+x0ntbsBAcMx5At5bHkWRw7w8vsMzyeTdzekfy+cE9QybecJB3Z1zscJ1d3y1m3LeMuuWDZ8hht/D7xvdnCz2Qo9z3DjkfhJw5TqOe5JFOGWT5HX5zgszjUvY0YQPJ0hO/kO+3i+w293YvG6i3u+8MdvHc+2QTDwF1CE/wASrDGfJ8nZMsvm3rLclumEiR7IF3HD2xPOs6tns9yzojYgZDrym33hY7my2O7Ly9nh8thjGJnuP5ZlnXCd8HvJ5Nl48tkWcOTiEsts+cEyZCzdPKym8t7h52ePt3Lww3keI7jlLzj2DL7xtqwt8tbu75YeM2yDJYdeClvZRP8AV2jDaHqFTuEuQ6z5IS/t8tBmGerYndmCYu7vL+oNiAWErs9knAFbybdzwL7YfJ3ZOobGLLJ0beM4PZmB1fLNgx46tvV8khxm1g2OuNvJ7snkicnSIds6ss2DIO45Jm3j3jZqrB/YDj2yS+fjOdyWO28js49YhmGPJ642zby9kizZ6g/hn8OwrZPViZt4Thcs1gvJZ7Lz2X+WP28be4kupw4Qd2dZPIR64DqatlieiH2SluXTZx3ZBPTGTbxlvANy3ufJOwuXru6urq4K6h/LR7PsMMZ9ssm9eB42EbCLrjLYJbbN4L0sjrjrhhiec52Mktb2Du8t4ORHKC7WmAT71xtvd7eW9/psZ7kie7w4B23IssyGeSbO58kS7ElnV4zscJ+Pn43GHSeXzjNYON3ndgtkf7YLeXyzg+o7bx2wt4u0CEtbYJB4f9sJ223h4y3L2Y8m6mDpNSFzuP2N2RfbzHC9bdeQZbjHd0tYGE9XbJnt07/AMGTHV3bk8eRYbx1Z3HnOwXk8Hc8ZbHc28EqWw7+jhQn+LFjg8vbO+Uie7O75H4eWDILLLSTu8h64yCeWYdnyXeSWvIYxM8E25w9XsPIs4bQIe5Vu3yVtWzLerTBbMLRjhCGQd7Z8hF6jWXOpE18/DbNsyyGLcu226WbBnCzekgmQxhk6vsO3WXkrkR3yDbMZxgsyJhS9l+cbHd0StfeDZ84Pb2+c4WW9cLy8BHVnczZ1CyacHAz3B1ycv8XbZ33ExxknHbZnC4W8n5yTknjo8fYer7bLwcI3t0RaOktL2Om2Dhnn3lYXd5Lct3gGHOz1DMUbe8szuZ6IYbE3LZxIBb3Ll6ci4dZFkM7vGdWWW2R/Uv8AInzj2CzueolkduyFu3kvjKBdJ1Dje8rwT+cHV9gnnO7I64+cDHnAMx1DOfr7xv43jcl74edeOoeHUGcZLkPD5+C9t/8AJfwceXvH3jOS3hskgyGxo3jesQcN9tPw3Zywt5wyzJcJ8h40vhLB9h2WOdwMt7643I25wu8J9tjy+XpJ2CzjIs75PkDbe3kTZYQ9z7wSWS5KsywPU7vcdeXpB1Y7MnUuonkMvbOCODzhTyCzqCPLOFj8OW9cPs29W8bzl0XpE+TpK2KewYcDZZxgyZ+c/Ht5+Ms5eGOHqX8Hn4Jhly9/CZel4xyk8svUacjt+F65ScCzdSk2SARHaJtZYX2XPZCQO12I0yJ1ZhLqXqyeof7OTfOAFvkc42LeceTglvAdwEuWzEdtkdhLZFM6mWZZ7I6t4yOPv4+8HHqDLY8m29mQQ7Mm2XyyHvjPxnObHUT1DONnJE9yRPdk6eQv3gZeM52W2LZ4eHgmN3l3Y5Dh4Y5WzhO+Dhn8PcEvD8t7ZFYAXTdXZe3/ACyHV1JsoMZDbQIMvOFtk6vvDxOZE6MPIdQWW/OD3hnDBJYMGeWWBEk3a1snUdNsZNJ1d+R32Wgdy1vHGdx1feNb2XCOkT15zWzjrh4VPJFihk2fg6eXr8BMcvAX2J4OTgePvDfI42WbHjy3jP8AwCSY8jgn3nflmcdyS9cKw/hnqcEOwNknXG/gsha8gx7uh1ZpCHTP+Xctzy7tyTZc6LHLOA6cuhPl3JsnVm3l7MO2vkLuRLfZciWGbbcu2C8tmG+T7bD3wOWseWhIrqDXuxkHGW/lNgyC84LcjV2zA6my6y6jjO5tvYj3hvbxt4G9iTjLIZs75LPx1F5xlnLHvHcnB+jh4223S8L5F5brbx94xjzhu5jpvkceydSbBkJl3wknUw8FrLLPbfLOobeFggkxVtHrbOpCCe7G7Egk4EnU7F6tOCzb1E98Lnt865MybGBerd5L5IwWfpzeQvLe+cjyXu8eMmfOHsEWcP7fwc5k3y75Jjuzr8HGWW8sisdT3HXC23y9LJ4OCyyfwzx8upcIdI5znvY7t5WLxxsWw8dHJ5y8ZnHkz3YGy8Pk2awYQZJtms9rITyyDqXLdlJsnUOo7SbPTwQ/L/tpbbDSHXA9z2Wgz24CL2L7ExxvGcmf9urzy14I940LdZ8jEjJdvZAvkW8PKd2cfOHjec/fyJiHTg4y23LWP/HLP08rK8L3wW/jY/2I5+crHs8GybFll94yOnhJ41I7lnu3j5OSl/t2JMs7mbHd4zuzYAImjODM0IXkpdLHJNJE9eQ3u7u4Hdl2zq6N7Lq1sa4LIMXYYZYxCXV1YNvcl1J/L/JiTWYR1MSwraiZ/JgJILJ/A8sbv/wyy3Ldtg2yzg5OS+8jwwd2cjbxuT2fjLy3v8eQ8jNsefhIP0X3hlyO5svOWfb/AJEndvDbaMOfnZNZ6SpDpP1Htj5D3bYxuydkw443ku52SN2yXcupe8sj11AxZ1DxkM92WhkIEEuSr5dp3A3lgyCQSIurO5Nktsky3jbJ6tPIF7bqLeNi+23S7EO/g5z8vsM8JsGcFv7LYm29i8vbch4fycvHfP3l4eO9s/Hlu/l6iWLchs3uPIks2TCJbpjq23g8tbIAmOV74zmdEvUd3Wx2vG9Iv9l1kHhyXYWifdvXUPVn23q9OfbMZtLLOrM4JO4ZNY6ltb3hIc9t2LOV4Jd4LZ1s/suR0jy8iGtoZaW5DPbA7Ak8lts/l58t/wDHzh8tj9LwF5+fePn4J/Oby25HkpbznGcDNvHdlqNvUdx1bw9z5ycCzeWTrhhy9bJnjtZvUGGW5abG7JZJkNhL3kmWEukuwvFgGwuza3uTtluwWbZ3Z3Bx7ZeWliwwd3VlmcFm2Yxt7PCaXkRRgJOBnGTSH9k/k7Bl8nuME9PDDbe8exJeT3+WWJjrgj9ZeXv4z8J3BHTPBwxJfL7xn6zh/DoQrOx+W0kcCKZE12LctePnD5G2/wBuiTYLMnn0gsjhXeMnqDu+8aF0dgODWb7MdEN7ZDOBF0clLDsuF2LOO0urLOos4SzqPZTrdrxAcbx8vlk33gl67v8AFq2QBB1BjefnInJI6iWEHXARi3WYiX85yl84Y9gvPwSc53ZHBNrvB3HXD+Dht/8AAvv4OFs7t7/H29sSTbOpE4xACSzrg4JvbMZ7ZTj7xkv5+FMgLwjFs8NgTk4ZhbLZpPVkC2wszgYy9xuz5aBb1KEIvXG28DZ9t2TSCTuDhLOrGyLcmPLLOFFuwkicyELpZk43I4D2emXqXfcvdtln4w8H/rtv574fwfjBs7/BPG8vUdn/AJH68Q7eodLb5weS9cbvUCwtyHf37Zw6ywX8pw8LHI97bkPVncnd55KBZju6W6zqR0ZZdJvc5BJkB7A9LtY/jdlgEhJgzwDu+8LvUHcvGbznG8fJju7st4ZR5HXB8s3hOMkzljbd4CY4DL1nJ/yORYTwT/4+wfnYm3k5zh/BPIcJE8HDyv5Px5PkdXvJewvscZtmQ7dfpnsjrq85eifOFyW8GDCYZtlvUaX+5dWS6vSTJcLeG93rOBtht4xlD1CnDlt8sSD7bZyT085eSRgS8ZZBJ1BlvDfLL5JZ3Z1JZZd7N7I3ccJjdcdcN7BZt6s6vCHZnjf08JDwWl8gmOM7nd4OSeGzgJ4yOPnHthP5eMs/eWWWXt4cGzYwzbel4QTtv4HeH3ne5ee1mE+XVl1Kzbdtwl14TbLxZnkng7LvU9LV6l7t4HRG+w7G7A9npKZm3u3Z49tC0bbJNhxl1eW3t5fOd643k8mHge7Ytnl3O7IvSCC8tveHrj5DwTP5P0coby2ILO/x3xt7+SbOC+8ZZnP38LH4fx947jjJibu+Wxi8JsacJxs63ZfJvb7Zjbbw7bdIaRsDvHdmydw57Ds6MbN4W6zP8Rs9RNucEy35fS6kh8syAy74OB/I8k2zqGHu6uud58uxD1O8kex7JxlmSdx7ZEmke8YSXyXd95eHg7u9gzklLeCYn9AbYTHfGz7fLcvvHtncfkn22+28d8McPdmEflvlnC4W7ZZ+Nnhs8fLPsc+Ww7feGWk3YzHc+z15C3zhNI6MgskdvkSTBdfb/kZYyPqHrhlHae+PHqHfbyYaJb32SvluPfGI8ZHv5GWNfx8s28sswj8EttssS427HTwn8h6n2SNsSI5PLLyIzOfv4Y5edjhk4POPsxJdx+2GeOot49422ye7yYODjXeXyyWN/RHfHv8A49bx7ZPnOzq2Nk6cFttrbwlk5YhLvUGENjkHV9gku1gep0k+32V+R243+rGYQdQ66jf5LqCsfvrje72VHI5PItOTlI6njb3hO4DLLOuASfh6bYvt8lvYu9twtHhmW2WHYn8DHHyy+RZMT5a2f+HkyWRyTyPDPG8ZxvfHd3+U5+xJ1BJY7NnKQ8+HBMvBN3w+R1e8Fl5NrFvyTu2AWXvIn22SR5OG7E7Ow33boi+MKtkmQCWu8DD3Lx9j27gsk720th3jbOQ5xbO5h4Orb3g75ydj/eGfeQ74e7xZkt6QZNu3vGaz/Icf/LODl94LL7wcHC8fOM6jgh7n3kttn8M7t85yfxscfeB4XueG9XyJ42L3nvZ94C7nY69tLSO5JvnKMHUF9sLA5YYT5JrDJ6nuIuMusdHljhimfLr7vnGT027x9g4eod4zgOG+Q293zg21495+wfeDdtvl5DJwGSuzwcj3k7Nln8tjyzOG7L1vsP8A4HbZN1/49/kYkiJ/RJZwW3c3V7ZjwxfeHeM4+x5y+2l7PRJsGc4X/Ilttss/CtjZxvHWd3/IuzJcjUn2ZZh2vk9XtuLO4fEGS5L1eu7ryyWWzDWIcDfbMjuS2948YO7zgvF3k+ZAjbd28HUsPK3yUPUrImLYe7RkJs4Ulvuw6T7ahy6sznLNszhcb05zj7wHDMfk53liIkvG7/GcF5Ezby+zLkD6xwcPGZy3eRxlhx77P+cZNkZxsfrqW3nLcnVgjOwd7OJYXlogrDOFs8eknd3sdM5k+2bGLO7GDYkUdlDDLLerdJ/yXgbYrPUNuysep8t+T22YyR5wW9QTPnJ5w/xdkt4CepODqXqOPsxDkH3ht1k7b1Kw9W3iPLNYcc/GzwNt7wbs+cE8/OTjODhOPv4eWHZ4OM4yYmSOM43nd4PZ/G/juzjy3q2HbZ4eQ6s2erYZ9myzrgO9hsRdI4ewdx1M2Y3y74By3udCSkOpI5KkkcsEblxthJBIBLhLS0tfIc6brj5fbIPxnAzx84LJM1ewYy7KkusOyy9ysW8vTx8nuTJbLGGbLch2zvjO9nt+Nm+fje5t5XL1xv7223jediJIumZ27s0gvLbLOXeXgiIm3eE643IZthtk6t6tiPefbONnqTbMLC9uuU4DuydQSWZbLkdzC8R1eNLMNtbUdsEnUfUmvVmew77JCqE+z3eXQlcuiIquWjqx2z7C3L5eXttv4zj5zkcHSXyM2yYvJvV4vLrZO4clh6h262/7ePVgsIdkMm2cbA32POfvDHOZPPsx3xnBOfnLILtJ1eXtl5xl5wzhhhdnuyySxkbLLHeW3gmJ4+z5Hc+ycrd2fjLO5LM4O7O7N4Zl8tZOr5aBdnldWqWpFYcLFu8E2VOr2a+wDqBnUkY2Llo2MvMdoCYCyzq9bGxB3ZBl1Hss6jy8kEC2LYsg7s/Kb1ErdT02uwy29SxPUmkGwcf7Lrb3dndp1eT0Q7feMG8I7mG+/tlvZLJIMlzlcI7I0eX22Ly+S5ex7bMQzMln5222eFteN5InhLeM6g4LO7HjIONyLZOdjrj5xutvV8iy0gCEHUo1jThiEvXUdyd9Wd9yl1FboS9w9SPZf6swhbI48t28l6jsgy2T5GTu7+XRumf8u2w2RaDphHsB43jbYeWerdsk2emLereCXuGOmyXJ7vLN7jzgPc9l0nyPOCQOPP8AxeyHjbeHgjpGhHnfPrZHTL1b1DvGf+Lyv63ufxl9iZ4YM4Nn2Syd4e+Ns0iSOHjp51Pbq3gnq2Z6RDYc6418tbe+PcfV6umDGfY6ZNjPOA2PO5/zgtvbuYST+WocMkLDeuM7kj1FHfJNvJyw3Qyz9ptjGOFAuzwxdeo6947WZZsOXvJ5HmSZBt0b2yXCHYktzqYZY5J4LMbHkmPeG+fg4ZjjeOnn5Hts9nDyx+M38F8hvvKc+2R7z4W9csH5HhgY8tnuzC6lyNTE9tiz+Su2RmX+JtjUdManNnDsPcGtmXrqPbHZNu97/C5HktbO7LMtX/XDDnGzAMj4j+4d5bNtkSkRmkn8lxnu3XgHyQujlcIZDLDjdZFkTuxpa7D3LJNkw5JkvVuN6R+Pt5+PIgn2A4eA/Dw8Md8FvD5bb3DNnXG2dfkeOuHyI6nt6g49np4OnnJzgOcgy6Le+Fg4F8ssnq9LsYx9sA6m3C3qBgk3j/FnUmyEsI7bsbpmAn26zIxPtucHv8OW9R07DvKbdGCyzjLLLyTeBAzg47bUR6jsgdtz27WYQW42Jj5YZ3OQ9W7MIMtxntvUncbeXy129jq3bTgBeXtkhD8hmz8MPCRElk3t5xtsOz1bt9ifefP0W8PKfndvl5LBl6Xkd8D3Pd5xnKW2harZwtm2d3yDWOpki2Gck74B1wm2WZDN6h2yZd6npfZEwOzDLO7CyWNg94OU5bzu9vIY1YEcDd2x7LzmRNvASMbK5afbeNd4HckYZLHq1veCLcg2ERZeT3eSb3CjdrNIP7D+R1dWk+2N42w9fl9jq+fj2erNg4Ys28l5LODyY404y85LJh/ZZd7MHV5wHckkbw4cN7Zlu3e8ZHHbZnG3smWQcPBJHBZC83b3D3D/AGzqzJer7Gjx28kyfbRsAgWRN3q+RM7LhDpbkdt5B3BSSshs6tfxvHyJk21IdvbOBt2+3sOuR0z2yY8JsuWmYSJO9hkggQh6t7t2XL51Z3Z3HTZakP8AZ86iXLTHdkdfg5LeSfw8barx7ffwXskFnf42HjZ7sy6423heCJ9hy9s2zON4wJvk8MGX2YnqNMfpLOoJOHjZf7PfqdXkE9nvotjez1ekx7w2BKXraJgP7PkvcJK98G8pBhOxJYwuSXjhuosyO/wowz5D3+GOD2+2aXZPc9OD7szyHfbyAuhOL2SFzIvkdXsdPGkdvGSRu2bPsZlnA7BhwWT1e8ZyWaTe8Mc7w+zfP/IjhbZ7LO+D2wkgm3I7bMjuLZLLJ5LIMjlR5dywj8+Xslk8EvC3yKs9QMcF2YmDnUF9sRdOrNO5FkwhsQEsyURpvXVtvDDt9ksyyW9J9T2RyNvCGP8AYQllnSFHu+Q7b3bkavY9mPIIy2EZy3u3ZsvUlkst0hxttIdbeBZvljI2shtthIsi+QYTHxFvy8l1sj8j1PdmfjL5HDwecn6yzlO+B5+8b1feMiXqHvnbbZYJgnhLLZNjrgWLzkk53ue7MmzYdR9MFnCmwbJvCGwF04zqzq6MndkwWPkrs9zF2IdTw32TvhIMhnhvUMO2zk5PcRYez6sCA2liBKvkDw6yXbILe75Ht0ydyZeT2x0T7Y4+cDSWMS3vLZOurfkRnCOy5drOpAY4b7wM/j5HCXy38ZPA8kkWRlnBvJ3fYOGCZct4CyYONmHjYXeNsvsy4XsDYrZkbvHt5ysuW7LlvUO8eW7yFmfhksjo5G2QWT7J3q1yRZMYbJ5fI4SCer1mODHU2tlyO7LrLe5cYdmwsfIgIFn8j3gsm2yzInqzSTZMJO75PUuo7S8SZtuWD3fYZO5QO4BNL5M4w427LGOzhIfznJbbdSfz/wAX38McJz5GScbrwTDtv42fOBy2zh8s48li96ks64Iccbxl7h42cEansgy45fIL2S/yy2J5dvJdvLdLNbEh2zhXYbrZ0YNLv5+QTb+Ny2+8bb3ZpJl2jEnUAZdtsZdR7J1fI4PIhi72J7nM/D5HcdS/zgQ9SbHRHsqF1mwRJsddSWTYSAGSY8Z3JEX2065A3/wJOe+Mj8E98eH53kmeiHq3q7jvhNsyw4zgJ4Xg7vJZvnPsGMd8rl67OrZF1x5kI63STe7erOF6jlZMHKbZPbeWg3awZbs7e25HsmtmWt6/Gyxzsgt2J4BbbrBLL1lhm29c/II1j8bwOWw2heyWZEx5EecJsGcOWF6ZZnV85PspGSREvds3cSiRi2H8H5J8snncZe4njIOTn2OfJ75feBnzl4+XdpuflcZjL7PHTZxnBdcPUO86y9WXZeIL/LIZYLLJ6Z7snq1jhNIez2sJ35Gp3HU9z2kLxmCSONiTjYsul42LSH2OyN2CYnd0QbHUwR0wz+NOGOH3gs5ZwZkkdW3S3bNLWwiCwWyDhveBnsux4XuXu3j7bewdW8k8seR2T1x85Lcbdnpth522Tn5x7bxvIPGcPl5ynexMxpZt3Hs+22dRozbHZwS9x2SberznIdSoy05fbrL/AJbwlkTdcPG26x5dbDfby3ht/t0vbbbIe84xsvLbO5e7JY9tjOBLhfO7pkXTq3jJjybYeCHg5G7bNJs422+zHAu2mZ94fbZsg5+RZJ3dXkB7ZYjw9N84HhYkiGSbfwsrveLfzvVsSTZJHnAdR1bMvdtsz5ZtlvPy3CHfye75Za3sdTnLCYe54YdXcN6WN4Q8bbez1dsf1MrZbHbJZwJJ3yTYN0u8jchvv5bLO7ye548dnbkM7vbJJ0yWvkdT+juzIstvvBw7sPHyB2yF+25aZaZwWIOurcZZbN8jg4O5LDJjzhvkdyvnPznLODkxMmt0kgzgmL7fJtyXqEss7sgyHhl7myy6F24fLIOXyOPSP5wkbLEXu2e4/g/HiXHJ96h1tttlnUSh7AlvG9y2bZMrLkN4Nl747ht7iRJw3yx3ne57tfI3OCJ3Pku9QN7noltvHlnd5b3wR7MuQ7x3wTyxxmyfy7LPtvVnUGyGS5ahS7JyDKHGO+d75J7LbNb5xsvduNosx2cn42e56mHjJ2HS8vnD3yTZf5eROQzbwy5dvC5e8eS2u28HHe3bJhB3MPV5Z9g2OB84tsd8Hk8fLTgH5xkcbjaI6QZD1xlk9S7Bseox5Te58hZcs2DJlt43LSMZj3j23DgWe7y8ku8gyYM92MuRJ3wJDJBnGxwl8t5+28eyZeskJODmR3AW/wAltJtTxnfJEmW3bfLL7Pt2bJBx7JfJct42e7zhjgts/GRwcll1Nl84yerZ7jyDueR4DuzhkwRk1svvA5a29S9Xt4ePby3jLDgM8jsiJW+ysX/IWV220vbJ0y6PeLL3a5b1DtndlhJbdsEnUEZdfh8sjU4d29JhwnuY6Lu2UMZIWR5+Cyb5x94eBi21Yb2dGHZLNswu2N2RYE9Mie+Mj2fbef5Q5x3LbDtsOXsM98P4Czuz8ecHcmRffx5bvBs2cGMkzJYMx7ac7xsTbwv5a5wvVnLxncONs/8AgvBx95eB7ny23kwV27H+3RyPe7qeBjFsdksHcnGbHV7OkPVsdzZDl0w27IzI95yZWzbMt4z8bBZZZMW8ekeR17dcGEsdl48D2d4rjwrtpY6sHjYtmHeHy94d4bctvkP5zk4d/JeXt5Dy+XsHC8PBw2z5L+8Lkd3l62cBx7dW7y+Q6/nM4Du2w6RaEJkuxH4DhONnj1JZw/HG/LP7dd3ZsOt8u45D13Dds/jd5Qb1E3s9Wyw4XV9jgZY7n2HS+wcnswRE7tvDz5bZsE+2El5Zs+WYWQJKSmO5l7jFokeQcPVvHnB3ZJtnc2mR/wCBxtlll1dcZlutnG3zjvjL5BwW2z3ZYbZOmzrhZC7PkMcdXXPskcbPHzubZd2E5PkH4ZhJZYnLbbee949vWzskmkYOROxq7sJ6IizbLO+E76jznIk64fI/2Q+TbtJkPdiJ6i9jRntlHGWXnAksmTgmy8IZm+TsPXdu29ZeNtlqNvUbd2QbeoThnuOnhLGNI37MF0h4P/Dfzl48tvXJ5Zz84CzjZYchG6njLIbC2SwLOcvvGcYW8LnB7sySFhSF3jPwuR37GT+Cb5HC4bDsGW98acIW4SMj6IOp3Z1vOWCW22DuTl7npvS+QWC/5Hnc58kzub9m+W9W8BPTd2x5YNmRvDw92WQcLbLbD8kyXiLIwnGfJbPVvXBG7bDvCWd/jPt6T1HksBwGJ53vknjLOGLuXnLJLcvY5XqOHy9ILuHg6nudgybOHn7w8dQd3/LN9gw/GQbBzvBN7ZkvfBwmWb+HzIMiY8hdr3CZ3OvIMIZPt3bd3vHhM5BBjLE8PvG9R3Z1dL5ZZpPR1J+8ZZeW9Wjg43I7/CWxZt2EqN7+RvPH5Jw+QuQWrZiWHuFGHu23j7b1LKQbwtk6h3wT5wsLt3yc7bZN8t4b1A87PG3cHVnHnJJJecbMuQ8F1JZy2cnUvUdnGcJpBkcPGW3pJjMvfBxjeW8HbMPH22a9ECT/ALfYDJ6tLZIHnMn2MnIjuy2b5ex5D3dEO8PSfI8nIZ3IWZZds0tF7f8ALeB6hiep8vbyO/LuSySzuTuyLOuB5wkmERYMhOrJg76sYe5xCPBwm8eJkxiPeDhl3l4cbwZ+O7J4SBG223htye7c/D3x7y+zZBN7Yx+m8Id4fI3jbOCei7by3bZbeoeGTZOO4ZZdmzeXInqXDZbe2MhxkMNsAyzjXj2ZvOBiXePnGXzgRMvJ43qG9npPaN9RJLh4buzSBIZ8t3qzLIZw+WWX2Seos6nq1Ii27dp6ctDLqHbpZpYhancDbtDCHJcJbfJ1BnCbf5feD2Z2O2WOPYMvkfhNjqW9J6vbOM2c49eGTSyG3jeHuy3rg4wyWPeMvLuf3vK6R0W7eQ328XYjq94eFjqe+HjZ4T+WbYyzLJ1xNUdmvDbBN5DwTbLL5xpDN95P7DrLINLGzjbaTI+AzjY85L0j2SCzbxt4+WcLbBvtk4vbNI0Z9s/ludSdyXvBuxsjkMLO9474dOQ8bbbt07hVn23k+RkkTBZxl5De3yeDhtg+8evATzlndn5G+8B3LelnVl3dxMl4y5Dbb+/vBdxJ68u9hsksyz9rhdwyCeyXuGRIJSWnCLAFpaQP2zvbWPxrYM5buH+y3y8d2WW2WcPdt2RpA8eLCdt6i3rk+XltmtnC5bLxluXYny/1bZskiSLZ1OjfYYBsJ76gyVnUDtvWSTkdIZ9tjyeyT+Sp8lwsI84Opb5wX2WLC2ePt7MdxKHBby3SHePZ6vbLONyWG2W8vYyXLtIeu5bpnHGWNjHtmlkEHd5bNrkWcrJz942brlWyH5Mr5a7R66izHl9gdsRu28ZBZ3N7NsEypKYW9Qsd8jtnfAdcBAjrnI94Oott3jcI74TWTLOrLck2zIsJyGXh43wEGTvyDJ0uib/berNkwhgkjjrOD3BDl2jzgO+Fi+zGsdW/kZLyGXW23jyFnuyL2DJLHjeW8vZvkQPAy68bDKrdlttu8PBanL5DjP4Z8ss42SQ7bY7YcfZ5e7rCSV264W95WWjzmMwcZJJBPUXkMo4zjOp9yLOX2LDONwmDbwTDbb1Lbwmwoy9Whh043u2PJJ7WZwSSdSdx2xmEGTZnC93y2zbEYIcZ9XiPLJL5wzEEkFuT5bDx84CYRvkSbH8vOPY64LeNkb/sTecLE22d32SeC3kQpdrcLZSbu2Hv97lsyT7GEpnDswNnc7lrkCkGewN3hOrxd2OceRzHd85SOvxlnc9z5fOF3qDd2vBINiN8tvb7BwS4ckuQ9QbPUk7+D2Gy4R2wARL3MKEO2Q4OrYdLNkx2XY3bYume3HJMulv2WIaQy23Tq7uomXu8W5LsW98jwMw8PTb1di/yzg/A8bJbPbZHOQ8vC8bfJWPO7e8mXu6tvlg/nslpPLPc9Ttiwc4WGxeQ8Emw45EZmBsnFs4XXGDCLcZw22QW9xPUvCRd7Z3ZxlnDbeyWchF44w49v8jqO+Rkgh2HuXueywbG7sJbb5Hkmz2vJeupNuSjBYAyFsHfK5PlvcPyzHu+ysrkmWTHfHyTuDCW+TwJknBHGfYeO9jol1jY4GG2LZL5y3tnc8vD1Cx3N1xmWxfZ8n1bb8vONjhepd8PvP2b2zOEj2bbTgyXLbCe2DCXC+bba5ba3jIPbOob7FOy6O4YbXY4euR4W0hlht7lLqOp7OuNt3jueDjL7HsTPaO0iwgkgSN26XtkluWx5KkMm2YWZel0ZMTERwNL0kxv9l2CQZ84ZjCJZaREqENt7JPRDpwncEPeSXXHt8nq9ONvvHXOyyLfI7/S92/h0vePke32bq8kVidjeFib1wxsl5w85Z3ZJpDJgxmJ7sW9Jux7OuO14y2zbpPkO2bfJMv6hLLZbFeMn2VvYIIdvlk9RKxPt6gJ9iffw4tLODhZrzkF9s7g7kGzOMS0YAn2WHS3JupSbAFti13q+LDws+zq3i6MpHbuMI0248J3Gx1btk3rhgtyHneuB4294+32bPwx7fJ8h+Hj2zubZX5ap3DfbOWxli8jU4jX4GHfwln42S+zMT1brO/I8h4AUyzF0nBOrozHeCByUuXa6FrxazvkZly9u4u4by3jLoxEQmOuAk7C3cD9sQgMYWbwc/Zj3hcjuzJRJs3/AG/5DZJO4Jgvc9Q9Wa7GOO9bwE2wkI9tt6nRGZDOTh86lc48IdeMZNjz8MHHewJb+fLb3n5bltsy9TBVvPwS/kFltu8feE2JgjIPsYcjJw3j3lnqeemy/psQFyQCO40n2wYMtMtxiCEljDs83i6NLxf9jNj2eS0vLvYM4y23q8jucJthtvbEnuOuGyDq7LHDwT7JpHVu8bFuy5ar1bHJWSP6tI8tbpdpdXZf1MpiOtnVnUM+xdwSYwxuoTu2PLxx6WZwdzG2bJPkGG3nbZk74Zct2+T51G5yuXtuT2dR1LO7E22Wd2Zy9w6k58/Gy4Wb+pny3vLMt/BHAuxyybz94V/1aKuodW4cOk2HSf4QP2Djoz2bfK8Sxxk+SyXYwYgZLMWWWcJYRyuvORZk9wcht5KSeM2y+fn2yBnCFU9ENds2RIs21G+TjDDqPbElclME9ssZO75HdhIsyGJdu10u19heBd8vL3gb2yeie4fk9eRq2cbxlvGcdMdPHUM+8PbeXsMn3hLyHbdkzj5wxEvL3+AnuBZwFmXtln4222O0PGXk9wJLw9sP5GJvsJPZObdC/wAQ728jvhDZhkMZ7uk6yySwvl7I3SNyDhQbpnjIeuAT7zsW8JHVm3S9hHB3LxvJozbeZE93S2XbHbeB824w6SG7e2ZblhiNntMMWXbh1OcGsKOT5fZvLYtjq3YsvC7WRtkHG8ZOwQdzx9h9hiYlht2PYdQ6ZAl7Z1BBxhZwds9Xzh48liWPw+8PduXyXLuTZi3rg9h7t4Yd4bZyQYG9QwgHrx1YTYvJNuiV4NjhtZb8gkhk2R5FtpYYSTFnduW3U8jwWcEHD5KjDpPUmkdcfeN58WkYLrJcheU7syeyCkwMju6Eh8lHGWcknOIs72XhNvNgyLOGRLxnJxkkM8DJwz5D8sy9hdsLIO5L0jHD7wcfbq1WyOp7Y3hvl8nzqT5xsuPD5EucE4lMh0ly3bdvPwPHt0Z4GZJsGT/lmLttLswMgExJbnBMdPDy0WB5b3Fv5ELUbbCOE42+R3ZbfbuHuJI8t26h4czlhdy+wpFmyZajyWwpDvD7Bs9TfeMy3JdbBEwScWI3R3bbb1+SbtYJ7WTa2wzD3dxN5Hd5brMLbbtnHyJ284+30I7g4erer1l2sdW5Dv5e4ujjII64Zt3lsnTecupUh0gtoLeTeF0tG+2x3PTx5ww6i2YV6tbJtPsAtkF94VkZI6ttvSST5bruCx5Dq/pb3bpHBvKbZwHHsdW2fYZ75C8iezj5Lym+Rp7b1bd29XTQ65zY6OFPfcM+QWNyD+wZD1PZdWF8i+R7J2BydG6QG3hYmzYJjucFnCRfIJ6usk/lqQ23yPZNJi64emJywuyKR3gwizeHM4XqLzhO+H8JJ1ZnO8uXyBHgbBhyDC3hNgy6uhth23jOGzuwk0sdgu1vFoZhvvDw+WdX2y3J2JC92RgLO5+id2FPY942LJlh74272yy8Is6t4OreC+8b+N2OGQGR72+W7xnGScNWwd295JDnttrd7bdrIMupNjywT28aI0Sux24aPGT3eMuNltIS2eOpssnyPYhyw2OuB7jeN4WyzL5EoTb+G2OHjLw4+cBrPVu/hOrJcnJyP2Rwk9kInSZj2bE+wc63hiyTOBt7t759njNssvONl6t2DJNIGzLeGOpeuTuY4XcT7xtvG3/I2XdiHeDu+X228R5HRBvBOM1sy+z3ZdGXu+T7HfLZxutk1kvJ7jtdZOkPVvyCQY6L3nLI3Zb2zHjY4GJvL3jZN7vYMY6h2yeNu9m1bM9t2LuPLb5GSlvAW2q85sGHB3yXG8D7ZY2Wy93y9II4ODjJZep9mNN4hl6xDM7Y8ZbNlnU9RyTbFkcEzoS2212+SxZPCrd3WRLkMvXDe8sDB/Z6hurZR5PlqTN7vZOp8g6g6gk64OpfwZt9j2ZIci+2yFnV5erdt6hgfYXOfLfzk9TfLTyDOBIlt2Ge7tInlodvmy9QZxvdluW928J1BfbZ2+RZHs22y3ohh3ByvHluz1BFkcbL1fIvvD51YsGEW/hk72er1h2GYy8Yng5HvjJLZ7/BNn5GeDrgyXk2ySyberbdglwls64Jgvk3cdN5vUXV94zY664zuXI7gwl2Dkj2WPZHYHhyyJctL7JkQkXi1l1C7Hdk8PBbEkuQ2d7LfLqGRgeDgWtrb1DYTpd5x3PT+EY4CeQsxng7jDt7eEIzZxg5+N4W9jiNTW2GGfOBbtZx8tm8OBkO4sh7ybveFyejg8nyWeyE8meT38bNt7LkPUd8sec+3k3ZbbHt2mYeEtu/zLvg/CRZOWWv4OPL2Tu1th74ZJ8jpnF285LZcHt5Db3Pcx5ZLkO8Zf8Abq0lIdLI9iW12dbH8Dx28ZJsWWE9n4O56eCO5O5Oo65YJ506lCdeRuRwIflljcbQIOMydvsRxtsJ2RyGHC9x7bZ9lttmXSzuRk+Sa242d8HfIcbPfG8+LodwXyW87+FtmzgnqfbtjohdtvLbdbYIaQybynC9XfGa8LZZPGxxk9Qj2y847Wd2tyDLfkfd4WiyFnCx5wsdnDmWRNi3iFMxPLeoZ7D3ezz9kvI4DhZDxuzsMm8l1vBNlnHpbnASfh7YBbwwbdTs59nUCRJZL3ksJ6XyOHhs4Th9m+yxwRJD1bZPUMc98Hl5bZ+EEsW846kjlOPYIjriHUdWl1FkPeXXPyT1fI949slLY43q+xbNnHkN6QhzjMttYZLBscjYbwbsOycb1wOX+22xE+fnJY9hkm8jL5ye8MmvOO8dQ/l8jyWbb1vON4beejjIMs7szj5ZE3l7G2F/Ja+w8acZZzuw8LztsNuXvGFnU8PVvVvO8nkTN3PXBGTnDu/jMkvOPEfFvV2sn+WIQF6yTfJZhnOB4O5DZtOWDrh8vl1OcHZJpMMvXJ7xncGSkN84eLOoTKx+jonEdLby2WXYjh8jbf7xvHXBw+Qxbx952WYhPs3ls3vLYpYevJ+GHvg1bcme+ALhIwPsJycJEl0bsdju29lyGeyIktzkXh2NTuLveS3gtyXu2J7hxlu029cfbZYdvZeM6nT1Drn7Pd3zuR3JcsgmHLO7pZzh4De/nIb5DYc64ePt/wBv8Wns5s/5DwTIeoYxLTZct2F4FGe+ElS7HAssx4CyG2cbrL2eO44GMu9lh5HuybJP5D1y8EucdScN/iHq3eA7ks7k4Jdg6sye7sJZOvw3l7t4h1Bn5HqITZly272C7nYm3G3YOD2XLbZ6s62Op8jv29WZ+MbOPkP53qHeQvCLZe7Wx7XtsvGRkDfxJ1fY3jeNj2YePnGd7x1Djfdt2fICfd0Orud2TenAx7Pt4tDDpbe2QT1brZhZt0m2C6t4J3Z0h4wljtvJc42zbOcifLWBZ6vlvD7bIt3kHO2HG427wvKcZET1dTx5FsZe8Dw9xxus2yWtt1fL2zPw9kS9Wa3jbPnD3LDPbHmcbfbWNfheftjsFmPDu3yLONyHeHyDSJj2yzjM4SnV0tsjjI8vt7w2MX2ec2TODhNYO+56Ord7QT7EwvUdyLMOoG3q2J95CeTsH49iS9sLLEjhgj3hZ7Xyc+R5GnJg2zJt/bmW6SNkqNuydx5Evds23zgsRnuzjeUsXzg4SCyem+X29g14CRx7fYm7tnuyyMjnxHliOwrCfYxui+z13aW93dnf4bW7gmfIiye4LbNsyDvje7Y7gvFpwkTZZfI8turb3hYZt5zeE64fb+odJG7HlmsWcA45w6WEYeBk+wu3y1iy22GbctjdvHnbLbePt7wl1ZZAF7GX2zjJg6gnhNgyW2XqLYW8k2+Rdo8hjqfLcIXjJcl64bkOvA5ezu8LjbrLhZtgg7ly629ScLbb3P8AYY9s2eiIgeM28tLkIYs4PJ71HJe4epW943v8bZtlll4S1ssON4Y9mGPLtJkR22SXdvVvdt1fJNtHB5HvD7Dbb1x3ZNnViXaUMpwSJ12S+T5B+QbMSOiHer7wZMt3ExwuW2t7xkX26W9fj2zlLzgt42beVCFb/vPTaLqd27Z6mCbvYIzlXb05V8jzg6h2ePZJL5MJJd2rBkdNtkxJ3tu3RPA43V4wzwmtmX28YL7PVoxZtmWcM+R+NwjZjq9gDlbO+M2em/7PvV4n2ePV8glCWy+cbb3byPcdkLIJOBts4TSBGWDhvUPyerZ7jqWXiB94Hjb7NtsNnOWZDwN7JwnC5wNtvDweT7Dxs3k/Ed9bwvZ6vSOp07dBkXW2LNks46tMs2zDuGNu5LY9t4HvkmzbJu7vZdIt3jct2SXG+Q5MEmM8ZETPRb1fJ7jpavki+wBdQw8bwPO5EnVtv43qN5Yk3h5Dkv5LMnHnGydwScjJAT1yW987Nms9Q33j7Dd8C7PcYvkmF9vC229LNszg8Ftt3wPHyR+Wp7ew2DqJuobS0LdkYk4WRYJeN7k0u7yWe4YHZG/iHYugvYICQsE9F2tMLqG28hbFs8MzPs+Q8Y2D2/xwe3hLeFs4ILy7WzqP9sJEauiPZi23CNtYZ8jhIIk74LbZWGW74OrbeCJt7jGX8iW13lZu7Uu0PH29JskjWMk56Z6k+w/2LTgKscPGsHbyUy3GHnYk2DL0g4yzhvkbby9Xv6WO7ctkDbbx5Md8Lls2rIsHV3DPdmXlmz1D3fY8j/eFEywLNLLIiRgw/BmyH4eHturLqD7PI5DrPtl5Hlt9mbNQZZLLFnXBNtpEZLkO8BPUm2XnB7PkGTksGu8feDjMksulvDHt84JDnAi+8FttsuR3yF1LPkO3yFJ26gCCWQGwGQOxjPcl5D7Dsncc+HA8v5bzhbMj2e+Mk6j8JncPDJbwsd8LbbZJZwvfOw/yduiZ3vAw7wuR3MvUIh02WnHzl7u04g4fI7R0z5Y2MCXvj7ytrkD9lhvEYu0Y+SIwvkxbBJFlm2Zwt7yO3eQZd2uS2y0mzWIO7olLNkvJbdmCP19nyINs74O5Mb0tA6hmDgksLyd9GSHJbuWBjp1FyB4zbLxvXq0hJY1x9hly9k4+Xkt7HnKXZCwz5HP2ey7Hl4xPc6cCN0Qmy3y226lTyVYS9sdW2I33hLyOiHuSCzq96n2s6hCG3l6/BPdiMey2jwMHds0jot4zS13LbJQJVh78vessLUJlSCzGG+WHHy7yFtlE/jY7LO5ECv8ALdjbbZeB6nh0wZLx84127yOiHZHYI/BPB1wyJ4+Wt7kJBvkS9y3y6O3tjvUb9vbL5HqWN02ozB1bbbbvKk9LV4OHq3Zs4yx/CQR6lyx9cb1ZYCzh942y+cD/AG23l7bLbd7ArZdXnGcPd5auW92wz5DLbym2ZPbJBpecYFvHcup95GkeQbGbwQcDqHqyAldvLbbbqSL5y8B3dRwtnfLbwdS/hY8t4Yny+R/sdcbelsTMO2k98fbJl4DvuceWhtXhZdrXYM7t04Lx2IxZJBt5b3LKhJbtuE92aSZxt7wcbZG8J+N64emHS38MbfOPk93nI8ZdCHtpYZbrLP5yd8B6s7slvnGh0gd7l42Tbc48h6iZU/xbsYbpibJcvYCT1DbbYQATm3V0Qz3LDa3YQ/2VeDj7y7wtvc233h7vLe+NydMc7f7Gos1vI58vbol2yDqy3OuNvS7byPIb5yGTqHZLOo4w78jyTSDGMyfOHkqbkdw25I2PIWt7mWe29dSSCS5DPbdLYumeoZNjq2b3jJPw8cfZ49bOPIR6kfkb94G+2Zw0OrIay6hy7F4t5LbErt1ktvUto7eQ32edifYvvJCdPJNd4GSk3zgcZN7vtttvd7Zl9n2fI4TqGO5IvI3cPc9x7PluSw7wF8g73z7JbPSGvOwv2+XqGXGey1OD7z1t5HG33hlZPaYb5x3M7lmF4n2wV08i+T0y29RhLtnB1LwnbuwE4WkuupdeCa9QQhb7OQh/yHYeodsjqfbOfkWcLPl4G3fLzjyDu229kh7lLY5UCddW2ux2x1GBC3qGXc4s9eT5dn2Ah6IMIGySG2PJRbtt7x6X+WXlsuwWcDYIZLewZ3D3wdvJb8s4HObPt8sjl9vbM5SDqXI4TuyGW9zHV7PnFOCSOnj5wG2XkPckHK7h4ZB3LlvfKy+W5d5GLYQs7s2zCO+CZ8iBsxjcu2YwSDu9ZBZJwmSKxnlhHV4y4XuO5ct4LeEh21NLtxs28ZNg5XLtz6vE4hVdNgNvGGoxP8stzqeMzhFio3pELcFl8t5PJ6eP/8QAHxABAQEBAQEBAQEBAQEAAAAAAQARIRAxQSBRYXEw/9oACAFHAAE/EMOEitksxs/Z7GyckssxBJfeSayDtkvcYN2f3bgSG3svJae5AYcyDJY8zwY+fw/iT9l/yfnbtsg7OkfNnt8jw7L3CGcI1+TDiyXGew5HG+IOebJbnI6wBkGSb5fbZBLLPCc2zSLe5bD4k2TD/IZ23W2bIPCVG2W2PtkwEnmFnu5bsXy3t++Dhfs+u2Adh/yXIRl/yy+xazznvRBn2Q9gkx8Xb42Y7fYOyX5AbCJ7ZBZB/suEXn2HeWYw43Mjlu+EF8tNhsMFoy1Ugy0+WHt97fUBPy49+kkMYv3zXfH7fsNk278gx1gC4Nbq/wCQFnu88/fVAj7sn6XeNhiWU/LIst2EG3Sx8kEgjVnbIJ5PmWSRsw+ZJ2Pnid2exfl2Hj9jx9WI++fs8jxjs+fsMsdnxPEnLIOzEyJth2ZfCXJ7BhZpZB3xmWTAfyNuHLgupxDsn7LK/LUlpbbL4xJDf9SaWAX1CCTGYl7dMPBa2zt8QpP1KGL7ZkMFpuSJH2/88/fFdgfU54T7s9gy4JFbh2OPNnwPG7ss/Ig5GG/Jt7fl+2N8mPl9bCwYA8CJ/lXZX2/b5LF+WeBBLfU9Je3TEMwzKsHJMtY3b7B4m2WbB2yeS8hjslsviSHS+R1PYMg2QifMnl1sSJhPWPnn7Pj4/ZO2eOPsZkjkZ+2DPUMvrfPU2DC4u2mbdXWfHyUSwyZJ2WMvgeSweBPZTqDlnLNtYFewJ2P7NrGAyv5fHZ+xt9iXkbdsvj6HZA7bAy7DN++7Pq9s0ifJMZ+cn7P+z/AhY24SbfLI+RFlmePjbE+L2+LbZj7Mdn7HyFnbLLGCfkeMS+b2z+BjslkHfX7Bs8kGwL7ZnmO+ZfL6eDvpZJy/YtmHlpCPr6sQWDBnjftwvsEwEeOLNss5HVgE9bnmgQ/pG+S9h7cY544+ZJZcy+uNv5B2BHJd+ST7KnbHh8tyHZhj7L5sxJtmeLyRWMAMv3+ksy3bJsx23kPj0tyRCXG/PG3tvJ+RwnPT5H2Tnny2Pkx9j56kuW+9g0sxk7E3JNvk9s5LkPbZ+X54MEr5lmkGXy3zJINkyOePPAsBCNtk2bE+bNuRPyTw++JL6/PRl7Ddss5N+XF9WnhAybBDJzl+jaS5bE/I/wAZAg0tDYZCZkb+yEMYJUni6k5YvyOF3xOWhK/FnYfpf9wv75kTGWFt2JbOWSRZBMWev3zbJl/IPV2YzIIOXCe+by+2cs8O+Frb2fk/Y+SXzwsk8Le27byG2YvsluS5LsvJN8HJY+SWQ2bZ4P8AH759hy6JiTbJ38l07Z+yGWQ6W29v+27bl9s5fsSx92+Yhh5+TyTeyvwh/thvrz1GXTB9nwJcls/L5I2y0HJfyTLIYTkOFuyywj4RaTYyHt0R1lvipKHL9h/iwksRHkIct52yXHzPM8+SW8iHfDzL5PZ8zz9v2XI625bJtgF8Qs2OfwX7Dy+yRyPkZfsnbbOxMxA2zZpEluQ7Hyd2Dsl8PRsHfd5fthE98D3Nsx8YsluwbLjZseMdm/IOdsEdgwg7J2/LM83zOxydd9/b6XSeebLsSg29tEIOwW3fXRALbbOwybfLPy3YKwN02L7fkbtgEM/fD9vjJpYjGx8snB+QLc6sMi3+Ef6J60nE7GvlikLZ5qG7cSfkvywWGJe2+a2D1ibfDxjxNvhdWycTrkWemeZZBZy+T/D4kkTz0ZSzY/yOEu2ecSbdiZNsZwuQfszsH87DpZ4/PCzLeebDMSWSeds24ssI9fl9svnh8jt++7D2e35M3TCxYxJpYSRnLCyyb9sv2XI8DWBs8bjCEutuX0jku+AyzY34ydkBjJNb/kXwlvyT8m/LGdkT/izklnHLl7A3kKXzL6lyOl8PEdiYvlyTwM8++BfJ/jfPl9vku+4bZ2Akx8+MX2yYctt31Im2zSSDGenueHyD9vpZnn7HjE8hL4n74T88z0+WSQeE+ftu+IwQWO2QWX5JsmeEzfkWmyj+COM/x+ypbHS+ID2TsXMmPnm2ysHZ4Xdjv2wnAh5ElqS98/Y868C+TbsP2OR35B3tk5dSCXsIkNOTP2EORPWzS4XJ79srl/i5YwJdbZNgsk0gyANos3fD0ZP4IFZMm+wWdk8Ek802Ym/LS+2YzHjJfsslmxyzINsmHqbPyx2PsfPG+zz5byzm+F+WeHu9lP4fE/hjwfM823ZIP43L92+2SXwj7b3zfWE2eww9yW2/JjP242Yz2TLNsZWw98cZW2cm+R8g5EW3+Eag07JaHzH21Pl9mf7Dk/iFP+Iz7A7PLeW68ujfut22JCDsJm3Es5D5vb8kfYMibIJPfz1tj++Hd8Pll+TsF+eOnfOZ59LDbM8SyfkN+SS3RBPLNgyPviR9h8LLMv8AaZhn7Jzxzwffy3wRsvln8PhLkkx8mHts9831liZ4TY7/ABnfD7JfL9t5LDds7432fA9yzDy6sgtm+yYzt8Wh9tnt/wAgnCwHndviOtjfMiUfYdI2OQGx5yOTARdmFszdE3rPDLMQIZCYMZ+Wd3z6QWEt8hs2THzP4dQYSSeHG335fnqRZD+SQ8ty3fNgL9j7IMchuMlsrHSfnh9s8WzfN5HYMYJvrJcyD1ifNk2I++5MT2JJj5f68zSzLpk8fAkfAYR5nn75pLLEtmkHmX5NrGvfkdbhKQYLJS4XLlmthATqTn7bkP7LfkYHYSHXksIctly1+ymQU54ZhDkfJHbOdvrFOJvjJ+wbqPllCLalpZafZYVux8tlYj7ctnsMNxky2yRyxbIlsC3TwPNsssw8MkdnhEMtsuwN8T9nkdkjtlvm7aT2HJ+X2zJ3IkiCyJhk2TUPLPX1bYbf6XvnY8Tttvg5LssZNkyyzx8fn8Pyy/In54MGv8fls/JbD/IizZtsLssyZ5dYOR4dsj/sz7Py1+RyzWxP+PR2Ps/IPMQh7Eekfvgsfq/9t/EfLMYi2/Y3yGxwmay7FlvbBHUe/sEct2Twh2eSs2+Wftv8bb5geMTw9eWkfLZ7bkdjlukvoQYWY7by+R2SYfMt/I5Zt3fYSZDBNnbmzlkGeE+LEkeE/wBMPY+Sc8ySzwdn5HhqHZC5K2LBZnuysWxhknjHZ5N9sP2MPkviefLbY8ULf8Ry4yEGQEAhxl2yMnpYhfl+WdgvzJJNsPHUIi4TDP2TfknbIOXDlmEAL6tdtXxIYI8ySGbbRk/yy4Jnd9HeWWWR4FvZLcmMz1JNPB55nJI+W35bb2+W2l9sTzcbZ83zHbbb749skvl3LNnk9RrBNkWPu9lixtcjviWeZJZbDseM6xMyzkSQLLgtbkuSVty3Ze33xvy7sT2S4E98C3Ibf9lLGc9P2XCHlsRwLYS3POL7AZbbEEgg2zl9XSLDF1YfCY4l0s5ZrDjk/fD5I+XGcjPPtnZ5bEePueEEuWy2+HPTzQWsg7Z5+wEnjBy+T3xHwOeJyCLno+hrHyTtlj67BfL6Ru+b3w+X/klnfA3zPN5NniWZa+H8vyGeT2OMwtC2JZ7fJtlnpfW+TyJz1ZfMtx9OkOtt+T8hk20k37Y35PWSAgEiX+Soj+Pjgs5ZblvIOzK2CceBsyXLvi+fYL8tn5DfsLdcIUkmx1PyeRQEgyzkIgksj768Jhj75sWbZknh62w9nw+2zzzL8s7JE/fPvyPvZj5bkdLLO2Ty+z4tq3+MmYjsWSSdiTkT2zwcfHwm2ImTkW4z4zyxSCXtniRyWPGcEafM824eyD2MC3z88ftlkuF9dhdlasGQEvIJL/VkJbMMsJfPm9uXC+yOR8n5Bsn+Rz7Ms8JeSk2z/Y+XEtcjjZb3PB2fGL45a/Zcns4vbhJrZZyVhvzwOvjO5HbTcj34XxL3JPD17fPN8JZbjBLb2znhqyQZJvyzz63wjvm26QSTfUSse7fbJ8PWOePibfUnmeE2W3568jp62bZl88XzfEiySTSxbMt8V26oEL5HfVnvo0hE8jE8ez8g5Emx8yeXTyxks5OoVZLIefttrtt9LMJbb7Z2XkKT9sRtWTHHlHY4WvB2PnL9hYFnk/LUJ3qEyA+3C+wTa5GMH+eNlsv9RB7uEO9t7JvhB4+JEe5blt+288OPj8jkx9n7byyP5SPHsE+MdW74+E+PiQeJNk8/h8/LPFL/AIhV9GfEktx/jb8jsn8YSO3xt5fbMLfM8yyaXx4C6ky3GcHIdl74FeRo5B/s+PLpsI76sbZ22eyrJQw32eQ7LyHJARCc8KEpGSdtSxXb4Rr3vzxmEML4R5hGI5Gej6eI35k/OQ5Dcn74k+N+R/ORPyGzt0Ry3kdv3z/yOkfZewx6ejPn3kY8L8g8+kSfxk/LNsyYsnxBE1Szxggsh7BZJ4knYg2wkeElnJLHb5PYS2c8bOR7stiel98+F0WrWdvyzkWdk9M24Jb1IWY+fkx8ld5H/Zlgsl8s5ZBPP9ST5Dv2UyXeSOx0jdtdsQlyImO2XbPDzkfw37JyNslbsefsr8vsEclN5Y+ZpZ2Y8/fE8SL6QXyfl9svl9ki3LO7JsGTDyG/ZLIPMib8t5D5njLN89TnmbJkt/zCspjyTnmWQZLA+FlnZsmUl+WR4LJ+35bHz18Jkgk5bEcLI+ykzYuSUn5DbPmD4zyffM7OLuR8jC3WTlhBaN9t/IL54nOXx2f0SwgrY+w/yCeLibdjiVow4/xsdbJ++YysmTMYbPMj7ZbjkHfMy0ttxh09S/bMvy/fW+2XCMy3XJLJ9HSTnp9ycst/I5/GeEkEes+LFtuywsil/wBwD+Ess8J+QXyH3ezL4RiXMljzLLPSf2YZstyZu+LfSyYtsW4uMuWl9bNmz/l8ll5HVkONsfsmsHJO2/kFzLdgs7di/ZfejLyOzW8i520l7HfHf2HG0/PMfvgpbHbO2Zb5pLyd/I39gj9S+bb2WdQYdjzCXLP2Plnrdu+PmbBbfYctxt2eW+YQZJyCOT59gkvyI7Jl98+x/WzN99WN8/Yks5ZHy2JJvtv5ZyJbYJs8S2I8zzsMsSykMWX57z37fkO+aZYQ2G+W2NyNltwhNnNn5Or5K2vqGXGHZORF1HIJbeRyW+w54X8gUjjJD4npI+3D88FJ68gjtj9nL8JuvtieWysfZPH5DtkJb7fvi6+HyVyGXwNbI4y/5Hztn8E22y8t82+xLfvnw2H0ndsuHmsj/svYfcn5G3Y77sMvg5P3zLuyx89yyTtl8l8eQeLPbEh0t5b6IJ83CHfAdktmdYZ6tv8ACx59S2TyI9u4hxYktqV+wywlX5M+GRP2Xm46ks8fsT9nt8s2PLXFsnY558QeJ/l0dsGBy19tbnn48fSLOzPyYGEsPBxPVuwFhEy/5HyB9Isi+yRPrE2T4Td8+kf5by2J5DYN88SDtnPdjxOXfFvrfLfEjPDwdnhDpDD/AAx9v2zxcntqMkHHIvsc8Seejx+xdkk0iZZPzxIfNgmLMn7almxsIHydhMsO3x4PbcYaRzFhB+w9v2+ebXxP2yJlfYLT5GE/4lWydk0tZd2Ts8L82+rZW+9jIkvZBdgvhfWzk+6zk0+z0lnCNyP1HIRZ8TZO+LHfEtjtluX2fH55sIx4x3lmWcv+Sdv/ACPtnIg5JZfH+MIssnJx8kWbZeX2JkyT+zcfVKSOW9h92fP27Lb4Rly/a4Ow75vidvnn2zIO+LkpIWNy7d/hLYs2yzLbRfAy5fZROrDcPbR8kp2EuQ628kPsv9l5aDMTyGD9lZYSenc5a+wbAgsFrPST88ArdJt2fBnjN+SMjlpGLL5K7b3zIgdkmDlnLqDHzls+JLGbXYNgzzb5fbJ9Il7Oww7fllmwZZ2I+2+M3559styaqx/qA9yyz+M8Lcls1gyOll+xDMN9J55tmyZfSyPtmyQR/hnz98dhbLj02xJ3xcs2Dniz2OS/5dv9W7H/ACS5PeEHdnUkOQjBfJuwTHhDmyWHJxsy2+kEExk235Z5+WNyHs/JNyFyOu3LlwupGXIf5aPtzbbh8yyXL6+D4sO2Ef55s2wEuW2bZ59L9i25E+Pk+ZZHm8jNstvtnb5b4e/ETZILq0xifvu9s2zLex/LfJ7JDfY5MCtuQ2WZDLfb5DL4/JEujzPHY8Sz1PW3GHkx4lkGsY83ZfN2C3H/AGwWOE2Rz4nyWuXx2wul8XUEJdts2QTLm/e3JFi3vjv5G/tluR2Ym5BjpMwqX7X1Yv27LI+X1tzcjFuR2GdtWBhPLrJ3w+igyXY43bcnz5Bth5u2dgwkvluwdvkkX23zJY7PLfCdLYdP6PFCdfJFjw+E+5J4e2Y35H8Nnn5BkHiWlnZ4w88yCY8cmHSTku5JakO+HGJnwm3L7Lkow+eZ4y5Lsq3Y5K08swh5aSC/bALVjxH2GQd2zeQi8tMuclGi4/PdbNgxsjzcusvjNIM8Wb6SCZDGGflvYduZfJXL/THWWa2ZOMFmQzDnhfydtjt8mvy1+37ExFmt+eFiybuz88JmyJOzNnIZNPC+Qz2Pnp58l5y1bP8AYmM8yTzFgzzclvv/AMEY8+TfYw98fsvVvvqN9vkWjVoX2ONusHjPu74SwjuvS3IdsQZ7pkuQyyl/iDL8IAbH5tyI4kMh7AQ6eizjcyLMh3kjvn5ZZbZH+pf8ib5bsEHZwiWR2+QtpvyZclE5YNux4vgb8uxy/Y2SJ+X1tnI8Tl+QxzsdgmHIZx83+M7ftuW893zcl7ZZ7rE5Dfs6IMLLJUtiTl88yN82fd9P5Dws2+X3zOxZMQ298bJOQYw0gxvjfWDIPG/bn89OWB5tlzI5OPkHyGbS7dvwg/YdlYJ2Bk/eR87LHeX1n3CfvfAj87PyWMFlvmwFjx+Qrct2YksgLez4SWS5apI2xvL97B/lgkHJHZmHkPnJP8gy+xhZsEeHi/kDZyDL8s8WP4cttnrNstm+fstloX0iXlsrZpBh4Pid8wZM/nPfl9vn8ZZ/8FlfE8P5SGW3fS4vt8Y9SS74uXC0cjr+F54ybcCO6lJ7I7IBDt9+H5ayw7d2XLNv0kpsaZBIWTCXJZk8I/7ITy/PAG/ImztjYscvt8JwS3wOwWPGL62R3kJbIpnJVzxZ7BlvmR5++4+fvv1BkNmk2x2ZBGpk0kvyyHXLGzz54nhJscieQ3GT05DsmyRfZLEtfBlts8/IZcthhn0/hu7ft2d2D08Y+zD6tn+2Q7HyN8Z/hN5BI4fy+fkVjBCNpdL6Wf5aY8tJBlxi0uBAl84WnrDl+yvi/wDYnRh30gstyY8Z6EkhjHyJgRJPj6k5Byx2TZ36+Qb0tw7JWHPM7fLfF5GZOI4ifX3NbJub/CuckWIE2cj0MfXn8BL2PAmIPPk2QT4eD3x++Jflttss2efI/k76+BZMfI+eE/bfN/LM81WSWGTsP8M8nBGoGyTnnyWPCDfDW5GPrcHLNIc4ygcnpLnyN+25OMufLuds3wPswJ7Mmyck2C+zDsn8k7jEt+25bby3zbUtWBvlssN+T9th18HLYtCRORq9gMgsst/J9yTbMiDJi3Oxu6zA5PLLmXIjxtvvh432+W+DfYk8SyHk2a2c8F/nkF8fMss8feknh7++Hr5ttukcth83W3zez8sWPRtv+w428/gTqDITPUk5MeFuEvJe3XmOSbfOWCInBkq2z7baTkhMAOxkmlgLOSvnFj4WwWbfUT2Jc8/LqeMyQAX1arN+R9vySC+eb/ChcsgvlvfM7ZhHycNvb7Zls5njNgCLI9b4efsvhZG+5k+d9JvtnPfyPMsy3zJ2RWWT2PFt2eW6WTfYmPX76ffGfOZbkOkdgJssku7Hbc82Xx8RDCWw+KeJfHmTzzML7fJZdsuyt/7LNmsMIJINfAQnyCDkuWllJtnIQ9nVmPhcctttthpDnn1PbQnrzOxfYv2JjzS/bPT55f8Alr4R5oT1s5GJGS74gQ8iPFy3fM7ZF+Wz5+zvmf3+R6PJjzLbclY/+P2zPPzz8j3JZfN3w8fdhiItvy3xY+zOxv7JsNljftll8Yknzcjss9t8CxaedEgWayTY7tlmWawARBGcHxpD9ty7S6cg5DZBLny07djYW7bBct9lycRvwsNYQwyxn7CXN85b2Swk/wA8Yk1nHyNhy++LCtqJ+z8gnUGSTAt8PkjY+tnmeZ5uW7bBp/B6Z6eZfIZlgsn54Nvmz3z55lwt75nbL5b/AA8t76+JBZ6eEvbky5HWbL5f9hln7dhk7bls2y7LPc81hrfEhLS67H/bGch1mxjdtbJIce3yXbssbrCNJcnrLI6ctMWctt2yGe2QxkLEGEsr+WrAx9sGAkEPBObZIsjbBJjaeb+WTyeOQL1uRa+bH/Z+w8nF0Q6fwe5/H2WGXnibBnh8l335PjFsM227F+ebkPZn+P2H1Lv8D4/ZiXx3YLPNnlun8HZ5DL4uQ2LESX2GES3GOQ2+ByVsuJh9XvmehwJeR2Q3Ih5fkHbP2Ws5bs5LC3Cfuzp5Dyz9t5fnj98T3IOWZ4MnYZNbhLd9SHPtsWerwl3w+Wkqsy5GiL5ENbRLSYbpgdgST0lt33Jib8vy+W2+fnp788bY++5Z4sQS5/P3x+Q+fIn+Bvt89eR8lLf5y4Qz43bNujbHYt8e235fI8Ky31LfBy+2ZM2XVkHMlyRvI3ZNsZMIeWEu5ZZSa4wsZYDY+z35HUrpZdN2xbLLI4W7ZfLTLFl4WQE2WRfbMY2+zdk0vkCXYJM8J+yaR/GT/J2OW8nsMJ+x4UrH/ZjsSRyWPn8MsTHPCPG23zPPtnfc/h+wRxlPTw8+l8fM8z+MtyTwnGdCFWdj0mQtCfDEjI/xC75uWu+bzxI/yXPtpJsHZ5/H5Ezwld8yYO37FguICT9jW1d2w5adseCDcOTplsuF0Qcv20suXFnI2zxNs5B2UixE5AeaefnmefsefHZ/xatmwZBZjZJbftyz9js5JHImTt+eBDlvfCJ9PM9yzlknhfLYsiz3PDwZldtjsc8SJg5HyJIb9/su74THi2dt7nm+/bULHJE9iAJIOeHry+yY3Vzwvtkn8vy7DKZYXxHYtnhsQmCPBwt0lyDTZwsgW2GDLIYy9jRviEEPJc+wF5dlhth82TSCQ2CySSzkES54TZ4hbrBJyOE5LLizPi5DyIOM/Zc5LXsv+Wtln8YfDz9/+e+v33Wyfn8F+WWdsGTtnmOxMS28ieQ6RJ/Tvh/JD9hh3YdLb88CXC2w8gWFqQj7+Rz+p8k1s9bP4WOQ7tuQ8skjz0gLMdhlvZ1I4ZBHG3wJ5AfbH0jWf8Z03BAksZjF++P4j7b5m+5Z23w+THbvmxJsojlifnLNgkyJJM8Z2Bt8AuR4cvrOeDkNhJ4T4/8AwLf42J+Qz78ts7PJ8+Wx2Z54HieHlvI+eZbni/yfxmX2OX30t2DZ2Hz7ycQ7c8Pf3xNI5yfvrwnM8XId8PYYTDLy2WmRs/7lyz9ly+JMZcLdsE9cjrL9htiN8ZLGF+yBy2/LMgy2S+WRP23zLcgGBLLBZEgkAS5ffF5F9JLO2OWWcssn5fZHZ2PFDvvPFLNgg2erOXyHfGP5yJ8fS0h5Ex5k7vh89JPEs8CTzI8/Lb7YTHj18S3zP7CTzLNvh4ZNjqeefSOEHZ3zfPkPn17vZ96syfk8lpKzWXluEuts6L6vizJJdTsu/J0Qh2XttwnRG/YdjdyD7Lz5Opsv3xjL7aFo2yaTbCzkHYzzb7PL6R5vPBtsvyYYjq2LZ8lp2yLdMggsy+z50ty3YbYyeX3+c/vfE7Bk8t2IOyWedu+b23fc8Js8L98CzPX7/Cxfs+P8Ljbax5k3zxWPng+JsKW8ki2dbpHybnmY29t81u3EMQMLdm7ZpJ2HLdnRky35fUk4uzFMueBl/iyNblg34TiJzzIJId5HySy2G5Aeblvvy6Jc8OzHSOMfZMvtlmSR9siGl9eYSR8l2/YmfGI63dgT+G3wmJ/oDdkmIh7N8ty3W/b7ZH8jMM/bbbsfZgcvk9swt8fWzlni4Q7Z2zzfNn5dffHzTJP8iyC+Ww6Tux8mWk3duwf7P2efIXex4g2AZB4it+RJ3fAXP2OfISfOX6Q8gmXSwj081HkO/YA7P5jRLzl9+yX4hxjs6N2yHs+n20n/ABG32b88zY8Zha9/YbZeQy+bl1HGXZIeT9mNsSI9Pll8jPyM9/f4Yn74+7HZLZ8Pnh9m+2cjdi3+DxifGPNvrfttvj24TBvh4L4k/IMl/wAjf6I6efbJsvyL99559s7yfnuzu2Nk6X5Ettrb3xLMl+QIS7BhDY5ByYJ1f4uGdLCfs7+R3i3/AFZzC+I85a/yRkiscmPMzwZy+S9jsqORZZ5vjb88E5COefb5fSZILL4iBkn8PGHz9vhLZscu7DhaNszb4WHYn+Bh8/LL8iyfnj8t/wDg3yfMj0n74chskmLe+JfLe+du/wApHn7H2TkEkj5nqQx58I8Zfzwm74/IMnrI+ZHJeWqR/wBl5P22DXZe5HyTtuSEPNnMcOTuXYnd24RdchLlnYZAJC7bbC7LHb42duwWZJ3bSGPG2FhZyIZ/5ab6mFvsM/b7DE/IbP2dYLJn7C74HZb7ZyzJdvpBk26X23LNZeZDjE+vh42T8htifvhZ6eHi+Py/PDwh7O7b4W27PmWTO357n87Hn7EPimy2/wDLeR883zeSvvvdh3wLs6R/25aR2wSft+TdkYNPAd7YWB6wwn5JrDJBLvzwuM9jhYl2yW1y7czzOTyVWNn7BZPId8zb5Bt8mTkO29vyyGHxjz5azTyEt7fngyeBdGfC3xdydksCz/Jj5ZkfJul9b9hz/wCB1km5/b53054QSRBNnm+kllkS35Ny+2Z4x5s74Hidj5fLZ+7Yvs8hvyDnvLP8822HZBss5Eypds2zlx5z9vzkXTJxGpO8mWeI67PS+X5bix2EMS5KX1OflnJY2/INR5/IXzO+JbfZkxg8zxu1n5Aj7sF8lh57u2cljzxkTfbYeylhk2eKed3YdJ+2pJb3x8yTbjxcY6e5Z6HjNl8lvp4e7z1jwfZL43fDzPC+W/xnjMuQO6/yxZl3xu5HmSPPv2f+RZPbIz+N8znrLbyGbLcnVgjOwd2QSwvlogrDCZbPJvpJ2dGHG4m31ZsCTtjlpEGKO2rYZYQ28nfy3nbEbaWefYeR2W+Z6W/klwyR8sjb8iJknLI964uktsgxmySHJeR5nfRyD9l5zJ22Vji2+IbNYcc83zZ8G2++C7Pzwnw8f4yIvyTz4/w+vI7NsbEnmTE/ZOQcixu2+jpEe7/TZ58t5bDts+PoWTy/PE7fljfnmdhvIi6evtnY4Sb2SzGHnJ3bTPA9nQlyGwpy0SByRHynj4BIJGZ4S0tLf5DnG4sHL4XN8++bF8t8OvM5fI+WSZq+wxl2VLdhll7LyLbYnjN+SbZkpdibJch37B2/bO7fXmeDJ2+F9vzz9m31cvrzY/rbbb7fL76eJHI7P2du2bBdG12CzzfF8fng7ByIm3Zn5489WG3l+W8t/g32TzZ5JsGFwvtw8/LLsEdk0gksyHk4js/YXxDl0bfG3bUdsEnIw7ILYH2O/ZIcYT9nvLAlhKuWeClyNOXds/Ye5Py+X0h75h4wefkWWR8i5S/I+2eDC0nvjL5aLJDjKHkXFv8A2+PLNYRaQ2DZ4MDfsen2Jj1JPfzx1OwZ6oWfznYJLOXyOtl88y+eM4h5C75lkkjI2MljsjAyWw+McZ++fs/I6T9k9XzOelknbOWZ4YlnZNiZh5ulnPNAsL1cJVJMisOcsQ7dSGecsJvECJnJhtMep02GxkZYD5P7guWcnrY2IiQXI+yyPlmWYFuwT5nIO2X7/CfEStkMbuyltwl5Et9I7EfL5Lrft87L4syUyO37ZYN8Ldttv3+3suXGfGDJfVhDY0fCXG3kJ5fSXLdh74xDJNm2fwM9Wyy37La22y+EfZ8S3xOQTFnfcs8XItk9YMsvzze28ti/bTwCGEodgbGf1JLy6JHeWK9lyXLbckvey5aG3/VmQvhkdvkO25LsJkGdtkI/3Zflw3GTnLuQILQcZfqCt+W37bbsPqduPkO2fsmzx83kuvgZLso5M/ZcnpfLI+Ww02bcT8jp4SZHy+eMRnm+ppDfZct8Yj7HSNIee/bIcZnxDvmZbLH8fPH3f63sxfnmXImfGBJjSfslk7bPfFs0iY8Z+3GJ+W59jHvhE8t8PpDDY42WrXLfZ1ty3EjjPWDGTYzM8DY+dmyzIcvpYzDP6LQZak2RYbZfUg8j/Vu/JFvk5YSOGWWdjwjxNmMXyXC09W9mPXkc++dQZJsOXGyyBj5kgguG+2W4RqLLcmGWPPyCbYbOxs+Gz2Pvix8tjw8ZjzeyxjZ6Wz2y56x/Gb/Q376njbtkWedLeefJgnkejsyQtj5bJtmHi4WkxdNgsw5LrtkZkJt20g1GpDZx2OsHYzL65H2xuP2N3t+W30lkfJa5ZZZy3b/2/JjzZgMj8X/ca9fs+BbKeCi0k7yXPs97arl3B+SFwnr4uEMhlhx7czkMxI7Gja7HUrNkw8EiW8lxjpHpP2+fyWX7AbP2fA9Ps/wx3wlifltrsPmepzzOej5zxzPDk9eQd9ePh99ZzwOeNkGXLexLBZDIss7N+Tox0gBMuHIeQNnIb4/4sc7PZDJZHb4xj9nMgFktMyJnZclbPf4QbMIMdh311cMT8s8Cyy2TYETMg7HnbGImHI6QO25dWJB3bBYmPy5k5LmzqYQZOGXWU9YG+XctbfW+WGEvnxuS7ZIQwzZFkzD3zI8SCb7fItt5Et9v2J9+f0ep58k/b7J7u+fJYJ+Xzsdth7McssvybLbS1X1bNsxvyBY54NiWGck7fEOePbNLMhm+oDJyZdb4txkTB3s/IZ6yR3ZNkjsA+3yH1OSU7fZwhjXLCwPFjbew9lt8zGLc8HiO8j5LJTtsNr4HYXDkux+7a33w2DtuQbDPBBfJ7fIb2FG6bNIZ9ujlxclJ+2Xxth3wnx+xyP4ezyzbPFiDxY+eFk+/ttvmXy/PCSYvnmTBZHndmDSzJg7JJG2TgeLfYC+3dg2yN8NbMPfsmWWWzJfEkBsyWQvmNew9vwbBIxLy/Y3bJ/5JcNo2cgPCbvJsksZcIdLcjrfIOyKRqyHwWfs35bFnIvyTY5b2OyWyts7bDrkGM9bB3zNllpl5CRJDaggw2HlsOy5fSzWxt/iS6EP+3/kf9llqwb4DP4DxjhDbbsT31m5bavr6/YvslmX7/Gw+bPbM8223xfAYn7blu2bZlvLb9vk+J4wPpLkaYsf5SzkEl9n/AJ5s8dnrk7+Iz9nvC2MG3S+kwTMksCUvsE7NxbyXuEle3y7Hj2wkgksYZHxllzzLNI56pCzb2JNs8LWPt+2aXSezxcE6+2Ych37PIP24Jx2+yZG5F+Ry+xh5pH3xJho32fsfLPB2Dng2bZl98z0s0k9SD0b9my/I/jNg7N+ej4230sfD7YTAm3I1sy+kcbZNgsk9/bOWJZDfZZyEuuWUPm+5niWT4S54t+RVvka/ZweQZ+Qc5aftj8S78ujskmENiAk4sIddl3ktsTHbJL5ZP4js+T1ncjb5DDCTbOkKdX5btvchyNefs/L8g/YyIIzkptuyWX1I2WXLoyHG3e2IdfQ2bYzu2v2H1owSRJyCb8PNL5brZH8fIeT2z3bL8jnjDZJ4W+727ZYeDJ3wfG+sW37fZIbeW3L5bbaywTBPjBaHgGeDsfwT5tvZ7ZJZsOR+mD/LPFgDYTPCG4Li/Z+WchjP2J1DJzJdnvn7PSHJ8fE74mxj5EzbyH/YdhnJyewZFj7LlgQW0tgSv5A3xZye+Ah7MfbjAflxfJ6xwn7YtvzwCS3G/bZOct/I5CT8kdly6s5JjHrEM/LL55uEd9M5bP8ACeDb6kWXJPDY8O37B4seLlsMfL9mDPPskPmwu32/LGybcJdgZFYIHfPt88Jly3WXLeQ+fJd9CzJT1bNkIMPQNmEFnhXeXUkWQGGyfMn5FpJBPLd8J7C+Mra2eR2zLlvbB5LZsWIECBZH8NsFkE8g2dSZJ2/LiWkdS+T82b5n7LjDJ2XCDTSPks4w427cN0eJD/OXzw5bbcyf8fy/w/f4Ysk8+3yxJ59kjzdhkt55s/LsOW+M/LPV8+yQc8yHHG+MsN98XC7npJLjkfIIk3wOeCkt9uzt8nXLpbpdNiS2zxW287GbPINO3b38g82T3fM7Zbb2TSTLqwhyA5dbYzLBg7yTkfIL56MX7Ek5nvyXkIxyXnL7Bh5JsGR9lcvzYP21It85JZ2ZCQMwsxn7Z2QCPkXw3wDfD+jsnuvgcv30g76/Is5fvgzfkTPCOLbWDbMk2DLPEsgm2Xw8Wdvz07Bj7k4Z67dWCI8+YRHW4hvYbLOy+kskg9TbL6ty026sGW6Sb63yDsmwZa3n8b2WPvm2yC3SJfNLbdcg5LyXlh9t5E35BkOkT9tj7LDDlsNpfZOWZ4nIIj5ENgzxyws0s/L/AJ4ZeyxknhL2Gf8Al2GUYx8823wj+PyJsn0cl7DPh58PDz9nsfffk98yTvgz89fnn5dbcc/lcn5Db2XzjZ/Btxknktvvmsul+xPTsF+ZZDLB2SyeMm2TyFu+JpDWeoCd/LWdvkmz1JtmSQTP2y2yTYhvtlgvmxbD9viOMSSduEC3yYL9i5Zfvm+NsM/fCzll8jEkiXtxbtm2t+wj7BywWyDxs2YZy1G3Zey9t8/YeeAZfvhE354xHZ5dj5Z4ZkuMOzxj5Fzzcts9/PPtvm+g+Z335F8k12Dxjl9LuR9s75nI0ZZeR0lieodLSON88yy+ZQ2x3z5L259lt2IQR9mYNkz3dY5c2Hs25btkts5t2+Ftmw/l2yy+W37LZLH220fnglwvzsYyLjkPrsfO+bHoxGWT9hutmk8k8G0vrMMMLsan5O74+ts2QePhJB2Dl8gPtlmNk/fRmfkSeDkzb5+3yWfvv8/lsSSWSR8mDlnjb3zZvyzbMt/jct2zH+PsWWt9jCxsfMnlvfWDPlj+QsuljdIbltpni5Gsddvnrbti3GPKSdjDzZs23JXI3Iv3+Usgvk9nzMdu3IZ2+2SXTIW/kcnzf8/g7ZjEFt++HjsNk5Y7dhf20hLmQdicvjkOPZftpMfPTvh2FnJvjxvyOypy/PPyzzPDx8YmTW4ZBgySJ+Rfs/Jhl5CWSds5ZkPjL2e2efFrLZ+WMHuc7f8Al+W8jxI3ZYmu2ybD1j3Db4lxn7yHNttss5E4QJC2S9lk2y/Z23CGzi2U2/8AI2G3sSNsvk+Y77s9kYOeBDs/Jd5EHs8Jb598SzG3wY+zLhDsPn2OT9jxOx5kljZbyyDbCXLUKeyYv2S8Y432PN/I4+E9LWTWPltstuNxTpHfPyP42ezzw8ydIdJ0vzz76PJgv+XyJyGd2HxZbvi4R8ndvksrvpMbdZMv2YTJsg2Asn55dt55sfJ9314H88wg8XGEIGMPPMgtFsG3zGNl8k3t+chf2cNmwTL5kuWxLG77vPBZ7fLLL8jk8Qz4uRJ4IxMDHzdj74l+W5G37b23w7JlkjASSnMjtj9t/wAlyxJ+28nzO+byLZMljWzlnfGwdkg8+yWcnkPr0vnjE+NLPSyJifvuXPMvzxJ5LPYg72cnwfA7JHPGwdk3xzwctZZ+T74+ZHLfAsXEE+XR2CGV2/bYb9hZXYbSTZMnbPI/F2FC3kO2a2WE5Lvy7G5MEXP4bI181tuycjhPZgwu3yUMJJ2z/Ib6eZyPtkx88/Ycl/l37DyLbVYb7yRGHSSzbMLqxuyLBnjkiQfEj7NuX08/whzztvZcYdth7fYZNvyb89LLPW+X/Y7JBfttvjy3b7HPAmMmZkkGch7cPP23zfG3xR88XlnrftluQjdjx5/C337Hn7P2b54PZ4Qyw+Hsm7HTLhyN312Hb5bHZYJLLNjluzpDy2+zZDluw26QmRPmL4smlmEPb7A2ZH2S2CyySY/7bbfSPkc+3PDCXsOk8fA9Z3zueK7OmDJBiYlnYfPye+dImOWx/sP8JZ6eO+HpF9vnh79s9yXw8bcl5Lfvjzx8vrZ4efblu+vyHvf5zPE6th0jLQtMnrHP5Dx82yC+pLMln8eb+Sfjcbn9Q7fk7Hj+YeQ9nWXP4H1BLW+GTZ5bkrDzty/eRbGzPsw6X7B4x9nsERO7bP2fO7fLb7BP2Sy+Wb44NkgSWUx1n5P2MWiQQXMnlvPPnh2yTZ4z8hMiPM8PTxfMsLm3LL5brZ5ue993lm3/ACOW+JsTFmTpsw8WQuz8hY85IW+HfsP89Evn52ZlZNnII9Z+25bMTltssPju3/b7fWzvhBIQcjsmRpu2DPCNY2zbL98T/I+RflkT88fkH+2HkbJnZdtLZ5Hy4xoy9h3kffEIOXzwSSHj4fJ+WX5DLPy/J2HkOy8yeMI2F8b8jdutlm+BPniTHG/ZOWMCRv7MFzDEcjvj/K+bbfbL427GzbpEx8s/nLPN7LDkI3JssshsKJYWXzzNPN9ztvi5Ke2YSaXdhEdeZ/C5HYx/kmfkeLDYcQZd8UiQtwkZGukDljs9jlt8vsEttsfZPD5dZ430vyyGdufkfOzh8uOkn9m/Iu2QXx82+LBsyN8b9k5ZZBzx/FpMMP5M+Rt9RhON8S2eNvPDY22W+JI2TEx0nh6Z42J9Xvmx5+2WWTBy7Kx88yDPFy+xEyx430sjYf8AbYnswZNniebfX3lyC2zfsGE32JINj1vr6vfAn/JMs/j8yMRyWPkOXcewn7OvkMIZObdXzt18eEzkEGMxPIZ+35EGycy4t5JZpPHJF75kE4W820eHm5Dv8JLFl8lxvv8AIzub8k8/LWCd8MMsPYUYf9th8ftvJb8rBni2fkPCfniwuusRHG3zbbJvy3wPIPdl83LsHJPNz0s7CPNJlyHfSSz1s9OS8h0lsiTSDI8fdvpJnn14PmN8tvyHWYX3ZqYQKlyzpAyWW7b+Six9+TGTjEdstnpfljfkPZ5DtxHyf+R8kMsOkhZtlrZuLJ8LfB5EJ5by0bcjtjOrCerOyY+FnPB8s8MwsgWDInVksHeXb6y4gPn7JyTSeQ8nsmMR9s5HjLuRw8G2Ez0u+MSbAjbbL425PZcifHsR2/bJOzzwJs2xGI93xvhC+O5A+4bbE/LrfC3xYeWkMySedt1ll0mzSzPFInlwS2esDLcZjDbALJt8yZvjEORLbMvz388Eb5fvm8h8dE9RsyJJHjDybbNIElfFu8syyGSz8s9SeQg5JkqRFhup0eWhyXIVuJNIELU7A26IIQ5LhLb5OoM8TY/y+TeR9mfl9mx59IMn5HYthnsctvpPI7Z4GyHmbEz2yHLT+Htlvh4BLHXxLEiZi3zfd83Y4W7fIb9vi6Lj+Sx9mWe35b4vbP8AJNsMsyydX3G8I+d8fsowTOkL9S32yyPklseN+zH+w63ECkHPNhtJ4z2fkGPm6R88yLNIk5BZt8Y8znq5bBpZOLdk0jRn7Jvy3OT9h+27zxvY2Ry4LO7fY8RuQ/5bbblulwQqzxt9fEZJEwWbH+WXyG/YOTfkW9n/AJawRyevhPuT1HjfOwt+zBLfSyzLt2NmxvjLDbfL7Pmcjnh4XSJy+fLuw2SWZZZnj9ssv2eF9hmdSXIkQEi0LeTqALS0gf2zvgfxrYMfOT4fOy3hByyzzLMhm2NLp2CfL4sJ2/It5fHicvltmsEy4Wy32zbQLDYTxpYMkiMizxPL9iGNgX1gkzkLbeZJyeRxD2fssfJ6WSZ6bLkfPDlvp9t7LH2AlJ/hvsfJQthW+ev2cQ75ozy+kFl+2ywyy+mS3Uh52UuM497Ywds5ZZBfLZ7a54z+Em22LfE74ypZb+TL+X1sPxbmMGeg7Yjdt74kWdlvs+BPyVJTC3lrHXxh2zGYOeBA5HPG5HgoQ2275uEOzJs9XxZkOQ2zIuT2HLb7I2MWyyDLWQZ9nT5cOzP+28uCzI6zxjhLt+XxfYNhwkt8TB4vLbezHY5L/IzEMuv8fIWe2RpfYMssf4fPl98PngNkMvfOwsut0hy23ZbfCV9fkOM/y/LPWkhGrbHbDz9n17cwJJ3YzxY7Z4sLR9zJgssniSJ558hlyLskfLOSdh/LPWCyL4TBt8JbZY4l3zZNtRt0tDLSYcbY+TPVmREknIOx1jJDYBJcW29vy2zbEYEhxnyXIdLJL88T0IQW5Py2HxOQQckjrL8vyzY+5cPDsGTHuyNv+x8m+HpPyWLO2Tz3fG7a3VuFspNrDyHsP9KFszftyUmdMD9s1kchgLBn2Bu+PyT+XbFLL5Hjh3b5b4kaPu88zuz3zOeLvIN22LcgNiT8tvt+weEuHpLkQNkhN8ts2IbPCOsAIl7MKEIyQ8HLbdLNJMduo3YYuNq+M/JMuJdliTSGXy3Tl23xlvi+S6Xy3vjDLDKQ2yY7byDS/cs8/Itv2HzZLZ62cj7/AAOeZJ5vm28lfy1nbeyS9vy2/LPflm2JLZ8Zl7M7YsHPMsLAYuHo+2bbrIj2ZiycWzxdxBhFuM4bbILewSZPiRd3xl2yCfs+PSYHpFjJ9e+DGPhjJQhh7L2elg2XbCWFvyXJNnw/JO5ak4wUgkgWwd9UJ6T9h/IOydnZXJP7IJ+R6nYMJbeT4Jkm+H/Yg5ZD5mQ4S6wJbK5DDbHiX5632yfW7N1ieW+ZkseOZLlpb+ediJ5byXfHj7++MW48TsSTafkxkuQziesMNlwvpssbk4j75kG7ZyG/Yp0uHYYbXY+X2fMh8W2GWHlspc8enm278ux6B3zL9iJNmERZB2SBjduLNsktxt2JUiPbOWY30uJIkgj08vpDHsH7aWSbPy6sxhEkueDLzzbdns8I+eJBD3JLC2el+SZfTzb98z3ZZ1fDvm+kvbTzfFfnpu3xm5cyTWJ2CyX+SRslmePuWd8ewxmDGYntpq5N2rTLCJLfGHfOZg2bPyTLqMst5LYr6/ZW+wRHWeWbcQyuRM3wBMT7+XFpZweLdbttkHmQdsGzJsdnbAE8nUJlsjfJM6gLQs5K3l/rDvi8v20t8XEuyNjDjbrbnidsY5DtkkHYJglyHzLeX5D5uW7fnucsvy/L88/fGHL9v3x8bJtlflrnYdiz1+SLbkeGpzGr9iyGHf4Szx8GS/ZmLi6Z1gt/xcLTzIwuJfsTq4Yf5HY+SBlLdfLma+LWdvvgzLl9uxHhy2CbhjUmEwZ4E3YWdgf3wEBjCzfBvvh9l9XI7ZLI2TZvn23nIbMnYBMX3OkOkljYl5vgTbCQj7b50WMkfPcvzkrl23CNW3WTb474eMHndgyY/nb77+W22zsvJgu+bfnhl8c8Att3x+2ZJtyYQ7YP2APO7DMrbf4Znz8uZJf9WlhZICHSNvqwkGSiW4+MtGXIdL5vi/Yvi/8AYzYnnbBGl3YMmyb8nnjZv223tm2JbscvvgQculiyTwZ+ycjlutlueDsuSq8t7krIR4B0luO3RL/Zdh+yktmPkNbOWc8TsG3SDZM7DG4JMbY+S559jnh2Y2zZJNgYtvl182Xsn7fsy5bt2fnI31cvtuT05HJZ3Y+eLyy+ts87snIf7YW23y+3C22WFn5H+zPyHuWWx6cl4KMY+M2bfLbt+y8aK3I24Wlp1LS/4gX7CLhujb8PKdxtSyXYwv2AksxY2WeJYZHq98/ZIjk9g8OQbfJST5m2Zfl2/J++Dp4DOEKpYQ12DZMizbVQ7cYYcj7YjLyUxyyxk7fkdsJBsSHY4y6XVwXcfYWwW7fL74Pb7ZPCew/k8+Qq2WSw7ZGeZ5mxxttIZe2z1vkuwyftkl8IbdkwtvzxjYls7598++BJsHfQSZ2O2WRPIhltjqHxLcntjsviaxz5HY9+wkokhtwX/EO7fLd8dWchjPZZNPM2QvpbJ3SWkHihfZ8yGxBP2/PNvtw8SOF9uL7CPDs+Ho42efMy1OLbqx22S8j83DGiw3ZxLLcLGw7Gz1NMfwMJFyD/ACFMSc2/ZI5bEsch2LHx7ZG+B5vmSsfYNZmGH7D4xLnjdj7JyHTI0vtnIO2eYWeHWeR88eTfJdj3982WJtzxchnsww8mPsPbfGGZtlJBgbJyAfWy5YTYvkm2Zax27ERPgfxgk2DJsICOW2lhySYs825Po3IsmII8Kx2TJ18Asx823PPi0jB48hW/PE7ZnZNJEsI2O3BIfk+w+ZZ6THw0WO7LyzWdXzYM6mCyJfM8yPMkYZ8GTvr8h/PM2FGwsiJfYxE/fDz9uSqwWZPWPvjLbPzkLuebL4/ORv7PLYNnFokSy3YvlseD4duGfnjmeBP/ACzS625y6YMAmIW5HIkjjfF8tNgblvYtfngWo2yRJJ4Ph2y2/bsPYn7fkOxkMXx58mF3wiSzLUfJbAlvj1gnJn6WGWZGJa2CBZpOWxG/28bbyX3bnnViTtlq1thTD2Im+RcLdZhbbds8/Im+T49aR0g8fVuF9ZdWOS5LZ8y/J7Fw8yyDPHxjxsnV89RZ0h0gs7G87Pb4XFo2dhjsmPh4wj5KX/El5a2WQj9sFsg7J4sjDsct20vskictVax8hL4bXbdItjfHsllkHmbHLbIZ76F8ienqx4j+Rp9t5bdvi5IYX7ZZsYHik3GGXSSHkEYh5LpcuR8j7fkfZu8g5OjcQNvjCTMDw7kRHiRflhPL8m1Ibe+H2TSY8bcfHJGykjLBhEm3ycTzcLfMkNn075kmFnu+E4+Y7fkNgwjxgFvibBly5bDvuWSWYwJNIEfMVuCWNsPfXxLOWdstydSJK9LJgk7P6L6hS1vmw+MsPmxu2WXwiy3w42+Dfs2+P3xYtnsAZHu28t2/IMjskmnj4tg7PHJOQ59tlbu33xkGXLqDCwXTDlsjRJ2If6tHzJ6Xxlvmy2xkz5+zZBMfY+Qs8YbHOTb2FbLYlsszwlLtvrMOeu+ZfC3xhrOFu/wnLJmfnp/5G/vhmREeMmkInSZI4zYk7B5p42Ys5JfIbe299Tfc0s/jZeX2IIGzLb8mJeenb5Hi7Hu9tfOeFnbF98O35fHz4vyHCDfA7vma2c8TbI4y5bO7dMbbq5sms9QZOsdTmXSHlu8g5AYML7PmWQuy32zHwjwib5ffNk3t9jqOEMm+7d2bW+OtonIu/kf9l3wyUt7MW2q+FmwZf++Z44eLb8sktl7fl+eH22PDzJln7LGm5Mhl9iGZ2032y38n74wyeMek2+ZB6yoS22+tnJiyfkS7duZEuQ7Lyyf4bGD/AGcIduGyzx+ctSZvb7JyfkHIOQSc8MJf45sffGQhyLO7bIWGXy+pdbeQwP2Hnvy3zPclybNtPkHgkSy7DJrdSiUO35svIPNstC3z7CDL9tydY+RcjrfLbZd4Qw7B5kuX2+W7PIosyS3Jb8jtnfH5yBSORDHmT9k7Lluw6wysTxif4YZshDPf4HzP5F8e2i2MyW3vhZJnu8tvsJ4TZzwmC/J+2Oxy+Z6wxl++Zsc5LZ2eR2DJdg5fvh9j7LfsjsDE5ZsS4Wl+yZEJBfFrcIXY7ZPjdh8JJ5bZ2W/LkPZ2BiOBa2pbpDnjy/POzx93/J2++ZPocuGb8jsAdvt8LdmyLByJtttlIN9CU1thh91k+L4v+zfPBkOw2bC7k374uXBbkdJ+Sz0hJm/Iv3+WGey5DyPGY+evbMnfN8Pt1MsMSW3fPy3y+o+xZIb4nNiCU3LLWPSy+X2S22HvmyT/AJHGcWH5bFfJS5a23CG2ezHyyXCFfEvn25baQ6eH2PFdnbG23wfOvmSbGWSBcTw97vgx2TXkkFkTB5vYlOpcuvkbD4Lplkj5aBEWTfGIzIbbYfs7+SMMPFViLP2WLZlsdkZPyTW3Gw3w76Hmz3zZ8+LhBTkts83wk7N9vlnhPJuscIW288G3W2D9npDPIxPiuXYbC7Bkvnz3YYsnkI+2Xzx1B5Dw/ccLReyDZ435DLDtsvI+eHZFviFNR+LdIZ9tPGfM7M+R4HiyG/YdmOWb6Wd8+TZkjtuXEtzwJLI8eth2Y++AW5dnJ1CCJLJe5LhPevDnj4+p/B+2x59i+W8tsmGPe+Hy+W2ehISwYM85J3+Mt7fSDw55DkclN8PB75vr9C3kPYvtkpssfPNj7Etzz9uEN9ISx8+W7byHZLjHhjxnb8jdlP2bZlfttvp+Xzx8y3wZJuxflyI++JsmtnmO+PfkP8vyP+yy27Hb55vjbb5whmDLO2ZZFkTrfLdjZC/zah8Esss8/YRbYlz3bYbcnvmHiePLeW+76fImd/I2eX08MnPHxcvtmfx8R+LZ1ZPOFiRfWyW3kvh9Hw7IbMt9cgv3zOXCc8yTSfspvng98ztmFpD30r8sTK+j+BwnMcW3y2ZYdiPs/I23wZ+x4ePyGLfOjbvm2+fUdk7Pr/DYpYPW4eH8MOzGrfJZ7fIC4SP+2PrGWX5EMmx9hcXR2NYctGXIZNIiy3PNh8djU7F++lvu4y98J7Dkt1N+efsyw2eBZyeuQv3175+RMbNyyyYbO3DZzxn2HC3ZifRvyHYctnz78u/tq0+zgz/yXhM7DsRjabLlulrdSFGTS7JLl0eCyzHwLIbZRuFs+dj7P2POzHo9ssshLlvj98J55yTxujkudh8Jkkfy+Rktggye3UmTn8N9f+W798DkGeZ6PIh7MuQt3YLs7H3wINuwW+La28nnYNNjknI7fV88fO+fbIfDzct5Dvm8izkWy9ts+otlvyyMgfCcmNP42J8L88zu+chxv3Zdn5BLIucuzth8s0jlsfYdn5CjDtvI7Z2y4t2zCzYZNsFy+2OxO7OkJ5hMfb5bhbbZtnhYRLawLfDxZ++utrln8Zyy3G08fNkmyDIly++O3yLYye+DLdet7Nsltto35fW+fw/IZeWa3y2bZ7LDPeRwy0tuWsa8fNt9DsFmPj9k5HLIC3IdmYOR5+wdntm2ZLJTlxbZHPMgv3wnw/7Z2bfMkzwmG3+kMOQ71AjP2JhfUd8Mw5BlvhP30J8nYLfzz5bsSX2w8AkWTAXNtlMnw5+X5GnJgswm33bfCUy6+SNiSi3WSDkfZt7Nsd8CzJ7ZDb6lYvyfD9kgknR8/Z7Br4Mjz7fsE2t+z2yyMh9WkSI6QrCfsY3Cfs4dtbbuwT4EwvmTLEeJtmFt9vkHb5brbHYL48fnhPjO35Dfty2++LDNvbYWTYk54hP+wiSN2PlmsWeQ45ZpDIyOvBk/YW5flrGyW+DNuW7G377tm25bv8pcsLIB4eZ6wQT4iwZbLPSDLZN8ntnL5DY+Q7HJ+W4Q2WS5LzzuQ74OX2fvi4w7PCzbBB2203wkS229v+wx9s2eEMEGeBs8lLkIY/7ZH/b8nvCOSxtrvu9s8+W2bJZYXwh1myP4PskMfLqTGPkdYiTt+W985ZyTkaeDyPvoW5bp4rZNnLEviAhlOCY66S/G+IP0hpYkcLd5fHzni+Ex48tctmLIv24t5b79s9b5MRPIdm31BCt89MZQbjOjGs8mCbsDGX3x3b89VnLi+xyGfUmcC26kny7m2mDI427Z3wWd23eXCfBxsI4w+vWwWTyC/biEYXUHLPEnSPHsW8iW1LdgCfF9zZ43/s/eXxP2S+kO35BOBKC/L5bbdhPBjpdLIPdtnL9s0jSUFk7MOTtvJ7Bks8A/ZIbu229822O2ebEkOeDfZPM8XLYbbd8b9j5P21Ytm4T+C6a3wmeFmkcnTtwIbm2LNks85aWacsw7f8XWBktY/wCw+fvpPyTWzw5fvZdMgt3wch2DLjfkOTE8t8yIn7Jhby/J7HFq/JF+wDwYZt84+rkWcltvp7vInsHJ8TZmZDkrfb8iJZW+35fLbZOxPgh7J2AyGeMHp42aypJv2/b427dy7sLsxi/JMJ+8vy22bNszwvgW23bsWWclflqX2GwcibkNpKbHZGJPGRYJc83sml3fGewsCsngfOZfYIEiATgeNMDMuQ3y1sRPiTuzPW/IfMbQ+zviet/yS3sTZ4QXy+t+RYQwbcI+zHy23I21tvyLJIIh2Yltldhlu+HLeQ35FsvLcbDKGbXbfOz5uXVsX7fSbJI2Mk94zyT9h/2C3wKsRPidkv2+SmW4y5Zc8JIZfSDzLL9m/I3xvjyMf4fFg23Lbhtbf5yeWy2yLByN2HJ7BnmDJhD2/Y+RbKJcLNLLPXYOfwZshfLfGJ63LLkE56OEOs7Z2+R8ts7M2agyyWWGzk/5HJt/LkfYlxh2YJ5JtnL4+vyDJyX/ACD98PtkWWJNjcW+MfbOWWydm/IMgvjbDlttuy5HTzLLCWfkOx8tSdchkEuQB2CyBjGeyXyFs/Yib4Qw+ZJl33kkc8WzI+z5lkfwmdh9S3xvvj4v5BJZkZL2/PFt7yduUxXft22HfFyOz8l5CIcbLfc8+yGcQePyz9jjPyxLXUEuNt+xfsuWucgfsweXxGL/AKvvyUMPG+27yCSMv2QYMvsuWr6O3cgu2uSkpktJg7FnbhKWbIXxltG1BHJbO/x++EG2dsgGTGcbgchmB8JLCPH7NkOMrsgbaHIuQeGrL4315aHISWNc8PsMuX2SPMyW+kfPU5dhSHbY8Y+3Ey6o762J7Ol+Rq4Qmy+by2wlHy1YS9gx86MvY79k83kPZIL6X/J+1wSC231snwntiMfZctGyH8i7sGkGRvmaQu5bZ3ZQLVGHt95lhOwklRg5BjDfkxP/ACNyHJdhiez5lt9LOyQRtIttlsh5PjpgyWWz9ttdu5Gn2HZOwRb5kc8ZdH0Z8/I2YQFvyJey9vy5d8x3kbvbiQZfkeS1ONuPgH2/IeX1bvqlwWnw8eW75lm+NfxkEeShl8/15vIsEm31PHzX5Zl+W8httL98Ruz8tuxr7BOZfCLInsINq5b22GXkRf4JvyDJ62QaSZfbAtvydlyfvo0jhAWMHLOQQeCHlkfJXfNthmyL8mzxLO+Hmyd9cy23kct5E8b7LkdPUifkZ4TbfS3kSk8t256fbk7LlvI+9lHy0PbV8XLr5a7Bnbd8MXk9I8Ejt8L6yWVCSHbcnsnJPDjPT3tsf74cku77vL/240Q6W2+sbt+Sb49uHmx5lxB7bYbbmX/no63HY1ZZ5+R9tGiB3ssWyb8tzj4cj5EmzsbsYuMTZLl9+wEnkNtthAE4vm5DPZYmt0t5KtsenjtktvfNt7425a2z9tydOQ+NvL/sags2zIv3x5HbMtv2PlkOW230urfL4h54eak5LbJI433byTSMRPyC3JXHh0jxG5CEDvZJZy3nJCDLhGp+zmHSG4yZDJsGeMeZZ4xvjz9mJ6wefLDyxsf2/Iv2+eNJgNblDk9L4t5LbvhOxmSwyyjw/Zy3zYsbF++EeOjyTe3xGSzfng5Pbe2y31nbAv2fsnIfEtI7JF8jdjqY+y8txtvtsX6Rd779kt5LyGu+7yNn5Y1hlxuiES2fC5fI83v8DZdJlfnnZvyzL4n7YK4OR4s2XluS7YeHC3bCNO2TwIksOW69viTXkP8AYyt7YhDbDDtkT98bsfPA8Wfl8Dbvy+TrZkHZctvskOSlsffdAtOSkuti3BMGFsMviQZMOT8jTskhjSDCBmfkNsfPA27bffM0vj58tls5Z4NghjLbsGdt1sh76W/llj7b6mtnb8mEeP2+2Z5+WQclyHxOyQwt7McLdn5fclnjAyzz8ssvkuyWebD2HxkOy5b2zxZLy3L8jD4ELO2bZy++E/Z+REyY2hLeRxyCQdtxyAskskyCsDcZCOXxlbLt0S56LfEh21NsXLNnjfSCfFy68+X1kTiNU82Q2fsNRmf8sbcJizLk2HFRvpZJuwefltzw+XDbf//EACAQAQEBAQEBAQEBAQEBAQAAAAEAESEQMUEgUWFxMIH/2gAIAUIAAT8QA5JqCFnbJ78jZXJK25L2HI7JfeQxyHbJfxg3Sf2WocDb2Xkt55tkDDmQZLFtl+wx8vhb4/iT9l/yTnbuZB2dj5dN8i/YNl7hDKBH+JcLLHLUZ6Q5HGHIMPUtCHYAw3sls54OSYs5/D9s0i3tvYd8ZgmH3ZYMt18SyD1Q5bLbH2ycgJLOWWds83Ldi/Lex98Hl+z6/LAIf8lCMv8All9j5azyE+dFmfbH3wcPi7fGxHb7H2T9vyA2EfJ7ZBZB/s87HNzdtvjblzI5btngly02GthN+F1YZKHLL2OttbAW3En8cMRmzyF3xk7Dflku/IMewBLOs6v+QBZD4vPP3zJcIdb45d4jiWkp+WRZdQg2iWfkkkERnbOwlnxIJLUsPmSdj54n7Pj88Hj9jxs8WIDxO/wxPn7DLHWfM8ScPD7OpMibYZlt8XJ6QZJpZB2ySCYD+dow5cF1YS2T9llfy6dbQ83su+MT9tl/smlgX1IEmM5Ew7DC6i+oO3xH/EkUMeZ+whBKPJEjNv8Ay2/bZXYX26RJzwmYhyewTyRWHnY482bY74+LlrIMINIAz88XG+l+2XyY+X3vhiM8yJ/j5K7Ll9bO3xli/LPAIMbbi+kvZ6xb4M8lWBky1jb7B4lngWSZMMdJPF8SQ6XyI9vkdsIn15dYGGW0jrPJY+efvrbM9eMn/ViRyP8Atkmwy+3z1Nhy4tYeb51Z8e+SiSHkxOyxuHgeSg8Ce/JTqzlnJOywS9gTt+xaWMDL/kfJ+xt9iXl2758t8DsgWsDPBn3LSfGXtmkHbMkx2XkyTi/1PiXbUJNsyy/IiSyCfG2Ge+LjfFtsx98E/Y+eM7ZnmME+fkwS+b2yfRs2SyDvi8lgkkGwL7Zk7It+QXyzTzfSyTl+xLLDaR319WGCQgzxLLhfYmAjxxZtkkdWAnrcnkPIf0jfJduG3Yc8cizskYsLe8t5kfZBOxydfJB7JMbvD5bLSYj7LbD4SbZni8gqwP7bMvpZNnbcJePS3PspAnGPnjy3tvJ+XBOenI7PHjy23ksR5yT9ly3fM5d2DSzGTsTcnpfJds5LkPbZvzwYLX3NLMhyXYs7JBsMY548tglAhHzPM8Sz0YYOSeFk5kvZW+/tvZ+xdskmPk8vq1fkDIsEMnOR+mGXLfyCfkfcbCBS0NhsPDMj/shsHYJUni7knWPlj98TSUmvxZ2HNIZ9hX7FkTGRktsSgskiyCYs/nbCSU+Q82UZ+RBBfJ74PLbOWeGNkctW3s/JiSDJiySYht2GJZYvs25LkpeSbEcl5HySyHlm2eD4fxuw5dTEm2Tv5LzsH7IZ5LS23vm232C3GGXfC2PILAsvyeWa7L8If7AT488JmXTB9m2JZaX0vkG2Xxy38njtmxyxDhbsuyw7KL9hM8xluN0Q9y+TKkocv2P8rCf9uiI8hYTQ7ZLjbfkFnhyTbcP4PEvk9kzwPAv2WDWXJeybYy+IWRz1izts+yQZHqZbMeLfYJ8zY+yW5DfE7tjtk8LPNLW+b4SRPfC/PMsz0sl8DZcs2PGJs5BztghpBhB2Syy/fc7HJ12/ffpdJ5Nt1EoNvbB5COsFjvjuzogFvLZMYZL5Bl2UsK/S2+kfI3bOeftlnZ42hAjGx88AMJuTq6+xw5f9F27OZGvlgz1txqIuMhkPcslhiXtt+Wtj+Dstv8LkN8k2OLVbJAzpyLD0sssss5fJjwnxJInnoykmxGBLpZy3ym37E/ZNJVv5cgknYJf4WHlnj78t54uQzE2SPuriyyPX5fbPT5Hb992Ge2cmbphIrYSaWExkflhZvh5ftnL9lhJYFgTxuMITpty+kfMvqYnV/jweMYya25zx8Jb8k/Jn5YDsiTOSV+SDly9gbAlmZfUuR2+X5I7FxfLllkYvnpfJ/jZjl9Zwl31DbO7AWefIbdgmLbd8/JGOS2waSQYz0v3zPD5BZpZk/f4P2J5CS8n74S8vrBJ4fPEsy7E+jviWf7BfskFlvJNsz1l5HzzQZfN9I4z/AB3ZU8HfBH7DseN+eb4WDs8Luwb9gCcCGJC+S98/fHSO+AXyVuo/vg7ZMFqlk9SEhpyR+xjkM9bBLh5P/bK5ccuWMl1tk2DxNIMsDYZ/5Ph42yfwQLEY+BlklkSeb2YlvyEL7ZjMW9kk8UyWcsyDYNmHn5JpNkfbo8b7PPlvLNN8L6We/nmk57k+J7kx5t/5d8G2YP5Q+32ySzze+bp6wmC5f8ww/hbeR8mM/bNbMZ7JkC2NxDHWWyjK2Dkl8jpZkdItn/Eag07IXDftj7dPl9LMew4z+YW/8j/YFZMvhbry6X7t23YR9hM2MSyGJccvyR9gyJsIJPfz1iH75d3z6WWzBPzxO+ci+lhJkSRJhDfSY3RBJkmwYRuzJFvfAssDyZlfskMpchn3bYxsvln8Ph2eSSR8thhJ7fvj4ywz2eE2HZ9zvgSefscJYfMiXx8Dxkgw8urILZb4mOyb4uWzf/kTwsBffLdviOvDZEuMmw7DtjkCP+RwuCLswtmWQzzdZ4ZYiQPWdnhZ3fM0gsMlvkNgyY+YzBN0gwkk80N9s758vz1Ikl+SR8ty3bJYCHGHshuIbjJbK7DpJyyDt8iWDb5byOwYwcm+slyCyzngSXy2TYh77k5kS7EnJj5Z+28g0sxs1kzx+2bYSO+AyRMefvmksxLZsHgX5NrGvfkdZyUgwsJT5aBcuWazqAL4n/s7sOX/AGW8LAdtN5JWWEPbcly/7lMhpyOoMIch5O7BzsdYvxN+MmdsHcBllAbX5Ku2+z1Ds7Hy2WI+3LZ7DDfZxblkjnLFYglhLosgtt2yyzCYyRWeXWUtrZdgYc7P2eR2S6kl54NpPYcZ+WbZk/PA2OWWRMPLNhB5Z6+Evm2+Z/C99PGG3wcl2WMmyZZ4+E/PSfllvIl5bDBr/H5byfkO8mBFnZwl8NpZk7PLrZyLOx5/7JhfZ+WsIWasSc+XYs5By/IEt7EcSzwWP1f+2/iGwj8SW/Y/MdjhLazY1IJLZBGnz7fL9ghyHZO+DyGu3yWya3ywtz+NyHbLA9EmT8i+WIeWz23GOw5bpLfnmQcsRvy3I7JPLr3fyOX2+MX1CTIYJCztycfA8J++LEMjw8yP4eW9lyQyyySzwffyNR2S5LZsFmebbKxtsYZJcY7PJb7YfsAfJfE8OWksPihbiONyw+AEhDjLtmxk9LEn5HyeoOR8nLqHjqQi5MP0z35J2TsHLhyzIQI6lbay+J1ALfM2YfNtGT/LGGEsrvo7J5kTFvck7fJjL75nZNPFwts5J4WPkvbfNhJxsbLcbeT2y2LHbedtvsfJ6wTZl3LNnkuMa2T4WNvmz2LG1jxO+/k3+rUlsXJy+wWZBzxIBB24LXE8ktuQ7L2+3Zt5fsTIWhPfdyG3/ZE8Wv3z9lkOnhHAthLc8+rdgM23W0urOyhBfC+ohZN1ZTDYPLovpZsOOT98PkoXGcIyG+2dly2IPEjnmeEEuFstvhPh47kGztnmdgk8Y+Xye+O+HzxmRcm/YbfA2PknfAm2dYL5flre3yXvh8tks1vkGxZ5vgLLLMtYjx9YbcJdhzwNzzs/xvbZ6X1sGPIJz1cl18y3HwckSHWXt+TDJsiyftjO31ksINPF/kqIv754LOSW5Dy/Zl4NuIYtmGy5aXkc+wH5bPyDfsMbdcIf1kk2I8J5FASDCzkEgk2y/Ye+LyYY++bEmlmSeHvy23vp9tktizlmMmx/k88+372Y+Wx0s7ZZjcR2bZe+N8PM8Y8LCSTsScietng4+L4Tb4TJcS9nxnk6kJZIkjksPriNeJ5tgbBjAt8/PPqCyXC3XbfDVIMgN7LzkElj7ZCW54GWEvm2/blwntjl+T8g2T/I/wCzIPC5koaWf7DlzPXI4xb3PB3qzGOz8tS5PZxewhIPjDJ/5G35E3X11vsPY9+F0Tknh69s830ttgwT+Le2csjVkgyTbIb63wjt3fPsEnZ+QdglSHfdvtknp4xy/Jv2Tb6kzzP4SG/PUyO+v2zbi+TLHqRZJJpYRb4t1QITHfdk2TwaQiTIxPHsx8iTY+ZPLpsf2Szl1arJk8/bS/ZeXUswlzx9ZJ4tUm/ZEY2wY5vmR2OFq/1HY+cv20QLLk/LUJ2GZAWg32yboRjH/Lb8l5Zf6izwtydQ9nXZiC3JfMiPctQtv2/JjjOIJj7P3zI8+ejYePYJ8Y6h3x5bsfZ8fEsiSftkufwvn5Z4pf8AEas2RL4kluMfx+R2H8ck7HJvL7YBb5lvjNJc8Eaky4b45DsrsQVjRyCfHl02Q76uQtm2z2VZKVvb6Xwh2ekcZARD0nc4M5GSXT5I7DhGpL88+oMgwvhHn2AQB/A9i+MX5Y35MOQ2WeJPjfkfzkT8h5Z2AkcbeR0n7f8At/5Hb9l7DF9830Z8+mRi+Q2QX7fkT4TEvLNsySCyfEEatU9YIJLXYssmSTscg2xI8PslklnbMnsm9k5BJBdtmGWRk9PThLSRvjt+XxEGsnoG3JJcMhcN8vy/L8td5H/fFgsl8vyyw8/1Kny3ftpl05IrsGl0bW3H20bkETGWeB449Hv7Jy7ZK/liseH2UX2COSNwsfM0s7MWeEkyQk9g5fJ+X2y+X2Ecty/dk1gyYeW37JBB6eflvIfM8bZjlu+Dlt9kyWKKyljyTngQWBLYHw8zs+JKft+WZGT5k8Z+WxME+HZ+yQSWhDCyM2WZsHJLfEQcltsF8Z5evmSTWC/LBbrIZYQWjfYeX16rkf8Ab9CaQLAfYf5Z3tnLJbqOIW3YcbfdvtmT6smXMh2yyCPtkuNisfbMtLbQYdPCTviZb/DffHCMy3XJLJvy+Q6Sek9ybLeR5vgeEkHI9fH7LDbLswspL/uAR4SWWeEwN8h93sz4RiXwljzL8s3wSf2S3zLcmbvi32yYts24lGfLljdmzZL5bLkdWS2xjrAyW9gn5btlnbsWdliJ428iM1vIudtN8Dtx8uv2ONpltj9uxbEdbMttltnfy7+wX6S+cW9lnUGHYPOS2fsWWWzY2Nk+fYP3x9hyHG3Z4y22bBkOQRxn759iS/IjsmfwWWnp4+N+2S5HpJZyyG2O2T5tnIlkI2TZEPCJfMuw8liWRD2LOfyeZrfkO+cywhkN8tJyNyJbcI6nNn5Or/iVayGwQ3x4LqOQTfkclyO25EX8gpH5g+Ls7J3bh+QSJ68JEdhzjJy/Dx19sPPkrfsl/wCymR2SEs4R31e32PkrDLZBrBHGX/Iedk8+ecm22Xnu33xdv3z4bD6Tu2cuHicjf2V2U+sba32Pnm9hlm27tvmO34R8jzNslb4zLfHkHiz2+odLeQ+MIGeecCHb7A7J6ewyJSXf4yWJvq2zk8iPbqARxYkvLUjbRtl5OvydjhkT9lfYsDZJO+P2J+z2+X2JclcQ2NjkM/LL/lnOXR2yY3LX2XueTjx9LlnZuTGw2XDwcbPVsEA9WINvlvh4ePjtr5+xNknh8mzlnb6ZH+W8tj5PIZBiSSDtnPdjxOXY+St9b5D4kNh64zwh0hh/hi/ZL5LPbUZhpkO+HmThPnxHhYySaR4ZPzxt82zw8P23LNjSNxydhMsO3x4fbcYaRzFhB+2+Zng35LnZsgmU9gtPkYT/AIlMcbDL4u/7J2yI/V9ZHJctGMiB7OPAvyTWCSbZ3OXP2Qkj4RsQ5LWfE2Tvi3XjbkdstyOzE/JhtGCZ7HeWZZyP8kx8PtnIg5JZfsS+YeZZcnEiy2z8tiZMJP7Mdv23weskct7D7s23du7K288O+NnZAdh3zfEvnn2DL9icSmFjctbt31IYs2yDPG62Iiz0lHxBp8sNwzvxJTsJcjU3k59v9LeSg35DfLYP2Xsvh8dsctQbECxKz0k/PBljl2dmMZ4wfkjsjloxizxUYVfM7EHYTAs5dQY+ct9JLGbXYNgzzb5fbJn76T1nYhGTll9gg7Hy/bfFn375xPMqsHOwHn2yyz+M8Jclk1gyOlmX1j7b4N9J5LbZsmeJH2zZJN9Jn+QsFx4fnmxJ4sGx4WXTxc+Xf2/bexJcnLha3Z1JDkO+HxhWBtieEebJSHLlmQz3wcSJGT/y3zPPyBuQmyck7kLl9duXPDphMuQ/y0Pbltwz9ssZv3wfNh2wjzZPAlt7Zvh9vp4W3InwfZ9yPB5cs/Yb7Z2+W9jz54InxBdWmBP3z8t7ZtmW9/r8uk9J/Vt9jh4B23IssyGfRm/b8kRuiYOXxnYb7JZ6nI8bcYdJPCG2QbDFtuy+bsEUjn2zW+F+SXz4lyWuX1shb4nUMJd8zZB5c3725sjDd2J21s7bkdbPNuQ46SMKl+19Wb9uyzL620eRi3GOwztqwMZwvsmNx33YGDLdi7fJsvhBthvodg5JfJdgsyTw7b3zLY7JD4Tz5bDp/BfseKE/4kWPD4fxknjqzt+R/D7+QWWSWlnZ4y55lkwWTmTDyTksckhSHfDjEz4Tbluy5btPkWRMoS7szd8TaeWYW2kgtgI2x4j7DIPqTeeBctLcOQR0uPz3WDftmMx5uXWXxmwZMvn0gJkNQzmT9h25lwk5f9R+bNYMZxsgyUthS+Nl/Ltsdjnlr9iCfkQ2bflyLLJbs+EzZEn76nIWTTw8GTY+enZ544OWqWf7EwHmSefY55uS+ZH9JHn7PyXY674/Zct7bbffUZ7cCO2yaF9vjasHjL6u+E8Ia76S5DrMgs80yWRGKX1kAdk+EMNj825HE4kAt7LCOlxP++jmQWZDI74fL7JD+SR/qf8AkT88+wZfs+Fg7dIW0/L8mXJROWDbseL5G/PByewM8In5dMcRzxOTCw88CYUh/wBnG23+M74ON+e75uS9ss8/LWLkJfs6gyyy3PCTl88yCLZ93z9/jfA8yyzPGzWPGIbexNk8QZDYY3y3WOQeN++P8duWRbbtk5kcZ5EPyHZtItxvwg/YRlYZ2OLex87cR3l9Z9wn7fIcs5JpLGDzd87B2cL9n5Cly+y5ElkFvZtiTwqW6SNsDy3PsH6WCQ5I7MnJch95BhPYwLNjkeHzxT5BZyCPknix4x8nLb/t9Zh5L5t+zZCF9PFwl5K2aQZ4Pid8AZM8/JYyT35fb5/GWepZfGLJZfHw/g8GXCHbfAhl9I4x6knrLlo5HX8Ly3xNuBfdWkzozgQ7fd/uflq/STtuSbfpPTYCyBkLZhLksyeEf9kJ5ZyEBs5EtkDYscvtmE4Jb5nYCeW8mON9bK3kJe2R/ROueK+lmMJ5kc9L8s9OW31Bh4HL5MHZsEamTSTz8vrLGy+355nubHI+3ENxmLY5DMxPfDp8tX74RbbI8GW22GfGPs+E375jP2Dz8jxjk/I9Wz/bIdj5HjP8JvLG+Hr/ABnIrAC0bS6X0v8Ai1CaSbbj5pcCC+MLT9k5fsr4uZE6QxMfIkvnh98B6EyGMfIVgiSSzb6kjizsmk6u/IN6WA7JWHPM7fC3xWwyXCOIm6+5rZPLkM+PDkixAmDn8B3zZ5/ATHgT4F++PgSbZFmQ9v2TvjflsNss2M/fB8z074T4FkI4R88CftsttmW2rZLDKXPN8Z5OI1A2ScstyXfSDw1uRh63ByzSWcZc+T23PkbuyhOMufLuQbdo43JLyZNk5JsGW7MMn8k7jEtusueby191IVgW+WyrD2+k/bYe2xy2LBInIFewGQTsFv55vmSbZkGwZ6XPPWZwnklzLkEWd82Yjxvt8bfBvsfJI5JZDNjtnPF/BYQSY+JZZnjH3z5J4e/vhfvj5vjdLOW8hty3W223s2bBlp4NvzsOMPI9HJ1GITLt+SSGTD4WpcJez3zOSR/kAgk8SrcfW2SkgTAbsZIJIBJyV+eLkD5LFm33sHglz7fkXTJkybGBfVq+fkfb8kgvjZ+2+7Kb3zIPNx8ztmEfJe232zJZ+XF9sPGR63w8/ZfPyyPcyb8j0mO2cn55+R5lmW+s6ssnsMy27PC3Sz0m+LL9n76ffGS/LkuEtL7AeZJZd2O3y3xfD5EMNsPik+Hzz8nnmYQbfJeSjZdl82bOxw+w7MGs9wQnyDkHJxaWUNs5DkLt1Jj4XHIdtCW2GkOeY2elgbrDZF9i/Y9G/wAWQPpufty/8tfCPsloT1k5GJGS7ZIEfI9XJfGZHmz6+B/J5+RMMOk+5bbkrFvP6Jssz/4AZL2Xxe+Fs+7D/seEt+W+LH2cnY39k2ONm+P2yy+MSTfLUjss99DnjbP27iBfWSbH75mNmwA2KIzg2rS/S+SdvpY5JpIJc+Q3t2Ngd22LZdZclDd+Vk1i7yFiLGPsJ9v2MsFv2Swk8SJNZpsOE3wlhWVHhiOoMsnUGenyRsfPyYJs8zPNy3bYNs9PS3w8y+QzLBZPhb5vb88+eZfPcsvkPPGJ5b2PHxILI8PCXvjLkdksvhP3YZZ+2wyW42zbLss9zzWGsnJCWzrsH+2M5HWbGB2STZY25dJWwbWDsaS5L+WR05aiy2+yRNkEZNsQwlyV+WqdgY5YMBIIeC5tkmyMsE8hLbbL5f4QL1uRD5t/1P2GcRojv8HZG/LOeNt9lyGenibBzw+S99+S+MWwzbLF8L7bkPZnwtv2HzjJb/A9tn7MT47sF08/J5bv8Zs8hl8XIZNjhDJZsMI+S2DHIc8P2PkrBZksPPV75ltreSwJc2OnyTqXSeNnLO2fstZy3ZyXfDZ9bdIRwv8AtvL8/hJtLIOXyLb6wyKxhLa32Mkhz7DKz1eHJd8LSVfHEaIvkQFix6Tow3bBjSfSXLdZeeJ4M35Hy+W2/wAk/wANsffcs8XwJ57+efSJ+R6T4ebfb568h5KW+ZZ5lwhl8djbNujbyOx6tJeX5fI++mH8Pzxhy3bCcmy6s2DmSx65C7JtkmQ2GS9yyCk5s2HZGWDsO3xyOpOwXTA2WWdghwt1syXLGQLLyzWCSzw7ZtmNq3ZuyCTyNyiQSeEyaWUn+TsGQ85PSyLhi/1K1jsxEkcZdvz39mWPAyYiJt/hjtkeZ/D9gjjKenzwm+l8b7Z/D5l8s8GcZEIXZ2P4ZC0J8yoyP8Wu+bhC7DbsyaRvyXPvibB2zP4/ILPCXvmS5DvhYLjrAs/brau7MctO2PBC4Z2y2XC6LL9gsuXF+R7lmEfZSLG75gIy08PAm6sQS5+z/i1bN+wBByzG+SW374nYnJI5DbDsHJ+QjFvfAj7L5nuT4lnLJsi+W22Rz+M8PBnkrtsdiJImDkfIkhxmGf5LXwmPnm2dl7Fvv2xISckT2NwEkHPCYm+yY3Tb4fb7JJ/L88JBBXLZHYtnhsTMEXxBhf8Asss02cLIGNhsz5B/tlP2Tt8QAjiAgL4tvg2YbbPSCTsFklljBHbcnsfPMiQl2E8XycyWWiyTEuRNhxl7MHZbWy/Z9y+Hp4+5ZZ5+Sw+Pu32Tnu2x8s8wZO2XLGJiWHkM8h0iT3fUb5Db/AQh2Hdh5bfl+QS4SwjyBYWwds8/IcvseZnkzJOx69s8fkSxj9W5DzwnY8vrxBYjsmSsdSOYguG3bkGwyA+2PpGznCergkJMG0mPV/IJcIs2zzPNt7HzwXfNjbNnMc8tmwdvjEkgeM7+WNvgSkZ4GT1nM8HIYCTvhPjHh632P42WPNnwL5byCeM+7Ez4Hib4eNvI+eJ6t+fwetmT2OX30t2SzGHzNnEO3PM8I+zJpHHJ9TJzPFkOnggwmUvLbbkb8XZ2UcbLl9JMZcLq4vqOsv2G3/Y78hzJYx/qcOW35Zllsnn5E/bZOQW5AMDIyU8yJxLMl82dyL6SWds5JByyyfngd5ax4rd9w8UvsEAz1fEch2yYtl/l8bfC0208Ysku7ZE+ElknhB2bbI8/Lb7ZMPjElvmfw+gSRZZZhfU/JNjq4v8At9L4QdnfNi3LYh33ey+urMPFjaRVm28lwl1tnRfV8XHySXU6Wj8tCDDsvbbhOi09jGB2D7Lh8tLNkvb779tC3S2TSXYQcjqw8W+zy+nm9t54Ntl+ShiHW2Iocnp2YnpBBZkdk8xjluw2xm2z2D3IP5Ytj5IbBk2xBJ5k3fBt31PDs2eHLezBZnn2TI9WP4fMs7LjbdjzOT8jnisPLYTxNhS2SPkM6zpHyYxv2zG23xWNyeRxsDa+zdk2TsOfYdnbUs/L6kkHyJcl3wueBkfi4a3LjfhcQM8yCSDvI+SbBy3sNz9gPFy335dEuTsTHY4w9nzNsySPtkQ0jkCwkiHsPY++J4x8jrY7AnuyltsTE2/xsHdkmNYh7P2+Fxbr59sj+GGWGXsNvh9mxjk9swh8fN8yS+S4W7ZZfkPm8n5dePn5JHmXyG3SR2Pl8S0m6N2P+z9n5C/seJthkGeIrflmT+oROfsc+Rk+cv0h5l+TLSwZb4KMP6gDsv5A6lz5fesn58fGDZEbWyHv8H22ZrfZz1IvqDCPf2LZYZYZcbdhxtGTvJcndkY+SdiPQ5ZfCxGev8JE/YnzbY7JfPT54ffB2TY3Yt/piYnI9Pt+222TcmDfA8Ftkn5Bk/gjfMifCHZvvjZfke7ctvsE+7O7Y2Tpfnm23be2kl8kQIS7HC+LGDl+wTq/xYHkiSF+zv5HWx+2cwviPOWt+S5Iscn3PBnL5LHZY54Sz1Frfl1BYQhy3wvpJJ2AyztjI6gySfMnjD5+35LYsEu7GCES3JZtmbbsTb6MPuX5Fk9In5a+H87Pj5kehfvhyGyTJi3viW5b3zb7Z/CeZft9ScgZLFfM9SPNtMjxl8Ozd8fmWZ47DZBkvJVh/tv5P27B2XsfJO25JHzZzHDk7d8fu3CL8ZFyTsmQCWuy8th7LFuOQdnYLMs/W0LYfcWFkDDL/ki+HkPgz983I7PCGz9tJB/tnj9jrZB2W+3xZksdjktu32XLNZeZDjE+vh5+2X5FsT98Cy/fD54X2Xx+eZHhD2d2GYtlGfMs5M7fnufzsd8/Y/2HxTbZcbeWc8W3tvJdvr67J3wMuzpH/bSUjGQknY+Tdk5BpGIO2FgXPFhhPyTW45IJd8PGexwsX1pZLa5XJgnlusE/YLJ5DrfbPA8ck5DtuX5dhYW2ew+fLeaW/wBhG3sPL5DJ4F0Zv2Cc8XcnZsCz/J8zImzL62djlyz+jrZJhc8J9J87d8HJhghkfYk8JYs54SyxIlu5Ny+2Z4x6r4Hidj5Fs/dsSjLhdfIOe8s/y3xtu2DZll8llS62WXEXM7f+RdMnEan7yXszi+7dJ5bpa/Igd2EMfZctkbKfCzk8bdhqL+eCy2ZDJDbMgMeZdRS7PzLEfO2xfJfM8+2cljyUGxNtsPZbmTHi23d2WkveTWWW3yfMmzPFxt0t8yyfs/I8WbI4S30mPd9YsRCeMbffc8GDIfHzPHJyXCB2P4YgnfHbuR5kiy+/Z/5Fk2QlzPN8PN9XzfMty0wR+zsdbIJYSZ8gkiwwn/ZSzfSzt0Yw3E2ftkTOyOWkAyDpJthsIdt2d/JcO2H5A2lkz7DyHZeXJdFs31JG5ZHhEyflnIj5N+BCk9sgybJI5LkeJ30c5B++HIzJ23JUcW3xDZrbjnm+DNsNs98F2flsTF+zP8ZEeJE8b9siY8eQ7PhsSesTkkF9kulvo6RH2fN/vO35bltsOwz4z4FlwW8h2R3zGznmdhsRdj54zWzsGEkyYw8mHkEPZ0JKQ2FOWiQOSYrcfAdkBCSAnpaSvyHOMYxwvy/bLJtjzfHrz8vkQchmr6Qxt1lS3WGWXsrkW5bE8fPyC2ZLeSxj5NluQ7B2/bDdvr+BkvhfbPP2fcly+vNj+NttltvtuR30iTY54/bG7ZpZfJ3YLPNu2+kMHPAn5bsz4uW+LDbJy3lv8HxItnkmwYWBfblt+WWQRnRGpxZnYeWEtmEORyHNPHbo7LFnLh2QXlmfb7JDjyE/SemWBLC+OXLL4kXCNOWOwfsPcbeXy+lvmehy+N+eZZHyLQlnI+2SjNtJ74zl8tGS3GXYcIeX1v8A24PLBYRb4hszzewN+x8s8PsT2PXkm+7zwduwZ4Slnh5lnYJicvkdsvl3bL5cmcMPLe32yySRsyyTtjZAyNsMTH2bNv2fkdJ+yerFh6WbJ2zlmecSzsmxMzzb88wTp6gJVJpIrDh40SeyGXOWDN/sQiZyYY1i6tWxkHL7gPk7g7YEHJ621ERIMnsWHI+RySQbdgl8yDtlvbPWOIlbCGWu+C2gS8tW5fTY7EfJ5Lrft07OuQZKZDt+wSF8Ldth9PM9ey5cZIJIZLnvBBpGj4Txt5CTL8ly3Ye+MQzJZtluHmsM9Wyy2ytrb4XwifEt8TkExZ275lnm5EMn8HGy/PF19PNIBCGE4dgcgf2SQ2Xl1I7yRXsv5LltuSXvZctjS+u2RtkEdnlusOS7CZBlsx8jP26+RluRP8u5jY2G0HGU7fcPLb9t8XPR24jVn7JsmMct5PXgZLsPI0mPsuT0iyIsNX24n5HhIEfL54xGeb69IbbbfH74XZaCHnfC+tkOMx4h3zMtl2LY8+ePgS+bbLffHz88yPsTPjYzGzIwSN8nvm2aR/kkeM3GJlEY/wANvh9JfkNjkHLX5K2+zvbY2if9jjJrBjOoz54Gw4dnvyyOW5fSRvyGV+WoZak2R+2Pzw9SDyP9Q78kVhz7KWG4MskjwjxNkjLfHJcJ03dnEuuRw751Blmxy42f5ZAwcxgILhvtluWxZbkymIvyDZthk7BPhsx98Y+fweP2Y82WO2TMWz0sm/fGLfc/g8Gzvqc8bd8PFtbeX74weF+TyHfEtDHy2e2YeLkt8Fq7BZhyXXbIDIf54W2g1GpDZx0vrsG3Av8AmNW7tx+3d7Hy3xZHyHXL6sswtyf9j5MplnYD9kfi/wC416Hs+Bbkp4s0ZOy49nvbdcu4JNuE9iXIeSGWMNpnIZjsjtiWux+JWbJh4JHxcY6QeET9sz+PkfLL9gNn7N9gs8/ZfHxY74Wxk/PNZWds82TTzJ8GZzxzPByXXkebsmeGbPrHyC+eZBly3sfJYIjkWSdnl9JEY6QAhfCHkDZyGxf8Xcnv2Qy4g26MIzALJOJkXOy5K2e+5IN8IMdht80uXwllkFlnLck0gRiDIO2edbGIiXRAjbn26sSDsgsRH5czs5DzZ1MI5OGXXk5OwN8tclbfWHLphPGLcZ7ZYNuOQz2yPGYfEiJIJ8+RbbHZ5b4T1/jPGPD7bbJ5uSfviervnyWDJNLMjvg9nt8ssvzxLYSVW+WywaWdvyBWDPBsTBnJO3xDnj2zlmQy2IDZyZdb4txkeE3WXkp/Ejuyb8kdsH2+Q29tk5NTt9nCHL7ywNiCWNth7LbBJkW5bHgfyPnZXJLP+Q5a+B2Tlw5af+PGt9vyNg7LnIbHwQXyexhDY0bps2DJNLi5aT9sbu25Dvh6xyLIty+zyzbPFiDxR88LJvzwttssvnpJNu+Fk2WR51Z+QaQZMHZIRtk4e/SOW6XdjwtusGebfZMsi2fSEBk7Mgcvmxew9lzGQyMfb45fsDtmk/4WdnkisBAWETd5fkSckZcJaSpGr2+WfUm4jVkN+QszflsSciZNjS7HZtlbvm3TkGT2wdmzZZdS4QmX1s/dyG1BBhDy3sOy5fSztjbhkuhD/t9+RLlqwbMDP4D0+W+LKf4fNtfPyfWL7JBl+/xsPmybZnm2y+L4HjDlu2bPLeWnnyb8nxgb98JcLR8d/j7MzlknjFvZf9nrkqsyAfZ7wtqGzpfS4g7YE3BlJ1inZuP9vyVuEi+G354NsCRgksdtZ2Tboss9yy+e6R5vY5JsHhbftnds0kSezDM7uPkOnZ5EfYwWHb7CPkWcjl9jj5psOvmTARjs/Y+QTbsHg2bJnhZ4+M0kvvjBfvg+Pn5/OR98/J8Hxe2z0s74WEwCflsatkfI42ybZZJffP2TkDZDfZfkJl2ZZfy+2Z4lknq4eLfkVb/xH+pwTpDyTkjnIL98t0v+pUnIbECSiw5DsXeS2+MO+JyzPHrMvpPk+3cut8hhhJlnSFOoeW7DNyNEX7JfkH7GRxCMhkptuyWX1sllldEOrd7aS3xqGzbGd2+bbYmjExPy7PhsN8l3wn55kch5PSzP4y/I54xHyTwt933PBk74MzfYt5ft9LOxbyOvPlttssEwT4wW5PYMu7DfU89JPd7PbJP8s25cj9MLLskAbCZ4Q2AuJ+z8j5cMxOo5Y+krsuzF0Q5Pn5fsnbJDGImbeQ/rGoScnJNhlnbD2+bCDYmglX5Y+cJd54yOp+eGP2As4vl0xoT9sefngElsEvj4nLc5ET8kdlyHb4kxj1PBlM83LbclffDMt9/b8k8G3wkiS5IX5G+nYOwX7LsTLlsMT98zPN2SHxYXb75lnZtwl2BkVggd8+3yImWXTLlvIfFy3fQsy31bNkjh53YGzICy+pP5asikgMWT4ExbZBPJbYcnsY5La2edh2y5lvbD5aTYkwIFiDkeHjyWyyCeQaTEyR3zBLSPhLP5j82bfJB7L2GTsuQCaR8lnG3GHbhui7JD/OXC+xpbzxpk/o8L9tn7/DHhPqeffDJ/5bfZOxNuxZb5s/LsOW63yWSzz5Lfl9kg54EOOM8bew+bk4Nu5aSSxyPlkSb4F9hljvjt8nXJ4X0umxJbZ4rbedjJ4w07Fvv5BPC30bbf9s1gm3smkmXUYk5ILrbGZIR9k5HyL5Hgxd2LJ+ePj8hH7HGXwR8kWDCNioXM2D9iRY5ySzvjoicWYz9s7JHyL4b5htkWfyQs81LjBy/bNPT74y+EWX74M35Ezwly22DbMk2DGzxPAm2Xz7ZLMfPTsGNz1wz12dWCP4hEVZZDex8ss7L6SySDPU2y+rctNsVgy3ZX1vkOw1jC3vP43svI83wC3Ect8xDLrkJZcyw+28h3z8s7sPIm2LYYcthsFoyckyJ+WRD4NgyJxsLBJM56yXssZI+DL2En/l2GUSAPkNtvfCJ9fkp6WTN+2jksp8Cy+Hh5+z2PvvxnvgYSdshyfkwT88/Ltg5/K4+aW9t8OtnmeEgyTyW+dhZeX6F8wX54MsHbLJ42bBtxaxM9IazQTv5G52JN85fJNgmftlsSbEPmSC9vksW3DSXL9iSTt8g2+EwR9jzPG33Yl75WxZt8jGSJ+zjl1ZtrfsIs5YNkF+T6Mhl0Zdtly2yzsX5ByfvpPrEdLR5+emMuMO3DDDc8HLZPfzzdt830G/5Z78iZ0wWckjkm35b2zvictDL4dJjk9Q6Wlk3yLLI8lDbFs29uW27ELMj7M/YFhnu9yOWm/Ydm3PTuQ/7ctu35bBt8jbLJtv2XsHZY+w8uPzwS8h524yLRyJ9snSPl+Ww+EMRZP2HLVLNnkkFvfH7PYhtdjUnJHfH7LNkFnZ+X5FkOwXyAzbLEi+vRmWJIlJyYfOXyWdlPO/yvLYkkskiyDkFsttts35ZtgW+N83CHZ69b8jpYFt9jCxvnLJh76wZ8jT5Ct0sY2GwttMm3kCx/uzJx2X8sWVaI+SSduHhNgloS8jY0b9v3+Ess7fJ6T58du3IZ2+2STpkh/IuvlnLbseHbPA23L9vkMNpv+rJg7ZDKFplzLOwzkHOW49l+wMx89O+HSSwyY+eN+R2VOR883k/ILPC2HjEya3DIMASdgn5Hj8mHGXkJZJ2yzIfGWZLL4tWz8sYPc52f+Xct5HiRuyobXbZNh6xZ5hHkscn7yHNttsscgnCBMWyXJWTYOT9tZchHFpKedht7HZGyXyfMv3zeza/IHPAk74emRD2eEttvtklmW25bH2ZcId9+xzweZ2yLNksft3bbILDJctRHsmLafscY6X55vb5HyOXRa7MfLbZe242keQ75+RPhbPZ5MTZOkO3Sfltu+nyYNsvkM5DKw+LLdfFwjpO7HJZXbfDkt+3WTL98HzIDAL/xPzy28jvh8nz8tXfA/nmQTLkNgZHHkPJsstEuw2PIxsnkml+Qv7OGzYMkt9+WkSx193C+xPmZJfkcl5DLdlyId8EiYc82PvieDkN+37DMfJMk7IwSeHMjsLZcsSftvJ8zvm8i2SWNb8s7fslgyQeZskHJct82e+ExPy+rSSyIsj7J2JPCy5LZfl+SS5y2e3xB2cnw3zJIM8TB2Tb4ueDlrbPSfbs+ZHC3fCQySCfLoghldn7OxueDK7DCSbJk7ZfkZ2y7DhaZDtmsEShby7Ewdvy5Hr8nkdJLQ26SaRwnswYWsc+yhiTtn+Ry+nmc8yb88/b5L/LsPIttMM9nRh2SzeQYtVjdkWDPGZINlkfZ/jT5HPO29nEtthxvsMwz/AWdsk9+R/sdkyL9h9eWr4bbZNhkmZGwZI+3C5P22+WxNvi/yL8l5Z5k+Zbng3fCeR31uv2M8fsvZnLbey4Q7ba+Hs26XRm3DG767IMctjssEllmxy3Z2Hlt9mzsOW7Db5CZH3zti+K2cswgXGBsiS2IJCeL43/bbb6R8jn2U84Sw6TxviHtptlvb8ldnTBkIYdnws6Q6zPye+dIuoctj5sPf4SDwjx3+S+W7JEeflu2WT8gZf5FyXku98XImZfWzw95br4y/Ie/xlmeJ1byWkWhCZPY56zB4+LZBy+pLMtn8eb3LN4303TYdn5Ox4/mXOw9nsuRcs5b5snLWxJZJluSsOHfPjL/AG2NlvswqSdg8Y+z2zwWhtn773b5bZsE/bLL5Zs3BskCSym6fDCIdILPPlvLb54dss2QGfkPIh8zw9Pvi+ZYXIyyzLd5Znm5DyDs7vu8vrfkcttkGMWbJ02Yc8WQ9n5DHnLCW3kdh/noZfD/ALLMuwE5tnIPDxmG2YkLbeS2+P3z7fW+0HqEHI7aI03dsMmEawNm2ZZ2+Q7yPPyyCeHjVIP9sPBhnSXbSGY+XGNGXWHY8wg5PPAySTNsTBvgz9n5fkjsPO27LzJ4xjYbfLeRu8kWyAbhgfPGe37H2fkjaGN/fAlkvDkdsyf4JfNl8y+NsbNulnJhsbbb88yzzZYcYDCTZBZDYRE5Zlnucv3zL8sLfFzw9syTS7sIhLH8DLC+xni+ks/I8XCGBl++IiQ2HCRka6QOWOzrHLb5fYJbbdg7JJF9h2Pno/W5+R87OHyefJP7N+RmXfAnzZcsG4gfH5fsOWWQbfJmy8h5D+TyXnj9L6jk9viezy+J8d22W2SWtsvyLP2+k8PGIPRM+b3zY7NnbLLJIOXZfyN8yIk8vserHr6Wf5d8Fjk9kgybPE8G/bP4DxNgAl9SAiZ5vhNvi98CZM/lNMjEcliHPJ/YH7O+kMIZP27sWN1i+TOQRxlieRP23kfINk5lxbyS+JMchd74Fk8h5to8+3yES31klizbpKG+z588H/b58/kkt+WuQm3wOSh7CkQbfH7fkvLpYMmLez8h3wn54sLrseHPRtsmPlvgeQPmy8liXC7Enm/wTvgeaMyw+ETZ62ejkvIeSwRJtmR4webfSTJn74NybMtvyHXwZiXJqYQKlyztjJZaWyQPhMxOMQbJnj6X5J+35DfIduY+T0j5Pyw6S1m26bNxbPViHIhPJeS7bkdsdmZPV9Wdsgk5fUfLN8M5ZCwZE6slB3kDb3LAQH+E0njLk9nDEcZ+emXcjh4NsJnh52yVsuoEbZZYm3JdtyJ8Yjt8Yk1syyCbNsRiJM82JvhC+PyB9wthlwusct8XIeWkIkySedhll2bNLM8UiXL42W317Ay+MhtLgyY2+sl8i3wts82zYJhHl893kN9nidg2ZH2HJeMM3bNIElLlu8syyGTPyz1PA5ByTJR4rDr44ctDlwhW4s2DC1IC3RBCHJZbEhgzxNj/ADxvJdttZfW2PTl+bEeDJsGS27PL7ZEGsh5mwyybZDn20vyHx7BbMM9gAtLdfM2xIGZi3w56vi6Q4W7fIeX7fF1cT30Sx9nvj5sz2z/LqxnbM+WTq+4GD54u27Bc81It9ssu35bE374xx2HZZApByy2G0kxnfSDHzdI4elmkHZOQWbfGHzOSWS5bsGlk4vt0WI37Z/lxy/SH7bvPOtjWVkMLO7DC+I3I/wCW225DtxarP23wXxGSRMFmx/llmQ31g5Oz8i2bYL5fWYJ/hh43vnYW/Zg7LfTwF26Rv7Nl8ZYe2+dmyzl8v2PC6MnLM+Tuy54m2YWWZ4+ZfsvLr2GZ9JchkQjBaFs6gC0tgSzuzB/DsGNspPfD/st4Q5ZZ5lkM9uGkaQJ58WT4X5fEScsy2zWCZcnqeLdYNtCw2EllpJsxRIs8Wi/YYxsCXeQS5yNLfyzlglyHs2y5PfDN54Dy4ejlt+eEvZY+wFoSeft9m+wkBbCtuW+P2wQ7aW7Mdssv22WGWXzdjJbqQ4dkRjP7/jGCyyDsHb5bLtrnjP4Sd3zYPU76rBb+Tsr8tbsPxbmN8tmB2xG298zzJ+R9mLJ+cnSUwt5Cx18YdIOzBp4mII5/H74aHjbd83CHZk1nqOLi+Q2BIsJlng7JIxbLIMtZyD/bR8uXZf8AJ/23k5MwjrPG4m3l8X20jnj4mDxbYXZjsctttlsjxuQy1/h5JntkcvsGWWPq9nz54xngMH+wku+dGFyVW7bkQdlt91LfH5J3+vizfHy2SRq2x2w/fP2fXtzAkndtM7EneR31YWjfnidmCyCY/wDETwi+Qy5ESbBZy+pflkeMHYORbhMG2+xLkOzDidW32S1G3S0MtJjDbfSZ6kCCCQk5B2+B8DeRj5I2h83t+W2bYwISxuUtIdLJL88Tw7BCC3J+Ww+JyyCSHuX5Fmx9tDw7HJj3eyfvhNmHp2fksHb42TD5vo21I1aBbspNrDsOMO/w32XPD2SfthaSrpgbFZHIgLGPsDd8S0HLFgcsvkeMhrHC2+yQI+Mvmdvvn5dl3kH+BkElHF8Li3b9sh5EvJtiXI0QDJnyH8F+w2eEdbAiXGWFCEZIXyOSw6SaSY7OoXYY+WDbPjPyTLi39njwNIYQhbpy7bBMx25LpF+2TDLDLbbDHbeQ0n/IJI+RDP2HxZNtnrZH3+BTzJMm3k3yHkrC5brJLsfLdjhfvvy+2JLZ5DM8nrJk7IsGHfMsLAYvkwY+ybbrPBmY2ycWzxbhgwjtuM4bfD5bBPJ8Yn7f6siyDs5Ns9mBN9gjIcmA8cb8llu+GMkEah7L2eli3btmzD4PJnqeS/5J+W5KMFgE4t/gsZNL6vwsNn7Kyck/ssZ+Qz49QwmbyfBMk2bsQckh7fbEhy3WNLZWG21i2S/PVvtnjfnnZu76c8+W6wWzmSw7YvqbsPny3k++PHxv2+IFuJkg7Z2fsJ+Tcty2cEtgw2XDb6bLG5OI3b8si+wch7P2L9Ll2IMqMfL7PPRiW0hmHFvZEZaE9OXy23fnhsueA75k/Yiez1BjIsQdkgSN24b7ZJLl1HyVIg2ACTGDS4eTRDbIe6FrmQ7B+2jZPZ3LrlmMhJJSGGVC7bbrM6Etskgh7Jyw8/J6WZfSy2/YsPdtnVvyO+DPhL3+SuZ4xu+PfOSK8iRYLLffrxIHZLO+PJ8yTGy6LBmDsxPbVXJu1biwjJLPGW2Ty/IbN84uuyLBtAlnV9XsqX2CBjrJhZsI0leHGxAT4+vduC0s4PF7t57kF+2dg7IYMntiNrAThOoeWyLfPsm0gJQsyl5ZcY14uX7JYOduWXeyduw5dMONs6gY5DthIfkDsE7BjLkNtlvL8h83Ld8zsmNnLI+efngdvyfl8eZ4+LZNso+Qqdh2LPUkW3ORPLWSRq/Y8GW/wlkzfIZLuz4XF0zsW/4uFp5GFonhaXDCOxAGeyy6uSKcW87PYiZcL7dj05bASXDETCY8DJ2Tdgf3wEGRhZr5t9uW9l2/Ylwh2yeSXwb5b/kNmTsAmLWyJDyTthZnR4EgCRj7bHSdEISGR4X2f+TuXbeQ622LJHyPCYPO7BlsNpPy+3y2+375+Wlts+MF3+n5BBbbvjBJsP5Oybtg/YAmImUPLfcnw+flhJZ3tksLJAQiRs/YBIMlMtx8BCMiKPm+LY0thPfsfY+3PbQjbu3E+bfl8iUHzYbe2bZlu3y++H2Pnjg8T0ybHLdstzw7LlquWhyVYR46y5Kts7PSV0v9SJbJBHWzl+eJ2C6ECso7DG5Axtj5K7fb54dnkLZpCzkHYZfdtt7MTOI1Py/I398yXC+w5PTkcZbWx8/jO2efsmw/2y22+e7bLCzY++Py3uWSx6MpYXY8Zs2+W37ftobptH3Nh5bhaWk2Wl/ggf08F0uG2HI8kmGT8kkulwY+wMlmLGzvjJLAIfV18/bIiGwZ4QbZkpJ8zbOX55+T4duwM4Qrlw5DdR8hkHbq1GEyUYYchmJ23kr2CfbLGDt+R2xIsy2HGdXVxd/L9hRiy3b5ZtkPb7ZPCew/kmfIVbLMljtlySybBsxtttttnrfJYZO2SXwh22zn8kTJ3z7598CTeQdjxln7HbLPGCGW3sdQ+JfJ7BjPg1jnyOxF+sJKJP24L/i07fIRYkMGGQx2elkglySQvpbsO6SUgiQX2fMhsfbJ9Hl9vniRyzY5HYR4d9E2+x9k8+ezJ1jnjqx22TH5uGAlhuziWJLhZ2HbGY0zZdeckXMg35CmJObJ2SHLYl7DkOxBfC6sjd8Dzb8slg7Bs+iInwobdj7JyHkaX1kMg7ZFizw6zyPnjMcmOTBP3wZYm3xcLVs3wtmPsMPit3xtl2QYOwwyB+wcuWE2Y5ItgWx8uxD+QPgfxgk2DJsGBHIbaw5MeQwW2+/vg9tjxjkEEMJXY6WZDYIs9XzGWnyMFyeQr8mR2zJNJEnH7AkdsBJ3TyXmWSeHZj4imt2Xl+ybfFhIfAslyW3xgjzJGGfB7D1+Q/nmbDjYWREy+kYvyd3w84Ny1WCDJdY3fGW2fkLuPmy4xPzkb+3y3YLC0SPkqW7bfLdiIb8sGcMzcyyDJf8ALJ023LphgD4QlSOESRxuiNJTYHy3sG2vy6RakNmx4Ih8LLb9u7D2IX5bvgw3RP2JtbnhElmWo+T3Eh2HfHrBs8mfpYWZGJKwSDcE3EZv7DbbLfnmIx8zbE9WIZathT8h7GxNwjG4Wz8hbbdk8/IeyTz3rpEHjhjBfeXVBkuS2f4TYuHmQQZHpj3J03zxkWeQ6SN0Lednt8LBYbO2x0kx8LZhdSfAra2TCP2AWCDvqyMI5baX0kkzlqoLfEL6tdt0i2Insllmweftwtshn0I5F0ebyX1H8jT7by3zeXJDC+WWbHL7Pknxhl5DY+ZBGJctEuXL85C7byPs3YuQRtTWHxYSbqI/4n5EQeJHPMnl+T/y1IYd8Ptmng87fHxxkLOiMsGESbE55vIb5ZZ2bb9jviSWWWW+HJxix3x7BhHj4W6eOoxYeh23zN8JIjYSKQIxYrcEkbWHvqeJyyTtkOTrH/ZK/LOwBJ2f0SOwp9jd82GCSYbbb9ssvyLJjwfNt7Nvf42PGAMh3beW7fkH7b4NPHzLBPHJOQ59tnbHfWDBlpdQYWC6YbZGybsQgjBZk9L4zHzSW2Mv31zzIMl5fUfIWefkNj/HwexsEv5Etlj4MpO28t8ZIc9S/LNvhF+eBrPLdvz3OWT45EzA/vgmREeJJpaJ3wmRxl2xZ2DvmkrZhskCeQy9tueJvvGy/Pdni3YIaQcsy3xiXksR2+RZLsTfLbb98/8AI2xtj075+37fEfI4Qb4H7fbpsw8QfHDLjbpO7fg3V1ftl0gydY6uZOkPLrkBkBgy+z5lkLsrfbMfSYl4+T3zYb08MMcIRk30buzdsz7aJFkfOy7fkZLDMFuWq+5pBl9gs8wbZpb6WWdtl2/L8iIY8PMlm+peRpuTI54QzO2m3bLZ8BPGPskRNsTH8aCWx8u7fCWyyYlfy7cyJYb8sn+GCMPZwhuGyyIcuk9W9vsnJ4Qcg5BPy/Yl9y4N+xMwxDc3YkLOS5fUqXkuQP2TkTfLf5xnk2ctPkHmnhZdhs18qPkob8l5Bnm980GWG+w5Bl+25OxFy/ZttlvCwOwer58t2eRYxSW5Lfkds7M/OQKOEQw+v2HZct23WGfh8PuWR15kPHviNkPmTB7vj2GWxkre+Fk88beW27EuEtnL8jZg8Wy+ewPn751HLbOy5EclsHPPsDaGWYjGxNkSwtrTZMEJBt8WtoZJ2OyT43YtiSeQ2Gy35chy1nIURyK/LVuluWDIl3POzx8PtvZ30JPRcM35HWAO32+W7NkFg5E+DbKWbHgRNbYdIHyfBZLZbfZfnj54IbEkncm/b8lbgly6nhK3SEmZ+Rfv8bOw+LhLnrMfPXscnY0t8PvhlYYktu+flvsEfZMbnieBKbllvI9L8vl9k7byGHviycn5cRZLfT0lbl9Rwht7Lsw88XCHYktz7ctJEOlkfYmV2dbG22+w5bdbtkmwWTlxPDz6T98L7J2TkLI8BNsMi6lC6+R8ifA2SNy0COxZjPy+RHyG22O9kZGGHi7Ftn7L5vi6St2QT0h23Gw3+Q9e3y334uEF+S2zzbfEmXzO+BcT9ut8IWw8vkN9tjrZNIM8jfZOeK5d/Y+WF2DJe2WZ7sMWXBBv2y+WybZN+QPmnb4tFkLPd5DKX35byXkQ5a2Rb4hTuR+LdIZ9t7fZnzOzMyPA8WR4d/ZiTbM8LO+E2SOw5cS3C+2SbZnqa2EseA25OyG9nZIEEnbOT9yeJb1ZBnj08S+X2SEeP2WHwieQslbJh82+x4W5bZZ5+9kJhAz1O/xl+30giOeQ5HJbkSS7ls+v0LY83bJe5PY9zuxL/HCEvpCHGOyZbvgzYMHzmFnZ+Ruynz8shS/7bbK+yXzxJst8Uk2Rflzw++Mmtnmt8Uh/l+RMW3b7HJ9eW2+cLfMyztmeEkTtuX2Plh9s/LUPgnubJ4IwxL422w8ty3fOR8ktv+223fN8yPGdzkDMeGTnj982+2ZZ6vLHy3l1ZhL+FjkH7fbJt5fA3HwbO7Dshs8kX1yDlmeZcJzPDpJpJKfl8fB8ztmWkPbjcy55jJlf7Dhcxd23LZljsZF9PN56x4RPyGPsviN+erbZ+RjJ2fB7Pu+AUkHvjE+ZOQ98NW3Jdnt8I04SP+2PrCWQcjxNjkLhgR2025aSwyCRFlueiztrLSdi/b54R7uMtvI8HJf8upn5Zyzvi5DfZ8Dk6eQf77n7Pn5DLGyXLIJYcs1ubOeM+wgS74T6pgrDlsnfM15fPtxbfZzZTJeBjstiEbTZc8at9hRnt2yXI0X1HfMyIJIfG+EM+Ox9v2G54w2zD3tlngk5bvj4T5pJvvxyXOw+B2ZOyW5GS2AyDJNupMhn8Fu74/8ALfx8fEcndk9FyxkJLNt2C7sxMIMuwWw9ltt5PINNjkkO/b6szxifPtnJZcYvy3GWHfN8yLkttn14Mt+WRkTf4k5P2NPP30Z8L8mzvo5H3bd8AE8Zc5fHbD5fEchj7Ds/I0ey08Db6glyXWDCzY5NsFwt2yJ1Z0IYsJyOt8ty3bcvtnZizYn5awK3w8WX121yDx8zzht3x82TzCDIly3fHb542MkmGWewebrNtkPbbRn5ftn8PSJeWa3y2bfFhnrkcMtLb9lyNffGOS+HmIwbZjbP2zkWbZbkOzPyCJj7B2QTbNsy3GSl9W2RniQf0WSWxYJJkeMBjrsmHId6jE/YgIx4ZhyC3lsT98GozfJ2C337El9sLP8ALEiyYCM80nq/O3I4RpyfkG2YT6w+koF18kbGSW7P6j5G7Ns2x2yCzGevmw+fJFi/J8fsILNkxvy+NmwK+DCPB2TsE3bZ7ZZCQ33xR8kR0hWBnYxuT9nnbSNM7BMQTCl2ySWPU2DLY7MeftuR2y5L6y/PCzZmX5byPty33YZbe37G2LEnPML/AEQiSN2+LO+MjsOOWaXEZaHwYfsLctwtY3eyebDOW5bG/wAbZblu+Zdu2f7OWWQC+xmzZ5kwQT4pgy2WekGW8hW+T2zl8hHyHY5NuELZZkuS8ifbch2yOX2d25OGHWXLNsBH2W02HZIlttdv+w37ZpPL9iB8zZ5KXCwY/wCyR/2Pk9MspY+Tvu993G2Oya2WTwhjllmfwRIcjpdyAx8jrESb8t75zPEj0++CFuQ6Xy1klvyxL4sI1f7Tgvjs6dJJxhyf6QbASOFu8vjHbni3Ykjx5flrPyDbIL9nlvLfV2z1vk+F8hn1kf7CvjfkYyg5cnT5Gv2XJPyEzuwcjL747sdP45y+L7HJSw32EkAE+E/kLmtqDIct2Tvgs7tu8nCfBxkL4wzE9bAv2eMH7fsst35C6gk8zZMhtm/bZ2W6Q7ASWy2evG2/b5vqS/IdvzlkoeAX55tv8DHYdmBJ4NtnmaRpLsdWf5OzD5vJd5BksviC9k/Ybuy2+bDHWzzYJIbYY7J4h4ueDy22JZ+3xfVu+bN8n8F11vnjy+kcnbtwIubYs2S684WlmnJMO2/5YoUlsQwd8PkRPydNkxpa72+wW+HCHYM8Y+W5OxJnnLIgn7JlulzJ7HGWr8lP2AsIhnvny3bPFyO2cltjvu8iY+T4m+PkOS330cllffN82TsEno9k7AJDHxgt8PGzWXIffjDpA5IwswxiJOX7yHltvmXyUswW22Pg2Wclflqfb8hsYIm5DGTg26ckYksmRYJ9TS74s9hYHZPAxOBHYIEhIJOB50wZ+yhl5a3xs+JI7fJ6z8h8RjH2fb4ns38kj8Qy7J4bC+Tq35FhLY1cLZvyGXI23Ld/hghh4Sw7K7DLdvscvz0tllxsss+Qy5C7/DOwpdQ+fsdJOWQj/sJJ5y+zJ+l9+wWkwrCJXMkxL9vhKZbkXJNsPCSHJ+QSWWeJZCzDw8jH193CO/bct5IGFbbfs32yXLZS3ZFg5d2GewZ5lxD3wOR/2xAmWY2cssjnjsBnr9me2QnlvjF03LKB+zlvLI4Qmz9s2COS37OzJqDLByyw2cnvIMm38uR98XIdkgnkm2cvng9mCcmB+zFkf9kkSbFuC2y4j7fngyE35BZfPByW+rdlwuvEssJb8h1j5Kl4ZDIdlyANYLIHYR7PZLIQ+C5N8LWEvskmEeZck2OeLZ/kHZZbNsj+HHYfW2Jjt+z5v5ZJYFyYOeLbry7982K79u+B2f8AkuXUy8hFONlp5+WefZDOYPH5Z3bhvyR21Alxt8L9ly1yBessPL4jN19uLy0Q/wBvySG3YJIyywYMh2W1fR2xyEXYeSjKT0kg7BZ20JSw9kL5LATlphn33O/x++htnbIDDVo2gchmBvniQBHL85fsySxlHSBtocg5Exq4J4z/AIhzkJLG+eZ2GW+yRflmX7ZvvZnYX9hliZi4k6o7/GJ7Ol+QEuEJsvi22Eo+WrCXsGPnxl2O/Z83IYQf5JpBvJO7fEgth8J42T4T2xGPsuWjZD+TbtmkYI2yzS13LeWd2QFrqHvy+8ywndi/JCPkcYb8uX2SNyHJdhjw+7flnbDAq2ImyxDyf9t20YMtlgm27kafYdkdgi13zI0urLpPtjDPXz8jZnIDfkMvZe30jDt9sd5Gj2OwZfkdJauMqNsB9j5by+odLcicuC0+Hi5bs2X741fPPtkEeThl9fLeQaWCTb7s7EvbLPNttPMsLs/POxr7BOZkGHnLZdvlq5b22GURbfU2zJ7Iw0kx8wPG8lbhOb7oRwhWwHPCCeQ2PmWQSu5fLbYfMiPk/fcgxtiOSz98CbYfN5E+KEdt8SJ+Rmcjf2OM230t5Epf6h2Myex5kzy3kD9SHy0PbdsPssurXYM7aNiR8l5PfD/xJDb4X1krKhNkO24W7JpJ4T08Lu2x27DkN+Rtnm8m+glpbb4zGls+Pbc9O+JDNELbSw2ymX/no7cGxos7BPL8htGiB3sviyb8tzz5CZEmzpN2NLQQTyz9ly+xEkyG22wYCOL5whnsuERXY0LZVjz8iPFbNty3vm29822+vNydMNst+Sv2NWTpshfvjBpZltnY+WQ5y23L7Os8viPDzX5PzbSSSCN9w8k0jDAWMhMrm2Oyy2YMOQYO9mWcbHxJJ/iXCJ1OeQ8i4yZEmkctmLLJLJjy5PP2fHrB58jXLGxvyG/b540mA1tiHt2XxbyW3Yk3IzJYi2jqL9nlsWxI2Pl+weF8To8k3txGSkt+eLJ7b22WPs62Bfs7t+Q+JyMiEXyN2GexPy3GW+2wfy3vW2Y7J/lsvIa77+ROZZ23st0QpInwcnrfI82/fHxl08Ht+ed8+lmF8dn7YKwHPC8lm225LZrt9bi3bC6duLFoz5yXXvhNeQ/2P+QtvYDCH/kQYRsgyfsdnweRBvizmXwNu/L5dfA7fLZ7JkMpbB33QLTkpKwO+CQYSwy+JBhhyflo7skh9EGEDJJK2PngbdtvvmaTx8+RNnLJMhtkMZbdIM7DrMOvjH2H8sib6msl+SRHLdn7fbM8fkkHJch8zsIYSzHy3b4vuSzxgY2Xw8zbL5D2SzPBh7DKyHZct7Z4svy0cteowwxPJw7ZtnIO+E/ZOQYxMNWpOuRxyCQduHICySzZMkdsbjIRy+M5l26JYeDsW+JDaml1xs2eN9IOzEuXXny+oeTmFU8/ZAbPGGoJP+WNucmJMmSHFRji4tQefl+374fLh8//2Q==";
  }
  
  getAbsolutePath = (href) => {
    if (!href) return "";
    const link = document.createElement("a");
    link.href = href;
    return link.href;
  }
  
  // open URL in a new tab or window
  openURL = (url) => {
    window.open(url, "_blank");
  }
  
  // open project wiki-page
  wiki = (page) => {
    window.open("https://github.com/Azgaar/Fantasy-Map-Generator/wiki/" + page, "_blank");
  }
  
  // wrap URL into html a element
  link = (URL, description) => {
    return `<a href="${URL}" rel="noopener" target="_blank">${description}</a>`;
  }
  
  isCtrlClick = (event) => {
    // meta key is cmd key on MacOs
    return event.ctrlKey || event.metaKey;
  }
  
  generateDate = (from = 100, to = 1000) => {
    return new Date(this.rand(from, to), this.rand(1,12), this.rand(1,31)).toLocaleDateString("en", {year: "numeric", month: "long", day: "numeric"});
  }
  
  getQGIScoordinates = (x, y) => {
    const cx = this.mapCoordinates.lonW + (x / this.graphWidth) * this.mapCoordinates.lonT;
    const cy = this.mapCoordinates.latN - (y / this.graphHeight) * this.mapCoordinates.latT; // this is inverted in QGIS otherwise
    return [cx, cy];
  }

  ReliefIcons = (() => {
    const ReliefIcons = () => {
      this.terrain.selectAll("*").remove();
  
      const cells = this.pack.cells;
      const density = this.terrain.attr("density") || 0.4;
      const size = 2 * (this.terrain.attr("size") || 1);
      const mod = 0.2 * size; // size modifier
      const relief = [];
  
      for (const i of cells.i) {
        const height = cells.h[i];
        if (height < 20) continue; // no icons on water
        if (cells.r[i]) continue; // no icons on rivers
        const biome = cells.biome[i];
        if (height < 50 && this.biomesData.iconsDensity[biome] === 0) continue; // no icons for this biome
  
        const polygon = this.getPackPolygon(i);
        const [minX, maxX] = d3.extent(polygon, p => p[0]);
        const [minY, maxY] = d3.extent(polygon, p => p[1]);
  
  
       const placeBiomeIcons = () => {
          const iconsDensity = this.biomesData.iconsDensity[biome] / 100;
          const radius = 2 / iconsDensity / density;
          if (Math.random() > iconsDensity * 10) return;
  
          for (const [cx, cy] of this.poissonDiscSampler(minX, minY, maxX, maxY, radius)) {
            if (!d3.polygonContains(polygon, [cx, cy])) continue;
            let h = (4 + Math.random()) * size;
            const icon = getBiomeIcon(i, this.biomesData.icons[biome]);
            if (icon === "#relief-grass-1") h *= 1.2;
            relief.push({i: icon, x: this.rn(cx - h, 2), y: this.rn(cy - h, 2), s: this.rn(h * 2, 2)});
          }
        }
  
        const placeReliefIcons = (i) => {
          const radius = 2 / density;
          const [icon, h] = getReliefIcon(i, height);
  
          for (const [cx, cy] of this.poissonDiscSampler(minX, minY, maxX, maxY, radius)) {
            if (!d3.polygonContains(polygon, [cx, cy])) continue;
            relief.push({i: icon, x: this.rn(cx - <number>(h), 2), y: this.rn(cy - <number>(h), 2), s: this.rn(<number>(h) * 2, 2)});
          }
        }
  
        const getReliefIcon = (i, h) => {
          const temp = this.grid.cells.temp[this.pack.cells.g[i]];
          const type = h > 70 && temp < 0 ? "mountSnow" : h > 70 ? "mount" : "hill";
          const size = h > 70 ? (h - 45) * mod : Math.min(Math.max((h - 40) * mod, 3), 6);
          return [getIcon(type), size];
        }
        // if (height < 50) placeBiomeIcons(i,biome );
        if (height < 50) placeBiomeIcons();
        else placeReliefIcons(i);
      }
  
      // sort relief icons by y+size
      relief.sort((a, b) => a.y + a.s - (b.y + b.s));
  
      let reliefHTML = "";
      for (const r of relief) {
        reliefHTML += `<use href="${r.i}" x="${r.x}" y="${r.y}" width="${r.s}" height="${r.s}"/>`;
      }
      this.terrain.html(reliefHTML);
  
    };
  
    const getBiomeIcon = (i, b) => {
      let type = b[Math.floor(Math.random() * b.length)];
      const temp = this.grid.cells.temp[this.pack.cells.g[i]];
      if (type === "conifer" && temp < 0) type = "coniferSnow";
      return getIcon(type);
    }
  
    const getVariant = (type) => {
      switch (type) {
        case "mount":
          return this.rand(2, 7);
        case "mountSnow":
          return this.rand(1, 6);
        case "hill":
          return this.rand(2, 5);
        case "conifer":
          return 2;
        case "coniferSnow":
          return 1;
        case "swamp":
          return this.rand(2, 3);
        case "cactus":
          return this.rand(1, 3);
        case "deadTree":
          return this.rand(1, 2);
        default:
          return 2;
      }
    }
  
    function getOldIcon(type) {
      switch (type) {
        case "mountSnow":
          return "mount";
        case "vulcan":
          return "mount";
        case "coniferSnow":
          return "conifer";
        case "cactus":
          return "dune";
        case "deadTree":
          return "dune";
        default:
          return type;
      }
    }
  
    const  getIcon = (type) => {
      const set = this.terrain.attr("set") || "simple";
      if (set === "simple") return "#relief-" + getOldIcon(type) + "-1";
      if (set === "colored") return "#relief-" + type + "-" + getVariant(type);
      if (set === "gray") return "#relief-" + type + "-" + getVariant(type) + "-bw";
      return "#relief-" + getOldIcon(type) + "-1"; // simple
    }
  
    return ReliefIcons;
  })();


  Names = (() => {
    let chains = [];
    let vowel = this.vowel;
    let nameBases = this.nameBases;
    let ra = this.ra;
    let last = this.last;
    let pack = this.pack;
    let capitalize = this.capitalize;
    // let locked = this.locked;
    let rand = this.rand;
    let P = this.P;
    // let unlock = this.unlock;
    let mapName = this.mapName;
    // calculate Markov chain for a namesbase
    const calculateChain = function (string) {
      const chain = [];
      const array = string.split(",");
  
      for (const n of array) {
        let name = n.trim().toLowerCase();
        const basic = !/[^\u0000-\u007f]/.test(name); // basic chars and English rules can be applied
  
        // split word into pseudo-syllables
        for (let i = -1, syllable = ""; i < name.length; i += syllable.length || 1, syllable = "") {
          let prev = name[i] || ""; // pre-onset letter
          let v = 0; // 0 if no vowels in syllable
  
          for (let c = i + 1; name[c] && syllable.length < 5; c++) {
            const that = name[c],
              next = name[c + 1]; // next char
            syllable += that;
            if (syllable === " " || syllable === "-") break; // syllable starts with space or hyphen
            if (!next || next === " " || next === "-") break; // no need to check
  
            if (vowel(that)) v = 1; // check if letter is vowel
  
            // do not split some diphthongs
            if (that === "y" && next === "e") continue; // 'ye'
            if (basic) {
              // English-like
              if (that === "o" && next === "o") continue; // 'oo'
              if (that === "e" && next === "e") continue; // 'ee'
              if (that === "a" && next === "e") continue; // 'ae'
              if (that === "c" && next === "h") continue; // 'ch'
            }
  
            if (vowel(that) === next) break; // two same vowels in a row
            if (v && vowel(name[c + 2])) break; // syllable has vowel and additional vowel is expected soon
          }
  
          if (chain[prev] === undefined) chain[prev] = [];
          chain[prev].push(syllable);
        }
      }
  
      return chain;
    };
  
    // update chain for specific base
    const updateChain = i => (chains[i] = nameBases[i] || nameBases[i].b ? calculateChain(nameBases[i].b) : null);
  
    // update chains for all used bases
    const clearChains = () => (chains = []);
  
    // generate name using Markov's chain
    const getBase = function (base, min = null, max = null, dupl = null) {
      if (base === undefined) {
        console.error("Please define a base");
        return;
      }
      if (!chains[base]) updateChain(base);
  
      const data = chains[base];
      if (!data || data[""] === undefined) {
        // tip("Namesbase " + base + " is incorrect. Please check in namesbase editor", false, "error");
        console.error("Namebase " + base + " is incorrect!");
        return "ERROR";
      }
  
      if (!min) min = nameBases[base].min;
      if (!max) max = nameBases[base].max;
      if (dupl !== "") dupl = nameBases[base].d;
  
      let v = data[""],
        cur = ra(v),
        w = "";
      for (let i = 0; i < 20; i++) {
        if (cur === "") {
          // end of word
          if (w.length < min) {
            cur = "";
            w = "";
            v = data[""];
          } else break;
        } else {
          if (w.length + cur.length > max) {
            // word too long
            if (w.length < min) w += cur;
            break;
          } else v = data[last(cur)] || data[""];
        }
  
        w += cur;
        cur = ra(v);
      }
  
      // parse word to get a final name
      const l = last(w); // last letter
      if (l === "'" || l === " " || l === "-") w = w.slice(0, -1); // not allow some characters at the end
  
      let name = [...w].reduce(function (r, c, i, d) {
        if (c === d[i + 1] && !dupl.includes(c)) return r; // duplication is not allowed
        if (!r.length) return c.toUpperCase();
        if (r.slice(-1) === "-" && c === " ") return r; // remove space after hyphen
        if (r.slice(-1) === " ") return r + c.toUpperCase(); // capitalize letter after space
        if (r.slice(-1) === "-") return r + c.toUpperCase(); // capitalize letter after hyphen
        if (c === "a" && d[i + 1] === "e") return r; // "ae" => "e"
        if (i + 2 < d.length && c === d[i + 1] && c === d[i + 2]) return r; // remove three same letters in a row
        return r + c;
      }, "");
  
      // join the word if any part has only 1 letter
      if (name.split(" ").some(part => part.length < 2))
        name = name
          .split(" ")
          .map((p, i) => (i ? p.toLowerCase() : p))
          .join("");
  
      if (name.length < 2) {
        console.error("Name is too short! Random name will be selected");
        name = ra(nameBases[base].b.split(","));
      }
  
      return name;
    };
  
    // generate name for culture
    const getCulture = function (culture, min = null, max = null, dupl = null) {
      if (culture === undefined) {
        console.error("Please define a culture");
        return;
      }
      const base = pack.cultures[culture].base;
      return getBase(base, min, max, dupl);
    };
  
    // generate short name for culture
    const getCultureShort = function (culture) {
      if (culture === undefined) {
        console.error("Please define a culture");
        return;
      }
      return getBaseShort(pack.cultures[culture].base);
    };
  
    // generate short name for base
    const getBaseShort = function (base) {
      if (nameBases[base] === undefined) {
        // tip(`Namebase ${base} does not exist. Please upload custom namebases of change the base in Cultures Editor`, false, "error");
        base = 1;
      }
      const min = nameBases[base].min - 1;
      const max = Math.max(nameBases[base].max - 2, min);
      // Removed extraneous 0
      return getBase(base, min, max, "");
    };
  
    // generate state name based on capital or random name and culture-specific suffix
    // prettier-ignore
    const getState = function(name = null, culture = null, base = null) {
      if (name === null) {console.error("Please define a base name"); return;}
      if (culture === null && base === null) {console.error("Please define a culture"); return;}
      if (base === null) base = pack.cultures[culture].base;
  
      // exclude endings inappropriate for states name
      if (name.includes(" ")) name = capitalize(name.replace(/ /g, "").toLowerCase()); // don't allow multiword state names
      if (name.length > 6 && name.slice(-4) === "berg") name = name.slice(0,-4); // remove -berg for any
      if (name.length > 5 && name.slice(-3) === "ton") name = name.slice(0,-3); // remove -ton for any
  
      if (base === 5 && ["sk", "ev", "ov"].includes(name.slice(-2))) name = name.slice(0,-2); // remove -sk/-ev/-ov for Ruthenian
      else if (base === 12) return vowel(name.slice(-1)) ? name : name + "u"; // Japanese ends on any vowel or -u
      else if (base === 18 && P(.4)) name = vowel(name.slice(0,1).toLowerCase()) ? "Al" + name.toLowerCase() : "Al " + name; // Arabic starts with -Al
  
      // no suffix for fantasy bases
      if (base > 32 && base < 42) return name;
  
      // define if suffix should be used
      if (name.length > 3 && vowel(name.slice(-1))) {
        if (vowel(name.slice(-2,-1)) && P(.85)) name = name.slice(0,-2); // 85% for vv
        else if (P(.7)) name = name.slice(0,-1); // ~60% for cv
        else return name;
      } else if (P(.4)) return name; // 60% for cc and vc
  
      // define suffix
      let suffix = "ia"; // standard suffix
  
      const rnd = Math.random(), l = name.length;
      if (base === 3 && rnd < .03 && l < 7) suffix = "terra"; // Italian
      else if (base === 4 && rnd < .03 && l < 7) suffix = "terra"; // Spanish
      else if (base === 13 && rnd < .03 && l < 7) suffix = "terra"; // Portuguese
      else if (base === 2 && rnd < .03 && l < 7) suffix = "terre"; // French
      else if (base === 0 && rnd < .5 && l < 7) suffix = "land"; // German
      else if (base === 1 && rnd < .4 && l < 7 ) suffix = "land"; // English
      else if (base === 6 && rnd < .3 && l < 7) suffix = "land"; // Nordic
      else if (base === 32 && rnd < .1 && l < 7) suffix = "land"; // generic Human
      else if (base === 7 && rnd < .1) suffix = "eia"; // Greek
      else if (base === 9 && rnd < .35) suffix = "maa"; // Finnic
      else if (base === 15 && rnd < .4 && l < 6) suffix = "orszag"; // Hungarian
      else if (base === 16) suffix = rnd < .6 ? "stan" : "ya"; // Turkish
      else if (base === 10) suffix = "guk"; // Korean
      else if (base === 11) suffix = " Guo"; // Chinese
      else if (base === 14) suffix = rnd < .5 && l < 6 ? "tlan" : "co"; // Nahuatl
      else if (base === 17 && rnd < .8) suffix = "a"; // Berber
      else if (base === 18 && rnd < .8) suffix = "a"; // Arabic
  
      return validateSuffix(name, suffix);
    }
  
    function validateSuffix(name, suffix) {
      if (name.slice(-1 * suffix.length) === suffix) return name; // no suffix if name already ends with it
      const s1 = suffix.charAt(0);
      if (name.slice(-1) === s1) name = name.slice(0, -1); // remove name last letter if it's a suffix first letter
      if (vowel(s1) === vowel(name.slice(-1)) && vowel(s1) === vowel(name.slice(-2, -1))) name = name.slice(0, -1); // remove name last char if 2 last chars are the same type as suffix's 1st
      if (name.slice(-1) === s1) name = name.slice(0, -1); // remove name last letter if it's a suffix first letter
      return name + suffix;
    }
  
    // generato name for the map
    const getMapName = function (force) {
      // if (!force && locked("mapName")) return;
      // if (force && locked("mapName")) unlock("mapName");
      const base = P(0.7) ? 2 : P(0.5) ? rand(0, 6) : rand(0, 31);
      if (!nameBases[base]) {
        // tip("Namebase is not found", false, "error");
        return "";
      }
      const min = nameBases[base].min - 1;
      const max = Math.max(nameBases[base].max - 3, min);
      // Removed extraneous 0
      const baseName = getBase(base, min, max, "");
      const name = P(0.7) ? addSuffix(baseName) : baseName;
      mapName = name;
    };
  
    function addSuffix(name) {
      const suffix = P(0.8) ? "ia" : "land";
      if (suffix === "ia" && name.length > 6) name = name.slice(0, -(name.length - 3));
      else if (suffix === "land" && name.length > 6) name = name.slice(0, -(name.length - 5));
      return validateSuffix(name, suffix);
    }
  
    const getNameBases = function () {
      // name, min length, max length, letters to allow duplication, multi-word name rate [deprecated]
      // prettier-ignore
      return [
        // real-world bases by Azgaar:
        {name: "German", i: 0, min: 5, max: 12, d: "lt", m: 0, b: "Achern,Aichhalden,Aitern,Albbruck,Alpirsbach,Altensteig,Althengstett,Appenweier,Auggen,Wildbad,Badenen,Badenweiler,Baiersbronn,Ballrechten,Bellingen,Berghaupten,Bernau,Biberach,Biederbach,Binzen,Birkendorf,Birkenfeld,Bischweier,Blumberg,Bollen,Bollschweil,Bonndorf,Bosingen,Braunlingen,Breisach,Breisgau,Breitnau,Brigachtal,Buchenbach,Buggingen,Buhl,Buhlertal,Calw,Dachsberg,Dobel,Donaueschingen,Dornhan,Dornstetten,Dottingen,Dunningen,Durbach,Durrheim,Ebhausen,Ebringen,Efringen,Egenhausen,Ehrenkirchen,Ehrsberg,Eimeldingen,Eisenbach,Elzach,Elztal,Emmendingen,Endingen,Engelsbrand,Enz,Enzklosterle,Eschbronn,Ettenheim,Ettlingen,Feldberg,Fischerbach,Fischingen,Fluorn,Forbach,Freiamt,Freiburg,Freudenstadt,Friedenweiler,Friesenheim,Frohnd,Furtwangen,Gaggenau,Geisingen,Gengenbach,Gernsbach,Glatt,Glatten,Glottertal,Gorwihl,Gottenheim,Grafenhausen,Grenzach,Griesbach,Gutach,Gutenbach,Hag,Haiterbach,Hardt,Harmersbach,Hasel,Haslach,Hausach,Hausen,Hausern,Heitersheim,Herbolzheim,Herrenalb,Herrischried,Hinterzarten,Hochenschwand,Hofen,Hofstetten,Hohberg,Horb,Horben,Hornberg,Hufingen,Ibach,Ihringen,Inzlingen,Kandern,Kappel,Kappelrodeck,Karlsbad,Karlsruhe,Kehl,Keltern,Kippenheim,Kirchzarten,Konigsfeld,Krozingen,Kuppenheim,Kussaberg,Lahr,Lauchringen,Lauf,Laufenburg,Lautenbach,Lauterbach,Lenzkirch,Liebenzell,Loffenau,Loffingen,Lorrach,Lossburg,Mahlberg,Malsburg,Malsch,March,Marxzell,Marzell,Maulburg,Monchweiler,Muhlenbach,Mullheim,Munstertal,Murg,Nagold,Neubulach,Neuenburg,Neuhausen,Neuried,Neuweiler,Niedereschach,Nordrach,Oberharmersbach,Oberkirch,Oberndorf,Oberbach,Oberried,Oberwolfach,Offenburg,Ohlsbach,Oppenau,Ortenberg,otigheim,Ottenhofen,Ottersweier,Peterstal,Pfaffenweiler,Pfalzgrafenweiler,Pforzheim,Rastatt,Renchen,Rheinau,Rheinfelden,Rheinmunster,Rickenbach,Rippoldsau,Rohrdorf,Rottweil,Rummingen,Rust,Sackingen,Sasbach,Sasbachwalden,Schallbach,Schallstadt,Schapbach,Schenkenzell,Schiltach,Schliengen,Schluchsee,Schomberg,Schonach,Schonau,Schonenberg,Schonwald,Schopfheim,Schopfloch,Schramberg,Schuttertal,Schwenningen,Schworstadt,Seebach,Seelbach,Seewald,Sexau,Simmersfeld,Simonswald,Sinzheim,Solden,Staufen,Stegen,Steinach,Steinen,Steinmauern,Straubenhardt,Stuhlingen,Sulz,Sulzburg,Teinach,Tiefenbronn,Tiengen,Titisee,Todtmoos,Todtnau,Todtnauberg,Triberg,Tunau,Tuningen,uhlingen,Unterkirnach,Reichenbach,Utzenfeld,Villingen,Villingendorf,Vogtsburg,Vohrenbach,Waldachtal,Waldbronn,Waldkirch,Waldshut,Wehr,Weil,Weilheim,Weisenbach,Wembach,Wieden,Wiesental,Wildberg,Winzeln,Wittlingen,Wittnau,Wolfach,Wutach,Wutoschingen,Wyhlen,Zavelstein"},
        {name: "English", i: 1, min: 6, max: 11, d: "", m: .1, b: "Abingdon,Albrighton,Alcester,Almondbury,Altrincham,Amersham,Andover,Appleby,Ashboume,Atherstone,Aveton,Axbridge,Aylesbury,Baldock,Bamburgh,Barton,Basingstoke,Berden,Bere,Berkeley,Berwick,Betley,Bideford,Bingley,Birmingham,Blandford,Blechingley,Bodmin,Bolton,Bootham,Boroughbridge,Boscastle,Bossinney,Bramber,Brampton,Brasted,Bretford,Bridgetown,Bridlington,Bromyard,Bruton,Buckingham,Bungay,Burton,Calne,Cambridge,Canterbury,Carlisle,Castleton,Caus,Charmouth,Chawleigh,Chichester,Chillington,Chinnor,Chipping,Chisbury,Cleobury,Clifford,Clifton,Clitheroe,Cockermouth,Coleshill,Combe,Congleton,Crafthole,Crediton,Cuddenbeck,Dalton,Darlington,Dodbrooke,Drax,Dudley,Dunstable,Dunster,Dunwich,Durham,Dymock,Exeter,Exning,Faringdon,Felton,Fenny,Finedon,Flookburgh,Fowey,Frampton,Gateshead,Gatton,Godmanchester,Grampound,Grantham,Guildford,Halesowen,Halton,Harbottle,Harlow,Hatfield,Hatherleigh,Haydon,Helston,Henley,Hertford,Heytesbury,Hinckley,Hitchin,Holme,Hornby,Horsham,Kendal,Kenilworth,Kilkhampton,Kineton,Kington,Kinver,Kirby,Knaresborough,Knutsford,Launceston,Leighton,Lewes,Linton,Louth,Luton,Lyme,Lympstone,Macclesfield,Madeley,Malborough,Maldon,Manchester,Manningtree,Marazion,Marlborough,Marshfield,Mere,Merryfield,Middlewich,Midhurst,Milborne,Mitford,Modbury,Montacute,Mousehole,Newbiggin,Newborough,Newbury,Newenden,Newent,Norham,Northleach,Noss,Oakham,Olney,Orford,Ormskirk,Oswestry,Padstow,Paignton,Penkneth,Penrith,Penzance,Pershore,Petersfield,Pevensey,Pickering,Pilton,Pontefract,Portsmouth,Preston,Quatford,Reading,Redcliff,Retford,Rockingham,Romney,Rothbury,Rothwell,Salisbury,Saltash,Seaford,Seasalter,Sherston,Shifnal,Shoreham,Sidmouth,Skipsea,Skipton,Solihull,Somerton,Southam,Southwark,Standon,Stansted,Stapleton,Stottesdon,Sudbury,Swavesey,Tamerton,Tarporley,Tetbury,Thatcham,Thaxted,Thetford,Thornbury,Tintagel,Tiverton,Torksey,Totnes,Towcester,Tregoney,Trematon,Tutbury,Uxbridge,Wallingford,Wareham,Warenmouth,Wargrave,Warton,Watchet,Watford,Wendover,Westbury,Westcheap,Weymouth,Whitford,Wickwar,Wigan,Wigmore,Winchelsea,Winkleigh,Wiscombe,Witham,Witheridge,Wiveliscombe,Woodbury,Yeovil"},
        {name: "French", i: 2, min: 5, max: 13, d: "nlrs", m: .1, b: "Adon,Aillant,Amilly,Andonville,Ardon,Artenay,Ascheres,Ascoux,Attray,Aubin,Audeville,Aulnay,Autruy,Auvilliers,Auxy,Aveyron,Baccon,Bardon,Barville,Batilly,Baule,Bazoches,Beauchamps,Beaugency,Beaulieu,Beaune,Bellegarde,Boesses,Boigny,Boiscommun,Boismorand,Boisseaux,Bondaroy,Bonnee,Bonny,Bordes,Bou,Bougy,Bouilly,Boulay,Bouzonville,Bouzy,Boynes,Bray,Breteau,Briare,Briarres,Bricy,Bromeilles,Bucy,Cepoy,Cercottes,Cerdon,Cernoy,Cesarville,Chailly,Chaingy,Chalette,Chambon,Champoulet,Chanteau,Chantecoq,Chapell,Charme,Charmont,Charsonville,Chateau,Chateauneuf,Chatel,Chatenoy,Chatillon,Chaussy,Checy,Chevannes,Chevillon,Chevilly,Chevry,Chilleurs,Choux,Chuelles,Clery,Coinces,Coligny,Combleux,Combreux,Conflans,Corbeilles,Corquilleroy,Cortrat,Coudroy,Coullons,Coulmiers,Courcelles,Courcy,Courtemaux,Courtempierre,Courtenay,Cravant,Crottes,Dadonville,Dammarie,Dampierre,Darvoy,Desmonts,Dimancheville,Donnery,Dordives,Dossainville,Douchy,Dry,Echilleuses,Egry,Engenville,Epieds,Erceville,Ervauville,Escrennes,Escrignelles,Estouy,Faverelles,Fay,Feins,Ferolles,Ferrieres,Fleury,Fontenay,Foret,Foucherolles,Freville,Gatinais,Gaubertin,Gemigny,Germigny,Gidy,Gien,Girolles,Givraines,Gondreville,Grangermont,Greneville,Griselles,Guigneville,Guilly,Gyleslonains,Huetre,Huisseau,Ingrannes,Ingre,Intville,Isdes,Jargeau,Jouy,Juranville,Bussiere,Laas,Ladon,Lailly,Langesse,Leouville,Ligny,Lombreuil,Lorcy,Lorris,Loury,Louzouer,Malesherbois,Marcilly,Mardie,Mareau,Marigny,Marsainvilliers,Melleroy,Menestreau,Merinville,Messas,Meung,Mezieres,Migneres,Mignerette,Mirabeau,Montargis,Montbarrois,Montbouy,Montcresson,Montereau,Montigny,Montliard,Mormant,Morville,Moulinet,Moulon,Nancray,Nargis,Nesploy,Neuville,Neuvy,Nevoy,Nibelle,Nogent,Noyers,Ocre,Oison,Olivet,Ondreville,Onzerain,Orleans,Ormes,Orville,Oussoy,Outarville,Ouzouer,Pannecieres,Pannes,Patay,Paucourt,Pers,Pierrefitte,Pithiverais,Pithiviers,Poilly,Potier,Prefontaines,Presnoy,Pressigny,Puiseaux,Quiers,Ramoulu,Rebrechien,Rouvray,Rozieres,Rozoy,Ruan,Sandillon,Santeau,Saran,Sceaux,Seichebrieres,Semoy,Sennely,Sermaises,Sigloy,Solterre,Sougy,Sully,Sury,Tavers,Thignonville,Thimory,Thorailles,Thou,Tigy,Tivernon,Tournoisis,Trainou,Treilles,Trigueres,Trinay,Vannes,Varennes,Vennecy,Vieilles,Vienne,Viglain,Vignes,Villamblain,Villemandeur,Villemoutiers,Villemurlin,Villeneuve,Villereau,Villevoques,Villorceau,Vimory,Vitry,Vrigny,Ivre"},
        {name: "Italian", i: 3, min: 5, max: 12, d: "cltr", m: .1, b: "Accumoli,Acquafondata,Acquapendente,Acuto,Affile,Agosta,Alatri,Albano,Allumiere,Alvito,Amaseno,Amatrice,Anagni,Anguillara,Anticoli,Antrodoco,Anzio,Aprilia,Aquino,Arce,Arcinazzo,Ardea,Ariccia,Arlena,Arnara,Arpino,Arsoli,Artena,Ascrea,Atina,Ausonia,Bagnoregio,Barbarano,Bassano,Bassiano,Bellegra,Belmonte,Blera,Bolsena,Bomarzo,Borbona,Borgo,Borgorose,Boville,Bracciano,Broccostella,Calcata,Camerata,Campagnano,Campodimele,Campoli,Canale,Canepina,Canino,Cantalice,Cantalupo,Canterano,Capena,Capodimonte,Capranica,Caprarola,Carbognano,Casalattico,Casalvieri,Casape,Casaprota,Casperia,Cassino,Castelforte,Castelliri,Castello,Castelnuovo,Castiglione,Castro,Castrocielo,Cave,Ceccano,Celleno,Cellere,Ceprano,Cerreto,Cervara,Cervaro,Cerveteri,Ciampino,Ciciliano,Cineto,Cisterna,Cittaducale,Cittareale,Civita,Civitavecchia,Civitella,Colfelice,Collalto,Colle,Colleferro,Collegiove,Collepardo,Collevecchio,Colli,Colonna,Concerviano,Configni,Contigliano,Corchiano,Coreno,Cori,Cottanello,Esperia,Fabrica,Faleria,Fara,Farnese,Ferentino,Fiamignano,Fiano,Filacciano,Filettino,Fiuggi,Fiumicino,Fondi,Fontana,Fonte,Fontechiari,Forano,Formello,Formia,Frascati,Frasso,Frosinone,Fumone,Gaeta,Gallese,Gallicano,Gallinaro,Gavignano,Genazzano,Genzano,Gerano,Giuliano,Gorga,Gradoli,Graffignano,Greccio,Grottaferrata,Grotte,Guarcino,Guidonia,Ischia,Isola,Itri,Jenne,Labico,Labro,Ladispoli,Lanuvio,Lariano,Latera,Lenola,Leonessa,Licenza,Longone,Lubriano,Maenza,Magliano,Mandela,Manziana,Marano,Marcellina,Marcetelli,Marino,Marta,Mazzano,Mentana,Micigliano,Minturno,Mompeo,Montalto,Montasola,Monte,Montebuono,Montefiascone,Monteflavio,Montelanico,Monteleone,Montelibretti,Montenero,Monterosi,Monterotondo,Montopoli,Montorio,Moricone,Morlupo,Morolo,Morro,Nazzano,Nemi,Nepi,Nerola,Nespolo,Nettuno,Norma,Olevano,Onano,Oriolo,Orte,Orvinio,Paganico,Palestrina,Paliano,Palombara,Pastena,Patrica,Percile,Pescorocchiano,Pescosolido,Petrella,Piansano,Picinisco,Pico,Piedimonte,Piglio,Pignataro,Pisoniano,Pofi,Poggio,Poli,Pomezia,Pontecorvo,Pontinia,Ponza,Ponzano,Posta,Pozzaglia,Priverno,Proceno,Prossedi,Riano,Rieti,Rignano,Riofreddo,Ripi,Rivodutri,Rocca,Roccagiovine,Roccagorga,Roccantica,Roccasecca,Roiate,Ronciglione,Roviano,Sabaudia,Sacrofano,Salisano,Sambuci,Santa,Santi,Santopadre,Saracinesco,Scandriglia,Segni,Selci,Sermoneta,Serrone,Settefrati,Sezze,Sgurgola,Sonnino,Sora,Soriano,Sperlonga,Spigno,Stimigliano,Strangolagalli,Subiaco,Supino,Sutri,Tarano,Tarquinia,Terelle,Terracina,Tessennano,Tivoli,Toffia,Tolfa,Torre,Torri,Torrice,Torricella,Torrita,Trevi,Trevignano,Trivigliano,Turania,Tuscania,Vacone,Valentano,Vallecorsa,Vallemaio,Vallepietra,Vallerano,Vallerotonda,Vallinfreda,Valmontone,Varco,Vasanello,Vejano,Velletri,Ventotene,Veroli,Vetralla,Vicalvi,Vico,Vicovaro,Vignanello,Viterbo,Viticuso,Vitorchiano,Vivaro,Zagarolo"},
        {name: "Castillian", i: 4, min: 5, max: 11, d: "lr", m: 0, b: "Abanades,Ablanque,Adobes,Ajofrin,Alameda,Alaminos,Alarilla,Albalate,Albares,Albarreal,Albendiego,Alcabon,Alcanizo,Alcaudete,Alcocer,Alcolea,Alcoroches,Aldea,Aldeanueva,Algar,Algora,Alhondiga,Alique,Almadrones,Almendral,Almoguera,Almonacid,Almorox,Alocen,Alovera,Alustante,Angon,Anguita,Anover,Anquela,Arbancon,Arbeteta,Arcicollar,Argecilla,Arges,Armallones,Armuna,Arroyo,Atanzon,Atienza,Aunon,Azuqueca,Azutan,Baides,Banos,Banuelos,Barcience,Bargas,Barriopedro,Belvis,Berninches,Borox,Brihuega,Budia,Buenaventura,Bujalaro,Burguillos,Burujon,Bustares,Cabanas,Cabanillas,Calera,Caleruela,Calzada,Camarena,Campillo,Camunas,Canizar,Canredondo,Cantalojas,Cardiel,Carmena,Carranque,Carriches,Casa,Casarrubios,Casas,Casasbuenas,Caspuenas,Castejon,Castellar,Castilforte,Castillo,Castilnuevo,Cazalegas,Cebolla,Cedillo,Cendejas,Centenera,Cervera,Checa,Chequilla,Chillaron,Chiloeches,Chozas,Chueca,Cifuentes,Cincovillas,Ciruelas,Ciruelos,Cobeja,Cobeta,Cobisa,Cogollor,Cogolludo,Condemios,Congostrina,Consuegra,Copernal,Corduente,Corral,Cuerva,Domingo,Dosbarrios,Driebes,Duron,El,Embid,Erustes,Escalona,Escalonilla,Escamilla,Escariche,Escopete,Espinosa,Espinoso,Esplegares,Esquivias,Estables,Estriegana,Fontanar,Fuembellida,Fuensalida,Fuentelsaz,Gajanejos,Galve,Galvez,Garciotum,Gascuena,Gerindote,Guadamur,Henche,Heras,Herreria,Herreruela,Hijes,Hinojosa,Hita,Hombrados,Hontanar,Hontoba,Horche,Hormigos,Huecas,Huermeces,Huerta,Hueva,Humanes,Illan,Illana,Illescas,Iniestola,Irueste,Jadraque,Jirueque,Lagartera,Las,Layos,Ledanca,Lillo,Lominchar,Loranca,Los,Lucillos,Lupiana,Luzaga,Luzon,Madridejos,Magan,Majaelrayo,Malaga,Malaguilla,Malpica,Mandayona,Mantiel,Manzaneque,Maqueda,Maranchon,Marchamalo,Marjaliza,Marrupe,Mascaraque,Masegoso,Matarrubia,Matillas,Mazarete,Mazuecos,Medranda,Megina,Mejorada,Mentrida,Mesegar,Miedes,Miguel,Millana,Milmarcos,Mirabueno,Miralrio,Mocejon,Mochales,Mohedas,Molina,Monasterio,Mondejar,Montarron,Mora,Moratilla,Morenilla,Muduex,Nambroca,Navalcan,Negredo,Noblejas,Noez,Nombela,Noves,Numancia,Nuno,Ocana,Ocentejo,Olias,Olmeda,Ontigola,Orea,Orgaz,Oropesa,Otero,Palmaces,Palomeque,Pantoja,Pardos,Paredes,Pareja,Parrillas,Pastrana,Pelahustan,Penalen,Penalver,Pepino,Peralejos,Peralveche,Pinilla,Pioz,Piqueras,Polan,Portillo,Poveda,Pozo,Pradena,Prados,Puebla,Puerto,Pulgar,Quer,Quero,Quintanar,Quismondo,Rebollosa,Recas,Renera,Retamoso,Retiendas,Riba,Rielves,Rillo,Riofrio,Robledillo,Robledo,Romanillos,Romanones,Rueda,Sacecorbo,Sacedon,Saelices,Salmeron,San,Santa,Santiuste,Santo,Sartajada,Sauca,Sayaton,Segurilla,Selas,Semillas,Sesena,Setiles,Sevilleja,Sienes,Siguenza,Solanillos,Somolinos,Sonseca,Sotillo,Sotodosos,Talavera,Tamajon,Taragudo,Taravilla,Tartanedo,Tembleque,Tendilla,Terzaga,Tierzo,Tordellego,Tordelrabano,Tordesilos,Torija,Torralba,Torre,Torrecilla,Torrecuadrada,Torrejon,Torremocha,Torrico,Torrijos,Torrubia,Tortola,Tortuera,Tortuero,Totanes,Traid,Trijueque,Trillo,Turleque,Uceda,Ugena,Ujados,Urda,Utande,Valdarachas,Valdesotos,Valhermoso,Valtablado,Valverde,Velada,Viana,Vinuelas,Yebes,Yebra,Yelamos,Yeles,Yepes,Yuncler,Yunclillos,Yuncos,Yunquera,Zaorejas,Zarzuela,Zorita"},
        {name: "Ruthenian", i: 5, min: 5, max: 10, d: "", m: 0, b: "Belgorod,Beloberezhye,Belyi,Belz,Berestiy,Berezhets,Berezovets,Berezutsk,Bobruisk,Bolonets,Borisov,Borovsk,Bozhesk,Bratslav,Bryansk,Brynsk,Buryn,Byhov,Chechersk,Chemesov,Cheremosh,Cherlen,Chern,Chernigov,Chernitsa,Chernobyl,Chernogorod,Chertoryesk,Chetvertnia,Demyansk,Derevesk,Devyagoresk,Dichin,Dmitrov,Dorogobuch,Dorogobuzh,Drestvin,Drokov,Drutsk,Dubechin,Dubichi,Dubki,Dubkov,Dveren,Galich,Glebovo,Glinsk,Goloty,Gomiy,Gorodets,Gorodische,Gorodno,Gorohovets,Goroshin,Gorval,Goryshon,Holm,Horobor,Hoten,Hotin,Hotmyzhsk,Ilovech,Ivan,Izborsk,Izheslavl,Kamenets,Kanev,Karachev,Karna,Kavarna,Klechesk,Klyapech,Kolomyya,Kolyvan,Kopyl,Korec,Kornik,Korochunov,Korshev,Korsun,Koshkin,Kotelno,Kovyla,Kozelsk,Kozelsk,Kremenets,Krichev,Krylatsk,Ksniatin,Kulatsk,Kursk,Kursk,Lebedev,Lida,Logosko,Lomihvost,Loshesk,Loshichi,Lubech,Lubno,Lubutsk,Lutsk,Luchin,Luki,Lukoml,Luzha,Lvov,Mtsensk,Mdin,Medniki,Melecha,Merech,Meretsk,Mescherskoe,Meshkovsk,Metlitsk,Mezetsk,Mglin,Mihailov,Mikitin,Mikulino,Miloslavichi,Mogilev,Mologa,Moreva,Mosalsk,Moschiny,Mozyr,Mstislav,Mstislavets,Muravin,Nemech,Nemiza,Nerinsk,Nichan,Novgorod,Novogorodok,Obolichi,Obolensk,Obolensk,Oleshsk,Olgov,Omelnik,Opoka,Opoki,Oreshek,Orlets,Osechen,Oster,Ostrog,Ostrov,Perelai,Peremil,Peremyshl,Pererov,Peresechen,Perevitsk,Pereyaslav,Pinsk,Ples,Polotsk,Pronsk,Proposhesk,Punia,Putivl,Rechitsa,Rodno,Rogachev,Romanov,Romny,Roslavl,Rostislavl,Rostovets,Rsha,Ruza,Rybchesk,Rylsk,Rzhavesk,Rzhev,Rzhischev,Sambor,Serensk,Serensk,Serpeysk,Shilov,Shuya,Sinech,Sizhka,Skala,Slovensk,Slutsk,Smedin,Sneporod,Snitin,Snovsk,Sochevo,Sokolec,Starica,Starodub,Stepan,Sterzh,Streshin,Sutesk,Svinetsk,Svisloch,Terebovl,Ternov,Teshilov,Teterin,Tiversk,Torchevsk,Toropets,Torzhok,Tripolye,Trubchevsk,Tur,Turov,Usvyaty,Uteshkov,Vasilkov,Velil,Velye,Venev,Venicha,Verderev,Vereya,Veveresk,Viazma,Vidbesk,Vidychev,Voino,Volodimer,Volok,Volyn,Vorobesk,Voronich,Voronok,Vorotynsk,Vrev,Vruchiy,Vselug,Vyatichsk,Vyatka,Vyshegorod,Vyshgorod,Vysokoe,Yagniatin,Yaropolch,Yasenets,Yuryev,Yuryevets,Zaraysk,Zhitomel,Zholvazh,Zizhech,Zubkov,Zudechev,Zvenigorod"},
        {name: "Nordic", i: 6, min: 6, max: 10, d: "kln", m: .1, b: "Akureyri,Aldra,Alftanes,Andenes,Austbo,Auvog,Bakkafjordur,Ballangen,Bardal,Beisfjord,Bifrost,Bildudalur,Bjerka,Bjerkvik,Bjorkosen,Bliksvaer,Blokken,Blonduos,Bolga,Bolungarvik,Borg,Borgarnes,Bosmoen,Bostad,Bostrand,Botsvika,Brautarholt,Breiddalsvik,Bringsli,Brunahlid,Budardalur,Byggdakjarni,Dalvik,Djupivogur,Donnes,Drageid,Drangsnes,Egilsstadir,Eiteroga,Elvenes,Engavogen,Ertenvog,Eskifjordur,Evenes,Eyrarbakki,Fagernes,Fallmoen,Fellabaer,Fenes,Finnoya,Fjaer,Fjelldal,Flakstad,Flateyri,Flostrand,Fludir,Gardaber,Gardur,Gimstad,Givaer,Gjeroy,Gladstad,Godoya,Godoynes,Granmoen,Gravdal,Grenivik,Grimsey,Grindavik,Grytting,Hafnir,Halsa,Hauganes,Haugland,Hauknes,Hella,Helland,Hellissandur,Hestad,Higrav,Hnifsdalur,Hofn,Hofsos,Holand,Holar,Holen,Holkestad,Holmavik,Hopen,Hovden,Hrafnagil,Hrisey,Husavik,Husvik,Hvammstangi,Hvanneyri,Hveragerdi,Hvolsvollur,Igeroy,Indre,Inndyr,Innhavet,Innes,Isafjordur,Jarklaustur,Jarnsreykir,Junkerdal,Kaldvog,Kanstad,Karlsoy,Kavosen,Keflavik,Kjelde,Kjerstad,Klakk,Kopasker,Kopavogur,Korgen,Kristnes,Krutoga,Krystad,Kvina,Lande,Laugar,Laugaras,Laugarbakki,Laugarvatn,Laupstad,Leines,Leira,Leiren,Leland,Lenvika,Loding,Lodingen,Lonsbakki,Lopsmarka,Lovund,Luroy,Maela,Melahverfi,Meloy,Mevik,Misvaer,Mornes,Mosfellsber,Moskenes,Myken,Naurstad,Nesberg,Nesjahverfi,Nesset,Nevernes,Obygda,Ofoten,Ogskardet,Okervika,Oknes,Olafsfjordur,Oldervika,Olstad,Onstad,Oppeid,Oresvika,Orsnes,Orsvog,Osmyra,Overdal,Prestoya,Raudalaekur,Raufarhofn,Reipo,Reykholar,Reykholt,Reykjahlid,Rif,Rinoya,Rodoy,Rognan,Rosvika,Rovika,Salhus,Sanden,Sandgerdi,Sandoker,Sandset,Sandvika,Saudarkrokur,Selfoss,Selsoya,Sennesvik,Setso,Siglufjordur,Silvalen,Skagastrond,Skjerstad,Skonland,Skorvogen,Skrova,Sleneset,Snubba,Softing,Solheim,Solheimar,Sorarnoy,Sorfugloy,Sorland,Sormela,Sorvaer,Sovika,Stamsund,Stamsvika,Stave,Stokka,Stokkseyri,Storjord,Storo,Storvika,Strand,Straumen,Strendene,Sudavik,Sudureyri,Sundoya,Sydalen,Thingeyri,Thorlakshofn,Thorshofn,Tjarnabyggd,Tjotta,Tosbotn,Traelnes,Trofors,Trones,Tverro,Ulvsvog,Unnstad,Utskor,Valla,Vandved,Varmahlid,Vassos,Vevelstad,Vidrek,Vik,Vikholmen,Vogar,Vogehamn,Vopnafjordur"},
        {name: "Greek", i: 7, min: 5, max: 11, d: "s", m: .1, b: "Abdera,Abila,Abydos,Acanthus,Acharnae,Actium,Adramyttium,Aegae,Aegina,Aegium,Aenus,Agrinion,Aigosthena,Akragas,Akrai,Akrillai,Akroinon,Akrotiri,Alalia,Alexandreia,Alexandretta,Alexandria,Alinda,Amarynthos,Amaseia,Ambracia,Amida,Amisos,Amnisos,Amphicaea,Amphigeneia,Amphipolis,Amphissa,Ankon,Antigona,Antipatrea,Antioch,Antioch,Antiochia,Andros,Apamea,Aphidnae,Apollonia,Argos,Arsuf,Artanes,Artemita,Argyroupoli,Asine,Asklepios,Aspendos,Assus,Astacus,Athenai,Athmonia,Aytos,Ancient,Baris,Bhrytos,Borysthenes,Berge,Boura,Bouthroton,Brauron,Byblos,Byllis,Byzantium,Bythinion,Callipolis,Cebrene,Chalcedon,Calydon,Carystus,Chamaizi,Chalcis,Chersonesos,Chios,Chytri,Clazomenae,Cleonae,Cnidus,Colosse,Corcyra,Croton,Cyme,Cyrene,Cythera,Decelea,Delos,Delphi,Demetrias,Dicaearchia,Dimale,Didyma,Dion,Dioscurias,Dodona,Dorylaion,Dyme,Edessa,Elateia,Eleusis,Eleutherna,Emporion,Ephesus,Ephyra,Epidamnos,Epidauros,Eresos,Eretria,Erythrae,Eubea,Gangra,Gaza,Gela,Golgi,Gonnos,Gorgippia,Gournia,Gortyn,Gythium,Hagios,Hagia,Halicarnassus,Halieis,Helike,Heliopolis,Hellespontos,Helorus,Hemeroskopeion,Heraclea,Hermione,Hermonassa,Hierapetra,Hierapolis,Himera,Histria,Hubla,Hyele,Ialysos,Iasus,Idalium,Imbros,Iolcus,Itanos,Ithaca,Juktas,Kallipolis,Kamares,Kameiros,Kannia,Kamarina,Kasmenai,Katane,Kerkinitida,Kepoi,Kimmerikon,Kios,Klazomenai,Knidos,Knossos,Korinthos,Kos,Kourion,Kume,Kydonia,Kynos,Kyrenia,Lamia,Lampsacus,Laodicea,Lapithos,Larissa,Lato,Laus,Lebena,Lefkada,Lekhaion,Leibethra,Leontinoi,Lepreum,Lessa,Lilaea,Lindus,Lissus,Epizephyrian,Madytos,Magnesia,Mallia,Mantineia,Marathon,Marmara,Maroneia,Masis,Massalia,Megalopolis,Megara,Mesembria,Messene,Metapontum,Methana,Methone,Methumna,Miletos,Misenum,Mochlos,Monastiraki,Morgantina,Mulai,Mukenai,Mylasa,Myndus,Myonia,Myra,Myrmekion,Mutilene,Myos,Nauplios,Naucratis,Naupactus,Naxos,Neapoli,Neapolis,Nemea,Nicaea,Nicopolis,Nirou,Nymphaion,Nysa,Oenoe,Oenus,Odessos,Olbia,Olous,Olympia,Olynthus,Opus,Orchomenus,Oricos,Orestias,Oreus,Oropus,Onchesmos,Pactye,Pagasae,Palaikastro,Pandosia,Panticapaeum,Paphos,Parium,Paros,Parthenope,Patrae,Pavlopetri,Pegai,Pelion,Peiraies,Pella,Percote,Pergamum,Petsofa,Phaistos,Phaleron,Phanagoria,Pharae,Pharnacia,Pharos,Phaselis,Philippi,Pithekussa,Philippopolis,Platanos,Phlius,Pherae,Phocaea,Pinara,Pisa,Pitane,Pitiunt,Pixous,Plataea,Poseidonia,Potidaea,Priapus,Priene,Prousa,Pseira,Psychro,Pteleum,Pydna,Pylos,Pyrgos,Rhamnus,Rhegion,Rhithymna,Rhodes,Rhypes,Rizinia,Salamis,Same,Samos,Scyllaeum,Selinus,Seleucia,Semasus,Sestos,Scidrus,Sicyon,Side,Sidon,Siteia,Sinope,Siris,Sklavokampos,Smyrna,Soli,Sozopolis,Sparta,Stagirus,Stratos,Stymphalos,Sybaris,Surakousai,Taras,Tanagra,Tanais,Tauromenion,Tegea,Temnos,Tenedos,Tenea,Teos,Thapsos,Thassos,Thebai,Theodosia,Therma,Thespiae,Thronion,Thoricus,Thurii,Thyreum,Thyria,Tiruns,Tithoraea,Tomis,Tragurion,Trapeze,Trapezus,Tripolis,Troizen,Troliton,Troy,Tylissos,Tyras,Tyros,Tyritake,Vasiliki,Vathypetros,Zakynthos,Zakros,Zankle"},
        {name: "Roman", i: 8, min: 6, max: 11, d: "ln", m: .1, b: "Abila,Adflexum,Adnicrem,Aelia,Aelius,Aeminium,Aequum,Agrippina,Agrippinae,Ala,Albanianis,Ambianum,Andautonia,Apulum,Aquae,Aquaegranni,Aquensis,Aquileia,Aquincum,Arae,Argentoratum,Ariminum,Ascrivium,Atrebatum,Atuatuca,Augusta,Aurelia,Aurelianorum,Batavar,Batavorum,Belum,Biriciana,Blestium,Bonames,Bonna,Bononia,Borbetomagus,Bovium,Bracara,Brigantium,Burgodunum,Caesaraugusta,Caesarea,Caesaromagus,Calleva,Camulodunum,Cannstatt,Cantiacorum,Capitolina,Castellum,Castra,Castrum,Cibalae,Clausentum,Colonia,Concangis,Condate,Confluentes,Conimbriga,Corduba,Coria,Corieltauvorum,Corinium,Coriovallum,Cornoviorum,Danum,Deva,Divodurum,Dobunnorum,Drusi,Dubris,Dumnoniorum,Durnovaria,Durocobrivis,Durocornovium,Duroliponte,Durovernum,Durovigutum,Eboracum,Edetanorum,Emerita,Emona,Euracini,Faventia,Flaviae,Florentia,Forum,Gerulata,Gerunda,Glevensium,Hadriani,Herculanea,Isca,Italica,Iulia,Iuliobrigensium,Iuvavum,Lactodurum,Lagentium,Lauri,Legionis,Lemanis,Lentia,Lepidi,Letocetum,Lindinis,Lindum,Londinium,Lopodunum,Lousonna,Lucus,Lugdunum,Luguvalium,Lutetia,Mancunium,Marsonia,Martius,Massa,Matilo,Mattiacorum,Mediolanum,Mod,Mogontiacum,Moridunum,Mursa,Naissus,Nervia,Nida,Nigrum,Novaesium,Noviomagus,Olicana,Ovilava,Parisiorum,Partiscum,Paterna,Pistoria,Placentia,Pollentia,Pomaria,Pons,Portus,Praetoria,Praetorium,Pullum,Ragusium,Ratae,Raurica,Regina,Regium,Regulbium,Rigomagus,Roma,Romula,Rutupiae,Salassorum,Salernum,Salona,Scalabis,Segovia,Silurum,Sirmium,Siscia,Sorviodurum,Sumelocenna,Tarraco,Taurinorum,Theranda,Traiectum,Treverorum,Tungrorum,Turicum,Ulpia,Valentia,Venetiae,Venta,Verulamium,Vesontio,Vetera,Victoriae,Victrix,Villa,Viminacium,Vindelicorum,Vindobona,Vinovia,Viroconium"},
        {name: "Finnic", i: 9, min: 5, max: 11, d: "akiut", m: 0, b: "Aanekoski,Abjapaluoja,Ahlainen,Aholanvaara,Ahtari,Aijala,Aimala,Akaa,Alajarvi,Alatornio,Alavus,Antsla,Aspo,Bennas,Bjorkoby,Elva,Emasalo,Espoo,Esse,Evitskog,Forssa,Haapajarvi,Haapamaki,Haapavesi,Haapsalu,Haavisto,Hameenlinna,Hameenmaki,Hamina,Hanko,Harjavalta,Hattuvaara,Haukipudas,Hautajarvi,Havumaki,Heinola,Hetta,Hinkabole,Hirmula,Hossa,Huittinen,Husula,Hyryla,Hyvinkaa,Iisalmi,Ikaalinen,Ilmola,Imatra,Inari,Iskmo,Itakoski,Jamsa,Jarvenpaa,Jeppo,Jioesuu,Jiogeva,Joensuu,Jokela,Jokikyla,Jokisuu,Jormua,Juankoski,Jungsund,Jyvaskyla,Kaamasmukka,Kaarina,Kajaani,Kalajoki,Kallaste,Kankaanpaa,Kannus,Kardla,Karesuvanto,Karigasniemi,Karkkila,Karkku,Karksinuia,Karpankyla,Kaskinen,Kasnas,Kauhajoki,Kauhava,Kauniainen,Kauvatsa,Kehra,Keila,Kellokoski,Kelottijarvi,Kemi,Kemijarvi,Kerava,Keuruu,Kiikka,Kiipu,Kilinginiomme,Kiljava,Kilpisjarvi,Kitee,Kiuruvesi,Kivesjarvi,Kiviioli,Kivisuo,Klaukkala,Klovskog,Kohtlajarve,Kokemaki,Kokkola,Kolho,Koria,Koskue,Kotka,Kouva,Kouvola,Kristiina,Kaupunki,Kuhmo,Kunda,Kuopio,Kuressaare,Kurikka,Kusans,Kuusamo,Kylmalankyla,Lahti,Laitila,Lankipohja,Lansikyla,Lappeenranta,Lapua,Laurila,Lautiosaari,Lepsama,Liedakkala,Lieksa,Lihula,Littoinen,Lohja,Loimaa,Loksa,Loviisa,Luohuanylipaa,Lusi,Maardu,Maarianhamina,Malmi,Mantta,Masaby,Masala,Matasvaara,Maula,Miiluranta,Mikkeli,Mioisakula,Munapirtti,Mustvee,Muurahainen,Naantali,Nappa,Narpio,Nickby,Niinimaa,Niinisalo,Nikkila,Nilsia,Nivala,Nokia,Nummela,Nuorgam,Nurmes,Nuvvus,Obbnas,Oitti,Ojakkala,Ollola,onningeby,Orimattila,Orivesi,Otanmaki,Otava,Otepaa,Oulainen,Oulu,Outokumpu,Paavola,Paide,Paimio,Pakankyla,Paldiski,Parainen,Parkano,Parkumaki,Parola,Perttula,Pieksamaki,Pietarsaari,Pioltsamaa,Piolva,Pohjavaara,Porhola,Pori,Porrasa,Porvoo,Pudasjarvi,Purmo,Pussi,Pyhajarvi,Raahe,Raasepori,Raisio,Rajamaki,Rakvere,Rapina,Rapla,Rauma,Rautio,Reposaari,Riihimaki,Rovaniemi,Roykka,Ruonala,Ruottala,Rutalahti,Saarijarvi,Salo,Sastamala,Saue,Savonlinna,Seinajoki,Sillamae,Sindi,Siuntio,Somero,Sompujarvi,Suonenjoki,Suurejaani,Syrjantaka,Tampere,Tamsalu,Tapa,Temmes,Tiorva,Tormasenvaara,Tornio,Tottijarvi,Tulppio,Turenki,Turi,Tuukkala,Tuurala,Tuuri,Tuuski,Ulvila,Unari,Upinniemi,Utti,Uusikaarlepyy,Uusikaupunki,Vaaksy,Vaalimaa,Vaarinmaja,Vaasa,Vainikkala,Valga,Valkeakoski,Vantaa,Varkaus,Vehkapera,Vehmasmaki,Vieki,Vierumaki,Viitasaari,Viljandi,Vilppula,Viohma,Vioru,Virrat,Ylike,Ylivieska,Ylojarvi"},
        {name: "Korean", i: 10, min: 5, max: 11, d: "", m: 0, b: "Aewor,Andong,Angang,Anjung,Anmyeon,Ansan,Anseong,Anyang,Aphae,Apo,Asan,Baebang,Baekseok,Baeksu,Beobwon,Beolgyo,Beomseo,Boeun,Bongdam,Bongdong,Bonghwa,Bongyang,Boryeong,Boseong,Buan,Bubal,Bucheon,Buksam,Busan,Busan,Busan,Buyeo,Changnyeong,Changwon,Cheonan,Cheongdo,Cheongjin,Cheongju,Cheongju,Cheongsong,Cheongyang,Cheorwon,Chirwon,Chowol,Chuncheon,Chuncheon,Chungju,Chungmu,Daecheon,Daedeok,Daegaya,Daegu,Daegu,Daegu,Daejeon,Daejeon,Daejeon,Daejeong,Daesan,Damyang,Dangjin,Danyang,Dasa,Dogye,Dolsan,Dong,Dongducheon,Donggwangyang,Donghae,Dongsong,Doyang,Eonyang,Eumseong,Gaeseong,Galmal,Gampo,Ganam,Ganggyeong,Ganghwa,Gangjin,Gangneung,Ganseong,Gapyeong,Gaun,Gaya,Geochang,Geoje,Geojin,Geoncheon,Geumho,Geumil,Geumsan,Geumseong,Geumwang,Gijang,Gimcheon,Gimhae,Gimhwa,Gimje,Gimpo,Goa,Gochang,Gochon,Goesan,Gohan,Goheung,Gokseong,Gongdo,Gongju,Gonjiam,Goseong,Goyang,Gujwa,Gumi,Gungnae,Gunpo,Gunsan,Gunsan,Gunwi,Guri,Gurye,Guryongpo,Gwacheon,Gwangcheon,Gwangju,Gwangju,Gwangju,Gwangju,Gwangmyeong,Gwangyang,Gwansan,Gyeongju,Gyeongsan,Gyeongseong,Gyeongseong,Gyeryong,Hadong,Haeju,Haenam,Hamchang,Hamheung,Hampyeong,Hamyang,Hamyeol,Hanam,Hanrim,Hapcheon,Hapdeok,Hayang,Heunghae,Heungnam,Hoengseong,Hongcheon,Hongnong,Hongseong,Hwacheon,Hwado,Hwando,Hwaseong,Hwasun,Hwawon,Hyangnam,Icheon,Iksan,Illo,Imsil,Incheon,Incheon,Incheon,Inje,Iri,Iri,Jangan,Janghang,Jangheung,Janghowon,Jangseong,Jangseungpo,Jangsu,Jecheon,Jeju,Jeomchon,Jeongeup,Jeonggwan,Jeongju,Jeongok,Jeongseon,Jeonju,Jeonju,Jeungpyeong,Jido,Jiksan,Jillyang,Jinan,Jincheon,Jindo,Jingeon,Jinhae,Jinjeop,Jinju,Jinju,Jinnampo,Jinyeong,Jocheon,Jochiwon,Jori,Judeok,Jumunjin,Maepo,Mangyeong,Masan,Masan,Migeum,Miryang,Mokcheon,Mokpo,Mokpo,Muan,Muju,Mungyeong,Munmak,Munsan,Munsan,Naeseo,Naesu,Najin,Naju,Namhae,Namji,Nampyeong,Namwon,Namyang,Namyangju,Nohwa,Nongong,Nonsan,Ochang,Ocheon,Oedong,Okcheon,Okgu,Onam,Onsan,Onyang,Opo,Osan,Osong,Paengseong,Paju,Pocheon,Pogok,Pohang,Poseung,Punggi,Pungsan,Pyeongchang,Pyeonghae,Pyeongtaek,Pyeongyang,Sabi,Sabuk,Sacheon,Samcheok,Samcheonpo,Samho,Samhyang,Samnangjin,Samrye,Sancheong,Sangdong,Sangju,Sanyang,Sapgyo,Sariwon,Sejong,Seocheon,Seogwipo,Seokjeok,Seonggeo,Seonghwan,Seongjin,Seongju,Seongnam,Seongsan,Seonsan,Seosan,Seoul,Seungju,Siheung,Sinbuk,Sindong,Sineuiju,Sintaein,Soheul,Sokcho,Songak,Songjeong,Songnim,Songtan,Sunchang,Suncheon,Suwon,Taean,Taebaek,Tongjin,Tongyeong,Uijeongbu,Uiryeong,Uiseong,Uiwang,Ujeong,Uljin,Ulleung,Ulsan,Ulsan,Unbong,Ungcheon,Ungjin,Wabu,Waegwan,Wando,Wanggeomseong,Wiryeseong,Wondeok,Wonju,Wonsan,Yangchon,Yanggu,Yangju,Yangpyeong,Yangsan,Yangyang,Yecheon,Yeocheon,Yeoju,Yeomchi,Yeoncheon,Yeongam,Yeongcheon,Yeongdeok,Yeongdong,Yeonggwang,Yeongju,Yeongwol,Yeongyang,Yeonil,Yeonmu,Yeosu,Yesan,Yongin,Yongjin,Yugu,Wayang"},
        {name: "Chinese", i: 11, min: 5, max: 10, d: "", m: 0, b: "Anding,Anlu,Anqing,Anshun,Baan,Baixing,Banyang,Baoding,Baoqing,Binzhou,Caozhou,Changbai,Changchun,Changde,Changling,Changsha,Changtu,Changzhou,Chaozhou,Cheli,Chengde,Chengdu,Chenzhou,Chizhou,Chongqing,Chuxiong,Chuzhou,Dading,Dali,Daming,Datong,Daxing,Dean,Dengke,Dengzhou,Deqing,Dexing,Dihua,Dingli,Dongan,Dongchang,Dongchuan,Dongping,Duyun,Fengtian,Fengxiang,Fengyang,Fenzhou,Funing,Fuzhou,Ganzhou,Gaoyao,Gaozhou,Gongchang,Guangnan,Guangning,Guangping,Guangxin,Guangzhou,Guide,Guilin,Guiyang,Hailong,Hailun,Hangzhou,Hanyang,Hanzhong,Heihe,Hejian,Henan,Hengzhou,Hezhong,Huaian,Huaide,Huaiqing,Huanglong,Huangzhou,Huining,Huizhou,Hulan,Huzhou,Jiading,Jian,Jianchang,Jiande,Jiangning,Jiankang,Jianning,Jiaxing,Jiayang,Jilin,Jinan,Jingjiang,Jingzhao,Jingzhou,Jinhua,Jinzhou,Jiujiang,Kaifeng,Kaihua,Kangding,Kuizhou,Laizhou,Lanzhou,Leizhou,Liangzhou,Lianzhou,Liaoyang,Lijiang,Linan,Linhuang,Linjiang,Lintao,Liping,Liuzhou,Longan,Longjiang,Longqing,Longxing,Luan,Lubin,Lubin,Luzhou,Mishan,Nanan,Nanchang,Nandian,Nankang,Nanning,Nanyang,Nenjiang,Ningan,Ningbo,Ningguo,Ninguo,Ningwu,Ningxia,Ningyuan,Pingjiang,Pingle,Pingliang,Pingyang,Puer,Puzhou,Qianzhou,Qingyang,Qingyuan,Qingzhou,Qiongzhou,Qujing,Quzhou,Raozhou,Rende,Ruian,Ruizhou,Runing,Shafeng,Shajing,Shaoqing,Shaowu,Shaoxing,Shaozhou,Shinan,Shiqian,Shouchun,Shuangcheng,Shulei,Shunde,Shunqing,Shuntian,Shuoping,Sicheng,Sien,Sinan,Sizhou,Songjiang,Suiding,Suihua,Suining,Suzhou,Taian,Taibei,Tainan,Taiping,Taiwan,Taiyuan,Taizhou,Taonan,Tengchong,Tieli,Tingzhou,Tongchuan,Tongqing,Tongren,Tongzhou,Weihui,Wensu,Wenzhou,Wuchang,Wuding,Wuzhou,Xian,Xianchun,Xianping,Xijin,Xiliang,Xincheng,Xingan,Xingde,Xinghua,Xingjing,Xingqing,Xingyi,Xingyuan,Xingzhong,Xining,Xinmen,Xiping,Xuanhua,Xunzhou,Xuzhou,Yanan,Yangzhou,Yanji,Yanping,Yanqi,Yanzhou,Yazhou,Yichang,Yidu,Yilan,Yili,Yingchang,Yingde,Yingtian,Yingzhou,Yizhou,Yongchang,Yongping,Yongshun,Yongzhou,Yuanzhou,Yuezhou,Yulin,Yunnan,Yunyang,Zezhou,Zhangde,Zhangzhou,Zhaoqing,Zhaotong,Zhenan,Zhending,Zhengding,Zhenhai,Zhenjiang,Zhenxi,Zhenyun,Zhongshan,Zunyi"},
        {name: "Japanese", i: 12, min: 4, max: 10, d: "", m: 0, b: "Abira,Aga,Aikawa,Aizumisato,Ajigasawa,Akkeshi,Amagi,Ami,Anan,Ando,Asakawa,Ashikita,Bandai,Biratori,China,Chonan,Esashi,Fuchu,Fujimi,Funagata,Genkai,Godo,Goka,Gonohe,Gyokuto,Haboro,Hamatonbetsu,Happo,Harima,Hashikami,Hayashima,Heguri,Hidaka,Higashiagatsuma,Higashiura,Hiranai,Hirogawa,Hiroo,Hodatsushimizu,Hoki,Hokuei,Hokuryu,Horokanai,Ibigawa,Ichikai,Ichikawamisato,Ichinohe,Iide,Iijima,Iizuna,Ikawa,Inagawa,Itakura,Iwaizumi,Iwate,Kagamino,Kaisei,Kamifurano,Kamiita,Kamijima,Kamikawa,Kamikawa,Kamikawa,Kaminokawa,Kamishihoro,Kamitonda,Kamiyama,Kanda,Kanna,Kasagi,Kasuya,Katsuura,Kawabe,Kawagoe,Kawajima,Kawamata,Kawamoto,Kawanehon,Kawanishi,Kawara,Kawasaki,Kawasaki,Kawatana,Kawazu,Kihoku,Kikonai,Kin,Kiso,Kitagata,Kitajima,Kiyama,Kiyosato,Kofu,Koge,Kohoku,Kokonoe,Kora,Kosa,Kosaka,Kotohira,Kudoyama,Kumejima,Kumenan,Kumiyama,Kunitomi,Kurate,Kushimoto,Kutchan,Kyonan,Kyotamba,Mashike,Matsumae,Mifune,Mihama,Minabe,Minami,Minamiechizen,Minamioguni,Minamiosumi,Minamitane,Misaki,Misasa,Misato,Miyashiro,Miyoshi,Mori,Moseushi,Mutsuzawa,Nagaizumi,Nagatoro,Nagayo,Nagomi,Nakadomari,Nakanojo,Nakashibetsu,Nakatosa,Namegawa,Namie,Nanbu,Nanporo,Naoshima,Nasu,Niseko,Nishihara,Nishiizu,Nishikatsura,Nishikawa,Nishinoshima,Nishiwaga,Nogi,Noto,Nyuzen,Oarai,Obuse,Odai,Ogawara,Oharu,Oi,Oirase,Oishida,Oiso,Oizumi,Oji,Okagaki,Oketo,Okutama,Omu,Ono,Osaki,Osakikamijima,Otobe,Otsuki,Owani,Reihoku,Rifu,Rikubetsu,Rishiri,Rokunohe,Ryuo,Saka,Sakuho,Samani,Satsuma,Sayo,Saza,Setana,Shakotan,Shibayama,Shikama,Shimamoto,Shimizu,Shimokawa,Shintomi,Shirakawa,Shisui,Shitara,Sobetsu,Sue,Sumita,Suooshima,Suttsu,Tabuse,Tachiarai,Tadami,Tadaoka,Taiji,Taiki,Takachiho,Takahama,Taketoyo,Tako,Taragi,Tateshina,Tatsugo,Tawaramoto,Teshikaga,Tobe,Toin,Tokigawa,Toma,Tomioka,Tonosho,Tosa,Toyo,Toyokoro,Toyotomi,Toyoyama,Tsubata,Tsubetsu,Tsukigata,Tsunan,Tsuno,Tsuwano,Umi,Wakasa,Yamamoto,Yamanobe,Yamatsuri,Yanaizu,Yasuda,Yoichi,Yonaguni,Yoro,Yoshino,Yubetsu,Yugawara,Yuni,Yusuhara,Yuza"},
        {name: "Portuguese", i: 13, min: 5, max: 11, d: "", m: .1, b: "Abrigada,Afonsoeiro,Agueda,Aguiar,Aguilada,Alagoas,Alagoinhas,Albufeira,Alcacovas,Alcanhoes,Alcobaca,Alcochete,Alcoutim,Aldoar,Alexania,Alfeizerao,Algarve,Alenquer,Almada,Almagreira,Almeirim,Alpalhao,Alpedrinha,Alvalade,Alverca,Alvor,Alvorada,Amadora,Amapa,Amieira,Anapolis,Anhangueira,Ansiaes,Apelacao,Aracaju,Aranhas,Arega,Areira,Araguaina,Araruama,Arganil,Armacao,Arouca,Asfontes,Assenceira,Avelar,Aveiro,Azambuja,Azinheira,Azueira,Bahia,Bairros,Balsas,Barcarena,Barreiras,Barreiro,Barretos,Batalha,Beira,Beja,Benavente,Betim,Boticas,Braga,Braganca,Brasilia,Brejo,Cabecao,Cabeceiras,Cabedelo,Cabofrio,Cachoeiras,Cadafais,Calheta,Calihandriz,Calvao,Camacha,Caminha,Campinas,Canidelo,Canha,Canoas,Capinha,Carmoes,Cartaxo,Carvalhal,Carvoeiro,Cascavel,Castanhal,Castelobranco,Caueira,Caxias,Chapadinha,Chaves,Celheiras,Cocais,Coimbra,Comporta,Coentral,Conde,Copacabana,Coqueirinho,Coruche,Corumba,Couco,Cubatao,Curitiba,Damaia,Doisportos,Douradilho,Dourados,Enxames,Enxara,Erada,Erechim,Ericeira,Ermidasdosado,Ervidel,Escalhao,Escariz,Esmoriz,Estombar,Espinhal,Espinho,Esposende,Esquerdinha,Estela,Estoril,Eunapolis,Evora,Famalicao,Famoes,Fanhoes,Fanzeres,Fatela,Fatima,Faro,Felgueiras,Ferreira,Figueira,Flecheiras,Florianopolis,Fornalhas,Fortaleza,Freiria,Freixeira,Frielas,Fronteira,Funchal,Fundao,Gaeiras,Gafanhadaboahora,Goa,Goiania,Gracas,Gradil,Grainho,Gralheira,Guarulhos,Guetim,Guimaraes,Horta,Iguacu,Igrejanova,Ilhavo,Ilheus,Ipanema,Iraja,Itaboral,Itacuruca,Itaguai,Itanhaem,Itapevi,Juazeiro,Lagos,Lavacolchos,Laies,Lamego,Laranjeiras,Leiria,Limoeiro,Linhares,Lisboa,Lomba,Lorvao,Lourencomarques,Lourical,Lourinha,Luziania,Macao,Macapa,Macedo,Machava,Malveira,Manaus,Mangabeira,Mangaratiba,Marambaia,Maranhao,Maringue,Marinhais,Matacaes,Matosinhos,Maxial,Maxias,Mealhada,Meimoa,Meires,Milharado,Mira,Miranda,Mirandela,Mogadouro,Montalegre,Montesinho,Moura,Mourao,Mozelos,Negroes,Neiva,Nespereira,Nilopolis,Niteroi,Nordeste,Obidos,Odemira,Odivelas,Oeiras,Oleiros,Olhao,Olhalvo,Olhomarinho,Olinda,Olival,Oliveira,Oliveirinha,Oporto,Ourem,Ovar,Palhais,Palheiros,Palmeira,Palmela,Palmital,Pampilhosa,Pantanal,Paradinha,Parelheiros,Paripueira,Paudalho,Pedrosinho,Penafiel,Peniche,Pedrogao,Pegoes,Pinhao,Pinheiro,Pinhel,Pombal,Pontal,Pontinha,Portel,Portimao,Poxim,Quarteira,Queijas,Queluz,Quiaios,Ramalhal,Reboleira,Recife,Redinha,Ribadouro,Ribeira,Ribeirao,Rosais,Roteiro,Sabugal,Sacavem,Sagres,Sandim,Sangalhos,Santarem,Santos,Sarilhos,Sarzedas,Satao,Satuba,Seixal,Seixas,Seixezelo,Seixo,Selmes,Sepetiba,Serta,Setubal,Silvares,Silveira,Sinhaem,Sintra,Sobral,Sobralinho,Sorocaba,Tabuacotavir,Tabuleiro,Taveiro,Teixoso,Telhado,Telheiro,Tomar,Torrao,Torreira,Torresvedras,Tramagal,Trancoso,Troviscal,Vagos,Valpacos,Varzea,Vassouras,Velas,Viana,Vidigal,Vidigueira,Vidual,Viladerei,Vilamar,Vimeiro,Vinhais,Vinhos,Viseu,Vitoria,Vlamao,Vouzela"},
        {name: "Nahuatl", i: 14, min: 6, max: 13, d: "l", m: 0, b: "Acaltepec,Acaltepecatl,Acapulco,Acatlan,Acaxochitlan,Ajuchitlan,Atotonilco,Azcapotzalco,Camotlan,Campeche,Chalco,Chapultepec,Chiapan,Chiapas,Chihuahua,Cihuatlan,Cihuatlancihuatl,Coahuila,Coatepec,Coatlan,Coatzacoalcos,Colima,Colotlan,Coyoacan,Cuauhillan,Cuauhnahuac,Cuauhtemoc,Cuernavaca,Ecatepec,Epatlan,Guanajuato,Huaxacac,Huehuetlan,Hueyapan,Ixtapa,Iztaccihuatl,Iztapalapa,Jalisco,Jocotepec,Jocotepecxocotl,Matixco,Mazatlan,Michhuahcan,Michoacan,Michoacanmichin,Minatitlan,Naucalpan,Nayarit,Nezahualcoyotl,Oaxaca,Ocotepec,Ocotlan,Olinalan,Otompan,Popocatepetl,Queretaro,Sonora,Tabasco,Tamaulipas,Tecolotlan,Tenochtitlan,Teocuitlatlan,Teocuitlatlanteotl,Teotlalco,Teotlalcoteotl,Tepotzotlan,Tepoztlantepoztli,Texcoco,Tlachco,Tlalocan,Tlaxcala,Tlaxcallan,Tollocan,Tolutepetl,Tonanytlan,Tototlan,Tuchtlan,Tuxpan,Uaxacac,Xalapa,Xochimilco,Xolotlan,Yaotlan,Yopico,Yucatan,Yztac,Zacatecas,Zacualco"},
        {name: "Hungarian", i: 15, min: 6, max: 13, d: "", m: 0.1, b: "Aba,Abadszalok,Abony,Adony,Ajak,Albertirsa,Alsozsolca,Aszod,Babolna,Bacsalmas,Baktaloranthaza,Balassagyarmat,Balatonalmadi,Balatonboglar,Balatonfured,Balatonfuzfo,Balkany,Balmazujvaros,Barcs,Bataszek,Batonyterenye,Battonya,Bekes,Berettyoujfalu,Berhida,Biatorbagy,Bicske,Biharkeresztes,Bodajk,Boly,Bonyhad,Budakalasz,Budakeszi,Celldomolk,Csakvar,Csenger,Csongrad,Csorna,Csorvas,Csurgo,Dabas,Demecser,Derecske,Devavanya,Devecser,Dombovar,Dombrad,Dorogullo,Dunafoldvar,Dunaharaszti,Dunavarsany,Dunavecse,Edeleny,Elek,Emod,Encs,Enying,Ercsi,Fegyvernek,Fehergyarmat,Felsozsolca,Fertoszentmiklos,Fonyod,Fot,Fuzesabony,Fuzesgyarmat,Gardony,God,Gyal,Gyomaendrod,Gyomro,Hajdudorog,Hajduhadhaz,Hajdunanas,Hajdusamson,Hajduszoboszlo,Halasztelek,Harkany,Hatvan,Heves,Heviz,Ibrany,Isaszeg,Izsak,Janoshalma,Janossomorja,Jaszapati,Jaszarokszallas,Jaszfenyszaru,Jaszkiser,Kaba,Kalocsa,Kapuvar,Karcag,Kecel,Kemecse,Kenderes,Kerekegyhaza,Kerepes,Keszthely,Kisber,Kiskoros,Kiskunmajsa,Kistarcsa,Kistelek,Kisujszallas,Kisvarda,Komadi,Komarom,Komlo,Kormend,Korosladany,Koszeg,Kozarmisleny,Kunhegyes,Kunszentmarton,Kunszentmiklos,Labatlan,Lajosmizse,Lenti,Letavertes,Letenye,Lorinci,Maglod,Mako,Mandok,Marcali,Martfu,Martonvasar,Mateszalka,Melykut,Mezobereny,Mezocsat,Mezohegyes,Mezokeresztes,Mezokovacshaza,Mezokovesd,Mezotur,Mindszent,Mohacs,Monor,Mor,Morahalom,Nadudvar,Nagyatad,Nagyecsed,Nagyhalasz,Nagykallo,Nagykata,Nagykoros,Nagymaros,Nyekladhaza,Nyergesujfalu,Nyiradony,Nyirbator,Nyirmada,Nyirtelek,Ocsa,Orkeny,Oroszlany,Paks,Pannonhalma,Paszto,Pecel,Pecsvarad,Pilis,Pilisvorosvar,Polgar,Polgardi,Pomaz,Puspokladany,Pusztaszabolcs,Putnok,Racalmas,Rackeve,Rakamaz,Rakoczifalva,Sajoszentpeter,Sandorfalva,Sarbogard,Sarkad,Sarospatak,Sarvar,Satoraljaujhely,Siklos,Simontornya,Solt,Soltvadkert,Sumeg,Szabadszallas,Szarvas,Szazhalombatta,Szecseny,Szeghalom,Szendro,Szentgotthard,Szentlorinc,Szerencs,Szigethalom,Szigetvar,Szikszo,Tab,Tamasi,Tapioszele,Tapolca,Tat,Tata,Teglas,Tet,Tiszacsege,Tiszafoldvar,Tiszafured,Tiszakecske,Tiszalok,Tiszaujvaros,Tiszavasvari,Tokaj,Tokol,Tolna,Tompa,Torokbalint,Torokszentmiklos,Totkomlos,Tura,Turkeve,Ujkigyos,ujszasz,Vamospercs,Varpalota,Vasarosnameny,Vasvar,Vecses,Velence,Veresegyhaz,Verpelet,Veszto,Zahony,Zalaszentgrot,Zirc,Zsambek"},
        {name: "Turkish", i: 16, min: 4, max: 10, d: "", m: 0, b: "Adapazari,Adiyaman,Afshin,Afyon,Ari,Akchaabat,Akchakale,Akchakoca,Akdamadeni,Akhisar,Aksaray,Akshehir,Alaca,Alanya,Alapli,Alashehir,Amasya,Anamur,Antakya,Ardeshen,Artvin,Aydin,Ayvalik,Babaeski,Bafra,Balikesir,Bandirma,Bartin,Bashiskele,Batman,Bayburt,Belen,Bergama,Besni,Beypazari,Beyshehir,Biga,Bilecik,Bingul,Birecik,Bismil,Bitlis,Bodrum,Bolu,Bolvadin,Bor,Bostanichi,Boyabat,Bozuyuk,Bucak,Bulancak,Bulanik,Burdur,Burhaniye,Chan,Chanakkale,Chankiri,Charshamba,Chaycuma,Chayeli,Chayirova,Cherkezkuy,Cheshme,Ceyhan,Ceylanpinar,Chine,Chivril,Cizre,Chorlu,Chumra,Dalaman,Darica,Denizli,Derik,Derince,Develi,Devrek,Didim,Dilovasi,Dinar,Diyadin,Diyarbakir,Doubayazit,Durtyol,Duzce,Duzichi,Edirne,Edremit,Elazi,Elbistan,Emirda,Erbaa,Ercish,Erdek,Erdemli,Ereli,Ergani,Erzin,Erzincan,Erzurum,Eskishehir,Fatsa,Fethiye,Gazipasha,Gebze,Gelibolu,Gerede,Geyve,Giresun,Guksun,Gulbashi,Gulcuk,Gurnen,Gumushhane,Guroymak,Hakkari,Harbiye,Havza,Hayrabolu,Hilvan,Idil,Idir,Ilgin,Imamolu,Incirliova,Inegul,Iskenderun,Iskilip,Islahiye,Isparta,Izmit,Iznik,Kadirli,Kahramanmarash,Kahta,Kaman,Kapakli,Karabuk,Karacabey,Karadeniz Ereli,Karakupru,Karaman,Karamursel,Karapinar,Karasu,Kars,Kartepe,Kastamonu,Kemer,Keshan,Kilimli,Kilis,Kirikhan,Kirikkale,Kirklareli,Kirshehir,Kiziltepe,Kurfez,Korkuteli,Kovancilar,Kozan,Kozlu,Kozluk,Kulu,Kumluca,Kurtalan,Kushadasi,Kutahya,Luleburgaz,Malatya,Malazgirt,Malkara,Manavgat,Manisa,Mardin,Marmaris,Mersin,Merzifon,Midyat,Milas,Mula,Muratli,Mush,Mut,Nazilli,Nevshehir,Nide,Niksar,Nizip,Nusaybin,udemish,Oltu,Ordu,Orhangazi,Ortaca,Osmancik,Osmaniye,Patnos,Payas,Pazarcik,Polatli,Reyhanli,Rize,Safranbolu,Salihli,Samanda,Samsun,Sandikli,shanliurfa,Saray,Sarikamish,Sarikaya,sharkishla,shereflikochhisar,Serik,Serinyol,Seydishehir,Siirt,Silifke,Silopi,Silvan,Simav,Sinop,shirnak,Sivas,Siverek,Surke,Soma,Sorgun,Suluova,Sungurlu,Suruch,Susurluk,Tarsus,Tatvan,Tavshanli,Tekirda,Terme,Tire,Tokat,Tosya,Trabzon,Tunceli,Turgutlu,Turhal,Unye,Ushak,Uzunkurpru,Van,Vezirkurpru,Viranshehir,Yahyali,Yalova,Yenishehir,Yerkury,Yozgat,Yuksekova,Zile,Zonguldak"},
        {name: "Berber", i: 17, min: 4, max: 10, d: "s", m: .2, b: "Abkhouch,Adrar,Agadir,Agelmam,Aghmat,Agrakal,Agulmam,Ahaggar,Almou,Anfa,Annaba,Aousja,Arbat,Argoub,Arif,Asfi,Assamer,Assif,Azaghar,Azmour,Azrou,Beccar,Beja,Bennour,Benslimane,Berkane,Berrechid,Bizerte,Bouskoura,Boutferda,Dar Bouazza,Darallouch,Darchaabane,Dcheira,Denden,Djebel,Djedeida,Drargua,Essaouira,Ezzahra,Fas,Fnideq,Ghezeze,Goubellat,Grisaffen,Guelmim,Guercif,Hammamet,Harrouda,Hoceima,Idurar,Ifendassen,Ifoghas,Imilchil,Inezgane,Izoughar,Jendouba,Kacem,Kelibia,Kenitra,Kerrando,Khalidia,Khemisset,Khenifra,Khouribga,Kidal,Korba,Korbous,Lahraouyine,Larache,Leyun,Lqliaa,Manouba,Martil,Mazagan,Mcherga,Mdiq,Megrine,Mellal,Melloul,Midelt,Mohammedia,Mornag,Mrrakc,Nabeul,Nadhour,Nador,Nawaksut,Nefza,Ouarzazate,Ouazzane,Oued Zem,Oujda,Ouladteima,Qsentina,Rades,Rafraf,Safi,Sefrou,Sejnane,Settat,Sijilmassa,Skhirat,Slimane,Somaa,Sraghna,Susa,Tabarka,Taferka,Tafza,Tagbalut,Tagerdayt,Takelsa,Tanja,Tantan,Taourirt,Taroudant,Tasfelalayt,Tattiwin,Taza,Tazerka,Tazizawt,Tebourba,Teboursouk,Temara,Testour,Tetouan,Tibeskert,Tifelt,Tinariwen,Tinduf,Tinja,Tiznit,Toubkal,Trables,Tubqal,Tunes,Urup,Watlas,Wehran,Wejda,Youssoufia,Zaghouan,Zahret,Zemmour,Zriba"},
        {name: "Arabic", i: 18, min: 4, max: 9, d: "ae", m: .2, b: "Abadilah,Abayt,Abha,Abud,Aden,Ahwar,Ajman,Alabadilah,Alabar,Alahjer,Alain,Alaraq,Alarish,Alarjam,Alashraf,Alaswaaq,Alawali,Albarar,Albawadi,Albirk,Aldhabiyah,Alduwaid,Alfareeq,Algayed,Alhada,Alhafirah,Alhamar,Alharam,Alharidhah,Alhawtah,Alhazim,Alhrateem,Alhudaydah,Alhujun,Alhuwaya,Aljahra,Aljohar,Aljubail,Alkawd,Alkhalas,Alkhawaneej,Alkhen,Alkhhafah,Alkhobar,Alkhuznah,Alkiranah,Allisafah,Allith,Almadeed,Almardamah,Almarwah,Almasnaah,Almejammah,Almojermah,Almshaykh,Almurjan,Almuwayh,Almuzaylif,Alnaheem,Alnashifah,Alqadeimah,Alqah,Alqahma,Alqalh,Alqouz,Alquaba,Alqunfudhah,Alqurayyat,Alradha,Alraqmiah,Alsadyah,Alsafa,Alshagab,Alshoqiq,Alshuqaiq,Alsilaa,Althafeer,Alwakrah,Alwasqah,Amaq,Amran,Annaseem,Aqbiyah,Arafat,Arar,Ardah,Arrawdah,Asfan,Ashayrah,Ashshahaniyah,Askar,Assaffaniyah,Ayaar,Aziziyah,Baesh,Bahrah,Baish,Balhaf,Banizayd,Baqaa,Baqal,Bidiyah,Bisha,Biyatah,Buqhayq,Burayda,Dafiyat,Damad,Dammam,Dariyah,Daynah,Dhafar,Dhahran,Dhalkut,Dhamar,Dhubab,Dhurma,Dibab,Dirab,Doha,Dukhan,Duwaibah,Enaker,Fadhla,Fahaheel,Fanateer,Farasan,Fardah,Fujairah,Ghalilah,Ghar,Ghizlan,Ghomgyah,Ghran,Hababah,Habil,Hadiyah,Haffah,Hajanbah,Hajrah,Halban,Haqqaq,Haradh,Hasar,Hathah,Hawarwar,Hawaya,Hawiyah,Hebaa,Hefar,Hijal,Husnah,Huwailat,Huwaitah,Irqah,Isharah,Ithrah,Jamalah,Jarab,Jareef,Jarwal,Jash,Jazan,Jeddah,Jiblah,Jihanah,Jilah,Jizan,Joha,Joraibah,Juban,Jubbah,Juddah,Jumeirah,Kamaran,Keyad,Khab,Khabtsaeed,Khaiybar,Khasab,Khathirah,Khawarah,Khulais,Khulays,Klayah,Kumzar,Limah,Linah,Mabar,Madrak,Mahab,Mahalah,Makhtar,Makshosh,Manfuhah,Manifah,Manshabah,Mareah,Masdar,Mashwar,Masirah,Maskar,Masliyah,Mastabah,Maysaan,Mazhar,Mdina,Meeqat,Mirbah,Mirbat,Mokhtara,Muharraq,Muladdah,Musandam,Musaykah,Muscat,Mushayrif,Musrah,Mussafah,Mutrah,Nafhan,Nahdah,Nahwa,Najran,Nakhab,Nizwa,Oman,Qadah,Qalhat,Qamrah,Qasam,Qatabah,Qawah,Qosmah,Qurain,Quraydah,Quriyat,Qurwa,Rabigh,Radaa,Rafha,Rahlah,Rakamah,Rasheedah,Rasmadrakah,Risabah,Rustaq,Ryadh,Saabah,Saabar,Sabtaljarah,Sabya,Sadad,Sadah,Safinah,Saham,Sahlat,Saihat,Salalah,Salmalzwaher,Salmiya,Sanaa,Sanaban,Sayaa,Sayyan,Shabayah,Shabwah,Shafa,Shalim,Shaqra,Sharjah,Sharkat,Sharurah,Shatifiyah,Shibam,Shidah,Shifiyah,Shihar,Shoqra,Shoqsan,Shuwaq,Sibah,Sihmah,Sinaw,Sirwah,Sohar,Suhailah,Sulaibiya,Sunbah,Tabuk,Taif,Taqah,Tarif,Tharban,Thumrait,Thuqbah,Thuwal,Tubarjal,Turaif,Turbah,Tuwaiq,Ubar,Umaljerem,Urayarah,Urwah,Wabrah,Warbah,Yabreen,Yadamah,Yafur,Yarim,Yemen,Yiyallah,Zabid,Zahwah,Zallaq,Zinjibar,Zulumah"},
        {name: "Inuit", i: 19, min: 5, max: 15, d: "alutsn", m: 0, b: "Aaluik,Aappilattoq,Aasiaat,Agdleruussakasit,Aggas,Akia,Akilia,Akuliaruseq,Akuliarutsip,Akunnaaq,Agissat,Agssaussat,Alluitsup,Alluttoq,Aluit,Aluk,Ammassalik,Amarortalik,Amitsorsuaq,Anarusuk,Angisorsuaq,Anguniartarfik,Annertussoq,Annikitsoq,Anoraliuirsoq,Appat,Apparsuit,Apusiaajik,Arsivik,Arsuk,Ataa,Atammik,Ateqanngitsorsuaq,Atilissuaq,Attu,Aukarnersuaq,Augpalugtoq, Aumat,Auvilikavsak,Auvilkikavsaup,Avadtlek,Avallersuaq,Bjornesk,Blabaerdalen,Blomsterdalen,Brattalhid,Bredebrae,Brededal,Claushavn,Edderfulegoer,Egger,Eqalugalinnguit,Eqalugarssuit,Eqaluit,Eqqua,Etah,Graah,Hakluyt,Haredalen,Hareoen,Hundeo,Igdlorssuit,Igaliku,Igdlugdlip,Igdluluarssuk,Iginniafik,Ikamiuk,Ikamiut,Ikarissat,Ikateq,Ikeq,Ikerasak,Ikerasaarsuk,Ikermiut,Ikermoissuaq,Ikertivaq,Ikorfarssuit,Ikorfat,Ilimanaq,Illorsuit,Iluileq,Iluiteq,Ilulissat,Illunnguit,Imaarsivik,Imartunarssuk,Immikkoortukajik,Innaarsuit,Ingjald,Inneruulalik,Inussullissuaq,Iqek,Ikerasakassak,Iperaq,Ippik,Isortok,Isungartussoq,Itileq,Itivdleq,Itissaalik,Ittit,Ittoqqortoormiit,Ivingmiut,Ivittuut,Kanajoorartuut,Kangaamiut,Kangaarsuk,Kangaatsiaq,Kangeq,Kangerluk,Kangerlussuaq,Kanglinnguit,Kapisillit,Karrat,Kekertamiut,Kiatak,Kiatassuaq,Kiataussaq,Kigatak,Kigdlussat,Kinaussak,Kingittorsuaq,Kitak,Kitsissuarsuit,Kitsissut,Klenczner,Kook,Kraulshavn,Kujalleq,Kullorsuaq,Kulusuk,Kuurmiit,Kuusuaq,Laksedalen,Maniitsoq,Marrakajik,Mattaangassut,Mernoq,Mittivakkat,Moriusaq,Myggbukta,Naajaat,Nako,Nangissat,Nanortalik,Nanuuseq,Nappassoq,Narsarmijt,Narssaq,Narsarsuaq,Narssarssuk,Nasaussaq,Nasiffik,Natsiarsiorfik,Naujanguit,Niaqornaarsuk,Niaqornat,Nordfjordspasset,Nugatsiaq,Nuluuk,Nunaa,Nunarssit,Nunarsuaq,Nunataaq,Nunatakavsaup,Nutaarmiut,Nuugaatsiaq,Nuuk,Nuukullak,Nuuluk,Nuussuaq,Olonkinbyen,Oqaatsut,Oqaitsúnguit,Oqonermiut,Oodaaq,Paagussat,Palungataq,Pamialluk,Paamiut,Paatuut,Patuersoq,Perserajoq,Paornivik,Pituffik,Puugutaa,Puulkuip,Qaanaq,Qaarsorsuaq,Qaarsorsuatsiaq,Qaasuitsup,Qaersut,Qajartalik,Qallunaat,Qaneq,Qaqaarissorsuaq,Qaqit,Qaqortok,Qasigiannguit,Qasse,Qassimiut,Qeertartivaq,Qeertartivatsiaq,Qeqertaq,Qeqertarssdaq,Qeqertarsuaq,Qeqertasussuk,Qeqertarsuatsiaat,Qeqertat,Qeqqata,Qernertoq,Qernertunnguit,Qianarreq,Qilalugkiarfik,Qingagssat,Qingaq,Qoornuup,Qorlortorsuaq,Qullikorsuit,Qunnerit,Qutdleq,Ravnedalen,Ritenbenk,Rypedalen,Sarfannguit,Saarlia,Saarloq,Saatoq,Saatorsuaq,Saatup,Saattut,Sadeloe,Salleq,Salliaruseq,Sammeqqat,Sammisoq,Sanningassoq,Saqqaq,Saqqarlersuaq,Saqqarliit,Sarqaq,Sattiaatteq,Savissivik,Serfanguaq,Sermersooq,Sermersut,Sermilik,Sermiligaaq,Sermitsiaq,Simitakaja,Simiutaq,Singamaq,Siorapaluk,Sisimiut,Sisuarsuit,Skal,Skarvefjeld,Skjoldungen,Storoen,Sullorsuaq,Suunikajik,Sverdrup,Taartoq,Takiseeq,Talerua,Tarqo,Tasirliaq,Tasiusak,Tiilerilaaq,Timilersua,Timmiarmiut,Tingmjarmiut,Traill,Tukingassoq,Tuttorqortooq,Tuujuk,Tuttulissuup,Tussaaq,Uigordlit,Uigorlersuaq,Uilortussoq,Uiivaq,Ujuaakajiip,Ukkusissat,Umanat,Upernavik,Upernattivik,Upepnagssivik,Upernivik,Uttorsiutit,Uumannaq,Uummannaarsuk,Uunartoq,Uvkusigssat,Ymer"},
        {name: "Basque", i: 20, min: 4, max: 11, d: "r", m: .1, b: "Abadio,Abaltzisketa,Abanto Zierbena,Aduna,Agurain,Aia,Aiara,Aizarnazabal,Ajangiz,Albiztur,Alegia,Alkiza,Alonsotegi,Altzaga,Altzo,Amezketa,Amorebieta,Amoroto,Amurrio,Andoain,Anoeta,Antzuola,Arakaldo,Arama,Aramaio,Arantzazu,Arbatzegi ,Areatza,Aretxabaleta,Arraia,Arrankudiaga,Arrasate,Arratzu,Arratzua,Arrieta,Arrigorriaga,Artea,Artzentales,Artziniega,Asparrena,Asteasu,Astigarraga,Ataun,Atxondo,Aulesti,Azkoitia,Azpeitia,Bakio,Baliarrain,Balmaseda,Barakaldo,Barrika,Barrundia,Basauri,Bastida,Beasain,Bedia,Beizama,Belauntza,Berango,Berantevilla,Berastegi,Bergara,Bermeo,Bernedo,Berriatua,Berriz,Berrobi,Bidania,Bilar,Bilbao,Burgelu,Busturia,Deba,Derio,Dima,Donemiliaga,Donostia,Dulantzi,Durango,Ea,Eibar,Elantxobe,Elduain,Elgeta,Elgoibar,Elorrio,Erandio,Ere-o,Ermua,Errenteria,Errezil,Erribera Beitia,Erriberagoitia,Errigoiti,Eskoriatza,Eskuernaga,Etxebarri,Etxebarria,Ezkio,Fika,Forua,Fruiz,Gabiria,Gaintza,Galdakao,Galdames,Gamiz,Garai,Gasteiz,Gatika,Gatzaga,Gaubea,Gauna,Gautegiz Arteaga,Gaztelu,Gernika,Gerrikaitz,Getaria,Getxo,Gizaburuaga,Goiatz,Gordexola,Gorliz,Harana,Hernani,Hernialde,Hondarribia,Ibarra,Ibarrangelu,Idiazabal,Iekora,Igorre,Ikaztegieta,Iru-a Oka,Irun,Irura,Iruraiz,Ispaster,Itsaso,Itsasondo,Iurreta,Izurtza,Jatabe,Kanpezu,Karrantza Harana,Kortezubi,Kripan,Kuartango,Lanestosa,Lantziego,Larrabetzu,Larraul,Lasarte,Laudio,Laukiz,Lazkao,Leaburu,Legazpi,Legorreta,Legutio,Leintz,Leioa,Lekeitio,Lemoa,Lemoiz,Leza,Lezama,Lezo,Lizartza,Loiu,Lumo,Ma-aria,Maeztu,Mallabia,Markina,Maruri,Ma-ueta,Me-aka,Mendaro,Mendata,Mendexa,Moreda Araba,Morga,Mundaka,Mungia,Munitibar,Murueta,Muskiz,Mutiloa,Mutriku,Muxika,Nabarniz,O-ati,Oiartzun,Oion,Okondo,Olaberria,Ondarroa,Ordizia,Orendain,Orexa,Oria,Orio,Ormaiztegi,Orozko,Ortuella,Otxandio,Pasaia,Plentzia,Portugalete,Samaniego,Santurtzi,Segura,Sestao,Sondika,Sopela,Sopuerta,Soraluze,Sukarrieta,Tolosa,Trapagaran,Turtzioz,Ubarrundia,Ubide,Ugao,Urdua,Urduliz,Urizaharra,Urkabustaiz,Urnieta,Urretxu,Usurbil,Xemein,Zaia,Zaldibar,Zaldibia,Zalduondo,Zambrana,Zamudio,Zaratamo,Zarautz,Zeanuri,Zeberio,Zegama,Zerain,Zestoa,Zierbena,Zigoitia,Ziortza,Zizurkil,Zuia,Zumaia,Zumarraga"},
        {name: "Nigerian", i: 21, min: 4, max: 10, d: "", m: .3, b: "Abadogo,Abafon,Abdu,Acharu,Adaba,Adealesu,Adeto,Adyongo,Afaga,Afamju,Afuje,Agbelagba,Agigbigi,Agogoke,Ahute,Aiyelaboro,Ajebe,Ajola,Akarekwu,Akessan,Akunuba,Alawode,Alkaijji,Amangam,Amaoji,Amgbaye,Amtasa,Amunigun,Anase,Aniho,Animahun,Antul,Anyoko,Apekaa,Arapagi,Asamagidi,Asande,Ataibang,Awgbagba,Awhum,Awodu,Babanana,Babateduwa,Bagu,Bakura,Bandakwai,Bangdi,Barbo,Barkeje,Basa,Basabra,Basansagawa,Bieleshin,Bilikani,Birnindodo,Braidu,Bulakawa,Buriburi,Burisidna,Busum,Bwoi,Cainnan,Chakum,Charati,Chondugh,Dabibikiri,Dagwarga,Dallok,Danalili,Dandala,Darpi,Dhayaki,Dokatofa,Doma,Dozere,Duci,Dugan,Ebelibri,Efem,Efoi,Egudu,Egundugbo,Ekoku,Ekpe,Ekwere,Erhua,Eteu,Etikagbene,Ewhoeviri,Ewhotie,Ezemaowa,Fatima,Gadege,Galakura,Galea,Gamai,Gamen,Ganjin,Gantetudu,Garangamawa,Garema,Gargar,Gari,Garinbode,Garkuwa,Garu Kime,Gazabu,Gbure,Gerti,Gidan,Giringwe,Gitabaremu,Giyagiri,Giyawa,Gmawa,Golakochi,Golumba,Guchi,Gudugu,Gunji,Gusa,Gwambula,Gwamgwam,Gwodoti,Hayinlere,Hayinmaialewa,Hirishi,Hombo,Ibefum,Iberekodo,Ibodeipa,Icharge,Ideoro,Idofin,Idofinoka,Idya,Iganmeji,Igbetar,Igbogo,Ijoko,Ijuwa,Ikawga,Ikekogbe,Ikhin,Ikoro,Ikotefe,Ikotokpora,Ikpakidout,Ikpeoniong,Ilofa,Imuogo,Inyeneke,Iorsugh,Ipawo,Ipinlerere,Isicha,Itakpa,Itoki,Iyedeame,Jameri,Jangi,Jara,Jare,Jataudakum,Jaurogomki,Jepel,Jibam,Jirgu,Jirkange,Kafinmalama,Kamkem,Katab,Katanga,Katinda,Katirije,Kaurakimba,Keffinshanu,Kellumiri,Kiagbodor,Kibiare,Kingking,Kirbutu,Kita,Kogbo,Kogogo,Kopje,Koriga,Koroko,Korokorosei,Kotoku,Kuata,Kujum,Kukau,Kunboon,Kuonubogbene,Kurawe,Kushinahu,Kwaramakeri,Ladimeji,Lafiaro,Lahaga,Laindebajanle,Laindegoro,Lajere,Lakati,Ligeri,Litenswa,Lokobimagaji,Lusabe,Maba,Madarzai,Magoi,Maialewa,Maianita,Maijuja,Mairakuni,Maleh,Malikansaa,Mallamkola,Mallammaduri,Marmara,Masagu,Masoma,Mata,Matankali,Mbalare,Megoyo,Meku,Miama,Mige,Mkporagwu,Modi,Molafa,Mshi,Msugh,Muduvu,Murnachehu,Namnai,Nanumawa,Nasudu,Ndagawo,Ndamanma,Ndiebeleagu,Ndiwulunbe,Ndonutim,Ngaruwa,Ngbande,Nguengu,Nto Ekpe,Nubudi,Nyajo,Nyido,Nyior,Obafor,Obazuwa,Odajie,Odiama,Ofunatam,Ogali,Ogan,Ogbaga,Ogbahu,Ogultu,Ogunbunmi,Ogunmakin,Ojaota,Ojirami,Ojopode,Okehin,Olugunna,Omotunde,Onipede,Onisopi,Onma,Orhere,Orya,Oshotan,Otukwang,Otunade,Pepegbene,Poros,Rafin,Rampa,Rimi,Rinjim,Robertkiri,Rugan,Rumbukawa,Sabiu,Sabon,Sabongari,Sai,Salmatappare,Sangabama,Sarabe,Seboregetore,Seibiri,Sendowa,Shafar,Shagwa,Shata,Shefunda,Shengu,Sokoron,Sunnayu,Taberlma,Tafoki,Takula,Talontan,Taraku,Tarhemba,Tayu,Ter,Timtim,Timyam,Tindirke,Tirkalou,Tokunbo,Tonga,Torlwam,Tseakaadza,Tseanongo,Tseavungu,Tsebeeve,Tsekov,Tsepaegh,Tuba,Tumbo,Tungalombo,Tungamasu,Tunganrati,Tunganyakwe,Tungenzuri,Ubimimi,Uhkirhi,Umoru,Umuabai,Umuaja,Umuajuju,Umuimo,Umuojala,Unchida,Ungua,Unguwar,Unongo,Usha,Ute,Utongbo,Vembera,Vorokotok,Wachin,Walebaga,Wurawura,Wuro,Yanbashi,Yanmedi,Yenaka,Yoku,Zamangera,Zarunkwari,Zilumo,Zulika"},
        {name: "Celtic", i: 22, min: 4, max: 12, d: "nld", m: 0, b: "Aberaman,Aberangell,Aberarth,Aberavon,Aberbanc,Aberbargoed,Aberbeeg,Abercanaid,Abercarn,Abercastle,Abercegir,Abercraf,Abercregan,Abercych,Abercynon,Aberdare,Aberdaron,Aberdaugleddau,Aberdeen,Aberdulais,Aberdyfi,Aberedw,Abereiddy,Abererch,Abereron,Aberfan,Aberffraw,Aberffrwd,Abergavenny,Abergele,Aberglasslyn,Abergorlech,Abergwaun,Abergwesyn,Abergwili,Abergwynfi,Abergwyngregyn,Abergynolwyn,Aberhafesp,Aberhonddu,Aberkenfig,Aberllefenni,Abermain,Abermaw,Abermorddu,Abermule,Abernant,Aberpennar,Aberporth,Aberriw,Abersoch,Abersychan,Abertawe,Aberteifi,Aberthin,Abertillery,Abertridwr,Aberystwyth,Achininver,Afonhafren,Alisaha,Antinbhearmor,Ardenna,Attacon,Beira,Bhrura,Boioduro,Bona,Boudobriga,Bravon,Brigant,Briganta,Briva,Cambodunum,Cambra,Caracta,Catumagos,Centobriga,Ceredigion,Chalain,Dinn,Diwa,Dubingen,Duro,Ebora,Ebruac,Eburodunum,Eccles,Eighe,Eireann,Ferkunos,Genua,Ghrainnse,Inbhear,Inbhir,Inbhirair,Innerleithen,Innerleven,Innerwick,Inver,Inveraldie,Inverallan,Inveralmond,Inveramsay,Inveran,Inveraray,Inverarnan,Inverbervie,Inverclyde,Inverell,Inveresk,Inverfarigaig,Invergarry,Invergordon,Invergowrie,Inverhaddon,Inverkeilor,Inverkeithing,Inverkeithney,Inverkip,Inverleigh,Inverleith,Inverloch,Inverlochlarig,Inverlochy,Invermay,Invermoriston,Inverness,Inveroran,Invershin,Inversnaid,Invertrossachs,Inverugie,Inveruglas,Inverurie,Kilninver,Kirkcaldy,Kirkintilloch,Krake,Latense,Leming,Lindomagos,Llanaber,Lochinver,Lugduno,Magoduro,Monmouthshire,Narann,Novioduno,Nowijonago,Octoduron,Penning,Pheofharain,Ricomago,Rossinver,Salodurum,Seguia,Sentica,Theorsa,Uige,Vitodurum,Windobona"},
        {name: "Mesopotamian", i: 23, min: 4, max: 9, d: "srpl", m: .1, b: "Adab,Akkad,Akshak,Amnanum,Arbid,Arpachiyah,Arrapha,Assur,Babilim,Badtibira,Balawat,Barsip,Borsippa,Carchemish,Chagar Bazar,Chuera,Ctesiphon ,Der,Dilbat,Diniktum,Doura,Durkurigalzu,Ekallatum,Emar,Erbil,Eridu,Eshnunn,Fakhariya ,Gawra,Girsu,Hadatu,Hamoukar,Haradum,Harran,Hatra,Idu,Irisagrig,Isin,Jemdet,Kahat,Kartukulti,Khaiber,Kish ,Kisurra,Kuara,Kutha,Lagash,Larsa ,Leilan,Marad,Mardaman,Mari,Mashkan,Mumbaqat ,Nabada,Nagar,Nerebtum,Nimrud,Nineveh,Nippur,Nuzi,Qalatjarmo,Qatara,Rawda,Seleucia,Shaduppum,Shanidar,Sharrukin,Shemshara,Shibaniba,Shuruppak,Sippar,Tarbisu,Tellagrab,Tellessawwan,Tellessweyhat,Tellhassuna,Telltaya,Telul,Terqa,Thalathat,Tutub,Ubaid ,Umma,Ur,Urfa,Urkesh,Uruk,Urum,Zabalam,Zenobia"},
        {name: "Iranian", i: 24, min: 5, max: 11, d: "", m: .1, b: "Abali,Abrisham,Absard,Abuzeydabad,Afus,Alavicheh,Alikosh,Amol,Anarak,Anbar,Andisheh,Anshan,Aran,Ardabil,Arderica,Ardestan,Arjomand,Asgaran,Asgharabad,Ashian,Awan,Babajan,Badrud,Bafran,Baghestan,Baghshad,Bahadoran,Baharan Shahr,Baharestan,Bakun,Bam,Baqershahr,Barzok,Bastam,Behistun,Bitistar,Bumahen,Bushehr,Chadegan,Chahardangeh,Chamgardan,Chermahin,Choghabonut,Chugan,Damaneh,Damavand,Darabgard,Daran,Dastgerd,Dehaq,Dehaqan,Dezful,Dizicheh,Dorcheh,Dowlatabad,Duruntash,Ecbatana,Eslamshahr,Estakhr,Ezhiyeh,Falavarjan,Farrokhi,Fasham,Ferdowsieh,Fereydunshahr,Ferunabad,Firuzkuh,Fuladshahr,Ganjdareh,Ganzak,Gaz,Geoy,Godin,Goldasht,Golestan,Golpayegan,Golshahr,Golshan,Gorgab,Guged,Habibabad,Hafshejan,Hajjifiruz,Hana,Harand,Hasanabad,Hasanlu,Hashtgerd,Hecatompylos,Hormirzad,Imanshahr,Isfahan,Jandaq,Javadabad,Jiroft,Jowsheqan ,Jowzdan,Kabnak,Kahriz Sang,Kahrizak,Kangavar,Karaj,Karkevand,Kashan,Kelishad,Kermanshah,Khaledabad,Khansar,Khorramabad,Khur,Khvorzuq,Kilan,Komeh,Komeshcheh,Konar,Kuhpayeh,Kul,Kushk,Lavasan,Laybid,Liyan,Lyan,Mahabad,Mahallat,Majlesi,Malard,Manzariyeh,Marlik,Meshkat,Meymeh,Miandasht,Mish,Mobarakeh,Nahavand,Nain,Najafabad,Naqshe,Narezzash,Nasimshahr,Nasirshahr,Nasrabad,Natanz,Neyasar,Nikabad,Nimvar,Nushabad,Pakdasht,Parand,Pardis,Parsa,Pasargadai,Patigrabana,Pir Bakran,Pishva,Qahderijan,Qahjaverestan,Qamsar,Qarchak,Qods,Rabat,Ray-shahr,Rezvanshahr,Rhages,Robat Karim,Rozveh,Rudehen,Sabashahr,Safadasht,Sagzi,Salehieh,Sandal,Sarvestan,Sedeh,Sefidshahr,Semirom,Semnan,Shadpurabad,Shah,Shahdad,Shahedshahr,Shahin,Shahpour,Shahr,Shahreza,Shahriar,Sharifabad,Shemshak,Shiraz,Shushan,Shushtar,Sialk,Sin,Sukhteh,Tabas,Tabriz,Takhte,Talkhuncheh,Talli,Tarq,Temukan,Tepe,Tiran,Tudeshk,Tureng,Urmia,Vahidieh,Vahrkana,Vanak,Varamin,Varnamkhast,Varzaneh,Vazvan,Yahya,Yarim,Yasuj,Zarrin Shahr,Zavareh,Zayandeh,Zazeran,Ziar,Zibashahr,Zranka"},
        {name: "Hawaiian", i: 25, min: 5, max: 10, d: "auo", m: 1, b: "Aapueo,Ahoa,Ahuakaio,Ahuakamalii,Ahuakeio,Ahupau,Aki,Alaakua,Alae,Alaeloa,Alaenui,Alamihi,Aleamai,Alena,Alio,Aupokopoko,Auwahi,Hahakea,Haiku,Halakaa,Halehaku,Halehana,Halemano,Haleu,Haliimaile,Hamakuapoko,Hamoa,Hanakaoo,Hanaulu,Hanawana,Hanehoi,Haneoo,Haou,Hikiaupea,Hoalua,Hokuula,Honohina,Honokahua,Honokala,Honokalani,Honokeana,Honokohau,Honokowai,Honolua,Honolulu,Honolulunui,Honomaele,Honomanu,Hononana,Honopou,Hoolawa,Hopenui,Hualele,Huelo,Hulaia,Ihuula,Ilikahi,Kaalaea,Kaalelehinale,Kaapahu,Kaehoeho,Kaeleku,Kaeo,Kahakuloa,Kahalawe,Kahalawe,Kahalehili,Kahana,Kahilo,Kahuai,Kaiaula,Kailihiakoko,Kailua,Kainehe,Kakalahale,Kakanoni,Kakio,Kakiweka,Kalena,Kalenanui,Kaleoaihe,Kalepa,Kaliae,Kalialinui,Kalihi,Kalihi,Kalihi,Kalimaohe,Kaloi,Kamani,Kamaole,Kamehame,Kanahena,Kanaio,Kaniaula,Kaonoulu,Kaopa,Kapaloa,Kapaula,Kapewakua,Kapohue,Kapuaikini,Kapunakea,Kapuuomahuka,Kauau,Kauaula,Kaukuhalahala,Kaulalo,Kaulanamoa,Kauluohana,Kaumahalua,Kaumakani,Kaumanu,Kaunauhane,Kaunuahane,Kaupakulua,Kawaipapa,Kawaloa,Kawaloa,Kawalua,Kawela,Keaa,Keaalii,Keaaula,Keahua,Keahuapono,Keakuapauaela,Kealahou,Keanae,Keauhou,Kekuapawela,Kelawea,Keokea,Keopuka,Kepio,Kihapuhala,Kikoo,Kilolani,Kipapa,Koakupuna,Koali,Koananai,Koheo,Kolea,Kolokolo,Kooka,Kopili,Kou,Kualapa,Kuhiwa,Kuholilea,Kuhua,Kuia,Kuiaha,Kuikui,Kukoae,Kukohia,Kukuiaeo,Kukuioolu,Kukuipuka,Kukuiula,Kulahuhu,Kumunui,Lapakea,Lapalapaiki,Lapueo,Launiupoko,Loiloa,Lole,Lualailua,Maalo,Mahinahina,Mahulua,Maiana,Mailepai,Makaakini,Makaalae,Makaehu,Makaiwa,Makaliua,Makapipi,Makapuu,Makawao,Makila,Mala,Maluaka,Mamalu,Manawaiapiki,Manawainui,Maulili,Mehamenui,Miana,Mikimiki,Moalii,Moanui,Mohopili,Mohopilo,Mokae,Mokuia,Mokupapa,Mooiki,Mooloa,Moomuku,Muolea,Nahuakamalii,Nailiilipoko,Nakaaha,Nakalepo,Nakaohu,Nakapehu,Nakula,Napili,Niniau,Niumalu,Nuu,Ohia,Oloewa,Olowalu,Omaopio,Onau,Onouli,Opaeula,Opana,Opikoula,Paakea,Paeahu,Paehala,Paeohi,Pahoa,Paia,Pakakia,Pakala,Palauea,Palemo,Panaewa,Paniau,Papaaea,Papaanui,Papaauhau,Papahawahawa,Papaka,Papauluana,Pauku,Paunau,Pauwalu,Pauwela,Peahi,Piapia,Pohakanele,Pohoula,Polaiki,Polanui,Polapola,Polua,Poopoo,Popoiwi,Popoloa,Poponui,Poupouwela,Puaa,Puaaluu,Puahoowali,Puakea,Puako,Pualaea,Puehuehu,Puekahi,Pueokauiki,Pukaauhuhu,Pukalani,Pukuilua,Pulehu,Pulehuiki,Pulehunui,Punaluu,Puolua,Puou,Puuhaehae,Puuhaoa,Puuiki,Puuki,Puukohola,Puulani,Puumaneoneo,Puunau,Puunoa,Puuomaiai,Puuomaile,Uaoa,Uhao,Ukumehame,Ulaino,Ulumalu,Wahikuli,Waiahole,Waiakoa,Waianae,Waianu,Waiawa,Waiehu,Waieli,Waihee,Waikapu,Wailamoa,Wailaulau,Wailua,Wailuku,Wainee,Waiohole,Waiohonu,Waiohue,Waiohuli,Waiokama,Waiokila,Waiopai,Waiopua,Waipao,Waipio,Waipioiki,Waipionui,Waipouli,Wakiu,Wananalua"},
        {name: "Karnataka", i: 26, min: 5, max: 11, d: "tnl", m: 0, b: "Adityapatna,Adyar,Afzalpur,Aland,Alnavar,Alur,Ambikanagara,Anekal,Ankola,Annigeri,Arkalgud,Arsikere,Athni,Aurad,Badami,Bagalkot,Bagepalli,Bail,Bajpe,Bangalore,Bangarapet,Bankapura,Bannur,Bantval,Basavakalyan,Basavana,Belgaum,Beltangadi,Belur,Bhadravati,Bhalki,Bhatkal,Bhimarayanagudi,Bidar,Bijapur,Bilgi,Birur,Bommasandra,Byadgi,Challakere,Chamarajanagar,Channagiri,Channapatna,Channarayapatna,Chik,Chikmagalur,Chiknayakanhalli,Chikodi,Chincholi,Chintamani,Chitapur,Chitgoppa,Chitradurga,Dandeli,Dargajogihalli,Devadurga,Devanahalli,Dod,Donimalai,Gadag,Gajendragarh,Gangawati,Gauribidanur,Gokak,Gonikoppal,Gubbi,Gudibanda,Gulbarga,Guledgudda,Gundlupet,Gurmatkal,Haliyal,Hangal,Harapanahalli,Harihar,Hassan,Hatti,Haveri,Hebbagodi,Heggadadevankote,Hirekerur,Holalkere,Hole,Homnabad,Honavar,Honnali,Hoovina,Hosakote,Hosanagara,Hosdurga,Hospet,Hubli,Hukeri,Hungund,Hunsur,Ilkal,Indi,Jagalur,Jamkhandi,Jevargi,Jog,Kadigenahalli,Kadur,Kalghatgi,Kamalapuram,Kampli,Kanakapura,Karkal,Karwar,Khanapur,Kodiyal,Kolar,Kollegal,Konnur,Koppa,Koppal,Koratagere,Kotturu,Krishnarajanagara,Krishnarajasagara,Krishnarajpet,Kudchi,Kudligi,Kudremukh,Kumta,Kundapura,Kundgol,Kunigal,Kurgunta,Kushalnagar,Kushtagi,Lakshmeshwar,Lingsugur,Londa,Maddur,Madhugiri,Madikeri,Mahalingpur,Malavalli,Mallar,Malur,Mandya,Mangalore,Manvi,Molakalmuru,Mudalgi,Mudbidri,Muddebihal,Mudgal,Mudhol,Mudigere,Mulbagal,Mulgund,Mulki,Mulur,Mundargi,Mundgod,Munirabad,Mysore,Nagamangala,Nanjangud,Narasimharajapura,Naregal,Nargund,Navalgund,Nipani,Pandavapura,Pavagada,Piriyapatna,Pudu,Puttur,Rabkavi,Raichur,Ramanagaram,Ramdurg,Ranibennur,Raybag,Robertson,Ron,Sadalgi,Sagar,Sakleshpur,Saligram,Sandur,Sankeshwar,Saundatti,Savanur,Sedam,Shahabad,Shahpur,Shaktinagar,Shiggaon,Shikarpur,Shirhatti,Shorapur,Shrirangapattana,Siddapur,Sidlaghatta,Sindgi,Sindhnur,Sira,Siralkoppa,Sirsi,Siruguppa,Somvarpet,Sorab,Sringeri,Srinivaspur,Sulya,Talikota,Tarikere,Tekkalakote,Terdal,Thumbe,Tiptur,Tirthahalli,Tirumakudal,Tumkur,Turuvekere,Udupi,Vijayapura,Wadi,Yadgir,Yelandur,Yelbarga,Yellapur,Yenagudde"},
        {name: "Quechua", i: 27, min: 6, max: 12, d: "l", m: 0, b: "Altomisayoq,Ancash,Andahuaylas,Apachekta,Apachita,Apu ,Apurimac,Arequipa,Atahuallpa,Atawalpa,Atico,Ayacucho,Ayllu,Cajamarca,Carhuac,Carhuacatac,Cashan,Caullaraju,Caxamalca,Cayesh,Chacchapunta,Chacraraju,Champara,Chanchan,Chekiacraju,Chinchey,Chontah,Chopicalqui,Chucuito,Chuito,Chullo,Chumpi,Chuncho,Chuquiapo,Churup,Cochapata,Cojup,Collota,Conococha,Copa,Corihuayrachina,Cusichaca,Despacho,Haika,Hanpiq,Hatun,Haywarisqa,Huaca,Hualcan,Huamanga,Huamashraju,Huancarhuas,Huandoy,Huantsan,Huarmihuanusca,Huascaran,Huaylas,Huayllabamba,Huichajanca,Huinayhuayna,Huinioch,Illiasca,Intipunku,Ishinca,Jahuacocha,Jirishanca,Juli,Jurau,Kakananpunta,Kamasqa,Karpay,Kausay,Khuya ,Kuelap,Llaca,Llactapata,Llanganuco,Llaqta,Llupachayoc,Machu,Mallku,Matarraju,Mikhuy,Milluacocha,Munay,Ocshapalca,Ollantaytambo,Pacamayo,Paccharaju,Pachacamac,Pachakamaq,Pachakuteq,Pachakuti,Pachamama  ,Paititi,Pajaten,Palcaraju,Pampa,Panaka,Paqarina,Paqo,Parap,Paria,Patallacta,Phuyupatamarca,Pisac,Pongos,Pucahirca,Pucaranra,Puscanturpa,Putaca,Qawaq ,Qayqa,Qochamoqo,Qollana,Qorihuayrachina,Qorimoqo,Quenuaracra,Queshque,Quillcayhuanca,Quillya,Quitaracsa,Quitaraju,Qusqu,Rajucolta,Rajutakanan,Rajutuna,Ranrahirca,Ranrapalca,Raria,Rasac,Rimarima,Riobamba,Runkuracay,Rurec,Sacsa,Saiwa,Sarapo,Sayacmarca,Sinakara,TamboColorado,Tamboccocha,Taripaypacha,Taulliraju,Tawantinsuyu,Taytanchis,Tiwanaku,Tocllaraju,Tsacra,Tuco,Tullparaju,Tumbes,Ulta,Uruashraju,Vallunaraju,Vilcabamba,Wacho ,Wankawillka,Wayra,Yachay,Yahuarraju,Yanamarey,Yanesha,Yerupaja"},
        {name: "Swahili", i: 28, min: 4, max: 9, d: "", m: 0, b: "Abim,Adjumani,Alebtong,Amolatar,Amuria,Amuru,Apac,Arua,Arusha,Babati,Baragoi,Bombo,Budaka,Bugembe,Bugiri,Buikwe,Bukedea,Bukoba,Bukomansimbi,Bukungu,Buliisa,Bundibugyo,Bungoma,Busembatya,Bushenyi,Busia,Busia,Busolwe,Butaleja,Butambala,Butere,Buwenge,Buyende,Dadaab,Dodoma,Dokolo,Eldoret,Elegu,Emali,Embu,Entebbe,Garissa,Gede,Gulu,Handeni,Hima,Hoima,Hola,Ibanda,Iganga,Iringa,Isingiro,Isiolo,Jinja,Kaabong,Kabale,Kaberamaido,Kabuyanda,Kabwohe,Kagadi,Kahama,Kajiado,Kakamega,Kakinga,Kakira,Kakiri,Kakuma,Kalangala,Kaliro,Kalisizo,Kalongo,Kalungu,Kampala,Kamuli,Kamwenge,Kanoni,Kanungu,Kapchorwa,Kapenguria,Kasese,Kasulu,Katakwi,Kayunga,Kericho,Keroka,Kiambu,Kibaale,Kibaha,Kibingo,Kiboga,Kibwezi,Kigoma,Kihiihi,Kilifi,Kira,Kiruhura,Kiryandongo,Kisii,Kisoro,Kisumu,Kitale,Kitgum,Kitui,Koboko,Korogwe,Kotido,Kumi,Kyazanga,Kyegegwa,Kyenjojo,Kyotera,Lamu,Langata,Lindi,Lodwar,Lokichoggio,Londiani,Loyangalani,Lugazi,Lukaya,Luweero,Lwakhakha,Lwengo,Lyantonde,Machakos,Mafinga,Makambako,Makindu,Malaba,Malindi,Manafwa,Mandera,Maralal,Marsabit,Masaka,Masindi,MasindiPort,Masulita,Matugga,Mayuge,Mbale,Mbarara,Mbeya,Meru,Mitooma,Mityana,Mombasa,Morogoro,Moroto,Moshi,Moyale,Moyo,Mpanda,Mpigi,Mpondwe,Mtwara,Mubende,Mukono,Mumias,Muranga,Musoma,Mutomo,Mutukula,Mwanza,Nagongera,Nairobi,Naivasha,Nakapiripirit,Nakaseke,Nakasongola,Nakuru,Namanga,Namayingo,Namutumba,Nansana,Nanyuki,Narok,Naromoru,Nebbi,Ngora,Njeru,Njombe,Nkokonjeru,Ntungamo,Nyahururu,Nyeri,Oyam,Pader,Paidha,Pakwach,Pallisa,Rakai,Ruiru,Rukungiri,Rwimi,Sanga,Sembabule,Shimoni,Shinyanga,Singida,Sironko,Songea,Soroti,Ssabagabo,Sumbawanga,Tabora,Takaungu,Tanga,Thika,Tororo,Tunduma,Vihiga,Voi,Wajir,Wakiso,Watamu,Webuye,Wobulenzi,Wote,Wundanyi,Yumbe,Zanzibar"},
        {name: "Vietnamese", i: 29, min: 3, max: 12, d: "", m: 1, b: "An Khe,An Nhon,Ayun Pa,Ba Don,Ba Ria,Bac Giang,Bac Kan,Bac Lieu,Bac Ninh,Bao Loc,Ben Cat,Ben Tre,Bien Hoa,Bim Son,Binh Long,Binh Minh,Buon Ho,Buon Ma Thuot,Ca Mau,Cai Lay,Cam Pha,Cam Ranh,Can Tho,Cao Bang,Cao Lanh,Chau Doc,Chi Linh,Cua Lo,Da Lat,Da Nang,Di An,Dien Ban,Dien Bien Phu,Dong Ha,Dong Hoi,Dong Trieu,Duyen Hai,Gia Nghia,Gia Rai,Go Cong,Ha Giang,Ha Long,Ha Noi,Ha Tinh,Hai Duong,Hai Phong,Hoa Binh,Hoang Mai,Hoi An,Hong Linh,Hong Ngu,Hue,Hung Yen,Huong Thuy,Huong Tra,Kien Tuong,Kon Tum,Ky Anh,La Gi,Lai Chau,Lang Son,Lao Cai,Long Khanh,Long My,Long Xuyen,Mong Cai,Muong Lay,My Hao,My Tho,Nam Dinh,Nga Bay,Nga Nam,Nghia Lo,Nha Trang,Ninh Binh,Ninh Hoa,Phan Rang Thap Cham,Phan Thiet,Pho Yen,Phu Ly,Phu My,Phu Tho,Phuoc Long,Pleiku,Quang Ngai,Quang Tri,Quang Yen,Quy Nhon,Rach Gia,Sa Dec,Sam Son,Soc Trang,Son La,Son Tay,Song Cau,Song Cong,Tam Diep,Tam Ky,Tan An,Tan Chau,Tan Uyen,Tay Ninh,Thai Binh,Thai Hoa,Thai Nguyen,Thanh Hoa,Thu Dau Mot,Thuan An,Tra Vinh,Tu Son,Tuy Hoa,Tuyen Quang,Uong Bi,Vi Thanh,Viet Tri,Vinh,Vinh Chau,Vinh Long,Vinh Yen,Vung Tau,Yen Bai"},
        {name: "Cantonese", i: 30, min: 5, max: 11, d: "", m: 0, b: "Chaiwan,Chekham,Cheungshawan,Chingchung,Chinghoi,Chingsen,Chingshing,Chiunam,Chiuon,Chiuyeung,Chiyuen,Choihung,Chuehoi,Chuiman,Chungfa,Chungfu,Chungsan,Chunguktsuen,Dakhing,Daopo,Daumun,Dingwu,Dinpak,Donggun,Dongyuen,Duenchau,Fachau,Fado,Fanling,Fatgong,Fatshan,Fotan,Fuktien,Fumun,Funggong,Funghoi,Fungshun,Fungtei,Gamtin,Gochau,Goming,Gonghoi,Gongshing,Goyiu,Hanghau,Hangmei,Hashan,Hengfachuen,Hengon,Heungchau,Heunggong,Heungkiu,Hingning,Hohfuktong,Hoichue,Hoifung,Hoiping,Hokong,Hokshan,Homantin,Hotin,Hoyuen,Hunghom,Hungshuikiu,Jiuling,Kamping,Kamsheung,Kamwan,Kaulongtong,Keilun,Kinon,Kinsang,Kityeung,Kongmun,Kukgong,Kwaifong,Kwaihing,Kwongchau,Kwongling,Kwongming,Kwuntong,Laichikok,Laiking,Laiwan,Lamtei,Lamtin,Leitung,Leungking,Limkong,Linchau,Linnam,Linping,Linshan,Loding,Lokcheong,Lokfu,Lokmachau,Longchuen,Longgong,Longmun,Longping,Longwa,Longwu,Lowu,Luichau,Lukfung,Lukho,Lungmun,Macheung,Maliushui,Maonshan,Mauming,Maunam,Meifoo,Mingkum,Mogong,Mongkok,Muichau,Muigong,Muiyuen,Naiwai,Namcheong,Namhoi,Namhong,Namo,Namsha,Namshan,Nganwai,Ngchuen,Ngoumun,Ngwa,Nngautaukok,Onting,Pakwun,Paotoishan,Pingshan,Pingyuen,Poklo,Polam,Pongon,Poning,Potau,Puito,Punyue,Saiwanho,Saiyingpun,Samshing,Samshui,Samtsen,Samyuenlei,Sanfung,Sanhing,Sanhui,Sanwai,Sanwui,Seiwui,Shamshuipo,Shanmei,Shantau,Shatin,Shatinwai,Shaukeiwan,Shauking,Shekkipmei,Shekmun,Shekpai,Sheungshui,Shingkui,Shiuhing,Shundak,Shunyi,Shupinwai,Simshing,Siuhei,Siuhong,Siukwan,Siulun,Suikai,Taihing,Taikoo,Taipo,Taishuihang,Taiwai,Taiwo,Taiwohau,Tinhau,Tinho,Tinking,Tinshuiwai,Tiukengleng,Toishan,Tongfong,Tonglowan,Tsakyoochung,Tsamgong,Tsangshing,Tseungkwano,Tsihing,Tsimshatsui,Tsinggong,Tsingshantsuen,Tsingwun,Tsingyi,Tsingyuen,Tsiuchau,Tsuenshekshan,Tsuenwan,Tuenmun,Tungchung,Waichap,Waichau,Waidong,Wailoi,Waishing,Waiyeung,Wanchai,Wanfau,Wanon,Wanshing,Wingon,Wongchukhang,Wongpo,Wongtaisin,Woping,Wukaisha,Yano,Yaumatei,Yauoi,Yautong,Yenfa,Yeungchun,Yeungdong,Yeunggong,Yeungsai,Yeungshan,Yimtin,Yingdak,Yiuping,Yongshing,Yongyuen,Yuenlong,Yuenshing,Yuetsau,Yuknam,Yunping,Yuyuen"},
        {name: "Mongolian", i: 31, min: 5, max: 12, d: "aou", m: .3, b: "Adaatsag,Airag,Alag Erdene,Altai,Altanshiree,Altantsogts,Arbulag,Baatsagaan,Batnorov,Batshireet,Battsengel,Bayan Adarga,Bayan Agt,Bayanbulag,Bayandalai,Bayandun,Bayangovi,Bayanjargalan,Bayankhongor,Bayankhutag,Bayanlig,Bayanmonkh,Bayannuur,Bayan Ondor,Bayan Ovoo,Bayantal,Bayantsagaan,Bayantumen,Bayan Uul,Bayanzurkh,Berkh,Biger,Binder,Bogd,Bombogor,Bor Ondor,Bugat,Bulgan,Buregkhangai,Burentogtokh,Buutsagaan,Buyant,Chandmani,Chandmani Ondor,Choibalsan,Chuluunkhoroot,Chuluut,Dadal,Dalanjargalan,Dalanzadgad,Darkhan,Darvi,Dashbalbar,Dashinchilen,Delger,Delgerekh,Delgerkhaan,Delgerkhangai,Delgertsogt,Deluun,Deren,Dorgon,Duut,Erdene,Erdenebulgan,Erdeneburen,Erdenedalai,Erdenemandal,Erdenetsogt,Galshar,Galt,Galuut,Govi Ugtaal,Gurvan,Gurvanbulag,Gurvansaikhan,Gurvanzagal,Ikhkhet,Ikh Tamir,Ikh Uul,Jargalan,Jargalant,Jargaltkhaan,Jinst,Khairkhan,Khalhgol,Khaliun,Khanbogd,Khangai,Khangal,Khankh,Khankhongor,Khashaat,Khatanbulag,Khatgal,Kherlen,Khishig Ondor,Khokh,Kholonbuir,Khongor,Khotont,Khovd,Khovsgol,Khuld,Khureemaral,Khurmen,Khutag Ondor,Luus,Mandakh,Mandal Ovoo,Mankhan,Manlai,Matad,Mogod,Monkhkhairkhan,Moron,Most,Myangad,Nogoonnuur,Nomgon,Norovlin,Noyon,Ogii,Olgii,Olziit,Omnodelger,Ondorkhaan,Ondorshil,Ondor Ulaan,Orgon,Orkhon,Rashaant,Renchinlkhumbe,Sagsai,Saikhan,Saikhandulaan,Saikhan Ovoo,Sainshand,Saintsagaan,Selenge,Sergelen,Sevrei,Sharga,Sharyngol,Shine Ider,Shinejinst,Shiveegovi,Sumber,Taishir,Tarialan,Tariat,Teshig,Togrog,Tolbo,Tomorbulag,Tonkhil,Tosontsengel,Tsagaandelger,Tsagaannuur,Tsagaan Ovoo,Tsagaan Uur,Tsakhir,Tseel,Tsengel,Tsenkher,Tsenkhermandal,Tsetseg,Tsetserleg,Tsogt,Tsogt Ovoo,Tsogttsetsii,Tunel,Tuvshruulekh,Ulaanbadrakh,Ulaankhus,Ulaan Uul,Uyench,Yesonbulag,Zag,Zamyn Uud,Zereg"},
        // fantasy bases by Dopu:
        {name: "Human Generic", i: 32, min: 6, max: 11, d: "peolst", m: 0, b: "Grimegrove,Cliffshear,Eaglevein,Basinborn,Whalewich,Faypond,Pondshade,Earthfield,Dustwatch,Houndcall,Oakenbell,Wildwell,Direwallow,Springmire,Bayfrost,Fearwich,Ghostdale,Cursespell,Shadowvein,Freygrave,Freyshell,Tradewick,Grasswallow,Kilshell,Flatwall,Mosswind,Edgehaven,Newfalls,Flathand,Lostcairn,Grimeshore,Littleshade,Millstrand,Snowbay,Quickbell,Crystalrock,Snakewharf,Oldwall,Whitvalley,Stagport,Deadkeep,Claymond,Angelhand,Ebonhold,Shimmerrun,Honeywater,Gloomburn,Arrowburgh,Slyvein,Dawnforest,Dirtshield,Southbreak,Clayband,Oakenrun,Graypost,Deepcairn,Lagoonpass,Cavewharf,Thornhelm,Smoothwallow,Lightfront,Irongrave,Stonespell,Cavemeadow,Millbell,Shimmerwell,Eldermere,Roguehaven,Dogmeadow,Pondside,Springview,Embervault,Dryhost,Bouldermouth,Stormhand,Oakenfall,Clearguard,Lightvale,Freyshear,Flameguard,Bellcairn,Bridgeforest,Scorchwich,Mythgulch,Maplesummit,Mosshand,Iceholde,Knightlight,Dawnwater,Laststar,Westpoint,Goldbreach,Falsevale,Pinegarde,Shroudrock,Whitwharf,Autumnband,Oceanstar,Rosedale,Snowtown,Chillstrand,Saltmouth,Crystalsummit,Redband,Thorncairn,Beargarde,Pearlhaven,Lostward,Northpeak,Sandhill,Cliffgate,Sandminster,Cloudcrest,Mythshear,Dragonward,Coldholde,Knighttide,Boulderharbor,Faybarrow,Dawnpass,Pondtown,Timberside,Madfair,Crystalspire,Shademeadow,Dragonbreak,Castlecross,Dogwell,Caveport,Wildlight,Mudfront,Eldermere,Midholde,Ravenwall,Mosstide,Everborn,Lastmere,Dawncall,Autumnkeep,Oldwatch,Shimmerwood,Eldergate,Deerchill,Fallpoint,Silvergulch,Cavemire,Deerbrook,Pinepond,Ravenside,Thornyard,Scorchstall,Swiftwell,Roguereach,Cloudwood,Smoothtown,Kilhill,Ironhollow,Stillhall,Rustmore,Ragefair,Ghostward,Deadford,Smallmire,Barebreak,Westforest,Bonemouth,Evercoast,Sleekgulch,Neverfront,Lostshield,Icelight,Quickgulch,Brinepeak,Hollowstorm,Limeband,Basinmore,Steepmoor,Blackford,Stormtide,Wildyard,Wolfpass,Houndburn,Pondfalls,Pureshell,Silvercairn,Houndwallow,Dewmere,Fearpeak,Bellstall,Diredale,Crowgrove,Moongulf,Kilholde,Sungulf,Baremore,Bleakwatch,Farrun,Grimeshire,Roseborn,Heartford,Scorchpost,Cloudbay,Whitlight,Timberham,Cloudmouth,Curseminster,Basinfrost,Maplevein,Sungarde,Cloudstar,Bellport,Silkwich,Ragehall,Bellreach,Swampmaw,Snakemere,Highbourne,Goldyard,Lakemond,Shadeville,Mightmouth,Nevercrest,Pinemount,Claymouth,Rosereach,Oldreach,Brittlehelm,Heartfall,Bonegulch,Silkhollow,Crystalgulf,Mutewell,Flameside,Blackwatch,Greenwharf,Moonacre,Beachwick,Littleborough,Castlefair,Stoneguard,Nighthall,Cragbury,Swanwall,Littlehall,Mudford,Shadeforest,Mightglen,Millhand,Easthill,Amberglen,Nighthall,Cragbury,Swanwall,Littlehall,Mudford,Shadeforest,Mightglen,Millhand,Easthill,Amberglen,Smoothcliff,Lakecross,Quicklight,Eaglecall,Silentkeep,Dragonshear,Ebonfront,Oakenmeadow,Cliffshield,Stormhorn,Cavefell,Wildedenn,Earthgate,Brittlecall,Swangarde,Steamwallow,Demonfall,Sleethallow,Mossstar,Dragonhold,Smoothgrove,Sleetrun,Flamewell,Mistvault,Heartvault,Newborough,Deeppoint,Littlehold,Westshell,Caveminster,Swiftshade,Grimwood,Littlemire,Bridgefalls,Lastmere,Fayyard,Madham,Curseguard,Earthpass,Silkbrook,Winterview,Grimeborough,Dustcross,Dogcoast,Dirtstall,Oxlight,Pondstall,Sleetglen,Ghostpeak,Snowshield,Loststar,Chillwharf,Sleettide,Millgulch,Whiteshore,Sunmond,Moonwell,Grassdrift,Westmeadow,Crowvault,Everchill,Bearmire,Bronzegrasp,Oxbrook,Cursefield,Steammouth,Smoothham,Arrowdenn,Stillstrand,Mudwich"},
        {name: "Elven", i: 33, min: 6, max: 12, d: "lenmsrg", m: 0, b: "Adrindest,Aethel,Afranthemar,Aggar,Aiqua,Alari,Allanar,Allanbelle,Almalian,Alora,Alyanasari,Alyelona,Alyran,Amenalenora,Ammar,Amymabelle,Ancalen,AnhAlora,Anore,Anyndell,Arasari,Aren,Ashesari,Ashletheas,Ashmebel,Asrannore,Athelle,Aymlume,Baethei,Bel-Didhel,Belanore,Borethanil,Brinorion,Caelora,Chaggaust,Chaulssad,Chaundra,ChetarIthlin,Cyhmel,Cyla,Cyonore,Cyrangroth,Doladress,Dolarith,Dolasea,Dolonde,Dorthore,Dorwine,Draethe,Dranzan,Draugaust,Dreghei,Drelhei,Dryndlu,E'ana,E'ebel,Eahil,Edhil,Edraithion,Efho,Efranluma,Efvanore,Einyallond,Elathlume,Eld-Sinnocrin,Elddrinn,Elelthyr,Elheinn,Ellanalin,Ellena,Ellheserin,Ellnlin,Ellorthond,Elralara,Elstyr,Eltaesi,Elunore,Eman,EmneLenora,Emyel,Emyranserine,Enhethyr,Ennore,Entheas,Eriargond,Erranlenor,ErrarIthinn,Esari,Esath,Eserius,Eshsalin,Eshthalas,Esseavad,Esyana,EsyseAiqua,Evraland,Faellenor,Faladhell,Famelenora,Fethalas,Filranlean,Filsaqua,Formarion,Ferdor,Gafetheas,GafSerine,Gansari,Geliene,Gondorwin,Guallu,Haeth,Hanluna,Haulssad,Helatheas,Hellerien,Heloriath,Himlarien,Himliene,Hinnead,Hlaughei,Hlinas,Hloireenil,Hluihei,Hluitar,Hlurthei,Hlynead,Iaenarion,Ifrennoris,IllaAncalen,Illanathaes,Illfanora,Imlarlon,Imyfaluna,Imyse,Imyvelian,Inferius,Inhalon,Inllune,Inlurth,innsshe,Inransera,Iralserin,Irethtalos,Irholona,Ishal,Ishlashara,Isyenshara,Ithelion,Iymerius,Iaron,Iulil,Jaal,Jamkadi,Kaalume,Kaansera,Kalthalas,Karanthanil,Karnosea,Kasethyr,Keatheas,Kelsya,KethAiqua,Kmlon,Kyathlenor,Kyhasera,Lahetheas,Lammydr,Lefdorei,Lelhamelle,Lelon,Lenora,Lilean,Lindoress,Lindeenil,Lirillaquen,Litys,Llaughei,Llurthei,Lya,Lyenalon,Lyfa,Lylharion,Lylmhil,Lynathalas,Lir,Machei,Masenoris,Mathathlona,Mathethil,Mathntheas,Meethalas,Melelume,Menyamar,Menzithl,Minthyr,Mithlonde,Mornetheas,Mytha,Mythnserine,Mythsemelle,Mythsthas,Myvanas,Naahona,Nalore,NasadIlaurth,Nasin,Nathemar,Navethas,Neadar,Neanor,Neilon,Nelalon,Nellean,Nelnetaesi,Nfanor,Nilenathyr,Nionande,Nurtaleewe,Nylm,Nytenanas,Nythanlenor,Nythfelon,Nythodorei,Nytlenor,Nidiel,Noruiben,O'anlenora,O'lalona,Obeth,Ofaenathyr,Oflhone,Ollethlune,Ollmarion,Ollmnaes,Ollsmel,Olranlune,Olyaneas,Olynahil,Omanalon,Omyselon,Onelion,Onelond,Onylanor,Orlormel,Orlynn,Ormrion,Oshana,Oshmahona,Oshvamel,Raethei,Raineas,Rauguall,Rauthe,Rauthei,Reisera,Reslenora,Rrharrvhei,Ryanasera,Rymaserin,Sahnor,Saselune,Sel-Zedraazin,Selananor,Sellerion,Selmaluma,Serin,Serine,Shaeras,Shemnas,Shemserin,Sheosari,Sileltalos,Siriande,Siriathil,Sohona,Srannor,Sshanntyr,Sshaulssin,Sshaulu,Syholume,Sylharius,Sylranbel,Symdorei,Syranbel,Szoberr,Silon,Taesi,Thalas,Thalor,Thalore,Tharenlon,Tharlarast,Thelethlune,Thelhohil,Thelnora,Themar,Thene,Thilfalean,Thilnaenor,Thvethalas,Thylathlond,Tiregul,Tirion,Tlauven,Tlindhe,Ulal,Ullallanar,Ullmatalos,Ullve,Ulmetheas,Ulrenserine,Ulssin,Umnalin,Umye,Umyheserine,Unanneas,Unarith,Undraeth,Unysarion,Vel-Shonidor,Venas,Vinargothr,Waethe,Wasrion,Wlalean,Y'maqua,Yaeluma,Yeelume,Yele,Yethrion,Ymserine,Yueghed,Yuereth,Yuerran,Yuethin,Nandeedil,Olwen,Yridhremben"},
        {name: "Dark Elven", i: 34, min: 6, max: 14, d: "nrslamg", m: .2, b: "Abaethaggar,Abburth,Afranthemar,Aharasplit,Aidanat,Ald'ruhn,Ashamanu,Ashesari,Ashletheas,Baerario,Baereghel,Baethei,Bahashae,Balmora,Bel-Didhel,Borethanil,Buiyrandyn,Caellagith,Caellathala,Caergroth,Caldras,Chaggar,Chaggaust,Channtar,Charrvhel'raugaust,Chaulssin,Chaundra,ChedNasad,ChetarIthlin,ChethRrhinn,Chymaer,Clarkarond,Cloibbra,Commoragh,Cyrangroth,Cilben,D'eldarc,Daedhrog,Dalkyn,Do'Urden,Doladress,Dolarith,Dolonde,Draethe,Dranzan,Dranzithl,Draugaust,Dreghei,Drelhei,Dryndlu,Dusklyngh,DyonG'ennivalz,Edraithion,Eld-Sinnocrin,Ellorthond,Enhethyr,Entheas,ErrarIthinn,Eryndlyn,Faladhell,Faneadar,Fethalas,Filranlean,Formarion,Ferdor,Gafetheas,Ghrond,Gilranel,Glamordis,Gnaarmok,Gnisis,Golothaer,Gondorwin,Guallidurth,Guallu,Gulshin,Haeth,Haggraef,Harganeth,Harkaldra,Haulssad,Haundrauth,Heloriath,Hlammachar,Hlaughei,Hloireenil,Hluitar,Inferius,innsshe,Ithilaughym,Iz'aiogith,Jaal,Jhachalkhyn,Kaerabrae,Karanthanil,Karondkar,Karsoluthiyl,Kellyth,Khuul,Lahetheas,Lidurth,Lindeenil,Lirillaquen,LithMy'athar,LlurthDreier,Lolth,Lothuial,Luihaulen'tar,Maeralyn,Maerimydra,Mathathlona,Mathethil,Mellodona,Menagith,Menegwen,Menerrendil,Menzithl,Menzoberranzan,Mila-Nipal,Mithryn,Molagmar,Mundor,Myvanas,Naggarond,NasadIlaurth,Nauthor,Navethas,Neadar,Nurtaleewe,Nidiel,Noruiben,O'lalona,Obeth,Ofaenathyr,Orlormel,Orlytlar,Pelagiad,Raethei,Raugaust,Rauguall,Rilauven,Rrharrvhei,Sadrith,Sel-Zedraazin,Seydaneen,Shaz'rir,Skaal,Sschindylryn,Shamath,Shamenz,Shanntur,Sshanntynlan,Sshanntyr,Shaulssin,SzithMorcane,Szithlin,Szobaeth,Sirdhemben,T'lindhet,Tebh'zhor,Telmere,Telnarquel,Tharlarast,Thylathlond,Tlaughe,Trizex,Tyrybblyn,Ugauth,Ughym,Ullmatalos,Ulmetheas,Ulrenserine,Uluitur,Undraeth,Undraurth,Undrek'Thoz,Ungethal,UstNatha,V'elddrinnsshar,Vaajha,Vel-Shonidor,Velddra,Velothi,Venead,Vhalth'vha,Vinargothr,Vojha,Waethe,Waethei,Xaalkis,Yakaridan,Yeelume,Yuethin,Yuethindrynn,Zirnakaynin,Nandeedil,olwen,Uhaelben,Uthaessien,Yridhremben"},
        {name: "Dwarven", i: 35, min: 4, max: 11, d: "dk", m: 0, b: "Addundad,Ahagzad,Ahazil,Akil,Akzizad,Anumush,Araddush,Arar,Arbhur,Badushund,Baragzig,Baragzund,Barakinb,Barakzig,Barakzinb,Barakzir,Baramunz,Barazinb,Barazir,Bilgabar,Bilgatharb,Bilgathaz,Bilgila,Bilnaragz,Bilnulbar,Bilnulbun,Bizaddum,Bizaddush,Bizanarg,Bizaram,Bizinbiz,Biziram,Bunaram,Bundinar,Bundushol,Bundushund,Bundushur,Buzaram,Buzundab,Buzundush,Gabaragz,Gabaram,Gabilgab,Gabilgath,Gabizir,Gabunal,Gabunul,Gabuzan,Gatharam,Gatharbhur,Gathizdum,Gathuragz,Gathuraz,Gila,Giledzir,Gilukkhath,Gilukkhel,Gunala,Gunargath,Gunargil,Gundumunz,Gundusharb,Gundushizd,Kharbharbiln,Kharbhatharb,Kharbhela,Kharbilgab,Kharbuzadd,Khatharbar,Khathizdin,Khathundush,Khazanar,Khazinbund,Khaziragz,Khaziraz,Khizdabun,Khizdusharbh,Khizdushath,Khizdushel,Khizdushur,Kholedzar,Khundabiln,Khundabuz,Khundinarg,Khundushel,Khuragzig,Khuramunz,Kibarak,Kibilnal,Kibizar,Kibunarg,Kibundin,Kibuzan,Kinbadab,Kinbaragz,Kinbarakz,Kinbaram,Kinbizah,Kinbuzar,Nala,Naledzar,Naledzig,Naledzinb,Naragzah,Naragzar,Naragzig,Narakzah,Narakzar,Naramunz,Narazar,Nargabad,Nargabar,Nargatharb,Nargila,Nargundum,Nargundush,Nargunul,Narukthar,Narukthel,Nula,Nulbadush,Nulbaram,Nulbilnarg,Nulbunal,Nulbundab,Nulbundin,Nulbundum,Nulbuzah,Nuledzah,Nuledzig,Nulukkhaz,Nulukkhund,Nulukkhur,Sharakinb,Sharakzar,Sharamunz,Sharbarukth,Shatharbhizd,Shatharbiz,Shathazah,Shathizdush,Shathola,Shaziragz,Shizdinar,Shizdushund,Sholukkharb,Shundinulb,Shundushund,Shurakzund,Shuramunz,Tumunzadd,Tumunzan,Tumunzar,Tumunzinb,Tumunzir,Ukthad,Ulbirad,Ulbirar,Ulunzar,Ulur,Umunzad,Undalar,Undukkhil,Undun,Undur,Unduzur,Unzar,Unzathun,Usharar,Zaddinarg,Zaddushur,Zaharbad,Zaharbhizd,Zarakib,Zarakzar,Zaramunz,Zarukthel,Zinbarukth,Zirakinb,Zirakzir,Ziramunz,Ziruktharbh,Zirukthur,Zundumunz"},
        {name: "Goblin", i: 36, min: 4, max: 9, d: "eag", m: 0, b: "Crild,Cielb,Srurd,Fruict,Xurx,Crekork,Strytzakt,Ialsirt,Gnoklig,Kleardeek,Gobbledak,Thelt,Swaxi,Ulm,Shaxi,Thult,Jasheafta,Kleabtong,Bhiagielt,Kuipuinx,Hiszils,Nilbog,Gneabs,Stiolx,Esz,Honk,Veekz,Vohniots,Bratliaq,Slehzit,Diervaq,Zriokots,Buyagh,Treaq,Phax,Ilm,Blus,Srefs,Biokvish,Gigganqi,Watvielx,Katmelt,Slofboif,gobbok,Klilm,Blix,Qosx,Fygsee,Moft,Asinx,Joimtoilm,Styrzangai,Prolkeh,Stioskurt,Mogg,Cel,Far,Rekx,Chalk,Paas,Brybsil,Utiarm,Eebligz,Iahzaarm,Stuikvact,Gobbrin,Ish,Suirx,Utha,Taxai,Onq,Stiaggaltia,Dobruing,Breshass,Cosvil,Traglila,Felhob,Hobgar,Preang,Sios,Wruilt,Chox,Pyreazzi,Glamzofs,Froihiofz,Givzieqee,Vreagaald,Bugbig,Kluirm,Ulb,Driord,Stroir,Croibieq,Bridvelb,Wrogdilk,Slukex,Ozbiard,Gagablin,Heszai,Kass,Chiafzia,Thresxea,Een,Oimzoishai,Enissee,Glernaahx,Qeerags,Phigheldai,Ziggek"},
        {name: "Orc", i: 37, min: 4, max: 8, d: "gzrcu", m: 0, b: "ModhOdod,BodRugniz,Rildral,Zalbrez,Bebugh,Grurro,Ibruzzed,Goccogmurd,CheganKhed,BedgezGraz,IkhUgnan,NoGolkon,Dhezza,Chuccuz,Dribor,Khezdrugh,Uzdriboz,Nolgazgredh,KrogvurOz,ZrucraBi,ErLigvug,OkhUggekh,Vrobrun,Raggird,Adgoz,Chugga,Ghagrocroz,Khuldrerradh,IrmekhBhor,KuzgrurdDedh,ZunBergrord,AdhKhorkol,Alzokh,Mubror,Bozdra,Brugroz,Nuzecro,Qidzodkakh,GharedKrin,OrkudhBhur,EkhKrerdrugh,KrarZurmurd,Nuccag,Rezegh,Lorgran,Grergran,Nadguggez,Mocculdrer,BrorkrilZrog,RurguzVig,CharRodkeg,UghBhelgag,Zulbriz,Rodrekh,Erbragh,Bhicrur,Arkugzo,Arrordri,MiccolBurd,OddighKrodh,UghVruron,VrughNardrer,Dhoddud,Murmad,Chuzar,Vrazin,Ridgozedh,Lazzogno,MughakhChil,VrolburNur,KrighBhurdin,GhadhDrurzan,Adran,Chazgro,Krorgrug,Grodzakh,Ugrudraz,Iggulzaz,KudrukhLi,QuccuBan,GrighKaggaz,ArdGrughokh,Zolbred,Drozgrir,Agkadh,Zuggedh,Lulkore,Dhulbazzol,DhazonNer,ZrazzuzVaz,BrurKorre,EkhMezred,Vaddog,Drirdradh,Qashnagh,Arad,Zadarord,Khorbriccord,NelzorZroz,DruccoRad,DhodhBrerdrodh,BhakhZradgukh,Qirrer,Uzord,Bulbredh,Khuzdraz,Churgrorgadh,Legvicrodh,GazdrakhVrard,VagordKhod,GidhUcceg,BhogKirgol,Brogved,Aga,Kudzal,Brolzug,Ughudadh,Noshnogradh,ZubodUr,ZrulbukhDekh,ReVurkog,RoghChirzaz,Kharkiz,Bhogug,Bozziz,Vuccidh,Ruddirgrad,Zordrordud,GrirkrunQur,IbulBrad,AdAdzurd,GaghDruzred,Acran,Morbraz,Drurgin,Chogidh,Nogvolkar,Uzaggor,KazzuzZrar,ArrulChukh,DiChudun,GhoUgnud,Uzron,Uzdroz,Gholgard,Zragmukh,Qiddolzog,Reradgri,QiccadChal,NubudId,ZrardKrodog,KrudhKhogzokh,Vizdrun,Orrad,Darmon,Ulkin,Zigmorbredh,Bizzadurd,MuccugGhuz,MabraghBhard,DurKhaddol,BheghGegnod,Qazzudh,Drobagh,Zorrudh,Dodkakh,Gribrabrokh,Quggidkad,DududhAkh,DrizdedhAd,GhordBhozdrokh,ZadEzzedh,Larud,Ashnedh,Gridkog,Qirzodh,Bhirgoshbel,Ghirmarokh,ArizDru,AgzilGhal,DrodhAshnugh,UghErrod,Lugekh,Buccel,Rarurd,Verrugh,Qommorbrord,Bagzildre,NazadLudh,IbaghChol,GrazKhulgag,QigKrorkodh,Rozzez,Koggodh,Ruzgrin,Zrigud,Zragrizgrakh,Irdrelzug,VrurzarMol,KezulBruz,GurGhogkagh,KigRadkodh,Ulgor,Kroddadh,Eldrird,Bozgrun,Digzagkigh,Azrurdrekh,KhuzdordDugh,DhurkighGrer,MeGheggor,KoGerkradh,Bashnud,Nirdrukh,Adog,Egmod,Vruzzegvukh,Nagrubagh,DugkegVuz,MorkirZrudh,NudhKuldra,DhodhGhigin,Graldrodh,Rero,Merkraz,Ummo,Largraragh,Brordeggeg,UldrukhBhudh,DregvekhOg,GughZozgrod,GhidZrogiz,Khebun,Ordol,Ghadag,Dredagh,Bhiccozdur,Chizeril,KarkorZrid,EmmanMaz,LiBogzel,EkhBeccon,Dashnukh,Kacruz,Krummel,Dirdrurd,Khalbammedh,Dhizdrermodh,GharuZrug,BhurkrukhLen,ZuZredzokh,BralLazogh,Velgrudh,Dorgri,Irbraz,Udral,Bigkurel,Zarralkod,DhoggunBhogh,AdgrilGha,DrukhQodgoz,KaNube,Vrurgu,Mazgar,Lalga,Bolkan,Kudgroccukh,Zraldrozzuz,VorordUz,ZacradLe,BrukhZrabrul,GagDrugmag,Kraghird,Bhummagh,Brazadh,Kalbrugh,Brogzozir,Mugmodror,RezgrughErd,UmmughEkh,GuNuccul,VunGaghukh,Ghizgil,Arbran,Bulgragh,Negvidh,Girodgrurd,Ghedgrolbrol,DrogvukhDrodh,DhalgronMog,MulDhazzug,ChazCharard,Drurkuz,Niddeg,Bagguz,Ogkal,Rordrushnokh,Gorkozzil,KorkrirGrar,RigaghZrad"},
        {name: "Giant", i: 38, min: 5, max: 10, d: "kdtng", m: 0, b: "Kostand,Throtrek,Solfod,Shurakzund,Heimfara,Anumush,Dulkun,Sigbeorn,Velhera,Glumvat,Khundinarg,Shathizdush,Baramunz,Nargunul,Magald,Noluch,Yotane,Tumunzar,Giledzir,Nurkel,Khizdabun,Yudgor,Hartreo,Galfald,Vigkan,Kibarak,Girkun,Gomruch,Guddud,Darnaric,Botharic,Gunargath,Oldstin,Rizen,Marbold,Nargundush,Hargarth,Kengord,Maerdis,Brerstin,Sigbi,Zigez,Umunzad,Nelkun,Yili,Usharar,Ranhera,Mistoch,Nuledzah,Nulbilnarg,Nulukkhur,Tulkug,Kigine,Marbrand,Gagkake,Khathizdin,Geru,Nagu,Grimor,Kaltoch,Koril,Druguk,Khatharbar,Debuch,Eraddam,Neliz,Brozu,Morluch,Enuz,Gatal,Beratira,Gurkale,Gluthmark,Iora,Tozage,Agane,Kegkez,Nuledzig,Bahourg,Jornangar,Kilfond,Dankuc,Rurki,Eldond,Barakzig,Olane,Gostuz,Grimtira,Brildung,Nulbaram,Nargabar,Narazar,Natan,oci,Khaziragz,Gabuzan,Orga,Addundad,Yulkake,Nulukkhaz,Bundushund,Guril,Barakinb,Sadgach,Vylwed,Vozig,Hildlaug,Chergun,Dagdhor,Kibizar,Shundushund,Mornkin,Jaldhor,inez,Lingarth,Churtec,Naragzah,Gabizir,Zugke,Ranava,Minu,Barazinb,Fynwyn,Talkale,Widhyrde,Sidga,Velfirth,Varkud,Shathola,Duhal,Srokvan,Guruge,Lindira,Rannerg,Kilkan,Gudgiz,Baragzund,Aerora,Inginy,Kharbharbiln,Theoddan,Rirkan,Undukkhil,Borgbert,Dina,Gortho,Kinbuzar,Kuzake,Drard,Gorkege,Nargatharb,Diru,Shatharbiz,Sgandrol,Sharakzar,Barakzinb,Dinez,Jarwar,Khizdushel,Wylaeya,Khazanar,Beornelde,Arangrim,Sholukkharb,Stighere,Gulwo,Irkin,Jornmoth,Gundusharb,Gabaram,Shizdinar,Memron,Guzi,Naramunz,Morntaric,Somrud,Norginny,Bremrol,Rurkoc,Zugkan,Vorkige,Kinbadab,Gila,Sulduch,Natil,Idgurth,Gabaragz,Tolkeg,Eradhelm,Dugfast,Froththorn,Galgrim,Theodgrim,Valdhere,Gazin,Tigkiz,Burthug,Chazruc,Kakkek,Toren"},
        {name: "Draconic", i: 39, min: 6, max: 14, d: "aliuszrox", m: 0, b: "Aaronarra,Adalon,Adamarondor,Aeglyl,Aerosclughpalar,Aghazstamn,Aglaraerose,Agoshyrvor,Alduin,Alhazmabad,Altagos,Ammaratha,Amrennathed,Anaglathos,Andrathanach,Araemra,Araugauthos,Arauthator,Arharzel,Arngalor,Arveiaturace,Athauglas,Augaurath,Auntyrlothtor,Azarvilandral,Azhaq,Balagos,Baratathlaer,Bleucorundum,BrazzPolis,Canthraxis,Capnolithyl,Charvekkanathor,Chellewis,Chelnadatilar,Cirrothamalan,Claugiyliamatar,Cragnortherma,Dargentum,Dendeirmerdammarar,Dheubpurcwenpyl,Domborcojh,Draconobalen,Dragansalor,Dupretiskava,Durnehviir,Eacoathildarandus,Eldrisithain,Enixtryx,Eormennoth,Esmerandanna,Evenaelorathos,Faenphaele,Felgolos,Felrivenser,Firkraag,Fll'Yissetat,Furlinastis,Galadaeros,Galglentor,Garnetallisar,Garthammus,Gaulauntyr,Ghaulantatra,Glouroth,Greshrukk,Guyanothaz,Haerinvureem,Haklashara,Halagaster,Halaglathgar,Havarlan,Heltipyre,Hethcypressarvil,Hoondarrh,Icehauptannarthanyx,Iiurrendeem,Ileuthra,Iltharagh,Ingeloakastimizilian,Irdrithkryn,Ishenalyr,Iymrith,Jaerlethket,Jalanvaloss,Jhannexydofalamarne,Jharakkan,Kasidikal,Kastrandrethilian,Khavalanoth,Khuralosothantar,Kisonraathiisar,Kissethkashaan,Kistarianth,Klauth,Klithalrundrar,Krashos,Kreston,Kriionfanthicus,Krosulhah,Krustalanos,Kruziikrel,Kuldrak,Lareth,Latovenomer,Lhammaruntosz,Llimark,Ma'fel'no'sei'kedeh'naar,MaelestorRex,Magarovallanthanz,Mahatnartorian,Mahrlee,Malaeragoth,Malagarthaul,Malazan,Maldraedior,Maldrithor,MalekSalerno,Maughrysear,Mejas,Meliordianix,Merah,Mikkaalgensis,Mirmulnir,Mistinarperadnacles,Miteach,Mithbarazak,Morueme,Moruharzel,Naaslaarum,Nahagliiv,Nalavarauthatoryl,Naxorlytaalsxar,Nevalarich,Nolalothcaragascint,Nurvureem,Nymmurh,Odahviing,Olothontor,Ormalagos,Otaaryliakkarnos,Paarthurnax,Pelath,Pelendralaar,Praelorisstan,Praxasalandos,Protanther,Qiminstiir,Quelindritar,Ralionate,Rathalylaug,Rathguul,Rauglothgor,Raumorthadar,Relonikiv,Ringreemeralxoth,Roraurim,Ruuthundrarar,Rylatar'ralah'tyma,Rynnarvyx,Sablaxaahl,Sahloknir,Sahrotaar,Samdralyrion,Saryndalaghlothtor,Sawaka,Shalamalauth,Shammagar,Sharndrel,Shianax,Skarlthoon,Skurge,Smergadas,Ssalangan,Sssurist,Sussethilasis,Sylvallitham,Tamarand,Tantlevgithus,Taraunramorlamurla,Tarlacoal,Tenaarlaktor,Thalagyrt,Tharas'kalagram,Thauglorimorgorus,Thoklastees,Thyka,Tsenshivah,Ueurwen,Uinnessivar,Urnalithorgathla,Velcuthimmorhar,Velora,Vendrathdammarar,Venomindhar,Viinturuth,Voaraghamanthar,Voslaarum,Vr'tark,Vrondahorevos,Vuljotnaak,Vulthuryol,Wastirek,Worlathaugh,Xargithorvar,Xavarathimius,Yemere,Ylithargathril,Ylveraasahlisar,Za-Jikku,Zarlandris,Zellenesterex,Zilanthar,Zormapalearath,Zundaerazylym,Zz'Pzora"},
        {name: "Arachnid", i: 40, min: 4, max: 10, d: "erlsk", m: 0, b: "Aaqok'ser,Acah,Aiced,Aisi,Aizachis,Allinqel,As'taq,Ashrash,Caaqtos,Caq'zux,Ceek'sax,Ceezuq,Cek'siereel,Cen'qi,Ceqru,Ceqzocer,Cezeed,Chachocaq,Charis,Chashar,Chashilieth,Checib,Chen'qal,Chernul,Cherzoq,Chezi,Chiazu,Chikoqal,Chishros,Chixhi,Chizhi,Chizoser,Chollash,Choq'sha,Chouk'rix,Cinchichail,Collul,Ecush'taid,Eenqachal,Ekiqe,El'zos,El'zur,Ellu,Eq'tur,Eqa,Eqas,Er'uria,Erikas,Ertu,Es'tase,Esrub,Evirrot,Exha,Haqsho,Heekath,Hiavheesh,Hitha,Hok'thi,Hossa,Iacid,Iciever,Ik'si,Illuq,Iri,Isicer,Isnir,Ivrid,Kaalzux,Keezut,Kheellavas,Kheizoh,Khellinqesh,Khiachod,Khika,Khinchi,Khirzur,Khivila,Khonrud,Khontid,Khosi,Khrakku,Khraqshis,Khrerrith,Khrethish'ti,Khriashus,Khrika,Khrirni,Khrocoqshesh,Klashirel,Klassa,Kleil'sha,Kliakis,Klishuth,Klith'osha,Krarnit,Kras'tex,Kreelzi,Krivas,Krotieqas,Laco,Lairta,Lais'tid,Laizuh,Lasnoth,Lekkol,Len'qeer,Leqanches,Lezad,Lhezsi,Lhilir,Lhivhath,Lhok'thu,Lialliesed,Liaraq,Liarisriq,Liceva,Lichorro,Lilla,Livorzish,Lokieqib,Nakar,Nakur,Naros,Natha,Necuk'saih,Neerhaca,Neet'er,Neezoh,Nenchiled,Nerhalneth,Nir'ih,Nizus,Noreeqo,Novalsher,On'qix,Qailloncho,Qak'sovo,Qalitho,Qartori,Qas'tor,Qasol,Qavrud,Qavud,Qazar,Qazieveq,Qazru,Qeik'thoth,Qekno,Qeqravee,Qes'tor,Qhaaviq,Qhaik'sal,Qhak'sish,Qhazsakais,Qhechorte,Qheliva,Qhenchaqes,Qherazal,Qhesoh,Qhiallud,Qhon'qos,Qhoshielleed,Qish'tur,Qisih,Qollal,Qorhoci,Qouxet,Qranchiq,Racith,Rak'zes,Ranchis,Rarhie,Rarzi,Rarzisiaq,Ras'tih,Ravosho,Recad,Rekid,Relshacash,Reqishee,Rernee,Rertachis,Rezhokketh,Reziel,Rhacish,Rhail'shel,Rhairhizse,Rhakivex,Rhaqeer,Rhartix,Rheciezsei,Rheevid,Rhel'shir,Rhetovraix,Rhevhie,Rhialzub,Rhiavekot,Rhikkos,Rhiqese,Rhiqi,Rhiqracar,Rhisned,Rhokno,Rhousnateb,Rhouvaqid,Riakeesnex,Rik'sid,Rintachal,Rir'ul,Rorrucis,Rosharhir,Rourk'u,Rouzakri,Sailiqei,Sanchiqed,Sanqad,Saqshu,Sat'ier,Sazi,Seiqas,Shieth'i,Shiqsheh,Shizha,Shrachuvo,Shranqo,Shravhos,Shravuth,Shreerhod,Shrethuh,Shriantieth,Shronqash,Shrovarhir,Shrozih,Siacaqoh,Siezosh,Silrul,Siq'sha,Sirro,Sornosi,Srachussi,Sreqrud,Srirnukaaq,Szaca,Szacih,Szaqova,Szasu,Szazhilos,Szeerrud,Szeezsad,Szeknur,Szesir,Szet'as,Szetirrar,Szezhirros,Szilshith,Szon'qol,Szornuq,Xaax'uq,Xeekke,Xosax,Yaconchi,Yacozses,Yazrer,Yeek'su,Yeeq'zox,Yeqil,Yeqroq,Yeveed,Yevied,Yicaveeh,Yirresh,Yisie,Yithik'thaih,Yorhaqshes,Zacheek'sa,Zakkasa,Zaqi,Zelraq,Zeqo,Zhaivoq,Zharuncho,Zhath'arhish,Zhavirrit,Zhazilraq,Zhazot,Zhazsachiel,Zhek'tha,Zhequ,Zhias'ted,Zhicat,Zhicur,Zhiese,Zhirhacil,Zhizri,Zhochizses,Zhorkir,Ziarih,Zirnib,Zis'teq,Zivezeh"},
        {name: "Serpents", i: 41, min: 5, max: 11, d: "slrk", m: 0, b: "Aj'ha,Aj'i,Aj'tiss,Ajakess,Aksas,Aksiss,Al'en,An'jeshe,Apjige,Arkkess,Athaz,Atus,Azras,Caji,Cakrasar,Cal'arrun,Capji,Cathras,Cej'han,Ces,Cez'jenta,Cij'te,Cinash,Cizran,Coth'jus,Cothrash,Culzanek,Cunaless,Ej'tesh,Elzazash,Ergek,Eshjuk,Ethris,Gan'jas,Gapja,Gar'thituph,Gopjeguss,Gor'thesh,Gragishaph,Grar'theness,Grath'ji,Gressinas,Grolzesh,Grorjar,Grozrash,Guj'ika,Harji,Hej'hez,Herkush,Horgarrez,Illuph,Ipjar,Ithashin,Kaj'ess,Kar'kash,Kepjusha,Ki'kintus,Kissere,Koph,Kopjess,Kra'kasher,Krak,Krapjez,Krashjuless,Kraz'ji,Krirrigis,Krussin,Ma'lush,Mage,Maj'tak,Mal'a,Mapja,Mar'kash,Mar'kis,Marjin,Mas,Mathan,Men'jas,Meth'jaresh,Mij'hegak,Min'jash,Mith'jas,Monassu,Moss,Naj'hass,Najugash,Nak,Napjiph,Nar'ka,Nar'thuss,Narrusha,Nash,Nashjekez,Nataph,Nij'ass,Nij'tessiph,Nishjiss,Norkkuss,Nus,Olluruss,Or'thi,Or'thuss,Paj'a,Parkka,Pas,Pathujen,Paz'jaz,Pepjerras,Pirkkanar,Pituk,Porjunek,Pu'ke,Ragen,Ran'jess,Rargush,Razjuph,Rilzan,Riss,Rithruz,Rorgiss,Rossez,Rraj'asesh,Rraj'tass,Rrar'kess,Rrar'thuph,Rras,Rrazresh,Rrej'hish,Rrigelash,Rris,Rris,Rroksurrush,Rukrussush,Rurri,Russa,Ruth'jes,Sa'kitesh,Sar'thass,Sarjas,Sazjuzush,Ser'thez,Sezrass,Shajas,Shas,Shashja,Shass,Shetesh,Shijek,Shun'jaler,Shurjarri,Skaler,Skalla,Skallentas,Skaph,Skar'kerriz,Skath'jeruk,Sker'kalas,Skor,Skoz'ji,Sku'lu,Skuph,Skur'thur,Slalli,Slalt'har,Slelziress,Slil'ar,Sloz'jisa,Sojesh,Solle,Sorge,Sral'e,Sran'ji,Srapjess,Srar'thazur,Srash,Srath'jess,Srathrarre,Srerkkash,Srus,Sruss'tugeph,Sun,Suss'tir,Uzrash,Vargush,Vek,Vess'tu,Viph,Vult'ha,Vupjer,Vushjesash,Xagez,Xassa,Xulzessu,Zaj'tiss,Zan'jer,Zarriss,Zassegus,Zirres,Zsor,Zurjass"}
      ];
    };
  
    return {getBase, getCulture, getCultureShort, getBaseShort, getState, updateChain, clearChains, getNameBases, getMapName, calculateChain};
  })();
  

// apply drop-down menu option. If the value is not in options, add it
applyOption(select, id, name = id) {
  const custom = !Array.from(select.options).some((o:any) => o.value == id);
  if (custom) select.options.add(new Option(name, id));
  select.value = id;
}
  loadMapFromURL = (maplink, random) => {
    const URL = decodeURIComponent(maplink);
  
    fetch(URL, {method: "GET", mode: "cors"})
      .then(response => {
        if (response.ok) return response.blob();
        throw new Error("Cannot load map from URL");
      })
      .then(blob => this.uploadMap(blob,null))
      .catch(error => {
        this.showUploadErrorMessage(error.message, URL, random);
        // if (random) this.generateMapOnLoad();
      });
  }
  
  showUploadErrorMessage = (error, URL, random) => {
    console.error(error);
    // alertMessage.innerHTML = `Cannot load map from the ${link(URL, "link provided")}.
    //   ${random ? `A new random map is generated. ` : ""}
    //   Please ensure the linked file is reachable and CORS is allowed on server side`;
    // $("#alert").dialog({
    //   title: "Loading error",
    //   width: "32em",
    //   buttons: {
    //     OK: function () {
    //       $(this).dialog("close");
    //     }
    //   }
    // });
  }
  
  uploadMap = (file, callback) => {
    const OLDEST_SUPPORTED_VERSION = 0.7;
  
    const fileReader = new FileReader();
    fileReader.onload = (fileLoadedEvent) => {
      if (callback) callback();
      document.getElementById("coas").innerHTML = ""; // remove auto-generated emblems
      const result = fileLoadedEvent.target.result;
      const [mapData, mapVersion] = this.parseLoadedResult(result);
  
      const isInvalid = !mapData || isNaN(mapVersion) || mapData.length < 26 || !mapData[5];
  
      if (isInvalid) return this.showUploadMessage("invalid", mapData, mapVersion);
      return this.parseLoadedData(mapData);
    };
  console.log("fileReader");
    fileReader.readAsText(file, "UTF-8");
  }
  
  parseLoadedResult = (result) => {
    try {
      // data can be in FMG internal format or base64 encoded
      const isDelimited = result.substr(0, 10).includes("|");
      const decoded = isDelimited ? result : decodeURIComponent(atob(result));
      const mapData = decoded.split("\r\n");
      const mapVersion = parseFloat(mapData[0].split("|")[0] || mapData[0]);
      return [mapData, mapVersion];
    } catch (error) {
      console.error(error);
      return [null, null];
    }
  }
  
  showUploadMessage = (type, mapData, mapVersion) => {
    let message, title, canBeLoaded;
  
    if (type === "invalid") {
      message = `The file does not look like a valid <i>.map</i> file.<br>Please check the data format`;
      title = "Invalid file";
      canBeLoaded = false;
    }
  
    // alertMessage.innerHTML = message;
    // const buttons = {
    //   OK: function () {
    //     $(this).dialog("close");
    //     if (canBeLoaded) parseLoadedData(mapData);
    //   }
    // };
    // $("#alert").dialog({title, buttons});
  }
  
  parseLoadedData = (data) => {
    try {
      // exit customization
      this.customization = 0;
  
      const reliefIcons = document.getElementById("defs-relief").innerHTML; // save relief icons
      // const hatching = document.getElementById("hatching").cloneNode(true); // save hatching
  
        const params = data[0].split("|");
        if (params[3]) {
          this.seed = params[3];
          // this.optionsSeed.value = this.seed;
        }
        if (params[4]) this.graphWidth = +params[4];
        if (params[5]) this.graphHeight = +params[5];
        this.mapId = params[6] ? +params[6] : Date.now();
  
      // console.group("Loaded Map " + seed);
  
        const settings = data[1].split("|");
        // if (settings[0]) this.applyOption(this.distanceUnitInput, settings[0]);
        if (settings[1]) this.distanceScaleInput = settings[1];
        // if (settings[2]) this.areaUnit.value = settings[2];
        // if (settings[3]) this.applyOption(this.heightUnit, settings[3]);
        if (settings[4]) this.heightExponentInput = settings[4];
        if (settings[5]) this.temperatureScale = settings[5];
        if (settings[6]) this.barSizeInput = settings[6];
        if (settings[7] !== undefined) this.barLabel = settings[7];
        if (settings[8] !== undefined) this.barBackOpacity = settings[8];
        if (settings[9]) this.barBackColor = settings[9];
        if (settings[10]) this.barPosX = settings[10];
        if (settings[11]) this.barPosY = settings[11];
        if (settings[12]) this.populationRate = settings[12];
        if (settings[13]) this.urbanization = settings[13];
        // if (settings[14]) this.mapSizeInput.value = this.mapSizeOutput.value = Math.max(Math.min(settings[14], 100), 1);
        // if (settings[15]) this.latitudeInput.value = this.latitudeOutput.value = Math.max(Math.min(settings[15], 100), 0);
        // if (settings[16]) this.temperatureEquatorInput.value = this.temperatureEquatorOutput.value = settings[16];
        // if (settings[17]) this.temperaturePoleInput.value = this.temperaturePoleOutput.value = settings[17];
        // if (settings[18]) this.precInput.value = this.precOutput.value = settings[18];
        if (settings[19]) this.options = JSON.parse(settings[19]);
        if (settings[20]) this.mapName = settings[20];
        // if (settings[21]) this.hideLabels.checked = +settings[21];
        // if (settings[22]) this.stylePreset.value = settings[22];
        // if (settings[23]) this.rescaleLabels.checked = settings[23];
  
        if (data[2]) this.mapCoordinates = JSON.parse(data[2]);
        if (data[4]) this.notes = JSON.parse(data[4]);


          // v 1.61 changed rulers data
          this.ruler.style("display", null);
          this.rulers = new Rulers();
          let rulers = this.rulers;


        if (data[33]) this.rulers.fromString(data[33]);
        if (data[34]) {
          const usedFonts = JSON.parse(data[34]);
          usedFonts.forEach(usedFont => {
            const {family: usedFamily, unicodeRange: usedRange, variant: usedVariant} = usedFont;
            const defaultFont = this.fonts.find(({family, unicodeRange, variant}) => family === usedFamily && unicodeRange === usedRange && variant === usedVariant);
            if (!defaultFont) this.fonts.push(usedFont);
            this.declareFont(usedFont);
          });
        }
  
        this.biomes = data[3].split("|");
        this.biomesData = this.applyDefaultBiomesSystem();
        this.biomesData.color = this.biomes[0].split(",");
        this.biomesData.habitability = this.biomes[1].split(",").map(h => +h);
        this.biomesData.name = this.biomes[2].split(",");
  
        // push custom biomes if any
        for (let i = this.biomesData.i.length; i < this.biomesData.name.length; i++) {
          this.biomesData.i.push(this.biomesData.i.length);
          this.biomesData.iconsDensity.push(0);
          this.biomesData.icons.push([]);
          this.biomesData.cost.push(50);
        }
  
        this.svg.remove();
        this.map = document.getElementById("map-wrapper");
console.log(this.map);
        this.map.insertAdjacentHTML("afterbegin", data[5])
        this.map = this.map.children[0];
        console.log(this.map);
        this.svg = d3.select("#map");
        this.defs = this.svg.select("#deftemp");
        this.viewbox = this.svg.select("#viewbox");
        this.restoreDefaultEvents(); // apply default viewbox events on load
        this.scaleBar = this.svg.select("#scaleBar");
        this.legend = this.svg.select("#legend");
        this.ocean = this.viewbox.select("#ocean");
        this.oceanLayers = this.ocean.select("#oceanLayers");
        this.oceanPattern = this.ocean.select("#oceanPattern");
        this.lakes = this.viewbox.select("#lakes");
        this.landmass = this.viewbox.select("#landmass");
        this.texture = this.viewbox.select("#texture");
        this.terrs = this.viewbox.select("#terrs");
        this.biomes = this.viewbox.select("#biomes");
        this.ice = this.viewbox.select("#ice");
        this.cells = this.viewbox.select("#cells");
        this.gridOverlay = this.viewbox.select("#gridOverlay");
        this.coordinates = this.viewbox.select("#coordinates");
        this.compass = this.viewbox.select("#compass");
        this.rivers = this.viewbox.select("#rivers");
        this.terrain = this.viewbox.select("#terrain");
        this.relig = this.viewbox.select("#relig");
        this.cults = this.viewbox.select("#cults");
        this.regions = this.viewbox.select("#regions");
        this.statesBody = this.regions.select("#statesBody");
        this.statesHalo = this.regions.select("#statesHalo");
        this.provs = this.viewbox.select("#provs");
        this.zones = this.viewbox.select("#zones");
        this.borders = this.viewbox.select("#borders");
        this.stateBorders = this.borders.select("#stateBorders");
        this.provinceBorders = this.borders.select("#provinceBorders");
        this.routes = this.viewbox.select("#routes");
        this.roads = this.routes.select("#roads");
        this.trails = this.routes.select("#trails");
        this.searoutes = this.routes.select("#searoutes");
        this.temperature = this.viewbox.select("#temperature");
        this.coastline = this.viewbox.select("#coastline");
        this.prec = this.viewbox.select("#prec");
        this.population = this.viewbox.select("#population");
        this.emblems = this.viewbox.select("#emblems");
        this.labels = this.viewbox.select("#labels");
        this.icons = this.viewbox.select("#icons");
        this.burgIcons = this.icons.select("#burgIcons");
        this.anchors = this.icons.select("#anchors");
        this.armies = this.viewbox.select("#armies");
        this.markers = this.viewbox.select("#markers");
        this.ruler = this.viewbox.select("#ruler");
        this.fogging = this.viewbox.select("#fogging");
        this.debug = this.viewbox.select("#debug");
        this.burgLabels = this.labels.select("#burgLabels");
        document.getElementById("searoutes").setAttribute("fill","none");
        document.getElementById("stateBorders").setAttribute("fill","none");
        document.getElementById("provinceBorders").setAttribute("fill","none");
        document.getElementById("roads").setAttribute("fill","none");
        document.getElementById("trails").setAttribute("fill","none");
        document.getElementById("coastline").setAttribute("fill","none");
    
        this.grid = JSON.parse(data[6]);
        this.calculateVoronoi(this.grid, this.grid.points);
        this.grid.cells.h = Uint8Array.from(data[7].split(","));
        this.grid.cells.prec = Uint8Array.from(data[8].split(","));
        this.grid.cells.f = Uint16Array.from(data[9].split(","));
        this.grid.cells.t = Int8Array.from(data[10].split(","));
        this.grid.cells.temp = Int8Array.from(data[11].split(","));
  
        this.pack = {};
        this.reGraph();
        this.reMarkFeatures();
        this.pack.features = JSON.parse(data[12]);
        this.pack.cultures = JSON.parse(data[13]);
        this.pack.states = JSON.parse(data[14]);
        this.pack.burgs = JSON.parse(data[15]);
        this.pack.religions = data[29] ? JSON.parse(data[29]) : [{i: 0, name: "No religion"}];
        this.pack.provinces = data[30] ? JSON.parse(data[30]) : [0];
        this.pack.rivers = data[32] ? JSON.parse(data[32]) : [];
  
        this.cells = this.pack.cells;
        console.log(this.cells);
        this.cells.biome = Uint8Array.from(data[16].split(","));
        this.cells.burg = Uint16Array.from(data[17].split(","));
        this.cells.conf = Uint8Array.from(data[18].split(","));
        this.cells.culture = Uint16Array.from(data[19].split(","));
        this.cells.fl = Uint16Array.from(data[20].split(","));
        this.cells.pop = Float32Array.from(data[21].split(","));
        this.cells.r = Uint16Array.from(data[22].split(","));
        this.cells.road = Uint16Array.from(data[23].split(","));
        this.cells.s = Uint16Array.from(data[24].split(","));
        this.cells.state = Uint16Array.from(data[25].split(","));
        this.cells.religion = data[26] ? Uint16Array.from(data[26].split(",")) : new Uint16Array(this.cells.i.length);
        this.cells.province = data[27] ? Uint16Array.from(data[27].split(",")) : new Uint16Array(this.cells.i.length);
        this.cells.crossroad = data[28] ? Uint16Array.from(data[28].split(",")) : new Uint16Array(this.cells.i.length);
  
        if (data[31]) {
          const namesDL = data[31].split("/");
          namesDL.forEach((d, i) => {
            const e = d.split("|");
            if (!e.length) return;
            const b = e[5].split(",").length > 2 || !this.nameBases[i] ? e[5] : this.nameBases[i].b;
            this.nameBases[i] = {name: e[0], min: e[1], max: e[2], d: e[3], m: e[4], b};
          });
        }
  
        // helper functions
        const notHidden = selection => selection.node() && selection.style("display") !== "none";
        const hasChildren = (selection):boolean => {
          console.log(selection);
          return selection.node()?.hasChildNodes();
        };
        const hasChild = (selection, selector) => selection.node()?.querySelector(selector);
   
        // turn on active layers
        if (notHidden(this.texture) && hasChild(this.texture, "image")) this.toggleTexture(1);
        if (hasChildren(this.terrs)) this.toggleHeight(1);
        if (hasChildren(this.biomes)) this.toggleBiomes(1);
        // if (hasChildren(this.cells)) turnOn("toggleCells");
        // if (hasChildren(this.gridOverlay)) turnOn("toggleGrid");
        // if (hasChildren(this.coordinates)) turnOn("toggleCoordinates");
        // if (notHidden(this.compass) && hasChild(this.compass, "use")) turnOn("toggleCompass");
        if (hasChildren(this.rivers)) this.toggleRivers(1);
        if (notHidden(this.terrain) && hasChildren(this.terrain)) this.toggleRelief(1);
        // if (hasChildren(this.relig)) turnOn("toggleReligions");
        // if (hasChildren(this.cults)) turnOn("toggleCultures");
        if (hasChildren(this.statesBody)) this.toggleStates(1);
        // if (hasChildren(this.provs)) turnOn("toggleProvinces");
        // if (hasChildren(this.zones) && notHidden(this.zones)) turnOn("toggleZones");
        if (notHidden(this.borders) && hasChild(this.compass, "use")) this.toggleBorders(1);
        if (notHidden(this.routes) && hasChild(this.routes, "path")) this.toggleRoutes(1);
        // if (hasChildren(this.temperature)) turnOn("toggleTemp");
        // if (hasChild(this.population, "line")) turnOn("togglePopulation");
        if (hasChildren(this.ice)) this.toggleIce(1);
        // if (hasChild(this.prec, "circle")) turnOn("togglePrec");
        // if (notHidden(this.emblems) && hasChild(this.emblems, "use")) turnOn("toggleEmblems");
        if (notHidden(this.labels)) this.toggleLabels(1);
        // if (notHidden(this.icons)) turnOn("toggleIcons");
        // if (hasChildren(this.armies) && notHidden(this.armies)) turnOn("toggleMilitary");
        // if (hasChildren(this.markers) && notHidden(this.markers)) turnOn("toggleMarkers");
        // if (notHidden(this.ruler)) turnOn("toggleRulers");
        if (notHidden(this.scaleBar)) this.toggleScaleBar(1);
  
        // this.getCurrentPreset();
  
        // this.scaleBar.on("mousemove", () => tip("Click to open Units Editor")).on("click", () => this.editUnits());
        // this.legend.on("mousemove", () => tip("Drag to change the position. Click to hide the legend")).on("click", () => this.clearLegend());
  
        const version = parseFloat(data[0].split("|")[0]);
        if (version < 0.9) {
          // 0.9 has additional relief icons to be included into older maps
          document.getElementById("defs-relief").innerHTML = reliefIcons;
        }
  
        if (version < 1) {
          // 1.0 adds a new religions layer
          this.relig = this.viewbox.insert("g", "#terrain").attr("id", "relig");
          // Religions.generate();
  
          // 1.0 adds a legend box
          this.legend = this.svg.append("g").attr("id", "legend");
          this.legend.attr("font-family", "Almendra SC").attr("font-size", 13).attr("data-size", 13).attr("data-x", 99).attr("data-y", 93).attr("stroke-width", 2.5).attr("stroke", "#812929").attr("stroke-dasharray", "0 4 10 4").attr("stroke-linecap", "round");
  
          // 1.0 separated drawBorders fron drawStates()
          this.stateBorders = this.borders.append("g").attr("id", "stateBorders");
          this.provinceBorders = this.borders.append("g").attr("id", "provinceBorders");
          this.borders.attr("opacity", null).attr("stroke", null).attr("stroke-width", null).attr("stroke-dasharray", null).attr("stroke-linecap", null).attr("filter", null);
          this.stateBorders.attr("opacity", 0.8).attr("stroke", "#56566d").attr("stroke-width", 1).attr("stroke-dasharray", "2").attr("stroke-linecap", "butt").style("fill", "none");
          this.provinceBorders.attr("opacity", 0.8).attr("stroke", "#56566d").attr("stroke-width", 0.5).attr("stroke-dasharray", "1").attr("stroke-linecap", "butt").style("fill", "none");
  
          // 1.0 adds state relations, provinces, forms and full names
          this.provs = this.viewbox.insert("g", "#borders").attr("id", "provs").attr("opacity", 0.6);
          this.BurgsAndStates.collectStatistics();
          this.BurgsAndStates.generateCampaigns();
          this.BurgsAndStates.generateDiplomacy();
          this.BurgsAndStates.defineStateForms(null);
          this.drawStates();
          this.BurgsAndStates.generateProvinces(null);
          this.drawBorders();
  
          // 1.0 adds hatching
          // document.getElementsByTagName("defs")[0].appendChild(hatching);
  
          // 1.0 adds zones layer
          this.zones = this.viewbox.insert("g", "#borders").attr("id", "zones").attr("display", "none");
          this.zones.attr("opacity", 0.6).attr("stroke", null).attr("stroke-width", 0).attr("stroke-dasharray", null).attr("stroke-linecap", "butt");
          // this.addZones(null);
          // if (!this.markers.selectAll("*").size()) {
          //   this.Markers.generate();
          //   this.turnButtonOn("toggleMarkers");
          // }
  
          // 1.0 add fogging layer (state focus)
          this.fogging = this.viewbox.insert("g", "#ruler").attr("id", "fogging-cont").attr("mask", "url(#fog)").append("g").attr("id", "fogging").style("display", "none");
          this.fogging.append("rect").attr("x", 0).attr("y", 0).attr("width", "100%").attr("height", "100%");
          this.defs.append("mask").attr("id", "fog").append("rect").attr("x", 0).attr("y", 0).attr("width", "100%").attr("height", "100%").attr("fill", "white");
  
          // 1.0 changes states opacity bask to regions level
          if (this.statesBody.attr("opacity")) {
            this.regions.attr("opacity", this.statesBody.attr("opacity"));
            this.statesBody.attr("opacity", null);
          }
  
          // 1.0 changed labels to multi-lined
          this.labels.selectAll("textPath").each(function () {
            const text = this.textContent;
            const shift = this.getComputedTextLength() / -1.5;
            this.innerHTML = `<tspan x="${shift}">${text}</tspan>`;
          });
  
          // 1.0 added new biome - Wetland
          this.biomesData.name.push("Wetland");
          this.biomesData.color.push("#0b9131");
          this.biomesData.habitability.push(12);
        }
  
        if (version < 1.1) {
          // v 1.0 initial code had a bug with religion layer id
          if (!this.relig.size()) this.relig = this.viewbox.insert("g", "#terrain").attr("id", "relig");
  
          // v 1.0 initially has Sympathy status then relaced with Friendly
          for (const s of this.pack.states) {
            if (!s.diplomacy) continue;
            s.diplomacy = s.diplomacy.map(r => (r === "Sympathy" ? "Friendly" : r));
          }
  
          // labels should be toggled via style attribute, so remove display attribute
          this.labels.attr("display", null);
  
          // v 1.0 added religions heirarchy tree
          if (this.pack.religions[1] && !this.pack.religions[1].code) {
            this.pack.religions
              .filter(r => r.i)
              .forEach(r => {
                r.origin = 0;
                r.code = r.name.slice(0, 2);
              });
          }
  
          if (!document.getElementById("freshwater")) {
            this.lakes.append("g").attr("id", "freshwater");
            this.lakes.select("#freshwater").attr("opacity", 0.5).attr("fill", "#a6c1fd").attr("stroke", "#5f799d").attr("stroke-width", 0.7).attr("filter", null);
          }
  
          if (!document.getElementById("salt")) {
            this.lakes.append("g").attr("id", "salt");
            this.lakes.select("#salt").attr("opacity", 0.5).attr("fill", "#409b8a").attr("stroke", "#388985").attr("stroke-width", 0.7).attr("filter", null);
          }
  
          // v 1.1 added new lake and coast groups
          if (!document.getElementById("sinkhole")) {
            this.lakes.append("g").attr("id", "sinkhole");
            this.lakes.append("g").attr("id", "frozen");
            this.lakes.append("g").attr("id", "lava");
            this.lakes.select("#sinkhole").attr("opacity", 1).attr("fill", "#5bc9fd").attr("stroke", "#53a3b0").attr("stroke-width", 0.7).attr("filter", null);
            this.lakes.select("#frozen").attr("opacity", 0.95).attr("fill", "#cdd4e7").attr("stroke", "#cfe0eb").attr("stroke-width", 0).attr("filter", null);
            this.lakes.select("#lava").attr("opacity", 0.7).attr("fill", "#90270d").attr("stroke", "#f93e0c").attr("stroke-width", 2).attr("filter", "url(#crumpled)");
  
            this.coastline.append("g").attr("id", "sea_island");
            this.coastline.append("g").attr("id", "lake_island");
            this.coastline.select("#sea_island").attr("opacity", 0.5).attr("stroke", "#1f3846").attr("stroke-width", 0.7).attr("filter", "url(#dropShadow)");
            this.coastline.select("#lake_island").attr("opacity", 1).attr("stroke", "#7c8eaf").attr("stroke-width", 0.35).attr("filter", null);
          }
  
          // v 1.1 features stores more data
          this.defs.select("#land").selectAll("path").remove();
          this.defs.select("#water").selectAll("path").remove();
          this.coastline.selectAll("path").remove();
          this.lakes.selectAll("path").remove();
          this.drawCoastline();
        }
  
        if (version < 1.11) {
          // v 1.11 added new attributes
          this.terrs.attr("scheme", "bright").attr("terracing", 0).attr("skip", 5).attr("relax", 0).attr("curve", 0);
          this.svg.select("#oceanic > *").attr("id", "oceanicPattern");
          this.oceanLayers.attr("layers", "-6,-3,-1");
          this.gridOverlay.attr("type", "pointyHex").attr("size", 10);
  
          // v 1.11 added cultures heirarchy tree
          if (this.pack.cultures[1] && !this.pack.cultures[1].code) {
            this.pack.cultures
              .filter(c => c.i)
              .forEach(c => {
                c.origin = 0;
                c.code = c.name.slice(0, 2);
              });
          }
  
          // v 1.11 had an issue with fogging being displayed on load
          // this.unfog();
  
          // v 1.2 added new terrain attributes
          if (!this.terrain.attr("set")) this.terrain.attr("set", "simple");
          if (!this.terrain.attr("size")) this.terrain.attr("size", 1);
          if (!this.terrain.attr("density")) this.terrain.attr("density", 0.4);
        }
  
        if (version < 1.21) {
          // v 1.11 replaced "display" attribute by "display" style
          this.viewbox.selectAll("g").each(function () {
            if (this.hasAttribute("display")) {
              this.removeAttribute("display");
              this.style.display = "none";
            }
          });
  
          // v 1.21 added rivers data to pack
          this.pack.rivers = []; // rivers data
          this.rivers.selectAll("path").each(function () {
            const i = +this.id.slice(5);
            const length = this.getTotalLength() / 2;
            const s = this.getPointAtLength(length),
              e = this.getPointAtLength(0);
            const source = this.findCell(s.x, s.y),
              mouth = this.findCell(e.x, e.y);
            const name = this.Rivers.getName(mouth);
            const type = length < 25 ? this.rw({Creek: 9, River: 3, Brook: 3, Stream: 1}) : "River";
            this.pack.rivers.push({i, parent: 0, length, source, mouth, basin: i, name, type});
          });
        }
  
        if (version < 1.22) {
          // v 1.22 changed state neighbors from Set object to array
          this.BurgsAndStates.collectStatistics();
        }
  
        if (version < 1.3) {
          // v 1.3 added global options object
          const winds = this.options.slice(); // previostly wind was saved in settings[19]
          const year = this.rand(100, 2000);
          const era = this.Names.getBaseShort(this.P(0.7) ? 1 : this.rand(1,this.nameBases.length)) + " Era";
          const eraShort = era[0] + "E";
          const military = null; //this.Military.getDefaultOptions();
          this.options = {winds, year, era, eraShort, military};
  
          // v 1.3 added campaings data for all states
          this.BurgsAndStates.generateCampaigns();
  
          // v 1.3 added militry layer
          // this.armies = this.viewbox.insert("g", "#icons").attr("id", "armies");
          // this.armies.attr("opacity", 1).attr("fill-opacity", 1).attr("font-size", 6).attr("box-size", 3).attr("stroke", "#000").attr("stroke-width", 0.3);
          // this.turnButtonOn("toggleMilitary");
          // this.Military.generate();
        }
  
        if (version < 1.4) {
          // v 1.35 added dry lakes
          if (!this.lakes.select("#dry").size()) {
            this.lakes.append("g").attr("id", "dry");
            this.lakes.select("#dry").attr("opacity", 1).attr("fill", "#c9bfa7").attr("stroke", "#8e816f").attr("stroke-width", 0.7).attr("filter", null);
          }
  
          // v 1.4 added ice layer
          this.ice = this.viewbox.insert("g", "#coastline").attr("id", "ice").style("display", "none");
          this.ice.attr("opacity", null).attr("fill", "#e8f0f6").attr("stroke", "#e8f0f6").attr("stroke-width", 1).attr("filter", "url(#dropShadow05)");
          this.drawIce();
  
          // v 1.4 added icon and power attributes for units
          for (const unit of this.options.military) {
            if (!unit.icon) unit.icon = getUnitIcon(unit.type);
            if (!unit.power) unit.power = unit.crew;
          }
  
          function getUnitIcon(type) {
            if (type === "naval") return "🌊";
            if (type === "ranged") return "🏹";
            if (type === "mounted") return "🐴";
            if (type === "machinery") return "💣";
            if (type === "armored") return "🐢";
            if (type === "aviation") return "🦅";
            if (type === "magical") return "🔮";
            else return "⚔️";
          }
  
          // 1.4 added state reference for regiments
          this.pack.states.filter(s => s.military).forEach(s => s.military.forEach(r => (r.state = s.i)));
        }
  
        if (version < 1.5) {
          // not need to store default styles from v 1.5
          localStorage.removeItem("styleClean");
          localStorage.removeItem("styleGloom");
          localStorage.removeItem("styleAncient");
          localStorage.removeItem("styleMonochrome");
  
          // v 1.5 cultures has shield attribute
          this.pack.cultures.forEach(culture => {
            if (culture.removed) return;
            culture.shield = this.Cultures.getRandomShield();
          });
  
          // v 1.5 added burg type value
          this.pack.burgs.forEach(burg => {
            if (!burg.i || burg.removed) return;
            burg.type = this.BurgsAndStates.getType(burg.cell, burg.port);
          });
  
          // v 1.5 added emblems
          this.defs.append("g").attr("id", "defs-emblems");
          this.emblems = this.viewbox.insert("g", "#population").attr("id", "emblems").style("display", "none");
          this.emblems.append("g").attr("id", "burgEmblems");
          this.emblems.append("g").attr("id", "provinceEmblems");
          this.emblems.append("g").attr("id", "stateEmblems");
          // this.regenerateEmblems();
          // this.toggleEmblems();
  
          // v 1.5 changed releif icons data
          this.terrain.selectAll("use").each(function () {
            const type = this.getAttribute("data-type") || this.getAttribute("xlink:href");
            this.removeAttribute("xlink:href");
            this.removeAttribute("data-type");
            this.removeAttribute("data-size");
            this.setAttribute("href", type);
          });
        }
  
        if (version < 1.6) {
          // v 1.6 changed rivers data
          for (const river of this.pack.rivers) {
            const el = document.getElementById("river" + river.i);
            if (el) {
              river.widthFactor = +el.getAttribute("data-width");
              el.removeAttribute("data-width");
              el.removeAttribute("data-increment");
              river.discharge = this.pack.cells.fl[river.mouth] || 1;
              river.width = this.rn(river.length / 100, 2);
              river.sourceWidth = 0.1;
            } else {
              this.Rivers.remove(river.i);
            }
          }
  
          // v 1.6 changed lakes data
          for (const f of this.pack.features) {
            if (f.type !== "lake") continue;
            if (f.evaporation) continue;
  
            f.flux = f.flux || f.cells * 3;
            f.temp = this.grid.cells.temp[this.pack.cells.g[f.firstCell]];
            f.height = f.height || d3.min(this.pack.cells.c[f.firstCell].map(c => this.pack.cells.h[c]).filter(h => h >= 20));
            const height = (f.height - 18) ** this.heightExponentInput;
            const evaporation = ((700 * (f.temp + 0.006 * height)) / 50 + 75) / (80 - f.temp);
            f.evaporation = this.rn(evaporation * f.cells);
            f.name = f.name || this.Lakes.getName(f);
            delete f.river;
          }
        }
  
        if (version < 1.61) {

          this.ruler.selectAll(".ruler > .white").each(function () {
            const x1 = +this.getAttribute("x1");
            const y1 = +this.getAttribute("y1");
            const x2 = +this.getAttribute("x2");
            const y2 = +this.getAttribute("y2");
            if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2)) return;
            const points = [
              [x1, y1],
              [x2, y2]
            ];
            rulers.create(Ruler, points);
          });
  
          this.ruler.selectAll("g.opisometer").each(function () {
            const pointsString = this.dataset.points;
            if (!pointsString) return;
            const points = JSON.parse(pointsString);
            rulers.create(Opisometer, points);
          });
  
          this.ruler.selectAll("path.planimeter").each(function () {
            const length = this.getTotalLength();
            if (length < 30) return;
  
            const step = length > 1000 ? 40 : length > 400 ? 20 : 10;
            const increment = length / Math.ceil(length / step);
            const points = [];
            for (let i = 0; i <= length; i += increment) {
              const point = this.getPointAtLength(i);
              points.push([point.x | 0, point.y | 0]);
            }
  
            rulers.create(Planimeter, points);
          });
  
          this.ruler.selectAll("*").remove();
  
          if (rulers.data.length) {
            this.rulers.draw();
          }
  
          // 1.61 changed oceanicPattern from rect to image
          const pattern = document.getElementById("oceanic");
          const filter = pattern.firstElementChild.getAttribute("filter");
          const href = filter ? "./images/" + filter.replace("url(#", "").replace(")", "") + ".png" : "";
          pattern.innerHTML = `<image id="oceanicPattern" href=${href} width="100" height="100" opacity="0.2"></image>`;
        }
  
        if (version < 1.62) {
          // v 1.62 changed grid data
          this.gridOverlay.attr("size", null);
        }
  
        if (version < 1.63) {
          // v.1.63 changed ocean pattern opacity element
          const oceanPattern = document.getElementById("oceanPattern");
          if (oceanPattern) oceanPattern.removeAttribute("opacity");
          const oceanicPattern = document.getElementById("oceanicPattern");
          if (!oceanicPattern.getAttribute("opacity")) oceanicPattern.setAttribute("opacity", (0.2).toString());
  
          // v 1.63 moved label text-shadow from css to editable inline style
          this.burgLabels.select("#cities").style("text-shadow", "white 0 0 4px");
          this.burgLabels.select("#towns").style("text-shadow", "white 0 0 4px");
          this.labels.select("#states").style("text-shadow", "white 0 0 4px");
          this.labels.select("#addedLabels").style("text-shadow", "white 0 0 4px");
        }
  
        if (version < 1.64) {
          // v.1.64 change states style
          const opacity = this.regions.attr("opacity");
          const filter = this.regions.attr("filter");
          this.statesBody.attr("opacity", opacity).attr("filter", filter);
          this.statesHalo.attr("opacity", opacity).attr("filter", "blur(5px)");
          this.regions.attr("opacity", null).attr("filter", null);
        }
  
        if (version < 1.65) {
          // v 1.65 changed rivers data
          d3.select("#rivers").attr("style", null); // remove style to unhide layer
          const {cells, rivers} = this.pack;
  
          for (const river of rivers) {
            const node = <any>document.getElementById("river" + river.i);
            if (node && !river.cells) {
              const riverCells = [];
              const riverPoints = [];
  
              const length = node.getTotalLength() / 2;
              const segments = Math.ceil(length / 6);
              const increment = length / segments;
  
              for (let i = 0; i <= segments; i++) {
                const shift = increment * i;
                const {x: x1, y: y1} = node.getPointAtLength(length + shift);
                const {x: x2, y: y2} = node.getPointAtLength(length - shift);
                const x = this.rn((x1 + x2) / 2, 1);
                const y = this.rn((y1 + y2) / 2, 1);
  
                const cell = this.findCell(x, y);
                riverPoints.push([x, y]);
                riverCells.push(cell);
              }
  
              river.cells = riverCells;
              river.points = riverPoints;
            }
  
            river.widthFactor = 1;
  
            cells.i.forEach(i => {
              const riverInWater = cells.r[i] && cells.h[i] < 20;
              if (riverInWater) cells.r[i] = 0;
            });
          }
        }
  
        if (version < 1.652) {
          // remove style to unhide layers
          this.rivers.attr("style", null);
          this.borders.attr("style", null);
        }
  
        // const cells = this.pack.cells;
  
        if (this.pack.cells.i.length !== this.pack.cells.state.length) {
          console.error("Striping issue. Map data is corrupted. The only solution is to edit the heightmap in erase mode");
        }
  
        const invalidStates = [...new Set(this.cells.state)].filter((s:any) => !this.pack.states[s] || this.pack.states[s].removed);
        invalidStates.forEach(s => {
          const invalidCells = this.cells.i.filter((i:number) => this.cells.state[i] === s);
          invalidCells.forEach(i => (this.cells.state[i] = 0));
          console.error("Data Integrity Check. Invalid state", s, "is assigned to cells", invalidCells);
        });
  
        const invalidProvinces = [...new Set(this.cells.province)].filter((p:any) => p && (!this.pack.provinces[p] || this.pack.provinces[p].removed));
        invalidProvinces.forEach(p => {
          const invalidCells = this.cells.i.filter((i:number) => this.cells.province[i] === p);
          invalidCells.forEach(i => (this.cells.province[i] = 0));
          console.error("Data Integrity Check. Invalid province", p, "is assigned to cells", invalidCells);
        });
  
        const invalidCultures = [...new Set(this.cells.culture)].filter((c:any) => !this.pack.cultures[c] || this.pack.cultures[c].removed);
        invalidCultures.forEach(c => {
          const invalidCells = this.cells.i.filter((i:number) => this.cells.culture[i] === c);
          invalidCells.forEach(i => (this.cells.province[i] = 0));
          console.error("Data Integrity Check. Invalid culture", c, "is assigned to cells", invalidCells);
        });
  
        const invalidReligions = [...new Set(this.cells.religion)].filter((r:any) => !this.pack.religions[r] || this.pack.religions[r].removed);
        invalidReligions.forEach(r => {
          const invalidCells = this.cells.i.filter((i:number) => this.cells.religion[i] === r);
          invalidCells.forEach(i => (this.cells.religion[i] = 0));
          console.error("Data Integrity Check. Invalid religion", r, "is assigned to cells", invalidCells);
        });
  
        const invalidFeatures = [...new Set(this.cells.f)].filter((f:any) => f && !this.pack.features[f]);
        invalidFeatures.forEach(f => {
          const invalidCells = this.cells.i.filter((i:number) => this.cells.f[i] === f);
          // No fix as for now
          console.error("Data Integrity Check. Invalid feature", f, "is assigned to cells", invalidCells);
        });
  
        const invalidBurgs = [...new Set(this.cells.burg)].filter((b:any) => b && (!this.pack.burgs[b] || this.pack.burgs[b].removed));
        invalidBurgs.forEach(b => {
          const invalidCells = this.cells.i.filter((i:number) => this.cells.burg[i] === b);
          invalidCells.forEach(i => (this.cells.burg[i] = 0));
          console.error("Data Integrity Check. Invalid burg", b, "is assigned to cells", invalidCells);
        });
  
        const invalidRivers = [...new Set(this.cells.r)].filter(r => r && !this.pack.rivers.find(river => river.i === r));
        invalidRivers.forEach(r => {
          const invalidCells = this.cells.i.filter((i:number) => this.cells.r[i] === r);
          invalidCells.forEach(i => (this.cells.r[i] = 0));
          this.rivers.select("river" + r).remove();
          console.error("Data Integrity Check. Invalid river", r, "is assigned to cells", invalidCells);
        });
  
        this.pack.burgs.forEach(b => {
          if (!b.i || b.removed) return;
          if (b.port < 0) {
            console.error("Data Integrity Check. Burg", b.i, "has invalid port value", b.port);
            b.port = 0;
          }
  
          if (b.cell >= this.cells.i.length) {
            console.error("Data Integrity Check. Burg", b.i, "is linked to invalid cell", b.cell);
            b.cell = this.findCell(b.x, b.y);
            this.cells.i.filter((i:number) => this.cells.burg[i] === b.i).forEach(i => (this.cells.burg[i] = 0));
            this.cells.burg[b.cell] = b.i;
          }
  
          if (b.state && !this.pack.states[b.state]) {
            console.error("Data Integrity Check. Burg", b.i, "is linked to invalid state", b.state);
            b.state = 0;
          }
        });
  
        this.pack.provinces.forEach(p => {
          if (!p.i || p.removed) return;
          if (this.pack.states[p.state] && !this.pack.states[p.state].removed) return;
          console.error("Data Integrity Check. Province", p.i, "is linked to removed state", p.state);
          p.removed = true; // remove incorrect province
        });
  
        this.changeMapSize();
  
      // remove href from emblems, to trigger rendering on load
      this.emblems.selectAll("use").attr("href", null);
  
      // draw data layers (no kept in svg)
  
      // set options
      // this.yearInput.value = 1000;
      // this.eraInput.value = "Era";
      // this.shapeRendering.value = this.viewbox.attr("shape-rendering") || "geometricPrecision";
  
      // if (window.restoreDefaultEvents) restoreDefaultEvents();
      this.focusOn(); // based on searchParams focus on point, cell or burg
      this.invokeActiveZooming();
  
      // console.warn(`TOTAL: ${rn((performance.now() - uploadMap.timeStart) / 1000, 2)}s`);
      // this.showStatistics();
      // INFO && console.groupEnd("Loaded Map " + seed);
      // tip("Map is successfully loaded", true, "success", 7000);
    } catch (error) {
      console.error(error);
      // clearMainTip();
  
      // alertMessage.innerHTML = `An error is occured on map loading. Select a different file to load,
      //   <br>generate a new random map or cancel the loading
      //   <p id="errorBox">${parseError(error)}</p>`;
      // $("#alert").dialog({
      //   resizable: false,
      //   title: "Loading error",
      //   maxWidth: "50em",
      //   buttons: {
      //     "Select file": function () {
      //       $(this).dialog("close");
      //       mapToLoad.click();
      //     },
      //     "New map": function () {
      //       $(this).dialog("close");
      //       regenerateMap();
      //     },
      //     Cancel: function () {
      //       $(this).dialog("close");
      //     }
      //   },
      //   position: {my: "center", at: "center", of: "svg"}
      // });
    }
 }
  Lakes = (() => {
    let heightExponentInput = this.heightExponentInput;
    let rn = this.rn;
    let grid = this.grid;
    let pack = this.pack;

    const setClimateData = function (h) {
      const cells = pack.cells;
      const lakeOutCells = new Uint16Array(cells.i.length);
  
      pack.features.forEach(f => {
        if (f.type !== "lake") return;
  
        // default flux: sum of precipitation around lake
        f.flux = f.shoreline.reduce((acc, c) => acc + grid.cells.prec[cells.g[c]], 0);
  
        // temperature and evaporation to detect closed lakes
        f.temp = f.cells < 6 ? grid.cells.temp[cells.g[f.firstCell]] : rn(d3.mean(f.shoreline.map(c => grid.cells.temp[cells.g[c]])), 1);
        const height = (f.height - 18) ** heightExponentInput; // height in meters
        const evaporation = ((700 * (f.temp + 0.006 * height)) / 50 + 75) / (80 - f.temp); // based on Penman formula, [1-11]
        f.evaporation = rn(evaporation * f.cells);
  
        // no outlet for lakes in depressed areas
        if (f.closed) return;
  
        // lake outlet cell
        f.outCell = f.shoreline[d3.scan(f.shoreline, (a, b) => h[a] - h[b])];
        lakeOutCells[f.outCell] = f.i;
      });
  
      return lakeOutCells;
    };
  
    // get array of land cells aroound lake
    const getShoreline = function (lake) {
      const uniqueCells = new Set();
      lake.vertices.forEach(v => pack.vertices.c[v].forEach(c => pack.cells.h[c] >= 20 && uniqueCells.add(c)));
      lake.shoreline = [...uniqueCells];
    };
  
    const prepareLakeData = h => {
      const cells = pack.cells;
      const ELEVATION_LIMIT = +(<HTMLInputElement>document.getElementById("lakeElevationLimitOutput")).value;
  
      pack.features.forEach(f => {
        if (f.type !== "lake") return;
        delete f.flux;
        delete f.inlets;
        delete f.outlet;
        delete f.height;
        delete f.closed;
        !f.shoreline && this.Lakes.getShoreline(f);
  
        // lake surface height is as lowest land cells around
        const min = f.shoreline.sort((a, b) => h[a] - h[b])[0];
        f.height = h[min] - 0.1;
  
        // check if lake can be open (not in deep depression)
        if (ELEVATION_LIMIT === 80) {
          f.closed = false;
          return;
        }
  
        let deep = true;
        const threshold = f.height + ELEVATION_LIMIT;
        const queue = [min];
        const checked = [];
        checked[min] = true;
  
        // check if elevated lake can potentially pour to another water body
        while (deep && queue.length) {
          const q = queue.pop();
  
          for (const n of cells.c[q]) {
            if (checked[n]) continue;
            if (h[n] >= threshold) continue;
  
            if (h[n] < 20) {
              const nFeature = pack.features[cells.f[n]];
              if (nFeature.type === "ocean" || f.height > nFeature.height) {
                deep = false;
                break;
              }
            }
  
            checked[n] = true;
            queue.push(n);
          }
        }
  
        f.closed = deep;
      });
    };
  
    const cleanupLakeData = function () {
      for (const feature of pack.features) {
        if (feature.type !== "lake") continue;
        delete feature.river;
        delete feature.enteringFlux;
        delete feature.outCell;
        delete feature.closed;
        feature.height = rn(feature.height, 3);
  
        const inlets = feature.inlets?.filter(r => pack.rivers.find(river => river.i === r));
        if (!inlets || !inlets.length) delete feature.inlets;
        else feature.inlets = inlets;
  
        const outlet = feature.outlet && pack.rivers.find(river => river.i === feature.outlet);
        if (!outlet) delete feature.outlet;
      }
    };
  
    const defineGroup = function () {
      for (const feature of pack.features) {
        if (feature.type !== "lake") continue;
        const lakeEl = this.lakes.select(`[data-f="${feature.i}"]`).node();
        if (!lakeEl) continue;
  
        feature.group = getGroup(feature);
        document.getElementById(feature.group).appendChild(lakeEl);
      }
    };
  
    const generateName = function () {
      Math.random = this.aleaPRNG(this.seed);
      for (const feature of pack.features) {
        if (feature.type !== "lake") continue;
        feature.name = getName(feature);
      }
    };
  
    const getName = function (feature) {
      const landCell = pack.cells.c[feature.firstCell].find(c => pack.cells.h[c] >= 20);
      const culture = pack.cells.culture[landCell];
      return this.Names.getCulture(culture);
    };
  
    function getGroup(feature) {
      if (feature.temp < -3) return "frozen";
      if (feature.height > 60 && feature.cells < 10 && feature.firstCell % 10 === 0) return "lava";
  
      if (!feature.inlets && !feature.outlet) {
        if (feature.evaporation > feature.flux * 4) return "dry";
        if (feature.cells < 3 && feature.firstCell % 10 === 0) return "sinkhole";
      }
  
      if (!feature.outlet && feature.evaporation > feature.flux) return "salt";
  
      return "freshwater";
    }
  
    return {setClimateData, cleanupLakeData, prepareLakeData, defineGroup, generateName, getName, getShoreline};
  })();
  
  declareFont = (font) => {
    const {family, src, ...rest} = font;
    if (!src) return;
  
    // const fontFace: any = new FontFace(family, src, {...rest, display: "block"});
    // document.fonts.add(fontFace);
    console.log('document.fonts.add(fontFace)');
    this.addFontOption(family);
  }
  
  declareDefaultFonts = () => {
    this.fonts.forEach(font => {
      if (font.src) this.declareFont(font);
      else this.addFontOption(font.family);
    });
  }
  
  getUsedFonts = (svg) => {
    const usedFontFamilies = new Set();
  
    const labelGroups = svg.querySelectorAll("#labels g");
    for (const labelGroup of labelGroups) {
      const font = labelGroup.getAttribute("font-family");
      if (font) usedFontFamilies.add(font);
    }
  
    const provinceFont = this.provs.attr("font-family");
    if (provinceFont) usedFontFamilies.add(provinceFont);
  
    const legend = svg.querySelector("#legend");
    const legendFont = legend?.getAttribute("font-family");
    if (legendFont) usedFontFamilies.add(legendFont);
  
    const usedFonts = this.fonts.filter(font => usedFontFamilies.has(font.family));
    return usedFonts;
  }
  
  addFontOption = (family) => {
    const options = <HTMLSelectElement>document.getElementById("styleSelectFont");
    // const existingOption = options.querySelector(`[value="${family}"]`);
    // if (existingOption) return;
  
    // const option = document.createElement("option");
    // option.value = family;
    // option.innerText = family;
    // option.style.fontFamily = family;
    // options.add(option);
  }
  
   fetchGoogleFont = async(family) => {
    const url = `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, "+")}`;
    try {
      const resp = await fetch(url);
      const text = await resp.text();
  
      const fontFaceRules = text.match(/font-face\s*{[^}]+}/g);
      const fonts = fontFaceRules.map(fontFace => {
        const srcURL = fontFace.match(/url\(['"]?(.+?)['"]?\)/)[1];
        const src = `url(${srcURL})`;
        const unicodeRange = fontFace.match(/unicode-range: (.*?);/)?.[1];
        const variant = fontFace.match(/font-style: (.*?);/)?.[1];
  
        const font:any = {family, src};
        if (unicodeRange) font.unicodeRange = unicodeRange;
        if (variant && variant !== "normal") font.variant = variant;
        return font;
      });
  
      return fonts;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
  
  readBlobAsDataURL = (blob) => {
    return new Promise(function (resolve, reject) {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
  
   loadFontsAsDataURI = async (fonts) => {
    const promises = fonts.map(async font => {
      const url = font.src.match(/url\(['"]?(.+?)['"]?\)/)[1];
      const resp = await fetch(url);
      const blob = await resp.blob();
      const dataURL = await this.readBlobAsDataURL(blob);
  
      return {...font, src: `url('${dataURL}')`};
    });
  
    return await Promise.all(promises);
  }
  
   addGoogleFont = async (family) => {
    const fontRanges = await this.fetchGoogleFont(family);
    // if (!fontRanges) return tip("Cannot fetch Google font for this value", true, "error", 4000);
    // tip(`Google font ${family} is loading...`, true, "warn", 4000);
  
    const promises = fontRanges.map(range => {
      const {src, unicodeRange, variant} = range;
      // const fontFace = new FontFace(family, src, {unicodeRange, variant, display: "block"});
      // return fontFace.load();
    });
  
    Promise.all(promises)
      .then(fontFaces => {
        fontFaces.forEach(fontFace => console.log("document.fonts.add(fontFace)"));
        this.fonts.push(...fontRanges);
        // tip(`Google font ${family} is added to the list`, true, "success", 4000);
        this.addFontOption(family);
        (<HTMLInputElement>document.getElementById("styleSelectFont")).value = family;
        this.changeFont();
      })
      .catch(err => {
        // tip(`Failed to load Google font ${family}`, true, "error", 4000);
        console.error(err);
      });
  }
  
  addLocalFont = (family) => {
    this.fonts.push({family});
  
    // const fontFace = new FontFace(family, `local(${family})`, {display: "block"});
    console.log("document.fonts.add(fontFace)");
    // tip(`Local font ${family} is added to the fonts list`, true, "success", 4000);
    this.addFontOption(family);
    (<HTMLInputElement>document.getElementById("styleSelectFont")).value = family;
    this.changeFont();
  }
  
  addWebFont = (family, url) => {
    const src = `url('${url}')`;
    this.fonts.push({family, src});
  
    // const fontFace = new FontFace(family, src, {display: "block"});
    console.log("document.fonts.add(fontFace)");
    // tip(`Font ${family} is added to the list`, true, "success", 4000);
    this.addFontOption(family);
    (<HTMLInputElement>document.getElementById("styleSelectFont")).value = family;
    this.changeFont();
  }

  COArenderer = (() => {
    const colors = {
      argent: "#fafafa",
      or: "#ffe066",
      gules: "#d7374a",
      sable: "#333333",
      azure: "#377cd7",
      vert: "#26c061",
      purpure: "#522d5b",
      murrey: "#85185b",
      sanguine: "#b63a3a",
      tenné: "#cc7f19"
    };
  
    const shieldPositions = {
      // shield-specific position: [x, y] (relative to center)
      heater: {
        a: [-43.75, -50],
        b: [0, -50],
        c: [43.75, -50],
        d: [-43.75, 0],
        e: [0, 0],
        f: [43.75, 0],
        g: [-32.25, 37.5],
        h: [0, 50],
        i: [32.25, 37.5],
        y: [-50, -50],
        z: [0, 62.5],
        j: [-37.5, -37.5],
        k: [0, -37.5],
        l: [37.5, -37.5],
        m: [-30, 30],
        n: [0, 42.5],
        o: [30, 30],
        p: [-37.5, 0],
        q: [37.5, 0],
        A: [-66.2, -66.6],
        B: [-22, -66.6],
        C: [22, -66.6],
        D: [66.2, -66.6],
        K: [-66.2, -20],
        E: [66.2, -20],
        J: [-55.5, 26],
        F: [55.5, 26],
        I: [-33, 62],
        G: [33, 62],
        H: [0, 89.5]
      },
      spanish: {
        a: [-43.75, -50],
        b: [0, -50],
        c: [43.75, -50],
        d: [-43.75, 0],
        e: [0, 0],
        f: [43.75, 0],
        g: [-43.75, 50],
        h: [0, 50],
        i: [43.75, 50],
        y: [-50, -50],
        z: [0, 50],
        j: [-37.5, -37.5],
        k: [0, -37.5],
        l: [37.5, -37.5],
        m: [-37.5, 37.5],
        n: [0, 37.5],
        o: [37.5, 37.5],
        p: [-37.5, 0],
        q: [37.5, 0],
        A: [-66.2, -66.6],
        B: [-22, -66.6],
        C: [22, -66.6],
        D: [66.2, -66.6],
        K: [-66.4, -20],
        E: [66.4, -20],
        J: [-66.4, 26],
        F: [66.4, 26],
        I: [-49, 70],
        G: [49, 70],
        H: [0, 92]
      },
      french: {
        a: [-43.75, -50],
        b: [0, -50],
        c: [43.75, -50],
        d: [-43.75, 0],
        e: [0, 0],
        f: [43.75, 0],
        g: [-43.75, 50],
        h: [0, 50],
        i: [43.75, 50],
        y: [-50, -50],
        z: [0, 65],
        j: [-37.5, -37.5],
        k: [0, -37.5],
        l: [37.5, -37.5],
        m: [-37.5, 37.5],
        n: [0, 37.5],
        o: [37.5, 37.5],
        p: [-37.5, 0],
        q: [37.5, 0],
        A: [-66.2, -66.6],
        B: [-22, -66.6],
        C: [22, -66.6],
        D: [66.2, -66.6],
        K: [-66.4, -20],
        E: [66.4, -20],
        J: [-66.4, 26],
        F: [66.4, 26],
        I: [-65.4, 70],
        G: [65.4, 70],
        H: [0, 89]
      },
      horsehead: {
        a: [-43.75, -47.5],
        b: [0, -50],
        c: [43.75, -47.5],
        d: [-35, 0],
        e: [0, 0],
        f: [35, 0],
        h: [0, 50],
        y: [-50, -50],
        z: [0, 55],
        j: [-35, -35],
        k: [0, -40],
        l: [35, -35],
        m: [-30, 30],
        n: [0, 40],
        o: [30, 30],
        p: [-27.5, 0],
        q: [27.5, 0],
        A: [-71, -52],
        B: [-24, -73],
        C: [24, -73],
        D: [71, -52],
        K: [-62, -16],
        E: [62, -16],
        J: [-39, 20],
        F: [39, 20],
        I: [-33.5, 60],
        G: [33.5, 60],
        H: [0, 91.5]
      },
      horsehead2: {
        a: [-37.5, -47.5],
        b: [0, -50],
        c: [37.5, -47.5],
        d: [-35, 0],
        e: [0, 0],
        f: [35, 0],
        g: [-35, 47.5],
        h: [0, 50],
        i: [35, 47.5],
        y: [-50, -50],
        z: [0, 55],
        j: [-30, -30],
        k: [0, -40],
        l: [30, -30],
        m: [-30, 30],
        n: [0, 40],
        o: [30, 30],
        p: [-27.5, 0],
        q: [27.5, 0],
        A: [-49, -39],
        B: [-22, -70],
        C: [22, -70],
        D: [49, -39],
        K: [-51, -2],
        E: [51, -2],
        J: [-38.5, 31],
        F: [38.5, 31],
        I: [-35, 67],
        G: [35, 67],
        H: [0, 85]
      },
      polish: {
        a: [-35, -50],
        b: [0, -50],
        c: [35, -50],
        d: [-40, 0],
        e: [0, 0],
        f: [40, 0],
        g: [-37.5, 50],
        h: [0, 50],
        i: [37.5, 50],
        y: [-50, -50],
        z: [0, 65],
        j: [-27.5, -27.5],
        k: [0, -45],
        l: [27.5, -27.5],
        m: [-27.5, 27.5],
        n: [0, 45],
        o: [27.5, 27.5],
        p: [-32.5, 0],
        q: [32.5, 0],
        A: [-48, -52],
        B: [-23, -80],
        C: [23, -80],
        D: [48, -52],
        K: [-47, -10],
        E: [47, -10],
        J: [-62, 32],
        F: [62, 32],
        I: [-37, 68],
        G: [37, 68],
        H: [0, 86]
      },
      hessen: {
        a: [-43.75, -50],
        b: [0, -50],
        c: [43.75, -50],
        d: [-43.75, 0],
        e: [0, 0],
        f: [43.75, 0],
        g: [-43.75, 50],
        h: [0, 50],
        i: [43.75, 50],
        y: [-50, -50],
        z: [0, 52.5],
        j: [-40, -40],
        k: [0, -40],
        l: [40, -40],
        m: [-40, 40],
        n: [0, 40],
        o: [40, 40],
        p: [-40, 0],
        q: [40, 0],
        A: [-69, -64],
        B: [-22, -76],
        C: [22, -76],
        D: [69, -64],
        K: [-66.4, -20],
        E: [66.4, -20],
        J: [-62, 26],
        F: [62, 26],
        I: [-46, 70],
        G: [46, 70],
        H: [0, 91.5]
      },
      swiss: {
        a: [-43.75, -50],
        b: [0, -50],
        c: [43.75, -50],
        d: [-43.75, 0],
        e: [0, 0],
        f: [43.75, 0],
        g: [-32, 37.5],
        h: [0, 50],
        i: [32, 37.5],
        y: [-50, -50],
        z: [0, 62.5],
        j: [-37.5, -37.5],
        k: [0, -37.5],
        l: [37.5, -37.5],
        m: [-32, 32.5],
        n: [0, 42.5],
        o: [32, 32.5],
        p: [-37.5, 0],
        q: [37.5, 0],
        A: [-66.2, -66.6],
        B: [-22, -66],
        C: [22, -66],
        D: [66.2, -66.6],
        K: [-63, -20],
        E: [63, -20],
        J: [-50, 26],
        F: [50, 26],
        I: [-29, 62],
        G: [29, 62],
        H: [0, 89.5]
      },
      boeotian: {
        a: [-37.5, -47.5],
        b: [0, -47.5],
        c: [37.5, -47.5],
        d: [-25, 0],
        e: [0, 0],
        f: [25, 0],
        g: [-37.5, 47.5],
        h: [0, 47.5],
        i: [37.5, 47.5],
        y: [-48, -48],
        z: [0, 60],
        j: [-32.5, -37.5],
        k: [0, -45],
        l: [32.5, -37.5],
        m: [-32.5, 37.5],
        n: [0, 45],
        o: [32.5, 37.5],
        p: [-20, 0],
        q: [20, 0],
        A: [-45, -55],
        B: [-20, -77],
        C: [20, -77],
        D: [45, -55],
        K: [-59, -25],
        E: [59, -25],
        J: [-58, 27],
        F: [58, 27],
        I: [-39, 63],
        G: [39, 63],
        H: [0, 81]
      },
      roman: {
        a: [-40, -52.5],
        b: [0, -52.5],
        c: [40, -52.5],
        d: [-40, 0],
        e: [0, 0],
        f: [40, 0],
        g: [-40, 52.5],
        h: [0, 52.5],
        i: [40, 52.5],
        y: [-42.5, -52.5],
        z: [0, 65],
        j: [-30, -37.5],
        k: [0, -37.5],
        l: [30, -37.5],
        m: [-30, 37.5],
        n: [0, 37.5],
        o: [30, 37.5],
        p: [-30, 0],
        q: [30, 0],
        A: [-51.5, -65],
        B: [-17, -75],
        C: [17, -75],
        D: [51.5, -65],
        K: [-51.5, -21],
        E: [51.5, -21],
        J: [-51.5, 21],
        F: [51.5, 21],
        I: [-51.5, 65],
        G: [51.5, 65],
        H: [-17, 75],
        L: [17, 75]
      },
      kite: {
        b: [0, -65],
        e: [0, -15],
        h: [0, 35],
        z: [0, 35],
        k: [0, -50],
        n: [0, 20],
        p: [-20, -15],
        q: [20, -15],
        A: [-38, -52],
        B: [-29, -78],
        C: [29, -78],
        D: [38, -52],
        K: [-33, -20],
        E: [33, -20],
        J: [-25, 11],
        F: [25, 11],
        I: [-15, 42],
        G: [15, 42],
        H: [0, 73],
        L: [0, -91]
      },
      oldFrench: {
        a: [-43.75, -50],
        b: [0, -50],
        c: [43.75, -50],
        d: [-43.75, 0],
        e: [0, 0],
        f: [43.75, 0],
        g: [-37.5, 50],
        h: [0, 50],
        i: [37.5, 50],
        y: [-50, -50],
        z: [0, 62.5],
        j: [-37.5, -37.5],
        k: [0, -37.5],
        l: [37.5, -37.5],
        m: [-37.5, 37.5],
        n: [0, 45],
        o: [37.5, 37.5],
        p: [-37.5, 0],
        q: [37.5, 0],
        A: [-66.2, -66.6],
        B: [-22, -66.6],
        C: [22, -66.6],
        D: [66.2, -66.6],
        K: [-66.2, -20],
        E: [66.2, -20],
        J: [-64, 26],
        F: [64, 26],
        I: [-45, 62],
        G: [45, 62],
        H: [0, 91]
      },
      renaissance: {
        a: [-43.75, -50],
        b: [0, -50],
        c: [43.75, -50],
        d: [-41.5, 0],
        e: [0, 0],
        f: [41.5, 0],
        g: [-43.75, 50],
        h: [0, 50],
        i: [43.75, 50],
        y: [-50, -50],
        z: [0, 62.5],
        j: [-37.5, -37.5],
        k: [0, -37.5],
        l: [37.5, -37.5],
        m: [-37.5, 37.5],
        n: [0, 37.5],
        o: [37.5, 37.5],
        p: [-37.5, 0],
        q: [37.5, 0],
        A: [-61, -55],
        B: [-23, -67],
        C: [23, -67],
        D: [61, -55],
        K: [-55, -11],
        E: [55, -11],
        J: [-65, 31],
        F: [65, 31],
        I: [-45, 76],
        G: [45, 76],
        H: [0, 87]
      },
      baroque: {
        a: [-43.75, -45],
        b: [0, -45],
        c: [43.75, -45],
        d: [-43.75, 0],
        e: [0, 0],
        f: [43.75, 0],
        g: [-43.75, 50],
        h: [0, 50],
        i: [43.75, 50],
        y: [-50, -50],
        z: [0, 60],
        j: [-37.5, -37.5],
        k: [0, -37.5],
        l: [37.5, -37.5],
        m: [-37.5, 37.5],
        n: [0, 37.5],
        o: [37.5, 37.5],
        p: [-37.5, 0],
        q: [37.5, 0],
        A: [-65, -54.5],
        B: [-22, -65],
        C: [22, -65],
        D: [65, -54.5],
        K: [-58.5, -15],
        E: [58.5, -15],
        J: [-65, 31],
        F: [66, 31],
        I: [-35, 73],
        G: [35, 73],
        H: [0, 89]
      },
      targe: {
        a: [-43.75, -50],
        b: [0, -50],
        c: [43.75, -50],
        d: [-43.75, 0],
        e: [0, 0],
        f: [43.75, 0],
        g: [-43.75, 50],
        h: [0, 50],
        i: [43.75, 50],
        y: [-50, -50],
        z: [0, 50],
        j: [-40, -40],
        k: [0, -40],
        l: [40, -40],
        m: [-40, 40],
        n: [0, 40],
        o: [40, 40],
        p: [-32.5, 0],
        q: [32.5, 0],
        A: [-66.2, -60],
        B: [-22, -77],
        C: [22, -86],
        D: [60, -66.6],
        K: [-28, -20],
        E: [57, -20],
        J: [-61, 26],
        F: [61, 26],
        I: [-49, 63],
        G: [49, 59],
        H: [0, 80]
      },
      targe2: {
        a: [-43.75, -50],
        b: [0, -50],
        c: [43.75, -50],
        d: [-40, 0],
        e: [0, 0],
        f: [40, 0],
        g: [-43.75, 50],
        h: [0, 50],
        i: [43.75, 50],
        y: [-50, -50],
        z: [0, 60],
        j: [-37.5, -37.5],
        k: [0, -37.5],
        l: [37.5, -37.5],
        m: [-37.5, 37.5],
        n: [0, 37.5],
        o: [37.5, 37.5],
        p: [-32.5, 0],
        q: [32.5, 0],
        A: [-55, -59],
        B: [-15, -59],
        C: [24, -79],
        D: [51, -58],
        K: [-40, -14],
        E: [51, -14],
        J: [-64, 26],
        F: [62, 26],
        I: [-46, 66],
        G: [48, 67],
        H: [0, 83]
      },
      pavise: {
        a: [-40, -52.5],
        b: [0, -52.5],
        c: [40, -52.5],
        d: [-40, 0],
        e: [0, 0],
        f: [40, 0],
        g: [-40, 52.5],
        h: [0, 52.5],
        i: [40, 52.5],
        y: [-42.5, -52.5],
        z: [0, 60],
        j: [-30, -35],
        k: [0, -37.5],
        l: [30, -35],
        m: [-30, 35],
        n: [0, 37.5],
        o: [30, 35],
        p: [-30, 0],
        q: [30, 0],
        A: [-57, -55],
        B: [-22, -74],
        C: [22, -74],
        D: [57, -55],
        K: [-54, -11],
        E: [54, -11],
        J: [-50, 36],
        F: [50, 36],
        I: [-46, 81],
        G: [46, 81],
        H: [0, 81]
      },
      wedged: {
        a: [-43.75, -50],
        b: [0, -50],
        c: [43.75, -50],
        d: [-43.75, 0],
        e: [0, 0],
        f: [43.75, 0],
        g: [-32.25, 37.5],
        h: [0, 50],
        i: [32.25, 37.5],
        y: [-50, -50],
        z: [0, 62.5],
        j: [-37.5, -37.5],
        k: [0, -37.5],
        l: [37.5, -37.5],
        m: [-32.5, 32.5],
        n: [0, 42.5],
        o: [32.5, 32.5],
        p: [-37.5, 0],
        q: [37.5, 0],
        A: [-66, -53],
        B: [-22, -72.5],
        C: [22, -72.5],
        D: [66, -53],
        K: [-62.6, -13],
        E: [62.6, -13],
        J: [-50, 26],
        F: [50, 26],
        I: [-27, 62],
        G: [27, 62],
        H: [0, 87]
      },
      flag: {
        a: [-60, -40],
        b: [0, -40],
        c: [60, -40],
        d: [-60, 0],
        e: [0, 0],
        f: [60, 0],
        g: [-60, 40],
        h: [0, 40],
        i: [60, 40],
        y: [-60, -42.5],
        z: [0, 40],
        j: [-45, -30],
        k: [0, -30],
        l: [45, -30],
        m: [-45, 30],
        n: [0, 30],
        o: [45, 30],
        p: [-45, 0],
        q: [45, 0],
        A: [-81, -51],
        B: [-27, -51],
        C: [27, -51],
        D: [81, -51],
        K: [-81, -17],
        E: [81, -17],
        J: [-81, 17],
        F: [81, 17],
        I: [-81, 51],
        G: [81, 51],
        H: [-27, 51],
        L: [27, 51]
      },
      pennon: {
        a: [-75, -40],
        d: [-75, 0],
        e: [-25, 0],
        f: [25, 0],
        g: [-75, 40],
        y: [-70, -42.5],
        j: [-60, -30],
        m: [-60, 30],
        p: [-60, 0],
        q: [5, 0],
        A: [-81, -48],
        B: [-43, -36],
        C: [-4.5, -24],
        D: [33, -12],
        E: [72, 0],
        F: [33, 12],
        G: [-4.5, 24],
        H: [-43, 36],
        I: [-81, 48],
        J: [-81, 17],
        K: [-81, -17]
      },
      guidon: {
        a: [-60, -40],
        b: [0, -40],
        c: [60, -40],
        d: [-60, 0],
        e: [0, 0],
        g: [-60, 40],
        h: [0, 40],
        i: [60, 40],
        y: [-60, -42.5],
        z: [0, 40],
        j: [-45, -30],
        k: [0, -30],
        l: [45, -30],
        m: [-45, 30],
        n: [0, 30],
        o: [45, 30],
        p: [-45, 0],
        A: [-81, -51],
        B: [-27, -51],
        C: [27, -51],
        D: [78, -51],
        K: [-81, -17],
        E: [40.5, -17],
        J: [-81, 17],
        F: [40.5, 17],
        I: [-81, 51],
        G: [78, 51],
        H: [-27, 51],
        L: [27, 51]
      },
      banner: {
        a: [-50, -50],
        b: [0, -50],
        c: [50, -50],
        d: [-50, 0],
        e: [0, 0],
        f: [50, 0],
        g: [-50, 40],
        h: [0, 40],
        i: [50, 40],
        y: [-50, -50],
        z: [0, 40],
        j: [-37.5, -37.5],
        k: [0, -37.5],
        l: [37.5, -37.5],
        m: [-37.5, 27.5],
        n: [0, 27.5],
        o: [37.5, 27.5],
        p: [-37.5, 0],
        q: [37.5, 0],
        A: [-66.5, -66.5],
        B: [-22, -66.5],
        C: [22, -66.5],
        D: [66.5, -66.5],
        K: [-66.5, -20],
        E: [66.5, -20],
        J: [-66.5, 26],
        F: [66.5, 26],
        I: [-66.5, 66.5],
        G: [66.5, 66.5],
        H: [-25, 75],
        L: [25, 75]
      },
      dovetail: {
        a: [-49.75, -50],
        b: [0, -50],
        c: [49.75, -50],
        d: [-49.75, 0],
        e: [0, 0],
        f: [49.75, 0],
        g: [-49.75, 50],
        i: [49.75, 50],
        y: [-50, -50],
        z: [0, 40],
        j: [-37.5, -37.5],
        k: [0, -37.5],
        l: [37.5, -37.5],
        m: [-37.5, 37.5],
        n: [0, 32.5],
        o: [37.5, 37.5],
        p: [-37.5, 0],
        q: [37.5, 0],
        A: [-66.5, -66.5],
        B: [-22, -66.5],
        C: [22, -66.5],
        D: [66.5, -66.5],
        K: [-66.5, -16.5],
        E: [66.5, -16.5],
        J: [-66.5, 34.5],
        F: [66.5, 34.5],
        I: [-66.5, 84.5],
        G: [66.5, 84.5],
        H: [-25, 64],
        L: [25, 64]
      },
      gonfalon: {
        a: [-49.75, -50],
        b: [0, -50],
        c: [49.75, -50],
        d: [-49.75, 0],
        e: [0, 0],
        f: [49.75, 0],
        g: [-49.75, 50],
        h: [0, 50],
        i: [49.75, 50],
        y: [-50, -50],
        z: [0, 50],
        j: [-37.5, -37.5],
        k: [0, -37.5],
        l: [37.5, -37.5],
        m: [-37.5, 37.5],
        n: [0, 37.5],
        o: [37.5, 37.5],
        p: [-37.5, 0],
        q: [37.5, 0],
        A: [-66.5, -66.5],
        B: [-22, -66.5],
        C: [22, -66.5],
        D: [66.5, -66.5],
        K: [-66.5, -20],
        E: [66.5, -20],
        J: [-66.5, 26],
        F: [66.5, 26],
        I: [-40, 63],
        G: [40, 63],
        H: [0, 88]
      },
      pennant: {
        a: [-45, -50],
        b: [0, -50],
        c: [45, -50],
        e: [0, 0],
        h: [0, 50],
        y: [-50, -50],
        z: [0, 50],
        j: [-32.5, -37.5],
        k: [0, -37.5],
        l: [32.5, -37.5],
        n: [0, 37.5],
        A: [-60, -76],
        B: [-22, -76],
        C: [22, -76],
        D: [60, -76],
        K: [-46, -38],
        E: [46, -38],
        J: [-31, 0],
        F: [31, 0],
        I: [-16, 38],
        G: [16, 38],
        H: [0, 76]
      },
      round: {
        a: [-40, -40],
        b: [0, -40],
        c: [40, -40],
        d: [-40, 0],
        e: [0, 0],
        f: [40, 0],
        g: [-40, 40],
        h: [0, 40],
        i: [40, 40],
        y: [-48, -48],
        z: [0, 57.5],
        j: [-35.5, -35.5],
        k: [0, -37.5],
        l: [35.5, -35.5],
        m: [-35.5, 35.5],
        n: [0, 37.5],
        o: [35.5, 35.5],
        p: [-36.5, 0],
        q: [36.5, 0],
        A: [-59, -48],
        B: [-23, -73],
        C: [23, -73],
        D: [59, -48],
        K: [-76, -10],
        E: [76, -10],
        J: [-70, 31],
        F: [70, 31],
        I: [-42, 64],
        G: [42, 64],
        H: [0, 77]
      },
      oval: {
        a: [-37.5, -50],
        b: [0, -50],
        c: [37.5, -50],
        d: [-43, 0],
        e: [0, 0],
        f: [43, 0],
        g: [-37.5, 50],
        h: [0, 50],
        i: [37.5, 50],
        y: [-48, -48],
        z: [0, 60],
        j: [-35.5, -37.5],
        k: [0, -37.5],
        l: [35.5, -37.5],
        m: [-35.5, 37.5],
        n: [0, 50],
        o: [35.5, 37.5],
        p: [-36.5, 0],
        q: [36.5, 0],
        A: [-48, -48],
        B: [-23, -78],
        C: [23, -78],
        D: [48, -48],
        K: [-59, -10],
        E: [59, -10],
        J: [-55, 31],
        F: [55, 31],
        I: [-36, 68],
        G: [36, 68],
        H: [0, 85]
      },
      vesicaPiscis: {
        a: [-32, -37],
        b: [0, -50],
        c: [32, -37],
        d: [-32, 0],
        e: [0, 0],
        f: [32, 0],
        g: [-32, 37],
        h: [0, 50],
        i: [32, 37],
        y: [-50, -50],
        z: [0, 62],
        j: [-27.5, -27.5],
        k: [0, -37],
        l: [27.5, -27.5],
        m: [-27.5, 27.5],
        n: [0, 42],
        o: [27.5, 27.5],
        p: [-27.5, 0],
        q: [27.5, 0],
        A: [-45, -32],
        B: [-29, -63],
        C: [29, -63],
        D: [45, -32],
        K: [-50, 0],
        E: [50, 0],
        J: [-45, 32],
        F: [45, 32],
        I: [-29, 63],
        G: [29, 63],
        H: [0, 89],
        L: [0, -89]
      },
      square: {
        a: [-49.75, -50],
        b: [0, -50],
        c: [49.75, -50],
        d: [-49.75, 0],
        e: [0, 0],
        f: [49.75, 0],
        g: [-49.75, 50],
        h: [0, 50],
        i: [49.75, 50],
        y: [-50, -50],
        z: [0, 50],
        j: [-37.5, -37.5],
        k: [0, -37.5],
        l: [37.5, -37.5],
        m: [-37.5, 37.5],
        n: [0, 37.5],
        o: [37.5, 37.5],
        p: [-37.5, 0],
        q: [37.5, 0],
        A: [-66.5, -66.5],
        B: [-22, -66.5],
        C: [22, -66.5],
        D: [66.5, -66.5],
        K: [-66.5, -20],
        E: [66.5, -20],
        J: [-66.5, 26],
        F: [66.5, 26],
        I: [-66.5, 66.5],
        G: [66.5, 66.5],
        H: [-22, 66.5],
        L: [22, 66.5]
      },
      diamond: {
        a: [-32, -37],
        b: [0, -50],
        c: [32, -37],
        d: [-43, 0],
        e: [0, 0],
        f: [43, 0],
        g: [-32, 37],
        h: [0, 50],
        i: [32, 37],
        y: [-50, -50],
        z: [0, 62],
        j: [-27.5, -27.5],
        k: [0, -37],
        l: [27.5, -27.5],
        m: [-27.5, 27.5],
        n: [0, 42],
        o: [27.5, 27.5],
        p: [-37, 0],
        q: [37, 0],
        A: [-43, -28],
        B: [-22, -56],
        C: [22, -56],
        D: [43, -28],
        K: [-63, 0],
        E: [63, 0],
        J: [-42, 28],
        F: [42, 28],
        I: [-22, 56],
        G: [22, 56],
        H: [0, 83],
        L: [0, -82]
      },
      no: {
        a: [-66.5, -66.5],
        b: [0, -66.5],
        c: [66.5, -66.5],
        d: [-66.5, 0],
        e: [0, 0],
        f: [66.5, 0],
        g: [-66.5, 66.5],
        h: [0, 66.5],
        i: [66.5, 66.5],
        y: [-50, -50],
        z: [0, 75],
        j: [-50, -50],
        k: [0, -50],
        l: [50, -50],
        m: [-50, 50],
        n: [0, 50],
        o: [50, 50],
        p: [-50, 0],
        q: [50, 0],
        A: [-91.5, -91.5],
        B: [-30.5, -91.5],
        C: [30.5, -91.5],
        D: [91.5, -91.5],
        K: [-91.5, -30.5],
        E: [91.5, -30.5],
        J: [-91.5, 30.5],
        F: [91.5, 30.5],
        I: [-91.5, 91.5],
        G: [91.5, 91.5],
        H: [-30.5, 91.5],
        L: [30.5, 91.5]
      },
      fantasy1: {
        a: [-45, -45],
        b: [0, -50],
        c: [45, -45],
        d: [-40, 0],
        e: [0, 0],
        f: [40, 0],
        g: [-36, 42.5],
        h: [0, 50],
        i: [36, 42.5],
        y: [-50, -50],
        z: [0, 60],
        j: [-37, -37],
        k: [0, -40],
        l: [37, -37],
        m: [-32, 32],
        n: [0, 40],
        o: [32, 32],
        p: [-28.5, 0],
        q: [28.5, 0],
        A: [-66, -55],
        B: [-22, -67],
        C: [22, -67],
        D: [66, -55],
        K: [-53, -20],
        E: [53, -20],
        J: [-46, 26],
        F: [46, 26],
        I: [-29, 62],
        G: [29, 62],
        H: [0, 84]
      },
      fantasy2: {
        a: [-45, -45],
        b: [0, -45],
        c: [45, -45],
        d: [-35, 0],
        e: [0, 0],
        f: [35, 0],
        g: [-36, 42.5],
        h: [0, 45],
        i: [36, 42.5],
        y: [-50, -50],
        z: [0, 55],
        j: [-32.5, -32.5],
        k: [0, -40],
        l: [32.5, -32.5],
        m: [-30, 30],
        n: [0, 40],
        o: [30, 30],
        p: [-27.5, 0],
        q: [27.5, 0],
        A: [-58, -35],
        B: [-44, -67],
        C: [44, -67],
        D: [58, -35],
        K: [-39, -5],
        E: [39, -5],
        J: [-57, 26],
        F: [57, 26],
        I: [-32, 58],
        G: [32, 58],
        H: [0, 83],
        L: [0, -72]
      },
      fantasy3: {
        a: [-40, -45],
        b: [0, -50],
        c: [40, -45],
        d: [-35, 0],
        e: [0, 0],
        f: [35, 0],
        g: [-36, 42.5],
        h: [0, 50],
        i: [36, 42.5],
        y: [-50, -50],
        z: [0, 55],
        j: [-32.5, -32.5],
        k: [0, -40],
        l: [32.5, -32.5],
        m: [-30, 30],
        n: [0, 40],
        o: [30, 30],
        p: [-27.5, 0],
        q: [27.5, 0],
        A: [-56, -42],
        B: [-22, -72],
        C: [22, -72],
        D: [56, -42],
        K: [-37, -11],
        E: [37, -11],
        J: [-60, 20],
        F: [60, 20],
        I: [-34, 56],
        G: [34, 56],
        H: [0, 83]
      },
      fantasy4: {
        a: [-50, -45],
        b: [0, -50],
        c: [50, -45],
        d: [-45, 0],
        e: [0, 0],
        f: [45, 0],
        g: [-40, 45],
        h: [0, 50],
        i: [40, 45],
        y: [-50, -50],
        z: [0, 62.5],
        j: [-37.5, -37.5],
        k: [0, -45],
        l: [37.5, -37.5],
        m: [-37.5, 37.5],
        n: [0, 45],
        o: [37.5, 37.5],
        p: [-35, 0],
        q: [35, 0],
        A: [-75, -56],
        B: [-36, -61],
        C: [36, -61],
        D: [75, -56],
        K: [-67, -12],
        E: [67, -12],
        J: [-63, 32],
        F: [63, 32],
        I: [-42, 75],
        G: [42, 75],
        H: [0, 91.5],
        L: [0, -79]
      },
      fantasy5: {
        a: [-45, -50],
        b: [0, -50],
        c: [45, -50],
        d: [-40, 0],
        e: [0, 0],
        f: [40, 0],
        g: [-30, 45],
        h: [0, 50],
        i: [30, 45],
        y: [-50, -50],
        z: [0, 60],
        j: [-37, -37],
        k: [0, -40],
        l: [37, -37],
        m: [-32, 32],
        n: [0, 40],
        o: [32, 32],
        p: [-28.5, 0],
        q: [28.5, 0],
        A: [-61, -67],
        B: [-22, -76],
        C: [22, -76],
        D: [61, -67],
        K: [-58, -25],
        E: [58, -25],
        J: [-48, 20],
        F: [48, 20],
        I: [-28.5, 60],
        G: [28.5, 60],
        H: [0, 89]
      },
      noldor: {
        b: [0, -65],
        e: [0, -15],
        h: [0, 35],
        z: [0, 35],
        k: [0, -50],
        n: [0, 30],
        p: [-20, -15],
        q: [20, -15],
        A: [-34, -47],
        B: [-20, -68],
        C: [20, -68],
        D: [34, -47],
        K: [-18, -20],
        E: [18, -20],
        J: [-26, 11],
        F: [26, 11],
        I: [-14, 43],
        G: [14, 43],
        H: [0, 74],
        L: [0, -85]
      },
      gondor: {
        a: [-32.5, -50],
        b: [0, -50],
        c: [32.5, -50],
        d: [-32.5, 0],
        e: [0, 0],
        f: [32.5, 0],
        g: [-32.5, 50],
        h: [0, 50],
        i: [32.5, 50],
        y: [-42.5, -52.5],
        z: [0, 65],
        j: [-25, -37.5],
        k: [0, -37.5],
        l: [25, -37.5],
        m: [-25, 30],
        n: [0, 37.5],
        o: [25, 30],
        p: [-25, 0],
        q: [25, 0],
        A: [-42, -52],
        B: [-17, -75],
        C: [17, -75],
        D: [42, -52],
        K: [-42, -15],
        E: [42, -15],
        J: [-42, 22],
        F: [42, 22],
        I: [-26, 60],
        G: [26, 60],
        H: [0, 87]
      },
      easterling: {
        a: [-40, -47.5],
        b: [0, -47.5],
        c: [40, -47.5],
        d: [-40, 0],
        e: [0, 0],
        f: [40, 0],
        g: [-40, 47.5],
        h: [0, 47.5],
        i: [40, 47.5],
        y: [-42.5, -52.5],
        z: [0, 65],
        j: [-30, -37.5],
        k: [0, -37.5],
        l: [30, -37.5],
        m: [-30, 37.5],
        n: [0, 37.5],
        o: [30, 37.5],
        p: [-30, 0],
        q: [30, 0],
        A: [-52, -72],
        B: [0, -65],
        D: [52, -72],
        K: [-52, -24],
        E: [52, -24],
        J: [-52, 24],
        F: [52, 24],
        I: [-52, 72],
        G: [52, 72],
        H: [0, 65]
      },
      erebor: {
        a: [-40, -40],
        b: [0, -55],
        c: [40, -40],
        d: [-40, 0],
        e: [0, 0],
        f: [40, 0],
        g: [-40, 40],
        h: [0, 55],
        i: [40, 40],
        y: [-50, -50],
        z: [0, 50],
        j: [-35, -35],
        k: [0, -45],
        l: [35, -35],
        m: [-35, 35],
        n: [0, 45],
        o: [35, 35],
        p: [-37.5, 0],
        q: [37.5, 0],
        A: [-47, -46],
        B: [-22, -81],
        C: [22, -81],
        D: [47, -46],
        K: [-66.5, 0],
        E: [66.5, 0],
        J: [-47, 46],
        F: [47, 46],
        I: [-22, 81],
        G: [22, 81]
      },
      ironHills: {
        a: [-43.75, -50],
        b: [0, -50],
        c: [43.75, -50],
        d: [-43.25, 0],
        e: [0, 0],
        f: [43.25, 0],
        g: [-42.5, 42.5],
        h: [0, 50],
        i: [42.5, 42.5],
        y: [-50, -50],
        z: [0, 62.5],
        j: [-32.5, -32.5],
        k: [0, -40],
        l: [32.5, -32.5],
        m: [-32.5, 32.5],
        n: [0, 40],
        o: [32.5, 32.5],
        p: [-37.5, 0],
        q: [37.5, 0],
        A: [-61, -67],
        B: [-22, -74],
        C: [22, -74],
        D: [61, -67],
        K: [-59, -20],
        E: [59, -20],
        J: [-57, 26],
        F: [57, 26],
        I: [-33, 64],
        G: [33, 64],
        H: [0, 88]
      },
      urukHai: {
        a: [-40, -45],
        b: [0, -45],
        c: [40, -45],
        d: [-36, 0],
        e: [0, 0],
        f: [36, 0],
        g: [-32.25, 40],
        h: [0, 40],
        i: [32.25, 40],
        y: [-50, -50],
        z: [0, 40],
        j: [-32.5, -32.5],
        k: [0, -37.5],
        l: [32.5, -32.5],
        m: [-27.5, 27.5],
        n: [0, 32.5],
        o: [27.5, 27.5],
        p: [-37.5, 0],
        q: [37.5, 0],
        A: [-31, -79],
        B: [-1, -90],
        C: [31, -74],
        D: [61, -57],
        K: [-55, -19],
        E: [53, -19],
        J: [-45, 19],
        F: [45, 19],
        I: [-33, 57],
        G: [35, 57],
        H: [0, 57],
        L: [-39, -50]
      },
      moriaOrc: {
        a: [-37.5, -37.5],
        b: [0, -37.5],
        c: [37.5, -37.5],
        d: [-37.5, 0],
        e: [0, 0],
        f: [37.5, 0],
        g: [-37.5, 37.5],
        h: [0, 37.5],
        i: [37.5, 37.5],
        y: [-50, -50],
        z: [0, 40],
        j: [-30, -30],
        k: [0, -30],
        l: [30, -30],
        m: [-30, 30],
        n: [0, 30],
        o: [30, 30],
        p: [-30, 0],
        q: [30, 0],
        A: [-48, -48],
        B: [-16, -50],
        C: [16, -46],
        D: [39, -61],
        K: [-52, -19],
        E: [52, -26],
        J: [-42, 9],
        F: [52, 9],
        I: [-31, 40],
        G: [40, 43],
        H: [4, 47]
      }
    };
  
    const shieldSize = {
      horsehead: 0.9,
      horsehead2: 0.9,
      polish: 0.85,
      swiss: 0.95,
      boeotian: 0.75,
      roman: 0.95,
      kite: 0.65,
      targe2: 0.9,
      pavise: 0.9,
      wedged: 0.95,
      flag: 0.7,
      pennon: 0.5,
      guidon: 0.65,
      banner: 0.8,
      dovetail: 0.8,
      pennant: 0.6,
      oval: 0.95,
      vesicaPiscis: 0.8,
      diamond: 0.8,
      no: 1.2,
      fantasy1: 0.8,
      fantasy2: 0.7,
      fantasy3: 0.7,
      fantasy5: 0.9,
      noldor: 0.5,
      gondor: 0.75,
      easterling: 0.8,
      erebor: 0.9,
      urukHai: 0.8,
      moriaOrc: 0.7
    };
  
    const shieldBox = {
      heater: "0 10 200 200",
      spanish: "0 10 200 200",
      french: "0 10 200 200",
  
      horsehead: "0 10 200 200",
      horsehead2: "0 10 200 200",
      polish: "0 0 200 200",
      hessen: "0 5 200 200",
      swiss: "0 10 200 200",
  
      boeotian: "0 0 200 200",
      roman: "0 0 200 200",
      kite: "0 0 200 200",
      oldFrench: "0 10 200 200",
      renaissance: "0 5 200 200",
      baroque: "0 10 200 200",
  
      targe: "0 0 200 200",
      targe2: "0 0 200 200",
      pavise: "0 0 200 200",
      wedged: "0 10 200 200",
  
      flag: "0 0 200 200",
      pennon: "2.5 0 200 200",
      guidon: "2.5 0 200 200",
      banner: "0 10 200 200",
      dovetail: "0 10 200 200",
      gonfalon: "0 10 200 200",
      pennant: "0 0 200 200",
  
      round: "0 0 200 200",
      oval: "0 0 200 200",
      vesicaPiscis: "0 0 200 200",
      square: "0 0 200 200",
      diamond: "0 0 200 200",
      no: "0 0 200 200",
  
      fantasy1: "0 0 200 200",
      fantasy2: "0 5 200 200",
      fantasy3: "0 5 200 200",
      fantasy4: "0 5 200 200",
      fantasy5: "0 0 200 200",
  
      noldor: "0 0 200 200",
      gondor: "0 5 200 200",
      easterling: "0 0 200 200",
      erebor: "0 0 200 200",
      ironHills: "0 5 200 200",
      urukHai: "0 0 200 200",
      moriaOrc: "0 0 200 200"
    };
  
    const shieldPaths = {
      heater: "m25,25 h150 v50 a150,150,0,0,1,-75,125 a150,150,0,0,1,-75,-125 z",
      spanish: "m25,25 h150 v100 a75,75,0,0,1,-150,0 z",
      french: "m 25,25 h 150 v 139.15 c 0,41.745 -66,18.15 -75,36.3 -9,-18.15 -75,5.445 -75,-36.3 v 0 z",
      horsehead: "m 20,40 c 0,60 40,80 40,100 0,10 -4,15 -0.35,30 C 65,185.7 81,200 100,200 c 19.1,0 35.3,-14.6 40.5,-30.4 C 144.2,155 140,150 140,140 140,120 180,100 180,40 142.72,40 150,15 100,15 55,15 55,40 20,40 Z",
      horsehead2: "M60 20c-5 20-10 35-35 55 25 35 35 65 30 100 20 0 35 10 45 26 10-16 30-26 45-26-5-35 5-65 30-100a87 87 0 01-35-55c-25 3-55 3-80 0z",
      polish: "m 90.3,6.3 c -12.7,0 -20.7,10.9 -40.5,14 0,11.8 -4.9,23.5 -11.4,31.1 0,0 12.7,6 12.7,19.3 C 51.1,90.8 30,90.8 30,90.8 c 0,0 -3.6,7.4 -3.6,22.4 0,34.3 23.1,60.2 40.7,68.2 17.6,8 27.7,11.4 32.9,18.6 5.2,-7.3 15.3,-10.7 32.8,-18.6 17.6,-8 40.7,-33.9 40.7,-68.2 0,-15 -3.6,-22.4 -3.6,-22.4 0,0 -21.1,0 -21.1,-20.1 0,-13.3 12.7,-19.3 12.7,-19.3 C 155.1,43.7 150.2,32.1 150.2,20.3 130.4,17.2 122.5,6.3 109.7,6.3 102.5,6.3 100,10 100,10 c 0,0 -2.5,-3.7 -9.7,-3.7 z",
      hessen: "M170 20c4 5 8 13 15 20 0 0-10 0-10 15 0 100-15 140-75 145-65-5-75-45-75-145 0-15-10-15-10-15l15-20c0 15 10-5 70-5s70 20 70 5z",
      swiss: "m 25,20 c -0.1,0 25.2,8.5 37.6,8.5 C 75.1,28.5 99.1,20 100,20 c 0.6,0 24.9,8.5 37.3,8.5 C 149.8,28.5 174.4,20 175,20 l -0.3,22.6 C 173.2,160.3 100,200 100,200 100,200 26.5,160.9 25.2,42.6 Z",
      boeotian: "M150 115c-5 0-10-5-10-15s5-15 10-15c10 0 7 10 15 10 10 0 0-30 0-30-10-25-30-55-65-55S45 40 35 65c0 0-10 30 0 30 8 0 5-10 15-10 5 0 10 5 10 15s-5 15-10 15c-10 0-7-10-15-10-10 0 0 30 0 30 10 25 30 55 65 55s55-30 65-55c0 0 10-30 0-30-8 0-5 10-15 10z",
      roman: "m 160,170 c -40,20 -80,20 -120,0 V 30 C 80,10 120,10 160,30 Z",
      kite: "m 53.3,46.4 c 0,4.1 1,12.3 1,12.3 7.1,55.7 45.7,141.3 45.7,141.3 0,0 38.6,-85.6 45.7,-141.2 0,0 1,-8.1 1,-12.3 C 146.7,20.9 125.8,0.1 100,0.1 74.2,0.1 53.3,20.9 53.3,46.4 Z",
      oldFrench: "m25,25 h150 v75 a100,100,0,0,1,-75,100 a100,100,0,0,1,-75,-100 z",
      renaissance: "M 25,33.9 C 33.4,50.3 36.2,72.9 36.2,81.7 36.2,109.9 25,122.6 25,141 c 0,29.4 24.9,44.1 40.2,47.7 15.3,3.7 29.3,0 34.8,11.3 5.5,-11.3 19.6,-7.6 34.8,-11.3 C 150.1,185 175,170.3 175,141 c 0,-18.4 -11.2,-31.1 -11.2,-59.3 0,-8.8 2.8,-31.3 11.2,-47.7 L 155.7,14.4 C 138.2,21.8 119.3,25.7 100,25.7 c -19.3,0 -38.2,-3.9 -55.7,-11.3 z",
      baroque: "m 100,25 c 18,0 50,2 75,14 v 37 l -2.7,3.2 c -4.9,5.4 -6.6,9.6 -6.7,16.2 0,6.5 2,11.6 6.9,17.2 l 2.8,3.1 v 10.2 c 0,17.7 -2.2,27.7 -7.8,35.9 -5,7.3 -11.7,11.3 -32.3,19.4 -12.6,5 -20.2,8.8 -28.6,14.5 C 103.3,198 100,200 100,200 c 0,0 -2.8,-2.3 -6.4,-4.7 C 85.6,189.8 78,186 65,180.9 32.4,168.1 26.9,160.9 25.8,129.3 L 25,116 l 3.3,-3.3 c 4.8,-5.2 7,-10.7 7,-17.3 0,-6.8 -1.8,-11.1 -6.5,-16.1 L 25,76 V 39 C 50,27 82,25 100,25 Z",
      targe: "m 20,35 c 15,0 115,-60 155,-10 -5,10 -15,15 -10,50 5,45 10,70 -10,90 C 125,195 75,195 50,175 25,150 30,130 35,85 50,95 65,85 65,70 65,50 50,45 40,50 30,55 27,65 30,70 23,73 20,70 14,70 11,60 20,45 20,35 Z",
      targe2: "m 84,32.2 c 6.2,-1 19.5,-31.4 94.1,-20.2 -30.57,33.64 -21.66,67.37 -11.2,95 20.2,69.5 -41.17549,84.7 -66.88,84.7 C 74.32,191.7071 8.38,168.95 32,105.9 36.88,92.88 31,89 31,82.6 35.15,82.262199 56.79,86.17 56.5,69.8 56.20,52.74 42.2,47.9 25.9,55.2 25.9,51.4 39.8,6.7 84,32.2 Z",
      pavise: "M95 7L39.9 37.3a10 10 0 00-5.1 9.5L46 180c.4 5.2 3.7 10 9 10h90c5.3 0 9.6-4.8 10-10l10.6-133.2a10 10 0 00-5-9.5L105 7c-4.2-2.3-6.2-2.3-10 0z",
      wedged: "m 51.2,19 h 96.4 c 3.1,12.7 10.7,20.9 26.5,20.8 C 175.7,94.5 165.3,144.3 100,200 43.5,154.2 22.8,102.8 25.1,39.7 37,38.9 47.1,34.7 51.2,19 Z",
      round: "m 185,100 a 85,85 0 0 1 -85,85 85,85 0 0 1 -85,-85 85,85 0 0 1 85,-85 85,85 0 0 1 85,85",
      oval: "m 32.3,99.5 a 67.7,93.7 0 1 1 0,1.3 z",
      vesicaPiscis: "M 100,0 C 63.9,20.4 41,58.5 41,100 c 0,41.5 22.9,79.6 59,100 36.1,-20.4 59,-58.5 59,-100 C 159,58.5 136.1,20.4 100,0 Z",
      square: "M 25,25 H 175 V 175 H 25 Z",
      diamond: "M 25,100 100,200 175,100 100,0 Z",
      no: "m0,0 h200 v200 h-200 z",
      flag: "M 10,40 h180 v120 h-180 Z",
      pennon: "M 10,40 l190,60 -190,60 Z",
      guidon: "M 10,40 h190 l-65,60 65,60 h-190 Z",
      banner: "m 25,25 v 170 l 25,-40 25,40 25,-40 25,40 25,-40 25,40 V 25 Z",
      dovetail: "m 25,25 v 175 l 75,-40 75,40 V 25 Z",
      gonfalon: "m 25,25 v 125 l 75,50 75,-50 V 25 Z",
      pennant: "M 25,15 100,200 175,15 Z",
      fantasy1: "M 100,5 C 85,30 40,35 15,40 c 40,35 20,90 40,115 15,25 40,30 45,45 5,-15 30,-20 45,-45 20,-25 0,-80 40,-115 C 160,35 115,30 100,5 Z",
      fantasy2: "m 152,21 c 0,0 -27,14 -52,-4 C 75,35 48,21 48,21 50,45 30,55 30,75 60,75 60,115 32,120 c 3,40 53,50 68,80 15,-30 65,-40 68,-80 -28,-5 -28,-45 2,-45 C 170,55 150,45 152,21 Z",
      fantasy3: "M 167,67 C 165,0 35,0 33,67 c 32,-7 27,53 -3,43 -5,45 60,65 70,90 10,-25 75,-47.51058 70,-90 -30,10 -35,-50 -3,-43 z",
      fantasy4: "M100 9C55 48 27 27 13 39c23 50 3 119 49 150 14 9 28 11 38 11s27-4 38-11c55-39 24-108 49-150-14-12-45 7-87-30z",
      fantasy5: "M 100,0 C 75,25 30,25 30,25 c 0,69 20,145 70,175 50,-30 71,-106 70,-175 0,0 -45,0 -70,-25 z",
      noldor: "m 55,75 h 2 c 3,-25 38,-10 3,20 15,50 30,75 40,105 10,-30 25,-55 40,-105 -35,-30 0,-45 3,-20 h 2 C 150,30 110,20 100,0 90,20 50,30 55,75 Z",
      gondor: "m 100,200 c 15,-15 38,-35 45,-60 h 5 V 30 h -5 C 133,10 67,10 55,30 h -5 v 110 h 5 c 7,25 30,45 45,60 z",
      easterling: "M 160,185 C 120,170 80,170 40,185 V 15 c 40,15 80,15 120,0 z",
      erebor: "M25 135 V60 l22-13 16-37 h75 l15 37 22 13 v75l-22 18-16 37 H63l-16-37z",
      ironHills: "m 30,25 60,-10 10,10 10,-10 60,10 -5,125 -65,50 -65,-50 z",
      urukHai: "M 30,60 C 40,60 60,50 60,20 l -5,-3 45,-17 75,40 -5,5 -35,155 -5,-35 H 70 v 35 z",
      moriaOrc: "M45 35c5 3 7 10 13 9h19c4-2 7-4 9-9 6 1 9 9 16 11 7-2 14 0 21 0 6-3 6-10 10-15 2-5 1-10-2-15-2-4-5-14-4-16 3 6 7 11 12 14 7 3 3 12 7 16 3 6 4 12 9 18 2 4 6 8 5 14 0 6-1 12 3 18-3 6-2 13-1 20 1 6-2 12-1 18 0 6-3 13 0 18 8 4 0 8-5 7-4 3-9 3-13 9-5 5-5 13-8 19 0 6 0 15-7 16-1 6-7 6-10 12-1-6 0-6-2-9l2-19c2-4 5-12-3-12-4-5-11-5-15 1l-13-18c-3-4-2 9-3 12 2 2-4-6-7-5-8-2-8 7-11 11-2 4-5 10-8 9 3-10 3-16 1-23-1-4 2-9-4-11 0-6 1-13-2-19-4-2-9-6-13-7V91c4-7-5-13 0-19-3-7 2-11 2-18-1-6 1-12 3-17v-1z"
    };
  
    const lines = {
      straight: "m 0,100 v15 h 200 v -15 z",
      engrailed: "m 0,95 a 6.25,6.25 0 0 0 12.5,0 6.25,6.25 0 0 0 12.5,0 6.25,6.25 0 0 0 12.5,0 6.25,6.25 0 0 0 12.5,0 6.25,6.25 0 0 0 12.5,0 6.25,6.25 0 0 0 12.5,0 6.25,6.25 0 0 0 12.5,0 6.25,6.25 0 0 0 12.5,0 6.25,6.25 0 0 0 12.5,0 6.25,6.25 0 0 0 12.5,0 6.25,6.25 0 0 0 12.5,0 6.25,6.25 0 0 0 12.5,0 6.25,6.25 0 0 0 12.5,0 6.25,6.25 0 0 0 12.5,0 6.25,6.25 0 0 0 12.5,0 6.25,6.25 0 0 0 12.5,0 v 20 H 0 Z",
      invecked: "M0,102.5 a6.25,6.25,0,0,1,12.5,0 a6.25,6.25,0,0,1,12.5,0 a6.25,6.25,0,0,1,12.5,0 a6.25,6.25,0,0,1,12.5,0 a6.25,6.25,0,0,1,12.5,0 a6.25,6.25,0,0,1,12.5,0 a6.25,6.25,0,0,1,12.5,0 a6.25,6.25,0,0,1,12.5,0 a6.25,6.25,0,0,1,12.5,0 a6.25,6.25,0,0,1,12.5,0 a6.25,6.25,0,0,1,12.5,0 a6.25,6.25,0,0,1,12.5,0 a6.25,6.25,0,0,1,12.5,0 a6.25,6.25,0,0,1,12.5,0 a6.25,6.25,0,0,1,12.5,0 a6.25,6.25,0,0,1,12.5,0 v12.5 H0 z",
      embattled: "M 0,105 H 2.5 V 95 h 15 v 10 h 15 V 95 h 15 v 10 h 15 V 95 h 15 v 10 h 15 V 95 h 15 v 10 h 15 V 95 h 15 v 10 h 15 V 95 h 15 v 10 h 15 V 95 h 15 v 10 h 2.5 v 10 H 0 Z",
      wavy: "m 200,115 v -15 c -8.9,3.5 -16,3.1 -25,0 -8.9,-3.5 -16,-3.1 -25,0 -8.9,3.5 -16,3.2 -25,0 -8.9,-3.5 -16,-3.2 -25,0 -8.9,3.5 -16,3.1 -25,0 -8.9,-3.5 -16,-3.1 -25,0 -8.9,3.5 -16,3.2 -25,0 -8.9,-3.5 -16,-3.2 -25,0 v 15 z",
      raguly: "m 200,95 h -3 l -5,10 h -10 l 5,-10 h -10 l -5,10 h -10 l 5,-10 h -10 l -5,10 h -10 l 5,-10 h -10 l -5,10 h -10 l 5,-10 h -10 l -5,10 h -10 l 5,-10 H 97 l -5,10 H 82 L 87,95 H 77 l -5,10 H 62 L 67,95 H 57 l -5,10 H 42 L 47,95 H 37 l -5,10 H 22 L 27,95 H 17 l -5,10 H 2 L 7,95 H 0 v 20 h 200 z",
      dancetty: "m 0,105 10,-15 15,20 15,-20 15,20 15,-20 15,20 15,-20 15,20 15,-20 15,20 15,-20 15,20 15,-20 10,15 v 10 H 0 Z",
      dentilly: "M 180,105 170,95 v 10 L 160,95 v 10 L 150,95 v 10 L 140,95 v 10 L 130,95 v 10 L 120,95 v 10 L 110,95 v 10 L 100,95 v 10 L 90,95 v 10 L 80,95 v 10 L 70,95 v 10 L 60,95 v 10 L 50,95 v 10 L 40,95 v 10 L 30,95 v 10 L 20,95 v 10 L 10,95 v 10 L 0,95 v 20 H 200 V 105 L 190,95 v 10 L 180,95 Z",
      angled: "m 0,95 h 100 v 10 h 100 v 10 H 0 Z",
      urdy: "m 200,90 -5,5 v 10 l -5,5 -5,-5 V 95 l -5,-5 -5,5 v 10 l -5,5 -5,-5 V 95 l -5,-5 -5,5 v 10 l -5,5 -5,-5 V 95 l -5,-5 -5,5 v 10 l -5,6 -5,-6 V 95 l -5,-5 -5,5 v 10 l -5,5 -5,-5 V 95 l -5,-5 -5,5 v 10 l -5,5 -5,-5 V 95 l -5,-5 -5,5 v 10 l -5,6 -5,-6 V 95 l -5,-5 -5,5 v 10 l -5,5 -5,-5 V 95 l -5,-5 -5,5 v 10 l -5,5 -5,-5 V 95 l -5,-5 -5,5 v 10 l -5,5 -5,-5 V 95 L 0,90 v 25 h 200",
      indented: "m 100,95 5,10 5,-10 5,10 5,-10 5,10 5,-10 5,10 5,-10 5,10 5,-10 5,10 5,-10 5,10 5,-10 5,10 5,-10 5,10 5,-10 5,10 5,-10 v 20 H 0 V 95 l 5,10 5,-10 5,10 5,-10 5,10 5,-10 5,10 5,-10 5,10 5,-10 5,10 5,-10 5,10 5,-10 5,10 5,-10 5,10 5,-10 5,10 z",
      bevilled: "m 0,92.5 h 110 l -20,15 H 200 V 115 H 0 Z",
      nowy: "m 0,95 h 80 c 0,0 0.1,20.1 20,20 19.9,-0.1 20,-20 20,-20 h 80 v 20 H 0 Z",
      nowyReversed: "m 200,105 h -80 c 0,0 -0.1,-20.1 -20,-20 -19.9,0.1 -20,20 -20,20 H 0 v 10 h 200 z",
      potenty: "m 3,95 v 5 h 5 v 5 H 0 v 10 h 200 l 0.5,-10 H 193 v -5 h 5 v -5 h -15 v 5 h 5 v 5 h -15 v -5 h 5 v -5 h -15 v 5 h 5 v 5 h -15 v -5 h 5 v -5 h -15 v 5 h 5 v 5 h -15 v -5 h 5 v -5 h -15 v 5 h 5 v 5 h -15 v -5 h 5 v -5 h -15 v 5 h 5 v 5 H 100.5 93 v -5 h 5 V 95 H 83 v 5 h 5 v 5 H 73 v -5 h 5 V 95 H 63 v 5 h 5 v 5 H 53 v -5 h 5 V 95 H 43 v 5 h 5 v 5 H 33 v -5 h 5 V 95 H 23 v 5 h 5 v 5 H 13 v -5 h 5 v -5 z",
      potentyDexter: "m 200,105 h -2 v -10 0 0 h -10 v 5 h 5 v 5 H 183 V 95 h -10 v 5 h 5 v 5 H 168 V 95 h -10 v 5 h 5 v 5 H 153 V 95 h -10 v 5 h 5 v 5 H 138 V 95 h -10 v 5 h 5 v 5 H 123 V 95 h -10 v 5 h 5 v 5 h -10 v 0 0 -10 H 98 v 5 h 5 v 5 H 93 V 95 H 83 v 5 h 5 v 5 H 78 V 95 H 68 v 5 h 5 v 5 H 63 V 95 H 53 v 5 h 5 v 5 H 48 V 95 H 38 v 5 h 5 v 5 H 33 V 95 H 23 v 5 h 5 v 5 H 18 V 95 H 8 v 5 h 5 v 5 H 3 V 95 H 0 v 20 h 200 z",
      potentySinister: "m 2.5,95 v 10 H 0 v 10 h 202.5 v -15 h 5 v -5 h -10 v 10 h -10 v -5 h 5 v -5 h -10 v 10 h -10 v -5 h 5 v -5 h -10 v 10 h -10 v -5 h 5 v -5 h -10 v 10 h -10 v -5 h 5 v -5 h -10 v 10 h -10 v -5 h 5 v -5 h -10 v 10 h -10 v -5 h 5 v -5 h -10 v 10 h -10 v -5 h 5 v -5 h -10 v 10 h -10 v -5 h 5 v -5 h -10 v 10 h -10 v -5 h 5 v -5 h -10 v 10 h -10 v -5 h 5 v -5 h -10 v 10 h -10 v -5 h 5 v -5 h -10 v 10 h -10 v -5 h 5 v -5 h -10 v 10 h -10 v -5 h 5 v -5 z",
      embattledGhibellin: "M 200,200 V 100 l -5,-5 v 10 l -5,-5 -5,5 V 95 l -5,5 -5,-5 v 10 l -5,-5 -5,5 V 95 l -5,5 -5,-5 v 10 l -5,-5 -5,5 V 95 l -5,5 -5,-5 v 10 l -5,-5 -5,5 V 95 l -5,5 -5,-5 v 10 l -5,-5 -5,5 V 95 l -5,5 -5,-5 v 10 l -5,-5 -5,5 V 95 l -5,5 -5,-5 v 10 l -5,-5 -5,5 V 95 l -5,5 -5,-5 v 10 l -5,-5 -5,5 V 95 l -5,5 -5,-5 v 10 l -5,-5 -5,5 V 95 l -5,5 -5,-5 v 10 l -5,-5 -5,5 V 95 l -5,5 v 15 h 200",
      embattledNotched: "m 200,105 h -5 V 95 l -5,5 -5,-5 v 10 h -5 V 95 l -5,5 -5,-5 v 10 h -5 V 95 l -5,5 -5,-5 v 10 h -5 V 95 l -5,5 -5,-5 v 10 h -5 V 95 l -5,5 -5,-5 v 10 h -5 V 95 l -5,5 -5,-5 v 10 h -5 V 95 l -5,5 -5,-5 v 10 H 90 V 95 l -5,5 -5,-5 v 10 H 75 V 95 l -5,5 -5,-5 v 10 H 60 V 95 l -5,5 -5,-5 v 10 H 45 V 95 l -5,5 -5,-5 v 10 H 30 V 95 l -5,5 -5,-5 v 10 H 15 V 95 l -5,5 -5,-5 v 10 H 0 v 10 h 200",
      embattledGrady: "m 0,95 v 20 H 200 V 95 h -2.5 v 5 h -5 v 5 h -5 v -5 h -5 v -5 h -5 v 5 h -5 v 5 h -5 v -5 h -5 v -5 h -5 v 5 h -5 v 5 h -5 v -5 h -5 v -5 h -5 v 5 h -5 v 5 h -5 v -5 h -5 v -5 h -5 v 5 h -5 v 5 h -5 v -5 h -5 v -5 h -5 v 5 h -5 v 5 h -5 v -5 h -5 v -5 h -5 v 5 h -5 v 5 h -5 v -5 h -5 v -5 h -5 v 5 h -5 v 5 h -5 v -5 h -5 v -5 h -5 v 5 h -5 v 5 h -5 v -5 h -5 v -5 h -5 v 5 h -5 v 5 h -5 v -5 h -5 v -5 z",
      dovetailed: "m 200,95 h -7 l 4,10 h -14 l 4,-10 h -14 l 4,10 h -14 l 4,-10 h -14 l 4,10 h -14 l 4,-10 h -14 l 4,10 h -14 l 4,-10 h -14 l 4,10 h -14 l 4,-10 H 93 l 4,10 H 83 L 87,95 H 73 l 4,10 H 63 L 67,95 H 53 l 4,10 H 43 L 47,95 H 33 l 4,10 H 23 L 27,95 H 13 l 4,10 H 3 L 7,95 H 0 v 20 h 200",
      dovetailedIndented: "m 200,100 -7,-5 4,10 -7,-5 -7,5 4,-10 -7,5 -7,-5 4,10 -7,-5 -7,5 4,-10 -7,5 -7,-5 4,10 -7,-5 -7,5 4,-10 -7,5 -7,-5 4,10 -7,-5 -7,5 4,-10 -7,5 -7,-5 4,10 -7,-5 -7,5 4,-10 -7,5 -7,-5 4,10 -7,-5 -7,5 4,-10 -7,5 -7,-5 4,10 -7,-5 -7,5 4,-10 -7,5 -7,-5 4,10 -7,-5 -7,5 4,-10 -7,5 -7,-5 4,10 -7,-5 -7,5 4,-10 -7,5 -7,-5 4,10 -7,-5 -7,5 4,-10 -7,5 v 15 h 200",
      nebuly:
        "m 13.1,89.8 c -4.1,0 -7.3,2 -7.3,4.5 0,1.2 0.7,2.3 1.8,3.1 1.2,0.7 1.9,1.8 1.9,3 0,2.5 -3.2,4.5 -7.3,4.5 -0.5,0 -2.2,-0.2 -2.2,-0.2 V 115 h 200 v -10.1 c -3.7,-0.2 -6.7,-2.2 -6.7,-4.5 0,-1.2 0.7,-2.3 1.9,-3 1.2,-0.8 1.8,-1.9 1.8,-3.1 0,-2.5 -3.2,-4.5 -7.2,-4.5 -4.1,0 -7.3,2 -7.3,4.5 0,1.2 0.7,2.3 1.8,3.1 1.2,0.7 1.9,1.8 1.9,3 0,2.5 -3.3,4.5 -7.3,4.5 -4,0 -7.3,-2 -7.3,-4.5 0,-1.2 0.7,-2.3 1.9,-3 1.2,-0.8 1.8,-1.9 1.8,-3.1 0,-2.5 -3.2,-4.5 -7.2,-4.5 -4.1,0 -7.3,2 -7.3,4.5 0,1.2 0.7,2.3 1.8,3.1 1.2,0.7 1.9,1.8 1.9,3 -1.5,4.1 -4.2,4.4 -8.8,4.5 -4.7,-0.1 -8.7,-1.5 -8.9,-4.5 0,-1.2 0.7,-2.3 1.9,-3 1.2,-0.8 1.9,-1.9 1.9,-3.1 0,-2.5 -3.3,-4.5 -7.3,-4.5 -4.1,0 -7.3,2 -7.3,4.5 0,1.2 0.7,2.3 1.8,3.1 1.2,0.7 1.9,1.8 1.9,3 0,2.5 -3.3,4.5 -7.3,4.5 -4,0 -7.3,-2 -7.3,-4.5 0,-1.2 0.7,-2.3 1.9,-3 1.2,-0.8 1.9,-1.9 1.9,-3.1 0,-2.5 -3.3,-4.5 -7.3,-4.5 -4.1,0 -7.3,2 -7.3,4.5 0,1.2 0.7,2.3 1.8,3.1 1.2,0.7 1.9,1.8 1.9,3 0,2.5 -3.3,4.5 -7.3,4.5 -4,0 -7.3,-2 -7.3,-4.5 0,-1.2 0.7,-2.3 1.9,-3 1.2,-0.8 1.9,-1.9 1.9,-3.1 0,-2.5 -3.3,-4.5 -7.3,-4.5 -4.1,0 -7.3,2 -7.3,4.5 0,1.2 0.7,2.3 1.8,3.1 1.2,0.7 1.9,1.8 1.9,3 0,2.5 -3.3,4.5 -7.3,4.5 -4,0 -7.3,-2 -7.3,-4.5 0,-1.2 0.7,-2.3 1.9,-3 1.2,-0.8 1.9,-1.9 1.9,-3.1 0,-2.5 -3.3,-4.5 -7.3,-4.5 -4.1,0 -7.3,2 -7.3,4.5 0,1.2 0.7,2.3 1.8,3.1 1.2,0.7 1.9,1.8 1.9,3 0,2.5 -3.3,4.5 -7.3,4.5 -4,0 -7.3,-2 -7.3,-4.5 0,-1.2 0.7,-2.3 1.9,-3 1.2,-0.8 1.9,-1.9 1.9,-3.1 0,-2.5 -3.3,-4.5 -7.3,-4.5 -4.1,0 -7.3,2 -7.3,4.5 0,1.2 0.7,2.3 1.8,3.1 1.2,0.7 1.9,1.8 1.9,3 0,2.5 -3.3,4.5 -7.3,4.5 -4,0 -7.3,-2 -7.3,-4.5 0,-1.2 0.7,-2.3 1.9,-3 1.2,-0.8 1.9,-1.9 1.9,-3.1 0,-2.5 -3.3,-4.5 -7.3,-4.5 -4.1,0 -7.3,2 -7.3,4.5 0,1.2 0.7,2.3 1.8,3.1 1.2,0.7 1.9,1.8 1.9,3 0,2.5 -3.3,4.5 -7.3,4.5 -4,0 -7.3,-2 -7.3,-4.5 0,-1.2 0.7,-2.3 1.9,-3 1.2,-0.8 1.9,-1.9 1.9,-3.1 0,-2.5 -3.3,-4.5 -7.3,-4.5 z",
      rayonne:
        "M0 115l-.1-6 .2.8c1.3-1 2.3-2.5 2.9-4.4.5-2 .4-3.9-.3-5.4-.7-1.5-.8-3.4-.3-5.4A9 9 0 015.5 90c-.7 1.5-.8 3.4-.3 5.4.5 2 1.7 3.6 3.1 4.6a9 9 0 013.1 4.6c.5 2 .4 3.9-.3 5.4a9 9 0 003.1-4.6c.5-2 .4-3.9-.3-5.4-.7-1.5-.8-3.4-.3-5.4.5-2 1.7-3.6 3.1-4.6-.7 1.5-.8 3.4-.3 5.4.5 2 1.7 3.6 3.1 4.6a9 9 0 013.1 4.6c.5 2 .4 3.9-.3 5.4a9 9 0 003.1-4.6c.5-2 .4-3.9-.3-5.4-.7-1.5-.8-3.4-.3-5.4.5-2 1.7-3.6 3.1-4.6-.7 1.5-.8 3.4-.3 5.4.5 2 1.7 3.6 3.1 4.6a9 9 0 013.1 4.6c.5 2 .4 3.9-.3 5.4a9 9 0 003.1-4.6c.5-2 .4-3.9-.3-5.4-.7-1.5-.8-3.4-.3-5.4.5-2 1.7-3.6 3.1-4.6-.7 1.5-.8 3.4-.3 5.4.5 2 1.7 3.6 3.1 4.6a9 9 0 013.1 4.6c.5 2 .4 3.9-.3 5.4a9 9 0 003.1-4.6c.5-2 .4-3.9-.3-5.4-.7-1.5-.8-3.4-.3-5.4.5-2 1.7-3.6 3.1-4.6-.7 1.5-.8 3.4-.3 5.4.5 2 1.7 3.6 3.1 4.6a9 9 0 013.1 4.6c.5 2 .4 3.9-.3 5.4a9 9 0 003.1-4.6c.5-2 .4-3.9-.3-5.4-.7-1.5-.8-3.4-.3-5.4.5-2 1.7-3.6 3.1-4.6-.7 1.5-.8 3.4-.3 5.4.5 2 1.7 3.6 3.1 4.6a9 9 0 013.1 4.6c.5 2 .4 3.9-.3 5.4a9 9 0 003.1-4.6c.5-2 .4-3.9-.3-5.4-.7-1.5-.8-3.4-.3-5.4.5-2 1.7-3.6 3.1-4.6-.7 1.5-.8 3.4-.3 5.4.5 2 1.7 3.6 3.1 4.6a9 9 0 013.1 4.6c.5 2 .4 3.9-.3 5.4a9 9 0 003.1-4.6c.5-2 .4-3.9-.3-5.4-.7-1.5-.8-3.4-.3-5.4.5-2 1.7-3.6 3.1-4.6-.7 1.5-.8 3.4-.3 5.4.5 2 1.7 3.6 3.1 4.6a9 9 0 013.1 4.6c.5 2 .4 3.9-.3 5.4a9 9 0 003.1-4.6c.5-2 .4-3.9-.3-5.4-.7-1.5-.8-3.4-.3-5.4.5-2 1.7-3.6 3.1-4.6-.7 1.5-.8 3.4-.3 5.4.5 2 2.1 3.1 3.1 4.6 1 1.6 2.4 3.1 2.7 4.8.3 1.7.3 3.3 0 5.2 1.3-1 2.6-2.7 3.2-4.6.5-2 .4-3.9-.3-5.4-.7-1.5-.8-3.4-.3-5.4.5-2 1.7-3.6 3.1-4.6-.7 1.5-.8 3.4-.3 5.4.5 2 1.7 3.6 3.1 4.6a9 9 0 013.1 4.6c.5 2 .4 3.9-.3 5.4a9 9 0 003.1-4.6c.5-2 .4-3.9-.3-5.4-.7-1.5-.8-3.4-.3-5.4.5-2 1.7-3.6 3.1-4.6-.7 1.5-.8 3.4-.3 5.4.5 2 1.7 3.6 3.1 4.6a9 9 0 013.1 4.6c.5 2 .4 3.9-.3 5.4a9 9 0 003.1-4.6c.5-2 .4-3.9-.3-5.4-.7-1.5-.8-3.4-.3-5.4.5-2 1.7-3.6 3.1-4.6-.7 1.5-.8 3.4-.3 5.4.5 2 1.7 3.6 3.1 4.6a9 9 0 013.1 4.6c.5 2 .4 3.9-.3 5.4a9 9 0 003.1-4.6c.5-2 .4-3.9-.3-5.4-.7-1.5-.8-3.4-.3-5.4.5-2 1.7-3.6 3.1-4.6-.7 1.5-.8 3.4-.3 5.4.5 2 1.7 3.6 3.1 4.6a9 9 0 013.1 4.6c.5 2 .4 3.9-.3 5.4a9 9 0 003.1-4.6c.5-2 .4-3.9-.3-5.4-.7-1.5-.8-3.4-.3-5.4.5-2 1.7-3.6 3.1-4.6-.7 1.5-.8 3.4-.3 5.4.5 2 1.7 3.6 3.1 4.6a9 9 0 013.1 4.6c.5 2 .4 3.9-.3 5.4a9 9 0 003.1-4.6c.5-2 .4-3.9-.3-5.4-.7-1.5-.8-3.4-.3-5.4.5-2 1.7-3.6 3.1-4.6-.7 1.5-.8 3.4-.3 5.4.5 2 1.7 3.6 3.1 4.6a9 9 0 013.1 4.6c.5 2 .4 3.9-.3 5.4a9 9 0 003.1-4.6c.5-2 .4-3.9-.3-5.4-.7-1.5-.8-3.4-.3-5.4.5-2 1.7-3.6 3.1-4.6-.7 1.5-.8 3.4-.3 5.4.5 2 1.7 3.6 3.1 4.6a9 9 0 013.1 4.6c.5 2 .4 3.9-.3 5.4a9 9 0 003.1-4.6c.5-2 .4-3.9-.3-5.4-.7-1.5-.8-3.4-.3-5.4.5-2 1.7-3.6 3.1-4.6-.7 1.5-.8 3.4-.3 5.4.5 2 1.7 3.6 3.1 4.6a9 9 0 013.1 4.6c.5 2 .4 3.9-.3 5.4a9 9 0 003.1-4.6c.5-2 .4-3.9-.3-5.4-.7-1.5-.8-3.4-.3-5.4.5-2 1.7-3.6 3.1-4.6-.7 1.5-.8 3.4-.3 5.4.75 2.79 2.72 4.08 4.45 5.82L200 115z",
      seaWaves:
        "m 28.83,94.9 c -4.25,0 -7.16,3.17 -8.75,5.18 -1.59,2.01 -4.5,5.18 -8.75,5.18 -2.16,0 -3.91,-1.63 -3.91,-3.64 0,-2.01 1.44,-3.6 3.6,-3.6 0.7,0 1.36,0.17 1.93,0.48 -0.33,-2.03 -2.19,-3.56 -4.45,-3.56 -4.24,0 -6.91,3.13 -8.5,5.13 V 115 h 200 v -14.89 c -1.59,2.01 -4.5,5.18 -8.75,5.18 -2.16,0 -3.91,-1.63 -3.91,-3.64 0,-2.01 1.75,-3.64 3.91,-3.64 0.7,0 1.36,0.17 1.93,0.48 -0.34,-2.01 -2.2,-3.55 -4.46,-3.55 -4.25,0 -7.16,3.17 -8.75,5.18 -1.59,2.01 -4.5,5.18 -8.75,5.18 -2.16,0 -3.91,-1.63 -3.91,-3.64 0,-2.01 1.75,-3.64 3.91,-3.64 0.7,0 1.36,0.17 1.93,0.48 -0.34,-2.01 -2.21,-3.55 -4.46,-3.55 -4.25,0 -7.16,3.17 -8.75,5.18 -1.59,2.01 -4.5,5.18 -8.75,5.18 -2.16,0 -3.91,-1.63 -3.91,-3.64 0,-2.01 1.75,-3.64 3.91,-3.64 0.7,0 1.36,0.17 1.93,0.48 -0.34,-2.01 -2.21,-3.55 -4.46,-3.55 -4.25,0 -7.16,3.17 -8.75,5.18 -1.59,2.01 -4.5,5.18 -8.75,5.18 -2.16,0 -3.91,-1.63 -3.91,-3.64 0,-2.01 1.75,-3.64 3.91,-3.64 0.7,0 1.36,0.17 1.93,0.48 -0.34,-2.01 -2.2,-3.55 -4.46,-3.55 -4.25,0 -7.16,3.17 -8.75,5.18 -1.59,2.01 -4.5,5.18 -8.75,5.18 -2.16,0 -3.91,-1.63 -3.91,-3.64 0,-2.01 1.44,-3.6 3.6,-3.6 0.7,0 1.36,0.17 1.93,0.48 -0.34,-2.01 -2.21,-3.55 -4.46,-3.55 -4.25,0 -6.6,3.09 -8.19,5.09 -1.59,2.01 -4.5,5.18 -8.75,5.18 -2.16,0 -3.91,-1.63 -3.91,-3.64 0,-2.01 1.75,-3.64 3.91,-3.64 0.7,0 1.36,0.17 1.93,0.48 -0.34,-2.01 -2.21,-3.55 -4.46,-3.55 -4.25,0 -7.16,3.17 -8.75,5.18 -1.59,2.01 -4.5,5.18 -8.75,5.18 -2.16,0 -3.91,-1.63 -3.91,-3.64 0,-2.01 1.75,-3.64 3.91,-3.64 0.7,0 1.36,0.17 1.93,0.48 -0.34,-2.01 -2.2,-3.55 -4.46,-3.55 -4.25,0 -7.16,3.17 -8.75,5.18 -1.59,2.01 -4.5,5.18 -8.75,5.18 -2.16,0 -3.91,-1.63 -3.91,-3.64 0,-2.01 1.75,-3.64 3.91,-3.64 0.7,0 1.36,0.17 1.93,0.48 -0.34,-2.01 -2.2,-3.55 -4.46,-3.55 -4.25,0 -7.16,3.17 -8.75,5.18 -1.59,2.01 -4.5,5.18 -8.75,5.18 -2.16,0 -3.91,-1.63 -3.91,-3.64 0,-2.01 1.75,-3.64 3.91,-3.64 0.7,0 1.36,0.17 1.93,0.48 -0.34,-2.01 -2.21,-3.55 -4.46,-3.55 z",
      dragonTeeth:
        "M 9.4,85 C 6.5,88.1 4.1,92.9 3,98.8 1.9,104.6 2.3,110.4 3.8,115 2.4,113.5 0,106.6 0,109.3 v 5.7 h 200 v -5.7 c -1.1,-2.4 -2,-5.1 -2.6,-8 -1.1,-5.9 -0.7,-11.6 0.8,-16.2 -2.9,3.1 -5.3,7.9 -6.4,13.8 -1.1,5.9 -0.7,11.6 0.8,16.2 -2.9,-3.1 -5.3,-7.9 -6.4,-13.8 -1.1,-5.9 -0.7,-11.6 0.8,-16.2 -2.9,3.1 -5.3,7.9 -6.4,13.8 -1.1,5.9 -0.7,11.6 0.8,16.2 -2.9,-3.1 -5.3,-7.9 -6.4,-13.8 -1.1,-5.9 -0.7,-11.6 0.8,-16.2 -2.9,3.1 -5.3,7.9 -6.4,13.8 -1.1,5.9 -0.7,11.6 0.8,16.2 -2.9,-3.1 -5.3,-7.9 -6.4,-13.8 -1.1,-5.9 -0.7,-11.6 0.8,-16.2 -2.9,3.1 -5.3,7.9 -6.4,13.8 -1.1,5.9 -0.7,11.6 0.8,16.2 -2.9,-3.1 -5.3,-7.9 -6.4,-13.8 -1.1,-5.9 -0.7,-11.6 0.8,-16.2 -2.9,3.1 -5.3,7.9 -6.4,13.8 -1.1,5.9 -0.7,11.6 0.8,16.2 -2.9,-3.1 -5.3,-7.9 -6.4,-13.8 -1.1,-5.9 -0.7,-11.6 0.8,-16.2 -2.9,3.1 -5.3,7.9 -6.4,13.8 -1.1,5.9 -0.7,11.6 0.8,16.2 -2.9,-3.1 -5.3,-7.9 -6.4,-13.8 -1.1,-5.9 -0.7,-11.6 0.8,-16.2 -2.9,3.1 -5.3,7.9 -6.4,13.8 -1.1,5.9 -0.7,11.6 0.8,16.2 -2.9,-3.1 -5.3,-7.9 -6.4,-13.8 -1.1,-5.9 -0.7,-11.6 0.8,-16.2 -2.9,3.1 -5.3,7.9 -6.4,13.8 -1.1,5.9 -0.7,11.6 0.8,16.2 -2.9,-3.1 -5.3,-7.9 -6.4,-13.8 -1.1,-5.9 -0.7,-11.6 0.8,-16.2 -2.9,3.1 -5.3,7.9 -6.4,13.8 -1.1,5.9 -0.7,11.6 0.8,16.2 -1.4,-1.5 -2.8,-3.9 -3.8,-6.1 -1.1,-2.4 -2.3,-6.1 -2.6,-7.7 -0.2,-5.9 0.2,-11.7 1.7,-16.3 -3,3.1 -5.3,7.9 -6.4,13.8 -1.1,5.8 -0.7,11.6 0.8,16.2 -2.9,-3.1 -5.3,-7.9 -6.4,-13.8 -1,-5.8 -0.7,-11.6 0.9,-16.2 -3,3.1 -5.3,7.9 -6.4,13.8 -1.1,5.8 -0.7,11.6 0.8,16.2 -2.9,-3.1 -5.3,-7.9 -6.4,-13.8 -1.1,-5.8 -0.7,-11.6 0.9,-16.2 -3,3.1 -5.3,7.9 -6.4,13.8 -1.1,5.8 -0.7,11.6 0.8,16.2 -2.9,-3.1 -5.3,-7.9 -6.4,-13.8 C 63,95.4 63.4,89.6 64.9,85 c -2.9,3.1 -5.3,7.9 -6.3,13.8 -1.1,5.8 -0.7,11.6 0.8,16.2 -3,-3.1 -5.3,-7.9 -6.4,-13.8 -1.1,-5.8 -0.7,-11.6 0.8,-16.2 -2.9,3.1 -5.3,7.9 -6.4,13.8 -1,5.8 -0.6,11.6 0.9,16.2 -3,-3.1 -5.3,-7.9 -6.4,-13.8 -1.1,-5.8 -0.7,-11.6 0.8,-16.2 -2.9,3.1 -5.3,7.9 -6.4,13.8 -1,5.8 -0.7,11.6 0.9,16.2 -3,-3.1 -5.3,-7.9 -6.4,-13.8 -1.1,-5.8 -0.7,-11.6 0.8,-16.2 -2.9,3.1 -5.3,7.9 -6.4,13.8 -1.1,5.8 -0.7,11.6 0.9,16.2 -3,-3.1 -5.3,-7.9 -6.4,-13.8 C 18.6,95.4 19,89.6 20.5,85 17.6,88.1 15.2,92.9 14.1,98.8 13,104.6 13.4,110.4 14.9,115 12,111.9 9.6,107.1 8.6,101.2 7.5,95.4 7.9,89.6 9.4,85 Z",
      firTrees: "m 3.9,90 -4,7 2,-0.5 L 0,100 v 15 h 200 v -15 l -1.9,-3.5 2,0.5 -4,-7 -4,7 2,-0.5 -4,7 2,-0.5 -4,7 -4,-7 2,0.5 -4,-7 2,0.5 -4,-7 -4,7 2,-0.5 -4,7 2,-0.5 -4,7 -4,-7 2,0.5 -4,-7 2,0.5 -4,-7 -4,7 2,-0.5 -4,7 2,-0.5 -4,7 -4,-7 2,0.5 -4,-7 2,0.5 -4.1,-7 -4,7 2,-0.5 -4,7 2,-0.5 -4,7 -4,-7 2,0.5 -4,-7 2,0.5 -4,-7 -4,7 2,-0.5 -4,7 2,-0.5 -4,7 -4,-7 2,0.5 -4,-7 2,0.5 -4,-7 -4,7 2,-0.5 -4,7 2,-0.5 -4,7 -4,-7 2,0.5 -4,-7 2,0.5 -4,-7 -4,7 2,-0.5 -4,7 2,-0.5 -4,7 -4,-7 2,0.5 -4,-7 2,0.5 -4,-7 -4,7 2,-0.5 -4,7 2,-0.5 -4,7 -4,-7 2,0.5 -4,-7 2,0.5 -4,-7 -4,7 2,-0.5 -4,7 2,-0.5 -4,7 -4,-7 2,0.5 -4,-7 2,0.5 -4.1,-7 -4,7 2,-0.5 -4,7 2,-0.5 -4,7 -4,-7 2,0.5 -4,-7 2,0.5 -4,-7 -4,7 2,-0.5 -4,7 2,-0.5 -4,7 -4,-7 2,0.5 -4,-7 2,0.5 -4,-7 -4,7 2,-0.5 -4,7 2,-0.5 -4,7 -4,-7 2,0.5 -4,-7 2,0.5 z",
      flechy: "m 0,100 h 85 l 15,-15 15,15 h 85 v 15 H 0 Z",
      barby: "m 0,100 h 85 l 15,15 15,-15 h 85 v 15 H 0 Z",
      enclavy: "M 0,100 H 85 V 85 h 30 v 15 h 85 v 15 H 0 Z",
      escartely: "m 0,100 h 85 v 15 h 30 v -15 h 85 v 15 H 0 Z",
      arched: "m 100,95 c 40,-0.2 100,20 100,20 H 0 c 0,0 60,-19.8 100,-20 z",
      archedReversed: "m 0,85 c 0,0 60,20.2 100,20 40,-0.2 100,-20 100,-20 v 30 H 0 Z"
    };
  
    const templates = {
      // straight divisions
      perFess: `<rect x="0" y="100" width="200" height="100"/>`,
      perPale: `<rect x="100" y="0" width="100" height="200"/>`,
      perBend: `<polygon points="0,0 200,200 0,200"/>`,
      perBendSinister: `<polygon points="200,0 0,200 200,200"/>`,
      perChevron: `<polygon points="0,200 100,100 200,200"/>`,
      perChevronReversed: `<polygon points="0,0 100,100 200,0"/>`,
      perCross: `<rect x="100" y="0" width="100" height="100"/><rect x="0" y="100" width="100" height="100"/>`,
      perPile: `<polygon points="0,0 15,0 100,200 185,0 200,0 200,200 0,200"/>`,
      perSaltire: `<polygon points="0,0 0,200 200,0 200,200"/>`,
      gyronny: `<polygon points="0,0 200,200 200,100 0,100"/><polygon points="200,0 0,200 100,200 100,0"/>`,
      chevronny: `<path d="M0,80 100,-15 200,80 200,120 100,25 0,120z M0,160 100,65 200,160 200,200 100,105 0,200z M0,240 100,145 200,240 0,240z"/>`,
      // lined divisions
      perFessLined: line => `<path d="${line}"/><rect x="0" y="115" width="200" height="85" shape-rendering="crispedges"/>`,
      perPaleLined: line => `<path d="${line}" transform="rotate(-90 100 100)"/><rect x="115" y="0" width="85" height="200" shape-rendering="crispedges"/>`,
      perBendLined: line => `<path d="${line}" transform="translate(-10 -10) rotate(45 110 110) scale(1.1)"/><rect x="0" y="115" width="200" height="85" transform="translate(-10 -10) rotate(45 110 110) scale(1.1)" shape-rendering="crispedges"/>`,
      perBendSinisterLined: line => `<path d="${line}" transform="translate(-10 -10) rotate(-45 110 110) scale(1.1)"/><rect x="0" y="115" width="200" height="85" transform="translate(-10 -10) rotate(-45 110 110) scale(1.1)" shape-rendering="crispedges"/>`,
      perChevronLined: line => `<rect x="15" y="115" width="200" height="200" transform="translate(70 70) rotate(45 100 100)"/><path d="${line}" transform="translate(129 71) rotate(-45 -100 100) scale(-1 1)"/><path d="${line}" transform="translate(71 71) rotate(45 100 100)"/>`,
      perChevronReversedLined: line => `<rect x="15" y="115" width="200" height="200" transform="translate(-70 -70) rotate(225.001 100 100)"/><path d="${line}" transform="translate(-70.7 -70.7) rotate(225 100 100) scale(1 1)"/><path d="${line}" transform="translate(270.7 -70.7) rotate(-225 -100 100) scale(-1 1)"/>`,
      perCrossLined: line => `<rect x="100" y="0" width="100" height="92.5"/><rect x="0" y="107.5" width="100" height="92.5"/><path d="${line}" transform="translate(0 50) scale(.5001)"/><path d="${line}" transform="translate(200 150) scale(-.5)"/>`,
      perPileLined: line => `<path d="${line}" transform="translate(161.66 10) rotate(66.66 -100 100) scale(-1 1)"/><path d="${line}" transform="translate(38.33 10) rotate(-66.66 100 100)"/><polygon points="-2.15,0 84.15,200 115.85,200 202.15,0 200,200 0,200"/>`,
      // straight ordinaries
      fess: `<rect x="0" y="75" width="200" height="50"/>`,
      pale: `<rect x="75" y="0" width="50" height="200"/>`,
      bend: `<polygon points="35,0 200,165 200,200 165,200 0,35 0,0"/>`,
      bendSinister: `<polygon points="0,165 165,0 200,0 200,35 35,200 0,200"/>`,
      chief: `<rect width="200" height="75"/>`,
      bar: `<rect x="0" y="87.5" width="200" height="25"/>`,
      gemelle: `<rect x="0" y="76" width="200" height="16"/><rect x="0" y="108" width="200" height="16"/>`,
      fessCotissed: `<rect x="0" y="67" width="200" height="8"/><rect x="0" y="83" width="200" height="34"/><rect x="0" y="125" width="200" height="8"/>`,
      fessDoubleCotissed: `<rect x="0" y="60" width="200" height="7.5"/><rect x="0" y="72.5" width="200" height="7.5"/><rect x="0" y="85" width="200" height="30"/><rect x="0" y="120" width="200" height="7.5"/><rect x="0" y="132.5" width="200" height="7.5"/>`,
      bendlet: `<polygon points="22,0 200,178 200,200 178,200 0,22 0,0"/>`,
      bendletSinister: `<polygon points="0,178 178,0 200,0 200,22 22,200 0,200"/>`,
      terrace: `<rect x="0" y="145" width="200" height="55"/>`,
      cross: `<polygon points="85,0 85,85 0,85 0,115 85,115 85,200 115,200 115,115 200,115 200,85 115,85 115,0"/>`,
      crossParted: `<path d="M 80 0 L 80 80 L 0 80 L 0 95 L 80 95 L 80 105 L 0 105 L 0 120 L 80 120 L 80 200 L 95 200 L 95 120 L 105 120 L 105 200 L 120 200 L 120 120 L 200 120 L 200 105 L 120 105 L 120 95 L 200 95 L 200 80 L 120 80 L 120 0 L 105 0 L 105 80 L 95 80 L 95 0 L 80 0 z M 95 95 L 105 95 L 105 105 L 95 105 L 95 95 z"/>`,
      saltire: `<path d="M 0,21 79,100 0,179 0,200 21,200 100,121 179,200 200,200 200,179 121,100 200,21 200,0 179,0 100,79 21,0 0,0 Z"/>`,
      saltireParted: `<path d="M 7 0 L 89 82 L 82 89 L 0 7 L 0 28 L 72 100 L 0 172 L 0 193 L 82 111 L 89 118 L 7 200 L 28 200 L 100 128 L 172 200 L 193 200 L 111 118 L 118 111 L 200 193 L 200 172 L 128 100 L 200 28 L 200 7 L 118 89 L 111 82 L 193 0 L 172 0 L 100 72 L 28 0 L 7 0 z M 100 93 L 107 100 L 100 107 L 93 100 L 100 93 z"/>`,
      mount: `<path d="m0,250 a100,100,0,0,1,200,0"/>`,
      point: `<path d="M0,200 Q80,180 100,135 Q120,180 200,200"/>`,
      flaunches: `<path d="M0,0 q120,100 0,200 M200,0 q-120,100 0,200"/>`,
      gore: `<path d="M20,0 Q30,75 100,100 Q80,150 100,200 L0,200 L0,0 Z"/>`,
      pall: `<polygon points="0,0 30,0 100,70 170,0 200,0 200,30 122,109 122,200 78,200 78,109 0,30"/>`,
      pallReversed: `<polygon points="0,200 0,170 78,91 78,0 122,0 122,91 200,170 200,200 170,200 100,130 30,200"/>`,
      chevron: `<polygon points="0,125 100,60 200,125 200,165 100,100 0,165"/>`,
      chevronReversed: `<polygon points="0,75 100,140 200,75 200,35 100,100 0,35"/>`,
      gyron: `<polygon points="0,0 100,100 0,100"/>`,
      quarter: `<rect width="50%" height="50%"/>`,
      canton: `<rect width="37.5%" height="37.5%"/>`,
      pile: `<polygon points="70,0 100,175 130,0"/>`,
      pileInBend: `<polygon points="200,200 200,144 25,25 145,200"/>`,
      pileInBendSinister: `<polygon points="0,200 0,144 175,25 55,200"/>`,
      piles: `<polygon points="46,0 75,175 103,0"/><polygon points="95,0 125,175 154,0"/>`,
      pilesInPoint: `<path d="M15,0 100,200 60,0Z M80,0 100,200 120,0Z M140,0 100,200 185,0Z"/>`,
      label: `<path d="m 46,54.8 6.6,-15.6 95.1,0 5.9,15.5 -16.8,0.1 4.5,-11.8 L 104,43 l 4.3,11.9 -16.8,0 4.3,-11.8 -37.2,0 4.5,11.8 -16.9,0 z"/>`,
      // lined ordinaries
      fessLined: line => `<path d="${line}" transform="translate(0 -25)"/><path d="${line}" transform="translate(0 25) rotate(180 100 100)"/><rect x="0" y="88" width="200" height="24" stroke="none"/>`,
      paleLined: line => `<path d="${line}" transform="rotate(-90 100 100) translate(0 -25)"/><path d="${line}" transform="rotate(90 100 100) translate(0 -25)"/><rect x="88" y="0" width="24" height="200" stroke="none"/>`,
      bendLined: line => `<path d="${line}" transform="translate(8 -18) rotate(45 110 100) scale(1.1 1)"/><path d="${line}" transform="translate(-28 18) rotate(225 110 100) scale(1.1 1)"/><rect x="0" y="88" width="200" height="24" transform="translate(-10 0) rotate(45 110 100) scale(1.1 1)" stroke="none"/>`,
      bendSinisterLined: line => `<path d="${line}" transform="translate(-28 -18) rotate(-45 110 100) scale(1.1 1)"/><path d="${line}" transform="translate(8 18) rotate(-225 110 100) scale(1.1 1)"/><rect x="0" y="88" width="200" height="24" transform="translate(-10 0) rotate(-45 110 100) scale(1.1 1)" stroke="none"/>`,
      chiefLined: line => `<path d="${line}" transform="translate(0,-25) rotate(180.00001 100 100)"/><rect width="200" height="62" stroke="none"/>`,
      barLined: line => `<path d="${line}" transform="translate(0,-12.5)"/><path d="${line}" transform="translate(0,12.5) rotate(180.00001 100 100)"/><rect x="0" y="94" width="200" height="12" stroke="none"/>`,
      gemelleLined: line => `<path d="${line}" transform="translate(0,-22.5)"/><path d="${line}" transform="translate(0,22.5) rotate(180.00001 100 100)"/>`,
      fessCotissedLined: line => `<path d="${line}" transform="translate(0 15) scale(1 .5)"/><path d="${line}" transform="translate(0 85) rotate(180 100 50) scale(1 .5)"/><rect x="0" y="80" width="200" height="40"/>`,
      fessDoubleCotissedLined: line => `<rect x="0" y="85" width="200" height="30"/><rect x="0" y="72.5" width="200" height="7.5"/><rect x="0" y="120" width="200" height="7.5"/><path d="${line}" transform="translate(0 10) scale(1 .5)"/><path d="${line}" transform="translate(0 90) rotate(180 100 50) scale(1 .5)"/>`,
      bendletLined: line => `<path d="${line}" transform="translate(2 -12) rotate(45 110 100) scale(1.1 1)"/><path d="${line}" transform="translate(-22 12) rotate(225 110 100) scale(1.1 1)"/><rect x="0" y="94" width="200" height="12" transform="translate(-10 0) rotate(45 110 100) scale(1.1 1)" stroke="none"/>`,
      bendletSinisterLined: line => `<path d="${line}" transform="translate(-22 -12) rotate(-45 110 100) scale(1.1 1)"/><path d="${line}" transform="translate(2 12) rotate(-225 110 100) scale(1.1 1)"/><rect x="0" y="94" width="200" height="12" transform="translate(-10 0) rotate(-45 110 100) scale(1.1 1)" stroke="none"/>`,
      terraceLined: line => `<path d="${line}" transform="translate(0,50)"/><rect x="0" y="164" width="200" height="36" stroke="none"/>`,
      crossLined: line => `<path d="${line}" transform="translate(0,-14.5)"/><path d="${line}" transform="rotate(180 100 100) translate(0,-14.5)"/><path d="${line}" transform="rotate(-90 100 100) translate(0,-14.5)"/><path d="${line}" transform="rotate(-270 100 100) translate(0,-14.5)"/>`,
      crossPartedLined: line => `<path d="${line}" transform="translate(0,-20)"/><path d="${line}" transform="rotate(180 100 100) translate(0,-20)"/><path d="${line}" transform="rotate(-90 100 100) translate(0,-20)"/><path d="${line}" transform="rotate(-270 100 100) translate(0,-20)"/>`,
      saltireLined: line => `<path d="${line}" transform="translate(0 -10) rotate(45 110 100) scale(1.1 1)"/><path d="${line}" transform="translate(-20 10) rotate(225 110 100) scale(1.1 1)"/><path d="${line}" transform="translate(-20 -10) rotate(-45 110 100) scale(1.1 1)"/><path d="${line}" transform="translate(0 10) rotate(-225 110 100) scale(1.1 1)"/>`,
      saltirePartedLined: line => `<path d="${line}" transform="translate(3 -13) rotate(45 110 100) scale(1.1 1)"/><path d="${line}" transform="translate(-23 13) rotate(225 110 100) scale(1.1 1)"/><path d="${line}" transform="translate(-23 -13) rotate(-45 110 100) scale(1.1 1)"/><path d="${line}" transform="translate(3 13) rotate(-225 110 100) scale(1.1 1)"/>`
    };
  
    const patterns = {
      semy: (p, c1, c2, size, chargeId) => `<pattern id="${p}" width="${size * 0.125}" height="${size * 0.125}" viewBox="0 0 200 200" stroke="#000"><rect width="200" height="200" fill="${c1}" stroke="none"/><g fill="${c2}"><use transform="translate(-100 -50)" href="#${chargeId}"/><use transform="translate(100 -50)" href="#${chargeId}"/><use transform="translate(0 50)" href="#${chargeId}"/></g></pattern>`,
      vair: (p, c1, c2, size) => `<pattern id="${p}" width="${size * 0.125}" height="${size * 0.25}" viewBox="0 0 25 50" stroke="#000" stroke-width=".2"><rect width="25" height="25" fill="${c1}" stroke="none"/><path d="m12.5,0 l6.25,6.25 v12.5 l6.25,6.25 h-25 l6.25,-6.25 v-12.5 z" fill="${c2}"/><rect x="0" y="25" width="25" height="25" fill="${c2}" stroke="none"/><path d="m25,25 l-6.25,6.25 v12.5 l-6.25,6.25 l-6.25,-6.25 v-12.5 l-6.25,-6.25 z" fill="${c1}"/><path d="M0 50 h25" fill="none"/></pattern>`,
      counterVair: (p, c1, c2, size) => `<pattern id="${p}" width="${size * 0.125}" height="${size * 0.25}" viewBox="0 0 25 50" stroke="#000" stroke-width=".2"><rect width="25" height="50" fill="${c2}" stroke="none"/><path d="m 12.5,0 6.25,6.25 v 12.5 L 25,25 18.75,31.25 v 12.5 L 12.5,50 6.25,43.75 V 31.25 L 0,25 6.25,18.75 V 6.25 Z" fill="${c1}"/></pattern>`,
      vairInPale: (p, c1, c2, size) => `<pattern id="${p}" width="${size * 0.125}" height="${size * 0.125}" viewBox="0 0 25 25"><rect width="25" height="25" fill="${c1}"/><path d="m12.5,0 l6.25,6.25 v12.5 l6.25,6.25 h-25 l6.25,-6.25 v-12.5 z" fill="${c2}" stroke="#000" stroke-width=".2"/></pattern>`,
      vairEnPointe: (p, c1, c2, size) => `<pattern id="${p}" width="${size * 0.125}" height="${size * 0.25}" viewBox="0 0 25 50"><rect width="25" height="25" fill="${c2}"/><path d="m12.5,0 l6.25,6.25 v12.5 l6.25,6.25 h-25 l6.25,-6.25 v-12.5 z" fill="${c1}"/><rect x="0" y="25" width="25" height="25" fill="${c1}" stroke-width="1" stroke="${c1}"/><path d="m12.5,25 l6.25,6.25 v12.5 l6.25,6.25 h-25 l6.25,-6.25 v-12.5 z" fill="${c2}"/></pattern>`,
      vairAncien: (p, c1, c2, size) => `<pattern id="${p}" width="${size * 0.125}" height="${size * 0.125}" viewBox="0 0 100 100"><rect width="100" height="100" fill="${c1}"/><path fill="${c2}" stroke="none" d="m 0,90 c 10,0 25,-5 25,-40 0,-25 10,-40 25,-40 15,0 25,15 25,40 0,35 15,40 25,40 v 10 H 0 Z"/><path fill="none" stroke="#000" d="M 0,90 c 10,0 25,-5 25,-40 0,-35 15,-40 25,-40 10,0 25,5 25,40 0,35 15,40 25,40 M0,100 h100"/></pattern>`,
      potent: (p, c1, c2, size) => `<pattern id="${p}" width="${size * 0.125}" height="${size * 0.125}" viewBox="0 0 200 200" stroke="#000"><rect width="200" height="100" fill="${c1}" stroke="none"/><rect y="100" width="200" height="100" fill="${c2}" stroke="none"/><path d="m25 50h50v-50h50v50h50v50h-150z" fill="${c2}"/><path d="m25 100v50h50v50h50v-50h50v-50z" fill="${c1}"/><path d="m0 0h200 M0 100h200" fill="none"/></pattern>`,
      counterPotent: (p, c1, c2, size) => `<pattern id="${p}" width="${size * 0.125}" height="${size * 0.125}" viewBox="0 0 200 200" stroke="none"><rect width="200" height="200" fill="${c1}"/><path d="m25 50h50v-50h50v50h50v100h-50v50h-50v-50h-50v-50z" fill="${c2}"/><path d="m0 0h200 M0 100h200 M0 200h200"/></pattern>`,
      potentInPale: (p, c1, c2, size) => `<pattern id="${p}" width="${size * 0.125}" height="${size * 0.0625}" viewBox="0 0 200 100" stroke-width="1"><rect width="200" height="100" fill="${c1}" stroke="none"/><path d="m25 50h50v-50h50v50h50v50h-150z" fill="${c2}" stroke="#000"/><path d="m0 0h200 M0 100h200" fill="none" stroke="#000"/></pattern>`,
      potentEnPointe: (p, c1, c2, size) => `<pattern id="${p}" width="${size * 0.125}" height="${size * 0.125}" viewBox="0 0 200 200" stroke="none"><rect width="200" height="200" fill="${c1}"/><path d="m0 0h25v50h50v50h50v-50h50v-50h25v100h-25v50h-50v50h-50v-50h-50v-50h-25v-100" fill="${c2}"/></pattern>`,
      ermine: (p, c1, c2, size) =>
        `<pattern id="${p}" width="${size * 0.125}" height="${
          size * 0.125
        }" viewBox="0 0 200 200" fill="${c2}"><rect width="200" height="200" fill="${c1}"/><g stroke="none" fill="${c2}"><g transform="translate(-100 -50)"><path d="m100 81.1c-4.25 17.6-12.7 29.8-21.2 38.9 3.65-0.607 7.9-3.04 11.5-5.47-2.42 4.86-4.86 8.51-7.3 12.7 1.82-0.607 6.07-4.86 12.7-10.9 1.21 8.51 2.42 17.6 4.25 23.6 1.82-5.47 3.04-15.2 4.25-23.6 3.65 3.65 7.3 7.9 12.7 10.9l-7.9-13.3c3.65 1.82 7.9 4.86 11.5 6.07-9.11-9.11-17-21.2-20.6-38.9z"/><path d="m82.4 81.7c-0.607-0.607-6.07 2.42-9.72-4.25 7.9 6.68 15.2-7.3 21.8 1.82 1.82 4.25-6.68 10.9-12.1 2.42z"/><path d="m117 81.7c0.607-1.21 6.07 2.42 9.11-4.86-7.3 7.3-15.2-7.3-21.2 2.42-1.82 4.25 6.68 10.9 12.1 2.42z"/><path d="m101 66.5c-1.02-0.607 3.58-4.25-3.07-8.51 5.63 7.9-10.2 10.9-1.54 17.6 3.58 2.42 12.2-2.42 4.6-9.11z"/></g><g transform="translate(100 -50)"><path d="m100 81.1c-4.25 17.6-12.7 29.8-21.2 38.9 3.65-0.607 7.9-3.04 11.5-5.47-2.42 4.86-4.86 8.51-7.3 12.7 1.82-0.607 6.07-4.86 12.7-10.9 1.21 8.51 2.42 17.6 4.25 23.6 1.82-5.47 3.04-15.2 4.25-23.6 3.65 3.65 7.3 7.9 12.7 10.9l-7.9-13.3c3.65 1.82 7.9 4.86 11.5 6.07-9.11-9.11-17-21.2-20.6-38.9z"/><path d="m82.4 81.7c-0.607-0.607-6.07 2.42-9.72-4.25 7.9 6.68 15.2-7.3 21.8 1.82 1.82 4.25-6.68 10.9-12.1 2.42z"/><path d="m117 81.7c0.607-1.21 6.07 2.42 9.11-4.86-7.3 7.3-15.2-7.3-21.2 2.42-1.82 4.25 6.68 10.9 12.1 2.42z"/><path d="m101 66.5c-1.02-0.607 3.58-4.25-3.07-8.51 5.63 7.9-10.2 10.9-1.54 17.6 3.58 2.42 12.2-2.42 4.6-9.11z"/></g><g transform="translate(0 50)"><path d="m100 81.1c-4.25 17.6-12.7 29.8-21.2 38.9 3.65-0.607 7.9-3.04 11.5-5.47-2.42 4.86-4.86 8.51-7.3 12.7 1.82-0.607 6.07-4.86 12.7-10.9 1.21 8.51 2.42 17.6 4.25 23.6 1.82-5.47 3.04-15.2 4.25-23.6 3.65 3.65 7.3 7.9 12.7 10.9l-7.9-13.3c3.65 1.82 7.9 4.86 11.5 6.07-9.11-9.11-17-21.2-20.6-38.9z"/><path d="m82.4 81.7c-0.607-0.607-6.07 2.42-9.72-4.25 7.9 6.68 15.2-7.3 21.8 1.82 1.82 4.25-6.68 10.9-12.1 2.42z"/><path d="m117 81.7c0.607-1.21 6.07 2.42 9.11-4.86-7.3 7.3-15.2-7.3-21.2 2.42-1.82 4.25 6.68 10.9 12.1 2.42z"/><path d="m101 66.5c-1.02-0.607 3.58-4.25-3.07-8.51 5.63 7.9-10.2 10.9-1.54 17.6 3.58 2.42 12.2-2.42 4.6-9.11z"/></g></g></pattern>`,
      chequy: (p, c1, c2, size) => `<pattern id="${p}" width="${size * 0.25}" height="${size * 0.25}" viewBox="0 0 50 50" fill="${c2}"><rect width="50" height="50"/><rect width="25" height="25" fill="${c1}"/><rect x="25" y="25" width="25" height="25" fill="${c1}"/></pattern>`,
      lozengy: (p, c1, c2, size) => `<pattern id="${p}" width="${size * 0.125}" height="${size * 0.125}" viewBox="0 0 50 50"><rect width="50" height="50" fill="${c1}"/><polygon points="25,0 50,25 25,50 0,25" fill="${c2}"/></pattern>`,
      fusily: (p, c1, c2, size) => `<pattern id="${p}" width="${size * 0.125}" height="${size * 0.25}" viewBox="0 0 50 100"><rect width="50" height="100" fill="${c2}"/><polygon points="25,0 50,50 25,100 0,50" fill="${c1}"/></pattern>`,
      pally: (p, c1, c2, size) => `<pattern id="${p}" width="${size * 0.5}" height="${size * 0.125}" viewBox="0 0 100 25"><rect width="100" height="25" fill="${c2}"/><rect x="25" y="0" width="25" height="25" fill="${c1}"/><rect x="75" y="0" width="25" height="25" fill="${c1}"/></pattern>`,
      barry: (p, c1, c2, size) => `<pattern id="${p}" width="${size * 0.125}" height="${size * 0.5}" viewBox="0 0 25 100"><rect width="25" height="100" fill="${c2}"/><rect x="0" y="25" width="25" height="25" fill="${c1}"/><rect x="0" y="75" width="25" height="25" fill="${c1}"/></pattern>`,
      gemelles: (p, c1, c2, size) => `<pattern id="${p}" width="${size * 0.125}" height="${size * 0.125}" viewBox="0 0 50 50"><rect width="50" height="50" fill="${c1}"/><rect y="5" width="50" height="10" fill="${c2}"/><rect y="40" width="50" height="10" fill="${c2}"/></pattern>`,
      bendy: (p, c1, c2, size) => `<pattern id="${p}" width="${size * 0.5}" height="${size * 0.5}" viewBox="0 0 100 100"><rect width="100" height="100" fill="${c1}"/><polygon points="0,25 75,100 25,100 0,75" fill="${c2}"/><polygon points="25,0 75,0 100,25 100,75" fill="${c2}"/></pattern>`,
      bendySinister: (p, c1, c2, size) => `<pattern id="${p}" width="${size * 0.5}" height="${size * 0.5}" viewBox="0 0 100 100"><rect width="100" height="100" fill="${c2}"/><polygon points="0,25 25,0 75,0 0,75" fill="${c1}"/><polygon points="25,100 100,25 100,75 75,100" fill="${c1}"/></pattern>`,
      palyBendy: (p, c1, c2, size) => `<pattern id="${p}" width="${size * 0.6258}" height="${size * 0.3576}" viewBox="0 0 175 100"><rect y="0" x="0" width="175" height="100" fill="${c2}"/><g fill="${c1}"><path d="m0 20 35 30v50l-35-30z"/><path d="m35 0 35 30v50l-35-30z"/><path d="m70 0h23l12 10v50l-35-30z"/><path d="m70 80 23 20h-23z"/><path d="m105 60 35 30v10h-35z"/><path d="m105 0h35v40l-35-30z"/><path d="m 140,40 35,30 v 30 h -23 l -12,-10z"/><path d="M 175,0 V 20 L 152,0 Z"/></g></pattern>`,
      barryBendy: (p, c1, c2, size) => `<pattern id="${p}" width="${size * 0.3572}" height="${size * 0.6251}" viewBox="0 0 100 175"><rect width="100" height="175" fill="${c2}"/><g fill="${c1}"><path d="m20 0 30 35h50l-30-35z"/><path d="m0 35 30 35h50l-30-35z"/><path d="m0 70v23l10 12h50l-30-35z"/><path d="m80 70 20 23v-23z"/><path d="m60 105 30 35h10v-35z"/><path d="m0 105v35h40l-30-35z"/><path d="m 40,140 30,35 h 30 v -23 l -10,-12 z"/><path d="m0 175h20l-20-23z"/></g></pattern>`,
      pappellony: (p, c1, c2, size) => `<pattern id="${p}" width="${size * 0.125}" height="${size * 0.125}" viewBox="0 0 100 100"><rect width="100" height="100" fill="${c1}"/><circle cx="0" cy="51" r="45" stroke="${c2}" fill="${c1}" stroke-width="10"/><circle cx="100" cy="51" r="45" stroke="${c2}" fill="${c1}" stroke-width="10"/><circle cx="50" cy="1" r="45" stroke="${c2}" fill="${c1}" stroke-width="10"/></pattern>`,
      pappellony2: (p, c1, c2, size) => `<pattern id="${p}" width="${size * 0.125}" height="${size * 0.125}" viewBox="0 0 100 100" stroke="#000" stroke-width="2"><rect width="100" height="100" fill="${c1}" stroke="none"/><circle cy="50" r="49" fill="${c2}"/><circle cx="100" cy="50" r="49" fill="${c2}"/><circle cx="50" cy="0" r="49" fill="${c1}"/></pattern>`,
      scaly: (p, c1, c2, size) => `<pattern id="${p}" width="${size * 0.125}" height="${size * 0.125}" viewBox="0 0 100 100" stroke="#000"><rect width="100" height="100" fill="${c1}" stroke="none"/><path d="M 0,84 C -40,84 -50,49 -50,49 -50,79 -27,99 0,99 27,99 50,79 50,49 50,49 40,84 0,84 Z" fill="${c2}"/><path d="M 100,84 C 60,84 50,49 50,49 c 0,30 23,50 50,50 27,0 50,-20 50,-50 0,0 -10,35 -50,35 z" fill="${c2}"/><path d="M 50,35 C 10,35 0,0 0,0 0,30 23,50 50,50 77,50 100,30 100,0 100,0 90,35 50,35 Z" fill="${c2}"/></pattern>`,
      plumetty: (p, c1, c2, size) =>
        `<pattern id="${p}" width="${size * 0.125}" height="${
          size * 0.25
        }" viewBox="0 0 50 100" stroke-width=".8"><rect width="50" height="100" fill="${c2}" stroke="none"/><path fill="${c1}" stroke="none" d="M 25,100 C 44,88 49.5,74 50,50 33.5,40 25,25 25,4e-7 25,25 16.5,40 0,50 0.5,74 6,88 25,100 Z"/><path fill="none" stroke="${c2}" d="m17 40c5.363 2.692 10.7 2.641 16 0m-19 7c7.448 4.105 14.78 3.894 22 0m-27 7c6-2 10.75 3.003 16 3 5.412-0.0031 10-5 16-3m-35 9c4-7 12 3 19 2 7 1 15-9 19-2m-35 6c6-2 11 3 16 3s10-5 16-3m-30 7c8 0 8 3 14 3s7-3 14-3m-25 8c7.385 4.048 14.72 3.951 22 0m-19 8c5.455 2.766 10.78 2.566 16 0m-8 6v-78"/><g fill="none" stroke="${c1}"><path d="m42 90c2.678 1.344 5.337 2.004 8 2m-11 5c3.686 2.032 7.344 3.006 10.97 3m0.0261-1.2e-4v-30"/><path d="m0 92c2.689 0.0045 5.328-0.6687 8-2m-8 10c3.709-0.0033 7.348-1.031 11-3m-11 3v-30"/><path d="m0 7c5.412-0.0031 10-5 16-3m-16 11c7 1 15-9 19-2m-19 9c5 0 10-5 16-3m-16 10c6 0 7-3 14-3m-14.02 11c3.685-0.002185 7.357-1.014 11.02-3m-11 10c2.694-0.01117 5.358-0.7036 7.996-2m-8 6v-48"/><path d="m34 4c6-2 10.75 3.003 16 3m-19 6c4-7 12 3 19 2m-16 4c6-2 11 3 16 3m-14 4c8 0 8 3 14 3m-11 5c3.641 1.996 7.383 2.985 11 3m-8 5c2.762 1.401 5.303 2.154 8.002 2.112m-0.00154 3.888v-48"/></g></pattern>`,
      masoned: (p, c1, c2, size) => `<pattern id="${p}" width="${size * 0.125}" height="${size * 0.125}" viewBox="0 0 100 100" fill="none"><rect width="100" height="100" fill="${c1}"/><rect width="100" height="50" stroke="${c2}" stroke-width="4"/><line x1="50" y1="50" x2="50" y2="100" stroke="${c2}" stroke-width="5"/></pattern>`,
      fretty: (p, c1, c2, size) => `<pattern id="${p}" width="${size * 0.2}" height="${size * 0.2}" viewBox="0 0 140 140" stroke="#000" stroke-width="2"><rect width="140" height="140" fill="${c1}" stroke="none"/><path d="m-15 5 150 150 20-20-150-150z" fill="${c2}"/><path d="m10 150 140-140-20-20-140 140z" fill="${c2}" stroke="none"/><path d="m0 120 20 20 120-120-20-20z" fill="none"/></pattern>`,
      grillage: (p, c1, c2, size) => `<pattern id="${p}" width="${size * 0.25}" height="${size * 0.25}" viewBox="0 0 200 200" stroke="#000" stroke-width="2"><rect width="200" height="200" fill="${c1}" stroke="none"/><path d="m205 65v-30h-210v30z" fill="${c2}"/><path d="m65-5h-30v210h30z" fill="${c2}"/><path d="m205 165v-30h-210v30z" fill="${c2}"/><path d="m165,65h-30v140h30z" fill="${c2}"/><path d="m 165,-5h-30v40h30z" fill="${c2}"/></pattern>`,
      chainy: (p, c1, c2, size) => `<pattern id="${p}" width="${size * 0.167}" height="${size * 0.167}" viewBox="0 0 200 200" stroke="#000" stroke-width="2"><rect x="-6.691e-6" width="200" height="200" fill="${c1}" stroke="none"/><path d="m155-5-20-20-160 160 20 20z" fill="${c2}"/><path d="m45 205 160-160 20 20-160 160z" fill="${c2}"/><path d="m45-5 20-20 160 160-20 20-160-160" fill="${c2}"/><path d="m-5 45-20 20 160 160 20-20-160-160" fill="${c2}"/></pattern>`,
      maily: (p, c1, c2, size) =>
        `<pattern id="${p}" width="${size * 0.167}" height="${
          size * 0.167
        }" viewBox="0 0 200 200" stroke="#000" stroke-width="1.2"><path fill="${c1}" stroke="none" d="M0 0h200v200H0z"/><g fill="${c2}"><path d="m80-2c-5.27e-4 2.403-0.1094 6.806-0.3262 9.199 5.014-1.109 10.1-1.768 15.19-2.059 0.09325-1.712 0.1401-5.426 0.1406-7.141z"/><path d="m100 5a95 95 0 0 0-95 95 95 95 0 0 0 95 95 95 95 0 0 0 95-95 95 95 0 0 0-95-95zm0 15a80 80 0 0 1 80 80 80 80 0 0 1-80 80 80 80 0 0 1-80-80 80 80 0 0 1 80-80z"/><path d="m92.8 20.33c-5.562 0.4859-11.04 1.603-16.34 3.217-7.793 25.31-27.61 45.12-52.91 52.91-5.321 1.638-10.8 2.716-16.34 3.217-2.394 0.2168-6.796 0.3256-9.199 0.3262v15c1.714-4.79e-4 5.429-0.04737 7.141-0.1406 5.109-0.2761 10.19-0.9646 15.19-2.059 36.24-7.937 64.54-36.24 72.47-72.47z"/><path d="m202 80c-2.403-5.31e-4 -6.806-0.1094-9.199-0.3262 1.109 5.014 1.768 10.1 2.059 15.19 1.712 0.09326 5.426 0.1401 7.141 0.1406z"/><path d="m179.7 92.8c-0.4859-5.562-1.603-11.04-3.217-16.34-25.31-7.793-45.12-27.61-52.91-52.91-1.638-5.321-2.716-10.8-3.217-16.34-0.2168-2.394-0.3256-6.796-0.3262-9.199h-15c4.8e-4 1.714 0.0474 5.429 0.1406 7.141 0.2761 5.109 0.9646 10.19 2.059 15.19 7.937 36.24 36.24 64.54 72.47 72.47z"/><path d="m120 202c5.3e-4 -2.403 0.1094-6.806 0.3262-9.199-5.014 1.109-10.1 1.768-15.19 2.059-0.0933 1.712-0.1402 5.426-0.1406 7.141z"/><path d="m107.2 179.7c5.562-0.4859 11.04-1.603 16.34-3.217 7.793-25.31 27.61-45.12 52.91-52.91 5.321-1.638 10.8-2.716 16.34-3.217 2.394-0.2168 6.796-0.3256 9.199-0.3262v-15c-1.714 4.7e-4 -5.429 0.0474-7.141 0.1406-5.109 0.2761-10.19 0.9646-15.19 2.059-36.24 7.937-64.54 36.24-72.47 72.47z"/><path d="m -2,120 c 2.403,5.4e-4 6.806,0.1094 9.199,0.3262 -1.109,-5.014 -1.768,-10.1 -2.059,-15.19 -1.712,-0.0933 -5.426,-0.1402 -7.141,-0.1406 z"/><path d="m 20.33,107.2 c 0.4859,5.562 1.603,11.04 3.217,16.34 25.31,7.793 45.12,27.61 52.91,52.91 1.638,5.321 2.716,10.8 3.217,16.34 0.2168,2.394 0.3256,6.796 0.3262,9.199 L 95,202 c -4.8e-4,-1.714 -0.0472,-5.44 -0.1404,-7.152 -0.2761,-5.109 -0.9646,-10.19 -2.059,-15.19 -7.937,-36.24 -36.24,-64.54 -72.47,-72.47 z"/></g></pattern>`,
      honeycombed: (p, c1, c2, size) => `<pattern id="${p}" width="${size * 0.143}" height="${size * 0.24514}" viewBox="0 0 70 120"><rect width="70" height="120" fill="${c1}"/><path d="M 70,0 V 20 L 35,40 m 35,80 V 100 L 35,80 M 0,120 V 100 L 35,80 V 40 L 0,20 V 0" stroke="${c2}" fill="none" stroke-width="3"/></pattern>`
    };
  
    const draw = async function (id, coa) {
      const {shield, division, ordinaries = [], charges = []} = coa;
  
      const ordinariesRegular = ordinaries.filter(o => !o.above);
      const ordinariesAboveCharges = ordinaries.filter(o => o.above);
      const shieldPath = shieldPaths[shield];
      const tDiv = division ? (division.t.includes("-") ? division.t.split("-")[1] : division.t) : null;
      const positions = shieldPositions[shield];
      const sizeModifier = shieldSize[shield] || 1;
      const viewBox = shieldBox[shield] || "0 0 200 200";
  
      const shieldClip = `<clipPath id="${shield}_${id}"><path d="${shieldPath}"/></clipPath>`;
      const divisionClip = division ? `<clipPath id="divisionClip_${id}">${getTemplate(division.division, division.line)}</clipPath>` : "";
      const loadedCharges = await getCharges(coa, id, shieldPath);
      const loadedPatterns = getPatterns(coa, id);
      const blacklight = `<radialGradient id="backlight_${id}" cx="100%" cy="100%" r="150%"><stop stop-color="#fff" stop-opacity=".3" offset="0"/><stop stop-color="#fff" stop-opacity=".15" offset=".25"/><stop stop-color="#000" stop-opacity="0" offset="1"/></radialGradient>`;
      const field = `<rect x="0" y="0" width="200" height="200" fill="${clr(coa.t1)}"/>`;
      const divisionGroup = division ? templateDivision() : "";
      const overlay = `<path d="${shieldPath}" fill="url(#backlight_${id})" stroke="#333"/>`;
  
      const svg = `<svg id="${id}" width="200" height="200" viewBox="${viewBox}">
          <defs>${shieldClip}${divisionClip}${loadedCharges}${loadedPatterns}${blacklight}</defs>
          <g clip-path="url(#${shield}_${id})">${field}${divisionGroup}${templateAboveAll()}</g>
          ${overlay}</svg>`;
  
      // insert coa svg to defs
      document.getElementById("coas").insertAdjacentHTML("beforeend", svg);
      return true;
  
      function templateDivision() {
        let svg = "";
  
        // In field part
        for (const ordinary of ordinariesRegular) {
          if (ordinary.divided === "field") svg += templateOrdinary(ordinary, ordinary.t);
          else if (ordinary.divided === "counter") svg += templateOrdinary(ordinary, tDiv);
        }
  
        for (const charge of charges) {
          if (charge.divided === "field") svg += templateCharge(charge, charge.t);
          else if (charge.divided === "counter") svg += templateCharge(charge, tDiv);
        }
  
        for (const ordinary of ordinariesAboveCharges) {
          if (ordinary.divided === "field") svg += templateOrdinary(ordinary, ordinary.t);
          else if (ordinary.divided === "counter") svg += templateOrdinary(ordinary, tDiv);
        }
  
        // In division part
        svg += `<g clip-path="url(#divisionClip_${id})"><rect x="0" y="0" width="200" height="200" fill="${clr(division.t)}"/>`;
  
        for (const ordinary of ordinariesRegular) {
          if (ordinary.divided === "division") svg += templateOrdinary(ordinary, ordinary.t);
          else if (ordinary.divided === "counter") svg += templateOrdinary(ordinary, coa.t1);
        }
  
        for (const charge of charges) {
          if (charge.divided === "division") svg += templateCharge(charge, charge.t);
          else if (charge.divided === "counter") svg += templateCharge(charge, coa.t1);
        }
  
        for (const ordinary of ordinariesAboveCharges) {
          if (ordinary.divided === "division") svg += templateOrdinary(ordinary, ordinary.t);
          else if (ordinary.divided === "counter") svg += templateOrdinary(ordinary, coa.t1);
        }
  
        return (svg += `</g>`);
      }
  
      function templateAboveAll() {
        let svg = "";
  
        ordinariesRegular
          .filter(o => !o.divided)
          .forEach(ordinary => {
            svg += templateOrdinary(ordinary, ordinary.t);
          });
  
        charges
          .filter(o => !o.divided || !division)
          .forEach(charge => {
            svg += templateCharge(charge, charge.t);
          });
  
        ordinariesAboveCharges
          .filter(o => !o.divided)
          .forEach(ordinary => {
            svg += templateOrdinary(ordinary, ordinary.t);
          });
  
        return svg;
      }
  
      function templateOrdinary(ordinary, tincture) {
        const fill = clr(tincture);
        let svg = `<g fill="${fill}" stroke="none">`;
        if (ordinary.ordinary === "bordure") svg += `<path d="${shieldPath}" fill="none" stroke="${fill}" stroke-width="16.7%"/>`;
        else if (ordinary.ordinary === "orle") svg += `<path d="${shieldPath}" fill="none" stroke="${fill}" stroke-width="5%" transform="scale(.85)" transform-origin="center">`;
        else svg += getTemplate(ordinary.ordinary, ordinary.line);
        return svg + `</g>`;
      }
  
      function templateCharge(charge, tincture) {
        const fill = clr(tincture);
        const chargePositions = [...new Set(charge.p)].filter(position => positions[position]);
  
        let svg = "";
        svg += `<g fill="${fill}" stroke="#000">`;
        for (const p of chargePositions) {
          const transform = getElTransform(charge, p);
          svg += `<use href="#${charge.charge}_${id}" transform="${transform}"></use>`;
        }
        return svg + `</g>`;
  
        function getElTransform(c, p) {
          const s = (c.size || 1) * sizeModifier;
          const sx = c.sinister ? -s : s;
          const sy = c.reversed ? -s : s;
          let [x, y] = positions[p];
          x = x - 100 * (sx - 1);
          y = y - 100 * (sy - 1);
          const scale = c.sinister || c.reversed ? `${sx} ${sy}` : s;
          return `translate(${x} ${y}) scale(${scale})`;
        }
      }
    };
  
    async function getCharges(coa, id, shieldPath) {
      let charges = coa.charges ? coa.charges.map(charge => charge.charge) : []; // add charges
      if (semy(coa.t1)) charges.push(semy(coa.t1)); // add field semy charge
      if (semy(coa.division?.t)) charges.push(semy(coa.division.t)); // add division semy charge
  
      const uniqueCharges = [...new Set(charges)];
      const fetchedCharges = await Promise.all(
        uniqueCharges.map(async charge => {
          if (charge === "inescutcheon") return `<g id="inescutcheon_${id}"><path transform="translate(66 66) scale(.34)" d="${shieldPath}"/></g>`;
          const fetched = await fetchCharge(charge, id);
          return fetched;
        })
      );
      return fetchedCharges.join("");
    }
  
    const url = location.hostname ? "./charges/" : "http://armoria.herokuapp.com/charges/"; // on local machine fetch files from server
    async function fetchCharge(charge, id) {
      const fetched = fetch(url + charge + ".svg")
        .then(res => {
          if (res.ok) return res.text();
          else throw new Error("Cannot fetch charge");
        })
        .then(text => {
          const html = document.createElement("html");
          html.innerHTML = text;
          const g = html.querySelector("g");
          g.setAttribute("id", charge + "_" + id);
          return g.outerHTML;
        })
        .catch(err => console.error(err));
      return fetched;
    }
  
    function getPatterns(coa, id) {
      const isPattern = string => string.includes("-");
      let patternsToAdd = [];
      if (coa.t1.includes("-")) patternsToAdd.push(coa.t1); // add field pattern
      if (coa.division && isPattern(coa.division.t)) patternsToAdd.push(coa.division.t); // add division pattern
      if (coa.ordinaries) coa.ordinaries.filter(ordinary => isPattern(ordinary.t)).forEach(ordinary => patternsToAdd.push(ordinary.t)); // add ordinaries pattern
      if (coa.charges) coa.charges.filter(charge => isPattern(charge.t)).forEach(charge => patternsToAdd.push(charge.t)); // add charges pattern
      if (!patternsToAdd.length) return "";
  
      return [...new Set(patternsToAdd)]
        .map(patternString => {
          const [pattern, t1, t2, size] = patternString.split("-");
          const charge = semy(patternString);
          if (charge) return patterns.semy(patternString, clr(t1), clr(t2), getSizeMod(size), charge + "_" + id);
          return patterns[pattern](patternString, clr(t1), clr(t2), getSizeMod(size), charge);
        })
        .join("");
    }
  
    function getSizeMod(size) {
      if (size === "small") return 0.8;
      if (size === "smaller") return 0.5;
      if (size === "smallest") return 0.25;
      if (size === "big") return 1.6;
      return 1;
    }
  
    function getTemplate(id, line) {
      const linedId = id + "Lined";
      if (!line || line === "straight" || !templates[linedId]) return templates[id];
      const linePath = lines[line];
      return templates[linedId](linePath);
    }
  
    // get color or link to pattern
    function clr(tincture) {
      if (colors[tincture]) return colors[tincture];
      return `url(#${tincture})`;
    }
  
    // get charge is string starts with "semy"
    function semy(string) {
      const isSemy = /^semy/.test(string);
      if (!isSemy) return false;
      return string.match(/semy_of_(.*?)-/)[1];
    }
  
    // render coa if does not exist
    const trigger = async function (id, coa) {
      if (coa === "custom") {
        console.warn("Cannot render custom emblem", coa);
        return;
      }
      if (!coa) {
        console.warn(`Emblem ${id} is undefined`);
        return;
      }
      if (!document.getElementById(id)) return draw(id, coa);
    };
  
    const add = (type, i, coa, x, y) => {
      const id = type + "COA" + i;
      const g = document.getElementById(type + "Emblems");
  
      if (this.emblems.selectAll("use").size()) {
        const size = +g.getAttribute("font-size") || 50;
        const use = `<use data-i="${i}" x="${x - size / 2}" y="${y - size / 2}" width="1em" height="1em" href="#${id}"/>`;
        g.insertAdjacentHTML("beforeend", use);
      }
    };
  
    return {trigger, add, shieldPaths};
  })();

  Routes = (() => {
    const getRoads = () => {
      console.time("generateMainRoads");
      const cells = this.pack.cells;
      const burgs = this.pack.burgs.filter(b => b.i && !b.removed);
      const capitals = burgs.filter(b => b.capital).sort((a, b) => a.population - b.population);
  
      if (capitals.length < 2) return []; // not enough capitals to build main roads
      const paths = []; // array to store path segments
  
      for (const b of capitals) {
        const connect = capitals.filter(c => c.feature === b.feature && c !== b);
        for (const t of connect) {
          const [from, exit] = findLandPath(b.cell, t.cell, true);
          const segments = restorePath(b.cell, exit, "main", from);
          segments.forEach(s => paths.push(s));
        }
      }
  
      cells.i.forEach(i => (cells.s[i] += cells.road[i] / 2)); // add roads to suitability score
      console.timeEnd("generateMainRoads");
      return paths;
    };
  
    const getTrails = () => {
      console.time("generateTrails");
      const cells = this.pack.cells;
      const burgs = this.pack.burgs.filter(b => b.i && !b.removed);
  
      if (burgs.length < 2) return []; // not enough burgs to build trails
  
      let paths = []; // array to store path segments
      for (const f of this.pack.features.filter(f => f.land)) {
        const isle = burgs.filter(b => b.feature === f.i); // burgs on island
        if (isle.length < 2) continue;
  
        isle.forEach(function (b, i) {
          let path = [];
          if (!i) {
            // build trail from the first burg on island
            // to the farthest one on the same island or the closest road
            const farthest = d3.scan(isle, (a, c) => (c.y - b.y) ** 2 + (c.x - b.x) ** 2 - ((a.y - b.y) ** 2 + (a.x - b.x) ** 2));
            const to = isle[farthest].cell;
            if (cells.road[to]) return;
            const [from, exit] = findLandPath(b.cell, to, true);
            path = restorePath(b.cell, exit, "small", from);
          } else {
            // build trail from all other burgs to the closest road on the same island
            if (cells.road[b.cell]) return;
            const [from, exit] = findLandPath(b.cell, null, true);
            if (exit === null) return;
            path = restorePath(b.cell, exit, "small", from);
          }
          if (path) paths = paths.concat(path);
        });
      }
  
      console.timeEnd("generateTrails");
      return paths;
    };
  
    const getSearoutes = () => {
      console.time("generateSearoutes");
      const {cells, burgs, features} = this.pack;
      const allPorts = burgs.filter(b => b.port > 0 && !b.removed);
  
      if (!allPorts.length) return [];
  
      const bodies = new Set(allPorts.map(b => b.port)); // water features with ports
      let paths = []; // array to store path segments
      const connected = []; // store cell id of connected burgs
  
      bodies.forEach((f:number) => {
        const ports = allPorts.filter(b => b.port === f); // all ports on the same feature
        if (!ports.length) return;
  
        if (features[f].border) addOverseaRoute(f, ports[0]);
  
        // get inner-map routes
        for (let s = 0; s < ports.length; s++) {
          const source = ports[s].cell;
          if (connected[source]) continue;
  
          for (let t = s + 1; t < ports.length; t++) {
            const target = ports[t].cell;
            if (connected[target]) continue;
  
            const [from, exit, passable] = findOceanPath(target, source, true);
            if (!passable) continue;
  
            const path = restorePath(target, exit, "ocean", from);
            paths = paths.concat(path);
  
            connected[source] = 1;
            connected[target] = 1;
          }
        }
      });
  
      const addOverseaRoute = (f, port) => {
        const {x, y, cell: source} = port;
        const dist = p => Math.abs(p[0] - x) + Math.abs(p[1] - y);
        const [x1, y1] = [
          [0, y],
          [x, 0],
          [this.graphWidth, y],
          [x, this.graphHeight]
        ].sort((a, b) => dist(a) - dist(b))[0];
        const target = this.findCell(x1, y1);
  
        if (cells.f[target] === f && cells.h[target] < 20) {
          const [from, exit, passable] = findOceanPath(target, source, true);
  
          if (passable) {
            const path = restorePath(target, exit, "ocean", from);
            paths = paths.concat(path);
            this.last(path).push([x1, y1]);
          }
        }
      }
  
      console.timeEnd("generateSearoutes");
      return paths;
    };
  
    const draw = (main, small, water) => {
      console.time("drawRoutes");
      const {cells, burgs} = this.pack;
      const {burg, p} = cells;
  
      const getBurgCoords = b => [burgs[b].x, burgs[b].y];
      const getPathPoints = cells => cells.map(i => (Array.isArray(i) ? i : burg[i] ? getBurgCoords(burg[i]) : p[i]));
      const getPath = segment => Math.round(this.lineGen(getPathPoints(segment)));
      const getPathsHTML = (paths, type) => paths.map((path, i) => `<path id="${type}${i}" d="${getPath(path)}" />`).join("");
  
      this.lineGen.curve(d3.curveCatmullRom.alpha(0.1));
      this.roads.html(getPathsHTML(main, "road"));
      this.trails.html(getPathsHTML(small, "trail"));
  
      this.lineGen.curve(d3.curveBundle.beta(1));
      this.searoutes.html(getPathsHTML(water, "searoute"));
  
      console.timeEnd("drawRoutes");
    };
  
    const regenerate = () => {
      this.routes.selectAll("path").remove();
      this.pack.cells.road = new Uint16Array(this.pack.cells.i.length);
      this.pack.cells.crossroad = new Uint16Array(this.pack.cells.i.length);
      const main = getRoads();
      const small = getTrails();
      const water = getSearoutes();
      draw(main, small, water);
    };
  
    return {getRoads, getTrails, getSearoutes, draw, regenerate};
  
    // Find a land path to a specific cell (exit), to a closest road (toRoad), or to all reachable cells (null, null)
    const findLandPath = (start, exit = null, toRoad = null) => {
      const cells = this.pack.cells;
      const queue = new PriorityQueue({comparator: (a, b) => a.p - b.p});
      const cost = [],
        from = [];
      queue.queue({e: start, p: 0});
  
      while (queue.length) {
        const next = queue.dequeue(),
          n = next.e,
          p = next.p;
        if (toRoad && cells.road[n]) return [from, n];
  
        for (const c of cells.c[n]) {
          if (cells.h[c] < 20) continue; // ignore water cells
          const stateChangeCost = cells.state && cells.state[c] !== cells.state[n] ? 400 : 0; // trails tend to lay within the same state
          const habitability = this.biomesData.habitability[cells.biome[c]];
          if (!habitability) continue; // avoid inhabitable cells (eg. lava, glacier)
          const habitedCost = habitability ? Math.max(100 - habitability, 0) : 400; // routes tend to lay within populated areas
          const heightChangeCost = Math.abs(cells.h[c] - cells.h[n]) * 10; // routes tend to avoid elevation changes
          const heightCost = cells.h[c] > 80 ? cells.h[c] : 0; // routes tend to avoid mountainous areas
          const cellCoast = 10 + stateChangeCost + habitedCost + heightChangeCost + heightCost;
          const totalCost = p + (cells.road[c] || cells.burg[c] ? cellCoast / 3 : cellCoast);
  
          if (from[c] || totalCost >= cost[c]) continue;
          from[c] = n;
          if (c === exit) return [from, exit];
          cost[c] = totalCost;
          queue.queue({e: c, p: totalCost});
        }
      }
      return [from, exit];
    }
  
   const restorePath = (start, end, type, from) => {
      const cells = this.pack.cells;
      const path = []; // to store all segments;
      let segment = [],
        current = end,
        prev = end;
      const score = type === "main" ? 5 : 1; // to increase road score at cell
  
      if (type === "ocean" || !cells.road[prev]) segment.push(end);
      if (!cells.road[prev]) cells.road[prev] = score;
  
      for (let i = 0, limit = 1000; i < limit; i++) {
        if (!from[current]) break;
        current = from[current];
  
        if (cells.road[current]) {
          if (segment.length) {
            segment.push(current);
            path.push(segment);
            if (segment[0] !== end) {
              cells.road[segment[0]] += score;
              cells.crossroad[segment[0]] += score;
            }
            if (current !== start) {
              cells.road[current] += score;
              cells.crossroad[current] += score;
            }
          }
          segment = [];
          prev = current;
        } else {
          if (prev) segment.push(prev);
          prev = null;
          segment.push(current);
        }
  
        cells.road[current] += score;
        if (current === start) break;
      }
  
      if (segment.length > 1) path.push(segment);
      return path;
    }
  
    // find water paths
    const findOceanPath = (start, exit = null, toRoute = null) => {
      const cells = this.pack.cells,
        temp = this.grid.cells.temp;
      const queue = new PriorityQueue({comparator: (a, b) => a.p - b.p});
      const cost = [],
        from = [];
      queue.queue({e: start, p: 0});
  
      while (queue.length) {
        const next = queue.dequeue(),
          n = next.e,
          p = next.p;
        if (toRoute && n !== start && cells.road[n]) return [from, n, true];
  
        for (const c of cells.c[n]) {
          if (c === exit) {
            from[c] = n;
            return [from, exit, true];
          }
          if (cells.h[c] >= 20) continue; // ignore land cells
          if (temp[cells.g[c]] <= -5) continue; // ignore cells with term <= -5
          const dist2 = (cells.p[c][1] - cells.p[n][1]) ** 2 + (cells.p[c][0] - cells.p[n][0]) ** 2;
          const totalCost = p + (cells.road[c] ? 1 + dist2 / 2 : dist2 + (cells.t[c] ? 1 : 100));
  
          if (from[c] || totalCost >= cost[c]) continue;
          (from[c] = n), (cost[c] = totalCost);
          queue.queue({e: c, p: totalCost});
        }
      }
      return [from, exit, false];
    }
  })();
  

  BurgsAndStates = (() => {
    let gauss = this.gauss;
    let getMiddlePoint = this.getMiddlePoint;
    let grid = this.grid;
    let rn = this.rn;
    let graphWidth = this.graphWidth;
    let graphHeight = this.graphHeight;
    let manorsInput = this.manorsInput;
    let pack = this.pack;
    let COA = this.COA;
    let P = this.P;
    let burgIcons = this.burgIcons;
    let burgLabels = this.burgLabels;
    let icons = this.icons;
    let anchors = this.anchors;
    let biomesData = this.biomesData;
    let findCell = this.findCell;
    let common = this.common;
    let defs = this.defs;
    let labels = this.labels;
    let toggleLabels = this.toggleLabels;
    let splitInTwo = this.splitInTwo;
    let getRandomColor = this.getRandomColor;
    let getMixedColor = this.getMixedColor;
    let Names = this.Names;
    let getAdjective = this.getAdjective;
    let options = this.options;
    let rw = this.rw;
    let trimVowels = this.trimVowels;
    let ra = this.ra;


  const generate = () => {
    const {cells, cultures} = this.pack;
    const n = cells.i.length;

    cells.burg = new Uint16Array(n); // cell burg
    cells.road = new Uint16Array(n); // cell road power
    cells.crossroad = new Uint16Array(n); // cell crossroad power

    const burgs = (this.pack.burgs = placeCapitals());
    this.pack.states = createStates();
    const capitalRoutes = this.Routes.getRoads();

    placeTowns();
    expandStates();
    normalizeStates();
    const townRoutes = this.Routes.getTrails();
    specifyBurgs();

    const oceanRoutes = this.Routes.getSearoutes();

    collectStatistics();
    assignColors();

    generateCampaigns();
    generateDiplomacy();
    console.log(capitalRoutes, townRoutes, oceanRoutes);
    this.Routes.draw(capitalRoutes, townRoutes, oceanRoutes);
    drawBurgs();

    function placeCapitals() {
      console.time("placeCapitals");
      let count = +this.regionsInput.value;
      let burgs: any[] = [0];

      const rand = () => 0.5 + Math.random() * 0.5;
      const score = new Int16Array(cells.s.map(s => s * rand())); // cell score for capitals placement
      const sorted = cells.i.filter((i:number) => score[i] > 0 && cells.culture[i]).sort((a, b) => score[b] - score[a]); // filtered and sorted array of indexes

      if (sorted.length < count * 10) {
        count = Math.floor(sorted.length / 10);
        if (!count) {
          console.warn(`There is no populated cells. Cannot generate states`);
          return burgs;
        } else {
          console.warn(`Not enough populated cells (${sorted.length}). Will generate only ${count} states`);
        }
      }

      let burgsTree = d3.quadtree();
      let spacing = (this.graphWidth + this.graphHeight) / 2 / count; // min distance between capitals

      for (let i = 0; burgs.length <= count; i++) {
        const cell = sorted[i];
        const [x, y] = cells.p[cell];

        if (burgsTree.find(x, y, spacing) === undefined) {
          burgs.push({cell, x, y});
          burgsTree.add([x, y]);
        }

        if (i === sorted.length - 1) {
          console.warn("Cannot place capitals with current spacing. Trying again with reduced spacing");
          burgsTree = d3.quadtree();
          i = -1;
          burgs = [0];
          spacing /= 1.2;
        }
      }

      burgs[0] = burgsTree;
      console.timeEnd("placeCapitals");
      return burgs;
    }

    // For each capital create a state
    function createStates() {
      console.time("createStates");
      const states: any[] = [{i: 0, name: "Neutrals"}];
      const colors = this.getColors(burgs.length - 1);
      const each5th = this.each(5);

      burgs.forEach(function (b, i) {
        if (!i) return; // skip first element

        // burgs data
        b.i = b.state = i;
        b.culture = cells.culture[b.cell];
        b.name = this.Names.getCultureShort(b.culture);
        b.feature = cells.f[b.cell];
        b.capital = 1;

        // states data
        const expansionism = this.rn(Math.random() * this.powerInput.value + 1, 1);
        const basename = b.name.length < 9 && each5th(b.cell) ? b.name : this.Names.getCultureShort(b.culture);
        const name = this.Names.getState(basename, b.culture);
        const type = cultures[b.culture].type;

        const coa = this.COA.generate(null, null, null, type);
        coa.shield = this.COA.getShield(b.culture, null);
        states.push({i, color: colors[i - 1], name, expansionism, capital: i, type, center: b.cell, culture: b.culture, coa});
        cells.burg[b.cell] = i;
      });

      console.timeEnd("createStates");
      return states;
    }

    // place secondary settlements based on geo and economical evaluation
    function placeTowns() {
      console.time("placeTowns");
      const score = new Int16Array(cells.s.map(s => s * gauss(1, 3, 0, 20, 3))); // a bit randomized cell score for towns placement
      const sorted = cells.i.filter((i:number) => !cells.burg[i] && score[i] > 0 && cells.culture[i]).sort((a, b) => score[b] - score[a]); // filtered and sorted array of indexes

      const desiredNumber = manorsInput.value == 1000 ? rn(sorted.length / 5 / (grid.points.length / 10000) ** 0.8) : manorsInput.valueAsNumber;
      const burgsNumber = Math.min(desiredNumber, sorted.length); // towns to generate
      let burgsAdded = 0;

      const burgsTree = burgs[0];
      let spacing = (graphWidth + graphHeight) / 150 / (burgsNumber ** 0.7 / 66); // min distance between towns

      while (burgsAdded < burgsNumber && spacing > 1) {
        for (let i = 0; burgsAdded < burgsNumber && i < sorted.length; i++) {
          if (cells.burg[sorted[i]]) continue;
          const cell = sorted[i],
            x = cells.p[cell][0],
            y = cells.p[cell][1];
          const s = spacing * gauss(1, 0.3, 0.2, 2, 2); // randomize to make placement not uniform
          if (burgsTree.find(x, y, s) !== undefined) continue; // to close to existing burg
          const burg = burgs.length;
          const culture = cells.culture[cell];
          const name = this.Names.getCulture(culture);
          burgs.push({cell, x, y, state: 0, i: burg, culture, name, capital: 0, feature: cells.f[cell]});
          burgsTree.add([x, y]);
          cells.burg[cell] = burg;
          burgsAdded++;
        }
        spacing *= 0.5;
      }

      if (manorsInput.value != 1000 && burgsAdded < desiredNumber) {
        console.error(`Cannot place all burgs. Requested ${desiredNumber}, placed ${burgsAdded}`);
      }

      burgs[0] = {name: undefined}; // do not store burgsTree anymore
      console.timeEnd("placeTowns");
    }
  };

  // define burg coordinates, coa, port status and define details
  const specifyBurgs = function () {
    console.time("specifyBurgs");
    const cells = pack.cells,
      vertices = pack.vertices,
      features = pack.features,
      temp = grid.cells.temp;

    for (const b of pack.burgs) {
      if (!b.i || b.lock) continue;
      const i = b.cell;

      // asign port status to some coastline burgs with temp > 0 °C
      const haven = cells.haven[i];
      if (haven && temp[cells.g[i]] > 0) {
        const f = cells.f[haven]; // water body id
        // port is a capital with any harbor OR town with good harbor
        const port = features[f].cells > 1 && ((b.capital && cells.harbor[i]) || cells.harbor[i] === 1);
        b.port = port ? f : 0; // port is defined by water body id it lays on
      } else b.port = 0;

      // define burg population (keep urbanization at about 10% rate)
      b.population = rn(Math.max((cells.s[i] + cells.road[i] / 2) / 8 + b.i / 1000 + (i % 100) / 1000, 0.1), 3);
      if (b.capital) b.population = rn(b.population * 1.3, 3); // increase capital population

      if (b.port) {
        b.population = b.population * 1.3; // increase port population
        const [x, y] = getMiddlePoint(i, haven);
        b.x = x;
        b.y = y;
      }

      // add random factor
      b.population = rn(b.population * gauss(2, 3, 0.6, 20, 3), 3);

      // shift burgs on rivers semi-randomly and just a bit
      if (!b.port && cells.r[i]) {
        const shift = Math.min(cells.fl[i] / 150, 1);
        if (i % 2) b.x = rn(b.x + shift, 2);
        else b.x = rn(b.x - shift, 2);
        if (cells.r[i] % 2) b.y = rn(b.y + shift, 2);
        else b.y = rn(b.y - shift, 2);
      }

      // define emblem
      const state = pack.states[b.state];
      const stateCOA = state.coa;
      let kinship = 0.25;
      if (b.capital) kinship += 0.1;
      else if (b.port) kinship -= 0.1;
      if (b.culture !== state.culture) kinship -= 0.25;
      b.type = getType(i, b.port);
      const type = b.capital && P(0.2) ? "Capital" : b.type === "Generic" ? "City" : b.type;
      b.coa = COA.generate(stateCOA, kinship, null, type);
      b.coa.shield = COA.getShield(b.culture, b.state);
    }

    // de-assign port status if it's the only one on feature
    const ports = pack.burgs.filter(b => !b.removed && b.port > 0);
    for (const f of features) {
      if (!f.i || f.land || f.border) continue;
      const featurePorts = ports.filter(b => b.port === f.i);
      if (featurePorts.length === 1) featurePorts[0].port = 0;
    }

    console.timeEnd("specifyBurgs");
  };

  const getType = function (i, port) {
    const cells = pack.cells;
    if (port) return "Naval";
    if (cells.haven[i] && pack.features[cells.f[cells.haven[i]]].type === "lake") return "Lake";
    if (cells.h[i] > 60) return "Highland";
    if (cells.r[i] && cells.r[i].length > 100 && cells.r[i].length >= pack.rivers[0].length) return "River";

    if (!cells.burg[i] || pack.burgs[cells.burg[i]].population < 6) {
      if (this.population < 5 && [1, 2, 3, 4].includes(cells.biome[i])) return "Nomadic";
      if (cells.biome[i] > 4 && cells.biome[i] < 10) return "Hunting";
    }

    return "Generic";
  };

  const defineBurgFeatures = function (newburg) {
    const cells = pack.cells;
    pack.burgs
      .filter(b => (newburg ? b.i == newburg.i : b.i && !b.removed))
      .forEach(b => {
        const pop = b.population;
        b.citadel = b.capital || (pop > 50 && P(0.75)) || P(0.5) ? 1 : 0;
        b.plaza = pop > 50 || (pop > 30 && P(0.75)) || (pop > 10 && P(0.5)) || P(0.25) ? 1 : 0;
        b.walls = b.capital || pop > 30 || (pop > 20 && P(0.75)) || (pop > 10 && P(0.5)) || P(0.2) ? 1 : 0;
        b.shanty = pop > 30 || (pop > 20 && P(0.75)) || (b.walls && P(0.75)) ? 1 : 0;
        const religion = cells.religion[b.cell];
        const theocracy = pack.states[b.state].form === "Theocracy";
        b.temple = (religion && theocracy) || pop > 50 || (pop > 35 && P(0.75)) || (pop > 20 && P(0.5)) ? 1 : 0;
      });
  };

  const drawBurgs = function () {
    console.time("drawBurgs");

    // remove old data
    burgIcons.selectAll("circle").remove();
    burgLabels.selectAll("text").remove();
    icons.selectAll("use").remove();

    // capitals
    const capitals = pack.burgs.filter(b => b.capital);
    const capitalIcons = burgIcons.select("#cities");
    const capitalLabels = burgLabels.select("#cities");
    const capitalSize = capitalIcons.attr("size") || 1;
    const capitalAnchors = anchors.selectAll("#cities");
    const caSize = capitalAnchors.attr("size") || 2;

    capitalIcons
      .selectAll("circle")
      .data(capitals)
      .enter()
      .append("circle")
      .attr("id", d => "burg" + d.i)
      .attr("data-id", d => d.i)
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("r", capitalSize);

    capitalLabels
      .selectAll("text")
      .data(capitals)
      .enter()
      .append("text")
      .attr("id", d => "burgLabel" + d.i)
      .attr("data-id", d => d.i)
      .attr("x", d => d.x)
      .attr("y", d => d.y)
      .attr("dy", `${capitalSize * -1.5}px`)
      .text(d => d.name);

    capitalAnchors
      .selectAll("use")
      .data(capitals.filter(c => c.port))
      .enter()
      .append("use")
      .attr("xlink:href", "#icon-anchor")
      .attr("data-id", d => d.i)
      .attr("x", d => rn(d.x - caSize * 0.47, 2))
      .attr("y", d => rn(d.y - caSize * 0.47, 2))
      .attr("width", caSize)
      .attr("height", caSize);

    // towns
    const towns = pack.burgs.filter(b => b.i && !b.capital);
    const townIcons = burgIcons.select("#towns");
    const townLabels = burgLabels.select("#towns");
    const townSize = townIcons.attr("size") || 0.5;
    const townsAnchors = anchors.selectAll("#towns");
    const taSize = townsAnchors.attr("size") || 1;

    townIcons
      .selectAll("circle")
      .data(towns)
      .enter()
      .append("circle")
      .attr("id", d => "burg" + d.i)
      .attr("data-id", d => d.i)
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("r", townSize);

    townLabels
      .selectAll("text")
      .data(towns)
      .enter()
      .append("text")
      .attr("id", d => "burgLabel" + d.i)
      .attr("data-id", d => d.i)
      .attr("x", d => d.x)
      .attr("y", d => d.y)
      .attr("dy", `${townSize * -1.5}px`)
      .text(d => d.name);

    townsAnchors
      .selectAll("use")
      .data(towns.filter(c => c.port))
      .enter()
      .append("use")
      .attr("xlink:href", "#icon-anchor")
      .attr("data-id", d => d.i)
      .attr("x", d => rn(d.x - taSize * 0.47, 2))
      .attr("y", d => rn(d.y - taSize * 0.47, 2))
      .attr("width", taSize)
      .attr("height", taSize);

    console.timeEnd("drawBurgs");
  };

  // growth algorithm to assign cells to states like we did for cultures
  const expandStates = function () {
    console.time("expandStates");
    const {cells, states, cultures, burgs} = pack;

    cells.state = new Uint16Array(cells.i.length);
    const queue = new PriorityQueue({comparator: (a, b) => a.p - b.p});
    const cost = [];
    const neutral = (cells.i.length / 5000) * 2500 * this.neutralInput.value * this.statesNeutral.value; // limit cost for state growth

    states
      .filter(s => s.i && !s.removed)
      .forEach(s => {
        const capitalCell = burgs[s.capital].cell;
        cells.state[capitalCell] = s.i;
        const cultureCenter = cultures[s.culture].center;
        const b = cells.biome[cultureCenter]; // state native biome
        queue.queue({e: s.center, p: 0, s: s.i, b});
        cost[s.center] = 1;
      });

    while (queue.length) {
      const next = queue.dequeue();
      const {e, p, s, b} = next;
      const {type, culture} = states[s];

      cells.c[e].forEach(e => {
        if (cells.state[e] && e === states[cells.state[e]].center) return; // do not overwrite capital cells

        const cultureCost = culture === cells.culture[e] ? -9 : 100;
        const populationCost = cells.h[e] < 20 ? 0 : cells.s[e] ? Math.max(20 - cells.s[e], 0) : 5000;
        const biomeCost = getBiomeCost(b, cells.biome[e], type);
        const heightCost = getHeightCost(pack.features[cells.f[e]], cells.h[e], type);
        const riverCost = getRiverCost(cells.r[e], e, type);
        const typeCost = getTypeCost(cells.t[e], type);
        const cellCost = Math.max(cultureCost + populationCost + biomeCost + heightCost + riverCost + typeCost, 0);
        const totalCost = p + 10 + cellCost / states[s].expansionism;

        if (totalCost > neutral) return;

        if (!cost[e] || totalCost < cost[e]) {
          if (cells.h[e] >= 20) cells.state[e] = s; // assign state to cell
          cost[e] = totalCost;
          queue.queue({e, p: totalCost, s, b});
        }
      });
    }

    burgs.filter(b => b.i && !b.removed).forEach(b => (b.state = cells.state[b.cell])); // assign state to burgs

    function getBiomeCost(b, biome, type) {
      if (b === biome) return 10; // tiny penalty for native biome
      if (type === "Hunting") return biomesData.cost[biome] * 2; // non-native biome penalty for hunters
      if (type === "Nomadic" && biome > 4 && biome < 10) return biomesData.cost[biome] * 3; // forest biome penalty for nomads
      return biomesData.cost[biome]; // general non-native biome penalty
    }

    function getHeightCost(f, h, type) {
      if (type === "Lake" && f.type === "lake") return 10; // low lake crossing penalty for Lake cultures
      if (type === "Naval" && h < 20) return 300; // low sea crossing penalty for Navals
      if (type === "Nomadic" && h < 20) return 10000; // giant sea crossing penalty for Nomads
      if (h < 20) return 1000; // general sea crossing penalty
      if (type === "Highland" && h < 62) return 1100; // penalty for highlanders on lowlands
      if (type === "Highland") return 0; // no penalty for highlanders on highlands
      if (h >= 67) return 2200; // general mountains crossing penalty
      if (h >= 44) return 300; // general hills crossing penalty
      return 0;
    }

    function getRiverCost(r, i, type) {
      if (type === "River") return r ? 0 : 100; // penalty for river cultures
      if (!r) return 0; // no penalty for others if there is no river
      return Math.min(Math.max(cells.fl[i] / 10, 20), 100); // river penalty from 20 to 100 based on flux
    }

    function getTypeCost(t, type) {
      if (t === 1) return type === "Naval" || type === "Lake" ? 0 : type === "Nomadic" ? 60 : 20; // penalty for coastline
      if (t === 2) return type === "Naval" || type === "Nomadic" ? 30 : 0; // low penalty for land level 2 for Navals and nomads
      if (t !== -1) return type === "Naval" || type === "Lake" ? 100 : 0; // penalty for mainland for navals
      return 0;
    }

    console.timeEnd("expandStates");
  };

  const normalizeStates = function () {
    console.time("normalizeStates");
    const cells = pack.cells,
      burgs = pack.burgs;

    for (const i of cells.i) {
      if (cells.h[i] < 20 || cells.burg[i]) continue; // do not overwrite burgs
      if (cells.c[i].some(c => burgs[cells.burg[c]].capital)) continue; // do not overwrite near capital
      const neibs = cells.c[i].filter(c => cells.h[c] >= 20);
      const adversaries = neibs.filter(c => cells.state[c] !== cells.state[i]);
      if (adversaries.length < 2) continue;
      const buddies = neibs.filter(c => cells.state[c] === cells.state[i]);
      if (buddies.length > 2) continue;
      if (adversaries.length <= buddies.length) continue;
      cells.state[i] = cells.state[adversaries[0]];
    }
    console.timeEnd("normalizeStates");
  };

  // Resets the cultures of all burgs and states to their
  // cell or center cell's (respectively) culture.
  const updateCultures = function () {
    console.time("updateCulturesForBurgsAndStates");

    // Assign the culture associated with the burgs cell.
    pack.burgs = pack.burgs.map((burg, index) => {
      // Ignore metadata burg
      if (index === 0) {
        return burg;
      }
      return {...burg, culture: pack.cells.culture[burg.cell]};
    });

    // Assign the culture associated with the states' center cell.
    pack.states = pack.states.map((state, index) => {
      // Ignore neutrals state
      if (index === 0) {
        return state;
      }
      return {...state, culture: pack.cells.culture[state.center]};
    });

    console.timeEnd("updateCulturesForBurgsAndStates");
  };

  // calculate and draw curved state labels for a list of states
  const drawStateLabels = (list) => {
    console.time("drawStateLabels");
    const {cells, features, states} = pack;
    const paths = []; // text paths
    let lineGen = this.lineGen;
    let round = this.round;
    this.lineGen.curve(d3.curveBundle.beta(1));

    for (const s of states) {
      if (!s.i || s.removed || !s.cells || (list && !list.includes(s.i))) continue;
      const used = [];
      const visualCenter = findCell(s.pole[0], s.pole[1]);
      const start = cells.state[visualCenter] === s.i ? visualCenter : s.center;
      const hull = getHull(start, s.i, s.cells / 10);
      const points = [...hull].map((v:number) => pack.vertices.p[v]);
      const delaunay = Delaunator.from(points);
      const voronoi = new Voronoi(delaunay, points, points.length);
      const chain = connectCenters(voronoi.vertices, s.pole[1]);
      const relaxed = chain.map(i => voronoi.vertices.p[i]).filter((p, i) => i % 15 === 0 || i + 1 === chain.length);
      paths.push([s.i, relaxed]);

      function getHull(start, state, maxLake) {
        const queue = [start],
          hull = new Set();

        while (queue.length) {
          const q = queue.pop();
          const nQ = cells.c[q].filter(c => cells.state[c] === state);

          cells.c[q].forEach(function (c, d) {
            const passableLake = features[cells.f[c]].type === "lake" && features[cells.f[c]].cells < maxLake;
            if (cells.b[c] || (cells.state[c] !== state && !passableLake)) {
              hull.add(cells.v[q][d]);
              return;
            }
            const nC = cells.c[c].filter(n => cells.state[n] === state);
            const intersected = common(nQ, nC).length;
            if (hull.size > 20 && !intersected && !passableLake) {
              hull.add(cells.v[q][d]);
              return;
            }
            if (used[c]) return;
            used[c] = 1;
            queue.push(c);
          });
        }

        return hull;
      }

      function connectCenters(c, y) {
        // check if vertex is inside the area
        const inside = c.p.map(function (p) {
          if (p[0] <= 0 || p[1] <= 0 || p[0] >= graphWidth || p[1] >= graphHeight) return false; // out of the screen
          return used[findCell(p[0], p[1])];
        });

        const pointsInside = d3.range(c.p.length).filter((i:number) => inside[i]);
        if (!pointsInside.length) return [0];
        const h = c.p.length < 200 ? 0 : c.p.length < 600 ? 0.5 : 1; // power of horyzontality shift
        const end = pointsInside[d3.scan(pointsInside, (a, b) => c.p[a][0] - c.p[b][0] + (Math.abs(c.p[a][1] - y) - Math.abs(c.p[b][1] - y)) * h)]; // left point
        const start = pointsInside[d3.scan(pointsInside, (a, b) => c.p[b][0] - c.p[a][0] - (Math.abs(c.p[b][1] - y) - Math.abs(c.p[a][1] - y)) * h)]; // right point

        // connect leftmost and rightmost points with shortest path
        const queue = new PriorityQueue({comparator: (a, b) => a.p - b.p});
        const cost = [],
          from = [];
        queue.queue({e: start, p: 0});

        while (queue.length) {
          const next = queue.dequeue(),
            n = next.e,
            p = next.p;
          if (n === end) break;

          for (const v of c.v[n]) {
            if (v === -1) continue;
            const totalCost = p + (inside[v] ? 1 : 100);
            if (from[v] || totalCost >= cost[v]) continue;
            cost[v] = totalCost;
            from[v] = n;
            queue.queue({e: v, p: totalCost});
          }
        }

        // restore path
        const chain = [end];
        let cur = end;
        while (cur !== start) {
          cur = from[cur];
          if (inside[cur]) chain.push(cur);
        }
        return chain;
      }
    }

    void (function drawLabels() {
      const g = labels.select("#states");
      const t = defs.select("#textPaths");

      if (!list) {
        // remove all labels and textpaths
        g.selectAll("text").remove();
        t.selectAll("path[id*='stateLabel']").remove();
      }

      const example = g.append("text").attr("x", 0).attr("x", 0).text("Average");
      const letterLength = example.node().getComputedTextLength() / 7; // average length of 1 letter

      paths.forEach(p => {
        const id = p[0];
        const s = states[p[0]];

        if (list) {
          t.select("#textPath_stateLabel" + id).remove();
          g.select("#stateLabel" + id).remove();
        }

        const path = p[1].length > 1 ? lineGen(p[1]) : `M${p[1][0][0] - 50},${p[1][0][1]}h${100}`;
        const textPath = t
          .append("path")
          .attr("d", path)
          .attr("id", "textPath_stateLabel" + id);
        const pathLength = p[1].length > 1 ? textPath.node().getTotalLength() / letterLength : 0; // path length in letters

        let lines = [];
        let ratio = 100;

        if (pathLength < s.name.length) {
          // only short name will fit
          lines = splitInTwo(s.name);
          ratio = Math.max(Math.min(rn((pathLength / lines[0].length) * 60), 150), 50);
        } else if (pathLength > s.fullName.length * 2.5) {
          // full name will fit in one line
          lines = [s.fullName];
          ratio = Math.max(Math.min(rn((pathLength / lines[0].length) * 70), 170), 70);
        } else {
          // try miltilined label
          lines = splitInTwo(s.fullName);
          ratio = Math.max(Math.min(rn((pathLength / lines[0].length) * 60), 150), 70);
        }

        // prolongate path if it's too short
        if (pathLength && pathLength < lines[0].length) {
          const points = p[1];
          const f = points[0];
          const l = points[points.length - 1];
          const [dx, dy] = [l[0] - f[0], l[1] - f[1]];
          const mod = Math.abs((letterLength * lines[0].length) / dx) / 2;
          points[0] = [rn(f[0] - dx * mod), rn(f[1] - dy * mod)];
          points[points.length - 1] = [rn(l[0] + dx * mod), rn(l[1] + dy * mod)];
          textPath.attr("d", round(lineGen(points)));
        }

        example.attr("font-size", ratio + "%");
        const top = (lines.length - 1) / -2; // y offset
        const spans = lines.map((l, d) => {
          example.text(l);
          const left = example.node().getBBox().width / -2; // x offset
          return `<tspan x="${left}px" dy="${d ? 1 : top}em">${l}</tspan>`;
        });

        const el = g
          .append("text")
          .attr("id", "stateLabel" + id)
          .append("textPath")
          .attr("xlink:href", "#textPath_stateLabel" + id)
          .attr("startOffset", "50%")
          .attr("font-size", ratio + "%")
          .node();

        el.insertAdjacentHTML("afterbegin", spans.join(""));
        if (lines.length < 2) return;

        // check whether multilined label is generally inside the state. If no, replace with short name label
        const cs = pack.cells.state;
        const b = el.parentNode.getBBox();
        const c1 = (): any => +cs[findCell(b.x, b.y)] === id;
        const c2 = (): any => +cs[findCell(b.x + b.width / 2, b.y)] === id;
        const c3 = () => +cs[findCell(b.x + b.width, b.y)] === id;
        const c4 = () => +cs[findCell(b.x + b.width, b.y + b.height)] === id;
        const c5 = () => +cs[findCell(b.x + b.width / 2, b.y + b.height)] === id;
        const c6 = () => +cs[findCell(b.x, b.y + b.height)] === id;
        if (c1() + c2() + c3() + c4() + c5() + c6() > 3) return; // generally inside

        // use one-line name
        const name = pathLength > s.fullName.length * 1.8 ? s.fullName : s.name;
        example.text(name);
        const left = example.node().getBBox().width / -2; // x offset
        el.innerHTML = `<tspan x="${left}px">${name}</tspan>`;
        ratio = Math.max(Math.min(rn((pathLength / name.length) * 60), 130), 40);
        el.setAttribute("font-size", ratio + "%");
      });

      example.remove();
      // if (!displayed) toggleLabels();
    })();

    console.timeEnd("drawStateLabels");
  };

  // calculate states data like area, population etc.
  const collectStatistics = function () {
    console.time("collectStatistics");
    const cells = pack.cells,
      states = pack.states;
    states.forEach(s => {
      if (s.removed) return;
      s.cells = s.area = s.burgs = s.rural = s.urban = 0;
      s.neighbors = new Set();
    });

    for (const i of cells.i) {
      if (cells.h[i] < 20) continue;
      const s = cells.state[i];

      // check for neighboring states
      cells.c[i].filter(c => cells.h[c] >= 20 && cells.state[c] !== s).forEach(c => states[s].neighbors.add(cells.state[c]));

      // collect stats
      states[s].cells += 1;
      states[s].area += cells.area[i];
      states[s].rural += cells.pop[i];
      if (cells.burg[i]) {
        states[s].urban += pack.burgs[cells.burg[i]].population;
        states[s].burgs++;
      }
    }

    // convert neighbors Set object into array
    states.forEach(s => {
      if (!s.neighbors) return;
      s.neighbors = Array.from(s.neighbors);
    });

    console.timeEnd("collectStatistics");
  };

  const assignColors = function () {
    console.time("assignColors");
    const colors = ["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854", "#ffd92f"]; // d3.schemeSet2;

    // assin basic color using greedy coloring algorithm
    pack.states.forEach(s => {
      if (!s.i || s.removed) return;
      const neibs = s.neighbors;
      s.color = colors.find(c => neibs.every(n => pack.states[n].color !== c));
      if (!s.color) s.color = getRandomColor();
      colors.push(colors.shift());
    });

    // randomize each already used color a bit
    colors.forEach(c => {
      const sameColored = pack.states.filter(s => s.color === c);
      sameColored.forEach((s, d) => {
        if (!d) return;
        s.color = getMixedColor(s.color);
      });
    });

    console.timeEnd("assignColors");
  };

  // generate historical conflicts of each state
  const generateCampaigns = function () {
    const wars = {War: 6, Conflict: 2, Campaign: 4, Invasion: 2, Rebellion: 2, Conquest: 2, Intervention: 1, Expedition: 1, Crusade: 1};

    pack.states.forEach(s => {
      if (!s.i || s.removed) return;
      const n = s.neighbors.length ? s.neighbors : [0];
      s.campaigns = n
        .map(i => {
          const name = i && P(0.8) ? pack.states[i].name : Names.getCultureShort(s.culture);
          const start = gauss(options.year - 100, 150, 1, options.year - 6);
          const end = start + gauss(4, 5, 1, options.year - start - 1);
          return {name: getAdjective(name) + " " + rw(wars), start, end};
        })
        .sort((a, b) => a.start - b.start);
    });
  };

  // generate Diplomatic Relationships
  const generateDiplomacy = function () {
    console.time("generateDiplomacy");
    const cells = pack.cells,
      states = pack.states;
    const chronicle = (states[0].diplomacy = []);
    const valid = states.filter(s => s.i && !states.removed);

    const neibs = {Ally: 1, Friendly: 2, Neutral: 1, Suspicion: 10, Rival: 9}; // relations to neighbors
    const neibsOfNeibs = {Ally: 10, Friendly: 8, Neutral: 5, Suspicion: 1}; // relations to neighbors of neighbors
    const far = {Friendly: 1, Neutral: 12, Suspicion: 2, Unknown: 6}; // relations to other
    const navals = {Neutral: 1, Suspicion: 2, Rival: 1, Unknown: 1}; // relations of naval powers

    valid.forEach(s => (s.diplomacy = new Array(states.length).fill("x"))); // clear all relationships
    if (valid.length < 2) return; // no states to renerate relations with
    const areaMean = d3.mean(valid.map(s => s.area)); // avarage state area

    // generic relations
    for (let f = 1; f < states.length; f++) {
      if (states[f].removed) continue;

      if (states[f].diplomacy.includes("Vassal")) {
        // Vassals copy relations from their Suzerains
        const suzerain = states[f].diplomacy.indexOf("Vassal");

        for (let i = 1; i < states.length; i++) {
          if (i === f || i === suzerain) continue;
          states[f].diplomacy[i] = states[suzerain].diplomacy[i];
          if (states[suzerain].diplomacy[i] === "Suzerain") states[f].diplomacy[i] = "Ally";
          for (let e = 1; e < states.length; e++) {
            if (e === f || e === suzerain) continue;
            if (states[e].diplomacy[suzerain] === "Suzerain" || states[e].diplomacy[suzerain] === "Vassal") continue;
            states[e].diplomacy[f] = states[e].diplomacy[suzerain];
          }
        }
        continue;
      }

      for (let t = f + 1; t < states.length; t++) {
        if (states[t].removed) continue;

        if (states[t].diplomacy.includes("Vassal")) {
          const suzerain = states[t].diplomacy.indexOf("Vassal");
          states[f].diplomacy[t] = states[f].diplomacy[suzerain];
          continue;
        }

        const naval = states[f].type === "Naval" && states[t].type === "Naval" && cells.f[states[f].center] !== cells.f[states[t].center];
        const neib = naval ? false : states[f].neighbors.includes(t);
        const neibOfNeib =
          naval || neib
            ? false
            : states[f].neighbors
                .map(n => states[n].neighbors)
                .join("")
                .includes(t);

        let status = naval ? rw(navals) : neib ? rw(neibs) : neibOfNeib ? rw(neibsOfNeibs) : rw(far);

        // add Vassal
        if (neib && P(0.8) && states[f].area > areaMean && states[t].area < areaMean && states[f].area / states[t].area > 2) status = "Vassal";
        states[f].diplomacy[t] = status === "Vassal" ? "Suzerain" : status;
        states[t].diplomacy[f] = status;
      }
    }

    // declare wars
    for (let attacker = 1; attacker < states.length; attacker++) {
      const ad = states[attacker].diplomacy; // attacker relations;
      if (states[attacker].removed) continue;
      if (!ad.includes("Rival")) continue; // no rivals to attack
      if (ad.includes("Vassal")) continue; // not independent
      if (ad.includes("Enemy")) continue; // already at war

      // random independent rival
      const defender = ra(ad.map((r, d) => (r === "Rival" && !states[d].diplomacy.includes("Vassal") ? d : 0)).filter(d => d));
      let ap = states[attacker].area * states[attacker].expansionism,
        dp = states[defender].area * states[defender].expansionism;
      if (ap < dp * gauss(1.6, 0.8, 0, 10, 2)) continue; // defender is too strong
      const an = states[attacker].name,
        dn = states[defender].name; // names
      const attackers = [attacker],
        defenders = [defender]; // attackers and defenders array
      const dd = states[defender].diplomacy; // defender relations;

      // start a war
      const war = [`${an}-${trimVowels(dn)}ian War`, `${an} declared a war on its rival ${dn}`];
      const end = options.year;
      const start = end - gauss(2, 2, 0, 5);
      states[attacker].campaigns.push({name: `${trimVowels(dn)}ian War`, start, end});
      states[defender].campaigns.push({name: `${trimVowels(an)}ian War`, start, end});

      // attacker vassals join the war
      ad.forEach((r, d) => {
        if (r === "Suzerain") {
          attackers.push(d);
          war.push(`${an}'s vassal ${states[d].name} joined the war on attackers side`);
        }
      });

      // defender vassals join the war
      dd.forEach((r, d) => {
        if (r === "Suzerain") {
          defenders.push(d);
          war.push(`${dn}'s vassal ${states[d].name} joined the war on defenders side`);
        }
      });

      ap = d3.sum(attackers.map(a => states[a].area * states[a].expansionism)); // attackers joined power
      dp = d3.sum(defenders.map(d => states[d].area * states[d].expansionism)); // defender joined power

      // defender allies join
      dd.forEach((r, d) => {
        if (r !== "Ally" || states[d].diplomacy.includes("Vassal")) return;
        if (states[d].diplomacy[attacker] !== "Rival" && ap / dp > 2 * gauss(1.6, 0.8, 0, 10, 2)) {
          const reason = states[d].diplomacy.includes("Enemy") ? `Being already at war,` : `Frightened by ${an},`;
          war.push(`${reason} ${states[d].name} severed the defense pact with ${dn}`);
          dd[d] = states[d].diplomacy[defender] = "Suspicion";
          return;
        }
        defenders.push(d);
        dp += states[d].area * states[d].expansionism;
        war.push(`${dn}'s ally ${states[d].name} joined the war on defenders side`);

        // ally vassals join
        states[d].diplomacy
          .map((r, d) => (r === "Suzerain" ? d : 0))
          .filter(d => d)
          .forEach(v => {
            defenders.push(v);
            dp += states[v].area * states[v].expansionism;
            war.push(`${states[d].name}'s vassal ${states[v].name} joined the war on defenders side`);
          });
      });

      // attacker allies join if the defender is their rival or joined power > defenders power and defender is not an ally
      ad.forEach((r, d) => {
        if (r !== "Ally" || states[d].diplomacy.includes("Vassal") || defenders.includes(d)) return;
        const name = states[d].name;
        if (states[d].diplomacy[defender] !== "Rival" && (P(0.2) || ap <= dp * 1.2)) {
          war.push(`${an}'s ally ${name} avoided entering the war`);
          return;
        }
        const allies = states[d].diplomacy.map((r, d) => (r === "Ally" ? d : 0)).filter(d => d);
        if (allies.some(ally => defenders.includes(ally))) {
          war.push(`${an}'s ally ${name} did not join the war as its allies are in war on both sides`);
          return;
        }

        attackers.push(d);
        ap += states[d].area * states[d].expansionism;
        war.push(`${an}'s ally ${name} joined the war on attackers side`);

        // ally vassals join
        states[d].diplomacy
          .map((r, d) => (r === "Suzerain" ? d : 0))
          .filter(d => d)
          .forEach(v => {
            attackers.push(v);
            dp += states[v].area * states[v].expansionism;
            war.push(`${states[d].name}'s vassal ${states[v].name} joined the war on attackers side`);
          });
      });

      // change relations to Enemy for all participants
      attackers.forEach(a => defenders.forEach(d => (states[a].diplomacy[d] = states[d].diplomacy[a] = "Enemy")));
      chronicle.push(war); // add a record to diplomatical history
    }

    console.timeEnd("generateDiplomacy");
    //console.table(states.map(s => s.diplomacy));
  };
  let rand = this.rand;

  // select a forms for listed or all valid states
  const defineStateForms = function (list) {
    console.time("defineStateForms");
    const states = pack.states.filter(s => s.i && !s.removed);
    if (states.length < 1) return;

    const generic = {Monarchy: 25, Republic: 2, Union: 1};
    const naval = {Monarchy: 25, Republic: 8, Union: 3};

    const median = d3.median(pack.states.map(s => s.area));
    const empireMin = states.map(s => s.area).sort((a, b) => b - a)[Math.max(Math.ceil(states.length ** 0.4) - 2, 0)];
    const expTiers = pack.states.map(s => {
      let tier = Math.min(Math.floor((s.area / median) * 2.6), 4);
      if (tier === 4 && s.area < empireMin) tier = 3;
      return tier;
    });

    const monarchy = ["Duchy", "Grand Duchy", "Principality", "Kingdom", "Empire"]; // per expansionism tier
    const republic = {Republic: 75, Federation: 4, Oligarchy: 2, "Most Serene Republic": 2, Tetrarchy: 1, Triumvirate: 1, Diarchy: 1, "Trade Company": 4, Junta: 1}; // weighted random
    const union = {Union: 3, League: 4, Confederation: 1, "United Kingdom": 1, "United Republic": 1, "United Provinces": 2, Commonwealth: 1, Heptarchy: 1}; // weighted random
    const theocracy = {Theocracy: 20, Brotherhood: 1, Thearchy: 2, See: 1, "Holy State": 1};
    const anarchy = {"Free Territory": 2, Council: 3, Commune: 1, Community: 1};

    for (const s of states) {
      if (list && !list.includes(s.i)) continue;
      const tier = expTiers[s.i];

      const religion = pack.cells.religion[s.center];
      const isTheocracy = (religion && pack.religions[religion].expansion === "state") || (P(0.1) && ["Organized", "Cult"].includes(pack.religions[religion].type));
      const isAnarchy = P(0.01 - tier / 500);

      if (isTheocracy) s.form = "Theocracy";
      else if (isAnarchy) s.form = "Anarchy";
      else s.form = s.type === "Naval" ? rw(naval) : rw(generic);
      s.formName = selectForm(s, tier);
      s.fullName = getFullName(s);
    }

    function selectForm(s, tier) {
      const base = pack.cultures[s.culture].base;

      if (s.form === "Monarchy") {
        const form = monarchy[tier];
        // Default name depends on exponent tier, some culture bases have special names for tiers
        if (s.diplomacy) {
          if (form === "Duchy" && s.neighbors.length > 1 && rand(1,6) < s.neighbors.length && s.diplomacy.includes("Vassal")) return "Marches"; // some vassal dutchies on borderland
          if (base === 1 && P(0.3) && s.diplomacy.includes("Vassal")) return "Dominion"; // English vassals
          if (P(0.3) && s.diplomacy.includes("Vassal")) return "Protectorate"; // some vassals
        }

        if (base === 16 && (form === "Empire" || form === "Kingdom")) return "Sultanate"; // Turkic
        if (base === 5 && (form === "Empire" || form === "Kingdom")) return "Tsardom"; // Ruthenian
        if ([16, 31].includes(base) && (form === "Empire" || form === "Kingdom")) return "Khaganate"; // Turkic, Mongolian
        if (base === 12 && (form === "Kingdom" || form === "Grand Duchy")) return "Shogunate"; // Japanese
        if ([18, 17].includes(base) && form === "Empire") return "Caliphate"; // Arabic, Berber
        if (base === 18 && (form === "Grand Duchy" || form === "Duchy")) return "Emirate"; // Arabic
        if (base === 7 && (form === "Grand Duchy" || form === "Duchy")) return "Despotate"; // Greek
        if (base === 31 && (form === "Grand Duchy" || form === "Duchy")) return "Ulus"; // Mongolian
        if (base === 16 && (form === "Grand Duchy" || form === "Duchy")) return "Horde"; // Turkic
        if (base === 24 && (form === "Grand Duchy" || form === "Duchy")) return "Satrapy"; // Iranian
        return form;
      }

      if (s.form === "Republic") {
        // Default name is from weighted array, special case for small states with only 1 burg
        if (tier < 2 && s.burgs === 1) {
          if (trimVowels(s.name) === trimVowels(pack.burgs[s.capital].name)) {
            s.name = pack.burgs[s.capital].name;
            return "Free City";
          }
          if (P(0.3)) return "City-state";
        }
        return rw(republic);
      }

      if (s.form === "Union") return rw(union);
      if (s.form === "Anarchy") return rw(anarchy);

      if (s.form === "Theocracy") {
        // European
        if ([0, 1, 2, 3, 4, 6, 8, 9, 13, 15, 20].includes(base)) {
          if (P(0.1)) return "Divine " + monarchy[tier];
          if (tier < 2 && P(0.5)) return "Diocese";
          if (tier < 2 && P(0.5)) return "Bishopric";
        }
        if (tier < 2 && P(0.9) && [7, 5].includes(base)) return "Eparchy"; // Greek, Ruthenian
        if (P(0.9) && [21, 16].includes(base)) return "Imamah"; // Nigerian, Turkish
        if (tier > 2 && P(0.8) && [18, 17, 28].includes(base)) return "Caliphate"; // Arabic, Berber, Swahili
        return rw(theocracy);
      }
    }

    console.timeEnd("defineStateForms");
  };

  // state forms requiring Adjective + Name, all other forms use scheme Form + Of + Name
  const adjForms = ["Empire", "Sultanate", "Khaganate", "Shogunate", "Caliphate", "Despotate", "Theocracy", "Oligarchy", "Union", "Confederation", "Trade Company", "League", "Tetrarchy", "Triumvirate", "Diarchy", "Horde", "Marches"];

  const getFullName = function (s) {
    if (!s.formName) return s.name;
    if (!s.name && s.formName) return "The " + s.formName;
    const adjName = adjForms.includes(s.formName) && !/-| /.test(s.name);
    return adjName ? `${getAdjective(s.name)} ${s.formName}` : `${s.formName} of ${s.name}`;
  };
let seed = this.seed;
let provincesInput = this.provincesInput;
  const generateProvinces = function (regenerate) {
    console.time("generateProvinces");
    const localSeed = regenerate ? Math.floor(Math.random() * 1e9).toString() : seed;
    Math.random = aleaPRNG(localSeed);

    const cells = pack.cells,
      states = pack.states,
      burgs = pack.burgs;
    const provinces: any = (pack.provinces = [0]);
    cells.province = new Uint16Array(cells.i.length); // cell state
    const percentage = +provincesInput.value;
    if (states.length < 2 || !percentage) {
      states.forEach(s => (s.provinces = []));
      return;
    } // no provinces
    const max = percentage == 100 ? 1000 : gauss(20, 5, 5, 100) * percentage ** 0.5; // max growth

    const forms = {
      Monarchy: {County: 11, Earldom: 3, Shire: 1, Landgrave: 1, Margrave: 1, Barony: 1},
      Republic: {Province: 6, Department: 2, Governorate: 2, District: 1, Canton: 1, Prefecture: 1},
      Theocracy: {Parish: 3, Deanery: 1},
      Union: {Province: 1, State: 1, Canton: 1, Republic: 1, County: 1, Council: 1},
      Anarchy: {Council: 1, Commune: 1, Community: 1, Tribe: 1},
      Wild: {Territory: 10, Land: 5, Region: 2, Tribe: 1, Clan: 1, Dependency: 1, Area: 1}
    };

    // generate provinces for a selected burgs
    Math.random = aleaPRNG(localSeed);
    states.forEach(s => {
      s.provinces = [];
      if (!s.i || s.removed) return;
      const stateBurgs = burgs
        .filter(b => b.state === s.i && !b.removed)
        .sort((a, b) => b.population * gauss(1, 0.2, 0.5, 1.5, 3) - a.population)
        .sort((a, b) => b.capital - a.capital);
      if (stateBurgs.length < 2) return; // at least 2 provinces are required
      const provincesNumber = Math.max(Math.ceil((stateBurgs.length * percentage) / 100), 2);
      const form = Object.assign({}, forms[s.form]);

      for (let i = 0; i < provincesNumber; i++) {
        const province = provinces.length;
        s.provinces.push(province);
        const center = stateBurgs[i].cell;
        const burg = stateBurgs[i].i;
        const c = stateBurgs[i].culture;
        const nameByBurg = P(0.5);
        const name = nameByBurg ? stateBurgs[i].name : Names.getState(Names.getCultureShort(c), c);
        const formName = rw(form);
        form[formName] += 10;
        const fullName = name + " " + formName;
        const color = getMixedColor(s.color);
        const kinship = nameByBurg ? 0.8 : 0.4;
        const type = getType(center, burg.port);
        const coa = COA.generate(stateBurgs[i].coa, kinship, null, type);
        coa.shield = COA.getShield(c, s.i);
        provinces.push({i: province, state: s.i, center, burg, name, formName, fullName, color, coa});
      }
    });

    // expand generated provinces
    const queue = new PriorityQueue({comparator: (a, b) => a.p - b.p});
    const cost = [];
    provinces.forEach(function (p) {
      if (!p.i || p.removed) return;
      cells.province[p.center] = p.i;
      queue.queue({e: p.center, p: 0, province: p.i, state: p.state});
      cost[p.center] = 1;
    });

    while (queue.length) {
      const next = queue.dequeue(),
        n = next.e,
        p = next.p,
        province = next.province,
        state = next.state;
      cells.c[n].forEach(function (e) {
        const land = cells.h[e] >= 20;
        if (!land && !cells.t[e]) return; // cannot pass deep ocean
        if (land && cells.state[e] !== state) return;
        const evevation = cells.h[e] >= 70 ? 100 : cells.h[e] >= 50 ? 30 : cells.h[e] >= 20 ? 10 : 100;
        const totalCost = p + evevation;

        if (totalCost > max) return;
        if (!cost[e] || totalCost < cost[e]) {
          if (land) cells.province[e] = province; // assign province to a cell
          cost[e] = totalCost;
          queue.queue({e, p: totalCost, province, state});
        }
      });
    }

    // justify provinces shapes a bit
    for (const i of cells.i) {
      if (cells.burg[i]) continue; // do not overwrite burgs
      const neibs = cells.c[i].filter(c => cells.state[c] === cells.state[i]).map(c => cells.province[c]);
      const adversaries = neibs.filter(c => c !== cells.province[i]);
      if (adversaries.length < 2) continue;
      const buddies = neibs.filter(c => c === cells.province[i]).length;
      if (buddies.length > 2) continue;
      const competitors = adversaries.map(p => adversaries.reduce((s, v) => (v === p ? s + 1 : s), 0));
      const max = d3.max(competitors);
      if (buddies >= max) continue;
      cells.province[i] = adversaries[competitors.indexOf(max)];
    }

    // add "wild" provinces if some cells don't have a province assigned
    const noProvince = Array.from(cells.i).filter((i:number) => cells.state[i] && !cells.province[i]); // cells without province assigned
    states.forEach(s => {
      if (!s.provinces.length) return;
      let stateNoProvince = noProvince.filter((i:number) => cells.state[i] === s.i && !cells.province[i]);
      while (stateNoProvince.length) {
        // add new province
        const province = provinces.length;
        const burgCell: any = stateNoProvince.find((i:number) => cells.burg[i]);
        const center = burgCell ? burgCell : stateNoProvince[0];
        const burg = burgCell ? cells.burg[burgCell] : 0;
        cells.province[center] = province;

        // expand province
        const cost = [];
        cost[center] = 1;
        queue.queue({e: center, p: 0});
        while (queue.length) {
          const next = queue.dequeue(),
            n = next.e,
            p = next.p;

          cells.c[n].forEach(function (e) {
            if (cells.province[e]) return;
            const land = cells.h[e] >= 20;
            if (cells.state[e] && cells.state[e] !== s.i) return;
            const ter = land ? (cells.state[e] === s.i ? 3 : 20) : cells.t[e] ? 10 : 30;
            const totalCost = p + ter;

            if (totalCost > max) return;
            if (!cost[e] || totalCost < cost[e]) {
              if (land && cells.state[e] === s.i) cells.province[e] = province; // assign province to a cell
              cost[e] = totalCost;
              queue.queue({e, p: totalCost});
            }
          });
        }

        // generate "wild" province name
        const c = cells.culture[center];
        const nameByBurg = burgCell && P(0.5);
        const name = nameByBurg ? burgs[burg].name : Names.getState(Names.getCultureShort(c), c);
        const f = pack.features[cells.f[center]];
        const provCells = stateNoProvince.filter((i:number) => cells.province[i] === province);
        const singleIsle = provCells.length === f.cells && !provCells.find((i:any) => cells.f[i] !== f.i);
        const isleGroup = !singleIsle && !provCells.find((i:any) => pack.features[cells.f[i]].group !== "isle");
        const colony = !singleIsle && !isleGroup && P(0.5) && !isPassable(s.center, center);
        const formName = singleIsle ? "Island" : isleGroup ? "Islands" : colony ? "Colony" : rw(forms["Wild"]);
        const fullName = name + " " + formName;
        const color = getMixedColor(s.color);
        const dominion = colony ? P(0.95) : singleIsle || isleGroup ? P(0.7) : P(0.3);
        const kinship = dominion ? 0 : 0.4;
        const type = getType(center, burgs[burg]?.port);
        const coa = COA.generate(s.coa, kinship, dominion, type);
        coa.shield = COA.getShield(c, s.i);
        provinces.push({i: province, state: s.i, center, burg, name, formName, fullName, color, coa});
        s.provinces.push(province);

        // check if there is a land way within the same state between two cells
        function isPassable(from, to) {
          if (cells.f[from] !== cells.f[to]) return false; // on different islands
          const queue = [from],
            used = new Uint8Array(cells.i.length),
            state = cells.state[from];
          while (queue.length) {
            const current = queue.pop();
            if (current === to) return true; // way is found
            cells.c[current].forEach(c => {
              if (used[c] || cells.h[c] < 20 || cells.state[c] !== state) return;
              queue.push(c);
              used[c] = 1;
            });
          }
          return false; // way is not found
        }

        // re-check
        stateNoProvince = noProvince.filter((i:number) => cells.state[i] === s.i && !cells.province[i]);
      }
    });

    console.timeEnd("generateProvinces");
  };

  return {generate, expandStates, normalizeStates, assignColors, drawBurgs, specifyBurgs, defineBurgFeatures, getType, drawStateLabels, collectStatistics, generateCampaigns, generateDiplomacy, defineStateForms, getFullName, generateProvinces, updateCultures};
})();

changeZoomExtent = (value) => {
  console.log(value);
  const min = Math.max(+this.zoomExtentMin.value, 0.01),
    max = Math.min(+this.zoomExtentMax.value, 200);
  this.zoom.scaleExtent([min, max]);
  const scale = Math.max(Math.min(+value, 200), 0.01);
  this.zoom.scaleTo(this.svg, scale);
}

// control stored options logic
// function applyStoredOptions() {
//   if (!localStorage.getItem("mapWidth") || !localStorage.getItem("mapHeight")) {
//     mapWidthInput.value = window.innerWidth;
//     mapHeightInput.value = window.innerHeight;
//   }

//   if (localStorage.getItem("distanceUnit")) applyOption(distanceUnitInput, localStorage.getItem("distanceUnit"));
//   if (localStorage.getItem("heightUnit")) applyOption(heightUnit, localStorage.getItem("heightUnit"));

//   for (let i = 0; i < localStorage.length; i++) {
//     const stored = localStorage.key(i);
//     const value = localStorage.getItem(stored);

//     if (stored === "speakerVoice") continue;
//     const input = document.getElementById(stored + "Input") || document.getElementById(stored);
//     const output = document.getElementById(stored + "Output");
//     if (input) input.value = value;
//     if (output) output.value = value;
//     lock(stored);

//     // add saved style presets to options
//     if (stored.slice(0, 5) === "style") applyOption(stylePreset, stored, stored.slice(5));
//   }

//   if (localStorage.getItem("winds"))
//     options.winds = localStorage
//       .getItem("winds")
//       .split(",")
//       .map(w => +w);
//   if (localStorage.getItem("military")) options.military = JSON.parse(localStorage.getItem("military"));

//   changeDialogsTransparency(localStorage.getItem("transparency") || 5);
//   if (localStorage.getItem("tooltipSize")) changeTooltipSize(localStorage.getItem("tooltipSize"));
//   if (localStorage.getItem("regions")) changeStatesNumber(localStorage.getItem("regions"));

//   uiSizeInput.max = uiSizeOutput.max = getUImaxSize();
//   if (localStorage.getItem("uiSize")) changeUIsize(localStorage.getItem("uiSize"));
//   else changeUIsize(Math.max(Math.min(rn(mapWidthInput.value / 1280, 1), 2.5), 1));

//   // search params overwrite stored and default options
//   const params = new URL(window.location.href).searchParams;
//   const width = +params.get("width");
//   const height = +params.get("height");
//   if (width) mapWidthInput.value = width;
//   if (height) mapHeightInput.value = height;

//   // set shape rendering
//   viewbox.attr("shape-rendering", shapeRendering.value);
// }


// just apply canvas size that was already set

// function applyMapSize() {
//   const zoomMin = +zoomExtentMin.value,
//     zoomMax = +zoomExtentMax.value;
//   graphWidth = +mapWidthInput.value;
//   graphHeight = +mapHeightInput.value;
//   svgWidth = Math.min(graphWidth, window.innerWidth);
//   svgHeight = Math.min(graphHeight, window.innerHeight);
//   svg.attr("width", svgWidth).attr("height", svgHeight);
//   zoom
//     .translateExtent([
//       [0, 0],
//       [graphWidth, graphHeight]
//     ])
//     .scaleExtent([zoomMin, zoomMax])
//     .scaleTo(svg, zoomMin);
// }


// Scale bar
drawScaleBar = () =>{
  if (this.scaleBar.style("display") === "none") return; // no need to re-draw hidden element
  this.scaleBar.selectAll("*").remove(); // fully redraw every time

  const dScale = this.distanceScaleInput;
  const unit = 'mi';

  // calculate size
  const init = 100; // actual length in pixels if scale, dScale and size = 1;
  const size = +this.barSizeInput;
  let val = (init * size * dScale) / this.scale; // bar length in distance unit
  if (val > 900) val = this.rn(val, -3);
  // round to 1000
  else if (val > 90) val = this.rn(val, -2);
  // round to 100
  else if (val > 9) val = this.rn(val, -1);
  // round to 10
  else val = this.rn(val); // round to 1
  const l = (val * this.scale) / dScale; // actual length in pixels on this scale

  this.scaleBar
    .append("line")
    .attr("x1", 0.5)
    .attr("y1", 0)
    .attr("x2", l + size - 0.5)
    .attr("y2", 0)
    .attr("stroke-width", size)
    .attr("stroke", "white");
    this.scaleBar
    .append("line")
    .attr("x1", 0)
    .attr("y1", size)
    .attr("x2", l + size)
    .attr("y2", size)
    .attr("stroke-width", size)
    .attr("stroke", "#3d3d3d");
  const dash = size + " " + this.rn(l / 5 - size, 2);
  this.scaleBar
    .append("line")
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", l + size)
    .attr("y2", 0)
    .attr("stroke-width", this.rn(size * 3, 2))
    .attr("stroke-dasharray", dash)
    .attr("stroke", "#3d3d3d");

  const fontSize = this.rn(5 * size, 1);
  this.scaleBar
    .selectAll("text")
    .data(d3.range(0, 6))
    .enter()
    .append("text")
    .attr("x", d => this.rn((d * l) / 5, 2))
    .attr("y", 0)
    .attr("dy", "-.5em")
    .attr("font-size", fontSize)
    .text(d => this.rn((((d * l) / 5) * dScale) / this.scale) + (d < 5 ? "" : " " + unit));

  if (this.barLabel !== "") {
    this.scaleBar
      .append("text")
      .attr("x", (l + 1) / 2)
      .attr("y", 2 * size)
      .attr("dominant-baseline", "text-before-edge")
      .attr("font-size", fontSize)
      .text(this.barLabel);
  }

  const bbox = this.scaleBar.node().getBBox();
  // append backbround rectangle
  this.scaleBar
    .insert("rect", ":first-child")
    .attr("x", -10)
    .attr("y", -20)
    .attr("width", bbox.width + 10)
    .attr("height", bbox.height + 15)
    .attr("stroke-width", size)
    .attr("stroke", "none")
    .attr("filter", "url(#blur5)")
    .attr("fill", this.barBackColor)
    .attr("opacity", +this.barBackOpacity);

    this.fitScaleBar();
}

// fit ScaleBar to canvas size
fitScaleBar = () => {
  if (!this.scaleBar.select("rect").size() || this.scaleBar.style("display") === "none") return;
  const px = isNaN(+this.barPosX) ? 0.99 : this.barPosX / 100;
  const py = isNaN(+this.barPosY) ? 0.99 : this.barPosY / 100;
  const bbox = this.scaleBar.select("rect").node().getBBox();
  const x = this.rn(this.svgWidth * px - bbox.width + 10),
    y = this.rn(this.svgHeight * py - bbox.height + 20);
    this.scaleBar.attr("transform", `translate(${x},${y})`);
}

getDefaultPresets() {
  return {
    political: ["toggleBorders", "toggleIcons", "toggleIce", "toggleLabels", "toggleRivers", "toggleRoutes", "toggleScaleBar", "toggleStates"],
    cultural: ["toggleBorders", "toggleCultures", "toggleIcons", "toggleLabels", "toggleRivers", "toggleRoutes", "toggleScaleBar"],
    religions: ["toggleBorders", "toggleIcons", "toggleLabels", "toggleReligions", "toggleRivers", "toggleRoutes", "toggleScaleBar"],
    provinces: ["toggleBorders", "toggleIcons", "toggleProvinces", "toggleRivers", "toggleScaleBar"],
    biomes: ["toggleBiomes", "toggleIce", "toggleRivers", "toggleScaleBar"],
    heightmap: ["toggleHeight", "toggleRivers"],
    physical: ["toggleCoordinates", "toggleHeight", "toggleIce", "toggleRivers", "toggleScaleBar"],
    poi: ["toggleBorders", "toggleHeight", "toggleIce", "toggleIcons", "toggleMarkers", "toggleRivers", "toggleRoutes", "toggleScaleBar"],
    military: ["toggleBorders", "toggleIcons", "toggleLabels", "toggleMilitary", "toggleRivers", "toggleRoutes", "toggleScaleBar", "toggleStates"],
    emblems: ["toggleBorders", "toggleIcons", "toggleIce", "toggleEmblems", "toggleRivers", "toggleRoutes", "toggleScaleBar", "toggleStates"],
    landmass: ["toggleScaleBar"]
  };
}

restoreCustomPresets = () => {
  this.presets = this.getDefaultPresets();
  const storedPresets = JSON.parse(localStorage.getItem("presets"));
  if (!storedPresets) return;

  for (const preset in storedPresets) {
    if (this.presets[preset]) continue;
    // this.layersPreset.add(new Option(preset, preset));
  }

  this.presets = storedPresets;
}


layerSwitches(currentLayers, newLayers) {
  let turnOn = newLayers.filter((n) => {
      return !(currentLayers.indexOf(n) + 1);
  });
  let turnOff = currentLayers.filter((c) => {
      return !(newLayers.indexOf(c) + 1);
  });
  return [turnOn, turnOff];
}

// toggle layers on preset change
changePreset(preset) {
  const layerSwitches = this.layerSwitches(this.presets[this.preset], this.presets[preset]);
  this.preset = preset;
  localStorage.setItem("preset", preset);
  layerSwitches[0].forEach((layer) => {
    this[layer](1)
  });
  layerSwitches[1].forEach((layer) => {
    this[layer](0)
  });
}

toggleHeight = (bool) => {
  if (!this.terrs.selectAll("*").size() && bool) {
    this.drawHeightmap();
  } else {
    this.terrs.selectAll("*").remove();
  }
}

drawHeightmap() {
  console.time("drawHeightmap");
  this.terrs.selectAll("*").remove();
  const cells = this.pack.cells,
    vertices = this.pack.vertices,
    n = cells.i.length;
  const used = new Uint8Array(cells.i.length);
  const paths = new Array(101).fill("");

  const scheme = this.getColorScheme();
  const terracing = this.terrs.attr("terracing") / 10; // add additional shifted darker layer for pseudo-3d effect
  const skip = +this.terrs.attr("skip") + 1;
  const simplification = +this.terrs.attr("relax");
  switch (+this.terrs.attr("curve")) {
    case 0:
      this.lineGen.curve(d3.curveBasisClosed);
      break;
    case 1:
      this.lineGen.curve(d3.curveLinear);
      break;
    case 2:
      this.lineGen.curve(d3.curveStep);
      break;
    default:
      this.lineGen.curve(d3.curveBasisClosed);
  }

  let currentLayer = 20;
  const heights = cells.i.sort((a, b) => cells.h[a] - cells.h[b]);
  for (const i of heights) {
    const h = cells.h[i];
    if (h > currentLayer) currentLayer += skip;
    if (currentLayer > 100) break; // no layers possible with height > 100
    if (h < currentLayer) continue;
    if (used[i]) continue; // already marked
    const onborder = cells.c[i].some(n => cells.h[n] < h);
    if (!onborder) continue;
    const vertex = cells.v[i].find(v => vertices.c[v].some(i => cells.h[i] < h));
    const chain = connectVertices(vertex, h);
    if (chain.length < 3) continue;
    const points = simplifyLine(chain).map(v => vertices.p[v]);
    paths[h] += Math.round(this.lineGen(points));
  }

  this.terrs.append("rect").attr("x", 0).attr("y", 0).attr("width", this.graphWidth).attr("height", this.graphHeight).attr("fill", scheme(0.8)); // draw base layer
  for (const i of d3.range(20, 101)) {
    if (paths[i].length < 10) continue;
    const color = this.getColor(i, scheme);
    if (terracing) this.terrs.append("path").attr("d", paths[i]).attr("transform", "translate(.7,1.4)").attr("fill", d3.color(color).darker(terracing)).attr("data-height", i);
    this.terrs.append("path").attr("d", paths[i]).attr("fill", color).attr("data-height", i);
  }


  // connect vertices to chain
  function connectVertices(start, h) {
    const chain = []; // vertices chain to form a path
    for (let i = 0, current = start; i === 0 || (current !== start && i < 20000); i++) {
      const prev = chain[chain.length - 1]; // previous vertex in chain
      chain.push(current); // add current vertex to sequence
      const c = vertices.c[current]; // cells adjacent to vertex
      c.filter(c => cells.h[c] === h).forEach(c => (used[c] = 1));
      const c0 = c[0] >= n || cells.h[c[0]] < h;
      const c1 = c[1] >= n || cells.h[c[1]] < h;
      const c2 = c[2] >= n || cells.h[c[2]] < h;
      const v = vertices.v[current]; // neighboring vertices
      if (v[0] !== prev && c0 !== c1) current = v[0];
      else if (v[1] !== prev && c1 !== c2) current = v[1];
      else if (v[2] !== prev && c0 !== c2) current = v[2];
      if (current === chain[chain.length - 1]) {
        console.error("Next vertex is not found");
        break;
      }
    }
    return chain;
  }

  function simplifyLine(chain) {
    if (!simplification) return chain;
    const n = simplification + 1; // filter each nth element
    return chain.filter((d, i) => i % n === 0);
  }

  console.timeEnd("drawHeightmap");
}

getColorScheme() {
  const scheme = this.terrs.attr("scheme");
  if (scheme === "bright") return d3.scaleSequential(d3.interpolateSpectral);
  if (scheme === "light") return d3.scaleSequential(d3.interpolateRdYlGn);
  if (scheme === "green") return d3.scaleSequential(d3.interpolateGreens);
  if (scheme === "monochrome") return d3.scaleSequential(d3.interpolateGreys);
  return d3.scaleSequential(d3.interpolateSpectral);
}

getColor(value, scheme = this.getColorScheme()) {
  return scheme(1 - (value < 20 ? value - 5 : value) / 100);
}

toggleTemp(event) {
  if (!this.temperature.selectAll("*").size()) {
    this.drawTemp();
  } else {
    this.temperature.selectAll("*").remove();
  }
}

drawTemp() {
  console.time("drawTemp");
  this.temperature.selectAll("*").remove();
  this.lineGen.curve(d3.curveBasisClosed);
  const scheme = d3.scaleSequential(d3.interpolateSpectral);
  const tMax = +this.temperatureEquatorOutput.max,
    tMin = +this.temperatureEquatorOutput.min,
    delta = tMax - tMin;
let svgWidth = this.svgWidth
let svgHeight = this.svgHeight
  const cells = this.grid.cells,
    vertices = this.grid.vertices,
    n = cells.i.length;
  const used = new Uint8Array(n); // to detect already passed cells
  const min = d3.min(cells.temp),
    max = d3.max(cells.temp);
  const step = Math.max(Math.round(Math.abs(min - max) / 5), 1);
  const isolines = d3.range(min + step, max, step);
  const chains = [],
    labels = []; // store label coordinates

  for (const i of cells.i) {
    const t = cells.temp[i];
    if (used[i] || !isolines.includes(t)) continue;
    const start = findStart(i, t);
    if (!start) continue;
    used[i] = 1;
    //debug.append("circle").attr("r", 3).attr("cx", vertices.p[start][0]).attr("cy", vertices.p[start][1]).attr("fill", "red").attr("stroke", "black").attr("stroke-width", .3);

    const chain = connectVertices(start, t); // vertices chain to form a path
    const relaxed = chain.filter((v, i) => i % 4 === 0 || vertices.c[v].some(c => c >= n));
    if (relaxed.length < 6) continue;
    const points = relaxed.map(v => vertices.p[v]);
    chains.push([t, points]);
    addLabel(points, t);
  }

  // min temp isoline covers all graph
  this.temperature
    .append("path")
    .attr("d", `M0,0 h${this.graphWidth} v${this.graphHeight} h${-this.graphWidth} Z`)
    .attr("fill", scheme(1 - (min - tMin) / delta))
    .attr("stroke", "none");

  for (const t of isolines) {
    const path = chains
      .filter(c => c[0] === t)
      .map(c => Math.round(this.lineGen(c[1])))
      .join("");
    if (!path) continue;
    const fill = scheme(1 - (t - tMin) / delta),
      stroke = d3.color(fill).darker(0.2);
    this.temperature.append("path").attr("d", path).attr("fill", fill).attr("stroke", stroke);
  }

  const tempLabels = this.temperature.append("g").attr("id", "tempLabels").attr("fill-opacity", 1);
  tempLabels
    .selectAll("text")
    .data(labels)
    .enter()
    .append("text")
    .attr("x", d => d[0])
    .attr("y", d => d[1])
    .text(d => this.convertTemperature(d[2]));

  // find cell with temp < isotherm and find vertex to start path detection
  function findStart(i, t) {
    if (cells.b[i]) return cells.v[i].find(v => vertices.c[v].some(c => c >= n)); // map border cell
    return cells.v[i][cells.c[i].findIndex(c => cells.temp[c] < t || !cells.temp[c])];
  }

  function addLabel(points, t) {
    const c = svgWidth / 2; // map center x coordinate
    // add label on isoline top center
    const tc = points[d3.scan(points, (a, b) => a[1] - b[1] + (Math.abs(a[0] - c) - Math.abs(b[0] - c)) / 2)];
    pushLabel(tc[0], tc[1], t);

    // add label on isoline bottom center
    if (points.length > 20) {
      const bc = points[d3.scan(points, (a, b) => b[1] - a[1] + (Math.abs(a[0] - c) - Math.abs(b[0] - c)) / 2)];
      const dist2 = (tc[1] - bc[1]) ** 2 + (tc[0] - bc[0]) ** 2; // square distance between this and top point
      if (dist2 > 100) pushLabel(bc[0], bc[1], t);
    }
  }

  function pushLabel(x, y, t) {
    if (x < 20 || x > svgWidth - 20) return;
    if (y < 20 || y > svgHeight - 20) return;
    labels.push([x, y, t]);
  }

  // connect vertices to chain
  function connectVertices(start, t) {
    const chain = []; // vertices chain to form a path
    for (let i = 0, current = start; i === 0 || (current !== start && i < 20000); i++) {
      const prev = chain[chain.length - 1]; // previous vertex in chain
      chain.push(current); // add current vertex to sequence
      const c = vertices.c[current]; // cells adjacent to vertex
      c.filter(c => cells.temp[c] === t).forEach(c => (used[c] = 1));
      const c0 = c[0] >= n || cells.temp[c[0]] < t;
      const c1 = c[1] >= n || cells.temp[c[1]] < t;
      const c2 = c[2] >= n || cells.temp[c[2]] < t;
      const v = vertices.v[current]; // neighboring vertices
      if (v[0] !== prev && c0 !== c1) current = v[0];
      else if (v[1] !== prev && c1 !== c2) current = v[1];
      else if (v[2] !== prev && c0 !== c2) current = v[2];
      if (current === chain[chain.length - 1]) {
        console.error("Next vertex is not found");
        break;
      }
    }
    chain.push(start);
    return chain;
  }
  console.timeEnd("drawTemp");
}

toggleBiomes(bool) {
  if (!this.biomes.selectAll("path").size() && bool) {
    this.drawBiomes();
  } else {
    this.biomes.selectAll("path").remove();
  }
}

drawBiomes() {
  this.biomes.selectAll("path").remove();
  const cells = this.pack.cells,
    vertices = this.pack.vertices,
    n = cells.i.length;
  const used = new Uint8Array(cells.i.length);
  const paths = new Array(this.biomesData.i.length).fill("");

  for (const i of cells.i) {
    if (!cells.biome[i]) continue; // no need to mark marine biome (liquid water)
    if (used[i]) continue; // already marked
    const b = cells.biome[i];
    const onborder = cells.c[i].some(n => cells.biome[n] !== b);
    if (!onborder) continue;
    const edgeVerticle = cells.v[i].find(v => vertices.c[v].some(i => cells.biome[i] !== b));
    const chain = connectVertices(edgeVerticle, b);
    if (chain.length < 3) continue;
    const points = this.clipPoly(
      chain.map(v => vertices.p[v]),
      1
    );
    paths[b] += "M" + points.join("L") + "Z";
  }

  paths.forEach((d, i) => {
    if (d.length < 10) return;
    this.biomes
      .append("path")
      .attr("d", d)
      .attr("fill", this.biomesData.color[i])
      .attr("stroke", this.biomesData.color[i])
      .attr("id", "biome" + i);
  });

  // connect vertices to chain
  function connectVertices(start, b) {
    const chain = []; // vertices chain to form a path
    for (let i = 0, current = start; i === 0 || (current !== start && i < 20000); i++) {
      const prev = chain[chain.length - 1]; // previous vertex in chain
      chain.push(current); // add current vertex to sequence
      const c = vertices.c[current]; // cells adjacent to vertex
      c.filter(c => cells.biome[c] === b).forEach(c => (used[c] = 1));
      const c0 = c[0] >= n || cells.biome[c[0]] !== b;
      const c1 = c[1] >= n || cells.biome[c[1]] !== b;
      const c2 = c[2] >= n || cells.biome[c[2]] !== b;
      const v = vertices.v[current]; // neighboring vertices
      if (v[0] !== prev && c0 !== c1) current = v[0];
      else if (v[1] !== prev && c1 !== c2) current = v[1];
      else if (v[2] !== prev && c0 !== c2) current = v[2];
      if (current === chain[chain.length - 1]) {
        console.error("Next vertex is not found");
        break;
      }
    }
    return chain;
  }
}

togglePrec(bool) {
  if (!this.prec.selectAll("circle").size() && bool) {
    this.drawPrec();
  } else {
    const hide = d3.transition().duration(1000).ease(d3.easeSinIn);
    this.prec.selectAll("text").attr("opacity", 1).transition(hide).attr("opacity", 0);
    this.prec.selectAll("circle").transition(hide).attr("r", 0).remove();
    this.prec.transition().delay(1000).style("display", "none");
  }
}

drawPrec() {
  this.prec.selectAll("circle").remove();
  const cells = this.grid.cells,
    p = this.grid.points;
  this.prec.style("display", "block");
  const show = d3.transition().duration(800).ease(d3.easeSinIn);
  this.prec.selectAll("text").attr("opacity", 0).transition(show).attr("opacity", 1);

  const data = cells.i.filter((i:number) => cells.h[i] >= 20 && cells.prec[i]);
  this.prec
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => p[d][0])
    .attr("cy", d => p[d][1])
    .attr("r", 0)
    .transition(show)
    .attr("r", d => this.rn(Math.max(Math.sqrt(cells.prec[d] * 0.5), 0.8), 2));
}
editStyle = (style) => console.log(style);

toggleCells(bool) {
  if (!this.cells.selectAll("path").size() && bool) {
    this.drawCells();
  } else {
    this.cells.selectAll("path").remove();
  }
}

drawCells() {
  this.cells.selectAll("path").remove();
  const data = this.customization === 1 ? this.grid.cells.i : this.pack.cells.i;
  const polygon = this.customization === 1 ? this.getGridPolygon : this.getPackPolygon;
  let path = "";
  data.forEach(i => (path += "M" + polygon(i)));
  this.cells.append("path").attr("d", path);
}

toggleIce(bool) {
  if (bool) {
    $("#ice").fadeIn();
    if (!this.ice.selectAll("*").size()) this.drawIce();
  } else {
    $("#ice").fadeOut();
  }
}

drawIce() {
  const cells = this.grid.cells,
    vertices = this.grid.vertices,
    n = cells.i.length,
    temp = cells.temp,
    h = cells.h;
  const used = new Uint8Array(cells.i.length);
  Math.random = aleaPRNG(this.seed);
  let getGridPolygon = this.getGridPolygon;
  let grid = this.grid;
  let ice = this.ice;
  let last = this.last;
  let rn = this.rn;

  const shieldMin = -8; // max temp to form ice shield (glacier)
  const icebergMax = 1; // max temp to form an iceberg

  for (const i of this.grid.cells.i) {
    const t = temp[i];
    if (t > icebergMax) continue; // too warm: no ice
    if (t > shieldMin && h[i] >= 20) continue; // non-glacier land: no ice

    if (t <= shieldMin) {
      // very cold: ice shield
      if (used[i]) continue; // already rendered
      const onborder = cells.c[i].some(n => temp[n] > shieldMin);
      if (!onborder) continue; // need to start from onborder cell
      const vertex = cells.v[i].find(v => vertices.c[v].some(i => temp[i] > shieldMin));
      const chain = connectVertices(vertex);
      if (chain.length < 3) continue;
      const points = this.clipPoly(chain.map(v => vertices.p[v]));
      this.ice.append("polygon").attr("points", points).attr("type", "iceShield");
      continue;
    }

    // mildly cold: iceberd
    if (this.P(this.normalize(t, -7, 2.5))) continue; // t[-5; 2] cold: skip some cells
    if (this.grid.features[cells.f[i]].type === "lake") continue; // lake: no icebers
    let size = (6.5 + t) / 10; // iceberg size: 0 = full size, 1 = zero size
    if (cells.t[i] === -1) size *= 1.3; // coasline: smaller icebers
    size = Math.min(size * (0.4 + this.rand(null, null) * 1.2), 0.95); // randomize iceberg size
    resizePolygon(i, size);
  }

  function resizePolygon(i, s) {
    const c = grid.points[i];
    const points = getGridPolygon(i).map(p => [(p[0] + (c[0] - p[0]) * s) | 0, (p[1] + (c[1] - p[1]) * s) | 0]);
    ice
      .append("polygon")
      .attr("points", points)
      .attr("cell", i)
      .attr("size", rn(1 - s, 2));
  }

  // connect vertices to chain
  function connectVertices(start) {
    const chain = []; // vertices chain to form a path
    for (let i = 0, current = start; i === 0 || (current !== start && i < 20000); i++) {
      const prev = last(chain); // previous vertex in chain
      chain.push(current); // add current vertex to sequence
      const c = vertices.c[current]; // cells adjacent to vertex
      c.filter(c => temp[c] <= shieldMin).forEach(c => (used[c] = 1));
      const c0 = c[0] >= n || temp[c[0]] > shieldMin;
      const c1 = c[1] >= n || temp[c[1]] > shieldMin;
      const c2 = c[2] >= n || temp[c[2]] > shieldMin;
      const v = vertices.v[current]; // neighboring vertices
      if (v[0] !== prev && c0 !== c1) current = v[0];
      else if (v[1] !== prev && c1 !== c2) current = v[1];
      else if (v[2] !== prev && c0 !== c2) current = v[2];
      if (current === chain[chain.length - 1]) {
        console.error("Next vertex is not found");
        break;
      }
    }
    return chain;
  }
}

toggleCultures(bool) {
  const cultures = this.pack.cultures.filter(c => c.i && !c.removed);
  const empty = !this.cults.selectAll("path").size();
  if (empty && cultures.length && bool) {
    this.drawCultures();
  } else {
    this.cults.selectAll("path").remove();
  }
}

drawCultures() {
  console.time("drawCultures");

  this.cults.selectAll("path").remove();
  const cells = this.pack.cells,
    vertices = this.pack.vertices,
    cultures = this.pack.cultures,
    n = cells.i.length;
  const used = new Uint8Array(cells.i.length);
  const paths = new Array(cultures.length).fill("");

  for (const i of cells.i) {
    if (!cells.culture[i]) continue;
    if (used[i]) continue;
    used[i] = 1;
    const c = cells.culture[i];
    const onborder = cells.c[i].some(n => cells.culture[n] !== c);
    if (!onborder) continue;
    const vertex = cells.v[i].find(v => vertices.c[v].some(i => cells.culture[i] !== c));
    const chain = connectVertices(vertex, c);
    if (chain.length < 3) continue;
    const points = chain.map(v => vertices.p[v]);
    paths[c] += "M" + points.join("L") + "Z";
  }

  const data = paths.map((p, i) => [p, i]).filter(d => d[0].length > 10);
  this.cults
    .selectAll("path")
    .data(data)
    .enter()
    .append("path")
    .attr("d", d => d[0])
    .attr("fill", d => cultures[d[1]].color)
    .attr("id", d => "culture" + d[1]);

  // connect vertices to chain
  function connectVertices(start, t) {
    const chain = []; // vertices chain to form a path
    for (let i = 0, current = start; i === 0 || (current !== start && i < 20000); i++) {
      const prev = chain[chain.length - 1]; // previous vertex in chain
      chain.push(current); // add current vertex to sequence
      const c = vertices.c[current]; // cells adjacent to vertex
      c.filter(c => cells.culture[c] === t).forEach(c => (used[c] = 1));
      const c0 = c[0] >= n || cells.culture[c[0]] !== t;
      const c1 = c[1] >= n || cells.culture[c[1]] !== t;
      const c2 = c[2] >= n || cells.culture[c[2]] !== t;
      const v = vertices.v[current]; // neighboring vertices
      if (v[0] !== prev && c0 !== c1) current = v[0];
      else if (v[1] !== prev && c1 !== c2) current = v[1];
      else if (v[2] !== prev && c0 !== c2) current = v[2];
      if (current === chain[chain.length - 1]) {
        console.error("Next vertex is not found");
        break;
      }
    }
    return chain;
  }
  console.timeEnd("drawCultures");
}

toggleReligions(bool) {
  const religions = this.pack.religions.filter(r => r.i && !r.removed);
  if (!this.relig.selectAll("path").size() && religions.length && bool) {
    this.drawReligions();
  } else {
    this.relig.selectAll("path").remove();
  }
}

drawReligions() {
  console.time("drawReligions");

  this.relig.selectAll("path").remove();
  const cells = this.pack.cells,
    vertices = this.pack.vertices,
    religions = this.pack.religions,
    features = this.pack.features,
    n = cells.i.length;
  const used = new Uint8Array(cells.i.length);
  const vArray = new Array(religions.length); // store vertices array
  const body = new Array(religions.length).fill(""); // store path around each religion
  const gap = new Array(religions.length).fill(""); // store path along water for each religion to fill the gaps

  for (const i of cells.i) {
    if (!cells.religion[i]) continue;
    if (used[i]) continue;
    used[i] = 1;
    const r = cells.religion[i];
    const onborder = cells.c[i].filter(n => cells.religion[n] !== r);
    if (!onborder.length) continue;
    const borderWith = cells.c[i].map(c => cells.religion[c]).find(n => n !== r);
    const vertex = cells.v[i].find(v => vertices.c[v].some(i => cells.religion[i] === borderWith));
    const chain = connectVertices(vertex, r, borderWith);
    if (chain.length < 3) continue;
    const points = chain.map(v => vertices.p[v[0]]);
    if (!vArray[r]) vArray[r] = [];
    vArray[r].push(points);
    body[r] += "M" + points.join("L");
    gap[r] += "M" + vertices.p[chain[0][0]] + chain.reduce((r2, v, i, d) => (!i ? r2 : !v[2] ? r2 + "L" + vertices.p[v[0]] : d[i + 1] && !d[i + 1][2] ? r2 + "M" + vertices.p[v[0]] : r2), "");
  }

  const bodyData = body.map((p, i) => [p.length > 10 ? p : null, i, religions[i].color]).filter(d => d[0]);
  this.relig
    .selectAll("path")
    .data(bodyData)
    .enter()
    .append("path")
    .attr("d", d => d[0])
    .attr("fill", d => d[2])
    .attr("id", d => "religion" + d[1]);
  const gapData = gap.map((p, i) => [p.length > 10 ? p : null, i, religions[i].color]).filter(d => d[0]);
  this.relig
    .selectAll(".path")
    .data(gapData)
    .enter()
    .append("path")
    .attr("d", d => d[0])
    .attr("fill", "none")
    .attr("stroke", d => d[2])
    .attr("id", d => "religion-gap" + d[1])
    .attr("stroke-width", "10px");

  // connect vertices to chain
  function connectVertices(start, t, religion) {
    const chain = []; // vertices chain to form a path
    let land = vertices.c[start].some(c => cells.h[c] >= 20 && cells.religion[c] !== t);
    function check(i) {
      religion = cells.religion[i];
      land = cells.h[i] >= 20;
    }

    for (let i = 0, current = start; i === 0 || (current !== start && i < 20000); i++) {
      const prev = chain[chain.length - 1] ? chain[chain.length - 1][0] : -1; // previous vertex in chain
      chain.push([current, religion, land]); // add current vertex to sequence
      const c = vertices.c[current]; // cells adjacent to vertex
      c.filter(c => cells.religion[c] === t).forEach(c => (used[c] = 1));
      const c0 = c[0] >= n || cells.religion[c[0]] !== t;
      const c1 = c[1] >= n || cells.religion[c[1]] !== t;
      const c2 = c[2] >= n || cells.religion[c[2]] !== t;
      const v = vertices.v[current]; // neighboring vertices
      if (v[0] !== prev && c0 !== c1) {
        current = v[0];
        check(c0 ? c[0] : c[1]);
      } else if (v[1] !== prev && c1 !== c2) {
        current = v[1];
        check(c1 ? c[1] : c[2]);
      } else if (v[2] !== prev && c0 !== c2) {
        current = v[2];
        check(c2 ? c[2] : c[0]);
      }
      if (current === chain[chain.length - 1][0]) {
        console.error("Next vertex is not found");
        break;
      }
    }
    return chain;
  }
  console.timeEnd("drawReligions");
}

toggleStates(bool) {
  if (bool) {
    this.regions.style("display", null);
    this.drawStates();
  } else {
    this.regions.style("display", "none").selectAll("path").remove();
  }
}

drawStates() {
  console.time("drawStates");
  this.regions.selectAll("path").remove();

  const {cells, vertices, features} = this.pack;
  const states = this.pack.states;
  const n = cells.i.length;

  const used = new Uint8Array(cells.i.length);
  const vArray = new Array(states.length); // store vertices array
  const body = new Array(states.length).fill(""); // path around each state
  const gap = new Array(states.length).fill(""); // path along water for each state to fill the gaps
  const halo = new Array(states.length).fill(""); // path around states, but not lakes

  const getStringPoint = v => vertices.p[v[0]].join(",");

  // define inner-state lakes to omit on border render
  const innerLakes = features.map(feature => {
    if (feature.type !== "lake") return false;
    if (!feature.shoreline) this.Lakes.getShoreline(feature);

    const states = feature.shoreline.map(i => cells.state[i]);
    return new Set(states).size > 1 ? false : true;
  });

  for (const i of cells.i) {
    if (!cells.state[i] || used[i]) continue;
    const state = cells.state[i];

    const onborder = cells.c[i].some(n => cells.state[n] !== state);
    if (!onborder) continue;

    const borderWith = cells.c[i].map(c => cells.state[c]).find(n => n !== state);
    const vertex = cells.v[i].find(v => vertices.c[v].some(i => cells.state[i] === borderWith));
    const chain = connectVertices(vertex, state);

    const noInnerLakes = chain.filter(v => v[1] !== "innerLake");
    if (noInnerLakes.length < 3) continue;

    // get path around the state
    if (!vArray[state]) vArray[state] = [];
    const points = noInnerLakes.map(v => vertices.p[v[0]]);
    vArray[state].push(points);
    body[state] += "M" + points.join("L");

    // connect path for halo
    let discontinued = true;
    halo[state] += noInnerLakes
      .map(v => {
        if (v[1] === "border") {
          discontinued = true;
          return "";
        }

        const operation = discontinued ? "M" : "L";
        discontinued = false;
        return `${operation}${getStringPoint(v)}`;
      })
      .join("");

    // connect gaps between state and water into a single path
    discontinued = true;
    gap[state] += chain
      .map(v => {
        if (v[1] === "land") {
          discontinued = true;
          return "";
        }

        const operation = discontinued ? "M" : "L";
        discontinued = false;
        return `${operation}${getStringPoint(v)}`;
      })
      .join("");
  }

  // find state visual center
  vArray.forEach((ar, i) => {
    const sorted = ar.sort((a, b) => b.length - a.length); // sort by points number
    states[i].pole = polylabel(sorted, 1.0); // pole of inaccessibility
  });

  const bodyData = body.map((p, s) => [p.length > 10 ? p : null, s, states[s].color]).filter(d => d[0]);
  const gapData = gap.map((p, s) => [p.length > 10 ? p : null, s, states[s].color]).filter(d => d[0]);
  const haloData = halo.map((p, s) => [p.length > 10 ? p : null, s, states[s].color]).filter(d => d[0]);

  const bodyString = bodyData.map(d => `<path id="state${d[1]}" d="${d[0]}" fill="${d[2]}" stroke="none"/>`).join("");
  const gapString = gapData.map(d => `<path id="state-gap${d[1]}" d="${d[0]}" fill="none" stroke="${d[2]}"/>`).join("");
  const clipString = bodyData.map(d => `<clipPath id="state-clip${d[1]}"><use href="#state${d[1]}"/></clipPath>`).join("");
  const haloString = haloData.map(d => `<path id="state-border${d[1]}" d="${d[0]}" clip-path="url(#state-clip${d[1]})" stroke="${d3.color(d[2]) ? d3.color(d[2]).darker().hex() : "#666666"}"/>`).join("");

  this.statesBody.html(bodyString + gapString);
  this.defs.select("#statePaths").html(clipString);
  this.statesHalo.html(haloString);

  // connect vertices to chain
  function connectVertices(start, state) {
    const chain = []; // vertices chain to form a path
    const getType = c => {
      const borderCell = c.find((i:any) => cells.b[i]);
      if (borderCell) return "border";

      const waterCell = c.find((i:any) => cells.h[i] < 20);
      if (!waterCell) return "land";
      if (innerLakes[cells.f[waterCell]]) return "innerLake";
      return features[cells.f[waterCell]].type;
    };

    for (let i = 0, current = start; i === 0 || (current !== start && i < 20000); i++) {
      const prev = chain.length ? chain[chain.length - 1][0] : -1; // previous vertex in chain

      const c = vertices.c[current]; // cells adjacent to vertex
      chain.push([current, getType(c)]); // add current vertex to sequence

      c.filter(c => cells.state[c] === state).forEach(c => (used[c] = 1));
      const c0 = c[0] >= n || cells.state[c[0]] !== state;
      const c1 = c[1] >= n || cells.state[c[1]] !== state;
      const c2 = c[2] >= n || cells.state[c[2]] !== state;

      const v = vertices.v[current]; // neighboring vertices

      if (v[0] !== prev && c0 !== c1) current = v[0];
      else if (v[1] !== prev && c1 !== c2) current = v[1];
      else if (v[2] !== prev && c0 !== c2) current = v[2];

      if (current === prev) {
        console.error("Next vertex is not found");
        break;
      }
    }

    if (chain.length) chain.push(chain[0]);
    return chain;
  }

  this.invokeActiveZooming();
  console.timeEnd("drawStates");
}

toggleBorders(bool) {
  if (bool) {
    this.drawBorders();
  } else {
    this.borders.selectAll("path").remove();
  }
}

// draw state and province borders
drawBorders() {
  console.time("drawBorders");
  this.borders.selectAll("path").remove();

  const {cells, vertices} = this.pack;
  const n = cells.i.length;

  const sPath = [];
  const pPath = [];

  const sUsed = new Array(this.pack.states.length).fill("").map(_ => []);
  const pUsed = new Array(this.pack.provinces.length).fill("").map(_ => []);

  for (let i = 0; i < cells.i.length; i++) {
    if (!cells.state[i]) continue;
    const p = cells.province[i];
    const s = cells.state[i];

    // if cell is on province border
    const provToCell = cells.c[i].find(n => cells.state[n] === s && p > cells.province[n] && pUsed[p][n] !== cells.province[n]);
    if (provToCell) {
      const provTo = cells.province[provToCell];
      pUsed[p][provToCell] = provTo;
      const vertex = cells.v[i].find(v => vertices.c[v].some(i => cells.province[i] === provTo));
      const chain = connectVertices(vertex, p, cells.province, provTo, pUsed);

      if (chain.length > 1) {
        pPath.push("M" + chain.map(c => vertices.p[c]).join(" "));
        i--;
        continue;
      }
    }

    // if cell is on state border
    const stateToCell = cells.c[i].find(n => cells.h[n] >= 20 && s > cells.state[n] && sUsed[s][n] !== cells.state[n]);
    if (stateToCell !== undefined) {
      const stateTo = cells.state[stateToCell];
      sUsed[s][stateToCell] = stateTo;
      const vertex = cells.v[i].find(v => vertices.c[v].some(i => cells.h[i] >= 20 && cells.state[i] === stateTo));
      const chain = connectVertices(vertex, s, cells.state, stateTo, sUsed);

      if (chain.length > 1) {
        sPath.push("M" + chain.map(c => vertices.p[c]).join(" "));
        i--;
        continue;
      }
    }
  }

  this.stateBorders.append("path").attr("d", sPath.join(" "));
  this.provinceBorders.append("path").attr("d", pPath.join(" "));

  // connect vertices to chain
  function connectVertices(current, f, array, t, used) {
    let chain = [];
    const checkCell = c => c >= n || array[c] !== f;
    const checkVertex = v => vertices.c[v].some(c => array[c] === f) && vertices.c[v].some(c => array[c] === t && cells.h[c] >= 20);

    // find starting vertex
    for (let i = 0; i < 1000; i++) {
      if (i === 999) console.error("Find starting vertex: limit is reached", current, f, t);
      const p = chain[chain.length - 2] || -1; // previous vertex
      const v = vertices.v[current],
        c = vertices.c[current];

      const v0 = checkCell(c[0]) !== checkCell(c[1]) && checkVertex(v[0]);
      const v1 = checkCell(c[1]) !== checkCell(c[2]) && checkVertex(v[1]);
      const v2 = checkCell(c[0]) !== checkCell(c[2]) && checkVertex(v[2]);
      if (v0 + v1 + v2 === 1) break;
      current = v0 && p !== v[0] ? v[0] : v1 && p !== v[1] ? v[1] : v[2];

      if (current === chain[0]) break;
      if (current === p) return [];
      chain.push(current);
    }

    chain = [current]; // vertices chain to form a path
    // find path
    for (let i = 0; i < 1000; i++) {
      if (i === 999) console.error("Find path: limit is reached", current, f, t);
      const p = chain[chain.length - 2] || -1; // previous vertex
      const v = vertices.v[current],
        c = vertices.c[current];
      c.filter(c => array[c] === t).forEach(c => (used[f][c] = t));

      const v0 = checkCell(c[0]) !== checkCell(c[1]) && checkVertex(v[0]);
      const v1 = checkCell(c[1]) !== checkCell(c[2]) && checkVertex(v[1]);
      const v2 = checkCell(c[0]) !== checkCell(c[2]) && checkVertex(v[2]);
      current = v0 && p !== v[0] ? v[0] : v1 && p !== v[1] ? v[1] : v[2];

      if (current === p) break;
      if (current === chain[chain.length - 1]) break;
      if (chain.length > 1 && v0 + v1 + v2 < 2) break;
      chain.push(current);
      if (current === chain[0]) break;
    }

    return chain;
  }

  console.timeEnd("drawBorders");
}

toggleProvinces(bool) {
  if (bool) {
    this.drawProvinces();
  } else {
    this.provs.selectAll("*").remove();
  }
}

drawProvinces() {
  console.time("drawProvinces");
  const labelsOn = this.provs.attr("data-labels") == 1;
  this.provs.selectAll("*").remove();

  const provinces = this.pack.provinces;
  const {body, gap} = this.getProvincesVertices();

  const g = this.provs.append("g").attr("id", "provincesBody");
  const bodyData = body.map((p, i) => [p.length > 10 ? p : null, i, provinces[i].color]).filter(d => d[0]);
  g.selectAll("path")
    .data(bodyData)
    .enter()
    .append("path")
    .attr("d", d => d[0])
    .attr("fill", d => d[2])
    .attr("stroke", "none")
    .attr("id", d => "province" + d[1]);
  const gapData = gap.map((p, i) => [p.length > 10 ? p : null, i, provinces[i].color]).filter(d => d[0]);
  g.selectAll(".path")
    .data(gapData)
    .enter()
    .append("path")
    .attr("d", d => d[0])
    .attr("fill", "none")
    .attr("stroke", d => d[2])
    .attr("id", d => "province-gap" + d[1]);

  const labels = this.provs.append("g").attr("id", "provinceLabels");
  labels.style("display", `${labelsOn ? "block" : "none"}`);
  const labelData = provinces.filter(p => p.i && !p.removed && p.pole);
  labels
    .selectAll(".path")
    .data(labelData)
    .enter()
    .append("text")
    .attr("x", d => d.pole[0])
    .attr("y", d => d.pole[1])
    .attr("id", d => "provinceLabel" + d.i)
    .text(d => d.name);

  console.timeEnd("drawProvinces");
}

getProvincesVertices() {
  const cells = this.pack.cells,
    vertices = this.pack.vertices,
    provinces = this.pack.provinces,
    n = cells.i.length;
  const used = new Uint8Array(cells.i.length);
  const vArray = new Array(provinces.length); // store vertices array
  const body = new Array(provinces.length).fill(""); // store path around each province
  const gap = new Array(provinces.length).fill(""); // store path along water for each province to fill the gaps

  for (const i of cells.i) {
    if (!cells.province[i] || used[i]) continue;
    const p = cells.province[i];
    const onborder = cells.c[i].some(n => cells.province[n] !== p);
    if (!onborder) continue;

    const borderWith = cells.c[i].map(c => cells.province[c]).find(n => n !== p);
    const vertex = cells.v[i].find(v => vertices.c[v].some(i => cells.province[i] === borderWith));
    const chain = connectVertices(vertex, p, borderWith);
    if (chain.length < 3) continue;
    const points = chain.map(v => vertices.p[v[0]]);
    if (!vArray[p]) vArray[p] = [];
    vArray[p].push(points);
    body[p] += "M" + points.join("L");
    gap[p] += "M" + vertices.p[chain[0][0]] + chain.reduce((r, v, i, d) => (!i ? r : !v[2] ? r + "L" + vertices.p[v[0]] : d[i + 1] && !d[i + 1][2] ? r + "M" + vertices.p[v[0]] : r), "");
  }

  // find province visual center
  vArray.forEach((ar, i) => {
    const sorted = ar.sort((a, b) => b.length - a.length); // sort by points number
    provinces[i].pole = polylabel(sorted, 1.0); // pole of inaccessibility
  });

  return {body, gap};

  // connect vertices to chain
  function connectVertices(start, t, province) {
    const chain = []; // vertices chain to form a path
    let land = vertices.c[start].some(c => cells.h[c] >= 20 && cells.province[c] !== t);
    function check(i) {
      province = cells.province[i];
      land = cells.h[i] >= 20;
    }

    for (let i = 0, current = start; i === 0 || (current !== start && i < 20000); i++) {
      const prev = chain[chain.length - 1] ? chain[chain.length - 1][0] : -1; // previous vertex in chain
      chain.push([current, province, land]); // add current vertex to sequence
      const c = vertices.c[current]; // cells adjacent to vertex
      c.filter(c => cells.province[c] === t).forEach(c => (used[c] = 1));
      const c0 = c[0] >= n || cells.province[c[0]] !== t;
      const c1 = c[1] >= n || cells.province[c[1]] !== t;
      const c2 = c[2] >= n || cells.province[c[2]] !== t;
      const v = vertices.v[current]; // neighboring vertices
      if (v[0] !== prev && c0 !== c1) {
        current = v[0];
        check(c0 ? c[0] : c[1]);
      } else if (v[1] !== prev && c1 !== c2) {
        current = v[1];
        check(c1 ? c[1] : c[2]);
      } else if (v[2] !== prev && c0 !== c2) {
        current = v[2];
        check(c2 ? c[2] : c[0]);
      }
      if (current === chain[chain.length - 1][0]) {
        console.error("Next vertex is not found");
        break;
      }
    }
    chain.push([start, province, land]); // add starting vertex to sequence to close the path
    return chain;
  }
}

toggleGrid(bool) {
  if (bool) {
    this.drawGrid();
    // calculateFriendlyGridSize();
  } else {
    this.gridOverlay.selectAll("*").remove();
  }
}

drawGrid() {
  this.gridOverlay.selectAll("*").remove();
  const pattern = "#pattern_" + (this.gridOverlay.attr("type") || "pointyHex");
  const stroke = this.gridOverlay.attr("stroke") || "#808080";
  const width = this.gridOverlay.attr("stroke-width") || 0.5;
  const dasharray = this.gridOverlay.attr("stroke-dasharray") || null;
  const linecap = this.gridOverlay.attr("stroke-linecap") || null;
  const scale = this.gridOverlay.attr("scale") || 1;
  const dx = this.gridOverlay.attr("dx") || 0;
  const dy = this.gridOverlay.attr("dy") || 0;
  const tr = `scale(${scale}) translate(${dx} ${dy})`;

  const maxWidth = Math.max(+this.mapWidthInput.value, this.graphWidth);
  const maxHeight = Math.max(+this.mapHeightInput.value, this.graphHeight);

  d3.select(pattern).attr("stroke", stroke).attr("stroke-width", width).attr("stroke-dasharray", dasharray).attr("stroke-linecap", linecap).attr("patternTransform", tr);
  this.gridOverlay
    .append("rect")
    .attr("width", maxWidth)
    .attr("height", maxHeight)
    .attr("fill", "url(" + pattern + ")")
    .attr("stroke", "none");
}

toggleCoordinates(bool) {
  if (bool) {
    this.drawCoordinates();
  } else {
    this.coordinates.selectAll("*").remove();
  }
}

drawCoordinates() {
  this.coordinates.selectAll("*").remove(); // remove every time
  const steps = [0.5, 1, 2, 5, 10, 15, 30]; // possible steps
  const goal = this.mapCoordinates.lonT / this.scale / 10;
  const step = steps.reduce((p, c) => (Math.abs(c - goal) < Math.abs(p - goal) ? c : p));

  const desired = +this.coordinates.attr("data-size"); // desired label size
  this.coordinates.attr("font-size", Math.max(this.rn(desired / this.scale ** 0.8, 2), 0.1)); // actual label size
  const graticule = d3
    .geoGraticule()
    .extent([
      [this.mapCoordinates.lonW, this.mapCoordinates.latN],
      [this.mapCoordinates.lonE + 0.1, this.mapCoordinates.latS + 0.1]
    ])
    .stepMajor([400, 400])
    .stepMinor([step, step]);
  const projection = d3.geoEquirectangular().fitSize([this.graphWidth, this.graphHeight], graticule());

  const grid = this.coordinates.append("g").attr("id", "coordinateGrid");
  const labels = this.coordinates.append("g").attr("id", "coordinateLabels");

  const p = this.getViewPoint(this.scale + desired + 2, this.scale + desired / 2); // on border point on viexBox
  const data = graticule.lines().map(d => {
    const lat = d.coordinates[0][1] === d.coordinates[1][1]; // check if line is latitude or longitude
    const c = d.coordinates[0],
      pos = projection(c); // map coordinates
    const [x, y] = lat ? [this.rn(p.x, 2), this.rn(pos[1], 2)] : [this.rn(pos[0], 2), this.rn(p.y, 2)]; // labels position
    const v = lat ? c[1] : c[0]; // label
    const text = !v ? v : Number.isInteger(v) ? (lat ? (c[1] < 0 ? -c[1] + "°S" : c[1] + "°N") : c[0] < 0 ? -c[0] + "°W" : c[0] + "°E") : "";
    return {lat, x, y, text};
  });
  const d = this.round(d3.geoPath(projection)(graticule()));
  grid.append("path").attr("d", d).attr("vector-effect", "non-scaling-stroke");
  labels
    .selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .attr("x", d => d.x)
    .attr("y", d => d.y)
    .text(d => d.text);
}

// conver svg point into viewBox point
getViewPoint(x, y) {
  const view = this.viewbox._groups[0][0];
  const svg = this.map;
  const pt = svg.createSVGPoint();
  (pt.x = x), (pt.y = y);
  return pt.matrixTransform(view.getScreenCTM().inverse());
}

toggleCompass(bool) {
  if (bool) {
    $("#compass").fadeIn();
    if (!this.compass.selectAll("*").size()) {
      this.compass.append("use").attr("xlink:href", "#rose");
      // shiftCompass();
    }
  } else {
    $("#compass").fadeOut();
  }
}

toggleRelief(bool) {
  if (bool) {
    if (!this.terrain.selectAll("*").size()) this.ReliefIcons();
    $("#terrain").fadeIn();
  } else {
    $("#terrain").fadeOut();
  }
}

toggleTexture(bool) {
  if (bool) {
    // append default texture image selected by default. Don't append on load to not harm performance
    if (!this.texture.selectAll("*").size()) {
      const x = +this.styleTextureShiftX.value,
        y = +this.styleTextureShiftY.value;
      const image = this.texture
        .append("image")
        .attr("id", "textureImage")
        .attr("x", x)
        .attr("y", y)
        .attr("width", this.graphWidth - x)
        .attr("height", this.graphHeight - y)
        .attr("xlink:href", this.getDefaultTexture())
        .attr("preserveAspectRatio", "xMidYMid slice");
      if (this.styleTextureInput.value !== "default") this.getBase64(this.styleTextureInput.value, base64 => image.attr("xlink:href", base64));
    }
    $("#texture").fadeIn();
    this.zoom.scaleBy(this.svg, 1.00001); // enforce browser re-draw
  } else {
    $("#texture").fadeOut();
  }
}

toggleRivers(bool) {
  if (bool) {
    this.drawRivers();
  } else {
    this.rivers.selectAll("*").remove();
  }
}

drawRivers() {
  console.time("drawRivers");
  this.rivers.selectAll("*").remove();

  const {addMeandering, getRiverPath} = this.Rivers;
  this.lineGen.curve(d3.curveCatmullRom.alpha(0.1));

  const riverPaths = this.pack.rivers.map(({cells, points, i, widthFactor, sourceWidth}) => {
    if (!cells || cells.length < 2) return;
    const meanderedPoints = addMeandering(cells, points);
    const path = getRiverPath(meanderedPoints, widthFactor, sourceWidth);
    return `<path id="river${i}" d="${path}"/>`;
  });
  this.rivers.html(riverPaths.join(""));

  console.timeEnd("drawRivers");
}

toggleRoutes(bool) {
  if (bool) {
    $("#routes").fadeIn();
  } else {
    $("#routes").fadeOut();
  }
}

toggleMilitary(bool) {
  if (bool) {
    $("#armies").fadeIn();
  } else {
    $("#armies").fadeOut();
  }
}

toggleMarkers(bool) {
  if (bool) {
    $("#markers").fadeIn();
  } else {
    $("#markers").fadeOut();
  }
}

toggleLabels(bool) {
  if (bool) {
    this.labels.style("display", null);
    this.invokeActiveZooming();
  } else {
    this.labels.style("display", "none");
  }
}

toggleIcons(bool) {
  if (bool) {
    $("#icons").fadeIn();
  } else {
    $("#icons").fadeOut();
  }
}

toggleRulers(bool) {
  if (bool) {
    this.rulers.draw();
    this.ruler.style("display", null);
  } else {
    this.ruler.selectAll("*").remove();
    this.ruler.style("display", "none");
  }
}

toggleScaleBar(bool) {
  if (bool) {
    $("#scaleBar").fadeIn();
  } else {
    $("#scaleBar").fadeOut();
  }
}

toggleZones(bool) {
  if (bool) {
    $("#zones").fadeIn();
  } else {
    $("#zones").fadeOut();
  }
}

toggleEmblems(bool) {
  if (bool) {
    if (!this.emblems.selectAll("use").size()) this.drawEmblems();
    $("#emblems").fadeIn();
  } else {
    $("#emblems").fadeOut();
  }
}

drawEmblems() {
  console.time("drawEmblems");
  const {states, provinces, burgs} = this.pack;

  const validStates = states.filter(s => s.i && !s.removed && s.coa && s.coaSize != 0);
  const validProvinces = provinces.filter(p => p.i && !p.removed && p.coa && p.coaSize != 0);
  const validBurgs = burgs.filter(b => b.i && !b.removed && b.coa && b.coaSize != 0);

  const getStateEmblemsSize = () => {
    const startSize = Math.min(Math.max((this.graphHeight + this.graphWidth) / 40, 10), 100);
    const statesMod = 1 + validStates.length / 100 - (15 - validStates.length) / 200; // states number modifier
    const sizeMod = +(<HTMLInputElement>document.getElementById("emblemsStateSizeInput")).value || 1;
    return this.rn((startSize / statesMod) * sizeMod); // target size ~50px on 1536x754 map with 15 states
  };

  const getProvinceEmblemsSize = () => {
    const startSize = Math.min(Math.max((this.graphHeight + this.graphWidth) / 100, 5), 70);
    const provincesMod = 1 + validProvinces.length / 1000 - (115 - validProvinces.length) / 1000; // states number modifier
    const sizeMod = +(<HTMLInputElement>document.getElementById("emblemsProvinceSizeInput")).value || 1;
    return this.rn((startSize / provincesMod) * sizeMod); // target size ~20px on 1536x754 map with 115 provinces
  };

  const getBurgEmblemSize = () => {
    const startSize = Math.min(Math.max((this.graphHeight + this.graphWidth) / 185, 2), 50);
    const burgsMod = 1 + validBurgs.length / 1000 - (450 - validBurgs.length) / 1000; // states number modifier
    const sizeMod = +(<HTMLInputElement>document.getElementById("emblemsBurgSizeInput")).value || 1;
    return this.rn((startSize / burgsMod) * sizeMod); // target size ~8.5px on 1536x754 map with 450 burgs
  };

  const sizeBurgs = getBurgEmblemSize();
  const burgCOAs = validBurgs.map(burg => {
    const {x, y} = burg;
    const size = burg.coaSize || 1;
    const shift = (sizeBurgs * size) / 2;
    return {type: "burg", i: burg.i, x, y, size, shift};
  });

  const sizeProvinces = getProvinceEmblemsSize();
  const provinceCOAs = validProvinces.map(province => {
    if (!province.pole) this.getProvincesVertices();
    const [x, y] = province.pole || this.pack.cells.p[province.center];
    const size = province.coaSize || 1;
    const shift = (sizeProvinces * size) / 2;
    return {type: "province", i: province.i, x, y, size, shift};
  });

  const sizeStates = getStateEmblemsSize();
  const stateCOAs = validStates.map(state => {
    const [x, y] = state.pole || this.pack.cells.p[state.center];
    const size = state.coaSize || 1;
    const shift = (sizeStates * size) / 2;
    return {type: "state", i: state.i, x, y, size, shift};
  });

  const nodes = burgCOAs.concat(provinceCOAs).concat(stateCOAs);
  const simulation = d3
    .forceSimulation(nodes)
    .alphaMin(0.6)
    .alphaDecay(0.2)
    .velocityDecay(0.6)
    .force(
      "collision",
      d3.forceCollide().radius(d => d.shift)
    )
    .stop();

  d3.timeout(() => {
    const n = Math.ceil(Math.log(simulation.alphaMin()) / Math.log(1 - simulation.alphaDecay()));
    for (let i = 0; i < n; ++i) {
      simulation.tick();
    }

    const burgNodes = nodes.filter(node => node.type === "burg");
    const burgString = burgNodes.map(d => `<use data-i="${d.i}" x="${this.rn(d.x - d.shift)}" y="${this.rn(d.y - d.shift)}" width="${d.size}em" height="${d.size}em"/>`).join("");
    this.emblems.select("#burgEmblems").attr("font-size", sizeBurgs).html(burgString);

    const provinceNodes = nodes.filter(node => node.type === "province");
    const provinceString = provinceNodes.map(d => `<use data-i="${d.i}" x="${this.rn(d.x - d.shift)}" y="${this.rn(d.y - d.shift)}" width="${d.size}em" height="${d.size}em"/>`).join("");
    this.emblems.select("#provinceEmblems").attr("font-size", sizeProvinces).html(provinceString);

    const stateNodes = nodes.filter(node => node.type === "state");
    const stateString = stateNodes.map(d => `<use data-i="${d.i}" x="${this.rn(d.x - d.shift)}" y="${this.rn(d.y - d.shift)}" width="${d.size}em" height="${d.size}em"/>`).join("");
    this.emblems.select("#stateEmblems").attr("font-size", sizeStates).html(stateString);

    this.invokeActiveZooming();
  });

  console.timeEnd("drawEmblems");
}

// define connection between option layer buttons and actual svg groups to move the element
getLayer(id) {
  if (id === "toggleHeight") return $("#terrs");
  if (id === "toggleBiomes") return $("#biomes");
  if (id === "toggleCells") return $("#cells");
  if (id === "toggleGrid") return $("#gridOverlay");
  if (id === "toggleCoordinates") return $("#coordinates");
  if (id === "toggleCompass") return $("#compass");
  if (id === "toggleRivers") return $("#rivers");
  if (id === "toggleRelief") return $("#terrain");
  if (id === "toggleCultures") return $("#cults");
  if (id === "toggleStates") return $("#regions");
  if (id === "toggleProvinces") return $("#provs");
  if (id === "toggleBorders") return $("#borders");
  if (id === "toggleRoutes") return $("#routes");
  if (id === "toggleTemp") return $("#temperature");
  if (id === "togglePrec") return $("#prec");
  if (id === "togglePopulation") return $("#population");
  if (id === "toggleIce") return $("#ice");
  if (id === "toggleTexture") return $("#texture");
  if (id === "toggleEmblems") return $("#emblems");
  if (id === "toggleLabels") return $("#labels");
  if (id === "toggleIcons") return $("#icons");
  if (id === "toggleMarkers") return $("#markers");
  if (id === "toggleRulers") return $("#ruler");
}

// get surface elevation
getElevation(f, h) {
  if (f.land) return this.getHeight(h) + " (" + h + ")"; // land: usual height
  if (f.border) return "0 " + this.heightUnit.value; // ocean: 0
  if (f.type === "lake") return this.getHeight(f.height) + " (" + f.height + ")"; // lake: defined on river generation
}

// get water depth
getDepth(f, h, p) {
  if (f.land) return "0 " + this.heightUnit.value; // land: 0

  // lake: difference between surface and bottom
  const gridH = this.grid.cells.h[this.findGridCell(p[0], p[1])];
  if (f.type === "lake") {
    const depth = gridH === 19 ? f.height / 2 : gridH;
    return this.getHeight(depth, "abs");
  }

  return this.getHeight(gridH, "abs"); // ocean: grid height
}

// get user-friendly (real-world) height value from map data
getFriendlyHeight(p) {
  const packH = this.pack.cells.h[this.findCell(p[0], p[1])];
  const gridH = this.grid.cells.h[this.findGridCell(p[0], p[1])];
  const h = packH < 20 ? gridH : packH;
  return this.getHeight(h);
}

getHeight(h, abs: any = false) {
  const unit = 'ft';//this.heightUnit.value;
  let unitRatio = 3.281; // default calculations are in feet
  // if (unit === "m") unitRatio = 1;
  // // if meter
  // else if (unit === "f") unitRatio = 0.5468; // if fathom

  let height = -990;
  if (h >= 20) height = Math.pow(h - 18, +this.heightExponentInput);
  else if (h < 20 && h > 0) height = ((h - 20) / h) * 50;

  if (abs) height = Math.abs(height);
  return this.rn(height * unitRatio) + " " + unit;
}

// get user-friendly (real-world) precipitation value from map data
getFriendlyPrecipitation(i) {
  const prec = this.grid.cells.prec[this.pack.cells.g[i]];
  return prec * 100 + " mm";
}

getRiverInfo(id) {
  const r = this.pack.rivers.find(r => r.i == id);
  return r ? `${r.name} ${r.type} (${id})` : "n/a";
}

getCellPopulation(i) {
  const rural = this.pack.cells.pop[i] * this.populationRate;
  const urban = this.pack.cells.burg[i] ? this.pack.burgs[this.pack.cells.burg[i]].population * this.populationRate * this.urbanization : 0;
  return [rural, urban];
}

// get user-friendly (real-world) population value from map data
getFriendlyPopulation(i) {
  const [rural, urban] = this.getCellPopulation(i);
  return `${this.si(rural + urban)} (${this.si(rural)} rural, urban ${this.si(urban)})`;
}

 getPopulationTip(i) {
  const [rural, urban] = this.getCellPopulation(i);
  return `Cell population: ${this.si(rural + urban)}; Rural: ${this.si(rural)}; Urban: ${this.si(urban)}`;
}

highlightEmblemElement(type, el) {
  const i = el.i,
    cells = this.pack.cells;
  const animation = d3.transition().duration(1000).ease(d3.easeSinIn);

  if (type === "burg") {
    const {x, y} = el;
    return;
  }

  const [x, y] = el.pole || this.pack.cells.p[el.center];
  const obj = type === "state" ? cells.state : cells.province;
  const borderCells = cells.i.filter(id => obj[id] === i && cells.c[id].some(n => obj[n] !== i));
  const data = Array.from(borderCells)
    .filter((c, i) => !(i % 2))
    .map((i:number) => cells.p[i])
    .map(i => [i[0], i[1], Math.hypot(i[0] - x, i[1] - y)]);

}

mouseMove = () => {
  console.log("Mouse Move");
  const point = d3.mouse(d3.event.currentTarget); 
  console.log(point);
  const i = this.findCell(point[0], point[1]); // pack cell id
  if (i === undefined) return;
  // showNotes(d3.event, i);
  const g = this.findGridCell(point[0], point[1]); // grid cell id
  // if (tooltip.dataset.main) showMainTip();
  // else showMapTooltip(point, d3.event, i, g);
  // if (cellInfo.offsetParent) updateCellInfo(point, i, g);
}

// restore default viewbox events
restoreDefaultEvents() {
  this.svg.call(this.zoom);
  let dragLegendBox = this.dragLegendBox;
  console.log("Restore Default");
  // this.viewbox._groups[0][0].addEventListener("drag", null);
  // this.viewbox._groups[0][0].addEventListener("click", this.clicked);
  // this.viewbox._groups[0][0].addEventListener("touchmove mousemove", this.moved);
  // this.viewbox.addEventListener("drag", null).addEventListener("click", this.clicked).addEventListener("touchmove mousemove", this.moved);
  this.viewbox.style("cursor", "default").on(".drag", null).on("click", this.clicked).on("touchmove mousemove", this.moved);
  // this.legend.call(d3.drag().on("start", dragLegendBox));
  this.legend.style("cursor", "default").on(".drag", null).on("click", this.clearLegend()).on("touchmove mousemove", this.dragLegendBox);
  console.log(this.legend);
}

// clear elSelected variable
unselect() {
  this.restoreDefaultEvents();
  if (!this.elSelected) return;
  this.elSelected.call(d3.drag().on("drag", null)).attr("class", null);
  this.debug.selectAll("*").remove();
  this.viewbox.style("cursor", "default");
  this.elSelected = null;
}

// close all dialogs except stated
closeDialogs(except = "#except") {
  $(".dialog:visible")
    .not(except)
    .each(function () {
      $(this).dialog("close");
    });
}

// move brush radius circle
moveCircle(x, y, r = '20') {
  let circle = document.getElementById("brushCircle");
  if (!circle) {
    // const html = `<circle id="brushCircle" cx=${x} cy=${y} r=${r}></circle>`;
    // document.getElementById("debug").insertAdjacentHTML("afterBegin", html);
  } else {
    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", r);
  }
}

 removeCircle() {
  if (document.getElementById("brushCircle")) document.getElementById("brushCircle").remove();
}

// get browser-defined fit-content
fitContent() {
  // return !window.chrome ? "-moz-max-content" : "fit-content";
  return "fit-content";
}

sortLines(header) {
  const type = header.classList.contains("alphabetically") ? "name" : "number";
  let order = header.className.includes("-down") ? "-up" : "-down";
  if (!header.className.includes("icon-sort") && type === "name") order = "-up";

  const headers = header.parentNode;
  headers.querySelectorAll("div.sortable").forEach(e => {
    e.classList.forEach(c => {
      if (c.includes("icon-sort")) e.classList.remove(c);
    });
  });
  header.classList.add("icon-sort-" + type + order);
  this.applySorting(headers);
}

applySorting(headers) {
  const header = headers.querySelector("div[class*='icon-sort']");
  if (!header) return;
  const sortby = header.dataset.sortby;
  const name = header.classList.contains("alphabetically");
  const desc = header.className.includes("-down") ? -1 : 1;
  const list = headers.nextElementSibling;
  const lines = Array.from(list.children);

  lines
    .sort((a:any, b:any) => {
      const an = name ? a.dataset[sortby] : +a.dataset[sortby];
      const bn = name ? b.dataset[sortby] : +b.dataset[sortby];
      return (an > bn ? 1 : an < bn ? -1 : 0) * desc;
    })
    .forEach(line => list.appendChild(line));
}

addBurg(point) {
  const cells = this.pack.cells;
  const x = this.rn(point[0], 2),
    y = this.rn(point[1], 2);
  const cell = this.findCell(x, point[1]);
  const i = this.pack.burgs.length;
  const culture = cells.culture[cell];
  const name = this.Names.getCulture(culture);
  const state = cells.state[cell];
  const feature = cells.f[cell];

  const temple = this.pack.states[state].form === "Theocracy";
  const population = Math.max((cells.s[cell] + cells.road[cell]) / 3 + i / 1000 + (cell % 100) / 1000, 0.1);
  const type = this.BurgsAndStates.getType(cell, false);

  // generate emblem
  const coa = this.COA.generate(this.pack.states[state].coa, 0.25, null, type);
  coa.shield = this.COA.getShield(culture, state);
  this.COArenderer.add("burg", i, coa, x, y);

  this.pack.burgs.push({name, cell, x, y, state, i, culture, feature, capital: 0, port: 0, temple, population, coa, type});
  cells.burg[cell] = i;

  const townSize = this.burgIcons.select("#towns").attr("size") || 0.5;
  this.burgIcons
    .select("#towns")
    .append("circle")
    .attr("id", "burg" + i)
    .attr("data-id", i)
    .attr("cx", x)
    .attr("cy", y)
    .attr("r", townSize);
  this.burgLabels
    .select("#towns")
    .append("text")
    .attr("id", "burgLabel" + i)
    .attr("data-id", i)
    .attr("x", x)
    .attr("y", y)
    .attr("dy", `${townSize * -1.5}px`)
    .text(name);

  this.BurgsAndStates.defineBurgFeatures(this.pack.burgs[i]);
  return i;
}

moveBurgToGroup(id, g) {
  const label = document.querySelector("#burgLabels [data-id='" + id + "']");
  const icon = document.querySelector("#burgIcons [data-id='" + id + "']");
  const anchor = document.querySelector("#anchors [data-id='" + id + "']");
  if (!label || !icon) {
    console.error("Cannot find label or icon elements");
    return;
  }

  document.querySelector("#burgLabels > #" + g).appendChild(label);
  document.querySelector("#burgIcons > #" + g).appendChild(icon);

  const iconSize = (<any>icon.parentNode).getAttribute("size");
  icon.setAttribute("r", iconSize);
  label.setAttribute("dy", `${iconSize * -1.5}px`);

  if (anchor) {
    document.querySelector("#anchors > #" + g).appendChild(anchor);
    const anchorSize = +(<any>anchor.parentNode).getAttribute("size");
    anchor.setAttribute("width", anchorSize.toString());
    anchor.setAttribute("height", anchorSize.toString());
    anchor.setAttribute("x", this.rn(this.pack.burgs[id].x - anchorSize * 0.47, 2).toString());
    anchor.setAttribute("y", this.rn(this.pack.burgs[id].y - anchorSize * 0.47, 2).toString());
  }
}

removeBurg(id) {
  const label = document.querySelector("#burgLabels [data-id='" + id + "']");
  const icon = document.querySelector("#burgIcons [data-id='" + id + "']");
  const anchor = document.querySelector("#anchors [data-id='" + id + "']");
  if (label) label.remove();
  if (icon) icon.remove();
  if (anchor) anchor.remove();

  const cells = this.pack.cells,
    burg = this.pack.burgs[id];
  burg.removed = true;
  cells.burg[burg.cell] = 0;

  if (burg.coa) {
    const coaId = "burgCOA" + id;
    if (document.getElementById(coaId)) document.getElementById(coaId).remove();
    this.emblems.select(`#burgEmblems > use[data-i='${id}']`).remove();
    delete burg.coa; // remove to save data
  }
}

toggleCapital(burg) {
  const state = this.pack.burgs[burg].state;
  if (!state) {
    // tip("Neutral lands cannot have a capital", false, "error");
    return;
  }
  if (this.pack.burgs[burg].capital) {
    // tip("To change capital please assign a capital status to another burg of this state", false, "error");
    return;
  }
  const old = this.pack.states[state].capital;

  // change statuses
  this.pack.states[state].capital = burg;
  this.pack.states[state].center = this.pack.burgs[burg].cell;
  this.pack.burgs[burg].capital = 1;
  this.pack.burgs[old].capital = 0;
  this.moveBurgToGroup(burg, "cities");
  this.moveBurgToGroup(old, "towns");
}

togglePort(burg) {
  const anchor = document.querySelector("#anchors [data-id='" + burg + "']");
  if (anchor) anchor.remove();
  const b = this.pack.burgs[burg];
  if (b.port) {
    b.port = 0;
    return;
  } // not a port anymore

  const haven = this.pack.cells.haven[b.cell];
  const port = haven ? this.pack.cells.f[haven] : -1;
  // if (!haven) tip("Port haven is not found, system won't be able to make a searoute", false, "warn");
  b.port = port;

  const g = b.capital ? "cities" : "towns";
  const group = this.anchors.select("g#" + g);
  const size = +group.attr("size");
  group
    .append("use")
    .attr("xlink:href", "#icon-anchor")
    .attr("data-id", burg)
    .attr("x", this.rn(b.x - size * 0.47, 2))
    .attr("y", this.rn(b.y - size * 0.47, 2))
    .attr("width", size)
    .attr("height", size);
}

toggleBurgLock(burg) {
  const b = this.pack.burgs[burg];
  b.lock = b.lock ? 0 : 1;
}

showBurgLockTip(burg) {
  const b = this.pack.burgs[burg];
  if (b.lock) {
    // tip("Click to Unlock burg and allow it to be change by regeneration tools");
  } else {
    // tip("Click to Lock burg and prevent changes by regeneration tools");
  }
}

drawStatesLegend() {
  const data = this.pack.states
    .filter(s => s.i && !s.removed && s.cells)
    .sort((a, b) => b.area - a.area)
    .map(s => [s.i, s.color, s.name]);
  this.drawLegend("States", data);
}

drawReligionsLegend() {
  console.log(this.pack.religions);
  const data = this.pack.religions
    .map(r => [r.i, r.color, r.name]);
  this.drawLegend("Religions", data);
}

drawCulturesLegend() {
  const data = this.pack.cultures
    .map(c => [c.i, c.color, c.name]);
  this.drawLegend("Cultures", data);
}


// draw legend box
drawLegend(name, data) {
  if (this.legend.selectAll("*").size() && this.activeLegend == name) {
    this.clearLegend();
    return;
  } // hide legend
  this.activeLegend = name;
  this.legend.selectAll("*").remove(); // fully redraw every time
  this.legend.attr("data", data.join("|")); // store data
  console.log(this.legend);
  // this.legend._groups[0][0].addEventListener("click", this.dragLegendBox);
  // this.legend._groups[0][0].addEventListener("touchmove mousemove", this.moved);

  const itemsInCol = +8;
  const fontSize = +this.legend.attr("font-size");
  const backClr = "#ffffff";
  const opacity = +0.8;

  const lineHeight = Math.round(fontSize * 1.7);
  const colorBoxSize = Math.round(fontSize / 1.7);
  const colOffset = fontSize;
  const vOffset = fontSize / 2;

  // append items
  const boxes = this.legend.append("g").attr("stroke-width", 0.5).attr("stroke", "#111111").attr("stroke-dasharray", "none");
  const labels = this.legend.append("g").attr("fill", "#000000").attr("stroke", "none");

  const columns = Math.ceil(data.length / itemsInCol);
  for (let column = 0, i = 0; column < columns; column++) {
    const linesInColumn = Math.ceil(data.length / columns);
    const offset = column ? colOffset * 2 + this.legend.node().getBBox().width : colOffset;

    for (let l = 0; l < linesInColumn && data[i]; l++, i++) {
      boxes
        .append("rect")
        .attr("fill", data[i][1])
        .attr("x", offset)
        .attr("y", lineHeight + l * lineHeight + vOffset)
        .attr("width", colorBoxSize)
        .attr("height", colorBoxSize);

      labels
        .append("text")
        .text(data[i][2])
        .attr("x", offset + colorBoxSize * 1.6)
        .attr("y", fontSize / 1.6 + lineHeight + l * lineHeight + vOffset);
    }
  }

  // append label
  const offset = colOffset + this.legend.node().getBBox().width / 2;
  labels
    .append("text")
    .attr("text-anchor", "middle")
    .attr("font-weight", "bold")
    .attr("font-size", "1.2em")
    .attr("id", "legendLabel")
    .text(name)
    .attr("x", offset)
    .attr("y", fontSize * 1.1 + vOffset / 2);

  // append box
  const bbox = this.legend.node().getBBox();
  const width = bbox.width + colOffset * 2;
  const height = bbox.height + colOffset / 2 + vOffset;

  this.legend.insert("rect", ":first-child").attr("id", "legendBox").attr("x", 0).attr("y", 0).attr("width", width).attr("height", height).attr("fill", backClr).attr("fill-opacity", opacity);

  this.fitLegendBox();
}

// fit Legend box to canvas size
fitLegendBox() {
  if (!this.legend.selectAll("*").size()) return;
  const px = isNaN(+this.legend.attr("data-x")) ? 99 : this.legend.attr("data-x") / 100;
  const py = isNaN(+this.legend.attr("data-y")) ? 93 : this.legend.attr("data-y") / 100;
  const bbox = this.legend.node().getBBox();
  const x = this.rn(this.svgWidth * px - bbox.width),
    y = this.rn(this.svgHeight * py - bbox.height);
  // this.legend.attr("transform", `translate(${x},${y})`);
  this.legend.attr("transform", `translate(50,50)`);
}

// draw legend with the same data, but using different settings
redrawLegend() {
  if (!this.legend.select("rect").size()) return;
  const name = this.legend.select("#legendLabel").text();
  const data = this.legend
    .attr("data")
    .split("|")
    .map(l => l.split(","));
  this.drawLegend(name, data);
}
dragLegendBox = (event) => {
  console.log("dragLegendBox");
  console.log(event.target);
  console.log(d3);
  console.log(d3.event);
  const tr = this.parseTransform(event.target.getAttribute("transform"));
  const x = +tr[0] - d3.event.x,
    y = +tr[1] - d3.event.y;
  const bbox = this.legend.node().getBBox();
  d3.event.on("drag", () => {
    const px = this.rn(((x + d3.event.x + bbox.width) / this.svgWidth) * 100, 2);
    const py = this.rn(((y + d3.event.y + bbox.height) / this.svgHeight) * 100, 2);
    const transform = `translate(${x + d3.event.x},${y + d3.event.y})`;
    this.legend.attr("transform", transform).attr("data-x", px).attr("data-y", py);
  });
}

clearLegend() {
  this.legend.selectAll("*").remove();
  this.legend.attr("data", null);
}

// draw color (fill) picker
createPicker() {
  const pos = () => console.log("Drag to change the picker position");//tip("Drag to change the picker position");
  const cl = () => console.log("Click to close the picker");//tip("Click to close the picker");
  const closePicker = () => contaiter.style("display", "none");

  const contaiter = d3.select("body").append("svg").attr("id", "pickerContainer").attr("width", "100%").attr("height", "100%");
  contaiter.append("rect").attr("x", 0).attr("y", 0).attr("width", "100%").attr("height", "100%").attr("opacity", 0.2).on("mousemove", cl).on("click", closePicker);
  const picker = contaiter
    .append("g")
    .attr("id", "picker")
    .call(
      d3
        .drag()
        .filter(() => (<any>event.target).tagName !== "INPUT")
        .on("start", this.dragPicker)
    );

  const controls = picker.append("g").attr("id", "pickerControls");
  const h = controls.append("g");
  h.append("text").attr("x", 4).attr("y", 14).text("H:");
  h.append("line").attr("x1", 18).attr("y1", 10).attr("x2", 107).attr("y2", 10);
  h.append("circle").attr("cx", 75).attr("cy", 10).attr("r", 5).attr("id", "pickerH");
  h.on("mousemove", () => console.log("Set palette hue"));//tip("Set palette hue"));

  const s = controls.append("g");
  s.append("text").attr("x", 113).attr("y", 14).text("S:");
  s.append("line").attr("x1", 124).attr("y1", 10).attr("x2", 206).attr("y2", 10);
  s.append("circle").attr("cx", 181.4).attr("cy", 10).attr("r", 5).attr("id", "pickerS");
  s.on("mousemove", () => console.log("Set palette saturation"));//tip("Set palette saturation"));

  const l = controls.append("g");
  l.append("text").attr("x", 213).attr("y", 14).text("L:");
  l.append("line").attr("x1", 226).attr("y1", 10).attr("x2", 306).attr("y2", 10);
  l.append("circle").attr("cx", 282).attr("cy", 10).attr("r", 5).attr("id", "pickerL");
  l.on("mousemove", () => console.log("Set palette lightness"));//tip("Set palette lightness"));

  controls.selectAll("line").on("click", this.clickPickerControl);
  controls.selectAll("circle").call(d3.drag().on("start", this.dragPickerControl));

  const spaces = picker
    .append("foreignObject")
    .attr("id", "pickerSpaces")
    .attr("x", 4)
    .attr("y", 20)
    .attr("width", 303)
    .attr("height", 20)
    .on("mousemove", () => console.log("Color value in different color spaces. Edit to change"));//tip("Color value in different color spaces. Edit to change"));
  const html = `
  <label style="margin-right: 6px">HSL: 
    <input type="number" id="pickerHSL_H" data-space="hsl" min=0 max=360 value="231">,
    <input type="number" id="pickerHSL_S" data-space="hsl" min=0 max=100 value="70">, 
    <input type="number" id="pickerHSL_L" data-space="hsl" min=0 max=100 value="70">
  </label>
  <label style="margin-right: 6px">RGB: 
    <input type="number" id="pickerRGB_R" data-space="rgb" min=0 max=255 value="125">,
    <input type="number" id="pickerRGB_G" data-space="rgb" min=0 max=255 value="142">, 
    <input type="number" id="pickerRGB_B" data-space="rgb" min=0 max=255 value="232">
  </label>
  <label>HEX: <input type="text" id="pickerHEX" data-space="hex" style="width:42px" autocorrect="off" spellcheck="false" value="#7d8ee8"></label>`;
  spaces.node().insertAdjacentHTML("beforeend", html);
  spaces.selectAll("input").on("change", this.changePickerSpace);

  const colors = picker.append("g").attr("id", "pickerColors").attr("stroke", "#333333");
  const hatches = picker.append("g").attr("id", "pickerHatches").attr("stroke", "#333333");
  const hatching = d3.selectAll("g#hatching > pattern");
  const number = hatching.size();

  const clr = d3.range(number).map(i => d3.hsl((i / number) * 360, 0.7, 0.7).hex());
  clr.forEach(function (d, i) {
    colors
      .append("rect")
      .attr("id", "picker_" + d)
      .attr("fill", d)
      .attr("class", i ? "" : "selected")
      .attr("x", i * 22 + 4)
      .attr("y", 40)
      .attr("width", 16)
      .attr("height", 16);
  });

  hatching.each(function (d, i) {
    hatches
      .append("rect")
      .attr("id", "picker_" + this.id)
      .attr("fill", "url(#" + this.id + ")")
      .attr("x", i * 22 + 4)
      .attr("y", 61)
      .attr("width", 16)
      .attr("height", 16);
  });

  colors
    .selectAll("rect")
    .on("click", this.pickerFillClicked)
    .on("mousemove", () => console.log("Click to fill with the color"));//tip("Click to fill with the color"));
  hatches
    .selectAll("rect")
    .on("click", this.pickerFillClicked)
    .on("mousemove", () => console.log("Click to fill with the hatching"));//tip("Click to fill with the hatching"));

  // append box
  const bbox = picker.node().getBBox();
  const width = bbox.width + 8;
  const height = bbox.height + 9;

  picker.insert("rect", ":first-child").attr("x", 0).attr("y", 0).attr("width", width).attr("height", height).attr("fill", "#ffffff").attr("stroke", "#5d4651").on("mousemove", pos);
  picker.insert("text", ":first-child").attr("x", 291).attr("y", -10).attr("id", "pickerCloseText").text("✕");
  picker.insert("rect", ":first-child").attr("x", 288).attr("y", -21).attr("id", "pickerCloseRect").attr("width", 14).attr("height", 14).on("mousemove", cl).on("click", closePicker);
  picker.insert("text", ":first-child").attr("x", 12).attr("y", -10).attr("id", "pickerLabel").text("Color Picker").on("mousemove", pos);
  picker.insert("rect", ":first-child").attr("x", 0).attr("y", -30).attr("width", width).attr("height", 30).attr("id", "pickerHeader").on("mousemove", pos);
  picker.attr("transform", `translate(${(this.svgWidth - width) / 2},${(this.svgHeight - height) / 2})`);
}

updateSelectedRect(fill) {
  document.getElementById("picker").querySelector("rect.selected").classList.remove("selected");
  document
    .getElementById("picker")
    .querySelector("rect[fill='" + fill.toLowerCase() + "']")
    .classList.add("selected");
}

updateSpaces() {
  // hsl
  const h = this.getPickerControl(this.pickerH, 360);
  const s = this.getPickerControl(this.pickerS, 1);
  const l = this.getPickerControl(this.pickerL, 1);
  this.pickerHSL_H.value = this.rn(h);
  this.pickerHSL_S.value = this.rn(s * 100); // multiplied by 100
  this.pickerHSL_L.value = this.rn(l * 100); // multiplied by 100

  // rgb
  const rgb = d3.color(d3.hsl(h, s, l));
  this.pickerRGB_R.value = rgb.r;
  this.pickerRGB_G.value = rgb.g;
  this.pickerRGB_B.value = rgb.b;

  // hex
  this.pickerHEX.value = rgb.hex();
}

updatePickerColors() {
  const colors = d3.select("#picker > #pickerColors").selectAll("rect");
  const number = colors.size();

  const h = this.getPickerControl(this.pickerH, 360);
  const s = this.getPickerControl(this.pickerS, 1);
  const l = this.getPickerControl(this.pickerL, 1);

  colors.each(function (d, i) {
    const clr = d3.hsl((i / number) * 180 + h, s, l).hex();
    this.setAttribute("id", "picker_" + clr);
    this.setAttribute("fill", clr);
  });
}

openPicker(fill, callback) {
  const picker = d3.select("#picker");
  if (!picker.size()) this.createPicker();
  d3.select("#pickerContainer").style("display", "block");

  if (fill[0] === "#") {
    const hsl = d3.hsl(fill);
    if (!isNaN(hsl.h)) this.setPickerControl(this.pickerH, hsl.h, 360);
    if (!isNaN(hsl.s)) this.setPickerControl(this.pickerS, hsl.s, 1);
    if (!isNaN(hsl.l)) this.setPickerControl(this.pickerL, hsl.l, 1);
    this.updateSpaces();
    this.updatePickerColors();
  }

  this.updateSelectedRect(fill);

  const updateFill = function () {
    const selected = document.getElementById("picker").querySelector("rect.selected");
    if (!selected) return;
    callback(selected.getAttribute("fill"));
  };
}

setPickerControl(control, value, max) {
  const min = +control.previousSibling.getAttribute("x1");
  const delta = +control.previousSibling.getAttribute("x2") - min;
  const percent = value / max;
  control.setAttribute("cx", min + delta * percent);
}

getPickerControl(control, max) {
  const min = +control.previousSibling.getAttribute("x1");
  const delta = +control.previousSibling.getAttribute("x2") - min;
  const current = +control.getAttribute("cx") - min;
  return (current / delta) * max;
}

dragPicker() {
  console.log("Drag Picker");
  // const tr = this.parseTransform(this.getAttribute("transform"));
  // const x = +tr[0] - d3.event.x,
  //   y = +tr[1] - d3.event.y;
  // const picker = d3.select("#picker");
  // const bbox = picker.node().getBBox();

  // d3.event.on("drag", () => {
  //   const px = this.rn(((x + d3.event.x + bbox.width) / this.svgWidth) * 100, 2);
  //   const py = this.rn(((y + d3.event.y + bbox.height) / this.svgHeight) * 100, 2);
  //   const transform = `translate(${x + d3.event.x},${y + d3.event.y})`;
  //   picker.attr("transform", transform).attr("data-x", px).attr("data-y", py);
  // });
}

pickerFillClicked() {
  console.log("pickerFillClicked");

  // const fill = this.getAttribute("fill");
  // this.updateSelectedRect(fill);
  // this.openPicker.updateFill();

  // const hsl = d3.hsl(fill);
  // if (isNaN(hsl.h)) return; // not a color
  // this.setPickerControl(this.pickerH, hsl.h, 360);
  // this.updateSpaces();
}

clickPickerControl = function () {
  console.log("clickPickerControl");
  const min = this.getScreenCTM().e;
  this.nextSibling.setAttribute("cx", d3.event.x - min);
  // updateSpaces();
  // updatePickerColors();
  // openPicker.updateFill();
}

dragPickerControl = function () {
  console.log("dragPickerControl");
  const min = +this.previousSibling.getAttribute("x1");
  const max = +this.previousSibling.getAttribute("x2");

  // d3.event.on("drag", function () {
  //   const x = Math.max(Math.min(d3.event.x, max), min);
  //   this.setAttribute("cx", x);
  //   updateSpaces();
  //   updatePickerColors();
  //   openPicker.updateFill();
  // });
}

changePickerSpace() {
  console.log("changePickerSpace");
  // const valid = this.checkValidity();
  // if (!valid) {
    // tip("You must provide a correct value", false, "error");
  //   return;
  // }

  // const space = this.dataset.space;
  // const i = Array.from(this.parentNode.querySelectorAll("input")).map(input => input.value); // inputs
  // const fill = space === "hex" ? d3.rgb(this.value) : space === "rgb" ? d3.rgb(i[0], i[1], i[2]) : d3.hsl(i[0], i[1] / 100, i[2] / 100);

  // const hsl = d3.hsl(fill);
  // if (isNaN(hsl.l)) {
  //   tip("You must provide a correct value", false, "error");
  //   return;
  // }
  // if (!isNaN(hsl.h)) this.setPickerControl(this.pickerH, hsl.h, 360);
  // if (!isNaN(hsl.s)) this.setPickerControl(this.pickerS, hsl.s, 1);
  // if (!isNaN(hsl.l)) this.setPickerControl(this.pickerL, hsl.l, 1);

  // this.updateSpaces();
  // this.updatePickerColors();
  // this.openPicker.updateFill();
}

// add fogging
fog(id, path) {
  if (this.defs.select("#fog #" + id).size()) return;
  const fadeIn = d3.transition().duration(2000).ease(d3.easeSinInOut);
  if (this.defs.select("#fog path").size()) {
    this.defs.select("#fog").append("path").attr("d", path).attr("id", id).attr("opacity", 0).transition(fadeIn).attr("opacity", 1);
  } else {
    this.defs.select("#fog").append("path").attr("d", path).attr("id", id).attr("opacity", 1);
    const opacity = this.fogging.attr("opacity");
    this.fogging.style("display", "block").attr("opacity", 0).transition(fadeIn).attr("opacity", opacity);
  }
}

// remove fogging
unfog(id) {
  let el = this.defs.select("#fog #" + id);
  if (!id || !el.size()) el = this.defs.select("#fog").selectAll("path");

  el.remove();
  if (!this.defs.selectAll("#fog path").size()) this.fogging.style("display", "none");
}

getFileName(dataType) {
  const formatTime = time => (time < 10 ? "0" + time : time);
  const name = this.mapName;
  const type = dataType ? dataType + " " : "";
  const date = new Date();
  const year = date.getFullYear();
  const month = formatTime(date.getMonth() + 1);
  const day = formatTime(date.getDate());
  const hour = formatTime(date.getHours());
  const minutes = formatTime(date.getMinutes());
  const dateString = [year, month, day, hour, minutes].join("-");
  return name + " " + type + dateString;
}

downloadFile(data, name, type = "text/plain") {
  const dataBlob = new Blob([data], {type});
  const url = window.URL.createObjectURL(dataBlob);
  const link = document.createElement("a");
  link.download = name;
  link.href = url;
  link.click();
  window.setTimeout(() => window.URL.revokeObjectURL(url), 2000);
}

loadMapPrompt(blob) {
  const uploadMap = this.uploadMap;
  // const workingTime = (Date.now() - this.last(this.mapHistory).created) / 60000; // minutes
  // if (workingTime < 5) {
  //   loadLastSavedMap();
  //   return;
  // }
  loadLastSavedMap();

  // alertMessage.innerHTML = `Are you sure you want to load saved map?<br>
  // All unsaved changes made to the current map will be lost`;
  // $("#alert").dialog({
  //   resizable: false,
  //   title: "Load saved map",
  //   buttons: {
  //     Cancel: function () {
  //       $(this).dialog("close");
  //     },
  //     Load: function () {
  //       loadLastSavedMap();
  //       $(this).dialog("close");
  //     }
  //   }
  // });

  function loadLastSavedMap() {
    console.warn("Load last saved map");
    try {
      uploadMap(blob, null);
    } catch (error) {
      console.error(error);
      // tip("Cannot load last saved map", true, "error", 2000);
    }
  }
}

quickLoad() {
  this.ldb.get("lastMap", blob => {
    if (blob) {
      this.loadMapPrompt(blob);
    } else {
      // tip("No map stored. Save map to storage first", true, "error", 2000);
      console.error("No map stored");
    }
  });
}

uploadFile(el, callback) {
  const fileReader = new FileReader();
  fileReader.readAsText(el.files[0], "UTF-8");
  el.value = "";
  fileReader.onload = loaded => callback(loaded.target.result);
}

// apply default biomes data
applyDefaultBiomesSystem() {
  const name = ["Marine", "Hot desert", "Cold desert", "Savanna", "Grassland", "Tropical seasonal forest", "Temperate deciduous forest", "Tropical rainforest", "Temperate rainforest", "Taiga", "Tundra", "Glacier", "Wetland"];
  const color = ["#466eab", "#fbe79f", "#b5b887", "#d2d082", "#c8d68f", "#b6d95d", "#29bc56", "#7dcb35", "#409c43", "#4b6b32", "#96784b", "#d5e7eb", "#0b9131"];
  const habitability = [0, 4, 10, 22, 30, 50, 100, 80, 90, 12, 4, 0, 12];
  const iconsDensity = [0, 3, 2, 120, 120, 120, 120, 150, 150, 100, 5, 0, 150];
  const icons: any[] = [{}, {dune: 3, cactus: 6, deadTree: 1}, {dune: 9, deadTree: 1}, {acacia: 1, grass: 9}, {grass: 1}, {acacia: 8, palm: 1}, {deciduous: 1}, {acacia: 5, palm: 3, deciduous: 1, swamp: 1}, {deciduous: 6, swamp: 1}, {conifer: 1}, {grass: 1}, {}, {swamp: 1}];
  const cost = [10, 200, 150, 60, 50, 70, 70, 80, 90, 200, 1000, 5000, 150]; // biome movement cost
  const biomesMartix = [
    // hot ↔ cold [>19°C; <-4°C]; dry ↕ wet
    new Uint8Array([1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 10]),
    new Uint8Array([3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 9, 9, 9, 9, 10, 10, 10]),
    new Uint8Array([5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 9, 9, 9, 9, 9, 10, 10, 10]),
    new Uint8Array([5, 6, 6, 6, 6, 6, 6, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9, 10, 10, 10]),
    new Uint8Array([7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9, 9, 10, 10])
  ];

  // parse icons weighted array into a simple array
  for (let i = 0; i < icons.length; i++) {
    const parsed = [];
    for (const icon in icons[i]) {
      for (let j = 0; j < icons[i][icon]; j++) {
        parsed.push(icon);
      }
    }
    icons[i] = parsed;
  }

  return {i: d3.range(0, name.length), name, color, biomesMartix, habitability, iconsDensity, icons, cost};
}

highlightElement(element) {
  if (this.debug.select(".highlighted").size()) return; // allow only 1 highlight element simultaniosly
  const box = element.getBBox();
  const transform = element.getAttribute("transform") || null;
  const enter = d3.transition().duration(1000).ease(d3.easeBounceOut);
  const exit = d3.transition().duration(500).ease(d3.easeLinear);

  const highlight = this.debug.append("rect").attr("x", box.x).attr("y", box.y).attr("width", box.width).attr("height", box.height).attr("transform", transform);

  highlight.classed("highlighted", 1).transition(enter).style("outline-offset", "0px").transition(exit).style("outline-color", "transparent").delay(1000).remove();

  const tr = this.parseTransform(transform);
  let x = box.x + box.width / 2;
  if (tr[0]) x += tr[0];
  let y = box.y + box.height / 2;
  if (tr[1]) y += tr[1];
  this.zoomTo(x, y, this.scale > 2 ? this.scale : 3, 1600);
}

selectIcon(initial, callback) {
  if (!callback) return;
  $("#iconSelector").dialog();

  const table = document.getElementById("iconTable");
  const input = <HTMLInputElement>document.getElementById("iconInput");
  input.value = initial;

  if (!table.innerHTML) {
    const icons = ["⚔️","🏹","🐴","💣","🌊","🎯","⚓","🔮","📯","⚒️","🛡️","👑","⚜️","☠️","🎆","🗡️","🔪","⛏️","🔥","🩸","💧","🐾","🎪","🏰","🏯","⛓️","❤️","💘","💜","📜","🔔","🔱","💎","🌈","🌠","✨","💥","☀️","🌙","⚡","❄️","♨️","🎲","🚨","🌉","🗻","🌋","🧱","⚖️","✂️","🎵","👗","🎻","🎨","🎭","⛲","💉","📖","📕","🎁","💍","⏳","🕸️","⚗️","☣️","☢️","🔰","🎖️","🚩","🏳️","🏴","💪","✊","👊","🤜","🤝","🙏","🧙","🧙‍♀️","💂","🤴","🧛","🧟","🧞","🧝","👼","👻","👺","👹","🦄","🐲","🐉","🐎","🦓","🐺","🦊","🐱","🐈","🦁","🐯","🐅","🐆","🐕","🦌","🐵","🐒","🦍","🦅","🕊️","🐓","🦇","🦜","🐦","🦉","🐮","🐄","🐂","🐃","🐷","🐖","🐗","🐏","🐑","🐐","🐫","🦒","🐘","🦏","🐭","🐁","🐀","🐹","🐰","🐇","🦔","🐸","🐊","🐢","🦎","🐍","🐳","🐬","🦈","🐠","🐙","🦑","🐌","🦋","🐜","🐝","🐞","🦗","🕷️","🦂","🦀","🌳","🌲","🎄","🌴","🍂","🍁","🌵","☘️","🍀","🌿","🌱","🌾","🍄","🌽","🌸","🌹","🌻","🍒","🍏","🍇","🍉","🍅","🍓","🥔","🥕","🥩","🍗","🍞","🍻","🍺","🍲","🍷"
    ];

    let row:HTMLTableRowElement;
    for (let i = 0; i < icons.length; i++) {
      if (i % 17 === 0) row = (<HTMLTableElement>table).insertRow((i / 17) | 0);
      const cell = row.insertCell(i % 17);
      cell.innerHTML = icons[i];
    }
  }

  table.onclick = (e:any) => {
    if (e.target.tagName === "TD") {
      input.value = e.target.innerHTML;
      callback(input.value);
    }
  };
  table.onmouseover = (e:any) => {
    // if (e.target.tagName === "TD") tip(`Click to select ${e.target.innerHTML} icon`);
  };

  $("#iconSelector").dialog({
    width: 'fit-content', //fitContent(),
    title: "Select Icon",
    buttons: {
      Apply: function () {
        callback(input.value || "⠀");
        $(this).dialog("close");
      },
      Close: function () {
        callback(initial);
        $(this).dialog("close");
      }
    }
  });
}
// active zooming feature
invokeActiveZooming() {
  console.log("Active Zooming");
  if (this.coastline.select("#sea_island").size() && +this.coastline.select("#sea_island").attr("auto-filter")) {
    // toggle shade/blur filter for coatline on zoom
    const filter = this.scale > 1.5 && this.scale <= 2.6 ? null : this.scale > 2.6 ? "url(#blurFilter)" : "url(#dropShadow)";
    this.coastline.select("#sea_island").attr("filter", filter);
  }
  let rescaleLabels = this.rescaleLabels;
  let hideLabels = this.hideLabels;
  let rn = this.rn;
  let scale = this.scale;
  // rescale lables on zoom
  if (this.labels.style("display") !== "none") {
    this.labels.selectAll("g").each(function () {
      if (this.id === "burgLabels") return;
      const desired = +this.dataset.size;
      const relative = Math.max(rn((desired + desired / scale) / 2, 2), 1);
      this.setAttribute("font-size", relative);

      const hidden = (relative * scale < 6 || relative * scale > 60);
      if (hidden) this.classList.add("hidden");
      else this.classList.remove("hidden");
    });
  }
let COArenderer = this.COArenderer;
let hideEmblems = this.hideEmblems;
let renderGroupCOAs = this.renderGroupCOAs;
  // rescale emblems on zoom
  if (this.emblems.style("display") !== "none") {
    this.emblems.selectAll("g").each(function () {
      const size = this.getAttribute("font-size") * scale;
      const hidden = hideEmblems.checked && (size < 25 || size > 300);
      if (hidden) this.classList.add("hidden");
      else this.classList.remove("hidden");
      if (!hidden && COArenderer && this.children.length && !this.children[0].getAttribute("href")) renderGroupCOAs(this);
    });
  }

  // turn off ocean pattern if scale is big (improves performance)
  this.oceanPattern
    .select("rect")
    .attr("fill", this.scale > 10 ? "#fff" : "url(#oceanic)")
    .attr("opacity", this.scale > 10 ? 0.2 : null);

  // change states halo width
  if (!this.customization) {
    const desired = +this.statesHalo.attr("data-width");
    const haloSize = this.rn(desired / this.scale ** 0.8, 2);
    this.statesHalo.attr("stroke-width", haloSize).style("display", haloSize > 0.1 ? "block" : "none");
  }

  // rescale map markers
  if (+this.markers.attr("rescale") && this.markers.style("display") !== "none") {
    this.markers.selectAll("use").each(function () {
      const x = +this.dataset.x,
        y = +this.dataset.y,
        desired = +this.dataset.size;
      const size = Math.max(desired * 5 + 25 / scale, 1);
      d3.select(this)
        .attr("x", x - size / 2)
        .attr("y", y - size)
        .attr("width", size)
        .attr("height", size);
    });
  }

  // rescale rulers to have always the same size
  if (this.ruler.style("display") !== "none") {
    const size = this.rn((10 / this.scale ** 0.3) * 2, 2);
    this.ruler.selectAll("text").attr("font-size", size);
  }
}


doWorkOnZoom(isScaleChanged, isPositionChanged) {
  console.log("Do Work on Zoom");
  this.viewbox.attr("transform", `translate(${this.viewX} ${this.viewY}) scale(${this.scale})`);

  // if (isPositionChanged) this.drawCoordinates();

  if (isScaleChanged) {
    this.invokeActiveZooming();
    this.drawScaleBar();
  }

  // zoom image converter overlay
  if (this.customization === 1) {
    const canvas = document.getElementById("canvas");
    if (!canvas || canvas.style.opacity === "0") return;

    const img = document.getElementById("imageToConvert");
    if (!img) return;

    const ctx = (<any>canvas).getContext("2d");
    ctx.clearRect(0, 0, (<any>canvas).width, (<any>canvas).height);
    ctx.setTransform(this.scale, 0, 0, this.scale, this.viewX, this.viewY);
    ctx.drawImage(img, 0, 0, (<any>canvas).width, (<any>canvas).height);
  }
}
// Calls the refresh functionality on all editors currently open.
refreshAllEditors() {
  console.time("refreshAllEditors");
  // if (document.getElementById("culturesEditorRefresh").offsetParent) culturesEditorRefresh.click();
  // if (document.getElementById("biomesEditorRefresh").offsetParent) biomesEditorRefresh.click();
  // if (document.getElementById("diplomacyEditorRefresh").offsetParent) diplomacyEditorRefresh.click();
  // if (document.getElementById("provincesEditorRefresh").offsetParent) provincesEditorRefresh.click();
  // if (document.getElementById("religionsEditorRefresh").offsetParent) religionsEditorRefresh.click();
  // if (document.getElementById("statesEditorRefresh").offsetParent) statesEditorRefresh.click();
  // if (document.getElementById("zonesEditorRefresh").offsetParent) zonesEditorRefresh.click();
  console.timeEnd("refreshAllEditors");
}

Cultures = (() => {
  let cells = this.cells;
  let pack = this.pack;
  let rand = this.rand;
  let P = this.P;

  const generate = () => {
    console.time("generateCultures");
    cells = this.pack.cells;
    cells.culture = new Uint16Array(cells.i.length); // cell cultures
    let count = 8; //Math.min(+this.culturesInput.value, +culturesSet.selectedOptions[0].dataset.max);

    const populated = cells.i.filter((i:number) => cells.s[i]); // populated cells
    if (populated.length < count * 25) {
      count = Math.floor(populated.length / 50);
      if (!count) {
        console.warn(`There are no populated cells. Cannot generate cultures`);
        this.pack.cultures = [{name: "Wildlands", i: 0, base: 1, shield: "round"}];
        // alertMessage.innerHTML = `
        //   The climate is harsh and people cannot live in this world.<br>
        //   No cultures, states and burgs will be created.<br>
        //   Please consider changing climate settings in the World Configurator`;
        $("#alert").dialog({
          resizable: false,
          title: "Extreme climate warning",
          buttons: {
            Ok: function () {
              $(this).dialog("close");
            }
          }
        });
        return;
      } else {
        console.warn(`Not enough populated cells (${populated.length}). Will generate only ${count} cultures`);
        // alertMessage.innerHTML = `
        //   There are only ${populated.length} populated cells and it's insufficient livable area.<br>
        //   Only ${count} out of ${culturesInput.value} requested cultures will be generated.<br>
        //   Please consider changing climate settings in the World Configurator`;
        $("#alert").dialog({
          resizable: false,
          title: "Extreme climate warning",
          buttons: {
            Ok: function () {
              $(this).dialog("close");
            }
          }
        });
      }
    }

    const cultures = (this.pack.cultures = selectCultures(count));
    const centers = d3.quadtree();
    const colors = this.getColors(count);
    const emblemShape = (<HTMLInputElement>document.getElementById("emblemShape")).value;

    const codes = [];
    cultures.forEach((c, i) => {
      const cell = (c.center = placeCenter(c.sort ? c.sort : i => cells.s[i]));
      centers.add(cells.p[cell]);
      c.i = i + 1;
      delete c.odd;
      delete c.sort;
      c.color = colors[i];
      c.type = defineCultureType(cell);
      c.expansionism = defineCultureExpansionism(c.type);
      c.origin = 0;
      c.code = this.abbreviate(c.name, codes);
      codes.push(c.code);
      cells.culture[cell] = i + 1;
      if (emblemShape === "random") c.shield = getRandomShield();
    });

    const placeCenter = (v) =>{
      let c,
        spacing = (this.graphWidth + this.graphHeight) / 2 / count;
      const sorted = [...populated].sort((a, b) => v(b) - v(a)),
        max = Math.floor(sorted.length / 2);
      do {
        c = sorted[this.biased(0, max, 5)];
        spacing *= 0.9;
      } while (centers.find(cells.p[c][0], cells.p[c][1], spacing) !== undefined);
      return c;
    }

    // the first culture with id 0 is for wildlands
    cultures.unshift({name: "Wildlands", i: 0, base: 1, origin: null, shield: "round"});

    // make sure all bases exist in nameBases
    if (!this.nameBases.length) {
      console.error("Name base is empty, default nameBases will be applied");
      this.nameBases = this.Names.getNameBases();
    }

    cultures.forEach(c => (c.base = c.base % this.nameBases.length));

    function selectCultures(c) {
      let def = getDefault(c);
      if (c === def.length) return def;
      if (def.every(d => d.odd === 1)) return def.splice(0, c);

      const count = Math.min(c, def.length);
      const cultures = [];

      for (let culture, rnd, i = 0; cultures.length < count && i < 200; i++) {
        do {
          rnd = rand(0, def.length - 1);
          culture = def[rnd];
        } while (!P(culture.odd));
        cultures.push(culture);
        def.splice(rnd, 1);
      }
      return cultures;
    }

    // set culture type based on culture center position
    const defineCultureType = (i) => {
      if (cells.h[i] < 70 && [1, 2, 4].includes(cells.biome[i])) return "Nomadic"; // high penalty in forest biomes and near coastline
      if (cells.h[i] > 50) return "Highland"; // no penalty for hills and moutains, high for other elevations
      const f = this.pack.features[cells.f[cells.haven[i]]]; // opposite feature
      if (f.type === "lake" && f.cells > 5) return "Lake"; // low water cross penalty and high for growth not along coastline
      if ((cells.harbor[i] && f.type !== "lake" && this.P(0.1)) || (cells.harbor[i] === 1 && this.P(0.6)) || (this.pack.features[cells.f[i]].group === "isle" && this.P(0.4))) return "Naval"; // low water cross penalty and high for non-along-coastline growth
      if (cells.r[i] && cells.fl[i] > 100) return "River"; // no River cross penalty, penalty for non-River growth
      if (cells.t[i] > 2 && [3, 7, 8, 9, 10, 12].includes(cells.biome[i])) return "Hunting"; // high penalty in non-native biomes
      return "Generic";
    }

    const defineCultureExpansionism = (type) => {
      let base = 1; // Generic
      if (type === "Lake") base = 0.8;
      else if (type === "Naval") base = 1.5;
      else if (type === "River") base = 0.9;
      else if (type === "Nomadic") base = 1.5;
      else if (type === "Hunting") base = 0.7;
      else if (type === "Highland") base = 1.2;
      return this.rn(((Math.random() * this.powerInput.value) / 2 + 1) * base, 1);
    }

    console.timeEnd("generateCultures");
  };

  const add = (center) => {
    const defaultCultures = getDefault(null);
    let culture, base, name;

    if (this.pack.cultures.length < defaultCultures.length) {
      // add one of the default cultures
      culture = this.pack.cultures.length;
      base = defaultCultures[culture].base;
      name = defaultCultures[culture].name;
    } else {
      // add random culture besed on one of the current ones
      culture = this.rand(0,this.pack.cultures.length - 1);
      name = this.Names.getCulture(culture, 5, 8, "");
      base = this.pack.cultures[culture].base;
    }
    const code = this.abbreviate(
      name,
      this.pack.cultures.map(c => c.code)
    );
    const i = this.pack.cultures.length;
    const color = d3.color(d3.scaleSequential(d3.interpolateRainbow)(Math.random())).hex();

    // define emblem shape
    let shield = culture.shield;
    const emblemShape = (<HTMLInputElement>document.getElementById("emblemShape")).value;
    if (emblemShape === "random") shield = getRandomShield();

    this.pack.cultures.push({name, color, base, center, i, expansionism: 1, type: "Generic", cells: 0, area: 0, rural: 0, urban: 0, origin: 0, code, shield});
  };

  const getDefault = (count) => {
    // generic sorting functions
    const cells = this.pack.cells,
      s = cells.s,
      sMax = d3.max(s),
      t = cells.t,
      h = cells.h,
      temp = this.grid.cells.temp;
    const n = cell => Math.ceil((s[cell] / sMax) * 3); // normalized cell score
    const td = (cell, goal) => {
      const d = Math.abs(temp[cells.g[cell]] - goal);
      return d ? d + 1 : 1;
    }; // temperature difference fee
    const bd = (cell, biomes, fee = 4) => (biomes.includes(cells.biome[cell]) ? 1 : fee); // biome difference fee
    const sf = (cell, fee = 4) => (cells.haven[cell] && this.pack.features[cells.f[cells.haven[cell]]].type !== "lake" ? 1 : fee); // not on sea coast fee
    return [];// regionCultures;
    // if (culturesSet.value === "european") {
    //   return [
    //     {name: "Shwazen", base: 0, odd: 1, sort: i => n(i) / td(i, 10) / bd(i, [6, 8]), shield: "swiss"},
    //     {name: "Angshire", base: 1, odd: 1, sort: i => n(i) / td(i, 10) / sf(i), shield: "wedged"},
    //     {name: "Luari", base: 2, odd: 1, sort: i => n(i) / td(i, 12) / bd(i, [6, 8]), shield: "french"},
    //     {name: "Tallian", base: 3, odd: 1, sort: i => n(i) / td(i, 15), shield: "horsehead"},
    //     {name: "Astellian", base: 4, odd: 1, sort: i => n(i) / td(i, 16), shield: "spanish"},
    //     {name: "Slovan", base: 5, odd: 1, sort: i => (n(i) / td(i, 6)) * t[i], shield: "polish"},
    //     {name: "Norse", base: 6, odd: 1, sort: i => n(i) / td(i, 5), shield: "heater"},
    //     {name: "Elladan", base: 7, odd: 1, sort: i => (n(i) / td(i, 18)) * h[i], shield: "boeotian"},
    //     {name: "Romian", base: 8, odd: 0.2, sort: i => n(i) / td(i, 15) / t[i], shield: "roman"},
    //     {name: "Soumi", base: 9, odd: 1, sort: i => (n(i) / td(i, 5) / bd(i, [9])) * t[i], shield: "pavise"},
    //     {name: "Portuzian", base: 13, odd: 1, sort: i => n(i) / td(i, 17) / sf(i), shield: "renaissance"},
    //     {name: "Vengrian", base: 15, odd: 1, sort: i => (n(i) / td(i, 11) / bd(i, [4])) * t[i], shield: "horsehead2"},
    //     {name: "Turchian", base: 16, odd: 0.05, sort: i => n(i) / td(i, 14), shield: "round"},
    //     {name: "Euskati", base: 20, odd: 0.05, sort: i => (n(i) / td(i, 15)) * h[i], shield: "oldFrench"},
    //     {name: "Keltan", base: 22, odd: 0.05, sort: i => (n(i) / td(i, 11) / bd(i, [6, 8])) * t[i], shield: "oval"}
    //   ];
    // }

    // if (culturesSet.value === "oriental") {
    //   return [
    //     {name: "Koryo", base: 10, odd: 1, sort: i => n(i) / td(i, 12) / t[i], shield: "round"},
    //     {name: "Hantzu", base: 11, odd: 1, sort: i => n(i) / td(i, 13), shield: "banner"},
    //     {name: "Yamoto", base: 12, odd: 1, sort: i => n(i) / td(i, 15) / t[i], shield: "round"},
    //     {name: "Turchian", base: 16, odd: 1, sort: i => n(i) / td(i, 12), shield: "round"},
    //     {name: "Berberan", base: 17, odd: 0.2, sort: i => (n(i) / td(i, 19) / bd(i, [1, 2, 3], 7)) * t[i], shield: "oval"},
    //     {name: "Eurabic", base: 18, odd: 1, sort: i => (n(i) / td(i, 26) / bd(i, [1, 2], 7)) * t[i], shield: "oval"},
    //     {name: "Efratic", base: 23, odd: 0.1, sort: i => (n(i) / td(i, 22)) * t[i], shield: "round"},
    //     {name: "Tehrani", base: 24, odd: 1, sort: i => (n(i) / td(i, 18)) * h[i], shield: "round"},
    //     {name: "Maui", base: 25, odd: 0.2, sort: i => n(i) / td(i, 24) / sf(i) / t[i], shield: "vesicaPiscis"},
    //     {name: "Carnatic", base: 26, odd: 0.5, sort: i => n(i) / td(i, 26), shield: "round"},
    //     {name: "Vietic", base: 29, odd: 0.8, sort: i => n(i) / td(i, 25) / bd(i, [7], 7) / t[i], shield: "banner"},
    //     {name: "Guantzu", base: 30, odd: 0.5, sort: i => n(i) / td(i, 17), shield: "banner"},
    //     {name: "Ulus", base: 31, odd: 1, sort: i => (n(i) / td(i, 5) / bd(i, [2, 4, 10], 7)) * t[i], shield: "banner"}
    //   ];
    // }

    // if (culturesSet.value === "english") {
    //   const getName = () => Names.getBase(1, 5, 9, "", 0);
    //   return [
    //     {name: getName(), base: 1, odd: 1, shield: "heater"},
    //     {name: getName(), base: 1, odd: 1, shield: "wedged"},
    //     {name: getName(), base: 1, odd: 1, shield: "swiss"},
    //     {name: getName(), base: 1, odd: 1, shield: "oldFrench"},
    //     {name: getName(), base: 1, odd: 1, shield: "swiss"},
    //     {name: getName(), base: 1, odd: 1, shield: "spanish"},
    //     {name: getName(), base: 1, odd: 1, shield: "hessen"},
    //     {name: getName(), base: 1, odd: 1, shield: "fantasy5"},
    //     {name: getName(), base: 1, odd: 1, shield: "fantasy4"},
    //     {name: getName(), base: 1, odd: 1, shield: "fantasy1"}
    //   ];
    // }

    // if (culturesSet.value === "antique") {
    //   return [
    //     {name: "Roman", base: 8, odd: 1, sort: i => n(i) / td(i, 14) / t[i], shield: "roman"}, // Roman
    //     {name: "Roman", base: 8, odd: 1, sort: i => n(i) / td(i, 15) / sf(i), shield: "roman"}, // Roman
    //     {name: "Roman", base: 8, odd: 1, sort: i => n(i) / td(i, 16) / sf(i), shield: "roman"}, // Roman
    //     {name: "Roman", base: 8, odd: 1, sort: i => n(i) / td(i, 17) / t[i], shield: "roman"}, // Roman
    //     {name: "Hellenic", base: 7, odd: 1, sort: i => (n(i) / td(i, 18) / sf(i)) * h[i], shield: "boeotian"}, // Greek
    //     {name: "Hellenic", base: 7, odd: 1, sort: i => (n(i) / td(i, 19) / sf(i)) * h[i], shield: "boeotian"}, // Greek
    //     {name: "Macedonian", base: 7, odd: 0.5, sort: i => (n(i) / td(i, 12)) * h[i], shield: "round"}, // Greek
    //     {name: "Celtic", base: 22, odd: 1, sort: i => n(i) / td(i, 11) ** 0.5 / bd(i, [6, 8]), shield: "round"},
    //     {name: "Germanic", base: 0, odd: 1, sort: i => n(i) / td(i, 10) ** 0.5 / bd(i, [6, 8]), shield: "round"},
    //     {name: "Persian", base: 24, odd: 0.8, sort: i => (n(i) / td(i, 18)) * h[i], shield: "oval"}, // Iranian
    //     {name: "Scythian", base: 24, odd: 0.5, sort: i => n(i) / td(i, 11) ** 0.5 / bd(i, [4]), shield: "round"}, // Iranian
    //     {name: "Cantabrian", base: 20, odd: 0.5, sort: i => (n(i) / td(i, 16)) * h[i], shield: "oval"}, // Basque
    //     {name: "Estian", base: 9, odd: 0.2, sort: i => (n(i) / td(i, 5)) * t[i], shield: "pavise"}, // Finnic
    //     {name: "Carthaginian", base: 17, odd: 0.3, sort: i => n(i) / td(i, 19) / sf(i), shield: "oval"}, // Berber
    //     {name: "Mesopotamian", base: 23, odd: 0.2, sort: i => n(i) / td(i, 22) / bd(i, [1, 2, 3]), shield: "oval"} // Mesopotamian
    //   ];
    // }

    // if (culturesSet.value === "highFantasy") {
    //   return [
    //     // fantasy races
    //     {name: "Quenian (Elfish)", base: 33, odd: 1, sort: i => (n(i) / bd(i, [6, 7, 8, 9], 10)) * t[i], shield: "gondor"}, // Elves
    //     {name: "Eldar (Elfish)", base: 33, odd: 1, sort: i => (n(i) / bd(i, [6, 7, 8, 9], 10)) * t[i], shield: "noldor"}, // Elves
    //     {name: "Trow (Dark Elfish)", base: 34, odd: 0.9, sort: i => (n(i) / bd(i, [7, 8, 9, 12], 10)) * t[i], shield: "hessen"}, // Dark Elves
    //     {name: "Lothian (Dark Elfish)", base: 34, odd: 0.3, sort: i => (n(i) / bd(i, [7, 8, 9, 12], 10)) * t[i], shield: "wedged"}, // Dark Elves
    //     {name: "Dunirr (Dwarven)", base: 35, odd: 1, sort: i => n(i) + h[i], shield: "ironHills"}, // Dwarfs
    //     {name: "Khazadur (Dwarven)", base: 35, odd: 1, sort: i => n(i) + h[i], shield: "erebor"}, // Dwarfs
    //     {name: "Kobold (Goblin)", base: 36, odd: 1, sort: i => t[i] - s[i], shield: "moriaOrc"}, // Goblin
    //     {name: "Uruk (Orkish)", base: 37, odd: 1, sort: i => h[i] * t[i], shield: "urukHai"}, // Orc
    //     {name: "Ugluk (Orkish)", base: 37, odd: 0.5, sort: i => (h[i] * t[i]) / bd(i, [1, 2, 10, 11]), shield: "moriaOrc"}, // Orc
    //     {name: "Yotunn (Giants)", base: 38, odd: 0.7, sort: i => td(i, -10), shield: "pavise"}, // Giant
    //     {name: "Rake (Drakonic)", base: 39, odd: 0.7, sort: i => -s[i], shield: "fantasy2"}, // Draconic
    //     {name: "Arago (Arachnid)", base: 40, odd: 0.7, sort: i => t[i] - s[i], shield: "horsehead2"}, // Arachnid
    //     {name: "Aj'Snaga (Serpents)", base: 41, odd: 0.7, sort: i => n(i) / bd(i, [12], 10), shield: "fantasy1"}, // Serpents
    //     // fantasy human
    //     {name: "Anor (Human)", base: 32, odd: 1, sort: i => n(i) / td(i, 10), shield: "fantasy5"},
    //     {name: "Dail (Human)", base: 32, odd: 1, sort: i => n(i) / td(i, 13), shield: "roman"},
    //     {name: "Rohand (Human)", base: 16, odd: 1, sort: i => n(i) / td(i, 16), shield: "round"},
    //     {name: "Dulandir (Human)", base: 31, odd: 1, sort: i => (n(i) / td(i, 5) / bd(i, [2, 4, 10], 7)) * t[i], shield: "easterling"}
    //   ];
    // }

    // if (culturesSet.value === "darkFantasy") {
    //   return [
    //     // common real-world English
    //     {name: "Angshire", base: 1, odd: 1, sort: i => n(i) / td(i, 10) / sf(i), shield: "heater"},
    //     {name: "Enlandic", base: 1, odd: 1, sort: i => n(i) / td(i, 12), shield: "heater"},
    //     {name: "Westen", base: 1, odd: 1, sort: i => n(i) / td(i, 10), shield: "heater"},
    //     {name: "Nortumbic", base: 1, odd: 1, sort: i => n(i) / td(i, 7), shield: "heater"},
    //     {name: "Mercian", base: 1, odd: 1, sort: i => n(i) / td(i, 9), shield: "heater"},
    //     {name: "Kentian", base: 1, odd: 1, sort: i => n(i) / td(i, 12), shield: "heater"},
    //     // rare real-world western
    //     {name: "Norse", base: 6, odd: 0.7, sort: i => n(i) / td(i, 5) / sf(i), shield: "oldFrench"},
    //     {name: "Schwarzen", base: 0, odd: 0.3, sort: i => n(i) / td(i, 10) / bd(i, [6, 8]), shield: "gonfalon"},
    //     {name: "Luarian", base: 2, odd: 0.3, sort: i => n(i) / td(i, 12) / bd(i, [6, 8]), shield: "oldFrench"},
    //     {name: "Hetallian", base: 3, odd: 0.3, sort: i => n(i) / td(i, 15), shield: "oval"},
    //     {name: "Astellian", base: 4, odd: 0.3, sort: i => n(i) / td(i, 16), shield: "spanish"},
    //     // rare real-world exotic
    //     {name: "Kiswaili", base: 28, odd: 0.05, sort: i => n(i) / td(i, 29) / bd(i, [1, 3, 5, 7]), shield: "vesicaPiscis"},
    //     {name: "Yoruba", base: 21, odd: 0.05, sort: i => n(i) / td(i, 15) / bd(i, [5, 7]), shield: "vesicaPiscis"},
    //     {name: "Koryo", base: 10, odd: 0.05, sort: i => n(i) / td(i, 12) / t[i], shield: "round"},
    //     {name: "Hantzu", base: 11, odd: 0.05, sort: i => n(i) / td(i, 13), shield: "banner"},
    //     {name: "Yamoto", base: 12, odd: 0.05, sort: i => n(i) / td(i, 15) / t[i], shield: "round"},
    //     {name: "Guantzu", base: 30, odd: 0.05, sort: i => n(i) / td(i, 17), shield: "banner"},
    //     {name: "Ulus", base: 31, odd: 0.05, sort: i => (n(i) / td(i, 5) / bd(i, [2, 4, 10], 7)) * t[i], shield: "banner"},
    //     {name: "Turan", base: 16, odd: 0.05, sort: i => n(i) / td(i, 12), shield: "round"},
    //     {name: "Berberan", base: 17, odd: 0.05, sort: i => (n(i) / td(i, 19) / bd(i, [1, 2, 3], 7)) * t[i], shield: "round"},
    //     {name: "Eurabic", base: 18, odd: 0.05, sort: i => (n(i) / td(i, 26) / bd(i, [1, 2], 7)) * t[i], shield: "round"},
    //     {name: "Slovan", base: 5, odd: 0.05, sort: i => (n(i) / td(i, 6)) * t[i], shield: "round"},
    //     {name: "Keltan", base: 22, odd: 0.1, sort: i => n(i) / td(i, 11) ** 0.5 / bd(i, [6, 8]), shield: "vesicaPiscis"},
    //     {name: "Elladan", base: 7, odd: 0.2, sort: i => (n(i) / td(i, 18) / sf(i)) * h[i], shield: "boeotian"},
    //     {name: "Romian", base: 8, odd: 0.2, sort: i => n(i) / td(i, 14) / t[i], shield: "roman"},
    //     // fantasy races
    //     {name: "Eldar", base: 33, odd: 0.5, sort: i => (n(i) / bd(i, [6, 7, 8, 9], 10)) * t[i], shield: "fantasy5"}, // Elves
    //     {name: "Trow", base: 34, odd: 0.8, sort: i => (n(i) / bd(i, [7, 8, 9, 12], 10)) * t[i], shield: "hessen"}, // Dark Elves
    //     {name: "Durinn", base: 35, odd: 0.8, sort: i => n(i) + h[i], shield: "erebor"}, // Dwarven
    //     {name: "Kobblin", base: 36, odd: 0.8, sort: i => t[i] - s[i], shield: "moriaOrc"}, // Goblin
    //     {name: "Uruk", base: 37, odd: 0.8, sort: i => (h[i] * t[i]) / bd(i, [1, 2, 10, 11]), shield: "urukHai"}, // Orc
    //     {name: "Yotunn", base: 38, odd: 0.8, sort: i => td(i, -10), shield: "pavise"}, // Giant
    //     {name: "Drake", base: 39, odd: 0.9, sort: i => -s[i], shield: "fantasy2"}, // Draconic
    //     {name: "Rakhnid", base: 40, odd: 0.9, sort: i => t[i] - s[i], shield: "horsehead2"}, // Arachnid
    //     {name: "Aj'Snaga", base: 41, odd: 0.9, sort: i => n(i) / bd(i, [12], 10), shield: "fantasy1"} // Serpents
    //   ];
    // }

    // if (culturesSet.value === "random") {
    //   return d3.range(count).map(function () {
    //     const rnd = rand(nameBases.length - 1);
    //     const name = Names.getBaseShort(rnd);
    //     return {name, base: rnd, odd: 1, shield: getRandomShield()};
    //   });
    // }

    // // all-world
    // return [
    //   {name: "Shwazen", base: 0, odd: 0.7, sort: i => n(i) / td(i, 10) / bd(i, [6, 8]), shield: "hessen"},
    //   {name: "Angshire", base: 1, odd: 1, sort: i => n(i) / td(i, 10) / sf(i), shield: "heater"},
    //   {name: "Luari", base: 2, odd: 0.6, sort: i => n(i) / td(i, 12) / bd(i, [6, 8]), shield: "oldFrench"},
    //   {name: "Tallian", base: 3, odd: 0.6, sort: i => n(i) / td(i, 15), shield: "horsehead2"},
    //   {name: "Astellian", base: 4, odd: 0.6, sort: i => n(i) / td(i, 16), shield: "spanish"},
    //   {name: "Slovan", base: 5, odd: 0.7, sort: i => (n(i) / td(i, 6)) * t[i], shield: "round"},
    //   {name: "Norse", base: 6, odd: 0.7, sort: i => n(i) / td(i, 5), shield: "heater"},
    //   {name: "Elladan", base: 7, odd: 0.7, sort: i => (n(i) / td(i, 18)) * h[i], shield: "boeotian"},
    //   {name: "Romian", base: 8, odd: 0.7, sort: i => n(i) / td(i, 15), shield: "roman"},
    //   {name: "Soumi", base: 9, odd: 0.3, sort: i => (n(i) / td(i, 5) / bd(i, [9])) * t[i], shield: "pavise"},
    //   {name: "Koryo", base: 10, odd: 0.1, sort: i => n(i) / td(i, 12) / t[i], shield: "round"},
    //   {name: "Hantzu", base: 11, odd: 0.1, sort: i => n(i) / td(i, 13), shield: "banner"},
    //   {name: "Yamoto", base: 12, odd: 0.1, sort: i => n(i) / td(i, 15) / t[i], shield: "round"},
    //   {name: "Portuzian", base: 13, odd: 0.4, sort: i => n(i) / td(i, 17) / sf(i), shield: "spanish"},
    //   {name: "Nawatli", base: 14, odd: 0.1, sort: i => h[i] / td(i, 18) / bd(i, [7]), shield: "square"},
    //   {name: "Vengrian", base: 15, odd: 0.2, sort: i => (n(i) / td(i, 11) / bd(i, [4])) * t[i], shield: "wedged"},
    //   {name: "Turchian", base: 16, odd: 0.2, sort: i => n(i) / td(i, 13), shield: "round"},
    //   {name: "Berberan", base: 17, odd: 0.1, sort: i => (n(i) / td(i, 19) / bd(i, [1, 2, 3], 7)) * t[i], shield: "round"},
    //   {name: "Eurabic", base: 18, odd: 0.2, sort: i => (n(i) / td(i, 26) / bd(i, [1, 2], 7)) * t[i], shield: "round"},
    //   {name: "Inuk", base: 19, odd: 0.05, sort: i => td(i, -1) / bd(i, [10, 11]) / sf(i), shield: "square"},
    //   {name: "Euskati", base: 20, odd: 0.05, sort: i => (n(i) / td(i, 15)) * h[i], shield: "spanish"},
    //   {name: "Yoruba", base: 21, odd: 0.05, sort: i => n(i) / td(i, 15) / bd(i, [5, 7]), shield: "vesicaPiscis"},
    //   {name: "Keltan", base: 22, odd: 0.05, sort: i => (n(i) / td(i, 11) / bd(i, [6, 8])) * t[i], shield: "vesicaPiscis"},
    //   {name: "Efratic", base: 23, odd: 0.05, sort: i => (n(i) / td(i, 22)) * t[i], shield: "diamond"},
    //   {name: "Tehrani", base: 24, odd: 0.1, sort: i => (n(i) / td(i, 18)) * h[i], shield: "round"},
    //   {name: "Maui", base: 25, odd: 0.05, sort: i => n(i) / td(i, 24) / sf(i) / t[i], shield: "round"},
    //   {name: "Carnatic", base: 26, odd: 0.05, sort: i => n(i) / td(i, 26), shield: "round"},
    //   {name: "Inqan", base: 27, odd: 0.05, sort: i => h[i] / td(i, 13), shield: "square"},
    //   {name: "Kiswaili", base: 28, odd: 0.1, sort: i => n(i) / td(i, 29) / bd(i, [1, 3, 5, 7]), shield: "vesicaPiscis"},
    //   {name: "Vietic", base: 29, odd: 0.1, sort: i => n(i) / td(i, 25) / bd(i, [7], 7) / t[i], shield: "banner"},
    //   {name: "Guantzu", base: 30, odd: 0.1, sort: i => n(i) / td(i, 17), shield: "banner"},
    //   {name: "Ulus", base: 31, odd: 0.1, sort: i => (n(i) / td(i, 5) / bd(i, [2, 4, 10], 7)) * t[i], shield: "banner"}
    // ];
  };

  // expand cultures across the map (Dijkstra-like algorithm)
  const expand = () => {
    console.time("expandCultures");
    cells = this.pack.cells;

    const queue = new PriorityQueue({comparator: (a, b) => a.p - b.p});
    this.pack.cultures.forEach(function (c) {
      if (!c.i || c.removed) return;
      queue.queue({e: c.center, p: 0, c: c.i});
    });

    const neutral = (cells.i.length / 5000) * 3000 * this.neutralInput.value; // limit cost for culture growth
    const cost = [];
    while (queue.length) {
      const next = queue.dequeue(),
        n = next.e,
        p = next.p,
        c = next.c;
      const type = this.pack.cultures[c].type;
      cells.c[n].forEach(function (e) {
        const biome = cells.biome[e];
        const biomeCost = getBiomeCost(c, biome, type);
        const biomeChangeCost = biome === cells.biome[n] ? 0 : 20; // penalty on biome change
        const heightCost = getHeightCost(e, cells.h[e], type);
        const riverCost = getRiverCost(cells.r[e], e, type);
        const typeCost = getTypeCost(cells.t[e], type);
        const totalCost = p + (biomeCost + biomeChangeCost + heightCost + riverCost + typeCost) / pack.cultures[c].expansionism;

        if (totalCost > neutral) return;

        if (!cost[e] || totalCost < cost[e]) {
          if (cells.s[e] > 0) cells.culture[e] = c; // assign culture to populated cell
          cost[e] = totalCost;
          queue.queue({e, p: totalCost, c});
        }
      });
    }

    console.timeEnd("expandCultures");
  };

  const getBiomeCost = (c, biome, type) => {
    if (cells.biome[pack.cultures[c].center] === biome) return 10; // tiny penalty for native biome
    if (type === "Hunting") return this.biomesData.cost[biome] * 5; // non-native biome penalty for hunters
    if (type === "Nomadic" && biome > 4 && biome < 10) return this.biomesData.cost[biome] * 10; // forest biome penalty for nomads
    return this.biomesData.cost[biome] * 2; // general non-native biome penalty
  }

  function getHeightCost(i, h, type) {
    const f = pack.features[cells.f[i]],
      a = cells.area[i];
    if (type === "Lake" && f.type === "lake") return 10; // no lake crossing penalty for Lake cultures
    if (type === "Naval" && h < 20) return a * 2; // low sea/lake crossing penalty for Naval cultures
    if (type === "Nomadic" && h < 20) return a * 50; // giant sea/lake crossing penalty for Nomads
    if (h < 20) return a * 6; // general sea/lake crossing penalty
    if (type === "Highland" && h < 44) return 3000; // giant penalty for highlanders on lowlands
    if (type === "Highland" && h < 62) return 200; // giant penalty for highlanders on lowhills
    if (type === "Highland") return 0; // no penalty for highlanders on highlands
    if (h >= 67) return 200; // general mountains crossing penalty
    if (h >= 44) return 30; // general hills crossing penalty
    return 0;
  }

  function getRiverCost(r, i, type) {
    if (type === "River") return r ? 0 : 100; // penalty for river cultures
    if (!r) return 0; // no penalty for others if there is no river
    return Math.min(Math.max(cells.fl[i] / 10, 20), 100); // river penalty from 20 to 100 based on flux
  }

  function getTypeCost(t, type) {
    if (t === 1) return type === "Naval" || type === "Lake" ? 0 : type === "Nomadic" ? 60 : 20; // penalty for coastline
    if (t === 2) return type === "Naval" || type === "Nomadic" ? 30 : 0; // low penalty for land level 2 for Navals and nomads
    if (t !== -1) return type === "Naval" || type === "Lake" ? 100 : 0; // penalty for mainland for navals
    return 0;
  }

  const getRandomShield = () => {
    const type = this.rw(this.COA.shields.types);
    return this.rw(this.COA.shields[type]);
  };

  return {generate, add, expand, getDefault, getRandomShield};
})();


COA = (() => {
  const tinctures = {
    field: {metals: 3, colours: 4, stains: +this.P(0.03), patterns: 1},
    division: {metals: 5, colours: 8, stains: +this.P(0.03), patterns: 1},
    charge: {metals: 2, colours: 3, stains: +this.P(0.05), patterns: 0},
    metals: {argent: 3, or: 2},
    colours: {gules: 5, azure: 4, sable: 3, purpure: 3, vert: 2},
    stains: {murrey: 1, sanguine: 1, tenné: 1},
    patterns: {
      semy: 8,
      ermine: 6,
      vair: 4,
      counterVair: 1,
      vairInPale: 1,
      vairEnPointe: 2,
      vairAncien: 2,
      potent: 2,
      counterPotent: 1,
      potentInPale: 1,
      potentEnPointe: 1,
      chequy: 8,
      lozengy: 5,
      fusily: 2,
      pally: 8,
      barry: 10,
      gemelles: 1,
      bendy: 8,
      bendySinister: 4,
      palyBendy: 2,
      barryBendy: 1,
      pappellony: 2,
      pappellony2: 3,
      scaly: 1,
      plumetty: 1,
      masoned: 6,
      fretty: 3,
      grillage: 1,
      chainy: 1,
      maily: 2,
      honeycombed: 1
    }
  };

  const charges = {
    // categories selection
    types: {conventional: 30, crosses: 10, animals: 2, animalHeads: 1, birds: 2, fantastic: 3, plants: 1, agriculture: 1, arms: 3, bodyparts: 1, people: 1, architecture: 1, miscellaneous: 3, inescutcheon: 3},
    single: {conventional: 12, crosses: 8, plants: 2, animals: 10, animalHeads: 2, birds: 4, fantastic: 7, agriculture: 1, arms: 6, bodyparts: 1, people: 2, architecture: 1, miscellaneous: 10, inescutcheon: 5},
    semy: {conventional: 12, crosses: 3, plants: 1},
    // generic categories
    conventional: {
      lozenge: 2,
      fusil: 4,
      mascle: 4,
      rustre: 2,
      lozengeFaceted: 3,
      lozengePloye: 1,
      roundel: 4,
      roundel2: 3,
      annulet: 4,
      mullet: 5,
      mulletPierced: 1,
      mulletFaceted: 1,
      mullet4: 3,
      mullet6: 4,
      mullet6Pierced: 1,
      mullet6Faceted: 1,
      mullet7: 1,
      mullet8: 1,
      mullet10: 1,
      estoile: 1,
      compassRose: 1,
      billet: 5,
      delf: 0,
      triangle: 3,
      trianglePierced: 1,
      goutte: 4,
      heart: 4,
      pique: 2,
      carreau: 1,
      trefle: 2,
      fleurDeLis: 6,
      sun: 3,
      sunInSplendour: 1,
      crescent: 5,
      fountain: 1
    },
    crosses: {
      crossHummetty: 15,
      crossVoided: 1,
      crossPattee: 2,
      crossPatteeAlisee: 1,
      crossFormee: 1,
      crossFormee2: 2,
      crossPotent: 2,
      crossJerusalem: 1,
      crosslet: 1,
      crossClechy: 3,
      crossBottony: 1,
      crossFleury: 3,
      crossPatonce: 1,
      crossPommy: 1,
      crossGamma: 1,
      crossArrowed: 1,
      crossFitchy: 1,
      crossCercelee: 1,
      crossMoline: 2,
      crossFourchy: 1,
      crossAvellane: 1,
      crossErminee: 1,
      crossBiparted: 1,
      crossMaltese: 3,
      crossTemplar: 2,
      crossCeltic: 1,
      crossCeltic2: 1,
      crossTriquetra: 1,
      crossCarolingian: 1,
      crossOccitan: 1,
      crossSaltire: 3,
      crossBurgundy: 1,
      crossLatin: 3,
      crossPatriarchal: 1,
      crossOrthodox: 1,
      crossCalvary: 1,
      crossDouble: 1,
      crossTau: 1,
      crossSantiago: 1,
      crossAnkh: 1
    },
    animals: {
      lionRampant: 5,
      lionPassant: 2,
      lionPassantGuardant: 1,
      wolfRampant: 1,
      wolfPassant: 1,
      wolfStatant: 1,
      greyhoundCourant: 1,
      boarRampant: 1,
      horseRampant: 2,
      horseSalient: 1,
      bearRampant: 2,
      bearPassant: 1,
      bullPassant: 1,
      goat: 1,
      lamb: 1,
      elephant: 1,
      camel: 1
    },
    animalHeads: {wolfHeadErased: 1, bullHeadCaboshed: 1, deerHeadCaboshed: 1, lionHeadCaboshed: 2},
    fantastic: {dragonPassant: 2, dragonRampant: 2, wyvern: 1, wyvernWithWingsDisplayed: 1, griffinPassant: 1, griffinRampant: 1, eagleTwoHeards: 2, unicornRampant: 1, pegasus: 1, serpent: 1},
    birds: {eagle: 9, raven: 1, cock: 3, parrot: 1, swan: 2, swanErased: 1, heron: 1, owl: 1},
    plants: {tree: 1, oak: 1, cinquefoil: 1, rose: 1},
    agriculture: {garb: 1, rake: 1},
    arms: {sword: 5, sabre: 1, sabresCrossed: 1, hatchet: 2, axe: 2, lochaberAxe: 1, mallet: 1, bowWithArrow: 2, bow: 1, arrow: 1, arrowsSheaf: 1, helmet: 2},
    bodyparts: {hand: 4, head: 1, headWreathed: 1},
    people: {cavalier: 3, monk: 1, angel: 2},
    architecture: {tower: 1, castle: 1},
    miscellaneous: {
      crown: 3,
      orb: 1,
      chalice: 1,
      key: 1,
      buckle: 1,
      bugleHorn: 1,
      bugleHorn2: 1,
      bell: 2,
      pot: 1,
      bucket: 1,
      horseshoe: 3,
      attire: 1,
      stagsAttires: 1,
      ramsHorn: 1,
      cowHorns: 2,
      wing: 1,
      wingSword: 1,
      lute: 1,
      harp: 1,
      wheel: 2,
      crosier: 1,
      fasces: 1,
      log: 1
    },
    // selection based on culture type:
    Naval: {anchor: 3, boat: 1, lymphad: 2, armillarySphere: 1, escallop: 1, dolphin: 1},
    Highland: {tower: 1, raven: 1, wolfHeadErased: 1, wolfPassant: 1, goat: 1, axe: 1},
    River: {tower: 1, garb: 1, rake: 1, boat: 1, pike: 2, bullHeadCaboshed: 1},
    Lake: {cancer: 2, escallop: 1, pike: 2, heron: 1, boat: 1, boat2: 2},
    Nomadic: {pot: 1, buckle: 1, wheel: 2, sabre: 2, sabresCrossed: 1, bow: 2, arrow: 1, horseRampant: 1, horseSalient: 1, crescent: 1, camel: 3},
    Hunting: {bugleHorn: 2, bugleHorn2: 1, stagsAttires: 2, attire: 2, hatchet: 1, bowWithArrow: 1, arrowsSheaf: 1, deerHeadCaboshed: 1, wolfStatant: 1, oak: 1},
    // selection based on type
    City: {key: 3, bell: 2, lute: 1, tower: 1, castle: 1, mallet: 1},
    Capital: {crown: 4, orb: 1, lute: 1, castle: 3, tower: 1},
    Сathedra: {chalice: 1, orb: 1, crosier: 2, lamb: 1, monk: 2, angel: 3, crossLatin: 2, crossPatriarchal: 1, crossOrthodox: 1, crossCalvary: 1},
    // specific cases
    natural: {fountain: "azure", garb: "or", raven: "sable"}, // charges to mainly use predefined colours
    sinister: [
      // charges that can be sinister
      "crossGamma",
      "lionRampant",
      "lionPassant",
      "wolfRampant",
      "wolfPassant",
      "wolfStatant",
      "wolfHeadErased",
      "greyhoundСourant",
      "boarRampant",
      "horseRampant",
      "horseSalient",
      "bullPassant",
      "bearRampant",
      "bearPassant",
      "goat",
      "lamb",
      "elephant",
      "eagle",
      "raven",
      "cock",
      "parrot",
      "swan",
      "swanErased",
      "heron",
      "pike",
      "dragonPassant",
      "dragonRampant",
      "wyvern",
      "wyvernWithWingsDisplayed",
      "griffinPassant",
      "griffinRampant",
      "unicornRampant",
      "pegasus",
      "serpent",
      "hatchet",
      "lochaberAxe",
      "hand",
      "wing",
      "wingSword",
      "lute",
      "harp",
      "bow",
      "head",
      "headWreathed",
      "knight",
      "lymphad",
      "log",
      "crosier",
      "dolphin",
      "sabre",
      "monk",
      "owl",
      "axe",
      "camel",
      "fasces",
      "lionPassantGuardant",
      "helmet"
    ],
    reversed: [
      // charges that can be reversed
      "goutte",
      "mullet",
      "mullet7",
      "crescent",
      "crossTau",
      "cancer",
      "sword",
      "sabresCrossed",
      "hand",
      "horseshoe",
      "bowWithArrow",
      "arrow",
      "arrowsSheaf",
      "rake",
      "crossTriquetra",
      "crossLatin",
      "crossTau"
    ]
  };

  const positions = {
    conventional: {e: 20, abcdefgzi: 3, beh: 3, behdf: 2, acegi: 1, kn: 3, bhdf: 1, jeo: 1, abc: 3, jln: 6, jlh: 3, kmo: 2, jleh: 1, def: 3, abcpqh: 4, ABCDEFGHIJKL: 1},
    complex: {e: 40, beh: 1, kn: 1, jeo: 1, abc: 2, jln: 7, jlh: 2, def: 1, abcpqh: 1},
    divisions: {
      perPale: {e: 15, pq: 5, jo: 2, jl: 2, ABCDEFGHIJKL: 1},
      perFess: {e: 12, kn: 4, jkl: 2, gizgiz: 1, jlh: 3, kmo: 1, ABCDEFGHIJKL: 1},
      perBend: {e: 5, lm: 5, bcfdgh: 1},
      perBendSinister: {e: 1, jo: 1},
      perCross: {e: 4, jlmo: 1, j: 1, jo: 2, jl: 1},
      perChevron: {e: 1, jlh: 1, dfk: 1, dfbh: 2, bdefh: 1},
      perChevronReversed: {e: 1, mok: 2, dfh: 2, dfbh: 1, bdefh: 1},
      perSaltire: {bhdf: 8, e: 3, abcdefgzi: 1, bh: 1, df: 1, ABCDEFGHIJKL: 1},
      perPile: {ee: 3, be: 2, abceh: 1, abcabc: 1, jleh: 1}
    },
    ordinariesOn: {
      pale: {ee: 12, beh: 10, kn: 3, bb: 1},
      fess: {ee: 1, def: 3},
      bar: {defdefdef: 1},
      fessCotissed: {ee: 1, def: 3},
      fessDoubleCotissed: {ee: 1, defdef: 3},
      bend: {ee: 2, jo: 1, joe: 1},
      bendSinister: {ee: 1, lm: 1, lem: 4},
      bendlet: {joejoejoe: 1},
      bendletSinister: {lemlemlem: 1},
      bordure: {ABCDEFGHIJKL: 1},
      chief: {abc: 5, bbb: 1},
      quarter: {jjj: 1},
      canton: {yyyy: 1},
      cross: {eeee: 1, behdfbehdf: 3, behbehbeh: 2},
      crossParted: {e: 5, ee: 1},
      saltire: {ee: 5, jlemo: 1},
      saltireParted: {e: 5, ee: 1},
      pall: {ee: 1, jleh: 5, jlhh: 3},
      pallReversed: {ee: 1, bemo: 5},
      pile: {bbb: 1},
      pileInBend: {eeee: 1, eeoo: 1},
      pileInBendSinister: {eeee: 1, eemm: 1}
    },
    ordinariesOff: {
      pale: {yyy: 1},
      fess: {abc: 3, abcz: 1},
      bar: {abc: 2, abcgzi: 1, jlh: 5, bgi: 2, ach: 1},
      gemelle: {abc: 1},
      bend: {ccg: 2, ccc: 1},
      bendSinister: {aai: 2, aaa: 1},
      bendlet: {ccg: 2, ccc: 1},
      bendletSinister: {aai: 2, aaa: 1},
      bordure: {e: 4, jleh: 2, kenken: 1, peqpeq: 1},
      orle: {e: 4, jleh: 1, kenken: 1, peqpeq: 1},
      chief: {emo: 2, emoz: 1, ez: 2},
      terrace: {e: 5, def: 1, bdf: 3},
      mount: {e: 5, def: 1, bdf: 3},
      point: {e: 2, def: 1, bdf: 3, acbdef: 1},
      flaunches: {e: 3, kn: 1, beh: 3},
      gyron: {bh: 1},
      quarter: {e: 1},
      canton: {e: 5, beh: 1, def: 1, bdefh: 1, kn: 1},
      cross: {acgi: 1},
      pall: {BCKFEILGJbdmfo: 1},
      pallReversed: {aczac: 1},
      chevron: {ach: 3, hhh: 1},
      chevronReversed: {bbb: 1},
      pile: {acdfgi: 1, acac: 1},
      pileInBend: {cg: 1},
      pileInBendSinister: {ai: 1},
      label: {defgzi: 2, eh: 3, defdefhmo: 1, egiegi: 1, pqn: 5}
    },
    // charges
    inescutcheon: {e: 4, jln: 1},
    mascle: {e: 15, abcdefgzi: 3, beh: 3, bdefh: 4, acegi: 1, kn: 3, joe: 2, abc: 3, jlh: 8, jleh: 1, df: 3, abcpqh: 4, pqe: 3, eknpq: 3},
    lionRampant: {e: 10, def: 2, abc: 2, bdefh: 1, kn: 1, jlh: 2, abcpqh: 1},
    lionPassant: {e: 10, def: 1, abc: 1, bdefh: 1, jlh: 1, abcpqh: 1},
    wolfPassant: {e: 10, def: 1, abc: 1, bdefh: 1, jlh: 1, abcpqh: 1},
    greyhoundСourant: {e: 10, def: 1, abc: 1, bdefh: 1, jlh: 1, abcpqh: 1},
    griffinRampant: {e: 10, def: 2, abc: 2, bdefh: 1, kn: 1, jlh: 2, abcpqh: 1},
    griffinPassant: {e: 10, def: 1, abc: 1, bdefh: 1, jlh: 1, abcpqh: 1},
    boarRampant: {e: 12, beh: 1, kn: 1, jln: 2},
    eagle: {e: 15, beh: 1, kn: 1, abc: 1, jlh: 2, def: 2, pq: 1},
    raven: {e: 15, beh: 1, kn: 1, jeo: 1, abc: 3, jln: 3, def: 1},
    wyvern: {e: 10, jln: 1},
    garb: {e: 1, def: 3, abc: 2, beh: 1, kn: 1, jln: 3, jleh: 1, abcpqh: 1, joe: 1, lme: 1},
    crown: {e: 10, abcdefgzi: 1, beh: 3, behdf: 2, acegi: 1, kn: 1, pq: 2, abc: 1, jln: 4, jleh: 1, def: 2, abcpqh: 3},
    hand: {e: 10, jln: 2, kn: 1, jeo: 1, abc: 2, pqe: 1},
    armillarySphere: {e: 1},
    tree: {e: 1},
    lymphad: {e: 1},
    head: {e: 1},
    headWreathed: {e: 1},
    cavalier: {e: 1},
    angel: {e: 1}
  };

  const lines = {
    straight: 50,
    wavy: 8,
    engrailed: 4,
    invecked: 3,
    rayonne: 3,
    embattled: 1,
    raguly: 1,
    urdy: 1,
    dancetty: 1,
    indented: 2,
    dentilly: 1,
    bevilled: 1,
    angled: 1,
    flechy: 1,
    barby: 1,
    enclavy: 1,
    escartely: 1,
    arched: 2,
    archedReversed: 1,
    nowy: 1,
    nowyReversed: 1,
    embattledGhibellin: 1,
    embattledNotched: 1,
    embattledGrady: 1,
    dovetailedIndented: 1,
    dovetailed: 1,
    potenty: 1,
    potentyDexter: 1,
    potentySinister: 1,
    nebuly: 2,
    seaWaves: 1,
    dragonTeeth: 1,
    firTrees: 1
  };

  const divisions = {
    variants: {perPale: 5, perFess: 5, perBend: 2, perBendSinister: 1, perChevron: 1, perChevronReversed: 1, perCross: 5, perPile: 1, perSaltire: 1, gyronny: 1, chevronny: 1},
    perPale: lines,
    perFess: lines,
    perBend: lines,
    perBendSinister: lines,
    perChevron: lines,
    perChevronReversed: lines,
    perCross: {straight: 20, wavy: 5, engrailed: 4, invecked: 3, rayonne: 1, embattled: 1, raguly: 1, urdy: 1, indented: 2, dentilly: 1, bevilled: 1, angled: 1, embattledGhibellin: 1, embattledGrady: 1, dovetailedIndented: 1, dovetailed: 1, potenty: 1, potentyDexter: 1, potentySinister: 1, nebuly: 1},
    perPile: lines
  };

  const ordinaries = {
    lined: {
      pale: 7,
      fess: 5,
      bend: 3,
      bendSinister: 2,
      chief: 5,
      bar: 2,
      gemelle: 1,
      fessCotissed: 1,
      fessDoubleCotissed: 1,
      bendlet: 2,
      bendletSinister: 1,
      terrace: 3,
      cross: 6,
      crossParted: 1,
      saltire: 2,
      saltireParted: 1
    },
    straight: {
      bordure: 8,
      orle: 4,
      mount: 1,
      point: 2,
      flaunches: 1,
      gore: 1,
      gyron: 1,
      quarter: 1,
      canton: 2,
      pall: 3,
      pallReversed: 2,
      chevron: 4,
      chevronReversed: 3,
      pile: 2,
      pileInBend: 2,
      pileInBendSinister: 1,
      piles: 1,
      pilesInPoint: 2,
      label: 1
    }
  };

  const shields = {
    types: {basic: 10, regional: 2, historical: 1, specific: 1, banner: 1, simple: 2, fantasy: 1, middleEarth: 0},
    basic: {heater: 12, spanish: 6, french: 1},
    regional: {horsehead: 1, horsehead2: 1, polish: 1, hessen: 1, swiss: 1},
    historical: {boeotian: 1, roman: 2, kite: 1, oldFrench: 5, renaissance: 2, baroque: 2},
    specific: {targe: 1, targe2: 0, pavise: 5, wedged: 10},
    banner: {flag: 1, pennon: 0, guidon: 0, banner: 0, dovetail: 1, gonfalon: 5, pennant: 0},
    simple: {round: 12, oval: 6, vesicaPiscis: 1, square: 1, diamond: 2, no: 0},
    fantasy: {fantasy1: 2, fantasy2: 2, fantasy3: 1, fantasy4: 1, fantasy5: 3},
    middleEarth: {noldor: 1, gondor: 1, easterling: 1, erebor: 1, ironHills: 1, urukHai: 1, moriaOrc: 1}
  };

  const generate = (parent, kinship, dominion, type) => {
    if (!parent || parent === "custom") {
      parent = null;
      kinship = 0;
      dominion = 0;
    }
    let usedPattern = null,
      usedTinctures = [];

    const t1 = this.P(kinship) ? parent.t1 : getTincture("field", null, null);
    if (t1.includes("-")) usedPattern = t1;
    const coa: any = {t1};

    let charge: any = this.P(usedPattern ? 0.5 : 0.93) ? true : false; // 80% for charge
    const linedOrdinary = (charge && this.P(0.3)) || this.P(0.5) ? (parent?.ordinaries && this.P(kinship) ? parent.ordinaries[0].ordinary : this.rw(ordinaries.lined)) : null;
    const ordinary = (!charge && this.P(0.65)) || this.P(0.3) ? (linedOrdinary ? linedOrdinary : this.rw(ordinaries.straight)) : null; // 36% for ordinary
    const rareDivided = ["chief", "terrace", "chevron", "quarter", "flaunches"].includes(ordinary);
    const divisioned = rareDivided ? this.P(0.03) : charge && ordinary ? this.P(0.03) : charge ? this.P(0.3) : ordinary ? this.P(0.7) : this.P(0.995); // 33% for division
    const division = divisioned ? (parent?.division && this.P(kinship - 0.1) ? parent.division.division : this.rw(divisions.variants)) : null;
    if (charge) charge = parent?.charges && this.P(kinship - 0.1) ? parent.charges[0].charge : type && type !== "Generic" && this.P(0.2) ? this.rw(charges[type]) : selectCharge(null);

    if (division) {
      const t = getTincture("division", usedTinctures, this.P(0.98) ? coa.t1 : null);
      coa.division = {division, t};
      if (divisions[division]) coa.division.line = usedPattern || (ordinary && this.P(0.7)) ? "straight" : this.rw(divisions[division]);
    }

    if (ordinary) {
      coa.ordinaries = [{ordinary, t: getTincture("charge", usedTinctures, coa.t1)}];
      if (linedOrdinary) coa.ordinaries[0].line = usedPattern || (division && this.P(0.7)) ? "straight" : this.rw(lines);
      if (division && !charge && !usedPattern && this.P(0.5) && ordinary !== "bordure" && ordinary !== "orle") {
        if (this.P(0.8)) coa.ordinaries[0].divided = "counter";
        // 40%
        else if (this.P(0.6)) coa.ordinaries[0].divided = "field";
        // 6%
        else coa.ordinaries[0].divided = "division"; // 4%
      }
    }

    if (charge) {
      let p = "e",
        t = "gules";
      const ordinaryT = coa.ordinaries ? coa.ordinaries[0].t : null;
      if (positions.ordinariesOn[ordinary] && this.P(0.8)) {
        // place charge over ordinary (use tincture of field type)
        p = this.rw(positions.ordinariesOn[ordinary]);
        while (charges.natural[charge] === ordinaryT) charge = selectCharge(null);
        t = !usedPattern && this.P(0.3) ? coa.t1 : getTincture("charge", [], ordinaryT);
      } else if (positions.ordinariesOff[ordinary] && this.P(0.95)) {
        // place charge out of ordinary (use tincture of ordinary type)
        p = this.rw(positions.ordinariesOff[ordinary]);
        while (charges.natural[charge] === coa.t1) charge = selectCharge(null);
        t = !usedPattern && this.P(0.3) ? ordinaryT : getTincture("charge", usedTinctures, coa.t1);
      } else if (positions.divisions[division]) {
        // place charge in fields made by division
        p = this.rw(positions.divisions[division]);
        while (charges.natural[charge] === coa.t1) charge = selectCharge(null);
        t = getTincture("charge", ordinaryT ? usedTinctures.concat(ordinaryT) : usedTinctures, coa.t1);
      } else if (positions[charge]) {
        // place charge-suitable position
        p = this.rw(positions[charge]);
        while (charges.natural[charge] === coa.t1) charge = selectCharge(null);
        t = getTincture("charge", usedTinctures, coa.t1);
      } else {
        // place in standard position (use new tincture)
        p = usedPattern ? "e" : charges.conventional[charge] ? this.rw(positions.conventional) : this.rw(positions.complex);
        while (charges.natural[charge] === coa.t1) charge = selectCharge(null);
        t = getTincture("charge", usedTinctures.concat(ordinaryT), coa.t1);
      }

      if (charges.natural[charge]) t = charges.natural[charge]; // natural tincture
      coa.charges = [{charge, t, p}];

      if (p === "ABCDEFGHIKL" && this.P(0.95)) {
        // add central charge if charge is in bordure
        coa.charges[0].charge = this.rw(charges.conventional);
        const charge = selectCharge(charges.single);
        const t = getTincture("charge", usedTinctures, coa.t1);
        coa.charges.push({charge, t, p: "e"});
      } else if (this.P(0.8) && charge === "inescutcheon") {
        // add charge to inescutcheon
        const charge = selectCharge(charges.types);
        const t2 = getTincture("charge", [], t);
        coa.charges.push({charge, t: t2, p, size: 0.5});
      } else if (division && !ordinary) {
        const allowCounter = !usedPattern && (!coa.line || coa.line === "straight");

        // dimidiation: second charge at division basic positons
        if (this.P(0.3) && ["perPale", "perFess"].includes(division) && coa.line === "straight") {
          coa.charges[0].divided = "field";
          if (this.P(0.95)) {
            const p2 = p === "e" || this.P(0.5) ? "e" : this.rw(positions.divisions[division]);
            const charge = selectCharge(charges.single);
            const t = getTincture("charge", usedTinctures, coa.division.t);
            coa.charges.push({charge, t, p: p2, divided: "division"});
          }
        } else if (allowCounter && this.P(0.4)) coa.charges[0].divided = "counter";
        // counterchanged, 40%
        else if (["perPale", "perFess", "perBend", "perBendSinister"].includes(division) && this.P(0.8)) {
          // place 2 charges in division standard positions
          const [p1, p2] = division === "perPale" ? ["p", "q"] : division === "perFess" ? ["k", "n"] : division === "perBend" ? ["l", "m"] : ["j", "o"]; // perBendSinister
          coa.charges[0].p = p1;

          const charge = selectCharge(charges.single);
          const t = getTincture("charge", usedTinctures, coa.division.t);
          coa.charges.push({charge, t, p: p2});
        } else if (["perCross", "perSaltire"].includes(division) && this.P(0.5)) {
          // place 4 charges in division standard positions
          const [p1, p2, p3, p4] = division === "perCross" ? ["j", "l", "m", "o"] : ["b", "d", "f", "h"];
          coa.charges[0].p = p1;

          const c2 = selectCharge(charges.single);
          const t2 = getTincture("charge", [], coa.division.t);

          const c3 = selectCharge(charges.single);
          const t3 = getTincture("charge", [], coa.division.t);

          const c4 = selectCharge(charges.single);
          const t4 = getTincture("charge", [], coa.t1);
          coa.charges.push({charge: c2, t: t2, p: p2}, {charge: c3, t: t3, p: p3}, {charge: c4, t: t4, p: p4});
        } else if (allowCounter && p.length > 1) coa.charges[0].divided = "counter"; // counterchanged, 40%
      }

      coa.charges.forEach(c => {
        // define size
        c.size = (c.size || 1) * getSize(c.p, ordinary, division);

        // clean-up position
        c.p = [...new Set(c.p)].join("");

        // define orientation
        if (this.P(0.02) && charges.sinister.includes(c.charge)) c.sinister = 1;
        if (this.P(0.02) && charges.reversed.includes(c.charge)) c.reversed = 1;
      });
    }

    // dominions have canton with parent coa
    if (this.P(dominion) && parent.charges) {
      const invert = isSameType(parent.t1, coa.t1);
      const t = invert ? getTincture("division", usedTinctures, coa.t1) : parent.t1;
      const canton = {ordinary: "canton", t};
      if (coa.charges) {
        coa.charges.forEach((charge, i) => {
          if (charge.size === 1.5) charge.size = 1.4;
          if (charge.p.includes("a")) charge.p = charge.p.replaceAll("a", "");
          if (charge.p.includes("j")) charge.p = charge.p.replaceAll("j", "");
          if (charge.p.includes("y")) charge.p = charge.p.replaceAll("y", "");
          if (!charge.p) coa.charges.splice(i, 1);
        });
      }

      let charge = parent.charges[0].charge;
      if (charge === "inescutcheon" && parent.charges[1]) charge = parent.charges[1].charge;

      let t2 = invert ? parent.t1 : parent.charges[0].t;
      if (isSameType(t, t2)) t2 = getTincture("charge", usedTinctures, t);

      if (!coa.charges) coa.charges = [];
      coa.charges.push({charge, t: t2, p: "y", size: 0.5});

      coa.ordinaries ? coa.ordinaries.push(canton) : (coa.ordinaries = [canton]);
    }
    let rw = this.rw;
    function selectCharge(set) {
      const type = set ? rw(set) : ordinary || divisioned ? rw(charges.types) : rw(charges.single);
      return type === "inescutcheon" ? "inescutcheon" : rw(charges[type]);
    }

    // select tincture: element type (field, division, charge), used field tinctures, field type to follow RoT
    function getTincture(element, fields = [], RoT) {
      const base = RoT ? (RoT.includes("-") ? RoT.split("-")[1] : RoT) : null;

      let type = rw(tinctures[element]); // metals, colours, stains, patterns
      if (RoT && type !== "patterns") type = getType(base) === "metals" ? "colours" : "metals"; // follow RoT
      if (type === "metals" && fields.includes("or") && fields.includes("argent")) type = "colours"; // exclude metals overuse
      let tincture = rw(tinctures[type]);

      while (tincture === base || fields.includes(tincture)) {
        tincture = rw(tinctures[type]);
      } // follow RoT

      if (type !== "patterns" && element !== "charge") usedTinctures.push(tincture); // add field tincture

      if (type === "patterns") {
        usedPattern = tincture;
        tincture = definePattern(tincture, element);
      }

      return tincture;
    }

    function getType(t) {
      const tincture = t.includes("-") ? t.split("-")[1] : t;
      if (Object.keys(tinctures.metals).includes(tincture)) return "metals";
      if (Object.keys(tinctures.colours).includes(tincture)) return "colours";
      if (Object.keys(tinctures.stains).includes(tincture)) return "stains";
    }

    function isSameType(t1, t2) {
      return type(t1) === type(t2);

      function type(tincture) {
        if (Object.keys(tinctures.metals).includes(tincture)) return "metals";
        if (Object.keys(tinctures.colours).includes(tincture)) return "colours";
        if (Object.keys(tinctures.stains).includes(tincture)) return "stains";
        else return "pattern";
      }
    }
    let P = this.P;
    function definePattern(pattern, element, size = "") {
      let t1 = null,
        t2 = null;
      if (P(0.1)) size = "-small";
      else if (P(0.1)) size = "-smaller";
      else if (P(0.01)) size = "-big";
      else if (P(0.005)) size = "-smallest";

      // apply standard tinctures
      if (P(0.5) && ["vair", "vairInPale", "vairEnPointe"].includes(pattern)) {
        t1 = "azure";
        t2 = "argent";
      } else if (P(0.8) && pattern === "ermine") {
        t1 = "argent";
        t2 = "sable";
      } else if (pattern === "pappellony") {
        if (P(0.2)) {
          t1 = "gules";
          t2 = "or";
        } else if (P(0.2)) {
          t1 = "argent";
          t2 = "sable";
        } else if (P(0.2)) {
          t1 = "azure";
          t2 = "argent";
        }
      } else if (pattern === "masoned") {
        if (P(0.3)) {
          t1 = "gules";
          t2 = "argent";
        } else if (P(0.3)) {
          t1 = "argent";
          t2 = "sable";
        } else if (P(0.1)) {
          t1 = "or";
          t2 = "sable";
        }
      } else if (pattern === "fretty") {
        if (t2 === "sable" || P(0.35)) {
          t1 = "argent";
          t2 = "gules";
        } else if (P(0.25)) {
          t1 = "sable";
          t2 = "or";
        } else if (P(0.15)) {
          t1 = "gules";
          t2 = "argent";
        }
      } else if (pattern === "semy") pattern += "_of_" + selectCharge(charges.semy);

      if (!t1 || !t2) {
        const startWithMetal = P(0.7);
        t1 = startWithMetal ? rw(tinctures.metals) : rw(tinctures.colours);
        t2 = startWithMetal ? rw(tinctures.colours) : rw(tinctures.metals);
      }

      // division should not be the same tincture as base field
      if (element === "division") {
        if (usedTinctures.includes(t1)) t1 = replaceTincture(t1, null);
        if (usedTinctures.includes(t2)) t2 = replaceTincture(t2, null);
      }

      usedTinctures.push(t1, t2);
      return `${pattern}-${t1}-${t2}${size}`;
    }

    function replaceTincture(t, n) {
      const type = getType(t);
      while (!n || n === t) {
        n = rw(tinctures[type]);
      }
      return n;
    }

    function getSize(p, o = null, d = null) {
      if (p === "e" && (o === "bordure" || o === "orle")) return 1.1;
      if (p === "e") return 1.5;
      if (p === "jln" || p === "jlh") return 0.7;
      if (p === "abcpqh" || p === "ez" || p === "be") return 0.5;
      if (["a", "b", "c", "d", "f", "g", "h", "i", "bh", "df"].includes(p)) return 0.5;
      if (["j", "l", "m", "o", "jlmo"].includes(p) && d === "perCross") return 0.6;
      if (p.length > 10) return 0.18; // >10 (bordure)
      if (p.length > 7) return 0.3; // 8, 9, 10
      if (p.length > 4) return 0.4; // 5, 6, 7
      if (p.length > 2) return 0.5; // 3, 4
      return 0.7; // 1, 2
    }

    return coa;
  };

  const getShield = (culture, state) => {
    const emblemShape = <HTMLSelectElement>document.getElementById("emblemShape");
    const shapeGroup = (<any>emblemShape.selectedOptions[0]?.parentNode).label || "Diversiform";
    if (shapeGroup !== "Diversiform") return emblemShape.value;

    if (emblemShape.value === "state" && state && this.pack.states[state].coa) return this.pack.states[state].coa.shield;
    if (this.pack.cultures[culture].shield) return this.pack.cultures[culture].shield;
    console.error("Shield shape is not defined on culture level", this.pack.cultures[culture]);
    return "heater";
  };

  const toString = coa => JSON.stringify(coa).replaceAll("#", "%23");
  const copy = coa => JSON.parse(JSON.stringify(coa));

  return {generate, toString, copy, getShield, shields};
})();


renderGroupCOAs = async (g) => {
  const [group, type] = g.id === "burgEmblems" ? [this.pack.burgs, "burg"] : g.id === "provinceEmblems" ? [this.pack.provinces, "province"] : [this.pack.states, "state"];
  for (let use of g.children) {
    const i = +use.dataset.i;
    const id = type + "COA" + i;
    this.COArenderer.trigger(id, group[i].coa);
    use.setAttribute("href", "#" + id);
  }
}

// change svg size on manual size change or window resize, do not change graph size
changeMapSize() {
  console.log("Change Map Size");
  this.svgWidth = 1920; //Math.min(+this.mapWidthInput.value, window.innerWidth);
  this.svgHeight = 1080; //Math.min(+this.mapHeightInput.value, window.innerHeight);
  this.svg.attr("width", this.svgWidth).attr("height", this.svgHeight);

  const maxWidth = 1920; //Math.max(+this.mapWidthInput.value, this.graphWidth);
  const maxHeight = 1080; //Math.max(+this.mapHeightInput.value, this.graphHeight);
  this.zoom.translateExtent([
    [0, 0],
    [maxWidth, maxHeight]
  ]);
  this.landmass.select("rect").attr("x", 0).attr("y", 0).attr("width", maxWidth).attr("height", maxHeight);
  this.oceanPattern.select("rect").attr("x", 0).attr("y", 0).attr("width", maxWidth).attr("height", maxHeight);
  this.oceanLayers.select("rect").attr("x", 0).attr("y", 0).attr("width", maxWidth).attr("height", maxHeight);
  this.fogging.selectAll("rect").attr("x", 0).attr("y", 0).attr("width", maxWidth).attr("height", maxHeight);
  this.defs.select("mask#fog > rect").attr("width", maxWidth).attr("height", maxHeight);
  this.texture.select("image").attr("width", maxWidth).attr("height", maxHeight);

  // this.fitScaleBar();
  // if (window.fitLegendBox)
  //  this.fitLegendBox();
}

// focus on coordinates, cell or burg provided in searchParams
focusOn() {
  const url = new URL(window.location.href);
  const params = url.searchParams;

  const fromMGCG = params.get("from") === "MFCG" && document.referrer;
  if (fromMGCG) {
    if (params.get("seed").length === 13) {
      // show back burg from MFCG
      const burgSeed = params.get("seed").slice(-4);
      params.set("burg", burgSeed);
    } else {
      // select burg for MFCG
      // findBurgForMFCG(params);
      console.log("findBurgForMFCG");
      return;
    }
  }

  const scaleParam = params.get("scale");
  const cellParam = params.get("cell");
  const burgParam = params.get("burg");

  if (scaleParam || cellParam || burgParam) {
    const scale = +scaleParam || 8;

    if (cellParam) {
      const cell = +params.get("cell");
      const [x, y] = this.pack.cells.p[cell];
      this.zoomTo(x, y, scale, 1600);
      return;
    }

    if (burgParam) {
      const burg = isNaN(+burgParam) ? this.pack.burgs.find(burg => burg.name === burgParam) : this.pack.burgs[+burgParam];
      if (!burg) return;

      const {x, y} = burg;
      this.zoomTo(x, y, scale, 1600);
      return;
    }

    const x = +params.get("x") || this.graphWidth / 2;
    const y = +params.get("y") || this.graphHeight / 2;
    this.zoomTo(x, y, scale, 1600);
  }
}

// Zoom to a specific point
zoomTo(x, y, z = 8, d = 2000) {
  const transform = d3.zoomIdentity.translate(x * -z + this.graphWidth / 2, y * -z + this.graphHeight / 2).scale(z);
  this.svg.transition().duration(d).call(this.zoom.transform, transform);
}

changeFont() {
  console.log("ChangeFont");
  // const family = styleSelectFont.value;
  // this.getEl().attr("font-family", family);

  // if (styleElementSelect.value === "legend") this.redrawLegend();
}


Rivers = (() => {
  let seed = this.seed;
  let pack = this.pack;
  let Lakes = this.Lakes;
  let grid = this.grid;
  const generate = function (allowErosion = true) {
    console.time("generateRivers");
    Math.random = aleaPRNG(seed);
    const {cells, features} = pack;

    const riversData = {}; // rivers data
    const riverParents = {};
    const addCellToRiver = function (cell, river) {
      if (!riversData[river]) riversData[river] = [cell];
      else riversData[river].push(cell);
    };

    cells.fl = new Uint16Array(cells.i.length); // water flux array
    cells.r = new Uint16Array(cells.i.length); // rivers array
    cells.conf = new Uint8Array(cells.i.length); // confluences array
    let riverNext = 1; // first river id is 1

    const h = alterHeights();
    Lakes.prepareLakeData(h);
    resolveDepressions(h);
    drainWater();
    defineRivers();
    calculateConfluenceFlux();
    Lakes.cleanupLakeData();

    if (allowErosion) cells.h = Uint8Array.from(h); // apply changed heights as basic one

    console.timeEnd("generateRivers");

    function drainWater() {
      const MIN_FLUX_TO_FORM_RIVER = 30;
      const prec = grid.cells.prec;
      const area = pack.cells.area;
      const land = cells.i.filter(i => h[i] >= 20).sort((a, b) => h[b] - h[a]);
      const lakeOutCells = Lakes.setClimateData(h);

      land.forEach(function (i) {
        cells.fl[i] += (prec[cells.g[i]] * area[i]) / 100; // add flux from precipitation

        // create lake outlet if lake is not in deep depression and flux > evaporation
        const lakes = lakeOutCells[i] ? features.filter(feature => i === feature.outCell && feature.flux > feature.evaporation) : [];
        for (const lake of lakes) {
          const lakeCell = cells.c[i].find(c => h[c] < 20 && cells.f[c] === lake.i);
          cells.fl[lakeCell] += Math.max(lake.flux - lake.evaporation, 0); // not evaporated lake water drains to outlet

          // allow chain lakes to retain identity
          if (cells.r[lakeCell] !== lake.river) {
            const sameRiver = cells.c[lakeCell].some(c => cells.r[c] === lake.river);

            if (sameRiver) {
              cells.r[lakeCell] = lake.river;
              addCellToRiver(lakeCell, lake.river);
            } else {
              cells.r[lakeCell] = riverNext;
              addCellToRiver(lakeCell, riverNext);
              riverNext++;
            }
          }

          lake.outlet = cells.r[lakeCell];
          flowDown(i, cells.fl[lakeCell], lake.outlet);
        }

        // assign all tributary rivers to outlet basin
        const outlet = lakes[0]?.outlet;
        for (const lake of lakes) {
          if (!Array.isArray(lake.inlets)) continue;
          for (const inlet of lake.inlets) {
            riverParents[inlet] = outlet;
          }
        }

        // near-border cell: pour water out of the screen
        if (cells.b[i] && cells.r[i]) return addCellToRiver(-1, cells.r[i]);

        // downhill cell (make sure it's not in the source lake)
        let min = null;
        if (lakeOutCells[i]) {
          const filtered = cells.c[i].filter(c => !lakes.map(lake => lake.i).includes(cells.f[c]));
          min = filtered.sort((a, b) => h[a] - h[b])[0];
        } else if (cells.haven[i]) {
          min = cells.haven[i];
        } else {
          min = cells.c[i].sort((a, b) => h[a] - h[b])[0];
        }

        // cells is depressed
        if (h[i] <= h[min]) return;

        if (cells.fl[i] < MIN_FLUX_TO_FORM_RIVER) {
          // flux is too small to operate as a river
          if (h[min] >= 20) cells.fl[min] += cells.fl[i];
          return;
        }

        // proclaim a new river
        if (!cells.r[i]) {
          cells.r[i] = riverNext;
          addCellToRiver(i, riverNext);
          riverNext++;
        }

        flowDown(min, cells.fl[i], cells.r[i]);
      });
    }

    function flowDown(toCell, fromFlux, river) {
      const toFlux = cells.fl[toCell] - cells.conf[toCell];
      const toRiver = cells.r[toCell];

      if (toRiver) {
        // downhill cell already has river assigned
        if (fromFlux > toFlux) {
          cells.conf[toCell] += cells.fl[toCell]; // mark confluence
          if (h[toCell] >= 20) riverParents[toRiver] = river; // min river is a tributary of current river
          cells.r[toCell] = river; // re-assign river if downhill part has less flux
        } else {
          cells.conf[toCell] += fromFlux; // mark confluence
          if (h[toCell] >= 20) riverParents[river] = toRiver; // current river is a tributary of min river
        }
      } else cells.r[toCell] = river; // assign the river to the downhill cell

      if (h[toCell] < 20) {
        // pour water to the water body
        const waterBody = features[cells.f[toCell]];
        if (waterBody.type === "lake") {
          if (!waterBody.river || fromFlux > waterBody.enteringFlux) {
            waterBody.river = river;
            waterBody.enteringFlux = fromFlux;
          }
          waterBody.flux = waterBody.flux + fromFlux;
          if (!waterBody.inlets) waterBody.inlets = [river];
          else waterBody.inlets.push(river);
        }
      } else {
        // propagate flux and add next river segment
        cells.fl[toCell] += fromFlux;
      }

      addCellToRiver(toCell, river);
    }

    function defineRivers() {
      // re-initialize rivers and confluence arrays
      cells.r = new Uint16Array(cells.i.length);
      cells.conf = new Uint16Array(cells.i.length);
      pack.rivers = [];

      for (const key in riversData) {
        const riverCells = riversData[key];
        if (riverCells.length < 3) continue; // exclude tiny rivers

        const riverId = +key;
        for (const cell of riverCells) {
          if (cell < 0 || cells.h[cell] < 20) continue;

          // mark real confluences and assign river to cells
          if (cells.r[cell]) cells.conf[cell] = 1;
          else cells.r[cell] = riverId;
        }

        const source = riverCells[0];
        const mouth = riverCells[riverCells.length - 2];
        const parent = riverParents[key] || 0;

        const widthFactor = !parent || parent === riverId ? 1.2 : 1;
        const meanderedPoints = addMeandering(riverCells);
        const discharge = cells.fl[mouth]; // m3 in second
        const length = getApproximateLength(meanderedPoints);
        const width = getWidth(getOffset(discharge, meanderedPoints.length, widthFactor, 0));

        pack.rivers.push({i: riverId, source, mouth, discharge, length, width, widthFactor, sourceWidth: 0, parent, cells: riverCells});
      }
    }

    function calculateConfluenceFlux() {
      for (const i of cells.i) {
        if (!cells.conf[i]) continue;

        const sortedInflux = cells.c[i]
          .filter(c => cells.r[c] && h[c] > h[i])
          .map(c => cells.fl[c])
          .sort((a, b) => b - a);
        cells.conf[i] = sortedInflux.reduce((acc, flux, index) => (index ? acc + flux : acc), 0);
      }
    }
  };

  // add distance to water value to land cells to make map less depressed
  const alterHeights = () => {
    const {h, c, t} = pack.cells;
    return Array.from(h).map((h:any, i:any) => {
      if (h < 20 || t[i] < 1) return h;
      return h + t[i] / 100 + d3.mean(c[i].map(c => t[c])) / 10000;
    });
  };

  // depression filling algorithm (for a correct water flux modeling)
  const resolveDepressions = function (h) {
    const {cells, features} = pack;
    const maxIterations = +(<HTMLInputElement>document.getElementById("resolveDepressionsStepsOutput")).value;
    const checkLakeMaxIteration = maxIterations * 0.85;
    const elevateLakeMaxIteration = maxIterations * 0.75;

    const height = i => features[cells.f[i]].height || h[i]; // height of lake or specific cell

    const lakes = features.filter(f => f.type === "lake");
    const land = cells.i.filter(i => h[i] >= 20 && !cells.b[i]); // exclude near-border cells
    land.sort((a, b) => h[a] - h[b]); // lowest cells go first

    const progress = [];
    let depressions = Infinity;
    let prevDepressions = null;
    for (let iteration = 0; depressions && iteration < maxIterations; iteration++) {
      if (progress.length > 5 && d3.sum(progress) > 0) {
        // bad progress, abort and set heights back
        h = alterHeights();
        depressions = progress[0];
        break;
      }

      depressions = 0;

      if (iteration < checkLakeMaxIteration) {
        for (const l of lakes) {
          if (l.closed) continue;
          const minHeight = d3.min(l.shoreline.map(s => h[s]));
          if (minHeight >= 100 || l.height > minHeight) continue;

          if (iteration > elevateLakeMaxIteration) {
            l.shoreline.forEach(i => (h[i] = cells.h[i]));
            l.height = d3.min(l.shoreline.map(s => h[s])) - 1;
            l.closed = true;
            continue;
          }

          depressions++;
          l.height = minHeight + 0.2;
        }
      }

      for (const i of land) {
        const minHeight = d3.min(cells.c[i].map(c => height(c)));
        if (minHeight >= 100 || h[i] > minHeight) continue;

        depressions++;
        h[i] = minHeight + 0.1;
      }

      prevDepressions !== null && progress.push(depressions - prevDepressions);
      prevDepressions = depressions;
    }

    depressions && console.warn(`Unresolved depressions: ${depressions}. Edit heightmap to fix`);
  };

  // add points at 1/3 and 2/3 of a line between adjacents river cells
  const addMeandering = (riverCells, riverPoints = null, meandering = 0.5) => {
    const {fl, conf, h} = this.pack.cells;
    const meandered = [];
    const lastStep = riverCells.length - 1;
    const points = getRiverPoints(riverCells, riverPoints);
    let step = h[riverCells[0]] < 20 ? 1 : 10;

    let fluxPrev = 0;
    const getFlux = (step, flux) => (step === lastStep ? fluxPrev : flux);

    for (let i = 0; i <= lastStep; i++, step++) {
      const cell = riverCells[i];
      const isLastCell = i === lastStep;

      const [x1, y1] = points[i];
      const flux1 = getFlux(i, fl[cell]);
      fluxPrev = flux1;

      meandered.push([x1, y1, flux1]);
      if (isLastCell) break;

      const nextCell = riverCells[i + 1];
      const [x2, y2] = points[i + 1];

      if (nextCell === -1) {
        meandered.push([x2, y2, fluxPrev]);
        break;
      }

      const dist2 = (x2 - x1) ** 2 + (y2 - y1) ** 2; // square distance between cells
      if (dist2 <= 25 && riverCells.length >= 6) continue;

      const flux2 = getFlux(i + 1, fl[nextCell]);
      const keepInitialFlux = conf[nextCell] || flux1 === flux2;

      const meander = meandering + 1 / step + Math.max(meandering - step / 100, 0);
      const angle = Math.atan2(y2 - y1, x2 - x1);
      const sinMeander = Math.sin(angle) * meander;
      const cosMeander = Math.cos(angle) * meander;

      if (step < 10 && (dist2 > 64 || (dist2 > 36 && riverCells.length < 5))) {
        // if dist2 is big or river is small add extra points at 1/3 and 2/3 of segment
        const p1x = (x1 * 2 + x2) / 3 + -sinMeander;
        const p1y = (y1 * 2 + y2) / 3 + cosMeander;
        const p2x = (x1 + x2 * 2) / 3 + sinMeander / 2;
        const p2y = (y1 + y2 * 2) / 3 - cosMeander / 2;
        const [p1fl, p2fl] = keepInitialFlux ? [flux1, flux1] : [(flux1 * 2 + flux2) / 3, (flux1 + flux2 * 2) / 3];
        meandered.push([p1x, p1y, p1fl], [p2x, p2y, p2fl]);
      } else if (dist2 > 25 || riverCells.length < 6) {
        // if dist is medium or river is small add 1 extra middlepoint
        const p1x = (x1 + x2) / 2 + -sinMeander;
        const p1y = (y1 + y2) / 2 + cosMeander;
        const p1fl = keepInitialFlux ? flux1 : (flux1 + flux2) / 2;
        meandered.push([p1x, p1y, p1fl]);
      }
    }

    return meandered;
  };

  const getRiverPoints = (riverCells, riverPoints) => {
    if (riverPoints) return riverPoints;
    const {p} = this.pack.cells;
    return riverCells.map((cell, i) => {
      if (cell === -1) return getBorderPoint(riverCells[i - 1]);
      return p[cell];
    });
  };

  const getBorderPoint = i => {
    const [x, y] = this.pack.cells.p[i];
    const min = Math.min(y, this.graphHeight - y, x, this.graphWidth - x);
    if (min === y) return [x, 0];
    else if (min === this.graphHeight - y) return [x, this.graphHeight];
    else if (min === x) return [0, y];
    return [this.graphWidth, y];
  };

  const FLUX_FACTOR = 500;
  const MAX_FLUX_WIDTH = 2;
  const LENGTH_FACTOR = 200;
  const STEP_WIDTH = 1 / LENGTH_FACTOR;
  const LENGTH_PROGRESSION = [1, 1, 2, 3, 5, 8, 13, 21, 34].map(n => n / LENGTH_FACTOR);
  const MAX_PROGRESSION = this.last(LENGTH_PROGRESSION);

  const getOffset = (flux, pointNumber, widthFactor = 1, startingWidth = 0) => {
    const fluxWidth = Math.min(flux ** 0.9 / FLUX_FACTOR, MAX_FLUX_WIDTH);
    const lengthWidth = pointNumber * STEP_WIDTH + (LENGTH_PROGRESSION[pointNumber] || MAX_PROGRESSION);
    return widthFactor * (lengthWidth + fluxWidth) + startingWidth;
  };

  // build polygon from a list of points and calculated offset (width)
  const getRiverPath = (points, widthFactor = 1, startingWidth = 0) => {
    const riverPointsLeft = [];
    const riverPointsRight = [];

    for (let p = 0; p < points.length; p++) {
      const [x0, y0] = points[p - 1] || points[p];
      const [x1, y1, flux] = points[p];
      const [x2, y2] = points[p + 1] || points[p];

      const offset = getOffset(flux, p, widthFactor, startingWidth);
      const angle = Math.atan2(y0 - y2, x0 - x2);
      const sinOffset = Math.sin(angle) * offset;
      const cosOffset = Math.cos(angle) * offset;

      riverPointsLeft.push([x1 - sinOffset, y1 + cosOffset]);
      riverPointsRight.push([x1 + sinOffset, y1 - cosOffset]);
    }

    const right = this.lineGen(riverPointsRight.reverse());
    let left = this.lineGen(riverPointsLeft);
    left = left.substring(left.indexOf("C"));

    return this.round(right + left, 1);
  };

  const specify = function () {
    const rivers = pack.rivers;
    if (!rivers.length) return;

    for (const river of rivers) {
      river.basin = getBasin(river.i);
      river.name = getName(river.mouth);
      river.type = getType(river);
    }
  };
let Names = this.Names;
  const getName = function (cell) {
    return Names.getCulture(pack.cells.culture[cell]);
  };

  // weighted arrays of river type names
  const riverTypes = {
    main: {
      big: {River: 1},
      small: {Creek: 9, River: 3, Brook: 3, Stream: 1}
    },
    fork: {
      big: {Fork: 1},
      small: {Branch: 1}
    }
  };

  let smallLength = null;
  const getType = ({i, length, parent}) => {
    if (smallLength === null) {
      const threshold = Math.ceil(pack.rivers.length * 0.15);
      smallLength = pack.rivers.map(r => r.length || 0).sort((a, b) => a - b)[threshold];
    }

    const isSmall = length < smallLength;
    const isFork = this.each(3)(i) && parent && parent !== i;
    return this.rw(riverTypes[isFork ? "fork" : "main"][isSmall ? "small" : "big"]);
  };

  const getApproximateLength = points => {
    const length = points.reduce((s, v, i, p) => s + (i ? Math.hypot(v[0] - p[i - 1][0], v[1] - p[i - 1][1]) : 0), 0);
    return this.rn(length, 2);
  };

  // Real mouth width examples: Amazon 6000m, Volga 6000m, Dniepr 3000m, Mississippi 1300m, Themes 900m,
  // Danube 800m, Daugava 600m, Neva 500m, Nile 450m, Don 400m, Wisla 300m, Pripyat 150m, Bug 140m, Muchavets 40m
  const getWidth = offset => this.rn((offset / 1.5) ** 1.8, 2); // mouth width in km

  // remove river and all its tributaries
  const remove = (id) => {
    const cells = pack.cells;
    const riversToRemove = pack.rivers.filter(r => r.i === id || r.parent === id || r.basin === id).map(r => r.i);
    riversToRemove.forEach(r => this.rivers.select("#river" + r).remove());
    cells.r.forEach((r, i) => {
      if (!r || !riversToRemove.includes(r)) return;
      cells.r[i] = 0;
      cells.fl[i] = grid.cells.prec[cells.g[i]];
      cells.conf[i] = 0;
    });
    pack.rivers = pack.rivers.filter(r => !riversToRemove.includes(r.i));
  };

  const getBasin = function (r) {
    const parent = pack.rivers.find(river => river.i === r)?.parent;
    if (!parent || r === parent) return r;
    return getBasin(parent);
  };

  return {generate, alterHeights, resolveDepressions, addMeandering, getRiverPath, specify, getName, getType, getBasin, getWidth, getOffset, getApproximateLength, getRiverPoints, remove};
})();



// on viewbox click event - run function based on target
clicked = (event) => {
  const el = event.target;
  if (!el || !el.parentElement || !el.parentElement.parentElement) return;
  const parent = el.parentElement;
  const grand = parent.parentElement;
  const great = grand.parentElement;
console.log(grand);
console.log(grand.id);

// else if (el.tagName === "tspan" && grand.parentNode.parentNode.id === "labels") editLabel();
  if (grand.id === "burgLabels" || grand.id === "burgIcons"){
    this.selectedBurg = this.pack.burgs[el.dataset.id];
    this.selectedBurg.elevation = this.getHeight(this.pack.cells.h[this.selectedBurg.cell]);
    this.selectedBurg.populationRate = this.populationRate;
    this.selectedBurg.urbanization = this.urbanization;
    const temperature = this.grid.cells.temp[this.pack.cells.g[this.selectedBurg.cell]];
    this.selectedBurg.temperature = this.convertTemperature(temperature);
    this.clickedEmitter.emit({type:'burg',burg:this.selectedBurg})
  } 
}

editBurg(id) {

  const burg = id || d3.event.target.dataset.id;
  this.elSelected = this.burgLabels.select("[data-id='" + burg + "']");
  // this.burgLabels.selectAll("text").call(d3.drag().on("start", dragBurgLabel)).classed("draggable", true);
  // updateBurgValues();

  // const my = id || d3.event.target.tagName === "text" ? "center bottom-20" : "center top+20";
  // const at = id ? "center" : d3.event.target.tagName === "text" ? "top" : "bottom";
  // const of = id ? "svg" : d3.event.target;

  const updateBurgValues = () => {
    const id = +this.elSelected.attr("data-id");
    const b = this.pack.burgs[id];
    const province = this.pack.cells.province[b.cell];
    const provinceName = province ? this.pack.provinces[province].fullName + ", " : "";
    const stateName = this.pack.states[b.state].fullName || this.pack.states[b.state].name;
    document.getElementById("burgProvinceAndState").innerHTML = provinceName + stateName;

    // document.getElementById("burgName").value = b.name;
    // document.getElementById("burgType").value = b.type || "Generic";
    // document.getElementById("burgPopulation").value = rn(b.population * populationRate * urbanization);
    // document.getElementById("burgEditAnchorStyle").style.display = +b.port ? "inline-block" : "none";

    // update list and select culture
    const cultureSelect = document.getElementById("burgCulture");
    // cultureSelect.options.length = 0;
    const cultures = this.pack.cultures.filter(c => !c.removed);
    // cultures.forEach(c => cultureSelect.options.add(new Option(c.name, c.i, false, c.i === b.culture)));

    const temperature = this.grid.cells.temp[this.pack.cells.g[b.cell]];
    document.getElementById("burgTemperature").innerHTML = this.convertTemperature(temperature);
    document.getElementById("burgTemperatureLikeIn").innerHTML = getTemperatureLikeness(temperature);
    document.getElementById("burgElevation").innerHTML = this.getHeight(this.pack.cells.h[b.cell]);

    // toggle features
    if (b.capital) document.getElementById("burgCapital").classList.remove("inactive");
    else document.getElementById("burgCapital").classList.add("inactive");
    if (b.port) document.getElementById("burgPort").classList.remove("inactive");
    else document.getElementById("burgPort").classList.add("inactive");
    if (b.citadel) document.getElementById("burgCitadel").classList.remove("inactive");
    else document.getElementById("burgCitadel").classList.add("inactive");
    if (b.walls) document.getElementById("burgWalls").classList.remove("inactive");
    else document.getElementById("burgWalls").classList.add("inactive");
    if (b.plaza) document.getElementById("burgPlaza").classList.remove("inactive");
    else document.getElementById("burgPlaza").classList.add("inactive");
    if (b.temple) document.getElementById("burgTemple").classList.remove("inactive");
    else document.getElementById("burgTemple").classList.add("inactive");
    if (b.shanty) document.getElementById("burgShanty").classList.remove("inactive");
    else document.getElementById("burgShanty").classList.add("inactive");

    //toggle lock

    // select group
    const group = this.elSelected.node().parentNode.id;
    const select = document.getElementById("burgSelectGroup");
    // select.options.length = 0; // remove all options

    this.burgLabels.selectAll("g").each(function () {
      // select.options.add(new Option(this.id, this.id, false, this.id === group));
    });

    // set emlem image
    const coaID = "burgCOA" + id;
    this.COArenderer.trigger(coaID, b.coa);
    document.getElementById("burgEmblem").setAttribute("href", "#" + coaID);
  }

  // in °C, array from -1 °C; source: https://en.wikipedia.org/wiki/List_of_cities_by_average_temperature
  function getTemperatureLikeness(temperature) {
    if (temperature < -5) return "Yakutsk";
    const cities = [
      "Snag (Yukon)",
      "Yellowknife (Canada)",
      "Okhotsk (Russia)",
      "Fairbanks (Alaska)",
      "Nuuk (Greenland)",
      "Murmansk", // -5 - 0
      "Arkhangelsk",
      "Anchorage",
      "Tromsø",
      "Reykjavik",
      "Riga",
      "Stockholm",
      "Halifax",
      "Prague",
      "Copenhagen",
      "London", // 1 - 10
      "Antwerp",
      "Paris",
      "Milan",
      "Batumi",
      "Rome",
      "Dubrovnik",
      "Lisbon",
      "Barcelona",
      "Marrakesh",
      "Alexandria", // 11 - 20
      "Tegucigalpa",
      "Guangzhou",
      "Rio de Janeiro",
      "Dakar",
      "Miami",
      "Jakarta",
      "Mogadishu",
      "Bangkok",
      "Aden",
      "Khartoum"
    ]; // 21 - 30
    if (temperature > 30) return "Mecca";
    return cities[temperature + 5] || null;
  }

  const changeName = () => {
    const id = +this.elSelected.attr("data-id");
    // this.pack.burgs[id].name = burgName.value;
    // this.elSelected.text(burgName.value);
  }

  function changeType() {
    // const id = +elSelected.attr("data-id");
    // pack.burgs[id].type = this.value;
  }

  function changeCulture() {
    // const id = +elSelected.attr("data-id");
    // pack.burgs[id].culture = +this.value;
  }

  function changePopulation() {
    // const id = +elSelected.attr("data-id");
    // pack.burgs[id].population = rn(burgPopulation.value / populationRate / urbanization, 4);
  }

  const toggleFeature = () => {
    const id = +this.elSelected.attr("data-id");
    const b = this.pack.burgs[id];
    const feature = this.dataset.feature;
    // const turnOn = this.classList.contains("inactive");
    if (feature === "port") this.togglePort(id);
    else if (feature === "capital") this.toggleCapital(id);
    // else b[feature] = +turnOn;
    // if (b[feature]) this.classList.remove("inactive");
    // else if (!b[feature]) this.classList.add("inactive");

    if (b.port) document.getElementById("burgEditAnchorStyle").style.display = "inline-block";
    else document.getElementById("burgEditAnchorStyle").style.display = "none";
  }

  function editBurgLegend() {
    // const id = elSelected.attr("data-id");
    // const name = elSelected.text();
    // editNotes("burg" + id, name);
  }


}

// growStates(){
    
//   statesNeutralNumber.value = parseFloat(statesNeutralNumber.value, 10)+0.05;
//   statesNeutral.value = parseFloat(statesNeutral.value, 10)+0.05;
//   recalculateStates(true);
// }

// shrinkStates(){
//   statesNeutralNumber.value = parseFloat(statesNeutralNumber.value, 10)-0.05;
//   statesNeutral.value = parseFloat(statesNeutral.value, 10)-0.05;
//   recalculateStates(true);
// }

// recalculateStates(must) {
//   // if (!must && !statesAutoChange.checked) return;

//   this.BurgsAndStates.expandStates();
//   this.BurgsAndStates.generateProvinces();
//   if (!layerIsOn("toggleStates")) toggleStates();
//   else drawStates();
//   if (!layerIsOn("toggleBorders")) toggleBorders();
//   else drawBorders();
//   if (layerIsOn("toggleProvinces")) drawProvinces();
//   if (adjustLabels.checked) this.BurgsAndStates.drawStateLabels();
//   refreshStatesEditor();
// }

ngAfterViewInit(): void {
    let sortLines = this.sortLines;
// apply sorting behaviour for lines on Editor header click
document.querySelectorAll(".sortable").forEach(function (e) {
  e.addEventListener("click", function (e) {
    sortLines(this);
  });
});

this.populationRate = 1000;
this.urbanization = 1;

// applyStoredOptions();
this.graphWidth = 1920;
this.graphHeight = 1080; // voronoi graph extention, cannot be changed arter generation
this.svgWidth = this.graphWidth;
this.svgHeight = this.graphHeight; // svg canvas resolution, can be changed
this.landmass.append("rect").attr("x", 0).attr("y", 0).attr("width", this.graphWidth).attr("height", this.graphHeight);
this.oceanPattern.append("rect").attr("fill", "url(#oceanic)").attr("x", 0).attr("y", 0).attr("width", this.graphWidth).attr("height", this.graphHeight);
this.oceanLayers.append("rect").attr("id", "oceanBase").attr("x", 0).attr("y", 0).attr("width", this.graphWidth).attr("height", this.graphHeight);
this.fonts = [
  {family: "Arial"},
  {family: "Times New Roman"},
  {family: "Georgia"},
  {family: "Garamond"},
  {family: "Lucida Sans Unicode"},
  {family: "Courier New"},
  {family: "Verdana"},
  {family: "Impact"},
  {family: "Comic Sans MS"},
  {family: "Papyrus"},
  {
    family: "Almendra SC",
    src: "url(https://fonts.gstatic.com/s/almendrasc/v13/Iure6Yx284eebowr7hbyTaZOrLQ.woff2)",
    unicodeRange: "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD"
  },
  {
    family: "Amatic SC",
    src: "url(https://fonts.gstatic.com/s/amaticsc/v11/TUZ3zwprpvBS1izr_vOMscGKfrUC.woff2)",
    unicodeRange: "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD"
  },
  {
    family: "Architects Daughter",
    src: "url(https://fonts.gstatic.com/s/architectsdaughter/v8/RXTgOOQ9AAtaVOHxx0IUBM3t7GjCYufj5TXV5VnA2p8.woff2)",
    unicodeRange: "U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215"
  },
  {
    family: "Bitter",
    src: "url(https://fonts.gstatic.com/s/bitter/v12/zfs6I-5mjWQ3nxqccMoL2A.woff2)",
    unicodeRange: "U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215"
  },
  {
    family: "Caesar Dressing",
    src: "url(https://fonts.gstatic.com/s/caesardressing/v6/yYLx0hLa3vawqtwdswbotmK4vrRHdrz7.woff2)",
    unicodeRange: "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD"
  },
  {
    family: "Cinzel",
    src: "url(https://fonts.gstatic.com/s/cinzel/v7/zOdksD_UUTk1LJF9z4tURA.woff2)",
    unicodeRange: "U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215"
  },
  {
    family: "Dancing Script",
    src: "url(https://fonts.gstatic.com/s/dancingscript/v9/KGBfwabt0ZRLA5W1ywjowUHdOuSHeh0r6jGTOGdAKHA.woff2)",
    unicodeRange: "U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215"
  },
  {
    family: "Fredericka the Great",
    src: "url(https://fonts.gstatic.com/s/frederickathegreat/v6/9Bt33CxNwt7aOctW2xjbCstzwVKsIBVV--Sjxbc.woff2)",
    unicodeRange: "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD"
  },
  {
    family: "Gloria Hallelujah",
    src: "url(https://fonts.gstatic.com/s/gloriahallelujah/v9/CA1k7SlXcY5kvI81M_R28cNDay8z-hHR7F16xrcXsJw.woff2)",
    unicodeRange: "U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215"
  },
  {
    family: "Great Vibes",
    src: "url(https://fonts.gstatic.com/s/greatvibes/v5/6q1c0ofG6NKsEhAc2eh-3Y4P5ICox8Kq3LLUNMylGO4.woff2)",
    unicodeRange: "U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215"
  },
  {
    family: "IM Fell English",
    src: "url(https://fonts.gstatic.com/s/imfellenglish/v7/xwIisCqGFi8pff-oa9uSVAkYLEKE0CJQa8tfZYc_plY.woff2)",
    unicodeRange: "U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215"
  },
  {
    family: "Kaushan Script",
    src: "url(https://fonts.gstatic.com/s/kaushanscript/v6/qx1LSqts-NtiKcLw4N03IEd0sm1ffa_JvZxsF_BEwQk.woff2)",
    unicodeRange: "U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215"
  },
  {
    family: "MedievalSharp",
    src: "url(https://fonts.gstatic.com/s/medievalsharp/v9/EvOJzAlL3oU5AQl2mP5KdgptMqhwMg.woff2)",
    unicodeRange: "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD"
  },
  {
    family: "Metamorphous",
    src: "url(https://fonts.gstatic.com/s/metamorphous/v7/Wnz8HA03aAXcC39ZEX5y133EOyqs.woff2)",
    unicodeRange: "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD"
  },
  {
    family: "Montez",
    src: "url(https://fonts.gstatic.com/s/montez/v8/aq8el3-0osHIcFK6bXAPkw.woff2)",
    unicodeRange: "U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215"
  },
  {
    family: "Nova Script",
    src: "url(https://fonts.gstatic.com/s/novascript/v10/7Au7p_IpkSWSTWaFWkumvlQKGFw.woff2)",
    unicodeRange: "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD"
  },
  {
    family: "Orbitron",
    src: "url(https://fonts.gstatic.com/s/orbitron/v9/HmnHiRzvcnQr8CjBje6GQvesZW2xOQ-xsNqO47m55DA.woff2)",
    unicodeRange: "U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215"
  },
  {
    family: "Satisfy",
    src: "url(https://fonts.gstatic.com/s/satisfy/v8/2OzALGYfHwQjkPYWELy-cw.woff2)",
    unicodeRange: "U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215"
  },
  {
    family: "Shadows Into Light",
    src: "url(https://fonts.gstatic.com/s/shadowsintolight/v7/clhLqOv7MXn459PTh0gXYFK2TSYBz0eNcHnp4YqE4Ts.woff2)",
    unicodeRange: "U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215"
  },
  {
    family: "Uncial Antiqua",
    src: "url(https://fonts.gstatic.com/s/uncialantiqua/v5/N0bM2S5WOex4OUbESzoESK-i-MfWQZQ.woff2)",
    unicodeRange: "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD"
  },
  {
    family: "Underdog",
    src: "url(https://fonts.gstatic.com/s/underdog/v6/CHygV-jCElj7diMroWSlWV8.woff2)",
    unicodeRange: "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD"
  },
  {
    family: "Yellowtail",
    src: "url(https://fonts.gstatic.com/s/yellowtail/v8/GcIHC9QEwVkrA19LJU1qlPk_vArhqVIZ0nv9q090hN8.woff2)",
    unicodeRange: "U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215"
  }
];

this.modules.editors = true;
this.quickLoad();
  }

  
}
