const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class createSuccessMessagesTable1719459112577 {
    name = 'createSuccessMessagesTable1719459112577'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "success_messages" (
            "id" SERIAL NOT NULL, 
            "created_at" TIMESTAMP NOT NULL DEFAULT now(), 
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(), 
            "message" character varying NOT NULL, 
            "detail" character varying, 
            "displayed_at" TIMESTAMP, 
            "closed_at" TIMESTAMP, 
            "user_id" integer,
            CONSTRAINT "PK_a7e1c130837b1b7e3e989a2ff38" PRIMARY KEY ("id"),
            CONSTRAINT "FK_user_success_messages" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        )`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "success_messages"`);
    }
}