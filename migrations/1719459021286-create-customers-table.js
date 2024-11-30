const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class createCustomersTable1719459021286 {
    name = 'createCustomersTable1719459021286'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "customers" (
            "id" SERIAL NOT NULL, 
            "created_at" TIMESTAMP NOT NULL DEFAULT now(), 
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(), 
            "name" character varying NOT NULL, 
            "name_katakana" character varying NOT NULL, 
            "company_name" character varying NOT NULL, 
            "zip_code" character varying NOT NULL, 
            "address" character varying NOT NULL, 
            "phone_number" character varying NOT NULL, 
            "email_address" character varying NOT NULL, 
            "date_of_birth" DATE NOT NULL, 
            "contact_date" DATE NOT NULL, 
            "remarks" text, 
            "user_id" integer NOT NULL, 
            "katakana" character varying NOT NULL, 
            CONSTRAINT "PK_a1fdf2a7a5ed1d6dbf806d12e1e" PRIMARY KEY ("id"),
            CONSTRAINT "FK_user_customer" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        )`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "customers"`);
    }
}