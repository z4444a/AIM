FROM gradle:5.5-jre11

WORKDIR /app

ADD . /app

ENTRYPOINT ["sh", "-c"]

CMD ["gradle update -Purl=${DB_URL} -Ppwd=${DB_PASSWORD} -Puser=${DB_USERNAME} -Dorg.gradle.daemon=false && echo $?"]
