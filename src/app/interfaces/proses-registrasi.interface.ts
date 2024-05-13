interface ProsesRegistrasi {
    "siswa_id": number | null;
    "nisn": string | null;
    "nama_lengkap":  string | null;
    "nik":  string | null;
    "sekolah_asal":  string | null;
    "sekolah_tujuan":  string | null;
    "no_pendaftaran":  string | null;
    "status":  string | null;
    "keterangan":  string | null;
    "pin"?:  string | null;
    "verifikasi_tahap"?:  string | null;
    "verifikasi_tahap_no"?:  string | null;
    "data_verifikasi_tahap"?:  any | null;
}

const defProsesRegistrasi: ProsesRegistrasi = {
    "siswa_id": null,
    "nisn": null,
    "nama_lengkap": null,
    "nik": null,
    "sekolah_asal": null,
    "sekolah_tujuan": null,
    "no_pendaftaran": null,
    "status": null,
    "keterangan": null,
    "pin": null,
    "verifikasi_tahap": null,
    "verifikasi_tahap_no": null,
    "data_verifikasi_tahap": null
}

export {
    ProsesRegistrasi,
    defProsesRegistrasi
}