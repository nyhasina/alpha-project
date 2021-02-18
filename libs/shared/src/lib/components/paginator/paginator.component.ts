import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pagination } from '@nicecactus-platform/graph-ql-service';

const DEFAULT_SIZE = 5;

@Component({
    selector: 'nicecactus-platform-paginator',
    templateUrl: './paginator.component.html',
    styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent {
    @Input() length: number;
    @Input() pageSize = DEFAULT_SIZE;
    @Output() paginate: EventEmitter<Pagination> = new EventEmitter<Pagination>();
    currentPage = 1;
    pages: number[] = [];
    nbPagination: number;
    start: number;
    end: number;
    max = 30;

    get startingIndex(): number {
        return (this.currentPage - 1) * this.pageSize + 1;
    }

    get endingIndex(): number {
        if (this.pageSize < this.length) {
            const endingIndex = this.pageSize * this.currentPage;
            if (endingIndex > this.length) {
                return this.length;
            }
            return endingIndex;
        }
        return this.length;
    }

    @Input() set initialValue(page: Pagination) {
        if (page) {
            this.currentPage = page.skip;
            this.pageSize = page.take;
        }
    }

    ngOnChanges() {
        this.updatePaginations();
    }

    setPagination(page: number) {
        this.currentPage = page;
        this.updatePaginations();
        this.paginate.emit({
            skip: this.currentPage,
            take: +this.pageSize,
        });
    }

    nextPage() {
        this.setPagination(this.currentPage + 1);
    }

    previousPage() {
        this.setPagination(this.currentPage - 1);
    }

    morePaginationsForward() {
        this.setPagination(this.end + Math.ceil(DEFAULT_SIZE / 2));
    }

    morePaginationsBackward() {
        this.setPagination(this.start - Math.ceil(DEFAULT_SIZE / 2));
    }

    changePageSize() {
        this.updatePaginations();
        this.paginate.emit({
            skip: this.currentPage,
            take: +this.pageSize,
        });
    }

    private generatePaginations(start: number, end: number): number[] {
        return Array.from(new Array(end + 1 - start), (x, i) => start + i);
    }

    private updatePaginations() {
        if (!this.length) {
            return;
        }
        this.nbPagination = Math.ceil(this.length / this.pageSize);
        this.validatePagination();
        if (this.nbPagination === 0) {
            this.pages = [];
            return;
        }
        if (this.currentPage < DEFAULT_SIZE) {
            this.start = 1;
            this.end = this.nbPagination > DEFAULT_SIZE ? DEFAULT_SIZE : this.nbPagination;
            this.pages = this.generatePaginations(this.start, this.end);
            return;
        }
        if (this.currentPage + DEFAULT_SIZE / 2 < this.nbPagination) {
            this.start = Math.ceil(this.currentPage - DEFAULT_SIZE / 2);
            this.end = Math.ceil(this.currentPage + DEFAULT_SIZE / 2 - 1);
            this.pages = this.generatePaginations(this.start, this.end);
            return;
        }
        this.start = this.nbPagination + 1 - DEFAULT_SIZE;
        this.end = this.nbPagination;
        this.pages = this.generatePaginations(this.start, this.end);
    }

    private validatePagination() {
        if (this.currentPage > this.nbPagination) {
            this.currentPage = this.nbPagination;
        }
        if (this.currentPage < 1) {
            this.currentPage = 1;
        }
    }
}
