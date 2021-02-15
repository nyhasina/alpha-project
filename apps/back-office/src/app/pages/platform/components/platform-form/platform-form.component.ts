import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Platform } from '@nicecactus-platform/graph-ql-service';

@Component({
    selector: 'nicecactus-platform-platform-form',
    templateUrl: './platform-form.component.html',
    styleUrls: ['./platform-form.component.scss'],
})
export class PlatformFormComponent implements OnChanges {
    @Input() platform: Platform;
    @Output() save: EventEmitter<Platform> = new EventEmitter<Platform>();
    form: FormGroup;

    constructor(private formBuilder: FormBuilder) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.platform && changes.platform.currentValue) {
            this.form = this.initForm(this.platform);
        }
    }

    private initForm(platform: Platform): FormGroup {
        return this.formBuilder.group({
            id: [platform?.id],
            name: [platform?.name, Validators.required],
            logo: [null],
        });
    }

    onSubmit(): void {
      if (this.form.valid) {
            this.save.emit(this.form.value);
        }
    }
}
