const dbOperation = require('./dboperation');
const Db = require('./dboperation');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

// const payload = { message: 'your data' }
// const secretKey = 'secretKey'
// const token = jwt.sign(payload, secretKey)


// router.route('/login').post(async (req, res) => {
//     try {
//         const { ID, Password ,Name} = req.body;
//         const isValidUser = await dbOperation.getLogin(ID, Password ,Name);

//         if (isValidUser) {
//             const accessToken = TokenManager.getGenerateAccessToken({ id: isValidUser.ID });
//             res.json({ ID: ID , Name: Name , access_token: accessToken });
//         } else {
//             res.status(401).json({ message: 'Invalid username or password' });
//         }
//     } catch (error) {
//         console.error('Error in /login route:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });



// router.route('/check_authen').post((req, res) => {
//     // Assuming TokenManager.checkAuthentication returns a user object if authenticated, otherwise false
//     let jwtStatus = TokenManager.checkAuthentication(req);

//     if (jwtStatus) {
//         // Send the user object or any relevant information when authenticated
//         res.status(200).send(jwtStatus);
//     } else {
//         // Send a 401 Unauthorized status if not authenticated
//         res.status(401).send(false);
//     }
// });


//GETUSER
router.route('/user').get((request,response)=>{
    dbOperation.getUsers().then(result =>{
        console.log(result[0]);
        response.json(result[0]);

    })
});


//GETEDIT
router.route('/user/:id').get((request, response) => {
    const id = request.params.id;
    dbOperation.getUserId(id)
        .then(result => {
            console.log(result);
            response.json(result);
        })
        .catch(error => {
            console.error(error);
            response.status(500).json({ error: 'Internal Server Error' });
        });
});



//SEARCHUSER
router.route('/user/post').post(async (request, response) => {
    var json = request.body;
    console.log(json)
    const result = await dbOperation.postUser(
       json.ID,
       json.Name_TH,
       json.UserType,
       json.Status,
       json.LocationFish,
       json.LocationShrimp
    );
    response.json(result);
});

