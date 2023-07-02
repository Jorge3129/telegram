import { MigrationInterface, QueryRunner } from "typeorm";

export class AddChat1688289691972 implements MigrationInterface {
  name = "AddChat1688289691972";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "chats" ("id" SERIAL NOT NULL, "title" character varying, "type" character varying NOT NULL, CONSTRAINT "PK_0117647b3c4a4e5ff198aeb6206" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_82098aa8bb9df492a810ff0be9" ON "chats" ("type") `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_82098aa8bb9df492a810ff0be9"`
    );
    await queryRunner.query(`DROP TABLE "chats"`);
  }
}
