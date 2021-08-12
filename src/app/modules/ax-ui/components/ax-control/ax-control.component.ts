import {
  AfterContentInit,
  AfterViewInit, ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, ContentChild,
  ContentChildren, ElementRef,
  Input, OnDestroy,
  OnInit,
  QueryList, Renderer2, ViewChild
} from '@angular/core';
import {ValidationComponent} from "../validation/validation.component";
import {NgControl, NgModel, ValidationErrors} from "@angular/forms";
import {ErrorInfo} from "../../models/error-info.interface";
import {BehaviorSubject, combineLatest, fromEvent, Subject} from "rxjs";
import {takeUntil, tap} from "rxjs/operators";

@Component({
  selector: 'ax-control',
  templateUrl: './ax-control.component.html',
  styleUrls: ['./ax-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AxControlComponent implements OnInit, AfterContentInit, AfterViewInit, OnDestroy {

  @Input() title = '';
  errorsInfo$ = new BehaviorSubject<Array<ErrorInfo>>([]);
  destroy$ = new Subject();

  @ViewChild('wrap') readonly wrapElement?: ElementRef;
  @ContentChild(NgControl, { static: true }) readonly form?: NgModel;
  @ContentChild(NgControl, {read: ElementRef}) readonly inputRef?: ElementRef;
  @ContentChildren(ValidationComponent) readonly validationComponents?: QueryList<ValidationComponent>;

  constructor(private renderer: Renderer2,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    const errors = this.validationComponents?.map((validationComponent) => {
      return {name: validationComponent.when, text: validationComponent.errorText};
    });

    if (errors) {
      this.errorsInfo$.next(errors);
    }
  }

  ngAfterViewInit(): void {
    const blurEvent$ = fromEvent(this.inputRef?.nativeElement, 'blur');
    combineLatest([blurEvent$, this.form?.valueChanges]).pipe(
      tap(() => this.changeDetectorRef.markForCheck()),
      takeUntil(this.destroy$)
    ).subscribe();

    this.validationComponents?.forEach(item => {
      this.renderer.removeChild(this.wrapElement?.nativeElement, item.elementRef.nativeElement);
    });
  }

  isErrorExist(errors: ValidationErrors | null | undefined, name: string | undefined) {
    return !!(this.form?.touched && errors && name && errors[name]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}
