# NodeJS Blogs Image Backend API

This Repository contains a Project which has the Node Backend for Blogs with Images.\
This Project is created using a Modular approach, where various functionalities are divided into various Modules.

# Api End Points:

The Endpoint to get All the Blogs is:

    /blogs

Here, if only /blogs endpoint is used, then we will get all the Blogs.

The Endpoint to get a single Blog or multiple Blogs using Query Parameters is:

    /blogs?QueryParameter=Value

    /blogs?QueryParameter1=Value1&QueryParameter2=Value2

Here, if there are any Query Parameters after the /blogs endpoint, then we will get the Blogs which will match those Query Parameters.

The Endpoint to get a single Blog or multiple Blogs or all Blogs using Select Query Parameters is:

    /blogs?QueryParameter=Value&select=Value

    /blogs?select=Value

Here, if there are any Select Query Parameters after the /blogs endpoint, then we will get the Blogs which will contain only those matching fields.\
We will have to use the **select** keyword to specify the select query values.

The Endpoint to get a single blog by Id is:

    /blogs/blogId

Here, the blogId will be replaced by the actual Id which will be used to search for the Blog.

The Endpoint to create a new blog is:

    /blogs

The request body for the post request to create a new Blog will contain the form-data.

The Endpoint to delete a blog by Id is:

    /blogs/blogId

Here, the blogId will be replaced by the actual Id which will be used to search for the Blog to be deleted.

# Data Source:

The Blogs Data is stored in a MongoDB Database.\
Currently, a local MongoDB is used for Storing the Data.

# Main Component:

The Main Component is responsible for starting the Node Express Server on Localhost at the specified Port Number.\
The other function of the Main Component is to redirect any request on "/blogs" to the Routes Component.\
The Main Component is also responsible to connect the Server with MongoDB.

# Models Component:

The Models Component is responsible for creating a MongoDB Schema.\
This Schema contains the Structure of the Task Object to be created along with some Validations within the Schema itself.\
The Schema Model Object is used whenever a MongoDB Operation has to be performed.

# Routes Component:

The Routes Component is used to process any request received on "/blogs".\
Depending on the request route(path) & the http request type, the router will redirect the process to it's equivalent Controllers.

# Controllers Component:

The Controllers Component is used to process the request, perform some operations depending on the type of request, & sending back a response, either a Success Response or an Error Response.\
The Controller for the Endpoint "/blogs" will return all the Blog Objects if the Blogs are present, otherwise it will return an Error Message.\
It can also take additional Query Parameters as well as Select Query after "/blogs" Endpoint.\
If the Blog Object or multiple Blog Objects have the matching Query Parameters, then those Blog Objects are returned, otherwise it will return an Error Message.\
If the request has Select Query in it, then the Blog Object will only have those matching Fields in the Response.\
The Controller for the Endpoint "/blogs/blogId" will return the Blog Object with matching Id if the Blog is present, otherwise it will return an Error Message.\
The Controller for the Endpoint "/blogs" will create a new Blog Object if the request body is valid, otherwise it will return an Error Message.\
The Controller for the Endpoint "/blogs/blogId" will delete the Blog Object with matching Id if the Blog is present, otherwise it will return an Error Message.\
If the Blog Object is deleted, then the equivalent Blog Image will also be deleted.\
The Controllers use Helper Functions to generate a Success Message or an Error Message.

# Helper Functions Component:

The Helper Functions Component will be used to provide various helper functions to the Controllers.\
The Send Response Helper Function will generate a Response Message for a Successful Request.\
It takes the Status Code, Message & Blog Data as Parameters to generate the Response Message.\
The Send Error Helper Function will generate a Response Message for an Unsuccessful Request.\
It takes the Error Object as the Parameter to generate the Error Message.\
The App Error Class Helper Function will generate an Error which will be used by the Send Error Helper Function.\
It takes the Status Code, Error Status & Message as Parameters to generate an Error Object.\
The Multer Helper Function will be used to process form-data & store the Image.\
It will also check if the File uploaded is an Image or not.

# Middlewares:

The Validation Middleware is used to check if the Request Body is Valid or not.\
If it's valid, then the Execution continues, otherwise it will return an Error Message.

<!-- # Demo: -->

<!-- Live Demo of the NodeJS Blogs Backend API can be found here:\
https://node-blogs-backend.herokuapp.com/blogs/ -->
