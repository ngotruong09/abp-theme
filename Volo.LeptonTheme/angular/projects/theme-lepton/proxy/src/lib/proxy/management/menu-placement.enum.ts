import { mapEnumToOptions } from '@abp/ng.core';

export enum MenuPlacement {
  Left = 0,
  Top = 1,
}

export const menuPlacementOptions = mapEnumToOptions(MenuPlacement);
