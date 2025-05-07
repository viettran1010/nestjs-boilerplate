const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class updateScheduledDepositsTable1719469544591 {
    name = 'updateScheduledDepositsTable1719469544591'

    async up(queryRunner) {
        await queryRunner.addColumn('scheduled_deposits', new TableColumn({
            name: 'account_type_information_id',
            type: 'integer',
            isNullable: true
        }));

        await queryRunner.createForeignKey('scheduled_deposits', new TableForeignKey({
            columnNames: ['account_type_information_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'account_type_informations',
            onDelete: 'CASCADE'
        }));
    }

    async down(queryRunner) {
        const table = await queryRunner.getTable('scheduled_deposits');
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('account_type_information_id') !== -1);
        await queryRunner.dropForeignKey('scheduled_deposits', foreignKey);
        await queryRunner.dropColumn('scheduled_deposits', 'account_type_information_id');
    }
}