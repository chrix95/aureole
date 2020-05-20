# iRecharge Web

## Project setup
1. Install node on your computer <a href="https://nodejs.org/en/download/">node</a>
2. Clone the project into your local directory
3. Change into the directory using your cli
4. Install the required node module and dependencies for the project using the code below
```
npm install
```
5. Use the code snippet below to install nodemon globally to keep the project server alive
```
npm install -g nodemon
```
6. To test the production you need to duplicate the `.env.sample` file and rename to `.env` and set your configurations
If no .env configuration is set, the default configuration used is:<br>
PORT=3001 <br>
DB_NAME=aureole
DB_USER=root
DB_PASSWORD=
DIALECT=mysql
HOST=127.0.0.1

### Compiles and starts server for development
```
npm start or npm run start
```

### Available endpoints and payload
- Returns an array of books from IceAndFire API and returns an empty array of no result found
``` 
GET http://localhost:3001/api/external-books?name=:nameOfABook 
```
sample response
```
{
    "status_code": 200,
    "status": "success",
    "data": [
        {
            "name": "The Hedge Knight",
            "isbn": "978-0976401100",
            "authors": [
                "George R. R. Martin"
            ],
            "number_of_pages": 164,
            "publisher": "Dabel Brothers Publishing",
            "country": "United States",
            "release_date": "2005-03-09"
        },
        {
            "name": "A Storm of Swords",
            "isbn": "978-0553106633",
            "authors": [
                "George R. R. Martin"
            ],
            "number_of_pages": 992,
            "publisher": "Bantam Books",
            "country": "United States",
            "release_date": "2000-10-31"
        }
    ]
}
```

- Create a book on the local machine
``` POST http://localhost:3001/api/v1/books ```
sample payload
```
{
	"name": "Drifted Apart 23",
	"isbn": "098-012345678",
	"country": "Nigeria",
	"authors": ["Eddy R. Charles", "Sylvester G. O."],
	"number_of_pages": 234,
	"publisher": "Simi Enisu",
	"release_date": "2020-04-23"
}
```
sample response
```
{
    "status_code": 201,
    "status": "success",
    "data": {
        "book": {
            "name": "Drifted Apart 23",
            "isbn": "098-012345678",
            "country": "Nigeria",
            "authors": [
                "Eddy R. Charles",
                "Sylvester G. O."
            ],
            "number_of_pages": 234,
            "publisher": "Simi Enisu",
            "release_date": "2020-04-23"
        }
    }
}
```

- Read all books on the local machine
``` GET http://localhost:3001/api/v1/books ```
sample response
```
{
    "status_code": 200,
    "status": "success",
    "data": [
        {
            "id": 27,
            "name": "Drifted Apart 23",
            "isbn": "098-012345678",
            "authors": [
                "Eddy R. Charles",
                "Sylvester G. O."
            ],
            "number_of_pages": 987,
            "publisher": "Simi Enisu",
            "country": "Canada",
            "release_date": "2020-04-23"
        },
        {
            "id": 28,
            "name": "Drifted Apart 23",
            "isbn": "098-012345678",
            "authors": [
                "Eddy R. Charles",
                "Sylvester G. O."
            ],
            "number_of_pages": 234,
            "publisher": "Simi Enisu",
            "country": "Nigeria",
            "release_date": "1990-07-01"
        }
    ]
}
```

- The Read API can be searchable by name (stirng), country(string), publisher(string) and realease date(year, integer). Note: The search query parameter are optional
``` GET http://localhost:3001/api/v1/books?name=Drifted Apart 23&country=Nigeria&release_date=1990 ```
sample response
```
{
    "status_code": 200,
    "status": "success",
    "data": [
        {
            "id": 28,
            "name": "Drifted Apart 23",
            "isbn": "098-012345678",
            "authors": [
                "Eddy R. Charles",
                "Sylvester G. O."
            ],
            "number_of_pages": 234,
            "publisher": "Simi Enisu",
            "country": "Nigeria",
            "release_date": "1990-07-01"
        }
    ]
}
```

- Update a book on the local machine. Note: The payload requires you send parameter that are meant to be changed as it ONLY updates the parameter sent in the payload
``` PATCH http://localhost:3001/api/v1/books/28 ```
sample payload
```
{
	"name": "Fast & Furious 7",
	"isbn": "098-10982929",
	"country": "Nigeria",
	"authors": ["Eddy R. Charles", "Sylvester G. O."]
}
```
sample response
```
{
    "status_code": 200,
    "status": "success",
    "message": "The book Drifted Apart 23 was updated successfully",
    "data": {
        "id": 28,
        "name": "Fast & Furious 7",
        "isbn": "098-10982929",
        "authors": [
            "Eddy R. Charles", 
            "Sylvester G. O."
        ],
        "number_of_pages": "3293",
        "publisher": "Simi Enisu",
        "country": "Nigeria",
        "release_date": "2020-08-01"
    }
}
```

- Delete a book on the local machine.
``` DELETE http://localhost:3001/api/v1/books/28 ```
sample response
```
{
    "status_code": 204,
    "status": "success",
    "message": "The book Fast & Furious 7 was deleted successfully",
    "data": []
}
```

- Show a book on the local machine.
``` GET http://localhost:3001/api/v1/books/28 ```
sample response
```
{
    "status_code": 200,
    "status": "success",
    "data": {
        "id": 28,
        "name": "Fast & Furious 7",
        "isbn": "098-10982929",
        "authors": [
            "Eddy R. Charles", 
            "Sylvester G. O."
        ],
        "number_of_pages": 3293,
        "publisher": "Simi Enisu",
        "country": "Nigeria",
        "release_date": "2020-08-01"
    }
}
```


### Available endpoints and payload
You can import the postman collection for the project using the <a href="https://www.getpostman.com/collections/0fe3f6b4bb373e683ee2">URL</a>


### Run your tests
```
npm run test
```

## Support
For support towards this project, reach me on <a href="tel:08183780409">phone</a> or <a href="mailto:engchris95@gmail.com">email</a>.
