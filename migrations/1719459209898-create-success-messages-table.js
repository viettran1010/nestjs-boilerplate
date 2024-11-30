const { MigrationInterface, QueryRunner, Table } = require("typeorm");

module.exports = class createSuccessMessagesTable1719459209898 {
    name = 'createSuccessMessagesTable1719459209898'

    async up(queryRunner) {
        await queryRunner.createTable(new Table({
            name: 'success_messages',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                    onUpdate: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'message',
                    type: 'varchar',
                    length: '255',
                },
                {
                    name: 'detail',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'displayed_at',
                    type: 'timestamp',
                    isNullable: true,
                },
                {
                    name: 'closed_at',
                    type: 'timestamp',
                    isNullable: true,
                },
                {
                    name: 'user_id',
                    type: 'int',
                },
                {
                    name: 'contract_id',
                    type: 'int',
                },
            ],
            foreignKeys: [
                {
                    columnNames: ['user_id'],
                    referencedTableName: 'users',
                    referencedColumnNames: ['id'],
                },
                {
                    columnNames: ['contract_id'],
                    referencedTableName: 'contracts',
                    referencedColumnNames: ['id'],
                },
            ],
        }));
    }

    async down(queryRunner) {
        await queryRunner.dropTable('success_messages');
    }
}