import { Column, Entity, Index, JoinColumn, OneToOne, OneToMany, ManyToOne } from "typeorm"
import {
  User as MedusaUser,
} from "@medusajs/medusa"
import { WalletAddress } from './walletAddress';
import { Store } from './store';

@Entity()
export class User extends MedusaUser {

  // @OneToMany(() => WalletAddress, walletAddress => walletAddress.user)
  // walletAddresses?: WalletAddress[];

  @Index("UserStoreId")
  @Column({ nullable: true })
  store_id?: string;

  @ManyToOne(() => Store, (store) => store.members)
  @JoinColumn({ name: "store_id", referencedColumnName: "id"})
  store?: Store;
}