function registerPenduduk() {
    var person = {
        name: $("#name").val(),
        email: $("#email").val(),
        password: $("#password").val(),
        date: $("#date").val(),
        address: $("#address").val(),
        NIK: $("#NIK").val()        

    }
    var response = "";
    $.ajax({
        url: 'https://lapor-pkl.herokuapp.com/api/register-penduduk',
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(person),
        success: function(text) {
            if (text == "success") {
                alert("Registrasi berhasil dilakukan !");
                window.location.href = "https://lapor-pkl.herokuapp.com/";
            }
            else {
                alert("Registrasi gagal dilakukan. Ulangi proses registrasi !");
                window.location.href = "https://lapor-pkl.herokuapp.com/register?warn=email";
            }
        },
        failure: function(errMsg) {
            alert(errMsg);
        }
    });
    return false;
}

function registerAdmin() {
    var person = {
        name: $("#name").val(),
        email: $("#email").val(),
        password: $("#password").val(),
        date: $("#date").val(),
        address: $("#address").val(),
        NIK: $("#NIK").val(),
        NIP: $("#NIP").val()       

    }
    var response = "";
    $.ajax({
        url: 'https://lapor-pkl.herokuapp.com/api/register-admin',
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(person),
        success: function(text) {
            if (text == "success") {
                alert("Registrasi berhasil dilakukan !");
                window.location.href = "https://lapor-pkl.herokuapp.com/admin";
            }
            else {
                alert("Registrasi gagal dilakukan. Ulangi proses registrasi !");
                window.location.href = "https://lapor-pkl.herokuapp.com/admin/register?warn=email";
            }
            
        },
        failure: function(errMsg) {
            alert(errMsg);
        }
    });
    return false;
}

function loginPenduduk() {
    var person = {
        email: $("#email").val(),
        password: $("#password").val(),     
    }
    console.log(person);
    var response = "";
    $.ajax({
        url: 'https://lapor-pkl.herokuapp.com/api/login-penduduk',
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(person),
        success: function(text) {
            if (text == "success") {
                window.location.href = "https://lapor-pkl.herokuapp.com/main";
                console.log("login");
            } else {
                alert("Email atau password yang anda masukkan tidak terdaftar");
                window.location.href = "https://lapor-pkl.herokuapp.com?warn=failed";
            }
        },
        failure: function(errMsg) {
            alert(errMsg);
        }
    });
    return false;
}

function loginAdmin() {
    var person = {
        email: $("#email").val(),
        password: $("#password").val(),     
    }
    console.log(person);
    var response = "";
    $.ajax({
        url: 'https://lapor-pkl.herokuapp.com/api/login-admin',
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(person),
        success: function(text) {
            if (text == "success") {
                window.location.href = "https://lapor-pkl.herokuapp.com/admin/main";
                console.log("login");
            } else {
                alert("Email atau password yang anda masukkan tidak terdaftar");
                window.location.href = "https://lapor-pkl.herokuapp.com/admin?warn=failed";
            };
        },
        failure: function(errMsg) {
            alert(errMsg);
        }
    });
    return false;
}

function addPKL() {
    var PKL = {
        name: $("#namaPemilik").val(),
        type: $("#jenisDagangan").val(),
        address: $("#formAddress").val(),
        coordinate: $("#formCoordinate").val(),
        day:{
            senin: $("#daySenin:checked").val(),
            selasa: $("#daySelasa:checked").val(), 
            rabu: $("#dayRabu:checked").val(), 
            kamis: $("#dayKamis:checked").val(), 
            jumat: $("#dayJumat:checked").val(), 
            sabtu: $("#daySabtu:checked").val(),  
            minggu: $("#dayMinggu:checked").val(),
        },
        start: $("#startTime").val(),
        end: $("#endTime").val(),
        capital: $("#jumlahModal").val(),
        resource: $("#perlengkapan").val(),
        status: "invalid",
        date: $.now()
    }
    var response = "";

    $.ajax({
        url: 'https://lapor-pkl.herokuapp.com/api/register-pkl-db',
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(PKL),
        success: function(text) {
            if (text == "success") {
                alert("Data PKL berhasil didaftarkan !");
                window.location.href = "https://lapor-pkl.herokuapp.com/main";
                console.log("login");
            } else {
                alert("Data PKL gagal didaftarkan. Ulangi pendaftaran data PKL !");
                window.location.href = "https://lapor-pkl.herokuapp.com/register-pkl?warn=failed";
            }
        },
        failure: function(errMsg) {
            alert(errMsg);
        }
    });
    
    return false;
}

