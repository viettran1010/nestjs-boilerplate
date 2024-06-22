const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class updateReportsTable1719015648108 {
    name = 'updateReportsTable1719015648108'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "reports" ADD "encrypted_password" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "reports" ADD "email" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "reports" ADD "reset_password_token" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "reports" ADD "reset_password_sent_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "reports" ADD "remember_created_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "reports" ADD "current_sign_in_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "reports" ADD "last_sign_in_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "reports" ADD "current_sign_in_ip" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "reports" ADD "last_sign_in_ip" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "reports" ADD "sign_in_count" integer`);
        await queryRunner.query(`ALTER TABLE "reports" ADD "password" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "reports" ADD "password_confirmation" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "reports" ADD "locked_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "reports" ADD "failed_attempts" integer`);
        await queryRunner.query(`ALTER TABLE "reports" ADD "unlock_token" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "reports" ADD "confirmation_token" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "reports" ADD "unconfirmed_email" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "reports" ADD "confirmed_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "reports" ADD "confirmation_sent_at" TIMESTAMP`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "reports" DROP COLUMN "encrypted_password"`);
        await queryRunner.query(`ALTER TABLE "reports" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "reports" DROP COLUMN "reset_password_token"`);
        await queryRunner.query(`ALTER TABLE "reports" DROP COLUMN "reset_password_sent_at"`);
        await queryRunner.query(`ALTER TABLE "reports" DROP COLUMN "remember_created_at"`);
        await queryRunner.query(`ALTER TABLE "reports" DROP COLUMN "current_sign_in_at"`);
        await queryRunner.query(`ALTER TABLE "reports" DROP COLUMN "last_sign_in_at"`);
        await queryRunner.query(`ALTER TABLE "reports" DROP COLUMN "current_sign_in_ip"`);
        await queryRunner.query(`ALTER TABLE "reports" DROP COLUMN "last_sign_in_ip"`);
        await queryRunner.query(`ALTER TABLE "reports" DROP COLUMN "sign_in_count"`);
        await queryRunner.query(`ALTER TABLE "reports" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "reports" DROP COLUMN "password_confirmation"`);
        await queryRunner.query(`ALTER TABLE "reports" DROP COLUMN "locked_at"`);
        await queryRunner.query(`ALTER TABLE "reports" DROP COLUMN "failed_attempts"`);
        await queryRunner.query(`ALTER TABLE "reports" DROP COLUMN "unlock_token"`);
        await queryRunner.query(`ALTER TABLE "reports" DROP COLUMN "confirmation_token"`);
        await queryRunner.query(`ALTER TABLE "reports" DROP COLUMN "unconfirmed_email"`);
        await queryRunner.query(`ALTER TABLE "reports" DROP COLUMN "confirmed_at"`);
        await queryRunner.query(`ALTER TABLE "reports" DROP COLUMN "confirmation_sent_at"`);
    }
}