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
    tableName: 'discord_users',
  })
  export class DiscordUserRepo extends Model {
    @Unique
    @PrimaryKey
    @AllowNull(false)
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