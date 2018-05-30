import { IsEmail, Length ,IsAlphanumeric, IsAlpha, MinLength, MaxLength, IsNotEmpty, ValidateNested} from "class-validator";


export class ProductValidationSchema  {
//we can similarly add lots of other validations
     @Length(5, 50)
     name: string;

     @MinLength(2,{message:"Title is too Short"})
     @MaxLength(500,{message:"Title is too long"})
     description: string;

     @Length(2, 15)
     category: string;
    
     @IsEmail()
     feedbackEmail: string;     

     @MinLength(2,{message:"Not Valid Owner Id"})
     @MaxLength(10,{message:"Not Valid Owner Id"})
     ownerId:string;

     createdAt:Date;
     modifiedAt:Date

     @ValidateNested()
     desc:Description[]
     brand:Brand;
     shipping:Shipping;
     attrs:Attrs[];
     
    constructor(productInfo:any){
       this.name = productInfo.name;
       this.description = productInfo.description;
       this.category = productInfo.category;
       this.feedbackEmail=productInfo.feedbackEmail;
       this.ownerId=productInfo.ownerId;
       this.desc=productInfo.desc;
       this.brand=productInfo.brand;
       this.shipping=productInfo.shipping;
       this.attrs=productInfo.attrs;
    }
}

export class Description{
    
    @IsNotEmpty()
    @Length(2, 15)
    lang:string;

    @MinLength(2,{message:"value is too Short"})
    @MaxLength(500,{message:"Value is too long"})
    val: string;

}

export class Brand{
    id:number;
    name:string;
}

export class Shipping{
    dimensions:{
        height:number,
        length:number,
        width:number
    };
    weight:number
}

export class Attrs{
    name:string;
    value:string
}