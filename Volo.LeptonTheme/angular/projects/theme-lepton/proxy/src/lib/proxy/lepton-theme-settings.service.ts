import type { LeptonThemeSettingsDto, UpdateLeptonThemeSettingsDto } from './management/models';
import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LeptonThemeSettingsService {
  apiName = 'LeptonThemeManagement';

  get = () =>
    this.restService.request<any, LeptonThemeSettingsDto>({
      method: 'GET',
      url: '/api/lepton-theme-management/settings',
    },
    { apiName: this.apiName });

  update = (input: UpdateLeptonThemeSettingsDto) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: '/api/lepton-theme-management/settings',
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
