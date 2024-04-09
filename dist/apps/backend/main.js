/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

;// CONCATENATED MODULE: external "@anatine/zod-nestjs"
const zod_nestjs_namespaceObject = require("@anatine/zod-nestjs");
;// CONCATENATED MODULE: external "@nestjs/core"
const core_namespaceObject = require("@nestjs/core");
;// CONCATENATED MODULE: external "@sentry/node"
const node_namespaceObject = require("@sentry/node");
;// CONCATENATED MODULE: external "express"
const external_express_namespaceObject = require("express");
;// CONCATENATED MODULE: external "helmet"
const external_helmet_namespaceObject = require("helmet");
var external_helmet_default = /*#__PURE__*/__webpack_require__.n(external_helmet_namespaceObject);
;// CONCATENATED MODULE: external "nest-openapi-tools"
const external_nest_openapi_tools_namespaceObject = require("nest-openapi-tools");
;// CONCATENATED MODULE: external "tslib"
const external_tslib_namespaceObject = require("tslib");
;// CONCATENATED MODULE: external "@nestjs/cache-manager"
const cache_manager_namespaceObject = require("@nestjs/cache-manager");
;// CONCATENATED MODULE: external "@nestjs/common"
const common_namespaceObject = require("@nestjs/common");
;// CONCATENATED MODULE: external "@nestjs/throttler"
const throttler_namespaceObject = require("@nestjs/throttler");
;// CONCATENATED MODULE: ./src/app.controller.ts


let AppController = class AppController {
};
AppController = (0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Controller)()
], AppController);


;// CONCATENATED MODULE: ./src/app.service.ts


let AppService = class AppService {
};
AppService = (0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Injectable)()
], AppService);


;// CONCATENATED MODULE: external "@prisma/client"
const client_namespaceObject = require("@prisma/client");
;// CONCATENATED MODULE: ./src/utils/services/prisma.service.ts
var PrismaService_1;



let PrismaService = PrismaService_1 = class PrismaService extends client_namespaceObject.PrismaClient {
    constructor() {
        super();
        if (!PrismaService_1.instance) {
            PrismaService_1.instance = this;
        }
        return PrismaService_1.instance;
    }
    async onModuleInit() {
        await this.$connect();
    }
};
PrismaService = PrismaService_1 = (0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Injectable)()
    // inject config service here
    ,
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", [])
], PrismaService);

let prisma;
if (process.env['NODE_ENV'] === 'production') {
    prisma = new PrismaService();
}
else {
    if (!global.prisma) {
        global.prisma = new PrismaService();
    }
    prisma = global.prisma;
}
/* harmony default export */ const prisma_service = (prisma);

;// CONCATENATED MODULE: ./src/activity/activity.service.ts
var _a;



let ActivityService = class ActivityService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(createActivityDto) {
        return this.prisma.activity.create({
            data: {
                type: createActivityDto.type,
                importance: createActivityDto.importance,
                ...(createActivityDto.userId && {
                    user: {
                        connect: {
                            id: createActivityDto.userId
                        }
                    }
                }),
                ...(createActivityDto.genreSlug && {
                    genre: {
                        connect: {
                            slug: createActivityDto.genreSlug
                        }
                    }
                }),
                ...(createActivityDto.bookSlug && {
                    book: {
                        connect: {
                            slug: createActivityDto.bookSlug
                        }
                    }
                })
            }
        });
    }
};
ActivityService = (0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Injectable)(),
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", [typeof (_a = typeof PrismaService !== "undefined" && PrismaService) === "function" ? _a : Object])
], ActivityService);


;// CONCATENATED MODULE: external "@nestjs/config"
const config_namespaceObject = require("@nestjs/config");
;// CONCATENATED MODULE: external "@nestjs/jwt"
const jwt_namespaceObject = require("@nestjs/jwt");
;// CONCATENATED MODULE: ../../libs/global/errors.ts
const authErrors = {
    invalidGoogleToken: 'Invalid google token',
    passwordOrEmailInvalid: 'Email or password invalid',
    InvalidRefreshToken: 'Invalid refresh token',
    userExist: 'User already exist',
    userNotFound: 'User not found'
};
const bookErrors = {
    storedBookNotFound: 'Stored book not found',
    storedBookInvalid: 'Stored book invalid',
    bookNotFound: 'Book not found'
};
const genreErrors = {
    genresAlreadyExist: 'Genres already exist'
};
const UserErrors = {};
const globalErrors = {
    invalidValue: 'Invalid value provided',
    somethingWrong: 'Something went wrong, please try again later',
    unknownError: 'Unknown error, please try again later',
    noValidParameters: 'No valid parameters'
};
const adminErrors = {
    notEnoughRights: 'Not enough rights',
    // parser
    invalidChapter: 'Invalid chapter',
    //file
    invalidFile: 'Invalid file',
    invalidFolder: 'Invalid folder',
    //book
    bookNotFound: 'Book not found',
    bookAlreadyExist: 'Book already exist',
    //user
    userNotFound: 'User not found',
    //'No valid parameters',
    someConfigMissing: 'Some config is missing'
};

;// CONCATENATED MODULE: ../../libs/global/helpers/time-format.ts
function formatYYYYMMDD(date = new Date()) {
    const year = date.toLocaleString('default', { year: 'numeric' });
    const month = date.toLocaleString('default', {
        month: '2-digit'
    });
    const day = date.toLocaleString('default', { day: '2-digit' });
    return [year, month, day].join('-');
}
function timeAgo(date) {
    const formatter = new Intl.RelativeTimeFormat('en');
    const ranges = {
        years: 3600 * 24 * 365,
        months: 3600 * 24 * 30,
        weeks: 3600 * 24 * 7,
        days: 3600 * 24,
        hours: 3600,
        minutes: 60,
        seconds: 1
    };
    const secondsElapsed = (date.getTime() - Date.now()) / 1000;
    for (const key in ranges) {
        //@ts-ignore
        const rangeKey = ranges[key];
        if (!rangeKey)
            continue;
        if (!(rangeKey < Math.abs(secondsElapsed)))
            continue;
        const delta = secondsElapsed / rangeKey;
        return formatter.format(Math.round(delta), key);
    }
    return 'Just now';
}

;// CONCATENATED MODULE: ../../libs/global/utils/activity-transformer.ts

const timeFormat = (date) => ('0' + new Date(date).getHours()).slice(-2) +
    ':' +
    ('0' + new Date(date).getMinutes()).slice(-2);
const transformActivity = (activities) => {
    const activitiesByDate = activities.reduce((accumulator, activity) => {
        const date = formatYYYYMMDD(activity.createdAt);
        accumulator[date] = accumulator[date] || {
            date,
            count: 0,
            activities: []
        };
        accumulator[date]?.activities.push({
            importance: activity.importance,
            message: activity.type +
                ` (${activity.bookId ? `book: ${activity.bookId}; ` : ''}${activity.genreId ? `genre: ${activity.genreId}; ` : ''}${activity.userId ? `user: ${activity.userId}` : ''})`,
            time: timeFormat(activity.createdAt)
        });
        // @ts-ignore - count is always defined
        accumulator[date].count++;
        return accumulator;
    }, {});
    return (Object.values(activitiesByDate).map(({ activities, ...rest }) => ({
        level: activities.reduce((accumulator, { importance }) => Math.max(accumulator, importance), 0),
        activities,
        ...rest
    })) || []);
};

;// CONCATENATED MODULE: ./src/book/return.book.object.ts
const returnBookObject = {
    slug: true,
    title: true,
    picture: true,
    author: true
};

;// CONCATENATED MODULE: ./src/genre/return.genre.object.ts
const ReturnGenreObject = {
    name: true,
    slug: true,
    icon: true
};

;// CONCATENATED MODULE: ./src/utils/common/return.default.object.ts
const slugSelect = {
    select: {
        slug: true
    }
};

;// CONCATENATED MODULE: ./src/utils/helpers/server-error.ts

const serverError = (code, message) => new common_namespaceObject.HttpException({
    status: code,
    message
}, code);

;// CONCATENATED MODULE: ./src/user/return.user.object.ts
const returnUserObject = {
    id: true,
    email: true
};

;// CONCATENATED MODULE: ./src/user/user.service.ts
var user_service_a, _b;












let UserService = class UserService {
    constructor(prisma, activityService) {
        this.prisma = prisma;
        this.activityService = activityService;
    }
    async getUserById(id, selectObject = {}) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: {
                ...returnUserObject,
                ...selectObject
            }
        });
        if (!user) {
            throw serverError(common_namespaceObject.HttpStatus.BAD_REQUEST, globalErrors.somethingWrong);
        }
        return user;
    }
    async library(userId) {
        const library = await this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                readingBooks: {
                    select: returnBookObject
                },
                finishedBooks: {
                    select: returnBookObject
                },
                savedBooks: {
                    select: returnBookObject
                }
            }
        });
        if (!library)
            throw serverError(common_namespaceObject.HttpStatus.BAD_REQUEST, globalErrors.somethingWrong);
        const { readingBooks, finishedBooks, savedBooks } = library;
        return {
            readingBooks,
            finishedBooks,
            savedBooks
        };
    }
    async catalog(searchTerm, page) {
        const perPage = 20;
        const data = await this.prisma.user.findMany({
            take: perPage,
            select: {
                ...returnUserObject,
                picture: true,
                socialId: true,
                role: true,
                createdAt: true,
                fullName: true,
                location: true,
                selectedGenres: {
                    select: ReturnGenreObject
                },
                activity: {
                    select: {
                        type: true,
                        id: true,
                        importance: true,
                        createdAt: true,
                        userId: true,
                        bookId: true,
                        genreId: true
                    }
                },
                _count: {
                    select: {
                        savedBooks: true,
                        review: true,
                        finishedBooks: true,
                        readingBooks: true
                    }
                }
            },
            ...(page && {
                skip: page * perPage
            }),
            ...(searchTerm && {
                where: {
                    fullName: {
                        contains: searchTerm
                    }
                },
                ...(!Number.isNaN(+searchTerm) && {
                    where: {
                        id: +searchTerm
                    }
                })
            })
        });
        return {
            data: data.map(({ activity, ...user }) => ({
                ...user,
                activities: transformActivity(activity)
            })),
            canLoadMore: page < Math.floor((await this.prisma.user.count()) / perPage),
            totalPages: Math.floor((await this.prisma.user.count()) / perPage)
        };
    }
    async remove(id) {
        const user = await this.getUserById(id);
        await this.prisma.user.delete({
            where: { id: user.id }
        });
    }
    async startReading(userId, slug) {
        await this.checkBookExist(slug);
        const user = await this.getUserById(+userId, {
            readingBooks: slugSelect,
            finishedBooks: slugSelect
        });
        const isReadingExist = user.readingBooks.some(book => book.slug === slug);
        if (isReadingExist)
            return;
        await this.activityService.create({
            type: client_namespaceObject.Activities.startedReading,
            importance: 2,
            userId,
            bookSlug: slug
        });
        await this.prisma.user.update({
            where: { id: user.id },
            data: {
                readingBooks: {
                    connect: {
                        slug
                    }
                },
                savedBooks: {
                    disconnect: {
                        slug
                    }
                },
                finishedBooks: {
                    disconnect: {
                        slug
                    }
                }
            }
        });
    }
    async finishReading(userId, slug) {
        await this.checkBookExist(slug);
        const user = await this.getUserById(+userId, {
            readingBooks: slugSelect
        });
        const isReadingExist = user.readingBooks.some(book => book.slug === slug);
        if (!isReadingExist)
            return;
        await this.activityService.create({
            type: client_namespaceObject.Activities.finishedReading,
            importance: 3,
            userId
        });
        await this.prisma.user.update({
            where: { id: user.id },
            data: {
                readingBooks: {
                    disconnect: {
                        slug
                    }
                },
                savedBooks: {
                    disconnect: {
                        slug
                    }
                },
                finishedBooks: {
                    connect: {
                        slug
                    }
                }
            }
        });
    }
    async isSaved(userId, slug) {
        await this.checkBookExist(slug);
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                savedBooks: slugSelect
            }
        });
        if (!user)
            throw serverError(common_namespaceObject.HttpStatus.BAD_REQUEST, globalErrors.somethingWrong);
        return user.savedBooks.some(book => book.slug === slug);
    }
    async toggleSave(userId, slug) {
        await this.checkBookExist(slug);
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                savedBooks: slugSelect
            }
        });
        if (!user)
            throw serverError(common_namespaceObject.HttpStatus.BAD_REQUEST, globalErrors.somethingWrong);
        const isSavedExist = user.savedBooks.some(book => book.slug === slug);
        await this.activityService.create({
            type: isSavedExist ? client_namespaceObject.Activities.removeFromSaved : client_namespaceObject.Activities.savedBook,
            importance: 1,
            userId,
            bookSlug: slug
        });
        await this.prisma.user.update({
            where: { id: user.id },
            data: {
                savedBooks: {
                    [isSavedExist ? 'disconnect' : 'connect']: {
                        slug
                    }
                },
                ...(!isSavedExist && {
                    readingBooks: {
                        disconnect: {
                            slug
                        }
                    },
                    finishedBooks: {
                        disconnect: {
                            slug
                        }
                    }
                })
            }
        });
        return !isSavedExist;
    }
    async checkBookExist(slug) {
        const book = await this.prisma.book.findUnique({
            where: { slug, isPublic: true },
            select: {
                id: true,
                title: true
            }
        });
        if (!book)
            throw serverError(common_namespaceObject.HttpStatus.BAD_REQUEST, globalErrors.somethingWrong);
        return !!book;
    }
};
UserService = (0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Injectable)(),
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", [typeof (user_service_a = typeof PrismaService !== "undefined" && PrismaService) === "function" ? user_service_a : Object, typeof (_b = typeof ActivityService !== "undefined" && ActivityService) === "function" ? _b : Object])
], UserService);


;// CONCATENATED MODULE: ./src/utils/config/jwt.config.ts
const getJwtConfig = async (config) => ({
    secret: await config.get('JWT_SECRET')
});

;// CONCATENATED MODULE: external "@nestjs/swagger"
const swagger_namespaceObject = require("@nestjs/swagger");
;// CONCATENATED MODULE: external "@anatine/zod-openapi"
const zod_openapi_namespaceObject = require("@anatine/zod-openapi");
;// CONCATENATED MODULE: external "zod"
const external_zod_namespaceObject = require("zod");
;// CONCATENATED MODULE: ../../libs/global/validation/auth/auth.dto.ts


(0,zod_openapi_namespaceObject.extendZodWithOpenApi)(external_zod_namespaceObject.z);
const AuthSchema = external_zod_namespaceObject.z.object({
    email: external_zod_namespaceObject.z.string().email(),
    password: external_zod_namespaceObject.z.string().min(8)
});

;// CONCATENATED MODULE: ./src/auth/dto/auth.dto.ts





(0,zod_openapi_namespaceObject.extendZodWithOpenApi)(external_zod_namespaceObject.z);
const GoogleAuthSchema = external_zod_namespaceObject.z.object({
    socialId: external_zod_namespaceObject.z.string()
});
const AuthUserSchema = external_zod_namespaceObject.z.object({
    email: external_zod_namespaceObject.z.string().email(),
    role: external_zod_namespaceObject.z.nativeEnum(client_namespaceObject.Role)
});
const RefreshSchema = external_zod_namespaceObject.z.object({
    refreshToken: external_zod_namespaceObject.z.string()
});
class GoogleAuthDto extends (0,zod_nestjs_namespaceObject.createZodDto)(GoogleAuthSchema) {
}
class RefreshDto extends (0,zod_nestjs_namespaceObject.createZodDto)(RefreshSchema) {
}
class AuthDto extends (0,zod_nestjs_namespaceObject.createZodDto)(AuthSchema) {
}

