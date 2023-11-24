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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const csv = __importStar(require("fast-csv"));
const fulcrum_schema_1 = __importDefault(require("../db/metaphoricalCards/fulcrum.schema"));
const internal_compass_schema_1 = __importDefault(require("../db/metaphoricalCards/internal-compass.schema"));
const saveFiles = () => {
    try {
        const cardsFolderPath = path_1.default.join(__dirname, 'lib/cards');
        fs_1.default.readdirSync(cardsFolderPath).forEach((filename) => {
            fs_1.default.readFile(path_1.default.join(cardsFolderPath, filename), (err, file) => {
                if (err)
                    throw new Error(err.message);
                fs_1.default.writeFile(path_1.default.join('storage', filename), file, (err) => {
                    if (err)
                        throw new Error(err.message);
                    else
                        return file;
                });
            });
        });
        console.log('files was saved');
    }
    catch (e) {
        throw new Error(e.message);
    }
};
const saveCardsToDb = async () => {
    try {
        const filesPathes = [path_1.default.join(__dirname, 'lib/files/fulcrum.csv'), path_1.default.join(__dirname, 'lib/files/internalCompass.csv')];
        for (const filePath of filesPathes) {
            let deckArr = filePath.split('/');
            deckArr = deckArr[deckArr.length - 1].split('.');
            const deck = deckArr[0];
            await new Promise((resolve, reject) => {
                fs_1.default.createReadStream(filePath).pipe(csv
                    .parse({ headers: true })
                    .on('data', async (row) => {
                    if (!row)
                        return;
                    if (deck === 'fulcrum')
                        await fulcrum_schema_1.default.create({ ...row });
                    else if (deck === 'internalCompass')
                        await internal_compass_schema_1.default.create({ ...row });
                })
                    .on('end', async (rowCount) => {
                    resolve();
                }));
            });
        }
        console.log('cards was saved');
    }
    catch (e) {
        throw new Error(e.message);
    }
};
const up = async () => {
    try {
        const fulcrumData = await fulcrum_schema_1.default.count();
        if (!fulcrumData) {
            await saveFiles();
            await saveCardsToDb();
        }
        else {
            console.log('files already exist');
        }
    }
    catch (e) {
        (0, exports.down)(e);
    }
};
exports.up = up;
const down = (e) => {
    throw new Error(e);
};
exports.down = down;
