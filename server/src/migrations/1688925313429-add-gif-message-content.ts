import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddGifMessageContent1688925313429 implements MigrationInterface {
  name = 'AddGifMessageContent1688925313429';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "message_contents" ADD "srcObject" jsonb`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "message_contents" DROP COLUMN "srcObject"`,
    );
  }
}