;// CONCATENATED MODULE: ./src/auth/auth.model.ts




(0,zod_openapi_namespaceObject.extendZodWithOpenApi)(external_zod_namespaceObject.z);
const AuthOutputSchema = external_zod_namespaceObject.z.object({
    accessToken: external_zod_namespaceObject.z.string(),
    refreshToken: external_zod_namespaceObject.z.string(),
    type: external_zod_namespaceObject.z.string().optional(),
    user: AuthUserSchema
});
class AuthOutput extends (0,zod_nestjs_namespaceObject.createZodDto)(AuthOutputSchema) {
}

;// CONCATENATED MODULE: external "argon2"
const external_argon2_namespaceObject = require("argon2");
;// CONCATENATED MODULE: external "google-auth-library"
const external_google_auth_library_namespaceObject = require("google-auth-library");
;// CONCATENATED MODULE: ./src/auth/auth.service.ts
var auth_service_a, auth_service_b, _c, _d, _e;













let AuthService = class AuthService {
    constructor(prisma, jwt, usersService, configService, activityService) {
        this.prisma = prisma;
        this.jwt = jwt;
        this.usersService = usersService;
        this.configService = configService;
        this.activityService = activityService;
        this.google = new external_google_auth_library_namespaceObject.OAuth2Client(configService.get('GOOGLE_CLIENT_ID'), configService.get('GOOGLE_CLIENT_SECRET'));
    }
    async login(dto) {
        const user = await this.validateUser(dto);
        const tokens = this.issueToken(user.id);
        return {
            user: this.userFields(user),
            ...tokens
        };
    }
    async register(dto) {
        await this.checkUserExistBeforeCreate(dto.email);
        const popularGenres = await this.getPopular();
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                password: await (0,external_argon2_namespaceObject.hash)(dto.password),
                selectedGenres: {
                    connect: popularGenres.map(genre => ({
                        slug: genre['slug']
                    }))
                }
            }
        });
        await this.activityService.create({
            type: client_namespaceObject.Activities.registerNewUser,
            importance: 1,
            userId: user.id
        });
        const tokens = this.issueToken(user.id);
        return {
            user: this.userFields(user),
            ...tokens
        };
    }
    async googleSign(dto) {
        const ticket = await this.google
            .verifyIdToken({
            idToken: dto.socialId,
            audience: [this.configService.getOrThrow('GOOGLE_CLIENT_ID')]
        })
            .catch(() => {
            throw serverError(common_namespaceObject.HttpStatus.BAD_REQUEST, authErrors.invalidGoogleToken);
        });
        const data = ticket.getPayload();
        if (!data?.sub)
            throw serverError(common_namespaceObject.HttpStatus.BAD_REQUEST, authErrors.invalidGoogleToken);
        const user = await this.prisma.user.findUnique({
            where: {
                socialId: data?.sub
            }
        });
        if (user) {
            console.log('User exist and i just logged in');
            const tokens = this.issueToken(user.id);
            await this.activityService.create({
                type: client_namespaceObject.Activities.loginUser,
                importance: 1,
                userId: user.id
            });
            return {
                type: 'login',
                user: this.userFields(user),
                ...tokens
            };
        }
        if (!data?.email)
            throw serverError(common_namespaceObject.HttpStatus.BAD_REQUEST, authErrors.invalidGoogleToken);
        await this.checkUserExistBeforeCreate(data.email);
        const popularGenres = await this.getPopular();
        const newUser = await this.prisma.user.create({
            data: {
                email: data.email,
                socialId: data.sub,
                selectedGenres: {
                    connect: popularGenres.map(genre => ({
                        slug: genre['slug']
                    }))
                },
                role: client_namespaceObject.Role.user,
                fullName: data.given_name && data.family_name
                    ? `${data.given_name} ${data.family_name}`
                    : data?.email?.split('@')[0],
                picture: data.picture || 'fallback.png',
                location: data.locale || 'unknown'
            }
        });
        const newTokens = this.issueToken(newUser.id);
        await this.activityService.create({
            type: client_namespaceObject.Activities.registerNewUser,
            importance: 1,
            userId: newUser.id
        });
        return {
            type: 'register',
            user: this.userFields(newUser),
            ...newTokens
        };
    }
    async refresh(refreshToken) {
        const result = await this.jwt
            .verifyAsync(refreshToken)
            .catch(reason => {
            throw serverError(common_namespaceObject.HttpStatus.BAD_REQUEST, reason.message);
        });
        if (!result)
            throw serverError(common_namespaceObject.HttpStatus.BAD_REQUEST, globalErrors.invalidValue);
        const user = await this.usersService.getUserById(result.id, {
            email: true,
            id: true
        });
        const tokens = this.issueToken(user.id);
        return {
            user,
            ...tokens
        };
    }
    async checkUserExistBeforeCreate(email) {
        const user = await this.prisma.user.findUnique({
            where: {
                email
            }
        });
        if (user)
            throw serverError(common_namespaceObject.HttpStatus.BAD_REQUEST, authErrors.userExist);
    }
    issueToken(userId) {
        const data = { id: userId };
        return {
            accessToken: this.jwt.sign(data, {
                expiresIn: this.configService.get('NODE_ENV') === 'development' ? '10s' : '15m'
            }),
            refreshToken: this.jwt.sign(data, {
                expiresIn: '10d'
            })
        };
    }
    async validateUser(dto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        });
        if (!user?.password)
            throw serverError(common_namespaceObject.HttpStatus.NOT_FOUND, authErrors.passwordOrEmailInvalid);
        const isPasswordValid = await (0,external_argon2_namespaceObject.verify)(user.password, dto.password);
        if (!isPasswordValid)
            throw serverError(common_namespaceObject.HttpStatus.NOT_FOUND, authErrors.passwordOrEmailInvalid);
        return user;
    }
    async getPopular() {
        return this.prisma.genre.findMany({
            take: 3,
            select: ReturnGenreObject,
            orderBy: {
                activities: {
                    _count: 'asc'
                }
            }
        });
    }
    userFields(user) {
        return {
            id: user.id,
            email: user.email,
            role: user.role
        };
    }
};
AuthService = (0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Injectable)(),
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", [typeof (auth_service_a = typeof PrismaService !== "undefined" && PrismaService) === "function" ? auth_service_a : Object, typeof (auth_service_b = typeof jwt_namespaceObject.JwtService !== "undefined" && jwt_namespaceObject.JwtService) === "function" ? auth_service_b : Object, typeof (_c = typeof UserService !== "undefined" && UserService) === "function" ? _c : Object, typeof (_d = typeof config_namespaceObject.ConfigService !== "undefined" && config_namespaceObject.ConfigService) === "function" ? _d : Object, typeof (_e = typeof ActivityService !== "undefined" && ActivityService) === "function" ? _e : Object])
], AuthService);


;// CONCATENATED MODULE: ./src/auth/auth.controller.ts
var auth_controller_a, auth_controller_b, auth_controller_c, auth_controller_d, auth_controller_e, _f, _g, _h, _j;






let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async googleSign(dto) {
        return this.authService.googleSign(dto);
    }
    async mailRegister(dto) {
        return this.authService.register(dto);
    }
    async mailLogin(dto) {
        return this.authService.login(dto);
    }
    async refreshToken(dto) {
        return this.authService.refresh(dto.refreshToken);
    }
};
(0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Post)('/google-sign'),
    (0,swagger_namespaceObject.ApiOkResponse)({
        description: 'Return access and refresh token',
        type: AuthOutput
    }),
    (0,swagger_namespaceObject.ApiBody)({
        type: GoogleAuthDto,
        description: 'Sign in with google account'
    }),
    (0,external_tslib_namespaceObject.__param)(0, (0,common_namespaceObject.Body)()),
    (0,external_tslib_namespaceObject.__metadata)("design:type", Function),
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", [typeof (auth_controller_b = typeof GoogleAuthDto !== "undefined" && GoogleAuthDto) === "function" ? auth_controller_b : Object]),
    (0,external_tslib_namespaceObject.__metadata)("design:returntype", typeof (auth_controller_c = typeof Promise !== "undefined" && Promise) === "function" ? auth_controller_c : Object)
], AuthController.prototype, "googleSign", null);
(0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Post)('/mail-register'),
    (0,swagger_namespaceObject.ApiBody)({
        type: AuthDto,
        description: 'Register new user'
    }),
    (0,swagger_namespaceObject.ApiOkResponse)({
        description: 'Return access and refresh token',
        type: AuthOutput
    }),
    (0,external_tslib_namespaceObject.__param)(0, (0,common_namespaceObject.Body)()),
    (0,external_tslib_namespaceObject.__metadata)("design:type", Function),
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", [typeof (auth_controller_d = typeof AuthDto !== "undefined" && AuthDto) === "function" ? auth_controller_d : Object]),
    (0,external_tslib_namespaceObject.__metadata)("design:returntype", typeof (auth_controller_e = typeof Promise !== "undefined" && Promise) === "function" ? auth_controller_e : Object)
], AuthController.prototype, "mailRegister", null);
(0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Post)('/mail-login'),
    (0,swagger_namespaceObject.ApiBody)({
        type: AuthDto,
        description: 'Login user'
    }),
    (0,swagger_namespaceObject.ApiOkResponse)({
        description: 'Return access and refresh token',
        type: AuthOutput
    }),
    (0,external_tslib_namespaceObject.__param)(0, (0,common_namespaceObject.Body)()),
    (0,external_tslib_namespaceObject.__metadata)("design:type", Function),
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", [typeof (_f = typeof AuthDto !== "undefined" && AuthDto) === "function" ? _f : Object]),
    (0,external_tslib_namespaceObject.__metadata)("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], AuthController.prototype, "mailLogin", null);
(0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Post)('/refresh'),
    (0,swagger_namespaceObject.ApiBody)({
        type: RefreshDto,
        description: 'Refresh access token'
    }),
    (0,swagger_namespaceObject.ApiOkResponse)({
        description: 'Return access token',
        type: AuthOutput
    }),
    (0,external_tslib_namespaceObject.__param)(0, (0,common_namespaceObject.Body)()),
    (0,external_tslib_namespaceObject.__metadata)("design:type", Function),
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", [typeof (_h = typeof RefreshDto !== "undefined" && RefreshDto) === "function" ? _h : Object]),
    (0,external_tslib_namespaceObject.__metadata)("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], AuthController.prototype, "refreshToken", null);
AuthController = (0,external_tslib_namespaceObject.__decorate)([
    (0,swagger_namespaceObject.ApiTags)('🔐 auth'),
    (0,common_namespaceObject.Controller)('auth'),
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", [typeof (auth_controller_a = typeof AuthService !== "undefined" && AuthService) === "function" ? auth_controller_a : Object])
], AuthController);


;// CONCATENATED MODULE: external "@nestjs/passport"
const passport_namespaceObject = require("@nestjs/passport");
;// CONCATENATED MODULE: external "passport-jwt"
const external_passport_jwt_namespaceObject = require("passport-jwt");
;// CONCATENATED MODULE: ./src/auth/strategy/jwt.stategy.ts
var jwt_stategy_a, jwt_stategy_b;






let JwtStrategy = class JwtStrategy extends (0,passport_namespaceObject.PassportStrategy)(external_passport_jwt_namespaceObject.Strategy) {
    constructor(configService, prisma) {
        super({
            jwtFromRequest: external_passport_jwt_namespaceObject.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService?.get('JWT_SECRET')
        });
        this.prisma = prisma;
    }
    async validate({ id }) {
        return this.prisma.user.findUnique({
            where: {
                id: +id
            }
        });
    }
};
JwtStrategy = (0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Injectable)(),
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", [typeof (jwt_stategy_a = typeof config_namespaceObject.ConfigService !== "undefined" && config_namespaceObject.ConfigService) === "function" ? jwt_stategy_a : Object, typeof (jwt_stategy_b = typeof PrismaService !== "undefined" && PrismaService) === "function" ? jwt_stategy_b : Object])
], JwtStrategy);


;// CONCATENATED MODULE: ./src/auth/auth.module.ts











let AuthModule = class AuthModule {
};
AuthModule = (0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Module)({
        controllers: [AuthController],
        providers: [
            AuthService,
            PrismaService,
            JwtStrategy,
            UserService,
            config_namespaceObject.ConfigService,
            ActivityService
        ],
        imports: [
            config_namespaceObject.ConfigModule,
            jwt_namespaceObject.JwtModule.registerAsync({
                imports: [config_namespaceObject.ConfigModule],
                inject: [config_namespaceObject.ConfigService],
                useFactory: getJwtConfig
            })
        ]
    })
], AuthModule);


;// CONCATENATED MODULE: external "@aws-sdk/client-s3"
const client_s3_namespaceObject = require("@aws-sdk/client-s3");
;// CONCATENATED MODULE: ../../libs/global/helpers/storage-types.ts
// use it types in global because we need it in web and backend
const storageFolder = {
    ebooks: 'ebooks',
    booksCovers: 'booksCovers'
};
const StorageFolderArray = [
    storageFolder.ebooks,
    storageFolder.booksCovers
];

;// CONCATENATED MODULE: external "sharp"
const external_sharp_namespaceObject = require("sharp");
var external_sharp_default = /*#__PURE__*/__webpack_require__.n(external_sharp_namespaceObject);
;// CONCATENATED MODULE: ./src/utils/helpers/string.functions.ts
function optimizeFilename(filename) {
    // Split the filename and extension
    const [name, extension] = filename.split(/\.(?=[^.]+$)/);
    if (!name || !extension)
        return filename;
    const optimizedName = name
        .replaceAll(/[^\s\w-]/g, '')
        .trim()
        .replaceAll(/\s+/g, '-')
        .replaceAll(/-+/g, '-') || 'file';
    // Combine the optimized filename and the original extension
    return `${optimizedName}.${extension}`;
}

;// CONCATENATED MODULE: ./src/storage/storage.service.ts
var StorageService_1;
var storage_service_a;









let StorageService = StorageService_1 = class StorageService {
    constructor(configService) {
        this.configService = configService;
        this.s3 = new client_s3_namespaceObject.S3Client({
            endpoint: this.configService.get('AWS_ENDPOINT'),
            region: this.configService.get('AWS_REGION'),
            credentials: {
                accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
                secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY')
            }
        });
    }
    async upload({ file, fileName, folder }) {
        if (!StorageFolderArray.includes(folder)) {
            throw serverError(common_namespaceObject.HttpStatus.BAD_REQUEST, adminErrors.invalidFolder);
        }
        const optimizedFile = folder === storageFolder.ebooks
            ? file
            : await external_sharp_default()(file)
                .resize({
                height: 1200,
                width: 800
            })
                .toFormat('jpeg', { progressive: true, quality: 50 })
                .toBuffer();
        const optimizedFileName = `${folder}/${Date.now() - Math.floor(Math.random() * 1000)}-${optimizeFilename(fileName)}`;
        await this.s3
            .send(new client_s3_namespaceObject.PutObjectCommand({
            Bucket: this.configService.get('AWS_BUCKET'),
            Key: optimizedFileName,
            Body: optimizedFile,
            ACL: 'public-read',
            ContentDisposition: 'inline'
        }))
            .catch(() => serverError(common_namespaceObject.HttpStatus.BAD_REQUEST, globalErrors.invalidValue));
        common_namespaceObject.Logger.log(`File ${optimizedFileName} uploaded to ${folder} folder`, StorageService_1.name);
        return {
            name: optimizedFileName
        };
    }
};
StorageService = StorageService_1 = (0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Injectable)(),
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", [typeof (storage_service_a = typeof config_namespaceObject.ConfigService !== "undefined" && config_namespaceObject.ConfigService) === "function" ? storage_service_a : Object])
], StorageService);


