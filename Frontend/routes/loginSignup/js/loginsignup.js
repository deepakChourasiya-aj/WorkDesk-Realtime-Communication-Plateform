
const singupfrom = document.getElementById('register-form');
singupfrom.addEventListener('submit',(e)=>{
    e.preventDefault();
    let email = document.getElementById("email").value
    let password = document.getElementById("pass").value
    console.log(email, password);
})

