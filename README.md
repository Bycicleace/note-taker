# Note Taker

Note Taker is a web application that allows the user to Create, Read, and Delete notes in a friendly, minimal way.
This project is part of a Full Stack Web Development bootcamp, and was primarily developed to showcase knowledge using Express.js

## Usage Instructions
Go to the site below, then click the "Get Started" button.
- To add a note, click the + button in the upper right, then fill out a Note title, and the Note contents. Finally, click the Save icon to store.
- To view a note, click on the note in the left column. Its contents will show on the right.
- To delete a note, click the trash icon next to the note you wish to delete.

## API endpoints:
- `/api/notes`
    - `GET` will give you an array of JSON objects of all the notes in the system
    - `POST` will add the note in JSON format to the array of notes
- `/api/notes/id`
    - `GET` will give you a JSON object of the note with the corresponding ID.
    - `DELETE` will remove the note with the corresponding ID from the array.

## Author
Elliott Kvamme, 2021

## Site Link
[Note Taker](https://cbc-note-taker.herokuapp.com/)