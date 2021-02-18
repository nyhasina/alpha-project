import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { createApollo } from './graph-ql.factory';
import { AuthenticationService } from './services/authentication.service';
import { GameService } from './services/game.service';
import { PlatformService } from './services/platform.service';


@NgModule({
    imports: [CommonModule, MatSnackBarModule],
    providers: [
        {
            provide: APOLLO_OPTIONS,
            useFactory: createApollo,
            deps: [HttpLink, Router, MatSnackBar],
        },
        AuthenticationService,
        PlatformService,
        GameService,
    ],
})
export class GraphQlServiceModule {}
