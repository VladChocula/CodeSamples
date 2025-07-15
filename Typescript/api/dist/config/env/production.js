"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.production = void 0;
exports.production = {
    DATABASE_URL: process.env.DATABASE_URL,
    JWT: {
        SECRET: process.env.JWT_SECRET,
    },
};
//# sourceMappingURL=production.js.map