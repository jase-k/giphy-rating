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
cd giphy-rating
cd client
npm install
npm start
```

## Common Error: 
If you run into the error below you can run the sql scripts in MySQL shell or MySQL Workbench
```
Error: 
Client does not support authentication protocol requested by server; consider upgrading MySQL client

SQL Scripts Solution: 
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'
flush privileges;
```
Once you run the sql script. Run ```nodemon ./server.js``` again

## Known Bugs: 
- If users manually refresh page, authentication will fail -> their id doesn't save in the state so it messes up sql statments. 
- sometimes the comment button doesn't work when searching after viewing one gif. Get this warning: "react_devtools_backend.js:2540 No routes matched location "/gifs/BrNiAk3eXfD4Q/comment" " *However if you click the rate (star) button, then the comment button it always works. -Inconsistent problem.




