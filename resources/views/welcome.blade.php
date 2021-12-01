<!--
Template Apex - Angular & Bootstrap 4 HTML Admin Template
Author: PixInvent
Website: http://www.pixinvent.com/
Contact: hello@pixinvent.com
Follow: www.twitter.com/pixinvents
Like: www.facebook.com/pixinvents
Purchase: https://1.envato.market/apex_admin
Renew Support: https://1.envato.market/apex_admin
License: You must have a valid license purchased only from themeforest(the above link) in order to legally use the theme for your project.

-->

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Game Master Pro</title>
    <script>
    </script>
    <base href="/">
    <link rel="icon" type="image/x-icon" href="favicon.ico">
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" rel="stylesheet">
    <link href="assets/fonts/feather/style.min.css" rel="stylesheet">
    <link href="assets/fonts/simple-line-icons/style.css" rel="stylesheet">
    <link href="assets/fonts/weathericons/css/weather-icons.css" rel="stylesheet">
    <link href="assets/fonts/weathericons/css/weather-icons-wind.css" rel="stylesheet">
    <link
        href="https://fonts.googleapis.com/css?family=Rubik:300,400,500,700,900|Montserrat:300,400,500,600,700,800,900"
        rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="assets/vendor/pace/themes/black/pace-theme-flash.css" />
    <style type="text/css">
        .pace .pace-activity {
            top: 19px;
            right: 19px;
            display: none;
        }

        .page-loading {
            position: fixed;
            left: 0;
            top: 0;
            bottom: 0;
            right: 0;
            overflow: hidden;
            background: rgba(51, 51, 51, 1.00);
            opacity: 0;
            transition: opacity 1s ease-in-out;
            z-index: -1;
        }

        .loading-icon {
            position: absolute;
            left: 50%;
            top: 50%;
            width: 38px;
            height: 38px;
            margin-left: -19px;
            margin-top: -19px;
        }

        app-root:empty~.page-loading {
            opacity: 1;
            z-index: 1;
        }

    </style>
    <link rel="stylesheet" href="styles.css">
</head>

