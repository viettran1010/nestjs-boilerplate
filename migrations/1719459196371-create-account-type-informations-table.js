const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class createAccountTypeInformationsTable1719459196371 {
    name = 'createAccountTypeInformationsTable1719459196371'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "account_type_informations" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deposit_amount" decimal NULL, "deposit_date" TIMESTAMP NULL, CONSTRAINT "PK_123456789abcdefg" PRIMARY KEY ("id"))`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "account_type_informations"`);
    }
}