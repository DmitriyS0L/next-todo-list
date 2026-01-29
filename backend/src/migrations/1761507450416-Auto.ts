import { MigrationInterface, QueryRunner } from 'typeorm';

export class Auto1761507450416 implements MigrationInterface {
  name = 'Auto1761507450416';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "todos" ALTER COLUMN "status" SET DEFAULT 'Pending'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "todos" ALTER COLUMN "status" DROP DEFAULT`);
  }
}
