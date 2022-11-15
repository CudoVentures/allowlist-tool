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
  profile_id: string;

  @AllowNull(false)
  @Column
  access_token: string;

  @AllowNull(false)
  @Column
  address: string;
}
