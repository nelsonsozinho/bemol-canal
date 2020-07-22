import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialPoint1595449567590 implements MigrationInterface {
    name = 'InitialPoint1595449567590'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sso"."sso-profile" ("perf_id" SERIAL NOT NULL, "name" character varying(40) NOT NULL, CONSTRAINT "PK_484a8a81caf29fc2071569c9e31" PRIMARY KEY ("perf_id"))`);
        await queryRunner.query(`CREATE TABLE "sso"."sso-user" ("id" SERIAL NOT NULL, "name" character varying(200) NOT NULL, "lastname" character varying(200) NOT NULL, "email" character varying(100) NOT NULL, "password" character varying(100) NOT NULL, "active" boolean NOT NULL DEFAULT true, "cep" character varying(8) NOT NULL, "logradouro" character varying(200) NOT NULL, "complemento" character varying(200), "bairro" character varying(100) NOT NULL, "localidade" character varying(100), "uf" character varying(2) NOT NULL, "unidade" character varying(2), "ibge" character varying(10) NOT NULL, "gia" character varying(100) NOT NULL, CONSTRAINT "PK_d7a6bf99317d8999fe0bb683b13" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sso"."sso-user_profiles_sso-profile" ("ssoUserId" integer NOT NULL, "ssoProfilePerfId" integer NOT NULL, CONSTRAINT "PK_f57589127eccc6b9d0224ab6751" PRIMARY KEY ("ssoUserId", "ssoProfilePerfId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_24938d78ba16fcc4af1aa7b76e" ON "sso"."sso-user_profiles_sso-profile" ("ssoUserId") `);
        await queryRunner.query(`CREATE INDEX "IDX_edf9f2ef3c3655eca84c13a207" ON "sso"."sso-user_profiles_sso-profile" ("ssoProfilePerfId") `);
        await queryRunner.query(`ALTER TABLE "sso"."sso-user_profiles_sso-profile" ADD CONSTRAINT "FK_24938d78ba16fcc4af1aa7b76ee" FOREIGN KEY ("ssoUserId") REFERENCES "sso"."sso-user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sso"."sso-user_profiles_sso-profile" ADD CONSTRAINT "FK_edf9f2ef3c3655eca84c13a2076" FOREIGN KEY ("ssoProfilePerfId") REFERENCES "sso"."sso-profile"("perf_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sso"."sso-user_profiles_sso-profile" DROP CONSTRAINT "FK_edf9f2ef3c3655eca84c13a2076"`);
        await queryRunner.query(`ALTER TABLE "sso"."sso-user_profiles_sso-profile" DROP CONSTRAINT "FK_24938d78ba16fcc4af1aa7b76ee"`);
        await queryRunner.query(`DROP INDEX "sso"."IDX_edf9f2ef3c3655eca84c13a207"`);
        await queryRunner.query(`DROP INDEX "sso"."IDX_24938d78ba16fcc4af1aa7b76e"`);
        await queryRunner.query(`DROP TABLE "sso"."sso-user_profiles_sso-profile"`);
        await queryRunner.query(`DROP TABLE "sso"."sso-user"`);
        await queryRunner.query(`DROP TABLE "sso"."sso-profile"`);
    }

}
