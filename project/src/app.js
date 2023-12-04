//requirments
const express=require("express")
const path=require("path")
const bcryptjs=require('bcryptjs')
const app=express()
const hbs=require("hbs")
require("./database/conn")
const userData=require("./model/userSchema")
const eventdetails=require("./model/eventdetails")
const ticketdata=require("./model/ticketbookings")
const{ json }=require("express")

const port=process.env.PORT ||3000


app.use(express.json())
app.use(express.urlencoded({extended:false})) 
app.use(express.static(path.join(__dirname,))) 
//console.log(path.join(__dirname))


//Linking different different pages
app.get("/",(req,res)=>{
    res.render(path.join(__dirname,'../',"public",'index.hbs'))
})


app.get("/login",(req,res)=>{
    res.render(path.join(__dirname,'../',"public","login.hbs"))
})

app.get("/registeration_form",(req,res)=>{
    res.render(path.join(__dirname,'../',"public","registeration_form.hbs"))
})

app.get("/generateevent",(req,res)=>{
    res.render(path.join(__dirname,'../',"public","generateevent.hbs"))
})

app.get("/deleteevent",(req,res)=>{
    res.render(path.join(__dirname,'../',"public","deleteevent.hbs"))
})


app.get("/eventdataid",(req,res)=>{
    res.render(path.join(__dirname,'../',"public","eventdataid.hbs"))
})
app.get("/eventdata",(req,res)=>{
    res.render(path.join(__dirname,'../',"public","eventdata.hbs"))
})

app.get("/ticketbookings",(req,res)=>{
    res.render(path.join(__dirname,'../',"public","ticketbookings.hbs"))
})

app.get("/bookings",(req,res)=>{
    res.render(path.join(__dirname,'../',"public","bookings.hbs"))
})

app.get("/events",(req,res)=>{
    res.render(path.join(__dirname,'../',"public","events.hbs"))
})




app.get('/user_portal.js', (req, res) => {
    res.type('application/javascript');
    res.sendFile(path.join(__dirname,'../','public','/user_portal.js'));
});

// app.get('/login.js', (req, res) => {
//     res.type('application/javascript');
//     res.sendFile(path.join(__dirname,'../','public','/login.js'));
// });

app.get('/admin_portal.js', (req, res) => {
    res.type('application/javascript');
    res.sendFile(path.join(__dirname,'../','public','/admin_portal.js'));
});

app.get('/eventdata.js', (req, res) => {
    res.type('application/javascript');
    res.sendFile(path.join(__dirname,'../','public','/eventdata.js'));
});

app.get('/events.js', (req, res) => {
    res.type('application/javascript');
    res.sendFile(path.join(__dirname,'../','public','/events.js'));
});

app.get('/eventdataid.js', (req, res) => {
    res.type('application/javascript');
    res.sendFile(path.join(__dirname,'../','public','/eventdataid.js'));
});

app.get('/bookings.js', (req, res) => {
    res.type('application/javascript');
    res.sendFile(path.join(__dirname,'../','public','/bookings.js'));
});

app.get('/index.css', (req, res) => {
    res.type('text/css');
    res.sendFile(path.join(__dirname,'../','public','/index.css'));
});


//registeration check
app.post("/registeration_form",async(req,res)=>{
    try{
        // console.log(req.body.Name)
        const password=req.body.password
        const cpassword=req.body.cpassword
        if(password===cpassword){
            const data=new userData({
                name:req.body.name,
                age:req.body.age,
                phone:req.body.phone,
                email:req.body.email,
                password:req.body.password,
                cpassword:req.body.cpassword
            })
            const result=await data.save()
            res.status(201).render((path.join(__dirname,'../',"public",'index.hbs')));
        }
        else{
            res.send("<script>alert('Password are not matched.'); window.location.href='/login';</script>")
        }
    }
    catch(err){
        res.send("<script>alert('An error occured.'); window.location.href='/login';</script>")
    }
})




//login check
app.post("/login", async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password
        const userdata = await userData.findOne({ email:email });
        if (userdata) {
            const isMatched=await bcryptjs.compare(password,userdata.password)
            if (isMatched) {
                app.get('/api/email',(req,res)=>{
                    res.json({email:email})
                })
                res.render(path.join(__dirname, "../", "public", "user_portal.hbs"));
            } else {
                res.send("<script>alert('Invalid password.'); window.location.href='/login';</script>");
            }
        } else {
            res.send("<script>alert('Invalid password.'); window.location.href='/login';</script>");
        }

    } catch (error) {
        res.send("<script>alert('Invalid password.'); window.location.href='/login';</script>");


    }
});


// generateevent
app.post("/generateevent", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const id=req.body.id;
        const userdata = await userData.findOne({ email:email });
        if (userdata) {
            const isMatched=await bcryptjs.compare(password,userdata.password)
            if (isMatched) {
                const idvalidation= await eventdetails.findOne({id:id})
                if(!idvalidation){
                        const event=new eventdetails({
                        createdby:req.body.email,
                        description:req.body.description,
                        date:req.body.date,
                        time:req.body.time,
                        venue:req.body.venue,
                        id:req.body.id
                    })
                    const result=await event.save()
                    res.send("<script>alert('data saved.');window.location.href='/generateevent'</script>")
                }else{
                    res.send("<script>alert('This ID is not available try another ID'); window.location.href='/generateevent'</script>")
                }
            } else {
                res.send("<script>alert('Invalid password.'); window.location.href='/generateevent';</script>");
            }
        } else {
            res.send("<script>alert('you havent regester yet.'); window.location.href='/generateevent';</script>");
        }

    } catch (error) {
        res.send("<script>alert('Something went wrong PLease check your Unique ID (Must Be unique)'); window.location.href='/generateevent';</script>");


    }
});




