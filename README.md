
Download and install Visual Studio Code to code (Optional).

This software has been tested with Java 17 (you can check your java version like this: "java --version") but possibly works with higher versions.

Also you should have Chrome installed and the corresponding webdriver downloaded (check your Chrome version, the chromedriver should be the same). 
The link to download the webdriver: https://googlechromelabs.github.io/chrome-for-testing/ (CAUTION!: Download the chromedriver not chrome)

Before executing:
```console
export CHROMEDRIVER_ABSOLUTE_PATH=<absolute path where your chromedriver was downloaded>
export GEMINI_API_KEY=<api key>
export DATABASE_PASSWORD=<database password>
```

Also before executing, initialize the database:
```console
docker volume create mysql_data

docker run --name some-mysql -p 3306:3306 -v mysql_data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=<database password> -d mysql
```

And with a client, connect to the server, just to prepare the SQL schema:
```console
docker run -it --rm --network="host" mysql mysql -h 127.0.0.1 -P 3306 -u root -p
```

Once inside:
```sql
CREATE DATABASE TMA;

USE TMA;

CREATE TABLE host_results (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hostname VARCHAR(255) NOT NULL,
    results JSON NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```



Now we are ready to execute:
```console
./gradlew run
```

                    





