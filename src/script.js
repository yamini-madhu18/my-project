document.getElementById("donorForm").onsubmit = async function(e) {

    e.preventDefault();

    let donor = {
        donorId: document.getElementById("donorId").value,
        name: document.getElementById("name").value,
        age: document.getElementById("age").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        blood: document.getElementById("blood").value,
        gender: document.getElementById("gender").value,
        date: document.getElementById("date").value
    };

    if (donor.age < 18) {
        alert("Age must be 18 or above");
        return;
    }

    let response = await fetch("/donor", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(donor)
    });

    let message = await response.text();

    alert(message);

    document.getElementById("donorForm").reset();
};


async function searchDonor() {

    let id = document.getElementById("searchId").value;

    let response = await fetch("/donor/" + id);

    let data = await response.text();

    document.getElementById("result").innerHTML = data;
}


async function deleteDonor() {

    let id = document.getElementById("deleteId").value;

    let response = await fetch("/donor/" + id, {
        method: "DELETE"
    });

    let data = await response.text();

    alert(data);
}