import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { ContactModel } from './contact.model';
import { ContactService } from './contact.service';

@Resolver((of) => ContactModel)
export class ContactResolver {
    constructor(private contactService: ContactService) {}

    @Query((returns) => ContactModel)
    async loadContact(@Args('id', { type: () => Int }) id: number) {
        return this.contactService.loadContact({ id });
    }
}
