"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_strategy_1 = require("./jwt.strategy");
const testing_1 = require("@nestjs/testing");
const config_1 = require("@nestjs/config");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
describe('JwtStrategy', () => {
    let strategy;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            imports: [config_1.ConfigModule.forRoot()],
            providers: [jwt_strategy_1.JwtStrategy],
        }).compile();
        strategy = module.get(jwt_strategy_1.JwtStrategy);
    });
    it('should be defined', () => {
        expect(strategy).toBeDefined();
    });
    describe('validate', () => {
        it('should validate and return the user payload', async () => {
            const payload = {
                userId: 1,
                email: 'user@example.com',
                role: 'admin',
            };
            const result = await strategy.validate(payload);
            expect(result).toEqual({
                id: payload.userId,
                email: payload.email,
                role: payload.role,
            });
        });
        it('should throw an error if JWT secret is not set', async () => {
            process.env.JWT_SECRET = '';
            expect(() => {
                new jwt_strategy_1.JwtStrategy();
            }).toThrow(Error);
        });
    });
});
//# sourceMappingURL=jwt.strategy.spec.js.map