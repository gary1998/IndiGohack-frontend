function refreshStatus() {

}

function downloadTable() {
    var data = document.getElementById('events-table');
    var excelFile = XLSX.utils.table_to_book(data, {sheet: "events"});
    XLSX.write(excelFile, { bookType: 'xlsx', bookSST: true, type: 'base64' });
    XLSX.writeFile(excelFile, 'events.xlsx');
}