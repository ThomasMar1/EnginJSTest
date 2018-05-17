var myApp = angular.module('myApp', []);

myApp.controller('ArticleController',['$scope', '$http', '$q', function($scope, $http, $q){
    
     var defer = $q.defer();

    $http.get("https://hacker-news.firebaseio.com/v0/topstories.json")
    .then(
        function(response){
            $scope.articlesArray = response.data;
            $scope.articles = $scope.articlesArray.slice(0,25);
            defer.resolve(response);
            $scope.articlesList = [];
            angular.forEach($scope.articles, function(value, key) {
                $http.get("https://hacker-news.firebaseio.com/v0/item/"+value+".json")
                .then(
                    function(response){
                        $scope.articlesList.push(response.data);
                    
                }).catch(
                    function(response){

                    })





                });
    }).catch(
        function(response){
            console.log("Something went wrong")
            defer.reject(response);
        })

    
}]);



myApp.controller('DeferredController',['$scope', '$http', '$q', function($scope, $http, $q){
    var deferred = $q.defer();
    $scope.getArticles = function(){
        return $http.get({
            method: 'GET',
            url:'https://hacker-news.firebaseio.com/v0/topstories.json'
        })
    }
    $http.get("https://hacker-news.firebaseio.com/v0/topstories.json").then(function(data){
        $scope.articlesArray = data.data;
        $scope.articles = $scope.articlesArray.slice(0,25);
    });



    
}]);

