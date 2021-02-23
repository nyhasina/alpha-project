import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tag } from '@nicecactus-platform/graph-ql-service';
import { TagDependencies } from '../../store/tag.reducers';

@Component({
    selector: 'nicecactus-platform-tag-form',
    templateUrl: './tag-form.component.html',
    styleUrls: ['./tag-form.component.scss'],
})
export class TagFormComponent implements OnChanges {
    @Input() tag: Tag;
    @Input() dependencies: TagDependencies;
    @Output() save: EventEmitter<Tag> = new EventEmitter<Tag>();
    form: FormGroup;

    constructor(private formBuilder: FormBuilder) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.tag && changes.tag.currentValue) {
            this.form = this.initForm(this.tag);
        }
    }

    private initForm(tag: Tag): FormGroup {
        return this.formBuilder.group({
            id: [tag?.id],
            name: [tag?.name, Validators.required],
        });
    }

    onSubmit(): void {
        if (this.form.valid) {
            this.save.emit(this.form.value);
        }
    }
}
