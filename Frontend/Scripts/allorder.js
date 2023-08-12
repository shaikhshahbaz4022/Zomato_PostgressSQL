const container = document.getElementById("append")

function DisplayData() {
    fetch(`https://zomato-backend-sql.onrender.com/order/get`)
        .then((res) => res.json())
        .then((data) => {
            fetchAndRender(data.data)
            console.log(data);
        })
        .catch((err) => console.log(err))
}
DisplayData()
function fetchAndRender(data) {

    container.innerHTML = ""
    data.forEach((ele) => {
        const div = document.createElement("div")
        div.classList.add("newdiv")

        let dishname = document.createElement('p')
        dishname.innerText = `CUSTOMER_NAME: ${ele.name}`
        let price = document.createElement('p')
        price.innerText = `DISHNAME : ${ele.foodname}`
        let available = document.createElement('p')
        available.innerText = `AVAILABLITY : ${ele.status}`
        let UPDATEele = document.createElement("select")
        UPDATEele.classList.add("selecttag")

        let option12 = document.createElement("option")
        option12.innerText = "Select Status"
        let option1 = document.createElement("option")
        option1.innerText = "Pending"
        option1.value = "pending"
        let option2 = document.createElement("option")
        option2.innerText = "delivered"
        option2.value = "delivered"
        let option3 = document.createElement("option")
        option3.innerText = "pickup"
        option3.value = "pickup"
        let option4 = document.createElement("option")
        option4.innerText = "recieved"
        option4.value = "recieved"

        UPDATEele.append(option12, option1, option2, option3, option4)
        UPDATEele.addEventListener("change", () => {
            fetch(`https://zomato-backend-sql.onrender.com/order/update/${ele.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ status: UPDATEele.value })
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    DisplayData()
                    alert(data.msg)
                })
                .catch((e) => console.log(e))
        })

        let Deleteele = document.createElement("button")
        Deleteele.innerText = "DELETE"
        Deleteele.classList.add("delete-button")
        Deleteele.addEventListener("click", () => {
            fetch(`https://zomato-backend-sql.onrender.com/order/delete/${ele.id}`, {
                method: "DELETE",

            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    DisplayData()
                    alert(data.msg)
                })
                .catch((e) => console.log(e))
        })


        div.append(dishname, price, available, UPDATEele, Deleteele)
        container.append(div)

    });

}

