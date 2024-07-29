const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class updateContractsTable1719469544381 {
    name = 'updateContractsTable1719469544381'

    async up(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "contracts"
            ADD COLUMN "account_type_information_id" INTEGER,
            ADD COLUMN "currency_deposited" VARCHAR(3),
            ADD COLUMN "deposit_amount" DECIMAL(15, 2),
            ADD COLUMN "deposit_date" DATE,
            ADD COLUMN "success_message_id" INTEGER,
            ADD COLUMN "error_message_id" INTEGER;
        `);
        // Add foreign key constraints here
        await queryRunner.query(`
            ALTER TABLE "contracts"
            ADD CONSTRAINT "FK_contracts_account_type_information_id" FOREIGN KEY ("account_type_information_id") REFERENCES "account_type_informations"("id"),
            ADD CONSTRAINT "FK_contracts_success_message_id" FOREIGN KEY ("success_message_id") REFERENCES "success_messages"("id"),
            ADD CONSTRAINT "FK_contracts_error_message_id" FOREIGN KEY ("error_message_id") REFERENCES "error_messages"("id");
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "contracts"
            DROP CONSTRAINT "FK_contracts_account_type_information_id",
            DROP CONSTRAINT "FK_contracts_success_message_id",
            DROP CONSTRAINT "FK_contracts_error_message_id",
            DROP COLUMN "account_type_information_id",
            DROP COLUMN "currency_deposited",
            DROP COLUMN "deposit_amount",
            DROP COLUMN "deposit_date",
            DROP COLUMN "success_message_id",
            DROP COLUMN "error_message_id";
        `);
    }
}