import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { Rate, ExchangeRate } from 'src/types';
import { RateEntity } from 'src/entities/rate.entity';

const expirationTime = 5 * 60 * 1000;

@Injectable()
export class ExchangeRateService {
    constructor(
        @InjectRepository(RateEntity) private rateRepository: Repository<RateEntity>,
    ) { }

    public getExchangeRates = async (): Promise<ExchangeRate> => {
        // TODO: Implement the fetching and parsing of the exchange rates.
        // Use this method in the resolver
        let createdAt = await this.getCreatedAt();
        let rates: Rate[];

        if (!createdAt || (new Date().getTime() - new Date(createdAt).getTime()) > expirationTime) {
            rates = await this.fetchExchangeRates();
            createdAt = await this.getCreatedAt();
        } else {
            rates = await this.getExchangeRatesFromDB()
        }

        return {
            timestamp: new Date().getTime() - (createdAt ? createdAt.getTime() : new Date().getTime()),
            rates,
        };
    };

    // function fetch exchangeRates from bank
    async fetchExchangeRates(): Promise<Rate[]> {
        const url = 'https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/';
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const tableRows = $('table.currency-table tbody tr');
        const exchangeRates: Rate[] = [];

        tableRows.each((index: number, element: any) => {
            const country = $(element).find('td:nth-child(1)').text().trim();
            const currency = $(element).find('td:nth-child(2)').text().trim();
            const amount = $(element).find('td:nth-child(3)').text().trim();
            const code = $(element).find('td:nth-child(4)').text().trim();
            const rate = $(element).find('td:nth-child(5)').text().trim();
            exchangeRates.push({ country, amount: +amount, code, currency, rate: +rate });
        });
        await this.saveExchangeRates(exchangeRates);

        return exchangeRates;
    }

    // function get exchangeRates from DB
    async getExchangeRatesFromDB(): Promise<Rate[]> {
        const result = await this.rateRepository
            .createQueryBuilder('rates')
            .select(['rates.country as country', 'rates.currency as currency', 'rates.amount as amount', 'rates.code as code', 'rates.rate as rate'])
            .execute();
        return result ? result : [];
    }

    // function store exchangeRates to DB
    async saveExchangeRates(exchangeRates: Rate[]) {
        await this.rateRepository.clear();
        exchangeRates.forEach(async (element) => {
            await this.rateRepository.save(element);
        })
    }

    // function get created time from DB    
    async getCreatedAt(): Promise<Date | null> {
        const rates = await this.rateRepository.find();
        return rates[0] ? rates[0].createdAtUtc : null;
    }
}
