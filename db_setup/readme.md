## How to setup db connection(locally)

1. Install MySQL Community Version 8.3 installer https://dev.mysql.com/downloads/mysql/
2. Run the .msi, create a root password(suggest to set it simpler, you may need to enter it a lot of times)
3. All other setting just set as default is fine.
4. Open up CMD or PowerShell or any shell
5. Enter: mysql --local-infile=1 -u root -p

5.1 If it returns unexpected identifier, it is because mysql is not in system PATHs, see here for more:
     https://www.basedash.com/blog/adding-mysql-to-path-in-windows 

6. Type your password

7. Replace the path in dbinit.sql to your path in the load data section
![image](https://github.com/LoManche/VirtuMart/assets/124430801/bc02b2ea-19d3-4ae7-9e01-410ba0f3cdc1)

8. Enter: source YOURPATH\db_setup\dbinit.sql

It should be working now!

You can also use MySQL Workbench for that, just:

1. Edit the connection, on the Connection tab, go to the 'Advanced' sub-tab, and in the 'Others:' box add the line 'OPT_LOCAL_INFILE=1'.
2. Open the dbinit.sql and run it!
3. If you got any problem, wtsapp ask ask me/or Google it yourself.


## Default Users and Entry added to the database
# User 1
user1@example.com, password123
# User 2 
user2@example.com, password456
# Admin
adminUser, password

