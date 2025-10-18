#!/usr/bin/env node

/**
 * Test Results Processor para Jest
 * Guarda los resultados en JSON y genera el reporte TEST_RESULTS.md
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

module.exports = (results) => {
  // Guardar resultados en JSON temporal (en la raíz del proyecto)
  const resultsPath = path.join(__dirname, '..', '..', 'test-results.json');
  fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2), 'utf8');

  // Ejecutar script de generación de reporte
  try {
    execSync('node scripts/test/generate-test-report.js', { 
      cwd: path.join(__dirname, '..', '..'),
      stdio: 'inherit'
    });
  } catch (error) {
    console.error('Error generando TEST_RESULTS.md:', error.message);
  }

  return results;
};
