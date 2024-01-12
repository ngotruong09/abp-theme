import { NgModule, NgModuleFactory, ModuleWithProviders } from '@angular/core';
import { CoreModule, LazyModuleFactory } from '@abp/ng.core';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { NewThemeComponent } from './components/new-theme.component';
import { NewThemeRoutingModule } from './new-theme-routing.module';

@NgModule({
  declarations: [NewThemeComponent],
  imports: [CoreModule, ThemeSharedModule, NewThemeRoutingModule],
  exports: [NewThemeComponent],
})
export class NewThemeModule {
  static forChild(): ModuleWithProviders<NewThemeModule> {
    return {
      ngModule: NewThemeModule,
      providers: [],
    };
  }

  static forLazy(): NgModuleFactory<NewThemeModule> {
    return new LazyModuleFactory(NewThemeModule.forChild());
  }
}
