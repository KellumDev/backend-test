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

### Edits 

Converted the build-schema file to DOS/Windows-style line endings to ensure the script is executable. May need to reverse later. 

# Total Labor Cost API
This api allows the user to render total labor 
cost of that worker across all tasks and locations by a provided worker id. You can also get the total labor cost for tasks tied to a given location by providing a location id. 


### Endpoints
GET /api/byworkerId -  c
GET /api/bylocationId - the total labor cost for tasks tied to a given location


### Gather Labor Cost By Worker ID 
This endpoint retrieves This endpoint retrieves workers based on the provided user ID (userid). The userid property is required, while the properties inside filterOptions are optional. If filterOptions are provided, they can be used to filter workers based on status and/or location ID.

### Request Body 

byworkerId
{
  "userid": "someUserId",
  "filterOptions": {
    "status": "complete",
    "locationId": "1"
  }
}

## Responses
200 OK: Returns an array of the given worker with the associated total labor costs, hours worked, tasks status acrossed all locations.  

400 Bad Request: If the request body does not meet the validation criteria. 

### Sucessful Responses
Example: filtering with the workerId and locationId, will provide results for the specific location worked. 

{
    "location": "Argentina",
    "task_performed": "Plumbing & Medical Gas",
    "tasks_status": "complete",
    "total_hours_work": "53",
    "total_cost": "1896"
  }


### Error Response 
400 Bad Request: If the request body does not meet the validation criteria. The response will include details about the validation errors. 

Example Error Response (400 Bad Request)
{
  "errors": [
    {
      "value": "",
      "msg": "Invalid value",
      "param": "workerId",
      "location": "body"
    }
  ]
}

## Conclusions 
I used a left join to display all data even for unmatched items so in the future when aggregating the average cost or other things these rows can be included to help with averaging as much as possible. 


## Improvments 
- could add dto to handle client data
- could add custom sanitation for validating request bodies 
- could provide a 
- I would have liked to add a frontend gui just for fun and demostration purposes but I ran out of time. 