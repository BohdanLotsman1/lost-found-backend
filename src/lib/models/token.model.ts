import {AccessLevelList} from "../enums/accessLevel.list";

export interface IToken {
    sub: string;
    access_verify: string;
    access_token: string;
    metadata: {
        role: AccessLevelList
        user_id:string
        fid?: string[];
    },
    iat: number;
    exp: number;
}