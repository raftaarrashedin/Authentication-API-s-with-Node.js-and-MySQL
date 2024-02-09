# Authentication-API-s-with-Node.js-and-MySQL

# Initial commit

# Directory setup done
```
mkdir config
mkdir controllers
mkdir helpers
mkdir middleware
mkdir routes
```

# Database connection successfull

```
const conn = mysql.createConnection({
	host : DB_HOST,
	user : DB_USERNAME,
	password : DB_PASSWORD,
	database : DB_NAME
})
```

# Workflows-

```
fixed the signUpValidation error
```
```
insertion of user not working, done with the hashing of password
```
```
error solved, created and validated register api
```
```
login and authorization function added and generated the jwt token
```

```
git commit -m " validated data using joi module "
```