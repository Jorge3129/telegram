import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMessageReads1688301005942 implements MigrationInterface {
  name = "AddMessageReads1688301005942";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "message_reads" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" integer NOT NULL, "messageId" uuid NOT NULL, "readAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_7d3be462a9d7dfbbccc93c097e1" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "message_reads" ADD CONSTRAINT "FK_d73adf0e3689c233a1aceea2ffa" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "message_reads" ADD CONSTRAINT "FK_52bbdda5d68282f2b13b605dbf0" FOREIGN KEY ("messageId") REFERENCES "messages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "message_reads" DROP CONSTRAINT "FK_52bbdda5d68282f2b13b605dbf0"`
    );
    await queryRunner.query(
      `ALTER TABLE "message_reads" DROP CONSTRAINT "FK_d73adf0e3689c233a1aceea2ffa"`
    );
    await queryRunner.query(`DROP TABLE "message_reads"`);
  }
}
