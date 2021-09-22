// import { ConnectedOverlayPositionChange } from "@angular/cdk/overlay";
import { DOCUMENT } from "@angular/common";
import {
  AfterViewInit,
  ContentChild,
  Directive,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  HostListener,
} from "@angular/core";
import { fromEvent, Subscription } from "rxjs";
import { max, takeUntil } from "rxjs/operators";
import { FreeDraggingHandleDirective } from "./free-dragging-handle.directive";
import { Output, EventEmitter } from "@angular/core";

@Directive({
  selector: "[appFreeDragging]",
})
export class FreeDraggingDirective implements AfterViewInit, OnDestroy {
  private element: HTMLElement;
  private minBoundX;
  private minBoundY;
  private maxBoundX;
  private maxBoundY;
  private originX: number = 0;
  private originY: number = 0;
  public mapArray = [0.3, 0.6, 1, 2, 3, 5, 7.5, 10, 15, 20];
  clickTimeout;
  private subscriptions: Subscription[] = [];
  @ContentChild(FreeDraggingHandleDirective)
  handle: FreeDraggingHandleDirective;

  handleElement: HTMLElement;
  _scale = 1;
  _level = 1;
  private readonly DEFAULT_DRAGGING_BOUNDARY_QUERY = "body";
  @Input() boundaryQuery = this.DEFAULT_DRAGGING_BOUNDARY_QUERY;
  @Input() frameLocked = true;

