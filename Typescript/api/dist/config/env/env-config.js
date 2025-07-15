"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envConfig = void 0;
const local_1 = require("./local");
const production_1 = require("./production");
const ENV = {
    LOCAL: 'local',
    PRODUCTION: 'production',
};
const envConfig = () => {
    switch (process.env.NODE_ENV) {
        case ENV.LOCAL: {
            return local_1.local;
        }
        case ENV.PRODUCTION: {
            return production_1.production;
        }
        default: {
            return production_1.production;
        }
    }
};
exports.envConfig = envConfig;
//# sourceMappingURL=env-config.js.map