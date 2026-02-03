const $=s=>document.querySelector(s);

fetch('http://localhost:3000/profile').then(res => res.json()).then(data => {
    console.log(data)
})

$('#save').onsubmit=(e)=> {
    e.preventDefault();
    const login = $('#loginEmail').value
    const password = $('#loginPassword').value


    fetch('http://localhost:3000/add', {
        method: 'POST',
        body: JSON.stringify({login, password}),
        headers: {'Content-Type': 'application/json'},
    }).then(res => {
    console.table(res)
    })
}


$('#register').onsubmit = (e) => {
    e.preventDefault()

    const login = $('#regName').value
    const email = $('#regEmail').value
    const password = $('#regPassword').value
    const passwordEl = $('#regPassword2').value

    fetch('http://localhost:3000/register', {
        method: 'POST',
        body: JSON.stringify({
            login,
            email,
            password,
            passwordEl
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
}


