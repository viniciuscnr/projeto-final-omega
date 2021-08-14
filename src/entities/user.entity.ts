import { Column, Entity, PrimaryColumn } from "typeorm";
import { Guid } from 'guid-typescript'

@Entity('users')
export class User {
    @PrimaryColumn({type: 'uuid', name: 'id' })
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    constructor() {
        this.id = Guid.create().toString()
}
}