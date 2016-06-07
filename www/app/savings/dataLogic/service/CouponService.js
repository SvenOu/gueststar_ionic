app.factory('CouponService', function (MessageLogManager) {
    var CouponService = {

        useCoupon: function (couponId) {
            MessageLogManager.log("CouponService.useCoupon",{couponId: couponId});
            return null;
        },

        getCouponsWithZipcodeGroup: function (requestZipcode) {
            MessageLogManager.log("CouponService.getCouponsWithZipcodeGroup",{requestZipcode: requestZipcode});
            return null;
        },

        getCouponImageBitmap: function (coupon) {
            MessageLogManager.log("CouponService.getCouponImageBitmap",{coupon: coupon});
            return null;
        }
    };
    return CouponService;
});