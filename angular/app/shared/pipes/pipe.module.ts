import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";

import { FilterPipe } from './filter.pipe';
import { SearchPipe } from './search.pipe';
import { ShortNamePipe } from './short-name.pipe';
import { OrderByPipe } from './order-by.pipe';

@NgModule({
  declarations:[FilterPipe, SearchPipe, ShortNamePipe, OrderByPipe],
  imports:[CommonModule],
  exports:[FilterPipe, SearchPipe, ShortNamePipe, OrderByPipe]
})

export class PipeModule{}
