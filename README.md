# photogram-api

This is a basic API used with the ionic photogram application (Work in progress) published in my github profile.

## Requirements

 - node v 16.x
 - A mongoDB instance running either in localhost nor cloud. Personally I recommend using MongoDB Atlas.

## Steps needed to run

### Configure environment file
You can find an example environment file in the root of this project. Just have to rename it to `.env` and configure the two variables:

 1. `MONGO_DB_CONNECTION_STRING` is the connection string to your mongoDB instance. User and password may be written here. Example: `mongodb+srv://<user>:<password>@<url>/<database_name>?retryWrites=true&w=majority`
 2. `JWT_SEED` this may be a random string that is used to make the JWT tokens.
 
 ### Just run the project
 
 Run using your favourite terminal, and from the root of the project `npm run serve`.
