import { Schema } from "mongoose";
interface Options {
    throwOnError: boolean;
}
declare function trashcan(schema: Schema, options: Options): void;
export { trashcan };
