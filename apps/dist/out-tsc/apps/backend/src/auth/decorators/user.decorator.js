import { createParamDecorator } from '@nestjs/common';
export const CurrentUser = createParamDecorator((data, context) => {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return data ? user?.[data] : user;
});
//# sourceMappingURL=user.decorator.js.map