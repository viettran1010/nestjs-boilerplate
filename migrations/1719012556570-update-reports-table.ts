import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateReportsTable1719012556570 implements MigrationInterface {
    name = 'updateReportsTable1719012556570'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reports" ADD "email" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "reports" ADD "encrypted_password" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "reports" ADD "reset_password_token" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "reports" ADD "reset_password_sent_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "reports" ADD "remember_created_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "reports" ADD "current_sign_in_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "reports" ADD "last_sign_in_at" TIMESTAMP`);
        // ... Add other ALTER TABLE queries for each new column
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reports" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "reports" DROP COLUMN "encrypted_password"`);
        await queryRunner.query(`ALTER TABLE "reports" DROP COLUMN "reset_password_token"`);
        await queryRunner.query(`ALTER TABLE "reports" DROP COLUMN "reset_password_sent_at"`);
        await queryRunner.query(`ALTER TABLE "reports" DROP COLUMN "remember_created_at"`);
        await queryRunner.query(`ALTER TABLE "reports" DROP COLUMN "current_sign_in_at"`);
        await queryRunner.query(`ALTER TABLE "reports" DROP COLUMN "last_sign_in_at"`);
        // ... Add other DROP COLUMN queries for each new column
    }
}