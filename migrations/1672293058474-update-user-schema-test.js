const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class updateUserSchema31672293058474 {
  name = 'updateUserSchema31672293058474';

  async up(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "resetPasswordToken" TIMESTAMP`,
    );
  }

  async down(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE "user" DROP COLUMN "resetPasswordToken"`,
    );
  }
};
