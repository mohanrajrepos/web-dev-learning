const claims = [
    ["CLM10001", "POL784512", "Ramesh Kumar", "Medical", "2026-05-12", "12500", "Approved"],
    ["CLM10002", "POL784513", "Priya Sharma", "Vehicle", "2026-05-14", "45000", "Pending"],
    ["CLM10003", "POL784514", "Arun Raj", "Property", "2026-05-15", "125000", "Under Review"],
    ["CLM10004", "POL784515", "Meena Lakshmi", "Travel", "2026-05-18", "18000", "Approved"],
    ["CLM10005", "POL784516", "Vijay Kumar", "Medical", "2026-05-20", "8200", "Rejected"],
    ["CLM10006", "POL784517", "Sathya Narayanan", "Vehicle", "2026-05-21", "67500", "Approved"],
    ["CLM10007", "POL784518", "Karthik R", "Property", "2026-05-22", "215000", "Pending"],
    ["CLM10008", "POL784519", "Anitha Devi", "Medical", "2026-05-23", "15300", "Approved"],
    ["CLM10009", "POL784520", "Rahul Verma", "Travel", "2026-05-24", "9800", "Rejected"],
    ["CLM10010", "POL784521", "Divya S", "Vehicle", "2026-05-25", "38500", "Under Review"],
    ["CLM10011", "POL784522", "Mohanraj V", "Medical", "2026-05-26", "6400", "Approved"],
    ["CLM10012", "POL784523", "Deepak Menon", "Property", "2026-05-27", "175000", "Pending"],
    ["CLM10013", "POL784524", "Nisha Thomas", "Travel", "2026-05-28", "22500", "Approved"],
    ["CLM10014", "POL784525", "Praveen Kumar", "Vehicle", "2026-05-29", "52000", "Rejected"],
    ["CLM10015", "POL784526", "Harini Raj", "Medical", "2026-05-30", "11800", "Approved"],
    ["CLM10016", "POL784527", "Suresh Babu", "Property", "2026-06-01", "98000", "Under Review"],
    ["CLM10017", "POL784528", "Keerthana V", "Travel", "2026-06-02", "14500", "Pending"],
    ["CLM10018", "POL784529", "Ajith Kumar", "Vehicle", "2026-06-03", "72000", "Approved"],
    ["CLM10019", "POL784530", "Lavanya R", "Medical", "2026-06-04", "9300", "Approved"],
    ["CLM10020", "POL784531", "Ganesh Prasad", "Property", "2026-06-05", "250000", "Pending"]
];

const rowsPerPage = 5;
let currentPage = 1;
let currentData = claims;

function RenderTable(rows) {
    currentData = rows;
    currentPage = 1;
    RenderPage();
    RenderPagination();
}

function RenderPage() {
    const claimdata = document.getElementById("ClaimDetails");
    claimdata.innerHTML = "";

    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const pageRows = currentData.slice(start, end);
    if (pageRows.length === 0) {
        claimdata.innerHTML = `<tr><td colspan="7" style="text-align:center; color:#999;">No customer found</td></tr>`;
        return;
    }

    pageRows.forEach(claim => {
        const newrow = document.createElement("tr");
        claim.forEach(value => {
            const cell = document.createElement("td");
            cell.textContent = value;
            newrow.appendChild(cell);
        });
        claimdata.appendChild(newrow);
    });
}

function SearchCustomer() {
    const searchValue = document.getElementById("searchInput").value;
    if (searchValue === "") {
        RenderTable(claims);
        return;
    }
    const filtered = claims.filter(function (row) {
        return row[2].toLowerCase().includes(searchValue.toLowerCase());
    });
    RenderTable(filtered);
}

function RenderPagination() {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";

    const totalPages = Math.ceil(currentData.length / rowsPerPage);

    if (totalPages <= 1) return;

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;

        if (i === currentPage) {
            btn.classList.add("active");
        }

        btn.addEventListener("click", function () {
            currentPage = i;
            RenderPage();
            RenderPagination();
        });

        pagination.appendChild(btn);
    }
}

window.onload = function () {
    RenderTable(claims);
};

document.getElementById("searchInput").addEventListener("input", function () {
    if (this.value.trim() === "") {
        RenderTable(claims);
    }
});
