import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1765125390711 implements MigrationInterface {
    name = 'Auto1765125390711'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "todo_checklist_item" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isChecked" boolean NOT NULL DEFAULT false, "title" text NOT NULL, "date" TIMESTAMP, "assigned" text, "todoId" uuid NOT NULL, CONSTRAINT "PK_39676c58503bad13cee0496e78c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "todo_checklist_item" ADD CONSTRAINT "FK_b1a142d96be6761b0bd27a4f09e" FOREIGN KEY ("todoId") REFERENCES "todos"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo_checklist_item" DROP CONSTRAINT "FK_b1a142d96be6761b0bd27a4f09e"`);
        await queryRunner.query(`DROP TABLE "todo_checklist_item"`);
    }

}
