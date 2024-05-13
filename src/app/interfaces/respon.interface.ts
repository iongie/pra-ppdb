interface Respon {
    mode: string | null;
    pesan: string | null;
}

const defRespon: Respon = {
    mode: null,
    pesan: null
}

export {
    Respon,
    defRespon
}