const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require('./model/user')
const Football= require('./model/BookFootball')
const auth = require('./Middleware/auth')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
var cors = require('cors');
const date = require('date-and-time')
const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'

mongoose.connect('mongodb://localhost:27017/MyDB', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	//useCreateIndex: true
})

const app = express()
app.use(cors());

app.use('/', express.static(path.join(__dirname, 'static')))
app.use(bodyParser.json())



app.post('/api/login', async (req, res) => {
	const { username, password } = req.body
	const user = await User.findOne({ username }).lean()

	if (!user) {
		return res.json({ status:404, error: 'Khong ton tai tai khoan' })
		//return res.status(404).json({error:'khong ton tai tk'})
	}

	if (await bcrypt.compare(password, user.password)) {
		// the username, password combination is successful
		const isAdmin=user.isAdmin;
		const _token = jwt.sign(
			{
				id: user._id,
				username: user.username
			},
			JWT_SECRET
		)

		 return res.json({ status: 'ok', token: _token,isAdmin:isAdmin })
		//return res.status(200).send(({token:_token}))
	}

	//return res.status(401).send(({message:"Invalid username/password"}))
	//return res.send({error:404,message:"loi dang nhao roi"})
	return res.json({ status:401, error: 'tai khoan va mk sai' })
})

app.post('/api/register', async (req, res) => {
	const { email,username, password: plainTextPassword } = req.body
    console.log(req.body)

	if (!username || typeof username !== 'string') {
		return res.json({ status: 'error', error: 'Invalid username' })
	}
	if (!email || typeof email !== 'string') {
		return res.json({ status: 'error', error: 'Invalid email' })
	}

	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password' })
	}

	if (plainTextPassword.length < 5) {
		return res.json({
			status: 'error',
			error: 'Password too small. Should be atleast 6 characters'
		})
	}
	// const createAt= new Date().toISOString()
	// .replace(/T/, ' ')
	// .replace(/\..+/, '') 
	const now =new Date();
	let createAt = date.format(now,'YYYY/MM/DD HH:mm:ss');
	//var createAt=dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
	const fullName='hi'
	const isAdmin='1';
	const password = await bcrypt.hash(plainTextPassword, 10)

	try {
		const response = await User.create({

			username,
			password,
			fullName,
			email,
			createAt,
			isAdmin
		})
		console.log('User created successfully: ', response)
	} catch (error) {
		if (error.code === 11000) {
			// duplicate key
			return res.json({ status: 'error', error: 'Username already in use' })
		}
		throw error
	}

	res.json({ status: 'ok' })
})
app.get('/users/me', async(req, res) => {
    // View logged in user profile
	//console.log(req.createAt)
	//const data = jwt.verify(token, process.env.JWT_SECRET)
	const token = req.header('Authorization').replace('Bearer ','')
	const data =  jwt.verify(token, JWT_SECRET)
	//console.log(data.email)
	try{
		const user = await User.findOne({ _id: data.id,}).lean()
		res.send(user)
	
		//req.user=user
	}catch(e){
		
	}

	
	

   
})

app.post('/api/change-fullname',async(req,res)=>{
	const {fullName}=req.body;
	console.log(fullName)
	const token = req.header('Authorization').replace('Bearer ','')
	const data =  jwt.verify(token, JWT_SECRET)
	//const _id=data.id
	if(!fullName|| typeof fullName !== 'string'){
		return res.json({ status: 'error', error: 'Invalid password' })
	}
	if(fullName.length<5){
		return res.json({
			status: 'error',
			error: 'Tên phải dài hơn'
		})
	}
	try{
		await User.updateOne(
			{_id:data.id},
			{
				$set:{fullName:fullName}
			}
		)
		res.json({ status: 'ok',FullNameUser:fullName })


	}catch(e){
		console.log(e)
	}
})
//change password
app.post('/api/change-password', async (req, res) => {
	const { token, password,newpassword: plainTextPassword } = req.body
	const users = await jwt.verify(token,'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk')
       const username= users.username
	   //console.log(username)
	const user = await User.findOne({ username }).lean()
	//console.log(user)
	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password' })
	}

	if (plainTextPassword.length < 5) {
		return res.json({
			status: 'error',
			error: 'Mật khẩu phải có từ  5 ký tự'
		})
	}

	try {
		if(await bcrypt.compare(password,user.password) ){
			const user = jwt.verify(token, JWT_SECRET)

			const _id = user.id
	
			const password = await bcrypt.hash(plainTextPassword, 10)
	
			await User.updateOne(
				{ _id },
				{
					$set: { password }
				}
			)
			res.json({ status: 'ok' })
		}else{
			res.json({ status: 'error', error: 'Mật khẩu cũ không đúng' })

		}
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: 'thieu thuoc tinh' })
	}
})

//FOOTBALL PITCH (BILL)

app.post('/api/book-football-pitch', async(req, res)=>{
	//const token = req.header('Authorization').replace('Bearer ','')
	//const data =  jwt.verify(token, JWT_SECRET)

	const {
		customer,
		phone,
		pitchName,
		startTime,
		date,
		price,
		comment,
		username,
	}=req.body;

	try {
		const response= await Football.create({
			customer,
			phone,
			pitchName,
			startTime,
			date,
			price,
			comment,
			username,
		})
		console.log("Thanh Cong",response)
	} catch (error) {
		console.log("loi roi",e)
	}
	res.json({ status: 'ok' })
})


app.listen(3000, () => {
	console.log('Server up at 3000')
})