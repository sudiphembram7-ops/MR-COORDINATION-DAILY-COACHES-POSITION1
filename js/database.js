/* ===========================================
   MR COACH POSITION SYSTEM
   database.js
   Local Storage Database
=========================================== */

const STORAGE_KEY = "mrCoachDatabase";

// Default data
const defaultCoaches = [
    {
        coachNo: "194274/C",
        shop: "MR SCR",
        position: "SCR9",
        status: "Under Repair"
    },
    {
        coachNo: "082713",
        shop: "N SHOP",
        position: "N2",
        status: "Released"
    },
    {
        coachNo: "091181",
        shop: "M SHOP",
        position: "M2",
        status: "Inspection"
    }
];

// Initialize database
function initializeDatabase() {

    if (!localStorage.getItem(STORAGE_KEY)) {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(defaultCoaches)
        );
    }

}

// Get all coaches
function getCoaches() {

    return JSON.parse(
        localStorage.getItem(STORAGE_KEY)
    ) || [];

}

// Save all coaches
function saveCoaches(data) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
    );

}

// Add coach
function addCoach(coach) {

    const data = getCoaches();

    data.push(coach);

    saveCoaches(data);

}

// Delete coach
function deleteCoach(coachNo) {

    const data = getCoaches().filter(
        c => c.coachNo !== coachNo
    );

    saveCoaches(data);

}

// Update coach
function updateCoach(oldCoachNo, updatedCoach) {

    const data = getCoaches();

    const index = data.findIndex(
        c => c.coachNo === oldCoachNo
    );

    if (index !== -1) {

        data[index] = updatedCoach;

        saveCoaches(data);

    }

}

// Find coach
function findCoach(coachNo) {

    return getCoaches().find(
        c => c.coachNo === coachNo
    );

}

// Count coaches
function totalCoaches() {

    return getCoaches().length;

}

// Clear database
function clearDatabase() {

    localStorage.removeItem(STORAGE_KEY);

}

// Load coach table
function loadCoachTable(tableId) {

    const tbody = document.getElementById(tableId);

    if (!tbody) return;

    tbody.innerHTML = "";

    getCoaches().forEach(coach => {

        let row = `
        <tr>

            <td>${coach.coachNo}</td>

            <td>${coach.shop}</td>

            <td>${coach.position}</td>

            <td>${coach.status}</td>

            <td>

                <button
                    class="btn btn-warning btn-sm"
                    onclick="editCoach('${coach.coachNo}')">

                    Edit

                </button>

                <button
                    class="btn btn-danger btn-sm"
                    onclick="removeCoach('${coach.coachNo}')">

                    Delete

                </button>

            </td>

        </tr>
        `;

        tbody.innerHTML += row;

    });

}

// Remove coach
function removeCoach(coachNo) {

    if (confirm("Delete Coach " + coachNo + "?")) {

        deleteCoach(coachNo);

        loadCoachTable("coachTable");

    }

}

// Demo edit
function editCoach(coachNo) {

    const coach = findCoach(coachNo);

    if (!coach) return;

    alert(
        "Edit Feature\n\nCoach : " +
        coach.coachNo
    );

}

// Initialize
initializeDatabase();