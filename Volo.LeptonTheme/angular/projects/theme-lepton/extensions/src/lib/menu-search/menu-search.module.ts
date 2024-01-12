import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuSearchOptions } from './menu-search';
import { MENU_SEARCH_LIMIT } from './menu-search-limit.token';
import { MenuSearchComponent } from './menu-search.component';

@NgModule({
  imports: [FormsModule],
  declarations: [MenuSearchComponent],
  exports: [MenuSearchComponent],
})
export class MenuSearchModule {
  static forRoot(options = {} as MenuSearchOptions): ModuleWithProviders<MenuSearchModule> {
    return {
      ngModule: MenuSearchModule,
      providers: [
        {
          provide: MENU_SEARCH_LIMIT,
          useValue: options.limit || Infinity,
        },
      ],
    };
  }
}
