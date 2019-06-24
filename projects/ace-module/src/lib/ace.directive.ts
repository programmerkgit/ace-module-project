import { Directive, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import * as AceAjax from 'brace';
import { Editor } from 'brace';

const brace = require('brace');

@Directive({
  selector: '[ace]'
})
export class AceDirective implements OnInit, OnChanges {
  @Input() mode = 'javascript';
  @Input() theme = 'monokai';
  @Input() value = '';
  @Output() sessionChange = new EventEmitter();


  private editor: Editor;

  constructor(
    private el: ElementRef
  ) {
    this.initEditor();
  }

  setValue(val: string, cursorPos?: number) {
    this.editor.setValue(val, cursorPos);
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
    this.addChange();
    this.clearSelection();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setValue(this.value);
    this.setTheme(this.theme);
    this.setMode(this.mode);
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
