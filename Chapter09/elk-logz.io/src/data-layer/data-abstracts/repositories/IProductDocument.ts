import mongoose=require('mongoose');

export interface IProductDocument extends mongoose.Document{
    id:string,
    ownerId:String,
    brand:{
        id:number,
        name:string
    },
    lastUpdated:Date,
    createdAt:Date,
    name:string,
    feedbackEmail:string,
    description:string,
    category:string,
    desc:[{
            lang:string,
            val:string
        }],
    shipping:{
        dimensions:{
            height:number,
            width:number,
            length:number
        },
        weight:number
    },
    attrs:[{
        name:string,
        value:string
    }]

}