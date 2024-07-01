const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class updateUsersTable1719459032961 {
    name = 'updateUsersTable1719459032961'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ADD "contract_id" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD "contract_action_id" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD "audit_log_id" integer`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "contract_id"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "contract_action_id"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "audit_log_id"`);
    }
}