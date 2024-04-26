
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

