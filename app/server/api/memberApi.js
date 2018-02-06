var app = require('../app');
const schemas = require('../Model.Schemas');
const Member = schemas.schemas.Member;
const controller = require('../controllers/member.controller');
require("../api/loginApi");




app.get('/member', function(req, res) {
    switch (req.params.data.action) {
        case "getAll":
            console.log('getting all members');
            Member.find({})
                .exec(function(err, Member) {
                    if (err) {
                        res.send(404, 'Error has occurred!')
                    } else {
                        console.log(Member);
                        res.json(Member);
                    }
                });
            break;
        case "getOne":
            console.log('getting on Member');
            Member.findOne({
                _id: req.params.id // body-parser did it !!!!
            }).exec(function(err, Member) {
                if (err) {
                    res.send(404, 'Error Occurred!')
                } else {
                    console.log(Member);
                    res.json(Member);
                }
            });
            break;




    }

});


// Create document I 
app.post('/member', function(req, res) {
    // switch(){}
    var newMember = new Member();
    //model fields:
    newMember._id = req.body.id;
    newMember.fname = req.body.fname;
    newMember.lname = req.body.lname;
    newMember.userName = req.body.userName;
    newMember.password = req.body.password;
    newMember.street = req.body.Street;
    newMember.city = req.body.Street;
    newMember.role = req.body.role;

    //insert into mongodb:
    newMember.save(function(err, member) {
        if (err) {
            res.send('Error saving member!')
        } else {
            console.log(member);
            res.json("the member: " + member);
        }
    })
});


app.put('/member', function(req, res) {
    let body = { _id: 200178754, fname: "test" };
    var query = { "_id": 200178754 };
    var options = { new: true };

    controller.organizeData(body, function(err, data) {

        var update = data;
        Member.findOneAndUpdate(query, update, options, function(err, member) {
            if (err) {
                console.log('got an error');
            } else {
                console.log(member);
                res.status(204).send(member);
            }

        });

    });
});

app.delete('/member', function(req, res) {

    Member.findOneAndRemove({
        _id: "200178754"
    }, function(err, member) {
        if (err) {
            console.log(err);

            res.send('error deleting')
        } else {
            console.log(member);
            res.status(204).send(member);
        }
    });
});


// db.members.findOneAndUpdate({"_id":200178754},{$set:{"fname": "rrerewrewrewrewrewrew"}},{insert: true})