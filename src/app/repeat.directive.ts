import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({selector: '[appRepeat]'})
export class RepeatDirective {
  private _upTo: number;
  private _startAt: number;
  private _step: number;

  constructor(private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef) {
  }

  @Input() set appRepeatUpTo(upTo: number) {
    this._upTo = upTo;
    this.update();
  }

  @Input() set appRepeatStep(step: number) {
    this._step = step;
    this.update();
  }

  @Input() set appRepeatStartAt(startAt: number) {
    this._startAt = startAt;
    this.update();
  }

  private update() {
    this.viewContainer.clear();

    for (let i = this._startAt; i <= this._upTo; i += this._step) {
      this.viewContainer.createEmbeddedView(
        this.templateRef,
        {
          $implicit: i,
          isLast: (i + this._step > this._upTo)
        }
      );
    }
  }
}
