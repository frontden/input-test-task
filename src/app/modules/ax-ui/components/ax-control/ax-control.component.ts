import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, ContentChild,
  ContentChildren,
  Input,
  QueryList
} from '@angular/core';
import {ValidationComponent} from "../validation/validation.component";
import {NgModel} from "@angular/forms";

@Component({
  selector: 'ax-control',
  templateUrl: './ax-control.component.html',
  styleUrls: ['./ax-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AxControlComponent implements AfterContentInit {

  @Input() title = '';

  @ContentChild(NgModel, { static: true }) readonly form?: NgModel;
  @ContentChildren(ValidationComponent) readonly validationComponents?: QueryList<ValidationComponent>;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  ngAfterContentInit(): void {
    if (this.form) {
      this.validationComponents?.forEach(validationComponent =>
        validationComponent.form = this.form
      );
    }
    this.form?.valueChanges?.subscribe(() => this.changeDetectorRef.detectChanges());
  }
}
