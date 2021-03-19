let mix = require('laravel-mix');

mix.js('src/js/components/Authentication/LoginFormMainComp.js', 'static/build/js/Authentication').react();
mix.js('src/js/components/Utils/FullPageLoaderComp.js', 'static/build/js/Utils').react();
mix.js('src/js/components/Utils/ToastNotificationComp.js', 'static/build/js/Utils').react();
mix.js('src/js/components/BaseDashboard/DashboardMain.js', 'static/build/js/BaseDashboard').react();