import { Injectable } from '@angular/core';
import { FetchResult } from '@apollo/client';
import { AuthenticationResponse } from '@nicecactus-platform/types';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { SIGN_IN } from '../queries/authentication.queries';

@Injectable()
export class AuthenticationService {
    constructor(private apolloService: Apollo) {}

    signIn(email: string, password: string): Observable<FetchResult<AuthenticationResponse>> {
        const valueChanges = this.apolloService.mutate<AuthenticationResponse>({
            mutation: SIGN_IN,
            variables: {
                email,
                password,
            },
        });
        return valueChanges;
    }
}
