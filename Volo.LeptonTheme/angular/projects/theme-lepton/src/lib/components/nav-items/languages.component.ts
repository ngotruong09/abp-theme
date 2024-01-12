import { ConfigStateService, LanguageInfo, SessionStateService } from '@abp/ng.core';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'abp-languages',
  // tslint:disable-next-line: component-max-inline-declarations
  template: `
    <div class="dropdown" ngbDropdown>
      <a
        *ngIf="defaultLanguage$ | async as defaultLang"
        class="btn"
        role="button"
        id="dropdownMenuLink"
        ngbDropdownToggle
      >
        <span
          class="flag-icon flag-icon-squared flag-icon-{{ defaultLang.flagIcon }}"
          [title]="defaultLang.displayName"
        ></span>
        <span class="current-language-name ms-1">{{ defaultLang.displayName }}</span>
      </a>
      <div
        ngbDropdownMenu
        class="dropdown-menu dropdown-menu-end"
        data-bs-popper="none"
        *ngIf="(dropdownLanguages$ | async)?.length > 0"
      >
        <a
          *ngFor="let lang of (dropdownLanguages$ | async) || []"
          class="dropdown-item pointer"
          (click)="changeLang(lang.cultureName)"
        >
          <span class="flag-icon flag-icon-{{ lang.flagIcon }} flag-icon-squared me-2"></span>
          {{ lang?.displayName }}</a
        >
      </div>
    </div>
  `,
})
export class LanguagesComponent {
  get smallScreen(): boolean {
    return window.innerWidth < 992;
  }

  languages$ = this.configState.getDeep$('localization.languages');

  get defaultLanguage$(): Observable<{ displayName: string; flagIcon: string }> {
    return this.languages$.pipe(
      map(languages => {
        const lang: Partial<LanguageInfo> =
          languages?.find(language => language.cultureName === this.selectedLangCulture) ||
          ({} as Partial<LanguageInfo>);
        return {
          displayName: lang.displayName || '',
          flagIcon: lang.flagIcon,
        };
      }),
    );
  }

  get dropdownLanguages$(): Observable<LanguageInfo[]> {
    return this.languages$.pipe(
      map(
        languages => languages?.filter(lang => lang.cultureName !== this.selectedLangCulture) || [],
      ),
    );
  }

  get selectedLangCulture(): string {
    return this.sessionState.getLanguage();
  }

  constructor(private configState: ConfigStateService, private sessionState: SessionStateService) {}

  changeLang(cultureName: string) {
    this.sessionState.setLanguage(cultureName);
  }
}
