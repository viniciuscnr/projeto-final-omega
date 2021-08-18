import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Proposal } from "./proposal.entity";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'text'})
    name: string;

    @Column({type: 'text'})
    email: string;

    @Column({type: 'text'})
    password: string;

    @JoinColumn({name: 'user_id'})
    @OneToMany(() => Proposal, (proposal:Proposal) => proposal.user, {cascade:true})
    proposals: Array<Proposal>;
}