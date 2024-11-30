import { MigrationInterface, QueryRunner } from 'typeorm';

export class createAuditLogsTable1719459086734 implements MigrationInterface {
    name = 'createAuditLogsTable1719459086734'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "audit_logs" (
                "id" SERIAL NOT NULL,
                "action" character varying NOT NULL,
                "timestamp" TIMESTAMP NOT NULL,
                "contract_id" integer,
                "user_id" integer,
                "created_at" TIMESTAMP NOT NULL,
                "updated_at" TIMESTAMP NOT NULL,
                CONSTRAINT "PK_7f3d5b7f8f405d6a2ecca7a64e2" PRIMARY KEY ("id")
            )
        `);
        // Foreign keys and indices will be added when the related entities are available
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "audit_logs"`);
    }
}
