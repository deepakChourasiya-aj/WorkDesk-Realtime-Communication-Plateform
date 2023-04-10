
import hideLoading from "../components/hideLoading.components.js";
import loading from "../components/loading.components.js";

// loading()

let swiper = new Swiper(".mySwiper", {
    direction: "vertical",
    slidesPerView: 1,
    spaceBetween: 0,
    mousewheel: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });


const userdata = JSON.parse(localStorage.getItem('userdata')) 
console.log(userdata);

// auto laoding animations
setTimeout(async()=>{
  if(userdata) {
  
    let hello = document.getElementById('hellouser')
    hello.innerText = "Hey "+userdata.name;
    // loading()
  }else{
    // hideLoading()
    // window.location.href = "./routes/loginSignup/login.html"
    loading()
  }
},4000)

// autologin redirect
setTimeout(()=>{
  if(userdata) {
  
    let hello = document.getElementById('hellouser')
    hello.innerText = "Hey "+userdata.name;
    // hideLoading()
  }else{
    // loading()
    hideLoading()
    window.location.href = "./routes/loginSignup/login.html"
    // loading()
  }
},6000)
// log-out function for the logout button clearing data of the user from local storage
let logout=document.getElementById("logout");
if(userdata) {
  logout.innerText="Logout"
  logout.addEventListener("click",async()=>{

    
    await Swal.fire({
      position: 'center',
      title: 'Are you sure?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Logout!'
    }).then(async(result) => {
      if (result.isConfirmed) {
        await Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Successfully LogedOut',
          showConfirmButton: false,
          timer: 1500
        })
        localStorage.removeItem("userdata");
        window.location.href="./routes/loginSignup/login.html"
      }
    })
   
  })

  
  let hello = document.getElementById('hellouser')
  hello.innerText = "Hey "+userdata.name;
}else{

  logout.addEventListener("click",()=>{
    window.location.href="./routes/loginSignup/login.html"
  })
}


// logo redirection
const homelogo = document.getElementById('homelogo')
homelogo.addEventListener('click',()=>{
  loading()
  window.location.href= "index.html"
} )
