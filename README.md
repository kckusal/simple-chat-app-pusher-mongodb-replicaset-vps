# DS Lab 9 - Innopolis University, Kusal KC

> Building simple chat app that uses MongoDB replica set distributed over 3 AWS instances as VPS

This file documents the result of step-by-step execution of assigment description.

### 1. Create 3 VPS, install Mongodb on each of them
I created 3 AWS instances, each running an Ubuntu 18.04 image. After creating them, I SSHed into them individually and installed MongoDb on each of them.

### 2. Configure internal network between VPS, create “domain names” for each VPS in created network via /etc/hosts file
To ensure that traffic can pass through these instances, I made sure during launching those instances that they all had same **VPC ID** and **Subnet ID**. I also made a new security group allowing all traffic temporarily and assigned it to these instances.

Each of the three instances was then given a logical domain name and alias by appending a new line in their /etc/hosts file. Example, first instance was given *vps1.local* as domain name and *vps1* as alias; other instances were aliased *vps2* and *vps3* accordingly.


### 3. Configure each mongodb to listen on corresponding interface /etc/mongod.conf
This was done by appending the *bindIp* paramter in the /etc/mongod.conf files in each instances.

### 4. Setup replication set
Replication set for MongoDb was set up using the link [https://docs.mongodb.com/manual/tutorial/deploy-replica-set/](https://docs.mongodb.com/manual/tutorial/deploy-replica-set/)

### 5. Create simple chat web-application which uses this replica set.
This repository contains the files for this web application. It is a simple ReactJS app which uses NodeJS server, based on this excellent guide at [https://pusher.com/tutorials/mongodb-change-streams](https://pusher.com/tutorials/mongodb-change-streams). This is a very simple *public* chat app where anyone with access can put a message which is updated in real-time to all users.

Note that we also leverage the [**pusher**](https://pusher.com/) technology available for free to make real-time updates in our application.

Pusher App: Based on [USING MONGODB AS A REALTIME DATABASE WITH CHANGE STREAMS, Pusher Blog](https://pusher.com/tutorials/mongodb-change-streams)

![image](https://user-images.githubusercontent.com/26818010/67929844-47478580-fbb6-11e9-8d3f-65a4988d8f08.png)
![image](https://user-images.githubusercontent.com/26818010/67929938-8544a980-fbb6-11e9-8ca7-ba215abc5528.png)


### 6. Fill database with spam a little bit;
We filled the database with some random chat texts. See the step 8 below.

### 7. Put output of rs.status() and rs.config() to README.md file;
**rs.status()** below at this point:
```
myReplSet:SECONDARY> rs.status()
{
        "set" : "myReplSet",
        "date" : ISODate("2019-10-31T07:46:57.013Z"),
        "myState" : 2,
        "term" : NumberLong(2),
        "syncingTo" : "vps3:27017",
        "syncSourceHost" : "vps3:27017",
        "syncSourceId" : 2,
        "heartbeatIntervalMillis" : NumberLong(2000),
        "majorityVoteCount" : 2,
        "writeMajorityCount" : 2,
        "optimes" : {
                "lastCommittedOpTime" : {
                        "ts" : Timestamp(1572508014, 1),
                        "t" : NumberLong(2)
                },
                "lastCommittedWallTime" : ISODate("2019-10-31T07:46:54.157Z"),
                "readConcernMajorityOpTime" : {
                        "ts" : Timestamp(1572508014, 1),
                        "t" : NumberLong(2)
                },
                "readConcernMajorityWallTime" : ISODate("2019-10-31T07:46:54.157Z"),
                "appliedOpTime" : {
                        "ts" : Timestamp(1572508014, 1),
                        "t" : NumberLong(2)
                },
                "durableOpTime" : {
                        "ts" : Timestamp(1572508014, 1),
                        "t" : NumberLong(2)
                },
                "lastAppliedWallTime" : ISODate("2019-10-31T07:46:54.157Z"),
                "lastDurableWallTime" : ISODate("2019-10-31T07:46:54.157Z")
        },
        "lastStableRecoveryTimestamp" : Timestamp(1572507984, 1),
        "lastStableCheckpointTimestamp" : Timestamp(1572507984, 1),
        "members" : [
                {
                        "_id" : 0,
                        "name" : "vps1:27017",
                        "ip" : "172.31.47.98",
                        "health" : 1,
                        "state" : 2,
                        "stateStr" : "SECONDARY",
                        "uptime" : 38388,
                        "optime" : {
                                "ts" : Timestamp(1572508014, 1),
                                "t" : NumberLong(2)
                        },
                        "optimeDate" : ISODate("2019-10-31T07:46:54Z"),
                        "syncingTo" : "vps3:27017",
                        "syncSourceHost" : "vps3:27017",
                        "syncSourceId" : 2,
                        "infoMessage" : "",
                        "configVersion" : 1,
                        "self" : true,
                        "lastHeartbeatMessage" : ""
                },
                {
                        "_id" : 1,
                        "name" : "vps2:27017",
                        "ip" : "172.31.37.103",
                        "health" : 1,
                        "state" : 1,
                        "stateStr" : "PRIMARY",
                        "uptime" : 4166,
                        "optime" : {
                                "ts" : Timestamp(1572508014, 1),
                                "t" : NumberLong(2)
                        },
                        "optimeDurable" : {
                                "ts" : Timestamp(1572508014, 1),
                                "t" : NumberLong(2)
                        },
                        "optimeDate" : ISODate("2019-10-31T07:46:54Z"),
                        "optimeDurableDate" : ISODate("2019-10-31T07:46:54Z"),
                        "lastHeartbeat" : ISODate("2019-10-31T07:46:56.759Z"),
                        "lastHeartbeatRecv" : ISODate("2019-10-31T07:46:56.571Z"),
                        "pingMs" : NumberLong(0),
                        "lastHeartbeatMessage" : "",
                        "syncingTo" : "",
                        "syncSourceHost" : "",
                        "syncSourceId" : -1,
                        "infoMessage" : "",
                        "electionTime" : Timestamp(1572469623, 1),
                        "electionDate" : ISODate("2019-10-30T21:07:03Z"),
                        "configVersion" : 1
                },
                {
                        "_id" : 2,
                        "name" : "vps3:27017",
                        "ip" : "172.31.33.232",
                        "health" : 1,
                        "state" : 2,
                        "stateStr" : "SECONDARY",
                        "uptime" : 35539,
                        "optime" : {
                                "ts" : Timestamp(1572508014, 1),
                                "t" : NumberLong(2)
                        },
                        "optimeDurable" : {
                                "ts" : Timestamp(1572508014, 1),
                                "t" : NumberLong(2)
                        },
                        "optimeDate" : ISODate("2019-10-31T07:46:54Z"),
                        "optimeDurableDate" : ISODate("2019-10-31T07:46:54Z"),
                        "lastHeartbeat" : ISODate("2019-10-31T07:46:56.758Z"),
                        "lastHeartbeatRecv" : ISODate("2019-10-31T07:46:56.571Z"),
                        "pingMs" : NumberLong(0),
                        "lastHeartbeatMessage" : "",
                        "syncingTo" : "vps2:27017",
                        "syncSourceHost" : "vps2:27017",
                        "syncSourceId" : 1,
                        "infoMessage" : "",
                        "configVersion" : 1
                }
        ],
        "ok" : 1,
        "$clusterTime" : {
                "clusterTime" : Timestamp(1572508014, 1),
                "signature" : {
                        "hash" : BinData(0,"AAAAAAAAAAAAAAAAAAAAAAAAAAA="),
                        "keyId" : NumberLong(0)
                }
        },
        "operationTime" : Timestamp(1572508014, 1)
}
```

**rs.config()** below at this point:
```
myReplSet:SECONDARY> rs.config()
{
        "_id" : "myReplSet",
        "version" : 1,
        "protocolVersion" : NumberLong(1),
        "writeConcernMajorityJournalDefault" : true,
        "members" : [
                {
                        "_id" : 0,
                        "host" : "vps1:27017",
                        "arbiterOnly" : false,
                        "buildIndexes" : true,
                        "hidden" : false,
                        "priority" : 1,
                        "tags" : {

                        },
                        "slaveDelay" : NumberLong(0),
                        "votes" : 1
                },
                {
                        "_id" : 1,
                        "host" : "vps2:27017",
                        "arbiterOnly" : false,
                        "buildIndexes" : true,
                        "hidden" : false,
                        "priority" : 1,
                        "tags" : {

                        },
                        "slaveDelay" : NumberLong(0),
                        "votes" : 1
                },
                {
                        "_id" : 2,
                        "host" : "vps3:27017",
                        "arbiterOnly" : false,
                        "buildIndexes" : true,
                        "hidden" : false,
                        "priority" : 1,
                        "tags" : {

                        },
                        "slaveDelay" : NumberLong(0),
                        "votes" : 1
                }
        ],
        "settings" : {
                "chainingAllowed" : true,
                "heartbeatIntervalMillis" : 2000,
                "heartbeatTimeoutSecs" : 10,
                "electionTimeoutMillis" : 10000,
                "catchUpTimeoutMillis" : -1,
                "catchUpTakeoverDelayMillis" : 30000,
                "getLastErrorModes" : {

                },
                "getLastErrorDefaults" : {
                        "w" : 1,
                        "wtimeout" : 0
                },
                "replicaSetId" : ObjectId("5db9e7356c259daeb8e7e975")
        }
}

```


### 8. Put a screenshot of your application with most recent messages to README.md;
At this point, our chat application has the following messages:
![image](https://user-images.githubusercontent.com/26818010/67929301-e79caa80-fbb4-11e9-9781-9b3a7e8aed8a.png)


### 9, 10. Shutdown VPS with primary mongodb instance! And repeat step 6, 7, 8.
Now we shutdown the instance which was serving as primary for our mongodb. Then we repeat the steps 6, 7 and 8.

> Step 6 again: Filling with new data (see chat app screenshot below)

> Step 7 again: Output of commands
- [x] **rs.status()** output now
```
```

- [x] **rs.config()** output now
```
```


> Step 8 again: Screenshot of most recent messages (with Primary VPS disabled)
![image](https://user-images.githubusercontent.com/26818010/67929341-000cc500-fbb5-11e9-8cdd-b9e9d2046e77.png)


