import { ApplicationInfo, eLayoutType, EnvironmentService } from '@abp/ng.core';
import { Component, ElementRef, OnDestroy, ViewEncapsulation } from '@angular/core';
import { eThemeLeptonComponents } from '../../enums/components';
import { LayoutService } from '../../services/layout.service';
import { BehaviorSubject, combineLatest, fromEvent, Subscription } from 'rxjs';
import { debounceTime, filter, tap } from 'rxjs/operators';
import { LayoutStateService } from '../../services/layout-state.service';

@Component({
  selector: 'abp-application-layout',
  templateUrl: './application-layout.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['application-layout.component.scss'],
})
export class ApplicationLayoutComponent implements OnDestroy {
  // required for dynamic component
  static type = eLayoutType.application;

  headerComponentKey = eThemeLeptonComponents.ApplicationLayoutHeader;
  footerComponentKey = eThemeLeptonComponents.ApplicationLayoutFooter;
  mouseMoveSubscription: Subscription;
  containers$ = new BehaviorSubject<Array<ElementRef<HTMLElement>>>([]);

  get appInfo(): ApplicationInfo {
    return this.environment.getEnvironment().application;
  }

  constructor(
    private environment: EnvironmentService,
    private layoutState: LayoutStateService,
    private layout: LayoutService,
  ) {}

  listenMouseMove(containerRefs: ElementRef<HTMLElement>[]) {
    const mousemove$ = fromEvent(document, 'mousemove').pipe(
      debounceTime(50),
      filter(() => this.layoutState.get('isSidebarCollapsed')),
    );
    this.containers$.next([...this.containers$.getValue(), ...containerRefs]);
    if (this.mouseMoveSubscription) {
      this.mouseMoveSubscription.unsubscribe();
    }
    this.mouseMoveSubscription = combineLatest([mousemove$, this.containers$])
      .pipe(
        tap(([event, containers]) => {
          const elements = containers.filter(ref => ref?.nativeElement);
          const mouseOnSidebar = elements.some(ref =>
            ref?.nativeElement.contains(event.target as any),
          );
          this.layout.addSidebarClasses(mouseOnSidebar);
          this.layoutState.patch({ mouseOnSidebar });
        }),
      )
      .subscribe();
  }

  ngOnDestroy() {
    if (this.mouseMoveSubscription) {
      this.mouseMoveSubscription.unsubscribe();
    }
  }
}
