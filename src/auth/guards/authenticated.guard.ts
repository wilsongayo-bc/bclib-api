import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

@Injectable()
export class AuthenticatedGuard implements CanActivate{
    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        console.log('AuthenticatedGuard',request.isAuthenticated());
        return request.isAuthenticated();
    }
}