interface Nilai {
    pengetahuan: number | null;
    keterampilan: number | null;
    rata_rata: number | null;
}

const defNilai: Nilai = {
    pengetahuan: null,
    keterampilan: null,
    rata_rata: null
}

interface DataNilai {
    mapel: string | null;
    nilai: Nilai
}

const defDataNilai: DataNilai [] = [];

interface NilaiRapor {
    id: number | null;
    tmsiswa_id: number | null;
    tmrapor_id: number | null;
    peringkat: number | null;
    total: number | null;
    kelas: string | null;
    semester: string | null;
    data_nilai: DataNilai[];
}

const defNilaiRapor: NilaiRapor[] = []

interface Aktif {
    tahap: number | null;
    sekolah: string | null;
    jalur: string | null;
    urutan: number | null;
    tgl_daftar: string | null;
    status: string | null;
    ket: string | null;
}

const defAktif: Aktif[] = []

interface Ganti {
    tahap: number | null;
    sekolah: string | null;
    jalur: string | null;
    urutan: number | null;
    tgl_daftar: string | null;
    tgl_ganti: string | null;
    status: string | null;
}

const defGanti: Ganti[] = []

interface RiwayatPilihan {
    aktif: Aktif[];
    ganti: Ganti[];
}

const defRiwayatPilihan: RiwayatPilihan = {
    aktif: defAktif,
    ganti: defGanti
}

export{
    Nilai,
    defNilai,
    DataNilai,
    defDataNilai,
    NilaiRapor,
    defNilaiRapor,
    Aktif,
    defAktif,
    Ganti,
    defGanti,
    RiwayatPilihan,
    defRiwayatPilihan
}