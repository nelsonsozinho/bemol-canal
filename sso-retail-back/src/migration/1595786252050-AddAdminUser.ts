import {MigrationInterface, QueryRunner} from "typeorm";

export class AddAdminUser1595786252050 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO address(id, cep, bairro, complemento, localidade, logradouro, gia, ibge, uf, unidade)VALUES (1,'69040080', 'Dom Pedro I', '',  'Manaus', 'Rua Brigadeiro João Camarão', '', '1302603', 'AM', '')`);
        await queryRunner.query(`INSERT INTO "user"(id, name, lastname, email, password, active, "addressId", cpf, sexo) VALUES (20, 'Admin', 'Admin', 'admin@admin.com', '$2a$10$UUbQDC/4uPzO75so7ARgT.AKEB7s9On139jWGenSqVDNs/PzaUpy2', true, 1, '11322189005', 1)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
