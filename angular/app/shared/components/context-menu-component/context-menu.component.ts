import { Component, Input, Output, EventEmitter } from "@angular/core";
import { ContextMenuItem } from "../../../models/context-menu-item";

@Component({
  selector: "app-context-menu",
  templateUrl: "./context-menu.component.html",
})
export class ContextMenuComponent {
  @Input()
  contextMenuItems: Array<ContextMenuItem>;

  @Output()
  onContextMenuItemClick: EventEmitter<any> = new EventEmitter<any>();

  onContextMenuClick(event, data): any {
    this.onContextMenuItemClick.emit({
      event,
      data,
    });
  }
}
