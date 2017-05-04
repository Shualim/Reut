angular.module('app.controllers', [])

.controller('dayTimeCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
  $scope.appointments.push({startTime:"6",endTime:"7",theraphistName:"Shimon", location: "206"});
    $scope.appointments.push({startTime:"6",endTime:"7",theraphistName:"Shimon", location: "206"});

  $scope.appointments.push({startTime:"6",endTime:"7",theraphistName:"Shimon", location: "206"});

  $scope.appointments.push({startTime:"6",endTime:"7",theraphistName:"Shimon", location: "206"});

}])
