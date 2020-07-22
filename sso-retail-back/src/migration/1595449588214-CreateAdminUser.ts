import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateAdminUser1595449588214 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO sso."sso-user"(name, lastname, email, password, active, cep,logradouro, complemento, bairro, localidade, uf, unidade, ibge, gia)VALUES ('Admin', 'Admin', 'admin@admin.com', '$2a$10$1k9jkqMR5lzZSdryESD/WOObq/Aq7QYy9PK9rVOWdtiRjZ/B76yvi', true, '69040080', 'Rua Brigadeiro João Camarão', '', 'Dom Pedro I', 'Manaus', 'AM', 'BR', '', '')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`delete from sso."sso-user"  where name = 'Admin' and lastname = 'Admin' and email = 'admin@admin.com'`);
    }

}
