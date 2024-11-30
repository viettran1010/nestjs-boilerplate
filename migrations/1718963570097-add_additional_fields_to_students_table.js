const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class addAdditionalFieldsToStudentsTable1718963570097 {
    name = 'addAdditionalFieldsToStudentsTable1718963570097'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "students" ADD "encrypted_password" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "students" ADD "email" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "students" ADD "reset_password_token" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "students" ADD "reset_password_sent_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "students" ADD "remember_created_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "students" ADD "current_sign_in_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "students" ADD "last_sign_in_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "students" ADD "current_sign_in_ip" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "students" ADD "last_sign_in_ip" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "students" ADD "sign_in_count" integer DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "students" ADD "password" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "students" ADD "password_confirmation" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "students" ADD "locked_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "students" ADD "failed_attempts" integer DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "students" ADD "unlock_token" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "students" ADD "confirmation_token" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "students" ADD "unconfirmed_email" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "students" ADD "confirmed_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "students" ADD "confirmation_sent_at" TIMESTAMP`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "encrypted_password"`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "reset_password_token"`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "reset_password_sent_at"`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "remember_created_at"`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "current_sign_in_at"`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "last_sign_in_at"`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "current_sign_in_ip"`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "last_sign_in_ip"`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "sign_in_count"`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "password_confirmation"`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "locked_at"`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "failed_attempts"`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "unlock_token"`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "confirmation_token"`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "unconfirmed_email"`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "confirmed_at"`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "confirmation_sent_at"`);
    }
}