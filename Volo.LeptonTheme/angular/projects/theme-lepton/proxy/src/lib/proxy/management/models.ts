import type { MenuPlacement } from './menu-placement.enum';
import type { MenuStatus } from './menu-status.enum';
import type { LeptonStyle } from './lepton-style.enum';

export interface LeptonThemeSettingsDto {
  boxedLayout: boolean;
  menuPlacement: MenuPlacement;
  menuStatus: MenuStatus;
  style: LeptonStyle;
  publicLayoutStyle: LeptonStyle;
}

export interface UpdateLeptonThemeSettingsDto {
  boxedLayout: boolean;
  menuPlacement: MenuPlacement;
  menuStatus: MenuStatus;
  style: LeptonStyle;
  publicLayoutStyle: LeptonStyle;
}
