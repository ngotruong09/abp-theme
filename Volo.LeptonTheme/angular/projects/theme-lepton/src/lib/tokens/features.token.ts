import { ConfigStateService, featuresFactory, noop } from '@abp/ng.core';
import { APP_INITIALIZER, inject, InjectionToken } from '@angular/core';
import { ModuleVisibility, setModuleVisibilityFactory } from '@volo/abp.commercial.ng.ui/config';
import { SettingTabsService } from '@abp/ng.setting-management/config';
import { Observable } from 'rxjs';
import { eLeptonThemeSettingTabNames } from '../enums/setting-tab-names';

export const LEPTON_THEME_FEATURES = new InjectionToken<Observable<ModuleVisibility>>(
  'LEPTON_THEME_FEATURES',
  {
    providedIn: 'root',
    factory: () => {
      const configState = inject(ConfigStateService);
      const featureKey = 'LeptonManagement.Enable';
      const mapFn = features => ({
        enable: features[featureKey].toLowerCase() !== 'false',
      });

      return featuresFactory(configState, [featureKey], mapFn);
    },
  },
);

export const SET_LEPTON_THEME_SETTING_TAB_VISIBILITY = new InjectionToken(
  'SET_LEPTON_THEME_SETTING_TAB_VISIBILITY',
  {
    providedIn: 'root',
    factory: () => {
      const settingTabs = inject(SettingTabsService);
      const stream = inject(LEPTON_THEME_FEATURES);

      setModuleVisibilityFactory(
        stream,
        settingTabs,
        eLeptonThemeSettingTabNames.LeptonThemeManagement,
      ).subscribe();
    },
  },
);

export const LEPTON_THEME_FEATURES_PROVIDERS = [
  {
    provide: APP_INITIALIZER,
    useFactory: noop,
    deps: [SET_LEPTON_THEME_SETTING_TAB_VISIBILITY],
    multi: true,
  },
];
