const generateevent=document.getElementById('generateevent')
const eventdata=document.getElementById('eventdata')
const getyourevents=document.getElementById('getyourevents')
var email

generateevent.addEventListener("click",async()=>{
  window.location.href='/generateevent'
})

eventdata.addEventListener("click",async()=>{
  window.location.href='/eventdata'
})


getyourevents.addEventListener("click",async()=>{
  window.location.href='/events'
})


try{
  
  fetch('/api/email')
    .then(response => {
      // Check if the response status is OK (200)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // Parse the response body as JSON
      return response.json();
    })
    .then(data => {
      // The JSON data is available here
      console.log(data);
      
      // You can save it in a variable for further use

      email = data.email;
      const user=document.getElementById('emaildisplay')
      user.innerHTML=`<p> Welcome ${email}</p>`
  
      // Now you can work with the email variable
      console.log(`Email: ${email}`);
    })
    .catch(error => {
      // Handle any errors that occurred during the fetch
      console.error('Fetch error:', error);
    });

}catch(err){
  console.log(err)
}





  