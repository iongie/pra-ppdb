interface DataSiswa {
    id: string | null;
    nisn: string | null;
    tmsekolah_id: string | null;
    n_siswa: string | null;
    jns_kelamin: string | null;
    sekolah_asal: string | null;
    trsekolah_kelas_id: string | null;
    n_kelas: string | null;
    t_lahir: string | null;
    d_lahir: string | null;
    kk: string | null;
    nik: string | null;
    nama_ibu: string | null;
    telp: string | null;
    tgl_terbit_kk: string | null;
    file_kk: string | null;
    alamat_detail: string | null;
    lama_tinggal: string | null;
    smp_tujuan: string | null;
    alamat_rt: string | null;
    alamat_rw: string | null;
    kelurahan_id: string | null;
    kecamatan_id: string | null;
    kabupaten_id: string | null;
    provinsi_id: string | null;
    lat: string | null;
    long: string | null;
    alamat_map: string | null;
    acc: string | null;
    npsn: string | null;
    file_kk_url: string | null;
    kode: string | null;
}


let defDataSiswa: DataSiswa = {
    id: null,
    nisn: null,
    tmsekolah_id: null,
    n_siswa: null,
    jns_kelamin: null,
    sekolah_asal: null,
    trsekolah_kelas_id: null,
    n_kelas: null,
    t_lahir: null,
    d_lahir: null,
    kk: null,
    nik: null,
    nama_ibu: null,
    telp: null,
    tgl_terbit_kk: null,
    file_kk: null,
    alamat_detail: null,
    lama_tinggal: null,
    smp_tujuan: null,
    alamat_rt: null,
    alamat_rw: null,
    kelurahan_id: null,
    kecamatan_id: null,
    kabupaten_id: null,
    provinsi_id: null,
    lat: null,
    long: null,
    alamat_map: null,
    acc: null,
    npsn: null,
    file_kk_url: null,
    kode: null
}

export {
    DataSiswa,
    defDataSiswa
}
