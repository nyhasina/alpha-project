import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { createApollo } from './graph-ql.factory';
import { AuthenticationService } from './services/authentication.service';
import { CurrencyService } from './services/currency.service';
import { FormatService } from './services/format.service';
import { GameService } from './services/game.service';
import { InvitationService } from './services/invitation.service';
import { LanguageService } from './services/language.service';
import { PlatformService } from './services/platform.service';
import { TagService } from './services/tag.service';
import { TeamService } from './services/team.service';
import { UserService } from './services/user.service';

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
        CurrencyService,
        LanguageService,
        UserService,
        TagService,
        TeamService,
        InvitationService,
        FormatService,
    ],
})
export class GraphQlServiceModule {}
