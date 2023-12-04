var dc
let parent = document.getElementById('parent')
let formsubmit=document.getElementById('formsubmit')
let getall=document.getElementById('getall')


formsubmit.addEventListener("submit", async function (event) {
  event.preventDefault(); 
  const id = document.getElementById("id").value;
  // location.reload()
  const url = `http://localhost:3000/eventdatabyid?id=${encodeURIComponent(id)}`;
  try {
    let response=await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // console.log(typeof(data))
            // console.log(data);
            if(data){
              // let tohide = document.getElementById('tohide');
              // tohide.style.display === 'none'
              for(let i=0;i<data.length;i++){
                console.log(data[i].createdby)
                dc=document.createElement('div')
                parent.appendChild(dc)
                dc.innerHTML=` <p class="container my-5 mx-5 px-5 py-5 bg-body-secondary rounded shadow"><b><u>Created By</u></b> : ${data[i].createdby} <br> <b><u>Description</u></b> : ${data[i].description} <br> <b><u>Date</u></b> : ${data[i].date} <br> <b><u>Time</u></b> : ${data[i].time} <br> <b><u>Venue</u></b> : ${data[i].venue}<br> <b><u>ID</u></b> : ${data[i].id} <br><br><button class="btn btn-outline-primary btn-sm" onclick="window.location.href='/ticketbookings'">Book Ticket</button></p>`
            }
            
        }else{
          alert("ID does not exist")
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert("something went wrong")
      });
  } catch (error) {
    console.log("something went wrong",error)  
  }
});


getall.addEventListener("click",async()=>{
  try {
      let response=await fetch(`/api/eventdata`)
        .then((response) => response.json())
        .then((data) => {
          // console.log(typeof(data))
              // console.log(data);
              if(data){
                // let tohide = document.getElementById('tohide');
                // tohide.style.display === 'none'
                for(let i=0;i<data.length;i++){
                  console.log(data[i].createdby)
                  dc=document.createElement('div')
                  parent.appendChild(dc)
                  dc.innerHTML=` <p class="container my-5 mx-5 px-5 py-5 bg-body-secondary rounded shadow"><b><u>Created By</u></b> : ${data[i].createdby} <br> <b><u>Description</u></b> : ${data[i].description} <br> <b><u>Date</u></b> : ${data[i].date} <br> <b><u>Time</u></b> : ${data[i].time} <br> <b><u>Venue</u></b> : ${data[i].venue}<br> <b><u>ID</u></b> : ${data[i].id} <br><br><button class="btn btn-outline-primary btn-sm" onclick="window.location.href='/ticketbookings'">Book Ticket</button></p>`
              }
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } catch (error) {
      console.log("something went wrong",error)  
    }
})  
