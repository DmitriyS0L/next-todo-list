import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1762360258467 implements MigrationInterface {
    name = 'Auto1762360258467'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todos" ADD "order" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todos" DROP COLUMN "order"`);
    }

}
