import {SetMetadata, UseGuards} from '@nestjs/common';
import { applyDecorators } from '@nestjs/common';
import {AppAccessGuard} from "../guards/app-access.guard";
import {AccessLevelList} from "../enums/accessLevel.list"


export function AccessLevel( access_level: AccessLevelList ) {
    return applyDecorators(
        SetMetadata( "app_access_level", access_level ),
        UseGuards( AppAccessGuard ),
    );
}
