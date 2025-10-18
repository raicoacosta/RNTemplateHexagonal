#!/usr/bin/env node

/**
 * Script para generar TEST_RESULTS.md automáticamente
 * Se ejecuta después de los tests via Jest
 */

const fs = require('fs');
const path = require('path');

/**
 * Calcula el resumen de cobertura desde el coverageMap
 */
function calculateCoverageSummary(coverageMap) {
  if (!coverageMap) return null;

  const summary = {
    lines: { total: 0, covered: 0, pct: 0 },
    statements: { total: 0, covered: 0, pct: 0 },
    functions: { total: 0, covered: 0, pct: 0 },
    branches: { total: 0, covered: 0, pct: 0 },
  };

  // Iterar sobre los archivos en el mapa de cobertura
  for (const filePath in coverageMap) {
    const fileCoverage = coverageMap[filePath];
    
    if (fileCoverage) {
      // Statements (s)
      if (fileCoverage.s) {
        for (const stmt in fileCoverage.s) {
          summary.statements.total++;
          if (fileCoverage.s[stmt] > 0) summary.statements.covered++;
        }
      }
      
      // Funciones (f)
      if (fileCoverage.f) {
        for (const func in fileCoverage.f) {
          summary.functions.total++;
          if (fileCoverage.f[func] > 0) summary.functions.covered++;
        }
      }
      
      // Ramas (b)
      if (fileCoverage.b) {
        for (const branch in fileCoverage.b) {
          const branchData = fileCoverage.b[branch];
          if (Array.isArray(branchData)) {
            branchData.forEach((count) => {
              summary.branches.total++;
              if (count > 0) summary.branches.covered++;
            });
          }
        }
      }
      
      // Líneas - usar statementMap para contar líneas únicas
      if (fileCoverage.statementMap && fileCoverage.s) {
        const lines = new Set();
        for (const stmt in fileCoverage.statementMap) {
          const stmtMap = fileCoverage.statementMap[stmt];
          if (stmtMap && stmtMap.start) {
            lines.add(stmtMap.start.line);
          }
        }
        summary.lines.total += lines.size;
        
        // Contar líneas cubiertas
        for (const stmt in fileCoverage.s) {
          if (fileCoverage.s[stmt] > 0) {
            const stmtMap = fileCoverage.statementMap[stmt];
            if (stmtMap && stmtMap.start) {
              const line = stmtMap.start.line;
              // Verificar si esta línea ya fue contada como cubierta
              if (lines.has(line)) {
                summary.lines.covered++;
                lines.delete(line); // Eliminar para no contar duplicados
              }
            }
          }
        }
      }
    }
  }

  // Calcular porcentajes
  summary.lines.pct = summary.lines.total > 0 
    ? (summary.lines.covered / summary.lines.total) * 100 
    : 0;
  summary.statements.pct = summary.statements.total > 0 
    ? (summary.statements.covered / summary.statements.total) * 100 
    : 0;
  summary.functions.pct = summary.functions.total > 0 
    ? (summary.functions.covered / summary.functions.total) * 100 
    : 0;
  summary.branches.pct = summary.branches.total > 0 
    ? (summary.branches.covered / summary.branches.total) * 100 
    : 0;

  return summary;
}

function generateTestReport(results) {
  const {
    numTotalTests,
    numPassedTests,
    numFailedTests,
    numPendingTests,
    testResults,
    startTime,
    success,
    coverageMap,
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

  // Agregar información de cobertura si está disponible
  if (coverageMap) {
    report += `## 📊 Cobertura de Código\n\n`;
    const coverage = calculateCoverageSummary(coverageMap);
    
    if (coverage) {
      report += `| Tipo | Cobertura | Cubierto | Total |\n`;
      report += `|------|-----------|----------|-------|\n`;
      report += `| 📝 Líneas | ${coverage.lines.pct.toFixed(2)}% | ${coverage.lines.covered} | ${coverage.lines.total} |\n`;
      report += `| 🔀 Ramas | ${coverage.branches.pct.toFixed(2)}% | ${coverage.branches.covered} | ${coverage.branches.total} |\n`;
      report += `| 🔧 Funciones | ${coverage.functions.pct.toFixed(2)}% | ${coverage.functions.covered} | ${coverage.functions.total} |\n`;
      report += `| 📄 Statements | ${coverage.statements.pct.toFixed(2)}% | ${coverage.statements.covered} | ${coverage.statements.total} |\n\n`;
      
      // Indicador visual de cobertura
      const avgCoverage = (
        coverage.lines.pct + 
        coverage.branches.pct + 
        coverage.functions.pct + 
        coverage.statements.pct
      ) / 4;
      
      let coverageIcon = '🔴';
      let coverageLevel = 'Baja';
      if (avgCoverage >= 80) {
        coverageIcon = '🟢';
        coverageLevel = 'Excelente';
      } else if (avgCoverage >= 60) {
        coverageIcon = '🟡';
        coverageLevel = 'Media';
      } else if (avgCoverage >= 40) {
        coverageIcon = '🟠';
        coverageLevel = 'Regular';
      }
      
      report += `**Nivel de Cobertura:** ${coverageIcon} ${coverageLevel} (${avgCoverage.toFixed(2)}% promedio)\n\n`;
    }
  }

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
