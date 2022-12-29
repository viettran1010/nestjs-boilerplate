const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class updateUserSchema31672293956018 {
  name = 'updateUserSchema31672293956018';

  async up(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE "user" DROP COLUMN "resetPasswordToken"`,
    );
  }

  async down(queryRunner) {}
};
