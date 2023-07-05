import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMessageReadUnique1688366681772 implements MigrationInterface {
  name = 'AddMessageReadUnique1688366681772';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_9f3112be42aa2424337e15e5ae" ON "message_reads" ("userId", "messageId") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9f3112be42aa2424337e15e5ae"`,
    );
  }
}
