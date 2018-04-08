"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const riotApi = __importStar(require("./riotAPI"));
const express = require('express');
const app = express();
app.get('/:summonerName', riotApi.getRankedGamesForSummonerName);
app.listen(3000, () => console.log('express listening on port 3000'));
//# sourceMappingURL=exApp.js.map