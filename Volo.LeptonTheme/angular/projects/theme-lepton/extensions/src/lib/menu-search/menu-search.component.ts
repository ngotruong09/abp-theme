import { createTreeNodeFilterCreator, LocalizationService } from '@abp/ng.core';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { RoutesComponent } from '@volo/abp.ng.theme.lepton';
import { BehaviorSubject, pipe } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { MENU_SEARCH_LIMIT } from './menu-search-limit.token';

@Component({
  selector: 'abp-menu-search',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="menu-search px-3">
      <input class="menu-search-input" name="menu-search" autocomplete="off" [(ngModel)]="search" />
      <i class="fas fa-search menu-search-icon"></i>
      <div class="menu-search-underline"></div>
    </div>
  `,
  styles: [
    `
      :host {
        color: var(--sidebar-text);
      }
    `,
    `
      .menu-search {
        border-top: 1px solid transparent;
        padding: 0.625rem 0;
      }
    `,
    `
      .menu-search-input {
        background: transparent;
        border: 0;
        box-shadow: none;
        color: inherit;
        padding: 0.25rem 1.25rem 0.25rem 0;
        margin: 0;
        outline: 0 !important;
        width: 100%;
      }
    `,
    `
      .menu-search-icon {
        opacity: 0.5;
        position: absolute;
        right: 1.25rem;
        top: 1.125rem;
      }
    `,
    `
      .menu-search-underline {
        height: 1px;
        background: currentColor;
        opacity: 0.4;
      }
    `,
  ],
})
export class MenuSearchComponent {
  private search$ = new BehaviorSubject('');

  get search() {
    return this.search$.value;
  }

  set search(value: string) {
    this.search$.next(value);
  }

  constructor(
    parent: RoutesComponent,
    localization: LocalizationService,
    @Inject(MENU_SEARCH_LIMIT) limit: number,
  ) {
    const localize = localization.instant.bind(localization);
    const createTreeNodeFilter = createTreeNodeFilterCreator('name', localize);

    parent.filterOp = pipe(
      switchMap(routes =>
        this.search$.pipe(
          map(search =>
            search && search.length > 1
              ? createTreeNodeFilter(search)(routes).slice(0, limit)
              : routes,
          ),
        ),
      ),
    );
  }
}
