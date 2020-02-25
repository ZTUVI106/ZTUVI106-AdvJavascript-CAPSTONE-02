// .............................table.............................................
function showTable() {
    // var rowId = 1;

    var cols = [];

    for (var i = 0; i < user_issue.length; i++) {
        for (var k in user_issue[i]) {
            if (cols.indexOf(k) === -1) {
                // Push all keys to the array 
                if (k === "ISSUE") {
                    //nothing will happen
                }
                else {
                    cols.push(k);
                }

            }
        }

        // Create a table element 
        var table = document.createElement("table");
        table.setAttribute("id", "dynamicTable");
        // Create table row tr element of a table 
        var tr = table.insertRow(-1);

        for (var i = 0; i < cols.length; i++) {

            // Create the table header th element 
            var theader = document.createElement("th");
            theader.innerHTML = cols[i];

            // Append columnName to the table row
            tr.appendChild(theader);

        }

        // Adding the data to the table 
        for (var i = 0; i < user_issue.length; i++) {

            // Create a new row 
            trow = table.insertRow(-1);
            trow.setAttribute("id", i + 1);
            trow.setAttribute("onclick", "onRowClick(id);");

            for (var j = 0; j < cols.length; j++) {
                var cell = trow.insertCell(-1);

                // Inserting the cell at particular place 
                cell.innerHTML = user_issue[i][cols[j]];
            }
        }

        // Add the newely created table containing json data 
        var el = document.getElementById("jsonDataTable");
        el.innerHTML = "";
        el.appendChild(table);
    }

    // var tab = "jsonDataTable";
    // console.log(document.getElementById("jsonDataTable"));

}

//.........................get row id....................................

function onRowClick(rowId) {
    let getRow;
    var table;
    var issueArr = [];
    // alert("Clicked on rowId : "+ row);

    for (let n = 0; n < issues.length; n++) {
        for (var z in issues[n]) {
            if (issueArr.indexOf(z) === -1) {
                // Push all keys to the array 
                issueArr.push(z);
                // if (z === "USER/ISSUE") {
                //     //nothing will happen
                // }
                // else {
                //     issueArr.push(z);
                // }

            }
        }

    }

    // console.log(issueArr);
    // Get a reference to the row
    dynTable = document.getElementById("dynamicTable");

    // Get a reference to the row
    getRow = document.getElementById(rowId);

    // Insert a row at the bottom of the selected row
    // let newRow = getRow.append.insertRow(-1);
    var rowCount = dynTable.rows.length;
    // console.log(rowCount);
    console.log(dynTable.rows[rowId]);

    // Insert a cell in the row at index 0
    // let newCell = newRow.insertCell(0);


    // console.log(getRow.querySelector("td").innerHTML);
    userName = getRow.querySelector("td").innerHTML;
    // console.log(userName);
    table = document.getElementById("dynamicTable");





    //   

    //   // Append a text node to the cell
    //   let newText = document.createTextNode('New bottom row');
    //   newCell.appendChild(newText);

}

// .....................search function........................

function search() {
    var getInpVal, upper, getTable, td;
    getInpVal = document.getElementById("inpVal").value;
    var trim = getInpVal.trim();

    if (trim == 0) {
        alert("Enter any name, white space is not allowed!");
    } else {
        upper = getInpVal.toUpperCase();
        getTable = document.getElementById("dynamicTable");
        tRow = getTable.getElementsByTagName("tr");

        for (let i = 0; i < tRow.length; i++) {
            td = tRow[i].getElementsByTagName("td")[0];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(upper) > -1) {
                    tRow[i].style.display = "";
                } else {
                    tRow[i].style.display = "none";
                }
            }
        }
    }
}

// ...........................sorting function......................

function sorting() {
    var dynTable, allRows, bool, i, currentRow, nextRow, changePlace;
    dynTable = document.getElementById("dynamicTable");
    bool = 1;
    /*Make a loop that will continue until
    no switching has been done:*/
    while (bool) {
        //start by saying: no switching is done:
        bool = 0;
        allRows = dynTable.rows;

        // loop except heading of table (allRows.length - 1)
        for (i = 1; i < (allRows.length - 1); i++) {
            //start by saying there should be no switching:
            changePlace = false;

            currentRow = allRows[i].getElementsByTagName("td")[0];
            nextRow = allRows[i + 1].getElementsByTagName("td")[0];

            //check if the two rows should change place:
            if (currentRow.innerHTML.toLowerCase() > nextRow.innerHTML.toLowerCase()) {
                //if so, mark as a switch and break the loop:
                changePlace = true;
                break;
            }
        }
        if (changePlace) {
            allRows[i].parentNode.insertBefore(allRows[i + 1], allRows[i]);
            bool = 1;
        }
    }

}

// ...................................pagination function.....................



function filter_requests() {
    const data = { "req_per_page": document.getElementById("req_per_page").value, "page_no": 1 };
    pagination(data, user_issue);
}

function pagination(data, user_issue) {
    const all_data = window.btoa(JSON.stringify(user_issue));
    $(".pagination").empty();
    if (data.req_per_page !== 'ALL') {
        let pager = `<a href="#" id="prev_link" onclick=active_page('prev',\"${all_data}\",${data.req_per_page})>&laquo;</a>` +
            `<a href="#" class="active" onclick=active_page(this,\"${all_data}\",${data.req_per_page})>1</a>`;
        const total_page = Math.ceil(parseInt(user_issue.length) / parseInt(data.req_per_page));
        if (total_page < pagination_visible_pages) {
            render_table_rows(all_data, data.req_per_page, data.page_no);
            for (let num = 2; num <= total_page; num++) {
                pager += `<a href="#" onclick=active_page(this,\"${all_data}\",${data.req_per_page})>${num}</a>`;
            }
        } else {
            render_table_rows(all_data, data.req_per_page, data.page_no);
            for (let num = 2; num <= pagination_visible_pages; num++) {
                pager += `<a href="#" onclick=active_page(this,\"${all_data}\",${data.req_per_page})>${num}</a>`;
            }
            for (let num = pagination_visible_pages + 1; num <= total_page; num++) {
                pager += `<a href="#" style="display:none;" onclick=active_page(this,\"${all_data}\",${data.req_per_page})>${num}</a>`;
            }
        }
        pager += `<a href="#" id="next_link" onclick=active_page('next',\"${all_data}\",${data.req_per_page})>&raquo;</a>`;
        $(".pagination").append(pager);
    } else {
        render_table_rows(all_data, user_issue.length, 1);
    }
}

// function pagination() {
//     var table, allRows, currentRow, pageCount;

//     table = document.getElementById("dynamicTable");
//     allRows = table.rows;
//     // console.log(allRows);  //no of rows

//     //  console.log(allRows[0]);  //returns row

//     for (let i = 1; i < allRows.length; i++) {
        
//         currentRow = allRows[i].getElementsByTagName("td");

//         for (let flag = 0; flag <= 5; flag++) {

//             console.log(allRows[0].getElementsByTagName("th")[flag].innerHTML);
//         }
//         for (let j = 0; j < currentRow.length; j++) {

//             console.log(currentRow[j].innerHTML);
//         }
//         console.log("...................");
//     }

// }