function addPKLByAdmin() {
    var PKL = {
        name: $("#namaPemilik").val(),
        type: $("#jenisDagangan").val(),
        address: $("#formAddress").val(),
        coordinate: $("#formCoordinate").val(),
        day:{
            senin: $("#daySenin:checked").val(),
            selasa: $("#daySelasa:checked").val(), 
            rabu: $("#dayRabu:checked").val(), 
            kamis: $("#dayKamis:checked").val(), 
            jumat: $("#dayJumat:checked").val(), 
            sabtu: $("#daySabtu:checked").val(),  
            minggu: $("#dayMinggu:checked").val(),
        },
        start: $("#startTime").val(),
        end: $("#endTime").val(),
        capital: $("#jumlahModal").val(),
        resource: $("#perlengkapan").val(),
        status: "valid",
        date: $.now()
    }
    var response = "";

    $.ajax({
        url: 'https://lapor-pkl.herokuapp.com/api/register-pkl-db',
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(PKL),
        success: function(text) {
            if (text == "success") {
                alert("Data PKL berhasil ditambahkan !");
                window.location.href = "https://lapor-pkl.herokuapp.com/admin/main";
                console.log("login");
            } else {
                alert("Data PKL gagal ditambahkan. Ulangi penambahan data PKL !");
                window.location.href = "https://lapor-pkl.herokuapp.com/admin/register-pkl?warn=failed";
            }
        },
        failure: function(errMsg) {
            alert(errMsg);
        }
    });
    
    return false;
}

function addKegiatan() {
    var kegiatan = {
        namaKegiatan: $("#namaKegiatan").val(),
        lokasiKegiatan: $("#formAddress").val(),
        coordinate: $("#formCoordinate").val(),
        tanggalKegiatan: $("#date").val(),
        waktuKegiatan: $("#time").val(),
        deskripsiKegiatan: $("#deskripsiKegiatan").val(),
        date: $.now()
    }
    var response = "";
    $.ajax({
        url: 'https://lapor-pkl.herokuapp.com/api/kegiatan-db',
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(kegiatan),
        success: function(text) {
            if (text == "success") {
                alert("Kegiatan berhasil ditambahkan !");
                window.location.href = "https://lapor-pkl.herokuapp.com/admin/kegiatan";
            }
            else {
                alert("Kegiatan gagal ditambahkan. Ulangi penambahan kegiatan !");
                window.location.href = "https://lapor-pkl.herokuapp.com/admin/add-kegiatan?warn=failed";
            }
            
        },
        failure: function(errMsg) {
            alert(errMsg);
        }
    });
    return false;
}

function addLaporan() {
    var laporan = {
        namaLaporan: $("#namaLaporan").val(),
        lokasiLaporan: $("#formAddress").val(),
        kordinatLaporan: $("#formCoordinate").val(),
        deskripsiLaporan: $("#deskripsiLaporan").val(),
        date: $.now(),
        status: "invalid",
    }
    var response = "";
    $.ajax({
        url: 'https://lapor-pkl.herokuapp.com/api/daftar-laporan-db',
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(laporan),
        success: function(text) {
            if (text == "success") {
                alert("Laporan berhasil ditambahkan !");
                window.location.href = "https://lapor-pkl.herokuapp.com/main";
            }
            else {
                alert("Laporan gagal ditambahkan. Ulangi penambahan laporan !");
                window.location.href = "https://lapor-pkl.herokuapp.com/lapor-pkl?warn=failed";
            }
            
        },
        failure: function(errMsg) {
            alert(errMsg);
        }
    });
    return false;
}

function verifikasiPKL() {
    if (confirm('Yakin Akan Melakukan Verifikasi')) {
        var id = $("#pklid").val();
        $.ajax({
            url: 'https://lapor-pkl.herokuapp.com/api/verifikasiPKL/'+id,
            type: 'POST',
            success: function(text) {
                alert("PKL berhasil diverifikasi !");
                window.location.href = "https://lapor-pkl.herokuapp.com/admin/detail/"+id;
            },
            failure: function(errMsg) {
                alert("PKL gagal diverifikasi !");
                alert(errMsg);
            }
        });
    }
}

function deletePKL() {
    if (confirm('Yakin Akan Menghapus')) {
        var id = $("#pklid").val();
        $.ajax({
            url: 'https://lapor-pkl.herokuapp.com/api/deletePKL/'+id,
            type: 'DELETE',
            success: function(text) {
                alert("Data PKL berhasil dihapus !");
                window.location.href = "https://lapor-pkl.herokuapp.com/admin/main";
            },
            failure: function(errMsg) {
                alert("Data PKL gagal dihapus !");
                alert(errMsg);
            }
        });
    }
}

function laporanSelesai() {
    if (confirm('Yakin Laporan Telah Selesai')) {
        var id = $("#idlaporan").val();
        $.ajax({
            url: 'https://lapor-pkl.herokuapp.com/api/laporan-selesai/'+id,
            type: 'POST',
            success: function(text) {
                window.location.href = "https://lapor-pkl.herokuapp.com/admin/laporan";
            },
            failure: function(errMsg) {
                alert(errMsg);
            }
        });
    }
}