import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialPoint1595786197242 implements MigrationInterface {
    name = 'InitialPoint1595786197242'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address" ("id" SERIAL NOT NULL, "cep" character varying(10) NOT NULL, "bairro" character varying(100) NOT NULL, "complemento" character varying(200), "localidade" character varying(100) NOT NULL, "logradouro" character varying(100) NOT NULL, "gia" character varying(100), "ibge" character varying(100), "uf" character varying(100) NOT NULL, "unidade" character varying(100), CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying(200) NOT NULL, "lastname" character varying(200) NOT NULL, "cpf" character varying(11) NOT NULL, "sexo" integer NOT NULL, "email" character varying(100) NOT NULL, "password" character varying(100) NOT NULL, "active" boolean NOT NULL DEFAULT true, "addressId" integer, CONSTRAINT "REL_217ba147c5de6c107f2fa7fa27" UNIQUE ("addressId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_217ba147c5de6c107f2fa7fa271" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_217ba147c5de6c107f2fa7fa271"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "address"`);
    }

}
