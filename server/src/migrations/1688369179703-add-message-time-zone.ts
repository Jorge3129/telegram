import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMessageTimeZone1688369179703 implements MigrationInterface {
  name = "AddMessageTimeZone1688369179703";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "timestamp"`);
    await queryRunner.query(
      `ALTER TABLE "messages" ADD "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "timestamp"`);
    await queryRunner.query(
      `ALTER TABLE "messages" ADD "timestamp" TIMESTAMP NOT NULL`
    );
  }
}
