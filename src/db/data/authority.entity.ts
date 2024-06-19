import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('authority')
export class Authority {
  @PrimaryGeneratedColumn('uuid')
  public id?: string;

  @Column('varchar', { unique: true })
  public fullCode: string;

  @Column('varchar', { length: 100 })
  public name: string;
}
