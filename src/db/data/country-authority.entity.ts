import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('country_authority')
@Unique('UQ_COUNTRY_AUTHORITY-COUNTRYID-AUTHORITYID', ['countryId', 'authorityId'])
export class CountryAuthority {
  @PrimaryGeneratedColumn('uuid')
  public id?: string;

  @Column('uuid')
  public countryId: string;

  @Column('uuid')
  public authorityId: string;
}
