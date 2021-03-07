import { Injectable } from '@angular/core';
import { FetchResult } from '@apollo/client';
import { Apollo } from 'apollo-angular';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Blog } from '../interfaces/blog.interface';

@Injectable()
export class BlogService {
    constructor(private apolloService: Apollo) {}


}
