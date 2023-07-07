import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveChatUserLastRead1688744023726 implements MigrationInterface {
  name = 'RemoveChatUserLastRead1688744023726';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "chat_users" DROP COLUMN "lastRead"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "chat_users" ADD "lastRead" TIMESTAMP NOT NULL`,
    );
  }
}
