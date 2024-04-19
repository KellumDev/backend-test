# Installation

## Docker

To set up the environment, you will need to first install [Docker](https://docs.docker.com/engine/install/).
This test uses Docker Compose to run everything.

## Backend Server

The backend server uses Node.js, but you don't need to have that installed on your machine. You can install
the dependencies by running:

```bash
docker compose run server npm i
```

## Database

To bring up the database:

```bash
docker compose up -d db
```

Once it's ready to go, you can run the schema migrator to build the schema:

```bash
docker compose run migrate
```

If that fails (because of something like an already existing table), you can always start with a clean slate
by bringing the DB container down:

```bash
docker compose down
```



 
*** Heads Up *** <span style="color:red">I Converted the build-schema file to DOS/Windows-style line endings to ensure the script is executable. May need to reverse later if there are any issues when running initial docker compose up.</span>

## Total Labor Cost API Documentation

This api provides a client with information to use within a graph, providing the total cost of a specific worker across all tasks and locations. Also the total labor cost for a tasks tied to a given location.

## Endpoints

### GET /api/byworkerId

Retrieve the total cost of a worker across all tasks and locations.

### GET /api/bylocationId

Retrieve the total labor cost for tasks tied to a given location.

## Endpoint Descriptions

### Gather Labor Cost By Worker ID

This endpoint retrieves total labor cost of a worker across all tasks and locations. It will return a list of the username, location, wage, total hours worked and total cost. All in which are grouped by location. 

### Request Body Examples

### Request Parameters

- `workerId` (required): The ID of the worker.
- `filterOptions` (required): The filterOptions object is required, however, the properties inside are optional as it provides filtering options.

  ## REQUEST BODY OPTIONS FOR ENDPOINT byworkerId

  Example: Worker across all locations
  {
  "workerId": "1",
  "filterOptions": {

      }

  }

  Example: Worker across a specific locaiton
  {
  "workerId": "1",
  "filterOptions": {
  "locationId": "1"
  }
  }

  Example: A list of workers across a specific location
  {
  "workerId": [1,2],
  "filterOptions": {
  "locationId": "1"
  }
  }

  Example: A list of workers across multiple locations
  {
  "workerId": [1,2],
  "filterOptions": {
  "locationId": [1,3]
  }
  }

### Responses

200 OK: Returns a json with results of the query.

400 Bad Request: If the request body does not meet the validation criteria.

### Sucessful Responses

Example: Retriving records for the total labor costs of a workerId 1. 

{
  "records": {
    "totalCosts": [
      {
        "username": "tcowserf",
        "location": "America",
        "hourly_wage": "35.23",
        "total_hours_work": "68",
        "total_cost": "2397"
      },
      {
        "username": "tcowserf",
        "location": "Egypt",
        "hourly_wage": "35.23",
        "total_hours_work": "53",
        "total_cost": "1853"
      }
    ]
  }
}

### Error Response

400 Bad Request: If the request body does not meet the validation criteria. The response will include details about the validation errors.

Example Error Response (400 Bad Request)
{
  "errors": [
    {
      "msg": "Invalid value",
      "param": "locationId",
      "location": "body"
    },
    {
      "msg": "LocationId must be a number or an array of numbers",
      "param": "locationId",
      "location": "body"
    },
    {
      "msg": "Invalid value",
      "param": "filterOptions",
      "location": "body"
    }
  ]
}
{
  "errors": [
    {
      "msg": "Invalid value",
      "param": "workerId",
      "location": "body"
    },
    {
      "msg": "Invalid value",
      "param": "filterOptions",
      "location": "body"
    },
    {
      "msg": "Invalid value",
      "param": "filterOptions",
      "location": "body"
    }
  ]
}


### Gather Total Costs for Tasks Associated to a Given Location

This endpoint retrieves the total labor cost for tasks associated to a specific location. It will return a list or single record with the location name , task performed, the worker that performed the task, total labor cost and the status of the tasks(complete/incomplete). All in which are grouped by the location.

### Request Parameters

- `locationId` (required): The ID of the location, can be a number or a list.
- `filterOptions` (required): The filterOptions object is required, however, the properties inside are optional as it provides filtering options.

### Request Body Examples

{
  "locationId": 1,
  "filterOptions": {

  }
}

{
  "locationId": 1,
  "filterOptions": {
    "workerId": 1
  }
}

{
  "locationId": [1,2],
  "filterOptions": {
  "workerId": 1
  }
}

{
  "locationId": [1,2],
  "filterOptions": {
    "workerId": [1,3]
  }
}

### Responses

200 OK: Returns a json with results of the query.

400 Bad Request: If the request body does not meet the validation criteria.

### Sucessful Responses

Example: Retriving a record for both workerId's 1 and 3, for the location Egypt(locationId 3).

{
  "records": {
    "totalLaborCosts": [
      {
        "location_name": "Egypt",
        "task_description": "Basic Door and Window Materials and Methods",
        "performed_by": "ewooffj",
        "status": "complete",
        "total_labor_cost": "2486"
      },
      {
        "location_name": "Egypt",
        "task_description": "Wood Fences and Gates",
        "performed_by": "bcrossmang",
        "status": "complete",
        "total_labor_cost": "698"
      }
    ]
  }
}

### Error Response

400 Bad Request: If the request body does not meet the validation criteria. The response will include details about the validation errors.

Example Error Response (400 Bad Request)
{
  "errors": [
    {
      "msg": "Invalid value",
      "param": "locationId",
      "location": "body"
    },
    {
      "msg": "LocationId must be a number or an array of numbers",
      "param": "locationId",
      "location": "body"
    },
    {
      "msg": "Invalid value",
      "param": "filterOptions",
      "location": "body"
    }
  ]
}

## Conclusions

For each endpoint, I opted for a request body paired with a validator. While query parameters could have served the same purpose, employing a request body introduces an extra layer of security, a crucial consideration in any API environment. Additionally, including validation is always essential for clients to effectively manage error handling, particularly during POST requests.

In regards to data querying, I consistently used subquerying to conduct aggregations on intermediate results. This ensures both organization and adaptability for potential future scenarios, such as calculating averages or executing other operations. By executing these calculations in the outer query, updates can be made quickly, and readability is preserved.

Additionally, I employed inner joins to exclusively display matched items, thereby eliminating redundant results for clients. This streamlines data presentation and enhances the overall efficiency of the system.

## Improvments

- Could add custom sanitation to eliminate SQL injections.
- Could add dto to parse and handle request bodies from the client.
- Could add indexing to improve performance.
- Implementation of CORS to allow the connection of a client.

