import { returnBookObject } from '@/src/book/return.book.object';
import { ReturnGenreObject } from '@/src/genre/return.genre.object';
import { returnUserObject } from '@/src/user/return.user.object';
import { Prisma } from '@prisma/client';
export const userLibraryFields = (userId) => ({
    where: { id: userId },
    select: Prisma.validator()({
        readingBooks: {
            select: {
                ...returnBookObject,
                readingHistory: {
                    select: {
                        id: true,
                        scrollPosition: true,
                        endProgress: true,
                        endDate: true
                    },
                    orderBy: {
                        endDate: 'desc'
                    },
                    take: 1
                }
            },
            where: {
                isPublic: true
            }
        },
        finishedBooks: {
            select: returnBookObject,
            where: {
                isPublic: true
            }
        },
        savedBooks: {
            select: returnBookObject,
            where: {
                isPublic: true
            }
        }
    })
});
export const userCatalogFields = ({ page, perPage, searchTerm }) => ({
    take: perPage,
    select: Prisma.validator()({
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
        readingHistory: {
            orderBy: {
                endDate: 'asc'
            },
            select: {
                endDate: true,
                progressDelta: true,
                readingTimeMs: true,
                scrollPosition: true,
                startDate: true,
                book: {
                    select: {
                        pagesCount: true
                    }
                }
            }
        },
        _count: {
            select: {
                savedBooks: true,
                finishedBooks: true,
                readingBooks: true
            }
        }
    }),
    ...(page && {
        skip: page * perPage
    }),
    ...(searchTerm && {
        where: {
            fullName: {
                contains: searchTerm
            }
        },
        ...(searchTerm && {
            where: {
                id: searchTerm
            }
        })
    })
});
export const userFinishReadingBookFields = (slug) => Prisma.validator()({
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
});
export const userRemoveFromLibraryFields = (slug) => Prisma.validator()({
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
        disconnect: {
            slug
        }
    }
});
export const userStartReadingBookFields = (slug) => Prisma.validator()({
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
});
export const userToggleSaveFields = ({ isSavedExist, slug }) => Prisma.validator()({
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
});
//# sourceMappingURL=user.fields.js.map