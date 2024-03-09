const BASE_URL ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
  const dropdown = document.querySelectorAll(".dropdown select");

const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");

for (let select of dropdown)
{
     for(currCode in countryList)
     {
         let newOpt = document.createElement("option");
         newOpt.innerText = currCode;  
         if(select.name === "from" && currCode === "USD")
         newOpt.selected = "selected";
        else if(select.name ==="to" && currCode == "INR")
        newOpt.selected = "selected"; // dont use select.selected this is becasue it select the whole select tag not individual while newOpt select indvidual 
    
    select.append(newOpt); 
}

select.addEventListener("change" , (evt)=>{
    updateFlag(evt.target);
})
}



const updateFlag = (element)=>
{
    let ccode = element.value;  
    let countrycode = countryList[ccode];
    let newSrc = `https://flagsapi.com/${countrycode}/shiny/64.png`;
    console.log(countrycode);
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
    // update rate also
    let a = get_am();
    cal(a);
}


let submit_btn = document.querySelector("#submit");

submit_btn.addEventListener("click" , async(evt)=>
{
    evt.preventDefault();
    let a = get_am();
    cal(a);
}
);

function get_am()
{
    let amount = document.querySelector("form input");
    console.log(amount.value);
    if(amount.value ==="" || amount.value <1)
    amount.value = 1;
    return amount.value;
}

async function cal(am)
{
    const URL = `https://api.exchangerate-api.com/v4/latest/${fromcurr.value}`;
    let response = await fetch(URL);
    let jresponse = await response.json();
    // console.log(jresponse); /* ye dekh skty hain aghr koi issue hai neechy conversion ma*/
    let rates = jresponse.rates[`${tocurr.value}`];
    
    let  result = rates*am ;
    console.log(result);
    
    let total = document.querySelector("#Total");
    total.innerText =` ${result } ${tocurr.value}`;
}
    
    
    