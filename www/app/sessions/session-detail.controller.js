angular.module('starter')
  .controller('SessionDetailCtrl',function($state, $http){
    var vm = this;
    $http.get("https://graph.facebook.com/v2.2/me", {params: {access_token: $state.params.access_token, fields: "name,gender,location,picture", format: "json" }}).then(function(res) {
      console.log(res);
      vm.name = res.data.name;
      vm.picture = res.data.picture.data.url;
    }, function(error) {
      alert("Error: " + error);
    });
  });