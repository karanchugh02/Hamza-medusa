import { Column, Entity, Index, JoinColumn, OneToOne, OneToMany } from "typeorm"
import {
  User as MedusaUser,
} from "@medusajs/medusa"
import { WalletAddress } from './walletAddress';

@Entity()
export class User extends MedusaUser {

  @OneToMany(() => WalletAddress, walletAddress => walletAddress.user)
  walletAddresses!: WalletAddress[];
}