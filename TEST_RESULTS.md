# Test Results

**Generado:** 18 de octubre de 2025, 02:49

## Resumen

| Métrica | Valor |
|---------|-------|
| ✅ Tests Pasados | 94 |
| ❌ Tests Fallidos | 0 |
| ⏸️ Tests Pendientes | 0 |
| 📊 Total | 94 |
| ⏱️ Duración | 11.07s |
| 🎯 Estado | ✅ EXITOSO |

## 📊 Cobertura de Código

| Tipo | Cobertura | Cubierto | Total |
|------|-----------|----------|-------|
| 📝 Líneas | 72.97% | 189 | 259 |
| 🔀 Ramas | 62.50% | 85 | 136 |
| 🔧 Funciones | 80.00% | 76 | 95 |
| 📄 Statements | 73.18% | 191 | 261 |

**Nivel de Cobertura:** 🟡 Media (72.16% promedio)

## Resultados Detallados

### ✅ Result.test.ts

- **Tests:** 26
- **Pasados:** 26
- **Fallidos:** 0
- **Duración:** 0.18s

**Tests ejecutados:**

- ✓ Result Pattern ok - success case should create a successful result
- ✓ Result Pattern ok - success case should work with string values
- ✓ Result Pattern ok - success case should work with object values
- ✓ Result Pattern fail - error case should create a failed result
- ✓ Result Pattern fail - error case should work with Error objects
- ✓ Result Pattern getValue should return value for successful result
- ✓ Result Pattern getValue should throw error when getting value from failed result
- ✓ Result Pattern getError should return error for failed result
- ✓ Result Pattern getError should throw error when getting error from successful result
- ✓ Result Pattern map should transform successful result
- ✓ Result Pattern map should not transform failed result
- ✓ Result Pattern map should work with type transformations
- ✓ Result Pattern flatMap should chain successful results
- ✓ Result Pattern flatMap should propagate failure from original result
- ✓ Result Pattern flatMap should propagate failure from chained operation
- ✓ Result Pattern flatMap should work with complex chaining
- ✓ Result Pattern onSuccess should execute callback for successful result
- ✓ Result Pattern onSuccess should not execute callback for failed result
- ✓ Result Pattern onSuccess should allow chaining
- ✓ Result Pattern onFailure should execute callback for failed result
- ✓ Result Pattern onFailure should not execute callback for successful result
- ✓ Result Pattern onFailure should allow chaining
- ✓ Result Pattern combined usage should work with onSuccess and onFailure together
- ✓ Result Pattern combined usage should handle failure path correctly
- ✓ Result Pattern combined usage should work with map and callbacks
- ✓ Result Pattern combined usage should handle error in chained operations

### ✅ ProductNumber.test.ts

- **Tests:** 8
- **Pasados:** 8
- **Fallidos:** 0
- **Duración:** 0.18s

**Tests ejecutados:**

- ✓ ProductNumber Value Object create should create a valid ProductNumber with 16 digits
- ✓ ProductNumber Value Object create should throw error for invalid length
- ✓ ProductNumber Value Object create should throw error for non-numeric characters
- ✓ ProductNumber Value Object create should throw error for empty string
- ✓ ProductNumber Value Object getMasked should return masked number with last 4 digits
- ✓ ProductNumber Value Object getLastFourDigits should return last 4 digits
- ✓ ProductNumber Value Object equals should return true for same product numbers
- ✓ ProductNumber Value Object equals should return false for different product numbers

### ✅ ExpirationDate.test.ts

- **Tests:** 25
- **Pasados:** 25
- **Fallidos:** 0
- **Duración:** 0.19s

**Tests ejecutados:**

- ✓ ExpirationDate Value Object fromString should create a valid expiration date
- ✓ ExpirationDate Value Object fromString should throw error for invalid format
- ✓ ExpirationDate Value Object fromString should throw error for invalid month (00)
- ✓ ExpirationDate Value Object fromString should throw error for invalid month (13)
- ✓ ExpirationDate Value Object fromString should throw error for wrong format
- ✓ ExpirationDate Value Object fromString should throw error for invalid characters
- ✓ ExpirationDate Value Object fromString should accept dates with leading zero
- ✓ ExpirationDate Value Object isExpired should return true for past dates
- ✓ ExpirationDate Value Object isExpired should return false for future dates
- ✓ ExpirationDate Value Object isExpired should return false for current month
- ✓ ExpirationDate Value Object isExpired should return true for last month of previous year
- ✓ ExpirationDate Value Object willExpireInMonths should return true if expires within specified months
- ✓ ExpirationDate Value Object willExpireInMonths should return false if expires beyond specified months
- ✓ ExpirationDate Value Object willExpireInMonths should return true for already expired dates
- ✓ ExpirationDate Value Object format should return MM/YYYY format
- ✓ ExpirationDate Value Object format should maintain leading zeros
- ✓ ExpirationDate Value Object formatShort should return MM/YY format
- ✓ ExpirationDate Value Object formatShort should handle year 2030
- ✓ ExpirationDate Value Object formatShort should maintain leading zeros in short format
- ✓ ExpirationDate Value Object equals should return true for same dates
- ✓ ExpirationDate Value Object equals should return false for different dates
- ✓ ExpirationDate Value Object equals should return false for different years
- ✓ ExpirationDate Value Object edge cases should handle December correctly
- ✓ ExpirationDate Value Object edge cases should handle January correctly
- ✓ ExpirationDate Value Object edge cases should handle year 2099

### ✅ Money.test.ts

- **Tests:** 13
- **Pasados:** 13
- **Fallidos:** 0
- **Duración:** 0.22s

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

### ✅ GetAllCreditCardsUseCase.test.ts

- **Tests:** 12
- **Pasados:** 12
- **Fallidos:** 0
- **Duración:** 0.36s

**Tests ejecutados:**

- ✓ GetAllCreditCardsUseCase execute - success cases should return all credit cards successfully
- ✓ GetAllCreditCardsUseCase execute - success cases should call repository getAll method
- ✓ GetAllCreditCardsUseCase execute - success cases should log info before fetching
- ✓ GetAllCreditCardsUseCase execute - success cases should log info after successful fetch with count
- ✓ GetAllCreditCardsUseCase execute - success cases should return empty array when no cards exist
- ✓ GetAllCreditCardsUseCase execute - success cases should log zero count for empty results
- ✓ GetAllCreditCardsUseCase execute - error cases should return failure result when repository throws error
- ✓ GetAllCreditCardsUseCase execute - error cases should log error when fetch fails
- ✓ GetAllCreditCardsUseCase execute - error cases should wrap error in CreditCardRepositoryError
- ✓ GetAllCreditCardsUseCase execute - error cases should handle repository returning null
- ✓ GetAllCreditCardsUseCase logging behavior should call logger methods in correct order
- ✓ GetAllCreditCardsUseCase logging behavior should not log success when error occurs

### ✅ App.test.tsx

- **Tests:** 1
- **Pasados:** 1
- **Fallidos:** 0
- **Duración:** 1.38s

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
