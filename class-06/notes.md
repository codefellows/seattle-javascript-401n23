## Terminology

- Authentication:
  - Making sure you are who you say you are
- Authorization
  - Making sure that the user is allowed to be where they are trying to be/ what you can do based on who you are
- cryptographic hash
  - a way to represent some text (enciphered) so it can be stored securely... this can be stored in place of a password to verify a user
  - not secure to store a password that isn't encrypted EVER
- encoding
  - can be decoded
  - mutated data using a specific sequence to modify it
  - base-64 encode things for basic auth
- encryption
  - can't be decoded
  - bcrypt is the library we are using
  - some additional data is sprinkled in (salt)
