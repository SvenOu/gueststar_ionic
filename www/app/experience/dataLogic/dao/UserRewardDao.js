app.factory('UserRewardDao', function (sqlManager) {
    var USER_REWARDS_TABLE_NAME = "user_rewards";
    var UserRewardDao = {
        findProfile: function () {
            var sql = "SELECT * FROM user_rewards WHERE profile_id IN (SELECT profile_id FROM user_profile)",
                params = null;
            return sqlManager.execute(sql, params, "UserRewardDao.findProfile");
        },
        update: function (userReward) {
            var sql = "UPDATE user_rewards SET rewards = ?, surveys = ?, visits = ?, create_date = ?, update_date = ?,"+
                    "  last_survey_date = ?, last_perform_id = ?, first_reward = ?  WHERE profile_id = ?",
                params = [
                    userReward.rewards,
                    userReward.surveys,
                    userReward.visits,
                    userReward.createDate,
                    userReward.updateDate,
                    userReward.lastSurveyDate,
                    userReward.lastPerformId,
                    userReward.firstReward,
                    userReward.profileId
                ];
            return sqlManager.execute(sql, params, "UserRewardDao.update");
        },
        insert: function (userReward) {
            var sql = "INSERT INTO user_rewards (profile_id, rewards, surveys, visits, create_date, update_date, last_survey_date, last_perform_id, first_reward) VALUES(?,?,?,?,?,?,?,?,?)" ,
                params = [
                    userReward.profileId,
                    userReward.rewards,
                    userReward.surveys,
                    userReward.visits,
                    userReward.createDate,
                    userReward.updateDate,
                    userReward.lastSurveyDate,
                    userReward.lastPerformId,
                    userReward.firstReward
                ];
            return sqlManager.execute(sql, params, "UserRewardDao.insert");
        },
        //测试模块
        test: function () {
            console.log("----begin UserRewardDao.test()----");
            var userReward = {
                profileId: 1,
                rewards: 2,
                surveys: 3,
                visits: 4,
                createDate: 5,
                updateDate: 6,
                lastSurveyDate: 7,
                lastPerformId: 8,
                firstReward: 9
            };
            var userReward_2 = {
                profileId: 1,
                rewards: 22,
                surveys: 33,
                visits: 44,
                createDate: 55,
                updateDate: 66,
                lastSurveyDate: 77,
                lastPerformId: 88,
                firstReward: 99
            };

            UserRewardDao.insert(userReward).then(function (res) {
                UserRewardDao.update(userReward_2).then(function (res) {
                    UserRewardDao.findProfile(userReward.profileId).then(function (res) {
                        console.log("----end UserRewardDao.test()----");
                    });
                });
            });
        }
    };
    return UserRewardDao;
});