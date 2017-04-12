var express = require('express'),
  engine = require('ejs-mate'),
  app = express();

var path = require('path');
var mongodb = require("mongodb");
var bodyParser = require("body-parser");
var ObjectID = mongodb.ObjectID;
var PKL_COLLECTION = "pkl_collection";
var PENDUDUK_COLLECTION = "penduduk";
var ADMIN_COLLECTION = "admin";
var KEGIATAN_COLLECTION = "kegiatan";
var LAPORAN_COLLECTION = "laporan";
var db;

app.engine('ejs',engine);
app.set('port', (process.env.PORT || 5000));

mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(app.get('port'), function () {
	var port = server.address().port;
    console.log("Database now running on port", port);
  });
});

function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

app.set('views',__dirname + '/public');
app.set('view engine','ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());


//UNTUK MASYARAKAT
//===================================================================
app.get('/',function(req,res,next) {
  res.render('index');
});

app.get('/register', function(req, res, next) {
  res.render('_public-register');
});

app.get('/register-pkl', function(req, res,next) {
  res.render('_public-register-pkl');
});

app.get('/lapor-pkl', function(req, res, next) {
  res.render('_public-lapor-pkl');
});

app.get('/main', function(req, res, next) {
  res.render('_public-main');
});

app.get('/detail/:id', function(req, res, next) {
  db.collection(PKL_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get contact");
    } else {
      var uploadStamp = new Date(doc.date);
      var uploadTime = uploadStamp.getDate() + '/' + (uploadStamp.getMonth()+1) + '/' + uploadStamp.getFullYear();
      res.render('_public-detail', {name: doc.name, type: doc.type, address: doc.address, start: doc.start, end: doc.end, capital: doc.capital, resource: doc.resource, date: uploadTime});
    }
  });
});

app.get('/kegiatan', function(req, res, next) {
  res.render('_public-kegiatan');
});

app.get('/kegiatan-detail/:id', function(req, res, next) {
  res.render('_public-kegiatan-detail');
});


//===================================================================


//UNTUK ADMIN
//===================================================================

app.get('/admin', function(req, res, next) {
  res.render('_admin-login');
});

app.get('/admin/register', function(req, res, next) {
  res.render('_admin-register');
});

app.get('/admin/main', function(req, res, next) {
  res.render('_admin-main');
});

app.get('/admin/detail/:id', function(req, res, next) {
  db.collection(PKL_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get contact");
    } else {
      var uploadStamp = new Date(doc.date);
      var uploadTime = uploadStamp.getDate() + '/' + (uploadStamp.getMonth()+1) + '/' + uploadStamp.getFullYear();
      res.render('_admin-detail', {id: doc._id, name: doc.name, type: doc.type, address: doc.address, start: doc.start, end: doc.end, capital: doc.capital, resource: doc.resource, date: uploadTime});
    }
  });
});

app.get('/admin/register-pkl', function(req, res, next) {
  res.render('_admin-register-pkl');
});

app.get('/admin/laporan', function(req, res, next) {
  res.render('_admin-laporan');
});

app.get('/admin/laporan-detail/:id', function(req, res, next) {
  db.collection(LAPORAN_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get contact");
    } else {
      var uploadStamp = new Date(doc.date);
      var uploadTime = uploadStamp.getDate() + '/' + (uploadStamp.getMonth()+1) + '/' + uploadStamp.getFullYear();
      res.render('_admin-laporan-detail', {id: doc._id, name: doc.namaLaporan, address: doc.lokasiLaporan, description: doc.deskripsiLaporan, date: uploadTime});
    }
  });
});

app.get('/admin/kegiatan', function(req, res, next) {
  res.render('_admin-kegiatan');
});

app.get('/admin/kegiatan-detail/:id', function(req, res, next) {
  res.render('_admin-kegiatan-detail');
});

app.get('/admin/add-kegiatan', function(req, res) {
  res.render('_admin-add-kegiatan');
});




//==================================================================
//Modul Pengguna
//========================================================================

app.get('/api/register-penduduk', function(req, res, next) {

  db.collection(PENDUDUK_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get contacts.");

    } else {
      res.status(200).json(docs);
    }
  });
});

app.get('/api/register-admin', function(req, res, next) {

  db.collection(ADMIN_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get contacts.");

    } else {
      res.status(200).json(docs);
    }
  });
});

app.post('/api/register-penduduk', function(req, res, next) {

  var newPenduduk = req.body;
  var success = false;
  db.collection(PENDUDUK_COLLECTION).find({'email':req.body.email}).count(function(err, count) {
    if (err) {
      handleError(res, err.message, "Failed to get contacts.");

    } else {
        if (count == 0) {
          success = true;
          db.collection(PENDUDUK_COLLECTION).insertOne(newPenduduk, function(err, docs) {
            if (err) {
              handleError(res, err.message, "Failed to get contacts.");
            }
          });
        }
    }
    if (success) {
      res.status(200).send("success");
    }
    else {
      res.status(200).send('email already used');
    }
  });
});

