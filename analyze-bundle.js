const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

function analyzeFile(filePath) {
  const stats = fs.statSync(filePath);
  const content = fs.readFileSync(filePath);
  const gzipped = zlib.gzipSync(content);
  const brotli = zlib.brotliCompressSync(content);

  return {
    path: filePath,
    size: stats.size,
    gzipped: gzipped.length,
    brotli: brotli.length,
  };
}

function formatBytes(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

console.log("📦 React Custom Scrollbar - Bundle Size Analysis\n");
console.log("=".repeat(60));

const files = ["./dist/index.js", "./dist/index.esm.js"];

let totalSize = 0;
let totalGzipped = 0;
let totalBrotli = 0;

files.forEach((file) => {
  if (fs.existsSync(file)) {
    const analysis = analyzeFile(file);
    totalSize += analysis.size;
    totalGzipped += analysis.gzipped;
    totalBrotli += analysis.brotli;

    console.log(`\n📄 ${path.basename(analysis.path)}`);
    console.log(`   Raw:     ${formatBytes(analysis.size)}`);
    console.log(
      `   Gzipped: ${formatBytes(analysis.gzipped)} (${(
        (analysis.gzipped / analysis.size) *
        100
      ).toFixed(1)}% of raw)`
    );
    console.log(
      `   Brotli:  ${formatBytes(analysis.brotli)} (${(
        (analysis.brotli / analysis.size) *
        100
      ).toFixed(1)}% of raw)`
    );
  }
});

console.log("\n" + "=".repeat(60));
console.log("📊 TOTAL PACKAGE SIZE");
console.log("=".repeat(60));
console.log(`Raw:     ${formatBytes(totalSize)}`);
console.log(
  `Gzipped: ${formatBytes(totalGzipped)} (${(
    (totalGzipped / totalSize) *
    100
  ).toFixed(1)}% of raw)`
);
console.log(
  `Brotli:  ${formatBytes(totalBrotli)} (${(
    (totalBrotli / totalSize) *
    100
  ).toFixed(1)}% of raw)`
);

// Analyze TypeScript declaration files
const dtsFiles = [
  "./dist/index.d.ts",
  "./dist/types.d.ts",
  "./dist/utils.d.ts",
];

let totalDtsSize = 0;
dtsFiles.forEach((file) => {
  if (fs.existsSync(file)) {
    const stats = fs.statSync(file);
    totalDtsSize += stats.size;
  }
});

console.log(`\n📝 TypeScript Declarations: ${formatBytes(totalDtsSize)}`);

console.log("\n" + "=".repeat(60));
console.log("📋 PACKAGE SUMMARY");
console.log("=".repeat(60));
console.log(
  `• Main Bundle (CJS): ${formatBytes(fs.statSync("./dist/index.js").size)}`
);
console.log(
  `• ES Module Bundle: ${formatBytes(fs.statSync("./dist/index.esm.js").size)}`
);
console.log(`• TypeScript Declarations: ${formatBytes(totalDtsSize)}`);
console.log(`• Total Package Size: ${formatBytes(totalSize + totalDtsSize)}`);
console.log(
  `• Recommended CDN Size (Gzipped): ${formatBytes(
    Math.min(...files.map((f) => analyzeFile(f).gzipped))
  )}`
);

console.log("\n💡 Size Comparison:");
console.log("   • Small library: < 50 KB");
console.log("   • Medium library: 50-200 KB");
console.log("   • Large library: > 200 KB");
console.log(
  `   • Your package: ${formatBytes(totalSize)} (${
    totalSize < 50000
      ? "Small ✅"
      : totalSize < 200000
      ? "Medium 📊"
      : "Large 📈"
  })`
);
