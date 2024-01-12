import { mapEnumToOptions } from '@abp/ng.core';

export enum MenuStatus {
  AlwaysOpened = 0,
  OpenOnHover = 1,
}

export const menuStatusOptions = mapEnumToOptions(MenuStatus);
