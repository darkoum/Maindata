const JavaScriptObfuscator = require('javascript-obfuscator');
const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist', 'Maindata', 'browser');

if (!fs.existsSync(distDir)) {
  console.error('❌ dist/Maindata/browser/ not found — run ng build first');
  process.exit(1);
}

const jsFiles = fs.readdirSync(distDir).filter(f => f.endsWith('.js'));
console.log(`🔒 Obfuscating ${jsFiles.length} JS files...`);

let ok = 0;
for (const file of jsFiles) {
  const filePath = path.join(distDir, file);
  const original = fs.readFileSync(filePath, 'utf8');

  try {
    const result = JavaScriptObfuscator.obfuscate(original, {
      compact: true,
      controlFlowFlattening: false,
      deadCodeInjection: false,
      stringArray: true,
      stringArrayEncoding: ['base64'],
      stringArrayThreshold: 0.75,
      rotateStringArray: true,
      shuffleStringArray: true,
      identifierNamesGenerator: 'hexadecimal',
      selfDefending: false,
      debugProtection: false,
      disableConsoleOutput: true,
      log: false,
    });

    fs.writeFileSync(filePath, result.getObfuscatedCode(), 'utf8');
    console.log(`  ✅ ${file}`);
    ok++;
  } catch (e) {
    console.warn(`  ⚠️  ${file} — skipped (${e.message})`);
  }
}

console.log(`\n🎉 Done: ${ok}/${jsFiles.length} files obfuscated`);
