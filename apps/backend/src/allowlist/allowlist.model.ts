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
  tableName: 'allowlists',
})
export class Allowlist extends Model {
  @Unique
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @Column
  admin: string;

  @AllowNull(false)
  @Column
  name: string;

  @AllowNull(true)
  @Column
  description: string;

  @AllowNull(false)
  @Column
  end_date: Date;

  @AllowNull(true)
  @Column
  twitter_account: string;

  @AllowNull(true)
  @Column
  tweet: string;

  @AllowNull(true)
  @Column
  discord_server: string;

  @AllowNull(true)
  @Column
  server_role: string;

  @AllowNull(false)
  @Column
  cosmos_chain_id: string;
}
