import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserSocketIdNullable1688306269363 implements MigrationInterface {
    name = 'UpdateUserSocketIdNullable1688306269363'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "socketId" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "socketId" SET NOT NULL`);
    }

}
