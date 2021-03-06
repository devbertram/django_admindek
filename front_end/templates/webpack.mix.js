let mix = require('laravel-mix');

mix.js('src/js/components/Authentication/LoginFormMainComp.js', 'static/build/js/Authentication').react();
mix.js('src/js/components/Utils/FullPageLoaderComp.js', 'static/build/js/Utils').react();
mix.js('src/js/components/Utils/ToastNotificationComp.js', 'static/build/js/Utils').react();
mix.js('src/js/components/DashboardMain.js', 'static/build/js/').react();

mix.js('src/js/components/User/UserMain.js', 'static/build/js/User').react();
mix.js('src/js/components/Menu/MenuMain.js', 'static/build/js/Menu').react();