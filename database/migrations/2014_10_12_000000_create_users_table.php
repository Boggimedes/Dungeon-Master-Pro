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
            $table->increments('id');
            $table->string('name');
            $table->string('show-file')->nullable();
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password')->nullable();
            $table->text('settings')->default('{"preGenNames": 1}');
            $table->rememberToken();
            $table->timestamps();
        });
        Schema::create('npcs', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned();
            $table->string('name');
            $table->string('gender')->nullable();
            $table->integer('profession_id')->unsigned()->nullable();;
            $table->smallinteger('alive')->default(1);
            $table->smallinteger('married')->default(0);
            $table->integer('race_id')->unsigned();
            $table->integer('spouse_id')->unsigned()->nullable();;
            $table->integer('birthing_parent_id')->unsigned()->nullable();;
            $table->integer('parent_id')->unsigned()->nullable();;
            $table->integer('region_id')->unsigned();
            $table->integer('age')->nullable();
            $table->integer('birth_year')->nullable();
            $table->smallinteger('generation')->nullable();
            $table->boolean('excluded')->default(0);
            $table->boolean('retired')->default(0);
            $table->text('mannerisms')->nullable();
            $table->text('lineage')->nullable();
            $table->text('quirks')->nullable();
            $table->text('abilities')->default('[]')->nullable();;
            $table->text('features')->default('[]')->nullable();;
            $table->text('notes')->nullable();
            $table->timestamps();
        });
        Schema::create('npc_friend', function (Blueprint $table) {
			// keys
			$table->integer('npc_id')->unsigned()->nullable();
			$table->foreign('npc_id')->references('id')->on('npcs')->onDelete('cascade');

			$table->integer('friend_id')->unsigned()->nullable();
			$table->foreign('friend_id') ->references('id')->on('npcs')->onDelete('cascade');
		});
		Schema::create('npc_enemy', function (Blueprint $table) {
			// keys
			$table->integer('npc_id')->unsigned()->nullable();
			$table->foreign('npc_id')->references('id')->on('npcs')->onDelete('cascade');

			$table->integer('enemy_id')->unsigned()->nullable();
			$table->foreign('enemy_id') ->references('id')->on('npcs')->onDelete('cascade');
		});
        Schema::create('descriptives', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('world_id')->unsigned();
            $table->string('type');
            $table->text('text');
            $table->string('gender')->nullable();
            $table->integer('race_id')->unsigned()->nullable();
            $table->foreign('world_id')->references('id')->on('worlds')->onDelete('cascade');
        });
        Schema::create('scene_collections', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned();
            $table->string('name');
            $table->text('desc');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
        Schema::create('effects', function (Blueprint $table) {
            $table->increments('id');
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

            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
        Schema::create('scenes', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned();
            $table->integer('effect_id')->unsigned();
            $table->string('name');
            $table->string('img');
            $table->text('desc');
            $table->integer('volume')->default(100);
            $table->integer('fade_in')->default(2);
            $table->integer('fade_out')->default(2);
            $table->boolean('scene_solo')->default(0);
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('effect_id')->references('id')->on('effects')->onDelete('cascade');
            $table->timestamps();
        });
		Schema::create('collection_scene', function (Blueprint $table) {
			// keys
			$table->integer('collection_id')->unsigned()->nullable();
			$table->foreign('collection_id')->references('id')->on('scene_collections')->onDelete('cascade');

			$table->integer('scene_id')->unsigned()->nullable();
			$table->foreign('scene_id') ->references('id')->on('scenes')->onDelete('cascade');
		});
		Schema::create('scene_effect', function (Blueprint $table) {
			// keys
			$table->integer('scene_id')->unsigned()->nullable();
			$table->foreign('scene_id') ->references('id')->on('scenes')->onDelete('cascade');

			$table->integer('effect_id')->unsigned()->nullable();
			$table->foreign('effect_id')->references('id')->on('effects')->onDelete('cascade');
        });
        Schema::create('sounds', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned()->nullable();
            $table->string('filename');
            $table->timestamps();
        });
        Schema::create('monsters', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned();
            $table->string('name');
            $table->string('page')->nullable();
            $table->string('challenge_rating')->nullable();
            $table->string('speed')->nullable();
            $table->string('armor_class')->nullable();
            $table->text('armor_class_notes')->nullable();
            $table->string('hit_points')->nullable();
            $table->text('desc')->nullable();
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
            $table->text('senses')->nullable();
            $table->text('special')->nullable();
            $table->text('environment')->nullable();
            $table->string('size')->nullable();
            $table->text('skills')->nullable();
            $table->string('legendary')->nullable();
            $table->text('legendary_actions')->nullable();
            $table->text('attacks')->nullable();
            $table->text('multiattacks')->nullable();
            $table->text('spellcasting')->nullable();
            $table->string('image')->nullable();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });
        Schema::create('worlds', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned();
            $table->string('name')->nullable();
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
        Schema::create('professions', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->integer('world_id')->unsigned();
            $table->string('min_age')->nullable();
            $table->string('max_age')->nullable();

            $table->foreign('world_id')->references('id')->on('worlds')->onDelete('cascade');
        });
        Schema::create('races', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('world_id')->unsigned();
            $table->string('name')->nullable();
            $table->text('genders')->default('[{"Female":"fantasy"},{"Male":"fantasy"}]');
            $table->integer('adulthood')->nullable();
            $table->integer('middle_age')->nullable();
            $table->integer('old_age')->nullable();
            $table->integer('venerable')->nullable();
            $table->integer('max_age')->nullable();
            $table->integer('friend_rate')->nullable();
            $table->integer('enemy_rate')->nullable();

            $table->foreign('world_id')->references('id')->on('worlds')->onDelete('cascade');
        });
		Schema::create('world_races', function (Blueprint $table) {
			// keys
			$table->integer('world_id')->unsigned()->nullable();
			$table->foreign('world_id')->references('id')->on('worlds')->onDelete('cascade');

			$table->integer('race_id')->unsigned()->nullable();
			$table->foreign('race_id') ->references('id')->on('races')->onDelete('cascade');
		});
        Schema::create('regions', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('world_id')->unsigned();
            $table->string('name');
            $table->text('racial_balance');
            $table->text('prof_balance');
            $table->text('aspect_types');
            $table->integer('epoch')->nullable();

            $table->timestamps();
            $table->foreign('world_id')->references('id')->on('worlds')->onDelete('cascade');
        });
        Schema::create('spells', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('original_spell_id')->unsigned();
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
            $table->string('duration')->nullable();
            $table->string('components')->nullable();
            $table->string('attack')->nullable();

            
            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
		Schema::create('monster_spell', function (Blueprint $table) {
			// keys
			$table->integer('monster_id')->unsigned()->nullable();
			$table->foreign('monster_id') ->references('id')->on('monsters')->onDelete('cascade');

			$table->integer('spell_id')->unsigned()->nullable();
			$table->foreign('spell_id')->references('id')->on('spells')->onDelete('cascade');
        });
       
        Schema::create('maps', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned();
            $table->string('name')->nullable();
            $table->string('ext')->nullable();
            $table->text('tags');
            
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
        
        Schema::create('campaigns', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned();
            $table->string('name')->nullable();
            $table->text('tags');
            $table->integer('current_day');
            
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
        
		Schema::create('campaign_npcs', function (Blueprint $table) {
			// keys
			$table->integer('campaign_id')->unsigned()->nullable();
			$table->foreign('campaign_id')->references('id')->on('campaigns')->onDelete('cascade');

			$table->integer('npc_id')->unsigned()->nullable();
			$table->foreign('npc_id') ->references('id')->on('npcs')->onDelete('cascade');
		});

        Schema::create('map_items', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('map_id')->unsigned();
            $table->integer('campaign_id')->unsigned()->nullable();
            $table->string('type');
            $table->string('name');
            $table->integer('visible_day')->default(0);
            $table->string('visible_zoom')->default('[]');
            $table->text('tags');
            $table->integer('top');
            $table->integer('left');
            $table->string('icon');
            $table->text('notes');
            
            $table->foreign('map_id')->references('id')->on('maps')->onDelete('cascade');
        });
        
        Schema::create('plot_points', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('campaign_id')->unsigned();
            $table->string('type');
            $table->string('name');
            $table->text('tags');
            $table->integer('day');
            $table->integer('duration')->default(1);
            $table->string('icon');
            $table->text('notes');
            
            $table->foreign('map_id')->references('id')->on('maps')->onDelete('cascade');
            $table->foreign('campaign_id')->references('id')->on('campaigns')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
    }
}
