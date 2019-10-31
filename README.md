# DS Lab 9 - Innopolis University, Kusal KC

> Building simple chat app that uses MongoDB replica set distributed over 3 AWS instances as VPS

This file documents the result of step-by-step execution of assigment description.

1. ### Create 3 VPS, install Mongodb on each of them
I created 3 AWS instances, each running an Ubuntu 18.04 image. After creating them, I SSHed into them individually and installed MongoDb on each of them.

2. ### Configure internal network between VPS, create “domain names” for each VPS in created network via /etc/hosts file
To ensure that traffic can pass through these instances, I made sure during launching those instances that they all had same **VPC ID** and **Subnet ID**. I also made a new security group allowing all traffic temporarily and assigned it to these instances.

Each of the three instances was then given a logical domain name and alias by appending a new line in their /etc/hosts file. Example, first instance was given *vps1.local* as domain name and *vps1* as alias; other instances were alias *vps2* and *vps3* accordingly.


3. ### Configure each mongodb to listen on corresponding interface /etc/mongod.conf


First Test:
![image](https://user-images.githubusercontent.com/26818010/67929301-e79caa80-fbb4-11e9-9781-9b3a7e8aed8a.png)

Testing again (with Primary VPS disabled):
![image](https://user-images.githubusercontent.com/26818010/67929341-000cc500-fbb5-11e9-8cdd-b9e9d2046e77.png)


Pusher App:
Based on: [USING MONGODB AS A REALTIME DATABASE WITH CHANGE STREAMS, Pusher Blog](https://pusher.com/tutorials/mongodb-change-streams)

![image](https://user-images.githubusercontent.com/26818010/67929844-47478580-fbb6-11e9-8d3f-65a4988d8f08.png)

![image](https://user-images.githubusercontent.com/26818010/67929938-8544a980-fbb6-11e9-8ca7-ba215abc5528.png)
