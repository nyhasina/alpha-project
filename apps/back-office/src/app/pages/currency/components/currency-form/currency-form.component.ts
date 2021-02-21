import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CodeLabel } from '@nicecactus-platform/graph-ql-service';

@Component({
    selector: 'nicecactus-platform-currency-form',
    templateUrl: './currency-form.component.html',
    styleUrls: ['./currency-form.component.scss'],
})
export class CurrencyFormComponent implements OnChanges {
    @Input() currency: CodeLabel;
    @Output() save: EventEmitter<CodeLabel> = new EventEmitter<CodeLabel>();
    form: FormGroup;

    constructor(private formBuilder: FormBuilder) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.currency && changes.currency.currentValue) {
            this.form = this.initForm(this.currency);
        }
    }

    private initForm(currency: CodeLabel): FormGroup {
        return this.formBuilder.group({
            id: [currency?.id],
            code: [currency?.code, Validators.required],
            label: [currency?.label, Validators.required],
        });
    }

    onSubmit(): void {
        if (this.form.valid) {
            this.save.emit(this.form.value);
        }
    }
}
