var myApp = angular.module('myApp', []);

myApp.factory('currentUser', function() {
	return {name: String};
})

myApp.config(function($routeProvider) {
	$routeProvider.when('/',
		{
			templateUrl:"front.html",
			controller:"frontCtrl"
		}).when('/:user',
		{
			templateUrl:"user.html",
			controller:"userCtrl"
		}).when('/:user/updateInfo',
		{
			templateUrl:"updateInfo.html",
			controller:"infoCtrl"
		}).when('/:user/changePassword',
		{
			templateUrl:"changePassword.html",
			controller:"passwordCtrl"
		})   
})

//---------------------------------------------------------------------------------
myApp.controller("frontCtrl", function($scope, $http, $location, currentUser) {
	console.log('Inside the controller of frontCtrl' );
	//console.log(currentUser.name);
	$scope.userData = {userName: '', password: '', title: 'Mean Stack Mongoose'}

	$scope.createUser = function() {
		console.log(' Inside the create User function');
		$http.post('/api/users', $scope.userData).success(function(data) {
			console.log(data);
			alert('User Created!!');
			$location.path('/');
		})
	}

	$scope.logIn = function(userName, password) {
		$http.get('/api/login/' + userName + '/' + password).success(function(data) {
			console.log('Inside the lo function');
			if (data == 'Valid login') {
				currentUser.name = userName;
				alert('Login Done!!!');
				$location.path(userName);
			} else if (data == 'Invalid login') {
				$location.path('/');
				alert("That was invalid login information.");
			}
		})
	} 
})

//-------------------------------------------------------------------------------
myApp.controller("userCtrl", function($scope, $http, $location, currentUser) {
	console.log('Inside the controller of userCtrl' );
		us = currentUser.name;
	console.log(currentUser.name);
	$http.get('/api/attrs/' + currentUser.name).success(function(data) {
		$scope.userInfo = data;
	//console.log(currentUser.name);
		$scope.user = {username : us};
	})

	$scope.update = function() {
		$location.path(currentUser.name + '/updateInfo');
		//alert(currentUser.name);
	}

	/*$scope.done = function() {
		console.log('Updating data...');
		$http.put('/api/attrs/' + currentUser.name, $scope.userInfo).success(function(data) {
			$scop.userInfor = data;
			$location.path(currentUser.name);
		})
		console.log('Updated!!');
	} */

	$scope.changePassword = function() {
		$location.path(currentUser.name + '/changePassword');
	}

	$scope.deleteUser = function() {
		$http.delete('/api/users/' + currentUser.name).success(function(data) {
			$location.path('/');
			alert(data);
		})
	}

	$scope.logOut = function() {
		$location.path('/');
	}
})

//-------------------------------------------------------------------------------
myApp.controller("infoCtrl", function($scope, $http, $location, currentUser) {
	
	$scope.done = function() {
		$http.put('/api/attrs/' + currentUser.name, $scope.userInfo).success(function(data) {
			$location.path(currentUser.name);
			$scope.userInfo = data;
			console.log('Updating...!!!');
			console.log(data);
		})
	}

	$scope.cancel = function() {
		$location.path('/' + currentUser.name);
	}
	
})

//-------------------------------------------------------------------------------
myApp.controller("passwordCtrl", function($scope, $http, $location, currentUser) {

	$scope.change = function() {

		$http.put('/api/users/' + currentUser.name, $scope.password).success(function(data) {
			if (data == 'Password Changed') {
				$location.path(currentUser.name);
			} else if (data == 'Invalid') {
				alert('You entered an invalid old password');
			}
		})
	}

	$scope.cancel = function() {
		$location.path('/' + currentUser.name);
	}

})