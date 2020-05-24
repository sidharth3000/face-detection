const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');

const db=knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'Unlock@008',
    database : 'smart'
  }
});

db.select('*').from('users').then(data=>{
	console.log(data);
})

const app = express();
app.use(bodyParser.json());
app.use(cors())

const database = {
	users: [
	{
		id:'123',
		name: 'john',
		email: 'john@gmail.com',
		password: 'cookies',
		entries:0,
		joined: new Date()
	},
	{
		id:'124',
		name: 'sally',
		email: 'sally@gmail.com',
		password: 'bananas',
		entries:0,
		joined: new Date()
	}
	]
}

app.get('/',(req,res)=>{
	res.json(database.users);
})

app.listen(5000,()=>{
	console.log('app is running');
})

app.post('/signin',(req,res)=>{
	if(req.body.email === database.users[0].email &&
		req.body.password === database.users[0].password){
		res.json('success');
	}else{
		res.status(400).json('error logging in');
	}
})

app.post('/register',(req,res)=>{
	const {email,name,password} = req.body;
	const hash = bcrypt.hashSync("password");
	db.transaction(trx =>{
		trx.insert({
			hash:hash,
			email:email
		})
		.into('login')
		.returning('email')
		.then(loginEmail => {

		return trx('users')
		.returning('*')
		.insert({
		email:loginEmail,
		name:name,
		joined : new Date()
	})
		.then(user =>{
		res.json(user[0]);
	})	

	})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	
	.catch(err=>res.json('errorrrrrrrrr'))
	
})

app.get('/profile/:id',(req,res)=>{
	const {id} = req.params;
	db.select('*').from('users').where({id})
	.then(user=>{
		res.json(user[0]);
	})
	if(!found){
		res.status(400).json('not found');
	}
})

app.put('/image',(req,res)=>{
	const {id} = req.body;
	// knex('users')
  db('users').where('id', '=', id)
  .increment('entries',1)
  .returning('entries')
  .then(entries=>{
  	console.log(entries);
  })
})

