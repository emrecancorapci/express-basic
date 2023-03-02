# Express Start Template
An express start template for projects. It includes:
- eslint and prettier configurations.
- login and register route.
- JWT for authentication.
- MongoDB for database.
- bcrypt for hashing passwords.
- dotenv for environment variables.

## How to Run
- Clone the project
- Create `.env` file to project directory. Add `PORT`, `MONGO_URI`, `JWT_SECRET` and `JWT_LIFETIME` variables.
- Install dependencies with `npm install`
- Start development server with `npm start`

## How to Use
- `/` is the home route. It returns a HTML page.
- `/api/v1/` is the base url for the api
- `/api/v1/Login` is the login route. It returns a token. Body should be like this:
```json
{
    "email": "email",
    "password": "password"
}
```
- `/api/v1/Register` is the register route. It returns a token. Body should be like this:
```json
{
    "name": "name",
    "email": "email",
    "password": "password"
}
```

## Other
- You can format the code with `npm run format`
- You can check problems with `npm run lint`
- You can fix problems with `npm run lint:fix`