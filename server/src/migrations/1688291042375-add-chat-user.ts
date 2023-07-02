import { MigrationInterface, QueryRunner } from "typeorm";

export class AddChatUser1688291042375 implements MigrationInterface {
  name = "AddChatUser1688291042375";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "chat_users" ("userId" integer NOT NULL, "chatId" integer NOT NULL, "lastRead" TIMESTAMP NOT NULL, "muted" boolean NOT NULL, CONSTRAINT "PK_51b91938d79c98cb1f05dc1ce9e" PRIMARY KEY ("userId", "chatId"))`
    );
    await queryRunner.query(
      `ALTER TABLE "chat_users" ADD CONSTRAINT "FK_080a8a9184fde75b9bff47907e3" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "chat_users" ADD CONSTRAINT "FK_83b97b11d762f45e73f75698ed6" FOREIGN KEY ("chatId") REFERENCES "chats"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "chat_users" DROP CONSTRAINT "FK_83b97b11d762f45e73f75698ed6"`
    );
    await queryRunner.query(
      `ALTER TABLE "chat_users" DROP CONSTRAINT "FK_080a8a9184fde75b9bff47907e3"`
    );
    await queryRunner.query(`DROP TABLE "chat_users"`);
  }
}
