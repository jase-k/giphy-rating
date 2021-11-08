# Getting Started: 

## Starting: 
clone repository: 
```git clone https://github.com/jase-k/giphy-rating.git```

Run the ```db_setup.sql``` file to set up your mysql db (use either the MySQL CLI or copy it into Workbench)

Create .env file with the following properties: 
```
SECRET_KEY = 
MySQL_PW = //Set to your mysql user
MySQL_USER = //Set to your mysql pw
GIPHY_API_KEY = //get from https://developers.giphy.com/
```

In seperate terminals run: <br> 
```
cd giphy-rating
npm install
nodemon ./server.js
``` 

```
cd client
npm install
npm start
```



## Known Bugs: 
-> If users manually refresh page, authentication will fail -> their id doesn't save in the state so it messes up sql statments. 
-> apostrophes mess up SQL statements
-> sometimes the comment button doesn't work when searching after viewing one gif. Get this warning: "react_devtools_backend.js:2540 No routes matched location "/gifs/BrNiAk3eXfD4Q/comment" " *However if you click the rate (star) button, then the comment button it always works. -Inconsistent problem.




