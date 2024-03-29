const baseurl = "https://defiant-lime-kangaroo.cyclic.app/"
import loading from "../components/loading.components.js";
import hideLoading from "../components/hideLoading.components.js";

// const googlelogin = document.getElementById('googlelogin')

// googlelogin.addEventListener('click',async(e) =>{
//     e.preventDefault();
    
//     try {
//         const res = await fetch(`${baseurl}/auth/google/callback`,{
//             method : "GET",
//             headers : {
//                 'Content-Type' : 'application/json'
//             }
//         })
//         const data = await res.json()
//         console.log(data);

//     } catch (error) {
//         console.log(error.message);
//     }
// // })
// const githublogin = document.getElementById('githublogin')

// githublogin.addEventListener('click',async(e) =>{
//     e.preventDefault();
    
//     try {
//         const res = await fetch(`https://defiant-lime-kangaroo.cyclic.app/auth/github/`,{
//             method : "GET",
//             headers : {
//                 'Content-Type' : 'application/json'
//             }
//         })
//         const data = await res.json()
//         console.log(data);

//     } catch (error) {
//         console.log(error.message);
//     }
// })

// getting all details from user for the login page

const from = document.getElementById('login-form');
from.addEventListener('submit',(e)=>{
    e.preventDefault();
    let email = from.your_name.value;
    let password = from.your_pass.value;
    login({email,password})
    loading()
    console.log(email, password);
})



// login function for verification of the user
const login = async(user) =>{
    
    try {

        const res = await fetch(`${baseurl}user/login`,{
            method : "POST",
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(user) 
        })


        if(res.ok){
            await Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Logged in',
                showConfirmButton: false,
                timer: 1500
              })
            let data = await res.json()
            console.log(data);
            localStorage.setItem('userdata',JSON.stringify(data))
            window.location.href = "../../index.html"  
 
        }else{
            let data = await res.json()
            await Swal.fire({
                position: 'center',
                icon: 'error',
                title: `Invalide Credentials`,
                showConfirmButton: false,
                timer: 2500
              })
            document.body.style.backgroundColor = 'white';
            hideLoading()
            window.location.reload();
        }

    } catch (error) {
        // alert(error.message);
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: `Invalide Credentials`,
            showConfirmButton: false,
            timer: 2000
          })
        hideLoading()

    }

}