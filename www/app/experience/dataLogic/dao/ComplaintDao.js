app.factory('ComplaintDao', function (sqlManager) {
    var ComplaintDao = {
        findCommentOptionsByDataLevelAndParent: function (dataLevel, parentId, languageCode) {
            var sql = "SELECT a.version_id,a.bmu,a.concept,a.book_id,a.parent_id,a.answer_type,b.desc0,a.display_order " +
                "FROM lib_book a " +
                "	INNER JOIN trans_book b ON a.book_id = b.book_id and a.version_id = b.version_id " +
                "	WHERE a.data_level = ? AND a.parent_id = ? AND b.language_code = ? ORDER BY a.display_order";
                params = [
                    dataLevel,
                    parentId,
                    languageCode
                ];
            return sqlManager.execute(sql, params, "ComplaintDao.findCommentOptionsByDataLevelAndParent");
        },
        //测试模块
        test: function () {
            console.log("----begin ComplaintDao.test()----");
            var dataLevel = 1,
                parentId = 'DV-001',
                languageCode = 'en';

            ComplaintDao.findCommentOptionsByDataLevelAndParent(dataLevel,parentId,languageCode).then(function (res) {

            });
        }
    };
    return ComplaintDao;
});