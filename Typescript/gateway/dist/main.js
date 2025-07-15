"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = app.get(config_1.ConfigService);
    const port = config.get('HTTP.PORT');
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, transform: true }));
    app.setGlobalPrefix(config.get('HTTP.VERSION'));
    await app.listen(port, async () => {
        console.log('[GATEWAY]', config.get('HTTP.BASE_URL'));
    });
}
bootstrap();
//# sourceMappingURL=main.js.map