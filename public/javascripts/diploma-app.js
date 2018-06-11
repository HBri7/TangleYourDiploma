var app = angular.module("DiplomaTangle", []); 

app.directive('fileModel', ['$parse', function ($parse) {
    return {
       restrict: 'A',
       link: function(scope, element, attrs) {
          element.bind('change', function(){
          $parse(attrs.fileModel).assign(scope,element[0].files)
             scope.$apply();
          });
       }
    };
}]);

app.controller("DiplomaController", function($scope, $http) {
    $scope.diploma = "";

    $scope.receivedData = undefined;

    $scope.finalResult = undefined;

    $scope.busy = false;

    $scope.checkDiploma = function() {
    	$scope.receivedData = undefined;
    	$scope.finalResult = undefined;
    	var formdata = new FormData();
    	angular.forEach($scope.files,function(file){
        	formdata.append('diploma',file);
        });
        $http.post('/', formdata, {
			transformRequest: angular.identity,
			headers: {'Content-Type': undefined}                     
	    }).success(function(data) {
	    	$scope.receivedData = data;
			$scope.checkValidity();
		});
    }

    $scope.uploadDiploma = function() {
    	$scope.receivedData = undefined;
    	$scope.finalResult = undefined;
    	var formdata = new FormData();
    	angular.forEach($scope.files,function(file){
        	formdata.append('diploma',file);
        });
        $scope.busy = true;
        $http.post('/uploadTangle', formdata, {
			transformRequest: angular.identity,
			headers: {'Content-Type': undefined}                     
	    }).success(function(data) {
	    	$scope.busy = false;
	    	$scope.finalResult = data;
	    	console.log(data);
		});
    }

    $scope.checkValidity = function(data) {
    	$scope.busy = true;
    	$http.post('/checkTangle', $scope.receivedData).
	    success(function(data, status, headers, config) {
	    	$scope.busy = false;
			$scope.finalResult = data;
		}).
		error(function(data, status, headers, config) {
			console.log(data);
		});
    }
});