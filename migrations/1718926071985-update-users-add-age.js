const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class updateUsersAddAge1718926071986 {
    name = 'updateUsersAddAge1718926071986'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ADD "age" integer`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "age"`);
    }
}
