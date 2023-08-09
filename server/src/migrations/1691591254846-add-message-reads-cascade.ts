import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMessageReadsCascade1691591254846 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "message_reads" DROP CONSTRAINT "FK_52bbdda5d68282f2b13b605dbf0"`,
    );

    await queryRunner.query(
      `ALTER TABLE "message_reads" ADD CONSTRAINT "FK_52bbdda5d68282f2b13b605dbf0" FOREIGN KEY ("messageId") REFERENCES "messages"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "message_reads" DROP CONSTRAINT "FK_52bbdda5d68282f2b13b605dbf0"`,
    );

    await queryRunner.query(
      `ALTER TABLE "message_reads" ADD CONSTRAINT "FK_52bbdda5d68282f2b13b605dbf0" FOREIGN KEY ("messageId") REFERENCES "messages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
