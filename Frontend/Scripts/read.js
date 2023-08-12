const container = document.getElementById("append")

function DisplayData() {
    fetch(`https://zomato-backend-sql.onrender.com/crud/get`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data.data);
            fetchAndRender(data.data)
        })
        .catch((err) => console.log(err))
}
DisplayData()
function fetchAndRender(data) {

    container.innerHTML = ""
    data.forEach((ele) => {
        console.log(ele.id);
        const div = document.createElement("div")
        div.classList.add("newdiv")

        let dishname = document.createElement('p')
        dishname.innerText = ` DISHNAME : ${ele.foodname}`
        let price = document.createElement('p')
        price.innerText = `PRICE : ${ele.price}`
        let available = document.createElement('p')
        available.innerText = `AVAILABLITY : ${ele.available}`
        let UPDATEele = document.createElement("button")
        UPDATEele.innerText = "UPDATE"
        UPDATEele.addEventListener("click", () => {

            fetch(`https://zomato-backend-sql.onrender.com/crud/update/${ele.id}`, {
                method: "PATCH",

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
        Deleteele.addEventListener("click", () => {
            fetch(`https://zomato-backend-sql.onrender.com/crud/delete/${ele.id}`, {
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