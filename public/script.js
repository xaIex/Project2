
function validateForms(){
    let valid = true;
    let input1 = document.getElementById("email").value;
    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if(!emailPattern.test(input1)){
        alert("Not a valid Email");
        document.getElementById("email").value = "";
        valid = false;
    }
    if(input1 == ""){
        window.alert("Not a valid email!");
        document.getElementById("email").value = "";
        valid = false;
    }
    let input2 = document.getElementById("pwd").value;
    let pwPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/; //regex
    if(!pwPattern.test(input2)){
        alert("Please use at least one upper and lower case, one digit and at least 6 characters long for your password");
        document.getElementById("pwd").value = ""; //clear field
        valid = false;
    }
 
    
    let input3 = document.getElementById("phone").value;
    let phonePattern = /^\d{10}$/; // at least 10 digits
    if(!phonePattern.test(input3)){
        alert("Invalid Phone number");
        document.getElementById("phone").value = "";
        valid = false;
    }
    
    let input4 = document.getElementById("zip").value;
    let zipPattern = /^\d{5}(?:-\d{4})?$/;
    if(!zipPattern.test(input4)){
        alert("Invalid Zipcode");
        document.getElementById("zip").value = "";
        valid = false;
    }
    return valid;
}

   /*
    let input2 = document.getElementById("pwd").value;
    if(isNaN(input2) || input2.length > 10 || input2.length < 1){
        alert("invalid pw");
        document.getElementById("pwd").value = "";
        return false;
    }
    */
/*
let email = document.getElementById("email").value;
let password = document.getElementById("pwd").value;
let phone = document.getElementById("phone").value;
let street = document.getElementById("street").value;
let zip = document.getElementById("zip").value;
let city = document.getElementById("city").value;

// Validate email
if (!email.trim() || !email.includes("@")) {
    alert("Please enter a valid email address.");
    console.log("test email");
    return false;
}

// Validate password
if (password.length < 6) {
    alert("Password must be at least 6 characters long.");
    console.log("testpw");
    return false;
}
console.log("validateforms")
return true;
*/
/*
let input1 = document.getElementById("email").value;
let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
if(!emailPattern.test(input1)){
    alert("Not a valid Email");
    document.getElementById("email").value = "";
    return false;
}
if(input1 == ""){
    window.alert("Not a valid email!");
    document.getElementById("email").value = "";
    return false;
}
let input2 = document.getElementById("pwd").value;
let pwPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/; //regex
if(!pwPattern.test(input2)){
    alert("Please use at least one upper and lower case, one digit and at least 6 characters long");
    document.getElementById("pwd").value = ""; //clear field
    return false;
}

let input2 = document.getElementById("pwd").value;
if(isNaN(input2) || input2.length > 10 || input2.length < 1){
    alert("invalid pw");
    document.getElementById("pwd").value = "";
    return false;
}


let input3 = document.getElementById("phone").value;
let phonePattern = /^\d{10}$/; // at least 10 digits
if(!phonePattern.test(input3)){
    alert("Invalid Phone number");
    document.getElementById("phone").value = "";
    return false;
}

let input4 = document.getElementById("zip").value;
let zipPattern = /^\d{5}(?:-\d{4})?$/;
if(!zipPattern.test(input4)){
    alert("Invalid Zipcode");
    document.getElementById("zip").value = "";
    return false;
}
return true;*/