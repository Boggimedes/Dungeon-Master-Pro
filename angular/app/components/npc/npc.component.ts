import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-npc",
  templateUrl: "./npc.component.html",
  styleUrls: ["./npc.component.scss"],
})
export class NpcComponent implements OnInit {
  selectedRow;
  region;
  selectedNpc;
  currentRegion;
  constructor() {}
  setClickedRow = (index, table, npc) => {
    //function that sets the value of selectedRow to current index
    this.selectedRow = []; //reset all tables
    this.selectedRow[table] = index; //set selected row
    var objectData = {
      region: this.region,
      where: [
        {
          id: npc,
        },
      ],
    };
  };
  regionInit = (region) => {
    if (region.id == this.selectedNpc.region) this.currentRegion = region;
  };
  generationChange = function () {
    if (this.selectedNpc.generation == "") this.selectedNpc.generation = "NULL";
  };

  getAspects = function () {
    var gender = this.selectedNpc.gender.substring(0, 1).toUpperCase();
    var pageData = {
      region: this.region,
      gender: gender,
    };
  };
  newNpc = function () {
    this.extended = true;
    this.spouse = [];
    this.mother = [];
    this.father = [];
    this.children = [];
    this.selectedNpc = {
      firstName: "",
      lastName: "",
      race: {},
      age: "",
      gender: "",
      alive: "1",
      married: "0",
      spouse: "",
      children: [],
      mother: "",
      father: "",
      friends: "",
      enemies: "",
      mannerisms: "",
      lineage: "",
      quirks: "",
      abilities: "",
      features: {
        Special: "",
        "Face Shape": "",
        "Skin Complexion": "",
        "Skin Color": "",
        "Hair Description": "",
        "Hair Color": "",
        "Eye Description": "",
        "Eye Color": "",
        Clothing: "",
        "Body Type": "",
      },
      region: this.region,
      generation: "NULL",
      profession: "",
      notes: "",
      birthYear: "NULL",
      residentCity: "",
    };
  };
  updateNpc = function (npc) {
    if (npc.birthYear == "" || npc.birthYear == null) npc.birthYear = "NULL";
    if (npc.generation == "" || npc.generation == null) npc.generation = "NULL";
    var pageData = {
      region: this.region,
      npc: npc,
    };
    // npcFactory.updateNpc(pageData)
  };
  npcInfo = function (npc) {
    if (typeof this.npcs == "undefined" || typeof npc == "undefined") return;
    npc = this.npcs.all[npc];
    return (
      (npc.alive == "1" ? "Alive" : "Dead") +
      "\nRace: " +
      npc.race.name +
      "\nAge: " +
      npc.age
    );
  };
  setGrouping = function (grouping) {
    this.cGroup = grouping;
  };
  setRegion = function (region) {
    this.currentRegion = region;
    this.npcs = {};
    this.raceGroups = [];
    this.lineageGroups = [];
    this.profGroups = [];
    this.cities = [];
    var objectData = {
      region: region.id,
    };
  };

