# Test Results

**Generado:** 18 de octubre de 2025, 02:39

## Resumen

| Métrica | Valor |
|---------|-------|
| ✅ Tests Pasados | 31 |
| ❌ Tests Fallidos | 0 |
| ⏸️ Tests Pendientes | 0 |
| 📊 Total | 31 |
| ⏱️ Duración | 11.12s |
| 🎯 Estado | ✅ EXITOSO |

## Resultados Detallados

### ✅ ProductNumber.test.ts

- **Tests:** 8
- **Pasados:** 8
- **Fallidos:** 0
- **Duración:** 0.52s

**Tests ejecutados:**

- ✓ ProductNumber Value Object create should create a valid ProductNumber with 16 digits
- ✓ ProductNumber Value Object create should throw error for invalid length
- ✓ ProductNumber Value Object create should throw error for non-numeric characters
- ✓ ProductNumber Value Object create should throw error for empty string
- ✓ ProductNumber Value Object getMasked should return masked number with last 4 digits
- ✓ ProductNumber Value Object getLastFourDigits should return last 4 digits
- ✓ ProductNumber Value Object equals should return true for same product numbers
- ✓ ProductNumber Value Object equals should return false for different product numbers

### ✅ Money.test.ts

- **Tests:** 13
- **Pasados:** 13
- **Fallidos:** 0
- **Duración:** 0.57s

**Tests ejecutados:**

- ✓ Money Value Object create should create money with valid amount
- ✓ Money Value Object create should create money with zero amount
- ✓ Money Value Object create should throw error for negative amount
- ✓ Money Value Object add should add two amounts with same currency
- ✓ Money Value Object add should throw error when adding different currencies
- ✓ Money Value Object subtract should subtract two amounts with same currency
- ✓ Money Value Object subtract should throw error when result is negative
- ✓ Money Value Object multiply should multiply by positive factor
- ✓ Money Value Object multiply should throw error when multiplying by negative
- ✓ Money Value Object comparison methods should correctly compare greater than
- ✓ Money Value Object comparison methods should correctly compare less than
- ✓ Money Value Object comparison methods should correctly check equality
- ✓ Money Value Object format should format money with currency

### ✅ App.test.tsx

- **Tests:** 1
- **Pasados:** 1
- **Fallidos:** 0
- **Duración:** 1.84s

**Tests ejecutados:**

- ✓ renders correctly

### ✅ MockCreditCardRepository.test.ts

- **Tests:** 9
- **Pasados:** 9
- **Fallidos:** 0
- **Duración:** 10.59s

**Tests ejecutados:**

- ✓ MockCreditCardRepository getAll should return all credit cards
- ✓ MockCreditCardRepository getAll should return cards with expected properties
- ✓ MockCreditCardRepository getById should return a credit card by product number
- ✓ MockCreditCardRepository getById should throw CreditCardNotFoundError for non-existent card
- ✓ MockCreditCardRepository save should add a new credit card
- ✓ MockCreditCardRepository save should update an existing credit card
- ✓ MockCreditCardRepository delete should delete an existing credit card
- ✓ MockCreditCardRepository delete should throw error when deleting non-existent card
- ✓ MockCreditCardRepository reset should reset repository to initial state

## Comandos

```bash
# Ejecutar todos los tests
yarn test

# Ejecutar tests en modo watch
yarn test --watch

# Ejecutar tests con cobertura
yarn test --coverage

# Ejecutar un test específico
yarn test <nombre-del-archivo>
```

---

*Este reporte fue generado automáticamente por Jest*
