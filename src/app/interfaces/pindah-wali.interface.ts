interface PindahWali {
    id: number | null;
    tmsiswa_id: number | null;
    no_sk: number | null;
    instansi_ortu: string | null;
    ket: string | null;
    acc: string | null;
    file_url: string | null;
    file_name: string | null;
}

const defPindahWali: PindahWali = {
    id: null,
    tmsiswa_id: null,
    no_sk: null,
    instansi_ortu: null,
    ket: null,
    acc: null,
    file_url: null,
    file_name: null,
}

export {
    PindahWali,
    defPindahWali,
}