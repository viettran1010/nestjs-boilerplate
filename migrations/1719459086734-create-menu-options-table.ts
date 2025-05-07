import { MigrationInterface, QueryRunner } from 'typeorm';

export class createMenuOptionsTable1719459086734 implements MigrationInterface {
    name = 'createMenuOptionsTable1719459086734'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "menu_options" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                "label" VARCHAR NOT NULL,
                "icon" VARCHAR,
                "requires_permission" BOOLEAN NOT NULL DEFAULT FALSE,
                "user_permission_id" INTEGER,
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"),
                CONSTRAINT "FK_user_permission_menu_option" FOREIGN KEY ("user_permission_id") REFERENCES "user_permissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "menu_options"`);
    }
}