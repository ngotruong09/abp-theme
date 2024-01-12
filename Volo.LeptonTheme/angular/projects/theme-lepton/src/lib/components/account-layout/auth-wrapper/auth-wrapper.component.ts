import { SubscriptionService } from '@abp/ng.core';
import { Component } from '@angular/core';
import { AuthWrapperService } from '@volo/abp.ng.account.core';

@Component({
  selector: 'abp-auth-wrapper',
  templateUrl: './auth-wrapper.component.html',
  providers: [AuthWrapperService, SubscriptionService],
})
export class AuthWrapperComponent {
  constructor(public service: AuthWrapperService) {}
}
