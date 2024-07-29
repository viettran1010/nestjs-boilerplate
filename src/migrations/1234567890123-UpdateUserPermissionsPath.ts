import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUserPermissionsPath1234567890123 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Migration steps to update the file paths in the database, if necessary
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Reverse the migration steps
  }
}