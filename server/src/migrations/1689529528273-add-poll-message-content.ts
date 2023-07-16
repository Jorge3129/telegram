import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPollMessageContent1689529528273 implements MigrationInterface {
  name = 'AddPollMessageContent1689529528273';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "message_contents" ADD "pollId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "message_contents" ADD CONSTRAINT "FK_a7fbe42d3982d4ac5a8249e69f2" FOREIGN KEY ("pollId") REFERENCES "polls"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "message_contents" DROP CONSTRAINT "FK_a7fbe42d3982d4ac5a8249e69f2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "message_contents" DROP COLUMN "pollId"`,
    );
  }
}
