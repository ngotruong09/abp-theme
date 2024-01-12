import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  VALIDATION_ERROR_TEMPLATE,
  VALIDATION_INVALID_CLASSES,
  VALIDATION_TARGET_SELECTOR,
} from '@ngx-validate/core';
import {
  BaseThemeLeptonModule,
  LEPTON_THEME_NAV_ITEM_PROVIDERS,
  LEPTON_THEME_SETTING_TAB_PROVIDERS,
  LEPTON_THEME_STYLES_PROVIDERS,
  ValidationErrorComponent,
} from '@volo/abp.ng.theme.lepton';

@NgModule({
  exports: [BaseThemeLeptonModule],
  imports: [BaseThemeLeptonModule],
})
export class ThemeLeptonTestingModule {
  static withConfig(): ModuleWithProviders<ThemeLeptonTestingModule> {
    return {
      ngModule: ThemeLeptonTestingModule,
      providers: [
        LEPTON_THEME_NAV_ITEM_PROVIDERS,
        LEPTON_THEME_STYLES_PROVIDERS,
        LEPTON_THEME_SETTING_TAB_PROVIDERS,
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
      ],
    };
  }
}
