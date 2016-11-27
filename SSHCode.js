// var SSH = require('simple-ssh');
// var fs = require('fs');

// var contents = fs.readFileSync('./id_rsa').toString();
// console.log(contents); //esperamos por el resultado

// var Client = require('ssh2').Client;
// var conn = new Client();var op = '';
// conn.on('ready', function() {
//   conn.exec('domains ftbot', function(err, stream) {
//     if (err) throw err;
//     stream.on('close', function(code, signal) {
//       console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
//       conn.end();
//     });
//     // stream.on('data', function(chunk) { op +=chunk; });
//     stream.on('end',function(op){ console.log(op); });
    
//     stream.stderr.on('end', function(data) {
//       console.log('STDERR: ' + data);
//     });
//   });
// }).connect({host: '198.199.103.93', 
// port: 22,
//  username: 'dokku',
//   password: 'rishabh123', 
//   passphrase:'rishabh', privateKey: require('fs').readFileSync('./id_rsa') });

// var ssh = new SSH({
//     host: '198.199.103.93',
//     user: 'ninja',
//     pass: 'rishabh123',
//     passphase: 'rishabh',
//     key:require('fs').readFileSync('./id_rsa')
// });
 
// ssh.exec('dokku', {
//     out: function(stdout) {
//         console.log(stdout);
//     }
// }).start();


// ssh.on('error', function(err) {
//     console.log('Oops, something went wrong.');
//     console.log(err);
//     ssh.end();
// });




// var sequest = require('sequest')
// sequest('ninja@198.199.103.93', 
// {
// command:'ls',
//     host: '198.199.103.93',
//     username: 'ninja',
//     password: 'rishabh123',
//     passphase: 'rishabh',
//     key:require('fs').readFileSync('./id_rsa')

// }, function (e, stdout) {
//   if (e) console.log(e)
//   else
//   console.log(stdout.split('\n'))
// })

