let title =document.getElementById('title');
let price =document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads =document.getElementById('ads');
let discount =document.getElementById('discount');
let total =document.getElementById('total');
let count =document.getElementById('count');
let category =document.getElementById('category');
let submit =document.getElementById('submit');

let mood='create';
// glople for index
let tmp;

// test
// console.log(title,price,taxes,ads,discount,total,count,category,submit)



// get total
function getTotal(){
  if(price.value!=''){
    let result=(+price.value+ +taxes.value+ +ads.value)- +discount.value;
    total.innerHTML=result;
    total.style.background='green';
  } 
  else{
    total.innerHTML='';
    total.style.background='#a00d02';
  }
}







// create product
// when relaod old data will added new data
let dataPro;
if(localStorage.product !=null){
    dataPro=JSON.parse(localStorage.product);
}
else{
    dataPro=[];
}


submit.onclick=function(){
    let newPro={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    // count code and update create mood

    if(title.value !=''&&price.value !=''&&category!=''&&newPro.count<100){

        if(mood==='create'){
    
            if (newPro.count>0){
                for(let i=0;i<newPro.count;i++){
                    dataPro.push(newPro);
                }
            }else{
                dataPro.push(newPro);
                
            }
        }
        else{
            dataPro[tmp]=newPro;
            mood='create';
            submit.innerHTML='Create';
            count.style.display='block';
        }
        clearData();
    }
   
    // save data local stoarge
    localStorage.setItem('product',JSON.stringify(dataPro))
    
    showData();

}

// clear inputs
function clearData(){
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    total.innerHTML='';
    discount.value='';
    count.value='';
    category.value='';

}
// read
function showData(){
    getTotal();
    let table='';
     dataPro.forEach((e,i) =>{
       
        table +=`


            <tr>
                <td>${i+1}</td>
                <td>${e.title}</td>
                <td>${e.price}</td>
                <td>${e.taxes}</td>
                <td>${e.ads}</td>
                <td>${e.discount}</td>
                <td>${e.total}</td>
                <td>${e.category}</td>
                <td><button onclick="updateData(${i})"id="update">update</button></td>
                <td><button onclick="deleteDate(${i})" id="delete">delete</button></td>
                </tr>
    
        
        
        
        `
      
        
    });
    document.getElementById('t-body').innerHTML=table;
    let btnDelete=document.getElementById('deleteAll');
    if(dataPro.length>0){

        btnDelete.innerHTML=`
        <button onclick="deleteAll()">Delete All (${dataPro.length})</button>
        `
    }
    else{
        btnDelete.innerHTML='';
    }
}
showData();

// delete
function deleteDate(i){
    dataPro.splice(i,1);
    localStorage.product=JSON.stringify(dataPro);
    showData();

}
function deleteAll(){
    localStorage.clear();
    dataPro.splice(0);
    showData();
}


// update
function updateData(i){
    title.value=dataPro[i].title;
    price.value=dataPro[i].price;
    taxes.value=dataPro[i].taxes;
    ads.value=dataPro[i].ads;
    getTotal();
    discount.value=dataPro[i].discount;
    count.style.display='none';
    category.value=dataPro[i].category;
    submit.innerHTML="Update";
    mood='update';
    tmp=i;
    scroll({
        top:0,
        behavior:"smooth"
    })
    

}

// search
let searchMood='title';
function getSearchMood(id){

    let search=document.getElementById('search');
    if(id=='searchTitle'){
        searchMood='title';
        search.placeholder='seaech By Title'

    }else
    {
        searchMood='category';
        search.placeholder='Seaech By Category'

    }
    search.focus();
    search.value='';
    showData();    
}
function searchData(value){
    let table='';
    dataPro.forEach((e,i) =>{
        if(searchMood=='title'){
            if(e.title.includes(value.toLowerCase())){
    
                table +=`
        
        
                    <tr>
                        <td>${i+1}</td>
                        <td>${e.title}</td>
                        <td>${e.price}</td>
                        <td>${e.taxes}</td>
                        <td>${e.ads}</td>
                        <td>${e.discount}</td>
                        <td>${e.total}</td>
                        <td>${e.category}</td>
                        <td><button onclick="updateData(${i})"id="update">update</button></td>
                        <td><button onclick="deleteDate(${i})" id="delete">delete</button></td>
                        </tr>
                        
                        `
               
           } 
       
    }
    
    else{
    
        
            if(e.category.includes(value.toLowerCase())){
    
                table +=`
        
        
                    <tr>
                        <td>${i+1}</td>
                        <td>${e.title}</td>
                        <td>${e.price}</td>
                        <td>${e.taxes}</td>
                        <td>${e.ads}</td>
                        <td>${e.discount}</td>
                        <td>${e.total}</td>
                        <td>${e.category}</td>
                        <td><button onclick="updateData(${i})"id="update">update</button></td>
                        <td><button onclick="deleteDate(${i})" id="delete">delete</button></td>
                        </tr>
                        
                        `
               
           } 
      
       
    
    }
    });
    
document.getElementById('t-body').innerHTML=table;
}



