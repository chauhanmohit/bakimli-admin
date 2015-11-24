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
                link: 'app.home.help'
            }
        ],
        activeUser: [
            {
                title: 'Dashboard',
                icon: '&#xE871;',
                link: 'app.dashboard'
            },
            {
                title: 'Profile',
                icon: '&#xE871;',
                submenu: [
                    {
                        title: 'Basic info',
                        link: 'app.professionals.profile({view:"basic"})'
                    },
                    {
                        title: 'Contact info',
                        link: 'app.professionals.profile({view:"contacts"})'
                    },
                    {
                        title: 'Photos',
                        link: 'app.professionals.photos'
                    },
                    {
                        title: 'Products',
                        link: 'app.professionals.profile({view:"products"})'
                    },
                    {
                        title: 'Services',
                        link: 'app.professionals.profile({view:"services"})'
                    }
                ]
            },
            {
                title: 'Blog',
                icon: '&#xE0BF;',
                link: 'app.blog.index'
            },
            {
                title: 'Help Center',
                icon: '&#xE887;',
                link: 'app.home.help'
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
                link: 'app.home.help'
            }
        ]
    });
})();