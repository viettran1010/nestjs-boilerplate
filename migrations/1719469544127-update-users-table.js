const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class updateUsersTable1719469544127 {
    name = 'updateUsersTable1719469544127'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ADD "customer_id" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_customer_id" FOREIGN KEY ("customer_id") REFERENCES "customers"("id")`);
        await queryRunner.query(`ALTER TABLE "users" ADD "user_permission_id" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_user_permission_id" FOREIGN KEY ("user_permission_id") REFERENCES "user_permissions"("id")`);
        // Add other foreign key columns and constraints here
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_user_permission_id"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "user_permission_id"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_customer_id"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "customer_id"`);
        // Drop other foreign key columns and constraints here
    }
}