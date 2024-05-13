interface TahapanRegistrasi {
    name: string | null,
    process: string | null   
}

const defTahapanRegistrasi: TahapanRegistrasi[] = [
    {
        name: 'data siswa',
        process: 'none'
    },
    {
        name: 'nilai rapor' ,
        process: 'none',
    },
    {
        name: 'prestasi',
        process: 'none'
    },
    {
        name: 'afirmasi / disabilitas',
        process: 'none'
    },
    {
        name: 'anak guru',
        process: 'none'
    },
    {
        name: 'perpindahan orang tua / wali',
        process: 'none'
    },
    {
        name: 'konfirmasi',
        process: 'none'
    },


] 

export {
    TahapanRegistrasi,
    defTahapanRegistrasi
}