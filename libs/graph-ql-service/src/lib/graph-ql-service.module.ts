import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { AuthenticationService } from './services/authentication.service';
import { PlatformService } from './services/platform.service';

const uri = 'http://localhost:3333/graphql'; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
    return {
        link: httpLink.create({ uri }),
        cache: new InMemoryCache(),
    };
}

@NgModule({
    imports: [CommonModule],
    providers: [
        {
            provide: APOLLO_OPTIONS,
            useFactory: createApollo,
            deps: [HttpLink],
        },
        AuthenticationService,
        PlatformService,
    ],
})
export class GraphQlServiceModule {}
