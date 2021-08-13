import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input, OnDestroy,
} from '@angular/core';
import {NgModel} from "@angular/forms";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ValidationComponent implements AfterViewInit, OnDestroy {
  @Input() when = '';
  form?: NgModel;
  destroy$ = new Subject();

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  ngAfterViewInit() {
    this.form?.valueChanges?.pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => this.changeDetectorRef.markForCheck());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}