;// CONCATENATED MODULE: ./src/utils/common/base-catalog.model.ts


(0,zod_openapi_namespaceObject.extendZodWithOpenApi)(external_zod_namespaceObject.z);
const baseCatalogModel = external_zod_namespaceObject.z.object({
    canLoadMore: external_zod_namespaceObject.z.boolean(),
    totalPages: external_zod_namespaceObject.z.number()
});

;// CONCATENATED MODULE: ./src/activity/activity.model.ts


(0,zod_openapi_namespaceObject.extendZodWithOpenApi)(external_zod_namespaceObject.z);
const ActivityItemSchema = external_zod_namespaceObject.z.object({
    message: external_zod_namespaceObject.z.string(),
    time: external_zod_namespaceObject.z.string(),
    importance: external_zod_namespaceObject.z.number().min(1).max(10)
});
const ActivitySchema = external_zod_namespaceObject.z.object({
    date: external_zod_namespaceObject.z.string(),
    count: external_zod_namespaceObject.z.number().min(1),
    level: external_zod_namespaceObject.z.number().min(1).max(10),
    activities: external_zod_namespaceObject.z.array(ActivityItemSchema)
});

;// CONCATENATED MODULE: ./src/genre/genre.entity.ts



(0,zod_openapi_namespaceObject.extendZodWithOpenApi)(external_zod_namespaceObject.z);
const shortGenreSchema = external_zod_namespaceObject.z.object({
    slug: external_zod_namespaceObject.z.string(),
    name: external_zod_namespaceObject.z.string(),
    icon: external_zod_namespaceObject.z.string()
});
class ShortGenre extends (0,zod_nestjs_namespaceObject.createZodDto)(shortGenreSchema) {
}

;// CONCATENATED MODULE: ./src/review/review.entity.ts


(0,zod_openapi_namespaceObject.extendZodWithOpenApi)(external_zod_namespaceObject.z);
const ReviewSchema = external_zod_namespaceObject.z.object({
    tags: external_zod_namespaceObject.z.array(external_zod_namespaceObject.z.string()),
    text: external_zod_namespaceObject.z.string().optional().nullable(),
    rating: external_zod_namespaceObject.z.number()
});

;// CONCATENATED MODULE: ./src/book/book.entity.ts






(0,zod_openapi_namespaceObject.extendZodWithOpenApi)(external_zod_namespaceObject.z);
const ShortBookSchema = external_zod_namespaceObject.z.object({
    slug: external_zod_namespaceObject.z.string(),
    title: external_zod_namespaceObject.z.string(),
    picture: external_zod_namespaceObject.z.string(),
    author: external_zod_namespaceObject.z.string()
});
const BookSchema = external_zod_namespaceObject.z
    .object({
    description: external_zod_namespaceObject.z.string(),
    readingTime: external_zod_namespaceObject.z.number(),
    chapters: external_zod_namespaceObject.z.number(),
    rating: external_zod_namespaceObject.z.number(),
    isPublic: external_zod_namespaceObject.z.boolean(),
    genres: external_zod_namespaceObject.z.array(shortGenreSchema)
})
    .merge(ShortBookSchema);
const FullBookSchema = BookSchema.merge(external_zod_namespaceObject.z
    .object({
    createdAt: external_zod_namespaceObject.z.date(),
    updatedAt: external_zod_namespaceObject.z.date(),
    ebook: external_zod_namespaceObject.z.string(),
    _count: external_zod_namespaceObject.z
        .object({
        finishedBy: external_zod_namespaceObject.z.number(),
        readingBy: external_zod_namespaceObject.z.number(),
        savedBy: external_zod_namespaceObject.z.number()
    })
        .strict(),
    activities: external_zod_namespaceObject.z.array(ActivitySchema),
    review: external_zod_namespaceObject.z.array(ReviewSchema)
})
    .strict());
class ShortBook extends (0,zod_nestjs_namespaceObject.createZodDto)(ShortBookSchema) {
}
class Book extends (0,zod_nestjs_namespaceObject.createZodDto)(BookSchema) {
}
class FullBook extends (0,zod_nestjs_namespaceObject.createZodDto)(FullBookSchema) {
}

;// CONCATENATED MODULE: ./src/book/book.model.ts





(0,zod_openapi_namespaceObject.extendZodWithOpenApi)(external_zod_namespaceObject.z);
const CatalogOutputSchema = external_zod_namespaceObject.z
    .object({
    data: external_zod_namespaceObject.z.array(BookSchema)
})
    .merge(baseCatalogModel);
class CatalogOutput extends (0,zod_nestjs_namespaceObject.createZodDto)(CatalogOutputSchema) {
}

;// CONCATENATED MODULE: ./src/utils/guards/admin.guard.ts





let AdminGuard = class AdminGuard {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if (user.role !== client_namespaceObject.Role.admin)
            throw serverError(common_namespaceObject.HttpStatus.FORBIDDEN, adminErrors.notEnoughRights);
        return true;
    }
};
AdminGuard = (0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Injectable)()
], AdminGuard);


;// CONCATENATED MODULE: ./src/utils/guards/jwt.guard.ts

class JwtGuard extends (0,passport_namespaceObject.AuthGuard)('jwt') {
}

;// CONCATENATED MODULE: ./src/auth/decorators/auth.decorator.ts



const Auth = (role = 'user') => (0,common_namespaceObject.applyDecorators)(role === 'admin' ? (0,common_namespaceObject.UseGuards)(JwtGuard, AdminGuard) : (0,common_namespaceObject.UseGuards)(JwtGuard));

;// CONCATENATED MODULE: ./src/auth/decorators/user.decorator.ts

const CurrentUser = (0,common_namespaceObject.createParamDecorator)((data, context) => {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return data ? user?.[data] : user;
});

;// CONCATENATED MODULE: ../../libs/global/helpers/slugify.ts
//slugify string
const slugify = (string) => string
    .toString()
    .toLowerCase()
    .trim()
    .replaceAll(/\s+/g, '-')
    .replaceAll(/[^\w-]+/g, '');

;// CONCATENATED MODULE: ./src/utils/helpers/romanize-number.ts
const numeralCodes = [
    ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'], // Ones
    ['', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'], // Tens
    ['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM']
];
//TODO: обернуть всё тестами
function convertToRoman(number) {
    let numeral = '';
    const digits = [...number.toString()].reverse();
    for (const [index, digit] of digits.entries()) {
        // @ts-ignore - digit is a string
        numeral = numeralCodes[index][Number.parseInt(digit)] + numeral;
    }
    return numeral;
}

;// CONCATENATED MODULE: ./src/book/helpers/get-ebook.ts

const calculateReadingTime = (text) => {
    const wordsPerMinute = 200;
    const words = text.split(' ').length;
    const minutes = words / wordsPerMinute;
    return Math.ceil(minutes);
};
const useEbookCalculation = (ebooks) => {
    const readingTime = calculateReadingTime(ebooks
        .map(ebook => ebook.chapters.map(chapter => chapter.text).join(' '))
        .join(' '));
    const uploadedEbook = ebooks.map((ebook, ebookIndex) => ({
        id: ebookIndex + 1,
        title: ebook.title,
        chapters: ebook.chapters.map((chapter, chapterIndex) => ({
            id: chapterIndex + 1,
            romanNumber: convertToRoman(chapterIndex + 1),
            readingTime: calculateReadingTime(chapter.text),
            name: chapter.name,
            text: chapter.text
        }))
    }));
    const chaptersCount = ebooks
        .map(ebook => ebook.chapters.length)
        .reduce((a, b) => a + b, 0);
    return {
        uploadedEbook,
        readingTime,
        chaptersCount
    };
};

;// CONCATENATED MODULE: ./src/book/book.service.ts
var book_service_a, book_service_b, book_service_c;












let BookService = class BookService {
    constructor(prisma, activityService, storageService) {
        this.prisma = prisma;
        this.activityService = activityService;
        this.storageService = storageService;
    }
    async infoBySlug(slug, userId) {
        const book = await this.prisma.book.findUnique({
            where: { slug, isPublic: true },
            select: {
                title: true,
                slug: true,
                chapters: true,
                isPublic: true,
                picture: true,
                author: true,
                description: true,
                mainGenre: false,
                readingTime: true,
                rating: true,
                genres: { select: ReturnGenreObject }
            }
        });
        if (!book)
            throw serverError(common_namespaceObject.HttpStatus.BAD_REQUEST, globalErrors.somethingWrong);
        await this.activityService.create({
            type: client_namespaceObject.Activities.visitBook,
            importance: 1,
            userId,
            bookSlug: slug
        });
        return book;
    }
    async infoBySlugAdmin(slug) {
        const book = await this.prisma.book.findUnique({
            where: { slug },
            select: {
                id: true,
                chapters: true,
                title: true,
                picture: true,
                author: true,
                slug: true,
                createdAt: true,
                updatedAt: true,
                rating: true,
                readingTime: true,
                genres: {
                    select: {
                        name: true,
                        slug: true,
                        icon: true
                    }
                },
                ebook: true,
                description: true,
                isPublic: true,
                review: {
                    select: {
                        tags: true,
                        text: true,
                        rating: true,
                        user: {
                            select: {
                                id: true,
                                email: true
                            }
                        }
                    }
                },
                _count: {
                    select: {
                        finishedBy: true,
                        readingBy: true,
                        savedBy: true
                    }
                },
                activities: {
                    select: {
                        type: true,
                        id: true,
                        importance: true,
                        createdAt: true,
                        genreId: true,
                        bookId: true,
                        userId: true
                    }
                }
            }
        });
        if (!book)
            throw serverError(common_namespaceObject.HttpStatus.BAD_REQUEST, globalErrors.somethingWrong);
        const { activities, ...rest } = book;
        console.log('rest', rest);
        return {
            ...rest,
            activities: transformActivity(activities)
        };
    }
    async catalog(searchTerm, page) {
        const perPage = 20;
        const count = await this.prisma.book.count();
        return {
            data: await this.prisma.book.findMany({
                take: perPage,
                select: {
                    author: true,
                    chapters: true,
                    title: true,
                    picture: true,
                    slug: true,
                    genres: { select: ReturnGenreObject },
                    readingTime: true,
                    rating: true,
                    isPublic: true,
                    description: true,
                    mainGenre: {
                        select: ReturnGenreObject
                    }
                },
                orderBy: {
                    isPublic: 'asc'
                },
                ...(page && {
                    skip: page * perPage
                }),
                ...(searchTerm && {
                    where: {
                        title: {
                            contains: searchTerm
                        }
                    },
                    ...(!Number.isNaN(+searchTerm) && {
                        where: {
                            id: +searchTerm
                        }
                    })
                })
            }),
            canLoadMore: page < Math.floor(count / perPage),
            totalPages: Math.floor(count / perPage)
        };
    }
    async create(dto) {
        const { genreIds, mainGenreSlug } = await this.getGenres(dto.genres);
        const { readingTime, uploadedEbook, chaptersCount } = useEbookCalculation(dto.ebook);
        const { name: ebookName } = await this.storageService.upload({
            folder: 'ebooks',
            file: Buffer.from(JSON.stringify(uploadedEbook)),
            fileName: dto.title + '.json'
        });
        const checkExist = await this.prisma.book.findUnique({
            where: {
                title: dto.title
            },
            select: {
                id: true
            }
        });
        if (checkExist)
            throw serverError(common_namespaceObject.HttpStatus.BAD_REQUEST, adminErrors.bookAlreadyExist);
        await this.prisma.book.create({
            data: {
                slug: slugify(dto.title),
                activities: {
                    create: {
                        type: client_namespaceObject.Activities.createBook,
                        importance: 9
                    }
                },
                chapters: chaptersCount,
                title: dto.title,
                picture: dto.picture,
                rating: dto.rating,
                readingTime: readingTime,
                description: dto.description,
                ebook: ebookName,
                author: dto.author,
                genres: {
                    connect: genreIds
                },
                mainGenre: {
                    connect: {
                        slug: mainGenreSlug
                    }
                }
            }
        });
    }
    async remove(slug) {
        await this.checkExist({
            adminVisible: true,
            where: { slug }
        });
        await this.prisma.review.deleteMany({
            where: {
                book: {
                    slug
                }
            }
        });
        await this.prisma.book.delete({ where: { slug } });
    }
    async update(slug, dto) {
        const book = await this.prisma.book.findUnique({
            where: { slug },
            select: {
                id: true,
                title: true,
                ebook: true
            }
        });
        if (!book)
            throw serverError(common_namespaceObject.HttpStatus.BAD_REQUEST, globalErrors.somethingWrong);
        const { genres, title, ebook, ...rest } = dto;
        let updateData = { ...rest };
        if (ebook) {
            const { uploadedEbook, readingTime, chaptersCount } = useEbookCalculation(ebook);
            const { name: ebookName } = await this.storageService.upload({
                folder: 'ebooks',
                file: Buffer.from(JSON.stringify(uploadedEbook)),
                fileName: `${book.title}.json`
            });
            updateData = {
                ...updateData,
                ebook: ebookName,
                readingTime,
                chapters: chaptersCount
            };
        }
        if (genres) {
            const { genreIds, mainGenreSlug } = await this.getGenres(genres);
            updateData = {
                ...updateData,
                genres: {
                    set: genreIds
                },
                mainGenre: {
                    connect: {
                        slug: mainGenreSlug
                    }
                }
            };
        }
        if (title) {
            updateData = {
                ...updateData,
                slug: slugify(title)
            };
        }
        await this.prisma.book.update({
            where: { id: book.id },
            data: updateData
        });
        await this.activityService.create({
            type: client_namespaceObject.Activities.updateBook,
            importance: 7,
            bookSlug: slug
        });
    }
    async getGenres(genres) {
        const mainGenre = await this.prisma.genre.findFirst({
            where: {
                slug: {
                    in: genres.map(genre => genre.slug)
                }
            },
            select: {
                slug: true
            },
            orderBy: {
                mainBooks: {
                    _count: 'asc'
                }
            }
        });
        if (genres.length < 2 || !mainGenre)
            throw serverError(common_namespaceObject.HttpStatus.BAD_REQUEST, globalErrors.somethingWrong);
        return {
            mainGenreSlug: mainGenre.slug,
            genreIds: genres.map(({ slug }) => ({ slug }))
        };
    }
    async checkExist({ where, adminVisible = false }) {
        const exist = await this.prisma.book.findUnique({
            where: { ...where, ...(adminVisible ? {} : { isPublic: true }) },
            select: {
                id: true
            }
        });
        if (!exist)
            throw serverError(common_namespaceObject.HttpStatus.BAD_REQUEST, globalErrors.somethingWrong);
        return !!exist;
    }
};
BookService = (0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Injectable)(),
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", [typeof (book_service_a = typeof PrismaService !== "undefined" && PrismaService) === "function" ? book_service_a : Object, typeof (book_service_b = typeof ActivityService !== "undefined" && ActivityService) === "function" ? book_service_b : Object, typeof (book_service_c = typeof StorageService !== "undefined" && StorageService) === "function" ? book_service_c : Object])
], BookService);


