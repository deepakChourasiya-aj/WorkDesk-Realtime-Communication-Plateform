const baseurl = "https://rich-ruby-kitten-toga.cyclic.app"
import loading from "../components/loading.components.js";
import hideLoading from "../components/hideLoading.components.js";


const from = document.getElementById('login-form');
from.addEventListener('submit',(e)=>{
    e.preventDefault();
    let name = from.your_name.value;
    let password = from.your_pass.value;
    console.log(name, password);
})