import { CurrentUserDto } from '@abp/ng.core';
import { Type } from '@angular/core';

export namespace ThemeLepton {
  export interface Options {
    contentAfterRoutes?: Type<any>[];
    contentBeforeRoutes?: Type<any>[];
    customStyle?: boolean;
  }

  export interface CurrentUserImageComponentInputs {
    readonly currentUser?: CurrentUserDto;
    readonly classes: string;
  }
}
