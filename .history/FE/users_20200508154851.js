let user_profile;
const formData = document.getElementById("myform");
    myform.addEventListener("submit",(e)=>{
      e.preventDefault();
          user_profile = document.getElementById('username').value;
          console.log('user should be printed');
          console.log(user_profile);
});