'use strict';

//管理系统模块，admin。声明依赖
var adminApp = angular.module('adminApp', ['ngAnimate','ngTouch','ui.router','ui.grid', 'ui.grid.selection',
     'ui.grid.edit','ui.grid.cellNav', 'ui.grid.pagination', 'ui.grid.resizeColumns', 'ui.grid.moveColumns',
]);

/**
 * 由于整个应用都会和路由打交道，所以这里把$state和$stateParams这两个对象放到$rootScope上，方便其它地方引用和注入。
 * 这里的run方法只会在angular启动的时候运行一次
 */
adminApp.run(function($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
});

/**
 * 配置路由
 * 注意这里采用的是ui-router这个路由，而不是ng原生的路由
 * ng原生的路由不能支持嵌套视图，所以这里必须使用ui-router
 * *****************注意这里的路径配置*****************
 * 执行这里的时候，indexAdmin页面已经载入，所以这里没写
 */
adminApp.config(function($stateProvider, $urlRouterProvider) { //设置路由
    $stateProvider
        .state('admin', {
            url: '/admin',
            views: {
                //顶层部分
                '': {
                    templateUrl: '/tpl/indexAdmin.html',
                    // controller: 'adminCtrl'
                },
                //左侧导航部分
                'navSideBar@admin': { //footer部分
                    templateUrl: '/tpl/navSideBar.html',
                    controller: 'navCtrl'
                }
            }
        })
        //设置子路由添加类别，这里开始配置右下方主要内容部分
        .state('admin.addSpendType', {
            url: '/addSpendType',
            templateUrl: '/tpl/addSpendType.html',
            controller: 'addSpendType'
        })
        //设置子路由查看全部类别
        .state('admin.seeAllType', {
            url: '/seeAllType',
            templateUrl: '/tpl/seeAllType.html',
            controller: 'seeAllType'
        })
        //添加消费支出
        .state('admin.addSpending', {
            url: '/addSpending',
            templateUrl: '/tpl/addSpending.html',
            controller: 'addSpending'
        })
        //查看所有消费
        .state('admin.seeAllSpend', {
            url: '/seeAllSpend',
            templateUrl: '/tpl/seeAllSpend.html',
            controller: 'seeAllSpend'
        })
        //图表echarts
        .state('admin.echarts', {
            url: '/echarts',
            templateUrl: '/tpl/echarts.html',
            controller: 'echarts'
        })
        //添加管理员
        .state('admin.addAdmin',{
            url: '/addAdmin',
            templateUrl: '/tpl/addAdmin.html',
            controller: 'addAdmin'
        })
        //添加管理员
        .state('admin.manageAccount',{
            url: '/manageAccount',
            templateUrl: '/tpl/manageAccount.html',
            controller: 'manageAccount'
        })
        ;

    $urlRouterProvider.otherwise('/admin/addSpendType'); //设置其他路径跳转到index
});
