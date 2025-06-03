FROM openjdk:17-jdk-slim AS build

WORKDIR /app

# Copiar solo los archivos necesarios para descargar dependencias
COPY .mvn/ .mvn/
COPY mvnw pom.xml ./

# Descargar dependencias
RUN chmod +x mvnw && ./mvnw dependency:go-offline

# Copiar el resto del código fuente y compilar
COPY src/ src/
RUN ./mvnw package -DskipTests

# Imagen final para ejecutar la aplicación
FROM openjdk:17-jdk-slim
WORKDIR /app

# Copiar el JAR generado desde la etapa de compilación
COPY --from=build /app/target/eduextra-api-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080
CMD ["java", "-jar", "app.jar"]