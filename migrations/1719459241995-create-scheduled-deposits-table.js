const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class createScheduledDepositsTable1719459241995 {
    name = 'createScheduledDepositsTable1719459241995'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "scheduled_deposits" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "scheduled_date" TIMESTAMP, "status" character varying, CONSTRAINT "PK_5241bdccbb6e9c21f8f2f4f14e2" PRIMARY KEY ("id"))`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "scheduled_deposits"`);
    }
}