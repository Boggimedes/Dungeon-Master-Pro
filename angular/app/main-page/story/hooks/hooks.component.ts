import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-hooks",
  templateUrl: "./hooks.component.html",
  styleUrls: ["./hooks.component.scss"],
})
export class StoryHooksComponent implements OnInit {
  public hooks = [
    "Blood",
    "Things Aren't Right",
    "Body Changes",
    "Mind Changes",
    "The Hunt",
    "Monsters",
    "Mysterious Disappearances",
    "The Gift",
    "Mistaken Identity",
    "Mis-Deliveries & Documents",
    "Random Violence",
    "A Prophecy",
    "Disasters and Catastrophes",
    "Job Offer",
    "The Mysterious Friend",
    "A Sudden Trip",
  ];
  @Output() hookEmitter: EventEmitter<any> = new EventEmitter();
  @Input()
  public selectedHook = null;
  constructor() {}
  selectHook(hook = "Random") {
    if (hook === "Random") {
      hook = this.ra(this.hooks);
    }
    this.hookEmitter.emit(hook);
    this.selectedHook = hook;
  }

  ngOnInit(): void {}
  // random number in a range
  rand(x = 1, y) {
    return x + (crypto.getRandomValues(new Uint32Array(1))[0] % (y - x + 1));
  }

  // return random value from the array
  ra(array) {
    return array[this.rand(0, array.length - 1)];
  }
}
