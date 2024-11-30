const { MigrationInterface, QueryRunner, Table } = require("typeorm");

module.exports = class createErrorMessagesTable1719459209898 {
    name = 'createErrorMessagesTable1719459209898'

    async up(queryRunner) {
        await queryRunner.createTable(new Table({
            name: 'error_messages',
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
                    name: 'error_icon',
                    type: 'varchar',
                    length: '255',
                    isNullable: true,
                },
                {
                    name: 'error_message',
                    type: 'varchar',
                    length: '255',
                },
                {
                    name: 'error_detail',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'timestamp',
                    type: 'bigint',
                },
                {
                    name: 'action_taken',
                    type: 'text',
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
        await queryRunner.dropTable('error_messages');
    }
}