//eventdetails
app.get('/api/eventdata', async (req, res) => {
        try {
        const data = await eventdetails.find(); 
        res.json(data);
      } catch (error) {
        res.status(500).json({ error: 'Unable to fetch data' });
      } 
});

// bookingsofyou

app.get('/bookingsofyours', async(req, res) => {
    try{
        const email = req.query.email;
        const password=req.query.password;
        const user=await userData.findOne({email:email})
        if(user){
            const isMatched=await bcryptjs.compare(password,user.password)
            if(isMatched){
                const data=await ticketdata.find({email:email})
                if(data){
                    res.json(data)
                }else{
                    res.send("<script>alert('Wrong ID.'); window.location.href='/bookings';</script>")
                }
            }
            else{
                res.send("<script>alert('Wrong password'); window.location.href='/bookings';</script>")
                res.send("wrong id")
            }
        }else{
            res.send("<script>alert('Email not found'); window.location.href='/bookings';</script>")    
            res.send("wrong id")

        }
    }catch(err){
        res.send("<script>alert('something went wrong.'); window.location.href='/bookings';</script>")
        res.send("wrong id")

    }
    });



app.get('/eventdatabyid', async(req, res) => {
    try{
        const id = req.query.id;
        // Handle the "id" as needed, e.g., send a response with it
        console.log(`Received ID: ${id}`);
        // res.send(`Received ID: ${id}`);
        const data=await eventdetails.find({id:id})
        if(data){
            res.json(data)
        }else{
            res.send("<script>alert('Wrong ID.'); window.location.href='/eventdata';</script>")
        }
    }catch(err){
        res.send("<script>alert('something went wrong.'); window.location.href='/eventdata';</script>")
    }
    
});

//usesevents
app.get('/eventsofyours', async(req, res) => {
    try{
        const email = req.query.email;
        console.log(email)
        const password=req.query.password;
        console.log(password) 
        const user=await userData.findOne({email:email})
        console.log(user)
        if(user){
            const isMatched=await bcryptjs.compare(password,user.password)
            // console.log(isMatched)
            if(isMatched){
                const data=await eventdetails.find({createdby:email})
                console.log(data)
                if(data){
                    res.json(data)
                }else{
                    res.send("<script>alert('No data found'); window.location.href='/events';</script>")
                }
            }
            else{
                res.send("<script>alert('Wrong password'); window.location.href='/events';</script>")
                res.send("wrong id")
            }
        }else{
            res.send("<script>alert('Email not found'); window.location.href='/events;</script>")    
            res.send("wrong id")

        }
    }catch(err){
        res.send("<script>alert('something went wrong.'); window.location.href='/events';</script>")

    }
    });



// booking data
app.post("/ticketbookings", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const id=req.body.id;
        const userdata = await userData.findOne({ email:email });
        if (userdata) {
            const isMatched=await bcryptjs.compare(password,userdata.password)
            if (isMatched) {
                const idvalidation= await eventdetails.findOne({id:id})
                if(idvalidation){
                        const bookings=new ticketdata({
                        email:req.body.email,
                        id:req.body.id
                    })
                    const result=await bookings.save()
                    res.send("<script>alert('Booked.'); window.location.href='/ticketbookings'</script>")
                    // res.render(path.join(__dirname, "../", "public", "user_portal.hbs"));

                }else{
                    res.send("<script>alert('Invalid ID'); window.location.href='/ticketbookings'</script>")
                }
            } else {
                res.send("<script>alert('Invalid password.'); window.location.href='/ticketbookings';</script>");
            }
        } else {
            // res.json({ error: "Invalid password" });
            res.send("<script>alert('you havent regester yet.'); window.location.href='/ticketbookings';</script>");
            // console.log({ error: "Invalid password" });
        }

    } catch (error) {
        // res.status(400).json({error:"Invalid data"})
        res.send("<script>alert('Something went wrong PLease check your Unique ID (Must Be unique) or you have already booked this event'); window.location.href='/ticketbookings';</script>");
    }
});


//deleteting
app.post("/deleteevent", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const id=req.body.id;
        const userdata = await userData.findOne({ email:email });
        if (userdata) {
            const isMatched=await bcryptjs.compare(password,userdata.password)
            if (isMatched) {
                const idvalidation= await eventdetails.findOne({id:id})
                if(idvalidation){
                        const deletion= await eventdetails.deleteOne({id:id})
                        const deletebooking=await ticketdata.deleteMany({id:id})
                    }
                    res.send("<script>alert('Deleted.'); window.location.href='/login'</script>")
                    // res.render(path.join(__dirname, "../", "public", "user_portal.hbs"));

                }else{
                    res.send("<script>alert('Invalid ID'); window.location.href='/login'</script>")
                }
            } else {
                res.send("<script>alert('Invalid password.'); window.location.href='/login';</script>");
            }
    } catch (error) {
        // res.status(400).json({error:"Invalid data"})
        res.send("<script>alert('Something went wrong PLease check your Unique ID (Must Be unique) or you have already booked this event'); window.location.href='/ticketbookings';</script>");
    }
});


// getting your tickets 
app.post('/bookings',async(req,res)=>{
    res.render(path.join(__dirname, "../", "public", "bookings.hbs"));
    
})
//listening to port
app.listen(port,()=>{
    console.log(`port is running at no ${port}`)
})