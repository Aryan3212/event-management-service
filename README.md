# Event Management System

Framework: ExpressJS

Language: TypeScript

## Setup

Install necessary packages

```
npm i 
```

Create a database in MySQL and put your configurations inside `src/app-data-source.ts`

Run seeding script

```
npm run seed
```

You can use Postman by importing the `Insomnia_2022-11-20.json` file.

## Database Design

1. events (id: PrimaryKey(Number), title: String, start_at: Datetime, end_at: Datetime)
2. workshops (id: PrimaryKey(Number), event_id: ForeignKey(event_id), start_at: Datetime, end_at: Datetime, title: String, description: String)
3. reservations (id: PrimaryKey(Number), name: String, email: String, workshop_id: ForeignKey(workshop_id)

## Routes

1. GET /events
   Get all events that are active(not started)

```js
{
    events:[
        {
        id: 1,
        title: "Demo Event",
        start_at: "2022-11-5T06:59:01.107Z",
        end_at: "2022-11-10T06:59:01.107Z",
        }
    ],
    pagination:{
        total: 50,
        per_page: 10,
        total_pages: 5,
        current_page: 1
    }
}
```

2. GET /events/{id}
   Get single event information. e.g. /events/3

```js
{
    id: 3,
    title: "Demo Event",
    start_at: "2022-11-5T06:59:01.107Z",
    end_at: "2022-11-10T06:59:01.107Z",
    total_workshops: 30
}
```

3. GET /events/{eventId}/workshops
   Get all the active workshops of a single event

```js
{
    id: 1,
    title: "Demo Event",
    start_at: "2022-11-5T06:59:01.107Z",
    end_at: "2022-11-10T06:59:01.107Z",
    workshops:[
        {
        id: 1,
        title: "Demo Workshop",
        description: "Demo Workshop description",
        start_at: "2022-11-5T06:59:01.107Z",
        end_at: "2022-11-5T06:59:01.107Z"
        }
    ]
}
```
4. GET /events/{eventId}/workshops/{workshopId}
   Get single workshop information

```js
{
    id: 1,
    title: "Demo Workshop",
    description: "This is demo workshop",
    start_at: "2022-11-5T06:59:01.107Z",
    end_at: "2022-11-5T06:59:01.107Z",
    total_reservations: 100
}
```

5. POST /events/{eventId}/workshops/{workshopId}/reservations 

Request:

```js
{
name: "User Name",
email: "username@gmail.com"
}
```

Response:

```js
{
    reservation: {
        id: 1,
        name: "User Name",
        email: "username@gmail.com"
    },
    event:{
        id: 1,
        title: "Demo Event",
        start_at: "2022-11-5T06:59:01.107Z",
        end_at: "2022-11-10T06:59:01.107Z",
    },
    workshop:{
        id: 1,
        title: "Demo Workshop",
        description: "Demo Workshop description",
        start_at: "2022-11-5T06:59:01.107Z",
        end_at: "2022-11-5T06:59:01.107Z"
    }
}
```
