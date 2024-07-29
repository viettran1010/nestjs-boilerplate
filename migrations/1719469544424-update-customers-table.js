const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class updateCustomersTable1719469544424 {
    name = 'updateCustomersTable1719469544424'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "customers" ADD IF NOT EXISTS "user_id" integer`);
        await queryRunner.query(`ALTER TABLE "customers" ADD IF NOT EXISTS "address_update_id" integer`);
        await queryRunner.query(`ALTER TABLE "customers" ADD CONSTRAINT "FK_user_customer" FOREIGN KEY ("user_id") REFERENCES "users"("id")`);
        await queryRunner.query(`ALTER TABLE "customers" ADD CONSTRAINT "FK_address_update_customer" FOREIGN KEY ("address_update_id") REFERENCES "address_updates"("id")`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "customers" DROP CONSTRAINT "FK_address_update_customer"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP CONSTRAINT "FK_user_customer"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "address_update_id"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "user_id"`);
    }
}