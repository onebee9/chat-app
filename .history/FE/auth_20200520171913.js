const userDetails_endpoint = "http://localhost:3000/api/userDetails";
if (getInfo) {
  getInfo.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
        localStorage.setItem("username", document.getElementById("username").value);
        localStorage.setItem("room", document.getElementById("room").value);
  
        window.location.href = `${window.location.href}chat.html`;
        
    } catch (error) {
        console.error("Error:", error);
    }
   
  });
}
