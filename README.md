# Stolen Bike Cases - viAct - Backend (NestJS)
## Context
Stolen bikes are a typical problem in Berlin. The Police want to be more efficient in resolving stolen bike cases. They decided to build software that can automate their processes — the software that you're going to develop.
## Product Requirements
* Bike owners can report a stolen bike.
* New stolen bike cases should be automatically assigned to any free police officer. 
* A police officer can only handle one stolen bike case at a time.
* When the Police find a bike, the case is marked as resolved and the responsible police officer becomes available to take a new stolen bike case.
* The system should be able to assign unassigned stolen bike cases automatically when a police officer becomes available.
## Your Mission
Your task is to provide APIs for a frontend application that satisfies all requirements above.


---


## Installation

Clone the repository using `$git clone git@github.com:Noanan/StolenBikesBerlin.git`, then nagivate to it and use `npm install` to install the modules and dependencies

## Running
This API uses Docker to create a MySql2 database 

### Docker

There is a `docker-compose.yml` file for starting Docker.

`docker-compose up`

After running the sample, you can stop the Docker container with

`docker-compose down`

### Run the sample

Then, run Nest as usual:

`npm run start`

## Documentation

The supporting documentation can be found at: https://app.swaggerhub.com/apis-docs/no45/StolenBikesBerlin/1.0.0

## Testing

The e2e test suite can be run using `npm run test`. Lastest benchmark of major requirements: https://prnt.sc/s0mqpc

A batch script found in `StolenBikesBerlin\src\test\e2e` can be use to populate the server with example bikes and officers to test simulation with the API

