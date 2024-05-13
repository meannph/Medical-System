const { response } = require('express');
const config = require('./dbconfig');
const sql = require('mssql');


const nDate = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Bangkok'
});
console.log(nDate);


// async function getLogin(ID, Password) {
//     try {
//         // Connect to the SQL Server database
//         let pool = await sql.connect(config);

//         // Execute a query to check the existence of the user with provided ID and Password
//         let users = await pool.request()
//             .input('ID', ID)  // Assuming ID is a string or number
//             .input('Password', Password)  // Assuming Password is a string
//             .query("SELECT COUNT(*) as count FROM user_account WHERE ID = @ID AND Password = @Password");

//         // Log the result (for debugging purposes)
//         console.log(users);

//         // Extract the count from the result
//         const count = users.recordset[0].count;

//         // Return a boolean indicating whether a user with the provided credentials exists
//         return count > 0;
//     } catch (error) {
//         // Log and throw any errors that occur during the process
//         console.error(error);
//         throw error;
//     }
// }

//GETUSER
async function getUsers() {
    try {
        let pool = await sql.connect(config);
        let users = await pool.request().query(`SELECT * from user_account WHERE 1=1 `);
        console.log(users)
        return users.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}
//GETEDIT
async function getUserId(id) {
    try {
    //    let vsql ="SELECT * FROM location WHERE ID  = '"+ id +"'";
        let pool = await sql.connect(config);
        let user = await pool.request()
            .input('ID', sql.NVarChar, id)
            .query("SELECT * FROM user_account WHERE ID  = @ID");
        console.log(user)
        console.log(id)
        return user.recordsets;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
//SEARCHUSER
async function postUser(ID , Name_TH , UserType ,Status ,LocationFish , LocationShrimp) {
    try {
        let pool = await sql.connect(config);
        let users = await pool.request()
        .input('input_ID','%' + ID + '%')
        .input('input_Name', '%' + Name_TH  + '%')
        .input('input_UserType', '%' + UserType  + '%')
        .input('input_Status', Status  + '%'  )
        .input('input_LocationFish', LocationFish  + '%'  )
        .input('input_LocationShrimp', LocationShrimp  + '%'  )
        .query("SELECT * FROM user_account WHERE ID LIKE @input_ID AND Name_TH LIKE @input_Name AND UserType LIKE @input_UserType AND Status LIKE @input_Status AND (LocationFish LIKE @input_LocationFish OR LocationShrimp LIKE @input_LocationShrimp)");
        console.log(users)

            return users.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

//ADDUSER
async function addUser(User) {
    try {
        let pool = await sql.connect(config);
        let user = await pool.request()
        .input('ID', sql.NVarChar(50), User.ID)
        .input('Password', sql.NVarChar(50), User.Password)
        .input('Name_TH', sql.NVarChar(50), User.Name_TH)
        .input('Name_EN', sql.NVarChar(50), User.Name_EN)
        .input('UserType', sql.NVarChar(50), User.UserType)
        .input('Remark', sql.NVarChar(255), User.Remark)
        .input('Status', sql.NVarChar(50), User.Status)
        .input('LocationShrimp', sql.NVarChar(50), User.LocationShrimp)
        .input('LocationFish', sql.NVarChar(50), User.LocationFish)

        .query(`INSERT INTO user_account 
        (ID, Password, Name_TH, Name_EN, UserType, LocationShrimp, LocationFish ,Remark, Status ) 
        VALUES (@ID, @Password, @Name_TH, @Name_EN, @UserType, @LocationShrimp, @LocationFish,@Remark, @Status)
    `);
        return { message: `User with ID ${User.ID} add successfully` };
    } catch (error) {
        console.log(error);
    }
}
//CheckUserIDซ้ำ
async function getcheckUserId(id, res) {
    try {
        let pool = await sql.connect(config);
        let user = await pool.request()
            .input('ID', sql.NVarChar, id)
            .query('SELECT COUNT(*) AS count FROM user_account WHERE ID = @id');
            
        const isDuplicate = user.recordset[0].count > 0;
        res.json({ isDuplicate });
        return user.recordsets;
    } catch (error) {
        console.error('Error checking duplicate ID:', error.message);
        throw error;
    }
}
//DELETEUSER
async function deleteUser(userId) {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('ID', sql.NVarChar, userId)

            .query('DELETE FROM user_account WHERE ID = @ID');
            
        if (result.rowsAffected[0] === 0) return res.sendStatus(404);

        return { message: `User with ID ${userId} deleted successfully` };
    } catch (error) {
        console.error(error);
        throw error; // Rethrow the error for proper handling in the route
    }
}
//UPDATEUSER
async function updateUser(User) {
    try {

        let pool = await sql.connect(config);
        let user = await pool.request()
        .input('ID', sql.NVarChar(50), User.ID)
        .input('Password', sql.NVarChar(50), User.Password)
        .input('Name_TH', sql.NVarChar(50), User.Name_TH)
        .input('Name_EN', sql.NVarChar(50), User.Name_EN)
        .input('UserType', sql.NVarChar(50), User.UserType)
        .input('Remark', sql.NVarChar(255), User.Remark)
        .input('Status', sql.NVarChar(50), User.Status)
        .input('LocationShrimp', sql.NVarChar(50), User.LocationShrimp)
        .input('LocationFish', sql.NVarChar(50), User.LocationFish)

            .query(`
                UPDATE user_account
                SET Name_TH = @Name_TH ,Name_EN = @Name_EN ,Password = @Password, UserType = @UserType, Remark = @Remark, Status = @Status, LocationFish = @LocationFish, LocationShrimp = @LocationShrimp, updateDate = getDate()
                WHERE ID = @ID
            `);
        return { message: `User with ID ${User.ID} updated successfully` };
    } catch (error) {
        console.error(error);
        throw error; // Rethrow the error for proper handling in the route
    }
}

//------------------------------------------------------------------------------------------------------------------------------

//GETLOCAL
async function getLocation() {
    try {
        let pool = await sql.connect(config);
        let location = await pool.request().query(`SELECT * from location WHERE 1=1 `);
        console.log(location)
        return location.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}
//GETEDIT
async function getLocationId(id) {
    try {
    //    let vsql ="SELECT * FROM location WHERE ID  = '"+ id +"'";
        let pool = await sql.connect(config);
        let location = await pool.request()
            .input('ID', sql.NVarChar, id)
            .query("SELECT * FROM location WHERE ID  = @ID");
            
        console.log(location)
        return location.recordsets;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
//SEARCHLOCAL
async function postLocation(ID , Name_TH , Local ,Status ) {
    try {
        let pool = await sql.connect(config);
        let local = await pool.request()
            .input('input_ID','%' + ID + '%')
            .input('input_Name', '%' + Name_TH  + '%')
            .input('input_Local', '%' + Local  + '%')
            .input('input_Status', Status  + '%'  )
            .query("SELECT * from location WHERE ID LIKE @input_ID AND Name_TH LIKE @input_Name AND Local LIKE @input_Local AND Status LIKE @input_Status");
            console.log(local)
            return local.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

//ADDLOCAL
async function addLocation(location) {
    try {
        let pool = await sql.connect(config);
        let local = await pool.request()
        .input('ID', sql.NVarChar(50), location.ID)
        .input('Name_TH', sql.NVarChar(50), location.Name_TH)
        .input('Name_EN', sql.NVarChar(50), location.Name_EN)
        .input('Local', sql.NVarChar(50),location.Local)
        .input('Remark', sql.NVarChar(255), location.Remark)
        .input('Status', sql.NVarChar(50), location.Status)
        .query(`INSERT INTO location
        (ID, Name_TH, Name_EN, Local, Remark, Status) VALUES 
        (@ID, @Name_TH, @Name_EN, @Local, @Remark, @Status )`);
        return { message: `User with ID ${location.ID} add successfully` };
    } catch (error) {
        console.log(error);
    }
}
//CheckLocationIDซ้ำ
async function getcheckLocationId(id, res) {
    try {
        let pool = await sql.connect(config);
        let user = await pool.request()
            .input('ID', sql.NVarChar, id)
            .query('SELECT COUNT(*) AS count FROM location WHERE ID = @id');
            
        const isDuplicate = user.recordset[0].count > 0;
        res.json({ isDuplicate });
        return user.recordsets;
    } catch (error) {
        console.error('Error checking duplicate ID:', error.message);
        throw error;
    }
}
//UPDATELOCAL
async function updateLocation(location) {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
        .input('ID', sql.NVarChar(50), location.ID)
        .input('Name_TH', sql.NVarChar(50), location.Name_TH)
        .input('Name_EN', sql.NVarChar(50), location.Name_EN)
        .input('Local', sql.NVarChar(50),location.Local)
        .input('Remark', sql.NVarChar(255), location.Remark)
        .input('Status', sql.NVarChar(50), location.Status)
        .query(`UPDATE location
            SET Name_TH = @Name_TH , Name_EN = @Name_EN, Local = @Local, Remark = @Remark, Status = @Status , updateDate = getDate()
            WHERE ID = @ID
            `);

        return { message: `User with ID ${location.ID} updated successfully` };
    } catch (error) {
        console.error(error);
        throw error; // Rethrow the error for proper handling in the route
    }
}
//DELETELOCAL
async function deleteLocation(locationId) {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('ID', sql.NVarChar, locationId)
            .query('DELETE FROM location WHERE ID = @ID');
            
        if (result.rowsAffected[0] === 0) return res.sendStatus(404);

        return { message: `User with ID ${locationId} deleted successfully` };
    } catch (error) {
        console.error(error);
        throw error; // Rethrow the error for proper handling in the route
    }
}

//------------------------------------------------------------------------------------------------------------------------

//GETUnit
async function getUnit() {
    try {
        let pool = await sql.connect(config);
        let unit = await pool.request().query(`SELECT * from unit WHERE 1=1 `);
        console.log(unit)
        return unit.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}
//GETEDIT
async function getUnitId(id) {
    try {
    //    let vsql ="SELECT * FROM location WHERE ID  = '"+ id +"'";
        let pool = await sql.connect(config);
        let unit = await pool.request()
            .input('ID', sql.NVarChar, id)
            .query("SELECT * FROM unit WHERE ID  = @ID");
            
        console.log(unit)
        console.log(id)
        return unit.recordsets;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

//SEARCHUnit
async function postUnit(ID , Name_TH ,Name_EN , Status ) {
    try {
        let pool = await sql.connect(config);
        let unit = await pool.request()
        .input('input_ID','%' + ID + '%')
        .input('input_Name', '%' + Name_TH  + '%')
        .input('input_NameEN', '%' + Name_EN  + '%')
        .input('input_Status', Status  + '%')
        .query("SELECT * from unit WHERE ID LIKE @input_ID AND Name_TH LIKE @input_Name AND Name_EN LIKE @input_NameEN AND Status LIKE @input_Status");
            console.log(unit)
            return unit.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}
//ADDUnit
async function addUnit(Unit) {
    try {
        let pool = await sql.connect(config);
        let insertUnit = await pool.request()
        .input('ID', sql.NVarChar(50), Unit.ID)
        .input('Name_TH', sql.NVarChar(50), Unit.Name_TH)
        .input('Name_EN', sql.NVarChar(50),Unit.Name_EN)
        .input('Remark', sql.NVarChar(255), Unit.Remark)
        .input('Status', sql.NVarChar(50),Unit.Status)
        .query(`INSERT INTO unit
        (ID, Name_TH, Name_EN, Remark, Status) VALUES 
        (@ID, @Name_TH, @Name_EN, @Remark, @Status)`);
        return { message: `User with ID ${Unit.ID} add successfully` };
    } catch (error) {
        console.log(error);
    }
}
//CheckUnitIDซ้ำ
async function getcheckUnitId(id, res) {
    try {
        let pool = await sql.connect(config);
        let user = await pool.request()
            .input('ID', sql.NVarChar, id)
            .query('SELECT COUNT(*) AS count FROM unit WHERE ID = @id');
            
        const isDuplicate = user.recordset[0].count > 0;
        res.json({ isDuplicate });
        return user.recordsets;
    } catch (error) {
        console.error('Error checking duplicate ID:', error.message);
        throw error;
    }
}
//DELETEUNIT
async function deleteUnit(unitId) {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('ID', sql.NVarChar, unitId)
            .query('DELETE FROM unit WHERE ID = @ID');
            
        if (result.rowsAffected[0] === 0) return res.sendStatus(404);

        return { message: `User with ID ${unitId} deleted successfully` };
    } catch (error) {
        console.error(error);
        throw error; // Rethrow the error for proper handling in the route
    }
}
//UPDATEUnit
async function updateUnit(unit) {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
        .input('ID', sql.NVarChar(50), unit.ID)
        .input('Name_TH', sql.NVarChar(50), unit.Name_TH)
        .input('Name_EN', sql.NVarChar(50), unit.Name_EN)
        .input('Remark', sql.NVarChar(255), unit.Remark)
        .input('Status', sql.NVarChar(50), unit.Status)
        .query(`UPDATE unit
            SET Name_TH = @Name_TH ,Name_EN = @Name_EN, Remark = @Remark, Status = @Status , updateDate = getDate()
            WHERE ID = @ID
            `);

        return { message: `User with ID ${unit.ID} updated successfully` };
    } catch (error) {
        console.error(error);
        throw error; // Rethrow the error for proper handling in the route
    }
}
//--------------------------------------------------------------------------------------------

//GETSTOCK
async function getmasterStock() {
    try {
        let pool = await sql.connect(config);
        let masterstock = await pool.request().query(`SELECT * from masterstock WHERE 1=1 `);
        console.log(masterstock)
        return masterstock.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}
//GETEDITSTOCK
async function getmasterStockId(id) {
    try {
    //    let vsql ="SELECT * FROM location WHERE ID  = '"+ id +"'";
        let pool = await sql.connect(config);
        let masterStock = await pool.request()
            .input('ID', sql.NVarChar, id)
            .query("SELECT * FROM masterstock WHERE ID  = @ID");
            
        console.log(masterStock)
        console.log(id)
        return masterStock.recordsets;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

//SEARCHSTOCK
async function postmasterStock(ID , Name_TH , Type , Status) {
    try {
        let pool = await sql.connect(config);
        let masterStock = await pool.request()
        .input('input_ID','%' + ID + '%')
        .input('input_Name', '%' + Name_TH  + '%')
        .input('input_Type', '%' + Type  + '%')
        .input('input_Status', Status  + '%')
        .query("SELECT * from masterstock WHERE ID LIKE @input_ID AND Name_TH LIKE @input_Name AND Type LIKE @input_Type AND Status LIKE @input_Status");
            console.log(masterStock)
            return masterStock.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}
//ADDStock
async function addmasterStock(masterStock) {
    try {
        let pool = await sql.connect(config);
        let insert = await pool.request()
        .input('ID', sql.NVarChar(50), masterStock.ID)
        .input('Name_TH', sql.NVarChar(50), masterStock.Name_TH)
        .input('Name_EN', sql.NVarChar(50),masterStock.Name_EN)
        .input('Type', sql.NVarChar(50),masterStock.Type)
        .input('Remark', sql.NVarChar(255), masterStock.Remark)
        .input('Status', sql.NVarChar(50),masterStock.Status)
        .query(`INSERT INTO masterstock
        (ID, Name_TH, Name_EN, Type,  Remark, Status) VALUES 
        (@ID, @Name_TH, @Name_EN, @Type, @Remark, @Status)`);
    } catch (error) {
        console.log(error);
    }
}
//CheckmasterStockIDซ้ำ
async function getcheckmasterStockId(id, res) {
    try {
        let pool = await sql.connect(config);
        let user = await pool.request()
            .input('ID', sql.NVarChar, id)
            .query('SELECT COUNT(*) AS count FROM masterstock WHERE ID = @id');
            
        const isDuplicate = user.recordset[0].count > 0;
        res.json({ isDuplicate });
        return user.recordsets;
    } catch (error) {
        console.error('Error checking duplicate ID:', error.message);
        throw error;
    }
}
//DELETESTOCK
async function deletemasterStock(masterStockId) {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('ID', sql.NVarChar, masterStockId)
            .query('DELETE FROM masterstock WHERE ID = @ID');
            
        if (result.rowsAffected[0] === 0) return res.sendStatus(404);

        return { message: `User with ID ${masterStockId} deleted successfully` };
    } catch (error) {
        console.error(error);
        throw error; // Rethrow the error for proper handling in the route
    }
}
//UPDATESTock
async function updatemasterStock(masterStock) {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
        .input('ID', sql.NVarChar(50), masterStock.ID)
        .input('Name_TH', sql.NVarChar(50), masterStock.Name_TH)
        .input('Name_EN', sql.NVarChar(50), masterStock.Name_EN)
        .input('Type', sql.NVarChar(50), masterStock.Type)
        .input('Remark', sql.NVarChar(255), masterStock.Remark)
        .input('Status', sql.NVarChar(50), masterStock.Status)
        .query(`UPDATE masterstock
            SET Name_TH = @Name_TH,Name_EN = @Name_EN, Type = @Type, Remark = @Remark, Status = @Status , updateDate = getDate()
            WHERE ID = @ID
            `);

        return { message: `User with ID ${masterStock.ID} updated successfully` };
    } catch (error) {
        console.error(error);
        throw error; // Rethrow the error for proper handling in the route
    }
}

//------------------------------------------------------------------------------------------------------------------------------

//GETLOCALตู้
async function getCabinet() {
    try {
        let pool = await sql.connect(config);
        let cabinet = await pool.request().query(`SELECT * from cabinet WHERE 1=1 `);
        console.log(cabinet)
        return cabinet.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}
//GETEDITตู้
async function getCabinetId(id) {
    try {
    //    let vsql ="SELECT * FROM location WHERE ID  = '"+ id +"'";
        let pool = await sql.connect(config);
        let cabinet = await pool.request()
            .input('ID', sql.NVarChar, id)
            .query("SELECT * FROM cabinet WHERE ID  = @ID");
            
        console.log(cabinet)
        console.log(id)
        return cabinet.recordsets;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
//SEARCHLocalตู้
async function postCabinet(ID , Name_TH , Local ,Status ) {
    try {
        let pool = await sql.connect(config);
        let cabinet = await pool.request()
        .input('input_ID','%' + ID + '%')
        .input('input_Name', '%' + Name_TH  + '%')
        .input('input_Local', '%' + Local  + '%')
        .input('input_Status', Status  + '%'  )
        .query("SELECT * from cabinet WHERE ID LIKE @input_ID AND Name_TH LIKE @input_Name AND Local LIKE @input_Local AND Status LIKE @input_Status");
            console.log(cabinet)
            return cabinet.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

//ADDLocalตู้
async function addCabinet(Cabinet) {
    try {
        let pool = await sql.connect(config);
        let insert = await pool.request()
        .input('ID', sql.NVarChar(50), Cabinet.ID)
        .input('Name_TH', sql.NVarChar(50), Cabinet.Name_TH)
        .input('Name_EN', sql.NVarChar(50),Cabinet.Name_EN)
        .input('Local', sql.NVarChar(50),Cabinet.Local)
        .input('Remark', sql.NVarChar(50),Cabinet.Remark)
        .input('Status', sql.NVarChar(50),Cabinet.Status)
        .query(`INSERT INTO cabinet
        (ID, Name_TH, Local , Name_EN, Remark, Status) VALUES 
        (@ID, @Name_TH, @Local, @Name_EN, @Remark, @Status)`);
    } catch (error) {
        console.log(error);
    }
}
//CheckCabinetIDซ้ำ
async function getcheckCabinetId(id, res) {
    try {
        let pool = await sql.connect(config);
        let user = await pool.request()
            .input('ID', sql.NVarChar, id)
            .query('SELECT COUNT(*) AS count FROM cabinet WHERE ID = @id');
            
        const isDuplicate = user.recordset[0].count > 0;
        res.json({ isDuplicate });

        return user.recordsets;
    } catch (error) {
        console.error('Error checking duplicate ID:', error.message);
        throw error;
    }
}
//UPDATELOCALตู้
async function updateCabinet(Cabinet) {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
        .input('ID', sql.NVarChar(50), Cabinet.ID)
        .input('Name_TH', sql.NVarChar(50), Cabinet.Name_TH)
        .input('Name_EN', sql.NVarChar(50), Cabinet.Name_EN)
        .input('Local', sql.NVarChar(50),Cabinet.Local)
        .input('Remark', sql.NVarChar(50), Cabinet.Remark)
        .input('Status', sql.NVarChar(50), Cabinet.Status)
        .query(`UPDATE cabinet
            SET Name_TH = @Name_TH ,Name_EN = @Name_EN, Local = @Local, Remark = @Remark, Status = @Status , updateDate = getDate()
            WHERE ID = @ID
            `);

        return { message: `User with ID ${Cabinet.ID} updated successfully` };
    } catch (error) {
        console.error(error);
        throw error; // Rethrow the error for proper handling in the route
    }
}
//DELETELOCALตู้
async function deleteCabinet(cabinetId) {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('ID', sql.NVarChar, cabinetId)
            .query('DELETE FROM cabinet WHERE ID = @ID');
            
        if (result.rowsAffected[0] === 0) return res.sendStatus(404);

        return { message: `User with ID ${cabinetId} deleted successfully` };
    } catch (error) {
        console.error(error);
        throw error; // Rethrow the error for proper handling in the route
    }
}

//------------------------------------------------------------------------------------------------------------------------------

//GETmedicine
async function getMedicine() {
    try {
        let pool = await sql.connect(config);
        let medicine = await pool.request().query(`SELECT * from medicine WHERE 1=1 `);
        console.log(medicine)
        return medicine.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}
//GETmedicine
async function getMedicineId(id) {
    try {
    //    let vsql ="SELECT * FROM location WHERE ID  = '"+ id +"'";
        let pool = await sql.connect(config);
        let medicine = await pool.request()
            .input('ID', sql.NVarChar, id)
            .query("SELECT * FROM medicine WHERE ID  = @ID");
            
        console.log(medicine)
        console.log(id)
        return medicine.recordsets;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
//SEARCHmedicine
async function postMedicine(ID , Name_TH , Type , Status ) {
    try {
        let pool = await sql.connect(config);
        let medicine = await pool.request()
            .input('input_ID','%' + ID + '%')
            .input('input_Name', '%' + Name_TH  + '%')
            .input('input_Type', '%' + Type  + '%')
            .input('input_Status', Status  + '%')
            .query("SELECT * from medicine WHERE ID LIKE @input_ID AND Name_TH LIKE @input_Name AND Type LIKE @input_Type AND Status LIKE @input_Status");
            console.log(medicine)
            return medicine.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

//ADDmedicine
async function addMedicine(Medicine) {
    try {
        let pool = await sql.connect(config);
        let insert = await pool.request()
        .input('ID', sql.NVarChar(50), Medicine.ID)
        .input('Name_TH', sql.NVarChar(50), Medicine.Name_TH)
        .input('Name_EN', sql.NVarChar(50),Medicine.Name_EN)
        .input('Detail', sql.NVarChar(50),Medicine.Detail)
        .input('Type', sql.NVarChar(50),Medicine.Type)
        .input('Remark', sql.NVarChar(255),Medicine.Remark)
        .input('Status', sql.NVarChar(50),Medicine.Status)
        .input('num_largeunit', sql.Int,Medicine.num_largeunit)
        .input('largeunit', sql.NVarChar(20),Medicine.largeunit)
        .input('num_subunit', sql.Int,Medicine.num_subunit)
        .input('subunit', sql.NVarChar(20),Medicine.subunit)
        .query(`INSERT INTO medicine
        (ID, Name_TH,  Name_EN, Detail ,Type, Remark, Status ,num_largeunit, largeunit ,num_subunit,subunit) VALUES 
        (@ID, @Name_TH,@Name_EN, @Detail, @Type, @Remark, @Status ,@num_largeunit ,@largeunit ,@num_subunit ,@subunit)`);
    } catch (error) {
        console.log(error);
    }
}
//CheckMedicineIDซ้ำ
async function getcheckMedicineId(id, res) {
    try {
        let pool = await sql.connect(config);
        let user = await pool.request()
            .input('ID', sql.NVarChar, id)
            .query('SELECT COUNT(*) AS count FROM medicine WHERE ID = @id');
            
        const isDuplicate = user.recordset[0].count > 0;
        res.json({ isDuplicate });
        return user.recordsets;
    } catch (error) {
        console.error('Error checking duplicate ID:', error.message);
        throw error;
    }
}
//UPDATEmedicine
async function updateMedicine(Medicine) {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
        .input('ID', sql.NVarChar(50), Medicine.ID)
        .input('Name_TH', sql.NVarChar(50), Medicine.Name_TH)
        .input('Name_EN', sql.NVarChar(50),Medicine.Name_EN)
        .input('Detail', sql.NVarChar(50),Medicine.Detail)
        .input('Type', sql.NVarChar(50),Medicine.Type)
        .input('Remark', sql.NVarChar(255),Medicine.Remark)
        .input('Status', sql.NVarChar(50),Medicine.Status)
        .input('num_largeunit', sql.Int,Medicine.num_largeunit)
        .input('largeunit', sql.NVarChar(20),Medicine.largeunit)
        .input('num_subunit', sql.Int,Medicine.num_subunit)
        .input('subunit', sql.NVarChar(20),Medicine.subunit)
        .query(`UPDATE medicine 
        SET Name_TH = @Name_TH ,Name_EN = @Name_EN,Detail = @Detail,Type = @Type, Remark = @Remark, Status = @Status, num_largeunit = @num_largeunit, largeunit = @largeunit, num_subunit = @num_subunit, subunit = @subunit , updateDate = getDate()
        WHERE ID = @ID
        `);
        return { message: `User with ID ${Medicine.ID} updated successfully` };
    } catch (error) {
        console.error(error);
        throw error; // Rethrow the error for proper handling in the route
    }
}
//DELETEmedicine
async function deleteMedicine(medicineId) {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('ID', sql.NVarChar, medicineId)
            .query('DELETE FROM medicine WHERE ID = @ID');
            
        if (result.rowsAffected[0] === 0) return res.sendStatus(404);

        return { message: `User with ID ${medicineId} deleted successfully` };
    } catch (error) {
        console.error(error);
        throw error; // Rethrow the error for proper handling in the route
    }
}

module.exports = {
    
    // getLogin : getLogin,

    getUsers: getUsers,
    getUserId : getUserId,
    getcheckUserId : getcheckUserId,
    postUser : postUser,
    addUser : addUser,
    deleteUser : deleteUser,
    updateUser : updateUser,


    getLocation : getLocation,
    getcheckLocationId : getcheckLocationId,
    postLocation : postLocation,
    addLocation : addLocation,
    getLocationId : getLocationId,
    updateLocation : updateLocation,
    deleteLocation : deleteLocation,

    getUnit : getUnit,
    getUnitId:getUnitId,
    getcheckUnitId : getcheckUnitId,
    addUnit : addUnit,
    postUnit : postUnit,
    deleteUnit : deleteUnit,
    updateUnit : updateUnit,

    getmasterStock : getmasterStock,
    getcheckmasterStockId : getcheckmasterStockId,
    postmasterStock : postmasterStock,
    addmasterStock : addmasterStock,
    updatemasterStock : updatemasterStock,
    getmasterStockId : getmasterStockId,
    deletemasterStock : deletemasterStock,


    getCabinet : getCabinet,
    postCabinet : postCabinet,
    getcheckCabinetId : getcheckCabinetId ,
    addCabinet : addCabinet,
    getCabinetId : getCabinetId,
    updateCabinet : updateCabinet,
    deleteCabinet : deleteCabinet,


    getMedicine : getMedicine,
    getcheckMedicineId : getcheckMedicineId,
    postMedicine : postMedicine,
    addMedicine : addMedicine,
    getMedicineId : getMedicineId,
    updateMedicine : updateMedicine,
    deleteMedicine : deleteMedicine,
}