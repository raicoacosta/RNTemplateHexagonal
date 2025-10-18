#!/usr/bin/env node

/**
 * Script para generar TEST_RESULTS.md automáticamente
 * Se ejecuta después de los tests via Jest
 */

const fs = require('fs');
const path = require('path');

function generateTestReport(results) {
  const {
    numTotalTests,
    numPassedTests,
    numFailedTests,
    numPendingTests,
    testResults,
    startTime,
    success,
  } = results;

  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  const date = new Date().toLocaleString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  let report = `# Test Results\n\n`;
  report += `**Generado:** ${date}\n\n`;
  report += `## Resumen\n\n`;
  report += `| Métrica | Valor |\n`;
  report += `|---------|-------|\n`;
  report += `| ✅ Tests Pasados | ${numPassedTests} |\n`;
  report += `| ❌ Tests Fallidos | ${numFailedTests} |\n`;
  report += `| ⏸️ Tests Pendientes | ${numPendingTests} |\n`;
  report += `| 📊 Total | ${numTotalTests} |\n`;
  report += `| ⏱️ Duración | ${duration}s |\n`;
  report += `| 🎯 Estado | ${success ? '✅ EXITOSO' : '❌ FALLIDO'} |\n\n`;

  // Resultados por suite
  report += `## Resultados Detallados\n\n`;

  testResults.forEach((suite) => {
    const suiteName = path.basename(suite.testFilePath);
    const suitePassed = suite.numFailingTests === 0;
    const icon = suitePassed ? '✅' : '❌';
    
    report += `### ${icon} ${suiteName}\n\n`;
    report += `- **Tests:** ${suite.numPassingTests + suite.numFailingTests}\n`;
    report += `- **Pasados:** ${suite.numPassingTests}\n`;
    report += `- **Fallidos:** ${suite.numFailingTests}\n`;
    report += `- **Duración:** ${(suite.perfStats.runtime / 1000).toFixed(2)}s\n\n`;

    // Listar tests individuales
    if (suite.testResults && suite.testResults.length > 0) {
      report += `**Tests ejecutados:**\n\n`;
      suite.testResults.forEach((test) => {
        const testIcon = test.status === 'passed' ? '✓' : test.status === 'failed' ? '✗' : '○';
        const testName = test.fullName || test.title;
        report += `- ${testIcon} ${testName}\n`;
        
        // Si falló, mostrar el error
        if (test.status === 'failed' && test.failureMessages && test.failureMessages.length > 0) {
          report += `  \`\`\`\n`;
          report += `  ${test.failureMessages[0].split('\n').slice(0, 5).join('\n')}\n`;
          report += `  \`\`\`\n`;
        }
      });
      report += `\n`;
    }
  });

  // Comandos útiles
  report += `## Comandos\n\n`;
  report += `\`\`\`bash\n`;
  report += `# Ejecutar todos los tests\n`;
  report += `yarn test\n\n`;
  report += `# Ejecutar tests en modo watch\n`;
  report += `yarn test --watch\n\n`;
  report += `# Ejecutar tests con cobertura\n`;
  report += `yarn test --coverage\n\n`;
  report += `# Ejecutar un test específico\n`;
  report += `yarn test <nombre-del-archivo>\n`;
  report += `\`\`\`\n\n`;

  // Footer
  report += `---\n\n`;
  report += `*Este reporte fue generado automáticamente por Jest*\n`;

  return report;
}

// Leer los resultados de Jest desde el archivo temporal
function main() {
  try {
    // Archivo temporal en la raíz del proyecto
    const resultsPath = path.join(__dirname, '..', '..', 'test-results.json');
    
    if (!fs.existsSync(resultsPath)) {
      console.error('❌ No se encontró el archivo de resultados de Jest');
      process.exit(1);
    }

    const results = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));
    const report = generateTestReport(results);

    // Guardar TEST_RESULTS.md en la raíz del proyecto
    const outputPath = path.join(__dirname, '..', '..', 'TEST_RESULTS.md');
    fs.writeFileSync(outputPath, report, 'utf8');

    console.log('✅ TEST_RESULTS.md generado exitosamente');

    // Limpiar archivo temporal
    fs.unlinkSync(resultsPath);
  } catch (error) {
    console.error('❌ Error generando el reporte:', error.message);
    process.exit(1);
  }
}

main();
