"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.production = void 0;
exports.production = {
    HTTP: {
        PORT: 8080,
        HOST: process.env.HTTP_HOST,
        BASE_URL: process.env.HTTP_BASE_URL,
    },
    JWT: {
        SECRET: process.env.JWT_SECRET,
    },
};
//# sourceMappingURL=production.js.map