;// CONCATENATED MODULE: ../../libs/global/validation/book/ebook.payload.dto.ts

const EBookBaseSchema = external_zod_namespaceObject.z.object({
    id: external_zod_namespaceObject.z.number().min(1),
    title: external_zod_namespaceObject.z
        .string()
        .max(100)
        .min(3)
        .refine(value => value !== 'undefined', {
        message: 'Name cannot be empty'
    })
        .refine(value => !value.includes('.epub'), {
        message: 'Title cannot include .epub'
    })
});
const ChapterPayloadSchema = external_zod_namespaceObject.z.object({
    id: external_zod_namespaceObject.z.number().min(1),
    name: external_zod_namespaceObject.z
        .string()
        .refine(value => !value.includes('.epub'), {
        message: 'Name cannot include .epub'
    })
        .refine(value => value !== 'undefined', {
        message: 'Name cannot be empty'
    }),
    text: external_zod_namespaceObject.z.string().refine(value => {
        const regex = /<([A-Za-z][A-Za-z0-9]*)\b[^>]*>(.*?)<\/\1>/;
        return regex.test(value);
    }, {
        message: 'Text should be in HTML format'
    })
});
const EBookPayloadSchema = external_zod_namespaceObject.z
    .object({
    chapters: external_zod_namespaceObject.z.array(ChapterPayloadSchema).min(1)
})
    .merge(EBookBaseSchema);

;// CONCATENATED MODULE: ../../libs/global/validation/book/create.book.dto.ts


const create_book_dto_shortGenreSchema = external_zod_namespaceObject.z.object({
    slug: external_zod_namespaceObject.z.string(),
    name: external_zod_namespaceObject.z.string(),
    icon: external_zod_namespaceObject.z.string()
});
const CreateBookSchema = external_zod_namespaceObject.z.object({
    title: external_zod_namespaceObject.z.string(),
    author: external_zod_namespaceObject.z.string(),
    description: external_zod_namespaceObject.z.string().max(1000).min(10),
    ebook: external_zod_namespaceObject.z.array(EBookPayloadSchema).min(1),
    rating: external_zod_namespaceObject.z.number().min(1).positive(),
    picture: external_zod_namespaceObject.z.string(),
    genres: external_zod_namespaceObject.z.array(create_book_dto_shortGenreSchema).min(1)
});

;// CONCATENATED MODULE: ./src/book/dto/create.book.dto.ts




(0,zod_openapi_namespaceObject.extendZodWithOpenApi)(external_zod_namespaceObject.z);
class CreateBookDto extends (0,zod_nestjs_namespaceObject.createZodDto)(CreateBookSchema) {
}

;// CONCATENATED MODULE: ../../libs/global/validation/book/update.book.dto.ts


const update_book_dto_shortGenreSchema = external_zod_namespaceObject.z.object({
    slug: external_zod_namespaceObject.z.string(),
    name: external_zod_namespaceObject.z.string(),
    icon: external_zod_namespaceObject.z.string()
});
const UpdateBookSchema = external_zod_namespaceObject.z.object({
    title: external_zod_namespaceObject.z.string().optional(),
    author: external_zod_namespaceObject.z.string().optional(),
    description: external_zod_namespaceObject.z.string().max(1000).min(10).optional(),
    ebook: external_zod_namespaceObject.z.array(EBookPayloadSchema).min(1).optional(),
    isPublic: external_zod_namespaceObject.z.boolean().optional(),
    rating: external_zod_namespaceObject.z.number().min(1).positive().optional(),
    picture: external_zod_namespaceObject.z.string().optional(),
    genres: external_zod_namespaceObject.z.array(update_book_dto_shortGenreSchema).min(1).optional()
});

;// CONCATENATED MODULE: ./src/book/dto/update.book.dto.ts




(0,zod_openapi_namespaceObject.extendZodWithOpenApi)(external_zod_namespaceObject.z);
class UpdateBookDto extends (0,zod_nestjs_namespaceObject.createZodDto)(UpdateBookSchema) {
}

;// CONCATENATED MODULE: ./src/book/book.controller.ts
var book_controller_a, book_controller_b, book_controller_c, book_controller_d, book_controller_e, book_controller_f;










let BookController = class BookController {
    constructor(bookService) {
        this.bookService = bookService;
    }
    async infoBySlug(bookSlug, userId) {
        return this.bookService.infoBySlug(bookSlug, +userId);
    }
    async adminInfoBySlug(slug) {
        return this.bookService.infoBySlugAdmin(slug);
    }
    async catalog(searchTerm, page) {
        return this.bookService.catalog(searchTerm, page || 1);
    }
    async create(dto) {
        return this.bookService.create(dto);
    }
    async update(bookSlug, dto) {
        return this.bookService.update(bookSlug, dto);
    }
    async remove(slug) {
        return this.bookService.remove(slug);
    }
};
(0,external_tslib_namespaceObject.__decorate)([
    Auth(),
    (0,common_namespaceObject.Get)('/info/by-slug/:slug'),
    (0,swagger_namespaceObject.ApiOkResponse)({ type: Book }),
    (0,external_tslib_namespaceObject.__param)(0, (0,common_namespaceObject.Param)('slug')),
    (0,external_tslib_namespaceObject.__param)(1, CurrentUser('id')),
    (0,external_tslib_namespaceObject.__metadata)("design:type", Function),
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", [String, String]),
    (0,external_tslib_namespaceObject.__metadata)("design:returntype", typeof (book_controller_b = typeof Promise !== "undefined" && Promise) === "function" ? book_controller_b : Object)
], BookController.prototype, "infoBySlug", null);
(0,external_tslib_namespaceObject.__decorate)([
    Auth('admin'),
    (0,common_namespaceObject.Get)('/admin-info/by-slug/:slug'),
    (0,swagger_namespaceObject.ApiOkResponse)({ type: FullBook }),
    (0,external_tslib_namespaceObject.__param)(0, (0,common_namespaceObject.Param)('slug')),
    (0,external_tslib_namespaceObject.__metadata)("design:type", Function),
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", [String]),
    (0,external_tslib_namespaceObject.__metadata)("design:returntype", typeof (book_controller_c = typeof Promise !== "undefined" && Promise) === "function" ? book_controller_c : Object)
], BookController.prototype, "adminInfoBySlug", null);
(0,external_tslib_namespaceObject.__decorate)([
    Auth('admin'),
    (0,common_namespaceObject.Get)('/admin/catalog'),
    (0,swagger_namespaceObject.ApiOkResponse)({ type: CatalogOutput }),
    (0,external_tslib_namespaceObject.__param)(0, (0,common_namespaceObject.Query)('searchTerm')),
    (0,external_tslib_namespaceObject.__param)(1, (0,common_namespaceObject.Query)('page')),
    (0,external_tslib_namespaceObject.__metadata)("design:type", Function),
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", [String, Number]),
    (0,external_tslib_namespaceObject.__metadata)("design:returntype", typeof (book_controller_d = typeof Promise !== "undefined" && Promise) === "function" ? book_controller_d : Object)
], BookController.prototype, "catalog", null);
(0,external_tslib_namespaceObject.__decorate)([
    Auth('admin'),
    (0,common_namespaceObject.Post)('admin/create'),
    (0,swagger_namespaceObject.ApiOkResponse)({ type: undefined }),
    (0,swagger_namespaceObject.ApiBody)({
        type: CreateBookDto,
        description: 'Create book'
    }),
    (0,external_tslib_namespaceObject.__param)(0, (0,common_namespaceObject.Body)()),
    (0,external_tslib_namespaceObject.__metadata)("design:type", Function),
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", [typeof (book_controller_e = typeof CreateBookDto !== "undefined" && CreateBookDto) === "function" ? book_controller_e : Object]),
    (0,external_tslib_namespaceObject.__metadata)("design:returntype", Promise)
], BookController.prototype, "create", null);
(0,external_tslib_namespaceObject.__decorate)([
    Auth('admin'),
    (0,swagger_namespaceObject.ApiOkResponse)({ type: undefined }),
    (0,common_namespaceObject.Put)('admin/update/:slug'),
    (0,external_tslib_namespaceObject.__param)(0, (0,common_namespaceObject.Param)('slug')),
    (0,external_tslib_namespaceObject.__param)(1, (0,common_namespaceObject.Body)()),
    (0,external_tslib_namespaceObject.__metadata)("design:type", Function),
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", [String, typeof (book_controller_f = typeof UpdateBookDto !== "undefined" && UpdateBookDto) === "function" ? book_controller_f : Object]),
    (0,external_tslib_namespaceObject.__metadata)("design:returntype", Promise)
], BookController.prototype, "update", null);
(0,external_tslib_namespaceObject.__decorate)([
    Auth('admin'),
    (0,swagger_namespaceObject.ApiOkResponse)({ type: undefined }),
    (0,common_namespaceObject.Delete)('admin/remove/:slug'),
    (0,external_tslib_namespaceObject.__param)(0, (0,common_namespaceObject.Param)('slug')),
    (0,external_tslib_namespaceObject.__metadata)("design:type", Function),
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", [String]),
    (0,external_tslib_namespaceObject.__metadata)("design:returntype", Promise)
], BookController.prototype, "remove", null);
BookController = (0,external_tslib_namespaceObject.__decorate)([
    (0,swagger_namespaceObject.ApiTags)('📙 book'),
    (0,swagger_namespaceObject.ApiBearerAuth)(),
    (0,common_namespaceObject.Controller)('book'),
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", [typeof (book_controller_a = typeof BookService !== "undefined" && BookService) === "function" ? book_controller_a : Object])
], BookController);


;// CONCATENATED MODULE: ./src/book/book.module.ts







let BookModule = class BookModule {
};
BookModule = (0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Module)({
        controllers: [BookController],
        providers: [BookService, PrismaService, StorageService, ActivityService],
        exports: [BookService]
    })
], BookModule);


;// CONCATENATED MODULE: ./src/book/ebook/ebook.model.ts





(0,zod_openapi_namespaceObject.extendZodWithOpenApi)(external_zod_namespaceObject.z);
const ChapterSchema = external_zod_namespaceObject.z
    .object({
    romanNumber: external_zod_namespaceObject.z.string(),
    readingTime: external_zod_namespaceObject.z.number()
})
    .merge(ChapterPayloadSchema);
const StoredEBookSchema = external_zod_namespaceObject.z
    .object({
    chapters: external_zod_namespaceObject.z.array(ChapterSchema).min(1)
})
    .merge(EBookBaseSchema);
const OutputChapterChildSchema = external_zod_namespaceObject.z.object({
    name: external_zod_namespaceObject.z.string(),
    link: external_zod_namespaceObject.z.string()
});
const OutputChapterSchema = external_zod_namespaceObject.z.object({
    title: external_zod_namespaceObject.z.string(),
    children: external_zod_namespaceObject.z.array(OutputChapterChildSchema)
});
const EbookOutputSchema = external_zod_namespaceObject.z
    .object({
    file: external_zod_namespaceObject.z.array(external_zod_namespaceObject.z.string()),
    chapters: external_zod_namespaceObject.z.array(OutputChapterSchema)
})
    .merge(ShortBookSchema.pick({ title: true, picture: true }));
class StoredEBook extends (0,zod_nestjs_namespaceObject.createZodDto)(StoredEBookSchema) {
}
class BaseChapter extends (0,zod_nestjs_namespaceObject.createZodDto)(ChapterPayloadSchema) {
}
class EbookOutput extends (0,zod_nestjs_namespaceObject.createZodDto)(EbookOutputSchema) {
}

;// CONCATENATED MODULE: ../../libs/global/api-config.ts
const serverURL = 'http://localhost:7777';
const emulatorServerURL = 'http://10.0.2.2:7777';
const getFileUrl = (path) => {
    if (path?.startsWith('http'))
        return path;
    return `https://f005.backblazeb2.com/file/Booknex/${path}`;
};

;// CONCATENATED MODULE: ../../libs/global/helpers/time-converter.ts
const minutesToTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours > 0 ? hours + 'h' : ''} ${remainingMinutes > 0 ? remainingMinutes + 'm' : ''}`;
};

;// CONCATENATED MODULE: ../../libs/global/helpers/getBookHtml.ts

// It here because i use it in multiple places (web(overview) and in backend)
const getServerBookHtml = ({ name, title, text, readingTime, romanNumber }) => `<section id="${name + ' ' + title}">
	<div style="
	width: 100%;
	height: 80px;
	display: flex;
	justify-content: space-between;
	align-items: center;">
	<div>
	<a style="margin: 0; padding: 0; font-size: 18px; margin-bottom:4px">${name}</a>
	<p style="margin: 0; padding: 0;">${minutesToTime(readingTime)}</p>
  </div>
	<h2 style="margin: 0; padding: 0;">${romanNumber}</h2>
	</div>
 ${text}
</section>`;

;// CONCATENATED MODULE: ./src/book/ebook/ebook.service.ts
var ebook_service_a, ebook_service_b;











let EbookService = class EbookService {
    constructor(prisma, activityService) {
        this.prisma = prisma;
        this.activityService = activityService;
    }
    async storedEbook(slug) {
        const book = await this.prisma.book.findUnique({
            where: { slug },
            select: {
                id: true,
                ebook: true
            }
        });
        if (!book) {
            throw serverError(common_namespaceObject.HttpStatus.BAD_REQUEST, globalErrors.unknownError);
        }
        const ebook = await fetch(getFileUrl(book.ebook))
            .then(result => result.json())
            .catch(() => null);
        if (!ebook) {
            console.log('error', 'not found ebook' + slug);
            throw serverError(common_namespaceObject.HttpStatus.BAD_REQUEST, globalErrors.unknownError);
        }
        console.log('ebook', ebook);
        const errors = external_zod_namespaceObject.z.array(StoredEBookSchema).safeParse(ebook);
        if (!errors.success) {
            throw serverError(common_namespaceObject.HttpStatus.BAD_REQUEST, globalErrors.somethingWrong);
        }
        return ebook;
    }
    async ebookBySlug(slug, userId) {
        const book = await this.prisma.book.findUnique({
            where: { slug, isPublic: true },
            select: {
                id: true,
                title: true,
                ebook: true,
                picture: true
            }
        });
        if (!book) {
            throw serverError(common_namespaceObject.HttpStatus.BAD_REQUEST, globalErrors.unknownError);
        }
        const ebook = await this.storedEbook(slug);
        await this.activityService.create({
            type: client_namespaceObject.Activities.getEbook,
            importance: 2,
            userId,
            bookSlug: slug
        });
        return {
            ...book,
            file: ebook.map(({ chapters, title }) => chapters
                .map(({ text, name, romanNumber, readingTime }) => getServerBookHtml({
                name,
                title,
                text,
                readingTime,
                romanNumber
            }))
                .join(' ')),
            chapters: ebook.map(({ title, chapters }) => ({
                title,
                children: chapters.map(({ name }) => ({
                    name,
                    link: `#${name + ' ' + title}`
                }))
            }))
        };
    }
};
EbookService = (0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Injectable)(),
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", [typeof (ebook_service_a = typeof PrismaService !== "undefined" && PrismaService) === "function" ? ebook_service_a : Object, typeof (ebook_service_b = typeof ActivityService !== "undefined" && ActivityService) === "function" ? ebook_service_b : Object])
], EbookService);


