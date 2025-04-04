# ** REST API**

Create a REST API for working with a collection of contacts. Use [Postman] to work with the REST API.

## **Step 1**

Create a repository named `goit-node-rest-api` and place the files from the `src` folder on the main branch. Note: there should be no `src` folder in the repository, you're only interested in its contents.
Create a `hw02-express` branch from the main branch.
Install modules with the command:

```bash
npm i
```

## **Step 2**

Copy the functions from the `contacts.js` file from module 1's homework assignment into the `contactsServices.js` file (located in the services folder).

## **Step 3**

Write controllers in the `contactsControllers.js` file (located in the controllers folder) according to the requirements below.

The REST API should support the following routes:

### **GET /api/contacts**

- Calls the `listContacts` service function to work with the `contacts.json` file
- Returns an array of all contacts in json format with status 200

### **GET /api/contacts/:id**

- Calls the `getContactById` service function to work with the `contacts.json` file
- If the contact is found by id, returns the contact object in json format with status 200
- If the contact is not found by id, returns json in the format `{"message": "Not found"}` with status 404

### **DELETE /api/contacts/:id**

- Calls the `removeContact` service function to work with the `contacts.json` file
- If the contact is found by id and deleted, returns the object of the deleted contact in json format with status 200
- If the contact is not found by id, returns json in the format `{"message": "Not found"}` with status 404

### **POST /api/contacts**

- Receives body in json format with fields `{name, email, phone}`. All fields are required - for validation create a schema in the `contactsSchemas.js` file (located in the schemas folder) using the joi package
- If some required fields are missing in the body (or the fields provided have invalid values), returns json in the format `{"message": error.message}` (where error.message is a meaningful message about the error) with status 400
- If the body is valid, calls the `addContact` service function to work with the `contacts.json` file, passing the data from the body
- Returns the newly created object with fields `{id, name, email, phone}` and status 201

### **PUT /api/contacts/:id**

- Receives body in json format with any set of updated fields (`name`, `email`, `phone`) (all fields do not need to be required in the body: if a field is not passed, it should retain the value it had before the update)
- If the update request is made without passing at least one field in the body, returns json in the format `{"message": "Body must have at least one field"}` with status 400
- The fields passed in the body must be validated - for validation create a schema in the `contactsSchemas.js` file (located in the schemas folder) using the joi package. If the passed fields have invalid values, returns json in the format `{"message": error.message}` (where error.message is a meaningful message about the error) with status 400
- If everything is fine with the body, calls the `updateContact` service function, which should be created in the `contactsServices.js` file (located in the services folder). This function should accept the id of the contact to be updated and the data from the body, and update the contact in the `contacts.json` file
- Returns the updated contact object with status 200
- If the contact is not found by id, returns json in the format `{"message": "Not found"}` with status 404

## **Pay attention to:**

Body validation can be done either in the controller or by creating a separate middleware for this purpose, which will be called before the controller. For creating middleware, you can use the `validateBody.js` function, which you'll find in the helpers folder.
For error handling, you can use the `HttpError.js` function, which you'll find in the helpers folder.

If you don't use these functions, delete them from the project before sending the work to the mentor for review.
