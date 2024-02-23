import { Entity, OneToMany } from "typeorm"
import { Store as MedusaStore } from "@medusajs/medusa"
import { User } from './user';

@Entity()
export class Store extends MedusaStore {
  // TODO add relations
  @OneToMany(() => User, user => user?.store)
  members?: User[];
}