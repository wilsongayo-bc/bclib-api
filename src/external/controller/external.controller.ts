import { Controller, Get } from "@nestjs/common";
import { ExternalService } from "../services/external.service";


@Controller("external")
//@UseGuards(JwtAuthGuard)
export class ExternalController {
  constructor(
    private readonly externalService: ExternalService,
  ) {}


  /**
   * GET datas from test Endpoint
   * @returns datas
   */
@Get("datas")
async getDatas() {
  const newDatas = [];

  const testData = await this.externalService.getDatas();
  console.log("getDatas...",testData);
//   for (let index = 0; index < testData.data.employeeList.length; index++) {
//     const element = testData.data.employeeList[index];
    
//     newDatas.push(element);
//   }
  return newDatas;
}

}

