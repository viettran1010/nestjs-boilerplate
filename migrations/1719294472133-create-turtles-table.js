const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class createTurtlesTable1719294472133 {
    name = 'createTurtlesTable1719294472133'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "turtles" (
            "id" SERIAL NOT NULL,
            "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            "species" character varying NOT NULL,
            "age" integer NOT NULL,
            "health_status" character varying NOT NULL,
            "location_id" integer,
            CONSTRAINT "PK_ae5cdd3aa89fdba8e5a7d7c90ae" PRIMARY KEY ("id"),
            CONSTRAINT "FK_123456789abcdef123456789abc" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        )`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "turtles"`);
    }
}