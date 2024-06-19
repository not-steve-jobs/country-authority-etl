import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('country_to_country_group')
@Unique('UQ_COUNTRY_TO_COUNTRY_GROUP-COUNTRYID-COUNTRYGROUPID', ['countryGroupId', 'countryId'])
export class CountryToCountryGroup {
  @PrimaryGeneratedColumn('uuid')
  public id?: string;

  @Column('uuid')
  public countryGroupId: string;

  @Column('uuid')
  public countryId: string;
}
