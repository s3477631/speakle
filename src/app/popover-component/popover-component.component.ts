import {Component, Input, OnInit} from '@angular/core';


@Component({
  selector: 'app-popover-component',
  templateUrl: './popover-component.component.html',
  styleUrls: ['./popover-component.component.scss'],
})
export class PopoverComponent implements OnInit {
  @Input()
  pathway;
  constructor() { }

  ngOnInit() {
  }

}
