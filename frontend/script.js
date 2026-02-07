const $=s=>document.querySelector(s);
const $$=s=>document.querySelectorAll(s);


fetch('http://localhost:3000/users/profile',{ credentials: 'include' }).then(res=>res.json()).then(data=>{

if(data.message){
   console.log('login')
    return
}
   $('#guestArea').classList.add('d-none');
   $('#appArea').classList.remove('d-none');
console.log(data)
   if(data.newValue.role==='admin'){
       $('#adminTabBtn').classList.remove('d-none');

   }

})






$('#save').onclick=()=> {
    let regName = $('#regName')
    let regEmail = $('#regEmail')
    let regPassword = $('#regPassword')
    let regPassword2 = $('#regPassword2')
    let regIsAdmin = $('#regIsAdmin')
    if (!regName.value || !regEmail.value || !regPassword.value || !regPassword2.value
        || regPassword.value.length < 6 || regPassword.value !== regPassword2.value) {
        alert('sxal')
        return false
    }
fetch('http://localhost:3000/users/profile', {
    method: 'POST',
    headers: {'Content-Type': 'application/json',accept: 'application/json' },
    credentials: 'include',
    body: JSON.stringify({name:regName.value, email:regEmail.value, password:regPassword.value, isAdmin:regIsAdmin.checked})
}).then(res=>{
    if(res.ok){
        return res.json()
    }
    throw res.error
}).then(data=>{
    $('#guestArea').classList.add('d-none');
    $('#appArea').classList.remove('d-none');
})

}

$('#btnLogout').onclick=()=>{
    fetch('http://localhost:3000/users/logout', {
        credentials: 'include',
    }).then(res=>res.json()).then(data=>{
        console.log(data)
        $('#guestArea').classList.remove('d-none');
        $('#appArea').classList.add('d-none');
    })
}

$('#btnLogoutTop').onclick=()=>{
    fetch('http://localhost:3000/users/admin', {
        credentials: 'include',
    }).then(res=>res.json()).then(data=>{

        console.log(data)

    })
}

$('[data-tab="tabChangePass"]').onclick = () => {
    const oldPassword = $('#oldPassword').value
    const newPassword = $('#newPassword').value

    fetch('http://localhost:3000/users/change-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
            oldPassword,
            newPassword
        })
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)

           $$('.nav-link').forEach(el => {
                el.classList.remove('active')
            })

           $$('.nav-item').forEach(el => {
                el.classList.add('d-none')
            })
        })
}




// $('#tabChangePass').onclick=()=>{
//     fetch('http://localhost:3000/change', {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json',accept: 'application/json' },
//         credentials: 'include',
//     }).then(res=>res.json()).then(data=>{
//         console.log(data)
//         $('.nav-item').classList.remove('active');
//         $('.nav-link').classList.add('d-none');
//
//     })
// }


// $('[data-tab="tabChangePass"]').onclick = () => {
//     fetch('http://localhost:3000/users/changePassword', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json'
//         },
//         credentials: 'include',
//     })
//         .then(res => res.json())
//         .then(data => {
//             console.log(data)
//
//             document.querySelectorAll('.nav-link').forEach(el => {
//                 el.classList.remove('active')
//             })
//
//             document.querySelectorAll('.nav-item').forEach(el => {
//                 el.classList.add('d-none')
//             })
//         })
// }
