
import * as CryptoJS from "crypto-js";

export class Encrypt {
  // encryptSecretKey = "irBdu4oybM6w1IeZLMqFiofyxxQQavrj";  // เปลี่ยน ทุก Site appsettings.
  // AESkey = "ntJo0apTbqFiktlfYhU42lec9ozHT5OM";  // เปลี่ยน ทุก Site ให้ตรงกับ \APIWEB\regapiweb\DataContexts\SysDecrypt.cs

  // public encryptData_(encryptedString: string): string {
  //   //console.log(encryptedString.replace('"','\"'))
  //   //return encryptedString;
  //   const keySize = 256;
  //   const salt = CryptoJS.lib.WordArray.random(16);
  //   const key = CryptoJS.PBKDF2(this.encryptSecretKey, salt, {
  //     keySize: keySize / 32,
  //     iterations: 100,
  //   });
  //   const iv = CryptoJS.lib.WordArray.random(128 / 8);
  //   const encrypted = CryptoJS.AES.encrypt(encryptedString, key, {
  //     iv,
  //     padding: CryptoJS.pad.Pkcs7,
  //     mode: CryptoJS.mode.CBC,
  //   });
  //   const result = CryptoJS.enc.Base64.stringify(
  //     salt.concat(iv).concat(encrypted.ciphertext)
  //   );

  //   return result;
  // }

    private key = CryptoJS.enc.Utf8.parse('GRXWJwkjUwUWdexivzGvsiS6bYeSBABx'); // เปลี่ยน ทุก Site appsettings.
    private iv = CryptoJS.enc.Utf8.parse('irBdoy6w1IeZFioQ');

    encryptData(encString: string )  {
      var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(encString), this.key, {
          keySize: 128 / 8,
          iv: this.iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
      });
      // console.log('Encrypted :' + encrypted);
      //this.decryptUsingAES256(encrypted);
      return encrypted.toString();
    }

    decryptData(decString: string )  {
      var decrypted = CryptoJS.AES.decrypt(decString, this.key, {
          keySize: 128 / 8,
          iv: this.iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
      });
      //console.log('Decrypted : ' + decrypted);
      //console.log('utf8 = ' + decrypted.toString(CryptoJS.enc.Utf8));
      return decrypted;
    }

}
