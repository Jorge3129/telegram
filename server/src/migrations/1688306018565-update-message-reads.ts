import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateMessageReads1688306018565 implements MigrationInterface {
  name = 'UpdateMessageReads1688306018565';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "message_reads" ALTER COLUMN "readAt" SET DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "message_reads" ALTER COLUMN "readAt" DROP DEFAULT`,
    );
  }
}
