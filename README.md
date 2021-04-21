This is React-Shop application is a MERN website app that has featues of an e-commerce site.

Hello, My Friends  
Thank you for having interest in this repository ! 

To use this application, 

1. make dev.js file inside config folder 
2. put mongoDB info into dev.js file, 
```
module.exports = {
    mongoURI: 'YOUR_MONGODB_KEY'
}
```
3. Type  " npm install " inside the root directory  ( Download Server Dependencies ) 
4. Type " npm install " inside the client directory ( Download Front-end Dependencies )

## Deploy at heroku
1. Create project
```
heroku login
heroku create
```
2. Deploy step
```
heroku git:clone -a YOUR_PROJECT_NAME
cd YOUR_PROJECT_NAME
git add .
git commit -am "make it better"
git push heroku master
```
