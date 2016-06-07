app.factory('ComplaintService', function (MessageLogManager) {
    var ComplaintService = {

        saveComplaint: function (complaint,bitmap) {
            MessageLogManager.log("ComplaintService.saveComplaint",{complaint: complaint});
            return null;
        },

        saveFeedback: function (complaint) {
            MessageLogManager.log("ComplaintService.saveFeedback",{complaint: complaint});
            return null;
        },

        populateCommontOptions: function () {
            MessageLogManager.log("ComplaintService.populateCommontOptions");
            return null;
        }
    };
    return ComplaintService;
});