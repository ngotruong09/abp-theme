import { InternalStore } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { Layout } from '../models';

@Injectable({
  providedIn: 'root',
})
export class LayoutStateService {
  private store = new InternalStore({} as Layout.State);
  state$ = this.store.sliceState(state => state);

  constructor() {}

  getPrimaryLogoColor(): Layout.LogoColor {
    return this.getLogoColor('--logo');
  }

  getPrimaryLogoColor$(): Observable<Layout.LogoColor> {
    return this.getLogoColor$('--logo');
  }

  getSecondaryLogoColor(): Layout.LogoColor {
    return this.getLogoColor('--logo-reverse');
  }

  getSecondaryLogoColor$(): Observable<Layout.LogoColor> {
    return this.getLogoColor$('--logo-reverse');
  }

  get<T extends Layout.StateKeys>(key: T) {
    return this.store.state[key] as Layout.State[T];
  }

  get$<T extends Layout.StateKeys>(key: T) {
    return this.store.sliceState(state => state[key]);
  }

  update$<T extends Layout.StateKeys>(key: T) {
    return this.store.sliceUpdate(state => state[key]);
  }

  patch(state: Partial<Layout.State>) {
    this.store.patch(state);
  }

  private getLogoColor(propertyName: string): Layout.LogoColor {
    const styles = getComputedStyle(document.documentElement);
    const logo = styles.getPropertyValue(propertyName);

    return logo.indexOf('dark') > -1 ? 'dark' : 'light';
  }

  private getLogoColor$(propertyName: string): Observable<Layout.LogoColor> {
    return this.store
      .sliceState(state => state)
      .pipe(
        map(() => this.getLogoColor(propertyName)),
        distinctUntilChanged(),
      );
  }
}
