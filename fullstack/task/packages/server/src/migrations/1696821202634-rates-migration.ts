import { MigrationInterface, QueryRunner } from 'typeorm';

export class ratesMigration1696821202634 implements MigrationInterface {
    name = 'ratesMigration1696821202634';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "rates" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAtUtc" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAtUtc" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleteDateUtc" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL, "name" character varying(255) NOT NULL, "value" character varying(255) NOT NULL, CONSTRAINT "PK_608dd5fd6f0783062b07346ed1c" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `INSERT INTO "rates" ("version", "name", "value") VALUES (1, 'rates1', 'value1')`
        );
        await queryRunner.query(
            `INSERT INTO "rates" ("version", "name", "value") VALUES (1, 'rates2', 'value2')`
        );
        await queryRunner.query(
            `INSERT INTO "rates" ("version", "name", "value") VALUES (1, 'rates3', 'value3')`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "rates"`);
    }
}
