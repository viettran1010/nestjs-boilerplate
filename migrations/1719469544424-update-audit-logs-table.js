import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateAuditLogsTable1719469544424 implements MigrationInterface {
    name = 'updateAuditLogsTable1719469544424'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('audit_logs', new TableColumn({
            name: 'address_update_id',
            type: 'integer',
            isNullable: true,
        }));

        // Add foreign key constraint if needed
        // await queryRunner.createForeignKey('audit_logs', new TableForeignKey({
        //     columnNames: ['address_update_id'],
        //     referencedColumnNames: ['id'],
        //     referencedTableName: 'address_updates',
        //     onDelete: 'CASCADE'
        // }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // If foreign key was added, drop it first
        // await queryRunner.dropForeignKey('audit_logs', 'FK_name');

        await queryRunner.dropColumn('audit_logs', 'address_update_id');
    }
}