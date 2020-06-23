const categorySelect = document.getElementById('strCategory');
const areaSelect = document.getElementById('strArea');
const ingredientSelect = document.getElementById('strIngredient');
const filterSelects = [categorySelect, areaSelect, ingredientSelect];
const searchUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?';
const resultContainer = document.getElementById('result-container');

const urls = ["https://www.themealdb.com/api/json/v1/1/list.php?c=list",
    "https://www.themealdb.com/api/json/v1/1/list.php?a=list",
    "https://www.themealdb.com/api/json/v1/1/list.php?i=list"];


async function getFilterFields() {
    let res = urls.map(item => fetch(item));
    let responses = await Promise.all(res);
    let results = await Promise.all(responses.map(r => r.json()));
    results.forEach((item, index) => fillSelect(item, index))
}

getFilterFields();

function fillSelect(obj, elIndex) {
    let element = filterSelects[elIndex];
    element.onchange = filterChange;
    let list = obj.meals;
    list.forEach(function (item) {
        let opt = document.createElement('option');
        opt.appendChild(document.createTextNode(item[element.id]));
        opt.value = item[element.id];
        element.appendChild(opt);
    })
}

function filterChange() {
    resultContainer.innerHTML = '';
    let arr = [];
    if (categorySelect.value) {
        arr.push('c=' + categorySelect.value);
    }
    if (areaSelect.value) {
        arr.push('a=' + areaSelect.value);
    }
    if (ingredientSelect.value) {
        arr.push('i=' + ingredientSelect.value);
    }
    let urlParams = arr.join('&');
    let mainDiv = document.getElementsByClassName('main')[0];
    if (arr.length) {
        resultContainer.classList.add('result-padding');
        search(searchUrl + urlParams);
        mainDiv.style.height = 'auto';
    } else {
        resultContainer.classList.remove('result-padding');
        mainDiv.style.height = '100vh';
    }


}

async function search(url) {
    let response = await fetch(url);
    let data = await response.json();
    resultContainer.innerHTML = '';
    resultContainer.classList.add('result-padding');
    window.scrollTo(0, 500);

    if (data && data.meals) {
        data.meals.forEach(item => showResult(item));
    } else {
        let h1 = document.createElement('h1');
        h1.innerText = 'Oops, no result!';
        h1.classList.add('text-center', 'pb-4');
        document.getElementById('results').appendChild(h1)
    }


}

function showResult(item) {

    let div = document.createElement('div');
    div.id = item.idMeal;
    div.classList.add('food', 'd-flex');
    let innerDiv = document.createElement('div');
    innerDiv.classList.add('img-wrapper');
    let img = document.createElement('img');
    img.src = item.strMealThumb;
    img.className = 'img-fluid';
    innerDiv.appendChild(img);
    let title = document.createElement('h5');
    title.innerText = item.strMeal;
    title.classList.add('mt-2', 'food-title');
    div.appendChild(innerDiv);
    div.appendChild(title);
    resultContainer.appendChild(div);
    console.log(item);
    div.addEventListener('click',()=>getSingle(item.idMeal));
}
function getSingle(id) {
    window.open('./single.html?id='+id);

}