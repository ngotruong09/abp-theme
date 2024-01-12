import {
  ConfigStateService,
  CONTENT_STRATEGY,
  CurrentCultureDto,
  DomInsertionService,
  DOM_STRATEGY,
  ReplaceableComponentsService,
  StyleContentStrategy,
} from '@abp/ng.core';
import { APP_INITIALIZER, Injector, RendererFactory2 } from '@angular/core';
import { combineLatest, from, Observable } from 'rxjs';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { AccountLayoutComponent } from '../components/account-layout/account-layout.component';
import { ApplicationLayoutComponent } from '../components/application-layout/application-layout.component';
import { EmptyLayoutComponent } from '../components/empty-layout/empty-layout.component';
import { LEPTON_STYLE_ELEMENT_ID } from '../constants/lepton-constants';
import styles from '../constants/styles';
import { eThemeLeptonComponents } from '../enums/components';
import { LayoutStateService } from '../services/layout-state.service';
import { CUSTOM_STYLE } from '../tokens/custom-style.token';

export const LEPTON_THEME_STYLES_PROVIDERS = [
  {
    provide: APP_INITIALIZER,
    useFactory: configureStyles,
    deps: [Injector],
    multi: true,
  },
];

export function configureStyles(injector: Injector) {
  return () => {
    injectStyle(injector);
    initLeptonStyleHandler(injector);
    initLayouts(injector);
  };
}

export function injectStyle(injector: Injector) {
  const rendererFactory = injector.get(RendererFactory2);
  const domInsertion = injector.get(DomInsertionService);

  rendererFactory
    .createRenderer(document.body, null)
    .addClass(document.body, 'abp-application-layout');

  const appStyles: HTMLElement = document.querySelector('link[rel="stylesheet"][href*="styles"]');
  let content: StyleContentStrategy;
  if (appStyles) {
    const domStrategy = DOM_STRATEGY.BeforeElement(appStyles);
    content = new StyleContentStrategy(styles, domStrategy, undefined, {
      id: LEPTON_STYLE_ELEMENT_ID,
    });
  } else {
    content = CONTENT_STRATEGY.AppendStyleToHead(styles, { id: LEPTON_STYLE_ELEMENT_ID });
  }

  domInsertion.insertContent(content);
}

export const getLeptonStyle = (type: number, suffix: string): Observable<string> => {
  const leptonJs = import(
    /* webpackChunkName: "theme.[request]" */
    /* webpackMode: "lazy" */
    `@volo/abp.ng.theme.lepton/dist/global/styles/lepton${type}${suffix}`
  );

  return from(leptonJs).pipe(map(m => m.default));
};

export function initLeptonStyleHandler(injector: Injector) {
  const layoutState = injector.get(LayoutStateService);
  const configStateService = injector.get(ConfigStateService);
  const customStyle = injector.get(CUSTOM_STYLE);

  if (customStyle) {
    removeLeptonLoader();
    return;
  }

  const removeLeptonStyles = (element: HTMLStyleElement, injector: Injector) => {
    const domInsertionService = injector.get(DomInsertionService);
    if (element) domInsertionService.removeContent(element);
  };

  const style$ = configStateService
    .getSetting$('Volo.Abp.LeptonTheme.Style')
    .pipe(map((style: string) => Number((style || 'Style1').replace('Style', ''))));
  const suffix$ = configStateService
    .getDeep$('localization.currentCulture')
    .pipe(map((currentLang: CurrentCultureDto) => (currentLang?.isRightToLeft ? '.rtl' : '')));

  combineLatest(style$, suffix$)
    .pipe(
      distinctUntilChanged((prev, curr) => prev[0] === curr[0] && prev[1] === curr[1]),
      tap(removeLeptonLoader),
      switchMap(([style, suffix]) =>
        loadLeptonStyle(style, suffix, injector).pipe(map(element => ({ element, style }))),
      ),
    )
    .subscribe(result => {
      const styleElement = layoutState.get('styleElement');
      removeLeptonStyles(styleElement, injector);
      layoutState.patch({ style: result.style, styleElement: result.element });
    });
}

export function loadLeptonStyle(
  type: number,
  suffix: string,
  injector: Injector,
): Observable<HTMLStyleElement> {
  const domInsertionService = injector.get(DomInsertionService);
  const leptonStyles: HTMLElement = document.querySelector(
    `style[id="${LEPTON_STYLE_ELEMENT_ID}"]`,
  );

  const domStrategy = leptonStyles
    ? DOM_STRATEGY.BeforeElement(leptonStyles)
    : DOM_STRATEGY.AppendToHead();

  return getLeptonStyle(type, suffix).pipe(
    map(content => {
      const strategy = new StyleContentStrategy(content, domStrategy, undefined, {
        id: `lepton${type}${suffix}`,
      });
      return domInsertionService.insertContent(strategy);
    }),
  );
}

export function removeLeptonLoader() {
  const loader: HTMLElement = document.querySelector('#lp-page-loader');
  if (!loader) return;
  loader.style.background = 'var(--background)';
  setTimeout(() => loader.parentNode?.removeChild(loader), 500);
}

export function initLayouts(injector: Injector) {
  const replaceableComponents = injector.get(ReplaceableComponentsService);

  replaceableComponents.add({
    key: eThemeLeptonComponents.ApplicationLayout,
    component: ApplicationLayoutComponent,
  });
  replaceableComponents.add({
    key: eThemeLeptonComponents.AccountLayout,
    component: AccountLayoutComponent,
  });
  replaceableComponents.add({
    key: eThemeLeptonComponents.EmptyLayout,
    component: EmptyLayoutComponent,
  });
}