;// CONCATENATED MODULE: ./src/book/ebook/ebook.controller.ts
var ebook_controller_a, ebook_controller_b, ebook_controller_c;







let EbookController = class EbookController {
    constructor(ebookService) {
        this.ebookService = ebookService;
    }
    async ebookBySlug(bookSlug, userId) {
        return this.ebookService.ebookBySlug(bookSlug, +userId);
    }
    //  admin
    async storedEbookBySlug(bookSlug) {
        return this.ebookService.storedEbook(bookSlug);
    }
};
(0,external_tslib_namespaceObject.__decorate)([
    Auth(),
    (0,common_namespaceObject.Get)('/ebook/by-slug/:slug'),
    (0,swagger_namespaceObject.ApiOkResponse)({ type: EbookOutput }),
    (0,external_tslib_namespaceObject.__param)(0, (0,common_namespaceObject.Param)('slug')),
    (0,external_tslib_namespaceObject.__param)(1, CurrentUser('id')),
    (0,external_tslib_namespaceObject.__metadata)("design:type", Function),
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", [String, String]),
    (0,external_tslib_namespaceObject.__metadata)("design:returntype", typeof (ebook_controller_b = typeof Promise !== "undefined" && Promise) === "function" ? ebook_controller_b : Object)
], EbookController.prototype, "ebookBySlug", null);
(0,external_tslib_namespaceObject.__decorate)([
    Auth('admin'),
    (0,common_namespaceObject.Get)('/admin/stored-ebook/:slug'),
    (0,swagger_namespaceObject.ApiOkResponse)({ type: [StoredEBook] }),
    (0,external_tslib_namespaceObject.__param)(0, (0,common_namespaceObject.Param)('slug')),
    (0,external_tslib_namespaceObject.__metadata)("design:type", Function),
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", [String]),
    (0,external_tslib_namespaceObject.__metadata)("design:returntype", typeof (ebook_controller_c = typeof Promise !== "undefined" && Promise) === "function" ? ebook_controller_c : Object)
], EbookController.prototype, "storedEbookBySlug", null);
EbookController = (0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Controller)('ebook'),
    (0,swagger_namespaceObject.ApiTags)('📙 ebook'),
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", [typeof (ebook_controller_a = typeof EbookService !== "undefined" && EbookService) === "function" ? ebook_controller_a : Object])
], EbookController);


;// CONCATENATED MODULE: ./src/book/ebook/ebook.module.ts






let EbookModule = class EbookModule {
};
EbookModule = (0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Module)({
        controllers: [EbookController],
        providers: [EbookService, PrismaService, ActivityService]
    })
], EbookModule);


;// CONCATENATED MODULE: ./src/genre/genre.service.ts
var genre_service_a, genre_service_b;









let GenreService = class GenreService {
    constructor(prisma, activityService) {
        this.prisma = prisma;
        this.activityService = activityService;
    }
    catalog() {
        return this.prisma.genre.findMany({
            select: ReturnGenreObject
        });
    }
    // async setupGenre() {
    //   const genres = await this.prisma.genre.findMany();
    //   if (genres.length > 0) {
    //     throw serverError(HttpStatus.BAD_REQUEST, GenreErrors.genresAlreadyExist);
    //   }
    //
    //   await this.prisma.genre.createMany({
    //     data: setupGenres
    //   });
    // }
    async bySlug(slug, userId) {
        await this.activityService.create({
            type: client_namespaceObject.Activities.visitGenre,
            importance: 1,
            userId
        });
        const genre = await this.prisma.genre.findUnique({
            where: {
                slug
            },
            select: {
                ...ReturnGenreObject,
                mainBooks: {
                    select: returnBookObject
                }
            }
        });
        if (!genre)
            throw serverError(common_namespaceObject.HttpStatus.BAD_REQUEST, globalErrors.somethingWrong);
        return genre;
    }
};
GenreService = (0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Injectable)(),
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", [typeof (genre_service_a = typeof PrismaService !== "undefined" && PrismaService) === "function" ? genre_service_a : Object, typeof (genre_service_b = typeof ActivityService !== "undefined" && ActivityService) === "function" ? genre_service_b : Object])
], GenreService);


;// CONCATENATED MODULE: ./src/recommendation/recommendation.service.ts
var recommendation_service_a, recommendation_service_b;







let RecommendationService = class RecommendationService {
    constructor(prisma, activityService) {
        this.prisma = prisma;
        this.activityService = activityService;
    }
    async recommendation(userId) {
        const selectedGenres = await this.prisma.genre.findMany({
            where: {
                users: {
                    some: {
                        id: userId
                    }
                }
            },
            select: {
                slug: true
            }
        });
        return this.prisma.book.findMany({
            take: 10,
            orderBy: { rating: 'desc' },
            where: {
                isPublic: true,
                genres: {
                    some: {
                        slug: {
                            in: selectedGenres.map(genre => genre.slug)
                        }
                    }
                },
                AND: {
                    NOT: {
                        readingBy: {
                            some: {
                                id: userId
                            }
                        },
                        finishedBy: {
                            some: {
                                id: userId
                            }
                        },
                        savedBy: {
                            some: {
                                id: userId
                            }
                        }
                    }
                }
            }
        });
    }
    currentRecommendation(userId) {
        return this.prisma.user
            .findUnique({
            where: {
                id: userId
            },
            select: {
                selectedGenres: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        })
            .selectedGenres();
    }
    async updateRecommendation(id, dto) {
        await this.checkUserExist(id);
        const selectedGenres = await this.prisma.genre.findMany({
            where: {
                slug: {
                    in: dto.genreSlugs
                }
            },
            select: {
                id: true
            }
        });
        await this.activityService.create({
            type: client_namespaceObject.Activities.updateRecommendations,
            importance: 5,
            userId: id
        });
        await this.prisma.user.update({
            where: { id },
            data: {
                selectedGenres: {
                    set: selectedGenres
                }
            }
        });
    }
    async checkUserExist(id) {
        const userExist = await this.prisma.user.findUnique({
            where: { id: id },
            select: {
                id: true
            }
        });
        if (!userExist)
            throw serverError(common_namespaceObject.HttpStatus.BAD_REQUEST, adminErrors.userNotFound);
        return !!userExist;
    }
};
RecommendationService = (0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Injectable)(),
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", [typeof (recommendation_service_a = typeof PrismaService !== "undefined" && PrismaService) === "function" ? recommendation_service_a : Object, typeof (recommendation_service_b = typeof ActivityService !== "undefined" && ActivityService) === "function" ? recommendation_service_b : Object])
], RecommendationService);


;// CONCATENATED MODULE: ./src/catalog/catalog.model.ts





(0,zod_openapi_namespaceObject.extendZodWithOpenApi)(external_zod_namespaceObject.z);
const FeaturedOutputSchema = external_zod_namespaceObject.z.object({
    interestedGenres: external_zod_namespaceObject.z.array(shortGenreSchema),
    recommendation: external_zod_namespaceObject.z.array(ShortBookSchema),
    popularBooks: external_zod_namespaceObject.z.array(ShortBookSchema),
    bestSellingBooks: external_zod_namespaceObject.z.array(ShortBookSchema),
    newReleases: external_zod_namespaceObject.z.array(ShortBookSchema)
});
class FeaturedOutput extends (0,zod_nestjs_namespaceObject.createZodDto)(FeaturedOutputSchema) {
}

;// CONCATENATED MODULE: ./src/catalog/catalog.service.ts
var catalog_service_a, catalog_service_b, catalog_service_c;






let CatalogService = class CatalogService {
    constructor(activityService, prisma, recommendationService) {
        this.activityService = activityService;
        this.prisma = prisma;
        this.recommendationService = recommendationService;
    }
    async featured(userId) {
        await this.activityService.create({
            type: client_namespaceObject.Activities.checkCatalog,
            importance: 1,
            userId: userId
        });
        return {
            interestedGenres: await this.interestedGenres(userId),
            recommendation: await this.recommendationService.recommendation(userId),
            popularBooks: await this.popularBooks(),
            bestSellingBooks: await this.bestSellingBooks(),
            newReleases: await this.newReleases()
        };
    }
    search(query) {
        return this.prisma.book.findMany({
            where: {
                isPublic: true,
                OR: [
                    {
                        title: {
                            mode: 'insensitive',
                            contains: query
                        }
                    },
                    {
                        author: {
                            contains: query,
                            mode: 'insensitive'
                        }
                    }
                ]
            }
        });
    }
    async interestedGenres(userId) {
        return this.prisma.genre.findMany({
            where: {
                users: {
                    every: {
                        id: userId
                    }
                }
            }
        });
    }
    popularBooks() {
        return this.prisma.book.findMany({
            take: 10,
            where: {
                isPublic: true
            },
            orderBy: {
                rating: 'desc'
            }
        });
    }
    bestSellingBooks() {
        return this.prisma.book.findMany({
            take: 10,
            where: {
                isPublic: true
            },
            orderBy: {
                rating: 'desc'
            }
        });
    }
    newReleases() {
        return this.prisma.book.findMany({
            take: 10,
            where: {
                isPublic: true
            },
            orderBy: {
                updatedAt: 'desc'
            }
        });
    }
};
CatalogService = (0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Injectable)(),
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", [typeof (catalog_service_a = typeof ActivityService !== "undefined" && ActivityService) === "function" ? catalog_service_a : Object, typeof (catalog_service_b = typeof PrismaService !== "undefined" && PrismaService) === "function" ? catalog_service_b : Object, typeof (catalog_service_c = typeof RecommendationService !== "undefined" && RecommendationService) === "function" ? catalog_service_c : Object])
], CatalogService);


;// CONCATENATED MODULE: ./src/catalog/catalog.controller.ts
var catalog_controller_a, catalog_controller_b, catalog_controller_c;








let CatalogController = class CatalogController {
    constructor(catalogService) {
        this.catalogService = catalogService;
    }
    async search(query) {
        return this.catalogService.search(query);
    }
    async featured(userId) {
        return this.catalogService.featured(+userId);
    }
};
(0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Get)('/search/:query'),
    (0,swagger_namespaceObject.ApiOkResponse)({ type: [ShortBook] }),
    (0,external_tslib_namespaceObject.__param)(0, (0,common_namespaceObject.Param)('query')),
    (0,external_tslib_namespaceObject.__metadata)("design:type", Function),
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", [String]),
    (0,external_tslib_namespaceObject.__metadata)("design:returntype", typeof (catalog_controller_b = typeof Promise !== "undefined" && Promise) === "function" ? catalog_controller_b : Object)
], CatalogController.prototype, "search", null);
(0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Get)('/featured'),
    (0,swagger_namespaceObject.ApiOkResponse)({ type: FeaturedOutput }),
    (0,external_tslib_namespaceObject.__param)(0, CurrentUser('id')),
    (0,external_tslib_namespaceObject.__metadata)("design:type", Function),
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", [Number]),
    (0,external_tslib_namespaceObject.__metadata)("design:returntype", typeof (catalog_controller_c = typeof Promise !== "undefined" && Promise) === "function" ? catalog_controller_c : Object)
], CatalogController.prototype, "featured", null);
CatalogController = (0,external_tslib_namespaceObject.__decorate)([
    Auth(),
    (0,swagger_namespaceObject.ApiTags)('📚 catalog'),
    (0,swagger_namespaceObject.ApiBearerAuth)(),
    (0,common_namespaceObject.Controller)('catalog'),
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", [typeof (catalog_controller_a = typeof CatalogService !== "undefined" && CatalogService) === "function" ? catalog_controller_a : Object])
], CatalogController);


;// CONCATENATED MODULE: ./src/catalog/catalog.module.ts








let CatalogModule = class CatalogModule {
};
CatalogModule = (0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Module)({
        controllers: [CatalogController],
        providers: [
            CatalogService,
            PrismaService,
            ActivityService,
            GenreService,
            RecommendationService
        ]
    })
], CatalogModule);


;// CONCATENATED MODULE: ./src/genre/genre.model.ts





(0,zod_openapi_namespaceObject.extendZodWithOpenApi)(external_zod_namespaceObject.z);
const FindOneGenreOutputSchema = external_zod_namespaceObject.z
    .object({
    mainBooks: external_zod_namespaceObject.z.array(ShortBookSchema)
})
    .merge(shortGenreSchema);
class FindOneGenreOutput extends (0,zod_nestjs_namespaceObject.createZodDto)(FindOneGenreOutputSchema) {
}

;// CONCATENATED MODULE: ./src/genre/genre.controller.ts
var genre_controller_a, genre_controller_b, genre_controller_c;








let GenreController = class GenreController {
    constructor(genreService) {
        this.genreService = genreService;
    }
    async catalog() {
        return this.genreService.catalog();
    }
    // @Get('/setup')
    // async setupGenre() {
    //   return this.genreService.setupGenre();
    // }
    async bySlug(genreSlug, userId) {
        return this.genreService.bySlug(genreSlug, +userId);
    }
};
(0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Get)(),
    (0,swagger_namespaceObject.ApiOkResponse)({ type: [ShortGenre] }),
    (0,external_tslib_namespaceObject.__metadata)("design:type", Function),
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", []),
    (0,external_tslib_namespaceObject.__metadata)("design:returntype", typeof (genre_controller_b = typeof Promise !== "undefined" && Promise) === "function" ? genre_controller_b : Object)
], GenreController.prototype, "catalog", null);
(0,external_tslib_namespaceObject.__decorate)([
    Auth(),
    (0,common_namespaceObject.Get)('/by-slug/:slug'),
    (0,swagger_namespaceObject.ApiOkResponse)({ type: FindOneGenreOutput }),
    (0,external_tslib_namespaceObject.__param)(0, (0,common_namespaceObject.Param)('slug')),
    (0,external_tslib_namespaceObject.__param)(1, CurrentUser('id')),
    (0,external_tslib_namespaceObject.__metadata)("design:type", Function),
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", [String, Number]),
    (0,external_tslib_namespaceObject.__metadata)("design:returntype", typeof (genre_controller_c = typeof Promise !== "undefined" && Promise) === "function" ? genre_controller_c : Object)
], GenreController.prototype, "bySlug", null);
GenreController = (0,external_tslib_namespaceObject.__decorate)([
    (0,swagger_namespaceObject.ApiTags)('🔖 genre'),
    (0,swagger_namespaceObject.ApiBearerAuth)(),
    (0,common_namespaceObject.Controller)('genre'),
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", [typeof (genre_controller_a = typeof GenreService !== "undefined" && GenreService) === "function" ? genre_controller_a : Object])
], GenreController);


;// CONCATENATED MODULE: ./src/genre/genre.module.ts






let GenreModule = class GenreModule {
};
GenreModule = (0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Module)({
        controllers: [GenreController],
        providers: [GenreService, PrismaService, ActivityService],
        exports: [GenreService]
    })
], GenreModule);


;// CONCATENATED MODULE: external "@nestjs/axios"
const axios_namespaceObject = require("@nestjs/axios");
;// CONCATENATED MODULE: external "@nestjs/terminus"
const terminus_namespaceObject = require("@nestjs/terminus");
;// CONCATENATED MODULE: ./src/health/health.controller.ts
var health_controller_a, health_controller_b;




