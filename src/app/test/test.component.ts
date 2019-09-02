import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AceComponent } from '../../../projects/ace-module/src/lib/ace.component';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: [ './test.component.scss' ]
})
export class TestComponent implements OnInit, AfterViewInit {

  @ViewChild(AceComponent, {static: true}) ace;

  terminalText = `
  a
  a
  a
  a
  a
  a
  a
  a
  a
  a
  a
  a
  a
  a
  a
  `;

  constructor() {
  }

  ngAfterViewInit(): void {
    setInterval(() => {
      this.ace.setValue('fajweoi' + Math.random());
    }, 100);
  }

  ngOnInit() {
  }

}
