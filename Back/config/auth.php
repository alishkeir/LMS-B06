<?php

return [


    'defaults' => [
        'guard' => 'api',
        'passwords' => 'teachers',
    ],



    'guards' => [
        'web' => [
            'driver' => 'session',
            'provider' => 'users',
        ],

        'api' => [
            'driver' => 'jwt',
            'provider' => 'teachers',
            'hash' => false,
        ],
    ],


    'providers' => [
        'teachers' => [
            'driver' => 'eloquent',
            'model' => App\Teacher::class,
        ],
    ],


    'passwords' => [
        'users' => [
            'provider' => 'users',
            'table' => 'password_resets',
            'expire' => 60,
            'throttle' => 60,
        ],
    ],



    'password_timeout' => 10800,

];
