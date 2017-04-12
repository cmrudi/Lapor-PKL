var pklApp = angular.module("pklApp", [], function($locationProvider){
    $locationProvider.html5Mode({
    	enabled: true,
  		requireBase: false
    });
});

pklApp.controller('pklCtrl', function($scope, $http) {
    $http.get("https://lapor-pkl.herokuapp.com/api/register-pkl-db").then(function (response) {
        $scope.PKL = response.data;
        console.log($scope.PKL);
    });
});

pklApp.controller('allpklCtrl', function($scope, $http) {
    $http.get("https://lapor-pkl.herokuapp.com/api/valid-pkl-db").then(function (response) {
        $scope.PKL = response.data;
    });
});

pklApp.controller('kegiatanCtrl', function($scope, $http) {
    $http.get("https://lapor-pkl.herokuapp.com/api/kegiatan-db").then(function (response) {
        $scope.kegiatan = response.data;
    });
});

pklApp.controller('kegiatanByIdCtrl', function($window, $location, $scope, $http) {
	var pId = $location.path().split("/")[3]||$location.path().split("/")[2]||"Unknown";   
    console.log(pId);
    var path = "https://lapor-pkl.herokuapp.com/api/kegiatan-db/" + pId;
    console.log(path);
    $http.get(path).then(function (response) {
        $scope.kegiatan = response.data;
        console.log($scope.kegiatan);
    });

    $scope.deleteKegiatan = function() {
    	$http.post(path);
    	console.log("click");
    	alert("Data kegiatan berhasil dihapus !");
    	$window.location.href = "https://lapor-pkl.herokuapp.com/admin/kegiatan";
 	};
});

pklApp.controller('laporanCtrl', function($scope,$http) {
    $http.get("https://lapor-pkl.herokuapp.com/api/daftar-laporan-db").then(function (response) {
        $scope.laporan = response.data;
        console.log($scope.laporan);
    });
});