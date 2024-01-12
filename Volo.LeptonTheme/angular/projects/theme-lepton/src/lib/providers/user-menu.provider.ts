import { AuthService, NAVIGATE_TO_MANAGE_PROFILE } from '@abp/ng.core';
import { UserMenuService } from '@abp/ng.theme.shared';
import { APP_INITIALIZER, Injector } from '@angular/core';
import {
  NAVIGATE_TO_MY_SECURITY_LOGS,
  OPEN_MY_LINK_USERS_MODAL,
} from '@volo/abp.commercial.ng.ui/config';
import { eUserMenuItems } from '../enums/user-menu-items';

export const LEPTON_THEME_USER_MENU_PROVIDERS = [
  {
    provide: APP_INITIALIZER,
    useFactory: configureUserMenu,
    deps: [Injector],
    multi: true,
  },
];

export function configureUserMenu(injector: Injector) {
  const userMenu = injector.get(UserMenuService);
  const authService = injector.get(AuthService);
  const navigateToManageProfile = injector.get(NAVIGATE_TO_MANAGE_PROFILE);
  const navigateToMySecurityLogs = injector.get(NAVIGATE_TO_MY_SECURITY_LOGS);
  const openMyLinkUsersModal = injector.get(OPEN_MY_LINK_USERS_MODAL, null) as () => void;

  return () => {
    userMenu.addItems([
      {
        id: eUserMenuItems.LinkedAccounts,
        order: 100,
        textTemplate: {
          text: 'AbpAccount::LinkedAccounts',
        },
        action: () => openMyLinkUsersModal(),
        visible: () => !!openMyLinkUsersModal,
      },
      {
        id: eUserMenuItems.MyAccount,
        order: 100,
        textTemplate: {
          text: 'AbpAccount::MyAccount',
        },
        action: () => navigateToManageProfile(),
      },
      {
        id: eUserMenuItems.SecurityLogs,
        order: 100,
        textTemplate: {
          text: 'AbpAccount::MySecurityLogs',
        },
        action: () => navigateToMySecurityLogs(),
      },
      {
        id: eUserMenuItems.Logout,
        order: 101,
        textTemplate: {
          text: 'AbpUi::Logout',
        },
        action: () => {
          authService.logout().subscribe();
        },
      },
    ]);
  };
}
