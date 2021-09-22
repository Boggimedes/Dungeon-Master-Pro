import { Component, ViewContainerRef, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { Router, NavigationEnd } from "@angular/router";
import { filter } from "rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  constructor(private router: Router) {
    console.log("App Construct");

  }

  ngOnInit() {
    console.log("ngOnInit");
    this.subscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => window.scrollTo(0, 0));
  }

  ngOnDestroy() {
    console.log("ngOnDestroy");

    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
