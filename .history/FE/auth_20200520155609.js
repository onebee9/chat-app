const userDetails_endpoint = "http://localhost:3000/api/userDetails";
if (getInfo) {
  getInfo.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
        localStorage.setItem("username", document.getElementById("username").value);
        localStorage.setItem("room", document.getElementById("room").value);
      
      // const data = {
      //   username: document.getElementById("username").value,
      //   room: document.getElementById("room").value,
      // };
      // //creates an object to hold post data and add custom headers
      // const options = {
      //   method: "POST",
      //   headers: {
      //     "content-type": "application/json",
      //   },
      //   body: JSON.stringify(data),
      // };
      // const DataResponse = await fetch(userDetails_endpoint, options);
      // const user_data = await DataResponse.json();
      // //sessionStorage.setItem('username',DataResponse.);
      // console.log(user_data);
      window.location.href = `${window.location.href}chat.html`;
    } catch (error) {
        console.error("Error:", error);
    }
   
  });
}
