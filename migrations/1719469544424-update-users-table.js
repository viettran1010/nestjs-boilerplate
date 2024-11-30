const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class updateUsersTable1719469544424 {
    name = 'updateUsersTable1719469544424'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ADD "customer_id" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_users_customer_id" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_users_customer_id"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "customer_id"`);
    }
}