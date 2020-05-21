const userDetails_endpoint = 'http://localhost:3000/api/userDetails';
const getInfo = document.getElementById("getInfo");

getInfo.addEventListener("submit", async(e) => {
  e.preventDefault();
    try{
      //sessionStorage.setItem("username", document.getElementById("username").value);
      //sessionStorage.setItem("room", document.getElementById("room").value);
      const response = await fetch(userDetails_endpoint);
      console.log(userDetails_endpoint);

      const user_data = await response.json();
      console.log(user_data);

      window.location.href='http://localhost:3000/chat.html';
  }
    catch (error){  //handles all errors
      console.error('Error:', error);
  }
});


