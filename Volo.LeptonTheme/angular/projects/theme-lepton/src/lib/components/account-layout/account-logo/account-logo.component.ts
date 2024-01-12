import { Component } from '@angular/core';

@Component({
  selector: 'abp-account-logo',
  template: `
    <div class="account-brand p-4 text-center mb-1">
      <a class="navbar-brand" routerLink="/" alt="Logo"></a>
    </div>
  `,
})
export class AccountLogoComponent {}
