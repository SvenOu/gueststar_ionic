app.factory('churchsUtils', function () {
    var me = this;
    var churchsUtils = {
        isEmpty: function(str){
            if(str && (str.length > 0 || 'string'!=typeof(str))){
                return false;
            }
            return true;
        },
        xml_str2json: function(xmlObj){
            if(!me.x2js){
                x2js = new X2JS();
            }
            return x2js.xml_str2json(xmlObj);
        }
    };
    return churchsUtils;
});