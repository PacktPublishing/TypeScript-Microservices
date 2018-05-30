import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as express from "express";
import * as path from "path";
import { useExpressServer } from "routing-controllers";

export class ExpressConfig {
    public app: express.Express;
  constructor() {
    this.app = express();
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.setUpControllers();
  }

  public setUpControllers() {
    const controllersPath = path.resolve("dist", "controllers");
//useExpressServer has lots of options, can be viewed at node_modules\routing-controllers\RoutingControllersOptions.d.ts
    useExpressServer(this.app, {
        controllers: [controllersPath + "/*.js"],
    });
 }

}
