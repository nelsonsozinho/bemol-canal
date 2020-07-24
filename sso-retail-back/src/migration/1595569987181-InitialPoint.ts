import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialPoint1595569987181 implements MigrationInterface {
    name = 'InitialPoint1595569987181'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sso"."address" ("id" SERIAL NOT NULL, "cep" character varying(10) NOT NULL, "bairro" character varying(100) NOT NULL, "complemento" character varying(200), "localidade" character varying(100) NOT NULL, "logradouro" character varying(100) NOT NULL, "gia" character varying(100), "ibge" character varying(100), "uf" character varying(100) NOT NULL, "unidade" character varying(100), CONSTRAINT "PK_e721a23659c5be7e17842494802" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sso"."user" ("id" SERIAL NOT NULL, "name" character varying(200) NOT NULL, "lastname" character varying(200) NOT NULL, "email" character varying(100) NOT NULL, "password" character varying(100) NOT NULL, "active" boolean NOT NULL DEFAULT true, "addressId" integer, CONSTRAINT "REL_feb944d9be630566033fee1882" UNIQUE ("addressId"), CONSTRAINT "PK_ceae5cfb3724e58449c42732031" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "sso"."user" ADD CONSTRAINT "FK_feb944d9be630566033fee18827" FOREIGN KEY ("addressId") REFERENCES "sso"."address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sso"."user" DROP CONSTRAINT "FK_feb944d9be630566033fee18827"`);
        await queryRunner.query(`DROP TABLE "sso"."user"`);
        await queryRunner.query(`DROP TABLE "sso"."address"`);
    }

}
