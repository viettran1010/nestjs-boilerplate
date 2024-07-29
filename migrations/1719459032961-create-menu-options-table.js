module.exports = {
  up: async (queryRunner) => {
    await queryRunner.createTable('menu_options', new Table({
      name: 'menu_options',
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
          name: 'label',
          type: 'varchar',
          length: '255',
        },
        {
          name: 'icon',
          type: 'varchar',
          length: '255',
        },
        {
          name: 'requires_permission',
          type: 'boolean',
        },
      ],
    }));
  },

  down: async (queryRunner) => {
    await queryRunner.dropTable('menu_options');
  },
};