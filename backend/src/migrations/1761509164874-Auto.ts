import { MigrationInterface, QueryRunner } from 'typeorm';

export class Auto1761509164874 implements MigrationInterface {
  name = 'Auto1761509164874';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1️⃣ Перейменовуємо старий тип
    await queryRunner.query(`
      ALTER TYPE "public"."todos_priority_enum" RENAME TO "todos_priority_enum_old";
    `);

    // 2️⃣ Створюємо новий тип
    await queryRunner.query(`
      CREATE TYPE "public"."todos_priority_enum" AS ENUM ('Low', 'Medium', 'High', 'Critical');
    `);

    // ⚠️ 3️⃣ Тимчасово міняємо тип колонки на text, щоб можна було оновити значення
    await queryRunner.query(`
      ALTER TABLE "todos" ALTER COLUMN "priority" TYPE text USING "priority"::text;
    `);

    // 4️⃣ Тепер оновлюємо старі значення
    await queryRunner.query(`
      UPDATE "todos"
      SET "priority" = CASE
        WHEN "priority" = 'LOW' THEN 'Low'
        WHEN "priority" = 'MEDIUM' THEN 'Medium'
        WHEN "priority" = 'HIGH' THEN 'High'
        WHEN "priority" = 'CRITICAL' THEN 'Critical'
        ELSE "priority"
      END;
    `);

    // 5️⃣ Міняємо тип назад на новий enum
    await queryRunner.query(`
      ALTER TABLE "todos"
      ALTER COLUMN "priority"
      TYPE "public"."todos_priority_enum"
      USING "priority"::"public"."todos_priority_enum";
    `);

    // 6️⃣ Дропаємо старий enum
    await queryRunner.query(`
      DROP TYPE "public"."todos_priority_enum_old";
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // 1️⃣ Створюємо старий тип
    await queryRunner.query(`
      CREATE TYPE "public"."todos_priority_enum_old" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');
    `);

    // 2️⃣ Тимчасово міняємо тип на text
    await queryRunner.query(`
      ALTER TABLE "todos" ALTER COLUMN "priority" TYPE text USING "priority"::text;
    `);

    // 3️⃣ Конвертуємо значення назад
    await queryRunner.query(`
      UPDATE "todos"
      SET "priority" = CASE
        WHEN "priority" = 'Low' THEN 'LOW'
        WHEN "priority" = 'Medium' THEN 'MEDIUM'
        WHEN "priority" = 'High' THEN 'HIGH'
        WHEN "priority" = 'Critical' THEN 'CRITICAL'
        ELSE "priority"
      END;
    `);

    // 4️⃣ Міняємо тип назад на старий enum
    await queryRunner.query(`
      ALTER TABLE "todos"
      ALTER COLUMN "priority"
      TYPE "public"."todos_priority_enum_old"
      USING "priority"::"public"."todos_priority_enum_old";
    `);

    // 5️⃣ Дропаємо новий тип і перейменовуємо старий назад
    await queryRunner.query(`
      DROP TYPE "public"."todos_priority_enum";
    `);

    await queryRunner.query(`
      ALTER TYPE "public"."todos_priority_enum_old" RENAME TO "todos_priority_enum";
    `);
  }
}
