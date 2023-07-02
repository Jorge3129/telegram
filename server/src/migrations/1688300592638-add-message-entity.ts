import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMessageEntity1688300592638 implements MigrationInterface {
  name = "AddMessageEntity1688300592638";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "messages" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "timestamp" TIMESTAMP NOT NULL, "authorId" integer NOT NULL, "chatId" integer NOT NULL, "type" character varying NOT NULL, "contentId" uuid, CONSTRAINT "REL_796887c8af1498a09ba2291364" UNIQUE ("contentId"), CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_87183e91f31c528f4abc1cdc51" ON "messages" ("type") `
    );
    await queryRunner.query(
      `ALTER TABLE "messages" ADD CONSTRAINT "FK_819e6bb0ee78baf73c398dc707f" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "messages" ADD CONSTRAINT "FK_36bc604c820bb9adc4c75cd4115" FOREIGN KEY ("chatId") REFERENCES "chats"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "messages" ADD CONSTRAINT "FK_796887c8af1498a09ba2291364e" FOREIGN KEY ("contentId") REFERENCES "message_contents"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "messages" DROP CONSTRAINT "FK_796887c8af1498a09ba2291364e"`
    );
    await queryRunner.query(
      `ALTER TABLE "messages" DROP CONSTRAINT "FK_36bc604c820bb9adc4c75cd4115"`
    );
    await queryRunner.query(
      `ALTER TABLE "messages" DROP CONSTRAINT "FK_819e6bb0ee78baf73c398dc707f"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_87183e91f31c528f4abc1cdc51"`
    );
    await queryRunner.query(`DROP TABLE "messages"`);
  }
}
