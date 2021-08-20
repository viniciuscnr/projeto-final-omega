import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('proposals')
export class Proposal {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({type: 'date'})
    initialdate: Date;
    @Column({type: 'date'})
    finaldate: Date;
    @Column({type: 'json', array: false, default: () => "'[]'"})
    charges:[{
        companyname: string,
        kwhconsumption: number
    }];
    @Column({type: 'integer'})
    totalconsumption: number;
    @Column({type: 'text'})
    supplytype: "CONVENCIONAL" | "RENOVÁVEL";
    @Column({type: 'text'})
    submarket: "NORTE" | "NORDESTE" | "SUL" | "SUDESTE";
    @Column({type: 'boolean'})
    hired: boolean;
    @Column({type: 'double precision'})
    proposalvalue: number;

    @ManyToOne(() => User, (user: User) => user.proposals)
    user: User;
}
