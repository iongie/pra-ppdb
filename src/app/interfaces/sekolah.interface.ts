interface Sekolah {
    id: number | null;
    jenjang: string | null;
    n_sekolah: string | null;
    alamat: string | null;
}

const defSekolah: Sekolah[]= []

export {
    Sekolah,
    defSekolah
}