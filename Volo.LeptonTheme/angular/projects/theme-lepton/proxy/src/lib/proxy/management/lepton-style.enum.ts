import { mapEnumToOptions } from '@abp/ng.core';

export enum LeptonStyle {
  Style1 = 0,
  Style2 = 1,
  Style3 = 2,
  Style4 = 3,
  Style5 = 4,
  Style6 = 5,
}

export const leptonStyleOptions = mapEnumToOptions(LeptonStyle);
