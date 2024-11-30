const { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } = require("typeorm");

module.exports = class updateErrorMessagesTable1719469544127 {
    name = 'updateErrorMessagesTable1719469544127'

    async up(queryRunner) {
        await queryRunner.addColumn('error_messages', new TableColumn({
            name: 'contract_id',
            type: 'int',
            isNullable: true
        }));

        await queryRunner.createForeignKey('error_messages', new TableForeignKey({
            columnNames: ['contract_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'contracts',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }));
    }

    async down(queryRunner) {
        const table = await queryRunner.getTable('error_messages');
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('contract_id') !== -1);
        await queryRunner.dropForeignKey('error_messages', foreignKey);
        await queryRunner.dropColumn('error_messages', 'contract_id');
    }
}