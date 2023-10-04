function removeToDo(event){
    const article = event.target.parentElement;
    article.remove();
}

function onSubmit(event) {
    event.preventDefault(); //zorgt ervoor dat pagina niet refresht als het form wordt ingediend
    const input = document.querySelector("[name=todo]"); //attribute selector
    const value = input.value;
    const articles = document.querySelector(".articles");

    if(!value) return window.alert("Please enter a value first."); //bij oneliner if zijn accolades niet nodig

    const todo = `
    <article class="todo">
    <input type="checkbox" name="" id="">
    <label for="">${value}</label>
    <button onclick="removeToDo(event)">❌</button>
    </article>`; 

    articles.innerHTML += todo;
    console.log(value);
}

window.addEventListener('load', function() //zorgt ervoor dat JS pas begint te laden als HTML loaded is
{
    const form = document.querySelector("form");
    form.addEventListener("submit", onSubmit);
})