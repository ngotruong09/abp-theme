import { Injectable } from '@angular/core';
import { RestService } from '@abp/ng.core';

@Injectable({
  providedIn: 'root',
})
export class NewThemeService {
  apiName = 'NewTheme';

  constructor(private restService: RestService) {}

  sample() {
    return this.restService.request<void, any>(
      { method: 'GET', url: '/api/NewTheme/sample' },
      { apiName: this.apiName }
    );
  }
}
