"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var model_1 = require("./model");
function trashcan(schema, options) {
    schema.pre(anyDeleteOrRemove, { query: true, document: true }, function (next) {
        return __awaiter(this, void 0, void 0, function () {
            var self, originCollection, docs, filter, _i, docs_1, doc, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 9, , 10]);
                        originCollection = void 0;
                        docs = [];
                        if (!isMongooseQuery(self)) return [3, 3];
                        filter = self.getFilter();
                        originCollection = self.mongooseCollection.name;
                        return [4, self.model.find(filter)];
                    case 2:
                        docs = _a.sent();
                        return [3, 4];
                    case 3:
                        docs[0] = self;
                        originCollection = self.constructor.collection.name;
                        _a.label = 4;
                    case 4:
                        next();
                        if (!(docs.length > 0)) return [3, 8];
                        _i = 0, docs_1 = docs;
                        _a.label = 5;
                    case 5:
                        if (!(_i < docs_1.length)) return [3, 8];
                        doc = docs_1[_i];
                        return [4, model_1.ArchivedItem.create({
                                originCollection: originCollection,
                                doc: doc
                            })];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7:
                        _i++;
                        return [3, 5];
                    case 8: return [3, 10];
                    case 9:
                        error_1 = _a.sent();
                        if (options && options.throwOnError) {
                            throw error_1;
                        }
                        else {
                            console.warn("Failed to archive document", error_1);
                        }
                        return [3, 10];
                    case 10: return [2];
                }
            });
        });
    });
}
exports.trashcan = trashcan;
var isMongooseQuery = function (obj) {
    if (obj.hasOwnProperty("mongooseCollection") &&
        obj.hasOwnProperty("schema") &&
        obj.hasOwnProperty("op") &&
        obj.hasOwnProperty("model")) {
        return true;
    }
    return false;
};
var anyDeleteOrRemove = /remove|deleteOne|deleteMany|findOneAndRemove|findOneAndDelete|findByIdAndRemove/;
//# sourceMappingURL=plugin.js.map