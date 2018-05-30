import { Controller, Get, Req, Res } from "routing-controllers";
import { Register } from "../config/metrics-modules/MetricModule";

@Controller('/metrics')
export class MetricsRoute{

    @Get('/')
    async getMetrics(@Req() req:any,@Res() res:any):Promise<any> {
        res.set('Content-Type', Register.contentType); 
        res.end(Register.metrics()); 
    };
    

}