let HealthController = class HealthController {
    constructor(health, http) {
        this.health = health;
        this.http = http;
    }
    check() {
        return this.health.check([
            () => this.http.pingCheck('nestjs-docs', 'https://docs.nestjs.com')
        ]);
    }
};
(0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Get)(),
    (0,swagger_namespaceObject.ApiOkResponse)({ description: 'Health check', type: Object }),
    (0,terminus_namespaceObject.HealthCheck)(),
    (0,external_tslib_namespaceObject.__metadata)("design:type", Function),
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", []),
    (0,external_tslib_namespaceObject.__metadata)("design:returntype", void 0)
], HealthController.prototype, "check", null);
HealthController = (0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Controller)('health'),
    (0,swagger_namespaceObject.ApiTags)('❤️ health'),
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", [typeof (health_controller_a = typeof terminus_namespaceObject.HealthCheckService !== "undefined" && terminus_namespaceObject.HealthCheckService) === "function" ? health_controller_a : Object, typeof (health_controller_b = typeof terminus_namespaceObject.HttpHealthIndicator !== "undefined" && terminus_namespaceObject.HttpHealthIndicator) === "function" ? health_controller_b : Object])
], HealthController);


;// CONCATENATED MODULE: ./src/health/health.module.ts





let HealthModule = class HealthModule {
};
HealthModule = (0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Module)({
        imports: [terminus_namespaceObject.TerminusModule, axios_namespaceObject.HttpModule],
        controllers: [HealthController]
    })
], HealthModule);


;// CONCATENATED MODULE: ./src/activity/activity.controller.ts


let ActivityController = class ActivityController {
};
ActivityController = (0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Controller)('activity')
], ActivityController);


;// CONCATENATED MODULE: ./src/activity/activity.module.ts





let ActivityModule = class ActivityModule {
};
ActivityModule = (0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Module)({
        controllers: [ActivityController],
        providers: [ActivityService, PrismaService],
        exports: [ActivityService]
    })
], ActivityModule);


;// CONCATENATED MODULE: ./src/utils/config/env-config.ts

const envConfigSchema = external_zod_namespaceObject.z.object({
    JWT_SECRET: external_zod_namespaceObject.z.string(),
    AWS_REGION: external_zod_namespaceObject.z.string(),
    AWS_BUCKET: external_zod_namespaceObject.z.string(),
    AWS_ENDPOINT: external_zod_namespaceObject.z.string(),
    AWS_ACCESS_KEY_ID: external_zod_namespaceObject.z.string(),
    AWS_SECRET_ACCESS_KEY: external_zod_namespaceObject.z.string(),
    DATABASE_URL: external_zod_namespaceObject.z.string(),
    GOOGLE_CLIENT_ID: external_zod_namespaceObject.z.string(),
    GOOGLE_CLIENT_SECRET: external_zod_namespaceObject.z.string(),
    NODE_ENV: external_zod_namespaceObject.z.string(),
    SENTRY_DSN: external_zod_namespaceObject.z.string(),
    MAX_UPLOAD_SIZE: external_zod_namespaceObject.z.string().transform(v => parseInt(v)),
    PORT: external_zod_namespaceObject.z.string().transform(v => parseInt(v)),
    SERVER_URL: external_zod_namespaceObject.z.string(),
    STORAGE_URL: external_zod_namespaceObject.z.string()
});

;// CONCATENATED MODULE: ./src/parser/parser.entity.ts




(0,zod_openapi_namespaceObject.extendZodWithOpenApi)(external_zod_namespaceObject.z);
const BookTemplateSchema = external_zod_namespaceObject.z.object({
    slug: external_zod_namespaceObject.z.string(),
    title: external_zod_namespaceObject.z.string(),
    author: external_zod_namespaceObject.z.string(),
    description: external_zod_namespaceObject.z.string(),
    picture: external_zod_namespaceObject.z.string(),
    rating: external_zod_namespaceObject.z.number().max(5).min(1),
    genres: external_zod_namespaceObject.z.array(shortGenreSchema)
});
class BookTemplate extends (0,zod_nestjs_namespaceObject.createZodDto)(BookTemplateSchema) {
}

;// CONCATENATED MODULE: ./src/parser/parser.model.ts





(0,zod_openapi_namespaceObject.extendZodWithOpenApi)(external_zod_namespaceObject.z);
const UnfoldOutputSchema = external_zod_namespaceObject.z.object({
    id: external_zod_namespaceObject.z.number(),
    name: external_zod_namespaceObject.z.string(),
    text: external_zod_namespaceObject.z.string()
});
const BookTemplateCatalogOutputSchema = external_zod_namespaceObject.z
    .object({
    data: external_zod_namespaceObject.z.array(BookTemplateSchema)
})
    .merge(baseCatalogModel);
class UnfoldOutput extends (0,zod_nestjs_namespaceObject.createZodDto)(UnfoldOutputSchema) {
}
class BookTemplateCatalogOutput extends (0,zod_nestjs_namespaceObject.createZodDto)(BookTemplateCatalogOutputSchema) {
}

;// CONCATENATED MODULE: external "@nestjs/platform-express"
const platform_express_namespaceObject = require("@nestjs/platform-express");
;// CONCATENATED MODULE: ./src/parser/dto/parser.dto.ts



(0,zod_openapi_namespaceObject.extendZodWithOpenApi)(external_zod_namespaceObject.z);
const ParserDtoSchema = external_zod_namespaceObject.z.object({
    url: external_zod_namespaceObject.z.string().min(1).max(255),
    page: external_zod_namespaceObject.z.number().int().min(0)
});
class ParserDto extends (0,zod_nestjs_namespaceObject.createZodDto)(ParserDtoSchema) {
}

;// CONCATENATED MODULE: external "puppeteer"
const external_puppeteer_namespaceObject = require("puppeteer");
var external_puppeteer_default = /*#__PURE__*/__webpack_require__.n(external_puppeteer_namespaceObject);
;// CONCATENATED MODULE: ./src/parser/helpers/parse-ebook.ts

const ignoredManifest = [
    'https://pagead2.googlesyndication.com',
    'https://creativecdn.com',
    'https://www.googletagmanager.com',
    'https://cdn.krxd.net',
    'https://adservice.google.com',
    'https://cdn.concert.io',
    'https://z.moatads.com',
    'https://cdn.permutive.com'
];
const parseSelectors = {
    title: 'div.BookPageTitleSection > div > h1',
    author: 'div.BookPageMetadataSection > div.BookPageMetadataSection__contributor > h3 > div > span:nth-child(1) > a > span',
    description: 'div.BookPageMetadataSection > div.BookPageMetadataSection__description > div > div.TruncatedContent__text.TruncatedContent__text--large > div > div > span',
    ratingCount: '.RatingStatistics__rating',
    pages: '[data-testid="pagesFormat"]',
    picture: 'div.BookPage__bookCover > div > div > div > div > div > div > img',
    genres: 'div.BookPageMetadataSection > div.BookPageMetadataSection__genres > ul'
};
const useParser = async () => {
    const browser = await external_puppeteer_default().launch({
        headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        ignoreHTTPSErrors: true,
        ignoreDefaultArgs: ['--disable-extensions']
    });
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);
    page.setDefaultTimeout(0);
    await page.setRequestInterception(true);
    page.on('request', request => {
        if (request.resourceType() === 'media' ||
            request.resourceType() === 'font' ||
            request.resourceType() === 'stylesheet' ||
            request.resourceType() === 'manifest' ||
            ignoredManifest.some(d => request.url().startsWith(d))) {
            request.abort();
        }
        else {
            request.continue();
        }
    });
    return { page, browser };
};
const parseBookTable = async (page, url, pageToGo) => {
    await page
        .goto(url + '?page=' + pageToGo, {
        waitUntil: 'domcontentloaded'
    })
        .catch(() => null);
    await page.waitForSelector('.tableList');
    return page.evaluate(() => {
        const books = document.querySelectorAll('.tableList tr');
        return [...books].map((book, index) => {
            const link = book?.querySelector('.bookTitle')?.getAttribute('href');
            const ratingAvg = book.querySelector('.minirating');
            return {
                id: index++,
                link: `https://www.goodreads.com${link}`,
                ratingAvg: ratingAvg?.textContent
                    ? Number.parseFloat(String(ratingAvg.textContent.split('—')[0]).replaceAll('avg rating', ''))
                    : 2.5
            };
        });
    });
};
const parseCurrentBook = async (page, url) => {
    await page
        .goto(url, {
        waitUntil: 'domcontentloaded'
    })
        .catch(() => null);
    console.log('go to', url);
    await page.waitForSelector(parseSelectors.title);
    await page.waitForSelector(parseSelectors.author);
    await page.waitForSelector(parseSelectors.description);
    await page.waitForSelector(parseSelectors.ratingCount);
    await page.waitForSelector(parseSelectors.pages);
    await page.waitForSelector(parseSelectors.picture);
    await page.waitForSelector(parseSelectors.genres +
        ' > span:nth-child(1) > span > a > .Button__labelItem');
    const title = await page.evaluate(() => {
        const title = document.querySelector('div.BookPageTitleSection > div > h1');
        return title?.textContent ?? 'No title';
    });
    const author = await page.evaluate(() => {
        const author = document.querySelector('div.FeaturedPerson__infoPrimary > h4 > a > span');
        return {
            name: author?.textContent ?? 'No author name'
        };
    });
    const description = await page.evaluate(selector => {
        const description = document.querySelector(selector);
        return description?.textContent
            ? description.textContent.replaceAll(/(Librarian's note|Contributor note|See also).*?\./g, '')
            : 'No description';
    }, parseSelectors.description);
    const rating = await page.evaluate(selector => {
        const ratingCount = document.querySelector(selector);
        return ratingCount?.textContent
            ? Number.parseFloat(ratingCount.textContent
                .replaceAll('ratings', '')
                .replaceAll(',', '')
                .trim())
            : 0;
    }, parseSelectors.ratingCount);
    const picture = await page.evaluate(selector => {
        const picture = document.querySelector(selector);
        return picture?.getAttribute('src') ?? 'No picture';
    }, parseSelectors.picture);
    const genres = await page.evaluate(selector => {
        const genres = document.querySelectorAll(selector + ' > span:nth-child(1) > span > a > .Button__labelItem');
        return ([...genres].slice(0, 3).map(genre => genre.textContent) ?? ['No genres']);
    }, parseSelectors.genres);
    return {
        title,
        author,
        description,
        rating,
        picture,
        genres
    };
};

;// CONCATENATED MODULE: external "@liquify/prettify"
const prettify_namespaceObject = require("@liquify/prettify");
var prettify_default = /*#__PURE__*/__webpack_require__.n(prettify_namespaceObject);
;// CONCATENATED MODULE: external "epub2"
const external_epub2_namespaceObject = require("epub2");
var external_epub2_default = /*#__PURE__*/__webpack_require__.n(external_epub2_namespaceObject);
;// CONCATENATED MODULE: external "jsdom"
const external_jsdom_namespaceObject = require("jsdom");
;// CONCATENATED MODULE: ./src/parser/helpers/unfold-ebook.ts






const updatedContent = async (text) => {
    const dom = new external_jsdom_namespaceObject.JSDOM(String(text));
    const elements = dom.window.document.querySelectorAll('*');
    for (const element of elements) {
        if (element.textContent === '' ||
            element.textContent === ' ' ||
            element.textContent === '\n' ||
            !element.textContent ||
            element.textContent === '\n\n') {
            element.remove();
        }
        const attributes = element.getAttributeNames();
        for (const attribute of attributes) {
            element.removeAttribute(attribute);
        }
        if (element.tagName === 'image')
            element.remove();
        if (element.tagName === 'img')
            element.remove();
        if (element.tagName === 'svg')
            element.remove();
        if (element.tagName === 'iframe')
            element.remove();
        if (element.tagName === 'script')
            element.remove();
        if (element.tagName === 'style')
            element.remove();
        if (element.tagName === 'table')
            element.remove();
        if (element.tagName === 'TABLE')
            element.remove();
        if (element.tagName === 'SUP')
            element.remove();
        if (element.tagName === 'SUB')
            element.remove();
    }
    if (!(prettify_default()).format) {
        throw serverError(common_namespaceObject.HttpStatus.BAD_REQUEST, globalErrors.somethingWrong);
    }
    return prettify_default().format(dom.window.document.body?.innerHTML || '', {
        language: 'html',
        indentSize: 2,
        endNewline: true
    })
        .then((formatted) => formatted);
};
const getEbook = async (buffer) => new Promise(resolve => {
    const epub = new (external_epub2_default())(buffer);
    epub.on('end', function () {
        const flow = epub.flow.map((chapter, index) => new Promise(resolve => {
            try {
                if (!chapter.id)
                    return;
                epub.getChapter(chapter.id, async (error, text) => {
                    if (error)
                        return null;
                    if (!text)
                        return null;
                    const finalContent = await updatedContent(text);
                    resolve({
                        id: index + 1,
                        name: String(chapter.title),
                        text: finalContent
                    });
                    return null;
                });
            }
            catch {
                throw serverError(common_namespaceObject.HttpStatus.BAD_REQUEST, adminErrors.invalidChapter);
            }
        }));
        Promise.all(flow)
            .then((chapters) => {
            const validChapters = chapters.filter(chapter => chapter?.text !== null);
            resolve(validChapters.map((chapter, index) => ({
                id: index + 1,
                name: chapter?.name || '',
                text: chapter?.text || ''
            })));
        })
            .catch(() => serverError(common_namespaceObject.HttpStatus.BAD_REQUEST, globalErrors.somethingWrong));
    });
    epub.parse();
});

;// CONCATENATED MODULE: ./src/parser/parser.service.ts
var parser_service_a;








let ParserService = class ParserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async catalog(searchTerm, page) {
        const perPage = 20;
        return {
            data: await this.prisma.bookTemplate.findMany({
                take: perPage,
                select: {
                    title: true,
                    slug: true,
                    rating: true,
                    description: true,
                    author: true,
                    genres: true,
                    picture: true
                },
                ...(page && {
                    skip: page * perPage
                }),
                ...(searchTerm && {
                    where: {
                        OR: [
                            {
                                author: {
                                    contains: searchTerm,
                                    mode: 'insensitive'
                                }
                            },
                            {
                                title: {
                                    contains: searchTerm,
                                    mode: 'insensitive'
                                }
                            }
                        ]
                    },
                    ...(!Number.isNaN(+searchTerm) && {
                        where: {
                            id: +searchTerm
                        }
                    })
                })
            }),
            canLoadMore: page < Math.floor((await this.prisma.bookTemplate.count()) / perPage),
            totalPages: Math.floor((await this.prisma.bookTemplate.count()) / perPage)
        };
    }
    async remove(slug) {
        return this.prisma.bookTemplate.delete({
            where: {
                slug
            }
        });
    }
    async unfold(file) {
        if (!file.buffer && file.mimetype !== 'application/epub+zip')
            throw serverError(common_namespaceObject.HttpStatus.BAD_REQUEST, adminErrors.invalidFile);
        return getEbook(file.buffer);
    }
    async bySlug(slug) {
        const book = await this.prisma.bookTemplate.findUnique({
            where: {
                slug
            },
            select: {
                title: true,
                slug: true,
                rating: true,
                description: true,
                author: true,
                picture: true,
                genres: true
            }
        });
        if (!book)
            throw serverError(common_namespaceObject.HttpStatus.BAD_REQUEST, adminErrors.bookNotFound);
        return book;
    }
    async parse(dto) {
        try {
            const bookTemplate = await this.prisma.bookTemplate.findMany({
                select: {
                    title: true
                }
            });
            const { browser, page } = await useParser();
            const books = await parseBookTable(page, dto.url, dto.page);
            for (const book of books) {
                try {
                    const { title, author, description, picture, genres, rating } = await parseCurrentBook(page, book.link);
                    if (bookTemplate.some(b => b.title === title.trim()))
                        continue;
                    if (rating < 2)
                        continue;
                    const goodGenres = await this.prisma.genre.findMany({
                        where: {
                            OR: genres.map(name => ({
                                name: {
                                    contains: String(name),
                                    mode: 'insensitive'
                                }
                            }))
                        }
                    });
                    await this.prisma.bookTemplate.create({
                        data: {
                            title: title.trim(),
                            author: author.name,
                            description,
                            slug: slugify(title),
                            picture,
                            rating,
                            genres: {
                                connect: goodGenres.map(genre => ({
                                    name: genre.name
                                }))
                            }
                        }
                    });
                }
                catch (error) {
                    console.error(error);
                }
            }
            await page.close();
            await browser.close();
        }
        catch (error) {
            console.error(error);
        }
    }
};
ParserService = (0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Injectable)(),
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", [typeof (parser_service_a = typeof PrismaService !== "undefined" && PrismaService) === "function" ? parser_service_a : Object])
], ParserService);


