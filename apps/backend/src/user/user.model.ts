import {
  Column,
  Model,
  Table,
  AllowNull,
  PrimaryKey,
  Unique,
  AutoIncrement,
} from 'sequelize-typescript';
@Table({
  freezeTableName: true,
  tableName: 'users',
})
export class User extends Model {
  @Unique
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @Column
  address: string;

  @AllowNull(true)
  @Column
  twitter_profile_id: string;

  @AllowNull(true)
  @Column
  twitter_profile_username: string;

  @AllowNull(true)
  @Column
  twitter_access_token: string;

  @AllowNull(true)
  @Column
  twitter_refresh_token: string;

  @AllowNull(true)
  @Column
  discord_profile_id: string;

  @AllowNull(true)
  @Column
  discord_profile_username: string;

  @AllowNull(true)
  @Column
  discord_access_token: string;

  @AllowNull(true)
  @Column
  discord_refresh_token: string;
}
