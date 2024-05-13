interface Provinsi {
    id: number | null;
    kode: string | null;
    n_provinsi: string | null;
}

const defProvinsi: Provinsi[] = []

interface Kabupaten {
    id: number | null;
    kode: string | null;
    n_kabupaten: string | null;
    provinsi_id: number | null;
}

const defKabupaten: Kabupaten[] = []

interface Kecamatan {
    id: number | null;
    kode: string | null;
    n_kecamatan: string | null;
    kabupaten_id: number | null;
}

const defKecamatan: Kecamatan[] = []

interface Kelurahan {
    id: number | null;
    kode: string | null;
    n_kelurahan: string | null;
    kecamatan_id: number | null;
}

const defKelurahan: Kelurahan[] = []

export {
    Provinsi,
    defProvinsi,
    Kabupaten,
    defKabupaten,
    Kecamatan,
    defKecamatan,
    Kelurahan,
    defKelurahan
}