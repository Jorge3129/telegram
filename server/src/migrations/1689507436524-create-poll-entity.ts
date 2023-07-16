import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePollEntity1689507436524 implements MigrationInterface {
  name = 'CreatePollEntity1689507436524';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "polls" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "question" character varying NOT NULL, "isAnonymous" boolean NOT NULL DEFAULT true, "isMultipleChoice" boolean NOT NULL DEFAULT false, "isQuiz" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_b9bbb8fc7b142553c518ddffbb6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "poll_votes" ("userId" uuid NOT NULL, "answerOptionId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_28accea801e5f21f4e5b3ae5c17" PRIMARY KEY ("userId", "answerOptionId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "poll_answer_options" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "text" character varying NOT NULL, "isCorrectOption" boolean, "optionIndex" integer NOT NULL, "pollId" uuid NOT NULL, CONSTRAINT "PK_1905e14e181c708a305e2ebdcd8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "poll_votes" ADD CONSTRAINT "FK_0281387f2c63687277cd175c4f4" FOREIGN KEY ("userId") REFERENCES "poll_answer_options"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "poll_votes" ADD CONSTRAINT "FK_b18e535581e130d2f9d88589ef0" FOREIGN KEY ("answerOptionId") REFERENCES "poll_answer_options"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "poll_answer_options" ADD CONSTRAINT "FK_fcb39fcb676d3f26dbe1c95527f" FOREIGN KEY ("pollId") REFERENCES "polls"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "poll_answer_options" DROP CONSTRAINT "FK_fcb39fcb676d3f26dbe1c95527f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "poll_votes" DROP CONSTRAINT "FK_b18e535581e130d2f9d88589ef0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "poll_votes" DROP CONSTRAINT "FK_0281387f2c63687277cd175c4f4"`,
    );
    await queryRunner.query(`DROP TABLE "poll_answer_options"`);
    await queryRunner.query(`DROP TABLE "poll_votes"`);
    await queryRunner.query(`DROP TABLE "polls"`);
  }
}
