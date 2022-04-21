# Welcome to NoteMaker!

This application uses React, C# WebAPI, and LiteDB to create a application where you can create, edit, and delete notes.

# C# Web Api
The API is using .net 5.0. It includes Models, Controllers, and Repository pattern for clean code separation.
To start open the notes_service folder and run in your code editor. Feel free to run without debugging to play around with or if you want to walk through the code run while debugging.

##  Endpoints
Feel free to go to https:localhost:5001/swagger to view the endpoints available to you.

# React
To start the React App navigate to the notes_ui folder and run npm start. This should start your browser up on the home page.
## UI 
The UI should be easy to follow. There is a Create button on the header and each note has an edit and delete button on them. Using these buttons will pop up a modal for easy creating, deleting, and editing. You can also click on the Body of the note to give take you to a single note page.

# LiteDb
Don't worry about LiteDb it will start with the C# app and there should already be some data to play with there.