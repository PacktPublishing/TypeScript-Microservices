import { Controller, Get, JsonController, Post, Put, Param, Delete, Body, OnUndefined, UseBefore, Req, Res } from 'routing-controllers';
import { validateProductRequest } from '../../business-layer/validator/ProductValidationProcessor';
import { IProductCreateRequest } from 'service-layer/request/IProductRequest';
import { logger } from '../../middleware/common/Logging';
import { ProductDataAgent } from '../../data-layer/data-agents/ProductDataAgent';
import { IProductResponse } from '../../service-layer/responses/IProductResponse';
import { ProductModel } from '../../data-layer/models/ProductModel';
import { MyMiddleware } from '../../middleware/custom-middleware/MyMiddleWare';
import { Request } from 'express-serve-static-core';

@JsonController('/products')
@UseBefore(MyMiddleware)
export class ProductsController {

    private productDataAgent:ProductDataAgent;
    constructor(){
        this.productDataAgent=new ProductDataAgent();
    }
  /*
   API 1: get all listing
  */
    @Get('/products-listing')
    async getProductsList(): Promise<any> {
        return {"msg":"This is first Typescript Microservice"};
    }
    
   /*
   API 2: Get product by productId
   */ 
    @Get('/product-by-id/:productId')
    @OnUndefined(404)
    async getProductById(@Param("productId") productId: number): Promise<any> {
        return {"msg":"This is first Typescript Microservice"};
    }

    /*
    API 3: Add update product.
    */
    @Put('/add-update-product')
    async addUpdateProduct(@Body() request:IProductCreateRequest,@Req() req:any,@Res() res:any):Promise<any>{
       let validationErrors:any[]=await validateProductRequest(request);
       logger.info("total Validation Errors for product:-",validationErrors.length);
       if(validationErrors.length>0){
           throw{
               thrown:true,
               status:401,
               message:'Incorrect Input',
               data:validationErrors
           }
       }
       let result=await this.productDataAgent.createNewProduct(request);
       if(result.id){
           let newProduct=new ProductModel(result);
           let newProductResult=Object.assign({product:newProduct.getClientProductModel()});
           return res.json(<IProductResponse>(newProductResult));
       }else{
           throw result;
       }
    }
   
   /*
   API 4: find product by product type.
   */
    @Get('/product-by-type/:productType')
    async getProductByType(@Param("productType") productType: string): Promise<any> {
        return {"msg":"This is first Typescript Microservice"};
    }

    /*
    API 5: Delete product by productId
    */
    @Delete('/product/:productId')
    @OnUndefined(404)
    async deleteProduct(@Param("productId") productId: number):Promise<any>{
        console.log(productId);
        return {"msg":"This is first Typescript Microservice"};
    }
}

