var dc
let parent = document.getElementById('parent')
let formsubmit=document.getElementById('formsubmit')

formsubmit.addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent the default form submission
  
    // Get the user input from the form
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    // Construct the URL with query parameters
    const url = `http://localhost:3000/bookingsofyours?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
    // Redirect the user to the constructed URL
    try {
      let response=await fetch(url)
        .then((response) => response.json())
        .then((data) => {
          // console.log(typeof(data))
              console.log(data);
              if(data){
                // let tohide = document.getElementById('tohide');
                // tohide.style.display === 'none'
                for(let i=0;i<data.length;i++){
                  console.log(data[i].email)
                  dc=document.createElement('div')
                  parent.appendChild(dc)
                  dc.innerHTML=` <p class="container my-5 mx-5 px-5 py-5 bg-body-secondary rounded shadow"><b><u>Created By</u></b> : ${data[i].email} <br> <b><u>Event ID:</u></b> : ${data[i].id}</p>`
              }
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






