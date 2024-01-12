import { Component } from '@angular/core';
import { TenantBoxService } from '@volo/abp.ng.account.core';

@Component({
  selector: 'abp-tenant-box',
  templateUrl: './tenant-box.component.html',
  providers: [TenantBoxService],
})
export class TenantBoxComponent {
  constructor(public service: TenantBoxService) {}
}
