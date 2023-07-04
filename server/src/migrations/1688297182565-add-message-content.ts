import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMessageContent1688297182565 implements MigrationInterface {
  name = 'AddMessageContent1688297182565';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "message_contents" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "textContent" text, "type" character varying NOT NULL, CONSTRAINT "PK_03279c256f7af6160464f6a1515" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9169bf6ee9621c9ed785a6d5a2" ON "message_contents" ("type") `,
    );
    await queryRunner.query(
      `CREATE TABLE "media" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fileName" character varying NOT NULL, "mimeType" character varying NOT NULL, "messageContentId" uuid, CONSTRAINT "PK_f4e0fcac36e050de337b670d8bd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "media" ADD CONSTRAINT "FK_d19454a35113944c92801dbd31b" FOREIGN KEY ("messageContentId") REFERENCES "message_contents"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "media" DROP CONSTRAINT "FK_d19454a35113944c92801dbd31b"`,
    );
    await queryRunner.query(`DROP TABLE "media"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9169bf6ee9621c9ed785a6d5a2"`,
    );
    await queryRunner.query(`DROP TABLE "message_contents"`);
  }
}
