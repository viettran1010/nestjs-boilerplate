module.exports = {
  up: async (queryRunner) => {
    await queryRunner.createTable('user_permissions', { // Ensure the table name matches the entity name
      id: {
        type: 'int',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      created_at: {
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
      },
      updated_at: {
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
      },
      has_access: {
        type: 'boolean',
      },
      user_id: {
        type: 'int',
      },
      menu_option_id: {
        type: 'int',
      },
    });

    await queryRunner.createForeignKey('user_permissions', { // Ensure the foreign key references are correct
      columnNames: ['user_id'],
      referencedTableName: 'users',
      referencedColumnNames: ['id'],
    });

    await queryRunner.createForeignKey('user_permissions', { // Ensure the foreign key references are correct
      columnNames: ['menu_option_id'],
      referencedTableName: 'menu_options',
      referencedColumnNames: ['id'],
    });
  },

  down: async (queryRunner) => {
    await queryRunner.dropTable('user_permissions');
  },
};