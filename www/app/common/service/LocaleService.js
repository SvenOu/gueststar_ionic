app.factory('LocaleService', function ($translate) {
    var localeService = {
        changeLocale: function (locale) {
            $translate.use(locale);
            return locale;
        },
        toggleLocale: function () {
            var locale = $translate.proposedLanguage() || $translate.use();
            if (app.LOCALE.EN == locale) {
                $translate.use(app.LOCALE.ES);
                return locale;
            } else if (app.LOCALE.ES == locale) {
                $translate.use(app.LOCALE.EN);
                return locale;
            }
        }
    };
    return localeService;
});