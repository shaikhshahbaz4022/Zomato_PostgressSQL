const container = document.getElementById("append")

function DisplayData() {
    fetch(`https://zomato-backend-91qn.onrender.com/crud/get`)
        .then((res) => res.json())
        .then((data) => {
            fetchAndRender(data.data)
        })
        .catch((err) => console.log(err))
}
DisplayData()
function fetchAndRender(data) {

    container.innerHTML = ""
    data.forEach((ele) => {
        const div = document.createElement("div")
        div.classList.add("newdiv")
        let id = document.createElement("p")
        id.innerText = ` ID : ${ele.id}`
        let dishname = document.createElement('p')
        dishname.innerText = ` DISHNAME : ${ele.dishname}`
        let price = document.createElement('p')
        price.innerText = `PRICE : ${ele.price}`
        let available = document.createElement('p')
        available.innerText = `AVAILABLITY : ${ele.available}`
        let UPDATEele = document.createElement("button")
        UPDATEele.innerText = "UPDATE"
        UPDATEele.addEventListener("click", () => {
            fetch(`https://zomato-backend-91qn.onrender.com/crud/update`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id: ele.id })
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    DisplayData()
                })
                .catch((e) => console.log(e))
        })

        let Deleteele = document.createElement("button")
        Deleteele.innerText = "DELETE"
        Deleteele.addEventListener("click", () => {
            fetch(`https://zomato-backend-91qn.onrender.com/crud/delete`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id: ele.id })
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    DisplayData()
                })
                .catch((e) => console.log(e))
        })


        div.append(id, dishname, price, available, UPDATEele, Deleteele)
        container.append(div)

    });

}