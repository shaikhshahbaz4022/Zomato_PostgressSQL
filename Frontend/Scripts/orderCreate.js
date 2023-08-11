let ids = document.getElementById("id")
let nameele = document.getElementById("name")
let foodname = document.getElementById("foodname")
let formele = document.querySelector("form")


formele.addEventListener("submit", (e) => {
    e.preventDefault()
    const obj = {
        id: ids.value,
        name: nameele.value,
        foodname: foodname.value,
        status: "pending",
    }
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    }
    fetch(`https://zomato-backend-91qn.onrender.com/order/createorder`, options)
        .then(res => res.json())
        .then((data) => {
            console.log(data);
            alert(data.msg)
            window.location.href = "./allorders.html"
        })
        .catch(e => console.log(e))
})