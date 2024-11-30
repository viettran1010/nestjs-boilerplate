const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class updateUsersTable1719459021286 {
    name = 'updateUsersTable1719459021286'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "admin" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "age" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD "contract_id" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_users_contract_id" FOREIGN KEY ("contract_id") REFERENCES "contracts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD "contract_action_id" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_users_contract_action_id" FOREIGN KEY ("contract_action_id") REFERENCES "contract_actions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD "audit_log_id" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_users_audit_log_id" FOREIGN KEY ("audit_log_id") REFERENCES "audit_logs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_users_audit_log_id"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "audit_log_id"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_users_contract_action_id"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "contract_action_id"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_users_contract_id"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "contract_id"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "age"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "admin"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
    }
}