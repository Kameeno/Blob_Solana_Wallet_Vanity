const { exec } = require('child_process');
const fs = require('fs');
const delay = require('system-sleep');

function walletsGen() {
    var stringBuffer = "";
    let i = 0;
    for (;;) {
        delay(1);
        let walletsGenerator = exec("solana-keygen new --no-bip39-passphrase --outfile ./wallets/blob-wallet" + i.toString() + ".json  --force");
        walletsGenerator.stdout.on('data', (data) => {
            stringBuffer = stringBuffer += data;
        });

        walletsGenerator.stderr.on('data', (data) => {
            console.error(`walletsGenerator ERROR: ${data}`);
        });

        walletsGenerator.on('close', (code) => {
            if (stringBuffer.toLowerCase().includes('pubkey: blob')) {
                console.log("Wallet With BLOB Generated... n:" + i);
                console.log("\n " + stringBuffer + "\n");
                fs.mkdirSync('./wallets/phrases/' + i.toString(), true);
                fs.writeFile('./wallets/phrases/' + i.toString() + '/' + i.toString() + '.txt', stringBuffer, function (err, data) {
                    if (err) {
                        return console.log(err);
                    }
                    // console.log("Wallet With BLOB Generated... n:" + i);
                });
            }
   
        });
  
        stringBuffer = "";
        i++;
    }
}




walletsGen();