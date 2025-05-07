const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class updateAccountTypeInformationsTable1719469544381 {
    name = 'updateAccountTypeInformationsTable1719469544381'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "account_type_informations" ADD "currency_deposited" varchar NULL`);
        await queryRunner.query(`ALTER TABLE "account_type_informations" ADD "user_id" integer`);
        await queryRunner.query(`ALTER TABLE "account_type_informations" ADD CONSTRAINT "FK_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id")`);
        await queryRunner.query(`ALTER TABLE "account_type_informations" ADD "contract_id" integer`);
        await queryRunner.query(`ALTER TABLE "account_type_informations" ADD CONSTRAINT "FK_contract_id" FOREIGN KEY ("contract_id") REFERENCES "contracts"("id")`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "account_type_informations" DROP CONSTRAINT "FK_contract_id"`);
        await queryRunner.query(`ALTER TABLE "account_type_informations" DROP COLUMN "contract_id"`);
        await queryRunner.query(`ALTER TABLE "account_type_informations" DROP CONSTRAINT "FK_user_id"`);
        await queryRunner.query(`ALTER TABLE "account_type_informations" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "account_type_informations" DROP COLUMN "currency_deposited"`);
    }
}