const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class updateUsersTable1719459112577 {
    name = 'updateUsersTable1719459112577'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ADD "customer_id" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_users_customer_id" FOREIGN KEY ("customer_id") REFERENCES "customers"("id")`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_users_customer_id"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "customer_id"`);
    }
}