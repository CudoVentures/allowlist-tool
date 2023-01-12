module.exports = {
  async up(queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable('allowlists', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          unique: true,
          type: Sequelize.INTEGER,
        },
        admin: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        users: {
          allowNull: false,
          type: Sequelize.ARRAY(Sequelize.STRING),
          defaultValue: [],
        },

        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        url: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: true,
        },
        description: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        cosmos_chain_id: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        website: {
          allowNull: true,
          type: Sequelize.STRING,
        },
        twitter_account: {
          allowNull: true,
          type: Sequelize.STRING,
        },
        discord_url: {
          allowNull: true,
          type: Sequelize.STRING,
        },
        end_date: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        image: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        banner_image: {
          allowNull: false,
          type: Sequelize.STRING,
        },

        twitter_account_to_follow: {
          allowNull: true,
          type: Sequelize.STRING,
          validate: {
            customValidator(value) {
              if (
                (!value &&
                  !this.tweet_to_like &&
                  !this.tweet_to_retweet &&
                  !this.discord_invite_link &&
                  !this.server_role) ||
                (!this.discord_invite_link && this.server_role)
              ) {
                throw new Error('Missing allowlist criteria');
              }
            },
          },
        },
        tweet_to_like: {
          allowNull: true,
          type: Sequelize.STRING,
          validate: {
            customValidator(value) {
              if (
                (!value &&
                  !this.twitter_account_to_follow &&
                  !this.tweet_to_retweet &&
                  !this.discord_invite_link &&
                  !this.server_role) ||
                (!this.discord_invite_link && this.server_role)
              ) {
                throw new Error('Missing allowlist criteria');
              }
            },
          },
        },
        tweet_to_retweet: {
          allowNull: true,
          type: Sequelize.STRING,
          validate: {
            customValidator(value) {
              if (
                (!value &&
                  !this.twitter_account_to_follow &&
                  !this.tweet_to_like &&
                  !this.discord_invite_link &&
                  !this.server_role) ||
                (!this.discord_invite_link && this.server_role)
              ) {
                throw new Error('Missing allowlist criteria');
              }
            },
          },
        },
        discord_invite_link: {
          allowNull: true,
          type: Sequelize.STRING,
          validate: {
            customValidator(value) {
              if (
                (!value &&
                  !this.twitter_account_to_follow &&
                  !this.tweet_to_like &&
                  !this.tweet_to_retweet &&
                  !this.server_role) ||
                (!value && this.server_role)
              ) {
                throw new Error('Missing allowlist criteria');
              }
            },
          },
        },
        server_role: {
          allowNull: true,
          type: Sequelize.STRING,
          validate: {
            customValidator(value) {
              if (
                (!value &&
                  !this.twitter_account_to_follow &&
                  !this.tweet_to_like &&
                  !this.tweet_to_retweet &&
                  !this.discord_invite_link) ||
                (value && !this.discord_invite_link)
              ) {
                throw new Error('Missing allowlist criteria');
              }
            },
          },
        },
        require_email: {
          allowNull: true,
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },

        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      });

      await t.commit();
    } catch (error) {
      await t.rollback();
    }
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  },
};
