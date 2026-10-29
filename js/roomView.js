
export function renderServices(services) {
    const container = document.getElementById("servicesList");

    container.innerHTML = services.map(service => `
        <span class="service-tag">
            ${service.icon} ${service.name}
        </span>
    `).join("");
}

export function renderStats(rooms) {
    document.getElementById("totalRooms").textContent = rooms.length;

    document.getElementById("availableRooms").textContent =
        rooms.filter(room => room.status === "Disponible").length;

    document.getElementById("occupiedRooms").textContent =
        rooms.filter(room => room.status === "Occupée").length;

    // Estimation des revenus potentiels par nuit
    const revenue = rooms
        .filter(room => room.status !== "Maintenance")
        .reduce((sum, room) => sum + room.price, 0);

    document.getElementById("totalRevenue").textContent =
        revenue.toLocaleString("fr-FR") + " DH";
}

export function renderRooms(rooms) {
    const tbody = document.getElementById("roomsTableBody");

    document.getElementById("resultCount").textContent =
        `${rooms.length} chambre(s) trouvée(s)`;

    if (rooms.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" class="text-center text-muted py-4">
                    Aucune chambre trouvée.
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = rooms.map(room => {
        const statusClass = {
            "Disponible": "status-disponible",
            "Occupée": "status-occupée",
            "Réservée": "status-réservée",
            "Maintenance": "status-maintenance"
        }[room.status] || "";

        return `
            <tr>
                <td class="fw-bold">${room.number}</td>
                <td>${room.type}</td>
                <td>${room.capacity} personne(s)</td>
                <td>${room.price.toLocaleString("fr-FR")} DH</td>
                <td>
                    <span class="status ${statusClass}">
                        ${room.status}
                    </span>
                </td>
                <td>${room.client || "—"}</td>
                <td>
                    <button class="btn btn-sm btn-outline-primary"
                            data-room-id="${room.id}">
                        Détails
                    </button>
                </td>
            </tr>
        `;
    }).join("");
}

export function filterRooms(rooms, search, status) {
    const query = search.trim().toLocaleLowerCase("fr");

    return rooms.filter(room => {
        const matchesSearch = [
            room.number,
            room.type,
            room.client
        ].some(value =>
            String(value || "").toLocaleLowerCase("fr").includes(query)
        );

        const matchesStatus =
            status === "Tous" || room.status === status;

        return matchesSearch && matchesStatus;
    });
}
