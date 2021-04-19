# :chart_with_upwards_trend: TODO-WEB-CLIENT

TODO-WEB-CLIENT project is written in React. This project has the main objective is to manage to-do lists.

## :desktop_computer: Running the application locally

In the project directory, you can run:

### :rocket: `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000/login](http://localhost:3000/login) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### :vertical_traffic_light: Running code analyzer (linter)

- Simply run `yarn lint` command and it will point any code changes that need to
be made.

## :whale: If you want is possible to run this project with Docker

### :desktop_computer: Running the application locally with Docker

- Start the container on sleep mode: `docker-compose up -d`
- Enter the container: `docker exec -it todo-client sh`
- Run the application: `yarn start`
- Access the application on `localhost:3000` or `localhost:3001`
