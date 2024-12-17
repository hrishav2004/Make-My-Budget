const ip1=document.querySelector("#ip1")
const ip2=document.querySelector("#ip2")
const AddBut=document.querySelector('#AddBut')

//adds a new expense to the list
const addExpense = (expense)=>{
    const newDiv=document.createElement("div")
    const box2=document.querySelector(".box2")
    newDiv.className="exp"
    newDiv.innerText=`${expense.expName.toUpperCase()} - Rs ${expense.expAmt}`
    const button=document.createElement("button")
    button.innerText="Delete"
    newDiv.appendChild(button)
    newDiv.id=`${expense.id}_wholeDiv`
    button.className="delBut"
    button.id=`${expense.id}`
    box2.appendChild(newDiv)
}

//deletes an expense from the existing list
const deleteExpense = (delId)=>{
    const delDiv=document.getElementById(`${delId}_wholeDiv`)
    const arrLength=expense.length
    for(let i=0; i<arrLength; i++){                 //this loop is to find the array element which is to be deleted
        if(expense[i].id==delId){
            sum=Number(sum)-Number(expense[i].expAmt)
            expense.splice(i, 1)
            break;
        }
    }
    localStorage.setItem("expKey", JSON.stringify(expense))
    delDiv.remove()
    document.querySelector("#totExp").innerText=`${sum}`
}

let expense=[]
let sum=0

if(localStorage.getItem("expKey")!==null){
    expense=JSON.parse(localStorage.getItem("expKey"))
    expense.forEach(num => {
        addExpense(num)
        sum=Number(sum)+Number(num.expAmt)
    });
    document.querySelector("#totExp").innerText=`${sum}`
}

//this part executes when the 'Add Expense' button is clicked
AddBut.addEventListener("click", ()=>{
    if(ip1.value===""){
        alert("Please enter the expense name")  //if the input 1 is left blank
    }
    else if(ip2.value===""){
        alert("Please enter the amount of the expense")     //if the input 2 is left blank
    }
    else if(ip2.value<0){
        alert("An expense cannot be negative!")         //if the input 2 is a negative number
    }
    else{
        let currExpense={
            id: Date.now(),
            expName: ip1.value,
            expAmt: ip2.value
        }
        expense.push(currExpense)
        localStorage.setItem("expKey", JSON.stringify(expense))
        ip1.value=""
        ip2.value=""
        addExpense(currExpense)
        sum=Number(sum)+Number(currExpense.expAmt)
        const totExp=document.querySelector("#totExp")          //the total expense is updated dynamically
        totExp.innerText=`${sum}`
        document.getElementById(`${currExpense.id}`).addEventListener("click", ()=>{
            deleteExpense(`${currExpense.id}`)
        })
    }
})

expense.forEach((num)=>{
    document.getElementById(`${num.id}`).addEventListener("click", ()=>{
        deleteExpense(`${num.id}`)
    })
})