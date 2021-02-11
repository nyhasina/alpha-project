import { Args, ArgsType, Field, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ContactModel } from './contact.model';
import { ContactService } from './contact.service';

@ArgsType()
export class CreateContactInput {
    @Field({ nullable: true })
    forename?: string;

    @Field({ nullable: true })
    surname?: string;
}

@Resolver((of) => ContactModel)
export class ContactResolver {
    constructor(private contactService: ContactService) {}

    @Query((returns) => ContactModel)
    async contact(@Args('id', { type: () => Int, name: 'contact' }) id: number) {
        return this.contactService.loadContact({ id });
    }

    @Query((returns) => [ContactModel])
    async contacts() {
        return this.contactService.loadContacts({});
    }

    @Mutation((returns) => ContactModel)
    async createContact(@Args() input: CreateContactInput) {
        const { forename, surname } = input;
        return this.contactService.createContact({ forename, surname });
    }

    @Mutation((returns) => ContactModel)
    async updateContact(@Args('id', { type: () => Int }) id: number, @Args() input: CreateContactInput) {
        const { forename, surname } = input;
        return this.contactService.updateContact({
            where: {
                id,
            },
            data: {
                forename,
                surname,
            },
        });
    }

    @Mutation((returns) => ContactModel)
    async deleteContact(@Args('id', { type: () => Int }) id: number) {
        return this.contactService.deleteContact({
            id,
        });
    }
}
