import { MigrationInterface, QueryRunner } from 'typeorm';

export class Auto1760903647176 implements MigrationInterface {
  name = 'Auto1760903647176';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."todos_status_enum" AS ENUM('Pending', 'In Progress', 'Completed', 'Done')`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."todos_type_enum" AS ENUM('Task', 'Story', 'Epic', 'Bug', 'Spike')`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."todos_priority_enum" AS ENUM('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')`
    );
    await queryRunner.query(
      `CREATE TABLE "todos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, "description" text NOT NULL, "status" "public"."todos_status_enum" NOT NULL, "type" "public"."todos_type_enum" NOT NULL, "priority" "public"."todos_priority_enum", "labels" text array NOT NULL DEFAULT '{}', "comment" text array, "deadline" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_ca8cafd59ca6faaf67995344225" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "todos"`);
    await queryRunner.query(`DROP TYPE "public"."todos_priority_enum"`);
    await queryRunner.query(`DROP TYPE "public"."todos_type_enum"`);
    await queryRunner.query(`DROP TYPE "public"."todos_status_enum"`);
  }
}
