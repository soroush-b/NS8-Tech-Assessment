# NS8 Tech Assessment Submission

- Ivan Minier

## Technologies Used

- Nodejs
- Express
- Typescript
	- TSLint

## Deployment
- Install dependencies

	`$ npm install`

- Run API

	`$ npm run start`


### Endpoints
- /users
	- Will return a list of users.

- /events
	- Will return all events for all users.

- /events/user?id=user@domain.com
	- Will return all events for user email address provided.

- /events/last24h
	- Will return all events in the last 24 hours

## Assumptions / Notes

### Security
Assumed this would be added to an existing project where endpoints were already secured.

### Data
Assumed data would already be available to the api thus there was no need to create end points to create and remove accounts. Used mock data and hard coded the time used to determine if a user logged in, in the last 24 hours, but would normally use system time and data from a database.

### Note 1
Assumed api users would require a way to see available users on the system before submitting a request for a user. Therefore I created the /users endpoint.

### Note 2
Given more time I would think of and cover some edge cases I might not have thought of. I would write tests and create more robust api docs.
