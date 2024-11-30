const { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } = require("typeorm");

module.exports = class updateUsersTable1719459125460 {
    name = 'updateUsersTable1719459125460'

    async up(queryRunner) {
        // Add new columns or modify existing ones as per the "# TABLE" section
        // For example, if a new column 'customer_id' is added:
        await queryRunner.addColumn('users', new TableColumn({
            name: 'customer_id',
            type: 'int',
            isNullable: true
        }));

        // Add new foreign keys or modify existing ones as per the relations in the "# TABLE" section
        // For example, if a new relation with 'customers' table is added:
        await queryRunner.createForeignKey('users', new TableForeignKey({
            columnNames: ['customer_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'customers',
            onDelete: 'SET NULL'
        }));

        // Repeat the above steps for other columns and relations as necessary
    }

    async down(queryRunner) {
        // Drop foreign keys first before dropping the columns
        // For example, if 'customer_id' relation was added:
        const table = await queryRunner.getTable('users');
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('customer_id') !== -1);
        await queryRunner.dropForeignKey('users', foreignKey);

        // Drop the columns
        // For example, if 'customer_id' column was added:
        await queryRunner.dropColumn('users', 'customer_id');

        // Repeat the above steps for other columns and relations as necessary
    }
}