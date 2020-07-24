import { Address } from './Address';
import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";



@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 200, nullable: false })
    name: String;

    @Column({ length: 200, nullable: false })
    lastname: String;

    @Column({ length: 11, nullable: false })
    cpf: String

    @Column({ nullable: false })
    sexo: number

    @Column({ length: 100, nullable: false })
    email: String;

    @Column({ length: 100, nullable: false })
    password: String;

    @Column({ nullable: false, default: true })
    active: Boolean;

    @OneToOne(type => Address)
    @JoinColumn()
    address: Address;
    
}