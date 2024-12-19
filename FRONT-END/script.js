
var fillingFoods = []
var nameFoods = ["Tapioca","Cuscuz","Sanduiche"]
var fillingCart = {}
var valueBaseFood = 0
var totalValue = 0
var historyRequest = []
var description = ""
var modal = document.getElementById("myModal")
var openModalButton = document.getElementById("openModalButton")
var closeModalButton = document.querySelector(".closeButton")

async function getFoods(id) {
  var response = await fetch(`http://localhost:8080/food?id=` + id)
  var data = await response.json()

  valueBaseFood = parseFloat(data.value)
  fillingFoods = data.filling

  imgFood(id)
  fillingCart = {}
  showCartItem(fillingCart, id)

  var fillings = document.querySelector(".fillings")
  fillings.innerHTML = "<h2>Escolha um recheio:</h2>"

  for (let filling of fillingFoods) {
      var labelRecheio = document.createElement("div")
      labelRecheio.classList.add("optionFilling")

      labelRecheio.innerHTML = `
      <input type="checkbox" id="${filling.name}" name="filling" value="${filling.name}, ${filling.value}" onchange="cartItem(this.value,${id})">
      <label for="${filling.name}">${filling.name} - R$${filling.value}</label>`

      fillings.appendChild(labelRecheio)
  }
}

function cartItem(cartFilling, id) {
  var checkbox = event.target
  var [name, value] = cartFilling.split(",")

  if (checkbox.checked) {
      fillingCart[name] = parseFloat(value)
  } else {
      delete fillingCart[name]
  }

  showCartItem(fillingCart, id)
}


function showCartItem(fillingCart, id) {
    var itemCart = document.querySelector(".cartItem")
    itemCart.innerHTML = ""

    totalValue = valueBaseFood

    var foodBase = document.createElement("h3")
    foodBase.innerHTML = `${nameFoods[id - 1]} - R$ ${valueBaseFood.toFixed(2)}`
    itemCart.appendChild(foodBase);

    description = nameFoods[id - 1] + "; "

    for (let name in fillingCart) {
        var itemFilling = document.createElement("p")
        totalValue += fillingCart[name]
        itemFilling.innerHTML = `${name} - R$ ${fillingCart[name].toFixed(2)}`
        itemCart.appendChild(itemFilling)
    }

    var totalElement = document.getElementById("total");
    totalElement.textContent = `Total: R$ ${totalValue.toFixed(2)}`;
}

function imgFood(id){
  var imgMain = document.querySelector(".imgFood")
  imgMain.innerHTML = ""

  var imgGetFood = document.createElement("img")

  switch (id) {
    case "1":
      imgGetFood.setAttribute("src", "https://i0.wp.com/chefparttime.com/wp-content/uploads/2020/11/food-africa-6.jpg?resize=640%2C960&ssl=1")
      imgGetFood.setAttribute("alt", "Tapioca")
      break

    case "2":
      imgGetFood.setAttribute("src", "https://alloydeliveryimages.s3.sa-east-1.amazonaws.com/item_images/3812/66194ac08de9db23vf.webp")
      imgGetFood.setAttribute("alt", "Cuscuz")
      break

    case "3":
      imgGetFood.setAttribute("src", "https://i.pinimg.com/originals/e5/c3/5e/e5c35e716e592e7986d160436127160d.jpg")
      imgGetFood.setAttribute("alt", "Sanduiche")
      break;

    default:
      console.error("ID inválido!")
      return;
  }

  imgMain.appendChild(imgGetFood);

}


function openModal() {
  document.getElementById("myModal").style.display = "block"
  getHistory() 
}


function closeModal() {
  document.getElementById("myModal").style.display = "none"
  document.querySelector("#historyTable tbody").innerHTML = ""
}


async function getHistory() {
  var cpf = document.getElementById("cpf").value.trim()
  var tableBody = document.querySelector("#historyTable tbody")

  if (!cpf) {
    alert("Por favor, digite um CPF para buscar o histórico.")
    return
  }

  
    var response = await fetch(`http://localhost:8080/history?cpf=${cpf}`)
    var historyData = await response.json()

    if (historyData.length == 0) {
      tableBody.innerHTML = "<tr><td colspan='3'>Nenhum histórico encontrado.</td></tr>"
      return
    }

    let historyFood = ""
    historyData.forEach((sale) => {
      historyFood += `
        <tr>
          <td>${sale.cpf}</td>
          <td>${sale.description}</td>
          <td>R$ ${sale.value}</td>
        </tr>
      `
    })

    tableBody.innerHTML = historyFood

}

function makePayment() {
  var cpf = document.getElementById("cpf").value.trim();
  if (!cpf) {
      alert("Por favor, digite seu CPF para finalizar o pedido.");
      return;
  }

  var idFood = getSelectedFoodId();
  var description = getDescription();
  var value = totalValue.toFixed(2);

  var url = `http://localhost:8080/payment?idFood=${idFood}&cpf=${cpf}&description=${description}&value=${value}`;

  fetch(url, { method: "GET" }).then(response => response.text()).then(result => {
          alert(result);
          clearCart();
          totalValue = 0;
      })
}

function getSelectedFoodId() {
  var selectedFood = document.querySelector('input[name="food"]:checked')
  return selectedFood ? selectedFood.value : 0
}


function getDescription() {
  var cartItems = document.querySelectorAll(".cartItem p")
  

  cartItems.forEach((item) => {
    description += item.textContent + "; "
  })

  return description.trim()
}


function clearCart() {
  document.querySelector(".cartItem").innerHTML = ""
  document.getElementById("total").textContent = "R$ 0.00"
}