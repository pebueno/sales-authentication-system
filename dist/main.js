"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        stopAtFirstError: true,
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Typescript-Challenge')
        .setDescription('This is a simple API to manage agents, customers, orders and users')
        .addTag('Auth')
        .addTag('Agents')
        .addTag('Customers')
        .addTag('Orders')
        .addTag('Users')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('/api/docs', app, document);
    app.enableCors({
        origin: 'http://localhost:5173',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });
    await app.listen(process.env.PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map