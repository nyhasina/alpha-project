import { HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApolloClientOptions, ApolloLink, InMemoryCache } from '@apollo/client/core';
import { onError } from '@apollo/client/link/error';
import { HttpLink } from 'apollo-angular/http';

const uri = 'http://localhost:3333/graphql';

export function createApollo(httpLink: HttpLink, router: Router, snackbar: MatSnackBar): ApolloClientOptions<any> {
    const http = httpLink.create({ uri });
    const error = onError(({ networkError, graphQLErrors }) => {
        if (graphQLErrors) {
            graphQLErrors.forEach((graqhQLError) => {
                if (graqhQLError.extensions.exception.status === 401) {
                    snackbar.open('Token expiré', 'Fermer', {
                        horizontalPosition: 'center',
                        verticalPosition: 'top',
                        duration: 5000,
                    });
                    router.navigate(['/', 'auth']);
                    localStorage.clear();
                }
            });
        }
        if (networkError) {
            snackbar.open(networkError.message, 'Fermer', {
                horizontalPosition: 'center',
                verticalPosition: 'top',
                duration: 5000,
            });
        }
    });
    const authMiddleware = new ApolloLink((operation, forward) => {
        operation.setContext({
            headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('accessToken') || null}`),
        });
        return forward(operation);
    });
    const link = ApolloLink.from([authMiddleware, error, http]);
    return {
        link,
        cache: new InMemoryCache(),
    };
}
