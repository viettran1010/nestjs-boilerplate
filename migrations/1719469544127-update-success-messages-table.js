const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class updateSuccessMessagesTable1719469544127 {
    name = 'updateSuccessMessagesTable1719469544127'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "success_messages" ADD "contract_id" integer`);
        await queryRunner.query(`ALTER TABLE "success_messages" ADD CONSTRAINT "FK_success_messages_contract_id" FOREIGN KEY ("contract_id") REFERENCES "contracts"("id")`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "success_messages" DROP CONSTRAINT "FK_success_messages_contract_id"`);
        await queryRunner.query(`ALTER TABLE "success_messages" DROP COLUMN "contract_id"`);
    }
}