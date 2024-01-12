import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

const oAuthConfig = {
  issuer: 'https://localhost:44396',
  redirectUri: baseUrl,
  clientId: 'NewTheme_App',
  responseType: 'code',
  scope: 'offline_access NewTheme',
  requireHttps: true
};

export const environment = {
  production: false,
  application: {
    baseUrl,
    name: 'NewTheme',
    logoUrl: '',
  },
  oAuthConfig,
  apis: {
    default: {
      url: 'https://localhost:44396',
      rootNamespace: 'Hwl.NewTheme',
    },
    AbpAccountPublic: {
      url: oAuthConfig.issuer,
      rootNamespace: 'AbpAccountPublic',
    },
    NewTheme: {
      url: 'https://localhost:44314',
      rootNamespace: 'Hwl.NewTheme',
    },
  },
} as Environment;
