const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class updateAccountTypeInformationsTable1719469544591 {
    name = 'updateAccountTypeInformationsTable1719469544591'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "account_type_informations" ADD "user_id" integer`);
        await queryRunner.query(`ALTER TABLE "account_type_informations" ADD CONSTRAINT "FK_user_account_type_informations" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "account_type_informations" DROP CONSTRAINT "FK_user_account_type_informations"`);
        await queryRunner.query(`ALTER TABLE "account_type_informations" DROP COLUMN "user_id"`);
    }
}