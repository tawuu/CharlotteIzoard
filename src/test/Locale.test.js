const LocaleLoader = new(require("../loaders/LocaleLoader"))(null)

test('Fazer download das locales com sucesso', () => {
    LocaleLoader.load()
});