  @Input()
  set scale(value) {
    console.log(value);
    if(value > 0) {
      this._level = Math.max(Math.min(this.mapArray.length - 1, this._level+1),0);
    } else {
      this._level = Math.max(Math.min(this.mapArray.length - 1, this._level-1),0);
    }
    console.log(this._level);
    this._scale = this.mapArray[this._level];
    console.log(this._scale);
    console.log(this.minBoundX);
    console.log(this.minBoundY);
    this.minBoundX =
      this.draggingBoundaryElement.offsetWidth -
      150 -
      this.element.offsetLeft -
      this.element.scrollWidth * this.scale;

    if (this.frameLocked)
      this.minBoundY =
        this.draggingBoundaryElement.offsetHeight -
        150 -
        this.element.offsetTop;
    else
      this.minBoundY =
        this.draggingBoundaryElement.offsetHeight -
        150 -
        this.element.offsetTop -
        this.element.scrollHeight * this.scale;
    this.currentX = this.boundX(this.currentX);
    this.currentY = this.boundY(this.currentY);
    console.log(this.currentX);
    console.log(this.currentY);
   this.element.style.transformOrigin = this.originX + "px " + this.originY + "px";
   console.log(this.element.style.transformOrigin);
    this.element.style.transform =
      "translate3d(" +
      this.currentX +
      "px, " +
      this.currentY +
      "px, 0) scale(" +
      this.scale +
      ")";
  }
  get scale() {
    return this._scale;
  }
  draggingBoundaryElement: HTMLElement | HTMLBodyElement;
  private currentX = 0;
  private currentY = 0;
  constructor(
    private elementRef: ElementRef,
    @Inject(DOCUMENT) private document: any
  ) {}
  ngAfterViewInit(): void {
    this.draggingBoundaryElement = (this.document as Document).querySelector(
      this.boundaryQuery
    );
    if (!this.draggingBoundaryElement) {
      throw new Error(
        "Couldn't find any element with query: " + this.boundaryQuery
      );
    } else {
      this.element = this.elementRef.nativeElement as HTMLElement;
      this.handleElement =
        this.handle?.elementRef?.nativeElement || this.element;
      this.initDrag();
    }
    // fromEvent(this.element, "click").subscribe(($event: any) => {
    //   let nextZoom = this.nextZoom(this.scale);

    //   if (this.clickTimeout) {
    //     let cX = this.draggingBoundaryElement.offsetWidth / 2 - $event.pageX;
    //     let cY = this.draggingBoundaryElement.offsetHeight / 2 - $event.pageY;
    //     this.currentX = ((this.currentX + cX) / this.scale) * nextZoom;
    //     this.currentY = ((this.currentY + cY) / this.scale) * nextZoom;
    //     this.currentX = this.boundX(this.currentX);
    //     this.currentY = this.boundY(this.currentY);
    //     // elem.style.transformOrigin = ($event.pageX - this.currentX) + 'px ' + ($event.pageY - this.currentY) + 'px';
    //     // this.element.style.transform =
    //     // "translate3d(" + this.currentX + "px, " + this.currentY + "px, 0) "; //scale(" + this.scale + ")";
    //     // this.zoomLevel = this.zoomLevel + 1;
    //     this.scale = nextZoom;
    //     clearTimeout(this.clickTimeout);
    //     this.clickTimeout = null;
    //   } else {
    //     this.clickTimeout = setTimeout(() => {
    //       this.clickTimeout = null;
    //     }, 300);
    //   }
    // });

    fromEvent(this.element, "mousemove").subscribe(($event: any) => {
      this.originX = $event.offsetX;
      this.originY = $event.offsetY;
    });
  }
  initDrag(): void {
    const dragStart$ = fromEvent<MouseEvent>(this.handleElement, "mousedown");
    const dragEnd$ = fromEvent<MouseEvent>(this.document, "mouseup");
    const drag$ = fromEvent<MouseEvent>(this.document, "mousemove").pipe(
      takeUntil(dragEnd$)
    );

    let initialX: number,
      initialY: number,
      currentX = this.currentX,
      currentY = this.currentY;

    let dragSub: Subscription;

    this.minBoundX =
      150 - this.element.offsetLeft - this.element.scrollWidth * this.scale;
    if (this.frameLocked) this.minBoundY = 20 - this.element.offsetTop;
    else
      this.minBoundY =
        50 + this.element.offsetTop - this.element.scrollHeight * this.scale;

    if (this.draggingBoundaryElement.offsetWidth > this.element.scrollWidth) {
      this.maxBoundX =
        this.draggingBoundaryElement.offsetWidth - this.element.scrollWidth;
    } else this.maxBoundX = this.draggingBoundaryElement.offsetWidth / 2;

    if (this.draggingBoundaryElement.offsetHeight > this.element.scrollHeight) {
      this.maxBoundY =
        this.draggingBoundaryElement.offsetHeight - this.element.scrollHeight;
    } else this.maxBoundY = this.draggingBoundaryElement.offsetHeight / 2;

  const dragStartSub = dragStart$.subscribe((event: MouseEvent) => {
      initialX = event.clientX - this.currentX;
      initialY = event.clientY - this.currentY;
      this.element.classList.add("free-dragging");
      console.log([this.minBoundX,this.draggingBoundaryElement.offsetWidth,this.element.offsetLeft, this.element.scrollWidth]);
      console.log([this.minBoundY,this.draggingBoundaryElement.offsetHeight,this.element.offsetTop, this.element.scrollHeight]);
  
      dragSub = drag$.subscribe((event: MouseEvent) => {
        event.preventDefault();

        const x = event.clientX - initialX;
        const y = event.clientY - initialY;

        currentX = this.boundX(x);
        currentY = this.boundY(y);
        this.currentX = currentX;
        this.currentY = currentY;
        console.log([x,this.currentX]);
        console.log([y,this.currentY]);

        this.element.style.transform =
          "translate3d(" +
          currentX +
          "px, " +
          currentY +
          "px, 0) scale(" +
          this.scale +
          ")";
      });
    });

    const dragEndSub = dragEnd$.subscribe(() => {
      initialX = currentX;
      initialY = currentY;
      this.element.classList.remove("free-dragging");
      if (dragSub) {
        dragSub.unsubscribe();
      }
    });

    this.subscriptions.push.apply(this.subscriptions, [
      dragStartSub,
      dragSub,
      dragEndSub,
    ]);
  }
  boundX = (x): number => {
    this.minBoundX = Math.min(this.minBoundX, 0);
    return Math.max(this.minBoundX, Math.min(x, this.maxBoundX));
  };
  boundY = (y): number => {
    this.minBoundY = Math.min(this.minBoundY, 0);
    return Math.max(this.minBoundY, Math.min(y, this.maxBoundY));
  };
  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s?.unsubscribe());
  }
  // nextZoom = (current) => {
  //   let index = this.mapArray.indexOf(current);
  //   return this.mapArray[Math.min(this.mapArray.length - 1, index + 1)];
  // };
}
