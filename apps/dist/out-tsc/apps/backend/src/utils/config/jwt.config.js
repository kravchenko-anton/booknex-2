export const getJwtConfig = async (config) => ({
    secret: await config.get('JWT_SECRET')
});
//# sourceMappingURL=jwt.config.js.map