  ngOnInit(): void {
    // npcFactory.getNpc(objectData).then(
    //     function(response) {
    //         this.selectedNpc = response.data;
    //         this.spouse = this.npcs.all[this.selectedNpc.spouse];
    //         this.mother = this.npcs.all[this.selectedNpc.mother];
    //         this.father = this.npcs.all[this.selectedNpc.father];
    //         this.children = this.selectedNpc.children;
    //     },
    //     function(err) {
    //     if(err.status == 401){console.log(28);this.Ui.turnOn('login');}
    //         console.log(err);
    //     });
    //     npcFactory.getWorld().then(
    //         function(response) {
    //             this.regions = response.data.regions;
    //             this.professions = response.data.professions;
    //             this.races = response.data.races;
    //             this.descriptives = response.data.descriptives;
    //             this.descriptives
    //             this.lineage = this.descriptives.filter(function(value) {
    //                   if (value.type == "Lineage") return true;
    //                   return false;
    //               });
    //             for (var i = 0; i < this.lineage.length; i++) {
    //                 this.lineage[i]=this.lineage[i].text;
    //             }
    //         },
    //         function(err) {
    //             if(err.status == 401){console.log(29);this.Ui.turnOn('login');}
    //             console.log(err);
    //         });
    //         npcFactory.getAspects(pageData).then(function(response) {
    //             if (this.bodyLock != true) this.selectedNpc.features['Body Type'] = response.data['Body Type'];
    //             if (this.bodyLock != true) this.selectedNpc.features['Body Description'] = response.data['Body Description'];
    //             if (this.clothingLock != true) this.selectedNpc.features['Clothing'] = response.data['Clothing'];
    //             if (this.eyeCLock != true) this.selectedNpc.features['Eye Color'] = response.data['Eye Color'];
    //             if (this.eyeDLock != true) this.selectedNpc.features['Eye Description'] = response.data['Eye Description'];
    //             if (this.faceLock != true) this.selectedNpc.features['Face Shape'] = response.data['Face Shape'];
    //             if (this.hairCLock != true) this.selectedNpc.features['Hair Color'] = response.data['Hair Color'];
    //             if (this.hairDLock != true) this.selectedNpc.features['Hair Description'] = response.data['Hair Description'];
    //             if (this.skinCLock != true) this.selectedNpc.features['Skin Color'] = response.data['Skin Color'];
    //             if (this.skinDLock != true) this.selectedNpc.features['Skin Complexion'] = response.data['Skin Complexion'];
    //             if (this.specialLock != true) this.selectedNpc.features['Special'] = response.data['Special'];
    //             if (this.lineageLock != true) this.selectedNpc.lineage = response.data['Lineage'];
    //             if (this.mannerLock != true) this.selectedNpc.mannerisms = response.data['Manner'];
    //             if (this.quirkLock != true) this.selectedNpc.quirks = response.data['Quirk'];
    //         },
    //         function(err) {
    //         if(err.status == 401){console.log(30);this.Ui.turnOn('login');}
    //             console.log(err);
    //         });
    //         npcFactory.getNpcs(objectData).then(
    //             function(response) {
    //                 this.npcs.all = response.data;
    //                 this.npcs.alive = this.npcs.all.filter(function(value) {
    //                     if (value.alive == "1") return true;
    //                     return false;
    //                 });
    //                 this.npcs.alive = orderBy(this.npcs.alive, ['age', 'name'], false);
    //                 for (var i in this.npcs.all) {
    //                     this.npcs.all[this.npcs.all[i].id] = this.npcs.all[i];
    //                     if(this.npcs.all[i].alive=="1"){
    //                         if(this.raceGroups.indexOf(this.npcs.all[i].race)==-1) this.raceGroups.push(this.npcs.all[i].race);
    //                         if(this.lineageGroups.indexOf(this.npcs.all[i].lineage)==-1) this.lineageGroups.push(this.npcs.all[i].lineage);
    //                         if(this.profGroups.indexOf(this.npcs.all[i].profession)==-1 && this.npcs.all[i].profession.indexOf("Retired")==-1) this.profGroups.push(this.npcs.all[i].profession);
    //                         if(this.cities.indexOf(this.npcs.all[i].residentCity)==-1) this.cities.push(this.npcs.all[i].residentCity);
    //                     }
    //                 }
    //                 this.raceGroups.sort();
    //                 this.lineageGroups.sort();
    //                 this.profGroups.sort();
    //                 this.cities.sort();
    //                 this.cGroups = {"Age":{
    //                           "field":"ageGroup",
    //                           "groups":['Youth','Adult','MiddleAged','Old'],
    //                           "headers":['Youth','Adult','Middle Aged','Old Age & Venerable']},
    //                       "Profession":{
    //                           "field":"profession",
    //                           "groups":this.profGroups,
    //                           "headers":this.profGroups
    //                       },
    //                       "City":{
    //                           "field":"residentCity",
    //                           "groups":this.cities,
    //                           "headers":this.cities
    //                       },
    //                       "Race":{
    //                           "field":"race",
    //                           "groups":this.raceGroups,
    //                           "headers":this.raceGroups
    //                       },
    //                       "Lineage":{
    //                           "field":"lineage",
    //                           "groups":this.lineageGroups,
    //                           "headers":this.lineageGroups
    //                       }};
    //             },
    //             function(err) {
    //               if(err.status == 401){console.log(32);this.Ui.turnOn('login');}
    //                 console.log(err);
    //             });
  }
}
