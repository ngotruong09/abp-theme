import { InjectionToken, Type } from '@angular/core';

export const CONTENT_BEFORE_ROUTES = new InjectionToken<Type<any>[]>('CONTENT_BEFORE_ROUTES');
export const CONTENT_AFTER_ROUTES = new InjectionToken<Type<any>[]>('CONTENT_AFTER_ROUTES');
