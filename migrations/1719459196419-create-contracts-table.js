const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class createContractsTable1719459196419 {
    name = 'createContractsTable1719459196419'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "contracts" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                "customer_name_katakana" VARCHAR(255) NOT NULL,
                "bank_code" VARCHAR(255) NOT NULL,
                "branch_code" VARCHAR(255) NOT NULL,
                "account_type" VARCHAR(255) NOT NULL,
                "account_number" VARCHAR(255) NOT NULL,
                "opening_date" DATE NOT NULL,
                "remarks" TEXT,
                "deposit_period" INTEGER NOT NULL,
                "maturity_date" DATE NOT NULL,
                "interest_rate" DECIMAL NOT NULL,
                "status" VARCHAR(255) NOT NULL,
                "user_id" INTEGER,
                "contract_action_id" INTEGER,
                "customer_id" INTEGER,
                "audit_log_id" INTEGER,
                CONSTRAINT "PK_contracts_id" PRIMARY KEY ("id")
            )
        `);
        // Add foreign key constraints here
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "contracts"`);
    }
}
