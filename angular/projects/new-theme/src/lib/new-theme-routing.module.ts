import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewThemeComponent } from './components/new-theme.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: NewThemeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewThemeRoutingModule {}