;// CONCATENATED MODULE: ./src/parser/parser.controller.ts
var parser_controller_a, parser_controller_b, parser_controller_c, parser_controller_d, parser_controller_e, parser_controller_f, parser_controller_g;









let ParserController = class ParserController {
    constructor(parserService) {
        this.parserService = parserService;
    }
    async catalog(searchTerm, page) {
        return this.parserService.catalog(searchTerm, page || 1);
    }
    bySlug(slug) {
        return this.parserService.bySlug(slug);
    }
    async parse(dto) {
        return this.parserService.parse(dto);
    }
    async unfold(file) {
        return this.parserService.unfold(file);
    }
    async remove(slug) {
        return this.parserService.remove(slug);
    }
};
(0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Get)('admin/catalog'),
    (0,swagger_namespaceObject.ApiOkResponse)({ type: BookTemplateCatalogOutput }),
    (0,swagger_namespaceObject.ApiQuery)({ name: 'searchTerm', required: false, example: 'The Hobbit' }),
    (0,swagger_namespaceObject.ApiQuery)({ name: 'page', required: false, example: 1 }),
    (0,external_tslib_namespaceObject.__param)(0, (0,common_namespaceObject.Query)('searchTerm')),
    (0,external_tslib_namespaceObject.__param)(1, (0,common_namespaceObject.Query)('page')),
    (0,external_tslib_namespaceObject.__metadata)("design:type", Function),
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", [String, Number]),
    (0,external_tslib_namespaceObject.__metadata)("design:returntype", typeof (parser_controller_b = typeof Promise !== "undefined" && Promise) === "function" ? parser_controller_b : Object)
], ParserController.prototype, "catalog", null);
(0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Get)('admin/by-slug/:slug'),
    (0,swagger_namespaceObject.ApiOkResponse)({ type: BookTemplate }),
    (0,external_tslib_namespaceObject.__param)(0, (0,common_namespaceObject.Param)('slug')),
    (0,external_tslib_namespaceObject.__metadata)("design:type", Function),
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", [String]),
    (0,external_tslib_namespaceObject.__metadata)("design:returntype", typeof (parser_controller_c = typeof Promise !== "undefined" && Promise) === "function" ? parser_controller_c : Object)
], ParserController.prototype, "bySlug", null);
(0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Post)('admin/parse'),
    (0,swagger_namespaceObject.ApiBody)({ type: ParserDto }),
    (0,external_tslib_namespaceObject.__param)(0, (0,common_namespaceObject.Body)()),
    (0,external_tslib_namespaceObject.__metadata)("design:type", Function),
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", [typeof (parser_controller_d = typeof ParserDto !== "undefined" && ParserDto) === "function" ? parser_controller_d : Object]),
    (0,external_tslib_namespaceObject.__metadata)("design:returntype", Promise)
], ParserController.prototype, "parse", null);
(0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Post)('admin/unfold'),
    (0,swagger_namespaceObject.ApiOkResponse)({
        type: UnfoldOutput,
        description: 'Unfolded book content',
        isArray: true
    }),
    (0,swagger_namespaceObject.ApiConsumes)('multipart/form-data'),
    (0,swagger_namespaceObject.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary'
                }
            }
        }
    }),
    (0,common_namespaceObject.UseInterceptors)((0,platform_express_namespaceObject.FileInterceptor)('file')),
    (0,external_tslib_namespaceObject.__param)(0, (0,common_namespaceObject.UploadedFile)(new common_namespaceObject.ParseFilePipe({
        validators: [
            new common_namespaceObject.MaxFileSizeValidator({
                maxSize: 10000000000
            })
        ]
    }))),
    (0,external_tslib_namespaceObject.__metadata)("design:type", Function),
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", [typeof (parser_controller_f = typeof Express !== "undefined" && (parser_controller_e = Express.Multer) !== void 0 && parser_controller_e.File) === "function" ? parser_controller_f : Object]),
    (0,external_tslib_namespaceObject.__metadata)("design:returntype", typeof (parser_controller_g = typeof Promise !== "undefined" && Promise) === "function" ? parser_controller_g : Object)
], ParserController.prototype, "unfold", null);
(0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Delete)('admin/remove/:slug'),
    (0,external_tslib_namespaceObject.__param)(0, (0,common_namespaceObject.Param)('slug')),
    (0,external_tslib_namespaceObject.__metadata)("design:type", Function),
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", [String]),
    (0,external_tslib_namespaceObject.__metadata)("design:returntype", Promise)
], ParserController.prototype, "remove", null);
ParserController = (0,external_tslib_namespaceObject.__decorate)([
    Auth('admin'),
    (0,swagger_namespaceObject.ApiTags)('📦 parser'),
    (0,swagger_namespaceObject.ApiBearerAuth)(),
    (0,common_namespaceObject.Controller)('parser'),
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", [typeof (parser_controller_a = typeof ParserService !== "undefined" && ParserService) === "function" ? parser_controller_a : Object])
], ParserController);


;// CONCATENATED MODULE: ./src/parser/parser.module.ts





let ParserModule = class ParserModule {
};
ParserModule = (0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Module)({
        controllers: [ParserController],
        providers: [ParserService, PrismaService]
    })
], ParserModule);


;// CONCATENATED MODULE: ./src/recommendation/dto/update-recommendation.dto.ts



(0,zod_openapi_namespaceObject.extendZodWithOpenApi)(external_zod_namespaceObject.z);
const UpdateRecommendationDtoSchema = external_zod_namespaceObject.z.object({
    genreSlugs: external_zod_namespaceObject.z.array(external_zod_namespaceObject.z.string()).min(1)
});
class UpdateRecommendationDto extends (0,zod_nestjs_namespaceObject.createZodDto)(UpdateRecommendationDtoSchema) {
}

;// CONCATENATED MODULE: ./src/recommendation/recommendation.controller.ts
var recommendation_controller_a, recommendation_controller_b, recommendation_controller_c;








let RecommendationController = class RecommendationController {
    constructor(recommendationService) {
        this.recommendationService = recommendationService;
    }
    async updateRecommendation(userId, dto) {
        return this.recommendationService.updateRecommendation(+userId, dto);
    }
    async currentRecommendation(userId) {
        return this.recommendationService.currentRecommendation(+userId);
    }
};
(0,external_tslib_namespaceObject.__decorate)([
    Auth(),
    (0,common_namespaceObject.Post)('/update-recommendation'),
    (0,swagger_namespaceObject.ApiOkResponse)({ description: 'Recommendation updated' }),
    (0,swagger_namespaceObject.ApiBody)({ type: UpdateRecommendationDto }),
    (0,external_tslib_namespaceObject.__param)(0, CurrentUser('id')),
    (0,external_tslib_namespaceObject.__param)(1, (0,common_namespaceObject.Body)()),
    (0,external_tslib_namespaceObject.__metadata)("design:type", Function),
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", [Number, typeof (recommendation_controller_b = typeof UpdateRecommendationDto !== "undefined" && UpdateRecommendationDto) === "function" ? recommendation_controller_b : Object]),
    (0,external_tslib_namespaceObject.__metadata)("design:returntype", Promise)
], RecommendationController.prototype, "updateRecommendation", null);
(0,external_tslib_namespaceObject.__decorate)([
    Auth(),
    (0,common_namespaceObject.Get)('/recommendation-genre'),
    (0,swagger_namespaceObject.ApiOkResponse)({
        type: [ShortGenre],
        description: 'Recommendation genres'
    }),
    (0,external_tslib_namespaceObject.__param)(0, CurrentUser('id')),
    (0,external_tslib_namespaceObject.__metadata)("design:type", Function),
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", [Number]),
    (0,external_tslib_namespaceObject.__metadata)("design:returntype", typeof (recommendation_controller_c = typeof Promise !== "undefined" && Promise) === "function" ? recommendation_controller_c : Object)
], RecommendationController.prototype, "currentRecommendation", null);
RecommendationController = (0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Controller)('recommendation'),
    (0,swagger_namespaceObject.ApiTags)('📨 recommendation'),
    (0,swagger_namespaceObject.ApiBearerAuth)(),
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", [typeof (recommendation_controller_a = typeof RecommendationService !== "undefined" && RecommendationService) === "function" ? recommendation_controller_a : Object])
], RecommendationController);


;// CONCATENATED MODULE: ./src/recommendation/recommendation.module.ts






let RecommendationModule = class RecommendationModule {
};
RecommendationModule = (0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Module)({
        controllers: [RecommendationController],
        providers: [RecommendationService, PrismaService, ActivityService]
    })
], RecommendationModule);


;// CONCATENATED MODULE: ../../libs/global/validation/review/review.book.dto.ts

const ReviewBookDtoSchema = external_zod_namespaceObject.z.object({
    rating: external_zod_namespaceObject.z.number().int().min(1).max(5),
    tags: external_zod_namespaceObject.z.array(external_zod_namespaceObject.z.string()).optional(),
    comment: external_zod_namespaceObject.z.string().optional()
});

;// CONCATENATED MODULE: ./src/review/dto/review.book.dto.ts




(0,zod_openapi_namespaceObject.extendZodWithOpenApi)(external_zod_namespaceObject.z);
class ReviewBookDto extends (0,zod_nestjs_namespaceObject.createZodDto)(ReviewBookDtoSchema) {
}

;// CONCATENATED MODULE: ./src/review/review.service.ts
var review_service_a, review_service_b;







let ReviewService = class ReviewService {
    constructor(prisma, activityService) {
        this.prisma = prisma;
        this.activityService = activityService;
    }
    async review(userId, bookSlug, dto) {
        await this.checkBookExist(bookSlug);
        await this.checkUserExist(userId);
        await this.activityService.create({
            type: client_namespaceObject.Activities.reviewBook,
            importance: 4,
            userId,
            bookSlug
        });
        await this.prisma.review.create({
            data: {
                rating: dto.rating,
                tags: dto.tags,
                text: dto.comment,
                user: {
                    connect: {
                        id: userId
                    }
                },
                book: {
                    connect: {
                        slug: bookSlug
                    }
                }
            }
        });
    }
    async checkBookExist(slug) {
        const book = await this.prisma.book.findUnique({
            where: { slug, isPublic: true },
            select: {
                id: true
            }
        });
        if (!book)
            throw serverError(common_namespaceObject.HttpStatus.BAD_REQUEST, globalErrors.unknownError);
        return !!book;
    }
    async checkUserExist(id) {
        const userExist = await this.prisma.user.findUnique({
            where: { id: id },
            select: {
                id: true
            }
        });
        if (!userExist)
            throw serverError(common_namespaceObject.HttpStatus.BAD_REQUEST, adminErrors.userNotFound);
        return !!userExist;
    }
};
ReviewService = (0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Injectable)(),
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", [typeof (review_service_a = typeof PrismaService !== "undefined" && PrismaService) === "function" ? review_service_a : Object, typeof (review_service_b = typeof ActivityService !== "undefined" && ActivityService) === "function" ? review_service_b : Object])
], ReviewService);


;// CONCATENATED MODULE: ./src/review/review.controller.ts
var review_controller_a, review_controller_b;







let ReviewController = class ReviewController {
    constructor(reviewService) {
        this.reviewService = reviewService;
    }
    async review(userId, bookSlug, dto) {
        return this.reviewService.review(+userId, bookSlug, dto);
    }
};
(0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Post)('/review/:slug'),
    Auth(),
    (0,swagger_namespaceObject.ApiOkResponse)({ description: 'Review book' }),
    (0,swagger_namespaceObject.ApiBody)({ type: ReviewBookDto, required: true, description: 'Review book' }),
    (0,external_tslib_namespaceObject.__param)(0, CurrentUser('id')),
    (0,external_tslib_namespaceObject.__param)(1, (0,common_namespaceObject.Param)('slug')),
    (0,external_tslib_namespaceObject.__param)(2, (0,common_namespaceObject.Body)()),
    (0,external_tslib_namespaceObject.__metadata)("design:type", Function),
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", [Number, String, typeof (review_controller_b = typeof ReviewBookDto !== "undefined" && ReviewBookDto) === "function" ? review_controller_b : Object]),
    (0,external_tslib_namespaceObject.__metadata)("design:returntype", Promise)
], ReviewController.prototype, "review", null);
ReviewController = (0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Controller)('review'),
    (0,swagger_namespaceObject.ApiTags)('⭐ review'),
    (0,swagger_namespaceObject.ApiBearerAuth)(),
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", [typeof (review_controller_a = typeof ReviewService !== "undefined" && ReviewService) === "function" ? review_controller_a : Object])
], ReviewController);


;// CONCATENATED MODULE: ./src/review/review.module.ts






let ReviewModule = class ReviewModule {
};
ReviewModule = (0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Module)({
        controllers: [ReviewController],
        providers: [ReviewService, PrismaService, ActivityService]
    })
], ReviewModule);


;// CONCATENATED MODULE: ./src/storage/dto/upload.dto.ts



(0,zod_openapi_namespaceObject.extendZodWithOpenApi)(external_zod_namespaceObject.z);
const UploadOutputDtoSchema = external_zod_namespaceObject.z.object({
    name: external_zod_namespaceObject.z.string()
});
class UploadOutputDto extends (0,zod_nestjs_namespaceObject.createZodDto)(UploadOutputDtoSchema) {
}

;// CONCATENATED MODULE: ./src/storage/storage.controller.ts
var storage_controller_a, storage_controller_b, storage_controller_c, storage_controller_d;








