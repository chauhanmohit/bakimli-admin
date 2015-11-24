(function() {
    'use strict';

    angular.module('bakimliMenu').value('Sidebars', {
        anonymousUser: [
            {
                title: 'Login',
                icon: '&#xE7FF;',
                link: 'login'
            },
            {
                title: 'Sign Up',
                icon: '&#xE7FE;',
                link: 'app.signup'
            },
            {
                title: 'Blog',
                icon: '&#xE0BF;',
                link: 'app.blog.index'
            },
            {
                title: 'Help Center',
                icon: '&#xE887;',
                link: 'app.help'
            }
        ],
        activeUser: [
            {
                title: 'Dashboard',
                icon: '&#xE871;',
                link: 'app.dashboard'
            },
            {
                title: 'Blog',
                icon: '&#xE0BF;',
                link: 'app.blog.index'
            },
            {
                title: 'Help Center',
                icon: '&#xE887;',
                link: 'app.help'
            }
        ],
        inactiveUser: [
            {
                title: 'Professional Profile',
                icon: '&#xE851;',
                link: 'app.signup'
            },
            {
                title: 'Blog',
                icon: '&#xE0BF;',
                link: 'app.blog.index'
            },
            {
                title: 'Help Center',
                icon: '&#xE887;',
                link: 'app.help'
            }
        ]
    });
})();