app.factory('LocationService', function (MessageLogManager) {
    var LocationService = {
        searchAlignmentsWithGEO: function (criteria) {
            MessageLogManager.log("LocationService.searchAlignmentsWithGEO",{criteria: criteria});
            return null;
        }
    };
    return LocationService;
});