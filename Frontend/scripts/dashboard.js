
import hideLoading from "../components/hideLoading.components.js";
import loading from "../components/loading.components.js";

loading()

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
// console.log(userdata);
if (userdata) {
    // let logout=document.getElementById("logout");
    // logout.add
    let hello = document.getElementById('hellouser')
    hello.innerText = "Hey " + userdata.name;
    hideLoading()
} else {
    loading()
    alert("user not logged in")
    window.location.href = "./loginSignup/login.html"
    loading()
}

// logo redirection
const homelogo = document.getElementById('homelogo')
homelogo.addEventListener('click', () => {
    loading()
    window.location.href = "../index.html"
})

// function display_c() {
//     var refresh = 1000; // Refresh rate in milli seconds
//     let mytime = setTimeout('display_ct()', refresh)
// }


// function display_ct() {
//     var x = new Date()
//     var x1=x.toUTCString();// changing the display to UTC string
//     document.getElementById('ct').innerHTML = x1;
//     var tt=display_c();
//      }
// display_ct()
