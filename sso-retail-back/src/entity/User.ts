import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Perfil } from './Perfil';


@Entity({ name: "sso-user" })
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 200, nullable: false })
    name: String;

    @Column({ length: 200, nullable: false })
    lastname: String;

    @Column({ length: 100, nullable: false })
    email: String;

    @Column({ length: 100, nullable: false })
    password: String;

    @Column({ nullable: false, default: true })
    active: Boolean;

    @ManyToMany(type => Perfil, { eager: true })
    @JoinTable()
    profiles: Perfil[]


    @Column({ length: 7, nullable: false })
    cep: String;

    @Column({ length: 200, nullable: false })
    logradouro: String;

    @Column({ length: 200, nullable: true })
    complemento: String;

    @Column({ length: 100, nullable: false })
    bairro: String;

    @Column({ length: 100, nullable: true })
    localidade: String;

    @Column({ length: 2, nullable: false })
    uf: String;

    @Column({ length: 2, nullable: true })
    unidade: String;

    @Column({ length: 10, nullable: false })
    ibge: String;

    @Column({ length: 100, nullable: false })
    gia: String;

}