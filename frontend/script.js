const $=s=>document.querySelector(s);
fetch('http://localhost:3000/profile').then(res=>res.json()).then(data=>{
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
fetch('http://localhost:3000/register', {
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
    fetch('http://localhost:3000/logout', {
        credentials: 'include',
    }).then(res=>res.json()).then(data=>{
        console.log(data)
        $('#guestArea').classList.remove('d-none');
        $('#appArea').classList.add('d-none');
    })
}





