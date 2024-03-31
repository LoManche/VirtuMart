## How to setup db connection(locally)

1. Install MySQL Community Version 8.3 installer https://dev.mysql.com/downloads/mysql/
2. Run the .msi, create a root password(suggest to set it simpler, you may need to enter it a lot of times)
3. All else setting just set as default is fine.
4. Open up CMD
5. Enter: mysql --local-infile=1 -u root -p 
6. Type your password
7. Replace the path in dbinit.sql to your path in the load data section
8. Enter: source YOURPATH\3100Project\db_setup\dbinit.sql

It should be working now!