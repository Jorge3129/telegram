import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMessageEditedField1688812419967 implements MigrationInterface {
  name = 'AddMessageEditedField1688812419967';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "messages" ADD "edited" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "edited"`);
  }
}
