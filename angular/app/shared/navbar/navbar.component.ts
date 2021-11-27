import {
  Component,
  Output,
  EventEmitter,
  OnDestroy,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef,
  Inject,
  Renderer2,
  ViewChild,
  ElementRef,
  ViewChildren,
  QueryList,
  HostListener,
} from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { LayoutService } from "../services/layout.service";
import { Subscription } from "rxjs";
import { ConfigService } from "../services/config.service";
import { DOCUMENT } from "@angular/common";
import { CustomizerService } from "../services/customizer.service";
import { FormControl } from "@angular/forms";
import { Router, NavigationEnd } from "@angular/router";
import { faDragon } from "@fortawesome/free-solid-svg-icons";
import { faFistRaised } from "@fortawesome/free-solid-svg-icons";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faHatWizard } from "@fortawesome/free-solid-svg-icons";
import { faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { faSlidersH } from "@fortawesome/free-solid-svg-icons";
import { faCaretSquareLeft } from "@fortawesome/free-regular-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faMap } from "@fortawesome/free-solid-svg-icons";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { faCaretSquareDown } from "@fortawesome/free-regular-svg-icons";
import { WorldService } from "../../shared/services/world.service";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { AuthService } from "./../../shared/auth/auth.service";

@UntilDestroy()
@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit, AfterViewInit, OnDestroy {
  currentLang = "en";
  selectedLanguageText = "English";
  selectedLanguageFlag = "./assets/img/flags/us.png";
  toggleClass = "ft-maximize";
  placement = "bottom-right";
  logoUrl = "assets/img/logo.png";
  menuPosition = "Side";
  faCaretSquareLeft = faCaretSquareLeft;
  isSmallScreen = false;
  protected innerWidth: any;
  searchOpenClass = "";
  transparentBGClass = "";
  hideSidebar: boolean = true;
  public isCollapsed = true;
  layoutSub: Subscription;
  configSub: Subscription;
  faHatWizard = faHatWizard;
  faFistRaised = faFistRaised;
  faPencilAlt = faPencilAlt;
  faUserFriends = faUserFriends;
  faMap = faMap;
  faCaretSquareDown = faCaretSquareDown;
  faSlidersH = faSlidersH;
  faBookOpen = faBookOpen;
  faGlobe = faGlobe;
  @ViewChild("search") searchElement: ElementRef;
  @ViewChildren("searchResults") searchResults: QueryList<any>;

  @Output()
  toggleHideSidebar = new EventEmitter<Object>();

  @Output()
  seachTextEmpty = new EventEmitter<boolean>();

  listItems = [];
  control = new FormControl();
  faDragon = faDragon;
  public config: any = {};
  public user;
  public regions;
  public worlds;
  public selectedRegion;
  public selectedWorld;

  constructor(
    public translate: TranslateService,
    private layoutService: LayoutService,
    private router: Router,
    private configService: ConfigService,
    private cdr: ChangeDetectorRef,
    private worldService: WorldService,
    private authService: AuthService
  ) {
    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|es|pt|de/) ? browserLang : "en");
    this.config = this.configService.templateConf;
    this.innerWidth = window.innerWidth;

    this.layoutSub = layoutService.toggleSidebar$.subscribe((isShow) => {
      this.hideSidebar = !isShow;
    });
  }
  newWorld = () =>
    this.worldService.createWorld().subscribe((world) => {
      this.worlds.push(world);
    });
  ngOnInit() {
    // this.listItems = LISTITEMS;
    this.worldService.selectedRegion$
      .pipe(untilDestroyed(this))
      .subscribe((region) => {
        console.log("navbar");
        console.log(region);
        this.selectedRegion = region;
      });
    this.worldService.selectedWorld$
      .pipe(untilDestroyed(this))
      .subscribe((world) => {
        this.selectedWorld = world;
        console.log("navbar");
        console.log(world);
        if (this.user) {
          this.regions = this.user.search_list.filter(
            (w) => w.type == "region" && w.world_id == world.id
          );
          this.worlds = this.user.search_list.filter((w) => w.type == "world");
          console.log(this.regions);
          console.log(this.worlds);
          console.log(this.user);
        }
      });

    this.authService.user$.pipe(untilDestroyed(this)).subscribe((user) => {
      this.user = user;
      this.listItems = user.search_list;
      this.worlds = this.user.search_list.filter((w) => w.type == "world");
      if (this.selectedWorld)
        this.regions = this.user.search_list.filter(
          (w) => w.type == "region" && w.world_id == this.selectedWorld.id
        );
      console.log(this.regions);
      console.log(this.worlds);
      console.log(this.user);
    });

    if (this.innerWidth < 1200) {
      this.isSmallScreen = true;
    } else {
      this.isSmallScreen = false;
    }
  }

  ngAfterViewInit() {
    this.configSub = this.configService.templateConf$.subscribe(
      (templateConf) => {
        if (templateConf) {
          this.config = templateConf;
        }
        this.loadLayout();
        this.cdr.markForCheck();
      }
    );
  }

  ngOnDestroy() {
    if (this.layoutSub) {
      this.layoutSub.unsubscribe();
    }
    if (this.configSub) {
      this.configSub.unsubscribe();
    }
  }

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.innerWidth = event.target.innerWidth;
    if (this.innerWidth < 1200) {
      this.isSmallScreen = true;
    } else {
      this.isSmallScreen = false;
    }
  }

  loadLayout() {
    if (
      this.config.layout.menuPosition &&
      this.config.layout.menuPosition.toString().trim() != ""
    ) {
      this.menuPosition = this.config.layout.menuPosition;
    }

    if (this.config.layout.variant === "Light") {
      this.logoUrl = "assets/img/logo-dark.png";
    } else {
      this.logoUrl = "assets/img/logo.png";
    }

    if (this.config.layout.variant === "Transparent") {
      this.transparentBGClass = this.config.layout.sidebar.backgroundColor;
    } else {
      this.transparentBGClass = "";
    }
  }

  onSearchKey(event: any) {
    if (this.searchResults && this.searchResults.length > 0) {
      this.searchResults.first.host.nativeElement.classList.add(
        "first-active-item"
      );
    }

    if (event.target.value === "") {
      this.seachTextEmpty.emit(true);
    } else {
      this.seachTextEmpty.emit(false);
    }
  }

  removeActiveClass() {
    if (this.searchResults && this.searchResults.length > 0) {
      this.searchResults.first.host.nativeElement.classList.remove(
        "first-active-item"
      );
    }
  }

  onEscEvent() {
    this.control.setValue("");
    this.searchOpenClass = "";
    this.seachTextEmpty.emit(true);
  }

  onEnter() {
    if (this.searchResults && this.searchResults.length > 0) {
      let url = this.searchResults.first.url;
      if (url && url != "") {
        this.control.setValue("");
        this.searchOpenClass = "";
        this.router.navigate([url]);
        this.seachTextEmpty.emit(true);
      }
    }
  }

  redirectTo(value) {
    this.router.navigate([value]);
    this.seachTextEmpty.emit(true);
  }

  ChangeLanguage(language: string) {
    this.translate.use(language);

    if (language === "en") {
      this.selectedLanguageText = "English";
      this.selectedLanguageFlag = "./assets/img/flags/us.png";
    } else if (language === "es") {
      this.selectedLanguageText = "Spanish";
      this.selectedLanguageFlag = "./assets/img/flags/es.png";
    } else if (language === "pt") {
      this.selectedLanguageText = "Portuguese";
      this.selectedLanguageFlag = "./assets/img/flags/pt.png";
    } else if (language === "de") {
      this.selectedLanguageText = "German";
      this.selectedLanguageFlag = "./assets/img/flags/de.png";
    }
  }

  ToggleClass() {
    if (this.toggleClass === "ft-maximize") {
      this.toggleClass = "ft-minimize";
    } else {
      this.toggleClass = "ft-maximize";
    }
  }

  toggleSearchOpenClass(display) {
    this.control.setValue("");
    if (display) {
      this.searchOpenClass = "open";
      setTimeout(() => {
        this.searchElement.nativeElement.focus();
      }, 0);
    } else {
      this.searchOpenClass = "";
    }
    this.seachTextEmpty.emit(true);
  }

  toggleNotificationSidebar() {
    this.layoutService.toggleNotificationSidebar(true);
  }

  toggleSidebar() {
    this.layoutService.toggleSidebarSmallScreen(this.hideSidebar);
  }

  setWorld(world) {
    this.worldService.getWorld(world.id);
  }

  setRegion(region) {
    this.worldService.getRegion(region.id);
  }
}
