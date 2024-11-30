import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateReportsTable1719012252994 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reports" ADD "encrypted_password" VARCHAR(255)`);
        await queryRunner.query(`ALTER TABLE "reports" ADD "email" VARCHAR(255)`);
        await queryRunner.query(`ALTER TABLE "reports" ADD "reset_password_token" VARCHAR(255)`);
        await queryRunner.query(`ALTER TABLE "reports" ADD "reset_password_sent_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "reports" ADD "remember_created_at" TIMESTAMP`);
        // ... other columns as specified in the guidelines
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reports" DROP COLUMN "encrypted_password"`);
        await queryRunner.query(`ALTER TABLE "reports" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "reports" DROP COLUMN "reset_password_token"`);
        await queryRunner.query(`ALTER TABLE "reports" DROP COLUMN "reset_password_sent_at"`);
        await queryRunner.query(`ALTER TABLE "reports" DROP COLUMN "remember_created_at"`);
        // ... other columns as specified in the guidelines
    }
}