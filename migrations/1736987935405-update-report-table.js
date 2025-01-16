const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class updateReportTable1736987935405 {
    name = 'updateReportTable1736987935405'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "report" ADD COLUMN "hello" character varying(255)`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "report" DROP COLUMN "hello"`);
    }
}