interface Login {
    siswa_id: string | null;
    nisn: string | null;
    nama_lengkap: string | null;
    jenis_kelamin: string | null;
    tanggal_lahir: string | null;
    tempat_lahir: string | null;
    nik: string | null;
    sekolah_asal: string | null;
    npsn: string | null;
}

const defLogin: Login = {
    siswa_id: null,
    nisn: null,
    nama_lengkap: null,
    jenis_kelamin: null,
    tanggal_lahir: null,
    tempat_lahir: null,
    nik: null,
    sekolah_asal: null,
    npsn: null
}

export {
    Login,
    defLogin
}