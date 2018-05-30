import { JsonController, Req, Res, Get } from "routing-controllers";
import { SwaggerSpec } from "../../middleware/config/Express";



@JsonController('/swagger')
export class SwaggerController {
    constructor(){}

    @Get('/swagger.json')
    async swaggerDoc(@Req() req, @Res() res){
        return SwaggerSpec.getSwaggerJSON();
    }
}