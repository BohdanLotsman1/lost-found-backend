import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {AccessLevelList} from "../enums/accessLevel.list";
import {AuthorizedRequest} from "../middleware/userVerify.middleware";

// Checks if a user has access to an app. Checks permissions on controller basis level
@Injectable()
export class AppAccessGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
    ) {}

    async canActivate( context: ExecutionContext ): Promise<boolean> {
        const request: AuthorizedRequest = context.switchToHttp().getRequest();

        const requiredAccessLevel: AccessLevelList =
            this.reflector.getAllAndOverride('app_access_level', [context.getHandler(),context.getClass()] );

            
        if ( request.accessLevel === AccessLevelList.LEVEL_SUPER) {
            return true;
        }

        if ( requiredAccessLevel !== request.accessLevel ) {
            return false;
        }
        
       


        return true;
    }
}
