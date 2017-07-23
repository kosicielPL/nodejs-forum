<center><h1>NodeJS-Forum</h1></center>

</br>
</br>
<center><h3>Short Summary</h3></center>
<hr>
The app starts a web server. The port it listens to is configurable in `./server/config/config.js`. The webpage consists of two main parts - home page and forums.

#### Home
The page displays threads posted in forums marked as admin (meaning regular users can only read those forums). The amount of threads is also configurable. On the right side there is a list of last created threads. When somebody creates a new thread, the list auto updates through AJAX.

#### Forums
Forums part of the webpage has categories view (all the categories and the forums attached to them), forum view (threads contained inside the given forum) and thread view (displaying posts that are inside the given thread). Users who signed in can create new threads and posts while others can only read. Whenever someone creates a new thread or post a notification pops to everyone who is online at the moment.

*The whole website is responsive and works just as good on mobile as on desktop.*
</br>

### Commands
    * `npm start` - to start the server
    * `npm test` - to run unit and integration tests with mocha
    * `npm run coverage:unit` - to run unit tests and provide coverage percentage
    * `npm run coverage:integration` - to run integration tests and provide coverage percentage

### Technologies used
* nodejs
* mongodb
* bootstrap
* pug
* express
* mocha
* jQuery
* socket.io

### LIVE DEMO

[Hosted at Amazon Web Services](http://ec2-52-59-28-191.eu-central-1.compute.amazonaws.com/)
