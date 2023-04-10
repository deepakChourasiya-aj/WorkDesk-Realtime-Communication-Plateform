
const baseurl = "https://defiant-lime-kangaroo.cyclic.app/"
import loading from "../components/loading.components.js";
import hideLoading from "../components/hideLoading.components.js";

// getting user data from the signup form
const singupfrom = document.getElementById('register-form');
singupfrom.addEventListener('submit',(e)=>{
    e.preventDefault();
    let email = document.getElementById("email").value
    let name = document.getElementById("name").value
    let password = document.getElementById("pass").value
    const user = {name, email, password}
    loading()
    register(user)

    console.log(user);
})
// registering a new user 
const register = async(user) =>{
    try {

        const res = await fetch(`${baseurl}user/register`,{
            method : "POST",
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(user) 
        })
        let data = await res.json()
        if(data.err){
            alert(data.err)
            await Swal.fire({
                position: 'center',
                icon: 'error',
                title: `${data.err}`,
                showConfirmButton: false,
                timer: 2500
              })
            hideLoading()
            window.location.reload();

        }
        else{
            // alert("User"+ user.name + "  Created Successfully")  
            await Swal.fire({
                position: 'center',
                icon: 'success',
                title: `User ${user.name} Created Successfully`,
                showConfirmButton: false,
                timer: 2800
              })
            window.location.href = "./login.html"  
        }
    } catch (error) {
        console.log(error.message);
    }

}