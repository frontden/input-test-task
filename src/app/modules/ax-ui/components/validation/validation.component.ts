import {ChangeDetectionStrategy, Component, ElementRef, Input} from '@angular/core';

@Component({
  selector: 'validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ValidationComponent {
  @Input() when = '';

  get errorText(): string {
    return this.element.nativeElement.textContent;
  }

  get elementRef(): ElementRef {
    return this.element;
  }

  constructor(private element: ElementRef) {
  }

}
