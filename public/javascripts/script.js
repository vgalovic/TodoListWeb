$('button.delteteButton').click( function() {
    $('form.deleteForm').submit();
});

$('button.getUpdateIdButton').click( function() {
    $('form.getUpdateIdForm').submit();
});

function SearchTable() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = document.getElementById("TaskTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1)
                tr[i].style.display = "";
            else 
                tr[i].style.display = "none";
        }       
    }
}

$('.date').datepicker({
    uiLibrary: 'bootstrap4'
});