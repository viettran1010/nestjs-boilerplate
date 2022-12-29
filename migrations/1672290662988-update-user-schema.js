const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class updateUserSchema1672290662988 {
    name = 'updateUserSchema1672290662988'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "report" DROP COLUMN "make"`);
        await queryRunner.query(`ALTER TABLE "report" ADD "maker" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "resetPasswordToken" character varying`);
        await queryRunner.query(`ALTER TABLE "report" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "report" ADD "price" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "report" DROP COLUMN "lat"`);
        await queryRunner.query(`ALTER TABLE "report" ADD "lat" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "report" DROP COLUMN "lng"`);
        await queryRunner.query(`ALTER TABLE "report" ADD "lng" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "report" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "report" ADD CONSTRAINT "FK_e347c56b008c2057c9887e230aa" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "report" DROP CONSTRAINT "FK_e347c56b008c2057c9887e230aa"`);
        await queryRunner.query(`ALTER TABLE "report" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "report" DROP COLUMN "lng"`);
        await queryRunner.query(`ALTER TABLE "report" ADD "lng" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "report" DROP COLUMN "lat"`);
        await queryRunner.query(`ALTER TABLE "report" ADD "lat" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "report" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "report" ADD "price" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "resetPasswordToken"`);
        await queryRunner.query(`ALTER TABLE "report" DROP COLUMN "maker"`);
        await queryRunner.query(`ALTER TABLE "report" ADD "make" character varying NOT NULL`);
    }
}
