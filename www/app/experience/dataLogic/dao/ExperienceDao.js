app.factory('ExperienceDao', function (sqlManager) {
    var ExperienceDao = {
        findIdByStatusIsX: function () {
            var sql = "SELECT perform_id FROM eval_perform WHERE status = 'X'",
                params = null;
            return sqlManager.execute(sql, params, "ExperienceDao.findIdByStatusIsX");
        },
        findCountAfterLockDate: function (lastSurveyDate, lockDate) {
            var sql = "SELECT count(*) " +
                    "FROM(" +
                    "	SELECT DISTINCT strftime('%Y-%m-%d', datetime(ifnull(lock_date, create_date))) AS lock_date " +
                    "	FROM eval_perform " +
                    "	WHERE (strftime('%Y%m%d', datetime(?) ) - strftime('%Y%m%d', datetime(ifnull(lock_date, create_date)) )) <0 " +
                    ") A " +
                    "WHERE (strftime('%Y%m%d', datetime(?)) - strftime('%Y%m%d', datetime(lock_date) ))  = 0 ",
                params = [
                    lastSurveyDate,
                    lockDate
                ];
            return sqlManager.execute(sql, params, "ExperienceDao.findCountAfterLockDate");
        },
        findCountOnTheSameDay: function () {
            var sql = "SELECT COUNT(*) FROM eval_perform " +
                    "WHERE strftime('%Y%m%d',CURRENT_TIMESTAMP) - strftime('%Y%m%d',create_date) = 0 AND status = 'P'",
                params = null;
            return sqlManager.execute(sql, params, "ExperienceDao.findCountOnTheSameDay");
        },
        findBookIdForAnswerTypeYesNoWithoutCheckedAnyChildren: function (performId) {
            var sql = "SELECT x.book_id AS bookId " +
                    "FROM (" +
                    "	SELECT a.book_id, b.children_count " +
                    "	FROM eval_book a " +
                    "		INNER JOIN lib_book b " +
                    "				ON a.version_id = b.version_id " +
                    "				AND a.book_id = b.book_id " +
                    "	WHERE perform_id = ? AND a.answer_type = 'YES_NO' " +
                    "		AND a.value0 = 'NO' AND b.children_count > 0" +
                    ")X " +
                    "	INNER JOIN " +
                    "(" +
                    "	SELECT distinct x.parent_id, count(a.book_id) AS no_check_count " +
                    "	FROM eval_book a " +
                    "		LEFT JOIN lib_book x " +
                    "				ON a.version_id = x.version_id " +
                    "				AND a.book_id = x.book_id " +
                    "				AND x.answer_type = 'SELECTION' " +
                    "	WHERE x.parent_id IS NOT NULL AND IFNULL(a.value0, '') != '1' " +
                    "		AND a.perform_id = ? GROUP BY x.parent_id" +
                    ")Y ON x.book_id = y.parent_id " +
                    "WHERE x.children_count = y.no_check_count " +
                    "LIMIT 1",
                params = [
                    performId
                ];
            return sqlManager.execute(sql, params, "ExperienceDao.findBookIdForAnswerTypeYesNoWithoutCheckedAnyChildren");
        },
        //测试模块
        test: function () {
            console.log("----begin ExperienceDao.test()----");
            var performId = "1430720538242DKWS";
            ExperienceDao.findIdByStatusIsX().then(function (res) {
                ExperienceDao.findCountAfterLockDate('2015-5-04','2015-5-04').then(function (res) {
                    ExperienceDao.findBookIdForAnswerTypeYesNoWithoutCheckedAnyChildren(performId).then(function (res) {
                        console.log("----end ExperienceDao.test()----");
                    });
                });
            });
        }
    };
    return ExperienceDao;
});