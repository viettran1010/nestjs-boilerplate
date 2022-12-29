const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class updateUserAge1672298258220 {
    name = 'updateUserAge1672298258220'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" ADD "age" integer`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "age"`);
    }
}
