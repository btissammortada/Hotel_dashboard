
import { getHotelData } from "./roomService.js";
import { state } from "./state.js";

import {
    renderServices,
    renderStats,
    renderRooms,
    filterRooms
} from "./roomView.js";

import { showRoomDetails } from "./roomModal.js";

function updateDashboard() {
    const filteredRooms = filterRooms(
        state.rooms,
        state.search,
        state.status
    );

    renderStats(state.rooms);
    renderRooms(filteredRooms);
}


async function initApp() {
    const errorMessage = document.getElementById("errorMessage");

    try {
        const data = await getHotelData();

        state.rooms = data.rooms;
        state.services = data.services;

        console.log("Nombre de chambres :", state.rooms.length);

        renderServices(state.services);
        updateDashboard();

        errorMessage.classList.add("d-none");

    } catch (error) {
        console.error("Erreur de chargement :", error);

        errorMessage.classList.remove("d-none");
        errorMessage.textContent =
            "Erreur : " + error.message;

        document.getElementById("resultCount").textContent =
            "Impossible de charger les données.";
    }
}


// Recherche en temps réel
document.getElementById("searchInput").addEventListener("input", event => {
    state.search = event.target.value;
    updateDashboard();
});

// Filtres par statut
document.querySelectorAll(".status-btn").forEach(button => {
    button.addEventListener("click", () => {
        state.status = button.dataset.status;

        document.querySelectorAll(".status-btn").forEach(btn => {
            btn.classList.remove("btn-dark", "active");
            btn.classList.add("btn-outline-dark");
        });

        button.classList.remove("btn-outline-dark");
        button.classList.add("btn-dark", "active");

        updateDashboard();
    });
});

// Ouverture des détails d'une chambre
document.getElementById("roomsTableBody").addEventListener("click", event => {
    const button = event.target.closest("[data-room-id]");

    if (!button) return;

    const room = state.rooms.find(
        item => item.id === Number(button.dataset.roomId)
    );

    if (room) {
        showRoomDetails(room);
    }
});

// Démarrage
initApp();
