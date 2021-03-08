import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Format } from '@nicecactus-platform/graph-ql-service';

@Component({
    selector: 'nicecactus-platform-format-form',
    templateUrl: './format-form.component.html',
    styleUrls: ['./format-form.component.scss'],
})
export class FormatFormComponent implements OnChanges {
    @Input() format: Format;
    @Output() save: EventEmitter<Format> = new EventEmitter<Format>();
    form: FormGroup;

    constructor(private formBuilder: FormBuilder) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.format && changes.format.currentValue) {
            this.form = this.initForm(this.format);
        }
    }

    private initForm(format: Format): FormGroup {
        return this.formBuilder.group({
            id: [format?.id],
            code: [format?.code, Validators.required],
            name: [format?.name, Validators.required],
        });
    }

    onSubmit(): void {
        if (this.form.valid) {
            this.save.emit(this.form.value);
        }
    }
}
