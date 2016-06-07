app.factory('CouponDao', function (sqlManager) {
    var COUPONS_TABEL_NAME = "coupons";
    var CouponDao = {
        insert: function (coupon) {
            var sql = "INSERT INTO coupons (coupon_id,lib_coupon_id,product_id,product_name,coupon_code,discount_type,"+
                    "image_url,desc1,desc2,desc3,category,used_place,account_no,perform_id,complaint_id,effective_date,"+
                    "expire_date,create_date,push_date,used_date,active,used,lat,lng,savings,udts,star_quantity,"+
                    "applicable_area,scope,scope_value,data_type) "+
                    "VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
                params = [
                    coupon.couponId,
                    coupon.libCouponId,
                    coupon.productId,
                    coupon.productName,
                    coupon.couponCode,
                    coupon.discountType,
                    coupon.imageUrl,
                    coupon.desc1,
                    coupon.desc2,
                    coupon.desc3,
                    coupon.category,
                    coupon.usedPlace,
                    coupon.accountNo,
                    coupon.performId,
                    coupon.complaintId,
                    coupon.effectiveDate,
                    coupon.expireDate,
                    coupon.createDate,
                    coupon.pushDate,
                    coupon.usedDate,
                    coupon.active,
                    coupon.used,
                    coupon.lat,
                    coupon.lng,
                    coupon.savings,
                    coupon.udts,
                    coupon.starQuantity,
                    coupon.applicableArea,
                    coupon.scope,
                    coupon.scopeValue,
                    coupon.dataType
                ];
            return sqlManager.execute(sql, params, "CouponDao.insert");
        },
        update: function (coupon) {
            var sql = "UPDATE coupons SET lib_coupon_id = ?, product_id = ?, product_name = ?, coupon_code = ?,"+
                    " discount_type = ?, image_url = ?, desc1 = ?, desc2 = ?, desc3 = ?, category = ?,"+
                    " used_place = ?, account_no = ?,  perform_id = ?, complaint_id = ?, effective_date = ?,"+
                    " expire_date = ?, create_date = ?, push_date = ?, used_date = ?, active = ?, used = ? ,"+
                    " lat = ?, lng = ?, savings = ?, udts = ?, star_quantity = ?, applicable_area = ?,"+
                    "scope = ?, scope_value = ?, data_type = ?  WHERE coupon_id = ?",
                params = [
                    coupon.libCouponId,
                    coupon.productId,
                    coupon.productName,
                    coupon.couponCode,
                    coupon.discountType,
                    coupon.imageUrl,
                    coupon.desc1,
                    coupon.desc2,
                    coupon.desc3,
                    coupon.category,
                    coupon.usedPlace,
                    coupon.accountNo,
                    coupon.performId,
                    coupon.complaintId,
                    coupon.effectiveDate,
                    coupon.expireDate,
                    coupon.createDate,
                    coupon.pushDate,
                    coupon.usedDate,
                    coupon.active,
                    coupon.used,
                    coupon.lat,
                    coupon.lng,
                    coupon.savings,
                    coupon.udts,
                    coupon.starQuantity,
                    coupon.applicableArea,
                    coupon.scope,
                    coupon.scopeValue,
                    coupon.dataType,
                    coupon.couponId
                ];
            return sqlManager.execute(sql, params, "CouponDao.update");
        },
        updateFields: function (couponId, values) {
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
            var sql = "UPDATE coupons SET "+ sqlState + " WHERE coupon_id = ?" ,
                params = [
                    couponId
                ];
            return sqlManager.execute(sql, params, "CouponDao.updateFields");
        },
        updateField: function (couponId, field, value) {
            var sql = "UPDATE coupons SET "+field+" = '"+value+"'  WHERE coupon_id = ?" ,
                params = [
                    couponId
                ];
            return sqlManager.execute(sql, params, "CouponDao.updateField");
        },
        findByKey: function (couponId) {
            var sql = "SELECT * FROM coupons WHERE coupon_id = ?" ,
                params = [
                    couponId
                ];
            return sqlManager.execute(sql, params, "CouponDao.findByKey");
        },
        findAvailableCouponsByZipCodeAllLanguage: function (zipCode) {
            var sql = "SELECT " +
                "	coupon_id, lib_coupon_id, product_id, product_name, " +
                "	coupon_code,savings,discount_type, effective_date, expire_date, " +
                "	image_url, desc1, desc2, desc3, create_date, category, active, " +
                "	push_date,used, used_date, used_place, account_no,lat, lng, perform_id, " +
                "	complaint_id, udts, applicable_area, scope, scope_value, data_type " +
                "FROM coupons " +
                "WHERE active = '1' " +
                "	and used = 0 and date(expire_date) >= datetime(CURRENT_TIMESTAMP,'localtime') " +
                "   and (" +
                "			scope = 'National' " +
                "			or (" +
                "				scope = 'Custom' and scope_value IN (" +
                "					SELECT DISTINCT area FROM conf_zipcode_area WHERE zip_code = ? " +
                "					)" +
                "				)" +
                "			or (scope = 'Zip' AND scope_value LIKE  ? )" +
                "			or (scope = 'Exclude Zip' AND scope_value NOT LIKE ? )" +
                "		) " +
                "ORDER BY push_date DESC" ,
                params = [
                    zipCode,
                    "%" + zipCode + "%",
                    "%" + zipCode + "%"
                ];
            return sqlManager.execute(sql, params, "CouponDao.findAvailableCouponsByZipCode");
        },
        findAvailableCouponsByZipCode: function (zipCode, languageCode) {
            if("undefined" == typeof(languageCode)){
                return findAvailableCouponsByZipCodeAllLanguage();
            }
            var sql = "SELECT " +
                "	X.coupon_id, X.lib_coupon_id, X.product_id, X.product_name, X." +
                "	coupon_code,X.savings,X.discount_type, X.effective_date, X.expire_date, X." +
                "	image_url, Y.desc1, Y.desc2, Y.desc3, X.create_date, X.category, X.active, X." +
                "	push_date,X.used, X.used_date, X.used_place, X.account_no,X.lat, X.lng, X.perform_id, X." +
                "	complaint_id, X.udts, X.applicable_area, X.scope, X.scope_value, X.data_type " +
                "FROM coupons X INNER JOIN trans_coupons Y ON X.lib_coupon_id = Y.lib_coupon_id AND Y.language_code = ? " +
                "WHERE active = '1' " +
                "	and used = 0 and date(expire_date) >= datetime(CURRENT_TIMESTAMP,'localtime') " +
                "   and (" +
                "			scope = 'National' " +
                "			or (" +
                "				scope = 'Custom' and scope_value IN (" +
                "					SELECT DISTINCT area FROM conf_zipcode_area WHERE zip_code = ? " +
                "					)" +
                "				)" +
                "			or (scope = 'Zip' AND scope_value LIKE  ? )" +
                "			or (scope = 'Exclude Zip' AND scope_value NOT LIKE ? )" +
                "		) " +
                "ORDER BY push_date DESC" ,
                params = [
                    languageCode,
                    zipCode,
                    "%" + zipCode + "%",
                    "%" + zipCode + "%"
                ];
            return sqlManager.execute(sql, params, "CouponDao.findAvailableCouponsByZipCode");
        },
        findLastUdts: function () {
            var sql = "SELECT ifnull(max(udts), 0) FROM coupons" ,
                params = null;
            return sqlManager.execute(sql, params, "CouponDao.findLastUdts");
        },
        //测试模块
        test: function () {
            console.log("----begin CouponDao.test()----");
            var coupon = {
                couponId: 1,
                libCouponId: 2,
                productId: 3,
                productName: 4,
                couponCode: 5,
                discountType: 6,
                imageUrl: 7,
                desc1: 8,
                desc2: 9,
                desc3: 10,
                category: 11,
                usedPlace: 12,
                accountNo: 13,
                performId: 14,
                complaintId: 15,
                effectiveDate: 16,
                expireDate: 17,
                createDate: 18,
                pushDate: 19,
                usedDate: 20,
                active: 21,
                used: 22,
                lat: 23,
                lng: 24,
                savings: 25,
                udts: 26,
                starQuantity: 27,
                applicableArea: 28,
                scope: 29,
                scopeValue: 30,
                dataType: 31
            };
            var coupon_2 = {
                couponId: 1,
                libCouponId: 22,
                productId: 33,
                productName: 44,
                couponCode: 55,
                discountType: 66,
                imageUrl: 77,
                desc1: 88,
                desc2: 99,
                desc3: 100,
                category: 110,
                usedPlace: 120,
                accountNo: 130,
                performId: 140,
                complaintId: 150,
                effectiveDate: 160,
                expireDate: 170,
                createDate: 180,
                pushDate: 190,
                usedDate: 200,
                active: 210,
                used: 220,
                lat: 230,
                lng: 240,
                savings: 250,
                udts: 260,
                starQuantity: 270,
                applicableArea: 280,
                scope: 290,
                scopeValue: 300,
                dataType: 310
            };
            var updateFields = [
                {
                    field: 'lib_coupon_id',
                    value: 22222
                },
                {
                    field: 'product_id',
                    value: 33333
                }
            ];

            CouponDao.insert(coupon).then(function (res) {
                CouponDao.update(coupon_2).then(function (res) {
                    CouponDao.updateFields(coupon.couponId,updateFields).then(function (res) {
                        CouponDao.updateField(coupon.couponId,"product_name","44444").then(function (res) {
                            CouponDao.findByKey(coupon.couponId).then(function (res) {
                                CouponDao.findAvailableCouponsByZipCodeAllLanguage('10152').then(function (res) {
                                    CouponDao.findAvailableCouponsByZipCodeAllLanguage('10152','en').then(function (res) {
                                        console.log("----end CouponDao.test()----");
                                    });
                                });
                            });
                        });
                    });
                });
            });
        }
    };
    return CouponDao;
});