import { Directive, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as AceAjax from 'brace';
import { Editor } from 'brace';

const brace = require('brace');

@Directive({
  selector: '[ace]'
})
export class AceDirective implements OnInit {
  @Input() mode = 'javascript';
  @Input() theme = 'monokai';
  @Input() value: string;
  @Output() change = new EventEmitter();


  private editor: Editor;

  constructor(
    private el: ElementRef
  ) {
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
    this.initEditor();
    this.setMode();
    this.setTheme();
    this.setValue(this.value);
    this.addChange();
    this.clearSelection();
  }


  private addChange() {
    this.editor.getSession().on('change', () => {
      this.change.emit(this.getValue());
    });
  }


  private initEditor(): void {
    this.editor = brace.edit(this.el.nativeElement);
  }

  private setMode(): void {
    require(`brace/mode/${ this.mode }`);
    this.editor.getSession().setMode(`ace/mode/${ this.mode }`);
  }

  private setTheme(): void {
    require(`brace/theme/${ this.theme }`);
    this.editor.setTheme(`ace/theme/${ this.theme }`);
  }

}
