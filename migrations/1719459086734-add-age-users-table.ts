import { MigrationInterface, QueryRunner } from 'typeorm';

export class addAgeUsersTable1719459086734 implements MigrationInterface {
    name = 'addAgeUsersTable1719459086734'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "age" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "age"`);
    }
}