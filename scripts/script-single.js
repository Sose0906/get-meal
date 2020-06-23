let url = new URL(window.location.href);
let id = url.searchParams.get("id");


async function getMeal(id) {
    let response = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id);
    let result = await response.json();
    let meal = result.meals[0];
    showMeal(meal);

}



function showMeal(meal) {
    console.log(meal);
    let div = document.getElementById('titles-div');
    let title = document.createElement('h1');
    title.innerText = meal.strMeal;
    let category = document.createElement('p');
    category.innerText = 'Category:' + meal.strCategory;
    category.classList.add('pt-3', 'mb-0');
    let area = document.createElement('p');
    area.innerText = 'Area:' + meal.strArea;
    div.appendChild(title);
    div.appendChild(category);
    div.appendChild(area);

    // [title,category,area].map(div.appendChild)

    let containerDiv = document.getElementById('container-div');
    let ingDiv = document.getElementById('ing-div');
    let methodDiv = document.getElementById('method-div');
    let img = document.getElementById('thumb');
    img.src = meal.strMealThumb;

    let ul = document.createElement('ul');
    ul.className = 'ingredients';

    for (let key in meal) {
        if (key.startsWith('strIngredient')) {
            if (meal[key]) {
                let num = key.slice(-1);
                if (meal['strMeasure' + num]) {
                    let li = document.createElement('li');
                    li.innerText = meal[key] + ' ' + meal['strMeasure' + num];
                    ul.appendChild(li);
                }
            }
        }
    }
    ingDiv.appendChild(ul);
    let method  = document.getElementById('method-div');
    method.innerText = meal.strInstructions;



}

getMeal(id);