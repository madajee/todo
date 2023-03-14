// MODULE
var angularApp = angular.module('angularApp',['ngRoute']);

angularApp.config(function ($routeProvider){
    $routeProvider
    
    .when('/', {
        templateUrl: 'pages/MainTodo.html',
        controller: 'mainController'
    })
    .when('/edittodo/:id', {
        templateUrl: 'pages/EditTodo.html',
        controller: 'editController'
    })
});

angularApp.controller('mainController', ['$scope', '$location', '$log', '$http', 
    function ($scope, $location, $log, $http) {
    //$log.info($location.path());
    $scope.username = "test";
    $scope.todos = '';
    
    $scope.getTodo = function() {
        $scope.addedTodo = '';
        var uname = $scope.username;
        var getApiPath = '/api/todos/' + uname;
        $http.get(getApiPath)
        .success(function (result) {
            $scope.todos = result;
            //console.log(result);
            //console.log(uname);
        })
        .error(function (data, status) {
            console.log(data);

        }); 
    };

    $scope.newTodo = '';
    $scope.addedTodo = '';
    $scope.addTodo = function() {
        var uname = $scope.username;
        var newTodo = $scope.newTodo;
        if (newTodo) {
            $http.post('/api/todo', {"username": $scope.username, "todo": $scope.newTodo, 
                "isDone": false, "hasAttachment": false})
            .success(function(result){
                //console.log("Post Data Output: " + result.username + " " + result.todo );
                $scope.newTodo = '';
                $scope.addedTodo = uname + " added " + result.todo;
            })
            .error(function (data, status) {
                console.log(data);
            })
        }
    };
    
}]);

angularApp.controller('editController', ['$scope', '$location', '$log', 
    '$http', '$routeParams', 
    function ($scope, $location, $log, $http, $routeParams) {
    //$log.info($location.path());
    $scope.id = $routeParams.id;
    var id = $scope.id;
    var getApiPath = '/api/todo/' + id;
    var todotextdb = '';
    //$scope.todo = '';
    $http.get(getApiPath)
        .success(function (result) {
            //$scope.todo = result;
            $scope.username = result.username;
            $scope.todotext = result.todo;
            todotextdb  = result.todo;
            //console.log(result);
        })
        .error(function (data, status) {
            console.log(data);

        });
    $scope.updateTodoMsg= '';
    $scope.updateTodo = function() { 
        if ($scope.todotext === todotextdb) 
        {
            //console.log("No updated needed");
            //console.log(todotextdb + " " + $scope.todotext);
        }
        else
        {
            //console.log("Update Needed");
            $http.post('/api/todo', {"id": id, "todo": $scope.todotext })
            .success(function(result){
                $scope.updateTodoMsg = "Update " + result;
            })
            .error(function (data, status) {
                console.log(data);
            })
            
        }
    };
}]);