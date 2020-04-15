import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
const request = require('request');
const http = require('http');
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
 async Execute(){
this.AssignBike();
  
 }

//loop for each unassigned bike
async loop(){
  var loopCount = await this.getRequest("http://localhost:3000/bikes/countAllNoOfficer");
  
}


 async AssignBike(){ 
try{
  var officer = await this.getRequest("http://localhost:3000/officers/FirstisFree");  
  var bike = await this.getRequest("http://localhost:3000/bikes/FirstNoOfficer");
}
catch{
  throw new Error('No more bikes unassigned or officers free');
}
  if(typeof officer != undefined && typeof bike != undefined){

var officerID = officer["id"];
  var bikeIdentifcation = bike["bikeID"];
  var bikeID = bike["id"];
  console.log(officerID); 
  console.log(bikeIdentifcation);
  console.log(bikeID);
  //set officer caseID to stolen bike caseID
   this.RequestOnly("http://localhost:3000/officers/"+officerID+"/setOfficerCaseId/"+bikeIdentifcation);
  //set officer to "not available"
   this.RequestOnly("http://localhost:3000/officers/"+officerID+"/isBusy");
  //set bike to "hasOfficer"
   this.RequestOnly("http://localhost:3000/bikes/"+bikeID+"/hasOfficer");
  ///set bike to 



}

}
  
  
 
getRequest(url){
  
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

RequestOnly(url){  
  return new Promise((resolve, reject) => {
     http.get(url, (resp) => {  
})
.on("error", (err) => {
  console.log("Error: " + err.message);
});
  });
}

}