<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });
        Schema::create('citizens', function (Blueprint $table) {
            $table->increment('id');
            $table->integer('user_id')->unsigned();
            $table->string('name');
            $table->string('family_name');
            $table->string('gender');
            $table->integer('profession_id')->unsigned();
            $table->boolean('alive')->default(1);
            $table->boolean('married')->default(0);
            $table->integer('race_id')->unsigned();
            $table->integer('spouse_id')->unsigned();
            $table->integer('mother_id')->unsigned();
            $table->integer('father_id')->unsigned();
            $table->integer('region_id')->unsigned();
            $table->integer('age')->nullable();
            $table->integer('birth_year')->nullable();
            $table->smallinteger('generation')->nullable();
            $table->text('mannerisms');
            $table->text('lineage');
            $table->text('quirks');
            $table->text('abilities');
            $table->text('features');
            $table->text('notes');

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('profession_id')->references('id')->on('professions')->onDelete('cascade');
            $table->foreign('race_id')->references('id')->on('races')->onDelete('cascade');
            $table->foreign('region_id')->references('id')->on('regions')->onDelete('cascade');
        });
		Schema::create('citizen_friend', function (Blueprint $table) {
			// keys
			$table->integer('citizen_id')->unsigned()->nullable();
			$table->foreign('citizen_id')->references('id')->on('citizens')->onDelete('cascade');

			$table->integer('friend_id')->unsigned()->nullable();
			$table->foreign('friend_id') ->references('id')->on('citizens')->onDelete('cascade');
		});
		Schema::create('citizen_enemy', function (Blueprint $table) {
			// keys
			$table->integer('citizen_id')->unsigned()->nullable();
			$table->foreign('citizen_id')->references('id')->on('citizens')->onDelete('cascade');

			$table->integer('enemy_id')->unsigned()->nullable();
			$table->foreign('enemy_id') ->references('id')->on('citizens')->onDelete('cascade');
		});
		Schema::create('citizen_child', function (Blueprint $table) {
			// keys
			$table->integer('citizen_id')->unsigned()->nullable();
			$table->foreign('citizen_id')->references('id')->on('citizens')->onDelete('cascade');

			$table->integer('child_id')->unsigned()->nullable();
			$table->foreign('child_id') ->references('id')->on('citizens')->onDelete('cascade');
		});
        Schema::create('descriptives', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id')->unsigned();
            $table->string('type');
            $table->text('text');
            $table->string('gender');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
        Schema::create('scene_collections', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id')->unsigned();
            $table->string('name');
            $table->text('desc');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
		Schema::create('collection_scene', function (Blueprint $table) {
			// keys
			$table->integer('collection_id')->unsigned()->nullable();
			$table->foreign('collection_id')->references('id')->on('scene_collections')->onDelete('cascade');

			$table->integer('scene_id')->unsigned()->nullable();
			$table->foreign('scene_id') ->references('id')->on('scenes')->onDelete('cascade');
		});
        Schema::create('scenes', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id')->unsigned();
            $table->string('name');
            $table->string('img');
            $table->text('desc');
            $table->integer('volume')->default(100);
            $table->integer('fade_in')->default(2);
            $table->integer('fade_out')->default(2);
            $table->boolean('scene_solo')->default(0);
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('effect_id')->references('id')->on('effects')->onDelete('cascade');
        });
		Schema::create('scene_effect', function (Blueprint $table) {
			// keys
			$table->integer('scene_id')->unsigned()->nullable();
			$table->foreign('scene_id') ->references('id')->on('scenes')->onDelete('cascade');

			$table->integer('effect_id')->unsigned()->nullable();
			$table->foreign('effect_id')->references('id')->on('effects')->onDelete('cascade');
        });
        Schema::create('effects', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id')->unsigned();
            $table->string('name');
            $table->text('desc');
            $table->text('sounds');
            $table->integer('volume')->default(100);
            $table->boolean('pre_delay')->default(0);
            $table->boolean('loop')->default(0);
            $table->boolean('delay_min')->default(0);
            $table->boolean('delay_max')->default(0);
            $table->boolean('optional')->default(0);
            $table->boolean('seq')->default(0);

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
        Schema::create('monsters', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id')->unsigned();
            $table->string('name');
            $table->string('page');
            $table->string('challenge_rating');
            $table->string('speed');
            $table->string('armor_class');
            $table->text('armor_class_notes');
            $table->string('challenge_rating');
            $table->string('hit_points');
            $table->text('desc');
            $table->text('sounds');
            $table->integer('vol')->default(100);
            $table->integer('initiative')->nullable();
            $table->integer('str')->nullable();
            $table->integer('dex')->nullable();
            $table->integer('con')->nullable();
            $table->integer('int')->nullable();
            $table->integer('wis')->nullable();
            $table->integer('cha')->nullable();
            $table->integer('str_save')->nullable();
            $table->integer('dex_save')->nullable();
            $table->integer('con_save')->nullable();
            $table->integer('int_save')->nullable();
            $table->integer('wis_save')->nullable();
            $table->integer('cha_save')->nullable();
            $table->text('senses');
            $table->text('special');
            $table->text('environment');
            $table->text('skills');
            $table->string('size');
            $table->string('legendary');
            $table->text('legendary_actions');
            $table->string('image');

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
        Schema::create('profession', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('user_id')->unsigned();
            $table->integer('rate')->nullable();
            $table->integer('min_age')->nullable();
            $table->integer('max_age')->nullable();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
        Schema::create('race', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id')->unsigned();
            $table->string('name')->nullable();
            $table->integer('adulthood')->nullable();
            $table->integer('middle_age')->nullable();
            $table->integer('old_age')->nullable();
            $table->integer('venerable')->nullable();
            $table->integer('max_age')->nullable();
            $table->integer('friend_rate')->nullable();
            $table->integer('enemy_rate')->nullable();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
        Schema::create('region', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id')->unsigned();
            $table->string('name')->nullable();
            $table->text('racial_balance');
            $table->text('prof_balance');
            $table->integer('epoch')->nullable();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
        Schema::create('spells', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id')->unsigned();
            $table->string('name')->nullable();
            $table->text('damage');
            $table->text('fulltext');
            $table->string('shorttext')->nullable();
            $table->string('range')->nullable();
            $table->string('level')->nullable();
            $table->string('school')->nullable();
            $table->string('save')->nullable();
            $table->string('casttime')->nullable();
            $table->string('components')->nullable();
            $table->string('attack')->nullable();

            
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('citizen_child');
        Schema::dropIfExists('citizen_enemy');
        Schema::dropIfExists('citizen_friend');
        Schema::dropIfExists('citizens');
        Schema::dropIfExists('users');
        Schema::dropIfExists('descriptives');
        Schema::dropIfExists('collections');
        Schema::dropIfExists('collection_scene');
        Schema::dropIfExists('scenes');
        Schema::dropIfExists('scene_effect');
        Schema::dropIfExists('effects');
        Schema::dropIfExists('monsters');
        Schema::dropIfExists('profession');
        Schema::dropIfExists('race');
        Schema::dropIfExists('region');
        Schema::dropIfExists('spells');
    }
}
