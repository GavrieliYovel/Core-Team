# Core-Team

Postman Documentation : https://documenter.getpostman.com/view/24149790/2s8YzTTMbc

The user must login before accessing the data
User permission are handled by sessions

## Dependencies
@slack/webhook

cookie-parser

dotenv

express

express-session

json-2-csv

moment

mongoose

ejs

cors

## Route description 
### Server API side
#### GET
/api/boards - Get all boards

/api/boards/:id - Get specific board

/api/boards/csv/:id - Import to csv (downloaded file)

/api/boards/statistics/:id - Get board statistics

#### POST
/api/boards - Create board

/api/boards/tasks - Create task in board

/api/boards/tasks/filter - Filter tasks by paramaters

#### PUT
/api/boards - Update board name

/api/boards/tasks - Update task parameters

#### DELETE
/api/boards - Delete board

/api/boards/tasks - Delete task

### Client Side
/ - Login page

/boards - Showing all boards

/tasks - Showing specific board
