Before run application you need to upload scripts to target database so run

`gradlew flywayMigrate -Pflyway.url=jdbc:postgresql://<url:port of target database>/<db-name> -Pflyway.user=<db-username> -Pflyway.password=<db-pwd> `

for example

` gradlew flywayMigrate -Pflyway.url=jdbc:postgresql://172.20.1.6:5432/postgres -Pflyway.user=root -Pflyway.password=root `

