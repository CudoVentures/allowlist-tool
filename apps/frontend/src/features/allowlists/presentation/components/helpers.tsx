import { Box, Button, Tooltip } from "@mui/material";



import { RootState } from "../../../../core/store";
import { StdSignature } from "cudosjs";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { AnyAction, Dispatch } from "redux";
import { CollectedData, OptionalAllowlistData, RequiredAllowlistData, updateAllowlistObject } from "../../../../core/store/allowlist";
import { signNonceMsg } from "../../../wallets/helpers";
import { SOCIAL_MEDIA } from "../../../../core/store/user";
import { LAYOUT_CONTENT_TEXT, SvgComponent } from "../../../../core/presentation/components/Layout/helpers";
import { COLORS_DARK_THEME } from "../../../../core/theme/colors";

import { generalStyles } from "./styles";

declare let Config: { REACT_APP_DISCORD_CLIENT_ID: any; };

export const acceptedImgTypes = ['png', 'jpeg', 'jpg', 'svg']

export const fileToDataUri = async (file: any) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            resolve(event.target.result);
        };
        reader.readAsDataURL(file);
    });
};

export const onChange = (e: any, stateFunc: React.Dispatch<React.SetStateAction<string>>) => {
    stateFunc(e.target.value);
};

export const onImageChange = (
    type: 'image' | 'banner',
    file: Blob | MediaSource,
    setState: Dispatch<AnyAction>,
) => {

    if (!file) {
        if (type === 'image') {
            setState(updateAllowlistObject({ image: '' }));
            return
        }
        setState(updateAllowlistObject({ banner_image: '' }));
        return;
    }

    fileToDataUri(file).then((data) => {
        if (type === 'image') {
            setState(updateAllowlistObject({ image: data as string }));
        } else {
            setState(updateAllowlistObject({ banner_image: data as string }));
        }
    });
};

export const addDiscordBot = () => {
    window.open(
        `https://discord.com/api/oauth2/authorize?client_id=${Config.REACT_APP_DISCORD_CLIENT_ID}&permissions=0&scope=bot`,
    );
};

export const onClickAuth = async (service: string) => {
    const url = `api/v1/auth/${service}/login`;
    window.open(url, '_self');
};

export const SocialMediaButtons = () => {

    const { connectedSocialMedia } = useSelector((state: RootState) => state.userState)

    return (
        <Box gap={1} display='flex'>
            <Tooltip title={`Login with Twitter`}>
                <Button
                    variant="text"
                    sx={{ height: '40px' }}
                    onClick={() => onClickAuth(SOCIAL_MEDIA.twitter)}
                >
                    <SvgComponent
                        type={LAYOUT_CONTENT_TEXT.TwitterIcon}
                        style={{ width: '25px', height: '25px', color: connectedSocialMedia?.twitter ? 'inherit' : COLORS_DARK_THEME.PRIMARY_STEEL_GRAY_50 }}
                    />
                </Button>
            </Tooltip>
            <Tooltip title={`${connectedSocialMedia?.discord ? 'Logged in' : 'Login'} with Discord`}>
                <Button
                    variant="text"
                    sx={{ height: '40px', color: connectedSocialMedia?.discord ? 'inherit' : COLORS_DARK_THEME.PRIMARY_STEEL_GRAY_50 }}
                    onClick={() => onClickAuth(SOCIAL_MEDIA.discord)}
                >
                    <SvgComponent
                        type={LAYOUT_CONTENT_TEXT.DiscordIcon}
                        style={{ width: '25px', height: '25px' }}
                    />
                </Button>
            </Tooltip>
        </Box >
    )
}

export const isValidStepOne = (data: CollectedData): boolean => {
    return true
    if (
        data.name &&
        data.url &&
        data.description &&
        data.cosmos_chain_id &&
        data.website &&
        data.discord_url &&
        data.twitter_account &&
        data.image &&
        data.banner_image &&
        data.end_date
    ) { return true }

    return false
}

export const isValidStepTwo = (data: CollectedData) => {

    if (
        data.twitter_account_to_follow ||
        data.tweet ||
        data.discord_server && data.server_role ||
        data.require_email
    ) {
        return true
    }

    return false
}

export const isValidOptionalData = (data: OptionalAllowlistData): boolean => {

    //TODO: What are the criteria for the optional data?
    return true
}

