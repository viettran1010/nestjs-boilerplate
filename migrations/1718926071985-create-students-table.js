const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class createStudentsTable1718926071985 {
    name = 'createStudentsTable1718926071985'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "students" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, "enrollment_date" DATE NOT NULL, "status" character varying NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "students" ADD CONSTRAINT "FK_a75e797b7aa5898f0e6f4a411f6" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "students" DROP CONSTRAINT "FK_a75e797b7aa5898f0e6f4a411f6"`);
        await queryRunner.query(`DROP TABLE "students"`);
    }
}