//ADDUSER
router.route('/user').post(async (request, response) => {
    try {
        const json = request.body;
        console.log(json);

        const result = await dbOperation.addUser({
            ID: json.ID,
            Password : json.Password,
            Name_TH: json.Name_TH,
            Name_EN: json.Name_EN,
            UserType: json.UserType,
            LocationShrimp: json.LocationShrimp,
            LocationFish: json.LocationFish,
            Remark: json.Remark,
            Status: json.Status
        });

        response.json(result);
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});
//CheckUserIDซ้ำ
router.route('/user/checkDuplicateID/:id').get(async (request, response) => {
    try {
        const id = request.params.id;
        const isDuplicate = await dbOperation.getcheckUserId(id, response);
        // You can use 'isDuplicate' for further handling if needed
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});
//DELETEUSER
router.route('/user').delete(async (request, response) => {
    try {
        const userId = request.body.ID; 
        const result = await dbOperation.deleteUser(userId);
        response.json(result);
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

//EDITUSER
router.route('/user').put(async (request, response) => {
    try {
        const userData = request.body;
        const result = await dbOperation.updateUser(userData);
        response.json(result);
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

//--------------------------------------------------------------------------------------------------------------

//GETLOCAL
router.route('/location').get((request,response)=>{
    dbOperation.getLocation().then(result =>{
        console.log(result[0]);
        response.json(result[0]);
    })
});
//GETEDIT
router.route('/location/:id').get((request, response) => {
    const id = request.params.id;
    dbOperation.getLocationId(id)
        .then(result => {
            console.log(result);
            response.json(result);
        })
        .catch(error => {
            console.error(error);
            response.status(500).json({ error: 'Internal Server Error' });
        });
});
//SEARCHLOCAL
router.route('/location/post').post(async (request, response) => {
    var json = request.body;
    console.log(json)
    const result = await dbOperation.postLocation(
       json.ID,
       json.Name_TH,
       json.Local,
       json.Status
    );
    response.json(result);
});

//เพิ่มข้อมูลห้องพยาบาล
router.route('/location').post(async (request, response) => {
    try {
        const json = request.body;
        console.log(json);

        const result = await dbOperation.addLocation({
            ID: json.ID,
            Name_TH: json.Name_TH,
            Name_EN: json.Name_EN,
            Local: json.Local,
            Remark: json.Remark,
            Status: json.Status
        });
        response.json(result);
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});
//CheckUserIDซ้ำ
router.route('/location/checkDuplicateID/:id').get(async (request, response) => {
    try {
        const id = request.params.id;
        const isDuplicate = await dbOperation.getcheckLocationId(id, response);
        // You can use 'isDuplicate' for further handling if needed
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});
//UPDATEห้องพยาบาล
router.route('/location').put(async (request, response) => {
    try {
        const json = request.body;
        console.log(json); // Assuming the updated user data is sent in the request body
        const result = await dbOperation.updateLocation({
            ID: json.ID,
            Name_TH: json.Name_TH,
            Name_EN: json.Name_EN,
            Local: json.Local,
            Remark: json.Remark,
            Status: json.Status
        });
        response.json(result);
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

//DELETELocal
router.route('/location').delete(async (request, response) => {
    try {
        const locationId = request.body.ID; 
        const result = await dbOperation.deleteLocation(locationId);
        response.json(result);
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

//-----------------------------------------------------------------------------------------------------------------------

//GETUnit
router.route('/unit').get((request,response)=>{
    dbOperation.getUnit().then(result =>{
        console.log(result[0]);
        response.json(result[0]);

    })
});
//GETUnit
router.route('/unit/:id').get((request, response) => {
    const id = request.params.id;
    dbOperation.getUnitId(id)
        .then(result => {
            console.log(result);
            response.json(result);
        })
        .catch(error => {
            console.error(error);
            response.status(500).json({ error: 'Internal Server Error' });
        });
});
//SEARCHUnit
router.route('/unit/post').post(async (request, response) => {
    var json = request.body;
    console.log(json)
    const result = await dbOperation.postUnit(
       json.ID,
       json.Name_TH,
       json.Name_EN,
       json.Status
    );
    response.json(result);
});
//เพิ่มข้อมูลยา
router.route('/unit').post(async (request, response) => {
    try {
        const json = request.body;
        console.log(json);

        const result = await dbOperation.addUnit({
            ID: json.ID,
            Name_TH: json.Name_TH,
            Name_EN: json.Name_EN,
            Remark: json.Remark,
            Status: json.Status
        });

        response.json(result);
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});
//CheckUnitIDซ้ำ
router.route('/unit/checkDuplicateID/:id').get(async (request, response) => {
    try {
        const id = request.params.id;
        const isDuplicate = await dbOperation.getcheckUnitId(id, response);
        // You can use 'isDuplicate' for further handling if needed
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});
//DELETEUNIT
router.route('/unit').delete(async (request, response) => {
    try {
        const unitId = request.body.ID; 
        const result = await dbOperation.deleteUnit(unitId);
        response.json(result);
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});
//UPDATEUnit
router.route('/unit').put(async (request, response) => {
    try {
        const json = request.body;
        console.log(json); // Assuming the updated user data is sent in the request body
        const result = await dbOperation.updateUnit({
            ID: json.ID,
            Name_TH: json.Name_TH,
            Name_EN: json.Name_EN,
            Remark: json.Remark,
            Status: json.Status
        });
        response.json(result);
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

//-----------------------------------------------------------------------------------------

//GETStock
router.route('/masterstock').get((request,response)=>{
    dbOperation.getmasterStock().then(result =>{
        console.log(result[0]);
        response.json(result[0]);
    })
});
//SEARCHStock
router.route('/masterstock/post').post(async (request, response) => {
    var json = request.body;
    console.log(json)
    const result = await dbOperation.postmasterStock(
        json.ID,
        json.Name_TH,
        json.Type,
        json.Status
    );
    response.json(result);
});
//GETSTOCK
router.route('/masterstock/:id').get((request, response) => {
    const id = request.params.id;
    dbOperation.getmasterStockId(id)
        .then(result => {
            console.log(result);
            response.json(result);
        })
        .catch(error => {
            console.error(error);
            response.status(500).json({ error: 'Internal Server Error' });
        });
});
//SEARCHSTOCK
router.route('/masterstock/post').post(async (request, response) => {
    var json = request.body;
    console.log(json)
    const result = await dbOperation.postmasterStock(
       json.ID,
       json.Name,
    );
    response.json(result);
});
//เพิ่มข้อมูลSTOCK
router.route('/masterstock').post(async (request, response) => {
    try {
        const json = request.body;
        console.log(json);

        const result = await dbOperation.addmasterStock({
            ID: json.ID,
            Name_TH: json.Name_TH,
            Name_EN: json.Name_EN,
            Type: json.Type,
            Remark: json.Remark,
            Status: json.Status
        });

        response.json(result);
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});
//CheckUmasterIDซ้ำ
router.route('/masterstock/checkDuplicateID/:id').get(async (request, response) => {
    try {
        const id = request.params.id;
        const isDuplicate = await dbOperation.getcheckmasterStockId(id, response);
        // You can use 'isDuplicate' for further handling if needed
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});
//DELETESTOCK
router.route('/masterstock').delete(async (request, response) => {
    try {
        const masterstockId = request.body.ID; 
        const result = await dbOperation.deletemasterStock(masterstockId);
        response.json(result);
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});
//UPDATEStock
router.route('/masterstock').put(async (request, response) => {
    try {
        const json = request.body;
        console.log(json);
        const result = await dbOperation.updatemasterStock({
            ID: json.ID,
            Name_TH: json.Name_TH,
            Name_EN: json.Name_EN,
            Type: json.Type,
            Remark: json.Remark,
            Status: json.Status
        });

        response.json(result);
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

//--------------------------------------------------------------------------------------------------------------

//GETLOCALตู้
router.route('/cabinet').get((request,response)=>{
    dbOperation.getCabinet().then(result =>{
        console.log(result[0]);
        response.json(result[0]);
    })
});
//GETEDITตู้
router.route('/cabinet/:id').get((request, response) => {
    const id = request.params.id;
    dbOperation.getCabinetId(id)
        .then(result => {
            console.log(result);
            response.json(result);
        })
        .catch(error => {
            console.error(error);
            response.status(500).json({ error: 'Internal Server Error' });
        });
});
//SEARCHLOCALตู้
router.route('/cabinet/post').post(async (request, response) => {
    var json = request.body;
    console.log(json)
    const result = await dbOperation.postCabinet(
       json.ID,
        json.Name_TH,
        json.Local,
        json.Status
    );
    response.json(result);
});

//ADDLOCALตู้
router.route('/cabinet').post(async (request, response) => {
    try {
        const json = request.body;
        console.log(json);

        const result = await dbOperation.addCabinet({
            ID: json.ID,
            Name_TH: json.Name_TH,
            Name_EN: json.Name_EN,
            Local: json.Local,
            Remark: json.Remark,
            Status: json.Status
        });

        response.json(result);
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});
//CheckcabinetIDซ้ำ
router.route('/cabinet/checkDuplicateID/:id').get(async (request, response) => {
    try {
        const id = request.params.id;
        const isDuplicate = await dbOperation.getcheckCabinetId(id, response);
        // You can use 'isDuplicate' for further handling if needed
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});
//UPDATEตู้
router.route('/cabinet').put(async (request, response) => {
    try {
        const json = request.body;
        console.log(json); // Assuming the updated user data is sent in the request body
        const result = await dbOperation.updateCabinet({
            ID: json.ID,
            Name_TH: json.Name_TH,
            Name_EN: json.Name_EN,
            Local: json.Local,
            Remark: json.Remark,
            Status: json.Status
        });
        response.json(result);
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

//DELETELocalตู้
router.route('/cabinet').delete(async (request, response) => {
    try {
        const cabinetId = request.body.ID; 
        const result = await dbOperation.deleteCabinet(cabinetId);
        response.json(result);
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

//-----------------------------------------------------------------------------


//GETMEDICINE
router.route('/medicine').get((request,response)=>{
    dbOperation.getMedicine().then(result =>{
        console.log(result[0]);
        response.json(result[0]);
    })
});
//GETEDITMEDICINE
router.route('/medicine/:id').get((request, response) => {
    const id = request.params.id;
    dbOperation.getMedicineId(id)
        .then(result => {
            console.log(result);
            response.json(result);
        })
        .catch(error => {
            console.error(error);
            response.status(500).json({ error: 'Internal Server Error' });
        });
});
//SEARCHMEDICINE
router.route('/medicine/post').post(async (request, response) => {
    var json = request.body;
    console.log(json)
    const result = await dbOperation.postMedicine(
       json.ID,
       json.Name_TH,
       json.Type,
       json.Status
    );
    response.json(result);
});

//ADDMEDICINE
router.route('/medicine').post(async (request, response) => {
    try {
        const json = request.body;
        console.log(json);

        const result = await dbOperation.addMedicine({
            ID: json.ID,
            Name_TH: json.Name_TH,
            Name_EN: json.Name_EN,
            Detail: json.Detail,
            Type: json.Type,
            Remark: json.Remark,
            Status: json.Status,
            num_largeunit : json.num_largeunit,
            largeunit : json.largeunit,
            num_subunit : json.num_subunit,
            subunit : json.subunit
        });

        response.json(result);
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});
//CheckmedicineIDซ้ำ
router.route('/medicine/checkDuplicateID/:id').get(async (request, response) => {
    try {
        const id = request.params.id;
        const isDuplicate = await dbOperation.getcheckMedicineId(id, response);
        // You can use 'isDuplicate' for further handling if needed
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});
//UPDATEMEDICINE
router.route('/medicine').put(async (request, response) => {
    try {
        const json = request.body;
        console.log(json); 
        const result = await dbOperation.updateMedicine({
            ID: json.ID,
            Name_TH: json.Name_TH,
            Name_EN: json.Name_EN,
            Detail: json.Detail,
            Type: json.Type,
            Remark: json.Remark,
            Status: json.Status,
            num_largeunit : json.num_largeunit,
            largeunit : json.largeunit,
            num_subunit : json.num_subunit,
            subunit : json.subunit
        });
        response.json(result);
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

//DELETEMEDICINE
router.route('/medicine').delete(async (request, response) => {
    try {
        const medicineId = request.body.ID; 
        const result = await dbOperation.deleteMedicine(medicineId);
        response.json(result);
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});


var port = process.env.PORT || 8090;
app.listen(port);
console.log(' API is runnning at ' + port);
