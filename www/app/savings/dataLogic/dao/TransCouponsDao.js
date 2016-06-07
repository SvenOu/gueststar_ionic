app.factory('TransCouponsDao', function (sqlManager) {
    var TRANS_COUPONS_TABEL_NAME = "trans_coupons";
    var TransCouponsDao = {
        insert: function (transCoupon) {
            var sql = "INSERT INTO trans_coupons (lib_coupon_id, version_id, language_code, desc1, desc2, desc3) VALUES (?,?,?,?,?,?)",
                params = [
                    transCoupon.libCouponId,
                    transCoupon.versionId,
                    transCoupon.languageCode,
                    transCoupon.desc1,
                    transCoupon.desc2,
                    transCoupon.desc3
                ];
            return sqlManager.execute(sql, params, "TransCouponsDao.insert");
        },
        update: function (transCoupon) {
            var sql = "UPDATE trans_coupons SET desc1 = ?, desc2 = ?, desc3 = ? WHERE lib_coupon_id =? and version_id = ? and language_code =?",
                params = [
                    transCoupon.desc1,
                    transCoupon.desc2,
                    transCoupon.desc3,
                    transCoupon.libCouponId,
                    transCoupon.versionId,
                    transCoupon.languageCode
                ];
            return sqlManager.execute(sql, params, "TransCouponsDao.update");
        },
        updateFields: function (libCouponId, versionId, languageCode, values) {
            //values = [{
            //    field: xx,
            //    value: ''
            //}]//此种形式
            var sqlState = "";
            angular.forEach(values, function(item, index) {
                sqlState += (item.field + " = '"+ item.value+ "'");
                if((values.length -1) != index)
                    sqlState += ",";
            });
            var sql = "UPDATE trans_coupons SET "+ sqlState + " WHERE lib_coupon_id =? and version_id = ? and language_code =?" ,
                params = [
                    libCouponId,
                    versionId,
                    languageCode
                ];
            return sqlManager.execute(sql, params, "TransCouponsDao.updateFields");
        },
        updateField: function (libCouponId, versionId, languageCode, field, value) {
            var sql = "UPDATE trans_coupons SET "+field+" = '"+value+"' WHERE lib_coupon_id =? and version_id = ? and language_code =?" ,
                params = [
                    libCouponId,
                    versionId,
                    languageCode
                ];
            return sqlManager.execute(sql, params, "TransCouponsDao.updateField");
        },
        findByKey: function (libCouponId, versionId, languageCode) {
            var sql = "SELECT * FROM trans_coupons WHERE lib_coupon_id =? and version_id = ? and language_code =?" ,
                params = [
                    libCouponId,
                    versionId,
                    languageCode
                ];
            return sqlManager.execute(sql, params, "TransCouponsDao.findByKey");
        },
        //测试模块
        test: function () {
            console.log("----begin TransCouponsDao.test()----");
            var transCoupon = {
                libCouponId: 1,
                versionId: 2,
                languageCode: 3,
                desc1: 4,
                desc2: 5,
                desc3: 6
            };
            var transCoupon_2 = {
                libCouponId: 1,
                versionId: 2,
                languageCode: 3,
                desc1: 44,
                desc2: 55,
                desc3: 66
            };

            var updateFields = [
                {
                    field: 'desc1',
                    value: 44444
                },
                {
                    field: 'desc2',
                    value: 55555
                }
            ];

            TransCouponsDao.insert(transCoupon).then(function (res) {
                TransCouponsDao.update(transCoupon_2).then(function (res) {
                    TransCouponsDao.updateFields(transCoupon.libCouponId,transCoupon.versionId,transCoupon.languageCode,updateFields).then(function (res) {
                        TransCouponsDao.updateField(transCoupon.libCouponId,transCoupon.versionId,transCoupon.languageCode,"desc3","66666").then(function (res) {
                            TransCouponsDao.findByKey(transCoupon.libCouponId,transCoupon.versionId,transCoupon.languageCode).then(function (res) {
                                console.log("----end TransCouponsDao.test()----");
                            });
                        });
                    });
                });
            });
        }
    };
    return TransCouponsDao;
});