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
    tableName: 'twitter_users',
  })
  
  export class TwitterUserRepo extends Model {
    @Unique
    @PrimaryKey
    @AllowNull(false)
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
    twitter_refresh_token : string;
  }
  