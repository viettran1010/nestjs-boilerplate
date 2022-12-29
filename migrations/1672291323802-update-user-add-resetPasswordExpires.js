const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class updateUserAddResetPasswordExpires1672291323802 {
    name = 'updateUserAddResetPasswordExpires1672291323802'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "admin" boolean NOT NULL DEFAULT (1), "password" varchar NOT NULL, "resetPasswordToken" varchar)`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "email", "admin", "password") SELECT "id", "email", "admin", "password" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "admin" boolean NOT NULL DEFAULT (1), "password" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "user"("id", "email", "admin", "password") SELECT "id", "email", "admin", "password" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
    }
}
