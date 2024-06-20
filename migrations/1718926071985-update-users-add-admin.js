const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class updateUsersAddAdmin1718926071985 {
    name = 'updateUsersAddAdmin1718926071985'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ADD "admin" boolean NOT NULL DEFAULT true`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "admin"`);
    }
}