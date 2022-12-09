import {
  Column,
  Model,
  Table,
  AllowNull,
  PrimaryKey,
  Unique,
  AutoIncrement,
  DataType,
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

  @AllowNull(true)
  @Column({ type: DataType.ARRAY(DataType.STRING) })
  users: string[];

  @AllowNull(false)
  @Column
  name: string;

  @Unique
  @AllowNull(true)
  @Column
  url: string;

  @AllowNull(true)
  @Column
  description: string;

  @AllowNull(false)
  @Column
  cosmos_chain_id: string;

  @AllowNull(true)
  @Column
  website: string;

  @AllowNull(true)
  @Column
  twitter_account: string;

  @AllowNull(true)
  @Column
  discord_url: string;

  @AllowNull(false)
  @Column
  end_date: Date;

  @AllowNull(true)
  @Column
  twitter_account_to_follow: string;

  @AllowNull(true)
  @Column
  tweet_to_like: string;

  @AllowNull(true)
  @Column
  tweet_to_retweet: string;

  @AllowNull(true)
  @Column
  discord_invite_link: string;

  @AllowNull(true)
  @Column
  server_role: string;

  @AllowNull(true)
  @Column
  require_email: string;
}
