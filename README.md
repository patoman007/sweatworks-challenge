# Sweatworks - Challenge

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.0.

## Local - (Static responses)

Run `ng serve` for a dev server.
Navigate to `http://localhost:4200/`. 
The app will automatically reload if you change any of the source files.

## Dev - (LocalDynamoDB)

Run `java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb` 
to start DynamoDB locally, 
After DynamoDB has been initialized, run `ng serve --configuration=dev` and it will automatically load the 'Development' environment.

Run `ng serve` for a dev server.
Navigate to `http://localhost:4200/`. 
The app will automatically reload if you change any of the source files.

## Production server

For a production version run `ng build --prod --configuration=production`

# Demo
I've configured an Nginx server to serve a production version of the app. It can be find at [[Sweatworks challenge](http://ec2-3-83-122-66.compute-1.amazonaws.com/)]
