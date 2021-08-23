import { Component, OnInit } from '@angular/core';
import { WorldService } from '../../shared/services/world.service'

@Component({
  selector: 'app-edit-worlds',
  templateUrl: './edit-worlds.component.html',
  styleUrls: ['./edit-worlds.component.scss']
})
export class EditWorldsComponent implements OnInit {
  worldCollapsed;
  selectedWorld;
  worldSubscription;
  selectedProfession;
  selectedDescriptive;
  selectedRace;

  constructor(private worldService: WorldService) { }

  newWorld = () => {

  }

  newRegion = () => {
    
  }

  ngOnInit(): void {
    this.worldSubscription = this.worldService.worldData$.subscribe((world) => {
      this.selectedWorld = world;
    });
    this.worldService.getWorld(1);
  }

}
