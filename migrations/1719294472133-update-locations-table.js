const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class updateLocationsTable1719294472133 {
    name = 'updateLocationsTable1719294472133'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "locations" ADD COLUMN IF NOT EXISTS "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "locations" ADD COLUMN IF NOT EXISTS "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "locations" ADD COLUMN IF NOT EXISTS "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "locations" ADD COLUMN IF NOT EXISTS "lat" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "locations" ADD COLUMN IF NOT EXISTS "lng" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "turtles" ADD COLUMN IF NOT EXISTS "location_id" integer`);
        await queryRunner.query(`ALTER TABLE "turtles" ADD CONSTRAINT "FK_turtles_locations_location_id" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "turtles" DROP CONSTRAINT "FK_turtles_locations_location_id"`);
        await queryRunner.query(`ALTER TABLE "turtles" DROP COLUMN "location_id"`);
        await queryRunner.query(`ALTER TABLE "locations" DROP COLUMN "lng"`);
        await queryRunner.query(`ALTER TABLE "locations" DROP COLUMN "lat"`);
        await queryRunner.query(`ALTER TABLE "locations" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "locations" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "locations" DROP COLUMN "created_at"`);
    }
}