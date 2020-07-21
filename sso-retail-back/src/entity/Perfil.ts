import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import { User } from './User';


@Entity({ name: "sso-profile" })
export class Perfil {

  @PrimaryGeneratedColumn({ name: "perf_id" })
  id: number;

  @Column({ length: 40, nullable: false })
  name: String;


}
