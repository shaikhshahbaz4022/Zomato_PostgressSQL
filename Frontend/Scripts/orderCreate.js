
let nameele = document.getElementById("name")
let foodname = document.getElementById("foodname")
let formele = document.querySelector("form")


formele.addEventListener("submit", (e) => {
    e.preventDefault()
    const obj = {

        foodname: foodname.value,
        name: nameele.value,
        status: "pending",
    }
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    }
    fetch(`https://zomato-backend-sql.onrender.com/order/create`, options)
        .then(res => res.json())
        .then((data) => {
            console.log(data);
            alert(data.data)
            window.location.href = "./allorders.html"
        })
        .catch(e => console.log(e))
})