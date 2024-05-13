interface AnakGuru{
    id: number | null;
    tmsiswa_id: number | null;
    no_sk: number | null;
    ket: string | null;
    acc: string | null;
    file_url: string | null;
    file_name: string | null;
}

const defAnakGuru: AnakGuru = {
    id: null,
    tmsiswa_id: null,
    no_sk: null,
    ket: null,
    acc: null,
    file_url: null,
    file_name: null,
}

export {
    AnakGuru,
    defAnakGuru
}