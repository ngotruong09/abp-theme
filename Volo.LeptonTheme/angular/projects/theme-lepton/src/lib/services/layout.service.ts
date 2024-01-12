import { ConfigStateService } from '@abp/ng.core';
import { Injectable, Injector, Renderer2, RendererFactory2 } from '@angular/core';
import {
  LeptonThemeSettingsService,
  UpdateLeptonThemeSettingsDto,
} from '@volo/abp.ng.theme.lepton/proxy';
import { filter, tap } from 'rxjs/operators';
import { Layout } from '../models';
import { LayoutStateService } from './layout-state.service';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private renderer: Renderer2;
  private rendererFactory: RendererFactory2;
  private themeSettingsService: LeptonThemeSettingsService;
  private layoutState: LayoutStateService;
  private configState: ConfigStateService;

  layoutConfigKey = 'Volo.Abp.LeptonTheme.Layout';

  constructor(protected injector: Injector) {
    this.rendererFactory = injector.get(RendererFactory2);
    this.themeSettingsService = injector.get(LeptonThemeSettingsService);
    this.layoutState = injector.get(LayoutStateService);
    this.renderer = this.rendererFactory.createRenderer(document.body, null);
    this.configState = injector.get(ConfigStateService);
    this.listenToLeptonSettings();
  }

  listenToLeptonSettings() {
    const leptonSettings$ = this.configState.getSettings$(this.layoutConfigKey);
    leptonSettings$
      .pipe(filter(settings => Object.keys(settings).length > 0))
      .subscribe(settings => {
        // Call order is very important here. Do not change it without testing it first!!
        this.setLayoutBoxed(settings[`${this.layoutConfigKey}.Boxed`] === 'True');
        this.setMenuPlacement(
          Layout.MenuPlacement[settings[`${this.layoutConfigKey}.MenuPlacement`]] ||
            Layout.MenuPlacement.Left,
        );
        this.setMenuStatus(
          Layout.MenuStatus[settings[`${this.layoutConfigKey}.MenuStatus`]] ||
            Layout.MenuStatus.AlwaysOpened,
        );
      });
  }

  fetchThemeSettings() {
    return this.themeSettingsService.get();
  }

  updateThemeSettings(themeSettings: UpdateLeptonThemeSettingsDto) {
    return this.themeSettingsService
      .update(themeSettings)
      .pipe(tap(_ => this.configState.refreshAppState().subscribe()));
  }

  setLayoutBoxed(boxedLayout: boolean) {
    if (this.layoutState.get('boxedLayout') === boxedLayout) {
      return;
    }
    if (boxedLayout) {
      this.renderer.addClass(document.body, 'lp-boxed');
    } else {
      this.renderer.removeClass(document.body, 'lp-boxed');
    }
    this.layoutState.patch({ boxedLayout });
  }

  setMenuStatus(menuStatus: Layout.MenuStatus) {
    if (
      this.layoutState.get('menuStatus') === menuStatus &&
      this.layoutState.get('menuPlacement') !== Layout.MenuPlacement.Left
    ) {
      return;
    }
    this.addMenuStatusClasses(menuStatus);
    this.layoutState.patch({
      menuStatus,
      isSidebarCollapsed: menuStatus === Layout.MenuStatus.OpenOnHover,
    });
  }

  setMenuPlacement(menuPlacement: Layout.MenuPlacement) {
    if (this.layoutState.get('menuPlacement') === menuPlacement) {
      return;
    }
    this.addMenuPlacementClasses(menuPlacement);
    this.layoutState.patch({
      menuPlacement,
      isMenuPlacementTop: menuPlacement === Layout.MenuPlacement.Top,
    });
  }

  onClickMenuIcon(value: boolean) {
    this.layoutState.patch({ isSidebarCollapsed: !value });
    if (value) {
      this.setMenuStatus(Layout.MenuStatus.AlwaysOpened);
    } else {
      this.setMenuStatus(Layout.MenuStatus.OpenOnHover);
    }
  }

  addMenuPlacementClasses(menuPlacement: Layout.MenuPlacement) {
    if (menuPlacement === Layout.MenuPlacement.Top) {
      ['lp-opened-sidebar', 'lp-body-fixed', 'lp-closed'].forEach(lpClass =>
        this.renderer.removeClass(document.body, lpClass),
      );
      this.renderer.addClass(document.body, 'lp-topmenu');
    } else {
      this.renderer.removeClass(document.body, 'lp-topmenu');
      this.renderer.addClass(document.body, 'lp-opened-sidebar');
    }
  }

  addMenuStatusClasses(menuStatus: Layout.MenuStatus) {
    if (menuStatus) {
      this.renderer.removeClass(document.body, 'lp-body-fixed');
      this.renderer.removeClass(document.body, 'lp-opened-sidebar');
      this.renderer.addClass(document.body, 'lp-closed');
    } else {
      this.renderer.addClass(document.body, 'lp-body-fixed');
      this.renderer.addClass(document.body, 'lp-opened-sidebar');
      this.renderer.removeClass(document.body, 'lp-closed');
    }
  }

  addSidebarClasses(mouseOnSidebar) {
    if (mouseOnSidebar) {
      if (document.body.classList.contains('lp-closed')) {
        this.renderer.addClass(document.body, 'lp-extended');
      }
    } else {
      this.renderer.removeClass(document.body, 'lp-extended');
    }
  }

  changeMenuPlacementByScreenSize() {
    const isMenuPlacementTop = this.layoutState.get('isMenuPlacementTop');
    const smallScreen = window.innerWidth < 992;
    if (smallScreen) {
      this.addMenuPlacementClasses(Layout.MenuPlacement.Left);
    } else if (!smallScreen && isMenuPlacementTop) {
      this.addMenuPlacementClasses(Layout.MenuPlacement.Top);
    }
    this.layoutState.patch({ smallScreen });
  }
}
