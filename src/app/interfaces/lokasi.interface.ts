interface Lokasi {
    lat: number | null;
    lon: number | null;
    address?: string | null;
}

const defLokasi: Lokasi[] = []


const defLokasiUntukMap: Lokasi = {
    lat: null,
    lon: null
}
export {
    Lokasi,
    defLokasi,
    defLokasiUntukMap
}