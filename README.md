# How to Run
- Clone the project
- Create `.env` file to project directory. Add `PORT`, `MONGO_URI`, `JWT_SECRET` and `JWT_LIFETIME` variables.
- Install dependencies with `npm install`
- Start development server with `npm start`

# How to Use
- `/` is the home route. It returns a HTML page.
## Auth
- Login             - `/api/v1/auth/Login`
```json
{
    "email": "email",
    "password": "password"
}
```
- Register          - `/api/v1/auth/Register`
```json
{
    "name": "name",
    "email": "email",
    "password": "password"
}
```
## User
- Get All Users     - `/api/v1/users/`
- Get User          - `/api/v1/users/:id`
- Delete User       - `/api/v1/users/:id`

# Other
- You can format the code with `npm run format`
- You can check problems with `npm run lint`
- You can fix problems with `npm run lint:fix`