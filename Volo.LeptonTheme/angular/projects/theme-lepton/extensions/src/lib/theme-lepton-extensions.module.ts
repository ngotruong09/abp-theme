import { ModuleWithProviders, NgModule } from '@angular/core';
import { MenuSearchOptions } from './menu-search/menu-search';
import { MenuSearchModule } from './menu-search/menu-search.module';

export interface ThemeLeptonExtensionOptions {
  menuSearch: MenuSearchOptions;
}

@NgModule({
  exports: [MenuSearchModule],
  imports: [MenuSearchModule],
})
export class ThemeLeptonExtensionsModule {
  static forRoot(
    options = {} as ThemeLeptonExtensionOptions,
  ): ModuleWithProviders<ThemeLeptonExtensionsModule> {
    return {
      ngModule: ThemeLeptonExtensionsModule,
      providers: [MenuSearchModule.forRoot(options.menuSearch).providers],
    };
  }
}
