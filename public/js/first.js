const form = document.querySelector("form")
const inputValue = document.getElementById("input-text")
const messageOne = document.querySelector("#message-1")
const messageTwo = document.querySelector("#message-2")

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const inputLocation = inputValue.value
    // console.log(inputLocation)
    // if (inputLocation.length === 0) {
    //     return console.log({message: "Please provide a location"})
    // }
    messageOne.textContent = "Loading...";
    messageTwo.textContent = "";
    fetch(`http://127.0.0.1:5000/weather?address=${inputLocation}`).then((response) => {
        response.json().then((data) => {
            messageOne.textContent = data.location;
            messageTwo.textContent = data.message;
        })
    })
    
})