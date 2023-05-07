//This Const tableBody will store the formBody ticket info 
const tableBody = document.getElementsByClassName("formBody")[0];

//Global variable of JSON data set in fetch response of insert data into JSON api
let tableID = '';

//selecting content from html form tag and put it in form
const form = document.querySelector('form');

//listen to submit button inside of my form at html and it doesn't allow to any js default to take place
form.addEventListener('submit', (event) => {
    event.preventDefault();

    // all my input html tags with the value entered

    const show = {
        showName: document.querySelector('#showName').value,
        theaterName: document.querySelector('#theaterName').value,
        date: document.querySelector('#date').value,
        time: document.querySelector('#time').value,
        address: document.querySelector('#address').value,
        ticketQuantity: document.querySelector('#ticketQuantity').value,
        price: document.querySelector('#price').value
    }; console.log(show);

    //Insert data into JSON api

    fetch('https://6439b5f790cd4ba563ec9f3f.mockapi.io/Shows', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(show)

    })
        .then(response => response.json())
        .then(data => {

            console.log(JSON.stringify(show));
            getShows();
        });

});

//All IDs are changed to tableID

//listen to the delete button click in the table row

document.querySelector('table').addEventListener('click', function (event) {

    if (event.target.classList.contains('delete-btn')) {
        //validate if you want to delete from api and website

        alert("Are you sure you want to delete");
        //call deleteShow function

        deleteShow($(event.target).data("id"));

        //delete the target that is the table row
        event.target.closest('tr').remove();
    }
});



// delete a specific show based on delete button id

function deleteShow(tableID) {

    fetch(`https://6439b5f790cd4ba563ec9f3f.mockapi.io/Shows/` + tableID, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            location.reload(); // Refresh the page after deleting
        })
        .catch(error => console.error(error));
}

function getShows() {

    fetch(`https://6439b5f790cd4ba563ec9f3f.mockapi.io/Shows/`, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(d => {
            tableBody.innerHTML = ""
            d.forEach(data => {
                const tr = document.createElement('tr');
                // tableID = data.id //New Global const for table ID

                //I added below in <td> tags contenteditable='true' to make 
                //table data cell information editable for update


                tr.innerHTML = `
    
            <td contenteditable='true' id="tableShowName-${data.id}">${data.showName}</td>
            <td contenteditable='true' id="tableTheaterName-${data.id}">${data.theaterName}</td>
            <td contenteditable='true' id="tableDate-${data.id}">${data.date}</td>
            <td contenteditable='true' id="tableTime-${data.id}">${data.time}</td>
            <td contenteditable='true' id="tableAddress-${data.id}">${data.address}</td>
            <td contenteditable='true' id="tableQuantity-${data.id}">${data.ticketQuantity}</td>
            <td contenteditable='true' id="tablePrice-${data.id}">${data.price}</td>
            <td>
             
              <button class="btn btn-danger delete-btn" data-id="${data.id}" value="${data.id}">Delete</button>
            </td>
            <td>
            <button class="btn btn-success update-btn" data-id="${data.id}">Update</button>
            </td>
          `;
                tableBody.appendChild(tr);
            })
        })
        .catch(error => console.error(error));
}

//listener event for update button click in the table row 

document.querySelector('table').addEventListener('click', function (event) {
    if (event.target.classList.contains('update-btn')) {

        //console.log(document.getElementById('tableShowName').innerText,) 
        const id = $(event.target).data("id")
        const tableData = {
            showName: document.getElementById('tableShowName-' + id).innerText,
            theaterName: document.getElementById('tableTheaterName-' + id).innerText,
            date: document.getElementById('tableDate-' + id).innerText,
            time: document.getElementById('tableTime-' + id).innerText,
            address: document.getElementById('tableAddress-' + id).innerText,
            ticketQuantity: document.getElementById('tableQuantity-' + id).innerText,
            price: document.querySelector('#tablePrice-' + id).value
        };

        //validate if you want to update 
        alert("Are you sure you want to update");

        //call updateShow function 
        updateShow(id, tableData);


        // event.target.closest('tr').remove(); 
    }
});

//Update Show fucnction 

function updateShow(tableID, tableData) {
    fetch(`https://6439b5f790cd4ba563ec9f3f.mockapi.io/Shows/` + tableID, {
        method: 'PUT',

        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(tableData)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            location.reload(); // Refresh the page after update 
        })
        .catch(error => console.error(error));
}


getShows();