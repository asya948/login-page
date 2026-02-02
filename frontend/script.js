const $=s=>document.querySelector(s);

fetch('http://localhost:3000/profile').then(res => res.json()).then(data => {
    console.log(data)
})

$('#save').onclick = () => {
    const login = $('#login').value
    const password = $('#password').value


    fetch('http://localhost:3000/add', {
        method: 'POST',
        body: JSON.stringify({login, password}),
        headers: {'Content-Type': 'application/json'},
    }).then(res => {
    console.table(res)
    })
}
$('#register').onclick = () => {
    const login = $('#login').value
    const email = $('#email').value
    const password = $('#password').value


    fetch('http://localhost:3000/register', {
        method: 'POST',
        body: JSON.stringify({login, email, password }),
        headers: {'Content-Type': 'application/json'},
    }).then(res => {
    console.table(res)
    })
}
