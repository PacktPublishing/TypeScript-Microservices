
import { Model,model } from "mongoose";
import { MongooseAccess } from "../../../data-layer/adapters/MongoAccess";
import { IProductDocument } from "../../../data-layer/data-abstracts/repositories/IProductDocument";
import { ProductSchema } from "../../../data-layer/data-abstracts/repositories/ProductSchema";

export type ProductMod = Model<IProductDocument>;

export const ProductRepo:ProductMod = MongooseAccess.mongooseConnection.model<IProductDocument>("product", ProductSchema);

