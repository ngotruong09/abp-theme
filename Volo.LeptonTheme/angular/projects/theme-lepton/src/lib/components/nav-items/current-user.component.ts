import { AuthService, ConfigStateService, SessionStateService } from '@abp/ng.core';
import { UserMenu, UserMenuService } from '@abp/ng.theme.shared';
import { Component, TrackByFunction } from '@angular/core';
import { eThemeLeptonComponents } from '../../enums/components';

@Component({
  selector: 'abp-current-user',
  // tslint:disable-next-line: component-max-inline-declarations
  templateUrl: 'current-user.component.html',
})
export class CurrentUserComponent {
  currentUser$ = this.configState.getOne$('currentUser');

  selectedTenant$ = this.sessionState.getTenant$();

  currentUserImageComponentKey = eThemeLeptonComponents.CurrentUserImage;

  trackByFn: TrackByFunction<UserMenu> = (_, element) => element.id;

  get smallScreen(): boolean {
    return window.innerWidth < 992;
  }

  constructor(
    public readonly userMenu: UserMenuService,
    private authService: AuthService,
    private sessionState: SessionStateService,
    private configState: ConfigStateService,
  ) {}

  navigateToLogin() {
    this.authService.navigateToLogin();
  }
}
