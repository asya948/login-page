const $=s=>document.querySelector(s);

fetch('http://localhost:3000/').then(res => res.json()).then(data => {
    console.log(data)
})

$('#save').onclick = () => {
    let fildEl=$('#loginForm')

    fetch('http://localhost:3000/add', {
        method: 'POST',
        body: JSON.stringify({value:fildEl.value }),
        headers: {'Content-Type': 'application/json'},
    }).then(res => {
    console.log(res)
    })
}
