# Object Detector Web App
A web app wrapping the [MAX Object Detector](https://github.com/IBM/MAX-Object-Detector) model output

# Steps

## Start the Model REST API

### 1. Build the Model

Clone the model repository locally. In a terminal, run the following command:

```
git clone https://github.com/IBM/MAX-Object-Detector.git
```

Change directory into the repository base folder:

```
cd MAX-Object-Detector
```

To build the docker image locally, run: 

```
docker build -t max-tf-object-detection .
```

### 2. Deploy the Model

To run the docker image, which automatically starts the model serving API, run:

```
docker run -it -p 5000:5000 max-tf-object-detection
```

## Start the Web App

### 1. Get a local copy of the repository

Clone the web app repository locally. In a terminal, run the following command:

```
git clone https://github.com/ajbozarth/MAX-Object-Detector-Web-App.git
```

Change directory into the repository base folder:

```
cd MAX-Object-Detector-Web-App
```

### 2. Install dependancies

Make sure node.js and npm are installed then, in a terminal, run the following command:

```
npm install
```

### 3. Start the Web App

```
node app
```

# Links
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com)