import { APP_INIT_ERROR_HANDLERS, CoreModule } from '@abp/ng.core';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import {
  NgxValidateCoreModule,
  VALIDATION_ERROR_TEMPLATE,
  VALIDATION_INVALID_CLASSES,
  VALIDATION_TARGET_SELECTOR,
} from '@ngx-validate/core';
import { PROFILE_PICTURE_PROVIDERS } from '@volo/abp.commercial.ng.ui/config';
import { AccountLayoutComponent } from './components/account-layout/account-layout.component';
import { AccountLogoComponent } from './components/account-layout/account-logo/account-logo.component';
import { AuthWrapperComponent } from './components/account-layout/auth-wrapper/auth-wrapper.component';
import { TenantBoxComponent } from './components/account-layout/tenant-box/tenant-box.component';
import { ApplicationLayoutComponent } from './components/application-layout/application-layout.component';
import { CurrentUserImageComponent } from './components/current-user-image/current-user-image.component';
import { EmptyLayoutComponent } from './components/empty-layout/empty-layout.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HttpErrorComponent } from './components/http-error/http-error.component';
import { LogoComponent } from './components/logo/logo.component';
import { CurrentUserComponent } from './components/nav-items/current-user.component';
import { FullScreenComponent } from './components/nav-items/full-screen.component';
import { LanguagesComponent } from './components/nav-items/languages.component';
import { NavItemsComponent } from './components/nav-items/nav-items.component';
import { NavbarMobileComponent } from './components/navbar-mobile/navbar-mobile.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PageAlertContainerComponent } from './components/page-alert-container/page-alert-container.component';
import { RoutesComponent } from './components/routes/routes.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ValidationErrorComponent } from './components/validation-error/validation-error.component';
import { ThemeLepton } from './models/theme-lepton';
import { LEPTON_THEME_NAV_ITEM_PROVIDERS } from './providers/nav-item.provider';
import { LEPTON_THEME_SETTING_TAB_PROVIDERS } from './providers/setting-tab.provider';
import { LEPTON_THEME_STYLES_PROVIDERS, removeLeptonLoader } from './providers/styles.provider';
import { LEPTON_THEME_USER_MENU_PROVIDERS } from './providers/user-menu.provider';
import { CUSTOM_STYLE } from './tokens/custom-style.token';
import { LEPTON_THEME_FEATURES_PROVIDERS } from './tokens/features.token';
import { CONTENT_AFTER_ROUTES, CONTENT_BEFORE_ROUTES } from './tokens/routes-content.token';

export const LAYOUTS = [ApplicationLayoutComponent, AccountLayoutComponent, EmptyLayoutComponent];

const COMPONENTS = [
  SettingsComponent,
  ValidationErrorComponent,
  HttpErrorComponent,
  LogoComponent,
  RoutesComponent,
  NavItemsComponent,
  CurrentUserImageComponent,
  LanguagesComponent,
  CurrentUserComponent,
  FullScreenComponent,
  NavbarComponent,
  NavbarMobileComponent,
  HeaderComponent,
  FooterComponent,
  SidebarComponent,
  PageAlertContainerComponent,
  AuthWrapperComponent,
  TenantBoxComponent,
  AccountLogoComponent,
];

@NgModule({
  declarations: [...LAYOUTS, ...COMPONENTS],
  exports: [...LAYOUTS, ...COMPONENTS],
  imports: [CoreModule, ThemeSharedModule, NgbDropdownModule, NgxValidateCoreModule],
})
export class BaseThemeLeptonModule {}

@NgModule({
  exports: [BaseThemeLeptonModule],
  imports: [BaseThemeLeptonModule],
})
export class ThemeLeptonModule {
  static forRoot(options = {} as ThemeLepton.Options): ModuleWithProviders<ThemeLeptonModule> {
    return {
      ngModule: ThemeLeptonModule,
      providers: [
        LEPTON_THEME_NAV_ITEM_PROVIDERS,
        LEPTON_THEME_USER_MENU_PROVIDERS,
        LEPTON_THEME_STYLES_PROVIDERS,
        LEPTON_THEME_SETTING_TAB_PROVIDERS,
        PROFILE_PICTURE_PROVIDERS,
        LEPTON_THEME_FEATURES_PROVIDERS,
        {
          provide: VALIDATION_ERROR_TEMPLATE,
          useValue: ValidationErrorComponent,
        },
        {
          provide: VALIDATION_INVALID_CLASSES,
          useValue: 'input-validation-error',
        },
        {
          provide: VALIDATION_TARGET_SELECTOR,
          useValue: '.form-control',
        },
        {
          provide: CONTENT_AFTER_ROUTES,
          useValue: options.contentAfterRoutes || [],
        },
        {
          provide: CONTENT_BEFORE_ROUTES,
          useValue: options.contentBeforeRoutes || [],
        },
        {
          provide: CUSTOM_STYLE,
          useValue: options.customStyle || false,
        },
        {
          provide: APP_INIT_ERROR_HANDLERS,
          useValue: removeLeptonLoader,
          multi: true,
        },
      ],
    };
  }
}
