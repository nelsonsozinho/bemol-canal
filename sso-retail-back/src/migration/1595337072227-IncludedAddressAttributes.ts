import {MigrationInterface, QueryRunner} from "typeorm";

export class UserInitialPoint1595337072227 implements MigrationInterface {
    name = 'UserInitialPoint1595337072227'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sso"."sso-user" ADD "cep" character varying(7) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sso"."sso-user" ADD "logradouro" character varying(200) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sso"."sso-user" ADD "complemento" character varying(200)`);
        await queryRunner.query(`ALTER TABLE "sso"."sso-user" ADD "bairro" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sso"."sso-user" ADD "localidade" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "sso"."sso-user" ADD "uf" character varying(2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sso"."sso-user" ADD "unidade" character varying(2)`);
        await queryRunner.query(`ALTER TABLE "sso"."sso-user" ADD "ibge" character varying(10) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sso"."sso-user" ADD "gia" character varying(100) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sso"."sso-user" DROP COLUMN "gia"`);
        await queryRunner.query(`ALTER TABLE "sso"."sso-user" DROP COLUMN "ibge"`);
        await queryRunner.query(`ALTER TABLE "sso"."sso-user" DROP COLUMN "unidade"`);
        await queryRunner.query(`ALTER TABLE "sso"."sso-user" DROP COLUMN "uf"`);
        await queryRunner.query(`ALTER TABLE "sso"."sso-user" DROP COLUMN "localidade"`);
        await queryRunner.query(`ALTER TABLE "sso"."sso-user" DROP COLUMN "bairro"`);
        await queryRunner.query(`ALTER TABLE "sso"."sso-user" DROP COLUMN "complemento"`);
        await queryRunner.query(`ALTER TABLE "sso"."sso-user" DROP COLUMN "logradouro"`);
        await queryRunner.query(`ALTER TABLE "sso"."sso-user" DROP COLUMN "cep"`);
    }

}
