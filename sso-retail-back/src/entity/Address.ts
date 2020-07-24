
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: "address" })
export class Address {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 10, nullable: false })
  cep: string;

  @Column({ length: 100, nullable: false })
  bairro: string;

  @Column({ length: 200, nullable: true })
  complemento: string;
  
  @Column({ length: 100, nullable: false })
  localidade: string;

  @Column({ length: 100, nullable: false })
  logradouro: string;

  @Column({ length: 100, nullable: true })
  gia: string;

  @Column({ length: 100, nullable: true })
  ibge: string;
  
  @Column({ length: 100, nullable: false })
  uf: string;
  
  @Column({ length: 100, nullable: true })
  unidade: string;

}
