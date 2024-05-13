interface Jenis {
    id: number | null;
    n_jenis_afirmasi: string | null;
}

const defJenis: Jenis[] = []

interface AfirmasiData {
    id: number | null;
    tmsiswa_id: number | null;
    tmjenis_afirmasi_id: number | null;
    nomor: string | null;
    acc: string | null;
    file_url: string | null;
    file_name: string | null;
}

const defAfirmasiData: AfirmasiData = {
    id: null,
    tmsiswa_id: null,
    tmjenis_afirmasi_id: null,
    nomor: null,
    acc: null,
    file_url: null,
    file_name: null,
}

export {
    Jenis,
    defJenis,
    AfirmasiData,
    defAfirmasiData
}