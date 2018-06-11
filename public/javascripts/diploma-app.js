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

    $scope.checkDiploma = function() {
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
    	var formdata = new FormData();
    	angular.forEach($scope.files,function(file){
        	formdata.append('diploma',file);
        });
        $http.post('/uploadTangle', formdata, {
			transformRequest: angular.identity,
			headers: {'Content-Type': undefined}                     
	    }).success(function(data) {
	    	$scope.receivedData = data;
			$scope.checkValidity();
		});
    }

    $scope.checkValidity = function(data) {
    	$http.post('/checkTangle', $scope.receivedData).
	    success(function(data, status, headers, config) {
			console.log(data);
			$scope.result = data;
		}).
		error(function(data, status, headers, config) {
			console.log(data);
		});
    }
});