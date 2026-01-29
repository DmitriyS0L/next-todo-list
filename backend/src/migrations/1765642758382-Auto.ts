import { MigrationInterface, QueryRunner } from 'typeorm';

export class Auto1765642758382 implements MigrationInterface {
  name = 'Auto1765642758382';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "todos" ALTER COLUMN "description" DROP NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "todos" ALTER COLUMN "description" SET NOT NULL`);
  }
}
