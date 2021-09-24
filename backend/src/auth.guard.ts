import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { TokensService } from './auth/tokens/tokens.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly tokensService: TokensService,
    private reflector: Reflector,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const allowUnauthorizedRequest = this.reflector.get<boolean>(
      'allowUnauthorizedRequest',
      context.getHandler(),
    );
    if (allowUnauthorizedRequest) {
      return true;
    }

    const authHeader = request.headers.authorization;
    const accessToken = authHeader?.split(' ')[1];
    console.log(accessToken);
    if (!accessToken || !authHeader) {
      throw new UnauthorizedException();
    }
    const userData = this.tokensService.validateAccessToken(accessToken);
    if (!userData) {
      throw new UnauthorizedException();
    }
    request.user = userData;
    return true;
  }
}