let StorageController = class StorageController {
    constructor(uploadService) {
        this.uploadService = uploadService;
    }
    async upload(file, folder) {
        return this.uploadService.upload({
            file: file.buffer,
            fileName: file.originalname,
            folder
        });
    }
};
(0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Post)('/:folder'),
    (0,swagger_namespaceObject.ApiParam)({
        name: 'folder',
        enum: StorageFolderArray
    }),
    (0,common_namespaceObject.UseInterceptors)((0,platform_express_namespaceObject.FileInterceptor)('file')),
    (0,swagger_namespaceObject.ApiConsumes)('multipart/form-data'),
    (0,swagger_namespaceObject.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary'
                }
            }
        }
    }),
    (0,swagger_namespaceObject.ApiOkResponse)({ description: 'File uploaded', type: UploadOutputDto }),
    (0,external_tslib_namespaceObject.__param)(0, (0,common_namespaceObject.UploadedFile)(new common_namespaceObject.ParseFilePipe({
        validators: [
            new common_namespaceObject.MaxFileSizeValidator({
                maxSize: Number(process.env['MAX_FILE_SIZE'])
            })
        ]
    }))),
    (0,external_tslib_namespaceObject.__param)(1, (0,common_namespaceObject.Param)('folder')),
    (0,external_tslib_namespaceObject.__metadata)("design:type", Function),
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", [typeof (storage_controller_c = typeof Express !== "undefined" && (storage_controller_b = Express.Multer) !== void 0 && storage_controller_b.File) === "function" ? storage_controller_c : Object, Object]),
    (0,external_tslib_namespaceObject.__metadata)("design:returntype", typeof (storage_controller_d = typeof Promise !== "undefined" && Promise) === "function" ? storage_controller_d : Object)
], StorageController.prototype, "upload", null);
StorageController = (0,external_tslib_namespaceObject.__decorate)([
    (0,swagger_namespaceObject.ApiTags)('storage'),
    (0,swagger_namespaceObject.ApiBearerAuth)(),
    (0,common_namespaceObject.Controller)('storage'),
    Auth('admin'),
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", [typeof (storage_controller_a = typeof StorageService !== "undefined" && StorageService) === "function" ? storage_controller_a : Object])
], StorageController);


;// CONCATENATED MODULE: ./src/storage/storage.module.ts





let StorageModule = class StorageModule {
};
StorageModule = (0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Module)({
        controllers: [StorageController],
        providers: [StorageService],
        imports: [config_namespaceObject.ConfigModule],
        exports: [StorageService]
    })
], StorageModule);


;// CONCATENATED MODULE: ./src/user/user.entity.ts



(0,zod_openapi_namespaceObject.extendZodWithOpenApi)(external_zod_namespaceObject.z);
const UserSchema = external_zod_namespaceObject.z.object({
    id: external_zod_namespaceObject.z.number(),
    createdAt: external_zod_namespaceObject.z.date(),
    email: external_zod_namespaceObject.z.string().email(),
    socialId: external_zod_namespaceObject.z.string().nullable().optional(),
    picture: external_zod_namespaceObject.z.string(),
    fullName: external_zod_namespaceObject.z.string(),
    location: external_zod_namespaceObject.z.string()
});
class User extends (0,zod_nestjs_namespaceObject.createZodDto)(UserSchema) {
}

;// CONCATENATED MODULE: ./src/user/user.model.ts








(0,zod_openapi_namespaceObject.extendZodWithOpenApi)(external_zod_namespaceObject.z);
const CatalogUserOutputSchema = external_zod_namespaceObject.z
    .object({
    id: external_zod_namespaceObject.z.number(),
    email: external_zod_namespaceObject.z.string(),
    selectedGenres: external_zod_namespaceObject.z.array(shortGenreSchema),
    activities: external_zod_namespaceObject.z.array(ActivitySchema),
    _count: external_zod_namespaceObject.z
        .object({
        savedBooks: external_zod_namespaceObject.z.number(),
        finishedBooks: external_zod_namespaceObject.z.number(),
        readingBooks: external_zod_namespaceObject.z.number()
    })
        .strict()
})
    .merge(UserSchema);
const UserCatalogOutputSchema = external_zod_namespaceObject.z
    .object({
    data: external_zod_namespaceObject.z.array(CatalogUserOutputSchema)
})
    .merge(baseCatalogModel);
const UserLibraryOutputSchema = external_zod_namespaceObject.z.object({
    readingBooks: external_zod_namespaceObject.z.array(ShortBookSchema),
    finishedBooks: external_zod_namespaceObject.z.array(ShortBookSchema),
    savedBooks: external_zod_namespaceObject.z.array(ShortBookSchema)
});
class UserCatalogOutput extends (0,zod_nestjs_namespaceObject.createZodDto)(UserCatalogOutputSchema) {
}
class UserLibraryOutput extends (0,zod_nestjs_namespaceObject.createZodDto)(UserLibraryOutputSchema) {
}

;// CONCATENATED MODULE: ./src/user/user.controller.ts
var user_controller_a, user_controller_b;







let UserController = class UserController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async library(id) {
        return this.usersService.library(+id);
    }
    async startReading(userId, slug) {
        return this.usersService.startReading(userId, slug);
    }
    async finishReading(userId, slug) {
        return this.usersService.finishReading(userId, slug);
    }
    async toggleSave(userId, slug) {
        return this.usersService.toggleSave(userId, slug);
    }
    async isSaved(userId, slug) {
        return this.usersService.isSaved(userId, slug);
    }
    // admin
    async catalog(searchTerm, cursor) {
        return this.usersService.catalog(searchTerm || '', cursor);
    }
    async remove(id) {
        return this.usersService.remove(+id);
    }
};
(0,external_tslib_namespaceObject.__decorate)([
    Auth(),
    (0,common_namespaceObject.Get)('/library'),
    (0,swagger_namespaceObject.ApiOkResponse)({ type: UserLibraryOutput }),
    (0,external_tslib_namespaceObject.__param)(0, CurrentUser('id')),
    (0,external_tslib_namespaceObject.__metadata)("design:type", Function),
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", [Number]),
    (0,external_tslib_namespaceObject.__metadata)("design:returntype", Promise)
], UserController.prototype, "library", null);
(0,external_tslib_namespaceObject.__decorate)([
    Auth(),
    (0,common_namespaceObject.Patch)('/start-reading/:slug'),
    (0,external_tslib_namespaceObject.__param)(0, CurrentUser('id')),
    (0,external_tslib_namespaceObject.__param)(1, (0,common_namespaceObject.Param)('slug')),
    (0,external_tslib_namespaceObject.__metadata)("design:type", Function),
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", [Number, String]),
    (0,external_tslib_namespaceObject.__metadata)("design:returntype", Promise)
], UserController.prototype, "startReading", null);
(0,external_tslib_namespaceObject.__decorate)([
    Auth(),
    (0,common_namespaceObject.Patch)('/finish-reading/:slug'),
    (0,external_tslib_namespaceObject.__param)(0, CurrentUser('id')),
    (0,external_tslib_namespaceObject.__param)(1, (0,common_namespaceObject.Param)('slug')),
    (0,external_tslib_namespaceObject.__metadata)("design:type", Function),
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", [Number, String]),
    (0,external_tslib_namespaceObject.__metadata)("design:returntype", Promise)
], UserController.prototype, "finishReading", null);
(0,external_tslib_namespaceObject.__decorate)([
    Auth(),
    (0,common_namespaceObject.Patch)('/toggle-save/:slug'),
    (0,swagger_namespaceObject.ApiOkResponse)({ type: Boolean }),
    (0,external_tslib_namespaceObject.__param)(0, CurrentUser('id')),
    (0,external_tslib_namespaceObject.__param)(1, (0,common_namespaceObject.Param)('slug')),
    (0,external_tslib_namespaceObject.__metadata)("design:type", Function),
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", [Number, String]),
    (0,external_tslib_namespaceObject.__metadata)("design:returntype", Promise)
], UserController.prototype, "toggleSave", null);
(0,external_tslib_namespaceObject.__decorate)([
    Auth(),
    (0,common_namespaceObject.Get)('/is-saved/:slug'),
    (0,swagger_namespaceObject.ApiOkResponse)({ type: Boolean }),
    (0,external_tslib_namespaceObject.__param)(0, CurrentUser('id')),
    (0,external_tslib_namespaceObject.__param)(1, (0,common_namespaceObject.Param)('slug')),
    (0,external_tslib_namespaceObject.__metadata)("design:type", Function),
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", [Number, String]),
    (0,external_tslib_namespaceObject.__metadata)("design:returntype", Promise)
], UserController.prototype, "isSaved", null);
(0,external_tslib_namespaceObject.__decorate)([
    Auth('admin'),
    (0,common_namespaceObject.Get)('admin/catalog'),
    (0,swagger_namespaceObject.ApiOkResponse)({ type: UserCatalogOutput }),
    (0,external_tslib_namespaceObject.__param)(0, (0,common_namespaceObject.Query)('searchTerm')),
    (0,external_tslib_namespaceObject.__param)(1, (0,common_namespaceObject.Query)('cursor')),
    (0,external_tslib_namespaceObject.__metadata)("design:type", Function),
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", [String, Number]),
    (0,external_tslib_namespaceObject.__metadata)("design:returntype", typeof (user_controller_b = typeof Promise !== "undefined" && Promise) === "function" ? user_controller_b : Object)
], UserController.prototype, "catalog", null);
(0,external_tslib_namespaceObject.__decorate)([
    Auth('admin'),
    (0,common_namespaceObject.Delete)('admin/remove/:id'),
    (0,external_tslib_namespaceObject.__param)(0, (0,common_namespaceObject.Param)('id')),
    (0,external_tslib_namespaceObject.__metadata)("design:type", Function),
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", [Number]),
    (0,external_tslib_namespaceObject.__metadata)("design:returntype", Promise)
], UserController.prototype, "remove", null);
UserController = (0,external_tslib_namespaceObject.__decorate)([
    (0,swagger_namespaceObject.ApiBearerAuth)(),
    (0,common_namespaceObject.Controller)('user'),
    (0,swagger_namespaceObject.ApiTags)('👤 user'),
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", [typeof (user_controller_a = typeof UserService !== "undefined" && UserService) === "function" ? user_controller_a : Object])
], UserController);


;// CONCATENATED MODULE: ./src/user/user.module.ts







let UserModule = class UserModule {
};
UserModule = (0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Module)({
        controllers: [UserController],
        providers: [UserService, PrismaService, ActivityService],
        exports: [UserService],
        imports: [config_namespaceObject.ConfigModule]
    })
], UserModule);


;// CONCATENATED MODULE: ./src/utils/helpers/msToSec.ts
const msToSec = (ms) => (ms / 1000).toFixed(2);

;// CONCATENATED MODULE: ./src/utils/logger/logger.ts



let AppLoggerMiddleware = class AppLoggerMiddleware {
    constructor() {
        this.logger = new common_namespaceObject.Logger('HTTP');
    }
    use(request, response, next) {
        const { method, originalUrl } = request;
        const startAt = process.hrtime();
        response.on('finish', () => {
            const { statusCode } = response;
            const diff = process.hrtime(startAt);
            const responseTime = diff[0] * 1e3 + diff[1] * 1e-6;
            this.logger.log(`${method} ${originalUrl.replace('/api', '')} ${statusCode} ${msToSec(responseTime)}s`);
        });
        next();
    }
};
AppLoggerMiddleware = (0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Injectable)()
], AppLoggerMiddleware);


;// CONCATENATED MODULE: ./src/app.module.ts





















let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(AppLoggerMiddleware).forRoutes('*');
    }
};
AppModule = (0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Module)({
        imports: [
            UserModule,
            CatalogModule,
            config_namespaceObject.ConfigModule.forRoot({
                isGlobal: true,
                validate: config => envConfigSchema.parse(config)
            }),
            GenreModule,
            BookModule,
            AuthModule,
            StorageModule,
            ParserModule,
            ActivityModule,
            cache_manager_namespaceObject.CacheModule.register({
                isGlobal: true,
                max: 1000,
                ttl: 60
            }),
            throttler_namespaceObject.ThrottlerModule.forRoot([
                {
                    ttl: 60,
                    limit: 10
                }
            ]),
            ReviewModule,
            RecommendationModule,
            HealthModule,
            EbookModule
        ],
        controllers: [AppController],
        providers: [AppService]
    })
], AppModule);


;// CONCATENATED MODULE: ./src/utils/common/http-exception.filter.ts


let HttpExceptionFilter = class HttpExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus();
        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: exception.message
        });
    }
};
HttpExceptionFilter = (0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Catch)(common_namespaceObject.HttpException)
], HttpExceptionFilter);


;// CONCATENATED MODULE: ./src/utils/common/sentry.ts




let SentryFilter = class SentryFilter extends core_namespaceObject.BaseExceptionFilter {
    catch(exception, host) {
        node_namespaceObject.captureException(exception);
        super.catch(exception, host);
    }
};
SentryFilter = (0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Catch)()
], SentryFilter);


;// CONCATENATED MODULE: ../../libs/global/utils/index.ts
const appName = 'Booknex';

;// CONCATENATED MODULE: ./src/utils/config/open-api.config.ts


const openApiConfig = new swagger_namespaceObject.DocumentBuilder()
    .setTitle(appName)
    .setContact(appName, 'https://github.com/kravchenko-anton/booknex-2-monorepo', 'Github repository')
    .setVersion('1.0')
    .addTag('👤 user', 'user service')
    .addTag('🔐 auth', 'auth service')
    .addTag('📙 book', 'book service')
    .addTag('📚 catalog', 'catalog service')
    .addTag('❤️ health', 'health service')
    .addTag('🔖 genre', 'genre service')
    .addTag('📁 storage', 'storage service')
    .addTag('⭐ review', 'review service')
    .addTag('📨 recommendation', 'recommendation service')
    .addTag('📦 parser', 'parser service')
    .addBearerAuth();
const typesGeneratorConfig = {
    webServerOptions: {
        enabled: process.env['NODE_ENV'] === 'development',
        path: 'api-docs'
    },
    fileGeneratorOptions: {
        enabled: process.env['NODE_ENV'] === 'development',
        outputFilePath: './openapi.yaml' // or ./openapi.json
    },
    clientGeneratorOptions: {
        enabled: process.env['NODE_ENV'] === 'development',
        type: 'typescript-axios',
        outputFolderPath: './libs/global/api-client',
        additionalProperties: 'apiPackage=clients,modelPackage=models,withoutPrefixEnums=true,withSeparateModelsAndApi=true',
        openApiFilePath: './openapi.yaml',
        skipValidation: true
    }
};

;// CONCATENATED MODULE: ./src/main.ts










async function bootstrap() {
    const app = await core_namespaceObject.NestFactory.create(AppModule);
    const { httpAdapter } = app.get(core_namespaceObject.HttpAdapterHost);
    app.useGlobalFilters(new HttpExceptionFilter());
    app.enableCors({});
    app.use(external_helmet_default()());
    app.useGlobalPipes(new zod_nestjs_namespaceObject.ZodValidationPipe());
    app.use((0,external_express_namespaceObject.json)({ limit: '10mb' })); // For load ebook
    await external_nest_openapi_tools_namespaceObject.OpenApiNestFactory.configure(app, openApiConfig, typesGeneratorConfig);
    node_namespaceObject.init({
        dsn: process.env['SENTRY_DSN'],
        environment: process.env['NODE_ENV'] || 'development'
    }); // Sentry configuration
    app.useGlobalFilters(new SentryFilter(httpAdapter));
    await app.listen(process.env['PORT'] || 3000);
}
bootstrap(); // eslint-disable-line unicorn/prefer-top-level-await

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;