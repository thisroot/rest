FORMAT: 1A
HOST: https://video.artinvest52.ru/

# Use and Go API

Описание API для сервиса Use and Go.

## Регистрация [/auth/register]

### Запрос на регистрацию [POST]

+ Request 200 (application/json)
    
        {
            "phone": "8454118418",
            "device": "ios"
        }
    
+ Response 201 (application/json)

        {
         "token": "SFGDGSFDBDSvcsfsdFSfaf(+255)",
         "status": "201"
         "message": "user created"
        }
    
+ Response 201 (application/json)
    
        {
         "status":"406"
         "message": "this phone is exist"
        }
    
+ Response 200 (application/json)
    
        {
            "status":500,
            "message": "Internal Server Error"
        }

    

## Верификация номера [/auth/registercode]

### Запрос на валидацию [POST]

Отправляет код пришедший по СМС, верифицирует номер телефона пользователя

+ Request (application/json)

        {
            "code": "5759",
            "token": "Qr4WJyLoN4i",
            "device": "ios"
        }

+ Response 201 (application/json)


        {
            "message": "user phone was verifyed",
            "code": "201"
        }
        
+ Response 401 (application/json)
        
        {
            "message": "incorrect code",
            "code": "401"
        }
        
+ Response 401 (application/json)

        {
            "message": "incorrect token",
            "code": "401"
        
        }
        
        
+ Response 401 (application/json)

        {
            "message": "verify time was expired",
            "code": "401"
        
        }
        
+ Response 400 (application/json)

        {
            "message": "incorrect request body",
            "code": "400"
        
        }
        
## Смена пароля [/auth/changepassword]

### Запрос на смену пароля [POST]

Отправляет токен и новый пароль

+ Request (application/json)

        {
            "token": "Qr4WJyLoN4i",
            "newpassword": "DsfDgfsSr"
        }
        
+ Response 201 (application/json)

        {
            "message": "password changed",
            "code": "201"
        }
        
+ Response 200 (application/json)


        {
            "message": "incorrect token ",
            "code": "402"
        }
        
+ Response 200 (application/json)


        {
            "message": "incorrect password ",
            "code": "401"
        }
        

## Добавить устройство [/auth/adddevice]

Добавляет устройство к существующему и валдированному аккаунту

### Запрос на добавление устройства [POST]

+ Request (application/json)

        {
            "phone": "4uTO8n8cDyW",
            "password": "DsfDgfsSr",
            "device": "ios"
        }
        
+ Response 201 (application/json)

        {
            "message": "device was added",
            "code": "201"
        }


