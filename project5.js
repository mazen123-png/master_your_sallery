let name = document.getElementById('name')
let money = document.getElementById('money')
let count = document.getElementById('count');
let submit = document.getElementById('submit');
let mood = 'create';
let temp;
let newProduct;
let newMoney;
let substract;
let listMoney;
let total = document.getElementById('total')
let beforeUpdate;
let afterUpdate;

// get totalSallery
if(localStorage.product3 == 'undefined'){
    listMoney = []
}
else if (localStorage.product3 != null){
    listMoney = JSON.parse(localStorage.product3); 
}else {
    listMoney = []
}

let result;
if(localStorage.product2 == 'undefined'){
    result = 0
}
else if (localStorage.product2 != null){
    result = JSON.parse(localStorage.product2); 
}else {
    result = 0
}
//creat product
let dataPro;
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product)
} else {
    dataPro = [];
}

submit.addEventListener('click',  function () {
    let newPro = {
        name: name.value.toLowerCase(),
        money: money.value,
        count: count.value,
        result:result += +money.value,
        total: result,
    };
    
    if (mood == 'create') {
        if (newPro.count > 1) {
            for (let i = 0; i < newPro.count; i++) {
                dataPro.push(newPro);
            }
        } else {
            dataPro.push(newPro);
        }
    } else {
        dataPro[temp] = newPro;
        mood = 'create';
        submit.innerHTML = 'Create';
        count.style.display = 'block'
        afterUpdate = money.value
        if(listMoney.length >0){
            listMoney.unshift(newMoney)
        }else{
            listMoney.push(newMoney)
        }
        if(beforeUpdate < afterUpdate){
            result -= +beforeUpdate
            result += +afterUpdate
            newProduct -= +beforeUpdate
            newProduct += +afterUpdate
            console.log(beforeUpdate)
            result = newProduct
            localStorage.product = JSON.stringify(dataPro)   
            localStorage.product2 = JSON.stringify(newProduct)
            localStorage.product3 = JSON.stringify(listMoney)
            
        }
    }
    newProduct = newPro.result
    newMoney = newPro.money
    if (mood == 'create'){
        listMoney.push(newMoney)
    }
    
    localStorage.setItem('product', JSON.stringify(dataPro));
    localStorage.setItem('product2',JSON.stringify (newProduct))
    localStorage.setItem('product3', JSON.stringify( listMoney))
    clearData();
    showData();
})
//clear inputs
function clearData() {
    name.value = '';
    money.value = '';
    count.value = '';
};
// update
//read

function showData() {
    
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        
        table += `
            <tr>
            <td>${i}</td>
            <td>${dataPro[i].name}</td>
            <td>${dataPro[i].money}</td>
            <td>${result}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(  ${i}  )" id="delete">delete</button></td>
            
        `;
    };
    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll')
    
    if (dataPro.length > 0) {
        btnDelete.innerHTML = `
        <button onclick="deleteAll()">delete All (${dataPro.length})</button>
        `
        
    } else {
        btnDelete.innerHTML = ''; 
    }
    
};

showData()
//delete
function deleteData(i) {
    substract = listMoney[i]
    result -= substract
    dataPro.splice(i, 1)
    newProduct -= substract
    listMoney.splice(i,1)
    if(dataPro.length < 1){
        result = 0
    }
    
    localStorage.product = JSON.stringify(dataPro)   
    localStorage.product2 = JSON.stringify(newProduct)
    localStorage.product3 = JSON.stringify(listMoney)
    
    showData()
}


function deleteAll() {
    localStorage.clear();
    dataPro.splice(0);
    result = 0
    
    listMoney = []
    showData()
}
//update
function updateData(i) {
    name.value = dataPro[i].name;
    money.value = dataPro[i].money;
    beforeUpdate = money.value = dataPro[i].money;
    newProduct -= beforeUpdate
    count.style.display = 'none';
    listMoney.splice(i,1)
    submit.innerHTML = 'Update';
    mood = 'update';
    temp = i;
    scroll({
        top: 0,
        behavior: 'smooth',
    })
    localStorage.product3 = JSON.stringify(listMoney)
    localStorage.product2 = JSON.stringify(newProduct)
}
//search
let searchMood = 'name';
function getSearchMood(id) {
    let search = document.getElementById('search')
    if (id == 'searchName') {
        searchMood = 'name';
        search.placeholder = 'search by Name';
    } else {
        searchMood = 'money';
        search.placeholder = 'search by sallery';
    }
    search.focus()
}

function searchData(value) {
    let table = '';
    if (searchMood == 'name') {

        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].name.includes(value.toLowerCase())) {
                table += `
            <tr>
                <td>${i}</td>
                <td>${dataPro[i].name}</td>
                <td>${dataPro[i].money}</td>
                <td>${result}</td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(  ${i}  )" id="delete">delete</button></td>
            </tr>
                `;
            }


        }
    }

    else {
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].money.includes(value)) {
                table += `
            <tr>
                <td>${i}</td>
                <td>${dataPro[i].name}</td>
                <td>${dataPro[i].money}</td>         
                <td>${result}</td>    
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(  ${i}  )" id="delete">delete</button></td>
            </tr>
                `;
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}




