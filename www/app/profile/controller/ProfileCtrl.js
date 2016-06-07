app.controller('ProfileCtrl', function ($rootScope, $scope, $translate) {
    var refreshData = function () {
        $translate(['CHICKEN_WAYS.FAMOUCS_CHICKEN', 'CHICKEN_WAYS.SANDWICHES', 'CHICKEN_WAYS.NEW_MENUS', 'CHICKEN_WAYS.FAMMILY_CHILD']).then(function (translations) {
            var chickenWays = [];
            angular.forEach(translations, function (val, key) {
                var element = {
                    id: key,
                    value: val,
                    isChecked: false
                }
                chickenWays.push(element);
            });
            $scope.CHICKEN_WAYS = chickenWays;
        });

        $translate(['VISIT_WAYS.BREAKFAST', 'VISIT_WAYS.LUNCH', 'VISIT_WAYS.DINNER', 'VISIT_WAYS.LATE_NIGHT']).then(function (translations) {
            var chickenWays = [];
            angular.forEach(translations, function (val, key) {
                var element = {
                    id: key,
                    value: val,
                    isChecked: false
                }
                chickenWays.push(element);
            });
            $scope.VISIT_WAYS = chickenWays;
        });

        $translate(['VISIT_TIMES.FREQUENCECY_1', 'VISIT_TIMES.FREQUENCECY_2', 'VISIT_TIMES.FREQUENCECY_3', 'VISIT_TIMES.FREQUENCECY_4',
            'VISIT_TIMES.FREQUENCECY_5', 'VISIT_TIMES.FREQUENCECY_6']).then(function (translations) {
            var chickenWays = [];
            angular.forEach(translations, function (val, key) {
                var element = {
                    id: key,
                    value: val,
                    isChecked: false
                }
                chickenWays.push(element);
            });
            $scope.VISIT_TIMES = chickenWays;
        });

    };

    $rootScope.$on('$translateChangeSuccess', function () {
        refreshData();
    });

    refreshData();
})