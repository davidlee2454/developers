import { ObjectType, Field, Query, Resolver } from '@nestjs/graphql';
import { ExchangeRateService } from './exchange-rate.service';

@ObjectType()
class Rate {
    @Field()
    country!: String;

    @Field()
    currency!: String;

    @Field()
    amount!: Number;

    @Field()
    code!: String;

    @Field()
    rate!: Number;
}

@ObjectType()
class ExchangeRate {
    @Field()
    timestamp!: Number;

    @Field(() => [Rate])
    rates!: Rate[];
}
@Resolver()
export class ExchangeRateResolver {
    constructor(private readonly exchangeRateService: ExchangeRateService) { }

    // TODO: Implement a GraphQL Query that returns the exchange rates
    @Query(() => ExchangeRate)
    async exchangeRates(): Promise<ExchangeRate> {
        return this.exchangeRateService.getExchangeRates();
    }
}
