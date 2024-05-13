interface Kategori {
    id: number | null;
    n_prestasikategori: string | null;
}

const defKategori: Kategori[] = []

interface Tingkat {
    id: number | null;
    tmprestasikategori_id: number | null;
    n_prestasi: string | null;
}

const defTingkat: Tingkat[] = []

interface Bobot {
    id: number | null;
    tmprestasi_id: number | null;
    n_prestasibobot: string | null;
}

const defBobot: Bobot[] = []

interface Prestasi {
    id: number | null;
    tmsiswa_id: number | null;
    tmprestasibobot_id: number | null;
    no_sertifikat: string | null;
    n_prestasi: string | null;
    acc: number | null;
    n_prestasibobot: string | null;
    n_tingkat: string | null;
    n_prestasikategori: string | null;
    file_url: string | null;
    file_name: string | null;
    status: string | null;
}

const defPrestasi: Prestasi[] = []

export {
    Kategori,
    defKategori,
    Tingkat,
    defTingkat,
    Bobot,
    defBobot,
    Prestasi,
    defPrestasi
}