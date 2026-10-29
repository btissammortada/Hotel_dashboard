
export function showRoomDetails(room) {
    document.getElementById("modalTitle").textContent =
        `Chambre ${room.number}`;

    document.getElementById("modalNumber").textContent = room.number;
    document.getElementById("modalType").textContent = room.type;
    document.getElementById("modalCapacity").textContent =
        `${room.capacity} personne(s)`;

    document.getElementById("modalPrice").textContent =
        `${room.price.toLocaleString("fr-FR")} DH / nuit`;

    document.getElementById("modalStatus").textContent = room.status;
    document.getElementById("modalClient").textContent =
        room.client || "Aucun client";

    document.getElementById("modalServices").textContent =
        room.services.join(", ");

    document.getElementById("modalDescription").textContent =
        room.description;

    const modalElement = document.getElementById("roomModal");
    const modal = bootstrap.Modal.getOrCreateInstance(modalElement);

    modal.show();
}