app.post('/api/register-admin', function(req, res, next) {

  var newAdmin = req.body;
  var success = false;
  db.collection(ADMIN_COLLECTION).find({'email':req.body.email}).count(function(err, count) {
    if (err) {
      handleError(res, err.message, "Failed to get contacts.");

    } else {
        if (count == 0) {
          success = true;
          db.collection(ADMIN_COLLECTION).insertOne(newAdmin, function(err, docs) {
            if (err) {
              handleError(res, err.message, "Failed to get contacts.");

            }            
          });
        }
    }
    if (success) {
      res.status(200).send("success");
    }
    else {
      res.status(200).send('email already used');
    }
  });
});

app.post('/api/login-penduduk', function(req, res, next) {

  var newPenduduk = req.body;
  db.collection(PENDUDUK_COLLECTION).findOne({'email':req.body.email}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to get contacts.");

    };
    if (result) {
      if (req.body.password == result.password) {
        res.status(200).send('success');
      }
      else {
        res.status(401).send('authentication failed');
      }
    } 
    else {
      res.status(401).send('authentication failed');
    }
  });
});

app.post('/api/login-admin', function(req, res, next) {

  var newAdmin = req.body;
  db.collection(ADMIN_COLLECTION).findOne({'email':req.body.email}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to get contacts.");
    };
    if (result) {
      if (req.body.password == result.password) {
        res.status(200).send('success');
      }
      else {
        res.status(401).send('authentication failed');
      }
    } 
    else {
      res.status(401).send('authentication failed');
    }
  });
});


//==================================================================================
//MODUL PKL
//==================================================================================

app.get('/api/register-pkl-db', function(req, res, next) {
	db.collection(PKL_COLLECTION).find({}).sort({'date': -1}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get contacts.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post('/api/register-pkl-db', function(req, res, next) {
  var newPKL = req.body;
  if (!req.body.name) {
    handleError(res, "Invalid user inputs", "Must provide a name.", 400);
  }

  db.collection(PKL_COLLECTION).insertOne(newPKL, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new contact.");
    } else {
      res.status(200).send("success");
    }
  });
});

app.get('/api/valid-pkl-db', function(req, res, next) {
  db.collection(PKL_COLLECTION).find({status: "valid"}).sort({'date': -1}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get contacts.");
    } else {
      res.status(200).json(docs);
    }
  });
});


app.get('/api/get-pkl/:id', function(req, res, next) {
  db.collection(PKL_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get contact");
    } else {
      res.status(200).json(doc);
    }
  });
});


app.post('/api/verifikasiPKL/:id', function(req, res, next) {
  db.collection(PKL_COLLECTION).update({ _id: new ObjectID(req.params.id) }, {$set: {status:"valid"}}, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get contact");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.delete('/api/deletePKL/:id', function(req, res, next) {
  db.collection(PKL_COLLECTION).remove({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get contact");
    } else {
      res.status(200).json(doc);
    }
  });
});



//==================================================================================
//MODUL Kegiatan
//==================================================================================

app.post('/api/kegiatan-db', function(req, res, next) {
  var newKegiatan = req.body;
  if (!req.body.namaKegiatan) {
    handleError(res, "Invalid inputs", "Must provide a nama kegiatan.", 400);
  }

  db.collection(KEGIATAN_COLLECTION).insertOne(newKegiatan, function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to create.");
    } else {
      res.status(200).send("success");
    }           
  });

});

app.post('/api/kegiatan-db/:id', function(req, res, next) {
  db.collection(KEGIATAN_COLLECTION).remove({ _id: new ObjectID(req.params.id) }, function(err) {
    if (err) {
      handleError(res, err.message, "Failed to remove");
    } else {
      
      res.status(200);
    }
  });
});

app.get('/api/kegiatan-db', function(req, res, next) {
  db.collection(KEGIATAN_COLLECTION).find({}).sort({'date': -1}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.get('/api/kegiatan-db/:id', function(req, res, next) {
  db.collection(KEGIATAN_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get contact");
    } else {
      res.status(200).json(doc);
    }
  });
});

//==================================================================================
//MODUL LAPOR
//==================================================================================

app.get('/api/daftar-laporan-db', function(req, res, next) {
  db.collection(LAPORAN_COLLECTION).find({}).sort({'date': -1}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get laporan.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post('/api/daftar-laporan-db', function(req, res, next) {
  var newLAPORAN = req.body;

  db.collection(LAPORAN_COLLECTION).insertOne(newLAPORAN, function(err, doc, success) {
    if (err) {
      handleError(res, err.message, "Failed to create new laporan.");
    } else {
      success = true;
    }
  });
  res.status(200).send("success");
});

app.delete('/api/daftar-laporan-db/:id', function(req, res, next) {
  db.collection(LAPORAN_COLLECTION).remove({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get contact");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.post('/api/laporan-selesai/:id', function(req, res, next) {
  db.collection(LAPORAN_COLLECTION).update({ _id: new ObjectID(req.params.id) }, {$set: {status:"valid"}}, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get contact");
    } else {
      res.status(200).json(doc);
    }
  });
});