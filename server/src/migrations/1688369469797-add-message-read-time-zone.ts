import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMessageReadTimeZone1688369469797 implements MigrationInterface {
  name = 'AddMessageReadTimeZone1688369469797';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "message_reads" DROP COLUMN "readAt"`);
    await queryRunner.query(
      `ALTER TABLE "message_reads" ADD "readAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "message_reads" DROP COLUMN "readAt"`);
    await queryRunner.query(
      `ALTER TABLE "message_reads" ADD "readAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
  }
}
