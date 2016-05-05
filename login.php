<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>Game Master Pro</title>
     <base href="/">
     <meta name='viewport' content='width=device-width, initial-scale=1.0' >
    <link rel="stylesheet" href="bower_components/mobile-angular-ui/dist/css/mobile-angular-ui-base.min.css" />
    <link rel="stylesheet" href="bower_components/mobile-angular-ui/dist/css/mobile-angular-ui-desktop.min.css" />
     <link rel="stylesheet" href="bower_components/mobile-angular-ui/dist/css/mobile-angular-ui-hover.min.css" />
    <link rel="stylesheet" href="bower_components/angular-bootstrap/ui-bootstrap-csp.css" />
    <link rel="stylesheet" href="css/app.css" />
</head>

 <body class="text-center">
<?php echo $message; ?>
 <form method="POST" action="/login" class="form" style="text-align:left;margin:auto;margin-top:50px;max-width:500px;background-color:lightgrey;border:2px solid darkgrey;border-radius:10px;" >
 <img style="border-top-left-radius:10px;border-top-right-radius:10px" src="/img/GMP Logo (medium).jpg"><div class="form-group">
<label>Email Address</label>
<input type="text" class="form-control" name="email">
</div>
<div class="form-group">
<label>Password</label>
<input type="password" class="form-control" name="password">
</div><div class="form-group">
<input type="submit" class="form-control btn btn-primary" name="submit" value="Submit">
</div>

 </form>

</body>

</html>
