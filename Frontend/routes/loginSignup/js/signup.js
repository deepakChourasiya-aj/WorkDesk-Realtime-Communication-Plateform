
const baseurl = "https://defiant-lime-kangaroo.cyclic.app/"
import loading from "../components/loading.components.js";
import hideLoading from "../components/hideLoading.components.js";


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
            hideLoading()
            window.location.reload();

        }
        else{
            alert(user.name + " user created successfully")  
            window.location.href = "./login.html"  
        }
    } catch (error) {
        console.log(error.message);
    }

}