<body class="layout-dark">
    <div class="page-loading">
        <img src="assets/img/oval.svg" class="loading-icon" />
    </div>
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-12 col-lg-8">
                <div class="card">
                    <div class="card-body">
                        <h1 class="card-title">Welcome!</h1>
                        <p>
                            Welcome to GameMaster.pro (GMP), an interactive game management tool! A little about me, I
                            am a single developer with a very
                            understanding spouse and daughter who started this project nearly a
                            decade ago. Back then this was primarily built in excel and was not
                            nearly so feature rich, but the concept originated from there. My goal
                            was a system that made an adaptive storytelling style less work.
                        </p>
                        <p>
                            What is "adaptive storytelling" you ask? Another way to describe it
                            would be "collabortive storytelling". My focus is on not just telling a good story, but
                            doing
                            so in partner with the players. In order to facilitate that; my games
                            are far less scripted. I tend to prepare worlds/characters more than
                            specific sessions, and story arcs unfold based on the player actions,
                            not in predetermined paths. Finding a system that helped enough, but
                            not too much wasn't an option back then, so I built my own. GMP can
                            accomodate more styles than just this, but its origin and focus is storytelling.
                        </p>
                        <p>
                            My goal with GMP is to provide infinite story/worldbuilding fodder, and
                            help keep the mechanics of gamplay where they belong: in the background. What makes GMP
                            different? Two words: NPC Generation. Ok, I guess that technically 4 words, but the point is
                            GMP focuses on generating interesting and unique NPCs with more backstory than some
                            player characters. These NPCs then continue to interact with their environment and other
                            NPCs to createa a dynamic and ever changing world that adapts and evolves as the PCs travel
                            through it.
                        </p>
                    </div>
                </div>
            </div>
            <div class="col-12 col-lg-3">
                <div class="card mt-3">
                    <div class="card-body">
                        <h3 style="{{ $interested ? '' : 'display:none' }}">Submitted!</h3>
                        <h3 class="card-title" style="{{ $interested ? 'display:none' : '' }}">Want updates?</h3>
                        <form method="POST" action="interest" style="{{ $interested ? 'display:none' : '' }}">
                            @csrf
                            <div class="input-group">
                                <input type="email" name="email" class="form-control" placeholder="Email Address" />
                                <div class="input-group-append">
                                    <button type="submit" class="btn-primary">
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-12 col-lg-11">
                <div class="row">
                    <div class="col-12">
                        <div class="card mt-5">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-12 col-lg-3">
                                        <h4>Create a Living World</h4>
                                        <p>
                                            NPCs aren't just generated, they are born, live lives, and have families.
                                            Each region is seeded with a customizeable set of NPC's then "Aged" a few
                                            hundred or a few thousand years. Each year is "lived" by each NPC. They get
                                            jobs, meet, marry, have children, and die. They can pass on traits such as
                                            lineage (demonic, angelic, draconic), they may even contract Lycanthropy and
                                            pass <strong>that</strong> on! Their children are also more likely to follow
                                            in their footsteps. If the blacksmith in the town is from 6 generations of
                                            blacksmiths, you can bet they'd make some epic weaponry. If you choose have
                                            Monarchies in your world, royal bloodlines will be created. Just for fun,
                                            royals are twice as likely to be unfaithful, so you will almost certainly
                                            get illegitimate royal heirs to be villians, despots, or saviors. When you
                                            need an NPC you get physical traits, race, gender, profession, family
                                            relations, and so much more. Some NPCs could be a gaming session all by
                                            themselves!
                                        </p>
                                    </div>
                                    <div class="col-12 col-lg-9">
                                        <img class="img-fluid" src="/assets/img/pages/story.jpg" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card mt-5">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-12 col-lg-3 order-lg-2">
                                        <h4>Generated World Maps</h4>
                                        <p>
                                            Maps are <strong>procedurally generated</strong> vector graphics for each
                                            region/island based on Azgaar's amazing
                                            <a href="https://azgaar.github.io/Fantasy-Map-Generator/">Fantasy Map
                                                Generator</a>.
                                            Realistic natural land shapes with climate and biome to
                                            match. Cultures, Governments, and Religions can all be set to
                                            expand and grow organically. When governments expand and meet other
                                            governments, diplomatic relations are created. Cities and points of interest
                                            (POI eg. Monsters, ruins, bandits, natural features) are spread throughout
                                            the land with corresponding randomly generated story hooks. Cities have
                                            seasonal climate averages, elevations, and features like walls, temples,
                                            markets, etc. If there aren't any cities or POI nearby, you can generate a
                                            random story hook at the click of a button. Also:
                                        </p>
                                        <ul>
                                            <li>Easily keep track of party movement!</li>
                                            <li>Travel times are all calculated for you based on chosen movement speed.
                                            </li>
                                            <li> Add Henchmen to the party and keep there info close at hand.</li>
                                            <li>Take notes about the party for use later.</li>
                                            <li>You can even run multiple parties in the same campaign, tracking their
                                                impact on the world together; or use the same world, but keep all
                                                changes separate.</li>
                                    </div>
                                    <div class="col-12 col-lg-9 order-lg-1">
                                        <img class="img-fluid" src="/assets/img/pages/map-generation.jpg" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card mt-5">
                            <div class="card-body">
                                <video width="100%" height="auto" controls>
                                    <source src="/assets/story-short.webm" type="video/webm" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        </div>
                        <div class="card mt-5">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-12 col-lg-3">
                                        <h4>Point and Click Combat</h4>
                                        <p>
                                            Combat and skill rolls are a click away. Monster attacks are
                                            calculated/rolled automatically from a single click, and "on
                                            the fly" rolls are just as easy. The system is based in d20
                                            with optional advantage/disadvantage. Track initiative, hit
                                            points, turn order, status effects, spell effects. The same theory of help
                                            enough, but not too much applies here. The attacks calculate what AC would
                                            be hit and how much damage is done, but you can apply that damage or adjust
                                            it with just a few clicks. So it tells you the random result, but gives you
                                            the final say on how events play out. Combat is a breeze with GMP
                                        </p>
                                    </div>
                                    <div class="col-12 col-lg-9">
                                        <img class="img-fluid" src="/assets/img/pages/combat-board.jpg" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-lg-9 mt-5">
                <div class="card">
                    <div class="card-body">
                        <h3 class="card-title">FAQ</h3>
                        <h5>Why this?</h5>
                        <p>
                            Because I wanted it. No, really, I'm doing this for my personal use
                            first and foremost.
                        </p>
                        <h5>Are you planning on charging? When?</h5>
                        <p>
                            It really depends on popularity. If enough people want to use it, I
                            may charge a small fee. If it grows enough I would have to start
                            charging, or at least request donations or add "feature upgrades".
                        </p>
                        <h5>How much?</h5>
                        <p>
                            Not a ton. I'm thinking $1.50 - 2.50/mo or $15 - 20/yr. I would much
                            rather have 1000 users paying $1 than 100 users paying $10.
                        </p>
                        <h5>Does your system work with xyz?</h5>
                        <p>
                            Unless its d20, nope. Or at least not yet. If there is enough interest
                            I am willing to support any system.
                        </p>
                        <h5>Timeline?</h5>
                        <p>
                            If there isn't much interest then my progress will be slower. I'm
                            perfectly willing to use my system even if it's buggy, but if others
                            are relying on it for their games I'll be more motivated.
                        </p>
                        <h5>
                            What features are planned/implemented that aren't in the
                            video/screenshots?
                        </h5>
                        <ul>
                            <li>Campaign/Story sharing</li>
                            <li>Color/Pallet customization</li>
                            <li>Timeline, plot points, and POI visibility</li>
                            <li>Rule/System reference (perhaps editable for house rules)</li>
                            <li>Quick generate NPC class from selected class and level (including npcs in combat becomes
                                a
                                snap)</li>
                            <li>Add more systems and sample worlds/campaigns</li>
                        </ul>
                        <h5>You seem a little... casual. No offence, but is my data safe?</h5>
                        <p>
                            Does a dragon hoard treasure? Ok, bad example because that does vary
                            by mythology. While this may be my side project, I am a Senior Full
                            Stack developer. No shifty adventurers are getting by this dragon.
                        </p>
                    </div>
                </div>
            </div>
            <div class="col-12">
                <div class="card mt-3">
                    <div class="card-body">
                        <h3 style="{{ $interested ? '' : 'display:none' }}">Submitted!</h3>
                        <h3 class="card-title" style="{{ $interested ? 'display:none' : '' }}">Want to know when
                            sign-up is available?</h3>
                        <form method="POST" action="interest" style="{{ $interested ? 'display:none' : '' }}">
                            @csrf
                            <div class="input-group">
                                <input type="email" name="email" class="form-control" placeholder="Email Address" />
                                <div class="input-group-append">
                                    <button type="submit" class="btn-primary">
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    </div>

</body>

</html>
