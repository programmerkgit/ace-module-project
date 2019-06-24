import { Directive, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import * as AceAjax from 'brace';
import { Editor } from 'brace';
import { AceMode, AceTheme } from './ace-mode';

const brace = require('brace');
const tolls = require('brace/ext/language_tools');

@Directive({
  selector: '[ace]'
})
export class AceDirective implements OnInit, OnChanges {
  @Input() mode: AceMode = 'javascript';
  @Input() theme: AceTheme = 'textmate';
  @Input() value = '';
  @Input() options: { enableBasicAutocompletion: boolean, [ Key: string ]: any } = {
    enableBasicAutocompletion: false,
    enableLiveAutocompletion: true,
    enableSnippets: true
  };
  @Output() sessionChange = new EventEmitter();
  @Input() readonly: boolean = false;


  /* options */
  @Input() showLineNumbers: boolean = true;


  private editor: Editor;

  constructor(
    private el: ElementRef
  ) {
    this.initEditor();
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
    this.editor = brace.edit(this.el.nativeElement);
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
