import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

const http = require('http');
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('assign')
  async Execute(): Promise<void> {

    this.loop();

    return

  }

  //main method for finding bikes, marks case as "resolved" and make responsible police officer available
  @Get(':caseID/found')
  async lostBike(@Param('caseID') caseID: string): Promise<void> {
    try {
      var officer = await this.getRequest("http://localhost:3000/officers/case/" + caseID);
      var bike = await this.getRequest("http://localhost:3000/bikes/case/" + caseID);
    }
    catch{
      throw new Error('Error: no officer matching this case ID');
    }
    var officerID = officer["id"];
    var bikeID = bike["id"];
    console.log("executing on officerID:" + officerID);
    console.log("executing on bikeID:" + bikeID);
    try{    
    //removes officer from bike case  
    this.RequestOnly("http://localhost:3000/bikes/" + bikeID + "/hasNoOfficer");
    //marks case as "resolved"    
    this.RequestOnly("http://localhost:3000/bikes/" + bikeID + "/Found");
    //set police officer to free 
    this.RequestOnly("http://localhost:3000/officers/" + officerID + "/isFree");
    //set police offcier caseID to null
    this.RequestOnly("http://localhost:3000/officers/" + officerID + "/setOfficerCaseId/null");

     }
     catch{
       throw new Error('Error resolving cases');}
      //automtically check if any new cases are available to be assigned after finding a bike. 
      this.loop();

    return
  
}




  //loop for each unassigned bike - makes sure that no cases are left unassigned
  async loop() {
    let loopCount: any;
    try {
      loopCount = await this.getRequest("http://localhost:3000/bikes/countAllNoOfficer");
    } catch{ throw new Error('Error counting unassigned bikes'); }
    
    console.log("Looping this many times:" + loopCount)
    for (let i = 0; i < loopCount; i++) {
      console.log("Loop iteration number:" + i);

      await this.AssignBike();
    }
  }





  async AssignBike() {
    return new Promise(async (resolve, reject) => {
      try {
        var officer = await this.getRequest("http://localhost:3000/officers/FirstisFree");
        var bike = await this.getRequest("http://localhost:3000/bikes/FirstNoOfficer");
      }
      catch{
        throw new Error('No more bikes unassigned or officers free');
      }
      if (typeof officer != undefined && typeof bike != undefined) {

        var officerID = officer["id"];
        var bikeIdentifcation = bike["bikeID"];
        var bikeID = bike["id"];
        console.log("executing on officerID:" + officerID);
        console.log("executing on bikeID:" + bikeID);
        try {
          //set officer to "not available"
          await this.RequestOnly("http://localhost:3000/officers/" + officerID + "/isBusy");
          //set officer caseID to stolen bike caseID
          await this.RequestOnly("http://localhost:3000/officers/" + officerID + "/setOfficerCaseId/" + bikeIdentifcation);
          //set bike to "hasOfficer"
          await this.RequestOnly("http://localhost:3000/bikes/" + bikeID + "/hasOfficer");
        }
        catch{
          throw new Error('Error assigning bikes');

        }


      }

      resolve();
    });
  }



  getRequest(url) {

    return new Promise((resolve, reject) => {
      http.get(url, (resp) => {
        let data = '';

        //atomic node method, only receives data in chunks
        resp.on('data', (chunk) => {
          data += chunk;
        });


        resp.on('end', () => {
          resolve(JSON.parse(data));
        });

      })

        .on("error", (err) => {
          console.log("Error: " + err.message);
        });


    });
  }

  RequestOnly(url) {
    return new Promise((resolve, reject) => {
      http.get(url, (resp) => {
        let data = '';

        //atomic node method, only receives data in chunks
        resp.on('data', (chunk) => {
          data += chunk;
        });


        resp.on('end', () => {
          resolve();
        });

      })

        .on("error", (err) => {
          console.log("Error: " + err.message);
        });
    });
  }

}