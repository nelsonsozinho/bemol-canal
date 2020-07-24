import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedCpfAttribute1595626022651 implements MigrationInterface {
    name = 'AddedCpfAttribute1595626022651'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sso"."user" ADD "cpf" character varying(11) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sso"."user" ADD "sexo" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sso"."user" DROP COLUMN "sexo"`);
        await queryRunner.query(`ALTER TABLE "sso"."user" DROP COLUMN "cpf"`);
    }

}
