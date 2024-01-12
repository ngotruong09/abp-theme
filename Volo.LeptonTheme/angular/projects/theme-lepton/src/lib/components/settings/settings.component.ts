import { SubscriptionService } from '@abp/ng.core';
import { collapse, ToasterService } from '@abp/ng.theme.shared';
import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MenuPlacement, MenuStatus } from '@volo/abp.ng.theme.lepton/proxy';
import { finalize } from 'rxjs/operators';
import { LayoutService } from '../../services/layout.service';
import { CUSTOM_STYLE } from '../../tokens/custom-style.token';

@Component({
  selector: 'abp-lepton-settings',
  templateUrl: './settings.component.html',
  animations: [collapse],
})
export class SettingsComponent implements OnInit, AfterViewInit {
  placements = { Left: MenuPlacement.Left, Top: MenuPlacement.Top };

  statuses = {
    AlwaysOpened: MenuStatus.AlwaysOpened,
    OpenOnHover: MenuStatus.OpenOnHover,
  };

  boxedLayout = false;

  loading: boolean;

  viewInitialized = false;

  form: FormGroup;

  get isSmallScreen(): boolean {
    return window.innerWidth < 992;
  }

  constructor(
    private toaster: ToasterService,
    private subscription: SubscriptionService,
    private layoutService: LayoutService,
    private fb: FormBuilder,
    @Inject(CUSTOM_STYLE) public customStyle: boolean,
  ) {
    this.form = this.fb.group({
      ...(!customStyle && { style: [] }),
      publicLayoutStyle: [],
      menuPlacement: [],
      menuStatus: [],
      boxedLayout: [],
    });
  }

  ngOnInit(): void {
    this.subscription.addOne(
      this.layoutService.fetchThemeSettings(),
      ({ boxedLayout, menuPlacement, menuStatus, style, publicLayoutStyle }) => {
        this.form.patchValue({
          menuPlacement,
          boxedLayout,
          ...(!this.customStyle && { style: style || 0 }),
          publicLayoutStyle: publicLayoutStyle || 0,
          menuStatus,
        });
      },
    );
  }

  ngAfterViewInit() {
    setTimeout(() => (this.viewInitialized = true), 0);
  }

  save() {
    this.loading = true;
    const successFn = () => {
      this.toaster.success('LeptonThemeManagement::SuccessfullySaved', null);
    };

    this.layoutService
      .updateThemeSettings(this.form.value)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(successFn);
  }
}
