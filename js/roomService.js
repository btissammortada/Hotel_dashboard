
export async function getHotelData() {
    const url = new URL("../data/hotel.json", import.meta.url);

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(
            `Erreur HTTP ${response.status} : ${url.pathname}`
        );
    }

    const data = await response.json();

    if (!Array.isArray(data.rooms) ||
        !Array.isArray(data.services)) {
        throw new Error(
            "Le JSON doit contenir les tableaux rooms et services."
        );
    }

    return data;
}
