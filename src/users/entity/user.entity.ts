import { Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    fullname: string;

    @Column({ nullable: false })
    email: string;

    @Column({ nullable: false })
    password : string;
}
