const formData = document.getElementById("myform");
    myform.addEventListener("submit",(e)=>{
      e.preventDefault();
         let user_profile = document.getElementById('username').value;
          console.log('user should be printed');
          console.log(user_profile);
});
function getUsers(username){
  const users_online = {username};
  username.push(username);
}