# Welcome to GenJavaFromExcel!!

This project aims to generate JAVA classes for coding/generating class diagrams. By providing fields and functions in two separate CSVs, JAVA classes (Services Interface and Entity Classes) can be generated.

# Build exe

    npm run code-exe // code mode

    npm run sad-exe  // sad mode

# Modes

## sad

> This is to generate classes for class diagrams in SAD format

## code

> This is to generate classes for coding

# Required Files

## 1. entity.csv

### File Format

| Workstream | Table Name     | Field Name     | Data Type |
| ---------- | -------------- | -------------- | --------- |
| Payment    | PaymentRequest | bllSbmssnRefNo | String[]  |

## 2. function.csv

### File Format

| Microservice | Common Function name | Input fields                   | Output filed           |
| ------------ | -------------------- | ------------------------------ | ---------------------- |
| Payment      | svPymntInstrct       | request:List\<PaymentRequest\> | List\<PaymentRequest\> |
