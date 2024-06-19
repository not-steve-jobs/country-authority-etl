import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('country_group')
export class CountryGroup {
  @PrimaryGeneratedColumn('uuid')
  public id?: string;

  @Column('varchar', { length: 100, unique: true })
  public name: string;

  @Column('varchar', { nullable: true })
  public description?: string;
}
