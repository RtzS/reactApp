const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
var employees = [];
var url = "mongodb://localhost:27017/reactDB";

app.use(bodyParser.json());
app.route('/employeeList').get(function(req, res) {
    if (mongodb != null && mongodb != undefined) {
        var collection = mongodb.collection('EmpList');
        var cursor = collection.find({});
        cursor.forEach(function(item) {
            if (item != null) {
                employees.push({ Employee_Id: item.empId, Emp_Name: item.name });
            }
        }, function(err) {
            res.send(employees);
            res.json(employees);
            db.close();
        });
    }
});
app.post('/employeeList', function(req, res) {
    // Insert JSON straight into MongoDB
    // mongodb.collection('EmpList').insert(req.body, function(err, result) {
    //     if (err)
    //         res.send('Error');
    //     else
    //         res.send('Success');
    // });
    if (mongodb != null && mongodb != undefined) {

        var resultObject = {};

        mongodb.collection('EmpList').insertOne(req.body, function(err, result) {
            if (err) {
                resultObject.status = "fail";
                resultObject.statusCode = 401;
                resultObject.message = "Create new record failed";
                res.send(JSON.stringify(resultObject));
            } else {
                resultObject.status = "Success";
                resultObject.statusCode = 200;
                resultObject.message = "Create new record success";
                res.send(JSON.stringify(resultObject));
            }
        });
    }
});
// app.get('/employeeList', (req, res) => {
//     // const employees = [ {
//     //     "firstName": "Rutuja",
//     //     "lastName": "Swami"
//     // }, {
//     //     "firstName": "XYYZ",
//     //     "lastName": "XYYZ"
//     // }];
//     // res.json(employees);
//     if (mongodb != null && mongodb != undefined) {
//         var collection = mongodb.collection('EmpList');
//         var cursor = collection.find({});
//         str = "";
//         cursor.forEach(function(item) {
//             if (item != null) {
//                 employees = employees + "    Employee id  " + item.empId + "</br>" + item.name;
//             }
//         }, function(err) {
//             res.send(employees);
//             res.json(employees);
//             db.close();
//         });
//     }
// });

const port = 5000;
//app.listen(port, () => console.log(`Server started on ${port}`));

app.listen(port, function() {
    console.log('Server started  ....!');
    createMongoDbConnection();
});

function createMongoDbConnection() {
    if (MongoClient != null && MongoClient != undefined) {
        MongoClient.connect('mongodb://localhost:27017/reactDB', function(err, dbInstance) {
            if (err) {
                mongodb = null;
                console.log("Failed to create DB Instance :( ");
            } else {
                mongodb = dbInstance;
                console.log("Successfully DB_Instance is created... :)");
            }
        });
    }
}
