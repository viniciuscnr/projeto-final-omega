import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('proposals')
export class Proposal {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({type: 'date'})
    initialdate: Date;
    @Column({type: 'date'})
    finaldate: Date;
    @Column({type: 'text'})
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
}
