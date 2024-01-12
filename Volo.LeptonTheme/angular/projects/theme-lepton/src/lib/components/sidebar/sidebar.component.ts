import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { eThemeLeptonComponents } from '../../enums';
import { LayoutStateService } from '../../services/layout-state.service';
import { SubscriptionService } from '@abp/ng.core';
import { LayoutService } from '../../services/layout.service';
import { fromEvent } from 'rxjs';
import { debounceTime, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'abp-sidebar',
  templateUrl: './sidebar.component.html',
  providers: [SubscriptionService],
  encapsulation: ViewEncapsulation.None,
})
export class SidebarComponent implements AfterViewInit {
  @Input()
  isMenuExpanded: boolean;
  @Input()
  smallScreen: boolean;
  @Input()
  isMenuPlacementTop: boolean;

  @Output()
  mouseMoveContainer = new EventEmitter<Array<ElementRef<HTMLElement>>>();

  routesComponentKey = eThemeLeptonComponents.Routes;
  mouseOnSidebar$ = this.layoutStateService.get$('mouseOnSidebar');
  isSidebarCollapsed$ = this.layoutStateService.get$('isSidebarCollapsed');

  @ViewChild('navbarSidebar', { read: ElementRef })
  navbarSidebarRef: ElementRef<HTMLElement>;

  constructor(private layoutStateService: LayoutStateService, private layout: LayoutService) {}

  onClickLink() {
    if (this.smallScreen) {
      this.layoutStateService.patch({ isMenuExpanded: false, isNavbarExpanded: false });
    }
  }
  onClickMenuIcon(isSidebarCollapsed: boolean) {
    this.layout.onClickMenuIcon(isSidebarCollapsed);
  }

  ngAfterViewInit() {
    this.mouseMoveContainer.next([this.navbarSidebarRef]);
    this.listenResize();
  }

  listenResize() {
    const resize$ = fromEvent(window, 'resize').pipe(debounceTime(150));
    resize$.pipe(startWith({})).subscribe(() => this.layout.changeMenuPlacementByScreenSize());
  }
}
