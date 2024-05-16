let search=document.querySelector('.search');
let icon=document.querySelector('.icon');
let container=document.querySelector('.container');
let wholeDetail=document.querySelector('.whole_detail');
let ingredients=document.querySelector('.ingredients');
let instuction=document.querySelector('.instuction');
let cancel=document.querySelector('.cancel');



let recipe= async (ele)=>{
    const data=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${ele}`);
    const response=await data.json();

    console.log(response)
   response.meals.forEach((meal) => {
    const card=document.createElement('div');
    card.classList.add('detail');

    card.innerHTML=`
    <img class="photo" src='${meal.strMealThumb}'>
    <h1 class="name">${meal.strMeal}</h1>
    <h3 class="area">${meal.strArea}</h3>
    <h3 class="area"> ${meal.strCategory} Categories</h3>
    <button class="btn">Recipe</button>`;
    container.appendChild(card);


    let btn  = document.querySelectorAll(".btn")
    btn.forEach((ele)=>{
        ele.addEventListener('click',()=>{
            procedure(meal);
            ProcessingInstruction(meal);
        })
    })
        
    });
}  

icon.addEventListener("click",()=>{
    let ele=search.value.trim();
    search.value="";

    if(ele!="")
    recipe(ele);
})

let procedure=(meal)=>{
    wholeDetail.style.display='block';

    for(let i=1;i<=20;i++){
        const ingredientName=meal[`strIngredient${i}`];

        if(ingredientName){
            const measure=meal[`strMeasure${i}`];
            const ingredientsList=document.createElement('h3');
            ingredientsList.classList.add('sub')
            ingredientsList.innerHTML=`${ingredientName} - ${measure}`
            ingredients.appendChild(ingredientsList)
        }
        else
        break;
    }
}

let ProcessingInstruction=(meal)=>{
    const instructionDetails=document.createElement('div');
    instructionDetails.classList.add('way');

    const inst=meal['strInstructions']

    instructionDetails.innerHTML=`
    <h1 class="heading"> Instruction</h1>;
    ${inst}`;

    ingredients.appendChild(instructionDetails);
}

cancel.addEventListener('click',()=>{
    wholeDetail.style.display='none';
})


const start=["rice","cake","meat","cheese","milk","chicken","milk"];

const display=()=>{
    let num=(Math.floor(Math.random()*7));

    let ele=start[num];

    recipe(`${ele}`);
}

display();