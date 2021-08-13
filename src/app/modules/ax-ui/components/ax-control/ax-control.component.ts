import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, ContentChild,
  ContentChildren,
  Input, OnDestroy,
  QueryList
} from '@angular/core';
import {ValidationComponent} from "../validation/validation.component";
import {NgModel} from "@angular/forms";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'ax-control',
  templateUrl: './ax-control.component.html',
  styleUrls: ['./ax-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AxControlComponent implements AfterContentInit, OnDestroy {

  @Input() title = '';
  destroy$ = new Subject();

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
    this.form?.valueChanges?.pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => this.changeDetectorRef.markForCheck());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}
