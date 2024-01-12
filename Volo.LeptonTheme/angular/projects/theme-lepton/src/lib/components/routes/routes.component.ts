import { ABP, findRoute, getRoutePath, RoutesService, TreeNode } from '@abp/ng.core';
import { collapse } from '@abp/ng.theme.shared';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
  TrackByFunction,
  Type,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, take } from 'rxjs/operators';
import { CONTENT_AFTER_ROUTES, CONTENT_BEFORE_ROUTES } from '../../tokens/routes-content.token';

@Component({
  selector: 'abp-routes',
  templateUrl: 'routes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [collapse],
})
export class RoutesComponent implements OnInit {
  @Output() clickedToLink = new EventEmitter<MouseEvent>();

  @Input() isMenuPlacementTop: boolean;

  @Input() smallScreen: boolean;

  readonly expandedRoutes = new Set<string>();

  readonly initialLevel = 1;

  contentBefore: Type<any>[];
  contentAfter: Type<any>[];

  filterOp = map((routes: TreeNode<ABP.Route>[]) => routes);
  trackByFn: TrackByFunction<TreeNode<ABP.Route>> = (_, item) => item.name;

  get routes$() {
    return this.routes.visible$.pipe(this.filterOp);
  }

  constructor(
    private router: Router,
    public readonly routes: RoutesService,
    public readonly injector: Injector,
  ) {
    this.contentBefore = injector.get(CONTENT_BEFORE_ROUTES, []);
    this.contentAfter = injector.get(CONTENT_AFTER_ROUTES, []);
  }

  isDropdown(node: TreeNode<ABP.Route>) {
    return !node?.isLeaf || this.routes.hasChildren(node.name);
  }

  ngOnInit() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        take(1),
      )
      .subscribe(() => {
        let node = findRoute(this.routes, getRoutePath(this.router));
        node = { parent: node } as TreeNode<ABP.Route>;

        const nodes: string[] = [];
        while (node.parent) {
          node = node.parent;
          nodes.push(node.name);
        }

        let max = nodes.length + this.initialLevel;
        nodes.forEach(name => this.expandedRoutes.add(name + --max));
      });
  }

  onNavigate({ parentName }: ABP.Route, level: number) {
    let _level = level;
    const nextLevel = () => (_level ? --_level : 0);

    const parents = [(parentName || '') + nextLevel()];
    let node = this.routes.find(item => item.name === parentName);
    while (node?.parent) {
      node = node.parent;
      parents.push(node.name + nextLevel());
    }

    this.expandedRoutes.forEach(expanded => {
      if (parents.indexOf(expanded) < 0) this.expandedRoutes.delete(expanded);
    });
  }

  toggleExpand({ name }: ABP.Route, level: number) {
    const has = this.expandedRoutes.has(name + level);
    this.expandedRoutes[has ? 'delete' : 'add'](name + level);

    if (!has) {
      this.collapseDropdowns(name, level);
    }
  }

  collapseDropdowns(name: string, level: number) {
    this.routes.flat
      .filter(route => route.name !== name && !route.invisible)
      .forEach(route => {
        this.expandedRoutes.delete(route.name + level);
      });
  }
}
