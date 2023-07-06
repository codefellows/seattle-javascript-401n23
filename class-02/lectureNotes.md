## Lecture Notes

- Day one of a new lab module where we
  - Build a scalable, tested API Server
  - Perform all database operations (CRUD) on any database table
  - We will be using this server in future modules
  - At the backbone of the WRRC is a server that handles the interactions between databases and the UI
  - Do a demo of the solution code for this module
  - No, it's not terribly exciting to simply send/receive JSON (...or is it??)
  - We can add, delete, update database records
  - We can store them forever
  - Clients can reliably get and use this tool to make great applications!

### Express

- an unopinionated framework: loosey goosey

  - allows you to 'make it work'
  - less rigid
  - allows plug and play of 3rd party libs

- middleware
  - The only difference between a middleware function and a route handler callback is that middleware functions have a third argument next
  - add a middleware function to the processing chain for all responses with app.use(mwFunction) before route definitions
