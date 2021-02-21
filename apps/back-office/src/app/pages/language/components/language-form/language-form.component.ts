import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CodeLabel } from '@nicecactus-platform/graph-ql-service';

@Component({
    selector: 'nicecactus-platform-language-form',
    templateUrl: './language-form.component.html',
    styleUrls: ['./language-form.component.scss'],
})
export class LanguageFormComponent implements OnChanges {
    @Input() language: CodeLabel;
    @Output() save: EventEmitter<CodeLabel> = new EventEmitter<CodeLabel>();
    form: FormGroup;

    constructor(private formBuilder: FormBuilder) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.language && changes.language.currentValue) {
            this.form = this.initForm(this.language);
        }
    }

    private initForm(language: CodeLabel): FormGroup {
        return this.formBuilder.group({
            id: [language?.id],
            code: [language?.code, Validators.required],
            label: [language?.label, Validators.required],
        });
    }

    onSubmit(): void {
        if (this.form.valid) {
            this.save.emit(this.form.value);
        }
    }
}
