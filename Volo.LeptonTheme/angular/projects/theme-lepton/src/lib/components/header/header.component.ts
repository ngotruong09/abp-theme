import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { eThemeLeptonComponents } from '../../enums/components';
import { LayoutStateService } from '../../services/layout-state.service';

@Component({
  selector: 'abp-header',
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements AfterViewInit {
  state$ = combineLatest(
    this.layoutStateService.get$('isNavbarExpanded'),
    this.layoutStateService.get$('isMenuExpanded'),
    this.layoutStateService.get$('smallScreen'),
    this.layoutStateService.get$('isMenuPlacementTop'),
  ).pipe(
    map(([isNavbarExpanded, isMenuExpanded, smallScreen, isMenuPlacementTop]) => ({
      isNavbarExpanded,
      isMenuExpanded,
      smallScreen,
      isMenuPlacementTop,
    })),
  );

  logoComponentKey = eThemeLeptonComponents.Logo;
  navbarComponentKey = eThemeLeptonComponents.Navbar;
  navbarMobileComponentKey = eThemeLeptonComponents.NavbarMobile;
  sidebarComponentKey = eThemeLeptonComponents.Sidebar;

  @Output()
  mouseMoveContainer = new EventEmitter<Array<ElementRef<HTMLElement>>>();

  @ViewChild('navbarBrand', { read: ElementRef })
  navbarBrandRef: ElementRef<any>;
  constructor(private layoutStateService: LayoutStateService) {}

  ngAfterViewInit() {
    this.mouseMoveContainer.next([this.navbarBrandRef]);
  }

  navbarIconClick(isNavbarExpanded: boolean) {
    this.layoutStateService.patch({ isNavbarExpanded });
  }

  menuIconClick(isMenuExpanded: boolean) {
    this.layoutStateService.patch({ isMenuExpanded });
  }
}
