import { ModuleWithProviders, NgModule } from '@angular/core';
import { NEW_THEME_ROUTE_PROVIDERS } from './providers/route.provider';

@NgModule()
export class NewThemeConfigModule {
  static forRoot(): ModuleWithProviders<NewThemeConfigModule> {
    return {
      ngModule: NewThemeConfigModule,
      providers: [NEW_THEME_ROUTE_PROVIDERS],
    };
  }
}
