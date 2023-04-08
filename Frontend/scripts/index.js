
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
setTimeout(()=>{
  if(userdata) {
  
    let hello = document.getElementById('hellouser')
    hello.innerText = "Hey "+userdata.name;
    loading()
  }else{
    hideLoading()
    window.location.href = "./routes/loginSignup/login.html"
    loading()
  }
},8000)

// autologin redirect
setTimeout(()=>{
  if(userdata) {
  
    let hello = document.getElementById('hellouser')
    hello.innerText = "Hey "+userdata.name;
    hideLoading()
  }else{
    loading()
    window.location.href = "./routes/loginSignup/login.html"
    loading()
  }
},10000)

let logout=document.getElementById("logout");
if(userdata) {
  logout.innerText="Logout"
  logout.addEventListener("click",()=>{
    window.location.href="./routes/loginSignup/login.html"
    localStorage.removeItem("userdata");
  })

  
  let hello = document.getElementById('hellouser')
  hello.innerText = "Hey "+userdata.name;
}
// logo redirection
const homelogo = document.getElementById('homelogo')
homelogo.addEventListener('click',()=>{
  loading()
  window.location.href= "index.html"
} )
