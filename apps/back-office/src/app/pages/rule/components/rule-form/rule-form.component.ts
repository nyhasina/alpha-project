import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Rule } from '@nicecactus-platform/graph-ql-service';

@Component({
    selector: 'nicecactus-platform-rule-form',
    templateUrl: './rule-form.component.html',
    styleUrls: ['./rule-form.component.scss'],
})
export class RuleFormComponent implements OnChanges {
    @Input() rule: Rule;
    @Output() save: EventEmitter<Rule> = new EventEmitter<Rule>();
    form: FormGroup;

    constructor(private formBuilder: FormBuilder) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.rule && changes.rule.currentValue) {
            this.form = this.initForm(this.rule);
        }
    }

    private initForm(rule: Rule): FormGroup {
        return this.formBuilder.group({
            id: [rule?.id],
            name: [rule?.name, Validators.required],
            content: [rule?.content, Validators.required],
        });
    }

    onSubmit(): void {
        if (this.form.valid) {
            this.save.emit(this.form.value);
        }
    }
}
