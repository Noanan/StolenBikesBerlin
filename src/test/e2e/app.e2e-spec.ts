import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../app.module';


var bikeIndexID = 0;
var officerIndexID = 0;

describe('AppController (e2e)', () => {
  let app: INestApplication;
 


  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
     
    .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    //inital POST request for the tests
    await request(app.getHttpServer())
    .post('/bikes')
    .send({
      bikeID:"9D2KnXhBBY",
      ownerFirstName:"Jacob",
      ownerLastName:"Barnett"   
   })
   await request(app.getHttpServer())
    .post('/officers')
    .send({
      FirstName:"Mellow",
      LastName:"Cat"   
   })

   var id1 = await request(app.getHttpServer())
   .get('/bikes/FirstNoOfficer')
   var id2 = await request(app.getHttpServer())
   .get('/officers/FirstisFree')


  // index allows tests to be done even if database is populated
  bikeIndexID = id1["body"]["id"];
  officerIndexID = id2["body"]["id"];
 
  });
// ---------------  Bike tests    -----------------------
  it(`/GET bikes`, () => {
    return request(app.getHttpServer())
      .get('/bikes')
      .expect(200)
      .expect('Content-Type', /json/)
  });
  it(`/GET one bikes`, () => {
    return request(app.getHttpServer())
      .get('/bikes/'+bikeIndexID)
      .expect(200)
      .expect('Content-Type', /json/)
       //expected only 1 bike object
      .expect(function(res) {
        res.body.bikeID = '9D2KnXhBBY';
        res.body.ownerFirstName = "Jacob";
        res.body.ownerLastName = "Barnett";

      })
      
  });
   it(`/DELETE bikes`, () => {
    return request(app.getHttpServer())
      .delete('/bikes/'+bikeIndexID)
      .expect(200)
      
  });

  it(`/POST bikes`, () => {
    return request(app.getHttpServer())
    .post('/bikes')
    .send({
      bikeID:"123456789",
      ownerFirstName:"John",
      ownerLastName:"Bob"   
   })
      .expect(201)
      
  });

  
// ---------------  Bike tests    -----------------------
it(`/GET officers`, () => {
  return request(app.getHttpServer())
    .get('/bikes')
    .expect(200)
    .expect('Content-Type', /json/)
});
it(`/GET one officers`, () => {
  return request(app.getHttpServer())
    .get('/officers/'+officerIndexID)
    .expect(200)
    .expect('Content-Type', /json/)
     //expected only 1 bike object
    .expect(function(res) {
      res.body.FirstName = "Mellow";
      res.body.LastName = "Cat";

    })
    
});
 it(`/DELETE bikes`, () => {
  return request(app.getHttpServer())
    .delete('/officers/'+officerIndexID)
    .expect(200)
    
});


it(`/POST officer`, () => {
  return request(app.getHttpServer())
  .post('/officers')
  .send({
    FirstName:"Jimmy",
    LastName:"Jam"   
 })
    .expect(201)
    
});

// ---------------  Main tests    -----------------------

it(`/assign`, () => {
  request(app.getHttpServer())
    .get('/assign')
    .expect(200)
  
  request(app.getHttpServer())
  .get('/bikes/'+bikeIndexID)
  .expect(200)
  .expect('Content-Type', /json/)
  //assining makes bike "hasOfficer"
  .expect(function(res) {
    res.body.hasOfficer = 'true';
 

  })
  return request(app.getHttpServer())
  .get('/officers/'+officerIndexID)
  .expect(200)
  .expect('Content-Type', /json/)
  .expect(function(res) {
    res.body.available = "false";
    res.body.caseID = "9D2KnXhBBY"
    })

});

it(`/:caseID/found`, () => {
  request(app.getHttpServer())
    .get('/9D2KnXhBBY/found')
    .expect(200)
  
  request(app.getHttpServer())
  .get('/bikes/'+bikeIndexID)
  .expect(200)
  .expect('Content-Type', /json/)
  //assining makes bike "hasOfficer"
  .expect(function(res) {
    res.body.hasOfficer = 'false';
    res.body.resolved = 'true';
 

  })
  return request(app.getHttpServer())
  .get('/officers/'+officerIndexID)
  .expect(200)
  .expect('Content-Type', /json/)
  .expect(function(res) {
    res.body.available = "true";
    })

});
 
  

  
afterAll(async () => {
  await app.close();
});



});
