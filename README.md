[![Build Status](https://travis-ci.org/CODAIT/MAX-Object-Detector-Web-App.svg?branch=master)](https://travis-ci.org/CODAIT/MAX-Object-Detector-Web-App)

# Object Detector Web App
A web app wrapping the [MAX Object Detector](https://github.com/IBM/MAX-Object-Detector) model output

## Included Components

* [IBM Model Asset Exchange](https://developer.ibm.com/code/exchanges/models/): A place for developers to find and use
free and open source deep learning models.

## Featured Technologies

* [Node.js](https://nodejs.org/): An open-source JavaScript run-time environment for executing server-side JavaScript code.
* [JQuery](https://jquery.com): jQuery is a cross-platform JavaScript library designed to simplify the client-side scripting of HTML.
* [Express](https://expressjs.com): A popular and minimalistic web framework for creating APIs and Web servers.

# Steps

## Run Locally

### Deploy the Model

To run the docker image, which automatically starts the model serving API, run:

```
$ docker run -it -p 5000:5000 codait/max-object-detector
```

This will pull a pre-built image from Docker Hub (or use an existing image if already cached locally) and run it.
If you'd rather build the model locally you can follow the steps in the
[model README](https://github.com/IBM/MAX-Object-Detector/#steps).

### Start the Web App

The latest release of the web app is deployed with the model API above and is available at
[`http://localhost:5000/app`](http://localhost:5000/app)

To start the web app using the latest development code follow the steps below:

#### 1. Get a local copy of the repository

Clone the web app repository locally. In a terminal, run the following command:

```
$ git clone https://github.com/CODAIT/MAX-Object-Detector-Web-App.git
```

Change directory into the repository base folder:

```
$ cd MAX-Object-Detector-Web-App
```

#### 2. Install dependencies

Make sure node.js and npm are installed then, in a terminal, run the following command:

```
$ npm install
```

#### 3. Start the Web App

You then start the web app by running:

```
$ node app
```

You can then access the web app at: [`http://localhost:8090`](http://localhost:8090)

# Sample Output

![Web UI Screenshot](doc/source/images/webui.png)

# Links

* [Model Asset eXchange (MAX)](https://developer.ibm.com/code/exchanges/models/)
* [Center for Open-Source Data & AI Technologies (CODAIT)](https://developer.ibm.com/code/open/centers/codait/)

# Learn More

* **Artificial Intelligence Code Patterns**: Enjoyed this Code Pattern? Check out our other
[Artificial Intelligence Code Patterns](https://developer.ibm.com/code/technologies/artificial-intelligence/)
* **AI and Data Code Pattern Playlist**: Bookmark our
[playlist](https://www.youtube.com/playlist?list=PLzUbsvIyrNfknNewObx5N7uGZ5FKH0Fde) with all of our Code Pattern videos
* **Watson Studio**: Master the art of data science with IBM's [Watson Studio](https://dataplatform.ibm.com/)
* **Deep Learning with Watson Studio**: Design and deploy deep learning models using neural networks, easily scale to
hundreds of training runs. Learn more at [Deep Learning with Watson Studio](https://www.ibm.com/cloud/deep-learning).

# License
[Apache 2.0](LICENSE)
