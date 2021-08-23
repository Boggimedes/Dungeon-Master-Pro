import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { subscribeOn } from 'rxjs/operators';
import { WorldService } from '../../shared/services/world.service';
import * as Handsontable from 'handsontable';

@Component({
  selector: 'app-world-board',
  templateUrl: './world-board.component.html',
  styleUrls: ['./world-board.component.scss']
})
export class WorldBoardComponent implements OnInit {

  ageYears = 20;
  private worldSubscription:        Subscription;
  public selectedRegion;
  public professions;
  public races;
  public descriptives;
  public regions;
constructor(private worldService: WorldService) { }

ageRegion = (region, years, index) => {
  let data = {
      "region": region,
      "years": years
  };
  this.regions[index].loading = true;
  this.worldService.ageRegion(data).subscribe(() => this.regions[index].loading = false);
}
seedRegion = (region, index) => {
  this.regions[index].loading = true;
  this.worldService.seedRegion(region).subscribe(() => this.regions[index].loading = false);
  }

  updateRegion = (region, index) => {
      this.regions[index].loading = true;
      this.worldService.updateRegion(region).subscribe(() => this.regions[index].loading = false);
      }

  clearRegion = (region, index) => {
      this.regions[index].loading = true;
      this.worldService.updateRegion(region).subscribe(() => this.regions[index].loading = false);
  }

  deleteRegion = (region_id, index) => {
      if(!confirm("Are you sure? This cannot be undone!\nClick 'OK' to delete.")) return;
        let data = {
            "value": region_id,
            "field":"id"
        };
        this.regions[index].loading = true;
        this.worldService.deleteRegion(region_id).subscribe(() => this.regions[index].loading = false);
    }
    deleteWorld = (world_id) => {
      if(!confirm("Are you sure? This cannot be undone!\nClick 'OK' to delete.")) return;
        let data = {
            "value": world_id,
            "field":"id"
        };
        this.worldService.deleteWorld(data)
      }    
      ngOnInit(): void {
          this.worldService.getWorldData({world: 1});
          this.worldSubscription = this.worldService.worldData$.subscribe(
          function(response) {
              this.regions = response.regions;
              // if (this.selectedRegion) this.selectedRegion = this.regions[0].id;
              this.professions = response.data.professions;
              this.races = response.data.races;
              this.descriptives = response.data.descriptives;
          });
}

}



      // this.descriptivesSettings = angular.copy(settings);
      // this.descriptivesSettings.onAfterChange = function(changes,source){
      //     if(source == "idUpdate") return;
      //     updateWorld("descriptives",changes,hotRegisterer.getInstance('descriptives'));
      // };
      // this.descriptivesSettings.onBeforeRemoveRow = function(index,amount,rowsArray) {
      //         console.log(rowsArray);
      //     deleteWorld("descriptives",rowsArray,hotRegisterer.getInstance('descriptives'));
      // };

      // this.namesSettings = angular.copy(settings);
      // this.namesSettings.onAfterChange = function(changes,source){
      //     if(source == "idUpdate") return;
      //     updateWorld("names",changes,hotRegisterer.getInstance('names'));
      // };
      // this.namesSettings.onBeforeRemoveRow = function(index,amount,rowsArray) {
      //         console.log(rowsArray);
      //     deleteWorld("names",rowsArray,hotRegisterer.getInstance('names'));
      // };

      // this.professionSettings = angular.copy(settings);
      // this.professionSettings.onAfterChange = function(changes,source){
      //     if(source == "idUpdate") return;
      //     updateWorld("profession",changes,hotRegisterer.getInstance('professions'));
      // };
      // this.professionSettings.onBeforeRemoveRow = function(index,amount,rowsArray) {
      //         console.log(rowsArray);
      //     deleteWorld("profession",rowsArray,hotRegisterer.getInstance('professions'));
      // };

      // this.raceSettings = angular.copy(settings);
      // this.raceSettings.onAfterChange = function(changes,source){
      //     if(source == "idUpdate") return;
      //     updateWorld("race",changes,hotRegisterer.getInstance('races'));
      // };
      // this.raceSettings.onBeforeRemoveRow = function(index,amount,rowsArray) {
      //         console.log(rowsArray);
      //     deleteWorld("race",rowsArray,hotRegisterer.getInstance('races'));
      // };



//     }
// ])

