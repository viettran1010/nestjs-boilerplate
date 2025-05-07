const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class createAddressUpdatesTable1719459086734 extends MigrationInterface {
    name = 'createAddressUpdatesTable1719459086734'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "address_updates" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                "file_attachment" character varying,
                "date_to_start_converting" TIMESTAMP,
                "date_of_end_converting" TIMESTAMP,
                "status" character varying NOT NULL,
                "user_id" integer,
                "audit_log_id" integer,
                "address_update_file" character varying,
                "customer_id" integer,
                CONSTRAINT "PK_a7b1f4a865e4bafcdec7e3c0c1d" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "address_updates"
            ADD CONSTRAINT "FK_address_updates_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "address_updates"
            ADD CONSTRAINT "FK_address_updates_audit_log_id" FOREIGN KEY ("audit_log_id") REFERENCES "audit_logs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "address_updates"
            ADD CONSTRAINT "FK_address_updates_customer_id" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "address_updates"`);
    }
};