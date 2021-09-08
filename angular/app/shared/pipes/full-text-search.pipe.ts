import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fullTextSearch'
})
export class FullTextFilterPipe implements PipeTransform {
  //-----
  //  1
  // ----
  //hold a timeout handle on class scope
  private timeoutHandle: number = -1;
    transform(items: any[], filter: string): any {
      if (!items || !filter) {
          return items;
      }
   //-----
    //  2
    // ----

    //clear time out handle on every pipe call
    //so that only handles created earlier than
    // 1000ms would execute
    window.clearTimeout(this.timeoutHandle);


    //-----
    // 3
    // ----

    //create time out handle on every pipe call
    this.timeoutHandle = window.setTimeout(() => {
      console.log("search triggered with value: " + filter);

      return items.filter(item => {
        for (var prop in item) {
          if (Object.prototype.hasOwnProperty.call(item, prop)) {
            if (typeof item[prop] == 'string')
              if(item[prop].toLowerCase().indexOf(filter.toLowerCase()) !== -1) return true;
          }
      }
      });
      //-----
      // 4
      // ----

      //if there is no further typing,
      //then this timeout handle made the way to here:
    }, 1000);
      // filter items array, items which match and return true will be
      // kept, false will be filtered out
  }
}