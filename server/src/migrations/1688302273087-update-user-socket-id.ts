import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUserSocketId1688302273087 implements MigrationInterface {
  name = 'UpdateUserSocketId1688302273087';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" RENAME COLUMN "socketIds" TO "socketId"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "socketId"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "socketId" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "socketId"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "socketId" text array NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" RENAME COLUMN "socketId" TO "socketIds"`,
    );
  }
}
