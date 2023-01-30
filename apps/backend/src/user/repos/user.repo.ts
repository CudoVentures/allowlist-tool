import {
  Column,
  Model,
  Table,
  AllowNull,
  PrimaryKey,
  Unique,
} from 'sequelize-typescript';
@Table({
  freezeTableName: true,
  tableName: 'users',
})

export class UserRepo extends Model {
  @Unique
  @PrimaryKey
  @AllowNull(false)
  @Column
  address: string;

  @AllowNull(true)
  @Column
  twitter_profile_id: string;

  @AllowNull(true)
  @Column
  discord_profile_id: string;
}
