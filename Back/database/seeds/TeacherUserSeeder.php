<?php

use Illuminate\Database\Seeder;
use App\Teacher;

class TeacherUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Teacher::create([
            'username' => 'Hisham',
            'email' => 'Hisham@gmail.com',
            'password' => bcrypt('123456'),
        ]);
    }
}
