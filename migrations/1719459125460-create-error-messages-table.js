const { MigrationInterface, QueryRunner, Table } = require("typeorm");

module.exports = class createErrorMessagesTable1719459125460 {
    name = 'createErrorMessagesTable1719459125460'

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
                    isNullable: false,
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    isNullable: false,
                },
                {
                    name: 'error_icon',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'error_message',
                    type: 'text',
                    isNullable: false,
                },
                {
                    name: 'error_detail',
                    type: 'text',
                    isNullable: false,
                },
                {
                    name: 'timestamp',
                    type: 'timestamp',
                    isNullable: false,
                },
                {
                    name: 'action_taken',
                    type: 'text',
                    isNullable: false,
                },
                {
                    name: 'user_id',
                    type: 'int',
                    isNullable: true,
                },
            ],
            foreignKeys: [
                {
                    columnNames: ['user_id'],
                    referencedTableName: 'users',
                    referencedColumnNames: ['id'],
                    onDelete: 'SET NULL',
                    onUpdate: 'CASCADE',
                },
            ],
        }));
    }

    async down(queryRunner) {
        await queryRunner.dropTable('error_messages');
    }
}