import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Pagination } from '@nicecactus-platform/graph-ql-service';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

const PAGE_SIZES = [10, 25, 50, 100];

@Component({
    selector: 'nicecactus-platform-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit, OnDestroy {
    @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();
    @Output() search: EventEmitter<string> = new EventEmitter<string>();
    pageSizes = PAGE_SIZES;
    pageSize: number;
    searchTerm: string;
    searchTermChange$: Subject<string> = new Subject<string>();
    searchTermChangeSubscription$: Subscription;

    @Input() set initialValue(value: Pagination) {
        this.pageSize = value.take;
    }

    ngOnInit() {
        this.searchTermChangeSubscription$ = this.searchTermChange$.pipe(debounceTime(1000)).subscribe((searchTerm) => {
            this.search.emit(searchTerm);
        });
    }

    ngOnDestroy(): void {
        this.searchTermChangeSubscription$?.unsubscribe();
    }

    onPageSizeChange(page: number) {
        this.pageChange.emit(page);
    }

    onChange() {
        this.searchTermChange$.next(this.searchTerm.trim());
    }
}
