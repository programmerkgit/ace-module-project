import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import * as AceAjax from 'brace';
import { Editor } from 'brace';
import { AceMode, AceTheme } from './ace-mode';


const brace = require('brace');
require('brace/ext/language_tools');

@Component({
  selector: 'ace-editor',
  templateUrl: './ace.component.html',
  styleUrls: [ './ace.component.css' ]
})
export class AceComponent implements OnInit, OnChanges {

  @Input() mode: AceMode = 'javascript';
  @Input() theme: AceTheme = 'textmate';
  @Input() value = '';
  @Input() options: { enableBasicAutocompletion: boolean, [ Key: string ]: any } = {
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true,
    enableSnippets: true
  };
  @Output() sessionChange = new EventEmitter();
  @Input() readonly: boolean = false;

  @ViewChild('ace', {static: true}) targetElement: ElementRef;

  /* options */
  @Input() showLineNumbers: boolean = true;


  private editor: Editor;

  constructor() {
  }

  setValue(val: string, cursorPos?: number) {
    this.editor.setValue(val, cursorPos);
  }

  setOptions() {
    this.editor.setOptions({
      ...this.options,
      showLineNumbers: this.showLineNumbers
    });
  }


  getValue(): string {
    return this.editor.getValue();
  }

  selection(): AceAjax.Selection {
    return this.editor.selection;
  }

  moveCursorTo(row, column): void {
    return this.editor.moveCursorTo(row, column);
  }

  clearSelection(): void {
    return this.editor.clearSelection();
  }

  ngOnInit() {
    this.initEditor();
    this.setMode(this.mode);
    this.setTheme(this.theme);
    this.setValue(this.value);
    this.setOptions();
    this.editor.setReadOnly(this.readonly);
    this.addChange();
    this.editor.setReadOnly(this.readonly);
    this.clearSelection();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setMode(this.mode);
    this.setTheme(this.theme);
    this.setValue(this.value);
    this.setOptions();
    this.editor.setReadOnly(this.readonly);
  }


  private addChange() {
    this.editor.getSession().on('change', (e) => {
      this.sessionChange.emit(e);
    });
  }


  private initEditor(): void {
    this.editor = brace.edit(this.targetElement.nativeElement);
  }

  private setMode(mode: string): void {
    require(`brace/mode/${ mode }`);
    this.editor.getSession().setMode(`ace/mode/${ mode }`);
  }

  private setTheme(theme: string): void {
    require(`brace/theme/${ theme }`);
    this.editor.setTheme(`ace/theme/${ theme }`);
  }
}
