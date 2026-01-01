const express= require('express')
const userRouter= require('./routes/user')

const app = express();

app.use(express.json());
app.use((req,res,next)=> {
    const path = req.url
    if(path == '/user/signin'|| path =='/user/signup')
        next()
    else{
        res.send('You need to be authorised')
    }

})

app.use('/user',userRouter)

app.listen(4000, 'localhost', () => {
    console.log('Server is running on 4000');
});