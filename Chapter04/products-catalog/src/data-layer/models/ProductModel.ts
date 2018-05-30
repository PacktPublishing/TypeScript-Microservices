import { IProductDocument } from "data-layer/data-abstracts/repositories/IProductDocument";

//here we will have getters and setters of productModel

export class ProductModel{
    private _useModel:IProductDocument;

    constructor(iProductDocument:IProductDocument){
        this._useModel=iProductDocument;
    }

    get id(): string{
        return (this._useModel.id).toString();
    }

    get shipping():string{
        return JSON.stringify(this._useModel.shipping);
    }

    get desc():any{
        return this._useModel.desc;
    }
    
    get name():string{
        return this._useModel.name.toString();
    }

    get category():string{
        return this._useModel.category.toString();
    }

    get attrs():any{
        return this._useModel.attrs;
    }

    get feedbackEmail():string{
        return this._useModel.feedbackEmail.toString();
    }

    get description():string{
        return this._useModel.description.toString();
    }

    get addedAt():Date{
        return new Date(this._useModel.createdAt);
    }

    get ownerId():string{
        return this._useModel.ownerId.toString();
    }
    
    getClientProductModel(){
        return Object.seal({
            id:(this._useModel.id).toString(),
            shipping:this._useModel.shipping,
            desc:this._useModel.desc,
            name:this._useModel.name.toString(),
            category:this._useModel.category.toString(),
           // attrs:this._useModel.attrs,
            feedbackEmail:this._useModel.feedbackEmail.toString()
        })
    }
}