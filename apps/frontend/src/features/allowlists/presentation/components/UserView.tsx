import React, { Fragment, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Box, Typography, Divider, List, ListItem, Input, Button } from '@mui/material'

import { SvgComponent, LAYOUT_CONTENT_TEXT } from '../../../../core/presentation/components/Layout/helpers'
import { COLORS_DARK_THEME } from '../../../../core/theme/colors'
import { RootState } from '../../../../core/store'
import { signNonceMsg } from '../../../wallets/helpers'
import { FetchedAllowlist } from '../../../../core/store/allowlist'
import { SocialMediaBoxes } from './helpers'

import { allowListStyles, generalStyles, allowlistPreviewStyles } from './styles'

const UserView = ({ props }: { props: FetchedAllowlist }) => {

    const { connectedAddress, connectedWallet } = useSelector((state: RootState) => state.userState)
    const [userEmail, setUserEmail] = useState<string>('')
    const [checkBoxes, setCheckBoxes] = useState<Record<string, boolean>>({})

    const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>, isOn: boolean) => {
        setCheckBoxes({
            ...checkBoxes,
            [e.target.value]: isOn
        })
    }

    const signUp = async () => {
        const userRes = await axios.get(`api/v1/user`);
        const data = {};
        if (userRes.data.twitter_access_token) {
            data['twitter_access_token'] = userRes.data.twitter_access_token;
        }
        if (userRes.data.discord_access_token) {
            data['discord_access_token'] = userRes.data.discord_access_tokens;
        }

        const message = JSON.stringify(data);

        const url = `/api/v1/allowlist/join/${props.id}`;
        const {
            signature,
            chainId: chain_id,
            sequence,
            accountNumber: account_number,
        } = await signNonceMsg(connectedAddress, connectedWallet, message);

        try {
            await axios.post(url, {
                signature,
                connectedAddress,
                message,
                sequence,
                account_number,
                chain_id,
                userEmail,
            });
            alert('success');
        } catch (ex) {
            console.error(ex);
        }
    };

    return (
        <Fragment>
            <Box sx={allowListStyles.title}>
                <Typography variant='h6' fontWeight={700}>
                    Register for Allowlist Name
                </Typography>
                <Typography variant='subtitle1' color={COLORS_DARK_THEME.PRIMARY_STEEL_GRAY_20}>
                    Complete the following to register.
                </Typography>
            </Box>
            <Divider sx={{ width: '100%' }} />
            <SocialMediaBoxes handleCheckbox={handleCheckbox} props={props} />
            {!props.require_email ? null :
                <Fragment>
                    <Divider sx={{ width: '100%' }} />
                    <Box id='userEmailInput'>
                        <Box>
                            <Typography display={'flex'} alignItems='center' fontWeight={600}>
                                <SvgComponent
                                    type={LAYOUT_CONTENT_TEXT.EnvelopIcon}
                                    style={generalStyles.titleIcons}
                                />
                                Provide your email address
                            </Typography>
                            <List sx={{ ...allowlistPreviewStyles.list, color: COLORS_DARK_THEME.PRIMARY_STEEL_GRAY_20 }}>
                                <ListItem sx={allowlistPreviewStyles.listItem}>
                                    The collection creator will send you updates via email
                                </ListItem>
                                <ListItem sx={allowlistPreviewStyles.listItem}>
                                    {`${props.website} will send you a confirmation by email if you make the ${props.name} successfully`}
                                </ListItem>
                            </List>
                        </Box>
                        <Input placeholder='johndoe@mail.com' disableUnderline type='text'
                            sx={generalStyles.input}
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                        />
                    </Box>
                </Fragment>}
            <Button
                variant="contained"
                sx={{ height: '56px', width: '100%' }}
                onClick={signUp}
            >
                SignUp
            </Button>
        </Fragment>
    )
}

export default UserView
