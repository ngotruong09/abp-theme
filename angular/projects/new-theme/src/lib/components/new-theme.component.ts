import { Component, OnInit } from '@angular/core';
import { NewThemeService } from '../services/new-theme.service';

@Component({
  selector: 'lib-new-theme',
  template: ` <p>new-theme works!</p> `,
  styles: [],
})
export class NewThemeComponent implements OnInit {
  constructor(private service: NewThemeService) {}

  ngOnInit(): void {
    this.service.sample().subscribe(console.log);
  }
}
